import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { AppView, NavigationState, BusinessService, SafetyPoint, ServiceType, AlertType } from '../types';
import { ShieldCheck, Zap } from 'lucide-react';

declare global {
  interface Window {
    google: any;
    gm_authFailure: () => void;
    L: any;
  }
}

const getColorForType = (type: ServiceType) => {
  switch (type) {
    case ServiceType.GAS_STATION:
      return '#2563eb';
    case ServiceType.EV_CHARGING:
      return '#10b981';
    case ServiceType.DHABA:
    case ServiceType.RESTAURANT:
      return '#f59e0b';
    case ServiceType.HOTEL:
      return '#6366f1';
    case ServiceType.HOSPITAL:
      return '#ef4444';
    default:
      return '#64748b';
  }
};

const getHazardColor = (type: AlertType) => {
  switch (type) {
    case AlertType.ACCIDENT:
      return '#ef4444';
    case AlertType.SPEED_CAMERA:
      return '#f59e0b';
    case AlertType.AVERAGE_SPEED_CAM:
      return '#8b5cf6';
    case AlertType.RED_LIGHT_CAM:
      return '#ef4444';
    case AlertType.MOBILE_CAM:
      return '#3b82f6';
    case AlertType.DUMMY_CAM:
      return '#94a3b8';
    case AlertType.MONITORING:
      return '#64748b';
    case AlertType.HIDDEN_SENSOR:
      return '#6366f1';
    case AlertType.POTHOLE:
      return '#8b5cf6';
    case AlertType.ANIMAL:
      return '#d97706';
    case AlertType.CONSTRUCTION:
      return '#ea580c';
    default:
      return '#ef4444';
  }
};

const getServiceCode = (type: ServiceType) => {
  switch (type) {
    case ServiceType.GAS_STATION:
      return 'G';
    case ServiceType.EV_CHARGING:
      return 'E';
    case ServiceType.DHABA:
    case ServiceType.RESTAURANT:
      return 'F';
    case ServiceType.HOTEL:
      return 'H';
    case ServiceType.HOSPITAL:
      return '+';
    default:
      return 'P';
  }
};

const getHazardCode = (type: AlertType) => {
  switch (type) {
    case AlertType.SPEED_CAMERA:
      return 'SC';
    case AlertType.AVERAGE_SPEED_CAM:
      return 'AS';
    case AlertType.RED_LIGHT_CAM:
      return 'RL';
    case AlertType.MOBILE_CAM:
      return 'MC';
    case AlertType.DUMMY_CAM:
      return 'DC';
    case AlertType.MONITORING:
      return 'MN';
    case AlertType.HIDDEN_SENSOR:
      return 'HS';
    case AlertType.ACCIDENT:
      return 'AC';
    case AlertType.POTHOLE:
      return 'PH';
    case AlertType.ANIMAL:
      return 'AN';
    case AlertType.CONSTRUCTION:
      return 'CS';
    default:
      return 'HZ';
  }
};

const CustomMarkerContent: React.FC<{ service: BusinessService }> = ({ service }) => {
  const color = getColorForType(service.type);
  return (
    <div className="relative flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform duration-300">
      {service.isOpen && <div className="absolute w-12 h-12 rounded-2xl opacity-20 animate-ping" style={{ backgroundColor: color }}></div>}
      <div
        style={{ backgroundColor: color }}
        className="w-11 h-11 rounded-2xl border-[3px] border-white shadow-2xl flex items-center justify-center text-white text-sm font-black"
      >
        {getServiceCode(service.type)}
      </div>
      {service.evDetails && (
        <div className="absolute -top-2 -right-2 bg-emerald-500 text-white text-[8px] font-black px-1.5 py-0.5 rounded-full border-2 border-white shadow-lg">
          {service.evDetails.plugs[0].available}
        </div>
      )}
      {service.isVerified && (
        <div className="absolute -top-2 -left-2 bg-sky-500 text-white p-1 rounded-full border-2 border-white shadow-lg z-10">
          <ShieldCheck size={10} strokeWidth={3} />
        </div>
      )}
      <div className="absolute -bottom-1.5 w-3 h-3 bg-white rotate-45 border-r border-b border-slate-200"></div>
    </div>
  );
};

