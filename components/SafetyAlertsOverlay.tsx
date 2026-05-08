
import React, { useState, useEffect } from 'react';
import { Camera, Eye, Zap, ShieldAlert, AlertCircle, CloudFog, CloudRain } from 'lucide-react';
import { AlertType } from '../types';

export interface ActiveAlert {
  type: AlertType;
  distance: number;
  message: string;
}

interface SafetyAlertsOverlayProps {
  forcedAlert?: ActiveAlert | null;
}

const SafetyAlertsOverlay: React.FC<SafetyAlertsOverlayProps> = ({ forcedAlert }) => {
  const [activeAlert, setActiveAlert] = useState<ActiveAlert | null>(null);

  useEffect(() => {
    if (forcedAlert) {
      setActiveAlert(forcedAlert);
      return;
    }
    
    // Fallback Demo Mode if no real alert provided
    const alertCycle = () => {
      const types = [AlertType.SPEED_CAMERA, AlertType.HIDDEN_SENSOR, AlertType.MONITORING, AlertType.WEATHER];
      const selectedType = types[Math.floor(Math.random() * types.length)];
      
      const messages: Record<AlertType, string> = {
        [AlertType.SPEED_CAMERA]: "Limit: 80 km/h",
        [AlertType.HIDDEN_SENSOR]: "Laser Scanning",
        [AlertType.MONITORING]: "AI Surveillance",
        [AlertType.CONSTRUCTION]: "Men at Work",
        [AlertType.ACCIDENT]: "Accident Ahead",
        [AlertType.WEATHER]: "Dense Fog Ahead",
        [AlertType.POTHOLE]: "Deep Pothole",
        [AlertType.ANIMAL]: "Animal Crossing"
      };

      if (Math.random() > 0.6) {
        setActiveAlert({
          type: selectedType,
          distance: 500,
          message: messages[selectedType]
        });
        
        let dist = 500;
        const distTimer = setInterval(() => {
          dist -= 50;
          if (dist <= 0) {
            clearInterval(distTimer);
            setActiveAlert(null);
          } else {
            setActiveAlert(prev => prev ? { ...prev, distance: dist } : null);
          }
        }, 800);

        return () => clearInterval(distTimer);
      }
    };

    const mainInterval = setInterval(alertCycle, 12000);
    return () => clearInterval(mainInterval);
  }, []);

  if (!activeAlert) return null;

  const getAlertConfig = () => {
    switch (activeAlert.type) {
      case AlertType.SPEED_CAMERA:
        return {
          icon: <Camera className="text-white" size={24} />,
          bgColor: 'bg-red-600',
          label: 'Speed Camera'
        };
      case AlertType.HIDDEN_SENSOR:
        return {
          icon: <Zap className="text-white" size={24} />,
          bgColor: 'bg-amber-600',
          label: 'Hidden Sensor'
        };
      case AlertType.WEATHER:
        return {
          icon: <CloudFog className="text-white" size={24} />,
          bgColor: 'bg-slate-700',
          label: 'Weather Alert'
        };
      case AlertType.MONITORING:
        return {
          icon: <Eye className="text-white" size={24} />,
          bgColor: 'bg-blue-600',
          label: 'Monitoring'
        };
      default:
        return {
          icon: <AlertCircle className="text-white" size={24} />,
          bgColor: 'bg-slate-700',
          label: 'Road Hazard'
        };
    }
  };

  const config = getAlertConfig();

  return (
    <div className="absolute top-44 left-0 right-0 z-[1500] pointer-events-none px-6 flex justify-center">
      <div className={`${config.bgColor} text-white rounded-[2rem] p-1.5 pr-6 shadow-2xl flex items-center gap-4 animate-in slide-in-from-top-12 duration-500 border-2 border-white/30 backdrop-blur-md`}>
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center shadow-inner relative">
           <div className="absolute inset-0 bg-white/10 rounded-full animate-ping"></div>
           {config.icon}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-80">{config.label}</span>
            <div className="w-1 h-1 bg-white/40 rounded-full"></div>
            <span className="text-[10px] font-black uppercase tracking-widest">{activeAlert.distance}m</span>
          </div>
          <p className="text-xl font-black leading-tight tracking-tight mt-0.5">{activeAlert.message}</p>
        </div>
      </div>
    </div>
  );
};

export default SafetyAlertsOverlay;
