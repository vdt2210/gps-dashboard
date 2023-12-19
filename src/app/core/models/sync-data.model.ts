export interface ISyncUserData {
  lastUpdated: { seconds: number; nanoseconds: number };
  createdDate: { seconds: number; nanoseconds: number };
  totalDistance: number;
  totalTime: number;
}

export interface ITrip {
  avgSpeedTotalDistance: number;
  avgSpeedTotalTime: number;
  createdDate: number;
  topSpeed: number | null;
  tripDistance: number;
  tripTime: number;
}

export type TSyncTrip = { trips: ITrip[] };

export type TSyncUserDataDTO = Partial<Pick<ISyncUserData, 'totalDistance' | 'totalTime'>>;

export type TTripDTO = Pick<
  ITrip,
  'avgSpeedTotalDistance' | 'avgSpeedTotalTime' | 'topSpeed' | 'tripDistance' | 'tripTime'
>;
