import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DynamicFormComponent } from './dynamic-form/dynamic-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DynamicCustomTemplateDirective } from './directives/dynamic-form.directive';
import { DynamicComponent } from './components/dynamic-component/dynamic-component.component';
import { TranslateModule } from '@ngx-translate/core';
import { DynamicInputComponent } from './components/Input/input.component';
import { DynamicCheckboxComponent } from './components/checkbox/checkbox.component';
import { DynamicDateComponent } from './components/date/date.component';
import { DynamicComponentService } from './dynamic-component.service';
import { DynamicComponentDirective } from './directives/dynamic-component.directive';

@NgModule({
    declarations: [
        DynamicFormComponent,
        DynamicCustomTemplateDirective,
        DynamicComponent,
        DynamicInputComponent,
        DynamicCheckboxComponent,
        DynamicDateComponent,
        DynamicComponentDirective
    ],
    providers: [DynamicComponentService],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule
    ],
    exports: [DynamicFormComponent, DynamicCustomTemplateDirective, DynamicComponent]
})
export class DynamicFormModule { }
