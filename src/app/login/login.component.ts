import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/user-service/user.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginError;

  constructor(fb: FormBuilder, private _userService: UserService, private _router : Router) {
    this.loginForm = fb.group({
      email: ['', Validators.compose([Validators.pattern("^[^@]+?\@[^@\.]+?\.[A-Za-z]+?$"), Validators.required])],
      password: ['', Validators.required]
    });
  }

  login() {
    if (!this.loginForm.valid) return;

    this._userService.login(this.getValueOfControlWithName('email'), this.getValueOfControlWithName('password'))
      .then(success => console.log('login successful'),failure => this.loginError = failure);
  }

  routeToSignUp() {
    this._userService.prefilledData = this.loginForm.value;
    this._router.navigateByUrl('/signup')
  }

  private getValueOfControlWithName(name) {
    return this.loginForm.controls[name].value
  }

  ngOnInit() {
  }

}
