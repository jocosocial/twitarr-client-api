import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';
/** @hidden */
declare const OPTIONS_PROP: unique symbol;
/**
 * Abstract implementation of the TwitarrHTTP interface meant to be extended by a concrete class.
 * @module AbstractHTTP
 * @implements ITwitarrHTTP
 */
export declare abstract class AbstractHTTP implements ITwitarrHTTP {
    private [OPTIONS_PROP];
    /** The default set of HTTP options associated with this ReST client. */
    options: TwitarrHTTPOptions;
    /**
     * The server metadata we'll use for constructing ReST calls.
     * @hidden
     */
    private serverObj;
    /** The server associated with this HTTP implementation. */
    server: TwitarrServer | undefined;
    /**
     * Create a new HTTP instance.
     * @constructor
     * @param server - A server object for immediate configuration.
     * @param timeout - How long to wait until timing out requests.
     */
    constructor(server?: TwitarrServer, timeout?: number);
    getUsername(): string | null;
    setUsername(username: string): ITwitarrHTTP;
    getPassword(): string | null;
    setPassword(password: string): ITwitarrHTTP;
    getKey(): string | null;
    setKey(key: string): ITwitarrHTTP;
    /** Make an HTTP GET call. This must be implemented by the concrete implementation. */
    abstract get(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /** Make an HTTP PUT call. This must be overridden by the concrete implementation. */
    abstract put(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /** Make an HTTP POST call. This must be overridden by the concrete implementation. */
    abstract post(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /** Make an HTTP DELETE call. This must be overridden by the concrete implementation. */
    abstract httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /** POST a file.  This must be overridden by the concrete implementation. */
    abstract postFile(url: string, fileName: string, contentType: string, data: Blob, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * A convenience method for implementers to use to turn JSON into a javascript object.
     * Use this to process a JSON response before returning it in an [[TwitarrResult]] object.
     */
    protected transformJSON(data: any): any;
    /** Attempt to extract the data from a response. */
    protected getData(response: any): any;
    /**
     * Attempt to determine the type of response.
     * @hidden
     */
    protected getType(response: any): "text" | "json";
    /**
     * Get the [[TwitarrServer]] object that should be used for making requests.  Favors the one
     * passed in the [[TwitarrHTTPOptions]], otherwise it falls back to the default server associated
     * with the HTTP implementation.
     */
    protected getServer(options?: TwitarrHTTPOptions): TwitarrServer;
    /**
     * Get the union of [[TwitarrHTTPOptions]] based on the passed options, defaults,
     * and options in the [[TwitarrServer]] associated with this request.  Order of
     * precedence is passed options -> server options -> default options.
     */
    protected getOptions(options?: TwitarrHTTPOptions): TwitarrHTTPOptions;
    /**
     * Implementers should override this method if they have actions that need to be performed
     * (like clearing a cache) when server settings change.
     */
    protected onSetServer(): void;
    /**
     * Create an [[Error]] from an error response.
     * @hidden
     */
    protected handleError(err: any): Error;
    /**
     * Attempt to determine an error message from an error response.
     * @hidden
     */
    protected static extractMessage(err: any): string;
    /**
     * Attempt to determine an error status code from an error response.
     * @hidden
     */
    protected static extractCode(err: any): number;
    /**
     * Attempt to determine the error message in an error response.
     * @hidden
     */
    protected static extractError(err: any): any;
    /**
     * Attempt to determine the data in an error response.
     * @hidden
     */
    protected static extractData(err: any): any;
}
export {};
