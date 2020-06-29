// ==UserScript==
// @name              Yet Another Weibo Filter
// @name:zh           药方 (YAWF)
// @name:zh-CN        药方 (YAWF)
// @name:zh-HK        藥方 (YAWF)
// @name:zh-TW        藥方 (YAWF)
// @name:en           Yet Another Weibo Filter (YAWF)
// @description       Sina Weibo feed filter by keywords, authors, topics, source, etc.; Modifying webpage layout
// @description:zh    Yet Another Weibo Filter (YAWF) 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面
// @description:zh-CN Yet Another Weibo Filter (YAWF) 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面
// @description:zh-HK Yet Another Weibo Filter (YAWF) 新浪微博根據關鍵詞、作者、話題、來源等篩選微博；修改版面
// @description:zh-TW Yet Another Weibo Filter (YAWF) 新浪微博根據關鍵詞、作者、話題、來源等篩選微博；修改版面
// @description:en    Sina Weibo feed filter by keywords, authors, topics, source, etc.; Modifying webpage layout
// @namespace         https://github.com/tiansh
// @version           4.0.64
// @match             https://*.weibo.com/*
// @include           https://weibo.com/*
// @include           https://*.weibo.com/*
// @exclude           https://weibo.com/a/bind/*
// @exclude           https://account.weibo.com/*
// @exclude           https://kefu.weibo.com/*
// @exclude           https://photo.weibo.com/*
// @exclude           https://security.weibo.com/*
// @exclude           https://verified.weibo.com/*
// @exclude           https://vip.weibo.com/*
// @exclude           https://open.weibo.com/*
// @noframes
// @run-at            document-start
// @grant             GM.info
// @grant             GM.xmlHttpRequest
// @grant             GM.addValueChangeListener
// @grant             GM.listValues
// @grant             GM.getValue
// @grant             GM.setValue
// @grant             GM.deleteValue
// @grant             GM.notification
// @grant             GM.registerMenuCommand
// @grant             GM_info
// @grant             GM_xmlhttpRequest
// @grant             GM_addValueChangeListener
// @grant             GM_listValues
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_deleteValue
// @grant             GM_notification
// @grant             GM_registerMenuCommand
// @nocompat
// @connect           miaopai.com
// @connect           sina.cn
// @connect           sina.com.cn
// @connect           sinaimg.cn
// @connect           sinajs.cn
// @connect           t.cn
// @connect           weibo.com
// @icon              data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABdUExURUxpcemNSemNSemNSemNSemNSemNSemNSemNSemNSdktOumNSemNSemNSemNSemNSemNSdktOtktOtktOtktOtktOtktOtktOtktOtktOtktOtktOtktOumNSdktOsZoAhUAAAAddFJOUwAgkIAQ4MBAYPBA0KAwcLBQ0BBgIHDggDCw8JDAT2c6pQAAAiFJREFUWMPNl9lywyAMRcMOMQa7SdMV//9nNk4nqRcJhOvOVI9+OJbE5UocDn8VrBNRp3so7YWRGzBWJSAa3lZyfMLCVbF4ykVjye1JhVB2j4S+UR0FpBMhNCuDEilcKIIcjZSi3KO0W6cKUghUUHL5nktHJqW8EGz6fyTmr7dW82DGK8+MEb7ZSALYNiIkU20uMoDu4tq9jKrZYnlSACS/zYSBvnfb/HztM05uI611FjfOmNb9XgMIqSk01phgDTTR2gqBm/j4rfJdqU+K2lHHWf7ssJTM+ozFvMSG1iVV9FbmKAfXEjxDUC6KQTyDZ7KWNaAZyRLabUiOqAj3BB8lLZoSWJvA56LEUuoqty2BqZLDShJodQzZpdCba8ytH53HrXUu77K9RqyrvNaV5ptFQGRy/X78CQKpQday6zEM0+jfXl5XpAjXNmuSXoDGuHycM9tOB/Mh0DVecCcTiHBh0NA/Yfu3Rk4BAS1ICgIZEmjokS3V1YKGZ+QeV4MuTzuBpin5X4F6sEdNPWh41CbB4+/IoCP0b14nSBwUYB9R1aAWfgJpEoiBq4dbWCcBNPm5QEa7IJ3az9YwWazD0mpRzvt64Zsu6HE5XlDQ2/wREbW36EAeW0e5IsWXdMyBzhWgkAH1NU9ydqD5UWlDuKlrY2UzudsMqC+OYL5wBAT0eSql9ChOyxxoTOpUqm4Upb6ra8jE5bXiuTNk47QXiE76AnacIlJf1W5ZAAAAAElFTkSuQmCC
// @author            田生 http://weibo.com/tsh90
// @license           MPL-2.0
// @updateURL         https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.meta.js
// @downloadURL       https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.user.js
// @homepageURL       https://tiansh.github.io/yawf/
// @supportURL        https://github.com/tiansh/yawf/issues
// ==/UserScript==