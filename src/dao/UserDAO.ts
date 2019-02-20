import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';
import { TwitarrResult } from '../api/TwitarrResult';
import { TwitarrError } from '../api/TwitarrError';

import { Util } from '../internal/Util';

import { UserProfileInfo } from '../model/UserProfileInfo';

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

  public async profile(username?: string) {
    const url = Util.isEmpty(username) ? '/api/v2/user/whoami' : '/api/v2/user/profile/' + username;
    return this.http.get(url, new TwitarrHTTPOptions().withParameter('app', 'plain')).then(async result => {
      const data = await this.handleErrors(result);
      return UserProfileInfo.fromRest(data);
    });
  }

  public async update(display_name?: string, email?: string, home_location?: string, real_name?: string, pronouns?: string, room_number?: number) {
    const options = new TwitarrHTTPOptions();
    if (display_name) {
      options.parameters.display_name = display_name;
    }
    if (email) {
      options.parameters.email = email;
    }
    if (home_location) {
      options.parameters.home_location = home_location;
    }
    if (real_name) {
      options.parameters.real_name = real_name;
    }
    if (pronouns) {
      options.parameters.pronouns = pronouns;
    }
    if (room_number) {
      options.parameters.room_number = '' + room_number;
    }
    return this.http.post('/api/v2/user/profile', options).then(async result => {
      const data = await this.handleErrors(result);
      return UserProfileInfo.fromRest(data);
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

  public async changePassword(currentPassword: string, newPassword: string) {
    if (Util.isEmpty(newPassword)) {
      throw new TwitarrError('password must not be blank!');
    }
    const options = new TwitarrHTTPOptions().withData({
      current_password: currentPassword,
      new_password: newPassword,
    });
    return this.http.post('/api/v2/user/change_password', options);
  }

  public async resetPassword(username: string, registrationCode: string, newPassword: string) {
    if (Util.isEmpty(newPassword)) {
      throw new TwitarrError('password must not be blank!');
    }
    const options = new TwitarrHTTPOptions().withData({
      username: username,
      registration_code: registrationCode,
      new_password: newPassword,
    });
    return this.http.post('/api/v2/user/reset_password', options);
  }

  public async getMentions(): Promise<number> {
    return this.http.get('/api/v2/user/mentions').then(res => {
      return res.data.mentions;
    });
  }

  public async resetMentions(): Promise<number> {
    return this.http.httpDelete('/api/v2/user/mentions').then(res => {
      return res.data.mentions;
    });
  }

  private async handleErrors(result: TwitarrResult<any>) {
    if (result.isSuccess()) {
      const status = result.data && result.data.status ? result.data.status : 'ok';
      if (status === 'ok') {
        // console.debug('result was ok:', result);
        return Promise.resolve(result.data);
      }
    }
    throw new TwitarrError('Failed to parse result.', result.code, undefined, undefined, result.data);
  }
}
