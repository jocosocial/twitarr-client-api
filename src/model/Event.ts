import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a calendar event.
 * @module Event
 */
export class Event {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'title', 'start_time');

    const ret = new Event();
    Util.setProperties(ret, data, 'id', 'title', 'location', 'official', 'description', 'following');
    Util.setDateProperties(ret, data, 'start_time', 'end_time');

    return ret;
  }

  /** The unique event ID. */
  public id: string;

  /** The event's title. */
  public title: string;

  /** The event's location. */
  public location: string;

  /** The event's starting time. */
  public start_time: Moment;

  /** The event's ending time. */
  public end_time: Moment;

  /** Whether the event is official or not. */
  public official: boolean;

  /** The event's extended description. */
  public description: string;

  /** Whether the user is following this event. */
  public following: boolean;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(ret, this, 'id', 'title', 'location', 'official', 'description', 'following');
    if (this.start_time) {
      ret.start_time = this.start_time.valueOf();
    }
    if (this.end_time) {
      ret.end_time = this.end_time.valueOf();
    }
    return ret;
  }
}
