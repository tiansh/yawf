// GM_* stub
(function (root) {
  var GM_values = {}, addstyle = document.querySelector('#addstyle');
  root.GM_xmlhttpRequest = function () { };
  root.GM_setValue = function (k, v) { GM_values[k] = JSON.parse(JSON.stringify(v)); };
  root.GM_getValue = function (k, v) { return k in GM_values ? GM_values[k] : v; };
  root.GM_deleteValue = function (k) { delete GM_values[k]; };
  root.GM_addStyle = function (t) { addstyle.textContent += '\n' + t; };
  root.GM_registerMenuCommand = function () { }
  root.GM_info = {}
  root.unsafeWindow = window;
}(this))

// CONFIG stub
$CONFIG = { 'uid': '3921589057', 'nick': 'tsh90' };

// show all functions
function showAll() {
  GM_addStyle('.no-allfunc { display: none; }');
  var userscript = document.createElement('script');
  userscript.src = document.querySelector('#install').href;
  userscript.onload = function () {
    util.init(function () {
      var layer = document.querySelector('#output');
      var confs = filter.collection.item.list(function (item) { return 'version' in item; });
      confs.show(layer);
      GM_addStyle(util.str.cmt(function () { /*!CSS
        .allfunc { display: block; }
        #output { padding-left: 2em; }
        #output input[type=checkbox], #output input[type=text], #output .yawf-configSelectAll, #output form label ~ *, #output form label br, #output ul, #output .yawf-range-container, #output textarea, #output .yawf-configImportExport, #output .yawf-groupRemark, #output a { display: none; }
        #output .yawf-groupSubtitle { font-weight: bold; text-indent: -2em; }
        #output .yawf-configString span { line-height: normal; margin: auto; }
        #output div div { display: inline; } #output div div::before { content: "  "; }
      */ }));
    }, util.priority.LAST * 2);
  };
  document.body.appendChild(userscript);
};
