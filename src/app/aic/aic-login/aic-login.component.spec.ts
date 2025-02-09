import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AICLoginComponent } from './aic-login.component';
import { AICService } from '../aic.service';
import { createAICServiceMock } from '../testing/service.mocks';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('AICLoginComponent', () => {
  let component: AICLoginComponent;
  let fixture: ComponentFixture<AICLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatFormFieldModule, ReactiveFormsModule, MatInputModule, BrowserAnimationsModule],
      providers: [
        { provide: AICService, useValue: createAICServiceMock()}
      ],
      declarations: [AICLoginComponent]
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
