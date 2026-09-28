const fs = require('fs');
const path = require('path');

const iconsDir = path.join('public', 'icons');
const imagesDir = path.join('public', 'images');

// 1. Move all files from icons to images
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

if (fs.existsSync(iconsDir)) {
  const files = fs.readdirSync(iconsDir);
  for (const file of files) {
    fs.renameSync(path.join(iconsDir, file), path.join(imagesDir, file));
  }
  // Try to remove icons dir if empty
  try {
    fs.rmdirSync(iconsDir);
  } catch (e) {
    // Ignore if not empty
  }
}

// 2. Search and replace "/icons/" with "/images/" in all .tsx files
function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, ext));
    } else if (file.endsWith(ext)) {
      results.push(file);
    }
  });
  return results;
}

const searchDirs = ['components', 'app'];
const filesToProcess = [];
searchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    filesToProcess.push(...findFiles(dir, '.tsx'));
  }
});

for (const file of filesToProcess) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('/icons/')) {
    content = content.replace(/\/icons\//g, '/images/');
    fs.writeFileSync(file, content, 'utf8');
    console.log(`Updated ${file}`);
  }
}

console.log('Successfully moved to /images/ and updated code.');
