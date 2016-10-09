import {Component, OnInit, Input} from '@angular/core';
import {FormGroup, AbstractControl} from "@angular/forms";

@Component({
  selector: 'error-messages',
  templateUrl: 'error-messages.component.html',
  styleUrls: ['error-messages.component.scss']
})
export class ErrorMessagesComponent {


  @Input()
  control: AbstractControl;

  getErrorKeys() {
    return Object.keys(this.control.errors);
  }

  getMessage(errorKey): string {
    console.log(Object.keys(this.control.errors));
    switch (errorKey) {
      case 'required':
        return 'Field is required';
      case 'noValidDate':
        return 'Please give a valid date, e.g. 2016-12-24';
      case 'noValidTime':
        return 'Please give a valid time, e.g. 23:10';
      case 'eventPrivateAndNoInvitations':
        return 'If your event is private, you must at least invite one user';
      case 'noValidEmail':
        return 'Please provide a valid email, e.g. foo@bar.com';
      case 'noFulfillOfLowercaseLetterRequirement':
        return 'Password needs to have at least one lowercase letter';
      case 'noFulfillOfUppercaseLetterRequirement':
        return 'Password needs to have at least one uppercase letter';
      case 'noFulfillOfNumberRequirement':
        return 'Password needs to have at least one number';
      case 'noFulfillOfLengthRequirement':
        return 'Password needs to be at least 6 characters long';
      default:
        return 'Unknown error';
    }
  }

}
