import React, { useState, useEffect, useRef } from 'react';
import { 
  Sparkles, 
  Play, 
  Pause, 
  RotateCw, 
  ArrowRight, 
  ShieldCheck, 
  Compass, 
  Watch, 
  Activity, 
  Sliders,
  ChevronDown,
  Clock,
  Zap,
  Volume2,
  VolumeX,
  CheckCircle2,
  Flame,
  Award
} from 'lucide-react';
import { formatPrice } from '../data/storage';

// Flowty.co Chapters with authentic kinetic content & 3D perspective physics
const CHAPTERS = [
  {
    id: 'silence',
    numeral: '01',
    headlinePrefix: 'Silence Your',
    headlineHighlight: 'Digital Noise',
    subheadline: 'Ortiqcha chalg\'ituvchi bildirishnomalardan butunlay xoli bo\'ling.',
    description: 'Apple Intelligence va doimiy ProMotion texnologiyasi bilan diqqatingizni faqat eng muhim maqsadlarga qarating. Xotirjamlik va chuqur e\'tibor muhiti.',
    badge: 'FLOWTY ✻ FOCUS ARCHITECTURE',
    rotateX: 10,
    rotateY: -22,
    rotateZ: -3,
    scale: 1.0,
    watchVisible: true,
    screenState: 'focus',
    statLabel: 'Diqqat barqarorligi',
    statValue: '99.4%'
  },
  {
    id: 'distraction',
    numeral: '02',
    headlinePrefix: 'Kill Harmful',
    headlineHighlight: 'Distractions',
    subheadline: 'Irodangiz bilan kurashishni to\'xtating. Tizim siz uchun ishlaydi.',
    description: 'Flowty sessiyasi boshlanishi bilanoq barcha chalg\'ituvchi ilovalar avtomatik tarzda to\'xtatiladi. 5-darajali titan korpusi va taktil sensor harakatlari bilan mukammal integratsiya.',
    badge: 'APP BLOCKER & ZERO NOISE',
    rotateX: 4,
    rotateY: 38,
    rotateZ: 6,
    scale: 1.06,
    watchVisible: true,
    screenState: 'blocked',
    statLabel: 'Bloklangan bildirishnomalar',
    statValue: '142 ta / kun'
  },
  {
    id: 'deepwork',
    numeral: '03',
    headlinePrefix: 'Deep Work',
    headlineHighlight: 'Uninterrupted',
    subheadline: 'Bir necha soatlik to\'xtovsiz ijodiy va aqliy parvoz.',
    description: 'Kuzatuvlar shuni ko\'rsatadiki, chalg\'ituvchi omillarni bloklash orqali kuniga qo\'shimcha 2–3 soat (37%) sof unumdor vaqtga ega bo\'lasiz.',
    badge: 'DEEP WORK ✻ 37% BOOST',
    rotateX: -16,
    rotateY: -14,
    rotateZ: -8,
    scale: 1.12,
    watchVisible: false,
    screenState: 'analytics',
    statLabel: 'Qaytarilgan unumdor vaqt',
    statValue: '+3.2 soat'
  },
  {
    id: 'wrist',
    numeral: '04',
    headlinePrefix: 'Flowty On',
    headlineHighlight: 'Your Wrist',
    subheadline: 'Ekranga qaramasdan bilagingizdagi taktil puls bilan boshqaring.',
    description: 'Apple Watch Ultra 2 bilan to\'liq sinxronlashuv. Yumshoq haptik tebranishlar sessiya tugaganini jimgina bildiradi — diqqatingiz bir soniyaga ham buzilmaydi.',
    badge: 'WATCH ULTRA 2 ✻ HAPTIC DIAL',
    rotateX: 0,
    rotateY: 0,
    rotateZ: 0,
    scale: 1.0,
    watchVisible: true,
    screenState: 'synced',
    statLabel: 'Taktil tebranish aniqligi',
    statValue: '100% Sinxron'
  }
];

