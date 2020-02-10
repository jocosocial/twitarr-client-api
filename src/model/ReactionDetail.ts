import { User } from './User';
import { Util } from '../internal/Util';

/**
 * Represents a reaction.
 * @module ReactionDetail
 */
export class ReactionDetail {
  public static fromRest(data: any) {
    return new ReactionDetail(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'reaction', 'user');

    this.reaction = data.reaction;
    this.user = User.fromRest(data.user);
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
