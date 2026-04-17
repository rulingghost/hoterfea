import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixText(text) {
  // Convert Windows-1254 string back to bytes, then decode as UTF-8
  // Since V8 strings are UTF-16, we treat the Mojibake chars as raw bytes
  try {
    const bytes = new Uint8Array(text.length);
    for (let i = 0; i < text.length; i++) {
        const charCode = text.charCodeAt(i);
        // If there's any char code > 255 that isn't mapped specifically to Latin-5,
        // we might have a problem. Let's do a simple mapping.
    }
    // A simpler way: we know the typical mojibake string for Ş, ç, ğ, emojis
    // We can do a string replace for the specific sequences based on what they are.
  } catch (e) {}
  
  return text
    .replace(/Åž/g, 'Ş')
    .replace(/ÅŸ/g, 'ş')
    .replace(/ÄŸ/g, 'ğ')
    .replace(/Äž/g, 'Ğ')
    .replace(/Ä±/g, 'ı')
    .replace(/Ä°/g, 'İ')
    .replace(/Ã§/g, 'ç')
    .replace(/Ã‡/g, 'Ç')
    .replace(/Ã¶/g, 'ö')
    .replace(/Ã–/g, 'Ö')
    .replace(/Ã¼/g, 'ü')
    .replace(/Ãœ/g, 'Ü')
    .replace(/âœ“/g, '✓')
    .replace(/â†’/g, '→')
    .replace(/â—/g, '●')
    .replace(/ğŸ’»/g, '💻')
    .replace(/ğŸ’ /g, '💍')
    .replace(/ğŸ‘•/g, '👕')
    .replace(/ğŸ‘œ/g, '👜')
    .replace(/ğŸ§¸/g, '🧸')
    .replace(/ğŸ“¦/g, '📦')
    .replace(/ğŸŒ /g, '🌍')
    .replace(/ğŸ’¼/g, '💼')
    .replace(/ğŸ“‘/g, '📄')
    .replace(/ğŸ”§/g, '🔧')
    .replace(/ğŸš—/g, '🚗')
    .replace(/ğŸ›‘/g, '🛏️')
    .replace(/ğŸ•’/g, '🕰️')
    .replace(/ğŸ’°/g, '💰')
    .replace(/ğŸ¥‚/g, '🥂')
    .replace(/ğŸ“ˆ/g, '📈')
    .replace(/ğŸ‘¥/g, '👥')
    .replace(/ğŸ¤ /g, '🤝')
    .replace(/ğŸŽ“/g, '🎓')
    .replace(/ğŸ“Š/g, '📊')
    .replace(/ğŸ› /g, '🛠️')
    .replace(/ğŸ›£/g, '🛏')
    .replace(/ğŸŽ¯/g, '🎯')
    .replace(/ğŸ“ /g, '📱')
    .replace(/ğŸš€/g, '🚀')
    .replace(/ğŸ•‘/g, '⏱️')
    .replace(/ğŸ“Œ/g, '📌')
    .replace(/ğŸ¥ /g, '🥇')
    .replace(/ğŸŽ…/g, '🎅')
    .replace(/ğŸ¥‚/g, '🍷') // close enough
    .replace(/ğŸ Ÿ/g, '🏥')
    .replace(/ğŸŒŸ/g, '🌟')
    .replace(/ğŸ”’/g, '🔒')
    .replace(/ğŸ› /g, '🛡️')
    .replace(/ğŸ’¡/g, '💡')
    .replace(/ğŸ”§/g, '⚙')
    .replace(/ğŸ•’/g, '🕒')
    .replace(/ğŸ’š/g, '💚')
    .replace(/ğŸŽ/g, '🎵') // etc...
    .replace(/ğŸ¥Ÿ/g, '🥟')
    .replace(/ğŸŽ‚/g, '🎂');
}

function walkDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDir(fullPath);
    } else if (fullPath.endsWith('.jsx') || fullPath.endsWith('.js') || fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      content = fixText(content);
      
      // Check for remaining ğŸ
      if (content.includes('ğŸ')) {
         console.warn(`WARN: Unmapped Emoji Mojibake in ${fullPath}`);
      }

      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log(`Fixed: ${fullPath}`);
      }
    }
  }
}

console.log('Starting Mojibake text replacement...');
walkDir(path.join(__dirname, 'src'));
console.log('Done!');
