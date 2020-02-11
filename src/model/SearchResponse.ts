import { Util } from '../internal/Util';

import { CalendarEvent } from './CalendarEvent';
import { ForumThread } from './ForumThread';
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
    return new SearchResponse(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'query');
    const query = data.query;
    Util.assertHasProperties(query, 'text');
    this.query = data.query.text;

    if (Util.isEmpty(data.users, data.seamails, data.tweets, data.forums, data.events)) {
      throw new Error('SearchResponse: at least one of users, seamails, tweets, forums, or events is expected on the response!');
    }

    if (data.users) {
      Util.setProperties(this.users, data.users, 'count', 'more');
      this.users.matches = data.users.matches.map((user: any) => User.fromRest(user));
    }
    if (data.seamails) {
      Util.setProperties(this.seamails, data.seamails, 'count', 'more');
      this.seamails.matches = data.seamails.matches.map((thread: any) => SeamailThread.fromRest(thread));
    }
    if (data.tweets) {
      Util.setProperties(this.streamPosts, data.streamPosts, 'count', 'more');
      this.streamPosts.matches = data.tweets.matches.map((tweet: any) => StreamPost.fromRest(tweet));
    }
    if (data.forums) {
      Util.setProperties(this.forumThreads, data.forumThreads, 'count', 'more');
      this.forumThreads.matches = data.forums.matches.map((thread: any) => ForumThread.fromRest(thread));
    }
    if (data.events) {
      Util.setProperties(this.events, data.events, 'count', 'more');
      this.events.matches = data.events.matches.map((event: any) => CalendarEvent.fromRest(event));
    }
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

  public forumThreads: ISearchStatus<ForumThread> = {
    count: 0,
    matches: [],
    more: false,
  };

  public events: ISearchStatus<CalendarEvent> = {
    count: 0,
    matches: [],
    more: false,
  };

  public toJSON() {
    return this;
  }
}
