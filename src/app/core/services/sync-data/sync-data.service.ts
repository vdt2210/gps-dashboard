import { Injectable } from '@angular/core';
import { Subject, take } from 'rxjs';

import { AppConstant } from '@utilities/index';

import { ISyncUserData, ITrip, TSyncUserDataDTO, TTripDTO } from '@models/index';

import {
  DistanceService,
  FirebaseService,
  authService,
  StorageService,
  TimerService,
  TopSpeedService,
} from '../index';

@Injectable({
  providedIn: 'root',
})
export class SyncDataService {
  private onDestroy$: Subject<void> = new Subject<void>();

  private userId = this.authService.userId;
  private storageData = {
    avgSpeedTotalDistance: this.storageService.get(AppConstant.storageKeys.avgSpeedTotalDistance),
    avgSpeedTotalTime: this.storageService.get(AppConstant.storageKeys.avgSpeedTotalTime),
    topSpeed: this.storageService.get(AppConstant.storageKeys.topSpeed),
    totalDistance: this.storageService.get(AppConstant.storageKeys.totalDistance),
    totalTime: this.storageService.get(AppConstant.storageKeys.totalTime),
    tripDistance: this.storageService.get(AppConstant.storageKeys.tripDistance),
  };

  constructor(
    private storageService: StorageService,
    private firebaseService: FirebaseService,
    private authService: authService,
    private topSpeedService: TopSpeedService,
    private timerService: TimerService,
    private distanceService: DistanceService
  ) {}

  public async getList() {
    return this.firebaseService.getById(AppConstant.docEndPoint.trips, await this.userId);
  }

  public async setBackupValue() {
    const tripParams: TTripDTO = {
      avgSpeedTotalDistance: await this.storageData.avgSpeedTotalDistance,
      avgSpeedTotalTime: await this.storageData.avgSpeedTotalTime,
      createdDate: new Date().getTime(),
      topSpeed: await this.storageData.topSpeed,
      tripDistance: await this.storageData.tripDistance,
    };

    await this.firebaseService.updateDocArrayUnion(
      `${AppConstant.docEndPoint.trips}/${await this.userId}`,
      'trips',
      tripParams
    );
  }

  public async setTripValue(data: ITrip) {
    for (const key of AppConstant.backupKeys) {
      await this.storageService.set(
        (AppConstant.storageKeys as { [key: string]: string })[key],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        data[key]
      );
    }

    this.distanceService.setInitialDistance();
    this.topSpeedService.setInitialTopSpeed();
    this.timerService.setInitialTotalTime();
  }

  public async getUserData() {
    if (!(await this.userId)) return;

    this.firebaseService
      .getById(AppConstant.docEndPoint.userData, await this.userId)
      .pipe(take(1))
      .subscribe(async (data: ISyncUserData) => {
        if (data) {
          const { totalDistance, totalTime } = data;

          const { totalDistance: storageTotalDistance, totalTime: storageTotalTime } =
            this.storageData;

          if (totalDistance > (await storageTotalDistance)) {
            await this.storageService.set(AppConstant.storageKeys.totalDistance, totalDistance);
          }

          if (totalTime > (await storageTotalTime)) {
            await this.storageService.set(AppConstant.storageKeys.totalTime, totalTime);
          }

          if (
            totalDistance < (await storageTotalDistance) ||
            totalTime < (await storageTotalTime)
          ) {
            this.setUserData();
          }

          return;
        }
      });

    this.setUserData();
  }

  public async setUserData() {
    const params: TSyncUserDataDTO = {
      totalDistance: await this.storageData.totalDistance,
      totalTime: await this.storageData.totalTime,
    };

    await this.firebaseService.setDoc(
      `${AppConstant.docEndPoint.userData}/${await this.userId}`,
      params
    );

    this.distanceService.setInitialDistance();
    this.timerService.setInitialTotalTime();
  }
}
