import { promisify } from 'util';
import { exec } from 'child_process';

const execAsync = promisify(exec);

const seekTabs = async () => {
  const { stdout: diff } = await execAsync('git diff');
  const tabs = diff
    .split('\n')
    .filter((line) => {
      const isNewChange = line.startsWith('+');
      const containsTab = /\t/.test(line);
      return isNewChange && containsTab;
    })
    .map((line) => line.slice(1)); // remove the '+'
  tabs.forEach((code) => console.error(`tabs: ${code}`));
  const success = tabs.length === 0;
  return success;
};

const success = await seekTabs();
process.exit(success ? 0 : 1);
