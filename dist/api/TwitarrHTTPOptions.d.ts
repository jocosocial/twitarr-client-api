import { TwitarrAuthConfig } from './TwitarrAuthConfig';
import { TwitarrServer } from './TwitarrServer';
import { IHash } from '../internal/IHash';
/** @hidden */
declare const TIMEOUT_PROP: unique symbol;
/** @hidden */
declare const AUTH_PROP: unique symbol;
/**
 * Options to be used when making HTTP ReST calls.
 * @module TwitarrHTTPOptions
 */
export declare class TwitarrHTTPOptions {
    /** How long to wait for ReST calls to time out. */
    timeout: number;
    /** The authentication config that should be used when no auth is associated with the [[TwitarrServer]]. */
    auth: TwitarrAuthConfig;
    /** The server to use if no server is set on the HTTP implementation. */
    server: TwitarrServer | undefined;
    /** HTTP headers to be passed to the request. */
    headers: IHash<string>;
    /** HTTP parameters to be passed on the URL. */
    parameters: IHash<string>;
    /** HTTP data to be passed when POSTing */
    data: any;
    private [TIMEOUT_PROP];
    private [AUTH_PROP];
    /**
     * Construct a new TwitarrHTTPOptions object.
     * @constructor
     */
    constructor(timeout?: number, auth?: TwitarrAuthConfig, server?: TwitarrServer);
    /**
     * Add a header.  Returns the TwitarrHTTPOptions object so it can be chained.
     * @param key - the header
     * @param value - the header value
     */
    withHeader(header: string, value: string): TwitarrHTTPOptions;
    /**
     * Add a URL parameter. Returns the TwitarrHTTPOptions object so it can be chained.
     * @param key - the parameter's key
     * @param value - the parameter's value
     */
    withParameter(key: string, value?: any): TwitarrHTTPOptions;
    /**
     * Set the data to be passed when POSTing.
     * @param data - the data to POST
     */
    withData(data: any): TwitarrHTTPOptions;
    toJSON(): object;
}
export {};
