import {FormControl} from "@angular/forms";
export class CustomValidators {

  static isValidDate = (control: FormControl) => {
    if (control.value.match(/\d{4}-\d{2}\-\d{2}/)) {
      return null;
    }
    return {noValidDate: true};
  };

  static isValidTime = (control: FormControl) => {
    if (control.value.match(/\d{2}\:\d{2}/)) {
      return null;
    }
    return {noValidTime: true};
  };
}
