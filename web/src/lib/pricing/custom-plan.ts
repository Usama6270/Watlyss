/**
 * Watlys Custom Plan — single source of truth for bottle / refill / discount pricing.
 * Used by PackageCalculator UI and OrderModal so totals never diverge.
 */

export type CustomerPackageId = 'student' | 'family' | 'corporate'
export type DurationId = '1w' | '2w' | '3w' | '1m'
export type LocationId = 'lahore' | 'islamabad' | 'rawalpindi' | 'sialkot' | 'other'

export interface DeliveryLocation {
  id: LocationId
  name: string
  deliveryFee: number
}

export interface CustomerPackage {
  id: CustomerPackageId
  name: string
  shortName: string
  /** Fractional discount on eligible product charges (not deposits). */
  discount: number
  benefits: string[]
  /** Optional badge — e.g. "Best savings" for Student. */
  badge?: string
}

export interface DurationOption {
  id: DurationId
  name: string
  weeks: number
  /** Fractional duration discount on eligible product charges. */
  discount: number
  savingsLabel: string
}

/** Configurable business rules — change here, not in React components. */
export const CUSTOM_PLAN_CONFIG = {
  minBottles: 1,
  maxBottles: 30,
  /** Subscription packages unlock at this quantity (inclusive). */
  minBottlesForPackages: 2,
  litersPerBottle: 19,
  /** Standard refill list price before discounts. */
  refillBasePrice: 320,
  /**
   * Absolute floor — final refill unit must never go below this.
   * Tier ladder: 320 → 300 → 290 → 280.
   */
  minRefillPrice: 280,
  /**
   * First-delivery (new bottle) unit prices by bottles-per-delivery qty.
   * Qty 1 → 1,800; qty 2 → 1,500 each; qty 3+ uses firstFillBulkUnit.
   */
  firstFillUnitByQty: {
    1: 1800,
    2: 1500,
  } as Record<number, number>,
  firstFillBulkUnit: 1200,
  /**
   * Refundable security deposit charged once when qty === 2 (two-bottle rule).
   * Never discounted. Shown separately from product cost.
   */
  securityDepositPerBottle: 500,
  securityDepositAppliesAtQty: 2,
  /** Combined customer + duration discount cap. */
  maxCombinedDiscount: 0.25,
  locations: [
    { id: 'lahore', name: 'Lahore', deliveryFee: 100 },
    { id: 'islamabad', name: 'Islamabad / Rawalpindi', deliveryFee: 100 },
    { id: 'rawalpindi', name: 'Rawalpindi', deliveryFee: 100 },
    { id: 'sialkot', name: 'Sialkot', deliveryFee: 120 },
    { id: 'other', name: 'Other', deliveryFee: 150 },
  ] as DeliveryLocation[],
  /**
   * Priority MUST remain Student > Family / Individual > Corporate.
   * Rates are configurable — never hardcode in UI labels alone.
   */
  packages: [
    {
      id: 'student',
      name: 'Student',
      shortName: 'Student',
      discount: 0.15,
      badge: 'Best savings',
      benefits: ['Free delivery', 'Priority support', 'Flexible plan'],
    },
    {
      id: 'family',
      name: 'Family / Individual',
      shortName: 'Family',
      discount: 0.1,
      benefits: ['Free bottle replacement', 'Loyalty rewards', 'Flexible plan'],
    },
    {
      id: 'corporate',
      name: 'Corporate',
      shortName: 'Corporate',
      discount: 0.05,
      benefits: [
        'Bulk order benefits',
        'Dedicated account support',
        'Priority scheduling',
      ],
    },
  ] as CustomerPackage[],
  durations: [
    {
      id: '1w',
      name: '1 Week',
      weeks: 1,
      discount: 0,
      savingsLabel: 'Base rate',
    },
    {
      id: '2w',
      name: '2 Weeks',
      weeks: 2,
      discount: 0.03,
      savingsLabel: 'Higher savings',
    },
    {
      id: '3w',
      name: '3 Weeks',
      weeks: 3,
      discount: 0.05,
      savingsLabel: 'Even higher',
    },
    {
      id: '1m',
      name: '1 Month',
      weeks: 4,
      discount: 0.08,
      savingsLabel: 'Max duration',
    },
  ] as DurationOption[],
  defaults: {
    packageId: 'family' as CustomerPackageId,
    bottlesPerWeek: 2,
    durationId: '1w' as DurationId,
    locationId: 'lahore' as LocationId,
  },
} as const

