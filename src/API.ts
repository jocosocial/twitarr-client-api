import { ErrorMessage } from './api/ErrorMessage';
import { TwitarrAuthConfig } from './api/TwitarrAuthConfig';
import { TwitarrError } from './api/TwitarrError';
import { TwitarrHTTPOptions } from './api/TwitarrHTTPOptions';
import { TwitarrResult } from './api/TwitarrResult';
import { TwitarrServer } from './api/TwitarrServer';

import { AlertDAO } from './dao/AlertDAO';
import { AutocompleteDAO } from './dao/AutocompleteDAO';
import { EventDAO } from './dao/EventDAO';
import { PhotoDAO } from './dao/PhotoDAO';
import { SeamailDAO } from './dao/SeamailDAO';
import { SearchDAO } from './dao/SearchDAO';
import { StreamDAO } from './dao/StreamDAO';
import { TextDAO } from './dao/TextDAO';
import { UserDAO } from './dao/UserDAO';

import { AlertResponse } from './model/AlertResponse';
import { Announcement } from './model/Announcement';
import { Event } from './model/Event';
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

import { BrowserHTTP } from './rest/BrowserHTTP';
import { NodeHTTP } from './rest/NodeHTTP';

import { Client } from './Client';

/** @hidden */
const API = Object.freeze({
  ErrorMessage,
  TwitarrAuthConfig,
  TwitarrError,
  TwitarrHTTPOptions,
  TwitarrResult,
  TwitarrServer,
});

/** @hidden */
const DAO = Object.freeze({
  AlertDAO,
  AutocompleteDAO,
  EventDAO,
  PhotoDAO,
  SeamailDAO,
  SearchDAO,
  StreamDAO,
  TextDAO,
  UserDAO,
});

/** @hidden */
const Model = Object.freeze({
  AlertResponse,
  Announcement,
  Event,
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
});

/** @hidden */
const Rest = Object.freeze({
  BrowserHTTP,
  NodeHTTP,
});

/** @hidden */
export { API, DAO, Model, Rest, Client };