// Flowty.co Time Modes (Authentic focus templates)
const TIME_MODES = [
  { id: 'deep', name: 'Deep Work', durationMinutes: 90, restMinutes: 15, tag: 'Tavsiya etiladi' },
  { id: 'pomo', name: 'Pomodoro', durationMinutes: 25, restMinutes: 5, tag: 'Klassik' },
  { id: 'sprint', name: 'Titanium Sprint', durationMinutes: 50, restMinutes: 10, tag: 'Yuqori quvvat' },
  { id: 'zen', name: 'Creative Flow', durationMinutes: 120, restMinutes: 20, tag: 'Cheksiz ijod' }
];

export const FlowtyScrollExperience = ({
  onSelectCategory,
  onFastBuy,
  currency = 'USD'
}) => {
  // 3D Perspective & Chapters
  const [scrollProgress, setScrollProgress] = useState(15); // 0 to 100
  const [activeChapterIndex, setActiveChapterIndex] = useState(0);
  const [isAutoRotating, setIsAutoRotating] = useState(false);
  const sectionRef = useRef(null);
  const animRef = useRef(null);

  // Interactive Focus Timer (Flowty.co Feature)
  const [activeMode, setActiveMode] = useState(TIME_MODES[1]); // Pomodoro default
  const [timerSeconds, setTimerSeconds] = useState(TIME_MODES[1].durationMinutes * 60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Play subtle Apple / Flowty audio click
  const playChime = (freq = 520) => {
    if (!soundEnabled) return;
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch {}
  };

  // Timer countdown interval
  useEffect(() => {
    let interval = null;
    if (isTimerRunning) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => {
          if (prev <= 1) {
            playChime(880);
            setIsTimerRunning(false);
            return activeMode.durationMinutes * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isTimerRunning, activeMode, soundEnabled]);

  // When mode changes, reset timer
  const handleSelectMode = (mode) => {
    setActiveMode(mode);
    setTimerSeconds(mode.durationMinutes * 60);
    setIsTimerRunning(false);
    playChime(640);
  };

  const toggleTimer = () => {
    setIsTimerRunning(!isTimerRunning);
    playChime(isTimerRunning ? 440 : 720);
  };

  const resetTimer = () => {
    setIsTimerRunning(false);
    setTimerSeconds(activeMode.durationMinutes * 60);
    playChime(380);
  };

  // Format timer MM:SS
  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Viewport scroll tracking for 3D physics
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || isAutoRotating) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      if (rect.top < windowHeight && rect.bottom > 0) {
        const visibleProgress = Math.max(0, Math.min(1, (windowHeight - rect.top) / (windowHeight + rect.height)));
        const pct = visibleProgress * 100;
        setScrollProgress(pct);
        const chapterIdx = Math.min(3, Math.floor(visibleProgress * 4));
        setActiveChapterIndex(chapterIdx);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isAutoRotating]);

  // Auto-rotation demo loop
  useEffect(() => {
    if (isAutoRotating) {
      let currentPct = scrollProgress;
      const step = () => {
        currentPct = (currentPct + 0.35) % 100;
        setScrollProgress(currentPct);
        const idx = Math.min(3, Math.floor((currentPct / 100) * 4));
        setActiveChapterIndex(idx);
        animRef.current = requestAnimationFrame(step);
      };
      animRef.current = requestAnimationFrame(step);
    } else {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    }

    return () => {
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [isAutoRotating]);

  // Interpolate 3D Transform values
  const currentChapter = CHAPTERS[activeChapterIndex];
  const progressRatio = scrollProgress / 100;

  // 3D Matrix angles
  const rotX = Math.sin(progressRatio * Math.PI * 2) * 18 + (currentChapter.rotateX * 0.4);
  const rotY = (progressRatio * 320) % 360 - 160 + (currentChapter.rotateY * 0.4);
  const rotZ = Math.cos(progressRatio * Math.PI * 2) * 6 + (currentChapter.rotateZ * 0.3);
  const scale = 0.96 + Math.sin(progressRatio * Math.PI) * 0.12;

  // Timer completion percentage
  const totalModeSeconds = activeMode.durationMinutes * 60;
  const timerPercent = ((totalModeSeconds - timerSeconds) / totalModeSeconds) * 100;

  return (
    <section 
      ref={sectionRef}
      id="flowty-experience"
      className="relative bg-[#0a0a0b] text-white select-none py-16 sm:py-24 border-t border-[#1f2128] overflow-hidden"
    >
      {/* Background Subtle Atmospheric Spotlight & Noise (Direct replica of Flowty.co) */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div 
          style={{
            transform: `translate(${Math.sin(progressRatio * Math.PI) * 100}px, ${Math.cos(progressRatio * Math.PI) * 50}px)`
          }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-[#2a2d33] via-[#17191d]/40 to-transparent rounded-full blur-[180px] transition-transform duration-300"
        />
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'radial-gradient(circle at 1px 1px, #ffffff 1px, transparent 0)',
            backgroundSize: '36px 36px'
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* ================= 1. FLOWTY.CO TOP HEADER & STATUS BAR ================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-12 border-b border-[#2a2d33]/50">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm shadow-[0_0_20px_rgba(255,255,255,0.4)]">
              ✻
            </div>
            <div>
              <div className="text-xs font-mono tracking-widest text-[#ceced7] uppercase flex items-center gap-2">
                <span>FLOWTY.CO × iLUX TITANIUM</span>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              </div>
              <div className="text-[11px] text-[#676a79]">
                Minimalist Focus-Break Architecture for iPhone 16 Pro & Apple Watch
              </div>
            </div>
          </div>

          {/* Interactive 3D Demo Controls */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => {
                setIsAutoRotating(!isAutoRotating);
                playChime(500);
              }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#17191d] hover:bg-[#23262d] border border-[#2a2d33] text-xs font-mono text-[#ceced7] hover:text-white transition active:scale-95 shadow-sm"
            >
              {isAutoRotating ? <Pause size={13} /> : <Play size={13} />}
              <span>{isAutoRotating ? 'To\'xtatish' : '3D Demo Aylanish'}</span>
            </button>

            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-full bg-[#17191d] hover:bg-[#23262d] border border-[#2a2d33] text-[#8e8e93] hover:text-white transition"
              title={soundEnabled ? 'Ovozni o\'chirish' : 'Ovozni yoqish'}
            >
              {soundEnabled ? <Volume2 size={14} /> : <VolumeX size={14} />}
            </button>

            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#17191d] border border-[#2a2d33] text-xs font-mono text-[#8e8e93]">
              <span>Bob:</span>
              <span className="text-white font-bold">{currentChapter.numeral} / 04</span>
            </div>
          </div>

        </div>

        {/* ================= 2. MAIN FLOWTY 3D KINETIC HERO STAGE ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 items-center gap-10 py-12 lg:py-16">
          
          {/* Left Column: Big Bold Kinetic Typography (Flowty Exact Style) */}
          <div className="lg:col-span-6 flex flex-col justify-center text-left">
            
            {/* Pill Badge with Flowty Asterisk */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#17191d] border border-[#2a2d33] text-xs font-mono tracking-widest text-[#ceced7] uppercase mb-6 w-max shadow-sm">
              <span className="text-white font-bold">✻</span>
              <span>{currentChapter.badge}</span>
            </div>

            {/* Huge Kinetic Headline (Direct from flowty.co) */}
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white mb-4 leading-[1.04]">
              {currentChapter.headlinePrefix}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#ceced7] to-[#8e8e93]">
                {currentChapter.headlineHighlight}
              </span>
            </h2>

            {/* Subheadline & Description */}
            <p className="text-lg sm:text-xl font-medium text-[#ceced7] mb-3 leading-snug">
              {currentChapter.subheadline}
            </p>

            <p className="text-sm sm:text-base text-[#8e8e93] leading-relaxed mb-8 max-w-xl font-normal">
              {currentChapter.description}
            </p>

            {/* Flowty 37% Metric Card (Direct from flowty.co) */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#17191d] border border-[#2a2d33] mb-8 backdrop-blur-xl flex items-center justify-between gap-4 max-w-xl">
              <div>
                <div className="text-xs font-mono tracking-wider text-[#8e8e93] uppercase mb-1">
                  {currentChapter.statLabel}
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>{currentChapter.statValue}</span>
                  <span className="text-xs font-mono font-normal text-[#ceced7] bg-white/10 px-2 py-0.5 rounded-md">
                    FLOWTY METRIC
                  </span>
                </div>
              </div>

              <div className="text-right border-l border-[#2a2d33] pl-4">
                <div className="text-xs font-mono text-[#8e8e93]">Samara darajasi:</div>
                <div className="text-sm font-bold text-white flex items-center justify-end gap-1 mt-0.5">
                  <Flame size={14} className="text-white" />
                  <span>Up to 37% Reclaimed</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-4 flex-wrap">
              <button
                onClick={() => {
                  const heroProduct = {
                    id: 'gold-16-pm-falcon',
                    name: 'iPhone 16 Pro Max Space Obsidian Titanium Atelier',
                    priceUSD: 3499,
                    category: 'gold',
                    stock: 4
                  };
                  if (onFastBuy) onFastBuy(heroProduct);
                }}
                className="px-7 py-3.5 rounded-full bg-white hover:bg-[#ceced7] text-black font-semibold text-xs tracking-wider uppercase transition shadow-[0_4px_24px_rgba(255,255,255,0.2)] active:scale-95 flex items-center gap-2"
              >
                <span>Titan Modelni Xarid Qilish</span>
                <ArrowRight size={13} />
              </button>

              <button
                onClick={() => {
                  const el = document.getElementById('catalog-section');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-6 py-3.5 rounded-full bg-[#17191d] hover:bg-[#23262d] text-[#ceced7] hover:text-white font-medium text-xs tracking-wider uppercase transition border border-[#2a2d33] active:scale-95"
              >
                <span>Katalogga O'tish</span>
              </button>
            </div>

          </div>

          {/* Right Column: Floating 3D Phone + Watch Stage (Exact Match to Flowty.co) */}
          <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] sm:min-h-[560px]">
            
            {/* Top-Right Floating Apple Watch Companion (From flowty.co "Flowty On Your Wrist") */}
            <div 
              style={{
                transform: `translateY(${Math.sin(progressRatio * Math.PI * 2) * 8}px)`,
                transition: 'transform 0.3s ease-out'
              }}
              className="absolute top-0 right-2 sm:right-6 z-30 p-3.5 rounded-2xl bg-[#17191d]/90 border border-[#2a2d33] backdrop-blur-2xl shadow-2xl flex items-center gap-3.5 max-w-xs"
            >
              <div className="w-12 h-12 rounded-xl bg-black/60 border border-[#2a2d33] flex items-center justify-center relative overflow-hidden flex-shrink-0">
                <img
                  src="/products/watch_ultra_2.png"
                  alt="Apple Watch Ultra 2 Flowty"
                  className="w-10 h-10 object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.8)]"
                />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-[#8e8e93] uppercase tracking-wider">Apple Watch Companion</div>
                <div className="text-xs font-bold text-white flex items-center gap-1.5 mt-0.5">
                  <Activity size={12} className="text-white animate-pulse" />
                  <span>{isTimerRunning ? 'Live Focus Active' : 'Sinxron Tayyor'}</span>
                </div>
                <div className="text-[10px] text-[#ceced7] mt-0.5">
                  {formatTime(timerSeconds)} qoldi
                </div>
              </div>
            </div>

            {/* Bottom-Left Floating App Blocker Indicator (From flowty.co "Kill Harmful Distractions") */}
            <div 
              style={{
                transform: `translateY(${-Math.sin(progressRatio * Math.PI * 2) * 6}px)`,
                transition: 'transform 0.3s ease-out'
              }}
              className="absolute bottom-4 left-0 sm:left-4 z-30 p-3 rounded-2xl bg-[#17191d]/90 border border-[#2a2d33] backdrop-blur-2xl shadow-2xl hidden sm:flex items-center gap-3"
            >
              <div className="w-9 h-9 rounded-xl bg-black/60 border border-[#2a2d33] flex items-center justify-center">
                <CheckCircle2 size={16} className="text-white" />
              </div>
              <div className="text-left font-mono">
                <div className="text-[10px] text-[#8e8e93] uppercase">Notification Shield</div>
                <div className="text-xs font-bold text-white">0 Chalg'ituvchi Signal</div>
              </div>
            </div>

            {/* Center 3D Perspective Device Stage */}
            <div 
              style={{ perspective: '1600px' }}
              className="relative w-full max-w-[360px] sm:max-w-[440px] aspect-[3/4] flex items-center justify-center"
            >
              {/* 3D Rotated Device Container */}
              <div
                style={{
                  transform: `rotateX(${rotX}deg) rotateY(${rotY}deg) rotateZ(${rotZ}deg) scale(${scale})`,
                  transition: isAutoRotating ? 'none' : 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
                  transformStyle: 'preserve-3d',
                  willChange: 'transform'
                }}
                className="relative w-full h-full flex items-center justify-center cursor-grab active:cursor-grabbing"
                onMouseDown={() => setIsAutoRotating(false)}
              >
                {/* Dynamic 3D Contact Shadow */}
                <div 
                  style={{
                    transform: `translateZ(-60px) scale(${1 - Math.abs(rotX) / 120})`,
                    opacity: 0.7
                  }}
                  className="absolute inset-x-10 bottom-6 h-14 bg-black blur-3xl rounded-full pointer-events-none"
                />

                {/* 3D iPhone Transparent PNG Cutout (No background!) */}
                <img
                  src="/products/iphone_16_pro_black.png"
                  alt="iPhone 16 Pro Max Flowty Perspective"
                  className="w-full h-full object-contain filter drop-shadow-[0_30px_70px_rgba(0,0,0,0.95)] pointer-events-none select-none relative z-10"
                />

                {/* Specular Titanium Light Glint */}
                <div 
                  style={{
                    background: `linear-gradient(${110 + rotY * 0.8}deg, transparent 25%, rgba(255,255,255,0.2) 50%, transparent 75%)`
                  }}
                  className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-overlay transition-all duration-75 z-20"
                />

                {/* Simulated Floating Screen UI (Dynamic Island & Focus Ring) */}
                <div 
                  style={{ transform: 'translateZ(25px)' }}
                  className="absolute top-1/4 inset-x-12 p-4 rounded-2xl bg-black/85 border border-white/10 backdrop-blur-md shadow-2xl text-center pointer-events-none z-30 opacity-90 hidden sm:block"
                >
                  <div className="w-16 h-3.5 bg-black rounded-full mx-auto mb-2 border border-white/10" />
                  <div className="text-[10px] font-mono tracking-widest text-[#8e8e93] uppercase">
                    {activeMode.name} ✻ FOCUS
                  </div>
                  <div className="text-2xl font-bold font-mono text-white mt-1">
                    {formatTime(timerSeconds)}
                  </div>
                  <div className="w-full bg-[#2a2d33] h-1 rounded-full mt-2 overflow-hidden">
                    <div 
                      style={{ width: `${timerPercent}%` }}
                      className="bg-white h-full transition-all duration-300"
                    />
                  </div>
                </div>

              </div>
            </div>

          </div>

        </div>

        {/* ================= 3. FLOWTY TIME MODES & INTERACTIVE FOCUS CONTROLLER ================= */}
        <div className="mt-6 pt-10 border-t border-[#2a2d33]/50">
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#17191d] border border-[#2a2d33] text-xs font-mono text-[#ceced7] uppercase mb-2">
                <Clock size={12} className="text-white" />
                <span>FLOWTY.CO ✻ TIME MODES</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Shaxsiy Diqqat Rejimlari va Vaqt Standarti
              </h3>
              <p className="text-[#8e8e93] text-xs sm:text-sm mt-1 max-w-xl">
                Har qanday dasturchi, dizayner yoki biznes egasi uchun mukammal sozlangan diqqat shablonlari.
              </p>
            </div>

            {/* Live Interactive Focus Controller */}
            <div className="flex items-center gap-3 p-3 rounded-2xl bg-[#17191d] border border-[#2a2d33] backdrop-blur-xl w-full md:w-auto justify-between md:justify-end">
              <div className="text-left font-mono pr-2">
                <div className="text-[10px] text-[#8e8e93] uppercase">{activeMode.name}</div>
                <div className="text-xl font-bold text-white tracking-wider">{formatTime(timerSeconds)}</div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={toggleTimer}
                  className="px-4 py-2 rounded-xl bg-white hover:bg-[#ceced7] text-black font-semibold text-xs font-mono transition flex items-center gap-1.5 active:scale-95"
                >
                  {isTimerRunning ? <Pause size={12} /> : <Play size={12} />}
                  <span>{isTimerRunning ? 'To\'xtatish' : 'Boshlash'}</span>
                </button>

                <button
                  onClick={resetTimer}
                  className="p-2 rounded-xl bg-black/40 hover:bg-black/80 border border-[#2a2d33] text-[#8e8e93] hover:text-white transition"
                  title="Qayta boshlash"
                >
                  <RotateCw size={13} />
                </button>
              </div>
            </div>
          </div>

          {/* Time Modes Cards Grid (Direct from flowty.co) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
            {TIME_MODES.map((mode) => {
              const isActive = activeMode.id === mode.id;
              return (
                <div
                  key={mode.id}
                  onClick={() => handleSelectMode(mode)}
                  className={`p-5 rounded-2xl cursor-pointer transition-all duration-300 border ${
                    isActive
                      ? 'bg-[#1c1e24] border-white shadow-[0_8px_30px_rgba(0,0,0,0.5)] scale-[1.02]'
                      : 'bg-[#121317] hover:bg-[#17191d] border-[#2a2d33]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-mono tracking-widest text-[#8e8e93] uppercase">
                      {mode.tag}
                    </span>
                    <span className={`w-2 h-2 rounded-full ${isActive ? 'bg-white animate-pulse' : 'bg-[#2a2d33]'}`} />
                  </div>

                  <div className="text-lg font-bold text-white tracking-tight mb-1">
                    {mode.name}
                  </div>

                  <div className="flex items-center gap-3 text-xs font-mono text-[#ceced7] mt-3 pt-3 border-t border-[#2a2d33]/60">
                    <div>
                      <span className="text-white font-bold text-sm">{mode.durationMinutes}</span>
                      <span className="text-[#8e8e93] ml-1">daqiq fokus</span>
                    </div>
                    <span className="text-[#2a2d33]">•</span>
                    <div>
                      <span className="text-white font-bold text-sm">{mode.restMinutes}</span>
                      <span className="text-[#8e8e93] ml-1">daqiq dam</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* ================= 4. BOTTOM INTERACTIVE TIMELINE & CHAPTER SCRUBBER ================= */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#121317] border border-[#2a2d33] flex flex-col sm:flex-row items-center justify-between gap-5">
            
            {/* Chapter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto scrollbar-none">
              {CHAPTERS.map((ch, idx) => {
                const isCurrent = activeChapterIndex === idx;
                return (
                  <button
                    key={ch.id}
                    onClick={() => {
                      setIsAutoRotating(false);
                      setActiveChapterIndex(idx);
                      setScrollProgress(idx * 25 + 10);
                      playChime(480 + idx * 40);
                    }}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition border ${
                      isCurrent
                        ? 'bg-white text-black font-semibold border-white shadow-md'
                        : 'bg-black/40 text-[#8e8e93] hover:text-white border-[#2a2d33]'
                    }`}
                  >
                    <span>{ch.numeral}. {ch.headlinePrefix}</span>
                  </button>
                );
              })}
            </div>

            {/* Manual 3D Perspective Scrubber Slider */}
            <div className="flex items-center gap-3 w-full sm:w-80">
              <span className="text-[11px] font-mono text-[#8e8e93] whitespace-nowrap">3D Perspektiva:</span>
              <input
                type="range"
                min="0"
                max="100"
                value={scrollProgress}
                onChange={(e) => {
                  setIsAutoRotating(false);
                  const val = Number(e.target.value);
                  setScrollProgress(val);
                  setActiveChapterIndex(Math.min(3, Math.floor((val / 100) * 4)));
                }}
                className="flex-1 accent-white h-1.5 bg-[#2a2d33] rounded-lg cursor-pointer"
              />
              <span className="text-[11px] font-mono text-white w-8 text-right font-bold">
                {Math.round(scrollProgress)}%
              </span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

export default FlowtyScrollExperience;
