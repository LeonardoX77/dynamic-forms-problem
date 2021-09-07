import { AbstractControl, ValidatorFn, ValidationErrors, FormControl, FormGroup } from '@angular/forms';
import { NgbDate } from '@ng-bootstrap/ng-bootstrap';

export class CustomFormValidators {
    // static matchPassword(c: AbstractControl): {[key: string]: boolean } | null {
    //     const password = c.get('password');
    //     const repeatPassword = c.get('repeatPassword');

    //     if (password.value === repeatPassword.value) {
    //        return null;
    //     }
    //     return {'match': true};
    // }

    public static matchPassword(controlName1: string, controlName2: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            if (control.value) {
                const password1 = control.get(controlName1);
                const password2 = control.get(controlName2);

                if (password1.value === password2.value) {
                    return null;
                }
                return { match: true };
            } else {
                return null; // no error
            }
        };
    }

    public static inRange(low: number, upper: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            if (control.value !== null && control.value !== '') {
                if (control.value >= low && control.value <= upper) return null;
                else
                    return {
                        ['inRange']: { range: { value: control.value, acceptedRange: '[' + low + ', ' + upper + ']' } }
                    };
            } else {
                return null; // no error
            }
        };
    }

    public static positiveOrZero(control: FormControl): ValidationErrors {
        if (control.value >= 0) return null;
        else return { ['positiveOrZero']: { value: control.value } };
    }

    public static positiveNumber(control: FormControl): ValidationErrors {
        if (control.value !== null && control.value !== '') {
            if (control.value > 0) return null;
            else return { ['positiveNumber']: { value: control.value } };
        } else {
            return null;
        }
    }

    static fromToDate(
        fromDate: AbstractControl,
        toDate: AbstractControl,
        fromTime: AbstractControl = null,
        toTime: AbstractControl = null,
        errorName: string = 'fromToDate'
    ): ValidatorFn {
        return (formControl: AbstractControl): { [key: string]: boolean } | null => {
            let dFromDate: Date;
            let dToDate: Date;

            if (fromDate && fromDate.value > 0 && toDate && toDate.value > 0) {
                const ngbFromDate: NgbDate = fromDate.value as NgbDate;
                const ngbToDate: NgbDate = toDate.value as NgbDate;
                if (fromTime && fromTime.value) {
                    const t1 = fromTime.value.split(':');
                    const t2 = toTime.value.split(':');

                    dFromDate = new Date(
                        ngbFromDate.year,
                        ngbFromDate.month - 1,
                        ngbFromDate.day,
                        t1[0],
                        t1[1],
                        t1.length > 2 ? +t1[2] : 0
                    );
                    dToDate = new Date(
                        ngbToDate.year,
                        ngbToDate.month - 1,
                        ngbToDate.day,
                        t2[0],
                        t2[1],
                        t2.length > 2 ? +t2[2] : 0
                    );
                } else {
                    dFromDate = new Date(ngbFromDate.year, ngbFromDate.month - 1, ngbFromDate.day);
                    dToDate = new Date(ngbToDate.year, ngbToDate.month - 1, ngbToDate.day);
                }

                if (fromDate >= toDate) {
                    return { [errorName]: true };
                }
            }
            return null;
        };
    }

    static multiSelectCheckSelectedOptions(form: FormGroup, minValue: number, maxValue: number): ValidatorFn {
        return (control: AbstractControl): ValidationErrors => {
            let n = 0;
            Object.keys(form.controls).forEach((key) => {
                if (form.get(key).value === true) {
                    n++;
                }
            });

            if (minValue > 0 && minValue > n) {
                return { ['multiSelectCheckSelectedOptions']: n };
            }
            if (maxValue > 0 && n > maxValue) {
                return { ['multiSelectCheckSelectedOptions']: n };
            }
            if (n === 0) {
                return { ['multiSelectCheckSelectedOptions']: n };
            }

            return null;
        };
    }
}
