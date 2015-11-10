const fs = require('fs');
const cssmin = require('cssmin');
const compressor = require('yuicompressor');

const gAllMetaRegexp = new RegExp('^(\u00EF\u00BB\u00BF)?// ==UserScript==([\\s\\S]*?)^// ==/UserScript==', 'm');

const genminify = function (callback) {
  // return callback(); // disabled minified version generation, since minify a user script is useless.
  const content = String(fs.readFileSync('Yet_Another_Weibo_Filter.user.js'));
  const header = content.match(gAllMetaRegexp)[0];
  const cmt2str = content.replace(/util\.str\.cmt\(function \(\) { \/\*!(CSS)?((\r|\n|.)*?)\*\/ }\)/mg, function (x, y, z) {
    if (y && y.toLowerCase() === 'css')
    return JSON.stringify(cssmin(z.replace(/(\r\n|\r|\n)\s*\/\/.*(\r\n|\r|\n)/g, '\n')));
    else return JSON.stringify(z.trim());
  });
  const minheader = header.replace(/(Yet_Another_Weibo_Filter\.)((user|meta)\.js)/g, '$1min.$2').replace(/\r\n|\r|\n/g, '\n');

  compressor.compress(cmt2str, { 'charset': 'utf8' }, function(err, data, extra) {
    if (err) console.log(extra);
    else if (data) {
      var min = minheader + '\n' + data;
      fs.writeFileSync('Yet_Another_Weibo_Filter.min.user.js', min);
      if (callback) callback();
    }
  });
};

if (require.main === module) {
  genminify();
} else {
  exports.genminify = genminify;
}
