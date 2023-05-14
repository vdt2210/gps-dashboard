import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountService } from 'src/app/core/services/account/account.service';
import { authService } from 'src/app/core/services/auth/auth.service';
import AppConstant from 'src/app/utilities/app-constant';

const ICONS = {
  eye: 'eye',
  eyeOff: 'eye-off',
};

@Component({
  selector: 'app-account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;

  public detailForm: FormGroup;
  public changePasswordForm: FormGroup;
  public isReadonly = true;

  public isShowPassword = false;
  public passwordIcon = ICONS.eyeOff;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private accountService: AccountService
  ) {
    this.detailForm = this.formBuilder.group({
      avatarUrl: [''],
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', Validators.required],
    });

    this.changePasswordForm = this.formBuilder.group({
      confirmNewPassword: ['', Validators.required],
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  public async ngOnInit(): Promise<void> {
    if (!(await this.authService.currentToken)) {
      this.buttonClick('login');
      return;
    }

    this.onPatchValue();
  }

  private onPatchValue() {
    this.accountService.userDetail.subscribe((detail) => {
      if (detail) {
        this.detailForm.patchValue({
          avatarUrl: detail.photoURL,
          email: detail.email,
          fullName: detail.displayName,
        });
      }
    });
  }

  public onLogOut() {
    this.authService.logOut().then(() => this.buttonClick('login'));
  }

  public buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }

  public hideShowPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.passwordIcon = this.isShowPassword ? ICONS.eye : ICONS.eyeOff;
  }

  public onSubmit() {
    if (this.detailForm.valid) {
      //TODO update detail api
    }
  }
}
