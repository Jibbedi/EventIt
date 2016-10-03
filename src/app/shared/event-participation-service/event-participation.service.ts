import {Injectable} from '@angular/core';
import {UserService} from "../user-service/user.service";
import {EventService} from "../event-service/event.service";
import {Event} from "../../model/event";

@Injectable()
export class EventParticipationService {

  constructor(private _userService: UserService, private eventService: EventService) {
  }


  numberOfParticipants(event: Event): number {
    if (!event.participants) return 0;
    return Object.keys(event.participants).filter(key => event.participants[key] && event.participants[key] === true).length;
  }

  isUserParticipatingInEvent(event: Event): boolean {
    if (!event.participants) return false;
    return event.participants[this._userService.authToken] === true;
  }


  toggleParticipation(event: Event) {
    if (!event.participants) event.participants = {};
    event.participants[this._userService.authToken] = !this.isUserParticipatingInEvent(event);
    console.log(event.participants);
    this.eventService.saveEvent(event);
  }

}
