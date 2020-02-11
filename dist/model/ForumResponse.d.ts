import { ForumThread } from './ForumThread';
export declare class ForumResponse {
    static fromRest(data: any): ForumResponse;
    constructor(data: any);
    /** The collection of threads returned. */
    threads: ForumThread[];
    /** The next page to request */
    next_page?: number;
    /** The previous page to request */
    prev_page?: number;
    /** The number of threads */
    thread_count?: number;
    /** The number of pages */
    page_count?: number;
}
