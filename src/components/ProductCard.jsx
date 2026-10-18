import React, { useState, useRef } from 'react';
import { ShieldCheck, Heart, ShoppingBag, Eye, Flame, AlertTriangle, ArrowRight } from 'lucide-react';
import { formatPrice } from '../data/storage';

export const ProductCard = ({
  product,
  currency,
  isFavorite,
  onToggleFavorite,
  onSelectProduct,
  onAddToCart,
  t
}) => {
  const isLowStock = product.stock <= 3 && product.stock > 0;
  const isOutOfStock = product.stock <= 0;

  // Kinetic 3D tilt & glare state
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0, glareX: 50, glareY: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = -((y - centerY) / centerY) * 6;
    const rotateY = ((x - centerX) / centerX) * 6;
    const glareX = (x / rect.width) * 100;
    const glareY = (y / rect.height) * 100;

    setTilt({ x: rotateX, y: rotateY, glareX, glareY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0, glareX: 50, glareY: 50 });
  };

  const categoryLabel = product.category === 'gold' 
    ? (t?.filterGold || 'TITANIUM ATELIER')
    : product.category.toUpperCase();

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="product-card magnetic-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '22px',
        position: 'relative',
        borderRadius: '24px',
        background: 'var(--card-bg, #111316)',
        border: isHovered 
          ? '1px solid var(--card-border-hover, #53606b)' 
          : '1px solid var(--card-border, #22262b)',
        boxShadow: isHovered 
          ? '0 20px 48px rgba(0, 0, 0, 0.4), 0 0 25px rgba(115, 196, 255, 0.12)' 
          : '0 8px 24px rgba(0, 0, 0, 0.22)',
        overflow: 'hidden',
        color: 'var(--text-primary, #edf0f3)',
        transform: isHovered 
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateY(-5px)` 
          : 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)',
        transition: isHovered 
          ? 'transform 0.1s ease-out, border-color 0.25s ease, box-shadow 0.25s ease' 
          : 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease'
      }}
    >
      {/* Dynamic Specular Glare Overlay */}
      {isHovered && (
        <div 
          style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            borderRadius: '24px',
            background: `radial-gradient(circle at ${tilt.glareX}% ${tilt.glareY}%, rgba(255, 255, 255, 0.12) 0%, rgba(115, 196, 255, 0.05) 35%, transparent 65%)`,
            zIndex: 10,
            mixBlendMode: 'screen'
          }}
        />
      )}

      {/* Top Header: Category Tag & Wishlist Button */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '14px',
        position: 'relative',
        zIndex: 2
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span style={{
            color: 'var(--accent-cyan, #73c4ff)',
            font: '600 11px "DM Mono", monospace',
            letterSpacing: '0.12em',
            textTransform: 'uppercase'
          }}>
            {categoryLabel}
          </span>

          {isLowStock && (
            <span style={{
              background: 'rgba(255, 59, 48, 0.14)',
              color: '#ff6961',
              border: '1px solid rgba(255, 59, 48, 0.3)',
              fontSize: '0.64rem',
              fontWeight: 700,
              padding: '2px 8px',
              borderRadius: '999px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              whiteSpace: 'nowrap',
              flexShrink: 0
            }}>
              <AlertTriangle size={10} />
              {t?.lowStock || 'Kam qoldi'}: {product.stock}
            </span>
          )}
        </div>

        {/* Wishlist Heart Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(product.id);
          }}
          title={isFavorite ? "Sevimlilardan o'chirish" : "Sevimlilarga qo'shish"}
          style={{
            background: 'var(--badge-bg, rgba(255, 255, 255, 0.06))',
            border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
            borderRadius: '50%',
            width: '34px',
            height: '34px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            zIndex: 12
          }}
        >
          <Heart 
            size={15} 
            color={isFavorite ? '#ff453a' : 'var(--text-secondary, #8e959d)'} 
            fill={isFavorite ? '#ff453a' : 'none'} 
          />
        </button>
      </div>

      {/* Kinetic Moving Device Visual (Clean Background Pedestal & Floating Animation) */}
      <div 
        onClick={() => onSelectProduct(product)}
        style={{
          position: 'relative',
          width: '100%',
          height: '270px',
          display: 'grid',
          placeItems: 'center',
          cursor: 'pointer',
          marginBottom: '16px',
          borderRadius: '20px',
          background: 'var(--card-pedestal, radial-gradient(ellipse at 50% 44%, #343a42 0%, #1d2126 37%, #141619 76%))',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
          overflow: 'hidden',
          perspective: '1000px',
          boxShadow: 'inset 0 1px 2px rgba(255, 255, 255, 0.08), 0 12px 30px rgba(0, 0, 0, 0.25)'
        }}
      >
        {/* Specular Diagonal Sheen */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(125deg, transparent 30%, rgba(255, 255, 255, 0.04) 50%, transparent 68%)',
          pointerEvents: 'none'
        }} />

        {/* Clean, Full-size, Centered Device (No white box background) */}
        <img
          src={product.image}
          alt={product.name}
          style={{
            maxHeight: '235px',
            maxWidth: '88%',
            objectFit: 'contain',
            transform: isHovered 
              ? 'rotate(-2deg) translateY(-8px) scale(1.08)' 
              : 'rotate(0deg) translateY(0) scale(1.0)',
            transition: 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), filter 0.45s ease',
            filter: isHovered 
              ? 'drop-shadow(18px 24px 35px rgba(0,0,0,0.6)) drop-shadow(0 0 16px rgba(115, 196, 255, 0.25))' 
              : 'drop-shadow(10px 16px 24px rgba(0,0,0,0.4))'
          }}
          className={!isHovered ? 'kinetic-floating-device' : ''}
        />
      </div>

      {/* Color Swatch Dots */}
      {product.colors && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: '7px', marginBottom: '12px' }}>
          {product.colors.map((c, i) => (
            <span
              key={i}
              style={{
                width: '11px',
                height: '11px',
                borderRadius: '50%',
                backgroundColor: c.hex,
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 1px 4px rgba(0,0,0,0.2)',
                display: 'inline-block'
              }}
              title={c.name}
            />
          ))}
        </div>
      )}

      {/* Product Details */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h3 
          onClick={() => onSelectProduct(product)}
          style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            lineHeight: 1.35,
            marginBottom: '8px',
            cursor: 'pointer',
            color: 'var(--text-primary, #edf0f3)',
            fontFamily: '"Space Grotesk", sans-serif',
            minHeight: '2.7rem'
          }}
        >
          {product.name}
        </h3>

        {/* Monthly Sold & Stock Indicator */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.74rem',
          marginBottom: '14px',
          padding: '7px 12px',
          background: 'var(--badge-bg, rgba(255, 255, 255, 0.04))',
          borderRadius: '12px',
          border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.06))',
          color: 'var(--text-secondary, #8e959d)'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Flame size={13} color="var(--accent-cyan, #73c4ff)" />
            <span>{product.monthlySold || 0} {t?.monthlySold || 'ta sotildi'}</span>
          </div>

          <div>
            {isOutOfStock ? (
              <span style={{ color: '#ff453a', fontWeight: 600 }}>{t?.outOfStock || 'Tugagan'}</span>
            ) : (
              <span style={{ color: 'var(--accent-cyan, #73c4ff)', fontWeight: 600 }}>
                {t?.inStock || 'Omborda'}: {product.stock}
              </span>
            )}
          </div>
        </div>

        {/* Price & Action Row */}
        <div style={{
          marginTop: 'auto',
          paddingTop: '14px',
          borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.1))',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '8px',
          position: 'relative',
          zIndex: 12
        }}>
          <div>
            <div style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--text-primary, #edf0f3)',
              fontFamily: '"DM Mono", monospace'
            }}>
              {formatPrice(product.priceUSD, currency)}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={() => onSelectProduct(product)}
              title={t?.viewDetails || 'Batafsil'}
              style={{
                background: 'var(--badge-bg, rgba(255, 255, 255, 0.08))',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.14))',
                color: 'var(--text-primary, #edf0f3)',
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <Eye size={15} />
            </button>

            <button
              onClick={() => onAddToCart(product)}
              disabled={isOutOfStock}
              style={{
                background: 'var(--accent-btn-bg, #73c4ff)',
                color: 'var(--accent-btn-text, #0b0c0e)',
                border: 'none',
                padding: '9px 18px',
                borderRadius: '999px',
                fontSize: '0.8rem',
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                opacity: isOutOfStock ? 0.45 : 1,
                boxShadow: '0 4px 16px rgba(115, 196, 255, 0.25)',
                transition: 'all 0.2s ease'
              }}
            >
              <ShoppingBag size={14} />
              <span>{t?.addToCart || 'Savatga'}</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
