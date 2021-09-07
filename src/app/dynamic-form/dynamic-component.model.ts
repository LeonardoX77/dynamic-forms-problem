import { Type } from "@angular/core";
import { Validator } from "./validators/validator.model";

export interface DynamicComponentConfig {
    name: string;
    placeholder?: string;
    component: Type<any>;
    properties?: { [key: string]: any };
    events?: [{ methodName: string, func: (params: any[]) => any }];
    instance?: any;
}

export interface FormFieldDefinition<T> {
    fieldName?: T;
    fieldGroup?: FormFieldDefinitionGroup<T>;
    validators?: Validator[];
    disabled?: boolean;
    noAutoRefresh?: boolean;
    dynamicFormData?: DynamicComponentConfig;
}

export interface FormFieldDefinitionGroup<T> {
    fieldName?: string;
    group: FormFieldDefinition<T>[];
    validators?: Validator[];
    disabled?: boolean;
    noAutoRefresh?: boolean;
}
