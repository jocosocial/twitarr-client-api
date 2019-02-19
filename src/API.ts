import { ErrorMessage } from './api/ErrorMessage';
import { TwitarrAuthConfig } from './api/TwitarrAuthConfig';
import { TwitarrError } from './api/TwitarrError';
import { TwitarrHTTPOptions } from './api/TwitarrHTTPOptions';
import { TwitarrResult } from './api/TwitarrResult';
import { TwitarrServer } from './api/TwitarrServer';

import { PhotoDAO } from './dao/PhotoDAO';
import { SeamailDAO } from './dao/SeamailDAO';
import { StreamDAO } from './dao/StreamDAO';
import { UserDAO } from './dao/UserDAO';

import { PhotoDetails } from './model/PhotoDetails';
import { ReactionDetail } from './model/ReactionDetail';
import { ReactionsSummary } from './model/ReactionsSummary';
import { SeamailMessage } from './model/SeamailMessage';
import { SeamailResponse } from './model/SeamailResponse';
import { SeamailThread } from './model/SeamailThread';
import { StreamPost } from './model/StreamPost';
import { StreamResponse } from './model/StreamResponse';
import { User } from './model/User';

import { BrowserHTTP } from './rest/BrowserHTTP';
import { NodeHTTP } from './rest/NodeHTTP';

import { Client } from './Client';

/* tslint:disable:object-literal-sort-keys */
/* tslint:disable:variable-name */

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
  PhotoDAO,
  SeamailDAO,
  StreamDAO,
  UserDAO,
});

/** @hidden */
const Model = Object.freeze({
  PhotoDetails,
  ReactionDetail,
  ReactionsSummary,
  SeamailMessage,
  SeamailResponse,
  SeamailThread,
  StreamPost,
  StreamResponse,
  User,
});

/** @hidden */
const Rest = Object.freeze({
  BrowserHTTP,
  NodeHTTP,
});

/* tslint:enable:object-literal-sort-keys */
/* tslint:enable:variable-name */

/** @hidden */
export { API, DAO, Model, Rest, Client };
