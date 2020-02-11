import { Moment } from 'moment';
import { AlertResponse } from '../model/AlertResponse';
import { AbstractDAO } from './AbstractDAO';
interface IAlertCounts {
    unnoticed_announcements: number;
    unnoticed_alerts: boolean;
    seamail_unread_count: number;
    unnoticed_mentions: number;
    unnoticed_upcoming_events: number;
}
export declare class AlertDAO extends AbstractDAO {
    /**
     * Retrieve an alert response containing all posts/etc. that are un-viewed.
     */
    get(last_checked_time?: Moment | number, no_reset?: boolean): Promise<AlertResponse>;
    lastChecked(last_checked_time: Moment | number): Promise<Moment | undefined>;
    count(last_checked_time?: Moment | number): Promise<IAlertCounts>;
}
export {};
