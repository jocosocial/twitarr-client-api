import { Moment } from 'moment';
import { Announcement } from './Announcement';
import { CalendarEvent } from './CalendarEvent';
import { ForumThread } from './ForumThread';
import { SeamailThread } from './SeamailThread';
import { StreamPost } from './StreamPost';
/**
 * Represents an alert response.
 * @module AlertResponse
 */
export declare class AlertResponse {
    static fromRest(data: any): AlertResponse;
    constructor(data: any);
    last_checked_time: Moment;
    announcements: Announcement[];
    tweet_mentions: StreamPost[];
    forum_mentions: ForumThread[];
    unread_seamail: SeamailThread[];
    upcoming_events: CalendarEvent[];
    toJSON(): any;
}
