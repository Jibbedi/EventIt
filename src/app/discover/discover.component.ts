import {Component, OnInit} from '@angular/core';
import {LocationService} from "../shared/location-service/location.service";
import {Address} from "../model/address";
import {Observable} from "rxjs";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";

@Component({
    moduleId: module.id,
    selector: 'app-discover',
    templateUrl: 'discover.component.html',
    styleUrls: ['discover.component.css']
})
export class DiscoverComponent implements OnInit {

    private discoverForm: FormGroup;
    private locationControl : FormControl;

    constructor(fb: FormBuilder, locationService: LocationService) {


        this.locationControl = fb.control('');

        this.discoverForm = fb.group({
            tags : [''],
            location : this.locationControl
        });

        locationService.getCurrentPositionOfUser().subscribe(userAddress => this.locationControl.setValue(userAddress.cityName));

    }


    ngOnInit() {
    }

}
