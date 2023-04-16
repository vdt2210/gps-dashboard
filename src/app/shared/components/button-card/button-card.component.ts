import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-button-card",
	templateUrl: "./button-card.component.html",
	styleUrls: ["./button-card.component.scss"],
})
export class ButtonCardComponent {
	@Input() icon = "";
	@Input() cardLabel = "";
	@Input() value?: string | number;
	@Input() action = "";

	@Output() clickEmit = new EventEmitter();

	constructor() {}

	public onClick() {
		this.clickEmit.emit();
	}
}

