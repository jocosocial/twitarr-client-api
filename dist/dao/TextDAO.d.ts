import { AbstractDAO } from './AbstractDAO';
export declare class TextDAO extends AbstractDAO {
    getFile(filename: string): Promise<any>;
    serverTime(): Promise<{
        time: import("moment").Moment | undefined;
        display: any;
        offset: number;
    }>;
    reactions(): Promise<string[]>;
    announcements(): Promise<any>;
}
