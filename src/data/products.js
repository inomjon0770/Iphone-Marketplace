// iLux Apple Store & Atelier - Mahsulotlar Ma'lumotlar Bazasi
// Barcha rasmlar orqasi toza kesilgan rasmiy Apple transparent (PNG-Alpha) formatida
// Ranglar: faqat oq, qora, kulrang (titan, obsidian, grafit, platina). Sariq ranglar butunlay olib tashlangan.

export const INITIAL_PRODUCTS = [
  {
    id: 'gold-16-pm-falcon',
    name: 'iPhone 16 Pro Max Space Obsidian Titanium Atelier',
    category: 'gold',
    badge: 'TITANIUM ATELIER (1/50)',
    isGold: true,
    goldKarat: 'Space Obsidian DLC & Grade 5 Titanium',
    priceUSD: 3499,
    priceUZS: 45487000,
    costUSD: 2700,
    costUZS: 35100000,
    stock: 4,
    monthlySold: 28,
    rating: 5.0,
    reviewsCount: 14,
    storageOptions: ['512GB', '1TB', '2TB'],
    selectedStorage: '512GB',
    colors: [
      { name: 'Space Obsidian Black', hex: '#1C1C1E', active: true },
      { name: 'Natural Titanium Gray', hex: '#8E8E93', active: false },
      { name: 'Pure Platinum White', hex: '#F5F5F7', active: false }
    ],
    image: '/products/iphone_16_pro_black.png',
    gallery: [
      '/products/iphone_16_pro_black.png',
      '/products/iphone_16_pro_back.png',
      '/products/iphone_16_pro_front.png'
    ],
    description: 'Qo\'lda yasalgan eksklyuziv Space Obsidian qora titan korpusli va gravirovkali iPhone 16 Pro Max. Qora mot yog\'och va italiyan charmidan tayyorlangan maxsus qutisi, xalqaro sifat sertifikati va 2 yillik VIP kafolat bilan birga yetkaziladi.',
    specs: {
      chip: 'Apple A18 Pro (3nm)',
      display: '6.9" Super Retina XDR ProMotion 120Hz',
      camera: '48MP Fusion + 48MP Ultra Wide + 5x Telephoto',
      coating: 'Space Obsidian DLC & Grade 5 Titanium',
      battery: '4685 mAh (33 soat video ijro)'
    }
  },
  {
    id: 'gold-16-pro-carbon',
    name: 'iPhone 16 Pro Forged Carbon & Black Titanium Atelier',
    category: 'gold',
    badge: 'TITANIUM LIMITED (1/99)',
    isGold: true,
    goldKarat: 'Forged Carbon & Titanium Matrix',
    priceUSD: 2899,
    priceUZS: 37687000,
    costUSD: 2200,
    costUZS: 28600000,
    stock: 6,
    monthlySold: 22,
    rating: 4.9,
    reviewsCount: 19,
    storageOptions: ['256GB', '512GB', '1TB'],
    selectedStorage: '256GB',
    colors: [
      { name: 'Carbon Matrix Black', hex: '#1C1C1E', active: true },
      { name: 'Titanium Graphite', hex: '#3A3A3C', active: false }
    ],
    image: '/products/iphone_16_pro_black.png',
    gallery: [
      '/products/iphone_16_pro_black.png',
      '/products/iphone_16_pro_back.png'
    ],
    description: 'Aviatsiya darajasidagi zarb qilingan karbon (Forged Carbon) va qora titan ramkali maxsus cheklangan kolleksiya. Har bir nusxada alohida shaxsiy seriya raqami o\'yib yozilgan.',
    specs: {
      chip: 'Apple A18 Pro',
      display: '6.3" ProMotion OLED 120Hz',
      camera: '48MP 4K 120fps Dolby Vision',
      coating: 'Forged Carbon Fiber & Grade 5 Titanium',
      battery: '3582 mAh'
    }
  },
  {
    id: 'gold-15-pm-rose',
    name: 'iPhone 15 Pro Max Natural Titanium Atelier',
    category: 'gold',
    badge: 'KAM QOLDI (LOW STOCK)',
    isGold: true,
    goldKarat: 'Natural Titanium & Damascus Steel',
    priceUSD: 2299,
    priceUZS: 29887000,
    costUSD: 1750,
    costUZS: 22750000,
    stock: 2,
    monthlySold: 35,
    rating: 5.0,
    reviewsCount: 27,
    storageOptions: ['256GB', '512GB', '1TB'],
    selectedStorage: '512GB',
    colors: [
      { name: 'Natural Titanium Gray', hex: '#8E8E93', active: true },
      { name: 'Obsidian Black', hex: '#1C1C1E', active: false }
    ],
    image: '/products/iphone_15_pro_natural.png',
    gallery: [
      '/products/iphone_15_pro_natural.png'
    ],
    description: 'Damashq po\'lati va tabiiy titanning uyg\'unligi. Juda mustahkam va jozibador kulrang-metall ko\'rinishga ega bo\'lib, biznes egalari va kolleksionerlar uchun maxsus tayyorlangan.',
    specs: {
      chip: 'Apple A17 Pro (3nm)',
      display: '6.7" Super Retina XDR',
      camera: '48MP Main + 5x Telephoto Optical',
      coating: 'Grade 5 Titanium & Damascus Steel',
      battery: '4422 mAh'
    }
  },
  {
    id: 'iphone-16-pm-official',
    name: 'Apple iPhone 16 Pro Max (Natural Titanium)',
    category: 'iphone',
    badge: 'TOP-1 FLAGMAN',
    isGold: false,
    priceUSD: 1450,
    priceUZS: 18850000,
    costUSD: 1280,
    costUZS: 16640000,
    stock: 16,
    monthlySold: 58,
    rating: 4.9,
    reviewsCount: 88,
    storageOptions: ['256GB', '512GB', '1TB'],
    selectedStorage: '256GB',
    colors: [
      { name: 'Natural Titanium', hex: '#8E8E93', active: true },
      { name: 'Black Titanium', hex: '#1C1C1E', active: false },
      { name: 'White Titanium', hex: '#F5F5F7', active: false }
    ],
    image: '/products/iphone_16_pro_natural.png',
    gallery: [
      '/products/iphone_16_pro_natural.png',
      '/products/iphone_16_pro_back.png',
      '/products/iphone_16_pro_front.png'
    ],
    description: 'Rasmiy original Apple flagmani. Tabiiy titan rangi, Camera Control sensor tugmasi, A18 Pro protsessori va eng katta 6.9 dyuymli ProMotion ekrani.',
    specs: {
      chip: 'Apple A18 Pro (Bionic Neural Engine)',
      display: '6.9" ProMotion OLED 120Hz Always-On',
      camera: '48MP Fusion + 48MP Ultra-keng + 5x Optik zoom',
      coating: '5-darajali Aerokosmik Titan',
      battery: '4685 mAh tezkor quvvat'
    }
  },
  {
    id: 'iphone-16-pro-official',
    name: 'Apple iPhone 16 Pro (Black Titanium)',
    category: 'iphone',
    badge: 'ENG MASHHUR',
    isGold: false,
    priceUSD: 1250,
    priceUZS: 16250000,
    costUSD: 1090,
    costUZS: 14170000,
    stock: 12,
    monthlySold: 46,
    rating: 4.8,
    reviewsCount: 63,
    storageOptions: ['128GB', '256GB', '512GB', '1TB'],
    selectedStorage: '256GB',
    colors: [
      { name: 'Black Titanium', hex: '#1C1C1E', active: true },
      { name: 'Natural Titanium', hex: '#8E8E93', active: false },
      { name: 'White Titanium', hex: '#F5F5F7', active: false }
    ],
    image: '/products/iphone_16_pro_black.png',
    gallery: [
      '/products/iphone_16_pro_black.png',
      '/products/iphone_16_pro_back.png'
    ],
    description: 'Kompakt o\'lcham va flagman quvvati. A18 Pro, 6.3" ProMotion displey, 5x optik zoom kamerasi va qulay vazn.',
    specs: {
      chip: 'Apple A18 Pro',
      display: '6.3" Super Retina XDR OLED',
      camera: '48MP + 48MP + 12MP 5x Zoom',
      coating: 'Aerospace Grade Titanium',
      battery: '3582 mAh'
    }
  },
  {
    id: 'iphone-16-base',
    name: 'Apple iPhone 16 (Black 128GB)',
    category: 'iphone',
    badge: 'YANGI AVLOD',
    isGold: false,
    priceUSD: 950,
    priceUZS: 12350000,
    costUSD: 820,
    costUZS: 10660000,
    stock: 19,
    monthlySold: 37,
    rating: 4.8,
    reviewsCount: 42,
    storageOptions: ['128GB', '256GB', '512GB'],
    selectedStorage: '128GB',
    colors: [
      { name: 'Black', hex: '#1C1C1E', active: true },
      { name: 'White', hex: '#F5F5F7', active: false }
    ],
    image: '/products/iphone_16_base.png',
    gallery: [
      '/products/iphone_16_base.png'
    ],
    description: 'Yangi vertikal kameralar bloki bilan fazoviy (Spatial) video olish imkoniyati, Camera Control sensor tugmasi va A18 3nm protsessori.',
    specs: {
      chip: 'Apple A18 (3nm)',
      display: '6.1" Super Retina XDR',
      camera: '48MP Fusion + 12MP Ultra-wide Macro',
      coating: 'Rang bilan to\'yintirilgan shisha va alyuminiy',
      battery: '3561 mAh'
    }
  },
  {
    id: 'iphone-15-base',
    name: 'Apple iPhone 15 (Black 128GB)',
    category: 'iphone',
    badge: 'HIT NARX / FOYDALI',
    isGold: false,
    priceUSD: 790,
    priceUZS: 10270000,
    costUSD: 690,
    costUZS: 8970000,
    stock: 7,
    monthlySold: 29,
    rating: 4.9,
    reviewsCount: 110,
    storageOptions: ['128GB', '256GB'],
    selectedStorage: '128GB',
    colors: [
      { name: 'Black', hex: '#1C1C1E', active: true }
    ],
    image: '/products/iphone_15_base.png',
    gallery: [
      '/products/iphone_15_base.png'
    ],
    description: 'Dynamic Island, 48MP kamera, USB-C porti va A16 Bionic kuchli protsessori bilan ajoyib va tejamkor tanlov.',
    specs: {
      chip: 'Apple A16 Bionic',
      display: '6.1" OLED Dynamic Island',
      camera: '48MP + 12MP',
      coating: 'Mat shisha va alyuminiy',
      battery: '3349 mAh'
    }
  },
  {
    id: 'watch-ultra-gold',
    name: 'Apple Watch Ultra 2 (Space Black Titanium Link)',
    category: 'watch',
    badge: 'TITANIUM ATELIER',
    isGold: true,
    goldKarat: 'DLC Space Black Titanium',
    priceUSD: 1650,
    priceUZS: 21450000,
    costUSD: 1150,
    costUZS: 14950000,
    stock: 3,
    monthlySold: 18,
    rating: 5.0,
    reviewsCount: 16,
    storageOptions: ['GPS + Cellular 49mm'],
    selectedStorage: 'GPS + Cellular 49mm',
    colors: [
      { name: 'Space Black Titanium', hex: '#1C1C1E', active: true }
    ],
    image: '/products/watch_ultra_2.png',
    gallery: [
      '/products/watch_ultra_2.png'
    ],
    description: 'DLC qoplangan qora titan korpus va og\'ir metall tasma. Ekstremal chidamlilik va yuqori darajadagi titan metall hashamati.',
    specs: {
      chip: 'Apple S9 SiP Dual Core',
      display: '49mm 3000 nits Safir shisha',
      sensor: 'EKG, Qondagi kislorod, Chuqurlik o\'lchagich',
      coating: 'Grade 5 Aerospace Titanium',
      battery: '72 soatgacha Low Power rejimida'
    }
  },
  {
    id: 'watch-series-10',
    name: 'Apple Watch Series 10 Titanium (Slate 46mm)',
    category: 'watch',
    badge: 'TITANIUM SERIYA',
    isGold: false,
    priceUSD: 590,
    priceUZS: 7670000,
    costUSD: 490,
    costUZS: 6370000,
    stock: 11,
    monthlySold: 25,
    rating: 4.8,
    reviewsCount: 34,
    storageOptions: ['42mm', '46mm'],
    selectedStorage: '46mm',
    colors: [
      { name: 'Slate Titanium', hex: '#3B3B3D', active: true },
      { name: 'Natural Titanium', hex: '#8E8E93', active: false }
    ],
    image: '/products/watch_series_10.png',
    gallery: [
      '/products/watch_series_10.png'
    ],
    description: 'Eng yupqa Apple Watch korpusi, keng burchakli OLED ekran va uyqu apnesini aniqlash tizimi.',
    specs: {
      chip: 'Apple S10 SiP',
      display: 'Wide-angle OLED Display 46mm',
      sensor: 'Sleep Apnea, EKG, Harorat',
      coating: 'Titan va Safir kristall',
      battery: '18 soat (30 daqiqada 80% quvvat)'
    }
  },
  {
    id: 'audio-airpods-max-gold',
    name: 'Apple AirPods Max (Space Black Titanium Atelier)',
    category: 'audio',
    badge: 'ATELIER ACOUSTICS',
    isGold: true,
    goldKarat: 'Anodized Space Black Titanium & Mesh',
    priceUSD: 1199,
    priceUZS: 15587000,
    costUSD: 850,
    costUZS: 11050000,
    stock: 3,
    monthlySold: 14,
    rating: 4.9,
    reviewsCount: 12,
    storageOptions: ['USB-C Hi-Res'],
    selectedStorage: 'USB-C Hi-Res',
    colors: [
      { name: 'Space Black', hex: '#1C1C1E', active: true },
      { name: 'Silver Platinum', hex: '#F5F5F7', active: false }
    ],
    image: '/products/airpods_max_spacegray.png',
    gallery: [
      '/products/airpods_max_spacegray.png',
      '/products/airpods_max_hero.png'
    ],
    description: 'Alyuminiy kosachalari va ilmoqlari qora titan sayqallangan premium quloqchin. Faol shovqin pasaytirish va fazoviy fazoli audio.',
    specs: {
      chip: '2 x Apple H1 chip',
      driver: 'Apple 40mm dinamik drayver',
      noiseCancel: 'Pro Active Noise Cancellation',
      coating: 'Space Black Anodized Titanium',
      battery: '20 soat Hi-Fi ijro'
    }
  },
  {
    id: 'audio-airpods-pro-2',
    name: 'Apple AirPods Pro 2 (USB-C MagSafe Case)',
    category: 'audio',
    badge: 'TOP XARID',
    isGold: false,
    priceUSD: 230,
    priceUZS: 2990000,
    costUSD: 185,
    costUZS: 2405000,
    stock: 28,
    monthlySold: 84,
    rating: 5.0,
    reviewsCount: 154,
    storageOptions: ['MagSafe USB-C'],
    selectedStorage: 'MagSafe USB-C',
    colors: [
      { name: 'White', hex: '#FFFFFF', active: true }
    ],
    image: '/products/airpods_pro_2.png',
    gallery: [
      '/products/airpods_pro_2.png'
    ],
    description: 'H2 protsessor, 2 baravar kuchli shovqin pasaytirish, shaffoflik rejimi, ovozni moslashtirish va USB-C zaryadlash g\'ilofi.',
    specs: {
      chip: 'Apple H2 chip',
      audio: 'Moslashuvchan audio va Spatial Audio',
      battery: '30 soat g\'ilof bilan',
      waterproof: 'IP54 chang va suvdan himoya'
    }
  },
  {
    id: 'audio-airpods-4',
    name: 'Apple AirPods 4 (Active Noise Cancellation)',
    category: 'audio',
    badge: 'YANGI MODEL',
    isGold: false,
    priceUSD: 180,
    priceUZS: 2340000,
    costUSD: 145,
    costUZS: 1885000,
    stock: 22,
    monthlySold: 51,
    rating: 4.8,
    reviewsCount: 47,
    storageOptions: ['USB-C Wireless Case'],
    selectedStorage: 'USB-C Wireless Case',
    colors: [
      { name: 'White', hex: '#FFFFFF', active: true }
    ],
    image: '/products/airpods_4.png',
    gallery: [
      '/products/airpods_4.png'
    ],
    description: 'Ochiq tipdagi quloqchinlar orasida birinchi marta Faol Shovqin Pasaytirish (ANC) tizimi va H2 chipi bilan jihozlangan AirPods 4.',
    specs: {
      chip: 'Apple H2 chip',
      audio: 'Ochiq dizayn ANC & Spatial Audio',
      battery: '30 soat umumiy quvvat'
    }
  },
  {
    id: 'ipad-pro-m4',
    name: 'Apple iPad Pro 13" M4 (Space Black)',
    category: 'ipad',
    badge: 'ULTRA PRO M4',
    isGold: false,
    priceUSD: 1399,
    priceUZS: 18187000,
    costUSD: 1190,
    costUZS: 15470000,
    stock: 9,
    monthlySold: 21,
    rating: 5.0,
    reviewsCount: 39,
    storageOptions: ['256GB', '512GB', '1TB'],
    selectedStorage: '256GB',
    colors: [
      { name: 'Space Black', hex: '#1C1C1E', active: true },
      { name: 'Silver', hex: '#E5E5EA', active: false }
    ],
    image: '/products/ipad_pro_m4.png',
    gallery: [
      '/products/ipad_pro_m4.png'
    ],
    description: 'Eng yupqa Apple qurilmasi (5.1mm). Tandem OLED Ultra Retina XDR displeyi va chaqmoqdek tez Apple M4 kremniy chipi.',
    specs: {
      chip: 'Apple M4 chip (Next-gen Neural Engine)',
      display: '13" Tandem OLED Ultra Retina XDR',
      thickness: '5.1mm rekord darajada yupqa',
      battery: '10 soatgacha simsiz internet'
    }
  },
  {
    id: 'macbook-pro-14',
    name: 'Apple MacBook Pro 14" M3 Pro (Space Black)',
    category: 'mac',
    badge: 'PRO PERFORMANCE',
    isGold: false,
    priceUSD: 1999,
    priceUZS: 25987000,
    costUSD: 1720,
    costUZS: 22360000,
    stock: 8,
    monthlySold: 24,
    rating: 5.0,
    reviewsCount: 52,
    storageOptions: ['512GB SSD', '1TB SSD'],
    selectedStorage: '512GB SSD',
    colors: [
      { name: 'Space Black', hex: '#1C1C1E', active: true },
      { name: 'Silver', hex: '#E5E5EA', active: false }
    ],
    image: '/products/macbook_pro_14.png',
    gallery: [
      '/products/macbook_pro_14.png'
    ],
    description: 'Barmoq iziga qarshi anodlangan Space Black korpus, Liquid Retina XDR displey va 22 soatgacha davom etadigan batareya avtonomligi.',
    specs: {
      chip: 'Apple M3 Pro (11-core CPU, 14-core GPU)',
      display: '14.2" Liquid Retina XDR ProMotion',
      memory: '18GB Unified Memory, 512GB SSD',
      battery: '22 soatgacha video ko\'rish'
    }
  },
  {
    id: 'acc-magsafe-gold-stand',
    name: 'Apple MagSafe Heavy Titanium Desktop Stand & Charger',
    category: 'accessories',
    badge: 'TITANIUM AKSESSUAR',
    isGold: true,
    goldKarat: 'Solid Brushed Titanium Base',
    priceUSD: 190,
    priceUZS: 2470000,
    costUSD: 110,
    costUZS: 1430000,
    stock: 14,
    monthlySold: 28,
    rating: 4.9,
    reviewsCount: 22,
    storageOptions: ['Qi2 15W Fast Charge'],
    selectedStorage: 'Qi2 15W Fast Charge',
    colors: [
      { name: 'Brushed Titanium Gray', hex: '#8E8E93', active: true }
    ],
    image: '/products/magsafe_charger.png',
    gallery: [
      '/products/magsafe_charger.png'
    ],
    description: 'Ish stoli uchun og\'ir metall va titan qoplamali magnitli zaryadlash stendi. iPhone uchun 15W eng tezkor MagSafe quvvati.',
    specs: {
      power: '15W Fast Wireless MagSafe',
      material: 'Og\'ir quyma metall va titan',
      weight: '450g (stol ustida siljimaydi)',
      cable: '2 metrli to\'qilgan grafit tusli kabel'
    }
  },
  {
    id: 'acc-adapter-35w',
    name: 'Apple 35W Dual USB-C Port Compact Power Adapter',
    category: 'accessories',
    badge: 'ORIGINAL QUVVAT',
    isGold: false,
    priceUSD: 65,
    priceUZS: 845000,
    costUSD: 45,
    costUZS: 585000,
    stock: 42,
    monthlySold: 67,
    rating: 4.8,
    reviewsCount: 96,
    storageOptions: ['Dual USB-C 35W'],
    selectedStorage: 'Dual USB-C 35W',
    colors: [
      { name: 'White', hex: '#FFFFFF', active: true }
    ],
    image: '/products/power_adapter.png',
    gallery: [
      '/products/power_adapter.png'
    ],
    description: 'Bir vaqtning o\'zida ikkita qurilmani (iPhone va Apple Watch yoki iPad) tezkor quvvatlaydigan ixcham original Apple adapteri.',
    specs: {
      power: '35W GaN Power Delivery',
      ports: '2 x USB-C',
      protection: 'Qizib ketishdan va ortiqcha tokdan aqlli himoya'
    }
  },
  {
    id: 'acc-case-gold-emblem',
    name: 'Apple iPhone 16 Pro Max Titanium Crest Leather Case',
    category: 'accessories',
    badge: 'ITALIAN LEATHER & TITANIUM',
    isGold: true,
    goldKarat: 'Titanium Apple Crest Emblem',
    priceUSD: 140,
    priceUZS: 1820000,
    costUSD: 70,
    costUZS: 910000,
    stock: 18,
    monthlySold: 41,
    rating: 5.0,
    reviewsCount: 38,
    storageOptions: ['iPhone 16 Pro Max', 'iPhone 16 Pro'],
    selectedStorage: 'iPhone 16 Pro Max',
    colors: [
      { name: 'Onyx Black', hex: '#1C1C1E', active: true },
      { name: 'Anthracite Gray', hex: '#3A3A3C', active: false }
    ],
    image: '/products/iphone_case.png',
    gallery: [
      '/products/iphone_case.png'
    ],
    description: 'Haqiqiy Italiya charmi, orqa qismida titan naqshli Apple gerbi va kuchli Neodimiy MagSafe magnitlari.',
    specs: {
      material: '100% Genuine Nappa Leather',
      magsafe: 'O\'rnatilgan N52 magnetlar',
      buttons: 'Metall qoplamali taktil tugmalar'
    }
  },
  {
    id: 'audio-beosound-gold',
    name: 'Bang & Olufsen × iLux BeoSound 2 Atelier Edition Titanium',
    category: 'accessories',
    badge: 'BANG & OLUFSEN × TITANIUM',
    isGold: true,
    goldKarat: 'Space Gray & Natural Titanium Brass',
    priceUSD: 3650,
    priceUZS: 47450000,
    costUSD: 2800,
    costUZS: 36400000,
    stock: 5,
    monthlySold: 19,
    rating: 5.0,
    reviewsCount: 31,
    storageOptions: ['360° Spherical Sound & AirPlay 2'],
    selectedStorage: '360° Spherical Sound & AirPlay 2',
    colors: [
      { name: 'Natural Titanium', hex: '#8E8E93', active: true },
      { name: 'Black Anthracite', hex: '#1C1C1E', active: false }
    ],
    image: '/products/beosound_speaker.png',
    gallery: [
      '/products/beosound_speaker.png'
    ],
    description: 'Bang & Olufsen va iLux Atelier hamkorligidagi konussimon akustik asar. Tabiiy titan korpus, 360 darajali tarqaluvchi akustik linza, o\'rnatilgan sensorli aylanma ovoz diski va Apple AirPlay 2 / Lossless audio qo\'llab-quvvatlovi.',
    specs: {
      acousticLens: '360° Spherical Sound Dispersion Technology',
      amplifier: '102W Peak Class D Acoustic Power',
      connectivity: 'Apple AirPlay 2, Spotify Connect, Bluetooth 5.3',
      coating: 'Sayqallangan titan metall korpus',
      control: 'Sensory Rotary Touch Wheel with Proximity Sensors'
    }
  },
  {
    id: 'airtag-single',
    name: 'Apple AirTag (Stainless Steel & Ultra-Wideband)',
    category: 'accessories',
    badge: 'ORIGINAL UWB',
    isGold: false,
    priceUSD: 35,
    priceUZS: 455000,
    costUSD: 25,
    costUZS: 325000,
    stock: 35,
    monthlySold: 72,
    rating: 4.9,
    reviewsCount: 120,
    storageOptions: ['1 dona', '4 talik to\'plam'],
    selectedStorage: '1 dona',
    colors: [
      { name: 'White / Silver', hex: '#F5F5F7', active: true }
    ],
    image: '/products/airtag.png',
    gallery: [
      '/products/airtag.png'
    ],
    description: 'Zanglamas po\'lat va Precision Finding U1 chipi. Kalit, hamyon va buyumlaringizni Find My tarmog\'i orqali santimetrigacha aniqlikda toping.',
    specs: {
      chip: 'Apple U1 Ultra-Wideband chip',
      battery: 'CR2032 (1 yildan ortiq ishlaydi)',
      waterproof: 'IP67 suv va changdan himoya'
    }
  }
];

// Valyuta kursi: 1 USD = 13,000 UZS (O'zbekiston Markaziy banki kursi)
export const USD_TO_UZS_RATE = 13000;
