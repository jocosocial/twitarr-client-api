import { ForumThread } from './ForumThread';

import { Util } from '../internal/Util';

export class ForumResponse {
  public static fromRest(data: any) {
    return new ForumResponse(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'forum_threads');

    Util.setProperties(this, data, 'next_page', 'prev_page', 'thread_count', 'page_count');
    this.threads = data.forum_threads.map((thread: any) => ForumThread.fromRest(thread));
  }

  /** The collection of threads returned. */
  public threads: ForumThread[] = [];

  /** The next page to request */
  public next_page?: number;

  /** The previous page to request */
  public prev_page?: number;

  /** The number of threads */
  public thread_count?: number;

  /** The number of pages */
  public page_count?: number;
}
