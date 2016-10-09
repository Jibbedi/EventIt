import {Component, OnInit} from '@angular/core';
import {UserService} from "../shared/user-service/user.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {CustomValidators} from "../shared/CustomValidators";

@Component({
  selector: 'signup',
  templateUrl: 'signup.component.html',
  styleUrls: ['signup.component.scss']
})
export class SignupComponent {

  signUpForm: FormGroup;
  signUpError;

  constructor(fb: FormBuilder, private _userService: UserService, private _router: Router) {

    let passwordValidator = Validators.compose([Validators.required,
      CustomValidators.passwordFullfillsLengthRequirements]);

    let prefilledEmail = this._userService.prefilledData ? this._userService.prefilledData.email : '';
    let prefilledPassword = this._userService.prefilledData ? this._userService.prefilledData.password : '';

    this.signUpForm = fb.group({
      email: [prefilledEmail, Validators.compose([CustomValidators.isValidEmail, Validators.required])],
      name: ['', Validators.required],
      password: [prefilledPassword, passwordValidator],
      visiblePassword: [prefilledPassword, passwordValidator],
      showPassword: [false]
    });

    this.syncValueOfControls('password', 'visiblePassword');


  }


  signUp() {
    if (!this.signUpForm.valid) return;

    this._userService.signUp(this.getValueOfControlWithName('email'), this.getValueOfControlWithName('password'), this.getValueOfControlWithName('name'))
      .then(loginSuccessful => this._router.navigateByUrl('userDetail?first=true'), failure => this.signUpError = failure);
  }

  private getValueOfControlWithName(name) {
    return this.signUpForm.controls[name].value
  }

  private syncValueOfControls(first, second) {
    this.updateValueOfControlOnChangeOfOtherControl(first, second);
    this.updateValueOfControlOnChangeOfOtherControl(second, first);
  }

  private updateValueOfControlOnChangeOfOtherControl(first, second) {
    this.signUpForm.controls[first].valueChanges.subscribe(v => {
      this.signUpForm.controls[second].setValue(this.signUpForm.controls[first].value, {emitEvent: false});
    });
  }
}
