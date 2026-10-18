import React, { useState, useEffect } from 'react';
import { 
  X, 
  Sparkles, 
  ArrowRight, 
  Copy, 
  Check, 
  ShieldCheck, 
  Gift, 
  Volume2, 
  Compass,
  Play
} from 'lucide-react';
import confetti from 'canvas-confetti';

export const IntroAdModal = ({
  isOpen,
  onClose,
  onExploreProduct
}) => {
  const [copied, setCopied] = useState(false);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  // Play subtle cinematic welcome chime on appear
  useEffect(() => {
    if (isOpen) {
      try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (AudioContext) {
          const ctx = new AudioContext();
          const osc1 = ctx.createOscillator();
          const osc2 = ctx.createOscillator();
          const gain = ctx.createGain();

          osc1.type = 'sine';
          osc2.type = 'sine';
          osc1.frequency.setValueAtTime(432, ctx.currentTime);
          osc2.frequency.setValueAtTime(648, ctx.currentTime);

          gain.gain.setValueAtTime(0.08, ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);

          osc1.connect(gain);
          osc2.connect(gain);
          gain.connect(ctx.destination);

          osc1.start();
          osc2.start();
          osc1.stop(ctx.currentTime + 1.2);
          osc2.stop(ctx.currentTime + 1.2);
        }
      } catch {
        // audio optional
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleCopyCode = () => {
    navigator.clipboard.writeText('TITANIUM2025');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleEnterStore = () => {
    if (dontShowAgain) {
      localStorage.setItem('ilux_hide_intro_ad', 'true');
    }
    sessionStorage.setItem('ilux_intro_seen_session', 'true');
    
    // Silver confetti explosion
    try {
      confetti({
        particleCount: 45,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#ffffff', '#d2d2d7', '#86868b', '#3a3a3c']
      });
    } catch {
      // optional
    }

    onClose();
  };

  return (
    <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-2xl flex items-center justify-center p-3 sm:p-6 overflow-y-auto select-none animate-fadeIn">
      
      {/* Outer Card Container */}
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative bg-[#09090b] border border-[#27272a] rounded-[28px] sm:rounded-[36px] max-w-4xl w-full overflow-hidden shadow-[0_35px_100px_rgba(0,0,0,0.8)] text-white"
      >
        {/* Close Button */}
        <button
          onClick={handleEnterStore}
          className="absolute top-4 right-4 z-30 w-10 h-10 rounded-full bg-black/60 hover:bg-black/90 border border-white/20 text-[#86868b] hover:text-white flex items-center justify-center transition"
          title="Yopish"
        >
          <X size={18} />
        </button>

        {/* Top Cinematic Showcase Image (Exact Match to Reference: iPhone on Pedestal in Mountain Mist) */}
        <div className="relative aspect-[16/9] sm:aspect-[21/9] w-full overflow-hidden bg-black flex items-center justify-center">
          <img
            src="/iphone_pedestal_cinematic_intro.jpg"
            alt="iPhone 16 Pro Podium Intro"
            className="w-full h-full object-cover object-center filter brightness-95 transform hover:scale-105 transition duration-700"
          />

          {/* Vignette Gradients */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#09090b] via-transparent to-black/40 pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60 pointer-events-none" />

          {/* Badge over image */}
          <div className="absolute top-5 left-5 sm:left-8 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-black/60 border border-white/20 backdrop-blur-md text-xs font-mono tracking-widest text-white uppercase">
            <Sparkles size={12} className="text-white animate-pulse" />
            <span>VIP EKSKLYUZIV TAQDIMOT</span>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 sm:p-8 relative z-10">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-6">
            <div>
              <div className="text-xs font-mono tracking-widest text-[#86868b] uppercase mb-1">
                Apple Intelligence × iLux Atelier
              </div>
              <h2 className="text-2xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
                Kelajak Texnologiyasi. Titan Sayqali.
              </h2>
              <p className="text-[#86868b] text-xs sm:text-sm mt-1 max-w-xl font-normal leading-relaxed">
                O'zbekistondagi 1-raqamli nufuzli Apple do'koni. Rasmiy 5-darajali aerokosmik titan modellari, eksklyuziv aksessuarlar va xalqaro VIP kafolat.
              </p>
            </div>

            {/* Promo Code Box */}
            <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-md flex-shrink-0 w-full md:w-auto">
              <div className="text-[10px] font-mono uppercase tracking-wider text-[#86868b] mb-1">
                Ilk Tashrif Uchun Maxsus Kupon:
              </div>
              <div className="flex items-center gap-2">
                <span className="font-mono font-bold text-base text-white tracking-widest bg-black/60 px-3 py-1.5 rounded-lg border border-white/20">
                  TITANIUM2025
                </span>
                <button
                  onClick={handleCopyCode}
                  className="p-2 rounded-lg bg-white text-black hover:bg-[#e5e5ea] transition text-xs font-semibold flex items-center gap-1 active:scale-95"
                  title="Kuponni nusxalash"
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? 'Nusxalandi' : 'Nusxa'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* 3 VIP Privileges Chips */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <Gift size={18} className="text-white flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-semibold text-white">Bepul Lazer Gravirovka</div>
                <div className="text-[11px] text-[#86868b]">Shaxsiy ism yoki logotip</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <ShieldCheck size={18} className="text-white flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-semibold text-white">2 Yillik VIP Kafolat</div>
                <div className="text-[11px] text-[#86868b]">100% original pasport</div>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-white/[0.03] border border-white/10 flex items-center gap-3">
              <Sparkles size={18} className="text-white flex-shrink-0" />
              <div className="text-left">
                <div className="text-xs font-semibold text-white">Tezkor VIP Yetkazish</div>
                <div className="text-[11px] text-[#86868b]">Toshkent bo'ylab 2 soatda</div>
              </div>
            </div>
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-white/[0.07]">
            <label className="flex items-center gap-2 cursor-pointer text-xs text-[#86868b] hover:text-white transition">
              <input
                type="checkbox"
                checked={dontShowAgain}
                onChange={(e) => setDontShowAgain(e.target.checked)}
                className="w-3.5 h-3.5 accent-white rounded cursor-pointer"
              />
              <span>Bugun qayta ko'rsatilmasin</span>
            </label>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={() => {
                  handleEnterStore();
                  if (onExploreProduct) {
                    onExploreProduct('gold-16-pm-falcon');
                  }
                }}
                className="flex-1 sm:flex-initial px-5 py-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs font-medium tracking-wide transition border border-white/15"
              >
                Modelni Ko'rish
              </button>

              <button
                onClick={handleEnterStore}
                className="flex-1 sm:flex-initial px-7 py-2.5 rounded-full bg-white hover:bg-[#f5f5f7] text-black font-semibold text-xs tracking-wider uppercase transition shadow-xl flex items-center justify-center gap-2 active:scale-95"
              >
                <span>Do'konga Kirish</span>
                <ArrowRight size={13} />
              </button>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
