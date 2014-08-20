// NodeJS
const fs = require('fs');
const updateMeta = require('./userscript-meta-update.js');

const updateHTMLVersion = function (html, version) {
  fs.readFile(html, function (error, content) {
    if (error) console.warn('Error while reading file %s: %o', html, error);
    else {
      content = String(content).replace(
        /<!--\s*VER\s*-->.*<!--\s*\/VER\s*-->/g,
        '<!-- VER -->' + version + '<!-- /VER -->'
      );
      fs.writeFile(html, content);
    }
  });
};

updateMeta.update(function (filename, content, meta) {
  const version = function (meta) {
    var ver = null;
    meta.forEach(function (item) {
      if (item.header === 'version' && !item.locale) ver = item.value;
    });
    return ver;
  };
  ['zh-cn.html', 'zh-hk.html', 'zh-tw.html', 'en.html'].forEach(function (html) {
    updateHTMLVersion(html, version(meta));
  });
});
