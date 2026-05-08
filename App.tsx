import React, { useState, useEffect, useMemo, Suspense, lazy } from 'react';
import { 
  Navigation, Search, ShieldAlert, Store, User, Map as MapIcon, 
  Settings, Bell, Heart, ChevronRight, PhoneCall, Activity, 
  Award, Share2, LifeBuoy, CloudRain, Star, Compass, Filter,
  Fuel, Utensils, Bed, HeartPulse, ShieldCheck, CreditCard, Wrench,
  Trees, Coffee, Camera, Clock, Zap, ArrowDownWideNarrow, Download, CloudOff, Check, Trophy, Crown, Plus, Users
} from 'lucide-react';

import MapComponent from './components/MapComponent';
import NavigationOverlay from './components/NavigationOverlay';
import SafetyAlertsOverlay, { ActiveAlert } from './components/SafetyAlertsOverlay';
import ExploreFeed from './components/ExploreFeed';
import SplashScreen from './components/SplashScreen';
import Onboarding from './components/Onboarding';
import Auth from './components/Auth';
import DriverWellnessMonitor from './components/DriverWellnessMonitor';
import { AppView, ServiceType, PlugType, FuelType, SortOption, BusinessService, NavigationState, UserType, AlertType, SafetyPoint, SubscriptionTier } from './types';
import { SafetyDataService } from './services/SafetyDataService';

const BusinessDashboard = lazy(() => import('./components/BusinessDashboard'));
const GeminiAssistant = lazy(() => import('./components/GeminiAssistant'));
const TripPlannerModal = lazy(() => import('./components/TripPlannerModal'));
const RewardsView = lazy(() => import('./components/RewardsView'));
const ServiceDetails = lazy(() => import('./components/ServiceDetails'));
const SettingsView = lazy(() => import('./components/SettingsView'));
const RoutePreview = lazy(() => import('./components/RoutePreview'));
const SOSView = lazy(() => import('./components/SOSView'));
const RoadsideAssistance = lazy(() => import('./components/RoadsideAssistance'));
const ReportHazard = lazy(() => import('./components/ReportHazard'));
const OfflineMaps = lazy(() => import('./components/OfflineMaps'));
const VehicleProfile = lazy(() => import('./components/VehicleProfile'));
const WeatherDashboard = lazy(() => import('./components/WeatherDashboard'));
const EmergencyContacts = lazy(() => import('./components/EmergencyContacts'));
const SubscriptionView = lazy(() => import('./components/SubscriptionView'));
const InsuranceView = lazy(() => import('./components/InsuranceView'));
const SavedPlaces = lazy(() => import('./components/SavedPlaces'));
const BusinessRegistration = lazy(() => import('./components/BusinessRegistration'));
const ConvoyView = lazy(() => import('./components/ConvoyView'));
const TrafficCenter = lazy(() => import('./components/TrafficCenter'));
const SafetyInsights = lazy(() => import('./components/SafetyInsights'));
const TripHistory = lazy(() => import('./components/TripHistory'));

