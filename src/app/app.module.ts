import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {LandingComponent} from "./landing/landing.component";
import {SignupComponent} from "./signup/signup.component";


const routes = [
  {path: '', component: LandingComponent,children:[
    {path: '', component: LoginComponent},
    {path: 'signup', component: SignupComponent}
  ]}
];

@NgModule({
  imports: [BrowserModule, FormsModule, RouterModule,RouterModule.forRoot(routes)],
  declarations: [AppComponent, LoginComponent, LandingComponent, SignupComponent],
  bootstrap: [AppComponent]
  })
export class AppModule {
}
