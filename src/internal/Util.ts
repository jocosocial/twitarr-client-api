import { TwitarrError } from '../api/TwitarrError';

import { DateTime } from 'luxon';

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

  public static assertHasProperties(obj?: any, ...expectedProperties: any[]) {
    if (Util.isEmpty(obj)) {
      throw new TwitarrError('Object is empty!');
    }
    if (expectedProperties.length === 0) {
      throw new TwitarrError('At least one property must be specified!');
    }
    for (const prop of expectedProperties) {
      if (Util.isEmpty(obj[prop])) {
        throw new TwitarrError('Object property "' + prop + '" does not exist or is empty!');
      }
    }
    return true;
  }

  /**
   * Whether or not the passed object is already a date. (Either a [[DateTime]] object, or
   * a JavaScript [[Date]] object.)
   */
  public static isDateObject(date: any) {
    return DateTime.isDateTime(date) || date instanceof Date;
  }

  /**
   * Create a [[DateTime]] from any form of date (JavaScript [[Date]], [[DateTime]], or epoch).
   */
  public static toDateTime(date: Date | DateTime | string | number): DateTime {
    let ret;
    if (date === undefined || date === null) {
      ret = undefined;
    } else if (DateTime.isDateTime(date)) {
      ret = date as DateTime;
    } else if (typeof date === 'number') {
      ret = DateTime.fromMillis(date, { zone: 'utc' });
    } else if (date instanceof Date) {
      ret = DateTime.fromJSDate(date, { zone: 'utc' });
    } else if (typeof date === 'string' || (date as any) instanceof String) {
      ret = DateTime.fromISO(date, { zone: 'utc' });
    } else {
      throw new TwitarrError('Unable to parse type "' + typeof date + '" as a date.');
    }
    // console.log('returning:', ret);
    return ret;
  }

  /**
   * Create an ISO date string from any form of date (JavaScript [[Date]], [[DateTime]], or epoch).
   */
  public static toDateString(date: Date | DateTime | number) {
    const ret = Util.toDateTime(date);
    if (ret) {
      return ret.toISO();
    } else {
      return undefined;
    }
  }

  /**
   * Iterate over a set of (optional) properties on the source object, and apply them to the target.
   */
  public static setProperties(target: any, source: any, ...props) {
    if (!Util.isEmpty(source)) {
      for (const prop of props) {
        if (!Util.isEmpty(source[prop])) {
          target[prop] = source[prop];
        }
      }
    }
  }

  /**
   * Iterate over a set of (optional) properties on the source object, and apply them to the target
   * converting them to [[DateTime]] objects in the process.
   */
  public static setDateProperties(target: any, source: any, ...props) {
    if (!Util.isEmpty(source)) {
      for (const prop of props) {
        if (!Util.isEmpty(source[prop])) {
          target[prop] = Util.toDateTime(source[prop]);
        }
      }
    }
  }

  /**
   * Iterate over a set of (optional) properties on the source object, and apply them to the target
   * converting them to epoch time objects in the process.
   */
  public static setEpochProperties(target: any, source: any, ...props) {
    if (!Util.isEmpty(source)) {
      for (const prop of props) {
        if (!Util.isEmpty(source[prop])) {
          target[prop] = Util.toDateTime(source[prop]).toMillis();
        }
      }
    }
  }
}
