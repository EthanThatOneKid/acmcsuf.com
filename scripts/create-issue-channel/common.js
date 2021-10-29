import fetch from 'node-fetch';

const shiftChannels = async (shiftedChannels) => {
	for (const channel of shiftedChannels) {
		await channel.edit({ position: channel.position + 1 });
	}
};

const prepareChannelData = async (channelCache, newName, belowName) => {
	const channels = [...channelCache.cache.values()]; // converts to Channel[]
	const nameExists = channels.find((ch) => ch.name === newName) !== undefined;
	if (nameExists) return null;
	const startChannel = channels.find((ch) => ch.name === belowName);
	const startChannelExists = startChannel !== undefined;
	if (!startChannelExists) return null;
	const startPos = startChannel.position;
	const displacedChannels = channels
		.filter((channel) => {
			return (
				channel.parentId === process.env.HUB_ID &&
				channel.position >= startPos &&
				channel.type === 'GUILD_TEXT'
			);
		})
		.sort((i, j) => j.position - i.position);
	return {
		position: startPos,
		displacedChannels,
	};
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
		const channelName = `issue-${number}`;
		await client.guilds.fetch();
		const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
		const channelData = await prepareChannelData(channels, channelName, 'closed-issues-below');
		if (channelData === null) return false;
		const { position, displacedChannels } = channelData;
		const channel = await channels.create(channelName, {
			type: 'GUILD_TEXT',
			parent: process.env.HUB_ID,
			reason: `Let's resolve #${number}!`,
		});
		await shiftChannels(displacedChannels); // First shift channels down.
		await channel.edit({ position }); // Then position the channel.
		const firstMessage = await channel.send(link);
		await firstMessage.pin();
		success = true;
	} catch (e) {
		console.log({ e });
	}
	return success;
};