const INITIAL_SERVICES: BusinessService[] = [
  {
    id: 'biz-1', type: ServiceType.GAS_STATION, name: "Grand Highway Plaza",
    image: "https://images.unsplash.com/photo-1519817914152-22d216bb9170?auto=format&fit=crop&q=80&w=800",
    desc: "Premium stopover with 24/7 services.", rating: 5.0, reviews: 42, dist: "1 min", distMin: 1, price: "$$", priceValue: 2, coords: [28.610, 77.215], isOpen: true, amenities: ['Fuel', 'Food', 'Restrooms', 'Parking'],
    isVerified: true, fuel: true
  },
  {
    id: 'hosp-1', type: ServiceType.HOSPITAL, name: "City General Trauma Center",
    image: "https://images.unsplash.com/photo-1587351021759-3e566b9af923?auto=format&fit=crop&q=80&w=800",
    desc: "24/7 Emergency • Level 1 Trauma • Helipad Access", rating: 4.8, reviews: 120, dist: "2 min", distMin: 2, price: "$$$$", priceValue: 4, coords: [28.62, 77.21], isOpen: true, amenities: ['Trauma Center', '24/7 Pharmacy', 'Ambulance', 'Cafeteria'],
    isVerified: true
  },
  {
    id: 'motel-1', type: ServiceType.HOTEL, name: "Route 66 Motel",
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    desc: "Budget Stay • Safe Parking • Free Breakfast", rating: 4.1, reviews: 85, dist: "15 min", distMin: 15, price: "$", priceValue: 1, coords: [28.63, 77.22], isOpen: true, amenities: ['Free Parking', 'WiFi', 'Breakfast', 'Pet Friendly']
  },
  {
    id: 'ev-1', type: ServiceType.EV_CHARGING, name: "ChargePoint HyperHub",
    image: "https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&q=80&w=800",
    desc: "Ultra-fast 350kW charging • Premium Lounge • High Security", rating: 4.9, reviews: 520, dist: "8 min", distMin: 8, price: "$$", priceValue: 2, coords: [28.6139, 77.2090], isOpen: true, amenities: ['Lounge', 'WiFi', 'Coffee', 'Restrooms'],
    evDetails: { speed: "350kW", plugs: [{ type: PlugType.CCS2, count: 8, available: 3 }, { type: PlugType.CHADEMO, count: 2, available: 1 }] },
    isVerified: true,
    isSafeStop: true,
    safetyFeatures: ['24/7 CCTV', 'Well Lit', 'SOS Point']
  },
  {
    id: 'food-1', type: ServiceType.DHABA, name: "The Mustang Dhaba",
    image: "https://images.unsplash.com/photo-1493238792000-8113da705763?auto=format&fit=crop&q=80&w=800",
    desc: "Signature Butter Chicken • 24/7 Security • Driver Lounge", rating: 4.9, reviews: 3240, dist: "12 min", distMin: 12, price: "$$", priceValue: 2, coords: [28.6139, 77.2090], isOpen: true, amenities: ['Food', 'Restrooms', 'Parking', '24/7 Open'],
    isSafeStop: true,
    safetyFeatures: ['Female Friendly', 'Clean Restrooms', 'Security Guard']
  },
  {
    id: 'fuel-1', type: ServiceType.GAS_STATION, name: "Skyview Plaza Station",
    image: "https://images.unsplash.com/photo-1621905252507-b354bcadccea?auto=format&fit=crop&q=80&w=800",
    desc: "High-Speed EV (150kW) • Clean Washrooms • Subway", rating: 4.7, reviews: 842, dist: "5 min", distMin: 5, price: "$", priceValue: 1, fuel: true, coords: [28.6139, 77.2090], isOpen: true, amenities: ['Fuel', 'EV Charging', 'Restrooms', 'Mart'],
    evDetails: { speed: "150kW", plugs: [{ type: PlugType.TYPE2, count: 4, available: 4 }] }
  }
];

const ScreenFallback: React.FC = () => (
  <div className="fixed inset-0 z-[1500] bg-slate-50 flex items-center justify-center">
    <div className="text-center">
      <div className="w-10 h-10 mx-auto rounded-full border-4 border-slate-200 border-t-indigo-600 animate-spin"></div>
      <p className="mt-3 text-xs font-black uppercase tracking-widest text-slate-400">Loading</p>
    </div>
  </div>
);

const renderLazy = (node: React.ReactNode) => (
  <Suspense fallback={<ScreenFallback />}>{node}</Suspense>
);

