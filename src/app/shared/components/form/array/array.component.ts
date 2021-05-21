import { Component, OnInit } from '@angular/core';
import { FormArray } from '@angular/forms';

import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-array',
  templateUrl: './array.component.html',
  styleUrls: ['./array.component.sass']
})
export class ArrayComponent extends BaseComponent implements OnInit {
  public formArray: FormArray;

  ngOnInit() {
    this.formArray = this.group.get(this.field.name) as FormArray;
  }
}
