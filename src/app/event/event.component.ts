import {Component, OnInit} from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'event',
    templateUrl: 'event.component.html',
    styleUrls: ['event.component.css']
})
export class EventComponent implements OnInit {

    MAX_NUMBER_OF_VISIBLE_CHARACTERS = 50;

    showCompleteMessage = false;

    message = 'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.'

    constructor() {
    }

    ngOnInit() {
    }

    getOptionalMessage(): string {
        if (this.showCompleteMessage) return this.message;
        return this.message.substr(0, this.MAX_NUMBER_OF_VISIBLE_CHARACTERS) + '...';
    }

    shouldDisplayToggleButton() {
        return this.message.length > this.MAX_NUMBER_OF_VISIBLE_CHARACTERS;
    }

    toggleShowCompleteDescription() {
        this.showCompleteMessage = !this.showCompleteMessage;
    }

}
