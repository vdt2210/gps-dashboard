import { Component, OnInit } from "@angular/core";
import { CalculateService } from "src/app/core/services/calculate/calculate.service";
import { CalculatedData } from "src/app/core/models/calculate.model";
import { GeolocationDashboard } from "src/app/core/models/geolocation.model";

import { GeolocationService } from "src/app/core/services/geolocation/geolocation.service";
import { AppRoutes } from "src/app/utilities/app-routes";
import { TimerService } from "src/app/core/services/timer/timer.service";

@Component({
	selector: "app-dashboard",
	templateUrl: "dashboard.page.html",
	styleUrls: ["dashboard.page.scss"],
})
export class DashboardPage implements OnInit {
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
		avgSpeed: "-.-",
	};

	constructor(
		private geolocationService: GeolocationService,
		private calculateService: CalculateService,
		private timerService: TimerService
	) {}

	public async ngOnInit() {
		this.timerService.getTotalTime().subscribe((data) => {
			this.totalTime = data;
		});

		this.geolocationService.getLocation().subscribe((data) => {
			console.log(new Date());

			this.location = data;
			this.updateGpsStatusIcon(data.gpsStatus);
		});

		this.calculateService.getCalculateData().subscribe((data) => {
			this.calculatedData = data;
		});
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

