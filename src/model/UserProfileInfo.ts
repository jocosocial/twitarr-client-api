import { User } from './User';
import { StreamPost } from './StreamPost';

import { Util } from '../internal/Util';

export class UserProfileInfo {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'user');

    const ret = new UserProfileInfo();
    Util.setProperties(ret, data, 'starred', 'comment');
    ret.user = User.fromRest(data.user);
    if (!Util.isEmpty(data.recent_tweets)) {
      ret.recentStreamPosts = data.recent_tweets.map(tweet => StreamPost.fromRest(tweet));
    }
    return ret;
  }

  /** The user */
  public user: User;

  /** The user's recent posts */
  public recentStreamPosts: StreamPost[] = [];

  /** Whether the user is starred */
  public starred: boolean = false;

  /** A comment about the user */
  public comment: string;
}
