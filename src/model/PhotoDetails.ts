import { Util } from '../internal/Util';

import { Moment } from 'moment';

/**
 * Represents a photo.
 * @module PhotoDetails
 */
export class PhotoDetails {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'id', 'md5_hash');

    const ret = new PhotoDetails();
    Util.setProperties(ret, data, 'id', 'animated', 'store_filename', 'md5_hash', 'original_filename', 'uploader');
    Util.setDateProperties(ret, data, 'uploader_time');
    if (data.sizes) {
      Object.assign(ret.sizes, data.sizes);
    }
    return ret;
  }

  /** The photo's ID. */
  public id: string;

  /** Whether the photo is animated. */
  public animated: boolean;

  /** The filename stored on the server. */
  public store_filename: string;

  /** The photo's MD5 hash. */
  public md5_hash: string;

  /** The original filename. */
  public original_filename: string;

  /** The user that uploaded the photo. */
  public uploader: string;

  /** When the photo was uploaded. */
  public upload_time: Moment;

  /** The sizes available. */
  public sizes: { [key: string]: string } = {};

  public toJSON() {
    return this;
  }
}
