/**
 * ```ts
 * class Field {
 *      name: string;
 *      type: string;
 *      control: string;
 *      required: boolean; //optional
 *      value: any; //optional
 * }
 * ```
 *
 * @example
 * ```ts
 * const data = new Field('name', 'input', 'control', true);
 * const data = new Field('name', 'input', 'control', true, 'value');
 * ```
 */
export class Field {
    public name: string;
    public type: string;
    public control: string;
    public required: boolean;
    public value: any;

    constructor(name: string = '', type: string = '', control: string = '', required: boolean = false, value: any = null) {
        this.name = name;
        this.type = type;
        this.control = control;
        this.required = required;
        this.value = value;
    }
}

export interface Validator {
    name: string;
    validator: any;
    message: string;
}

export interface FieldConfig {
    label?: string;
    name?: string;
    inputType?: string;
    options?: string[];
    collections?: any;
    type: string;
    value?: any;
    validations?: Validator[];
    subGroup?: Array<FieldConfig>;
}
