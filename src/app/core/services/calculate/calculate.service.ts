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

import { TGeolocation, DistanceParams, TCalculatingData, TCalculatedData } from '@models/index';

interface speedTime {
  speed: number;
  time: number;
}

const VALUE: speedTime[] = [];

@Injectable({
  providedIn: 'root',
})
export class CalculateService {
  calculateData$ = new BehaviorSubject<TCalculatedData>({
    accuracy: null,
    altitude: null,
    avgSpeed: null,
    speed: null,
    topSpeed: null,
    totalDistance: 0,
    tripDistance: '0.0',
  });

  public speed!: number;
  public topSpeed!: number;
  public accuracy!: number;
  public totalDistance!: number;
  public speedCorrection!: number;
  private rawSpeed!: number | null;
  private rawTopSpeed!: number | null;
  private rawAccuracy!: number | null;
  private rawAltitude?: string | number | null;
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
    this.unitService.getUnit().subscribe(() => {
      this.convert();
    });

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

      this.distanceService.setDistances(tripDistance);
    }

    this.convert();
  }

  private convert() {
    const rawData: TCalculatingData = {
      accuracy: this.rawAccuracy,
      altitude: this.rawAltitude,
      avgSpeedTotalDistance: this.distances.avgSpeedTotalDistance,
      avgSpeedTotalTime: this.avgSpeedTotalTime,
      speed: this.rawSpeed,
      topSpeed: this.rawTopSpeed,
      totalDistance: this.distances.totalDistance,
      tripDistance: this.distances.tripDistance,
    };
    let calculatedData: TCalculatedData;

    switch (this.unitService.getUnit().getValue().value) {
      case AppConstant.unit.imperial.value:
        calculatedData = this.calculateImperial(rawData);
        break;

      case AppConstant.unit.metric.value:
      default:
        calculatedData = this.calculateMetric(rawData);
        break;
    }

    this.calculateData$.next({
      accuracy: calculatedData.accuracy,
      altitude: calculatedData.altitude,
      avgSpeed: calculatedData.avgSpeed,
      speed: calculatedData.speed,
      topSpeed: calculatedData.topSpeed,
      totalDistance: calculatedData.totalDistance,
      tripDistance: calculatedData.tripDistance,
    });
  }

  public convertTripData({
    speed,
    topSpeed,
    totalDistance,
    tripDistance,
    avgSpeedTotalDistance,
    avgSpeedTotalTime,
  }: TCalculatingData) {
    const data = {
      avgSpeedTotalDistance: avgSpeedTotalDistance,
      avgSpeedTotalTime: avgSpeedTotalTime,
      speed: speed,
      topSpeed: topSpeed,
      totalDistance: totalDistance,
      tripDistance: tripDistance,
    };

    switch (this.unitService.getUnit().getValue().value) {
      case AppConstant.unit.imperial.value:
        return this.calculateImperial(data);

      case AppConstant.unit.metric.value:
      default:
        return this.calculateMetric(data);
    }
  }

  // * calculate in metric unit
  // private metricUnit() {
  //   const speed = this.rawSpeed !== null ? Math.round(this.rawSpeed * 3.6) : null;

  //   const topSpeed = this.rawTopSpeed !== null ? Math.round(this.rawTopSpeed * 3.6) : null;

  //   if (this.rawAccuracy != null) {
  //     this.accuracy = Math.round(this.rawAccuracy);
  //   } else {
  //     this.accuracy = '-';
  //   }

  //   if (this.rawAltitude != null) {
  //     this.altitude = AppUtil.toFixedNoRounding(this.rawAltitude, 1);
  //   } else {
  //     this.altitude = '-.-';
  //   }

  //   this.totalDistance = Math.trunc(this.distances.totalDistance / 1000);

  //   if (this.distances.tripDistance >= 0) {
  //     this.tripDistance = AppUtil.toFixedNoRounding(this.distances.tripDistance / 1000, 1);
  //   } else {
  //     this.tripDistance = '0.0';
  //   }

  //   if (this.distances.avgSpeedTotalDistance >= 0 && this.avgSpeedTotalTime > 0) {
  //     this.avgSpeed = AppUtil.toFixedNoRounding(
  //       (this.distances.avgSpeedTotalDistance / this.avgSpeedTotalTime) * 3.6,
  //       1
  //     );
  //   } else {
  //     this.avgSpeed = '-.-';
  //   }

  //   this.calculateData$.next({
  //     accuracy: this.accuracy,
  //     altitude: this.altitude,
  //     avgSpeed: this.avgSpeed,
  //     speed,
  //     topSpeed,
  //     totalDistance: this.totalDistance,
  //     tripDistance: this.tripDistance,
  //   });
  // }

  // * calculate in imperial unit
  // private imperialUnit() {
  //   const speed = this.rawSpeed !== null ? Math.round(this.rawSpeed * 2.23693629) : null;

  //   const topSpeed = this.rawTopSpeed !== null ? Math.round(this.rawTopSpeed * 2.23693629) : null;

  //   if (this.rawAccuracy != null) {
  //     this.accuracy = Math.round(this.rawAccuracy * 3.2808399);
  //   } else {
  //     this.accuracy = '-';
  //   }

  //   if (this.rawAltitude != null) {
  //     this.altitude = AppUtil.toFixedNoRounding(this.rawAltitude * 3.2808399, 1);
  //   } else {
  //     this.altitude = '-.-';
  //   }

  //   this.totalDistance = Math.trunc(this.distances.totalDistance * 0.000621371192);

  //   if (this.distances.tripDistance >= 0) {
  //     this.tripDistance = AppUtil.toFixedNoRounding(
  //       this.distances.tripDistance * 0.000621371192,
  //       1
  //     );
  //   } else {
  //     this.tripDistance = '0.0';
  //   }

  //   if (this.distances.avgSpeedTotalDistance >= 0 && this.avgSpeedTotalTime > 0) {
  //     this.avgSpeed = AppUtil.toFixedNoRounding(
  //       (this.distances.avgSpeedTotalDistance / this.avgSpeedTotalTime) * 2.23693629,
  //       1
  //     );
  //   } else {
  //     this.avgSpeed = '-.-';
  //   }

  //   this.calculateData$.next({
  //     accuracy: this.accuracy,
  //     altitude: this.altitude,
  //     avgSpeed: this.avgSpeed,
  //     speed,
  //     topSpeed,
  //     totalDistance: this.totalDistance,
  //     tripDistance: this.tripDistance,
  //   });
  // }

  // * calculate by unit v2

  public calculateMetric({
    speed,
    topSpeed,
    accuracy,
    altitude,
    totalDistance,
    tripDistance,
    avgSpeedTotalDistance,
    avgSpeedTotalTime,
  }: TCalculatingData) {
    const data = {
      accuracy: accuracy != null ? Math.round(accuracy) : null,
      altitude: altitude != null ? AppUtil.toFixedNoRounding(Number(altitude), 1) : null,
      avgSpeed: avgSpeedTotalTime
        ? AppUtil.toFixedNoRounding((avgSpeedTotalDistance / avgSpeedTotalTime) * 3.6, 1)
        : null,
      speed: speed != null ? Math.round(speed * 3.6) : null,
      topSpeed: topSpeed != null ? Math.round(topSpeed * 3.6) : null,
      totalDistance: totalDistance != null ? Math.trunc(totalDistance / 1000) : null,
      tripDistance: AppUtil.toFixedNoRounding(Number(tripDistance) / 1000, 1) || '0.0',
    };

    return data;
  }

  public calculateImperial({
    speed,
    topSpeed,
    accuracy,
    altitude,
    totalDistance,
    tripDistance,
    avgSpeedTotalDistance,
    avgSpeedTotalTime,
  }: TCalculatingData) {
    const data = {
      accuracy: accuracy != null ? Math.round(accuracy * 3.2808399) : null,
      altitude:
        altitude != null ? AppUtil.toFixedNoRounding(Number(altitude) * 3.2808399, 1) : null,
      avgSpeed: avgSpeedTotalTime
        ? AppUtil.toFixedNoRounding((avgSpeedTotalDistance / avgSpeedTotalTime) * 2.23693629, 1)
        : null,
      speed: speed != null ? Math.round(speed * 2.23693629) : null,
      topSpeed: topSpeed != null ? Math.round(topSpeed * 2.23693629) : null,
      totalDistance: totalDistance != null ? Math.trunc(totalDistance * 0.000621371192) : null,
      tripDistance: AppUtil.toFixedNoRounding(Number(tripDistance) * 0.000621371192, 1) || '0.0',
    };

    return data;
  }
}
