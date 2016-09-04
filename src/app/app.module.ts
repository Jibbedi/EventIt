import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {ReactiveFormsModule, FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from "./landing/landing.component";
import {SignupComponent} from "./signup/signup.component";
import {AngularFireModule} from "angularfire2";
import {UserService} from "./shared/user-service/user.service";


const routes = [
  {path: '', component: LandingComponent,children:[
    {path: 'signup', component: SignupComponent},
    {path: '**', component: LoginComponent},
    {path:'**',redirectTo:''}
  ]}
];

export const firebaseConfig = {
  apiKey: "AIzaSyAQ5jFfafXDV3zj3LJd-T-7Eo93EurJ-AQ",
  authDomain: "eventit-55b5f.firebaseapp.com",
  databaseURL: "https://eventit-55b5f.firebaseio.com",
  storageBucket: "eventit-55b5f.appspot.com",
};

@NgModule({
  imports: [BrowserModule, FormsModule,ReactiveFormsModule, RouterModule,RouterModule.forRoot(routes), AngularFireModule.initializeApp(firebaseConfig)],
  declarations: [AppComponent, LoginComponent, LandingComponent, SignupComponent],
  bootstrap: [AppComponent],
  providers: [UserService]
  })
export class AppModule {
}
