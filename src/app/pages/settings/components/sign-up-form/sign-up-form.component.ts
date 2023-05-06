import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AppConstant from 'src/app/utilities/app-constant';

const ICONS = {
  eyeOff: 'eye-off',
  eye: 'eye',
};

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss'],
})
export class SignUpFormComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;

  public signUpForm: FormGroup;
  public isShowPassword = false;
  public passwordIcon = ICONS.eyeOff;

  constructor(private formBuilder: FormBuilder) {
    this.signUpForm = this.formBuilder.group({
      avatarUrl: [''],
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      // Handle form submission
      console.log(this.signUpForm.value);
    }
  }

  hideShowPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.passwordIcon = this.isShowPassword ? ICONS.eye : ICONS.eyeOff;
  }

  buttonClick(action: string) {
    this.buttonEmit.emit(action);
  }
}
