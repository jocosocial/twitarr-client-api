import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a Twit-arr user.
 * @module User
 */
export class User {
  public static fromRest(data: any) {
    const ret = new User();
    for (const key of ['username', 'email', 'display_name', 'empty_password', 'unnoticed_alerts']) {
      if (!Util.isEmpty(data[key])) {
        ret[key] = data[key];
      }
    }
    /*
    if (!Util.isEmpty(data.role)) {
      ret.role = Role.fromRest(data.role);
    }
    */
    if (!Util.isEmpty(data.last_login)) {
      ret.last_login = Util.toMoment(data.last_login);
    }
    if (!Util.isEmpty(data.last_photo_updated)) {
      ret.last_photo_updated = Util.toMoment(data.last_photo_updated);
    }
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

  /** Whether the user has un-noticed alerts. */
  public unnoticed_alerts: boolean;

  /** The last time the user logged in. */
  public last_login: Moment;

  /** The last time the user's photo was updated. */
  public last_photo_updated: Moment;
}
