
export enum ServiceType {
  GAS_STATION = 'GAS_STATION',
  RESTAURANT = 'RESTAURANT',
  HOTEL = 'HOTEL',
  EMERGENCY = 'EMERGENCY',
  DHABA = 'DHABA',
  MECHANIC = 'MECHANIC',
  HOSPITAL = 'HOSPITAL',
  POLICE = 'POLICE',
  ATM = 'ATM',
  PHARMACY = 'PHARMACY',
  EV_CHARGING = 'EV_CHARGING',
  TOWING = 'TOWING',
  INSURANCE = 'INSURANCE',
  RETAIL = 'RETAIL'
}

export enum FuelType {
  PETROL = 'Petrol',
  DIESEL = 'Diesel',
  CNG = 'CNG',
  EV = 'EV',
  HYDROGEN = 'Hydrogen'
}

export enum PlugType {
  CCS2 = 'CCS2',
  CHADEMO = 'CHAdeMO',
  TYPE2 = 'Type 2',
  GB_T = 'GB/T',
  TESLA = 'Tesla NACS'
}

export enum AlertType {
  SPEED_CAMERA = 'SPEED_CAMERA', // 📷 Fixed speed camera
  AVERAGE_SPEED_CAM = 'AVERAGE_SPEED_CAM', // 🎥 Average speed (section control)
  RED_LIGHT_CAM = 'RED_LIGHT_CAM', // 🚨 Red-light + speed camera
  MOBILE_CAM = 'MOBILE_CAM', // 🚔 Mobile police camera (temporary)
  DUMMY_CAM = 'DUMMY_CAM', // ⚠️ Dummy / inactive camera
  HIDDEN_SENSOR = 'HIDDEN_SENSOR',
  MONITORING = 'MONITORING', // 👁 Surveillance / monitoring camera
  CONSTRUCTION = 'CONSTRUCTION',
  ACCIDENT = 'ACCIDENT',
  WEATHER = 'WEATHER',
  POTHOLE = 'POTHOLE',
  ANIMAL = 'ANIMAL',
  HIGH_RISK_ZONE = 'HIGH_RISK_ZONE'
}

export type SortOption = 'RATING' | 'DISTANCE' | 'PRICE';
export type NavigationState = 'IDLE' | 'PREVIEW' | 'ACTIVE';

export interface BusinessService {
  id: string;
  name: string;
  type: ServiceType;
  coords: [number, number];
  description?: string;
  desc?: string;
  fuelTypes?: FuelType[];
  fuelPrices?: Record<string, string>;
  rating: number;
  reviewCount?: number;
  reviews?: number;
  image: string;
  amenities?: string[];
  cuisine?: string[];
  priceRange?: '$' | '$$' | '$$$' | '$$$$';
  price?: string;
  priceValue?: number; // 1-4 for sorting
  distMin?: number; // Minutes for sorting
  dist?: string;
  isOpen: boolean;
  inventoryStatus?: Record<string, boolean>;
  evDetails?: {
    speed: string; // e.g. "350kW"
    plugs: { type: PlugType; count: number; available: number }[];
    provider?: string;
  };
  fuel?: boolean;
  isVerified?: boolean; // Verified badge for safety/hygiene standards
  isSafeStop?: boolean; // TravelSafe Certified (Clean toilets, CCTV, etc.)
  safetyFeatures?: string[]; // e.g., 'CCTV', '24/7 Guard', 'Female Friendly'
  promotions?: {
    title: string;
    code: string;
    validity: string;
    isActive: boolean;
  }[];
}

export const INDUSTRY_SERVICES: Record<string, string[]> = {
  [ServiceType.GAS_STATION]: ['Petrol', 'Diesel', 'CNG', 'EV Charging', 'Air Pump', 'Clean Restrooms', 'Mart', 'Car Wash', 'Drinking Water'],
  [ServiceType.HOTEL]: ['Free WiFi', 'Swimming Pool', 'Gym', 'Restaurant', 'Room Service', 'Parking', 'Laundry', 'AC Rooms', 'Conference Room'],
  [ServiceType.DHABA]: ['Veg', 'Non-Veg', '24/7 Open', 'AC Seating', 'Outdoor Seating', 'Clean Restrooms', 'Parking', 'Tea/Coffee'],
  [ServiceType.RESTAURANT]: ['Veg', 'Non-Veg', 'Bar', 'Live Music', 'WiFi', 'Valet Parking', 'Kids Zone'],
  [ServiceType.HOSPITAL]: ['24/7 Emergency', 'Pharmacy', 'Ambulance', 'Trauma Center', 'ICU', 'General Ward', 'Cafeteria'],
  [ServiceType.EV_CHARGING]: ['Fast Charging', 'Lounge', 'WiFi', 'Restrooms', 'Food Court'],
  [ServiceType.MECHANIC]: ['Towing', 'Tyre Shop', 'Engine Repair', 'Battery Service', 'Spare Parts'],
  [ServiceType.RETAIL]: ['Restrooms', 'Parking', 'WiFi', 'Wheelchair Access', 'ATM', 'Food Court'],
  [ServiceType.PHARMACY]: ['24/7', 'Home Delivery', 'Vaccination', 'Health Checkup', 'Baby Care'],
  [ServiceType.TOWING]: ['24/7 Service', 'Flatbed', 'Jump Start', 'Fuel Delivery', 'Lockout Service'],
  [ServiceType.ATM]: ['24/7', 'Cash Deposit', 'Cardless Withdrawal', 'Passbook Printer', 'Wheelchair Access'],
};

export interface TripPlan {
  origin: string;
  destination: string;
  vehicleType: 'EV' | 'ICE';
  preferences: string[];
}

export type UserType = 'TRAVELER' | 'BUSINESS';

export type AppView = 
  | 'SPLASH' 
  | 'ONBOARDING' 
  | 'AUTH' 
  | 'NAVIGATION' 
  | 'EXPLORE' 
  | 'SAFETY' 
  | 'SOS' 
  | 'ROADSIDE' 
  | 'BUSINESS' 
  | 'ACCOUNT' 
  | 'REWARDS' 
  | 'SERVICE_DETAILS' 
  | 'SETTINGS'
  | 'OFFLINE_MAPS'
  | 'VEHICLE_PROFILE'
  | 'REPORT_HAZARD'
  | 'BUSINESS_REGISTRATION'
  | 'TRIP_HISTORY'
  | 'SAVED_PLACES'
  | 'INSURANCE'
  | 'WEATHER'
  | 'TRAFFIC_CENTER'
  | 'SAFETY_INSIGHTS'
  | 'CONTACTS'
  | 'SUBSCRIPTION'
  | 'CONVOY'
  | 'TRIP_PLANNER';

export type SubscriptionTier = 'FREE' | 'PLUS' | 'GOLD';

export interface Contact {
  id: string;
  name: string;
  phone: string;
  relation: string;
  isEmergency: boolean;
}

export interface SafetyPoint {
  id: string;
  type: AlertType;
  location: [number, number]; // [lat, lng]
  description?: string;
  severity: 'LOW' | 'MEDIUM' | 'HIGH';
  
  // Intelligence Fields
  confidence?: number; // 0-100%
  lastVerified?: string; // e.g. "2023-10-27"
  activeHours?: string; // e.g. "22:00-06:00"
  
  // Average Speed Zone Fields
  isZoneStart?: boolean;
  isZoneEnd?: boolean;
  zoneId?: string;
  averageSpeedLimit?: number;
}

export interface HazardReport {
  type: AlertType;
  coords: [number, number];
  timestamp: number;
  image?: string;
}
