import React, { useMemo } from 'react';
import { ArrowLeft, ShieldCheck, Route, MoonStar, Car, TriangleAlert } from 'lucide-react';
import { SafetyPoint } from '../types';
import { SafetyDataService } from '../services/SafetyDataService';

interface SafetyInsightsProps {
  onBack: () => void;
  userLocation: [number, number];
  hazards: SafetyPoint[];
}

const SafetyInsights: React.FC<SafetyInsightsProps> = ({ onBack, userLocation, hazards }) => {
  const risk = useMemo(
    () => SafetyDataService.calculateRouteRisk(userLocation, [userLocation[0] + 0.12, userLocation[1] + 0.12]),
    [userLocation]
  );

  const topHazards = useMemo(() => hazards.filter((h) => h.severity !== 'LOW').slice(0, 4), [hazards]);

  return (
    <div className="fixed inset-0 z-[2200] bg-slate-50 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm border-b border-slate-100 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest">Safety Insights</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24 space-y-5">
        <div className="rounded-[2rem] bg-slate-900 text-white p-6">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300 mb-2">Route Risk Index</p>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-5xl font-black leading-none">{risk.score}</span>
            <span className="text-sm font-bold text-slate-300 mb-1">/100</span>
          </div>
          <p className="text-xs font-semibold text-slate-300 leading-relaxed">{risk.recommendation}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <InsightCard icon={<ShieldCheck size={18} />} label="Safety Mode" value="Enabled" color="bg-emerald-50 text-emerald-700" />
          <InsightCard icon={<MoonStar size={18} />} label="Night Risk" value={risk.score > 50 ? 'Elevated' : 'Normal'} color="bg-indigo-50 text-indigo-700" />
          <InsightCard icon={<Car size={18} />} label="Fatigue Index" value={risk.score > 60 ? 'Watch' : 'Good'} color="bg-amber-50 text-amber-700" />
          <InsightCard icon={<Route size={18} />} label="Safe Stops" value="6 nearby" color="bg-sky-50 text-sky-700" />
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Risk Factors</p>
          <div className="space-y-2">
            {risk.factors.length === 0 && <p className="text-sm font-semibold text-slate-500">No major route risks detected.</p>}
            {risk.factors.map((factor, index) => (
              <div key={index} className="flex items-center gap-2 text-sm font-bold text-slate-700">
                <TriangleAlert size={14} className="text-rose-500" />
                <span>{factor}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white border border-slate-100 rounded-[2rem] p-5 shadow-sm">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-3">Current Alert Mix</p>
          <div className="space-y-2">
            {topHazards.length === 0 && <p className="text-sm font-semibold text-slate-500">No medium or high hazards in range.</p>}
            {topHazards.map((hazard) => (
              <div key={hazard.id} className="flex items-center justify-between text-sm font-bold text-slate-700">
                <span>{hazard.type.replaceAll('_', ' ')}</span>
                <span className="text-xs text-slate-400">{hazard.severity}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const InsightCard: React.FC<{ icon: React.ReactNode; label: string; value: string; color: string }> = ({ icon, label, value, color }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
    <p className="mt-3 text-xs font-black text-slate-400 uppercase tracking-widest">{label}</p>
    <p className="text-lg font-black text-slate-900 leading-tight">{value}</p>
  </div>
);

export default SafetyInsights;
