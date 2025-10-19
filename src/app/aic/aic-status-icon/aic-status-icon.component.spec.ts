import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicStatusIconComponent } from './aic-status-icon.component';

describe('AicStatusIconComponent', () => {
  let component: AicStatusIconComponent;
  let fixture: ComponentFixture<AicStatusIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AicStatusIconComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AicStatusIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
