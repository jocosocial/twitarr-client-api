declare const describe, beforeEach, it, expect;

import { PhotoDAO } from '../../src/dao/PhotoDAO';
import { PhotoDetails } from '../../src/model/PhotoDetails';
import { TwitarrAuthConfig } from '../../src/api/TwitarrAuthConfig';
import { TwitarrResult } from '../../src/api/TwitarrResult';
import { TwitarrServer } from '../../src/api/TwitarrServer';

import { MockHTTP } from '../rest/MockHTTP';
import { ITwitarrHTTP } from '../../src/api/ITwitarrHTTP';

const SERVER_NAME = 'Demo';
const SERVER_URL = 'http://demo.twitarr.com/';
const SERVER_USER = 'demo';
const SERVER_PASSWORD = 'demo';

let dao: PhotoDAO, server: TwitarrServer, auth: TwitarrAuthConfig, mockHTTP: ITwitarrHTTP;

describe('dao/PhotoDAO', () => {
  beforeEach(() => {
    auth = new TwitarrAuthConfig(SERVER_USER, SERVER_PASSWORD);
    server = new TwitarrServer(SERVER_NAME, SERVER_URL, auth);
    mockHTTP = new MockHTTP(server);
    dao = new PhotoDAO(mockHTTP);
  });
  describe('#get', () => {
    it('get(id)', async (done: Function) => {
      const ret = await dao.get('12345');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(PhotoDetails);
      expect(ret.original_filename).toEqual('foo.png');
      done();
    });
  });
  describe('#post', () => {
    it('post()', async (done: Function) => {
      const ret = await dao.post('foo.png', Buffer.from([]));
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(PhotoDetails);
      expect(ret.original_filename).toEqual('foo.png');
      done();
    });
  });
  describe('#remove', () => {
    it('remove(id)', async (done: Function) => {
      const ret = await dao.remove('12345');
      expect(ret).toBeDefined();
      expect(ret).toBeInstanceOf(TwitarrResult);
      expect(ret.isSuccess()).toBeTruthy();
      done();
    });
  });
});
