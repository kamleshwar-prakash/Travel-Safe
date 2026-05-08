
import React from 'react';
import { Trophy, Gift, TrendingUp, Lock } from 'lucide-react';

const RewardsView: React.FC = () => {
  return (
    <div className="p-6 pt-20 bg-slate-50 min-h-screen overflow-y-auto pb-40">
       <div className="flex items-center justify-between mb-8">
          <div>
             <h1 className="text-3xl font-black text-slate-900 tracking-tight leading-none">Rewards</h1>
             <p className="text-slate-400 text-sm font-medium mt-2">Earn points for safe driving.</p>
          </div>
          <div className="w-16 h-16 bg-amber-100 rounded-3xl flex items-center justify-center text-amber-600 shadow-lg shadow-amber-100/50">
             <Trophy size={32} />
          </div>
       </div>

       <div className="bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-indigo-200 mb-8 relative overflow-hidden">
          <div className="absolute -right-10 -top-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
          <p className="text-[10px] font-black uppercase tracking-widest opacity-60 mb-1">Available Balance</p>
          <h2 className="text-5xl font-black mb-6">18,240</h2>
          
          <div className="flex gap-3">
             <button className="flex-1 bg-white text-indigo-900 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest shadow-lg">Redeem</button>
             <button className="flex-1 bg-indigo-900/50 text-white py-3 rounded-xl font-black text-[10px] uppercase tracking-widest border border-indigo-400/30">History</button>
          </div>
       </div>

       <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Active Challenges</h3>
       <div className="space-y-4 mb-8">
          <ChallengeCard title="Safe Week Streak" progress={80} reward="500 Pts" />
          <ChallengeCard title="Report 5 Hazards" progress={40} reward="250 Pts" />
       </div>

       <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Redeem For</h3>
       <div className="grid grid-cols-2 gap-4 mb-8">
          <RewardCard icon={<Gift />} title="Fuel Coupon" cost="5k Pts" />
          <RewardCard icon={<TrendingUp />} title="Pro Month" cost="10k Pts" />
          <RewardCard icon={<Lock />} title="Mystery Box" cost="2k Pts" locked />
       </div>

       <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-1">Recent Activity</h3>
       <div className="bg-white rounded-[2rem] border border-slate-100 p-6 space-y-6 shadow-sm">
          <ActivityItem label="Safe Trip Bonus" date="Today" amount="+150" />
          <ActivityItem label="Reported Hazard" date="Yesterday" amount="+50" />
          <ActivityItem label="Weekly Streak" date="Mon" amount="+500" />
       </div>
    </div>
  );
};

const ActivityItem: React.FC<{ label: string, date: string, amount: string }> = ({ label, date, amount }) => (
   <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
         <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center text-indigo-500">
            <Trophy size={16} />
         </div>
         <div>
            <p className="text-sm font-bold text-slate-900">{label}</p>
            <p className="text-[10px] font-bold text-slate-400">{date}</p>
         </div>
      </div>
      <span className="text-sm font-black text-emerald-500">{amount}</span>
   </div>
);

const ChallengeCard: React.FC<{ title: string, progress: number, reward: string }> = ({ title, progress, reward }) => (
  <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm">
     <div className="flex justify-between items-center mb-3">
        <span className="font-bold text-slate-900">{title}</span>
        <span className="text-[10px] font-black bg-amber-50 text-amber-600 px-2 py-1 rounded-lg">{reward}</span>
     </div>
     <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
        <div className="h-full bg-indigo-600 rounded-full" style={{ width: `${progress}%` }}></div>
     </div>
  </div>
);

const RewardCard: React.FC<{ icon: React.ReactNode, title: string, cost: string, locked?: boolean }> = ({ icon, title, cost, locked }) => (
  <div className={`bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col items-center text-center gap-3 ${locked ? 'opacity-60 grayscale' : ''}`}>
     <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-600">
        {icon}
     </div>
     <div>
        <p className="font-bold text-slate-900 text-sm">{title}</p>
        <p className="text-[10px] font-black text-indigo-600 uppercase mt-1">{cost}</p>
     </div>
  </div>
);

export default RewardsView;
