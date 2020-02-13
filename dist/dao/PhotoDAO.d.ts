import { AbstractDAO } from './AbstractDAO';
import { PhotoDetails } from '../model/PhotoDetails';
export declare class PhotoDAO extends AbstractDAO {
    /**
     * Retrieve a photo's metadata.
     */
    get(id: string): Promise<PhotoDetails>;
    /**
     * Delete/remove a photo..
     */
    remove(id: string): Promise<import("../API").TwitarrResult<any>>;
    /**
     * Post a photo.
     */
    post(fileName: string, photoData: Blob): Promise<PhotoDetails>;
    /**
     * Post a profile photo.
     */
    profile(username: string, fileName: string, photoData: Blob): Promise<PhotoDetails>;
    /**
     * Remove the user's profile photo.
     */
    removeProfile(): Promise<any>;
}
