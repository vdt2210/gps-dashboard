import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CalculatedData } from 'src/app/core/models/calculate.model';
import { GeolocationDashboard } from 'src/app/core/models/geolocation.model';
import { UnitParams } from 'src/app/core/models/unit.model';
import { CalculateService } from 'src/app/core/services/calculate/calculate.service';
import { GeolocationService } from 'src/app/core/services/geolocation/geolocation.service';
import { TimerService } from 'src/app/core/services/timer/timer.service';
import { UnitService } from 'src/app/core/services/unit/unit.service';
import AppConstant from 'src/app/utilities/app-constant';
import { AppRoutes } from 'src/app/utilities/app-routes';

@Component({
  selector: 'app-dashboard',
  styleUrls: ['dashboard.page.scss'],
  templateUrl: 'dashboard.page.html',
})
export class DashboardPage implements OnInit {
  public totalTime = '00:00:00';
  public location: GeolocationDashboard = {
    gpsStatus: '',
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
    private unitService: UnitService,
    private router: Router
  ) {}

  public async ngOnInit() {
    this.timerService.getTotalTime().subscribe((data) => {
      this.totalTime = data;
    });

    this.geolocationService.getLocation().subscribe((data) => {
      console.log(JSON.stringify(data));

      this.location = data;
      this.updateGpsStatusIcon(data.gpsStatus);
    });

    this.calculateService.getCalculateData().subscribe((data) => {
      this.calculatedData = data;
    });

    this.unitService.getUnit().subscribe((data) => {
      this.unitData = data;
    });
  }

  private updateGpsStatusIcon(status: string) {
    const gpsStatus = document.getElementById('gpsStatus');

    switch (status) {
      case 'success':
        gpsStatus?.classList.remove('error-blink');
        gpsStatus?.classList.remove('standby-blink');
        break;

      case 'warning':
        gpsStatus?.classList.remove('error-blink');
        gpsStatus?.classList.remove('standby-blink');
        break;

      case 'danger':
        gpsStatus?.classList.remove('standby-blink');
        gpsStatus?.classList.add('error-blink');
        break;

      default:
        gpsStatus?.classList.remove('error-blink');
        gpsStatus?.classList.add('standby-blink');
        break;
    }
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

  public goToSetting() {
    this.router.navigateByUrl(`/${AppRoutes.settings.path}`);
  }
}
