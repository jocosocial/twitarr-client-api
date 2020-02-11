import { Moment } from 'moment';
import { SeamailMessage } from './SeamailMessage';
import { User } from './User';
/**
 * Represents a Seamail thread.
 * @module SeamailThread
 */
export declare class SeamailThread {
    static fromRest(data: any): SeamailThread;
    constructor(data: any);
    /** The unique thread id. */
    id: string;
    /** The users involved in the message. */
    users: User[];
    /** The subject of the thread. */
    subject: string;
    /** The messages in the thread. */
    messages: SeamailMessage[];
    /** The number of messages (or unread messages) in the thread. */
    message_count?: number;
    /** The time the most recent message was created. */
    timestamp: Moment;
    /** Whether `message_count` is unread or total. */
    count_is_unread: boolean;
    /** Whether there are unread messages in the thread. */
    is_unread: boolean;
    toJSON(): any;
}
