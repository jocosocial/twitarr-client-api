import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { Announcement } from '../model/Announcement';

import { Util } from '../internal/Util';

import { AbstractDAO } from './AbstractDAO';

export class TextDAO extends AbstractDAO {
  public async getFile(filename: string) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');

    return this.http
      .get('/api/v2/text/' + filename, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return data[filename];
      });
  }

  public async serverTime() {
    return this.http
      .get('/api/v2/time')
      .then(result => this.handleErrors(result))
      .then(data => {
        return {
          time: Util.toDateTime(data.epoch),
          display: data.time,
          offset: data.offset as number,
        };
      });
  }

  public async reactions() {
    return this.http
      .get('/api/v2/reactions')
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.reactions as string[];
      });
  }

  public async announcements() {
    return this.http
      .get('/api/v2/announcements', new TwitarrHTTPOptions().withParameter('app', 'plain'))
      .then(result => this.handleErrors(result))
      .then(data => {
        if (data.announcements) {
          return data.announcements.map(announcement => Announcement.fromRest(announcement));
        }
      });
  }
}
