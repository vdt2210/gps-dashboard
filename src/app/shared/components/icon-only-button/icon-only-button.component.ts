import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-only-button',
  templateUrl: './icon-only-button.component.html',
  styleUrls: ['./icon-only-button.component.scss'],
})
export class IconOnlyButtonComponent {
  @Input() icon = '';
  @Output() clickEmit = new EventEmitter();

  onClick() {
    this.clickEmit.emit();
  }
}
