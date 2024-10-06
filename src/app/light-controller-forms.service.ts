import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class LightControllerFormsService {

  constructor(private formBuilder: FormBuilder) { }

  chaseForm(): FormGroup {
    return this.formBuilder.group({
      time_per_light: new FormControl(0.01),
      chase_color: new FormControl("#FF0000"),
      background_color: new FormControl("#000000"),
      tail_length: new FormControl(0),
      chase_count: new FormControl(1)
    })
  }

  toggleForm(): FormGroup {
    return this.formBuilder.group({
      start_color: new FormControl("#FF0000"),
      end_color: new FormControl("#FF00FF"),
      time_for_toggle: new FormControl(2)
    })
  }
}
