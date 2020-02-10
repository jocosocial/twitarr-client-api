import { DateTime } from 'luxon';

import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { ReactionsSummary } from '../model/ReactionsSummary';
import { StreamResponse } from '../model/StreamResponse';

import { Util } from '../internal/Util';

import { AbstractDAO } from './AbstractDAO';

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
  start?: DateTime | number;
}

export class StreamDAO extends AbstractDAO {
  /**
   * Retrieve a collection of twarrts.
   */
  public async posts(streamOptions?: IStreamOptions) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (streamOptions) {
      Util.setProperties(options.parameters, streamOptions, 'author', 'hashtag', 'include_author', 'limit', 'mentions', 'newer_posts', 'starred');
      if (streamOptions.start) {
        options.parameters.start = String((Util.toDateTime(streamOptions.start) as DateTime).toMillis());
      }
    }
    return this.http.get('/api/v2/stream', options).then(result => {
      return StreamResponse.fromRest(result.data);
    });
  }

  /**
   * Retrieve a particular twarrt (including its children).
   */
  public async thread(id: string, limit?: number, page?: number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (!Util.isEmpty(limit)) {
      options.parameters.limit = String(limit);
    }
    if (!Util.isEmpty(page)) {
      options.parameters.page = String(page);
    }
    return this.http.get('/api/v2/thread/' + id, options).then(result => {
      return StreamResponse.fromRest(result.data);
    });
  }

  /**
   * Retrieve a list of twarrts that mention a particular user.
   */
  public async mentions(username: string, limit?: number, page?: number, after?: DateTime | number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (!Util.isEmpty(limit)) {
      options.parameters.limit = String(limit);
    }
    if (!Util.isEmpty(page)) {
      options.parameters.page = String(page);
    }
    if (after !== undefined) {
      options.parameters.after = String((Util.toDateTime(after) as DateTime).toMillis());
    }
    return this.http.get('/api/v2/stream/m/' + username, options).then(result => {
      return StreamResponse.fromRest(result.data);
    });
  }

  /**
   * Retrieve a list of twarrts that contain a particular hashtag.
   */
  public async hashtag(hashtag: string, limit?: number, page?: number, after?: DateTime | number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (!Util.isEmpty(limit)) {
      options.parameters.limit = String(limit);
    }
    if (!Util.isEmpty(page)) {
      options.parameters.page = String(page);
    }
    if (after !== undefined) {
      options.parameters.after = String((Util.toDateTime(after) as DateTime).toMillis());
    }
    return this.http.get('/api/v2/stream/h/' + hashtag, options).then(result => {
      return StreamResponse.fromRest(result.data);
    });
  }

  /**
   * Send a new twarrt.
   */
  public async send(message: string, parent?: string, photo?: string) {
    const options = new TwitarrHTTPOptions().withData({
      text: message,
    });
    if (!Util.isEmpty(parent)) {
      options.data.parent = parent;
    }
    if (!Util.isEmpty(photo)) {
      options.data.photo = photo;
    }
    return this.http.post('/api/v2/stream', options).then(result => {
      return StreamResponse.fromRest(result.data);
    });
  }

  /**
   * Edit an existing twarrt.
   */
  public async updatePost(id: string, message: string, photo?: string) {
    const options = new TwitarrHTTPOptions().withData({
      text: message,
    });
    if (!Util.isEmpty(photo)) {
      options.data.photo = photo;
    }
    return this.http.post('/api/v2/tweet/' + id, options).then(result => {
      return StreamResponse.fromRest(result.data);
    });
  }

  /**
   * Delete a twarrt.
   */
  public async deletePost(id: string) {
    return this.http.httpDelete('/api/v2/tweet/' + id).then(() => {
      return true;
    });
  }

  /**
   * Lock a twarrt.
   */
  public async lockPost(id: string) {
    return this.http.post('/api/v2/tweet/' + id + '/locked/true').then(result => {
      return result.data.locked as boolean;
    });
  }

  /**
   * Unlock a twarrt.
   */
  public async unlockPost(id: string) {
    return this.http.post('/api/v2/tweet/' + id + '/locked/false').then(result => {
      return result.data.locked as boolean;
    });
  }

  /**
   * Retrieve the reactions to a twarrt.
   */
  public async reactions(id: string) {
    return this.http.get('/api/v2/tweet/' + id + '/react').then(result => {
      return ReactionsSummary.fromRest(result.data.reactions);
    });
  }

  /**
   * Add a reaction to a twarrt.
   */
  public async react(id: string, reaction: string) {
    return this.http.post('/api/v2/tweet/' + id + '/react/' + reaction).then(result => {
      return ReactionsSummary.fromRest(result.data.reactions);
    });
  }

  /**
   * Remove a reaction from a twarrt.
   */
  public async deleteReact(id: string, reaction: string) {
    return this.http.httpDelete('/api/v2/tweet/' + id + '/react/' + reaction).then(result => {
      return ReactionsSummary.fromRest(result.data.reactions);
    });
  }
}
