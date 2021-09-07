import { ValidatorFn, Validators } from "@angular/forms";
import { CustomFormValidators } from "./custom-validators.model";

export interface Validator {
    name?: string;
    validator: ValidatorFn;
    messageKey?: string; //transaltion key
}

export class CommonValidators {
    static emailPatternRegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    static required: Validator = { name: 'required', validator: Validators.required, messageKey: 'field-required' };
    static positiveNumber: Validator = { name: 'positiveNumber', validator: CustomFormValidators.positiveNumber, messageKey: 'field-positiveNumber' };
    static emailPattern: Validator = { name: 'emailPattern', validator: Validators.pattern(CommonValidators.emailPatternRegExp), messageKey: 'email-validator' };
}

