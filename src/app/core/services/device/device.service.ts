import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { BehaviorSubject } from 'rxjs';

import { AppConstant } from '@utilities/index';

import { DeviceInfo } from '@models/index';

import { authService, FirebaseService, StorageService } from '../index';

@Injectable({
  providedIn: 'root',
})
export class DeviceService {
  docRef = 'devices';

  deviceId$: BehaviorSubject<string>;
  devicesList$: BehaviorSubject<DeviceInfo[]>;

  constructor(
    private firebaseService: FirebaseService,
    private authService: authService,
    private storageService: StorageService
  ) {
    this.deviceId$ = new BehaviorSubject<string>('');
    this.devicesList$ = new BehaviorSubject<DeviceInfo[]>([]);
  }

  public async setInitialDeviceId() {
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

  public get devicesList() {
    return this.devicesList$;
  }

  public getList() {
    return this.firebaseService.get(this.docRef);
  }

  // public async getDetail(id?: string) {
  //   this.firebaseService
  //     .getById(this.docRef, id ? id : this.deviceId.value)
  //     .subscribe((res: DeviceInfo) => {
  //       return res;
  //     });
  // }

  public getDetail(id?: string) {
    return this.firebaseService.getWhereId(this.docRef, id ? id : this.deviceId.value);
  }

  public async setDeviceInfo() {
    const params = {
      id: this.deviceId.value,
      isActivated: true,
      name: (await Device.getInfo()).name || null,
      os: (await Device.getInfo()).operatingSystem || null,
      platform: (await Device.getInfo()).platform || null,
      uid: await this.authService.userId,
    };

    this.firebaseService.setDoc(
      `${this.docRef}/${await this.authService.userId}.${this.deviceId.value}`,
      params
    );
  }
}
