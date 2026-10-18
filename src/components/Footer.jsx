import React from 'react';
import { Crown, ShieldCheck, MapPin, Phone, Mail, Globe, Send, Sparkles } from 'lucide-react';

export const Footer = ({ onSelectCategory, t }) => {
  const fT = t?.footer || {};
  const navT = t?.nav || {};

  return (
    <footer style={{
      background: 'var(--bg-secondary, #121519)',
      borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
      padding: '50px 0 32px 0',
      color: 'var(--text-secondary, #8e949b)',
      fontSize: '0.8rem',
      lineHeight: 1.6,
      transition: 'background 0.25s ease, color 0.25s ease'
    }}>
      <div className="app-container">
        
        {/* Top 4 Columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '32px',
          marginBottom: '36px'
        }}>
          {/* Brand Info */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
              <div style={{
                width: '30px',
                height: '30px',
                borderRadius: '50%',
                background: 'var(--accent-btn-bg, #edf0f3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--accent-btn-text, #0b0c0e)'
              }}>
                <Crown size={16} />
              </div>
              <span style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--text-primary, #edf0f3)' }}>iLux Apple Atelier</span>
            </div>
            <p style={{ marginBottom: '14px', color: 'var(--text-secondary, #8e949b)' }}>
              {fT.desc || 'O‘zbekistondagi premium Apple mahsulotlari va original aksessuarlar vitrinasi. Barcha qurilmalar rasmiy IMEI va xalqaro Apple kafolatiga ega.'}
            </p>
            <div style={{ display: 'flex', gap: '8px' }}>
              <a href="#" style={{ color: 'var(--text-primary, #edf0f3)', background: 'var(--bg-card, #161a20)', padding: '7px', borderRadius: '50%', border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
                <Globe size={15} />
              </a>
              <a href="#" style={{ color: 'var(--accent-cyan, #73c4ff)', background: 'var(--bg-card, #161a20)', padding: '7px', borderRadius: '50%', border: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))' }}>
                <Send size={15} />
              </a>
            </div>
          </div>

          {/* Quick Categories */}
          <div>
            <h4 style={{ color: 'var(--text-primary, #edf0f3)', fontSize: '0.84rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.04em' }}>
              {fT.categories || 'Bo‘limlar'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <button 
                onClick={() => onSelectCategory('gold')}
                style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                🛡️ {navT.gold || 'Titanium Atelier'}
              </button>
              <button 
                onClick={() => onSelectCategory('iphone')}
                style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                📱 iPhone 16 Pro & Max
              </button>
              <button 
                onClick={() => onSelectCategory('mac')}
                style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                💻 MacBook Pro M3 & M4
              </button>
              <button 
                onClick={() => onSelectCategory('watch')}
                style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                ⌚ Apple Watch Ultra 2 & S10
              </button>
              <button 
                onClick={() => onSelectCategory('audio')}
                style={{ background: 'none', border: 'none', color: 'inherit', textAlign: 'left', cursor: 'pointer', fontSize: '0.8rem' }}
              >
                🎧 AirPods Max & Pro 2
              </button>
            </div>
          </div>

          {/* VIP Services */}
          <div>
            <h4 style={{ color: 'var(--text-primary, #edf0f3)', fontSize: '0.84rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.04em' }}>
              {fT.customerCare || 'Mijozlarga xizmat'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary, #8e949b)' }}>
              <div>🛡️ 1 yillik rasmiy Apple kafolati</div>
              <div>📜 100% Rasmiy bojxona va IMEI ro‘yxati</div>
              <div>✨ Shaxsiy lazer gravirovka</div>
              <div>📦 Toshkent bo‘ylab 2 soatda yetkazish</div>
              <div>🔄 Rasmiy Apple Trade-In dasturi</div>
            </div>
          </div>

          {/* Contact & Branches */}
          <div>
            <h4 style={{ color: 'var(--text-primary, #edf0f3)', fontSize: '0.84rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '0.04em' }}>
              {fT.contact || 'Aloqa'}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', color: 'var(--text-secondary, #8e949b)' }}>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-start' }}>
                <MapPin size={15} color="var(--accent-cyan, #73c4ff)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span>Toshkent sh., Amir Temur shoh ko‘chasi 45 (Atelier Flagship)</span>
              </div>
              <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                <Phone size={14} color="var(--accent-cyan, #73c4ff)" style={{ flexShrink: 0 }} />
                <span style={{ color: 'var(--text-primary, #edf0f3)', fontWeight: 700 }}>+998 71 200-77-00</span>
              </div>
              <div>10:00 – 22:00, dam olish kunlarisiz</div>
            </div>
          </div>
        </div>

        {/* Bottom Apple Legal Line */}
        <div style={{
          borderTop: '1px solid var(--border-subtle, rgba(255, 255, 255, 0.08))',
          paddingTop: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
          fontSize: '0.74rem'
        }}>
          <div>
            Copyright © 2026 iLux Apple Atelier Store. {fT.copyright || 'Barcha huquqlar himoyalangan.'}
          </div>
          <div style={{ display: 'flex', gap: '14px' }}>
            <span>Apple Info</span>
            <span>Site Map</span>
            <span>Terms of Use</span>
            <span>Privacy Policy</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
