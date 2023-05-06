import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppConstant from 'src/app/utilities/app-constant';

import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TimerService {
  private totalTime$: BehaviorSubject<string>;
  private avgSpeedTotalTime$: BehaviorSubject<number>;

  constructor(private storageService: StorageService) {
    this.totalTime$ = new BehaviorSubject<string>('00:00:00');
    this.avgSpeedTotalTime$ = new BehaviorSubject<number>(0);

    this.setInitialTotalTime();
  }

  public async setInitialTotalTime() {
    await this.storageService
      .get(AppConstant.storageKeys.totalTime)
      .then((val) => {
        if (val) {
          this.formatTime(val);
        } else {
          this.saveTotalTime(0);
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

  public getAvgSpeedTotalTime() {
    return this.avgSpeedTotalTime$;
  }

  public async saveTotalTime(time: number) {
    if (time < 0) return;

    const currentTotalTime = await this.storageService.get(AppConstant.storageKeys.totalTime);

    const currentAvgSpeedTotalTime = await this.storageService.get(
      AppConstant.storageKeys.avgSpeedTotalTime
    );

    const newTotalTime = currentTotalTime + Math.floor(time);

    const newAgSpeedTotalTime = currentAvgSpeedTotalTime + Math.floor(time);

    await this.storageService
      .set(AppConstant.storageKeys.totalTime, newTotalTime)
      .then(() => this.formatTime(newTotalTime));

    await this.storageService
      .set(AppConstant.storageKeys.avgSpeedTotalTime, newAgSpeedTotalTime)
      .then(() => this.avgSpeedTotalTime$.next(newAgSpeedTotalTime));
  }

  public async resetTotalTime() {
    await this.storageService
      .remove(AppConstant.storageKeys.totalTime)
      .then(() => this.setInitialTotalTime());
  }

  public async resetAvgSpeedTotalTime() {
    await this.storageService
      .remove(AppConstant.storageKeys.avgSpeedTotalTime)
      .then(() => this.setInitialTotalTime());
  }

  private formatTime(totalTime: number) {
    const hours = Math.floor(totalTime / 3600);
    const minutes = Math.floor(totalTime / 60) % 60;
    const seconds = totalTime % 60;
    this.totalTime$.next(
      [hours, minutes, seconds].map((n) => n.toString().padStart(2, '0')).join(':')
    );
  }
}
