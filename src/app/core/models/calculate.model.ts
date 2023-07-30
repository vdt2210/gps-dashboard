export interface ICalculatedData {
  accuracy: number | string;
  altitude: number | string;
  avgSpeed: number | string;
  speed: number | null;
  topSpeed: number | null;
  totalDistance: number;
  tripDistance: string;
}

export type TCalculatedData = Pick<
  ICalculatedData,
  'accuracy' | 'altitude' | 'avgSpeed' | 'speed' | 'topSpeed' | 'totalDistance' | 'tripDistance'
>;
