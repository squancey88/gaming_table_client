import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ReactiveFormsModule } from '@angular/forms';
import { AICLoginComponent } from './aic-login/aic-login.component';
import { AicStatusComponent } from './aic-status/aic-status.component';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';
import { AicPlayerSelectComponent } from './aic-player-select/aic-player-select.component';
import { MatSelectModule } from '@angular/material/select';
import { AicStatusIconComponent } from './aic-status-icon/aic-status-icon.component';
import { AicStatusCardComponent } from './aic-status-card/aic-status-card.component';
import { MatCardModule } from '@angular/material/card';
import { GroupSelectComponent } from './group-select/group-select.component';
import { SessionSelectComponent } from './session-select/session-select.component';
import {AicDashboardComponent} from './aic-dashboard/aic-dashboard.component';

@NgModule({
  declarations: [AICLoginComponent, AicStatusComponent, AicPlayerSelectComponent,
    AicStatusIconComponent, AicStatusCardComponent, GroupSelectComponent, SessionSelectComponent,
    AicDashboardComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule
  ],
  providers: [
  ],
  exports: [AicStatusComponent, AicPlayerSelectComponent, AicStatusIconComponent, AicStatusCardComponent, AicDashboardComponent]
})
export class AicModule { }
