import { ForumPost } from '../model/ForumPost';
import { ForumResponse } from '../model/ForumResponse';
import { ForumThread } from '../model/ForumThread';
import { ReactionsSummary } from '../model/ReactionsSummary';
import { AbstractDAO } from './AbstractDAO';
export declare class ForumDAO extends AbstractDAO {
    /**
     * Get a list of forum threads.
     */
    list(page?: number, limit?: number, participated?: boolean): Promise<ForumResponse>;
    /**
     * Mark all forums as read.
     */
    markRead(participated?: boolean): Promise<ForumResponse>;
    /** Create a new thread */
    create(subject: string, text: string, photos?: string[], as_mod?: boolean): Promise<ForumThread>;
    /** Get a forum thread */
    get(id: string, page?: number, limit?: number): Promise<ForumThread>;
    /** Post to a forum thread */
    post(id: string, text: string, photos?: string[], as_mod?: boolean): Promise<ForumPost>;
    /** Delete a thread (admin-only) */
    remove(id: string): Promise<boolean>;
    /** Set sticky status for a thread */
    sticky(id: string, sticky?: boolean): Promise<any>;
    /** Set locked status for a thread */
    locked(id: string, locked?: boolean): Promise<any>;
    /** React to a post */
    react(threadId: string, postId: string, reaction: string): Promise<ReactionsSummary>;
    /** React to a post */
    deleteReact(threadId: string, postId: string, reaction: string): Promise<ReactionsSummary>;
    /** Get the list of reactions on a post */
    reactions(threadId: string, postId: string): Promise<any>;
    /** Get an individual thread post */
    getPost(threadId: string, postId: string): Promise<ForumPost>;
    /** Get an individual thread post */
    updatePost(threadId: string, postId: string, text?: string, photos?: string[]): Promise<ForumPost>;
    /** Delete an individual thread post */
    removePost(threadId: string, postId: string): Promise<boolean>;
}
