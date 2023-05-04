import { Component, EventEmitter, Output } from '@angular/core';
import { LanguageService } from 'src/app/core/services/language/language.service';
import AppConstant from 'src/app/utilities/app-constant';

interface Language {
	name: string;
	value: string;
}

@Component({
	selector: 'app-language-list',
	templateUrl: './language-list.component.html',
	styleUrls: ['./language-list.component.scss'],
})
export class LanguageSelectListComponent {
	@Output() buttonEmit = new EventEmitter();

	public appConstant = AppConstant;
	public selectedLanguage: string = this.languageService.getCurrentLanguage();
	public languagesList: Language[] = Object.values(AppConstant.languages);

	constructor(private languageService: LanguageService) {}

	onChangeLanguage(lang: string) {
		this.selectedLanguage = lang;
	}

	onConfirm() {
		this.languageService.setLanguage(this.selectedLanguage);
		this.buttonEmit.emit();
	}
}
