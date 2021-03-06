import {Component, OnInit, AfterViewInit} from '@angular/core';
import {EventService} from "../shared/event-service/event.service";
import {Observable} from "rxjs";
import {Event} from '../model/event.ts';

@Component({
  selector: 'app-share',
  templateUrl: 'share.component.html',
  styleUrls: ['share.component.scss']
})
export class ShareComponent {

  invitedEvents : Observable<Event[]>;
  invitationsLoading = true;

  createdEvents : Observable<Event[]>;
  createdEventsLoading = true;

  participationEvents : Observable<Event[]>;
  participationsLoading = true;

  constructor(private eventService : EventService) {
    this.invitedEvents = this.eventService.getInvitationEventsForUser();
    this.invitedEvents.subscribe(v => this.invitationsLoading = false);

    this.createdEvents = this.eventService.getEventsForUser();
    this.createdEvents.subscribe(v => this.createdEventsLoading = false);

    this.participationEvents = this.eventService.getParticipationEventsForUser();
    this.participationEvents.subscribe(v => this.participationsLoading = false);
  }
}
