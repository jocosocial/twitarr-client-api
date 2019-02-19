import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrError } from '../api/TwitarrError';

import { User } from '../model/User';

import { AbstractDAO } from './AbstractDAO';

export class UserDAO extends AbstractDAO {
  public async login() {
    const options = new TwitarrHTTPOptions();
    options.data = {
      password: this.http.getPassword(),
      username: this.http.getUsername(),
    };

    const result = await this.http.post('/api/v2/user/auth', options);
    const data = await this.handleErrors(result);
    if (data && data.key) {
      this.http.setKey(data.key);
      return data.key;
    }
    throw new TwitarrError('No key returned from user auth', result.code, undefined, undefined, result);
  }

  public async getProfile() {
    return this.http.get('/api/v2/user/whoami', new TwitarrHTTPOptions().withParameter('app', 'plain')).then((result) => {
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
    throw new TwitarrError('Failed to parse result.', result.code, undefined, undefined, result.data);
  }
}
