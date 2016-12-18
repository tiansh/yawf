const fs = require('fs');
const userscript = require('./userscript/userscript');

const writeFile = function (filename, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, (error) => {
      if (error) reject(error); else resolve();
    });
  });
};

const updateHTMLVersion = function (targetFile, version) {
  return new Promise((resolve, reject) => {
    fs.readFile(targetFile, (error, data) => {
      if (error) { reject(); return; }
      let content = String(data);
      let newContent = content.replace(
        /<!--\s*VER\s*-->.*<!--\s*\/VER\s*-->/g,
        '<!-- VER -->' + version + '<!-- /VER -->'
      );
      writeFile(targetFile, newContent).then(resolve).catch(reject);
    });
  });
};

const updateMetaFile = function (targetFile, meta) {
  return writeFile(targetFile, meta);
};

; (function () {
  let inputFolder = `../userscripts`;
  let outputFolder = `../pages`;
  let scriptName = 'Yet_Another_Weibo_Filter';
  new Promise((resolve, reject) => {
    userscript.readScript(`${inputFolder}/${scriptName}.user.js`).then(({script, meta}) => {
      if (!meta || !(meta.details.get('version') || []).length) {
        reject('failed to parse userscript file'); return;
      }
      let version = meta.details.get('version')[0];
      Promise.all([
        writeFile(`${outputFolder}/${scriptName}.user.js`, script),
        writeFile(`${outputFolder}/${scriptName}.meta.js`, meta.full),
        ...([
          'en',
          'zh-cn',
          'zh-hk',
          'zh-tw',
        ].map(lang => updateHTMLVersion(`${outputFolder}/${lang}.html`, version)))
      ]).then(resolve).catch(reject);
    }).catch(reject);
  }).catch(error => { console.error(error); process.exit(1); });
}());