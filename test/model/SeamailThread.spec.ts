declare const describe, beforeEach, it, expect, require;

import { SeamailThread } from '../../src/model/SeamailThread';
import { User } from '../../src/model/User';

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

const firstMessage = {
  author: testUser,
  id: '1',
  read_users: [otherUser],
  text: 'message 1',
  timestamp: ARBITRARY_EPOCH,
};

const secondMessage = {
  author: otherUser,
  id: '2',
  read_users: [],
  text: 'message 2',
  timestamp: ARBITRARY_EPOCH,
};

describe('SeamailThread', () => {
  describe('#fromRest', () => {
    it('undefined', () => {
      expect(() => SeamailThread.fromRest(undefined)).toThrow();
    });
    it('{}', () => {
      expect(() => SeamailThread.fromRest({})).toThrow();
    });
    it('no messages', () => {
      const thread = SeamailThread.fromRest({
        id: '1234',
        message_count: 0,
        subject: 'messages',
        timestamp: ARBITRARY_EPOCH,
        users: [testUser, otherUser],
      });
      expect(thread.id).toEqual('1234');
      expect(thread.message_count).toEqual(0);
      expect(thread.subject).toEqual('messages');
      expect(thread.timestamp).toBeDefined();
      expect(thread.timestamp.toMillis()).toEqual(ARBITRARY_EPOCH);
      expect(thread.users).toBeDefined();
      expect(thread.users.length).toEqual(2);
      expect(thread.users[0]).toBeInstanceOf(User);
      expect(thread.users[0].username).toEqual(testUser.username);
      expect(thread.messages).toBeDefined();
      expect(thread.messages.length).toEqual(0);
    });
    it('with messages', () => {
      const thread = SeamailThread.fromRest({
        id: '1234',
        message_count: 0,
        messages: [firstMessage, secondMessage],
        subject: 'messages',
        timestamp: ARBITRARY_EPOCH,
        users: [],
      });
      expect(thread.id).toEqual('1234');
      expect(thread.message_count).toEqual(0);
      expect(thread.subject).toEqual('messages');
      expect(thread.timestamp).toBeDefined();
      expect(thread.timestamp.toMillis()).toEqual(ARBITRARY_EPOCH);
      expect(thread.users).toBeDefined();
      expect(thread.users.length).toEqual(0);
      expect(thread.messages).toBeDefined();
      expect(thread.messages.length).toEqual(2);
      expect(thread.messages[0].author).toBeInstanceOf(User);
      expect(thread.messages[0].text).toEqual('message 1');
    });
    /*
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
    */
  });
});
