import React from 'react';
import { ArrowLeft, Car, Fuel, Settings, AlertTriangle, Plus } from 'lucide-react';

interface VehicleProfileProps {
  onBack: () => void;
}

const VehicleProfile: React.FC<VehicleProfileProps> = ({ onBack }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm mb-6 sticky top-0 z-10">
         <div className="flex items-center gap-4">
            <button 
              onClick={onBack}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
               <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-black text-slate-900">My Garage</h1>
         </div>
      </div>

      <div className="px-6 space-y-6">
         {/* Main Vehicle Card */}
         <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-xl shadow-slate-300">
            <div className="relative z-10">
               <div className="flex justify-between items-start mb-6">
                  <div>
                     <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Primary Vehicle</p>
                     <h2 className="text-3xl font-black">Toyota Camry</h2>
                     <p className="text-slate-400 font-bold">SE Hybrid • 2023</p>
                  </div>
                  <div className="bg-white/10 p-2 rounded-xl backdrop-blur-md">
                     <Car size={24} />
                  </div>
               </div>
               
               <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                     <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Fuel Level</p>
                     <p className="text-xl font-black text-emerald-400">72%</p>
                  </div>
                  <div className="bg-white/10 p-4 rounded-2xl backdrop-blur-md">
                     <p className="text-[9px] font-black uppercase tracking-wider text-slate-400 mb-1">Tire Pressure</p>
                     <p className="text-xl font-black">32 PSI</p>
                  </div>
               </div>

               <div className="flex gap-3">
                  <button className="flex-1 bg-white text-slate-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest">Health Check</button>
                  <button className="flex-1 bg-white/10 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-white/20">Edit</button>
               </div>
            </div>
            
            {/* Background Decoration */}
            <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-indigo-600 rounded-full blur-[100px] opacity-50"></div>
         </div>

         {/* Maintenance Alerts */}
         <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] px-1">Attention Needed</h3>
         <div className="bg-rose-50 border border-rose-100 rounded-[2rem] p-6 flex items-start gap-4">
            <div className="w-10 h-10 bg-rose-100 rounded-full flex items-center justify-center text-rose-500 shrink-0">
               <AlertTriangle size={20} />
            </div>
            <div>
               <h4 className="font-black text-slate-900 text-sm mb-1">Oil Change Due</h4>
               <p className="text-xs font-medium text-slate-500 mb-3">Your vehicle is due for service in 200 miles.</p>
               <button className="text-[10px] font-black uppercase tracking-widest text-rose-500 bg-white px-4 py-2 rounded-lg shadow-sm">Schedule Now</button>
            </div>
         </div>

         {/* Add Vehicle Button */}
         <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-[2rem] flex items-center justify-center gap-2 text-slate-400 font-bold hover:bg-slate-50 transition-colors">
            <Plus size={20} />
            Add Another Vehicle
         </button>
      </div>
    </div>
  );
};

export default VehicleProfile;
