/**
 * Represents server authentication config.
 * @module TwitarrAuthConfig
 */
export declare class TwitarrAuthConfig {
    /** The password to authenticate with. */
    password?: string;
    /** The username to connect as. */
    username?: string;
    /** The key to pass to requests. */
    key?: string;
    /**
     * Construct an auth configuration object.
     * @constructor
     */
    constructor(username?: string, password?: string, key?: string);
    /**
     * Create a new config object from this existing one.
     */
    clone(): TwitarrAuthConfig;
}
