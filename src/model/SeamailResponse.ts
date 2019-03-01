import { DateTime } from 'luxon';

import { SeamailThread } from './SeamailThread';

import { TwitarrError } from '../api/TwitarrError';

import { Util } from '../internal/Util';

export class SeamailResponse {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'status');

    if (Util.isEmpty(data.seamail) && Util.isEmpty(data.seamail_meta) && Util.isEmpty(data.seamail_threads)) {
      throw new TwitarrError('At least one of seamail, seamail_meta, or seamail_threads is expected in the response!', undefined, undefined, data);
    }

    const ret = new SeamailResponse();
    Util.setDateProperties(ret, data, 'last_checked');

    if (!Util.isEmpty(data.seamail)) {
      ret.threads = [SeamailThread.fromRest(data.seamail)];
      ret.is_meta = false;
    }
    if (!Util.isEmpty(data.seamail_meta)) {
      ret.threads = data.seamail_meta.map(thread => SeamailThread.fromRest(thread));
      ret.is_meta = true;
    } else if (!Util.isEmpty(data.seamail_threads)) {
      ret.threads = data.seamail_threads.map(thread => SeamailThread.fromRest(thread));
      ret.is_meta = false;
    }

    return ret;
  }

  /** When the metadata was last checked. */
  public last_checked: DateTime;

  /** The list of threads. */
  public threads: SeamailThread[];

  /** Whether this is a metadata response or a full response. */
  public is_meta: boolean = false;

  public toJSON() {
    const ret = {
      last_checked: this.last_checked.toMillis(),
    } as any;
    if (this.is_meta) {
      ret.seamail_meta = this.threads;
    } else {
      ret.seamail_threads = this.threads;
    }
    return ret;
  }
}
