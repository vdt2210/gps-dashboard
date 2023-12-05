export interface ICalculatedData {
  accuracy?: number | null;
  altitude?: string | number | null;
  avgSpeed: string | number | null;
  speed?: number | null;
  topSpeed: number | null;
  totalDistance?: number | null;
  tripDistance?: number | string | null;
  avgSpeedTotalDistance: number;
  avgSpeedTotalTime: number;
}

export type TCalculatedData = Pick<
  ICalculatedData,
  'accuracy' | 'altitude' | 'avgSpeed' | 'speed' | 'topSpeed' | 'totalDistance' | 'tripDistance'
>;

export type TCalculatingData = Pick<
  ICalculatedData,
  | 'accuracy'
  | 'altitude'
  | 'speed'
  | 'topSpeed'
  | 'totalDistance'
  | 'tripDistance'
  | 'avgSpeedTotalDistance'
  | 'avgSpeedTotalTime'
>;
