import { Component, EventEmitter, Input, Output } from "@angular/core";

interface Item {
	name: string;
	value: string;
}

@Component({
	selector: "app-radio",
	templateUrl: "./radio.component.html",
	styleUrls: ["./radio.component.scss"],
})
export class RadioComponent {
	@Input() selectedValue = "";
	@Input() isObjectList = false;
	@Input() listItems: Item[] = [];

	@Output() changeEmit = new EventEmitter();

	onChangeValue(ev: any) {
		this.changeEmit.emit(ev.detail.value);
	}
}

