import React, { useState } from 'react';
import { X, Camera, AlertTriangle, CloudRain, Construction, Eye, CheckCircle } from 'lucide-react';
import { AlertType } from '../types';

interface ReportHazardProps {
  onClose: () => void;
  onSubmit: (type: AlertType) => void;
}

const ReportHazard: React.FC<ReportHazardProps> = ({ onClose, onSubmit }) => {
  const [selected, setSelected] = useState<AlertType | null>(null);
  const [details, setDetails] = useState('');

  const handleSubmit = () => {
    if (selected) {
      onSubmit(selected); // In a real app, we'd pass details too
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-900/60 backdrop-blur-md flex items-end sm:items-center justify-center sm:p-6 animate-in fade-in duration-300">
      <div className="bg-white w-full max-w-md rounded-t-[2.5rem] sm:rounded-[2.5rem] shadow-2xl p-6 pb-12 animate-in slide-in-from-bottom-12 max-h-[90vh] overflow-y-auto">
         <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-black text-slate-900">Report Hazard</h2>
            <button onClick={onClose} className="p-2 bg-slate-100 rounded-full text-slate-500"><X size={20}/></button>
         </div>

         <div className="grid grid-cols-3 gap-4 mb-8">
            <HazardBtn type={AlertType.SPEED_CAMERA} icon={<Camera />} label="Fixed Cam" selected={selected} onSelect={setSelected} color="text-blue-500 bg-blue-50" />
            <HazardBtn type={AlertType.MOBILE_CAM} icon={<Construction />} label="Enforcement" selected={selected} onSelect={setSelected} color="text-indigo-500 bg-indigo-50" />
            <HazardBtn type={AlertType.RED_LIGHT_CAM} icon={<AlertTriangle />} label="Red Light" selected={selected} onSelect={setSelected} color="text-red-500 bg-red-50" />
            
            <HazardBtn type={AlertType.ACCIDENT} icon={<AlertTriangle />} label="Accident" selected={selected} onSelect={setSelected} color="text-orange-500 bg-orange-50" />
            <HazardBtn type={AlertType.HIDDEN_SENSOR} icon={<Eye />} label="Monitoring" selected={selected} onSelect={setSelected} color="text-purple-500 bg-purple-50" />
            <HazardBtn type={AlertType.POTHOLE} icon={<Construction />} label="Pothole" selected={selected} onSelect={setSelected} color="text-slate-500 bg-slate-100" />
         </div>

         {/* Additional Details */}
         <div className="mb-6">
           <label className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2 block">Additional Details (Optional)</label>
           <textarea 
             value={details}
             onChange={(e) => setDetails(e.target.value)}
             className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 text-sm font-bold text-slate-700 placeholder:text-slate-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none h-24"
             placeholder="Describe the hazard..."
           />
         </div>

         <button 
           onClick={handleSubmit}
           disabled={!selected}
           className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black uppercase tracking-widest disabled:opacity-50 active:scale-95 transition-all"
         >
            Submit Report
         </button>
      </div>
    </div>
  );
};

const HazardBtn: React.FC<{ type: AlertType, icon: React.ReactNode, label: string, selected: AlertType | null, onSelect: any, color: string }> = ({ type, icon, label, selected, onSelect, color }) => (
   <button 
     onClick={() => onSelect(type)}
     className={`p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all ${
       selected === type ? 'border-indigo-600 bg-indigo-50 scale-105' : 'border-transparent hover:bg-slate-50'
     }`}
   >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
         {icon}
      </div>
      <span className="text-xs font-bold text-slate-700">{label}</span>
      {selected === type && <div className="absolute top-2 right-2 text-indigo-600"><CheckCircle size={16} fill="currentColor" className="text-white"/></div>}
   </button>
);

export default ReportHazard;
