import { Component, EventEmitter, Input, Output } from '@angular/core';

import { AppConstant } from '@utilities/index';

@Component({
  selector: 'app-speed',
  styleUrls: ['./speed.component.scss'],
  templateUrl: './speed.component.html',
})
export class SpeedComponent {
  @Input() speed?: number | null = null;
  @Input() unit: string = AppConstant.unit.metric.speedUnit;

  @Output() switchUnitEmit = new EventEmitter();

  constructor() {}

  public switchUnit() {
    this.switchUnitEmit.emit();
  }
}
