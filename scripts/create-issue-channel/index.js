import { Client, Intents } from 'discord.js';
import { createIssueChannel } from './common.js';
import { config } from 'dotenv';

config();

const client = new Client({
	intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});

client.on('ready', async () => {
	console.log(`Logged in as ${client.user.tag}`);
	const success = await createIssueChannel(client);
	client.destroy();
	process.exit(success ? 0 : 1);
});

client.login(process.env.DISCORD_BOT_TOKEN);
