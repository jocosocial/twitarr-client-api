import { Moment } from 'moment';

import { SeamailThread } from './SeamailThread';

import { Util } from '../internal/Util';

export class SeamailResponse {
  public static fromRest(data: any) {
    return new SeamailResponse(data);
  }

  public constructor(data: any) {
    if (!Util.isEmpty(data.last_checked)) {
      this.last_checked = Util.toDateTime(data.last_checked) as Moment;
    }

    if (Util.isEmpty(data.seamail) && Util.isEmpty(data.seamail_meta) && Util.isEmpty(data.seamail_threads)) {
      throw new Error('SeamailResponse: at least one of seamail, seamail_meta, or seamail_threads is expected in the response!');
    }

    if (!Util.isEmpty(data.seamail)) {
      this.threads = [SeamailThread.fromRest(data.seamail)];
      this.is_meta = false;
    }
    if (!Util.isEmpty(data.seamail_meta)) {
      this.threads = data.seamail_meta.map((thread: any) => SeamailThread.fromRest(thread));
      this.is_meta = true;
    } else if (!Util.isEmpty(data.seamail_threads)) {
      this.threads = data.seamail_threads.map((thread: any) => SeamailThread.fromRest(thread));
      this.is_meta = false;
    }
  }

  /** When the metadata was last checked. */
  public last_checked?: Moment;

  /** The list of threads. */
  public threads = [] as SeamailThread[];

  /** Whether this is a metadata response or a full response. */
  public is_meta = false;

  public toJSON() {
    const ret = {} as any;
    if (this.last_checked) {
      ret.last_checked = this.last_checked.valueOf();
    }
    if (this.is_meta) {
      ret.seamail_meta = this.threads;
    } else {
      ret.seamail_threads = this.threads;
    }
    return ret;
  }
}
