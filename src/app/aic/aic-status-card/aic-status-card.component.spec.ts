import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicStatusCardComponent } from './aic-status-card.component';

describe('AicStatusCardComponent', () => {
  let component: AicStatusCardComponent;
  let fixture: ComponentFixture<AicStatusCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AicStatusCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AicStatusCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
