import {Address} from "./address";
export class Event {
    description: string;
    startDate: string;
    endDate: string;
    guests: string[];
    tags: string[];
    location: Address;
    host: string;
    type: string;
    name: string;
    imageDataUrl: string;
}