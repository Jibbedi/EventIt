import {Injectable} from '@angular/core';
import {AngularFire, AuthProviders, AuthMethods, AngularFireAuth} from 'angularfire2'
import {User} from "../../model/user";

@Injectable()
export class UserService {

  constructor(private _af: AngularFire) {
  }


  public authToken : string = 'GYx57l5yFvTkWNXv7pMpVXKF1iq1';

  public prefilledData : {email : string, password : string};


  login(email: string, password: string): Promise<boolean> {

    let loginPromise = new Promise((resolve, reject) => {
      this._af.auth.login({email: email, password: password}, this.getPasswordAuthConfig()).then(auth => {
        this.authToken = auth.uid;
        resolve(true)
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

}
