import { Moment } from 'moment';
/**
 * A utility class for random stuff.
 * @module Util
 */
export declare class Util {
    /**
     * Whether a string is empty.
     * @param value
     */
    static isEmpty(...values: any[]): boolean;
    static assertHasProperties(obj?: any, ...expectedProperties: any[]): boolean;
    /**
     * Whether or not the passed object is already a date. (Either a [[Moment]] object, or
     * a JavaScript [[Date]] object.)
     */
    static isDateObject(date: any): any;
    /**
     * Create a [[Moment]] from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
     */
    static toMillis(date: Date | Moment | string | number): number;
    /**
     * Create a [[Moment]] from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
     */
    static toDateTime(date: Date | Moment | string | number | undefined): Moment | undefined;
    /**
     * Create an ISO date string from any form of date (JavaScript [[Date]], [[Moment]], or epoch).
     */
    static toDateString(date: Date | Moment | number): string | undefined;
    /**
     * Iterate over a set of (optional) properties on the source object, and apply them to the target.
     */
    static setProperties(target: any, source: any, ...props: string[]): void;
    /**
     * Iterate over a set of (optional) properties on the source object, and apply them to the target
     * converting them to [[Moment]] objects in the process.
     */
    static setDateProperties(target: any, source: any, ...props: string[]): void;
    /**
     * Iterate over a set of (optional) properties on the source object, and apply them to the target
     * converting them to epoch time objects in the process.
     */
    static setEpochProperties(target: any, source: any, ...props: string[]): void;
    /**
     * Create an error with custom properties.
     */
    static getError(message?: string, code?: number, data?: any): Error;
    /**
     * Throw an Error with custom properties.
     */
    static throwError(message?: string, code?: number, data?: any): void;
}
