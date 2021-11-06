import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';

export const getNArg = (n = 2) => {
	const payload = process.argv[n];
	try {
		return JSON.parse(payload);
	} catch {}
	return payload;
};

export const startBot = (start) => {
	config();
	const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
	const client = new Client({ intents });
	client.on('ready', async () => await start(client));
	client.login(process.env.DISCORD_BOT_TOKEN);
};
