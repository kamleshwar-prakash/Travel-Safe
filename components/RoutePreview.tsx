
import React, { useState } from 'react';
import { Play, Clock, MapPin, X, Navigation, ShieldCheck, AlertTriangle } from 'lucide-react';
import { SafetyDataService } from '../services/SafetyDataService';

interface RoutePreviewProps {
  destination: string;
  duration: string;
  distance: string;
  onStart: () => void;
  onCancel: () => void;
}

const RoutePreview: React.FC<RoutePreviewProps> = ({ destination, duration, distance, onStart, onCancel }) => {
  const [isSafestRoute, setIsSafestRoute] = useState(false);
  
  // Mock Risk Analysis
  const riskAnalysis = SafetyDataService.calculateRouteRisk([0,0], [0,0]);
  const safetyScore = isSafestRoute ? Math.max(0, riskAnalysis.score - 20) : riskAnalysis.score;

  return (
    <div className="absolute bottom-0 left-0 right-0 z-[2000] p-4 pb-8 animate-in slide-in-from-bottom-10 duration-500">
      <div className="bg-white rounded-[2.5rem] p-6 shadow-[0_-10px_40px_rgba(0,0,0,0.1)] border border-slate-100">
        
        {/* Header / Destination */}
        <div className="flex justify-between items-start mb-6">
           <div className="flex gap-4">
              <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-red-500 border border-red-100">
                 <MapPin size={24} fill="currentColor" />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Destination</p>
                 <h2 className="text-2xl font-black text-slate-900 leading-none">{destination}</h2>
                 <p className="text-xs font-bold text-slate-500 mt-1">National Highway 44, New Delhi</p>
              </div>
           </div>
           <button onClick={onCancel} className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500 hover:bg-slate-200">
              <X size={20} />
           </button>
        </div>

        {/* Safety Guarantee Card */}
        <div className={`mb-6 p-4 rounded-2xl border transition-all duration-300 ${
            safetyScore > 50 
               ? 'bg-amber-50 border-amber-100' 
               : 'bg-indigo-50 border-indigo-100'
        }`}>
           <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                 <ShieldCheck size={18} className={safetyScore > 50 ? "text-amber-600" : "text-indigo-600"} />
                 <span className={`text-xs font-black uppercase tracking-widest ${
                     safetyScore > 50 ? "text-amber-700" : "text-indigo-700"
                 }`}>Route Safety Score</span>
              </div>
              <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  safetyScore > 50 
                     ? 'bg-amber-200 text-amber-800' 
                     : 'bg-indigo-200 text-indigo-800'
              }`}>
                  {safetyScore > 50 ? 'Medium Risk' : 'High Safety'}
              </div>
           </div>
           
           <p className="text-xs font-bold text-slate-600 mb-3 leading-relaxed">
              {safetyScore > 50 
                 ? "Route contains unlit sections and high-accident zones." 
                 : "Verified safe route with frequent patrols and lighting."}
           </p>

           <div className="flex items-center gap-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                 <div className={`w-10 h-6 rounded-full p-1 transition-colors duration-300 ${isSafestRoute ? 'bg-indigo-600' : 'bg-slate-300'}`}>
                    <div className={`w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-300 ${isSafestRoute ? 'translate-x-4' : 'translate-x-0'}`}></div>
                 </div>
                 <input type="checkbox" className="hidden" checked={isSafestRoute} onChange={() => setIsSafestRoute(!isSafestRoute)} />
                 <span className="text-xs font-bold text-slate-500 group-hover:text-indigo-600 transition-colors">
                    Prioritize Safety (+12 min)
                 </span>
              </label>
           </div>
        </div>

        {/* Route Stats */}
        <div className="flex items-center gap-6 mb-8">
           <div className="flex-1 bg-emerald-50 p-4 rounded-2xl border border-emerald-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                 <Clock size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-emerald-700 tracking-widest">Duration</p>
                 <p className="text-xl font-black text-emerald-900">{duration}</p>
              </div>
           </div>
           
           <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-600 shadow-sm">
                 <Navigation size={20} />
              </div>
              <div>
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Distance</p>
                 <p className="text-xl font-black text-slate-900">{distance}</p>
              </div>
           </div>
        </div>

        {/* Start Button */}
        <button 
          onClick={onStart}
          className="w-full bg-indigo-600 text-white py-5 rounded-2xl font-black text-lg shadow-xl shadow-indigo-200 active:scale-95 transition-all flex items-center justify-center gap-3 hover:bg-indigo-700"
        >
           <Play size={24} fill="currentColor" /> Start Navigation
        </button>

      </div>
    </div>
  );
};

export default RoutePreview;
