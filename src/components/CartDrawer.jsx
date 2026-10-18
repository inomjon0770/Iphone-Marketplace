import React, { useState } from 'react';
import { 
  X, 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShieldCheck, 
  Tag, 
  ShoppingBag, 
  Package, 
  Truck, 
  CheckCircle2, 
  Clock, 
  Printer, 
  Check, 
  FileText,
  Sparkles,
  MapPin
} from 'lucide-react';
import { formatPrice } from '../data/storage';

// Helper for status config & timeline calculation
export const getOrderStatusInfo = (status) => {
  switch (status) {
    case 'Yetib keldi':
    case 'Yakunlandi':
      return {
        label: 'Yetib keldi',
        color: 'var(--apple-green, #30d158)',
        bg: 'rgba(48, 209, 88, 0.14)',
        border: 'rgba(48, 209, 88, 0.35)',
        step: 4,
        desc: 'Buyurtmangiz muvaffaqiyatli yetkazildi va qabul qilindi'
      };
    case "Yo'lda":
    case 'Yetkazilmoqda':
      return {
        label: "Yo'lda (Kuryer)",
        color: 'var(--apple-purple, #af52de)',
        bg: 'rgba(175, 82, 222, 0.14)',
        border: 'rgba(175, 82, 222, 0.35)',
        step: 3,
        desc: 'Kuryer tezkor yetkazmoqda, tez orada eshigingiz oldida bo‘ladi'
      };
    case 'Tayyorlanmoqda':
      return {
        label: 'Tayyorlanmoqda',
        color: 'var(--apple-orange, #ff9f0a)',
        bg: 'rgba(255, 159, 10, 0.14)',
        border: 'rgba(255, 159, 10, 0.35)',
        step: 2,
        desc: 'Omborda tovar tekshirilib, xavfsiz premium qadoqlanmoqda'
      };
    case 'Bekor qilindi':
      return {
        label: 'Bekor qilindi',
        color: 'var(--apple-red, #ff453a)',
        bg: 'rgba(255, 69, 58, 0.14)',
        border: 'rgba(255, 69, 58, 0.35)',
        step: 0,
        desc: 'Ushbu buyurtma bekor qilingan'
      };
    case 'Yangi':
    case 'Qabul qilindi':
    default:
      return {
        label: 'Qabul qilindi',
        color: 'var(--apple-blue, #0071e3)',
        bg: 'rgba(0, 113, 227, 0.14)',
        border: 'rgba(0, 113, 227, 0.35)',
        step: 1,
        desc: 'Buyurtmangiz tizimda ro‘yxatga olindi va tasdiqlandi'
      };
  }
};

