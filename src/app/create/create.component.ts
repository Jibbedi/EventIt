import {Component, OnInit, AfterViewInit} from '@angular/core';
import {LocationService} from "../shared/location-service/location.service";
import {Address} from "../model/address";
import {AddressParsingService} from "../shared/address-parsing-service/address-parsing.service";
import {AngularFire} from 'angularfire2';
import {FormBuilder, FormGroup, Validators, FormArray, FormControl} from "@angular/forms";
import {CustomValidators} from "../shared/CustomValidators";
import {EventService} from "../shared/event-service/event.service";
import {Event} from "../model/event";
import {Router} from "@angular/router";


declare var google;


@Component({
  moduleId: module.id,
  selector: 'app-create',
  templateUrl: 'create.component.html',
  styleUrls: ['create.component.css']
})

export class CreateComponent implements AfterViewInit {

  dragover = false;
  imageUrl = '';
  selectedAddress: Address = null;

  get uploadedImage(): string {
    if (this.imageUrl.length == 0) return null;

    return `url(${this.imageUrl})`
  }

  private map;
  private eventTypes;

  formCreationStep = 0;

  createEventForm: FormGroup;

  constructor(private _locationService: LocationService, private _addressParsingService: AddressParsingService, private eventService: EventService, private _af: AngularFire, private _fb: FormBuilder, private _router : Router) {
    this.eventTypes = this.eventService.getEventTypes();

    this.createEventForm = this._fb.group({
      eventName: ['', Validators.required],
      location: ['', Validators.required],
      dates: this._fb.array([
        this.createDateFormGroup()
      ]),
      invitationGroup: this._fb.group({
        publicEvent: [true],
        inviteUsers: ['']
      }, {validator: CustomValidators.eventPublicOrUsersInvited}),
      eventType: ['', Validators.required],
      tags: ['', Validators.required],
      eventHost: ['', Validators.required],
      additionalInfo: ['']
    })


  }

  public toggleEndDateVisible() {
    let datesGroup: FormArray = (this.createEventForm.controls['dates'] as FormArray);
    console.log(datesGroup);

    if (datesGroup.length == 2) {
      datesGroup.removeAt(1);
    }
    else {
      datesGroup.push(this.createDateFormGroup());
    }
  }

  private createDateFormGroup(): FormGroup {
    return this._fb.group({
      date: ["", Validators.compose([Validators.required, CustomValidators.isValidDate])],
      time: ["", Validators.compose([Validators.required, CustomValidators.isValidTime])]
    })
  }

  ngAfterViewInit() {

    this._locationService.getCurrentPositionOfUser().subscribe(userAddress => {
      this.setMapCenter(userAddress);
    });


    this.map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 15
    });

    try {
      let autocomplete = new google.maps.places.Autocomplete(document.getElementById('autocomplete'), {});
      autocomplete.addListener('place_changed', () => {
        this.selectedAddress = this._addressParsingService.getAddressFromPlace(autocomplete.getPlace());
        this.setMapCenter(this.selectedAddress);
      })
    }
    catch (e) {
      console.log('setting up google autocomplete failed');
    }

  }

  setMapCenter(address: Address) {
    if (!this.map) return;
    this.map.setCenter({lat: address.latitude, lng: address.longitude})
  }

  moveStep(amount: number) {
    this.formCreationStep = Math.min(2, Math.max(this.formCreationStep + amount, 0));
  }

  createEvent() {
    console.log(this.createEventForm);
    if (!this.createEventForm.valid) return;

    const datesArray = (this.createEventForm.get('dates') as FormArray);

    let event = new Event();

    event.name = this.createEventForm.get('eventName').value;
    console.log(this.selectedAddress);
    event.location = this.selectedAddress;

    event.startDate = (datesArray.at(0) as FormGroup).get('date').value;

    if (datesArray.length == 2) {
      event.endDate = (datesArray.at(1) as FormGroup).get('date').value;
    }

    event.tags = this.createEventForm.get('tags').value.split(',');
    event.host = this.createEventForm.get('eventHost').value;
    event.type = this.createEventForm.get('eventType').value;
    event.description = this.createEventForm.get('additionalInfo').value;
    event.publicEvent = this.createEventForm.get('invitationGroup').get('publicEvent').value;
    event.imageDataUrl = this.imageUrl;

    if (!this.createEventForm.get('invitationGroup').get('publicEvent').value) {
      let invitationEmails = this.createEventForm.get('invitationGroup').get('inviteUsers').value.split(',').map(email => email.trim());

      let users = this._af.database.list('/users').map(users => {
        return users.filter(user => {
          console.log(user,invitationEmails);
          return invitationEmails.includes(user.email);
        });
      });

      users.subscribe(users => {
        let invites = {};
        users.forEach(user => {
          console.log(user);
          invites = {[user.$key] : false};
        });
        console.log(invites);
        event.invitations = invites;
        this.eventService.saveEvent(event);
        this._router.navigateByUrl('/app/share');
      });


      return;
    }

    this.eventService.saveEvent(event);
    this._router.navigateByUrl('/app/share');

  }

  handleDragover($event) {
    $event.preventDefault();
    this.dragover = true;
  }

  handleInputChange($event) {
    try {
      let file = $event.target.files[0];
      this.handleFile(file);
    }
    catch (e) {
      console.log('error handling image', e);
    }

  }

  handleDrop($event) {
    $event.preventDefault();
    this.dragover = false;

    try {
      const file = $event.dataTransfer.files[0];
      this.handleFile(file);
    }
    catch (e) {
      console.log('error handling image', e);
    }
  }

  handleFile(file) {
    console.log(file);
    if (!file.name.match(/(png|jpe?g)$/)) {
      throw new TypeError('not supported image type given');
    }

    let fr = new FileReader();
    fr.readAsDataURL(file);
    fr.onload = () => this.imageUrl = fr.result;
  }

  moveToStep(index: number) {
    this.formCreationStep = index;
  }

}
