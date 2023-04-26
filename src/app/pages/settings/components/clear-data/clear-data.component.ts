import { Component, EventEmitter, Output } from "@angular/core";
import AppConstant from "src/app/utilities/app-constant";
import { DistanceService } from "src/app/core/services/distance/distance.service";
import { TimerService } from "src/app/core/services/timer/timer.service";
import { TopSpeedService } from "src/app/core/services/top-speed/top-speed.service";

@Component({
	selector: "app-clear-data",
	templateUrl: "./clear-data.component.html",
	styleUrls: ["./clear-data.component.scss"],
})
export class ClearDataComponent {
	@Output() buttonEmit = new EventEmitter();

	public appConstant = AppConstant;
	public clearableKeys = [
		{ name: "averageSpeed", isChecked: false },
		{ name: AppConstant.storageKeys.topSpeed, isChecked: false },
		{ name: AppConstant.storageKeys.totalTime, isChecked: false },
		{ name: AppConstant.storageKeys.tripDistance, isChecked: false },
	];

	constructor(
		private distanceService: DistanceService,
		private timerService: TimerService,
		private topSpeedService: TopSpeedService
	) {}

	public onSelect(ev: { value: string; checked: boolean }) {
		this.clearableKeys.find((val) => val.name === ev.value)!.isChecked =
			ev.checked;
	}

	public isHaveChecked() {
		return this.clearableKeys.filter((val) => val.isChecked).length > 0;
	}

	public onConfirm() {
		this.clearableKeys.forEach((val) => {
			if (val.isChecked) {
				switch (val.name) {
					case "averageSpeed":
						this.distanceService.removeAvgSpeedTotalDistance();
						this.timerService.resetAvgSpeedTotalTime();
						break;

					case AppConstant.storageKeys.topSpeed:
						this.topSpeedService.clearTopSpeed();
						break;

					case AppConstant.storageKeys.totalTime:
						this.timerService.resetTotalTime();
						break;

					case AppConstant.storageKeys.tripDistance:
						this.distanceService.removeTripDistance();
						break;
				}
			}
		});

		this.buttonEmit.emit();
	}
}

