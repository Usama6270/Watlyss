import fs from 'fs'
import path from 'path'

function walk(dir, acc = []) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name)
    if (e.isDirectory()) {
      if (['node_modules', '.next'].includes(e.name)) continue
      walk(p, acc)
    } else if (/\.tsx$/.test(e.name)) acc.push(p)
  }
  return acc
}

const pairs = [
  [/bg-white dark:bg-card/g, 'bg-card'],
  [/text-zinc-500 dark:text-slate-200/g, 'text-muted-foreground'],
  [/text-zinc-500 dark:text-slate-300/g, 'text-muted-foreground'],
  [/text-zinc-550 dark:text-slate-200/g, 'text-muted-foreground'],
  [/text-slate-600 dark:text-slate-200/g, 'text-muted-foreground'],
  [/text-slate-600 dark:text-slate-300/g, 'text-muted-foreground'],
  [/text-zinc-700 dark:text-slate-200/g, 'text-foreground'],
  [/text-zinc-400 dark:text-slate-200/g, 'text-muted-foreground'],
  [/hover:text-zinc-900 dark:hover:text-white/g, 'hover:text-foreground'],
  [/border-zinc-100 dark:border-slate-800/g, 'border-border'],
  [/border-slate-100 dark:border-slate-800/g, 'border-border'],
  [/w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary shadow-inner/g, 'input-field'],
  [/w-full px-4 py-3 rounded-lg bg-muted border border-border text-foreground focus:outline-none focus:border-primary/g, 'input-field'],
]

let n = 0
for (const f of walk('src')) {
  let s = fs.readFileSync(f, 'utf8')
  const o = s
  for (const [re, rep] of pairs) s = s.replace(re, rep)
  if (s !== o) {
    fs.writeFileSync(f, s)
    n++
    console.log(f)
  }
}
console.log('changed', n)
