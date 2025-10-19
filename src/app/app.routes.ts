import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MtgHealthComponent } from './mtg-health/mtg-health.component';
import { GameRunnerGuard } from './guards/game-runner-guard';
import { AICLoginComponent } from './aic/aic-login/aic-login.component';
import { AicDashboardComponent } from './aic/aic-dashboard/aic-dashboard.component';
import { LightControlsComponent } from './table/light-controls/light-controls.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'aic-login',
    component: AICLoginComponent,
  },
  {
    path: 'aic-dashboard',
    component: AicDashboardComponent,
  },
  {
    path: 'light-controls',
    component: LightControlsComponent,
  },
  {
    path: 'mtg-health',
    component: MtgHealthComponent,
    canDeactivate: [GameRunnerGuard]
  }
];
