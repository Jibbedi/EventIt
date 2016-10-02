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
}
