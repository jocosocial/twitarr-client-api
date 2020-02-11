import { AbstractHTTP } from './AbstractHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrServer } from '../api/TwitarrServer';
interface ICordovaHTTPOptions {
    method?: 'get' | 'post' | 'put' | 'patch' | 'head' | 'delete' | 'upload' | 'download';
    data?: any;
    params: {
        [key: string]: string;
    };
    serializer?: 'urlencoded' | 'json' | 'utf8';
    timeout?: number;
    headers: {
        [key: string]: string;
    };
    filePath?: string;
    name?: string;
}
/**
 * Implementation of the [[ITwitarrHTTP]] interface using cordova-plugin-advanced-http
 * @module CordovaHTTP
 * @implements ITwitarrHTTP
 */
export declare class CordovaHTTP extends AbstractHTTP {
    private initialized;
    /**
     * Construct a CordovaHTTP instance.
     * @param server - The server to connect to.
     * @param timeout - The default timeout for ReST connections.
     */
    constructor(server?: TwitarrServer, timeout?: number);
    /**
     * Make an HTTP GET call using `cordova.plugin.http.get`.
     */
    get(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make an HTTP PUT call using `cordova.plugin.http.put`.
     */
    put(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make an HTTP POST call using `cordova.plugin.http.post`.
     */
    post(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make an HTTP DELETE call using `cordova.plugin.http.delete`.
     */
    httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /** POST a file. */
    postFile(url: string, fileName: string, contentType: string, data: Blob, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Make a request.
     */
    protected request(url: string, opts: ICordovaHTTPOptions): Promise<TwitarrResult<any>>;
    /**
     * Internal method to turn [[TwitarrHTTPOptions]] into a cordova.plugin.http object.
     * @hidden
     */
    private getConfig;
    private initializeSSL;
}
export {};
