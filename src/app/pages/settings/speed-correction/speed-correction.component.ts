import { Component, EventEmitter, Output } from '@angular/core';

import { GeolocationService } from '@services/index';

import { AppConstant } from '@utilities/index';

@Component({
  selector: 'app-speed-correction',
  styleUrls: ['./speed-correction.component.scss'],
  templateUrl: './speed-correction.component.html',
})
export class SpeedCorrectionComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;
  public selectedSpeedCorrection: number = this.geolocationService.getSpeedCorrection().getValue();

  constructor(private geolocationService: GeolocationService) {}

  onChangeSpeedCorrection(speedCorrection: number) {
    this.selectedSpeedCorrection = speedCorrection;
  }

  public onConfirm() {
    this.geolocationService.setSpeedCorrection(this.selectedSpeedCorrection);
    this.buttonEmit.emit();
  }
}
