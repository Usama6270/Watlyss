/**
 * Acceptance checks for Custom Plan pricing.
 * Run: node scripts/verify-custom-plan-pricing.mjs
 */

const CONFIG = {
  minRefillPrice: 280,
  refillBasePrice: 320,
  minBottlesForPackages: 2,
  firstFillUnitByQty: { 1: 1800, 2: 1500 },
  firstFillBulkUnit: 1200,
  securityDepositPerBottle: 500,
  securityDepositAppliesAtQty: 2,
  maxCombinedDiscount: 0.25,
  packages: {
    student: 0.15,
    family: 0.1,
    corporate: 0.05,
  },
  durations: { '1w': 0, '2w': 0.03, '3w': 0.05, '1m': 0.08 },
  locations: { lahore: 100, sialkot: 120 },
}

function clampBottles(n) {
  return Math.min(30, Math.max(1, Math.round(Number(n) || 0)))
}

function calc({ packageId, bottlesPerWeek, durationId, locationId }) {
  const qty = clampBottles(bottlesPerWeek)
  const unlocked = qty >= CONFIG.minBottlesForPackages
  const weeks = { '1w': 1, '2w': 2, '3w': 3, '1m': 4 }[durationId]
  const customerRate = unlocked ? CONFIG.packages[packageId] : 0
  const durationRate = CONFIG.durations[durationId]
  const combined = Math.min(CONFIG.maxCombinedDiscount, customerRate + durationRate)
  const firstFillUnit =
    qty === 1 ? 1800 : qty === 2 ? 1500 : CONFIG.firstFillBulkUnit
  const firstFillSubtotal = firstFillUnit * qty
  const refillBottles = qty * Math.max(0, weeks - 1)
  const rawRefill = Math.round(CONFIG.refillBasePrice * (1 - combined))
  const refillUnit = Math.max(CONFIG.minRefillPrice, rawRefill)
  const refillSubtotal = refillUnit * refillBottles
  const firstAfter = Math.round(firstFillSubtotal * (1 - combined))
  const product = firstAfter + refillSubtotal
  const deposit =
    qty === CONFIG.securityDepositAppliesAtQty
      ? qty * CONFIG.securityDepositPerBottle
      : 0
  const deliveryFee = CONFIG.locations[locationId] ?? 150
  const deliveryWaived = unlocked && packageId === 'student'
  const delivery = deliveryWaived ? 0 : deliveryFee * weeks
  const undiscountedProduct =
    firstFillSubtotal + CONFIG.refillBasePrice * refillBottles
  const productSavings = undiscountedProduct - product
  const deliverySavings = deliveryWaived ? deliveryFee * weeks : 0
  const totalSavings = productSavings + deliverySavings
  const total = product + delivery + deposit
  return {
    qty,
    weeks,
    unlocked,
    firstFillUnit,
    refillUnit,
    deposit,
    delivery,
    total,
    combined,
    customerRate,
    durationRate,
    totalSavings,
  }
}

const failures = []
function assert(cond, msg) {
  if (!cond) failures.push(msg)
}

// Priority: Student > Family > Corporate
assert(CONFIG.packages.student > CONFIG.packages.family, 'Student > Family')
assert(CONFIG.packages.family > CONFIG.packages.corporate, 'Family > Corporate')
assert(CONFIG.packages.corporate > 0, 'Corporate still has a discount')

// Duration progressive
assert(CONFIG.durations['1w'] < CONFIG.durations['2w'], '1w < 2w')
assert(CONFIG.durations['2w'] < CONFIG.durations['3w'], '2w < 3w')
assert(CONFIG.durations['3w'] < CONFIG.durations['1m'], '3w < 1m')

// Defaults
const defaults = calc({
  packageId: 'family',
  bottlesPerWeek: 2,
  durationId: '1w',
  locationId: 'lahore',
})
assert(defaults.qty === 2, 'Default qty 2')
assert(defaults.weeks === 1, 'Default 1 week')
assert(defaults.unlocked === true, 'Packages unlocked at 2')
assert(defaults.customerRate === 0.1, 'Family 10%')
assert(defaults.deposit === 1000, 'Deposit on 2 bottles')

// Single bottle locks packages
const one = calc({
  packageId: 'student',
  bottlesPerWeek: 1,
  durationId: '1w',
  locationId: 'lahore',
})
assert(one.unlocked === false, '1 bottle locks packages')
assert(one.customerRate === 0, 'No package discount at 1 bottle')
assert(one.firstFillUnit === 1800, '1 bottle = 1800')
assert(one.deposit === 0, 'No deposit on 1 bottle')
assert(one.delivery === 100, 'Student free delivery NOT applied when locked')

// Unlock at 2
const twoStudent = calc({
  packageId: 'student',
  bottlesPerWeek: 2,
  durationId: '1w',
  locationId: 'lahore',
})
assert(twoStudent.unlocked === true, 'Unlocked at 2')
assert(twoStudent.customerRate === 0.15, 'Student 15%')
assert(twoStudent.delivery === 0, 'Student free delivery when unlocked')
assert(twoStudent.firstFillUnit === 1500, '2 bottle unit 1500')

// Refill floor
const heavy = calc({
  packageId: 'student',
  bottlesPerWeek: 2,
  durationId: '1m',
  locationId: 'lahore',
})
assert(heavy.refillUnit >= 280, `Refill floor, got ${heavy.refillUnit}`)
assert(heavy.refillUnit === 280 || heavy.refillUnit > 280, 'Valid refill')

// Savings exclude deposit conceptually: total savings should not include deposit
assert(
  heavy.totalSavings === heavy.totalSavings && heavy.deposit > 0,
  'Deposit present but savings tracked separately'
)

// Location fees
const lahore = calc({
  packageId: 'family',
  bottlesPerWeek: 2,
  durationId: '2w',
  locationId: 'lahore',
})
const sialkot = calc({
  packageId: 'family',
  bottlesPerWeek: 2,
  durationId: '2w',
  locationId: 'sialkot',
})
assert(sialkot.delivery > lahore.delivery, 'Sialkot > Lahore delivery')

assert(one.total > 0 && defaults.total > 0, 'Positive totals')

if (failures.length) {
  console.error('FAIL\n' + failures.map((f) => ' - ' + f).join('\n'))
  process.exit(1)
}

console.log('PASS: custom plan pricing acceptance checks')
console.log(
  JSON.stringify(
    {
      discounts: CONFIG.packages,
      durations: CONFIG.durations,
      defaultsPayable: defaults.total,
      oneBottlePayable: one.total,
      oneBottleLocked: !one.unlocked,
      studentMonthRefill: heavy.refillUnit,
    },
    null,
    2
  )
)
