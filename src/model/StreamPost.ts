import { DateTime } from 'luxon';

import { Util } from '../internal/Util';

import { ReactionsSummary } from './ReactionsSummary';
import { PhotoDetails } from './PhotoDetails';
import { User } from './User';

/**
 * Represents a stream post.
 * @module StreamPost
 */
export class StreamPost {
  public static fromRest(data: any) {
    return new StreamPost(data);
  }

  public constructor(data: any) {
    Util.assertHasProperties(data, 'author', 'id', 'text', 'timestamp');

    this.author = User.fromRest(data.author);
    this.id = data.id;
    this.text = data.text;
    this.timestamp = Util.toDateTime(data.timestamp) as DateTime;

    Util.setProperties(this, data, 'locked');
    if (!Util.isEmpty(data.reactions)) {
      this.reactions = ReactionsSummary.fromRest(data.reactions);
    }
    if (!Util.isEmpty(data.photo)) {
      this.photo = PhotoDetails.fromRest(data.photo);
    }
    if (!Util.isEmpty(data.parent_chain) && Array.isArray(data.parent_chain)) {
      this.parent_chain = data.parent_chain;
    }
    if (!Util.isEmpty(data.children) && Array.isArray(data.children)) {
      this.children = data.children.map((child: any) => StreamPost.fromRest(child));
    }
  }

  /** The unique id. */
  public id: string;

  /** The user that wrote the post. */
  public author: User;

  /** Whether the post is locked. */
  public locked?: boolean;

  /** The time the post was created. */
  public timestamp: DateTime;

  /** The text (contents) of the post. */
  public text: string;

  /** The reactions (like, etc.) to the post. */
  public reactions?: ReactionsSummary;

  /** The metadata of photos in the post. */
  public photo?: PhotoDetails;

  /** The chain of parent posts. */
  public parent_chain: string[] = [];

  /** The children of this post. */
  public children: StreamPost[] = [];

  public toJSON(): any {
    return {
      author: this.author.toJSON(),
      children: this.children.map(child => child.toJSON()),
      id: this.id,
      locked: this.locked,
      parent_chain: this.parent_chain,
      photo: this.photo ? this.photo.toJSON() : undefined,
      reactions: this.reactions ? this.reactions.toJSON() : undefined,
      text: this.text,
      timestamp: this.timestamp ? this.timestamp.toMillis() : undefined,
    };
  }
}
