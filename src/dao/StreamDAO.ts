import { AbstractDAO } from './AbstractDAO';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { StreamResponse } from '../model/StreamResponse';
import { Util } from '../internal/Util';
import { Moment } from 'moment';

export interface IStreamOptions {
  /** limit posts to those written by the specified username */
  author?: string;

  /** limit posts to those containing the specified hashtag */
  hashtag?: string;

  /** whether to include the author in `mentions` queries */
  include_author?: boolean;

  /** return at most `limit` posts. */
  limit?: number;

  /** limit posts to those mentioning the specified username */
  mentions?: string;

  /** whether to return posts newer or older than `start` */
  newer_posts?: boolean;

  /** limit posts to those by starred (followed) users */
  starred?: boolean;

  /** the starting date to query */
  start?: Moment;
}

export class StreamDAO extends AbstractDAO {
  public async posts(streamOptions?: IStreamOptions) {
    const options = new TwitarrHTTPOptions()
      .withParameter('app', 'plain');
    if (streamOptions) {
      Util.setProperties(options.parameters, streamOptions,
        'author',
        'hashtag',
        'include_author',
        'limit',
        'mentions',
        'newer_posts',
        'starred',
      );
      if (streamOptions.start) {
        options.parameters.start = '' + streamOptions.start.valueOf();
      }
    }
    return this.http.get('/api/v2/stream', options).then((result) => {
      return StreamResponse.fromRest(result.data);
    });
  }

  public async thread(id: string, limit?: number, page?: number) {
    const options = new TwitarrHTTPOptions()
      .withParameter('app', 'plain');
    if (!Util.isEmpty(limit)) {
      options.parameters.limit = '' + limit;
    }
    if (!Util.isEmpty(page)) {
      options.parameters.page = '' + page;
    }
    return this.http.get('/api/v2/thread/' + id, options).then((result) => {
      return StreamResponse.fromRest(result.data);
    });
  }

  public async mentions(username: string, limit?: number, page?: number, after?: Moment) {
    const options = new TwitarrHTTPOptions()
      .withParameter('app', 'plain');
    if (!Util.isEmpty(limit)) {
      options.parameters.limit = '' + limit;
    }
    if (!Util.isEmpty(page)) {
      options.parameters.page = '' + page;
    }
    if (!Util.isEmpty(after)) {
      options.parameters.after = '' + after.valueOf();
    }
    return this.http.get('/api/v2/stream/m/' + username, options).then((result) => {
      return StreamResponse.fromRest(result.data);
    });
  }

  public async hashtag(hashtag: string, limit?: number, page?: number, after?: Moment) {
    const options = new TwitarrHTTPOptions()
      .withParameter('app', 'plain');
    if (!Util.isEmpty(limit)) {
      options.parameters.limit = '' + limit;
    }
    if (!Util.isEmpty(page)) {
      options.parameters.page = '' + page;
    }
    if (!Util.isEmpty(after)) {
      options.parameters.after = '' + after.valueOf();
    }
    return this.http.get('/api/v2/stream/h/' + hashtag, options).then((result) => {
      return StreamResponse.fromRest(result.data);
    });
  }

  public async send(message: string, parent?: string, photo?: string) {
    const options = new TwitarrHTTPOptions()
      .withData({
        text: message,
      });
    if (!Util.isEmpty(parent)) {
      options.data.parent = parent;
    }
    if (!Util.isEmpty(photo)) {
      options.data.photo = photo;
    }
    return this.http.post('/api/v2/stream', options).then((result) => {
      return StreamResponse.fromRest(result.data);
    });
  }

  public async updatePost(id: string, message: string, photo?: string) {
    const options = new TwitarrHTTPOptions()
      .withData({
        text: message,
      });
    if (!Util.isEmpty(photo)) {
      options.data.photo = photo;
    }
    return this.http.post('/api/v2/tweet/' + id, options).then((result) => {
      return StreamResponse.fromRest(result.data);
    });
  }

  public async deletePost(id: string) {
    return this.http.httpDelete('/api/v2/tweet/' + id).then(() => {
      return true;
    });
  }

  public async lockPost(id: string) {
    return this.http.post('/api/v2/tweet/' + id + '/locked/true').then((result) => {
      return result.data.locked as boolean;
    });
  }

  public async unlockPost(id: string) {
    return this.http.post('/api/v2/tweet/' + id + '/locked/false').then((result) => {
      return result.data.locked as boolean;
    });
  }
}
