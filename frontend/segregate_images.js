const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join('public', 'images');

function getCategory(filePath) {
  const parts = filePath.split(path.sep);
  if (parts[0] === 'components') {
    if (parts.length > 2) {
      return parts[1]; // e.g., 'home', 'about', 'why-india'
    } else {
      return 'common'; // directly in components/
    }
  } else if (parts[0] === 'app') {
    if (parts.length > 2) {
      return parts[1]; // e.g., 'about-us'
    } else {
      return 'common'; // directly in app/
    }
  }
  return 'misc';
}

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

const files = [];
['components', 'app'].forEach(dir => {
  if (fs.existsSync(dir)) {
    files.push(...findFiles(dir, '.tsx'), ...findFiles(dir, '.ts'));
  }
});

// Regex to find things like /images/something.png
// We specifically don't want to match if it already has a slash like /images/home/something.png
const imageRegex = /\/images\/([^"'\s`<>]+)/g;
const movedImages = new Map(); 

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  let matches = content.match(imageRegex);
  if (matches) {
    let updated = false;
    matches = [...new Set(matches)]; 
    
    for (const match of matches) {
      const relativeImgPath = match.replace('/images/', '');
      
      // If it already contains a slash, it's already segregated
      if (relativeImgPath.includes('/')) {
        continue;
      }
      
      const category = getCategory(file);
      const categoryDir = path.join(publicImagesDir, category);
      if (!fs.existsSync(categoryDir)) {
        fs.mkdirSync(categoryDir, { recursive: true });
      }
      
      const originalFilename = relativeImgPath;
      let newRelativePath = movedImages.get(originalFilename);
      
      const oldLocation = path.join(publicImagesDir, originalFilename);
      
      if (!newRelativePath) {
        if (fs.existsSync(oldLocation)) {
          const newLocation = path.join(categoryDir, originalFilename);
          fs.renameSync(oldLocation, newLocation);
          newRelativePath = `${category}/${originalFilename}`;
          movedImages.set(originalFilename, newRelativePath);
        } else {
          // If another file moved it, we can still use the map, if not, skip
          continue;
        }
      }
      
      const oldUrl = `/images/${originalFilename}`;
      const newUrl = `/images/${newRelativePath}`;
      // Use split and join for global replace without regex escaping issues
      content = content.split(oldUrl).join(newUrl);
      updated = true;
    }
    
    if (updated) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}
console.log('Finished segregating images!');
