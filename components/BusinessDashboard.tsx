
import React, { useState } from 'react';
import { 
  Plus, BarChart3, Settings, Store, Megaphone, Utensils, Zap, ChevronRight, 
  TrendingUp, Power, CheckCircle2, AlertCircle, Image as ImageIcon, 
  BedDouble, Stethoscope, Fuel, Briefcase, Activity, Building, Key,
  Wrench, ShoppingBag, Car, Users, Globe, ShieldCheck, ArrowRight, X,
  Coffee, ShoppingCart, Droplets, ArrowLeft, QrCode, MessageSquare, Star, Share2, MapPin, Camera as CameraIcon, Video
} from 'lucide-react';

import MapComponent from './MapComponent';
import { SafetyDataService } from '../services/SafetyDataService';

import { BusinessService, INDUSTRY_SERVICES, ServiceType } from '../types';

type Industry = 'FUEL' | 'HOSPITALITY' | 'FOOD' | 'HEALTHCARE' | 'AUTO' | 'RETAIL';

const INDUSTRY_HIERARCHY = {
  FUEL: [
    { label: 'Gas Station', type: ServiceType.GAS_STATION, icon: Fuel, desc: 'Petrol, Diesel, CNG' },
    { label: 'EV Charging', type: ServiceType.EV_CHARGING, icon: Zap, desc: 'Fast Charging Hubs' }
  ],
  HOSPITALITY: [
    { label: 'Hotel', type: ServiceType.HOTEL, icon: BedDouble, desc: 'Hotels, Motels, Resorts' }
  ],
  FOOD: [
    { label: 'Restaurant', type: ServiceType.RESTAURANT, icon: Utensils, desc: 'Fine Dining, Casual' },
    { label: 'Dhaba', type: ServiceType.DHABA, icon: Coffee, desc: 'Highway Dining' },
    { label: 'Cafe', type: ServiceType.RESTAURANT, icon: Coffee, desc: 'Coffee Shops' }
  ],
  HEALTHCARE: [
    { label: 'Hospital', type: ServiceType.HOSPITAL, icon: Building, desc: 'Trauma Centers' },
    { label: 'Pharmacy', type: ServiceType.PHARMACY, icon: Stethoscope, desc: '24/7 Chemists' },
    { label: 'Clinic', type: ServiceType.HOSPITAL, icon: Activity, desc: 'Small Clinics' }
  ],
  AUTO: [
    { label: 'Mechanic', type: ServiceType.MECHANIC, icon: Wrench, desc: 'Repairs & Service' },
    { label: 'Towing', type: ServiceType.TOWING, icon: Car, desc: 'Emergency Towing' },
    { label: 'Car Wash', type: ServiceType.MECHANIC, icon: Droplets, desc: 'Cleaning Services' }
  ],
  RETAIL: [
    { label: 'Retail Store', type: ServiceType.RETAIL, icon: ShoppingBag, desc: 'Malls, Marts' },
    { label: 'ATM', type: ServiceType.ATM, icon: Key, desc: 'Cash Points' }
  ]
};

