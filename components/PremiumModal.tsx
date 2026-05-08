
import React from 'react';
import { X, Check, Shield, Zap, Map, Crown } from 'lucide-react';

interface PremiumModalProps {
  onClose: () => void;
}

const PremiumModal: React.FC<PremiumModalProps> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-[3000] bg-slate-900/80 backdrop-blur-xl flex items-center justify-center p-6 animate-in zoom-in-95 duration-300">
      <div className="bg-white w-full max-w-sm rounded-[2.5rem] overflow-hidden relative shadow-2xl">
        <button onClick={onClose} className="absolute top-6 right-6 w-8 h-8 bg-black/10 rounded-full flex items-center justify-center text-slate-900 z-20">
             <X size={16} />
        </button>
        
        <div className="bg-gradient-to-br from-amber-200 via-yellow-400 to-amber-600 p-8 pb-12 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/20 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <div className="relative z-10 mt-4">
             <div className="w-12 h-12 bg-white/30 backdrop-blur-md rounded-2xl flex items-center justify-center text-amber-900 mb-4 border border-white/40 shadow-xl">
               <Crown size={24} fill="currentColor" />
             </div>
             <h2 className="text-3xl font-black text-amber-950 leading-none mb-2">Voyager <br/>Gold</h2>
             <p className="text-amber-800 font-bold text-xs opacity-80">The ultimate safety companion.</p>
           </div>
        </div>

        <div className="px-8 py-8 -mt-6 bg-white rounded-t-[2rem] relative z-10">
           <div className="space-y-5 mb-10">
             <FeatureItem icon={<Shield size={16} />} text="Priority Police & SOS Dispatch" />
             <FeatureItem icon={<Map size={16} />} text="Unlimited Offline Regional Maps" />
             <FeatureItem icon={<Zap size={16} />} text="Real-time Radar & Speed Traps" />
             <FeatureItem icon={<Check size={16} />} text="Ad-Free Experience" />
           </div>

           <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-6 flex justify-between items-center">
              <div>
                 <p className="text-xs font-black text-slate-400 decoration-slate-400 line-through">₹299/mo</p>
                 <p className="text-xl font-black text-slate-900">₹149<span className="text-xs text-slate-500 font-bold">/mo</span></p>
              </div>
              <div className="bg-emerald-100 text-emerald-700 text-[10px] font-black px-2 py-1 rounded-lg uppercase">
                Save 50%
              </div>
           </div>

           <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 transition-all">
             Start Free Trial
           </button>
           <p className="text-[10px] text-center text-slate-400 font-bold mt-4">7 days free, then ₹149/mo. Cancel anytime.</p>
        </div>
      </div>
    </div>
  );
};

const FeatureItem: React.FC<{ icon: React.ReactNode, text: string }> = ({ icon, text }) => (
  <div className="flex items-center gap-4">
    <div className="w-8 h-8 bg-amber-50 rounded-full flex items-center justify-center text-amber-600 shrink-0">
      {icon}
    </div>
    <span className="text-sm font-bold text-slate-700">{text}</span>
  </div>
);

export default PremiumModal;
