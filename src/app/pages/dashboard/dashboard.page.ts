import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';

import { CalculateService, GeolocationService, TimerService, UnitService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { IUnit, EGpsStatusColor, TGeolocationDashboard, TCalculatedData } from '@models/index';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.page.scss'],
  templateUrl: 'dashboard.page.html',
})
export class DashboardPage implements OnInit, OnDestroy {
  private onDestroy$: Subject<void> = new Subject<void>();

  public totalTime: string = '00:00:00';
  public location: TGeolocationDashboard = {
    gpsStatusColor: '' as EGpsStatusColor,
    latitude: '-.-',
    longitude: '-.-',
  };

  public calculatedData: TCalculatedData = {
    accuracy: '-',
    altitude: '-.-',
    avgSpeed: '-.-',
    speed: null,
    topSpeed: null,
    totalDistance: 0,
    tripDistance: '0.0',
  };

  public unitData: IUnit = {
    distanceUnit: '',
    lengthUnit: '',
    speedUnit: '',
    value: '',
  };

  constructor(
    private geolocationService: GeolocationService,
    private calculateService: CalculateService,
    private timerService: TimerService,
    private unitService: UnitService
  ) {}

  public ngOnInit() {
    this.timerService
      .getTripTime()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.totalTime = data;
      });

    this.geolocationService
      .getLocation()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.location = data;
      });

    this.calculateService
      .getCalculateData()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.calculatedData = data;
      });

    this.unitService
      .getUnit()
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((data) => {
        this.unitData = data;
      });
  }

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }

  public switchUnit() {
    switch (this.unitData.value) {
      case AppConstant.unit.metric.value:
        this.unitService.setUnit(AppConstant.unit.imperial.value);
        break;

      default:
        this.unitService.setUnit(AppConstant.unit.metric.value);
        break;
    }
  }
}
