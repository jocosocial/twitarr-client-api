import { Moment } from 'moment';

import { Util } from '../internal/Util';
import { StreamPost } from './StreamPost';
import { TwitarrError } from '../api/TwitarrError';

export class StreamResponse {
  public static fromRest(data: any) {
    const ret = new StreamResponse();

    if (!Util.isEmpty(data)) {
      Util.setProperties(ret, data, 'has_next_page');
      Util.setDateProperties(ret, data, 'next_page');
      if (!Util.isEmpty(data.stream_posts)) {
        ret.posts = data.stream_posts.map(post => StreamPost.fromRest(post));
        ret.is_thread = false;
      }
      if (!Util.isEmpty(data.stream_post)) {
        ret.posts = [StreamPost.fromRest(data.stream_post)];
        ret.is_thread = true;
      }
      if (!Util.isEmpty(data.post)) {
        ret.posts = [StreamPost.fromRest(data.post)];
        ret.is_thread = true;
      }
    }

    return ret;
  }

  /** Whether there are more posts to retrieve. */
  public has_next_page: boolean;

  /** The timestamp of the next page. */
  public next_page: Moment;

  /** The stream posts. */
  public posts: StreamPost[] = [];

  public get post() {
    if (this.posts && this.posts.length >= 2) {
      throw new TwitarrError('StreamResponse has more than one post!');
    }
    return this.posts[0];
  }

  /** Whether this is a single thread or multiple posts. */
  public is_thread: boolean = false;

  public toJSON() {
    const ret = {} as any;
    ret.has_next_page = this.has_next_page;
    ret.next_page = this.next_page;
    if (ret.is_thread) {
      ret.post = this.posts;
    } else {
      ret.stream_posts = this.posts;
    }
    return ret;
  }
}
