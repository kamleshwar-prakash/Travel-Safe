import React, { useState } from 'react';
import { ArrowLeft, Building2, MapPin, Phone, Mail, Upload, CheckCircle2 } from 'lucide-react';
import { BusinessService } from '../types';

interface BusinessRegistrationProps {
  onBack: () => void;
  onComplete: () => void;
}

const BusinessRegistration: React.FC<BusinessRegistrationProps> = ({ onBack, onComplete }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    category: 'REPAIR' as BusinessService,
    address: '',
    phone: '',
    email: '',
    description: ''
  });

  const categories: { id: BusinessService; label: string }[] = [
    { id: 'REPAIR', label: 'Auto Repair' },
    { id: 'FUEL', label: 'Fuel Station' },
    { id: 'EV_CHARGING', label: 'EV Charging' },
    { id: 'HOTEL', label: 'Hotel / Stay' },
    { id: 'RESTAURANT', label: 'Restaurant' },
    { id: 'HOSPITAL', label: 'Medical' },
  ];

  const handleSubmit = () => {
    // Simulate API call
    setTimeout(() => {
      setStep(3); // Success
    }, 1500);
  };

  if (step === 3) {
    return (
      <div className="fixed inset-0 z-[2000] bg-white flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
        <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
          <CheckCircle2 size={48} />
        </div>
        <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">Welcome Aboard!</h2>
        <p className="text-slate-500 text-center font-medium mb-8">Your business "{formData.name}" is now pending verification. You can access your dashboard now.</p>
        
        <button 
          onClick={onComplete}
          className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-emerald-600 transition-colors"
        >
          Go to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm border-b border-slate-100 flex items-center gap-4 shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <div>
           <h1 className="text-lg font-black text-slate-900 uppercase tracking-wider">Partner Registration</h1>
           <p className="text-xs text-slate-400 font-medium">Step {step} of 2</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Name</label>
               <div className="relative">
                 <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                 <input 
                   type="text" 
                   value={formData.name}
                   onChange={(e) => setFormData({...formData, name: e.target.value})}
                   placeholder="e.g. Mike's Auto Garage"
                   className="w-full pl-12 p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Category</label>
               <div className="grid grid-cols-2 gap-3">
                 {categories.map((cat) => (
                   <button
                     key={cat.id}
                     onClick={() => setFormData({...formData, category: cat.id})}
                     className={`p-4 rounded-xl text-xs font-black uppercase tracking-wider transition-all border ${
                       formData.category === cat.id 
                       ? 'bg-indigo-600 text-white border-indigo-600 shadow-lg shadow-indigo-200' 
                       : 'bg-white text-slate-500 border-slate-100 hover:border-slate-300'
                     }`}
                   >
                     {cat.label}
                   </button>
                 ))}
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Address</label>
               <div className="relative">
                 <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                 <input 
                   type="text" 
                   value={formData.address}
                   onChange={(e) => setFormData({...formData, address: e.target.value})}
                   placeholder="Street Address, City"
                   className="w-full pl-12 p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
               </div>
             </div>

             <button 
               onClick={() => setStep(2)}
               disabled={!formData.name || !formData.address}
               className="w-full py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
             >
               Next Step
             </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Contact Phone</label>
               <div className="relative">
                 <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                 <input 
                   type="text" 
                   value={formData.phone}
                   onChange={(e) => setFormData({...formData, phone: e.target.value})}
                   placeholder="+91 98765 43210"
                   className="w-full pl-12 p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Email</label>
               <div className="relative">
                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
                 <input 
                   type="email" 
                   value={formData.email}
                   onChange={(e) => setFormData({...formData, email: e.target.value})}
                   placeholder="contact@business.com"
                   className="w-full pl-12 p-4 bg-white border border-slate-100 rounded-xl font-bold text-slate-900 outline-none focus:ring-2 focus:ring-indigo-500"
                 />
               </div>
             </div>

             <div>
               <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Business Proof</label>
               <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 flex flex-col items-center justify-center text-slate-400 hover:bg-slate-100 transition-colors cursor-pointer">
                 <Upload size={32} className="mb-2" />
                 <span className="text-xs font-bold uppercase">Upload License / GST</span>
               </div>
             </div>

             <div className="flex gap-4 mt-8">
               <button 
                 onClick={() => setStep(1)}
                 className="flex-1 py-4 bg-slate-200 text-slate-600 rounded-xl font-black uppercase tracking-widest"
               >
                 Back
               </button>
               <button 
                 onClick={handleSubmit}
                 disabled={!formData.phone}
                 className="flex-1 py-4 bg-slate-900 text-white rounded-xl font-black uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
               >
                 Submit
               </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BusinessRegistration;
