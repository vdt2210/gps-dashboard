import { Component, EventEmitter, Input, Output } from '@angular/core';

export type RadioOption = {
  label: string | null;
  value: string | object;
  disabled?: boolean;
};

@Component({
  selector: 'app-radio',
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html',
})
export class RadioComponent {
  @Input() selectedValue = '';
  @Input() listItems: RadioOption[] = [];

  @Output() changeEmit = new EventEmitter<string>();

  public onChangeValue(ev: any) {
    this.changeEmit.emit(ev.detail.value);
  }
}
