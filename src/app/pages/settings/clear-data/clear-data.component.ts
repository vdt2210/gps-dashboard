import { Component, EventEmitter, Output } from '@angular/core';

import { DistanceService, TopSpeedService, TimerService } from '@services/index';

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
    private topSpeedService: TopSpeedService
  ) {}

  public onSelect(ev: { checked: boolean; value: string }) {
    this.clearableKeys.find((val) => val.name === ev.value)!.isChecked = ev.checked;
  }

  public isHaveChecked() {
    return this.clearableKeys.filter((val) => val.isChecked).length > 0;
  }

  public onConfirm() {
    this.clearableKeys.forEach((val) => {
      if (val.isChecked) {
        switch (val.name) {
          case 'averageSpeed':
            this.distanceService.removeAvgSpeedTotalDistance();
            this.timerService.resetAvgSpeedTotalTime();
            break;

          case AppConstant.storageKeys.topSpeed:
            this.topSpeedService.clearTopSpeed();
            break;

          case AppConstant.storageKeys.totalTime:
            this.timerService.resetTotalTime();
            break;

          case AppConstant.storageKeys.tripDistance:
            this.distanceService.removeTripDistance();
            break;
        }
      }
    });

    this.buttonEmit.emit();
  }
}
