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
// @exclude           http://weibo.com/a/bind/*
// @exclude           http://weibo.com/nguide/interests
// @version           3.1.186
// @icon              data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUxpcemNSemNSemNSemNSemNSemNSemNSemNSemNSdktOumNSemNSemNSemNSemNSemNSdktOtktOtktOtktOtktOtktOtktOtktOtktOtktOtktOtktOumNSdktOsZoAhUAAAAddFJOUwAgkIAQ4MBAYPBA0KAwcLBQ0BBgIHDggDCw8JDAT2c6pQAAAiFJREFUWMPNl9lywyAMRcMOMQa7SdMV//9nNk4nqRcJhOvOVI9+OJbE5UocDn8VrBNRp3so7YWRGzBWJSAa3lZyfMLCVbF4ykVjye1JhVB2j4S+UR0FpBMhNCuDEilcKIIcjZSi3KO0W6cKUghUUHL5nktHJqW8EGz6fyTmr7dW82DGK8+MEb7ZSALYNiIkU20uMoDu4tq9jKrZYnlSACS/zYSBvnfb/HztM05uI611FjfOmNb9XgMIqSk01phgDTTR2gqBm/j4rfJdqU+K2lHHWf7ssJTM+ozFvMSG1iVV9FbmKAfXEjxDUC6KQTyDZ7KWNaAZyRLabUiOqAj3BB8lLZoSWJvA56LEUuoqty2BqZLDShJodQzZpdCba8ytH53HrXUu77K9RqyrvNaV5ptFQGRy/X78CQKpQday6zEM0+jfXl5XpAjXNmuSXoDGuHycM9tOB/Mh0DVecCcTiHBh0NA/Yfu3Rk4BAS1ICgIZEmjokS3V1YKGZ+QeV4MuTzuBpin5X4F6sEdNPWh41CbB4+/IoCP0b14nSBwUYB9R1aAWfgJpEoiBq4dbWCcBNPm5QEa7IJ3az9YwWazD0mpRzvt64Zsu6HE5XlDQ2/wREbW36EAeW0e5IsWXdMyBzhWgkAH1NU9ydqD5UWlDuKlrY2UzudsMqC+OYL5wBAT0eSql9ChOyxxoTOpUqm4Upb6ra8jE5bXiuTNk47QXiE76AnacIlJf1W5ZAAAAAElFTkSuQmCC
// @updateURL         https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.meta.js
// @downloadURL       https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.user.js
// @homepageURL       https://tiansh.github.io/yawf/
// @supportURL        https://github.com/tiansh/yawf/issues
// @author            田生 http://weibo.com/tsh90
// @copyright         田生; The MIT License
// @license           The MIT License (MIT); http://opensource.org/licenses/MIT
// @grant             GM_xmlhttpRequest
// @grant             GM_setValue
// @grant             GM_getValue
// @grant             GM_deleteValue
// @grant             GM_addStyle
// @grant             GM_registerMenuCommand
// @grant             GM_info
// @grant             unsafeWindow
// @run-at            document-start
// ==/UserScript==