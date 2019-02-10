import { Moment } from 'moment';

import { AbstractDAO } from './AbstractDAO';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { SeamailResponse } from '../model/SeamailResponse';

export class SeamailDAO extends AbstractDAO {
  public async getMetadata(unread?: boolean, after?: Moment) {
    const options = new TwitarrHTTPOptions();
    if (unread) {
      options.parameters.unread = 'true';
    }
    if (after) {
      options.parameters.after = '' + after.valueOf();
    }
    return this.http.get('/api/v2/seamail', options).then((result) => {
      return SeamailResponse.fromRest(result.data);
    });
  }

  public async getThreads(unread?: boolean, exclude_read_messages?: boolean, after?: Moment) {
    const options = new TwitarrHTTPOptions();
    if (unread) {
      options.parameters.unread = 'true';
    }
    if (exclude_read_messages) {
      options.parameters.exclude_read_messages = 'true';
    }
    if (after) {
      options.parameters.after = '' + after.valueOf();
    }
    return this.http.get('/api/v2/seamail_threads', options).then((result) => {
      return SeamailResponse.fromRest(result.data);
    });
  }
}
