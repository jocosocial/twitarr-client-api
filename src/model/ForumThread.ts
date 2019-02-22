import { Moment } from 'moment';

import { Util } from '../internal/Util';

import { ForumPost } from './ForumPost';
import { User } from './User';

/**
 * Represents a forum thread.
 * @module ForumThread
 */
export class ForumThread {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'subject', 'sticky', 'locked', 'posts');

    const ret = new ForumThread();
    Util.setProperties(
      ret,
      data,
      'id',
      'subject',
      'sticky',
      'locked',
      'last_post_page',
      'count',
      'new_posts',
      'next_page',
      'prev_page',
      'page_count',
      'post_count',
      'latest_read',
    );
    Util.setDateProperties(ret, data, 'timestamp', 'latest_read');
    if (data.last_post_author) {
      ret.last_post_author = User.fromRest(data.last_post_author);
    }
    if (Array.isArray(data.posts)) {
      ret.posts = data.posts.map(post => ForumPost.fromRest(post));
    } else if (typeof data.posts === 'number') {
      ret.post_count = parseInt(data.posts, 10);
    }
    return ret;
  }

  /** The unique thread ID. */
  public id: string;

  /** The thread's subject */
  public subject: string;

  /** Whether the thread is sticky */
  public sticky: boolean;

  /** Whether the thread is locked */
  public locked: boolean;

  /** The last user to post to the thread */
  public last_post_author: User;

  /** The posts in this thread */
  public posts: ForumPost[] = [];

  /** The last time the thread was posted to */
  public timestamp: Moment;

  /** The last page read in the thread */
  public last_post_page: number;

  /** Number of posts since last viewed */
  public count: number;

  /** Whether the thread has new posts */
  public new_posts: boolean;

  /** The next page in the thread */
  public next_page: number;

  /** The previous page in the thread */
  public previous_page: number;

  /** How many pages there are in the thread */
  public page_count: number;

  /** How many posts there are in the thread */
  public post_count: number;

  /** The timestamp of the latest read post */
  public latest_read: Moment;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(
      ret,
      this,
      'id',
      'subject',
      'sticky',
      'locked',
      'last_post_page',
      'count',
      'new_posts',
      'next_page',
      'prev_page',
      'page_count',
      'post_count',
      'latest_read',
    );
    Util.setDateProperties(ret, this, 'timestamp', 'latest_read');
    if (this.last_post_author) {
      ret.last_post_author = this.last_post_author.toJSON();
    }
    ret.posts = this.posts.map(post => ForumPost.fromRest(post));
    return ret;
  }
}
