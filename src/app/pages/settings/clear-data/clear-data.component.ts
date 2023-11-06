import { Component, EventEmitter, Output } from '@angular/core';

import { DistanceService, TopSpeedService, TimerService } from '@services/index';

import { ToastComponent } from '@shared/components';

import { AppConstant } from '@utilities/index';

@Component({
  selector: 'app-clear-data',
  styleUrls: ['./clear-data.component.scss'],
  templateUrl: './clear-data.component.html',
})
export class ClearDataComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;
  public clearableKeys = [
    { isChecked: false, name: 'averageSpeed' },
    { isChecked: false, name: AppConstant.storageKeys.topSpeed },
    { isChecked: false, name: AppConstant.storageKeys.totalTime },
    { isChecked: false, name: AppConstant.storageKeys.tripDistance },
  ];

  constructor(
    private distanceService: DistanceService,
    private timerService: TimerService,
    private topSpeedService: TopSpeedService,
    private toastComponent: ToastComponent
  ) {}

  public onSelect(ev: { checked: boolean; value: string }) {
    this.clearableKeys.find((val) => val.name === ev.value)!.isChecked = ev.checked;
  }

  public isHaveChecked() {
    return this.clearableKeys.filter((val) => val.isChecked).length > 0;
  }

  public async onConfirm() {
    const promises = [];

    for (const val of this.clearableKeys) {
      if (val.isChecked) {
        switch (val.name) {
          case 'averageSpeed':
            promises.push(this.distanceService.removeAvgSpeedTotalDistance());
            promises.push(this.timerService.resetAvgSpeedTotalTime());
            break;

          case AppConstant.storageKeys.topSpeed:
            promises.push(this.topSpeedService.clearTopSpeed());
            break;

          case AppConstant.storageKeys.totalTime:
            promises.push(this.timerService.resetTripTime());
            break;

          case AppConstant.storageKeys.tripDistance:
            promises.push(this.distanceService.removeTripDistance());
            break;
        }
      }
    }

    await Promise.all(promises);

    this.toastComponent.presentToast({ color: AppConstant.color.success, msg: 'dataCleared' });
    this.buttonEmit.emit();
  }
}
