import React, { useState } from 'react';
import { ShoppingBag, Printer, Phone, MapPin, CheckCircle, Clock, AlertCircle, Sparkles, Truck, Package, Check, ChevronDown } from 'lucide-react';
import { formatPrice } from '../../data/storage';
import { getOrderStatusInfo } from '../CartDrawer';

export const AdminOrders = ({
  orders,
  currency,
  onUpdateOrderStatus,
  onPrintReceipt
}) => {
  const [filterStatus, setFilterStatus] = useState('all');

  const filteredOrders = orders.filter((o) => {
    if (filterStatus === 'all') return true;
    if (filterStatus === 'Qabul qilindi') return o.status === 'Qabul qilindi' || o.status === 'Yangi';
    if (filterStatus === 'Tayyorlanmoqda') return o.status === 'Tayyorlanmoqda';
    if (filterStatus === "Yo'lda") return o.status === "Yo'lda" || o.status === 'Yetkazilmoqda';
    if (filterStatus === 'Yetib keldi') return o.status === 'Yetib keldi' || o.status === 'Yakunlandi';
    if (filterStatus === 'Bekor qilindi') return o.status === 'Bekor qilindi';
    return o.status === filterStatus;
  });

  const statusOptions = [
    { value: 'Qabul qilindi', label: 'Qabul qilindi' },
    { value: 'Tayyorlanmoqda', label: 'Tayyorlanmoqda' },
    { value: "Yo'lda", label: "Yo'lda" },
    { value: 'Yetib keldi', label: 'Yetib keldi' },
    { value: 'Bekor qilindi', label: 'Bekor qilindi' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <ShoppingBag size={22} color="var(--apple-blue, #2997ff)" />
            <span>Mijozlar Buyurtmalari & Jonli Holatlar</span>
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Buyurtma holatini o'zgartiring (Tayyorlanmoqda, Yo'lda, Yetib keldi). Mijoz savatida real vaqtda yangilanadi!
          </p>
        </div>

        {/* Filter status buttons */}
        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'Barchasi' },
            { id: 'Qabul qilindi', label: '🔵 Qabul qilindi' },
            { id: 'Tayyorlanmoqda', label: '🟠 Tayyorlanmoqda' },
            { id: "Yo'lda", label: "🟣 Yo'lda" },
            { id: 'Yetib keldi', label: '🟢 Yetib keldi' }
          ].map((st) => (
            <button
              key={st.id}
              onClick={() => setFilterStatus(st.id)}
              style={{
                background: filterStatus === st.id ? 'var(--accent-btn-bg, #73c4ff)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
                border: '1px solid',
                borderColor: filterStatus === st.id ? 'var(--accent-btn-bg, #73c4ff)' : 'var(--border-subtle)',
                color: filterStatus === st.id ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-secondary)',
                borderRadius: 'var(--radius-full)',
                padding: '6px 14px',
                fontSize: '0.76rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.18s ease'
              }}
            >
              {st.label}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table for Desktop with responsive scrolling */}
      <div className="glass-panel table-scroll-wrap admin-orders-desktop-table" style={{ padding: 0, borderRadius: '20px' }}>
        <table style={{ width: '100%', minWidth: '700px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
              borderBottom: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontSize: '0.7rem'
            }}>
              <th style={{ padding: '14px 18px' }}>Buyurtma ID & Vaqt</th>
              <th style={{ padding: '14px 12px' }}>Mijoz Ma'lumotlari</th>
              <th style={{ padding: '14px 12px' }}>Buyurtma Tarkibi</th>
              <th style={{ padding: '14px 12px' }}>Jami Summa</th>
              <th style={{ padding: '14px 12px' }}>Holat (Rangli Selektor)</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
                  Ushbu toifada buyurtmalar mavjud emas.
                </td>
              </tr>
            ) : (
              filteredOrders.map((ord) => {
                const statusInfo = getOrderStatusInfo(ord.status);

                return (
                  <tr 
                    key={ord.id}
                    style={{ 
                      borderBottom: '1px solid var(--border-subtle)',
                      transition: 'background 0.15s ease'
                    }}
                  >
                    {/* Order ID & Time */}
                    <td style={{ padding: '14px 18px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.88rem' }}>
                        {ord.id}
                      </div>
                      <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                        {ord.date}
                      </div>
                    </td>

                    {/* Customer Info */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{ord.customerName}</div>
                      <div style={{ fontSize: '0.74rem', color: 'var(--apple-blue, #0071e3)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                        <Phone size={12} />
                        <a href={`tel:${ord.phone}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                          {ord.phone}
                        </a>
                      </div>
                      {ord.address && (
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px', marginTop: '2px' }}>
                          <MapPin size={11} color="var(--accent-cyan, #73c4ff)" />
                          <span>{ord.city ? `${ord.city}, ` : ''}{ord.address}</span>
                        </div>
                      )}
                    </td>

                    {/* Items */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                        {ord.items.map((item, idx) => (
                          <div key={idx} style={{ fontSize: '0.76rem', color: 'var(--text-primary)' }}>
                            • <b>{item.quantity}x</b> {item.name}
                          </div>
                        ))}
                      </div>
                    </td>

                    {/* Total & Profit */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ fontWeight: 800, fontSize: '0.94rem', color: 'var(--text-primary)' }}>
                        {formatPrice(ord.totalUSD, currency)}
                      </div>
                      <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)' }}>
                        To'lov: {ord.paymentMethod}
                      </div>
                    </td>

                    {/* Colorful Status Switcher */}
                    <td style={{ padding: '14px 12px' }}>
                      <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0 }}>
                        <select
                          value={
                            ord.status === 'Yangi' ? 'Qabul qilindi' :
                            ord.status === 'Yetkazilmoqda' ? "Yo'lda" :
                            ord.status === 'Yakunlandi' ? 'Yetib keldi' :
                            ord.status
                          }
                          onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                          style={{
                            appearance: 'none',
                            WebkitAppearance: 'none',
                            MozAppearance: 'none',
                            background: statusInfo.bg,
                            border: `1.5px solid ${statusInfo.color}`,
                            color: statusInfo.color,
                            borderRadius: 'var(--radius-full)',
                            padding: '6px 26px 6px 12px',
                            fontSize: '0.78rem',
                            fontWeight: 700,
                            outline: 'none',
                            cursor: 'pointer',
                            boxShadow: `0 2px 8px ${statusInfo.bg}`,
                            width: 'auto',
                            maxWidth: 'fit-content'
                          }}
                        >
                          {statusOptions.map((opt) => (
                            <option
                              key={opt.value}
                              value={opt.value}
                              style={{ background: 'var(--bg-card, #1c1c20)', color: 'var(--text-primary, #fff)' }}
                            >
                              {opt.label}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={13} style={{ position: 'absolute', right: '9px', pointerEvents: 'none', color: statusInfo.color }} />
                      </div>
                    </td>

                    {/* Action: Print Receipt */}
                    <td style={{ padding: '14px 18px', textAlign: 'right' }}>
                      <button
                        onClick={() => onPrintReceipt(ord)}
                        className="btn-apple btn-apple-glass"
                        style={{ padding: '6px 12px', fontSize: '0.74rem' }}
                        title="Chek chiqarish"
                      >
                        <Printer size={13} />
                        <span>Chek</span>
                      </button>
                    </td>

                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Orders Cards View */}
      <div className="admin-orders-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '14px' }}>
        {filteredOrders.length === 0 ? (
          <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Ushbu toifada buyurtmalar mavjud emas.
          </div>
        ) : (
          filteredOrders.map((ord) => {
            const statusInfo = getOrderStatusInfo(ord.status);

            return (
              <div
                key={ord.id}
                className="glass-panel"
                style={{
                  padding: '16px',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: '1px solid var(--border-subtle)'
                }}
              >
                {/* Header: ID, Date and Status Selector */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                  <div>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {ord.id}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                      {ord.date}
                    </div>
                  </div>

                  {/* Status Dropdown */}
                  <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', flexShrink: 0, maxWidth: 'fit-content' }}>
                    <select
                      value={
                        ord.status === 'Yangi' ? 'Qabul qilindi' :
                        ord.status === 'Yetkazilmoqda' ? "Yo'lda" :
                        ord.status === 'Yakunlandi' ? 'Yetib keldi' :
                        ord.status
                      }
                      onChange={(e) => onUpdateOrderStatus(ord.id, e.target.value)}
                      style={{
                        appearance: 'none',
                        WebkitAppearance: 'none',
                        MozAppearance: 'none',
                        background: statusInfo.bg,
                        border: `1.5px solid ${statusInfo.color}`,
                        color: statusInfo.color,
                        borderRadius: 'var(--radius-full)',
                        padding: '5px 28px 5px 12px',
                        fontSize: '0.76rem',
                        fontWeight: 700,
                        outline: 'none',
                        cursor: 'pointer',
                        width: 'auto',
                        maxWidth: 'fit-content',
                        lineHeight: 1.2
                      }}
                    >
                      {statusOptions.map((opt) => (
                        <option
                          key={opt.value}
                          value={opt.value}
                          style={{ background: 'var(--bg-card, #1c1c20)', color: 'var(--text-primary, #fff)' }}
                        >
                          {opt.label}
                        </option>
                      ))}
                    </select>
                    <ChevronDown size={13} style={{ position: 'absolute', right: '9px', pointerEvents: 'none', color: statusInfo.color }} />
                  </div>
                </div>

                {/* Customer Details Box */}
                <div style={{
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                  borderRadius: '12px',
                  padding: '10px 12px',
                  border: '1px solid var(--border-subtle)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px'
                }}>
                  <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.86rem' }}>
                    {ord.customerName}
                  </div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--apple-blue, #0071e3)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Phone size={13} />
                    <a href={`tel:${ord.phone}`} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 600 }}>
                      {ord.phone}
                    </a>
                  </div>
                  {ord.address && (
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '5px', marginTop: '2px' }}>
                      <MapPin size={12} color="var(--accent-cyan, #73c4ff)" style={{ flexShrink: 0 }} />
                      <span>{ord.city ? `${ord.city}, ` : ''}{ord.address}</span>
                    </div>
                  )}
                </div>

                {/* Order Items List */}
                <div style={{
                  background: 'rgba(0, 0, 0, 0.15)',
                  borderRadius: '10px',
                  padding: '10px 12px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px'
                }}>
                  <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)', fontWeight: 700, textTransform: 'uppercase' }}>
                    Buyurtma Tarkibi:
                  </div>
                  {ord.items.map((item, idx) => (
                    <div key={idx} style={{ fontSize: '0.78rem', color: 'var(--text-primary)', lineHeight: 1.35 }}>
                      • <b>{item.quantity}x</b> {item.name}
                    </div>
                  ))}
                </div>

                {/* Footer: Total Amount & Print Receipt Button */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '6px',
                  borderTop: '1px solid var(--border-subtle)',
                  flexWrap: 'wrap',
                  gap: '8px'
                }}>
                  <div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>JAMI SUMMA</div>
                    <div style={{ fontWeight: 800, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                      {formatPrice(ord.totalUSD, currency)}
                    </div>
                    <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary)' }}>
                      To'lov: {ord.paymentMethod}
                    </div>
                  </div>

                  <button
                    onClick={() => onPrintReceipt(ord)}
                    className="btn-apple btn-apple-glass"
                    style={{ padding: '8px 14px', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                    title="Kassa chekini chiqarish"
                  >
                    <Printer size={14} />
                    <span>Chek Chiqarish</span>
                  </button>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
