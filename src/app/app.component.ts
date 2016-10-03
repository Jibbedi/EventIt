import { Component } from '@angular/core';
import {AngularFire} from 'angularfire2'
import {UserService} from "./shared/user-service/user.service";
import {Router} from "@angular/router";

@Component({
  moduleId: module.id,
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.css']
})
export class AppComponent {

  constructor(private _userService : UserService, private router : Router) {
  }

  get isLoggedIn() : boolean {
    return this._userService.isLoggedIn();
  }

  logout(event) {
    event.preventDefault();
    this._userService.logout();
    this.router.navigateByUrl('/');
  }
}