export interface CustomPlanSelection {
  packageId: CustomerPackageId
  bottlesPerWeek: number
  durationId: DurationId
  locationId: LocationId
}

export interface PromoBanner {
  title: string
  subtitle: string
  discountLabel: string | null
  locked: boolean
}

export interface CustomPlanPricingResult {
  selection: CustomPlanSelection
  package: CustomerPackage | null
  duration: DurationOption
  location: DeliveryLocation
  bottlesPerWeek: number
  weeks: number
  deliveryTrips: number
  totalBottles: number
  totalLiters: number
  packagesUnlocked: boolean
  firstFillUnitPrice: number
  firstFillBottles: number
  firstFillSubtotal: number
  refillUnitPrice: number
  refillBottles: number
  refillSubtotal: number
  productSubtotal: number
  securityDeposit: number
  securityDepositNote: string | null
  deliveryFeePerTrip: number
  deliveryTripsCharged: number
  deliverySubtotal: number
  deliveryWaived: boolean
  customerDiscountRate: number
  durationDiscountRate: number
  combinedDiscountRate: number
  customerDiscountAmount: number
  durationDiscountAmount: number
  totalDiscountAmount: number
  undiscountedProductSubtotal: number
  /** Payable today = product after discount + delivery + refundable deposit. */
  totalPayable: number
  /** Recurring-equivalent monthly estimate (4-week), excluding deposit. */
  estimatedMonthlyCost: number
  /** Product + delivery savings only — deposits never counted as savings. */
  totalSavings: number
  benefits: string[]
  promoBanner: PromoBanner
  lineItems: {
    label: string
    amount: number
    tone?: 'default' | 'muted' | 'discount' | 'total'
  }[]
  validationErrors: string[]
}

function clampBottles(n: number): number {
  const v = Math.round(Number(n) || 0)
  return Math.min(
    CUSTOM_PLAN_CONFIG.maxBottles,
    Math.max(CUSTOM_PLAN_CONFIG.minBottles, v)
  )
}

export function arePackagesUnlocked(bottlesPerWeek: number): boolean {
  return clampBottles(bottlesPerWeek) >= CUSTOM_PLAN_CONFIG.minBottlesForPackages
}

export function getFirstFillUnitPrice(bottlesPerWeek: number): number {
  const qty = clampBottles(bottlesPerWeek)
  if (qty === 1) return CUSTOM_PLAN_CONFIG.firstFillUnitByQty[1]
  if (qty === 2) return CUSTOM_PLAN_CONFIG.firstFillUnitByQty[2]
  return CUSTOM_PLAN_CONFIG.firstFillBulkUnit
}

export function getSecurityDeposit(bottlesPerWeek: number): number {
  const qty = clampBottles(bottlesPerWeek)
  if (qty !== CUSTOM_PLAN_CONFIG.securityDepositAppliesAtQty) return 0
  return qty * CUSTOM_PLAN_CONFIG.securityDepositPerBottle
}

/**
 * finalRefillPrice = max(280, round(320 * (1 - eligibleRate)))
 * Never below PKR 280 regardless of combined discounts.
 */
export function getRefillUnitPrice(combinedDiscountRate: number): number {
  const raw = Math.round(
    CUSTOM_PLAN_CONFIG.refillBasePrice * (1 - Math.max(0, combinedDiscountRate))
  )
  return Math.max(CUSTOM_PLAN_CONFIG.minRefillPrice, raw)
}

function findPackage(id: CustomerPackageId): CustomerPackage {
  return (
    CUSTOM_PLAN_CONFIG.packages.find((p) => p.id === id) ??
    CUSTOM_PLAN_CONFIG.packages[1]!
  )
}

