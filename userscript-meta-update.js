// NodeJS
const fs = require('fs');

const update = function (callback) {
  const files = fs.readdirSync('.');
  const script = '.user.js', meta = '.meta.js';
  const metaFile = function (filename) {
    return filename.slice(0, filename.length - script.length) + meta;
  };
  // regexp copied from https://github.com/greasemonkey/greasemonkey/blob/master/modules/parseScript.js
  const gAllMetaRegexp = new RegExp('^(\u00EF\u00BB\u00BF)?// ==UserScript==([\\s\\S]*?)^// ==/UserScript==', 'm');
  const gLineSplitRegexp = /.+/g;
  const gMetaLineRegexp = new RegExp('// @([^\\s:]+)(?::([a-zA-Z-]+))?(?:\\s+(.*))?');
  files.filter(function (filename) {
    if (filename.indexOf(script, filename.length - script.length) === -1) return false;
    if (files.indexOf(metaFile(filename)) === -1) console.log('File %s not found and created', metaFile(filename));
    return true;
  }).forEach(function (filename) {
    const content = String(fs.readFileSync(filename));
    const match = content.match(gAllMetaRegexp);
    if (!match) console.warn('Failed to parse header of %s', filename);
    const header = match[0];
    fs.writeFile(metaFile(filename), header);
    if (callback) {
      var meta = match[2].replace(/^\s+/, '');
      meta = meta.match(gLineSplitRegexp).map(function (metaLine) {
        var match = metaLine.match(gMetaLineRegexp);
        if (!match) return null;
        return { 'header': match[1], 'locale': match[2], 'value': match[3] };
      }).filter(function (x) { return x !== null; });
      callback(filename, content, meta);
    }
  });
};

if (require.main === module) {
  update();
} else {
  exports.update = update;
}
