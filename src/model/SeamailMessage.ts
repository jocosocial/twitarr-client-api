import { DateTime } from 'luxon';
import * as hashFunc from 'string-hash';

import { User } from './User';

import { Util } from '../internal/Util';

/**
 * Represents a Seamail message.
 * @module SeamailMessage
 */
export class SeamailMessage {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'text', 'timestamp');

    const ret = new SeamailMessage();
    var hash = data.id + '/' + data.timestamp + '/' + data.text;

    Util.setProperties(ret, data, 'id', 'text');
    Util.setDateProperties(ret, data, 'timestamp');

    if (!Util.isEmpty(data.author)) {
      hash += '/' + data.author.username;
      ret.author = User.fromRest(data.author);
    }

    if (!Util.isEmpty(data.read_users)) {
      ret.read_users = data.read_users.map(user => User.fromRest(user));
    }
    ret.hash = hashFunc(hash);

    return ret;
  }

  /** The unique id. */
  public id: string;

  /** The user that wrote the message. */
  public author: User;

  /** The text (contents) of the message. */
  public text: string;

  /** The time the message was created. */
  public timestamp: DateTime;

  /** The users who have read the message. */
  public read_users: User[] = [];

  /** A unique hash of this message. */
  public hash: string;

  public toJSON() {
    return {
      id: this.id,
      read_users: this.read_users.map(user => user.toJSON()),
      text: this.text,
      timestamp: this.timestamp.toMillis(),
    };
  }
}
