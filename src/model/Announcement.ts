import { DateTime } from 'luxon';

import { Util } from '../internal/Util';

import { User } from './User';

/**
 * Represents a calendar event.
 * @module Announcement
 */
export class Announcement {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'author', 'text', 'timestamp');

    const ret = new Announcement();
    Util.setProperties(ret, data, 'id', 'text');
    Util.setDateProperties(ret, data, 'timestamp');
    if (!Util.isEmpty(data.author)) {
      ret.author = User.fromRest(data.author);
    }

    return ret;
  }

  /** The unique announcement ID. */
  public id: string;

  /** The announcement's author. */
  public author: User;

  /** The text of the announcement. */
  public text: string;

  /** The announcement time. */
  public timestamp: DateTime;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(ret, this, 'id', 'author', 'text');
    Util.setEpochProperties(ret, this, 'timestamp');
    return ret;
  }
}
