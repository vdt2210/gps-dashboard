export interface ISyncData {
  avgSpeedTotalDistance: number;
  avgSpeedTotalTime: number;
  createdDate: string;
  deviceId: string;
  id: string;
  topSpeed: number;
  deviceName: string | null;
  totalDistance: number;
  totalTime: number;
  tripDistance: number;
  uid: string;
}

export type TSyncData = Pick<
  ISyncData,
  | 'avgSpeedTotalDistance'
  | 'avgSpeedTotalTime'
  | 'createdDate'
  | 'deviceId'
  | 'id'
  | 'topSpeed'
  | 'totalDistance'
  | 'totalTime'
  | 'tripDistance'
  | 'uid'
  | 'deviceName'
>;

export type TSyncDataDTO = Pick<ISyncData, 'deviceId' | 'id' | 'uid' | 'deviceName'> &
  Partial<
    Pick<
      ISyncData,
      | 'avgSpeedTotalDistance'
      | 'avgSpeedTotalTime'
      | 'createdDate'
      | 'topSpeed'
      | 'totalDistance'
      | 'totalTime'
      | 'tripDistance'
    >
  >;
