
import React from 'react';
import { ArrowLeft, User, Bell, Shield, Moon, Volume2, Globe, LogOut, ChevronRight, Car } from 'lucide-react';

interface SettingsViewProps {
  onBack: () => void;
  onOpenVehicle: () => void;
}

const SettingsView: React.FC<SettingsViewProps> = ({ onBack, onOpenVehicle }) => {
  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-white px-6 pt-12 pb-6 rounded-b-[2.5rem] shadow-sm mb-6">
         <div className="flex items-center gap-4 mb-6">
            <button 
              onClick={onBack}
              className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-slate-600 hover:bg-slate-200 transition-colors"
            >
               <ArrowLeft size={20} />
            </button>
            <h1 className="text-2xl font-black text-slate-900">Settings</h1>
         </div>
         
         <div className="flex items-center gap-4" onClick={onOpenVehicle}>
            <div className="w-16 h-16 bg-indigo-100 rounded-2xl flex items-center justify-center text-indigo-600 border-2 border-indigo-200">
               <User size={32} />
            </div>
            <div>
               <h2 className="text-lg font-black text-slate-900">Johnathan Road</h2>
               <p className="text-xs font-bold text-slate-400">Voyager Gold Member</p>
            </div>
         </div>
      </div>

      <div className="px-6 space-y-6">
         <Section title="Vehicle">
             <button onClick={onOpenVehicle} className="w-full">
                <SettingItem icon={<Car />} label="My Garage" value="Toyota Camry" />
             </button>
         </Section>

         <Section title="Preferences">
            <SettingItem icon={<Bell />} label="Notifications" toggle />
            <SettingItem icon={<Volume2 />} label="Voice Guidance" toggle defaultChecked />
            <SettingItem icon={<Moon />} label="Dark Mode" toggle />
         </Section>

         <Section title="Navigation & Map">
            <SettingItem icon={<Globe />} label="Offline Maps" value="420 MB" />
            <SettingItem icon={<Shield />} label="Safety Alerts" value="Max" />
         </Section>

         <Section title="Account">
            <button className="w-full flex items-center justify-between p-4 bg-white rounded-2xl border border-slate-100 text-rose-500 font-bold active:scale-[0.98] transition-all">
               <div className="flex items-center gap-3">
                  <LogOut size={20} />
                  <span>Log Out</span>
               </div>
            </button>
         </Section>

         <p className="text-center text-[10px] font-bold text-slate-300 uppercase tracking-widest mt-8">
            TravelSafe OS v2.4.1 (Build 8902)
         </p>
      </div>
    </div>
  );
};

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div>
     <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-3 ml-2">{title}</h3>
     <div className="space-y-3">
        {children}
     </div>
  </div>
);

const SettingItem: React.FC<{ icon: React.ReactNode; label: string; toggle?: boolean; defaultChecked?: boolean; value?: string }> = ({ icon, label, toggle, defaultChecked, value }) => (
   <div className="bg-white p-4 rounded-2xl border border-slate-100 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-3 text-slate-600">
         {icon}
         <span className="font-bold text-slate-900 text-sm">{label}</span>
      </div>
      {toggle ? (
         <div className="relative inline-flex items-center cursor-pointer">
            <input type="checkbox" className="sr-only peer" defaultChecked={defaultChecked} />
            <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-indigo-600"></div>
         </div>
      ) : (
         <div className="flex items-center gap-2 text-slate-400">
            <span className="text-xs font-bold">{value}</span>
            <ChevronRight size={16} />
         </div>
      )}
   </div>
);

export default SettingsView;
