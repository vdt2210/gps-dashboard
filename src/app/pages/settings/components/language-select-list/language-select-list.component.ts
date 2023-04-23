import { Component, EventEmitter, Output } from "@angular/core";
import { LanguageService } from "src/app/core/services/language/language.service";
import AppConstant from "src/app/utilities/app-constant";

interface Language {
	name: string;
	value: string;
}

@Component({
	selector: "app-language-select-list",
	templateUrl: "./language-select-list.component.html",
	styleUrls: ["./language-select-list.component.scss"],
})
export class LanguageSelectListComponent {
	@Output() buttonEmit = new EventEmitter();

	public appConstant = AppConstant;
	public selectedLanguage: string = this.languageService.getCurrentLanguage();
	public languagesList: Language[] = Object.values(AppConstant.languages);

	constructor(private languageService: LanguageService) {}

	onSelectLanguage(lang: string) {
		this.selectedLanguage = lang;
	}

	onConfirm() {
		if (this.selectedLanguage) {
			this.languageService.setLanguage(this.selectedLanguage);
			this.buttonEmit.emit();
		}
	}
}

