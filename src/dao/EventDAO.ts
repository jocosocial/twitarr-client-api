import { DateTime } from 'luxon';

import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { CalendarEvent } from '../model/CalendarEvent';

import { Util } from '../internal/Util';

import { AbstractDAO } from './AbstractDAO';

/** @hidden */
const sortEvents = (a: CalendarEvent, b: CalendarEvent) => {
  let ret = 0;
  if (a) {
    if (b) {
      ret = a.start_time.toMillis() - b.start_time.toMillis();
      if (ret === 0) {
        if (a.end_time) {
          if (b.end_time) {
            ret = a.end_time.toMillis() - b.end_time.toMillis();
          } else {
            return -1;
          }
        } else if (b.end_time) {
          return 1;
        }
      }
    } else {
      return -1;
    }
  } else if (b) {
    return 1;
  }

  if (ret === 0) {
    return a.title.localeCompare(b.title);
  }
  return ret;
};

export class EventDAO extends AbstractDAO {
  /**
   * Retrieve the complete list of events.
   */
  public async all() {
    return this.http
      .get('/api/v2/event', new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        const events = data.events.map((e: any) => CalendarEvent.fromRest(e));
        return events.sort(sortEvents);
      });
  }

  /**
   * Retrieve an individual event.
   */
  public async get(id: string) {
    return this.http
      .get('/api/v2/event/' + id, new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        return CalendarEvent.fromRest(data.event);
      });
  }

  /**
   * Favorite an event.
   */
  public async favorite(id: string) {
    return this.http
      .post('/api/v2/event/' + id + '/favorite', new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        return CalendarEvent.fromRest(data.event);
      });
  }

  /**
   * Un-favorite an event.
   */
  public async unfavorite(id: string) {
    return this.http
      .httpDelete('/api/v2/event/' + id + '/favorite', new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        return CalendarEvent.fromRest(data.event);
      });
  }

  /**
   * Remove an individual event. (Must be an admin.)
   */
  public async remove(id: string) {
    return this.http
      .httpDelete('/api/v2/event/' + id, new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(() => {
        return true;
      });
  }

  /**
   * Update an individual event. (Must be an admin.)
   */
  public async update(id: string, title?: string, description?: string, location?: string, start_time?: DateTime | number, end_time?: DateTime | number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain').withData({});
    if (title) {
      options.data.title = title;
    }
    if (description) {
      options.data.description = description;
    }
    if (location) {
      options.data.location = location;
    }
    if (start_time) {
      options.data.start_time = (Util.toDateTime(start_time) as DateTime).toMillis();
    }
    if (end_time) {
      options.data.end_time = (Util.toDateTime(end_time) as DateTime).toMillis();
    }
    return this.http
      .post('/api/v2/event/' + id, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return CalendarEvent.fromRest(data.event);
      });
  }

  /**
   * Retrieve the list of events for a given day.
   */
  public async getDay(date: DateTime | number, mine?: boolean) {
    const epoch = (Util.toDateTime(date) as DateTime).toMillis();
    let url = '/api/v2/event/day/' + epoch;
    if (mine) {
      url = '/api/v2/event/mine/' + epoch;
    }
    return this.http
      .get(url, new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        const events = data.events.map((e: any) => CalendarEvent.fromRest(e));
        return events.sort(sortEvents);
      });
  }
}
