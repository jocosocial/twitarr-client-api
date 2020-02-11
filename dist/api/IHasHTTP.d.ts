import { ITwitarrHTTP } from './ITwitarrHTTP';
/**
 * Interface for a class that has an HTTP object.
 *
 * This exists to avoid import loops between the DAOs (that need to easily access [[ITwitarrHTTP]])
 * and the [[Client]] which needs to contain an [[ITwitarrHTTP]].
 *
 * @interface
 * @module IHasHTTP
 */
export interface IHasHTTP {
    /** The HTTP implementation this object should contain. */
    http: ITwitarrHTTP;
}
