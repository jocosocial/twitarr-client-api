declare const describe, beforeEach, it, expect;

import { TwitarrError } from '../../src/api/TwitarrError';

import { UserDAO } from '../../src/dao/UserDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrResult } from '../../src/api/TwitarrResult';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { UserProfileInfo } from '../../src/model/UserProfileInfo';

import { MockHTTP } from '../rest/MockHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: UserDAO, server, auth, mockHTTP;

describe('dao/UserDAO', () => {
  beforeEach(() => {
    mockHTTP = new MockHTTP();
    dao = new UserDAO(mockHTTP);
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP.server = server;
  });

  it('#login', done => {
    dao.login().then(res => {
      expect(res).toBeTruthy();
      done();
    });
  });

  it('#login (invalid)', done => {
    auth.password = 'invalid';
    dao.login().catch(err => {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(TwitarrError);
      expect(err.message).toEqual('invalid username or password');
      expect(err.code).toEqual(401);
      done();
    });
  });

  it('#profile', done => {
    dao.profile().then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(UserProfileInfo);
      expect(res.user.username).toEqual('rangerrick');
      done();
    });
  });

  it('#changePassword', done => {
    dao.changePassword('oldPassword', 'newPassword').then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(TwitarrResult);
      expect(res.isSuccess()).toBeTruthy();
      done();
    });
  });

  it('#changePassword', done => {
    dao.changePassword('badPassword', 'newPassword').catch(err => {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(TwitarrError);
      expect(err.message).toEqual('Current password is incorrect.');
      expect(err.code).toEqual(400);
      done();
    });
  });

  it('#resetPassword', done => {
    dao.resetPassword('rangerrick', '123456', 'newPassword').then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(TwitarrResult);
      expect(res.message).toEqual('Your password has been changed.');
      expect(res.isSuccess()).toBeTruthy();
      done();
    });
  });

  it('#resetPassword', done => {
    dao.resetPassword('rangerrick', '123465', 'newPassword').catch(err => {
      expect(err).toBeDefined();
      expect(err).toBeInstanceOf(TwitarrError);
      expect(err.errors).toBeDefined();
      expect(err.errors['username']).toBeDefined();
      expect(err.errors['username'][0]).toEqual('Username and registration code combination not found.');
      expect(err.code).toEqual(400);
      done();
    });
  });

  it('#getMentions', done => {
    dao.getMentions().then(res => {
      expect(res).toEqual(3);
      done();
    });
  });

  it('#resetMentions', done => {
    dao.resetMentions().then(res => {
      expect(res).toEqual(0);
      done();
    });
  });
});
