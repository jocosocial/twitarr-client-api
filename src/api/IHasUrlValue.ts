/**
 * Interface for a class that has a URL value.
 *
 * Any module implementing this interface should have a `urlValue` property
 * (ideally a property `get`ter) which represents how the object should be
 * represented when serialized to a Twitarr URL parameter.
 *
 * @interface
 * @module IHasUrlValue
 */
export interface IHasUrlValue {
  /** The value of this object when added to a Twitarr URL parameter. */
  urlValue: string;
}
