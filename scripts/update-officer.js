import { getNArg } from './common.js';

const updateOfficer = async () => {
  const payload = getNArg(2);
  console.log('PAYLOAD: ', { payload });
  // TODO: Use the data to update the officer data locally.
};

try {
  const success = await updateOfficer();
  if (success) process.exit(0);
  // eslint-disable-next-line no-empty
} catch (error) {
  console.error(error);
}

process.exit(1);
