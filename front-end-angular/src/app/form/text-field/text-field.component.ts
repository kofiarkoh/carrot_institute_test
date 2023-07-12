import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-text-field',
  templateUrl: './text-field.component.html',
  styleUrls: ['./text-field.component.css'],
})
export class TextFieldComponent {
  @Input()
  type = 'text';

  @Input()
  placeholder = '';

  @Input()
  inputClasses = '';

  @Input()
  control!: FormControl; //= new FormControl();

  @Input()
  errorMessage = '';

  get message(): string {
    // const control = this.myForm.get(controlName);

    return '';
  }
}
