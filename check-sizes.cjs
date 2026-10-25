const sharp = require('sharp');
const fs = require('fs');
const dir = 'C:/Users/TahaSync/Desktop/Hierarchy Shoot/Edited1';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg'));
files.forEach(f => {
  sharp(dir + '/' + f).metadata().then(m => {
    console.log(f.padEnd(45) + ' => ' + m.width + 'x' + m.height + ' ratio=' + (m.width / m.height).toFixed(3));
  }).catch(err => console.error(f, 'ERR', err.message));
});