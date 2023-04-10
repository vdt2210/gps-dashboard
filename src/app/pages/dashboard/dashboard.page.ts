import { Component, OnDestroy, OnInit } from "@angular/core";
import { KeepAwake } from "@capacitor-community/keep-awake";
import { CalculateService } from "src/app/core/calculate/calculate.service";
import { CalculatedData } from "src/app/core/models/calculate.model";
import { GeolocationDashboard } from "src/app/core/models/geolocation.model";

import { GeolocationService } from "src/app/core/services/geolocation/geolocation.service";
import { AppRoutes } from "src/app/utilities/app-routes";

@Component({
	selector: "app-dashboard",
	templateUrl: "dashboard.page.html",
	styleUrls: ["dashboard.page.scss"],
})
export class DashboardPage implements OnInit, OnDestroy {
	public appRoutes = AppRoutes;

	public totalTime = "00:00:00";
	public location: GeolocationDashboard = {
		latitude: "-.-",
		longitude: "-.-",
		gpsStatus: "",
	};

	public calculatedData: CalculatedData = {
		speed: "-",
		topSpeed: "-",
		accuracy: "-",
		altitude: "-.-",
		odo: "-",
		trip: "-.-",
		averageSpeed: "-.-",
	};

	constructor(
		private geolocationService: GeolocationService,
		private calculateService: CalculateService
	) {}

	public async ngOnInit() {
		const { isSupported } = await KeepAwake.isSupported();
		if (isSupported) {
			await KeepAwake.keepAwake();
		}

		this.geolocationService.getLocation().subscribe((res) => {
			this.location = res;
			this.updateGpsStatusIcon(res.gpsStatus);
		});

		this.calculateService.getCalculateData().subscribe((data) => {
			this.calculatedData = data;
		});
	}

	public async ngOnDestroy() {
		await KeepAwake.allowSleep();
	}

	private updateGpsStatusIcon(status: string) {
		const gpsStatus = document.getElementById("gpsStatus");

		switch (status) {
			case "success":
				gpsStatus?.classList.remove("error-blink");
				gpsStatus?.classList.remove("standby-blink");
				break;

			case "warning":
				gpsStatus?.classList.remove("error-blink");
				gpsStatus?.classList.remove("standby-blink");
				break;

			case "danger":
				gpsStatus?.classList.remove("standby-blink");
				gpsStatus?.classList.add("error-blink");
				break;

			default:
				gpsStatus?.classList.remove("error-blink");
				gpsStatus?.classList.add("standby-blink");
				break;
		}
	}
}

