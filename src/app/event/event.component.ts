import {Component, OnInit, Input} from '@angular/core';
import {Event} from "../model/event";
import {AngularFire} from 'angularfire2'
import {UserService} from "../shared/user-service/user.service";

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

    constructor(private _af : AngularFire, private _userService : UserService) {
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

    getBackgroundImageUrl() : string {
        return `url(${this.event.imageDataUrl})`;
    }

    toggleParticipation() {
      console.log('test');
    }

    getTagList() {
        if (this.event.tags) return Object.keys(this.event.tags).join(',');
    }
}
