// iLux Apple Store - LocalStorage va Holat Boshqaruvi

import { INITIAL_PRODUCTS, USD_TO_UZS_RATE } from './products';
import { INITIAL_ORDERS } from './initialOrders';

const STORAGE_KEYS = {
  PRODUCTS: 'ilux_products_v7',
  ORDERS: 'ilux_orders_v1',
  CURRENCY: 'ilux_currency_v1',
  POS_SALES: 'ilux_pos_sales_v1',
  WISHLIST: 'ilux_wishlist_v1',
  LANGUAGE: 'ilux_language_v1',
  THEME: 'ilux_theme_v1'
};

export const getStoredLanguage = () => {
  return localStorage.getItem(STORAGE_KEYS.LANGUAGE) || 'uz';
};

export const setStoredLanguage = (lang) => {
  localStorage.setItem(STORAGE_KEYS.LANGUAGE, lang);
};

export const getStoredTheme = () => {
  return localStorage.getItem(STORAGE_KEYS.THEME) || 'dark';
};

export const setStoredTheme = (theme) => {
  localStorage.setItem(STORAGE_KEYS.THEME, theme);
};

// Mahsulotlarni olish
export const getStoredProducts = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.PRODUCTS);
    if (data) {
      const parsed = JSON.parse(data);
      // Agar eski unsplash rasmlari qolgan bo'lsa, toza kesilgan rasmlarga yangilaymiz
      const hasOldUnsplash = Array.isArray(parsed) && parsed.some(p => p.image && p.image.includes('unsplash'));
      if (!hasOldUnsplash && parsed.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.error('Mahsulotlarni o\'qishda xatolik:', e);
  }
  saveStoredProducts(INITIAL_PRODUCTS);
  return INITIAL_PRODUCTS;
};

// Mahsulotlarni saqlash
export const saveStoredProducts = (products) => {
  try {
    localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(products));
  } catch (e) {
    console.error('Mahsulotlarni saqlashda xatolik:', e);
  }
};

// Buyurtmalarni olish
export const getStoredOrders = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.ORDERS);
    if (data) {
      return JSON.parse(data);
    }
  } catch (e) {
    console.error('Buyurtmalarni o\'qishda xatolik:', e);
  }
  saveStoredOrders(INITIAL_ORDERS);
  return INITIAL_ORDERS;
};

// Buyurtmalarni saqlash
export const saveStoredOrders = (orders) => {
  try {
    localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(orders));
  } catch (e) {
    console.error('Buyurtmalarni saqlashda xatolik:', e);
  }
};

// Valyutani olish (UZS yoki USD)
export const getStoredCurrency = () => {
  return localStorage.getItem(STORAGE_KEYS.CURRENCY) || 'USD';
};

export const setStoredCurrency = (curr) => {
  localStorage.setItem(STORAGE_KEYS.CURRENCY, curr);
};

// Sevimlilar (Wishlist)
export const getStoredWishlist = () => {
  try {
    const data = localStorage.getItem(STORAGE_KEYS.WISHLIST);
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

export const saveStoredWishlist = (ids) => {
  localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(ids));
};

// Ombor qoldig'ini o'zgartirish (Tezkor +/-)
export const updateProductStock = (productId, delta) => {
  const products = getStoredProducts();
  const updated = products.map((p) => {
    if (p.id === productId) {
      const newStock = Math.max(0, (p.stock || 0) + delta);
      return { ...p, stock: newStock };
    }
    return p;
  });
  saveStoredProducts(updated);
  return updated;
};

// Narx formatlagich
export const formatPrice = (amountUSD, currency = 'USD') => {
  if (currency === 'UZS') {
    const uzs = Math.round(amountUSD * USD_TO_UZS_RATE);
    return uzs.toLocaleString('uz-UZ') + " so'm";
  }
  return '$' + Number(amountUSD).toLocaleString('en-US');
};

// Tahlil va Statistikalarni Hisoblash
export const calculateAnalytics = (products, orders) => {
  // 1. Umumiy hisoblangan tushum va sof foyda
  let totalRevenueUSD = 0;
  let totalProfitUSD = 0;

  // Buyurtmalar bo'yicha tushum
  orders.forEach((order) => {
    if (order.status !== 'Bekor qilindi') {
      totalRevenueUSD += order.totalUSD || 0;
      totalProfitUSD += order.profitUSD || (order.totalUSD * 0.18); // Default marja
    }
  });

  // Oylik sotuvlar bo'yicha qo'shimcha statistik summa
  products.forEach((p) => {
    const sold = p.monthlySold || 0;
    const profitPerUnit = (p.priceUSD || 0) - (p.costUSD || p.priceUSD * 0.78);
    totalRevenueUSD += sold * (p.priceUSD || 0);
    totalProfitUSD += sold * profitPerUnit;
  });

  // 2. Ombordagi jami tovarlar soni va umumiy tannarx qiymati
  let totalStockCount = 0;
  let totalStockValueUSD = 0;
  const lowStockItems = [];

  products.forEach((p) => {
    const stock = Number(p.stock) || 0;
    totalStockCount += stock;
    totalStockValueUSD += stock * (p.costUSD || p.priceUSD * 0.78);
    if (stock <= 3) {
      lowStockItems.push(p);
    }
  });

  // 3. "Bu oyda qaysi tovar ko'p sotildi" (Top tovarlar reytingi)
  const topSelling = [...products]
    .sort((a, b) => (b.monthlySold || 0) - (a.monthlySold || 0))
    .slice(0, 5)
    .map((item, index) => ({
      rank: index + 1,
      id: item.id,
      name: item.name,
      category: item.category,
      badge: item.badge,
      image: item.image,
      monthlySold: item.monthlySold || 0,
      priceUSD: item.priceUSD,
      totalSoldRevenueUSD: (item.monthlySold || 0) * item.priceUSD,
      stock: item.stock
    }));

  return {
    totalRevenueUSD,
    totalProfitUSD,
    totalStockCount,
    totalStockValueUSD,
    lowStockItems,
    topSelling,
    totalOrdersCount: orders.length,
    activeOrdersCount: orders.filter((o) => o.status !== 'Yakunlandi' && o.status !== 'Bekor qilindi').length
  };
};

// Barcha ma'lumotlarni qayta tiklash (Zavod holati)
export const resetStoreData = () => {
  localStorage.setItem(STORAGE_KEYS.PRODUCTS, JSON.stringify(INITIAL_PRODUCTS));
  localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(INITIAL_ORDERS));
  return { products: INITIAL_PRODUCTS, orders: INITIAL_ORDERS };
};
