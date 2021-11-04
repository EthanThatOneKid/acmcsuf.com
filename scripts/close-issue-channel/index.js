import { closeIssueChannel } from './common.js';
import { startBot, parseArgs } from '../common.js';

const ARGS = parseArgs();

startBot(async (client) => {
	console.log(`Logged in as ${client.user.tag}`);
	const issueNumber = ARGS['issue'];
	console.log(`Closing issue ${issueNumber}`);
	const success = await closeIssueChannel(client, issueNumber);
	client.destroy();
	console.log(`Success: ${success}`);
	process.exit(success ? 0 : 1);
});
