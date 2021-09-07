// tslint:disable: directive-selector
import { Directive, Input, TemplateRef } from '@angular/core';

/**
 * This is the custom user template reference defined inside <app-dynamic-form> declaration
*/
@Directive({ selector: '[dynamicCustomTemplate]' })
export class DynamicCustomTemplateDirective {
    @Input() set dynamicCustomTemplate(param: any) {
    }

    @Input() componentName: string;

    constructor(public template: TemplateRef<any>) {
    }
}

