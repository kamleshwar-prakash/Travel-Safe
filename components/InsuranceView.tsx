import React, { useState } from 'react';
import { ArrowLeft, Shield, FileText, Phone, Car, CheckCircle, AlertTriangle, ChevronRight, Upload } from 'lucide-react';

interface InsuranceViewProps {
  onBack: () => void;
}

const InsuranceView: React.FC<InsuranceViewProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'PROVIDERS' | 'CLAIMS'>('PROVIDERS');
  
  const providers = [
    {
      id: 1,
      name: "Acko General Insurance",
      logo: "https://images.unsplash.com/photo-1614680376593-902f74cf0d41?auto=format&fit=crop&q=80&w=100",
      policyNo: "ACK-8829-2201",
      validTill: "12 Oct 2026",
      coverage: "Comprehensive",
      status: "ACTIVE"
    },
    {
      id: 2,
      name: "ICICI Lombard",
      logo: "https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?auto=format&fit=crop&q=80&w=100",
      policyNo: "--",
      validTill: "--",
      coverage: "Third Party",
      status: "LINK_NOW"
    }
  ];

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col h-full animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm border-b border-slate-100 flex items-center justify-between shrink-0">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-400 hover:text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-lg font-black text-slate-900 uppercase tracking-wider">Insurance Vault</h1>
        <div className="w-8"></div>
      </div>

      {/* Tabs */}
      <div className="px-6 py-4 flex gap-4 shrink-0">
        <button 
          onClick={() => setActiveTab('PROVIDERS')}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'PROVIDERS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          My Policies
        </button>
        <button 
          onClick={() => setActiveTab('CLAIMS')}
          className={`flex-1 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${activeTab === 'CLAIMS' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'bg-white text-slate-400 border border-slate-100'}`}
        >
          File Claim
        </button>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar px-6 pb-24">
        {activeTab === 'PROVIDERS' ? (
          <div className="space-y-4">
             {/* Active Policy Card */}
             {providers.map(provider => (
               <div key={provider.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden group">
                  {provider.status === 'ACTIVE' && (
                    <div className="absolute top-0 right-0 bg-emerald-100 text-emerald-600 px-3 py-1 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest">
                      Active
                    </div>
                  )}
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden">
                       <Shield className="text-slate-300" size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900">{provider.name}</h3>
                      <p className="text-xs text-slate-400 font-medium">{provider.coverage}</p>
                    </div>
                  </div>

                  {provider.status === 'ACTIVE' ? (
                    <div className="space-y-3">
                      <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold">Policy No.</span>
                        <span className="text-xs text-slate-900 font-mono font-bold">{provider.policyNo}</span>
                      </div>
                      <div className="bg-slate-50 p-3 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-slate-400 font-bold">Valid Till</span>
                        <span className="text-xs text-slate-900 font-bold">{provider.validTill}</span>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <button className="flex-1 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-wider">Download PDF</button>
                        <button className="flex-1 py-3 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-wider">Renew</button>
                      </div>
                    </div>
                  ) : (
                    <button className="w-full py-3 border-2 border-dashed border-slate-200 text-slate-400 rounded-xl text-xs font-bold uppercase tracking-wider hover:border-indigo-200 hover:text-indigo-500 transition-colors">
                      Link Existing Policy
                    </button>
                  )}
               </div>
             ))}

             <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-3xl text-white relative overflow-hidden mt-6">
                <div className="absolute right-0 bottom-0 opacity-10">
                   <Shield size={120} />
                </div>
                <h3 className="text-xl font-black mb-2">Need Insurance?</h3>
                <p className="text-slate-300 text-sm mb-6 max-w-[70%]">Get instant coverage for your trip starting at just ₹19/day.</p>
                <button className="bg-white text-slate-900 px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider">Get Quote</button>
             </div>
          </div>
        ) : (
          <div className="space-y-6">
             <div className="bg-orange-50 p-4 rounded-2xl border border-orange-100 flex gap-3">
               <AlertTriangle className="text-orange-500 shrink-0" size={20} />
               <p className="text-xs text-orange-800 font-medium leading-relaxed">
                 For major accidents involving injuries, please call <strong>Emergency (112)</strong> immediately before filing a claim.
               </p>
             </div>

             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
               <h3 className="font-black text-slate-900 mb-4">Quick Claim</h3>
               
               <div className="space-y-4">
                 <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Incident Type</label>
                   <select className="w-full bg-slate-50 border-none rounded-xl py-3 px-4 text-sm font-bold text-slate-700 outline-none focus:ring-2 focus:ring-indigo-500/20">
                     <option>Accident / Collision</option>
                     <option>Theft / Vandalism</option>
                     <option>Breakdown / Towing</option>
                     <option>Windshield Damage</option>
                   </select>
                 </div>

                 <div>
                   <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Photos / Video</label>
                   <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 flex flex-col items-center justify-center text-slate-400 gap-2 hover:bg-slate-50 transition-colors cursor-pointer">
                      <Upload size={24} />
                      <span className="text-xs font-bold">Tap to upload evidence</span>
                   </div>
                 </div>

                 <button className="w-full bg-slate-900 text-white py-4 rounded-xl font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-slate-200 active:scale-95 transition-all mt-4">
                   Submit Claim
                 </button>
               </div>
             </div>

             <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <h3 className="font-black text-slate-900 mb-4">Recent Claims</h3>
                <div className="flex items-center gap-4 p-3 bg-slate-50 rounded-xl opacity-60">
                   <div className="w-10 h-10 bg-slate-200 rounded-lg flex items-center justify-center text-slate-400">
                     <FileText size={18} />
                   </div>
                   <div>
                     <p className="text-xs font-bold text-slate-900">Claim #CLM-2023-001</p>
                     <p className="text-[10px] font-bold text-slate-400">Processed • 12 Jan 2024</p>
                   </div>
                   <div className="ml-auto">
                     <CheckCircle size={16} className="text-emerald-500" />
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InsuranceView;
