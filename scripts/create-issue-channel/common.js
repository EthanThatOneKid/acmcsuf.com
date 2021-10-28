import fetch from 'node-fetch';

const getChannelPosition = async (channels, newName) => {
	let position = null;
	for (const [id, channel] of channels.cache) {
		if (channel.name === newName) return null; // Fail if name already exists.
		if (channel.name === 'closed-issues-below') {
			position = channel.rawPosition;
		}
	}
	return position;
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
		const position = await getChannelPosition(channels);
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
