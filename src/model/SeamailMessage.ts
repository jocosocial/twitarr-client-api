import { User } from './User';

import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a Seamail message.
 * @module SeamailMessage
 */
export class SeamailMessage {
  public static fromRest(data: any) {
    const ret = new SeamailMessage();

    if (!Util.isEmpty(data)) {
      Util.setProperties(ret, data, 'id', 'text');
      Util.setDateProperties(ret, data, 'timestamp');

      if (!Util.isEmpty(data.author)) {
        ret.author = User.fromRest(data.author);
      }

      if (!Util.isEmpty(data.read_users)) {
        ret.read_users = data.read_users.map(user => User.fromRest(user));
      }
    }

    return ret;
  }

  /** The unique id. */
  public id: string;

  /** The user that wrote the message. */
  public author: User;

  /** The text (contents) of the message. */
  public text: string;

  /** The time the message was created. */
  public timestamp: Moment;

  /** The users who have read the message. */
  public read_users: User[] = [];

  public toJSON() {
    return {
      author: this.author.toJSON(),
      id: this.id,
      read_users: this.read_users.map(user => user.toJSON()),
      text: this.text,
      timestamp: this.timestamp,
    };
  }
}
