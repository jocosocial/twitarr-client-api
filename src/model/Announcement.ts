import { DateTime } from 'luxon';

import { Util } from '../internal/Util';

import { User } from './User';

/**
 * Represents a calendar event.
 * @module Announcement
 */
export class Announcement {
  public static fromRest(data: any) {
    return new Announcement(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'id', 'author', 'text', 'timestamp');
    this.id = data.id;
    this.author = User.fromRest(data.author);
    this.text = data.text;
    this.timestamp = Util.toDateTime(data.timestamp) as DateTime;
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
