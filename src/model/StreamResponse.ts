import { DateTime } from 'luxon';

import { Util } from '../internal/Util';
import { StreamPost } from './StreamPost';
import { TwitarrError } from '../api/TwitarrError';

export class StreamResponse {
  public static fromRest(data: any) {
    return new StreamResponse(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'has_next_page');
    this.has_next_page = data.has_next_page;

    if (Util.isEmpty(data.stream_posts, data.stream_post, data.post)) {
      throw new TwitarrError('At least one of stream_posts, stream_post, or posts is expected on the response!', undefined, undefined, undefined, data);
    }

    Util.setDateProperties(this, data, 'next_page');
    if (!Util.isEmpty(data.stream_posts)) {
      this.posts = data.stream_posts.map((post: any) => StreamPost.fromRest(post));
      this.is_thread = false;
    }
    if (!Util.isEmpty(data.stream_post)) {
      this.posts = [StreamPost.fromRest(data.stream_post)];
      this.is_thread = true;
    }
    if (!Util.isEmpty(data.post)) {
      this.posts = [StreamPost.fromRest(data.post)];
      this.is_thread = true;
    }
  }

  /** Whether there are more posts to retrieve. */
  public has_next_page: boolean;

  /** The timestamp of the next page. */
  public next_page: DateTime | undefined;

  /** The stream posts. */
  public posts: StreamPost[] = [];

  public get post() {
    if (this.posts && this.posts.length >= 2) {
      throw new TwitarrError('StreamResponse has more than one post!');
    }
    return this.posts[0];
  }

  /** Whether this is a single thread or multiple posts. */
  public is_thread = false;

  public toJSON() {
    const ret = {} as any;
    Util.setEpochProperties(ret, this, 'next_page');
    ret.has_next_page = this.has_next_page;
    if (ret.is_thread) {
      ret.post = this.posts;
    } else {
      ret.stream_posts = this.posts;
    }
    return ret;
  }
}
