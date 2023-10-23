import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { SyncDataService, authService } from '@services/index';

import { AppConstant } from '@utilities/index';

const ICONS = {
  eye: 'eye',
  eyeOff: 'eye-off',
};

@Component({
  selector: 'app-login-form',
  styleUrls: ['./login-form.component.scss'],
  templateUrl: './login-form.component.html',
})
export class LoginFormComponent implements OnInit {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;

  public loginForm: FormGroup;
  public isShowPassword = false;
  public passwordIcon = ICONS.eyeOff;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private syncDataService: SyncDataService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  public async ngOnInit(): Promise<void> {
    if (await this.authService.currentToken) {
      this.buttonClick('account');
      return;
    }
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).then((uid) => {
        if (uid) {
          this.syncDataService.getUserData();
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
