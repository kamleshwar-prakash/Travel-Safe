
import React from 'react';
import { 
  ArrowLeft, Star, MapPin, Phone, Share2, Navigation, 
  Clock, ShieldCheck, Wifi, Coffee, Car, Utensils, 
  Bed, Stethoscope, CheckCircle2, AlertTriangle, Heart, Award, Users, CheckCircle
} from 'lucide-react';
import { BusinessService, ServiceType } from '../types';

interface ServiceDetailsProps {
  service: BusinessService;
  onBack: () => void;
  onNavigate: () => void;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ service, onBack, onNavigate }) => {
  
  const getAmenitiesIcon = (amenity: string) => {
    const lower = amenity.toLowerCase();
    if (lower.includes('wifi')) return <Wifi size={14} />;
    if (lower.includes('food') || lower.includes('deli') || lower.includes('breakfast')) return <Utensils size={14} />;
    if (lower.includes('parking')) return <Car size={14} />;
    if (lower.includes('bed') || lower.includes('room')) return <Bed size={14} />;
    if (lower.includes('coffee')) return <Coffee size={14} />;
    if (lower.includes('trauma') || lower.includes('doctor')) return <Stethoscope size={14} />;
    return <CheckCircle2 size={14} />;
  };

  return (
    <div className="bg-white min-h-screen animate-in slide-in-from-right duration-300 pb-32 overflow-y-auto">
      {/* Hero Image Header */}
      <div className="relative h-72">
        <img src={service.image} className="w-full h-full object-cover" alt={service.name} />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-transparent"></div>
        
        {/* Navigation Bar */}
        <div className="absolute top-0 left-0 w-full p-6 pt-12 flex justify-between items-center z-10">
          <button 
            onClick={onBack}
            className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-all"
          >
            <ArrowLeft size={20} />
          </button>
          <div className="flex gap-3">
             <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-all">
                <Share2 size={18} />
             </button>
             <button className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/20 active:scale-95 transition-all">
                <Heart size={18} /> 
             </button>
          </div>
        </div>

        {/* Title Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-6 text-white">
           <div className="flex items-center gap-2 mb-2">
              <span className="bg-indigo-600 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg">
                {service.type.replace('_', ' ')}
              </span>
              {service.isVerified && (
                <span className="bg-sky-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1 shadow-lg shadow-sky-500/30">
                   <ShieldCheck size={10} /> Verified
                </span>
              )}
              {service.isOpen && (
                <span className="bg-emerald-500 text-white text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-lg flex items-center gap-1">
                   <Clock size={10} /> Open Now
                </span>
              )}
           </div>
           <h1 className="text-3xl font-black leading-tight mb-1">{service.name}</h1>
           <div className="flex items-center gap-2 opacity-90">
              <MapPin size={14} className="text-indigo-400" />
              <p className="text-sm font-medium">{service.dist} away • {service.distMin} min drive</p>
           </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 -mt-4 bg-white rounded-t-[2rem] relative z-10">

        {/* Safe Stop Certification Banner */}
        {service.isSafeStop && (
           <div className="mb-6 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl p-4 text-white shadow-lg shadow-emerald-200 relative overflow-hidden">
              <div className="absolute right-0 bottom-0 opacity-10">
                 <ShieldCheck size={80} />
              </div>
              <div className="relative z-10">
                 <div className="flex items-center gap-2 mb-2">
                    <div className="bg-white/20 p-1.5 rounded-lg backdrop-blur-sm">
                       <Award size={16} className="text-white" />
                    </div>
                    <span className="text-xs font-black uppercase tracking-widest">TravelSafe Certified</span>
                 </div>
                 <h3 className="text-lg font-bold mb-3">Verified Safe Stop</h3>
                 <div className="flex flex-wrap gap-2">
                    {service.safetyFeatures?.map((feature, i) => (
                       <span key={i} className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm">
                          <CheckCircle size={10} /> {feature}
                       </span>
                    ))}
                    {!service.safetyFeatures && (
                       <>
                          <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm"><CheckCircle size={10} /> 24/7 CCTV</span>
                          <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm"><CheckCircle size={10} /> Clean Restrooms</span>
                          <span className="px-2 py-1 bg-white/20 rounded-lg text-[10px] font-bold flex items-center gap-1 backdrop-blur-sm"><CheckCircle size={10} /> Well Lit</span>
                       </>
                    )}
                 </div>
              </div>
           </div>
        )}
        
        {/* Quick Stats */}
        <div className="flex gap-4 mb-8 border-b border-slate-100 pb-6">
           <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Rating</p>
              <div className="flex items-center gap-1.5">
                 <Star size={18} className="text-amber-500 fill-amber-500" />
                 <span className="text-xl font-black text-slate-900">{service.rating}</span>
                 <span className="text-xs font-bold text-slate-400">({service.reviews})</span>
              </div>
           </div>
           <div className="w-px bg-slate-100"></div>
           <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Safety</p>
              <div className="flex items-center gap-1.5">
                 <ShieldCheck size={18} className="text-emerald-500" />
                 <span className="text-xl font-black text-slate-900">98%</span>
              </div>
           </div>
           <div className="w-px bg-slate-100"></div>
           <div className="flex-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Price</p>
              <div className="flex items-center gap-1.5">
                 <span className="text-xl font-black text-slate-900">{service.price || '$$'}</span>
              </div>
           </div>
        </div>

        {/* Promotions Section */}
        {service.promotions && service.promotions.length > 0 && (
           <div className="mb-8 animate-in slide-in-from-bottom-4 duration-500 delay-100">
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
                 <span className="text-indigo-600">Exclusive Offers</span>
              </h3>
              <div className="space-y-3">
                 {service.promotions.filter(p => p.isActive).map((promo, idx) => (
                    <div key={idx} className="bg-gradient-to-r from-indigo-600 to-violet-600 p-5 rounded-2xl text-white shadow-lg shadow-indigo-200 relative overflow-hidden">
                       <div className="relative z-10">
                          <div className="flex justify-between items-start mb-2">
                             <span className="bg-white/20 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest">
                                Limited Time
                             </span>
                             <span className="text-[10px] font-bold opacity-80">{promo.validity} left</span>
                          </div>
                          <h4 className="text-xl font-black mb-1">{promo.title}</h4>
                          <p className="text-xs font-medium opacity-90 mb-3">Use code at checkout</p>
                          <div className="bg-white text-indigo-900 px-4 py-2 rounded-xl font-mono font-black text-center border-2 border-dashed border-indigo-200">
                             {promo.code}
                          </div>
                       </div>
                       {/* Decorative Circles */}
                       <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                       <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-indigo-500/30 rounded-full blur-2xl"></div>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* Description */}
        <div className="mb-8">
           <h3 className="text-lg font-black text-slate-900 mb-2">About</h3>
           <p className="text-slate-500 text-sm leading-relaxed font-medium">
             {service.desc || service.description || "Experience premium service at this location. Verified for safety and comfort by the TravelSafe community. Features secure parking and 24/7 surveillance."}
           </p>
        </div>

        {/* EV / Fuel Specifics */}
        {service.evDetails && (
          <div className="mb-8">
            <h3 className="text-lg font-black text-slate-900 mb-4">Charging Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {service.evDetails.plugs.map((plug, idx) => (
                <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                   <p className="text-xs font-black text-slate-900 uppercase mb-1">{plug.type}</p>
                   <p className={`text-2xl font-black ${plug.available > 0 ? 'text-emerald-500' : 'text-slate-300'}`}>
                      {plug.available}<span className="text-sm text-slate-400">/{plug.count}</span>
                   </p>
                   <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Available</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Amenities Grid */}
        <div className="mb-8">
           <h3 className="text-lg font-black text-slate-900 mb-4">Amenities</h3>
           <div className="grid grid-cols-2 gap-3">
              {(service.amenities || ['Secure Parking', 'Restrooms', 'WiFi', 'Wheelchair Access']).map((item, idx) => (
                 <div key={idx} className="flex items-center gap-3 p-3 rounded-xl bg-slate-50 text-slate-600">
                    <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-sm text-indigo-600">
                       {getAmenitiesIcon(item)}
                    </div>
                    <span className="text-xs font-bold">{item}</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Emergency Badge for Hospitals */}
        {service.type === ServiceType.HOSPITAL && (
           <div className="bg-red-50 p-4 rounded-2xl border border-red-100 flex items-start gap-3 mb-8">
              <AlertTriangle className="text-red-500 shrink-0" size={20} />
              <div>
                 <h4 className="text-sm font-black text-red-700">Trauma Center Active</h4>
                 <p className="text-xs text-red-600/80 mt-1 font-medium">Priority ambulance lane is open. Helipad standby confirmed.</p>
              </div>
           </div>
        )}

      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 p-6 bg-white border-t border-slate-100 flex gap-3 z-20 pb-8">
         <button className="flex-1 bg-slate-100 text-slate-900 py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 active:scale-95 transition-all">
            <Phone size={16} /> Call
         </button>
         <button 
           onClick={onNavigate}
           className="flex-[2] bg-indigo-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl shadow-indigo-200 active:scale-95 transition-all"
         >
            <Navigation size={16} /> Navigate
         </button>
      </div>
    </div>
  );
};

export default ServiceDetails;
