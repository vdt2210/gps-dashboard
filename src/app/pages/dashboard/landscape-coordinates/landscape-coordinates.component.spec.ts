import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LandscapeCoordinatesComponent } from './landscape-coordinates.component';

describe('LandscapeCoordinatesComponent', () => {
  let component: LandscapeCoordinatesComponent;
  let fixture: ComponentFixture<LandscapeCoordinatesComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ LandscapeCoordinatesComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LandscapeCoordinatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
