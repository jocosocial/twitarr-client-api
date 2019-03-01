import { DateTime } from 'luxon';

import { Util } from '../internal/Util';

import { Announcement } from './Announcement';
import { CalendarEvent } from './CalendarEvent';
import { ForumThread } from './ForumThread';
import { SeamailThread } from './SeamailThread';
import { StreamPost } from './StreamPost';

/**
 * Represents an alert response.
 * @module AlertResponse
 */
export class AlertResponse {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'status', 'last_checked_time');

    const ret = new AlertResponse();
    Util.setDateProperties(ret, data, 'last_checked_time');

    if (data.announcements) {
      ret.announcements = data.announcements.map(announcement => Announcement.fromRest(announcement));
    }
    if (data.tweet_mentions) {
      ret.tweet_mentions = data.tweet_mentions.map(twarrt => StreamPost.fromRest(twarrt));
    }
    if (data.forum_mentions) {
      ret.forum_mentions = data.forum_mentions.map(thread => ForumThread.fromRest(thread));
    }
    if (data.unread_seamail) {
      ret.unread_seamail = data.unread_seamail.map(thread => SeamailThread.fromRest(thread));
    }
    if (data.upcoming_events) {
      ret.upcoming_events = data.upcoming_events.map(event => CalendarEvent.fromRest(event));
    }

    return ret;
  }

  public last_checked_time: DateTime;

  public announcements: Announcement[];

  public tweet_mentions: StreamPost[];

  public forum_mentions: ForumThread[];

  public unread_seamail: SeamailThread[];

  public upcoming_events: CalendarEvent[];

  public toJSON() {
    const ret = {} as any;
    Util.setEpochProperties(ret, this, 'last_checked_time');
    Util.setProperties(ret, this, 'announcements', 'tweet_mentions', 'forum_mentions', 'unread_seamail', 'upcoming_events');
    return ret;
  }
}
