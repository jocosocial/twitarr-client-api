import { UserProfileInfo } from '../model/UserProfileInfo';
import { AbstractDAO } from './AbstractDAO';
export declare class UserDAO extends AbstractDAO {
    login(): Promise<any>;
    profile(username?: string): Promise<UserProfileInfo>;
    update(display_name?: string, email?: string, home_location?: string, real_name?: string, pronouns?: string, room_number?: number): Promise<UserProfileInfo>;
    comment(username: string, comment: string): Promise<UserProfileInfo>;
    toggleStarred(username: string): Promise<boolean>;
    starred(): Promise<any>;
    createUser(registrationCode: string, username: string, password: string, displayName?: string): Promise<import("../api/TwitarrResult").TwitarrResult<any>>;
    changePassword(currentPassword: string, newPassword: string): Promise<import("../api/TwitarrResult").TwitarrResult<any>>;
    resetPassword(username: string, registrationCode: string, newPassword: string): Promise<import("../api/TwitarrResult").TwitarrResult<any>>;
    getMentions(): Promise<number>;
    resetMentions(): Promise<number>;
}
