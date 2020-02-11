import { Moment } from 'moment';
import { ReactionsSummary } from './ReactionsSummary';
import { PhotoDetails } from './PhotoDetails';
import { User } from './User';
/**
 * Represents a stream post.
 * @module StreamPost
 */
export declare class StreamPost {
    static fromRest(data: any): StreamPost;
    constructor(data: any);
    /** The unique id. */
    id: string;
    /** The user that wrote the post. */
    author: User;
    /** Whether the post is locked. */
    locked?: boolean;
    /** The time the post was created. */
    timestamp: Moment;
    /** The text (contents) of the post. */
    text: string;
    /** The reactions (like, etc.) to the post. */
    reactions?: ReactionsSummary;
    /** The metadata of photos in the post. */
    photo?: PhotoDetails;
    /** The chain of parent posts. */
    parent_chain: string[];
    /** The children of this post. */
    children: StreamPost[];
    toJSON(): any;
}
