import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicStatusComponent } from './aic-status.component';

describe('AicStatusComponent', () => {
  let component: AicStatusComponent;
  let fixture: ComponentFixture<AicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AicStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AicStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
