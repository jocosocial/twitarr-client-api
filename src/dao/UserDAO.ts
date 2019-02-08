import { IHasHTTP } from '../api/IHasHTTP';
import { ITwitarrHTTP } from '../api/ITwitarrHTTP';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrError } from '../api/TwitarrError';

import { User } from '../model/User';

import { Util } from '../internal/Util';

export class UserDAO {
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
  constructor(impl: ITwitarrHTTP | IHasHTTP) {
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

  public async login() {
    const options = new TwitarrHTTPOptions();
    options.data = {
      password: this.http.getPassword(),
      username: this.http.getUsername(),
    };

    return this.http.post('/api/v2/user/auth', options).then((result) => {
      return this.handleErrors(result).then((data) => {
        if (data && data.key) {
          this.http.setKey(data.key);
          return true;
        }
        throw new TwitarrError('No key returned from user auth', result.code, undefined, result);
      });
    });
  }

  public async getProfile() {
    return this.http.get('/api/v2/user/whoami').then((result) => {
      return this.handleErrors(result).then((data) => {
        return User.fromRest(data.user);
      });
    });
  }

  public async createUser(registrationCode: string, username: string, password: string, displayName?: string) {
    const options = new TwitarrHTTPOptions()
      .withParameter('registration_code', registrationCode)
      .withParameter('username', username)
      .withParameter('password', password);

    if (displayName) {
      options.parameters.display_name = displayName;
    }

    return this.http.post('/api/v2/user/new', options);
  }

  private async handleErrors(result: TwitarrResult<any>) {
    if (result.isSuccess()) {
      const status = result.data && result.data.status? result.data.status : 'ok';
      if (status === 'ok') {
        // console.debug('result was ok:', result);
        return Promise.resolve(result.data);
      }
    }
    throw new TwitarrError('Failed to parse result.', result.code, undefined, result.data);
  }
}
