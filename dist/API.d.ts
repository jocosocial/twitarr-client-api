import { ErrorMessage } from './api/ErrorMessage';
import { TwitarrAuthConfig } from './api/TwitarrAuthConfig';
import { TwitarrHTTPOptions } from './api/TwitarrHTTPOptions';
import { TwitarrResult } from './api/TwitarrResult';
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
import { AlertResponse } from './model/AlertResponse';
import { Announcement } from './model/Announcement';
import { CalendarEvent } from './model/CalendarEvent';
import { ForumPost } from './model/ForumPost';
import { ForumResponse } from './model/ForumResponse';
import { ForumThread } from './model/ForumThread';
import { PhotoDetails } from './model/PhotoDetails';
import { ReactionDetail } from './model/ReactionDetail';
import { ReactionsSummary } from './model/ReactionsSummary';
import { SeamailMessage } from './model/SeamailMessage';
import { SeamailResponse } from './model/SeamailResponse';
import { SeamailThread } from './model/SeamailThread';
import { SearchResponse } from './model/SearchResponse';
import { StreamPost } from './model/StreamPost';
import { StreamResponse } from './model/StreamResponse';
import { User } from './model/User';
import { UserProfileInfo } from './model/UserProfileInfo';
import { AutomaticHTTP } from './rest/AutomaticHTTP';
import { BrowserHTTP } from './rest/BrowserHTTP';
import { CordovaHTTP } from './rest/CordovaHTTP';
import { NodeHTTP } from './rest/NodeHTTP';
import { Client } from './Client';
/** @hidden */
declare const API: Readonly<{
    ErrorMessage: typeof ErrorMessage;
    TwitarrAuthConfig: typeof TwitarrAuthConfig;
    TwitarrHTTPOptions: typeof TwitarrHTTPOptions;
    TwitarrResult: typeof TwitarrResult;
    TwitarrServer: typeof TwitarrServer;
}>;
/** @hidden */
declare const DAO: Readonly<{
    AlertDAO: typeof AlertDAO;
    AutocompleteDAO: typeof AutocompleteDAO;
    EventDAO: typeof EventDAO;
    ForumDAO: typeof ForumDAO;
    PhotoDAO: typeof PhotoDAO;
    SeamailDAO: typeof SeamailDAO;
    SearchDAO: typeof SearchDAO;
    StreamDAO: typeof StreamDAO;
    TextDAO: typeof TextDAO;
    UserDAO: typeof UserDAO;
}>;
/** @hidden */
declare const Model: Readonly<{
    AlertResponse: typeof AlertResponse;
    Announcement: typeof Announcement;
    CalendarEvent: typeof CalendarEvent;
    ForumPost: typeof ForumPost;
    ForumResponse: typeof ForumResponse;
    ForumThread: typeof ForumThread;
    PhotoDetails: typeof PhotoDetails;
    ReactionDetail: typeof ReactionDetail;
    ReactionsSummary: typeof ReactionsSummary;
    SeamailMessage: typeof SeamailMessage;
    SeamailResponse: typeof SeamailResponse;
    SeamailThread: typeof SeamailThread;
    SearchResponse: typeof SearchResponse;
    StreamPost: typeof StreamPost;
    StreamResponse: typeof StreamResponse;
    User: typeof User;
    UserProfileInfo: typeof UserProfileInfo;
}>;
/** @hidden */
declare const Rest: Readonly<{
    AutomaticHTTP: typeof AutomaticHTTP;
    BrowserHTTP: typeof BrowserHTTP;
    CordovaHTTP: typeof CordovaHTTP;
    NodeHTTP: typeof NodeHTTP;
}>;
/** @hidden */
export { API, DAO, Model, Rest, Client };
