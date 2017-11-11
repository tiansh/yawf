// ==UserScript==
// @name              Yet Another Weibo Filter
// @name:zh-CN        Yet Another Weibo Filter 看真正想看的微博
// @name:zh-HK        Yet Another Weibo Filter 看真正想看的微博
// @name:zh-TW        Yet Another Weibo Filter 看真正想看的微博
// @name:en           Yet Another Weibo Filter
// @namespace         https://github.com/tiansh
// @description       新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。 filter Sina Weibo by keywords, authors, topics, sources, etc.; modify layout
// @description:zh-CN 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。
// @description:zh-HK 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。
// @description:zh-TW 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。
// @description:en    filter Sina Weibo by keywords, authors, topics, sources, etc.; modify layout
// @include           http://www.weibo.com/*
// @include           http://weibo.com/*
// @include           http://d.weibo.com/*
// @include           http://s.weibo.com/*
// @include           https://www.weibo.com/*
// @include           https://weibo.com/*
// @include           https://d.weibo.com/*
// @include           https://s.weibo.com/*
// @exclude           http://weibo.com/a/bind/*
// @exclude           http://weibo.com/nguide/*
// @exclude           http://weibo.com/
// @exclude           https://weibo.com/a/bind/*
// @exclude           https://weibo.com/nguide/*
// @exclude           https://weibo.com/
// @version           3.7.461
// @icon              data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUxpcemNSemNSemNSemNSemNSemNSemNSemNSemNSdktOumNSemNSemNSemNSemNSemNSdktOtktOtktOtktOtktOtktOtktOtktOtktOtktOtktOtktOumNSdktOsZoAhUAAAAddFJOUwAgkIAQ4MBAYPBA0KAwcLBQ0BBgIHDggDCw8JDAT2c6pQAAAiFJREFUWMPNl9lywyAMRcMOMQa7SdMV//9nNk4nqRcJhOvOVI9+OJbE5UocDn8VrBNRp3so7YWRGzBWJSAa3lZyfMLCVbF4ykVjye1JhVB2j4S+UR0FpBMhNCuDEilcKIIcjZSi3KO0W6cKUghUUHL5nktHJqW8EGz6fyTmr7dW82DGK8+MEb7ZSALYNiIkU20uMoDu4tq9jKrZYnlSACS/zYSBvnfb/HztM05uI611FjfOmNb9XgMIqSk01phgDTTR2gqBm/j4rfJdqU+K2lHHWf7ssJTM+ozFvMSG1iVV9FbmKAfXEjxDUC6KQTyDZ7KWNaAZyRLabUiOqAj3BB8lLZoSWJvA56LEUuoqty2BqZLDShJodQzZpdCba8ytH53HrXUu77K9RqyrvNaV5ptFQGRy/X78CQKpQday6zEM0+jfXl5XpAjXNmuSXoDGuHycM9tOB/Mh0DVecCcTiHBh0NA/Yfu3Rk4BAS1ICgIZEmjokS3V1YKGZ+QeV4MuTzuBpin5X4F6sEdNPWh41CbB4+/IoCP0b14nSBwUYB9R1aAWfgJpEoiBq4dbWCcBNPm5QEa7IJ3az9YwWazD0mpRzvt64Zsu6HE5XlDQ2/wREbW36EAeW0e5IsWXdMyBzhWgkAH1NU9ydqD5UWlDuKlrY2UzudsMqC+OYL5wBAT0eSql9ChOyxxoTOpUqm4Upb6ra8jE5bXiuTNk47QXiE76AnacIlJf1W5ZAAAAAElFTkSuQmCC
// @updateURL         https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.meta.js
// @downloadURL       https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.user.js
// @homepageURL       https://tiansh.github.io/yawf/
// @supportURL        https://github.com/tiansh/yawf/issues
// @author            田生 http://weibo.com/tsh90
// @copyright         田生; The MIT License
// @license           MIT; https://opensource.org/licenses/MIT
// @compatible        firefox 推荐
// @compatible        opera   支持
// @compatible        chrome  支持
// @compatible        safari  基本支持
// @grant             GM_xmlhttpRequest
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_deleteValue
// @grant             GM_addStyle
// @grant             GM_registerMenuCommand
// @grant             GM_info
// @grant             GM_openInTab
// @grant             unsafeWindow
// @connect           weibo.com
// @connect           www.weibo.com
// @connect           s.weibo.com
// @connect           video.weibo.com
// @connect           t.cn
// @connect           www.miaopai.com
// @connect           ent.v.sina.cn
// @connect           sinaimg.cn
// @run-at            document-start
// ==/UserScript==

// 解决 GM_addStyle 的一些兼容问题
if (!function testAddStyle() {
  try {
    var style = GM_addStyle(':root{}');
    if (!style) return false;
    if (style.parentNode) style.parentNode.removeChild(style);
    return true;
  } catch (e) {
    return false;
  }
}()) GM_addStyle = (function () {
  var addStyleQueue = [];
  (function addStyles() {
    if (!document.head) return setTimeout(addStyles, 16);
    addStyleQueue.splice(0).forEach(function (style) {
      document.head.appendChild(style);
    });
    addStyleQueue = null;
  }());
  return function (str) {
    var style = document.createElement('style');
    style.textContent = str;
    if (addStyleQueue) addStyleQueue.push(style);
    else document.head.appendChild(style);
    return style;
  };
}());

// 字体
var fonts = {
  'iconfont': '@font-face { font-family: "yawf-iconfont"; font-style: normal; font-weight: normal; src: url("data:image/woff;base64,d09GRk9UVE8AAAPIAAoAAAAABbQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANUAAADot8EQFkZGVE0AAAHMAAAAGgAAABxtAw0mT1MvMgAAAegAAABJAAAAYFmdYldjbWFwAAACNAAAADgAAAFCAA0DAGhlYWQAAAJsAAAAMAAAADYD5a1oaGhlYQAAApwAAAAdAAAAJAaAA4BobXR4AAACvAAAAAgAAAAICAAAd21heHAAAALEAAAABgAAAAYAAlAAbmFtZQAAAswAAADkAAAB1Hh5OPRwb3N0AAADsAAAABYAAAAg/4YAM3icVY2xagJBFADfO+9O1GNNJBcLFwWxPLUXAumvDekPQUmjTYjYCNbP0sLO+Ak2NsLWfkN+ZN/ebiTaBG6qqWYQfB8QUSyzxaT/MZ7PJvPZJ6AHCC/c8liWuOlvImxXofL1PiT6l6isa7aZt00SSFjVJcCDhPWjBCHhpwHePSGgVQgXLzdG4CF230hxqlApc1El9ZwP+HgdhMqtYk7NxaVlkVdMEn+T3bkeuY7dE3HH7rgX8PD3NT7oc6gzfXJT0pk9kT0HIt8+UbzYm4RCiqp/hZJWXgAAAHicY2BgYGQAgjO2i86D6AtJW7VhNABKVQagAAB4nGNgZmFg/MLAysDBNJPpDAMDQz+EZnzNYMzIycDAxMAGJKGAkQEJBKS5pjA4MEQyRDLr/NdhiGGawdCMUAPkKQAhIwBYTwumAAAAeJxjYGBgZoBgGQZGBhCwAfIYwXwWBgUgzQKEIH7k//8Q8v8KqEoGRjYGGJP6gGYGUxcAAJgrBwx4nGNgZGBgAOK+F//94vltvjJwszCAwIWkrdpwuvx/LXMX0wwgl4OBCSQKAFMCC7x4nGNgZGBgmvG/liGGhQEEmLsYGBlQARMAU6MDCAAAAAQAAAAEAAB3AABQAAACAAB4nJWPwWoCMRCGv+gqihV6KB7EQ85ClmTxJL12n0C8i+zKXjawCuKLeOn79EH6BH2ETnSglFJoA0m+mf+fzAR44IohLcOUhXKPEc/KfZa8KmfieVceMDEj5SFT48VpsrFk5reqxD0epfrOfTa8KGfieVMeMONDecjcPHFhx5kaR8OeSCuczhNcdufaNfvY1rGV8If+JZWaSnfHgQpLQY6Xey379yZ3PbASLYjfSZ2/xZTydBm7Q2WL3Nu1/TaOxGHlgneFD+L9+y+2MlzHUXxJT63TmGyr7tjE1obc/+O1T5RwTOJ4nGNgZgCD/80MRkCKkQENAAAoVQG5AAA=") format("woff"); }',
};

// 文本常量
// 请以简体中文为原文，参考这些资料翻译
// http://zh.wikipedia.org/wiki/Template:CGroup/IT
// http://www.microsoft.com/Language/zh-cn/Search.aspx
// 翻译时优先考虑微博网页中的翻译，网页中未翻译或表意不明时用括号加注。如果该内容不对应微博网页中的元素，可以自由发挥
// 符号“|”分割多个输入框的响应区域，“||”会同时换行，“{{<name>}}”可以嵌入一个输入框；翻译应保证输入框一一对应
var text = {
  // 基本按钮
  'okButtonTitle': { 'zh-cn': '确定', 'zh-hk': '確定', 'zh-tw': '確定', 'en': 'Confirm' },
  'cancelButtonTitle': { 'zh-cn': '取消', 'zh-hk': '取消', 'zh-tw': '取消', 'en': 'Cancel' },
  'closeButtonTitle': { 'zh-cn': '关闭', 'zh-hk': '關閉', 'zh-tw': '關閉', 'en': 'Close' },
  'configStringsAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'configUsersAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'disabledKey': { 'zh-cn': '(已禁用)', 'zh-hk': '(已停用)', 'zh-tw': '(已停用)', 'en': '(Disabled)' },
  'indent': { 'zh-cn': '　　', 'zh-hk': '　　', 'zh-tw': '　　', 'en': '　　' },
  // 时间日期
  'timeToday': { 'zh-cn': '今天', 'zh-hk': '今天', 'zh-tw': '今天', 'en': 'Today' /* as is */ },
  'timeSecondBefore': { 'zh-cn': '秒前', 'zh-hk': '秒前', 'zh-tw': '秒前', 'en': ' secs ago' /* as is */ },
  'timeMinuteBefore': { 'zh-cn': '分钟前', 'zh-hk': '分鐘前', 'zh-tw': '分鐘前', 'en': ' mins ago' /* as is */ },
  'timeMonthDay': { 'zh-cn': '%s月%s日 %s:%s', 'zh-hk': '%s月%s日 %s:%s', 'zh-tw': '%s月%s日 %s:%s', 'en': '%s-%s %s:%s' /* as is */ },
  'timeReadHere': { 'zh-cn': '你看到这里', 'zh-hk': '你看到這裡', 'zh-tw': '你看到這裡', 'en': ' you see here' /* as is */ },
  // 设置框
  'filter': { 'zh-cn': '过滤器', 'zh-hk': '篩選器', 'zh-tw': '篩選器', 'en': 'Filter' },
  'filterMenuItem': { 'zh-cn': '过滤器设置', 'zh-hk': '篩選器設定', 'zh-tw': '篩選器設定', 'en': 'Filter Settings' },
  'configDialogTitle': { 'zh-cn': '过滤器设置 - Yet Another Weibo Filter', 'zh-hk': '篩選器設定 - Yet Another Weibo Filter', 'zh-tw': '篩選器設定 - Yet Another Weibo Filter', 'en': 'Filter Settings - Yet Another Weibo Filter' },
  'whitelistFilterDesc': { 'zh-cn': '总是显示{{{typed}}}', 'zh-hk': '總是顯示{{{typed}}}', 'zh-tw': '總是顯示{{{typed}}}', 'en': 'Always show {{{typed}}}' },
  'blacklistFilterDesc': { 'zh-cn': '隐藏{{{typed}}}', 'zh-hk': '隱藏{{{typed}}}', 'zh-tw': '隱藏{{{typed}}}', 'en': 'Hide {{{typed}}}' },
  'foldlistFilterDesc': { 'zh-cn': '折叠{{{typed}}}', 'zh-hk': '折疊{{{typed}}}', 'zh-tw': '折疊{{{typed}}}', 'en': 'Fold {{{typed}}}' },
  'whitelistActionDesc': { 'zh-cn': '显示', 'zh-hk': '顯示', 'zh-tw': '顯示', 'en': 'Show' },
  'blacklistActionDesc': { 'zh-cn': '隐藏', 'zh-hk': '隱藏', 'zh-tw': '隱藏', 'en': 'Hide' },
  'foldlistActionDesc': { 'zh-cn': '折叠', 'zh-hk': '折疊', 'zh-tw': '折疊', 'en': 'Fold' },
  // 右键菜单
  'contextMenuCreateLabel': { 'zh-cn': '创建过滤器', 'zh-hk': '創建篩選器', 'zh-tw': '創建篩選器', 'en': 'Create Filter' },
  // 微博过滤
  'baseFilterGroupTitle': { 'zh-cn': '微博过滤', 'zh-hk': '微博篩選', 'zh-tw': '微博篩選', 'en': 'Weibo Filter' },
  // 微博
  'loadWeiboTitle': { 'zh-cn': '微博', 'zh-hk': '微博', 'zh-tw': '微博', 'en': 'Weibo' },
  'loadWeiboBySearch': { 'zh-cn': '使用搜索代替首页以恢复正常首页顺序{{<i>}}', 'zh-hk': '使用檢索代替首頁以恢復正常首頁順序{{<i>}}', 'zh-tw': '使用檢索代替首頁以恢復正常首頁順序{{<i>}}', 'en': 'Use search on home page for better order of Weibo' },
  'loadWeiboBySearchDesc': {
    'zh-cn': '如果您的首页上微博排序混乱，以致无法正常使用微博，请尝试打开此功能。<strong>打开此功能会导致您微博中设置的屏蔽规则失效，您需要将会员中设置的屏蔽规则在脚本中再隐藏一遍。</strong>'
  },
  'loadWeiboBySearchWarnTitle': {
    'zh-cn': '使用搜索代替首页'
  },
  'loadWeiboBySearchWarn': {
    'zh-cn': '本功能利用搜索页不支持“智能排序”的特点，在您访问首页时自动跳转到搜索结果页，因此本功能的正常工作完全受制于微博搜索功能。<br />如果您打开后无法正常浏览微博，请考虑关闭此功能。<br />点击查看<a href="https://tiansh.github.io/yawf/fqa.html#%E5%85%B3%E4%BA%8E%E4%BD%BF%E7%94%A8%E6%90%9C%E7%B4%A2%E4%BB%A3%E6%9B%BF%E9%A6%96%E9%A1%B5%E5%8A%9F%E8%83%BD">关于本功能的详细说明</a><br />确实要打开本功能吗？'
  },
  // 脚本
  'scriptToolsTitle': { 'zh-cn': '脚本', 'zh-hk': '腳本', 'zh-tw': '腳本', 'en': 'Script' },
  'useFastCreator': { 'zh-cn': '使用拖放快速创建过滤器{{<i>}}', 'zh-hk': '使用拖放快速創建篩選器{{<i>}}', 'zh-tw': '使用拖放快速創建篩選器{{<i>}}', 'en': 'Use drag and drop to create filters{{<i>}}' },
  'useFastCreatorDesc': {
    'zh-cn': '您可以使用鼠标拖拽微博中的文字、帐号、话题、来源等，网页右上角会显示一个黄色的区域，拖拽到其上释放可创建过滤器。',
  },
  'useContextMenuCreator': { 'zh-cn': '使用右键菜单快速创建过滤器{{<i>}}', 'zh-hk': '使用右鍵功能表快速創建篩選器{{<i>}}', 'zh-tw': '使用右鍵功能表快速創建篩選器{{<i>}}', 'en': 'Use right-click menu to create filters{{<i>}}' },
  'useContextMenuCreatorDesc': {
    'zh-cn': '在微博上点右键，您可以在浏览器原有的菜单中找到“创建过滤器”的菜单，点选即可快速创建过滤器。',
  },
  'refilterAfterRuleEdited': { 'zh-cn': '修改规则后自动重新过滤微博{{<i>}}', 'zh-hk': '修改規則後自動重新過濾微博{{<i>}}', 'zh-tw': '修改規則後自動重新過濾微博{{<i>}}', 'en': 'Refilter Weibo after rule changed {{<i>}}' },
  'refilterAfterRuleEditedDesc': {
    'zh-cn': '开启该选项后，当您修改过滤规则时，脚本会重新对现有的微博过滤。但已被隐藏的微博，因为已经被移除，在刷新前不会再被显示出来。'
  },
  'fastBlockButton': { 'zh-cn': '在每条微博右上角添加屏蔽微博按钮{{<i>}}', 'zh-hk': '在每條微博右上角添加屏蔽微博按鈕{{<i>}}', 'zh-tw': '在每條微博右上角添加屏蔽微博按鈕{{<i>}}', 'en': 'Add "Block" buttons on right top of Weibo {{<i>}}' },
  'fastBlockButtonDesc': {
    'zh-cn': '在每条微博右上角添加一个屏蔽微博按钮，点击即可屏蔽这条微博。'
  },
  'hideThisWeibo': { 'zh-cn': '隐藏', 'zh-hk': '隱藏', 'zh-tw': '隱藏', 'en': 'Hide'/* as is */ },
  'blockHiddenWeiboDesc': { 'zh-cn': '屏蔽被隐藏的微博{{<i>}}', 'zh-hk': '屏蔽被隱藏的微博{{<i>}}', 'zh-tw': '屏蔽被隱藏的微博{{<i>}}', 'en': 'Block hidded Weibo {{<i>}}' },
  'blockHiddenWeiboDescDesc': {
    'zh-cn': '开启该选项后，脚本会自动帮您点击被隐藏微博右上角下拉菜单中的“屏蔽这条微博”。这样即便您刷新页面或使用移动设备登录微博，也不会再看到这些微博。由于该屏蔽操作是不可逆的，所以如果您在测试一些过滤规则时，请谨慎开启。',
  },
  'disableLazyLoad': { 'zh-cn': '禁用首页微博延迟加载{{<i>}}', 'zh-hk': '禁用首頁微博延遲載入{{<i>}}', 'zh-tw': '禁用首頁微博延遲載入{{<i>}}', 'en': 'Disable Weibo lazy load on home page {{<i>}}' },
  'disableLazyLoadDesc': {
    'zh-cn': '如果您因为隐藏了过多的微博，首页打开后看到的微博太少，您可以打开该功能一次性显示更多微博。'
  },
  // 自动载入
  'autoLoadNewWeiboTitle': { 'zh-cn': '自动载入新微博', 'zh-hk': '自動載入新微博', 'zh-tw': '自動載入新微博', 'en': 'New Weibo Auto Load' },
  'autoLoadNewWeibo': { 'zh-cn': '自动载入新微博', 'zh-hk': '自動載入新微博', 'zh-tw': '自動載入新微博', 'en': 'New Weibo Auto Load' },
  'autoLoadNewWeiboDesc': {
    'zh-cn': '启用该选项可以在显示“有×条新微博”的提示横幅出现前过滤微博，避免提示不希望看到的新微博；但勾选此项会导致在其他移动设备上收不到有新微博的提示。',
  },
  'newWeiboNotify': { 'zh-cn': '有 {{count}} 条新微博，点击查看', 'zh-hk': '有{{count}}條新微博，點擊查看', 'zh-tw': '有{{count}}條新微博，點擊查看', 'en': '{{count}} new Weibo' },
  // 分组浏览
  'otherGroupTitle': { 'zh-cn': '分组浏览', 'zh-hk': '分組流覽', 'zh-tw': '分組流覽', 'en': 'Browse by Group' },
  'accountByGroup': { 'zh-cn': '分组浏览时禁用按帐号隐藏', 'zh-hk': '分組流覽時禁用按帳號隱藏', 'zh-tw': '分組流覽時禁用按帳號隱藏', 'en': 'Disable hide by account filter when browsing by group' },
  'sameAccountByGroup': { 'zh-cn': '浏览分组时禁用相同作者数量限制', 'zh-hk': '流覽分組時禁用相同作者數量限制', 'zh-tw': '流覽分組時禁用相同作者數量限制', 'en': 'Disable hide too many Weibo from same account filter when browsing by group' },
  // 自动展开
  'autoExpand': {
    'zh-cn': '自动载入后直接展开显示{{<i>}}||{{<etypes>}}仅对白名单的微博自动展开显示||{{<background>}}页面处于活动状态时暂停',
    'zh-hk': '自動載入後直接展開顯示{{<i>}}||{{<etypes>}}僅對白名單的微博自動展開顯示||{{<background>}}頁面處於活動狀態時暫停',
    'zh-tw': '自動載入後直接展開顯示{{<i>}}||{{<etypes>}}僅對白名單的微博自動展開顯示||{{<background>}}頁面處於活動狀態時暫停',
    'en': 'Expand Weibo after auto load {{<i>}}|| {{<etypes>}} Only auto expand whitelist Weibo || {{<background>}} Pause when page actived',
  },
  'autoExpandDesc': {
    'zh-cn': '需要启用“[[base.autoload.auto_load_new_weibo]]”功能才会生效。在载入后可以直接将微博显示出来而不是在微博列表顶部显示有新微博的提示横幅。',
  },
  'autoExpandAll': { 'zh-cn': '所有新微博', 'zh-hk': '所有新微博', 'zh-tw': '所有新微博', 'en': 'all new Weibo' },
  'autoExpandWhite': { 'zh-cn': '白名单微博', 'zh-hk': '白名單微博', 'zh-tw': '白名單微博', 'en': 'whitelist Weibo' },
  // 桌面提示
  'desktopNotification': {
    'zh-cn': '载入新微博后显示桌面提示{{<i>}}||{{<types>}}仅对白名单的微博显示桌面提示||{{<shorten>}}桌面提示仅显示|前{{<shortlen>}}字符摘要信息||{{<autohide>}}桌面提醒延时自动关闭|显示{{<duration>}}毫秒|＋字数×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'zh-hk': '载入新微博后顯示桌面提示{{<i>}}||{{<types>}}僅對白名單的微博顯示桌面提示||{{<shorten>}}桌面提示僅顯示|前{{<shortlen>}}字元摘要資訊||{{<autohide>}}桌面提醒延時自動關閉|顯示{{<duration>}}毫秒|＋字數×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'zh-tw': '载入新微博后顯示桌面提示{{<i>}}||{{<types>}}僅對白名單的微博顯示桌面提示||{{<shorten>}}桌面提示僅顯示|前{{<shortlen>}}字元摘要資訊||{{<autohide>}}桌面提醒延時自動關閉|顯示{{<duration>}}毫秒|＋字數×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'en': 'Show desktop notification after auto load {{<i>}}|| {{<types>}} Only show desktop notification for whitelist Weibo || {{<shorten>}} Desktop notification only show | first {{<shortlen>}} characters Weibo content || {{<autohide>}} auto hide desktop notification after | {{<duration>}}ms | + {{<durationc>}}ms/char || {{<ntypes>}} Use webkitNotifications instead of Notification',
  },
  'desktopNotificationDesc': {
    'zh-cn': '需要启用“[[base.autoload.auto_load_new_weibo]]”功能才会生效。在载入后，无论浏览器是否被最小化都可以在屏幕右下角弹出包含新微博内容的提示，方便您第一时间了解新收到的微博。',
  },
  'desktopNotificationDisallowedTitle': { 'zh-cn': '桌面提示被阻止', 'zh-hk': '桌面提示被阻止', 'zh-tw': '桌面提示被阻止', 'en': 'Desktop Notification Disallowed' },
  'desktopNotificationDisallowed': {
    'zh-cn': '您的浏览器阻止了桌面提示。请按照如下步骤解除阻止：<br />右击网页—查看页面信息—权限—显示通知—允许<br />此外，如果您安装了 Tab notifier 等扩展，请到扩展的设置中允许显示桌面提示。',
    'zh-hk': '您的流覽器阻止了桌面提示。請按照如下步驟解除阻止：<br />右擊網頁—檢視頁面資訊—權限—顯示通知—允許<br />此外，如果您安裝了 Tab notifier 等擴充套件，請到擴充套件的設置中允許顯示桌面提示。',
    'zh-tw': '您的流覽器阻止了桌面提示。請按照如下步驟解除阻止：<br />右擊網頁—檢視頁面資訊—權限—顯示通知—允許<br />此外，如果您安裝了 Tab notifier 等擴充套件，請到擴充套件的設置中允許顯示桌面提示。',
    'en': 'Your browser blocked desktop notifications. Please follow the instruction to unblock: <br />Right click webpage - View Page Info - Permission - Notifications - Allow. You should also check settings of extensions, if you installed extensions like Tab notifier.',
  },
  'autoCloseWarning': {
    'zh-cn': '43版以前的火狐浏览器提供的 Notification 会强制显示 4 秒后关闭，如果您希望显示较长时间，请考虑使用 Tab notifier 等扩展提供的 webkitNotifications。',
    'zh-hk': '43版以前的火狐流覽器提供的 Notification 會強制顯示 4 秒後關閉，如果您希望顯示較長時間，請考慮使用 Tab notifier 等擴充套件提供的 webkitNotifications。',
    'zh-tw': '43版以前的火狐流覽器提供的 Notification 會強制顯示 4 秒後關閉，如果您希望顯示較長時間，請考慮使用 Tab notifier 等擴充套件提供的 webkitNotifications。',
    'en': 'Notification provided by Firefox (version <= 43) will be mandatorily closed with 4 seconds delay after shown. You may need to use webkitNotifications provided by add-ons like Tab notifier for longer notification display.',
  },
  // 搜索
  'searchNotFound': { 'zh-cn': '未找到与您输入匹配的设置项', 'zh-hk': '未找到與您輸入匹配的設置項', 'zh-tw': '未找到與您輸入匹配的設置項', 'en': 'No Matched Settings' },
  // 内容
  'contentFilterGroupTitle': { 'zh-cn': '内容', 'zh-hk': '內容', 'zh-tw': '內容', 'en': 'Content' },
  // 关键词
  'keywordFilterDesc': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword' },
  'keywordFilterDetails': { 'zh-cn': '包含以下关键词的微博', 'zh-hk': '包含以下關鍵字的微博', 'zh-tw': '包含以下關鍵字的微博', 'en': 'Weibo with these keywords' },
  'keywordFilterDetailsDesc': {
    'zh-cn': '关键词仅匹配微博正文，包括原微博和转发的描述。如果您希望某条微博同时出现某几个关键字时才过滤，请使用正则表达式的过滤方式。',
  },
  'keywordFilterFast': { 'zh-cn': '微博包含关键词', 'zh-hk': '微博包含關鍵字', 'zh-tw': '微博包含關鍵字', 'en': 'Weibo contains keyword ' },
  'keywordFilterFastInput': { 'zh-cn': '“{{text}}”', 'zh-hk': '「{{text}}」', 'zh-tw': '「{{text}}」', 'en': '"{{text}}"' },
  'keywordFilterReason': { 'zh-cn': '因包含关键词“{{detail}}”', 'zh-hk': '因包含關鍵詞「{{detail}}」', 'zh-tw': '因包含關鍵詞「{{detail}}」', 'en': 'because it contains keyword "{{detail}}"' },
  // 正则表达式
  'regexpFilterGroupTitle': { 'zh-cn': '正则', 'zh-hk': '正則', 'zh-tw': '正規', 'en': 'Regexp' },
  'regexpFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'regexpFilterDetails': { 'zh-cn': '匹配以下正则表达式的微博', 'zh-hk': '匹配以下正則表達式的微博', 'zh-tw': '匹配以下正規表示式的微博', 'en': 'Weibo matches these regular expressions' },
  'regexpFilterDetailsDesc': {
    'zh-cn': '正则表达式书写时不需要对“/”字符转义。正则表达式不同于“通配符”，您需要使用“<code>.*</code>”表示任意字符，如“<code>转发并.*好友</code>”。如果您希望匹配同时出现某些关键词的微博，您可以用<code>^(?=[\s\S]*星座)(?=[\s\S]*第一)</code>”匹配所有同时出现“星座”和“第一”的微博。您可以参考<a href="https://tiansh.github.io/yawf/regexp.html" target="_blank">用于过滤微博的正则表达式快速入门</a>查看更多示例写法。',
  },
  'regexpFilterFast': { 'zh-cn': '微博匹配正则式', 'zh-hk': '微博匹配正則式', 'zh-tw': '微博匹配正規式', 'en': 'Weibo matches regexp ' },
  'regexpFilterFastInput': { 'zh-cn': '/{{text}}/', 'zh-hk': '/{{text}}/', 'zh-tw': '/{{text}}/', 'en': '/{{text}}/' },
  'regexpFilterReason': { 'zh-cn': '因匹配正则式 {{detail}} ', 'zh-hk': '因匹配正則式 {{detail}} ', 'zh-tw': '因匹配正規式 {{detail}} ', 'en': 'because it matches regexp {{detail}} ' },
  'regexpBadFormedTitle': { 'zh-cn': '非法的正则表达式', 'zh-hk': '不合法的正則表達式', 'zh-tw': '不合法的正規表示式', 'en': 'Illegal Regexp' },
  'regexpBadFormed': {
    'zh-cn': '您输入的/{{regexp}}/不能被正确地解析为正则表达式，请检查您的输入。如需关键词屏蔽请到内容标签页设置。',
    'zh-hk': '您輸入的/{{regexp}}/不能被正確地解析為正則表達式，請檢查您的輸入。如需關鍵詞屏蔽請到內容標籤頁面設置。',
    'zh-tw': '您輸入的/{{regexp}}/不能被正確地解析為正規表示式，請檢查您的輸入。如需關鍵詞屏蔽請到內容標籤頁面設置。',
    'en': 'Cannot parse /{{regexp}}/ as regexp. Please check your input. You may hide Weibo by keywords in Content tab page.'
  },
  // 其他元素
  'contentTypesTitle': { 'zh-cn': '将以下元素同样作为内容处理', 'zh-hk': '將以下元素同樣作為內容處理', 'zh-tw': '將以下元素同樣作為內容處理', 'en': 'Handle these elements as content' },
  'contentTypesMention': { 'zh-cn': '提到某人', 'zh-hk': '提到某人', 'zh-tw': '提到某人', 'en': 'Mention' },
  'contentTypesStock': { 'zh-cn': '股票链接', 'zh-hk': '股票連結', 'zh-tw': '股票連結', 'en': 'Stock link' },
  'contentTypesTopic': { 'zh-cn': '话题标题', 'zh-hk': '話題標題', 'zh-tw': '話題標題', 'en': 'Topic' },
  'contentTypesLinkt': { 'zh-cn': '链接标题', 'zh-hk': '連結標題', 'zh-tw': '連結標題', 'en': 'Link Title' },
  'contentTypesLinku': { 'zh-cn': '链接地址', 'zh-hk': '連結位址', 'zh-tw': '連結位址', 'en': 'Link target URL' },
  'contentTypesEmotion': { 'zh-cn': '表情备注', 'zh-hk': '表情備註', 'zh-tw': '表情備註', 'en': 'Remark of emotion' },
  // 帐号
  'accountFilterGroupTitle': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountFilterDetails': { 'zh-cn': '来自以下帐号的所有微博', 'zh-hk': '來自以下帳號的所有微博', 'zh-tw': '來自以下帳號的所有微博', 'en': 'All Weibo from these accounts' },
  'accountFilterDetailsDesc': {
    'zh-cn': '你关注的某个人撰写或转发的微博。对于转发的微博，仅匹配最后转发的那个人。',
  },
  'accountFilterFast': { 'zh-cn': '作者是“@{{name}}”的所有微博', 'zh-hk': '作者是「@{{name}}」的所有微博', 'zh-tw': '作者是「@{{name}}」的所有微博', 'en': 'All Weibo by "@{{name}}"' },
  'accountFilterContextMenu': { 'zh-cn': '作者是 @{{name}}', 'zh-hk': '作者是 @{{name}}', 'zh-tw': '作者是 @{{name}}', 'en': 'by @{{name}}' },
  'accountFilterReason': { 'zh-cn': '因来自 @{{detail}} ', 'zh-hk': '因來自 @{{detail}} ', 'zh-tw': '因來自 @{{detail}} ', 'en': 'because it is posted by @{{detail}} ' },
  'accountNotExistErrorTitle': { 'zh-cn': '帐号不存在', 'zh-hk': '帳號不存在', 'zh-tw': '帳號不存在', 'en': 'Account does not exist' },
  'accountNotExistError': { 'zh-cn': '不存在名为“{{name}}”的帐号', 'zh-hk': '不存在名為「{{name}}」的帳號', 'zh-tw': '不存在名為「{{name}}」的帳號', 'en': 'Account named "{{name}}" does not exist' },
  // 某人的转发
  'accountfFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountfFilterDetails': { 'zh-cn': '来自以下帐号的转发微博', 'zh-hk': '來自以下帳號的转发微博', 'zh-tw': '來自以下帳號的转发微博', 'en': 'Forwarded Weibo from these accounts' },
  'accountfFilterDetailsDesc': {
    'zh-cn': '与“来自以下帐号的所有微博”功能类似，但不对此人的原创微博生效。',
    'zh-hk': '與“來自以下帳號的所有微博”功能類似，但不對此人的原創微博生效。',
    'zh-tw': '與“來自以下帳號的所有微博”功能類似，但不對此人的原創微博生效。',
    'en': 'Similar to "All Weibo from these accounts", but only works on forwarded Weibo.'
  },
  'accountfFilterFast': { 'zh-cn': '作者是“@{{name}}”的转发微博', 'zh-hk': '作者是「@{{name}}」的转发微博', 'zh-tw': '作者是「@{{name}}」的转发微博', 'en': 'Weibo by "@{{name}}"' },
  'accountfFilterContextMenu': { 'zh-cn': '由 @{{name}} 转发', 'zh-hk': '由 @{{name}} 轉發', 'zh-tw': '由 @{{name}} 轉發', 'en': 'forwarded by @{{name}}' },
  'accountfFilterReason': { 'zh-cn': '因来自 @{{detail}} ', 'zh-hk': '因來自 @{{detail}} ', 'zh-tw': '因來自 @{{detail}} ', 'en': 'because it is posted by @{{detail}} ' },
  // 原创
  'originalFilterGroupTitle': { 'zh-cn': '原创', 'zh-hk': '原創', 'zh-tw': '原創', 'en': 'Original' },
  'originalFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'originalFilterDetails': { 'zh-cn': '原创是以下帐号的微博', 'zh-hk': '原創是以下帳號的微博', 'zh-tw': '原創是以下帳號的微博', 'en': 'Weibo Originally from these accounts' },
  'originalFilterDetailsDesc': {
    'zh-cn': '如果一条微博是原创的（不是转发的）那么他的作者就是原创的作者，否则原创指这条微博最原始的作者。'
  },
  'originalFilterFast': { 'zh-cn': '原创是“@{{name}}”的微博', 'zh-hk': '原創是「@{{name}}」的微博', 'zh-tw': '原創是「@{{name}}」的微博', 'en': 'Original Weibo from "@{{name}}"' },
  'originalFilterContextMenu': { 'zh-cn': '原创是 @{{name}}', 'zh-hk': '原創是 @{{name}}', 'zh-tw': '原創是 @{{name}}', 'en': 'from @{{name}}' },
  'originalFilterReason': { 'zh-cn': '因转发自 @{{detail}} ', 'zh-hk': '因轉發自 @{{detail}} ', 'zh-tw': '因轉發自 @{{detail}} ', 'en': 'because it is forwarded from @{{detail}} ' },
  'actOnDiscoveryPage': { 'zh-cn': ' 按原创作者过滤的规则对发现页面的作者生效', 'zh-hk': '按原創作者過濾的規則對發現頁面的作者生效', 'zh-tw': '按原創作者過濾的規則對發現頁面的作者生效', 'en': 'Rules filter by original apply to authors in discovery page' },
  // 提到
  'mentionFilterGroupTitle': { 'zh-cn': '提到', 'zh-hk': '提到', 'zh-tw': '提到', 'en': 'Mention' },
  'mentionFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'mentionFilterDetails': { 'zh-cn': '提到以下帐号的微博', 'zh-hk': '提到以下帳號的微博', 'zh-tw': '提到以下帳號的微博', 'en': 'Weibo mentioned these accounts' },
  'mentionFilterDetailsDesc': {
    'zh-cn': '提到包括在微博中使用“@”提到的帐号，也包括转发路径中的那些帐号。微博中提到的人的链接不会随修改昵称而变化，这里也无法处理修改昵称的情况，所以如果一个人修改了昵称，您需要重新添加。'
  },
  'mentionFilterFast': { 'zh-cn': '提到了“@{{name}}”的微博', 'zh-hk': '提到了「@{{name}}」的微博', 'zh-tw': '提到了「@{{name}}」的微博', 'en': 'Weibo mentioned "@{{name}}"' },
  'mentionFilterContextMenuGroup': { 'zh-cn': '提到了', 'zh-hk': '提到了', 'zh-tw': '提到了', 'en': 'mentioned' },
  'mentionFilterContextMenu': { 'zh-cn': '@{{name}}', 'zh-hk': '@{{name}}', 'zh-tw': '@{{name}}', 'en': '@{{name}}' },
  'mentionFilterReason': { 'zh-cn': '因提到 @{{detail}} ', 'zh-hk': '因提到 @{{detail}} ', 'zh-tw': '因提到 @{{detail}} ', 'en': 'because it mentioned @{{detail}} ' },
  // 话题
  'topicFilterGroupTitle': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDesc': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDetails': { 'zh-cn': '包含以下话题的微博', 'zh-hk': '包含以下話題的微博', 'zh-tw': '包含以下話題的微博', 'en': 'Weibo with these topics' },
  'topicFilterDetailsDesc': {
    'zh-cn': '匹配提到了某个话题的微博，包括原文和转发的评论。话题使用全字匹配。'
  },
  'topicFilterFast': { 'zh-cn': '微博包含话题', 'zh-hk': '微博包含話題', 'zh-tw': '微博包含話題', 'en': 'Weibo contains topic ' },
  'topicFilterContextMenuGroup': { 'zh-cn': '包含话题', 'zh-hk': '包含話題', 'zh-tw': '包含話題', 'en': 'contains topic' },
  'topicFilterContextMenu': { 'zh-cn': '#{{topic}}#', 'zh-hk': '#{{topic}}#', 'zh-tw': '#{{topic}}#', 'en': '#{{topic}}#' },
  'topicFilterFastInput': { 'zh-cn': '“#{{topic}}#”', 'zh-hk': '「#{{topic}}#」', 'zh-tw': '「#{{topic}}#」', 'en': '"#{{topic}}#"' },
  'topicFilterReason': { 'zh-cn': '因包含话题 #{{detail}}# ', 'zh-hk': '因包含話題 #{{detail}}# ', 'zh-tw': '因包含話題 #{{detail}}# ', 'en': 'because it contained topic #{{detail}}# ' },
  'rtopicFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'rtopicFilterDetails': { 'zh-cn': '包含匹配以下正则表达式的话题的微博', 'zh-hk': '包含匹配以下正則表達式的話題的微博', 'zh-tw': '包含匹配以下正規表示式的话题的微博', 'en': 'Weibo with topic matches these regular expressions' },
  'rtopicFilterDetailsDesc': {
    'zh-cn': '使用正则式匹配微博中的话题，正则匹配时不需要匹配两侧的“#”。{{regexpFilterDetailsDesc}}'
  },
  'rtopicFilterFast': { 'zh-cn': '微博包含话题匹配', 'zh-hk': '微博包含話題匹配', 'zh-tw': '微博包含話題匹配', 'en': 'Weibo contains topic matches ' },
  'rtopicFilterFastInput': { 'zh-cn': '“#{{topic}}#”', 'zh-hk': '「#{{topic}}#」', 'zh-tw': '「#{{topic}}#」', 'en': '"#{{topic}}#"' },
  'rtopicFilterReason': { 'zh-cn': '因包含话题匹配 {{detail}} ', 'zh-hk': '因包含話題匹配 {{detail}} ', 'zh-tw': '因包含話題匹配 {{detail}} ', 'en': 'because it contained topic match {{detail}} ' },
  // 来源
  'sourceFilterGroupTitle': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'sourceFilterDesc': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'Come from' },
  'sourceFilterDetails': { 'zh-cn': '以下来源的微博', 'zh-hk': '以下來源的微博', 'zh-tw': '以下來源的微博', 'en': 'Weibo comes from these sources' },
  'sourceFilterDetailsDesc': {
    'zh-cn': '匹配微博下方“来自×××”的来源，不包括“自定义微博来源”中的文本。来源使用全字匹配。'
  },
  'sourceFilterFast': { 'zh-cn': '来自“{{source}}”的微博', 'zh-hk': '來自「{{source}}」的微博', 'zh-tw': '來自「{{source}}」的微博', 'en': 'Weibo comes from "{{source}}"' },
  'sourceFilterContextMenuGroup': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'Come from' },
  'sourceFilterContextMenu': { 'zh-cn': '{{source}}', 'zh-hk': '{{source}}', 'zh-tw': '{{source}}', 'en': '{{source}}' },
  'sourceFilterWarningTitle': { 'zh-cn': '默认来源', 'zh-hk': '預設來源', 'zh-tw': '預設來源', 'en': 'Default Source' },
  'sourceFilterWarning': { 'zh-cn': '不能添加默认来源', 'zh-hk': '不能新增預設來源', 'zh-tw': '不能新增預設來源', 'en': 'You cannot add default source' },
  'sourceFilterReason': { 'zh-cn': '因来自“{{detail}}”', 'zh-hk': '因來自「{{detail}}」', 'zh-tw': '因來自「{{detail}}」', 'en': 'because it comes from "{{detail}}" ' },
  'sourceUnkown': { 'zh-cn': '未通过审核应用', 'zh-hk': '未通过审核应用', 'zh-tw': '未通过审核应用', 'en': '未通过审核应用' },
  'defaultSource': { 'zh-cn': '微博 weibo.com', 'zh-hk': '微博 weibo.com', 'zh-tw': '微博 weibo.com', 'en': '微博 weibo.com' },
  // 超链接
  'hyperlinkFilterGroupTitle': { 'zh-cn': '链接', 'zh-hk': '連結', 'zh-tw': '連結', 'en': 'Link' },
  'hyperlinkFilterDesc': { 'zh-cn': '超链接', 'zh-hk': '超連結', 'zh-tw': '超連結', 'en': 'Hyperlink' },
  'hyperlinkFilterDetails': { 'zh-cn': '包含以下超链接的微博', 'zh-hk': '包含以下超連結的微博', 'zh-tw': '包含以下超連結的微博', 'en': 'Weibo with these hyperlinks' },
  'hyperlinkFilterDetailsDesc': {
    'zh-cn': '匹配微博的短链接，子串匹配。'
  },
  'hyperlinkFilterFast': { 'zh-cn': '包含链接到“{{url}}”地址链接的微博', 'zh-hk': '包含鏈接到「{{url}}」位址連結的微博', 'zh-tw': '包含鏈接到「{{url}}」位址連結的微博', 'en': 'Weibo contains hyperlink to "{{url}}"' },
  'hyperlinkFilterContextMenuGroup': { 'zh-cn': '链接到', 'zh-hk': '鏈接到', 'zh-tw': '鏈接到', 'en': 'hyperlink to' },
  'hyperlinkFilterContextMenu': { 'zh-cn': '{{url}}', 'zh-hk': '{{url}}', 'zh-tw': '{{url}}', 'en': '{{url}}' },
  'hyperlinkFilterReason': { 'zh-cn': '因链接到“{{detail}}”', 'zh-hk': '因連結到「{{detail}}」', 'zh-tw': '因連結到「{{detail}}」', 'en': 'because it contains hyperlink to "{{detail}}" ' },
  // 链接标题
  'linktitleFilterDesc': { 'zh-cn': '标题', 'zh-hk': '標題', 'zh-tw': '標題', 'en': 'Title' },
  'linktitleFilterDetails': { 'zh-cn': '链接标题匹配以下关键词的微博', 'zh-hk': '連結標題匹配以下關鍵字的微博', 'zh-tw': '連結標題匹配以下關鍵字的微博', 'en': 'Weibo with title of hyperlink contains keyword' },
  'linktitleFilterDetailsDesc': {
    'zh-cn': '匹配微博中出现的各种链接，包括网页链接，也包括视频、文章等等。匹配链接的标题。'
  },
  'linktitleFilterFast': { 'zh-cn': '微博链接标题', 'zh-hk': '微博連結標題', 'zh-tw': '微博連結標題', 'en': 'Weibo hyperlink with title' },
  'linktitleFilterFastInput': { 'zh-cn': '“{{title}}”', 'zh-hk': '「{{title}}」', 'zh-tw': '「{{title}}」', 'en': '"{{title}}"' },
  'linktitleFilterContextMenuGroup': { 'zh-cn': '链接标题', 'zh-hk': '連結標題', 'zh-tw': '連結標題', 'en': 'link title' },
  'linktitleFilterContextMenu': { 'zh-cn': '{{title}}', 'zh-hk': '{{title}}', 'zh-tw': '{{title}}', 'en': '{{title}}' },
  'linktitleFilterReason': { 'zh-cn': '因含有“{{detail}}”链接', 'zh-hk': '因含有「{{detail}}」連結', 'zh-tw': '因含有「{{detail}}」連結', 'en': 'because its hyperlink with title "{{detail}}" ' },
  // 更多
  'otherFilterGroupTitle': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  // 显示
  'otherWhitelistTitle': { 'zh-cn': '显示以下内容（不计入白名单）', 'zh-hk': '顯示以下內容（不計入白名單）', 'zh-tw': '顯示以下內容（不計入白名單）', 'en': 'Show following content (not regard as whitelist)' },
  'showMyWeiboDesc': { 'zh-cn': '自己的微博', 'zh-hk': '自己的微博', 'zh-tw': '自己的微博', 'en': 'Weibo by myself' },
  'showMyOriginalDesc': { 'zh-cn': '自己微博的转发', 'zh-hk': '自己微博的轉發', 'zh-tw': '自己微博的轉發', 'en': 'Forward of my Weibo' },
  'showMentionMeDesc': { 'zh-cn': '提到自己的微博', 'zh-hk': '提到自己的微博', 'zh-tw': '提到自己的微博', 'en': 'Weibo mentioned myself' },
  // 隐藏
  'otherBlacklistTitleAd': { 'zh-cn': '隐藏以下微博 - 广告/商品', 'zh-hk': '隱藏以下內容 - 廣告/商品', 'zh-tw': '隱藏以下內容 - 廣告/商品', 'en': 'Hide following content - Ad / Promotion' },
  'adfeedFilter': { 'zh-cn': '推广微博/粉丝通微博/品牌速递/好友赞过的微博{{<i>}}', 'zh-hk': '推廣微博/粉絲通微博/品牌速遞/好友贊過的微博{{<i>}}', 'zh-tw': '推廣微博/粉絲通微博/品牌速遞/好友贊過的微博{{<i>}}', 'en': 'Ad Weibo / Instered not followed Weibo {{<i>}}' },
  'adfeedFilterDesc': {
    'zh-cn': '推广微博一般出现在首页微博列表靠前的位置，并标记“推荐”字样。通过付费和新浪的审核，可以推广某条微博。微博会根据您的喜好随机将一些被推广的微博推荐给您。好友赞过的微博混在首页中间，并标记“某某赞过”。虽然这些微博出现在您的微博列表中，但它们往往不是您关注的人发的微博。',
  },
  'fansTopFilter': { 'zh-cn': '粉丝头条{{<i>}}', 'zh-hk': '粉丝头条{{<i>}}', 'zh-tw': '粉丝头条{{<i>}}'/* as is */, 'en': 'Fans top / Headline Weibo{{<i>}}' },
  'fansTopFilterDesc': {
    'zh-cn': '粉丝头条会显示在首页微博列表的顶端，一般标记“热门”等字样。粉丝头条是新浪微博官方的一项推广产品，使用粉丝头条的微博可在 24 小时内出现在所有微博粉丝首页的第一位。粉丝头条微博总是来自于您关注的人。',
  },
  'productCardWeibo': { 'zh-cn': '带有微博橱窗商品链接的微博{{<i>}}', 'zh-hk': '帶有微博櫥窗商品連接的微博{{<i>}}', 'zh-tw': '帶有微博櫥窗商品連接的微博{{<i>}}', 'en': 'Weibo with link to weibo shop {{<i>}}' },
  'productCardWeiboDesc': {
    'zh-cn': '带有微博橱窗商品链接的微博，点击链接可以到商品的购买页面。勾选以隐藏此类微博。',
  },
  'taobaoTianmaoWeibo': { 'zh-cn': '带有淘宝、天猫或聚划算商品的微博{{<i>}}', 'zh-hk': '帶有淘寶、天貓或聚划算商品的微博{{<i>}}', 'zh-tw': '帶有淘寶、天貓或聚划算商品的微博{{<i>}}', 'en': 'Weibo with Taobao / Tmall / Juhuasuan commodity{{<i>}}' },
  'taobaoTianmaoWeiboDesc': {
    'zh-cn': '带有<span class="W_btn_b W_btn_cardlink btn_22px"><span class="ico_spe"><i class="W_icon icon_cd_tb"></i></span><span class="W_autocut">淘宝商品</span></span>、<span class="W_btn_b W_btn_cardlink btn_22px"><span class="ico_spe"><i class="W_icon icon_cd_tmall"></i></span><span class="W_autocut">天猫商品</span></span>或<span class="W_btn_b W_btn_cardlink btn_22px"><span class="ico_spe"><i class="W_icon icon_cd_ju"></i></span><span class="W_autocut">聚划算商品</span></span>的微博',
  },
  'weiboPayGift': { 'zh-cn': '带有微博支付积分礼品兑换卡片的微博{{<i>}}', 'zh-hk': '帶有微博支付積分禮品兌換卡片的微博{{<i>}}', 'zh-tw': '帶有微博支付積分禮品兌換卡片的微博{{<i>}}', 'en': 'Weibo with Weibo pay with points gift exchange card{{<i>}}' },
  'weiboPayGiftDesc': {
    'zh-cn': '微博支付积分指通过在微博中消费（如购买会员）产生的积分，并非微博等级经验值，可以用于兑换礼品（礼品一般是优惠券或抽奖）。勾选本选项以隐藏带有此类兑换信息的卡片的微博。',
  },
  'fakeWeiboFilter': { 'zh-cn': '混入微博列表的推荐内容（好友推荐、热门话题）{{<i>}}', 'zh-hk': '混入微博列表的推薦內容（好友推薦、熱門話題）{{<i>}}', 'zh-tw': '混入微博列表的推薦內容（好友推薦、熱門話題）{{<i>}}', 'en': 'Other contents in Weibo list{{<i>}}' },
  'fakeWeiboFilterDesc': {
    'zh-cn': '所有在微博与微博之间混入的其他内容，这些内容往往不是微博消息，比如“好友推荐”“热门话题”等。',
  },
  'otherBlacklistTitleContent': { 'zh-cn': '隐藏以下微博 - 特定内容', 'zh-hk': '隱藏以下內容 - 特定內容', 'zh-tw': '隱藏以下內容 - 特定內容', 'en': 'Hide following content - Content ' },
  'deletedForwardFilter': { 'zh-cn': '已删除微博的转发{{<i>}}', 'zh-hk': '已刪除微博的轉發{{<i>}}', 'zh-tw': '已刪除微博的轉發{{<i>}}', 'en': 'Forward of deleted Weibo{{<i>}}' },
  'deletedForwardFilterDesc': {
    'zh-cn': '包括因为删除或对微博设置了隐私权限而使您无法看到原文的微博。这些微博您只能看见转发者的评论，但是无法看到原微博的内容。',
  },
  'commentAndForwardFilter': { 'zh-cn': '回复并转发的微博{{<i>}}', 'zh-hk': '回覆並轉發的微博{{<i>}}', 'zh-tw': '回覆並轉發的微博{{<i>}}', 'en': 'Weibo forwarded as reply{{<i>}}' },
  'commentAndForwardFilterDesc': {
    'zh-cn': '在回复他人微博时选择“同时转发到我的微博”会将回复和被回复的内容转发为一条微博，勾选后会隐藏回复时转发的微博。',
  },
  'voteWeiboFilter': { 'zh-cn': '投票微博{{<i>}}', 'zh-hk': '投票微博{{<i>}}', 'zh-tw': '投票微博{{<i>}}', 'en': 'Voting weibo{{<i>}}' },
  'voteWeiboFilterDesc': {
    'zh-cn': '包括在发布微博时选择投票的微博，也包括在投票时自动发出的微博。',
  },
  'redPackWeibo': { 'zh-cn': '抢红包微博{{<i>}}', 'zh-hk': '搶紅包微博', 'zh-tw': '搶紅包微博', 'en': 'Weibo with Red Envelopes Rush' },
  'redPackWeiboDesc': {
    'zh-cn': '抢红包活动自动发布的微博'
  },
  'appItemWeibo': { 'zh-cn': '介绍微博应用的微博{{<i>}}', 'zh-hk': '介紹微博應用的微博{{<i>}}', 'zh-tw': '介紹微博應用的微博{{<i>}}', 'en': 'Weibo with app item {{<i>}}' },
  'appItemWeiboDesc': {
    'zh-cn': '介绍微博应用的微博，包括含有微博应用的链接或含有微博应用的卡片的情况。微博应用的链接会以应用图标标记。勾选此项以隐藏此类微博。',
  },
  'wendaWeibo': { 'zh-cn': '微博问答相关的提问、回答或围观{{<i>}}', 'zh-hk': '微博問答相關的提問、回答或圍觀{{<i>}}', 'zh-tw': '微博問答相關的提問、回答或圍觀{{<i>}}', 'en': 'Weibo asking, answering, or viewing Weibo Q and A {{<i>}}' },
  'wendaWeiboDesc': {
    'zh-cn': '微博问答功能的提问、回答或围观都会发布一条新微博，如果您不希望看到相关微博，您可以勾选此选项以隐藏相关微博。'
  },
  'wenwoDrWeibo': { 'zh-cn': '含有爱问医生健康科普文章的微博{{<i>}}', 'zh-hk': '含有愛問醫生健康科普文章的微博{{<i>}}', 'zh-tw': '含有愛問醫生健康科普文章的微博{{<i>}}', 'en': 'Weibo with 爱问医生 (iask medical) artical {{<i>}}' },
  'wenwoDrWeiboDesc': {
    'zh-cn': '爱问医生健康科普文章是一些来自 wenwo.com 的健康、医疗相关文章。打开爱问医生健康科普文章的网站时，您可能会自动关注文章作者或相应帐号。开启以隐藏包含此类文章的微博。',
  },
  'yizhiboWeibo': { 'zh-cn': '含有“一直播”视频直播的微博|{{<type>}}', 'zh-hk': '含有「一直播」直播影片的微博|{{<type>}}', 'zh-tw': '含有「一直播」直播影片的微博|{{<type>}}', 'en': 'Weibo with live video on yizhibo | {{<type>}}' },
  'yizhiboWeiboAll': { 'zh-cn': '隐藏正在直播或已结束回放', 'zh-hk': '隱藏正在直播或已結束回放', 'zh-tw': '隱藏正在直播或已結束回放', 'en': 'hide live and replay' },
  'yizhiboWeiboReplay': { 'zh-cn': '仅隐藏已结束回放', 'zh-hk': '僅隱藏已結束回放', 'zh-tw': '僅隱藏已結束回放', 'en': 'hide replay only' },
  'stockWeibo': { 'zh-cn': '含有股票链接的微博{{<i>}}', 'zh-hk': '含有股票連結的微博{{<i>}}', 'zh-tw': '含有股票連結的微博{{<i>}}', 'en': 'Weibo with stock link {{<i>}}' },
  'stockWeiboDesc': {
    'zh-cn': '股票链接和话题相似，在发布框输入“$”即可添加股票链接。勾选以隐藏所有包含此类链接的微博。',
  },
  'otherBlacklistTitleSource': { 'zh-cn': '隐藏以下微博 - 特定来源', 'zh-hk': '隱藏以下內容 - 特定來源', 'zh-tw': '隱藏以下內容 - 特定來源', 'en': 'Hide following content - Source ' },
  'huatiSourceWeibo': { 'zh-cn': '来自微话题的微博{{<i>}}', 'zh-hk': '來自微話題的微博{{<i>}}', 'zh-tw': '來自微話題的微博{{<i>}}', 'en': 'Weibo comes from 微话题 (micro Topic){{<i>}}' },
  'huatiSourceWeiboDesc': {
    'zh-cn': '一些热门话题页面发布微博时会显示以“微话题”开头的来源',
  },
  'weiqunSourceWeibo': { 'zh-cn': '来自新浪微群的微博{{<i>}}', 'zh-hk': '來自新浪微群的微博{{<i>}}', 'zh-tw': '來自新浪微群的微博{{<i>}}', 'en': 'Weibo comes from 新浪微群 (micro Group) {{<i>}}' },
  'weiqunSourceWeiboDesc': {
    'zh-cn': '从新浪微群页面发布的微博，来源以“新浪微群 -”开头',
  },
  'fangtanSourceWeibo': { 'zh-cn': '来自微访谈的微博{{<i>}}', 'zh-hk': '來自微訪談的微博{{<i>}}', 'zh-tw': '來自微訪談的微博{{<i>}}', 'en': 'Weibo comes from 微访谈 (micro Talk){{<i>}}' },
  'fangtanSourceWeiboDesc': {
    'zh-cn': '使用微访谈发布的微博，来源以“微访谈 -”开头',
  },
  'gongyiSourceWeibo': { 'zh-cn': '来自微公益的微博{{<i>}}', 'zh-hk': '來自微公益的微博{{<i>}}', 'zh-tw': '來自微公益的微博{{<i>}}', 'en': 'Weibo comes from 微公益 (micro Welfare){{<i>}}' },
  'gongyiSourceWeiboDesc': {
    'zh-cn': '使用微公益发布的微博，来源以“微公益”开头',
  },
  'unauthappWeibo': { 'zh-cn': '来自未通过审核应用的微博{{<i>}}', 'zh-hk': '來自未通过审核应用的微博{{<i>}}', 'zh-tw': '來自未通过审核应用的微博{{<i>}}', 'en': 'Weibo comes from 未通过审核应用 (unauthorized application){{<i>}}' },
  'unauthappWeiboDesc': {
    'zh-cn': '未通过审核的应用有发布频率和可最多可授权15名用户的限制，除非您的好友中有人做相关的开发工作，否则您应当很难看到此来源的微博。来自未审核应用的微博往往是但开发微博应用过程中的测试微博。您可以通过微博开放平台文档中的<a target="_blank" href="//open.weibo.com/wiki/%E5%BA%94%E7%94%A8%E7%9B%B8%E5%85%B3%E9%97%AE%E9%A2%98">应用相关问题</a>页面了解更多关于应用的信息。',
  },
  'multiTopic': { 'zh-cn': '提到的话题|不少于{{<num>}}个的微博{{<i>}}', 'zh-hk': '提到的話題|不少於{{<num>}}個的微博{{<i>}}', 'zh-tw': '提到的話題|不少於{{<num>}}個的微博{{<i>}}', 'en': 'Weibo mentioned | not less than {{<num>}} topics{{<i>}}' },
  'multiTopicDesc': {
    'zh-cn': '由于新浪热门话题和话题主持人的相关政策，存在一些帐号通过罗列若干热门话题以使自己的广告可以显示在热门话题页面。您可以隐藏一次性提到了太多话题的微博以避免看到他们。',
  },
  'tooLongNeedUnfold': { 'zh-cn': '篇幅过长需要展开全文的微博{{<i>}}', 'zh-hk': '篇幅過長需要展開全文的微博{{<i>}}', 'zh-tw': '篇幅過長需要展開全文的微博{{<i>}}', 'en': 'Lengthy Weibo needs unfold to view{{<i>}}' },
  'tooLongNeedUnfoldDesc': {
    'zh-cn': '如果您打开了[[tool.weibotool.auto_unfold_weibo]]，脚本会先试图展开不是很长的微博。',
  },
  // 刷屏与版聊
  'otherSpammingTitle': { 'zh-cn': '刷屏与版聊', 'zh-hk': '洗版與版聊', 'zh-tw': '洗版與版聊', 'en': 'Spamming &amp; Chatting' },
  'sameAccountFilterDesc': { 'zh-cn': '相同作者的微博：|超过{{<number>}}条|时{{<action>}}', 'zh-hk': '相同作者的微博：|超過{{<number>}}條|時{{<action>}}', 'zh-tw': '相同作者的微博：|超過{{<number>}}條|時{{<action>}}', 'en': 'Weibo from same account: |{{<action>}} the part | which exceeds {{<number>}} Weibo' },
  'sameAccountFilterReason': { 'zh-cn': '因刷屏', 'zh-hk': '因洗版', 'zh-tw': '因洗版', 'en': 'because of spamming ' },
  'sameForwardFilterDesc': { 'zh-cn': '相同微博的转发：|超过{{<number>}}条|时{{<action>}}', 'zh-hk': '相同微博的轉發：|超過{{<number>}}條|時{{<action>}}', 'zh-tw': '相同微博的轉發：|超過{{<number>}}條|時{{<action>}}', 'en': 'Forward from same Weibo: |{{<action>}} the part | which exceeds {{<number>}} Weibo' },
  'sameForwardFilterReason': { 'zh-cn': '因版聊', 'zh-hk': '因版聊', 'zh-tw': '因版聊', 'en': 'because of chatting ' },
  // 评论过滤
  'commentFilterGroupTitle': { 'zh-cn': '评论过滤', 'zh-hk': '評論篩選', 'zh-tw': '評論篩選', 'en': 'Comment Filter' },
  // 评论关键词
  'ckeywordFilterDetails': { 'zh-cn': '包含以下关键词的评论', 'zh-hk': '包含以下關鍵字的評論', 'zh-tw': '包含以下關鍵字的評論', 'en': 'Comment with these comments' },
  'ckeywordFilterDetailsDesc': {
    'zh-cn': '关键词匹配包括话题，但不包括提到的用户。',
  },
  'ckeywordFilterDesc': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword ' },
  'ckeywordFilterFast': { 'zh-cn': '评论包含关键词', 'zh-hk': '評論包含關鍵字', 'zh-tw': '評論包含關鍵字', 'en': 'Comments contains keyword ' },
  'ckeywordFilterFastInput': { 'zh-cn': '“{{text}}”', 'zh-hk': '「{{text}}」', 'zh-tw': '「{{text}}」', 'en': '"{{text}}"' },
  // 评论正则表达式
  'cregexpFilterDetails': { 'zh-cn': '匹配以下正则表达式的评论', 'zh-hk': '匹配以下正則表達式的評論', 'zh-tw': '匹配以下正規表示式的評論', 'en': 'Comment matches these regular expressions' },
  'cregexpFilterDetailsDesc': {
    'zh-cn': '正则表达式匹配评论内容，方便匹配一些故意绕过关键词识别的评论。{{regexpFilterDetailsDesc}}',
  },
  'cregexpFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'cregexpFilterFast': { 'zh-cn': '评论匹配正则式', 'zh-hk': '評論匹配正則式', 'zh-tw': '評論匹配正規式', 'en': 'Comment matches regexp ' },
  'cregexpFilterFastInput': { 'zh-cn': '/{{text}}/', 'zh-hk': '/{{text}}/', 'zh-tw': '/{{text}}/', 'en': '/{{text}}/' },
  // 评论用户
  'cuserFilterDetails': { 'zh-cn': '以下帐号相关的评论', 'zh-hk': '以下帳號相關的評論', 'zh-tw': '以下帳號相關的評論', 'en': 'Comments mentioned these accounts' },
  'cuserFilterDetailsDesc': {
    'zh-cn': '匹配包括评论的作者，评论回复的帐号，以及评论提到的帐号。评论中提到的人的链接不会随修改昵称而变化，这里也无法处理修改昵称的情况，所以如果一个人修改了昵称，您需要重新添加。'
  },
  'cuserFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'cuserFilterFast': { 'zh-cn': '涉及到“@{{name}}”的评论', 'zh-hk': '涉及到「@{{name}}」的評論', 'zh-tw': '涉及到「@{{name}}」的評論', 'en': 'Comments about "@{{name}}"' },
  //  评论话题
  'ctopicFilterDetails': { 'zh-cn': '包含以下话题的评论', 'zh-hk': '包含以下話題的評論', 'zh-tw': '包含以下話題的評論', 'en': 'Comments with these topics' },
  'ctopicFilterDetailsDesc': {
    'zh-cn': '匹配提到了某个话题的评论。话题使用全字匹配。'
  },
  'ctopicFilterDesc': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'ctopicFilterFast': { 'zh-cn': '评论包含话题', 'zh-hk': '評論包含話題', 'zh-tw': '評論包含話題', 'en': 'Comments contains topic ' },
  'ctopicFilterFastInput': { 'zh-cn': '“#{{topic}}#”', 'zh-hk': '「#{{topic}}#」', 'zh-tw': '「#{{topic}}#」', 'en': '"#{{topic}}#"' },
  // 高级
  'commentOtherFilters': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  'commentMyDisplay': { 'zh-cn': '总是显示我自己发表的评论', 'zh-hk': '總是顯示我自己發表的評論', 'zh-tw': '總是顯示我自己發表的評論', 'en': 'Always show my comments' },
  'commentEmojiCountDesc': { 'zh-cn': '隐藏表情|数量超过{{<number>}}个的评论', 'zh-hk': '隱藏表情|數量超過{{<number>}}個的評論', 'zh-tw': '隱藏表情|數量超過{{<number>}}個的評論', 'en': 'Hide comments | with more than {{<number>}} emoji' },
  'commentEmojiTypesDesc': { 'zh-cn': '隐藏表情|种类超过{{<number>}}种的评论', 'zh-hk': '隱藏表情|種類超過{{<number>}}種的評論', 'zh-tw': '隱藏表情|種類超過{{<number>}}種的評論', 'en': 'Hide comments | with more than {{<number>}} kinds of emoji' },
  'commentWithOutContentDesc': { 'zh-cn': '隐藏没有内容的评论（只有表情、提到等）', 'zh-hk': '隱藏沒有內容的評論（只有表情、提到等）', 'zh-tw': '隱藏沒有內容的評論（只有表情、提到等）', 'en': 'Comments without any text content (only mentions and emoji)' },
  'commentWithForwardDesc': { 'zh-cn': '隐藏含有转发消息的微博', 'zh-hk': '隱藏含有轉發消息的微博', 'zh-tw': '隱藏含有轉發消息的微博', 'en': 'Comments contains forwarded messages' },
  'commentWithPicture': { 'zh-cn': '带有图片的评论|{{<act>}}', 'zh-hk': '帶有圖片的評論|{{<act>}}', 'zh-tw': '帶有圖片的評論|{{<act>}}', 'en': 'Comments with picture | {{<act>}}' },
  'commentWithPictureHide': { 'zh-cn': '隐藏评论', 'zh-hk': '隱藏評論', 'zh-tw': '隱藏評論', 'en': 'Hide comment' },
  'commentWithPictureFold': { 'zh-cn': '使用查看图片按钮替换缩略图', 'zh-hk': '使用查看圖片按鈕替換縮圖', 'zh-tw': '使用查看圖片按鈕替換縮圖', 'en': 'Replace thumbnail with "View Pictrue" button' },
  'deleteCommentHidden': { 'zh-cn': '如果权限允许自动删除被隐藏的评论{{<i>}}', 'zh-hk': '如果權限允許自動刪除被隱藏的評論{{<i>}}', 'zh-tw': '如果權限允許自動刪除被隱藏的評論{{<i>}}', 'en': 'Automatically delete hidden comments if permission allowed {{<i>}}' },
  'deleteCommentHiddenDesc': {
    'zh-cn': '请注意，打开该选项后，被您隐藏的且您有权限删除的评论都将被删除。这意味着其他人，包括发表这条评论的作者在内都不能再看到这条评论。而且如果您没有开启[[comment.otherc.my_comment]]，那么可能会自动删除您发出的评论。'
  },
  // 模块
  'layoutFilterGroupTitle': { 'zh-cn': '版面清理', 'zh-hk': '版面清理', 'zh-tw': '版面清理', 'en': 'Layout Cleanup' },
  // 标识图标
  'layoutHideIcon': { 'zh-cn': '隐藏模块 - 标识/图标', 'zh-hk': '隱藏模組 - 標誌/圖示', 'zh-tw': '隱藏模組 - 標誌/圖示', 'en': 'Hide modules - Logo / Icon' },
  'layoutHideIconLevel': { 'zh-cn': '等级', 'zh-hk': 'Level', 'zh-tw': '等級', 'en': 'Level' },
  'layoutHideIconMember': { 'zh-cn': '微博会员', 'zh-hk': '微博會員', 'zh-tw': '微博會員', 'en': 'Weibo VIP / Member' },
  'layoutHideIconApprove': { 'zh-cn': '个人认证', 'zh-hk': '個人認證', 'zh-tw': '個人認證', 'en': 'Personal Authentication / 個人認證' },
  'layoutHideIconApproveCo': { 'zh-cn': '机构认证', 'zh-hk': '企業認證', 'zh-tw': '企業認證', 'en': 'Weibo Verification / 企業認證' },
  'layoutHideIconApproveDead': { 'zh-cn': '失效认证', 'zh-hk': '失效認證', 'zh-tw': '失效認證', 'en': 'Failed verification' },
  'layoutHideIconClub': { 'zh-cn': '微博达人', 'zh-hk': '微博達人', 'zh-tw': '微博達人', 'en': 'Pioneer' },
  'layoutHideIconVGirl': { 'zh-cn': '微博女郎', 'zh-hk': '微博女郎', 'zh-tw': '微博女郎', 'en': 'Weibo girl' },
  'layoutHideIconSupervisor': { 'zh-cn': '微博监督员', 'zh-hk': '微博監督員', 'zh-tw': '微博監督員', 'en': 'Weibo Supervisor' },
  'layoutHideIconTaobao': { 'zh-cn': '淘宝/天猫商户', 'zh-hk': '淘寶/天貓商戶', 'zh-tw': '淘寶/天貓商戶', 'en': 'Taobao / Tmall Merchant' },
  'layoutHideIconCheng': { 'zh-cn': '阿里诚信通', 'zh-hk': '阿里誠信通', 'zh-tw': '阿里誠信通', 'en': 'Alibaba 诚信通' },
  'layoutHideIconGongyi': { 'zh-cn': '公益', 'zh-hk': '公益', 'zh-tw': '公益', 'en': 'public Interest' },
  'layoutHideIconZongyika': { 'zh-cn': '综艺', 'zh-hk': '综艺', 'zh-tw': '综艺', 'en': 'Variety' },
  'layoutHideIconYouji': { 'zh-cn': '旅行', 'zh-hk': '旅行', 'zh-tw': '旅行', 'en': 'Travel' },
  'layoutHideIconDouble11': { 'zh-cn': '双11', 'zh-hk': '双11', 'zh-tw': '双11', 'en': 'Nov. 11<sup>th</sup>' },
  'layoutHideIconNight': { 'zh-cn': '微博之夜', 'zh-hk': '微博之夜', 'zh-tw': '微博之夜', 'en': 'Weibo Night' },
  'layoutHideIconRedPack': { 'zh-cn': '红包', 'zh-hk': '红包', 'zh-tw': '红包', 'en': 'Red Pack' },
  'layoutHideIconRun': { 'zh-cn': '跑步', 'zh-hk': '跑步', 'zh-tw': '跑步', 'en': 'Run' },
  'layoutHideIconFoolsDay': { 'zh-cn': '愚人节', 'zh-hk': '愚人节', 'zh-tw': '愚人节', 'en': "Fools' Day" },
  'layoutHideIconHong': { 'zh-cn': '网红', 'zh-hk': '網紅', 'zh-tw': '網紅', 'en': 'Internet celebrity' },
  'layoutHideIconWedding': { 'zh-cn': '婚礼', 'zh-hk': '婚禮', 'zh-tw': '婚禮', 'en': 'Wedding' },
  'layoutHideIconOther': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  // 导航栏
  'layoutHideNav': { 'zh-cn': '隐藏模块 - 导航栏', 'zh-hk': '隱藏模組 - 導覽列', 'zh-tw': '隱藏模組 - 導覽列', 'en': 'Hide modules - Navigation Bar' },
  'layoutHideNavLogoImg': { 'zh-cn': '节日徽标', 'zh-hk': '節日徽標', 'zh-tw': '節日徽標', 'en': 'Holiday logo' },
  'layoutHideNavMain': { 'zh-cn': '首页', 'zh-hk': '首頁', 'zh-tw': '首頁', 'en': 'Home' },
  'layoutHideNavTV': { 'zh-cn': '视频', 'zh-hk': '视频', 'zh-tw': '视频', 'en': '视频 (Video)' },
  'layoutHideNavHot': { 'zh-cn': '发现', 'zh-hk': '发现', 'zh-tw': '发现', 'en': 'Discover' },
  'layoutHideNavGame': { 'zh-cn': '游戏', 'zh-hk': '遊戲', 'zh-tw': '遊戲', 'en': 'Game' },
  'layoutHideNavHotSearch': { 'zh-cn': '大家正在搜', 'zh-hk': '大家正在搜', 'zh-tw': '大家正在熱搜', 'en': 'Hot search' },
  'layoutHideNavHotSearchDesc': {
    'zh-cn': '建议使用ABP等扩展，添加规则“ <code>*://s.weibo.com/ajax/jsonp/gettopsug*</code> ”，以达到更好的效果。',
  },
  'searchBarPlaceholder': { 'zh-cn': '搜索微博、找人', 'zh-hk': '搜索微博、找人', 'zh-tw': '搜索微博、找人', 'en': 'Search for Weibo, People' },
  'layoutHideNavNoticeNew': { 'zh-cn': '新消息计数', 'zh-hk': '新消息計數', 'zh-tw': '新消息計數', 'en': 'Count for new notice' },
  'layoutHideNavNew': { 'zh-cn': '提示红点', 'zh-hk': '提示紅點', 'zh-tw': '提示紅點', 'en': 'Red dot tips' },
  'layoutHideNavHotTip': { 'zh-cn': '热门黄签提醒', 'zh-hk': '熱門黃簽提醒', 'zh-tw': '熱門黃簽提醒', 'en': 'Yellow tip for new hots' },
  // 左栏
  'layoutHideLeft': { 'zh-cn': '隐藏模块 - 左栏', 'zh-hk': '隱藏模組 - 左欄', 'zh-tw': '隱藏模組 - 左欄', 'en': 'Hide modules - Left Column' },
  'layoutHideLeftHome': { 'zh-cn': '首页', 'zh-hk': '首頁', 'zh-tw': '首頁', 'en': 'Home' },
  'layoutHideLeftFav': { 'zh-cn': '我的收藏', 'zh-hk': '我的收藏', 'zh-tw': '我的收藏', 'en': 'Favorite' },
  'layoutHideLeftLike': { 'zh-cn': '我的赞', 'zh-hk': '我的讚', 'zh-tw': '我的讚', 'en': 'Like' },
  'layoutHideLeftHot': { 'zh-cn': '热门微博', 'zh-hk': '熱門微博', 'zh-tw': '熱門微博', 'en': 'Hot Weibo' },
  'layoutHideLeftTV': { 'zh-cn': '热门视频', 'zh-hk': '熱門視頻', 'zh-tw': '熱門視頻', 'en': 'Hot Video' },
  'layoutHideLeftFriends': { 'zh-cn': '好友圈', 'zh-hk': '好友圈', 'zh-tw': '好友圈', 'en': 'Friends' },
  'layoutHideLeftGroupToMe': { 'zh-cn': '群微博', 'zh-hk': '群微博', 'zh-tw': '群微博', 'en': '群微博 (Group)' },
  'layoutHideLeftSpecial': { 'zh-cn': '特别关注', 'zh-hk': '特别關注', 'zh-tw': '特别關注', 'en': 'Special Focus' },
  'layoutHideLeftWhisper': { 'zh-cn': '悄悄关注', 'zh-hk': '悄悄關注', 'zh-tw': '悄悄關注', 'en': 'Secret Following' },
  'layoutHideLeftNew': { 'zh-cn': '新微博提示红点', 'zh-hk': '新微博提示紅點', 'zh-tw': '新微博提示紅點', 'en': 'Red dot for new Weibo' },
  'layoutHideLeftNews': { 'zh-cn': '新消息计数', 'zh-hk': '新消息計數', 'zh-tw': '新消息計數', 'en': 'Counts for News' },
  'layoutHideLeftCount': { 'zh-cn': '新分组微博计数', 'zh-hk': '新分組微博計數', 'zh-tw': '新分組微博計數', 'en': 'Counts for Weibo by Group' },
  // 中栏
  'layoutHideMiddle': { 'zh-cn': '隐藏模块 - 中栏', 'zh-hk': '隱藏模組 - 中欄', 'zh-tw': '隱藏模組 - 中欄', 'en': 'Hide modules - Middle Column' },
  'layoutHideMiddleRecommendedTopic': { 'zh-cn': '热门微博（发布框上方）', 'zh-hk': '热门微博（發布框上方）', 'zh-tw': '热门微博（發布框上方）'/* as is */, 'en': '热门微博 (Hot Weibo), on top of publisher' },
  'layoutHideMiddleFeedRecommand': { 'zh-cn': '微博兴趣推荐（顶部）', 'zh-hk': '微博興趣推薦（頂部）', 'zh-tw': '微博興趣推薦（頂部）', 'en': 'Feed Recommendation, top' },
  'layoutHideMiddleMemberTip': { 'zh-cn': '开通会员提示（底部）', 'zh-hk': '開通會員提示（底部）', 'zh-tw': '開通會員提示（底部）', 'en': 'Tip of Joining Weibo VIP, bottom' },
  // 右栏
  'layoutHideRight': { 'zh-cn': '隐藏模块 - 右栏', 'zh-hk': '隱藏模組 - 右欄', 'zh-tw': '隱藏模組 - 右欄', 'en': 'Hide modules - Right Column' },
  'layoutHideRightInfo': { 'zh-cn': '个人信息', 'zh-hk': '个人信息', 'zh-tw': '个人信息', 'en': 'Personal Info' },
  'layoutHideRightRecomMusicRank': { 'zh-cn': '榜单（新歌榜等）', 'zh-hk': '榜單（新歌榜等）', 'zh-tw': '榜單（新歌榜等）', 'en': 'Rank List (Song list, etc.)' },
  'layoutHideRightRecomMusicRankDesc': {
    'zh-cn': '包括“亚洲新歌榜实时趋势”“微博电影热议榜”“亚洲好书榜实时趋势”“主播红人榜”“亚洲动漫榜”等。'
  },
  'layoutHideRightHotTopic': { 'zh-cn': '热门话题', 'zh-hk': '熱門話題', 'zh-tw': '熱門話題', 'en': 'Hot Topic' },
  'layoutHideRightHotTopicExpand': { 'zh-cn': '热门话题中的话题描述', 'zh-hk': '熱門話題中的話題描述', 'zh-tw': '熱門話題中的話題描述', 'en': 'Topic description in Hot Topic' },
  'layoutHideRightGroups': { 'zh-cn': '分组成员列表', 'zh-hk': '分組成員列表', 'zh-tw': '分組成員列表', 'en': 'Members of group' },
  'layoutHideRightRecomGroupUser': { 'zh-cn': '建议加入该分组', 'zh-hk': '建議加入該分組', 'zh-tw': '建議加入該分組', 'en': 'Suggest to add to this group' },
  'layoutHideRightHongbaoRank': { 'zh-cn': '让红包飞', 'zh-hk': '讓紅包飛', 'zh-tw': '讓紅包飛', 'en': '让红包飞 (Red Envelope)' },
  'layoutHideRightInterest': { 'zh-cn': '可能感兴趣的人', 'zh-hk': '可能感興趣的人', 'zh-tw': '可能感興趣的人', 'en': 'You may know' },
  'layoutHideRightMovie': { 'zh-cn': '电影热评榜', 'zh-hk': '电影热评榜', 'zh-tw': '电影热评榜', 'en': '电影热评榜 (Hot Movie)' },
  'layoutHideRightAttFeed': { 'zh-cn': '好友关注动态', 'zh-hk': '好友关注动态', 'zh-tw': '好友关注动态', 'en': '好友关注动态 (Friends\' Attention)' },
  'layoutHideRightAttFeedDesc': {
    'zh-cn': '开启该隐藏选项只能让您自己不再看到“好友关注动态”模块，并不能阻止您出现在别人的“好友关注动态”中。'
  },
  'layoutHideRightMember': { 'zh-cn': '会员专区', 'zh-hk': '會員專區', 'zh-tw': '會員專區', 'en': 'Weibo VIP' },
  'layoutHideRightTaobaoMovie': { 'zh-cn': '淘宝&amp;微博 电影预售榜', 'zh-hk': '淘宝&amp;微博 电影预售榜', 'zh-tw': '淘宝&amp;微博 电影预售榜'/* as is */, 'en': '淘宝&amp;微博 电影预售榜 (Taobao Movie)' },
  'layoutHideRightNotice': { 'zh-cn': '公告栏', 'zh-hk': '公告欄', 'zh-tw': '公告欄', 'en': 'Bulletin Board' },
  // 微博内
  'layoutHideWeibo': { 'zh-cn': '隐藏模块 - 微博内', 'zh-hk': '隱藏模組 - 微博內', 'zh-tw': '隱藏模組 - 微博內', 'en': 'Hide modules - Weibo' },
  'layoutHideWeiboRecomFeed': { 'zh-cn': '精彩微博推荐', 'zh-hk': '精彩微博推薦', 'zh-tw': '精彩微博推薦', 'en': 'Weibo you may interested in' },
  'layoutHideWeiboFeedOuterTip': { 'zh-cn': '消息流提示横幅', 'zh-hk': '消息流提示橫幅', 'zh-tw': '消息流提示橫幅', 'en': 'Tips for feed' },
  'layoutHideWeiboFeedOuterTipDesc': {
    'zh-cn': '消息流内部的提示横幅，如“ 系统提示：根据你的屏蔽设置，系统已过滤掉部分微博。”等内容。'
  },
  'layoutHideWeiboFeedTip': { 'zh-cn': '评论框提示横幅', 'zh-hk': '評論框提示橫幅', 'zh-tw': '評論框提示橫幅', 'en': 'Tips for comment' },
  'layoutHideWeiboFeedTipDesc': {
    'zh-cn': '经常出现在评论框上方的横幅，通常包含如“微博社区管理中心举报处理大厅，欢迎查阅！”等内容。'
    // 英语界面横幅内容无翻译
  },
  'layoutHideWeiboGroupTip': { 'zh-cn': '顶部分组或好友圈提醒', 'zh-hk': '頂部分組或好友圈提醒', 'zh-tw': '頂部分組或好友圈提醒', 'en': 'Tips for Weibo for groups or friends' },
  'layoutHideWeiboVIPBackground': { 'zh-cn': '自定义卡片背景', 'zh-hk': '自訂卡片背景', 'zh-tw': '自訂卡片背景', 'en': 'Customized Card Background' },
  'layoutHideWeiboLastPic': { 'zh-cn': '图片列表封底', 'zh-hk': '圖片清單封底', 'zh-tw': '圖片清單封底', 'en': 'Back cover of picture list' },
  'layoutHideWeiboPicTag': { 'zh-cn': '图片标签', 'zh-hk': '圖片標籤', 'zh-tw': '圖片標籤', 'en': 'Tags for picture' },
  'layoutHideWeiboSonTitle': { 'zh-cn': '同源转发合并提示', 'zh-hk': '同源转发合并提示', 'zh-tw': '同源转发合并提示', 'en': '同源转发合并 (Merged forwards)' },
  'layoutHideWeiboCard': { 'zh-cn': '微博卡片', 'zh-hk': '微博卡片', 'zh-tw': '微博卡片', 'en': 'Weibo Cards' },
  'layoutHideWeiboCardDesc': {
    'zh-cn': '微博内对分享内容的摘要描述，如话题卡片、长微博卡片、分享内容卡片等。隐藏后您可以开启工具选项卡中的“[[tool.weibotool.card_button]]”功能，点击链接在当前页面直接显示长微博或被分享的视频等。',
  },
  'layoutHideWeiboArticalPay': { 'zh-cn': '微博打赏', 'zh-hk': '微博打赏', 'zh-tw': '微博打赏', 'en': '微博打赏 (Weibo Actical Pay)' },
  'layoutHideWeiboTag': { 'zh-cn': '微博标签', 'zh-hk': '微博標籤', 'zh-tw': '微博標籤', 'en': 'Tags for Weibo' },
  'layoutHideWeiboMovieTag': { 'zh-cn': '微博电影/话题', 'zh-hk': '微博電影/話題', 'zh-tw': '微博電影/話題', 'en': 'Weibo Movie / Topic' },
  'layoutHideWeiboMovieTagDesc': { 'zh-cn': '位于微博底部的根据微博正文内容的关键字自动生成的话题、电影等的链接。' },
  'layoutHideWeiboSource': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'layoutHideWeiboPop': { 'zh-cn': '阅读数和推广', 'zh-hk': '閱讀數和推廣', 'zh-tw': '閱讀數和推廣', 'en': 'Reading Count &amp; Promote' },
  'layoutHideWeiboLike': { 'zh-cn': '赞 - 微博', 'zh-hk': '讚 - 微博', 'zh-tw': '讚 - 微博', 'en': 'Like - Weibo' },
  'layoutHideWeiboLikeComment': { 'zh-cn': '赞 - 评论', 'zh-hk': '讚 - 評論', 'zh-tw': '讚 - 評論', 'en': 'Like - Comment' },
  'layoutHideWeiboForward': { 'zh-cn': '转发', 'zh-hk': '轉發', 'zh-tw': '轉發', 'en': 'Forward' },
  'layoutHideWeiboFavourite': { 'zh-cn': '收藏', 'zh-hk': '收藏', 'zh-tw': '收藏', 'en': 'Favourite' },
  'layoutHideWeiboPromoteOther': { 'zh-cn': '帮上头条', 'zh-hk': '帮上头条', 'zh-tw': '帮上头条', 'en': '帮上头条' },
  'layoutHideWeiboReport': { 'zh-cn': '举报', 'zh-hk': '舉報', 'zh-tw': '舉報/檢舉', 'en': 'Report' },
  'layoutHideWeiboUseCardBackground': { 'zh-cn': '使用此卡片背景', 'zh-hk': '使用此卡片背景', 'zh-tw': '使用此卡片背景', 'en': '使用此卡片背景' },
  // 个人主页
  'layoutHidePerson': { 'zh-cn': '隐藏模块 - 个人主页', 'zh-hk': '隱藏模組 - 個人主頁', 'zh-tw': '隱藏模組 - 個人主頁', 'en': 'Hide modules - Personal home page' },
  'layoutHidePersonMoveThings': { 'zh-cn': '移动部件（会员模板）', 'zh-hk': '移動部件（會員模板）', 'zh-tw': '移動部件（會員模板）', 'en': 'Moving Things (VIP Template)' },
  'layoutHidePersonCover': { 'zh-cn': '封面图', 'zh-hk': '封面圖', 'zh-tw': '封面圖', 'en': 'Cover Picture' },
  'layoutHidePersonBGImg': { 'zh-cn': '背景图', 'zh-hk': '背景圖', 'zh-tw': '背景圖', 'en': 'Background Picture' },
  'layoutHidePersonBadgeIcon': { 'zh-cn': '勋章', 'zh-hk': '勳章', 'zh-tw': '勳章', 'en': 'Badges' },
  'layoutHidePersonVerify': { 'zh-cn': '个人资料认证', 'zh-hk': '個人資料認證', 'zh-tw': '個人資料認證', 'en': 'Person Info Verification' },
  'layoutHidePersonEditPersonInfo': { 'zh-cn': '编辑个人资料', 'zh-hk': '编辑个人资料', 'zh-tw': '编辑个人资料', 'en': '编辑个人资料 (Edit person info)' },
  'layoutHidePersonStats': { 'zh-cn': '关注/粉丝/微博数', 'zh-hk': '關注/粉絲/微博數', 'zh-tw': '關注/粉絲/微博數', 'en': 'Numbers of Following/Followers/Weibo' },
  'layoutHidePersonMyData': { 'zh-cn': '我的微博人气', 'zh-hk': '我的微博人气', 'zh-tw': '我的微博人气', 'en': 'Weibo Popularity' },
  'layoutHidePersonSuggestUser': { 'zh-cn': '可能感兴趣的人', 'zh-hk': '可能感兴趣的人', 'zh-tw': '可能感兴趣的人'/* as is */, 'en': 'Suggested' },
  'layoutHidePersonGroup': { 'zh-cn': '公开分组', 'zh-hk': '公开分组', 'zh-tw': '公开分组'/* as is */, 'en': '公开分组 (Public Group)' },
  'layoutHidePersonRelation': { 'zh-cn': '微关系', 'zh-hk': '微关系', 'zh-tw': '微关系'/* as is */, 'en': 'Weibo relations' },
  'layoutHidePersonAlbum': { 'zh-cn': '图片', 'zh-hk': '相冊', 'zh-tw': '相冊', 'en': 'Album' },
  'layoutHidePersonHotTopic': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'layoutHidePersonHotWeibo': { 'zh-cn': '热门微博', 'zh-hk': '熱門微博', 'zh-tw': '熱門微博', 'en': 'Hot Weibo' },
  'layoutHidePersonUserList': { 'zh-cn': '与他/她相似的人', 'zh-hk': '與他/她相似的人', 'zh-tw': '與他/她相似的人', 'en': 'with He/SheSimilar Person' /* as is */ },
  'layoutHidePersonHongbao': { 'zh-cn': '微博红包', 'zh-hk': '微博红包', 'zh-tw': '微博红包', 'en': '微博红包 (Red pack)' },
  'layoutHidePersonWenwoDr': { 'zh-cn': '爱问医生', 'zh-hk': '爱问医生', 'zh-tw': '爱问医生', 'en': '爱问医生 (Iask medical)' },
  'layoutHidePersonTimeline': { 'zh-cn': '时间轴', 'zh-hk': '時間軸', 'zh-tw': '時間軸', 'en': 'Timeline' },
  // 个人主页边栏模块
  'layoutHidePLeft': { 'zh-cn': '隐藏模块 - 边栏其他', 'zh-hk': '隱藏其他 - 邊欄其他', 'zh-tw': '隱藏模組 - 邊欄其他', 'en': 'Hide modules - Others in side column' },
  'layoutHidePLeftDesc': {
    'zh-cn': '边栏除上述的一些统一的模块外，有一些可以自定义的模块（主要是企业认证用户）。这些模块无法一一列举，你可以将要屏蔽的模块的标题添加到这里来屏蔽这些模块。'
  },
  'layoutHidePLeftDetails': { 'zh-cn': '隐藏个人主页边栏中以下标题的模块<br />模块', 'zh-hk': '隱藏個人主頁邊欄中以下標題的模組<br />模組', 'zh-tw': '隱藏個人主頁邊欄中以下標題的模組<br />模組', 'en': 'Hide modules on personal homepage with these titles<br />Modules' },
  // 消息页面
  'layoutHideMessages': { 'zh-cn': '隐藏模块 - 消息页面', 'zh-hk': '隱藏模組 - 消息網頁', 'zh-tw': '隱藏模組 - 消息網頁', 'en': 'Hide modules - News page' },
  'layoutHideMessagesHelp': { 'zh-cn': '使用小帮助', 'zh-hk': '使用小幫助', 'zh-tw': '使用小幫助', 'en': 'Tips' },
  'layoutHideMessagesFeedback': { 'zh-cn': '微博意见反馈', 'zh-hk': '微博意见反馈', 'zh-tw': '微博意见反馈'/* as is */, 'en': 'Feed Back'/* as is */ },
  'layoutHideMessagesYoudao': { 'zh-cn': '导出收藏夹', 'zh-hk': '导出收藏夹', 'zh-tw': '导出收藏夹', 'en': 'Export favorites' },
  // 杂项
  'layoutHideOther': { 'zh-cn': '隐藏模块 - 杂项', 'zh-hk': '隱藏模組 - 雜項', 'zh-tw': '隱藏模組 - 雜項', 'en': 'Hide modules - Others' },
  'layoutHideOtherAds': { 'zh-cn': '广告', 'zh-hk': '廣告', 'zh-tw': '廣告', 'en': 'Advertisement' },
  'layoutHideOtherMusic': { 'zh-cn': '微音乐', 'zh-hk': '微音乐', 'zh-tw': '微音乐'/* as is */, 'en': '微音乐 (Weibo Music)' },
  'layoutHideOtherTemplate': { 'zh-cn': '设置模板', 'zh-hk': '背景設定', 'zh-tw': '背景設定', 'en': 'Template Settings' },
  'layoutHideOtherHomeTip': { 'zh-cn': '顶部提示横幅', 'zh-hk': '頂部提示橫幅', 'zh-tw': '頂部提示橫幅', 'en': 'Top tips banner' },
  'layoutHideOtherHomeTipDesc': {
    'zh-cn': '出现在导航栏下方其他所有内容的上方的横幅。一般用来推荐微博重要的新功能。',
  },
  'layoutHideOtherFooter': { 'zh-cn': '页面底部', 'zh-hk': '頁面底部', 'zh-tw': '頁面底部', 'en': 'Footer' },
  'layoutHideOtherFooterDesc': {
    'zh-cn': '页面底部的导航链接。',
  },
  'layoutHideOtherWbIm': { 'zh-cn': '微博桌面推荐（右下）', 'zh-hk': '微博桌面推薦（右下）', 'zh-tw': '微博桌面推薦（右下）', 'en': '微博桌面2014 (Desktop Weibo), bottom right' },
  'layoutHideOtherWbImDesc': {
    'zh-cn': '偶尔出现在右下角的推荐安装微博桌面的提示框。',
  },
  'layoutHideOtherIM': { 'zh-cn': '私信聊天（右下）', 'zh-hk': '私信聊天（右下）', 'zh-tw': '私信聊天（右下）'/* as is */, 'en': 'Chat (bottom right)' },
  'layoutHideOtherIMDesc': {
    'zh-cn': '隐藏后您还可以在私信页面收发私信：鼠标指向右上角消息图标在下拉菜单中选择“私信”即可打开私信页面。',
  },
  'layoutHideOtherTip': { 'zh-cn': '功能提示框', 'zh-hk': '功能提示框', 'zh-tw': '功能提示框', 'en': 'Function Tips' },
  'layoutHideOtherTipDesc': {
    'zh-cn': '偶尔会出现的新功能推荐的弹框，如果隐藏了对应功能的界面可能弹框会显示到奇怪的地方。',
  },
  'layoutHideOtherRelatedWB': { 'zh-cn': '相关微博推荐', 'zh-hk': '相关微博推荐', 'zh-tw': '相关微博推荐', 'en': '相关微博推荐 (Related Weibo)' },
  'layoutHideOtherRelatedWBDesc': {
    'zh-cn': '在单条微博页面可以看到的相关微博推荐',
  },
  'layoutHideOtherRelatedArtical': { 'zh-cn': '头条文章页推荐阅读', 'zh-hk': '頭條文章頁推薦閱讀', 'zh-tw': '頭條文章頁推薦閱讀', 'en': '推荐阅读 (Suggested Artical)' },
  'layoutHideOtherSendWeibo': { 'zh-cn': '首页外的微博发布框', 'zh-hk': '首頁外的微博發佈框', 'zh-tw': '首頁外的微博發佈框', 'en': 'All other Weibo publishers' },
  'layoutHideOtherSendWeiboDesc': {
    'zh-cn': '除了首页的微博发布框，右上角按钮弹出的快速发布框外；其他的各种发布框。如微博文章下方转发用的发布框等。',
  },
  // 工具
  'toolFilterGroupTitle': { 'zh-cn': '功能改造', 'zh-hk': '功能改造', 'zh-tw': '功能改造', 'en': 'Functions' },
  // 边栏
  'sideColumnToolsTitle': { 'zh-cn': '边栏', 'zh-hk': '邊欄', 'zh-tw': '邊欄', 'en': 'Side Column' },
  'showAllGroupDesc': { 'zh-cn': '展开左栏分组', 'zh-hk': '展開左欄分組', 'zh-tw': '展開左欄分組', 'en': 'Unfold groups in left column' },
  'showAllMsgNav': {
    'zh-cn': '在首页左栏显示消息分组，包含以下快捷链接{{<i>}}||{{<atme>}}{{leftNavAtMe}}|{{<cmt>}}{{leftNavCmt}}|{{<like>}}{{leftNavLike}}|{{<dm>}}{{leftNavDM}}|{{<msgbox>}}{{leftNavMsgBox}}|{{<group>}}{{leftNavGroup}}|{{<dmsub>}}{{leftNavDMSub}}',
    'zh-hk': '在首頁左欄顯示消息分組，包含以下快捷連結{{<i>}}||{{<atme>}}{{leftNavAtMe}}|{{<cmt>}}{{leftNavCmt}}|{{<like>}}{{leftNavLike}}|{{<dm>}}{{leftNavDM}}|{{<msgbox>}}{{leftNavMsgBox}}|{{<group>}}{{leftNavGroup}}|{{<dmsub>}}{{leftNavDMSub}}',
    'zh-tw': '在首頁左欄顯示消息分組，包含以下快捷連結{{<i>}}||{{<atme>}}{{leftNavAtMe}}|{{<cmt>}}{{leftNavCmt}}|{{<like>}}{{leftNavLike}}|{{<dm>}}{{leftNavDM}}|{{<msgbox>}}{{leftNavMsgBox}}|{{<group>}}{{leftNavGroup}}|{{<dmsub>}}{{leftNavDMSub}}',
    'en': 'Show news in left column of home page with following items{{<i>}}||{{<atme>}}{{leftNavAtMe}}|{{<cmt>}}{{leftNavCmt}}|{{<like>}}{{leftNavLike}}||{{<dm>}}{{leftNavDM}}|{{<msgbox>}}{{leftNavMsgBox}}|{{<group>}}{{leftNavGroup}}|{{<dmsub>}}{{leftNavDMSub}}'
  },
  'showAllMsgNavDesc': {
    'zh-cn': '屏幕分辨率过小时请勿选择该项，否则可能会显示不完全。'
  },
  'leftNavMsg': { 'zh-cn': '消息', 'zh-hk': '消息', 'zh-tw': '消息', 'en': 'News' },
  'leftNavAtMe': { 'zh-cn': '@我的', 'zh-hk': '@我的', 'zh-tw': '@我的', 'en': '@My'/* as is */ },
  'leftNavCmt': { 'zh-cn': '评论', 'zh-hk': '評論', 'zh-tw': '評論', 'en': 'Comment' },
  'leftNavLike': { 'zh-cn': '赞', 'zh-hk': '讚', 'zh-tw': '讚', 'en': 'Like' },
  'leftNavDM': { 'zh-cn': '私信', 'zh-hk': '私信', 'zh-tw': '私信', 'en': 'Message' },
  'leftNavMsgBox': { 'zh-cn': '未关注人私信', 'zh-hk': '未關注人私信', 'zh-tw': '未關注人私信', 'en': 'Messages from those you don\'t follow' },
  'leftNavGroup': { 'zh-cn': '群通知', 'zh-hk': '群通知', 'zh-tw': '群通知', 'en': '群通知'/* as is */ },
  'leftNavDMSub': { 'zh-cn': '订阅消息', 'zh-hk': '订阅消息', 'zh-tw': '订阅消息', 'en': '订阅消息'/* as is */ },
  'mergeLeftRight': { 'zh-cn': '合并左右边栏|到{{<side>}}{{<i>}}', 'zh-hk': '合併左右邊欄|到{{<side>}}{{<i>}}', 'zh-tw': '合併左右邊欄|到{{<side>}}{{<i>}}', 'en': 'Merge left &amp; right column | to {{<side>}}{{<i>}}' },
  'mergeLeftRightLeft': { 'zh-cn': '左侧', 'zh-hk': '左側', 'zh-tw': '左側', 'en': 'left side' },
  'mergeLeftRightRight': { 'zh-cn': '右侧', 'zh-hk': '右側', 'zh-tw': '右側', 'en': 'right side' },
  'mergeLeftRightDesc': {
    'zh-cn': '开启此选项后，左栏切换页面可能会导致微音乐播放中断。'
  },
  'choseSide': { 'zh-cn': '统一个人主页、话题、单条微博等页面侧栏|到{{<side>}}', 'zh-hk': '統一個人主頁、話題、單條微博等頁面側欄|到{{<side>}}', 'zh-tw': '統一個人主頁、話題、單條微博等頁面側欄|到{{<side>}}', 'en': 'Relocate side bar for pages of user, topic, and, single Weibo | to {{<side>}}' },
  'choseSideLeft': { 'zh-cn': '左侧', 'zh-hk': '左側', 'zh-tw': '左側', 'en': 'left side' },
  'choseSideRight': { 'zh-cn': '右侧', 'zh-hk': '右側', 'zh-tw': '右側', 'en': 'right side' },
  'filteRightTopic': { 'zh-cn': '应用微博过滤黑名单到右栏热门话题', 'zh-hk': '應用微博篩選黑名單到右欄熱門話題', 'zh-tw': '應用微博篩選黑名單到右欄熱門話題', 'en': 'Apply blacklist filters to Hot Topic in right column' },
  'filteRightTopicCount': { 'zh-cn': '热门话题列表隐藏|阅读数少于{{<number>}}万的话题', 'zh-hk': '熱門話題清單隱藏|閱讀數少於{{<number>}}萬的話題', 'zh-tw': '熱門話題清單隱藏|閱讀數少於{{<number>}}萬的話題', 'en': 'Hide hot topics with | less than {{<number>}}万 readings' },
  'addRightUserList': { 'zh-cn': '在首页右边栏显示收藏帐号列表{{<i>}}', 'zh-hk': '在首頁右邊欄顯示收藏帳號清單{{<i>}}', 'zh-tw': '在首頁右邊欄顯示收藏帳號清單{{<i>}}', 'en': 'Add links of accounts to right column{{<i>}}' },
  'addRightUserListDesc': {
    'zh-cn': '在首页右边栏添加一个“收藏帐号”的列表，里面列出指向这些用户的个人主页的链接，方便您快速打开对应用户的个人主页，查看他最近的微博。'
  },
  'addRightUserListTooManyTitle': { 'zh-cn': '收藏帐号过多', 'zh-hk': '收藏帳號過多', 'zh-tw': '收藏帳號過多', 'en': 'Too Many Fave People' },
  'addRightUserListTooMany': {
    'zh-cn': '您添加了过多的收藏帐号，为了避免给服务器造成过大的压力，自动检查首页是否有遗漏的微博的功能将仅对该列表中的前 50 位帐号生效。',
    'zh-hk': '您添加了過多的收藏帳號，為了避免給伺服器造成過大的壓力，自動檢查首頁是否有遺漏的微博的功能將僅對該清單中的前 50 位帳號生效。',
    'zh-tw': '您添加了過多的收藏帳號，為了避免給伺服器造成過大的壓力，自動檢查首頁是否有遺漏的微博的功能將僅對該清單中的前 50 位帳號生效。',
    'en': 'Too many fave people: The function for checking if there are any Weibo not shown on home page will only apply to first 50 accounts to avoid too many network access.'
  },
  'addRightUserListNotice': { 'zh-cn': '自动检查您是否遗漏了收藏用户的微博{{<i>}}', 'zh-hk': '自動檢查您是否遺漏了收藏用戶的微博{{<i>}}', 'zh-tw': '自動檢查您是否遺漏了收藏用戶的微博{{<i>}}', 'en': 'Check if all Weibo from fave people you have read {{<i>}}' },
  'addRightUserListNoticeDesc': {
    'zh-cn': '如果您不想错过某个人的微博，那么就将他加到收藏帐号的列表中。脚本会在您打开首页时自动打开这些人的个人主页，检查他们的微博是否您都看到过。一旦发现了漏掉的微博，脚本会在帐号旁边用小红点标记。'
  },
  'addRightUserListConfigTitle': { 'zh-cn': '收藏帐号设置 - Yet Another Weibo Filter', 'zh-hk': '收藏帳號設定 - Yet Another Weibo Filter', 'zh-tw': '收藏帳號設定 - Yet Another Weibo Filter', 'en': 'Fave People Setting - Yet Another Weibo Filter' },
  'rightUserListTitle': { 'zh-cn': '收藏帐号', 'zh-hk': '收藏帳號', 'zh-tw': '收藏帳號', 'en': 'Fave People' },
  // 浮动元素
  'fixedItemsTitle': { 'zh-cn': '浮动元素', 'zh-hk': '浮動元素', 'zh-tw': '浮動元素', 'en': 'Floating Items' },
  'floatNav': { 'zh-cn': '自动隐藏导航栏', 'zh-hk': '自動隱藏導覽列', 'zh-tw': '自動隱藏導覽列', 'en': 'Auto hide nav bar' },
  'fixedLeft': { 'zh-cn': '允许首页左边栏随页面滚动始终显示', 'zh-hk': '允許首頁左邊欄隨頁面滾動始終顯示', 'zh-tw': '允許首頁左邊欄隨頁面滾動始終顯示', 'en': 'Floating left column' },
  'fixedRight': { 'zh-cn': '允许首页右边栏随页面滚动始终显示{{<i>}}', 'zh-hk': '允許首頁右邊欄隨頁面滾動始終顯示{{<i>}}', 'zh-tw': '允許首頁右邊欄隨頁面滾動始終顯示{{<i>}}', 'en': 'Floating right column{{<i>}}' },
  'fixedRightDesc': {
    'zh-cn': '如果同时启用了“[[tool.sidebar.merge_left_right]]”和“[[tool.fixed.fixed_left]]”，则该选项将不生效。',
  },
  'fixedNewFeedTip': { 'zh-cn': '允许新微博提示随页面滚动始终显示', 'zh-hk': '允許新微博提示隨頁面滾動始終顯示', 'zh-tw': '允許新微博提示隨頁面滾動始終顯示', 'en': 'Floating new feeds tip' },
  'fixedOthers': { 'zh-cn': '允许其他元素随页面滚动始终显示', 'zh-hk': '允許其他元素隨頁面滾動始終顯示', 'zh-tw': '允許其他元素隨頁面滾動始終顯示', 'en': 'Other floating items' },
  // 微博
  'weiboToolsTitle': { 'zh-cn': '微博', 'zh-hk': '微博', 'zh-tw': '微博', 'en': 'Weibo' },
  'unfoldLongWeibo': { 'zh-cn': '自动展开|不超过{{<count>}}字的微博|（每个换行符计{{<br>}}字）', 'zh-hk': '自動展開|不超過{{<count>}}個字的微博|（每個換行符計{{<br>}}字）', 'zh-tw': '自動展開|不超過{{<count>}}個字的微博|（每個換行符計{{<br>}}字）', 'en': 'Automatically unfold weibo | within {{<count>}} characters || (count each line break as {{<br>}} characters)' },
  'unfoldWeiboLength': { 'zh-cn': '（约{{length}}字）', 'zh-hk': '（約{{length}}字）', 'zh-tw': '（約{{length}}字）', 'en': '(about {{length}} charactors)' },
  'clearDefTopicDesc': { 'zh-cn': '清除发布框中的默认话题', 'zh-hk': '清除發布框中的預設話題', 'zh-tw': '清除發布框中的預設話題', 'en': 'Remove default topic in Publisher' },
  'disableNotification': { 'zh-cn': '禁用微博的桌面提示 {{<i>}}', 'zh-hk': '阻止微博的桌面提示 {{<i>}}', 'zh-tw': '阻止微博的桌面提示 {{<i>}}', 'en': 'Disable desktop notification from Weibo {{<i>}}' },
  'disableNotificationDesc': {
    'zh-cn': '勾选以禁用微博的桌面提示，您也可以直接在浏览器的权限管理中禁用微博的桌面提示功能，但这样做您将同样无法使用脚本提供的桌面提示功能。'
  },
  'fastEmojiInputTop': { 'zh-cn': '置顶', 'zh-hk': '置頂', 'zh-tw': '置頂', 'en': 'Top' },
  'fastEmojiInputTopNotice': { 'zh-cn': '将下方表情拖放至此置顶', 'zh-hk': '將下方表情拖放至此置頂', 'zh-tw': '將下方表情拖放至此置頂', 'en': 'Drag emoji and drop here to sticky' },
  'fastEmojiInputRecent': { 'zh-cn': '最近', 'zh-hk': '最近', 'zh-tw': '最近', 'en': 'Recent' },
  'fastEmojiClear': { 'zh-cn': '清空列表', 'zh-hk': '清除清單', 'zh-tw': '清除清單', 'en': 'Clear List' },
  'personalRedirectWeibo': { 'zh-cn': '用户主页默认显示全部微博而非热门微博', 'zh-hk': '用戶主頁默認顯示全部微博而非热门微博', 'zh-tw': '用戶主頁默認顯示全部微博而非热门微博', 'en': 'Personal page show all Weibo instead of hot by default' },
  'publishToPublicDefault': { 'zh-cn': '分组浏览时默认发布公开微博', 'zh-hk': '分組流覽時默認發佈公開微博', 'zh-tw': '分組流覽時默認發佈公開微博', 'en': 'Publish to public by default when browsing by group' },
  'publishToPublicText': { 'zh-cn': '公开', 'zh-hk': '公開', 'zh-tw': '公開', 'en': 'Public' },
  'cardButton': { 'zh-cn': '使用微博卡片的按钮替换对应链接{{<i>}}', 'zh-hk': '使用微博卡片的按鈕替換對應連結{{<i>}}', 'zh-tw': '使用微博卡片的按鈕替換對應連結{{<i>}}', 'en': 'Replace the corresponding links by buttons in Weibo cards' },
  'cardButtonDesc': {
    'zh-cn': '默认情况下只有点击卡片中的按钮才会在当前页显示长微博或分享的视频，点击链接则会直接在新页打开。启用该功能可以使点击链接时的反应与点击按钮时相同。启用后您还可以在模块选项卡中选择隐藏微博内的“[[layout.weibo.card]]”隐藏掉整个卡片。',
  },
  'noTagDialog': { 'zh-cn': '屏蔽收藏微博时的添加标签对话框', 'zh-hk': '阻擋收藏微博時的添加標籤對話方塊', 'zh-tw': '阻擋收藏微博時的添加標籤對話方塊', 'en': 'Block the dialog after marking weibo favorite' },
  'foldDetails': { 'zh-cn': '收起', 'zh-hk': '收起', 'zh-tw': '收起', 'en': '收起'/* as is */ },
  'replaceLinkByUrl': { 'zh-cn': '将微博中的网页链接替换为短网址', 'zh-hk': '將微博中的网页链接替換為短網址', 'zh-tw': '將微博中的网页链接替換為短網址', 'en': 'Replace 网页链接 in Weibo by shortened URL' },
  'replaceImageEmoji': { 'zh-cn': '将微博中图片表示的 Unicode 表情符号替换为文本{{<i>}}', 'zh-hk': '將微博中圖片表示的 Unicode Emoji 替換為文本{{<i>}}', 'zh-tw': '將微博中圖片表示的 Unicode Emoji 替換為文本{{<i>}}', 'en': 'Use text for unicode emoji instead of image {{<i>}}' },
  'replaceImageEmojiDesc': {
    'zh-cn': '使用文本替换对应图片。表情会随您使用的操作系统、浏览器、安装的字体的不同而显示成不的样子。Firefox 和 Safari 可以得到较好的效果。<hr />替换前 <span style="font-size: 20px"><img width="20px" height="20px" src="//img.t.sinajs.cn/t4/appstyle/expression/emimage/ee8192.png"><img width="20px" height="20px" src="img.t.sinajs.cn/t4/appstyle/expression/emimage/ee8098.png"><img width="20px" height="20px" src="img.t.sinajs.cn/t4/appstyle/expression/emimage/ee84b2.png"><img width="20px" height="20px" src="img.t.sinajs.cn/t4/appstyle/expression/emimage/ee8cac.png"><img width="20px" height="20px" src="img.t.sinajs.cn/t4/appstyle/expression/emimage/ee8992.png"><img width="20px" height="20px" src="img.t.sinajs.cn/t4/appstyle/expression/emimage/ee888b.png"><img width="20px" height="20px" src="//img.t.sinajs.cn/t4/appstyle/expression/emimage/ee84ad.png"><img width="20px" height="20px" src="//img.t.sinajs.cn/t4/appstyle/expression/emimage/ee9493.png"></span><br />替换后 <span style="font-size: 20px">🐶⚽️🏁💛⚠️📶🀄️🇨🇳</span>'
  },
  'customizeSourceWeibo': { 'zh-cn': '自定义来源微博仅显示“来自微博 weibo.com”', 'zh-hk': '自訂來源微博僅顯示「來自微博 weibo.com」', 'zh-tw': '自訂來源微博僅顯示「來自微博 weibo.com」', 'en': 'Weibo with customize source show "come from 微博 weibo.com" only' },
  'weiboViaText': { 'zh-cn': '来自', 'zh-hk': '来自', 'zh-tw': '来自', 'en': '来自'/* as is */ },
  'customizeSourceWeiboDesc': {
    'zh-cn': '微博会员在发布微博时可以使用自定义文本来显示个性化来源，您可以隐藏这些微博或将这些微博的来源显示为默认来源',
  },
  'foldChildComment': { 'zh-cn': '默认折叠二级评论', 'zh-hk': '預設折疊二級評論', 'zh-tw': '預設折疊二級評論', 'en': 'Fold child comments by default' },
  'commentShowAll': { 'zh-cn': '查看评论时自动切换到全部评论', 'zh-hk': '查閱評論時自動切換到全部評論', 'zh-tw': '查閱評論時自動切換到全部評論', 'en': 'Automatically switch view of comments to all' },
  // 图片和视频
  'mediaToolsTitle': { 'zh-cn': '图片与视频', 'zh-hk': '圖片與視頻', 'zh-tw': '圖片與視頻', 'en': 'Images &amp; Videos' },
  'viewOriginal': { 'zh-cn': '添加“查看原图”链接|打开{{<open>}}||{{<direct>}}点击缩略图时直接查看原图', 'zh-hk': '添加「查看原圖」連結|打開{{<open>}}||{{<direct>}}點擊縮圖時直接查看原圖', 'zh-tw': '添加「查看原圖」連結|打開{{<open>}}||{{<direct>}}點擊縮圖時直接查看原圖', 'en': 'add "Original Picture" link | which target to {{<open>}} || {{<direct>}} View orignal picture by clicking on thumbnail' },
  'viewOriginalPage': { 'zh-cn': '包含原图的网页', 'zh-hk': '包含原圖的網頁', 'zh-tw': '包含原圖的網頁', 'en': 'page with original picture' },
  'viewOriginalImage': { 'zh-cn': '原图', 'zh-hk': '原圖', 'zh-tw': '原圖', 'en': 'original picture' },
  'viewOriginalTitle': { 'zh-cn': '查看原图 - YAWF', 'zh-hk': '查看原圖 - YAWF', 'zh-tw': '查看原圖 - YAWF', 'en': 'View Original Picture - YAWF' },
  'viewOriginalText': { 'zh-cn': '查看原图', 'zh-hk': '查看原圖', 'zh-tw': '查看原圖', 'en': 'Original Picture' },
  'viewOriginalFCText': { 'zh-cn': '查看图片', 'zh-hk': '查看圖片', 'zh-tw': '查看圖片', 'en': 'View Picture' },
  'pauseAnimatedImage': { 'zh-cn': '动画图像(GIF)在缩略图显示时保持静止{{<i>}}', 'zh-hk': '動畫圖像(GIF)在所圖顯示時保持靜止{{<i>}}', 'zh-tw': '動畫圖像(GIF)在所圖顯示時保持靜止{{<i>}}', 'en': 'Pause thumbnail animated image (GIF) {{<i>}}' },
  'pauseAnimatedImageDesc': { 'zh-cn': '该功能仅影响显示效果，并不会降低网络数据用量。' },
  'disableVideoContextMenu': { 'zh-cn': '在视频上使用原生右键菜单（方便下载视频）', 'zh-hk': '在影片上使用原生右鍵功能表（方便影片下載）', 'zh-tw': '在影片上使用原生右鍵功能表（方便影片下載）', 'en': 'Use native right-click menu on video (for video downloading)' },
  'disableLivePhoto': { 'zh-cn': '禁用微博 Live Photo 播放', 'zh-hk': '阻止微博播放 Live Photo', 'zh-tw': '阻止微博播放 Live Photo', 'en': 'Disable playing live photo' },
  // 关注
  'followingToolsTitle': { 'zh-cn': '关注', 'zh-hk': '關注', 'zh-tw': '關注', 'en': 'Following' },
  'autoCheckFollowing': { 'zh-cn': '自动检查关注列表并提示变化（试验性）|{{<frequency>}}{{<i>}}', 'zh-hk': '自動檢查關注清單並提示變化（試驗性）|{{<frequency>}}{{<i>}}', 'zh-tw': '自動檢查關注清單並提示變化（試驗性）|{{<frequency>}}{{<i>}}', 'en': 'Automatically checks and prompt any changes about following list (Experimental) | {{<frequency>}}{{<i>}}' },
  'autoCheckFollowingDesc': {
    'zh-cn': '开启本功能后脚本会每隔一段时间，检查您的关注列表，并和上一次得到的结果比较，将不同之处展示出来。脚本检查关注列表只能像您在网页中检查关注列表一样，一页一页的翻看，因此检查可能需要较长的时间，如果您关注了大量的帐号，请考虑降低自动检查的频率。<br /><strong>该功能目前为试验性功能，可能出现任何问题。</strong>'
  },
  'autoCheckFollowing1': { 'zh-cn': '每天', 'zh-hk': '每天', 'zh-tw': '每天', 'en': 'every day' },
  'autoCheckFollowing3': { 'zh-cn': '每三天', 'zh-hk': '每三天', 'zh-tw': '每三天', 'en': 'every 3 days' },
  'autoCheckFollowing7': { 'zh-cn': '每周', 'zh-hk': '每週', 'zh-tw': '每週', 'en': 'every week' },
  'autoCheckFollowingLastTime': { 'zh-cn': '上次检查时间：', 'zh-hk': '上次檢查時間', 'zh-tw': '上次檢查時間', 'en': 'Last checking time: ' },
  'autoCheckFollowingNever': { 'zh-cn': '尚未检查', 'zh-hk': '尚未檢查', 'zh-tw': '尚未檢查', 'en': 'Never' },
  'autoCheckFollowingNow': { 'zh-cn': '立即检查', 'zh-hk': '立即檢查', 'zh-tw': '立即檢查', 'en': 'Check Now' },
  'autoCheckFollowingRunning': { 'zh-cn': '（正在检查）', 'zh-hk': '（正在檢查）', 'zh-tw': '正在檢查', 'en': '(Checking)' },
  'autoCheckFollowingClean': { 'zh-cn': '清除本地数据', 'zh-hk': '清除本機資料', 'zh-tw': '清除本機資料', 'en': 'Clear Local data' },
  'autoCheckFollowingDialogTitle': { 'zh-cn': '关注列表变化', 'zh-hk': '關注清單變化', 'zh-tw': '關注清單變化', 'en': 'Following List Changes' },
  'autoCheckFollowingTitle': { 'zh-cn': '关注列表变化', 'zh-hk': '關注清單變化', 'zh-tw': '關注清單變化', 'en': 'Following List Changes' },
  'autoCheckFollowingTip': {
    'zh-cn': '您的关注列表自从上次检查并确认至今发生了如下变化，请您复查：',
    'zh-hk': '您的關注清單自從上次檢查並確認至今發生了如下變化，請您複查：',
    'zh-tw': '您的關注清單自從上次檢查並確認至今發生了如下變化，請您複查：',
    'en': 'Your following list had been changed since last checking, please review: ',
  },
  'autoCheckFollowingTipDetail': {
    'zh-cn': '这些变化可能是因为脚本在检查时的不准确，您自己有意或无意的操作，或一些操作或应用的修改导致的。如果您的关注列表经常出现预期之外的变动，请检查<a href="//app.weibo.com/my" target="_blank">您的应用授权</a>。',
    'zh-hk': '這些變化可能是因為腳本在檢查時的不準確，您自己有意或無意的操作，或一些操作或應用的修改導致的。如果您的關注清單經常出現預期之外的變動，請檢查<a href="//app.weibo.com/my" target="_blank">您的應用授權</a>。',
    'zh-tw': '這些變化可能是因為腳本在檢查時的不準確，您自己有意或無意的操作，或一些操作或應用的修改導致的。如果您的關注清單經常出現預期之外的變動，請檢查<a href="//app.weibo.com/my" target="_blank">您的應用授權</a>。',
    'en': 'These changes occurred might be caused by: inaccurate script checking behaviour; your own operations, whether you do interested or by mistake; or some other operations or applications that has the authority to make these changes. If your following list continuously shows unexpected changes, please review <a href="//app.weibo.com/my" target="_blank">your application authorisations</a>.',
  },
  'autoCheckFollowingAdd': { 'zh-cn': '新增如下关注', 'zh-hk': '新增如下關注', 'zh-tw': '新增如下關注', 'en': 'Recent Following' },
  'autoCheckFollowingLost': { 'zh-cn': '减少如下关注', 'zh-hk': '減少如下關注', 'zh-tw': '減少如下關注', 'en': 'Recent Unfollowed' },
  'unfoldTTArtical': { 'zh-cn': '头条文章直接显示全文以免误操作关注作者', 'zh-hk': '頭條文章直接顯示全文以免誤操作關注作者', 'zh-tw': '頭條文章直接顯示全文以免誤操作關注作者', 'en': 'Unfold artical to avoid follow artical author' },
  'uncheckFollowPresenter': { 'zh-cn': '话题页面发布框取消默认勾选关注主持人', 'zh-hk': '話題頁面發佈框取消預設勾選關注主持人', 'zh-tw': '話題頁面發佈框取消預設勾選關注主持人', 'en': 'Uncheck follow presenter in topic page' },
  // 其他
  'otherToolsTitle': { 'zh-cn': '其他', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'Others' },
  'fastEmojiInput': { 'zh-cn': '表情选择框优先列出常用及置顶表情', 'zh-hk': '表情選擇框優先列出常用及置頂表情', 'zh-tw': '表情選擇框優先列出常用及置頂表情', 'en': 'List top and recent emoji on the top of emoji selector' },
  'showLocalTime': { 'zh-cn': '显示时间时使用本机时区', 'zh-hk': '顯示時間時使用本機時區', 'zh-tw': '顯示時間時使用本機時區', 'en': 'Show timestamp with local time zone' },
  // 样式
  'styleFilterGroupTitle': { 'zh-cn': '外观样式', 'zh-hk': '外觀樣式', 'zh-tw': '外觀樣式', 'en': 'Appearance' },
  // 文字
  'textStyleTitle': { 'zh-cn': '文字', 'zh-hk': '文字', 'zh-tw': '文字', 'en': 'Text' },
  'customFontFamily': { 'zh-cn': '替换默认字体为|西文{{<wf>}}|中文{{<cf>}}', 'zh-hk': '替換預設字形為|西文{{<wf>}}|中文{{<cf>}}', 'zh-tw': '替換預設字形為|西文{{<wf>}}|中文{{<cf>}}', 'en': 'Replace the default font as | Western {{<wf>}} | Chinese {{<cf>}}' },
  'weiboLargeFont': { 'zh-cn': '增大微博正文字号为|原大小的{{<ratio>}}', 'zh-hk': '增大微博正文字型大小為|原大小的{{<ratio>}}', 'zh-tw': '增大微博正文字型大小為|原大小的{{<ratio>}}', 'en': 'Increase font size of Weibo content to | {{<ratio>}}' },
  'weiboLargeFont120': { 'zh-cn': '120%', 'zh-hk': '120%', 'zh-tw': '120%', 'en': '120%' },
  'weiboLargeFont150': { 'zh-cn': '150%', 'zh-hk': '150%', 'zh-tw': '150%', 'en': '150%' },
  'weiboLargeFont200': { 'zh-cn': '200%', 'zh-hk': '200%', 'zh-tw': '200%', 'en': '200%' },
  'weiboLargeFont300': { 'zh-cn': '300%', 'zh-hk': '300%', 'zh-tw': '300%', 'en': '300%' },
  // 版面
  'layoutStyleTitle': { 'zh-cn': '版面', 'zh-hk': '版面', 'zh-tw': '版面', 'en': 'Layout' },
  'avatarShape': { 'zh-cn': '统一头像形状为|{{<shape>}}', 'zh-hk': '統一頭像形狀為|{{<shape>}}', 'zh-tw': '統一頭像形狀為|{{<shape>}}', 'en': 'Show all avatars as | {{<shape>}}' },
  'avatarShapeCircle': { 'zh-cn': '圆形', 'zh-hk': '圓形', 'zh-tw': '圓形', 'en': 'Circle' },
  'avatarShapeSquare': { 'zh-cn': '方形', 'zh-hk': '方形', 'zh-tw': '方形', 'en': 'Square' },
  'darkNavBar': { 'zh-cn': '使用深色的导航栏', 'zh-hk': '使用深色的導覽列', 'zh-tw': '使用深色的導覽列', 'en': 'Dark nav bar' },
  'reorderNavBar': { 'zh-cn': '恢复经典导航栏样式{{<i>}}', 'zh-hk': '恢復經典導覽列樣式{{<i>}}', 'zh-tw': '恢復經典導覽列樣式{{<i>}}', 'en': 'Restore classical style navigator {{<i>}}' },
  'reorderNavBarDesc': {
    'zh-cn': '微博字样紧贴在标识右侧显示，“首页”“热门”“游戏”的链接出现在搜索框的左侧。'
  },
  'navHideName': { 'zh-cn': '将导航栏上的用户名|{{<act>}}{{<i>}}', 'zh-hk': '將導覽列上的用戶名|{{<act>}}{{<i>}}', 'zh-tw': '將導覽列上的用戶名|{{<act>}}{{<i>}}', 'en': 'Username on nav bar will be | {{<act>}}{{<i>}}' },
  'navHideNameReplace': { 'zh-cn': '替换为“{{navHideNameReplaceText}}”', 'zh-hk': '替換為「{{navHideNameReplaceText}}」', 'zh-tw': '替換為「{{navHideNameReplaceText}}」', 'en': 'replaced to text "{{navHideNameReplaceText}}"' },
  'navHideNameHidden': { 'zh-cn': '隐藏', 'zh-hk': '隱藏', 'zh-tw': '隱藏', 'en': 'hidden' },
  'navHideNameDesc': {
    'zh-cn': '此外您还可以在版面清理选项卡或在此勾选，以隐藏隐藏右栏的 [[layout.right.info]] 模块。此外还可以在功能改造选项卡或此处选择 [[tool.fixed.hide_nav_bar]] 。'
  },
  'navHideNameReplaceText': { 'zh-cn': '个人主页', 'zh-hk': '個人主頁', 'zh-tw': '個人主頁', 'en': 'My Profile' },
  'widthWeibo': { 'zh-cn': '设置微博宽度为|{{<width>}}像素 {{<i>}}', 'zh-hk': '設置微博寬度為|{{<width>}}圖元 {{<i>}}', 'zh-tw': '設置微博寬度為|{{<width>}}圖元 {{<i>}}', 'en': 'Set width of Weibo to | {{<width>}}px {{<i>}}' },
  'widthWeiboDesc': {
    'zh-cn': '如果您开启了[[tool.sidebar.merge_left_right]]，调整该宽度为 750px 可以恢复原有的页面宽度。'
  },
  'weiboOnly': {
    'zh-cn': '阅读视图|宽度{{<width>}}像素||快捷键{{<key>}}||{{<switch>}}在微博列表顶部显示快捷开关按钮',
    'zh-hk': '閱讀視圖|寬度{{<width>}}圖元||快速鍵{{<key>}}||{{<switch>}}在微博清單頂部顯示快速開關按鈕',
    'zh-tw': '閱讀視圖|寬度{{<width>}}圖元||快速鍵{{<key>}}||{{<switch>}}在微博清單頂部顯示快速開關按鈕',
    'en': 'Reading View | width {{<width>}}px || shortcut {{<key>}} || {{<switch>}} show switch button at top of Weibo list'
  },
  'weiboOnlyButtonDesc': { 'zh-cn': '切换视图', 'zh-hk': '切換視圖', 'zh-tw': '切換視圖', 'en': 'Switch View' },
  'keyInputTip': { 'zh-cn': '按下键盘修改快捷键设置', 'zh-hk': '按下鍵盤修改快速鍵設置', 'zh-tw': '按下鍵盤修改快速鍵設置', 'en': 'Press key to modify shortcut key setting' },
  'setSkin': {
    'zh-cn': '统一所有页面使用|模板{{<skin>}} {{<i>}}',
    'zh-hk': '統一所有頁面使用|模板{{<skin>}} {{<i>}}',
    'zh-tw': '統一所有頁面使用|模板{{<skin>}} {{<i>}}',
    'en': 'Show all pages with | template {{<skin>}} {{<i>}}',
  },
  'setSkinDesc': {
    'zh-cn': '开启后所有页面将显示您选择的模板，包括其他用户的个人主页。模板不会覆盖您在主页自定义的背景图或配色，但是会覆盖个人主页的背景图或配色。模板效果仅在您的浏览器中生效，他人访问您的个人主页时，仍会看到您在微博中设置的模板。<br />模板的选择请参考<a href="//skin.vip.weibo.com/list?topnav=1&wvr=6" target="_blank">模板商店</a>，在模板商店中点击图片预览与应用模板。',
  },
  'setSkinByPreview': {
    'zh-cn': 'Yet Another Weibo Filter 模板设置',
  },
  'setSkinByPreviewDesc': {
    'zh-cn': '您要在 Yet Another Weibo Filter 脚本中使用“{{name}}”模板吗？<br />启用后您访问各种页面时都将使用当前的模板。<br />在脚本中使用皮肤不会影响其他用户查看您个人主页时的模板样式。',
    'zh-hk': '您要在 Yet Another Weibo Filter 腳本中使用「{{name}}」模板嗎？<br />啟用後您訪問各種頁面時都將使用當前的模板。<br />在腳本中使用皮膚不會影響其他用戶查看您個人主頁時的模板樣式。',
    'zh-tw': '您要在 Yet Another Weibo Filter 腳本中使用「{{name}}」模板嗎？<br />啟用後您訪問各種頁面時都將使用當前的模板。<br />在腳本中使用皮膚不會影響其他用戶查看您個人主頁時的模板樣式。',
    'en': 'Do you want to enable the template "{{name}}" in Yet Another Weibo Filter script?<br />All pages will show current template if you choose enable it.',
  },
  'feedListNavFix': { 'zh-cn': '处理消息流导航栏排版错位的问题（临时性）{{<i>}}', 'zh-hk': '處理消息流導航欄排版錯位的問題（臨時性）{{<i>}}', 'zh-tw': '臨時處理消息流導航欄排版錯位的問題（臨時性）{{<i>}}', 'en': 'Fix the wrong layout of feed list nav bar (Temporary) {{<i>}}' },
  'feedListNavFixDesc': {
    'zh-cn': '如果您消息流导航栏的排版出现错位，导致第一条微博的作者头像被显示到右侧，您可以尝试临时打开本功能。如果您没有发现任何异常，请不要开启本功能。注意：微博修复对应功能后您可能需要关闭本功能以保证正常的浏览。',
  },
  // 微博
  'weiboStyleTitle': { 'zh-cn': '微博', 'zh-hk': '微博', 'zh-tw': '微博', 'en': 'Weibo' },
  'unwrapTextDesc': { 'zh-cn': '微博作者和正文同行', 'zh-hk': '微博作者和正文同行', 'zh-tw': '微博作者和正文同行', 'en': 'No line break after author' },
  'unwrapContent': { 'zh-cn': '将微博中的换行显示为|{{<text>}}{{<i>}}', 'zh-hk': '將微博中的換行顯示為|{{<text>}}{{<i>}}', 'zh-tw': '將微博中的換行顯示為|{{<text>}}{{<i>}}', 'en': 'Show line breaks as character |{{<text>}}{{<i>}}' },
  'unwrapContentDesc': {
    'zh-cn': '您还可以在自定义样式中使用“ .yawf-linebreak::before { content: "⏎" } ”自定义。需要设置内容过滤器时您仍需要使用正则表达式<code>\\n</code>表示换行符。'
  },
  'imageSize': { 'zh-cn': '恢复图片大小为正常尺寸 {{<i>}}||{{<repost>}}同时缩小被转发的原微博的宽度', 'zh-hk': '恢復圖片大小為正常尺寸 {{<i>}}||{{<repost>}}同時縮小被轉發的原微博的寬度', 'zh-tw': '恢復圖片大小為正常尺寸 {{<i>}}||{{<repost>}}同時縮小被轉發的原微博的寬度', 'en': 'Restore pictures to normal size {{<i>}}||{{<repost>}} and restore the size of original weibo' },
  'imageSizeDesc': {
    'zh-cn': '缩小图片尺寸仅影响图片在您的网页上的显示效果，不能降低网络数据流量用量。'
  },
  'noWeiboSpace': { 'zh-cn': '移除微博与微博间的空隙', 'zh-hk': '移除微博與微博間的空隙', 'zh-tw': '移除微博與微博間的空隙', 'en': 'Remove space between Weibo' },
  'fromInBottom': { 'zh-cn': '将微博的发布时间和来源移动到微博末尾 {{<i>}}', 'zh-hk': '將微博的發布時間和來源移動到微博末尾 {{<i>}}', 'zh-tw': '將微博的發布時間和來源移動到微博末尾 {{<i>}}', 'en': 'Move timestamp and source of Weibo to bottom {{<i>}}' },
  'userPageNoAuthor': { 'zh-cn': '不在个人主页显示作者头像与用户名|{{<who>}} ', 'zh-hk': '不在個人主頁顯示作者頭像與用戶名|{{<who>}} ', 'zh-tw': '不在個人主頁顯示作者頭像與用戶名|{{<who>}} ', 'en': 'Hide avatar and username of author | on {{<who>}} ' },
  'userPageNoAuthorMine': { 'zh-cn': '仅自己的个人主页', 'zh-hk': '僅自己的個人主頁', 'zh-tw': '僅自己的個人主頁', 'en': 'my user page' },
  'userPageNoAuthorAll': { 'zh-cn': '所有人的个人主页', 'zh-hk': '所有人的個人主頁', 'zh-tw': '所有人的個人主頁', 'en': 'all user pages' },
  'fromInBottomDesc': {
    'zh-cn': '如果您开启了[[style.sweibo.no_weibo_space]]，但未开启本功能，则微博的发布时间和来源将会被隐藏。'
  },
  'hoverShowFold': { 'zh-cn': '鼠标指向被折叠微博时显示内容', 'zh-hk': '滑鼠指向被折疊微博時顯示內容', 'zh-tw': '滑鼠指向被折疊微博時顯示內容', 'en': 'Show folded Weibo when mouse over' },
  'layoutReorder': {
    'zh-cn': '重新排列微博控制按钮{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}',
    'zh-hk': '重新排列微博控制按鈕{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}',
    'zh-tw': '重新排列微博控制按鈕{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}',
    'en': 'Reorder Weibo control buttons{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}'
  },
  'foldedWeiboTextDesc': { 'zh-cn': '被折叠微博的提示信息包含|{{<text>}}', 'zh-hk': '被折疊微博的提示訊息包含|{{<text>}}', 'zh-tw': '被折疊微博的提示訊息包含|{{<text>}}', 'en': 'Show folded weibo with information about | {{<text>}}' },
  'foldedWeiboTextAuthorDesc': { 'zh-cn': '作者', 'zh-hk': '作者', 'zh-tw': '作者', 'en': 'Author' },
  'foldedWeiboTextReasonDesc': { 'zh-cn': '折叠原因', 'zh-hk': '折疊原因', 'zh-tw': '折疊原因', 'en': 'Reason' },
  'foldedWeiboTextAuthorReasonDesc': { 'zh-cn': '作者和折叠原因', 'zh-hk': '作者和折疊原因', 'zh-tw': '作者和折疊原因', 'en': 'Author and reason' },
  'foldedWeiboText': {
    'zh-cn': '"一条微博被折叠，请点击查看"',
    'zh-hk': '"一條微博被折疊，請點擊查看"',
    'zh-tw': '"一條微博被折疊，請點擊查看"',
    'en': '"A Weibo was folded, click to view."'
  },
  'foldedWeiboTextAuthor': {
    'zh-cn': '"来自 @" attr(yawf-author) " 的一条微博被折叠，请点击查看"',
    'zh-hk': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"',
    'zh-tw': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"',
    'en': '"A Weibo from @" attr(yawf-author) " was folded, click to view."'
  },
  'foldedWeiboTextReason': {
    'zh-cn': '"一条微博" attr(yawf-reason) "而被折叠，请点击查看"',
    'zh-hk': '"一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'zh-tw': '"一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'en': '"A Weibo was folded " attr(yawf-reason) ", click to view."'
  },
  'foldedWeiboTextAuthorReason': {
    'zh-cn': '"来自 @" attr(yawf-author) " 的一条微博" attr(yawf-reason) "而被折叠，请点击查看"',
    'zh-hk': '"來自 @" attr(yawf-author) " 的一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'zh-tw': '"來自 @" attr(yawf-author) " 的一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'en': '"A Weibo from @" attr(yawf-author) " was folded " attr(yawf-reason) ", click to view."'
  },
  'layoutReorderDesc': {
    'zh-cn': '您还可以在版面清理选项卡中隐藏您不想看到的按钮，或在此勾选以隐藏：[[layout.weibo.pop]] [[layout.weibo.favourite]] [[layout.weibo.forward]] [[layout.weibo.like]]',
  },
  'layoutReorderPop': { 'zh-cn': '推广', 'zh-hk': '推廣', 'zh-tw': '推廣', 'en': ' Promote' },
  'layoutReorderFavorite': { 'zh-cn': '收藏', 'zh-hk': '收藏', 'zh-tw': '收藏', 'en': 'Favourite' },
  'layoutReorderForward': { 'zh-cn': '转发', 'zh-hk': '轉發', 'zh-tw': '轉發', 'en': 'Forward' },
  'layoutReorderComment': { 'zh-cn': '评论', 'zh-hk': '評論', 'zh-tw': '評論', 'en': 'Comment' },
  'layoutReorderLike': { 'zh-cn': '赞', 'zh-hk': '讚', 'zh-tw': '讚', 'en': 'Like' },
  'layoutCommentReorder': {
    'zh-cn': '重新排列评论控制按钮{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}',
    'zh-hk': '重新排列評論控制按鈕{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}',
    'zh-tw': '重新排列評論控制按鈕{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}',
    'en': 'Reorder comment control buttons{{<i>}}||{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}'
  },
  'layoutCommentReorderDesc': {
    'zh-cn': '您还可以在版面清理选项卡中隐藏您不想看到的按钮，或在此勾选以隐藏：[[layout.weibo.report]] [[layout.weibo.likecomment]]',
  },
  'layoutCommentReorderReport': { 'zh-cn': '举报', 'zh-hk': '舉報', 'zh-tw': '檢舉', 'en': 'Report' },
  'layoutCommentReorderDelete': { 'zh-cn': '删除', 'zh-hk': '刪除', 'zh-tw': '刪除', 'en': 'Delete' },
  'layoutCommentReorderConversition': { 'zh-cn': '查看对话', 'zh-hk': '查看對話', 'zh-tw': '查看對話', 'en': 'View Conversation' },
  'layoutCommentReorderReply': { 'zh-cn': '回复', 'zh-hk': '回覆', 'zh-tw': '回覆', 'en': 'Reply' },
  'layoutCommentReorderLike': { 'zh-cn': '赞', 'zh-hk': '讚', 'zh-tw': '讚', 'en': 'Like' },
  // 颜色
  'colorStyleTitle': { 'zh-cn': '颜色', 'zh-hk': '顏色', 'zh-tw': '顏色', 'en': 'Color' },
  'whitelistHighlightDesc': { 'zh-cn': '高亮显示白名单的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '高亮顯示白名單的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '高亮顯示白名單的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'en': 'Highlight Weibo in whitelist with | background color {{<color>}} | transparency {{<transparency>}}%' },
  'colorOverride': {
    'zh-cn': '修改网页配色（半透明背景）{{<i>}}||主背景色{{<color2>}}|透明度{{<transparency2>}}%||副背景色{{<color1>}}|透明度{{<transparency1>}}%||输入框背景色{{<color3>}}|透明度{{<transparency3>}}%',
    'zh-hk': '修改網頁配色（半透明背景）{{<i>}}||主背景色{{<color2>}}|透明度{{<transparency2>}}%||副背景色{{<color1>}}|透明度{{<transparency1>}}%||輸入方塊背景色{{<color3>}}|透明度{{<transparency3>}}%',
    'zh-tw': '修改網頁配色（半透明背景）{{<i>}}||主背景色{{<color2>}}|透明度{{<transparency2>}}%||副背景色{{<color1>}}|透明度{{<transparency1>}}%||輸入方塊背景色{{<color3>}}|透明度{{<transparency3>}}%',
    'en': 'Change colors on page (Semi-transparent background) {{<i>}} || Primary Color {{<color2>}} | transparency {{<transparency2>}}% || Secondary Color {{<color1>}} | transparency {{<transparency1>}}% || Input box {{<color3>}} | transparency {{<transparency3>}}%'
  },
  'colorOverrideDesc': {
    'zh-cn': '推荐配合[[style.layout.set_skin]]使用，在各种页面达到一致的效果。'
  },
  // 层叠样式表
  'CSSTitle': { 'zh-cn': '样式', 'zh-hk': '樣式', 'zh-tw': '樣式', 'en': 'CSS' },
  'userstyleTitle': {
    'zh-cn': '<span>自定义CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">在 userstyles.org 上搜索样式</a><a class="yawf-userstyles-tip" target="_blank" href="https://tiansh.github.io/yawf/stylish.html">常用自定义CSS</a></span>{{}}',
    'zh-hk': '<span>自訂CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">在 userstyles.org 上搜尋樣式</a><a class="yawf-userstyles-tip" target="_blank" href="https://tiansh.github.io/yawf/stylish.html">常用自訂CSS</a></span>{{}}',
    'zh-tw': '<span>自訂CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">在 userstyles.org 上搜尋樣式</a><a class="yawf-userstyles-tip" target="_blank" href="https://tiansh.github.io/yawf/stylish.html">常用自訂CSS</a></span>{{}}',
    'en': '<span>Customize CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">Search styles on userstyles.org</a><a class="yawf-userstyles-tip" target="_blank" href="https://tiansh.github.io/yawf/stylish.html">Common Customize CSS</a></span>{{}}'
  },
  'userstyleEditDesc': { 'zh-cn': '编辑 YAWF 自定义 CSS', 'zh-hk': '編輯 YAWF 自訂 CSS', 'zh-tw': '編輯 YAWF 自訂 CSS', 'en': 'Edit YAWF Customize CSS' },
  'userstyleEditDetails': { 'zh-cn': 'YAWF 自定义 CSS：', 'zh-hk': 'YAWF 自訂 CSS：', 'zh-tw': 'YAWF 自訂 CSS：', 'en': 'YAWF Customize CSS：' },
  // 脚本
  'scriptFilterGroupTitle': { 'zh-cn': '关于脚本', 'zh-hk': '關於腳本', 'zh-tw': '關於腳本', 'en': 'About Script' },
  // 全选该分组
  'configSelectAllDesc': { 'zh-cn': '全选本组', 'zh-hk': '全選本組', 'zh-tw': '全選本組', 'en': 'Select Group' },
  // 导入导出
  'configImportAndExport': { 'zh-cn': '设置', 'zh-hk': '設定', 'zh-tw': '設定', 'en': 'Setting' },
  'configImportButton': { 'zh-cn': '导入', 'zh-hk': '匯入', 'zh-tw': '匯入', 'en': 'Import' },
  'configImportWarningTitle': { 'zh-cn': '设置导入', 'zh-hk': '設定匯入', 'zh-tw': '設定匯入', 'en': 'Setting Import' },
  'configImportWarning': {
    'zh-cn': '导入的设置会覆盖您当前已有的设置，确实要导入设置吗？',
    'zh-hk': '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？',
    'zh-tw': '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？',
    'en': 'The imported settings may replace your current settings. Are you sure you want to import this file?'
  },
  'configImportSuccessTitle': { 'zh-cn': '设置导入完成', 'zh-hk': '設定匯入完成', 'zh-tw': '設定匯入完成', 'en': 'Import settings completed' },
  'configImportSuccess': { 'zh-cn': '已经成功地导入了设置', 'zh-hk': '已经成功地匯入了設定', 'zh-tw': '已经成功地匯入了設定', 'en': 'Successfully imported settings' },
  'configImportFailTitle': { 'zh-cn': '设置导入失败', 'zh-hk': '設定匯入失败', 'zh-tw': '設定匯入失败', 'en': 'Import settings failed' },
  'configImportFail': {
    'zh-cn': '导入设置文件时出现错误，可能是使用了错误的文件，文件已损坏或文件的版本不支持',
    'zh-hk': '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案已損壞或為不支援的版本',
    'zh-tw': '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案已損壞或為不支援的版本',
    'en': 'Error occurred during importing process. Wrong file may be used, the file may be broken, or the version of setting file is not supported.'
  },
  'configExportButton': { 'zh-cn': '导出', 'zh-hk': '匯出', 'zh-tw': '匯出', 'en': 'Export' },
  'configResetButton': { 'zh-cn': '重置', 'zh-hk': '重設', 'zh-tw': '重設', 'en': 'Reset' },
  'configResetWarningTitle': { 'zh-cn': '设置重置', 'zh-hk': '設定重設', 'zh-tw': '設定重設', 'en': 'Setting Reset' },
  'configResetWarning': { 'zh-cn': '这将会清空您当前的所有配置，确实要重置设置吗？', 'zh-hk': '這將會清空您當前的所有設定，您確定要重置設定嗎？', 'zh-tw': '這將會清空您當前的所有設定，您確定要重置設定嗎？', 'en': 'You are deleting all your settings. Are you sure you want to reset your settings?' },
  'configImportWbpButton': { 'zh-cn': '从“眼不见心不烦”导入设置', 'zh-hk': '從“眼不見心不煩”匯入設定', 'zh-tw': '從“眼不見心不煩”匯入設定', 'en': 'Import from Weibo Cleaner (眼不见心不烦)' },
  'configImportWbpWarning': {
    'zh-cn': '注意：从其他脚本导入设置时，因为脚本的具体功能与实现方式等不同，导入工具的能力限制等原因，转换前后并非完全相同。',
    'zh-hk': '注意：從其他腳本匯入設定時，因為腳本的具體功能與實現方式等不同，導入工具的能力限制等原因，轉換前後並非完全相同。',
    'zh-tw': '注意：從其他腳本匯入設定時，因為腳本的具體功能與實現方式等不同，導入工具的能力限制等原因，轉換前後並非完全相同。',
    'en': 'Note: Settings imported from other scripts may be modified due to the difference of functions and implementations, and the limitation of this settings importing tool.',
  },
  // 更新
  'updateInfoTitle': { 'zh-cn': '更新', 'zh-hk': '更新', 'zh-tw': '更新', 'en': 'Update' },
  'updateInfoDescription': { 'zh-cn': '更新后显示新功能提示', 'zh-hk': '更新後顯示新功能提示', 'zh-tw': '更新後顯示新功能提示', 'en': 'Show new features after update' },
  'installSuccessTitle': { 'zh-cn': 'YAWF 安装成功', 'zh-hk': '安裝成功', 'zh-tw': '安裝成功', 'en': 'Installation successed' },
  'installSuccessText': {
    'zh-cn': '感谢您安装 YAWF 脚本。您可以点击右上角的漏斗图标打开过滤器设置。此外您还可以选中并拖拽关键字、帐号、话题、来源等内容到网页右上角，快速创建过滤器。',
    'zh-hk': '感謝您安裝 YAWF 腳本。您可以點擊右上角的漏斗圖示打開過濾器設置。此外您還可以選中並拖拽關鍵字、帳號、話題、來源等內容到網頁右上角，快速創建過濾器。',
    'zh-tw': '感謝您安裝 YAWF 腳本。您可以點擊右上角的漏斗圖示打開過濾器設置。此外您還可以選中並拖拽關鍵字、帳號、話題、來源等內容到網頁右上角，快速創建過濾器。',
    'en': 'Thank you for installing YAWF. You can click on the funnel icon at the top-right corner to open up filter setting menu. You may also quickly create filters by dragging and dropping keywords, accounts, topics and sources to the top-right corner.'
  },
  'updateSuccessTitle': { 'zh-cn': 'Yet Another Weibo Filter 新功能提示', 'zh-hk': 'Yet Another Weibo Filter 新功能提示', 'zh-tw': 'Yet Another Weibo Filter 新功能提示', 'en': 'Yet Another Weibo Filter new features notification' },
  'updateSuccessHeader': { 'zh-cn': '您的 YAWF 脚本已更新', 'zh-hk': '您的 YAWF 腳本已更新', 'zh-tw': '您的 YAWF 腳本已更新', 'en': 'Your YAWF script has been updated' },
  'updateSuccessDesc': { 'zh-cn': '当前版本添加或更新了以下{{count}}项功能', 'zh-hk': '當前版本添加或更新了以下{{count}}項功能', 'zh-tw': '當前版本添加或更新了以下{{count}}項功能', 'en': 'The current version has added or updated the following {{count}} feature(s)' },
  // 从眼不见心不烦导入设置
  'wbpImportSuccessTitle': { 'zh-cn': 'Yet Another Weibo Filter 设置导入完成', 'zh-hk': 'Yet Another Weibo Filter 設定匯入完成', 'zh-tw': 'Yet Another Weibo Filter 設定匯入完成', 'en': 'Yet Another Weibo Filter setting imported Successfully' },
  'wbpImportSuccessHeader': { 'zh-cn': '已经从 眼不见心不烦 导入了设置', 'zh-hk': '已經從 眼不見心不煩 匯入了設定', 'zh-tw': '已經從 眼不見心不煩 匯入了設定', 'en': 'Imported Settings from 眼不见心不烦' },
  'wbpImportSuccessDesc': { 'zh-cn': '以下{{count}}项功能因脚本的差异或导入工具的限制需要您设置', 'zh-hk': '以下{{count}}項功能因腳本的差異或匯入工具的限制需要您設定', 'zh-tw': '以下{{count}}項功能因腳本的差異或匯入工具的限制需要您設定', 'en': 'Check out following {{count}} features. These features are different from the script or setting cannot be converted.' },
  // 杂项
  'scriptOtherTitle': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  'autoCompleteConfig': { 'zh-cn': '设置窗口中使用自动补全{{<i>}}', 'zh-hk': '設定方塊內使用自動完成{{<i>}}', 'zh-tw': '設定方塊內使用自動完成{{<i>}}', 'en': 'Use auto complete in setting dialog {{<i>}}' },
  'autoCompleteConfigDesc': {
    'zh-cn': '启用该功能后，脚本会在您输入用户名或话题的时候提供候选项方便您输入。您输入的内容将会实时发送到微博的服务器上以便获取推荐列表。',
  },
  'searchEnable': { 'zh-cn': '在搜索页面启用脚本（试验性）', 'zh-hk': '在搜尋網頁啟用腳本（試驗性）', 'zh-tw': '在搜尋網頁啟用腳本（試驗性）', 'en': 'Enable on search page (Experimental)' },
  // 调试
  'scriptDebugTitle': { 'zh-cn': '调试', 'zh-hk': '偵錯', 'zh-tw': '偵錯', 'en': 'Debug' },
  'scriptDebug': { 'zh-cn': '在控制台打印调试信息{{<i>}}', 'zh-hk': '將偵錯訊息列印到主控台{{<i>}}', 'zh-tw': '將偵錯訊息列印到主控台{{<i>}}', 'en': 'Print debug info to console {{<i>}}' },
  'scriptDebugDesc': {
    'zh-cn': '如果您的脚本出现问题，您可以打开调试功能后向作者提供控制台的输出以方便解决问题。但请注意，<strong>打开调试功能可能会增加内存占用、降低网页的反应速度甚至导致浏览卡顿</strong>。调试功能供脚本开发和维护使用，<strong>不建议一般用户打开调试功能</strong>。'
  },
  // 关于
  'scriptAboutTitle': { 'zh-cn': '关于', 'zh-hk': '關於', 'zh-tw': '關於', 'en': 'About' },
  'scriptAbout': {
    'zh-cn': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>您可以关注 <a href="//weibo.com/yawfscript" usercard="id=5601033111" target="_blank" rel="noreferrer">@YAWF脚本</a> 了解脚本最新的更新。<br />如果您觉得脚本给您很大的帮助，帮助宣传脚本是对我们最大的支持。</p><p>如果您在使用过程中遇到任何脚本的错误，或对脚本有任何建议，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">反馈页面</a>提供报告，或<a action-data="uid=5601033111&nick=YAWF脚本" action-type="webim.conversation" href="javascript:;">私信 @YAWF脚本</a> ；反馈前建议先阅读<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常见问题</a>。</p><p>脚本使用 MIT 协议开放源代码，作者 <a href="//weibo.com/tsh90" usercard="id=3921589057" target="_blank" rel="noreferrer">@tsh90</a> ，您可以<a href="https://github.com/tiansh/yawf" target="_blank" rel="noreferrer">在 GitHub 上查阅</a>，欢迎任何人贡献代码。<br />脚本中参考并使用了 <a href="https://bitbucket.org/salviati/weibo-cleaner" target="_blank" rel="noreferrer">眼不见心不烦</a> 的部分代码。</p>',
    'zh-hk': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>您可以關注 <a href="//weibo.com/yawfscript" usercard="id=5601033111" target="_blank" rel="noreferrer">@YAWF腳本</a> 瞭解腳本最新的更新。<br />如果您覺得腳本給您很大的幫助，幫助宣傳腳本是對我們最大的支持。</p><p>如果您在使用過程中遇到任何腳本的錯誤，或對腳本有任何建議，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">回饋頁面</a>提供報告，或<a action-data="uid=5601033111&nick=YAWF脚本" action-type="webim.conversation" href="javascript:;">私信 @YAWF脚本</a> ；回饋前建議先閱讀<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常見問題（簡體）</a>。</p><p>腳本使用 MIT 協定開放原始程式碼，作者 <a href="//weibo.com/tsh90" usercard="id=3921589057" target="_blank" rel="noreferrer">@tsh90</a> ，您可以<a href="https://github.com/tiansh/yawf" target="_blank" rel="noreferrer">在 GitHub 上查閱</a>，歡迎任何人貢獻程式碼。<br />腳本中參考並使用了 <a href="https://bitbucket.org/salviati/weibo-cleaner" target="_blank" rel="noreferrer">眼不見心不煩</a> 的部分程式碼。</p>',
    'zh-tw': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>您可以關注 <a href="//weibo.com/yawfscript" usercard="id=5601033111" target="_blank" rel="noreferrer">@YAWF腳本</a> 瞭解腳本最新的更新。<br />如果您覺得腳本給您很大的幫助，幫助宣傳腳本是對我們最大的支持。</p><p>如果您在使用過程中遇到任何腳本的錯誤，或對腳本有任何建議，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">回饋頁面</a>提供報告，或<a action-data="uid=5601033111&nick=YAWF脚本" action-type="webim.conversation" href="javascript:;">私信 @YAWF脚本</a> ；回饋前建議先閱讀<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常見問題（簡體）</a>。</p><p>腳本使用 MIT 協定開放原始程式碼，作者 <a href="//weibo.com/tsh90" usercard="id=3921589057" target="_blank" rel="noreferrer">@tsh90</a> ，您可以<a href="https://github.com/tiansh/yawf" target="_blank" rel="noreferrer">在 GitHub 上查閱</a>，歡迎任何人貢獻程式碼。<br />腳本中參考並使用了 <a href="https://bitbucket.org/salviati/weibo-cleaner" target="_blank" rel="noreferrer">眼不見心不煩</a> 的部分程式碼。</p>',
    'en': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>Follow <a href="//weibo.com/yawfscript" namecard="id=5601033111" target="_blank" rel="noreferrer">@YAWF脚本</a> for last update info.<br />Please help us spread the word if the script helps you.</p><p>If you find any bugs or have feature requests, please report them in the <a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">issues page</a>, or <a action-data="uid=5601033111&nick=YAWF脚本" action-type="webim.conversation" href="javascript:;">send message to @YAWF脚本</a> . Please read <a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">FQA (Chinese)</a> page for common questions.</p><p>The script is liscensed under the MIT License. Author is <a href="//weibo.com/tsh90" usercard="id=3921589057" target="_blank" rel="noreferrer">@tsh90</a>. You may <a href="https://github.com/tiansh/yawf" target="_blank" rel="noreferrer">view the project on GitHub</a>. Pull request is welcomed.<br />Some codes of this script come from <a target="_blank" href="https://bitbucket.org/salviati/weibo-cleaner" rel="noreferrer"><span lang="zh-cn">眼不见心不烦</span> (Weibo Cleaner)</a> script.</p>',
  },
  // 拖拽
  'dropAreaTitle': { 'zh-cn': '拖放至此<br />快速创建过滤器', 'zh-hk': '拖放至此<br />快速創建篩選器', 'zh-tw': '拖放至此<br />快速創建篩選器', 'en': 'Drop Here to Create Filter' },
  'dropAreaText': {
    'zh-cn': '将要设置过滤器的内容拖拽至此，即可快速创建过滤器。现已可识别：<br /><ul><li>微博正文的文字或链接</li><li>用户头像或链接</li><li>话题</li><li>来源链接</li></ul>',
    'zh-hk': '將要設置篩選器的內容拖拽至此，即可快速創建篩選器。現已可識別：<br /><ul><li>微博正文的文字或連結</li><li>使用者頭像或連結</li><li>話題</li><li>來源連結</li></ul>',
    'zh-tw': '將要設置篩選器的內容拖拽至此，即可快速創建篩選器。現已可識別：<br /><ul><li>微博正文的文字或連結</li><li>使用者頭像或連結</li><li>話題</li><li>來源連結</li></ul>',
    'en': 'Drop items here to create filter. These items may be recognized:<br /><ul><li>Text or link in Weibo content</li><li>Avatar or user link</li><li>topic</li><li>source</li></ul>'
  },
  'fastCreateChoseTitle': { 'zh-cn': '创建过滤器', 'zh-hk': '創建篩選器', 'zh-tw': '創建篩選器', 'en': 'Create Filter' },
  'fastFilterChoseText': { 'zh-cn': '请选择要创建的过滤器：', 'zh-hk': '請選擇要創建的篩選器：', 'zh-tw': '請選擇要創建的篩選器：', 'en': 'Chose the filter(s) you want:' },
  // 扩展
  'scriptExtensionTitle': { 'zh-cn': '扩展', 'zh-hk': '擴充', 'zh-tw': '擴充', 'en': 'Extension' },
  'scriptExtensionEnable': { 'zh-cn': '启用对 YAWF 的扩展', 'zh-hk': '啟用對 YAWF 的擴充', 'zh-tw': '啟用對 YAWF 的擴充', 'en': 'Enable Extension for YAWF' },
  'scriptExtensionWarning': {
    'zh-cn': '注意，扩展以用户脚本的形式安装，您只应当从您信任的来源安装用户脚本，恶意的脚本可能会侵犯您的隐私并在您不知情的情况下以您的名义进行操作。如果您希望编写 YAWF 的扩展，请参考常见问题。',
    'zh-hk': '注意，擴充以用戶腳本的形式安裝，您只應當從您信任的來源安裝用戶腳本，惡意的腳本可能會危害您的隱私，並在您不知情的情況下以您的名義執行。如果您希望撰寫 YAWF 的擴展，請參考常見問題（簡體）。',
    'zh-tw': '注意，擴充以用戶腳本的形式安裝，您只應當從您信任的來源安裝用戶腳本，惡意的腳本可能會危害您的隱私，並在您不知情的情況下以您的名義執行。如果您希望撰寫 YAWF 的擴展，請參考常見問題（簡體）。',
    'en': 'Notice: Extension was installed as userscript. You should only install scripts trusted. Malicious scripts can violate your privacy and act on your behalf without your knowledge. Please refer to the FQA Page, if you want to write your extension for YAWF.',
  },
  'subscribeFilterGroupTitle': { 'zh-cn': '规则订阅', 'zh-hk': '規則訂閱', 'zh-tw': '規則訂閱', 'en': 'Subscribe' },
  'subscribeListTitle': { 'zh-cn': '订阅的规则', 'zh-hk': '訂閱的規則', 'zh-tw': '訂閱的規則', 'en': 'Rules Subscribed' },
  'subscribeDisableButton': { 'zh-cn': '禁用' },
  'subscribeEnableButton': { 'zh-cn': '启用' },
  'subscribeDetailButton': { 'zh-cn': '详细' },
  'extensionFilterGroupTitle': { 'zh-cn': '扩展功能', 'zh-hk': '擴充功能', 'zh-tw': '擴充功能', 'en': 'Extension' },
};

// 页面常量
var html = {
  '|': '</label><label>', // 先关闭前面的label，再从后面开一个，所以这里没写反
  '||': '</label><br /><label>',
  'select': '<select>{{options}}</select>',
  'option': '<option value="{{value}}">{{{text}}}</option>',
  // 对话框
  'cover': '<div node-type="outer" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none repeat scroll 0% 0% rgb(0, 0, 0); opacity: 0.3; z-index: 9999;"></div>',
  'dialog': '<div id="{{id}}" class="W_layer yawf-Layer" style="top: 193px; left: 376px;"><div tabindex="0"></div><div class="content" node-type="autoHeight"><div class="W_layer_title" node-type="title" style="">{{title}}</div><div class="W_layer_close"><a class="W_ficon ficon_close S_ficon" href="javascript:void(0);" node-type="close">X</a></div><div node-type="inner"></div></div></div>',
  'alert': '<div class="W_layer yawf-Layer" id="{{id}}"><div tabindex="0"></div><div class="content"><div class="W_layer_title" node-type="title">{{title}}</div><div class="W_layer_close"><a class="W_ficon ficon_close S_ficon" node-type="close" href="javascript:void(0);">X</a></div><div node-type="inner"><div class="layer_point"><dl class="point clearfix"><dt node-type="icon"><span class="W_icon icon_{{icon}}B"></span></dt><dd node-type="text"><p class="S_txt1">{{text}}</p></dd></dl></div></div><div class="W_layer_btn S_bg1"><a action-type="ok" node-type="ok" class="W_btn_a btn_34px" href="javascript:void(0);"><span>{{okButtonTitle}}</span></a></div></div></div>',
  'confirm': '<div class="W_layer yawf-Layer" id="{{id}}"><div tabindex="0"></div><div class="content"><div class="W_layer_title" node-type="title">{{title}}</div><div class="W_layer_close"><a class="W_ficon ficon_close S_ficon" node-type="close" href="javascript:void(0);">X</a></div><div node-type="inner"><div class="layer_point"><dl class="point clearfix"><dt node-type="icon"><span class="W_icon icon_{{icon}}B"></span></dt><dd node-type="text"><p class="S_txt1">{{text}}</p></dd></dl></div></div><div class="W_layer_btn S_bg1"><a action-type="ok" node-type="ok" class="W_btn_a btn_34px" href="javascript:void(0);"><span>{{okButtonTitle}}</span></a><a action-type="cancel" node-type="cancel" class="W_btn_b btn_34px" href="javascript:void(0);"><span>{{cancelButtonTitle}}</span></a></div></div></div>',
  'bubble': '<div class="W_layer yawf-Layer W_layer_pop yawf-bubble"><div class="content layer_mini_info"><div class="main_txt">{{{text}}}</div><div class="W_layer_arrow"><span class="W_arrow_bor" node-type="arrow"><i class="S_line3"></i><em class="S_bg2_br"></em></span><div></div></div></div></div>',
  // 漏斗图标
  'icon': '<div class="gn_set_list yawf-gn_set_list"><a node-type="filter" href="javascript:void(0);" class="gn_filter"><em class="W_ficon ficon_mail S_ficon">Y</em></a></div>',
  'menuitem': '<ul><li class="line S_line1 yawf-config-menuline"></li><li><a href="javascript:void(0);" class="yawf-config-menuitem">{{filterMenuItem}}</a></li></ul>',
  // 设置窗口
  'configHeaderTop': '<div class="WB_minitab yawf-config-header" node-type="yawf-config-header"><ul class="minitb_ul S_line1 S_bg1 clearfix">',
  'configHeaderItem': '<li class="minitb_item S_line1 {{liclass}}"><a class="minitb_lk S_txt1 {{aclass}}" action-type="tab_item" onclick="return false;" href="javascript:void(0);">{{name}}</a><span class="yawf-cur_block"></span></li>',
  'configHeaderSearch': '<li class="minitb_item S_line1"><label class="minitb_lk S_txt1"><input id="yawf-config-search" class="yawf-config-search" type="search" /><span class="yawf-config-search-logo W_ficon S_txt2">f</span><span class="yawf-cur_block"></span></label></li>',
  'configHeaderBottom': '</ul></div>',
  'configLayerTop': '<div node-type="yawf-config-body" class="yawf-config-body yawf-window-body">',
  'configLayerItem': '<div class="{{name}} yawf-config-layer" node-type="{{name}}" style="display: none;"></div>',
  'configLayerBottom': '</div>',
  'configFooter': '',
  'searchNotFound': '<div class="WB_empty"><div class="WB_innerwrap"><div class="empty_con clearfix"><p class="icon_bed"><i class="W_icon icon_warnB"></i></p><p class="text">{{searchNotFound}}</p></div></div></div>',
  'sicon': '<i class="W_icon icon_{{icon}}S yawf-configSIcon"></i>',
  // 设置窗口内文字
  'configDefault': '<div class="yawf-text">{{{text}}}</div>',
  'configSubtitle': '<div class="yawf-groupSubtitle">{{{text}}}</div>',
  'configText': '<div class="yawf-groupText">{{{text}}}</div>',
  'configRemark': '<div class="yawf-groupRemark">{{{text}}}</div>',
  'configLabel': '<div class="yawf-groupLabel"><label>{{{text}}}</label></div>',
  // 设置项
  'configBoolean': '<div class="yawf-configBoolean yawf-configItem"><label>{{text}}</label></div>',
  'configBooleanInput': '<div class="yawf-configInput yawf-configBooleanInput"><input yawf-ci="{{key}}" class="W_checkbox yawf-configBooleanInput" type="checkbox" name="yawf-{{key}}"></div>',
  'configSelect': '<div class="yawf-configSelect yawf-configItem"><label>{{text}}</label></div>',
  'configSelectInput': '<div class="yawf-configInput yawf-configSelectInput"><select yawf-ci="{{key}}" class="yawf-configSelectSelect" name="yawf-{{key}}"></select></div>',
  'configString': '<div class="yawf-configString yawf-configItem"><label>{{text}}</label></div>',
  'configStringInput': '<div class="yawf-configInput yawf-configStringInput"><textarea yawf-ci="{{key}}" class="W_input yawf-configStringInput" name="yawf-{{key}}"></textarea></div>',
  'configColor': '<div class="yawf-configColor yawf-configItem"><label>{{text}}</label></div>',
  'configColorInput': '<div class="yawf-configInput yawf-configColorInput"><input yawf-ci="{{key}}" class="W_f14 yawf-configColorInput" name="yawf-{{key}}" type="color" style="width: 40px;" /></div>',
  'configNumber': '<div class="yawf-configNumber yawf-configItem"><label>{{text}}</label></div>',
  'configNumberInput': '<div class="yawf-configInput yawf-configNumberInput"><input yawf-ci="{{key}}" type="number" class="W_f14 yawf-configNumberInput" name="yawf-{{key}}" style="width: 60px;" /></div>',
  'configRange': '<div class="yawf-configRange yawf-configItem"><label>{{text}}</label></div>',
  'configRangeInput': '<div class="yawf-configInput yawf-configRangeInput"><input type="number" min="0" max="100" maxlength="3" yawf-ci="{{key}}" class="W_f14 yawf-configRangeInput" style="text-align: right;" name="yawf-{{id}}" /><div class="yawf-range-container"><input type="range" style="height: 1em; width: 66px; margin-left: 7px; margin-right: 7px; " tabindex="-1" /></div></div>',
  'configKey': '<div class="yawf-configKey yawf-configItem"><label>{{text}}</label></div>',
  'configKeyInput': '<div class="yawf-configInput yawf-configKeyInput"><button class="W_f14 yawf-configKeyName"></button><input type="hidden" yawf-ci="{{key}}" name="yawf-{{key}}" /><span class="yawf-configKeyTip">{{keyInputTip}}</span></div>',
  'configSubscribe': '<div class="yawf-configSubscribe yawf-configItem "><div class="yawf-configSubscribeIcon"><img width="64" height="64" src="{{icon}}"></div><div class="yawf-configSubscribeTitle"><div class="yawf-configSubscribeName">{{name}}</div><div class="yawf-configSubscribeDate">{{date}}</div></div><div class="yawf-configSubscribeInfo">{{description}}</div><div class="yawf-configSubscribeButton"><a href="javascript:;" class="W_btn_b yawf-subscribeDisable"><span class="W_f14">{{subscribeDisableButton}}</span></a><a href="javascript:;" class="W_btn_b yawf-subscribeEnable"><span class="W_f14">{{subscribeEnableButton}}</span></a><a href="" target="_blank" rel="noreferrer" class="W_btn_b yawf-subscribeDetail"><span class="W_f14">{{subscribeDetailButton}}</span></a></div></div>',
  'configStrings': '<div class="yawf-configStrings yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configStringsDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configStringsInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configStringsAdd}}</span></button></form><ul class="yawf-configStringsItems yawf-configItems"></ul></div>',
  'configStringsItem': '<li class="W_btn_b W_btn_tag yawf-configStringsItem" node-type="tag_item" title="{{[item]}}"><a class="W_ficon ficon_close S_ficon" href="javascript:void(0);">X</a>{{[item]}}</li>',
  'configUsers': '<div class="yawf-configUsers yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configUsersDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configUsersInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configUsersAdd}}</span></button></form><ul class="yawf-configUsersItems yawf-configItems"></ul></div>',
  'configUsersItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}"></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><span class="object_name" uid="{{id}}" title="{{name}}">{{name}}</span></p><p class="W_fr"><a class="W_ficon ficon_close S_ficon" action-data="uid={{id}}" href="javascript:void(0);">X</a></p></div><div class="other_info"></div></div></div></div></li>',
  'configPrefill': '<span class="yawf-configPrefill" id="{{id}}"></span>',
  'scriptIcon': '<div id="yawf-script-icon" style="background: url({{icon}}); width: 72px; height: 72px; float: right; margin: 0 2em"></div>',
  'refConfigItem': '<span yawf-ref="{{ref}}"></span>',
  // 自动补全功能
  'suggestionContainer': '<div class="layer_menu_list yawf-autoCompleteList" yawf-complete-items="0"><ul></ul></div>',
  'suggestionItem': '<li yawf-suggestion="{{text}}"><a>{{text}}</a></li>',
  // 选中当前分组所有
  'configSelectAll': '<div class="yawf-configSelectAll yawf-configItem"><a class="W_btn_b" href="javascript:;"><span class="W_f12">{{configSelectAllDesc}}</span></a></div>',
  // 导入导出
  'configImportExport': '<div class="yawf-configImportExport yawf-configItem"><label><input type="file" style=" width: 1px; height: 1px; margin: 0 -1px 0 0; opacity: 0;" /><span class="W_btn_b yawf-import"><span class="W_f14">{{configImportButton}}</span></span></label><a class="W_btn_b yawf-export" href="javascript:;"><span class="W_f14">{{configExportButton}}</span></a><a class="W_btn_b yawf-reset" href="javascript:;"><span class="W_f14">{{configResetButton}}</span></a></div>',
  'configImportWbp': '<div class="yawf-configImportWbp yawf-configItem"><a class="W_btn_b" href="javascript:;"><span class="W_f14">{{configImportWbpButton}}</span></a><br /><div class="yawf-groupRemark">{{configImportWbpWarning}}</div></div>',
  // 新功能提示对话框
  'whatsNewHeader': '<div class="yawf-whats-new-header yawf-window-header">{{updateSuccessHeader}}</div>',
  'whatsNewBody': '<div class="yawf-whats-new-body yawf-window-body"><div class="yawf-whats-new-desc yawf-window-desc">{{updateSuccessDesc}}</div></div>',
  'whatsNewFooter': '<div class="yawf-whats-new-footer yawf-window-footer"><hr /></div>',
  'whatsNewBottom': '<div class="yawf-whats-new-bottom yawf-window-bottom"></div>',
  // 从 WBP 导入成功对话框
  'wbpImportSuccessHeader': '<div class="wbp-import-success-header">{{wbpImportSuccessHeader}}</div>',
  'wbpImportSuccessBody': '<div class="wbp-import-success-body yawf-window-body"><div class="wbp-import-success-desc">{{wbpImportSuccessDesc}}</div></div>',
  // 合并左边栏占位符
  'leftFake': '<div style="display: none !important;" id="yawf-left-fake"></div>',
  // 左栏显示消息
  'leftMsgHeader': '<div class="lev_Box lev_Box_noborder yawf-leftMsg"><h3 class="lev"><a href="/at/weibo?leftnav=1" class="S_txt1" node-type="item" suda-uatrack="key=V6update_leftnavigate&amp;value=message" bpfilter="message"><span class="levtxt">{{leftNavMsg}}</span></a></h3>',
  'leftMsgAtMe': '<div class="lev" yawf-id="leftnav_msg_at"><a class="S_txt1" nm="mention_all" bpfilter="message" hrefextra="/at/weibo|/at/comment" nt="mention" node-type="item" href="/at/weibo?leftnav=1&amp;wvr=6&amp;nofilter=1"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">{{leftNavAtMe}}</span></a></div>',
  'leftMsgCmt': '<div class="lev" yawf-id="leftnav_msg_cmt"><a class="S_txt1" nm="cmt_all" bpfilter="message" hrefextra="/comment/inbox|/comment/outbox" node-type="item" href="/comment/inbox?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">{{leftNavCmt}}</span></a></div>',
  'leftMsgLike': '<div class="lev" yawf-id="leftnav_msg_like"><a class="S_txt1" nm="attitude" bpfilter="message" node-type="item" href="/like/inbox?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">{{leftNavLike}}</span></a></div>',
  'leftMsgDM': '<div class="lev" yawf-id="leftnav_msg_dm"><a class="S_txt1" nm="dm" bpfilter="message" hrefextra="/messages|/message/history" node-type="item" href="/messages?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">{{leftNavDM}}</span></a></div>',
  'leftMsgBox': '<div class="lev" yawf-id="leftnav_msg_msgbox"><a class="S_txt1" nm="msgbox_c" bpfilter="message" node-type="item" href="/notesboard?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">{{leftNavMsgBox}}</span></a></div>',
  'leftMsgGroup': '<div class="lev" yawf-id="leftnav_msg_group"><a class="S_txt1" nm="chat_group_notice" bpfilter="message" node-type="item" href="/messages?leftnav=1&amp;wvr=6&amp;is_notice=1"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt">{{leftNavGroup}}</span></a></div>',
  'leftMsgDMSub': '<div class="lev" yawf-id="leftnav_msg_dmsub"><a class="S_txt1" nm="dm_group" bpfilter="message" node-type="item" href="/message/sub?leftnav=1&wvr=6"><span class="ico_block"><em class="W_ficon ficon_dot S_ficon" node-type="left_item">D</em></span><span class="levtxt">{{leftNavDMSub}}</span></a></div>',
  'leftMsgFooter': '</div>',
  // 右侧栏收藏用户列表
  'rightUserList': '<div id="yawf-rightmod_userlist"><div class="WB_cardwrap S_bg2"><div ucardconf="type=1" class="WB_right_module"><div class="WB_cardtitle_b S_line2"><h4 class="obj_name"><span title="{{rightUserListTitle}}" class="main_title W_fb W_f14 S_txt1"></a>{{rightUserListTitle}}</h4><div class="opt_box"><a class="W_ficon ficon_setup S_ficon">J</a></div></div><div class="WB_innerwrap"><div class="m_wrap clearfix"><ul class="group_list"></ul></div></div></div></div></div>',
  'rightUserListItem': '<li node-type="row" class="S_line2"><div class="pic"><a href="/u/{{id}}" title="{{name}}" target="_blank"><img width="30" height="30" src="{{avatar}}" alt="{{name}}" usercard="id={{id}}"></a></div><div class="con"><p class="name"><a usercard="id={{id}}" href="/u/{{id}}" class="S_txt1 W_fb" target="_blank">{{name}}</a><span class="W_new" style="display:none"></span></p></div></li>',
  'rightUserListConfig': '<div class="yawf-fave-people-config-body yawf-window-body"></div>',
  // 屏蔽微博
  'hideBoxSimple': '<div class="yawf-hide_box"><a href="javascript:void(0);" title="{{hideThisWeibo}}"><i class="W_ficon ficon_close S_ficon">X</i></a></div>',
  // 查看原图
  'viewOriginalLink': '<li><span class="line S_line1"><a class="S_txt1" href="javascript:;" target="_blank"><i class="W_ficon ficon_search S_ficon">l</i>{{viewOriginalText}}</a></span></li>',
  'viewOriginalFCLink': '<a imagecard="pid={{pid}}" href="javascript:void(0);"><i class="W_ficon ficon_cd_img WBficon">¡</i>{{viewOriginalFCText}}</a>',
  // 视频位置标记符
  'videoFakePlaceholderContainer': '<div class="yawf-video-fake-placeholder-container" style="height: 0; width: 100%; overflow: hidden; position: relative;"></div>',
  'videoFakePlaceholder': '<div class="yawf-video-fake-placeholder" yawf-fake-placeholder="yawf-fake-placeholder" style="width: 1px; height: 2000000px; position: absolute; top: -1000000px; z-index: -1;" node-type="fl_h5_video"></div>',
  'videoDocumentHeightNotifier': '<div style="width: 100%; height: 10px; display: table; clear: both; overflow: hidden; position: relative;"></div>',
  // 视频播放
  'videoFold': '<div class="tab_feed_a clearfix"><div class="tab"><ul class="clearfix"><li><span class="line S_line1"><a action-type="feed_list_media_toSmall" href="javascript:;" class="S_txt1" yawf-link-type="k"><i class="W_ficon ficon_arrow_fold S_ficon">k</i>{{foldDetails}}</a></span></li></ul></div></div>',
  // 拖拽
  'dropArea': '<div id="yawf-drop-area" style="display: none;"><div class="yawf-drop-area-desc"><div class="yawf-drop-area-title">{{dropAreaTitle}}</div><div class="yawf-drop-area-text">{{dropAreaText}}</div></div><div contenteditable="true" id="yawf-drop-area-content"></div></div>',
  'fastFilterHeader': '<div id="yawf-fast-filter-chose"><div class="yawf-fast-filter-option"><span class="yawf-fast-filter-text">{{fastFilterChoseText}}</span><ul id="yawf-fast-filter-list">',
  'fastFilterItem': '<li class="yawf-fast-filter-item"><label><input class="W_checkbox yawf-configBooleanInput" type="checkbox"><span class="yawf-fastFilterItemInner"></span></label><select value="blacklist"><option value="whitelist">{{whitelistActionDesc}}</option><option value="blacklist">{{blacklistActionDesc}}</option><option value="foldlist">{{foldlistActionDesc}}</option></select></li>',
  'fastFilterFooter': '</ul></div><div class="W_layer_btn S_bg2"><a action-type="ok" node-type="ok" class="W_btn_a btn_34px" href="javascript:void(0);"><span>{{okButtonTitle}}</span></a><a action-type="cancel" node-type="cancel" class="W_btn_b btn_34px" href="javascript:void(0);"><span>{{cancelButtonTitle}}</span></a></div></div>',
  'fastFilterString': '<label><span></span></label>',
  'fastFilterStringInput': '<input width="12" class="input_default" type="text" />',
  // 自动检查关注列表发生的变化
  'autoCheckFollowingBody': '<div><div class="yawf-following-notice-header yawf-window-header">{{autoCheckFollowingTitle}}</div><div class="yawf-following-notice-body yawf-window-body"><div class="yawf-following-notice-desc yawf-window-desc">{{autoCheckFollowingTip}}</div><div class="yawf-following-notice-text" style="margin-top:5px;">{{autoCheckFollowingTipDetail}}</div><div class="yawf-following-add" style="display: none;"><div class="yawf-following-items-title">{{autoCheckFollowingAdd}}</div><div class="yawf-following-items-container"><ul class="yawf-configUsersItems yawf-configItems"></ul></div></div><div class="yawf-following-lost" style="display: none;"><div class="yawf-following-items-title">{{autoCheckFollowingLost}}</div><div class="yawf-following-items-container"><ul class="yawf-configUsersItems yawf-configItems"></ul></div></div></div><div node-type="confirmBox" class="yawf-following-notice-buttons yawf-window-buttons W_layer_btn S_bg1"><a class="yawf-following-notice-confirm W_btn_a btn_34px" node-type="confirm" href="javascript:void(0)">{{okButtonTitle}}</a></div></div>',
  'autoCheckFollowingItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><a href="{{domainURL}}/u/{{id}}" target="_blank"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}" usercard="id={{id}}" /></a></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><a href="{{domainURL}}/u/{{id}}" target="_blank" usercard="id={{id}}" class="object_name S_txt1" uid="{{id}}" title="{{name}}">{{name}}</a></p><p class="W_fr"></p></div><div class="other_info"></div></div></div></div></li>',
  'autoCheckFollowingOtherItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><a href="{{href}}" target="_blank"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}" /></a></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><a href="{{href}}" target="_blank" class="object_name S_txt1" title="{{name}}">{{name}}</a></p><p class="W_fr"></p></div><div class="other_info"></div></div></div></div></li>',
  'autoCheckFollowingConfig': '<div style="margin: 0 0 0 4em;">{{autoCheckFollowingLastTime}}<span class="yawf-following-last"></span><a href="javascript:;" class="W_btn_b yawf-following-check-now" style="display:none; margin-left:1em;"><span class="W_f14">{{autoCheckFollowingNow}}</span></a><span class="yawf-following-checking" style="display:none; margin-left:1em;">{{autoCheckFollowingRunning}}</span><a href="javascript:;" class="W_btn_b yawf-following-clear" style="display:none; margin-left:1em;"><span class="W_f14">{{autoCheckFollowingClean}}</span></a></div>',
  // 表情输入
  'fastEmojiInput': '<div class="faces_list yawf-faces_list" node-type="scrollView"><div yawf-face="top" node-type="list"><span>{{fastEmojiInputTop}}</span><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><span id="yawf-face-drop-area">{{fastEmojiInputTopNotice}}</span></div><div yawf-face="recent" node-type="list"><span>{{fastEmojiInputRecent}}</span><ul><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div></div>',
  'fastEmojiListItem': '<li title="{{title}}" action-data="insert={{text}}" action-type="select"><img src="{{img}}"></li>',
  'fastEmojiListItemIM': '<li title="{{text}}" action-data="text={{text}}" action-type="webim_phiz_face"><img src="{{img}}"></li>',
  'fastEmojiClearButton': '<a class="W_btn_b yawf-clear-emoji" href="javascript:;"><span class="W_f14">{{fastEmojiClear}}</span></a>',
  // 只看微博列表
  'weiboOnlyButton': '<div id="yawf-weibo-only"><span><a class="S_txt1" href="javascript:void(0);">{{weiboOnlyButtonDesc}}</a></span></div>',
  // 分组或特别关注的未读提示
  'noticeContainer': '<div class="WB_feed_type SW_fun S_line2" action-type="feed_list_item" yawf-display="notice"></div>',
  // 有新微博的替代提示
  'feedListNewBar': '<div class="WB_cardwrap WB_notes" yawf-id="home_new_feed_tip"><a href="javascript:void(0);"></a></div>',
  'feedTimeTip': '<div class="WB_cardwrap S_bg2 yawf-timeTip"><div class="WB_cardtitle_a W_tc"><a node-type="feed_list_item_date" date="{{date}}" style="color:inherit"></a> {{{time}}}</div></div>',
  // 顶栏徽标
  'navLogo': '<span class="logo"></span>',
  // 顶栏提示
  'topMenuListTips': '<div class="gn_topmenulist_tips yawf-gn_topmenulist_tips" style="display: none;"><a href="javascript:void(0);" class="W_ficon ficon_close S_ficon">X</a><ul></ul></div>',
  // 来自 微博 weibo.com
  'weiboViaWeiboCom': '<a rel="nofollow" href="//weibo.com/" target="_blank" action-type="app_source" class="S_txt2">{{defaultSource}}</a>',
  // 二级评论展开
  'unfoldChildComment': '<a class="S_txt1" action-type="click_more_child_comment_big" action-data="more_comment=big&amp;root_comment_id={{comment_id}}&amp;is_child_comment=ture&amp;id={{mid}}">({{child_count}})</a>',
};

// 其他在填写格式化字符串时自动填写的内容
var fill = {
  'domainURL': {
    'toString': function () {
      if (document.domain === 'www.weibo.com') return '//www.weibo.com';
      return '//weibo.com';
    }
  },
};

// 超链接
var url = {
  'newcard': '{{domainURL}}/aj/user/newcard?type=1&{{query}}&_t=1&callback={{callback}}',
  'view_cmt_ori': '//ww1.sinaimg.cn/large/{{pid}}.jpg',
  'block_wb': '{{domainURL}}/aj/filter/block?ajwvr=6',
  'del_cmt': '{{domainURL}}/aj/comment/del?ajwvr=6',
  'video_show': '//video.weibo.com/show?fid={{id}}',
  'user': '{{domainURL}}/u/{{uid}}',
  'topsuggest': '//s.weibo.com/ajax/topsuggest.php?key={{query}}&_v={{callback}}',
  'topicsuggest': '{{domainURL}}/aj/mblog/topic?ajwvr=6&q={{query}}',
  'attention': '{{domainURL}}/aj/mblog/attention?ajwvr=6&q={{query}}',
  'getlongtext': '{{domainURL}}/p/aj/mblog/getlongtext?ajwvr=6&mid={{mid}}',
  'myfollow': '{{domainURL}}/{{uid}}/myfollow',
  'stock': '{{domainURL}}/p/230677{{stockid}}',
  'topic': '{{domainURL}}/k/{{topic}}',
};

var font = {
  'west': [
    ['Times', 'Times'],
    ['"Times New Roman"', 'Times New Roman'],
    ['Georgia', 'Georgia'],
    ['Arial', 'Arial'],
    ['Helvetica', 'Helvetica'],
    ['Verdana', 'Verdana'],
    ['".SFNSDisplay-Regular"', 'San Francisco'],
  ],
  'chinese': [
    ['"SimSun", "宋体"', '中易宋体'],
    ['"Heiti SC", "黑体-简"', '黑体-简'],
    ['"PingFang SC", "苹方-简"', '苹方-简'],
    ['"STHeiti", "华文黑体"', '华文黑体'],
    ['"Hiragino Sans GB", "冬青黑体简体中文"', '冬青黑体'],
    ['"Microsoft YaHei", "微软雅黑"', '微软雅黑'],
    ['"DengXian", "等线"', '等线'],
    ['"WenQuanYi Zen Hei", "文泉驿正黑"', '文泉驿正黑'],
    ['"WenQuanYi Micro Hei", "文泉驿微米黑"', '文泉驿微米黑'],
    ['"Noto Sans CJK SC", "Source Han Sans SC", "思源黑体 SC"', '思源黑体'],
    ['"Noto Serif CJK SC", "Source Han Serif SC", "思源宋体 SC"', '思源宋体'],
    ['"SimKai", "楷体"', '中易楷体'],
    ['"PMingLiU", "新細明體"', '新細明體'],
    ['"MingLiU", "細明體"', '細明體'],
    ['"Heiti TC", "黑體-繁"', '黑體-繁'],
    ['"PingFang TC", "蘋方-繁"', '蘋方-繁'],
    ['"PingFang HK", "蘋方-港"', '蘋方-港'],
    ['"LiHei Pro Medium", "儷黑 Pro"', '儷黑 Pro'],
    ['"Microsoft JhengHei", "微軟正黑體"', '微軟正黑體'],
    ['"Noto Sans CJK TC", "Source Han Sans TC", "思源黑體 TC"', '思源黑體'],
    ['"Noto Serif CJK TC", "Source Han Serif TC", "思源宋體 TC"', '思源宋體'],
    ['"DFKai-SB", "BiauKai", "標楷體"', '標楷體'],
  ]
};

// 微博使用 softbank 的 emoji 编码，我们将它们转换到标准的 unicode
// 键是 softbank 扩展 unicode 表情的码位点减去 0xe000 ；值是 unicode 码位点
var emoji = { 1: 128102, 2: 128103, 3: 128139, 4: 128104, 5: 128105, 6: 128085, 7: 128094, 8: 128247, 9: 9742, 10: 128241, 11: 128224, 12: 128187, 13: 128074, 14: 128077, 15: 9757, 16: 9994, 17: 9996, 18: 128587, 19: 127935, 20: 9971, 21: 127934, 22: 9918, 23: 127940, 24: 9917, 25: 128033, 26: 128052, 27: 128663, 28: 9973, 29: 9992, 30: 128643, 31: 128645, 32: 10067, 33: 10071, 34: 10084, 35: 128148, 36: 128336, 37: 128337, 38: 128338, 39: 128339, 40: 128340, 41: 128341, 42: 128342, 43: 128343, 44: 128344, 45: 128345, 46: 128346, 47: 128347, 48: 127800, 49: 128305, 50: 127801, 51: 127876, 52: 128141, 53: 128142, 54: 127968, 55: 9962, 56: 127970, 57: 128649, 58: 9981, 59: 128507, 60: 127908, 61: 127909, 62: 127925, 63: 128273, 64: 127927, 65: 127928, 66: 127930, 67: 127860, 68: 127864, 69: 9749, 70: 127856, 71: 127866, 72: 9924, 73: 9729, 74: 9728, 75: 9748, 76: 127764, 77: 127748, 78: 128124, 79: 128049, 80: 128047, 81: 128059, 82: 128041, 83: 128045, 84: 128051, 85: 128039, 86: 128523, 87: 128515, 88: 128542, 89: 128544, 90: 128169, 257: 128234, 258: 128238, 259: 9993, 260: 128242, 261: 128540, 262: 128525, 263: 128561, 264: 128531, 265: 128053, 266: 128025, 267: 128055, 268: 128125, 269: 128640, 270: 128081, 271: 128161, 272: 127808, 273: 128143, 274: 127873, 275: 128299, 276: 128269, 277: 127939, 278: 128296, 279: 127878, 280: 127809, 281: 127810, 282: 128127, 283: 128123, 284: 128128, 285: 128293, 286: 128188, 287: 128186, 288: 127828, 289: 9970, 290: 9978, 291: 9832, 292: 127905, 293: 127915, 294: 128191, 295: 128192, 296: 128251, 297: 128252, 298: 128250, 299: 128126, 300: 12349, 301: 126980, 302: 127386, 303: 128176, 304: 127919, 305: 127942, 306: 127937, 307: 127920, 308: 128014, 309: 128676, 310: 128690, 311: 128679, 312: 128697, 313: 128698, 314: 128700, 315: 128137, 316: 128164, 317: 9889, 318: 128096, 319: 128704, 320: 128701, 321: 128266, 322: 128226, 323: 127884, 324: 128274, 325: 128275, 326: 127750, 327: 127859, 328: 128211, 329: 128177, 330: 128185, 331: 128225, 332: 128170, 333: 127974, 334: 128677, 335: 127359, 336: 128655, 337: 128699, 338: 128110, 339: 127971, 340: 127975, 341: 127973, 342: 127978, 343: 127979, 344: 127976, 345: 128652, 346: 128661, 1091: 127744, 1084: 127746, 1099: 127747, 1097: 127749, 1098: 127751, 1100: 127752, 1086: 127754, 821: 127775, 575: 9800, 576: 9801, 577: 9802, 578: 9803, 579: 9804, 580: 9805, 581: 9806, 582: 9807, 583: 9808, 584: 9809, 585: 9810, 586: 9811, 587: 9934, 772: 127799, 1095: 127811, 771: 127802, 773: 127803, 775: 127796, 776: 127797, 1092: 127806, 837: 127822, 838: 127818, 839: 127827, 840: 127817, 841: 127813, 842: 127814, 1049: 128064, 1051: 128066, 1050: 128067, 1052: 128068, 1033: 128069, 796: 128132, 797: 128133, 798: 128134, 799: 128135, 800: 128136, 1064: 128107, 1065: 128111, 1301: 128113, 1302: 128114, 1303: 128115, 1304: 128116, 1305: 128117, 1306: 128118, 1307: 128119, 1308: 128120, 595: 128129, 1310: 128130, 1311: 128131, 1325: 128013, 1326: 128020, 1327: 128023, 1328: 128043, 1318: 128024, 1319: 128040, 1320: 128018, 1321: 128017, 1089: 128026, 1317: 128027, 1314: 128032, 1315: 128036, 1313: 128038, 1312: 128044, 1316: 128057, 1322: 128058, 1323: 128046, 1324: 128048, 1329: 128056, 1334: 128062, 1027: 128553, 1040: 128562, 1030: 128565, 1039: 128560, 1038: 128530, 1028: 128548, 1048: 128536, 1047: 128538, 1036: 128567, 1037: 128563, 1045: 128517, 1034: 128518, 1042: 128514, 1044: 9786, 1043: 128546, 1041: 128557, 1035: 128552, 1046: 128545, 1031: 128534, 1032: 128554, 1026: 128527, 1025: 128549, 1029: 128521, 1059: 128581, 1060: 128582, 1062: 128583, 1063: 128588, 1053: 128591, 1281: 127977, 1284: 127980, 1285: 127983, 1286: 127984, 1288: 127981, 514: 9875, 779: 127982, 1289: 128508, 1309: 128509, 794: 128097, 795: 128098, 770: 128084, 792: 128082, 793: 128087, 801: 128088, 802: 128089, 803: 128092, 1299: [127464, 127475], 1294: [127465, 127466], 1297: [127466, 127480], 1293: [127467, 127479], 1296: [127468, 127463], 1295: [127470, 127481], 1291: [127471, 127477], 1300: [127472, 127479], 1298: [127479, 127482], 1292: [127482, 127480], 574: 128302, 521: 128304, 783: 128138, 1330: 127344, 1331: 127345, 1332: 127374, 1333: 127358, 788: 127872, 843: 127874, 1096: 127877, 784: 127880, 786: 127881, 1078: 127885, 1080: 127886, 1081: 127891, 1082: 127890, 1083: 127887, 1088: 127879, 1090: 127888, 1093: 127875, 1094: 127889, 769: 128221, 791: 128227, 790: 128189, 787: 9986, 1066: 127936, 1067: 127944, 1069: 127946, 1076: 128647, 1077: 128644, 1070: 128665, 1071: 128666, 1072: 128658, 1073: 128657, 1074: 128659, 1075: 127906, 1287: 127910, 778: 127911, 1282: 127912, 1283: 127913, 804: 127916, 1068: 127921, 806: 127926, 774: 128144, 1061: 128145, 1085: 128146, 519: 128286, 590: 169, 591: 174, 1335: 8482, 528: [35, 8419], 540: [49, 8419], 541: [50, 8419], 542: [51, 8419], 543: [52, 8419], 544: [53, 8419], 545: [54, 8419], 546: [55, 8419], 547: [56, 8419], 548: [57, 8419], 549: [48, 8419], 523: 128246, 592: 128243, 593: 128244, 834: 127833, 832: 127836, 825: 127838, 826: 127846, 827: 127839, 828: 127841, 829: 127832, 830: 127834, 831: 127837, 833: 127835, 835: 127842, 836: 127843, 844: 127857, 845: 127858, 1087: 127847, 824: 127861, 780: 127867, 566: 8599, 568: 8600, 567: 8598, 569: 8601, 562: 11014, 563: 11015, 564: 10145, 565: 11013, 570: 9654, 571: 9664, 572: 9193, 573: 9194, 818: 11093, 819: 10060, 822: 10068, 823: 10069, 529: 10175, 807: 128147, 808: 128151, 809: 128152, 810: 128153, 811: 128154, 812: 128155, 813: 128156, 1079: 128157, 516: 128159, 524: 9829, 526: 9824, 525: 9830, 527: 9827, 782: 128684, 520: 128685, 522: 9855, 594: 9888, 513: 128694, 777: 128702, 532: 127378, 553: 127380, 530: 127381, 589: 127383, 531: 127385, 515: 127489, 552: 127490, 555: 127539, 554: 127541, 533: 127542, 534: 127514, 535: 127543, 536: 127544, 551: 127545, 556: 127535, 557: 127546, 789: 12953, 781: 12951, 550: 127568, 820: 128162, 785: 128163, 817: 128166, 816: 128168, 814: 10024, 517: 10036, 518: 10035, 537: 9898, 538: 128309, 539: 128307, 815: 11088, 805: 128276, 588: 128285, 558: 128070, 559: 128071, 560: 128072, 561: 128073, 1054: 128075, 1055: 128079, 1056: 128076, 1057: 128078, 1058: 128080 };

// 皮肤
var skin = { skin: { _001: "蓝色心情", _002: "紫荆花瓣", _003: "沙滩漫步", _004: "凌晨两点半", _005: "梦幻星空", _006: "暗夜留香", _007: "我心飞翔", _008: "happy forever", _009: "彩虹", _010: "梦幻游乐场", _011: "彩色天空", _012: "名人会", _013: "哇嗷", _014: "我愿意", _015: "猫趣", _016: "保护北冰洋", _017: "魅影", _018: "童趣彩虹", _019: "kiss", _020: "漓彩", _021: "留沙", _022: "心晴", _023: "greenway", _024: "Hello Pig", _025: "Iam 80后", _026: "安静夜", _027: "百灵鸟", _028: "碧草蓝天", _029: "窗台", _030: "梦幻", _031: "飞鸟鱼", _032: "粉色风信子", _034: "复古", _035: "黑板", _036: "咖啡", _037: "情迷宝丽来", _038: "太空", _039: "涂鸦板", _040: "星空", _041: "雨夜", _042: "纸飞机", _043: "飘", _045: "pop", _046: "紫色风情", _047: "coffee bar", _048: "风轻云淡", _049: "风轻云淡", _050: "梦幻星空", _051: "保护北冰洋", _052: "漓彩", _053: "情迷宝丽来", _054: "太空", _055: "雨夜", _058: "默认", _211: "我们结婚吧", _212: "幸福在身边", _214: "新年闹春", _252: "环保益起来", _253: "地球一小时", _254: "随手拍", _255: "为爱益起跑" }, skinvip: { _001: "鸟人的异想世界", _002: "纸面人生", _006: "简约生活", _009: "游戏时光", _010: "秀出真我", _011: "糖果缤纷", _013: "我的翅膀", _014: "莲花", _016: "超级玛丽", _017: "浪小花", _018: "80后", _019: "可爱滴兔子", _021: "海底世界", _022: "给自己放个假", _023: "80后的回忆", _024: "马戏团", _025: "孤独的夜", _026: "暖暖", _027: "吃豆人", _028: "rainbow", _031: "海之梦境", _032: "旋转时光", _033: "午后巴士情缘", _034: "小黄鸭", _035: "夏微凉", _036: "碧水晚舟", _037: "Marry Me", _038: "水墨鱼", _039: "夕影", _040: "心之恋", _041: "心心相印", _042: "旅行时光", _043: "拥抱美好", _044: "寐", _045: "狗狗漫步", _046: "阿狸的海洋", _047: "蒲公英的梦", _048: "播种阳光", _049: "小情人", _050: "海滩", _051: "天使爱人", _054: "悠闲午后", _056: "西瓜女孩", _057: "郊游", _058: "南极企鹅", _059: "老上海岁月", _060: "雾都", _061: "海边度假", _062: "一个人的旅行", _063: "环游地球", _064: "罗小黑的异想世界", _065: "李雷与韩梅", _068: "艾玩兔-守候", _069: "俏皮喵星人", _070: "梦游仙境", _071: "爱情畅想", _072: "萌狗狗", _073: "马背上的天空", _074: "暖阳", _075: "渔舟唱晚", _076: "小伙伴", _078: "简单生活", _079: "守望", _080: "好基友", _081: "都市流浪", _082: "躲猫猫", _083: "键盘仔", _084: "南瓜头快跑", _085: "飞向月球", _086: "枫林", _087: "柿子红了", _088: "Trick or Treat", _089: "马里奥", _090: "天空", _091: "礼物轰炸机", _092: "阿狸的秋天", _093: "勇士狸", _094: "萌宠公寓", _095: "宁静的海", _096: "月光", _097: "good night", _098: "喵星人向前冲", _099: "棒棒糖", _101: "童话", _102: "猫咪乐队", _105: "表白", _106: "自由猪神", _107: "梦中的小屋", _108: "XOXO", _109: "童年的小熊", _110: "我的交响乐", _111: "仙乐飘飘", _112: "下雪啦", _113: "寒冬", _114: "后天", _115: "蛇年祝福", _116: "圣诞老人", _117: "江南style", _118: "龄官", _120: "迪士尼-史迪奇", _121: "迪士尼-维尼熊", _122: "迪士尼-小顽皮", _123: "迪士尼-玛丽猫", _124: "迪士尼-美人鱼", _125: "迪士尼-米奇米妮", _126: "迪士尼-欢乐圣诞", _127: "迪士尼-小仙女", _128: "守望", _129: "幽灵古堡", _130: "迷雾", _131: "金色阳光", _132: "I Miss U", _133: "未来の树", _134: "金色海洋", _135: "雨后", _136: "草坡上的女孩", _137: "Sexy music", _138: "移动城堡", _139: "拥抱爱", _140: "春草", _141: "花与蝶", _142: "樱の花", _145: "黑暗阶梯", _146: "鱼", _147: "公主", _149: "仙女的裙摆", _150: "小仙女", _152: "樱花舞", _153: "自娱自乐", _154: "哥哥", _156: "家有金毛", _158: "淘气小哈", _159: "海军狗狗", _160: "巴哥", _163: "迪士尼-魔境仙踪", _164: "迪士尼-公主", _165: "青春", _166: "花椅", _169: "拉拉", _173: "旧城往事", _174: "功夫之王", _175: "不明飞行物", _176: "星际探险", _178: "小泰迪", _179: "饼干喵星人", _181: "喵星人三兄弟", _182: "麋鹿喵星人", _185: "可爱喵星人", _187: "母爱", _188: "大手小手", _189: "一家人", _192: "钢铁侠", _193: "钢铁侠出击", _194: "迪士尼-米奇", _195: "迪士尼-米老鼠", _196: "萝莉", _197: "御姐", _198: "凝望地球", _199: "依靠", _201: "CS战士", _202: "Take Me Home", _203: "登船style", _204: "稻草人", _205: "happy everyday", _206: "甜点", _207: "大风吹", _208: "烤红薯", _209: "Ball", _211: "贪吃蛇", _212: "力争上游", _213: "棋逢对手", _214: "团团圆圆", _216: "年夜饭", _221: "春雨", _222: "尘飞扬", _224: "雾霾压城", _225: "仙女的舞蹈", _226: "旅行赏春", _227: "赏春去", _228: "极速飙车", _234: "喵星人的思念", _235: "二货喵星人", _236: "怀念", _237: "卖萌喵星人", _238: "金字塔的秘密", _239: "母亲节", _240: "端午节", _242: "盒子星球", _243: "心心相印", _244: "粉色心情", _245: "侏罗纪公园", _246: "世界杯", _247: "点球大战", _250: "杨洋", _251: "杨洋生日专属", _303: "纪念日", _304: "窗外的春天", _305: "速度与激情", _306: "绿意盎然", _307: "动画城", _310: "牧人", _311: "美好风光", _312: "春天的幻想", _318: "重返地球", _319: "冲上云霄", _320: "陨石", _325: "爱情使者", _326: "怪兽大学", _328: "毛怪和小伙伴", _330: "迪士尼-复古米老鼠", _332: "鱼跃", _333: "夜色", _334: "海洋", _335: "祈盼", _337: "玫瑰代表我的爱", _339: "神偷奶爸2", _342: "圣诞驯鹿", _343: "温情圣诞", _344: "冰雪奇缘", _345: "驯龙骑士", _347: "蝴蝶春天", _348: "绿色生活", _349: "彩色气球", _350: "雨滴", _351: "晴空暖阳", _354: "花瓣", _355: "春色", _358: "keeny的咖啡", _359: "keeny的鲸鱼", _400: "春天的气息", _401: "鬼娃娃", _402: "密室", _404: "竹林听雨", _405: "云雾", _407: "油菜花", _408: "旅途中的等待", _409: "旅程", _410: "汽车之旅", _411: "荷兰风车", _412: "迷彩之战", _414: "战地飞车", _415: "情侣喵星人", _416: "喵星人和鱼", _417: "一起午觉", _419: "爱心磁带", _420: "来自星星的我", _422: "欢乐喵星人", _423: "私家飞碟", _425: "乐队", _600: "家", _702: "纪念泰戈尔", _704: "TFBOYS少年强", _709: "TFBOYS青春修炼手册", _711: "新版微博", _713: "探寻幸福", _714: "夏天你好", _715: "我爱火锅", _716: "红色巴士", _717: "仰望星空", _718: "happy birthday", _719: "银杏知秋", _722: "玩雪咯", _723: "喵星人的星际穿越", _724: "Jingle bells", _725: "闹新春", _726: "三羊开泰", _731: "7月日历", _732: "8月日历", _733: "9月日历", _734: "10月日历", _735: "11月日历", _736: "12月日历", _737: "1月日历", _738: "2月日历", _739: "3月日历", _740: "碧波", _741: "一猫一世界", _742: "呐喊的汪汪", _743: "家有馋猫", _744: "狗狗爱美丽", _745: "温柔如喵", _746: "藏猫猫", _747: "伴君旅行", _748: "我想静静", _749: "倾情", _750: "粼粼海光", _751: "华晨宇", _752: "SNH48", _753: "诺言", _754: "乔振宇", _755: "妞妞和端午", _756: "暖暖屋", _757: "依偎ivvi", _800: "TFBOYS易烊千玺", _801: "初雪", _802: "暖心拿铁", _803: "陪伴", _804: "Merry Xmas", _805: "逆光森林", _806: "我爱披萨", _807: "旅行成瘾", _808: "我爱甜点", _809: "羊年到", _811: "希望之树", _812: "海洋", _813: "小岛和船", _814: "雪景", _815: "彩虹之路" }, skinvipf: { _001: "大海", _002: "下雪", _003: "天使", _004: "双子座", _005: "远行" }, skinvipg: { _001: "毕业季", _002: "上班族的周一", _003: "上班族的周二", _004: "上班族的周三", _005: "上班族的周四", _006: "上班族的周五", _007: "上班族的周六", _008: "上班族的周天" }, skinvipj: { _001: "超级玛丽动态版" }, weekskin: { _002: "微博经典" }, weekskinvip: { _001: "旅行时光", _002: "绿意", _003: "上班族一周心情", _004: "迪士尼" } };

var util = {};

// 浏览器识别
util.browser = {};
// 一些兼容性代码
// Array.from
if (!Array.from) Array.from = function () { var r = Object.prototype.toString, n = function (n) { return "function" == typeof n || "[object Function]" === r.call(n) }, t = function (r) { var n = +r; return isNaN(n) ? 0 : 0 !== n && isFinite(n) ? (n > 0 ? 1 : -1) * Math.floor(Math.abs(n)) : n }, e = Math.pow(2, 53) - 1, o = function (r) { var n = t(r); return Math.min(Math.max(n, 0), e) }; return function (r) { var t = this, e = Object(r); if (null == r) throw new TypeError("Array.from requires an array-like object - not null or undefined"); var a, i = arguments.length > 1 ? arguments[1] : void 0; if (void 0 !== i) { if (!n(i)) throw new TypeError("Array.from: when provided, the second argument must be a function"); arguments.length > 2 && (a = arguments[2]) } for (var u, f = o(e.length), c = n(t) ? Object(new t(f)) : Array(f), h = 0; f > h;) u = e[h], c[h] = i ? void 0 === a ? i(u, h) : i.call(a, u, h) : u, h += 1; return c.length = f, c } }();
// Object.assign
if (!Object.assign) Object.assign = function (n) { "use strict"; if (void 0 === n || null === n) throw new TypeError("Cannot convert undefined or null to object"); for (var r = Object(n), t = 1; t < arguments.length; t++) { var e = arguments[t]; if (void 0 !== e && null !== e) for (var o in e) e.hasOwnProperty(o) && (r[o] = e[o]) } return r };

// 检查是否是 Firefox 浏览器
util.browser.fx = {};
util.browser.fx.version = (function () {
  var m = navigator.userAgent.match(/^Mozilla\/5\.0 \([^)]+; rv:([\d.]+)\) Gecko\/[\d]{8} Firefox\/[\d.]+$/);
  return m && m[1] || null;
}());
util.browser.fx.avaliable = !!util.browser.fx.version;
if (util.browser.fx.avaliable) util.browser.fx.mainversion = +util.browser.fx.version.match(/^\d+/);

// 脚本识别
util.script = {};
// 获得脚本图标
util.script.icon = (function () {
  try {
    return GM_info.scriptMetaStr.match(new RegExp('// @(icon)(?:\\s+(.*))'))[2];
  } catch (e) { return 'https://tiansh.github.io/yawf/img/yawf.png'; }
}());
// 检查是否是压缩版本
util.script.ismin = (function () {
  try {
    // 检查多余的空格或分号、布尔字面常量、未消除的死代码、if语句，判断是否是压缩后的代码
    var func = function () {
      return
      if (false) {
        true;;
      }
    } + '';
    return !func.match(/return[\s\S]*if[\s\S]*\s\strue;;[\r\n\s]/);
  } catch (e) {
    return true; // 不知道哪里出的问题，当作是压缩的比较安全
  }
}());
// 检查是否开启了调试
util.script.isdebug = (function () {
  if (util.script.ismin) return false;
  return !!GM_getValue('debug', false);
}());

// 优先级设置
util.priority = {
  'FIRST': 1e6,
  'HIGH': 1e5,
  'BEFORE': 1e3,
  'DEFAULT': 0,
  'AFTER': -1e3,
  'LOW': -1e5,
  'LAST': -1e6,
};

// 函数相关操作
util.func = {};

// 基本函数
var noop = util.func.noop = function () { };
util.func.identity = function (x) { return x; };
util.func.constant = function (x) { return function () { return x; }; };

util.uneval = (function () {
  var helper = function (obj, seen) {
    try {
      if (obj === null) return 'null'; // null
      if (obj === void 0) return '(void 0)'; // undefined
      if (obj == null) return '({})'; // maybe undetectable
      if (typeof obj === 'number') {
        if (1 / obj === -Infinity) return '-0';
        // toString should work all values but not -0
        return Number.prototype.toString.call(obj);
      }
      // string or boolean
      if (!(obj instanceof Object)) return JSON.stringify(obj);
      // String, Number, Boolean
      if (obj instanceof String) return '(new String(' + helper(String.prototype.valueOf.call(obj)) + '))';
      if (obj instanceof Number) return '(new Number(' + helper(Number.prototype.valueOf.call(obj)) + '))';
      if (obj instanceof Boolean) return '(new Boolean(' + helper(Boolean.prototype.valueOf.call(obj)) + '))';
      // RegExp; toString should work
      if (obj instanceof RegExp) return RegExp.prototype.toString.call(obj);
      // Date; convert obj to Number should work
      if (obj instanceof Date) return '(new Date(' + helper(Number(obj)) + '))';
      // Function
      if (obj instanceof Function) {
        var func = Function.prototype.toString.call(obj);
        if (/\{\s*\[native code\]\s*\}\s*$/.test(func)) return null;
        return '(' + func + ')';
      }
      if (seen.indexOf(obj) !== -1) {
        if (Array.isArray(obj)) return '[]';
        return '({})';
      }
      var newSeen = seen.concat([obj]);
      // Array
      if (obj instanceof Array) {
        var array = obj.map(function (o) { return helper(o, newSeen); });
        // Add a comma at end if last element is a hole
        var lastHole = array.length && !((array.length - 1) in array);
        return '[' + array.join(', ') + (lastHole ? ',' : '') + ']';
      }
      // Object
      if (obj instanceof Object) {
        var pairs = [];
        for (var key in obj) {
          pairs.push(JSON.stringify(key) + ':' + helper(obj[key], newSeen));
        }
        return '({' + pairs.join(', ') + '})';
      }
      return '({})';
    } catch (_ignore1) { }
    // there should be something wrong; maybe obj is a Proxy
    try {
      if (obj instanceof Object) return '({})';
      else return 'null';
    } catch (_ignore2) { }
    // there really should be something wrong which cannot be handled
    return 'null';
  };
  return function un_eval(obj) {
    return helper(obj, []);
  };
}());

// 在页面执行一个函数
// 对于参数，会首先转换为JSON，如果无法转换为JSON则直接toString
util.func.page = function (f) {
  var args = Array.from(arguments).slice(1).map(util.uneval).join(', ');
  var js = 'void(' + f + '(' + args + '));';
  window.eval(js); // YES! eval! window.eval!
};

// 延迟调用函数
util.func.call = function (f) {
  setTimeout.apply(null, [f, 0].concat([].slice.call(arguments, 1)));
};

// 套上try-catch
util.func.catched = function (f, fc) {
  var ret = function () {
    try { return f.apply(this, arguments); }
    catch (e) {
      util.error('Exception while run %o: %o\n%o', f, e, e.stack);
      if (fc) fc(e);
    }
  };
  ret.name = f.name;
  return ret;
};

// 度量函数性能
util.func.performance = (util.script.isdebug && ('performance' in window)) ? (function (ignore) {
  var status = {}, p = false;
  var show = function () {
    if (p) return; p = true;
    setTimeout(function () {
      p = false;
      console.log('performance meansure: %o', status);
    }, 60e3);
  };
  var mfunc = function (f) {
    status[f.name] = { 'total': 0, 'data': [] };
    console.log('%o time meansure', f);
    return function () {
      var t = performance.now();
      f.apply(this, arguments);
      var d = performance.now() - t;
      status[f.name].total += d;
      if (d > ignore)
        status[f.name].data.push({ 'duration': d, 'time': t });
      show();
    };
  }, mfuncs = {}, recorded = {};
  return function (f) {
    if (!f.name) { console.log('function name needed: %o', f); return f; }
    if (recorded[f.name] && recorded[f.name] !== f) { console.log('duplicate function name (%s): %o, %o', f.name, recorded[f.name], f); return f; } else recorded[f.name] = f;
    if (!mfuncs[f.name]) mfuncs[f.name] = mfunc(f);
    return mfuncs[f.name];
  };
}(10)) : util.func.identity;

// 向 unsafeWindow 暴露接口
util.func.output = function (name, handler) {
  var push = util.func.catched(function (args) {
    args = args.wrappedJSObject || args;
    util.debug('%s.(%o)', name, args);
    handler(args);
  }.bind(window));
  if (unsafeWindow[name]) {
    util.debug('before loaded %s: %o', name, unsafeWindow[name]);
    Array.from(unsafeWindow[name]).forEach(push);
  }
  try {
    unsafeWindow[name] = new Proxy({ 'push': push }, {
      'get': function (obj, name) { if (name === 'push') return obj.push; },
      'set': function () { }
    });
  } catch (e) { unsafeWindow[name] = { 'push': push }; }
};

// 对象相关工具
util.obj = {};

// 使用点分隔的字串索引对象
util.obj.dotted = function (o, p) {
  p = p.split('.');
  while (typeof o !== 'undefined' && p.length) o = o[p.shift()];
  return o;
};

// 字符串工具
util.str = {};

// 多行字符串
// 传入的函数内包含一大段注释，提取注释内容作为字符串
// 传入的函数末尾的附加内容是为了避免 UglifyJS2 压缩时造成错误而添加的
util.str.cmt = function (f) {
  var s = f.toString().replace(/^[\s\S]*\/\*.*/, '').replace(/.*\*\/[\s\S]*$/, '').replace(/\r\n|\r|\n/g, '\n');
  return s;
};

// 从一个链接中截取他的域名
util.str.host = function (link) {
  var x = document.createElement('a');
  x.href = link;
  return x.host;
};

util.str.escape = {};
// 将字符串用&#dd的形式转义，以便将内容至于 XML 中
util.str.escape.xml = function (s) {
  return s.replace(/[\u0000-\u00ff]/g, function (c) { return '&#' + c.charCodeAt(0); });
};
// 将正则式相关字符以斜杠转义，以便创建正则匹配
util.str.escape.regexp = function (s) {
  return s.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
};

// 将 utf8 编码的 softbank 表情转换为 unicode ， 例如 "ee8192" -> "🐶"
util.str.codePoint = function (codePoint) {
  if (String.fromCodePoint) return String.fromCodePoint(codePoint);
  if (codePoint < 0xFFFF) return String.fromCharCode(codePoint);
  return (String.fromCharCode((codePoint >> 10) + 0xD7C0) +
    String.fromCharCode((codePoint % 0x400) + 0xDC00));
};
util.str.emoji = function (code) {
  // 我们将 utf8 编码转换成码位点，并减去 0xe000 后查表
  var softbank = emoji[decodeURIComponent(code.replace(/(..)/g, '%$1')).charCodeAt(0) - 0xe000];
  if (!softbank.length) softbank = [softbank];
  // 最后将结果转换回字符
  var unicode = softbank.map(util.str.codePoint).join('');
  util.debug('emoji convert %o -> %o', code, unicode);
  return unicode;
};

// 以参数填充字符串
util.str.fill = function (base, func) {
  var argdatas = Array.from(arguments).slice(1);
  var datas = argdatas.concat([text, fill]);
  // 找合适的内容填上
  var parser = function (datas) {
    return function (key) {
      var ret = null;
      datas.some(function (data) {
        if (typeof data === 'object' && key in data) ret = '' + data[key];
        return ret !== null;
      });
      return ret;
    };
  };
  var parseFunction;
  if (typeof func === 'function') parseFunction = func;
  else parseFunction = parser(datas);
  return base.replace(/\{\{([\[{])?([a-zA-Z0-9_\-]*)([\]\}])?\}\}/g, function (o, i, p, c) {
    var ps = p.split('|'), m = { '{': '}', '[': ']', '': '' }[i || ''] === (c || '');
    var ret = parseFunction(ps[0]);
    if (ret == null) return o;
    if (m && i === '{') ret = util.str.fill(ret, parseFunction);
    else if (m && i === '[') ret = util.str.escape.xml(ret);
    else if (!m) ret = (i || '') + ret + (c || '');
    return ret;
  });
};

// 产生一个假的回调函数
util.str.fcb = (function () {
  var last = 0;
  return function () {
    return 'STK_' + (last = Math.max(last + 1, Date.now()));
  };
}());

// 从 JSONP 的返回结果中截取有用的东西
util.str.parsejsonp = function (resp) {
  return JSON.parse(resp.replace(/^try\{[^{]*\(\{/, '{').replace(/}\)\s*;?\s*}catch\(e\)\{\};?$/, '}'));
};

// 检查一个字串是否是正则式，如果出错报告用户
// 返回为正则式或 null
util.str.addregex = function (s) {
  s = s.trim();
  if (s.length >= 2 && s[0] === '/' && s[s.length - 1] === '/') s = s.slice(1, -1);
  try { RegExp(s).exec(''); } catch (e) {
    util.ui.alert('yawf-regexp-bad-formed', {
      'title': util.str.fill('{{regexpBadFormedTitle}}'),
      'text': util.str.fill('{{{regexpBadFormed}}}', { 'regexp': util.str.escape.xml(s) }),
      'icon': 'error'
    });
    s = null;
  }
  if (RegExp(s) + '' === '/(?:)/') return null;
  return s;
};

// 将字符串编译成正则式
util.str.compregex = function (regex) {
  try { return RegExp(regex); }
  catch (e) {
    util.debug('compile regexp exception %s : %o', regex, e);
    return null;
  }
};

// 将&连接的键值对变为对象
util.str.parsequery = function (str) {
  var o = {};
  if (str === '') return o;
  str.split('&').map(function (kv) {
    if (kv === '') return;
    if (kv.indexOf('=') === -1) o[kv] = null;
    else {
      kv = kv.split('=', 2);
      o[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
    }
  });
  return o;
};
// 将对象换成 & 连接的键值
util.str.toquery = function (o) {
  return Object.keys(o).map(function (k) {
    if (o[k] == null || o[k] === true) return encodeURIComponent(k);
    return encodeURIComponent(k) + '=' + encodeURIComponent(o[k]);
  }).join('&');
};

// 将颜色和透明度转换为一个表示颜色的字符串
util.str.rgba = function (color, transparency) {
  return 'rgba(' + color.slice(1)
    .split(/(..)/).filter(function (x) { return x; })
    .map(function (x) { return parseInt(x, 16); }).join(',') +
    ',' + (100 - transparency) / 100 + ')';
};

// 字符串 base64 编码
util.str.base64 = function (str) {
  return btoa(unescape(encodeURIComponent(str)));
};

// 文档相关工具
util.dom = {};

// 快速创建一段文档元素
util.dom.create = function create(tag, inner) {
  if (tag && typeof inner === 'undefined')
    return create('div', tag).firstChild;
  var d = document.createElement(tag);
  d.innerHTML = inner;
  return d;
};

// 某个元素是否匹配特定选择器
util.dom.matches = (function () {
  // 不能直接扩展 Element.prototype
  // https://bugzil.la/787070 (mozilla35)
  var ep = Element.prototype, matches = ep.matches ||
    ep.mozMatchesSelector || ep.oMatchesSelector ||
    ep.webkitMatchesSelector || ep.msMatchesSelector;
  return function (element, selector) {
    try { return matches.call(element, [selector]); }
    catch (e) { return null; }
  };
}());

// 找到符合条件的父节点
util.dom.closest = function (node, selector) {
  if (node.closest) return node.closest(selector);
  while (node && !util.dom.matches(node, selector)) node = node.parentNode;
  return node || null;
};

// 同一个元素多个输入框同步
// 将输入框和某个设置项绑定
util.dom.bind = (function () {
  var bind = function (param, input, obj, standlize) {
    var fine = standlize || util.func.identity;
    var onchange = function () {
      var val = input[param], valid;
      valid = fine(val);
      if (String(valid) !== val) input[param] = valid;
      obj.putconf(valid);
    };
    if (obj.key) util.config.onput(obj.key, function (value) { input[param] = value; });
    input[param] = fine(obj.getconf());
    input.addEventListener('change', onchange);
    return onchange;
  };
  return {
    'text': bind.bind(null, 'value'),
    'checkbox': bind.bind(null, 'checked'),
    'select': bind.bind(null, 'value'),
  };
}());


util.font = {};

// 计算文字宽度
util.font.width = (function () {
  // 使用微博的默认字号作为度量值
  var fontsize = 14;
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  // 使用Canvas计算
  // https://bugzil.la/561361
  return function (fontname, text) {
    context.font = 'bold ' + fontsize + 'px ' + fontname;
    return context.measureText(text).width;
  };
}());

// 选择合适的字体
util.font.valid = (function () {
  // 检查这个字串的宽度来检查字体是否存在
  var sampleText =
    'The quick brown fox jumps over the lazy dog7531902468,.!-天地玄黄則近道矣，。：！';
  // 和这些字体进行比较
  var sampleFont = [
    'monospace', 'sans-serif', 'sans', 'Symbol', 'Arial', 'Fixed',
    'Times', 'Times New Roman', '宋体', '黑体', 'Microsoft YaHei'
  ];
  // 如果被检查的字体和基准字体可以渲染出不同的宽度
  // 那么说明被检查的字体总是存在的
  var diffFont = function (base, test) {
    var baseSize = util.font.width(base, sampleText, 72);
    var testSize = util.font.width(test + ',' + base, sampleText, 72);
    return baseSize !== testSize;
  };
  return function (test) {
    var valid = sampleFont.some(function (base) {
      return diffFont(base, test);
    });
    return valid;
  };
}());

// 对网页的判断
util.page = {};

// 检查是否要在本页上运行
util.page.valid = function () {
  // 必须的参数
  if (!unsafeWindow.$CONFIG) return false;
  if (!unsafeWindow.$CONFIG.uid) return false;
  if (!unsafeWindow.$CONFIG.nick) return false;
  // 如果是搜索页，而且未于搜索页面启用，则不工作
  if (util.page.search && !util.page.searchenable) return false;
  // 如果有登录按钮，则说明没有登录，此时不工作
  if (document.querySelector('.gn_login')) return false;
  util.debug('yawf started in page: %o (%s top)', location, self === top ? 'is' : 'is not');
  return true;
};

// 当前是否是首页
util.page.home = function () {
  return location.pathname.slice(-5) === '/home';
};

// 当前是查看分组的页面吗
util.page.group = function () {
  return location.pathname.slice(-9) === '/mygroups';
};

// 当前是搜索页面吗
util.page.search = (function () {
  return location.hostname === 's.weibo.com';
}());
// 以及在搜索也启用吗
util.page.searchenable = (function () {
  return !!GM_getValue('search_enable', false);
}());

// 当前是发现页面吗
util.page.discovery = (function () {
  return location.hostname === 'd.weibo.com';
}());

// 检查当前是否是用户个人主页
util.page.user = function () {
  if (!document.body.classList.contains('FRAME_page')) return false;
  if (!document.querySelector('.PCD_header .username')) return false;
  return true;
};

// 检查是不是我的个人主页
util.page.myhome = function () {
  if (!util.page.user()) return false;
  return !!util.info.uid && util.info.oid() === util.info.uid;
};

// 初始化
util.init = (function () {
  var callbacks = [], index = 0;
  // 完成加载时调用
  var dcl = function () {
    var valid = util.page.valid();
    callbacks.sort(function (x, y) {
      return y[0] - x[0] || y[1] - x[1];
    }).forEach(function (i) {
      if (valid || i[3]) util.func.catched(i[2])(valid);
    });
  };
  if (document.body) setTimeout(dcl, 0);
  else document.addEventListener('DOMContentLoaded', dcl);
  // 添加回调
  var add = function (func, priority, always) {
    callbacks.push([priority, ++index, func, always]);
    return func;
  };
  return add;
}());

// 覆盖 STK 相关函数
// 由于 STK 的实现机制和脚本沙箱等因素限制
//   1. 这个函数需要在 STK 注册相关函数前调用
//   2. 封装函数会通过转换为字符串再eval的形式被暴露到页面脚本上下文中
// 因此，这个函数必须在初始化前调用，而且函数内不能引用外部的变量
util.func.wrapstk = (function () {
  util.func.page(function (isDebug) {
    if ('STK' in window) {
      if (isDebug) console.error('YAWF failed to wrap STK. STK already defined. Some functions may not work.');
      return;
    }

    var wrapRegister = function (register) {
      return function (name, registerFunction, scope) {
        var original = registerFunction;
        if (name === 'namespace') {
          registerFunction = wrapNamespace(registerFunction);
        } else {
          wrappers.forEach(function (o) {
            if (name === o.name) registerFunction = o.wrapper(registerFunction);
          });
        }
        if (isDebug && registerFunction !== original) {
          console.log('register: %o = %o (this: %o)', name, registerFunction, this);
        }
        return register.call(this, name, registerFunction, scope);
      };
    };

    var wrapNamespace = function (namespaceFunctionGetter) {
      return function () {
        var namespaceFunction = namespaceFunctionGetter.apply(this, arguments);
        var fakeNamespaceKey = 'yawf_proto_getter';
        var namespaceInstance = namespaceFunction(fakeNamespaceKey);
        var namespacePrototype = namespaceInstance.constructor.prototype;
        namespacePrototype.register = wrapRegister(namespacePrototype.register);
        delete namespacePrototype.namespace[fakeNamespaceKey];
        return namespaceFunction;
      };
    };

    var stk = null, wrappers = [];
    Object.defineProperty(window, 'STK', {
      get: function () { return stk; },
      set: function (trueStk) {
        trueStk.register = wrapRegister(trueStk.register);
        stk = trueStk;
      },
      enumerable: true
    });

    window.$YAWF$ = window.$YAWF$ || {};
    window.$YAWF$.stkWrapper = function (name, regFuncWrapper) {
      wrappers.push({ name: name, wrapper: regFuncWrapper });
    };

  }, util.script.isdebug);

  return function (name, wrapper) {
    util.func.page(function (name, wrapper) {
      if ($YAWF$.stkWrapper) {
        $YAWF$.stkWrapper(name, wrapper);
      }
    }, name, wrapper);
  };

}());


// 对页面中添加元素时的监听
var observer = {};

// 有新结点时分发事件监听
observer.dom = (function () {
  var callbacks = [];
  var add = function (callback) {
    callbacks.push({
      'ori': callback,
      'wrap': util.func.catched(util.func.performance(callback))
    });
    return callback;
  };
  var remove = function (callback) {
    var found = false;
    callbacks = callbacks.filter(function (x) {
      var same = x.ori === callback;
      if (same) found = true;
      return !same;
    });
    return found;
  };
  var actived = null;
  var act = function () {
    callbacks.forEach(function (c) { c.wrap(); });
  };
  var active = util.func.catched(function (mutation) {
    if (mutation && Array.from(mutation).every(function isDate(x) {
      var target = x.target;
      return target.hasAttribute('date') || target.hasAttribute('yawf-date');
    })) return;

    if (actived === false) actived = true;
    if (actived !== null) return;
    act(); actived = false;
    setTimeout(function () {
      if (actived === true) act(); actived = null;
    }, 100);
  });
  var observe = function () {
    active(); // 初始化
    (new MutationObserver(active))
      .observe(document.body, { 'childList': true, 'subtree': true });
  };
  if (!('MutationObserver' in window)) observe = function () {
    // for lagency browsers
    document.body.addEventListener("DOMNodeInserted", function (e) { active(); }, false);
    document.body.addEventListener("DOMNodeRemoved", function (e) { active(); }, false);
  };
  util.init(function () {
    observe();
  }, util.priority.LAST + util.priority.AFTER * 2);
  return {
    'add': add,
    'remove': remove,
  };
}());

// 对每条微博应用过滤和其他相关回调
observer.weibo = (function () {
  var befores = [], afters = [], finals = [], onloads = [], dones = [];
  var weiboObserver, busy = false, rerun = false;
  var checkFeedDone = function () {
    busy = false;
    weiboObserver();
    dones.forEach(function (x) { x(); });
    return;
  };
  var checkFeeds = function (feeds) {
    busy = true;
    (function checkFeed() {
      util.debug('checking %d feed(s)', feeds.length);
      if (feeds.length === 0) return checkFeedDone();
      var feed = feeds.shift();
      util.func.catched(function () {
        befores.forEach(function (f) { f(feed); });
        if (filter.active(feed))
          afters.forEach(function (f) { f(feed); });
        finals.forEach(function (f) { f(feed); });
      })();
      util.func.call(checkFeed);
    }());
  };
  weiboObserver = function weiboObserver() {
    if (busy) return;
    var feeds, selector = '[action-type="feed_list_item"]:not([yawf-weibo]), [node-type="feed_list"] .WB_feed_type:not([yawf-weibo])';
    if (rerun) selector = '[action-type="feed_list_item"], [node-type="feed_list"] .WB_feed_type';
    feeds = Array.from(document.querySelectorAll(selector));
    feeds.forEach(function (feed) {
      feed.setAttribute('yawf-weibo', '');
      onloads.forEach(function (f) { f(feed); });
    });
    if (feeds.length) checkFeeds(feeds);
    rerun = false;
  };
  observer.dom.add(weiboObserver);
  var add = function (callbacks) {
    return function (callback) {
      callbacks.push(util.func.catched(callback));
      return callback;
    };
  };
  // 强制重新过滤所有微博
  var refilter = function () {
    rerun = true;
    util.func.call(weiboObserver);
  };
  return {
    'onload': add(onloads),
    'before': add(befores),
    'after': add(afters),
    'final': add(finals),
    'done': add(dones),
    'refilter': refilter,
  };
}());

observer.comment = (function () {
  var before = [], after = [];
  observer.dom.add(function commentObserver() {
    var comments = Array.from(document.querySelectorAll(
      '.list_ul[node-type="feed_list_commentList"] .list_li:not([yawf-comment]), ' +
      '.list_ul[node-type="comment_list"] .list_li:not([yawf-comment]) '
    ));
    comments.forEach(function (comment) {
      comment.setAttribute('yawf-comment', '');
      before.forEach(function (f) { f(comment); });
      filter.cmt_active(comment);
      after.forEach(function (f) { f(comment); });
    });
  });
  return {
    'before': function (f) { before.push(util.func.catched(f)); },
    'after': function (f) { after.push(util.func.catched(f)); },
  };
}());

// 阻止页面通过 jsonp 获取数据
observer.stopjsonp = (function () {
  // 新的基于 STK 的解决方法
  var jsonpDisallowPatterns = [];
  var update = function () {
    util.func.page(function (patterns) {
      window.$YAWF$ = window.$YAWF$ || {};
      window.$YAWF$.jsonpDisallowPatterns = patterns;
    }, jsonpDisallowPatterns);
  };
  update();
  util.func.wrapstk('core.io.jsonp', function (regFunc) {
    return function (stk) {
      return (function (jsonp) {
        return function (details) {
          var patterns = window.$YAWF$.jsonpDisallowPatterns, valid = true;
          try { patterns.forEach(function (p) { if (p.test(details.url)) valid = false; }); }
          catch (e) {  }
          if (valid) {
            return jsonp.apply(this, arguments);
          } else {
            return document.createElement('script');
          }
        };
      }(regFunc.apply(this, arguments)));
    };
  });
  return function (pattern) {
    jsonpDisallowPatterns.push(pattern);
    update();
  };
}());

// 键盘相关工具
util.keyboard = (function () {
  var ctrl = 1 << 8, shift = 1 << 9, alt = 1 << 10, meta = 1 << 11, key = ctrl - 1;
  var namelist = '#0;#1;#2;Cancel;#4;#5;Help;#7;BackSpace;TAB;#10;#11;Clear;Enter;EnterSpecial;#15;;;;Pause;CapsLock;Kana;Eisu;Junja;Final;Hanja;#26;Esc;Convert;Nonconvert;Accept;ModeChange;Space;PageUp;PageDown;End;Home;Left;Up;Right;Down;Select;Print;Execute;PrintScreen;Insert;Delete;#47;0;1;2;3;4;5;6;7;8;9;Colon;Semicolon;LessThan;Equals;GreaterThan;QuestionMark;At;A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z;Win;#92;ContextMenu;#94;Sleep;NumPad0;NumPad1;NumPad2;NumPad3;NumPad4;NumPad5;NumPad6;NumPad7;NumPad8;NumPad9;Multiply;Add;Separator;Subtract;Decimal;Divide;F1;F2;F3;F4;F5;F6;F7;F8;F9;F10;F11;F12;F13;F14;F15;F16;F17;F18;F19;F20;F21;F22;F23;F24;#136;#137;#138;#139;#140;#141;#142;#143;NumLock;ScrollLocK;WIN_OEM_FJ_JISHO;WIN_OEM_FJ_MASSHOU;WIN_OEM_FJ_TOUROKU;WIN_OEM_FJ_LOYA;WIN_OEM_FJ_ROYA;#151;#152;#153;#154;#155;#156;#157;#158;#159;Circumflex;Exclamation;DoubleQuote;Hash;Dollar;Percent;Ampersand;Underscore;OpenParen;CloseParen;Asterisk;Plus;Pipe;HyphenMinus;OpenCurlyBracket;CloseCurlyBracket;Tilde;#177;#178;#179;#180;VolumeMute;VolumeDown;VolumeUp;#184;#185;#186;#187;Comma;#189;Period;Slash;BackQuote;#193;#194;#195;#196;#197;#198;#199;#200;#201;#202;#203;#204;#205;#206;#207;#208;#209;#210;#211;#212;#213;#214;#215;#216;#217;#218;OpenBracket;BackSlash;CloseBracket;Quote;#223;;AltGr;#226;WIN_ICO_HELP;WIN_ICO_00;#229;WIN_ICO_CLEAR;#231;#232;WIN_OEM_RESET;WIN_OEM_JUMP;WIN_OEM_PA1;WIN_OEM_PA2;WIN_OEM_PA3;WIN_OEM_WSCTRL;WIN_OEM_CUSEL;WIN_OEM_ATTN;WIN_OEM_FINISH;WIN_OEM_COPY;WIN_OEM_AUTO;WIN_OEM_ENLW;WIN_OEM_BACKTAB;Attn;Crsel;Exsel;Ereof;Play;Zoom;#252;PA1;WIN_OEM_CLEAR;#255'.split(';');
  var code = {}; namelist.forEach(function (name, index) { code[name.toUpperCase()] = index; });
  var alter = { CTRL: ctrl, SHIFT: shift, ALT: alt, META: meta, KEY: key };
  // 对一个按键事件做编号
  var get = function (e) {
    if (!e || !e.keyCode) return null;
    var code = e.keyCode & key;
    if (e.ctrlKey) code |= ctrl;
    if (e.shiftKey) code |= shift;
    if (e.altKey) code |= alt;
    if (e.metaKey) code |= meta;
    return code;
  };
  // 给一个编号，转换为键名
  var name = function (n) {
    if (n === 0) return text.disabledKey;
    var ret = '';
    if (n & ctrl) ret += 'Ctrl-';
    if (n & shift) ret += 'Shift-';
    if (n & alt) ret += 'Alt-';
    if (n & meta) ret += 'Meta-';
    ret += namelist[n & key];
    if (ret.slice(-1) === '-') ret = ret.slice(0, -1);
    return ret;
  };
  // 注册全局监听按键
  var triggers = [];
  var reg = function (type, key, callback, ignoreInInput) {
    triggers.push({
      'type': type,
      'key': key,
      'callback': util.func.catched(callback),
      'ignoreInInput': !!ignoreInInput
    });
  };
  // 监听按键
  var baseEvent = function (e) {
    var code = get(e);
    var inInput = /^select|textarea|input$/.test(e.target.nodeName.toLowerCase());
    var actived = triggers.filter(function (trigger) {
      if (inInput && trigger.ignoreInInput) return false;
      return trigger.type === e.type && trigger.key === code;
    });
    if (!actived) return;
    actived.forEach(function (trigger) { trigger.callback(e); });
  };
  ['keydown', 'keypress', 'keyup'].forEach(function (type) {
    document.documentElement.addEventListener(type, baseEvent);
  });
  return {
    'get': get,
    'name': name,
    'reg': reg,
    'code': code,
    'alter': alter,
  };
}());

// 语言相关工具
util.i18n = {};
// 语言相关样式
util.i18n.stylish = function (lang) {
  var isEn = lang === 'en';
  util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
    .layoutFilterGroupLayer .yawf-configBoolean { width: {{layoutOptionWidth}}; }
    .layoutFilterGroupLayer .yawf-configBoolean.yawf-layoutConfig-line { width: 100%; }
  */ noop(); }), { 'layoutOptionWidth': isEn ? '240px' : '160px' }));
};

// 根据用户界面上的语言做不同调整
util._languages = (function () {
  var defaultLang = 'zh-cn';
  var allLang = ['zh-cn', 'zh-hk', 'zh-tw', 'en'];
  var lang = null;
  var pending = [];
  var chose = function (langObj) {
    langObj.local = langObj[lang] || langObj[defaultLang];
  };
  return function (l) {
    if (!l || allLang.indexOf(l) === -1) l = defaultLang;
    lang = l;
    pending.map(chose);
    pending = [];
    chose.lang = l;
    util.i18n.stylish(lang);
    return chose;
  };
}());

// 设置相关工具
util.config = null;
util._storage = function () {
  var config = {};
  var keys = [], onputs = {};
  var storageKey = 'user' + util.info.uid + 'config';
  var tonputs = function (key, value, oldValue) {
    (onputs[key] || []).map(function (f) { f(value, oldValue); });
  };
  // 读取到内存
  var readp = false;
  var read = function () {
    if (readp) return;
    util.func.call(function () { readp = false; });
    readp = true;
    util.debug('read GM value');
    try { config = JSON.parse(GM_getValue(storageKey, '{}')); }
    catch (e) { config = {}; }
  };
  // 从内存写出
  var write = function () {
    util.debug('write GM value');
    GM_setValue(storageKey, JSON.stringify(config));
  };
  // 写入到内存
  var put = function (key, value) {
    if (value != null && keys.indexOf(key) === -1) util.debug('put key %s not in keys.', key);
    read();
    var ori = config[key];
    var old = JSON.stringify(config);
    if (value == null) delete config[key];
    else config[key] = JSON.parse(JSON.stringify(value));
    var cur = JSON.stringify(config);
    if (cur === old) return value;
    tonputs(key, value, ori);
    write();
    return value;
  };
  // 从内存读取
  var get = function (key, value, type) {
    if (keys.indexOf(key) === -1) util.debug('get key %s not in keys.', key);
    read();
    if (!(key in config)) return value;
    var val = config[key];
    if (typeof val === 'undefined') return value;
    if (type && (val === null || val.constructor !== type)) return value;
    return JSON.parse(JSON.stringify(val));
  };
  // 当内存配置被修改时调用
  var onput = function (key, f) {
    if (!onputs[key]) onputs[key] = [];
    if (onputs[key].indexOf(f) === -1) onputs[key].push(f);
  };
  // 从字串导入
  var import_ = function (s, cmp) {
    if (cmp == null) cmp = function (n, o) { return n; };
    var version = void 0, backup;
    // 备份当前设置
    try {
      backup = JSON.stringify(config);
      try {
        s = JSON.parse(s);
        var c = s.conf;
        var keys = Object.keys(config).concat(Object.keys(c));
        keys = keys.filter(function (x, i) { return keys.indexOf(x) === i; });
        keys.forEach(function (key) {
          if (key.indexOf('._') !== -1) return;
          put(key, cmp(c[key], get(key)));
        });
        write();
        version = Number(s.ver.match(/\d+$/)[0]) || 0;
      } catch (e) {
        config = JSON.parse(backup);
      }
    } catch (e) { }
    return version;
  };
  // 导出成为字串
  var export_ = function () {
    var info = GM_info || {}, script = info.script || {};
    var conf = {};
    // 不导出键值包含 ._ 的项，因为他们是内部项
    Object.keys(config)
      .filter(function (x) { return x.indexOf('._') === -1; })
      .forEach(function (x) { conf[x] = config[x]; });
    return JSON.stringify({
      'ua': navigator.userAgent,
      'yawf': script.name,
      'ver': script.version,
      'gm': (info.scriptHandler || '') + info.version,
      'conf': conf,
    }, null, 2);
  };
  // 清空设置
  var clear = function () {
    config = {};
    tonputs();
    write();
  };
  // 注册键
  var reg = function (key) { keys.push(key); };
  // 初始化
  return {
    'put': put, 'get': get,
    'onput': onput,
    'read': read, 'write': write,
    'import': import_, 'export': export_,
    'clear': clear,
    'reg': reg,
  };
};

util.init(function () {
  // 保存用户信息
  util.info.uid = unsafeWindow.$CONFIG.uid;
  util.info.nick = unsafeWindow.$CONFIG.nick;
  util.info.lang = unsafeWindow.$CONFIG.lang;
  util.info.skin = unsafeWindow.$CONFIG.skin;
  // 初始化语言选项
  util.i18n.chose = util._languages(util.info.lang);
  Object.keys(text).map(function (key) { util.i18n.chose(text[key]); text[key] = text[key].local; });
  Object.keys(html).map(function (key) { html[key] = util.str.fill(html[key]); });
  // 初始化设置集
  util.config = util._storage();
}, util.priority.FIRST);

// 用户信息
util.info = {};
util.info.uid = null;
util.info.nick = null;
util.info.oid = function () {
  return unsafeWindow.$CONFIG.oid || null;
};
util.info.onick = function () {
  return unsafeWindow.$CONFIG.onick || null;
};

// 打印调试信息
util.debug = util.script.isdebug &&
  console && console.log && console.log.bind(console) ||
  util.func.noop;
util.error = util.script.isdebug &&
  console && console.error && console.error.bind(console) ||
  util.func.noop;

// 桌面提示工具
util.notify = (function () {
  var avaliable = {};
  var shown = [];
  var use = {
    'hasPermission': function () { return null; },
    'requestPermission': function (callback) { return null; },
    'hideNotification': function (notify) { return null; },
    'showNotification': function (id, title, body, icon, delay, onclick) { return null; }
  };

  // 检查一个微博是不是已经被显示过了，如果显示过了不重复显示
  var shownFeed = function (id) {
    var shown = [];
    try {
      shown = JSON.parse(GM_getValue('notification', '[]'));
      shown = Array.from(shown);
      id = String(id);
    } catch (e) { }
    util.debug('%o %s shown feed list: %o', id, shown.indexOf(id) === -1 ? 'not in' : 'in', shown);
    if (shown.indexOf(id) !== -1) return true;
    shown.push(id); shown = shown.slice(-20);
    GM_setValue('notification', JSON.stringify(shown));
    return false;
  };

  // webkitNotifications
  // Tab Notifier 扩展实现此接口，但显示的桌面提示最多只能显示前两行
  if (typeof webkitNotifications !== 'undefined') avaliable.webkit = {
    'hasPermission': function () {
      return [true, null, false][webkitNotifications.checkPermission()];
    },
    'requestPermission': function (callback) {
      return webkitNotifications.requestPermission(callback);
    },
    'hideNotification': function (notify) {
      notify.cancel();
      afterHideNotification(notify);
    },
    'showNotification': function (id, title, body, icon, delay, onclick) {
      if (shownFeed(id)) return null;
      util.debug('show (webkit) notification: %s - %s', title, body);
      var notify = webkitNotifications.createNotification(icon, title, body);
      if (delay && delay > 0) notify.addEventListener('display', function () {
        setTimeout(function () { hideNotification(notify); }, delay);
      });
      if (onclick) notify.addEventListener('click', onclick);
      notify.show();
      return notify;
    },
  };

  // Notification
  // Firefox 22+
  // 显示4秒会自动关闭 https://bugzil.la/875114
  if (typeof Notification !== 'undefined') avaliable.standard = {
    'hasPermission': function () {
      return {
        'granted': true,
        'denied': false,
        'default': null,
      }[Notification.permission];
    },
    'requestPermission': function (callback) {
      return Notification.requestPermission(callback);
    },
    'hideNotification': function (notify) {
      notify.close();
      afterHideNotification(notify);
    },
    'showNotification': function (id, title, body, icon, delay, onclick) {
      if (shownFeed(id)) return null;
      util.debug('show notification: %s - %s', title, body);
      var notify = new Notification(title, { 'body': body, 'icon': icon, 'requireInteraction': !delay });
      if (delay && delay > 0) notify.addEventListener('show', function () {
        setTimeout(function () { hideNotification(); }, delay);
      });
      if (onclick) notify.addEventListener('click', onclick);
      return notify;
    },
  };

  // 有哪些接口可用
  var avaliableNotification = function () {
    return Object.keys(avaliable);
  };
  // 选择用哪个接口
  var choseNotification = function (prefer) {
    return (use = prefer && avaliable[prefer] || avaliable.standard);
  };
  choseNotification();
  // 检查权限
  var hasPermission = function () {
    return use.hasPermission.apply(this, arguments);
  };
  // 请求权限
  var requestPermission = function () {
    return use.requestPermission.apply(this, arguments);
  };
  // 显示消息
  var showNotification = function (title, body, icon, delay, onclick) {
    var notify = use.showNotification.apply(this, arguments);
    shown.push(notify);
    return notify;
  };
  // 隐藏已经显示的消息
  var hideNotification = function (notify) {
    use.hideNotification.apply(this, arguments);
    return notify;
  };
  var afterHideNotification = function (notify) {
    shown = shown.filter(function (x) { return x !== notify; });
  };

  document.addEventListener('unload', function () {
    shown.forEach(hideNotification);
    shown = [];
  });

  return {
    'avaliableNotification': avaliableNotification,
    'choseNotification': choseNotification,
    'hasPermission': hasPermission,
    'requestPermission': requestPermission,
    'showNotification': showNotification,
    'hideNotification': hideNotification
  };

}());

// 管理样式
util.css = (function () {
  var styleText = '', added = false;
  var fun = function (css) { return fun.add.bind(fun, css); };
  fun.add = function (css) { if (!added) styleText += css + '\n'; else GM_addStyle(css); };
  util.init(function () { GM_addStyle(styleText); added = true; }, util.priority.LAST);
  return fun;
}());

// 界面相关
util.ui = {};

// 显示设置按钮
// 包括右上角过滤器图标和设置菜单中的菜单项
util.ui.icon = util.init(function () {
  if (util.page.search) return; // 搜索页面不提供设置窗口
  var onClick = util.func.catched(function (e) { filter.dialog(); e.preventDefault(); });
  var icon = function () {
    var p = document.querySelector('.WB_global_nav .gn_set_list');
    if (!p) return setTimeout(icon, 100);
    var d = util.dom.create(html.icon); p.parentNode.insertBefore(d, p);
    document.querySelector('.gn_filter').addEventListener('click', onClick);
  };
  var menuitem = function () {
    var a = document.querySelectorAll('.gn_topmenulist ul li.line');
    if (!a || !a.length) return setTimeout(menuitem, 100);
    var l = a[a.length - 1];
    var m = util.dom.create(html.menuitem);
    while (m.firstChild) l.parentNode.insertBefore(m.firstChild, l);
    document.querySelector('.yawf-config-menuitem').addEventListener('click', onClick);
  };
  icon(); menuitem();
}, util.priority.LAST);

// 对话框
util.ui.form = function (dom, display, details) {
  var ok = dom.querySelector('[node-type="ok"]');
  var cancel = dom.querySelector('[node-type="cancel"]');
  var close = dom.querySelector('[node-type="close"]');
  var title = dom.querySelector('.title, .W_layer_title');
  var mouse = null, pos;
  // 定位对话框的位置
  var setPos = function (pos) {
    var left = pos[0], top = pos[1];
    left = Math.min(Math.max(0, left), document.body.clientWidth - dom.clientWidth - 2);
    top = Math.min(Math.max(window.pageYOffset, top), window.pageYOffset + window.innerHeight - dom.clientHeight - 2);
    if (left + 'px' !== dom.style.left) dom.style.left = left + 'px';
    if (top + 'px' !== dom.style.top) dom.style.top = top + 'px';
    return [left, top];
  };
  // 网页滚动时维持在页面内
  var hold = function () {
    pos = setPos(pos);
  };
  // 开始拖拽
  var dragMoveStart = function (e) {
    mouse = [e.clientX, e.clientY];
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragMoveDone);
    dom.classList.add('yawf-drag');
    if (dom.setCapture) { dom.setCapture(); }
  };
  // 拖拽移动
  var dragMove = function (e) {
    var mouse_new = [e.clientX, e.clientY];
    pos[0] += mouse_new[0] - mouse[0];
    pos[1] += mouse_new[1] - mouse[1];
    setPos(pos);
    mouse = mouse_new;
  };
  // 拖拽结束
  var dragMoveDone = function () {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragMoveDone);
    dom.classList.remove('yawf-drag');
    if (dom.releaseCapture) { dom.releaseCapture(); }
    pos = setPos(pos);
    mouse = null;
  };
  // 标题栏可以拖拽
  if (title) {
    title.style.cursor = 'move';
    title.addEventListener('mousedown', dragMoveStart);
  }
  // 确定取消等按钮
  if (details.onOk) if (ok) ok.addEventListener('click', details.onOk);
  if (details.onCancel) {
    if (cancel) cancel.addEventListener('click', details.onCancel);
    if (close) close.addEventListener('click', details.onCancel);
  }
  // 背景遮罩
  var cover = util.dom.create(html.cover);
  // 响应按键
  var keys = function (e) {
    if (e.keyCode === util.keyboard.code.ENTER && ok) ok.click(); // Enter
    else if (e.keyCode === util.keyboard.code.ESC && close) close.click(); // Esc
    else return;
    e.stopPropagation(); e.preventDefault();
  };
  // 关闭对话框
  var hide = function () {
    if (typeof form.onbeforehide === 'function') {
      if (util.func.catched(form.onbeforehide)() === false) return;
    }
    dom.className += ' UI_animated UI_speed_fast UI_ani_bounceOut';
    document.removeEventListener('keydown', keys);
    document.removeEventListener('scroll', hold);
    window.removeEventListener('resize', hold);
    document.body.removeChild(cover);
    setTimeout(function () { document.body.removeChild(dom); }, 200);
  };
  // 显示对话框
  var show = function (top, left) {
    document.body.appendChild(cover);
    document.body.appendChild(dom);
    if (top == null) top = (window.innerHeight - dom.clientHeight) / 2;
    if (left == null) left = (window.innerWidth - dom.clientWidth) / 2;
    pos = setPos([left, top + window.pageYOffset]);
    document.addEventListener('keydown', keys);
    document.addEventListener('scroll', hold);
    window.addEventListener('resize', hold);
    document.activeElement.blur();
    dom.className += ' UI_animated UI_speed_fast UI_ani_bounceIn';
    setTimeout(function () {
      dom.className = dom.className.replace(/(?:\s|^)(UI_animated|UI_speed_fast|UI_ani_bounceIn)(?=\s|$)/g, '').trim();
    }, 200);
  };
  if (display) show();
  if (ok) ok.addEventListener('click', hide);
  if (cancel) cancel.addEventListener('click', hide);
  if (close) close.addEventListener('click', hide);
  var form = { 'hide': hide, 'show': show, 'dom': dom, 'onbeforehide': null };
  return form;
};

// 显示一个对话框
util.ui.dialog = function (id, title, fillFun) {
  var dom = util.dom.create(util.str.fill(html.dialog, { 'id': id, 'title': util.str.fill(title) }));
  fillFun(dom.querySelector('[node-type="inner"]'));
  var form = util.ui.form(dom, false, {});
  return form;
};

// 显示一个提示框
util.ui.alert = function (id, details) {
  var dom = util.dom.create(util.str.fill(html.alert, { 'id': id, 'title': details.title, 'text': details.text, 'icon': details.icon || 'ask' }));
  var form = util.ui.form(dom, true, details);
  return form;
};

// 显示一个确定框
util.ui.confirm = function (id, details) {
  var dom = util.dom.create(util.str.fill(html.confirm, { 'id': id, 'title': details.title, 'text': details.text, 'icon': details.icon || 'question' }));
  var form = util.ui.form(dom, true, details);
  return form;
};

util.ui.bubble = function (description, ref) {
  var bubble;
  var rect = ref.getClientRects()[0];
  if (description instanceof Element) bubble = description;
  else bubble = util.dom.create(util.str.fill(html.bubble, { 'text': description }));
  var bor = bubble.querySelector('.W_arrow_bor');
  document.body.appendChild(bubble);
  util.func.call(function () {
    var top0 = rect.top - bubble.clientHeight - 8;
    var top1 = top0 + window.pageYOffset;
    var top2 = rect.bottom + 8 + window.pageYOffset;
    bubble.style.left = rect.left - 32 + rect.width + window.pageXOffset + 'px';
    if (top0 > 0) {
      bubble.style.top = top1 + 'px';
      bor.className = 'W_arrow_bor W_arrow_bor_b';
    } else {
      bubble.style.top = top2 + 'px';
      bor.className = 'W_arrow_bor W_arrow_bor_t';
    }
  });
  return bubble;
};

// 网络访问相关
var network = {};

util.xhr = function (details) {
  util.debug('XHRURL: %o', details.url);
  return GM_xmlhttpRequest(details);
};

// 维护帐号信息，用于显示
network.account = (function () {
  var idCache = {}, nameCache = {}, working = {};
  var request = function (queryStr, onsucc, onerror) {
    // 如果同时已经有了同类请求则等待那个请求的返回
    if (working[queryStr]) return working[queryStr].push([onsucc, onerror]);
    working[queryStr] = [[onsucc, onerror]];
    var done = function (success, data) {
      working[queryStr].forEach(function (w) { w[success ? 0 : 1](data); });
      delete working[queryStr];
    };
    // 请求获取
    util.xhr({
      'method': 'GET',
      'url': util.str.fill(url.newcard, { 'query': queryStr, 'callback': util.str.fcb() }),
      'onload': util.func.catched(function (resp) {
        // 永远不要试图理解一个用 JSON 包裹 HTML 的 API
        var respJson = util.str.parsejsonp(resp.responseText);
        var namecard = util.dom.create('div', respJson.data);
        var avatar = namecard.querySelector('.name dt img').getAttribute('src');
        var name = namecard.querySelector('.name dd a[uid]').getAttribute('title');
        var uid = namecard.querySelector('.name dd a[uid]').getAttribute('uid');
        var data = { 'avatar': avatar, 'id': uid, 'name': name };
        nameCache[name] = idCache[uid] = data;
        done(true, data);
      }, function () { done(false); }),
      'onerror': function () { done(false); },
    });
    return queryStr;
  };
  var byId = function (id, onsucc, onerror) {
    if (idCache[id]) onsucc(idCache[id]);
    else request('id=' + id, onsucc, onerror);
  };
  var byName = function (name, onsucc, onerror) {
    if (nameCache[name]) onsucc(nameCache[name]);
    else request('name=' + encodeURIComponent(name), onsucc, onerror);
  };
  var put = function (data) {
    nameCache[data.name] = idCache[data.id] = data;
  };
  return { 'id': byId, 'name': byName, 'put': put };
}());

network.buffered = (function () {
  var buffer = [], busy = false;
  var delay = function () { return 3000 + Math.round(20 * Math.random()) * 100; };
  var active = function active() {
    if (!(busy = !!buffer.length)) return;
    var callback = buffer.shift();
    callback(function () { setTimeout(active, delay()); });
  };
  return function (callback) {
    buffer.push(callback);
    if (!busy) active();
    return callback;
  };
}());

network.headers = function () {
  return {
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    'Cookie': document.cookie,
    'Referer': location.href,
    'X-Requested-With': 'XMLHttpRequest',
  };
};

network.weibo = {};
// 告诉服务器屏蔽被隐藏的微博
network.weibo.block = (function () {
  var all = [];
  var block = function (mid, callback) {
    util.debug('blocking weibo %s', mid);
    util.xhr({
      'method': 'POST',
      'url': util.str.fill(url.block_wb),
      'headers': network.headers(),
      'data': 'filter_type=0&mid=' + mid + '&justhide=0',
      'onload': function (resp) {
        try { util.debug('block %s response: %o', mid, JSON.parse(resp.responseText)); }
        catch (e) { util.debug('block %s response: %s', mid, resp.responseText); }
        callback();
      },
      'onerror': function () { util.debug('block %s network error', mid); callback(); },
    });
  };
  return function (mid) {
    if (all.indexOf(mid) !== -1) return null; all.push(mid);
    network.buffered(function (callback) { block(mid, callback); });
  };
}());

network.comment = {};
// 删评论
network.comment.del = (function () {
  var del = function (info, callback) {
    util.debug('deleting comment %s', info);
    util.xhr({
      'method': 'POST',
      'url': util.str.fill(url.del_cmt),
      'headers': network.headers(),
      'data': info + '&block=1',
      'onload': function (resp) {
        try { util.debug('delete %s response: %o', info, JSON.parse(resp.responseText)); }
        catch (e) { util.debug('delete %s response: %s', info, resp.responseText); }
        callback();
      },
      'onerror': function () { util.debug('block %s network error', info); callback(); },
    });
  };
  return function (info) {
    network.buffered(function (callback) { del(info, callback); });
  };
}());

network.ua = {};
network.ua.android = 'Mozilla/5.0 (Linux; Android 4.4.2; zh-cn; YAWF) AppleWebKit/537.16 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.16';

network.video = {};
// 通过秒拍视频的 objectid 获取 mp4 文件地址
// 获取方法是模拟安卓用户访问秒拍视频的网页
network.video.get = {};
network.video.get['1034'] = function (id, callback) {
  util.xhr({
    'method': 'GET',
    'url': util.str.fill(url.video_show, { 'id': id }),
    'headers': {
      'User-Agent': network.ua.android
    },
    'onload': function (resp) {
      var d = util.dom.create('div', resp.responseText);
      var video = d.querySelector('video');
      callback(video.getAttribute('src'));
    },
  });
};
network.video.get['2017607'] = function (url, callback) {
  util.xhr({
    'method': 'GET',
    'url': url,
    'headers': {
      'User-Agent': network.ua.android
    },
    'onload': function (resp) {
      var d = util.dom.create('div', resp.responseText);
      var video = d.querySelector('.vid_img');
      callback(video.getAttribute('data-url'));
    },
  });
};

network.image = {};
network.image.get = function (url, callback) {
  util.xhr({
    'method': 'GET',
    'url': url,
    'responseType': 'arraybuffer',
    'onload': function (resp) {
      try {
        callback(resp.response);
      } catch (_ignore) { callback(); }
    },
    'onerror': function () { callback(); },
  });
};

// 看看某个人最近都有哪些微博
// 输入是 uid， 返回的是 mid 数组，或空数组（失败）
network.recent = (function () {
  // 减少访问个人主页的次数
  // 限制一刻钟内最多访问一次某人的主页
  // 重复的访问用缓存解决
  var cache = (function () {
    var data;
    var rm = function () {
      var time = Date.now();
      Object.keys(data).forEach(function (user) { if (data[user].exp < time) delete data[user]; });
    };
    var read = function () { data = JSON.parse(GM_getValue('recentmid', '{}')) || {}; rm(); };
    var write = function () { GM_setValue('recentmid', JSON.stringify(data)); };
    return function (uid, mids) {
      read(); if (mids) data[uid] = { 'exp': Date.now() + 1e6, 'mid': mids }; write();
      return (data[uid] || {}).mid;
    };
  }());
  // 访问个人主页
  var get = function (uid, callback) {
    util.debug('request user page: %o', uid);
    util.xhr({
      'method': 'GET',
      'url': util.str.fill(url.user, { 'uid': uid }),
      'onload': function (resp) {
        try {
          var d = String(resp.responseText);
          var re = /<script>FM\.view\({"ns":"pl\.content\.homeFeed\.index".*"html":(?=.*WB_feed_type)(".*")}\)<\/script>\n/;
          var html = JSON.parse(d.match(re)[1]);
          var dom = util.dom.create('div', html);
          var feeds = Array.from(dom.querySelectorAll('.WB_feed_type[mid]:not([feedtype="ad"])'));
          var mids = feeds.map(function (f) { return f.getAttribute('mid'); });
          util.debug('user page %o found %o messages: %o', uid, mids.length, mids);
          if (mids.length) cache(uid, mids);
          callback(mids);
        } catch (e) {
          util.debug('user page read error: %o', e);
          callback([]);
        }
      },
    });
  };
  // 控制访问频率
  // 每次访问后间隔 2～4 秒再进行下次访问
  var busy = false, queue = [];
  var active = function active() {
    if (!queue.length) return;
    if (busy) return;
    var req = queue.shift();
    get(req[0], function (mids) {
      util.func.call(req[1], mids);
      setTimeout(function () {
        busy = false;
        active();
      }, Math.round(2000 * (1 + Math.random())));
    });
    busy = true;
  };
  return function (uid, callback) {
    var mids = cache(uid);
    if (mids) {
      util.func.call(callback, mids);
      util.debug('read user page %o from cache: %o', uid, mids);
      return;
    }
    queue.push([uid, callback]);
    active();
  };
}());

network.suggest = {};

// 推荐用户或话题等
network.suggest.base = function (func, normalize, empty) {
  var suggestCache = {};
  var current = null, xhr = null;
  if (empty != null) suggestCache[''] = empty;
  return function (query, callback) {
    query = normalize(query);
    if (current === query) return;
    if (current && xhr) xhr.abort();
    if (suggestCache[query]) {
      current = xhr = null;
      callback(suggestCache[query]);
    } else {
      current = query;
      xhr = func(query, function (data) {
        suggestCache[query] = data;
        current = xhr = null;
        callback(data);
      });
    }
  };
};

network.suggest.topsuggest = function (query, callback) {
  return util.xhr({
    'method': 'GET',
    'url': util.str.fill(url.topsuggest, { 'query': encodeURIComponent(query), 'callback': util.str.fcb() }),
    'onload': function (resp) {
      var data = util.str.parsejsonp(resp.responseText).data;
      data.user.forEach(function (user) {
        var data = { 'id': String(user.u_id), 'avatar': user.u_pic, 'name': user.u_name };
        network.account.put(data);
      });
      callback(data);
    },
  });
};

// 推荐用户
network.suggest.user = network.suggest.base(function (query, callback) {
  var result1 = null, result2 = null;
  // 把两个结果合并，自己关注的帐号优先
  var done = function () {
    if (!result1 || !result2) return;
    var results = result2.concat(result1);
    results = results.filter(function (x, i) { return results.indexOf(x) === i; });
    callback(results);
  };
  // 推荐搜索框提供的候选用户
  // 这些一般是微博中关注量较多的帐号
  var network1 = network.suggest.topsuggest(query, function (data) {
    result1 = data.user.map(function (user) { return user.u_name; });
    done();
  });
  // 推荐提到工具提供的候选用户
  // 这些是自己关注的帐号
  var network2 = util.xhr({
    'method': 'GET',
    'url': util.str.fill(url.attention, { 'query': encodeURIComponent(query) }),
    'onload': function (resp) {
      var data = JSON.parse(resp.responseText).data;
      result2 = data.map(function (item) { return item.screen_name; });
      done();
    },
  });
  return {
    'abort': function () {
      network1.abort();
      network2.abort();
    }
  };
}, function (x) { return x.replace(/^@/, ''); }, []);

// 推荐话题
network.suggest.topic = network.suggest.base(function (query, callback) {
  return util.xhr({
    'method': 'GET',
    'url': util.str.fill(url.topicsuggest, { 'query': encodeURIComponent(query) }),
    'onload': function (resp) {
      var data = JSON.parse(resp.responseText).data;
      var formatted = data.map(function (item) { return item.topic; });
      // 有一些地点会混在里面，最后用 “[地点]” 标识
      // 这里将所有有方括号的都删掉
      formatted = formatted.filter(function (topic) { return topic.indexOf(']') === -1; });
      callback(formatted);
    },
  });
}, function (x) { return x.replace(/#/g, ''); }, []);

network.weibo.longtext = (function () {
  var maxlength = 2000, br = 1;
  var wordCount = function (html) {
    var p = util.dom.create('div', html), text = p.textContent, br = p.querySelectorAll('br').length;
    var count = Math.ceil(text.length - (text.match(/[\u0000-\u00ff]/g) || []).length / 2); // 西文字母按半字计
    return { 'count': count, 'br': br };
  };
  var checkLength = function (count, lines) {
    if (maxlength === 2000) return true;
    if (count + lines * br <= maxlength) return true;
    return false;
  };
  // 读写缓存
  var getCache = function () {
    var cache;
    try { cache = JSON.parse(GM_getValue('long_weibo_cache', '{}')); } catch (e) { }
    return cache || {};
  };
  var putCache = function (cache) {
    GM_setValue('long_weibo_cache', JSON.stringify(cache));
  };
  // 更新缓存
  var writeCache = function (mid, html, count, br) {
    var cache = getCache();
    while (Object.keys(cache).length > 2e4 / maxlength) {
      delete cache[Math.min.apply(Math, Object.keys(cache))];
    }
    cache[mid] = { 'html': html, 'count': count, 'br': br };
    util.debug('getlongtext cache write: %o -> %o', mid, cache[mid]);
    util.debug('getlongtext cache keys: %o', Object.keys(cache));
    putCache(cache);
  };
  // 检查缓存
  var readCache = function (mid) {
    var cache = getCache();
    util.debug('getlongtext cache check (mid: %o): %o', mid, cache[mid]);
    if (mid in cache && cache[mid].html &&
      checkLength(cache[mid].count, cache[mid].br)) return cache[mid].html;
    if (mid in cache && cache[mid].count &&
      !checkLength(cache[mid].count, cache[mid].br)) return cache[mid].count;
    return null;
  };
  // 检查某条微博的完整内容
  var getter = function (mid, callback) {
    // 首先查找缓存，或者得到html，或者得到文本长度
    var html = readCache(mid) || null;
    if (html) { callback(html); return; }
    // 缓存没有联网查找
    util.xhr({
      'method': 'GET',
      'url': util.str.fill(url.getlongtext, { 'mid': mid }),
      'onload': function (resp) {
        try { html = JSON.parse(resp.responseText).data.html || null; } catch (e) { }
        if (!html) { callback(null); return; }
        var wc = wordCount(html);
        if (!checkLength(wc.count, wc.br)) html = null;
        writeCache(mid, html, wc.count, wc.br);
        callback(html || wc.count);
      },
    });
  };
  // 设置一下最大接受的长度
  getter.setMaxLength = function (m, b) { maxlength = m; br = b; };
  return getter;
}());

// 检查关注的人的列表
network.following = (function () {
  // 检查某一页关注人列表，获取关注人相关文档树节点
  var getFollowingContent = function (page, callback) {
    // 避免两个标签页同时获取关注列表造成冲突
    var last_try = Number(GM_getValue('following_list_fetching_timestamp', 0));
    if (last_try < Date.now() && last_try > Date.now() - 30e3) return;
    GM_setValue('following_list_fetching_timestamp', Date.now());
    return util.xhr({
      'method': 'GET',
      'url': page,
      'onload': function (resp) {
        GM_deleteValue('following_list_fetching_timestamp');
        var dom = null;
        try {
          var d = String(resp.responseText);
          var re = /<script>FM\.view\({"ns":"pl\.relation\.myFollow\.index".*"html":(?=.*member_box)(".*")}\)<\/script>\n/;
          var html = JSON.parse(d.match(re)[1]);
          dom = util.dom.create('div', html);
        } catch (e) { }
        callback(dom);
      },
      'onerror': function () { callback(null); },
    });
  };
  // 从关注人的头像文档树节点中获取相关信息
  var getUserInfo = function (img) {
    var description, avatar;
    description = img.getAttribute('title');
    avatar = img.getAttribute('src');
    return (util.func.catched(function () {
      // 关注了一个用户
      var id = util.str.parsequery(img.getAttribute('usercard') || '').id; if (!id) return;
      var href = util.str.fill(url.user, { 'uid': id });
      return {
        'id': id, // 向前兼容的id，后面的版本要使用href代替id作为唯一标识
        'type': 'user',
        'user': id,
        'href': href,
        'avatar': avatar,
        'name': '@' + description,
        'description': '@' + description,
      };
    })()) || (util.func.catched(function () {
      // 关注了一支股票
      var id = (img.parentNode.href.match(/weibo.com\/p\/230677([a-zA-Z\d]+)/) || [])[1]; if (!id) return;
      var href = util.str.fill(url.stock, { 'stockid': id });
      return {
        'id': '#' + img.parentNode.href, // 向前兼容
        'type': 'stock',
        'stock': id,
        'href': href,
        'avatar': avatar,
        'name': '$' + description + '$',
        'description': '$' + description + '$',
      };
    })()) || (util.func.catched(function () {
      // 关注了一个话题
      var ref = img.parentNode.href.match(/huati.weibo.com/); if (!ref) return;
      var text = img.title;
      // 原本的链接包含的是编号，这里换成话题文本，因为话题文本比编号更固定：编号可以被删除，文本无法修改
      var href = util.str.fill(url.topic, { 'topic': text });
      return {
        'id': '#' + img.parentNode.href, // 向前兼容
        'type': 'topic',
        'topic': text,
        'href': href,
        'avatar': avatar,
        'name': '#' + description + '#',
        'description': '#' + description + '#',
      };
    })()) || (util.func.catched(function () {
      // 未知关注内容
      return {
        'id': '#' + img.parentNode.href, // 向前兼容
        'type': 'unknown',
        'href': href,
        'avatar': avatar,
        'description': '?' + description,
        'name': '?' + description,
      };
    })());
  };
  // 从文档树中获取关注人的头像并以此获取关注人信息
  var getUsersInfo = function (dom) {
    return Array.from(dom.querySelectorAll('.member_box .member_wrap .mod_pic .pic_box a > img'))
      .map(getUserInfo);
  };
  // 从文档树中检查一共有多少页关注人
  var getPageCount = function (dom) {
    try {
      var pagelink = dom.querySelectorAll('.W_pages .page');
      var last = pagelink[pagelink.length - 2];
      return Number(last.textContent);
    } catch (e) { return 1; }
  };
  // 格式化关注信息
  var formatFollowing = function (following) {
    var users = {};
    return following.filter(function (user) {
      if (user.id in users) return false;
      users[user.id] = user;
      return true;
    });
  };
  // 使用 GM_values 维护状态
  var getStatus = function () {
    var status = {}, valid = true;
    try { status = JSON.parse(GM_getValue('following_list_fetching', '{}')); } catch (e) {}
    if (!status) valid = false;
    else if (status.uid !== util.info.uid) valid = false;
    else if (!Number(status.timestamp) || status.timestamp > Date.now() || status.timestamp < Date.now() - 600e3) valid = false;
    if (!valid) status = { 'uid': util.info.uid, 'n': 0, };
    return status;
  };
  var putStatus = function (status, updateTimestamp) {
    if (updateTimestamp !== false) status.timestamp = Date.now();
    GM_setValue('following_list_fetching', JSON.stringify(status));
  };
  var gotResult = function (status, callback) {
    putStatus(status, false);
    util.func.call(callback, status.following);
  };
  // 获取我自己的关注信息
  return function (callback) {
    var uid = util.info.uid;
    // 获取下一页数据
    // 这个函数被设计成通过 GM_values 维护状态，因为这样可以有效避免因为获取过程中关闭网页造成的问题
    (function getNextPage() {
      var status = getStatus(), page;
      if (status.pageCount && status.n === status.pageCount) return gotResult(status, callback);
      if (++status.n === 1) page = util.str.fill(url.myfollow, { 'uid': uid }); // 第一页使用默认的地址获取
      else page = status.template.replace(/_page=\d+/, '_page=' + status.n); // 其他页使用从第一页得到的地址
      var xhr = getFollowingContent(page, function (dom) {
        // 如果已经获取到了最后一页，那么结束并得到结果
        // 如果是第一页，要获取一些额外的信息，包括一共多少页以及接下来每页的地址
        if (status.n === 1) {
          status.pageCount = getPageCount(dom);
          if (status.pageCount > 1) status.template = dom.querySelector('.W_pages a.page[href]').href;
        }
        util.debug('fetching following list... %o / %o done', status.n, status.pageCount);
        try {
          status.following = (status.following || []).concat(getUsersInfo(dom));
          putStatus(status);
          setTimeout(getNextPage, 3e3);
        } catch (e) { setTimeout(getNextPage, 300e3); }
      });
      var busy = !xhr;
      if (busy) setTimeout(getNextPage, 10e3);
    }());
  };
}());

// 过滤器
var filter = {};

// 过滤器的过滤规则
filter.filters = function () {
  var list = [];
  var add = function (priority, rule) {
    list.push({ 'priority': priority, 'rule': rule });
    list.sort(function (x, y) { return y.priority - x.priority; });
  };
  var parse = function (obj, confs) {
    var result = null;
    list.some(function (item) {
      try { result = item.rule(obj, confs) || result; }
      catch (e) { util.error('Exception while parsing rule %o: %o\n%o', item.rule, e, e.stack); }
      if (result) util.debug('%o[%o](%o) -> %s', item.rule, item.rule && item.rule.name, obj, result);
      return result !== null;
    });
    return result;
  };
  return {
    'add': add,
    'parse': parse,
  };
};

filter.rules = filter.filters();
filter.comment = filter.filters();

// 单条微博页面永远不应当隐藏微博
filter.rules.add(1e6, function singleWeiboPageUnsetRule(feed) {
  return document.querySelector('[id^="Pl_Official_WeiboDetail__"]') ? 'unset' : null;
});

// 头条文章是一条微博，类似于单条微博，不应当隐藏
filter.rules.add(1e6, function singleWeiboPageUnsetRule(feed) {
  return util.dom.matches(feed, '.WB_artical *') ? 'unset' : null;
});

// 过滤器的对话框
filter.dialog = (function () {
  var dialog = null;
  var lastTab = 0, defaultTab = 1;
  // 初始化选项卡处理
  var dialogTabs = function (list, inner, page) {
    var litems = Array.from(inner.querySelectorAll('.yawf-config-header .minitb_item'));
    var llinks = litems.map(function (x) { return x.querySelector('.minitb_lk'); });
    var layers = Array.from(inner.querySelectorAll('.yawf-config-body .yawf-config-layer'));
    var body = inner.querySelector('.yawf-config-body');
    var currentIndex = null;
    // 显示第几个选项卡
    var choseLList = function (i) {
      if (currentIndex !== null) (function (i) {
        if (list[i].hide) list[i].hide();
        layers[i].style.display = 'none';
        layers[i].innerHTML = '';
        litems[i].classList.remove('current');
        if (llinks[i]) llinks[i].classList.remove('S_bg2');
      }(currentIndex));
      (function () {
        layers[i].style.display = 'block';
        list[i].show(layers[i]);
        litems[i].classList.add('current');
        if (llinks[i]) llinks[i].classList.add('S_bg2');
      }());
      currentIndex = lastTab = i;
      util.func.call(function () { body.scrollTop = 0; });
    };
    // 为每个选项卡关联显示的回调函数
    list.map(function (item, i) {
      item.active = function () { choseLList(i); };
      var a = llinks[i]; if (!a) return;
      a.addEventListener('mousedown', item.active);
      a.addEventListener('keydown', item.active);
    });
    // 初始选择一个选项卡
    choseLList(page);
  };
  return function showDialog(page, count) {
    var showDialogInner = function (inner) {
      var list = filter.collection.group.list;
      inner.innerHTML = [html.configHeaderTop,
        html.configHeaderBottom,
        html.configLayerTop,
        list.map(function (item) {
          return util.str.fill(html.configLayerItem, {
            'name': item.name + 'FilterGroupLayer',
          });
        }).join(''),
        html.configLayerBottom,
        html.configFooter,
      ].join('');
      var ul = inner.querySelector('.yawf-config-header ul');
      list.map(function (item, index) {
        if (item.list) return item.list(item, index);
        return util.dom.create('ul', util.str.fill(html.configHeaderItem, {
          'name': (item.pgroup ? text.indent : '') + text[item.name + 'FilterGroupTitle'],
          'aclass': index === 0 ? 'S_bg5' : 'S_bg1',
          'liclass': index === 0 ? 'current' : ' ',
        })).firstChild;
      }).forEach(function (li) { ul.appendChild(li); });
      util.func.call(function () { dialog.show(0); });
      var pgnum = list.indexOf(page);
      if (pgnum === -1) pgnum = lastTab || defaultTab;
      dialogTabs(list, inner, pgnum);
    };
    if (!(dialog = util.ui.dialog('yawf-config', '{{configDialogTitle}}', showDialogInner))) {
      if (!count || count < 100) setTimeout(showDialog, 100, page, (count || 0) + 1);
    }
  };
}());

// 快速创建过滤器
filter.fast = {};

// 快速创建过滤器的对话框
filter.fast.dialog = function (candidate, selected) {
  var dialogInner = function (inner) {
    inner.innerHTML = html.fastFilterHeader + html.fastFilterFooter;
    var items = inner.querySelector('#yawf-fast-filter-list');
    var selects = [], group_shown = [];
    var checkboxs = candidate.map(function (c) {
      var item = util.dom.create('ul', html.fastFilterItem).firstChild;
      var inner = item.querySelector('.yawf-fastFilterItemInner');
      var checked = c.filter.description(inner, c.value) !== false;
      var checkbox = item.querySelector('input[type="checkbox"], input[type="radio"]');
      var group = checkbox.getAttribute('yawf-checkbox-group');
      if (group_shown.indexOf(group) === -1) {
        group_shown.push(group);
        if (selected === true) checked = true;
      }
      if (selected === false) checked = false;
      if (!c.selected) checked = false;
      var select = item.querySelector('select');
      checkbox.checked = checked; select.value = 'blacklist';
      selects.push(select);
      var updateSelect = util.func.catched(function () {
        selects.forEach(function (s) {
          if (s === select) return;
          var values = Array.from(s.querySelectorAll('option'))
            .map(function (x) { return x.value; });
          var fallback = ['whitelist', 'foldlist', 'blacklist'];
          var i = fallback.indexOf(select.value);
          while (values.indexOf(fallback[i]) === -1) i++;
          s.value = fallback[i];
        });
      });
      select.addEventListener('change', updateSelect);
      select.addEventListener('keyup', updateSelect);
      // 处理有可能没有折叠列表的情况
      if (c.filter.listtype) {
        var options = Array.from(item.querySelectorAll('option'));
        options.forEach(function (option) {
          if (c.filter.listtype.indexOf(option.value) === -1)
            option.parentNode.removeChild(option);
        });
      }
      items.appendChild(item);
      return checkbox;
    });
    // 找到所有选择了的过滤器
    var chosen = function () {
      var active = [];
      checkboxs.forEach(function (checkbox, i) {
        if (!checkbox.checked) return;
        active.push({
          'filter': candidate[i].filter,
          'value': candidate[i].value,
          'action': selects[i].value
        });
      });
      return active;
    };
    // 确定按钮
    var ok = inner.querySelector('[action-type="ok"]');
    var updateOkButton = function () {
      if (chosen().length) ok.classList.remove('W_btn_a_disable');
      else ok.classList.add('W_btn_a_disable');
    };
    ok.addEventListener('click', function () {
      var active = chosen();
      if (!active.length) return null;
      active.forEach(function (act) {
        act.filter.addconf(act.filter.rawvalue(act.value), act.action);
      });
      dialog.hide();
    });
    checkboxs.forEach(function (checkbox) {
      checkbox.addEventListener('change', updateOkButton);
    });
    updateOkButton();
    // 取消按钮
    var cancel = inner.querySelector('[action-type="cancel"]');
    cancel.addEventListener('click', function () { dialog.hide(); });
  };
  var dialog = util.ui.dialog('yawf-drop-select', '{{fastCreateChoseTitle}}', dialogInner);
  util.func.call(function () { dialog.show(); });
  return dialog;
};

// 检查拖拽一个元素是不是该触发快速创建过滤器的显示
filter.fast.valid = (function () {
  var validators = [];
  // 检查某个元素是否被至少一个函数识别
  var test = function (element) {
    for (var i = 0, l = validators.length; i < l; i++) {
      var result = util.func.catched(validators[i])(element);
      if (result) return result;
    }
    return false;
  };
  // 添加一个识别在某种特定元素的函数
  var add = function add(validator) {
    if (!validator || validators.indexOf(validator) !== -1) return;
    validators.push(validator);
  };
  return {
    'add': add,
    'test': test,
  };
}());

// 从拖拽得到的东西里面找出来我们关心的东西
filter.fast.recognize = (function () {
  var listeners = [];
  var got = function (element, element2) {
    util.debug('got %o', element);
    if (!element) if (element2) return got(element2); else return;
    // 问所有过滤器是不是需要
    var candidate = [];
    listeners.forEach(function (details, i) { candidate[i] = null; });
    listeners.forEach(function (details, i) {
      var callback = function callback(val) {
        if (!val) return callback([]);
        else if (!Array.isArray(val)) return callback([val]);
        else candidate[i] = val.map(function (val) {
          var selected = details.selected && details.selected(element2 || element) || false;
          return { 'filter': details, 'value': val, 'selected': selected };
        });
        // 如果还有没填写的，那么等待所有的函数填写好
        if (candidate.length !== candidate.filter(Boolean).length) return;
        // 找到所有备选的情况给用户做选择
        var chosen = candidate.reduce(function (x, y) { return x.concat(y); });
        if (chosen.length) filter.fast.dialog(chosen);
        else if (element2) got(element2);
      };
      util.func.catched(details.recognizer)(element, callback);
    });
  };
  var add = function (details) {
    listeners.push(details);
  };
  return {
    'got': got,
    'add': add,
  };
}());

// 使用右键菜单屏蔽
filter.fast.right = (function () {
  var counter = 0, filters = [];
  var addmenu = function (feed, isChild) {
    if (feed.querySelector('menu')) return;
    var menu = document.createElement('menu');
    menu.setAttribute('type', 'context');
    var submenu = menu.appendChild(document.createElement('menu'));
    submenu.setAttribute('label', text.contextMenuCreateLabel);
    filters.forEach(function (details) {
      var items = details.contextmenu(feed);
      if (!items) return;
      if (!Array.isArray(items)) items = [items];
      if (!items.length) return;
      var container = submenu;
      if (details.menugrouped) {
        container = document.createElement('menu');
        container.setAttribute('label', util.str.fill(details.menugrouped));
      }
      var itemtext = {};
      items.forEach(function (item) {
        var text = details.menudesc(item);
        if (!text || itemtext[text]) return; itemtext[text] = true;
        var menuitem = document.createElement('menuitem');
        menuitem.setAttribute('label', text);
        menuitem.addEventListener('click', function () {
          details.recognizer(item, function (value) {
            filter.fast.dialog([{ 'filter': details, 'value': value, 'selected': true }], true);
          });
        });
        container.appendChild(menuitem);
      });
      if (details.menugrouped && container.firstChild) submenu.appendChild(container);
    });
    if (menu.firstChild && submenu.firstChild) {
      feed.appendChild(menu);
      feed.setAttribute('contextmenu', (menu.id = 'yawf-weibo-menu-' + (++counter)));
    }
  };
  var active = function () {
    observer.weibo.after(function (feed) {
      var son = Array.from(feed.querySelectorAll('.WB_sonFeed .WB_feed_detail'));
      [feed].concat(son).forEach(function (feed, index) { addmenu(feed, !!index); });
    });
  };
  var add = function (details) { if (details.contextmenu) filters.push(details); };
  return {
    'add': add,
    'active': active,
  };
}());

filter.fast.item = function (details) {
  filter.fast.valid.add(details.validator);
  filter.fast.recognize.add(details);
  filter.fast.right.add(details);
};

// 将文本、链接等拖拽到框内，快速创建过滤器
filter.fast.active = (function () {
  var dropArea = null;
  // 获得拖拽释放的元素之后，根据不同过滤器的设置处理元素
  var got = function (element, target) {
    filter.fast.recognize.got(element, target);
  };
  // 隐藏微博拖拽到发布框上传图片功能的占位符
  var hideImgUpload = function () {
    var img_upload = document.querySelector('.send_weibo .img_upload');
    if (img_upload) img_upload.style.display = 'none';
  };
  var area = (function () {
    var cont, target = null, active = false;
    var start = function (element) {
      if (!filter.fast.valid.test(element)) return false;
      target = element;
      return (active = true);
    };
    var done = function () {
      if (!active) return true;
      return (active = false);
    };
    var show = function () {
      dropArea.style.display = 'block';
    };
    var hide = function () {
      if (target && target.hover) target.hover();
      target = null;
      dropArea.style.display = 'none';
      hideImgUpload();
    };
    var init = function () {
      dropArea = util.dom.create(html.dropArea);
      cont = dropArea.querySelector('#yawf-drop-area-content');
      document.body.appendChild(dropArea);
    };
    var content = function () {
      util.debug('content: %o', cont.innerHTML);
      cont.normalize();
      if (cont.firstChild === cont.lastChild) return cont.firstChild;
      else return cont;
    };
    var clear = function () { cont.innerHTML = ''; };
    var enter = function () { dropArea.classList.add('valid'); };
    var leave = function () { dropArea.classList.remove('valid'); };
    return {
      'show': show, 'hide': hide,
      'start': start, 'done': done,
      'content': content, 'clear': clear,
      'init': init,
      'enter': enter, 'leave': leave,
    };
  }());
  // 初始化拖拽相关事件监听
  var events = function () {
    var valid = false;
    // 开始拽
    document.addEventListener('dragstart', function (e) {
      valid = false; area.leave();
      if (area.start(e.target)) area.show();
    }, false);
    // 拽完了
    document.addEventListener('dragend', function (e) {
      if (!area.done() && valid) got(area.content(), e.target);
      area.clear(); area.hide();
    }, false);
    dropArea.addEventListener('dragenter', function (e) { valid = true; area.enter(); });
    dropArea.addEventListener('dragleave', function (e) { valid = false; area.leave(); });
  };
  return function () {
    area.init();
    events();
  };
}());

// 注册和扩展数组类型的内容
filter.extent = (function () {
  var extp = {};
  var reg = function (key, func) {
    if (typeof extp[key] === 'function') return;
    else {
      var words = extp[key] || [];
      extp[key] = func;
      func(words);
    }
  };
  var act = function (key, words) {
    if (typeof extp[key] === 'function') return extp[key](words);
    else extp[key] = (extp[key] || []).concat(words);
  };
  return {
    'reg': reg,
    'act': act,
  };
}());

// 过滤后对文档树的一些修改
filter.fix = {};

// 添加点击后展开折叠消息的事件
filter.fix.fold = (function () {
  var fixOne = util.func.catched(function (feed) {
    feed.addEventListener('click', function showFeed() {
      feed.removeEventListener('click', showFeed);
      if ((feed.getAttribute('yawf-display') || '').lastIndexOf('-fold') === -1) return;
      var display = (feed.getAttribute('yawf-display') || '').replace(/-fold$/g, '-unfold');
      feed.setAttribute('yawf-display', display);
    });
    // 添加作者信息
    try {
      var author = weibo.feed.author.name(feed);
      if (author) feed.setAttribute('yawf-author', author);
    } catch (e) { }
  });
  var fix = function (feed) {
    var feeds = [feed].concat(Array.from(feed.querySelectorAll('.WB_feed_type')));
    feeds.forEach(function (feed) {
      if ((feed.getAttribute('yawf-display') || '').lastIndexOf('-fold') === -1) return;
      fixOne(feed);
    });
  };
  return fix;
}());

// 隐藏的微博直接从列表中去掉，减少开销是次要的，主要是兼容 JK 等快捷键
filter.fix.hidden = function (feed) {
  if ((feed.getAttribute('yawf-display') || '').lastIndexOf('-hidden') === -1) return;
  setTimeout(function () {filter.fix.hidden.done(feed); }, 100);
};
filter.fix.hidden.done = function (feed) {
  feed.parentNode.removeChild(feed);
};

// 隐藏的评论也直接删掉好了
filter.fix.cmthidden = function (comment) {
  if ((comment.getAttribute('yawf-cmt-display') || '').lastIndexOf('-hidden') === -1) return;
  return setTimeout(function () { filter.fix.cmthidden.done(comment); }, 100);
};
filter.fix.cmthidden.done = function (comment) {
  comment.parentNode.removeChild(comment);
};

// 真正微博过滤的核心模块
filter.active = function (feed) {
  var son = Array.from(feed.querySelectorAll('.WB_sonFeed .WB_feed_detail'));
  var sson = [];
  var fixFeed = function () {
    filter.fix.fold(feed);
    filter.fix.hidden(feed);
  };
  var isHidden = (function () {
    var action = filter.rules.parse(feed, false) || 'unset';
    feed.setAttribute('yawf-display', 'display-' + action);
    fixFeed(feed);
    return action.match(/^(.*-)?hidden$/);
  }());
  if (isHidden) return false;
  son.forEach(function (feed, index) {
    var isSon = !!index;
    var action = filter.rules.parse(feed, isSon) || 'unset';
    feed.setAttribute('yawf-display', 'display-' + action);
    if (isSon && !action.match(/^(.*-)?hidden$/)) sson.push(feed);
    fixFeed(feed);
  });
  var hd = feed.querySelector('.WB_feed_together .wft_hd');
  if (hd) {
    util.debug('son count: %o, not hidden: %o - %o', son.length, sson.length, sson);
    if (sson.length === 0) {
      hd.parentNode.parentNode.removeChild(hd.parentNode);
    } else hd.querySelector('[node-type="followNum"]').textContent = sson.length;
  }
  return true;
};

// 过滤评论的核心模块
filter.cmt_active = function (comment) {
  var action = filter.comment.parse(comment) || 'unset';
  comment.setAttribute('yawf-cmt-display', 'display-' + action);
  if (action === 'hidden') filter.fix.cmthidden(comment);
};

// 按类型过滤器函数
filter.typed = {};

// 根据选择类型不同生成一些存取设置的函数
filter.typed.config = (function () {
  // 字符串
  var baseConfig = function (type, standlize) {
    if (!standlize) standlize = util.func.identity;
    return function (item) {
      var skey = item.key;
      if (skey) {
        if (item.internal) skey = skey.replace(/\.([^\.]*)$/, '._$1');
        if (!item.getconf) item.getconf = function () {
          var def = 'default' in item ? item['default'] : (type ? type() : undefined);
          return standlize(item.conf = util.config.get(skey, def, type));
        };
        if (!item.putconf) item.putconf = function (conf) {
          return util.config.put(skey, standlize(item.conf = conf));
        };
        util.config.reg(skey);
      }
      if (item.getconf && item.putconf) return item.putconf(item.getconf());
    };
  };
  // 集合类型的add/del操作
  var itemsConfig = function (item) {
    var value = baseConfig(Array, function (x) { return x.map(String); })(item);
    // 除了基本的get/put外，提供高级的add/del
    if (!item.delconf) item.delconf = function (str) {
      var val = item.getconf();
      val = val.filter(function (x) { return x !== str; });
      return item.putconf(val);
    };
    if (!item.addconf) item.addconf = function (str) {
      item.delconf(str);
      var val = item.getconf(); val.push(str);
      return item.putconf(val);
    };
    // 此外还有供扩展用的extent
    if (item.extent && Array.isArray(item.extent)) {
      if (!item.extentconf) {
        item.extentconf = function (words) {
          if (item.add) words = words.map(item.add.bind(item));
          item.extent = item.extent.concat(words);
        };
      }
      filter.extent.reg(item.key, item.extentconf);
    }
    return value;
  };

  return {
    'string': baseConfig(String),
    'strings': itemsConfig,
    'boolean': baseConfig(Boolean),
    'users': itemsConfig,
    'number': baseConfig(Number),
    'range': baseConfig(Number),
    'select': baseConfig(String),
    'color': baseConfig(String),
    'key': baseConfig(Number),
    'noui': baseConfig(),
    'subscribe': baseConfig(Boolean),
  };
}());

// 给输入框添加自动补全功能
util.complete = (function () {
  var enabled = false;
  var enable = function () { enabled = true; };
  var types = {
    'user': network.suggest.user,
    'topic': network.suggest.topic,
  };
  var timeout = null, shown = '';
  // 更新推荐词
  var updateSuggest = function (type, container, input) {
    var ul = container.querySelector('ul');
    return function (text) {
      shown = text;
      ul.innerHTML = '';
      types[type](text, function (items) {
        items.forEach(function (item) {
          var h = util.str.fill(html.suggestionItem, { 'text': util.str.escape.xml(item) });
          var li = util.dom.create('ul', h).firstChild;
          ul.appendChild(li);
          li.addEventListener('mouseenter', function () { focus(container, li); });
          li.addEventListener('mousedown', function (e) { done(input, li); e.preventDefault(); });
        });
        container.setAttribute('yawf-complete-items', items.length);
      });
    };
  };
  // 检查文本录入，等用户输入间隙的时候再联网推荐候选词
  var checkText = function (input, suggest) {
    var currentCheck = '';
    return function () {
      if (input.value === currentCheck) return; currentCheck = input.value;
      if (timeout !== null) clearTimeout(timeout);
      if (shown !== input.value) suggest('');
      timeout = setTimeout(function () {
        timeout = null;
        suggest(input.value);
      }, 50);
    };
  };
  // 给每个输入框添加对应的候选框
  var addSelectList = function (input) {
    var container = util.dom.create('div', util.str.fill(html.suggestionContainer)).firstChild;
    document.body.appendChild(container);
    util.func.call(function () { updatePosition(input, container); });
    return container;
  };
  // 自动更新候选框的位置
  var updatePosition = function (input, container) {
    var bak = [];
    (function position() {
      if (!util.dom.matches(input, 'body *')) {
        container.parentNode.removeChild(container);
        return;
      }
      var rect = input.getClientRects()[0]; if (!rect) return;
      var top = (rect.bottom + window.pageYOffset).toFixed(0);
      var left = (rect.left + window.pageXOffset).toFixed(0);
      if (!bak || left !== bak[0] || top !== bak[1]) {
        bak = [left, top];
        container.style.top = top + 'px';
        container.style.left = left + 'px';
      }
      setTimeout(position, 500);
    }());
  };
  // 更新当前选中的候选项是哪个
  var current = function (container, offset) {
    var li = Array.from(container.querySelectorAll('li')), count = li.length;
    if (count === 0) return null;
    var cur = container.querySelector('.cur');
    var index = li.indexOf(cur);
    if (index === -1 && offset === 0) return null;
    else if (index === -1 && offset === -1) index = count - 1;
    else if (index === -1 && offset === 1) index = 0;
    else index = (index + offset + count) % count;
    if (cur) cur.classList.remove('cur');
    li[index].classList.add('cur');
    return li[index];
  };
  var focus = function (container, li) {
    if (li.classList.contains('cur')) return;
    var cur = container.querySelector('.cur');
    if (cur) cur.classList.remove('cur');
    li.classList.add('cur');
  };
  // 选中候选项时提交该选项
  var done = function (input, li) {
    if (li === null) return;
    input.value = li.getAttribute('yawf-suggestion');
    input.form.querySelector('.yawf-configAdd').click();
  };
  // 给某个输入框注册候选菜单
  var reg = function (input, type) {
    if (!enabled) return;
    var container = addSelectList(input);
    var suggest = updateSuggest(type, container, input);
    var checker = checkText(input, suggest);
    var update = function (event) {
      if (event && event.type === 'keypress') {
        var key = util.keyboard.get(event);
        switch (key) {
          case util.keyboard.code.ENTER:
            done(input, current(container, 0));
            event.preventDefault();
            break;
          case util.keyboard.code.UP: current(container, -1); break;
          case util.keyboard.code.DOWN: current(container, 1); break;
        }
      }
      checker(input, suggest);
    };
    var blur = function () {
      container.style.display = 'none';
    };
    var focus = function (e) {
      container.style.display = ''; update(e);
    };
    input.addEventListener('change', update);
    input.addEventListener('keyup', update);
    input.addEventListener('keypress', update);
    input.addEventListener('input', update);
    input.addEventListener('focus', focus);
    input.addEventListener('blur', blur);

    input.setAttribute('autocomplete', 'off');
    return update;
  };
  return {
    'enable': enable,
    'reg': reg,
  };
}());

// 根据不同类型生成带有事件的文档结点
filter.typed.dom = (function () {
  // 各种不同类型的显示都基于此段逻辑
  var base = function (configs) {
    // 将文本内容补全
    var textBinder = function (item) {
      return function (text, values) {
        return util.str.fill(text,
          values || {},
          item,
          item.i18n && item.i18n.local || {},
          item.texts || {},
          { 'key': '' });
      };
    };
    // 生成 DOM
    var genDom = function (line, ref) {
      // 在需要引用其他控件的地方留空
      line = line.replace(/{{<([a-zA-Z0-9_-]*)>}}/g, function (m, p) {
        return ref(p) ? util.str.fill(html.configPrefill, { 'id': p }) : m;
      });
      // 引用其他设置项
      line = line.replace(/\[\[([^\]]*)\]\]/g, function (_, i) {
        return util.str.fill(html.refConfigItem, { 'ref': i });
      });
      // 构造基本的文档
      var dom = util.dom.create('div', line).firstChild;
      // 将引用的设置控件填回
      var pf = Array.from(dom.querySelectorAll('span.yawf-configPrefill'));
      pf.forEach(function (pfi) {
        pfi.parentNode.replaceChild(ref(pfi.id).show(true), pfi);
      });
      // 将引用的其他设置项填回
      var rf = Array.from(dom.querySelectorAll('[yawf-ref]'));
      rf.forEach(function (ref) {
        var dom = util.obj.dotted(filter.items, ref.getAttribute('yawf-ref')).show();
        dom.classList.remove('yawf-configItem'); dom.classList.add('yawf-refConfigItem');
        ref.parentNode.replaceChild(dom, ref);
      });
      return dom;
    };
    // 如果 innerOnly 则只生成输入框
    return function (innerOnly) {
      var item = this;
      var textbind = textBinder(item);
      var outer, inner, placeholder = '{{}}';
      if (innerOnly) outer = placeholder;
      else {
        var text = textbind(item.text || '').replace(/\|\|/g, html['||']).replace(/\|/g, html['|']);
        if (text.indexOf(placeholder) === -1) text = placeholder + text;
        outer = textbind(configs.outer || html.configDefault, { 'text': text });
      }
      inner = textbind(configs.inner || '');
      // 得到包括输入框的的 HTML
      var line = outer.replace(placeholder, function () { return inner; });
      var dom = genDom(line, function (id) { return item.ref[id]; });
      if (configs.binder) configs.binder(dom, item);
      return dom;
    };
  };

  // 对大部分情况适用的简单包装
  var simple = function (name, binder) {
    return base({
      'outer': html['config' + name],
      'inner': html['config' + name + 'Input'],
      'binder': binder,
    });
  };

  // 副标题
  var subtitle = simple('Subtitle');
  // 文本
  var text = simple('Text');
  // 不缩进的文本
  var remark = simple('Remark');
  // 一个空的 label
  var label = simple('Label');

  // 一个提示图标
  var sicon = function () {
    var item = this;
    var dom = util.dom.create(util.str.fill(html.sicon, item));
    var bubble = null, remover = null;
    var enter = function () { if (remover) clearTimeout(remover); };
    var leave = function () {
      if (!bubble) return;
      remover = setTimeout(function () {
        bubble.parentNode.removeChild(bubble);
        bubble = null;
      }, 200);
    };
    // 生成气泡
    var create = function () {
      var bubble = null;
      var sim = function (item) {
        var bubble = base({ 'outer': html.bubble }).call(item);
        return util.ui.bubble(bubble, dom);
      };
      bubble = sim(item);
      if (item.bubbled) item.bubbled(bubble);
      return bubble;
    };
    dom.addEventListener('mouseenter', function () {
      enter(); if (bubble) return; bubble = create();
      bubble.addEventListener('mouseenter', enter);
      bubble.addEventListener('mouseleave', leave);
    });
    dom.addEventListener('mouseleave', leave);
    return dom;
  };

  // 真假值的设置项
  var bool = simple('Boolean', function (dom, item) {
    util.dom.bind.checkbox(dom.querySelector('input'), item);
  });

  // 选择框设置项
  var select = simple('Select', function (dom, item) {
    var select = dom.querySelector('select');
    var defaultValue = item['default'] || item.select.key;
    var keys = item.select.map(function (option) {
      select.appendChild(util.dom.create('select', util.str.fill(html.option, option)).firstChild);
      return option.value;
    });
    util.dom.bind.select(select, item, function (val) {
      return keys.indexOf(val) === -1 ? defaultValue : val;
    });
  });

  // 字符串的设置项
  var string = simple('String', function (dom, item) {
    var textarea = dom.querySelector('textarea');
    var onchange = util.dom.bind.text(textarea, item);
    textarea.addEventListener('keyup', function () {
      util.func.call(onchange);
    });
  });

  // 颜色的设置项
  var color = simple('Color', function (dom, item) {
    util.dom.bind.text(dom.querySelector('input'), item);
  });

  // 数字的设置项
  var number = simple('Number', function (dom, item) {
    var number = dom.querySelector('input');
    var max = Infinity, min = -Infinity;
    if ('max' in item) max = item.max;
    if ('min' in item) min = item.min;
    if (min > max) min = max;
    number.min = min; number.max = max;
    util.dom.bind.text(number, item, function (val) {
      if (isNaN(Number(val))) return (val = 0);
      return Math.min(max, Math.max(min, Number(val)));
    });
  });

  // 字符串数组设置项模板
  var items = function (outer, genli) {
    return base({
      'outer': outer,
      'binder': function (dom, item) {
        var form = dom.querySelector('form');
        var input = dom.querySelector('input');
        var ul = dom.querySelector('ul.yawf-configItems');
        var shown = {};
        // 将某个已经有的字符串显示到末尾
        var moveToEnd = function (x) {
          var p = x.parentNode; p.appendChild(p.removeChild(x));
        };
        // 显示一个新的字符串
        var showStrings = function (userinput, str, onsucc, ondone) {
          genli(item, userinput, str, function (str, li) {
            if (ondone) ondone();
            if (str == null || !li) return;
            if (shown[str]) return moveToEnd(shown[str]);
            var del = li.querySelector('a.icon_close, a.ficon_close');
            del.addEventListener('click', function () {
              delete shown[str];
              if (item.del) item.del(str);
              li.parentNode.removeChild(li);
              item.delconf(str);
            });
            ul.appendChild(shown[str] = li);
            if (onsucc) onsucc(str);
          });
        };
        item.getconf().forEach(function (str) { showStrings(false, str); });
        form.addEventListener('submit', function (e) {
          e.preventDefault();
          var str = input.value;
          input.disabled = true;
          showStrings(true, str, function (str) {
            if (item.add) item.add(str);
            item.addconf(str);
          }, function () {
            input.value = '';
            input.disabled = false;
            if (reloadComplete) reloadComplete();
          });
        });
        if (item.complete) {
          var reloadComplete = util.complete.reg(input, item.complete);
        }
      }
    });
  };

  // 字符串设置项
  var strings = items(html.configStrings, function (item, userinput, str, callback) {
    if (userinput && item.add && !(str = item.add(str))) callback();
    else callback(str, util.dom.create('ul', util.str.fill(html.configStringsItem, { 'item': item.display ? item.display(str) : str })).firstChild);
  });

  // 用户列表的设置项
  var users = items(html.configUsers, function (item, userinput, str, callback) {
    var showUserNotExistError = function () {
      util.ui.alert('yawf-user-not-exist', {
        'title': util.str.fill('{{accountNotExistErrorTitle}}'),
        'text': util.str.fill('{{{accountNotExistError}}}', { 'name': util.str.escape.xml(str) }),
        'icon': 'error'
      });
      callback();
    };
    if (userinput) {
      if (!(str = str.trim().replace(/^@/, ''))) return callback();
      network.account.name(str, function (info) {
        if (!info) showUserNotExistError();
        else if (item.add && !item.add(info)) callback();
        else callback(info.id, util.dom.create('ul', util.str.fill(html.configUsersItem, info)).firstChild);
      }, showUserNotExistError);
    } else {
      var emptyInfo = { 'id': str, 'name': ' ', 'avatar': ' ' };
      var li = util.dom.create('ul', util.str.fill(html.configUsersItem, emptyInfo)).firstChild;
      callback(str, li);
      network.account.id(str, function (info) {
        var u = li.querySelector('[uid]');
        u.setAttribute('uid', info.id); u.setAttribute('title', info.name); u.textContent = info.name;
        var p = li.querySelector('.pic img');
        p.src = info.avatar;
      });
    }
  });

  // 一个有数字和垂直范围条的输入框
  var range = simple('Range', function (dom, item) {
    var n = dom.querySelector('input[type="number"]');
    var r = dom.querySelector('input[type="range"]');
    var step = item.step || 1;
    n.max = item.max; r.max = item.max;
    n.min = item.min; r.min = item.min;
    n.step = step; r.step = step;
    n.style.width = 10 * String(item.max).length + 15 + 'px';
    var onchange = util.dom.bind.text(n, item, function (val) {
      if (isNaN(parseInt(val, 10))) return item['default'] || item.min;
      var ret = Math.min(Math.max(parseInt(val, 10), item.min), item.max);
      return Math.round((ret - item.min) / step) * step + item.min;
    });
    r.value = n.value;
    var updateN = function () { if (r.value !== n.value) n.value = r.value; onchange(); };
    var updateR = function () { if (r.value !== n.value) r.value = n.value; onchange(); };
    r.addEventListener('change', updateN); r.addEventListener('mousemove', updateN);
    n.addEventListener('change', updateR); n.addEventListener('keypress', updateR);
  });

  // 一个输入按键的输入框
  var key = simple('Key', function (dom, item) {
    var kb = util.keyboard;
    var i = dom.querySelector('input'), s = dom.querySelector('button');
    var copyName = function () { s.textContent = kb.name(Number(i.value)); };
    var ignores = [kb.code.TAB, kb.code.TAB | kb.alter.SHIFT];
    var eventClear = function (e) {
      var val = kb.get(e);
      if (ignores.indexOf(val) !== -1) return;
      e.stopPropagation();
      e.preventDefault();
    };
    var onchange = util.dom.bind.text(i, item, function (val) {
      util.func.call(copyName); return Number(val);
    });
    dom.addEventListener('keydown', function (e) {
      var val = kb.get(e);
      if (ignores.indexOf(val) !== -1) return;
      if (val === kb.code.ESC) val = 0;
      i.value = val;
      copyName();
      onchange();
      eventClear(e);
    }, false);
    dom.addEventListener('keyup', eventClear, false);
    dom.addEventListener('keypress', eventClear, false);
    i.addEventListener('change', copyName);
    s.addEventListener('click', function () { s.focus(); }); // 兼容 Safari
    util.func.call(copyName);
  });

  var noui = function () { };

  // 订阅
  var subscribe = simple('Subscribe', function (dom, item) {
    var attr = ['yawf-configSubscribeDisabled', 'yawf-configSubscribeEnabled'];
    var update = function () {
      dom.classList.remove(attr[0]); dom.classList.remove(attr[1]);
      if (item.conf) dom.classList.add(attr[1]); else dom.classList.add(attr[0]);
    };
    update();
    var button = function (s) { return function () { item.putconf(s); update(); }; };
    dom.querySelector('.yawf-subscribeDisable').addEventListener('click', button(false));
    dom.querySelector('.yawf-subscribeEnable').addEventListener('click', button(true));
  });

  return {
    'subtitle': subtitle,
    'text': text,
    'remark': remark,
    'label': label,
    'sicon': sicon,
    'string': string,
    'color': color,
    'number': number,
    'select': select,
    'strings': strings,
    'boolean': bool,
    'users': users,
    'range': range,
    'key': key,
    'noui': noui,
    'subscribe': subscribe,
  };
}());

filter.collection = {};
// 过滤器管理器
filter.collection.group = (function () {
  var list = [], preinit = true;
  // 添加到表格中
  var add = function (details) {
    list.push(details);
    if (!preinit) details.init();
    return details;
  };
  // 网页加载完毕时初始化
  util.init(function () {
    list.forEach(function (x) { x.init(); });
    preinit = false;
  }, util.priority.DEFAULT + util.priority.BEFORE);
  return {
    'add': add,
    'list': list,
  };
}());

// 过滤器集合
filter.collection.item = (function () {
  var items = [], grouped = {}, loaded = false;
  // 注册一个过滤器，通过 filter.item 调用
  var add = function (item) {
    items.push(item);
    var group = grouped[item.group] = grouped[item.group] ||
      { 'title': null, 'items': [] };
    if (item.type === 'subtitle') group.title = group.title || item;
    else group.items.push(item);
    if (loaded && item._init) util.func.catched(item._init)();
    return item;
  };
  // 初始化所有过滤器
  util.init(function () {
    items.forEach(function (item) {
      if (item._init) util.func.catched(item._init)();
    });
    loaded = true;
  }, util.priority.DEFAULT);
  // 根据分组重新排列设置界面的若干设置项
  var order = function (items) {
    var sorted = [], item, i, j;
    items = items.map(function (x) { return [false, x]; });
    items = items.filter(function (x) { return x[1].type === 'subtitle'; })
      .concat(items.filter(function (x) { return x[1].type !== 'subtitle'; }));
    for (i = 0; i < items.length; i++) {
      if (items[i][0]) continue;
      sorted.push(item = items[i][1]);
      if (!item.group || item.type !== 'subtitle') continue;
      for (j = i + 1; j < items.length; j++) if (item.group === items[j][1].group) {
        items[j][0] = true;
        if (items[j][1].type !== 'subtitle') sorted.push(items[j][1]);
      }
    }
    return sorted;
  };
  // 根据条件选出一些过滤器
  var list = function (matcher) {
    if (!matcher) return items.slice(0, items.length);
    var found = [];
    items.filter(matcher).forEach(function (item) {
      found.push(item);
      if (item.group) {
        if (item.type === 'subtitle') found.push(grouped[item.group].items);
        else found.push(grouped[item.group].title);
      }
    });
    found = found.filter(function (item, index) {
      return found.indexOf(item) === index;
    });
    found = order(found);
    // 统计有多少个过滤器
    var count = function () {
      return found.filter(function (x) {
        return x.type !== 'subtitle' && x.type !== 'text' && x.type !== 'remark';
      }).length;
    };
    // 将这些过滤器显示到指定的位置
    var show = function (body) {
      // 依次列出所有新的设置项
      found.forEach(function (item) {
        var dom = item._show(body);
        // 在列出时标明所属分类
        if (item.type === 'subtitle' && item.grouped && item.grouped.length) {
          var text = util.str.fill('{{' + item.grouped[0].name + 'FilterGroupTitle}} - ');
          var node = document.createTextNode(util.str.fill(text));
          dom.insertBefore(node, dom.firstChild);
        }
      });
    };
    return {
      'items': found,
      'count': count,
      'show': show,
    };
  };
  return {
    'list': list,
    'order': order,
    'add': add,
  };
}());

// 过滤器组
filter.group = function (groupName) {
  var items = [], defaultGroup = 'default';
  // 向过滤器组里面添加一个过滤器
  var add = function (item) {
    if (!item.group) {
      if (item.type === 'subtitle') defaultGroup = item.text;
      item.group = defaultGroup;
    } else defaultGroup = item.group;
    items.push(item); return item;
  };
  // 网页被初始化时初始化所有过滤器
  var init = function () { };
  // 需要显示选项时生成界面
  var show = function (inner) {
    items = filter.collection.item.order(items);
    items.forEach(function (item) { item._show(inner); });
  };
  // 设定是否是二级分组
  var addto = function (pgroup) {
    group.pgroup = pgroup;
    return group;
  };
  // 注册到过滤器分组
  var group = {
    'name': groupName,
    'show': show,
    'init': init,
    'add': add,
    'addto': addto,
    'pgroup': null,
  };
  return filter.collection.group.add(group);
};
filter.groups = {};

// 过滤器组
filter.item = function (item) {
  // 先加入所有被引用的对象
  if (item.ref) Object.keys(item.ref).forEach(function (key) {
    var refitem = item.ref[key];
    refitem.key = item.key + '.' + key;
    refitem.isref = item;
    filter.item(refitem);
  });
  // 初始化函数
  item._init = function () {
    // 初始化过滤器的设置
    if (item.type && filter.typed.config[item.type])
      item.conf = filter.typed.config[item.type](item);
    // 初始化过滤器内的文本
    if (item.i18n) util.i18n.chose(item.i18n);
    // 初始化过滤器的显示
    if (!item.show && item.type && filter.typed.dom[item.type])
      item.show = filter.typed.dom[item.type].bind(item);
    // 过滤器自己的初始化
    if (item.init) item.init();
    // 真假设置项若设置激活时调用
    if (item.type === 'boolean' && item.conf && item.ainit) item.ainit();
    // 将规则加入到列表中
    if (item.rule) filter.rules.add(item.priority || 0, item.rule.bind(item));
    if (item.comment) filter.comment.add(item.priority || 0, item.comment.bind(item));
  };
  item._show = util.func.catched(function (inner) {
    var dom = item.show && item.show(dom) || null;
    if (dom && item.shown) item.shown(dom);
    if (dom) inner.appendChild(dom);
    return dom;
  });
  item.addto = function (group) {
    item.grouped = (item.grouped || []).concat([group]);
    group.add(item); return item;
  };
  return filter.collection.item.add(item);
};
filter.items = {};

// 预置过滤器类型
filter.predef = {};

// 白名单、黑名单和折叠名单一式三份
filter.predef.wbfc = function (details, typedFilterGroup) {
  var items = [
    { 'type': 'whitelist', 'priority': 1e5, 'action': 'show' },
    { 'type': 'blacklist', 'priority': 0, 'action': 'hidden' },
    { 'type': 'foldlist', 'priority': -1e5, 'action': 'fold' },
  ], rules;
  if (typedFilterGroup) {
    rules = filter.items[typedFilterGroup.name][details.name] = {};
  } else {
    typedFilterGroup = filter.predef.group(details.name).addto(filter.groups.base);
    rules = filter.items[details.name] = {};
  }
  rules.title = filter.item({
    'group': details.name,
    'type': 'subtitle',
    'text': '{{' + details.name + 'FilterDetails}}{{<i>}}',
    'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{' + details.name + 'FilterDetailsDesc}}' } }
  }).addto(typedFilterGroup);
  if (details.listtype) {
    items = items.filter(function (item) {
      return details.listtype.indexOf(item.type) !== -1;
    });
  }
  if (details.title && details.title.after) details.title.after();
  items.forEach(function (item) {
    if (details[item.type] && details[item.type].before) details[item.type].before();
    // 过滤器
    var rule = {
      'group': details.name,
      'version': details.version,
      'type': details.type || 'strings',
      'key': 'weibo.filters.' + details.name + '.' + item.type,
      'priority': item.priority,
      'text': '{{{' + item.type + 'FilterDesc}}}<br />{{' + details.name + 'FilterDesc}}',
      'typed': '{{' + details.name + 'FilterDetails}}',
      'extent': [],
      'shown': function (dom) {
        dom.querySelector('.yawf-configDesc').classList.add('yawf-' + item.type + 'FilterTitle');
      },
    };
    if (details.add) rule.add = details.add.bind(rule);
    if (details.display) rule.display = details.display.bind(rule);
    if (details.rule) rule.rule = details.rule.bind(rule, item.action);
    if (details.comment) rule.comment = details.comment.bind(rule, item.action);
    if (details.complete) rule.complete = details.complete;
    if (details[item.type] && details[item.type].override) {
      Object.keys(details[item.type].override).forEach(function (attr) {
        rule[attr] = details[item.type].override[attr](rule[attr]);
      });
    }
    rules[item.type] = filter.item(rule).addto(typedFilterGroup);
    if (details[item.type] && details[item.type].after) details[item.type].after();
  });
  // 快速创建过滤器的拖动
  if (details.fast) {
    var fast = {
      'validator': details.fast.validator,
      'recognizer': details.fast.recognizer,
      'selected': details.fast.selected,
      'description': details.fast.description,
      'rawvalue': function (val) {
        var value = details.fast.add(val);
        if (details.add) value = details.add(value);
        return value;
      },
      'addconf': function (value, action) { rules[action].addconf(value); },
      'contextmenu': details.fast.contextmenu,
      'menudesc': details.fast.menudesc,
      'menugrouped': details.fast.menugrouped,
    };
    if (details.listtype) fast.listtype = details.listtype;
    filter.fast.item(fast);
  }
  return typedFilterGroup;
};

// 新建一个设置标签页
filter.predef.group = function (name) {
  filter.groups[name] = filter.group(name);
  filter.groups[name].items = filter.items[name] = {};
  return filter.groups[name];
};

// 新建一个小标题
filter.predef.subtitle = function (group, subgroup, text) {
  filter.items[group][subgroup] = {};
  filter.items[group][subgroup].title = filter.item({
    'group': subgroup,
    'type': 'subtitle',
    'text': text,
  }).addto(filter.groups[group]);
};

// 快速创建过滤器的描述
filter.fast.description = {};
// 生成一个有输入框的描述
filter.fast.description.input = function (inner, val, name, attr) {
  // 创建一个带编辑框的选项
  inner.innerHTML = util.str.fill('{{{' + name + 'FilterFast}}}');
  var labelc = util.dom.create(html.fastFilterString);
  var fillArg = {}; fillArg[attr] = html.fastFilterStringInput;
  labelc.querySelector('span').innerHTML = util.str.fill('{{{' + name + 'FilterFastInput}}}', fillArg);
  // 处理编辑框的相关事件
  var input = labelc.querySelector('input'); input.value = val[attr];
  var ref = inner.parentNode; ref.parentNode.insertBefore(labelc, ref.nextSibling);
  input.addEventListener('change', function () {
    val[attr] = input.value; if (!val[attr]) return;
  });
};
// 生成一个没有输入框的描述
filter.fast.description.noinput = function (inner, val, name, attr) {
  var fillobj = {};
  fillobj[attr] = util.str.escape.xml(val[attr]);
  inner.innerHTML = util.str.fill('{{{' + name + 'FilterFast}}}', fillobj);
};
// 生成一个分组的描述
filter.fast.description.group = function (inner, group, name) {
  // 设置选择框的编号和分组信息
  var container = inner.parentNode.parentNode;
  var checkbox = container.querySelector('input[type=checkbox]');
  checkbox.name = 'yawf-fast-' + group + '-' + name;
  checkbox.setAttribute('yawf-checkbox-group', group);
  // 同组的选项只应该打开至多一个
  checkbox.addEventListener('change', util.func.catched(function () {
    if (!checkbox.checked) return;
    var all = Array.from(container.parentNode.querySelectorAll('input[yawf-checkbox-group="' + group + '"]'));
    var evt = document.createEvent('HTMLEvents'); evt.initEvent("change", false, true);
    all.forEach(function (i) { if (i === checkbox || !i.checked) return; i.checked = false; i.dispatchEvent(evt); });
  }));
};
// 快速创建一个关键词或正则式的过滤器时包含编辑框
filter.fast.description.gen = function (details) {
  return function (inner, val) {
    var desc = filter.fast.description;
    if (details.input) desc.input(inner, val, details.name, details.attr);
    else desc.noinput(inner, val, details.name, details.attr);
    desc.group(inner, details.group, details.name);
    return details.chosen || false;
  };
};

// 快速创建关键词过滤器相关函数
filter.fast.content = {};
filter.fast.content.validator = function contentValidator(element) {
  if (element.nodeType !== Node.TEXT_NODE) {
    if (element.firstChild && element.firstChild === element.lastChild)
      return contentValidator(element.firstChild);
    else return false;
  }
  return util.dom.matches(element.parentNode, '.WB_text, .WB_text *');
};
filter.fast.content.recognizer = {};
filter.fast.content.recognizer.keyword = function keyword(element, callback) {
  if (element.nodeType === Node.TEXT_NODE)
    callback({ 'text': element.textContent.trim() });
  else if (element.tagName && ['a', 'img'].indexOf(element.tagName.toLocaleLowerCase()) !== -1)
    callback();
  else if (element.firstChild === element.lastChild)
    keyword(element.firstChild, callback);
  else callback();
};
filter.fast.content.recognizer.regexp = function (element, callback) {
  filter.fast.content.recognizer.keyword(element, function (val) {
    if (val && val.text) callback({ 'text': util.str.escape.regexp(val.text) });
    else callback();
  });
};
filter.fast.content.add = function (val) { return val.text; };

// 快速创建帐号过滤器相关函数
filter.fast.account = {};
filter.fast.account.validator = function (element) {
  var c = util.dom.create('body', element.outerHTML);
  // 可以处理对用户的链接
  if (c.querySelector('[usercard*="name="], [usercard*="id="]')) return true;
  // 用户卡片里面的头像和链接
  if (c.querySelector('[uid][title]')) return true;
  // 可以处理用户页面的头像和链接
  if (c.querySelector('.photo[alt]')) return true;
  return false;
};
filter.fast.account.recognizer = function (element, callback) {
  // 找不到对应人时显示相关错误信息
  var onerror = function () {
    if (!document.querySelector('#network-account-fail')) util.ui.alert('network-account-fail', {
      'title': util.str.fill('{{accountNotExistErrorTitle}}'),
      'text': util.str.fill('{{{accountNotExistError}}}', { 'name': util.str.escape.xml(info.name) }),
      'icon': 'error'
    });
    callback();
  };
  // 检查结点
  if (element.nodeType === Node.TEXT_NODE) { callback(); return; }
  var c = util.dom.create('body', element.outerHTML);
  var info = { 'name': null, 'id': null };
  // 如果是用户链接的话
  var usercard = c.querySelector('[usercard*="name="], [usercard*="id="]');
  if (usercard) (function () {
    var ucinfo = util.str.parsequery(usercard.getAttribute('usercard'));
    if (ucinfo.name) info.name = ucinfo.name;
    if (ucinfo.id) info.id = ucinfo.id;
  }());
  // 如果是个人主页的头像的话
  var photo = c.querySelector('.photo[alt]');
  if (photo) (function () {
    info.name = photo.getAttribute('alt');
  }());
  // 用户卡片
  var uid = c.querySelector('[uid][title]');
  if (uid) {
    info.id = uid.getAttribute('uid');
    info.name = uid.getAttribute('title');
  }
  // 看我们是否有 id 或者 name，如果有的话，那么就说明是个用户
  if (info.id && info.name) callback(info);
  else if (info.id) network.account.id(info.id, callback, callback);
  else if (info.name) network.account.name(info.name, callback, onerror);
  else callback();
};
filter.fast.account.addname = function (val) { return val.name; };
filter.fast.account.addid = function (val) { return val.id; };

// 快速创建话题过滤器相关函数
filter.fast.topic = {};
filter.fast.topic.validator = function (element) {
  return filter.fast.topic.recognizer.topic(element, Boolean);
};
filter.fast.topic.recognizer = {};
filter.fast.topic.recognizer.topic = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  var topic = c.querySelector('a.a_topic, a[suda-uatrack*="1022-topic"]');
  if (topic) return callback({ 'topic': topic.textContent.trim().replace(/#/g, '') });
  var topic_rs = c.querySelector('a[suda-uatrack*="hottopic_r"]');
  if (topic_rs) return callback({ 'topic': (topic_rs.title || topic_rs.textContent).trim().replace(/#/g, '') });
  return callback();
};
filter.fast.topic.recognizer.rtopic = function (element, callback) {
  return filter.fast.topic.recognizer.topic(element, function (val) {
    if (val && val.topic) callback({ 'topic': util.str.escape.regexp(val.topic) });
    else callback();
  });
};
filter.fast.topic.add = function (val) { return val.topic; };

// 快速创建话题过滤器相关函数
filter.fast.source = {};
filter.fast.source.validator = function (element) {
  return filter.fast.source.recognizer(element, Boolean);
};
filter.fast.source.recognizer = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  var source = c.querySelector([
    '[action-type="app_source"]',
    '[suda-data="key=tblog_home_new&value=feed_come_from"]',
    '[suda-uatrack*="key=profile_feed"][suda-uatrack*="value=pubfrom_host"]',
    'a[href$="from=feed_card"]',
    'a[href$="source=weibosource"]',
    'a[href*="weibo.com/p/100127p"]',
  ].join(','));
  source = source && (source.getAttribute('title') || source.textContent || text.sourceUnkown);
  if (source && source !== text.defaultSource) return callback({ 'source': source });
  else return callback();
};
filter.fast.source.add = function (val) { return val.source; };

// 快速创建超链接地址过滤器的相关函数
filter.fast.hyperlink = {};
filter.fast.hyperlink.validator = function (element) {
  return filter.fast.hyperlink.recognizer(element, Boolean);
};
filter.fast.hyperlink.recognizer = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  do {
    var link = c.querySelector('a[href*="//t.cn/"][yawf-link-type="O"]');
    if (!link) break;
    return callback({ 'url': link.href });
  } while (false);
  do {
    var linkc = c.querySelector('a[href*="//feed.mix.sina.com.cn/link_card/redirect?"][yawf-link-type="O"]'); if (!linkc) break;
    var url = util.str.parsequery(linkc.search.slice(1)).url; if (!url) break;
    return callback({ 'url': url });
  } while (false);
  return callback();
};
filter.fast.hyperlink.add = function (val) { return val.url; };

// 快速创建超链接标题的过滤器
filter.fast.linktitle = {};
filter.fast.linktitle.validator = function (element) {
  return filter.fast.linktitle.recognizer(element, Boolean);
};
filter.fast.linktitle.recognizer = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  var link = c.querySelector('a[action-type="feed_list_url"][title], a[action-type="fl_url_addparams"][title]');
  if (!link) return callback();
  var title = link.title;
  if (title.match(/^https?:/) || title === '网页链接') return callback();
  return callback({ 'title': title });
};
filter.fast.linktitle.add = function (val) { return val.title; };

// 判断一个元素是否应当被选中
filter.fast.selected = {};
(function () {
  var selectors = {
    'feed': '[mid] .WB_detail, [mid] .WB_detail *',
    'comment': '[comment_id] *',
    'author': '[mid] .WB_face .face *, [mid] > .WB_face *, [mid] .WB_detail > .WB_info .W_fb, [mid] > .list_con > .WB_text > a[usercard^="id="]',
    'mention': '[mid] .WB_text a[usercard^="name="]',
    'original': '[mid] .WB_feed_expand .WB_info .W_fb',
  };
  var define = function (type, notin) {
    filter.fast.selected[type] = function (target) {
      if (target.nodeType === Node.TEXT_NODE) target = target.parentNode;
      return !notin.some(function (other) {
        return util.dom.matches(target, selectors[other]);
      });
    };
  };
  define('feed', ['comment']);
  define('comment', ['feed', 'author']);
  define('author', ['comment', 'mention', 'original']);
  define('mention', ['comment', 'author', 'original']);
  define('original', ['comment', 'author', 'mention']);
  filter.fast.selected.never = util.func.constant(false);
  filter.fast.selected.always = util.func.constant(true);
}());

// 获得一条微博的各方面信息
var weibo = { 'feed': {}, 'comment': {}, 'common': {} };

// 选取微博内容、微博转发的内容
weibo.feed.content = function (feed, f) {
  var content = feed.querySelector('[node-type="feed_list_content"]');
  var reason = feed.querySelector('[node-type="feed_list_reason"]');
  var items = [];
  if (content) items = items.concat(Array.from(f(content)));
  if (reason) items = items.concat(Array.from(f(reason)));
  return items;
};

// 选取评论内容
weibo.comment.content = function (comment, f) {
  return Array.from(f(comment.querySelector('.WB_text')));
};

// 从一条微博中获取他的文本
weibo.common.text = function (content, preclt) {
  var active = [function (node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent.trim();
  }, function (node) {
    if (util.dom.matches(node, 'br, .yawf-linebreak')) return '\n';
  }];
  // 获取特定元素的文本
  var types = {};
  types.mention = function (node) {
    if (util.dom.matches(node, 'a[usercard]')) return node.textContent.trim();
  };
  types.topic = function (node) {
    if (util.dom.matches(node, 'a.a_topic')) return node.textContent.trim();
  };
  types.stock = function (node) {
    if (util.dom.matches(node, 'a[suda-uatrack*="1022-stock"]')) return node.textContent.trim();
  };
  types.linkt = function (node) {
    if (util.dom.matches(node, 'a[action-type="feed_list_url"][title]')) return node.getAttribute('title').trim();
  };
  types.linku = function (node) {
    if (util.dom.matches(node, 'a[action-type="feed_list_url"][target="_blank"]')) return node.getAttribute('href').trim();
  };
  types.emotion = function (node) {
    if (util.dom.matches(node, 'img[type="face"][alt]')) return node.getAttribute('alt').trim();
  };
  types.emoji = function (node) {
    if (!util.dom.matches(node, '[src*="//img.t.sinajs.cn/t4/appstyle/expression/emimage/e"]')) return void 0;
    // 这些表情都在 0xe000+ 的区间，对应的 utf8 编码都是三位，所以一定是 e 开头
    var code = node.getAttribute('src').match(/(e.....)\.png/)[1];
    var unicode = util.str.emoji(code);
    return unicode;
  };
  var match = function (feed) {
    return content(feed, function (m) {
      return Array.from(m.childNodes).map(function (node) {
        var result = [];
        active.forEach(function (f) {
          var val = f(node);
          if (val) result.push(val);
        });
        return result.join(' ');
      });
    }).join('');
  };
  match.active = function (type) {
    active.push(util.func.catched(types[type]));
    return type;
  };
  (preclt || []).forEach(match.active);
  return match;
};

weibo.feed.text = weibo.common.text(weibo.feed.content, ['emoji']);
weibo.comment.text = weibo.common.text(weibo.comment.content, ['topic', 'linkt', 'stock', 'emoji']);

// 找到一条微博的表情符号
weibo.common.emoji = function (feed) {
  var e = Array.from(feed.querySelectorAll('img[type="face"][alt]'));
  return e.map(function (e) { return e.getAttribute('alt'); });
};

weibo.feed.emoji = function (feed) {
  return weibo.feed.content(feed, weibo.common.emoji);
};

weibo.comment.emoji = function (comment) {
  return weibo.comment.content(comment, weibo.common.emoji);
};

// 从一条微博中找到头像
weibo.feed.avatar = function (feed) {
  return feed.querySelector('.WB_face img').src;
};

// 从一条微博中找到他的作者
weibo.feed.author = {};
weibo.feed.author.dom = function (feed) {
  return feed.querySelector('.WB_detail>.WB_info>.WB_name[usercard], .WB_detail>.WB_info>.W_fb[usercard]') ||
    feed.querySelector('.WB_text>a.W_fb[usercard]:first-child');
};
weibo.feed.author.id = function (feed) {
  var author = weibo.feed.author.dom(feed);
  if (!author) return null;
  return util.str.parsequery(author.getAttribute('usercard')).id;
};
weibo.feed.author.name = function (feed) {
  var author = weibo.feed.author.dom(feed);
  if (!author) return null;
  return author.textContent.trim();
};

// 从一条微博中找到他的原作者
weibo.feed.original = {};
weibo.feed.original.dom = function (feed) {
  return feed.querySelector('.WB_media_expand .WB_info .WB_name, .WB_expand .WB_info .W_fb');
};
weibo.feed.original.id = function (feed) {
  var originalAuthor = weibo.feed.original.dom(feed);
  if (!originalAuthor) return null;
  return util.str.parsequery(originalAuthor.getAttribute('usercard')).id;
};
weibo.feed.original.name = function (feed) {
  var originalAuthor = weibo.feed.original.dom(feed);
  if (!originalAuthor) return null;
  return originalAuthor.textContent.trim().replace(/^@/, '');
};
weibo.feed.original.text = function (feed) {
  return feed.querySelector('.WB_expand .WB_text').textContent;
};

// 找到在一条微博里面被提到的人的昵称
weibo.feed.mentions = {};
weibo.feed.mentions.dom = function (feed) {
  return weibo.feed.content(feed, function (m) {
    return Array.from(m.querySelectorAll('a[usercard^="name="][href*="loc=at"]'));
  });
};
weibo.feed.mentions.name = function (feed) {
  return weibo.feed.mentions.dom(feed).map(function (link) {
    return util.str.parsequery(link.getAttribute('usercard')).name;
  });
};

// 评论中都涉及了哪些用户，包括评论作者、回复的人和提到的人
weibo.comment.author = {};
weibo.comment.author.dom = function (comment) {
  return comment.querySelector('.WB_face img[alt]') || comment.querySelector('.WB_text a[usercard]');
};
weibo.comment.author.id = function (comment) {
  var author = weibo.comment.author.dom(comment);
  if (!author) return null;
  return util.str.parsequery(author.getAttribute('usercard')).id;
};
weibo.comment.author.name = function (comment) {
  var author = weibo.comment.author.dom(comment);
  if (!author) return null;
  return author.getAttribute('alt');
};
weibo.comment.mentions = {};
weibo.comment.mentions.dom = function (comment) {
  return Array.from(comment.querySelector('.WB_text').querySelectorAll('a[usercard^="name="]'));
};
weibo.comment.mentions.name = function (comment) {
  var mentions = weibo.comment.mentions.dom(comment);
  return mentions.map(function (a) { return util.str.parsequery(a.getAttribute('usercard')).name; });
};
weibo.comment.users = {};
weibo.comment.users.name = function (comment) {
  return [weibo.comment.author.name(comment)].concat(weibo.comment.mentions.name(comment)).filter(Boolean);
};

// 找到在一条微博里面提到的所有话题
weibo.feed.topics = {};
weibo.common.topics = function (feed) {
  return Array.from(feed.querySelectorAll('.a_topic'));
};
weibo.feed.topics.dom = function (feed) {
  return weibo.feed.content(feed, weibo.common.topics);
};
weibo.feed.topics.text = function (feed) {
  return weibo.feed.topics.dom(feed)
    .map(function (topic) { return topic.textContent; });
};

weibo.comment.topics = {};
weibo.comment.topics.dom = function (feed) {
  return weibo.comment.content(feed, weibo.common.topics);
};
weibo.comment.topics.text = function (feed) {
  return weibo.comment.topics.dom(feed)
    .map(function (topic) { return topic.textContent; });
};

// 获取一条微博的所有来源（包括转发）
weibo.feed.sources = {};
weibo.feed.sources.dom = function (feed) {
  return Array.from(feed.querySelectorAll('.WB_from *'))
    .filter(filter.fast.source.validator);
};
weibo.feed.sources.text = function (feed) {
  return weibo.feed.sources.dom(feed).map(function (st) {
    return st.getAttribute('title') || st.textContent || text.sourceUnkown;
  }).filter(Boolean);
};

// 从一条微博中找到所有超链接地址
weibo.feed.hyperlinks = {};
weibo.feed.hyperlinks.dom = function (feed) {
  return weibo.feed.content(feed, function (m) {
    return Array.from(m.querySelectorAll([
      'a[yawf-link-type="O"][href*="//t.cn/"]',
      'a[href*="//feed.mix.sina.com.cn/link_card/redirect?"]'
    ].join(',')));
  }).filter(filter.fast.hyperlink.validator);
};
weibo.feed.hyperlinks.text = function (feed) {
  return weibo.feed.hyperlinks.dom(feed).map(function (a) { return a.href; });
};

// 从一条微博中找出所有超链接标题
weibo.feed.linktitle = {};
weibo.feed.linktitle.dom = function (feed) {
  return weibo.feed.content(feed, function (m) {
    return Array.from(m.querySelectorAll('a[yawf-link-type="O"]'));
  }).filter(filter.fast.linktitle.validator);
};
weibo.feed.linktitle.text = function (feed) {
  return weibo.feed.linktitle.dom(feed)
    .map(function (a) { return a.getAttribute('title'); });
};

// 搜索选项卡
filter.collection.group.add(function () {
  var input, text, actived, layer;
  // 初始化
  var init = function () {
  };
  // 更新了输入内容
  var update = function () {
    if (!actived) item.active();
    else show();
  };
  // 显示设置对话框
  var list = function () {
    var dom = util.dom.create(html.configHeaderSearch);
    input = dom.querySelector('input');
    var changed = function (e) {
      e.stopPropagation();
      var current = input.value;
      if (current === text) return;
      setTimeout(function () {
        if (input.value !== current) return;
        text = current;
        update();
      }, 50);
    };
    input.addEventListener('change', changed);
    input.addEventListener('keyup', changed);
    input.addEventListener('keydown', changed);
    input.addEventListener('mousedown', changed);
    actived = false; text = ''; layer = null;
    return dom;
  };
  // 不等号们
  var operator = function (op, x, y) {
    if (op === '=') return x === y;
    if (op === '>') return x > y;
    if (op === '<') return x < y;
    if (op === '>=') return x >= y;
    if (op === '<=') return x <= y;
    return false;
  };
  // 将搜索词分析成搜索条件
  var parse = function (text) {
    var token = text.toLowerCase().trim().replace(/:\s+/g, ':').split(/\s+/);
    var texts = [], version = util.func.constant(true);
    var getVersion = function (ver) {
      if (!util.info.version) return;
      var match = ver.match(/.*:([><]?=?)(-?\d+)/), op = match[1] || '=';
      var num = parseInt(match[2], 10);
      if (num < 0) num = util.info.version + num + 1;
      version = function (v) { return operator(op, v, num); };
    };
    token.forEach(function (t) {
      if (t.match(/ver(sion)?:[><]?=?-?\d+/)) getVersion(t);
      else texts.push(t);
    });
    return {
      'version': version,
      'texts': texts,
    };
  };
  // 显示该选项卡
  var show = util.func.catched(function (clayer) {
    actived = true;
    layer = clayer || layer; layer.innerHTML = '';
    var allText = function (item) {
      return [item.type !== 'sicon' && item.text || '']
        .concat(item.ref ? Object.keys(item.ref).map(function (key) {
          return allText(item.ref[key]);
        }) : []).join(' ');
    };
    var search = parse(text);
    var notContain = function (x, y) { return x.indexOf(y) === -1; };
    var confs = filter.collection.item.list(function (item) {
      if (typeof item.version !== 'number' || !text) return false;
      if (!search.version(item.version)) return false;
      var div = util.dom.create('<div></div>');
      div.innerHTML = util.str.fill(allText(item), item);
      var info = div.textContent.toLowerCase();
      if (search.texts.some(notContain.bind(null, info))) return false;
      return true;
    });
    if (confs.count()) confs.show(layer);
    else layer.innerHTML = util.str.fill(html.searchNotFound);
  });
  // 隐藏该选项卡
  var hide = function () {
    actived = false;
    input.value = text = '';
  };
  var item = {
    'name': 'search',
    'init': init,
    'show': show,
    'hide': hide,
    'list': list,
  };
  return item;
}());

// 基础设置
// 由于历史原因，基础设置下键值归属 other
filter.predef.group('base');

// 如何加载微博
filter.predef.subtitle('base', 'loadweibo', '{{loadWeiboTitle}}');

// 快速创建过滤器
filter.items.base.loadweibo.load_weibo_by_search = filter.item({
  'group': 'loadweibo',
  'version': 407,
  'type': 'boolean',
  'key': 'weibo.tool.load_weibo_by_search',
  'text': '{{loadWeiboBySearch}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{loadWeiboBySearchDesc}}' } },
  'shown': function (dom) {
    var that = this;
    var checkbox = dom.querySelector('[name="yawf-weibo.tool.load_weibo_by_search"]');
    checkbox.addEventListener('change', function () {
      if (!checkbox.checked) return;
      that.putconf(false);
      util.ui.confirm('yawf-enable-load-by-search', {
        'title': util.str.fill('{{loadWeiboBySearchWarnTitle}}'),
        'text': util.str.fill('{{loadWeiboBySearchWarn}}'),
        'onOk': function () { that.putconf(true); },
      });
    });
  },
  'ainit': function () {
    // 发现当前不是搜索，就跳转到搜索去
    var updateLocation = function redirectHomeWeiboUseSearch() {
      // 首页才需要 is_search ，其他有些页面可能是因为从首页点过去的时候误带参数，需要特殊处理
      var homefeed = document.getElementById('v6_pl_content_homefeed');
      var nothomefeed = document.getElementById('v6_pl_content_commentlist') ||
        document.querySelector('[id^="Pl_Official_MyProfileFeed__"]');
      var ismessage = document.getElementById('v6_pl_content_messagesearch');
      if (!homefeed && !nothomefeed && !ismessage) return;
      var a = util.dom.create('a', ''); a.href = location.href;
      // 检查是否添加了 is_search 关键词
      var query = util.str.parsequery(location.search.slice(1));
      var has_is_search = 'is_search' in query;
      var has_keyword = 'key_word' in query && query.key_word && query.key_word.replace(/[/\\"'<\n+$]/g, '');
      var all_search_types = ['is_ori', 'is_pic', 'is_video', 'is_music', 'is_article'];
      var is_other_search = all_search_types.some(function (t) { return t in query; });
      var is_search_needed = homefeed && !is_other_search || (ismessage && has_is_search && has_keyword);
      do {
        if (has_is_search && is_search_needed) {
          // 如果添加了 is_search，但是并没有搜索关键词，那么隐藏掉搜索到多少条微博的提示信息
          if (has_keyword) break;
          var searchInput = homefeed.querySelector('input[node-type="simpleSearch"]');
          if (searchInput && searchInput.value === query.key_word) searchInput.value = '';
          var searchTip = homefeed.querySelector('.WB_result');
          if (searchTip) searchTip.parentNode.removeChild(searchTip);
        } else if (has_is_search && !is_search_needed) {
          // 评论页面不应该使用 is_search ，但是点击小黄签时会有问题，所以在这里处理一下
          if (has_keyword) break;
          delete query.is_search;
          delete query.key_word;
          a.search = '?' + util.str.toquery(query);
          location.replace(a.href);
        } else if (!has_is_search && is_search_needed) {
          // 如果没有添加 is_search ，而且不是分组、不是悄悄关注，则自动跳转到 is_search
          if (('gid' in query) || ('whisper' in query)) break;
          query.is_search = '1';
          query.key_word = '"';
          query.start_time = '1970-01-02';
          query.end_time = '2038-01-19'; // 放心，可能并不是世界末日
          query.gid = '0';
          a.search = '?' + util.str.toquery(query);
          location.replace(a.href);
        }
      } while (false);
    };
    observer.dom.add(updateLocation);
    // 给指向首页的链接加上 is_search 参数，免去更多的跳转
    var updateHomeLinksWithIsSearch = function updateHomeLinksWithIsSearch() {
      var links = Array.from(document.querySelectorAll([
        '.gn_logo a', // 导航栏logo
        'a[suda-uatrack*="homepage"]', // 首页链接，根据跟踪标识识别；适用于顶栏和左栏
        '#v6_pl_content_homefeed a[action-type="search_type"][action-data="type=0"]', // 首页消息流顶部的“全部”链接
      ].map(function (x) { return x + ':not([href*="is_search"])'; }).join(',')));
      links.forEach(function (l) {
        var s = util.str.parsequery(l.search.slice(1));
        s.is_search = '1';
        s.key_word = '"';
        s.start_time = '1970-01-02';
        s.end_time = '2038-01-19';
        s.gid = '0';
        l.search = util.str.toquery(s);
      });
    };
    observer.dom.add(updateHomeLinksWithIsSearch);
  },
}).addto(filter.groups.base);

// 脚本工具
filter.predef.subtitle('base', 'scripttool', '{{scriptToolsTitle}}');

// 快速创建过滤器
filter.items.base.scripttool.use_fast_creator = filter.item({
  'group': 'scripttool',
  'version': 36,
  'type': 'boolean',
  'key': 'weibo.tool.use_fast_creator',
  'default': true,
  'text': '{{useFastCreator}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{useFastCreatorDesc}}' } },
  'ainit': function () {
    filter.fast.active();
  },
}).addto(filter.groups.base);

if ('contextMenu' in document.createElement('div')) filter.items.base.scripttool.use_context_menu_creator = filter.item({
  'group': 'scripttool',
  'version': 99,
  'type': 'boolean',
  'key': 'weibo.tool.use_context_menu_creator',
  'default': true,
  'text': '{{useContextMenuCreator}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{useContextMenuCreatorDesc}}' } },
  'ainit': function () {
    filter.fast.right.active();
  },
}).addto(filter.groups.base);

// 修改规则后重新过滤规则
filter.items.base.scripttool.refilter = filter.item({
  'group': 'scripttool',
  'version': 216,
  'type': 'boolean',
  'default': true,
  'key': 'weibo.tool.refilter',
  'text': '{{refilterAfterRuleEdited}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{refilterAfterRuleEditedDesc}}' } },
  'ainit': function () {
    util.func.call(function () {
      var rules = filter.collection.item.list(function (item) {
        return !!(item.key && item.rule);
      }).items;
      rules.forEach(function (rule) {
        util.config.onput(rule.key, observer.weibo.refilter);
      });
    });
  },
}).addto(filter.groups.base);

// 快速隐藏按钮
filter.items.base.scripttool.fast_block_button = filter.item({
  'group': 'scripttool',
  'version': 446,
  'type': 'boolean',
  'key': 'weibo.tool.fast_block_button',
  'text': '{{fastBlockButton}}',
  'priority': 1e6,
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{fastBlockButtonDesc}}' } },
  'getmids': function () { return JSON.parse(GM_getValue(this.midkey, '[]')); },
  'putmids': function (value) { GM_setValue(this.midkey, JSON.stringify(value)); },
  'rule': function hiddenByMid(feed) {
    if (!weibo.feed.author.id(feed)) return null;
    var mids = this.getmids(), mid = feed.getAttribute('mid');
    if (mids.indexOf(mid) !== -1) return 'hidden';
    return null;
  },
  'init': function () { this.midkey = 'user' + util.info.uid + 'hidden'; },
  'ainit': function () {
    var that = this;
    observer.weibo.after(function (feed) {
      var authorId = weibo.feed.author.id(feed);
      if (!authorId || authorId === util.info.uid) return; // 自己的微博，不显示按钮
      if (util.dom.matches(feed, '#v6_pl_content_atmeweibo *')) return; // 不在提到页面显示，避免与“屏蔽at”发生歧义
      if (feed.hasAttribute('yawf-hide_box')) return; // 已经有了按钮，不显示按钮
      if (document.querySelector('[id^="Pl_Official_WeiboDetail__"]')) return; // 单条微博页面，不显示按钮
      if (!feed.hasAttribute('mid')) return; // 不是微博，不显示按钮
      feed.setAttribute('yawf-hide_box', 'yawf-hide_box');
      var mid = feed.getAttribute('mid');
      var screen_box = feed.querySelector('.WB_screen .screen_box'); if (!screen_box) return;
      var hide_box = util.dom.create(util.str.fill(html.hideBoxSimple, { 'mid': mid }));
      screen_box.parentNode.insertBefore(hide_box, screen_box);
      hide_box.querySelector('a').addEventListener('click', function () {
        // 首先隐藏掉这个微博，并在本地保存（因为微博提供的屏蔽功能可能不可靠）
        feed.setAttribute('style', 'transition: max-height opacity 0.2s; max-height: ' + feed.clientHeight + 'px; overflow: hidden; position: relative;');
        setTimeout(function () { feed.style.maxHeight = '20px'; }, 0);
        setTimeout(function () { feed.setAttribute('yawf-display', 'display-hidden'); filter.fix.hidden(feed); }, 100);
        var mids = that.getmids(), i = mids.indexOf(mid);
        if (i === -1) mids.unshift(mid); else mids = mids.splice(0, 0, mids.splice(i, 1)[0]);
        if (mids.length > 1000) mids.length = 1000;
        that.putmids(mids);
        // 接下来再向微博屏蔽它
        network.weibo.block(mid);
      });
    });
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_screen .yawf-hide_box { margin: -10px 0 0 -17px; position: absolute; }
      .WB_screen .yawf-hide_box .W_ficon { font-size: 18px; height: 16px; padding: 4px 0 6px; text-align: center; }
      .WB_screen .yawf-hide_box ~ .screen_box { margin: -10px 0 0 -37px; position: absolute; }
      .WB_screen .yawf-hide_box ~ .screen_box .W_ficon, .WB_screen .yawf-hide_box .W_ficon { width: 20px; }
      .WB_screen .yawf-hide_box ~ .screen_box .layer_menu_list { right: -4px; }
    */ noop(); }));
  }
}).addto(filter.groups.base);

// 屏蔽隐藏微博
filter.items.base.scripttool.block_hidden = filter.item({
  'group': 'scripttool',
  'version': 446,
  'type': 'boolean',
  'key': 'weibo.tool.block_hidden',
  'text': '{{blockHiddenWeiboDesc}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{blockHiddenWeiboDescDesc}}' } },
  'ainit': function () {
    var blockWeibo = function blockWeibo(feed) {
      var display = feed.getAttribute('yawf-display');
      if (display !== 'display-hidden') return;
      var mid = feed.getAttribute('mid');
      if (!mid) return;
      network.weibo.block(mid);
      feed.setAttribute('yawf-block', 'block');
    };
    observer.weibo.final(blockWeibo);
  }
}).addto(filter.groups.base);

// 禁用微博延迟加载
filter.items.base.scripttool.disable_lazyload = filter.item({
  'group': 'scripttool',
  'version': 279,
  'type': 'boolean',
  'key': 'weibo.tool.disable_lazyload',
  'text': '{{disableLazyLoad}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{disableLazyLoadDesc}}' } },
  'ainit': function () {
    util.func.page(function () {
      var weiboCountLimit = 50;
      (function disableLazyLoad() {
        if (self !== top) return;
        if (!document.querySelector('#v6_pl_content_homefeed [node-type="lazyload"]')) { setTimeout(disableLazyLoad, 100); return; }
        if (typeof STK === typeof void 0 || !STK.namespace) setTimeout(disableLazyLoad, 100);
        else if (document.querySelectorAll('.WB_feed').length > weiboCountLimit) return;
        else STK.namespace('v6home', function (a) {
          var fire = null;
          try { fire = a.conf.channel.window.fire; } catch (e) { }
          if (!fire) setTimeout(disableLazyLoad, 0);
          else {
            var d = { scrollTop: 0, winHeight: document.body.clientHeight * 2 };
            a.conf.channel.window.fire("scroll", d);
            setTimeout(disableLazyLoad, 300);
          }
        });
      }());
    });
  },
}).addto(filter.groups.base);

// 分组浏览
filter.predef.subtitle('base', 'grouping', '{{otherGroupTitle}}');

// 分组浏览不做按帐号隐藏
filter.items.base.grouping.group_account = filter.item({
  'group': 'grouping',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.group_account',
  'text': '{{accountByGroup}}',
}).addto(filter.groups.base);

// 分组浏览不做刷屏检查
filter.items.base.grouping.group_same_account = filter.item({
  'group': 'grouping',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.group_same_account',
  'text': '{{sameAccountByGroup}}',
}).addto(filter.groups.base);

// 自动载入
filter.predef.subtitle('base', 'autoload', '{{autoLoadNewWeiboTitle}}');

// 自动加载新微博以避免被隐藏微博显示新微博提示
filter.items.base.autoload.auto_load_new_weibo = filter.item({
  'group': 'autoload',
  'version': 44,
  'type': 'boolean',
  'key': 'weibo.other.auto_load_new_weibo',
  'text': '{{autoLoadNewWeibo}}{{<i>}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{autoLoadNewWeiboDesc}}' } },
  // 展开新微博后添加和旧微博的分割线
  'timetip': (function () {
    var time0 = new Date(), tip = null;
    return function (feed) {
      var time = time0; time0 = new Date();
      var text = '{{timeReadHere}}';
      if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
      tip = util.dom.create(util.str.fill(html.feedTimeTip, { 'time': text, 'date': String(Number(time)) }));
      feed.parentNode.insertBefore(tip, feed.nextSibling);
    };
  }()),
  // 显示新的微博
  'showNew': function () {
    var newFeed = document.querySelector('a.notes[yawf-id="feed_list_newBar"], div.WB_notes[yawf-id="home_new_feed_tip"]'); if (!newFeed) return;
    var feeds = Array.from(document.querySelectorAll('.WB_feed>.WB_feed_type[yawf-unread="hidden"]'));
    feeds.forEach(function (feed) {
      feed.setAttribute('yawf-unread', 'show');
      feed.classList.remove('WB_feed_new');
    });
    this.counter();
    this.timetip(feeds[feeds.length - 1]);
  },
  // 显示未读提示
  'counter': function () {
    var count = document.querySelectorAll(
      '.WB_feed>.WB_feed_type[yawf-unread="hidden"]:not([yawf-display$="-hidden"]):not([yawf-display$="-son"])' + ',' +
      '.WB_feed>.WB_feed_type_box_t>.WB_feed_type[yawf-unread="hidden"]:not([yawf-display$="-hidden"]):not([yawf-display$="-son"])'
    ).length;
    var feedList = document.querySelector('.WB_feed');
    var newFeed = document.querySelector('a.notes[yawf-id="feed_list_newBar"], div.WB_notes[yawf-id="home_new_feed_tip"]');
    util.debug('counter: %d feeds click to show', count);
    // 先移除旧的，再放上新的
    if (newFeed) newFeed.parentNode.removeChild(newFeed);
    if (count) {
      newFeed = util.dom.create(html.feedListNewBar);
      feedList.parentNode.insertBefore(newFeed, feedList);
      newFeed.addEventListener('click', this.showNew.bind(this));
      newFeed.firstChild.textContent = util.str.fill(text.newWeiboNotify, { 'count': count });
    }
    return count;
  },
  'ainit': function () {
    var that = this;
    // 更新未读提示中的数字
    // 隐藏掉微博原来的新消息提示框
    util.css.add(util.str.cmt(function () { /*!CSS
      [yawf-unread="hidden"] { display: none !important; }
      .WB_feed [node-type="feed_list_timeTip"] { display: none !important; }
      .WB_feed a.notes[action-type="feed_list_newBar"][node-type="feed_list_newBar"] { display: none; }
      .WB_feed div.W_loading[requesttype="newFeed"] { display: none !important; }
      .WB_feed .WB_notes[requesttype="newFeed"] { display: none !important; }
      .WB_feed [node-type="lazyload"]:not(:last-child) { display: none !important; }
    */ noop(); }));

    var loadKey = util.keyboard.code.PERIOD;

    // 自动点开有新微博的提示
    // 我知道我在干什么
    // TODO use util.func.wrapstk instead
    util.func.page(function $YAWF$_autoLoadNewFeed() {
      if (!window.STK || !STK.namespace) setTimeout($YAWF$_autoLoadNewFeed, 100);
      else STK.namespace("v6home", function (a) {
        /* STK.lib.feed.inter */
        var action = function (b, e) {
          var c = a.core.json.merge,
            j = e[2] || {},
            k = a.queryToJson(window.FM.getURL().query),
            g = a.conf.trans.feed.feed,
            h = a.core.obj.parseParam({
              loadFeedTransKey: "getfeed",
              plNode: null
            }, e);
          var d = function (b) {
            var c = a.C("div");
            c.innerHTML = b;
            window.WBEXP && window.WBEXP.start(c);
            c = null;
          };
          var l = c(k, { since_id: b.getEndId() });
          g.request(h.loadFeedTransKey, {
            onSuccess: function (a) { b.updateFeed(a.data, "top", "newFeed"); d(a.data); },
            onFail: function () { b.showError("top", "newFeed"); },
            onError: function () { b.showError("top", "newFeed"); }
          }, c(l, j));
        };
        /* STK.lib.feed.base */
        var base = function (b, c) {
          var d = {}, e = a.lib.feed.API(b, c);
          for (var f in e) !d[f] && (d[f] = e[f]); /* as is */
          action(d, c);
        };
        /* STK.pl.content.homefeed.source.homefeed.feedList */
        var feedList = function (b) {
          base(b, { plNode: b });
        };
        /* check for home_new_feed_tip and auto load new feeds... */
        var pending = false;
        (new MutationObserver(function (mutations) {
          var tip = a.sizzle('#home_new_feed_tip');
          if (!tip.length) return;
          a.removeNode(tip[0]);
          if (pending) return; pending = true;
          setTimeout(function () {
            pending = false;
            feedList(a.sizzle('#v6_pl_content_homefeed')[0]);
          }, 100);
        })).observe(document.body, { 'childList': true, 'subtree': true });
      });
    });

    // 看见有新微博了，看看是不是新加载出来的
    observer.weibo.onload(function (feed) {
      var feeds = Array.from(document.querySelectorAll('.WB_feed .WB_feed_type'));
      var shown = Array.from(document.querySelectorAll('.WB_feed_type[yawf-unread="show"], .WB_feed_type[yawf-unread="show"]~.WB_feed_type, .WB_feed_type[yawf-unread="show"]~* .WB_feed_type'));
      if (feeds.indexOf(feed) === -1) feed.setAttribute('yawf-unread', 'show');
      else if (shown.length < 8 || shown.indexOf(feed) !== -1) feed.setAttribute('yawf-unread', 'show');
      else feed.setAttribute('yawf-unread', 'hidden');
    });

    // 走完过滤器之后，如果某条微博还没被隐藏掉，那么就提示用户有新微博要看了
    observer.weibo.after(function (feed) {
      if (feed.getAttribute('yawf-unread') !== 'hidden') return;
      var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
      if (display === 'hidden') return;
      util.func.call(function () { filter.items.base.autoload.auto_expand.expand(feed); });
      if (filter.items.base.autoload.desktop_notification)
        filter.items.base.autoload.desktop_notification.notify(feed);
    });

    // 全都过滤完成后要更新计数
    observer.weibo.done(function () { that.counter(); });

    // 允许按对应按键显示新微博
    util.keyboard.reg('keyup', loadKey, function () { that.showNew(); }, true);

  },
  // 隐藏重复微博
  'priority': 1e6, // 最高的优先级
  'rule': function hideDuplicate(feed) {
    if (feed.getAttribute('yawf-display')) return null;
    var mid = feed.getAttribute('mid'); if (!mid) return null;
    var another = document.querySelector('[node-type="feed_list"] .WB_feed_type[mid="' + mid + '"][yawf-display]');
    if (another) return 'duplicate-hidden';
  },
}).addto(filter.groups.base);

filter.items.base.autoload.auto_expand = filter.item({
  'group': 'autoload',
  'version': 46,
  'type': 'boolean',
  'key': 'weibo.other.auto_expand',
  'text': '{{autoExpand}}',
  'ref': {
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{autoExpandDesc}}' },
    'etypes': {
      'type': 'boolean',
    },
    'background': {
      'type': 'boolean',
      'default': true,
    },
  },
  'expand': function (feed, force) {
    var that = this;
    var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
    var act = function () {
      var unreads = document.querySelectorAll('.WB_feed_type[yawf-unread="hidden"]');
      var ref = unreads[unreads.length - 1];
      ref.parentNode.insertBefore(feed, ref.nextSibling);
      feed.setAttribute('yawf-unread', 'show');
      filter.items.base.autoload.auto_load_new_weibo.counter();
    };
    if (feed.getAttribute('yawf-unread') !== 'hidden') return;
    if (force) return act();
    if (weibo.feed.author.id(feed) === util.info.uid) return act(); // 总是不折叠自己的微博
    if (!that.conf) return;
    if (that.ref.etypes.conf && display !== 'show') return;
    if (that.ref.background.conf && document.hasFocus()) {
      var onblur = function () {
        filter.items.base.autoload.auto_expand.expand(feed);
        document.removeEventListener('blur', onblur);
      };
      document.addEventListener('blur', onblur);
    } else act();
  },
}).addto(filter.groups.base);

filter.items.base.autoload.desktop_notification = null;

if (util.notify.avaliableNotification().length) filter.items.base.autoload.desktop_notification = filter.item({
  'group': 'autoload',
  'version': 46,
  'type': 'boolean',
  'key': 'weibo.other.desktop_notification',
  'text': '{{desktopNotification}}',
  'ref': {
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{desktopNotificationDesc}}' },
    'types': {
      'type': 'boolean',
      'default': true,
    },
    'autohide': {
      'type': 'boolean',
      'default': true,
    },
    'shorten': {
      'type': 'boolean',
    },
    'shortlen': {
      'type': 'range',
      'min': 0,
      'max': 600,
      'default': 50,
    },
    'duration': {
      'type': 'range',
      'step': 50,
      'min': 1e3,
      'default': 3e3,
      'max': 1e4,
    },
    'durationc': {
      'type': 'range',
      'step': 10,
      'min': 0,
      'default': 150,
      'max': 500,
    },
    'ntypes': {
      'type': 'boolean',
    },
  },
  'shown': function (dom) {
    var that = this;
    that.onopt = dom.querySelector('[name="yawf-weibo.other.desktop_notification"]');
    that.onopt.addEventListener('change', that.update.bind(that));
    var ntypes = dom.querySelector('[name="yawf-weibo.other.desktop_notification.ntypes"]');
    if (util.notify.avaliableNotification().length <= 1) {
      while (ntypes.tagName.toLowerCase() !== 'label') ntypes = ntypes.parentNode;
      ntypes.style.display = 'none';
    } else ntypes.addEventListener('change', function () {
      that.ref.ntypes.putconf(ntypes.checked);
      that.update();
    });
    // 如果没有权限的话，总是要显示关闭的状态
    if (!util.notify.hasPermission()) that.onopt.checked = false;
  },
  'init': function () {
    util.notify.choseNotification(this.ref.ntypes.conf ? 'webkit' : 'standard');
  },
  'update': function () {
    var that = this, desktopNotify = that.onopt;
    that.init();
    if (!desktopNotify.checked) return;
    var permission = util.notify.hasPermission();
    if (permission === true) return;
    desktopNotify.checked = false;
    if (permission === null) util.notify.requestPermission(function () {
      desktopNotify.checked = true;
      that.update();
    });
    if (permission === false) util.ui.alert('notify-disabled', {
      'title': util.str.fill('{{desktopNotificationDisallowedTitle}}'),
      'text': util.str.fill('{{desktopNotificationDisallowed}}'),
      'icon': 'error'
    });
  },
  'notify': function (feed) {
    var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
    this.init(); if (!this.conf) return;
    if (this.ref.types.conf && display !== 'show') return;
    var mid, author, text, face, ori_author = '', ori_text = '';
    mid = feed.getAttribute('mid'); if (!mid) return;
    face = weibo.feed.avatar(feed);
    author = weibo.feed.author.name(feed);
    text = feed.querySelector('.WB_text').textContent;
    try {
      ori_author = weibo.feed.original.name(feed);
      ori_text = weibo.feed.original.text(feed);
    } catch (e) { }
    var body = text + (ori_text ? ('//' + ori_author + ': ' + ori_text) : '');
    body = body.replace(/\s+/g, ' ').trim(); author = author.trim();
    if (this.ref.shorten.conf) body = body.slice(0, this.ref.shortlen.conf);
    var delay = 0;
    if (this.conf) delay = this.ref.duration.conf + body.length * this.ref.durationc.conf;
    var showFeed = util.func.catched(function () {
      filter.items.base.autoload.auto_expand.expand(feed, true);
      util.notify.hideNotification(notification)
      util.func.call(function () {
        document.documentElement.scrollTop += feed.getClientRects()[0].top - 80;
        var evt = document.createEvent("KeyboardEvent");
        evt.initKeyEvent('keydown', true, true, null, false, false, false, false, util.keyboard.code.J, 0);
        document.documentElement.dispatchEvent(evt);
      });
      window.focus();
    });
    var notification = util.notify.showNotification(mid, author, body, face, delay, showFeed);
  },
}).addto(filter.groups.base);

// 提示火狐用户桌面提示问题
if (util.notify.avaliableNotification().length &&
  util.browser.fx.avaliable &&
  util.browser.fx.mainversion < 44) {
  filter.items.base.autoload.remark = filter.item({
    'group': 'autoload',
    'type': 'remark',
    'text': '{{autoCloseWarning}}',
  }).addto(filter.groups.base);
}

// 按内容过滤
filter.predef.group('content').addto(filter.groups.base);

// 关键字过滤
filter.predef.wbfc({
  'name': 'keyword',
  'version': 1,
  'add': function (s) { return s.trim() || null; },
  'rule': function keywordMatch(action, feed) {
    var keywords = this.conf.concat(this.extent);
    var texts = weibo.feed.text(feed).toUpperCase();
    var match = keywords.some(function (keyword) {
      if (!keyword) return false;
      if (texts.indexOf(keyword.toUpperCase()) === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.keywordFilterReason, { 'detail': keyword }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.content.validator,
    'recognizer': filter.fast.content.recognizer.keyword,
    'selected': filter.fast.selected.feed,
    'add': filter.fast.content.add,
    'description': filter.fast.description.gen({
      'group': 'content', 'name': 'keyword',
      'attr': 'text', 'input': true, 'chosen': true
    }),
  }
}, filter.groups.content);

// 按照正则式过滤
filter.predef.wbfc({
  'name': 'regexp',
  'version': 8,
  'add': util.str.addregex,
  'display': function (s) { return '/' + s + '/'; },
  'rule': function regexpMatch(action, feed) {
    var regexen = this.conf.concat(this.extent).map(util.str.compregex).filter(Boolean);
    var texts = weibo.feed.text(feed);
    var match = regexen.some(function (regexp) {
      if (!regexp.exec(texts)) return false;
      var reason = ((regexp + '').match(/\(\?=\|(([^)]|\\\))*)\)/) || [])[1];
      feed.setAttribute('yawf-reason', reason || util.str.fill(text.regexpFilterReason, { 'detail': regexp + '' }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.content.validator,
    'recognizer': filter.fast.content.recognizer.regexp,
    'selected': filter.fast.selected.never,
    'add': filter.fast.content.add,
    'description': filter.fast.description.gen({
      'group': 'content', 'name': 'regexp',
      'attr': 'text', 'input': true, 'chosen': false
    }),
  }
}, filter.groups.content);

// 其他被视为内容的元素
filter.predef.subtitle('content', 'elements', '{{contentTypesTitle}}');

(function (types) {
  var ts = Object.keys(types);
  ts.forEach(function (t) {
    var tt = t[0].toUpperCase() + t.slice(1);
    filter.items.content.elements[t] = filter.item({
      'group': 'elements',
      'version': 206,
      'type': 'boolean',
      'text': '{{contentTypes' + tt + '}}',
      'key': 'weibo.content.types_' + t,
      'default': types[t],
      'ainit': function () {
        weibo.feed.text.active(t);
      },
    }).addto(filter.groups.content);
  });
}({
  'mention': true,
  'topic': true,
  'stock': true,
  'linkt': true,
  'linku': false,
  'emotion': false,
}));

filter.predef.account = function (details) {
  var item = {
    'name': details.name,
    'version': details.version,
    'type': 'users',
    'rule': function accountMatch(action, feed, worksOnUserPage) {
      if (details.matchf && !details.matchf(feed)) return;
      var accounts = this.conf.concat(this.extent);
      var oid = util.info.oid();
      var id = weibo.feed.author.id(feed) || oid;
      if ((!id || id === oid) && !worksOnUserPage) return null;
      var match = accounts.indexOf(id) !== -1;
      if (match) feed.setAttribute('yawf-reason',
        util.str.fill('{{{' + details.name + 'FilterReason}}}',
        {
          'detail': weibo.feed.author.name(feed) ||
            (id === oid && util.info.onick()) || null
        }));
      if (match) return action; else return null;
    },
    'blacklist': {
      'override': {
        'rule': function accountMatchBlacklistOverride(_super) {
          return function accountMatchBlacklist(feed) {
            if (!filter.items.base.grouping.group_account.conf || !util.page.group()) return _super(feed);
            return null;
          };
        },
      },
    },
    'whitelist': {
      'override': {
        'rule': function accountMatchWhitelistOverride(_super) {
          return function accountMatchWhitelist(feed) {
            return _super(feed, true);
          };
        },
      },
    },
    'complete': 'user',
    'fast': {
      'validator': filter.fast.account.validator,
      'recognizer': filter.fast.account.recognizer,
      'selected': filter.fast.selected.author,
      'add': filter.fast.account.addid,
      'description': filter.fast.description.gen({
        'group': 'account', 'name': details.name,
        'attr': 'name', 'chosen': details.chosen
      }),
      'contextmenu': weibo.feed.author.dom,
      'menudesc': function (author) {
        return util.str.fill('{{{' + details.name + 'FilterContextMenu}}}', { 'name': author.textContent.trim() });
      },
    }
  };
  if (details.listtype) item.listtype = details.listtype;
  if (details.contextmenu) item.fast.contextmenu = details.contextmenu;
  return filter.predef.wbfc(item, filter.groups.account);
};

filter.predef.group('account').addto(filter.groups.base);

// 作者用户过滤
filter.predef.account({
  'name': 'account',
  'version': 4,
  'chosen': true,
});

// 转发用户过滤
filter.predef.account({
  'name': 'accountf',
  'version': 225,
  'matchf': function (feed) {
    return !!weibo.feed.original.dom(feed);
  },
  'chosen': false,
  'listtype': ['blacklist', 'foldlist'],
  'contextmenu': function (feed) {
    return weibo.feed.original.dom(feed) ? weibo.feed.author.dom(feed) : null;
  },
});

// 原创用户过滤
filter.groups.original = filter.predef.wbfc({
  'name': 'original',
  'version': 4,
  'type': 'users',
  'rule': function originalMatch(action, feed) {
    var originals = this.conf.concat(this.extent), id = [weibo.feed.original.id(feed)];
    if (filter.items.original.blacklist_d.conf && util.page.discovery) id.push(weibo.feed.author.id(feed));
    id = id.filter(Boolean); if (!id.length) return null;
    var match = originals.some(function (x) { return id.indexOf(x) !== -1; });
    if (match) feed.setAttribute('yawf-reason', util.str.fill(text.originalFilterReason, { 'detail': weibo.feed.original.name(feed) }));
    if (match) return action; else return null;
  },
  'title': {
    'after': function () {
      // 开启该选项后发现页面时转发自规则对作者同样生效
      filter.items.original.blacklist_d = filter.item({
        'group': 'original',
        'version': 228,
        'type': 'boolean',
        'default': true,
        'key': 'weibo.original.blacklist_d',
        'text': '{{actOnDiscoveryPage}}',
      }).addto(filter.groups.original);
    },
  },
  'complete': 'user',
  'fast': {
    'validator': filter.fast.account.validator,
    'recognizer': filter.fast.account.recognizer,
    'selected': filter.fast.selected.original,
    'add': filter.fast.account.addid,
    'description': filter.fast.description.gen({
      'group': 'original', 'name': 'original',
      'attr': 'name', 'chosen': true
    }),
    'contextmenu': function (feed) {
      var original = weibo.feed.original.dom(feed), author = null;
      if (filter.items.original.blacklist_d.conf && util.page.discovery)
        author = weibo.feed.author.dom(feed);
      return [original, author].filter(Boolean);
    },
    'menudesc': function (original) {
      return util.str.fill(text.originalFilterContextMenu, { 'name': original.textContent.trim().replace(/^@/, '') });
    },
  }
});

// 提到某人的微博
filter.groups.mention = filter.predef.wbfc({
  'name': 'mention',
  'version': 4,
  'type': 'strings',
  'add': function (s) { return s.trim().replace(/^@/, '') || null; },
  'display': function (s) { return '@' + s; },
  'rule': function mentionMatch(action, feed) {
    var mentions = this.conf.concat(this.extent), users = weibo.feed.mentions.name(feed);
    var match = users.some(function (name) {
      var index = mentions.indexOf(name);
      if (index === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.mentionFilterReason, { 'detail': mentions[index] }));
      return true;
    });
    if (match) return action; else return null;
  },
  'complete': 'user',
  'fast': {
    'validator': filter.fast.account.validator,
    'recognizer': filter.fast.account.recognizer,
    'selected': filter.fast.selected.mention,
    'add': filter.fast.account.addname,
    'description': filter.fast.description.gen({
      'group': 'mention', 'name': 'mention',
      'attr': 'name', 'chosen': true
    }),
    'contextmenu': weibo.feed.mentions.dom,
    'menugrouped': '{{mentionFilterContextMenuGroup}}',
    'menudesc': function (mention) {
      return util.str.fill(text.mentionFilterContextMenu, { 'name': mention.textContent.trim().replace(/^@/, '') });
    },
  }
});

// 话题过滤
filter.predef.group('topic').addto(filter.groups.base);

filter.predef.wbfc({
  'name': 'topic',
  'version': 2,
  'add': function (s) { return s.trim().replace(/#/g, '') || null; },
  'display': function (s) { return '#' + s + '#'; },
  'rule': function topicMatch(action, feed) {
    var topics = this.conf.concat(this.extent);
    var topicText = weibo.feed.topics.text(feed).join('##');
    var match = topics.some(function (topic) {
      if (topicText.indexOf(topic) === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.topicFilterReason, { 'detail': topic }));
      return true;
    });
    if (match) return action; else return null;
  },
  'complete': 'topic',
  'fast': {
    'validator': filter.fast.topic.validator,
    'recognizer': filter.fast.topic.recognizer.topic,
    'selected': filter.fast.selected.feed,
    'add': filter.fast.topic.add,
    'description': filter.fast.description.gen({
      'group': 'topic', 'name': 'topic',
      'attr': 'topic', 'input': true, 'chosen': true
    }),
    'contextmenu': weibo.feed.topics.dom,
    'menugrouped': '{{topicFilterContextMenuGroup}}',
    'menudesc': function (topic) {
      return util.str.fill(text.topicFilterContextMenu, { 'topic': topic.textContent.trim().replace(/#/g, '') });
    },
  }
}, filter.groups.topic);

// 正则话题
filter.predef.wbfc({
  'name': 'rtopic',
  'version': 52,
  'add': util.str.addregex,
  'display': function (s) { return '/' + s + '/'; },
  'rule': function rtopicMatch(action, feed) {
    var regexen = this.conf.concat(this.extent).map(util.str.compregex).filter(Boolean);
    var topics = weibo.feed.topics.text(feed);
    var match = regexen.some(function (regexp) {
      return topics.some(function (topic) {
        if (!regexp.exec(topic)) return false;
        feed.setAttribute('yawf-reason', util.str.fill(text.rtopicFilterReason, { 'detail': regexp + '' }));
        return true;
      });
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.topic.validator,
    'recognizer': filter.fast.topic.recognizer.rtopic,
    'selected': filter.fast.selected.never,
    'add': filter.fast.topic.add,
    'description': filter.fast.description.gen({
      'group': 'topic', 'name': 'rtopic',
      'attr': 'topic', 'input': true, 'chosen': false
    }),
  }
}, filter.groups.topic);

// 来源过滤
filter.groups.source = filter.predef.wbfc({
  'name': 'source',
  'version': 2,
  'add': function (s) {
    s = s.trim();
    if (s === text.defaultSource) {
      util.ui.alert('yawf-source-filter-warning', {
        'title': util.str.fill('{{sourceFilterWarningTitle}}'),
        'text': util.str.fill('{{sourceFilterWarning}}'),
        'icon': 'error'
      });
      s = null;
    }
    return s;
  },
  'rule': function sourceMatch(action, feed) {
    var sources = this.conf.concat(this.extent), _sources = weibo.feed.sources.text(feed);
    var match = _sources.some(function (s) {
      if (sources.indexOf(s) === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.sourceFilterReason, { 'detail': s }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.source.validator,
    'recognizer': filter.fast.source.recognizer,
    'selected': filter.fast.selected.always,
    'add': filter.fast.source.add,
    'description': filter.fast.description.gen({
      'group': 'source', 'name': 'source',
      'attr': 'source', 'chosen': true
    }),
    'contextmenu': weibo.feed.sources.dom,
    'menugrouped': '{{sourceFilterContextMenuGroup}}',
    'menudesc': function (source) {
      var text = null;
      filter.fast.source.recognizer(source, function (value) {
        if (value) text = util.str.fill('{{{sourceFilterContextMenu}}}', value);
      });
      return text;
    },
  }
});

// 超链接过滤
filter.predef.group('hyperlink').addto(filter.groups.base);

// 超链接地址过滤
filter.predef.wbfc({
  'name': 'hyperlink',
  'version': 350,
  'add': function (s) { return s.trim() || null; },
  'rule': function hyperlinkMatch(action, feed) {
    var links = this.conf.concat(this.extent), _links = weibo.feed.hyperlinks.text(feed);
    var match = _links.some(function (l) {
      return links.some(function (link) {
        if (l.indexOf(link) === -1) return false;
        feed.setAttribute('yawf-reason', util.str.fill(text.hyperlinkFilterReason, { 'detail': link }));
        return true;
      });
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.hyperlink.validator,
    'recognizer': filter.fast.hyperlink.recognizer,
    'selected': filter.fast.selected.feed,
    'add': filter.fast.hyperlink.add,
    'description': filter.fast.description.gen({
      'group': 'hyperlink', 'name': 'hyperlink',
      'attr': 'url', 'chosen': true
    }),
    'contextmenu': weibo.feed.hyperlinks.dom,
    'menugrouped': '{{hyperlinkFilterContextMenuGroup}}',
    'menudesc': function (hyperlink) {
      return util.str.fill(text.hyperlinkFilterContextMenu, { 'url': hyperlink.href });
    },
  },
}, filter.groups.hyperlink);

// 超链接标题过滤
filter.predef.wbfc({
  'name': 'linktitle',
  'version': 206,
  'add': function (s) { return s.trim() || null; },
  'rule': function linkTitleMatch(action, feed) {
    var texts = this.conf.concat(this.extent), titles = weibo.feed.linktitle.text(feed);
    var match = titles.some(function (title) {
      return texts.some(function (t) {
        if (title.indexOf(t) === -1) return false;
        feed.setAttribute('yawf-reason', util.str.fill(text.linktitleFilterReason, { 'detail': t }));
        return true;
      });
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.linktitle.validator,
    'recognizer': filter.fast.linktitle.recognizer,
    'selected': filter.fast.selected.feed,
    'add': filter.fast.linktitle.add,
    'description': filter.fast.description.gen({
      'group': 'linktitle', 'name': 'linktitle',
      'attr': 'title', 'input': true, 'chosen': true
    }),
    'contextmenu': weibo.feed.linktitle.dom,
    'menugrouped': '{{linktitleFilterContextMenuGroup}}',
    'menudesc': function (link) {
      return util.str.fill(text.linktitleFilterContextMenu, { 'title': link.title.trim() });
    },
  },
}, filter.groups.hyperlink);

// 其他过滤器
filter.predef.group('other').addto(filter.groups.base);

// 总是显示这些内容
filter.predef.subtitle('other', 'showthese', '{{otherWhitelistTitle}}');

// 总是显示自己的微博
filter.items.other.showthese.my_weibo = filter.item({
  'group': 'showthese',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.my_weibo',
  'text': '{{showMyWeiboDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMyWeiboRule(feed) {
    if (!this.conf) return;
    if (weibo.feed.author.id(feed) === util.info.uid) return 'showme';
    if (weibo.feed.author.id(feed) === null && util.page.myhome()) return 'showme';
    return null;
  },
}).addto(filter.groups.other);

// 总是显示自己原创的微博
filter.items.other.showthese.my_original = filter.item({
  'group': 'showthese',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.my_original',
  'text': '{{showMyOriginalDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMyOriginalRule(feed) {
    if (!this.conf) return;
    if (weibo.feed.original.id(feed) === util.info.uid) return 'showme'; else return null;
  },
}).addto(filter.groups.other);

// 总是显示提到自己的微博
filter.items.other.showthese.mention_me = filter.item({
  'group': 'showthese',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.mention_me',
  'text': '{{showMentionMeDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMentionMeRule(feed) {
    if (!this.conf) return;
    if (weibo.feed.mentions.name(feed).indexOf(util.info.nick) !== -1) return 'showme'; else return null;
  },
}).addto(filter.groups.other);

// 推广、广告类微博
filter.predef.subtitle('other', 'hidethese_ad', '{{otherBlacklistTitleAd}}');

// 推广微博
filter.items.other.hidethese_ad.ad_feed = filter.item({
  'group': 'hidethese_ad',
  'version': 2,
  'type': 'boolean',
  'key': 'weibo.other.ad_feed',
  'text': '{{adfeedFilter}}',
  'priority': 1e6 - 1e3, // 次最高优先级
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{adfeedFilterDesc}}' } },
  'rule': function adFeedFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.getAttribute('feedtype') === 'ad') return 'hidden';
    if (feed.querySelector('[action-type="feed_list_ad"]')) return 'hidden';
    if (feed.querySelector('a[href*="//adinside.weibo.cn/"]')) return 'hidden';
    if (feed.querySelector('[diss-data*="feedad"]')) return 'hidden';
    if (feed.querySelector('[suda-uatrack*="insert_feed"]')) return 'hidden';
    if (feed.querySelector('[suda-uatrack*="negativefeedback]')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 粉丝头条
filter.items.other.hidethese_ad.fans_top = filter.item({
  'group': 'hidethese_ad',
  'version': 56,
  'type': 'boolean',
  'key': 'weibo.other.fans_top',
  'text': '{{fansTopFilter}}',
  'priority': 1e6, // 优先于白名单
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{fansTopFilterDesc}}' } },
  'rule': function fansTopFilterRule(feed) {
    if (!this.conf) return null;
    return feed.querySelector('[adcard="fanstop"]') ? 'hidden' : null;
  },
}).addto(filter.groups.other);

// 有商品卡片的微博
filter.items.other.hidethese_ad.product_card = filter.item({
  'group': 'hidethese_ad',
  'version': 265,
  'type': 'boolean',
  'key': 'weibo.other.product_card',
  'text': '{{productCardWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{productCardWeiboDesc}}' } },
  'rule': function productCardFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.WB_feed_spec[exp-data*="key=tblog_weibocard"][exp-data*="1022-product"]'))
      return 'hidden';
    if (feed.querySelector('.WB_feed_spec[exp-data*="key=tblog_weibocard"][exp-data*="2017845002-product"]'))
      return 'hidden';
    if (feed.querySelector('a[action-type="feed_list_url"][suda-uatrack*="2017845002-product"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 淘宝/天猫商品
filter.items.other.hidethese_ad.tb_tm_wb = filter.item({
  'group': 'hidethese_ad',
  'version': 29,
  'type': 'boolean',
  'key': 'weibo.other.tb_tm_wb',
  'text': '{{taobaoTianmaoWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{taobaoTianmaoWeiboDesc}}' } },
  'rule': function taobaoTianmaoFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.icon_cd_tmall, .icon_cd_tb, .icon_cd_ju'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 微博支付积分兑换
filter.items.other.hidethese_ad.weibo_pay_gift= filter.item({
  'group': 'hidethese_ad',
  'version': 346,
  'type': 'boolean',
  'key': 'weibo.other.weibo_pay_gift',
  'text': '{{weiboPayGift}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{weiboPayGiftDesc}}' } },
  'rule': function weiboPayGift(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('div[action-data*="objectid=1042025:"]')) return 'hidden';
    if (feed.querySelector('a[suda-uatrack*="1042025-webpage"]')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 混入新鲜事流的其他东西
filter.items.other.hidethese_ad.fake_weibo = filter.item({
  'group': 'hidethese_ad',
  'version': 13,
  'type': 'boolean',
  'key': 'weibo.other.fake_weibo',
  'text': '{{fakeWeiboFilter}}',
  'priority': 1e6, // 最高优先级
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{fakeWeiboFilterDesc}}' } },
  'rule': function fakeWeiboFilterRule(feed) {
    // 问答列表不是微博列表，因此不应生效
    if (util.dom.matches(feed, '[id^="Pl_Core_WendaList__"] *')) return null;
    if (feed.hasAttribute('mid')) return null;
    if (this.conf) return 'hidden';
    return 'unset';
  },
}).addto(filter.groups.other);

// 含有特定内容的微博
filter.predef.subtitle('other', 'hidethese_content', '{{otherBlacklistTitleContent}}');

// 已删除或没有权限查看的微博的转发
filter.items.other.hidethese_content.deleted_forward = filter.item({
  'group': 'hidethese_content',
  'version': 11,
  'type': 'boolean',
  'key': 'weibo.other.deleted_forward',
  'text': '{{deletedForwardFilter}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{deletedForwardFilterDesc}}' } },
  'rule': function deletedForwardFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.getAttribute('isforward') === '1' &&
      !weibo.feed.original.dom(feed)) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 回复并转发的微博
// 要求微博以“回复”开头，后面紧跟一个提到
filter.items.other.hidethese_content.comment_and_reply = filter.item({
  'group': 'hidethese_content',
  'version': 201,
  'type': 'boolean',
  'key': 'weibo.other.comment_and_reply',
  'text': '{{commentAndForwardFilter}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{commentAndForwardFilterDesc}}' } },
  'rule': function commentAndForwardFilterRule(feed) {
    if (!this.conf) return null;
    var replyText = ['回复', '回復', '回覆', 'Reply', 'reply'];
    if (feed.getAttribute('isforward') !== '1' && feed.getAttribute('feedtype') !== 'subfeed') return null;
    var content = feed.querySelector('[node-type="feed_list_content"]'); if (!content) return null;
    if (!content.firstChild || replyText.indexOf(content.firstChild.textContent.trim()) === -1) return null;
    if (!content.childNodes[1] || !content.childNodes[1].getAttribute('usercard')) return null;
    return 'hidden';
  },
}).addto(filter.groups.other);

// 投票微博
filter.items.other.hidethese_content.vote_weibo = filter.item({
  'group': 'hidethese_content',
  'version': 11,
  'type': 'boolean',
  'key': 'weibo.other.vote_weibo',
  'text': '{{voteWeiboFilter}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{voteWeiboFilterDesc}}' } },
  'rule': function voteWeiboFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.WB_from a[href*="//vote.weibo.com/"]'))
      return 'hidden';
    if (feed.querySelector('.WB_feed_spec_cont a[action-data*="vote.weibo.com"]'))
      return 'hidden';
    if (feed.querySelector('a[suda-uatrack*="1022-vote"]'))
      return 'hidden';
    if (feed.querySelector('.icon_sw_vote'))
      return 'hidden';
    if (weibo.feed.sources.text(feed).indexOf('投票') !== -1)
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 抢红包微博
filter.items.other.hidethese_content.redpack = filter.item({
  'group': 'hidethese_content',
  'version': 305,
  'type': 'boolean',
  'key': 'weibo.other.red2014',
  'text': '{{redPackWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{redPackWeiboDesc}}' } },
  'rule': function redPackWeiboRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.PCD_event_red2014')) return 'hidden';
    if (feed.querySelector('.WB_feed_spec_red2015')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 微博应用介绍
filter.items.other.hidethese_content.appitem = filter.item({
  'group': 'hidethese_content',
  'version': 265,
  'type': 'boolean',
  'key': 'weibo.other.appitem',
  'text': '{{appItemWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{appItemWeiboDesc}}' } },
  'rule': function appItemFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.WB_feed_spec[exp-data*="key=tblog_weibocard"][exp-data*="1042005-appItem"]'))
      return 'hidden';
    if (feed.querySelector('a[yawf-link-type="S"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 微博问答
filter.items.other.hidethese_content.wenda = filter.item({
  'group': 'hidethese_content',
  'version': 431,
  'type': 'boolean',
  'key': 'weibo.other.wenda',
  'text': '{{wendaWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{wendaWeiboDesc}}' } },
  'rule': function wendaFilterRule(feed) {
    if (!this.conf) return null;
    // 这条规则不在显示某人的全部问答页面生效，避免显示空页面
    if (util.dom.matches(feed, '[id^="Pl_Core_WendaList__"] *')) return null;
    if (feed.querySelector('[suda-uatrack*="1022-wenda"]')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 爱问医生
filter.items.other.hidethese_content.wenwodr = filter.item({
  'group': 'hidethese_content',
  'version': 337,
  'type': 'boolean',
  'key': 'weibo.other.wenwodr',
  'text': '{{wenwoDrWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{wenwoDrWeiboDesc}}' } },
  'rule': function wenwoDrFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('div[action-data*="objectid=2017896001:"]')) return 'hidden';
    if (feed.querySelector('a[suda-uatrack*="2017896001-product"]')) return 'hidden';
    if (feed.querySelector('a[href*="//dr.wenwo.com/"]')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 一直播
filter.items.other.hidethese_content.yizhibo = filter.item({
  'group': 'hidethese_content',
  'version': 385,
  'type': 'boolean',
  'key': 'weibo.other.yizhibo',
  'text': '{{yizhiboWeibo}}',
  'ref': {
    'type': {
      'type': 'select',
      'default': 'all',
      'select': [
        { 'value': 'all', 'text': '{{yizhiboWeiboAll}}' },
        { 'value': 'replay', 'text': '{{yizhiboWeiboReplay}}' },
      ],
    }
  },
  'rule': function yizhiboFilterRule(feed) {
    if (!this.conf) return null;
    var live = feed.querySelector('.WB_video[suda-uatrack*="2227747001-live"]');
    if (!live) return null;
    if (this.ref.type.conf === 'all') return 'hidden';
    var type = live.querySelector('.W_icon_tag').textContent;
    util.debug('found yizhibo video with status text: %o', type);
    if (type === '回放') return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 股票链接
filter.items.other.hidethese_content.stock = filter.item({
  'group': 'hidethese_content',
  'version': 275,
  'type': 'boolean',
  'key': 'weibo.other.stock',
  'text': '{{stockWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{stockWeiboDesc}}' } },
  'rule': function stockFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a[suda-uatrack*="1022-stock"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 含有过多话题的微博
filter.items.other.hidethese_content.multi_topic = filter.item({
  'group': 'hidethese_content',
  'version': 149,
  'type': 'boolean',
  'key': 'weibo.other.multi_topic',
  'text': '{{multiTopic}}',
  'ref': {
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{multiTopicDesc}}' },
    'num': {
      'type': 'range',
      'min': 3,
      'max': 10,
      'default': 5,
    }
  },
  'rule': function multiTopicRule(feed) {
    if (!this.conf) return null;
    var topics = weibo.feed.topics.dom(feed);
    if (topics.length >= this.ref.num.conf) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 篇幅过长的微博
filter.items.other.hidethese_content.too_long = filter.item({
  'group': 'hidethese_content',
  'version': 323,
  'type': 'boolean',
  'key': 'weibo.other.too_long',
  'text': '{{tooLongNeedUnfold}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{tooLongNeedUnfoldDesc}}' } },
  'rule': function tooLongNeedUnfoldRule(feed) {
    if (!this.conf) return null;
    if (!feed.hasAttribute('yawf-unfoldlong')) return null;
    if (feed.querySelector('[action-type="fl_unfold"]')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 特定来源的微博
filter.predef.subtitle('other', 'hidethese_source', '{{otherBlacklistTitleSource}}');

// 微话题微博
filter.items.other.hidethese_source.wei_huati = filter.item({
  'group': 'hidethese_source',
  'version': 104,
  'type': 'boolean',
  'key': 'weibo.other.wei_huati',
  'text': '{{huatiSourceWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{huatiSourceWeiboDesc}}' } },
  'rule': function huatiSourceWeiboRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a[suda-data="key=tblog_home_new&value=feed_come_from"][href*="huati.weibo.com"]'))
      return 'hidden';
    if (feed.querySelector('a[href*="//weibo.com/p/"][href$="from=feed_card"]'))
      return 'hidden';
    if (feed.querySelector('.WB_from a[href*="//app.weibo.com/t/feed/4AbAFV"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 新浪微群微博
filter.items.other.hidethese_source.wei_qun = filter.item({
  'group': 'hidethese_source',
  'version': 192,
  'type': 'boolean',
  'key': 'weibo.other.wei_qun',
  'text': '{{weiqunSourceWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{weiqunSourceWeiboDesc}}' } },
  'rule': function weiqunSourceWeiboRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a[href*="//q.weibo.com/"][href$="source=weibosource"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 微话题微博
filter.items.other.hidethese_source.wei_fangtan = filter.item({
  'group': 'hidethese_source',
  'version': 184,
  'type': 'boolean',
  'key': 'weibo.other.wei_fangtan',
  'text': '{{fangtanSourceWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{fangtanSourceWeiboDesc}}' } },
  'rule': function fangtanSourceWeiboRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.WB_from a[href*="talk.weibo.com"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 微公益微博
filter.items.other.hidethese_source.wei_gongyi = filter.item({
  'group': 'hidethese_source',
  'version': 252,
  'type': 'boolean',
  'key': 'weibo.other.wei_gongyi',
  'text': '{{gongyiSourceWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{gongyiSourceWeiboDesc}}' } },
  'rule': function gongyiSourceWeiboRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a[href*="app.weibo.com/t/feed/2u8sMw"]'))
      return 'hidden';
    if (feed.querySelector('a[href*="weibo.com/p/100127p"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 来自 未通过审核应用 微博
filter.items.other.hidethese_source.unauth_source = filter.item({
  'group': 'hidethese_source',
  'version': 196,
  'type': 'boolean',
  'key': 'weibo.other.unauth_source',
  'text': '{{unauthappWeibo}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{unauthappWeiboDesc}}' } },
  'rule': function unauthSourceRule(feed) {
    if (!this.conf) return null;
    var from = Array.from(feed.querySelectorAll('.WB_from'));
    from = from.map(function (f) { return f.lastChild; })
      .filter(function (x) { return x && x.nodeType === Node.TEXT_NODE; })
      .map(function (x) { return x.textContent; })
      .filter(function (x) { return x.indexOf(text.sourceUnkown) !== -1; });
    if (!from.length) return;
    return 'hidden';
  },
}).addto(filter.groups.other);

// 刷屏与版聊
filter.predef.subtitle('other', 'spam', '{{otherSpammingTitle}}');

// 添加数量和折叠/隐藏的
filter.ref = {};
filter.ref.numact = function (defnum, defact, number, action, base) {
  base = base || {};
  base[number || 'number'] = {
    'type': 'number',
    'default': defnum || 3,
    'min': 1,
  };
  base[action || 'action'] = {
    'type': 'select',
    'default': defact || 'fold',
    'select': [
      { 'value': 'fold', 'text': '{{foldlistActionDesc}}' },
      { 'value': 'hidden', 'text': '{{blacklistActionDesc}}' },
    ]
  };
  return base;
};

// 相同帐号的过多微博
filter.items.other.spam.same_account = filter.item({
  'group': 'spam',
  'version': 25,
  'type': 'boolean',
  'priority': -1e6, // 低优先级
  'key': 'weibo.other.same_account',
  'ref': filter.ref.numact(5, 'fold'),
  'text': '{{sameAccountFilterDesc}}',
  'rule': function sameAccountRule(feed) {
    if (!this.conf) return null;
    // 如果在分组页面，而且用户设置了分组页面忽略该过滤器，则不工作
    if (filter.items.base.grouping.group_same_account.conf && util.page.group()) return null;
    // 个人主页同样不能应用
    if (util.page.user()) return;
    var id = weibo.feed.author.id(feed);
    if (!id) return;
    var number = document.querySelectorAll(
      '[node-type="feed_list"] .WB_feed_type[yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])>.WB_feed_detail>.WB_detail>.WB_info>.W_fb[usercard^="id=' + id + '"]'
    ).length;
    if (number >= this.ref.number.conf) {
      feed.setAttribute('yawf-reason', text.sameAccountFilterReason);
      return 'account-' + this.ref.action.conf;
    } else return null;
  },
}).addto(filter.groups.other);

// 相同微博的过多转发
filter.items.other.spam.same_forward = filter.item({
  'group': 'spam',
  'version': 19,
  'type': 'boolean',
  'priority': -1e6, // 低优先级
  'key': 'weibo.other.same_forward',
  'ref': filter.ref.numact(3, 'fold'),
  'text': '{{sameForwardFilterDesc}}',
  'rule': function sameForwardRule(feed) {
    if (!this.conf) return null;
    var omid = feed.getAttribute('omid');
    if (!omid) return null;
    var number = document.querySelectorAll('[node-type="feed_list"] ' +
      '.WB_feed_type[omid="' + omid + '"][yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])').length;
    if (number >= this.ref.number.conf) {
      feed.setAttribute('yawf-reason', text.sameForwardFilterReason);
      return 'forward-' + this.ref.action.conf;
    } else return null;
  },
}).addto(filter.groups.other);

// 评论过滤
filter.predef.group('comment');

// 评论关键词
filter.predef.wbfc({
  'name': 'ckeyword',
  'version': 223,
  'add': function (s) { return s.trim() || null; },
  'listtype': ['blacklist', 'whitelist'],
  'comment': function keywordMatchCommentRule(action, comment) {
    var keywords = this.conf.concat(this.extent);
    var texts = weibo.comment.text(comment).toUpperCase();
    var match = keywords.some(function (keyword) {
      if (!keyword) return false;
      if (texts.indexOf(keyword.toUpperCase()) === -1) return false;
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.content.validator,
    'recognizer': filter.fast.content.recognizer.keyword,
    'selected': filter.fast.selected.comment,
    'add': filter.fast.content.add,
    'description': filter.fast.description.gen({
      'group': 'comment', 'name': 'ckeyword',
      'attr': 'text', 'input': true, 'chosen': true
    }),
  }
}, filter.groups.comment);

// 评论正则式
filter.predef.wbfc({
  'name': 'cregexp',
  'version': 285,
  'add': util.str.addregex,
  'display': function (s) { return '/' + s + '/'; },
  'listtype': ['blacklist', 'whitelist'],
  'comment': function regexpMatchCommentRule(action, comment) {
    var regexen = this.conf.concat(this.extent).map(util.str.compregex).filter(Boolean);
    var texts = weibo.comment.text(comment);
    var match = regexen.some(function (regexp) {
      if (!regexp.exec(texts)) return false;
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.content.validator,
    'recognizer': filter.fast.content.recognizer.regexp,
    'selected': filter.fast.selected.never,
    'add': filter.fast.content.add,
    'description': filter.fast.description.gen({
      'group': 'comment', 'name': 'cregexp',
      'attr': 'text', 'input': true, 'chosen': false
    }),
  }
}, filter.groups.comment);

// 评论用户
filter.predef.wbfc({
  'name': 'cuser',
  'version': 223,
  'add': function (s) { return s.trim().replace(/^@/, '') || null; },
  'display': function (s) { return '@' + s; },
  'listtype': ['blacklist', 'whitelist'],
  'comment': function mentionMatchCommentRule(action, comment) {
    var mentions = this.conf.concat(this.extent), users = weibo.comment.users.name(comment);
    var match = users.some(function (name) { return mentions.indexOf(name) !== -1; });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.account.validator,
    'recognizer': filter.fast.account.recognizer,
    'selected': filter.fast.selected.comment,
    'add': filter.fast.account.addname,
    'description': filter.fast.description.gen({
      'group': 'cuser', 'name': 'cuser',
      'attr': 'name', 'chosen': true
    }),
  }
}, filter.groups.comment);

// 评论话题
filter.predef.wbfc({
  'name': 'ctopic',
  'version': 223,
  'add': function (s) { return s.trim().replace(/#/g, '') || null; },
  'display': function (s) { return '#' + s + '#'; },
  'listtype': ['blacklist', 'whitelist'],
  'comment': function ctopicMatch(action, comment) {
    var topics = this.conf.concat(this.extent), topicText = weibo.comment.topics.text(comment).join('##');
    var match = topics.some(function (topic) { return topicText.indexOf(topic) !== -1; });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.topic.validator,
    'recognizer': filter.fast.topic.recognizer.topic,
    'selected': filter.fast.selected.comment,
    'add': filter.fast.topic.add,
    'description': filter.fast.description.gen({
      'group': 'ctopic', 'name': 'ctopic',
      'attr': 'topic', 'input': true, 'chosen': true
    }),
  }
}, filter.groups.comment);

// 高级选项
filter.predef.subtitle('comment', 'otherc', '{{commentOtherFilters}}');

// 我的评论
filter.items.comment.otherc.my_comment = filter.item({
  'group': 'otherc',
  'version': 229,
  'type': 'boolean',
  'default': true,
  'key': 'weibo.comment.my_comment',
  'priority': 1e5 + 1e3, // 优先于白名单
  'text': '{{commentMyDisplay}}',
  'comment': function myCommentRule(comment) {
    if (!this.conf) return null;
    var id = weibo.comment.author.id(comment);
    if (id === util.info.uid) return 'show';
    return null;
  },
}).addto(filter.groups.comment);

// 表情的数量
filter.items.comment.otherc.emoji_count = filter.item({
  'group': 'otherc',
  'version': 223,
  'type': 'boolean',
  'key': 'weibo.comment.emoji_count',
  'ref': {
    'number': {
      'type': 'number',
      'default': 8,
      'min': 1,
      'max': 20
    }
  },
  'text': '{{commentEmojiCountDesc}}',
  'comment': function emojiCountCommentRule(comment) {
    if (!this.conf) return null;
    var emoji = weibo.comment.emoji(comment);
    if (emoji.length >= this.ref.number.conf) return 'hidden';
    return null;
  },
}).addto(filter.groups.comment);

// 表情的种类
filter.items.comment.otherc.emoji_types = filter.item({
  'group': 'otherc',
  'version': 223,
  'type': 'boolean',
  'key': 'weibo.comment.emoji_types',
  'ref': {
    'number': {
      'type': 'number',
      'default': 4,
      'min': 1,
      'max': 20
    }
  },
  'text': '{{commentEmojiTypesDesc}}',
  'comment': function emojiTypesCommentRule(comment) {
    if (!this.conf) return null;
    var emoji = weibo.comment.emoji(comment);
    emoji.filter(function (e, i) { return emoji.indexOf(e) === i; });
    if (emoji.length >= this.ref.number.conf) return 'hidden';
    return null;
  },
}).addto(filter.groups.comment);

// 没有内容的评论
filter.items.comment.otherc.no_content = filter.item({
  'group': 'otherc',
  'version': 223,
  'type': 'boolean',
  'key': 'weibo.comment.no_content',
  'text': '{{commentWithOutContentDesc}}',
  'comment': function mentionOnlyCommentRule(comment) {
    if (!this.conf) return null;
    if (comment.querySelector('.media_box .WB_pic')) return null; // 有图片的不算没内容
    var texts = Array.from(comment.querySelector('.WB_text').childNodes);
    texts = texts.filter(function (n) { return !util.dom.matches(n, 'a[usercard]'); }); // 提到人不算内容
    texts = texts.map(function (n) { return n.textContent; }).join('');
    texts = texts.replace(/\s/g, '').replace(/回复|回復|回覆|Reply/i, '').slice(1); // 空格、“回复”和冒号不算
    if (!texts) return 'hidden'; else return null;
  },
}).addto(filter.groups.comment);

// 含有转发的评论
filter.items.comment.otherc.with_forward = filter.item({
  'group': 'otherc',
  'version': 223,
  'type': 'boolean',
  'key': 'weibo.comment.with_forward',
  'text': '{{commentWithForwardDesc}}',
  'comment': function withForwardCommentRule(comment) {
    if (!this.conf) return null;
    var users = Array.from(comment.querySelectorAll('a[usercard]'));
    var texts = users.filter(function (u) {
      return u.previousSibling.textContent.match(/\/\/$/);
    });
    if (texts.length) return 'hidden'; else return null;
  },
}).addto(filter.groups.comment);

// 含有图片的评论
filter.items.comment.otherc.with_picture = filter.item({
  'group': 'otherc',
  'version': 223,
  'type': 'boolean',
  'key': 'weibo.comment.with_picture',
  'text': '{{commentWithPicture}}',
  'ref': {
    'act': {
      'type': 'select',
      'default': 'fold',
      'select': [
        { 'value': 'fold', 'text': '{{commentWithPictureFold}}' },
        { 'value': 'hidden', 'text': '{{commentWithPictureHide}}' },
      ],
    }
  },
  'comment': function withPictureCommentRule(comment) {
    if (!this.conf) return null;
    var media = comment.querySelector('.WB_media_wrap'); if (!media) return null;
    if (this.ref.act.conf === 'hidden') return 'hidden'; else return null;
  },
  'ainit': function () {
    if (this.ref.act.conf !== 'fold') return;
    observer.comment.after(function (comment) {
      var media = comment.querySelector('.WB_media_wrap:not([yawf-cmt-img])'); if (!media) return;
      var img = media.querySelector('li[action-type="comment_media_img"] img'); if (!img) return;
      var pid = img.src.match(/\/([^\/]*)\.[^\/]*$/)[1];
      var text = comment.querySelector('.WB_text');
      var a = util.dom.create(util.str.fill(html.viewOriginalFCLink, { 'pid': pid }));
      media.setAttribute('yawf-cmt-img', 'hidden');
      a.addEventListener('click', function () { img.click(); });
      text.appendChild(a);
      var oldLink = text.querySelector('a[imagecard]');
      if (oldLink && oldLink !== a) oldLink.parentNode.removeChild(oldLink);
    });
  },
}).addto(filter.groups.comment);

// 自动删除评论
filter.items.comment.otherc.delete_comment = filter.item({
  'group': 'otherc',
  'version': 229,
  'type': 'boolean',
  'key': 'weibo.comment.delete_comment',
  'text': '{{deleteCommentHidden}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'warn', 'text': '{{deleteCommentHiddenDesc}}' } },
  'init': function () {
    if (!this.conf) return;
    var f = filter.fix.cmthidden.done;
    filter.fix.cmthidden.done = function (comment) {
      f(comment);
      var delbutton = comment.querySelector('a[action-type="delete"]'); if (!delbutton) return;
      var info = delbutton.getAttribute('action-data');
      network.comment.del(info);
    };
  },
}).addto(filter.groups.comment);

// 版面清理
filter.predef.group('layout');

(function () {
  var current = null, group;
  var subtitle = function (name, allButton) {
    group = (current = name).toLocaleLowerCase();
    filter.items.layout[group] = {};
    // 分组标题
    var tid = 'layoutHide' + name;
    var wr = !!text[tid + 'Desc'], ref = {};
    if (wr) ref = { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{' + tid + 'Desc}}' } };
    filter.items.layout[group].title = filter.item({
      'group': group,
      'type': 'subtitle',
      'text': '{{' + tid + '}}' + (wr ? '{{<i>}}' : ''),
      'ref': ref
    }).addto(filter.groups.layout);
    // 下面是全选本组按钮
    if (!allButton) return;
    filter.items.layout[group].all = filter.item({
      'group': group,
      'show': function () {
        var dom = util.dom.create(html.configSelectAll);
        var a = dom.querySelector('a');
        a.addEventListener('click', function () {
          for (var x = dom.nextSibling; ; x = x.nextSibling) {
            if (x.nodeType === Node.TEXT_NODE) continue;
            if (x.classList.contains('yawf-configBoolean')) {
              var y = x.querySelector('input');
              if (!y.checked) y.click();
            }
            if (x.classList.contains('yawf-groupSubtitle')) break;
          }
        });
        return dom;
      }
    }).addto(filter.groups.layout);

  };

  var item = function (name, version, content, config) {
    if (typeof content !== 'function') content = util.css(content);
    config = config || {};
    var tid = 'layoutHide' + current + name, ref = config.ref || {}, wr = !!text[tid + 'Desc'];
    if (wr && !ref.i) ref.i = {
      'type': 'sicon',
      'icon': config.icon || 'ask',
      'text': '{{' + tid + 'Desc}}',
    };
    if (config.bubbled) ref.i.bubbled = config.bubbled;
    var item = {
      'group': group,
      'version': version,
      'type': 'boolean',
      'key': 'weibo.layoutHide' + current + name,
      'default': config['default'] || false,
      'text': '{{' + tid + '}}' + (wr ? '{{<i>}}' : '') + (config.extt || ''),
      'ref': ref,
    };
    if (config.always) item.init = content; else item.ainit = content;
    filter.items.layout[group][name.toLowerCase()] = filter.item(item).addto(filter.groups.layout);
  };

  subtitle('Icon', true);
  item('Level', 12, '.icon_bed[node-type="level"], .W_level_ico, .W_icon_level { display: none !important; }', { 'extt': '<span class="W_icon_level icon_level_c2" style="display:inline-block!important;margin-bottom:-2px;"><span>Lv.1</span></span>' });
  item('Member', 5, '[class*="icon_member"], [class*="ico_member"], [class*="ico_vip"], [class*="icon_vip"] { display: none !important; }', { 'extt': '<i class="W_icon icon_member1" style="display:inline-block!important"></i><img src="https://h5.sinaimg.cn/upload/2016/05/25/494/vip_icon_zuanshi5_1.png" class="W_icon_vipstyle" style="display:inline-block!important"><img src="https://h5.sinaimg.cn/upload/2016/05/30/494/birthdayhat_level_1.png" class="W_icon_vipstyle" style="display:inline-block!important"><img src="https://h5.sinaimg.cn/upload/2016/05/25/494/vip_icon_yangyang_1.png" class="W_icon_vipstyle" style="display:inline-block!important">' });
  item('Approve', 5, '.approve, .icon_approve, .icon_pf_approve, .icon_approve_gold, .icon_pf_approve_gold { display: none !important; }', { 'extt': '<i class="W_icon icon_approve" style="display:inline-block!important"></i><i class="W_icon icon_approve_gold" style="display:inline-block!important"></i>' });
  item('ApproveCo', 5, '.approve_co, .icon_approve_co, .icon_pf_approve_co, [class^="W_icon_co"], [class^=".icon_approve_co_"], [class^=".icon_pf_approve_co_"] { display: none !important; }', { 'extt': '<i class="W_icon icon_approve_co" style="display:inline-block!important"></i>' });
  item('ApproveDead', 107, '.icon_approve_dead, .icon_pf_approve_dead { display: none !important; }', { 'extt': '<i class="W_icon icon_approve_dead" style="display:inline-block!important"></i>' });
  item('Club', 5, '.ico_club, .icon_pf_club, .icon_club { display: none !important; }', { 'extt': '<i class="W_icon icon_club" style="display:inline-block!important"></i>' });
  item('VGirl', 5, '.ico_vlady, .icon_pf_vlady, .icon_vlady { display: none !important; }', { 'extt': '<i class="W_icon icon_vlady" style="display:inline-block!important"></i>' });
  item('Supervisor', 457, '.icon_supervisor { display: none !important; }', { 'extt': '<i class="W_icon icon_supervisor" style="display:inline-block!important"></i>' });
  item('Taobao', 5, '.ico_taobao, .icon_tmall, .icon_taobao, .icon_tmall { display: none !important; }', { 'extt': '<i class="W_icon icon_taobao" style="display:inline-block!important"></i><i class="W_icon icon_tmall" style="display:inline-block!important"></i>' });
  item('Cheng', 373, '.icon_cheng { display: none !important; }', { 'extt': '<i class="W_icon icon_cheng" style="display:inline-block!important"></i>' });
  item('Gongyi', 93, '.ico_gongyi, .ico_gongyi1, .ico_gongyi2, .ico_gongyi3, .ico_gongyi4, .ico_gongyi5, .icon_gongyi, .icon_gongyi2, .icon_gongyi3, .icon_gongyi4, .icon_gongyi5 { display: none !important; }', { 'extt': '<i class="W_icon icon_gongyi" style="display:inline-block!important"></i>' });
  item('Zongyika', 29, '.zongyika2014, .icon_zongyika2014 { display: none !important; }', { 'extt': '<i class="W_icon icon_zongyika2014" style="display:inline-block!important"></i>' });
  item('Youji', 35, '.lvxing2014, .icon_airball, a[href*="//huodong.weibo.com/travel2014"] { display: none !important; }', { 'extt': '<i class="W_icon icon_airball" style="display:inline-block!important"></i>' });
  item('Double11', 123, '.ico_double11, .icon_double11 { display: none !important; }', { 'extt': '<i class="W_icon icon_double11" style="display:inline-block!important"></i>' });
  item('Night', 185, '.icon_wbnight2014 { display: none !important; }', { 'extt': '<i class="W_icon icon_wbnight2014" style="display:inline-block!important"></i>' });
  item('RedPack', 434, '.icon_redpack, .icon_wealth { display: none !important; }', { 'extt': '<i class="W_icon icon_redpack" style="display:inline-block!important"></i><i class="W_icon icon_wealth" style="display:inline-block!important"></i>' });
  item('Run', 247, '.icon_run2015 { display: none !important; }', { 'extt': '<i class="W_icon icon_run2015" style="display:inline-block!important"></i>' });
  item('FoolsDay', 372, '.icon_foolsday { display: none !important; }', { 'extt': '<i class="W_icon icon_foolsday" style="display:inline-block!important"></i>' });
  item('Hong', 383, '.icon_hong { display: none !important; }', { 'extt': '<i class="W_icon icon_hong" style="display:inline-block!important"></i>' });
  item('Wedding', 412, '.icon_wedding { display: none !important; }', { 'extt': '<i class="W_icon icon_wedding" style="display:inline-block!important"></i>' });
  item('Other', 443, '.W_icon_yy { display: none !important; }', { 'extt': '<i class="W_icon_yy icon_yy_ssp1" style="display:inline-block!important"></i><i class="W_icon_yy icon_yy_gqt" style="display:inline-block!important"></i><i class="W_icon_yy icon_yy_lol" style="display:inline-block!important"></i>' });

  subtitle('Nav', true);
  item('LogoImg', 256, function replaceLogo() {
    // 94～205 版本针对 v5 的功能，206 版本因 v6 未出现节日徽标而移除；256 版本恢复
    var box = document.querySelector('.WB_global_nav .gn_logo .box');
    if (!box) return setTimeout(replaceLogo, 100);
    var img = document.querySelector('.WB_global_nav .gn_logo .box img');
    if (!img) return;
    var logo = util.dom.create(html.navLogo);
    img.parentNode.replaceChild(logo, img);
  });
  item('Main', 5, '.gn_nav_list>li:nth-child(1) { display: none !important; }');
  item('TV', 405, '.gn_nav_list>li:nth-child(2) { display: none !important; }');
  item('Hot', 5, '.gn_nav_list>li:nth-child(3) { display: none !important; }');
  item('Game', 5, '.gn_nav_list>li:nth-child(4) { display: none !important; }');
  item('HotSearch', 277, function () { observer.stopjsonp(/\/\/s.weibo.com\/ajax\/jsonp\/gettopsug\?/); });
  item('NoticeNew', 87, '.WB_global_nav .gn_set_list .W_new_count { display: none !important; }');
  item('New', 433, '.WB_global_nav .W_new { display: none !important; }');
  item('HotTip', 430, function () {
    // 添加一个假的小黄签
    var fakeTips = null;
    var addFakeTip = function addFakeTip() {
      if (fakeTips) return fakeTips;
      var container = document.querySelector('.WB_global_nav .gn_topmenulist_tips').parentNode;
      fakeTips = util.dom.create(html.topMenuListTips);
      fakeTips.querySelector('.ficon_close').addEventListener('click', function (e) {
        fakeTips.style.display = 'none';
        var realTips = document.querySelector('.WB_global_nav .gn_topmenulist_tips');
        realTips.querySelector('.ficon_close').click();
      });
      container.appendChild(fakeTips);
      return fakeTips;
    };
    // 在真的小黄签有变化的时候更新假的小黄签
    var updateFakeTips = function updateFakeTips() {
      var realTips = document.querySelector('.WB_global_nav .gn_topmenulist_tips'); if (!realTips) return;
      var fakeTips = addFakeTip(); if (!fakeTips) return;

      var tipsContainer = fakeTips.querySelector('ul');
      var currentTips = Array.from(tipsContainer.querySelectorAll('li'));

      var allTips = Array.from(realTips.querySelectorAll('li'));
      allTips = allTips.filter(function (tip) {
        var a = tip.querySelector('a[href]'), href = a && a.href || '';
        if (href.indexOf('//d.weibo.com') !== -1) return false;
        if (href.indexOf('//weibo.com/tv') !== -1) return false;
        return true;
      });

      var changed = allTips.map(function (tip) { return tip.textContent; }).join(',') !==
        currentTips.map(function (tip) { return tip.textContent; }).join(',');
      if (!changed) return;

      var newContainer = tipsContainer.cloneNode(true);
      newContainer.innerHTML = '';
      allTips.forEach(function (tip) { newContainer.appendChild(tip.cloneNode(true)); });
      tipsContainer.parentNode.replaceChild(newContainer, tipsContainer);
      if (allTips.length && realTips.style.display !== 'none') {
        fakeTips.style.display = 'block';
      } else {
        fakeTips.style.display = 'none';
      }
    };
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_global_nav .gn_topmenulist_tips:not(.yawf-gn_topmenulist_tips) { display: none !important; }
      .WB_global_nav .gn_topmenulist_notice:not([style*="none"]) ~ .yawf-gn_topmenulist_tips { display: none !important; }
    */ noop(); }));
    observer.dom.add(updateFakeTips);
    updateFakeTips();
  });

  // 隐藏左栏的辅助函数
  var levHidden = (function (id) {
    var firstRun = true;
    var ids = [];
    // 移除一个左栏链接或相关元素
    var removeNode = function removeNode(node) {
      var container = node.parentNode, prev, next;
      var removeBlank = function (node) {
        if (node && node.nodeType === Node.TEXT_NODE && node.data.match(/^\s*$/))
          return container.removeChild(node);
        if (node && node.nodeType === Node.COMMENT_NODE)
          return container.removeChild(node);
      };
      var removeBlankSibling = function (node) {
        while (removeBlank(node.previousSibling));
        while (removeBlank(node.nextSibling));
      };
      removeBlankSibling(node);
      prev = node.previousSibling, next = node.nextSibling;
      // 如果前后都是分割线（连续的分割线）那么应当删掉一个（删掉前面一个）
      // 如果分割线在开头或末尾，那么应该删掉分割线
      // 如果前后都没有东西，那么应该连同容器一起删除
      while ((!prev || util.dom.matches(prev, '.lev_line')) &&
        (!next || util.dom.matches(next, '.lev_line'))) {
        var line = null;
        if (prev && util.dom.matches(prev, '.lev_line_v2')) line = prev;
        if (next && util.dom.matches(next, '.lev_line_v2')) line = next;
        if (line) {
          line = prev || next;
          removeBlankSibling(line);
          container.removeChild(line);
          prev = node.previousSibling;
          next = node.nextSibling;
        } else break;
      }
      if (node.parentNode) node.parentNode.removeChild(node);
      if (!prev && !next) removeNode(container);
    };
    // 检查是否有未筛选的左栏链接并根据名称判断
    var listener = function leftNavRemove() {
      var levs = Array.from(document.querySelectorAll('#v6_pl_leftnav_group .lev[yawf-id]:not([yawf-checked-lev])')); if (!levs) return;
      levs.forEach(function (lev) {
        lev.setAttribute('yawf-checked-lev', '');
        var id = lev.getAttribute('yawf-id'); if (ids.indexOf(id) === -1) return;
        removeNode(lev);
      });
    };
    return function (id) {
      return function () {
        ids.push('leftnav_' + id);
        if (firstRun) {
          observer.dom.add(listener); listener();
          util.css.add('#v6_pl_leftnav_group .lev:not([yawf-checked-lev]) { visibility: hidden; }');
        }
      };
    };
  }());
  subtitle('Left', true);
  item('Home', 390, levHidden('home'));
  item('Fav', 390, levHidden('fav'));
  item('Like', 390, levHidden('like'));
  item('Hot', 390, levHidden('hot'));
  item('TV', 423, levHidden('tv'));
  item('Friends', 5, levHidden('friends'));
  item('GroupToMe', 333, levHidden('groupsfeed'));
  item('Special', 333, levHidden('special'));
  item('Whisper', 333, levHidden('whisper'));
  item('New', 106, '.WB_left_nav .lev .W_new, .yawf-WB_left_nav .lev .W_new { display: none !important; }');
  item('News', 106, '.WB_left_nav .level_1_Box .W_new_count, .yawf-WB_left_nav .level_1_Box .W_new_count { display: none !important; }');
  item('Count', 106, '.WB_left_nav .pl_leftnav_group .W_new_count, .WB_left_nav .lev .W_new_count, .yawf-WB_left_nav .pl_leftnav_group .W_new_count, .yawf-WB_left_nav .lev .W_new_count { display: none !important; }');

  subtitle('Middle', true);
  item('RecommendedTopic', 5, '#v6_pl_content_publishertop div[node-type="recommendTopic"] { display: none !important; }');
  item('FeedRecommand', 35, 'a.notes[node-type="feed_list_newBar"][href^="http"]:not([action-type="feed_list_newBar"]), .WB_feed_newuser[node-type="recommfeed"] { display: none !important; }');
  item('MemberTip', 5, '[node-type="feed_list_shieldKeyword"] { display: none !important; }');

  subtitle('Right', true);
  item('Info', 5, '#v6_pl_rightmod_myinfo { display: none !important; }');
  item('RecomMusicRank', 387, '#v6_pl_rightmod_rank { display: none !important; }');
  item('HotTopic', 5, '[yawf-id="rightmod_zt_hottopic"] { display: none !important; }');
  item('HotTopicExpand', 178, '.hot_topic .WB_right_expand { display: none !important; }');
  item('Interest', 5, '[yawf-id="rightmod_recom_interest"] { display: none !important; }');
  item('Member', 5, '#v6_trustPagelet_recom_member { display: none !important; }');
  item('Groups', 102, '#v6_pl_rightmod_groups { display: none; }');
  item('RecomGroupUser', 191, '#v6_pl_rightmod_recomgroupuser { display: none; }');
  item('HongbaoRank', 432, '#v6_pl_rightmod_hongbao { display: none !important; }');
  item('Movie', 186, '[yawf-id="rightmod_recom_movie"] { display: none !important; }');
  item('AttFeed', 248, '#v6_pl_rightmod_attfeed { display: none !important; }', { 'icon': 'warn' });
  item('TaobaoMovie', 200, '[yawf-id="rightmod_taobao_movie"] { display: none !important; }');
  item('Notice', 5, '#v6_pl_rightmod_noticeboard { display: none !important; }');

  subtitle('Weibo', true);
  item('RecomFeed', 2, '[node-type="recommfeed"] { display: none !important; }');
  item('FeedOuterTip', 449, '.WB_feed .W_tips { display: none !important; }');
  item('FeedTip', 7, '[node-type="feed_privateset_tip"] { display: none !important; }');
  item('GroupTip', 97, '.WB_feed_type .WB_cardtitle_b { display: none !important; }');
  item('VIPBackground', 253, util.str.cmt(function () { /*!CSS
    .WB_feed_detail[style*="feed_cover/star_"],
    .WB_feed_detail[style*="feed_cover/vip_"] { background: none !important; }
    .WB_vipcover, .WB_starcover { display: none !important; }
    .WB_feed_vipcover .WB_feed_detail { padding-top: 10px; }
    .WB_feed.WB_feed_v3 .WB_feed_vipcover .WB_feed_detail { padding-top: 20px; }
  */ noop(); }));
  item('LastPic', 72, function () {
    observer.dom.add(function hideLastPic() {
      var last;
      last = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view:not([yawf-piclast]) .pic_choose_box li:last-child a.current');
      while (last && !last.classList.contains('WB_media_view')) last = last.parentNode;
      if (last) last.setAttribute('yawf-piclast', 'yawf-piclast');
      last = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view[yawf-piclast] .pic_choose_box li:not(:last-child) a.current');
      while (last && !last.classList.contains('WB_media_view')) last = last.parentNode;
      if (last) last.removeAttribute('yawf-piclast');
      var close = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view .artwork_box .ficon_close ');
      if (close) close.click();
    });
    util.css.add('.WB_feed_type .WB_expand_media .WB_media_view[yawf-piclast] .rightcursor { cursor: url("//img.t.sinajs.cn/t6/style/images/common/small.cur"), auto !important; }');
  });
  item('PicTag', 179, '.WB_media_view .media_show_box .artwork_box .tag_showpicL, .WB_media_view .media_show_box .artwork_box .tag_showpicR, .icon_taged_pic { display: none !important; }');
  item('SonTitle', 35, '.WB_feed_type .WB_feed_together .wft_hd { display: none !important; }');
  item('Card', 182, '.WB_pic_app, .WB_feed_spec, .WB_music { display: none !important; }');
  item('ArticalPay', 220, function () {
    observer.dom.add(function hideArticalPay() {
      var t1 = document.querySelector('.feed_app_btn_a a[action-data*="px.e.weibo.com"]');
      if (t1) {
        while (!util.dom.matches(t1, '.feed_app_btn_a')) t1 = t1.parentNode;
        t1.parentNode.removeChild(t1);
      }
      var t2 = document.querySelector('.WB_cardwrap #pl_article_articlePay');
      if (t2) {
        while (!util.dom.matches(t2, '.WB_cardwrap')) t2 = t2.parentNode;
        t2.parentNode.removeChild(t2);
      }
      var t3 = document.querySelector('.rewardcomponent');
      if (t3 && t3.querySelector('a[action-type="buyWrap"][action-data*="type=reward"]')) {
        while (t3.parentNode.firstChild === t3.parentNode.lastChild) t3 = t3.parentNode;
        t3.parentNode.removeChild(t3);
      }
    });
  });
  item('Tag', 186, '.WB_tag { display: none !important; }');
  item('MovieTag', 218, '.WB_feed_type .WB_tag_rec { display: none !important; }');
  item('Source', 34, '.WB_time+.S_txt2, .WB_time+.S_txt2+.S_link2, .WB_time+.S_txt2+.S_func2 { display: none !important; }' +
    '.WB_feed_detail .WB_from a[date]::after { content: " "; display: block; } .WB_feed_detail .WB_from { height: 16px; overflow: hidden; }');
  item('Pop', 118, '.WB_feed_datail a[action-type="fl_pop"], .WB_feed_datail a[action-type="fl_pop"]+.S_txt3, ' +
    '.WB_handle li[yawf-handle-type="fl_pop"] { display: none !important; }');
  item('Like', 34, 'a[action-type="feed_list_like"], a[action-type="feed_list_like"]+.S_txt3, ' +
    '[node-type="multi_image_like"], [action-type="feed_list_image_like"], ' +
    '[action-type="object_like"], [action-type="like_object"], ' +
    '.WB_feed_datail a[action-type="fl_like"], .WB_feed_datail a[action-type="fl_like"]+.S_txt3, ' +
    '.WB_expand .WB_handle.W_fr li:nth-child(3), ' +
    '.WB_handle li[yawf-handle-type="fl_like"], .WB_handle li[yawf-handle-type="like"] ' +
    '.layer_multipic_preview .pos_icon { display: none !important; }');
  item('LikeComment', 34, '.WB_handle li[yawf-comment-handle-type="like"] { display: none !important; }');
  item('Forward', 34, 'a[action-type="feed_list_forward"], a[action-type="feed_list_forward"]+.S_txt3, ' +
    '.WB_media_expand .WB_handle a.S_func4[href$="?type=repost"], .WB_media_expand .WB_handle a.S_func4[href$="?type=repost"]+.S_txt3, ' +
    '.WB_feed_datail a[action-type="fl_forward"], .WB_feed_datail a[action-type="fl_forward"]+.S_txt3, ' +
    '.WB_expand .WB_handle.W_fr li:nth-child(1), ' +
    '.WB_handle li[yawf-handle-type="fl_forward"], .WB_handle li[yawf-handle-type="tab"]:nth-child(2) ' +
    ' { display: none !important; }');
  item('Favourite', 34, 'a[action-type="feed_list_favorite"], a[action-type="feed_list_favorite"]+.S_txt3, ' +
    '.WB_feed_datail a[action-type="fl_favorite"], .WB_feed_datail a[action-type="fl_favorite"]+.S_txt3, ' +
    '.WB_handle .WB_row_line li[yawf-handle-type="fl_favorite"] { display: none !important; }');
  item('PromoteOther', 220, '.screen_box .layer_menu_list a[action-data*="promote.vip.weibo.com"] { display: none !important; }');
  item('Report', 220, '.screen_box .layer_menu_list a[onclick*="service.account.weibo.com/reportspam"], .WB_handle ul li[yawf-comment-handle-type="report"] { display: none !important; }');
  item('UseCardBackground', 294, '.screen_box .layer_menu_list a[action-type="fl_cardCover"] { display: none !important; }');

  // 标记微博按钮
  observer.weibo.onload(function (feed) {
    var li = Array.from(feed.querySelectorAll('.WB_feed_type .WB_handle .WB_row_line li, .WB_feed_together .WB_func .WB_handle li'));
    li.forEach(function (li) {
      var type = li.querySelector('a').getAttribute('action-type');
      if (!type && li.querySelector('a[suda-uatrack="key=profile_feed&value=popularize_host"]')) type = 'fl_pop';
      if (!type && li.querySelector('span[title*="评论"], span[title*="評論"], span[title*="comment"]')) type = 'fl_comment'; // 由于用户设置，无法进行评论
      li.setAttribute('yawf-handle-type', type);
    });
    var fwli = Array.from(feed.querySelectorAll('.WB_feed_expand .WB_func .WB_handle li'));
    if (fwli.length === 3) fwli.forEach(function (li, index) {
      li.setAttribute('yawf-handle-type', ['fl_forward', 'fl_comment', 'fl_like'][index]);
    }); else if (fwli.length === 4) fwli.forEach(function (li, index) {
      li.setAttribute('yawf-handle-type', ['fl_read', 'fl_forward', 'fl_comment', 'fl_like'][index]);
    });
  });

  // 标记微博评论按钮
  observer.dom.add(function markCommentButton() {
    var cli = Array.from(document.querySelectorAll([
      '.list_ul[node-type="feed_list_commentList"] .WB_handle ul li:not([yawf-comment-handle-type])',
      '.list_ul[node-type="comment_list"] .WB_handle ul li:not([yawf-comment-handle-type])',
      '.WB_feed_comment .WB_handle ul li:not([yawf-comment-handle-type])'
    ].join(',')));
    cli.forEach(function (li) {
      var a = li.querySelector('a'), type = null;
      if (util.dom.matches(a, '[onclick*="service.account.weibo.com/reportspam"]')) type = 'report';
      else if (util.dom.matches(a, '[action-type="delete"]')) type = 'delete';
      else if (util.dom.matches(a, '[action-type="commentDialogue"]')) type = 'conversition';
      else if (util.dom.matches(a, '[action-type="reply"]')) type = 'reply';
      else if (util.dom.matches(a, '[action-type="replycomment"]')) type = 'reply';
      else if (util.dom.matches(a, '[action-type="fl_like"]')) type = 'like';
      li.setAttribute('yawf-comment-handle-type', type || '');
    });
  });

  // 标记查看大图的按钮
  observer.dom.add(function markPictureViewButton() {
    var cli = Array.from(document.querySelectorAll('.multipic_preview .WB_handle li:not([yawf-handle-type])'));
    cli.forEach(function (li) {
      var a = li.querySelector('a'), type = a.getAttribute('action-type');
      li.setAttribute('yawf-handle-type', type || '');
    });
  });

  subtitle('Person', true);
  item('MoveThings', 51, '.profile_move_things { display: none !important; }');
  item('Cover', 5, function () {
    util.css.add(util.str.cmt(function () { /*!CSS
      .PCD_header, .PCD_header .pf_wrap, .PCD_header .shadow { height: 130px; }
      .PCD_header .pf_photo { margin: 10px 20px 10px calc(50% - 280px); float: left; }
      .PCD_header .pf_username, .PCD_header .pf_intro { text-shadow: 0 0 4px #000; }
      .PCD_header .pf_username, .PCD_header .pf_intro, .PCD_header .pf_opt { text-align: left; margin-left: 140px; }
      .PCD_header .pf_wrap .pf_use_num, .PCD_header .pf_wrap .pf_copy_icon, .PCD_header .upcover { display: none; }
      .PCD_header .S_shadow, .PCD_header .cover_wrap, .PCD_header .pf_wrap { background: none !important; }
      .PCD_header .shadow { margin: 0 calc(50% - 300px); width: 600px; }
      .PCD_header .pf_intro { height: 36px; line-height: 18px; }
      .PCD_header .pf_opt { margin-top: 8px; }
    */ noop(); }));
    observer.dom.add(function fullProfileIntroduction() {
      var intro = document.querySelector('.PCD_header .pf_intro:not([yawf-full-intro])'); if (!intro) return;
      intro.setAttribute('yawf-full-intro', (intro.textContent = intro.getAttribute('title')));
    });
  });
  item('BGImg', 227, '.S_page, .S_page .WB_miniblog { background-image: url("\'\'") !important; }');
  item('BadgeIcon', 10, '.pf_badge_icon { display: none !important; }');
  item('Verify', 174, '[yawf-id="yawf-pr-pcd-person-info-my"] .verify_area, [yawf-id="yawf-pr-pcd-person-info"] .verify_area { display: none !important; }');
  item('EditPersonInfo', 174, '[yawf-id="yawf-pr-pcd-person-info-my"] { display: none !important; }');
  item('Stats', 5, '[yawf-id="yawf-pr-pcd-counter"] { display: none !important; }');
  item('MyData', 5, '[id^="Pl_Official_MyMicroworld__"], .WB_frame_b [id^="Pl_Official_MyPopularity__"] { display: none !important; }');
  item('SuggestUser', 10, '[id^="Pl_Core_RightUserList__"], .WB_frame_b [id^="Pl_Core_RightUserList__"] { display: none !important; }');
  item('Group', 12, '[id^="Pl_Core_UserGrid__"] { display: none !important; }');
  item('Relation', 5, '[id^="Pl_Core_RightUserGrid__"], .WB_frame_b [id^="Pl_Core_RightUserGrid__"] { display: none !important; }');
  item('Album', 5, '[id^="Pl_Core_RightPicMulti__"], .WB_frame_b [id^="Pl_Core_RightPicMulti__"], [yawf-obj-name="相冊"], [yawf-obj-name="相册"], .PCD_photolist { display: none !important; }');
  item('HotTopic', 5, '[id^="Pl_Core_RightTextSingle__"], .WB_frame_b [id^="Pl_Core_RightTextSingle__"] { display: none !important; }');
  item('HotWeibo', 5, '[id^="Pl_Core_RightPicText__"], .WB_frame_b [id^="Pl_Core_RightPicText__"] { display: none !important; }');
  item('UserList', 164, '[id^="Pl_Core_Ut1UserList__"], .WB_frame_b [id^="Pl_Core_RightPicText__"] { display: none !important; }');
  item('Hongbao', 199, '[yawf-id="yawf-pr-hongbao"], .WB_red2017 { display: none !important; }');
  item('WenwoDr', 337, '[yawf-obj-name="爱问医生"] { display: none !important; }'); // 对应模块没有繁体或英文翻译
  item('Timeline', 164, '[id^="Pl_Official_TimeBase__"] { display: none !important; }');

  subtitle('PLeft');
  filter.items.layout.pleft.mods = filter.item({
    'group': 'pleft',
    'version': 134,
    'key': 'weibo.layout.pleft',
    'text': '{{layoutHidePLeftDetails}}',
    'type': 'strings',
    'add': function (s) { return s.trim() || null; },
    'init': function () {
      if (!this.conf.length) return;
      util.css.add(this.conf.map(function (s) {
        s = s.replace(/\\/g, '\\\\').replace(/"/g, '\\"');
        return '[yawf-obj-name*="' + s + '"]';
      }).join(', ') + ' { display: none !important; }');
    }
  }).addto(filter.groups.layout);

  subtitle('Messages', true);
  item('Help', 97, '#v6_pl_rightmod_helpat, #v6_pl_rightmod_helpcomment, #v6_pl_rightmod_helplike, #v6_pl_rightmod_helpnotebox, #v6_pl_rightmod_helpfav, #v6_pl_rightmod_helpgroupchatnotice { display: none !important; }');
  item('Feedback', 97, '#v6_pl_rightmod_feedback { display: none !important; }');
  item('Youdao', 174, '#v6_pl_rightmod_favyoudao { display: none !important; }');

  subtitle('Other', true);
  item('Ads', 2, function () {
    util.css.add([
      '[ad-data]', '[feedtype="ad"]',
      '[id^="ads_"]', '[id^="ad_"]',
      '[id*="pl_rightmod_ads"]', '[id*="pl_content_biz"]', '[id*="pl_ad_"]', '[id^="sinaadToolkitBox"]',
      '[class*="WB_ad_"]',
      '#topicAD', '#topicADButtom', '.WB_feed .popular_buss', '.feed_app_ads', '.W_bigDay',
      '.WB_feed_yy2016_up_but', '.WB_feed_yy2016_down_but', '#pl_common_ali',
      '.W_skin_banner',
      '[node-type="imgBtn"][action-data="canUploadImage=0"]'
    ].join(',') + ' { display: none !important; } ' +
    '#wrapAD, .news_logo { visibility: hidden !important; }');
    var version = '';
    // 检查应当替换为哪种皮肤
    // 网页中 $CONFIG.skin 给出了用户选择的皮肤
    var defaultSkin = 'skin058', target = defaultSkin;
    try { target = util.info.skin || defaultSkin; } catch (e) { }
    if (/skin3[56]\d/.test(target)) target = defaultSkin;
    // 检查网页中是否被插入了广告皮肤，如果有则换成用户选择的（或默认的）皮肤
    var updateSkin = function updateSkin() {
      var adskin = document.querySelector('link[href*="/skin35"], link[href*="/skin36"]');
      if (adskin) {
        var a = util.dom.create('a', ''); version = ''; a.href = adskin.href;
        try { version = version || util.str.parsequery(a.search.slice(1)).version; } catch (e) { }
        util.debug('ad skin %o(version %o) has been replaced', adskin.href, version);
        adskin.setAttribute('href', '//img.t.sinajs.cn/t6/skin/' + target + '/skin.css?version=' + version);
      }
      var adskincover = document.querySelector('#skin_cover_s[style*="/skin35"], #skin_cover_s[style*="/skin36"]');
      if (adskincover) adskincover.style.backgroundImage = 'url("//img.t.sinajs.cn/t6/skin/' + target + '/images/profile_cover_s.jpg?version=' + version + '")';
    };
    observer.dom.add(updateSkin);

    // 处理 2016.6.18 的广告
    util.func.page(function () {
      // 你的广告我已经看过上万遍了，所以别给我放广告
      document.cookie = 'wb_barrage' + $CONFIG.uid + '=' + (10000 + Math.round(Math.random() * 1000)) +
        '; expires=' + new Date(Date.now() + 2.6e8).toGMTString() + '; path=/';
    });
    // 总之你放的东西我看不到，所以别给我放广告了
    util.css.add('.WB_ad_tm2015 ~ div[style*="position"][style*="fixed"][style*="z-index"][style*="99999"] { display: none !important; }');

    // 移除一些显示广告的 className ，不移除对象本身
    // 这些 className 因为影响过大，通过样式覆盖较为困难且容易发生问题
    var adClassName = ['WB_feed_yy2016_up', 'WB_feed_yy2016_down'];
    var removeClassName = function noAdsRemoveClassName() {
      adClassName.forEach(function (className) {
        var targets = Array.from(document.getElementsByClassName(className));
        targets.forEach(function (element) {
          element.classList.remove(className);
        });
      });
    };
    observer.dom.add(removeClassName);
  }, { 'default': true });
  item('Music', 110, '.PCD_mplayer { display: none !important; }');
  item('Template', 279, '.icon_setskin { display: none !important; }');
  item('HomeTip', 124, '#v6_pl_content_hometip { display: none !important }');
  item('Footer', 5, '.global_footer, .WB_footer { display: none !important; }');
  item('WbIm', 5, '.WBIM_news, .sendbox_btn_l a[href*="//desktop.weibo.com/download.php"] { display: none !important; }');
  item('IM', 189, '#WB_webim { display: none !important; }');
  item('Tip', 8, '.W_layer_tips { display: none !important; }');
  item('RelatedWB', 134, '[yawf-obj-name="相关推荐"] { display: none !important; } #WB_webim .wbim_chat_box, #WB_webim .wbim_min_chat  { right: 20px !important; }');
  item('RelatedArtical', 411, '.WB_artical [node-type="recommend"] { display: none !important; }');
  item('SendWeibo', 220, '.send_weibo_simple { display: none !important; }');

  // 根据元素内容标记元素
  var tagMods = function (qs, identifiers) {
    return function tagModsInner() {
      var mods = Array.from(document.querySelectorAll(qs));
      if (!mods.length) return;
      mods.forEach(function (mod) {
        mod.setAttribute('yawf-id', '');
        Object.keys(identifiers).forEach(function (qs) {
          if (mod.querySelector(qs)) mod.setAttribute('yawf-id', identifiers[qs]);
        });
      });
    };
  };

  // 标记首页左栏导航链接
  var tagLeftNavMods = tagMods([
    '#v6_pl_leftnav_group .lev:not([yawf-id])',
  ].join(','), {
    'a[href*="/home?"]': 'leftnav_home',
    'a[href^="/at/"]': 'leftnav_message',
    'a[href^="/fav"]': 'leftnav_fav',
    'a[href^="/like"]': 'leftnav_like',
    'a[href^="/friends"]': 'leftnav_friends',
    'a[href^="/groupsfeed"]': 'leftnav_groupsfeed',
    'a[href^="/mygroups"]': 'leftnav_mygroups',
    'a[href*="//d.weibo.com"]': 'leftnav_hot',
    'a[href*="//weibo.com/tv"]': 'leftnav_tv',
    'a[href*="krcom.cn"]': 'leftnav_tv',
    'a[href^="/mygroups"][href*="isspecialgroup=1"]': 'leftnav_special',
    'a[href^="/mygroups"][href*="whisper=1"]': 'leftnav_whisper',
  });
  observer.dom.add(tagLeftNavMods);
  tagLeftNavMods();

  // 标记首页右栏元素
  var tagRightbarMods = tagMods([
    '#trustPagelet_indexright_recom .WB_right_module:not([yawf-id])',
    '#v6_pl_rightmod_recominfo .WB_cardwrap:not([yawf-id])',
    '#v6_pl_rightmod_rank .WB_cardwrap:not([yawf-id])',
  ].join(','), {
    '[change-data*="key=hottopic_r2"]': 'rightmod_zt_hottopic',
    '[change-data*="key=interest_r2"]': 'rightmod_recom_interest',
    'h4.obj_name a[href*="movie.weibo.com"]': 'rightmod_recom_movie',
    'h4.obj_name a[href*="taobao.com"][href*="dianying"]': 'rightmod_taobao_movie',
    'h2.main_title a[href*="book.weibo.com/top"]': 'v6_pl_rightmod_rank_book',
    'h4.obj_name a[href*="pop.weibo.com"]': 'v6_pl_rightmod_rank_pop',
    'div.obj_name a[href*="100808faecebff8a54b97a91699c654e5f4cda"]': 'v6_pl_rightmod_rank_hong',
  });

  // 标记个人主页的模块
  var tagPLeftModsName = function () {
    var names = Array.from(document.querySelectorAll([
      '.WB_frame_b > div:not([yawf-obj-name]) .main_title',
      '.WB_frame_c > div:not([yawf-obj-name]) .main_title'
    ].join(',')));
    if (!names.length) return;
    names.forEach(function (title) {
      var name = title && title.textContent.trim() || '', p = title;
      while (
        !p.parentNode.classList.contains('WB_frame_b') &&
        !p.parentNode.classList.contains('WB_frame_c')
      ) p = p.parentNode;
      if (!p.hasAttribute('yawf-obj-name')) p.setAttribute('yawf-obj-name', name);
    });
  };
  var tagPLeftModsQs = tagMods('.WB_frame_b > div:not(:empty):not([yawf-id])', {
    '.PCD_counter': 'yawf-pr-pcd-counter',
    '.PCD_person_info': 'yawf-pr-pcd-person-info',
    '.WB_cardwrap[action-data*="weibo.com%2Fhongbao"]': 'yawf-pr-hongbao',
    '.WB_cardwrap[action-data*="sina.com.cn%2Fhongbao"]': 'yawf-pr-hongbao',
    'a[href*="//hongbao.weibo.com/hongbao"]': 'yawf-pr-hongbao',
    '.PCD_person_info a.WB_cardmore[href^="/p/"][href$="info?mod=pedit"]': 'yawf-pr-pcd-person-info-my',
  });
  var tagPLeftMods = function tagPLeftMods() {
    tagPLeftModsName();
    tagPLeftModsQs();
  };

  observer.dom.add(function tagMods() {
    tagRightbarMods();
    tagPLeftMods();
  });
  tagRightbarMods();
  tagPLeftMods();

}());

// 改造设置
filter.predef.group('tool');

// 边栏相关工具
filter.predef.subtitle('tool', 'sidebar', '{{sideColumnToolsTitle}}');

// 展开左栏消息
filter.items.tool.sidebar.show_all_msg_nav = filter.item({
  'group': 'sidebar',
  'version': 390,
  'type': 'boolean',
  'key': 'weibo.tool.showAllMsgNav',
  'text': '{{{showAllMsgNav}}}',
  'ref': {
    'i': { 'type': 'sicon', 'icon': 'warn', 'text': '{{showAllMsgNavDesc}}' },
    'atme': { 'type': 'boolean', 'default': true },
    'cmt': { 'type': 'boolean', 'default': true },
    'like': { 'type': 'boolean', 'default': false },
    'dm': { 'type': 'boolean', 'default': false },
    'msgbox': { 'type': 'boolean', 'default': false },
    'group': { 'type': 'boolean', 'default': false },
    'dmsub': { 'type': 'boolean', 'default': false },
  },
  'ainit': function () {
    var confs = this.ref;
    observer.dom.add(function showAllMsgNav() {
      var groupList = document.querySelector('#v6_pl_leftnav_group [node-type="groupList"]:not([yawf-message])'); if (!groupList) return;
      var home = groupList.querySelector('.lev a[href*="/home?"]');
      while (home && home.parentNode !== groupList) home = home.parentNode;
      var ref = home ? home.nextSibling : groupList.firstChild;
      groupList.setAttribute('yawf-message', '');
      var msgHtml = [html.leftMsgHeader,
        confs.atme.conf ? html.leftMsgAtMe : '',
        confs.cmt.conf ? html.leftMsgCmt : '',
        confs.like.conf ? html.leftMsgLike : '',
        confs.dm.conf ? html.leftMsgDM : '',
        confs.msgbox.conf ? html.leftMsgBox : '',
        confs.group.conf ? html.leftMsgGroup : '',
        confs.dmsub.conf ? html.leftMsgDMSub : '',
      html.leftMsgFooter].join('');
      var mn = util.dom.create(util.str.fill(msgHtml));
      ref.parentNode.insertBefore(mn, ref);
    });
  },
}).addto(filter.groups.tool);


// 展开左栏分组
filter.items.tool.sidebar.show_all_group = filter.item({
  'group': 'sidebar',
  'version': 10,
  'type': 'boolean',
  'key': 'weibo.tool.showAllGroup',
  'text': '{{showAllGroupDesc}}',
  'ainit': function () {
    util.css.add('.lev_Box .levmore { display: none !important; } .lev_Box [node-type="moreList"] { display: block !important; height: auto !important; }');
  },
}).addto(filter.groups.tool);

// 合并左右边栏
filter.items.tool.sidebar.merge_left_right = filter.item({
  'group': 'sidebar',
  'version': 35,
  'type': 'boolean',
  'key': 'weibo.tool.mergeColumns',
  'text': '{{mergeLeftRight}}',
  'ref': {
    'side': {
      'type': 'select',
      'select': [
        { 'value': 'left', 'text': '{{mergeLeftRightLeft}}' },
        { 'value': 'right', 'text': '{{mergeLeftRightRight}}' },
      ],
      'default': 'right',
    },
    'i': { 'type': 'sicon', 'icon': 'warn', 'text': '{{mergeLeftRightDesc}}' },
  },
  'ainit': function mergeLeftRight() {
    // 发现页面的逻辑不一样，做处理很麻烦，所以不做处理
    if (document.querySelector('.B_discover')) return;
    var main = document.body, side = this.ref.side.conf;
    var left = document.querySelector('.WB_main_l');
    if (!left) return setTimeout(mergeLeftRight.bind(this), 100);
    var left0 = util.dom.create(html.leftFake);
    left.parentNode.insertBefore(left0, left);
    left.parentNode.removeChild(left);
    var updateMainAttr = function (side) {
      if (side && main.getAttribute('yawf-merge-left') !== side) main.setAttribute('yawf-merge-left', side);
      if (!side && main.hasAttribute('yawf-merge-left')) main.removeAttribute('yawf-merge-left');
    };
    var positionLeft = function () {
      var ref = document.querySelector('#v6_pl_rightmod_myinfo');
      var right = document.querySelector('.WB_main_r');
      var leftn = document.querySelector('.WB_main_l');
      if (leftn && left !== leftn) { left = leftn; }
      if (ref) {
        if (ref.nextSibling !== left) {
          ref.parentNode.insertBefore(left, ref.nextSibling);
          updateMainAttr(side);
          fixStylish(true);
        }
      } else if (right) {
        if (right.firstChild !== left) {
          right.insertBefore(left, right.firstChild);
          updateMainAttr(side);
          fixStylish(true);
        }
      } else {
        if (left0.previousSibling !== left) {
          left0.parentNode.insertBefore(left, left0);
          updateMainAttr();
          fixStylish(false);
        }
      }
    };
    util.css.add(util.str.cmt(function () { /*!CSS
      [yawf-merge-left] .WB_frame .WB_main_l,
      [yawf-merge-left]:not([yawf-weibo-only]) .WB_frame .yawf-WB_left_nav, body[yawf-merge-left]:not([yawf-weibo-only]) .WB_frame .WB_left_nav { width: 229px; padding: 0; float: none; }
      [yawf-merge-left]:not([yawf-weibo-only]) .WB_frame { width: 840px !important; padding: 10px; background-position: -300px center; }
      [yawf-merge-left] .WB_frame .yawf-WB_left_nav .lev_line fieldset, body[yawf-merge-left] .WB_frame .WB_left_nav .lev_line fieldset { padding-left: 190px; }
      [yawf-merge-left] .WB_left_nav .lev a:hover, .WB_left_nav .lev_curr, .WB_left_nav .lev_curr:hover, .WB_left_nav .levmore .more { background: rgba(128, 128, 128, 0.1) !important; }
      [yawf-merge-left] .WB_left_nav .lev_Box, .WB_left_nav fieldset { border-color: rgba(128, 128, 128, 0.5) !important; }
      [yawf-merge-left] .WB_frame .WB_main_l #v6_pl_leftnav_msgbox.yawf-cardwrap h3 { padding: 0 16px; }
      [yawf-merge-left] a.W_gotop { margin-left: 430px; }
      [yawf-merge-left] .WB_webim_page #weibochat { position: static !important; }
      [yawf-merge-left] .WB_webim_page .webim_contacts_mod { position: static !important; max-height: calc(100vh - 410px); }
      [yawf-merge-left] .WB_webim_page .webim_contacts_bd { max-height: calc(100vh - 470px); }
      [yawf-merge-left] .webim_chat_window .WB_webim_page .webim_contacts_mod,
      [yawf-merge-left] .webim_chat_window .WB_webim_page .webim_contacts_bd { max-height: none; }
      [yawf-merge-left="left"] .WB_frame .WB_main_r { float: left; }
      [yawf-merge-left="left"] .WB_frame .WB_main_c { float: right; }

      @media screen and (max-width: 1006px) {
        body[yawf-merge-left]:not([yawf-weibo-only]) .W_main { width: 600px !important; }
        body[yawf-merge-left]:not([yawf-weibo-only]) .WB_frame { width: 600px !important; }
        body[yawf-merge-left] a.W_gotop { margin-left: 310px; }
        body[yawf-merge-left="left"] .WB_main .WB_main_c { float: none; }
        body[yawf-merge-left="left"] .W_fold { right: auto; left: 0; -webkit-transform: scaleX(-1); transform: scaleX(-1); }
        body[yawf-merge-left="left"] .W_fold.W_fold_out { left: 269px; }
        body[yawf-merge-left="left"] .WB_main_r { right: auto; left: 0px; -webkit-transform: translateX(-100%) translateZ(0px); transform: translateX(-100%) translateZ(0px); }
        body[yawf-merge-left="left"] .WB_main_r.W_fold_layer { left: 269px; }
        body[yawf-merge-left="left"] .WB_main_r { direction: rtl; }
        body[yawf-merge-left="left"] .WB_main_r .WB_cardwrap { direction: ltr; }
      }

      body[yawf-merge-left]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + 190px); }
      body[yawf-merge-left="left"]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% - 420px); }
      @media screen and (max-width:1006px) {
        body[yawf-merge-left]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + 70px); }
      }
    */ noop(); }));

    // following codes are copied and modified from weibo, some one else may hold copyright
    // codes modified from http://img.t.sinajs.cn/t6/style/css/module/combination/home_A.css begin
    util.css.add(util.str.cmt(function () { /*!CSS
      .yawf-WB_left_nav { width: 150px; }
      .yawf-WB_left_nav .lev_Box_noborder { border-bottom: none; }
      .yawf-WB_left_nav .lev_line {}
      .yawf-WB_left_nav .lev_line fieldset { display: block; height: 22px; padding: 0 0 0 120px; zoom: 1; clear: both; border-top-width: 1px; border-top-style: solid; }
      .yawf-WB_left_nav .lev_line legend { line-height: 22px; font-size: 14px; padding: 0 3px 0 4px; }
      .yawf-WB_left_nav .lev_line legend .ficon_setup:hover { text-shadow: 0px 0px 4px rgba(0, 0, 0, .4); }
      .yawf-WB_left_nav .lev_line_v2 fieldset { height: 11px; margin-top: 11px; }
      .yawf-WB_left_nav .lev_Box h3 { display: block; height: 34px; line-height: 34px; font-size: 14px; font-weight: bold; text-decoration: none; overflow: hidden; }
      .yawf-WB_left_nav .lev_Box h3.lev a { font-size: 14px; font-weight: bold; padding: 0 0 0 15px; height: 34px; line-height: 34px; }
      .yawf-WB_left_nav .lev_Box h3.lev a .pic { width: 18px; height: 18px; float: left; margin: 8px 5px 0 0; }
      .yawf-WB_left_nav .lev_Box h3.lev a .W_ficon { float: right; }
      .yawf-WB_left_nav .lev_Box h3.S_txt1 { padding: 0 0 0 15px; }
      .yawf-WB_left_nav .lev_Box h3 .ficon_add,
      .yawf-WB_left_nav .lev_Box h3 .ficon_setup { display: block; float: right; font-size: 14px; font-size: 12px\9; margin-right: 10px; }
      .yawf-WB_left_nav .lev_Box h3 .ficon_add:hover,
      .yawf-WB_left_nav .lev_Box h3 .ficon_setup:hover { text-shadow: 0px 0px 4px rgba(0, 0, 0, .4); }
      .yawf-WB_left_nav .lev a { display: block; height: 34px; line-height: 34px; font-size: 12px; padding: 0 0 0 13px; text-decoration: none; overflow: hidden; position: relative; }
      .yawf-WB_left_nav .lev .lev_curr .levtxt { font-weight: bold; }
      .yawf-WB_left_nav .lev .lev_curr .ficon_dot,
      .yawf-WB_left_nav .lev .lev_curr .ficon_friends,
      .yawf-WB_left_nav .lev .lev_curr .ficon_groupwb,
      .yawf-WB_left_nav .lev .lev_curr .ficon_p_interest,
      .yawf-WB_left_nav .lev .lev_curr .ficon_p_rmd,
      .yawf-WB_left_nav .lev .lev_curr .ficon_p_quietfollow { width: 12px; letter-spacing: 18px; text-indent: -30px; }
      .yawf-WB_left_nav .lev .lev_curr .ficon_dot:after,
      .yawf-WB_left_nav .lev .lev_curr .ficon_friends:after,
      .yawf-WB_left_nav .lev .lev_curr .ficon_groupwb:after,
      .yawf-WB_left_nav .lev .lev_curr .ficon_p_interest:after,
      .yawf-WB_left_nav .lev .lev_curr .ficon_p_rmd:after,
      .yawf-WB_left_nav .lev .lev_curr .ficon_p_quietfollow:after { content: "B"; }
      .yawf-WB_left_nav .lev .ficon_gotop { display: none; }
      .yawf-WB_left_nav .lev_gotop a:hover .ficon_gotop { display: block; }
      .yawf-WB_left_nav .lev_gotop a:hover .ficon_gotop:hover { text-shadow: 0px 0px 4px rgba(0, 0, 0, .4); }
      .yawf-WB_left_nav .lev .levtxt { display: inline-block; max-width: 82px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
      .yawf-WB_left_nav .lev .W_new_count { float: right; margin: 10px 10px 0 0; background: #ed741c; color: #fff; }
      .yawf-WB_left_nav .lev .W_new { float: right; margin: 12px 8px 0 0; }
      .yawf-WB_left_nav .lev .ico_block { float: left; width: 17px; text-align: center; margin: -1px 3px 0 0; }
      .yawf-WB_left_nav .lev .ico_block .pic { width: 16px; height: 16px; float: left; margin-top: 7px; }
      .yawf-WB_left_nav .lev .ficon_hot,
      .yawf-WB_left_nav .lev .ficon_video { margin: 0; line-height: 36px; line-height: 34px\9; font-size: 14px; }
      .yawf-WB_left_nav .levmore { display: block; height: 30px; line-height: 30px; text-align: center; }
      .yawf-WB_left_nav .levmore .more { position: relative; height: 14px; line-height: 14px; padding: 2px 6px; border-radius: 3px; text-decoration: none; zoom: 1; }
      .yawf-WB_left_nav .levmore .W_btn_b { margin: 8px 10px 8px 0; }
      .yawf-WB_left_nav .levmore .W_new { position: absolute; top: 0; right: -1px; }
      .yawf-WB_left_nav .UI_scrollView { position: relative; }
      .yawf-WB_left_nav .W_scroll_y { right: 0; }
    */ noop(); }));
    // codes modified from http://img.t.sinajs.cn/t6/style/css/module/combination/home_A.css end

    // 将左栏的样式改为卡片效果（或改回）
    // 由于左栏样式都加在 .WB_left_nav 上，所以使用 .yawf-WB_left_nav 来躲开这些样式
    // 但相关需要保留的样式，在上面重新添加
    var fixStylish = (function () {
      var r = false;
      // 左栏合并过去之后要改一下样式
      // 考虑到要能适应各种模板，所以就改得稍微有点过分
      // 比如说压根就么有 .WB_left_nav 这个属性了，免得颜色乱掉
      return function (onRight) {
        if (onRight == null) onRight = r; else r = onRight;
        var nav = left.querySelector('.WB_left_nav, .yawf-WB_left_nav');
        if (!nav) return;
        var className = onRight ? 'yawf-WB_left_nav WB_cardwrap S_bg2' : 'WB_left_nav';
        if (nav.className !== className) nav.className = className;
      };
    }());

    // 强制点击链接时刷新页面，以解决因暴力修改造成的问题
    var forceReflush = (function () {
      var l = null;
      return function () {
        if (l === left) return; else l = left;
        left.addEventListener('click', function (e) {
          var t = e.target; if (!util.dom.matches(t, 'a, a *')) return;
          while (t.tagName.toLowerCase() !== 'a') t = t.parentNode;
          var href = t.href; if (!href.match(/^(?:https?:)\/\//)) return;
          e.stopPropagation(); e.preventDefault();
          util.func.page(function (href) { location.assign(href); }, href);
        }, true);
      };
    }());

    var fleft = function fixMergeLeft() {
      positionLeft();
      fixStylish();
      forceReflush();
    };
    fleft();
    observer.dom.add(fleft);

  },
}).addto(filter.groups.tool);

// 统一个人主页、话题、单条微博页面的侧边栏在左侧或右侧
filter.items.tool.sidebar.chose_side = filter.item({
  'group': 'sidebar',
  'version': 147,
  'type': 'boolean',
  'key': 'weibo.tool.chose_side',
  'text': '{{choseSide}}',
  'ref': {
    'side': {
      'type': 'select',
      'select': [
        { 'value': 'left', 'text': '{{choseSideLeft}}' },
        { 'value': 'right', 'text': '{{choseSideRight}}' },
      ],
      'default': 'right',
    }
  },
  'ainit': function () {
    var side = this.ref.side.conf;
    observer.dom.add(function choseSideRunner() {
      var b, c, p;
      if (side === 'left') {
        b = document.querySelector('#plc_main>.WB_frame_c:first-child+.WB_frame_b:last-child'); if (!b) return;
        p = b.parentNode;
        p.insertBefore(b, p.firstChild);
      } else if (side === 'right') {
        c = document.querySelector('#plc_main>.WB_frame_b:first-child+.WB_frame_c:last-child'); if (!c) return;
        p = c.parentNode;
        for (b = p.firstChild; b.nodeType === Node.TEXT_NODE; b = b.nextSibling);
        p.appendChild(b);
      }
    });
  },
}).addto(filter.groups.tool);

// 将话题黑名单应用到右侧热门话题栏目
filter.items.tool.sidebar.filte_right_topic = filter.item({
  'group': 'sidebar',
  'version': 47,
  'type': 'boolean',
  'key': 'weibo.tool.filte_right_topic',
  'text': '{{filteRightTopic}}',
  'check': function (text) {
    // 按话题过滤
    var topicRule = filter.items.topic.topic.blacklist;
    var topics = topicRule.conf.concat(topicRule.extent);
    if (topics.indexOf(text) !== -1) return true;
    // 按话题正则式过滤
    var rtopicRule = filter.items.topic.rtopic.blacklist;
    var rtopics = rtopicRule.conf.concat(rtopicRule.extent);
    if (rtopics.some(function (r) { return !!text.match(r); })) return true;
    // 如果将话题视为微博内容，那么也要按照内容过滤
    if (filter.items.content.elements.topic.conf) {
      // 按关键词过滤
      var keywordRule = filter.items.content.keyword.blacklist;
      var keywords = keywordRule.conf.concat(keywordRule.extent);
      if (keywords.some(function (w) { return text.indexOf(w) !== -1; })) return true;
      // 按正则式过滤
      var regexpRule = filter.items.content.regexp.blacklist;
      var regexp = regexpRule.conf.concat(regexpRule.extent);
      if (regexp.some(function (r) { return !!text.match(r); })) return true;
    }
    return false;
  },
  'ainit': function () {
    util.css.add('.hot_topic li[yawf-rtopic="hidden"] { display: none !important; }');
    var check = this.check;
    observer.dom.add(function filteRightTopic() {
      var topics = Array.from(document.querySelectorAll('.hot_topic li:not([yawf-rtopic]) a[suda-uatrack*="hottopic_r"]'));
      topics.forEach(function (topic) {
        var text = topic.title.replace(/#/g, '');
        var li; for (li = topic; li.tagName.toLowerCase() !== 'li'; li = li.parentNode);
        if (check(text)) li.setAttribute('yawf-rtopic', 'hidden');
        else li.setAttribute('yawf-rtopic', 'show');
      });
    });
  },
}).addto(filter.groups.tool);

// 隐藏阅读量太少的热门话题
filter.items.tool.sidebar.filte_right_topic_count = filter.item({
  'group': 'sidebar',
  'version': 132,
  'type': 'boolean',
  'key': 'weibo.tool.filte_right_topic_count',
  'ref': {
    'number': {
      'type': 'range',
      'min': 10,
      'max': 1000,
      'step': 10,
      'default': 200,
    }
  },
  'text': '{{filteRightTopicCount}}',
  'ainit': function () {
    util.css.add('.hot_topic li[yawf-rtopic-count="hidden"], #topicAD { display: none !important; }');
    var that = this;
    observer.dom.add(function filteRightTopicCount() {
      var counts = Array.from(document.querySelectorAll('.hot_topic li:not([yawf-rtopic-count]) .total'));
      counts.forEach(function (count) {
        // 网站中数字由 xxx万 ， xx.x亿 的方式表示；且没有繁体或英文版本
        // 注意有时前面的数字会有小数点，所以要替换为 e4, e8 而非 0000, 00000000
        var number = Number(count.textContent.replace('万', 'e4').replace('亿', 'e8'));
        var li; for (li = count; li.tagName.toLowerCase() !== 'li'; li = li.parentNode);
        if (isNaN(number) || that.ref.number.conf * 1e4 > number) li.setAttribute('yawf-rtopic-count', 'hidden');
        else li.setAttribute('yawf-rtopic-count', 'show');
      });
    });
  },
}).addto(filter.groups.tool);

// 在右边栏显示白名单帐号的链接
filter.items.tool.sidebar.right_user_list = filter.item({
  'group': 'sidebar',
  'version': 267,
  'type': 'users',
  'complete': 'user',
  'key': 'weibo.tool.right_user_list',
  'text': '{{addRightUserList}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{addRightUserListDesc}}' } },
  'add': (function () {
    var last = null;
    return function (s) {
      if (s === last) return;
      var notice = filter.items.tool.sidebar.right_user_list_notice;
      if (notice.conf && this.conf.length >= 50) util.ui.alert('yawf-too-many-notice', {
        'title': util.str.fill('{{addRightUserListTooManyTitle}}'),
        'text': util.str.fill('{{addRightUserListTooMany}}'),
        'icon': 'warn'
      });
      return s;
    };
  }()),
  'shown': function (dom) {
    var icon = dom.querySelector('.yawf-configSIcon');
    var form = dom.querySelector('form');
    form.appendChild(icon);
  },
  'init': function () {
    var that = this;
    var users = that.conf;
    var notice = filter.items.tool.sidebar.right_user_list_notice;
    if (!users.length) return;

    // 首先我们构造出这个用户列表
    var userlist = util.dom.create('div', util.str.fill(html.rightUserList)).firstChild;
    var userlist_ul = userlist.querySelector('ul');
    var genli = function (data) {
      return util.dom.create('ul', util.str.fill(html.rightUserListItem, data)).firstChild;
    };
    users.forEach(function (user) {
      var li = genli({ 'id': user, 'name': '', 'avatar': '' });
      userlist_ul.appendChild(li);
      network.account.id(user, function (info) {
        var new_li = genli(info);
        userlist_ul.replaceChild(new_li, li);
      }, function () {
        userlist_ul.removeChild(li);
      });
    });
    util.css.add('#yawf-rightmod_userlist .W_fb { display: inline-block; margin-right: -10px; width: 100%; }');

    // 设置按钮
    var setting = userlist.querySelector('.opt_box a');
    setting.addEventListener('click', function () {
      util.ui.dialog('yawf-fave-people-config', util.str.fill('{{addRightUserListConfigTitle}}'), function (inner) {
        var body = util.dom.create(html.rightUserListConfig);
        inner.appendChild(body);
        filter.collection.item.list(function (item) { return item === that || item === notice; }).show(body);
      }).show();
    });

    // 然后我们把用户列表塞到右栏去
    // 位置在用户信息框下面其他东西上面，如果合并边栏，那么还在左栏下面
    var addRightUserList = function addRightUserList() {
      var ref = document.querySelector('.WB_main_r .WB_main_l') || document.querySelector('#v6_pl_rightmod_myinfo');
      var right = document.querySelector('.WB_main_r');
      if (!util.page.home() || !document.body.classList.contains('FRAME_main')) ref = right = null;
      if (ref) {
        if (ref.nextSibling !== userlist) ref.parentElement.insertBefore(userlist, ref.nextSibling);
      } else if (right) {
        if (right.firstChild !== userlist) right.insertBefore(userlist, right.firstChild);
      } else {
        if (userlist.parentNode) userlist.parentNode.removeChild(userlist);
      }
    };
    addRightUserList();
    observer.dom.add(addRightUserList);
  }
}).addto(filter.groups.tool);

// 检查这些帐号发的微博是不是看得到的功能
filter.items.tool.sidebar.right_user_list_notice = filter.item({
  'group': 'sidebar',
  'version': 267,
  'type': 'boolean',
  'key': 'weibo.tool.right_user_list_notice',
  'text': '{{addRightUserListNotice}}',
  'ref': {
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{addRightUserListNoticeDesc}}' },
    '_records': { 'type': 'noui', 'default': [] },
    '_last': { 'type': 'noui', 'default': {} },
  },
  'ainit': function () {
    var that = this;
    var list = filter.items.tool.sidebar.right_user_list;
    var users = list.conf.slice(0, 50);

    // 每个人个人主页上最新的微博是哪几条
    var recents = {};
    var checkrec = function checkrec(uid) {
      network.recent(uid, function (mids) {
        if (!mids || !mids.length) return;
        if (mids[0] < mids[1]) mids.shift();
        recents[uid] = mids;
        updateDot(uid);
      });
      setTimeout(checkrec, Math.round(15e5 + 5e5 * Math.random()), uid);
    };
    // 找到对应每个用户的项目
    var lis = {};
    observer.dom.add(function noticeUserChecker() {
      var users = Array.from(document.querySelectorAll('#yawf-rightmod_userlist li:not([yawf-noticeuser])'));
      users.forEach(function (li) {
        li.setAttribute('yawf-noticeuser', '');
        var uid = util.str.parsequery(li.querySelector('a[usercard^="id="]').getAttribute('usercard')).id;
        if (!lis[uid]) checkrec(uid); lis[uid] = li;
        if (users.indexOf(uid) === -1) return;
        util.debug('check user %o', uid);
      });
    });
    // 比较两个 mid 谁更大
    var idCmp = function (a, b) {
      if (a.length !== b.length) return a.length - b.length;
      return a > b ? 1 : a === b ? 0 : -1;
    };
    // 检查特定的 mid 是否“应当”出现在给定的 mid 数组中，但未出现
    var midNotice = function (mid, uid) {
      if (range.length < 8) return false;
      if (range.indexOf(mid) !== -1) return false;
      if (idCmp(range[0], mid) > 0) return false;
      if (idCmp(range[range.length - 1], mid) < 0) return false;
      if (idCmp(last[uid] || "", mid) >= 0) return false;
      return true;
    };
    // 检查是不是有人有微博应当出现没出现
    var updateDot = function (uid) {
      var notices = (recents[uid] || []).filter(function (mid) { return midNotice(mid, uid); });
      if (notices.length === 0) return;
      var dot = lis[uid].querySelector('.W_new');
      if (notices.length) {
        if (dot.style.display === 'inline-block') return;
        dot.style.display = 'inline-block';
        util.debug("weibo %o by %o not shown (last = %o)", notices, uid, last[uid]);
      } else {
        if (dot.style.display === 'none') return;
        dot.style.display = 'none';
      }
    };
    var updateAll = (function () {
      var busy = false;
      return function updateRightUserListDot() {
        if (busy) return; busy = true;
        util.func.call(function () {
          busy = false;
          users.forEach(updateDot);
        });
      };
    }());

    // 记录首页上我都看过哪些微博
    var range = [];
    (function () {
      range = Array.from(that.ref._records.getconf() || []);
      observer.weibo.onload(function (feed) {
        // 这个规则只在首页上适用
        if (!util.page.home() || !document.body.classList.contains('FRAME_main')) return [];
        if (feed.getAttribute('feedtype') === 'ad') return;
        var mid = feed.getAttribute('mid'); if (!mid) return;
        range = Array.from(that.ref._records.getconf() || []);
        if (range.indexOf(mid) !== -1) return;
        range.push(mid); range = range.sort(idCmp);
        that.ref._records.putconf(range.slice(Math.max(range.length - 500, 0)));
        updateAll();
      });
    }());

    // 我们在一个人的个人主页上看到了哪条微博
    // 如果已经在个人主页上看过了那么一样不应该有小红点
    var last = (function () {
      var last = that.ref._last.getconf() || {};
      observer.weibo.onload(function (feed) {
        // 这个规则只在个人主页适用
        if (util.page.discovery || util.page.search) return;
        if (feed.getAttribute('feedtype') === 'ad') return;
        var mid = feed.getAttribute('mid'); if (!mid) return;
        var uid = weibo.feed.author.id(feed); if (uid) return;
        uid = util.info.oid(); if (!uid) return;
        if (list.conf.indexOf(uid) === -1) return;
        if (last[uid] && idCmp(last[uid], mid) >= 0) return;
        last = that.ref._last.getconf();
        last[uid] = mid;
        that.ref._last.putconf(last);
      });
      return last;
    }());

  },
}).addto(filter.groups.tool);


// 浮动元素
filter.predef.subtitle('tool', 'fixed', '{{fixedItemsTitle}}');

// 导航栏自动隐藏
filter.items.tool.fixed.hide_nav_bar = filter.item({
  'group': 'fixed',
  'version': 302,
  'type': 'boolean',
  'key': 'weibo.tool.hide_nav_bar',
  'text': '{{floatNav}}',
  'ainit': function () {
    var attr = 'yawf-float';
    var updateNavFloat = function () {
      var nav = document.querySelector('.WB_global_nav'); if (!nav) return;
      var y = window.scrollY, f = nav.hasAttribute(attr), r = 42;
      if (y < r && f) nav.removeAttribute(attr);
      if (y >= r && !f) nav.setAttribute(attr, '');
    };
    document.addEventListener('scroll', updateNavFloat);
    updateNavFloat();
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      .WB_global_nav { margin-top: -50px; top: 50px; box-shadow: none; }
      .WB_global_nav[{{attr}}] { top: 0; transition: top ease-in-out 0.1s 0.33s; }
      .WB_global_nav[{{attr}}]:hover { top: 50px; transition: top ease-in-out 0.1s 0s; }
      .WB_global_nav[{{attr}}]::after { content: " "; width: 100%; height: 8px; clear: both; float: left; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 75%, transparent 100%); }
      // 固定小黄签位置
      .WB_global_nav[{{attr}}] .gn_topmenulist_tips { padding-top: 52px; transition: padding-top ease-in-out 0.1s 0.33s; }
      .WB_global_nav[{{attr}}]:hover .gn_topmenulist_tips { padding-top: 2px; transition: padding-top ease-in-out 0.1s 0s; }
      .WB_global_nav[{{attr}}] .gn_topmenulist_tips .ficon_close { top: 56px; transition: top ease-in-out 0.1s 0.33s; }
      .WB_global_nav[{{attr}}]:hover .gn_topmenulist_tips .ficon_close { top: 6px; transition: top ease-in-out 0.1s 0s; }
    */ noop(); }).replace(/\/\/.*\n/g, '\n'), { 'attr': attr }));
  },
}).addto(filter.groups.tool);

// 左边栏浮动
filter.items.tool.fixed.fixed_left = filter.item({
  'group': 'fixed',
  'version': 160,
  'type': 'boolean',
  'key': 'weibo.tool.fixedLeft',
  'text': '{{fixedLeft}}',
  'default': true,
  'ainit': function () {
    // 禁用左栏浮动的相关代码在 fixed_right 那边可以找到
    // 如果合并了边栏，那么会因为禁用右栏浮动而同时禁用在右栏里面的左栏
    // 这时候左栏如果还要浮动，那么就要重新让他动起来
    // 这里的程序是为了让左栏再动起来的
    if (!filter.items.tool.sidebar.merge_left_right.conf) return;
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_main_r .WB_main_l { will-change: scroll-position; }
      .WB_main_r[yawf-fixed] .WB_main_l { position: fixed; top: 60px !important; overflow: hidden; height: auto !important; width: 150px; }
      body[yawf-merge-left] .WB_main_r[yawf-fixed] .WB_main_l { width: 229px; }
    */ noop(); }));
    if (filter.items.tool.fixed.hide_nav_bar.conf) {
        util.css.add('.WB_main_r[yawf-fixed] .WB_main_l { top: 10px !important; }');
    }

    // 当左侧不够长时，需要滚动条，更新滚动条的状态
    var updateScroll = function () {
      util.func.page(function () {
        window.$YAWF$ = window.$YAWF$ || {};
        if (!$YAWF$.updateLeftScroll) $YAWF$.updateLeftScroll = (function () {
          var y = STK.sizzle('[node-type="leftnav_scroll"]')[0];
          var g = STK.ui.scrollView(y);
          return function () { g.reset(); };
        }());
        $YAWF$.updateLeftScroll();
      });
    };

    // 限制左栏最大高度，避免超出中间区域
    var updateMaxHeight = function (left, maxHeight) {
      var none = maxHeight == null;
      var text = none ? 'none' : maxHeight + 'px';
      var srl = left.querySelector('[node-type="leftnav_scroll"]');
      if (!srl) return;
      if ((left.style.maxHeight || 'none') !== text) {
        left.style.maxHeight = text;
        if (none) srl.setAttribute('style', '');
        else {
          var lev = Array.from(srl.querySelectorAll('.lev_Box'));
          var ch = lev.map(function (lb) { return lb.clientHeight; }).reduce(function (x, y) { return x + y; });
          var height = Math.min(maxHeight - srl.offsetTop, ch) + 'px';
          if (srl.style.height !== height) {
            srl.style.height = height;
            srl.style.position = 'relative';
            if (srl) updateScroll();
          }
        }
      }
    };

    // 每当滚动滚动条或调整窗口大小时，更新左栏状态
    var floating = false;
    var updatePosition = function updateLeftPosition() {
      var left = document.querySelector('.yawf-WB_left_nav');
      var reference = document.querySelector('.WB_main_r');
      var container = document.querySelector('#plc_main');
      if (!left || !reference) return;
      var refc = reference.getClientRects();
      if (!refc || !refc[0]) return;
      var pos = refc[0];
      if (!floating) {
        if (pos.bottom < -60) {
          floating = true;
          reference.setAttribute('yawf-fixed', '');
        }
      } else {
        if (pos.bottom + left.clientHeight > 60) {
          floating = false;
          reference.removeAttribute('yawf-fixed');
        }
      }
      if (floating) {
        var cip = container.getClientRects()[0];
        var fip = left.getClientRects()[0];
        var no_space = filter.items.style.sweibo.no_weibo_space.conf;
        var maxHeightBottom = cip.bottom - fip.top + (no_space ? 0 : -10);
        var maxHeight = Math.max(Math.min(maxHeightBottom, window.innerHeight - 80), 0);
        if (cip && fip) updateMaxHeight(left, maxHeight);
      } else { updateMaxHeight(left); }
    };

    document.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    observer.dom.add(updatePosition);
    updatePosition();
  },
}).addto(filter.groups.tool);

// 右边栏浮动
filter.items.tool.fixed.fixed_right = filter.item({
  'group': 'fixed',
  'version': 160,
  'type': 'boolean',
  'key': 'weibo.tool.fixedRight',
  'text': '{{fixedRight}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{fixedRightDesc}}' } },
  'default': true,
  'init': function () {
    var merge = filter.items.tool.sidebar.merge_left_right.conf;
    var fleft = filter.items.tool.fixed.fixed_left.conf;
    var fright = filter.items.tool.fixed.fixed_right.conf && !(merge && fleft);
    var fother = filter.items.tool.fixed.fixed_others.conf;
    var itemAttrs = ['fixed-item', 'fixed-box'];
    var containerAttrs = ['fixed-inbox', 'fixed-id'];
    var withIn = [];
    var queryString = function (classNames, attributes) {
      return classNames.map(function (className) {
        return attributes.map(function (attribute) {
          return className + ' [' + attribute + ']';
        }).join(',');
      }).join(',');
    };
    if (!fright) withIn.push('.WB_main_r');
    if (!fleft) withIn.push('.WB_main_l');
    if (!fother) { withIn.push('.WB_frame_b', '.WB_frame_c'); }
    if (withIn.length === 0) return;
    var removeFixed = function removeRightFixed() {
      var itemQuery = queryString(withIn, itemAttrs);
      var items = Array.from(document.querySelectorAll(itemQuery));
      items.forEach(function (fixed) {
        var x = fixed.cloneNode(true);
        itemAttrs.forEach(function (attr) { x.removeAttribute(attr); });
        fixed.parentNode.replaceChild(x, fixed);
      });
      var containerQuery = queryString(withIn, containerAttrs);
      var containers = Array.from(document.querySelectorAll(containerQuery));
      containers.forEach(function (container) {
        var x = container.cloneNode(true);
        containerAttrs.forEach(function (attr) { x.removeAttribute(attr); });
        var parent = container.parentNode;
        var prev = parent.previousElementSibling;
        var hadWraped = parent.style.willChange && prev && prev.innerHTML === '';
        var replaceTarget = hadWraped ? parent : container;
        if (hadWraped) prev.parentNode.removeChild(prev);
        replaceTarget.parentNode.replaceChild(x, replaceTarget);
      });
    };
    removeFixed();
    observer.dom.add(removeFixed);
  },
}).addto(filter.groups.tool);

// 新微博提示浮动
filter.items.tool.fixed.fixed_new_feed_tip = filter.item({
  'group': 'fixed',
  'version': 183,
  'type': 'boolean',
  'key': 'weibo.tool.fixedNewFeedTip',
  'text': '{{fixedNewFeedTip}}',
  'ainit': function () {
    var updatePosition = function updateNewFeedTipPosition() {
      var tip = document.querySelector('#home_new_feed_tip, [yawf-id="home_new_feed_tip"]'); if (!tip) return;
      var feeds = document.querySelector('.WB_feed');
      var pos = null, fixed = false;
      try { pos = feeds.getClientRects()[0].top; } catch (e) { return; }
      var reading = document.body.hasAttribute('yawf-weibo-only');
      fixed = pos < (reading ? 35 : 90);
      if (tip.hasAttribute('yawf-fixed') == fixed) return;
      if (fixed) tip.setAttribute('yawf-fixed', '');
      else tip.removeAttribute('yawf-fixed');
    };
    updatePosition();
    document.addEventListener('scroll', updatePosition);
    observer.dom.add(updatePosition);
    util.css.add(util.str.cmt(function () { /*!CSS
      [yawf-id="home_new_feed_tip"][yawf-fixed], #home_new_feed_tip[yawf-fixed] { display: block; position: fixed; top: 66px; width: 600px; padding-top: 0; z-index: 9998; }
      [yawf-id="home_new_feed_tip"][yawf-fixed] + .WB_feed, #home_new_feed_tip[yawf-fixed] + .WB_feed { margin-top: 40px; }
    */ noop(); }));
  }
}).addto(filter.groups.tool);

filter.items.tool.fixed.fixed_others = filter.item({
  'group': 'fixed',
  'version': 160,
  'type': 'boolean',
  'key': 'weibo.tool.fixedOthers',
  'text': '{{fixedOthers}}',
  'default': true,
}).addto(filter.groups.tool);

// 微博相关工具
filter.predef.subtitle('tool', 'weibotool', '{{weiboToolsTitle}}');

// 自动展开字数不多的微博
filter.items.tool.weibotool.auto_unfold_weibo = filter.item({
  'group': 'weibotool',
  'version': 320,
  'type': 'boolean',
  'key': 'weibo.tool.auto_unfold_weibo',
  'text': '{{unfoldLongWeibo}}',
  'ref': {
    'count': { 'type': 'range', 'min': 140, 'max': 2000, 'step': 10, 'default': 200 },
    'br': { 'type': 'range', 'min': 1, 'max': 60, 'step': 1, 'default': 30 },
  },
  'init': function () {
    // 给已经展开过的（或试图展开过的）微博标记
    var markUnfolded = function (feed) {
      feed.setAttribute('yawf-unfoldlong', '');
    };
    // 如果设置不允许脚本展开，那么就直接打上标记然后结束
    if (!this.conf) {
      observer.weibo.onload(function (feed) { markUnfolded(feed); });
      return;
    }
    var count = this.ref.count.conf, br = this.ref.br.conf;
    network.weibo.longtext.setMaxLength(count, br);
    // 因为我们修改了微博的内容，所以需要标记微博为尚未过滤过，重新进行过滤
    var resetWeibo = function (feed) {
      markUnfolded(feed);
      var placeholder = util.dom.create('div', ''), parent = feed.parentNode;
      parent.replaceChild(placeholder, feed);
      feed.removeAttribute('yawf-display');
      feed.removeAttribute('yawf-weibo'); // FIXME 这样会让过滤器重新走，但是也会让无关的东西走两遍
      parent.replaceChild(feed, placeholder);
    };
    // 每条微博在过滤后再扩展全文，寄希望于可以预先隐藏掉一些
    observer.weibo.after(function (feed) {
      if (feed.hasAttribute('yawf-unfoldlong')) return;
      var running = 0;
      var unfold = Array.from(feed.querySelectorAll('[action-type="fl_unfold"]'));
      unfold.forEach(function (button) {
        var mid = util.str.parsequery(button.getAttribute('action-data')).mid;
        running++;
        network.weibo.longtext(mid, function (data) {
          if (!data) return; // 获取失败
          if (typeof data === 'string') { // data: 内容
            button.parentNode.innerHTML = data;
          } else if (data / 100) { // data: 长度
            button.firstChild.textContent += util.str.fill('{{{unfoldWeiboLength}}}',
              { 'length': data > 1000 ? Math.round(data / 100) + '00' : Math.round(data / 10) + '0' });
          }
          if (--running === 0) resetWeibo(feed);
        });
      });
    });
  },
}).addto(filter.groups.tool);

// 清除发布框中的默认话题 (wcf)
filter.items.tool.weibotool.clear_def_topic = filter.item({
  'group': 'weibotool',
  'version': 36,
  'type': 'boolean',
  'key': 'weibo.tool.clear_def_topic',
  'text': '{{clearDefTopicDesc}}',
  'ainit': function () {
    var clearDefTopic = function clearDefaultTopic() {
      var inputBox = document.querySelector('#v6_pl_content_publishertop .send_weibo .input textarea');
      if (inputBox && inputBox.hasAttribute('hottopic')) {
        inputBox.removeAttribute('hottopic'); inputBox.removeAttribute('hottopicid');
        inputBox.value = 'DUMMY'; inputBox.focus();
        inputBox.value = ''; inputBox.blur();
      }
    };
    observer.dom.add(clearDefTopic);
  },
}).addto(filter.groups.tool);

// 个人主页默认显示全部微博
filter.items.tool.weibotool.redirect_weibo = filter.item({
  'group': 'weibotool',
  'version': 301,
  'type': 'boolean',
  'key': 'weibo.tool.redirectWeibo',
  'text': '{{personalRedirectWeibo}}',
  'ainit': function () {
    // 遇见显示的是热门的，自动跳转到全部去
    var updateLocation = function redirectPersionalWeiboRedirect() {
      var profileNav = document.querySelector('[id^="Pl_Official_ProfileFeedNav"]');
      if (!profileNav) return;
      var hotButton = profileNav.querySelector('li[action-type="search_type"][action-data*="is_hot=1"]:not([action-data*="yawf_notall=1"])');
      if (hotButton) hotButton.setAttribute('action-data', hotButton.getAttribute('action-data') + '&yawf_notall=1');
      if (location.search.indexOf('is_hot=1') !== -1 && location.search.indexOf('yawf_notall=1') === -1) {
        var all = profileNav.querySelector('li[action-type="search_type"][action-data*="is_all=1"]');
        var a = util.dom.create('a', ''); a.href = location.href; a.search = all.getAttribute('action-data'); a.hash = '#_0';
        history.pushState('YAWF_' + new Date().getTime() + '_' + (Math.random() + '').slice(2), null, a.href);
        all.click();
      }
    };
    observer.dom.add(updateLocation);
    // 把指向用户主页的链接都加一个 is_all 属性，点过去就可以省去一次跳转
    var updateUserLinksWithIsAll = function updateUserLinksWithIsAll() {
      var links = Array.from(document.querySelectorAll([
        'a[usercard]', // 一般的用户链接
        '.WB_face a', // 微博用户头像（usercard加在链接里面的图片上了）
        '.pic_box a[suda-uatrack*="user_pic"]', // 单条微博上方的用户
        '.WB_artical .main_editor .authorinfo a', // 头条文章的作者信息
        '.webim_chat_window .chat_title a[node-type="_chatUserName"]', // 聊天窗口上的用户名
      ].map(function (x) { return x + '[href]:not([href*="is_all"])'; }).join(',')));
      links.forEach(function (l) {
        var s = util.str.parsequery(l.search.slice(1));
        s.is_all = '1';
        l.search = util.str.toquery(s);
      });
    };
    observer.dom.add(updateUserLinksWithIsAll);
  },
}).addto(filter.groups.tool);

// 分组浏览时默认发布方式为公开
filter.items.tool.weibotool.public_by_default = filter.item({
  'group': 'weibotool',
  'version': 74,
  'type': 'boolean',
  'key': 'weibo.tool.public_by_default',
  'text': '{{publishToPublicDefault}}',
  'ainit': function () {
    observer.dom.add(function publishToPublicDefault() {
      var publish = document.querySelector('a[action-type="showPublishTo"]:not([yawf-publish])');
      if (!publish) return; publish.setAttribute('yawf-publish', 'yawf-publish');
      var text = publish.querySelector('[node-type="publishTotext"]');
      publish.setAttribute('action-data', 'rank=0');
      text.textContent = util.str.fill('{{publishToPublicText}}');
    });
  },
}).addto(filter.groups.tool);

// 使用卡片按钮替换对应链接
filter.items.tool.weibotool.card_button = filter.item({
  'group': 'weibotool',
  'version': 182,
  'type': 'boolean',
  'key': 'weibo.tool.cardButton',
  'text': '{{cardButton}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{cardButtonDesc}}' } },
  'ainit': function () {
    var fixed = [];
    var keyvals = function (s) {
      return s.filter(function (x) { return !x.match(/^click_/); });
    };
    var subset = function (x, y) {
      return x.every(function (i) { return y.indexOf(i) !== -1; });
    };
    var fixButton = function (feed) {
      if (fixed.indexOf(feed) !== -1) return; fixed.push(feed);
      var links = Array.from(feed.querySelectorAll('[action-type="feed_list_url"]'));
      var buttons = Array.from(feed.querySelectorAll('.media_box [exp-data*="key=tblog_weibocard"] .W_fr .W_btn_a'));
      var ttarticles = Array.from(feed.querySelectorAll('.media_box [action-type="widget_articleLayer"]'));
      // 每个链接，检查是否有对应的按钮
      links.forEach(function (link) {
        var lattr = function (o) { return o.getAttribute('suda-uatrack') || ''; };
        var battr = function (o) { return o.getAttribute('action-data') || ''; };
        var tattr = function (o) { return o.getAttribute('suda-uatrack') || ''; };
        var info = lattr(link); if (!info) return;
        info = util.str.parsequery(info);
        var infoval = keyvals(info.value.split(':'));
        // 检查一个能点击的东西是不是对应这个链接
        var validTarget = function (arg) {
          if (!arg || !arg.value) return false;
          var values = keyvals(arg.value.split(':'));
          // 要求 key 一样
          if (arg.key !== info.key) return false;
          // 而且所有 value 也对应
          return subset(infoval, values) || subset(values, infoval);
        };
        // 检查每个按钮是否与他对应
        var button = buttons.filter(function (button) {
          var arg = util.str.parsequery(battr(button)) || {};
          return validTarget(arg);
        })[0];
        var ttarticle = ttarticles.filter(function (ttarticle) {
          var arg = util.str.parsequery(tattr(ttarticle)) || {};
          return validTarget(arg);
        })[0];
        var target = button || ttarticle || null;
        util.debug('link %o -> target %o', link, target);
        if (!target) return;
        link.addEventListener('click', function (e) {
          e.stopPropagation(); e.preventDefault();
          target.click();
        });
        var text = target === button ? button.textContent : null;
        if (text) link.insertBefore(document.createTextNode('[' + text + ']'), link.querySelector('.W_ficon').nextSibling);
      });
    };
    observer.weibo.after(fixButton);
  },
}).addto(filter.groups.tool);

// 查看大图旁添加查看原图链接
filter.items.tool.weibotool.view_original = filter.item({
  'group': 'mediatool',
  'version': 357,
  'type': 'boolean',
  'key': 'weibo.tool.viewOriginal',
  'text': '{{viewOriginal}}',
  'ref': {
    'open': {
      'type': 'select',
      'default': 'page',
      'select': [
        { 'value': 'page', 'text': '{{viewOriginalPage}}' },
        { 'value': 'image', 'text': '{{viewOriginalImage}}' },
      ],
    },
    'direct': { 'type': 'boolean' },
  },
  'ainit': function () {
    var openPage = this.ref.open.conf === 'page';
    // chrome 不能处理带 hash 的 data uri
    // https://bugs.chromium.org/p/chromium/issues/detail?id=123004
    // chrome (60+) 的 data uri 网页不能改 hash
    // https://bugs.chromium.org/p/chromium/issues/detail?id=594215
    var imgPage = util.str.cmt(function () { /*!HTML
      <!DOCTYPE html>
      <html>
      <head><meta charset="UTF-8" /><title>{{viewOriginalTitle}}</title><style>
        body, #chose { background: #222; }
        body, body * { -moz-user-select: none; -webkit-user-select: none; user-select: none; margin: 0; padding: 0; }
        #viewer { background: hsl(0, 0%, 90%); }
        .normal #viewer { width: auto; height: auto; cursor: auto; }
        .over #viewer.large { width: auto; height: auto; cursor: zoom-out; }
        .over #viewer.fit { max-width: 100vw; max-height: calc(100% - 20px); cursor: zoom-in; }
        #container { top: 0; overflow: auto; width: 100vw; height: calc(100vh - 101px); }
        #container.left, #container.left #viewer { cursor: url("https://img.t.sinajs.cn/t6/style/images/common/pic_prev.cur"), auto; }
        #container.right, #container.right #viewer { cursor: url("https://img.t.sinajs.cn/t6/style/images/common/pic_next.cur"), auto; }
        .single #container, .single #imgarea { height: 100vh; }
        #imgarea { display: table-cell; position: relative; vertical-align: middle; text-align: center; width: 100vw; height: calc(100vh - 101px); }
        #chose { position: fixed; clear: both; width: 100%; bottom: 0; height: 100px; overflow: auto; overflow-x: hidden; border-top: 1px solid #aaa; }
        .single #chose { display: none; }
        #chose a { display: block; height: 80px; text-align: center; width: 80px; float: left; margin: 10px; }
        #chose a:target { outline: 2px solid red; }
        #chose img { max-height: 80px; max-width: 80px; }
        @-moz-document url-prefix() {
          body { background-image: url("chrome://global/skin/media/imagedoc-darknoise.png");  }
          #viewer { background: hsl(0, 0%, 90%) url("chrome://global/skin/media/imagedoc-lightnoise.png") repeat scroll 0 0; }
        }
      </style><script>
        var info = {{info}};
        var url = function (filename, large) {
          return info.protocol + '//' + info.host + '/' + (large ? 'large' : 'square') + '/' + filename;
        };
      </script></head>
      <body><div id="container"><div id="imgarea"><img id="viewer" class="large" /></div></div><div id="chose"><script>
        info.filenames.forEach(function (filename, i) {
          document.write('<a onclick="return goto(this.id) && false" href="#' + i + '" id="' + i + '"><img src="' + url(filename, false) + '"></a>');
        });
      </script></div><script>
        function resize() {
          var width = viewer.naturalWidth;
          var height = viewer.naturalHeight;
          if (width > container.clientWidth || height > container.clientHeight) imgarea.className = 'over';
          else imgarea.className = 'normal';
        }
        function checkHash(n) {
          if (location.protocol !== 'data:') return true;
          var hash = '#' + n, href = location.href;
          try { location.hash = hash; } catch (_ignore) {}
          if (top !== self) return true;
          if (location.hash === hash) return true;
          var iframe = document.createElement('iframe');
          iframe.src = href.replace(/#.*$/, '');
          iframe.style = 'position: absolute; top: 0; bottom: 0; left: 0; right: 0; width: 100%; height: 100%; padding: 0; margin: 0; border: 0;';
          document.body.innerHTML = '';
          document.body.appendChild(iframe);
          return false;
        }
        function readHash() {
          var hashVal = Number(location.hash.slice(1)) || 0;
          var count = info.filenames.length;
          hashVal = ((parseInt(hashVal, 10) % count) + count) % count;
          if ('#' + hashVal !== location.hash) goto(hashVal);
          return hashVal;
        }
        function show() {
          current = readHash();
          viewer.src = '';
          viewer.src = url(info.filenames[current], true);
          container.scrollTop = 0;
          container.scrollLeft = 0;
        }
        function focus() { container.focus(); }
        if (info.filenames.length === 1) document.body.className = 'single';
        function prevImg() { goto(Number(location.hash.slice(1)) - 1); }
        function nextImg() { goto(Number(location.hash.slice(1)) + 1); }
        function goto(n) { location.hash = '#' + n; }
        function checkLR(x) {
          if (info.filenames.length === 1) return 'mid';
          var pos = 'mid', w = container.clientWidth;
          if (x < 100 && x < w * 0.2) pos = 'left';
          if (x > w - 100 && x > w * 0.8) pos = 'right';
          if (container.className !== pos) container.className = pos;
          return pos;
        }
        function addEvents() {
          viewer.onload = function () { setTimeout(resize, 0); };
          imgarea.onmousemove = function (e) { checkLR(e.clientX); };
          imgarea.addEventListener('click', function (e) {
            var pos = checkLR(e.clientX);
            if (pos === 'left') prevImg(); else if (pos === 'right') nextImg(); else return true;
            e.stopPropagation();
          }, true);
          viewer.addEventListener('click', function () {
            if (imgarea.className === 'normal') return;
            if (viewer.className === 'large') viewer.className = 'fit';
            else viewer.className = 'large';
          });
          window.onresize = resize;
          window.onkeydown = function (e) {
            var key = e.keyCode, n = key & 15;
            if (key === 33) prevImg(); else if (key === 34) nextImg();
            if ([48, 96].indexOf(key & -16) !== -1) {
              if (n > 0 && n <= info.filenames.length) goto(n - 1);
            }
          };
          window.onhashchange = show;
          window.onload = function () {
            show();
            focus();
          };
          container.onblur = function () { setTimeout(focus, 0); };
        }
        if (checkHash(info.current)) addEvents();
      </script></body>
      </html>
    */ noop(); }).split('\n').map(function (x) { return x.trim(); }).join('\n');
    // 获取图片信息
    var getImgFilename = function (url) { return url.match(/\/([^\/]*)$/)[1]; };
    var imageUrl = function (info, single) {
      if (typeof info === 'string') info = { 'host': util.str.host(info), 'filename': [getImgFilename(info)], 'current': 0, 'protocol': location.protocol };
      if (openPage && !single) {
        var content = util.str.fill(imgPage, { 'info': JSON.stringify(info) });
        return {
          url: 'data:text/html;charset=utf-8;base64,' + util.str.base64(content),
          content: content,
        };
      };
      return {
        url: location.protocol + '//' + info.host + '/large/' + info.filenames[info.current],
        content: null
      };
    };
    var tabCreate = function (page) {
      var isFirefox = !!util.browser.fx.version;
      var isGM3OrOlder = GM_info && !('scriptHandler' in GM_info) && parseInt(GM_info.version) < 4;
      var isFirefoxWebExtension = isFirefox && !isGM3OrOlder;
      if (!page.content || !isFirefoxWebExtension) {
        GM_openInTab(page.url, false);
        return;
      }
      // FIXME 这都在干嘛
      var tempPage = window.open('about:blank');
      tempPage.document.open();
      tempPage.document.write(page.content);
      tempPage.document.close();
      tempPage.location.replace(page.url);
    };
    var getImages = function (ref) {
      var container = ref; while (!util.dom.matches(container, '.WB_expand_media')) container = container.parentNode;
      var imgs = Array.from(container.querySelectorAll('.choose_box img'));
      if (!imgs.length) imgs = [container.querySelector('.artwork_box img')];
      return imgs.map(function (img) { return img.src; });
    };
    var genInfo = function (imgs) {
      return {
        'host': util.str.host(imgs[0]),
        'filenames': imgs.map(function (img) { return img.match(/\/([^\/]*)$/)[1]; })
      };
    };
    var getPid = function (a) {
      try {
        var action_data = util.str.parsequery(a.getAttribute('action-data'));
        return action_data.pid || action_data.pic_id || null;
      } catch (e) { return null; }
    };
    // 添加查看原图的链接
    var addLink = function (ref) {
      var vol = util.dom.create('ul', util.str.fill(html.viewOriginalLink));
      var link = vol.querySelector('a');
      for (; ref.tagName.toLocaleLowerCase() !== 'li'; ref = ref.parentNode);
      while (vol.firstChild) ref.parentNode.insertBefore(vol.firstChild, ref);
      return link;
    };
    var pageHandler = (function () {
      try { return new WeakMap(); } catch (e) {}
      // 这样理论上会有内存泄露，不过老浏览器随他去吧
      var map = [], count = 0;
      return {
        set: function (link, page) {
          var index = link.getAttribute('yawf-view-ori-index');
          if (!index) link.setAttribute('yawf-view-ori-index', (index = count++));
          map[index] = page;
        },
        get: function (link) {
          var index = link.getAttribute('yawf-view-ori-index');
          return index && map[index];
        },
        has: function (link) {
          return !!this.get(link);
        }
      };
    }());
    var addHandler = function (link, page) {
      pageHandler.set(link, page);
    };
    window.addEventListener('click', function (e) {
      if (e.button !== 0) return;
      var link = util.dom.closest(e.target, 'a');
      if (!link || !pageHandler.has(link)) return;
      var page = pageHandler.get(link);
      tabCreate(page);
      e.preventDefault();
      e.stopPropagation();
    }, true);
    var updateLink = function (link, info, ref) {
      var current = info.current || 0, pid = getPid(ref);
      if (pid) info.filenames.forEach(function (filename, i) { if (filename.indexOf(pid) === 0) current = i; });
      if (!link) link = addLink(ref);
      var full = { 'host': info.host, 'filenames': info.filenames, 'current': current, 'protocol': location.protocol };
      var page = imageUrl(full);
      addHandler(link, page);
      return link;
    };
    var markLink = function (selector) {
      var a = document.querySelector(selector);
      if (a) a.setAttribute('yawf-viewori', 'yawf-viewori');
      return a;
    };
    // 处理微博的配图
    var addOriLinkViewImage = function addOriLinkViewImage() {
      var a = markLink('.WB_expand_media [action-type="widget_photoview"]:not([yawf-viewori])'); if (!a) return;
      var link, info = genInfo(getImages(a)), update = function () { link = updateLink(link, info, a); };
      if (info.filenames.length > 1) (new MutationObserver(update)).observe(a, { 'attributes': true });
      update();
    };
    // 评论的图片
    var addOriLinkViewCommentImage = function addOriLinkViewCommentImage() {
      var a = markLink(
        '[node-type="feed_list_commentList"] [action-type="widget_commentPhotoView"]:not([yawf-viewori]), ' +
        '[node-type="comment_list"] [action-type="widget_commentPhotoView"]:not([yawf-viewori])'
      ); if (!a) return;
      updateLink(null, genInfo(getImages(a)), a);
    };
    // 转发的评论的图片
    var addOriLinkViewForwardCommentImage = function addOriLinkViewForwardCommentImage() {
      var a = markLink([
        '.WB_detail .WB_text a[action-type="widget_photoview"]:not([yawf-viewori])',
        '.WB_detail .WB_text a[action-type="widget_commentPhotoView"]:not([yawf-viewori])'
      ].join(',')); if (!a) return;
      var pid = getPid(a), info = { 'host': 'ww2.sinaimg.cn', 'filenames': [pid]};
      a.target = '_blank'; updateLink(a, info);
      if (!a.hasAttribute('imagecard')) a.setAttribute('imagecard', 'pid=' + pid);
      a.setAttribute('yawf-action-type', a.getAttribute('action-type')); a.removeAttribute('action-type');
    };
    // 点击缩略图时
    if (this.ref.direct.conf) document.addEventListener('click', util.func.catched(function (e) {
      if (util.page.search) return;
      if (e.button !== 0) return; // 只响应左键操作
      if (e.shiftKey) return; // 按下 Shift 时不响应
      var selector = '[action-type="feed_list_media_img"], [action-type="fl_pics"]';
      var thumbnail = util.dom.closest(e.target, selector); if (!thumbnail) return;
      var imgs = Array.from(util.dom.closest(thumbnail, 'ul').querySelectorAll(selector));
      var info = {
        'protocol': location.protocol,
        'host': 'ww2.sinaimg.cn',
        'filenames': imgs.map(function (i) { return getPid(i); }),
        'current': imgs.indexOf(thumbnail),
      };
      tabCreate(imageUrl(info));
      e.preventDefault(); e.stopPropagation();
    }), true);
    observer.dom.add(addOriLinkViewImage);
    observer.dom.add(addOriLinkViewCommentImage);
    observer.dom.add(addOriLinkViewForwardCommentImage);
  },
}).addto(filter.groups.tool);

// 将添加标签的对话框换成气球
filter.items.tool.weibotool.no_tag_dialog = filter.item({
  'group': 'weibotool',
  'version': 363,
  'type': 'boolean',
  'key': 'weibo.tool.noTagDialog',
  'text': '{{noTagDialog}}',
  'ainit': function () {
    util.func.wrapstk('lib.feed.plugins.favorite.tagDialog', function (regFunc) {
      return function (stk) {
        return function () {
        };
      };
    });
  }
}).addto(filter.groups.tool);

// 多媒体类（视频和图片）
filter.predef.subtitle('tool', 'mediatool', '{{mediaToolsTitle}}');

// 动图保持静止
filter.items.tool.weibotool.pause_animated_image = filter.item({
  'group': 'mediatool',
  'version': 448,
  'type': 'boolean',
  'key': 'weibo.tool.pause_animated_image',
  'text': '{{pauseAnimatedImage}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'warn', 'text': '{{pauseAnimatedImageDesc}}' } },
  'ainit': function () {
    var emptyImage = 'data:image/svg+xml;base64,' + btoa('<svg xmlns="http://www.w3.org/2000/svg"/>');
    observer.dom.add(function pauseAnimatedImage() {
      var images = Array.from(document.querySelectorAll([
        '.PCD_photolist img[src$=".gif"]:not([yawf-pause-animate])',
        '.WB_pic img[src$=".gif"]:not([yawf-pause-animate])',
      ].join(',')));
      images.forEach(function (image) {
        var src = image.src; image.src = emptyImage; image.setAttribute('ori-src', src);
        image.setAttribute('yawf-pause-animate', 'yawf-pause-animate');
        var fail = function () { image.src = src; };
        network.image.get(src, function (arraybuffer) {
          if (!arraybuffer) return fail();
          var uint8arr = new Uint8Array(arraybuffer);
          var base64 = [], i, l = uint8arr.length;
          for (i = 0; i < l; i += 1023) {
            base64.push(btoa(String.fromCharCode.apply(null, uint8arr.slice(i, i + 1023))));
          }
          var url = 'data:image/gif;charset=utf-8;base64,' + base64.join('');
          var animated = new Image();
          animated.addEventListener('load', function () {
            var width = animated.width, height = animated.height;
            var canvas = document.createElement('canvas');
            canvas.width = width; canvas.height = height;
            canvas.getContext('2d').drawImage(animated, 0, 0, width, height);
            image.src = canvas.toDataURL("image/png");
          });
          animated.src = url;
        });
      });
    });
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      .PCD_photolist img[src$=".gif"]:not([yawf-pause-animate]),
      .WB_pic img[src$=".gif"]:not([yawf-pause-animate])
      { display: none !important; }
    */ noop();
    })));
  }
}).addto(filter.groups.tool);

// 禁用视频右键菜单
filter.items.tool.weibotool.disable_video_menu = filter.item({
  'group': 'mediatool',
  'version': 442,
  'type': 'boolean',
  'key': 'weibo.tool.disable_video_menu',
  'text': '{{disableVideoContextMenu}}',
  'ainit': function () {
    observer.dom.add(function disableVideoContextMenu() {
      var videoes = Array.from(document.querySelectorAll('.WB_video video:not([yawf-disable-menu])'));
      videoes.forEach(function (video) {
        video.setAttribute('yawf-disable-menu', 'yawf-disable-menu');
        video.addEventListener('contextmenu', function (event) { event.stopPropagation(); }, true);
      });
    });
    util.css.add('.WB_video .con-7 { display: none !important; }');
  }
}).addto(filter.groups.tool);

// 用 URL 替换微博内的网页链接
filter.items.tool.weibotool.replace_link = filter.item({
  'group': 'weibotool',
  'version': 350,
  'type': 'boolean',
  'key': 'weibo.tool.replace_link',
  'text': '{{replaceLinkByUrl}}',
  'mark': function markLinkType() {
    // 标记每个链接都是什么类型的，方便过滤和处理
    var icon = Array.from(document.querySelectorAll('.WB_feed_type a:not([yawf-link-type]) > .W_ficon:first-child'));
    icon.forEach(function (i) { i.parentNode.setAttribute('yawf-link-type', i.textContent.trim()); });
  },
  'init': function () {
    if (this.conf) return;
    this.mark();
    observer.dom.add(this.mark);
  },
  'ainit': function () {
    var that = this;
    var expandLink = function expandWeiboLink() {
      that.mark();
      var links = Array.from(document.querySelectorAll('.WB_feed_type a[yawf-link-type="O"][title="网页链接"]:not([yawf-link-expand])'));
      links.forEach(function (link) {
        link.setAttribute('yawf-link-expand', '');
        var url = link.href;
        link.textContent = url;
        link.className = 'yawf-link';
      });
    };
    expandLink();
    observer.dom.add(expandLink);
  },
}).addto(filter.groups.tool);

// 使用文本替换图片表情
filter.items.tool.weibotool.replace_image_emoji = filter.item({
  'group': 'weibotool',
  'version': 282,
  'type': 'boolean',
  'key': 'weibo.tool.replace_image_emoji',
  'text': '{{replaceImageEmoji}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{replaceImageEmojiDesc}}' } },
  'ainit': function () {
    var replaceImageEmoji = function replaceImageEmoji() {
      var emoji = Array.from(document.querySelectorAll('[src*="//img.t.sinajs.cn/t4/appstyle/expression/emimage/e"]'));
      emoji.forEach(function (node) {
        var code = node.getAttribute('src').match(/(e.....)\.png/)[1];
        var text = document.createTextNode(util.str.emoji(code));
        node.parentNode.replaceChild(text, node);
        if (text.parentNode.normalize) text.parentNode.normalize();
      });
    };
    replaceImageEmoji();
    observer.dom.add(replaceImageEmoji);
  },
}).addto(filter.groups.tool);

// 自定义来微源博
filter.items.tool.weibotool.replace_link = filter.item({
  'group': 'weibotool',
  'version': 104,
  'type': 'boolean',
  'key': 'weibo.other.customize_source',
  'text': '{{customizeSourceWeibo}}',
  'ref': {
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{customizeSourceWeiboDesc}}' },
  },
  'ainit': function () {
    // 找到所有自定义的微博来源
    var customized = function customizeSourceWeibo() {
      var from = Array.from(document.querySelectorAll('.WB_from:not([yawf-csource])')), items = [];
      from.forEach(function (f) {
        f.setAttribute('yawf-csource', 'yawf-csource');
        if (util.dom.matches(f, '.list_li[mid] *')) return;
        if (f.textContent.indexOf(text.sourceUnkown) !== -1) return;
        // 自定义微博来源可以不显示来源
        if (f.querySelector('[node-type="feed_list_item_date"]:only-child'))
          return items.push(f.appendChild(util.dom.create('div', '')));
        // 也可以显示自定义的来源
        var item = f.querySelector('a[href*="vip.weibo.com"]');
        if (item) items.push(item);
      });
      items.forEach(function (f) {
        var wb = util.dom.create(util.str.fill(html.weiboViaWeiboCom));
        f.parentNode.replaceChild(wb, f);
      });
    };
    observer.dom.add(customized);
  },
}).addto(filter.groups.tool);

// 折叠二级评论（楼中楼）
filter.items.tool.weibotool.fold_child_comment = filter.item({
  'group': 'weibotool',
  'version': 423,
  'type': 'boolean',
  'key': 'weibo.other.fold_child_comment',
  'text': '{{foldChildComment}}',
  'ainit': function () {
    var foldChildComment = function foldChildComment() {
      var rootComment = Array.from(document.querySelectorAll('.list_li[node-type="root_comment"]:not([yawf-folded-root-comment])'));
      rootComment.forEach(function (rootComment) {
        rootComment.setAttribute('yawf-folded-root-comment', 'yawf-folded-root-comment');

        var feed = util.dom.closest(rootComment, '.WB_feed_type[mid]');
        var reply = rootComment.querySelector('a[action-type="reply"]');
        var childCommentList = Array.from(rootComment.querySelectorAll('.list_ul[node-type="child_comment"]'));

        var commentId = rootComment.getAttribute('comment_id');
        var mid = feed.getAttribute('mid');
        var childCount = 0;

        if (!childCount) do {
          var moreChildLinks = rootComment.querySelectorAll('[node-type="more_child_comment"] a');
          var moreChild = moreChildLinks[moreChildLinks.length - 1];
          if (!moreChild) break;
          var moreChildNumber = moreChild.textContent.match(/\d+/);
          if (!moreChildNumber || !moreChildNumber[0]) break;
          childCount = parseInt(moreChildNumber[0], 10) || 0;
        } while (false);

        if (!childCount) do {
          var childCommentItems = rootComment.querySelectorAll('.list_ul .list_li[comment_id]');
          childCount = childCommentItems.length || 0;
        } while (false);

        if (!childCount) return;

        var unfold = util.dom.create(util.str.fill(html.unfoldChildComment,
          { 'mid': mid, 'comment_id': commentId, 'child_count': childCount }));
        reply.parentNode.insertBefore(unfold, reply.nextSibling);

        childCommentList.forEach(function (childComment) {
          childComment.parentNode.style.display = 'none';
        });
        unfold.addEventListener('click', function () {
          childCommentList.forEach(function (childComment) {
            childComment.parentNode.style.display = 'block';
          });
        });
      });
    };
    observer.dom.add(foldChildComment);
  },
}).addto(filter.groups.tool);

// 自动从热门评论切换到全部评论
filter.items.tool.weibotool.comment_show_all = filter.item({
  'group': 'weibotool',
  'version': 425,
  'type': 'boolean',
  'key': 'weibo.other.comment_show_all',
  'text': '{{commentShowAll}}',
  'ainit': function () {
    var switchToAllComment = function switchToAllComment() {
      var allButtons = Array.from(document.querySelectorAll('a[action-type="feed_list_commentSearch"][action-data*="filter=all"]:not([yawf-all-comment])'));
      allButtons.forEach(function (button) {
        button.setAttribute('yawf-all-comment', 'yawf-all-comment');
        if (!button.classList.contains('curr')) button.click();
      });
    };
    observer.dom.add(switchToAllComment);
  }
}).addto(filter.groups.tool);

// 关注相关工具
filter.predef.subtitle('tool', 'followingtool', '{{followingToolsTitle}}');

// 自动检查关注了哪些人
filter.items.tool.followingtool.auto_check_following = filter.item({
  'group': 'followingtool',
  'version': 396,
  'type': 'boolean',
  'key': 'weibo.tool.auto_check_following',
  'text': '{{autoCheckFollowing}}',
  'ref': {
    'frequency': {
      'type': 'select',
      'default': '3',
      'select': [
        { 'text': '{{autoCheckFollowing1}}', 'value': '1' },
        { 'text': '{{autoCheckFollowing3}}', 'value': '3' },
        { 'text': '{{autoCheckFollowing7}}', 'value': '7' },
      ],
    },
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{autoCheckFollowingDesc}}' },
  },
  'get_last': function () {
    try { return JSON.parse(GM_getValue('following_info_' + util.info.uid, '{}')); }
    catch (e1) { return {}; }
  },
  'get_notice': function () {
    try { return JSON.parse(GM_getValue('following_notice_' + util.info.uid, '{}')); }
    catch (e1) { return {}; }
  },
  'current': { 'fetching': false },
  'updateinfo': util.func.noop,
  'checknow': function (userActive) {
    util.debug('start checking following list');
    var that = this, uid = util.info.uid;
    this.current.fetching = true; this.updateinfo();
    // 获取关注列表
    network.following(function (users) {
      that.current.fetching = false;
      var last = that.get_last();
      util.debug('got following list: %o', users);
      GM_setValue('following_info_' + uid, JSON.stringify({ 'timestamp': Date.now(), 'following': users }));
      var notice = that.compare(last.following, users, that.get_notice());
      GM_setValue('following_notice_' + uid, JSON.stringify(notice));
      that.updateinfo();
      // 仅当是用户触发的检查时展示检查结果，自动检查的将在下次刷新页面时展示以免打扰用户
      if (userActive) that.notice();
    });
  },
  'notice': function () {
    if (self !== top) return;
    var that = this, notice = this.get_notice();
    if (!notice.add || !notice.lost || !(notice.add.length + notice.lost.length)) return;
    util.debug('following list have been changed: %o', notice);
    // 展示一个对话框，提醒用户关注列表发生了变化
    var dialog = util.ui.dialog('yawf-following-notice', '{{autoCheckFollowingDialogTitle}}', function (inner) {
      var content = util.dom.create(util.str.fill(html.autoCheckFollowingBody));
      ['add', 'lost'].forEach(function (type) {
        if (!(notice[type] || []).length) return;
        var container = content.querySelector('.yawf-following-' + type);
        var ul = container.querySelector('ul');
        if (notice[type] && notice[type].length) {
          notice[type].forEach(function (u) {
            ul.appendChild(util.dom.create(u.id[0] !== '#' ? // 向前兼容的处理方式，将来要换成使用description
              util.str.fill(html.autoCheckFollowingItem, u) :
              util.str.fill(html.autoCheckFollowingOtherItem, u)
            ));
          });
          container.style.display = '';
        }
      });
      var confirm = content.querySelector('.yawf-following-notice-confirm');
      confirm.addEventListener('click', function (e) {
        if ('isTrusted' in e && !e.isTrusted) return; // 这个确认操作不应当被其他脚本触发
        var current = that.get_notice();
        ['add', 'lost'].forEach(function (type) {
          current[type] = current[type].filter(function (u) {
            return notice[type].every(function (v) { return v.id !== u.id; });
          });
        });
        GM_setValue('following_notice_' + util.info.uid, JSON.stringify(current));
        dialog.hide();
      });
      inner.appendChild(content);
    });
    dialog.show();
  },
  'cleanup': function () {
    var uid = util.info.uid;
    GM_deleteValue('following_notice_' + uid);
    GM_deleteValue('following_info_' + uid);
    this.updateinfo();
  },
  'compare': function (ori, now, notice) {
    if (!ori || !now) return {};
    var add = [], lost = [];
    var ori_m = {}, now_m = {};
    var attr = 'id';
    ori.forEach(function (u) { ori_m[u[attr]] = u; });
    try {
      ((notice || {}).add || []).forEach(function (u) { delete ori_m[u[attr]]; });
      ((notice || {}).lost || []).forEach(function (u) { ori_m[u[attr]] = u; });
    } catch (e) { }
    now.forEach(function (u) { now_m[u[attr]] = u; });
    Object.keys(ori_m).forEach(function (id) { var u = ori_m[id]; if (!(u[attr] in now_m)) lost.push(u); });
    Object.keys(now_m).forEach(function (id) { var u = now_m[id]; if (!(u[attr] in ori_m)) add.push(u); });
    return { 'add': add, 'lost': lost };
  },
  'init': function () {
    // 总是检查是否有消息需要提示，即便没有开启“自动检查”的功能
    var last = this.get_last(), days = Number(this.ref.frequency.conf) || 3;
    this.notice();
    if (!this.conf) return;
    if (!last.timestamp ||
      last.timestamp < Date.now() - days * 864e5 ||
      last.timestamp > Date.now() + 60e3)
      setTimeout(this.checknow.bind(this, false), 15e3);
  },
  'shown': function (dom) {
    var last = this.get_last();
    var formatTime = function (timestamp) {
      var option = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
      if (!timestamp) return util.str.fill('{{autoCheckFollowingNever}}');
      var date = new Date(timestamp);
      try { return new Intl.DateTimeFormat(util.info.lang, option).format(date); }
      catch (e1) {
        try { return new Intl.DateTimeFormat('zh-CN', option).format(date); }
        catch (e2) { return '' + timestamp; }
      }
    };
    dom.appendChild(util.dom.create(util.str.fill(html.autoCheckFollowingConfig)));
    dom.querySelector('.yawf-following-check-now')
      .addEventListener('click', this.checknow.bind(this, true));
    dom.querySelector('.yawf-following-clear')
      .addEventListener('click', this.cleanup.bind(this, true));
    this.updateinfo = function () {
      var last = this.get_last();
      var fetching = this.current.fetching;
      var status = fetching ? 2 : (last.timestamp > Date.now() - 1800e3 ? 3 : 1);
      dom.querySelector('.yawf-following-check-now').style.display = status === 1 ? '' : 'none';
      dom.querySelector('.yawf-following-checking').style.display = status === 2 ? '' : 'none';
      dom.querySelector('.yawf-following-last').textContent = formatTime(last.timestamp);
      dom.querySelector('.yawf-following-clear').style.display = Number(last.timestamp) ? '' : 'none';
    };
    this.updateinfo();
  },
}).addto(filter.groups.tool);

// 自动展开头条文章以免关注作者
filter.items.tool.followingtool.auto_unfold_ttartical = filter.item({
  'group': 'followingtool',
  'version': 395,
  'type': 'boolean',
  'key': 'weibo.tool.auto_unfold_ttartical',
  'text': '{{unfoldTTArtical}}',
  'ainit': function () {
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_editor_iframe { height: auto !important; }
      .artical_add_box [node-type="maskContent"] { display: none; }
    */ noop(); }));
  },
}).addto(filter.groups.tool);

// 取消勾选话题页面发布框“自动关注话题主持人”
filter.items.tool.followingtool.uncheck_follow_presenter = filter.item({
  'group': 'followingtool',
  'version': 155,
  'type': 'boolean',
  'key': 'weibo.tool.uncheck_follow_presenter',
  'text': '{{uncheckFollowPresenter}}',
  'ainit': function () {
    var uncheckFollowPresenter = function uncheckFollowPresenter() {
      var checkbox = document.querySelector('input[node-type="followpresenter"]:not([yawf-uncheck])');
      if (!checkbox) return;
      checkbox.setAttribute('yawf-uncheck', '');
      if (checkbox.checked) checkbox.click();
    };
    observer.dom.add(uncheckFollowPresenter);
  },
}).addto(filter.groups.tool);

// 其他工具
filter.predef.subtitle('tool', 'othertool', '{{otherToolsTitle}}');

// 表情方便输入
filter.items.tool.weibotool.fast_emoji = filter.item({
  'group': 'othertool',
  'version': 226,
  'type': 'boolean',
  'key': 'weibo.tool.fast_emoji',
  'text': '{{fastEmojiInput}}',
  'ref': {
    'top': { 'type': 'noui', 'default': [null, null, null, null, null, null, null, null, null, null] },
    'recent': { 'type': 'noui', 'default': [null, null, null, null, null, null, null, null, null, null] },
  },
  'shown': function (dom) {
    var that = this;
    var clear = dom.appendChild(util.dom.create(util.str.fill(html.fastEmojiClearButton)));
    clear.addEventListener('click', function () {
      var nil = [null, null, null, null, null, null, null, null, null, null];
      that.ref.top.putconf(nil); that.ref.recent.putconf(nil);
    });
  },
  'ainit': function () {
    var that = this;
    var onputs = { 'top': null, 'recent': null };
    // 显示一个表情；聊天窗口里面表情输入的格式和别的地方不一样
    var createLi = function (item, isIm) {
      if (!item) return util.dom.create('li', '');
      var base = isIm ? html.fastEmojiListItemIM : html.fastEmojiListItem;
      return util.dom.create('ul', util.str.fill(base, item)).firstChild;
    };
    // 将列表显示出来
    var show = function (ul, list, keep, isIm) {
      /// <param name="ul" type="HTMLUListElement">Description</param>
      var lis = Array.from(ul.querySelectorAll('li'));
      var replace = function (i, item) {
        var n = createLi(item, isIm);
        ul.replaceChild(n, lis[i]);
        lis[i] = n;
      };
      var name = function (li) { return li.title || null; };
      var update = keep ?function (list) {
        // 更新列表，比较差异并尽量少修改已有的排列顺序
        var ntitle = [], emoji = {}, emptys = [];
        // 统计有哪些表情还要
        list.forEach(function (i) {
          if (!i || !i.title) return;
          ntitle.push(i.title); emoji[i.title] = i;
        });
        // 把不在列表中的删除
        lis.forEach(function (li, i) {
          var title = name(li), pos = title ? ntitle.indexOf(title) : -1;
          if (pos !== -1) ntitle.splice(pos, 1);
          else if (title) replace(i);
          if (pos === -1) emptys.push(i);
        });
        // 往空位里面塞新的表情
        ntitle.forEach(function (title) { replace(emptys.shift(), emoji[title]); });
      } : function (list) {
        // 更新列表，保证位置的对应关系
        list.forEach(function (item, i) {
          if (lis[i].title === (item && item.title || '')) return;
          replace(i, item);
        });
      };
      update(list);
      return { 'update': update };
    };
    // 从被点击的对象（图片或者列表项）得到表情的相关信息
    var getEmoji = function (target) {
      if (util.dom.matches(target, 'li>img')) target = target.parentNode;
      try {
        var emoji = {
          'title': target.title,
          'text': util.str.parsequery(target.getAttribute('action-data')).insert,
          'img': target.querySelector('img').src
        };
        if (!emoji.title || !emoji.text || !emoji.img) return null;
        return emoji;
      } catch (e) { return null; }
    };
    // 将某个设置项和显示的界面结合
    var bindconf = function (list, type, keep, isIm) {
      onputs[type] = function (conf) { show(list, conf, keep, isIm); };
      onputs[type](that.ref[type].getconf());
    };
    // 从列表中移除重复的项，并保留 10 个
    var removeDuplicate = function (list) {
      var rec = {}, ret = [];
      list.forEach(function (i) {
        if (!i || i.title in rec) return;
        ret.push(rec[i.title] = i);
      });
      while (ret.length < 10) ret.push(null);
      return ret.slice(0, 10);
    };
    // 在用户点击表情后更新最近使用的表情
    var updateRecent = function (e) {
      var emoji = getEmoji(e.target); if (!emoji) return;
      var recent = [emoji].concat(that.ref.recent.getconf());
      that.ref.recent.putconf(removeDuplicate(recent).slice(0, 10));
    };
    // 在设置修改之后同步到显示上去
    ['top', 'recent'].forEach(function (type) {
      util.config.onput(that.ref[type].key, function () {
        if (onputs[type]) onputs[type].apply(this, arguments);
      });
    });
    // 使用拖拽置顶表情
    var dragEmoji = function (container, ul) {
      // 显示和隐藏提示拖拽的标语
      var notice = container.querySelector('#yawf-face-drop-area');
      var showNotice = function () { notice.style.display = 'block'; };
      var hideNotice = function () {
        notice.style.display = 'none';
      };
      // 拖拽
      var dragging = null, lis;
      container.addEventListener('dragstart', function (e) {
        dragging = getEmoji(e.target) || null;
        // 开始拖拽的时候，标记所有目的地为可编辑的
        lis = Array.from(ul.childNodes);
        lis.forEach(function (li) { li.setAttribute('contenteditable', 'true'); });
        showNotice();
      });
      container.addEventListener('mouseleave', function () { dragging = null; });
      notice.addEventListener('dragenter', function () { hideNotice(); });
      ul.addEventListener('dragenter', function () { hideNotice(); });
      container.addEventListener('dragend', function (e) { hideNotice(); });
      container.addEventListener('drop', function (e) {
        // 结束拖拽的时候恢复原样
        if (lis) lis.forEach(function (li) { li.removeAttribute('contenteditable'); }); lis = null;
        var img_upload = document.querySelector('.send_weibo .img_upload');
        if (img_upload) img_upload.style.display = 'none';
        // 然后看看起止都在哪里
        var current = e.target;
        if (dragging === null) return;
        e.preventDefault(); e.stopPropagation();
        while (current.parentNode !== ul) current = current.parentNode;
        var index = Array.from(ul.childNodes).indexOf(current);
        // 把拽到的东西加到置顶里面去
        var list = that.ref.top.getconf(), old = list[index];
        list = list.map(function (e) {
          if (!e) return null;
          if (e.title === dragging.title) return old;
          return e;
        });
        list[index] = dragging;
        that.ref.top.putconf(list);
      });
      if (that.ref.top.getconf().some(Boolean)) hideNotice();
    };
    // 监视新的表情框
    observer.dom.add(function emojiFastObserver() {
      var tab = document.querySelector('.layer_faces .WB_minitab:first-child'); if (!tab) return;
      var container = tab.parentNode;
      var area = container.insertBefore(util.dom.create(util.str.fill(html.fastEmojiInput)), tab);
      var lists = Array.from(area.querySelectorAll('[yawf-face] ul'));
      var chatListNode = container.querySelector('ul[node-type="_phizListNode"]'), isIm =!!chatListNode;
      bindconf(lists[0], 'top', false, isIm);
      bindconf(lists[1], 'recent', true, isIm);
      container.addEventListener('click', updateRecent);
      dragEmoji(container, lists[0]);
      if (isIm) fixChat(lists, chatListNode);
    });
    // 修理一下聊天窗口里面的情况
    var fixChat = function (lists, chatListNode) {
      var bindEvent = function (list) {
        list.addEventListener('click', function (e) {
          e.stopPropagation();
          var target = e.target;
          if (util.dom.matches(target, 'li img')) target = target.parentNode;
          if (!target.title) return;
          // 弄一个假的按钮，放在原本的列表末尾，骗他说我点的是原本的列表里面的
          var fake = target.cloneNode(true);
          fake.style.display = 'none';
          chatListNode.appendChild(fake);
          fake.click();
          fake.parentNode.removeChild(fake);
        });
      };
      lists.forEach(bindEvent);
    };
  },
}).addto(filter.groups.tool);

if (!function isBJT() {
  // 如果用户使用的是已经是和北京时间一致的时区，那么我们就不提供这个功能了
  // 但是需要注意的是是否在东八区一点需要额外判断是否受到夏令时影响
  var cur = new Date();
  var jan = new Date(cur.getFullYear(), 0, 1);
  var jul = new Date(cur.getFullYear(), 6, 1);
  return cur.getTimezoneOffset() === -480 &&
    jan.getTimezoneOffset() === -480 &&
    jul.getTimezoneOffset() === -480;
}()) {
  // 使用本地时区
  filter.items.tool.weibotool.show_local_time = filter.item({
    'group': 'othertool',
    'version': 274,
    'type': 'boolean',
    'key': 'weibo.tool.show_local_time',
    'text': '{{showLocalTime}}',
    'ainit': function () {
      var z = function (x) { return ('0' + x).slice(-2); };
      // 参考 lib.feed.plugins.updateTime
      var e = text.timeToday, f = text.timeSecondBefore, g = text.timeMinuteBefore;
      var convert = function (a, c) {
        var d = a.getFullYear(), i = a.getMonth() + 1, k = a.getDate(), m = a.getHours();
        var h = c.getFullYear(), j = c.getMonth() + 1, l = c.getDate(), n = c.getHours(), o = c.getMinutes();
        // 修改这里，我们用本地时间，而不是东八区时间
        var q = h, r = j, s = l, t = z(n), u = z(o);
        var v = a - c;
        v = v > 0 ? v : 0;
        v = v / 1e3;
        if (d != h) return q + "-" + r + "-" + s + " " + t + ":" + u;
        if (i != j || k != l) return text.timeMonthDay.split('%s').map(function (x, i) { return x + [r, s, t, u, ''][i]; }).join('');
        if (m != n && v > 3600) return e + " " + t + ":" + u;
        if (v < 51) {
          v = v < 1 ? 1 : v;
          return Math.floor((v - 1) / 10) + 1 + "0" + f;
        }
        return Math.floor(v / 60 + 1) + g;
      };
      // 把匹配到的数字转换成整数数组的很方便的函数
      var match = function (str, reg) {
        var m = str.match(reg); if (!m) return null;
        return Array.from(m).slice(1).map(function (x) { return parseInt(x, 10); });
      };
      // 盯着网页看有没有带 date 属性的元素
      // 这些元素通过 date 属性给定其时间，需要实时更新（如xx秒前）
      var modify = function changeDateElement() {
        var timeText = document.querySelector('[node-type="feed_list_timeTip"][date] [node-type="feed_list_timeText"]');
        if (timeText) timeText.parentNode.replaceChild(
          util.dom.create(util.str.fill(
          html.feedTimeTip, { 'date': timeText.parentNode.getAttribute('date'), 'time': '{{timeReadHere}}' })
          ).firstChild, timeText);
        var f = Array.from(document.querySelectorAll('a[node-type="feed_list_item_date"][date]'));
        f.forEach(function (i) {
          ['node-type', 'date'].forEach(function (attr) {
            i.setAttribute('yawf-' + attr, i.getAttribute(attr));
            i.removeAttribute(attr);
          });
          var title = i.getAttribute('title');
          if (title) {
            var k = i.getAttribute("yawf-date");
            if (!/^\s*\d+\s*$/.test(k)) return;
            var l = new Date();
            l.setTime(parseInt(k, 10));
            i.title = (function (c) {
              var h = c.getFullYear(), j = c.getMonth() + 1, l = c.getDate(), n = c.getHours(), o = c.getMinutes();
              var tz = c.getTimezoneOffset(), tzm = Math.abs(tz) % 60, tzh = (Math.abs(tz) - tzm) / 60, tzt;
              if (tz === 0) tzt = ''; else tzt = (tz < 0 ? '+' : '-') + z(tzh) + ':' + z(tzm);
              return h + '-' + z(j) + '-' + z(l) + ' ' + z(n) + ':' + z(o) + ' UTC' + tzt;
            }(l));
            util.debug('timezone UTC+8 to Local: %o -> %o', title, i.title);
          }
        });
        update(f);
      };
      // 处理那些没有 date 属性的时间的文本
      // 这些事件不需要更新
      // 文本的生成规则和需要更新的其实略有不同，因为这些文本大多是在服务器端生成的
      var convertText = function (input) {
        var nums, c = null, a = new Date();
        var b = a; b.setTime(b.getTime() + 288e5);
        var q = b.getUTCFullYear(), rr = b.getUTCMonth(), s = b.getUTCDate();
        if ((nums = match(input, /^(\d+)-(\d+)-(\d+) (\d+):(\d+)$/))) c = new Date(Date.UTC(nums[0], nums[1] - 1, nums[2], nums[3], nums[4], 0));
        else if ((nums = match(input, new RegExp('^' + text.timeMonthDay.replace(/%s/g, '(\\d+)') + '$')))) c = new Date(Date.UTC(q, nums[0] - 1, nums[1], nums[2], nums[3], 0));
        else if ((nums = match(input, new RegExp('^' + e + '\\s*(\\d+):(\\d+)$')))) c = new Date(Date.UTC(q, rr, s, nums[0], nums[1], 0));
        if (c === null) return input;
        c.setTime(c.getTime() - 288e5);
        if (c.getTime() > a.getTime()) c.setTime(c.getTime() - 864e5 * Math.ceil((c.getTime() - a.getTime()) / 864e5));
        return convert(a, c);
      };
      // 更新需要更新的时间
      var update = function (f) {
        var g = new Date();
        if (!f) f = Array.from(document.querySelectorAll('[yawf-date]'));
        g.setTime(g.getTime() - ((unsafeWindow.$CONFIG || {}).timeDiff || 0));
        f.forEach(function (j) {
          var k = j.getAttribute("yawf-date");
          if (!/^\s*\d+\s*$/.test(k)) return;
          var l = new Date();
          l.setTime(parseInt(k, 10));
          var text = convert(g, l);
          if (text !== j.textContent) j.textContent = text;
        });
      };
      // 处理文本显示的时间
      var texttime = function changeDateText() {
        var selectors = [
          '.WB_from:not([yawf-localtime])',
          '.cont_top .data:not([yawf-localtime])',
          'legend:not([yawf-localtime])',
        ].join(',');
        var nodes = Array.from(document.querySelectorAll(selectors));
        nodes.forEach(function (x) {
          x.setAttribute('yawf-localtime', '');
          if (util.dom.matches(x, '.WB_webim *')) return; // 聊天窗口中的时间是本地的时间
          var t = x.firstChild;
          if (t.nodeType !== Node.TEXT_NODE) return;
          var v = t.textContent.trim();
          if (v === '') return;
          var r = v.replace(/^(.*?)\s*(来自|來自|come from|)$/, function (x, t, s) {
            return convertText(t) + (s ? ' ' + s + ' ' : '');
          });
          t.textContent = r;
          util.debug('timezone UTC+8 to Local: %o -> %o', v, r);
        });
      };
      modify();
      update();
      observer.dom.add(modify);
      observer.dom.add(texttime);
      setInterval(update, 1e4);
    }
  }).addto(filter.groups.tool);
}

// 禁用桌面提醒
if (function desktopNotificationSupport() {
  // 检查微博是否会开启桌面提醒功能
  var hasNotification = "Notification" in window || "mozNotification" in window || "webkitNotification" in window;
  var isMaxthonLike = navigator.userAgent.indexOf("Maxthon") !== -1;
  return hasNotification && !isMaxthonLike;
}()) {
  filter.items.tool.weibotool.disable_desktop_notification = filter.item({
    'group': 'othertool',
    'version': 416,
    'type': 'boolean',
    'key': 'weibo.tool.disable_desktop_notification',
    'text': '{{disableNotification}}',
    'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{disableNotificationDesc}}' } },
    'ainit': function () {
      util.func.wrapstk('lib.notification.browserNotification', function (regFunc) {
        return function (stk) {
          return function () {
            return void 0;
          };
        };
      });
    },
  }).addto(filter.groups.tool);
}

// 禁用微博的Live Photo
if (function livePhotoSupported() {
  // 检查微博是否会开启 Live Photo 功能
  var video = util.dom.create('video', '');
  var isSafariLike = navigator.userAgent.indexOf("Safari") >= 0;
  return isSafariLike && !!video.canPlayType && !!video.canPlayType("video/mp4");
}()) {
  filter.items.tool.weibotool.disable_live_photo = filter.item({
    'group': 'mediatool',
    'version': 416,
    'type': 'boolean',
    'key': 'weibo.tool.disable_live_photo',
    'text': '{{disableLivePhoto}}',
    'ainit': function () {
      util.func.wrapstk('lib.image.livephoto', function (regFunc) {
        return function (stk) {
          return function (img, id, callbacks) {
            if (callbacks && callbacks.canNotPlay) {
              callbacks.canNotPlay();
            }
            return false;
          };
        };
      });
    },
  }).addto(filter.groups.tool);
}

// 样式
// 由于历史原因，样式下键值归属 tool
filter.predef.group('style');

// 一个带有颜色/透明度的选框项
filter.ref.rgba = function (defcolor, deft, color, transparency, rgba) {
  var _color = {
    'type': 'color',
    'default': defcolor || '#000000',
  };
  var _transparency = {
    'type': 'range',
    'default': deft || 0,
    'min': 0,
    'max': 100,
  };
  var base = {};
  base[color || 'color'] = _color;
  base[transparency || 'transparency'] = _transparency;
  base[rgba || 'rgba'] = {
    'toString': function () {
      return util.str.rgba(_color.conf, _transparency.conf);
    },
  };
  return base;
};

// 字体字号相关样式
filter.predef.subtitle('style', 'text', '{{textStyleTitle}}');

// 修改字体
filter.items.style.text.custom_font_family = filter.item({
  'group': 'text',
  'version': 178,
  'type': 'boolean',
  'key': 'weibo.tool.custom_font_family',
  'text': '{{customFontFamily}}',
  'west': font.west,
  'chinese': font.chinese,
  'ntm': {},
  'ref': {
    'wf': {
      'type': 'select',
      'select': font.west.map(function (i) { return { 'text': i[1], 'value': i[1] }; }),
      'default': font.west[0][0],
    },
    'cf': {
      'type': 'select',
      'select': font.chinese.map(function (i) { return { 'text': i[1], 'value': i[1] }; }),
      'default': font.chinese[0][0],
    },
  },
  'init': function () {
    var that = this;
    var updateConfig = function () {
      util.debug('valid fonts: %o, %o', that.west, that.chinese);
      that.ntm = {};
      that.west.concat(that.chinese).forEach(function (f) { that.ntm[f[1]] = f[0]; });
      if (that.ntm[that.ref.wf.conf] && that.ntm[that.ref.cf.conf]) return;
      if (!that.ntm[that.ref.wf.conf]) that.ref.wf.putconf(that.west[0][1]);
      if (!that.ntm[that.ref.cf.conf]) that.ref.cf.putconf(that.chinese[0][1]);
      that.putconf(false);
    };
    var validFonts = function (callback) {
      var fonts = that.west.concat(that.chinese);
      setTimeout(function validFont() {
        if (fonts.length === 0) return callback();
        var font = fonts.shift(), valid = util.font.valid(font[0]);
        util.debug('%s: %o', font[1], valid);
        if (!valid) {
          that.west = that.west.filter(function (f) { return f[0] !== font[0]; });
          that.chinese = that.chinese.filter(function (f) { return f[0] !== font[0]; });
        }
        setTimeout(validFont, 1e3);
      }, 2e4);
    };
    validFonts(updateConfig);
    updateConfig();
  },
  'shown': function (dom) {
    var o = Array.from(dom.querySelectorAll('option'));
    var that = this;
    o.forEach(function (o) {
      if (that.ntm[o.value]) o.style.fontFamily = that.ntm[o.value];
      else o.style.display = 'none';
    });
  },
  'ainit': function () {
    // 因为上面 init 被延时调用，所以这里拿到的字体可能是有问题的。
    // 好在这个问题只会发生在用户导入了设置后第一次刷新，所以等用户下次刷新就好了。
    var wf = this.ntm[this.ref.wf.conf], cf = this.ntm[this.ref.cf.conf];
    if (!wf || !cf) return;
    util.css.add('body, body.WB_macT, body.WB_xpT, .WB_webim { font-family: ' + wf + ', ' + cf + '; }');
  },
}).addto(filter.groups.style);

// 增大 v6 下微博字号
filter.items.style.text.weibo_large_font = filter.item({
  'group': 'text',
  'version': 140,
  'type': 'boolean',
  'key': 'weibo.tool.weibo_large_font',
  'text': '{{weiboLargeFont}}',
  'ref': {
    'ratio': {
      'type': 'select',
      'select': [
        { 'value': '120', 'text': '{{weiboLargeFont120}}' },
        { 'value': '150', 'text': '{{weiboLargeFont150}}' },
        { 'value': '200', 'text': '{{weiboLargeFont200}}' },
        { 'value': '300', 'text': '{{weiboLargeFont300}}' },
      ],
      'default': '120',
    },
  },
  'pref': {
    '120': { 'fs': '16', 'lh': '26', 'fs2': '14', 'lh2': '24', 'h': '20', 'h2': '18', 'fs3': '12' },
    '150': { 'fs': '21', 'lh': '32', 'fs2': '18', 'lh2': '27', 'h': '25', 'h2': '23', 'fs3': '14' },
    '200': { 'fs': '28', 'lh': '42', 'fs2': '24', 'lh2': '36', 'h': '33', 'h2': '29', 'fs3': '19' },
    '300': { 'fs': '42', 'lh': '64', 'fs2': '36', 'lh2': '54', 'h': '50', 'h2': '46', 'fs3': '28' },
  },
  'shown': function (dom) {
    var s = dom.querySelector('select');
    var o = Array.from(s.querySelectorAll('option'));
    var that = this;
    s.style.height = '20px';
    o.forEach(function (o) {
      o.style.fontSize = that.pref[o.value].fs + 'px';
    });
  },
  'ainit': function () {
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      .WB_info, .WB_text, .WB_info *, .WB_text * { font-size: {{fs}}px !important; line-height: {{lh}}px !important; }
      .WB_feed_expand .WB_info *, .WB_feed_expand .WB_text *, .WB_feed_expand .WB_info, .WB_feed_expand .WB_text { font-size: {{fs2}}px !important; line-height: {{lh2}}px !important; }
      .WB_text .W_btn_b { height: {{h}}px !important; }
      .WB_text .W_btn_b, .WB_text .W_btn_b * { line-height: {{h}}px !important; font-size: {{fs2}}px !important; }
      .WB_feed_expand .WB_text .W_btn_b, .WB_text .W_btn_c, .WB_empty .W_btn_c { height: {{h2}}px !important; line-height: {{h2}}px !important; }
      .WB_feed_expand .WB_text .W_btn_b, .WB_feed_expand .WB_text .W_btn_b *, .WB_text .W_btn_c *, .WB_empty .W_btn_c * { line-height: {{h2}}px !important; font-size: {{fs3}}px !important; }
      .W_icon_feedpin, .W_icon_feedhot { height: 16px !important; line-height: 16px !important; }
    */ noop(); }), this.pref[this.ref.ratio.conf]));
  },
}).addto(filter.groups.style);

// 版面相关样式
filter.predef.subtitle('style', 'layout', '{{layoutStyleTitle}}');

// 统一头像形状
filter.items.style.layout.avatar_shape = filter.item({
  'group': 'layout',
  'version': 150,
  'type': 'boolean',
  'key': 'weibo.tool.avatar_shape',
  'text': '{{avatarShape}}',
  'ref': {
    'shape': {
      'type': 'select',
      'select': [
        { 'value': 'circle', 'text': '{{avatarShapeCircle}}' },
        { 'value': 'square', 'text': '{{avatarShapeSquare}}' },
      ],
      'default': 'square',
    },
  },
  'ainit': function () {
    util.css.add(this.ref.shape.conf === 'square' ? util.str.cmt(function () { /*!CSS
      .W_face_radius, .W_person_info .cover .headpic, .PCD_header .pf_photo, .PCD_header .photo_wrap, .PCD_header .pf_photo .photo, .PCD_user_a .picitems .pic_box, .PCD_connectlist .follow_box .mod_pic img, .PCD_ut_a .pic_box, .PCD_counter_b .pic_box, .WB_feed_v3 .WB_sonFeed .WB_face, .WB_feed_v3 .WB_sonFeed .WB_face .face img { border-radius: 0 !important; }
    */ noop(); }) : util.str.cmt(function () { /*!CSS
      img[usercard], .WB_face img { border-radius: 50% !important; }
    */ noop(); }));
  },
}).addto(filter.groups.style);

// 深色导栏航
filter.items.style.layout.dark_nav_bar = filter.item({
  'group': 'layout',
  'version': 147,
  'type': 'boolean',
  'key': 'weibo.tool.dark_nav_bar',
  'text': '{{darkNavBar}}',
  'ainit': function () {
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_global_nav { background: #333; }
      .WB_global_nav_alpha { background: rgba(51, 51, 51, 0.94); }
      .gn_logo .logo:empty { background: none !important; }
      .gn_logo .logo:empty::before, .gn_logo .logo:empty::after { content: " "; display: block; background: url("//img.t.sinajs.cn/t6/style/images/global_nav/WB_logo.png?id=1404211047727") no-repeat 0 40%; height: 48px; }
      @media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-moz-min-device-pixel-ratio: 2), only screen and (-o-min-device-pixel-ratio: 2/1), only screen and (min-device-pixel-ratio: 2) {
        .gn_logo .logo:empty::before, .gn_logo .logo:empty::after { background-image:url("//img.t.sinajs.cn/t6/style/images/global_nav/WB_logo-x2.png?id=1404211047727"); background-size:80px 27px; }
      }
      .gn_logo .logo:empty::before { width: 36px; float: left; }
      .gn_logo .logo:empty::after { width: 104px; float: right; background-position: -36px 40%; }
      .gn_logo .logo:empty::after { filter: url("data:image/svg+xml,%3Csvg%20viewBox=%220%200%20183%20276%22%20id=%22img3%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22invert%22%3E%3CfeComponentTransfer%3E%3CfeFuncR%20tableValues=%221%200%22%20type=%22table%22/%3E%3CfeFuncG%20tableValues=%221%200%22%20type=%22table%22/%3E%3CfeFuncB%20tableValues=%221%200%22%20type=%22table%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/svg%3E#invert"); -webkit-filter: invert(100%); filter: invert(100%); }
      .FRAME_main .WB_global_nav .gn_nav_list li .home em { color: #fa7d3c; }
      .WB_global_nav .S_ficon, .WB_global_nav .S_ficon_dis, .WB_global_nav a.S_ficon_dis:hover, .WB_global_nav a:hover .S_ficon_dis { color: #a6afbf; }
      .WB_global_nav .S_txt1, .WB_global_nav .SW_fun .S_func1 { color: #eee; }
    */ noop(); }));
  },
}).addto(filter.groups.style);

// 交换导航链接和搜索框位置
filter.items.style.layout.reorder_nav_bar = filter.item({
  'group': 'layout',
  'version': 221,
  'type': 'boolean',
  'key': 'weibo.tool.reorder_nav_bar',
  'text': '{{reorderNavBar}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{reorderNavBarDesc}}' } },
  'ainit': function () {
    var moveNavList = function moveNavList() {
      var search = document.querySelector('.WB_global_nav .gn_search, .WB_global_nav .gn_search_v2');
      var list = document.querySelector('.WB_global_nav .gn_header .gn_position .gn_nav .gn_nav_list');
      if (!search || !list) return;
      var items = Array.from(list.querySelectorAll('li')).slice(0, -1);
      var gnlist = util.dom.create('<div class="gn_nav"><ul class="gn_nav_list"></ul></div>');
      var nlist = gnlist.querySelector('ul');
      items.forEach(function (l) { nlist.appendChild(l); });
      search.parentNode.insertBefore(gnlist, search);
      search.parentNode.appendChild(search);
      util.css.add(util.str.cmt(function () { /*!CSS
        .WB_global_nav .gn_search, .WB_global_nav .gn_search_v2 { float: right; }
        .WB_global_nav .gn_header { text-align: right; }
        .WB_global_nav .gn_header > * { text-align: left; }
        .WB_global_nav .gn_header > .gn_nav { margin-right: 0; }
        .WB_global_nav_us .gn_header { background-image: none; }
        .WB_global_nav_us .gn_logo, .WB_global_nav_us .gn_logo .box, .WB_global_nav .gn_logo, .WB_global_nav .gn_logo a { width: 140px !important; }
        .WB_global_nav .gn_logo a { left: 0 !important; }
        .WB_global_nav_us .gn_logo .box .logo, .WB_global_nav_us .gn_logo .box img { display: block; }
        .WB_global_nav .gn_logo .box .logo { margin-left: 0; }
        .WB_global_nav_us .gn_position { margin-right: 0; }
      */ noop(); }));
      observer.dom.remove(moveNavList);
    };
    observer.dom.add(moveNavList);
    moveNavList();
  },
}).addto(filter.groups.style);

// 隐藏昵称
filter.items.style.layout.nav_hide_name = filter.item({
  'group': 'layout',
  'version': 384,
  'type': 'boolean',
  'key': 'weibo.tool.nav_hide_name',
  'text': '{{navHideName}}',
  'ref': {
    'act': {
      'type': 'select',
      'default': 'replace',
      'select': [
        { 'value': 'hidden', 'text': '{{navHideNameHidden}}' },
        { 'value': 'replace', 'text': '{{{navHideNameReplace}}}' },
      ],
    },
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{navHideNameDesc}}' },
  },
  'init': function () {
    if (!this.conf) {
      util.css.add(util.str.cmt(function () { /*!CSS
        .WB_global_nav .gn_nav_list li .gn_name .S_txt1 { display: inline-block; }
      */ noop(); }));
    } else if (this.ref.act.conf === 'replace') {
      util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
        .WB_global_nav .gn_nav_list li .gn_name .S_txt1::before { content: "{{navHideNameReplaceText}}"; display: block; }
        .WB_global_nav .gn_nav_list li .gn_name .S_txt1 { height: 26px; display: inline-block; width: 4em; }
      */ noop(); })));
    }
  },
}).addto(filter.groups.style);

// 加宽微博
filter.items.style.layout.width_weibo = filter.item({
  'group': 'layout',
  'version': 243,
  'type': 'boolean',
  'text': '{{widthWeibo}}',
  'key': 'weibo.tool.width_weibo',
  'ref': {
    'width': {
      'type': 'range',
      'min': 480,
      'max': 1280,
      'default': 750,
      'step': 10,
    },
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{widthWeiboDesc}}' }
  },
  'ainit': function () {
    if (util.page.search) return;
    var width = this.ref.width.conf;
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      body:not([yawf-weibo-only]) .WB_frame { width: calc({{width}} + 400px) !important; }
      body:not([yawf-weibo-only]) #plc_main { width: calc({{width}} + 250px) !important; }
      body:not([yawf-weibo-only]) .WB_main_c,
      body:not([yawf-weibo-only]) .WB_frame_c { width: {{width}}; }
      body:not([yawf-weibo-only]) .WB_tab_a .tab_box_a .fr_box { width: calc({{width}} - 300px); }
      body:not([yawf-weibo-only]) .WB_tab_a .tab_box_a_r6 .fr_box { width: calc({{width}} - 312px); }
      body:not([yawf-weibo-only]) .WB_tab_a .tab_box_a_r2_s .fr_box { width: calc({{width}} - 400px); }
      body:not([yawf-weibo-only]) a.W_gotop { margin-left: calc({{width}} / 2 + 200px); }
      body:not([yawf-weibo-only]) #home_new_feed_tip[yawf-fixed],
      body:not([yawf-weibo-only]) [yawf-id="home_new_feed_tip"][yawf-fixed] { width: {{width}}; top: 15px }
      body:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + {{width}} / 2 - 40px); }
      body:not([yawf-weibo-only]) .private_dialogue_box .private_dialogue_body { width: {{width}}; }
      body:not([yawf-weibo-only]) .webim_chat_window .private_dialogue_box .private_dialogue_body { width: 400px; }
      @media screen and (max-width: 1006px) {
        body:not([yawf-weibo-only]) .WB_frame { width: calc({{width}} + 160px) !important; }
        body:not([yawf-weibo-only]) #plc_main { width: calc({{width}} + 10px) !important; }
        body:not([yawf-weibo-only]) a.W_gotop { margin-left: calc({{width}} / 2 + 80px); }
        body:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + {{width}} / 2 - 230px); }
      }

      body[yawf-merge-left]:not([yawf-weibo-only]) .WB_main .WB_frame { width: calc({{width}} + 240px) !important; max-width: 100%; }
      body[yawf-merge-left]:not([yawf-weibo-only]) a.W_gotop { margin-left: calc({{width}} / 2 + 130px); }
      body[yawf-merge-left="left"]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% - {{width}} / 2 - 120px); }
      body[yawf-merge-left="right"]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + {{width}} / 2 - 110px); }
      @media screen and (max-width: 1006px) {
        body[yawf-merge-left]:not([yawf-weibo-only]) .WB_main .WB_frame { width: {{width}} !important; max-width: 100%; }
        body[yawf-merge-left]:not([yawf-weibo-only]) a.W_gotop { margin-left: calc({{width}} / 2 + 10px); }
        body[yawf-merge-left]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + {{width}} / 2 - 230px); }
      }

      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame { width: calc({{width}} + 340px) !important; }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame #plc_main { width: calc({{width}} + 340px) !important; }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame_a,
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame_a_fix { width: calc({{width}} + 320px); }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .DSC_header { width: calc({{width}} + 340px); }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame #plc_main { width: calc({{width}} + 340px) !important; }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) a.W_gotop { margin-left: calc({{width}} / 2 + 160px); }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_timeline { margin-left: calc({{width}} / 2 + 170px); }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + {{width}} / 2 - 70px); }
      :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .send_weibo_simple .input_simple_wrap .inputfunc_simple_wrap { width: calc({{width}} - 96px); }
      @media screen and (max-width: 939px) {
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame { width: calc({{width}} + 0px) !important; }
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame_a,
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame_a_fix { width: {{width}}; }
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .DSC_header { width: calc({{width}} + 20px); }
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_frame #plc_main { width: calc({{width}} + 20px) !important; }
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) a.W_gotop { margin-left: calc({{width}} / 2 + 120px); }
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + {{width}} / 2 - 230px); }
        :not([yawf-weibo-only]) > .B_page:not([yawf-weibo-only]) .WB_timeline { margin-left: calc({{width}} / 2 + 10px); }
      }

      body.B_artical .WB_frame,
      body.B_artical .WB_frame #plc_main,
      body.B_artical .WB_frame_a { width: 1000px !important; }

      .send_weibo { background-size: cover; }
    */ noop(); }), {
      'width': width + 'px',
    }));
    // 解决发布框下方的按钮在缩小宽度时排列不完全的问题
    if (width < 600) util.css.add('.send_weibo .kind a { width: 20px; height: 26px; overflow: hidden; }');
  }
}).addto(filter.groups.style);

// 阅读模式
filter.items.style.layout.weibo_only = filter.item({
  'group': 'layout',
  'version': 30,
  'type': 'boolean',
  'text': '{{weiboOnly}}',
  'key': 'weibo.tool.weibo_only',
  'ref': {
    // 宽度
    'width': {
      'type': 'range',
      'min': 480,
      'max': 1280,
      'default': 600,
      'step': 10,
    },
    // 快捷键
    'key': {
      'type': 'key',
      'default': util.keyboard.code.F8,
    },
    // 是否显示快捷链接
    'switch': {
      'type': 'boolean',
      'default': false,
    },
    'enabled': {
      'type': 'boolean',
      'default': false,
      'internal': true,
    },
  },
  'ainit': function () {
    var that = this;
    var key = that.ref.key, attr = 'yawf-weibo-only';
    // 切换阅读模式开关
    var updateMode = function (enable) {
      var enabled = document.body.hasAttribute(attr);
      if (enable === null) enable = !enabled;
      var valid = enable && (!!document.querySelector('.WB_frame_c, #v6_pl_content_homefeed'));
      if (valid !== enabled) {
        if (valid) document.body.setAttribute(attr, attr);
        else document.body.removeAttribute(attr);
        that.ref.enabled.putconf(enable);
      }
    };
    // 检查快捷键按键
    if (key.conf) util.keyboard.reg('keyup', key.conf, function (e) {
      updateMode(null);
      e.stopPropagation();
    });
    // 显示切换按钮
    if (that.ref['switch'].conf) {
      var showSwitch = function showReaderSwitch() {
        var search = document.querySelector('#v6_pl_content_homefeed .WB_tab_a .tab_box_a .fr_box .search_box:not([yawf-weibo-only-added]), div[id^="Pl_Official_ProfileFeedNav__"] .WB_tab_a .tab_box_a .fr_box .search_box:not([yawf-weibo-only-added])');
        if (!search) return; search.setAttribute('yawf-weibo-only-added', 'added');
        var weiboOnly = util.dom.create('div', util.str.fill(html.weiboOnlyButton, {
          'shortcut': key.conf === 0 ? '' : ' (' + util.keyboard.name(key.conf) + ')',
        })).firstChild;
        weiboOnly.addEventListener('click', updateMode.bind(that, null));
        search.parentNode.appendChild(weiboOnly);
      };
      observer.dom.add(showSwitch);
    }
    // 注册样式
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      body[{{attr}}] .WB_miniblog { padding-top: 50px; }
      body[{{attr}}] .WB_frame>*:not(#plc_main),
      body[{{attr}}] #plc_main>*:not(.WB_main_c):not(.WB_frame_c):not(.WB_main_r):not(.WB_frame_b),
      body[{{attr}}] .WB_main_c>*:not(#v6_pl_content_homefeed),
      body[{{attr}}] #plc_bot .WB_footer, body[{{attr}}] #plc_bot .W_fold, body[{{attr}}] .WB_footer { display: none !important; }
      body[{{attr}}] .WB_main .WB_main_c { float: right !important; }
      body[{{attr}}] #plc_main>.WB_main_r { visibility: hidden; margin-right: -230px; }
      body[{{attr}}] #plc_main>.WB_frame_b { visibility: hidden; margin-right: -300px; }
      body[{{attr}}] .WB_frame, body[{{attr}}][yawf-merge-left="left"] .WB_main .WB_frame { width: calc({{width}} + 20px) !important; max-width: 100%; }
      body[{{attr}}] #plc_main { width: calc({{width}} + 20px) !important; max-width: 100%; }
      body[{{attr}}] .WB_global_nav { position: static; margin-top: -50px; }
      body[{{attr}}] .WB_main_c { width: {{width}}; max-width: calc(100% - 20px); }
      body[{{attr}}] .WB_tab_a .tab_box_a .fr_box { width: calc({{width}} - 300px); max-width: calc(100% - 300px); }
      body[{{attr}}] .WB_tab_a .tab_box_a_r2_s .fr_box { width: calc({{width}} - 400px); max-width: calc(100% - 400px); }
      body[{{attr}}] .WB_tab_a .tab_box_a_r6 .fr_box { width: calc({{width}} - 312px); }
      body[{{attr}}] .WB_timeline { margin-left: calc({{width}} / 2 + 10px); max-width: calc(100% - 10px); }
      body[{{attr}}] a.W_gotop { margin-left: calc({{width}} / 2 + 10px); max-width: calc(100% - 10px); }
      body[{{attr}}] .WB_frame_c { width: {{width}}; max-width: calc(100% - 20px); }
      body[{{attr}}] #home_new_feed_tip[yawf-fixed], body[{{attr}}] [yawf-id="home_new_feed_tip"][yawf-fixed] { width: {{width}}; top: 15px; }
      body[{{attr}}] #yawf-drop-area { left: calc(50% + {{width}} / 2 - 230px); }
      body[{{attr}}] .WB_feed_v3 .WB_face .opt { right: calc(132px - {{width}}); }
    */ noop(); }), {
      'width': that.ref.width.conf + 'px',
      'attr': attr,
    }));
    var updateModeByConf = function () {
      updateMode.call(that, that.ref.enabled.getconf());
    };
    updateModeByConf();
    window.addEventListener('focus', function () {
      updateMode.call(that, that.ref.enabled.getconf());
    });
    observer.dom.add(function updateReaderMode() {
      updateMode.call(that, that.ref.enabled.conf);
    });
  }
}).addto(filter.groups.style);

// 设置模板
filter.items.style.layout.set_skin = filter.item({
  'group': 'layout',
  'version': 307,
  'type': 'boolean',
  'text': '{{setSkin}}',
  'key': 'weibo.tool.set_skin',
  'ref': {
    'skin': {
      'type': 'select',
      'default': 'skin058',
      'select': Object.keys(skin).sort().map(function (key) {
        var val = skin[key];
        return Object.keys(val).map(function (index) {
          var num = index.slice(1), skinId = key + num;
          return { 'value': skinId, 'text': val[index] + ' (' + skinId + ')' };
        });
      }).reduce(function (x, y) { return x.concat(y); }),
    },
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{setSkinDesc}}' }
  },
  'ainit': function () {
    var userConfigSkinId = this.ref.skin.conf, version = '';
    var skinStyle = null, coverStyle = null;
    var skinId = function () {
      return util.str.parsequery(location.search.slice(1)).skinId || userConfigSkinId;
    };
    var setSkinId = function (skinId) {
      skinStyle.href = skinStyle.href.replace(/\/skin\/[^\/]*\/skin.css/, '/skin/' + skinId + '/skin.css');
      var coverCss = '#skin_cover_s { background-image: url("//img.t.sinajs.cn/t6/skin/' +
        skinId + '/images/profile_cover_s.jpg?version=' + version + '") !important; }';
      (coverStyle || (coverStyle = document.head.appendChild(util.dom.create('style', '')))).textContent = coverCss;
    };
    var setSkin = function setSkin() {
      var id = skinId();
      if (!skinStyle) {
        var skinCss = document.querySelector('link[href*="//img.t.sinajs.cn/t6/skin/"][href*="/skin.css?"]');
        if (!skinCss) return;
        version = ((skinCss.href.match(/version=([a-fA-F0-9]*)/) || [])[1]) || '';
        skinStyle = skinCss.cloneNode(); skinStyle.id = 'yawf-skin_style';
        setSkinId(id);
      }
      var isHome = document.body.classList.contains('FRAME_main');
      if (!document.getElementById('yawf-skin_style') ||
        // 微博不能保证 id 为 skin_style 的对象唯一，所以不能用 #skin_style 选择器，神奇吧
        document.querySelector('#yawf-skin_style ~ [id="skin_style"]') ||
        (!isHome && document.querySelector('#yawf-skin_style ~ [id="custom_style"]'))
      ) {
        setSkinId(id);
        document.querySelector('head').appendChild(skinStyle);
      }
      // 如果是首页，而且使用了自定义模板；保证自定义模板优先级（但是在个人主页上覆盖自定义模板）
      if (isHome && document.querySelector('[id="custom_style"] ~ #yawf-skin_style')) {
        var custom_style_list = document.querySelectorAll('[id="custom_style"]');
        var custom_style = custom_style_list[custom_style_list.length - 1];
        skinStyle.parentNode.insertBefore(custom_style, skinStyle.nextSibling);
      }
    };
    observer.dom.add(setSkin);
  },
  'init': function () {
    var that = this;
    var query = util.str.parsequery(location.search.slice(1));
    var skinId = query.skinId; if (!skinId) return;
    var name = skin[skinId.replace(/\d+$/, '')]['_' + skinId.replace(/^\D+/, '')]; if (!name) return;
    var confirm = util.ui.confirm('yawf-use-skin', {
      'title': util.str.fill('{{setSkinByPreview}}'),
      'text': util.str.fill('{{{setSkinByPreviewDesc}}}', { 'name': name }),
      'onOk': function () {
        that.putconf(true);
        that.ref.skin.putconf(skinId);
        delete query.skinId;
        location.search = '?' + util.str.toquery(query);
      },
    });
    confirm.dom.style.zIndex = '10001';
  },
}).addto(filter.groups.style);

// 微博相关样式
filter.predef.subtitle('style', 'sweibo', '{{weiboStyleTitle}}');

// 微博作者与正文同行
filter.items.style.sweibo.no_weibo_space = filter.item({
  'group': 'sweibo',
  'version': 331,
  'type': 'boolean',
  'key': 'weibo.tool.unwrapText',
  'text': '{{unwrapTextDesc}}',
  'ainit': function () {
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_feed_type .WB_detail > .WB_info, .WB_detail > .WB_info ~ .WB_text,
      .WB_feed_type .WB_detail .WB_expand > .WB_info, .WB_expand > .WB_info ~ .WB_text { display: inline; word-wrap: break-word; }

      .WB_feed_type .WB_detail > .WB_info::after, .WB_expand > .WB_info::after { content: "："; }
      .WB_feed_type .WB_detail > .WB_info ~ .WB_text::before { display: block; float: right; content: " "; width: 14px; height: 1px; }

      .WB_feed_type .WB_detail > .WB_info + .WB_from { display: none; }

      .WB_feed_type[yawf-hide_box] .WB_detail > .WB_info ~ .WB_text::before { width: 37px; }
      .WB_feed_type .WB_detail > .WB_info ~ .WB_text + .WB_from { margin-top: 1em; }

      .WB_feed.WB_feed_v3 .WB_face .opt { margin: 10px 0 0 0; position: static; right: auto; top: auto; }

      [id^="Pl_Core_WendaList__"] .WB_feed_type .WB_detail > .WB_info ~ .WB_text::before { width: 68px; }
    */ noop(); }));
  },
}).addto(filter.groups.style);

// 替换微博内的换行为其他符号
filter.items.style.sweibo.no_weibo_break = filter.item({
  'group': 'sweibo',
  'version': 323,
  'type': 'boolean',
  'key': 'weibo.tool.unwrapContent',
  'text': '{{unwrapContent}}',
  'ref': {
    'text': {
      'type': 'select',
      'default': '⏎',
      'select': [
        { 'value': ' ', 'text': ' ' },
        { 'value': ' / ', 'text': '/' },
        { 'value': '⤶', 'text': '⤶' },
        { 'value': '↵', 'text': '↵' },
        { 'value': '⏎', 'text': '⏎' },
        { 'value': '↲', 'text': '↲' },
        { 'value': '↩', 'text': '↩' },
      ],
    },
    'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{unwrapContentDesc}}' }
  },
  'ainit': function () {
    observer.dom.add(function () {
      var br = Array.from(document.querySelectorAll('.WB_text br'));
      br.forEach(function (b) {
        var p = util.dom.create('span', '');
        p.className = 'yawf-linebreak';
        b.parentNode.replaceChild(p, b);
      });
    });
    util.css.add('.yawf-linebreak::before { content: "' + this.ref.text.conf + '" }');
  },
}).addto(filter.groups.style);

// 缩小图片大小到正常尺寸
filter.items.style.sweibo.image_size = filter.item({
  'group': 'sweibo',
  'version': 331,
  'type': 'boolean',
  'key': 'weibo.tool.image_size',
  'text': '{{imageSize}}',
  'ref': {
    'repost': { 'type': 'boolean' },
    'i': { 'type': 'sicon', 'icon': 'warn', 'text': '{{imageSizeDesc}}' }
  },
  'ainit': function () {
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_feed.WB_feed_v3 .WB_media_a { margin: -2px 0 0 6px; width: 258px; }
      .WB_feed.WB_feed_v3 .WB_media_a_mn .WB_pic { width: 80px; height: 80px; }
      .WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic { width: 80px !important; height: 80px !important; }
      .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic { max-width: 120px; max-height: 120px; min-width: 36px; height: auto !important; width: auto !important; }
      .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic img { max-height: 120px; max-width: 120px; width: auto; height: auto; position: static; -webkit-transform: none; transform: none; }
      .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_video { width: 120px; height: 80px; min-width: 36px; }
      .WB_feed.WB_feed_v3 .WB_media_a_m4 { width: 172px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec { height: 100px; width: 316px; border: 1px solid rgba(127,127,127,0.3); box-shadow: 0 0 2px rgba(0,0,0,0.15); border-radius: 2px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_pic { height: 100px; width: 100px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_info { height: 88px; width: 202px; padding: 7px 4px 5px 10px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_b2 .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec_b2 .WB_feed_spec_pic img, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_pic img { height: auto; min-height: 100px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_b .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec2 .WB_feed_spec_pic { height: 100px; width: 250px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_b, .WB_feed.WB_feed_v3 .WB_feed_spec_c, .WB_feed.WB_feed_v3 .WB_feed_spec2 { width: 250px; height: auto; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_info { float: right; height: 88px; padding: 7px 4px 5px 10px; width: 202px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_b .WB_feed_spec_info, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_info, .WB_feed.WB_feed_v3 .WB_feed_spec2 .WB_feed_spec_info { float: none; height: auto; width: auto; padding: 10px 5px 0; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_b .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_tit, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_tit, .WB_feed.WB_feed_v3 .WB_feed_spec2 .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_tit { font-size: inherit; font-weight: 700; margin: 0 0 6px; }
      .WB_feed.WB_feed_v3 .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_brieftxt { line-height: 15px; height: 30px; }

      .layer_feedimgshow .WB_feed.WB_feed_v3 .WB_media_a { margin: 0; width: auto; }
      .layer_feedimgshow .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic { max-width: none; max-height: none; min-width: auto; }
      .layer_feedimgshow .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic img { max-width: 260px; max-width: 40vw; max-height: 260px; max-height: 40vh; min-width: auto; }

      .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_video.WB_video_h5 { width: auto; height: auto; display: table; }
      .WB_h5video.hv-s1, .WB_h5video.hv-s3-2, .WB_h5video.hv-s3-5 { width: 120px; height: 80px; max-width: 120px; max-height: 80px; min-width: 36px; }
      .WB_h5video.hv-s1 video, .WB_h5video.hv-s3-2 video, .WB_h5video.hv-s3-5 video { max-width: 100%; max-height: 100%; }
      .WB_h5video.hv-s3.hv-s3-2 .con-4,
      .WB_h5video.hv-s3.hv-s3-5 .con-4 { opacity: 1; z-index: 1; }
      .WB_h5video.hv-s3.hv-s3-2:hover .con-6,
      .WB_h5video.hv-s3.hv-s3-5:hover .con-6,
      .WB_h5video.hv-s3.hv-s3-5 .con-3 .box-2 em,
      .WB_h5video .con-3.hv-s3-3 .box-3 { opacity: 0; z-index: 0; }

    */ noop(); }).replace(/\/\/.*\n/g, '\n'));
    if (this.ref.repost.conf) util.css.add(util.str.cmt(function () { /*!CSS
      .WB_feed.WB_feed_v3 .WB_feed_expand .W_arrow_bor { display: block; }
      .WB_feed.WB_feed_v3 .WB_expand_media { margin: 2px 0 8px; padding: 12px 16px 16px; }
      .WB_feed.WB_feed_v3 .WB_expand { margin: 0 0 10px; padding: 10px 16px 13px; }
      .WB_feed.WB_feed_v3 .WB_expand .WB_func { margin: 0; }
      .WB_feed.WB_feed_v3 .WB_expand_media_box { margin: 0;  }
      .WB_feed.WB_feed_v3 .WB_expand .WB_expand_media { padding: 0 0 5px; margin: 0; }
      .WB_feed.WB_feed_v3 .WB_media_view { margin: 6px auto 0; }
      .WB_feed.WB_feed_v3 .WB_media_view, .WB_feed.WB_feed_v3 .WB_media_view .media_show_box li { width: 440px; }
      .WB_feed.WB_feed_v3 .WB_media_view .media_show_box ul { margin-left: -32px; padding-left: 32px; }
      .WB_feed.WB_feed_v3 .artwork_box { width: 440px; }
      .WB_feed.WB_feed_v3 .WB_media_view .media_show_box img { max-width: 440px; height: auto; }
      .WB_feed.WB_feed_v3 .layer_view_morepic .view_pic { padding: 0 40px 20px; }
      .WB_feed.WB_feed_v3 .WB_media_view .pic_choose_box .stage_box { width: 440px; }
    */ noop(); }).replace(/\/\/.*\n/g, '\n'));
    if (
      !filter.items.style.layout.width_weibo.conf ||
      filter.items.style.layout.width_weibo.ref.width.conf < 650 &&
      this.ref.repost.conf
    ) util.css.add(util.str.cmt(function () { /*!CSS
      .WB_h5video { margin-left: -22px; }
      .WB_h5video.hv-s1, .WB_h5video.hv-s3-2, .WB_h5video.hv-s3-5 { margin-left: 0; }
    */ noop(); }).replace(/\/\/.*\n/g, '\n'));
    // FIXME 八图或九图时，展开后图片列表显示不完整
  },
}).addto(filter.groups.style);

// 去除微博间的缝隙
filter.items.style.sweibo.no_weibo_space = filter.item({
  'group': 'sweibo',
  'version': 331,
  'type': 'boolean',
  'key': 'weibo.tool.no_weibo_space',
  'text': '{{noWeiboSpace}}',
  'ainit': function () {
    if (location.href.indexOf('/ttarticle/p/show') !== -1) return;
    // FIXME 等全面推新版之后把最后两条样式整合进去，并修改把日期来源换到最后功能中的相关样式
    // 最后一行是为了取消转发样式恢复后额外添加的10像素外边距
    util.css.add(util.str.cmt(function () { /*!CSS

      .WB_feed .WB_cardwrap { padding: 0 !important; margin: 0 !important; box-shadow: none !important; border-radius: 0 !important; }
      .WB_feed .WB_feed_type { border-top: 1px solid rgba(128, 128, 128, 0.3) !important; padding: 0 0 10px 0 !important; margin: -1px 0 1px !important; box-shadow: none !important; border-radius: 0 !important; }
      .WB_feed { box-shadow: 0 0 2px rgba(0, 0, 0, 0.2) !important; }

      .WB_feed_type .WB_feed_handle > .WB_handle, .WB_feed_type .WB_feed_handle > .WB_handle .WB_row_line .line { height: 16px !important; line-height: 15.6px !important; padding: 0 !important; margin: 0 !important; border: 0 !important; }
      .WB_feed_type .WB_feed_handle > .WB_handle { display: inline-block !important; float: right !important; margin: 0 8px 0 -600px !important; position: relative !important; top: -26px !important; overflow: visible !important; width: auto; }
      .WB_feed_type .WB_feed_handle .WB_row_line { border-top: 0 none !important; padding-bottom: 11px !important; margin-bottom: 11px !important; overflow: hidden !important; width: auto; }
      .WB_feed_type .WB_feed_handle .WB_row_line li { border-right: 1px solid rgba(127, 127, 127, 0.2) !important; position: relative !important; right: -1px !important; padding: 0 10px !important; margin: 2px 0 !important; height: 12px !important; overflow: visible !important; width: auto; }
      .WB_feed_type .WB_feed_handle .WB_row_line li a { margin: -2px 0 !important; padding: 0; }
      .WB_feed_type .WB_feed_handle .WB_row_line .line .icon_praised_b, .WB_feed_type .WB_feed_handle .WB_row_line .line .icon_praised_bc { margin: 1px 0 0 !important; }
      .WB_feed_type .WB_feed_handle .WB_row_line .W_arrow_bor { top: 0px !important; }
      .WB_feed_repeat, .WB_feed_together { margin-bottom: -10px !important; padding-bottom: 10px !important; }

      .WB_feed [node-type="feed_list_timeTip"], .WB_feed .yawf-timeTip { height: 30px !important; margin: -16px 0 -15px !important; background: transparent !important; text-align: center !important; }
      .WB_feed [node-type="feed_list_timeText"], .WB_feed .yawf-timeTip div { display: inline-block !important; color: rgba(128, 128, 128, 0.6) !important; }

      .WB_feed .WB_detail::after { content: " "; display: block; height: 36px; width: 100%;  }
      .WB_feed .WB_sonFeed .WB_detail::after { display: none; }
      .WB_feed .WB_detail > .WB_from:last-child { margin: 10px 0 -31px 0; }
      .WB_feed .WB_expand, .WB_feed.WB_feed.WB_feed_v3 .WB_expand { margin-bottom: 0; }
    */ noop(); }).replace(/\/\/.*\n/g, '\n'));
  },
}).addto(filter.groups.style);

// 把来源换到微博最后面去
filter.items.style.sweibo.from_in_bottom = filter.item({
  'group': 'sweibo',
  'version': 331,
  'type': 'boolean',
  'key': 'weibo.tool.from_in_bottom',
  'text': '{{fromInBottom}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{fromInBottomDesc}}' } },
  'ainit': function () {
    observer.weibo.onload(function (feed) {
      var from = feed.querySelector('.WB_detail > .WB_info + .WB_from');
      if (from) from.parentNode.appendChild(from);
    });
    util.css.add(util.str.cmt(function () { /*!CSS
      .WB_feed.WB_feed_v3 .WB_detail::after { content: " "; display: block; height: 36px; width: 100%;  }
      .WB_feed.WB_feed_v3 .WB_sonFeed .WB_detail::after { display: none; }
      .WB_feed.WB_feed_v3 .WB_detail > .WB_from:last-child { margin: 10px 0 -31px 0; }
      .WB_feed.WB_feed_v3 .WB_expand { margin-bottom: 0; }
    */ noop(); }));
  },
}).addto(filter.groups.style);

// 把来源换到微博最后面去
filter.items.style.sweibo.user_page_no_author = filter.item({
  'group': 'sweibo',
  'version': 369,
  'type': 'boolean',
  'key': 'weibo.tool.user_page_no_author',
  'text': '{{userPageNoAuthor}}',
  'ref': {
    'who': {
      'type': 'select',
      'default': 'all',
      'select': [
        { 'value': 'mine', 'text': '{{userPageNoAuthorMine}}' },
        { 'value': 'all', 'text': '{{userPageNoAuthorAll}}' },
      ],
    }
  },
  'ainit': function () {
    if (this.ref.who.conf === 'mine' && util.info.oid() !== util.info.uid) return;
    util.css.add(util.str.cmt(function () { /*!CSS
      .FRAME_page [id^="Pl_Official_MyProfileFeed__"] .WB_feed_v3:not(.WB_feed_v3_one) .WB_feed_type .WB_feed_detail .WB_face,
      .FRAME_page [id^="Pl_Official_MyProfileFeed__"] .WB_feed_v3:not(.WB_feed_v3_one) .WB_feed_type .WB_feed_detail .WB_detail > .WB_info { display: none; }
      .FRAME_page [id^="Pl_Official_MyProfileFeed__"] .WB_feed_v3:not(.WB_feed_v3_one) .WB_feed_type .WB_detail { margin-left: 0; }
    */ noop(); }));
    if (!filter.items.style.sweibo.image_size.conf || !filter.items.style.sweibo.image_size.ref.repost.conf)
      util.css.add('.FRAME_page [id^="Pl_Official_MyProfileFeed__"] .WB_feed_v3:not(.WB_feed_v3_one) .WB_feed_type .WB_expand { margin-left: -20px; padding-left: 40px; }');
  },
}).addto(filter.groups.style);

// 鼠标滑过折叠微博时自动展示内容
filter.items.style.sweibo.hover_show_fold = filter.item({
  'group': 'sweibo',
  'version': 68,
  'type': 'boolean',
  'key': 'weibo.tool.hover_show_fold',
  'text': '{{hoverShowFold}}',
  'ainit': function () {
    util.css.add(util.str.cmt(function () { /*!CSS
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_detail:not(:hover) { max-height: 1000px; }
    */ noop(); }));
  },
}).addto(filter.groups.style);

// 折叠微博外观
filter.items.style.sweibo.fold_text = filter.item({
  'group': 'sweibo',
  'version': 88,
  'type': 'boolean',
  'key': 'weibo.tool.fold_text',
  'ref': {
    'text': {
      'type': 'select',
      'default': 'author-reason',
      'select': [
        { 'value': 'author', 'text': '{{foldedWeiboTextAuthorDesc}}' },
        { 'value': 'reason', 'text': '{{foldedWeiboTextReasonDesc}}' },
        { 'value': 'author-reason', 'text': '{{foldedWeiboTextAuthorReasonDesc}}' },
      ],
    },
  },
  'text': '{{foldedWeiboTextDesc}}',
  'init': function () {
    var types = ['author', 'reason'], that = this;
    var enabled = types.map(function (type) { return that.conf && that.ref.text.conf.indexOf(type) !== -1; });
    util.css.add(function genCss(index, chosen, prefix) {
      if (index === types.length)
        return '[node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]' +
          chosen + '::before ' +
          '{ content: ' + util.str.fill('{{{' + prefix + '}}}') + '; }\n';
      var type = types[index], typed = '[yawf-' + type + ']';
      return [false, true].map(function (chose) {
        return genCss(index + 1,
          chose ? typed + chosen : chosen + ':not(' + typed + ')',
          prefix + (chose && enabled[index] ? type[0].toUpperCase() + type.slice(1) : ''));
      }).join('');
    }(0, '', 'foldedWeiboText'));
  },
}).addto(filter.groups.style);

if (function () {
  var d = document.createElement('div').style;
  return 'order' in d || 'MozOrder' in d || 'WebkitOrder' in d;
}()) (function () {

  // 生成一个下拉框的选项
  var reorderItemBase = function (options, base) {
    return function (def) {
      return {
        'type': 'select',
        'default': def,
        'select': options.map(function (n) {
          return { 'value': n, 'text': '{{' + base + n[0].toUpperCase() + n.slice(1) + '}}' };
        }),
      };
    };
  };

  // 保证几个下拉框的东西不一样
  var keepDif = function (key, defaults) {
    var nums = Array(defaults.length).join().split(',');
    var keys = nums.map(function (_, i) { return key + '.' + (i + 1); });
    keys.forEach(function (k, i) {
      util.config.onput(k, function (val, oldval) {
        // 设置必须在选项中选择
        if (defaults.indexOf(val) === -1) util.config.put(k, defaults[i]);
        // 而且他们得各不一样
        else util.func.call(function () {
          var conf = keys.map(function (t) { return util.config.get(t); });
          var others = defaults.filter(function (v) { return conf.indexOf(v) === -1; }), o = 0;
          conf.forEach(function (v, j) {
            if (v === val && j !== i) util.config.put(keys[j], others[o++]);
          });
        }); // delay
      }); // onput
    }); // keys.forEach
  };

  // 重新排列微博下的控制按钮
  filter.items.style.sweibo.reorder = (function () {
    var reorderItem = reorderItemBase(['pop', 'favorite', 'forward', 'comment', 'like'], 'layoutReorder');
    return filter.item({
      'group': 'sweibo',
      'version': 122,
      'type': 'boolean',
      'default': true,
      'key': 'weibo.layout.reorder',
      'text': '{{layoutReorder}}',
      'ref': {
        '1': reorderItem('pop'),
        '2': reorderItem('favorite'),
        '3': reorderItem('forward'),
        '4': reorderItem('comment'),
        '5': reorderItem('like'),
        'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{layoutReorderDesc}}' },
      },
      'init': function () { keepDif('weibo.layout.reorder', ['pop', 'favorite', 'forward', 'comment', 'like']); },
      'ainit': function () {
        var ref = this.ref;
        util.css.add('.WB_handle ul li[yawf-handle-type="fl_read"] { -moz-order: 0; -webkit-order: 0; order: 0; }' + '\n' +
        ['1', '2', '3', '4', '5'].map(function (key) {
          return '.WB_handle ul li[yawf-handle-type="fl_' + ref[key].conf + '"] { -moz-order: ' + key + '; -webkit-order: ' + key + '; order: ' + key + '; }';
        }).join('\n'));
      },
    });
  }()).addto(filter.groups.style);

  // 重新排列评论下的控制按钮
  filter.items.style.sweibo.cmtreorder = (function () {
    var reorderItem = reorderItemBase(['report', 'delete', 'conversition', 'reply', 'like'], 'layoutCommentReorder');
    return filter.item({
      'group': 'sweibo',
      'version': 220,
      'type': 'boolean',
      'default': true,
      'key': 'weibo.layout.cmtorder',
      'text': '{{layoutCommentReorder}}',
      'ref': {
        '1': reorderItem('report'),
        '2': reorderItem('delete'),
        '3': reorderItem('conversition'),
        '4': reorderItem('reply'),
        '5': reorderItem('like'),
        'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{layoutCommentReorderDesc}}' },
      },
      'init': function () { keepDif('weibo.layout.cmtorder', ['report', 'delete', 'conversition', 'reply', 'like']); },
      'ainit': function () {
        var ref = this.ref;
        util.css.add(['1', '2', '3', '4', '5'].map(function (key) {
          return '.WB_handle ul li[yawf-comment-handle-type="' + ref[key].conf + '"] { -moz-order: ' + key + '; -webkit-order: ' + key + '; order: ' + key + '; }';
        }).join('\n'));
      },
    });
  }()).addto(filter.groups.style);

}());

// 颜色相关样式
filter.predef.subtitle('style', 'color', '{{colorStyleTitle}}');

// 高亮显示白名单微博
filter.items.style.color.whitelist_highlight = filter.item({
  'group': 'color',
  'version': 18,
  'type': 'boolean',
  'key': 'weibo.tool.whitelist_highlight',
  'ref': filter.ref.rgba('#dafee4'),
  'text': '{{whitelistHighlightDesc}}',
  'ainit': function () {
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-show"] { background-color: {{color}} !important; }
    */ noop(); }), { 'color': '' + this.ref.rgba }));
  },
}).addto(filter.groups.style);

// 首页背景
filter.items.style.color.color_override = filter.item({
  'group': 'color',
  'version': 335,
  'type': 'boolean',
  'key': 'weibo.tool.color_override',
  'text': '{{colorOverride}}',
  'ref': Object.assign({},
    filter.ref.rgba('#f6f6f6', 30, 'color1', 'transparency1', 'rgba1'),
    filter.ref.rgba('#ffffff', 30, 'color2', 'transparency2', 'rgba2'),
    filter.ref.rgba('#ffffff', 30, 'color3', 'transparency3', 'rgba3'),
    { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{colorOverrideDesc}}' } }
  ),
  'ainit': function () {
    if (util.page.search) return;
    util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
      body .S_bg1, body .SW_fun_bg:hover, body .SW_fun_bg_active { background-color: {{color1}}; }
      body .S_bg2, body blockquote, body .W_btn_b, body .W_input, body .SW_fun_bg { background-color: {{color2}}; }
      body .S_bg1_br { border-color: {{color1}}; }
      body .S_bg2_br { border-color: {{color2}}; }
      body .W_input, body .send_weibo .input { background-color: {{color3}}; }

      .S_bg2 .private_list.SW_fun_bg:not(.cur),
      .WB_tab_a .tab .S_bg2 .S_bg2,
      .S_bg2 .WB_webim_page .webim_contacts_mod
      { background-color: transparent; }

      .WB_notes { background-color: {{notes}} }

      .W_arrow_bor_t i, .W_arrow_bor_t em { border-left-color: transparent; border-right-color: transparent; border-top-color: transparent; }
      .W_arrow_bor_r i, .W_arrow_bor_r em { border-bottom-color: transparent; border-right-color: transparent; border-top-color: transparent; }
      .W_arrow_bor_b i, .W_arrow_bor_b em { border-bottom-color: transparent; border-left-color: transparent; border-right-color: transparent; }
      .W_arrow_bor_l i, .W_arrow_bor_l em { border-bottom-color: transparent; border-left-color: transparent; border-top-color: transparent; }

      .WB_tab_a .tab_box_a_r2 .tab .li_first, .WB_tab_a .tab_box_a_r2 .tab .li_last { display: none; }
      .WB_tab_a .tab_box_a .tab {
        display: -moz-flex; -moz-flex-direction: row; -moz-flex-wrap: nowrap; -moz-justify-content: -moz-space-around; -moz-align-items: stretch;
        display: -webkit-flex; -webkit-flex-direction: row; -webkit-flex-wrap: nowrap; -webkit-justify-content: -webkit-space-around; -webkit-align-items: stretch;
        display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch;
      }

      .WB_tab_a .tab .t { height: 38px; }
      .WB_tab_a .tab .b { display: none; }
      .WB_tab_a .tab_box_a .tab.clearfix::after { display: none; }
      .WB_tab_a .tab_box_a .tab li { margin: 0; -moz-flex-grow: 1; -webkit-flex-grow: 1; flex-grow: 1; }
      .WB_tab_a .tab_box_a_r6 .t { width: calc(100% - 14px); }

      .search_directarea, .WB_editor_iframe { background: none; }
      .private_list_box .private_head { padding-bottom: 8px; }
      .private_list_box .private_body { margin-top: 0; }
      #weibochat { background: none; }
    */ noop(); }), {
      'color1': '' + this.ref.rgba1,
      'color2': '' + this.ref.rgba2,
      'color3': '' + this.ref.rgba3,
      'notes': '' + util.str.rgba('#fff8bf', Math.round(100 - Math.pow(100 - this.ref.transparency1.conf, 3) / 1e4)),
    }));
  },
}).addto(filter.groups.style);

// 样式
filter.predef.subtitle('style', 'css', '{{CSSTitle}}');

// 自定义样式
filter.items.style.css.userstyle = filter.item({
  'group': 'css',
  'version': 9,
  'type': 'string',
  'text': '{{userstyleTitle}}',
  'key': 'weibo.tool.userstyle',
  'init': function () {
    var conf = this.conf; GM_addStyle(conf);
    var set = this.putconf.bind(this);
    // 在 GM 中注册菜单项以支持对自定义 CSS 的修改
    // 此处并非常规设置方式，仅应在因用户加入的CSS导致无法正常显示脚本设置界面时使用。
    // 所以此处设置时不应依赖网页界面实现。
    var putconf = function (css) {
      conf = css;
      setTimeout(function () { set(css); util.config.write(); location.reload(); }, 0);
    };
    GM_registerMenuCommand(util.str.fill('{{userstyleEditDesc}}'), function () {
      var newcss = prompt(util.str.fill('{{userstyleEditDetails}}'), conf);
      if (newcss !== null) putconf(newcss);
    }, "S");
  },
}).addto(filter.groups.style);

// 脚本设置
filter.predef.group('script');
filter.items.script = {};

// 导入导出
filter.predef.subtitle('script', 'importexport', '{{configImportAndExport}}');

filter.items.script.importexport.importexport = filter.item({
  'group': 'importexport',
  'version': 6,
  'import': function (text, callback) {
    var that = this;
    // 导入成功
    var success = function () {
      util.ui.alert('yawf-config-import-success', {
        'title': util.str.fill('{{configImportSuccessTitle}}'),
        'text': util.str.fill('{{configImportSuccess}}'),
        'icon': 'succ'
      });
    };
    // 导入失败
    var error = function () {
      util.ui.alert('yawf-config-import-fail', {
        'title': util.str.fill('{{configImportFailTitle}}'),
        'text': util.str.fill('{{configImportFail}}'),
        'icon': 'error'
      });
    };
    if (!text) return error();
    // 确认导入
    util.ui.confirm('yawf-config-import-warning', {
      'title': util.str.fill('{{configImportWarningTitle}}'),
      'text': util.str.fill('{{configImportWarning}}'),
      'onOk': function () {
        var version = util.config['import'](text);
        if (version !== void 0) {
          that['export']();
          if (version > 0) {
            updater.whatsnew(version);
            success();
          }
          if (callback) callback(version);
        } else { error(); }
        return version;
      },
    });
  },
  'export': function (be) {
    var conf = util.config['export']();
    be = be || document.querySelector('a.yawf-export');
    if (be) {
      be.href = 'data:application/octet-stream;base64,' +
        util.str.base64(util.config['export']());
      be.setAttribute('download', 'yawf-config.yawf');
    }
    return conf;
  },
  'reset': function () {
    var that = this;
    util.ui.confirm('yawf-config-reset-warning', {
      'title': util.str.fill('{{configResetWarningTitle}}'),
      'text': util.str.fill('{{configResetWarning}}'),
      'onOk': function () {
        util.config.clear();
        GM_deleteValue('notification');
        GM_deleteValue('following_info_' + util.info.uid);
        GM_deleteValue('following_notice_' + util.info.uid);
        GM_deleteValue('following_list_fetching');
        GM_deleteValue('following_list_fetching_timestamp');
        GM_deleteValue('recentmid');
        GM_deleteValue('long_weibo_cache');
        that['export']();
      },
    });
  },
  'show': function () {
    var that = this;
    var dom = util.dom.create(html.configImportExport);
    var bii = dom.querySelector('input[type="file"]');
    var be = dom.querySelector('a.yawf-export');
    var br = dom.querySelector('a.yawf-reset');
    // 导入按钮
    bii.addEventListener('change', function () {
      var file = bii.files[0];
      var reader = new FileReader();
      if (file.size > (1 << 24)) that['import']();
      else reader.addEventListener('load', function () {
        that['import'](reader.result);
      });
      reader.readAsText(file);
      bii.value = '';
    });
    // 导出按钮
    that['export'](be);
    // 重置按钮
    br.addEventListener('click', that.reset.bind(that));
    return dom;
  },
}).addto(filter.groups.script);

// 从“眼不见心不烦”导入设置
var wbp = {};

wbp.config = null;

wbp.converter = util.func.catched(function () {
  var wbpConfig = wbp.config;
  var result = { 'yawf': 'WBP - YAWF Converter', 'ver': '0', 'conf': {} };
  var conf = result.conf;
  var readWbpConfig = function (key) {
    return wbpConfig[key];
  };
  wbp.converter.table().forEach(util.func.catched(function (config) {
    var wbpKey = config.wbp, yawfKey = config.yawf;
    var wbpValue = void 0;
    if (wbpKey) {
      if (Array.isArray(config.wbp)) wbpValue = wbpKey.map(readWbpConfig);
      else wbpValue = readWbpConfig(wbpKey);
    }
    var yawfValue = config.map(wbpValue);
    util.debug('WBP2YAWF %o=%o -> %o=%o', wbpKey, wbpValue, yawfKey, yawfValue);
    if (yawfKey) conf[yawfKey] = yawfValue;
  }));
  return result;
});

// 特殊转换规则
wbp.converter.rules = {};

wbp.converter.rules.keyword = {};
// 关键词到关键词的转换
wbp.converter.rules.keyword.keyword = function (keywords) {
  return keywords.filter(function (keyword) {
    // 关键词不处理正则式
    if (keyword.length > 2 && keyword[0] === '/' && keyword[keyword.length - 1] === '/') return false;
    // 加号在该脚本中作为或运算存在，使用正则式替代
    if (keyword.indexOf('+') !== -1) return false;
    return true;
  });
};
// 关键词到正则式的转换
wbp.converter.rules.keyword.regexp = function (keywords) {
  return keywords.map(function (keyword) {
    try {
      // 处理正则式的情况
      if (keyword.length > 2 && keyword[0] === '/' && keyword[keyword.length - 1] === '/') {
        return RegExp(keyword.slice(1, -1));
      }
      // 处理加号的特殊规则
      if (keyword.indexOf('+') !== -1) {
        return RegExp('^' + keyword.split('+').map(function (p) {
          return '(?=[\s\S]*' + p.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1") + ')';
        }).join(''));
      }
    } catch (e) { }
  }).filter(function (reg) {
    if (!reg) return false; // 过滤掉不是正则式的
    if ('' + reg === '/(?:)/') return false; // 不接受空正则式
    return true;
  }).map(function (reg) {
    return ('' + reg).slice(1, -1);
  });
};
// 任意一个满足即满足
wbp.converter.rules.some = function (booleans) {
  return booleans.some(Boolean);
};
// 颜色设置转换
wbp.converter.rules.color = function (color) {
  var div = document.createElement('div');
  document.body.appendChild(div);
  var rgba, name = 'transparent';
  var red = 0, green = 0, blue = 0, alpha = 0;
  try {
    div.style = 'color: ' + color + '!important';
    name = window.getComputedStyle(div).color;
    rgba = name.match(/rgba?\((.*)\)/)[1].split(',').map(Number);
    red = rgba[0]; blue = rgba[1]; green = rgba[2];
    alpha = rgba.length > 3 ? rgba[3] : 1;
  } catch (e) {}
  div.parentNode.removeChild(div);
  return { 'red': red, 'green': green, 'blue': blue, 'alpha': alpha, 'name': name };
};
wbp.converter.rules.color.hex = function (color) {
  var hex = function (n) { return ('0' + n.toString(16)).slice(-2); };
  var result = wbp.converter.rules.color(color);
  var text = '#' + hex(result.red) + hex(result.green) + hex(result.blue);
  return text;
};
wbp.converter.rules.color.transparency = function (color) {
  var result = wbp.converter.rules.color(color);
  return Math.round(result.alpha * 100);
};

wbp.unsupported = [];

// 转换表
wbp.converter.table = function () {
  var table = [];
  var nm = function (map) {
    if (map === void 0) map = util.func.identity;
    if (typeof map !== 'function') map = util.func.constant(map);
    return map;
  };
  // 定义转换规则
  var d = function (wbpKey, yawfKey, map) {
    table.push({ 'wbp': wbpKey, 'yawf': yawfKey, 'map': nm(map) });
  };
  // 模块过滤转换规则
  var m = function (wbpMod, yawfKey, map) {
    var modMap = function (hideMods) {
      var contains = function (x) { return hideMods.indexOf(x) !== -1; };
      if (Array.isArray(wbpMod)) return nm(map)(wbpMod.map(contains));
      return nm(map)(contains(wbpMod));
    };
    table.push({ 'wbp': 'hideMods', 'yawf': yawfKey, 'map': modMap });
  };
  // 使用 CSS 处理一些 YAWF 不提供设置项的隐藏模块
  var cssText = '';
  var style = function (cssInsert) { cssText += cssInsert + '\n'; };
  var c = function (wbpMod, css, description) {
    var addCss = function (enabled) {
      if (!enabled) return;
      var cssInsert;
      if (typeof css === 'function') cssInsert = css(); else cssInsert = '' + css;
      if (description) cssInsert = '/* ' + description + ' */\n' + cssInsert;
      style(cssInsert);
    };
    m(wbpMod, null, addCss);
  };
  // 无法转换的功能
  var n = function (wbpKey, yawfKey) {
    if (yawfKey) wbp.unsupported.push(yawfKey);
  };
  var r = wbp.converter.rules; // 特殊转换规则

  n(null, 'weibo.tool.load_weibo_by_search');
  n(null, 'weibo.tool.use_fast_creator');
  n(null, 'weibo.tool.use_context_menu_creator');
  d(null, 'weibo.tool.refilter', true);
  n(null, 'weibo.tool.fast_block_button');
  n(null, 'weibo.tool.block_hidden');
  n(null, 'weibo.tool.disable_lazyload');
  n(null, 'weibo.other.group_account');
  n(null, 'weibo.other.group_same_account');
  n(null, 'weibo.other.auto_load_new_weibo');
  n(null, 'weibo.other.auto_expand.etypes');
  n(null, 'weibo.other.auto_expand.background');
  n(null, 'weibo.other.auto_expand');
  n(null, 'weibo.other.desktop_notification.types');
  n(null, 'weibo.other.desktop_notification.autohide');
  n(null, 'weibo.other.desktop_notification.shorten');
  n(null, 'weibo.other.desktop_notification.shortlen');
  n(null, 'weibo.other.desktop_notification.duration');
  n(null, 'weibo.other.desktop_notification.durationc');
  n(null, 'weibo.other.desktop_notification.ntypes');
  n(null, 'weibo.other.desktop_notification');
  d('whiteKeywords', 'weibo.filters.keyword.whitelist', r.keyword.keyword); // 白名单 包含下列关键词的微博不会被屏蔽 // ⚠️ 微博内容处理方式不同
  d('blackKeywords', 'weibo.filters.keyword.blacklist', r.keyword.keyword); // 黑名单 包含下列关键词的微博将被屏蔽 // ⚠️ 微博内容处理方式不同
  d('grayKeywords', 'weibo.filters.keyword.foldlist', r.keyword.keyword); // 灰名单 包含下列关键词的微博将被屏蔽并提示 // ⚠️ 微博内容处理方式不同
  d('whiteKeywords', 'weibo.filters.regexp.whitelist', r.keyword.regexp); // 白名单 包含下列关键词的微博不会被屏蔽 // ⚠️ 微博内容处理方式不同
  d('blackKeywords', 'weibo.filters.regexp.blacklist', r.keyword.regexp); // 黑名单 包含下列关键词的微博将被屏蔽 // ⚠️ 微博内容处理方式不同
  d('grayKeywords', 'weibo.filters.regexp.foldlist', r.keyword.regexp); // 灰名单 包含下列关键词的微博将被屏蔽并提示 // ⚠️ 微博内容处理方式不同
  d('filterName', 'weibo.content.types_mention'); // 在用户名中搜索关键词
  d(null, 'weibo.content.types_topic', true);
  d(null, 'weibo.content.types_stock', false);
  d(null, 'weibo.content.types_linkt', false);
  d(null, 'weibo.content.types_linku', false);
  d('filterSmiley', 'weibo.content.types_emotion'); // 允许表情关键词
  d(['tipTextColor', 'tipBackColor'], null, function (color) {
    if (color[0] === '#FF8080' && color[1] === '#FFD0D0') return; // 如果使用默认值，则导入后仍然使用默认值
    style('/* 折叠微博颜色 */\n' + util.str.fill(util.str.cmt(function () { /*!CSS
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]::before { color: {{text}}; background-color: {{back}}; border-color: {{text}} }
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover::before { color: #40d040; background-color: #d0ffd0;  border-color: #40d040 }
    */ noop(); }), {
      'text': r.color(color[0]).name,
      'back': r.color(color[1]).name,
    }));
  });
  n(null, 'weibo.filters.account.whitelist');
  d('userBlacklist', 'weibo.filters.account.blacklist'); // 如果一条微博的发布者或转发原文的作者为下列用户之一，微博将被屏蔽。
  n(null, 'weibo.filters.account.foldlist');
  n(null, 'weibo.filters.accountf.blacklist');
  n(null, 'weibo.filters.accountf.foldlist');
  n(null, 'weibo.original.blacklist_d');
  n(null, 'weibo.filters.original.whitelist');
  d('userBlacklist', 'weibo.filters.original.blacklist'); // 如果一条微博的发布者或转发原文的作者为下列用户之一，微博将被屏蔽。
  n(null, 'weibo.filters.original.foldlist');
  n(null, 'weibo.filters.mention.whitelist');
  n(null, 'weibo.filters.mention.blacklist');
  n(null, 'weibo.filters.mention.foldlist');
  n(null, 'weibo.filters.topic.whitelist');
  n(null, 'weibo.filters.topic.blacklist');
  n(null, 'weibo.filters.topic.foldlist');
  n(null, 'weibo.filters.rtopic.whitelist');
  n(null, 'weibo.filters.rtopic.blacklist');
  n(null, 'weibo.filters.rtopic.foldlist');
  n(null, 'weibo.filters.source.whitelist');
  d('sourceKeywords', 'weibo.filters.source.blacklist'); // 黑名单 来源名称包含下列关键词的微博将被屏蔽 // ⚠️ 该脚本是子串过滤，这里是全字过滤。
  d('sourceGrayKeywords', 'weibo.filters.source.foldlist'); // 灰名单 来源名称包含下列关键词的微博将被屏蔽并提示  // ⚠️ 该脚本是子串过滤，这里是全字过滤。
  n(null, 'weibo.filters.hyperlink.whitelist');
  d('URLKeywords', 'weibo.filters.hyperlink.blacklist'); // 如果一条微博中包含链接且目标地址中包含下列关键词，微博将被屏蔽（无提示）。
  n(null, 'weibo.filters.hyperlink.foldlist');
  n(null, 'weibo.filters.linktitle.whitelist');
  n(null, 'weibo.filters.linktitle.blacklist');
  n(null, 'weibo.filters.linktitle.foldlist');
  d('filterOthersOnly', 'weibo.other.my_weibo'); // 不要屏蔽我自己发布的微博
  d('filterOthersOnly', 'weibo.other.my_original'); // 不要屏蔽我自己发布的微博
  n(null, 'weibo.other.mention_me');
  n('filterPaused', null); // 暂停屏蔽：选中时暂时停止屏蔽微博 // ⚠️ YAWF未提供该功能
  d('filterPromotions', 'weibo.other.ad_feed'); // 屏蔽推广微博 // ⚠️ YAWF 的过滤规则更宽松
  d(['filterHot', 'filterLiked'], 'weibo.other.fans_top', r.some); // 屏蔽热门微博（粉丝头条） & 屏蔽好友赞过的微博
  n(null, 'weibo.other.product_card');
  d('filterTaobao', 'weibo.other.tb_tm_wb'); // 屏蔽带有 淘宝商品 或 天猫商品 的微博 // ⚠️ YAWF还会过滤 聚划算商品 但是至今未见过聚划算商品
  n(null, 'weibo.other.weibo_pay_gift');
  m('TimelineMods', 'weibo.other.fake_weibo'); // 时间线嵌入模块（好友关注等）
  d('filterDeleted', 'weibo.other.deleted_forward'); // 屏蔽已删除微博的转发
  n(null, 'weibo.other.comment_and_reply');
  n(null, 'weibo.other.vote_weibo');
  n(null, 'weibo.other.red2014');
  n(null, 'weibo.other.appitem');
  n(null, 'weibo.other.wenda');
  n(null, 'weibo.other.wenwodr');
  n(null, 'weibo.other.yizhibo');
  n(null, 'weibo.other.stock');
  n(null, 'weibo.other.multi_topic.num');
  n(null, 'weibo.other.multi_topic');
  n(null, 'weibo.other.too_long');
  n(null, 'weibo.other.wei_huati');
  n(null, 'weibo.other.wei_qun');
  n(null, 'weibo.other.wei_fangtan');
  n(null, 'weibo.other.wei_gongyi');
  n(null, 'weibo.other.unauth_source');
  d('maxFlood', 'weibo.other.same_account.number', Number); // 反刷屏：来自同一用户的微博最多显示{}条
  d(null, 'weibo.other.same_account.action', 'hidden');
  d('filterFlood', 'weibo.other.same_account'); // 反刷屏：来自同一用户的微博最多显示{}条
  n(null, 'weibo.other.same_forward.number');
  n(null, 'weibo.other.same_forward.action');
  n(null, 'weibo.other.same_forward');
  n(null, 'weibo.filters.ckeyword.whitelist');
  n(null, 'weibo.filters.ckeyword.blacklist');
  n(null, 'weibo.filters.cregexp.whitelist');
  n(null, 'weibo.filters.cregexp.blacklist');
  n(null, 'weibo.filters.cuser.whitelist');
  n(null, 'weibo.filters.cuser.blacklist');
  n(null, 'weibo.filters.ctopic.whitelist');
  n(null, 'weibo.filters.ctopic.blacklist');
  n(null, 'weibo.comment.my_comment');
  n(null, 'weibo.comment.emoji_count.number');
  n(null, 'weibo.comment.emoji_count');
  n(null, 'weibo.comment.emoji_types.number');
  n(null, 'weibo.comment.emoji_types');
  n(null, 'weibo.comment.no_content');
  n(null, 'weibo.comment.with_forward');
  n(null, 'weibo.comment.with_picture.act');
  n(null, 'weibo.comment.with_picture');
  n(null, 'weibo.comment.delete_comment');
  m('Level', 'weibo.layoutHideIconLevel'); // 用户等级
  m('MemberIcon', 'weibo.layoutHideIconMember'); // 微博会员标识
  m('VerifyIcon', 'weibo.layoutHideIconApprove'); // 个人/机构认证标识
  m('VerifyIcon', 'weibo.layoutHideIconApproveCo'); // 个人/机构认证标识
  m('VerifyIcon', 'weibo.layoutHideIconApproveDead'); // 个人/机构认证标识
  m('DarenIcon', 'weibo.layoutHideIconClub'); // 微博达人标识
  m('VgirlIcon', 'weibo.layoutHideIconVGirl'); // 微博女郎标识
  n(null, 'weibo.layoutHideIconSupervisor');
  m('TaobaoIcon', 'weibo.layoutHideIconTaobao'); // 淘宝商户
  n(null, 'weibo.layoutHideIconCheng');
  m('GongyiIcon', 'weibo.layoutHideIconGongyi'); // 微公益
  m('PaiIcon', 'weibo.layoutHideIconOther'); // 随手拍2016 // ⚠️ YAWF已将随手拍和其他活动使用的图标统一为一个选项
  n(null, 'weibo.layoutHideIconZongyika');
  n(null, 'weibo.layoutHideIconYouji');
  n(null, 'weibo.layoutHideIconDouble11');
  n(null, 'weibo.layoutHideIconNight');
  m('HongbaoIcon', 'weibo.layoutHideIconRedPack'); // 让红包飞
  n(null, 'weibo.layoutHideIconRun');
  n(null, 'weibo.layoutHideIconFoolsDay');
  m('NetstarIcon', 'weibo.layoutHideIconHong'); // 超级红人节
  n('NetstarIcon', 'weibo.layoutHideIconWedding');
  n(null, 'weibo.layoutHideNavLogoImg');
  n(null, 'weibo.layoutHideNavMain');
  n(null, 'weibo.layoutHideNavTV');
  n(null, 'weibo.layoutHideNavHot');
  n(null, 'weibo.layoutHideNavGame');
  m('HotSearch', 'weibo.layoutHideNavHotSearch'); // 大家正在热搜（搜索栏）
  n(null, 'weibo.layoutHideNavNoticeNew');
  n(null, 'weibo.layoutHideNavSettingNew');
  d('noHotYellowTags', 'weibo.layoutHideNavHotTip');
  n(null, 'weibo.layoutHideLeftHome');
  n(null, 'weibo.layoutHideLeftFav');
  n(null, 'weibo.layoutHideLeftLike');
  m('HotWeibo', 'weibo.layoutHideLeftHot'); // 热门微博
  n('HotWeibo', 'weibo.layoutHideLeftTV');
  m('Friends', 'weibo.layoutHideLeftFriends'); // 好友圈
  m('ToMe', 'weibo.layoutHideLeftGroupToMe'); // 群微博
  n(null, 'weibo.layoutHideLeftNew');
  n(null, 'weibo.layoutHideLeftNews');
  n(null, 'weibo.layoutHideLeftCount');
  m('RecommendedTopic', 'weibo.layoutHideMiddleRecommendedTopic'); // 热点微话题（发布框右上）
  m('RecomFeed', 'weibo.layoutHideMiddleFeedRecommand'); // 精彩微博推荐（首页时间线）
  m('MemberTip', 'weibo.layoutHideMiddleMemberTip'); // 微博会员推广横幅（页底）
  n(null, 'weibo.layoutHideRightInfo');
  n(null, 'weibo.layoutHideRightHongBaoEntrance');
  m('MusicRecom', 'weibo.layoutHideRightRecomMusicRank'); // 亚洲新歌榜/好书榜
  m('Topic', 'weibo.layoutHideRightHotTopic'); // 热门话题
  n(null, 'weibo.layoutHideRightHotTopicExpand');
  n(null, 'weibo.layoutHideRightInterest');
  m('Member', 'weibo.layoutHideRightMember'); // 会员专区
  n(null, 'weibo.layoutHideRightGroups');
  n(null, 'weibo.layoutHideRightRecomGroupUser');
  m('Hongbao', 'weibo.layoutHideRightHongbaoRank');
  m('MovieRecom', 'weibo.layoutHideRightMovie'); // 电影热议榜
  m('AttFeed', 'weibo.layoutHideRightAttFeed'); // 好友关注动态
  n(null, 'weibo.layoutHideRightTaobaoMovie');
  m('Notice', 'weibo.layoutHideRightNotice'); // 公告栏
  m('RecomFeed', 'weibo.layoutHideWeiboRecomFeed'); // 精彩微博推荐（首页时间线）
  m('CommentTip', 'weibo.layoutHideWeiboFeedTip'); // 评论栏顶端横幅
  n(null, 'weibo.layoutHideWeiboGroupTip');
  m('MemberCover', 'weibo.layoutHideWeiboVIPBackground'); // 会员微博背景 // ⚠️ YAWF 的过滤规则更宽松
  n(null, 'weibo.layoutHideWeiboLastPic');
  n(null, 'weibo.layoutHideWeiboPicTag');
  n(null, 'weibo.layoutHideWeiboSonTitle');
  m(['TopicCard', 'LocationCard'], 'weibo.layoutHideWeiboCard', r.some); // 微博话题卡片, 微博位置卡片 // ⚠️ YAWF对所有卡片提供唯一的设置项
  n(null, 'weibo.layoutHideWeiboArticalPay');
  n(null, 'weibo.layoutHideWeiboTag');
  n(null, 'weibo.layoutHideWeiboMovieTag');
  n(null, 'weibo.layoutHideWeiboSource');
  n(null, 'weibo.layoutHideWeiboPop');
  n(null, 'weibo.layoutHideWeiboLike');
  n(null, 'weibo.layoutHideWeiboLikeComment');
  n(null, 'weibo.layoutHideWeiboForward');
  n(null, 'weibo.layoutHideWeiboFavourite');
  n(null, 'weibo.layoutHideWeiboPromoteOther');
  n(null, 'weibo.layoutHideWeiboReport');
  n(null, 'weibo.layoutHideWeiboUseCardBackground');
  n(null, 'weibo.layoutHidePersonMoveThings');
  m('ProfCover', 'weibo.layoutHidePersonCover'); // 封面图（个人主页）
  n(null, 'weibo.layoutHidePersonBGImg');
  n(null, 'weibo.layoutHidePersonBadgeIcon');
  n(null, 'weibo.layoutHidePersonVerify');
  n(null, 'weibo.layoutHidePersonEditPersonInfo');
  m('ProfStats', 'weibo.layoutHidePersonStats'); // 关注/粉丝/微博数（个人主页）
  n(null, 'weibo.layoutHidePersonMyData');
  n(null, 'weibo.layoutHidePersonSuggestUser');
  n(null, 'weibo.layoutHidePersonGroup');
  m('Relation', 'weibo.layoutHidePersonRelation'); // 关注/粉丝/微关系（个人主页）
  m('Album', 'weibo.layoutHidePersonAlbum'); // 微相册（个人主页）
  n(null, 'weibo.layoutHidePersonHotTopic');
  n(null, 'weibo.layoutHidePersonHotWeibo');
  n(null, 'weibo.layoutHidePersonUserList');
  n(null, 'weibo.layoutHidePersonHongbao');
  n(null, 'weibo.layoutHidePersonWenwoDr');
  n(null, 'weibo.layoutHidePersonTimeline');
  n(null, 'weibo.layout.pleft');
  n(null, 'weibo.layoutHideMessagesHelp');
  n(null, 'weibo.layoutHideMessagesFeedback');
  n(null, 'weibo.layoutHideMessagesYoudao');
  m('Ads', 'weibo.layoutHideOtherAds'); // 版面广告及嵌入式广告
  m('MusicPlayer', 'weibo.layoutHideOtherMusic'); // 微音乐播放器（左下角）
  n(null, 'weibo.layoutHideOtherTemplate');
  n(null, 'weibo.layoutHideOtherHomeTip');
  m('Footer', 'weibo.layoutHideOtherFooter'); // 页底链接模块
  n(null, 'weibo.layoutHideOtherWbIm');
  n(null, 'weibo.layoutHideOtherIM');
  n(null, 'weibo.layoutHideOtherTip');
  m('FeedRecom', 'weibo.layoutHideOtherRelatedWB'); // 相关推荐：单条微博右边栏
  n(null, 'weibo.layoutHideOtherRelatedArtical');
  n(null, 'weibo.layoutHideOtherSendWeibo');
  c('IMNews', '.webim_news { display: none !important }', '右下角新闻快讯'); // 因为可以在微博的设置中关闭该快讯，所以YAWF未提供该功能；关闭方法：打开聊天框，点击左下角查看全部私信右侧齿轮图标，点击“关闭新闻提醒”菜单项
  c('Stats', '#v6_pl_rightmod_myinfo .W_person_info { height: auto !important } #v6_pl_rightmod_myinfo .user_atten { display: none !important; }', '关注/粉丝/微博数'); // 未提供该功能；因为隐藏后会导致用户信息比发布框小
  d(null, 'weibo.tool.showAllMsgNav.atme', true);
  d(null, 'weibo.tool.showAllMsgNav.cmt', true);
  d(null, 'weibo.tool.showAllMsgNav.like', false);
  d(null, 'weibo.tool.showAllMsgNav.dm', true);
  d(null, 'weibo.tool.showAllMsgNav.msgbox', true);
  d(null, 'weibo.tool.showAllMsgNav.group', false);
  d(null, 'weibo.tool.showAllMsgNav.dmsub', false);
  d('showAllMsgNav', 'weibo.tool.showAllMsgNav'); // 在左边栏增加消息导航（“评论”、“私信”等）
  d('showAllGroups', 'weibo.tool.showAllGroup'); // 展开分组栏中的所有分组
  d(null, 'weibo.tool.mergeColumns.side', 'left'); // 去除首页右边栏
  d('noHomeMargins', 'weibo.tool.mergeColumns'); // 去除首页右边栏 // ⚠️ YAWF未提供去除右边栏的功能，使用将右边栏合并到左侧作为替代
  n(null, 'weibo.tool.chose_side.side');
  n(null, 'weibo.tool.chose_side');
  n(null, 'weibo.tool.filte_right_topic');
  n(null, 'weibo.tool.filte_right_topic_count.number');
  n(null, 'weibo.tool.filte_right_topic_count');
  n(null, 'weibo.tool.right_user_list');
  n(null, 'weibo.tool.right_user_list_notice._records');
  n(null, 'weibo.tool.right_user_list_notice._last');
  n(null, 'weibo.tool.right_user_list_notice');
  n(null, 'weibo.tool.hide_nav_bar');
  n(null, 'weibo.tool.fixedLeft');
  n(null, 'weibo.tool.fixedRight');
  n(null, 'weibo.tool.fixedNewFeedTip');
  n(null, 'weibo.tool.fixedOthers');
  n(null, 'weibo.tool.auto_unfold_weibo.count');
  n(null, 'weibo.tool.auto_unfold_weibo.br');
  d('showAllText', 'weibo.tool.auto_unfold_weibo'); // 展开字数超长的微博内容 // ⚠️ YAWF将默认只展开不超过200字（换行计30字）的微博，用户需要修改设置为允许展开2000字微博达到相同的效果
  d('showAllArticleText', 'weibo.tool.auto_unfold_ttartical');
  d('clearDefTopic', 'weibo.tool.clear_def_topic'); // 清除微博发布框中的默认话题
  n(null, 'weibo.tool.fast_emoji.top');
  n(null, 'weibo.tool.fast_emoji.recent');
  n(null, 'weibo.tool.fast_emoji');
  d('directAllFeeds', 'weibo.tool.redirectWeibo'); // 进入未关注人主页时默认查看全部微博
  n(null, 'weibo.tool.uncheck_follow_presenter');
  n('noDefaultGroupPub', 'weibo.tool.public_by_default');
  n(null, 'weibo.tool.cardButton');
  d('directBigImg', 'weibo.tool.viewOriginal'); // 点击“查看大图”直接打开大图
  n(null, 'weibo.tool.html5Video');
  n(null, 'weibo.tool.disable_video_menu');
  n(null, 'weibo.tool.pause_animated_image');
  n(null, 'weibo.tool.replace_link.url');
  n(null, 'weibo.tool.replace_link');
  n(null, 'weibo.tool.replace_image_emoji');
  n(null, 'weibo.other.customize_source');
  n(null, 'weibo.other.fold_child_comment');
  n(null, 'weibo.other.comment_show_all');
  n(null, 'weibo.tool.auto_check_following');
  n(null, 'weibo.other.feed_list_type');
  n(null, 'weibo.tool.show_local_time');
  n(null, 'weibo.tool.disable_desktop_notification');
  n(null, 'weibo.tool.disable_live_photo');
  d('showAllSonFeeds', null, function (enabled) {
    if (!enabled) return;
    style('/*展开所有子微博（“还有?条对原微博的转发”） */\n.WB_feed_together [node-type="feed_list_wrapForward"] { display: block !important } .WB_feed_together>a[action-type="feed_list_seeAll"], .WB_feed_together>a[action-type="feed_list_foldForward"] { display: none }');
  });
  n(null, 'weibo.tool.custom_font_family.wf');
  n(null, 'weibo.tool.custom_font_family.cf');
  n(null, 'weibo.tool.custom_font_family');
  n(null, 'weibo.tool.weibo_large_font.ratio');
  n(null, 'weibo.tool.weibo_large_font');
  d(null, 'weibo.tool.avatar_shape.shape', 'square'); // 使用方形头像
  d('squareAvatar', 'weibo.tool.avatar_shape'); // 使用方形头像
  n(null, 'weibo.tool.dark_nav_bar');
  n(null, 'weibo.tool.reorder_nav_bar');
  n(null, 'weibo.tool.nav_hide_name');
  n(null, 'weibo.tool.width_weibo.width');
  n(null, 'weibo.tool.width_weibo');
  n(null, 'weibo.tool.weibo_only.width');
  n(null, 'weibo.tool.weibo_only.key');
  n(null, 'weibo.tool.weibo_only.switch');
  n(null, 'weibo.tool.weibo_only._enabled');
  d(null, 'weibo.tool.weibo_only', true); // 启用极简阅读模式 // ⚠️ 具体样式稍有不同
  n(['readerModeIndex', 'readerModeProfile'], null); // ⚠️ YAWF 不提供通过设置开关阅读视图的选项
  d('skinID', 'weibo.tool.set_skin.skin'); // 覆盖我的首页模板设置为
  d('overrideMySkin', 'weibo.tool.set_skin'); // 覆盖我的首页模板设置为 // ⚠️ YAWF 不提供对首页和个人主页的分开设置
  n(null, 'weibo.tool.feedlist_nav_fix');
  d('unwrapText', 'weibo.tool.unwrapText'); // 微博作者与正文间不折行
  n(null, 'weibo.tool.unwrapContent.text');
  n(null, 'weibo.tool.unwrapContent');
  n(null, 'weibo.tool.image_size.repost');
  d('smallImgLayout', 'weibo.tool.image_size'); // 启用小图版式（自定义微博配图尺寸） // ⚠️ YAWF 不提供尺寸定义的功能，因为自定义尺寸可能和其他功能冲突
  d(['compactFeedToolbar', 'noHomeMargins'], 'weibo.tool.no_weibo_space', r.some); // 使用紧凑型（V5样式）微博工具栏（收藏 | 转发 | 评论 | 赞）, 在首页使用紧凑版式（去除卡片间空隙） // ⚠️ YAWF 未提供两个功能分开的设置
  d(['moveSrcToBtm', 'unwrapText', 'compactFeedToolbar'], 'weibo.tool.from_in_bottom', r.some); // 微博来源移动至微博底部
  n(null, 'weibo.tool.user_page_no_author');
  d(null, 'weibo.tool.hover_show_fold', true);
  d(null, 'weibo.tool.fold_text.text', 'author-reason');
  d(null, 'weibo.tool.fold_text', true);
  n(null, 'weibo.layout.reorder.1');
  n(null, 'weibo.layout.reorder.2');
  n(null, 'weibo.layout.reorder.3');
  n(null, 'weibo.layout.reorder.4');
  n(null, 'weibo.layout.reorder.5');
  n(null, 'weibo.layout.reorder');
  n(null, 'weibo.layout.cmtorder.1');
  n(null, 'weibo.layout.cmtorder.2');
  n(null, 'weibo.layout.cmtorder.3');
  n(null, 'weibo.layout.cmtorder.4');
  n(null, 'weibo.layout.cmtorder.5');
  n(null, 'weibo.layout.cmtorder');
  n(null, 'weibo.tool.whitelist_highlight.color');
  n(null, 'weibo.tool.whitelist_highlight.transparency');
  n(null, 'weibo.tool.whitelist_highlight');
  n(null, 'weibo.tool.color_override.color1');
  d('backColor', 'weibo.tool.color_override.color2', r.color.hex);
  n(null, 'weibo.tool.color_override.color3');
  d('backColor', 'weibo.tool.color_override.transparency1', r.color.transparency);
  d('backColor', 'weibo.tool.color_override.transparency2', r.color.transparency);
  d('backColor', 'weibo.tool.color_override.transparency3', r.color.transparency);
  n(null, 'weibo.tool.color_override'); // 设置我的首页个人主页透明背景色  // ⚠️ YAWF 不提供首页和个人主页分开的设置
  n(null, 'weibo.tool.other_background_color.color');
  n(null, 'weibo.tool.other_background_color.transparency');
  n(null, 'weibo.tool.other_background_color');
  n('useCustomStyles', null); // 自定义样式（CSS）：可用于屏蔽模块、改造版面， // ⚠️ YAWF 不提供自定义样式的开关
  d('customStyles', 'weibo.tool.userstyle', function (css) { if (cssText + css) return cssText + '\n/* 以下是自定义样式 */\n' + css; }); // 自定义样式（CSS）：可用于屏蔽模块、改造版面，
  n(null, 'script.other.auto_complete');
  n('updateNotify', null); // 更新后首次使用时显示新功能 // ⚠️ YAWF 提供了该选项，但无法通过导入脚本设置该功能
  return table;
};

wbp.showunsupport = function () {
  updater.showfuncset(
    updater.selector.keylist(wbp.unsupported),
    util.str.fill('{{wbpImportSuccessTitle}}'),
    function (count) {
      return {
        'header': util.dom.create(util.str.fill(html.wbpImportSuccessHeader)),
        'body': util.dom.create(util.str.fill(html.wbpImportSuccessBody, { 'count': count })),
      };
    }
  );
};

wbp.importer = function () {
  if (!wbp.config) return;
  if (filter.items.script.importexport.importwbp) return;
  filter.items.script.importexport.importwbp = filter.item({
    'group': 'importexport',
    'version': 0,
    'show': function () {
      var dom = util.dom.create(html.configImportWbp);
      var a = dom.querySelector('a');
      a.addEventListener('click', function () {
        var configText = JSON.stringify(wbp.converter());
        filter.items.script.importexport.importexport['import'](configText, function (version) {
          if (version !== 0) return;
          util.func.call(wbp.showunsupport);
        });
      });
      return dom;
    },
  }).addto(filter.groups.script);
};

// 检查是否安装了“眼不见心不烦”（wbp）
(function () {
  document.addEventListener('wbpPost', function getData(event) {
    wbp.config = JSON.parse(event.detail.slice(event.detail.indexOf('=') + 1));
    wbp.importer();
  });
}());

// 更新
var updater = {};
// 当前版本号
updater.currentver = (function () {
  var version = ((GM_info || {}).script || {}).version || '';
  var m = version.match(/^\d+\.\d+\.(\d+)$/);
  if (!m || !m[1] || !parseInt(m[1], 10)) return null;
  return (util.info.version = parseInt(m[1], 10));
}());

// 面向新用户的提示
updater.userguide = function () {
  util.ui.alert('yawf-user-guide', {
    'title': util.str.fill('{{installSuccessTitle}}'),
    'text': util.str.fill('{{installSuccessText}}'),
  });
};

updater.selector = {};
updater.selector.version = function (sourceVersion) {
  return function (item) {
    if (!item.version) return false;
    if (item.version <= sourceVersion) return false;
    if (item.version > updater.currentver) return false;
    if (!item.show) return false;
    return true;
  };
};
updater.selector.keylist = function (keys) {
  return function (item) {
    if (!item.key) return false;
    if (item.isref) return false;
    return keys.indexOf(item.key) !== -1;
  };
};

// 显示新功能提示
updater.showfuncset = util.func.catched(function (itemSelector, title, genContent) {
  // 列出功能
  var newFilters = filter.collection.item.list(itemSelector);
  var count = newFilters.count();
  if (count === 0) return; // 如果没有选出任何功能，则不显示对话框
  // 显示对话框
  var dialog = util.ui.dialog('yawf-funcset', title, function (inner) {
    var content = genContent(count);
    if (content.header) inner.appendChild(content.header);
    newFilters.show(content.body);
    if (content.top) content.body.insertBefore(content.top, content.body.firstChild);
    if (content.bottom) content.body.appendChild(content.bottom);
    inner.appendChild(content.body);
    if (content.footer) inner.appendChild(content.footer);
  });
  dialog.show();
  return dialog;
});

// 显示新功能提示对话框
updater.whatsnew = function (sourceVersion) {
  return updater.showfuncset(
    updater.selector.version(sourceVersion),
    util.str.fill('{{updateSuccessTitle}}'),
    function (count) {
      var footer = util.dom.create(util.str.fill(html.whatsNewFooter));
      filter.items.script.update.update._show(footer);
      return {
        'header': util.dom.create(util.str.fill(html.whatsNewHeader)),
        'body': util.dom.create(util.str.fill(html.whatsNewBody, {'count': count})),
        'bottom': util.dom.create(util.str.fill(html.whatsNewBottom)),
        'footer': footer,
      };
    }
  );
};

// 更新时显示提示信息
filter.predef.subtitle('script', 'update', '{{updateInfoTitle}}');
filter.items.script.update.update = filter.item({
  'group': 'update',
  'version': 90,
  'type': 'boolean',
  'text': '{{updateInfoDescription}}',
  'getconf': function () { return !!GM_getValue('whatsnew', true); },
  'putconf': function (value) { GM_setValue('whatsnew', !!value); return !!value; },
  'init': function () { util.config.reg('weibo._yawf_version'); },
  'ainit': function () {
    if (util.page.search) return;
    var sourceVersion = util.config.get('weibo._yawf_version', null, Number);
    if (!sourceVersion) {
      util.func.call(updater.userguide);
      util.config.put('weibo._yawf_version', updater.currentver);
    } else if (sourceVersion < updater.currentver) util.func.call(function () {
      var dialog = updater.whatsnew(sourceVersion);
      dialog.onbeforehide = function () {
        util.config.put('weibo._yawf_version', updater.currentver);
      };
    }); else if (sourceVersion > updater.currentver) {
      util.config.put('weibo._yawf_version', updater.currentver);
    }
  },
}).addto(filter.groups.script);

// 调试
filter.predef.subtitle('script', 'script', '{{scriptOtherTitle}}');

// 在搜索页面启用
filter.items.script.script.search_enable = filter.item({
  'group': 'script',
  'version': 0,
  'type': 'boolean',
  'text': '{{searchEnable}}',
  'getconf': function () { return !!GM_getValue('search_enable', false); },
  'putconf': function (value) { GM_setValue('search_enable', !!value); return !!value; },
}).addto(filter.groups.script);

// 自动补全功能
filter.items.script.script.search_enable = filter.item({
  'group': 'script',
  'version': 272,
  'type': 'boolean',
  'default': true,
  'text': '{{autoCompleteConfig}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'ask', 'text': '{{autoCompleteConfigDesc}}' } },
  'key': 'script.other.auto_complete',
  'ainit': function () {
    util.complete.enable();
  },
}).addto(filter.groups.script);

// 调试
filter.predef.subtitle('script', 'debug', '{{scriptDebugTitle}}');

if (!util.script.ismin) filter.items.script.debug.debug = filter.item({
  'group': 'debug',
  'version': 0,
  'type': 'boolean',
  'text': '{{scriptDebug}}',
  'ref': { 'i': { 'type': 'sicon', 'icon': 'warn', 'text': '{{scriptDebugDesc}}' } },
  'getconf': function () { return !!GM_getValue('debug', false); },
  'putconf': function (value) { GM_setValue('debug', !!value); return !!value; },
}).addto(filter.groups.script);

// 关于
filter.predef.subtitle('script', 'about', '{{scriptAboutTitle}}');

filter.items.script.about.remark = filter.item({
  'group': 'about',
  'type': 'remark',
  'text': '',
  'shown': function (dom) {
    dom.innerHTML = util.str.fill(html.scriptIcon + text.scriptAbout, {
      'icon': util.script.icon,
      'version': (((GM_info || {}).script || {}).version || '?') +
        (util.script.ismin ? 'M' : ''),
    });
    dom.style.minHeight = '72px';
  },
}).addto(filter.groups.script);

// 扩展
filter.predef.subtitle('script', 'extension', '{{scriptExtensionTitle}}');

filter.items.script.extension.enable = filter.item({
  'group': 'extension',
  'version': 57,
  'type': 'boolean',
  'text': '{{scriptExtensionEnable}}',
  'getconf': function () { return !!GM_getValue('extent', false); },
  'putconf': function (value) { GM_setValue('extent', !!value); return !!value; },
}).addto(filter.groups.script);

filter.items.script.extension.remark = filter.item({
  'group': 'extension',
  'type': 'remark',
  'text': '{{scriptExtensionWarning}}',
}).addto(filter.groups.script);

// 订阅
var subscribe = (function () {
  var subscribe = null;

  var addTitle = function () {
    if (subscribe) return;
    subscribe = filter.predef.group('subscribe');
    filter.predef.subtitle('subscribe', 'slist', '{{subscribeListTitle}}');
  };

  var addSubscribe = function (rules) {
    addTitle();
    filter.items.subscribe[rules.id] = filter.item({
      'group': 'slist',
      'version': 0,
      'type': 'subscribe',
      'key': 'subscribe.' + rules.id,
      'texts': rules,
      'ref': { 'rules': { 'type': 'string', 'default': 'null' } },
      'default': true,
      'shown': function (dom) {
        dom.querySelector('.yawf-subscribeDetail').href = rules.homepage;
      },
      'init': function () {
        if (!this.conf) return;
        var list = rules.rules;
          Object.keys(list).forEach(function (k) {
            filter.extent.act('weibo.filters.' + k, list[k]);
          });
      },
    }).addto(filter.groups.subscribe);
  };

  util.func.output('__YAWF_WeiboSubscribeRuleList__', function (args) {
    addSubscribe(args);
  });

  return subscribe;
}());

// 可扩展区域
var extension = (function () {
  if (!GM_getValue('extent')) return null;

  // 扩展分组
  var extensionFilterGroup = function () {
    var fg = filter.predef.group('extension');
    extensionFilterGroup = function () { return fg; };
    return extensionFilterGroup();
  };

  var yawf = (function () {
    // 暴露给外部的函数
    var yawf = {};
    var defineFunction = function (name, params, func) {
      yawf[name] = util.func.catched(function (arg) {
        func.apply(window, params.map(function (key) { return arg[key]; }));
      });
    };
    // 检查 YAWF 加载成功
    defineFunction('ping', ['callback'], function (callback) {
      util.func.catched(callback)();
    });
    // 添加一个过滤器项
    defineFunction('filter', ['details'], function (details) {
      if (details.key) details.key = 'weibo.extent.' + details.key;
      if (details.group) details.group = 'extent.' + details.group;
      details.extern = true;
      filter.item(details).addto(extensionFilterGroup());
    });
    // 向已有的内容、帐号等等过滤器中添加规则
    defineFunction('extent', ['name', 'type', 'words'], function (name, type, words) {
      var key = 'weibo.filters.' + name + '.' + type;
      filter.extent.act(key, words);
    });
    // 在过滤每条微博之前/后调用的回调函数
    defineFunction('before', ['callback'], function (callback) { observer.weibo.before(callback); });
    defineFunction('after', ['callback'], function (callback) { observer.weibo.after(callback); });
    // 对话框
    defineFunction('alert', ['id', 'details'], function (id, details) { util.ui.alert(id, details); });
    defineFunction('confirm', ['id', 'details'], function (id, details) { util.ui.confirm(id, details); });
    defineFunction('dialog', ['id', 'details'], function (id, details) {
      var dialog = util.ui.dialog(id, details.title, details.fill);
      dialog.show();
      details.shown(dialog);
    });
    return yawf;
  }());

  util.func.output('$_YAWF_$', function (args) {
    if (yawf[args.method]) util.func.call(function () { yawf[args.method](args.params); });
  });

  return yawf;
}());

var mainStyle = GM_addStyle(util.str.fill((util.str.cmt(function () { /*!CSS
  .gn_filter .W_ficon { font-family: "yawf-iconfont" !important; }
  {{yawf-icon-font}}
  // 缩小搜索框为漏斗提供空间
  .WB_global_nav .gn_search_v2 { width: 178px !important; }
  .WB_global_nav .gn_search_v2 .placeholder, .WB_global_nav .gn_search_v2 .W_input { width: 135px !important; }
  .gn_topmenulist_search { width: 180px !important; }
  @media screen and (min-width:1295px) {
    .WB_global_nav .gn_search_v2 { width: 435px !important; }
    .WB_global_nav .gn_search_v2 .placeholder, .WB_global_nav .gn_search_v2 .W_input { width: 392px !important; }
    .gn_topmenulist_search { width: 437px !important; }
  }
  @media screen and (max-width:1006px) {
    .WB_global_nav .gn_search_v2 { width: 115px !important; }
    .WB_global_nav .gn_search_v2 .placeholder, .WB_global_nav .gn_search_v2 .W_input { width: 72px !important; }
    .gn_topmenulist_search { width: 117px !important; }
  }
  .gn_topmenulist_search { min-width: 200px !important; }
  // 重置头条文章页面顶栏样式
  .WB_global_nav .W_ficon.W_ficon, .WB_global_nav .W_ficon.W_ficon:hover { background-image: none !important; background-repeat: repeat; text-indent: 0; text-align: center; }
  .WB_global_nav .ficon_send.ficon_send { background-image: linear-gradient(to bottom, #fa7d3c, #f56010) !important; }
  .WB_global_nav .ficon_send.ficon_send:hover { background: linear-gradient(to bottom, #f4712c,#f15909) !important; }
  // 设置框相关样式
  #yawf-config [node-type="inner"] { padding: 0; width: 800px; height: 480px; }
  #yawf-config .yawf-config-header { float: left; width: 160px; height: 480px; }
  #yawf-config .yawf-config-header .minitb_ul { height: 450px; width: 120px; overflow: hidden; padding: 20px 0 10px 40px; box-shadow: -4px 0 2px -2px rgba(64, 64, 64, 0.15) inset, 0 4px 2px -2px rgba(64, 64, 64, 0.15) inset; }
  #yawf-config .yawf-config-header .minitb_item { display: block; width: 120px; height: 25px; border-style: solid none; }
  #yawf-config .yawf-config-header .minitb_lk { width: 100px; padding: 0 10px; position: relative; z-index: 1; }
  #yawf-config .yawf-config-header .minitb_item:not(.current) .minitb_lk { background: none transparent; }
  #yawf-config .yawf-config-header .yawf-config-search { -webkit-appearance: none; background: none transparent; border: medium none; height: 25px; padding: 0 0 0 30px; text-align: right; width: 70px; box-sizing: content-box; position: relative; z-index: 2; }
  #yawf-config .current .yawf-cur_block { display: block; position: relative; index: 0; }
  .yawf-config-search-logo { clear: both; display: block; float: left; left: 45px; position: relative; top: -27px; transition: left linear 0.2s; cursor: text; font-weight: normal; }
  .yawf-config-header .current .yawf-config-search-logo, .yawf-config-search:focus ~ .yawf-config-search-logo { left: 15px; }
  #yawf-config .yawf-config-body { padding: 10px 20px 20px; width: 600px; max-height: 450px; overflow: auto; box-shadow: 0 4px 2px -2px rgba(64, 64, 64, 0.15) inset; }
  .yawf-window-body { position: relative; }
  #yawf-config .W_layer_title { padding-top: 8px; line-height: 30px; }
  .yawf-Layer.yawf-drag { opacity: 0.67; -webkit-user-select: none; -moz-user-select: none; user-select: none; }
  #yawf-config .profile_tab { font-size: 12px; margin: -20px -20px 20px; width: 800px; }
  .yawf-config-layer { padding-bottom: 20px; min-height: 400px; }
  .yawf-groupSubtitle, .yawf-groupRemark { margin: 5px 10px; padding: 10px 0 0 0; line-height: 20px; }
  .yawf-groupLabel { margin: 5px 10px; padding: 10px 0 0 2em; }
  .yawf-groupRemark p, .yawf-groupLabel p { padding-bottom: 5px; }
  .yawf-groupSubtitle { font-weight: bold; }
  .yawf-configInput { display: inline; }
  .yawf-configStringInput { display: block; }
  .yawf-configItem, .yawf-groupText { margin: 0 20px; padding: 0 0; }
  .yawf-configItem { line-height: 30px; }
  .yawf-groupText { line-height: 1em; }
  .yawf-groupText p { margin: 2px 0 0; }
  .yawf-configKeyInput button { padding: 0 1em; }
  .yawf-configKeyInput span { display: none; }
  .yawf-configKeyInput button:focus~span { display: inline; }
  .yawf-configItem label+label, .yawf-refConfigItem label+label { margin-left: 0.5em; }
  .yawf-configItem br+label { margin-left: 4em; }
  .yawf-whitelistFilterTitle::before, .yawf-blacklistFilterTitle::before, .yawf-foldlistFilterTitle::before { content: " "; display: inline-block; width: 0.8em; height: 0.8em; border-radius: 1em; margin-right: 0.5em; border: 1px solid white; vertical-align: middle; }
  .yawf-whitelistFilterTitle::before { background: #37c837; box-shadow: 0 0 2px #37c837; }
  .yawf-blacklistFilterTitle::before { background: #c83737; box-shadow: 0 0 2px #c83737; }
  .yawf-foldlistFilterTitle::before { background: #c8c837; box-shadow: 0 0 2px #c8c837; }
  .yawf-configString span { line-height: 16px; width: 100%; width:calc(100% - 56px); margin: -20px 10px 0; padding: 2px 10px; display: block; position: relative; top: 20px; }
  .yawf-configString textarea.W_input { width: 100%; width: calc(100% - 20px); padding-top: 20px; min-height: 80px; max-height: 400px; resize: vertical; background: linear-gradient(to bottom, #f0f0f0 0px, #f0f0f0 20px, transparent 21px, transparent 100%); background: linear-gradient(to bottom, -moz-dialog 0px, -moz-dialog 20px, transparent 21px, transparent 100%); }
  .yawf-configStringsInput, .yawf-configUsersInput { margin: 5px; }
  .yawf-configStringsItems, .yawf-configUsersItems { padding: 5px 10px; line-height: 1em; }
  .yawf-configStringsItem, .yawf-configUsersItem { display: inline-block; margin: 2px; }
  .yawf-configStringsItem.W_btn_tag { padding: 0 5px 0 10px; }
  .yawf-configStringsItem.W_btn_tag .ficon_close { margin: 0 0 0 -8px; }
  .yawf-configStringsItem { max-width: 520px; overflow: hidden; text-overflow: ellipsis; }
  .yawf-configUsersItem .shield_object_card { display: inline-block; width: 220px; }
  .yawf-configUsersItem .shield_object_card .card_bg { border: 1px solid #e6e6e6; border-radius: 2px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.02); padding: 1px 5px 1px 1px; }
  .yawf-configUsersItem .shield_object_card .card_pic { float: left; width: 50px; }
  .yawf-configUsersItem .shield_object_card .card_pic .pic_box { display: block; }
  .yawf-configUsersItem .shield_object_card .card_content { margin-left: 60px; }
  .yawf-configUsersItem .shield_object_card .object_info { margin-top: 2px; }
  .yawf-configUsersItem .shield_object_card .object_name { line-height: 22px; overflow: hidden; float: left; width: 132px;   }
  .yawf-configUsersItem .shield_object_card .other_info { line-height: 24px; }
  .yawf-configSelectAll { float: right; margin-top: -23px; height: 21px !important; line-height: 19px; }
  .yawf-configSelectAll * { line-height: 19px !important; height: 19px !important; }
  .yawf-configImportExport a { margin-left: 20px; }
  .yawf-configAdd { appearance: none; }
  #yawf-config .btn { border-top: 1px solid #ccc; margin: 15px 0 0; padding: 10px 0 0; }
  #yawf-config .btn .W_btn_b_disable:hover { border-color: #d9d9d9; }
  #yawf-config .btn .W_btn_b_disable:hover span { border-color: #ffffff; }
  .layoutFilterGroupLayer .yawf-configBoolean { display: inline-block; margin-right: 0; }
  .yawf-userstyles-tip { float: right; margin: 0 0 0 1em; }
  .yawf-configSIcon { margin: 0 0 0 0.5em; position: relative; top: 4px; }
  .yawf-bubble { max-width: 280px; }
  .yawf-bubble .yawf-configSIcon { display: none !important; }
  .yawf-refConfigItem { display: inline; }
  .yawf-config-body .WB_empty { padding-top: 100px; }
  .yawf-configSubscribe { border: 1px rgba(127, 127, 127, 0.5) solid; padding: 5px 85px 5px 85px; border-radius: 4px; position: relative; }
  .yawf-configSubscribeTitle, .yawf-configSubscribeInfo { line-height: 20px; }
  .yawf-configSubscribeTitle { height: 20px; }
  .yawf-configSubscribeInfo { height: 40px; }
  .yawf-configSubscribeIcon { display: block; position: absolute; top: 3px; left: 10px; width: 64px; height: 64px; }
  .yawf-configSubscribeButton { display: block; position: absolute; bottom: 6px; right: 10px; }
  .yawf-configSubscribeName { display: inline; font-weight: bold; }
  .yawf-configSubscribeDate { display: inline; margin-left: 1em; opacity: 0.8; }
  .yawf-configSubscribeDescription { line-height: 20px; }
  .yawf-configSubscribeButton a { display: block; margin-top: 5px; }
  .yawf-configSubscribeDisabled { opacity: 0.5; }
  .yawf-configSubscribeEnabled .yawf-subscribeEnable,
  .yawf-configSubscribeDisabled .yawf-subscribeDisable { display: none; }
  .yawf-autoCompleteList { z-index: 10001; position: absolute; min-width: 120px; }
  .yawf-autoCompleteList[yawf-complete-items="0"] { display: none; }
  // 新功能提示
  #yawf-funcset [node-type="inner"] { padding: 10px 0; width: 600px; }
  .yawf-window-header { font-size: 16px; line-height: 40px; padding: 0 20px; }
  .yawf-window-desc { font-size: 14px; }
  .yawf-window-bottom { height: 20px; }
  .yawf-window-body { max-height: 300px; overflow: auto; padding: 0 20px; }
  .yawf-window-footer { margin: 0 0 20px; color: #555; line-height: 20px; padding: 0 20px; }
  .yawf-window-footer .yawf-configItem, .yawf-groupText { margin: 0; }
  .wbp-import-success-header { font-size: 16px; line-height: 40px; padding: 0 20px; }
  .wbp-import-success-desc { font-size: 14px; }
  .wbp-import-success-body { max-height: 300px; overflow: auto; padding: 0 20px; }
  .yawf-configItem input[type="number"]:not(:focus) ~ .yawf-range-container:not(:hover) > input[type="range"]:not(:focus), .yawf-bubble input[type="range"] { display: none; }
  // 自动检查关注列表
  #yawf-following-notice [node-type="inner"] { padding: 10px 0; width: 600px; }
  #yawf-following-notice .yawf-following-notice-body { height: 280px; overflow: auto; }
  #yawf-following-notice .yawf-following-items-title { margin: 10px 0 0; font-weight: bold; }
  .yawf-window-buttons { margin-bottom: -10px; }
  // 右栏用户列表设置
  #yawf-fave-people-config [node-type="inner"] { padding: 10px 0 30px; width: 600px; }
  .yawf-fave-people-config-body { max-height: 300px; overflow: auto; padding: 0 20px; }
  // 隐藏微博
  [yawf-display$="-hidden"] { display: none !important; }
  // 未过滤时默认隐藏（但占位）
  [node-type="feed_list"] .WB_feed_type:not([yawf-display]),
  [node-type="feed_list"] .WB_feed_type .WB_feed_type:not([yawf-display]),
  [node-type="feed_list"] .WB_feed_type:not([yawf-display]) *,
  [node-type="feed_list"] .WB_feed_type .WB_feed_type:not([yawf-display]) * { visibility: hidden !important; }
  // 折叠微博
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_screen { margin-top: -40px !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .type_spe_pos,
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]>*:first-child:not(.WB_screen):not(.WB_feed_detail) { display: none !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_detail { top: 10px; min-height: 0; max-height: 0; transition: max-height 0.1s; overflow: hidden; cursor: pointer; position: relative; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_detail,
  [node-type="feed_list"].WB_feed.WB_feed_v3 .WB_feed_type[yawf-display$="-fold"] .WB_feed_vipcover .WB_feed_detail { padding-top: 0; padding-bottom: 0; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_detail + .WB_feed_handle { display: none; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] { padding: 10px 15px; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]::before { display: block; line-height: 1em; padding: 1em 20px; border: 1px solid; border-color: transparent; margin: 0 1em; width: calc(100% - 6em - 2px); cursor: pointer; opacity: 0.8; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_detail:not(:hover) { transition: max-height 0.3s; }
  // 评论
  .list_ul[node-type="feed_list_commentList"] .list_li:not([yawf-cmt-display]),
  .list_ul[node-type="comment_list"] .list_li:not([yawf-cmt-display]) { display: none; }
  .list_ul[node-type="feed_list_commentList"] [yawf-cmt-display$="hidden"],
  .list_ul[node-type="comment_list"] [yawf-cmt-display$="hidden"] { display: none; }
  .WB_media_wrap[yawf-cmt-img="hidden"] { display: none !important; }
  // Common
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover::before { opacity: 1; }
  // 其他
  .WB_feed_together .wft_users { display: none; }
  .WB_feed_together[yawf-sonfold="display"] [node-type="feed_list_wrapForward"] { display: block !important; }
  .WB_feed_together[yawf-sonfold="display"] [action-type="feed_list_seeAll"],
  .WB_feed_together[yawf-sonfold="display"] [action-type="feed_list_foldForward"] { display: none !important; }
  .yawf-range-container { background-color: #f0f0f0; background-color: -moz-dialog; position: relative; display: inline-block; margin-left: -66px; width: 81px; margin-right: -15px; -webkit-transform: rotate(270deg); transform: rotate(270deg); top: -50px; top: calc(-1em - 36px); box-shadow: 0px 12px #f0f0f0, 0px -12px #f0f0f0; box-shadow: 0px 12px -moz-dialog, 0px -12px -moz-dialog; }
  .yawf-link { word-wrap: break-word; }
  // 拖拽
  #yawf-drop-area { background: rgba(251, 251, 216, 1); opacity: 0.8; display: none; height: 230px; left: calc(50% + 260px); position: fixed; width: 230px; z-index: 9999; top: 50px; }
  #yawf-drop-area.valid { opacity: 1; }
  .yawf-drop-area-desc { height: 170px; width: 170px; margin: 16px 16px -206px 16px; padding: 10px; -moz-user-select: none; user-select: none; border: 4px dashed #ddd; border-radius: 20px; color: #000; }
  .yawf-drop-area-title { font-size: 150%; font-weight: bold; }
  .yawf-drop-area-text { padding: 10px; }
  #yawf-drop-area-content { height: 230px; width: 230px; position: relative; z-index: 10002; opacity: 0; }
  #yawf-fast-filter-chose, #yawf-fast-filter-list { padding: 20px 40px; }
  #yawf-fast-filter-text { font-weight: bold; }
  #yawf-drop-area ul { list-style: disc; margin-left: 2em; }
  // 表情输入
  .layer_faces .faces_list.yawf-faces_list { height: 79px; }
  .layer_faces .faces_list.yawf-faces_list div { display: block; height: 32px; margin: 0 0 5px; }
  .layer_faces .faces_list.yawf-faces_list span { float: left; font-weight: bold; line-height: 32px; padding: 0; text-align: center; width: 52px; margin: 0 -8px 0 0; }
  .layer_faces .faces_list.yawf-faces_list ul { float: right; margin: 0 8px; }
  .layer_faces .faces_list.yawf-faces_list li { color: transparent; }
  .layer_faces .faces_list { -webkit-user-select: none; -moz-user-select: none; user-select: none; }
  .layer_faces .faces_list li { overflow: hidden; }
  .layer_faces .faces_list img { border: 10px transparent solid; margin: -10px; }
  #yawf-face-drop-area { background: rgba(255, 255, 127, 0.5); clear: both; float: right; font-weight: bold; height: 32px; line-height: 32px; margin: -32px 8px 0; opacity: 1; padding: 0; width: 306px; }
  // 其他页面优化设置
  #v6_pl_rightmod_myinfo:empty { hegiht: 156px; }
  // 切换视图
  body #yawf-weibo-only { float: right; height: 38px; width: 80px; line-height: 38px; text-align: center; }
  // 微博按钮的平均分布
  body .WB_handle ul {
    display: -moz-flex; -moz-flex-direction: row; -moz-flex-wrap: nowrap; -moz-justify-content: -moz-space-around; -moz-align-items: stretch;
    display: -webkit-flex; -webkit-flex-direction: row; -webkit-flex-wrap: nowrap; -webkit-justify-content: -webkit-space-around; -webkit-align-items: stretch;
    display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch;
    margin-left: -4px;
  }
  body .WB_handle ul li {
    -moz-flex-grow: 1; -webkit-flex-grow: 1; flex-grow: 1;
    float: none; width: auto;
  }
  // 加载前隐藏用户名
  .WB_global_nav .gn_nav_list li .gn_name .S_txt1 { display: none; }
*/ noop(); }) + '\n').replace(/\/\/.*\n/g, '\n'), {
  'yawf-icon-font': fonts.iconfont,
}));
util.init(function (valid) {
  if (valid) return;
  try { mainStyle.textContent = ''; } catch (e2) { }
  try { mainStyle.parentNode.removeChild(mainStyle); } catch (e3) { }
}, util.priority.DEFAULT, true);

// 在加载好之前隐藏内容
(function () {
  var style = GM_addStyle('.WB_miniblog { visibility: hidden; }');
  util.init(function () {
    try { style.parentNode.removeChild(style); }
    catch (e1) { GM_addStyle('.WB_miniblog { visibility: visible !important; }'); }
    util.debug('yawf initial done');
    observer.dom.add(function fixNavBarUS() {
      // 统一海外版导航栏
      var nav_us = document.querySelector('.WB_global_nav_us');
      if (nav_us) nav_us.classList.remove('WB_global_nav_us');
    });
  }, util.priority.LAST + util.priority.AFTER + util.priority.AFTER, true);
}());

util.init(function () {
  // 废弃设置项清理
  util.config.put('weibo.tool.right_user_list_notice.records');
  util.config.put('weibo.tool.right_user_list_notice.last');
  util.config.put('weibo.layoutHideRightTemplate');
  util.config.put('weibo.layoutHidePersonTemplate');
  util.config.put('weibo.tool.my_background_color.color');
  util.config.put('weibo.tool.my_background_color.transparency');
  util.config.put('weibo.tool.my_background_color');
}, util.priority.FIRST + util.priority.AFTER);

/*!
 * 本脚本使用了以下开源项目中的代码：
 *
 * 本脚本中使用了眼不见心不烦脚本的部分代码。眼不见心不烦使用 MIT 协议，该脚本的协议如下
 * Copyright (C) 2012-2016, Fang Zhang <zhangfang.thu@gmail.com>
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 眼不见心不烦脚本的项目地址为 https://bitbucket.org/salviati/weibo-cleaner
 */

/*!
 * 本脚本使用 MIT 协议
 * The MIT License (MIT)
 * Copyright (c) 2014-2016 田生
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
 * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 * 脚本项目地址 https://github.com/tiansh/yawf
 */

