import { Component, OnInit } from "@angular/core";
import {
	AlertController,
	ModalController,
	PopoverController,
} from "@ionic/angular";
import { App } from "@capacitor/app";
import { GeolocationService } from "./core/services/geolocation/geolocation.service";
import { LanguageService } from "./core/language/language.service";
import { SplashScreen } from "@capacitor/splash-screen";
import { Router } from "@angular/router";
import { AppRoutes } from "./utilities/app-routes";
import { Location } from "@angular/common";
import { CalculateService } from "./core/calculate/calculate.service";
// import { BackgroundTask } from '@capawesome/capacitor-background-task';

@Component({
	selector: "app-root",
	templateUrl: "app.component.html",
	styleUrls: ["app.component.scss"],
})
export class AppComponent implements OnInit {
	constructor(
		private modalCtrl: ModalController,
		private alertCtrl: AlertController,
		private popoverCtrl: PopoverController,
		private location: Location,
		private router: Router,
		private languageService: LanguageService,
		private geolocationService: GeolocationService,
		private calculateService: CalculateService
	) {
		SplashScreen.hide();
		this.hardwareBackButton();
		this.languageService.setInitialAppLanguage();
		this.geolocationService.startBackgroundGeolocation();
		this.geolocationService.setInitialSpeedCorrection();
		this.calculateService.initialCalculate();
	}

	ngOnInit(): void {
		console.log("started");

		// App.addListener('appStateChange', async ({ isActive }) => {
		//   if (isActive) {
		//     return;
		//   }
		//   // The app state has been changed to inactive.
		//   // Start the background task by calling `beforeExit`.
		//   const taskId = await BackgroundTask.beforeExit(async () => {
		//     // this.guess_location(10000);
		//     // To start listening for changes in the device's location, add a new watcher.
		//     // You do this by calling 'addWatcher' with an options object and a callback. A
		//     // Promise is returned, which resolves to the callback ID used to remove the
		//     // watcher in the future. The callback will be called every time a new location
		//     // is available. Watchers can not be paused, only removed. Multiple watchers may
		//     // exist simultaneously.
		//     // Run your code...
		//     // Finish the background task as soon as everything is done.
		//     BackgroundTask.finish({ taskId });
		//   });
		// });
	}

	private hardwareBackButton() {
		App.addListener("backButton", async () => {
			const overlay =
				(await this.modalCtrl.getTop()) ||
				(await this.alertCtrl.getTop()) ||
				(await this.popoverCtrl.getTop());

			overlay
				? overlay.dismiss()
				: this.router.url === `/${AppRoutes.dashboard.path}`
				? (this.geolocationService.stopBackgroundGeolocation(), App.exitApp())
				: this.location.back();
		});
	}
}

