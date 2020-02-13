/* API
--------------------------- */

import { ErrorMessage } from './api/ErrorMessage';
export * from './api/ErrorMessage';

import { TwitarrAuthConfig } from './api/TwitarrAuthConfig';
export * from './api/TwitarrAuthConfig';

import { TwitarrHTTPOptions } from './api/TwitarrHTTPOptions';
export * from './api/TwitarrHTTPOptions';

import { TwitarrResult } from './api/TwitarrResult';
export * from './api/TwitarrResult';

import { TwitarrServer } from './api/TwitarrServer';
export * from './api/TwitarrServer';

/** @hidden */
const API = {
  ErrorMessage,
  TwitarrAuthConfig,
  TwitarrHTTPOptions,
  TwitarrResult,
  TwitarrServer,
} as const;

/* DAO
--------------------------- */

import { AlertDAO } from './dao/AlertDAO';
export * from './dao/AlertDAO';

import { AutocompleteDAO } from './dao/AutocompleteDAO';
export * from './dao/AutocompleteDAO';

import { EventDAO } from './dao/EventDAO';
export * from './dao/EventDAO';

import { ForumDAO } from './dao/ForumDAO';
export * from './dao/ForumDAO';

import { PhotoDAO } from './dao/PhotoDAO';
export * from './dao/PhotoDAO';

import { SeamailDAO } from './dao/SeamailDAO';
export * from './dao/SeamailDAO';

import { SearchDAO } from './dao/SearchDAO';
export * from './dao/SearchDAO';

import { StreamDAO } from './dao/StreamDAO';
export * from './dao/StreamDAO';

import { TextDAO } from './dao/TextDAO';
export * from './dao/TextDAO';

import { UserDAO } from './dao/UserDAO';
export * from './dao/UserDAO';

/** @hidden */
const DAO = {
  AlertDAO,
  AutocompleteDAO,
  EventDAO,
  ForumDAO,
  PhotoDAO,
  SeamailDAO,
  SearchDAO,
  StreamDAO,
  TextDAO,
  UserDAO,
} as const;

/* Model
--------------------------- */

import { AlertResponse } from './model/AlertResponse';
export * from './model/AlertResponse';

import { Announcement } from './model/Announcement';
export * from './model/Announcement';

import { CalendarEvent } from './model/CalendarEvent';
export * from './model/CalendarEvent';

import { ForumPost } from './model/ForumPost';
export * from './model/ForumPost';

import { ForumResponse } from './model/ForumResponse';
export * from './model/ForumResponse';

import { ForumThread } from './model/ForumThread';
export * from './model/ForumThread';

import { PhotoDetails } from './model/PhotoDetails';
export * from './model/PhotoDetails';

import { ReactionDetail } from './model/ReactionDetail';
export * from './model/ReactionDetail';

import { ReactionsSummary } from './model/ReactionsSummary';
export * from './model/ReactionsSummary';

import { SeamailMessage } from './model/SeamailMessage';
export * from './model/SeamailMessage';

import { SeamailResponse } from './model/SeamailResponse';
export * from './model/SeamailResponse';

import { SeamailThread } from './model/SeamailThread';
export * from './model/SeamailThread';

import { SearchResponse } from './model/SearchResponse';
export * from './model/SearchResponse';

import { StreamPost } from './model/StreamPost';
export * from './model/StreamPost';

import { StreamResponse } from './model/StreamResponse';
export * from './model/StreamResponse';

import { User } from './model/User';
export * from './model/User';

import { UserProfileInfo } from './model/UserProfileInfo';
export * from './model/UserProfileInfo';

/** @hidden */
const Model = {
  AlertResponse,
  Announcement,
  CalendarEvent,
  ForumPost,
  ForumResponse,
  ForumThread,
  PhotoDetails,
  ReactionDetail,
  ReactionsSummary,
  SeamailMessage,
  SeamailResponse,
  SeamailThread,
  SearchResponse,
  StreamPost,
  StreamResponse,
  User,
  UserProfileInfo,
} as const;

/* ReST
--------------------------- */

import { AutomaticHTTP } from './rest/AutomaticHTTP';
export * from './rest/AutomaticHTTP';

import { BrowserHTTP } from './rest/BrowserHTTP';
export * from './rest/BrowserHTTP';

import { CordovaHTTP } from './rest/CordovaHTTP';
export * from './rest/CordovaHTTP';

import { NodeHTTP } from './rest/NodeHTTP';
export * from './rest/NodeHTTP';

/** @hidden */
const Rest = {
  AutomaticHTTP,
  BrowserHTTP,
  CordovaHTTP,
  NodeHTTP,
} as const;

import { Client } from './Client';

export { Client, API, DAO, Model, Rest };
