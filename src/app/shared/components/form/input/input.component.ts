import { Component, OnInit } from '@angular/core';

import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.sass']
})
export class InputComponent extends BaseComponent implements OnInit {
  public isTextArea = false;
  ngOnInit() {
    if (this.field.inputType === 'textarea') { this.isTextArea = true; }
  }
}
