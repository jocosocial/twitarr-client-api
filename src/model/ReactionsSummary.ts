interface IReactions {
  [reaction: string]: {
    count: number;
    me: boolean;
  };
}

/**
 * Represents a collection of stream post reaction metadata.
 * @module ReactionsSummary
 */
export class ReactionsSummary {
  public static fromRest(data: any) {
    return new ReactionsSummary(data);
  }

  public constructor(data: any) {
    this.reactions = data as IReactions;
  }

  /** The reactions. */
  public reactions: IReactions;

  public toJSON() {
    return this.reactions;
  }
}
