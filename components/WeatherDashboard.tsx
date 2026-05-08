
import React from 'react';
import { 
  CloudRain, CloudSun, Wind, Droplets, Thermometer, 
  ArrowLeft, Sun, CloudLightning, Umbrella, Navigation
} from 'lucide-react';

interface WeatherDashboardProps {
  onBack: () => void;
  location?: string;
}

const WeatherDashboard: React.FC<WeatherDashboardProps> = ({ onBack, location = "Current Location" }) => {
  // Mock Data
  const current = {
    temp: 24,
    condition: "Partly Cloudy",
    humidity: 65,
    wind: 12,
    feelsLike: 26,
    uv: "Moderate"
  };

  const hourly = [
    { time: "Now", temp: 24, icon: <CloudSun size={18}/> },
    { time: "1 PM", temp: 25, icon: <Sun size={18}/> },
    { time: "2 PM", temp: 26, icon: <Sun size={18}/> },
    { time: "3 PM", temp: 25, icon: <CloudSun size={18}/> },
    { time: "4 PM", temp: 23, icon: <CloudRain size={18}/> },
    { time: "5 PM", temp: 22, icon: <CloudLightning size={18}/> },
  ];

  const advisories = [
    { level: 'warn', title: "Visibility Alert", desc: "Fog patches expected on Highway 44. Reduce speed." },
    { level: 'info', title: "UV Index", desc: "High UV radiation around noon. Wear sunglasses." }
  ];

  return (
    <div className="fixed inset-0 z-[2000] bg-slate-50 flex flex-col overflow-y-auto animate-in slide-in-from-right duration-300">
      {/* Header */}
      <div className="p-6 pt-12 flex items-center justify-between sticky top-0 bg-slate-50/80 backdrop-blur-md z-10">
        <button onClick={onBack} className="p-3 bg-white rounded-xl shadow-sm border border-slate-100 text-slate-600 active:scale-95 transition-transform">
           <ArrowLeft size={20} />
        </button>
        <span className="font-black text-slate-900 uppercase tracking-widest text-sm">{location}</span>
        <div className="w-10"></div>
      </div>

      <div className="px-6 pb-20 space-y-6">
        
        {/* Main Weather Card */}
        <div className="relative overflow-hidden bg-gradient-to-br from-indigo-500 to-blue-600 rounded-[2.5rem] p-8 text-white shadow-xl shadow-blue-200">
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
           <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-900/20 rounded-full blur-2xl -ml-8 -mb-8"></div>
           
           <div className="relative z-10 flex flex-col items-center text-center">
              <div className="mb-4 p-4 bg-white/20 backdrop-blur-md rounded-full shadow-inner border border-white/20">
                 <CloudSun size={64} className="text-white drop-shadow-md" />
              </div>
              <h1 className="text-6xl font-black mb-2">{current.temp}°</h1>
              <p className="text-lg font-medium opacity-90 tracking-wide">{current.condition}</p>
              
              <div className="grid grid-cols-3 gap-6 mt-8 w-full">
                 <div className="flex flex-col items-center gap-1">
                    <Wind size={18} className="opacity-70" />
                    <span className="font-bold text-sm">{current.wind} km/h</span>
                    <span className="text-[10px] uppercase opacity-60">Wind</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <Droplets size={18} className="opacity-70" />
                    <span className="font-bold text-sm">{current.humidity}%</span>
                    <span className="text-[10px] uppercase opacity-60">Humidity</span>
                 </div>
                 <div className="flex flex-col items-center gap-1">
                    <Thermometer size={18} className="opacity-70" />
                    <span className="font-bold text-sm">{current.feelsLike}°</span>
                    <span className="text-[10px] uppercase opacity-60">Feels Like</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Hourly Forecast */}
        <div>
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Hourly Forecast</h3>
           <div className="flex gap-3 overflow-x-auto no-scrollbar pb-2">
              {hourly.map((h, i) => (
                 <div key={i} className={`flex-shrink-0 flex flex-col items-center justify-center p-4 rounded-2xl min-w-[80px] border ${i === 0 ? 'bg-slate-900 text-white border-slate-900 shadow-lg' : 'bg-white text-slate-600 border-slate-100'}`}>
                    <span className="text-[10px] font-bold mb-2 opacity-70">{h.time}</span>
                    <div className="mb-2">{h.icon}</div>
                    <span className="font-black text-lg">{h.temp}°</span>
                 </div>
              ))}
           </div>
        </div>

        {/* Safety Advisories */}
        <div>
           <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Travel Advisories</h3>
           <div className="space-y-3">
              {advisories.map((adv, i) => (
                 <div key={i} className={`p-5 rounded-2xl border-l-4 ${adv.level === 'warn' ? 'bg-amber-50 border-amber-500' : 'bg-blue-50 border-blue-500'}`}>
                    <div className="flex items-center gap-2 mb-1">
                       {adv.level === 'warn' ? <Umbrella size={16} className="text-amber-600" /> : <Navigation size={16} className="text-blue-600" />}
                       <h4 className={`text-sm font-black uppercase tracking-wider ${adv.level === 'warn' ? 'text-amber-700' : 'text-blue-700'}`}>{adv.title}</h4>
                    </div>
                    <p className={`text-xs font-medium leading-relaxed ${adv.level === 'warn' ? 'text-amber-800/80' : 'text-blue-800/80'}`}>{adv.desc}</p>
                 </div>
              ))}
           </div>
        </div>

      </div>
    </div>
  );
};

export default WeatherDashboard;
