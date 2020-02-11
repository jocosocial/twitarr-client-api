import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { BrowserHTTP } from './BrowserHTTP';
export declare class NodeHTTP extends BrowserHTTP {
    protected getFetchObject(fileName: string, contentType: string, data: Blob, options: TwitarrHTTPOptions): any;
}
