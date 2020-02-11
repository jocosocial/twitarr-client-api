import { Moment } from 'moment';
import { StreamPost } from './StreamPost';
export declare class StreamResponse {
    static fromRest(data: any): StreamResponse;
    constructor(data: any);
    /** Whether there are more posts to retrieve. */
    has_next_page: boolean;
    /** The timestamp of the next page. */
    next_page: Moment | undefined;
    /** The stream posts. */
    posts: StreamPost[];
    readonly post: StreamPost;
    /** Whether this is a single thread or multiple posts. */
    is_thread: boolean;
    toJSON(): any;
}
