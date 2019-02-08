import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a Twit-arr user.
 * @module User
 */
export class User {
  public static fromRest(data: any) {
    const ret = new User();
    Util.setProperties(ret, data, 'username', 'email', 'display_name', 'empty_password', 'unnoticed_alerts');
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

  /** Whether the user has un-noticed alerts. */
  public unnoticed_alerts: boolean;

  /** The last time the user logged in. */
  public last_login: Moment;

  /** The last time the user's photo was updated. */
  public last_photo_updated: Moment;
}
