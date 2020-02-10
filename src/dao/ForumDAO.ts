import { TwitarrHTTPOptions } from '../api/TwitarrHTTPOptions';

import { ForumPost } from '../model/ForumPost';
import { ForumResponse } from '../model/ForumResponse';
import { ForumThread } from '../model/ForumThread';
import { ReactionDetail } from '../model/ReactionDetail';
import { ReactionsSummary } from '../model/ReactionsSummary';

import { AbstractDAO } from './AbstractDAO';

export class ForumDAO extends AbstractDAO {
  /**
   * Get a list of forum threads.
   */
  public async list(page?: number, limit?: number, participated?: boolean) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (page) {
      options.parameters.page = '' + page;
    }
    if (limit) {
      options.parameters.limit = '' + limit;
    }
    if (participated) {
      options.parameters.participated = '' + participated;
    }
    return this.http
      .get('/api/v2/forums', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumResponse.fromRest(data);
      });
  }

  /**
   * Mark all forums as read.
   */
  public async markRead(participated?: boolean) {
    const options = new TwitarrHTTPOptions();
    if (participated) {
      options.parameters.participated = '' + participated;
    }
    return this.http
      .post('/api/v2/forum/mark_all_read', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumResponse.fromRest(data);
      });
  }

  /** Create a new thread */
  public async create(subject: string, text: string, photos?: string[], as_mod?: boolean) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain').withData({
      subject,
      text,
    });
    if (photos && photos.length > 0) {
      options.data.photos = photos;
    }
    if (as_mod) {
      options.data.as_mod = as_mod;
    }
    return this.http
      .post('/api/v2/forums', options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumThread.fromRest(data.forum_thread);
      });
  }

  /** Get a forum thread */
  public async get(id: string, page?: number, limit?: number) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    if (page) {
      options.parameters.page = '' + page;
    }
    if (limit) {
      options.parameters.limit = '' + limit;
    }
    return this.http
      .get('/api/v2/forums/' + id, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumThread.fromRest(data.forum_thread);
      });
  }

  /** Post to a forum thread */
  public async post(id: string, text: string, photos?: string[], as_mod?: boolean) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain').withData({
      text,
    });
    if (photos && photos.length > 0) {
      options.data.photos = photos;
    }
    if (as_mod) {
      options.data.as_mod = as_mod;
    }
    return this.http
      .post('/api/v2/forums/' + id, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumPost.fromRest(data.forum_post);
      });
  }

  /** Delete a thread (admin-only) */
  public async remove(id: string) {
    return this.http
      .httpDelete('/api/v2/forums/' + id)
      .then(result => this.handleErrors(result))
      .then(() => {
        return true;
      });
  }

  /** Set sticky status for a thread */
  public async sticky(id: string, sticky?: boolean) {
    return this.http
      .post('/api/v2/forum/' + id + '/sticky/' + (sticky ? true : false))
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.sticky;
      });
  }

  /** Set locked status for a thread */
  public async locked(id: string, locked?: boolean) {
    return this.http
      .post('/api/v2/forum/' + id + '/locked/' + (locked ? true : false))
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.locked;
      });
  }

  /** React to a post */
  public async react(threadId: string, postId: string, reaction: string) {
    return this.http
      .post('/api/v2/forums/' + threadId + '/' + postId + '/react/' + reaction)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ReactionsSummary.fromRest(data.reactions);
      });
  }

  /** React to a post */
  public async deleteReact(threadId: string, postId: string, reaction: string) {
    return this.http
      .httpDelete('/api/v2/forums/' + threadId + '/' + postId + '/react/' + reaction)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ReactionsSummary.fromRest(data.reactions);
      });
  }

  /** Get the list of reactions on a post */
  public async reactions(threadId: string, postId: string) {
    return this.http
      .get('/api/v2/forums/' + threadId + '/' + postId + '/react')
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.reactions.map((reaction: any) => ReactionDetail.fromRest(reaction));
      });
  }
  /** Get an individual thread post */
  public async getPost(threadId: string, postId: string) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain');
    return this.http
      .get('/api/v2/forums/' + threadId + '/' + postId, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumPost.fromRest(data.forum_post);
      });
  }

  /** Get an individual thread post */
  public async updatePost(threadId: string, postId: string, text?: string, photos?: string[]) {
    const options = new TwitarrHTTPOptions().withParameter('app', 'plain').withData({});
    if (text) {
      options.data.text = text;
    }
    if (photos && photos.length > 0) {
      options.data.photos = photos;
    }
    return this.http
      .post('/api/v2/forums/' + threadId + '/' + postId, options)
      .then(result => this.handleErrors(result))
      .then(data => {
        return ForumPost.fromRest(data.forum_post);
      });
  }

  /** Delete an individual thread post */
  public async removePost(threadId: string, postId: string) {
    return this.http
      .httpDelete('/api/v2/forums/' + threadId + '/' + postId)
      .then(result => this.handleErrors(result))
      .then(data => {
        return data.thread_deleted as boolean;
      });
  }
}
