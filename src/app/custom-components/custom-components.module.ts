import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ColorPickerComponent } from './color-picker/color-picker.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ColorPickerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule, 
    MatInputModule,
  ],
  exports: [
    ColorPickerComponent
  ]
})
export class CustomComponentsModule { }
