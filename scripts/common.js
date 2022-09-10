import { Client, Intents } from 'discord.js';
import { config } from 'dotenv';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function getNArg(n = 2) {
  const payload = process.argv[n];
  try {
    return JSON.parse(payload);
    // eslint-disable-next-line no-empty
  } catch {}
  return payload;
}

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function startBot(start) {
  config();
  const intents = [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES];
  const client = new Client({ intents });
  client.on('ready', async () => await start(client));
  client.login(process.env.DISCORD_BOT_TOKEN);
}
