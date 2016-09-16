import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {LocationService} from "../shared/location-service/location.service";

import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import "rxjs/add/observable/forkJoin"
import "rxjs/add/operator/filter"
import {AddressParsingService} from "../shared/address-parsing-service/address-parsing.service";
import {Address} from "../model/address";
import {Observable} from "rxjs";
import {EventService} from "../shared/event-service/event.service";


declare var google;

@Component({
  moduleId: module.id,
  selector: 'app-discover',
  templateUrl: 'discover.component.html',
  styleUrls: ['discover.component.css']
})
export class DiscoverComponent {

  private discoverForm: FormGroup;
  private locationControl: FormControl;

  @ViewChild('locationInput')
  locationInput: ElementRef;


  events: Observable<Event[]>;
  eventsLoading = true;
  searchButtonTouched = false;
  searchLocation: Address;

  constructor(fb: FormBuilder, locationService: LocationService, private _addressParsingService: AddressParsingService, private eventService: EventService) {
    this.locationControl = fb.control('');

    this.discoverForm = fb.group({
      tags: [''],
      location: this.locationControl
    });

    this.locationControl.valueChanges.filter(v => v.length == 0).subscribe(v => this.searchLocation = null);

    locationService.getCurrentPositionOfUser().subscribe(userAddress => {
      this.locationControl.setValue(`${userAddress.cityName}, ${userAddress.country}`);
      this.searchLocation = userAddress;
    });

    this.events = this.eventService.getAllPublicEvents();
    this.events.subscribe(v => this.eventsLoading = false);
  }

  ngAfterViewInit() {
    console.log('view ready');


    let autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement, {});
    autocomplete.addListener('place_changed', () => {
      this.searchLocation = this._addressParsingService.getAddressFromPlace(autocomplete.getPlace());
    })
  }


  public searchEvents() {
    this.searchButtonTouched = true;
    let tagsInput = this.getTagsInputAsLowerCase();
    this.events = this.eventService.getPublicEventsFilteredByLocationAndTags(this.searchLocation, tagsInput);
  }


  private getTagsInputAsLowerCase(): string[] {
    let tagsInput = this.discoverForm.controls['tags'].value;
    if (tagsInput.length == 0) return [];

    let tags = tagsInput.split(',');
    return tags.map(tag => tag.toLowerCase());
  }


}
