import { AbstractDAO } from './AbstractDAO';
import { SearchResponse } from '../model/SearchResponse';
export declare class SearchDAO extends AbstractDAO {
    /**
     * Search all metadata (seamail, twarrts, etc.)
     */
    all(query: string, limit?: number, page?: number): Promise<SearchResponse>;
    /**
     * Search events.
     */
    events(query: string, limit?: number, page?: number): Promise<SearchResponse>;
    /**
     * Search forums.
     */
    forums(query: string, limit?: number, page?: number): Promise<SearchResponse>;
    /**
     * Search seamails.
     */
    seamails(query: string, limit?: number, page?: number): Promise<SearchResponse>;
    /**
     * Search tweets.
     */
    tweets(query: string, limit?: number, page?: number): Promise<SearchResponse>;
    /**
     * Search users.
     */
    users(query: string, limit?: number, page?: number): Promise<SearchResponse>;
    protected doSearch(url: string, limit?: number, page?: number): Promise<SearchResponse>;
}
