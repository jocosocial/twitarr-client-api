import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrServer } from '../api/TwitarrServer';
export declare class AutomaticHTTP implements ITwitarrHTTP {
    private impl;
    constructor(server?: TwitarrServer, timeout?: number);
    get server(): TwitarrServer | undefined;
    set server(server: TwitarrServer | undefined);
    get options(): TwitarrHTTPOptions;
    set options(options: TwitarrHTTPOptions);
    getUsername(): string | null;
    setUsername(username: string): ITwitarrHTTP;
    getPassword(): string | null;
    setPassword(password: string): ITwitarrHTTP;
    getKey(): string | null;
    setKey(key: string): ITwitarrHTTP;
    get(url: string, options?: TwitarrHTTPOptions): Promise<import("../API").TwitarrResult<any>>;
    put(url: string, options?: TwitarrHTTPOptions): Promise<import("../API").TwitarrResult<any>>;
    post(url: string, options?: TwitarrHTTPOptions): Promise<import("../API").TwitarrResult<any>>;
    httpDelete(url: string, options?: TwitarrHTTPOptions): Promise<import("../API").TwitarrResult<any>>;
    postFile(url: string, fileName: string, contentType: string, data: Blob, options?: TwitarrHTTPOptions): Promise<import("../API").TwitarrResult<any>>;
}
