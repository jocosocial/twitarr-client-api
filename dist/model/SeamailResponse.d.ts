import { Moment } from 'moment';
import { SeamailThread } from './SeamailThread';
export declare class SeamailResponse {
    static fromRest(data: any): SeamailResponse;
    constructor(data: any);
    /** When the metadata was last checked. */
    last_checked?: Moment;
    /** The list of threads. */
    threads: SeamailThread[];
    /** Whether this is a metadata response or a full response. */
    is_meta: boolean;
    toJSON(): any;
}
