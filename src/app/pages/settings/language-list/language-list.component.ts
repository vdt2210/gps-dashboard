import { Component, EventEmitter, Output } from '@angular/core';

import { LanguageService } from '@services/index';

import { AppConstant } from '@utilities/index';

interface Language {
  name: string;
  value: string;
}

@Component({
  selector: 'app-language-list',
  styleUrls: ['./language-list.component.scss'],
  templateUrl: './language-list.component.html',
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
