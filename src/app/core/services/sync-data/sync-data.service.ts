import { Injectable } from '@angular/core';
import appConstant from 'src/app/utilities/app-constant';

import { authService } from '../auth/auth.service';
import { DeviceService } from '../device/device.service';
import { DistanceService } from '../distance/distance.service';
import { FirebaseService } from '../firebase/firebase.service';
import { StorageService } from '../storage/storage.service';
import { TimerService } from '../timer/timer.service';
import { TopSpeedService } from '../top-speed/top-speed.service';

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
    for (const key of appConstant.backupKeys) {
      params[key] = await this.storageService.get(
        (appConstant.storageKeys as { [key: string]: string })[key]
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
        for (const key of appConstant.backupKeys) {
          await this.storageService.set(
            (appConstant.storageKeys as { [key: string]: string })[key],
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
