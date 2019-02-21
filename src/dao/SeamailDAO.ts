import { Moment } from 'moment';

import { AbstractDAO } from './AbstractDAO';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { SeamailResponse } from '../model/SeamailResponse';
import { TwitarrError } from '../api/TwitarrError';
import { SeamailMessage } from '../model/SeamailMessage';

export class SeamailDAO extends AbstractDAO {
  public async get(id: string, skip_mark_read?: boolean) {
    if (!id) {
      throw new TwitarrError('id is required!');
    }
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (skip_mark_read) {
      options.parameters.skip_mark_read = 'true';
    }
    return this.http
      .get('/api/v2/seamail/' + id, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return SeamailResponse.fromRest(data);
      });
  }

  public async getMetadata(unread?: boolean, after?: Moment) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (unread) {
      options.parameters.unread = 'true';
    }
    if (after) {
      options.parameters.after = '' + after.valueOf();
    }
    return this.http
      .get('/api/v2/seamail', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return SeamailResponse.fromRest(data);
      });
  }

  public async getThreads(unread?: boolean, exclude_read_messages?: boolean, after?: Moment) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (unread) {
      options.parameters.unread = 'true';
    }
    if (exclude_read_messages) {
      options.parameters.exclude_read_messages = 'true';
    }
    if (after) {
      options.parameters.after = '' + after.valueOf();
    }
    return this.http.get('/api/v2/seamail_threads', options).then(result => {
      return SeamailResponse.fromRest(result.data);
    });
  }

  public async create(subject: string, message: string, ...users: string[]) {
    const options = new TwitarrHTTPOptions();
    options.data = {
      subject: subject,
      text: message,
      users: users,
    };
    return this.http.post('/api/v2/seamail', options).then(result => {
      return SeamailResponse.fromRest(result.data);
    });
  }

  public async post(id: string, message: string) {
    const options = new TwitarrHTTPOptions();
    options.data = { text: message };
    return this.http.post('/api/v2/seamail/' + id, options).then(result => {
      return SeamailMessage.fromRest(result.data.seamail_message);
    });
  }

  public async unreadCount() {
    return this.http.get('/api/v2/user/new_seamail').then(result => {
      return result.data.email_count;
    });
  }
}
