import { Injectable } from "@angular/core";
import { TranslateService } from "@ngx-translate/core";
import { Device } from "@capacitor/device";
import AppConstant from "src/app/utilities/app-constant";
import { StorageService } from "../storage/storage.service";

@Injectable({
	providedIn: "root",
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
				if (val) {
					this.translateService.use(val);
					document.documentElement.lang = val;
				} else {
					this.setLanguage((await Device.getLanguageCode()).value);
				}
			})
			.catch(() => {});
	}

	public async setLanguage(lang: string) {
		await this.storageService.set(AppConstant.storageKeys.language, lang);
		this.translateService.use(lang);
		document.documentElement.lang = lang;
	}

	public translate(key: string, params?: any) {
		return this.translateService.instant(key, params);
	}
}
