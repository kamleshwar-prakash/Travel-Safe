import React from 'react';
import { ArrowLeft, Download, Check, Trash2, Map, HardDrive } from 'lucide-react';

interface OfflineMapsProps {
  onBack: () => void;
}

const OfflineMaps: React.FC<OfflineMapsProps> = ({ onBack }) => {
  return (
    <div className="fixed inset-0 z-[3000] bg-slate-50 flex flex-col">
       <div className="px-6 pt-12 pb-6 flex items-center gap-4 bg-white shadow-sm">
        <button onClick={onBack} className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"><ArrowLeft /></button>
        <h1 className="text-xl font-black text-slate-900">Offline Maps</h1>
      </div>

      <div className="p-6">
         <div className="bg-slate-900 rounded-[2rem] p-6 text-white mb-8 flex items-center justify-between">
            <div>
               <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Storage Used</p>
               <h2 className="text-2xl font-black">420 MB</h2>
               <p className="text-xs text-slate-400 mt-1">12 GB Free</p>
            </div>
            <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center">
               <HardDrive size={24} />
            </div>
         </div>

         <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Downloaded Regions</h3>
         <div className="space-y-4 mb-8">
            <RegionCard name="New Delhi & NCR" size="150 MB" status="DOWNLOADED" />
            <RegionCard name="Mumbai - Pune Hwy" size="270 MB" status="DOWNLOADED" />
         </div>

         <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 mb-4">Suggested</h3>
         <div className="space-y-4">
            <RegionCard name="Jaipur - Agra" size="180 MB" status="AVAILABLE" />
            <RegionCard name="Bangalore City" size="320 MB" status="AVAILABLE" />
         </div>
      </div>
    </div>
  );
};

const RegionCard: React.FC<{ name: string, size: string, status: 'DOWNLOADED' | 'AVAILABLE' }> = ({ name, size, status }) => (
   <div className="bg-white p-5 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
         <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <Map size={24} />
         </div>
         <div>
            <p className="font-black text-slate-900">{name}</p>
            <p className="text-xs font-bold text-slate-400">{size}</p>
         </div>
      </div>
      <button className={`p-3 rounded-xl transition-all ${status === 'DOWNLOADED' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
         {status === 'DOWNLOADED' ? <Check size={20} /> : <Download size={20} />}
      </button>
   </div>
);

export default OfflineMaps;
