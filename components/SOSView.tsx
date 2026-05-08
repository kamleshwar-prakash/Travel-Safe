
import React, { useState, useEffect } from 'react';
import { Phone, Share2, ShieldAlert, ArrowLeft, MapPin, Siren, AlertTriangle, CheckCircle, FileText, Activity, Car, Stethoscope, Milestone } from 'lucide-react';

interface SOSViewProps {
  onBack: () => void;
  onManageContacts?: () => void;
  userLocation: [number, number];
}

const SOSView: React.FC<SOSViewProps> = ({ onBack, onManageContacts, userLocation }) => {
  const [isActive, setIsActive] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [alertSent, setAlertSent] = useState(false);

  const [contacts, setContacts] = useState([
    { name: 'Mom', phone: '+1 234 567 890', active: true },
    { name: 'Partner', phone: '+1 987 654 321', active: true }
  ]);

  useEffect(() => {
    let timer: any;
    if (isActive && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (isActive && countdown === 0) {
      setAlertSent(true);
    }
    return () => clearTimeout(timer);
  }, [isActive, countdown]);

  const toggleSOS = () => {
    if (isActive) {
      setIsActive(false);
      setCountdown(5);
      setAlertSent(false);
    } else {
      setIsActive(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[4000] bg-white flex flex-col overflow-y-auto pb-20">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between border-b border-slate-100 bg-white sticky top-0 z-10">
        <button onClick={onBack} className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100"><ArrowLeft /></button>
        <h1 className="text-xl font-black text-red-600 uppercase tracking-widest flex items-center gap-2">
          <ShieldAlert /> Emergency Mode
        </h1>
        <div className="w-10"></div>
      </div>

      <div className="flex-1 flex flex-col items-center p-8 bg-red-50/50 min-h-[500px]">
        
        {/* SOS Button */}
        <button 
          onClick={toggleSOS}
          className={`relative w-64 h-64 rounded-full flex items-center justify-center transition-all duration-300 ${
            alertSent 
              ? 'bg-emerald-500 shadow-[0_0_60px_rgba(16,185,129,0.4)]' 
              : isActive 
                ? 'bg-red-600 scale-110 shadow-[0_0_100px_rgba(220,38,38,0.6)]' 
                : 'bg-white border-[8px] border-red-100 shadow-2xl'
          }`}
        >
          {alertSent ? (
            <div className="text-center text-white animate-in zoom-in">
              <CheckCircle size={64} className="mx-auto mb-2" />
              <span className="text-lg font-black uppercase">Alert Sent</span>
            </div>
          ) : isActive ? (
            <div className="text-center text-white">
              <span className="text-6xl font-black block mb-2">{countdown}</span>
              <span className="text-xs font-bold uppercase tracking-widest">Tap to Cancel</span>
            </div>
          ) : (
            <div className="text-center text-red-600">
              <span className="text-4xl font-black block">SOS</span>
              <span className="text-xl font-black block mt-1">PRESS</span>
            </div>
          )}
          
          {/* Ripple Effect */}
          {isActive && !alertSent && (
            <>
              <div className="absolute inset-0 rounded-full border-4 border-red-500 opacity-0 animate-ping"></div>
              <div className="absolute -inset-4 rounded-full border-4 border-red-500 opacity-0 animate-ping delay-300"></div>
            </>
          )}
        </button>

        {alertSent && (
          <p className="text-slate-600 font-bold text-center mt-8 max-w-xs">
            Emergency services and your trusted contacts have been notified with your live location and vehicle details.
          </p>
        )}

        <div className="mt-12 w-full max-w-sm space-y-4">
           {/* Location Card with KM Marker */}
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                 <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-500">
                    <MapPin size={20} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Your Location</p>
                    <p className="font-bold text-slate-900 text-sm truncate">{userLocation[0].toFixed(4)}, {userLocation[1].toFixed(4)}</p>
                 </div>
                 <button className="ml-auto bg-slate-100 p-2 rounded-xl text-slate-600"><Share2 size={18} /></button>
              </div>
              
              {/* Highway KM Marker */}
              <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-center gap-3">
                 <div className="w-8 h-8 bg-amber-100 rounded-lg flex items-center justify-center text-amber-600">
                    <Milestone size={18} />
                 </div>
                 <div>
                    <p className="text-[10px] font-black uppercase text-amber-600 tracking-widest">Highway Marker</p>
                    <p className="text-sm font-bold text-slate-800">KM 45, NH-44 (Northbound)</p>
                 </div>
              </div>
           </div>

           {/* Emergency Brief Card (Auto-Prepared) */}
           <div className="bg-slate-900 p-6 rounded-[2rem] text-white shadow-lg relative overflow-hidden">
              <div className="absolute right-0 top-0 opacity-10 p-4"><FileText size={80} /></div>
              <div className="flex items-center gap-2 mb-4 relative z-10">
                 <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-md">
                    <Activity size={16} />
                 </div>
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-300">Auto-Prepared Brief</span>
              </div>
              
              <div className="space-y-3 relative z-10">
                 <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                       <Car size={16} className="text-slate-400" />
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Vehicle</p>
                          <p className="text-xs font-bold">Toyota Camry (DL 3C 1234)</p>
                       </div>
                    </div>
                 </div>
                 <div className="flex items-center justify-between p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                    <div className="flex items-center gap-3">
                       <Stethoscope size={16} className="text-rose-400" />
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase">Medical Profile</p>
                          <p className="text-xs font-bold">Blood: O+ • Diabetic</p>
                       </div>
                    </div>
                 </div>
                 <div className="p-3 bg-indigo-600/20 border border-indigo-500/30 rounded-xl">
                    <p className="text-[10px] font-bold text-indigo-300 uppercase mb-1">Nearest Care</p>
                    <p className="text-xs font-bold">City Hospital Trauma Center (2.3 km)</p>
                 </div>
              </div>
           </div>

           {/* Trusted Contacts */}
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                 <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest">Trusted Contacts</p>
                 <button onClick={onManageContacts} className="text-indigo-600 text-xs font-bold">Manage</button>
              </div>
              <div className="space-y-3">
                 {contacts.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl">
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center font-bold text-xs">
                             {c.name[0]}
                          </div>
                          <div>
                             <p className="text-sm font-bold text-slate-900">{c.name}</p>
                             <p className="text-xs text-slate-400">{c.phone}</p>
                          </div>
                       </div>
                       <div className={`w-3 h-3 rounded-full ${alertSent ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
                    </div>
                 ))}
              </div>
           </div>
           
           {/* Trip Sharing Button */}
           <button className="w-full bg-blue-600 text-white py-4 rounded-[1.5rem] font-bold shadow-lg shadow-blue-200 flex items-center justify-center gap-2 active:scale-95 transition-all">
              <Share2 size={20} /> Share Live Trip Status
           </button>
        </div>

        <div className="grid grid-cols-2 gap-4 w-full max-w-sm mt-4">
           <ContactCard name="Police" number="100" />
           <ContactCard name="Ambulance" number="102" />
        </div>
      </div>
    </div>
  );
};

const ContactCard: React.FC<{ name: string; number: string }> = ({ name, number }) => (
  <button className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between active:bg-slate-50">
     <div className="text-left">
        <p className="font-black text-slate-900">{name}</p>
        <p className="text-xs font-bold text-slate-400">{number}</p>
     </div>
     <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center text-green-600">
        <Phone size={18} />
     </div>
  </button>
);

export default SOSView;
