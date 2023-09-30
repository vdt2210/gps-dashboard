export interface ISyncData {
  deviceId: string;
  createdDate: { seconds: number; nanoseconds: number };
  id: string;
  // topSpeed: number;
  deviceName: string | null;
  totalDistance: number;
  totalTime: number;
  uid: string;
  trips: ITrip[];
}

export type TSyncData = Pick<
  ISyncData,
  | 'createdDate'
  | 'deviceId'
  | 'id'
  // | 'topSpeed'
  | 'totalDistance'
  | 'totalTime'
  | 'uid'
  | 'deviceName'
  | 'trips'
>;

export type TSyncDataDTO = Pick<
  ISyncData,
  | 'deviceId'
  | 'id'
  // | 'uid'
  | 'deviceName'
> &
  Partial<
    Pick<
      ISyncData,
      | 'createdDate'
      // | 'topSpeed'
      | 'totalDistance'
      | 'totalTime'
      // | 'trips'
    >
  >;

export interface ITrip {
  id: string;
  avgSpeedTotalDistance: number;
  avgSpeedTotalTime: number;
  createdDate: number;
  topSpeed: number;
  tripDistance: number;
}

export type TTripDTO = Pick<
  ITrip,
  'id' | 'avgSpeedTotalDistance' | 'avgSpeedTotalTime' | 'topSpeed' | 'tripDistance' | 'createdDate'
>;
