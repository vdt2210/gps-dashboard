import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Item {
  id?: string;
  name: string;
  value?: string;
}

@Component({
  selector: 'app-radio',
  styleUrls: ['./radio.component.scss'],
  templateUrl: './radio.component.html',
})
export class RadioComponent {
  @Input() selectedValue = '';
  @Input() listItems: Item[] = [];

  @Output() changeEmit = new EventEmitter();

  public onChangeValue(ev: any) {
    this.changeEmit.emit(ev.detail.value);
  }
}
