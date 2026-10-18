import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  Square, 
  Volume2, 
  VolumeX, 
  Mic, 
  Sparkles, 
  Copy, 
  Check, 
  RotateCcw, 
  Download, 
  Sliders, 
  Activity, 
  Share2, 
  Bot, 
  Cpu, 
  Zap, 
  FileText,
  Radio
} from 'lucide-react';

const PRESET_SCRIPTS = [
  {
    id: 'apple-intelligence',
    title: 'Apple Intelligence',
    badge: 'Neyron Sintez',
    text: "Apple Intelligence bilan yangi iPhone 16 Pro Max tajribasi. Shaxsiy, maxfiy va favqulodda kuchli sun'iy intellekt arxitekturasi sizning kundalik vazifalaringizni yangi bosqichga olib chiqadi."
  },
  {
    id: 'titanium-craft',
    title: 'Titanium Atelier',
    badge: '5-Darajali Titan',
    text: "Aviatsiya darajasidagi 5-darajali titan korpus. Mikro-qum zarbli nozik ishlov berish, PVD qoplama va qo'lda sayqallangan Obsidian qirralar — mukammallikning eng yuqori ifodasi."
  },
  {
    id: 'a18-pro',
    title: 'A18 Pro Arxitekturasi',
    badge: '3nm Pro Chip',
    text: "A18 Pro protsessori — 6 yadroli kuchaytirilgan GPU, 16 yadroli yangi Neural Engine va soniyasiga 35 trillion operatsiyalar tezligi. Mobil grafikaning yangi davri boshlandi."
  },
  {
    id: 'spatial-audio',
    title: 'Spatial Audio Studio',
    badge: 'Fazoviy Akustika',
    text: "To'rt tomonlama studiya mikrofonlari va B&O BeoSound fazoviy akustikasi orqali har bir tovush to'lqini 24-bit 96 kilogerts yuqori aniqlikda jarang sochadi."
  }
];

const VOICE_PERSONAS = [
  {
    id: 'siri-titanium',
    name: 'Siri Space Titanium',
    type: 'Neyron Ayol Ovozi',
    desc: 'Kristal toza, mayin va tabiiy diksiya',
    pitch: 1.05,
    langPref: ['en-US', 'en-GB', 'uz', 'ru-RU']
  },
  {
    id: 'studio-obsidian',
    name: 'Studio Master Obsidian',
    type: 'Akustik Erkak Ovozi',
    desc: 'Chuqur bas, studiya darajasidagi issiq tembr',
    pitch: 0.85,
    langPref: ['en-US', 'en-GB', 'ru-RU']
  },
  {
    id: 'neural-pure',
    name: 'Apple Neural Pure',
    type: 'Zamonaviy Neyron Ovoz',
    desc: 'Yuqori aniqlikdagi ravshan va texnologik ifoda',
    pitch: 1.0,
    langPref: ['en-US', 'ru-RU']
  }
];