function findDuration(id: DurationId): DurationOption {
  return (
    CUSTOM_PLAN_CONFIG.durations.find((d) => d.id === id) ??
    CUSTOM_PLAN_CONFIG.durations[0]!
  )
}

function findLocation(id: LocationId): DeliveryLocation {
  return (
    CUSTOM_PLAN_CONFIG.locations.find((l) => l.id === id) ??
    CUSTOM_PLAN_CONFIG.locations[0]!
  )
}

function buildPromoBanner(opts: {
  packagesUnlocked: boolean
  durationId: DurationId
  combinedRate: number
  totalSavings: number
}): PromoBanner {
  const { packagesUnlocked, durationId, combinedRate, totalSavings } = opts
  const savingsLabel =
    totalSavings > 0
      ? `Saving PKR ${totalSavings.toLocaleString()} on this plan`
      : combinedRate > 0
        ? `${Math.round(combinedRate * 100)}% on eligible water charges`
        : null

  if (!packagesUnlocked) {
    return {
      title: 'Unlock More Value with 2 Bottles',
      subtitle:
        'Choose 2 or more bottles to unlock Student, Family and Corporate subscription benefits.',
      discountLabel: null,
      locked: true,
    }
  }

  if (durationId === '1w') {
    return {
      title: 'Your Subscription Savings Start Here',
      subtitle: 'Choose a longer plan to unlock greater duration savings.',
      discountLabel: savingsLabel,
      locked: false,
    }
  }
  if (durationId === '2w') {
    return {
      title: 'More Weeks. More Savings.',
      subtitle:
        'Commit for 3 weeks or a full month to unlock additional savings.',
      discountLabel: savingsLabel,
      locked: false,
    }
  }
  if (durationId === '3w') {
    return {
      title: "You're Almost at Maximum Savings",
      subtitle:
        'Choose a 4-week plan for the highest available duration discount.',
      discountLabel: savingsLabel,
      locked: false,
    }
  }
  return {
    title: 'Your Best Available Duration Rate',
    subtitle:
      'Enjoy the highest configured duration discount for your selected package.',
    discountLabel: savingsLabel,
    locked: false,
  }
}

/**
 * Core calculator. Pure function — safe for UI and order payload.
 *
 * Model:
 * - Week 1 = first-fill (new bottle) pricing for `bottlesPerWeek`
 * - Weeks 2..N = refill pricing per bottle (floored at minRefillPrice)
 * - Qty < 2 → packages locked: no customer discount, no student free delivery
 * - Discounts apply once (additive rates, capped) to product charges only
 * - Security deposit never discounted / never counted in savings
 */
