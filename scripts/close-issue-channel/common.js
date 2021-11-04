export const closeIssueChannel = async (client, issueNumber) => {
	let success = false;
	try {
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const archiveChannel = channels.find((ch) => ch.id === process.env.ARCHIVE_CHANNEL_ID);
		if (archiveChannel === null) {
			console.log(`No archive channel found.`);
			return false;
		}
		for (const channel of channels) {
			// Only close the channel if it matches the issue number.
			if (channel.parentId !== process.env.HUB_ID) continue;
			if (!channel.name.startsWith(`website-issue-${issueNumber}`)) continue;
			console.log('Channel: ', channel);
			// TODO: Fetch all messages from `closedChannel` text channel.
			// TODO: Print messages out to TXT file format.
			// TODO: Send TXT file to `hubChannel` text channel.
			// TODO: Delete `closedChannel` text channel.
		}
		success = true;
	} catch (e) {
		console.log({ e });
	}
	return success;
};
