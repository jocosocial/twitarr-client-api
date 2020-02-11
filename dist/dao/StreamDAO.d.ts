import { Moment } from 'moment';
import { ReactionsSummary } from '../model/ReactionsSummary';
import { StreamResponse } from '../model/StreamResponse';
import { AbstractDAO } from './AbstractDAO';
export interface IStreamOptions {
    /** limit posts to those written by the specified username */
    author?: string;
    /** limit posts to those containing the specified hashtag */
    hashtag?: string;
    /** whether to include the author in `mentions` queries */
    include_author?: boolean;
    /** return at most `limit` posts. */
    limit?: number;
    /** limit posts to those mentioning the specified username */
    mentions?: string;
    /** whether to return posts newer or older than `start` */
    newer_posts?: boolean;
    /** limit posts to those by starred (followed) users */
    starred?: boolean;
    /** the starting date to query */
    start?: Moment | number;
}
export declare class StreamDAO extends AbstractDAO {
    /**
     * Retrieve a collection of twarrts.
     */
    posts(streamOptions?: IStreamOptions): Promise<StreamResponse>;
    /**
     * Retrieve a particular twarrt (including its children).
     */
    thread(id: string, limit?: number, page?: number): Promise<StreamResponse>;
    /**
     * Retrieve a list of twarrts that mention a particular user.
     */
    mentions(username: string, limit?: number, page?: number, after?: Moment | number): Promise<StreamResponse>;
    /**
     * Retrieve a list of twarrts that contain a particular hashtag.
     */
    hashtag(hashtag: string, limit?: number, page?: number, after?: Moment | number): Promise<StreamResponse>;
    /**
     * Send a new twarrt.
     */
    send(message: string, parent?: string, photo?: string): Promise<StreamResponse>;
    /**
     * Edit an existing twarrt.
     */
    updatePost(id: string, message: string, photo?: string): Promise<StreamResponse>;
    /**
     * Delete a twarrt.
     */
    deletePost(id: string): Promise<boolean>;
    /**
     * Lock a twarrt.
     */
    lockPost(id: string): Promise<boolean>;
    /**
     * Unlock a twarrt.
     */
    unlockPost(id: string): Promise<boolean>;
    /**
     * Retrieve the reactions to a twarrt.
     */
    reactions(id: string): Promise<ReactionsSummary>;
    /**
     * Add a reaction to a twarrt.
     */
    react(id: string, reaction: string): Promise<ReactionsSummary>;
    /**
     * Remove a reaction from a twarrt.
     */
    deleteReact(id: string, reaction: string): Promise<ReactionsSummary>;
}
