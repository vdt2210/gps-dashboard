//** All times are in second */

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
          this.totalTime$.next(val);
        } else {
          this.setTotalTime(0);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    await this.storageService
      .get(AppConstant.storageKeys.tripTime)
      .then((val) => {
        if (val) {
          this.tripTime$.next(this.formatTime(val));
        } else {
          this.setTripTime(0);
        }
      })
      .catch((err) => {
        console.error(err);
      });

    await this.storageService
      .get(AppConstant.storageKeys.avgSpeedTotalTime)
      .then((val) => {
        if (val) {
          this.avgSpeedTotalTime$.next(val);
        } else {
          this.setAvgSpeedTotalTime(0);
        }
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
    this.setTotalTime(time);
    this.setTripTime(time);
    this.setAvgSpeedTotalTime(time);
  }

  private async setTotalTime(time: number) {
    const currentTotalTime = await this.storageService.get(AppConstant.storageKeys.totalTime);
    const newTotalTime = currentTotalTime + time;

    await this.storageService.set(AppConstant.storageKeys.totalTime, newTotalTime);
  }

  private async setTripTime(time: number) {
    const currentTripTime = await this.storageService.get(AppConstant.storageKeys.tripTime);
    const newTripTime = currentTripTime + time;

    await this.storageService
      .set(AppConstant.storageKeys.tripTime, newTripTime)
      .then(() => this.tripTime$.next(this.formatTime(newTripTime)));
  }

  private async setAvgSpeedTotalTime(time: number) {
    const currentAvgSpeedTotalTime = await this.storageService.get(
      AppConstant.storageKeys.avgSpeedTotalTime
    );
    const newAgSpeedTotalTime = currentAvgSpeedTotalTime + time;

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

  public formatTime(time: number) {
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor(time / 60) % 60;
    const seconds = Math.floor(time % 60);

    const parsedTimer = [hours, minutes, seconds]
      .map((n) => n.toString().padStart(2, '0'))
      .join(':');

    return parsedTimer;
  }
}
