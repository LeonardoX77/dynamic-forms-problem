import {
    ChangeDetectorRef,
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input,
    OnInit,
    ViewContainerRef
} from "@angular/core";
import { DynamicComponentConfig } from "../dynamic-component.model";
import { DynamicInputComponent } from "../components/Input/input.component";
import { DynamicSelectComponent } from "../components/select/select.component";
import { DynamicCheckboxComponent } from "../components/checkbox/checkbox.component";
import { DynamicDateComponent } from "../components/date/date.component";
import { DynamicComponentService } from "../dynamic-component.service";
import { FormGroup } from "@angular/forms";

const componentMapper = {
    input: DynamicInputComponent,
    select: DynamicSelectComponent,
    date: DynamicDateComponent,
    checkbox: DynamicCheckboxComponent
};
@Directive({
    selector: "[dynamicComponent]"
})
export class DynamicComponentDirective implements OnInit {
    @Input() componentConfig: DynamicComponentConfig;
    @Input() group: FormGroup;

    componentRef: any;

    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef,
        // private cdRef: ChangeDetectorRef,
        private dynamicComponentService: DynamicComponentService
    ) { }

    ngOnInit() {
        this.dynamicComponentService.createComponent(this.group, true, null, this.resolver, null, 
            this.componentConfig, this.container);
        // const factory = this.resolver.resolveComponentFactory(
        //     componentMapper[this.field.type]
        // );
        // this.componentRef = this.container.createComponent(factory);
        // this.componentRef.instance.field = this.field;
    }
}
