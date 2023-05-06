import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppConstant from 'src/app/utilities/app-constant';

import { DistanceParams } from '../../models/distance.model';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class DistanceService {
  private distanceParams$: BehaviorSubject<DistanceParams>;

  constructor(private storageService: StorageService) {
    this.distanceParams$ = new BehaviorSubject<DistanceParams>({
      totalDistance: 0,
      tripDistance: 0,
      avgSpeedTotalDistance: 0,
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
      totalDistance: await this.storageService.get(AppConstant.storageKeys.totalDistance),
      tripDistance: await this.storageService.get(AppConstant.storageKeys.tripDistance),
      avgSpeedTotalDistance: await this.storageService.get(
        AppConstant.storageKeys.avgSpeedTotalDistance
      ),
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
      totalDistance: newTotalDistance,
      tripDistance: newTripDistance,
      avgSpeedTotalDistance: newAvgSpeedTotalDistance,
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
