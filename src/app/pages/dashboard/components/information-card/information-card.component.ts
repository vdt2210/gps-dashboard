import { Component, Input, OnChanges } from "@angular/core";
import { UnitParams } from "src/app/core/models/unit.model";
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
	@Input() avgSpeed: number | string = "-.-";
	@Input() accuracy: number | string = "-";
	@Input() altitude: number | string = "-.-";
	@Input() latitude: number | string = "-.-";
	@Input() longitude: number | string = "-.-";
	@Input() unitData: UnitParams = {
		unit: AppConstant.unitSystem.metric.unit,
		speedUnit: AppConstant.unitSystem.metric.speedUnit,
		distanceUnit: AppConstant.unitSystem.metric.distanceUnit,
		lengthUnit: AppConstant.unitSystem.metric.lengthUnit,
	};

	public dataList: data[] = [];

	ngOnChanges(): void {
		this.dataList = [
			{
				label: "topSpeed",
				value: this.topSpeed,
				unit: this.unitData.speedUnit,
			},
			{
				label: "averageSpeed",
				value: this.avgSpeed,
				unit: this.unitData.speedUnit,
			},
			{
				label: "accuracy",
				value: this.accuracy,
				unit: this.unitData.lengthUnit,
			},
			{
				label: "altitude",
				value: this.altitude,
				unit: this.unitData.lengthUnit,
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

