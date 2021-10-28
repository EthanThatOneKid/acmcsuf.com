import fetch from 'node-fetch';

const getChannelPosition = async (message) => {
	const channels = await message.guild.channels.fetch();
	return channels.findIndex(({ name }) => name === 'closed-issues-below');
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
		const guilds = await client.guilds.fetch();
		const guild = guilds.get(process.env.GUILD_ID);
		const channel = await guild.channels.create(channelName, {
			type: 'GUILD_TEXT',
			reason: `Let's resolve #${number}!`,
			position: await getChannelPosition(message),
		});
		const firstMessage = await channel.send(link);
		await firstMessage.pin();
		success = true;
	} catch {}
	return success;
};
