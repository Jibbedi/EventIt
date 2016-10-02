import {Component, OnInit, AfterViewInit} from '@angular/core';
import {EventService} from "../shared/event-service/event.service";
import {Observable} from "rxjs";
import {Event} from '../model/event.ts';

@Component({
  moduleId: module.id,
  selector: 'app-share',
  templateUrl: 'share.component.html',
  styleUrls: ['share.component.css']
})
export class ShareComponent {

  invitedEvents : Observable<Event[]>;
  invitationsLoading = true;

  constructor(private eventService : EventService) {
    this.invitedEvents = this.eventService.getInvitationEventsForUser();
    this.invitedEvents.subscribe(v => this.invitationsLoading = false);
  }
}
