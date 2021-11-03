export const createIssueChannel = async (client, issue) => {
	let success = false;
	try {
		const channelName = `website-issue-${issue.number}`;
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const channel = await channels.create(channelName, {
			type: 'GUILD_TEXT',
			parent: process.env.HUB_ID,
			reason: `Let's resolve #${issue.number}!`,
		});
		const firstMessage = await channel.send(issue.html_url);
		await firstMessage.pin();
		success = true;
	} catch (e) {
		console.log({ e });
	}
	return success;
};
