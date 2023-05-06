import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';
import { authService } from 'src/app/core/services/auth/auth.service';
import { GeolocationService } from 'src/app/core/services/geolocation/geolocation.service';
import { AppRoutes } from 'src/app/utilities/app-routes';

interface SettingModel {
  action: any;
  icon: string;
  label: string;
  value?: number;
}

@Component({
  selector: 'app-settings',
  styleUrls: ['settings.page.scss'],
  templateUrl: 'settings.page.html',
})
export class SettingsPage implements OnInit {
  public appRoutes = AppRoutes;

  public settingsList: SettingModel[] = [
    { action: 'account', icon: 'person-outline', label: 'account' },
    { action: 'language', icon: 'language-outline', label: 'language' },
    { action: 'unit', icon: 'speedometer-outline', label: 'unit' },
    {
      action: 'speedCorrection',
      icon: 'speedometer-outline',
      label: 'speedCorrection',
      value: 0,
    },
    { action: 'clearData', icon: 'trash-outline', label: 'clearData' },
    {
      action: 'checkForUpdate',
      icon: 'download-outline',
      label: 'checkForUpdate',
    },
  ];

  public appVersion = '-';

  public isModalOpen = false;
  public isAccount = false;
  public isLogin = false;
  public isSignUp = false;
  public isLanguage = false;
  public isUnit = false;
  public isSpeedCorrection = false;
  public isClearData = false;

  constructor(private geolocationService: GeolocationService, private authService: authService) {
    this.geolocationService
      .getSpeedCorrection()
      .subscribe((val) => (this.settingsList[3].value = val));
  }

  async ngOnInit(): Promise<void> {
    this.appVersion = (await App.getInfo()).version;
  }

  public onClickCard(action: string) {
    switch (action) {
      case 'account':
        if (this.authService.currentUser) {
          this.isAccount = true;
        } else {
          this.isLogin = true;
        }

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
    this.isAccount = false;
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
        this.isAccount = false;
        this.isSignUp = true;
        break;

      case 'login':
        this.isSignUp = false;
        this.isAccount = false;
        this.isLogin = true;
        break;

      case 'account':
        this.isLogin = false;
        this.isSignUp = false;
        this.isAccount = true;
        break;

      default:
        this.onModalDismiss();
    }
  }
}
