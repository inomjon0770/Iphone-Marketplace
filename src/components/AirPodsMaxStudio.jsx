import React, { useState } from 'react';
import { 
  Play, 
  Volume2, 
  ShoppingBag, 
  ArrowRight, 
  ChevronLeft, 
  ChevronRight, 
  ShieldCheck, 
  Check, 
  Sparkles,
  Headphones,
  RotateCw
} from 'lucide-react';
import { formatPrice } from '../data/storage';

const AIRPODS_FINISHES = [
  {
    id: 'space-black',
    name: 'Space Black Obsidian',
    colorHex: '#18181b',
    image: '/products/airpods_max_spacegray.png',
    tagline: 'Anodlangan aerokosmik alyuminiy va to\'q obsidian qoplamasi.',
    watermark: 'MAX',
    priceUSD: 549,
    accentGlow: 'rgba(255, 255, 255, 0.08)'
  },
  {
    id: 'silver-platinum',
    name: 'Silver Platinum & White',
    colorHex: '#f5f5f7',
    image: '/products/airpods_max_hero.png',
    tagline: 'Sayqallangan sof kumush korpus va nafas oluvchi oq to\'rli boshliq.',
    watermark: 'PRO',
    priceUSD: 549,
    accentGlow: 'rgba(255, 255, 255, 0.15)'
  },
  {
    id: 'natural-titanium',
    name: 'Natural Titanium Gray',
    colorHex: '#8e8e93',
    image: '/products/airpods_max_spacegray.png',
    tagline: '5-darajali titan rangi va maxsus akustik xotirali quloqliklar.',
    watermark: 'H2',
    priceUSD: 579,
    accentGlow: 'rgba(210, 210, 215, 0.1)'
  },
  {
    id: 'graphite-matrix',
    name: 'Graphite Matrix Edition',
    colorHex: '#3a3a3c',
    image: '/products/airpods_max_hero.png',
    tagline: 'Grafitli mat sirt va atrof-muhit shovqinini faol so\'ndiruvchi tizim.',
    watermark: '2025',
    priceUSD: 549,
    accentGlow: 'rgba(142, 142, 147, 0.1)'
  }
];

