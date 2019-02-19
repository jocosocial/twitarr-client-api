import { BrowserHTTP } from './BrowserHTTP';

import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';

const URI = require('urijs'); // tslint:disable-line
const FormData = require('form-data'); // tslint:disable-line

export class NodeHTTP extends BrowserHTTP {
  protected getFetchObject(fileName: string, contentType: string, data: Buffer, options: TwitarrHTTPOptions): any {
    const fd = new FormData();
    fd.append('name', fileName);
    fd.append('file', data, fileName);
    Object.assign(options.headers, fd.getHeaders());

    return {
      body: fd,
      headers: options.headers,
    };
  }

  /*
  public async postFile(url: string, fileName: string, contentType: string, data: Buffer, options?: TwitarrHTTPOptions): Promise<TwitarrResult<any>> {
    const opts = this.getOptions(options)
      .withHeader('content-type', 'multipart/form-data')
      .withParameter('key', this.getKey());

    const fd = new FormData();
    fd.append('name', fileName);
    fd.append('file', data, fileName);

    const u = URI(this.server.url).resource(this.server.resolveURL(url, opts.parameters));

    return await new Promise((resolve, reject) => {
      const request = fd.submit({
        host: u.host(),
        path: u.resource(),
      }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          res.setEncoding('utf8');
          let body = '';
          res.on('data', (chunk) => {
            body += chunk;
          }).on('end', () => {
            const parsed = JSON.parse(body);
            resolve(TwitarrResult.ok(parsed, undefined, res.statusCode, res.headers['content-type']));
          });
        }
      });
    });
  }
  */
}
