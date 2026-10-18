import React, { useState } from 'react';
import { 
  Sparkles, 
  Layers, 
  Compass, 
  Headphones, 
  Volume2, 
  Bot, 
  RotateCw,
  ChevronRight
} from 'lucide-react';
import { InteractiveProductStudio } from './InteractiveProductStudio';
import { FlowtyScrollExperience } from './FlowtyScrollExperience';
import { AirPodsMaxStudio } from './AirPodsMaxStudio';
import { AcousticStudio } from './AcousticStudio';
import { TextToSpeechStudio } from './TextToSpeechStudio';

const STUDIO_TABS = [
  {
    id: '360-studio',
    label: '360° Titan Studio',
    subtitle: 'Ko\'p burchakli titan sayqali',
    icon: RotateCw,
    badge: '360° INSPECTOR'
  },
  {
    id: 'flowty-3d',
    label: '3D Kinetik Skroll',
    subtitle: 'Flowty 3D harakat fizikasi',
    icon: Compass,
    badge: '3D PERSPECTIVE'
  },
  {
    id: 'airpods-max',
    label: 'AirPods Max Studio',
    subtitle: 'Ikki tomonlama akustik ko\'rinish',
    icon: Headphones,
    badge: 'DUAL ANGLE'
  },
  {
    id: 'acoustic-bno',
    label: 'B&O Akustika',
    subtitle: '360° sensorli ovoz diski',
    icon: Volume2,
    badge: '432HZ CHIME'
  },
  {
    id: 'siri-tts',
    label: 'Siri Ovoz Sintezi',
    subtitle: 'Neyron matn va to\'lqin ekvalayzeri',
    icon: Bot,
    badge: 'NEURAL TTS'
  }
];

export const AtelierStudioHub = ({
  currency,
  onAddToCart,
  onFastBuy,
  onSelectCategory
}) => {
  const [activeTab, setActiveTab] = useState('360-studio');

  return (
    <section className="relative py-16 bg-[#000000] border-t border-[#1d1d1f] text-white select-none">
      
      {/* Studio Header & Apple Nav Switcher */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        
        <div className="text-center max-w-3xl mx-auto mb-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#18181b] border border-[#2c2c2e] text-xs font-mono tracking-widest text-[#d2d2d7] uppercase mb-3">
            <Sparkles size={13} className="text-white animate-pulse" />
            <span>iLux Interactive Design & Audio Lab</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-3">
            Apple Atelier Interaktiv Studiyalar
          </h2>
          <p className="text-[#86868b] text-sm sm:text-base">
            Barcha flagman tajribalar bitta joyda: 360° burchaklar, 3D skroll, fazoviy akustika va sun'iy intellekt ovoz sintezi.
          </p>
        </div>

        {/* Apple Style Pill Navigation Bar */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none">
          {STUDIO_TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 sm:px-5 py-3 rounded-2xl text-xs sm:text-sm font-medium transition-all duration-300 flex items-center gap-2.5 whitespace-nowrap border ${
                  isActive
                    ? 'bg-white text-black font-semibold border-white shadow-xl scale-105'
                    : 'bg-[#121214] text-[#86868b] hover:text-white border-[#27272a] hover:border-[#3f3f46]'
                }`}
              >
                <Icon size={16} className={isActive ? 'text-black' : 'text-[#86868b]'} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

      </div>

      {/* Active Studio Rendering Container (Clean, Fast & Zero-Lag) */}
      <div className="relative w-full">
        {activeTab === '360-studio' && (
          <InteractiveProductStudio
            currency={currency}
            onAddToCart={onAddToCart}
            onFastBuy={onFastBuy}
          />
        )}

        {activeTab === 'flowty-3d' && (
          <FlowtyScrollExperience
            onSelectCategory={onSelectCategory}
            onFastBuy={onFastBuy}
          />
        )}

        {activeTab === 'airpods-max' && (
          <AirPodsMaxStudio
            currency={currency}
            onAddToCart={onAddToCart}
            onFastBuy={onFastBuy}
          />
        )}

        {activeTab === 'acoustic-bno' && (
          <AcousticStudio
            currency={currency}
            onAddToCart={onAddToCart}
            onFastBuy={onFastBuy}
          />
        )}

        {activeTab === 'siri-tts' && (
          <TextToSpeechStudio />
        )}
      </div>

    </section>
  );
};
