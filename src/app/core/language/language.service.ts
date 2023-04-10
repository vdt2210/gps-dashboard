import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Device } from "@capacitor/device";
import AppConstant from "src/app/utilities/app-constant";

@Injectable({
	providedIn: "root",
})
export class LanguageService {
	constructor(private translateService: TranslateService) {}

	public async setInitialAppLanguage() {
		this.setLanguage(
			localStorage.getItem(AppConstant.storageKeys.language) ||
				(await Device.getLanguageCode()).value
		);
	}

	public async setLanguage(lang: string) {
		await localStorage.setItem(AppConstant.storageKeys.language, lang);
		await this.translateService.use(lang);
		document.documentElement.lang = lang;
	}

	public translate(key: string, params?: any) {
		return this.translateService.instant(key, params);
	}
}
