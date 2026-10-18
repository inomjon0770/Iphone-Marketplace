import React, { useState, useEffect, useMemo } from 'react';
import { 
  getStoredProducts, 
  saveStoredProducts, 
  getStoredOrders, 
  saveStoredOrders, 
  getStoredCurrency, 
  setStoredCurrency, 
  getStoredWishlist, 
  saveStoredWishlist, 
  getStoredTheme,
  setStoredTheme,
  getStoredLanguage,
  setStoredLanguage,
  calculateAnalytics, 
  resetStoreData 
} from './data/storage';
import { TRANSLATIONS } from './data/translations';

import { Navbar } from './components/Navbar';
import { Catalog } from './components/Catalog';
import { ProductModal } from './components/ProductModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { ReceiptModal } from './components/ReceiptModal';
import { AdminLayout } from './components/Admin/AdminLayout';
import { NovaScrollJourney } from './components/NovaScrollJourney';
import { Footer } from './components/Footer';
import { ThreeDPhoneStudio } from './components/ThreeDPhoneStudio';
import { AcousticStudio } from './components/AcousticStudio';

export function App() {
  // Theme & Language State
  const [theme, setTheme] = useState(() => getStoredTheme());
  const [language, setLanguage] = useState(() => getStoredLanguage());

  // Central State
  const [products, setProducts] = useState(() => getStoredProducts());
  const [orders, setOrders] = useState(() => getStoredOrders());
  const [currency, setCurrency] = useState(() => getStoredCurrency());
  const [wishlist, setWishlist] = useState(() => getStoredWishlist());
  const [cart, setCart] = useState([]);

  // Navigation & UI State
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [checkoutData, setCheckoutData] = useState(null);
  const [receiptOrder, setReceiptOrder] = useState(null);

  // Synchronize theme to document element & storage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredTheme(theme);
  }, [theme]);

  // Synchronize language to storage
  useEffect(() => {
    setStoredLanguage(language);
  }, [language]);

  // Get active translation dictionary
  const t = useMemo(() => {
    return TRANSLATIONS[language] || TRANSLATIONS.uz;
  }, [language]);

  // Synchronize products to localStorage
  useEffect(() => {
    saveStoredProducts(products);
  }, [products]);

  // Synchronize orders to localStorage
  useEffect(() => {
    saveStoredOrders(orders);
  }, [orders]);

  // Synchronize wishlist to localStorage
  useEffect(() => {
    saveStoredWishlist(wishlist);
  }, [wishlist]);

  // Calculate live analytics for Admin & Storefront
  const analytics = useMemo(() => {
    return calculateAnalytics(products, orders);
  }, [products, orders]);

  // Handlers
  const handleToggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleSelectLanguage = (newLang) => {
    setLanguage(newLang);
  };

  const handleToggleCurrency = () => {
    const next = currency === 'USD' ? 'UZS' : 'USD';
    setCurrency(next);
    setStoredCurrency(next);
  };

  const handleToggleFavorite = (productId) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        return prev.filter((id) => id !== productId);
      }
      return [...prev, productId];
    });
  };

  const handleAddToCart = (product) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += 1;
        return updated;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const handleUpdateCartQty = (productId, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveCartItem = (productId) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Checkout trigger
  const handleProceedCheckout = (data) => {
    setIsCartOpen(false);
    setCheckoutData(data);
  };

  // Submit client order
  const handleSubmitOrder = (newOrder) => {
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        const orderedItem = newOrder.items.find((it) => it.id === p.id);
        if (orderedItem) {
          const newStock = Math.max(0, (p.stock || 0) - orderedItem.quantity);
          const newSold = (p.monthlySold || 0) + orderedItem.quantity;
          return { ...p, stock: newStock, monthlySold: newSold };
        }
        return p;
      });
    });

    setOrders((prevOrders) => [newOrder, ...prevOrders]);
    setCart([]);
    setCheckoutData(null);
    setReceiptOrder(newOrder);
  };

  // Fast buy from product modal or hero
  const handleFastBuy = (product) => {
    setSelectedProduct(null);
    setCheckoutData({
      totalUSD: product.priceUSD || product.price,
      discountPercent: 0,
      items: [{ ...product, quantity: 1 }]
    });
  };

  // Admin: Save product (Add or Edit)
  const handleSaveProduct = (prodData) => {
    setProducts((prev) => {
      const exists = prev.some((p) => p.id === prodData.id);
      if (exists) {
        return prev.map((p) => (p.id === prodData.id ? prodData : p));
      }
      return [prodData, ...prev];
    });
  };

  // Admin: Delete product
  const handleDeleteProduct = (productId) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  // Admin: Update Stock +/-
  const handleUpdateStock = (productId, delta) => {
    setProducts((prev) => {
      return prev.map((p) => {
        if (p.id === productId) {
          return { ...p, stock: Math.max(0, (p.stock || 0) + delta) };
        }
        return p;
      });
    });
  };

  // Admin: Update order status
  const handleUpdateOrderStatus = (orderId, newStatus) => {
    setOrders((prev) => {
      return prev.map((o) => (o.id === orderId ? { ...o, status: newStatus } : o));
    });
  };

  // Admin: POS Sale
  const handleCompletePOSSale = (posOrder) => {
    setProducts((prevProducts) => {
      return prevProducts.map((p) => {
        const itemInSale = posOrder.items.find((it) => it.id === p.id);
        if (itemInSale) {
          const newStock = Math.max(0, (p.stock || 0) - itemInSale.quantity);
          const newSold = (p.monthlySold || 0) + itemInSale.quantity;
          return { ...p, stock: newStock, monthlySold: newSold };
        }
        return p;
      });
    });

    setOrders((prevOrders) => [posOrder, ...prevOrders]);
    setReceiptOrder(posOrder);
  };

  // Admin: Reset Demo Data
  const handleResetDemoData = () => {
    const { products: p, orders: o } = resetStoreData();
    setProducts(p);
    setOrders(o);
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Apple Cupertino Navbar with Theme & Language Switches */}
      <Navbar
        activeCategory={activeCategory}
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (isAdminOpen) setIsAdminOpen(false);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        currency={currency}
        onToggleCurrency={handleToggleCurrency}
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        wishlistCount={wishlist.length}
        onOpenWishlist={() => {
          if (wishlist.length === 0) {
            alert(t.nav?.favoritesTitle ? `${t.nav.favoritesTitle} bo'sh` : "Sevimlilar ro'yxati hozircha bo'sh.");
          } else {
            alert(`${t.nav?.favoritesTitle || 'Sevimlilar'}: ${wishlist.length}`);
          }
        }}
        isAdminOpen={isAdminOpen}
        onToggleAdmin={() => setIsAdminOpen(!isAdminOpen)}
        ordersCount={orders.filter((o) => o.status === 'Yangi').length}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        language={language}
        onSelectLanguage={handleSelectLanguage}
        t={t}
      />

      {/* Main Content: Storefront or Admin Panel */}
      <main style={{ flex: 1 }}>
        {isAdminOpen ? (
          /* ================= ADMIN & SELLER PANEL ================= */
          <AdminLayout
            products={products}
            orders={orders}
            currency={currency}
            analytics={analytics}
            onBackToStore={() => setIsAdminOpen(false)}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onUpdateStock={handleUpdateStock}
            onUpdateOrderStatus={handleUpdateOrderStatus}
            onCompletePOSSale={handleCompletePOSSale}
            onPrintReceipt={(ord) => setReceiptOrder(ord)}
            onResetDemoData={handleResetDemoData}
          />
        ) : (
          /* ================= CLIENT STOREFRONT ================= */
          <>
            {/* 3D Kinetic Scroll Journey Hero */}
            {activeCategory === 'all' && !searchQuery && (
              <NovaScrollJourney
                onExploreCollection={() => {
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                onShopNow={() => {
                  const heroProduct = products.find((p) => p.id === 'gold-16-pm-falcon') || products[0];
                  handleFastBuy(heroProduct);
                }}
                t={t}
              />
            )}

            {/* 3D Interactive WebGL iPhone Studio */}
            {activeCategory === 'all' && !searchQuery && (
              <ThreeDPhoneStudio
                currency={currency}
                onAddToCart={handleAddToCart}
                onFastBuy={handleFastBuy}
                t={t}
              />
            )}

            {/* Apple Products Catalog with Magnetic 3D Cards */}
            <Catalog
              products={products}
              currency={currency}
              activeCategory={activeCategory}
              onSelectCategory={setActiveCategory}
              searchQuery={searchQuery}
              favorites={wishlist}
              onToggleFavorite={handleToggleFavorite}
              onSelectProduct={(prod) => setSelectedProduct(prod)}
              onAddToCart={handleAddToCart}
              t={t?.catalog || t}
            />

            {/* Bang & Olufsen × iLux BeoSound 2 Acoustic Studio */}
            {activeCategory === 'all' && !searchQuery && (
              <AcousticStudio
                currency={currency}
                onAddToCart={handleAddToCart}
                onFastBuy={handleFastBuy}
              />
            )}
          </>
        )}
      </main>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        currency={currency}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onFastBuy={handleFastBuy}
        t={t}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        orders={orders}
        onUpdateQuantity={handleUpdateCartQty}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
        onProceedCheckout={handleProceedCheckout}
        onViewReceipt={(ord) => setReceiptOrder(ord)}
        currency={currency}
        t={t}
      />

      {/* Fast Checkout Modal */}
      <CheckoutModal
        isOpen={!!checkoutData}
        onClose={() => setCheckoutData(null)}
        checkoutData={checkoutData}
        currency={currency}
        onSubmitOrder={handleSubmitOrder}
        t={t}
      />

      {/* Fiscal / Cashier Receipt Modal */}
      <ReceiptModal
        isOpen={!!receiptOrder}
        onClose={() => setReceiptOrder(null)}
        order={receiptOrder}
        currency={currency}
      />

      {/* Apple Atelier Footer */}
      <Footer 
        onSelectCategory={(cat) => {
          setActiveCategory(cat);
          if (isAdminOpen) setIsAdminOpen(false);
          const el = document.getElementById('catalog-section');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }} 
        t={t}
      />

    </div>
  );
}

export default App;
