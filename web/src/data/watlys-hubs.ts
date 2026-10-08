export type WatlysHub = {
  id: string
  name: string
  nameUrdu: string
  shortName: string
  shortNameUrdu: string
  address: string
  addressUrdu: string
  phone: string
  status: string
  statusUrdu: string
  deliveryPromise: string
  deliveryPromiseUrdu: string
  lat: number
  lng: number
  /** Google Maps embed (no API key) — classic output=embed URL. */
  embedUrl: string
  whatsapp: string
}

/** Single source of truth for Watlys fulfillment hubs — add a hub here only. */
export const WATLYS_HUBS: WatlysHub[] = [
  {
    id: 'islamabad',
    name: 'Islamabad Headquarters',
    nameUrdu: 'اسلام آباد مرکزی دفتر',
    shortName: 'Islamabad HQ',
    shortNameUrdu: 'اسلام آباد HQ',
    address: 'Executive Tower, Blue Area, F-7, Islamabad',
    addressUrdu: 'ایگزیکٹو ٹاور، بلیو ایریا، F-7، اسلام آباد',
    phone: '+92 51 111 928 597',
    status: 'Active dispatch centre',
    statusUrdu: 'فعال ڈسپیچ سینٹر',
    deliveryPromise: 'Express 60-min delivery',
    deliveryPromiseUrdu: '60 منٹ ایکسپریس ڈیلیوری',
    lat: 33.7294,
    lng: 73.0931,
    embedUrl:
      'https://maps.google.com/maps?q=Blue%20Area,%20Islamabad,%20Pakistan&z=15&hl=en&output=embed',
    whatsapp: '923001234567',
  },
  {
    id: 'lahore',
    name: 'Lahore Flagship Hub',
    nameUrdu: 'لاہور فلیگ شپ ہب',
    shortName: 'Lahore Hub',
    shortNameUrdu: 'لاہور ہب',
    address: 'Phase 5 Commercial Area, DHA, Lahore',
    addressUrdu: 'فیز 5 کمرشل، ڈی ایچ اے، لاہور',
    phone: '+92 42 111 928 597',
    status: 'Active dispatch centre',
    statusUrdu: 'فعال ڈسپیچ سینٹر',
    deliveryPromise: 'Same-day city routes',
    deliveryPromiseUrdu: 'اسی دن شہر روٹس',
    lat: 31.4697,
    lng: 74.409,
    embedUrl:
      'https://maps.google.com/maps?q=DHA%20Phase%205,%20Lahore,%20Pakistan&z=15&hl=en&output=embed',
    whatsapp: '923001234567',
  },
  {
    id: 'karachi',
    name: 'Karachi Regional Hub',
    nameUrdu: 'کراچی ریجنل ہب',
    shortName: 'Karachi Hub',
    shortNameUrdu: 'کراچی ہب',
    address: 'Main Khayaban-e-Ittehad, DHA Phase 6, Karachi',
    addressUrdu: 'خیابانِ اتحاد، ڈی ایچ اے، کراچی',
    phone: '+92 21 111 928 597',
    status: 'Active dispatch centre',
    statusUrdu: 'فعال ڈسپیچ سینٹر',
    deliveryPromise: 'Coastal logistics network',
    deliveryPromiseUrdu: 'کوسٹل لاجسٹکس نیٹ ورک',
    lat: 24.8022,
    lng: 67.0642,
    embedUrl:
      'https://maps.google.com/maps?q=Khayaban-e-Ittehad,%20DHA%20Phase%206,%20Karachi,%20Pakistan&z=15&hl=en&output=embed',
    whatsapp: '923001234567',
  },
  {
    id: 'rawalpindi',
    name: 'Rawalpindi Express Depot',
    nameUrdu: 'راولپنڈی ایکسپریس ڈیپو',
    shortName: 'Rawalpindi Depot',
    shortNameUrdu: 'راولپنڈی ڈیپو',
    address: 'Saddar Cantt Commercial Center, Rawalpindi',
    addressUrdu: 'صدر کینٹ کمرشل سینٹر، راولپندی',
    phone: '+92 51 111 928 598',
    status: 'Active dispatch centre',
    statusUrdu: 'فعال ڈسپیچ سینٹر',
    deliveryPromise: 'Twin-cities direct',
    deliveryPromiseUrdu: 'جڑواں شہر ڈائریکٹ',
    lat: 33.5984,
    lng: 73.0441,
    embedUrl:
      'https://maps.google.com/maps?q=Saddar,%20Rawalpindi,%20Pakistan&z=15&hl=en&output=embed',
    whatsapp: '923001234567',
  },
]

export const CONCIERGE_PHONE = '+92 300 1234567'
export const DEFAULT_HUB_ID = 'islamabad'
