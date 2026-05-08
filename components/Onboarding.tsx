import React, { useState } from 'react';
import { ArrowRight, Map, Shield, Zap, CheckCircle, Globe, MapPin, Bell } from 'lucide-react';

interface OnboardingProps {
  onComplete: () => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState<'LANG' | 'SLIDES' | 'PERMS'>('LANG');
  const [slide, setSlide] = useState(0);
  const [language, setLanguage] = useState('English');

  const slides = [
    {
      title: "Smart Navigation",
      desc: "AI-powered routing that adapts to real-time traffic, weather, and your vehicle type.",
      icon: <Map className="text-white" size={64} />,
      color: "bg-indigo-600",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Safety First",
      desc: "Real-time alerts for hazards, speed traps, and 24/7 SOS emergency assistance.",
      icon: <Shield className="text-white" size={64} />,
      color: "bg-emerald-600",
      image: "https://images.unsplash.com/photo-1625238241470-6537b8b42008?auto=format&fit=crop&q=80&w=1000"
    },
    {
      title: "Service Discovery",
      desc: "Find the best fuel, EV chargers, food, and stays along your route instantly.",
      icon: <Zap className="text-white" size={64} />,
      color: "bg-amber-500",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  const handleNextSlide = () => {
    if (slide < slides.length - 1) {
      setSlide(slide + 1);
    } else {
      setStep('PERMS');
    }
  };

  const handleLangSelect = (lang: string) => {
    setLanguage(lang);
    setStep('SLIDES');
  };

  if (step === 'LANG') {
    return (
      <div className="fixed inset-0 z-[5000] bg-slate-900 flex flex-col items-center justify-center p-8">
        <div className="w-24 h-24 bg-indigo-600 rounded-[2rem] flex items-center justify-center shadow-2xl mb-8">
          <Globe className="text-white" size={48} />
        </div>
        <h1 className="text-3xl font-black text-white mb-2">Select Language</h1>
        <p className="text-slate-400 mb-10 text-center">Choose your preferred language to continue.</p>
        
        <div className="w-full max-w-sm space-y-4">
          {['English', 'Hindi', 'Español', 'Français'].map((lang) => (
            <button 
              key={lang}
              onClick={() => handleLangSelect(lang)}
              className="w-full bg-white/10 hover:bg-white/20 text-white py-4 rounded-2xl font-bold border border-white/10 transition-all flex justify-between px-6 items-center"
            >
              {lang} <ArrowRight size={20} className="opacity-50" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (step === 'PERMS') {
    return (
      <div className="fixed inset-0 z-[5000] bg-slate-900 flex flex-col items-center justify-center p-8 text-center">
        <div className="mb-10 relative">
          <div className="w-32 h-32 bg-indigo-600/20 rounded-full absolute top-0 left-1/2 -translate-x-1/2 animate-ping"></div>
          <div className="w-32 h-32 bg-indigo-600 rounded-[2.5rem] flex items-center justify-center shadow-2xl relative z-10">
            <MapPin className="text-white" size={56} />
          </div>
        </div>
        
        <h1 className="text-3xl font-black text-white mb-4">Enable Location</h1>
        <p className="text-slate-300 text-lg mb-8 max-w-xs mx-auto">
          TravelSafe needs your location to provide turn-by-turn navigation and nearby safety alerts.
        </p>

        <div className="w-full max-w-sm space-y-3">
          <button 
            onClick={onComplete}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest shadow-lg shadow-indigo-500/30 active:scale-95 transition-all"
          >
            Allow Location Access
          </button>
          <button 
            onClick={onComplete}
            className="w-full bg-transparent text-slate-500 py-4 font-bold text-sm"
          >
            Not Now
          </button>
        </div>
        
        <div className="mt-8 flex items-center gap-2 text-slate-500 text-xs">
          <Bell size={12} />
          <span>We'll also ask for notifications later</span>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[5000] bg-slate-900 flex flex-col">
      {slides.map((s, i) => (
        <div 
          key={i}
          className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        >
          <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url(${s.image})` }}></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent"></div>
          
          <div className="absolute inset-0 flex flex-col items-center justify-end pb-32 px-8 text-center">
            <div className={`w-24 h-24 ${s.color} rounded-[2rem] flex items-center justify-center shadow-2xl mb-8 animate-bounce-slow`}>
              {s.icon}
            </div>
            <h1 className="text-4xl font-black text-white mb-4 leading-tight">{s.title}</h1>
            <p className="text-slate-300 text-lg font-medium leading-relaxed">{s.desc}</p>
          </div>
        </div>
      ))}

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-8 flex justify-between items-center z-10">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === slide ? 'w-8 bg-white' : 'w-2 bg-white/30'}`}></div>
          ))}
        </div>
        <button 
          onClick={handleNextSlide}
          className="bg-white text-slate-900 w-16 h-16 rounded-full flex items-center justify-center font-black shadow-xl active:scale-90 transition-all hover:bg-indigo-50"
        >
          {slide === slides.length - 1 ? <CheckCircle size={28} /> : <ArrowRight size={28} />}
        </button>
      </div>

      <button onClick={() => setStep('PERMS')} className="absolute top-12 right-8 text-white/50 font-bold text-sm uppercase tracking-widest z-10 hover:text-white transition-colors">
        Skip
      </button>
    </div>
  );
};

export default Onboarding;
