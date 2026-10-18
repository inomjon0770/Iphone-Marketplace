import React, { useState } from 'react';
import { 
  Shield, 
  Sparkles, 
  ShoppingBag, 
  Zap, 
  ShieldCheck, 
  Award, 
  Layers, 
  RotateCw, 
  Eye, 
  Check, 
  SlidersHorizontal 
} from 'lucide-react';
import { formatPrice } from '../data/storage';

const ANGLES = [
  {
    id: 'back',
    name: 'Titanium Orqa Panel',
    subtitle: 'Space Obsidian & Maxsus Gerb',
    image: '/products/iphone_16_pro_back.png'
  },
  {
    id: 'front',
    name: 'Old Ekran & Orol',
    subtitle: '6.9" Super Retina XDR OLED',
    image: '/products/iphone_16_pro_front.png'
  },
  {
    id: 'black',
    name: 'Black Titanium',
    subtitle: 'Space Obsidian Sayqali',
    image: '/products/iphone_16_pro_black.png'
  },
  {
    id: 'natural',
    name: 'Natural Titanium',
    subtitle: '5-darajali Aerokosmik Titan',
    image: '/products/iphone_16_pro_natural.png'
  },
  {
    id: 'white',
    name: 'White Titanium',
    subtitle: 'Sof Platina Oq Keramika',
    image: '/products/iphone_16_pro_white.png'
  }
];

const FINISHES = [
  {
    id: 'black-titanium',
    name: 'Black Titanium',
    badge: 'Space Obsidian',
    hex: '#1C1C1E',
    image: '/products/iphone_16_pro_black.png',
    accentColor: '#3A3A3C',
    priceDelta: 0
  },
  {
    id: 'natural-titanium',
    name: 'Natural Titanium',
    badge: 'Raw Metal Pro',
    hex: '#8E8E93',
    image: '/products/iphone_16_pro_natural.png',
    accentColor: '#8E8E93',
    priceDelta: -50
  },
  {
    id: 'white-titanium',
    name: 'White Titanium',
    badge: 'Pure Ceramic',
    hex: '#F5F5F7',
    image: '/products/iphone_16_pro_white.png',
    accentColor: '#D2D2D7',
    priceDelta: 50
  },
  {
    id: 'graphite-matrix',
    name: 'Graphite Matrix',
    badge: 'Forged Titanium',
    hex: '#3A3A3C',
    image: '/products/iphone_16_pro_desert.png',
    accentColor: '#1D1D1F',
    priceDelta: 120
  }
];

const STORAGE_TIERS = [
  { size: '256GB', priceUSD: 3199 },
  { size: '512GB', priceUSD: 3499, popular: true },
  { size: '1TB', priceUSD: 3899 },
  { size: '2TB', priceUSD: 4399, max: true }
];

