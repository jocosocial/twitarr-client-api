import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { BrowserHTTP } from './BrowserHTTP';

// import { FormData } from 'form-data';

export class NodeHTTP extends BrowserHTTP {
  protected getFetchObject(fileName: string, contentType: string, data: Blob, options: TwitarrHTTPOptions): any {
    const fd = new FormData();
    fd.append('name', fileName);
    fd.append('file', data, fileName);
    // Object.assign(options.headers, fd.getHeaders());

    return {
      body: fd,
      headers: options.headers,
    };
  }
}
