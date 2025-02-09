import { Component, forwardRef, Output, EventEmitter } from '@angular/core';
import { AICService } from '../aic.service';
import { User } from '../aic.interfaces';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-aic-player-select',
  templateUrl: './aic-player-select.component.html',
  styleUrl: './aic-player-select.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AicPlayerSelectComponent),
      multi: true
    }
  ]
})
export class AicPlayerSelectComponent implements ControlValueAccessor {

  users: Array<User>;
  value: any;
  onChange: any = () => {};
  onTouched: any = () => {};

  @Output() playerSelected = new EventEmitter<User>();

  constructor(
    private aicServer: AICService,
  ) {
    this.users = new Array<User>(); 
    const group = this.aicServer.currentGroup;
    if(group){
      this.users = group.owners.concat(group.members);
    }
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {}

  selectChange(event: MatSelectChange): void {
    this.value = event.value;
    this.onChange(event.value);
    this.onTouched();
    this.playerSelected.emit(this.users.find((item) => item.id == event.value));
  }

}
