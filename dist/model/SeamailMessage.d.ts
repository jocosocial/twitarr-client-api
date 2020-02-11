import { Moment } from 'moment';
import { User } from './User';
/**
 * Represents a Seamail message.
 * @module SeamailMessage
 */
export declare class SeamailMessage {
    static fromRest(data: any): SeamailMessage;
    constructor(data: any);
    /** The unique id. */
    id: string;
    /** The user that wrote the message. */
    author?: User;
    /** The text (contents) of the message. */
    text: string;
    /** The time the message was created. */
    timestamp: Moment;
    /** The users who have read the message. */
    read_users: User[];
    /** A unique hash of this message. */
    hash: number;
    toJSON(): {
        id: string;
        read_users: any[];
        text: string;
        timestamp: number;
    };
}
