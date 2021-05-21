import {
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  Input,
  OnInit,
  ViewContainerRef
} from '@angular/core';

import { FormGroup } from '@angular/forms';

import { FieldConfig } from '../../../core';
import { ArrayComponent, ButtonComponent, DateComponent, ImageSelectionComponent, InputComponent, SelectComponent } from '../../components';

const componentMapper = {
  input: InputComponent,
  array: ArrayComponent,
  button: ButtonComponent,
  date: DateComponent,
  select: SelectComponent,
  image: ImageSelectionComponent
};

@Directive({
  selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;

  private componentRef: any;

  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {
    const factory = this.resolver.resolveComponentFactory(
      componentMapper[this.field.type] !== undefined ? componentMapper[this.field.type] : componentMapper.input
    );
    this.componentRef = this.container.createComponent(factory);
    this.componentRef.instance.field = this.field;
    this.componentRef.instance.group = this.group;
  }

}
