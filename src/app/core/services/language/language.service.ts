import { Injectable } from '@angular/core';
import { Device } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import * as dayjs from 'dayjs';

import { StorageService } from '@services/index';

import { AppConstant } from '@utilities/index';
import 'dayjs/locale/vi';
import 'dayjs/locale/en';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  constructor(
    private translateService: TranslateService,
    private storageService: StorageService
  ) {}

  public async setInitialAppLanguage() {
    await this.storageService
      .get(AppConstant.storageKeys.language)
      .then(async (val) => {
        await this.setLanguage(
          this.getSupportedLanguage(val ? val : (await Device.getLanguageCode()).value)
        );
      })
      .catch((err) => {
        console.error(err);
      });
  }

  public getCurrentLanguage() {
    return this.translateService.currentLang;
  }

  public async setLanguage(lang: string) {
    await this.storageService.set(AppConstant.storageKeys.language, lang);
    this.translateService.use(lang);
    document.documentElement.lang = lang;
    dayjs.locale(lang);
  }

  public translate(key: string, params?: object) {
    return this.translateService.instant(key, params);
  }

  private getSupportedLanguage(lang: string) {
    return lang in AppConstant.languages ? lang : AppConstant.languages.en.value;
  }
}
