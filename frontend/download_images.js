const fs = require('fs');
const path = require('path');
const https = require('https');

const searchDirs = ['components', 'app'];
const publicIconsDir = path.join('public', 'icons');

if (!fs.existsSync(publicIconsDir)) {
  fs.mkdirSync(publicIconsDir, { recursive: true });
}

function findFiles(dir, ext) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) {
      results = results.concat(findFiles(file, ext));
    } else if (file.endsWith(ext) || file.endsWith('.ts')) {
      results.push(file);
    }
  });
  return results;
}

const files = [];
searchDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    files.push(...findFiles(dir, '.tsx'), ...findFiles(dir, '.ts'));
  }
});

const urlRegex = /https?:\/\/studyindiafair\.com\/[a-zA-Z0-9./_-]+\.(png|jpg|jpeg|gif|svg|webp)/g;

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
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

async function processFiles() {
  const urlMap = new Map();

  for (const file of files) {
    let content = fs.readFileSync(file, 'utf8');
    let matches = content.match(urlRegex);
    if (matches) {
      for (const url of matches) {
        const filename = path.basename(url);
        const destPath = path.join(publicIconsDir, filename);
        await downloadImage(url, destPath);
        
        // replace in content globally
        // we use split/join in case the same url appears multiple times
        content = content.split(url).join(`/icons/${filename}`);
      }
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
  console.log('Done!');
}

processFiles();
