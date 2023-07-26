import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { AppConstant } from '@utilities/index';

@Component({
  selector: 'app-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html',
})
export class InputComponent {
  @Input() formGroup!: FormGroup;
  @Input() inputLabel = '';
  @Input() inputType = AppConstant.inputType.text;
  @Input() controlName = '';
  @Input() inputIcon = '';

  @Output() iconClickEmit = new EventEmitter();

  onIconClick() {
    this.iconClickEmit.emit();
  }
}
