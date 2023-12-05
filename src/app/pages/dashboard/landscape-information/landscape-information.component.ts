import { Component, Input, OnChanges } from '@angular/core';

import { AppConstant } from '@utilities/index';

import { ICalculatedData, IUnit } from '@models/index';

type TDataList = {
  label: string;
  unit?: string;
  value?: number | string | null;
};

type TInformationCardCalculatedData = Pick<
  ICalculatedData,
  'accuracy' | 'altitude' | 'avgSpeed' | 'topSpeed'
>;

type TInformationCardUnit = Pick<IUnit, 'lengthUnit' | 'speedUnit'>;

@Component({
  selector: 'app-landscape-information',
  styleUrls: ['./landscape-information.component.scss'],
  templateUrl: './landscape-information.component.html',
})
export class LandscapeInformationComponent implements OnChanges {
  @Input() calculatedData: TInformationCardCalculatedData = {
    accuracy: null,
    altitude: null,
    avgSpeed: null,
    topSpeed: null,
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
    ];
  }
}
