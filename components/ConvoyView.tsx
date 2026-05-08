import React, { useState, useEffect } from 'react';
import { ArrowLeft, Users, Car, MapPin, Phone, MessageCircle, AlertTriangle, Navigation } from 'lucide-react';

interface ConvoyMember {
  id: string;
  name: string;
  role: 'LEAD' | 'MEMBER' | 'SWEEPER';
  car: string;
  status: 'MOVING' | 'STOPPED' | 'OFFLINE';
  speed: number;
  distance: string; // distance from you
  lat: number;
  lng: number;
  battery: number;
}

interface ConvoyViewProps {
  onBack: () => void;
}

const MOCK_MEMBERS: ConvoyMember[] = [
  { id: '1', name: 'Dad (Lead)', role: 'LEAD', car: 'Toyota Fortuner', status: 'MOVING', speed: 85, distance: '1.2 km ahead', lat: 28.62, lng: 77.21, battery: 85 },
  { id: '2', name: 'You', role: 'MEMBER', car: 'Honda City', status: 'MOVING', speed: 82, distance: '0 km', lat: 28.61, lng: 77.20, battery: 92 },
  { id: '3', name: 'Rahul (Cousin)', role: 'SWEEPER', car: 'Maruti Swift', status: 'STOPPED', speed: 0, distance: '2.5 km behind', lat: 28.59, lng: 77.19, battery: 45 },
];

const ConvoyView: React.FC<ConvoyViewProps> = ({ onBack }) => {
  const [members, setMembers] = useState<ConvoyMember[]>(MOCK_MEMBERS);
  const [convoyCode] = useState('FAM-TRIP-2026');

  return (
    <div className="fixed inset-0 z-[3000] bg-slate-50 flex flex-col overflow-y-auto pb-20 animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="px-6 pt-12 pb-6 flex items-center justify-between bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
        <button onClick={onBack} className="p-3 bg-slate-50 rounded-xl text-slate-600 hover:bg-slate-100 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div className="text-center">
           <h1 className="text-lg font-black text-slate-900 uppercase tracking-widest flex items-center justify-center gap-2">
             <Users size={18} className="text-indigo-600" /> Family Convoy
           </h1>
           <p className="text-xs font-bold text-slate-400 mt-1">Code: {convoyCode}</p>
        </div>
        <button className="p-3 bg-indigo-50 rounded-xl text-indigo-600 hover:bg-indigo-100 transition-colors">
           <MessageCircle size={20} />
        </button>
      </div>

      <div className="p-6 space-y-6">
        
        {/* Convoy Health Status */}
        <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
           <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-black text-slate-900 uppercase tracking-widest">Convoy Health</h2>
              <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase">Good</span>
           </div>
           
           <div className="flex items-center gap-4">
              <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Spread</p>
                 <p className="text-lg font-black text-slate-900">3.7 km</p>
              </div>
              <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                 <p className="text-[10px] font-bold text-slate-400 uppercase mb-1">Avg Speed</p>
                 <p className="text-lg font-black text-slate-900">82 km/h</p>
              </div>
           </div>

           {/* Alerts */}
           <div className="mt-4 bg-amber-50 border border-amber-100 rounded-xl p-3 flex items-start gap-3">
              <AlertTriangle size={18} className="text-amber-500 shrink-0 mt-0.5" />
              <div>
                 <p className="text-xs font-bold text-amber-800">Gap Warning</p>
                 <p className="text-[10px] font-bold text-amber-600 leading-relaxed">
                    Rahul is falling behind (2.5km). Suggest slowing down to 60 km/h.
                 </p>
              </div>
           </div>
        </div>

        {/* Members List */}
        <div className="space-y-4">
           {members.map((member) => (
              <div key={member.id} className="bg-white p-4 rounded-[1.5rem] shadow-sm border border-slate-100 relative overflow-hidden">
                 {/* Role Badge */}
                 <div className={`absolute top-0 right-0 px-3 py-1.5 rounded-bl-2xl text-[10px] font-black uppercase tracking-widest ${
                    member.role === 'LEAD' ? 'bg-indigo-600 text-white' : 
                    member.role === 'SWEEPER' ? 'bg-slate-800 text-white' : 'bg-slate-100 text-slate-500'
                 }`}>
                    {member.role}
                 </div>

                 <div className="flex items-center gap-4 mb-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 ${
                       member.status === 'STOPPED' ? 'bg-red-50 border-red-100 text-red-500' : 'bg-indigo-50 border-indigo-100 text-indigo-600'
                    }`}>
                       <Car size={24} />
                    </div>
                    <div>
                       <h3 className="text-base font-black text-slate-900">{member.name}</h3>
                       <p className="text-xs font-bold text-slate-400">{member.car}</p>
                    </div>
                 </div>

                 <div className="flex items-center gap-3">
                    <div className="flex-1 bg-slate-50 p-2 rounded-xl flex items-center gap-2">
                       <MapPin size={14} className="text-slate-400" />
                       <span className="text-xs font-bold text-slate-600">{member.distance}</span>
                    </div>
                    {member.status === 'MOVING' && (
                       <div className="flex-1 bg-slate-50 p-2 rounded-xl flex items-center gap-2">
                          <Navigation size={14} className="text-slate-400" />
                          <span className="text-xs font-bold text-slate-600">{member.speed} km/h</span>
                       </div>
                    )}
                 </div>

                 {/* Actions */}
                 {member.id !== '2' && (
                    <div className="mt-3 flex gap-2">
                       <button className="flex-1 py-2 bg-indigo-50 rounded-lg text-indigo-600 text-xs font-bold flex items-center justify-center gap-1">
                          <Phone size={14} /> Call
                       </button>
                       <button className="flex-1 py-2 bg-slate-50 rounded-lg text-slate-600 text-xs font-bold flex items-center justify-center gap-1">
                          <MapPin size={14} /> Locate
                       </button>
                    </div>
                 )}
              </div>
           ))}
        </div>

        {/* Regroup Button */}
        <button className="w-full bg-slate-900 text-white py-4 rounded-2xl font-black text-lg shadow-xl shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2">
           <MapPin size={20} /> Suggest Regroup Stop
        </button>

      </div>
    </div>
  );
};

export default ConvoyView;
