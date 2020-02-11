import { User } from './User';
import { StreamPost } from './StreamPost';
export declare class UserProfileInfo {
    static fromRest(data: any): UserProfileInfo;
    constructor(data: any);
    /**
     * A comment about the user
     * @hidden
     */
    private _comment;
    /**
     * Whether the user is starred
     * @hidden
     */
    _starred: boolean | undefined;
    /** The user */
    user: User;
    /** The user's recent posts */
    recentStreamPosts: StreamPost[];
    /** A comment about the user */
    readonly comment: string | undefined;
    /** Whether the user is starred */
    readonly starred: boolean;
}
