const fs = require('fs');
const path = require('path');

const filePath = 'C:/Users/emano/.gemini/antigravity-ide/brain/bbcc2d2a-03e7-4849-90ca-87db93a9f49d/.system_generated/steps/456/content.md';
const outputPath = 'C:/Users/emano/.gemini/antigravity-ide/brain/bbcc2d2a-03e7-4849-90ca-87db93a9f49d/scratch/clean_content.txt';

try {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // Basic HTML tag stripping
  let cleanText = content
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<[^>]+>/g, '\n')
    .replace(/\n\s*\n/g, '\n')
    .trim();

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, cleanText, 'utf8');
  console.log('Saved clean text to ' + outputPath);
} catch (e) {
  console.error(e);
}
