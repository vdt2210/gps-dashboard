import { EventEmitter, Injectable, Output } from "@angular/core";
import { GeolocationService } from "../services/geolocation/geolocation.service";
import AppUtil from "src/app/utilities/app-util";
import { BehaviorSubject } from "rxjs";
import AppConstant from "src/app/utilities/app-constant";
import { CalculatedData } from "../models/calculate.model";
// import { OdoTripService } from '../odo-trip/odo-trip.service';
// import { TimerService } from '../timer/timer.service';
// import { TopSpeedService } from '../top-speed/top-speed.service';
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
		averageSpeed: "-.-",
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
	private averageSpeedTotalTime!: number;

	public trip!: string | string;
	public altitude!: string;
	public averageSpeed!: string | string;

	private value = [...VALUE];

	private distanceObj: any = { odo: null, trip: null, averageTrip: null };

	constructor(
		// private unitService: UnitService,
		// private topSpeedService: TopSpeedService,
		// private odoTripService: OdoTripService,
		// private timerService: TimerService,
		private geolocationService: GeolocationService
	) {}

	public getCalculateData() {
		return this.calculateData$;
	}

	public initialCalculate() {
		// this.geolocationService
		// 	.getSpeedCorrection()
		// 	.subscribe(() => this.convert());
		this.geolocationService.getLocation().subscribe((data) => {
			this.rawSpeed = data.speed;
			this.rawAccuracy = data.accuracy;
			this.rawAltitude = data.altitude;

			//TODO improve this function
			if (data.speed && data.time) {
				this.value = [
					...this.value,
					{
						// speed: this.correctedSpeed,
						speed: data.speed,
						time: data.time,
					},
				];

				let trip = 0;
				for (const val of this.value) {
					trip = val.speed * val.time;
				}

				// this.odoTripService.saveOdo(trip);
				// this.odoTripService.saveTrip(trip);
				// this.odoTripService.saveAverageSpeedTrip(trip);
			}

			// if (this.speedCorrection != null && data.speed != null) {
			// 	this.correctedSpeed =
			// 		data.speed + (data.speed / 100) * this.speedCorrection;
			// }

			this.convert();
		});

		// this.topSpeedService.storageObservable.subscribe((res: number) => {
		// 	this.rawTopSpeed = res;
		// 	this.convert();
		// });

		// this.odoTripService.storageObservable.subscribe(
		// 	(res: { odo: number; trip: number; averageSpeedTrip: number }) => {
		// 		this.distanceObj = res;
		// 		this.convert();
		// 	}
		// );

		// this.timerService.storageObservable.subscribe(
		// 	(res: { averageSpeedTotalTime: number }) => {
		// 		this.averageSpeedTotalTime = res.averageSpeedTotalTime;
		// 		this.convert();
		// 	}
		// );
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
			this.distanceObj.averageSpeedTrip >= 0 &&
			this.averageSpeedTotalTime > 0
		) {
			this.averageSpeed = AppUtil.toFixedNoRounding(
				(this.distanceObj.averageSpeedTrip / this.averageSpeedTotalTime) * 3.6,
				1
			);
		} else {
			this.averageSpeed = "-.-";
		}

		this.calculateData$.next({
			speed: this.speed,
			topSpeed: this.topSpeed,
			accuracy: this.accuracy,
			altitude: this.altitude,
			odo: this.odo,
			trip: this.trip,
			averageSpeed: this.averageSpeed,
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
			this.distanceObj.averageSpeedTrip >= 0 &&
			this.averageSpeedTotalTime > 0
		) {
			this.averageSpeed = AppUtil.toFixedNoRounding(
				(this.distanceObj.averageSpeedTrip / this.averageSpeedTotalTime) *
					2.23693629,
				1
			);
		} else {
			this.averageSpeed = "-.-";
		}

		this.calculateData$.next({
			speed: this.speed,
			topSpeed: this.topSpeed,
			accuracy: this.accuracy,
			altitude: this.altitude,
			odo: this.odo,
			trip: this.trip,
			averageSpeed: this.averageSpeed,
		});
	}
}
