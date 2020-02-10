import { User } from './User';
import { StreamPost } from './StreamPost';

import { Util } from '../internal/Util';

export class UserProfileInfo {
  public static fromRest(data: any) {
    return new UserProfileInfo(data);
  }

  constructor(data: any) {
    Util.assertHasProperties(data, 'user');
    this.user = User.fromRest(data.user);

    if (!Util.isEmpty(data.recent_tweets)) {
      this.recentStreamPosts = data.recent_tweets.map((tweet: any) => StreamPost.fromRest(tweet));
    }

    if (!Util.isEmpty(data.comment)) {
      this._comment = data.comment;
    }
    if (!Util.isEmpty(data.starred)) {
      this._starred = data.starred;
    }
  }

  /**
   * A comment about the user
   * @hidden
   */
  private _comment: string | undefined;

  /**
   * Whether the user is starred
   * @hidden
   */
  public _starred: boolean | undefined;

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
