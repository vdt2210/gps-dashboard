import { Component, Input, OnChanges } from '@angular/core';

import { AppConstant } from '@utilities/index';

import { ICalculatedData, IGeolocation, IUnit } from '@models/index';

type TDataList = {
  label: string;
  unit?: string;
  value: number | string | null;
};

type TInformationCardCalculatedData = Pick<
  ICalculatedData,
  'accuracy' | 'altitude' | 'avgSpeed' | 'topSpeed'
>;

type TInformationCardGeolocationData = Pick<IGeolocation, 'latitude' | 'longitude'>;

type TInformationCardUnit = Pick<IUnit, 'lengthUnit' | 'speedUnit'>;

@Component({
  selector: 'app-portrait-information',
  styleUrls: ['./portrait-information.component.scss'],
  templateUrl: './portrait-information.component.html',
})
export class PortraitInformationComponent implements OnChanges {
  @Input() calculatedData: TInformationCardCalculatedData = {
    accuracy: '-',
    altitude: '-.-',
    avgSpeed: '-.-',
    topSpeed: null,
  };

  @Input() geolocationData: TInformationCardGeolocationData = {
    latitude: '-.-',
    longitude: '-.-',
  };

  @Input() unitData: TInformationCardUnit = {
    lengthUnit: AppConstant.unit.metric.lengthUnit,
    speedUnit: AppConstant.unit.metric.speedUnit,
  };

  public dataList: TDataList[] = [];

  ngOnChanges(): void {
    this.dataList = [
      {
        label: 'topSpeed',
        unit: this.unitData.speedUnit,
        value: this.calculatedData.topSpeed,
      },
      {
        label: 'averageSpeed',
        unit: this.unitData.speedUnit,
        value: this.calculatedData.avgSpeed,
      },
      {
        label: 'accuracy',
        unit: this.unitData.lengthUnit,
        value: this.calculatedData.accuracy,
      },
      {
        label: 'altitude',
        unit: this.unitData.lengthUnit,
        value: this.calculatedData.altitude,
      },
      {
        label: 'latitude',
        value: this.geolocationData.latitude,
      },
      {
        label: 'longitude',
        value: this.geolocationData.longitude,
      },
    ];
  }
}
