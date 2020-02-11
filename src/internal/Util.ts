import moment, { Moment } from 'moment';

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
      throw new Error('Object is empty!');
    }
    if (expectedProperties.length === 0) {
      throw new Error('At least one property must be specified!');
    }
    for (const prop of expectedProperties) {
      if (Util.isEmpty(obj[prop])) {
        throw new Error('Object property "' + prop + '" does not exist or is empty!');
      }
    }
    return true;
  }

  /**
   * Whether or not the passed object is already a date. (Either a [[Moment]] object, or
   * a JavaScript [[Date]] object.)
   */
  public static isDateObject(date: any) {
    if (date instanceof Date) {
      return true;
    }
    if (date && date.isValid) {
      return date.isValid();
    }
    return false;
  }

  /**
   * Create a [[Moment]] from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
   */
  public static toMillis(date: Date | Moment | string | number): number {
    if (typeof date === 'number') {
      return date;
    }
    return moment.utc(date).valueOf();
  }

  /**
   * Create a [[Moment]] from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
   */
  public static toDateTime(date: Date | Moment | string | number | undefined): Moment | undefined {
    if (date === undefined || date === null) {
      return undefined;
    }
    const ret = moment.utc(date);
    if (ret.isValid()) {
      return ret;
    }
    return undefined;
  }

  /**
   * Create an ISO date string from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
   */
  public static toDateString(date: Date | Moment | number) {
    const ret = Util.toDateTime(date);
    if (ret) {
      return ret.toISOString();
    } else {
      return undefined;
    }
  }

  /**
   * Iterate over a set of (optional) properties on the source object, and apply them to the target.
   */
  public static setProperties(target: any, source: any, ...props: string[]) {
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
   * converting them to [[Moment]] objects in the process.
   */
  public static setDateProperties(target: any, source: any, ...props: string[]) {
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
  public static setEpochProperties(target: any, source: any, ...props: string[]) {
    if (!Util.isEmpty(source)) {
      for (const prop of props) {
        if (!Util.isEmpty(source[prop])) {
          target[prop] = (Util.toDateTime(source[prop]) as Moment).valueOf();
        }
      }
    }
  }

  /**
   * Create an error with custom properties.
   */
  public static getError(message?: string, code?: number, data?: any) {
    const err = new Error(message);
    (err as any).code = code;
    (err as any).data = data;
    return err;
  }

  /**
   * Throw an Error with custom properties.
   */
  public static throwError(message?: string, code?: number, data?: any) {
    throw Util.getError(message, code, data);
  }
}
