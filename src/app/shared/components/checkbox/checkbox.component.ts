import { Component, EventEmitter, Input, Output } from '@angular/core';

interface Item {
  isChecked: boolean;
  name: string;
}

@Component({
  selector: 'app-checkbox',
  templateUrl: './checkbox.component.html',
  styleUrls: ['./checkbox.component.scss'],
})
export class CheckboxComponent {
  @Input() listItems: Item[] = [];

  @Output() selectEmit = new EventEmitter();

  public onSelect(ev: any) {
    this.selectEmit.emit(ev.detail);
  }
}
