'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

type TranslationDict = {
  nav: {
    home: string;
    ourWater: string;
    sustainability: string;
    services: string;
    servicesList: {
      delivery: string;
      installation: string;
      testing: string;
      dispenser: string;
    };
    process: string;
    about: string;
    findUs: string;
    findUsList: {
      contact: string;
      locations: string;
      inquiry: string;
    };
    order: string;
    whatsapp: string;
  };
  hero: {
    tagline: string;
    subtitle: string;
    ctaOrder: string;
    ctaWorks: string;
    ctaWhatsapp: string;
    ctaShop: string;
    ctaStory: string;
  };
  specs: {
    tag: string;
    title: string;
    subtitle: string;
    ph: string;
    capacity: string;
    material: string;
    minerals: string;
    idealUse: string;
  };
  products: {
    tag: string;
    title: string;
    viewAll: string;
    addToCart: string;
  };
  packages: {
    tag: string;
    title: string;
    byAudience: string;
    byDuration: string;
    student: { name: string; desc: string; price: string; details: string[] };
    family: { name: string; desc: string; price: string; details: string[] };
    corporate: { name: string; desc: string; price: string; details: string[] };
    weekly: { name: string; desc: string; price: string; details: string[] };
    monthly: { name: string; desc: string; price: string; details: string[] };
    annual: { name: string; desc: string; price: string; details: string[] };
  };
  calculator: {
    title: string;
    subtitle: string;
    peopleLabel: string;
    placeLabel: string;
    freqLabel: string;
    resultTitle: string;
    resultEstimate: string;
    cta: string;
  };
  process: {
    title: string;
    step1: { title: string; desc: string };
    step2: { title: string; desc: string };
    step3: { title: string; desc: string };
    step4: { title: string; desc: string };
    step5: { title: string; desc: string };
  };
  testimonials: {
    tag: string;
    title: string;
  };
  newsletter: {
    tag: string;
    title: string;
    desc: string;
    emailPlaceholder: string;
    button: string;
    success: string;
  };
  footer: {
    rights: string;
  };
  about: {
    title: string;
    subtitle: string;
    intro: string;
    storyTitle: string;
    storyText1: string;
    storyText2: string;
    sourceTitle: string;
    sourceText: string;
  };
};

