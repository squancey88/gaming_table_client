import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtgHealthComponent } from './mtg-health.component';

describe('MtgHealthComponent', () => {
  let component: MtgHealthComponent;
  let fixture: ComponentFixture<MtgHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtgHealthComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtgHealthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
