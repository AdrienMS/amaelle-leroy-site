import { Banner } from './banner';
import { FieldConfig } from './field-config';

export class CustomComponent {
    public type: string;
    public object: Banner | FieldConfig | string;

    constructor(
        type: string,
        object: Banner | FieldConfig | string
    ) {
        this.type = type;
        this.object = object;
    }
}