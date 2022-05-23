const { stdin, stdout, exit } = process;
const fs = require('fs');
const path = require('path');

fs.writeFile(path.resolve(__dirname, 'userData.txt'), '', (err) => {
  if (err) console.log(err);
});

stdout.write('Для выхода напиши exit или сочетание клавиш ctr + c \n');
stdout.write('Введите текст' + '\n' + '> ');

stdin.on('data', (data) => {
  const text = data.toString().trim();
  if (text === 'exit') sayExit();
  fs.appendFile(path.resolve(__dirname, 'userData.txt'), text + '\n', (err) => {
    if (err) console.log(err);
    stdout.write('> ');
  });
});

function sayExit() {
  stdout.write('\ngood bye ;) \n');
  exit();
}

process.on('SIGINT', sayExit);