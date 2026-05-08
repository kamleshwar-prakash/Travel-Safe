import React from 'react';
import { ArrowLeft, Wrench, Car, BatteryCharging, Key, Truck } from 'lucide-react';

interface RoadsideAssistanceProps {
  onBack: () => void;
  onOpenInsurance?: () => void;
}

const RoadsideAssistance: React.FC<RoadsideAssistanceProps> = ({ onBack, onOpenInsurance }) => {
  const [selectedIssue, setSelectedIssue] = React.useState<string | null>(null);
  const [requestState, setRequestState] = React.useState<'IDLE' | 'REQUESTING' | 'CONFIRMED'>('IDLE');

  const handleRequest = () => {
     setRequestState('REQUESTING');
     setTimeout(() => {
        setRequestState('CONFIRMED');
     }, 2000);
  };

  if (requestState === 'CONFIRMED') {
     return (
        <div className="fixed inset-0 z-[3000] bg-white flex flex-col items-center justify-center p-8 animate-in fade-in zoom-in duration-300">
           <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600 mb-6 animate-bounce">
              <Truck size={48} />
           </div>
           <h2 className="text-3xl font-black text-slate-900 mb-2 text-center">Help is on the way!</h2>
           <p className="text-slate-500 text-center font-medium mb-8">Mechanic Mike (4.9★) will arrive in 12 mins.</p>
           
           <div className="w-full bg-slate-50 p-6 rounded-[2rem] border border-slate-100 mb-8">
              <div className="flex justify-between items-center mb-4">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Estimated Cost</span>
                 <span className="text-xl font-black text-slate-900">$45.00</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Vehicle</span>
                 <span className="text-sm font-black text-slate-900">Toyota Camry</span>
              </div>
           </div>

           <button onClick={onBack} className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black uppercase tracking-widest">Return Home</button>
        </div>
     );
  }

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-50 flex flex-col overflow-y-auto">
      <div className="px-6 pt-12 pb-6 flex items-center gap-4 bg-white shadow-sm sticky top-0 z-10">
        <button onClick={onBack} className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"><ArrowLeft /></button>
        <h1 className="text-xl font-black text-slate-900">Roadside Assistance</h1>
      </div>

      <div className="p-6 space-y-6 pb-32">
        <div className="bg-orange-500 rounded-[2rem] p-8 text-white relative overflow-hidden shadow-2xl shadow-orange-200">
           <div className="relative z-10">
             <h2 className="text-3xl font-black mb-2">Stuck on the road?</h2>
             <p className="text-orange-100 font-medium text-sm mb-6 max-w-[200px]">Our network of 5,000+ mechanics is ready to help 24/7.</p>
             <button className="bg-white text-orange-600 px-6 py-3 rounded-xl font-black uppercase text-xs tracking-widest shadow-lg">Call Support</button>
           </div>
           <Truck className="absolute -right-8 bottom-0 text-orange-600/50 w-48 h-48 transform -scale-x-100" />
        </div>

        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2">Select Issue</h3>
        <div className="grid grid-cols-2 gap-4">
           <ServiceCard icon={<Truck />} label="Towing" selected={selectedIssue === 'Towing'} onClick={() => setSelectedIssue('Towing')} />
           <ServiceCard icon={<Wrench />} label="Mechanic" selected={selectedIssue === 'Mechanic'} onClick={() => setSelectedIssue('Mechanic')} />
           <ServiceCard icon={<BatteryCharging />} label="Jump Start" selected={selectedIssue === 'Jump Start'} onClick={() => setSelectedIssue('Jump Start')} />
           <ServiceCard icon={<Car />} label="Flat Tire" selected={selectedIssue === 'Flat Tire'} onClick={() => setSelectedIssue('Flat Tire')} />
           <ServiceCard icon={<Key />} label="Lockout" selected={selectedIssue === 'Lockout'} onClick={() => setSelectedIssue('Lockout')} />
           <ServiceCard icon={<Car />} label="Fuel Delivery" selected={selectedIssue === 'Fuel Delivery'} onClick={() => setSelectedIssue('Fuel Delivery')} />
        </div>

        <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest px-2 mt-4">Active Plans</h3>
        <button onClick={onOpenInsurance} className="w-full text-left bg-white p-5 rounded-[2rem] border border-slate-200 flex items-center gap-4 hover:border-indigo-200 transition-colors">
           <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
              <ShieldCheckIcon />
           </div>
           <div>
              <p className="font-black text-slate-900">Insurance Vault</p>
              <p className="text-xs font-bold text-slate-400">Link policy for free towing & benefits</p>
           </div>
        </button>
      </div>

      {/* Floating Action Button */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-slate-50 to-transparent">
         <button 
            disabled={!selectedIssue || requestState === 'REQUESTING'}
            onClick={handleRequest}
            className={`w-full py-5 rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all flex items-center justify-center gap-2 ${
               selectedIssue 
               ? 'bg-slate-900 text-white shadow-slate-300 hover:bg-orange-500 hover:shadow-orange-200' 
               : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
         >
            {requestState === 'REQUESTING' ? (
               <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Locating...
               </>
            ) : (
               <>
                  Request {selectedIssue}
               </>
            )}
         </button>
      </div>
    </div>
  );
};

const ServiceCard: React.FC<{ icon: React.ReactNode; label: string; selected?: boolean; onClick: () => void }> = ({ icon, label, selected, onClick }) => (
  <button 
    onClick={onClick}
    className={`p-6 rounded-[2rem] border shadow-sm flex flex-col items-center gap-3 transition-all active:scale-95 ${
       selected 
       ? 'bg-slate-900 border-slate-900 shadow-xl scale-[1.02]' 
       : 'bg-white border-slate-100 hover:border-orange-200 hover:shadow-md'
    }`}
  >
     <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-1 transition-colors ${
        selected ? 'bg-white/20 text-white' : 'bg-orange-50 text-orange-500'
     }`}>
        {icon}
     </div>
     <span className={`font-black text-sm ${selected ? 'text-white' : 'text-slate-700'}`}>{label}</span>
  </button>
);

const ShieldCheckIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>
);

export default RoadsideAssistance;
