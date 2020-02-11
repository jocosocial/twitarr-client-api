import { Moment } from 'moment';
/**
 * Represents a photo.
 * @module PhotoDetails
 */
export declare class PhotoDetails {
    static fromRest(data: any): PhotoDetails;
    constructor(data: any);
    /** The photo's ID. */
    id: string;
    /** Whether the photo is animated. */
    animated: boolean;
    /** The filename stored on the server. */
    store_filename?: string;
    /** The photo's MD5 hash. */
    md5_hash?: string;
    /** The original filename. */
    original_filename?: string;
    /** The user that uploaded the photo. */
    uploader?: string;
    /** When the photo was uploaded. */
    upload_time?: Moment;
    /** The sizes available. */
    sizes: {
        [key: string]: string;
    };
    toJSON(): any;
}
