import { Validators, AbstractControl } from '@angular/forms';

declare module '@angular/forms' {
  // interface FormControl {
  //   setEnabled(this: FormControl, value: boolean): void;
  //   setRequired(this: FormControl, value: boolean): void;
  // }
  interface AbstractControl {
    setEnabled(this: AbstractControl, value: boolean): void;
    setRequired(this: AbstractControl, value: boolean): void;
    getControlName(this: AbstractControl): string;
  }
}

/**
 * Set a form control enabled or not
 *
 * @param this: form control instance to be modified
 * @param value: true/false
 */
function setEnabled(this: AbstractControl, value: boolean): void {
  if (value) {
    this.enable();
  } else {
    this.disable();
  }
}

/**
 * Set a form control required or not
 *
 * @param this: form control instance to be modified
 * @param value: true/false
 */
function setRequired(this: AbstractControl, value: boolean): void {
  this.setValidators(value ? [Validators.required] : []);
}

function getControlName(this: AbstractControl): string {
  return (Object.keys(this.parent.controls).find(key => this.parent.controls[key] === this));
}

// FormControl.prototype.setEnabled = setEnabled;
// FormControl.prototype.setRequired = setRequired;

AbstractControl.prototype.setEnabled = setEnabled;
AbstractControl.prototype.setRequired = setRequired;
AbstractControl.prototype.getControlName = getControlName;


/*
  // Example extending to Observable

declare module 'rxjs' {
  interface Observable<T> {
    isTrue(this: Observable<T>): string;
  }
}

function isTrue<T>(this: Observable<T>) {
  return 'xxxxx';
}

Observable.prototype.isTrue = isTrue;

export class XTest {
  private o: Observable<any> = new Observable();
  public getSomething(): string {
    return this.o.isTrue();
  }
}

Example:
    const xTest = new XTest();
    let xx = xTest.getSomething();

*/
