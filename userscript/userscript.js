const fs = require('fs');

const readScript = function readScript(filename) {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (error, data) => {
      if (error) { reject(error + ''); return; }
      const script = String(data).trimLeft();
      const meta = parseMeta(script);
      resolve({ script, meta });
    });
  });
};

const parseMeta = function readMeta(script) {
  const metaLineRe = /\/\/ @([^\s:]+(?::[a-zA-Z-]+)?)(?:\s+(.*))?/;
  const metaRe = /^\/\/ ==UserScript==([\s\S]*?)^\/\/ ==\/UserScript==/m;

  const metaMatch = script.match(metaRe);
  if (!metaMatch) return null;

  const result = {};
  let full = result.full = metaMatch[0];
  let lines = result.lines = metaMatch[1].match(/.+/g);
  let details = result.details = new Map();

  result.lines.forEach(function readLine(line) {
    let lineMatch = line.match(metaLineRe);
    if (lineMatch) {
      let key = lineMatch[1], value = lineMatch[2];
      details.set(key, (details.get(key) || []).concat([value]));
    }
  });

  return result;
};

exports.readScript = readScript;
exports.parseMeta = parseMeta;
