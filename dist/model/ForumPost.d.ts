import { Moment } from 'moment';
import { PhotoDetails } from './PhotoDetails';
import { User } from './User';
/**
 * Represents a forum post.
 * @module ForumPost
 */
export declare class ForumPost {
    static fromRest(data: any): ForumPost;
    constructor(data: any);
    /** The unique post ID. */
    id: string;
    /** The containing forum's ID */
    forum_id: string;
    /** The author of the post */
    author: User;
    /** Whether the thread is locked */
    thread_locked?: boolean;
    /** The contents of the post */
    text?: string;
    /** The time the post was made */
    timestamp: Moment;
    /** Photos in the post */
    photos: PhotoDetails[];
    /** Whether the post is unread/new */
    is_new?: boolean;
    toJSON(): any;
}
