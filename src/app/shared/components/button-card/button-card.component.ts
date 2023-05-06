import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button-card',
  styleUrls: ['./button-card.component.scss'],
  templateUrl: './button-card.component.html',
})
export class ButtonCardComponent {
  @Input() icon = '';
  @Input() cardLabel = '';
  @Input() value?: string | number;
  @Input() action = '';

  @Output() clickEmit = new EventEmitter();

  public onClick() {
    this.clickEmit.emit();
  }
}
