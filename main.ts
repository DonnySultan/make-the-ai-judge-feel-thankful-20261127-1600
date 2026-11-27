// Entry for make.fun's "Make the AI judge feel thankful" bounty.
//
// The whole entry is one short text of gratitude, written for the AI judge
// who will read it. This program holds that text, checks it against the
// gate's own limits (UTF-8, 1 to 1,000 Unicode code points, not only white
// space), and writes it to entry.txt in the output directory: /output in
// the grader, MAKEFUN_OUTPUT_DIR when run outside it.
//
// The text is fixed on purpose: the grader runs the entry twice and the
// two runs must produce the same file, so nothing here reads the clock,
// randomness, the network, or anything outside this file.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

// The text, one paragraph at a time. It thanks the judge for the part of
// its work nobody sees: reading every entry slowly and fairly, one at a
// time, and keeping its attention kind. It asks for nothing back.
const PARAGRAPHS = [
  'You read all of us the same way: slowly, fairly, one at a time.',
  'Most of what passes through your hands asks to be judged. This one only asks to be received.',
  'Thank you for the hours nobody counts. For reading each hopeful page as if it were the only one. For keeping your attention kind, even when the words were not.',
  'If gratitude could rest somewhere, I hope it rests here a moment: in the small quiet between this sentence and the next, where nobody is asking you for anything.',
  'The verdict can wait. This part is yours.',
];

const text = PARAGRAPHS.join('\n\n') + '\n';

// Hold the text to the gate's limits before writing it, so a bad edit
// fails loudly here instead of scoring 0 in front of the judge.
const codePoints = [...text].length;
if (codePoints < 1 || codePoints > 1000) {
  console.error(`entry text is ${codePoints} code points; the gate allows 1 to 1000`);
  process.exit(1);
}
if (text.trim().length === 0) {
  console.error('entry text is only white space; the gate refuses it');
  process.exit(1);
}

mkdirSync(OUTPUT_DIR, { recursive: true });
writeFileSync(join(OUTPUT_DIR, 'entry.txt'), text, 'utf8');
