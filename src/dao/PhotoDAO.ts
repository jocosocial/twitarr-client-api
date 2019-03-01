import { AbstractDAO } from './AbstractDAO';
import { TwitarrError } from '../api/TwitarrError';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { PhotoDetails } from '../model/PhotoDetails';

require('buffer');

export class PhotoDAO extends AbstractDAO {
  /**
   * Retrieve a photo's metadata.
   */
  public async get(id: string) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');

    return this.http
      .get('/api/v2/photo/' + id, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return PhotoDetails.fromRest(data.photo);
      });
  }

  /**
   * Delete/remove a photo..
   */
  public async remove(id: string) {
    return this.http.httpDelete('/api/v2/photo/' + id);
  }

  /**
   * Post a photo.
   */
  public async post(fileName: string, photoData: Buffer) {
    const options = new TwitarrHTTPOptions().withHeader('cache-control', 'no-cache');

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

    return this.http
      .postFile('/api/v2/photo', fileName, mimeType, photoData, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return PhotoDetails.fromRest(data.photo);
      });
  }

  /**
   * Post a profile photo.
   */
  public async profile(username: string, fileName: string, photoData: Buffer) {
    const options = new TwitarrHTTPOptions().withHeader('cache-control', 'no-cache');

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

    return this.http
      .postFile('/api/v2/user/photo', fileName, mimeType, photoData, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return PhotoDetails.fromRest(data.photo);
      });
  }

  /**
   * Remove the user's profile photo.
   */
  public async removeProfile() {
    return this.http
      .httpDelete('/api/v2/user/photo')
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.md5_hash;
      });
  }
}
