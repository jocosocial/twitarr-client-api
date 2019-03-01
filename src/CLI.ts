import { API, Rest, Client } from './API';
import { Util } from './internal/Util';
import { TwitarrError } from './api/TwitarrError';
import { IStreamOptions } from './dao/StreamDAO';

/** @hidden */
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
    .command('profile', 'read, edit, or react to profile', sub => {
      return sub
        .command('show [username]', 'view a profile')
        .command('update', 'update your profile', y => {
          return y
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
        .command('comment <username> <comment>', 'add a comment to a user profile')
        .command('star <username>', "toggle a user's starred status");
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
    })
    .command('events', 'read or update events', sub => {
      return sub
        .command('list', 'list events', y => {
          return y
            .alias('m', 'mine')
            .describe('m', 'list only favorited events (implies --today)')
            .boolean('m')
            .alias('t', 'today')
            .describe('t', "limit to today's events")
            .boolean('t');
        })
        .command('delete <id>', 'delete an event (admin only)')
        .command('update <id>', 'update an event (admin only)', y => {
          return y
            .alias('t', 'title')
            .describe('t', 'the event title')
            .string('t')
            .alias('d', 'description')
            .describe('d', 'the event description')
            .string('d')
            .alias('l', 'location')
            .describe('l', 'the event location')
            .string('l')
            .alias('s', 'start-time')
            .describe('s', 'the event starting time')
            .string('s')
            .alias('e', 'end-time')
            .describe('e', 'the event ending time')
            .string('e');
        })
        .command('favorite <id>', 'favorite an event')
        .command('unfavorite <id>', 'un-favorite an event');
    })
    .command('misc', 'retrieve various miscellaneous data from the server', sub => {
      return sub
        .command('text <document>', 'print a document from the server')
        .command('time', 'print the current server time')
        .command('reactions', 'get the list of valid reactions')
        .command('announcements', 'print all active announcements');
    })
    .command('forums', 'list, read, and post to forum threads', sub => {
      return sub
        .command('list', 'list forum threads', y => {
          return y
            .alias('p', 'page')
            .describe('p', 'the page of threads to read')
            .number('p')
            .alias('l', 'limit')
            .describe('l', 'limit results to <num> results (default: 20)')
            .number('l');
        })
        .command('read <thread-id> [post-id]', 'read the given forum thread or post', y => {
          return y
            .alias('p', 'page')
            .describe('p', 'the forum page to read')
            .number('p')
            .alias('l', 'limit')
            .describe('l', 'limit results to <num> results per page (default: 20)')
            .number('l');
        })
        .command('create <subject> <text> [photos...]', 'create a new thread with the given subject + first post text and photos')
        .command('post <thread-id> <text> [photos...]', 'post a new response to the given forum thread')
        .command('sticky <thread-id>', 'mark the given forum thread sticky')
        .command('unsticky <thread-id>', 'mark the given forum thread un-sticky')
        .command('lock <thread-id>', 'mark the given forum thread locked')
        .command('unlock <thread-id>', 'mark the given forum thread unlocked')
        .command('update-post <thread-id> <post-id> <text> [photos...]', 'update the contents of the given thread post')
        .command('delete-post <thread-id> <post-id>', 'delete the given thread post')
        .command('react <thread-id> <post-id> <reaction>', 'react to the given thread post')
        .command('delete-react <thread-id> <post-id> <reaction>', 'delete a reaction to the given thread post');
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

  const printUserProfile = profileInfo => {
    const t = new Table(tableFormat);
    for (const key of Object.keys(profileInfo.user)) {
      if (key === 'starred' || key === 'comment') {
        continue;
      }
      const name = key ? key.replace(/_/g, ' ') : key;
      let value = profileInfo.user[key];
      if (Util.isEmpty(value)) {
        continue;
      }
      if (Util.isDateObject(value)) {
        value = Util.toDateTime(value).toRelative();
      }
      t.push([name + ':', value]);
    }
    if (profileInfo.starred !== undefined) {
      t.push(['starred:', profileInfo.starred]);
    }
    if (profileInfo.comment !== undefined) {
      t.push(['comment:', profileInfo.comment]);
    }
    console.log(t.toString());
    console.log('');
  };

  const doGetProfile = async (username?: string) => {
    const profileInfo = await getClient()
      .user()
      .profile(username);
    printUserProfile(profileInfo);
  };

  const doUpdateProfile = async (displayName?: string, email?: string, homeLocation?: string, realName?: string, pronouns?: string, roomNumber?: number) => {
    const profileInfo = await getClient()
      .user()
      .update(displayName, email, homeLocation, realName, pronouns, roomNumber);
    printUserProfile(profileInfo);
  };

  const doComment = async (username: string, comment: string) => {
    if (Util.isEmpty(username, comment)) {
      throw new TwitarrError('You must specify a username and a comment!');
    }
    const profileInfo = await getClient()
      .user()
      .comment(username, comment);
    printUserProfile(profileInfo);
  };

  const doStar = async (username: string) => {
    const starred = await getClient()
      .user()
      .toggleStarred(username);
    if (starred) {
      console.log(colors.green(username + ' is now starred.'));
    } else {
      console.log(colors.red(username + ' is now un-starred.'));
    }
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
      const row = [thread.id, thread.subject, thread.timestamp.toRelative()];
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
    t.push(['Last Updated:', thread.timestamp.toRelative()]);
    t.push(['Participants:', thread.users.map(user => user.toString()).join('\n')]);
    console.log(t.toString());
    console.log('');
    t = new Table(tableFormat);
    thread.messages.reverse().forEach(message => {
      t.push([message.author.getDisplayName(), message.text, message.timestamp.toRelative()]);
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
      console.log('  - ' + post.timestamp.toRelative() + ' (id: ' + post.id + ')');
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

  const printEvent = (event: any) => {
    const prefix = '           ';
    const startTime = event.start_time.toFormat('hh:mm a');
    console.log(startTime + ' ' + (event.following ? '* ' : '  ') + event.title + (event.official ? '' : ' (shadow)'));
    if (event.location) console.log(prefix + event.location);
    if (event.end_time) console.log(prefix + 'ends: ' + event.end_time.toFormat('hh:mm a'));
    if (event.description) console.log(wrap(event.description.trim(), { indent: prefix, width: 50 }));
    console.log(prefix + 'id: ' + event.id);
    console.log('');
  };

  const doListEvents = async (mine?: boolean, today?: boolean) => {
    const client = getClient();
    const now = Util.toDateTime(new Date().getTime());
    let events;
    if (mine || today) {
      events = await client.events().getDay(now, mine);
    } else {
      events = await client.events().all();
    }
    let lastDay;
    for (const event of events) {
      let day = event.start_time.toFormat('ccc, MMM dd');
      if (day !== lastDay) {
        console.log('[ ' + day + ' ]');
        lastDay = day;
      }
      printEvent(event);
    }
  };

  const doDeleteEvent = async (id: string) => {
    await getClient()
      .events()
      .remove(id);
    console.log(colors.red('Removed event ' + id));
    console.log('');
  };

  const doUpdateEvent = async (id: string, title?: string, description?: string, location?: string, startTime?: string, endTime?: string) => {
    const start = startTime ? Util.toDateTime(startTime) : undefined;
    const end = endTime ? Util.toDateTime(endTime) : undefined;
    const event = await getClient()
      .events()
      .update(id, title, description, location, start, end);
    let day = event.start_time.toFormat('ccc, MMM dd');
    console.log('[ ' + day + ' ]');
    printEvent(event);
  };

  const doFavoriteEvent = async (id: string) => {
    await getClient()
      .events()
      .favorite(id);
    console.log(colors.green('Favorited event ' + id));
  };

  const doUnfavoriteEvent = async (id: string) => {
    await getClient()
      .events()
      .unfavorite(id);
    console.log(colors.red('Un-favorited event ' + id));
  };

  const doPrintText = async (filename: string) => {
    const contents = await getClient()
      .text()
      .getFile(filename);
    for (const section of contents.sections) {
      if (section.header) {
        console.log('### ' + section.header + ' ###');
      } else {
        console.log('#####');
      }
      console.log('');
      for (const paragraph of section.paragraphs) {
        console.log(wrap(paragraph.text, { indent: '  ', width: 50 }));
        console.log('');
      }
    }
  };

  const doPrintServerTime = async () => {
    const ret = await getClient()
      .text()
      .serverTime();
    console.log(ret.display);
    console.log('');
  };

  const doPrintReactions = async () => {
    const reactions = await getClient()
      .text()
      .reactions();
    for (const reaction of reactions) {
      console.log('* ' + reaction);
    }
    console.log('');
  };

  const doPrintAnnouncements = async () => {
    const announcements = await getClient()
      .text()
      .announcements();
    for (const announcement of announcements) {
      console.log(announcement.timestamp.toRelative() + ' - ' + announcement.author.toString());
      console.log(wrap(announcement.text, { indent: '  ', size: 50 }));
      console.log('');
    }
  };

  const printForumPost = post => {
    const time = post.timestamp.toRelative();
    console.log('-----');
    console.log(post.author.toString() + ' posted ' + time);
    const statusLine =
      'id: ' +
      post.id +
      (post.photos && post.photos.length ? ' [' + post.photos.length + ' photo(s)]' : '') +
      (post.is_new ? ' [new]' : '') +
      (post.thread_locked ? ' [locked]' : '');
    console.log(statusLine);
    console.log('');
    console.log(wrap(post.text, { indent: '  ', size: 50 }));
    console.log('');
  };

  const printThreadSummary = (thread, page?: number) => {
    const lastTime = thread.timestamp ? thread.timestamp.toFormat('yyyy-MM-dd hh:mm a') : thread.latest_read.toFormat('yyyy-MM-dd hh:mm a');
    console.log('### ' + thread.subject + ' ###');
    console.log(lastTime + (thread.sticky ? ' [sticky]' : '') + (thread.locked ? ' [locked]' : ''));
    const statusLine =
      (thread.last_post_author ? 'Last posted by: ' + thread.last_post_author.toString() : '') + (thread.count ? ' (' + thread.count + ' unread)' : '');
    if (statusLine) {
      console.log(statusLine);
    }
    console.log(
      'id: ' + thread.id + ' ' + (page !== undefined ? 'page: ' + page + (thread.next_page ? ' next page: ' + thread.next_page : ' (end of thread)') : ''),
    );
    console.log('');
    if (thread.posts) {
      for (const post of thread.posts) {
        printForumPost(post);
      }
    }
  };

  const doListForumThreads = async (page?: number, limit?: number) => {
    const response = await getClient()
      .forums()
      .list(page, limit);
    for (const thread of response.threads) {
      printThreadSummary(thread);
    }
  };

  const doReadForumThread = async (id: string, page?: number, limit?: number) => {
    const thread = await getClient()
      .forums()
      .get(id, page, limit);
    printThreadSummary(thread, page || 0);
  };

  const doCreateForumThread = async (subject: string, text: string, photos?: string[]) => {
    let photoIds = [];
    if (photos && photos.length) {
      for (const photo of photos) {
        photoIds.push(await postPhotoIfNecessary(photo));
      }
    }
    console.log('');
    const thread = await getClient()
      .forums()
      .create(subject, text, photoIds);
    printThreadSummary(thread);
  };

  const doPostToForumThread = async (id: string, text: string, photos?: string[]) => {
    let photoIds = [];
    if (photos && photos.length) {
      for (const photo of photos) {
        photoIds.push(await postPhotoIfNecessary(photo));
      }
    }
    console.log('');
    const post = await getClient()
      .forums()
      .post(id, text, photoIds);
    printForumPost(post);
  };

  const doSticky = async (id: string, sticky: boolean) => {
    await getClient()
      .forums()
      .sticky(id, sticky);
    console.log(colors.green('Set thread ' + id + ' to ' + (sticky ? 'sticky' : 'un-sticky') + '.'));
    console.log('');
  };

  const doLocked = async (id: string, locked: boolean) => {
    await getClient()
      .forums()
      .locked(id, locked);
    console.log(colors.green('Set thread ' + id + ' to ' + (locked ? 'locked' : 'unlocked') + '.'));
    console.log('');
  };

  const doReadPost = async (threadId: string, postId: string) => {
    const post = await getClient()
      .forums()
      .getPost(threadId, postId);
    printForumPost(post);
  };

  const doDeletePost = async (threadId: string, postId: string) => {
    const deleted = await getClient()
      .forums()
      .removePost(threadId, postId);
    if (deleted) {
      console.log(colors.red('Post deleted.'));
    } else {
      console.log(colors.red('Post NOT deleted.'));
    }
    console.log('');
  };

  const doUpdatePost = async (threadId: string, postId: string, text: string, photos?: string[]) => {
    let photoIds = [];
    if (photos && photos.length) {
      for (const photo of photos) {
        photoIds.push(await postPhotoIfNecessary(photo));
      }
    }
    console.log('');
    const post = await getClient()
      .forums()
      .updatePost(threadId, postId, text, photoIds);
    printForumPost(post);
  };

  const doReactToPost = async (threadId: string, postId: string, reaction: string) => {
    await getClient()
      .forums()
      .react(threadId, postId, reaction);
    console.log(colors.green('Reacted ' + reaction + ' to post.'));
    console.log('');
  };

  const doDeleteReactToPost = async (threadId: string, postId: string, reaction: string) => {
    await getClient()
      .forums()
      .deleteReact(threadId, postId, reaction);
    console.log(colors.green('Deleted reaction ' + reaction + ' from post.'));
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
          const command = args._[1];
          switch (command) {
            case 'get': {
              await doGetProfile(args.username);
              break;
            }
            case 'update': {
              await doUpdateProfile(args.displayName, args.email, args.homeLocation, args.realName, args.pronouns, args.roomNumber);
              break;
            }
            case 'comment': {
              await doComment(args.username, args.comment);
              break;
            }
            case 'star': {
              await doStar(args.username);
              break;
            }
          }
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
                options.start = Util.toDateTime(args.newerThan);
              }
              if (args.olderThan) {
                options.newer_posts = false;
                options.start = Util.toDateTime(args.olderThan);
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
        case 'events': {
          const command = args._[1];
          switch (command) {
            case 'list': {
              await doListEvents(args.mine, args.today);
              break;
            }
            case 'delete': {
              await doDeleteEvent(args.id);
              break;
            }
            case 'update': {
              await doUpdateEvent(args.id, args.title, args.description, args.location, args.startTime, args.endTime);
              break;
            }
            case 'favorite': {
              await doFavoriteEvent(args.id);
              break;
            }
            case 'unfavorite': {
              await doUnfavoriteEvent(args.id);
              break;
            }
          }
          break;
        }
        case 'misc': {
          const command = args._[1];
          switch (command) {
            case 'text': {
              await doPrintText(args.document);
              break;
            }
            case 'time': {
              await doPrintServerTime();
              break;
            }
            case 'reactions': {
              await doPrintReactions();
              break;
            }
            case 'announcements': {
              await doPrintAnnouncements();
              break;
            }
          }
          break;
        }
        case 'forums': {
          const command = args._[1];
          switch (command) {
            case 'list': {
              await doListForumThreads(args.page, args.limit);
              break;
            }
            case 'read': {
              if (args.postId) {
                await doReadPost(args.threadId, args.postId);
              } else {
                await doReadForumThread(args.threadId, args.page, args.limit);
              }
              break;
            }
            case 'create': {
              await doCreateForumThread(args.subject, args.text, args.photos);
              break;
            }
            case 'post': {
              await doPostToForumThread(args.threadId, args.text, args.photos);
              break;
            }
            case 'sticky': {
              await doSticky(args.threadId, true);
              break;
            }
            case 'unsticky': {
              await doSticky(args.threadId, false);
              break;
            }
            case 'lock': {
              await doLocked(args.threadId, true);
              break;
            }
            case 'unlock': {
              await doLocked(args.threadId, false);
              break;
            }
            case 'delete-post': {
              await doDeletePost(args.threadId, args.postId);
              break;
            }
            case 'update-post': {
              await doUpdatePost(args.threadId, args.postId, args.text, args.photos);
              break;
            }
            case 'react': {
              await doReactToPost(args.threadId, args.postId, args.reaction);
              break;
            }
            case 'delete-react': {
              await doDeleteReactToPost(args.threadId, args.postId, args.reaction);
              break;
            }
          }
          break;
        }
        default: {
          console.error('Unhandled argument:', args._);
          throw new TwitarrError('Unhandled argument: ' + args._.join(' '));
        }
      }
      process.exit(0);
    } catch (err) {
      console.log(colors.red('Failed: ' + (err.toString ? err.toString() : err.message)));
      if (err.stack) {
        console.log(colors.red(err.stack));
      }
      if (err.data) {
        console.log('data:', err.data);
      }
      if (err.errors) {
        console.log('errors:', err.errors);
      }
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
