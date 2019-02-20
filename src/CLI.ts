import { API, Rest, Client } from './API';
import { Util } from './internal/Util';
import { TwitarrError } from './api/TwitarrError';
import { IStreamOptions } from './dao/StreamDAO';

const fakeRequire = require('./__fake_require'); // eslint-disable-line @typescript-eslint/no-var-requires

/** @hidden */
const CLI = () => {
  const version = global.TWITARR_JS_VERSION || require('../package.json').version || 'unknown';

  const Table = fakeRequire('cli-table2');
  const colors = fakeRequire('colors');
  const fs = fakeRequire('fs');
  const path = fakeRequire('path');
  const wrap = fakeRequire('word-wrap');
  const yargs = fakeRequire('yargs');

  const homedir = process.env[process.platform === 'win32' ? 'USERPROFILE' : 'HOME'];
  const defaultConfigFile = path.join(homedir, '.twitarr.config.json');

  const tableFormat = {
    head: [],
    colWidths: [],
    chars: {
      middle: '  ',
      top: '',
      'top-mid': '',
      'top-left': '',
      'top-right': '',
      left: '',
      'left-mid': '',
      mid: '',
      'mid-mid': '',
      right: '',
      'right-mid': '',
      bottom: '',
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

  const argv = yargs
    .usage('$0 <cmd> [args]')
    .version(version)
    .alias('c', 'config')
    .describe('c', 'specify a configuration file (default: ~/.twitarr-config.json)')
    .string('c')
    .describe('debug', 'enable debug output')
    .count('debug')
    .command('connect <url> <user> <pass>', 'connect to a Twit-arr server')
    .command('profile', 'read or edit your profile', sub => {
      return sub
        .alias('d', 'display-name')
        .describe('d', 'set your display name')
        .string('d')
        .alias('e', 'email')
        .describe('e', 'set your email address')
        .string('e')
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
    .command('seamail', 'list, read, or create seamail threads', sub => {
      return sub
        .command('list', 'list seamail threads', y => {
          return y.alias('n', 'new').describe('n', 'list new threads and threads with new messages');
        })
        .command('read <id>', 'read a seamail thread')
        .command('create <subject> <message> <users...>', 'create a new seamail thread')
        .command('post <id> <message>', 'post a message to a thread');
    })
    .command('stream', 'read or post to the twarrt stream', sub => {
      return sub
        .command('read', 'read the twarrt stream', y => {
          return y
            .alias('a', 'author')
            .describe('a', 'filter twarrts to those posted by the specified author')
            .string('a')
            .alias('h', 'hashtag')
            .describe('h', 'filter twarrts to those containing the specified hashtag')
            .string('h')
            .alias('l', 'limit')
            .describe('l', 'limit the number of twarrts returned')
            .number('l')
            .alias('m', 'mentions')
            .describe('m', 'filter twarrts to those mentioning the specified user')
            .string('m')
            .alias('i', 'include-author')
            .describe('i', 'when filtering by mentions, include twarrts mentioning *or* written by the specified user')
            .boolean('i')
            .alias('n', 'newer-than')
            .describe('n', 'return up to <limit> twarrts since the specified date')
            .string('n')
            .alias('o', 'older-than')
            .describe('o', 'return up to <limit> twarrts up to the specified date')
            .string('o')
            .alias('s', 'starred')
            .describe('s', 'filter twarrts to those posted by users you have starred');
        })
        .command('post <message>', 'post a twarrt', y => {
          return y
            .alias('r', 'reply-to')
            .describe('r', 'the id of the twarrt you are replying to')
            .string('r')
            .alias('p', 'photo')
            .describe('p', 'the path to a photo to upload along with the twarrt')
            .string('p');
        })
        .command('update <id> <message>', 'edit/update an existing twarrt', y => {
          return y
            .alias('p', 'photo')
            .describe('p', 'the path to a photo to add/replace in the twarrt')
            .string('p');
        })
        .command('delete <id>', 'delete an existing twarrt')
        .command('lock <id>', 'lock a twarrt and its children (requires moderator privileges)')
        .command('unlock <id>', 'unlock a twarrt and its children (requires moderator privileges)')
        .command('react <id> <reaction>', 'react to a twarrt', y => {
          return y
            .alias('r', 'remove')
            .describe('r', 'remove the reaction, rather than adding it')
            .boolean('r');
        });
    }).argv;

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
    const http = new Rest.NodeHTTP(server);
    return new Client(http);
  };

  if (argv.debug === 0) {
    console.debug = () => {};
  }

  const doConnect = async (url, username, password) => {
    console.log(colors.red('WARNING: This command saves your login' + ' information to ~/.twitarr.config.json in clear text.'));
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
    const http = new Rest.NodeHTTP(server);

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

  const doProfile = async (displayName?: string, email?: string, homeLocation?: string, realName?: string, pronouns?: string, roomNumber?: number) => {
    const client = getClient();
    let profile;
    if (Util.isEmpty(displayName, email, homeLocation, realName, pronouns, roomNumber)) {
      profile = await client.user().profile();
    } else {
      profile = await client.user().update(displayName, email, homeLocation, realName, pronouns, roomNumber);
    }
    const t = new Table(tableFormat);
    for (const key of Object.keys(profile.user)) {
      const name = key ? key.replace(/_/g, ' ') : key;
      t.push([name + ':', profile.user[key]]);
    }
    console.log(t.toString());
    console.log('');
  };

  const doSeamailList = async (n = false) => {
    const client = getClient();
    const seamail = await client.seamail().getMetadata(n);

    const format = Object.assign({}, tableFormat);
    format.head = ['ID', 'Subject', 'Last Updated'];
    if (!n) {
      format.head.unshift('New');
    }
    const t = new Table(format);

    for (const thread of seamail.threads) {
      const row = [thread.id, thread.subject, thread.timestamp.fromNow()];
      if (!n) {
        row.unshift(thread.is_unread ? '*' : '');
      }
      t.push(row);
    }

    console.log(t.toString());
    console.log('');
  };

  const doSeamailRead = async (id: string) => {
    const client = getClient();
    const seamail = await client.seamail().get(id);

    let t = new Table(tableFormat);

    const thread = seamail.threads[0];
    t.push(['Subject:', thread.subject]);
    t.push(['Last Updated:', thread.timestamp.fromNow()]);
    t.push(['Participants:', thread.users.map(user => user.toString()).join('\n')]);
    console.log(t.toString());
    console.log('');
    t = new Table(tableFormat);
    thread.messages.reverse().forEach(message => {
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

  const doStreamRead = async (options: IStreamOptions) => {
    const client = getClient();
    const response = await client.stream().posts(options);
    for (const post of response.posts.reverse()) {
      console.log(post.author.toString());
      console.log(wrap(post.text.trim(), { indent: '  ', width: 60 }));
      console.log('  - ' + post.timestamp.fromNow() + ' (id: ' + post.id + ')');
      console.log('');
    }
  };

  const postPhotoIfNecessary = async (photo?: string) => {
    if (photo && fs.existsSync(photo)) {
      const filename = path.basename(photo);
      console.log('* uploading ' + filename);

      const buf = fs.readFileSync(photo);
      const client = getClient();
      const photoMeta = await client.photo().post(filename, buf);
      if (photoMeta && photoMeta.id) {
        console.log('* ' + filename + ' has photo ID ' + photoMeta.id);
        return photoMeta.id;
      }
      throw new TwitarrError('Photo posted, but no metadata was found!');
    }
    return photo;
  };

  const doStreamPost = async (message: string, parent?: string, photo?: string) => {
    const client = getClient();
    const photoArg = await postPhotoIfNecessary(photo);
    const response = await client.stream().send(message, parent, photoArg);
    console.log(colors.green('Posted twarrt ' + response.post.id));
    console.log('');
  };

  const doUpdateStreamPost = async (id: string, message: string, photo?: string) => {
    const client = getClient();
    const photoArg = await postPhotoIfNecessary(photo);
    const response = await client.stream().updatePost(id, message, photoArg);
    console.log(colors.green('Updated twarrt ' + response.post.id));
    console.log('');
  };

  const doDeleteStreamPost = async (id: string) => {
    const client = getClient();
    await client.stream().deletePost(id);
    console.log(colors.green('Deleted twarrt ' + id));
    console.log('');
  };

  const doLockStreamPost = async (id: string) => {
    const client = getClient();
    await client.stream().lockPost(id);
    console.log(colors.green('Locked twarrt ' + id));
    console.log('');
  };

  const doUnlockStreamPost = async (id: string) => {
    const client = getClient();
    await client.stream().unlockPost(id);
    console.log(colors.green('Unlocked twarrt ' + id));
    console.log('');
  };

  const doReact = async (id: string, reaction: string, del: boolean = false) => {
    const client = getClient();
    if (del) {
      await client.stream().deleteReact(id, reaction);
      console.log(colors.green('Removed ' + reaction + ' reaction from twarrt ' + id));
    } else {
      await client.stream().react(id, reaction);
      console.log(colors.green('Added ' + reaction + ' reaction to twarrt ' + id));
    }
    console.log('');
  };

  const processArgs = async args => {
    try {
      switch (args._[0]) {
        case 'connect': {
          await doConnect(args.url, args.user, args.pass);
          break;
        }
        case 'profile': {
          await doProfile(args.displayName, args.email, args.homeLocation, args.realName, args.pronouns, args.roomNumber);
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
            default:
              throw new TwitarrError('Unhandled seamail command: ' + command);
          }
          break;
        }
        case 'stream': {
          const command = args._[1];
          switch (command) {
            case 'read': {
              const options: IStreamOptions = {
                author: args.author,
                hashtag: args.hashtag,
                limit: args.limit,
                mentions: args.mentions,
                include_author: args.includeAuthor,
                starred: args.starred,
              };
              if (args.newerThan) {
                options.newer_posts = true;
                options.start = Util.toMoment(args.newerThan);
              }
              if (args.olderThan) {
                options.newer_posts = false;
                options.start = Util.toMoment(args.olderThan);
              }
              await doStreamRead(options);
              break;
            }
            case 'post': {
              await doStreamPost(args.message, args.replyTo, args.photo);
              break;
            }
            case 'update': {
              await doUpdateStreamPost(args.id, args.message, args.photo);
              break;
            }
            case 'delete': {
              await doDeleteStreamPost(args.id);
              break;
            }
            case 'lock': {
              await doLockStreamPost(args.id);
              break;
            }
            case 'unlock': {
              await doUnlockStreamPost(args.id);
              break;
            }
            case 'react': {
              await doReact(args.id, args.reaction, args.remove);
              break;
            }
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
      console.log(colors.red('Failed: ' + (err.toString ? err.toString() : err.message)));
      process.exit(1);
    }
  };

  processArgs(argv);
  return true;
};

process.on('unhandledRejection', (reason, p) => {
  console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
});

CLI();
