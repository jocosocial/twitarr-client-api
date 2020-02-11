import { TwitarrAuthConfig } from './TwitarrAuthConfig';
/**
 * Represents a remote Twitarr server.
 * @module TwitarrServer
 */
export declare class TwitarrServer {
    /** A unique identifier for this server. */
    id: string;
    /** An optional name associated with this server. */
    name?: string;
    /** The base URL to the server. */
    url: string;
    /** The authorization configuration associated with the server. */
    auth: TwitarrAuthConfig;
    /**
     * Construct a new TwitarrServer object representing a remote server.
     * @example
     * <caption>provide a pre-existing [[TwitarrAuthConfig]] for auth</caption>
     * ```javascript
     * const server = new TwitarrServer('Test', 'https://myserver/', auth);
     * ```
     * @example
     * <caption>provide a username and password for auth</caption>
     * ```javascript
     * const server = new TwitarrServer('Test', 'https://myserver/', 'admin', 'admin');
     * ```
     * @constructor
     * @param name - A name for the server suitable for display.
     * @param url - The URL to the server.
     * @param auth - A [[TwitarrAuthConfig]], or the username to authorize as.
     * @param password - The password to authorize with if a username was
     *                   supplied to the `auth` parameter.
     */
    constructor(name?: string, url?: string, auth?: TwitarrAuthConfig | string, password?: string);
    /**
     * Given a relative URL fragment, construct a URL for that fragment on the server.
     * @param forFragment - The URL fragment to append to the server URL.
     * @parm withQuery - Query parameters to be appended to the URL.
     * @returns A complete URL.
     */
    resolveURL(forFragment?: string, withQuery?: any): string | undefined;
    /**
     * Create a new server object from this existing one.
     */
    clone(): TwitarrServer;
    /**
     * Get the hostname portion of the URL associated with this server.
     */
    get host(): string | undefined;
    /** A string representation of this server suitable for display. */
    toString(): string;
}
