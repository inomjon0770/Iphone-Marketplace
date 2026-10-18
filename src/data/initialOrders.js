// iLux Apple Store - Boshlang'ich Buyurtmalar Ro'yxati

export const INITIAL_ORDERS = [
  {
    id: 'ORD-9841',
    customerName: 'Shoxrux Alimov',
    phone: '+998 90 123 45 67',
    city: 'Toshkent sh., Mirobod tumani',
    address: 'Amir Temur shox ko\'chasi, 45-uy',
    paymentMethod: 'Karta orqali (Uzcard/Humo)',
    status: 'Yangi', // Yangi, Qabul qilindi, Yetkazilmoqda, Yakunlandi, Bekor qilindi
    date: '2026-10-10 11:45',
    items: [
      {
        id: 'gold-16-pm-falcon',
        name: 'iPhone 16 Pro Max 24K Gold Falcon Edition (512GB)',
        priceUSD: 3499,
        priceUZS: 45487000,
        costUSD: 2700,
        costUZS: 35100000,
        quantity: 1
      },
      {
        id: 'acc-case-gold-emblem',
        name: 'Apple iPhone 16 Pro Max 24K Gold Crest Leather Case',
        priceUSD: 140,
        priceUZS: 1820000,
        costUSD: 70,
        costUZS: 910000,
        quantity: 1
      }
    ],
    totalUSD: 3639,
    totalUZS: 47307000,
    profitUSD: 869,
    profitUZS: 11297000,
    note: 'Oltin sertifikatini konvertga solib bering, sovg\'aga olinyapti.'
  },
  {
    id: 'ORD-9838',
    customerName: 'Jasur Beknazarov',
    phone: '+998 97 765 43 21',
    city: 'Samarqand sh.',
    address: 'Registon ko\'chasi, 12',
    paymentMethod: 'Bo\'lib to\'lash (0-0-12)',
    status: 'Yetkazilmoqda',
    date: '2026-10-09 17:20',
    items: [
      {
        id: 'iphone-16-pm-official',
        name: 'Apple iPhone 16 Pro Max (Desert Titanium 256GB)',
        priceUSD: 1450,
        priceUZS: 18850000,
        costUSD: 1280,
        costUZS: 16640000,
        quantity: 1
      },
      {
        id: 'audio-airpods-pro-2',
        name: 'Apple AirPods Pro 2 (USB-C)',
        priceUSD: 230,
        priceUZS: 2990000,
        costUSD: 185,
        costUZS: 2405000,
        quantity: 1
      }
    ],
    totalUSD: 1680,
    totalUZS: 21840000,
    profitUSD: 215,
    profitUZS: 2795000,
    note: 'Kuryer yetib borganda telefon qilsin.'
  },
  {
    id: 'ORD-9832',
    customerName: 'Nodira Karimova',
    phone: '+998 93 555 88 99',
    city: 'Toshkent sh., Shayxontohur tumani',
    address: 'Navoiy ko\'chasi, 21',
    paymentMethod: 'Naqd pul (Qabul qilinganda)',
    status: 'Yakunlandi',
    date: '2026-10-08 14:10',
    items: [
      {
        id: 'gold-15-pm-rose',
        name: 'iPhone 15 Pro Max 18K Rose Gold & Damascus',
        priceUSD: 2299,
        priceUZS: 29887000,
        costUSD: 1750,
        costUZS: 22750000,
        quantity: 1
      }
    ],
    totalUSD: 2299,
    totalUZS: 29887000,
    profitUSD: 549,
    profitUZS: 7137000,
    note: 'Mijoz do\'kondan olib ketdi (Yakunlangan).'
  }
];
