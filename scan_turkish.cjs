const fs = require('fs');
const path = require('path');

// Match Turkish chars in JSX text / string literals NOT already inside ternary with isEn
const TURKISH = /[çğışöüÇĞİIOŞÜ]/;

function walk(dir) {
  const results = [];
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) results.push(...walk(full));
    else if (f.endsWith('.jsx') || f.endsWith('.js')) results.push(full);
  }
  return results;
}

const files = walk('src/components').concat(walk('src/locales'));
const report = {};

for (const file of files) {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    // skip comments, imports, style blocks
    if (/^\s*(\/\/|\/\*|\*|import |export const |\.|\{`|background|border|padding|margin|font|color|grid|display|width|height|border-radius|transition)/.test(line)) continue;
    if (!TURKISH.test(line)) continue;
    // skip if already has isEn ternary on same line
    if (/isEn\s*\?/.test(line) || /language\s*===/.test(line)) continue;
    // skip data in guideData (already handled)
    if (file.includes('guideData')) continue;
    hits.push({ line: i + 1, text: line.trim().slice(0, 120) });
  }
  if (hits.length) report[file.replace(/\\/g, '/')] = hits;
}

// Output summary
const keys = Object.keys(report);
console.log(`\n=== TURKISH TEXT FOUND IN ${keys.length} FILES ===\n`);
for (const [file, hits] of Object.entries(report)) {
  const short = file.split('src/')[1];
  console.log(`\n📄 ${short} (${hits.length} lines)`);
  hits.slice(0, 8).forEach(h => console.log(`   L${h.line}: ${h.text}`));
  if (hits.length > 8) console.log(`   ... and ${hits.length - 8} more`);
}
