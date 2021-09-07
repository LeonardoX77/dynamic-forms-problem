import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { DynamicFormModule } from './dynamic-form/dynamic-form.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports:      [ BrowserModule, FormsModule, DynamicFormModule, ReactiveFormsModule, FormsModule, 
    TranslateModule.forRoot() ],
  declarations: [ AppComponent, HelloComponent ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
