import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';
import minimist from 'minimist';

export const parseArgs = () => minimist(process.argv.slice(2));

export const parseIssue = (payload) => {
	try {
		return JSON.parse(payload);
	} catch {}
	return null;
};

export const startBot = (start) => {
	config();
	const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
	const client = new Client({ intents });
	client.on('ready', start);
	client.login(process.env.DISCORD_BOT_TOKEN);
};
