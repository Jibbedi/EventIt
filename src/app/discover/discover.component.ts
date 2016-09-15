import {Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {LocationService} from "../shared/location-service/location.service";
import {AngularFire} from 'angularfire2'
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import "rxjs/add/observable/forkJoin"
import "rxjs/add/operator/filter"
import {AddressParsingService} from "../shared/address-parsing-service/address-parsing.service";
import {Address} from "../model/address";


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


    events;
    eventsLoading = true;
    searchButtonTouched = false;

    searchLocation: Address;

    constructor(fb: FormBuilder, locationService: LocationService, private _addressParsingService: AddressParsingService, private _af: AngularFire) {
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

        // let event = new Event();
        // let location = new Address();
        // location.cityName = 'London';
        // location.country = 'UK';
        // event.location = location;
        // event.name = 'TEST EVENT';
        // event.guests = ['TEST','TEST'];
        // event.type = 'conference';
        // event.description = 'TEST';
        //
        // this._af.database.list('/events').push(event);

        this.events = this._af.database.list('/events').map(events => this.loadImagesForEvents(events));
        this.events.subscribe(v => this.eventsLoading = false);
    }

    ngAfterViewInit() {
        console.log('view ready');


        let autocomplete = new google.maps.places.Autocomplete(this.locationInput.nativeElement, {});
        autocomplete.addListener('place_changed', () => {
            this.searchLocation = this._addressParsingService.getAddressFromPlace(autocomplete.getPlace());
        })
    }

    private loadImagesForEvents(events) {
        return events.map(event => {
            this._af.database.object(`/eventImages/${event.$key}`).subscribe(v => {
                event.imageDataUrl = v['$value']
            });
            return event;
        });
    }

    public searchEvents() {
        this.searchButtonTouched = true;
        let tagsInput = this.getTagsInputAsLowerCase();
        this.events = this._af.database.list('/events').map(events => this.filterEventsForUserInput(events, tagsInput)).map(events => this.loadImagesForEvents(events));
    }

    private filterEventsForUserInput(events, tagsInput: string[]) {
        return events.filter(event => {

            if (this.searchLocation && event.location.cityName != this.searchLocation.cityName) return false;

            if (tagsInput.length > 0 && this.getNumberOfMatchingTagsForEvent(event, tagsInput) == 0) return false;

            return true;
        });
    }

    private getTagsInputAsLowerCase() : string[] {
        let tagsInput = this.discoverForm.controls['tags'].value;
        if (tagsInput.length == 0) return [];

        let tags = tagsInput.split(',');
        return tags.map(tag => tag.toLowerCase());;
    }

    private getNumberOfMatchingTagsForEvent(event,tags) : number {
        let numberOfMatches = 0;

        if (!event.tags) return numberOfMatches;

        let keyArray: string[] = Object.keys(event.tags);

        keyArray.forEach(key => {
            if (tags.includes(key.toLowerCase())) numberOfMatches++
        });

        return numberOfMatches;
    }

}
