import { Injectable } from '@angular/core';

import { AppConstant } from '@utilities/index';

import { ISyncData, TSyncDataDTO, TTripDTO } from '../../models/sync-data.model';
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
  private userId = this.authService.userId;

  constructor(
    private storageService: StorageService,
    private deviceService: DeviceService,
    private firebaseService: FirebaseService,
    private authService: authService,
    private topSpeedService: TopSpeedService,
    private timerService: TimerService,
    private distanceService: DistanceService
  ) {}

  public async getList() {
    return this.firebaseService.getById(AppConstant.docEndPoint.data, await this.userId);
  }

  public async setBackupValue() {
    const dataObject: Record<string, number> = {};
    const promises = AppConstant.backupKeys.map(async (key) => {
      dataObject[key] = await this.storageService.get(
        (AppConstant.storageKeys as { [key: string]: string })[key]
      );
    });
    await Promise.all(promises);

    await this.handleSyncData(dataObject as unknown as TSyncDataDTO);
    await this.handleTripsData(dataObject as unknown as TTripDTO);
  }

  private async handleSyncData(dataObject: TSyncDataDTO) {
    const { value: deviceId } = this.deviceService.deviceId;
    const { value: deviceInfo } = this.deviceService.deviceInfo;

    const params: TSyncDataDTO = {
      deviceId,
      deviceName: deviceInfo?.name ?? null,
      id: await this.userId,
      totalDistance: dataObject.totalDistance,
      totalTime: dataObject.totalTime,
    };

    await this.firebaseService.setDoc(`${AppConstant.docEndPoint.data}/${params.id}`, params);
  }

  private async handleTripsData(dataObject: TTripDTO) {
    const tripParams: TTripDTO = {
      avgSpeedTotalDistance: dataObject.avgSpeedTotalDistance,
      avgSpeedTotalTime: dataObject.avgSpeedTotalTime,
      createdDate: new Date().getTime(),
      id: await this.userId,
      topSpeed: dataObject.topSpeed,
      tripDistance: dataObject.tripDistance,
    };

    await this.firebaseService.updateDocArrayUnion(
      `${AppConstant.docEndPoint.data}/${await this.userId}`,
      'trips',
      tripParams
    );
  }

  public async getAndPatchBackupValue(syncData: ISyncData) {
    for (const key of AppConstant.backupKeys) {
      await this.storageService.set(
        (AppConstant.storageKeys as { [key: string]: string })[key],
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        syncData[key]
      );
    }

    this.distanceService.setInitialDistance();
    this.topSpeedService.setInitialTopSpeed();
    this.timerService.setInitialTotalTime();
  }
}
