import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../shared/user-service/user.service";
import {User} from "../model/user";

@Component({
  moduleId: module.id,
  selector: 'app-user-detail',
  templateUrl: 'user-detail.component.html',
  styleUrls: ['user-detail.component.css']
})
export class UserDetailComponent {

  firstTime: boolean;
  userDetailForm: FormGroup;
  userData: User;
  savingData = false;
  saved = false;

  constructor(private _route: ActivatedRoute, private _fb: FormBuilder, private userService: UserService) {
    _route.queryParams.subscribe(v => {
      this.firstTime = v['first'] && v['first'] === 'true' ? true : false;
    });


    this.userData = this.userService.userData;

    this.userDetailForm = this._fb.group({
      'name': [this.userData.name],
      'company': [this.userData.company]
    });

    this.userDetailForm.valueChanges.subscribe(v => this.saved = false);
  }

  saveUserData() {
    if (!this.userDetailForm.valid) return;
    this.savingData = true;
    this.saved = false;

    console.log('saving');

    this.userData.name = this.userDetailForm.get('name').value;
    this.userData.company = this.userDetailForm.get('company').value;

    this.userService.saveUserData(this.userData).then(() => {
      this.savingData = false;
      this.saved = true;
    });
  }

}
