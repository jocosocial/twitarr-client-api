# Twit-arr Client API

A client API for interacting with the Twit-arr social networking platform.

# Using the Twitarr.js APIs In Your Code

(Coming soon.)

<!--
# Using the Twitarr.js Command Line

1. install [Node.js](https://nodejs.org/en/download/)
2. run `sudo npm install -g twitarr`
3. run `twitarr --help` for a list of possible commands
-->

# API Coverage

Twitarr.js currently supports a subset of the Twit-arr ReST API:

* retrieve profile information
* list, read, and post seamail messages
* read and post tweets

The intention is to implement 100% of the features specified in [the Twit-arr ReST documentation](https://github.com/seamonkeysocial/twitarr/blob/master/rest_documentation.md).

# Changes

The CHANGELOG will be updated as releases occur, and should always be accessible [here](https://github.com/RangerRick/twitarr-client-api/blob/master/CHANGELOG.md).

# Development

To build this project, run `npm install` to install all dependencies.

Then you can run npm to build or test the project:

* `npm run dist` - run tests and lint, and build the complete tree in `dist/`
* `npm run dev` - build a development version of the API in `dist/twitarr.js` and `dist/twitarr.node.js`
* `npm run build` - build the development and production versions of the API in `dist/`
* `npm run docs` - build the docs in `dist/docs/`
* `npm run watch` - continuously build the development version in `dist/twitarr.js`
* `npm run test` - run the tests
* `npm run watch-test` - continuously run the tests
* `npm run cli -- <arguments>` - run the CLI test tool (try `--help` for options)
* `npm run release` - do a release build, regenerating `dist/`, and updating the changelog.

# Reporting Bugs or Feature Requests

Twitarr.js issues are tracked in the Twit-arr issue tracker: https://github.com/RangerRick/twitarr-client-api/issues

