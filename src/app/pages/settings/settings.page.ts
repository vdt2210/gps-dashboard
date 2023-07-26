import { Component, OnInit } from '@angular/core';
import { App } from '@capacitor/app';

import { authService, GeolocationService } from '@services/index';

import { AppRoutes } from '@utilities/index';

interface SettingModel {
  action: any;
  icon: string;
  label: string;
  value?: string;
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
    {
      action: 'syncData',
      icon: 'sync-outline',
      label: 'syncData',
    },
    { action: 'language', icon: 'language-outline', label: 'language' },
    { action: 'unit', icon: 'speedometer-outline', label: 'unit' },
    {
      action: 'speedCorrection',
      icon: 'speedometer-outline',
      label: 'speedCorrection',
      value: '+0%',
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
  public isSyncData = false;
  public isSignUp = false;
  public isLanguage = false;
  public isUnit = false;
  public isSpeedCorrection = false;
  public isClearData = false;

  constructor(
    private geolocationService: GeolocationService,
    private authService: authService
  ) {
    this.geolocationService
      .getSpeedCorrection()
      .subscribe((val) => (this.settingsList[4].value = `+${val}%`));
  }

  async ngOnInit(): Promise<void> {
    this.appVersion = (await App.getInfo()).version;
  }

  public async onClickCard(action: string) {
    this.isModalOpen = true;

    switch (action) {
      case 'account':
        if (await this.authService.currentToken) {
          this.isAccount = true;
        } else {
          this.isLogin = true;
        }

        break;

      case 'syncData':
        if (await this.authService.currentToken) {
          this.isSyncData = true;
        } else {
          this.isLogin = true;
        }

        break;

      case 'language':
        this.isLanguage = true;

        break;

      case 'unit':
        this.isUnit = true;

        break;

      case 'speedCorrection':
        this.isSpeedCorrection = true;

        break;

      case 'clearData':
        this.isClearData = true;
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
    this.isSyncData = false;
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
