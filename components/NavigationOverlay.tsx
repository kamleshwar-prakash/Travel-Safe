
import React from 'react';
import { Navigation as NavIcon, X, MapPin, Clock, Gauge, ShieldCheck, ArrowUp, ArrowRight, ArrowLeft } from 'lucide-react';

interface NavigationOverlayProps {
  destination: string;
  onStop: () => void;
}

const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ destination, onStop }) => {
  return (
    <div className="absolute inset-0 z-[2000] pointer-events-none flex flex-col justify-between pb-safe">
      
      {/* TOP HUD: Turn Instructions */}
      <div className="pt-14 px-4 w-full">
        <div className="bg-slate-900/95 text-white rounded-[2rem] shadow-2xl p-5 pointer-events-auto border border-white/10 backdrop-blur-3xl relative overflow-hidden animate-in slide-in-from-top-4 duration-500">
          {/* Subtle gradient accent */}
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-500"></div>
          
          <div className="flex items-start gap-5">
            {/* Turn Icon */}
            <div className="w-24 h-24 bg-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(79,70,229,0.4)] border border-white/20 shrink-0">
               <ArrowUp size={48} className="text-white" />
            </div>

            {/* Instruction Text */}
            <div className="flex-1 pt-1">
              <div className="flex items-baseline gap-2 mb-1">
                <span className="text-5xl font-black tracking-tighter">200</span>
                <span className="text-xl font-bold text-slate-400">meters</span>
              </div>
              <h2 className="text-2xl font-black leading-tight tracking-tight text-white mb-2">
                Turn Left at <span className="text-indigo-300">MG Road Junction</span>
              </h2>
            </div>

            <button 
              onClick={onStop}
              className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center hover:bg-white/10 active:scale-90 transition-all border border-white/10"
            >
              <X size={24} className="text-slate-300" />
            </button>
          </div>

          {/* Lane Guidance Visual */}
          <div className="mt-6 flex items-center gap-1 opacity-80">
            <div className="h-10 flex-1 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
              <ArrowLeft size={20} className="text-white opacity-20" />
            </div>
            <div className="h-10 flex-1 bg-indigo-600 rounded-lg border border-white/20 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.5)]">
              <ArrowUp size={24} className="text-white font-bold" />
            </div>
            <div className="h-10 flex-1 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
              <ArrowUp size={20} className="text-white opacity-20" />
            </div>
            <div className="h-10 flex-1 bg-white/5 rounded-lg border border-white/5 flex items-center justify-center">
              <ArrowRight size={20} className="text-white opacity-20" />
            </div>
          </div>
        </div>
        
        {/* Next Turn Preview */}
        <div className="mt-2 mx-4 bg-slate-800/90 backdrop-blur-md rounded-b-2xl rounded-t-lg p-3 flex items-center gap-3 border-x border-b border-white/10 shadow-lg animate-in slide-in-from-top-2 delay-100 duration-500">
           <ArrowRight size={18} className="text-slate-400" />
           <p className="text-xs font-bold text-slate-300">Then turn right onto Highway 44</p>
        </div>
      </div>

      {/* BOTTOM HUD: Dashboard */}
      <div className="px-4 pb-8 w-full animate-in slide-in-from-bottom-8 duration-500">
        
        {/* Average Speed Zone Widget (Mock) */}
        <div className="mb-4 mx-2">
           <div className="bg-slate-900/90 backdrop-blur-md text-white rounded-2xl p-4 border border-indigo-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
              <div className="flex justify-between items-center mb-2">
                 <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center animate-pulse">
                       <Gauge size={14} className="text-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest text-indigo-300">Average Speed Zone</span>
                 </div>
                 <span className="text-[10px] font-bold text-slate-400">5.4 km remaining</span>
              </div>
              <div className="flex items-end justify-between">
                 <div>
                    <div className="flex items-baseline gap-1">
                       <span className="text-2xl font-black text-white">87</span>
                       <span className="text-[10px] text-slate-400 font-bold">km/h avg</span>
                    </div>
                    <p className="text-[10px] text-red-400 font-bold mt-0.5">⚠️ 7 km/h over limit</p>
                 </div>
                 <div className="text-right">
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-1">Limit</p>
                    <div className="w-10 h-10 rounded-full border-2 border-red-500 flex items-center justify-center bg-white text-slate-900 font-black text-sm">
                       80
                    </div>
                 </div>
              </div>
              {/* Progress Bar */}
              <div className="mt-3 h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                 <div className="h-full bg-gradient-to-r from-indigo-500 to-indigo-300 w-[35%]"></div>
              </div>
           </div>
        </div>

        {/* Safety Indicator */}
        <div className="flex justify-center mb-4">
           <div className="bg-emerald-500/10 backdrop-blur-md border border-emerald-500/20 rounded-full px-4 py-1.5 flex items-center gap-2">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
              <ShieldCheck size={12} className="text-emerald-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-emerald-300">Safety Shield Active</span>
           </div>
        </div>

        {/* Main Dash */}
        <div className="bg-white rounded-[2.5rem] shadow-[0_0_50px_rgba(0,0,0,0.2)] p-2 pointer-events-auto flex items-stretch gap-2 border border-slate-100 h-28">
           
           {/* Speedometer */}
           <div className="w-28 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-5"></div>
              <span className="text-5xl font-black text-slate-900 leading-none z-10">68</span>
              <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mt-1 z-10">km/h</span>
              <div className="absolute bottom-2 w-12 h-1 bg-slate-200 rounded-full overflow-hidden">
                 <div className="h-full bg-indigo-600 w-[68%]"></div>
              </div>
           </div>

           {/* Route Info */}
           <div className="flex-1 bg-slate-900 rounded-[2rem] p-5 text-white flex flex-col justify-between relative overflow-hidden">
              <div className="absolute top-0 right-0 p-5 opacity-10">
                 <MapPin size={60} />
              </div>
              
              <div className="flex justify-between items-start z-10">
                 <div>
                    <div className="flex items-center gap-2 mb-1">
                       <Clock size={14} className="text-emerald-400" />
                       <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Arrival</span>
                    </div>
                    <span className="text-3xl font-black tracking-tight">14:52</span>
                    <span className="text-sm font-bold text-slate-500 ml-1">PM</span>
                 </div>
                 <div className="text-right">
                    <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Distance</div>
                    <span className="text-2xl font-black tracking-tight">6.4</span>
                    <span className="text-xs font-bold text-slate-500 ml-1">km</span>
                 </div>
              </div>

              <div className="w-full bg-white/10 h-1.5 rounded-full mt-2 overflow-hidden">
                 <div className="bg-gradient-to-r from-emerald-400 to-indigo-500 h-full w-[45%] rounded-full shadow-[0_0_10px_rgba(52,211,153,0.5)]"></div>
              </div>
           </div>
        </div>

        {/* Current Street */}
        <div className="mt-3 text-center">
           <div className="inline-block bg-slate-900/80 backdrop-blur-md text-white px-6 py-2 rounded-xl text-xs font-black uppercase tracking-widest border border-white/10 shadow-lg">
              Currently on <span className="text-indigo-300">National Highway 44</span>
           </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationOverlay;
