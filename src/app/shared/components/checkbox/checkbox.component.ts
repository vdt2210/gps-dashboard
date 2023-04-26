import { Component, EventEmitter, Input, Output } from "@angular/core";

interface Item {
	name: string;
	isChecked: boolean;
}

@Component({
	selector: "app-checkbox",
	templateUrl: "./checkbox.component.html",
	styleUrls: ["./checkbox.component.scss"],
})
export class CheckboxComponent {
	@Input() listItems: Item[] = [];

	@Output() selectEmit = new EventEmitter();

	constructor() {}

	public onSelect(ev: any) {
		this.selectEmit.emit(ev.detail);
	}
}

