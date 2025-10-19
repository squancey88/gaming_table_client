import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicDashboardComponent } from './aic-dashboard.component';

describe('AicDashboardComponent', () => {
  let component: AicDashboardComponent;
  let fixture: ComponentFixture<AicDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AicDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AicDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
