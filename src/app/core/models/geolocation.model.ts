export interface Geolocation {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  bearing: number | null;
  gpsStatus: string;
  latitude: string;
  longitude: string;
  simulated: boolean;
  speed: number | null;
  time: number | null;
}

export interface GeolocationDashboard {
  gpsStatus: string;
  latitude: string;
  longitude: string;
}
