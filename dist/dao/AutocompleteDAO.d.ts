import { AbstractDAO } from './AbstractDAO';
export declare class AutocompleteDAO extends AbstractDAO {
    /**
     * Retrieve a list of hashtags that match the given query.
     */
    hashtags(query: string): Promise<string[]>;
    /**
     * Retrieve a list of users that match the given query.
     */
    users(query: string): Promise<any>;
}
