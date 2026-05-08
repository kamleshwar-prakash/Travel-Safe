
import React, { useState, useEffect } from 'react';
import { Timer, Coffee, AlertTriangle, Moon } from 'lucide-react';

interface DriverWellnessMonitorProps {
  isNavigating: boolean;
}

const DriverWellnessMonitor: React.FC<DriverWellnessMonitorProps> = ({ isNavigating }) => {
  const [driveTime, setDriveTime] = useState(0); // in seconds
  const [lastRestTime, setLastRestTime] = useState(Date.now());
  const [fatigueLevel, setFatigueLevel] = useState<'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'>('LOW');
  const [showAlert, setShowAlert] = useState(false);

  // Simulate driving time accumulation
  useEffect(() => {
    let interval: any;
    if (isNavigating) {
      interval = setInterval(() => {
        setDriveTime(prev => prev + 1);
      }, 1000); // 1 second real time = 1 minute simulation time for demo purposes? 
      // No, let's keep it real-time but accelerated for demo.
      // Let's say 1 second = 5 minutes of driving for the demo to show alerts quickly.
    }
    return () => clearInterval(interval);
  }, [isNavigating]);

  // Monitor Fatigue Logic
  useEffect(() => {
    // Demo Scale: 10 seconds = 50 minutes.
    // 30 seconds = 2.5 hours -> Medium
    // 60 seconds = 5 hours -> High
    
    if (driveTime > 60) { // > 5 hours simulated
        setFatigueLevel('CRITICAL');
        setShowAlert(true);
    } else if (driveTime > 40) { // > 3 hours simulated
        setFatigueLevel('HIGH');
        setShowAlert(true);
    } else if (driveTime > 20) { // > 1.5 hours simulated
        setFatigueLevel('MEDIUM');
    } else {
        setFatigueLevel('LOW');
        setShowAlert(false);
    }
  }, [driveTime]);

  const handleRest = () => {
    setDriveTime(0);
    setLastRestTime(Date.now());
    setFatigueLevel('LOW');
    setShowAlert(false);
  };

  if (!isNavigating) return null;

  return (
    <>
      {/* Minimized Status Widget */}
      <div className="fixed top-24 right-4 z-40 bg-white/90 backdrop-blur-md p-2 rounded-full shadow-lg border border-slate-200 flex items-center gap-2">
        <div className={`p-2 rounded-full ${
            fatigueLevel === 'LOW' ? 'bg-emerald-100 text-emerald-600' :
            fatigueLevel === 'MEDIUM' ? 'bg-yellow-100 text-yellow-600' :
            'bg-rose-100 text-rose-600 animate-pulse'
        }`}>
            <ActivityIcon level={fatigueLevel} />
        </div>
        <div className="pr-2">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">Wellness</p>
            <p className={`text-xs font-bold ${
                fatigueLevel === 'CRITICAL' ? 'text-rose-600' : 'text-slate-800'
            }`}>
                {Math.floor(driveTime / 12)}h {(driveTime % 12) * 5}m
            </p>
        </div>
      </div>

      {/* Fatigue Alert Overlay */}
      {showAlert && (
        <div className="fixed bottom-32 left-4 right-4 z-50 animate-in slide-in-from-bottom-10 fade-in duration-300">
            <div className="bg-slate-900 text-white p-5 rounded-3xl shadow-2xl border border-slate-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-4 opacity-10">
                    <Moon size={80} />
                </div>
                
                <div className="flex items-start gap-4 relative z-10">
                    <div className="w-12 h-12 bg-rose-500 rounded-2xl flex items-center justify-center shrink-0 animate-bounce">
                        <Coffee size={24} className="text-white" />
                    </div>
                    <div>
                        <h3 className="font-black text-lg text-rose-400 mb-1">Fatigue Warning</h3>
                        <p className="text-sm text-slate-300 mb-3">
                            You've been driving for {Math.floor(driveTime / 12)}h {(driveTime % 12) * 5}m. 
                            Reaction time is down by 30%.
                        </p>
                        
                        <div className="flex gap-3">
                            <button onClick={handleRest} className="flex-1 py-3 bg-white text-slate-900 rounded-xl font-bold text-xs uppercase tracking-wider hover:bg-slate-100">
                                Find Safe Stop
                            </button>
                            <button onClick={() => setShowAlert(false)} className="px-4 py-3 bg-slate-800 text-slate-400 rounded-xl font-bold text-xs hover:text-white">
                                Dismiss
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
      )}
    </>
  );
};

const ActivityIcon = ({ level }: { level: string }) => {
    switch (level) {
        case 'LOW': return <Timer size={16} />;
        case 'MEDIUM': return <AlertTriangle size={16} />;
        case 'HIGH': 
        case 'CRITICAL': return <Coffee size={16} />;
        default: return <Timer size={16} />;
    }
};

export default DriverWellnessMonitor;
