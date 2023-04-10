import { Component, Input, OnChanges } from "@angular/core";
import AppConstant from "src/app/utilities/app-constant";

interface data {
	label: string;
	value: number | string;
	unit?: string;
}

@Component({
	selector: "app-information-card",
	templateUrl: "./information-card.component.html",
	styleUrls: ["./information-card.component.scss"],
})
export class InformationCardComponent implements OnChanges {
	@Input() topSpeed: number | string = "-.-";
	@Input() averageSpeed: string = "-.-";
	@Input() accuracy: number | string = "-";
	@Input() altitude: string = "-.-";
	@Input() latitude: string = "-.-";
	@Input() longitude: string = "-.-";

	public dataList: data[] = [];

	ngOnChanges(): void {
		this.dataList = [
			{
				label: "topSpeed",
				value: this.topSpeed,
				unit: AppConstant.unitSystem.metric.speedUnit,
			},
			{
				label: "averageSpeed",
				value: this.averageSpeed,
				unit: AppConstant.unitSystem.metric.speedUnit,
			},
			{
				label: "accuracy",
				value: this.accuracy,
				unit: AppConstant.unitSystem.metric.meterUnit,
			},
			{
				label: "altitude",
				value: this.altitude,
				unit: AppConstant.unitSystem.metric.meterUnit,
			},
			{
				label: "latitude",
				value: this.latitude,
			},
			{
				label: "longitude",
				value: this.longitude,
			},
		];
	}
}

