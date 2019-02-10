import { SeamailMessage } from './SeamailMessage';
import { User } from './User';

import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a Seamail thread.
 * @module SeamailThread
 */
export class SeamailThread {
  public static fromRest(data: any) {
    const ret = new SeamailThread();

    if (!Util.isEmpty(data)) {
      Util.setProperties(ret, data, 'id', 'subject', 'message_count', 'count_is_unread', 'is_unread');
      Util.setDateProperties(ret, data, 'timestamp');
      if (!Util.isEmpty(data.users)) {
        ret.users = data.users.map((user) => User.fromRest(user));
      }
      if (!Util.isEmpty(data.messages)) {
        ret.messages = data.messages.map((message) => SeamailMessage.fromRest(message));
      }
    }

    return ret;
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
  public message_count: number;

  /** The time the most recent message was created. */
  public timestamp: Moment;

  /** Whether `message_count` is unread or total. */
  public count_is_unread: false;

  /** Whether there are unread messages in the thread. */
  public is_unread: false;

  public toJSON() {
    const ret = { } as any;
    Util.setProperties(ret, this, 'id', 'subject', 'message_count', 'count_is_unread', 'is_unread');
    ret.users = this.users.map((user) => user.toJSON());
    ret.messages = this.messages.map((message) => message.toJSON());
    ret.timestamp = this.timestamp.valueOf();
    return ret;
  }
}
