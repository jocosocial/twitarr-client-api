import { Moment } from 'moment';
export declare const sortUsers: (a: User, b: User) => number;
/**
 * Represents a Twit-arr user.
 * @module User
 */
export declare class User {
    static fromRest(data: any): User;
    static unique(users: User[]): User[];
    constructor(data: any);
    /** The unique username. */
    username: string;
    /** The user's role. */
    role: string | undefined;
    /** The user's e-mail address. */
    email: string | undefined;
    /** The user's display name. */
    display_name: string | undefined;
    /** Whether the user has an empty password. */
    empty_password: boolean | undefined;
    /** The last time the user logged in. */
    last_login: Moment | undefined;
    /** The last time the user's photo was updated. */
    last_photo_updated: Moment | undefined;
    /** The user's room number. */
    room_number: number | undefined;
    /** The user's real name. */
    real_name: string | undefined;
    /** The user's preferred pronouns. */
    pronouns: string | undefined;
    /** The user's home location. */
    home_location: string | undefined;
    /** Whether the user has un-noticed alerts. */
    unnoticed_alerts: boolean | undefined;
    /** The number of tweets the user has posted. */
    number_of_tweets: number | undefined;
    /** The number of times the user has been mentioned. */
    number_of_mentions: number | undefined;
    /** Whether this user is starred. */
    starred: boolean | undefined;
    /** A comment about the user, if any. */
    comment: string | undefined;
    toJSON(): any;
    getDisplayName(): string | undefined;
    toString(): string;
}
