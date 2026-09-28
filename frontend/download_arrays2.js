const fs = require('fs');
const path = require('path');
const https = require('https');

const publicIconsDir = path.join('public', 'icons');
if (!fs.existsSync(publicIconsDir)) {
  fs.mkdirSync(publicIconsDir, { recursive: true });
}

async function downloadImage(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest)) return resolve();
    https.get(url, (res) => {
      if (res.statusCode === 200) {
        const file = fs.createWriteStream(dest);
        res.pipe(file);
        file.on('finish', () => {
          file.close(resolve);
        });
      } else {
        console.error(`Failed to download ${url}: ${res.statusCode}`);
        resolve();
      }
    }).on('error', (err) => {
      console.error(`Error downloading ${url}:`, err);
      resolve();
    });
  });
}

function extractArray(content, arrayName) {
  const startIndex = content.indexOf(`const ${arrayName} = [`);
  if (startIndex === -1) return [];
  const endIndex = content.indexOf('];', startIndex);
  if (endIndex === -1) return [];
  const arrayStr = content.substring(startIndex, endIndex + 2);
  
  // Extract all strings inside quotes
  const matches = arrayStr.match(/"([^"]+)"/g);
  if (!matches) return [];
  return matches.map(s => s.replace(/"/g, ''));
}

async function processOurAssociates() {
  const filePath = path.join('components', 'home', 'OurAssociates.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const items = extractArray(content, 'associates');
  
  for (const item of items) {
    const url = `https://studyindiafair.com/wp-content/uploads/2025/10/${item}`;
    const filename = path.basename(item);
    const dest = path.join(publicIconsDir, filename);
    await downloadImage(url, dest);
  }
  
  // Replace the src
  const oldSrc = '`https://studyindiafair.com/wp-content/uploads/2025/10/${logo}`';
  const newSrc = '`/icons/${logo}`';
  if (content.includes(oldSrc)) {
    content = content.replace(oldSrc, newSrc);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated OurAssociates.tsx');
  }
}

async function processOurAlliance() {
  const filePath = path.join('components', 'home', 'OurAlliance.tsx');
  if (!fs.existsSync(filePath)) return;
  
  let content = fs.readFileSync(filePath, 'utf8');
  const items = extractArray(content, 'alliances');
  
  for (const item of items) {
    const url = `https://studyindiafair.com/wp-content/uploads/${item}`;
    const filename = path.basename(item);
    const dest = path.join(publicIconsDir, filename);
    await downloadImage(url, dest);
  }
  
  // Notice that in OurAlliance, logo includes paths like "2025/10/a2.png"
  // If we save it as a2.png in /icons/, we need to strip the prefix in the map, OR
  // change the array to only contain the basenames.
  // The easiest is to change the array to contain only basenames!
  // But wait, the array is defined as "2025/10/a2.png". If we replace the array contents,
  // we can just strip the directory.
  
  let newContent = content;
  for (const item of items) {
    const filename = path.basename(item);
    newContent = newContent.replace(`"${item}"`, `"${filename}"`);
  }
  
  const oldSrc = '`https://studyindiafair.com/wp-content/uploads/${logo}`';
  const newSrc = '`/icons/${logo}`';
  if (newContent.includes(oldSrc)) {
    newContent = newContent.replace(oldSrc, newSrc);
  }
  
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated OurAlliance.tsx');
  }
}

async function run() {
  console.log("Processing OurAssociates...");
  await processOurAssociates();
  console.log("Processing OurAlliance...");
  await processOurAlliance();
  console.log("All done!");
}

run();
