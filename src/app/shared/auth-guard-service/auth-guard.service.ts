import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs/Observable";
import {UserService} from "../user-service/user.service";
import "rxjs/add/observable/of";

@Injectable()
export class AuthGuardService implements CanActivate {


  constructor(private _userService : UserService,private _router : Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean>|Promise<boolean>|boolean {
      if (this._userService.isLoggedIn()) return Observable.of(true);

      this._router.navigateByUrl('/');
  }
}
