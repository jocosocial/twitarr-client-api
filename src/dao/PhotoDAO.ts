import { AbstractDAO } from './AbstractDAO';
import { TwitarrError } from '../api/TwitarrError';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { PhotoDetails } from '../model/PhotoDetails';

const URI = require('urijs'); // tslint:disable-line

let inNode = false;
if (typeof FormData === 'undefined') {
  // var FormData = require('formdata-node').default; // tslint:disable-line
  var FormData = require('form-data'); // tslint:disable-line
  inNode = true;
}
require('buffer'); // tslint:disable-line no-var-requires

export class PhotoDAO extends AbstractDAO {
  /**
   * Post a photo.
   */
  public async post(fileName: string, photoData: Buffer) {
    const options = new TwitarrHTTPOptions()
      .withHeader('cache-control', 'no-cache');

    let mimeType;
    if (fileName.endsWith('.png')) {
      mimeType = 'image/png';
    } else if (fileName.endsWith('.gif')) {
      mimeType = 'image/gif';
    } else if (fileName.endsWith('.jpeg') || fileName.endsWith('.jpg')) {
      mimeType = 'image/jpeg';
    } else {
      throw new TwitarrError('Unable to determine mime-type from filename: ' + fileName);
    }

    return this.http.postFile('/api/v2/photo', fileName, mimeType, photoData, options).then((result) => {
      return PhotoDetails.fromRest(result.data.photo);
    });
  }
}
