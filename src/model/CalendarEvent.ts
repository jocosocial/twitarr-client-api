import { DateTime } from 'luxon';

import { Util } from '../internal/Util';

/**
 * Represents a calendar event.
 * @module CalendarEvent
 */
export class CalendarEvent {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'title', 'start_time');

    const ret = new CalendarEvent();
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
  public start_time: DateTime;

  /** The event's ending time. */
  public end_time: DateTime;

  /** Whether the event is official or not. */
  public official: boolean;

  /** The event's extended description. */
  public description: string;

  /** Whether the user is following this event. */
  public following: boolean;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(ret, this, 'id', 'title', 'location', 'official', 'description', 'following');
    Util.setEpochProperties(ret, this, 'start_time', 'end_time');
    return ret;
  }
}
