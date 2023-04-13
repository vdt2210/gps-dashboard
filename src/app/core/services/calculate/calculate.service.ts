import { EventEmitter, Injectable, Output } from "@angular/core";
import { GeolocationService } from "../../services/geolocation/geolocation.service";
import AppUtil from "src/app/utilities/app-util";
import { BehaviorSubject } from "rxjs";
import AppConstant from "src/app/utilities/app-constant";
import { CalculatedData } from "../../models/calculate.model";
import { TimerService } from "../timer/timer.service";
import { TopSpeedService } from "../top-speed/top-speed.service";
import { Geolocation } from "../../models/geolocation.model";
import { DistanceService } from "../distance/distance.service";
import { DistanceParams } from "../../models/distance.model";
// import { UnitService } from '../unit/unit.service';

interface speedTime {
	speed: number;
	time: number;
}

const VALUE: speedTime[] = [];

@Injectable({
	providedIn: "root",
})
export class CalculateService {
	//TODO add model
	calculateData$ = new BehaviorSubject<CalculatedData>({
		speed: 0,
		topSpeed: 0,
		accuracy: 0,
		altitude: "-.-",
		odo: 0,
		trip: "-.-",
		avgSpeed: "-.-",
	});

	public speed!: number | string;
	public topSpeed!: number | string;
	public accuracy!: number | string;
	public odo!: number | string;
	public speedCorrection!: number;
	private rawSpeed!: number | null;
	private rawTopSpeed!: number | null;
	private rawAccuracy!: number | null;
	private rawAltitude!: number | null;
	private avgSpeedTotalTime!: number;

	public trip!: number | string;
	public altitude!: number | string;
	public avgSpeed!: number | string;

	private value = [...VALUE];

	private distanceObj: DistanceParams = {
		odo: 0,
		trip: 0,
		avgSpeedTotalDistance: 0,
	};

	constructor(
		// private unitService: UnitService,
		private topSpeedService: TopSpeedService,
		private distanceService: DistanceService,
		private timerService: TimerService,
		private geolocationService: GeolocationService
	) {}

	public getCalculateData() {
		return this.calculateData$;
	}

	public initialCalculate() {
		this.geolocationService.getLocation().subscribe((value: Geolocation) => {
			this.rawSpeed = value.speed;
			this.rawAccuracy = value.accuracy;
			this.rawAltitude = value.altitude;

			if (value.speed && value.time) {
				this.value = [
					...this.value,
					{
						// speed: this.correctedSpeed,
						speed: value.speed,
						time: value.time,
					},
				];

				let trip = 0;
				for (const val of this.value) {
					trip = val.speed * val.time;
				}

				// this.distanceService.saveOdo(trip);
				// this.distanceService.saveTrip(trip);
				// this.distanceService.saveAverageSpeedTrip(trip);
				this.distanceService.setAvgSpeedTotalDistance(trip);
			}

			this.convert();
		});

		this.topSpeedService.getTopSpeed().subscribe((value: number | null) => {
			this.rawTopSpeed = value;
			this.convert();
		});

		this.distanceService.getDistance().subscribe((value: DistanceParams) => {
			this.distanceObj = value;
			this.convert();
		});

		this.timerService.getAvgSpeedTotalTime().subscribe((value: number) => {
			this.avgSpeedTotalTime = value;
			this.convert();
		});
	}

	public convert() {
		// switch (this.unitService.unit) {
		switch (AppConstant.unitSystem.metric.label) {
			case AppConstant.unitSystem.imperial.label:
				this.imperialUnit();
				break;

			case AppConstant.unitSystem.metric.label:
			default:
				this.metricUnit();
				break;
		}
	}

	// * subscribe unit change
	public changeUnit() {
		// this.unitService.unitSystem.subscribe(() => {
		// 	switch (this.unitService.unit) {
		// 		case "imperial":
		// 			{
		// 				this.imperialUnit();
		// 			}
		// 			break;
		// 		case "metric":
		// 		default:
		// 			this.metricUnit();
		// 			break;
		// 	}
		// });
	}

	// * calculate in metric unit
	private metricUnit() {
		if (this.rawSpeed != null) {
			this.speed = Math.round(this.rawSpeed * 3.6);
		} else {
			this.speed = "-";
		}

		if (this.rawTopSpeed != null) {
			this.topSpeed = Math.round(this.rawTopSpeed * 3.6);
		} else {
			this.topSpeed = "-";
		}

		if (this.rawAccuracy != null) {
			this.accuracy = Math.round(this.rawAccuracy);
		} else {
			this.accuracy = "-";
		}

		if (this.rawAltitude != null) {
			this.altitude = AppUtil.toFixedNoRounding(this.rawAltitude, 1);
		} else {
			this.altitude = "-.-";
		}

		if (this.distanceObj.odo >= 0) {
			this.odo = Math.trunc(this.distanceObj.odo / 1000);
		} else {
			this.odo = "-.-";
		}

		if (this.distanceObj.trip >= 0) {
			this.trip = AppUtil.toFixedNoRounding(this.distanceObj.trip / 1000, 1);
		} else {
			this.trip = "-.-";
		}

		if (
			this.distanceObj.avgSpeedTotalDistance >= 0 &&
			this.avgSpeedTotalTime > 0
		) {
			this.avgSpeed = AppUtil.toFixedNoRounding(
				(this.distanceObj.avgSpeedTotalDistance / this.avgSpeedTotalTime) * 3.6,
				1
			);
		} else {
			this.avgSpeed = "-.-";
		}

		this.calculateData$.next({
			speed: this.speed,
			topSpeed: this.topSpeed,
			accuracy: this.accuracy,
			altitude: this.altitude,
			odo: this.odo,
			trip: this.trip,
			avgSpeed: this.avgSpeed,
		});
	}

	// * calculate in imperial unit
	private imperialUnit() {
		if (this.rawSpeed != null) {
			this.speed = Math.round(this.rawSpeed * 2.23693629);
		} else {
			this.speed = "-";
		}

		if (this.rawTopSpeed != null) {
			this.topSpeed = Math.round(this.rawTopSpeed * 2.23693629);
		} else {
			this.topSpeed = "-";
		}

		if (this.rawAccuracy != null) {
			this.accuracy = Math.round(this.rawAccuracy * 3.2808399);
		} else {
			this.accuracy = "-";
		}

		if (this.rawAltitude != null) {
			this.altitude = AppUtil.toFixedNoRounding(
				this.rawAltitude * 3.2808399,
				1
			);
		} else {
			this.altitude = "-.-";
		}

		if (this.distanceObj.odo >= 0) {
			this.odo = Math.trunc(this.distanceObj.odo * 0.000621371192);
		} else {
			this.odo = "-.-";
		}

		if (this.distanceObj.trip >= 0) {
			this.trip = AppUtil.toFixedNoRounding(
				this.distanceObj.trip * 0.000621371192,
				1
			);
		} else {
			this.trip = "-.-";
		}

		if (
			this.distanceObj.avgSpeedTotalDistance >= 0 &&
			this.avgSpeedTotalTime > 0
		) {
			this.avgSpeed = AppUtil.toFixedNoRounding(
				(this.distanceObj.avgSpeedTotalDistance / this.avgSpeedTotalTime) *
					2.23693629,
				1
			);
		} else {
			this.avgSpeed = "-.-";
		}

		this.calculateData$.next({
			speed: this.speed,
			topSpeed: this.topSpeed,
			accuracy: this.accuracy,
			altitude: this.altitude,
			odo: this.odo,
			trip: this.trip,
			avgSpeed: this.avgSpeed,
		});
	}
}
