import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AicStatusComponent } from './aic-status.component';
import { AICService } from '../aic.service';
import { createAICServiceMock } from '../testing/service.mocks';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

describe('AicStatusComponent', () => {
  let component: AicStatusComponent;
  let fixture: ComponentFixture<AicStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatIconModule, MatTooltipModule],
      providers: [
        { provide: AICService, useValue: createAICServiceMock() }
      ],
      declarations: [AicStatusComponent]
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
