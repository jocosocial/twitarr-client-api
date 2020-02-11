import { Moment } from 'moment';
import { ForumPost } from './ForumPost';
import { User } from './User';
/**
 * Represents a forum thread.
 * @module ForumThread
 */
export declare class ForumThread {
    static fromRest(data: any): ForumThread;
    constructor(data: any);
    /** The unique thread ID. */
    id: string;
    /** The thread's subject */
    subject: string;
    /** Whether the thread is sticky */
    sticky: boolean;
    /** Whether the thread is locked */
    locked: boolean;
    /** The last user to post to the thread */
    last_post_author?: User;
    /** The posts in this thread */
    posts: ForumPost[];
    /** The last time the thread was posted to */
    timestamp?: Moment;
    /** The last page read in the thread */
    last_post_page?: number;
    /** Number of posts since last viewed */
    count?: number;
    /** Whether the thread has new posts */
    new_posts?: boolean;
    /** The next page in the thread */
    next_page?: number;
    /** The previous page in the thread */
    previous_page?: number;
    /** How many pages there are in the thread */
    page_count?: number;
    /** How many posts there are in the thread */
    post_count?: number;
    /** The timestamp of the latest read post */
    latest_read?: Moment;
    toJSON(): any;
}