const BusinessDashboard: React.FC<{ onBack?: () => void; businessData?: BusinessService; onUpdateBusiness?: (data: Partial<BusinessService>) => void }> = ({ onBack, businessData, onUpdateBusiness }) => {
  const [isBusinessMode, setIsBusinessMode] = useState(false);
  const [isLive, setIsLive] = useState(true);
  const [selectedIndustry, setSelectedIndustry] = useState<Industry | null>(null);
  const [selectedSubCategory, setSelectedSubCategory] = useState<ServiceType | null>(null);
  const [activeModal, setActiveModal] = useState<'NONE' | 'PROFILE' | 'PROMO' | 'SERVICES' | 'QR' | 'REVIEWS' | 'ANALYTICS' | 'LOCATION' | 'CAMERAS'>('NONE');

  // Local state for forms
  const [name, setName] = useState(businessData?.name || "Grand Highway Plaza");
  const [desc, setDesc] = useState(businessData?.desc || "Premium stopover with 24/7 services.");
  const [amenities, setAmenities] = useState<string[]>(businessData?.amenities || []);
  const [promoTitle, setPromoTitle] = useState(businessData?.promotions?.[0]?.title || "");
  const [promoCode, setPromoCode] = useState(businessData?.promotions?.[0]?.code || "");
  
  const handleProfileSave = () => {
    if (onUpdateBusiness) {
        onUpdateBusiness({ name, desc });
    }
    setActiveModal('NONE');
  };

  const handleServicesSave = () => {
    if (onUpdateBusiness) {
        onUpdateBusiness({ amenities });
    }
    setActiveModal('NONE');
  };

  const handlePromoSave = () => {
     if (onUpdateBusiness && promoTitle && promoCode) {
         onUpdateBusiness({
             promotions: [{
                 title: promoTitle,
                 code: promoCode,
                 validity: '24 Hours',
                 isActive: true
             }]
         });
     }
     setActiveModal('NONE');
  };

  // Determine current ServiceType based on selectedIndustry (simplified mapping)
  const getServiceType = (): ServiceType => {
      if (selectedSubCategory) return selectedSubCategory;
      if (selectedIndustry === 'FUEL') return ServiceType.GAS_STATION;
      if (selectedIndustry === 'HOSPITALITY') return ServiceType.HOTEL; 
      if (selectedIndustry === 'FOOD') return ServiceType.RESTAURANT;
      if (selectedIndustry === 'HEALTHCARE') return ServiceType.HOSPITAL;
      if (selectedIndustry === 'AUTO') return ServiceType.MECHANIC;
      if (selectedIndustry === 'RETAIL') return ServiceType.RETAIL;
      return ServiceType.GAS_STATION;
  };

  const availableServices = INDUSTRY_SERVICES[getServiceType()] || [];

  
  // Mock States per industry
  const [fuelStock, setFuelStock] = useState({ petrol: true, diesel: true, cng: false });
  const [roomStock, setRoomStock] = useState({ deluxe: true, standard: true, suite: false });
  const [erStats, setErStats] = useState({ beds: 12, waitTime: '15m', ambulance: true });

  // Mock Reviews
  const reviews = [
    { id: 1, user: "Amit Kumar", rating: 5, text: "Great service and clean restrooms! Highly recommended.", time: "2h ago" },
    { id: 2, user: "Sarah Jenkins", rating: 4, text: "Good food but slightly expensive.", time: "5h ago" },
    { id: 3, user: "Rajesh Singh", rating: 5, text: "Fast EV charging. The coffee shop is a lifesaver.", time: "1d ago" }
  ];

  if (!isBusinessMode) {
    return (
      <div className="relative h-screen w-full overflow-y-auto bg-slate-900 text-white pb-20 sm:pb-32">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&q=80&w=2000" 
            alt="City Infrastructure" 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/80 to-indigo-900/40"></div>
          {/* Decorative Grid */}
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        </div>

        <div className="relative z-10 px-4 sm:px-8 pt-16 sm:pt-24 animate-in slide-in-from-bottom-8 duration-700">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
             <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]">
                   <Briefcase size={24} className="text-white" />
                </div>
                <span className="text-xs font-black uppercase tracking-[0.3em] text-indigo-300">Partner Portal</span>
             </div>
             {onBack && (
               <button onClick={onBack} className="bg-white/10 backdrop-blur-md p-3 rounded-xl text-white hover:bg-white/20 transition-colors border border-white/10">
                 <X size={20} />
               </button>
             )}
          </div>

          <h1 className="text-3xl sm:text-5xl font-black leading-tight mb-6 tracking-tight">
            Powering the <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-emerald-400">Global Journey.</span>
          </h1>
          
          <p className="text-slate-300 font-medium text-sm leading-relaxed max-w-xs mb-10 border-l-2 border-indigo-500 pl-4">
            Connect your business to the TravelSafe network. From highways to high streets, drive footfall and revenue in real-time.
          </p>

          {/* Stats Row */}
          <div className="flex gap-6 mb-10 sm:mb-12 border-y border-white/10 py-5 sm:py-6 bg-white/5 backdrop-blur-sm -mx-4 sm:-mx-8 px-4 sm:px-8">
             <div>
                <p className="text-2xl sm:text-3xl font-black text-white">5M+</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Daily Drivers</p>
             </div>
             <div className="w-px bg-white/10"></div>
             <div>
                <p className="text-2xl sm:text-3xl font-black text-emerald-400">$1.2B</p>
                <p className="text-[10px] text-slate-400 uppercase tracking-widest mt-1">Commerce Value</p>
             </div>
          </div>

          {/* Partner Options Grid */}
          <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-6">
             {selectedIndustry ? `Select ${selectedIndustry.toLowerCase()} Type` : 'Select Your Industry'}
          </h3>
          
          {selectedIndustry && (
             <button onClick={() => setSelectedIndustry(null)} className="flex items-center gap-2 text-slate-400 mb-4 hover:text-white transition-colors">
                <ArrowLeft size={16} /> Back to Industries
             </button>
          )}

          <div className="grid grid-cols-2 gap-3 mb-12">
             {!selectedIndustry ? (
                <>
                  <IndustryCard icon={<Fuel className="text-blue-400"/>} label="Energy & EV" desc="Pumps, Chargers" onClick={() => setSelectedIndustry('FUEL')} />
                  <IndustryCard icon={<Building className="text-indigo-400"/>} label="Hospitality" desc="Hotels, Motels" onClick={() => setSelectedIndustry('HOSPITALITY')} />
                  <IndustryCard icon={<Utensils className="text-orange-400"/>} label="Food & Dining" desc="Restaurants, Dhabas" onClick={() => setSelectedIndustry('FOOD')} />
                  <IndustryCard icon={<Stethoscope className="text-rose-400"/>} label="Healthcare" desc="Trauma, Pharma" onClick={() => setSelectedIndustry('HEALTHCARE')} />
                  <IndustryCard icon={<Wrench className="text-slate-400"/>} label="Auto Care" desc="Mechanics, Towing" onClick={() => setSelectedIndustry('AUTO')} />
                  <IndustryCard icon={<ShoppingBag className="text-emerald-400"/>} label="Retail" desc="Malls, Marts" onClick={() => setSelectedIndustry('RETAIL')} />
                </>
             ) : (
                INDUSTRY_HIERARCHY[selectedIndustry].map((sub, idx) => (
                   <IndustryCard 
                      key={idx}
                      icon={<sub.icon className="text-indigo-400" />} 
                      label={sub.label} 
                      desc={sub.desc} 
                      onClick={() => { 
                         setSelectedSubCategory(sub.type); 
                         setIsBusinessMode(true); 
                      }} 
                   />
                ))
             )}
          </div>
          
          <div className="flex justify-center items-center gap-2 mt-6 opacity-60">
             <ShieldCheck size={12} className="text-emerald-400" />
             <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400">Verified Business Secure Login</p>
          </div>
        </div>
      </div>
    );
  }

  const renderIndustryWidgets = () => {
    switch (selectedIndustry) {
      case 'FUEL':
        return (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 sm:mb-10">
              <InventoryToggle label="Petrol" status={fuelStock.petrol} onClick={() => setFuelStock({...fuelStock, petrol: !fuelStock.petrol})} icon={<Fuel size={20}/>} />
              <InventoryToggle label="Diesel" status={fuelStock.diesel} onClick={() => setFuelStock({...fuelStock, diesel: !fuelStock.diesel})} icon={<Fuel size={20}/>} />
              <InventoryToggle label="CNG" status={fuelStock.cng} onClick={() => setFuelStock({...fuelStock, cng: !fuelStock.cng})} icon={<Zap size={20}/>} />
            </div>
            <div className="bg-slate-900 rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 text-white mb-8 sm:mb-10 shadow-3xl shadow-indigo-100 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-indigo-400 mb-3">Pump Throughput</p>
                  <p className="text-4xl sm:text-5xl font-black">4,200 <span className="text-lg sm:text-xl text-slate-400">L</span></p>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10"><Fuel size={120} /></div>
            </div>
          </>
        );
      case 'HOSPITALITY':
      case 'FOOD':
        return (
           <>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8 sm:mb-10">
              <InventoryToggle label={selectedIndustry === 'FOOD' ? "Tables" : "Deluxe"} status={roomStock.deluxe} onClick={() => setRoomStock({...roomStock, deluxe: !roomStock.deluxe})} icon={selectedIndustry === 'FOOD' ? <Utensils size={20}/> : <BedDouble size={20}/>} />
              <InventoryToggle label={selectedIndustry === 'FOOD' ? "Private" : "Standard"} status={roomStock.standard} onClick={() => setRoomStock({...roomStock, standard: !roomStock.standard})} icon={selectedIndustry === 'FOOD' ? <Coffee size={20}/> : <Key size={20}/>} />
              <InventoryToggle label={selectedIndustry === 'FOOD' ? "Events" : "Suites"} status={roomStock.suite} onClick={() => setRoomStock({...roomStock, suite: !roomStock.suite})} icon={<CheckCircle2 size={20}/>} />
            </div>
            <div className="bg-rose-600 rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 text-white mb-8 sm:mb-10 shadow-3xl shadow-rose-100 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-rose-200 mb-3">{selectedIndustry === 'FOOD' ? 'Table Occupancy' : 'Occupancy Rate'}</p>
                  <p className="text-4xl sm:text-5xl font-black">84%</p>
                  <p className="text-xs font-bold mt-2 opacity-80">{selectedIndustry === 'FOOD' ? '4 Tables Available' : '12 Rooms Remaining'}</p>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10">{selectedIndustry === 'FOOD' ? <Utensils size={120} /> : <BedDouble size={120} />}</div>
            </div>
           </>
        );
      case 'HEALTHCARE':
        return (
           <>
            <div className="flex gap-4 mb-10 overflow-x-auto">
               <div className="bg-white p-6 rounded-[2rem] border border-slate-100 min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ER Wait</p>
                  <p className="text-3xl font-black text-slate-900">{erStats.waitTime}</p>
               </div>
               <div className="bg-white p-6 rounded-[2rem] border border-slate-100 min-w-[140px]">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">ER Beds</p>
                  <p className="text-3xl font-black text-emerald-500">{erStats.beds}</p>
               </div>
            </div>
            <div className="bg-emerald-600 rounded-3xl sm:rounded-[3rem] p-6 sm:p-10 text-white mb-8 sm:mb-10 shadow-3xl shadow-emerald-100 relative overflow-hidden">
               <div className="relative z-10">
                  <p className="text-[10px] font-black uppercase tracking-widest text-emerald-200 mb-3">Trauma Center Status</p>
                  <p className="text-3xl font-black">Operational</p>
                  <p className="text-xs font-bold mt-2 opacity-80">Ambulance Bay: Open</p>
               </div>
               <div className="absolute right-0 bottom-0 opacity-10"><Stethoscope size={120} /></div>
            </div>
           </>
        );
      default:
         return (
            <div className="bg-slate-100 rounded-[2rem] p-8 text-center border border-slate-200 mb-8">
               <p className="text-slate-400 text-xs font-bold">Widget configuration coming soon for this category.</p>
            </div>
         );
    }
  };

  return (
    <div className="p-4 sm:p-6 pt-16 sm:pt-20 bg-white min-h-screen pb-28 sm:pb-40 overflow-y-auto custom-scrollbar">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 sm:mb-8 gap-3">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-none">Partner Hub</h1>
          <p className="text-[10px] text-slate-400 font-black uppercase mt-3 tracking-widest flex items-center gap-2">
             <Store size={12} className="text-indigo-600" /> {name}
          </p>
        </div>
        <button 
          onClick={() => setIsLive(!isLive)}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl border transition-all ${
            isLive ? 'bg-emerald-50 border-emerald-100 text-emerald-600' : 'bg-slate-100 border-slate-200 text-slate-400'
          }`}
        >
          <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-emerald-500 animate-pulse' : 'bg-slate-300'}`}></div>
          <span className="text-[10px] font-black uppercase tracking-widest">{isLive ? 'Live' : 'Offline'}</span>
        </button>
      </div>

      {/* Industry Switcher */}
      <div className="flex gap-2 p-1 bg-slate-100 rounded-[1.5rem] mb-6 sm:mb-8 overflow-x-auto no-scrollbar">
        <IndustryTab label="Fuel & EV" active={selectedIndustry === 'FUEL'} onClick={() => setSelectedIndustry('FUEL')} />
        <IndustryTab label="Hospitality" active={selectedIndustry === 'HOSPITALITY'} onClick={() => setSelectedIndustry('HOSPITALITY')} />
        <IndustryTab label="Food" active={selectedIndustry === 'FOOD'} onClick={() => setSelectedIndustry('FOOD')} />
        <IndustryTab label="Health" active={selectedIndustry === 'HEALTHCARE'} onClick={() => setSelectedIndustry('HEALTHCARE')} />
        <IndustryTab label="Auto" active={selectedIndustry === 'AUTO'} onClick={() => setSelectedIndustry('AUTO')} />
        <IndustryTab label="Retail" active={selectedIndustry === 'RETAIL'} onClick={() => setSelectedIndustry('RETAIL')} />
      </div>

      {/* Dynamic Content */}
      {renderIndustryWidgets()}

      {/* General Analytics */}
      <div className="mb-10">
         <div className="flex justify-between items-center mb-4 px-1">
            <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">Performance</h3>
            <button onClick={() => setActiveModal('ANALYTICS')} className="text-[10px] font-bold text-indigo-500 hover:text-indigo-600 flex items-center gap-1">
               View Report <ChevronRight size={12} />
            </button>
         </div>
         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm cursor-pointer hover:border-indigo-100 transition-colors" onClick={() => setActiveModal('ANALYTICS')}>
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
                     <Users size={16} />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Visits</span>
               </div>
               <p className="text-3xl font-black text-slate-900">1,248</p>
               <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={10} /> +12% this week
               </p>
            </div>
            <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
               <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-full bg-purple-50 text-purple-500 flex items-center justify-center">
                     <Navigation size={16} />
                  </div>
                  <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Nav Clicks</span>
               </div>
               <p className="text-3xl font-black text-slate-900">342</p>
               <p className="text-[10px] text-emerald-500 font-bold mt-1 flex items-center gap-1">
                  <TrendingUp size={10} /> +5% this week
               </p>
            </div>
         </div>
      </div>

      {/* Common Tools */}
      <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6 px-1">Management Suite</h3>
      <div className="space-y-4">
        <PortalAction icon={<MapPin className="text-rose-500" />} title="Location Manager" desc="Update map pin & zone" onClick={() => setActiveModal('LOCATION')} />
        <PortalAction icon={<CameraIcon className="text-slate-900" />} title="Security Cameras" desc="Connect CCTV & Safety" badge="Beta" onClick={() => setActiveModal('CAMERAS')} />
        <PortalAction icon={<QrCode className="text-slate-900" />} title="Check-in QR" desc="Generate standee code" onClick={() => setActiveModal('QR')} />
        <PortalAction icon={<MessageSquare className="text-emerald-600" />} title="Customer Reviews" desc="Respond to feedback" badge="3 New" onClick={() => setActiveModal('REVIEWS')} />
        <PortalAction icon={<Store className="text-blue-600" />} title="Business Profile" desc="Edit details & location" onClick={() => setActiveModal('PROFILE')} />
        <PortalAction icon={<Megaphone className="text-indigo-600" />} title="Broadcast Offer" desc="Push to nearby drivers" badge="Boost" onClick={() => setActiveModal('PROMO')} />
        <PortalAction icon={<Utensils className="text-orange-500" />} title="Update Services" desc="Menu, Rooms, or Rates" onClick={() => setActiveModal('SERVICES')} />
        <PortalAction icon={<ImageIcon className="text-emerald-500" />} title="Facility Photos" desc="Manage gallery" />
        <PortalAction icon={<Users className="text-blue-500" />} title="Staff Access" desc="Manage shifts" />
        <PortalAction icon={<Activity className="text-rose-500" />} title="Emergency Protocols" desc="Update SOS status" />
      </div>

      {/* Logout/Back */}
      <button 
         onClick={() => setIsBusinessMode(false)}
         className="w-full mt-12 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 hover:text-red-500 transition-colors"
      >
         Log Out of Dashboard
      </button>

      {/* Modals */}
      {activeModal !== 'NONE' && (
         <div className="fixed inset-0 z-[2000] bg-slate-900/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in duration-200">
            <div className="bg-white w-full max-w-lg rounded-t-[2rem] sm:rounded-[2.5rem] p-5 sm:p-8 animate-in slide-in-from-bottom-10 duration-300 max-h-[90vh] overflow-y-auto shadow-2xl">
               <div className="flex justify-between items-center mb-6 sm:mb-8 gap-3">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                     {activeModal === 'PROFILE' && 'Business Profile'}
                     {activeModal === 'PROMO' && 'Broadcast Offer'}
                     {activeModal === 'SERVICES' && 'Services & Facilities'}
                     {activeModal === 'QR' && 'Your QR Standee'}
                     {activeModal === 'REVIEWS' && 'Customer Reviews'}
                     {activeModal === 'ANALYTICS' && 'Performance Report'}
                     {activeModal === 'LOCATION' && 'Location & Zone'}
                     {activeModal === 'CAMERAS' && 'Security Center'}
                  </h2>
                  <button onClick={() => setActiveModal('NONE')} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 transition-colors">
                     <X size={20} className="text-slate-500" />
                  </button>
               </div>

               {activeModal === 'LOCATION' && (
                  <div className="h-[320px] sm:h-[400px] bg-slate-100 rounded-3xl overflow-hidden relative">
                     <MapComponent 
                        center={businessData?.coords || [28.610, 77.215]} 
                        navState='IDLE' 
                        activeView='BUSINESS' 
                        services={businessData ? [businessData] : []}
                     />
                     <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-white/50 shadow-lg">
                        <div className="flex items-center gap-3">
                           <div className="w-10 h-10 bg-rose-50 rounded-full flex items-center justify-center text-rose-500">
                              <MapPin size={20} />
                           </div>
                           <div>
                              <p className="text-xs font-black uppercase text-slate-400">Current Pin</p>
                              <p className="text-sm font-bold text-slate-900">{businessData?.coords ? `${businessData.coords[0].toFixed(4)}, ${businessData.coords[1].toFixed(4)}` : "Not Set"}</p>
                           </div>
                        </div>
                        <button className="w-full mt-3 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-slate-800 transition-colors">
                           Update Pin Position
                        </button>
                     </div>
                  </div>
               )}

               {activeModal === 'CAMERAS' && (
                  <div className="space-y-6">
                     <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">Network Status</p>
                           <p className="text-2xl font-black mb-1">Protected</p>
                           <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                              <ShieldCheck size={12} /> Connected to TravelSafe Grid
                           </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10">
                           <Video size={100} />
                        </div>
                     </div>

                     <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Your Cameras</h4>
                        <div className="space-y-3">
                           <div className="p-4 rounded-2xl border border-slate-100 flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600">
                                    <Video size={20} />
                                 </div>
                                 <div>
                                    <p className="font-bold text-sm text-slate-900">Main Entrance</p>
                                    <p className="text-[10px] font-bold text-emerald-500">Live • Recording</p>
                                 </div>
                              </div>
                              <button className="text-[10px] font-black text-slate-400 uppercase tracking-widest hover:text-indigo-600">View</button>
                           </div>
                           <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs hover:border-indigo-200 hover:text-indigo-500 transition-colors flex items-center justify-center gap-2">
                              <Plus size={16} /> Connect New Camera
                           </button>
                        </div>
                     </div>

                     <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Nearby Safety Cams</h4>
                        <div className="space-y-3 max-h-[200px] overflow-y-auto custom-scrollbar">
                           {SafetyDataService.getNearbyHazards(businessData?.coords?.[0] || 28.610, businessData?.coords?.[1] || 77.215, 5).map(cam => (
                              <div key={cam.id} className="p-3 rounded-xl bg-slate-50 flex items-center gap-3">
                                 <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-500 shadow-sm">
                                    <CameraIcon size={16} />
                                 </div>
                                 <div className="flex-1">
                                    <p className="font-bold text-xs text-slate-900">{cam.message}</p>
                                    <p className="text-[10px] text-slate-400 font-bold">{(cam.radius / 1000).toFixed(1)}km away</p>
                                 </div>
                              </div>
                           ))}
                           {SafetyDataService.getNearbyHazards(businessData?.coords?.[0] || 28.610, businessData?.coords?.[1] || 77.215, 5).length === 0 && (
                              <p className="text-xs text-slate-400 italic">No public safety cameras detected nearby.</p>
                           )}
                        </div>
                     </div>
                  </div>
               )}
               
               {activeModal === 'QR' && (
                  <div className="flex flex-col items-center text-center">
                     <div className="bg-white p-4 sm:p-6 rounded-3xl shadow-xl border border-slate-100 mb-6">
                        <QrCode size={160} className="text-slate-900 sm:w-[200px] sm:h-[200px]" />
                     </div>
                     <p className="text-sm font-bold text-slate-900 mb-2">Scan to Check-in & Review</p>
                     <p className="text-xs text-slate-500 max-w-xs mb-8">Place this QR code at your counter. Customers can scan it to view your menu, pay, or leave a review.</p>
                     
                     <div className="flex flex-col sm:flex-row gap-3 w-full">
                        <button className="flex-1 py-4 rounded-xl bg-indigo-50 text-indigo-600 font-black uppercase tracking-widest hover:bg-indigo-100 transition-colors flex items-center justify-center gap-2">
                           <Share2 size={16} /> Share
                        </button>
                        <button className="flex-1 py-4 rounded-xl bg-slate-900 text-white font-black uppercase tracking-widest hover:bg-slate-800 transition-colors flex items-center justify-center gap-2">
                           <ArrowRight size={16} /> Print
                        </button>
                     </div>
                  </div>
               )}

               {activeModal === 'REVIEWS' && (
                  <div className="space-y-6">
                     <div className="flex flex-col sm:flex-row items-center justify-between bg-slate-50 p-4 rounded-2xl gap-4 sm:gap-0">
                        <div className="text-center px-4">
                           <p className="text-3xl font-black text-slate-900">4.8</p>
                           <div className="flex gap-1 text-orange-400 justify-center my-1">
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                              <Star size={12} fill="currentColor" />
                           </div>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Total Rating</p>
                        </div>
                        <div className="h-10 w-px bg-slate-200"></div>
                        <div className="text-center px-4">
                           <p className="text-3xl font-black text-slate-900">128</p>
                           <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-2">Reviews</p>
                        </div>
                     </div>

                     <div className="space-y-4">
                        {reviews.map((review) => (
                           <div key={review.id} className="p-4 border border-slate-100 rounded-2xl hover:bg-slate-50 transition-colors">
                              <div className="flex justify-between items-start mb-2">
                                 <div>
                                    <p className="font-bold text-slate-900 text-sm">{review.user}</p>
                                    <div className="flex gap-0.5 text-orange-400 mt-0.5">
                                       {[...Array(5)].map((_, i) => (
                                          <Star key={i} size={10} fill={i < review.rating ? "currentColor" : "none"} className={i >= review.rating ? "text-slate-300" : ""} />
                                       ))}
                                    </div>
                                 </div>
                                 <span className="text-[10px] text-slate-400 font-bold">{review.time}</span>
                              </div>
                              <p className="text-xs text-slate-600 leading-relaxed mb-3">"{review.text}"</p>
                              <button className="text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:text-indigo-700">Reply</button>
                           </div>
                        ))}
                     </div>
                  </div>
               )}

               {activeModal === 'ANALYTICS' && (
                  <div className="space-y-6">
                     <div className="bg-slate-900 rounded-[2rem] p-6 text-white relative overflow-hidden">
                        <div className="relative z-10">
                           <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2">Total Revenue</p>
                           <p className="text-4xl font-black mb-1">$12,450</p>
                           <p className="text-xs font-medium text-emerald-400 flex items-center gap-1">
                              <TrendingUp size={12} /> +18% vs last week
                           </p>
                        </div>
                        <div className="absolute right-0 bottom-0 opacity-10">
                           <BarChart3 size={100} />
                        </div>
                     </div>

                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Profile Views</p>
                           <p className="text-xl sm:text-2xl font-black text-slate-900">3,240</p>
                        </div>
                        <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Conversions</p>
                           <p className="text-xl sm:text-2xl font-black text-slate-900">8.4%</p>
                        </div>
                     </div>

                     <div>
                        <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest mb-4">Weekly Traffic</h4>
                        <div className="flex items-end gap-2 h-32 pb-2 border-b border-slate-100">
                           {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                              <div key={i} className="flex-1 bg-indigo-100 rounded-t-lg relative group hover:bg-indigo-500 transition-colors">
                                 <div className="absolute bottom-0 w-full bg-indigo-500 rounded-t-lg transition-all group-hover:bg-indigo-600" style={{ height: `${h}%` }}></div>
                              </div>
                           ))}
                        </div>
                        <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-400 uppercase">
                           <span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span>
                        </div>
                     </div>
                  </div>
               )}

               {activeModal === 'PROFILE' && (
                  <div className="space-y-4">
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Business Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Description</label>
                        <textarea rows={3} value={desc} onChange={(e) => setDesc(e.target.value)} className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Opening Time</label>
                           <input type="time" defaultValue="06:00" className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                        <div>
                           <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Closing Time</label>
                           <input type="time" defaultValue="23:00" className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                        </div>
                     </div>
                     <button onClick={handleProfileSave} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest mt-4 hover:bg-slate-800 transition-colors">Save Changes</button>
                  </div>
               )}

               {activeModal === 'PROMO' && (
                  <div className="space-y-4">
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Offer Title</label>
                        <input type="text" value={promoTitle} onChange={(e) => setPromoTitle(e.target.value)} placeholder="e.g. Free Coffee with Fuel" className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Discount Code</label>
                        <input type="text" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="TRAVELSAFE20" className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none" />
                     </div>
                     <div>
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 block">Validity</label>
                        <select className="w-full bg-slate-50 border-none rounded-xl p-4 font-bold text-slate-900 focus:ring-2 focus:ring-indigo-500 outline-none">
                           <option>24 Hours</option>
                           <option>3 Days</option>
                           <option>1 Week</option>
                        </select>
                     </div>
                     <button onClick={handlePromoSave} className="w-full bg-indigo-600 text-white py-4 rounded-xl font-black uppercase tracking-widest mt-4 hover:bg-indigo-700 transition-colors shadow-lg shadow-indigo-200">Broadcast Now</button>
                  </div>
               )}

               {activeModal === 'SERVICES' && (
                  <div>
                     <p className="text-slate-500 font-medium mb-6">Select available services for {selectedIndustry}. These will be visible to travelers instantly.</p>
                     <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[320px] sm:max-h-[400px] overflow-y-auto">
                        {availableServices.map((service) => (
                           <div 
                             key={service} 
                             onClick={() => {
                                if (amenities.includes(service)) {
                                   setAmenities(amenities.filter(a => a !== service));
                                } else {
                                   setAmenities([...amenities, service]);
                                }
                             }}
                             className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-3 ${amenities.includes(service) ? 'border-indigo-500 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-500'}`}
                           >
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border ${amenities.includes(service) ? 'bg-indigo-500 border-indigo-500' : 'border-slate-300'}`}>
                                 {amenities.includes(service) && <CheckCircle2 size={12} className="text-white" />}
                              </div>
                              <span className="font-bold text-sm">{service}</span>
                           </div>
                        ))}
                     </div>
                     <button onClick={handleServicesSave} className="w-full bg-slate-900 text-white py-4 rounded-xl font-black uppercase tracking-widest mt-8 hover:bg-slate-800 transition-colors">Update Services</button>
                  </div>
               )}
            </div>
         </div>
      )}
    </div>
  );
};

