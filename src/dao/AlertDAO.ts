import { Moment } from 'moment';

import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { AlertResponse } from '../model/AlertResponse';

import { AbstractDAO } from './AbstractDAO';

interface IAlertCounts {
  unnoticed_announcements: number;
  unnoticed_alerts: boolean;
  seamail_unread_count: number;
  unnoticed_mentions: number;
  unnoticed_upcoming_events: number;
}

export class AlertDAO extends AbstractDAO {
  /**
   * Retrieve an alert response containing all posts/etc. that are un-viewed.
   */
  public async get(last_checked_time?: Moment, no_reset?: boolean) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (last_checked_time) {
      options.parameters.last_checked_time = '' + last_checked_time.valueOf();
    }
    if (no_reset) {
      options.parameters.no_reset = '' + no_reset;
    }
    return this.http
      .get('/api/v2/alerts', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return AlertResponse.fromRest(data);
      });
  }

  public async count(last_checked_time?: Moment) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (last_checked_time) {
      options.parameters.last_checked_time = '' + last_checked_time.valueOf();
    }
    return this.http
      .get('/api/v2/alerts/check', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.alerts as IAlertCounts;
      });
  }
}
