import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController, PopoverController } from '@ionic/angular';
import { App } from '@capacitor/app';
import { GeolocationService } from './core/services/geolocation/geolocation.service';
import { LanguageService } from './core/services/language/language.service';
import { SplashScreen } from '@capacitor/splash-screen';
import { Router } from '@angular/router';
import { AppRoutes } from './utilities/app-routes';
import { Location } from '@angular/common';
import { CalculateService } from './core/services/calculate/calculate.service';
import { TimerService } from './core/services/timer/timer.service';
import { KeepAwake } from '@capacitor-community/keep-awake';

@Component({
	selector: 'app-root',
	templateUrl: 'app.component.html',
	styleUrls: ['app.component.scss'],
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
		private calculateService: CalculateService,
		private timerService: TimerService
	) {
		this.getStorageValue();
		SplashScreen.hide();
		this.hardwareBackButton();
	}

	async ngOnInit(): Promise<void> {
		this.keepScreenOn();
		App.addListener('appStateChange', async ({ isActive }) => {
			if (isActive) {
				this.keepScreenOn();

				return;
			}
			KeepAwake.allowSleep();
		});
	}

	private async getStorageValue() {
		this.languageService.setInitialAppLanguage();
		this.geolocationService.startBackgroundGeolocation();
		this.timerService.setInitialTotalTime();
		this.calculateService.initialCalculate();
	}

	private async keepScreenOn() {
		const { isSupported } = await KeepAwake.isSupported();
		if (isSupported) {
			await KeepAwake.keepAwake();
		}
	}

	private hardwareBackButton() {
		App.addListener('backButton', async () => {
			const overlay =
				(await this.modalCtrl.getTop()) ||
				(await this.alertCtrl.getTop()) ||
				(await this.popoverCtrl.getTop());

			overlay
				? overlay.dismiss()
				: this.router.url === `/${AppRoutes.dashboard.path}`
				? (this.geolocationService.stopBackgroundGeolocation(),
				  KeepAwake.allowSleep(),
				  App.exitApp())
				: this.location.back();
		});
	}
}
