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
export declare class ReactionsSummary {
    static fromRest(data: any): ReactionsSummary;
    constructor(data: any);
    /** The reactions. */
    reactions: IReactions;
    toJSON(): IReactions;
}
export {};
