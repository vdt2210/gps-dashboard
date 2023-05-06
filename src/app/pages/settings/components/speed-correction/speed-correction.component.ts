import { Component, EventEmitter, Output } from '@angular/core';
import { GeolocationService } from 'src/app/core/services/geolocation/geolocation.service';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-speed-correction',
  templateUrl: './speed-correction.component.html',
  styleUrls: ['./speed-correction.component.scss'],
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
