declare const describe, beforeEach, it, expect, require;

import { SeamailMessage } from '../../src/model/SeamailMessage';

import { User } from '../../src/model/User';

/** @hidden */
const moment = require('moment');

/** @hidden */
const ARBITRARY_EPOCH = 1502195396000;

const testUser = {
  email: 'test@example.com',
  last_login: ARBITRARY_EPOCH,
  username: 'test',
};

const otherUser = {
  email: 'other@example.com',
  last_login: ARBITRARY_EPOCH,
  username: 'other',
};

describe('SeamailMessage', () => {
  it('empty constructor', () => {
    expect(new SeamailMessage()).toMatchObject({ });
  });

  describe('#fromRest', () => {
    it('undefined', () => {
      expect(SeamailMessage.fromRest(undefined)).toMatchObject({ });
    });
    it('{}', () => {
      expect(SeamailMessage.fromRest({ })).toMatchObject({ });
    });
    it('no users', () => {
      const message = SeamailMessage.fromRest({
        author: testUser,
        id: '1234',
        text: 'seamail!',
        timestamp: ARBITRARY_EPOCH,
      });
      expect(message.author).toBeDefined();
      expect(message.author.email).toEqual(testUser.email);
      expect(message.author.last_login.isSame(moment(ARBITRARY_EPOCH))).toBeTruthy();
      expect(message.author.username).toEqual(testUser.username);
      expect(message.id).toBe('1234');
      expect(message.text).toBe('seamail!');
      expect(message.timestamp.isSame(moment(ARBITRARY_EPOCH))).toBeTruthy();
      expect(message.read_users).toBeDefined();
      expect(message.read_users.length).toEqual(0);
    });
    it('with users', () => {
      const message = SeamailMessage.fromRest({
        author: testUser,
        id: '1234',
        read_users: [
          testUser,
          otherUser,
        ],
        text: 'seamail!',
        timestamp: ARBITRARY_EPOCH,
      });
      expect(message.read_users).toBeDefined();
      expect(message.read_users.length).toEqual(2);
      expect(message.read_users[0]).toBeInstanceOf(User);
      expect(message.read_users[0].username).toEqual(testUser.username);
      expect(message.read_users[1]).toBeInstanceOf(User);
      expect(message.read_users[1].username).toEqual(otherUser.username);
    });
  });
});
