import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Minus, 
  Search, 
  Edit3, 
  Trash2, 
  Download, 
  Crown, 
  AlertTriangle,
  CheckCircle2,
  Filter
} from 'lucide-react';
import { formatPrice } from '../../data/storage';

export const AdminInventory = ({
  products,
  currency,
  onOpenAddModal,
  onOpenEditModal,
  onDeleteProduct,
  onUpdateStock
}) => {
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [onlyLowStock, setOnlyLowStock] = useState(false);

  const filtered = products.filter((p) => {
    if (categoryFilter !== 'all') {
      if (categoryFilter === 'gold' && !p.isGold) return false;
      if (categoryFilter !== 'gold' && p.category !== categoryFilter) return false;
    }
    if (onlyLowStock && p.stock > 3) return false;
    if (search.trim()) {
      return p.name.toLowerCase().includes(search.toLowerCase());
    }
    return true;
  });

  // CSV Export
  const handleExportCSV = () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    csvContent += "ID,Nomi,Kategoriya,Sotish Narxi ($),Tannarx ($),Ombor Qoldigi,Oylik Sotuv\n";
    products.forEach((p) => {
      csvContent += `"${p.id}","${p.name}","${p.category}",${p.priceUSD},${p.costUSD || 0},${p.stock},${p.monthlySold || 0}\n`;
    });
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `ilux_ombor_hisoboti_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      {/* Top Header & Actions */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '14px'
      }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-primary)' }}>
            <Package size={22} color="var(--accent-cyan, #73c4ff)" />
            <span>Tovarlar va Ombor Qoldig'i Boshqaruvi</span>
          </h2>
          <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
            Ombordagi tovarlar sonini boshqarish, narxlarni o'zgartirish va yangi modellar kiritish
          </p>
        </div>

        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button
            onClick={handleExportCSV}
            className="btn-apple btn-apple-glass"
            style={{ padding: '9px 16px', fontSize: '0.82rem' }}
          >
            <Download size={14} />
            <span>Excel / CSV Yuklab Olish</span>
          </button>

          <button
            onClick={onOpenAddModal}
            className="btn-apple btn-apple-primary"
            style={{ padding: '9px 18px', fontSize: '0.82rem' }}
          >
            <Plus size={15} />
            <span>Yangi Tovar Qo'shish</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="glass-panel" style={{
        padding: '14px 18px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px'
      }}>
        {/* Search */}
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flex: 1, minWidth: '220px' }}>
          <Search size={15} color="var(--text-secondary)" style={{ position: 'absolute', left: '12px' }} />
          <input
            type="text"
            placeholder="Tovar nomini qidirish..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: '100%',
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '8px 14px 8px 36px',
              color: 'var(--text-primary)',
              fontSize: '0.82rem',
              outline: 'none'
            }}
          />
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-full)',
              padding: '7px 14px',
              color: 'var(--text-primary)',
              fontSize: '0.8rem',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>Barcha Toifalar</option>
            <option value="gold" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>👑 24K Gold Atelier</option>
            <option value="iphone" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>📱 Apple iPhone</option>
            <option value="watch" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>⌚ Apple Watch</option>
            <option value="audio" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>🎧 AirPods & Audio</option>
            <option value="accessories" style={{ background: 'var(--bg-card)', color: 'var(--text-primary)' }}>⚡ Aksessuarlar</option>
          </select>

          <label style={{
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '0.78rem',
            color: 'var(--text-secondary)',
            cursor: 'pointer'
          }}>
            <input
              type="checkbox"
              checked={onlyLowStock}
              onChange={(e) => setOnlyLowStock(e.target.checked)}
              style={{ accentColor: 'var(--apple-red, #ff453a)' }}
            />
            <span>Faqat kam qolganlari (≤3)</span>
          </label>
        </div>
      </div>

      {/* Products Table for Desktop with smooth horizontal scroll */}
      <div className="glass-panel table-scroll-wrap admin-inventory-desktop-table" style={{ padding: 0, borderRadius: '20px' }}>
        <table style={{ width: '100%', minWidth: '850px', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.82rem' }}>
          <thead>
            <tr style={{
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
              borderBottom: '1px solid var(--border-subtle)',
              color: 'var(--text-secondary)',
              textTransform: 'uppercase',
              fontSize: '0.7rem'
            }}>
              <th style={{ padding: '14px 18px' }}>Tovar</th>
              <th style={{ padding: '14px 12px' }}>Kategoriya</th>
              <th style={{ padding: '14px 12px' }}>Sotish Narxi</th>
              <th style={{ padding: '14px 12px' }}>Tan Narxi</th>
              <th style={{ padding: '14px 12px' }}>Foyda Marjasi</th>
              <th style={{ padding: '14px 12px', textAlign: 'center' }}>Ombor Qoldig'i (+/-)</th>
              <th style={{ padding: '14px 12px' }}>Bu Oy Sotildi</th>
              <th style={{ padding: '14px 18px', textAlign: 'right' }}>Amallar</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((prod) => {
              const profitPerItem = prod.priceUSD - (prod.costUSD || prod.priceUSD * 0.78);
              const isLow = prod.stock <= 3;

              return (
                <tr 
                  key={prod.id}
                  style={{
                    borderBottom: '1px solid var(--border-subtle)',
                    transition: 'background 0.15s ease'
                  }}
                >
                  {/* Name and Image */}
                  <td style={{ padding: '12px 18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        style={{ width: '44px', height: '44px', borderRadius: '8px', objectFit: 'contain', background: 'var(--card-pedestal)' }}
                      />
                      <div>
                        <div style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
                          {prod.name}
                        </div>
                        <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary)' }}>
                          ID: {prod.id} {prod.isGold && '• Titanium Atelier'}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Category */}
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{
                      textTransform: 'uppercase',
                      fontSize: '0.68rem',
                      fontWeight: 700,
                      padding: '3px 8px',
                      borderRadius: 'var(--radius-full)',
                      background: prod.isGold ? 'linear-gradient(135deg, #d4af37, #aa771c)' : 'var(--badge-bg)',
                      color: prod.isGold ? '#ffffff' : 'var(--text-primary)'
                    }}>
                      {prod.category}
                    </span>
                  </td>

                  {/* Price */}
                  <td style={{ padding: '12px 12px', fontWeight: 800, color: 'var(--text-primary)' }}>
                    {formatPrice(prod.priceUSD, currency)}
                  </td>

                  {/* Cost Price */}
                  <td style={{ padding: '12px 12px', color: 'var(--text-secondary)' }}>
                    {formatPrice(prod.costUSD || prod.priceUSD * 0.78, currency)}
                  </td>

                  {/* Profit Margin */}
                  <td style={{ padding: '12px 12px', color: 'var(--apple-green, #30d158)', fontWeight: 700 }}>
                    +{formatPrice(profitPerItem, currency)}
                  </td>

                  {/* Stock Counter with instant +/- */}
                  <td style={{ padding: '12px 12px', textAlign: 'center' }}>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      background: isLow ? 'rgba(255, 69, 58, 0.12)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
                      border: isLow ? '1px solid rgba(255, 69, 58, 0.35)' : '1px solid var(--border-subtle)',
                      borderRadius: 'var(--radius-full)',
                      padding: '3px 10px'
                    }}>
                      <button
                        onClick={() => onUpdateStock(prod.id, -1)}
                        title="1 donaga kamaytirish"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Minus size={13} />
                      </button>

                      <span style={{
                        fontWeight: 800,
                        fontSize: '0.84rem',
                        color: isLow ? 'var(--apple-red, #ff453a)' : 'var(--text-primary)',
                        minWidth: '24px'
                      }}>
                        {prod.stock}
                      </span>

                      <button
                        onClick={() => onUpdateStock(prod.id, 1)}
                        title="1 donaga oshirish"
                        style={{
                          background: 'none',
                          border: 'none',
                          color: 'var(--text-primary)',
                          cursor: 'pointer',
                          padding: '2px',
                          display: 'flex',
                          alignItems: 'center'
                        }}
                      >
                        <Plus size={13} />
                      </button>
                    </div>
                  </td>

                  {/* Monthly Sold */}
                  <td style={{ padding: '12px 12px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--apple-orange, #ff9f0a)' }}>
                      {prod.monthlySold || 0} dona
                    </span>
                  </td>

                  {/* Actions */}
                  <td style={{ padding: '12px 18px', textAlign: 'right' }}>
                    <div style={{ display: 'inline-flex', gap: '8px' }}>
                      <button
                        onClick={() => onOpenEditModal(prod)}
                        title="Tahrirlash"
                        style={{
                          background: 'var(--badge-bg, rgba(255, 255, 255, 0.08))',
                          border: '1px solid var(--border-subtle)',
                          color: 'var(--text-primary)',
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease'
                        }}
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        onClick={() => {
                          if (confirm(`Haqiqatan ham "${prod.name}" tovarini o'chirmoqchimisiz?`)) {
                            onDeleteProduct(prod.id);
                          }
                        }}
                        title="O'chirish"
                        style={{
                          background: 'rgba(255, 69, 58, 0.15)',
                          border: '1px solid rgba(255, 69, 58, 0.3)',
                          color: 'var(--apple-red, #ff453a)',
                          width: '32px',
                          height: '32px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          cursor: 'pointer',
                          transition: 'all 0.18s ease'
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Inventory Cards View */}
      <div className="admin-inventory-mobile-cards" style={{ display: 'none', flexDirection: 'column', gap: '12px' }}>
        {filtered.length === 0 ? (
          <div className="glass-panel" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-secondary)' }}>
            Tovarlar topilmadi.
          </div>
        ) : (
          filtered.map((prod) => {
            const profitPerItem = prod.priceUSD - (prod.costUSD || prod.priceUSD * 0.78);
            const isLow = prod.stock <= 3;

            return (
              <div
                key={prod.id}
                className="glass-panel"
                style={{
                  padding: '16px',
                  borderRadius: '18px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '12px',
                  border: prod.isGold ? '1px solid var(--accent-cyan, #73c4ff)' : '1px solid var(--border-subtle)'
                }}
              >
                {/* Header: Image + Name + Category */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img
                    src={prod.image}
                    alt={prod.name}
                    style={{ width: '48px', height: '48px', borderRadius: '10px', objectFit: 'contain', background: 'var(--card-pedestal)', flexShrink: 0 }}
                  />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap', marginBottom: '3px' }}>
                      <span style={{
                        textTransform: 'uppercase',
                        fontSize: '0.65rem',
                        fontWeight: 700,
                        padding: '2px 7px',
                        borderRadius: 'var(--radius-full)',
                        background: prod.isGold ? 'linear-gradient(135deg, #d4af37, #aa771c)' : 'var(--badge-bg)',
                        color: prod.isGold ? '#ffffff' : 'var(--text-primary)'
                      }}>
                        {prod.category}
                      </span>
                      {prod.isGold && (
                        <span style={{ fontSize: '0.65rem', color: '#ffd700', fontWeight: 600 }}>
                          👑 Atelier
                        </span>
                      )}
                    </div>
                    <div style={{ fontWeight: 700, color: 'var(--text-primary)', fontSize: '0.9rem', lineHeight: 1.25 }}>
                      {prod.name}
                    </div>
                    <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginTop: '2px' }}>
                      ID: {prod.id}
                    </div>
                  </div>
                </div>

                {/* Pricing & Profit Row */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                  padding: '8px 12px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-subtle)',
                  fontSize: '0.78rem'
                }}>
                  <div>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>SOTISH NARXI</div>
                    <div style={{ fontWeight: 800, color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {formatPrice(prod.priceUSD, currency)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.68rem' }}>FOYDA (MARJA)</div>
                    <div style={{ color: 'var(--apple-green, #30d158)', fontWeight: 700 }}>
                      +{formatPrice(profitPerItem, currency)}
                    </div>
                  </div>
                </div>

                {/* Stock Counter + Monthly Sold + Actions Row */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px', flexWrap: 'wrap' }}>
                  
                  {/* Stock Counter with +/- */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: isLow ? 'rgba(255, 69, 58, 0.12)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
                    border: isLow ? '1px solid rgba(255, 69, 58, 0.35)' : '1px solid var(--border-subtle)',
                    borderRadius: 'var(--radius-full)',
                    padding: '4px 10px'
                  }}>
                    <button
                      onClick={() => onUpdateStock(prod.id, -1)}
                      title="1 donaga kamaytirish"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Minus size={14} />
                    </button>

                    <span style={{
                      fontWeight: 800,
                      fontSize: '0.86rem',
                      color: isLow ? 'var(--apple-red, #ff453a)' : 'var(--text-primary)',
                      minWidth: '24px',
                      textAlign: 'center'
                    }}>
                      {prod.stock} ta
                    </span>

                    <button
                      onClick={() => onUpdateStock(prod.id, 1)}
                      title="1 donaga oshirish"
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--text-primary)',
                        cursor: 'pointer',
                        padding: '2px',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <Plus size={14} />
                    </button>
                  </div>

                  {/* Monthly Sold pill */}
                  <span style={{
                    fontSize: '0.72rem',
                    color: 'var(--apple-orange, #ff9f0a)',
                    fontWeight: 600,
                    background: 'rgba(255, 159, 10, 0.12)',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-full)'
                  }}>
                    Sotildi: {prod.monthlySold || 0} ta
                  </span>

                  {/* Actions: Edit & Delete */}
                  <div style={{ display: 'inline-flex', gap: '6px', marginLeft: 'auto' }}>
                    <button
                      onClick={() => onOpenEditModal(prod)}
                      title="Tahrirlash"
                      style={{
                        background: 'var(--badge-bg, rgba(255, 255, 255, 0.08))',
                        border: '1px solid var(--border-subtle)',
                        color: 'var(--text-primary)',
                        padding: '6px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '5px',
                        fontSize: '0.74rem',
                        cursor: 'pointer'
                      }}
                    >
                      <Edit3 size={13} />
                      <span>Tahrirlash</span>
                    </button>

                    <button
                      onClick={() => {
                        if (confirm(`Haqiqatan ham "${prod.name}" tovarini o'chirmoqchimisiz?`)) {
                          onDeleteProduct(prod.id);
                        }
                      }}
                      title="O'chirish"
                      style={{
                        background: 'rgba(255, 69, 58, 0.15)',
                        border: '1px solid rgba(255, 69, 58, 0.3)',
                        color: 'var(--apple-red, #ff453a)',
                        padding: '6px 10px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        cursor: 'pointer'
                      }}
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>

                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
