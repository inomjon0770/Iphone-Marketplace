import React, { useState, useEffect, useRef } from 'react';
import { 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  Sparkles, 
  Radio, 
  ShoppingBag, 
  Zap, 
  Sliders, 
  Disc, 
  RotateCw, 
  ShieldCheck, 
  Check 
} from 'lucide-react';
import { formatPrice } from '../data/storage';

export const AcousticStudio = ({
  currency,
  onAddToCart,
  onFastBuy
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(72);
  const [soundMode, setSoundMode] = useState('atmos');
  const [rotationAngle, setRotationAngle] = useState(130);
  const audioCtxRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  // Web Audio Harmonic Chime for interactive sound experience
  const toggleSound = () => {
    try {
      if (!isPlaying) {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!audioCtxRef.current) {
          audioCtxRef.current = new AudioContext();
        }
        if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
        }

        // Create warm harmonic chord (A4 432Hz + E5 + A5)
        const osc = audioCtxRef.current.createOscillator();
        const gain = audioCtxRef.current.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(432, audioCtxRef.current.currentTime);
        
        const gainVal = (volume / 100) * 0.08;
        gain.gain.setValueAtTime(gainVal, audioCtxRef.current.currentTime);

        osc.connect(gain);
        gain.connect(audioCtxRef.current.destination);
        osc.start();

        oscillatorRef.current = osc;
        gainNodeRef.current = gain;
        setIsPlaying(true);
      } else {
        if (oscillatorRef.current) {
          oscillatorRef.current.stop();
          oscillatorRef.current.disconnect();
          oscillatorRef.current = null;
        }
        setIsPlaying(false);
      }
    } catch (e) {
      // Fallback if browser audio policy blocks
      setIsPlaying(!isPlaying);
    }
  };

  // Adjust volume
  const handleVolumeChange = (newVol) => {
    const clamped = Math.max(0, Math.min(100, newVol));
    setVolume(clamped);
    setRotationAngle((clamped / 100) * 270);
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.setValueAtTime((clamped / 100) * 0.08, audioCtxRef.current.currentTime);
    }
  };

  useEffect(() => {
    return () => {
      if (oscillatorRef.current) {
        try {
          oscillatorRef.current.stop();
        } catch (e) {}
      }
      if (audioCtxRef.current) {
        try {
          audioCtxRef.current.close();
        } catch (e) {}
      }
    };
  }, []);

  const bAndOProduct = {
    id: 'audio-beosound-gold',
    name: 'Bang & Olufsen × iLux BeoSound 2 Atelier Edition Titanium',
    category: 'accessories',
    badge: 'BANG & OLUFSEN × TITANIUM',
    isGold: true,
    goldKarat: 'Space Gray & Natural Titanium Brass',
    priceUSD: 3650,
    priceUZS: 47450000,
    costUSD: 2800,
    costUZS: 36400000,
    stock: 5,
    monthlySold: 19,
    selectedStorage: '360° Spherical Sound & AirPlay 2',
    image: '/products/beosound_speaker.png',
    description: 'Bang & Olufsen va iLux Atelier hamkorligidagi konussimon akustik asar. Titandan ishlangan korpus, 360 darajali tarqaluvchi akustik linza, o\'rnatilgan sensorli aylanma ovoz diski va Apple AirPlay 2 qo\'llab-quvvatlovi.'
  };

  const soundModes = [
    { id: 'atmos', name: 'Spatial Audio 360°', desc: 'Dolby Atmos immersiv fazoviy ovoz' },
    { id: 'master', name: 'Studio Master 96kHz', desc: '24-bit Lossless studiya sifati' },
    { id: 'chamber', name: 'Titanium Chamber', desc: 'Titan korpus akustik rezonansi' }
  ];

  return (
    <section 
      id="acoustic-studio-section"
      style={{
        padding: '70px 0',
        background: 'var(--bg-primary, #0b0c0e)',
        borderBottom: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
        position: 'relative',
        transition: 'background 0.25s ease'
      }}
    >
      <div className="app-container">
        
        {/* Top Header Tag */}
        <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <span style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '0.74rem',
              fontWeight: 700,
              padding: '5px 16px',
              borderRadius: '999px',
              background: 'var(--badge-bg, rgba(255, 255, 255, 0.05))',
              border: '1px solid var(--badge-border, rgba(255, 255, 255, 0.12))',
              color: 'var(--accent-cyan, #73c4ff)',
              letterSpacing: '0.06em'
            }}>
              <Radio size={13} />
              BANG & OLUFSEN × iLUX TITANIUM COLLABORATION
            </span>
          </div>

          <h2 style={{
            fontSize: 'clamp(2rem, 3.8vw, 2.8rem)',
            fontWeight: 800,
            letterSpacing: '-0.025em',
            color: 'var(--text-primary, #edf0f3)',
            lineHeight: 1.15,
            marginBottom: '14px'
          }}>
            Akustik Mukammallik: <br />
            <span style={{ color: 'var(--accent-cyan, #73c4ff)' }}>BeoSound 2 • Space Titanium Nashri</span>
          </h2>

          <p style={{ fontSize: '1rem', color: 'var(--text-secondary, #8e949b)', lineHeight: 1.5 }}>
            Daniya afsonaviy akustik muhandisligi va tabiiy titan korpus. Yuqori aylanma disk orqali 
            ovozni jonli boshqaring va 360° fazoviy tarqalishni his eting.
          </p>
        </div>

        {/* Acoustic Main Stage Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '36px',
          alignItems: 'center'
        }}>
          
          {/* Left: Luxury Speaker Visual & Live Soundwave Spectrum */}
          <div 
            style={{
              padding: '36px 24px',
              borderRadius: '28px',
              background: 'var(--bg-card, #111316)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              boxShadow: 'var(--shadow-card, 0 16px 40px rgba(0, 0, 0, 0.25))',
              position: 'relative',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              overflow: 'hidden'
            }}
          >
            {/* Top Acoustic Mode Pill */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '5px 14px',
              borderRadius: 'var(--radius-full)',
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
              fontSize: '0.72rem',
              fontWeight: 700,
              color: 'var(--accent-cyan, #73c4ff)',
              marginBottom: '16px'
            }}>
              <Disc size={13} />
              <span>Acoustic Lens Technology • 360° Sound Stage</span>
            </div>

            {/* Central Speaker Showcase */}
            <div style={{
              position: 'relative',
              width: '100%',
              height: '340px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {/* Animated Acoustic Halo Waves (Monochrome) */}
              {isPlaying && (
                <>
                  <div style={{
                    position: 'absolute',
                    width: '320px',
                    height: '320px',
                    borderRadius: '50%',
                    border: '2px solid rgba(0, 0, 0, 0.15)',
                    animation: 'soundwaveAnim 1.6s infinite ease-out',
                    pointerEvents: 'none'
                  }} />
                  <div style={{
                    position: 'absolute',
                    width: '260px',
                    height: '260px',
                    borderRadius: '50%',
                    border: '1px solid rgba(0, 0, 0, 0.25)',
                    animation: 'soundwaveAnim 1.2s infinite ease-out 0.3s',
                    pointerEvents: 'none'
                  }} />
                </>
              )}

              <img
                src="/products/beosound_speaker.png"
                alt="Bang & Olufsen Titanium BeoSound 2"
                style={{
                  maxHeight: '300px',
                  maxWidth: '90%',
                  objectFit: 'contain',
                  filter: 'drop-shadow(0 20px 30px rgba(0, 0, 0, 0.12))',
                  transition: 'transform 0.4s ease',
                  transform: isPlaying ? 'scale(1.03)' : 'scale(1)'
                }}
              />
            </div>

            {/* Animated Multi-Channel Soundwave Frequency Bars (Monochrome) */}
            <div style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'center',
              gap: '4px',
              height: '46px',
              width: '100%',
              marginTop: '12px',
              padding: '0 20px'
            }}>
              {[22, 45, 68, 85, 40, 95, 75, 50, 88, 62, 34, 78, 92, 55, 30, 84, 60, 42, 90, 70, 48, 80, 65, 35, 75, 50, 30].map((h, idx) => {
                const liveHeight = isPlaying ? Math.max(6, (h * volume) / 100) : 6;
                return (
                  <span
                    key={idx}
                    style={{
                      width: '4px',
                      height: `${liveHeight}px`,
                      background: isPlaying ? 'var(--accent-cyan, #73c4ff)' : 'var(--border-subtle, rgba(255, 255, 255, 0.15))',
                      borderRadius: '4px',
                      transition: 'height 0.12s ease-in-out',
                      display: 'inline-block'
                    }}
                  />
                );
              })}
            </div>

            {/* Audio Control Bar below soundwave */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              marginTop: '20px',
              padding: '12px 18px',
              background: 'var(--bg-secondary, rgba(255, 255, 255, 0.05))',
              borderRadius: '16px',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button
                  onClick={toggleSound}
                  style={{
                    width: '42px',
                    height: '42px',
                    borderRadius: '50%',
                    background: 'var(--accent-btn-bg, #73c4ff)',
                    color: 'var(--accent-btn-text, #0b0c0e)',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.25)',
                    transition: 'transform 0.2s ease'
                  }}
                  title={isPlaying ? "Ovozni to'xtatish" : "Ovozni sinab ko'rish"}
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} style={{ marginLeft: '2px' }} />}
                </button>

                <div>
                  <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--text-primary, #edf0f3)' }}>
                    {isPlaying ? '432Hz Sof Akustik Sinov' : 'Ovoz Sinovini Boshlash'}
                  </div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #8e949b)' }}>
                    {isPlaying ? 'Rezonans: 102W Class-D Oqimi' : 'Tugmani bosing va his eting'}
                  </div>
                </div>
              </div>

              <div style={{ fontSize: '0.82rem', fontWeight: 700, color: 'var(--accent-cyan, #73c4ff)' }}>
                {volume}% OVOZ
              </div>
            </div>

          </div>

          {/* Right: B&O Interactive Rotating Dial & Sound Config */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '22px' }}>
            
            {/* Rotating Sensory Volume Dial Card */}
            <div 
              style={{
                padding: '24px',
                borderRadius: '24px',
                background: 'var(--bg-card, #111316)',
                border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div>
                  <h4 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary, #edf0f3)' }}>
                    Aylanma Sensorli Ovoz Diski
                  </h4>
                  <p style={{ fontSize: '0.74rem', color: 'var(--text-secondary, #8e949b)' }}>
                    Sayqallangan titan plastina ustida aylanuvchi g'ildirak
                  </p>
                </div>
                <div style={{
                  background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: 'var(--text-primary, #edf0f3)'
                }}>
                  {volume} / 100 dB
                </div>
              </div>

              {/* Rotary Wheel Visual with Interactive Drag / Click Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '24px',
                padding: '20px 0'
              }}>
                <button
                  onClick={() => handleVolumeChange(volume - 10)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#f5f5f7',
                    border: '1px solid #e5e5ea',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Ovozni pasaytirish"
                >
                  -
                </button>

                {/* Simulated Bang & Olufsen Platinum Rotary Wheel */}
                <div style={{
                  position: 'relative',
                  width: '130px',
                  height: '130px',
                  borderRadius: '50%',
                  background: 'linear-gradient(145deg, #ffffff 0%, #e5e5ea 50%, #c7c7cc 100%)',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer'
                }}>
                  {/* Rotating Dial Mark */}
                  <div style={{
                    position: 'absolute',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    transform: `rotate(${rotationAngle}deg)`,
                    transition: 'transform 0.15s ease-out'
                  }}>
                    <span style={{
                      position: 'absolute',
                      top: '8px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      width: '6px',
                      height: '14px',
                      background: '#1d1d1f',
                      borderRadius: '4px'
                    }} />
                  </div>

                  {/* Inner Core */}
                  <div style={{
                    width: '84px',
                    height: '84px',
                    borderRadius: '50%',
                    background: '#ffffff',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.06)'
                  }}>
                    <Volume2 size={20} color="#1d1d1f" />
                    <span style={{ fontSize: '0.82rem', fontWeight: 800, color: '#1d1d1f' }}>
                      {volume}%
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => handleVolumeChange(volume + 10)}
                  style={{
                    width: '38px',
                    height: '38px',
                    borderRadius: '50%',
                    background: '#f5f5f7',
                    border: '1px solid #e5e5ea',
                    fontSize: '1.2rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  title="Ovozni ko'paytirish"
                >
                  +
                </button>
              </div>

              {/* Slider fallback for precise control */}
              <input
                type="range"
                min="0"
                max="100"
                value={volume}
                onChange={(e) => handleVolumeChange(Number(e.target.value))}
                style={{
                  width: '100%',
                  accentColor: '#1d1d1f',
                  cursor: 'pointer',
                  marginTop: '10px'
                }}
              />
            </div>

            {/* Sound Profile Selectors */}
            <div style={{
              padding: '20px',
              borderRadius: '22px',
              background: 'var(--bg-card, #111316)',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))'
            }}>
              <div style={{ fontSize: '0.86rem', fontWeight: 700, color: 'var(--text-primary, #edf0f3)', marginBottom: '12px' }}>
                Akustik Profil va Rejim
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {soundModes.map((mode) => {
                  const isSel = soundMode === mode.id;
                  return (
                    <button
                      key={mode.id}
                      onClick={() => setSoundMode(mode.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 14px',
                        borderRadius: '12px',
                        background: isSel ? 'rgba(115, 196, 255, 0.12)' : 'var(--bg-secondary, rgba(255, 255, 255, 0.04))',
                        border: isSel ? '2px solid var(--accent-cyan, #73c4ff)' : '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
                        cursor: 'pointer',
                        textAlign: 'left'
                      }}
                    >
                      <div>
                        <div style={{ fontSize: '0.82rem', fontWeight: 700, color: isSel ? 'var(--accent-cyan, #73c4ff)' : 'var(--text-primary, #edf0f3)' }}>
                          {mode.name}
                        </div>
                        <div style={{ fontSize: '0.7rem', color: 'var(--text-secondary, #8e949b)' }}>
                          {mode.desc}
                        </div>
                      </div>
                      {isSel && <Check size={16} color="var(--accent-cyan, #73c4ff)" />}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Pricing & Checkout Block */}
            <div style={{
              background: 'var(--bg-card, #111316)',
              padding: '22px',
              borderRadius: '24px',
              border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
              boxShadow: 'var(--shadow-card, 0 10px 30px rgba(0, 0, 0, 0.25))',
              display: 'flex',
              flexDirection: 'column',
              gap: '14px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <div>
                  <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #8e949b)', textTransform: 'uppercase' }}>
                    ATELIER NARXI
                  </span>
                  <div style={{
                    fontSize: '1.75rem',
                    fontWeight: 800,
                    color: 'var(--text-primary, #edf0f3)'
                  }}>
                    {formatPrice(bAndOProduct.priceUSD, currency)}
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: '0.68rem',
                    background: 'var(--bg-secondary, rgba(255, 255, 255, 0.06))',
                    color: 'var(--accent-cyan, #73c4ff)',
                    border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.12))',
                    padding: '3px 8px',
                    borderRadius: 'var(--radius-full)',
                    fontWeight: 700
                  }}>
                    Omborda: 5 dona mavjud
                  </span>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-secondary, #8e949b)', marginTop: '4px' }}>
                    Apple AirPlay 2 + Kafolat 3 yil
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  onClick={() => onFastBuy(bAndOProduct)}
                  className="btn-apple btn-apple-primary"
                  style={{
                    flex: 1,
                    padding: '12px 18px',
                    fontSize: '0.9rem',
                    fontWeight: 700,
                    background: 'var(--accent-btn-bg, #73c4ff)',
                    color: 'var(--accent-btn-text, #0b0c0e)',
                    border: 'none',
                    borderRadius: '12px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px'
                  }}
                >
                  <Zap size={16} />
                  <span>Tezkor Xarid Qilish</span>
                </button>

                <button
                  onClick={() => onAddToCart(bAndOProduct)}
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
