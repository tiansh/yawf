// ==UserScript==
// @name 眼不见心不烦（新浪微博）
// @namespace http://weibo.com/salviati
// @description 导出眼不见心不烦脚本设置项的工具，并非眼不见心不烦脚本
// @version 0
// @grant GM_getValue
// @grant unsafeWindow
// @include http://www.weibo.com/*
// @include http://weibo.com/*
// ==/UserScript==
self == top && (uid = unsafeWindow.$CONFIG.uid) &&
prompt('wcf settings:', GM_getValue('' + uid));

