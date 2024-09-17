import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MtgHealthComponent } from './mtg-health/mtg-health.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'mtg-health',
    component: MtgHealthComponent
  }
];
