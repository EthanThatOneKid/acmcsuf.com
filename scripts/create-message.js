import { getNArg, startBot } from './common.js';

startBot(async (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  const issueNumber = getNArg(2);
  const success = await createMessage(client, issueNumber);
  client.destroy();
  console.log(`Success: ${success}`);
  process.exit(success ? 0 : 1);
});

async function createMessage(client, issueNumber) {
  let success = false;
  try {
    const channelName = `website-issue-${issueNumber}`;
    await client.guilds.fetch();
    const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
    const channel = await findChannel(channels, channelName);
    if (channel === null) {
      console.log(`Channel '${channelName}' was never found`);
      return false;
    }
    await channel.send(process.env.MESSAGE);
    success = true;
  } catch (error) {
    console.log(error);
  }
  return success;
}

async function findChannel(channels, name) {
  for (const channel of channels.cache.values()) {
    if (channel.name === name) return channel;
  }

  return null;
}
