import {Injectable} from '@angular/core';
import {Address} from "../../model/address";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/publishReplay'
import {Http} from "@angular/http";
import {AddressParsingService} from "../address-parsing-service/address-parsing.service";

@Injectable()
export class LocationService {

    private GEOLOCATION_CONFIG = {timeout: 10000};
    private GOOGLE_MAPS_API_URL = 'http://maps.googleapis.com/maps/api/geocode/json?latlng=';

    private _currentPosition: Observable<Address>;


    constructor(private _http: Http, private _addressParsingService : AddressParsingService) {
    }

    getCurrentPositionOfUser(): Observable<Address> {

        if (!this._currentPosition) {
            this._currentPosition = this.locateUser();
        }
        return this._currentPosition;
    }

    private locateUser(): Observable<Address> {
        return Observable.create(observer => {
            console.log('subscribing....');
            navigator.geolocation.getCurrentPosition((position) => {
                this.handleSuccesfulGetCurrentPosition(position, observer);
            }, (error) => {
                this.handleErrorGetCurrentPosition(error, observer);
            },this.GEOLOCATION_CONFIG)

        }).publishReplay(1).refCount()
    }

    private handleSuccesfulGetCurrentPosition(position, observer) {
        this._http.get(this.buildUrlWithLatitudeAndLongitude(position))
            .map(r => r.json())
            .map(r => this._addressParsingService.getFirstAddressFromResponse(r))
            .subscribe(address => {
                address ? observer.next(address) : observer.error(null);
                observer.complete();
            });
    }

    private handleErrorGetCurrentPosition(error, observer) {
        console.log(error);
        observer.error(null);
        observer.complete();
    }

    private buildUrlWithLatitudeAndLongitude(position) {
        return `${this.GOOGLE_MAPS_API_URL}${position.coords.latitude},${position.coords.longitude}`;
    }
}
