import {Injectable} from '@angular/core';
import {Address} from "../../model/address";

@Injectable()
export class AddressParsingService {

    public getFirstAddressFromResponse(response): Address {

        if (!response.results || response.results.length == 0) return null;

        let firstResult = response.results[0];
        let userAddress = new Address();

        for (let adressComponent of firstResult.address_components) {

            let longName = adressComponent.long_name;


            if (this.isAddressComponentOfTypeCity(adressComponent)) {
                userAddress.cityName = longName;
            }
            else if (this.isAddressComponentOfTypePostalCode(adressComponent)) {
                userAddress.postalCode = longName;
            }
            else if (this.isAddressComponentOfTypeCountry(adressComponent)) {
                userAddress.country = longName;
            }
            else if (this.isAddressComponentOfTypeHouseNumber(adressComponent)) {
                userAddress.houseNumber = longName;
            }
            else if (this.isAddressComponentOfTypeStreet(adressComponent)) {
                userAddress.streetName = longName;
            }
        }

        return userAddress;
    }

    private isAddressComponentOfTypeCity(adressComponent) {
        return adressComponent.types.includes('locality');
    }

    private isAddressComponentOfTypePostalCode(addressComponent) {
        return addressComponent.types.includes('postal_code');
    }

    private isAddressComponentOfTypeCountry(addressComponent) {
        return addressComponent.types.includes('country');
    }

    private isAddressComponentOfTypeHouseNumber(addressComponent) {
        return addressComponent.types.includes('street_number');
    }

    private isAddressComponentOfTypeStreet(addressComponent) {
        return addressComponent.types.includes('route');
    }


}
