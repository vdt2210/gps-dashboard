export interface IGeolocation {
  accuracy: number | null;
  altitude: number | null;
  altitudeAccuracy: number | null;
  bearing: number | null;
  gpsStatusColor: EGpsStatusColor;
  latitude: string;
  longitude: string;
  simulated: boolean;
  speed: number | null;
  time: number | null;
}

export type TGeolocation = Pick<
  IGeolocation,
  | 'accuracy'
  | 'altitude'
  | 'altitudeAccuracy'
  | 'bearing'
  | 'gpsStatusColor'
  | 'latitude'
  | 'longitude'
  | 'simulated'
  | 'speed'
  | 'time'
>;

export type TGeolocationDashboard = Pick<IGeolocation, 'gpsStatusColor' | 'latitude' | 'longitude'>;

export enum EGpsStatusColor {
  success = 'success',
  warning = 'warning',
  danger = 'danger',
}
