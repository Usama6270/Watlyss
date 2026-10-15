#!/usr/bin/env node
/**
 * check-i18n-parity.mjs
 *
 * Loads src/messages/en.json and src/messages/ur.json, flattens their key
 * trees (including array indices), and verifies that both locales define
 * exactly the same set of keys.
 *
 * Exits 0 when the key trees match.
 * Exits 1 when there are missing/extra keys, printing a report.
 */

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const messagesDir = path.resolve(__dirname, '..', 'src', 'messages');

const EN_PATH = path.join(messagesDir, 'en.json');
const UR_PATH = path.join(messagesDir, 'ur.json');

function loadJson(filePath) {
  try {
    const raw = readFileSync(filePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error(`✖ Failed to read/parse ${filePath}`);
    console.error(err.message);
    process.exit(1);
  }
}

/**
 * Flattens a nested object/array structure into a Set of dot-notated key
 * paths. Arrays are walked by index so that array length/shape mismatches
 * are also detected. Leaf values (strings, numbers, booleans) terminate the
 * path.
 */
function flattenKeys(value, prefix = '', acc = new Set()) {
  if (Array.isArray(value)) {
    if (value.length === 0) {
      acc.add(`${prefix}[]`);
    }
    value.forEach((item, index) => {
      flattenKeys(item, `${prefix}[${index}]`, acc);
    });
    return acc;
  }

  if (value !== null && typeof value === 'object') {
    const keys = Object.keys(value);
    if (keys.length === 0) {
      acc.add(prefix || '(root)');
    }
    for (const key of keys) {
      const nextPrefix = prefix ? `${prefix}.${key}` : key;
      flattenKeys(value[key], nextPrefix, acc);
    }
    return acc;
  }

  // Leaf node (string/number/boolean/null)
  acc.add(prefix);
  return acc;
}

function diff(setA, setB) {
  const onlyInA = [...setA].filter((k) => !setB.has(k)).sort();
  return onlyInA;
}

const en = loadJson(EN_PATH);
const ur = loadJson(UR_PATH);

const enKeys = flattenKeys(en);
const urKeys = flattenKeys(ur);

const missingInUr = diff(enKeys, urKeys); // present in en, absent in ur
const missingInEn = diff(urKeys, enKeys); // present in ur, absent in en

const hasMismatch = missingInUr.length > 0 || missingInEn.length > 0;

console.log(`Checked ${enKeys.size} keys in en.json and ${urKeys.size} keys in ur.json`);

if (!hasMismatch) {
  console.log('✔ Key parity OK — en.json and ur.json have identical key trees.');
  process.exit(0);
}

if (missingInUr.length > 0) {
  console.log(`\n✖ Missing in ur.json (${missingInUr.length}):`);
  for (const key of missingInUr) console.log(`  - ${key}`);
}

if (missingInEn.length > 0) {
  console.log(`\n✖ Missing in en.json (${missingInEn.length}):`);
  for (const key of missingInEn) console.log(`  - ${key}`);
}

console.log('\n✖ Key parity FAILED.');
process.exit(1);
