import { User } from './User';

import { Util } from '../internal/Util';

import { Moment } from 'moment';
import { ReactionsSummary } from './ReactionsSummary';
import { PhotoDetails } from './PhotoDetails';

/**
 * Represents a stream post.
 * @module StreamPost
 */
export class StreamPost {
  public static fromRest(data: any) {
    Util.assertHasProperties(data, 'author', 'id', 'text', 'timestamp');

    const ret = new StreamPost();

    Util.setProperties(ret, data, 'id', 'locked', 'text');
    Util.setDateProperties(ret, data, 'timestamp');
    if (!Util.isEmpty(data.author)) {
      ret.author = User.fromRest(data.author);
    }
    if (!Util.isEmpty(data.reactions)) {
      ret.reactions = ReactionsSummary.fromRest(data.reactions);
    }
    if (!Util.isEmpty(data.photo)) {
      ret.photo = PhotoDetails.fromRest(data.photo);
    }
    if (!Util.isEmpty(data.parent_chain) && Array.isArray(data.parent_chain)) {
      ret.parent_chain = data.parent_chain;
    }
    if (!Util.isEmpty(data.children) && Array.isArray(data.children)) {
      ret.children = data.children.map(child => StreamPost.fromRest(child));
    }

    return ret;
  }

  /** The unique id. */
  public id: string;

  /** The user that wrote the post. */
  public author: User;

  /** Whether the post is locked. */
  public locked: boolean;

  /** The time the post was created. */
  public timestamp: Moment;

  /** The text (contents) of the post. */
  public text: string;

  /** The reactions (like, etc.) to the post. */
  public reactions: ReactionsSummary;

  /** The metadata of photos in the post. */
  public photo: PhotoDetails;

  /** The chain of parent posts. */
  public parent_chain: string[] = [];

  /** The children of this post. */
  public children: StreamPost[] = [];

  public toJSON() {
    return {
      author: this.author.toJSON(),
      children: this.children.map(child => child.toJSON()),
      id: this.id,
      locked: this.locked,
      parent_chain: this.parent_chain,
      photo: this.photo ? this.photo.toJSON() : undefined,
      reactions: this.reactions ? this.reactions.toJSON() : undefined,
      text: this.text,
      timestamp: this.timestamp,
    };
  }
}
