
import React from 'react';
import { 
  Search, Filter, MapPin, Star, Zap, Clock, Heart, 
  Navigation, MoreHorizontal, CloudSun, ShieldCheck, 
  TrendingUp, Sparkles, Fuel, Coffee, Bed, Crown
} from 'lucide-react';
import { ServiceType, PlugType, FuelType, SortOption, BusinessService } from '../types';

interface ExploreFeedProps {
  services: BusinessService[];
  activeFilter: string;
  sortBy: SortOption;
  isPremium?: boolean;
  onSetFilter: (filter: string) => void;
  onSetSort: (sort: SortOption) => void;
  onOpenPlanner: () => void;
  onOpenPremium: () => void;
  onSelectService: (service: BusinessService) => void;
}

const ExploreFeed: React.FC<ExploreFeedProps> = ({ 
  services, activeFilter, sortBy, isPremium, onSetFilter, onSetSort, onOpenPlanner, onOpenPremium, onSelectService 
}) => {
  
  return (
    <div className="relative bg-slate-50 h-full pb-40 overflow-y-auto custom-scrollbar overflow-x-hidden">
      
      {/* Background Graphics */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-[600px] bg-gradient-to-b from-indigo-50/80 to-transparent"></div>
        <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute top-20 -left-20 w-[400px] h-[400px] bg-emerald-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
      </div>

      <div className="relative z-10">
        {/* 1. Header & Weather Widget */}
        <header className="px-6 pt-16 pb-4 bg-white/80 backdrop-blur-xl rounded-b-[2.5rem] shadow-sm border-b border-white/20 relative">
          <div className="flex justify-between items-start mb-6">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Good Morning,</p>
              <h1 className="text-3xl font-black text-slate-900 leading-none">Johnathan</h1>
            </div>
            <div className="flex items-center gap-3 bg-indigo-50/80 pl-3 pr-4 py-2 rounded-2xl border border-indigo-100 backdrop-blur-sm">
               <CloudSun className="text-indigo-500" size={20} />
               <div>
                  <p className="text-xs font-black text-slate-900">24°C</p>
                  <p className="text-[10px] font-bold text-indigo-400 leading-none">Clear Roads</p>
               </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="relative mb-6 group">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
              <Search className="text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={20} />
            </div>
            <input 
              type="text" 
              placeholder="Find fuel, food, or rest..." 
              className="w-full bg-slate-100/80 backdrop-blur-md text-slate-900 font-bold text-sm rounded-2xl pl-12 pr-4 py-4 outline-none focus:bg-white focus:ring-2 focus:ring-indigo-500/20 transition-all placeholder:text-slate-400 shadow-inner"
            />
            <button className="absolute inset-y-2 right-2 bg-white shadow-sm border border-slate-200 p-2 rounded-xl text-slate-400 hover:text-indigo-600 transition-colors">
               <Filter size={18} />
            </button>
          </div>

          {/* Stories / Highlights (Engagement Feature) */}
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
             <StoryCircle color="bg-gradient-to-tr from-amber-400 to-orange-500" icon={<Crown size={18} className="text-white" />} label="Go Gold" onClick={onOpenPremium} />
             <StoryCircle color="bg-gradient-to-tr from-indigo-500 to-purple-600" icon={<Sparkles size={18} className="text-white" />} label="AI Plan" onClick={onOpenPlanner} />
             <StoryCircle color="bg-white border border-slate-100" icon={<Zap size={18} className="text-emerald-600" />} label="EV Tips" />
             <StoryCircle color="bg-white border border-slate-100" icon={<ShieldCheck size={18} className="text-indigo-600" />} label="Safety" />
             <StoryCircle color="bg-white border border-slate-100" icon={<TrendingUp size={18} className="text-rose-500" />} label="Deals" />
          </div>
        </header>

        {/* 2. Filters & Sort */}
        <div className="sticky top-0 z-20 bg-slate-50/95 backdrop-blur-md py-4 px-6 mb-2 border-b border-slate-100/50">
          <div className="flex gap-3 overflow-x-auto no-scrollbar">
             <FilterChip label="All" active={activeFilter === 'ALL'} onClick={() => onSetFilter('ALL')} />
             <FilterChip label="EV Hubs" icon={<Zap size={14}/>} active={activeFilter === 'EV'} onClick={() => onSetFilter('EV')} />
             <FilterChip label="Fuel" icon={<Fuel size={14}/>} active={activeFilter === 'FUEL'} onClick={() => onSetFilter('FUEL')} />
             <FilterChip label="Food" icon={<Coffee size={14}/>} active={activeFilter === 'FOOD'} onClick={() => onSetFilter('FOOD')} />
             <FilterChip label="Rest" icon={<Bed size={14}/>} active={activeFilter === 'STAY'} onClick={() => onSetFilter('STAY')} />
          </div>
        </div>

        {/* 3. Feed Content */}
        <div className="px-6 space-y-8 pb-8">
          
          {/* Featured / Sponsored Card (Monetization Showcase) */}
          {activeFilter === 'ALL' && !isPremium && (
            <div className="relative overflow-hidden rounded-[2.5rem] bg-slate-900 shadow-2xl group cursor-pointer">
               <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1562519819-016930ada31b?auto=format&fit=crop&q=80&w=800')] bg-cover bg-center opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-110"></div>
               <div className="absolute top-4 left-4 bg-white/20 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full">
                  <p className="text-[10px] font-black text-white uppercase tracking-widest">Sponsored</p>
               </div>
               <div className="relative z-10 p-8 pt-32 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent">
                  <h3 className="text-2xl font-black text-white mb-2">Starbucks Highway Reserve</h3>
                  <p className="text-slate-300 text-sm font-medium mb-6 line-clamp-2">Get 50% off coffee when you charge your EV at our partner station.</p>
                  <button className="w-full bg-white text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest hover:scale-[1.02] active:scale-95 transition-all shadow-lg">
                     Claim Offer
                  </button>
               </div>
            </div>
          )}

          {/* Regular Feed */}
          {services.map((service, idx) => (
             <ImmersiveCard 
               key={service.id} 
               service={service} 
               delay={idx} 
               onClick={() => onSelectService(service)} 
             />
          ))}
          
          {/* "End of List" decorative element */}
          <div className="flex flex-col items-center justify-center py-10 opacity-50">
             <div className="w-1 h-12 bg-slate-300 rounded-full mb-4"></div>
             <p className="text-xs font-black text-slate-400 uppercase tracking-widest">You're up to date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const StoryCircle: React.FC<{ color: string, icon: React.ReactNode, label: string, onClick?: () => void }> = ({ color, icon, label, onClick }) => (
  <button onClick={onClick} className="flex flex-col items-center gap-2 shrink-0 group">
     <div className={`w-16 h-16 rounded-full flex items-center justify-center ${color} shadow-md group-hover:scale-105 active:scale-95 transition-all`}>
        {icon}
     </div>
     <span className="text-[10px] font-bold text-slate-600">{label}</span>
  </button>
);

const FilterChip: React.FC<{ label: string, icon?: React.ReactNode, active: boolean, onClick: () => void }> = ({ label, icon, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex items-center gap-2 px-5 py-3 rounded-2xl border transition-all whitespace-nowrap shadow-sm ${
      active ? 'bg-slate-900 text-white border-slate-900 shadow-md transform scale-105' : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
    }`}
  >
    {icon}
    <span className="text-xs font-black tracking-tight">{label}</span>
  </button>
);

const ImmersiveCard: React.FC<{ service: any, delay: number, onClick: () => void }> = ({ service, delay, onClick }) => {
   // Safety Score Calculation (Mock)
   const safetyScore = Math.floor(85 + Math.random() * 14); 

   return (
     <div 
       onClick={onClick}
       className="group bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/50 overflow-hidden active:scale-[0.98] transition-all duration-500 animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards cursor-pointer hover:shadow-2xl hover:shadow-indigo-100/50"
       style={{ animationDelay: `${delay * 100}ms` }}
     >
       {/* Image Section */}
       <div className="h-64 relative overflow-hidden">
          <img src={service.image} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent opacity-80"></div>
          
          {/* Top Badges */}
          <div className="absolute top-4 left-4 flex gap-2">
             <div className="bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                <Star size={12} className="text-amber-500 fill-amber-500" />
                <span className="text-[10px] font-black text-slate-900">{service.rating}</span>
             </div>
             {service.type === ServiceType.EV_CHARGING && (
                <div className="bg-emerald-500 text-white px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-sm">
                   <Zap size={12} fill="currentColor" />
                   <span className="text-[10px] font-black uppercase tracking-wider">Fast Charge</span>
                </div>
             )}
          </div>

          <button className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 hover:bg-white/30 transition-colors">
             <Heart size={18} />
          </button>

          {/* Bottom Info Overlay */}
          <div className="absolute bottom-0 left-0 w-full p-6 text-white transform translate-y-2 group-hover:translate-y-0 transition-transform">
             <div className="flex justify-between items-end mb-1">
                <h3 className="text-2xl font-black leading-tight">{service.name}</h3>
                <h3 className="text-xl font-black text-indigo-400">{service.price}</h3>
             </div>
             <p className="text-slate-300 text-xs font-medium line-clamp-1 opacity-90">{service.desc}</p>
          </div>
       </div>

       {/* Details Section */}
       <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
             <div className="flex-1 bg-slate-50 p-3 rounded-2xl border border-slate-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                   <Clock size={16} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-slate-400 uppercase tracking-wider">Distance</p>
                   <p className="text-sm font-black text-slate-900">{service.dist}</p>
                </div>
             </div>
             
             {/* Safety Score - The USP */}
             <div className="flex-1 bg-indigo-50 p-3 rounded-2xl border border-indigo-100 flex items-center gap-3">
                <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center text-emerald-500 shadow-sm">
                   <ShieldCheck size={16} />
                </div>
                <div>
                   <p className="text-[9px] font-black text-indigo-400 uppercase tracking-wider">Safety</p>
                   <p className="text-sm font-black text-indigo-900">{safetyScore}% Score</p>
                </div>
             </div>
          </div>

          {/* EV Specific Data */}
          {service.evDetails && (
             <div className="mb-6">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3">Connector Status</p>
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                   {service.evDetails.plugs.map((plug: any, i: number) => (
                      <div key={i} className="bg-slate-50 px-4 py-2 rounded-xl border border-slate-100 min-w-[80px] flex flex-col items-center">
                         <span className="text-[9px] font-black text-slate-500 uppercase">{plug.type}</span>
                         <span className={`text-xs font-black ${plug.available > 0 ? 'text-emerald-600' : 'text-rose-500'}`}>
                            {plug.available}/{plug.count}
                         </span>
                      </div>
                   ))}
                </div>
             </div>
          )}

          <button className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-slate-200 active:scale-95 transition-all flex items-center justify-center gap-2 group-hover:bg-indigo-600">
             <Navigation size={16} className="text-indigo-400 group-hover:text-white transition-colors" /> 
             Navigate Now
          </button>
       </div>
     </div>
   );
}

export default ExploreFeed;
