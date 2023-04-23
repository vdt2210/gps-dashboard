import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "app-range",
	templateUrl: "./range.component.html",
	styleUrls: ["./range.component.scss"],
})
export class RangeComponent {
	@Input() minValue: number = 0;
	@Input() maxValue: number = 10;
	@Input() currentValue: number = 0;
	@Input() isHaveTicks: boolean = true;
	@Input() isHavePin: boolean = true;
	@Input() startLabel?: string;
	@Input() endLabel?: string;
	@Input() startIcon?: string;
	@Input() endIcon?: string;

	@Output() changeEmit = new EventEmitter();

	public onChangeValue(ev: any) {
		this.changeEmit.emit(ev.detail.value);
	}
}

