
import React, { useEffect, useState } from 'react';
import { ShieldCheck, Zap, Activity, Globe, MapPin, Navigation, Wifi } from 'lucide-react';

interface SplashScreenProps {
  onComplete: () => void;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState("System Boot");
  const [bgIndex, setBgIndex] = useState(0);

  const backgrounds = [
    "https://images.unsplash.com/photo-1495539406979-bf61750d38ad?auto=format&fit=crop&q=80&w=1600", // Dark Highway
    "https://images.unsplash.com/photo-1502877338535-766e1452684a?auto=format&fit=crop&q=80&w=1600", // Car Dashboard
    "https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&q=80&w=1600", // City Lights
    "https://images.unsplash.com/photo-1621905252507-b354bcadccea?auto=format&fit=crop&q=80&w=1600", // EV Station
  ];

  useEffect(() => {
    // Background rotation
    const bgInterval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % backgrounds.length);
    }, 2500);

    // Progress Simulation
    let currentProgress = 0;
    const progressInterval = setInterval(() => {
      currentProgress += Math.random() * 4;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(progressInterval);
        setTimeout(onComplete, 800); // Slight pause at 100% before unmount
      }
      setProgress(Math.min(currentProgress, 100));

      // Dynamic Text Updates based on progress
      if (currentProgress < 20) setLoadingText("Initializing Core Systems...");
      else if (currentProgress < 40) setLoadingText("Connecting to Satellite Grid...");
      else if (currentProgress < 60) setLoadingText("Downloading Regional Safety Data...");
      else if (currentProgress < 80) setLoadingText("Optimizing Neural Route Engine...");
      else setLoadingText("Welcome to TravelSafe.");
    }, 100);

    return () => {
      clearInterval(bgInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[5000] bg-slate-950 flex flex-col items-center justify-between overflow-hidden font-sans select-none">
      
      {/* CSS for Ken Burns Effect */}
      <style>{`
        @keyframes ken-burns {
          0% { transform: scale(1); }
          100% { transform: scale(1.15); }
        }
        .animate-ken-burns {
          animation: ken-burns 6s ease-out forwards;
        }
      `}</style>

      {/* Dynamic Cinematic Backgrounds */}
      <div className="absolute inset-0 z-0">
        {backgrounds.map((img, idx) => (
          <div 
            key={idx}
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms] ease-in-out ${idx === bgIndex ? 'opacity-100 animate-ken-burns' : 'opacity-0'}`}
            style={{ backgroundImage: `url(${img})` }}
          />
        ))}
        {/* Professional Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950/60 to-slate-950"></div>
        {/* Subtle Grid Texture */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay"></div>
      </div>

      {/* Top Status Bar */}
      <div className="relative z-10 w-full pt-12 px-8 flex justify-between items-start opacity-70">
        <div className="flex flex-col">
          <span className="text-[10px] font-mono text-emerald-500 mb-1 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
            SYSTEM ONLINE
          </span>
          <span className="text-[10px] font-mono text-slate-400">V.3.0.1 ALPHA</span>
        </div>
        <Globe size={20} className="text-slate-500 animate-spin-slow duration-[20s]" />
      </div>

      {/* Center Content: Brand */}
      <div className="relative z-20 flex flex-col items-center">
        <div className="relative mb-8 group">
          {/* Glowing Backdrops */}
          <div className="absolute -inset-4 bg-indigo-500/30 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -inset-1 bg-gradient-to-br from-indigo-500 to-emerald-500 rounded-[2rem] opacity-30 blur-md"></div>
          
          {/* Logo Container */}
          <div className="relative w-32 h-32 bg-slate-900/40 backdrop-blur-2xl rounded-[2.5rem] border border-white/10 flex items-center justify-center shadow-2xl">
             <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent rounded-[2.5rem]"></div>
             <ShieldCheck size={64} className="text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.5)]" />
             
             {/* Orbiting Elements */}
             <div className="absolute top-4 right-4 animate-ping">
               <Zap size={12} className="text-emerald-400" />
             </div>
          </div>
        </div>

        <h1 className="text-5xl font-black text-white tracking-tight mb-3 drop-shadow-xl text-center">
          Travel<span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Safe</span>
        </h1>
        <p className="text-sm font-medium text-slate-300 tracking-[0.3em] uppercase opacity-80 border-t border-white/10 pt-4 px-4">
          The Future of Navigation
        </p>
      </div>

      {/* Bottom Loading Section */}
      <div className="relative z-10 w-full max-w-xs mb-16 space-y-4">
        {/* Tech Stats Row */}
        <div className="flex justify-between items-end px-2">
          <div className="flex items-center gap-2 text-indigo-300">
             <Activity size={14} />
             <span className="text-[10px] font-mono font-bold uppercase tracking-widest truncate max-w-[150px]">{loadingText}</span>
          </div>
          <span className="text-2xl font-black text-white tabular-nums">{Math.floor(progress)}%</span>
        </div>

        {/* Premium Progress Bar */}
        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden relative">
          <div 
            className="h-full bg-gradient-to-r from-indigo-600 via-purple-500 to-emerald-400 shadow-[0_0_20px_rgba(99,102,241,0.6)] transition-all duration-300 ease-out relative"
            style={{ width: `${progress}%` }}
          >
             <div className="absolute top-0 right-0 h-full w-10 bg-white/50 blur-[4px]"></div>
          </div>
        </div>

        {/* Footer info */}
        <div className="flex justify-center gap-6 opacity-40 pt-4">
           <div className="flex items-center gap-1.5">
              <Wifi size={12} className="text-slate-300" />
              <span className="text-[9px] font-black uppercase text-slate-400">Sat-Link Active</span>
           </div>
           <div className="flex items-center gap-1.5">
              <MapPin size={12} className="text-slate-300" />
              <span className="text-[9px] font-black uppercase text-slate-400">GPS Calibrated</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default SplashScreen;
