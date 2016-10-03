import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, AngularFireAuth} from 'angularfire2'
import {User} from "../../model/user";
import {Observable} from "rxjs/Observable";

@Injectable()
export class UserService {

  constructor(private _af: AngularFire) {
    this.getUserFromLocalStorage();
  }


  public authToken = null;
  public userData: User = new User();

  public prefilledData: {email: string, password: string};

  isLoggedIn(): boolean {
    return this.authToken != null;
  }

  saveUserData(user: User) {
    this.userData = user;
    this.setUserToLocalStorage();
    this._af.database.object('/users/' + this.authToken).update(this.userData);
  }

  logout() {
    this.userData = null;
    this.authToken = null;
    console.log('logout');
    this.setUserToLocalStorage();
  }

  login(email: string, password: string): Promise<boolean> {

    let loginPromise = new Promise((resolve, reject) => {
      this._af.auth.login({email: email, password: password}, this.getPasswordAuthConfig()).then(auth => {
        this.authToken = auth.uid;

        this._af.database.object('/users/' + this.authToken).subscribe(user => {
          this.userData = user;
          this.setUserToLocalStorage();
          resolve(true)
        });

      }).catch(error => {
        console.log('error', error);
        reject(error)
      });
    });

    return loginPromise;
  }

  signUp(email: string, password: string): Promise<any> {

    let signUp = new Promise((resolve, reject) => {
      this._af.auth.createUser({email: email, password: password}).then(auth => {
        this.authToken = auth.uid;

        let newUser = new User();
        newUser.email = email;
        this.userData = newUser;
        this.setUserToLocalStorage();

        this._af.database.object('/users/' + this.authToken).update(newUser);

        resolve(true)
      }).catch(error => {
        console.log('error', error);
        reject(error)
      });
    });


    return signUp;


  }

  private getPasswordAuthConfig() {
    return {
      provider: AuthProviders.Password,
      method: AuthMethods.Password,
    };
  }

  private getUserFromLocalStorage() {
    this.userData = JSON.parse(window.localStorage.getItem('USER'));
    this.authToken = this.userData['$key'];
  }

  private setUserToLocalStorage() {
    if (!this.userData) {
      window.localStorage.removeItem('USER');
    }
    else {
      window.localStorage.setItem('USER', JSON.stringify(this.userData));
    }

  }

}
