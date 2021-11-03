import { closeIssueChannel } from './common';
import { startBot, parseArgs, parseIssue } from '../common';

const ARGS = parseArgs();

startBot(async () => {
	console.log(`Logged in as ${client.user.tag}`);
	const issue = parseIssue(ARGS['issue']);
	const success = await closeIssueChannel(client, issue);
	client.destroy();
	console.log(`Success: ${success}`);
	process.exit(success ? 0 : 1);
});
