declare const describe, beforeEach, it, expect, require;

import { Util } from '../../src/internal/Util';

import { DateTime } from 'luxon';

/** @hidden */
const ARBITRARY_STRING = '2017-08-08T12:29:56.000Z';

/** @hidden */
const ARBITRARY_EPOCH = 1502195396000;

describe('internal/Util', () => {
  describe('#isDateObject()', () => {
    it('undefined', () => {
      expect(Util.isDateObject(undefined)).toEqual(false);
    });
    it('null', () => {
      expect(Util.isDateObject(null)).toEqual(false);
    });
    it('DateTime.fromMillis(0)', () => {
      expect(Util.isDateObject(DateTime.fromMillis(0, { zone: 'utc' }))).toEqual(true);
    });
    it('0', () => {
      expect(Util.isDateObject(0)).toEqual(false);
    });
    it('new Date()', () => {
      expect(Util.isDateObject(new Date(ARBITRARY_EPOCH))).toEqual(true);
    });
    it(ARBITRARY_STRING, () => {
      expect(Util.isDateObject(ARBITRARY_STRING)).toEqual(false);
    });
    it('2017-08-08T12:29:56Z', () => {
      expect(Util.isDateObject('2017-08-08T12:29:56Z')).toEqual(false);
    });
    it('new Date(0)', () => {
      expect(Util.isDateObject(new Date(0))).toEqual(true);
    });
  });

  describe('#toDateString()', () => {
    it('undefined', () => {
      expect(Util.toDateString(undefined)).toBeUndefined();
    });
    it('null', () => {
      expect(Util.toDateTime(null)).toBeUndefined();
    });
    it('DateTime.fromMillis(0)', () => {
      expect(Util.toDateTime(DateTime.fromMillis(0, { zone: 'utc' })).toMillis()).toEqual(0);
    });
    it('0', () => {
      expect(Util.toDateTime(0).toMillis()).toEqual(0);
    });
    it('new Date()', () => {
      expect(Util.toDateTime(new Date(ARBITRARY_EPOCH)).toMillis()).toEqual(ARBITRARY_EPOCH);
    });
    it(ARBITRARY_STRING, () => {
      expect(Util.toDateTime(ARBITRARY_STRING).toMillis()).toEqual(ARBITRARY_EPOCH);
    });
    it('2017-08-08T12:29:56Z', () => {
      expect(Util.toDateTime('2017-08-08T12:29:56Z').toMillis()).toEqual(ARBITRARY_EPOCH);
    });
  });

  describe('#toDateString()', () => {
    it('undefined', () => {
      expect(Util.toDateString(undefined)).toBeUndefined();
    });
    it('null', () => {
      expect(Util.toDateString(null)).toBeUndefined();
    });
    it('DateTime.fromMillis(0)', () => {
      expect(Util.toDateString(DateTime.fromMillis(0).toUTC())).toEqual('1970-01-01T00:00:00.000Z');
    });
    it('0', () => {
      expect(Util.toDateString(0)).toEqual('1970-01-01T00:00:00.000Z');
    });
    it('new Date()', () => {
      expect(Util.toDateString(new Date(ARBITRARY_EPOCH))).toEqual(ARBITRARY_STRING);
    });
    it('new Date(0)', () => {
      expect(Util.toDateString(new Date(0))).toEqual('1970-01-01T00:00:00.000Z');
    });
  });

  describe('#setProperties()', () => {
    let target: any;
    beforeEach(() => {
      target = {};
    });
    it('undefined', () => {
      Util.setProperties(target, undefined, 'foo', 'bar');
      expect(target).toMatchObject({});
    });
  });

  describe('#isEmpty()', () => {
    it('undefined', () => expect(Util.isEmpty(undefined)).toBeTruthy());
    it('undefined, undefined', () => expect(Util.isEmpty(undefined, undefined)).toBeTruthy());
    it('undefined, null', () => expect(Util.isEmpty(undefined, null)).toBeTruthy());
    it('undefined, ""', () => expect(Util.isEmpty(undefined, '')).toBeTruthy());
    it('""', () => expect(Util.isEmpty('')).toBeTruthy());
    it('"foo"', () => expect(Util.isEmpty('foo')).toBeFalsy());
    it('"foo", undefined', () => expect(Util.isEmpty('foo', undefined)).toBeFalsy());
    it('1', () => expect(Util.isEmpty(1)).toBeFalsy());
    it('1, undefined', () => expect(Util.isEmpty(1, undefined)).toBeFalsy());
  });

  describe('#assertNotEmpty()', () => {
    it('undefined', () => expect(() => Util.assertHasProperties(undefined)).toThrow());
    it('null', () => expect(() => Util.assertHasProperties(null)).toThrow());
    it('""', () => expect(() => Util.assertHasProperties('')).toThrow());
    it('foo', () => expect(() => Util.assertHasProperties('foo')).toThrow());
    it('{}', () => expect(() => Util.assertHasProperties({})).toThrow());
    it('{}, foo', () => expect(() => Util.assertHasProperties({}, 'foo')).toThrow());
    it('{foo:bar}, baz', () => expect(() => Util.assertHasProperties({ foo: 'bar' }, 'baz')).toThrow());
    it('{foo:""}, foo', () => expect(() => Util.assertHasProperties({ foo: '' }, 'foo')).toThrow());
    it('{foo:bar}, foo', () => expect(Util.assertHasProperties({ foo: 'bar' }, 'foo')).toBeTruthy());
  });
});