const CustomHazardMarkerContent: React.FC<{ hazard: SafetyPoint }> = ({ hazard }) => {
  const color = getHazardColor(hazard.type);
  return (
    <div className="relative flex items-center justify-center group cursor-pointer hover:scale-110 transition-transform duration-300">
      <div className="absolute w-10 h-10 rounded-full opacity-20 animate-ping" style={{ backgroundColor: color }}></div>
      <div
        style={{ backgroundColor: color }}
        className="w-9 h-9 rounded-full border-[3px] border-white shadow-2xl flex items-center justify-center text-white text-[9px] font-black relative"
      >
        {getHazardCode(hazard.type)}
        {hazard.confidence && hazard.confidence > 90 && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-white rounded-full"></div>
        )}
      </div>
      {(hazard.isZoneStart || hazard.isZoneEnd) && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md whitespace-nowrap shadow-sm">
          {hazard.isZoneStart ? 'START' : 'END'}
        </div>
      )}
      <div className="absolute -bottom-1 w-2 h-2 bg-white rotate-45 border-r border-b border-slate-200"></div>
    </div>
  );
};

const createLeafletMarkerHtml = (service: BusinessService) => {
  const color = getColorForType(service.type);
  const code = getServiceCode(service.type);
  const evBadge = service.evDetails
    ? `<div style="position:absolute; top:-6px; right:-6px; background:#10b981; color:white; padding:2px 5px; border-radius:10px; font-size:9px; font-weight:900; border:2px solid white;">${service.evDetails.plugs[0].available}</div>`
    : '';
  const verifiedBadge = service.isVerified
    ? `<div style="position:absolute; top:-6px; left:-6px; background:#0ea5e9; color:white; width:16px; height:16px; border-radius:50%; display:flex; align-items:center; justify-content:center; border:2px solid white; font-size:9px; font-weight:900;">V</div>`
    : '';

  return `
    <div class="custom-map-marker" style="position:relative; width:44px; height:44px;">
       <div style="background-color: ${color}; width:100%; height:100%; border-radius: 12px; border: 3px solid white; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:white; font-size:14px; font-weight:900;">
          ${code}
       </div>
       ${evBadge}
       ${verifiedBadge}
       <div style="position:absolute; bottom:-4px; left:50%; transform:translateX(-50%) rotate(45deg); width:12px; height:12px; background:white; z-index:-1;"></div>
    </div>
  `;
};

const createLeafletHazardHtml = (hazard: SafetyPoint) => {
  const color = getHazardColor(hazard.type);
  const code = getHazardCode(hazard.type);

  return `
    <div class="custom-hazard-marker" style="position:relative; width:36px; height:36px;">
       <div style="background-color: ${color}; width:100%; height:100%; border-radius: 50%; border: 3px solid white; box-shadow: 0 10px 15px -3px rgba(0,0,0,0.3); display:flex; align-items:center; justify-content:center; color:white; font-size:9px; font-weight:900;">
          ${code}
       </div>
       <div style="position:absolute; bottom:-2px; left:50%; transform:translateX(-50%) rotate(45deg); width:10px; height:10px; background:white; z-index:-1;"></div>
    </div>
  `;
};