export const CartDrawer = ({
  isOpen,
  onClose,
  cartItems = [],
  orders = [],
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onProceedCheckout,
  onViewReceipt,
  currency,
  t
}) => {
  if (!isOpen) return null;

  const cartT = t?.cart || {};

  // Tab state: 'cart' or 'orders'
  const [activeTab, setActiveTab] = useState(() => (cartItems.length === 0 && orders.length > 0 ? 'orders' : 'cart'));
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');

  const subtotalUSD = cartItems.reduce((sum, item) => sum + (item.priceUSD * item.quantity), 0);
  const discountUSD = (subtotalUSD * discountPercent) / 100;
  const totalUSD = subtotalUSD - discountUSD;

  const handleApplyPromo = (e) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'ILUXTITANIUM' || promoCode.trim().toUpperCase() === 'APPLE2026') {
      setDiscountPercent(7);
      setPromoMessage('✅ 7% ' + (cartT.discount || 'Chegirma') + ' qo‘llanildi!');
    } else {
      setDiscountPercent(0);
      setPromoMessage('❌ Noto‘g‘ri promokod. (Sinab ko‘ring: ILUXTITANIUM)');
    }
  };

  const stepsList = [
    { num: 1, label: 'Qabul qilindi' },
    { num: 2, label: 'Tayyorlanmoqda' },
    { num: 3, label: "Yo'lda" },
    { num: 4, label: 'Yetib keldi' }
  ];

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.65)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      justifyContent: 'flex-end',
      padding: 0
    }}>
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '470px',
          height: '100vh',
          background: 'var(--bg-card, #111316)',
          color: 'var(--text-primary, #edf0f3)',
          borderLeft: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          padding: '20px 22px',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0, 0, 0, 0.35)',
          animation: 'slideInRight 0.24s cubic-bezier(0.16, 1, 0.3, 1)'
        }}
      >
        {/* Top Header */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingBottom: '14px',
          borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
        }}>
          <div>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {activeTab === 'cart' ? (cartT.title || 'Xarid Savati') : "Mening Buyurtmalarim & Kuzatish"}
            </h2>
            <div style={{ fontSize: '0.76rem', color: 'var(--text-secondary)' }}>
              {activeTab === 'cart'
                ? `${cartItems.length} ${cartT.itemsCount || 'ta mahsulot'}`
                : `${orders.length} ta umumiy buyurtma`}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {activeTab === 'cart' && cartItems.length > 0 && (
              <button
                onClick={onClearCart}
                title={cartT.clearCart || 'Savatni tozalash'}
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-secondary)',
                  fontSize: '0.74rem',
                  cursor: 'pointer'
                }}
              >
                {cartT.clearCart || 'Tozalash'}
              </button>
            )}
            <button
              onClick={onClose}
              style={{
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                color: 'var(--text-primary, #edf0f3)',
                width: '32px',
                height: '32px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer'
              }}
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* Tab Switcher: Savat vs Buyurtmalarim (Live Tracking) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6px',
          background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
          padding: '4px',
          borderRadius: 'var(--radius-md, 12px)',
          margin: '14px 0 10px',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
        }}>
          <button
            onClick={() => setActiveTab('cart')}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'cart' ? 'var(--accent-btn-bg, #73c4ff)' : 'transparent',
              color: activeTab === 'cart' ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.18s ease'
            }}
          >
            <ShoppingBag size={14} />
            <span>Savat ({cartItems.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('orders')}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: 'none',
              background: activeTab === 'orders' ? 'var(--accent-btn-bg, #73c4ff)' : 'transparent',
              color: activeTab === 'orders' ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-secondary)',
              fontSize: '0.78rem',
              fontWeight: 700,
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              transition: 'all 0.18s ease',
              position: 'relative'
            }}
          >
            <Truck size={14} />
            <span>Kuzatish ({orders.length})</span>
            {orders.length > 0 && activeTab !== 'orders' && (
              <span style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--apple-green, #30d158)',
                boxShadow: '0 0 6px var(--apple-green, #30d158)'
              }} />
            )}
          </button>
        </div>

        {/* Content Body */}
        {activeTab === 'cart' ? (
          /* ================= 1. SHOPPING CART TAB ================= */
          <>
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '10px 0',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}>
              {cartItems.length === 0 ? (
                <div style={{
                  textAlign: 'center',
                  padding: '50px 20px',
                  color: 'var(--text-secondary, #8e949b)'
                }}>
                  <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🛍️</div>
                  <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>{cartT.empty || 'Savatingiz bo‘sh'}</h4>
                  <p style={{ fontSize: '0.82rem', marginBottom: '16px' }}>{cartT.emptyDesc || 'Katalogimizdagi yangi avlod Apple mahsulotlaridan tanlang.'}</p>
                  {orders.length > 0 && (
                    <button
                      onClick={() => setActiveTab('orders')}
                      className="btn-apple btn-apple-subtle"
                      style={{ fontSize: '0.78rem', padding: '8px 16px' }}
                    >
                      <Package size={14} />
                      <span>Oldingi buyurtmalarni ko‘rish ({orders.length})</span>
                    </button>
                  )}
                </div>
              ) : (
                cartItems.map((item, idx) => (
                  <div
                    key={idx}
                    style={{
                      background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                      border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                      borderRadius: '16px',
                      padding: '12px',
                      display: 'flex',
                      gap: '12px',
                      alignItems: 'center'
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: '64px',
                        height: '64px',
                        borderRadius: '10px',
                        objectFit: 'contain',
                        background: 'var(--card-pedestal, #1d2126)',
                        padding: '4px',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
                      }}
                    />

                    <div style={{ flex: 1 }}>
                      <div style={{
                        fontSize: '0.86rem',
                        fontWeight: 700,
                        lineHeight: 1.25,
                        color: 'var(--text-primary, #edf0f3)',
                        marginBottom: '3px'
                      }}>
                        {item.name}
                      </div>

                      <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #8e949b)', marginBottom: '6px' }}>
                        {item.selectedStorage && `${item.selectedStorage} • `}
                        {item.selectedColor && `${item.selectedColor} • `}
                        <b>{formatPrice(item.priceUSD, currency)}</b>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          background: 'var(--bg-card, #111316)',
                          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
                          borderRadius: 'var(--radius-full, 999px)',
                          padding: '2px 8px',
                          gap: '8px'
                        }}>
                          <button
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '2px' }}
                          >
                            <Minus size={12} />
                          </button>
                          <span style={{ fontSize: '0.78rem', fontWeight: 700 }}>{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            style={{ background: 'none', border: 'none', color: 'var(--text-primary)', cursor: 'pointer', padding: '2px' }}
                          >
                            <Plus size={12} />
                          </button>
                        </div>

                        <button
                          onClick={() => onRemoveItem(item.id)}
                          style={{
                            background: 'none',
                            border: 'none',
                            color: '#ff453a',
                            cursor: 'pointer',
                            padding: '4px'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer & Checkout */}
            {cartItems.length > 0 && (
              <div style={{
                borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                paddingTop: '14px',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px'
              }}>
                {/* Promo code form */}
                <form onSubmit={handleApplyPromo} style={{ display: 'flex', gap: '8px' }}>
                  <input
                    type="text"
                    placeholder="Promokod (masalan: ILUXTITANIUM)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    style={{
                      flex: 1,
                      background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                      border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                      borderRadius: '10px',
                      padding: '7px 12px',
                      color: 'var(--text-primary, #edf0f3)',
                      fontSize: '0.78rem',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="submit"
                    style={{
                      background: 'var(--accent-btn-bg, #73c4ff)',
                      border: 'none',
                      color: 'var(--accent-btn-text, #0b0c0e)',
                      borderRadius: '10px',
                      padding: '0 14px',
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      cursor: 'pointer'
                    }}
                  >
                    Qo‘llash
                  </button>
                </form>
                {promoMessage && (
                  <div style={{ fontSize: '0.72rem', color: discountPercent > 0 ? '#30d158' : '#ff453a' }}>
                    {promoMessage}
                  </div>
                )}

                {/* Price breakdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>{cartT.subtotal || 'Oraliq summa'}:</span>
                    <span>{formatPrice(subtotalUSD, currency)}</span>
                  </div>
                  {discountPercent > 0 && (
                    <div style={{ display: 'flex', justifyContent: 'space-between', color: '#30d158' }}>
                      <span>{cartT.discount || 'Chegirma'} ({discountPercent}%):</span>
                      <span>-{formatPrice(discountUSD, currency)}</span>
                    </div>
                  )}
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-secondary)' }}>
                    <span>{cartT.deliveryFree || 'Yetkazib berish'}:</span>
                    <span style={{ color: '#30d158', fontWeight: 600 }}>BEPUL</span>
                  </div>
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '1.18rem',
                    fontWeight: 800,
                    color: 'var(--text-primary)',
                    paddingTop: '6px',
                    borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
                  }}>
                    <span>{cartT.total || 'Jami to‘lov'}:</span>
                    <span style={{ color: 'var(--accent-cyan, #73c4ff)' }}>{formatPrice(totalUSD, currency)}</span>
                  </div>
                </div>

                <button
                  onClick={() => onProceedCheckout({ totalUSD, discountPercent, items: cartItems })}
                  className="btn-apple btn-apple-primary"
                  style={{
                    width: '100%',
                    padding: '13px',
                    fontSize: '0.92rem',
                    background: 'var(--accent-btn-bg, #73c4ff)',
                    color: 'var(--accent-btn-text, #0b0c0e)',
                    border: 'none',
                    borderRadius: '12px',
                    fontWeight: 700,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <span>{cartT.checkoutBtn || 'Rasmiylashtirish'}</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            )}
          </>
        ) : (
          /* ================= 2. LIVE ORDER TRACKING TAB ================= */
          <div style={{
            flex: 1,
            overflowY: 'auto',
            padding: '10px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}>
            {orders.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '60px 20px',
                color: 'var(--text-secondary)'
              }}>
                <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📦</div>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '6px' }}>Hozircha buyurtmalar yo‘q</h4>
                <p style={{ fontSize: '0.82rem' }}>
                  Mahsulot xarid qilganingizda, uning qayerdaligi va yetib kelish jarayoni aynan shu yerda jonli ko‘rsatiladi.
                </p>
              </div>
            ) : (
              orders.map((ord) => {
                const statusInfo = getOrderStatusInfo(ord.status);
                const currentStep = statusInfo.step;

                return (
                  <div
                    key={ord.id}
                    style={{
                      background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                      border: `1px solid ${statusInfo.border}`,
                      borderRadius: '18px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px',
                      boxShadow: '0 4px 16px rgba(0,0,0,0.1)'
                    }}
                  >
                    {/* Order Header: ID, Date & Status Badge */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '8px' }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                          <span style={{ fontWeight: 800, fontSize: '0.92rem', color: 'var(--text-primary)' }}>
                            {ord.id}
                          </span>
                          <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                            • {ord.date}
                          </span>
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                          Mijoz: <b style={{ color: 'var(--text-primary)' }}>{ord.customerName}</b>
                        </div>
                      </div>

                      {/* Colorful Status Pill */}
                      <div style={{
                        background: statusInfo.bg,
                        color: statusInfo.color,
                        border: `1px solid ${statusInfo.border}`,
                        padding: '4px 10px',
                        borderRadius: '999px',
                        fontSize: '0.72rem',
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        whiteSpace: 'nowrap'
                      }}>
                        <span style={{
                          width: '7px',
                          height: '7px',
                          borderRadius: '50%',
                          background: statusInfo.color,
                          boxShadow: `0 0 8px ${statusInfo.color}`
                        }} />
                        <span>{statusInfo.label}</span>
                      </div>
                    </div>

                    {/* Visual 4-Step Animated Timeline / Delivery Status Stepper */}
                    {statusInfo.step > 0 && (
                      <div style={{
                        background: 'var(--bg-card, rgba(0, 0, 0, 0.3))',
                        padding: '14px 12px 10px',
                        borderRadius: '14px',
                        border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', position: 'relative', marginBottom: '10px' }}>
                          {/* Background Connector Line */}
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '14px',
                            right: '14px',
                            height: '3px',
                            background: 'var(--border-subtle, rgba(255, 255, 255, 0.1))',
                            zIndex: 1
                          }} />

                          {/* Active Filled Colored Line */}
                          <div style={{
                            position: 'absolute',
                            top: '12px',
                            left: '14px',
                            width: `${Math.min(100, Math.max(0, ((currentStep - 1) / 3) * 100))}%`,
                            height: '3px',
                            background: statusInfo.color,
                            boxShadow: `0 0 10px ${statusInfo.color}`,
                            transition: 'width 0.4s ease',
                            zIndex: 2
                          }} />

                          {/* 4 Step Nodes */}
                          {stepsList.map((step) => {
                            const isDone = currentStep >= step.num;
                            const isCurrent = currentStep === step.num;

                            return (
                              <div
                                key={step.num}
                                style={{
                                  display: 'flex',
                                  flexDirection: 'column',
                                  alignItems: 'center',
                                  zIndex: 3,
                                  width: '25%'
                                }}
                              >
                                <div style={{
                                  width: '24px',
                                  height: '24px',
                                  borderRadius: '50%',
                                  background: isDone ? statusInfo.color : 'var(--bg-secondary, #222)',
                                  color: isDone ? '#ffffff' : 'var(--text-tertiary)',
                                  border: isCurrent
                                    ? `2px solid #ffffff`
                                    : isDone
                                      ? `2px solid ${statusInfo.color}`
                                      : '2px solid var(--border-subtle, rgba(255, 255, 255, 0.15))',
                                  boxShadow: isCurrent ? `0 0 12px ${statusInfo.color}` : 'none',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  fontSize: '0.65rem',
                                  fontWeight: 800,
                                  marginBottom: '6px',
                                  transition: 'all 0.3s ease'
                                }}>
                                  {isDone ? <Check size={12} strokeWidth={3} /> : step.num}
                                </div>
                                <span style={{
                                  fontSize: '0.64rem',
                                  fontWeight: isCurrent ? 700 : 500,
                                  color: isCurrent ? statusInfo.color : isDone ? 'var(--text-primary)' : 'var(--text-tertiary)',
                                  textAlign: 'center',
                                  lineHeight: 1.15
                                }}>
                                  {step.label}
                                </span>
                              </div>
                            );
                          })}
                        </div>

                        {/* Status Note / Description */}
                        <div style={{
                          fontSize: '0.74rem',
                          color: 'var(--text-secondary)',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '6px',
                          marginTop: '6px',
                          paddingTop: '6px',
                          borderTop: '1px dashed var(--border-subtle, rgba(255, 255, 255, 0.08))'
                        }}>
                          <Sparkles size={12} color={statusInfo.color} style={{ flexShrink: 0 }} />
                          <span>{statusInfo.desc}</span>
                        </div>
                      </div>
                    )}

                    {/* Items List in this order */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                      {ord.items.map((item, idx) => (
                        <div
                          key={idx}
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            fontSize: '0.78rem',
                            color: 'var(--text-primary)',
                            padding: '4px 0'
                          }}
                        >
                          <div>
                            <span style={{ fontWeight: 600 }}>{item.quantity}x</span> {item.name}
                            {item.selectedStorage && <span style={{ color: 'var(--text-secondary)' }}> ({item.selectedStorage})</span>}
                          </div>
                          <span style={{ fontWeight: 700 }}>
                            {formatPrice((item.priceUSD || 0) * (item.quantity || 1), currency)}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Delivery Address if present */}
                    {ord.address && (
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px' }}>
                        <MapPin size={12} color="var(--accent-cyan, #73c4ff)" />
                        <span>{ord.city ? `${ord.city}, ` : ''}{ord.address}</span>
                      </div>
                    )}

                    {/* Total & Receipt Action Row */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      paddingTop: '8px',
                      borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
                    }}>
                      <div>
                        <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>Jami summa:</div>
                        <div style={{ fontSize: '1.05rem', fontWeight: 800, color: 'var(--accent-cyan, #73c4ff)' }}>
                          {formatPrice(ord.totalUSD, currency)}
                        </div>
                      </div>

                      {onViewReceipt && (
                        <button
                          onClick={() => onViewReceipt(ord)}
                          className="btn-apple btn-apple-glass"
                          style={{ padding: '6px 12px', fontSize: '0.74rem' }}
                        >
                          <FileText size={13} />
                          <span>Chekni ko‘rish</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        )}

      </div>

      <style>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};
