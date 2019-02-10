import { Moment } from 'moment';

import { SeamailThread } from './SeamailThread';
import { Util } from '../internal/Util';

export class SeamailResponse {
  public static fromRest(data: any) {
    const ret = new SeamailResponse();

    if (!Util.isEmpty(data)) {
      Util.setDateProperties(ret, data, 'last_checked');
      if (!Util.isEmpty(data.seamail_meta)) {
        ret.threads = data.seamail_meta.map((thread) => SeamailThread.fromRest(thread));
        ret.is_meta = true;
      } else if (!Util.isEmpty(data.seamail)) {
        ret.threads = data.seamail.map((thread) => SeamailThread.fromRest(thread));
        ret.is_meta = false;
      }

    }

    return ret;
  }

  /** When the metadata was last checked. */
  public last_checked: Moment;

  /** The list of threads. */
  public threads: SeamailThread[];

  /** Whether this is a metadata response or a full response. */
  public is_meta: boolean = false;

  public toJSON() {
    const ret = {
      last_checked: this.last_checked,
    } as any;
    if (this.is_meta) {
      ret.seamail_meta = this.threads;
    } else {
      ret.seamail = this.threads;
    }
    return ret;
  }
}
