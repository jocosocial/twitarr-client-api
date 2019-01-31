import * as startCase from 'lodash.startcase';

import {API, Model, Rest, DAO, Client} from './API';

/** @hidden */
const CLI = () => {
  const version = global.TWITARR_JS_VERSION || require('../package.json').version || 'unknown';

  // tslint:disable
  const Table = require('cli-table2');
  const colors = require('colors');
  const fs = require('fs');
  const path = require('path');
  const program = require('commander');
  // tslint:enable

  const homedir = process.env[(process.platform === 'win32') ? 'USERPROFILE' : 'HOME'];
  const defaultConfigFile = path.join(homedir, '.twitarr.config.json');

  const tableFormat = {
    /* tslint:disable:object-literal-sort-keys */
    head: [],
    colWidths: [],
    chars: {
      'middle': '  ',
      'top': '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      'left': '',
      'left-mid': '',
      'mid': '',
      'mid-mid': '',
      'right': '',
      'right-mid': '',
      'bottom': '',
      'bottom-mid': '',
      'bottom-left': '',
      'bottom-right': '',
    },
    style: {
      'padding-left': 0,
      'padding-right': 0,
    },
    wordWrap: true,
  };

  const readConfig = () => {
    const configfile = program.config || defaultConfigFile;
    let config;
    if (fs.existsSync(configfile)) {
      config = JSON.parse(fs.readFileSync(configfile));
    } else {
      config = {
        password: 'admin',
        url: undefined,
        username: 'admin',
      };
    }
    return config;
  };

  const handleError = (message, err) => {
    let realError: any = new Error(message);
    if (err instanceof API.TwitarrResult) {
      realError = new API.TwitarrError(message + ': ' + err.message, err.code);
    } else if (err.message) {
      realError = new API.TwitarrError(message + ': ' + err.message);
    } else if (Object.prototype.toString.call(err) === '[object String]') {
      realError = new API.TwitarrError(message + ': ' + err);
    }
    if (program.debug) {
      console.error(realError.message, realError);
    } else {
      console.error(realError.message);
    }
    return realError;
  };

  /* tslint:disable:no-console */

  // global options
  program
    .option('-d, --debug', 'Enable debug output')
    .option('-c, --config <file>', 'Specify a configuration file (default: ~/.twitarr.config.json)')
    .option('-v, --version', 'Print the twitarr.js version and exit', () => {
      console.log(version);
      process.exit(0);
    });

  // connect (validate server and save config)
  program
    .command('connect [url]')
    .description('Connect to a Twitarr server')
    .option('-u, --username <username>', 'The username to authenticate as')
    .option('-p, --password <password>', 'The password to authenticate with')
    .action((url, options) => {
      console.log(colors.red('WARNING: This command saves your login'
        + ' information to ~/.twitarr.config.json in clear text.'));
      const config = readConfig();
      if (url) {
        // the user is passing a URL, reset the config
        config.url = url;
        config.username = undefined;
        config.password = undefined;
      }

      if (options.username) {
        config.username = options.username;
      }
      if (options.password) {
        config.password = options.password;
      }
      const auth = new API.TwitarrAuthConfig(config.username, config.password);
      const server = new API.TwitarrServer('Twitarr', config.url, auth);
      const http = new Rest.AxiosHTTP(server);
      return Client.checkServer(server, http).then(() => {
        console.log(colors.green('Connection succeeded.'));
        if (!program.config) { // don't write the config if a config was passed in
          console.warn('Saving configuration to ' + defaultConfigFile);
          fs.writeFileSync(defaultConfigFile, JSON.stringify(config, undefined, 2), { mode: 0o600 });
        }
        return true;
      }).catch((err) => {
        return handleError('Server check failed', err);
      });
    });

  program.parse(process.argv);

  if (!process.argv.slice(2).length) {
    program.outputHelp();
    process.exit(0);
  }
};

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

CLI();
