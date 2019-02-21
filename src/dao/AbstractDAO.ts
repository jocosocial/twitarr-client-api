import { IHasHTTP } from '../api/IHasHTTP';
import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrError } from '../api/TwitarrError';
import { TwitarrResult } from '../api/TwitarrResult';

export abstract class AbstractDAO {
  /**
   * The [[ITwitarrHTTP]] implementation to use internally when making requests.
   * @hidden
   */
  private httpImpl: ITwitarrHTTP;

  /**
   * Construct a DAO instance.
   *
   * @param impl - The HTTP implementation to use.  It is also legal to pass any object
   *               conforming to the [[IHasHTTP]] interface (like a [[Client]]).
   */
  public constructor(impl: ITwitarrHTTP | IHasHTTP) {
    if ((impl as IHasHTTP).http) {
      impl = (impl as IHasHTTP).http;
    }
    this.httpImpl = impl as ITwitarrHTTP;
  }

  /**
   * The HTTP implementation to use internally when making DAO requests.
   */
  public get http() {
    return this.httpImpl;
  }

  public set http(impl: ITwitarrHTTP) {
    this.httpImpl = impl;
  }

  protected handleErrors(result: TwitarrResult<any>) {
    if (result.isSuccess()) {
      const status = result.data && result.data.status ? result.data.status : 'ok';
      if (status === 'ok') {
        // console.debug('result was ok:', result);
        return result.data;
      }
    }
    throw new TwitarrError('Failed to parse result.', result.code, undefined, undefined, result.data);
  }
}
