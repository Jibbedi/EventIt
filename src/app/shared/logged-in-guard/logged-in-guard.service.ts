import { Injectable } from '@angular/core';
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {UserService} from "../user-service/user.service";
import {Observable} from "rxjs/Observable";

@Injectable()
export class LoggedInGuardService implements CanActivate {


  constructor(private _userService : UserService,private _router : Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
    if (!this._userService.isLoggedIn()) return Observable.of(true);

    this._router.navigateByUrl('/app');
  }
}
