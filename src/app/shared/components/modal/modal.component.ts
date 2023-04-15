import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import AppConstant from "src/app/utilities/app-constant";

@Component({
	selector: "app-modal",
	templateUrl: "./modal.component.html",
	styleUrls: ["./modal.component.scss"],
})
export class ModalComponent {
	@Input() isModalOpen: boolean = false;
	@Output() closeEmit = new EventEmitter();

	public appConstant = AppConstant;

	loginForm: FormGroup;
	isShowPassword = false;
	passwordType: string = "password";
	passwordIcon: string = "eye-off";

	constructor(private formBuilder: FormBuilder) {
		this.loginForm = this.formBuilder.group({
			email: ["", Validators.required],
			password: ["", Validators.required],
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
		this.passwordIcon = this.isShowPassword ? "eye" : "eye-off";
	}

	onCloseModal() {
		this.closeEmit.emit();
	}
}

