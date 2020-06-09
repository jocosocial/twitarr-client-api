<a name="0.1.2-beta.1"></a>
## [0.1.2-beta.1](https://github.com/seamonkeysocial/twitarr-client-api/compare/v0.1.1...v0.1.2-beta.1) (2020-06-09)


### Bug Fixes

* **client:** connect should return the client ([1e1846f](https://github.com/seamonkeysocial/twitarr-client-api/commit/1e1846f))
* **http:** use `window.cordova` rather than `cordova` ([bc724c9](https://github.com/seamonkeysocial/twitarr-client-api/commit/bc724c9))
* **rest:** minor changes to CordovaHTTP ([cab286e](https://github.com/seamonkeysocial/twitarr-client-api/commit/cab286e))
* make sure everything is exported ([9de2cbf](https://github.com/seamonkeysocial/twitarr-client-api/commit/9de2cbf))
* proper import for urijs ([4e7751b](https://github.com/seamonkeysocial/twitarr-client-api/commit/4e7751b))
* use fetch-ponyfill to make fetch happy ([be091bc](https://github.com/seamonkeysocial/twitarr-client-api/commit/be091bc))


### Features

* **build:** run pure-lockfile install in release build ([435f906](https://github.com/seamonkeysocial/twitarr-client-api/commit/435f906))
* **client:** skip login if username was not passed ([cb944c8](https://github.com/seamonkeysocial/twitarr-client-api/commit/cb944c8))
* **rest:** cordova.plugin.http impl ([f8e2e2b](https://github.com/seamonkeysocial/twitarr-client-api/commit/f8e2e2b))
* export type declarations ([fe96e10](https://github.com/seamonkeysocial/twitarr-client-api/commit/fe96e10))
* integration work for CruiseMonkey ([ce1964d](https://github.com/seamonkeysocial/twitarr-client-api/commit/ce1964d))
* only warn once about timeouts with fetch ([fc3085b](https://github.com/seamonkeysocial/twitarr-client-api/commit/fc3085b))
* switch to moment and fetch rather than luxon and axios ([4a6b094](https://github.com/seamonkeysocial/twitarr-client-api/commit/4a6b094))



<a name="0.1.1"></a>
## [0.1.1](https://github.com/seamonkeysocial/twitarr-client-api/compare/v0.1.0...v0.1.1) (2019-02-22)


### Bug Fixes

* **publish:** bump version and clear .cache-loader dir ([396e5af](https://github.com/seamonkeysocial/twitarr-client-api/commit/396e5af))



<a name="0.1.0"></a>
# [0.1.0](https://github.com/seamonkeysocial/twitarr-client-api/compare/7bad7c5...v0.1.0) (2019-02-22)


### Bug Fixes

* **cli:** do not store user/pass in config ([4177c48](https://github.com/seamonkeysocial/twitarr-client-api/commit/4177c48))
* **dao:** make sure DAOs use app=plain for unparsed messages ([56006f4](https://github.com/seamonkeysocial/twitarr-client-api/commit/56006f4))
* **model:** add toJSON to model objects ([746f9b0](https://github.com/seamonkeysocial/twitarr-client-api/commit/746f9b0))


### Features

* **test:** improve error reporting in MockHTTP ([3027d8d](https://github.com/seamonkeysocial/twitarr-client-api/commit/3027d8d))
* implement connection, login, and user profiles ([7bad7c5](https://github.com/seamonkeysocial/twitarr-client-api/commit/7bad7c5))
* **api:** add .withData() convenience method to TwitarrHTTPOptions ([49eecaa](https://github.com/seamonkeysocial/twitarr-client-api/commit/49eecaa))
* **api:** add all existing files to the API bundle ([d90e103](https://github.com/seamonkeysocial/twitarr-client-api/commit/d90e103))
* **cli:** add thread ID ([a6f8d72](https://github.com/seamonkeysocial/twitarr-client-api/commit/a6f8d72))
* **cli:** refactor to use yargs, implement seamail read ([f2c837a](https://github.com/seamonkeysocial/twitarr-client-api/commit/f2c837a))
* **dao:** add alerts ([48e7d48](https://github.com/seamonkeysocial/twitarr-client-api/commit/48e7d48))
* **dao:** add arbitrary profile retrieval ([c5e8d1f](https://github.com/seamonkeysocial/twitarr-client-api/commit/c5e8d1f))
* **dao:** add event rest endpoints ([b295dc7](https://github.com/seamonkeysocial/twitarr-client-api/commit/b295dc7))
* **dao:** add forum support ([2866b99](https://github.com/seamonkeysocial/twitarr-client-api/commit/2866b99))
* **dao:** add misc/text ([f65ec98](https://github.com/seamonkeysocial/twitarr-client-api/commit/f65ec98))
* **dao:** add other photo methods (delete, get, etc.) ([c67b0ec](https://github.com/seamonkeysocial/twitarr-client-api/commit/c67b0ec))
* **dao:** add searching ([487c6ce](https://github.com/seamonkeysocial/twitarr-client-api/commit/487c6ce))
* **dao:** add star/un-star, also refactor CLI profile args ([2564f06](https://github.com/seamonkeysocial/twitarr-client-api/commit/2564f06))
* **dao:** add support for fetching a seamail thread ([ca13722](https://github.com/seamonkeysocial/twitarr-client-api/commit/ca13722))
* **dao:** add tweet delete ([8ac92e3](https://github.com/seamonkeysocial/twitarr-client-api/commit/8ac92e3))
* **dao:** add tweet lock/unlock ([3781122](https://github.com/seamonkeysocial/twitarr-client-api/commit/3781122))
* **dao:** add tweet update/edit ([0325e42](https://github.com/seamonkeysocial/twitarr-client-api/commit/0325e42))
* **dao:** add UserDAO.changePassword and .resetPassword ([5d6b021](https://github.com/seamonkeysocial/twitarr-client-api/commit/5d6b021))
* **dao:** create a seamail thread ([924e802](https://github.com/seamonkeysocial/twitarr-client-api/commit/924e802))
* **dao:** get seamail threads ([5b7d5eb](https://github.com/seamonkeysocial/twitarr-client-api/commit/5b7d5eb))
* **dao:** get tweet streams ([52018db](https://github.com/seamonkeysocial/twitarr-client-api/commit/52018db))
* **dao:** implement photo upload ([f2a341e](https://github.com/seamonkeysocial/twitarr-client-api/commit/f2a341e))
* **dao:** implement retrieving starred users ([0a3c99e](https://github.com/seamonkeysocial/twitarr-client-api/commit/0a3c99e))
* **dao:** post seamail to thread and unread count ([71f65e7](https://github.com/seamonkeysocial/twitarr-client-api/commit/71f65e7))
* **dao:** profile photo post + delete ([fa55e7b](https://github.com/seamonkeysocial/twitarr-client-api/commit/fa55e7b))
* **dao:** retrieve twarrt reactions ([17c27ec](https://github.com/seamonkeysocial/twitarr-client-api/commit/17c27ec))
* **dao:** stream hashtag, mentions, and posting added ([01b8865](https://github.com/seamonkeysocial/twitarr-client-api/commit/01b8865))
* **dao:** tweet reaction support ([2c5b70f](https://github.com/seamonkeysocial/twitarr-client-api/commit/2c5b70f))
* **dao:** user autocomplete ([aa227d8](https://github.com/seamonkeysocial/twitarr-client-api/commit/aa227d8))
* **dao:** user get and reset mentions ([6f82305](https://github.com/seamonkeysocial/twitarr-client-api/commit/6f82305))
* **internal:** add support for multiple arguments to Util.isEmpty ([bf56cd7](https://github.com/seamonkeysocial/twitarr-client-api/commit/bf56cd7))
* **internal:** add utility for checking an empty value ([0a7f7b8](https://github.com/seamonkeysocial/twitarr-client-api/commit/0a7f7b8))
* **internal:** add utility function to check for minimum properties ([fd8d101](https://github.com/seamonkeysocial/twitarr-client-api/commit/fd8d101))
* **internal:** add utility functions to copy and transform properties ([cc48d86](https://github.com/seamonkeysocial/twitarr-client-api/commit/cc48d86))
* **model:** add a User class ([54d4e2c](https://github.com/seamonkeysocial/twitarr-client-api/commit/54d4e2c))
* **model:** add Seamail model objects ([edc1b73](https://github.com/seamonkeysocial/twitarr-client-api/commit/edc1b73))
* **model:** add some useful display methods to User ([9c824da](https://github.com/seamonkeysocial/twitarr-client-api/commit/9c824da))
* **model:** fix toString() on User ([9ad9a47](https://github.com/seamonkeysocial/twitarr-client-api/commit/9ad9a47))
* **rest:** add unread=true and after=epoch to seamail ([566de10](https://github.com/seamonkeysocial/twitarr-client-api/commit/566de10))
* **seamail:** add seamail list support ([b93f155](https://github.com/seamonkeysocial/twitarr-client-api/commit/b93f155))



