import { ChangeDetectorRef, ComponentFactoryResolver, ComponentRef, Injectable, ViewContainerRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicComponentConfig } from './dynamic-component.model';
import { Validator } from './validators/validator.model';

@Injectable()
export class DynamicComponentService {

    constructor(private fb: FormBuilder) { }

    createComponent(group: FormGroup, isViewInitialized: boolean, componentRef: ComponentRef<any>,
        componentFactoryResolver: ComponentFactoryResolver, cdRef: ChangeDetectorRef,
        componentDefinition: DynamicComponentConfig, target: ViewContainerRef) {

        if (!isViewInitialized) {
            return;
        }

        debugger;
        if (componentRef) {
            componentRef.destroy();
        }

        let factory = componentFactoryResolver.resolveComponentFactory(componentDefinition.component);
        componentRef = target.createComponent(factory);
        componentDefinition.instance = componentRef.instance;

        // Set @Input or public properties values
        debugger;
        for (const key of Object.keys(componentDefinition.properties)) {
            componentRef.instance[key] = componentDefinition.properties[key];
        }
        componentRef.instance.group = group;

        if (componentDefinition.events) {
            //subscribe to all EventEmitters
            const subs: Subscription[] = [];
            for (const cmpSub of componentDefinition.events) {
                const sub: Subscription = componentRef.instance[cmpSub.methodName]
                    .subscribe(event => {
                        cmpSub.func(event);
                     });
                if (componentRef.onDestroy) {
                    subs.push(sub);
                } else {
                    throw new Error('Method onDestroy not implemented for dynamic component ' + componentRef.instance.constructor.name);
                }
            }
            if (subs.length > 0) {
                componentRef.onDestroy(()=> {
                    for (const sub of subs) {
                        sub.unsubscribe();
                    }
                });
            }
        }

        // cdRef.detectChanges();

    }

    createForm(fields: DynamicComponentConfig[]): FormGroup {
        const group = this.fb.group({});
        fields.forEach(component => {
            const control = this.fb.control(
                null,
                this.bindValidations(component.properties['config'].validators || [])
            );
            group.addControl(component.name, control);
        });
        return group;
    }

    bindValidations(validations: Validator[]) {
        debugger;
        if (validations.length > 0) {
            const validList = [];
            validations.forEach(valid => {
                validList.push(valid.validator);
            });
            return Validators.compose(validList);
        }
        return null;
    }

}
