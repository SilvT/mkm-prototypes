// Copies the design system into this repo from SilvT/DS_POC (private) at a pinned ref.
//   npm run ds:sync                 -> latest main
//   npm run ds:sync -- --ref <sha>  -> a specific commit/branch/tag
//   npm run ds:sync -- --from <dir> -> a local checkout (no git; records "local")
// Writes only the synced paths below, then records the commit in ds-sync.json. Never edit synced files by hand.
import { execFileSync } from 'node:child_process';
import { cpSync, mkdirSync, readdirSync, rmSync, statSync, writeFileSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';

const REPO = 'SilvT/DS_POC';
const args = process.argv.slice(2);
const opt = (n) => (args.includes(n) ? args[args.indexOf(n) + 1] : undefined);
const root = new URL('..', import.meta.url).pathname;
const cache = join(root, '.ds-cache');

let src = opt('--from');
let commit = 'local';
if (!src) {
  rmSync(cache, { recursive: true, force: true });
  execFileSync('gh', ['repo', 'clone', REPO, cache, '--', '--quiet'], { stdio: 'inherit' });
  const ref = opt('--ref');
  if (ref) execFileSync('git', ['-C', cache, 'checkout', '--quiet', ref], { stdio: 'inherit' });
  commit = execFileSync('git', ['-C', cache, 'rev-parse', 'HEAD']).toString().trim();
  src = cache;
}

// [DS path, skip rule]. Stories, tests and Storybook-only helpers are not needed to run screens.
const skip = (p) => /\.(stories|test)\.tsx?$/.test(p) || /\.mdx$/.test(p) || /-story-/.test(p) || p.endsWith('atoms-preview.stories.tsx');
const paths = ['src/components/ui', 'src/components/atoms', 'src/lib', 'src/styles'];

for (const p of paths) rmSync(join(root, p), { recursive: true, force: true });
const copied = [];
const walk = (from, to) => {
  mkdirSync(to, { recursive: true });
  for (const name of readdirSync(from)) {
    const f = join(from, name), t = join(to, name);
    if (statSync(f).isDirectory()) walk(f, t);
    else if (!skip(f)) { cpSync(f, t); copied.push(relative(root, t)); }
  }
};
for (const p of paths) walk(join(src, p), join(root, p));
// The DS entry CSS keeps its relative url()s, so it lands next to index.css as ds.css.
cpSync(join(src, 'src/index.css'), join(root, 'src/ds.css'));
copied.push('src/ds.css');

writeFileSync(join(root, 'ds-sync.json'), JSON.stringify({ repo: REPO, commit, syncedAt: new Date().toISOString(), files: copied.length }, null, 2) + '\n');
if (!existsSync(join(root, 'src/components/ui'))) throw new Error('sync produced no components');
console.log(`Synced ${copied.length} files from ${REPO}@${commit.slice(0, 7)}`);
