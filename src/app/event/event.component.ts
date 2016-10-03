import {Component, OnInit, Input, AfterViewInit, ElementRef, ViewChild} from '@angular/core';
import {Event} from "../model/event";
import {EventParticipationService} from "../shared/event-participation-service/event-participation.service";
import {TwitterService} from "../shared/twitter-service/twitter.service";


@Component({
  moduleId: module.id,
  selector: 'event',
  templateUrl: 'event.component.html',
  styleUrls: ['event.component.css']
})
export class EventComponent {

  MAX_NUMBER_OF_VISIBLE_CHARACTERS = 50;

  showCompleteDescription = false;

  @Input()
  event: Event;

  @Input()
  sharable : boolean = false;

  @Input()
  showParticipationButton : boolean = true;

  constructor(private _participationService: EventParticipationService, private _twitterService : TwitterService) {
  }

  getOptionalMessage(): string {
    if (!this.event.description) return '';

    if (this.showCompleteDescription) return this.event.description;
    return this.event.description.substr(0, this.MAX_NUMBER_OF_VISIBLE_CHARACTERS) + '...';
  }

  shouldDisplayToggleButton() {
    return this.event.description && this.event.description.length > this.MAX_NUMBER_OF_VISIBLE_CHARACTERS;
  }

  toggleShowCompleteDescription() {
    this.showCompleteDescription = !this.showCompleteDescription;
  }

  getBackgroundImageUrl(): string {
    if (!this.event.imageDataUrl) return '';
    return `url(${this.event.imageDataUrl})`;
  }

  toggleParticipation() {
    this._participationService.toggleParticipation(this.event);
  }

  isUserParticipating() {
    return this._participationService.isUserParticipatingInEvent(this.event);
  }

  getTagList() {
    if (this.event.tags instanceof Array) return this.event.tags.join(',');
  }

  getNumberOfParticipants() {
    let numberOfParticipants = this._participationService.numberOfParticipants(this.event);
    return `${numberOfParticipants} ${(numberOfParticipants == 1) ? 'Participant' : 'Participants'}`;
  }

  showTwitter(event) {
    this._twitterService.showModal(this.getTwitterText(),['udacity'],'jibbedi');
  }

  getTwitterText() : string {
    return `I am visiting the event ${this.event.name} by ${this.event.host}. Check it out on EventIt.`
  }
}