export const AirPodsMaxStudio = ({
  currency,
  onAddToCart,
  onFastBuy
}) => {
  const [activeFinishIndex, setActiveFinishIndex] = useState(0);
  const [includeAppleCare, setIncludeAppleCare] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  const currentFinish = AIRPODS_FINISHES[activeFinishIndex];
  const totalPriceUSD = currentFinish.priceUSD + (includeAppleCare ? 79 : 0);

  const handlePrevFinish = () => {
    setActiveFinishIndex((prev) => (prev - 1 + AIRPODS_FINISHES.length) % AIRPODS_FINISHES.length);
  };

  const handleNextFinish = () => {
    setActiveFinishIndex((prev) => (prev + 1) % AIRPODS_FINISHES.length);
  };

  // Play lossless acoustic preview chime
  const playAcousticPreview = () => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.3);
        osc.frequency.exponentialRampToValueAtTime(659, ctx.currentTime + 0.7);
        gain.gain.setValueAtTime(0.08, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.2);
      }
    } catch {
      // Audio optional
    }
    setIsPlayingAudio(true);
    setTimeout(() => setIsPlayingAudio(false), 1200);
  };

  const handleOrder = () => {
    const productPayload = {
      id: `airpods-max-${currentFinish.id}`,
      name: `AirPods Max (${currentFinish.name})`,
      category: 'accessories',
      price: totalPriceUSD,
      image: currentFinish.image,
      stock: 8,
      storage: includeAppleCare ? 'USB-C + AppleCare+' : 'USB-C (2024)',
      badge: 'PRO ACOUSTICS'
    };
    if (onFastBuy) {
      onFastBuy(productPayload);
    } else if (onAddToCart) {
      onAddToCart(productPayload);
    }
  };

  return (
    <section className="relative py-20 bg-[#09090b] border-t border-[#1d1d1f] text-white select-none overflow-hidden">
      
      {/* Outer Studio Ambient Lighting */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[850px] h-[450px] bg-gradient-to-b from-[#3a3a3c] to-transparent rounded-full blur-[160px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] border border-[#2c2c2e] text-xs font-mono tracking-widest text-[#d2d2d7] uppercase mb-4 shadow-inner">
            <Headphones size={13} className="text-white" />
            <span>AirPods Max Atelier Studio</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Pure Acoustic Fidelity
          </h2>
          <p className="text-[#86868b] text-sm sm:text-base">
            Har bir detal mukammallik uchun yaratilgan. Maxsus akustik dizayn va kompyuterlashtirilgan fazoviy tovush.
          </p>
        </div>

        {/* ================= FLOATING TABLET SHOWCASE (Exact Match to Pinterest Reference Video) ================= */}
        <div className="relative bg-[#111114] border border-[#27272a] rounded-[28px] sm:rounded-[42px] p-6 sm:p-10 shadow-2xl backdrop-blur-2xl overflow-hidden">
          
          {/* Background Giant Watermark Numeral */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <span className="text-[140px] sm:text-[240px] lg:text-[320px] font-bold tracking-tighter text-white/[0.03] leading-none transition-all duration-700">
              {currentFinish.watermark}
            </span>
          </div>

          {/* Top Cinema Bar inside Card */}
          <div className="relative z-10 flex items-center justify-between pb-6 border-b border-white/[0.07] mb-8">
            <div className="flex items-center gap-2.5">
              <span className="font-bold tracking-wider text-sm sm:text-base text-white">iLUX</span>
              <span className="text-xs font-mono text-[#86868b]">/ AirPods Max Studio</span>
            </div>

            {/* Nav Tabs */}
            <div className="hidden md:flex items-center gap-6 text-xs font-mono uppercase tracking-wider text-[#86868b]">
              {AIRPODS_FINISHES.map((f, i) => (
                <button
                  key={f.id}
                  onClick={() => setActiveFinishIndex(i)}
                  className={`transition hover:text-white ${activeFinishIndex === i ? 'text-white font-semibold' : ''}`}
                >
                  {f.name.split(' ')[0]}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={playAcousticPreview}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/10 hover:bg-white/20 text-xs font-mono text-white transition border border-white/10"
                title="Fazoviy audio sinovi"
              >
                <Volume2 size={13} className={isPlayingAudio ? 'animate-bounce text-white' : ''} />
                <span>Audio Test</span>
              </button>
            </div>
          </div>

          {/* ================= MAIN 3-COLUMN SHOWCASE STAGE ================= */}
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center min-h-[420px]">
            
            {/* Left Column: AppleCare+ & Insurance Info (3 Cols - exact match to reference) */}
            <div className="lg:col-span-3 text-left order-2 lg:order-1">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
                <span className="text-xs font-mono text-white uppercase tracking-wider block mb-1">
                  AppleCare+ Kafolati
                </span>
                <div className="text-sm font-semibold text-white mb-2">
                  Headphones Protection
                </div>
                <div className="text-xs text-[#86868b] leading-relaxed mb-4">
                  2 yil davomida cheksiz ta'mirlash, tasodifiy zararlardan to'liq himoya va 24/7 ustuvor Apple texnik ko'magi.
                </div>

                <label 
                  onClick={() => setIncludeAppleCare(!includeAppleCare)}
                  className="flex items-center gap-2.5 cursor-pointer text-xs font-medium text-[#d2d2d7] hover:text-white transition"
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center transition ${
                    includeAppleCare ? 'bg-white border-white text-black' : 'border-[#515154] bg-transparent'
                  }`}>
                    {includeAppleCare && <Check size={11} strokeWidth={3} />}
                  </div>
                  <span>AppleCare+ qo'shish (+$79)</span>
                </label>
              </div>
            </div>

            {/* Center Column: Dual-Angle AirPods Max Visual Showcase (6 Cols) */}
            <div className="lg:col-span-6 relative flex flex-col items-center justify-center order-1 lg:order-2">
              
              {/* Main Headphones Image (Dual view) */}
              <div className="relative w-full max-w-[500px] h-[300px] sm:h-[360px] flex items-center justify-center">
                
                {/* Adjacent Blurred Headphones for Depth-of-Field (as seen in Pinterest video) */}
                <div className="absolute -left-20 sm:-left-24 opacity-20 filter blur-sm scale-75 pointer-events-none hidden sm:block">
                  <img
                    src={AIRPODS_FINISHES[(activeFinishIndex + 1) % AIRPODS_FINISHES.length].image}
                    alt="Adjacent"
                    className="w-48 h-auto object-contain"
                  />
                </div>
                <div className="absolute -right-20 sm:-right-24 opacity-20 filter blur-sm scale-75 pointer-events-none hidden sm:block">
                  <img
                    src={AIRPODS_FINISHES[(activeFinishIndex + 2) % AIRPODS_FINISHES.length].image}
                    alt="Adjacent"
                    className="w-48 h-auto object-contain"
                  />
                </div>

                {/* Active Main Image with High Quality Shadow */}
                <img
                  key={currentFinish.id}
                  src={currentFinish.image}
                  alt={currentFinish.name}
                  className="relative z-10 max-h-full max-w-full object-contain filter drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)] transition-all duration-500 transform hover:scale-105"
                />
              </div>

              {/* Tagline */}
              <p className="text-xs text-[#86868b] text-center max-w-sm mt-2 font-mono">
                {currentFinish.tagline}
              </p>
            </div>

            {/* Right Column: "What's in the Box" (3 Cols - exact match to reference) */}
            <div className="lg:col-span-3 text-left order-3">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.07] backdrop-blur-md">
                <span className="text-xs font-mono text-white uppercase tracking-wider block mb-2">
                  Qutida Nimalar Bor?
                </span>
                <ul className="text-xs text-[#86868b] space-y-2 mb-4">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>AirPods Max (USB-C 2024)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>Smart Case (Ultra-quvvat tejovchi)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>USB-C To'qilgan zaryad kabeli</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white" />
                    <span>Rasmiy iLux Kafolat pasporti</span>
                  </li>
                </ul>

                <div className="pt-3 border-t border-white/[0.07] flex items-center justify-between text-xs font-mono">
                  <span className="text-[#86868b]">Jami narx:</span>
                  <span className="text-white font-bold">{formatPrice(totalPriceUSD, currency)}</span>
                </div>
              </div>
            </div>

          </div>

          {/* ================= BOTTOM COLOR SELECTOR & ACTION BAR ================= */}
          <div className="relative z-10 pt-8 mt-6 border-t border-white/[0.07] flex flex-col sm:flex-row items-center justify-between gap-6">
            
            {/* Color Selector (Exact Center Match from Reference Video) */}
            <div className="flex flex-col items-center sm:items-start gap-2">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#86868b]">
                Rangni Tanlang: <b className="text-white font-medium">{currentFinish.name}</b>
              </span>
              
              <div className="flex items-center gap-3">
                {AIRPODS_FINISHES.map((finish, idx) => {
                  const isSelected = activeFinishIndex === idx;
                  return (
                    <button
                      key={finish.id}
                      onClick={() => setActiveFinishIndex(idx)}
                      style={{ backgroundColor: finish.colorHex }}
                      className={`w-7 h-7 rounded-full border transition-all duration-300 relative ${
                        isSelected 
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-[#111114] scale-110 border-white' 
                          : 'border-white/20 hover:scale-105'
                      }`}
                      title={finish.name}
                    />
                  );
                })}
              </div>
            </div>

            {/* Slider Arrow Buttons (Exact match to circular < > buttons in video) */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrevFinish}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center transition hover:bg-white/10"
                title="Oldingi rang"
              >
                <ChevronLeft size={16} />
              </button>

              <button
                onClick={handleNextFinish}
                className="w-10 h-10 rounded-full border border-white/20 hover:border-white text-white flex items-center justify-center transition hover:bg-white/10"
                title="Keyingi rang"
              >
                <ChevronRight size={16} />
              </button>

              {/* Order Button */}
              <button
                onClick={handleOrder}
                className="ml-3 px-6 py-2.5 rounded-full bg-white hover:bg-[#f5f5f7] text-black font-semibold text-xs tracking-wider uppercase transition shadow-xl flex items-center gap-2 active:scale-95"
              >
                <ShoppingBag size={14} />
                <span>Xarid Qilish</span>
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
