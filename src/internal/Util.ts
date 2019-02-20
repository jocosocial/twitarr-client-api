import { TwitarrError } from '../api/TwitarrError';

import { Moment } from 'moment';

/** @hidden */
const moment = require('moment');
moment.fn.toJSON = () => {
  return this.valueOf();
};

/** @hidden */
const dateFormat = 'YYYY-MM-DDTHH:mm:ss.SSSZZ';

/**
 * A utility class for random stuff.
 * @module Util
 */
export class Util {
  /**
   * Whether a string is empty.
   * @param value
   */
  public static isEmpty(...values: any[]) {
    if (values.length === 0) {
      return true;
    }
    for (const value of values) {
      if (value !== undefined && value !== null) {
        if (typeof value === 'string') {
          if (value.trim().length > 0) {
            return false;
          }
        } else {
          return false;
        }
      }
    }
    return true;
  }

  /**
   * Whether or not the passed object is already a date. (Either a [[Moment]] object, or
   * a JavaScript [[Date]] object.)
   */
  public static isDateObject(date: any) {
    return moment.isMoment(date) || date instanceof Date;
  }

  /**
   * Create a [[Moment]] from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
   * [[Moment]] dates in Twitarr.js will always be converted internally to UTC to avoid time
   * zone issues.
   */
  public static toMoment(date: Date | Moment | string | number): Moment {
    if (date === undefined || date === null) {
      return undefined;
    } else if (moment.isMoment(date)) {
      return (date as Moment).utc();
    } else if (typeof date === 'number' || date instanceof Date || typeof date === 'string' || date instanceof String) {
      return moment(date).utc();
    } else {
      throw new TwitarrError('Unable to parse type "' + typeof date + '" as a date.');
    }
  }

  /**
   * Create a date string from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
   * Dates in Twitarr.js will always be converted internally to UTC before stringifying to
   * avoid time zone issues.
   */
  public static toDateString(date: Date | Moment | number) {
    const ret = Util.toMoment(date);
    if (ret) {
      return ret.utc().format(dateFormat);
    } else {
      return undefined;
    }
  }

  public static setProperties(target: any, source: any, ...props) {
    if (!Util.isEmpty(source)) {
      for (const prop of props) {
        if (!Util.isEmpty(source[prop])) {
          target[prop] = source[prop];
        }
      }
    }
  }

  public static setDateProperties(target: any, source: any, ...props) {
    if (!Util.isEmpty(source)) {
      for (const prop of props) {
        if (!Util.isEmpty(source[prop])) {
          target[prop] = Util.toMoment(source[prop]);
        }
      }
    }
  }
}
