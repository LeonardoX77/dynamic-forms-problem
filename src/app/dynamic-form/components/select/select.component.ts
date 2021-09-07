import { Component } from '@angular/core';
import { DynamicComponentConfig } from '../../dynamic-component.model';

@Component({
    selector: 'form-select',
    styleUrls: ['select.component.scss'],
    template: `
    <select [formControlName]="config.name">
        <option value="">{{ config.placeholder }}</option>
        <!-- <option *ngFor="let option of config.options">
            {{ option }}
        </option> -->
    </select>
  `
})
export class DynamicSelectComponent {
    config: DynamicComponentConfig;
}
