import { Component, Input } from '@angular/core';

import { AppConstant } from '@utilities/index';

@Component({
  selector: 'app-total-trip-distance',
  styleUrls: ['./total-trip-distance.component.scss'],
  templateUrl: './total-trip-distance.component.html',
})
export class TotalTripDistanceComponent {
  @Input() totalDistance?: number | null = 0;
  @Input() tripDistance?: string | number | null = '0.0';
  @Input() distanceUnit: string = AppConstant.unit.metric.distanceUnit;

  public isShowTotalDistance: boolean = false;

  constructor() {}

  public switchDisplay() {
    this.isShowTotalDistance = !this.isShowTotalDistance;
  }
}
