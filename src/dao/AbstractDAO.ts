import { IHasHTTP } from '../api/IHasHTTP';
import { ITwitarrHTTP } from '../api/ITwitarrHTTP';

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
}
