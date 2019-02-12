import { Moment } from 'moment';

import { Util } from '../internal/Util';
import { StreamPost } from './StreamPost';

export class StreamResponse {
  public static fromRest(data: any) {
    const ret = new StreamResponse();

    if (!Util.isEmpty(data)) {
      Util.setProperties(ret, data, 'has_next_page');
      Util.setDateProperties(ret, data, 'next_page');
      if (!Util.isEmpty(data.stream_posts)) {
        ret.stream_posts = data.stream_posts.map((post) => StreamPost.fromRest(post));
      }
    }

    return ret;
  }

  /** Whether there are more posts to retrieve. */
  public has_next_page: boolean;

  /** The timestamp of the next page. */
  public next_page: Moment;

  /** The stream posts. */
  public stream_posts: StreamPost[] = [];

  public toJSON() {
    return this;
  }
}
