import { Component, EventEmitter, Input, Output } from '@angular/core';

export type TButtonCardOption = {
  action: string;
  icon: string;
  label: string;
  subText?: string | number;
  isDisabled?: boolean;
};

@Component({
  selector: 'app-button-card',
  styleUrls: ['./button-card.component.scss'],
  templateUrl: './button-card.component.html',
})
export class ButtonCardComponent {
  @Input() buttonOption: TButtonCardOption = {
    action: '',
    icon: '',
    isDisabled: false,
    label: '',
    subText: '',
  };

  @Output() clickEmit = new EventEmitter();

  public onClick(action: string) {
    this.clickEmit.emit(action);
  }
}
