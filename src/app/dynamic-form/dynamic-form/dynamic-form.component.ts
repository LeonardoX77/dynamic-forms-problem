import { Component, ContentChild, ContentChildren, Input, OnInit, QueryList, TemplateRef, ViewChildren, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicCustomTemplateDirective } from '../directives/dynamic-form.directive';
import { DynamicComponentConfig } from '../dynamic-component.model';
import { DynamicComponentService } from '../dynamic-component.service';
import { Validator } from '../validators/validator.model';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.css']
})
export class DynamicFormComponent implements OnInit {
    @Input() fields: DynamicComponentConfig[] = [];
    form: FormGroup;

    /**
     * This template is used to render custom template defined inside component declaration.
     * Requisites: define dynamicCustomTemplate directive in the template
     * Example:
     *
        <app-dynamic-form
            <ng-template dynamicCustomTemplate>
                <!-- YOUR CODE HERE -->
            </ng-template>
        </app-dynamic-form>
    */
    @ViewChildren('localCustomUserTemplate', { read: ViewContainerRef }) localCustomUserTemplate: ViewContainerRef;

    /**
     * This is the custom user template reference defined inside component declaration
    */
    @ContentChild(DynamicCustomTemplateDirective, { read: TemplateRef, static: true }) customUserTemplate: TemplateRef<any>;
    @ContentChildren(DynamicCustomTemplateDirective, { read: TemplateRef }) customUserTemplates: QueryList<TemplateRef<any>>;

    constructor(private dynamicComponentService: DynamicComponentService) { }

    ngOnInit(): void {
        this.form = this.dynamicComponentService.createForm(this.fields);
    }
    
    updateFormFields() {
        this.fields.forEach(component => {
            component.properties['frm'] = this.form;
        });
    }

    ngOnDestroy(): void {
        if (this.localCustomUserTemplate) {
            this.localCustomUserTemplate.clear();
        }
    }
}
