import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MtgHealthGameRunnerComponent } from './mtg-health-game-runner.component';

describe('MtgHealthGameRunnerComponent', () => {
  let component: MtgHealthGameRunnerComponent;
  let fixture: ComponentFixture<MtgHealthGameRunnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtgHealthGameRunnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MtgHealthGameRunnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
