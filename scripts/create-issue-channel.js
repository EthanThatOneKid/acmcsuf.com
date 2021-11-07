import { startBot, getNArg } from './common.js';

startBot(async (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  const issueNumber = getNArg(2);
  const success = await createIssueChannel(client, issueNumber);
  client.destroy();
  console.log(`Success: ${success}`);
  process.exit(success ? 0 : 1);
});

const createIssueChannel = async (client, issueNumber) => {
  let success = false;
  try {
    const channelName = `website-issue-${issueNumber}`;
    await client.guilds.fetch();
    const { channels } = client.guilds.cache.get(process.env.GUILD_ID);
    const channel = await channels.create(channelName, {
      type: 'GUILD_TEXT',
      parent: process.env.HUB_ID,
      reason: `Let's resolve #${issueNumber}!`,
    });
    const baseUrl = 'https://github.com/EthanThatOneKid/acmcsuf.com/issues/';
    const firstMessage = await channel.send(baseUrl + issueNumber);
    await firstMessage.pin();
    success = true;
  } catch (error) {
    console.error(error);
  }
  return success;
};
