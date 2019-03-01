import { DateTime } from 'luxon';

import { Util } from '../internal/Util';

import { PhotoDetails } from './PhotoDetails';
import { User } from './User';

/**
 * Represents a forum post.
 * @module ForumPost
 */
export class ForumPost {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'forum_id', 'author', 'timestamp');

    const ret = new ForumPost();
    Util.setProperties(ret, data, 'id', 'forum_id', 'thread_locked', 'text');
    Util.setDateProperties(ret, data, 'timestamp');
    if (!Util.isEmpty(data.new)) {
      ret.is_new = data.new;
    }
    if (!Util.isEmpty(data.author)) {
      ret.author = User.fromRest(data.author);
    }
    if (!Util.isEmpty(data.photos)) {
      ret.photos = data.photos.map(photo => PhotoDetails.fromRest(photo));
    }
    return ret;
  }

  /** The unique post ID. */
  public id: string;

  /** The containing forum's ID */
  public forum_id: string;

  /** The author of the post */
  public author: User;

  /** Whether the thread is locked */
  public thread_locked: boolean;

  /** The contents of the post */
  public text: string;

  /** The time the post was made */
  public timestamp: DateTime;

  /** Photos in the post */
  public photos: PhotoDetails[] = [];

  /** Whether the post is unread/new */
  public is_new: boolean;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(ret, this, 'id', 'forum_id', 'thread_locked', 'text');
    Util.setEpochProperties(ret, this, 'timestamp');
    ret.author = this.author.toJSON();
    ret.photos = this.photos.map(photo => photo.toJSON());
    return ret;
  }
}