export function calculateCustomPlan(
  input: Partial<CustomPlanSelection>
): CustomPlanPricingResult {
  const bottlesPerWeek = clampBottles(
    input.bottlesPerWeek ?? CUSTOM_PLAN_CONFIG.defaults.bottlesPerWeek
  )
  const packagesUnlocked = arePackagesUnlocked(bottlesPerWeek)

  const requestedPackageId =
    input.packageId ?? CUSTOM_PLAN_CONFIG.defaults.packageId
  const effectivePackageId = packagesUnlocked
    ? requestedPackageId
    : CUSTOM_PLAN_CONFIG.defaults.packageId

  const selection: CustomPlanSelection = {
    packageId: effectivePackageId,
    bottlesPerWeek,
    durationId: input.durationId ?? CUSTOM_PLAN_CONFIG.defaults.durationId,
    locationId: input.locationId ?? CUSTOM_PLAN_CONFIG.defaults.locationId,
  }

  const pkg = findPackage(selection.packageId)
  const duration = findDuration(selection.durationId)
  const location = findLocation(selection.locationId)
  const weeks = duration.weeks
  const deliveryTrips = weeks
  const totalBottles = bottlesPerWeek * weeks
  const totalLiters = totalBottles * CUSTOM_PLAN_CONFIG.litersPerBottle

  const firstFillBottles = bottlesPerWeek
  const firstFillUnitPrice = getFirstFillUnitPrice(bottlesPerWeek)
  const firstFillSubtotal = firstFillUnitPrice * firstFillBottles

  const refillBottles = bottlesPerWeek * Math.max(0, weeks - 1)

  // Package discount only when subscription packages are unlocked
  const customerRate = packagesUnlocked ? pkg.discount : 0
  const durationRate = duration.discount
  const combinedRate = Math.min(
    CUSTOM_PLAN_CONFIG.maxCombinedDiscount,
    customerRate + durationRate
  )

  const refillUnitPrice = getRefillUnitPrice(combinedRate)
  const refillSubtotal = refillUnitPrice * refillBottles

  const firstFillAfterDiscount = Math.round(
    firstFillSubtotal * (1 - combinedRate)
  )
  const firstFillDiscountAmt = firstFillSubtotal - firstFillAfterDiscount

  const undiscountedRefill = CUSTOM_PLAN_CONFIG.refillBasePrice * refillBottles
  const refillDiscountAmt = Math.max(0, undiscountedRefill - refillSubtotal)

  const undiscountedProductSubtotal = firstFillSubtotal + undiscountedRefill
  const productSubtotal = firstFillAfterDiscount + refillSubtotal
  const totalDiscountAmount = firstFillDiscountAmt + refillDiscountAmt

  const rateSum = customerRate + durationRate || 1
  const customerDiscountAmount =
    customerRate > 0
      ? Math.round(totalDiscountAmount * (customerRate / rateSum))
      : 0
  const durationDiscountAmount = totalDiscountAmount - customerDiscountAmount

  const securityDeposit = getSecurityDeposit(bottlesPerWeek)
  const securityDepositNote =
    securityDeposit > 0
      ? `Refundable security deposit (PKR ${CUSTOM_PLAN_CONFIG.securityDepositPerBottle.toLocaleString()} × ${bottlesPerWeek} bottles). Returned when bottles are returned in good condition.`
      : null

  const deliveryWaived = packagesUnlocked && pkg.id === 'student'
  const deliveryFeePerTrip = location.deliveryFee
  const deliveryTripsCharged = deliveryWaived ? 0 : deliveryTrips
  const deliverySubtotal = deliveryFeePerTrip * deliveryTripsCharged
  const deliverySavings = deliveryWaived
    ? deliveryFeePerTrip * deliveryTrips
    : 0

  const totalPayable = productSubtotal + deliverySubtotal + securityDeposit
  // Deposits are never counted as savings
  const totalSavings = totalDiscountAmount + deliverySavings

  const recurringPayable = productSubtotal + deliverySubtotal
  const estimatedMonthlyCost =
    weeks > 0 ? Math.round((recurringPayable / weeks) * 4) : recurringPayable

  const validationErrors: string[] = []
  if (bottlesPerWeek < CUSTOM_PLAN_CONFIG.minBottles) {
    validationErrors.push('Select at least 1 bottle per week.')
  }
  if (totalPayable < 0) {
    validationErrors.push('Invalid total — please adjust your plan.')
  }
  if (refillBottles > 0 && refillUnitPrice < CUSTOM_PLAN_CONFIG.minRefillPrice) {
    validationErrors.push('Refill price cannot fall below PKR 280.')
  }

  const lineItems: CustomPlanPricingResult['lineItems'] = [
    {
      label: `Initial bottles (${firstFillBottles} × 19L @ PKR ${firstFillUnitPrice.toLocaleString()})`,
      amount: firstFillSubtotal,
    },
  ]
  if (refillBottles > 0) {
    lineItems.push({
      label: `Refills (${refillBottles} × 19L @ PKR ${CUSTOM_PLAN_CONFIG.refillBasePrice.toLocaleString()} list → PKR ${refillUnitPrice.toLocaleString()} each)`,
      amount: undiscountedRefill,
    })
  }
  if (customerDiscountAmount > 0) {
    lineItems.push({
      label: `${pkg.shortName} discount (${Math.round(customerRate * 100)}%)`,
      amount: -customerDiscountAmount,
      tone: 'discount',
    })
  }
  if (durationDiscountAmount > 0) {
    lineItems.push({
      label: `${duration.name} discount (${Math.round(durationRate * 100)}%)`,
      amount: -durationDiscountAmount,
      tone: 'discount',
    })
  }
  if (deliveryWaived) {
    lineItems.push({
      label: `Delivery (${deliveryTrips} trips — waived for Student)`,
      amount: 0,
      tone: 'muted',
    })
  } else {
    lineItems.push({
      label: `Delivery (${deliveryTrips} trips to ${location.name})`,
      amount: deliverySubtotal,
    })
  }
  if (securityDeposit > 0) {
    lineItems.push({
      label: 'Refundable security deposit',
      amount: securityDeposit,
      tone: 'muted',
    })
  }
  lineItems.push({
    label: 'Amount payable today',
    amount: totalPayable,
    tone: 'total',
  })

  return {
    selection,
    package: packagesUnlocked ? pkg : null,
    duration,
    location,
    bottlesPerWeek,
    weeks,
    deliveryTrips,
    totalBottles,
    totalLiters,
    packagesUnlocked,
    firstFillUnitPrice,
    firstFillBottles,
    firstFillSubtotal,
    refillUnitPrice,
    refillBottles,
    refillSubtotal,
    productSubtotal,
    securityDeposit,
    securityDepositNote,
    deliveryFeePerTrip,
    deliveryTripsCharged,
    deliverySubtotal,
    deliveryWaived,
    customerDiscountRate: customerRate,
    durationDiscountRate: durationRate,
    combinedDiscountRate: combinedRate,
    customerDiscountAmount,
    durationDiscountAmount,
    totalDiscountAmount,
    undiscountedProductSubtotal,
    totalPayable,
    estimatedMonthlyCost,
    totalSavings,
    benefits: packagesUnlocked ? pkg.benefits : [],
    promoBanner: buildPromoBanner({
      packagesUnlocked,
      durationId: selection.durationId,
      combinedRate,
      totalSavings,
    }),
    lineItems,
    validationErrors,
  }
}

