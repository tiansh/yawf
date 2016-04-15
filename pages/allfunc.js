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
}
