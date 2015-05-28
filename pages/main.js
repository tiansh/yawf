var browser = function () {
  var ua = navigator.userAgent;
  // Internet Explorer
  if (ua.match(/^Mozilla\/[\d.]+ \(compatible; MSIE [\d.]+; Windows NT[^)]*\)$/)) return 'ie';
  if (ua.match(/^Mozilla\/5.0 \(Windows NT [\d.]+;( [^)]+;)? Trident\/[\d.]+;( [^)]+;)? rv:[\d.]+\) like Gecko$/)) return 'ie';
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+ Edge\/[\d.]+$/)) return 'ie';

  // Mozilla Firefox
  if (ua.match(/^Mozilla\/5.0 \([^)]+; rv:[\d.]+\) Gecko\/[\d]{8} Firefox\/[\d.]+$/)) return 'firefox';

  // Safari
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Version\/[\d.]+ Safari\/[\d.]+$/)) return 'safari';

  // Chromium; Chromium on Windows, other version may have different UA
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chromium\/[\d.]+ Chrome\/[\d.]+ Safari\/[\d.]+$/)) return 'chromium';

  // Google Chrome
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+$/)) return 'chrome';

  // Opera; Opera 12 is not supported
  // if (ua.match(/^Opera\/[\d.]+ \([^)]+\) Presto\/[\d.]+ Version\/[\d.]+$/)) return 'opera';
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+ OPR\/[\d.]+$/)) return 'opera';
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ Safari\/[\d.]+ OPR\/[\d.]+ \(Edition beta\)$/)) return 'opera';

  // Yandex.Browser; same as Opera since it use add-ons from Opera
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ YaBrowser\/[\d.]+ (\(.*\) )?Safari\/[\d.]+$/)) return 'opera';
  if (ua.match(/^Mozilla\/5.0 \([^)]+\) AppleWebKit\/[\d.+]+ \(KHTML, like Gecko\) Chrome\/[\d.]+ YaBrowser\/[\d.]+ (\(.*\) )?Yowser\/[\d.]+ Safari\/[\d.]+$/)) return 'opera';

  if (ua.match(/AppleWebKit/)) return 'odd';

  return 'unknow';
};

var browserCss = function () {
  return '<style> .' + browser() + ' { display: block; } </style>';
};

var gennav = function () {
  if (!document.querySelector || !document.querySelectorAll) return;
  var nav = document.querySelector('nav');
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
