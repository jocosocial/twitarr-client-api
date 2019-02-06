/**
 * Represents server authentication config.
 * @module TwitarrAuthConfig
 */
export class TwitarrAuthConfig {
  /** The password to authenticate with. */
  public password: string;

  /** The username to connect as. */
  public username: string;

  /** The key to pass to requests. */
  public key: string;

  /**
   * Construct an auth configuration object.
   * @constructor
   */
  constructor(username: string, password: string, key?: string) {
    this.username = username;
    this.password = password;
    this.key = key;
  }

  /**
   * Create a new config object from this existing one.
   */
  public clone() {
    return new TwitarrAuthConfig(this.username, this.password, this.key);
  }
}
