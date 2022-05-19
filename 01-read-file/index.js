const fs = require('fs');
const path = require('path');
const process = require('process');

const stream = fs.createReadStream(path.resolve(__dirname, 'text.txt'), 'utf-8');

stream.on('data', (chunk) => {
  process.stdout.write(chunk);
});

stream.on('error', (err) => {
  process.stdout.write(err.message);
});