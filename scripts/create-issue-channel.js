import { startBot, getNArg } from './common.js';

startBot(async (client) => {
  console.log(`Logged in as ${client.user.tag}`);
  const issueNumber = getNArg(2);
  const issueTitle = getNArg(3);
  const success = await createIssueChannel(client, issueNumber, issueTitle); 
  client.destroy();
  console.log(`Success: ${success}`);
  process.exit(success ? 0 : 1);
});

async function createIssueChannel(client, issueNumber, issueTitle) {
  let success = false;

  try {
    await client.guilds.fetch();
    const { channels } = client.guilds.cache.get(process.env.GUILD_ID);

    const channelName = `website-issue-${issueNumber}`;
    if (await channelExists(channels, channelName)) {
      console.log(`#${channelName} already exists`);
      return true;
    }

    const channel = await channels.create(channelName, {
      type: 'GUILD_TEXT',
      parent: process.env.HUB_ID,
      reason: `Let's resolve #${issueNumber}!`,
    });

    const baseUrl = 'https://github.com/EthanThatOneKid/acmcsuf.com/issues/';

    const channelTopic = `${issueTitle} ` + (baseUrl + issueNumber); 
    channel.setTopic(channelTopic);

    const firstMessage = await channel.send(baseUrl + issueNumber);
    await firstMessage.pin();
    success = true;
  } catch (error) {
    console.error(error);
  }
  return success;
}

async function channelExists(channels, name) {
  for (const channel of channels.cache.values()) {
    if (channel.name === name) return true;
  }

  return false;
}
