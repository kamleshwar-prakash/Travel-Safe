
import React from 'react';
import { ArrowLeft, Calendar, MapPin, Clock, Navigation, MoreHorizontal, ChevronRight } from 'lucide-react';

interface TripHistoryProps {
  onBack: () => void;
}

const TripHistory: React.FC<TripHistoryProps> = ({ onBack }) => {
  const trips = [
    { id: 1, from: "Home", to: "Grand Highway Plaza", date: "Today, 10:30 AM", duration: "45 min", dist: "32 km", safetyScore: 98 },
    { id: 2, from: "Office", to: "City Mall", date: "Yesterday, 6:15 PM", duration: "22 min", dist: "12 km", safetyScore: 92 },
    { id: 3, from: "Gym", to: "Home", date: "Feb 10, 8:00 AM", duration: "15 min", dist: "5 km", safetyScore: 100 },
    { id: 4, from: "Home", to: "Airport Terminal 3", date: "Feb 08, 4:00 AM", duration: "1h 10m", dist: "58 km", safetyScore: 95 },
  ];

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-10 border-b border-slate-200">
        <button onClick={onBack} className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 active:scale-95 transition-transform">
           <ArrowLeft size={20} />
        </button>
        <span className="font-black text-slate-900 uppercase tracking-widest text-sm">Your Journeys</span>
        <div className="w-10"></div>
      </div>

      <div className="p-6 pb-20 space-y-6">
        
        {/* Stats Summary */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Total Distance</p>
              <p className="text-3xl font-black text-slate-900">1,248 <span className="text-sm text-slate-400 font-bold">km</span></p>
           </div>
           <div className="bg-white p-5 rounded-[2rem] shadow-sm border border-slate-100">
              <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-2">Safety Score</p>
              <p className="text-3xl font-black text-emerald-500">96<span className="text-sm text-emerald-300">%</span></p>
           </div>
        </div>

        {/* Trips List */}
        <div>
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Recent Trips</h3>
           <div className="space-y-4">
              {trips.map((trip) => (
                 <div key={trip.id} className="bg-white p-5 rounded-3xl shadow-sm border border-slate-100 relative overflow-hidden group active:scale-[0.98] transition-all cursor-pointer">
                    <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Navigation size={64} className="text-slate-900" />
                    </div>
                    
                    <div className="relative z-10">
                       <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                             <Calendar size={12} />
                             {trip.date}
                          </div>
                          <div className={`px-2 py-1 rounded-lg text-[10px] font-black uppercase ${trip.safetyScore > 90 ? 'bg-emerald-100 text-emerald-600' : 'bg-amber-100 text-amber-600'}`}>
                             Score: {trip.safetyScore}
                          </div>
                       </div>

                       <div className="flex items-center gap-4 mb-4">
                          <div className="flex flex-col items-center gap-1">
                             <div className="w-2 h-2 rounded-full bg-slate-300"></div>
                             <div className="w-0.5 h-8 bg-slate-100"></div>
                             <div className="w-2 h-2 rounded-full bg-indigo-500"></div>
                          </div>
                          <div className="flex-1 space-y-4">
                             <div>
                                <p className="text-xs text-slate-400 font-bold">From</p>
                                <p className="font-bold text-slate-900">{trip.from}</p>
                             </div>
                             <div>
                                <p className="text-xs text-slate-400 font-bold">To</p>
                                <p className="font-bold text-slate-900">{trip.to}</p>
                             </div>
                          </div>
                       </div>

                       <div className="flex items-center gap-6 border-t border-slate-50 pt-4">
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                             <Clock size={14} /> {trip.duration}
                          </div>
                          <div className="flex items-center gap-2 text-slate-500 text-xs font-bold">
                             <Navigation size={14} /> {trip.dist}
                          </div>
                       </div>
                    </div>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default TripHistory;
