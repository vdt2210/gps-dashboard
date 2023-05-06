import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import AppConstant from 'src/app/utilities/app-constant';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root',
})
export class TopSpeedService {
  private topSpeed$: BehaviorSubject<number | null>;

  constructor(private storageService: StorageService) {
    this.topSpeed$ = new BehaviorSubject<number | null>(null);
    this.setInitialTopSpeed();
  }

  private async setInitialTopSpeed(): Promise<void> {
    await this.storageService
      .get(AppConstant.storageKeys.topSpeed)
      .then((val) => {
        this.topSpeed$.next(val);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public getTopSpeed() {
    return this.topSpeed$;
  }

  public async setTopSpeed(speed: number): Promise<void> {
    if (speed == null) return;

    const currentTopSpeed = await this.storageService.get(AppConstant.storageKeys.topSpeed);

    if (speed <= currentTopSpeed) {
      return;
    }

    await this.storageService.set(AppConstant.storageKeys.topSpeed, speed);
    this.topSpeed$.next(speed);
  }

  public async clearTopSpeed(): Promise<void> {
    await this.storageService
      .remove(AppConstant.storageKeys.topSpeed)
      .then(() => this.topSpeed$.next(null));
  }
}
