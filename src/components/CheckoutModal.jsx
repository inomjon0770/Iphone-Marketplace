import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Banknote, Clock, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { formatPrice } from '../data/storage';

export const CheckoutModal = ({
  isOpen,
  onClose,
  checkoutData,
  currency,
  onSubmitOrder,
  t
}) => {
  if (!isOpen || !checkoutData) return null;

  const chT = t?.checkout || {};

  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('+998 ');
  const [city, setCity] = useState('Toshkent shahar');
  const [address, setAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('Karta orqali');
  const [note, setNote] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!customerName.trim() || phone.trim().length < 9) {
      alert("Iltimos, ismingiz va to'liq telefon raqamingizni kiriting!");
      return;
    }

    setIsSubmitting(true);

    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (err) {
      // ignore
    }

    const orderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

    const newOrder = {
      id: orderId,
      customerName,
      phone,
      city,
      address,
      paymentMethod,
      note,
      date: dateStr,
      status: 'Qabul qilindi',
      items: checkoutData.items.map((it) => ({
        id: it.id,
        name: it.name,
        priceUSD: it.priceUSD,
        quantity: it.quantity,
        selectedStorage: it.selectedStorage,
        selectedColor: it.selectedColor
      })),
      totalUSD: checkoutData.totalUSD,
      profitUSD: Math.round(checkoutData.totalUSD * 0.22)
    };

    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitOrder(newOrder);
    }, 600);
  };

  return (
    <div className="modal-overlay" onClick={onClose} style={{
      position: 'fixed',
      inset: 0,
      zIndex: 1000,
      background: 'rgba(0, 0, 0, 0.72)',
      backdropFilter: 'blur(10px)',
      WebkitBackdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div 
        className="modal-content-animated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '540px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card, #111316)',
          color: 'var(--text-primary, #edf0f3)',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
          borderRadius: '24px',
          padding: '28px',
          position: 'relative',
          boxShadow: 'var(--shadow-hover, 0 24px 60px rgba(0, 0, 0, 0.45))'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-secondary, rgba(255, 255, 255, 0.08))',
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

        <div style={{ marginBottom: '20px' }}>
          <h2 style={{ fontSize: '1.35rem', fontWeight: 800, marginBottom: '4px', color: 'var(--text-primary, #edf0f3)' }}>
            {chT.title || 'Buyurtmani rasmiylashtirish'}
          </h2>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary, #8e949b)' }}>
            Yetkazib berish va to‘lov ma‘lumotlarini tasdiqlang.
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Mijoz ismi */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #8e949b)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
              {chT.fullName || 'Ism va Familiyangiz'} *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: Azizbek Karimov"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                borderRadius: '12px',
                padding: '9px 14px',
                color: 'var(--text-primary, #edf0f3)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Telefon raqami */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #8e949b)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
              {chT.phone || 'Telefon raqamingiz'} *
            </label>
            <input
              type="text"
              required
              placeholder="+998 90 123 45 67"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                borderRadius: '12px',
                padding: '9px 14px',
                color: 'var(--text-primary, #edf0f3)',
                fontSize: '0.88rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Shahar va Manzil */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #8e949b)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                Shahar / Viloyat
              </label>
              <select
                value={city}
                onChange={(e) => setCity(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                  border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                  borderRadius: '12px',
                  padding: '9px 14px',
                  color: 'var(--text-primary, #edf0f3)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              >
                <option value="Toshkent shahar">Toshkent shahar</option>
                <option value="Samarqand">Samarqand</option>
                <option value="Buxoro">Buxoro</option>
                <option value="Farg'ona">Farg'ona</option>
                <option value="Andijon">Andijon</option>
                <option value="Namangan">Namangan</option>
                <option value="Boshqa hudud">Boshqa hudud</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #8e949b)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
                {chT.address || 'Yetkazib berish manzili'}
              </label>
              <input
                type="text"
                placeholder="Ko'cha, uy, xonadon"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                  border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                  borderRadius: '12px',
                  padding: '9px 14px',
                  color: 'var(--text-primary, #edf0f3)',
                  fontSize: '0.88rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* To'lov usullari */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #8e949b)', display: 'block', marginBottom: '6px', fontWeight: 600 }}>
              {chT.paymentMethod || 'To‘lov usuli'}:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '8px' }}>
              {[
                { id: 'Karta orqali', label: chT.payCard || 'Karta orqali online', icon: CreditCard },
                { id: 'Naqd pul', label: chT.payCash || 'Qabul qilganda naqd', icon: Banknote },
                { id: 'Bo\'lib to\'lash', label: '0-0-12 Muddatli to‘lov', icon: Clock }
              ].map((m) => {
                const Icon = m.icon;
                const isSelected = paymentMethod === m.id;
                return (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setPaymentMethod(m.id)}
                    style={{
                      background: isSelected ? 'rgba(115, 196, 255, 0.12)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                      border: isSelected ? '2px solid var(--accent-cyan, #73c4ff)' : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                      borderRadius: '12px',
                      padding: '10px 8px',
                      color: isSelected ? 'var(--accent-cyan, #73c4ff)' : 'var(--text-secondary, #8e949b)',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: '5px',
                      cursor: 'pointer',
                      fontSize: '0.76rem',
                      fontWeight: 600
                    }}
                  >
                    <Icon size={18} />
                    <span>{m.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Izoh */}
          <div>
            <label style={{ fontSize: '0.78rem', color: 'var(--text-secondary, #8e949b)', display: 'block', marginBottom: '5px', fontWeight: 600 }}>
              {chT.notes || 'Kuryer uchun izoh (ixtiyoriy)'}
            </label>
            <textarea
              rows={2}
              placeholder="Masalan: Dom domofon kodi 45..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                borderRadius: '12px',
                padding: '9px 14px',
                color: 'var(--text-primary, #edf0f3)',
                fontSize: '0.84rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Total & Submit */}
          <div style={{
            background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
            padding: '14px',
            borderRadius: '14px',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #8e949b)' }}>Jami to‘lov:</div>
              <div style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--text-primary, #edf0f3)' }}>
                {formatPrice(checkoutData.totalUSD, currency)}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-apple btn-apple-primary"
              style={{
                padding: '12px 24px',
                fontSize: '0.92rem',
                background: 'var(--accent-btn-bg, #73c4ff)',
                color: 'var(--accent-btn-text, #0b0c0e)',
                border: 'none',
                borderRadius: '12px',
                fontWeight: 700,
                cursor: 'pointer'
              }}
            >
              {isSubmitting ? 'Rasmiylashtirilmoqda...' : (chT.submitOrder || 'Buyurtmani tasdiqlash')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
