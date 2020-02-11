import { IHasHTTP } from './api/IHasHTTP';
import { ITwitarrHTTP } from './api/ITwitarrHTTP';
import { TwitarrServer } from './api/TwitarrServer';
import { AlertDAO } from './dao/AlertDAO';
import { AutocompleteDAO } from './dao/AutocompleteDAO';
import { EventDAO } from './dao/EventDAO';
import { ForumDAO } from './dao/ForumDAO';
import { PhotoDAO } from './dao/PhotoDAO';
import { SeamailDAO } from './dao/SeamailDAO';
import { SearchDAO } from './dao/SearchDAO';
import { StreamDAO } from './dao/StreamDAO';
import { TextDAO } from './dao/TextDAO';
import { UserDAO } from './dao/UserDAO';
/**
 * The Twitarr client.  This is the primary interface to Twitarr servers.
 * @module Client
 */
export declare class Client implements IHasHTTP {
    /**
     * Given an TwitarrServer object, check that it can be connected to.
     *
     * @param server - the server to check
     * @param httpImpl - the [[ITwitarrHTTP]] implementation to use
     * @param timeout - how long to wait before giving up when making ReST calls
     */
    static checkServer(server: TwitarrServer, httpImpl?: ITwitarrHTTP, timeout?: number): Promise<boolean>;
    /** The default TwitarrHTTP implementation to be used when making requests */
    private static defaultHttp;
    /** the TwitarrHTTP implementation that will be used when making requests */
    http: ITwitarrHTTP;
    /** The remote server to connect to */
    server: TwitarrServer;
    /**
     * Construct a new Twitarr client.
     * @constructor
     * @param httpImpl - The TwitarrHTTP implementation to use. Normally
     *        this will automatically choose the best implementation
     *        based on the environment.
     */
    constructor(httpImpl?: ITwitarrHTTP);
    isLoggedIn(): Promise<boolean>;
    /**
     * Connect to an Twitarr server and return a [[TwitarrServer]] for that connection.
     */
    connect(name: string, url: string, username?: string, password?: string, timeout?: number): Promise<this>;
    /**
     * Get an alerts DAO.
     */
    alerts(): AlertDAO;
    /**
     * Get an autocomplete DAO.
     */
    autocomplete(): AutocompleteDAO;
    /**
     * Get an event DAO.
     */
    events(): EventDAO;
    /**
     * Get a forum DAO.
     */
    forums(): ForumDAO;
    /**
     * Get a photo DAO.
     */
    photo(): PhotoDAO;
    /**
     * Get a seamail DAO.
     */
    seamail(): SeamailDAO;
    /**
     * Get a search DAO.
     */
    search(): SearchDAO;
    /**
     * Get a stream DAO.
     */
    stream(): StreamDAO;
    /**
     * Get a text DAO.
     */
    text(): TextDAO;
    /**
     * Get a user DAO.
     */
    user(): UserDAO;
}
