import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AICService } from './aic.service';
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

@NgModule({
  declarations: [AICLoginComponent, AicStatusComponent, AicPlayerSelectComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    MatSelectModule,
    RouterModule
  ],
  providers: [
  ],
  exports: [AicStatusComponent, AicPlayerSelectComponent]
})
export class AicModule { }
