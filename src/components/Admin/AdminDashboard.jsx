import React from 'react';
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  AlertTriangle, 
  Flame, 
  Award, 
  Crown, 
  ArrowUpRight, 
  Plus, 
  ShoppingBag,
  Clock
} from 'lucide-react';
import { formatPrice } from '../../data/storage';

export const AdminDashboard = ({
  analytics,
  currency,
  onQuickAddStock,
  onOpenInventory,
  onOpenOrders,
  onOpenPOS
}) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      
      {/* Top Banner with Quick Action Shortcuts */}
      <div className="admin-hero-banner" style={{
        background: 'var(--bg-card, #121519)',
        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        borderRadius: '20px',
        padding: '20px 24px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '16px',
        boxShadow: 'var(--shadow-card)',
        color: 'var(--text-primary)'
      }}>
        <div style={{ flex: 1, minWidth: '240px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', flexWrap: 'wrap' }}>
            <span className="gold-badge" style={{ fontSize: '0.68rem', padding: '2px 8px' }}>SOTUVCHILAR TIZIMI</span>
            <span style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>Jonli Sinxronizatsiya</span>
          </div>
          <h2 className="admin-hero-title" style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary)', lineHeight: 1.25 }}>
            Do'kon Savdo Ko'rsatkichlari & Ombor Statistikasi
          </h2>
          <p className="admin-hero-desc" style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '4px', lineHeight: 1.4 }}>
            Oylik eng ko'p sotilgan tovarlar, ombordagi soni va sof daromad statistikasi.
          </p>
        </div>

        <div className="admin-hero-actions" style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={onOpenPOS}
            className="btn-apple btn-apple-gold"
            style={{ padding: '9px 16px', fontSize: '0.82rem' }}
          >
            <ShoppingBag size={14} />
            <span>Tezkor Kassa (POS)</span>
          </button>

          <button
            onClick={onOpenInventory}
            className="btn-apple btn-apple-glass"
            style={{ padding: '9px 16px', fontSize: '0.82rem' }}
          >
            <Package size={14} />
            <span>Ombor & Tovarlar</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Row */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))',
        gap: '16px'
      }}>
        {/* Jami Savdo Tushumi */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              JAMI SAVDO TUSHUMI
            </span>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(41, 151, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <DollarSign size={18} color="var(--apple-blue, #2997ff)" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {formatPrice(analytics.totalRevenueUSD, currency)}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--apple-green, #30d158)', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <TrendingUp size={13} />
            <span>Oylik reja 142% ga bajarildi</span>
          </div>
        </div>

        {/* Sof Foyda */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 700 }}>
              SOF FOYDA (NET PROFIT)
            </span>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(212, 175, 55, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Crown size={18} color="#d4af37" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {formatPrice(analytics.totalProfitUSD, currency)}
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Tannarxlar chegirilgan sof daromad
          </div>
        </div>

        {/* Ombordagi Mahsulotlar Soni */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              OMBOR QOLDIG'I (JAMI SONI)
            </span>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(48, 209, 88, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Package size={18} color="var(--apple-green, #30d158)" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {analytics.totalStockCount} dona
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary)' }}>
            Umumiy qiymati: <b>{formatPrice(analytics.totalStockValueUSD, currency)}</b>
          </div>
        </div>

        {/* Faol Buyurtmalar */}
        <div className="glass-panel" style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
              BUYURTMALAR VA SAVDOLAR
            </span>
            <div style={{
              width: '34px',
              height: '34px',
              borderRadius: '10px',
              background: 'rgba(255, 159, 10, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Clock size={18} color="var(--apple-orange, #ff9f0a)" />
            </div>
          </div>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            {analytics.totalOrdersCount} ta buyurtma
          </div>
          <div style={{ fontSize: '0.74rem', color: 'var(--apple-orange, #ff9f0a)', fontWeight: 600 }}>
            {analytics.activeOrdersCount} ta faol ishlanmoqda
          </div>
        </div>
      </div>

      {/* Main Two Columns: Top Selling This Month vs Low Stock Alerts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '24px'
      }} className="admin-analytics-grid">
        
        {/* COLUMN 1: "BU OYDA QAYSI TOVAR ENG ZO'R KO'P SOTILDI" */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '12px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <Flame size={19} color="var(--apple-orange, #ff9f0a)" />
                <span>Bu Oyda Eng Ko'p Sotilgan Tovarlar Reytingi</span>
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Oylik savdo miqdori va to'plangan tushum bo'yicha saralangan
              </p>
            </div>

            <span className="gold-badge" style={{ fontSize: '0.68rem' }}>
              TOP-5 HIT
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {analytics.topSelling.map((item, index) => {
              const maxSold = analytics.topSelling[0]?.monthlySold || 1;
              const percent = Math.round((item.monthlySold / maxSold) * 100);

              return (
                <div 
                  key={item.id}
                  style={{
                    background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                    border: index === 0 ? '1px solid var(--accent-cyan, #73c4ff)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-md)',
                    padding: '14px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '10px'
                  }}
                >
                  <div className="admin-rank-row" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {/* Rank Badge */}
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      background: index === 0 ? 'var(--accent-btn-bg, #73c4ff)' : 'var(--badge-bg)',
                      color: index === 0 ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-primary)',
                      fontWeight: 800,
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0
                    }}>
                      {item.rank}
                    </div>

                    {/* Image */}
                    <img 
                      src={item.image} 
                      alt={item.name}
                      style={{ width: '42px', height: '42px', borderRadius: '8px', objectFit: 'contain', background: 'var(--card-pedestal)', flexShrink: 0 }} 
                    />

                    {/* Info */}
                    <div className="admin-rank-info" style={{ flex: 1, minWidth: 0 }}>
                      <div style={{
                        fontSize: '0.88rem',
                        fontWeight: 700,
                        color: 'var(--text-primary)',
                        lineHeight: 1.25
                      }}>
                        {item.name}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        Dona narxi: {formatPrice(item.priceUSD, currency)} • Omborda qoldiq: <b>{item.stock} ta</b>
                      </div>
                    </div>

                    {/* Monthly Sold Badge */}
                    <div className="admin-rank-stats" style={{ textAlign: 'right', flexShrink: 0 }}>
                      <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>
                        {item.monthlySold} dona
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                        Jami: {formatPrice(item.totalSoldRevenueUSD, currency)}
                      </div>
                    </div>
                  </div>

                  {/* Progress bar visual */}
                  <div style={{
                    width: '100%',
                    height: '6px',
                    background: 'var(--badge-bg, rgba(255, 255, 255, 0.08))',
                    borderRadius: '4px',
                    overflow: 'hidden'
                  }}>
                    <div style={{
                      width: `${percent}%`,
                      height: '100%',
                      background: index === 0 ? 'var(--accent-cyan, #73c4ff)' : 'var(--text-secondary)',
                      borderRadius: '4px',
                      transition: 'width 0.4s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* COLUMN 2: KAM QOLGAN TOVARLAR OGOHLANTIRISHLARI (LOW STOCK ALERTS) */}
        <div className="glass-panel" style={{ padding: '24px' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px',
            borderBottom: '1px solid var(--border-subtle)',
            paddingBottom: '12px'
          }}>
            <div>
              <h3 style={{ fontSize: '1.15rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
                <AlertTriangle size={19} color="var(--apple-red, #ff453a)" />
                <span>Kam Qolgan Tovarlar (Ombor Signali)</span>
              </h3>
              <p style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                Soni 3 dona va undan kam qolgan tovarlar darhol to'ldirilishi kerak
              </p>
            </div>

            <span style={{
              background: 'rgba(255, 69, 58, 0.15)',
              color: 'var(--apple-red, #ff453a)',
              fontSize: '0.72rem',
              fontWeight: 700,
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              border: '1px solid rgba(255, 69, 58, 0.3)'
            }}>
              {analytics.lowStockItems.length} ta xavf ostida
            </span>
          </div>

          {analytics.lowStockItems.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '40px 20px',
              color: 'var(--apple-green, #30d158)'
            }}>
              <Package size={40} style={{ marginBottom: '8px' }} />
              <h4>Barcha tovarlar zaxirasi yetarli darajada!</h4>
              <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                3 donadan kam qolgan tovarlar mavjud emas.
              </p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {analytics.lowStockItems.map((prod) => (
                <div
                  key={prod.id}
                  className="admin-low-stock-row"
                  style={{
                    background: 'rgba(255, 69, 58, 0.08)',
                    border: '1px solid rgba(255, 69, 58, 0.25)',
                    borderRadius: 'var(--radius-md)',
                    padding: '12px 14px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '12px'
                  }}
                >
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'contain', background: 'var(--card-pedestal)', flexShrink: 0 }}
                  />

                  <div className="admin-low-stock-info" style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                      {prod.name}
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--apple-red, #ff453a)', fontWeight: 600 }}>
                      ⚠️ Omborda: <b>{prod.stock} dona</b> qoldi!
                    </div>
                  </div>

                  <button
                    onClick={() => onQuickAddStock(prod.id, 5)}
                    className="btn-apple btn-apple-glass admin-low-stock-btn"
                    style={{
                      padding: '6px 12px',
                      fontSize: '0.75rem',
                      background: 'rgba(48, 209, 88, 0.15)',
                      color: 'var(--apple-green, #30d158)',
                      borderColor: 'rgba(48, 209, 88, 0.3)',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}
                    title="Omborni 5 donaga to'ldirish"
                  >
                    <Plus size={13} />
                    <span>+5 ta qo'shish</span>
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Quick Info Box for Sellers */}
          <div style={{
            marginTop: '20px',
            background: 'var(--bg-secondary, rgba(255, 255, 255, 0.03))',
            borderRadius: 'var(--radius-md)',
            padding: '14px',
            border: '1px solid var(--border-subtle)',
            fontSize: '0.78rem',
            lineHeight: 1.5,
            color: 'var(--text-secondary)'
          }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '4px' }}>
              💡 Sotuvchilar uchun eslatma:
            </div>
            Do'konda tovar sotilganda (sayt yoki POS kassa orqali), ombordagi soni avtomatik kamayadi. 
            Agar tovar 0 ta qolsa, saytda "Tugagan" belgisi paydo bo'ladi.
          </div>
        </div>

      </div>

      <style>{`
        @media (min-width: 960px) {
          .admin-analytics-grid {
            grid-template-columns: 1.3fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
