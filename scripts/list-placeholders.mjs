// Lists every stock-shadcn placeholder: this is the "still to build in the design system" list.
import { readdirSync, readFileSync } from 'node:fs';
const dir = new URL('../src/placeholders/', import.meta.url);
const rows = readdirSync(dir).filter((f) => f.endsWith('.tsx')).map((f) => {
  const m = readFileSync(new URL(f, dir), 'utf8').match(/PLACEHOLDER: (.*)/);
  return `${f.padEnd(24)} ${m ? m[1] : '(missing PLACEHOLDER header)'}`;
});
console.log(rows.length ? rows.join('\n') : 'No placeholders.');
