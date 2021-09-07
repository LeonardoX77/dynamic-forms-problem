import { Component, ViewContainerRef } from '@angular/core';
import { DynamicComponentConfig } from '../../dynamic-component.model';

@Component({
    selector: 'dynamic-date',
    styleUrls: ['date.component.scss'],
    template: `
    <input
        type="text"
        [attr.placeholder]="config.name | translate"
        [formControlName]="config.name">
  `
})
export class DynamicDateComponent {
    config: DynamicComponentConfig;
}
