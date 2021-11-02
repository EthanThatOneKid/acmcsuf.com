import minimist from 'minimist';

const parseCommandLineArgs = () => minimist(process.argv.slice(2));

export const collectFormData = () => {
	try {
		const args = parseCommandLineArgs();
		const payload = args['payload'];
		console.log('PAYLOAD: ', payload);
		const json = JSON.parse(payload);
		console.log({ json });
		// TODO: Use the data to update the officer data locally.
		return json;
	} catch {}
	return null;
};
