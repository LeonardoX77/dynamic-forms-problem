import { AfterViewInit, ChangeDetectorRef, Component, ComponentFactoryResolver, ComponentRef, Input,
    OnChanges, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DynamicComponentConfig } from '../../dynamic-component.model';
import { DynamicComponentService } from '../../dynamic-component.service';

@Component({
    selector: 'app-dynamic-component',
    template: `

        <ng-template #target></ng-template>

        <!-- <ng-template *ngIf="!template" #target></ng-template>
        <ng-container *ngIf="template">
            <ng-container
                #localCustomUserTemplate
                *ngTemplateOutlet="template, context: { $implicit: componentDefinition }">

                <ng-template #target></ng-template>
            </ng-container>
        </ng-container> -->

        `,
    styleUrls: ['./dynamic-component.component.css']
})
export class DynamicComponent implements OnInit, OnChanges, AfterViewInit, OnDestroy {
    @ViewChild('target', { read: ViewContainerRef }) target: ViewContainerRef;
    @Input() componentConfig: DynamicComponentConfig;
    @Input() group: FormGroup;
    // @Input() template: TemplateRef<any>;

    private componentRef: ComponentRef<any>;
    private isViewInitialized: boolean = false;

    constructor(
        private componentFactoryResolver: ComponentFactoryResolver,
        private cdRef: ChangeDetectorRef,
        private dynamicComponentService: DynamicComponentService
    ) { }

    ngOnInit(): void {
        this.isViewInitialized = true;
        this.updateComponent();
    }

    updateComponent() {
        this.dynamicComponentService.createComponent(this.group, this.isViewInitialized, this.componentRef, 
            this.componentFactoryResolver,
            this.cdRef, this.componentConfig, this.target);

    }

    ngOnChanges() {
        // this.updateComponent();
    }

    ngAfterViewInit() {
        // this.isViewInitialized = true;
        // this.updateComponent();
    }

    ngOnDestroy() {
        if (this.componentRef) {
            this.componentRef.destroy();
        }
    }

}
