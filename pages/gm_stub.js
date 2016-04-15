// GM_* stub
(function (root) {
  var GM_values = {}, addstyle = document.querySelector('#addstyle');
  root.GM_xmlhttpRequest = function () { };
  root.GM_setValue = function (k, v) { GM_values[k] = JSON.parse(JSON.stringify(v)); };
  root.GM_getValue = function (k, v) { return k in GM_values ? GM_values[k] : v; };
  root.GM_deleteValue = function (k) { delete GM_values[k]; };
  root.GM_addStyle = function (t) { addstyle.textContent += '\n' + t; };
  root.GM_registerMenuCommand = function () { };
  root.GM_info = {};
  root.unsafeWindow = window;
}(this));

// CONFIG stub
$CONFIG = { 'uid': '3921589057', 'nick': 'tsh90' };

GM_setValue('whatsnew', 'false');
GM_setValue('user3921589057config', '{"weibo._yawf_version":1e10}');
