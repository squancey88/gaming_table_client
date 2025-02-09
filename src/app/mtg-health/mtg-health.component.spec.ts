import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { MtgHealthComponent } from './mtg-health.component';
import { TableInterfaceService } from '../table-interface.service';
import { createTableInterfaceServiceMock } from '../testing/service.mocks';

describe('MtgHealthComponent', () => {
  let component: MtgHealthComponent;
  let fixture: ComponentFixture<MtgHealthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MtgHealthComponent, BrowserAnimationsModule],
      providers: [
        {provide: TableInterfaceService, useValue: createTableInterfaceServiceMock()}
      ]
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
