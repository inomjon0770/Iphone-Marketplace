import React, { useState, useEffect } from 'react';
import { X, Save, Crown, Image as ImageIcon } from 'lucide-react';

export const AdminProductModal = ({
  isOpen,
  onClose,
  productToEdit,
  onSaveProduct
}) => {
  if (!isOpen) return null;

  const [name, setName] = useState('');
  const [category, setCategory] = useState('iphone');
  const [isGold, setIsGold] = useState(false);
  const [goldKarat, setGoldKarat] = useState('24 Karat (999.9 Sof Oltin)');
  const [priceUSD, setPriceUSD] = useState(1200);
  const [costUSD, setCostUSD] = useState(950);
  const [stock, setStock] = useState(10);
  const [monthlySold, setMonthlySold] = useState(0);
  const [storageInput, setStorageInput] = useState('256GB, 512GB, 1TB');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    if (productToEdit) {
      setName(productToEdit.name || '');
      setCategory(productToEdit.category || 'iphone');
      setIsGold(productToEdit.isGold || false);
      setGoldKarat(productToEdit.goldKarat || '24 Karat (999.9 Sof Oltin)');
      setPriceUSD(productToEdit.priceUSD || 0);
      setCostUSD(productToEdit.costUSD || 0);
      setStock(productToEdit.stock || 0);
      setMonthlySold(productToEdit.monthlySold || 0);
      setStorageInput(productToEdit.storageOptions ? productToEdit.storageOptions.join(', ') : '256GB, 512GB');
      setImage(productToEdit.image || '');
      setDescription(productToEdit.description || '');
    } else {
      // Yangi tovar uchun boshlang'ich qiymatlar
      setName('');
      setCategory('iphone');
      setIsGold(false);
      setGoldKarat('24 Karat (999.9 Sof Oltin)');
      setPriceUSD(1200);
      setCostUSD(950);
      setStock(10);
      setMonthlySold(0);
      setStorageInput('256GB, 512GB, 1TB');
      setImage('https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop');
      setDescription('');
    }
  }, [productToEdit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("Iltimos, tovar nomini kiriting!");
      return;
    }

    const storageOptions = storageInput.split(',').map((s) => s.trim()).filter(Boolean);

    const productData = {
      id: productToEdit ? productToEdit.id : `prod-${Date.now()}`,
      name,
      category,
      isGold,
      goldKarat: isGold ? goldKarat : undefined,
      badge: isGold ? '24K ATELIER' : undefined,
      priceUSD: Number(priceUSD),
      costUSD: Number(costUSD),
      stock: Number(stock),
      monthlySold: Number(monthlySold),
      storageOptions,
      selectedStorage: storageOptions[0] || '256GB',
      image: image || 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=1000&auto=format&fit=crop',
      description
    };

    onSaveProduct(productData);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div 
        className="glass-panel modal-content-animated"
        onClick={(e) => e.stopPropagation()}
        style={{
          width: '100%',
          maxWidth: '640px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card)',
          color: 'var(--text-primary)',
          border: isGold ? '1px solid var(--accent-cyan)' : '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-xl)',
          padding: '28px',
          position: 'relative'
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--badge-bg)',
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

        <h2 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '6px', color: 'var(--text-primary)' }}>
          {productToEdit ? 'Tovarni Tahrirlash' : 'Yangi Tovar Qo\'shish (Katalog & Ombor)'}
        </h2>
        <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '20px' }}>
          Barcha narxlar, ombor soni va xususiyatlarni to'ldiring.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {/* Nomi */}
          <div>
            <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Tovar Nomi *
            </label>
            <input
              type="text"
              required
              placeholder="Masalan: iPhone 16 Pro Max Space Obsidian Edition"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '9px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Kategoriya & Gold checkbox */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Kategoriya
              </label>
              <select
                value={category}
                onChange={(e) => {
                  setCategory(e.target.value);
                  if (e.target.value === 'gold') setIsGold(true);
                }}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              >
                <option value="iphone">Apple iPhone</option>
                <option value="gold">Titanium Atelier</option>
                <option value="watch">Apple Watch</option>
                <option value="audio">AirPods & Audio</option>
                <option value="accessories">Aksessuarlar</option>
              </select>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', paddingTop: '10px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontSize: '0.8rem', color: 'var(--text-primary)' }}>
                <input
                  type="checkbox"
                  checked={isGold}
                  onChange={(e) => setIsGold(e.target.checked)}
                  style={{ accentColor: 'var(--accent-cyan)' }}
                />
                <Crown size={15} />
                <span>Titanium Qoplamali (Atelier)</span>
              </label>
            </div>
          </div>

          {/* Gold Karat (if isGold) */}
          {isGold && (
            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-primary)', display: 'block', marginBottom: '4px' }}>
                Titanium / Material Xususiyati:
              </label>
              <input
                type="text"
                value={goldKarat}
                onChange={(e) => setGoldKarat(e.target.value)}
                placeholder="Space Obsidian & Natural Titanium"
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Narxlar & Ombor Soni */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Sotish Narxi ($ USD) *
              </label>
              <input
                type="number"
                required
                value={priceUSD}
                onChange={(e) => setPriceUSD(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Tan Narxi ($ USD) *
              </label>
              <input
                type="number"
                required
                value={costUSD}
                onChange={(e) => setCostUSD(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Ombordagi Soni (Dona) *
              </label>
              <input
                type="number"
                required
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Xotira va Oylik sotuv */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Xotira Variantlari (vergul bilan)
              </label>
              <input
                type="text"
                value={storageInput}
                onChange={(e) => setStorageInput(e.target.value)}
                placeholder="256GB, 512GB, 1TB"
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
                Bu Oy Sotilgan Soni
              </label>
              <input
                type="number"
                value={monthlySold}
                onChange={(e) => setMonthlySold(e.target.value)}
                style={{
                  width: '100%',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: '9px 12px',
                  color: 'var(--text-primary)',
                  fontSize: '0.84rem',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Rasm URL */}
          <div>
            <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Rasm URL Havolasi
            </label>
            <input
              type="text"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://images.unsplash.com/..."
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '9px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none'
              }}
            />
          </div>

          {/* Tavsifi */}
          <div>
            <label style={{ fontSize: '0.76rem', color: 'var(--text-secondary)', display: 'block', marginBottom: '4px' }}>
              Mahsulot Tavsifi
            </label>
            <textarea
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Mahsulot haqida qisqacha ma'lumot..."
              style={{
                width: '100%',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '9px 12px',
                color: 'var(--text-primary)',
                fontSize: '0.84rem',
                outline: 'none',
                resize: 'none'
              }}
            />
          </div>

          {/* Submit */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
            <button
              type="button"
              onClick={onClose}
              className="btn-apple btn-apple-glass"
              style={{ padding: '10px 20px', fontSize: '0.86rem' }}
            >
              Bekor Qilish
            </button>

            <button
              type="submit"
              className="btn-apple btn-apple-gold"
              style={{ padding: '10px 24px', fontSize: '0.86rem' }}
            >
              <Save size={15} />
              <span>Saqlash</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
