import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Item {
  isChecked: boolean;
  name: string;
}

@Component({
  selector: 'app-checkbox',
  styleUrls: ['./checkbox.component.scss'],
  templateUrl: './checkbox.component.html',
})
export class CheckboxComponent {
  @Input() listItems: Item[] = [];

  @Output() selectEmit = new EventEmitter();

  public onSelect(ev: any) {
    this.selectEmit.emit(ev.detail);
  }
}
