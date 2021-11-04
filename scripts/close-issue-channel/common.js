export const closeIssueChannel = async (client, issue) => {
	let success = false;
	try {
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const hubChannel = channels.cache.find(
			(c) => c.parentId === process.env.HUB_ID && c.position === 0
		);
		if (hubChannel === undefined) {
			console.log(`No hub channel found.`);
			return false;
		}
		for (const channel of channels.cache) {
			// Only close the channel if it matches the issue number.
			if (channel.parentId !== process.env.HUB_ID) continue;
			if (!channel.name.startsWith(`website-issue-${issue.number}`)) continue;
			// TODO: Check if hub channel is always at position 0.
			console.log({ hubChannel, closedChannel, channels: [...channels.cache] });
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