const createOverlayFactory = (google: any) => {
  return class ReactOverlayView extends google.maps.OverlayView {
    container: HTMLDivElement;
    position: any;
    root: any;
    component: React.ReactNode;

    constructor(position: any, component: React.ReactNode) {
      super();
      this.position = position;
      this.component = component;
      this.container = document.createElement('div');
      this.container.style.position = 'absolute';
      this.container.style.cursor = 'pointer';
      ['click', 'mousedown', 'touchstart', 'pointerdown'].forEach((evt) => {
        this.container.addEventListener(evt, (e) => e.stopPropagation());
      });
      this.root = createRoot(this.container);
    }

    onAdd() {
      const panes = this.getPanes();
      if (panes && panes.overlayMouseTarget) {
        panes.overlayMouseTarget.appendChild(this.container);
        this.root.render(this.component);
      }
    }

    draw() {
      const projection = this.getProjection();
      if (!projection) return;
      const point = projection.fromLatLngToDivPixel(this.position);
      if (point) {
        this.container.style.left = point.x - 22 + 'px';
        this.container.style.top = point.y - 44 + 'px';
      }
    }

    onRemove() {
      if (this.container.parentNode) {
        this.container.parentNode.removeChild(this.container);
      }
      setTimeout(() => {
        if (this.root) this.root.unmount();
      }, 0);
    }
  };
};

interface MapComponentProps {
  center: [number, number];
  navState: NavigationState;
  activeView: AppView;
  isOffline?: boolean;
  destination?: string;
  services?: BusinessService[];
  hazards?: SafetyPoint[];
}

