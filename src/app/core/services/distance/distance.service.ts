import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { AppConstant } from '@utilities/index';

import { DistanceParams } from '../../models/distance.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  private distanceParams$: BehaviorSubject<DistanceParams>;

  constructor(private storageService: StorageService) {
    this.distanceParams$ = new BehaviorSubject<DistanceParams>({
      avgSpeedTotalDistance: 0,
      totalDistance: 0,
      tripDistance: 0,
    });
    this.setInitialDistance();
  }

  public async setInitialDistance() {
    if (
      !(await this.storageService.get(AppConstant.storageKeys.totalDistance)) ||
      !(await this.storageService.get(AppConstant.storageKeys.tripDistance)) ||
      !(await this.storageService.get(AppConstant.storageKeys.avgSpeedTotalDistance))
    ) {
      this.setDistance(0);
    }

    this.distanceParams$.next({
      avgSpeedTotalDistance: await this.storageService.get(
        AppConstant.storageKeys.avgSpeedTotalDistance
      ),
      totalDistance: await this.storageService.get(AppConstant.storageKeys.totalDistance),
      tripDistance: await this.storageService.get(AppConstant.storageKeys.tripDistance),
    });
  }

  public getDistances() {
    return this.distanceParams$;
  }

  public async setDistance(distance: number) {
    const currentTotalDistance = await this.storageService.get(
      AppConstant.storageKeys.totalDistance
    );

    const newTotalDistance = currentTotalDistance + distance;

    await this.storageService.set(AppConstant.storageKeys.totalDistance, newTotalDistance);

    const currentTripDistance = await this.storageService.get(AppConstant.storageKeys.tripDistance);

    const newTripDistance = currentTripDistance + distance;

    await this.storageService.set(AppConstant.storageKeys.tripDistance, newTripDistance);

    const currentAvgSpeedTotalDistance = await this.storageService.get(
      AppConstant.storageKeys.avgSpeedTotalDistance
    );

    const newAvgSpeedTotalDistance = currentAvgSpeedTotalDistance + distance;

    await this.storageService.set(
      AppConstant.storageKeys.avgSpeedTotalDistance,
      newAvgSpeedTotalDistance
    );

    this.distanceParams$.next({
      avgSpeedTotalDistance: newAvgSpeedTotalDistance,
      totalDistance: newTotalDistance,
      tripDistance: newTripDistance,
    });
  }

  public async removeTripDistance() {
    await this.storageService
      .remove(AppConstant.storageKeys.tripDistance)
      .then(() => this.setInitialDistance());
  }

  public async removeAvgSpeedTotalDistance() {
    await this.storageService
      .remove(AppConstant.storageKeys.avgSpeedTotalDistance)
      .then(() => this.setInitialDistance());
  }
}
