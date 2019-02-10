import { AbstractDAO } from './AbstractDAO';
import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { SeamailResponse } from '../model/SeamailResponse';

export class SeamailDAO extends AbstractDAO {
  public async getMetadata() {
    const options = new TwitarrHTTPOptions();
    return this.http.get('/api/v2/seamail', options).then((result) => {
      return SeamailResponse.fromRest(result.data);
    });
  }

  /*
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
        throw new TwitarrError('No key returned from user auth', result.code, undefined, undefined, result);
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
    throw new TwitarrError('Failed to parse result.', result.code, undefined, undefined, result.data);
  }
  */
}
