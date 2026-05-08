import React, { useMemo } from 'react';
import { ArrowLeft, TriangleAlert, Radar, Car, ShieldCheck, Clock } from 'lucide-react';
import { SafetyPoint, AlertType } from '../types';

interface TrafficCenterProps {
  onBack: () => void;
  hazards: SafetyPoint[];
}

const getPriority = (type: AlertType, severity: SafetyPoint['severity']) => {
  if (type === AlertType.ACCIDENT || type === AlertType.RED_LIGHT_CAM) return 100;
  if (severity === 'HIGH') return 90;
  if (type === AlertType.CONSTRUCTION || type === AlertType.MOBILE_CAM) return 75;
  if (severity === 'MEDIUM') return 60;
  return 40;
};

const TrafficCenter: React.FC<TrafficCenterProps> = ({ onBack, hazards }) => {
  const ranked = useMemo(
    () => [...hazards].sort((a, b) => getPriority(b.type, b.severity) - getPriority(a.type, a.severity)),
    [hazards]
  );

  const highCount = ranked.filter((h) => h.severity === 'HIGH').length;
  const mediumCount = ranked.filter((h) => h.severity === 'MEDIUM').length;

  return (
    <div className="fixed inset-0 z-[2200] bg-slate-50 flex flex-col h-full overflow-hidden animate-in slide-in-from-right duration-300">
      <div className="bg-white px-6 pt-12 pb-4 shadow-sm border-b border-slate-100 flex items-center justify-between">
        <button onClick={onBack} className="p-2 -ml-2 text-slate-500 hover:text-slate-900 transition-colors">
          <ArrowLeft size={24} />
        </button>
        <h1 className="text-sm font-black text-slate-900 uppercase tracking-widest">Traffic Center</h1>
        <div className="w-8" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 pb-24">
        <div className="grid grid-cols-2 gap-4 mb-6">
          <KpiCard label="High Priority" value={String(highCount)} icon={<TriangleAlert size={18} />} color="text-rose-600 bg-rose-50" />
          <KpiCard label="Moderate Alerts" value={String(mediumCount)} icon={<Radar size={18} />} color="text-amber-600 bg-amber-50" />
        </div>

        <div className="bg-slate-900 rounded-[2rem] p-5 mb-6 text-white">
          <div className="flex items-center gap-2 mb-2">
            <Car size={16} className="text-indigo-300" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-300">Live Traffic Readiness</span>
          </div>
          <p className="text-sm font-bold text-slate-200 leading-relaxed">
            Stay in the right lane in congestion pockets and avoid hard braking near accident markers.
          </p>
        </div>

        <div className="space-y-3">
          {ranked.length === 0 && (
            <div className="bg-white border border-slate-100 rounded-2xl p-5 text-center text-sm font-bold text-slate-500">
              No active alerts in your range.
            </div>
          )}

          {ranked.map((hazard) => (
            <div key={hazard.id} className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-black text-slate-900 uppercase tracking-wider">{hazard.type.replaceAll('_', ' ')}</span>
                <span
                  className={`text-[10px] font-black px-2 py-1 rounded-full ${
                    hazard.severity === 'HIGH'
                      ? 'bg-rose-100 text-rose-700'
                      : hazard.severity === 'MEDIUM'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-emerald-100 text-emerald-700'
                  }`}
                >
                  {hazard.severity}
                </span>
              </div>
              <p className="text-xs text-slate-500 font-semibold">{hazard.description || 'Road event detected'}</p>
              <div className="mt-3 flex items-center gap-4 text-[10px] font-black text-slate-400 uppercase tracking-wider">
                <span className="inline-flex items-center gap-1"><Clock size={12} />{hazard.lastVerified || 'Live feed'}</span>
                {hazard.confidence ? <span className="inline-flex items-center gap-1"><ShieldCheck size={12} />{hazard.confidence}% conf.</span> : null}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const KpiCard: React.FC<{ label: string; value: string; icon: React.ReactNode; color: string }> = ({ label, value, icon, color }) => (
  <div className="bg-white border border-slate-100 rounded-2xl p-4 shadow-sm">
    <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>{icon}</div>
    <p className="mt-3 text-2xl font-black text-slate-900 leading-none">{value}</p>
    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{label}</p>
  </div>
);

export default TrafficCenter;
