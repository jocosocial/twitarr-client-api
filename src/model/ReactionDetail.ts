import { User } from './User';
import { Util } from '../internal/Util';

/**
 * Represents a reaction.
 * @module ReactionDetail
 */
export class ReactionDetail {
  public static fromRest(data: any) {
    const ret = new ReactionDetail();
    if (!Util.isEmpty(data)) {
      ret.reaction = data.reaction;
      if (!Util.isEmpty(data.user)) {
        ret.user = User.fromRest(data.user);
      }
    }
    return ret;
  }

  /** The reaction. */
  public reaction: string;

  /** The user who reacted. */
  public user: User;

  public toJSON() {
    return {
      reaction: this.reaction,
      user: this.user.toJSON(),
    };
  }
}
