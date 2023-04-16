import { ComponentFixture, TestBed, waitForAsync } from "@angular/core/testing";
import { IonicModule } from "@ionic/angular";

import { IconOnlyButtonComponent } from "./icon-only-button.component";

describe("IconOnlyButtonComponent", () => {
	let component: IconOnlyButtonComponent;
	let fixture: ComponentFixture<IconOnlyButtonComponent>;

	beforeEach(waitForAsync(() => {
		TestBed.configureTestingModule({
			declarations: [IconOnlyButtonComponent],
			imports: [IonicModule.forRoot()],
		}).compileComponents();

		fixture = TestBed.createComponent(IconOnlyButtonComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});

