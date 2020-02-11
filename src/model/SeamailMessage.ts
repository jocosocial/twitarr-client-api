import { Moment } from 'moment';
import hashFunc from 'string-hash';

import { User } from './User';

import { Util } from '../internal/Util';

/**
 * Represents a Seamail message.
 * @module SeamailMessage
 */
export class SeamailMessage {
  public static fromRest(data: any) {
    return new SeamailMessage(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'id', 'text', 'timestamp');
    this.id = data.id;
    this.text = data.text;
    this.timestamp = Util.toDateTime(data.timestamp) as Moment;

    let hash = data.id + '/' + data.timestamp + '/' + data.text;

    if (!Util.isEmpty(data.author)) {
      hash += '/' + data.author.username;
      this.author = User.fromRest(data.author);
    }

    if (!Util.isEmpty(data.read_users)) {
      this.read_users = data.read_users.map((user: any) => User.fromRest(user));
    }
    this.hash = hashFunc(hash);
  }

  /** The unique id. */
  public id: string;

  /** The user that wrote the message. */
  public author?: User;

  /** The text (contents) of the message. */
  public text: string;

  /** The time the message was created. */
  public timestamp: Moment;

  /** The users who have read the message. */
  public read_users: User[] = [];

  /** A unique hash of this message. */
  public hash: number;

  public toJSON() {
    return {
      id: this.id,
      read_users: this.read_users.map(user => user.toJSON()),
      text: this.text,
      timestamp: this.timestamp.valueOf(),
    };
  }
}
