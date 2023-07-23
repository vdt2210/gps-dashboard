import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { AccountService } from 'src/app/core/services/account/account.service';
import { authService } from 'src/app/core/services/auth/auth.service';
import APP_CONSTANT from 'src/app/utilities/app-constant';

const ICONS = {
  eye: 'eye',
  eyeOff: 'eye-off',
};

@Component({
  selector: 'app-account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
})
export class AccountComponent implements OnInit, OnDestroy {
  @Output() buttonEmit = new EventEmitter();

  private onDestroy$: Subject<void> = new Subject<void>();

  public appConstant = APP_CONSTANT;

  public detailForm: FormGroup;
  public changePasswordForm: FormGroup;

  public uid = '';

  public isReadonly = true;
  public isShowPassword = false;
  public passwordIcon = ICONS.eyeOff;

  constructor(
    private formBuilder: FormBuilder,
    private authService: authService,
    private accountService: AccountService
  ) {
    this.detailForm = this.formBuilder.group({
      displayName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      photoURL: [''],
    });

    this.changePasswordForm = this.formBuilder.group({
      confirmPassword: ['', Validators.required],
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

  public ngOnDestroy(): void {
    this.onDestroy$.unsubscribe();
  }

  private onPatchValue() {
    this.accountService.userDetail.pipe(takeUntil(this.onDestroy$)).subscribe((detail) => {
      if (detail) {
        this.uid = detail.uid;

        this.detailForm.patchValue({
          displayName: detail.displayName,
          email: detail.email,
          photoURL: detail.photoURL,
        });
      }
    });
  }

  public async onLogOut() {
    await this.authService.logOut();
    this.buttonClick('login');
  }

  public buttonClick(action?: string) {
    this.buttonEmit.emit(action);
  }

  public hideShowPassword() {
    this.isShowPassword = !this.isShowPassword;
    this.passwordIcon = this.isShowPassword ? ICONS.eye : ICONS.eyeOff;
  }

  public onSubmitDetail() {
    this.detailForm.markAllAsTouched();

    if (this.detailForm.invalid) {
      return;
    }

    this.accountService.updateInformation(this.uid, this.detailForm.value);
  }

  public onSubmit() {
    return;
  }
}
