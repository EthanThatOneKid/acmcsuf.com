import { collectFormData } from './common';

const data = collectFormData();
const success = data !== null;
process.exit(success ? 0 : 1);
