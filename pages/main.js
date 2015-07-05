var cmpver = function (x, y) {
  var mx = x.match(/^([\d\.]*)(.*)$/), my = y.match(/^([\d\.]*)(.*)$/);
  var nx = mx[1], ny = my[1], px = mx[2], py = my[2];
  nx = nx.split('.').map(Number); ny = ny.split('.').map(Number);
  for (var i = 0, l = Math.max(nx.length, ny.length); i < l; i++) {
    if ((nx[i] || 0) < (ny[i] || 0)) return -1;
    if ((nx[i] || 0) > (ny[i] || 0)) return 1;
  }
  if (px === py) return 0;
  if (px === '') return 1;
  if (py === '') return -1;
  if (px > py) return 1;
  if (px < py) return -1;
  return 0;
};

var browser = function () {
  var ua = navigator.userAgent;
  var ualist = [
    // Internet Explorer
    { 'reg': /^Mozilla\/[\d.]+ \(compatible; MSIE ([\d.]+); Windows NT[^)]*\)$/, 'browser': 'ie', 'version': 1 },
    { 'reg': /^Mozilla\/5.0 \(Windows NT [\d.]+;( [^)]+;)? Trident\/[\d.]+;( [^)]+;)? rv:([\d.]+)\) like Gecko$/, 'browser': 'ie', 'version': 3 },
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+ Edge\/([\d.]+)$/, 'browser': 'ie', 'version': 1 },
    // Mozilla Firefox
    { 'reg': /^Mozilla\/5.0 \([^)]+; rv:[\d.]+\) Gecko\/[\d]{8} Firefox\/([\d.]+)$/, 'browser': 'firefox', 'version': 1 },
    // Safari
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Version\/([\d.]+) Safari\/[\d.]+$/, 'browser': 'safari', 'version': 1 },
    // Chromium; Chromium on Windows, other version may have different UA
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chromium\/([\d.]+) Chrome\/[\d.]+ Safari\/[\d.]+$/, 'browser': 'chromium', 'version': 1 },
    // Google Chrome
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/([\d.]+) Safari\/[\d.]+$/, 'browser': 'chrome', 'version': 1 },
    // Opera
    { 'reg': /^Opera\/[\d.]+ \([^)]+\) Presto\/[\d.]+ Version\/([\d.]+)$/, 'browser': 'opera', 'version': 1 },
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+ OPR\/([\d.]+)$/, 'browser': 'opera', 'version': 1 },
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+ OPR\/([\d.]+) \(Edition beta\)$/, 'browser': 'opera', 'version': 1 },
    // Yandex.Browser; same as Opera since it use add-ons from Opera
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ YaBrowser\/([\d.]+) (\(.*\) )?Safari\/[\d.]+$/, 'browser': 'yandex', 'version': 1 },
    { 'reg': /^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ YaBrowser\/([\d.]+) (\(.*\) )?Yowser\/[\d.]+ Safari\/[\d.]+$/, 'browser': 'yandex', 'version': 1 },
    // Other
    { 'reg': /AppleWebKit/, 'browser': 'odd', 'version': 0 },
    { 'reg': /(:?)/, 'browser': 'unknow', 'version': 0 },
  ];

  var req = {
    'firefox': '20', // 火狐低于 20 将会出现兼容问题， 20 未经测试仅有用户报告可以使用
    'chrome': '43', // 酷容 42 不会有什么问题，设置最少 43 只是为了过滤掉其他浏览器
    'opera': '15', // 欧鹏 12 因为没有 MutationObserver ，所以程序不能用
  };

  for (var i = 0; i < ualist.length; i++) {
    var tester = ualist[i];
    var matcher = ua.match(tester.reg);
    if (matcher) break;
  }

  var version = tester.version ? matcher[tester.version] : (void 0);
  if (tester.browser in req && (!version || cmpver(version, req[tester.browser]) === -1)) return 'odd';

  if (tester.browser === 'yandex') return 'opera';
  return tester.browser;
};

var browserCss = function () {
  return '<style> .' + browser() + ' { display: block; } </style>';
};

var gennav = function () {
  if (!document.querySelector || !document.querySelectorAll) return;
  var nav = document.querySelector('.tol');
  var article = document.querySelector('article'); if (!article) return;
  var h = article.querySelectorAll('h2, h3, h4, h5, h6, h7');
  var level = [null, nav];
  var merge = function () {
    var li = level[level.length - 1];
    var dest = level[level.length - 2];
    if (dest.firstChild && dest.lastChild === dest.firstChild)
      dest.appendChild(document.createElement('ul'));
    (dest.lastChild || dest).appendChild(li);
    level.length--;
  };
  [].slice.call(h, 0).forEach(function (hi) {
    var text = hi.textContent;
    var anchor = document.createElement('a');
    anchor.className = 'anchor'; anchor.textContent = '\u00a7';
    anchor.id = text; anchor.href = '#' + anchor.id;
    hi.insertBefore(anchor, hi.firstChild);
    if (!nav) return;
    var l = Number(hi.tagName[1]);
    while (level.length > l) merge(); level[l] = document.createElement('li');
    var link = document.createElement('a');
    link.textContent = text; link.href = anchor.href;
    level[l].appendChild(link);
  });
  if (nav) while (level.length > 2) merge();
};

var set_lang = function () {
  var lang_select = document.getElementById('lang_select'); if (!lang_select) return;
  lang_select.onchange = function () {
    location.href = {
      'zh-cn': 'https://tiansh.github.io/yawf/zh-cn.html',
      'zh-tw': 'https://tiansh.github.io/yawf/zh-tw.html',
      'zh-hk': 'https://tiansh.github.io/yawf/zh-hk.html',
      'en': 'https://tiansh.github.io/yawf/en.html',
    }[lang_select.value] || '#';
  };
};

window.onload = function () {
  set_lang();
  gennav();
};
