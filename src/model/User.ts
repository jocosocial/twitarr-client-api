import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a Twit-arr user.
 * @module User
 */
export class User {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'username');

    const ret = new User();

    Util.setProperties(
      ret,
      data,
      'username',
      'email',
      'display_name',
      'empty_password',
      'room_number',
      'real_name',
      'starred',
      'comment',
      'pronouns',
      'home_location',
      'unnoticed_alerts',
      'number_of_tweets',
      'number_of_mentions',
    );
    Util.setDateProperties(ret, data, 'last_login', 'last_photo_updated');

    return ret;
  }

  /** The unique username. */
  public username: string;

  /** The user's role. */
  public role: string;

  /** The user's e-mail address. */
  public email: string;

  /** The user's display name. */
  public display_name: string;

  /** Whether the user has an empty password. */
  public empty_password: boolean;

  /** The last time the user logged in. */
  public last_login: Moment;

  /** The last time the user's photo was updated. */
  public last_photo_updated: Moment;

  /** The user's room number. */
  public room_number: number;

  /** The user's real name. */
  public real_name: string;

  /** The user's preferred pronouns. */
  public pronouns: string;

  /** The user's home location. */
  public home_location: string;

  /** Whether the user has un-noticed alerts. */
  public unnoticed_alerts: boolean;

  /** The number of tweets the user has posted. */
  public number_of_tweets: number;

  /** The number of times the user has been mentioned. */
  public number_of_mentions: number;

  /** Whether this user is starred. */
  public starred: boolean;

  /** A comment about the user, if any. */
  public comment: string;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(
      ret,
      this,
      'username',
      'email',
      'display_name',
      'empty_password',
      'room_number',
      'real_name',
      'starred',
      'comment',
      'pronouns',
      'home_location',
      'unnoticed_alerts',
      'number_of_tweets',
      'number_of_mentions',
    );
    if (!Util.isEmpty(this.last_login)) {
      ret.last_login = this.last_login.valueOf();
    }
    if (!Util.isEmpty(this.last_photo_updated)) {
      ret.last_photo_updated = this.last_photo_updated.valueOf();
    }
    return ret;
  }

  public getDisplayName() {
    return Util.isEmpty(this.display_name) ? '@' + this.username : this.display_name;
  }

  public toString() {
    let ret = '@' + this.username;
    if (!Util.isEmpty(this.display_name) && this.display_name !== this.username) {
      ret += ' (' + this.display_name + ')';
    }
    return ret;
  }
}
