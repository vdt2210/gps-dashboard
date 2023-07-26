import { Component, EventEmitter, Output } from '@angular/core';

import { LanguageService } from '@services/index';

import { AppConstant } from '@utilities/index';

import { RadioOption } from '@components/radio/radio.component';

@Component({
  selector: 'app-language-list',
  styleUrls: ['./language-list.component.scss'],
  templateUrl: './language-list.component.html',
})
export class LanguageSelectListComponent {
  @Output() buttonEmit = new EventEmitter();

  public appConstant = AppConstant;
  public selectedLanguage: string = this.languageService.getCurrentLanguage();
  public languagesList: RadioOption[] = Object.values(AppConstant.languages).map((item) => ({
    label: item.name,
    value: item.value,
  }));

  constructor(private languageService: LanguageService) {}

  onChangeLanguage(lang: string) {
    this.selectedLanguage = lang;
  }

  onConfirm() {
    this.languageService.setLanguage(this.selectedLanguage);
    this.buttonEmit.emit();
  }
}
