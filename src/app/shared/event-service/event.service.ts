import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable}from 'angularfire2'
import {Observable} from "rxjs/Observable";
import {Address} from "../../model/address";
import {Event} from "../../model/event";
import {UserService} from "../user-service/user.service";

@Injectable()
export class EventService {

  private events: FirebaseListObservable<Event[]>;
  private EVENTS_LOCATION = '/events';
  private EVENT_IMAGES_LOCATION = '/eventImages';

  constructor(private _af: AngularFire, private userService: UserService) {
  }

  saveEvent(event: Event) {
    let key = event['$key'];


    let tags = event.tags;
    console.log(event.tags);
    let tagObj = {};
    tags.forEach(tag => {
      tagObj[tag] = true;
    });
    event.tags = <any>tagObj;


    if (key) {
      delete event['$key'];
      key = this.getListOfEvents().update(key, event).key;
      return;
    }

    key = this.getListOfEvents().push(event).key;


    if (Object.keys(event.guests).length > 0) {
      Object.keys(event.guests).forEach(userKey => {
        console.log('setting event key', userKey);
        this._af.database.object('/users/' + userKey + '/invitations/').update({[key]: false});
      });
    }

    this._af.database.object('/users/' + this.userService.authToken + '/events').update({[key]: true});

    if (!event.imageDataUrl) return;

    this._af.database.object(this.EVENT_IMAGES_LOCATION).update({[key]: event.imageDataUrl});


  }

  deleteEvent(event: Event) {
    let key = event['$key'];
    if (!key) return;
    this._af.database.list('/events').remove(key);
    this._af.database.list('/users').subscribe(users => {
      users.forEach(user => {
        this._af.database.object('/users/' + user.$key + '/invitations/' + key).remove();
        this._af.database.object('/users/' + user.$key + '/events/' + key).remove();
      })
    });
  }

  getAllPublicEvents(): Observable<Event[]> {
    return Observable.create(observer => {
      this.getListOfEvents()
        .map(events => this.filterPublicEvents(events))
        .map(events => this.loadImagesForEvents(events))
        .map(events => this.mapTagsToStringArrayForEvents(events))
        .subscribe(events => observer.next(events));
    })
  }

  getPublicEventsFilteredByLocationAndTags(location: Address, tags: string[]): Observable<Event[]> {
    return Observable.create(observer => {
      this.getListOfEvents()
        .map(events => this.filterPublicEvents(events))
        .map(events => this.filterEventsForUserInput(events, location, tags))
        .map(events => this.loadImagesForEvents(events))
        .map(events => this.mapTagsToStringArrayForEvents(events))
        .subscribe(events => observer.next(events));
    });
  }

  getInvitationEventsForUser(): Observable<Event[]> {
    return this.getUserEventsForPath('/invitations');
  }

  getEventsForUser(): Observable<Event[]> {
    return this.getUserEventsForPath('/events');
  }

  private filterPublicEvents(events) {
    return events.filter(event => event.publicEvent);
  }

  private getUserEventsForPath(path: string): Observable<Event[]> {
    return Observable.create(observer => {
      this._af.database.list('/users/' + this.userService.authToken + path).map(eventIds => this.getEventsForEventIds(eventIds)).subscribe(events => observer.next(events));
    })
  }

  private getEventsForEventIds(eventIds) {
    return eventIds.map(eventId => {

      let eventObj = {};

      let event = this._af.database.object('/events/' + eventId.$key).map(e => this.mapTagsToStringArray(e)).subscribe(e => {
        for (let key in e) {
          let value = e[key];
          eventObj[key] = value;
        }
      });

      let eventImage = this._af.database.object('/eventImages' + eventId.$key).subscribe(image => {
        eventObj['imageDataUrl'] = image['$value'];
      });

      return eventObj;
    })
  };

  private loadImagesForEvents(events) {
    return events.map(event => {
      this._af.database.object(`${this.EVENT_IMAGES_LOCATION}/${event.$key}`).subscribe(v => {
        event.imageDataUrl = v['$value']
      });
      return event;
    });
  }

  private mapTagsToStringArrayForEvents(events) {
    return events.map(event => {
      this.mapTagsToStringArray(event);
      return event;
    });
  }

  private mapTagsToStringArray(event) {
    if (event.tags) event.tags = Object.keys(event.tags);
    return event;
  }

  private filterEventsForUserInput(events, location: Address, tagsInput: string[]) {
    return events.filter(event => {

      if (location && event.location.cityName != location.cityName) return false;

      if (tagsInput.length > 0 && this.getNumberOfMatchingTagsForEvent(event, tagsInput) == 0) return false;

      return true;
    });
  }

  private getNumberOfMatchingTagsForEvent(event, tags): number {
    let numberOfMatches = 0;

    if (!event.tags) return numberOfMatches;

    let keyArray: string[] = Object.keys(event.tags);

    keyArray.forEach(key => {
      if (tags.includes(key.toLowerCase())) numberOfMatches++
    });

    return numberOfMatches;
  }

  private getListOfEvents(): FirebaseListObservable<Event[]> {
    return this._af.database.list(this.EVENTS_LOCATION);
  }


}
