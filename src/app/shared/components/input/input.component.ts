import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import AppConstant from 'src/app/utilities/app-constant';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
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
