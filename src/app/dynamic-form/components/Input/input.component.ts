import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DynamicComponentBase } from '../dynamic.component.base';

@Component({
    selector: 'dynamic-input',
    styleUrls: ['input.component.scss'],
    template: `

    <!-- {{ config | json }}
    
    <div *ngIf="frm">
        {{ frm.value | json }}
    </div> -->

    <ng-container [formGroup]="group" #frm="ngForm">
        <input
            type="text"
            [attr.placeholder]="config.fieldName | translate"
            [formControlName]="config.fieldName"
            [class]="class"
            [ngClass]="ngClass">

    {{ group.errors | json }}

        <ng-container *ngFor="let validation of config.validators;">
            <label class="error" *ngIf="((frm.submitted && displayValidationErrorAfterFormSubmit) || !displayValidationErrorAfterFormSubmit ) && group.get(config.fieldName).hasError(validation.name)">
                xxx {{ validation.messageKey | translate }}
            </label>
        </ng-container>
    </ng-container>
  `
})
export class DynamicInputComponent extends DynamicComponentBase {
}
