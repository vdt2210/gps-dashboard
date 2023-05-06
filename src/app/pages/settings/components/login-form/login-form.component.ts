import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from 'src/app/core/services/auth/auth.service';
import AppConstant from 'src/app/utilities/app-constant';

const ICONS = {
  eye: 'eye',
  eyeOff: 'eye-off',
};

@Component({
  selector: 'app-login-form',
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;

  public loginForm: FormGroup;
  public isShowPassword = false;
  public passwordIcon = ICONS.eyeOff;

  constructor(private formBuilder: FormBuilder, private authService: authService) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      // Handle form submission
      console.log(this.loginForm.value);
      this.authService.login(this.loginForm.value).then((user) => {
        if (user) {
          this.buttonClick('account');
        }
      });
    }
  }

  hideShowPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.passwordIcon = this.isShowPassword ? ICONS.eye : ICONS.eyeOff;
  }

  buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }
}
