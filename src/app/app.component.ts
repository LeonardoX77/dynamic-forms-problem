import { Component, OnInit, VERSION } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DynamicInputComponent } from './dynamic-form/components/Input/input.component';
import { DynamicComponentConfig } from './dynamic-form/dynamic-component.model';
import { DynamicComponentService } from './dynamic-form/dynamic-component.service';
import { CommonValidators } from './dynamic-form/validators/validator.model';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  formData: DynamicComponentConfig[] = [
    {
      name: 'name',
      component: DynamicInputComponent,
      properties: {
        ['config']: { fieldName: 'name', validators: [CommonValidators.required, CommonValidators.positiveNumber] },
        ['displayValidationErrorAfterFormSubmit']: false,
        ['class']: 'form-control'
      },
    }
  ];

  constructor(private dynamicComponentService: DynamicComponentService) {

  }

  ngOnInit(): void {
  }

}
