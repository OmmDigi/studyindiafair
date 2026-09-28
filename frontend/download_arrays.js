const fs = require('fs');
const path = require('path');
const https = require('https');

const publicIconsDir = path.join('public', 'icons');
if (!fs.existsSync(publicIconsDir)) {
  fs.mkdirSync(publicIconsDir, { recursive: true });
}

async function downloadImage(url, dest) {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest)) return resolve();
    console.log(`Downloading ${url}...`);
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

// OurAssociates
const associates = [
    "associates7.png", "associates6.png", "associates5.png", "associates4.png",
    "associates3.png", "associates2.png", "associates1.png",
    "p1.png", "p2.png", "p3.png", "p4.png", "p5.png", "p6.png",
    "p7.png", "p8.png", "p9.png", "p10.png", "p11.png", "p12.png", "p13.png"
];

// OurAlliance
const alliances = [
    "2023/10/alliance8.png",
    "2023/10/alliance7.png",
    "2023/10/alliance6.png",
    "2023/10/alliance5.png",
    "2023/10/alliance4.png",
    "2023/10/alliance3.png",
    "2023/10/alliance2.png",
    "2023/10/alliance1.png",
    "2025/09/image.png",
    "2025/09/image-1.png",
    "2025/09/image-2.png"
];

async function run() {
  for (const file of associates) {
    const url = `https://studyindiafair.com/wp-content/uploads/2025/10/${file}`;
    const dest = path.join(publicIconsDir, file);
    await downloadImage(url, dest);
  }
  
  for (const file of alliances) {
    const url = `https://studyindiafair.com/wp-content/uploads/${file}`;
    const dest = path.join(publicIconsDir, path.basename(file));
    await downloadImage(url, dest);
  }
}

run().then(() => console.log('Done downloading array images!'));
