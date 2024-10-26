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

@NgModule({
  declarations: [AICLoginComponent, AicStatusComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule, 
    MatInputModule, 
    MatFormFieldModule, 
    MatButtonModule,
    MatIconModule,
    MatTooltipModule,
    RouterModule
  ],
  providers: [
  ],
  exports: [AicStatusComponent]
})
export class AicModule { }
