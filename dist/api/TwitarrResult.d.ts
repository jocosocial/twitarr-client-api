/**
 * An [[ITwitarrHTTP]] query result.
 * @module TwitarrResult
 */
export declare class TwitarrResult<T> {
    /** Create a new success result. */
    static ok(response: any, message?: string, code?: number, type?: string): TwitarrResult<any>;
    /** Create a new "No Content" result. */
    static noContent(): TwitarrResult<null>;
    /** The data, if any. */
    data: T;
    /** The request type, if any. */
    type?: string;
    /** The status message associated with this result. */
    message?: string;
    /** The response code associated with this result. */
    code?: number;
    /** The error associated with this response if any. */
    error?: Error;
    /**
     * Construct a new result.
     * @param data The payload of the response.
     * @param message The status message associated with the result.
     * @param code The response code of the response.
     * @param type The request type of the response.
     */
    constructor(data: T, message?: string, code?: number, type?: string);
    /** Whether this result is considered successful. */
    isSuccess(): boolean;
}