const translations: Record<'en' | 'ur', TranslationDict> = {
  en: {
    nav: {
      home: 'Home',
      ourWater: 'Our Water (19L)',
      sustainability: 'Sustainability',
      services: 'Services',
      servicesList: {
        delivery: '19L Water Delivery',
        installation: 'Free Bottle Installation',
        testing: 'Water Testing',
        dispenser: 'Dispenser Service',
      },
      process: 'How It Works',
      about: 'About Us',
      findUs: 'Locations',
      findUsList: {
        contact: 'Contact & WhatsApp',
        locations: 'Coverage Areas',
        inquiry: 'Corporate Inquiry',
      },
      order: 'Order 19L Water',
      whatsapp: 'WhatsApp Us',
    },
    hero: {
      tagline: 'Pure Water. Delivered Simply.',
      subtitle: 'Premium 19-Liter mineral drinking water delivered reliably to homes, hostels, and offices across Pakistan.',
      ctaOrder: 'Order 19L Water',
      ctaWorks: 'How It Works',
      ctaWhatsapp: 'WhatsApp Concierge',
      ctaShop: 'Explore 19L Water',
      ctaStory: 'Our Brand Story',
    },
    specs: {
      tag: '19L BOTTLE SPECIFICATIONS',
      title: 'Purity in Every Drop',
      subtitle: 'Inspected and sealed at subterranean mountain aquifers for optimal daily hydration.',
      ph: 'pH 7.8 Natural Alkaline',
      capacity: '19 Liters (5 Gallons)',
      material: 'Sterilized Food-Grade Recyclable Glass',
      minerals: 'TDS 180 mg/L Bioavailable Minerals',
      idealUse: 'Homes, Hostels, Offices & Corporate Boardrooms',
    },
    products: {
      tag: 'THE CORE PRODUCT',
      title: 'Watlys 19L Premium Drinking Water',
      viewAll: 'View 19L Specifications',
      addToCart: 'Order 19L Water',
    },
    packages: {
      tag: 'RECOMMENDED WATER PLANS',
      title: 'Choose Your 19L Delivery Plan',
      byAudience: 'By Audience',
      byDuration: 'By Frequency',
      student: {
        name: 'Student & Hostel Plan',
        desc: 'Ideal for 1–2 students needing pure, uninterrupted drinking water during study routines.',
        price: 'Starting from PKR 1,200 / mo',
        details: ['4 x 19L Bottles per month', 'Free dorm/apartment doorstep delivery', 'Flexible pause during exam breaks'],
      },
      family: {
        name: 'Family Household Collection',
        desc: 'Complete household daily hydration. Sourced from protected aquifers for family health.',
        price: 'Starting from PKR 2,800 / mo',
        details: ['10 x 19L Bottles per month', 'Bi-weekly scheduled doorstep delivery', 'Free stainless steel bottle stand included'],
      },
      corporate: {
        name: 'Corporate & Office Suite',
        desc: 'High-volume supply for teams, corporate meeting rooms, and executive suites.',
        price: 'Custom B2B Quotation',
        details: ['20+ x 19L Bottles per month', 'Weekly delivery logistics', 'Dual-temperature dispenser leasing option'],
      },
      weekly: {
        name: 'Weekly 19L Dispatch',
        desc: 'Regular weekly delivery for active households and hostels.',
        price: 'Starting from PKR 700 / wk',
        details: ['2 x 19L Bottles weekly', 'Free doorstep delivery', 'Sanitized vessel exchange'],
      },
      monthly: {
        name: 'Monthly 19L Subscription',
        desc: 'Consistent monthly mineral water supply with regular refills.',
        price: 'Starting from PKR 2,800 / mo',
        details: ['8-12 x 19L Bottles monthly', 'Bi-weekly scheduled refills', 'Free tabletop stand'],
      },
      annual: {
        name: 'Annual 19L Pass',
        desc: 'Year-round guaranteed mineral water supply for corporate & large estates.',
        price: 'Custom Annual Tier',
        details: ['100+ x 19L Bottles annually', 'Dedicated account manager', 'Free electric chiller maintenance'],
      },
    },
    calculator: {
      title: '19L Water Requirement Estimator',
      subtitle: 'Estimate how many 19L bottles your home, hostel, or office requires dynamically.',
      peopleLabel: 'Number of People',
      placeLabel: 'Environment Type',
      freqLabel: 'Delivery Frequency',
      resultTitle: 'Estimated Monthly Requirement',
      resultEstimate: 'Recommended: {count} × 19L Bottles per Month',
      cta: 'Build My Water Plan',
    },
    process: {
      title: 'Our Water Journey',
      step1: { title: '1. Natural Aquifer Source', desc: 'Collected from deep mountain subterranean springs naturally protected from industrial runoff.' },
      step2: { title: '2. Decade Geological Filtration', desc: 'Percolates through volcanic stones absorbing bioavailable calcium and magnesium.' },
      step3: { title: '3. Lab Batch Assay', desc: 'Tested 24/7 for zero microplastics, TDS 180 mg/L stability, and pH balance.' },
      step4: { title: '4. Sterilized 19L Bottling', desc: 'Enclosed into sterilized 19-Liter containers under nitrogen pressure.' },
      step5: { title: '5. Temperature-Controlled Delivery', desc: 'Delivered directly to your kitchen, hostel room, or office lounge.' },
    },
    testimonials: {
      tag: 'CLIENT VERIFICATIONS',
      title: 'Trusted Across Pakistan',
    },
    newsletter: {
      tag: 'KNOWLEDGE & RESEARCH',
      title: 'Water Insights & Health Papers',
      desc: 'Read WHO drinking water guidelines, microplastic research, and hydration science.',
      emailPlaceholder: 'Enter your email address',
      button: 'Subscribe',
      success: 'Thank you for subscribing to Watlys Water Insights.',
    },
    footer: {
      rights: 'Watlys Pure Water Pakistan. All rights reserved.',
    },
    about: {
      title: 'Our Story',
      subtitle: 'Reimagining the ritual of daily drinking water in Pakistan.',
      intro: 'Watlys is a premium mineral water brand designed for those who appreciate purity, reliability, and sustainability.',
      storyTitle: 'The Genesis',
      storyText1: 'Founded with a vision to deliver uncompromised drinking water across Pakistan, Watlys elevates hydration from a routine necessity into a trusted, premium standard.',
      storyText2: 'Our water is collected from pristine natural aquifers and delivered in sanitized 19-Liter containers.',
      sourceTitle: 'Sustainably Sourced',
      sourceText: 'We operate under strict ecological protection principles, ensuring subterranean springs remain preserved for future generations.',
    },
  },
  ur: {
    nav: {
      home: 'ہوم',
      ourWater: 'ہمارا پانی (19 لیٹر)',
      sustainability: 'پائیداری',
      services: 'خدمات',
      servicesList: {
        delivery: '19 لیٹر پانی کی ڈیلیوری',
        installation: 'مفت بوتل انسٹالیشن',
        testing: 'پانی کا لیب ٹیسٹ',
        dispenser: 'ڈسپنسر سروس',
      },
      process: 'یہ کیسے کام کرتا ہے',
      about: 'ہمارے بارے میں',
      findUs: 'مقامات',
      findUsList: {
        contact: 'رابطہ و واٹس ایپ',
        locations: 'ڈیلیوری کے علاقے',
        inquiry: 'کارپوریٹ آرڈر',
      },
      order: '19L پانی کا آرڈر دیں',
      whatsapp: 'واٹس ایپ پر رابطہ کریں',
    },
    hero: {
      tagline: 'خالص پانی۔ آسان ڈیلیوری۔',
      subtitle: 'پاکستان بھر میں گھروں، ہاسٹلز اور دفاتر کے لیے پریمیم 19 لیٹر منرل واٹر کی بروقت ڈیلیوری۔',
      ctaOrder: '19L پانی کا آرڈر دیں',
      ctaWorks: 'یہ کیسے کام کرتا ہے',
      ctaWhatsapp: 'واٹس ایپ کونسیئرج',
      ctaShop: '19L پانی دیکھیں',
      ctaStory: 'ہمارا برانڈ سفر',
    },
    specs: {
      tag: '19 لیٹر بوتل کی خصوصیات',
      title: 'ہر قطرے میں مکمل پاکیزگی',
      subtitle: 'قدرتی پہاڑی چشموں سے حاصل کردہ خالص ترین منرل واٹر۔',
      ph: 'پی ایچ 7.8 قدرتی الکلائن',
      capacity: '19 لیٹر (5 گیلن)',
      material: 'سٹرلائزڈ فوڈ گریڈ گلاس',
      minerals: 'ٹی ڈی ایس 180 ایم جی/ایل منرلز',
      idealUse: 'گھر، ہاسٹل اور دفاتر کے لیے بہترین',
    },
    products: {
      tag: 'بنیادی پروڈکٹ',
      title: 'واٹس 19L پریمیم ڈرنکنگ واٹر',
      viewAll: 'خصوصیات دیکھیں',
      addToCart: 'آرڈر دیں',
    },
    packages: {
      tag: 'تجویز کردہ واٹر پلانز',
      title: 'اپنا 19 لیٹر ڈیلیوری پلان منتخب کریں',
      byAudience: 'ضرورت کے مطابق',
      byDuration: 'مدت کے مطابق',
      student: {
        name: 'سٹوڈنٹ و ہاسٹل پلان',
        desc: '1 سے 2 افراد کے لیے بہترین خالص اور معیاری پینے کے پانی کی سہولت۔',
        price: 'ابتدائی قیمت PKR 1,200 / ماہانہ',
        details: ['4 x 19L بوتلمیں ماہانہ', 'مفت ہاسٹل و اپارٹمنٹ ڈیلیوری', 'امتحانات کی چھٹیوں میں پاز کرنے کی سہولت'],
      },
      family: {
        name: 'فیملی ہاؤس ہولڈ پلان',
        desc: 'گھر کے تمام افراد کے لیے محفوظ اور صحت بخش منرل واٹر۔',
        price: 'ابتدائی قیمت PKR 2,800 / ماہانہ',
        details: ['10 x 19L بوتلمیں ماہانہ', 'ہر دو ہفتے بعد بروقت ڈیلیوری', 'مفت سٹینلیس سٹیل بوتل سٹینڈ'],
      },
      corporate: {
        name: 'کارپوریٹ و آفس پلان',
        desc: 'دفاتر، میٹنگ رومز اور کمپنیوں کے لیے باقاعدہ واٹر سپلائی۔',
        price: 'کارپوریٹ کوٹیشن',
        details: ['20+ x 19L بوتلمیں ماہانہ', 'ہفتہ وار شیڈول ڈیلیوری', 'الیکٹرک واٹر ڈسپنسر کی سہولت'],
      },
      weekly: {
        name: 'ہفتہ وار 19L سپلائی',
        desc: 'گھروں اور ہاسٹلز کے لیے ہفتہ وار ڈیلیوری۔',
        price: 'PKR 700 / ہفتہ وار',
        details: ['2 x 19L بوتلمیں ہفتہ وار', 'مفت ڈیلیوری', 'سٹرلائزڈ ایکسچینج'],
      },
      monthly: {
        name: 'ماہانہ 19L سبسکرپشن',
        desc: 'ماہانہ باقاعدہ منرل واٹر سپلائی۔',
        price: 'PKR 2,800 / ماہانہ',
        details: ['8-12 x 19L بوتلمیں ماہانہ', 'ہر دو ہفتے بعد ڈیلیوری', 'مفت ٹیبل ٹاپ سٹینڈ'],
      },
      annual: {
        name: 'سالانہ 19L پاس',
        desc: 'دفاتر اور بڑے گھروں کے لیے سالانہ پلان۔',
        price: 'کارپوریٹ اینول اینٹرنس',
        details: ['100+ x 19L بوتلمیں سالانہ', 'اکاؤنٹ مینیجر', 'ڈسپنسر سروس'],
      },
    },
    calculator: {
      title: '19L واٹر ریکوائرمنٹ کیلکولیٹر',
      subtitle: 'شمار کریں کہ آپ کے گھر، ہاسٹل یا دفتر کے لیے ہر ماہ کتنی 19 لیٹر بوتلوں کی ضرورت ہے۔',
      peopleLabel: 'افراد کی تعداد',
      placeLabel: 'جگہ کی قسم',
      freqLabel: 'ڈیلیوری کی تعدد',
      resultTitle: 'تخمینہ شدہ ماہانہ ضرورت',
      resultEstimate: 'تجویز کردہ: {count} × 19L بوتلمیں ماہانہ',
      cta: 'میرا واٹر پلان بنائیں',
    },
    process: {
      title: 'پانی کا سفر',
      step1: { title: '1. قدرتی پہاڑی سرچشمہ', desc: 'پہاڑوں کی گہرائیوں سے حاصل کردہ خالص منرل واٹر۔' },
      step2: { title: '2. دہائیوں کی قدرتی فلٹریشن', desc: 'چٹانوں سے گزر کر قدرتی منرلز شامل ہوتے ہیں۔' },
      step3: { title: '3. لیبارٹری کوالٹی ٹیسٹ', desc: 'مائیکرو پلاسٹک اور ٹی ڈی ایس کا 24/7 لیب معائنہ۔' },
      step4: { title: '4. سٹرلائزڈ 19L بوٹلنگ', desc: '19 لیٹر بوتلوں میں حفظانِ صحت کے اصولوں کے مطابق پیکنگ۔' },
      step5: { title: '5. بروقت ڈیلیوری', desc: 'براہِ راست آپ کے گھر، ہاسٹل یا دفتر کی دہلیز پر۔' },
    },
    testimonials: {
      tag: 'کسٹمر کی رائے',
      title: 'پاکستان کے صارفین کا اعتماد',
    },
    newsletter: {
      tag: 'تحقیق اور معلومات',
      title: 'واٹر سائنس اور صحت کے مضامین',
      desc: 'پانی کے معیار، صحت کے فوائد اور عالمی معیار کے بارے میں مضامین پڑھیں۔',
      emailPlaceholder: 'اپنا ای میل درج کریں',
      button: 'سبسکرائب کریں',
      success: 'واٹس واٹر ان سائٹس کو سبسکرائب کرنے کا شکریہ۔',
    },
    footer: {
      rights: 'واٹس پیور واٹر پاکستان۔ جملہ حقوق محفوظ ہیں۔',
    },
    about: {
      title: 'ہمارے بارے میں',
      subtitle: 'پاکستان میں پینے کے پانی کا نیا اور اعلیٰ معیار۔',
      intro: 'واٹس ایک پریمیم منرل واٹر برانڈ ہے جو پاکیزگی اور پائیداری پر یقین رکھتا ہے۔',
      storyTitle: 'ہمارا سفر',
      storyText1: 'پاکستان بھر میں محفوظ اور خالص پانی کی فراہمی کے مقصد کے ساتھ واٹس کا قیام عمل میں لایا گیا۔',
      storyText2: 'ہمارا پانی قدرتی سرچشموں سے حاصل کر کے 19 لیٹر کی سٹرلائزڈ بوتلوں میں فراہم کیا جاتا ہے۔',
      sourceTitle: 'قدرتی سرچشمہ',
      sourceText: 'ہم قدرتی وسائل کے تحفظ کے اصولوں پر سختی سے عمل پیرا ہیں۔',
    },
  },
};

type LanguageContextType = {
  language: 'en' | 'ur';
  setLanguage: (lang: 'en' | 'ur') => void;
  t: TranslationDict;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<'en' | 'ur'>('en');

  useEffect(() => {
    const saved = localStorage.getItem('watlys_lang') as 'en' | 'ur';
    if (saved && (saved === 'en' || saved === 'ur')) {
      setLanguage(saved);
    }
  }, []);

  const handleSetLanguage = (lang: 'en' | 'ur') => {
    setLanguage(lang);
    localStorage.setItem('watlys_lang', lang);
    document.documentElement.dir = lang === 'ur' ? 'rtl' : 'ltr';
    document.documentElement.lang = lang;
  };

  const isRtl = language === 'ur';
  const t = translations[language];

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t, isRtl }}>
      <div className={isRtl ? 'font-urdu' : 'font-sans'}>{children}</div>
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
