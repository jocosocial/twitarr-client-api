import { Moment } from 'moment';

import { SeamailMessage } from './SeamailMessage';
import { User } from './User';

import { Util } from '../internal/Util';

/**
 * Represents a Seamail thread.
 * @module SeamailThread
 */
export class SeamailThread {
  public static fromRest(data: any) {
    return new SeamailThread(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'id', 'subject', 'timestamp');

    this.id = data.id;
    this.subject = data.subject;
    this.timestamp = Util.toDateTime(data.timestamp) as Moment;

    Util.setProperties(this, data, 'message_count', 'count_is_unread', 'is_unread');
    if (!Util.isEmpty(data.users)) {
      this.users = data.users.map((user: any) => User.fromRest(user));
    }
    if (!Util.isEmpty(data.messages)) {
      this.messages = data.messages.map((message: any) => SeamailMessage.fromRest(message));
    }
  }

  /** The unique thread id. */
  public id: string;

  /** The users involved in the message. */
  public users: User[] = [];

  /** The subject of the thread. */
  public subject: string;

  /** The messages in the thread. */
  public messages: SeamailMessage[] = [];

  /** The number of messages (or unread messages) in the thread. */
  public message_count?: number;

  /** The time the most recent message was created. */
  public timestamp: Moment;

  /** Whether `message_count` is unread or total. */
  public count_is_unread = false;

  /** Whether there are unread messages in the thread. */
  public is_unread = false;

  public toJSON() {
    const ret = {} as any;
    Util.setProperties(ret, this, 'id', 'subject', 'message_count', 'count_is_unread', 'is_unread');
    Util.setEpochProperties(ret, this, 'timestamp');
    ret.users = this.users.map(user => user.toJSON());
    ret.messages = this.messages.map(message => message.toJSON());
    return ret;
  }
}
