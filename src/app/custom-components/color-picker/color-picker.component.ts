import { AfterViewInit, Component, ViewChild, ElementRef, Renderer2, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import Coloris from "@melloware/coloris";

@Component({
  selector: 'app-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrl: './color-picker.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: ColorPickerComponent
    }
  ]
})
export class ColorPickerComponent implements AfterViewInit, ControlValueAccessor {

  @ViewChild('colorPicker', { static: true }) input?: ElementRef<HTMLInputElement>;

  @Input() value = '';
  @Input() disabled = false;
  @Input() placeholder = 'Control Value Accessor sample';
  @Input() label = 'Colour';

  constructor(private renderer: Renderer2) {}

  onChanged?: (value: any) => void;
  onTouched?: () => void;

  ngAfterViewInit(): void {
    Coloris.init();
    console.log(this.input)
    Coloris({el: `#${this.input?.nativeElement.id}`});
  }

  registerOnChange(fn: (value: any) => void): void {
    this.onChanged = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  writeValue(value: string): void {
    this.value = value;
  }

  setDisabledState(disabled: boolean): void {
    this.disabled = disabled;
    if(this.input){
      this.renderer.setProperty(this.input.nativeElement, 'disabled', disabled);
      console.log(this.input.nativeElement.disabled);
    }
  }

  handleModelChange() {
    this.onChanged?.(this.value);
    this.onTouched?.();
  }

}
