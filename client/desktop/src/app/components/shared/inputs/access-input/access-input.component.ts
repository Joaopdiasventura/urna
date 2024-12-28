import {
  Component,
  Input,
  forwardRef,
  ElementRef,
  ViewChild,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'access-input',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => AccessInputComponent),
      multi: true,
    },
  ],
  imports: [FormsModule],
  templateUrl: './access-input.component.html',
  styleUrl: './access-input.component.scss',
})
export class AccessInputComponent implements ControlValueAccessor {
  @Input() required: boolean = true;
  @Input() label: string = '';
  @Input() type: string = '';
  @Input() name: string = '';
  @Input() id: string = '';

  private _value: string = '';

  @ViewChild('input') input!: ElementRef;

  ngOnInit(): void {
    this.id = this.id + `-input`;
    this.name = this.name + `Input`;
  }

  get value(): string {
    return this._value;
  }

  set value(val: string) {
    this._value = val;
    this.onChange(val);
  }

  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    if (value) {
      this._value = value;
    }
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }
}
