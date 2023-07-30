import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import {
  GeolocationService,
  DistanceService,
  TimerService,
  TopSpeedService,
  UnitService,
} from '@services/index';

import { AppUtil, AppConstant } from '@utilities/index';

import { TGeolocation, ICalculatedData, DistanceParams } from '@models/index';

interface speedTime {
  speed: number;
  time: number;
}

const VALUE: speedTime[] = [];

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  calculateData$ = new BehaviorSubject<ICalculatedData>({
    accuracy: 0,
    altitude: '-.-',
    avgSpeed: '-.-',
    speed: null,
    topSpeed: null,
    totalDistance: 0,
    tripDistance: '0.0',
  });

  public speed!: number | string;
  public topSpeed!: number | string;
  public accuracy!: number | string;
  public totalDistance!: number;
  public speedCorrection!: number;
  private rawSpeed!: number | null;
  private rawTopSpeed!: number | null;
  private rawAccuracy!: number | null;
  private rawAltitude!: number | null;
  private avgSpeedTotalTime!: number;

  public tripDistance!: string;
  public altitude!: number | string;
  public avgSpeed!: number | string;

  private value = [...VALUE];

  private distances: DistanceParams = {
    avgSpeedTotalDistance: 0,
    totalDistance: 0,
    tripDistance: 0,
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

    this.geolocationService.getLocation().subscribe((value: TGeolocation) => {
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

  private handleGeolocationData(value: TGeolocation) {
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
    const speed = this.rawSpeed !== null ? Math.round(this.rawSpeed * 3.6) : null;

    const topSpeed = this.rawTopSpeed !== null ? Math.round(this.rawTopSpeed * 3.6) : null;

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

    this.totalDistance = Math.trunc(this.distances.totalDistance / 1000);

    if (this.distances.tripDistance >= 0) {
      this.tripDistance = AppUtil.toFixedNoRounding(this.distances.tripDistance / 1000, 1);
    } else {
      this.tripDistance = '0.0';
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
      accuracy: this.accuracy,
      altitude: this.altitude,
      avgSpeed: this.avgSpeed,
      speed,
      topSpeed,
      totalDistance: this.totalDistance,
      tripDistance: this.tripDistance,
    });
  }

  // * calculate in imperial unit
  private imperialUnit() {
    const speed = this.rawSpeed !== null ? Math.round(this.rawSpeed * 2.23693629) : null;

    const topSpeed = this.rawTopSpeed !== null ? Math.round(this.rawTopSpeed * 2.23693629) : null;

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

    this.totalDistance = Math.trunc(this.distances.totalDistance * 0.000621371192);

    if (this.distances.tripDistance >= 0) {
      this.tripDistance = AppUtil.toFixedNoRounding(
        this.distances.tripDistance * 0.000621371192,
        1
      );
    } else {
      this.tripDistance = '0.0';
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
      accuracy: this.accuracy,
      altitude: this.altitude,
      avgSpeed: this.avgSpeed,
      speed,
      topSpeed,
      totalDistance: this.totalDistance,
      tripDistance: this.tripDistance,
    });
  }
}
