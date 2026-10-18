import React, { useState } from 'react';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  SlidersHorizontal, 
  Crown, 
  Smartphone, 
  Watch, 
  Headphones, 
  Zap, 
  Menu, 
  X, 
  LayoutDashboard,
  Sparkles,
  ShieldCheck,
  Sun,
  Moon,
  Laptop,
  Tablet,
  Globe
} from 'lucide-react';

export const Navbar = ({
  activeCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange,
  currency,
  onToggleCurrency,
  cartCount,
  onOpenCart,
  wishlistCount,
  onOpenWishlist,
  isAdminOpen,
  onToggleAdmin,
  ordersCount,
  onOpenIntroAd,
  theme,
  onToggleTheme,
  language,
  onSelectLanguage,
  t
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);

  const navT = t?.nav || {};

  const categories = [
    { id: 'all', label: navT.all || 'Barchasi', icon: SlidersHorizontal },
    { id: 'gold', label: navT.gold || 'Titanium Atelier', icon: ShieldCheck, isGold: true },
    { id: 'iphone', label: navT.iphone || 'iPhone', icon: Smartphone },
    { id: 'mac', label: navT.mac || 'Mac', icon: Laptop },
    { id: 'ipad', label: navT.ipad || 'iPad', icon: Tablet },
    { id: 'watch', label: navT.watch || 'Watch', icon: Watch },
    { id: 'audio', label: navT.airpods || 'AirPods', icon: Headphones },
    { id: 'accessories', label: navT.accessories || 'Aksessuarlar', icon: Zap }
  ];

  const languages = [
    { code: 'uz', label: 'UZ', full: "O'zbekcha" },
    { code: 'ru', label: 'RU', full: 'Русский' },
    { code: 'en', label: 'EN', full: 'English' }
  ];

  return (
    <header style={{
      position: 'sticky',
      top: 0,
      zIndex: 900,
      background: 'var(--navbar-bg, rgba(11, 12, 14, 0.88))',
      backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
      transition: 'all 0.25s ease'
    }}>
      <div className="app-container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '60px',
        gap: '12px'
      }}>
        {/* Apple Brand Icon */}
        <div 
          onClick={() => { onSelectCategory('all'); if (isAdminOpen) onToggleAdmin(); }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            userSelect: 'none'
          }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'var(--text-primary, #edf0f3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bg-primary, #0b0c0e)',
            boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)'
          }}>
            <Crown size={16} color="currentColor" />
          </div>
          <div>
            <div style={{
              fontSize: '1rem',
              fontWeight: 800,
              letterSpacing: '-0.02em',
              color: 'var(--text-primary, #edf0f3)',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}>
              <span>Apple</span>
              <span style={{ 
                color: 'var(--accent-cyan, #73c4ff)', 
                fontFamily: '"Space Grotesk", sans-serif',
                fontWeight: 700,
                fontSize: '0.86rem' 
              }}>
                Store
              </span>
            </div>
          </div>
        </div>

        {/* Desktop Category Navigation */}
        <nav style={{
          display: 'none',
          alignItems: 'center',
          gap: '3px'
        }} className="desktop-nav">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id && !isAdminOpen;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  if (isAdminOpen) onToggleAdmin();
                }}
                style={{
                  background: isActive 
                    ? 'rgba(115, 196, 255, 0.15)' 
                    : 'transparent',
                  color: isActive 
                    ? 'var(--accent-cyan, #73c4ff)' 
                    : 'var(--text-secondary, #8e949b)',
                  border: isActive ? '1px solid rgba(115, 196, 255, 0.3)' : '1px solid transparent',
                  padding: '5px 11px',
                  borderRadius: 'var(--radius-full, 999px)',
                  fontSize: '0.78rem',
                  fontWeight: isActive ? 700 : 500,
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  transition: 'all 0.18s ease'
                }}
              >
                <Icon size={13} color={isActive ? 'var(--accent-cyan, #73c4ff)' : undefined} />
                <span>{cat.label}</span>
              </button>
            );
          })}
        </nav>

        {/* Right Controls: Search, Lang, Theme, Currency, Wishlist, Cart & Admin */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          
          {/* Live Search - Desktop Only */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }} className="hidden lg:flex desktop-only-control">
            <Search 
              size={13} 
              color="var(--text-tertiary, #8e949b)" 
              style={{ position: 'absolute', left: '10px', pointerEvents: 'none' }} 
            />
            <input
              type="text"
              placeholder={navT.searchPlaceholder || 'Qidiruv...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                borderRadius: 'var(--radius-full, 999px)',
                padding: '6px 12px 6px 30px',
                color: 'var(--text-primary, #edf0f3)',
                fontSize: '0.76rem',
                width: '135px',
                outline: 'none',
                transition: 'all 0.2s ease'
              }}
              onFocus={(e) => {
                e.target.style.width = '175px';
                e.target.style.borderColor = 'var(--accent-cyan, #73c4ff)';
              }}
              onBlur={(e) => {
                if (!e.target.value) e.target.style.width = '135px';
                e.target.style.borderColor = 'var(--border-subtle, rgba(255, 255, 255, 0.1))';
              }}
            />
          </div>

          {/* 3-Language Switcher - Desktop Only */}
          <div style={{
            alignItems: 'center',
            background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
            borderRadius: 'var(--radius-full, 999px)',
            padding: '2px',
            gap: '2px'
          }} className="desktop-only-control">
            {languages.map((l) => {
              const isSelected = language === l.code;
              return (
                <button
                  key={l.code}
                  onClick={() => onSelectLanguage(l.code)}
                  title={l.full}
                  style={{
                    background: isSelected ? 'var(--accent-cyan, #73c4ff)' : 'transparent',
                    color: isSelected ? '#0b0c0e' : 'var(--text-secondary, #8e949b)',
                    border: 'none',
                    fontWeight: 700,
                    fontSize: '0.68rem',
                    padding: '4px 7px',
                    borderRadius: 'var(--radius-full, 999px)',
                    cursor: 'pointer',
                    transition: 'all 0.18s ease'
                  }}
                >
                  {l.label}
                </button>
              );
            })}
          </div>

          {/* Currency Switcher - Desktop Only */}
          <button
            onClick={onToggleCurrency}
            title="Valyutani almashtirish (USD / UZS)"
            style={{
              background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              color: 'var(--text-primary, #edf0f3)',
              fontWeight: 700,
              fontSize: '0.72rem',
              padding: '6px 10px',
              borderRadius: 'var(--radius-full, 999px)',
              cursor: 'pointer'
            }}
            className="desktop-only-control"
          >
            <span>{currency === 'USD' ? '$ USD' : "SO'M"}</span>
          </button>

          {/* Dark Mode / Light Mode Toggle Switch (Universal on both Mobile & Desktop) */}
          <button
            onClick={onToggleTheme}
            title={theme === 'dark' ? (navT.themeLight || 'Kunduzgi rejim') : (navT.themeDark || 'Tungi rejim')}
            style={{
              background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              color: 'var(--text-primary, #edf0f3)',
              padding: '7px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              width: '32px',
              height: '32px'
            }}
          >
            {theme === 'dark' ? (
              <Sun size={15} color="#ffd60a" />
            ) : (
              <Moon size={15} color="#0071e3" />
            )}
          </button>

          {/* Wishlist Button */}
          <button
            onClick={onOpenWishlist}
            title={navT.favoritesTitle || 'Sevimlilar'}
            style={{
              background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              color: wishlistCount > 0 ? '#ff453a' : 'var(--text-secondary, #8e949b)',
              padding: '7px',
              borderRadius: '50%',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              width: '32px',
              height: '32px'
            }}
          >
            <Heart size={15} fill={wishlistCount > 0 ? '#ff453a' : 'none'} />
            {wishlistCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-3px',
                right: '-3px',
                background: '#ff453a',
                color: '#fff',
                fontSize: '0.6rem',
                fontWeight: 700,
                width: '15px',
                height: '15px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Button (Always visible on all screens) */}
          <button
            onClick={onOpenCart}
            title={navT.cartTitle || 'Savatcha'}
            style={{
              background: 'var(--accent-btn-bg, #73c4ff)',
              color: 'var(--accent-btn-text, #0b0c0e)',
              border: 'none',
              padding: '6px 12px',
              borderRadius: 'var(--radius-full, 999px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.78rem',
              fontWeight: 700,
              boxShadow: '0 2px 10px rgba(0, 0, 0, 0.18)'
            }}
          >
            <ShoppingBag size={14} />
            <span>{cartCount}</span>
          </button>

          {/* Admin Panel Toggle - Desktop Only */}
          <button
            onClick={onToggleAdmin}
            style={{
              background: isAdminOpen ? 'var(--accent-cyan, #73c4ff)' : 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
              color: isAdminOpen ? '#0b0c0e' : 'var(--text-primary, #edf0f3)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              fontWeight: 700,
              fontSize: '0.74rem',
              padding: '6px 11px',
              borderRadius: 'var(--radius-full, 999px)',
              cursor: 'pointer',
              alignItems: 'center',
              gap: '5px'
            }}
            className="desktop-only-control"
          >
            <LayoutDashboard size={13} />
            <span>
              {isAdminOpen ? "Do'kon" : (navT.admin || "Admin")}
            </span>
            {ordersCount > 0 && !isAdminOpen && (
              <span style={{
                background: '#ff453a',
                color: '#fff',
                fontSize: '0.6rem',
                padding: '1px 5px',
                borderRadius: '8px'
              }}>
                {ordersCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              display: 'none',
              background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              color: 'var(--text-primary, #edf0f3)',
              cursor: 'pointer',
              padding: '6px',
              borderRadius: 'var(--radius-sm, 8px)',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px'
            }}
            className="mobile-menu-btn"
            aria-label="Menyu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div style={{
          background: 'var(--bg-card, #121519)',
          borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          padding: '16px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px',
          animation: 'modalFadeIn 0.2s ease-out'
        }}>
          {/* Mobile Search Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <Search 
              size={14} 
              color="var(--text-tertiary, #8e949b)" 
              style={{ position: 'absolute', left: '12px', pointerEvents: 'none' }} 
            />
            <input
              type="text"
              placeholder={navT.searchPlaceholder || 'Apple mahsulotlarini qidirish...'}
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
                borderRadius: 'var(--radius-md, 12px)',
                padding: '9px 14px 9px 36px',
                color: 'var(--text-primary, #edf0f3)',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Categories Grid */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id && !isAdminOpen;
              return (
                <button
                  key={cat.id}
                  onClick={() => {
                    onSelectCategory(cat.id);
                    if (isAdminOpen) onToggleAdmin();
                    setMobileMenuOpen(false);
                  }}
                  style={{
                    background: isActive ? 'var(--badge-bg, rgba(255, 255, 255, 0.08))' : 'transparent',
                    color: isActive ? 'var(--accent-cyan, #73c4ff)' : 'var(--text-primary, #edf0f3)',
                    border: 'none',
                    padding: '9px 12px',
                    borderRadius: 'var(--radius-md, 12px)',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    fontSize: '0.86rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <Icon size={16} color={isActive ? 'var(--accent-cyan, #73c4ff)' : undefined} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Quick Settings: Language & Currency Switcher Row */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingTop: '10px',
            borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
            gap: '10px'
          }}>
            {/* Language Switch */}
            <div style={{
              display: 'flex',
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
              borderRadius: 'var(--radius-full, 999px)',
              padding: '2px',
              gap: '2px'
            }}>
              {languages.map((l) => {
                const isSelected = language === l.code;
                return (
                  <button
                    key={l.code}
                    onClick={() => onSelectLanguage(l.code)}
                    style={{
                      background: isSelected ? 'var(--accent-cyan, #73c4ff)' : 'transparent',
                      color: isSelected ? '#0b0c0e' : 'var(--text-secondary, #8e949b)',
                      border: 'none',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      padding: '5px 9px',
                      borderRadius: 'var(--radius-full, 999px)',
                      cursor: 'pointer'
                    }}
                  >
                    {l.label}
                  </button>
                );
              })}
            </div>

            {/* Currency Button */}
            <button
              onClick={onToggleCurrency}
              style={{
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                color: 'var(--text-primary, #edf0f3)',
                fontWeight: 700,
                fontSize: '0.76rem',
                padding: '6px 14px',
                borderRadius: 'var(--radius-full, 999px)',
                cursor: 'pointer'
              }}
            >
              {currency === 'USD' ? '$ USD' : "SO'M"}
            </button>
          </div>

          {/* Admin Panel Toggle for Mobile */}
          <button
            onClick={() => {
              onToggleAdmin();
              setMobileMenuOpen(false);
            }}
            style={{
              width: '100%',
              background: isAdminOpen ? 'var(--accent-cyan, #73c4ff)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
              color: isAdminOpen ? '#0b0c0e' : 'var(--text-primary, #edf0f3)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              borderRadius: 'var(--radius-md, 12px)',
              padding: '10px 14px',
              fontWeight: 700,
              fontSize: '0.84rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              cursor: 'pointer'
            }}
          >
            <LayoutDashboard size={15} />
            <span>{isAdminOpen ? "Do'kon vitrinasiga qaytish" : (navT.admin || "Admin Boshqaruv Paneli")}</span>
            {ordersCount > 0 && !isAdminOpen && (
              <span style={{
                background: '#ff453a',
                color: '#fff',
                fontSize: '0.62rem',
                padding: '1px 6px',
                borderRadius: '10px'
              }}>
                {ordersCount}
              </span>
            )}
          </button>
        </div>
      )}

      <style>{`
        @media (min-width: 960px) {
          .desktop-nav { display: flex !important; }
          .desktop-only-control { display: flex !important; }
          .mobile-menu-btn { display: none !important; }
        }
        @media (max-width: 959px) {
          .desktop-nav { display: none !important; }
          .desktop-only-control { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
        }
      `}</style>
    </header>
  );
};
