import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableStatusComponent } from './table-status/table-status.component';
import { LightControlsComponent } from './light-controls/light-controls.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableStatusCardComponent } from './table-status-card/table-status-card.component';
import { MatInputModule } from '@angular/material/input';
import { CustomComponentsModule } from '../custom-components/custom-components.module';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [TableStatusComponent, LightControlsComponent, TableStatusCardComponent],
  imports: [
    CommonModule,
    CustomComponentsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
    ReactiveFormsModule,
  ],
  providers: [],
  exports: [TableStatusComponent, LightControlsComponent, TableStatusCardComponent]
})
export class TableModule { }