const MapComponent: React.FC<MapComponentProps> = ({ center, navState, activeView, isOffline, destination, services = [], hazards = [] }) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const googleOverlaysRef = useRef<any[]>([]);
  const leafletDynamicLayerRef = useRef<any>(null);
  const leafletRouteLayerRef = useRef<any>(null);

  const [provider, setProvider] = useState<'GOOGLE' | 'LEAFLET'>('GOOGLE');
  const [googleMapInstance, setGoogleMapInstance] = useState<any>(null);
  const [leafletMapInstance, setLeafletMapInstance] = useState<any>(null);
  const [googleApi, setGoogleApi] = useState<any>(null);
  const [showHeatmap, setShowHeatmap] = useState(false);

  const HEATMAP_ZONES = [
    { coords: [28.625, 77.23], radius: 800, color: '#ef4444', intensity: 0.3 },
    { coords: [28.618, 77.205], radius: 600, color: '#f59e0b', intensity: 0.3 },
    { coords: [28.61, 77.215], radius: 1000, color: '#22c55e', intensity: 0.2 }
  ];

  useEffect(() => {
    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || process.env.API_KEY;
    if (!apiKey || apiKey === 'YOUR_API_KEY' || apiKey.length < 20) {
      setProvider('LEAFLET');
    }

    window.gm_authFailure = () => {
      setProvider('LEAFLET');
    };
  }, []);

  useEffect(() => {
    if (provider !== 'GOOGLE') return;

    if (window.google && window.google.maps) {
      setGoogleApi(window.google);
      return;
    }

    const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || process.env.API_KEY;
    let script = document.querySelector('script[src^="https://maps.googleapis.com/maps/api/js"]') as HTMLScriptElement;

    if (!script) {
      script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places,geometry,routes,marker`;
      script.async = true;
      script.defer = true;
      script.onerror = () => setProvider('LEAFLET');
      document.head.appendChild(script);
    }

    const handleLoad = () => {
      if (window.google && window.google.maps) setGoogleApi(window.google);
      else setProvider('LEAFLET');
    };

    script.addEventListener('load', handleLoad);
    return () => script.removeEventListener('load', handleLoad);
  }, [provider]);

  useEffect(() => {
    if (provider !== 'GOOGLE' || !googleApi || !mapRef.current || googleMapInstance) return;

    try {
      const map = new googleApi.maps.Map(mapRef.current, {
        center: { lat: center[0], lng: center[1] },
        zoom: 15,
        disableDefaultUI: true,
        clickableIcons: false,
        backgroundColor: '#f1f5f9',
        gestureHandling: 'greedy',
        styles: [{ featureType: 'poi', elementType: 'labels', stylers: [{ visibility: 'off' }] }]
      });
      setGoogleMapInstance(map);
    } catch (e) {
      console.error('Google Map Init Error', e);
      setProvider('LEAFLET');
    }
  }, [provider, googleApi, center, googleMapInstance]);

  useEffect(() => {
    if (provider !== 'GOOGLE' || !googleMapInstance || !googleApi) return;

    googleMapInstance.setCenter({ lat: center[0], lng: center[1] });

    googleOverlaysRef.current.forEach((overlay) => overlay.setMap(null));
    googleOverlaysRef.current = [];

    const OverlayView = createOverlayFactory(googleApi);

    const userOverlay = new OverlayView(
      new googleApi.maps.LatLng(center[0], center[1]),
      <div className="relative flex items-center justify-center">
        <div className="absolute w-16 h-16 bg-indigo-600 rounded-full opacity-10 animate-[pulse-ring_3s_infinite]"></div>
        <div className="w-8 h-8 bg-indigo-600 rounded-full border-[4px] border-white shadow-xl relative z-10"></div>
      </div>
    );
    userOverlay.setMap(googleMapInstance);
    googleOverlaysRef.current.push(userOverlay);

    services.forEach((service) => {
      const overlay = new OverlayView(
        new googleApi.maps.LatLng(service.coords[0], service.coords[1]),
        <CustomMarkerContent service={service} />
      );
      overlay.setMap(googleMapInstance);
      googleOverlaysRef.current.push(overlay);
    });

    hazards.forEach((hazard) => {
      const overlay = new OverlayView(
        new googleApi.maps.LatLng(hazard.location[0], hazard.location[1]),
        <CustomHazardMarkerContent hazard={hazard} />
      );
      overlay.setMap(googleMapInstance);
      googleOverlaysRef.current.push(overlay);
    });
  }, [provider, googleMapInstance, googleApi, center, services, hazards]);

  useEffect(() => {
    if (provider !== 'LEAFLET' || leafletMapInstance || !mapRef.current) return;

    const checkLeaflet = setInterval(() => {
      if (!window.L) return;
      clearInterval(checkLeaflet);
      try {
        const L = window.L;
        const map = L.map(mapRef.current, {
          zoomControl: false,
          attributionControl: false
        }).setView(center, 15);

        L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          maxZoom: 20
        }).addTo(map);

        setLeafletMapInstance(map);
      } catch (e) {
        console.error('Leaflet Init Error', e);
      }
    }, 100);

    return () => clearInterval(checkLeaflet);
  }, [provider, center, leafletMapInstance]);

  useEffect(() => {
    if (provider !== 'LEAFLET' || !leafletMapInstance || !window.L) return;
    const L = window.L;

    if (!leafletDynamicLayerRef.current) {
      leafletDynamicLayerRef.current = L.layerGroup().addTo(leafletMapInstance);
    }
    leafletDynamicLayerRef.current.clearLayers();

    const userIcon = L.divIcon({
      className: 'custom-user-marker',
      html: `<div style="position:relative; display:flex; align-items:center; justify-content:center; width:32px; height:32px;">
               <div style="position:absolute; width:64px; height:64px; background:rgba(79, 70, 229, 0.1); border-radius:50%; animation: pulse-ring 3s infinite;"></div>
               <div style="width:24px; height:24px; background:#4f46e5; border:3px solid white; border-radius:50%; box-shadow:0 4px 10px rgba(0,0,0,0.2); position:relative; z-index:10;"></div>
             </div>`,
      iconSize: [32, 32],
      iconAnchor: [16, 16]
    });
    L.marker(center, { icon: userIcon }).addTo(leafletDynamicLayerRef.current);

    services.forEach((service: BusinessService) => {
      const icon = L.divIcon({
        className: 'custom-div-icon',
        html: createLeafletMarkerHtml(service),
        iconSize: [44, 44],
        iconAnchor: [22, 44]
      });
      L.marker(service.coords, { icon }).addTo(leafletDynamicLayerRef.current);
    });

    hazards.forEach((hazard: SafetyPoint) => {
      const icon = L.divIcon({
        className: 'custom-hazard-icon',
        html: createLeafletHazardHtml(hazard),
        iconSize: [36, 36],
        iconAnchor: [18, 18]
      });
      L.marker(hazard.location, { icon }).addTo(leafletDynamicLayerRef.current);
    });
  }, [provider, leafletMapInstance, center, services, hazards]);

  useEffect(() => {
    if (provider !== 'LEAFLET' || !leafletMapInstance) return;
    const zoom = navState === 'ACTIVE' ? 18 : 15;
    leafletMapInstance.setView(center, zoom);
  }, [provider, leafletMapInstance, center, navState]);

  useEffect(() => {
    if (provider !== 'LEAFLET' || !leafletMapInstance || !window.L) return;
    const L = window.L;

    if (leafletRouteLayerRef.current) {
      leafletRouteLayerRef.current.remove();
      leafletRouteLayerRef.current = null;
    }

    if (navState === 'PREVIEW' || navState === 'ACTIVE') {
      const destCoords = services.length > 0 ? services[0].coords : [28.618, 77.215];
      const line = L.polyline([center, [28.618, 77.215], destCoords], {
        color: '#4f46e5',
        weight: 6,
        opacity: 0.8,
        lineCap: 'round'
      }).addTo(leafletMapInstance);
      leafletRouteLayerRef.current = line;
      leafletMapInstance.fitBounds(line.getBounds(), { padding: [50, 50] });
    }
  }, [provider, leafletMapInstance, navState, center, services]);

  useEffect(() => {
    const circles: any[] = [];

    if (showHeatmap) {
      if (provider === 'GOOGLE' && googleMapInstance && googleApi) {
        HEATMAP_ZONES.forEach((zone) => {
          const circle = new googleApi.maps.Circle({
            strokeColor: zone.color,
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: zone.color,
            fillOpacity: zone.intensity,
            map: googleMapInstance,
            center: { lat: zone.coords[0], lng: zone.coords[1] },
            radius: zone.radius
          });
          circles.push(circle);
        });
      } else if (provider === 'LEAFLET' && leafletMapInstance) {
        const L = window.L;
        if (!L) return;
        HEATMAP_ZONES.forEach((zone) => {
          const circle = L.circle(zone.coords, {
            color: zone.color,
            fillColor: zone.color,
            fillOpacity: zone.intensity,
            radius: zone.radius,
            weight: 1
          }).addTo(leafletMapInstance);
          circles.push(circle);
        });
      }
    }

    return () => {
      circles.forEach((c) => {
        if (c.setMap) c.setMap(null);
        else if (c.remove) c.remove();
      });
    };
  }, [showHeatmap, provider, googleMapInstance, leafletMapInstance, googleApi]);

  const recenterMap = () => {
    if (provider === 'GOOGLE' && googleMapInstance) {
      googleMapInstance.setCenter({ lat: center[0], lng: center[1] });
      return;
    }
    if (provider === 'LEAFLET' && leafletMapInstance) {
      leafletMapInstance.setView(center, navState === 'ACTIVE' ? 18 : 15);
    }
  };

  return (
    <div className="w-full h-full relative bg-slate-100">
      <div ref={mapRef} className="w-full h-full z-0" />

      <button
        onClick={() => setShowHeatmap(!showHeatmap)}
        className="absolute top-24 right-4 z-[1000] bg-white rounded-xl shadow-xl p-3 flex flex-col items-center gap-1 active:scale-95 transition-all border border-slate-100"
      >
        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${showHeatmap ? 'bg-red-500 text-white' : 'bg-slate-100 text-slate-400'}`}>
          <Zap size={18} fill={showHeatmap ? 'currentColor' : 'none'} />
        </div>
        <span className="text-[9px] font-bold text-slate-500">Enforcement</span>
      </button>

      <button
        onClick={recenterMap}
        className="absolute top-40 right-4 z-[1000] bg-white rounded-xl shadow-xl p-3 flex items-center gap-2 active:scale-95 transition-all border border-slate-100"
      >
        <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">Center</span>
      </button>

      {provider === 'LEAFLET' && (
        <div className="absolute bottom-4 right-4 z-[1000] bg-white/80 backdrop-blur-md px-2 py-1 rounded-lg text-[10px] text-slate-500 font-bold border border-white/50">
          OpenStreetMap
        </div>
      )}
    </div>
  );
};

export default MapComponent;
