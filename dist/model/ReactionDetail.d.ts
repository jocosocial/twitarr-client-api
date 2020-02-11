import { User } from './User';
/**
 * Represents a reaction.
 * @module ReactionDetail
 */
export declare class ReactionDetail {
    static fromRest(data: any): ReactionDetail;
    constructor(data: any);
    /** The reaction. */
    reaction: string;
    /** The user who reacted. */
    user: User;
    toJSON(): {
        reaction: string;
        user: any;
    };
}
