import React, { useState, useMemo } from 'react';
import { ProductCard } from './ProductCard';
import { SlidersHorizontal, Sparkles, Filter, ArrowUpDown } from 'lucide-react';

export const Catalog = ({
  products,
  currency,
  activeCategory,
  onSelectCategory,
  searchQuery,
  favorites,
  onToggleFavorite,
  onSelectProduct,
  onAddToCart,
  t
}) => {
  const [sortBy, setSortBy] = useState('popular');
  const [inStockOnly, setInStockOnly] = useState(false);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'gold' && !p.isGold) return false;
        if (activeCategory !== 'gold' && p.category !== activeCategory) return false;
      }
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchName = p.name.toLowerCase().includes(query);
        const matchDesc = p.description?.toLowerCase().includes(query);
        const matchKarat = p.goldKarat?.toLowerCase().includes(query);
        if (!matchName && !matchDesc && !matchKarat) return false;
      }
      if (inStockOnly && p.stock <= 0) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'popular') return (b.monthlySold || 0) - (a.monthlySold || 0);
      if (sortBy === 'price-asc') return a.priceUSD - b.priceUSD;
      if (sortBy === 'price-desc') return b.priceUSD - a.priceUSD;
      if (sortBy === 'stock') return b.stock - a.stock;
      return 0;
    });
  }, [products, activeCategory, searchQuery, inStockOnly, sortBy]);

  const catTitle = activeCategory === 'gold' ? (t?.filterGold || 'Titanium Atelier') :
    activeCategory === 'iphone' ? 'Apple iPhone' :
    activeCategory === 'mac' || activeCategory === 'macbook' ? 'Apple MacBook' :
    activeCategory === 'ipad' ? 'Apple iPad' :
    activeCategory === 'watch' ? 'Apple Watch' :
    activeCategory === 'audio' ? 'Apple AirPods' :
    activeCategory === 'accessories' ? (t?.filterAccessories || 'Aksessuarlar') :
    (t?.title || 'Rasmiy Apple Mahsulotlari');

  return (
    <section 
      style={{ 
        padding: '70px 0 90px 0', 
        background: 'var(--bg-primary, #0b0c0e)', 
        borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        transition: 'background-color 0.3s ease'
      }} 
      id="catalog-section"
    >
      <div className="app-container">
        
        {/* Controls Bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '20px',
          borderBottom: '1px solid var(--border-subtle, #22262b)'
        }}>
          <div>
            <div className="eyebrow" style={{ color: 'var(--accent-cyan, #73c4ff)', marginBottom: '6px' }}>
              {t?.subtitle || 'Barcha modellar original zavod qutisida'}
            </div>
            <h2 style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--text-primary, #edf0f3)',
              fontFamily: '"Space Grotesk", sans-serif'
            }}>
              {catTitle}
            </h2>
            <div style={{ fontSize: '0.84rem', color: 'var(--text-secondary, #8e959d)', marginTop: '4px' }}>
              <b>{filteredProducts.length}</b> {t?.itemsCount || 'ta mahsulot'}
              {searchQuery && ` ("${searchQuery}")`}
            </div>
          </div>

          {/* Sort & Filter Controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '0.8rem',
              color: 'var(--text-primary, #cbd2d9)',
              cursor: 'pointer',
              background: 'var(--badge-bg, #16191e)',
              padding: '9px 16px',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle, #2a3038)',
              transition: 'all 0.2s ease'
            }}>
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                style={{ accentColor: 'var(--accent-cyan, #77c5ff)', cursor: 'pointer' }}
              />
              <span>{t?.inStock || 'Omborda borlari'}</span>
            </label>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: 'var(--badge-bg, #16191e)',
              padding: '9px 16px',
              borderRadius: '999px',
              border: '1px solid var(--border-subtle, #2a3038)'
            }}>
              <ArrowUpDown size={14} color="var(--accent-cyan, #73c4ff)" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-primary, #edf0f3)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  outline: 'none',
                  cursor: 'pointer'
                }}
              >
                <option value="popular" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>🔥 {t?.sortRecommended || 'Eng ko\'p sotilgan'}</option>
                <option value="price-desc" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>💎 {t?.sortPriceDesc || 'Narx: Qimmatdan arzonga'}</option>
                <option value="price-asc" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>🏷️ {t?.sortPriceAsc || 'Narx: Arzondan qimmatga'}</option>
                <option value="stock" style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>📦 {t?.sortRating || 'Ombor qoldig\'i'}</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 280px), 1fr))',
            gap: '24px'
          }}>
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                currency={currency}
                isFavorite={favorites.includes(product.id)}
                onToggleFavorite={onToggleFavorite}
                onSelectProduct={onSelectProduct}
                onAddToCart={onAddToCart}
                t={t}
              />
            ))}
          </div>
        ) : (
          <div style={{
            textAlign: 'center',
            padding: '70px 20px',
            background: 'var(--card-bg, #111316)',
            borderRadius: '24px',
            border: '1px dashed var(--border-subtle, #2a3038)',
            color: 'var(--text-primary, #edf0f3)'
          }}>
            <Sparkles size={36} color="var(--accent-cyan, #73c4ff)" style={{ marginBottom: '14px' }} />
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, marginBottom: '8px' }}>
              {t?.noProducts || 'Hech qanday mahsulot topilmadi'}
            </h3>
            <p style={{ fontSize: '0.86rem', color: 'var(--text-secondary, #86868b)', marginBottom: '20px' }}>
              Qidiruv so‘zini o‘zgartirib ko‘ring yoki boshqa toifalarni tanlang.
            </p>
            <button
              onClick={() => onSelectCategory('all')}
              style={{
                background: 'var(--accent-btn-bg, #73c4ff)',
                color: 'var(--accent-btn-text, #0b0c0e)',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '999px',
                fontSize: '0.84rem',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {t?.filterAll || 'Barcha Mahsulotlarni Ko‘rish'}
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
