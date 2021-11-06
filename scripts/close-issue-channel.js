import { startBot, parseArgs } from './common.js';
import { textSync as asciiText } from 'figlet';

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
export const closeIssueChannel = async (client, issueNumber) => {
	let success = false;
	try {
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const archiveChannel = channels.cache.find((ch) => ch.id === process.env.ARCHIVE_CHANNEL_ID);
		if (archiveChannel === null) {
			console.log(`No archive channel found.`);
			return false;
		}
		console.log({ archiveChannel });
		const oldChannels = channels.cache.filter(
			(ch) =>
				ch.parentId === archiveChannel.parentId &&
				ch.name.startsWith(`website-issue-${issueNumber}`)
		);
		for (const oldChannel of oldChannels) {
			const allMessages = await fetchAllMessages(oldChannel);
			const title = asciiText(oldChannel.name, { font: 'Standard' });
			const subtitle = ` ╰─ archived ${new Date().toISOString()}`;
			const fileContent =
				title + '\n' + subtitle + '\n' + allMessages.map(formatMessage).join('\n\n');
			const archiveBin = Buffer.from(fileContent);
			const archiveFile = new Discord.MessageAttachment(archiveBin, `${oldChannel.name}.txt`);
			await archiveChannel.send(archiveFile);
		}
		success = true;
	} catch (error) {
		console.log(error);
	}
	return success;
};

/**
 * TODO: Fetch all messages from `oldChannel` text channel.
 * Inspired by
 * https://github.com/diamondburned/arikawa/blob/123f8bc41ff2db3c2a9088a336889012c1f7ebf6/api/message.go#L60
 */
const fetchAllMessages = async (channel) => {
	const result = [];
	return result;
};

const formatMessage = (message, wordWrap = 72) => {
	const lines = [];
	for (const line of message.content.split('\n')) {
		lines.push(...wrapText(line, wordWrap));
	}
	const topLeft = `╭─${msg.id}─@${msg.author}─(${msg.createdAt.toISOString()})─`;
	const longestLine = Math.max(
		lines.reduce((a, b) => (a.length > b.length ? a : b)),
		topLeft.length
	);
	const topRight = '─'.repeat(topLeft.length - longestLine.length) + '╮';
	const content = lines
		.map((line) => `│ ${line}${' '.repeat(longestLine.length - line.length - 2)} │`)
		.join('\n');
	const bottom = `╰${'─'.repeat(longestLine.length)}╯`;
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
