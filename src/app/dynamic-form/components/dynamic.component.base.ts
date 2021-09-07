import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormFieldDefinition } from '../dynamic-component.model';

@Component({
    template: ''
})
export class DynamicComponentBase {
    @Input() group: FormGroup;
    @Input() config: FormFieldDefinition<any>;
    @Input() class: any;
    @Input() ngClass: { [klass: string]: any;};
    @Input() displayValidationErrorAfterFormSubmit: boolean;
}
