import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, Observer } from "rxjs";
import AppConstant from "src/app/utilities/app-constant";
import { DistanceParams } from "../../models/distance.model";
import { StorageService } from "../storage/storage.service";

@Injectable({
	providedIn: "root",
})
export class DistanceService {
	// public odo: number;
	// public trip: number;
	// public avgSpeedTotalDistance: number;
	public params = {
		odo: null,
		trip: null,
		avgSpeedTotalDistance: null,
	};

	private distanceParams$: BehaviorSubject<DistanceParams>;

	private storageObserver: any;
	public storageObservable: any;

	constructor(private storageService: StorageService) {
		this.storageObservable = new Observable((observer: Observer<object>) => {
			this.storageObserver = observer;
		});

		this.distanceParams$ = new BehaviorSubject<DistanceParams>({
			odo: 0,
			trip: 0,
			avgSpeedTotalDistance: 0,
		});
	}

	public getOdoTrip() {
		// this.getOdo();
		// this.getTrip();
	}

	// public async saveOdo(newOdo: number) {
	// 	if (!isNaN(newOdo) && !isNaN(this.odo)) {
	// 		this.odo = this.odo + newOdo;
	// 		this.params = { ...this.params, odo: this.odo };
	// 		await this.storageService.set(ODO_KEY, this.odo);
	// 		this.storageObserver.next(this.params);
	// 	}
	// }

	// public async saveTrip(newTrip: number) {
	// 	if (!isNaN(newTrip) && !isNaN(this.trip)) {
	// 		this.trip = this.trip + newTrip;
	// 		this.params = { ...this.params, trip: this.trip };
	// 		await this.storageService.set(TRIP_KEY, this.trip);
	// 		this.storageObserver.next(this.params);
	// 	}
	// }

	public async setInitialDistance() {
		await this.storageService
			.get(AppConstant.storageKeys.avgSpeedTotalDistance)
			.then((val) => {
				if (val) {
					this.distanceParams$.next({
						...this.distanceParams$.getValue(),
						avgSpeedTotalDistance: val,
					});
				} else {
					this.setAvgSpeedTotalDistance(0);
				}
			})
			.catch(() => {});
	}

	public getDistance() {
		return this.distanceParams$;
	}

	public async setAvgSpeedTotalDistance(distance: number) {
		const currentAvgSpeedTotalDistance = await this.storageService.get(
			AppConstant.storageKeys.avgSpeedTotalDistance
		);

		const newAvgSpeedTotalDistance = currentAvgSpeedTotalDistance + distance;

		await this.storageService
			.set(
				AppConstant.storageKeys.avgSpeedTotalDistance,
				newAvgSpeedTotalDistance
			)
			.then(() =>
				this.distanceParams$.next({
					...this.distanceParams$.getValue(),
					avgSpeedTotalDistance: newAvgSpeedTotalDistance,
				})
			);
	}

	// public async clearTrip() {
	// 	await this.storageService.remove(TRIP_KEY).then(() => this.getTrip());
	// }

	// public async clearAverageSpeedTrip() {
	// 	await this.storageService
	// 		.remove(AVERAGE_SPEED_TRIP)
	// 		.then(() => this.getAverageSpeedTrip());
	// }

	// private async getOdo() {
	// 	await this.storage
	// 		.get(AppConstant.storageKeys.odo)
	// 		.then((val) => {
	// 			this.odo = val;
	// 			this.params = { ...this.params, odo: val };
	// 			this.storageObserver.next(this.params);
	// 		})
	// 		.catch(() => {});
	// }

	// private async getTrip() {
	// 	await this.storage
	// 		.get(AppConstant.storageKeys.trip)
	// 		.then((val) => {
	// 			this.trip = val;
	// 			this.params = { ...this.params, trip: val };
	// 			this.storageObserver.next(this.params);
	// 		})
	// 		.catch(() => {});
	// }

	// private async getAverageSpeedTrip() {
	// 	await this.storageService
	// 		.get(AppConstant.storageKeys.avgSpeedTotalDistance)
	// 		.then((val) => {
	// 			this.avgSpeedTotalDistance = val;
	// 			this.params = { ...this.params, avgSpeedTotalDistance: val };
	// 			this.storageObserver.next(this.params);
	// 		})
	// 		.catch(() => {});
	// }
}
