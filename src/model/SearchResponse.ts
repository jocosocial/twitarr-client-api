import { Util } from '../internal/Util';

import { Moment } from 'moment';

import { SeamailThread } from './SeamailThread';
import { StreamPost } from './StreamPost';
import { User } from './User';

interface ISearchStatus<T> {
  count: number;
  matches: T[];
  more: boolean;
}

/**
 * Represents a search response.
 * @module SearchResponse
 */
export class SearchResponse {
  public static fromRest(data: any) {
    const ret = new SearchResponse();
    if (!Util.isEmpty(data)) {
      if (data.query && data.query.text) {
        ret.query = data.query.text;
      }
      if (data.users) {
        Util.setProperties(ret.users, data.users, 'count', 'more');
        ret.users.matches = data.users.matches.map((user) => User.fromRest(user));
      }
      if (data.seamails) {
        Util.setProperties(ret.seamails, data.seamails, 'count', 'more');
        ret.seamails.matches = data.seamails.matches.map((thread) => SeamailThread.fromRest(thread));
      }
      if (data.tweets) {
        Util.setProperties(ret.streamPosts, data.streamPosts, 'count', 'more');
        ret.streamPosts.matches = data.tweets.matches.map((tweet) => StreamPost.fromRest(tweet));
      }
      /*
      if (data.forums) {
        Util.setProperties(ret.forumThreads, data.forumThreads, 'count', 'more');
        ret.forumThreads.matches = data.forums.matches.map((thread) => ForumThread.fromRest(thread));
      }
      if (data.events) {
        Util.setProperties(ret.events, data.events, 'count', 'more');
        ret.events.matches = data.events.matches.map((event) => Event.fromRest(event));
      }
      */
    }
    return ret;
  }

  /** The query that was passed to the database. */
  public query: string;

  public users: ISearchStatus<User> = {
    count: 0,
    matches: [],
    more: false,
  };

  public seamails: ISearchStatus<SeamailThread> = {
    count: 0,
    matches: [],
    more: false,
  };

  public streamPosts: ISearchStatus<StreamPost> = {
    count: 0,
    matches: [],
    more: false,
  };

  /*
  public forumThreads: ISearchStatus<ForumThread> = {
    count: 0,
    matches: [],
    more: false,
  };

  public events: ISearchStatus<Event> = {
    count: 0,
    matches: [],
    more: false,
  };
  */

  public toJSON() {
    return this;
  }
}
