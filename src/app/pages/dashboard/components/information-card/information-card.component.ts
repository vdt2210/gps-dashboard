import { Component, Input, OnChanges } from '@angular/core';
import { UnitParams } from 'src/app/core/models/unit.model';
import AppConstant from 'src/app/utilities/app-constant';

interface data {
  label: string;
  unit?: string;
  value: number | string;
}

@Component({
  selector: 'app-information-card',
  styleUrls: ['./information-card.component.scss'],
  templateUrl: './information-card.component.html',
})
export class InformationCardComponent implements OnChanges {
  @Input() topSpeed: number | string = '-.-';
  @Input() avgSpeed: number | string = '-.-';
  @Input() accuracy: number | string = '-';
  @Input() altitude: number | string = '-.-';
  @Input() latitude: number | string = '-.-';
  @Input() longitude: number | string = '-.-';
  @Input() unitData: UnitParams = {
    distanceUnit: AppConstant.unit.metric.distanceUnit,
    lengthUnit: AppConstant.unit.metric.lengthUnit,
    speedUnit: AppConstant.unit.metric.speedUnit,
    value: AppConstant.unit.metric.value,
  };

  public dataList: data[] = [];

  ngOnChanges(): void {
    this.dataList = [
      {
        label: 'topSpeed',
        unit: this.unitData.speedUnit,
        value: this.topSpeed,
      },
      {
        label: 'averageSpeed',
        unit: this.unitData.speedUnit,
        value: this.avgSpeed,
      },
      {
        label: 'accuracy',
        unit: this.unitData.lengthUnit,
        value: this.accuracy,
      },
      {
        label: 'altitude',
        unit: this.unitData.lengthUnit,
        value: this.altitude,
      },
      {
        label: 'latitude',
        value: this.latitude,
      },
      {
        label: 'longitude',
        value: this.longitude,
      },
    ];
  }
}
