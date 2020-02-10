import { TwitarrError } from '../../src/api/TwitarrError';

import { UserDAO } from '../../src/dao/UserDAO';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrResult } from '../../src/api/TwitarrResult';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { User } from '../../src/model/User';
import { UserProfileInfo } from '../../src/model/UserProfileInfo';

import { MockHTTP } from '../rest/MockHTTP';
import { ITwitarrHTTP } from '../../src/api/ITwitarrHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: UserDAO, server: TwitarrServer, auth: TwitarrAuthConfig, mockHTTP: ITwitarrHTTP;

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

  it('#profile(user)', done => {
    dao.profile('kvort').then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(UserProfileInfo);
      expect(res.user.username).toEqual('kvort');
      done();
    });
  });

  it('#comment(user, text)', done => {
    dao.comment('kvort', 'kvort is awesome').then(res => {
      expect(res).toBeDefined();
      expect(res).toBeInstanceOf(UserProfileInfo);
      expect(res.user.username).toEqual('kvort');
      expect(res.comment).toEqual('kvort is awesome');
      done();
    });
  });

  it('#toggleStar(user)', async (done: Function) => {
    let starred = await dao.toggleStarred('kvort');
    expect(starred).toBeTruthy();
    starred = await dao.toggleStarred('kvort');
    expect(starred).toBeFalsy();
    done();
  });

  it('#starred', done => {
    dao.starred().then(res => {
      expect(res).toBeDefined();
      expect(Array.isArray(res)).toBeTruthy();
      expect(res.length).toEqual(1);
      expect(res[0]).toBeInstanceOf(User);
      expect(res[0].username).toEqual('randall');
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