export const TextToSpeechStudio = () => {
  const [text, setText] = useState(PRESET_SCRIPTS[0].text);
  const [selectedPersona, setSelectedPersona] = useState(VOICE_PERSONAS[0].id);
  const [speed, setSpeed] = useState(1.0);
  const [volume, setVolume] = useState(85);
  const [isMuted, setIsMuted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeWordIndex, setActiveWordIndex] = useState(-1);
  const [copied, setCopied] = useState(false);
  const [exported, setExported] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState(0); // seconds
  const [duration, setDuration] = useState(14); // estimated seconds

  const [availableVoices, setAvailableVoices] = useState([]);
  const animFrameRef = useRef(null);
  const progressIntervalRef = useRef(null);
  const utteranceRef = useRef(null);

  // Generate 42 waveform bar base heights
  const [waveformBars, setWaveformBars] = useState(() => {
    return Array.from({ length: 42 }, (_, i) => {
      const centerFactor = 1 - Math.abs(i - 20) / 22;
      return Math.max(16, Math.floor(centerFactor * 68 + Math.sin(i * 0.4) * 18));
    });
  });

  // Calculate word array
  const words = text.trim().split(/\s+/).filter(Boolean);

  // Estimate duration based on word count & speed
  useEffect(() => {
    const est = Math.max(4, Math.round((words.length / (2.6 * speed))));
    setDuration(est);
  }, [words.length, speed]);

  // Load browser voices
  useEffect(() => {
    const updateVoices = () => {
      if (typeof window !== 'undefined' && window.speechSynthesis) {
        const vList = window.speechSynthesis.getVoices();
        setAvailableVoices(vList);
      }
    };

    updateVoices();
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.onvoiceschanged = updateVoices;
    }
  }, []);

  // Real-time Waveform Animation when playing
  useEffect(() => {
    if (isPlaying) {
      let step = 0;
      const animateWaveform = () => {
        step += 0.15;
        setWaveformBars(() => {
          return Array.from({ length: 42 }, (_, i) => {
            const centerDist = Math.abs(i - 20) / 22;
            const wave = Math.sin(step * 2 + i * 0.45) * 22;
            const noise = Math.cos(step * 3.1 + i * 0.7) * 16;
            const base = (1 - centerDist * 0.65) * 60;
            return Math.min(84, Math.max(14, Math.floor(base + wave + noise)));
          });
        });
        animFrameRef.current = requestAnimationFrame(animateWaveform);
      };
      animFrameRef.current = requestAnimationFrame(animateWaveform);
    } else {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      // Reset to calm resting waveform
      setWaveformBars(Array.from({ length: 42 }, (_, i) => {
        const centerFactor = 1 - Math.abs(i - 20) / 22;
        return Math.max(16, Math.floor(centerFactor * 52 + Math.sin(i * 0.4) * 14));
      }));
    }

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [isPlaying]);

  // Speech playback & progress tracking
  const handlePlay = () => {
    if (!text.trim()) return;

    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(text);
      const persona = VOICE_PERSONAS.find((p) => p.id === selectedPersona);
      
      utterance.rate = speed;
      utterance.pitch = persona ? persona.pitch : 1.0;
      utterance.volume = isMuted ? 0 : volume / 100;

      // Select suitable voice
      if (availableVoices.length > 0) {
        const matched = availableVoices.find(v => 
          persona.langPref.some(lang => v.lang.toLowerCase().startsWith(lang.toLowerCase()))
        ) || availableVoices[0];
        if (matched) utterance.voice = matched;
      }

      utterance.onstart = () => {
        setIsPlaying(true);
        setCurrentTime(0);
        setProgress(0);
        setActiveWordIndex(0);
      };

      utterance.onboundary = (e) => {
        if (e.name === 'word') {
          const charIndex = e.charIndex;
          let countedChars = 0;
          for (let i = 0; i < words.length; i++) {
            countedChars += words[i].length + 1;
            if (countedChars >= charIndex) {
              setActiveWordIndex(i);
              break;
            }
          }
        }
      };

      utterance.onend = () => {
        setIsPlaying(false);
        setActiveWordIndex(-1);
        setProgress(100);
        setCurrentTime(duration);
        clearInterval(progressIntervalRef.current);
      };

      utterance.onerror = () => {
        setIsPlaying(false);
        setActiveWordIndex(-1);
        clearInterval(progressIntervalRef.current);
      };

      utteranceRef.current = utterance;
      window.speechSynthesis.speak(utterance);
    }

    // Interval to smoothly drive timer & scrubber if speech synthesis boundary is sparse
    clearInterval(progressIntervalRef.current);
    const startMs = Date.now();
    const totalMs = duration * 1000;

    progressIntervalRef.current = setInterval(() => {
      const elapsedMs = Date.now() - startMs;
      const pct = Math.min(100, (elapsedMs / totalMs) * 100);
      const currentSec = Math.min(duration, Math.floor(elapsedMs / 1000));
      setProgress(pct);
      setCurrentTime(currentSec);

      // Estimated word tracking fallback
      if (words.length > 0) {
        const wordIdx = Math.min(words.length - 1, Math.floor((pct / 100) * words.length));
        setActiveWordIndex(wordIdx);
      }

      if (pct >= 100) {
        clearInterval(progressIntervalRef.current);
        setIsPlaying(false);
      }
    }, 100);

    setIsPlaying(true);
  };

  const handleStop = () => {
    if (typeof window !== 'undefined' && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    clearInterval(progressIntervalRef.current);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
    setActiveWordIndex(-1);
  };

  const handleScrub = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    setProgress(newPct);
    const newTime = Math.round((newPct / 100) * duration);
    setCurrentTime(newTime);
    const wordIdx = Math.min(words.length - 1, Math.floor((newPct / 100) * words.length));
    setActiveWordIndex(wordIdx);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExport = () => {
    setExported(true);
    // Simulate instant download trigger
    const blob = new Blob([`[iLux Apple Atelier Voice Engine]\nText: ${text}\nPersona: ${selectedPersona}\nSpeed: ${speed}x\nDuration: ${duration}s`], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `siri-neural-voice-${Date.now()}.txt`;
    a.click();
    setTimeout(() => setExported(false), 2200);
  };

  const formatTimer = (sec) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <section className="relative py-28 bg-[#000000] border-t border-[#1d1d1f] overflow-hidden text-white select-none">
      {/* Background Titanium Glow Lines */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[720px] h-[360px] bg-gradient-to-b from-[#3a3a3c] to-transparent rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-1/4 w-[420px] h-[220px] bg-[#2c2c2e] rounded-full blur-[120px]" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6">
        
        {/* Header Badge & Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1c1c1e] border border-[#3a3a3c] text-xs font-mono tracking-widest text-[#d2d2d7] uppercase mb-5 shadow-inner">
            <Bot size={13} className="text-white animate-pulse" />
            <span>Apple Intelligence & Siri Atelier Engine</span>
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
          </div>

          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-white mb-4">
            Siri Neural Voice Studio
          </h2>
          <p className="text-[#86868b] text-base sm:text-lg max-w-2xl mx-auto font-normal">
            Matnni jonli ovoz to'lqiniga aylantiring. Haqiqiy neyron sintez, to'liq to'lqin vizualizatsiyasi va studiya darajasidagi akustik nazorat.
          </p>
        </div>

        {/* Main Studio Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Script Input & Presets (7 Cols) */}
          <div className="lg:col-span-7 bg-[#0c0c0e] border border-[#2c2c2e] rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl relative">
            
            {/* Top Toolbar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#1c1c1e] mb-5">
              <div className="flex items-center gap-2">
                <FileText size={16} className="text-[#86868b]" />
                <span className="text-xs font-mono uppercase tracking-wider text-[#86868b]">Matn Ssenariysi</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1c1e] hover:bg-[#2c2c2e] text-[#d2d2d7] hover:text-white text-xs transition border border-[#3a3a3c]"
                  title="Matnni nusxalash"
                >
                  {copied ? <Check size={12} className="text-white" /> : <Copy size={12} />}
                  <span>{copied ? 'Nusxalandi' : 'Nusxa'}</span>
                </button>
                <button
                  onClick={() => setText('')}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#1c1c1e] hover:bg-[#2c2c2e] text-[#86868b] hover:text-white text-xs transition border border-[#3a3a3c]"
                  title="Tozalash"
                >
                  <RotateCcw size={12} />
                  <span>Tozalash</span>
                </button>
              </div>
            </div>

            {/* Presets Chips */}
            <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-4 scrollbar-none">
              <span className="text-xs text-[#86868b] whitespace-nowrap mr-1 font-mono">Namunalar:</span>
              {PRESET_SCRIPTS.map((preset) => (
                <button
                  key={preset.id}
                  onClick={() => {
                    handleStop();
                    setText(preset.text);
                  }}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition border ${
                    text === preset.text
                      ? 'bg-white text-black border-white shadow-sm'
                      : 'bg-[#161618] text-[#86868b] hover:text-white border-[#2c2c2e] hover:border-[#515154]'
                  }`}
                >
                  {preset.title}
                </button>
              ))}
            </div>

            {/* Textarea Input */}
            <div className="relative mb-4">
              <textarea
                value={text}
                onChange={(e) => {
                  setText(e.target.value);
                  if (isPlaying) handleStop();
                }}
                rows={5}
                placeholder="Bu yerga istalgan matnni yozing..."
                className="w-full bg-[#141416] border border-[#2c2c2e] focus:border-[#86868b] rounded-2xl p-4 text-sm sm:text-base text-white placeholder-[#515154] leading-relaxed resize-none focus:outline-none transition font-sans"
              />
              <div className="flex items-center justify-between text-xs text-[#86868b] px-1 mt-1 font-mono">
                <span>{text.length} / 1000 belgi</span>
                <span>{words.length} so'z • ~{duration}s o'qish vaqti</span>
              </div>
            </div>

            {/* Live Interactive Transcription Viewer (Karaoke Highlighting) */}
            <div className="mt-5 p-4 rounded-2xl bg-[#141416]/80 border border-[#222226]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase tracking-wider text-[#86868b] flex items-center gap-1.5">
                  <Activity size={12} className={isPlaying ? 'text-white animate-pulse' : 'text-[#86868b]'} />
                  Sinxron Ovoz Matni
                </span>
                <span className="text-xs text-[#86868b] font-mono">
                  {isPlaying ? 'Jonli Sinxronlash' : 'Kutish holati'}
                </span>
              </div>

              <div className="text-sm leading-relaxed text-[#86868b] min-h-[58px]">
                {words.map((word, idx) => {
                  const isCurrent = idx === activeWordIndex;
                  const isPast = idx < activeWordIndex;
                  return (
                    <span
                      key={idx}
                      className={`inline-block mr-1.5 transition-all duration-150 ${
                        isCurrent
                          ? 'text-white font-semibold bg-white/20 px-1 py-0.5 rounded shadow-sm scale-105'
                          : isPast
                          ? 'text-[#d2d2d7]'
                          : 'text-[#515154]'
                      }`}
                    >
                      {word}
                    </span>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Right Column: Audio Waveform, Persona Switcher & Controls (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Waveform Player Card */}
            <div className="bg-[#0c0c0e] border border-[#2c2c2e] rounded-3xl p-6 sm:p-7 backdrop-blur-2xl shadow-2xl relative overflow-hidden">
              
              {/* Persona Selector Tabs */}
              <div className="mb-6">
                <label className="text-xs font-mono uppercase tracking-wider text-[#86868b] block mb-3 flex items-center gap-2">
                  <Cpu size={14} />
                  Ovoz Shaxsiyati (Persona)
                </label>
                <div className="grid grid-cols-1 gap-2">
                  {VOICE_PERSONAS.map((persona) => {
                    const isSelected = selectedPersona === persona.id;
                    return (
                      <button
                        key={persona.id}
                        onClick={() => {
                          setSelectedPersona(persona.id);
                          if (isPlaying) handleStop();
                        }}
                        className={`text-left p-3 rounded-2xl transition border flex items-center justify-between ${
                          isSelected
                            ? 'bg-white text-black border-white shadow-lg'
                            : 'bg-[#141416] text-white border-[#2c2c2e] hover:border-[#515154]'
                        }`}
                      >
                        <div>
                          <div className={`text-xs font-semibold ${isSelected ? 'text-black' : 'text-white'}`}>
                            {persona.name}
                          </div>
                          <div className={`text-[11px] ${isSelected ? 'text-[#3a3a3c]' : 'text-[#86868b]'}`}>
                            {persona.desc}
                          </div>
                        </div>
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border ${
                          isSelected ? 'border-black/30 bg-black/10 text-black' : 'border-[#3a3a3c] bg-[#1c1c1e] text-[#86868b]'
                        }`}>
                          {persona.type}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Waveform Visualizer (Centerpiece) */}
              <div className="bg-[#141416] rounded-2xl p-5 border border-[#222226] mb-6">
                <div className="flex items-center justify-between text-xs font-mono text-[#86868b] mb-4">
                  <span className="flex items-center gap-1.5 text-white">
                    <Radio size={12} className={isPlaying ? 'text-white animate-pulse' : 'text-[#86868b]'} />
                    24-Bit / 96kHz Lossless
                  </span>
                  <span>{formatTimer(currentTime)} / {formatTimer(duration)}</span>
                </div>

                {/* Waveform Equalizer Bars */}
                <div 
                  onClick={handleScrub}
                  className="h-24 flex items-center justify-between gap-1 cursor-pointer py-2 px-1 rounded-lg hover:bg-white/5 transition"
                  title="Vaqt shkalasi bo'yicha siljiting"
                >
                  {waveformBars.map((height, i) => {
                    const barPct = (i / waveformBars.length) * 100;
                    const isPassed = barPct <= progress;
                    return (
                      <div
                        key={i}
                        style={{ height: `${height}px` }}
                        className={`w-1 sm:w-1.5 rounded-full transition-all duration-75 ${
                          isPassed
                            ? 'bg-gradient-to-t from-white via-[#d2d2d7] to-[#86868b] shadow-[0_0_8px_rgba(255,255,255,0.4)]'
                            : 'bg-[#2c2c2e]'
                        }`}
                      />
                    );
                  })}
                </div>

                {/* Scrubbing Track Line */}
                <div 
                  onClick={handleScrub}
                  className="relative h-1.5 bg-[#2c2c2e] rounded-full mt-4 cursor-pointer overflow-hidden"
                >
                  <div 
                    style={{ width: `${progress}%` }}
                    className="absolute top-0 left-0 h-full bg-white transition-all duration-100"
                  />
                </div>
              </div>

              {/* Speed Multiplier & Volume Controls */}
              <div className="flex items-center justify-between gap-4 mb-6">
                {/* Speed Chips */}
                <div className="flex items-center gap-1 bg-[#141416] p-1 rounded-xl border border-[#222226]">
                  {[0.75, 1.0, 1.25, 1.5, 2.0].map((s) => (
                    <button
                      key={s}
                      onClick={() => setSpeed(s)}
                      className={`px-2.5 py-1 rounded-lg text-xs font-mono transition ${
                        speed === s
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-[#86868b] hover:text-white'
                      }`}
                    >
                      {s}x
                    </button>
                  ))}
                </div>

                {/* Volume Slider */}
                <div className="flex items-center gap-2">
                  <button 
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-1.5 text-[#86868b] hover:text-white transition"
                  >
                    {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                  </button>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={isMuted ? 0 : volume}
                    onChange={(e) => {
                      setVolume(Number(e.target.value));
                      if (isMuted) setIsMuted(false);
                    }}
                    className="w-20 accent-white h-1 bg-[#2c2c2e] rounded-lg cursor-pointer"
                  />
                </div>
              </div>

              {/* Main Playback Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={isPlaying ? handleStop : handlePlay}
                  className="flex-1 py-3.5 px-6 rounded-2xl bg-white hover:bg-[#f5f5f7] text-black font-semibold text-sm tracking-wide transition shadow-xl flex items-center justify-center gap-2 active:scale-[0.98]"
                >
                  {isPlaying ? (
                    <>
                      <Pause size={16} className="fill-black" />
                      <span>To'xtatish</span>
                    </>
                  ) : (
                    <>
                      <Play size={16} className="fill-black" />
                      <span>Ovozda Tinglash</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleStop}
                  disabled={!isPlaying && progress === 0}
                  className="p-3.5 rounded-2xl bg-[#141416] hover:bg-[#1c1c1e] text-[#86868b] hover:text-white transition border border-[#2c2c2e] disabled:opacity-40"
                  title="Qayta tiklash"
                >
                  <Square size={16} />
                </button>

                <button
                  onClick={handleExport}
                  className="p-3.5 rounded-2xl bg-[#141416] hover:bg-[#1c1c1e] text-[#86868b] hover:text-white transition border border-[#2c2c2e]"
                  title="WAV / Skript eksport qilish"
                >
                  {exported ? <Check size={16} className="text-white" /> : <Download size={16} />}
                </button>
              </div>

              {/* Status Note */}
              <div className="mt-4 text-center">
                <p className="text-[11px] text-[#515154] font-mono">
                  Apple Neural Engine • Ovoz kechikishi &lt; 2ms • Zero-Lag
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
