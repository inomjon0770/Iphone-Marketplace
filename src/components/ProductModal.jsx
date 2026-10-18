import React, { useState, useEffect } from 'react';
import { X, Crown, ShieldCheck, ShoppingBag, Zap, Award, Flame, Check } from 'lucide-react';
import { formatPrice } from '../data/storage';

export const ProductModal = ({
  product,
  currency,
  onClose,
  onAddToCart,
  onFastBuy,
  t
}) => {
  if (!product) return null;

  const mT = t?.modal || {};
  const cT = t?.catalog || {};

  const [selectedImage, setSelectedImage] = useState(product.image);
  const [selectedStorage, setSelectedStorage] = useState(
    product.selectedStorage || (product.storageOptions ? product.storageOptions[0] : null)
  );
  const [selectedColor, setSelectedColor] = useState(
    product.colors ? product.colors[0] : null
  );

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      setSelectedStorage(product.selectedStorage || (product.storageOptions ? product.storageOptions[0] : null));
      setSelectedColor(product.colors ? product.colors[0] : null);
    }
  }, [product]);

  const calculateDynamicPrice = () => {
    let base = product.priceUSD;
    if (selectedStorage === '1TB') base += 200;
    if (selectedStorage === '2TB') base += 450;
    return base;
  };

  const finalPriceUSD = calculateDynamicPrice();

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
          maxWidth: '880px',
          maxHeight: '90vh',
          overflowY: 'auto',
          background: 'var(--bg-card, #111316)',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
          borderRadius: '26px',
          padding: '30px',
          position: 'relative',
          boxShadow: 'var(--shadow-hover, 0 25px 60px rgba(0, 0, 0, 0.45))',
          color: 'var(--text-primary, #edf0f3)'
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            background: 'var(--bg-secondary, rgba(255, 255, 255, 0.08))',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
            color: 'var(--text-primary, #edf0f3)',
            width: '36px',
            height: '36px',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '28px'
        }} className="product-modal-grid">
          
          {/* Gallery Column */}
          <div>
            <div style={{
              width: '100%',
              height: '380px',
              borderRadius: '20px',
              overflow: 'hidden',
              background: 'var(--card-pedestal, radial-gradient(ellipse at 50% 44%, #343a42 0%, #1d2126 37%, #141619 76%))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '14px',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              padding: '20px'
            }}>
              <img
                src={selectedImage}
                alt={product.name}
                style={{
                  maxWidth: '92%',
                  maxHeight: '92%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.45))',
                  transition: 'transform 0.3s ease'
                }}
              />
            </div>

            {/* Thumbnail selector */}
            {product.gallery && product.gallery.length > 1 && (
              <div style={{ display: 'flex', gap: '10px' }}>
                {product.gallery.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setSelectedImage(img)}
                    style={{
                      width: '64px',
                      height: '64px',
                      borderRadius: '12px',
                      overflow: 'hidden',
                      border: selectedImage === img ? '2px solid var(--accent-cyan, #73c4ff)' : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                      background: 'var(--bg-secondary, #121519)',
                      cursor: 'pointer',
                      padding: '4px'
                    }}
                  >
                    <img src={img} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              {product.isGold ? (
                <span className="gold-badge">
                  <ShieldCheck size={12} />
                  {product.goldKarat || 'TITANIUM ATELIER'}
                </span>
              ) : (
                <span style={{
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #edf0f3)',
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.08))',
                  border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
                  padding: '3px 10px',
                  borderRadius: 'var(--radius-full)'
                }}>
                  ORIGINAL APPLE
                </span>
              )}

              <span style={{
                fontSize: '0.75rem',
                color: 'var(--text-secondary, #8e949b)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                fontWeight: 600
              }}>
                <Check size={14} color="var(--accent-cyan, #73c4ff)" />
                {cT.inStock || 'Mavjud'}: {product.stock} dona
              </span>
            </div>

            <h2 style={{
              fontSize: '1.45rem',
              fontWeight: 800,
              lineHeight: 1.25,
              marginBottom: '10px',
              color: 'var(--text-primary, #edf0f3)'
            }}>
              {product.name}
            </h2>

            <p style={{
              fontSize: '0.86rem',
              color: 'var(--text-secondary, #8e949b)',
              lineHeight: 1.55,
              marginBottom: '18px'
            }}>
              {product.description}
            </p>

            {/* Storage Selection */}
            {product.storageOptions && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary, #8e949b)', marginBottom: '6px' }}>
                  {mT.storage || 'XOTIRA HAJMI'}:
                </div>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {product.storageOptions.map((opt) => (
                    <button
                      key={opt}
                      onClick={() => setSelectedStorage(opt)}
                      style={{
                        padding: '7px 16px',
                        borderRadius: 'var(--radius-md)',
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        background: selectedStorage === opt ? 'var(--accent-btn-bg, #73c4ff)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                        border: selectedStorage === opt ? '1px solid var(--accent-btn-bg, #73c4ff)' : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
                        color: selectedStorage === opt ? 'var(--accent-btn-text, #0b0c0e)' : 'var(--text-primary, #edf0f3)'
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Colors Selection */}
            {product.colors && (
              <div style={{ marginBottom: '16px' }}>
                <div style={{ fontSize: '0.78rem', fontWeight: 700, color: 'var(--text-secondary, #8e949b)', marginBottom: '6px' }}>
                  {mT.color || 'RANG'}: <span style={{ color: 'var(--text-primary, #edf0f3)' }}>{selectedColor?.name}</span>
                </div>
                <div style={{ display: 'flex', gap: '8px' }}>
                  {product.colors.map((color, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedColor(color)}
                      style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        backgroundColor: color.hex,
                        border: selectedColor?.name === color.name ? '3px solid var(--accent-cyan, #73c4ff)' : '2px solid rgba(255, 255, 255, 0.2)',
                        cursor: 'pointer'
                      }}
                      title={color.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Specs Table */}
            {product.specs && (
              <div style={{
                background: 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                borderRadius: '16px',
                padding: '14px',
                marginBottom: '18px',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
              }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 700, color: 'var(--accent-cyan, #73c4ff)', marginBottom: '6px', letterSpacing: '0.04em' }}>
                  {mT.officialSpecs || 'TEXNIK XUSUSIYATLARI'}:
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', fontSize: '0.76rem' }}>
                  {Object.entries(product.specs).map(([key, val]) => (
                    <div key={key}>
                      <span style={{ color: 'var(--text-secondary, #8e949b)', textTransform: 'capitalize' }}>{key}: </span>
                      <span style={{ color: 'var(--text-primary, #edf0f3)', fontWeight: 600 }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Price & Actions */}
            <div style={{
              marginTop: 'auto',
              paddingTop: '16px',
              borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '14px',
              flexWrap: 'wrap'
            }}>
              <div>
                <div style={{ fontSize: '0.68rem', color: 'var(--text-secondary, #8e949b)' }}>{mT.total || 'Jami Narx'}:</div>
                <div style={{
                  fontSize: '1.5rem',
                  fontWeight: 800,
                  color: 'var(--text-primary, #edf0f3)'
                }}>
                  {formatPrice(finalPriceUSD, currency)}
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onAddToCart({ ...product, priceUSD: finalPriceUSD, selectedStorage, selectedColor: selectedColor?.name })}
                  className="btn-apple btn-apple-subtle"
                >
                  <ShoppingBag size={15} />
                  <span>{cT.addToCart || 'Savatga'}</span>
                </button>

                <button
                  onClick={() => onFastBuy({ ...product, priceUSD: finalPriceUSD, selectedStorage, selectedColor: selectedColor?.name })}
                  className="btn-apple btn-apple-primary"
                >
                  <Zap size={15} />
                  <span>{cT.viewDetails || 'Tezkor Xarid'}</span>
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>

      <style>{`
        @media (min-width: 768px) {
          .product-modal-grid {
            grid-template-columns: 1fr 1.25fr !important;
          }
        }
      `}</style>
    </div>
  );
};
