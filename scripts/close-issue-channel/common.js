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
		const oldChannels = channels.filter(
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
	} catch (e) {
		console.log({ e });
	}
	return success;
};
