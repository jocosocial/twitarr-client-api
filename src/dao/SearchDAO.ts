import { AbstractDAO } from './AbstractDAO';
import { SearchResponse } from '../model/SearchResponse';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

export class SearchDAO extends AbstractDAO {
  /**
   * Search all metadata (seamail, twarrts, etc.)
   */
  public async all(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/all/' + query, limit, page);
  }

  /**
   * Search events.
   */
  public async events(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/events/' + query, limit, page);
  }

  /**
   * Search forums.
   */
  public async forums(query: string, limit?: number, page?: number) {
    return this.doSearch('/api/v2/search/forums/' + query, limit, page);
  }

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
