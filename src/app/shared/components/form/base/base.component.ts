import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../../../core';

@Component({
  selector: 'app-base',
  template: ``
})
export class BaseComponent {
  public field: FieldConfig;
  public group: FormGroup;

  constructor() { }
}
