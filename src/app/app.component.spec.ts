import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { AicModule } from './aic/aic.module';
import { AICService } from './aic/aic.service';
import { createAICServiceMock } from './aic/testing/service.mocks';
import { TableInterfaceService } from './table-interface.service';
import { createTableInterfaceServiceMock } from './testing/service.mocks';
import { provideRouter } from '@angular/router';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent, AicModule],
      providers: [
        provideRouter([]),
        { provide: AICService, useValue: createAICServiceMock() },
        { provide: TableInterfaceService, useValue: createTableInterfaceServiceMock() }
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'gaming_table_client' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('gaming_table_client');
  });

});
