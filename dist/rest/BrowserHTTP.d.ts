import { AbstractHTTP } from './AbstractHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';
/**
 * Implementation of the [[ITwitarrHTTP]] interface using `fetch`
 * @module BrowserHTTP
 * @implements ITwitarrHTTP
 */
export declare class BrowserHTTP extends AbstractHTTP {
    /**
     * Construct a BrowserHTTP instance.
     * @param server - The server to connect to.
     * @param timeout - The default timeout for ReST connections.
     */
    constructor(server?: TwitarrServer, timeout?: number);
    /**
     * Make an HTTP GET call using `fetch({method:'GET'})`.
     */
    get(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make an HTTP PUT call using `fetch({method:'PUT'})`.
     */
    put(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make an HTTP POST call using `fetch({method:'POST'})`.
     */
    post(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make an HTTP DELETE call using `fetch({method:'DELETE'})`.
     */
    httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /** POST a file. */
    postFile(url: string, fileName: string, contentType: string, data: Blob, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    protected getFetchObject(fileName: string, contentType: string, data: Blob, options: TwitarrHTTPOptions): any;
    private getResponseData;
    /**
     * Internal method to turn [[TwitarrHTTPOptions]] into a fetch [[RequestInit]] object.
     * @hidden
     */
    private getConfig;
}
