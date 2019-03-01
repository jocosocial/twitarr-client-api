import { DateTime } from 'luxon';

import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { AlertResponse } from '../model/AlertResponse';

import { Util } from '../internal/Util';

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
  public async get(last_checked_time?: DateTime | number, no_reset?: boolean) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (last_checked_time) {
      options.parameters.last_checked_time = '' + Util.toDateTime(last_checked_time).toMillis();
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

  public async lastChecked(last_checked_time: DateTime | number) {
    const options = new TwitarrHTTPOptions().withData({
      last_checked_time: Util.toDateTime(last_checked_time).toMillis(),
    });

    return this.http
      .post('/api/v2/alerts/last_checked', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return Util.toDateTime(data.last_checked_time);
      });
  }

  public async count(last_checked_time?: DateTime | number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (last_checked_time) {
      options.parameters.last_checked_time = '' + Util.toDateTime(last_checked_time).toMillis();
    }
    return this.http
      .get('/api/v2/alerts/check', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.alerts as IAlertCounts;
      });
  }
}
