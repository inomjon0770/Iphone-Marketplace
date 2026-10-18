import React, { useState } from 'react';
import { ShoppingBag, Search, Plus, Minus, Trash2, Printer, CheckCircle, CreditCard, Banknote, User } from 'lucide-react';
import { formatPrice } from '../../data/storage';

export const AdminPOS = ({
  products,
  currency,
  onCompletePOSSale
}) => {
  const [cart, setCart] = useState([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [customerName, setCustomerName] = useState('Do\'konga kirgan xaridor');
  const [customerPhone, setCustomerPhone] = useState('+998 ');
  const [paymentMethod, setPaymentMethod] = useState('Naqd pul');

  // Filter products for POS
  const filteredProducts = products.filter((p) => {
    if (category !== 'all') {
      if (category === 'gold' && !p.isGold) return false;
      if (category !== 'gold' && p.category !== category) return false;
    }
    if (search.trim()) {
      return p.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  const addToCart = (product) => {
    if (product.stock <= 0) {
      alert("Kechirasiz, ushbu tovar omborda tugagan!");
      return;
    }

    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        if (existing.quantity >= product.stock) {
          alert(`Omborda faqat ${product.stock} dona bor!`);
          return prev;
        }
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const removeItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalUSD = cart.reduce((sum, it) => sum + (it.priceUSD * it.quantity), 0);

  const handleCheckout = () => {
    if (cart.length === 0) {
      alert("Iltimos, avval tovarlarni tanlang!");
      return;
    }

    const orderId = `POS-${Math.floor(1000 + Math.random() * 9000)}`;
    const now = new Date();
    const dateStr = now.toISOString().slice(0, 10) + ' ' + now.toTimeString().slice(0, 5);

    const posOrder = {
      id: orderId,
      customerName: customerName || 'Do\'konga kirgan xaridor',
      phone: customerPhone || '+998 71 200-77-00',
      city: 'Toshkent shahar (Do\'kondan sotuv)',
      address: 'iLux Atelier Flagship Store',
      paymentMethod,
      note: 'Tezkor Kassa orqali sotildi',
      status: 'Yetib keldi',
      date: dateStr,
      items: cart.map((it) => ({
        id: it.id,
        name: it.name,
        priceUSD: it.priceUSD,
        quantity: it.quantity,
        selectedStorage: it.selectedStorage
      })),
      totalUSD,
      profitUSD: Math.round(totalUSD * 0.22)
    };

    onCompletePOSSale(posOrder);
    setCart([]);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '20px' }} className="pos-layout-grid">
      
      {/* LEFT: Products Grid for quick selection */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
        
        {/* Search & Category Filter */}
        <div className="glass-panel" style={{ padding: '14px', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <div style={{ position: 'relative', flex: 1, minWidth: '180px' }}>
            <Search size={15} color="var(--text-secondary)" style={{ position: 'absolute', left: '10px', top: '10px' }} />
            <input
              type="text"
              placeholder="Tovarni tezkor qidirish..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '8px 12px 8px 32px',
                color: 'var(--text-primary)',
                fontSize: '0.82rem',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {['all', 'gold', 'iphone', 'watch', 'audio', 'accessories'].map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                style={{
                  background: category === cat ? 'var(--accent-btn-bg, #73c4ff)' : 'var(--badge-bg, rgba(255, 255, 255, 0.05))',
                  color: category === cat ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-full)',
                  padding: '5px 12px',
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                {cat === 'all' ? 'Barchasi' : cat.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Quick Products List Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))',
          gap: '12px',
          maxHeight: '620px',
          overflowY: 'auto'
        }}>
          {filteredProducts.map((p) => {
            const outOfStock = p.stock <= 0;
            return (
              <div
                key={p.id}
                onClick={() => !outOfStock && addToCart(p)}
                className="glass-panel"
                style={{
                  padding: '12px',
                  cursor: outOfStock ? 'not-allowed' : 'pointer',
                  opacity: outOfStock ? 0.45 : 1,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  border: p.isGold ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ width: '100%', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px', background: 'var(--card-pedestal)', borderRadius: '8px' }}>
                  <img src={p.image} alt={p.name} style={{ maxHeight: '90%', maxWidth: '90%', objectFit: 'contain' }} />
                </div>

                <div>
                  <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-primary)', lineHeight: 1.25, marginBottom: '4px' }}>
                    {p.name}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Qoldiq: <b style={{ color: p.stock <= 3 ? 'var(--apple-red)' : 'var(--text-primary)' }}>{p.stock} ta</b>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '0.86rem', fontWeight: 800, color: 'var(--text-primary)' }}>
                      {formatPrice(p.priceUSD, currency)}
                    </span>
                    <button
                      type="button"
                      disabled={outOfStock}
                      style={{
                        background: 'var(--accent-btn-bg, #73c4ff)',
                        border: 'none',
                        color: 'var(--accent-btn-text, #0b0c0e)',
                        borderRadius: '50%',
                        width: '24px',
                        height: '24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Plus size={13} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>

      {/* RIGHT: Cashier Terminal */}
      <div className="glass-panel" style={{
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid var(--border-subtle)',
        background: 'var(--bg-card)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '12px' }}>
          <ShoppingBag size={20} color="var(--accent-cyan, #73c4ff)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)' }}>Kassa Terminali (Tezkor Savdo)</h3>
        </div>

        {/* Selected Items */}
        <div style={{ flex: 1, minHeight: '180px', maxHeight: '280px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '16px' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '40px 10px', color: 'var(--text-secondary)', fontSize: '0.82rem' }}>
              Chap tomondan xaridor tanlagan tovarlarni bosing.
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                style={{
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.03))',
                  border: '1px solid var(--border-subtle)',
                  padding: '8px 10px',
                  borderRadius: 'var(--radius-sm)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '8px',
                  fontSize: '0.78rem'
                }}
              >
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{item.name}</div>
                  <div style={{ color: 'var(--text-secondary)' }}>
                    {formatPrice(item.priceUSD, currency)} × {item.quantity}
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <button
                    onClick={() => updateQuantity(item.id, -1)}
                    style={{ background: 'var(--badge-bg)', border: 'none', color: 'var(--text-primary)', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}
                  >
                    <Minus size={11} />
                  </button>
                  <span style={{ fontWeight: 700, minWidth: '18px', textAlign: 'center', color: 'var(--text-primary)' }}>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, 1)}
                    style={{ background: 'var(--badge-bg)', border: 'none', color: 'var(--text-primary)', borderRadius: '4px', width: '22px', height: '22px', cursor: 'pointer' }}
                  >
                    <Plus size={11} />
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', color: 'var(--apple-red, #ff453a)', cursor: 'pointer', marginLeft: '4px' }}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer fields */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
              Xaridor Ismi
            </label>
            <input
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 10px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '3px' }}>
              Telefon Raqami
            </label>
            <input
              type="text"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
              placeholder="+998..."
              style={{
                width: '100%',
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-sm)',
                padding: '7px 10px',
                color: 'var(--text-primary)',
                fontSize: '0.8rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Payment Method */}
          <div>
            <label style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              To'lov Turi
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
              {['Naqd pul', 'Plastik karta (Uzcard/Humo)', 'Bo\'lib to\'lash (0-0-12)'].map((pm) => (
                <button
                  key={pm}
                  type="button"
                  onClick={() => setPaymentMethod(pm)}
                  style={{
                    background: paymentMethod === pm ? 'var(--accent-btn-bg, #73c4ff)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                    border: paymentMethod === pm ? '1px solid var(--accent-btn-bg, #73c4ff)' : '1px solid var(--border-subtle)',
                    color: paymentMethod === pm ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-secondary)',
                    borderRadius: 'var(--radius-sm)',
                    padding: '6px',
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  {pm}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Total & Sell button */}
        <div style={{
          borderTop: '1px solid var(--border-subtle)',
          paddingTop: '14px',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.84rem', color: 'var(--text-secondary)' }}>Jami Kassa:</span>
            <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--accent-cyan, #73c4ff)' }}>
              {formatPrice(totalUSD, currency)}
            </span>
          </div>

          <button
            onClick={handleCheckout}
            disabled={cart.length === 0}
            className="btn-apple btn-apple-gold"
            style={{
              padding: '12px',
              fontSize: '0.92rem',
              opacity: cart.length === 0 ? 0.5 : 1,
              cursor: cart.length === 0 ? 'not-allowed' : 'pointer'
            }}
          >
            <Printer size={16} />
            <span>Sotish & Kassa Chekini Chiqarish</span>
          </button>
        </div>

      </div>

      <style>{`
        @media (min-width: 900px) {
          .pos-layout-grid {
            grid-template-columns: 1.4fr 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
