import {Address} from "./address";
export class Event {
  description: string = '';
  startDate: string = '';
  endDate: string = '';
  participants: {id : boolean}|{} = {};
  invitations: {id : boolean}|{} = {};
  tags: string[] = [];
  location: Address = new Address();
  host: string = '';
  type: string = '';
  name: string = '';
  imageDataUrl: string = '';
  publicEvent : boolean = true;
}
