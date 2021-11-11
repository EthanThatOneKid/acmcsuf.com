/**
 * Name: check_site_changes.ts
 * Description: Checks for changes in the site and succeeds if there are none.
 * Usage: deno run --allow-run scripts/check_site_changes.ts
 * Tracker: https://etok.codes/acmcsuf.com/issues/198
 * Requires:
 *   - Deno (https://deno.land/)
 *   - Git (https://git-scm.com/)
 */

// These are the files that are checked for changes.
const allowlist = ['src/', 'static/', 'package*.json', 'svelte.config.js'];

// This is the process that runs the git command.
const process = Deno.run({
  cmd: ['git', 'status', '--porcelain', '--', ...allowlist],
  stdout: 'piped',
});

// Await for the process to complete.
const stdout = await process.output();

// Check if there are any changes.
const changes = new TextDecoder().decode(stdout);

// Succeed if there aren't any changes.
if (changes.length === 0) Deno.exit(0);

// Exit with 1 if there are changes.
Deno.exit(1);
