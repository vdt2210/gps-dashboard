import { Injectable } from '@angular/core';

import { AppConstant } from '@utilities/index';

import {
  DeviceService,
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
  docRef = 'data';

  constructor(
    private storageService: StorageService,
    private deviceService: DeviceService,
    private firebaseService: FirebaseService,
    private authService: authService,
    private topSpeedService: TopSpeedService,
    private timerService: TimerService,
    private distanceService: DistanceService
  ) {}

  public async setBackupValue() {
    let params: { [key: string]: any } = {};
    for (const key of AppConstant.backupKeys) {
      params[key] = await this.storageService.get(
        (AppConstant.storageKeys as { [key: string]: string })[key]
      );
    }

    const dataId = `${await this.authService.userId}.${this.deviceService.deviceId.value}`;

    params = {
      deviceId: this.deviceService.deviceId.value,
      id: dataId,
      uid: await this.authService.userId,
      ...params,
    };

    this.firebaseService.setDoc(`${this.docRef}/${dataId}`, params);
  }

  public async getAndPatchBackupValue(deviceId: string) {
    const dataId = `${await this.authService.userId}.${deviceId}`;

    this.firebaseService.getById(this.docRef, dataId).subscribe(async (data) => {
      if (data) {
        for (const key of AppConstant.backupKeys) {
          await this.storageService.set(
            (AppConstant.storageKeys as { [key: string]: string })[key],
            data[key]
          );
        }

        this.distanceService.setInitialDistance();
        this.topSpeedService.setInitialTopSpeed();
        this.timerService.setInitialTotalTime();
      }
    });
  }
}