export const InteractiveProductStudio = ({
  currency,
  onAddToCart,
  onFastBuy
}) => {
  const [activeAngle, setActiveAngle] = useState(ANGLES[0]);
  const [activeFinish, setActiveFinish] = useState(FINISHES[0]);
  const [selectedStorage, setSelectedStorage] = useState(STORAGE_TIERS[1]);
  const [engravingText, setEngravingText] = useState('iLux Titanium Falcon');
  const [isRotating, setIsRotating] = useState(false);

  // Calculate dynamic price
  const basePriceUSD = selectedStorage.priceUSD + activeFinish.priceDelta;

  const currentProductData = {
    id: `titanium-16-pm-custom-${activeFinish.id}-${selectedStorage.size}`,
    name: `iPhone 16 Pro Max ${activeFinish.name} (${selectedStorage.size})`,
    category: 'gold',
    badge: 'TITANIUM ATELIER STUDIO',
    isGold: true,
    goldKarat: activeFinish.name,
    priceUSD: basePriceUSD,
    priceUZS: basePriceUSD * 13000,
    costUSD: basePriceUSD - 700,
    costUZS: (basePriceUSD - 700) * 13000,
    stock: 4,
    monthlySold: 32,
    selectedStorage: selectedStorage.size,
    image: activeAngle.image,
    description: `Maxsus buyurtma asosida tayyorlanadigan qora va titan korpusli iPhone 16 Pro Max. Qoplama: ${activeFinish.name}, Xotira: ${selectedStorage.size}, Shaxsiy lazer gravirovkasi: "${engravingText}".`,
    specs: {
      finish: activeFinish.name,
      storage: selectedStorage.size,
      engraving: engravingText || 'Standart Apple Gerbi',
      warranty: '2 Yillik Rasmiy VIP Xalqaro Kafolat'
    }
  };

  const handleNextAngle = () => {
    setIsRotating(true);
    const currentIndex = ANGLES.findIndex(a => a.id === activeAngle.id);
    const nextIndex = (currentIndex + 1) % ANGLES.length;
    setActiveAngle(ANGLES[nextIndex]);
    setTimeout(() => setIsRotating(false), 300);
  };

  return (
    <section 
      id="product-studio-section"
      style={{
        padding: '50px 0',
        background: 'linear-gradient(180deg, #fbfbfd 0%, #ffffff 50%, #f5f5f7 100%)',
        borderTop: '1px solid #e5e5ea',
        borderBottom: '1px solid #e5e5ea'
      }}
    >
      <div className="app-container">
        
        {/* Section Header */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span className="gold-badge" style={{ fontSize: '0.72rem', padding: '4px 14px' }}>
              <Shield size={13} />
              PINTEREST INSPIRED • 360° TITANIUM ATELIER STUDIO
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(1.9rem, 3.8vw, 2.7rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: '#1d1d1f',
            lineHeight: 1.15,
            marginBottom: '14px'
          }}>
            O'zingizning Titanium & Obsidian iPhone 16 Pro Max <br />
            <span className="gold-gradient-text">Eksklyuziv Dizaynini Yarating</span>
          </h2>

          <p style={{ fontSize: '1rem', color: '#86868b', lineHeight: 1.5 }}>
            Barcha burchaklarni 360° rejimida ko'ring, titan va platina qoplamalarini almashtiring 
            hamda korpusga o'z ismingizni bepul lazerda o'yib yozdiring.
          </p>
        </div>

        {/* Studio Grid: 3D Stage on Left, Atelier Controls on Right */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'center'
        }}>
          
          {/* Left: Interactive 360° Multi-Angle Viewing Stage */}
          <div 
            className="apple-card"
            style={{
              padding: '30px 24px',
              borderRadius: '28px',
              background: '#ffffff',
              border: '1px solid #d2d2d7',
              boxShadow: '0 16px 40px rgba(0,0,0,0.06)',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center'
            }}
          >
            {/* Top Angle Navigation Pills */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px',
              justifyContent: 'center',
              width: '100%',
              marginBottom: '20px'
            }}>
              {ANGLES.map((angle) => (
                <button
                  key={angle.id}
                  onClick={() => setActiveAngle(angle)}
                  style={{
                    padding: '8px 14px',
                    borderRadius: 'var(--radius-full)',
                    fontSize: '0.76rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    background: activeAngle.id === angle.id ? '#1d1d1f' : '#f5f5f7',
                    color: activeAngle.id === angle.id ? '#ffffff' : '#515154',
                    border: activeAngle.id === angle.id ? '1px solid #1d1d1f' : '1px solid #e5e5ea'
                  }}
                >
                  {angle.name}
                </button>
              ))}
            </div>

            {/* Central Interactive Display Canvas */}
            <div 
              style={{
                position: 'relative',
                width: '100%',
                height: '380px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                borderRadius: '20px',
                background: 'radial-gradient(circle at center, rgba(0, 0, 0, 0.03) 0%, rgba(245, 245, 247, 0.7) 70%, #ffffff 100%)'
              }}
            >
              {/* Neutral Monochrome Backlight */}
              <div 
                style={{
                  position: 'absolute',
                  width: '280px',
                  height: '280px',
                  borderRadius: '50%',
                  background: 'radial-gradient(circle, rgba(0,0,0,0.08) 0%, transparent 70%)',
                  pointerEvents: 'none',
                  filter: 'blur(30px)'
                }} 
              />

              {/* Main Product Render */}
              <img
                src={activeAngle.image}
                alt={activeAngle.name}
                style={{
                  maxHeight: '340px',
                  maxWidth: '90%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.12))',
                  transition: 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease',
                  transform: isRotating ? 'scale(0.94) rotate(4deg)' : 'scale(1) rotate(0deg)'
                }}
              />

              {/* Floating 360° Rotate Action Button */}
              <button
                onClick={handleNextAngle}
                title="Burchakni aylantirish"
                style={{
                  position: 'absolute',
                  bottom: '16px',
                  right: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  background: 'rgba(255, 255, 255, 0.94)',
                  backdropFilter: 'blur(8px)',
                  border: '1px solid #d2d2d7',
                  boxShadow: '0 4px 14px rgba(0,0,0,0.08)',
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  color: '#1d1d1f',
                  cursor: 'pointer'
                }}
              >
                <RotateCw size={13} />
                <span>Burchakni almashtirish</span>
              </button>

              {/* Engraving Tag on Device */}
              {engravingText && (
                <div style={{
                  position: 'absolute',
                  bottom: '16px',
                  left: '16px',
                  background: 'rgba(0, 0, 0, 0.85)',
                  color: '#ffffff',
                  backdropFilter: 'blur(8px)',
                  padding: '4px 12px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  border: '1px solid #3a3a3c'
                }}>
                  Lazer: "{engravingText}"
                </div>
              )}
            </div>

            {/* Bottom Current View Info */}
            <div style={{
              marginTop: '16px',
              textAlign: 'center',
              width: '100%'
            }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1d1d1f' }}>
                {activeAngle.name}
              </div>
              <div style={{ fontSize: '0.78rem', color: '#86868b' }}>
                {activeAngle.subtitle}
              </div>
            </div>

          </div>

          {/* Right: Atelier Customizer Controls */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* 1. Finishes / Metall Qoplamasi */}
            <div className="apple-card" style={{ padding: '20px', borderRadius: '22px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '14px' 
              }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1d1d1f' }}>
                  1. Titan va Rang Turi
                </span>
                <span style={{ fontSize: '0.76rem', color: '#1d1d1f', fontWeight: 700 }}>
                  {activeFinish.name} ({activeFinish.badge})
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                {FINISHES.map((finish) => {
                  const isSel = activeFinish.id === finish.id;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setActiveFinish(finish)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        padding: '10px 12px',
                        borderRadius: '14px',
                        background: isSel ? '#ffffff' : '#f5f5f7',
                        border: isSel ? `2px solid ${finish.accentColor}` : '1px solid #e5e5ea',
                        boxShadow: isSel ? '0 4px 14px rgba(0,0,0,0.08)' : 'none',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <span style={{
                        width: '20px',
                        height: '20px',
                        borderRadius: '50%',
                        backgroundColor: finish.hex,
                        border: '2px solid #ffffff',
                        boxShadow: '0 0 0 1px #86868b',
                        flexShrink: 0
                      }} />
                      <div style={{ overflow: 'hidden' }}>
                        <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>
                          {finish.name}
                        </div>
                        <div style={{ fontSize: '0.68rem', color: '#86868b' }}>
                          {finish.badge}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 2. Storage Tiers */}
            <div className="apple-card" style={{ padding: '20px', borderRadius: '22px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '14px' 
              }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1d1d1f' }}>
                  2. Xotira Hajmini Tanlang
                </span>
                <span style={{ fontSize: '0.76rem', color: '#86868b' }}>
                  NVMe Super Tezkor
                </span>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
                {STORAGE_TIERS.map((tier) => {
                  const isSel = selectedStorage.size === tier.size;
                  return (
                    <button
                      key={tier.size}
                      onClick={() => setSelectedStorage(tier)}
                      style={{
                        padding: '12px 6px',
                        borderRadius: '14px',
                        textAlign: 'center',
                        background: isSel ? '#1d1d1f' : '#f5f5f7',
                        color: isSel ? '#ffffff' : '#1d1d1f',
                        border: isSel ? '1px solid #1d1d1f' : '1px solid #e5e5ea',
                        cursor: 'pointer',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <div style={{ fontSize: '0.88rem', fontWeight: 800 }}>{tier.size}</div>
                      <div style={{ fontSize: '0.66rem', opacity: 0.8, marginTop: '2px' }}>
                        {formatPrice(tier.priceUSD, currency)}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* 3. Laser Engraving Input */}
            <div className="apple-card" style={{ padding: '20px', borderRadius: '22px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                marginBottom: '10px' 
              }}>
                <span style={{ fontSize: '0.86rem', fontWeight: 700, color: '#1d1d1f' }}>
                  3. Shaxsiy Lazer Gravirovkasi (BEPUL)
                </span>
                <span style={{ fontSize: '0.68rem', background: '#f5f5f7', color: '#1d1d1f', border: '1px solid #d2d2d7', padding: '2px 8px', borderRadius: 'var(--radius-full)', fontWeight: 700 }}>
                  VIP Xizmat
                </span>
              </div>

              <input
                type="text"
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value.slice(0, 26))}
                placeholder="Ismingiz yoki maxsus shiorni kiriting..."
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid #d2d2d7',
                  fontSize: '0.86rem',
                  outline: 'none',
                  background: '#fbfbfd'
                }}
              />
              <div style={{ fontSize: '0.68rem', color: '#86868b', marginTop: '6px' }}>
                Titan korpusning pastki qismiga o'yib yoziladi (maksimal 26 belgi)
              </div>
            </div>

            {/* 4. Total Price & Buy Triggers */}
            <div style={{
              background: '#ffffff',
              padding: '22px',
              borderRadius: '24px',
              border: '1px solid #1d1d1f',
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: '#86868b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                    YAKUNIY MAXSUS NARX
                  </span>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: '#1d1d1f'
                  }}>
                    {formatPrice(basePriceUSD, currency)}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    background: '#f5f5f7',
                    color: '#1d1d1f',
                    border: '1px solid #d2d2d7',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}>
                    Omborda: 4 ta mavjud
                  </span>
                  <div style={{ fontSize: '0.72rem', color: '#86868b', marginTop: '4px' }}>
                    Yetkazish: 24 soat (Toshkent / Butun O'zbekiston)
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onFastBuy(currentProductData)}
                  className="btn-apple btn-apple-gold"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    fontSize: '0.9rem',
                    fontWeight: 700
                  }}
                >
                  <Zap size={16} />
                  <span>Tezkor 1-Click Buyurtma</span>
                </button>

                <button
                  onClick={() => onAddToCart(currentProductData)}
                  className="btn-apple btn-apple-subtle"
                  style={{
                    padding: '12px 18px',
                    fontSize: '0.9rem'
                  }}
                >
                  <ShoppingBag size={16} />
                  <span>Savatga</span>
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
