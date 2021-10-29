import fetch from 'node-fetch';

const shiftChannels = async (channelCache, newName, belowName) => {
	const channels = [...channelCache.cache];
	const nameExists = channels.find(([_, { name }]) => name === newName) !== undefined;
	if (nameExists) return null;
	const startChannel = channels.find(([_, { name }]) => name === belowName)[1];
	if (startChannel === undefined) return null;
	const startPos = startChannel.position;
	const shiftedChannels = channels
		.filter(([_, channel]) => {
			return (
				channel.parentId === process.env.HUB_ID &&
				channel.position >= startPos &&
				channel.type === 'GUILD_TEXT'
			);
		})
		.sort(([_, i], [__, j]) => i.position - j.position);
	for (const [_, channel] of shiftedChannels) {
		await channel.edit({ position: channel.position + 1 });
	}
	return startPos;
};

const fetchLatestIssue = async () => {
	const repo = process.env.GITHUB_REPOSITORY || 'EthanThatOneKid/acmcsuf.com';
	const response = await fetch(`https://api.github.com/repos/${repo}/issues`);
	const issues = await response.json();
	const latestIssue = issues.shift();
	return latestIssue;
};

export const createIssueChannel = async (client) => {
	let success = false;
	try {
		const issue = await fetchLatestIssue();
		const link = issue.html_url;
		const number = issue.number;
		const channelName = `website-issue-${number}`;
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const position = await shiftChannels(channels, channelName, 'closed-issues-below');
		if (position === null) return false;
		const channel = await channels.create(channelName, {
			type: 'GUILD_TEXT',
			reason: `Let's resolve #${number}!`,
			position,
		});
		const firstMessage = await channel.send(link);
		await firstMessage.pin();
		success = true;
	} catch {}
	return success;
};