const App: React.FC = () => {
  // --- Global State ---
  const [rootView, setRootView] = useState<AppView>('SPLASH'); // Master view controller
  const [userType, setUserType] = useState<UserType>('TRAVELER');
  const [subscriptionTier, setSubscriptionTier] = useState<SubscriptionTier>('FREE');
  
  // Service Data State
  const [services, setServices] = useState<BusinessService[]>(INITIAL_SERVICES);
  const [myBusinessId, setMyBusinessId] = useState<string>('biz-1'); // Default to our new business

  // --- Traveler Module State ---
  const [activeView, setActiveView] = useState<AppView>('NAVIGATION'); // Sub-views for traveler
  const [navState, setNavState] = useState<NavigationState>('IDLE');
  const [destination, setDestination] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<string>('ALL');
  const [sortBy, setSortBy] = useState<SortOption>('RATING');
  const [userLocation, setUserLocation] = useState<[number, number]>([28.6139, 77.2090]);
  const [selectedService, setSelectedService] = useState<BusinessService | null>(null);
  
  // Modals
  const [showTripPlanner, setShowTripPlanner] = useState(false);
  const [showHazardReport, setShowHazardReport] = useState(false);
  
  // Offline Maps State
  const [isOfflineMode, setIsOfflineMode] = useState(false);
  const [isMapDownloaded, setIsMapDownloaded] = useState(false);

  // Safety & Hazards State
  const [hazards, setHazards] = useState<SafetyPoint[]>([]);
  const [currentAlert, setCurrentAlert] = useState<ActiveAlert | null>(null);

  // --- Initialization ---
  useEffect(() => {
    // 1. Persisted State Check
    const hasSeenOnboarding = localStorage.getItem('ts_onboarding');
    const authUser = localStorage.getItem('ts_user_type');
    const savedTier = localStorage.getItem('ts_subscription_tier');
    if (savedTier) setSubscriptionTier(savedTier as SubscriptionTier);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation([pos.coords.latitude, pos.coords.longitude]),
        (err) => console.error("Location error:", err)
      );
    }
    
    // Auto-redirect logic to skip Splash/Onboarding if possible
    if (hasSeenOnboarding && authUser) {
        setUserType(authUser as UserType);
        setRootView(authUser === 'BUSINESS' ? 'BUSINESS' : 'NAVIGATION');
        if (authUser === 'TRAVELER') setActiveView('NAVIGATION');
    } else {
        setRootView('SPLASH');
    }
  }, []);

  const handleSplashComplete = () => {
    // Redundant check handled by useEffect for fast boot, but kept for fallback flow
    const hasSeenOnboarding = localStorage.getItem('ts_onboarding');
    if (!hasSeenOnboarding) {
      setRootView('ONBOARDING');
    } else {
      setRootView('AUTH'); 
    }
  };

  const handleOnboardingComplete = () => {
    localStorage.setItem('ts_onboarding', 'true');
    setRootView('AUTH');
  };

  const handleAuthComplete = (type: UserType) => {
    localStorage.setItem('ts_user_type', type);
    setUserType(type);
    if (type === 'BUSINESS') {
      setRootView('BUSINESS');
    } else {
      setRootView('NAVIGATION');
      setActiveView('NAVIGATION');
    }
  };

  // --- Hazard Detection Logic ---
  useEffect(() => {
    if (userLocation) {
       // 1. Get all nearby hazards for rendering on map
       const nearby = SafetyDataService.getNearbyHazards(userLocation[0], userLocation[1], 10); // 10km radius
       setHazards(nearby);

       // 2. Check for immediate threats for overlay
       const immediateThreat = SafetyDataService.checkForHazards(userLocation[0], userLocation[1]);
       if (immediateThreat) {
          setCurrentAlert({
            type: immediateThreat.type,
            distance: Math.round(immediateThreat.radius), // Using radius as proxy for distance in this mock
            message: immediateThreat.message
          });
       } else {
          setCurrentAlert(null);
       }
    }
  }, [userLocation]);

  // --- Handlers ---
  const handlePreviewNavigation = (dest: string) => {
    if (!dest.trim()) return;
    setDestination(dest);
    setNavState('PREVIEW');
    setActiveView('NAVIGATION');
  };

  const filteredServices = useMemo(() => {
    let list = [...services];
    if (activeFilter === 'EV') list = list.filter(s => s.type === ServiceType.EV_CHARGING || (s as any).evDetails);
    else if (activeFilter === 'FUEL') list = list.filter(s => s.type === ServiceType.GAS_STATION || (s as any).fuel);
    else if (activeFilter === 'FOOD') list = list.filter(s => s.type === ServiceType.DHABA || s.type === ServiceType.RESTAURANT);
    else if (activeFilter === 'STAY') list = list.filter(s => s.type === ServiceType.HOTEL);
    list.sort((a, b) => {
      if (sortBy === 'RATING') return b.rating - a.rating;
      if (sortBy === 'DISTANCE') return (a.distMin ?? Number.MAX_SAFE_INTEGER) - (b.distMin ?? Number.MAX_SAFE_INTEGER);
      if (sortBy === 'PRICE') return (a.priceValue ?? Number.MAX_SAFE_INTEGER) - (b.priceValue ?? Number.MAX_SAFE_INTEGER);
      return 0;
    });
    return list;
  }, [activeFilter, sortBy, services]);

  const handleUpdateBusiness = (updatedData: Partial<BusinessService>) => {
    setServices(prev => prev.map(s => s.id === myBusinessId ? { ...s, ...updatedData } : s));
  };

  const handleUpgrade = (tier: SubscriptionTier) => {
    setSubscriptionTier(tier);
    localStorage.setItem('ts_subscription_tier', tier);
    setActiveView('ACCOUNT');
  };

  const handleHazardSubmit = (type: AlertType) => {
    SafetyDataService.reportHazard(type, userLocation[0], userLocation[1]);
    const nearby = SafetyDataService.getNearbyHazards(userLocation[0], userLocation[1], 10);
    setHazards(nearby);
    const immediateThreat = SafetyDataService.checkForHazards(userLocation[0], userLocation[1]);
    if (immediateThreat) {
      setCurrentAlert({
        type: immediateThreat.type,
        distance: Math.round(immediateThreat.radius),
        message: immediateThreat.message
      });
    }
    setShowHazardReport(false);
  };

  // --- Root View Rendering ---
  if (rootView === 'SPLASH') return <SplashScreen onComplete={handleSplashComplete} />;
  if (rootView === 'ONBOARDING') return <Onboarding onComplete={handleOnboardingComplete} />;
  if (rootView === 'AUTH') return <Auth onAuthenticated={handleAuthComplete} onRegisterPartner={() => setRootView('BUSINESS_REGISTRATION')} />;
  if (rootView === 'BUSINESS_REGISTRATION') return renderLazy(<BusinessRegistration onBack={() => setRootView('AUTH')} onComplete={() => handleAuthComplete('BUSINESS')} />);
  if (rootView === 'BUSINESS') return renderLazy(<BusinessDashboard onBack={() => setRootView('NAVIGATION')} businessData={services.find(s => s.id === myBusinessId)} onUpdateBusiness={handleUpdateBusiness} />);

  // --- Traveler View Rendering (rootView === 'NAVIGATION' is the container for Traveler) ---
  const renderTravelerContent = () => {
    // Overlays that take full screen
    if (activeView === 'SOS') return renderLazy(<SOSView onBack={() => setActiveView('SAFETY')} onManageContacts={() => setActiveView('CONTACTS')} userLocation={userLocation} />);
    if (activeView === 'ROADSIDE') return renderLazy(<RoadsideAssistance onBack={() => setActiveView('SAFETY')} onOpenInsurance={() => setActiveView('INSURANCE')} />);
    if (activeView === 'OFFLINE_MAPS') return renderLazy(<OfflineMaps onBack={() => setActiveView('ACCOUNT')} />);
    if (activeView === 'WEATHER') return renderLazy(<WeatherDashboard onBack={() => setActiveView('SAFETY')} />);
    if (activeView === 'CONTACTS') return renderLazy(<EmergencyContacts onBack={() => setActiveView('SAFETY')} />);
    if (activeView === 'TRAFFIC_CENTER') return renderLazy(<TrafficCenter onBack={() => setActiveView('SAFETY')} hazards={hazards} />);
    if (activeView === 'SAFETY_INSIGHTS') return renderLazy(<SafetyInsights onBack={() => setActiveView('SAFETY')} userLocation={userLocation} hazards={hazards} />);
    if (activeView === 'TRIP_HISTORY') return renderLazy(<TripHistory onBack={() => setActiveView('ACCOUNT')} />);
    if (activeView === 'SERVICE_DETAILS' && selectedService) return renderLazy(<ServiceDetails service={selectedService} onBack={() => setActiveView('EXPLORE')} onNavigate={() => handlePreviewNavigation(selectedService.name)} />);
          if (activeView === 'SETTINGS') return renderLazy(<SettingsView onBack={() => setActiveView('ACCOUNT')} onOpenVehicle={() => setActiveView('VEHICLE_PROFILE')} />);
          if (activeView === 'VEHICLE_PROFILE') return renderLazy(<VehicleProfile onBack={() => setActiveView('SETTINGS')} />);
          if (activeView === 'CONVOY') return renderLazy(<ConvoyView onBack={() => setActiveView('ACCOUNT')} />);
          if (activeView === 'REWARDS') return renderLazy(<RewardsView />);
          if (activeView === 'SUBSCRIPTION') return renderLazy(<SubscriptionView onBack={() => setActiveView('ACCOUNT')} currentTier={subscriptionTier} onUpgrade={handleUpgrade} />);
          if (activeView === 'INSURANCE') return renderLazy(<InsuranceView onBack={() => setActiveView('ACCOUNT')} />);
          if (activeView === 'SAVED_PLACES') return renderLazy(<SavedPlaces onBack={() => setActiveView('ACCOUNT')} onNavigate={handlePreviewNavigation} />);

          // Main Tab Views
    switch (activeView) {
      case 'NAVIGATION':
        return (
          <div className="absolute inset-0 w-full h-full bg-slate-100">
            <MapComponent 
              center={userLocation} 
              navState={navState}
              activeView={activeView}
              isOffline={isOfflineMode}
              destination={destination}
              services={filteredServices}
              hazards={hazards}
            />
            {navState === 'ACTIVE' && <NavigationOverlay destination={destination} onStop={() => { setNavState('IDLE'); setDestination(''); }} />}
            {navState === 'PREVIEW' && renderLazy(<RoutePreview destination={destination} duration="26 min" distance="14.2 km" onStart={() => setNavState('ACTIVE')} onCancel={() => { setNavState('IDLE'); setDestination(''); }} />)}
            <SafetyAlertsOverlay forcedAlert={currentAlert} />
            
            {/* Quick Actions (Only visible in IDLE) */}
            {navState === 'IDLE' && (
              <div className="absolute top-32 right-4 flex flex-col gap-3">
                 <button onClick={() => setShowHazardReport(true)} className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-lg text-slate-900 border border-slate-100 active:scale-95"><Plus size={24} /></button>
                 <button onClick={() => setActiveView('SOS')} className="w-12 h-12 bg-red-600 rounded-2xl flex items-center justify-center shadow-lg text-white animate-pulse active:scale-95"><ShieldAlert size={24} /></button>
              </div>
            )}
            
            {navState !== 'ACTIVE' && renderLazy(<GeminiAssistant onSetDestination={handlePreviewNavigation} onSetFilter={(f) => { setActiveFilter(f); setActiveView('EXPLORE'); }} currentDestination={destination} />)}
          </div>
        );
      case 'EXPLORE':
        return (
          <ExploreFeed 
            services={filteredServices} activeFilter={activeFilter} sortBy={sortBy}
            isPremium={subscriptionTier !== 'FREE'}
            onSetFilter={setActiveFilter} onSetSort={setSortBy}
            onOpenPlanner={() => setShowTripPlanner(true)} onOpenPremium={() => setActiveView('SUBSCRIPTION')}
            onSelectService={(s) => { setSelectedService(s); setActiveView('SERVICE_DETAILS'); }}
          />
        );
      case 'SAFETY':
        return (
          <div className="p-6 pt-20 bg-slate-50 h-full overflow-y-auto pb-40">
            <div className="flex items-center justify-between mb-10">
               <div><h1 className="text-3xl font-black text-slate-900">Safety Center</h1><p className="text-slate-400 text-sm font-medium mt-2">Active protection enabled</p></div>
               <div className="w-16 h-16 bg-red-100 rounded-3xl flex items-center justify-center text-red-600 shadow-lg"><ShieldAlert size={32} /></div>
            </div>
            <div className="space-y-6">
              <div className="bg-red-600 p-10 rounded-[3rem] text-white shadow-3xl shadow-red-200 relative overflow-hidden">
                <div className="absolute -right-8 -top-8 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
                <h3 className="text-3xl font-black mb-3">Panic SOS</h3>
                <p className="text-red-100 text-sm font-medium mb-10 opacity-80">One tap to alert police & contacts.</p>
                <button onClick={() => setActiveView('SOS')} className="w-full bg-white text-red-600 py-6 rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl active:scale-95 transition-all">ACTIVATE NOW</button>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <QuickSafeCard onClick={() => setActiveView('SOS')} icon={<Share2 size={24}/>} label="Live Sharing" color="bg-blue-500" />
                <QuickSafeCard onClick={() => setActiveView('ROADSIDE')} icon={<LifeBuoy size={24}/>} label="Roadside Help" color="bg-orange-500" />
                <QuickSafeCard onClick={() => setActiveView('WEATHER')} icon={<CloudRain size={24}/>} label="Weather Alerts" color="bg-slate-500" />
                <QuickSafeCard onClick={() => setActiveView('CONTACTS')} icon={<PhoneCall size={24}/>} label="Trusted Contacts" color="bg-emerald-500" />
                <QuickSafeCard onClick={() => setActiveView('TRAFFIC_CENTER')} icon={<Activity size={24}/>} label="Traffic Center" color="bg-indigo-500" />
                <QuickSafeCard onClick={() => setActiveView('SAFETY_INSIGHTS')} icon={<ShieldCheck size={24}/>} label="Risk Insights" color="bg-amber-500" />
              </div>
            </div>
          </div>
        );
      case 'ACCOUNT':
        return (
          <div className="relative h-full w-full bg-slate-50 pb-40 overflow-y-auto custom-scrollbar">
             <div className="absolute top-0 left-0 right-0 h-[400px] z-0"><img src="https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&q=80&w=2000" className="w-full h-full object-cover"/><div className="absolute inset-0 bg-gradient-to-b from-indigo-900/40 via-slate-900/60 to-slate-50"></div></div>
             <div className="relative z-10 p-6 pt-28">
                 <div className="flex flex-col items-center mb-10">
                    <div className="relative p-2.5 bg-white/10 backdrop-blur-xl rounded-[2.8rem] border border-white/40 shadow-2xl">
                      <div className="w-32 h-32 bg-white rounded-[2.2rem] flex items-center justify-center shadow-inner overflow-hidden border-4 border-white"><img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=256&h=256" className="w-full h-full object-cover" /></div>
                    </div>
                    <div className="mt-6 text-center"><h2 className="text-3xl font-black text-white">Johnathan Road</h2></div>
                 </div>
                 <div className="space-y-4">
                    <button onClick={() => setActiveView('SUBSCRIPTION')} className="w-full">
                       <AccountItem 
                          icon={<Crown className={subscriptionTier !== 'FREE' ? "text-amber-500" : "text-slate-500"} />} 
                          label={subscriptionTier === 'FREE' ? "Upgrade to Premium" : "Manage Subscription"} 
                          count={subscriptionTier !== 'FREE' ? (subscriptionTier === 'PLUS' ? 'Plus' : 'Gold') : undefined} 
                       />
                    </button>
                    <button onClick={() => setActiveView('CONVOY')} className="w-full"><AccountItem icon={<Users className="text-slate-500" />} label="Family Convoy" count="Active" /></button>
                    <button onClick={() => setActiveView('SAVED_PLACES')} className="w-full"><AccountItem icon={<MapIcon className="text-slate-500" />} label="Saved Places" /></button>
                    <button onClick={() => setActiveView('TRIP_HISTORY')} className="w-full"><AccountItem icon={<Navigation className="text-slate-500" />} label="Your Journeys" count="1.2k km" /></button>
                    <button onClick={() => setActiveView('INSURANCE')} className="w-full"><AccountItem icon={<ShieldCheck className="text-slate-500" />} label="Insurance Vault" /></button>
                    <button onClick={() => setActiveView('OFFLINE_MAPS')} className="w-full"><AccountItem icon={<Download className="text-slate-500" />} label="Offline Maps" /></button>
                    <button onClick={() => setActiveView('REWARDS')} className="w-full"><AccountItem icon={<Award className="text-slate-500" />} label="My Rewards" count="18k Pts" /></button>
                    <button onClick={() => setActiveView('SETTINGS')} className="w-full"><AccountItem icon={<Settings className="text-slate-500" />} label="Settings" /></button>
                 </div>
             </div>
          </div>
        );
      default: return null;
    }
  };

  return (
    <div className="flex flex-col h-screen w-full bg-slate-50 select-none overflow-hidden">
      {/* Search Bar for Navigation View */}
      {activeView === 'NAVIGATION' && navState !== 'ACTIVE' && (
        <div className="absolute top-0 left-0 right-0 z-[1000] p-6 pt-16 pointer-events-none">
          <div className="bg-white/90 backdrop-blur-3xl rounded-[2.5rem] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.25)] p-2.5 flex items-center gap-3 pointer-events-auto border border-white/50">
            <div className="w-14 h-14 bg-indigo-600 rounded-[1.75rem] flex items-center justify-center text-white shadow-2xl shadow-indigo-500/30"><Search size={26} /></div>
            <input type="text" placeholder="Where to, explorer?" value={destination} onChange={(e) => setDestination(e.target.value)} className="flex-1 bg-transparent outline-none text-slate-800 font-bold placeholder:text-slate-300 py-2 text-lg" onKeyDown={(e) => e.key === 'Enter' && handlePreviewNavigation((e.target as HTMLInputElement).value)}/>
            {destination && <button onClick={() => { setDestination(''); setNavState('IDLE'); }} className="w-10 h-10 flex items-center justify-center text-slate-400"><ArrowDownWideNarrow size={20} className="rotate-180" /></button>}
          </div>
        </div>
      )}

      <main className="flex-1 relative overflow-hidden">
        <DriverWellnessMonitor isNavigating={navState === 'ACTIVE'} />
        {renderTravelerContent()}
      </main>

      {/* Navigation Dock */}
      {activeView !== 'SERVICE_DETAILS' && activeView !== 'SETTINGS' && activeView !== 'SOS' && activeView !== 'ROADSIDE' && activeView !== 'OFFLINE_MAPS' && activeView !== 'TRAFFIC_CENTER' && activeView !== 'SAFETY_INSIGHTS' && navState === 'IDLE' && (
        <div className="fixed bottom-0 left-0 right-0 p-8 pb-10 z-[1001] pointer-events-none">
          <nav className="bg-slate-900/95 backdrop-blur-2xl rounded-[3rem] p-3 flex items-center justify-between shadow-[0_40px_100px_rgba(0,0,0,0.4)] border border-white/10 pointer-events-auto">
            <NavButton active={activeView === 'NAVIGATION'} icon={<Navigation size={22} />} label="Nav" onClick={() => setActiveView('NAVIGATION')} />
            <NavButton active={activeView === 'EXPLORE'} icon={<Compass size={22} />} label="Feed" onClick={() => setActiveView('EXPLORE')} />
            <div className="relative -top-10 px-2">
              <button onClick={() => setActiveView('SAFETY')} className={`w-20 h-20 rounded-[2rem] flex items-center justify-center shadow-3xl transition-all duration-500 border-[8px] border-slate-50 ${activeView === 'SAFETY' ? 'bg-red-600 text-white scale-110 shadow-red-500/40' : 'bg-white text-slate-900'}`}><ShieldAlert size={36} /></button>
            </div>
            <NavButton active={activeView === 'BUSINESS'} icon={<Store size={22} />} label="Partner" onClick={() => setRootView('BUSINESS')} />
            <NavButton active={activeView === 'ACCOUNT'} icon={<User size={22} />} label="You" onClick={() => setActiveView('ACCOUNT')} />
          </nav>
        </div>
      )}

      {showTripPlanner && renderLazy(<TripPlannerModal onClose={() => setShowTripPlanner(false)} onPlanTrip={() => setShowTripPlanner(false)} />)}
      {showHazardReport && renderLazy(<ReportHazard onClose={() => setShowHazardReport(false)} onSubmit={handleHazardSubmit} />)}
    </div>
  );
};

