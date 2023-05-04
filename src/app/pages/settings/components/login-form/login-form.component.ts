import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AppConstant from 'src/app/utilities/app-constant';

const ICONS = {
	eyeOff: 'eye-off',
	eye: 'eye',
};

@Component({
	selector: 'app-login-form',
	templateUrl: './login-form.component.html',
	styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
	@Output() buttonEmit = new EventEmitter();

	public appConstant = AppConstant;

	public loginForm: FormGroup;
	public isShowPassword = false;
	public passwordIcon = ICONS.eyeOff;

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ['', Validators.required],
			password: ['', Validators.required],
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			// Handle form submission
			console.log(this.loginForm.value);
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
