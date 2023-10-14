import { Injectable, NgZone } from '@angular/core';
import { registerPlugin } from '@capacitor/core';
import { BackgroundGeolocationPlugin } from '@capacitor-community/background-geolocation';
import { BehaviorSubject } from 'rxjs';

import { AppConstant, AppUtil } from '@utilities/index';

import { EGpsStatusColor, TGeolocation } from '@models/index';

import { StorageService, TimerService, TopSpeedService } from '../index';

const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>('BackgroundGeolocation');

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  private watcherId = '';
  private speedCorrection$ = new BehaviorSubject<number>(0);
  private location$ = new BehaviorSubject<TGeolocation>({
    accuracy: null,
    altitude: null,
    altitudeAccuracy: null,
    bearing: null,
    gpsStatusColor: '' as EGpsStatusColor,
    latitude: '-.-',
    longitude: '-.-',
    simulated: false,
    speed: null,
    time: null,
  });
  private options = {
    backgroundMessage: 'Cancel to prevent battery drain.',
    backgroundTitle: 'Tracking You.',
    distanceFilter: 0,
    requestPermissions: true,
    stale: false,
  };
  private lastTimestamp = 0;

  constructor(
    private zone: NgZone,
    private topSpeedService: TopSpeedService,
    private timerService: TimerService,
    private storageService: StorageService
  ) {}

  public startBackgroundGeolocation(): void {
    if (this.watcherId) return;

    this.setInitialSpeedCorrection();

    BackgroundGeolocation.addWatcher(this.options, this.handleWatcher.bind(this)).then(
      (watcherId) => (this.watcherId = watcherId)
    );
  }

  public getLocation(): BehaviorSubject<TGeolocation> {
    return this.location$;
  }

  public stopBackgroundGeolocation(): void {
    if (this.watcherId) {
      BackgroundGeolocation.removeWatcher({ id: this.watcherId });
      this.watcherId = '';
    }
  }

  private handleWatcher(location: any, error: any): any {
    if (error) {
      if (error.code === 'NOT_AUTHORIZED') {
        const message =
          'This app needs your location, ' +
          'but does not have permission.\n\n' +
          'Open settings now?';
        if (window.confirm(message)) {
          BackgroundGeolocation.openSettings();
        }
      }
      return error;
    }

    this.zone.run(async () => {
      location.speed = AppUtil.calculateSpeed(
        location.speed,
        (await this.storageService.get(AppConstant.storageKeys.speedCorrection)) || 0
      );
      location.time = this.setTime(location.time, location.speed);
      location.gpsStatusColor = AppUtil.getGpsStatusColor(location.accuracy);
      this.location$.next(location);
      this.topSpeedService.setTopSpeed(location.speed);
    });

    return location;
  }

  public async setInitialSpeedCorrection(): Promise<void> {
    await this.storageService.get(AppConstant.storageKeys.speedCorrection).then((val) => {
      if (val) {
        this.speedCorrection$.next(val);
      } else {
        this.setSpeedCorrection(5);
      }
    });
  }

  public getSpeedCorrection() {
    return this.speedCorrection$;
  }

  public async setSpeedCorrection(speedCorrection: number): Promise<void> {
    if (speedCorrection == null) return;

    this.storageService.set(AppConstant.storageKeys.speedCorrection, speedCorrection);

    this.speedCorrection$.next(speedCorrection);
  }

  private setTime(time: number, speed: number) {
    const newTime = this.lastTimestamp && speed ? (time - this.lastTimestamp) / 1000 : 0;
    this.lastTimestamp = time;

    this.timerService.setTime(newTime);

    return newTime;
  }
}
