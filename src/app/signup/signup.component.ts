import { Component, OnInit } from '@angular/core';
import {UserService} from "../shared/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent  {

  signUpForm: FormGroup;
  signUpError;

  constructor(fb: FormBuilder, private _userService: UserService) {
    this.signUpForm = fb.group({
      email: [this._userService.prefilledData.email, Validators.compose([Validators.pattern("^[^@]+?\@[^@\.]+?\.[A-Za-z]+?$"), Validators.required])],
      password: [this._userService.prefilledData.password, Validators.required]
    });
  }

  signUp() {
    if (!this.signUpForm.valid) return;

    this._userService.signUp(this.getValueOfControlWithName('email'), this.getValueOfControlWithName('password'))
      .then(loginSuccessful => console.log(loginSuccessful),failure => this.signUpError = failure);
  }

  private getValueOfControlWithName(name) {
    return this.signUpForm.controls[name].value
  }
}
