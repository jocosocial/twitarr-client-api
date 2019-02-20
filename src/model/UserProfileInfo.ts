import { User } from './User';
import { StreamPost } from './StreamPost';

import { Util } from '../internal/Util';

export class UserProfileInfo {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'user');

    const ret = new UserProfileInfo();

    ret.user = User.fromRest(data.user);
    if (!Util.isEmpty(data.recent_tweets)) {
      ret.recentStreamPosts = data.recent_tweets.map(tweet => StreamPost.fromRest(tweet));
    }

    if (!Util.isEmpty(data.comment)) {
      ret._comment = data.comment;
    }
    if (!Util.isEmpty(data.starred)) {
      ret._starred = data.starred;
    }

    return ret;
  }

  /**
   * A comment about the user
   * @hidden
   */
  private _comment: string;

  /**
   * Whether the user is starred
   * @hidden
   */
  public _starred: boolean;

  /** The user */
  public user: User;

  /** The user's recent posts */
  public recentStreamPosts: StreamPost[] = [];

  /** A comment about the user */
  public get comment() {
    if (this._comment !== undefined) {
      return this._comment;
    }
    if (this.user) {
      return this.user.comment;
    }
    return undefined;
  }

  /** Whether the user is starred */
  public get starred() {
    if (this._starred !== undefined) {
      return this._starred;
    }
    if (this.user && this.user.starred !== undefined) {
      return this.user.starred;
    }
    return false;
  }
}
