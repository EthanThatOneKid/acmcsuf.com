const findFirstChannelInCategory = (channels, categoryId) => {
	let firstChannel = null;
	for (const channel of channels) {
		if (
			channel.parentId === categoryId &&
			(firstChannel === null || channel.position < firstChannel.position)
		) {
			firstChannel = channel;
		}
	}
	return firstChannel;
};

export const closeIssueChannel = async (client, issueNumber) => {
	let success = false;
	try {
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const hubChannel = findFirstChannelInCategory(channels, process.env.HUB_ID);
		if (hubChannel === null) {
			console.log(`No hub channel found.`);
			return false;
		}
		for (const channel of channels.cache) {
			// Only close the channel if it matches the issue number.
			if (channel.parentId !== process.env.HUB_ID) continue;
			if (!channel.name.startsWith(`website-issue-${issueNumber}`)) continue;
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
