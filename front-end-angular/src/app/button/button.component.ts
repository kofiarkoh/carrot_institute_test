import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent {
  @Input()
  type = 'button';

  @Input()
  label = '';

  @Output()
  clickEvent = new EventEmitter(false);
}
