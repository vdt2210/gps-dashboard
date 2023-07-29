export interface IUnit {
  distanceUnit: string;
  lengthUnit: string;
  speedUnit: string;
  value: string;
}

export type TUnitData = Pick<IUnit, 'distanceUnit' | 'lengthUnit' | 'speedUnit' | 'value'>;
