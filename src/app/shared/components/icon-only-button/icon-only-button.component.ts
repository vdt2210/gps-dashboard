import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-icon-only-button',
  styleUrls: ['./icon-only-button.component.scss'],
  templateUrl: './icon-only-button.component.html',
})
export class IconOnlyButtonComponent {
  @Input() icon = '';
  @Output() clickEmit = new EventEmitter();

  onClick() {
    this.clickEmit.emit();
  }
}
