import { Injectable } from '@angular/core';

import { AppConstant } from '@utilities/index';

import { TSyncDataDTO } from '../../models/sync-data.model';
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
  constructor(
    private storageService: StorageService,
    private deviceService: DeviceService,
    private firebaseService: FirebaseService,
    private authService: authService,
    private topSpeedService: TopSpeedService,
    private timerService: TimerService,
    private distanceService: DistanceService
  ) {}

  public getList() {
    return this.firebaseService.get(AppConstant.docEndPoint.data);
  }

  public async setBackupValue() {
    const dataObject: Record<string, number | string> = {};
    const promises = AppConstant.backupKeys.map(async (key) => {
      dataObject[key] = await this.storageService.get(
        (AppConstant.storageKeys as { [key: string]: string })[key]
      );
    });
    await Promise.all(promises);

    const { value: deviceId } = this.deviceService.deviceId;
    const { value: deviceInfo } = this.deviceService.deviceInfo;
    const userId = await this.authService.userId;
    const dataId = `${userId}.${deviceId}`;

    const params: TSyncDataDTO = {
      deviceId,
      deviceName: deviceInfo?.name ?? null,
      id: dataId,
      uid: userId,
      ...dataObject,
    };

    this.firebaseService.setDoc(`${AppConstant.docEndPoint.data}/${dataId}`, params);
  }

  public async getAndPatchBackupValue(syncDataId: string) {
    this.firebaseService
      .getById(AppConstant.docEndPoint.data, syncDataId)
      .subscribe(async (data) => {
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
