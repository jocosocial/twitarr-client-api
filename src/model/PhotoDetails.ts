import { User } from './User';
import { Util } from '../internal/Util';

/**
 * Represents a photo.
 * @module PhotoDetails
 */
export class PhotoDetails {
  public static fromRest(data: any) {
    const ret = new PhotoDetails();
    Object.apply(ret, data);
    return ret;
  }

  /** The photo's ID. */
  public id: string;

  /** Whether the photo is animated. */
  public animated: boolean;

  public toJSON() {
    return this;
  }
}
