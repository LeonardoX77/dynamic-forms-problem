import { Component, ViewContainerRef } from '@angular/core';
import { DynamicComponentConfig } from '../../dynamic-component.model';

@Component({
    selector: 'dynamic-check',
    styleUrls: ['checkbox.component.scss'],
    template: `
    <input
        type="checkbox"
        [attr.placeholder]="config.name | translate"
        [formControlName]="config.name">
  `
})
export class DynamicCheckboxComponent {
    config: DynamicComponentConfig;
}
