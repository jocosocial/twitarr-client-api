import { AbstractDAO } from './AbstractDAO';

import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { User } from '../model/User';

export class AutocompleteDAO extends AbstractDAO {
  /**
   * Retrieve a list of hashtags that match the given query.
   */
  public async hashtags(query: string) {
    if (!query) {
      return [];
    }

    const q = query.replace(/^\#/, '');
    if (q.length < 3) {
      return [];
    }

    return this.http
      .get('/api/v2/hashtag/ac/' + q)
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.values as string[];
      });
  }

  /**
   * Retrieve a list of users that match the given query.
   */
  public async users(query: string) {
    if (!query) {
      return [];
    }

    const q = query.replace(/^\#/, '');
    if (q.length < 3) {
      return [];
    }

    return this.http
      .get('/api/v2/user/ac/' + q, new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.users.map(user => User.fromRest(user));
      });
  }
}
