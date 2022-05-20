const path = require('path');
const fs = require('fs');

const filesDir = path.resolve(__dirname, 'files');
const nameNewDir = 'files-copy';

try {
  const files = fs.promises.readdir(filesDir);
  fs.mkdir(path.resolve(__dirname, nameNewDir), {recursive: true}, (err) => {
    if (err) throw err;
  });
  files.then((data) => {
    data.forEach((file) => {
      const input = fs.createReadStream(path.resolve(filesDir, file), 'utf-8');
      const output = fs.createWriteStream(path.resolve(__dirname, nameNewDir, file));
      input.pipe(output);
    });
  });
  console.log('copy files done');
} catch (err) {
  console.log(err);
}
