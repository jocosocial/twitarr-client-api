import { Moment } from 'moment';
/**
 * Represents a calendar event.
 * @module CalendarEvent
 */
export declare class CalendarEvent {
    static fromRest(data: any): CalendarEvent;
    constructor(data: any);
    /** The unique event ID. */
    id: string;
    /** The event's title. */
    title: string;
    /** The event's location. */
    location?: string;
    /** The event's starting time. */
    start_time: Moment;
    /** The event's ending time. */
    end_time?: Moment;
    /** Whether the event is official or not. */
    official?: boolean;
    /** The event's extended description. */
    description?: string;
    /** Whether the user is following this event. */
    following?: boolean;
    toJSON(): any;
}
