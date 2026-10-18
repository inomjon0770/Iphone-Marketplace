import React, { useState } from 'react';
import { Sparkles, ShoppingBag, ShieldCheck, PhoneCall, ChevronDown } from 'lucide-react';

export const DynamicIsland = ({ cartCount, onOpenCart, onOpenConcierge }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      position: 'sticky',
      top: '8px',
      zIndex: 1000,
      pointerEvents: 'none'
    }}>
      <div 
        onClick={() => setExpanded(!expanded)}
        style={{
          pointerEvents: 'auto',
          background: 'rgba(29, 29, 31, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          borderRadius: expanded ? '24px' : '30px',
          padding: expanded ? '14px 20px' : '7px 18px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.7), 0 0 16px rgba(255, 255, 255, 0.05)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          cursor: 'pointer',
          maxWidth: expanded ? '420px' : '320px',
          width: '100%'
        }}
      >
        {!expanded ? (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: '#ffffff',
                boxShadow: '0 0 8px #ffffff'
              }} />
              <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#ffffff', whiteSpace: 'nowrap' }}>
                iLux Atelier • Titanium Kafolati
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              {cartCount > 0 && (
                <span style={{
                  background: '#ffffff',
                  color: '#000',
                  fontSize: '0.7rem',
                  fontWeight: 700,
                  padding: '2px 7px',
                  borderRadius: '12px'
                }}>
                  {cartCount} ta
                </span>
              )}
              <ChevronDown size={14} color="var(--text-tertiary)" />
            </div>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', animation: 'modalFadeIn 0.2s ease' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Sparkles size={16} color="#ffffff" />
                <span style={{ fontSize: '0.82rem', fontWeight: 700, color: '#ffffff' }}>
                  Eksklyuziv iLux Xizmatlari
                </span>
              </div>
              <span style={{ fontSize: '0.7rem', color: 'var(--text-tertiary)' }}>Yopish uchun bosing</span>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '8px',
              paddingTop: '4px'
            }}>
              <div 
                onClick={(e) => { e.stopPropagation(); onOpenCart(); }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <ShoppingBag size={15} color="#ffffff" />
                <div style={{ fontSize: '0.72rem', color: '#ffffff' }}>
                  <div style={{ fontWeight: 600 }}>Savatcha</div>
                  <div style={{ color: 'var(--text-tertiary)' }}>{cartCount} mahsulot</div>
                </div>
              </div>

              <div 
                onClick={(e) => { e.stopPropagation(); onOpenConcierge(); }}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '8px 10px',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}
              >
                <ShieldCheck size={15} color="#ffffff" />
                <div style={{ fontSize: '0.72rem', color: '#ffffff' }}>
                  <div style={{ fontWeight: 600 }}>VIP Konsyerj</div>
                  <div style={{ color: 'var(--text-tertiary)' }}>+998 71 200-77-00</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
