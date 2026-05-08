
// Mock Database Interface for Safety Cameras & Hazards
import { AlertType, SafetyPoint } from '../types';

// Simulated "Camera Database"
const MOCK_SAFETY_DB: SafetyPoint[] = [
  // 1. Fixed Speed Camera (High Confidence)
  { 
    id: 'cam-1', 
    type: AlertType.SPEED_CAMERA, 
    location: [28.612, 77.210], 
    description: "Fixed Speed Cam: 60km/h", 
    severity: 'HIGH',
    confidence: 95,
    lastVerified: "2024-02-05",
    activeHours: "24/7"
  },
  
  // 2. Average Speed Zone (Start)
  { 
    id: 'avg-start-1', 
    type: AlertType.AVERAGE_SPEED_CAM, 
    location: [28.630, 77.220], 
    description: "Average Speed Zone START (Limit: 80km/h)", 
    severity: 'HIGH',
    isZoneStart: true,
    zoneId: 'zone-1',
    averageSpeedLimit: 80,
    confidence: 98
  },
  
  // 3. Average Speed Zone (End) - placed slightly away
  { 
    id: 'avg-end-1', 
    type: AlertType.AVERAGE_SPEED_CAM, 
    location: [28.650, 77.240], 
    description: "Average Speed Zone END", 
    severity: 'HIGH',
    isZoneEnd: true,
    zoneId: 'zone-1',
    confidence: 98
  },
  
  // 4. Red Light Camera
  { 
    id: 'red-1', 
    type: AlertType.RED_LIGHT_CAM, 
    location: [28.615, 77.212], 
    description: "Red Light + Speed Cam", 
    severity: 'HIGH',
    confidence: 90
  },
  
  // 5. Mobile Camera (Temporary)
  { 
    id: 'mob-1', 
    type: AlertType.MOBILE_CAM, 
    location: [28.618, 77.205], 
    description: "Reported Enforcement Activity", 
    severity: 'MEDIUM',
    confidence: 65,
    lastVerified: "2h ago"
  },
  
  // 6. Dummy Camera
  { 
    id: 'dum-1', 
    type: AlertType.DUMMY_CAM, 
    location: [28.610, 77.215], 
    description: "Inactive Monitoring Box", 
    severity: 'LOW',
    confidence: 88,
    lastVerified: "2024-01-20"
  },
  
  // 7. Hidden Sensor / High Risk Zone
  { 
    id: 'hidden-1', 
    type: AlertType.HIDDEN_SENSOR, 
    location: [28.625, 77.230], 
    description: "Speed Monitoring Zone (High Compliance)", 
    severity: 'HIGH',
    confidence: 75,
    activeHours: "08:00-20:00"
  },

  { id: 'haz-1', type: AlertType.POTHOLE, location: [28.618, 77.215], description: "Deep Pothole Reported", severity: 'MEDIUM' },
  { id: 'haz-2', type: AlertType.ACCIDENT, location: [28.620, 77.220], description: "Accident: Right Lane Blocked", severity: 'HIGH' },
];

export interface RiskAnalysis {
  score: number; // 0-100 (100 is highest risk)
  factors: string[];
  recommendation?: string;
}

export const SafetyDataService = {
  // Simulate checking the database for hazards near the user's location
  checkForHazards: (userLat: number, userLng: number): SafetyPoint | null => {
    // Simple distance check (Haversine approximation or Euclidean for short distances)
    for (const point of MOCK_SAFETY_DB) {
      const dist = getDistanceFromLatLonInKm(userLat, userLng, point.location[0], point.location[1]) * 1000; // to meters
      // Default radius logic based on type
      let radius = 500;
      if (point.type === AlertType.HIGH_RISK_ZONE || point.type === AlertType.HIDDEN_SENSOR) radius = 1000;
      if (point.type === AlertType.POTHOLE) radius = 200;

      if (dist <= radius) {
        return point;
      }
    }
    return null;
  },

  getNearbyHazards: (userLat: number, userLng: number, radiusKm: number = 5): SafetyPoint[] => {
    return MOCK_SAFETY_DB.filter(point => {
        const dist = getDistanceFromLatLonInKm(userLat, userLng, point.location[0], point.location[1]);
        return dist <= radiusKm;
    });
  },

  // Method to add new reports from users
  reportHazard: (type: AlertType, lat: number, lng: number) => {
    const newReport: SafetyPoint = {
      id: `usr-${Date.now()}`,
      type,
      location: [lat, lng],
      description: `User Reported ${type.replace('_', ' ')}`,
      severity: 'MEDIUM',
      confidence: 50, // Initial confidence for new report
      lastVerified: "Just now"
    };
    MOCK_SAFETY_DB.push(newReport);
    console.log("New hazard reported to DB:", newReport);
  },

  // Predictive Risk Scoring
  calculateRouteRisk: (origin: [number, number], destination: [number, number]): RiskAnalysis => {
    const currentHour = new Date().getHours();
    let score = 10; // Base risk
    const factors: string[] = [];

    // 1. Time of Day Analysis
    if (currentHour >= 22 || currentHour <= 5) {
      score += 35;
      factors.push("High Night-time Accident Risk (+35%)");
    } else if (currentHour >= 18 && currentHour <= 21) {
      score += 15;
      factors.push("Peak Traffic Congestion (+15%)");
    }

    // 2. Mock Route Analysis (Distance-based fatigue risk)
    const distKm = getDistanceFromLatLonInKm(origin[0], origin[1], destination[0], destination[1]);
    if (distKm > 300) {
      score += 25;
      factors.push("Long Drive Fatigue Risk (+25%)");
    }

    // 3. Zone Analysis (Mock check if route passes near high risk zone)
    // In a real app, we'd check intersection with polygons. Here we just check proximity to MOCK DB risk zones.
    const riskZones = MOCK_SAFETY_DB.filter(p => p.type === AlertType.HIGH_RISK_ZONE);
    if (riskZones.length > 0) {
      score += 20;
      factors.push("Route passes through Crime-Prone Zone (+20%)");
    }

    let recommendation = "Route is safe.";
    if (score > 60) recommendation = "Consider stopping at a Safe Stop (Certified) in 40km.";
    else if (score > 30) recommendation = "Stay alert for heavy traffic and unmarked speed bumps.";

    return {
      score: Math.min(score, 100),
      factors,
      recommendation
    };
  }
};

// Helper: Haversine Formula for distance
function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c; // Distance in km
  return d;
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
