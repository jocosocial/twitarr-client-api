import { CalendarEvent } from './CalendarEvent';
import { ForumThread } from './ForumThread';
import { SeamailThread } from './SeamailThread';
import { StreamPost } from './StreamPost';
import { User } from './User';
interface ISearchStatus<T> {
    count: number;
    matches: T[];
    more: boolean;
}
/**
 * Represents a search response.
 * @module SearchResponse
 */
export declare class SearchResponse {
    static fromRest(data: any): SearchResponse;
    constructor(data: any);
    /** The query that was passed to the database. */
    query: string;
    users: ISearchStatus<User>;
    seamails: ISearchStatus<SeamailThread>;
    streamPosts: ISearchStatus<StreamPost>;
    forumThreads: ISearchStatus<ForumThread>;
    events: ISearchStatus<CalendarEvent>;
    toJSON(): this;
}
export {};
