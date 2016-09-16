import {Injectable} from '@angular/core';
import {AngularFire, FirebaseListObservable}from 'angularfire2'
import {Observable} from "rxjs/Observable";
import {Address} from "../../model/address";

@Injectable()
export class EventService {

  private events: FirebaseListObservable<Event>;
  private EVENTS_LOCATION = '/events';
  private EVENT_IMAGES_LOCATION = '/eventImages';

  constructor(private _af: AngularFire) {
  }


  getAllPublicEvents(): Observable<Event[]> {
    return Observable.create(observer => {
      this._af.database.list(this.EVENTS_LOCATION).map(events => this.loadImagesForEvents(events)).subscribe(events => observer.next(events));
    })
  }

  getPublicEventsFilteredByLocationAndTags(location: Address, tags: string[]): Observable<Event[]> {
    return Observable.create(observer => {
      this._af.database.list(this.EVENTS_LOCATION)
        .map(events => this.filterEventsForUserInput(events, location, tags))
        .map(events => this.loadImagesForEvents(events))
        .subscribe(events => observer.next(events));
    });
  }

  private loadImagesForEvents(events) {
    return events.map(event => {
      this._af.database.object(`${this.EVENT_IMAGES_LOCATION}/${event.$key}`).subscribe(v => {
        event.imageDataUrl = v['$value']
      });
      return event;
    });
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


}
