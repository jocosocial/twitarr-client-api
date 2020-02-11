import { Moment } from 'moment';
import { CalendarEvent } from '../model/CalendarEvent';
import { AbstractDAO } from './AbstractDAO';
export declare class EventDAO extends AbstractDAO {
    /**
     * Retrieve the complete list of events.
     */
    all(): Promise<any>;
    /**
     * Retrieve an individual event.
     */
    get(id: string): Promise<CalendarEvent>;
    /**
     * Favorite an event.
     */
    favorite(id: string): Promise<CalendarEvent>;
    /**
     * Un-favorite an event.
     */
    unfavorite(id: string): Promise<CalendarEvent>;
    /**
     * Remove an individual event. (Must be an admin.)
     */
    remove(id: string): Promise<boolean>;
    /**
     * Update an individual event. (Must be an admin.)
     */
    update(id: string, title?: string, description?: string, location?: string, start_time?: Moment | number, end_time?: Moment | number): Promise<CalendarEvent>;
    /**
     * Retrieve the list of events for a given day.
     */
    getDay(date: Moment | number, mine?: boolean): Promise<any>;
}
