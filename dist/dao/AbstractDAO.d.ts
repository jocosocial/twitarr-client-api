import { IHasHTTP } from '../api/IHasHTTP';
import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrResult } from '../api/TwitarrResult';
export declare abstract class AbstractDAO {
    /**
     * The [[ITwitarrHTTP]] implementation to use internally when making requests.
     * @hidden
     */
    private httpImpl;
    /**
     * Construct a DAO instance.
     *
     * @param impl - The HTTP implementation to use.  It is also legal to pass any object
     *               conforming to the [[IHasHTTP]] interface (like a [[Client]]).
     */
    constructor(impl: ITwitarrHTTP | IHasHTTP);
    /**
     * The HTTP implementation to use internally when making DAO requests.
     */
    http: ITwitarrHTTP;
    protected handleErrors(result: TwitarrResult<any>): any;
}
