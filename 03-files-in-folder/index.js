const path = require('path');
const fs = require('fs');

const dir = path.resolve(__dirname, 'secret-folder');

try {
  const files = fs.promises.readdir(dir, {withFileTypes: true});
  files.then((data => {
    for (let file of data) {
      fs.stat(path.resolve(dir, file.name), (err, stat) => {
        if (err) throw err;
        if (!stat.isDirectory()) {
          const fileName = file.name.slice(0, -path.extname(file.name).length);
          const ext = path.extname(file.name).slice(1);
          const size = `${Math.trunc( stat.size / 1024)}.${stat.size % 1024}kb`;
          console.log(`${fileName} - ${ext} - ${size}`);
        }
      });
    }
  }));
} catch (err) {
  console.log(err);
}