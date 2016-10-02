import {Injectable} from '@angular/core';
import {UserService} from "../user-service/user.service";
import {EventService} from "../event-service/event.service";
import {Event} from "../../model/event";

@Injectable()
export class EventParticipationService {

  constructor(private _userService: UserService, private eventService: EventService) {
  }


  numberOfParticipants(event: Event): number {
    if (!event.guests) return 0;
    return Object.keys(event.guests).length;
  }

  isUserParticipatingInEvent(event: Event): boolean {
    if (!event.guests) return false;
    return event.guests[this._userService.authToken] === true;
  }


  toggleParticipation(event: Event) {
    if (!this.isUserParticipatingInEvent(event)) {
      if (!event.guests) event.guests = {};
      event.guests[this._userService.authToken] = true;
    }
    else {
      delete event.guests[this._userService.authToken];
    }

    this.eventService.saveEvent(event);
  }

}
