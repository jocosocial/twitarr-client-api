import { API, Rest, Client } from './API';
import { Util } from './internal/Util';
import { TwitarrError } from './api/TwitarrError';
import { User } from './model/User';

const fakeRequire = require('./__fake_require'); // tslint:disable-line

/** @hidden */
const CLI = () => {
  const version = global.TWITARR_JS_VERSION || require('../package.json').version || 'unknown';

  const Table = fakeRequire('cli-table2'); // tslint:disable-line variable-name
  const colors = fakeRequire('colors');
  const fs = fakeRequire('fs');
  const path = fakeRequire('path');
  const yargs = fakeRequire('yargs');

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

  const argv = yargs.usage('$0 <cmd> [args]')
    .version(version)
    .alias('c', 'config')
    .describe('c', 'specify a configuration file (default: ~/.twitarr-config.json)')
    .string('c')
    .describe('debug', 'enable debug output')
    .count('debug')
    .command('connect <url> <user> <pass>', 'connect to a Twit-arr server')
    .command('profile', 'read or edit your profile', (sub) => {
      return sub
        .alias('d', 'display-name')
        .describe('d', 'set your display name')
        .string('d')
        .alias('h', 'home-location')
        .describe('h', 'set your home location')
        .string('h')
        .alias('r', 'real-name')
        .describe('r', 'set your real name')
        .string('r')
        .alias('p', 'pronouns')
        .describe('p', 'set your preferred pronouns')
        .string('p')
        .alias('n', 'room-number')
        .describe('r', 'set your room number')
        .string('r');
    })
    .command('seamail', 'list, read, or create seamail threads', (sub) => {
      return sub
        .command('list', 'list seamail threads', (y) => {
          return y
            .alias('n', 'new')
            .describe('n', 'list new threads and threads with new messages');
        })
        .command('read <id>', 'read a seamail thread')
        .command('create <subject> <message> <users...>', 'create a new seamail thread')
        .command('post <id> <message>', 'post a message to a thread');
    })
    .argv;

  const readConfig = () => {
    const configfile = argv.config || defaultConfigFile;
    let config;
    if (fs.existsSync(configfile)) {
      config = JSON.parse(fs.readFileSync(configfile));
    } else {
      config = {
        key: undefined,
        url: undefined,
      };
    }
    return config;
  };

  const getClient = () => {
    const config = readConfig();
    const auth = new API.TwitarrAuthConfig(undefined, undefined, config.key);
    const server = new API.TwitarrServer('Twitarr', config.url, auth);
    const http = new Rest.AxiosHTTP(server);
    return new Client(http);
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
    if (argv.debug > 0) {
      console.error(realError.message, realError);
    } else {
      console.error(realError.message);
    }
    return realError;
  };

  /* tslint:disable:no-console */

  if (argv.debug === 0) {
    console.debug = () => { }; // tslint:disable-line no-empty
  }

  const doConnect = async (url, username, password) => {
    console.log(colors.red('WARNING: This command saves your login'
    + ' information to ~/.twitarr.config.json in clear text.'));
    const config = readConfig();
    if (url) {
      // the user is passing a URL, reset the config
      config.url = url;
      config.key = undefined;
    }
    if (Util.isEmpty(username) || Util.isEmpty(password)) {
      throw new TwitarrError('A username and password are required!');
    }

    const auth = new API.TwitarrAuthConfig(username, password);
    const server = new API.TwitarrServer('Twitarr', config.url, auth);
    const http = new Rest.AxiosHTTP(server);

    await Client.checkServer(server, http);
    console.log(colors.green('* Server is valid.'));

    const client = new Client(http);
    const key = await client.connect('Twitarr', config.url, username, password);
    console.log(colors.green('* Connected to ' + server.name + '.'));

    console.warn('Saving configuration to ' + defaultConfigFile);
    config.key = key;
    fs.writeFileSync(defaultConfigFile, JSON.stringify(config, undefined, 2), { mode: 0o600 });

    return config;
  };

  // tslint:disable-next-line max-line-length
  const doProfile = async (displayName?: string, homeLocation?: string, realName?: string, pronouns?: string, roomNumber?: string) => {
    const client = getClient();
    if (Util.isEmpty(displayName, homeLocation, realName, pronouns, roomNumber)) {
      const profile = await client.user().getProfile();
      const t = new Table(tableFormat);
      for (const key of Object.keys(profile)) {
        const name = key? key.replace(/_/g, ' ') : key;
        t.push([name + ':', profile[key]]);
      }
      console.log(t.toString());
      console.log('');
  } else {
      throw new TwitarrError('Not yet implemented!');
    }
  };

  const doSeamailList = async (n = false) => {
    const client = getClient();
    const seamail = await client.seamail().getMetadata(n);

    const format = Object.assign({ }, tableFormat);
    format.head = [ 'ID', 'Subject', 'Last Updated'];
    if (!n) {
      format.head.unshift('New');
    }
    const t = new Table(format);

    for (const thread of seamail.threads) {
      const row = [thread.id, thread.subject, thread.timestamp.fromNow()];
      if (!n) {
        row.unshift(thread.is_unread? '*' : '');
      }
      t.push(row);
    }

    console.log(t.toString());
    console.log('');
  };

  const getUserString = (user: User) => {
    return Util.isEmpty(user.display_name)? '@' + user.username : user.display_name + ' (@' + user.username + ')';
  };

  const doSeamailRead = async (id: string) => {
    const client = getClient();
    const seamail = await client.seamail().get(id);
    const format = Object.assign({ }, tableFormat);

    let t = new Table(tableFormat);

    const thread = seamail.threads[0];
    t.push(['Subject:', thread.subject]);
    t.push(['Last Updated:', thread.timestamp.fromNow()]);
    t.push(['Participants:', thread.users.map((user) => user.toString()).join('\n')]);
    console.log(t.toString());
    console.log('');
    t = new Table(tableFormat);
    thread.messages.reverse().forEach((message) => {
      t.push([message.author.getDisplayName(), message.text, message.timestamp.fromNow()]);
    });
    console.log(t.toString());
    console.log('');
  };

  const doSeamailCreate = async (subject: string, message: string, users: string[]) => {
    const client = getClient();
    const seamail = await client.seamail().create(subject, message, ...users);
    console.log(colors.green('Created thread ' + seamail.threads[0].id));
    console.log('');
  };

  const doSeamailPost = async (id: string, message: string) => {
    const client = getClient();
    const response = await client.seamail().post(id, message);
    console.log(colors.green('Posted message ' + response.id));
    console.log('');
  };

  const processArgs = async (args) => {
    try {
      switch (args._[0]) {
        case 'connect': {
          await doConnect(args.url, args.user, args.pass);
          break;
        }
        case 'profile': {
          await doProfile(args.displayName, args.homeLocation, args.realName, args.pronouns, args.roomNumber);
          break;
        }
        case 'seamail': {
          const command = args._[1];
          switch (command) {
            case 'list': {
              await doSeamailList(args.new);
              break;
            }
            case 'read': {
              await doSeamailRead(args.id);
              break;
            }
            case 'create': {
              await doSeamailCreate(args.subject, args.message, args.users);
              break;
            }
            case 'post': {
              await doSeamailPost(args.id, args.message);
              break;
            }
            default: throw new TwitarrError('Unhandled seamail command: ' + command);
          }
          break;
        }
        default: {
          console.error('Unhandled argument:', args);
          throw new TwitarrError('Unhandled argument: ' + args._[0]);
        }
      }
      process.exit(0);
    } catch (err) {
      console.log(colors.red('Failed: ' + err.message));
      process.exit(1);
    }
  };

  processArgs(argv);
};

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

CLI();
