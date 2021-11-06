import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';

export const get$1 = () => {
	const payload = process.argv[1];
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
