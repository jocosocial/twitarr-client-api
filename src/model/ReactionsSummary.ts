interface IReactions {
  [reaction: string]: { count: number, me: boolean };
}

/**
 * Represents a collection of stream post reaction metadata.
 * @module ReactionsSummary
 */
export class ReactionsSummary {
  public static fromRest(data: any) {
    const ret = new ReactionsSummary();
    ret.reactions = data as IReactions;
    return ret;
  }

  /** The reactions. */
  public reactions: IReactions;

  public toJSON() {
    return this.reactions;
  }
}
