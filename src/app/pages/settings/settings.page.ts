import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { GeolocationService } from 'src/app/core/services/geolocation/geolocation.service';
import { AppRoutes } from 'src/app/utilities/app-routes';

interface SettingModel {
	label: string;
	icon: string;
	value?: number;
	action: any;
}

@Component({
	selector: 'app-settings',
	templateUrl: 'settings.page.html',
	styleUrls: ['settings.page.scss'],
})
export class SettingsPage implements OnInit {
	public appRoutes = AppRoutes;

	public settingsList: SettingModel[] = [
		{ label: 'account', icon: 'person-outline', action: 'account' },
		{ label: 'language', icon: 'language-outline', action: 'language' },
		{ label: 'unit', icon: 'speedometer-outline', action: 'unit' },
		{
			label: 'speedCorrection',
			icon: 'speedometer-outline',
			value: 0,
			action: 'speedCorrection',
		},
		{ label: 'clearData', icon: 'trash-outline', action: 'clearData' },
		{
			label: 'checkForUpdate',
			icon: 'download-outline',
			action: 'checkForUpdate',
		},
	];

	public appVersion = '-';

	public isModalOpen = false;
	public isLogin = false;
	public isSignUp = false;
	public isLanguage = false;
	public isUnit = false;
	public isSpeedCorrection = false;
	public isClearData = false;

	constructor(private geolocationService: GeolocationService) {
		this.geolocationService
			.getSpeedCorrection()
			.subscribe(val => (this.settingsList[3].value = val));
	}

	async ngOnInit(): Promise<void> {
		this.appVersion = (await App.getInfo()).version;
	}

	public onClickCard(action: string) {
		switch (action) {
			case 'account':
				//TODO check if logged in show account detail
				this.isLogin = true;
				this.isModalOpen = true;
				break;
			case 'language':
				this.isLanguage = true;
				this.isModalOpen = true;
				break;
			case 'unit':
				this.isUnit = true;
				this.isModalOpen = true;
				break;
			case 'speedCorrection':
				this.isSpeedCorrection = true;
				this.isModalOpen = true;
				break;
			case 'clearData':
				this.isClearData = true;
				this.isModalOpen = true;
				break;
			case 'checkForUpdate':
				break;
		}
	}

	public onModalDismiss() {
		this.isModalOpen = false;
		this.isLogin = false;
		this.isSignUp = false;
		this.isLanguage = false;
		this.isUnit = false;
		this.isSpeedCorrection = false;
		this.isClearData = false;
	}

	public modalButtonAction(action: string) {
		switch (action) {
			case 'signUp':
				this.isLogin = false;
				this.isSignUp = true;
				break;

			case 'login':
				this.isSignUp = false;
				this.isLogin = true;
				break;

			default:
				this.onModalDismiss();
		}
	}
}
