import { startBot, parseArgs } from './common.js';

const ARGS = parseArgs();

startBot(async (client) => {
	console.log(`Logged in as ${client.user.tag}`);
	const issueNumber = ARGS['issue'];
	console.log(`Closing issue ${issueNumber}`);
	const success = await closeIssueChannel(client, issueNumber);
	client.destroy();
	console.log(`Success: ${success}`);
	process.exit(success ? 0 : 1);
});

/**
 * # Close Issue Channel Script
 * ## Command Line Usage
 *
 * 1. Make sure your environment variables are defined.
 * 1. Run the following command.
 *
 * ```bash
 * node scripts/close-issue-channel.js --issue=180
 * ```
 *
 * ## GitHub Workflow Usage
 *
 * ```yaml
 * - run: node scripts/close-issue-channel.js --issue=${{ github.event.issue.number }}
 *   env:
 *     DISCORD_BOT_TOKEN: ${{ secrets.DISCORD_BOT_TOKEN }}
 *     GUILD_ID: ${{ secrets.GUILD_ID }}
 *     ARCHIVE_CHANNEL_ID: ${{ secrets.ARCHIVE_CHANNEL_ID }}
 * ```
 *
 * See `.github/workflows/close_issue_channel.yaml`.
 */
export const closeIssueChannel = async (client, issueNumber, dev = false) => {
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
			const allMessages = await fetchAllMessages(oldChannel);
			const title = `╭
│    __/__/_ 
│   __/__/_  ${oldChannel.name}
│    /  /
│
╰─ archived ${formatRFC882PST(new Date())}`;
			const footer = `╭─generated with 💖 by acmcsuf.com hub─╮`;
			const fileContent =
				title + '\n\n' + allMessages.map(formatMessage).join('\n') + '\n' + footer;
			if (dev) {
				console.log(fileContent);
				return true;
			}
			const attachment = Buffer.from(fileContent);
			const message = await archiveChannel.send({
				files: [{ name: `${oldChannel.name}.txt`, attachment }],
			});
			// TODO: await message.pin();
			// TODO: await oldChannel.delete();
		}
		success = true;
	} catch (error) {
		console.log(error);
	}
	return success;
};

/**
 * TODO: Fetch all messages in a channel via pagination technique.
 * Inspired by
 * https://github.com/diamondburned/arikawa/blob/123f8bc41ff2db3c2a9088a336889012c1f7ebf6/api/message.go#L60
 */
const fetchAllMessages = async (channel) => {
	const result = [...(await channel.messages.fetch()).values()]
		.filter((msg) => msg.content.length > 0)
		.reverse();
	return result;
};

const formatMessage = (msg) => {
	const lines = [];
	for (const line of msg.content.split('\n')) {
		lines.push(...wrapText(line, 72));
	}
	const topLeft = `╭${msg.author.tag} ─ ${formatRFC882PST(msg.createdAt)}`;
	const longestLine = lines.reduce((record, line) => (line.length > record ? line.length : record));
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
};

const wrapText = (text, width = 72) => {
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
};

const formatRFC882PST = (date) => {
	const [month, day, year, time, amPm] = date
		.toLocaleDateString('en-US', {
			day: '2-digit',
			month: 'short',
			year: '2-digit',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'America/Los_Angeles',
		})
		.replace(/\,/g, '')
		.split(' ');
	return `${day} ${month} ${year} ${time} ${amPm} PST`;
};
