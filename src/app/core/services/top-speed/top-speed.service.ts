import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import AppConstant from "src/app/utilities/app-constant";
import { StorageService } from "../storage/storage.service";

@Injectable({
	providedIn: "root",
})
export class TopSpeedService {
	private topSpeed$: BehaviorSubject<number>;

	constructor(private storageService: StorageService) {
		this.topSpeed$ = new BehaviorSubject<number>(0);
		this.setInitialTopSpeed();
	}

	private async setInitialTopSpeed(): Promise<void> {
		await this.storageService
			.get(AppConstant.storageKeys.topSpeed)
			.then((val) => {
				this.topSpeed$.next(val);
			})
			.catch(() => {});
	}

	public getTopSpeed() {
		return this.topSpeed$;
	}

	public async setTopSpeed(speed: number): Promise<void> {
		if (speed == null) return;

		const currentTopSpeed = await this.storageService.get(
			AppConstant.storageKeys.topSpeed
		);

		if (speed <= currentTopSpeed) {
			return;
		}

		await this.storageService.set(AppConstant.storageKeys.topSpeed, speed);
		this.topSpeed$.next(speed);
	}

	public async clearTopSpeed(): Promise<void> {
		await this.storageService
			.remove(AppConstant.storageKeys.topSpeed)
			.then(() => this.topSpeed$.next(0));
	}
}
