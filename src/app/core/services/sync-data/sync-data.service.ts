import { Injectable } from '@angular/core';
import { take } from 'rxjs';

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
  constructor(
    private storageService: StorageService,
    private firebaseService: FirebaseService,
    private authService: authService,
    private topSpeedService: TopSpeedService,
    private timerService: TimerService,
    private distanceService: DistanceService
  ) {}

  private storageData() {
    return {
      avgSpeedTotalDistance: this.distanceService.getDistances().getValue().avgSpeedTotalDistance,
      avgSpeedTotalTime: this.timerService.getAvgSpeedTotalTime().getValue(),
      topSpeed: this.topSpeedService.getTopSpeed().getValue(),
      totalDistance: this.distanceService.getDistances().getValue().totalDistance,
      totalTime: this.timerService.getTotalTime().getValue(),
      tripDistance: this.distanceService.getDistances().getValue().tripDistance,
      tripTime: this.storageService.get(AppConstant.storageKeys.tripTime),
    };
  }

  private async userId() {
    return await this.authService.uid;
  }

  public async getList() {
    return this.firebaseService.getById(AppConstant.docEndPoint.trips, await this.userId());
  }

  public async setBackupValue() {
    const tripParams: TTripDTO = {
      avgSpeedTotalDistance: this.storageData().avgSpeedTotalDistance,
      avgSpeedTotalTime: this.storageData().avgSpeedTotalTime,
      topSpeed: this.storageData().topSpeed,
      tripDistance: this.storageData().tripDistance,
      tripTime: await this.storageData().tripTime,
    };

    await this.firebaseService.updateDocArrayUnion(
      `${AppConstant.docEndPoint.trips}/${await this.userId()}`,
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
    const uid = await this.userId();

    if (!uid) return;

    this.firebaseService
      .getById(AppConstant.docEndPoint.userData, uid)
      .pipe(take(1))
      .subscribe(async (data: ISyncUserData) => {
        const { totalDistance: storageTotalDistance, totalTime: storageTotalTime } =
          this.storageData();

        if (!!data) {
          const { totalDistance, totalTime } = data;

          if (totalDistance > storageTotalDistance) {
            await this.storageService.set(AppConstant.storageKeys.totalDistance, totalDistance);
            this.distanceService.setInitialDistance();
          } else {
            const params: TSyncUserDataDTO = {
              totalDistance: storageTotalDistance,
              totalTime: totalTime,
            };

            await this.setUserData(params);
          }

          if (totalTime > storageTotalTime) {
            await this.storageService.set(AppConstant.storageKeys.totalTime, totalTime);
            this.timerService.setInitialTotalTime();
          } else {
            const params: TSyncUserDataDTO = {
              totalDistance: totalDistance,
              totalTime: storageTotalTime,
            };

            await this.setUserData(params);
          }

          return;
        }

        const params: TSyncUserDataDTO = {
          totalDistance: storageTotalDistance,
          totalTime: storageTotalTime,
        };

        await this.setUserData(params);
      });
  }

  public async setUserData(params: TSyncUserDataDTO) {
    await this.firebaseService.setDoc(
      `${AppConstant.docEndPoint.userData}/${await this.userId()}`,
      params
    );

    this.distanceService.setInitialDistance();
    this.timerService.setInitialTotalTime();
  }
}