export function toOrderPackageDetails(pricing: CustomPlanPricingResult) {
  return {
    bottleQty: pricing.bottlesPerWeek,
    frequency: pricing.duration.name,
    customerSegment: pricing.packagesUnlocked
      ? pricing.package?.name ?? 'Single Bottle'
      : 'Single Bottle',
    city: pricing.location.name,
    weeks: pricing.weeks,
    durationId: pricing.selection.durationId,
    packageId: pricing.packagesUnlocked
      ? pricing.selection.packageId
      : undefined,
    locationId: pricing.selection.locationId,
    totalBottles: pricing.totalBottles,
    packagesUnlocked: pricing.packagesUnlocked,
  }
}

export function toOrderPricingSummary(pricing: CustomPlanPricingResult) {
  return {
    firstFillUnitPrice: pricing.firstFillUnitPrice,
    firstFillSubtotal: pricing.firstFillSubtotal,
    refillUnitPrice: pricing.refillUnitPrice,
    refillSubtotal: pricing.refillSubtotal,
    productSubtotal: pricing.productSubtotal,
    securityDeposit: pricing.securityDeposit,
    deliveryFee: pricing.deliverySubtotal,
    customerDiscountAmount: pricing.customerDiscountAmount,
    durationDiscountAmount: pricing.durationDiscountAmount,
    appliedDiscountPercentage: Math.round(pricing.combinedDiscountRate * 100),
    grandTotal: pricing.totalPayable,
    estimatedMonthlyCost: pricing.estimatedMonthlyCost,
    totalSavings: pricing.totalSavings,
  }
}

/**
 * Fixed standard subscription cards (Weekly / Monthly only — no annual).
 * Bottle counts match marketed plan sizes; pricing uses the same refill floor,
 * first-fill, and security-deposit rules as the custom builder.
 *
 * Note: Standard plans always apply their package discount (pre-selected plan),
 * even when bottles/week is 1 — the qty lock only applies to the custom configurator.
 */
export type StandardFrequency = 'weekly' | 'monthly'

