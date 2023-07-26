import { Injectable } from '@angular/core';
import { Device, DeviceInfo } from '@capacitor/device';
import { BehaviorSubject } from 'rxjs';

import { AppConstant } from '@utilities/index';

import { TDeviceInfo, TDeviceInfoDTO } from '@models/index';

import { authService, FirebaseService, StorageService } from '../index';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  deviceId$: BehaviorSubject<string>;
  deviceInfo$: BehaviorSubject<DeviceInfo | null>;
  devicesList$: BehaviorSubject<TDeviceInfo[]>;

  constructor(
    private firebaseService: FirebaseService,
    private authService: authService,
    private storageService: StorageService
  ) {
    this.deviceId$ = new BehaviorSubject<string>('');
    this.deviceInfo$ = new BehaviorSubject<DeviceInfo | null>(null);
    this.devicesList$ = new BehaviorSubject<TDeviceInfo[]>([]);
  }

  public async setInitialDeviceId() {
    this.deviceInfo$.next(await Device.getInfo());

    await this.storageService
      .get(AppConstant.storageKeys.deviceId)
      .then(async (val) => {
        if (val) {
          this.deviceId$.next(val);
          this.setDeviceInfo();
        } else {
          this.setDeviceId(await Device.getId().then((e) => e.identifier));
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public async setDeviceId(id: string) {
    await this.storageService.set(AppConstant.storageKeys.deviceId, id);
    this.deviceId$.next(id);
    this.setDeviceInfo();
  }

  public get deviceId() {
    return this.deviceId$;
  }

  public get deviceInfo() {
    return this.deviceInfo$;
  }

  public get devicesList() {
    return this.devicesList$;
  }

  public getList() {
    return this.firebaseService.get(AppConstant.docEndPoint.devices);
  }

  // public async getDetail(id?: string) {
  //   this.firebaseService
  //     .getById(AppConstant.docEndPoint.devices, id ? id : this.deviceId.value)
  //     .subscribe((res: DeviceInfo) => {
  //       return res;
  //     });
  // }

  public getDetail(id?: string) {
    return this.firebaseService.getWhereId(
      AppConstant.docEndPoint.devices,
      id ? id : this.deviceId.value
    );
  }

  public async setDeviceInfo() {
    const params: TDeviceInfoDTO = {
      id: this.deviceId.value,
      isActivated: true,
      name: this.deviceInfo.value?.name || null,
      os: this.deviceInfo.value?.operatingSystem,
      platform: this.deviceInfo.value?.platform,
      uid: await this.authService.userId,
    };

    this.firebaseService.setDoc(
      `${AppConstant.docEndPoint.devices}/${await this.authService.userId}.${this.deviceId.value}`,
      params
    );
  }
}
