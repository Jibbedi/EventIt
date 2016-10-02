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
import {EntryComponent} from "./entry/entry.component";
import {ShareComponent} from "./share/share.component";
import {DiscoverComponent} from "./discover/discover.component";
import {CreateComponent} from "./create/create.component";
import {HttpModule} from "@angular/http";
import {LocationService} from "./shared/location-service/location.service";
import {AddressParsingService} from "./shared/address-parsing-service/address-parsing.service";
import {EventComponent} from "./event/event.component";
import {EventService} from "./shared/event-service/event.service";
import {EventParticipationService} from "./shared/event-participation-service/event-participation.service";
import {ErrorMessagesComponent} from "./error-messages/error-messages.component";


const routes = [
  {path : 'app', component : EntryComponent, children: [
    {path : '', redirectTo : 'discover'},
    {path : 'create', component: CreateComponent},
    {path : 'share', component: ShareComponent},
    {path : 'discover', component: DiscoverComponent}
  ]},
  {path: '', component: LandingComponent,children:[
    {path: 'signup', component: SignupComponent},
    {path: '**', component: LoginComponent},
  ]},{path:'**',redirectTo:''}

];

export const firebaseConfig = {
  apiKey: "AIzaSyAQ5jFfafXDV3zj3LJd-T-7Eo93EurJ-AQ",
  authDomain: "eventit-55b5f.firebaseapp.com",
  databaseURL: "https://eventit-55b5f.firebaseio.com",
  storageBucket: "eventit-55b5f.appspot.com",
};

@NgModule({
  imports: [BrowserModule, HttpModule, FormsModule,ReactiveFormsModule, RouterModule,RouterModule.forRoot(routes), AngularFireModule.initializeApp(firebaseConfig)],
  declarations: [AppComponent, LoginComponent, LandingComponent, SignupComponent,EntryComponent, CreateComponent, ShareComponent, DiscoverComponent, EventComponent, ErrorMessagesComponent],
  bootstrap: [AppComponent],
  providers: [UserService, LocationService, AddressParsingService, EventService, EventParticipationService]
  })
export class AppModule {
}
