import { createIssueChannel } from './common.js';
import { startBot, parseArgs, parseIssue } from '../common.js';

const ARGS = parseArgs();

startBot(async (client) => {
	console.log(`Logged in as ${client.user.tag}`);
	const issue = parseIssue(ARGS['payload']);
	const success = await createIssueChannel(client, issue);
	client.destroy();
	console.log(`Success: ${success}`);
	process.exit(success ? 0 : 1);
});
