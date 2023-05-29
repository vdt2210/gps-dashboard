import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { authService } from 'src/app/core/services/auth/auth.service';
import AppConstant from 'src/app/utilities/app-constant';

const ICONS = {
  eye: 'eye',
  eyeOff: 'eye-off',
};

@Component({
  selector: 'app-sign-up-form',
  styleUrls: ['./sign-up-form.component.scss'],
  templateUrl: './sign-up-form.component.html',
})
export class SignUpFormComponent implements OnInit {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;

  public signUpForm: FormGroup;
  public isShowPassword = false;
  public passwordIcon = ICONS.eyeOff;

  constructor(private formBuilder: FormBuilder, private authService: authService) {
    this.signUpForm = this.formBuilder.group({
      photoURL: [''],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      displayName: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public async ngOnInit(): Promise<void> {
    if (await this.authService.currentToken) {
      this.buttonClick('account');
      return;
    }
  }

  onSubmit() {
    if (this.signUpForm.valid) {
      this.authService.signUp(this.signUpForm.value).then((token: string | undefined) => {
        if (token) {
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
