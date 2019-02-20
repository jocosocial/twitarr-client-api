import { AbstractDAO } from './AbstractDAO';

// import { User } from '../model/User';

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

    return this.http.get('/api/v2/hashtag/ac/' + q).then(result => {
      return result.data.values as string[];
    });
  }
}