export const STANDARD_PLANS = {
  student: {
    id: 'student' as CustomerPackageId,
    bottlesPerWeek: 1,
    /** 4 × 19L / month */
    bottlesPerMonth: 4,
  },
  family: {
    id: 'family' as CustomerPackageId,
    bottlesPerWeek: 2,
    /** 8 × 19L / month (2 per week) — unlocks 2-bottle first-fill + security deposit */
    bottlesPerMonth: 8,
  },
  corporate: {
    id: 'corporate' as CustomerPackageId,
    bottlesPerWeek: 5,
    /** 20 × 19L / month */
    bottlesPerMonth: 20,
  },
} as const

export interface StandardPlanQuote {
  packageId: CustomerPackageId
  frequency: StandardFrequency
  bottlesPerWeek: number
  weeks: number
  totalBottles: number
  /** Recurring water + delivery for the period (excludes first-fill premium & deposit). */
  recurringTotal: number
  refillUnitPrice: number
  deliverySubtotal: number
  deliveryWaived: boolean
  /** One-time first delivery product charge (new bottles). */
  firstFillUnitPrice: number
  firstFillSubtotal: number
  /** Refundable security deposit (qty === 2 only). */
  securityDeposit: number
  /** First order payable today = first fill + delivery + deposit. */
  firstOrderPayable: number
  /** Display bullets explaining setup vs recurring. */
  setupNotes: string[]
}

/**
 * Quote a standard plan for weekly (1 week) or monthly (4 weeks) billing display.
 * Recurring price uses refill rates after package (+ monthly duration) discount.
 * First-order uses first-fill unit + optional security deposit.
 */
export function quoteStandardPlan(
  packageId: CustomerPackageId,
  frequency: StandardFrequency,
  locationId: LocationId = CUSTOM_PLAN_CONFIG.defaults.locationId
): StandardPlanQuote {
  const def =
    packageId === 'student'
      ? STANDARD_PLANS.student
      : packageId === 'corporate'
        ? STANDARD_PLANS.corporate
        : STANDARD_PLANS.family

  const bottlesPerWeek = def.bottlesPerWeek
  const durationId: DurationId = frequency === 'weekly' ? '1w' : '1m'
  const duration = findDuration(durationId)
  const pkg = findPackage(packageId)
  const location = findLocation(locationId)
  const weeks = duration.weeks

  // Standard cards always apply package discount (plan is pre-chosen)
  const customerRate = pkg.discount
  const durationRate = duration.discount
  const combinedRate = Math.min(
    CUSTOM_PLAN_CONFIG.maxCombinedDiscount,
    customerRate + durationRate
  )

  const refillUnitPrice = getRefillUnitPrice(combinedRate)
  const totalBottles = bottlesPerWeek * weeks
  const refillProduct = refillUnitPrice * totalBottles

  const deliveryWaived = packageId === 'student'
  const deliverySubtotal = deliveryWaived
    ? 0
    : location.deliveryFee * weeks

  const recurringTotal = refillProduct + deliverySubtotal

  const firstFillUnitPrice = getFirstFillUnitPrice(bottlesPerWeek)
  const firstFillSubtotal = firstFillUnitPrice * bottlesPerWeek
  const securityDeposit = getSecurityDeposit(bottlesPerWeek)
  const firstDeliveryFee = deliveryWaived ? 0 : location.deliveryFee
  const firstOrderPayable =
    firstFillSubtotal + firstDeliveryFee + securityDeposit

  const setupNotes: string[] = [
    `First bottles: PKR ${firstFillUnitPrice.toLocaleString()} × ${bottlesPerWeek}`,
  ]
  if (securityDeposit > 0) {
    setupNotes.push(
      `Refundable security: PKR ${securityDeposit.toLocaleString()}`
    )
  }
  setupNotes.push(
    `Refills from PKR ${refillUnitPrice.toLocaleString()} / 19L (min PKR ${CUSTOM_PLAN_CONFIG.minRefillPrice})`
  )

  return {
    packageId,
    frequency,
    bottlesPerWeek,
    weeks,
    totalBottles,
    recurringTotal,
    refillUnitPrice,
    deliverySubtotal,
    deliveryWaived,
    firstFillUnitPrice,
    firstFillSubtotal,
    securityDeposit,
    firstOrderPayable,
    setupNotes,
  }
}
