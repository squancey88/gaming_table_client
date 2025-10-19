import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LightControlsComponent } from './light-controls.component';

describe('LightControlsComponent', () => {
  let component: LightControlsComponent;
  let fixture: ComponentFixture<LightControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LightControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LightControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
