import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { LanguageSelectListComponent } from "./language-select-list.component";

describe("LoginModalComponent", () => {
	let component: LanguageSelectListComponent;
	let fixture: ComponentFixture<LanguageSelectListComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [LanguageSelectListComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(LanguageSelectListComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

