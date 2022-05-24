const fs = require('fs/promises');
const path = require('path');

const templateHtml = path.resolve(__dirname, 'template.html');
const components = path.resolve(__dirname, 'components');
const stylesDir = path.resolve(__dirname, 'styles');
const assetsDir = path.resolve(__dirname, 'assets');

try {
  fs.mkdir(path.resolve(__dirname, 'project-dist'), {recursive: true}, (err) => {
    if (err) throw err;
  });
  fs.mkdir(path.resolve(__dirname, 'project-dist', 'assets'), {recursive: true}, (err) => {
    if (err) throw err;
  });
  const dirDist = path.resolve(__dirname, 'project-dist');
  const assetsDist = path.resolve(dirDist, 'assets');

  (async () => {
    let template = await fs.readFile(templateHtml, 'utf-8');
    const files = await fs.readdir(components);
    for (const file of files) {
      const component = await fs.readFile(path.resolve(components, file), 'utf-8');
      template = template.replace(`{{${file.split('.')[0]}}}`, component);
    }
    fs.writeFile(path.resolve(dirDist, 'index.html'), template, (err) => {
      if (err) throw err;
    });
    console.log('index.html created');
  })();

  (async () => {
    const styles = await fs.readdir(stylesDir);
    const styleFile = path.resolve(dirDist, 'style.css');
    await fs.writeFile(path.resolve(styleFile), '');
    for (const style of styles) {
      if (path.extname(style) !== '.css') continue;
      await fs.appendFile(styleFile, await fs.readFile(path.resolve(stylesDir, style).trim(), 'utf-8'));
    }
    console.log('style.css created');
  })();

  (async () => {
    await fs.rm(path.resolve(__dirname, 'project-dist', 'assets'), { recursive: true, force: true });

    const assets = await fs.readdir(assetsDir);
    for (const a of assets) {
      const pathFile = path.resolve(assetsDir, a);
      const infoFile = await fs.stat(assetsDir, a);
      if (infoFile.isDirectory()) {
        await fs.mkdir(path.resolve(assetsDist, a), {recursive: true});
        const files = await fs.readdir(pathFile);
        for (const file of files) {
          await fs.copyFile(path.resolve(pathFile, file), path.resolve(assetsDist, a, file));
        }
      }
    }
    console.log('copy files done');
  })();
} catch (err) {
  console.log(err);
}
