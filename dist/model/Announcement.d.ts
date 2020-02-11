import { Moment } from 'moment';
import { User } from './User';
/**
 * Represents a calendar event.
 * @module Announcement
 */
export declare class Announcement {
    static fromRest(data: any): Announcement;
    constructor(data: any);
    /** The unique announcement ID. */
    id: string;
    /** The announcement's author. */
    author: User;
    /** The text of the announcement. */
    text: string;
    /** The announcement time. */
    timestamp: Moment;
    toJSON(): any;
}
