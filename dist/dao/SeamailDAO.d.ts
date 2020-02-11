import { Moment } from 'moment';
import { SeamailResponse } from '../model/SeamailResponse';
import { SeamailMessage } from '../model/SeamailMessage';
import { AbstractDAO } from './AbstractDAO';
export declare class SeamailDAO extends AbstractDAO {
    get(id: string, skip_mark_read?: boolean): Promise<SeamailResponse>;
    getMetadata(unread?: boolean, after?: Moment | number): Promise<SeamailResponse>;
    getThreads(unread?: boolean, exclude_read_messages?: boolean, after?: Moment | number): Promise<SeamailResponse>;
    create(subject: string, message: string, ...users: string[]): Promise<SeamailResponse>;
    post(id: string, message: string): Promise<SeamailMessage>;
    unreadCount(): Promise<any>;
}
