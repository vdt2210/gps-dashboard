import { Injectable, NgZone } from "@angular/core";
import { registerPlugin } from "@capacitor/core";
import { BackgroundGeolocationPlugin } from "@capacitor-community/background-geolocation";
import { BehaviorSubject } from "rxjs";
import { Geolocation } from "../../models/geolocation.model";
import AppConstant from "src/app/utilities/app-constant";
const BackgroundGeolocation = registerPlugin<BackgroundGeolocationPlugin>(
	"BackgroundGeolocation"
);

@Injectable({
	providedIn: "root",
})
export class GeolocationService {
	private watcherId: string = "";
	private speedCorrection$ = new BehaviorSubject<number>(0);
	private location$ = new BehaviorSubject<Geolocation>({
		latitude: "-.-",
		longitude: "-.-",
		accuracy: null,
		altitude: null,
		altitudeAccuracy: null,
		simulated: false,
		speed: null,
		bearing: null,
		time: null,
		gpsStatus: "",
	});
	private options = {
		backgroundMessage: "Cancel to prevent battery drain.",
		backgroundTitle: "Tracking You.",
		requestPermissions: true,
		stale: false,
		distanceFilter: 0,
	};

	constructor(private zone: NgZone) {}

	public startBackgroundGeolocation() {
		if (this.watcherId) {
			return;
		}

		BackgroundGeolocation.addWatcher(
			this.options,
			this.handleWatcher.bind(this)
		).then((watcherId) => (this.watcherId = watcherId));
	}

	public getLocation() {
		return this.location$;
	}

	public stopBackgroundGeolocation() {
		if (this.watcherId) {
			BackgroundGeolocation.removeWatcher({
				id: this.watcherId,
			});
			this.watcherId = "";
		}
	}

	private handleWatcher(location: any, error: any) {
		if (error) {
			if (error.code === "NOT_AUTHORIZED") {
				const message =
					"This app needs your location, " +
					"but does not have permission.\n\n" +
					"Open settings now?";
				if (window.confirm(message)) {
					BackgroundGeolocation.openSettings();
				}
			}
			return error;
		}

		this.zone.run(() => {
			location.speed =
				location.speed &&
				location.speed +
					(location.speed / 100) *
						parseInt(
							localStorage.getItem(AppConstant.storageKeys.speedCorrection)!
						);

			location.gpsStatus = this.getGpsStatus(location.accuracy);
			this.location$.next(location);
		});

		return location;
	}

	getGpsStatus(accuracy: number) {
		return accuracy
			? accuracy <= 6
				? "success"
				: accuracy <= 25
				? "warning"
				: "danger"
			: "";
	}

	public setInitialSpeedCorrection() {
		this.setSpeedCorrection(
			localStorage.getItem(AppConstant.storageKeys.speedCorrection) || "5"
		);
	}

	public getSpeedCorrection() {
		return this.speedCorrection$;
	}

	public async setSpeedCorrection(value: string) {
		this.speedCorrection$.next(parseInt(value));
		localStorage.setItem(AppConstant.storageKeys.speedCorrection, value);
	}
}

