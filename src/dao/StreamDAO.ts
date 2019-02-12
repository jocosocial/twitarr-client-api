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
}
