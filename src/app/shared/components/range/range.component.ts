import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-range',
  templateUrl: './range.component.html',
  styleUrls: ['./range.component.scss'],
})
export class RangeComponent {
  @Input() minValue = 0;
  @Input() maxValue = 10;
  @Input() currentValue = 0;
  @Input() isHaveTicks = true;
  @Input() isHavePin = true;
  @Input() startLabel?: string;
  @Input() endLabel?: string;
  @Input() startIcon?: string;
  @Input() endIcon?: string;

  @Output() changeEmit = new EventEmitter();

  public onChangeValue(ev: any) {
    this.changeEmit.emit(ev.detail.value);
  }
}
