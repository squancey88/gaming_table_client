import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicPlayerSelectComponent } from './aic-player-select.component';

describe('AicPlayerSelectComponent', () => {
  let component: AicPlayerSelectComponent;
  let fixture: ComponentFixture<AicPlayerSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AicPlayerSelectComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AicPlayerSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
