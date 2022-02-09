import { startBot, getNArg } from './common.js';

startBot(async (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  const issueNumber = getNArg(2);
  console.log(`Closing issue ${issueNumber}`);
  const success = await closeIssueChannel(client, issueNumber, /*dev=*/ false);
  client.destroy();
  console.log(`Success: ${success}`);
  process.exit(success ? 0 : 1);
});

/**
 * ### Close Issue Channel Script
 *
 * #### Command Line Usage
 *
 * 1. Make sure your environment variables are defined.
 * 1. Run the following command.
 *
 * ```bash
 * node scripts/close-issue-channel.js 180
 * ```
 *
 * #### GitHub Workflow Usage
 *
 * ```yaml
 * - run: node scripts/close-issue-channel.js ${{ github.event.issue.number }}
 *   env:
 *     DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
 *     GUILD_ID: ${{ secrets.GUILD_ID }}
 *     ARCHIVE_CHANNEL_ID: ${{ secrets.ARCHIVE_CHANNEL_ID }}
 * ```
 *
 * ---
 *
 * See https://github.com/EthanThatOneKid/acmcsuf.com/blob/main/.github/workflows/close_issue_channel.yaml.
 */
async function closeIssueChannel(client, issueNumber, dev = false) {
  let success = false;
  try {
    await client.guilds.fetch();
    const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
    const archiveChannel = [...channels.cache.values()].find(
      (ch) => ch.id === process.env.ARCHIVE_CHANNEL_ID
    );
    if (archiveChannel === undefined) {
      console.log(`No archive channel found.`);
      return false;
    }
    const oldChannels = [...channels.cache.values()].filter(
      (ch) =>
        ch.parentId === archiveChannel.parentId && ch.name.includes(`website-issue-${issueNumber}`)
    );
    for (const oldChannel of oldChannels) {
      const timestamp = formatRFC882PST(new Date());
      const title = `╭
│    __/__/_ 
│   __/__/_  ${oldChannel.name}
│    /  /
│
╰─ archived ${timestamp}`;
      const footer = `╭${'─'.repeat(timestamp.length + 11)}╮
│ archived ${timestamp} │
╰${'─'.repeat(timestamp.length + 11)}╯`;
      const allMessages = await fetchAllMessages(oldChannel);
      const fileContent =
        title + '\n\n' + allMessages.map(formatMessage).join('\n') + '\n\n' + footer;
      if (dev) {
        console.log(fileContent);
        return true;
      }
      const attachment = Buffer.from(fileContent);
      await archiveChannel.send({
        content: oldChannel.name,
        files: [{ name: `${oldChannel.name}.txt`, attachment }],
      });
      await oldChannel.delete();
    }
    success = true;
  } catch (error) {
    console.log(error);
  }
  return success;
}

async function fetchAllMessages(channel, limit = 2e3) {
  const result = [];
  const softLimit = 100;
  let lastId;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    const options = { limit: softLimit };
    if (lastId) options.before = lastId;
    const messages = await channel.messages.fetch(options);
    if (messages === undefined) break;
    result.push(...messages.values());
    lastId = messages.last().id;
    if (messages.size != softLimit || result >= limit) break;
  }
  return result.sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());
}

function formatMessage(msg) {
  const lines = [];
  for (const line of msg.content.split('\n')) {
    lines.push(...wrapText(line, 72));
  }
  const topLeft = `╭${msg.author.tag} ─ ${formatRFC882PST(msg.createdAt)}`;
  const longestLine = lines.reduce(
    (record, line) => (line.length > record ? line.length : record),
    0
  );
  const width = Math.max(longestLine + 3, topLeft.length);
  const topRight = '─'.repeat(width - topLeft.length) + '╮';
  const content = lines
    .map((line) => {
      const padding = width - line.length - 3;
      return `│ ${line}${' '.repeat(padding)} │`;
    })
    .join('\n');
  const bottom = `╰${'─'.repeat(width - 1)}╯`;
  const result = topLeft + topRight + '\n' + content + '\n' + bottom;
  return result;
}

function wrapText(text, width = 72) {
  const lines = [];
  while (text.length > width) {
    const index = text.lastIndexOf(' ', width);
    if (index === -1) {
      lines.push(text.substring(0, width));
      text = text.substring(width);
    } else {
      lines.push(text.substring(0, index));
      text = text.substring(index + 1);
    }
  }
  lines.push(text);
  return lines;
}

function formatRFC882PST(date) {
  const [month, day, year, time, amPm] = date
    .toLocaleDateString('en-US', {
      day: '2-digit',
      month: 'short',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      timeZone: 'America/Los_Angeles',
    })
    .replace(/,/g, '')
    .split(' ');

  // get the formatted timezone required for RFC88
  const tz = Intl.DateTimeFormat('en-US', {
    timeZoneName: 'short',
    timeZone: 'America/Los_Angeles',
  })
    .format(date)
    .split(' ')
    .at(-1);

  return [day, month, year, time, amPm, tz].join(' ');
}
