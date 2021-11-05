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
			console.log('Channel: ', oldChannel);
			// TODO: Fetch all messages from `oldChannel` text channel.
			// TODO: Print messages out to TXT file format.
			// TODO: Send TXT file to `archiveChannel` text channel.
			// TODO: Delete `oldChannel` text channel.
		}
		success = true;
	} catch (error) {
		console.log(error);
	}
	return success;
};
