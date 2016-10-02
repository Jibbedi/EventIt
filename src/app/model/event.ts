import {Address} from "./address";
export class Event {
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  guests: {id : boolean}|{} = {};
  tags: string[] = [];
  location: Address = new Address();
  host: string = '';
  type: string = '';
  name: string = '';
  imageDataUrl: string = '';
  publicEvent : boolean = true;
}