const IndustryCard: React.FC<{ icon: React.ReactNode, label: string, desc: string, onClick?: () => void }> = ({ icon, label, desc, onClick }) => (
  <div onClick={onClick} className="bg-white/5 backdrop-blur-md border border-white/10 p-3 sm:p-4 rounded-2xl hover:bg-white/10 transition-colors cursor-pointer group">
    <div className="w-9 h-9 sm:w-10 sm:h-10 bg-white/10 rounded-xl flex items-center justify-center mb-2 sm:mb-3 group-hover:scale-110 transition-transform">
      {icon}
    </div>
    <h4 className="text-white font-bold text-xs sm:text-sm mb-0.5 leading-tight">{label}</h4>
    <p className="text-slate-400 text-[10px] font-medium leading-tight">{desc}</p>
  </div>
);

const IndustryTab: React.FC<{ label: string; active: boolean; onClick: () => void }> = ({ label, active, onClick }) => (
  <button 
    onClick={onClick}
    className={`flex-1 py-3 px-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
      active ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-400 hover:text-slate-600'
    }`}
  >
    {label}
  </button>
);

const InventoryToggle: React.FC<{ label: string; status: boolean; onClick: () => void; icon: React.ReactNode }> = ({ label, status, onClick, icon }) => (
  <button 
    onClick={onClick}
    className={`p-3 sm:p-4 rounded-3xl sm:rounded-[2rem] flex flex-col items-center gap-2 sm:gap-3 border-2 transition-all ${
      status ? 'bg-white border-slate-100 shadow-xl shadow-slate-100' : 'bg-slate-50 border-slate-200'
    }`}
  >
    <div className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all ${status ? 'bg-slate-900 text-white' : 'bg-slate-200 text-slate-400'}`}>
      {icon}
    </div>
    <span className={`text-[9px] font-black uppercase tracking-widest ${status ? 'text-slate-900' : 'text-slate-400'}`}>{label}</span>
  </button>
);

const PortalAction: React.FC<{ icon: React.ReactNode; title: string; desc: string; badge?: string; onClick?: () => void }> = ({ icon, title, desc, badge, onClick }) => (
  <div onClick={onClick} className="bg-white p-4 sm:p-6 rounded-3xl sm:rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center gap-3 sm:gap-5 active:bg-slate-50 transition-all cursor-pointer group">
    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-slate-50 rounded-2xl sm:rounded-[1.75rem] flex items-center justify-center group-hover:bg-white group-hover:shadow-xl transition-all">{icon}</div>
    <div className="flex-1">
      <div className="flex items-center gap-3">
        <p className="font-black text-slate-900 text-sm sm:text-base tracking-tight leading-tight">{title}</p>
        {badge && <span className="bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">{badge}</span>}
      </div>
      <p className="text-[11px] sm:text-xs text-slate-400 font-medium mt-1 leading-tight">{desc}</p>
    </div>
    <ChevronRight className="text-slate-200 group-hover:translate-x-1 transition-transform shrink-0" size={20} />
  </div>
);

export default BusinessDashboard;

