const fs = require('fs');
const path = require('path');

const publicImagesDir = path.join('public', 'images');

const files = fs.readdirSync(publicImagesDir).filter(f => {
  return fs.statSync(path.join(publicImagesDir, f)).isFile();
});

for (const file of files) {
  let targetDir = 'home';
  if (file === 'cheerful-students-celebrating.png') {
    targetDir = 'contact-us';
  }

  const destDir = path.join(publicImagesDir, targetDir);
  if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
  
  fs.renameSync(path.join(publicImagesDir, file), path.join(destDir, file));
}

// Now update ContactFormSection.tsx since the previous regex missed it because of the ')'
let contactFile = 'components/contact-us/ContactFormSection.tsx';
if (fs.existsSync(contactFile)) {
  let contactContent = fs.readFileSync(contactFile, 'utf8');
  contactContent = contactContent.replace('url(/images/cheerful-students-celebrating.png)', 'url(/images/contact-us/cheerful-students-celebrating.png)');
  fs.writeFileSync(contactFile, contactContent, 'utf8');
  console.log("Updated ContactFormSection");
}

// Now update OurAssociates.tsx and OurAlliance.tsx to prepend home/ to their logos
let associatesFile = 'components/home/OurAssociates.tsx';
if (fs.existsSync(associatesFile)) {
  let assocContent = fs.readFileSync(associatesFile, 'utf8');
  assocContent = assocContent.replace('`/images/${logo}`', '`/images/home/${logo}`');
  fs.writeFileSync(associatesFile, assocContent, 'utf8');
  console.log("Updated OurAssociates");
}

let allianceFile = 'components/home/OurAlliance.tsx';
if (fs.existsSync(allianceFile)) {
  let allianceContent = fs.readFileSync(allianceFile, 'utf8');
  allianceContent = allianceContent.replace('`/images/${logo}`', '`/images/home/${logo}`');
  fs.writeFileSync(allianceFile, allianceContent, 'utf8');
  console.log("Updated OurAlliance");
}

console.log("Moved remaining files!");
