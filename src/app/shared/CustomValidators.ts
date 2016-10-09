import {FormControl, FormGroup, FormArray, AbstractControl} from "@angular/forms";
import {group} from "@angular/core";

declare var moment;

export class CustomValidators {

  static DATE_FORMAT = /(\d{4})-(\d{2})\-(\d{2})/;
  static TIME_FORMAT = /(\d{2})\:(\d{2})/;

  static isValidDate = (control: FormControl) => {
    if (control.value.match(CustomValidators.DATE_FORMAT)) {
      return null;
    }
    return {noValidDate: true};
  };

  static isValidTime = (control: FormControl) => {
    if (control.value.match(CustomValidators.TIME_FORMAT)) {
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

  static dateIsAfterNow = (group : FormGroup) => {
    let momentDate = CustomValidators.getMomentDateForDateGroup(group);
    if (!momentDate) return null;

    let error = {dateIsBeforeNow: true};

    if (!momentDate.isAfter(moment())) {
      group.get('date').setErrors(error);
    }

    return momentDate.isAfter(moment()) ? null : error;

  }

  static endDateIsAfterStartDate = (array : FormArray) => {
    if (array.length != 2) return null;

    let startDate = CustomValidators.getMomentDateForDateGroup(array.at(0) as FormGroup);
    let endDate = CustomValidators.getMomentDateForDateGroup(array.at(1) as FormGroup);

    if (!startDate || !endDate) return null;


    let error = {endDateIsBeforeStartDate : true};

    if (!endDate.isAfter(startDate)) {
      array.at(1).get('date').setErrors(error);
    }

    return endDate.isAfter(startDate) ? null : error;
  };

  private static getMomentDateForDateGroup(group : FormGroup) {
    let date = group.get('date') as FormControl;
    let time = group.get('time') as FormControl;

    if (CustomValidators.isValidDate(date) || CustomValidators.isValidTime(time)) return null;

    let parsedDate = date.value.match(CustomValidators.DATE_FORMAT);
    let year = parsedDate[1];
    let month = parsedDate[2];
    let day = parsedDate[3];

    let parsedTime = time.value.match(CustomValidators.TIME_FORMAT);
    let hour = parsedTime[1];
    let minute = parsedTime[2];

    return moment([year, month-1, day, hour, minute]);
  }

}
