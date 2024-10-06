import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function minDateValidator(minDate: Date): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const controlDate = new Date(control.value);
    return controlDate >= minDate
      ? null
      : { minDate: { value: control.value } };
  };
}
