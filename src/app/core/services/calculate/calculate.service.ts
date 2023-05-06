import { Injectable } from '@angular/core';
import { GeolocationService } from '../../services/geolocation/geolocation.service';
import AppUtil from 'src/app/utilities/app-util';
import { BehaviorSubject } from 'rxjs';
import AppConstant from 'src/app/utilities/app-constant';
import { CalculatedData } from '../../models/calculate.model';
import { TimerService } from '../timer/timer.service';
import { TopSpeedService } from '../top-speed/top-speed.service';
import { Geolocation } from '../../models/geolocation.model';
import { DistanceService } from '../distance/distance.service';
import { DistanceParams } from '../../models/distance.model';
import { UnitService } from '../unit/unit.service';

interface speedTime {
  speed: number;
  time: number;
}

const VALUE: speedTime[] = [];

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  calculateData$ = new BehaviorSubject<CalculatedData>({
    speed: 0,
    topSpeed: 0,
    accuracy: 0,
    altitude: '-.-',
    totalDistance: 0,
    tripDistance: '-.-',
    avgSpeed: '-.-',
  });

  public speed!: number | string;
  public topSpeed!: number | string;
  public accuracy!: number | string;
  public totalDistance!: number | string;
  public speedCorrection!: number;
  private rawSpeed!: number | null;
  private rawTopSpeed!: number | null;
  private rawAccuracy!: number | null;
  private rawAltitude!: number | null;
  private avgSpeedTotalTime!: number;

  public tripDistance!: number | string;
  public altitude!: number | string;
  public avgSpeed!: number | string;

  private value = [...VALUE];

  private distances: DistanceParams = {
    totalDistance: 0,
    tripDistance: 0,
    avgSpeedTotalDistance: 0,
  };

  constructor(
    private unitService: UnitService,
    private topSpeedService: TopSpeedService,
    private distanceService: DistanceService,
    private timerService: TimerService,
    private geolocationService: GeolocationService
  ) {}

  public getCalculateData() {
    return this.calculateData$;
  }

  public initialCalculate() {
    this.updateUnitSystem();

    this.geolocationService.getLocation().subscribe((value: Geolocation) => {
      this.handleGeolocationData(value);
    });

    this.topSpeedService.getTopSpeed().subscribe((value: number | null) => {
      this.rawTopSpeed = value;
      this.convert();
    });

    this.distanceService.getDistances().subscribe((value: DistanceParams) => {
      this.distances = value;
      this.convert();
    });

    this.timerService.getAvgSpeedTotalTime().subscribe((value: number) => {
      this.avgSpeedTotalTime = value;
      this.convert();
    });
  }

  private handleGeolocationData(value: Geolocation) {
    this.rawSpeed = value.speed;
    this.rawAccuracy = value.accuracy;
    this.rawAltitude = value.altitude;

    if (value.speed && value.time) {
      this.value = [
        ...this.value,
        {
          speed: value.speed,
          time: value.time,
        },
      ];

      let tripDistance = 0;
      for (const val of this.value) {
        tripDistance = val.speed * val.time;
      }

      this.distanceService.setDistance(tripDistance);
    }

    this.convert();
  }

  private convert() {
    switch (this.unitService.getUnit().getValue().value) {
      case AppConstant.unit.imperial.value:
        this.imperialUnit();
        break;

      case AppConstant.unit.metric.value:
      default:
        this.metricUnit();
        break;
    }
  }

  private updateUnitSystem() {
    this.unitService.getUnit().subscribe((data) => {
      switch (data.value) {
        case AppConstant.unit.imperial.value:
          this.imperialUnit();
          break;

        case AppConstant.unit.metric.value:
        default:
          this.metricUnit();
          break;
      }
    });
  }

  // * calculate in metric unit
  private metricUnit() {
    if (this.rawSpeed != null) {
      this.speed = Math.round(this.rawSpeed * 3.6);
    } else {
      this.speed = '-';
    }

    if (this.rawTopSpeed != null) {
      this.topSpeed = Math.round(this.rawTopSpeed * 3.6);
    } else {
      this.topSpeed = '-';
    }

    if (this.rawAccuracy != null) {
      this.accuracy = Math.round(this.rawAccuracy);
    } else {
      this.accuracy = '-';
    }

    if (this.rawAltitude != null) {
      this.altitude = AppUtil.toFixedNoRounding(this.rawAltitude, 1);
    } else {
      this.altitude = '-.-';
    }

    if (this.distances.totalDistance >= 0) {
      this.totalDistance = Math.trunc(this.distances.totalDistance / 1000);
    } else {
      this.totalDistance = '-.-';
    }

    if (this.distances.tripDistance >= 0) {
      this.tripDistance = AppUtil.toFixedNoRounding(this.distances.tripDistance / 1000, 1);
    } else {
      this.tripDistance = '-.-';
    }

    if (this.distances.avgSpeedTotalDistance >= 0 && this.avgSpeedTotalTime > 0) {
      this.avgSpeed = AppUtil.toFixedNoRounding(
        (this.distances.avgSpeedTotalDistance / this.avgSpeedTotalTime) * 3.6,
        1
      );
    } else {
      this.avgSpeed = '-.-';
    }

    this.calculateData$.next({
      speed: this.speed,
      topSpeed: this.topSpeed,
      accuracy: this.accuracy,
      altitude: this.altitude,
      totalDistance: this.totalDistance,
      tripDistance: this.tripDistance,
      avgSpeed: this.avgSpeed,
    });
  }

  // * calculate in imperial unit
  private imperialUnit() {
    if (this.rawSpeed != null) {
      this.speed = Math.round(this.rawSpeed * 2.23693629);
    } else {
      this.speed = '-';
    }

    if (this.rawTopSpeed != null) {
      this.topSpeed = Math.round(this.rawTopSpeed * 2.23693629);
    } else {
      this.topSpeed = '-';
    }

    if (this.rawAccuracy != null) {
      this.accuracy = Math.round(this.rawAccuracy * 3.2808399);
    } else {
      this.accuracy = '-';
    }

    if (this.rawAltitude != null) {
      this.altitude = AppUtil.toFixedNoRounding(this.rawAltitude * 3.2808399, 1);
    } else {
      this.altitude = '-.-';
    }

    if (this.distances.totalDistance >= 0) {
      this.totalDistance = Math.trunc(this.distances.totalDistance * 0.000621371192);
    } else {
      this.totalDistance = '-.-';
    }

    if (this.distances.tripDistance >= 0) {
      this.tripDistance = AppUtil.toFixedNoRounding(
        this.distances.tripDistance * 0.000621371192,
        1
      );
    } else {
      this.tripDistance = '-.-';
    }

    if (this.distances.avgSpeedTotalDistance >= 0 && this.avgSpeedTotalTime > 0) {
      this.avgSpeed = AppUtil.toFixedNoRounding(
        (this.distances.avgSpeedTotalDistance / this.avgSpeedTotalTime) * 2.23693629,
        1
      );
    } else {
      this.avgSpeed = '-.-';
    }

    this.calculateData$.next({
      speed: this.speed,
      topSpeed: this.topSpeed,
      accuracy: this.accuracy,
      altitude: this.altitude,
      totalDistance: this.totalDistance,
      tripDistance: this.tripDistance,
      avgSpeed: this.avgSpeed,
    });
  }
}
