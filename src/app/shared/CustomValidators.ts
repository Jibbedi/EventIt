import {FormControl, FormGroup} from "@angular/forms";
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

  static eventPublicOrUsersInvited = (group: FormGroup) => {
    const inviteUsersControl = group.get('inviteUsers');
    if (group.get('publicEvent').value === true || inviteUsersControl.value.length > 0) {
      inviteUsersControl.setErrors(null);
      return null;
    }

    const error = {eventPrivateAndNoInvitations: true};
    inviteUsersControl.setErrors(error);
    return error;
  }

  static isValidEmail = (control: FormControl) => {
    if (control.value.length == 0) return null;
    return control.value.match(/^[^@]+?\@[^@\.]+?\.[A-Za-z]+?$/) ? null : {noValidEmail: true};
  }

  static passwordFullfillsLengthRequirements = (control: FormControl) => {
    if (control.value.length == 0 ) return null;
    let requirement = /.{6,}/;
    return control.value.match(requirement) ? null : {noFulfillOfLengthRequirement: true};
  }

  static passwordFullfillsNumberRequirements = (control: FormControl) => {
    if (control.value.length == 0 ) return null;
    let requirement = /[0-9]/;
    return control.value.match(requirement) ? null : {noFulfillOfNumberRequirement: true};
  }

  static passwordFullfillsUppercaseLetterRequirements = (control: FormControl) => {
    if (control.value.length == 0 ) return null;
    let requirement = /[A-Z]/;
    return control.value.match(requirement) ? null : {noFulfillOfUppercaseLetterRequirement: true};
  }

  static passwordFullfillsLowercaseLetterRequirements = (control: FormControl) => {
    if (control.value.length == 0 ) return null;
    let requirement = /[a-z]/;
    return control.value.match(requirement) ? null : {noFulfillOfLowercaseLetterRequirement: true};
  }

}
