export const closeIssueChannel = (client, issue) => {
	let success = false;
	try {
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const hubChannel = channels.cache.find((c) => c.position === 0);
		const closedChannel = channels.cache.find((c) => c.name === `website-issue-${issue.number}`);
		// TODO: Check if hub channel is always at position 0.
		console.log({ hubChannel, closedChannel, channels: [...channels.cache] });
		// TODO: Fetch all messages from `closedChannel` text channel.
		// TODO: Print messages out to TXT file format.
		// TODO: Send TXT file to `hubChannel` text channel.
		// TODO: Delete `closedChannel` text channel.
		success = true;
	} catch (e) {
		console.log({ e });
	}
	return success;
};
