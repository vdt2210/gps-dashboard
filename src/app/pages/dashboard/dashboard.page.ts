import { Component, OnInit } from '@angular/core';

import { CalculateService, GeolocationService, TimerService, UnitService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { CalculatedData, UnitParams, EGpsStatusColor, TGeolocationDashboard } from '@models/index';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.page.scss'],
  templateUrl: 'dashboard.page.html',
})
export class DashboardPage implements OnInit {
  public totalTime = '00:00:00';
  public location: TGeolocationDashboard = {
    gpsStatusColor: '' as EGpsStatusColor,
    latitude: '-.-',
    longitude: '-.-',
  };

  public calculatedData: CalculatedData = {
    accuracy: '-',
    altitude: '-.-',
    avgSpeed: '-.-',
    speed: '-',
    topSpeed: '-',
    totalDistance: '-',
    tripDistance: '-.-',
  };

  public unitData: UnitParams = {
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
    this.timerService.getTotalTime().subscribe((data) => {
      this.totalTime = data;
    });

    this.geolocationService.getLocation().subscribe((data) => {
      this.location = data;
    });

    this.calculateService.getCalculateData().subscribe((data) => {
      this.calculatedData = data;
    });

    this.unitService.getUnit().subscribe((data) => {
      this.unitData = data;
    });
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
