import { Component, EventEmitter, Input, Output } from '@angular/core';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-button',
  styleUrls: ['./button.component.scss'],
  templateUrl: './button.component.html',
})
export class ButtonComponent {
  @Input() expand = '';
  @Input() buttonType = AppConstant.buttonType.button;
  @Input() fill = AppConstant.fill.solid;
  @Input() color = AppConstant.color.primary;
  @Input() isDisabled = false;
  @Input() buttonLabel = '';
  @Output() clickEmit = new EventEmitter();

  onClick() {
    this.clickEmit.emit();
  }
}
