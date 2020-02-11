import { Moment } from 'moment';

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
    return new AlertResponse(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'last_checked_time');
    this.last_checked_time = Util.toDateTime(data.last_checked_time) as Moment;

    if (data.announcements) {
      this.announcements = data.announcements.map((announcement: any) => Announcement.fromRest(announcement));
    }
    if (data.tweet_mentions) {
      this.tweet_mentions = data.tweet_mentions.map((twarrt: any) => StreamPost.fromRest(twarrt));
    }
    if (data.forum_mentions) {
      this.forum_mentions = data.forum_mentions.map((thread: any) => ForumThread.fromRest(thread));
    }
    if (data.unread_seamail) {
      this.unread_seamail = data.unread_seamail.map((thread: any) => SeamailThread.fromRest(thread));
    }
    if (data.upcoming_events) {
      this.upcoming_events = data.upcoming_events.map((event: any) => CalendarEvent.fromRest(event));
    }
  }

  public last_checked_time: Moment;

  public announcements = [] as Announcement[];

  public tweet_mentions = [] as StreamPost[];

  public forum_mentions = [] as ForumThread[];

  public unread_seamail = [] as SeamailThread[];

  public upcoming_events = [] as CalendarEvent[];

  public toJSON() {
    const ret = {} as any;
    Util.setEpochProperties(ret, this, 'last_checked_time');
    Util.setProperties(ret, this, 'announcements', 'tweet_mentions', 'forum_mentions', 'unread_seamail', 'upcoming_events');
    return ret;
  }
}
