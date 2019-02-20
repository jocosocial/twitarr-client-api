import { AbstractDAO } from './AbstractDAO';
import { SearchResponse } from '../model/SearchResponse';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

const URI = require('urijs'); // eslint-disable-line

export class SearchDAO extends AbstractDAO {
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

    return this.http.get('/api/v2/hashtag/ac/' + q).then(result => {
      return result.data.values as string[];
    });
  }

  /**
   * Search all metadata (seamail, twarrts, etc.)
   */
  public async all(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/all/' + query, limit, page);
  }

  /**
   * Search events.
   */
  /*
  public async events(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/events/' + query, limit, page);
  }
  */

  /**
   * Search forums.
   */
  /*
  public async forums(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/forums/' + query, limit, page);
  }
  */

  /**
   * Search seamails.
   */
  public async seamails(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/seamails/' + query, limit, page);
  }

  /**
   * Search tweets.
   */
  public async tweets(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/tweets/' + query, limit, page);
  }

  /**
   * Search users.
   */
  public async users(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/users/' + query, limit, page);
  }

  protected async doSearch(url: string, limit?: number, page?: number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');

    if (limit && limit > 0) {
      options.parameters.limit = '' + limit;
    }
    if (page !== undefined) {
      options.parameters.page = '' + page;
    }

    return this.http.get(url, options).then(result => {
      return SearchResponse.fromRest(result.data);
    });
  }
}
