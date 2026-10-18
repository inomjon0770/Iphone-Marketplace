import React from 'react';
import { X, Printer, Crown, CheckCircle2 } from 'lucide-react';
import { formatPrice } from '../data/storage';

export const ReceiptModal = ({ isOpen, onClose, order, currency }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel modal-content-animated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '480px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card, #0e0e12)',
          border: '1px solid var(--border-subtle, #3a3a3c)',
          borderRadius: 'var(--radius-xl)',
          padding: '24px',
          position: 'relative',
          color: 'var(--text-primary)'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'var(--badge-bg, rgba(255, 255, 255, 0.08))',
            border: '1px solid var(--border-subtle)',
            color: 'var(--text-primary)',
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

        {/* Printable Receipt Paper */}
        <div 
          className="receipt-printable"
          style={{
            background: '#ffffff',
            color: '#111111',
            borderRadius: 'var(--radius-md)',
            padding: '24px 20px',
            fontFamily: 'monospace',
            fontSize: '0.82rem',
            lineHeight: 1.45,
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            marginBottom: '20px'
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', borderBottom: '1px dashed #777', paddingBottom: '12px', marginBottom: '12px' }}>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '1px' }}>
              iLux APPLE ATELIER & STORE
            </div>
            <div style={{ fontSize: '0.72rem', color: '#555' }}>
              Toshkent sh., Amir Temur shoh ko'chasi 45
            </div>
            <div style={{ fontSize: '0.72rem', color: '#555' }}>
              Tel: +998 71 200-77-00 • www.ilux-apple.uz
            </div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, marginTop: '4px', color: '#b28900' }}>
              ★ RASMIY XARID KVITANSIYASI ★
            </div>
          </div>

          {/* Meta Info */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.76rem' }}>
            <span>BUYURTMA RAQAMI:</span>
            <span style={{ fontWeight: 700 }}>{order.id}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.76rem' }}>
            <span>SANA VA VAQT:</span>
            <span>{order.date || new Date().toLocaleString('uz-UZ')}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.76rem' }}>
            <span>MIJOZ:</span>
            <span style={{ fontWeight: 700 }}>{order.customerName}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px', fontSize: '0.76rem' }}>
            <span>TELEFON:</span>
            <span>{order.phone}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px', fontSize: '0.76rem' }}>
            <span>TO'LOV USULI:</span>
            <span style={{ fontWeight: 600 }}>{order.paymentMethod}</span>
          </div>

          <div style={{ borderBottom: '1px dashed #777', marginBottom: '10px' }} />

          {/* Items Table */}
          <div style={{ marginBottom: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, marginBottom: '6px', fontSize: '0.74rem' }}>
              <span>MAHSULOT</span>
              <span>QIYMATI</span>
            </div>
            {order.items.map((it, idx) => (
              <div key={idx} style={{ marginBottom: '8px' }}>
                <div style={{ fontWeight: 600 }}>{it.name}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#555', fontSize: '0.74rem' }}>
                  <span>{it.quantity} dona × {formatPrice(it.priceUSD, currency)}</span>
                  <span style={{ fontWeight: 700, color: '#111' }}>
                    {formatPrice(it.priceUSD * it.quantity, currency)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ borderBottom: '2px solid #111', marginBottom: '10px' }} />

          {/* Total */}
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800 }}>
            <span>JAMI TO'LOV:</span>
            <span style={{ color: '#000' }}>{formatPrice(order.totalUSD, currency)}</span>
          </div>

          {/* Barcode & Footer note */}
          <div style={{ textAlign: 'center', marginTop: '16px', borderTop: '1px dashed #777', paddingTop: '10px' }}>
            <div style={{ letterSpacing: '4px', fontWeight: 700, fontSize: '0.9rem', marginBottom: '4px' }}>
              ||||| | |||||| || ||||||| |||
            </div>
            <div style={{ fontSize: '0.7rem', color: '#555' }}>
              2 Yillik rasmiy kafolat ushbu chek orqali taqdim etiladi.
            </div>
            <div style={{ fontSize: '0.72rem', fontWeight: 600, marginTop: '2px' }}>
              Xaridingiz uchun tashakkur!
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={handlePrint}
            className="btn-apple btn-apple-gold"
            style={{ flex: 1, padding: '12px', fontSize: '0.88rem' }}
          >
            <Printer size={16} />
            <span>Chekni Chop Etish</span>
          </button>

          <button
            onClick={onClose}
            className="btn-apple btn-apple-glass"
            style={{ padding: '12px 20px', fontSize: '0.88rem' }}
          >
            <span>Yopish</span>
          </button>
        </div>
      </div>
    </div>
  );
};
