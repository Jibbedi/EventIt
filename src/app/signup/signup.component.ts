import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.css']
})
export class SignupComponent {

  signUpForm: FormGroup;
  signUpError;

  constructor(fb: FormBuilder, private _userService: UserService, private _router : Router) {
    this.signUpForm = fb.group({
      email: [this._userService.prefilledData.email, Validators.compose([Validators.pattern("^[^@]+?\@[^@\.]+?\.[A-Za-z]+?$"), Validators.required])],
      password: [this._userService.prefilledData.password, Validators.required],
      visiblePassword: [this._userService.prefilledData.password, Validators.required],
      showPassword: [false]
    });


    this.syncValueOfControls('password', 'visiblePassword');


  }


  signUp() {
    if (!this.signUpForm.valid) return;

    this._userService.signUp(this.getValueOfControlWithName('email'), this.getValueOfControlWithName('password'))
      .then(loginSuccessful => this._router.navigateByUrl('app'), failure => this.signUpError = failure);
  }

  private getValueOfControlWithName(name) {
    return this.signUpForm.controls[name].value
  }

  private syncValueOfControls(first, second) {
    this.updateValueOfControlOnChangeOfOtherControl(first, second);
    this.updateValueOfControlOnChangeOfOtherControl(second, first);
  }

  private updateValueOfControlOnChangeOfOtherControl(first, second) {
    this.signUpForm.controls[first].valueChanges.subscribe(v => this.signUpForm.controls[second].setValue(this.signUpForm.controls[first].value,{emitEvent : false}));
  }
}
