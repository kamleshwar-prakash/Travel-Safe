
import React, { useState } from 'react';
import { X, MapPin, Zap, Fuel, Sparkles, Navigation } from 'lucide-react';

interface TripPlannerModalProps {
  onClose: () => void;
  onPlanTrip: (details: any) => void;
}

const TripPlannerModal: React.FC<TripPlannerModalProps> = ({ onClose, onPlanTrip }) => {
  const [vehicle, setVehicle] = useState<'EV' | 'ICE'>('ICE');
  const [loading, setLoading] = useState(false);
  const [stops, setStops] = useState<string[]>(['']);

  const addStop = () => {
    if (stops.length < 5) {
      setStops([...stops, '']);
    }
  };

  const removeStop = (index: number) => {
    const newStops = [...stops];
    newStops.splice(index, 1);
    setStops(newStops);
  };

  const updateStop = (index: number, value: string) => {
    const newStops = [...stops];
    newStops[index] = value;
    setStops(newStops);
  };

  const handlePlan = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onPlanTrip({ vehicle, stops });
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-900/60 backdrop-blur-xl flex items-center justify-center p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-[2.5rem] shadow-2xl overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-600">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20"></div>
           <button onClick={onClose} className="absolute top-6 right-6 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-white backdrop-blur-md">
             <X size={20} />
           </button>
        </div>
        
        <div className="px-8 pt-8 pb-8 relative z-10 flex flex-col items-center max-h-[85vh] overflow-y-auto custom-scrollbar">
           <div className="w-20 h-20 bg-white rounded-[2rem] shadow-xl flex items-center justify-center text-indigo-600 mb-6 border-4 border-indigo-50 shrink-0">
             <Sparkles size={32} />
           </div>
           
           <h2 className="text-2xl font-black text-slate-900 mb-1">AI Trip Architect</h2>
           <p className="text-xs font-medium text-slate-400 text-center mb-8 px-4">
             We analyze traffic, weather, fuel prices, and safety data to build your perfect route.
           </p>

           <div className="w-full space-y-4 mb-4">
             <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4">
               <div className="w-2 h-2 rounded-full bg-emerald-500 shrink-0"></div>
               <input type="text" placeholder="Current Location" className="bg-transparent font-bold text-slate-700 w-full outline-none text-sm placeholder:text-slate-400" defaultValue="Cannaught Place, New Delhi" />
             </div>
             
             {stops.map((stop, index) => (
               <div key={index} className="relative">
                 <div className="flex justify-center -my-4 relative z-0 pointer-events-none opacity-30">
                   <div className="bg-slate-400 w-0.5 h-8"></div>
                 </div>
                 <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex items-center gap-4 shadow-sm relative z-10 mt-4">
                   <div className={`w-2 h-2 rounded-full shrink-0 ${index === stops.length - 1 ? 'bg-indigo-600' : 'bg-amber-500'}`}></div>
                   <input 
                    type="text" 
                    placeholder={index === stops.length - 1 ? "Where to?" : "Add Stop"} 
                    value={stop}
                    onChange={(e) => updateStop(index, e.target.value)}
                    className="bg-transparent font-bold text-slate-900 w-full outline-none text-sm placeholder:text-slate-400" 
                    autoFocus={index === stops.length - 1}
                   />
                   {stops.length > 1 && (
                     <button onClick={() => removeStop(index)} className="p-1 text-slate-400 hover:text-red-500"><X size={14} /></button>
                   )}
                 </div>
               </div>
             ))}

             {stops.length < 5 && (
               <button onClick={addStop} className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold uppercase tracking-widest hover:border-indigo-300 hover:text-indigo-500 transition-colors">
                 + Add Waypoint
               </button>
             )}
           </div>

           <div className="w-full mb-8">
             <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 block">Vehicle Type</label>
             <div className="grid grid-cols-2 gap-3">
               <button 
                 onClick={() => setVehicle('ICE')}
                 className={`p-4 rounded-2xl flex items-center justify-center gap-2 border-2 transition-all ${vehicle === 'ICE' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 text-slate-400'}`}
               >
                 <Fuel size={18} /> <span className="text-xs font-black">Fuel</span>
               </button>
               <button 
                 onClick={() => setVehicle('EV')}
                 className={`p-4 rounded-2xl flex items-center justify-center gap-2 border-2 transition-all ${vehicle === 'EV' ? 'border-emerald-500 bg-emerald-50 text-emerald-700' : 'border-slate-100 text-slate-400'}`}
               >
                 <Zap size={18} /> <span className="text-xs font-black">Electric</span>
               </button>
             </div>
           </div>

           <button 
             onClick={handlePlan}
             disabled={loading}
             className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3"
           >
             {loading ? (
               <>Processing Route <span className="animate-pulse">...</span></>
             ) : (
               <><Navigation size={16} /> Generate Plan</>
             )}
           </button>
        </div>
      </div>
    </div>
  );
};

export default TripPlannerModal;
