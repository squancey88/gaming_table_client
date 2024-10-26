import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICLoginComponent } from './aic-login.component';

describe('AICLoginComponent', () => {
  let component: AICLoginComponent;
  let fixture: ComponentFixture<AICLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AICLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AICLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
