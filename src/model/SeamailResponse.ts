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
      }
    }

    return ret;
  }

  /** When the metadata was last checked. */
  public last_checked: Moment;

  /** The list of threads. */
  public threads: SeamailThread[];

  public toJSON() {
    return {
      last_checked: this.last_checked.valueOf(),
      seamail_meta: this.threads,
    };
  }
}