// UI Components
const NavButton: React.FC<{ active: boolean; icon: React.ReactNode; label: string; onClick: () => void }> = ({ active, icon, label, onClick }) => (
  <button onClick={onClick} className={`flex-1 flex flex-col items-center justify-center gap-1.5 p-3 transition-all duration-300 rounded-[2rem] ${active ? 'text-indigo-400 bg-white/10' : 'text-slate-500'}`}>
    <div className={`transition-transform duration-300 ${active ? 'scale-110' : 'scale-100 opacity-60'}`}>{icon}</div>
    <span className={`text-[8px] font-black uppercase tracking-[0.2em] transition-opacity duration-300 ${active ? 'opacity-100' : 'opacity-0 h-0 overflow-hidden'}`}>{label}</span>
  </button>
);
const AccountItem: React.FC<{ icon: React.ReactNode; label: string; count?: string }> = ({ icon, label, count }) => (
  <div className="bg-white p-6 rounded-[2.5rem] flex items-center justify-between border border-slate-100 active:bg-slate-50 transition-all shadow-sm">
    <div className="flex items-center gap-5"><div className="w-14 h-14 bg-slate-50 rounded-[1.5rem] flex items-center justify-center">{icon}</div><span className="font-black text-slate-900 text-md tracking-tight">{label}</span></div>
    <div className="flex items-center gap-4">{count && <span className="text-sm font-black text-slate-300">{count}</span>}<ChevronRight size={22} className="text-slate-200" /></div>
  </div>
);
const QuickSafeCard: React.FC<{ icon: React.ReactNode; label: string; color: string; onClick?: () => void }> = ({ icon, label, color, onClick }) => (
  <button onClick={onClick} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex flex-col items-center gap-4 shadow-sm active:scale-95 transition-all w-full">
    <div className={`w-16 h-16 ${color} rounded-[1.75rem] flex items-center justify-center text-white shadow-xl`}>{icon}</div>
    <span className="text-[10px] font-black uppercase text-slate-600 tracking-widest">{label}</span>
  </button>
);

export default App;
