import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { StorageService } from '@services/index';

import { AppConstant } from '@utilities/index';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private totalTime$: BehaviorSubject<number>;
  private tripTime$: BehaviorSubject<string>;
  private avgSpeedTotalTime$: BehaviorSubject<number>;

  constructor(private storageService: StorageService) {
    this.totalTime$ = new BehaviorSubject<number>(0);
    this.tripTime$ = new BehaviorSubject<string>('00:00:00');
    this.avgSpeedTotalTime$ = new BehaviorSubject<number>(0);

    this.setInitialTotalTime();
  }

  public async setInitialTotalTime() {
    await this.storageService
      .get(AppConstant.storageKeys.totalTime)
      .then((val) => {
        if (val) {
        } else {
          this.setTime(0);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    await this.storageService
      .get(AppConstant.storageKeys.tripTime)
      .then((val) => {
        if (val) {
          this.formatTime(val);
        } else {
          this.setTime(0);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    await this.storageService
      .get(AppConstant.storageKeys.avgSpeedTotalTime)
      .then((val) => {
        this.avgSpeedTotalTime$.next(val || 0);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public getTotalTime() {
    return this.totalTime$;
  }

  public getTripTime() {
    return this.tripTime$;
  }

  public getAvgSpeedTotalTime() {
    return this.avgSpeedTotalTime$;
  }

  public async setTime(time: number) {
    if (time < 0) return;

    await this.setTotalTime(time);
    await this.setTripTime(time);
    await this.setAvgSpeedTotalTime(time);
  }

  private async setTotalTime(time: number) {
    const currentTotalTime = await this.storageService.get(AppConstant.storageKeys.totalTime);
    const newTotalTime = currentTotalTime + Math.floor(time);

    await this.storageService.set(AppConstant.storageKeys.totalTime, newTotalTime).then(() => {});
  }

  private async setTripTime(time: number) {
    const currentTripTime = await this.storageService.get(AppConstant.storageKeys.tripTime);
    const newTripTime = currentTripTime + Math.floor(time);

    await this.storageService
      .set(AppConstant.storageKeys.tripTime, newTripTime)
      .then(() => this.formatTime(newTripTime));
  }

  private async setAvgSpeedTotalTime(time: number) {
    const currentAvgSpeedTotalTime = await this.storageService.get(
      AppConstant.storageKeys.avgSpeedTotalTime
    );
    const newAgSpeedTotalTime = currentAvgSpeedTotalTime + Math.floor(time);

    await this.storageService
      .set(AppConstant.storageKeys.avgSpeedTotalTime, newAgSpeedTotalTime)
      .then(() => this.avgSpeedTotalTime$.next(newAgSpeedTotalTime));
  }

  public async resetTripTime() {
    await this.storageService
      .remove(AppConstant.storageKeys.tripTime)
      .then(() => this.setInitialTotalTime());
  }

  public async resetAvgSpeedTotalTime() {
    await this.storageService
      .remove(AppConstant.storageKeys.avgSpeedTotalTime)
      .then(() => this.setInitialTotalTime());
  }

  private formatTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = time % 60;
    this.tripTime$.next(
      [hours, minutes, seconds].map((n) => n.toString().padStart(2, '0')).join(':')
    );
  }
}
