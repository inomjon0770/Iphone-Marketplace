import React, { useState } from 'react';
import { 
  Crown, 
  Play, 
  ChevronLeft, 
  ChevronRight, 
  ArrowRight, 
  Sparkles, 
  Check, 
  ShieldCheck, 
  Camera, 
  Cpu, 
  Layers, 
  Award,
  ShoppingBag
} from 'lucide-react';
import { formatPrice } from '../data/storage';

export const Hero = ({ 
  onExploreGold, 
  onQuickOrderHero, 
  currency, 
  onSelectCategory,
  onOpenProductById 
}) => {
  const [activeHeroIndex, setActiveHeroIndex] = useState(0);
  const [activeDetailAngle, setActiveDetailAngle] = useState(0);

  // 3 Distinctive Flagship Models for the Top & Bottom Showcases
  const flagshipModels = [
    {
      id: 'gold-16-pm-falcon',
      title: 'iPhone 16 Pro Max',
      collection: 'SPACE TITANIUM EDITION',
      tagline: 'Qo\'lda sayqallangan Space Obsidian va aerokosmik titan.',
      priceUSD: 3499,
      heroImage: '/products/iphone_16_pro_black.png',
      badge: 'TITANIUM ATELIER'
    },
    {
      id: 'iphone-16-pm-official',
      title: 'iPhone 16 Pro Max',
      collection: 'DESERT TITANIUM',
      tagline: '5-darajali aerokosmik titan, 6.9" ProMotion va A18 Pro.',
      priceUSD: 1450,
      heroImage: '/products/iphone_16_pro_natural.png',
      badge: 'RASMIY APPLE'
    },
    {
      id: 'watch-ultra-gold',
      title: 'Apple Watch Ultra 2',
      collection: 'TITANIUM ATELIER EDITION',
      tagline: 'DLC qora titan korpus, qora tasma va 3000 nits safir.',
      priceUSD: 1650,
      heroImage: '/products/watch_ultra_2.png',
      badge: 'TITANIUM WATCH'
    }
  ];

  // 4 Detail Angles for the Right Sidebar (just like in the reference image)
  const detailAngles = [
    {
      title: 'Camera Control & 48MP',
      desc: 'Yangi sensor tugmasi va 48MP Fusion optikasi',
      image: '/iphone_pro_camera_macro.jpg'
    },
    {
      title: 'Space Titanium Bezel',
      desc: 'Galvanik qora titan va metall sayqali',
      image: '/products/iphone_16_pro_black.png'
    },
    {
      title: 'Super Retina XDR',
      desc: 'ProMotion 120Hz doimiy yoniq displey',
      image: '/products/iphone_16_pro_front.png'
    },
    {
      title: 'Titanium Back & MagSafe',
      desc: 'Neodimiy magnet va mat titan shisha',
      image: '/products/iphone_16_pro_back.png'
    }
  ];

  const currentHero = flagshipModels[activeHeroIndex];

  const handleNextHero = () => {
    setActiveHeroIndex((prev) => (prev + 1) % flagshipModels.length);
  };

  const handlePrevHero = () => {
    setActiveHeroIndex((prev) => (prev - 1 + flagshipModels.length) % flagshipModels.length);
  };

  return (
    <div style={{ background: '#f5f5f7', color: '#1d1d1f', paddingTop: '20px' }}>
      
      {/* ================= 1. APPLE FLAGSHIP HERO SHOWCASE (Reference Image Top) ================= */}
      <section style={{
        position: 'relative',
        background: '#ffffff',
        borderBottom: '1px solid #e5e5ea',
        padding: '30px 0 50px 0',
        overflow: 'hidden'
      }}>
        <div className="app-container">
          
          {/* Main Stage Grid: Center Product & Right Detail Angles */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            alignItems: 'center',
            position: 'relative',
            minHeight: '480px'
          }} className="hero-stage-grid">
            
            {/* Left Prev Arrow Button */}
            <button
              onClick={handlePrevHero}
              title="Oldingi model"
              style={{
                position: 'absolute',
                left: '-10px',
                top: '45%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #d2d2d7',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
              }}
            >
              <ChevronLeft size={22} color="#1d1d1f" />
            </button>

            {/* CENTER: Giant Floating Apple Product */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              padding: '10px 0'
            }}>
              {/* Product Badge */}
              <div style={{ marginBottom: '8px' }}>
                <span className="gold-badge" style={{ fontSize: '0.72rem', padding: '4px 14px' }}>
                  <Crown size={13} />
                  {currentHero.badge}
                </span>
              </div>

              <h1 style={{
                fontSize: 'clamp(2.4rem, 4.5vw, 3.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.1,
                color: '#1d1d1f',
                marginBottom: '4px'
              }}>
                {currentHero.title}
              </h1>

              <div style={{
                fontSize: '1rem',
                fontWeight: 700,
                letterSpacing: '0.08em',
                color: '#1d1d1f',
                textTransform: 'uppercase',
                marginBottom: '14px'
              }}>
                {currentHero.collection}
              </div>

              {/* Floating Product Image with Realistic Ground Shadow */}
              <div 
                onClick={() => onOpenProductById(currentHero.id)}
                style={{
                  position: 'relative',
                  width: '100%',
                  maxWidth: '560px',
                  height: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  margin: '10px 0 20px 0'
                }}
              >
                <img
                  src={currentHero.heroImage}
                  alt={currentHero.title}
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 25px 35px rgba(0, 0, 0, 0.18))',
                    transition: 'transform 0.4s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.04)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              {/* Action Links (Watch The Film & Keynote style from image) */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '24px',
                fontSize: '0.86rem',
                fontWeight: 600,
                color: 'var(--apple-blue)',
                marginBottom: '18px',
                flexWrap: 'wrap',
                justifyContent: 'center'
              }}>
                <button
                  onClick={() => onOpenProductById(currentHero.id)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--apple-blue)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontWeight: 600,
                    fontSize: '0.88rem'
                  }}
                >
                  <Play size={14} fill="var(--apple-blue)" />
                  <span>Taqdimotni Ko'rish</span>
                </button>

                <button
                  onClick={() => onQuickOrderHero()}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--apple-blue)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontWeight: 600,
                    fontSize: '0.88rem'
                  }}
                >
                  <span>Hoziroq Buyurtma</span>
                  <ArrowRight size={14} />
                </button>

                <span style={{ color: '#1d1d1f', fontWeight: 800, fontSize: '1.05rem', marginLeft: '10px' }}>
                  {formatPrice(currentHero.priceUSD, currency)}
                </span>
              </div>

              {/* Carousel Pagination Dots (• • • from reference image) */}
              <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                {flagshipModels.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveHeroIndex(i)}
                    style={{
                      width: activeHeroIndex === i ? '24px' : '8px',
                      height: '8px',
                      borderRadius: '4px',
                      background: activeHeroIndex === i ? '#1d1d1f' : '#d2d2d7',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.25s ease'
                    }}
                  />
                ))}
              </div>

            </div>

            {/* Right Next Arrow Button */}
            <button
              onClick={handleNextHero}
              title="Keyingi model"
              style={{
                position: 'absolute',
                right: '250px',
                top: '45%',
                transform: 'translateY(-50%)',
                background: 'rgba(255, 255, 255, 0.9)',
                border: '1px solid #d2d2d7',
                borderRadius: '50%',
                width: '42px',
                height: '42px',
                display: 'none',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                zIndex: 20,
                boxShadow: '0 2px 10px rgba(0, 0, 0, 0.08)'
              }}
              className="hero-next-arrow"
            >
              <ChevronRight size={22} color="#1d1d1f" />
            </button>

            {/* RIGHT SIDEBAR: Vertical Detail Angle Thumbnails (Exact Layout from Image) */}
            <div style={{
              display: 'none',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '220px',
              marginLeft: 'auto'
            }} className="hero-angle-sidebar">
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '0.74rem',
                fontWeight: 700,
                color: '#86868b',
                letterSpacing: '0.06em',
                marginBottom: '4px'
              }}>
                <span>EXPLORE DETAILS</span>
                <span style={{ color: 'var(--apple-blue)', cursor: 'pointer' }}>4 RAQURS</span>
              </div>

              {detailAngles.map((ang, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveDetailAngle(idx)}
                  style={{
                    background: activeDetailAngle === idx ? '#f5f5f7' : '#ffffff',
                    border: activeDetailAngle === idx ? '2px solid var(--apple-blue)' : '1px solid #e5e5ea',
                    borderRadius: '14px',
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    cursor: 'pointer',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <img
                    src={ang.image}
                    alt={ang.title}
                    style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                  />
                  <div>
                    <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#1d1d1f', lineHeight: 1.2 }}>
                      {ang.title}
                    </div>
                    <div style={{ fontSize: '0.66rem', color: '#86868b', marginTop: '2px' }}>
                      {ang.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </section>


      {/* ================= 2. LEARN ABOUT BENTO GRID (Reference Image Middle Section) ================= */}
      <section style={{
        padding: '60px 0 70px 0',
        background: '#f5f5f7'
      }}>
        <div className="app-container">
          
          {/* Section Header */}
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{
              fontSize: '1.15rem',
              fontWeight: 800,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#1d1d1f'
            }}>
              <b>LEARN</b> ABOUT iLUX ATELIER & APPLE
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#86868b', marginTop: '4px' }}>
              Mukammal titan muhandisligi, qora obsidian va yuqori darajadagi xavfsizlik
            </p>
          </div>

          {/* 6-Card Grid (Exact Reproduction of the 6 Cards in the Image) */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}>
            {/* Card 1: OVERVIEW */}
            <div 
              onClick={() => onSelectCategory('all')}
              className="apple-card"
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '170px'
              }}
            >
              <img
                src="/products/iphone_16_pro_natural.png"
                alt="Overview"
                style={{ width: '110px', height: '110px', objectFit: 'contain' }}
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1d1d1f' }}>
                  OVERVIEW
                </span>
                <p style={{ fontSize: '0.74rem', color: '#86868b', marginTop: '4px', maxWidth: '140px' }}>
                  Barcha modellar va flagman seriyalar
                </p>
              </div>
            </div>

            {/* Card 2: DESIGN */}
            <div 
              onClick={() => onSelectCategory('gold')}
              className="apple-card"
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '170px'
              }}
            >
              <img
                src="/products/iphone_16_pro_black.png"
                alt="Design"
                style={{ width: '110px', height: '110px', objectFit: 'contain' }}
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1d1d1f' }}>
                  DESIGN
                </span>
                <p style={{ fontSize: '0.74rem', color: '#86868b', marginTop: '4px', maxWidth: '140px' }}>
                  Sayqallangan titan va zarb qilingan kompozit karkas
                </p>
              </div>
            </div>

            {/* Card 3: FEATURES */}
            <div 
              onClick={() => onSelectCategory('iphone')}
              className="apple-card"
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '170px'
              }}
            >
              <img
                src="/products/iphone_16_pro_front.png"
                alt="Features"
                style={{ width: '130px', height: '130px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))' }}
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1d1d1f' }}>
                  FEATURES
                </span>
                <p style={{ fontSize: '0.74rem', color: '#86868b', marginTop: '4px', maxWidth: '140px' }}>
                  Dynamic Island & Apple Intelligence
                </p>
              </div>
            </div>

            {/* Card 4: TECHNOLOGY */}
            <div 
              onClick={() => onSelectCategory('watch')}
              className="apple-card"
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '170px'
              }}
            >
              <img
                src="/products/watch_ultra_2.png"
                alt="Technology"
                style={{ width: '110px', height: '110px', objectFit: 'contain' }}
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1d1d1f' }}>
                  TECHNOLOGY
                </span>
                <p style={{ fontSize: '0.74rem', color: '#86868b', marginTop: '4px', maxWidth: '140px' }}>
                  A18 Pro 3nm & S9 SiP Sensorlar
                </p>
              </div>
            </div>

            {/* Card 5: GALLERY */}
            <div 
              onClick={() => onSelectCategory('gold')}
              className="apple-card"
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '170px'
              }}
            >
              <img
                src="/products/airpods_max_spacegray.png"
                alt="Gallery"
                style={{ width: '130px', height: '130px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))' }}
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1d1d1f' }}>
                  GALLERY
                </span>
                <p style={{ fontSize: '0.74rem', color: '#86868b', marginTop: '4px', maxWidth: '140px' }}>
                  Eksklyuziv burchaklar va fotogalereya
                </p>
              </div>
            </div>

            {/* Card 6: FILMS & CRAFT */}
            <div 
              onClick={() => onSelectCategory('accessories')}
              className="apple-card"
              style={{
                background: '#ffffff',
                padding: '24px',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                cursor: 'pointer',
                minHeight: '170px'
              }}
            >
              <img
                src="/products/iphone_case.png"
                alt="Craft"
                style={{ width: '130px', height: '130px', objectFit: 'contain', filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.12))' }}
              />
              <div style={{ textAlign: 'right' }}>
                <span style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', color: '#1d1d1f' }}>
                  ATELIER CRAFT
                </span>
                <p style={{ fontSize: '0.74rem', color: '#86868b', marginTop: '4px', maxWidth: '140px' }}>
                  Zargarlik va Italiya Nappa charmi
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>


      {/* ================= 3. THREE DISTINCTIVE COLLECTIONS (Reference Image Bottom Section) ================= */}
      <section style={{
        padding: '70px 0 80px 0',
        background: '#ffffff',
        borderTop: '1px solid #e5e5ea',
        borderBottom: '1px solid #e5e5ea'
      }}>
        <div className="app-container">
          
          {/* Section Title: FIND YOUR STYLE IN THREE DISTINCTIVE COLLECTIONS */}
          <div style={{ textAlign: 'center', marginBottom: '50px' }}>
            <h2 style={{
              fontSize: '1.4rem',
              fontWeight: 800,
              letterSpacing: '0.08em',
              color: '#1d1d1f',
              textTransform: 'uppercase'
            }}>
              <b>FIND YOUR STYLE</b> IN THREE DISTINCTIVE COLLECTIONS
            </h2>
            <p style={{ fontSize: '0.84rem', color: '#86868b', marginTop: '6px' }}>
              O'zingizga mos bo'lgan uslubni tanlang: Rasmiy, Sport yoki Oltin Atelier
            </p>
          </div>

          {/* 3 Large Showcase Columns */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '30px',
            alignItems: 'end'
          }}>
            
            {/* Collection 1: iPHONE 16 */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '16px' }}>
                iPHONE 16
              </div>

              <div 
                onClick={() => onSelectCategory('iphone')}
                style={{
                  width: '240px',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                <img
                  src="/products/iphone_16_base.png"
                  alt="iPhone 16"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.12))',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <button
                onClick={() => onSelectCategory('iphone')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--apple-blue)',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>EXPLORE</span>
                <ArrowRight size={13} />
              </button>
            </div>

            {/* Collection 2: iPHONE 16 PRO (Center Flagship) */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '16px' }}>
                iPHONE <b>PRO</b>
              </div>

              <div 
                onClick={() => onSelectCategory('iphone')}
                style={{
                  width: '280px',
                  height: '320px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                <img
                  src="/products/iphone_16_pro_black.png"
                  alt="iPhone 16 Pro"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 25px 40px rgba(0,0,0,0.18))',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <button
                onClick={() => onSelectCategory('iphone')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--apple-blue)',
                  fontWeight: 700,
                  fontSize: '0.86rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>EXPLORE</span>
                <ArrowRight size={14} />
              </button>
            </div>

            {/* Collection 3: TITANIUM ATELIER */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center'
            }}>
              <div style={{ fontSize: '1.1rem', fontWeight: 800, letterSpacing: '0.08em', marginBottom: '16px', color: '#1d1d1f' }}>
                TITANIUM <b>ATELIER</b>
              </div>

              <div 
                onClick={() => onSelectCategory('gold')}
                style={{
                  width: '240px',
                  height: '280px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  marginBottom: '16px'
                }}
              >
                <img
                  src="/products/iphone_16_pro_natural.png"
                  alt="Titanium Atelier"
                  style={{
                    maxHeight: '100%',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.12))',
                    transition: 'transform 0.3s ease'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>

              <button
                onClick={() => onSelectCategory('gold')}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1d1d1f',
                  fontWeight: 700,
                  fontSize: '0.82rem',
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span>EXPLORE</span>
                <ArrowRight size={13} />
              </button>
            </div>

          </div>

          {/* Official Store Footer Note (like in the image) */}
          <div style={{
            textAlign: 'center',
            marginTop: '60px',
            paddingTop: '24px',
            borderTop: '1px solid #e5e5ea',
            fontSize: '0.78rem',
            color: '#86868b',
            lineHeight: 1.6
          }}>
            <div>
              Shop the Apple Online Store (<b>+998 71 200-77-00</b>), visit an <b>Apple Retail Store</b> in Tashkent, or find an official atelier reseller.
            </div>
            <div style={{ fontSize: '0.72rem', marginTop: '4px' }}>
              Barcha Titanium Atelier modellar rasmiy zargarlik pasporti va 2 yillik VIP kafolat bilan ta'minlanadi.
            </div>
          </div>

        </div>
      </section>

      <style>{`
        @media (min-width: 900px) {
          .hero-stage-grid {
            grid-template-columns: 1fr 240px !important;
          }
          .hero-angle-sidebar {
            display: flex !important;
          }
          .hero-next-arrow {
            display: flex !important;
          }
        }
      `}</style>
    </div>
  );
};

