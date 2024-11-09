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
// @version           5.0.110
// @match             *://*.weibo.com/*
// @match             *://t.cn/*
// @include           *://weibo.com/*
// @include           *://*.weibo.com/*
// @include           *://t.cn/*
// @exclude           *://weibo.com/a/bind/*
// @exclude           *://account.weibo.com/*
// @exclude           *://kefu.weibo.com/*
// @exclude           *://photo.weibo.com/*
// @exclude           *://security.weibo.com/*
// @exclude           *://verified.weibo.com/*
// @exclude           *://vip.weibo.com/*
// @exclude           *://open.weibo.com/*
// @exclude           *://passport.weibo.com/*
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

/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

//#region custom implementation GM4 polyfill
/* global GM */
/* global GM_getValue, GM_setValue, GM_listValues, GM_deleteValue GM_addValueChangeListener */
/* global GM_info GM_xmlhttpRequest, GM_notification, GM_registerMenuCommand */
; (function () { // eslint-disable-line

  let base = {};
  try {
    if (typeof GM === 'object') {
      base = GM; // eslint-disable-line
    } else {
      GM = base; // eslint-disable-line
    }
  } catch (e) { /* GM not ready */ }


  if (typeof base.info !== 'object') {
    try {
      base.info = GM_info;
      const version = base.info.script.version;
      const number = Number(version.split('.')[2]);
      if (!number) throw new Error();
    } catch (infoException) {
      throw new Error('GM_info is not available.');
    }
  }

  if (typeof base.getValue !== 'function') {
    if (typeof GM_getValue !== 'function') {
      throw new Error('GM_getValue is not available.');
    }
    base.getValue = async function getValue(name, defaultValue) {
      return GM_getValue(name, defaultValue);
    };
  }

  if (typeof base.setValue !== 'function') {
    if (typeof GM_setValue !== 'function') {
      throw new Error('GM_setValue is not available.');
    }
    base.setValue = async function setValue(name, value) {
      return GM_setValue(name, value);
    };
  }

  if (typeof base.listValues !== 'function') {
    if (typeof GM_listValues !== 'function') {
      throw new Error('GM_listValues is not available.');
    }
    base.listValues = async function listValues() {
      return GM_listValues();
    };
  }

  if (typeof base.deleteValue !== 'function') {
    if (typeof GM_deleteValue !== 'function') {
      throw new Error('GM_deleteValue is not available.');
    }
    base.deleteValue = async function deleteValue(name) {
      return GM_deleteValue(name);
    };
  }

  if (typeof base.addValueChangeListener !== 'function') {
    if (typeof GM_addValueChangeListener === 'function') {
      GM.addValueChangeListener = function addValueChangeListener(name, callback) {
        GM_addValueChangeListener(name, callback);
      };
    }
  }

  if (typeof base.xmlHttpRequest !== 'function') {
    if (typeof GM_xmlhttpRequest !== 'function') {
      throw new Error('GM_xmlhttpRequest is not available.');
    }
    GM.xmlHttpRequest = function xmlHttpRequest(details) {
      return GM_xmlhttpRequest(details);
    };
  }

  if (typeof GM.notification !== 'function') {
    if (typeof GM_notification === 'function') {
      GM.notification = function notification(details, ondone) {
        return GM_notification(details, ondone);
      };
    } else if (typeof Notification === 'function') {
      GM.notification = function notification(details, ondone) {
        const notification = new Notification(details.title, {
          body: details.text,
          icon: details.image,
        });
        if (details.onclick) {
          notification.addEventListener('click', function () {
            details.onclick();
          });
        }
        if (details.ondone) {
          notification.addEventListener('close', function () {
            details.ondone();
          });
        }
      };
    }
  }

  if (typeof GM.registerMenuCommand !== 'function') {
    if (typeof GM_registerMenuCommand === 'function') {
      GM.registerMenuCommand = function registerMenuCommand(caption, commandFunc, accessKey) {
        return GM_registerMenuCommand(caption, commandFunc, accessKey);
      };
    }
  }

}());
//#endregion
//#region custom implementation interests
/**
 * 基本上没有用户会对兴趣推荐感兴趣
 * 而且兴趣推荐会在没有明确提示用户的情况下关注一批账号
 * 用户在操作时甚至不会被提示将会关注账号，以及会关注哪些账号
 * 因此这个脚本试图屏蔽该页面，且不会提供任何设置
 */
; (function () {

  if ([
    'https://weibo.com/nguide/',
    'https://www.weibo.com/nguide/',
  ].some(prefix => location.href.startsWith(prefix))) {
    location.href = '/home';
    throw new Error('YAWF | nguide page found, skip following executions');
  }

}());
//#endregion
//#region custom implementation noframes
; (function () {
  // 不是每个猴子都支持 noframes，所以额外检查一下
  if (top !== self) throw new Error('YAWF | Not in top frame, stop.');
}());
//#endregion
//#region replacement of yaofang://common/global/env.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const env = yawf.env = {};

  env.name = 'UserScript';

  const config = env.config = {};

  // STK 相关操作无法提供，因为猴子无法保证 document-start
  config.stkWrapSupported = false;
  config.stkInfoSupported = false;
  config.contextMenuSupported = false;
  config.requestBlockingSupported = false;
  config.chatInPageSupported = false;

  config.externalMenuSupported = Boolean(GM.registerMenuCommand);

  config.consolePrefix = 'YAWF';

}());
//#endregion
//#region replacement of yaofang://common/browser/browser.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const browserInfo = yawf.browserInfo = {};

  const browserName = ['Firefox', 'Chrome'].find(name => navigator.userAgent.includes(name));
  browserInfo.name = browserName || 'Unknown';

  if (browserName === 'Firefox') {
    try {
      browserInfo.fullVersion = navigator.userAgent.match(/Firefox\/([\d.]+)/)[1];
      browserInfo.majorVersion = parseInt(browserInfo.fullVersion, 10);
    } catch (fxUaErr) { /* ignore */ }
  }
  if (browserName === 'Chrome') {
    try {
      browserInfo.fullVersion = navigator.userAgent.match(/Chrome\/([\d.]+)/)[1];
      browserInfo.majorVersion = parseInt(browserInfo.fullVersion, 10);
    } catch (CrUaErr) { /* ignore */ }
  }

}());
//#endregion
//#region @require yaofang://common/util/functools.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};
  const functools = util.functools = util.functools ?? {};

  /**
   * @template T
   * @param {T & Function} f
   * @returns {T}
   */
  functools.once = function (f) {
    let executed = false, value = null;
    const name = f.name, length = f.length;
    const wrap = function (...args) {
      if (executed) return value;
      value = f(...args);
      f = null;
      executed = true;
      return value;
    };
    Object.defineProperty(wrap, 'name', { get: () => name });
    Object.defineProperty(wrap, 'length', { get: () => length });
    return wrap;
  };

}());
//#endregion
//#region @require yaofang://common/util/urls.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};
  const urls = util.urls = util.urls ?? {};

  /**
   * @param {Blob} blob
   * @returns {string}
   */
  urls.blobToDataUrl = function (blob) {
    return new Promise(resolve => {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result);
      });
      reader.readAsDataURL(blob);
    });
  };

}());
//#endregion
//#region @require yaofang://content/util/priority.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};

  util.priority = {
    FIRST: 1000,
    HIGH: 500,
    BEFORE: 100,
    DEFAULT: 0,
    AFTER: -100,
    LOW: -500,
    LAST: -1000,
  };


}());
//#endregion
//#region @require yaofang://content/util/debug.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const env = yawf.env;
  const util = yawf.util = yawf.util ?? {};

  const prefix = env.config.consolePrefix;
  const pending = [];
  const pendingOutput = (...args) => { pending.push(args); };
  const output = (message, ...args) => {
    if (typeof message === 'string') {
      console.log(`${prefix} | ${message}`, ...args);
    } else if (message !== void 0) {
      console.log(`${prefix} |`, message, ...args);
    }
  };
  const noop = () => { };

  let debug = pendingOutput;
  let debugEnabled = null;


  /** @type {Map<Function, number>} */
  const timeUsage = new Map();
  /**
   * @param {Function} func
   */
  util.performance = function (func, ...args) {
    const startTime = performance.now();
    const result = func(...args);
    const endTime = performance.now();
    const duration = endTime - startTime;
    if (debugEnabled !== false) {
      if (!timeUsage.has(func)) timeUsage.set(func, duration);
      else timeUsage.set(func, timeUsage.get(func) + duration);
      showPerformance();
    }
    return result;
  };

  let showPerformancePending = null;
  const showPerformance = function showPerformance() {
    if (showPerformancePending === false) {
      showPerformancePending = true;
    }
    if (showPerformancePending) return;
    showPerformancePending = false;
    util.debug('Performance meansure: ', timeUsage);
    setTimeout(function () {
      const showNext = showPerformancePending === true;
      showPerformancePending = null;
      if (showNext) showPerformance();
    }, 10e3);
  };

  const setEnabled = function (enabled) {
    const messages = pending.splice(0);
    debugEnabled = enabled;
    if (enabled) {
      messages.forEach(args => { output(...args); }); // eslint-disable-line
      debug = output; // eslint-disable-line
    } else {
      timeUsage.clear();
      debug = noop;
    }
  };

  util.debug = (...args) => debug(...args);
  util.debug.setEnabled = setEnabled;

  // DEBUG
  setEnabled();

}());
//#endregion
//#region @require yaofang://content/util/i18n.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};

  let language = util.language = null;
  const i18n = new Proxy(Object.create(null), {
    get: (self, key) => {
      return (self[key] || {})[language || 'cn'] || null;
    },
    set: (self, key, value) => {
      const entry = self[key] = {};
      entry.cn = value.cn;
      entry.tw = value.tw || entry.cn;
      entry.hk = value.hk || entry.tw;
      entry.en = value.en || entry.cn;
      return true;
    },
  });

  i18n.language = {
    en: 'en',
    cn: 'cn',
    hk: 'hk',
    tw: 'tw',
  };
  i18n.languageCode = {
    en: 'en',
    cn: 'zh-CN',
    hk: 'zh-HK',
    tw: 'zh-TW',
  };

  Object.defineProperty(util, 'i18n', {
    get: () => i18n,
    set: lang => {
      const lower = ('' + lang).toLowerCase();
      if (lower === 'zh-cn') language = 'cn';
      else if (lower === 'zh-hk') language = 'hk';
      else if (lower === 'zh-tw') language = 'tw';
      else if (lower === 'en') language = 'en';
      else return;
      util.language = language;
    },
  });

}());
//#endregion
//#region @require yaofang://content/util/strings.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util = yawf.util ?? {};

  const strings = util.strings = {};

  /**
   * 将微博中带有“万”或“亿”的字串转换为数字
   * 微博的“万”“亿”没有针对不同语言做处理，繁体字和英文用户也会看到这两个字
   * @param {string} str
   * @returns {number}
   */
  strings.parseint = str => {
    return Number(str.replace('万', 'e4').replace('亿', 'e8'));
  };

  /**
   * 生成一个随机字符串
   * @returns {string}
   */
  strings.randKey = () => {
    const rand = new Uint8Array(64);
    crypto.getRandomValues(rand);
    return [...rand].map(value => value.toString(16).padStart(2, 0)).join('');
  };

  /**
   * 同形汉字替换表，键为不常用汉字，值为常用汉字
   * 基于 https://www.unicode.org/Public/security/15.0.0/confusables.txt
   * 因为有太多莫名其妙的字符，所以这里用位点以免出现问题
   */
  const confusableHanTable = { 11906: 20059, 11907: 20058, 11909: 20155, 11913: 20994, 11915: 13630, 11918: 20800, 11919: 23587, 11920: 23586, 11922: 24051, 11923: 24186, 11924: 24401, 11926: 24516, 11927: 14586, 11928: 25164, 11929: 25909, 11931: 26081, 11934: 27514, 11935: 27597, 11936: 27665, 11937: 27701, 11938: 27706, 11939: 28780, 11940: 29227, 11942: 20012, 11944: 29357, 11947: 32594, 11949: 31035, 11951: 31993, 11953: 32595, 11954: 32594, 11961: 32770, 11962: 32896, 11966: 33401, 11967: 33401, 11968: 33401, 11969: 34382, 11970: 34916, 11971: 35200, 11972: 35199, 11973: 35265, 11976: 35744, 11977: 36125, 11979: 36710, 11980: 36790, 11981: 36790, 11983: 38429, 11984: 38021, 11985: 38263, 11986: 38264, 11987: 38271, 11988: 38376, 11990: 38429, 11992: 38738, 11993: 38886, 11994: 39029, 11995: 39118, 11996: 39134, 11997: 39135, 11999: 39136, 12000: 39267, 12002: 39532, 12004: 39740, 12005: 40060, 12008: 40614, 12009: 40644, 12011: 25993, 12012: 40784, 12013: 27503, 12014: 40831, 12015: 31452, 12016: 40857, 12018: 20096, 12019: 40863, 12036: 20057, 12037: 20101, 12038: 20108, 12039: 20128, 12040: 20154, 12041: 20799, 12042: 20837, 12043: 20843, 12044: 20866, 12045: 20886, 12046: 20907, 12047: 20960, 12048: 20981, 12049: 20992, 12050: 21147, 12051: 21241, 12052: 21269, 12053: 21274, 12054: 21304, 12055: 21313, 12056: 21340, 12057: 21353, 12058: 21378, 12059: 21430, 12060: 21448, 12061: 21475, 12062: 21475, 12063: 22303, 12064: 22303, 12065: 22786, 12066: 22794, 12067: 22805, 12068: 22823, 12069: 22899, 12070: 23376, 12071: 23424, 12072: 23544, 12073: 23567, 12074: 23586, 12075: 23608, 12076: 23662, 12077: 23665, 12078: 24027, 12079: 24037, 12080: 24049, 12081: 24062, 12082: 24178, 12083: 24186, 12084: 24191, 12085: 24308, 12086: 24318, 12087: 24331, 12088: 24339, 12089: 24400, 12090: 24417, 12091: 24435, 12092: 24515, 12093: 25096, 12094: 25142, 12095: 25163, 12096: 25903, 12097: 25908, 12098: 25991, 12099: 26007, 12100: 26020, 12101: 26041, 12102: 26080, 12103: 26085, 12104: 26352, 12105: 26376, 12106: 26408, 12107: 27424, 12108: 27490, 12109: 27513, 12110: 27571, 12111: 27595, 12112: 27604, 12113: 27611, 12114: 27663, 12115: 27668, 12116: 27700, 12117: 28779, 12118: 29226, 12119: 29238, 12120: 29243, 12121: 29247, 12122: 29255, 12123: 29273, 12124: 29275, 12125: 29356, 12126: 29572, 12127: 29577, 12128: 29916, 12129: 29926, 12130: 29976, 12131: 29983, 12132: 29992, 12133: 30000, 12134: 30091, 12135: 30098, 12136: 30326, 12137: 30333, 12138: 30382, 12139: 30399, 12140: 30446, 12141: 30683, 12142: 30690, 12143: 30707, 12144: 31034, 12145: 31160, 12146: 31166, 12147: 31348, 12148: 31435, 12149: 31481, 12150: 31859, 12151: 31992, 12152: 32566, 12153: 32593, 12154: 32650, 12155: 32701, 12156: 32769, 12157: 32780, 12158: 32786, 12159: 32819, 12160: 32895, 12161: 32905, 12162: 33251, 12163: 33258, 12164: 33267, 12165: 33276, 12166: 33292, 12167: 33307, 12168: 33311, 12169: 33390, 12170: 33394, 12171: 33400, 12172: 34381, 12173: 34411, 12174: 34880, 12175: 34892, 12176: 34915, 12177: 35198, 12178: 35211, 12179: 35282, 12180: 35328, 12181: 35895, 12182: 35910, 12183: 35925, 12184: 35960, 12185: 35997, 12186: 36196, 12187: 36208, 12188: 36275, 12189: 36523, 12190: 36554, 12191: 36763, 12192: 36784, 12193: 36789, 12194: 37009, 12195: 37193, 12196: 37318, 12197: 37324, 12198: 37329, 12199: 38263, 12200: 38272, 12201: 38428, 12202: 38582, 12203: 38585, 12204: 38632, 12205: 38737, 12206: 38750, 12207: 38754, 12208: 38761, 12209: 38859, 12210: 38893, 12211: 38899, 12212: 38913, 12213: 39080, 12214: 39131, 12215: 39135, 12216: 39318, 12217: 39321, 12218: 39340, 12219: 39592, 12220: 39640, 12221: 39647, 12222: 39717, 12223: 39727, 12224: 39730, 12225: 39740, 12226: 39770, 12227: 40165, 12228: 40565, 12229: 40575, 12230: 40613, 12231: 40635, 12232: 40643, 12233: 40653, 12234: 40657, 12235: 40697, 12236: 40701, 12237: 40718, 12238: 40723, 12239: 40736, 12240: 40763, 12241: 40778, 12242: 40786, 12243: 40845, 12244: 40860, 12245: 40864, 12344: 21313, 12345: 21316, 12346: 21317, 63744: 35912, 63745: 26356, 63746: 36554, 63747: 36040, 63748: 28369, 63749: 20018, 63750: 21477, 63751: 40860, 63752: 40860, 63753: 22865, 63754: 37329, 63755: 21895, 63756: 22856, 63757: 25078, 63758: 30313, 63759: 32645, 63760: 34367, 63761: 34746, 63762: 35064, 63763: 37007, 63764: 27138, 63765: 27931, 63766: 28889, 63767: 29662, 63768: 33853, 63769: 37226, 63770: 39409, 63771: 20098, 63772: 21365, 63773: 27396, 63774: 29211, 63775: 34349, 63776: 40478, 63777: 23888, 63778: 28651, 63779: 34253, 63780: 35172, 63781: 25289, 63782: 33240, 63783: 34847, 63784: 24266, 63785: 26391, 63786: 28010, 63787: 29436, 63788: 37070, 63789: 20358, 63790: 20919, 63791: 21214, 63792: 25796, 63793: 27347, 63794: 29200, 63795: 30439, 63796: 32769, 63797: 34310, 63798: 34396, 63799: 36335, 63800: 38706, 63801: 39791, 63802: 40442, 63803: 30860, 63804: 31103, 63805: 32160, 63806: 33737, 63807: 37636, 63808: 40575, 63809: 35542, 63810: 22751, 63811: 24324, 63812: 31840, 63813: 32894, 63814: 29282, 63815: 30922, 63816: 36034, 63817: 38647, 63818: 22744, 63819: 23650, 63820: 27155, 63821: 28122, 63822: 28431, 63823: 32047, 63824: 32311, 63825: 38475, 63826: 21202, 63827: 32907, 63828: 20956, 63829: 20940, 63830: 31260, 63831: 32190, 63832: 33777, 63833: 38517, 63834: 35712, 63835: 25295, 63836: 27138, 63837: 35582, 63838: 20025, 63839: 23527, 63840: 24594, 63841: 29575, 63842: 30064, 63843: 21271, 63844: 30971, 63845: 20415, 63846: 24489, 63847: 19981, 63848: 27852, 63849: 25976, 63850: 32034, 63851: 21443, 63852: 22622, 63853: 30465, 63854: 33865, 63855: 35498, 63856: 27578, 63857: 36784, 63858: 27784, 63859: 25342, 63860: 33509, 63861: 25504, 63862: 30053, 63863: 20142, 63864: 20841, 63865: 20937, 63866: 26753, 63867: 31975, 63868: 33391, 63869: 35538, 63870: 37327, 63871: 21237, 63872: 21570, 63873: 22899, 63874: 24300, 63875: 26053, 63876: 28670, 63877: 31018, 63878: 38317, 63879: 39530, 63880: 40599, 63881: 40654, 63882: 21147, 63883: 26310, 63884: 27511, 63885: 36706, 63886: 24180, 63887: 24976, 63888: 25088, 63889: 25754, 63890: 28451, 63891: 29001, 63892: 29833, 63893: 31178, 63894: 32244, 63895: 32879, 63896: 36646, 63897: 34030, 63898: 36899, 63899: 37706, 63900: 21015, 63901: 21155, 63902: 21693, 63903: 28872, 63904: 35010, 63905: 35498, 63906: 24265, 63907: 24565, 63908: 25467, 63909: 27566, 63910: 31806, 63911: 29557, 63912: 20196, 63913: 22265, 63914: 23527, 63915: 23994, 63916: 24604, 63917: 29618, 63918: 29801, 63919: 32666, 63920: 32838, 63921: 37428, 63922: 38646, 63923: 38728, 63924: 38936, 63925: 20363, 63926: 31150, 63927: 37300, 63928: 38583, 63929: 24801, 63930: 20102, 63931: 20698, 63932: 23534, 63933: 23615, 63934: 26009, 63935: 27138, 63936: 29134, 63937: 30274, 63938: 34044, 63939: 36988, 63940: 40845, 63941: 26248, 63942: 38446, 63943: 21129, 63944: 26491, 63945: 26611, 63946: 27969, 63947: 28316, 63948: 29705, 63949: 30041, 63950: 30827, 63951: 32016, 63952: 39006, 63953: 20845, 63954: 25134, 63955: 38520, 63956: 20523, 63957: 23833, 63958: 28138, 63959: 36650, 63960: 24459, 63961: 24900, 63962: 26647, 63963: 29575, 63964: 38534, 63965: 21033, 63966: 21519, 63967: 23653, 63968: 26131, 63969: 26446, 63970: 26792, 63971: 27877, 63972: 29702, 63973: 30178, 63974: 32633, 63975: 35023, 63976: 35041, 63977: 37324, 63978: 38626, 63979: 21311, 63980: 28346, 63981: 21533, 63982: 29136, 63983: 29848, 63984: 34298, 63985: 38563, 63986: 40023, 63987: 40607, 63988: 26519, 63989: 28107, 63990: 33256, 63991: 31435, 63992: 31520, 63993: 31890, 63994: 29376, 63995: 28825, 63996: 35672, 63997: 20160, 63998: 33590, 63999: 21050, 64000: 20999, 64001: 24230, 64002: 25299, 64003: 31958, 64004: 23429, 64005: 27934, 64006: 26292, 64007: 36667, 64008: 34892, 64009: 38477, 64010: 35211, 64011: 24275, 64012: 20800, 64013: 21952, 64016: 22618, 64018: 26228, 64021: 20958, 64022: 29482, 64023: 30410, 64024: 31036, 64025: 31070, 64026: 31077, 64027: 31119, 64028: 38742, 64029: 31934, 64030: 32701, 64032: 34322, 64034: 35576, 64037: 36920, 64038: 37117, 64042: 39151, 64043: 39164, 64044: 39208, 64045: 40372, 64046: 37070, 64047: 38583, 64048: 20398, 64049: 20711, 64050: 20813, 64051: 21193, 64052: 21220, 64053: 21329, 64054: 21917, 64055: 22022, 64056: 22120, 64057: 22592, 64058: 22696, 64059: 23652, 64060: 23662, 64061: 24724, 64062: 24936, 64063: 24974, 64064: 25074, 64065: 25935, 64066: 26082, 64067: 26257, 64068: 26757, 64069: 28023, 64070: 28186, 64071: 28450, 64072: 29038, 64073: 29227, 64074: 29730, 64075: 30865, 64076: 31038, 64077: 31049, 64078: 31048, 64079: 31056, 64080: 31062, 64081: 31069, 64082: 31117, 64083: 31118, 64084: 31296, 64085: 31361, 64086: 31680, 64087: 32244, 64088: 32265, 64089: 32321, 64090: 32626, 64091: 32773, 64092: 33261, 64093: 33401, 64094: 33401, 64095: 33879, 64096: 35088, 64097: 35222, 64098: 35585, 64099: 35641, 64100: 36051, 64101: 36104, 64102: 36790, 64103: 36920, 64104: 38627, 64105: 38911, 64106: 38971, 64107: 24693, 64108: 148206, 64109: 33304, 64112: 20006, 64113: 20917, 64114: 20840, 64115: 20352, 64116: 20805, 64117: 20864, 64118: 21191, 64119: 21242, 64120: 21917, 64121: 21845, 64122: 21913, 64123: 21986, 64124: 22618, 64125: 22707, 64126: 22852, 64127: 22868, 64128: 23138, 64129: 23336, 64130: 24274, 64131: 24281, 64132: 24425, 64133: 24493, 64134: 24792, 64135: 24910, 64136: 24840, 64137: 24974, 64138: 24928, 64139: 25074, 64140: 25140, 64141: 25540, 64142: 25628, 64143: 25682, 64144: 25942, 64145: 26228, 64146: 26391, 64147: 26395, 64148: 26454, 64149: 27513, 64150: 27578, 64151: 27969, 64152: 28379, 64153: 28363, 64154: 28450, 64155: 28702, 64156: 29038, 64157: 30631, 64158: 29237, 64159: 29359, 64160: 29482, 64161: 29809, 64162: 29958, 64163: 30011, 64164: 30237, 64165: 30239, 64166: 30410, 64167: 30427, 64168: 30452, 64169: 30538, 64170: 30528, 64171: 30924, 64172: 31409, 64173: 31680, 64174: 31867, 64175: 32091, 64176: 32244, 64177: 32574, 64178: 32773, 64179: 33618, 64180: 33775, 64181: 34681, 64182: 35137, 64183: 35206, 64184: 35222, 64185: 35519, 64186: 35576, 64187: 35531, 64188: 35585, 64189: 35582, 64190: 35565, 64191: 35641, 64192: 35722, 64193: 36104, 64194: 36664, 64195: 36978, 64196: 37273, 64197: 37494, 64198: 38524, 64199: 38627, 64200: 38742, 64201: 38875, 64202: 38911, 64203: 38923, 64204: 38971, 64205: 39698, 64206: 40860, 64207: 141386, 64208: 141380, 64209: 144341, 64210: 15261, 64211: 16408, 64212: 16441, 64213: 152137, 64214: 154832, 64215: 163539, 64216: 40771, 64217: 40846, 194560: 20029, 194561: 20024, 194562: 20033, 194563: 131362, 194564: 20320, 194565: 20398, 194566: 20411, 194567: 20341, 194568: 20602, 194569: 20633, 194570: 20711, 194571: 20687, 194572: 13470, 194573: 132666, 194574: 20813, 194575: 20820, 194576: 20836, 194577: 20855, 194578: 132380, 194579: 13497, 194580: 20839, 194581: 20877, 194582: 132427, 194583: 20887, 194584: 20900, 194585: 20172, 194586: 20908, 194587: 20917, 194588: 168415, 194589: 20981, 194590: 20995, 194591: 13535, 194592: 21051, 194593: 21062, 194594: 21106, 194595: 21111, 194596: 13589, 194597: 21191, 194598: 21193, 194599: 21220, 194600: 21242, 194601: 21253, 194602: 21254, 194603: 21271, 194604: 21321, 194605: 21329, 194606: 21338, 194607: 21363, 194608: 21373, 194609: 21375, 194610: 21375, 194611: 21375, 194612: 133676, 194613: 28784, 194614: 21450, 194615: 21471, 194616: 133987, 194617: 21483, 194618: 21489, 194619: 21510, 194620: 21662, 194621: 21560, 194622: 21576, 194623: 21608, 194624: 21666, 194625: 21750, 194626: 21776, 194627: 21843, 194628: 21859, 194629: 21892, 194630: 21892, 194631: 21913, 194632: 21931, 194633: 21939, 194634: 21954, 194635: 22294, 194636: 22022, 194637: 22295, 194638: 22097, 194639: 22132, 194640: 20999, 194641: 22766, 194642: 22478, 194643: 22516, 194644: 22541, 194645: 22411, 194646: 22578, 194647: 22577, 194648: 22700, 194649: 136420, 194650: 22770, 194651: 22775, 194652: 22790, 194653: 22810, 194654: 22818, 194655: 22882, 194656: 136872, 194657: 136938, 194658: 23020, 194659: 23067, 194660: 23079, 194661: 23000, 194662: 23142, 194663: 14062, 194664: 14076, 194665: 23304, 194666: 23358, 194667: 23358, 194668: 137672, 194669: 23491, 194670: 23512, 194671: 23527, 194672: 23539, 194673: 138008, 194674: 23551, 194675: 23558, 194676: 24403, 194677: 23586, 194678: 14209, 194679: 23648, 194680: 23662, 194681: 23744, 194682: 23693, 194683: 138724, 194684: 23875, 194685: 138726, 194686: 23918, 194687: 23915, 194688: 23932, 194689: 24033, 194690: 24034, 194691: 14383, 194692: 24061, 194693: 24104, 194694: 24125, 194695: 24169, 194696: 14434, 194697: 139651, 194698: 14460, 194699: 24240, 194700: 24243, 194701: 24246, 194702: 24266, 194703: 172946, 194704: 24318, 194705: 140081, 194706: 140081, 194707: 33281, 194708: 24354, 194709: 24354, 194710: 14535, 194711: 144056, 194712: 156122, 194713: 24418, 194714: 24427, 194715: 14563, 194716: 24474, 194717: 24525, 194718: 24535, 194719: 24569, 194720: 24705, 194721: 14650, 194722: 14620, 194723: 24724, 194724: 141012, 194725: 24775, 194726: 24904, 194727: 24908, 194728: 24910, 194729: 24908, 194730: 24954, 194731: 24974, 194732: 25010, 194733: 24996, 194734: 25007, 194735: 25054, 194736: 25074, 194737: 25078, 194738: 25104, 194739: 25115, 194740: 25181, 194741: 25265, 194742: 25300, 194743: 25424, 194744: 142092, 194745: 25405, 194746: 25340, 194747: 25448, 194748: 25475, 194749: 25572, 194750: 142321, 194751: 25634, 194752: 25541, 194753: 25513, 194754: 14894, 194755: 25705, 194756: 25726, 194757: 25757, 194758: 25719, 194759: 14956, 194760: 25935, 194761: 25964, 194762: 143370, 194763: 26083, 194764: 26360, 194765: 26185, 194766: 15129, 194767: 26257, 194768: 15112, 194769: 15076, 194770: 20882, 194771: 20885, 194772: 26368, 194773: 26268, 194774: 32941, 194775: 17369, 194776: 26391, 194777: 26395, 194778: 26401, 194779: 26462, 194780: 26451, 194781: 144323, 194782: 15177, 194783: 26618, 194784: 26501, 194785: 26706, 194786: 26757, 194787: 144493, 194788: 26766, 194789: 26655, 194790: 26900, 194791: 15261, 194792: 26946, 194793: 27043, 194794: 27114, 194795: 27304, 194796: 145059, 194797: 27355, 194798: 15384, 194799: 27425, 194800: 145575, 194801: 27476, 194802: 15438, 194803: 27506, 194804: 27551, 194805: 27578, 194806: 27579, 194807: 146061, 194808: 138507, 194809: 146170, 194810: 27726, 194811: 146620, 194812: 27839, 194813: 27853, 194814: 27751, 194815: 27926, 194816: 27966, 194817: 28023, 194818: 27969, 194819: 28009, 194820: 28024, 194821: 28037, 194822: 146718, 194823: 27956, 194824: 28207, 194825: 28270, 194826: 15667, 194827: 28363, 194828: 28359, 194829: 147153, 194830: 28153, 194831: 28526, 194832: 147294, 194833: 147342, 194834: 28614, 194835: 28729, 194836: 28702, 194837: 28699, 194838: 15766, 194839: 28746, 194840: 28797, 194841: 28791, 194842: 28845, 194843: 132389, 194844: 28997, 194845: 148067, 194846: 29084, 194847: 148395, 194848: 29224, 194849: 29237, 194850: 29264, 194851: 149000, 194852: 29312, 194853: 29333, 194854: 149301, 194855: 149524, 194856: 29562, 194857: 29579, 194858: 16044, 194859: 29605, 194860: 16056, 194861: 16056, 194862: 29767, 194863: 29788, 194864: 29809, 194865: 29829, 194866: 29898, 194867: 16155, 194868: 29988, 194869: 150582, 194870: 30014, 194871: 150674, 194872: 30064, 194873: 139679, 194874: 30224, 194875: 151457, 194876: 151480, 194877: 151620, 194878: 16380, 194879: 16392, 194880: 30452, 194881: 151795, 194882: 151794, 194883: 151833, 194884: 151859, 194885: 30494, 194886: 30495, 194887: 30495, 194888: 30538, 194889: 16441, 194890: 30603, 194891: 16454, 194892: 16534, 194893: 152605, 194894: 30798, 194895: 30860, 194896: 30924, 194897: 16611, 194898: 153126, 194899: 31062, 194900: 153242, 194901: 153285, 194902: 31119, 194903: 31211, 194904: 16687, 194905: 31296, 194906: 31306, 194907: 31311, 194908: 153980, 194909: 154279, 194910: 154279, 194911: 31470, 194912: 16898, 194913: 154539, 194914: 31686, 194915: 31689, 194916: 16935, 194917: 154752, 194918: 31954, 194919: 17056, 194920: 31976, 194921: 31971, 194922: 32000, 194923: 155526, 194924: 32099, 194925: 17153, 194926: 32199, 194927: 32258, 194928: 32325, 194929: 17204, 194930: 156200, 194931: 156231, 194932: 17241, 194933: 156377, 194934: 32634, 194935: 156478, 194936: 32661, 194937: 32762, 194938: 32773, 194939: 156890, 194940: 156963, 194941: 32864, 194942: 157096, 194943: 32880, 194944: 144223, 194945: 17365, 194946: 32946, 194947: 33027, 194948: 17419, 194949: 33086, 194950: 23221, 194951: 157607, 194952: 157621, 194953: 144275, 194954: 144284, 194955: 33281, 194956: 33284, 194957: 36766, 194958: 17515, 194959: 33425, 194960: 33419, 194961: 33437, 194962: 21171, 194963: 33457, 194964: 33459, 194965: 33469, 194966: 33510, 194967: 158524, 194968: 33509, 194969: 33565, 194970: 33635, 194971: 33709, 194972: 33571, 194973: 33725, 194974: 33767, 194975: 33879, 194976: 33619, 194977: 33738, 194978: 33740, 194979: 33756, 194980: 158774, 194981: 159083, 194982: 158933, 194983: 17707, 194984: 34033, 194985: 34035, 194986: 34070, 194987: 160714, 194988: 34148, 194989: 159532, 194990: 17757, 194991: 17761, 194992: 159665, 194993: 159954, 194994: 17771, 194995: 34384, 194996: 34396, 194997: 34407, 194998: 34409, 194999: 34473, 195000: 34440, 195001: 34574, 195002: 34530, 195003: 34681, 195004: 34600, 195005: 34667, 195006: 34694, 195007: 17879, 195008: 34785, 195009: 34817, 195010: 17913, 195011: 34912, 195012: 34915, 195013: 161383, 195014: 35031, 195015: 35038, 195016: 17973, 195017: 35066, 195018: 13499, 195019: 161966, 195020: 162150, 195021: 18110, 195022: 18119, 195023: 35488, 195024: 35565, 195025: 35722, 195026: 35925, 195027: 162984, 195028: 36011, 195029: 36033, 195030: 36123, 195031: 36215, 195032: 163631, 195033: 133124, 195034: 36299, 195035: 36284, 195036: 36336, 195037: 133342, 195038: 36564, 195039: 36664, 195040: 165330, 195041: 165357, 195042: 37012, 195043: 37105, 195044: 37137, 195045: 165678, 195046: 37147, 195047: 37432, 195048: 37591, 195049: 37592, 195050: 37500, 195051: 37881, 195052: 37909, 195053: 166906, 195054: 38283, 195055: 18837, 195056: 38327, 195057: 167287, 195058: 18918, 195059: 38595, 195060: 23986, 195061: 38691, 195062: 168261, 195063: 168474, 195064: 19054, 195065: 19062, 195066: 38880, 195067: 168970, 195068: 19122, 195069: 169110, 195070: 38923, 195071: 38923, 195072: 38953, 195073: 169398, 195074: 39138, 195075: 19251, 195076: 39209, 195077: 39335, 195078: 39362, 195079: 39422, 195080: 19406, 195081: 170800, 195082: 39698, 195083: 40000, 195084: 40189, 195085: 19662, 195086: 19693, 195087: 40295, 195088: 172238, 195089: 19704, 195090: 172293, 195091: 172558, 195092: 172689, 195093: 40635, 195094: 19798, 195095: 40697, 195096: 40702, 195097: 40709, 195098: 40719, 195099: 40726, 195100: 40763, 195101: 173568 };
  /**
   * 同形汉字替换
   * @param {string} s
   * @returns {string} */
  strings.confusableHanConvert = s => {
    const normalized = s.replace(/./ug, c => {
      if (!Object.prototype.hasOwnProperty.call(confusableHanTable, c.charCodeAt())) return c;
      return String.fromCodePoint(confusableHanTable[c.codePointAt()]);
    });
    if (normalized === s) return s;
    if (util.debug) {
      util.debug('Confusable Han Convert: %s -> %s\n%o', s, normalized,
        [...normalized].map((c, i) => [c, [...s][i]]).filter(([a, b]) => a !== b));
    }
    return normalized;
  };

  /**
   * @param {Node} element
   */
  strings.normalizeConfusableHanNode = function normalizeNode(element) {
    if (element instanceof HTMLElement) {
      // 不处理用户提到
      if (element.matches('a[usercard*="name"]')) return;
      [...element.childNodes].forEach(normalizeNode);
      ['title'].forEach(attr => {
        normalizeNode(element.attributes.getNamedItem(attr));
      });
      // 特别处理一下话题链接
      if (element.matches('.a_topic') && element.href.startsWith('https://s.weibo.com/weibo')) {
        const href = new URL(element.href);
        href.searchParams.set('q', strings.confusableHanConvert(href.searchParams.get('q')));
        element.href = href;
      }
    } else if (element instanceof Text || element instanceof Attr) {
      element.nodeValue = strings.confusableHanConvert(element.nodeValue);
    }
  };

}());
//#endregion
//#region @require yaofang://content/util/css.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};
  const css = util.css = util.css ?? {};

  css.add = function (css) {
    const target = document.head || document.body || document.documentElement;
    const style = document.createElement('style');
    style.textContent = css;
    let removed = false;
    let ready = Promise.resolve();
    if (target) target.appendChild(style);
    else {
      ready = new Promise(resolve => {
        setTimeout(function addStyle() {
          if (removed) {
            resolve();
            return;
          }
          const target = document.head || document.body || document.documentElement;
          if (!target) setTimeout(addStyle, 10);
          else {
            target.appendChild(style);
            resolve();
          }
        }, 10);
      });
    }
    const remove = () => {
      if (!style.parentNode) return;
      style.parentNode.removeChild(style);
      removed = true;
    };
    const append = css => {
      style.textContent += '\n' + css;
    };
    return { append, remove, ready };
  };

  const style = css.add('');
  css.append = function (css) {
    style.append('\n' + css);
  };

}());
//#endregion
//#region @require yaofang://content/util/inject.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};

  const strings = util.strings;

  let idIndex = 0;
  const id = type => `${type}_${++idIndex}_${strings.randKey()}`;

  const baseKey = '_yawf_' + strings.randKey();
  const replyKey = baseKey + '_ack';

  class Callback {
    constructor() {
      this.id = id('callback');
    }
    invoke(...params) {
      const resp = new CustomEvent(replyKey, {
        detail: JSON.stringify({ type: 'callback', callback: this.id, params }),
      });
      window.dispatchEvent(resp);
    }
  };

  /** @type {Map<string, (event: CustomEvent) => any>} */
  const callbacks = new Map();
  let firstCall = true;

  const init = function ([baseKey, replyKey]) {
    let invokeIndex = 0;
    /** @type {Map<number, (value: any) => any>} */
    const resolver = new Map();
    /** @type {Map<string, Set<() => any>>} */
    const callbacks = new Map();
    const invoke = function ({ method: key }) {
      return async function (...params) {
        const id = ++invokeIndex;
        const result = new Promise(resolve => {
          resolver.set(id, resolve);
        });
        const event = new CustomEvent(baseKey, {
          detail: JSON.stringify({ id, method: key, params }),
        });
        window.dispatchEvent(event);
        return result;
      };
    };
    const callback = function ({ callback: key }) {
      const collection = new Set();
      callbacks.set(key, collection);
      return {
        addCallback: function (func) { collection.add(func); },
        removeCallback: function (func) { collection.delete(func); },
      };
    };
    window.addEventListener(replyKey, function (event) {
      const detail = JSON.parse(event.detail);
      if (detail.type === 'response') {
        resolver.get(detail.id)(detail.error ? Promise.reject(detail.error) : detail.result);
        resolver.delete(detail.id);
      } else if (detail.type === 'callback') {
        Array.from(callbacks.get(detail.callback) ?? []).forEach(func => {
          try { func(...detail.params); } catch (e) { /* */ }
        });
      }
    });
    const run = function (func, params) {
      const parsed = JSON.parse(params, function (key, val) {
        if (val && typeof val === 'object' && val._type === 'method' && val.invoke === baseKey) {
          return invoke(val);
        } else if (val && typeof val === 'object' && val._type === 'callback' && val.invoke === baseKey) {
          return callback(val);
        } else if (val && typeof val === 'object' && val._type === 'regex' && val.invoke === baseKey) {
          return new RegExp(val.source, val.flags);
        } else {
          return val;
        }
      });
      return func(...parsed);
    };
    Object.defineProperty(window, baseKey, {
      configurable: false,
      enumerable: false,
      writable: false,
      value: run,
    });
  };

  window.addEventListener(baseKey, function (event) {
    const detail = JSON.parse(event.detail);
    const { id, method, params } = detail;
    let result = null, error = null;
    try {
      result = callbacks.get(method)(...params);
    } catch (e) {
      error = e;
    }
    const resp = new CustomEvent(baseKey + '_ack', {
      detail: JSON.stringify({ type: 'response', id, error, result }),
    });
    window.dispatchEvent(resp);
  });

  const serialize = function (param) {
    return JSON.stringify(JSON.stringify(param, function (key, val) {
      if (typeof val === 'function') {
        const key = id('method');
        callbacks.set(key, val);
        return { _type: 'method', method: key, invoke: baseKey };
      } else if (typeof val === 'object' && val instanceof Callback) {
        const key = val.id;
        return { _type: 'callback', callback: key, invoke: baseKey };
      } else if (typeof val === 'object' && val instanceof RegExp) {
        return { _type: 'regex', source: val.source, flags: val.flags, invoke: baseKey };
      }
      return val;
    }));
  };

  util.inject = function (func, ...params) {
    if (typeof func !== 'function') return Promise.reject();
    const setupScript = firstCall ? `(${init}(${JSON.stringify([baseKey, replyKey])}));` : ''; firstCall = false;
    const executeScript = setupScript + `window[${JSON.stringify(baseKey)}](${func},${serialize(params)});`;
    const script = document.createElement('script');
    script.textContent = executeScript;
    const target = document.head || document.body || document.documentElement;
    return new Promise(resolve => {
      script.addEventListener('load', () => {
        resolve();
        script.parentElement.removeChild(script);
      });
      if (target) target.appendChild(script);
      else setTimeout(function injectScript() {
        const target = document.head || document.body || document.documentElement;
        if (!target) setTimeout(injectScript, 10);
        else target.appendChild(script);
      }, 10);
    });
  };
  util.inject.Callback = Callback;

}());
//#endregion
//#region @require yaofang://content/util/keyboard.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};
  const keyboard = util.keyboard = {};

  const CTRL = 2 ** 32, SHIFT = CTRL * 2, ALT = SHIFT * 2, META = ALT * 2, KEY = CTRL - 1, MAX = META * 2 - 1;
  const namelist = '#0;#1;#2;Cancel;#4;#5;Help;#7;BackSpace;TAB;#10;#11;Clear;Enter;EnterSpecial;#15;;;;Pause;CapsLock;Kana;Eisu;Junja;Final;Hanja;#26;Esc;Convert;Nonconvert;Accept;ModeChange;Space;PageUp;PageDown;End;Home;Left;Up;Right;Down;Select;Print;Execute;PrintScreen;Insert;Delete;#47;0;1;2;3;4;5;6;7;8;9;Colon;Semicolon;LessThan;Equals;GreaterThan;QuestionMark;At;A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z;Win;#92;ContextMenu;#94;Sleep;NumPad0;NumPad1;NumPad2;NumPad3;NumPad4;NumPad5;NumPad6;NumPad7;NumPad8;NumPad9;Multiply;Add;Separator;Subtract;Decimal;Divide;F1;F2;F3;F4;F5;F6;F7;F8;F9;F10;F11;F12;F13;F14;F15;F16;F17;F18;F19;F20;F21;F22;F23;F24;#136;#137;#138;#139;#140;#141;#142;#143;NumLock;ScrollLocK;WIN_OEM_FJ_JISHO;WIN_OEM_FJ_MASSHOU;WIN_OEM_FJ_TOUROKU;WIN_OEM_FJ_LOYA;WIN_OEM_FJ_ROYA;#151;#152;#153;#154;#155;#156;#157;#158;#159;Circumflex;Exclamation;DoubleQuote;Hash;Dollar;Percent;Ampersand;Underscore;OpenParen;CloseParen;Asterisk;Plus;Pipe;HyphenMinus;OpenCurlyBracket;CloseCurlyBracket;Tilde;#177;#178;#179;#180;VolumeMute;VolumeDown;VolumeUp;#184;#185;#186;#187;Comma;#189;Period;Slash;BackQuote;#193;#194;#195;#196;#197;#198;#199;#200;#201;#202;#203;#204;#205;#206;#207;#208;#209;#210;#211;#212;#213;#214;#215;#216;#217;#218;OpenBracket;BackSlash;CloseBracket;Quote;#223;;AltGr;#226;WIN_ICO_HELP;WIN_ICO_00;#229;WIN_ICO_CLEAR;#231;#232;WIN_OEM_RESET;WIN_OEM_JUMP;WIN_OEM_PA1;WIN_OEM_PA2;WIN_OEM_PA3;WIN_OEM_WSCTRL;WIN_OEM_CUSEL;WIN_OEM_ATTN;WIN_OEM_FINISH;WIN_OEM_COPY;WIN_OEM_AUTO;WIN_OEM_ENLW;WIN_OEM_BACKTAB;Attn;Crsel;Exsel;Ereof;Play;Zoom;#252;PA1;WIN_OEM_CLEAR;#255'.split(';');

  // 一些常用常量
  keyboard.code = Object.assign(...namelist.map((name, index) => ({ [name.toUpperCase()]: index })));
  keyboard.alter = { CTRL, SHIFT, ALT, META, KEY, MAX };

  // 对一个按键事件做编号
  keyboard.event = function (e) {
    if (!e?.keyCode) return null;
    return (e.keyCode >>> 0) +
      e.ctrlKey * CTRL +
      e.shiftKey * SHIFT +
      e.altKey * ALT +
      e.metaKey * META;
  };
  // 给一个编号，转换为键名
  keyboard.name = function (n) {
    return [
      n / CTRL & 1 ? 'Ctrl' : '',
      n / SHIFT & 1 ? 'Shift' : '',
      n / ALT & 1 ? 'Alt' : '',
      n / META & 1 ? 'Meta' : '',
      (n >>> 0) < 256 ? namelist[n >>> 0] : `#${n >>> 0}`,
    ].filter(x => x).join('-').replace(/-$/g, '');
  };

}());
//#endregion
//#region @require yaofang://content/util/ui.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util = yawf.util ?? {};

  const keyboard = util.keyboard;
  const i18n = util.i18n;
  const css = util.css;

  const ui = util.ui = util.ui ?? {};

  i18n.okButtonTitle = {
    cn: '确定',
    tw: '確定',
    en: 'Confirm',
  };
  i18n.cancelButtonTitle = {
    cn: '取消',
    tw: '取消',
    en: 'Cancel',
  };
  i18n.closeButtonTitle = {
    cn: '关闭',
    tw: '關閉',
    en: 'Close',
  };

  const dialogStack = [];
  /**
   * 显示一个对话框
   * @param {{ id: string, title: string, render: Function, button: { [type: string]: Function? }?, bar: boolean? }}
   */
  ui.dialog = function ({ id, title, render, button }) {
    // 初始化 DOM
    const template = document.createElement('template');
    template.innerHTML = `
<div class="woo-box-flex woo-box-alignCenter woo-box-justifyCenter woo-modal-wrap woo-modal-an--pop-enter">
  <div class="woo-modal-main yawf-dialog">
    <i class="woo-font woo-font--cross yawf-dialog-close"></i>
    <div class="woo-box-flex woo-box-column woo-box-alignCenter woo-dialog-main" aria-modal="true" tabindex="0" role="alertdialog">
      <div class="woo-dialog-title yawf-dialog-title"></div>
      <div class="woo-dialog-body yawf-dialog-content">
      </div>
      <div class="woo-dialog-ctrl yawf-dialog-buttons">
        <button class="woo-button-main woo-button-line woo-button-default woo-button-m woo-button-round woo-dialog-btn yawf-dialog-button-cancel"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>
        <button class="woo-button-main woo-button-flat woo-button-primary woo-button-m woo-button-round woo-dialog-btn yawf-dialog-button-ok"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>
      </div>
    </div>
  </div>
  <div class="woo-modal-mask yawf-dialog-mask"></div>
</div>
`;
    const container = document.importNode(template.content.firstElementChild, true);
    const dialog = container.querySelector('.yawf-dialog') || container;
    dialog.id = id;
    const titleNode = dialog.querySelector('.yawf-dialog-title');
    const buttonCollectionNode = dialog.querySelector('.yawf-dialog-buttons');
    const okButton = dialog.querySelector('.yawf-dialog-button-ok');
    const cancelButton = dialog.querySelector('.yawf-dialog-button-cancel');
    const closeButton = dialog.querySelector('.yawf-dialog-close');
    const mask = container.querySelector('.yawf-dialog-mask');
    const contentNode = dialog.querySelector('.yawf-dialog-content');
    // 填入内容
    titleNode.textContent = title;
    titleNode.classList.add('woo-dialog-bar');
    okButton.textContent = i18n.okButtonTitle;
    cancelButton.textContent = i18n.cancelButtonTitle;
    closeButton.title = i18n.closeButtonTitle;
    render(contentNode, Object.assign({}, ...[
      { close: closeButton },
      button?.ok ? { ok: okButton } : {},
      button?.cancel ? { cancel: cancelButton } : {},
    ]));
    // 定位对话框的位置
    const lastPos = { x: 0, y: 0 };
    const setPos = function ({ x, y }) {
      const left = Math.min(Math.max(0, x), document.body.clientWidth - dialog.clientWidth - 2);
      const top = Math.min(Math.max(0, y), document.body.clientHeight - dialog.clientHeight - 2);
      if (left + 'px' !== dialog.style.left) dialog.style.left = left + 'px';
      if (top + 'px' !== dialog.style.top) dialog.style.top = top + 'px';
      return Object.assign(lastPos, { x: left, y: top });
    };
    // 网页滚动时维持在页面内
    const resetPos = () => { setPos(lastPos); };
    const dragMoveStart = (function mouseDrag() {
      const mouseStart = {};
      // 拖拽移动
      const dragMove = event => {
        setPos({
          x: event.screenX - mouseStart.x,
          y: event.screenY - mouseStart.y,
        });
      };
      // 拖拽结束
      const dragMoveDone = function () {
        document.removeEventListener('mousemove', dragMove);
        document.removeEventListener('mouseup', dragMoveDone);
        dialog.classList.remove('yawf-drag');
        if (dialog.releaseCapture) { dialog.releaseCapture(); }
      };
      // 开始拖拽
      const dragMoveStart = function (e) {
        Object.assign(mouseStart, {
          x: e.screenX - lastPos.x,
          y: e.screenY - lastPos.y,
        });
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragMoveDone);
        dialog.classList.add('yawf-drag');
      };
      return dragMoveStart;
    }());
    // 标题栏可以拖拽
    if (titleNode) {
      titleNode.addEventListener('mousedown', dragMoveStart);
    }
    // 背景遮罩
    // 响应鼠标
    if (!button?.ok && !button?.cancel) {
      buttonCollectionNode.parentNode.removeChild(buttonCollectionNode);
    } else {
      if (button.ok) okButton.addEventListener('click', event => {
        if (!event.isTrusted) return;
        button.ok();
      });
      else buttonCollectionNode.removeChild(okButton);
      if (button.cancel) cancelButton.addEventListener('click', event => {
        if (!event.isTrusted) return;
        button.cancel();
      });
      else buttonCollectionNode.removeChild(cancelButton);
    }
    closeButton.addEventListener('click', event => {
      if (!event.isTrusted) return;
      (button?.close ?? hide)();
    });
    mask.addEventListener('click', event => {
      if (!event.isTrusted) return;
      (button?.close ?? hide)();
    });
    // 响应按键
    const keys = event => {
      if (!event.isTrusted) return;
      if (dialogStack[dialogStack.length - 1] !== dialog) return;
      const code = keyboard.event(event);
      if (code === keyboard.code.ENTER && button && button.ok) button.ok(event);
      else if (code === keyboard.code.ESC) {
        (button?.cancel ?? button?.close ?? hide)(event);
      } else return;
      event.stopPropagation();
      event.preventDefault();
    };
    const stopKeys = event => {
      event.stopPropagation();
    };
    // 关闭对话框
    const hide = function () {
      container.classList.add('woo-modal-an--pop-leave-to');
      document.removeEventListener('keydown', keys);
      container.removeEventListener('keypress', stopKeys);
      document.removeEventListener('scroll', resetPos);
      window.removeEventListener('resize', resetPos);
      setTimeout(function () { container.remove(); }, 200);
      dialogStack.splice(dialogStack.indexOf(dialog), 1);
    };
    const resetPosition = function ({ x, y } = {}) {
      if (x == null) x = (window.innerWidth - dialog.clientWidth) / 2;
      if (y == null) y = (window.innerHeight - dialog.clientHeight) / 2;
      setPos({ x, y });
    };
    // 显示对话框
    const show = function ({ x, y } = {}) {
      document.body.appendChild(container);
      resetPosition({ x, y });
      document.addEventListener('keydown', keys);
      container.addEventListener('keypress', stopKeys);
      document.addEventListener('scroll', resetPos);
      window.addEventListener('resize', resetPos);
      document.activeElement.blur();
      setTimeout(function () {
        container.classList.remove('woo-modal-an--pop-enter');
      }, 200);
      dialogStack.push(dialog);
    };
    return { hide, show, resetPosition, dom: dialog };
  };

  const predefinedDialog = (buttons, { icon: defaultIcon }) => {
    /**
     * icon param is deprecated in v7
     * @param {{ id: string, title: string, text: string, icon: string }}
     * @returns {Promise<boolean?>}
     */
    const inner = ({ id, title, text, icon = defaultIcon }) => new Promise(resolve => {
      const render = function (dom) {
        const template = document.createElement('template');
        template.innerHTML = `
<div class="woo-dialog-message yawf-dialog-text"></div>
`;
        const content = document.importNode(template.content.firstElementChild, true);
        content.textContent = text;
        dom.appendChild(content);
      };
      const value = result => () => {
        dialog.hide();
        resolve(result);
      };
      const button = Object.assign({
        close: value(null),
      }, ...Object.keys(buttons).map(key => ({
        [key]: value(buttons[key]),
      })));
      const dialog = ui.dialog({ id, title, render, button });
      dialog.show();
    });
    return inner;
  };

  ui.alert = predefinedDialog({ ok: true }, { icon: 'ask' });
  ui.confirm = predefinedDialog({ ok: true, cancel: false }, { icon: 'question' });

  /**
   * @param {HTMLElement} bubbleContent
   * @param {HTMLElement} reference
   */
  ui.bubble = function (bubbleContent, reference) {
    const bubble = (function () {
      const template = document.createElement('template');
      template.innerHTML = `
<div class="woo-pop-main yawf-bubble">
<div class="yawf-bubble-text"></div>
</div>
`;
      const bubble = document.importNode(template.content.firstElementChild, true);
      if (!(bubbleContent instanceof Node)) {
        bubbleContent = document.createTextNode(bubbleContent + '');
      }
      bubble.querySelector('.yawf-bubble-text').appendChild(bubbleContent);
      return bubble;
    }());
    const referenceList = [];
    const deBound = function (callback) {
      let busy = false;
      return function () {
        if (busy) return; busy = true;
        window.requestAnimationFrame(() => {
          busy = false;
          callback();
        });
      };
    };
    const trackScroll = function (callback) {
      for (let ref = reference; ref; ref = ref.offsetParent) {
        referenceList.push(reference);
        ref.addEventListener('scroll', callback);
      }
    };
    const deTrackScroll = function (callback) {
      referenceList.splice(0).forEach(ref => {
        ref.removeEventListener('scroll', callback);
      });
    };
    const updatePosition = deBound(function () {
      const rect = reference.getClientRects()[0];
      if (!rect) return;
      const top0 = rect.top - bubble.clientHeight - 8;
      const top1 = top0 + window.pageYOffset;
      const top2 = rect.bottom + 8 + window.pageYOffset;
      const left = rect.left - bubble.clientWidth / 2 + rect.width + window.pageXOffset;
      const atTop = top0 > 0;
      const top = atTop ? top1 : top2;
      if (parseInt(bubble.style.left, 10) !== left) {
        bubble.style.left = left + 'px';
      }
      if (parseInt(bubble.style.top, 10) !== top) {
        bubble.style.top = top + 'px';
      }
    });
    const show = function () {
      document.body.appendChild(bubble);
      deTrackScroll(updatePosition);
      trackScroll(updatePosition);
      updatePosition();
    };
    const hide = function () {
      deTrackScroll(updatePosition);
      if (bubble.parentNode) {
        bubble.parentNode.removeChild(bubble);
      }
    };
    let mouseIn = null;
    const enter = function () {
      setTimeout(() => {
        if (mouseIn === null) show();
        mouseIn = true;
      }, 0);
    };
    const leave = function () {
      mouseIn = false;
      setTimeout(function () {
        if (mouseIn === false) {
          hide();
          mouseIn = null;
        }
      }, 300);
    };
    reference.addEventListener('mouseenter', enter);
    bubble.addEventListener('mouseenter', enter);
    reference.addEventListener('mouseleave', leave);
    bubble.addEventListener('mouseleave', leave);
  };

  const icons = {
    checkbox: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0v16h16V0H0zm14.398 2.9a.667.667 0 0 1 .523 1.129l-8.686 8.604c-.26.258-.677.258-.937 0L1.408 8.78a.667.667 0 1 1 .939-.947l3.42 3.39 8.215-8.14a.667.667 0 0 1 .416-.182z"/></svg>',
    success: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 0a512 512 0 1 0 0 1024A512 512 0 1 0 512 0zm265.393 292.006c16.75-.2 33.417 5.913 46.023 18.418 25.24 25.038 24.694 66.134-1.176 91.795L509.836 712.08a66.95 66.95 0 0 1-43.293 19.467l-.19.01a63.06 63.06 0 0 1-7.584.443c-17.812 0-33.938-7.168-45.604-18.754l-213.22-211.504C188.838 490.25 182 474.623 182 457.412c0-35.4 28.93-64.1 64.62-64.1 17.35 0 33.107 6.783 44.715 17.822l169.58 168.217L730.877 311.6c12.935-12.83 29.766-19.374 46.516-19.584z"/></svg>',
    warn: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 0a512 512 0 1 0 0 1024A512 512 0 1 0 512 0zm-1.346 152l2.72.055v.002l.135.004c36.593 1.51 65.803 31.9 65.803 69.193 0 37.24-29.142 67.617-65.816 69.193l.07-.002-.137.006c.022-.001.044-.003.066-.004a68.6 68.6 0 0 1-2.84.059c-37.917 0-68.654-31.004-68.654-69.252S472.737 152 510.654 152zm2.72 249.268c37.882 0 68.627 31.622 68.627 70.61v329.568C582 840.378 551.255 872 513.373 872c-37.937 0-68.627-31.622-68.627-70.555V471.877c0-38.987 30.7-70.61 68.627-70.61z"/></svg>',
    error: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 0a512 512 0 1 0 0 1024A512 512 0 1 0 512 0zm-1.373 152c37.937 0 68.627 31.622 68.627 70.555v329.568c0 38.987-30.7 70.61-68.627 70.61-37.882 0-68.627-31.622-68.627-70.61V222.555C442 183.622 472.745 152 510.627 152zm2.72 581.494c37.917 0 68.654 31.004 68.654 69.252S551.263 872 513.346 872a66.69 66.69 0 0 1-2.719-.055v-.002l-.135-.004c-36.593-1.51-65.803-31.9-65.803-69.193 0-37.24 29.142-67.617 65.816-69.193l-.07.002.137-.006c-.022.001-.044.003-.066.004a68.6 68.6 0 0 1 2.84-.059z"/></svg>',
    help: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1024 1024"><path fill="currentColor" d="M512 0a512 512 0 1 0 0 1024A512 512 0 1 0 512 0zm3.68 162c59.6 0 114.613 21.36 151.307 54.06C703.653 247.832 722 291.424 722 346.803c0 45.415-11.92 82.632-33.92 111.71-5.733 6.26-20.24 19.958-43.2 40.42l-43.814 39.408C571.36 569.78 560 600.485 560 622.266v12.715h-.107c-1.76 27.2-24.587 48.7-52.48 48.7s-50.72-21.502-52.48-48.7h-.398v-12.715c0-34.524 5.492-52.347 18.346-76.88 11.92-24.504 46.453-62.368 106.053-115.025l11.014-12.715c16.506-19.985 24.773-41.765 24.773-64.473 0-29.978-8.266-56.897-24.773-74.158-17.413-17.234-43.092-33.092-74.266-33.092-40.373 0-68.8 22.79-86.213 48.22-15.6 20.883-22.934 50.86-22.934 88.98 0 28.602-23.388 51.758-52.268 51.758-28.853 0-52.266-23.156-52.266-51.758 0-67.196 19.253-119.85 59.6-157.996C401.04 187 447.813 162 515.68 162zm-8.27 573.242a58.08 58.08 0 0 1 1.791.029c32.705.747 58.947 28.83 58.947 63.363s-26.242 62.617-58.88 63.363l-.066.002v-.03c-.534.018-1.16.03-1.79.03-33.255 0-60.215-28.375-60.215-63.38s26.96-63.38 60.215-63.38z"/></svg>',
  };
  const parser = new DOMParser();
  ui.icon = function (type) {
    if (!Object.prototype.hasOwnProperty.call(icons, type)) return null;
    return parser.parseFromString(icons[type], 'image/svg+xml');
  };

  css.append(`
.yawf-dialog.yawf-dialog { position: fixed; transition: none; }
.yawf-dialog .woo-dialog-main { max-width: none; }
.yawf-dialog-text { max-width: 400px; }
.yawf-dialog-title { cursor: move; }
.yawf-dialog-outer { position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none repeat scroll 0% 0% rgb(0, 0, 0); opacity: 0.3; z-index: 9999; }
.yawf-dialog.yawf-drag { opacity: 0.67; user-select: none; transition: none; }
.yawf-bubble { max-width: 400px; font-size: 14px; padding: 8px 16px; box-sizing: border-box; }
.yawf-dialog-close { padding: 8px; position: absolute; top: 10px; right: 10px; z-index: 1; cursor: pointer; }
`);

}());
//#endregion
//#region @require yaofang://content/util/dom.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};
  const dom = util.dom = util.dom ?? {};


  /**
   * @param {string} html
   * @returns {DocumentFragment}
   */
  const parseHtml = function (html) {
    const tag = 'stupid-inner-html-assign-validator';
    const paired = `<${tag}>` + html + `</${tag}>`;
    const dom = new DOMParser().parseFromString(paired, 'text/html');
    const result = dom.querySelector(tag);
    const fragment = document.createDocumentFragment();
    while (result.firstChild) fragment.appendChild(result.firstChild);
    return fragment;
  };
  dom.parseHtml = parseHtml;

  /**
   * @param {Element} element
   * @param {string} innerHtml
   */
  const stupidInnerHtmlAssign = function (element, innerHtml) {
    const fragment = parseHtml(innerHtml);
    element.innerHTML = '';
    element.appendChild(fragment);
    return element;
  };
  dom.content = stupidInnerHtmlAssign;

}());
//#endregion
//#region @require yaofang://content/util/time.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};

  const i18n = util.i18n;
  const time = util.time = {};

  Object.assign(i18n, {
    timeMonthDay: { cn: '{1}月{2}日 {3}:{4}', en: '{1}-{2} {3}:{4}' },
    timeToday: { cn: '今天', tw: '今天', en: 'Today' },
    timeMinuteBefore: { cn: '分钟前', tw: '分鐘前', en: ' mins ago' },
    timeSecondBefore: { cn: '秒前', tw: '秒前', en: ' secs ago' },
  });

  const timeToParts = (time, locale = 'current') => {
    const offset = locale === 'current' ? new Date(time).getTimezoneOffset() :
      locale === 'cst' ? -480 : 0;
    return new Date(time - offset * 6e4).toISOString().match(/\d+/g);
  };

  time.parse = function (text) {
    let parseDate = null;
    const now = Date.now();
    const [cy, cm, cd] = timeToParts(now, 'cst');
    if (/^\d+-\d+-\d+ \d+:\d+$/.test(text)) {
      const [y, m, d, h, u] = text.match(/\d+/g);
      parseDate = Date.UTC(y, m - 1, d, h, u) - 288e5;
    } else if (/^(?:\d+-\d+|\d+月\d+日)\s*\d+:\d+$/.test(text)) {
      const [m, d, h, u] = text.match(/\d+/g);
      parseDate = Date.UTC(cy, m - 1, d, h, u) - 288e5;
    } else if (/^(?:今天|today)\s*\d+:\d+$/i.test(text)) {
      const [h, u] = text.match(/\d+/g);
      parseDate = Date.UTC(cy, cm - 1, cd, h, u) - 288e5;
    } else if (/^\s*\d+\s*(?:分钟前|分鐘前|mins ago)/.test(text)) {
      const min = text.match(/\d+/g);
      parseDate = now - min * 6e4;
    } else if (/^\s*\d+\s*(?:秒前|secs ago)/.test(text)) {
      const sec = text.match(/\d+/g);
      parseDate = now - sec * 1e3;
    }
    return parseDate ? new Date(parseDate) : null;
  };

  const formatter = Intl.DateTimeFormat(
    { cn: 'zh-CN', hk: 'zh-HK', tw: 'zh-TW', en: 'en-US' }[util.language],
    {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      weekday: 'long',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'long',
    }
  );

  const now = time.now = function () {
    return new Date(Date.now() - time.diff);
  };

  time.format = function (time, { format = 'auto', locale = 'current' } = {}) {
    const ref = now();
    const [iy, im, id, ih, iu] = timeToParts(time, locale);
    const [ny, nm, nd, nh, _nu] = timeToParts(ref, locale);
    const diff = (ref - time) / 1e3;
    if (format === 'full') {
      return formatter.format(time);
    } else if (iy !== ny || format === 'year') {
      return `${iy}-${im}-${id} ${ih}:${iu}`;
    } else if (im !== nm || id !== nd || format === 'month') {
      return i18n.timeMonthDay.replace(/\{\d\}/g, n => [+im, +id, ih, iu][n[1] - 1]);
    } else if (ih !== nh && diff > 3600 || format === 'today') {
      return `${i18n.timeToday} ${ih}:${iu}`;
    } else if (diff > 50 || format === 'minute') {
      return Math.ceil(diff / 60) + i18n.timeMinuteBefore;
    } else {
      return Math.max(Math.ceil(diff / 10), 1) * 10 + i18n.timeSecondBefore;
    }
  };

  time.diff = 0;
  time.setDiff = function (diff) {
    time.diff = +diff || 0;
  };

  time.isCstEquivalent = function () {
    const year = new Date().getFullYear();
    return [...Array(366)].every((_, i) => new Date(year, 0, i).getTimezoneOffset() === -480);
  };

}());
//#endregion
//#region @require yaofang://content/util/mid.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const base62 = util.base62 = {};

  const base62Dict = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  base62.decode = function (str) {
    return [...str].reduce((prev, ch) => {
      return prev * 62 + base62Dict.indexOf(ch);
    }, 0);
  };

  base62.encode = function toString(num) {
    if (num === 0) return '0';
    if (num < 62) return base62Dict[num];
    return toString(Math.floor(num / 62)) + base62Dict[num % 62];
  };

  const mid = util.mid = {};

  mid.encode = function (base10mid) {
    return base10mid.match(/.{1,7}(?=(?:.{7})*$)/g)
      .map(trunc => base62.encode(Number(trunc)).padStart(4, 0))
      .join('').replace(/^0+/, '');
  };

  mid.decode = function (base62mid) {
    return base62mid.match(/.{1,4}(?=(?:.{4})*$)/g)
      .map(trunc => String(base62.decode(trunc)).padStart(7, 0))
      .join('').replace(/^0+/, '');
  };

}());
//#endregion
//#region @require yaofang://content/util/crc.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const crc = util.crc = {};

  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let rem = i >>> 0;
    for (let j = 0; j < 8; j++) {
      if (rem & 1) rem = ((rem >>> 1) ^ 0xedb88320) >>> 0;
      else rem >>>= 1;
    }
    table[i] = rem;
  }

  const parseString = function (str) {
    const encoder = new TextEncoder();
    return encoder.encode(str);
  };

  /**
   * @param {Uint8Array|string} buffer
   * @param {number} crc
   */
  crc.crc32 = function (buffer, crc) {
    const bytes = buffer instanceof Uint8Array ? buffer : parseString(String(buffer));
    crc = ~crc >>> 0;
    bytes.forEach(byte => {
      crc = (crc >>> 8) ^ table[(crc & 0xff) ^ byte];
    });
    crc = ~crc >>> 0;
    return crc;
  };

}());
//#endregion
//#region custom implementation util/tarball
; (function () {
  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};

  // 打包工具
  const tarball = util.tarball = {};

  // 将一个文件转为 tarball
  tarball.file = function (fileInfo, buffer) {
    const filename = fileInfo.filename, content = fileInfo.content, mtime = fileInfo.mtime;
    const checksum = { value: ' '.repeat(8), size: 8 };
    const fields = [
      // 文件名限制不超过 100 个字符
      { value: unescape(encodeURIComponent(filename)), size: 100 }, // filename
      { value: '0000644', size: 8 }, // mode
      { value: '0000000', size: 8 }, // uid
      { value: '0000000', size: 8 }, // gid
      // 文件大小不超过 8GiB
      { value: content.byteLength.toString(8).padStart(11, '0'), size: 12 }, // size
      // 修改时间直接用当前时间
      { value: Math.floor(+mtime / 1000).toString(8).padStart(11, '0'), size: 12 }, // mtime
      checksum, // chksum
      { value: '0', size: 1 }, // type
      { value: '', size: 100 }, // line filename
      { value: 'ustar', size: 6 }, // ustar
      { value: '00', size: 2 }, // ustar version
    ];
    buffer.fill(0);
    const writeField = function (field) {
      const data = Array.from(field.value).map(function (char) { return char.charCodeAt(); });
      buffer.set(data, field.offset);
    };
    fields.reduce(function (offset, field) { field.offset = offset; return offset + field.size; }, 0);
    fields.forEach(writeField);
    checksum.value = Array.from(buffer.slice(0, 512)).reduce(function (x, y) { return x + y; }).toString(8).padStart(6, '0') + '\0';
    writeField(checksum);
    buffer.set(new Uint8Array(content), 512);
    return buffer;
  };

  // 将一组文件打包
  tarball.files = function (files) {
    const tarSize = files.reduce(function (offset, file) {
      const size = file.content.byteLength;
      file.tarSize = (size >> 9 << 9) + (size % 512 ? 512 : 0) + 512;
      file.offset = offset;
      return offset + file.tarSize;
    }, 0) + 1024;
    const buffer = new ArrayBuffer(tarSize);
    files.forEach(function (file) {
      util.tarball.file(file, new Uint8Array(buffer, file.offset, file.tarSize));
    });
    return buffer;
  };
}());
//#endregion
//#region ployfill of browser.runtime.getManifest
; (function () {
  const browser = window.weBrowser = window.weBrowser || {};
  const runtime = browser.runtime = browser.runtime || {};
  runtime.getManifest = function () {
    const info = GM.info;
    return {
      name: info.script.name,
      version: info.script.version.split('.').slice(0, 3).join('.'),
    };
  };
}());
//#endregion
//#region @require yaofang://common/network/network.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};
  const network = yawf.network = {};
  const util = yawf.util;

  network.getUniqueKey = (function () {
    let last = 0;
    return function () {
      return '' + (last = Math.max(last + 1, Date.now()));
    };
  }());

  network.fakeCallback = function () {
    return 'STK_' + network.getUniqueKey();
  };

  /**
   * @param {string} resp
   */
  network.parseJson = function (resp) {
    return JSON.parse(resp
      .replace(/^(?:try\{[^{]*\()?\{/, '{')
      .replace(/}(?:\)\s*;?\s*}catch\(e\)\{\};?)?$/, '}')
    );
  };

  network.jsonp = function (url, callback) {
    return new Promise((resolve, reject) => {
      const key = 'yawf_jsonp_' + callback;
      window.addEventListener(key, function (event) {
        if (event.detail.data) {
          const data = JSON.parse(event.detail.data);
          resolve(data);
        } else {
          reject();
        }
      });
      util.inject(function (url, callback, key) {
        Object.defineProperty(window, callback, {
          configurable: true,
          enumerable: false,
          writable: true,
          value: function (data) {
            const event = new CustomEvent(key, {
              detail: { data: JSON.stringify(data) },
            });
            window.dispatchEvent(event);
            delete window[callback];
          },
        });
        const reject = function () {
          const event = new CustomEvent(key, { detail: { } });
          window.dispatchEvent(event);
        };
        const script = document.createElement('script');
        script.src = url;
        script.addEventListener('load', function () {
          script.remove();
          setTimeout(reject, 3000);
        });
        script.addEventListener('error', reject);
        document.body.appendChild(script);
      }, url, callback, key);
    });
  };


}());
//#endregion
//#region replacement of yaofang://comment/network.fetch.js
; (function () {

  const yawf = window.yawf;
  const network = yawf.network;

  network.fetchText = async function (url) {
    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        method: 'GET',
        url: new URL(url, location.href).href,
        onload: function (resp) {
          resolve(resp.responseText);
        },
        onerror: function (resp) {
          reject(resp.statusText);
        },
      });
    });
  };

  network.fetchJson = async function (url) {
    return JSON.parse(await network.fetchText(url));
  };

  network.fetchBlob = async function (url) {
    return new Promise((resolve, reject) => {
      GM.xmlHttpRequest({
        method: 'GET',
        url: new URL(url, location.href).href,
        responseType: 'blob',
        onload: function (resp) {
          resolve(resp.response);
        },
        onerror: function (resp) {
          reject(resp.statusText);
        },
      });
    });
  };

}());
//#endregion
//#region @require yaofang://content/request/userinfo.js
/**
 * 这个文件用来维护用户信息
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  /** @typedef {{id:number,name:string,avatar:string,followee:number,follower:number}} UserInfo */
  /** @type {Map<number,UserInfo>} */
  const userInfoCacheById = new Map();
  /** @type {Map<string,UserInfo>} */
  const userInfoCacheByName = new Map();
  const baseUrl = new URL({
    userCard: '//weibo.com/aj/v6/user/newcard',
    userCard_abroad: '//www.weibo.com/aj/v6/user/newcard',
  // document.domain 基于 STK.lib.card.usercard.basecard 并非笔误
  }[document.domain === 'www.weibo.com' ? 'userCard_abroad' : 'userCard'], location.href);

  let lastRequest = Promise.resolve();

  /**
   * @param {{id:number?,name:string?}}
   * @return {UserInfo}
   */
  const userInfo = async function userInfo({ id = null, name = null }) {
    await lastRequest;
    if (!id && !name) throw TypeError('Request userinfo without id or name.');
    if (id && userInfoCacheById.has(id)) {
      return JSON.parse(JSON.stringify(userInfoCacheById.get(id)));
    }
    if (name && userInfoCacheByName.has(name)) {
      return JSON.parse(JSON.stringify(userInfoCacheByName.get(name)));
    }
    const url = new URL(baseUrl);
    url.searchParams.set('ajwvr', '6');
    if (id) url.searchParams.set('id', id);
    else url.searchParams.set('name', name);
    url.searchParams.set('type', '1');
    const callback = network.fakeCallback();
    url.searchParams.set('callback', callback);
    try {
      util.debug('fetch url %s', url);
      const request = network.jsonp(url, callback);
      lastRequest = request;
      const { data: html } = await request;
      // 我仍然无法理解一个使用 JSON 包裹 HTML 的 API
      const usercard = new DOMParser().parseFromString(html, 'text/html');
      return (function parseUserInfoResponse() {
        const avatar = usercard.querySelector('.pic_box img').src;
        const name = usercard.querySelector('.name a[uid]').getAttribute('title');
        // 虽然一般来说是由数码组成的，但是 $CONFIG.uid 是字符串类型，所以我们遵守微博的类型约定使用字符串类型
        const id = usercard.querySelector('.name a[uid]').getAttribute('uid');
        const followee = util.strings.parseint(usercard.querySelector('.c_follow em').textContent);
        const follower = util.strings.parseint(usercard.querySelector('.c_fans em').textContent);
        const data = { avatar, id, name, followee, follower };
        userInfoCacheById.set(id, data);
        userInfoCacheByName.set(name, data);
        util.debug('Fetch user info get: %o', data);
        return data;
      }());
    } catch (error) {
      // 可能是用户不存在，也可能是其它问题
      util.debug('Fetch user info failed: request %o, error: %o', url, error);
      return null;
    }
  };
  request.userInfo = userInfo;

}());
//#endregion
//#region @require yaofang://content/request/usersuggest.js
/**
 * 当输入用户名时，给出一个用户列表以供选择
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const userSuggestCache = new Map();

  const userSuggestByTop = async function (key) {
    const url = new URL('https://s.weibo.com/ajax/topsuggest.php');
    url.searchParams.set('_k', network.getUniqueKey());
    url.searchParams.set('_t', 1);
    url.searchParams.set('_v', network.fakeCallback());
    url.searchParams.set('key', key);
    url.searchParams.set('uid', yawf.init.page.config.user.idstr);
    util.debug('fetch url %s', url);
    const resp = await network.fetchText(url);
    const users = Array.from(network.parseJson(resp).data?.user ?? []);
    const result = users.map(user => ({
      id: user.u_id + '',
      name: user.u_name,
      avatar: user.u_pic,
    }));
    util.debug('Got suggestion users for %o from top: %o', key, result);
    return result;
  };
  const userSuggestByFollow = async function (key) {
    const url = new URL('https://weibo.com/aj/relation/attention');
    url.searchParams.set('_rnd', network.getUniqueKey());
    url.searchParams.set('_t', 0);
    url.searchParams.set('ajwvr', 6);
    url.searchParams.set('q', key);
    url.searchParams.set('type', 0);
    util.debug('fetch url %s', url);
    const resp = await network.fetchJson(url);
    const users = Array.from(resp.data);
    const result = users.map(user => ({
      id: user.uid + '',
      name: user.screen_name,
    }));
    util.debug('Got suggestion users for %o from attention: %o', key, result);
    return result;
  };
  const userSuggest = async function userSuggest(key) {
    const suggests = await Promise.all([
      userSuggestByFollow(key).then(users => users, () => []),
      userSuggestByTop(key).then(users => users, () => []),
    ]);
    const list = suggests.reduce((a, b) => a.concat(b), []).map(user => ({
      id: user.id,
      name: user.name,
    }));
    const result = [...new Map(list.map(user => [user.id, user])).values()];
    util.debug('Got suggestion users for %o: %o', key, result);
    return result;
  };
  const userSuggestCached = async function userSuggestCached(key) {
    if (userSuggestCache.has(key)) {
      return userSuggestCache.get(key);
    }
    const promise = userSuggest(key);
    userSuggestCache.set(key, promise);
    try {
      const result = await promise;
      return result;
    } catch (e) {
      userSuggestCache.delete(key);
      return [];
    }
  };
  request.userSuggest = userSuggestCached;

}());
//#endregion
//#region @require yaofang://content/request/topicsuggest.js
/**
 * 当输入话题时，给出一个话题列表以供选择
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const topicSuggest = async function (key) {
    const url = new URL('https://weibo.com/aj/mblog/topic?');
    url.searchParams.set('ajwvr', 6);
    url.searchParams.set('q', key);
    url.searchParams.set('__rnd', +new Date());
    util.debug('fetch url %s', url);
    const resp = await network.fetchJson(url);
    const topics = new Set(Array.from(resp.data).map(({ topic }) => {
      topic = topic.replace(/\[超话\]$/, '');
      if (/\[.*\]/.test(topic)) return null;
      return topic;
    }).filter(topic => topic));
    const result = [...topics];
    util.debug('Got suggestion topics for %o from top: %o', key, result);
    return result;
  };
  request.topicSuggest = topicSuggest;

}());
//#endregion
//#region @require yaofang://content/request/longfeed.js
/**
 * 找到一条超长微博的全文
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  // 这一次我们不再缓存长微博的原文了，因为现在微博神他妈可以编辑了
  const getLongText = async function (mid) {
    const url = new URL('https://weibo.com/p/aj/mblog/getlongtext');
    url.searchParams.set('ajwvr', 6);
    url.searchParams.set('mid', mid);
    url.searchParams.set('__rnd', +new Date());
    util.debug('fetch url %s', url);
    const resp = await network.fetchJson(url);
    const { html } = resp?.data ?? {}; if (!html) return null;
    util.debug('Got longtext for %o: %o', mid, { html });
    return html;
  };
  request.getLongText = getLongText;

}());
//#endregion
//#region @require yaofang://content/request/grouplist.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const request = yawf.request = yawf.request ?? {};

  const i18n = util.i18n;
  const functools = util.functools;

  i18n.whisperGroupName = {
    cn: '悄悄关注',
  };

  const groupList = functools.once(async function () {
    const url = new URL('/ajax/feed/allGroups?is_new_segment=1&fetch_hot=1', location.href).href;
    util.debug('fetch url %s', url);
    const resp = await fetch(url).then(resp => resp.json());
    return resp.groups[1].group; // [1] 是自定义分组，他们代码就这样
  });
  request.groupList = groupList;

}());
//#endregion
//#region @require yaofang://content/request/following.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const getFollowingPage = async function (uid, page) {
    const url = `https://weibo.com/ajax/friendships/friends?page=${page ?? 1}&uid=${uid}`;
    util.debug('Fetch Follow: fetch page %s', url);
    util.debug('fetch url %s', url);
    const resp = await network.fetchJson(url);
    if (!resp || !Array.isArray(resp.users) || !resp.users.length) {
      return {
        allPages: [],
        followInPage: [],
      };
    }
    const pages = resp.next_cursor ? Math.ceil(resp.total_number / (resp.next_cursor - resp.previous_cursor)) : page;
    const allPages = Array.from(Array(pages)).map((_, i) => i + 1);
    // V7 的关注列表现在只能看到用户
    const followInPage = resp.users.map(user => {
      return {
        id: `user-${user.idstr}`,
        type: 'user',
        user: user.idstr,
        url: new URL(user.profile_url, 'https://weibo.com/').href,
        avatar: user.avatar_large,
        name: user.screen_name,
        description: '@' + user.screen_name,
      };
    });
    util.debug('Fetch follow: got %o in page', followInPage.length);
    return { allPages, followInPage };
  };

  request.getFollowingPage = async function (uid, page = null) {
    for (let attempt = 0; attempt < 16; attempt++) {
      if (attempt !== 0) {
        util.debug('Retry fetching user following data; attempt %d', attempt + 1);
      }
      try {
        return await getFollowingPage(uid, page);
      } catch (e) {
        util.debug('Error while fetching user following data: %o', e);
        await new Promise(resolve => { setTimeout(resolve, 30e3 * Math.min(8, attempt)); });
      }
    }
    util.debug('Aborted fetching user following data, too many failed attempts.');
    throw Error('Network error while fetching following data');
  };

}());
//#endregion
//#region @require yaofang://content/request/votedetail.js
/**
 * 获取投票的详情
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const voteDetail = async function (voteId) {
    const url = new URL('https://vote.weibo.com/h5/index/index');
    url.searchParams.set('vote_id', voteId);
    util.debug('fetch url %s', url);
    const resp = await network.fetchText(url);
    const dom = (new DOMParser()).parseFromString(resp, 'text/html');
    const scripts = dom.querySelectorAll('script:not([src])');
    const data = [...scripts].reduce((data, script) => {
      if (data) return data;
      try {
        const data = JSON.parse(script.textContent.match(/\{[\s\S]*\}/)[0]);
        if (!data.vote_info) return null;
        return data;
      } catch (e) {
        return null;
      }
    }, null);
    return data;
  };

  request.voteDetail = voteDetail;

}());
//#endregion
//#region @require yaofang://content/request/feedfavorite.js
/**
 * 收藏一条微博
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const request = yawf.request = yawf.request ?? {};

  const strings = util.strings;

  const feedFavorite = function (feed, { $CONFIG }) {
    const mid = feed.getAttribute('mid');
    const url = String(new URL('/aj/fav/mblog/add?ajwvr=6', location.href));
    const body = String(new URLSearchParams([
      ['mid', mid],
      ...new URLSearchParams(feed.getAttribute('data-mark')),
      ['location', $CONFIG.location],
      ...new URLSearchParams(feed.getAttribute('diss-data')),
    ]));
    util.debug('fetch url %s\nPOST\n%s', url, body);
    return new Promise(resolve => {
      const key = 'feed_favorite_' + strings.randKey();
      const listener = function (event) {
        event.stopPropagation();
        const success = event.detail.success === 'true';
        window.removeEventListener(key, listener, true);
        resolve(success);
      };
      window.addEventListener(key, listener, true);
      util.inject(function ({ url, body }, key) {
        let success = false;
        ; (async function () {
          try {
            const resp = await fetch(url, {
              method: 'POST',
              body: new URLSearchParams(body),
              headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
              },
              credentials: 'include',
            }).then(resp => resp.json());
            success = resp.code === '100000';
          } catch (e) { console.error(e); }
          const event = new CustomEvent(key, {
            detail: { success: JSON.stringify(success) },
          });
          window.dispatchEvent(event);
        }());
      }, { url, body }, key);
    });
  };
  request.feedFavorite = feedFavorite;

}());
//#endregion
//#region @require yaofang://content/request/image.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;

  const request = yawf.request = yawf.request ?? {};

  const getImage = function (url) {
    util.debug('fetch url %s', url);
    return network.fetchBlob(url, { credentials: 'omit' });
  };
  request.getImage = getImage;

}());
//#endregion
//#region @require yaofang://content/request/feedhistory.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const time = util.time;

  const pageSize = 10;
  const feedHistoryPage = async function (mid, page) {
    const host = location.hostname;
    const url = new URL(`https://${host}/p/aj/v6/history?ajwvr=6&domain=100505`);
    url.searchParams.set('mid', mid);
    url.searchParams.set('page', page);
    url.searchParams.set('page_size', pageSize);
    url.searchParams.set('__rnd', Date.now());
    util.debug('fetch url %s', url + '');
    const resp = await network.fetchJson(url + '');
    const data = resp.data;
    const count = data.total_num;
    const dom = new DOMParser().parseFromString(data.html, 'text/html');
    const historyList = [...dom.querySelectorAll('.WB_feed_detail')].map(history => {
      const from = history.querySelector('.WB_from');
      const date = time.parse(from.querySelector('a').textContent.trim());
      from.remove();
      const text = history.querySelector('.WB_text');
      // 我也不知道为什么末尾有一个零宽空格，而且零宽空格前还可能有空格
      const source = text.textContent.replace(/^[\s]*|[\s\u200b]*$/g, '');
      text.textContent = source;
      const imgs = Array.from(history.querySelectorAll('.WB_pic img'));
      if (imgs.length) {
        const old = history.querySelector('.WB_media_wrap');
        const media = document.createElement('div');
        media.innerHTML = '<div class="WB_media_wrap clearfix"><div class="media_box"><ul class="WB_media_a clearfix"><li class="WB_pic S_bg1 S_line2" action-type="fl_pics"></li></ul></div></div>';
        const ul = media.querySelector('ul');
        const li = ul.removeChild(ul.firstChild);
        ul.classList.add('WB_media_a_m' + imgs.length);
        if (imgs.length > 1) ul.classList.add('WB_media_a_mn');
        imgs.forEach((img, index) => {
          const container = li.cloneNode(true);
          container.classList.add('li_' + (index + 1));
          container.appendChild(img);
          const actionData = new URLSearchParams('isPrivate=0&relation=0');
          actionData.set('pic_id', img.src.replace(/^.*\/|\..*$/g, ''));
          container.setAttribute('action-data', actionData);
          ul.appendChild(container);
        });
        old.replaceWith(media.firstChild);
      }
      return { date, dom: history, text: source, imgs };
    });
    return { count, list: historyList };
  };

  const feedHistory = async function (mid) {
    const { count, list } = await feedHistoryPage(mid, 1);
    const pages = Math.ceil(count / pageSize);
    for (let i = 2; i <= pages; i++) {
      const data = await feedHistoryPage(mid, i);
      list.push(...data.list);
    }
    list.forEach((item, index) => {
      item.index = list.length - index;
    });
    return list;
  };
  request.feedHistory = feedHistory;

}());
//#endregion
//#region @require yaofang://content/request/allimage.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const getAllImages = async function (author, mid) {
    const url = new URL(`https://weibo.com/${author}/${util.mid.encode(mid)}`);
    const html = await network.fetchText(url + '');
    const domParser = new DOMParser();
    const page = domParser.parseFromString(html, 'text/html');
    const scripts = Array.from(page.querySelectorAll('script'));
    const feedModel = scripts.reduce((feedModel, script) => {
      if (feedModel) return feedModel;
      const content = script.textContent.match(/^\s*FM\.view\((\{.*\})\);?\s*$/);
      if (!content) return null;
      const model = JSON.parse(content[1]);
      if (model.ns !== 'pl.content.weiboDetail.index') return null;
      return model;
    }, null);
    if (!feedModel) return null;
    const feed = domParser.parseFromString(feedModel.html, 'text/html').querySelector('[mid]');
    const imgs = Array.from(feed.querySelectorAll('.WB_pic img'));
    return imgs.map(img => img.src.replace(/^https:/, ''));
  };
  request.getAllImages = getAllImages;

}());
//#endregion
//#region @require yaofang://content/request/article.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request ?? {};

  const ignoreError = function (callback) {
    try { return callback(); } catch (e) { /* ignore */ }
    return null;
  };

  const feedCard = function (mid) {
    const iframe = document.createElement('x-iframe');
    iframe.setAttribute('src', `https://card.weibo.com/article/v3/cardiframe?type=feed&id=${mid}`);
    iframe.className = 'card feed-card';
    return iframe;
  };

  const mediaCard = function (id) {
    const mediaType = { 100120: 'movie' }[id.slice(0, 6)];
    if (!mediaType) return null;
    const iframe = document.createElement('x-iframe');
    iframe.setAttribute('src', `https://card.weibo.com/article/v3/cardiframe?type=movie&id=1022:${id}`);
    iframe.className = `card media-card ${mediaType}-media-card`;
    return iframe;
  };

  const scriptVideo = function (script) {
    try {
      const match = script.match(/krv\.init\(\{(?:(?=.*src['"]?\s*:\s*(".*?(?!\\).")))(?:(?=.*poster['"]?\s*:\s*(".*?(?!\\).")))/);
      const [_, src, poster] = match;
      const video = document.createElement('video');
      video.controls = true;
      video.src = JSON.parse(src);
      video.poster = JSON.parse(poster);
      return video;
    } catch (e) {
      return null;
    }
  };

  const whiteListTags = [
    'a',
    'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'ol', 'ul', 'li',
    'sup', 'sub',
    'img',
    'table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td',
    'blockquote', 'quote',
    'br', 'hr',
    'span', 'div',
  ];
  const whiteListAttribute = tagName => [
    ...({
      img: ['src'],
    }[tagName] ?? []),
  ];
  const whiteListStyle = {
    'text-align': /^(?:left|right|center|justify)$/,
    'font-style': /^italic$/,
    'font-weight': /^bold$/,
    'text-decoration-line': /^(?:underline|line-through)$/,
    color: function (color) {
      try {
        const [r, g, b] = color.match(/rgba?\((.*)\)/)[1].split(',').map(Number);
        if (Math.max(r, g, b) < 45) return 'var(--text-color)';
        return `rgb(${r}, ${g}, ${b})`;
      } catch (e) {
        return null;
      }
    },
  };
  const parseSpecialElements = function (/** @type {HTMLElement} */container) {
    /** @type {Map<HTMLElement, HTMLElement>} */
    const placeholders = new Map();
    const replaceElement = (source, result) => {
      const placeholder = document.createElement('x-sanitize-placeholder');
      placeholders.set(placeholder, result);
      source.replaceWith(placeholder);
    };
    Array.from(container.querySelectorAll('.WB_feed[data-mid]')).forEach(element => {
      // 引用一条微博
      const card = ignoreError(() => feedCard(element.getAttribute('data-mid')));
      replaceElement(element, card);
    });
    Array.from(container.querySelectorAll('.cardbox')).forEach(element => {
      // 引用电影简介
      /** @type {HTMLAnchorElement} */
      const link = element.querySelector('a[href^="https://weibo.com/p/"]');
      if (link) {
        const id = link.href.split('/').pop();
        const media = id && ignoreError(() => mediaCard(id));
        replaceElement(element, media);
      }
    });
    Array.from(container.querySelectorAll('script')).forEach(element => {
      // 插入一段视频
      if (/krv.init\(\{.*\}\)/.test(element.textContent)) {
        const video = ignoreError(() => scriptVideo(element.textContent));
        replaceElement(element, video);
      }
      replaceElement(element, null);
    });
    return placeholders;
  };
  const sanitizeAnchorElement = function (element) {
    let url;
    try { url = new URL(element.href); } catch (e) { url = null; }
    if (!url || !['http:', 'https:'].includes(url.protocol)) {
      const span = document.createElement('span');
      return span;
    }
    const anchor = document.createElement('a');
    anchor.href = url.href;
    anchor.referrerPolicy = 'no-referrer';
    anchor.target = '_blank';
    return anchor;
  };
  const anotherTag = function (tagName, ori) {
    const result = document.createElement(tagName);
    if (ori.hasAttribute('style')) result.setAttribute('style', ori.getAttribute('style'));
    while (ori.firstChild) result.appendChild(ori.firstChild);
    ori.replaceWith(result);
    return result;
  };
  const sanitizeContent = function (/** @type {HTMLElement} */element) {
    const container = document.createElement('div');
    container.appendChild(element);
    const placeholders = parseSpecialElements(container);
    // 把属性换成 CSS
    [{ html: 'color', css: 'color' }, { html: 'align', css: 'textAlign' }].forEach(({ html, css }) => {
      [...container.querySelectorAll(`[${html}]`)].forEach(e => e.style[css] = e.getAttribute(html));
    });
    // 把 font 标签换成 span
    [...container.querySelectorAll('font')].forEach(e => {
      anotherTag('span', e);
    });
    // 把标签换成 CSS
    [
      { tag: 'b', css: { attr: 'font-weight', value: 'bold' } },
      { tag: 'del', css: { attr: 'text-decoration', value: 'line-through' } },
      { tag: 'em', css: { attr: 'font-style', value: 'italic' } },
      { tag: 'i', css: { attr: 'font-style', value: 'italic' } },
      { tag: 's', css: { attr: 'text-decoration', value: 'line-through' } },
      { tag: 'strike', css: { attr: 'text-decoration', value: 'line-through' } },
      { tag: 'strong', css: { attr: 'font-weight', value: 'bold' } },
      { tag: 'u', css: { attr: 'text-decoration', value: 'underline' } },
    ].forEach(({ tag, css: { attr, value } }) => {
      [...container.getElementsByTagName(tag)].forEach(e => {
        anotherTag('span', e).style.setProperty(attr, value);
      });
    });
    // 把图片配字换成 figure
    if (element.matches('.picbox')) do {
      const ori = element.querySelector('img[src]');
      const description = element.querySelector('.picinfo');
      if (!ori) break;
      const figure = document.createElement('figure');
      const img = figure.appendChild(document.createElement('img'));
      img.src = ori.src;
      const descriptionText = description?.textContent.trim();
      if (descriptionText) {
        const figcaption = figure.appendChild(document.createElement('figcaption'));
        figcaption.textContent = descriptionText;
      }
      return [figure];
    } while (false);
    // 最后剩下的元素再做一次消毒
    return [...container.childNodes].map(function sanitize(node) {
      try {
        if (placeholders.has(node)) return placeholders.get(node);
        if (node.nodeType === Node.TEXT_NODE) {
          return document.createTextNode(node.textContent);
        }
        const element = node;
        if (element.nodeType !== Node.ELEMENT_NODE) return null;
        if (!(element instanceof HTMLElement)) return null;
        const oriTagName = element.tagName.toLowerCase();
        const tagName = whiteListTags.includes(oriTagName) ? oriTagName : 'span';
        if (tagName === 'a') {
          const anchor = sanitizeAnchorElement(element);
          Array.from(element.childNodes).forEach(node => anchor.appendChild(sanitize(node)));
          return anchor;
        }
        const result = document.createElement(tagName);
        const attributes = whiteListAttribute(tagName);
        Array.from(element.attributes).forEach(attribute => {
          if (attributes.includes(attribute.name)) {
            result.setAttribute(attribute.name, attribute.value);
          }
        });
        const style = element.style;
        Array.from(style).forEach(prop => {
          const value = style.getPropertyValue(prop);
          const testValue = whiteListStyle[prop];
          if (testValue instanceof RegExp) {
            if (!testValue.test(value)) return;
            result.style.setProperty(prop, value);
          } else if (typeof testValue === 'function') {
            const parsed = testValue(value);
            if (parsed === null) return;
            result.style.setProperty(prop, parsed);
          }
        });
        Array.from(element.childNodes).forEach(node => {
          const sanitized = sanitize(node);
          if (sanitized) result.appendChild(sanitized);
        });
        return result;
      } catch (e) {
        try {
          const result = document.createElement('span');
          Array.from(element.childNodes).forEach(node => {
            const sanitized = sanitize(node);
            if (sanitized) result.appendChild(sanitized);
          });
          return result;
        } catch (e2) {
          try {
            return document.createTextNode(node.textContent);
          } catch (e3) {
            return null;
          }
        }
      }
    }).filter(x => x);
  };

  const parseContent = function (/** @type {HTMLElement} */content) {
    const result = document.createElement('div');
    [...content.children].forEach(element => {
      sanitizeContent(element).forEach(node => result.appendChild(node));
    });
    return result.innerHTML;
  };

  const parseArticle = function (document) {
    const article = document.querySelector('[node-type="articleContent"]');
    const result = {};
    result.title = ignoreError(() => article.querySelector('[node-type="articleTitle"]').textContent);
    result.author = ignoreError(() => {
      const author = {};
      author.avatar = article.querySelector('.authorinfo img').src;
      author.name = article.querySelector('.authorinfo a').textContent.trim();
      author.uid = article.querySelector('.authorinfo a').href.split('/').pop();
      author.inner = ignoreError(() => {
        const inner = {};
        const author2 = article.querySelector('.authorinfo .author2in');
        if (!author2) return null;
        const link = author2.querySelector('a[href^="/u/"]');
        if (link) {
          inner.name = link.textContent.trim();
          inner.uid = link.href.split('/').pop();
        } else {
          inner.name = author2.textContent.trim().replace(/^\s*\S+\s+/, '');
        }
        return inner;
      });
      return author;
    });
    result.feed = ignoreError(() => {
      const fakeFeed = document.querySelector('.WB_feed [mid]');
      const mid = fakeFeed.getAttribute('mid');
      const comment = document.querySelector('[action-type="fl_comment"]');
      const ouid = new URLSearchParams(comment.getAttribute('action-data')).get('ouid');
      return `https://weibo.com/${ouid}/${util.mid.encode(mid)}`;
    });
    result.time = ignoreError(() => article.querySelector('.time').textContent);
    result.lead = ignoreError(() => article.querySelector('.preface').textContent);
    result.cover = ignoreError(() => document.querySelector('[node-type="articleHeaderPic"]').src);
    result.source = ignoreError(() => article.querySelector('.authorinfo .del a[suda-uatrack*="headline_pc_trend_ourl_click"]').href);
    result.createTime = ignoreError(() => article.querySelector('.time').textContent);
    result.content = ignoreError(() => parseContent(article.querySelector('[node-type="contentBody"]')));
    return result;
  };

  const getArticle = async function (id) {
    const url = 'https://weibo.com/ttarticle/p/show?id=' + id;
    util.debug('fetch url %s', url);
    const resp = await network.fetchText(url);
    /** @type {HTMLDocument} */
    const dom = new DOMParser().parseFromString(resp, 'text/html');
    return parseArticle(dom);
  };
  request.getArticle = getArticle;

  const getArticleCard = async function (src) {
    util.debug('fetch url %s', src);
    const oriHtml = await network.fetchText(src);
    const html = oriHtml.replace(/<head>/, '<head><base target="_blank" href="https://card.weibo.com/" /><meta name="referrer" content="no-referrer" />');
    return html;
  };
  request.getArticleCard = getArticleCard;

}());
//#endregion
//#region ployfill of browser.storage
; (function () {
  const browser = window.weBrowser = window.weBrowser || {};

  const storage = {};
  browser.storage = storage;

  const supportOnChanged = Boolean(GM.addValueChangeListener);

  const onChangeListeners = [];
  const triggerOnChange = function ({ changes, areaName }) {
    onChangeListeners.forEach(listener => {
      try {
        listener(JSON.parse(JSON.stringify(changes)), areaName);
      } catch (e) { /* ignore */ }
    });
  };

  const collectedKeys = new Set();
  const collectValues = function (gmkey) {
    if (!supportOnChanged) return;
    if (collectedKeys.has(gmkey)) return;
    collectedKeys.add(gmkey);
    GM.addValueChangeListener(gmkey, function (gmkey, oldValue, newValue) {
      const areaName = gmkey.slice(0, gmkey.indexOf('::'));
      const key = gmkey.slice(gmkey.indexOf('::') + 2);
      triggerOnChange({
        changes: {
          [key]: {
            oldValue: JSON.parse(oldValue),
            newValue: JSON.parse(newValue),
          },
        },
        areaName,
      });
    });
  };

  const storageArea = function (area) {
    const prefix = area + '::';
    /**
     * @param {any} keys
     */
    const get = async function (keys) {
      const keyList = [];
      if (typeof keys === 'string') {
        keyList.push({ key: keys, defaultValue: void 0 });
      } else if (Array.isArray(keys)) {
        keys.forEach(key => {
          if (typeof key !== 'string') return;
          keyList.push({ key, defaultValue: void 0 });
        });
      } else if (keys instanceof Object) {
        Object.keys(keys).forEach(key => {
          keyList.push({ key, defaultValue: keys[key] });
        });
      } else if (keys == null) {
        (await GM.listValues()).forEach(key => {
          if (!key.startsWith(prefix)) return;
          keyList.push({
            key: key.slice(prefix.length),
            defaultValue: void 0,
          });
        });
      }
      const allGet = keyList.map(async ({ key, defaultValue }) => {
        collectValues(prefix + key);
        try {
          const value = await GM.getValue(prefix + key);
          if (value == null) return defaultValue;
          return JSON.parse(value);
        } catch (e) {
          return void 0;
        }
      });
      const result = await Promise.all(allGet);
      return Object.assign({}, ...keyList.map(({ key }, index) => (
        result[index] !== (void 0) ? ({ [key]: result[index] }) : {}
      )));
    };
    const getBytesInUse = function () {
      throw new Error('Method not implemented');
    };
    const set = async function (keys) {
      const serialized = [];
      Object.keys(keys).forEach(key => {
        serialized.push({ key, value: JSON.stringify(keys[key]) });
      });
      const allSet = serialized.map(({ key, value }) => {
        collectValues(prefix + key);
        return GM.setValue(prefix + key, value);
      });
      await Promise.all(allSet);
    };
    const remove = async function (keys) {
      const keyList = [];
      if (typeof keys === 'string') {
        keyList.push(keys);
      } else if (Array.isArray(keys)) {
        keyList.push(...keys);
      }
      const allDelete = keyList.map(key => {
        return GM.deleteValue(prefix + key);
      });
      await Promise.all(allDelete);
    };
    const clear = async function () {
      const keys = await GM.listValues();
      return remove(keys.filter(key => key.startsWith(prefix)));
    };
    return {
      get,
      getBytesInUse,
      set,
      remove,
      clear,
    };
  };

  storage.sync = storageArea('sync');
  storage.local = storageArea('local');

  const onChanged = storage.onChanged = {};
  onChanged.addListener = function (listener) {
    if (onChangeListeners.includes(listener)) return;
    onChangeListeners.push(listener);
  };
  onChanged.removeListener = function (listener) {
    const index = onChangeListeners.indexOf(listener);
    if (index !== -1) {
      onChangeListeners.splice(index, 1);
    }
  };
  onChanged.hasListener = function (listener) {
    return onChangeListeners.includes(listener);
  };

}());
//#endregion
//#region @require yaofang://content/storage/storage.js
; (function () {

  const browser = window.weBrowser;
  const yawf = window.yawf = window.yawf ?? {};
  const util = yawf.util = yawf.util ?? {};

  const storage = yawf.storage = {};

  /**
   * 当设置项变化时给出针对某个设置的回调
   * 浏览器提供的接口会针对所有设置项给回调，但是我们显然只需要特定的设置项，所以包装一层
   */
  class StorageWatcher {
    constructor() {
      /** @type {Object<string, Map<string, Set<Function>>>} */
      this.watcher = { local: new Map(), sync: new Map() };
      browser.storage.onChanged.addListener((changes, area) => {
        const watcher = this.watcher[area];
        Object.keys(changes).forEach(key => {
          if (!watcher.has(key)) return;
          const { oldValue, newValue } = changes[key];
          watcher.get(key).forEach(callback => {
            try {
              callback(newValue, oldValue);
            } catch (e) {
              util.debug('Error while invoke storage watcher %s.%s -> %o:\n%o', area, key, callback, e);
            }
          });
        });
      });
    }
    /**
     * @param {StorageItem} storage
     * @param {Function} callback
     */
    addListener(storage, callback) {
      const watcher = this.watcher[storage.area];
      if (!watcher.has(storage.key)) watcher.set(storage.key, new Set());
      watcher.get(storage.key).add(callback);
      const removeListener = function () {
        if (!watcher.has(storage.key)) return false;
        const callbacks = watcher.get(storage.key);
        const result = callbacks.delete(callback);
        if (callbacks.size === 0) watcher.delete(storage.key);
        return result;
      };
      return { removeListener };
    }
  }

  const watcher = new StorageWatcher();

  /**
   * 描述对应浏览器的一个设置项
   * 设置项的值总是一个对象，对象的不同键对应其他的含义
   */
  class StorageItem {
    /**
     * @param {string} key
     * @param {boolean} isLocal
     */
    constructor(key, isLocal = false) {
      this.area = isLocal ? 'local' : 'sync';
      this.key = key;
      this.last = Promise.resolve();
      this.processing = false;
      this.dirty = false;
      this.initialized = false;
      /** @type Array<Function> */
      this.watcher = [];
      watcher.addListener(this, newValue => {
        /*
         * 如果当前正有任何操作，那么这个 onChange 可能是我们自己触发的，
         * 而且有可能这个 onChange 还不是最新的（比如我们连续调用了几次 set，只有最后一次是有意义的）
         * 那么我们推迟 onChange 事件的发生，等到我们的数据写入完成之后，再读取最新的数据检查 onChange
         * 如果当前没有操作，那么说明 onChange 可能来自于其他页面
         * 这时候我们就可以放心大胆地触发 onChange 了
         */
        if (this.processing) {
          this.dirty = true;
          return;
        }
        this.onChange(newValue);
      });
    }
    async run(callback) {
      /*
       * 当执行异步操作时，我们首先标记 processing 以阻止 onChange
       * 接下来正常执行操作
       */
      this.processing = true;
      const last = this.last = this.last.then(callback).then(value => value, error => {
        util.debug('Error while handling storage: %o', error);
      });
      last.then(async () => {
        if (last !== this.last) return;
        /*
         * 回调有时候有延迟，所以我们过 5 秒再检查，可以过滤掉无效的回调
         * 并不是什么很好的解决办法，但是反正我也没找到更好的解决办法
         */
        await new Promise(resolve => setTimeout(resolve, 5000));
        /*
         * 如果标记位不是我们设置的，那么说明在此之后又调用了 run
         * 那么这个时候 processing 不应重置
         */
        if (last !== this.last) return;
        /*
         * 如果在写入过程中，有 onChange 回报回来，那么 dirty 被置位
         * 此时我们主动拉去一遍值来触发 onChange
         * 注意，此时 onChange 可能被无意义地触发了一次，所以需要在上一层过滤这种实际没变化的 onChange
         */
        this.processing = false;
        if (!this.dirty) return;
        const { [this.key]: value } = await browser.storage[this.area].get(this.key);
        /*
         * onChange 在 last 的流程内，会在结束前阻止任何后续操作
         */
        await this.onChange(value);
      });
      return this.last;
    }
    async onChange(value) {
      this.dirty = false;
      this.watcher.forEach(watcher => {
        try {
          watcher(value);
        } catch (e) {
          util.debug('Error while invoke stroage watcher: %o', e);
        }
      });
    }
    async get() {
      let results = await this.run(() => (
        browser.storage[this.area].get(this.key)
      ));
      if (!this.initialized && this.area === 'local' && !Object.hasOwnProperty.call(results, this.key)) {
        results = await this.run(async () => {
          const data = await browser.storage.sync.get(this.key);
          await browser.storage.local.set(data);
          return data;
        });
      }
      this.initialized = true;
      return results[this.key];
    }
    /** @param {*} value */
    async set(value) {
      const token = this.lastSetToken = {};
      await this.run(() => {
        if (token !== this.lastSetToken) return null;
        this.lastSetToken = null;
        return browser.storage[this.area].set({ [this.key]: value });
      });
    }
    async remove() {
      await this.run(() => (
        browser.storage[this.area].remove(this.key)
      ));
    }
    /** @param {Function} callback */
    addListener(callback) {
      this.watcher.push(callback);
    }
  }

  storage.Storage = function (key, isLocal = false) {
    return new StorageItem(key, isLocal);
  };

  class ConfigCollection {
    /**
     * @param {StorageItem} storage
     */
    constructor(storage) {
      this.storage = storage;
      /** @type {Map<string, Set<Function>>} */
      this.watcher = new Map();
      this.initialized = false;
    }
    triggerOnChanged(key, newValue, oldValue) {
      const callbacks = this.watcher.get(key);
      if (!callbacks?.size) return;
      const clonedNewValue = newValue && JSON.parse(JSON.stringify(newValue));
      const clonedOldValue = oldValue && JSON.parse(JSON.stringify(oldValue));
      callbacks.forEach(callback => {
        try {
          callback(clonedNewValue, clonedOldValue);
        } catch (e) {
          util.debug('Error while call config onchange callback: %o, %s [%o, %o]', this.storage, key, clonedNewValue, clonedOldValue);
        }
      });
    }
    async init() {
      if (this.initialized) return;
      this.initialized = true;
      while (true) {
        this.value = await this.storage.get();
        if (typeof this.value === 'object') break;
        await this.storage.set({});
      }
      this.storage.addListener(newValues => {
        const values = this.value;
        const keys = new Set(Object.keys(values).concat(Object.keys(newValues)));
        keys.forEach(key => {
          const newValue = newValues[key];
          const strNewValue = newValue === void 0 ? void 0 : JSON.stringify(newValue);
          const oldValue = values[key];
          const strOldValue = oldValue === void 0 ? void 0 : JSON.stringify(oldValue);
          if (strNewValue === strOldValue) return;
          values[key] = strNewValue === void 0 ? void 0 : JSON.parse(strNewValue);
          this.triggerOnChanged(key, strNewValue && JSON.parse(strNewValue), oldValue);
        });
      });
    }
    /** @param {string} key */
    get(key) {
      if (!this.initialized) throw Error('Config should initialized first');
      return this.value[key] && JSON.parse(JSON.stringify(this.value[key]));
    }
    /**
     * @param {string} key
     * @param {*} value
     */
    set(key, value) {
      if (!this.initialized) throw Error('Config should initialized first');
      const values = this.value;
      const oldValue = values[key];
      const strOldValue = oldValue === void 0 ? void 0 : JSON.stringify(oldValue);
      const strNewValue = value === void 0 ? void 0 : JSON.stringify(value);
      if (strNewValue !== strOldValue) {
        if (strNewValue) values[key] = JSON.parse(strNewValue);
        else delete values[key];
        this.storage.set(values);
        /*
         * 我们不必等值真的写入了，就可以触发 onChange
         * 这样会优化前端的渲染效果
         * 反正就算真的写挂了，我也没辙（摊手）
         */
        this.triggerOnChanged(key, value, oldValue);
      }
      return strNewValue && JSON.parse(strNewValue);
    }
    /** @param {string} key */
    remove(key) {
      return this.set(key, void 0);
    }
    /**
     * @param {string} key
     * @param {Function} callback
     */
    addListener(key, callback) {
      const watcher = this.watcher;
      if (!watcher.has(key)) watcher.set(key, new Set());
      watcher.get(key).add(callback);
      const removeListener = function () {
        if (!watcher.has(key)) return false;
        const callbacks = watcher.get(key);
        const result = callbacks.delete(callback);
        if (callbacks.size === 0) watcher.delete(key);
        return result;
      };
      return { removeListener };
    }
    /** @param {string} key */
    key(key) {
      return new ConfigKey(this, key);
    }
    async importConfig(data) {
      this.value = JSON.parse(JSON.stringify(data));
      await this.storage.set(this.value);
    }
    export() {
      return JSON.parse(JSON.stringify(this.value));
    }
    async reset() {
      await this.storage.set({});
    }
  }

  class ConfigKey {
    /**
     * @param {ConfigCollection} config
     * @param {string} key
     */
    constructor(config, key) {
      this.config = config;
      this.key = key;
    }
    get() { return this.config.get(this.key); }
    set(value) { return this.config.set(this.key, value); }
    remove() { return this.config.remove(this.key); }
    addListener(callback) {
      return this.config.addListener(this.key, callback);
    }
  }

  storage.Config = function (storage) {
    return new ConfigCollection(storage);
  };

}());

// 将数据从 sync 移动到 local
; (async function () {
  const browser = window.weBrowser;
  const [syncStorage, localStorage] = await Promise.all([
    browser.storage.sync.get(),
    browser.storage.local.get(),
  ]);
  const [syncKeys, localKeys] = [syncStorage, localStorage].map(storage => Object.keys(storage || {}));
  const syncOnlyKeys = syncKeys.filter(key => !localKeys.includes(key));
  const updateObject = Object.assign({}, ...syncOnlyKeys.map(key => ({ [key]: syncStorage[key] })));
  await browser.storage.local.set(updateObject);
}());
//#endregion
//#region @require yaofang://content/storage/config.js
; (function () {

  const yawf = window.yawf = window.yawf ?? {};

  const storage = yawf.storage;
  const config = yawf.config = yawf.config ?? {};
  const pools = config.pools = [];

  config.init = async function (uid) {
    const userPromise = uid != null ? config.pool('Config', { uid, isLocal: true }) : Promise.resolve(null);
    const globalPromise = config.pool('Config', { isLocal: true });
    const [user, global] = await Promise.all([userPromise, globalPromise]);
    Object.assign(config, { user, global });
  };

  config.pool = async function (poolName, config = {}) {
    const { uid = null, isLocal = false } = config;
    const prefix = uid ? `user${uid}` : 'global';
    const name = prefix + poolName;
    const storageItem = storage.Storage(name, isLocal);
    const pool = storage.Config(storageItem);
    Object.assign(pool, config);
    await pool.init();
    pools.push(pool);
    return pool;
  };

}());
//#endregion
//#region @require yaofang://content/shorturl/redirect.js
; (function () {

  // 脚本版需要这行，所以这里姑且加上
  if (location.host !== 't.cn') return;

  const yawf = window.yawf;
  const config = yawf.config;

  /** @type {Promise} */
  const configPromise = config.init();

  const hideAll = document.createElement('style');
  hideAll.textContent = `
body { display: none; }
html { background: #f9f9fa; }
@media (prefers-color-scheme: dark) { html { background: #2a2a2e; } }
`;
  document.documentElement.appendChild(hideAll);

  const fixUrl = function (url) {
    // 显示的字符编码是错的
    // 原本 UTF-8 编码的网址用 Latin-1 展示的
    let fixEncodingUrl = url;
    try {
      const codePoints = [...url].map(x => x.charCodeAt());
      if (codePoints.every(code => code < 256)) {
        fixEncodingUrl = new TextDecoder().decode(new Uint8Array(codePoints));
      }
    } catch (e) {
      fixEncodingUrl = url;
    }
    if (!/https?:\/\/.*/i.test(fixEncodingUrl)) return null;
    return fixEncodingUrl;
  };

  const onLoad = function () {
    configPromise.then(() => {
      const useRedirect = config.global.key('short_url_wo_confirm').get();
      if (!useRedirect) return false;
      let url = [
        () => document.querySelector('.open-url a').href,
        () => document.querySelector('.link').textContent.trim(),
        () => document.querySelector('.url_view_code').textContent.trim(),
      ].reduce((url, getter) => {
        if (url) return url;
        try {
          return fixUrl(getter());
        } catch (e) { return null; }
      }, null);
      if (!url) return false;
      location.replace(url);
      return true;
    }).then(r => r, () => false).then(redirect => {
      if (!redirect) hideAll.remove();
    });
  };

  if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
    setTimeout(onLoad, 0);
  } else {
    document.addEventListener('DOMContentLoaded', onLoad);
  }

}());
//#endregion
//#region custom implementation redirect
; (function () {
  if (location.host !== 't.cn') return;
  throw new Error('YAWF | t.cn page found, skip following executions');
}());
//#endregion
//#region @require yaofang://content/init/page.js
/*
 * 检查当前页面的类型
 */
; (function () {

  const yawf = window.yawf;
  const init = yawf.init = yawf.init ?? {};

  const page = init.page = init.page ?? {};

  page.route = null;
  page.update = function (route) {
    page.route = route;
  };
  page.type = function () {
    if (location.pathname.startsWith('/tv/')) return 'tv';
    const route = page.route;
    if (route.name === 'home') return 'home';
    if (route.name === 'profile') return 'profile';
    if (route.name === 'like') return 'like';
    if (route.name === 'collect') return 'fav';
    if (route.name === 'mygroups') {
      // 最新微博
      if (/^11000/.test(route.query.gid)) return 'home';
      // 分组
      return 'group';
    }
    if (route.name === 'weibo') {
      const channel = route.meta?.channel;
      // 热门
      if (channel === 'hot') return 'discover';
      // 首页
      if (channel === 'home') return 'home';
    }
    if (route.channel === 'sweiboDefault') return 'search';
    if (route.channel === 'sweibo') return 'search';
    if (route.channel === 'suserDefault') return 'search';
    return null;
  };
  page.oid = function () {
    const route = page.route;
    return route.name === 'profile' ? route.params.id : null;
  };
  page.uid = function () {
    return page.config.user.idstr;
  };

}());
//#endregion
//#region @require yaofang://content/init/init.js
/*
 * 初始化相关流程
 *
 * 初始化流程
 * Ready:
 *   当获取到 根元素 参数时尽快调用
 * Load:
 *   当 DOMContentLoaded 时调用，此时 DOM 树可用
 *   Load 总是在 Ready 之后
 * Deinit:
 *   当出错时调用，此时应当消除之前行为的各种副作用
 *   Deinit 可能不触发 Ready，也可能在 Ready 之后
 *   Deinit 与 Load 互斥
 *
 * 如果注册的回调返回一个 thenable 对象，那么会等它解决再继续后续的回调
 * 如果不希望让后面的逻辑异步进行，请不要直接用 async 函数，而是在普通函数里再写一个 async
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init = yawf.init ?? {};

  const page = init.page = init.page ?? {};

  const validPageReady = config => {
    // 必须的参数
    if (!config) return false;
    if (!config.user) return false;
    if (!config.user.idstr) return false;
    if (!config.user.screen_name) return false;
    return true;
  };

  const validPageDom = () => {
    // 如果有登录按钮，则说明没有登录，此时不工作
    if (document.querySelector('.loginBtn')) return false;
    return true;
  };

  /** @type {boolean?} */
  let status = null;
  /** @type {Set<{ callback: Function, priority: number }>} */
  const onReadyCallback = new Set();
  /** @type {Set<{ callback: Function, priority: number }>} */
  const onLoadCallback = new Set();
  /** @type {Set<{ callback: Function, priority: number }>} */
  const onConfigChangeCallback = new Set();
  /** @type {Set<{ callback: Function, priority: number }>} */
  const onDeinitCallback = new Set();

  const noop = () => { };

  /**
   * @param {Set<{ callback: Function, priority: number }>} set
   */
  const runSet = async set => {
    const list = [...set.values()].sort((p, q) => q.priority - p.priority);
    for (const { callback } of list) {
      try {
        const result = callback();
        if (typeof result?.then === 'function') {
          await Promise.resolve(result);
        }
      } catch (e) {
        util.debug('Error while initializing:\n%o', e);
      }
    }
    set.clear();
  };

  init.status = () => status;
  // 触发 Ready
  init.ready = async config => {
    status = true;
    init.ready = init.deinit = noop;
    util.debug('yawf onready');
    await runSet(onReadyCallback);
    if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
      setTimeout(init.dcl, 0);
    } else {
      document.addEventListener('DOMContentLoaded', init.dcl);
    }
  };
  // 触发 ConfigChange
  init.configChange = async config => {
    util.debug('yawf onconfigchange: %o', config);
    if (validPageReady(config)) {
      if (!page.route) return;
      page.config = config;
      await runSet(onConfigChangeCallback);
      await init.ready(config);
    } else {
      await init.deinit();
      return;
    }
  };
  // 触发 Deinit
  init.deinit = async () => {
    status = false;
    init.deinit = init.ready = init.dcl = noop;
    util.debug('yawf deinit');
    await runSet(onDeinitCallback);
  };
  // 触发 Load
  init.dcl = async () => {
    if (!validPageDom()) {
      await init.deinit();
      return;
    }
    status = {};
    init.dcl = noop;
    util.debug('yawf onload');
    await runSet(onLoadCallback);
  };

  const register = callbackCollection => (
    (callback, { priority = util.priority.DEFAULT } = {}) => {
      if (status === null) {
        callbackCollection.add({ callback, priority });
      } else if (status) {
        Promise.resolve().then(callback);
      }
    }
  );

  init.onReady = register(onReadyCallback);
  init.onLoad = register(onLoadCallback);
  init.onConfigChange = register(onConfigChangeCallback);
  init.onDeinit = register(onDeinitCallback);

}());
//#endregion
//#region @require yaofang://content/init/setup.js
/**
 */
; (function () {
  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init;

  const strings = util.strings;
  const key = `yawf_${strings.randKey()}`;

  util.inject.rootKey = `yawf_${strings.randKey()}`;

  document.documentElement.addEventListener(key, function (event) {
    if (event.detail.route) {
      const route = JSON.parse(event.detail.route);
      init.page.update(route);
    }
    if (event.detail.config) {
      const config = JSON.parse(event.detail.config);
      init.configChange(config);
    }
  }, true);

  util.inject(function (rootKey, key) {
    let rootVm = null;

    const kebabCase = function (word) {
      if (typeof word !== 'string') return word;
      return word.replace(/./g, (char, index) => {
        const lower = char.toLowerCase();
        if (char === lower || index === 0) return lower;
        else return '-' + lower;
      });
    };

    /** @type {Map<string, Set<() => void>>} */
    const watchComponentVMCallbacks = new Map();
    /** @type {Set<WeakSet<VM>>} */
    const allComponentVM = new WeakSet();
    /** @type {Map<string, Set<WeakRef<VM>>>} */
    const allComponentVMByTagName = new Map();
    const finalizeVm = new FinalizationRegistry((byTagName, ref) => {
      byTagName.delete(ref);
    });
    // 发现任何 Vue 元素的时候上报消息以方便其他模块修改该元素
    const reportNewVM = function (vm, node, replace) {
      const tag = getTag(vm);
      if (allComponentVM.has(vm)) return;
      allComponentVM.add(vm);

      const ref = new WeakRef(vm);
      if (!allComponentVMByTagName.has(tag)) {
        allComponentVMByTagName.set(tag, new Set());
      }
      const byTagName = allComponentVMByTagName.get(tag);
      byTagName.add(ref);
      finalizeVm.register(vm, byTagName, ref);

      if (watchComponentVMCallbacks.has(tag)) {
        [...watchComponentVMCallbacks.get(tag)].forEach(callback => {
          callback(vm);
        });
      }
    };
    const watchComponentVM = function (tag, callback) {
      if (!watchComponentVMCallbacks.has(tag)) {
        watchComponentVMCallbacks.set(tag, new Set());
      }
      const callbacks = watchComponentVMCallbacks.get(tag);
      callbacks.add(callback);
      return function unwatch() {
        callbacks.delete(callback);
        callback = null;
      };
    };
    const getComponentsByTagName = function (tag) {
      if (!allComponentVMByTagName.has(tag)) return [];
      return [...allComponentVMByTagName.get(tag)].flatMap(ref => {
        const vm = ref.deref();
        if (!vm || !vm._isMounted) return [];
        return [vm];
      });
    };
    const eachComponentVM = function (tag, callback, { mounted = true, watch = true } = {}) {
      let error = false;
      const cb = function (vm) {
        try {
          callback(vm);
        } catch (e) {
          if (!error) {
            console.error('Error while running eachCompontentVM callback %o:\n%o', callback, e);
          }
          error = true;
        }
      };
      if (mounted) {
        getComponentsByTagName(tag).forEach(cb);
      }
      if (watch) {
        watchComponentVM(tag, cb);
      }
    };

    const routeReportObject = function (vm) {
      return vm.$route ? JSON.parse(JSON.stringify({
        name: vm.$route.name,
        fullPath: vm.$route.fullPath,
        path: vm.$route.path,
        params: vm.$route.params,
        query: vm.$route.query,
        meta: vm.$route.meta,
      })) : null;
    };
    // 发现 Vue 根元素的时候启动脚本的初始化
    const reportRootNode = function (node) {
      const vm = node.__vue__;
      rootVm = vm;
      const config = vm.config;
      const route = routeReportObject(vm);
      const event = new CustomEvent(key, {
        detail: {
          config: JSON.stringify(config),
          route: JSON.stringify(route),
        },
      });
      node.dispatchEvent(event);
    };
    const reportRouteChange = function (route) {
      const event = new CustomEvent(key, {
        detail: { route: JSON.stringify(route) },
      });
      document.documentElement.dispatchEvent(event);
    };
    let unwatchRouteChange = null;
    const listenRouteChange = function (node) {
      if (unwatchRouteChange) unwatchRouteChange();
      const vm = node.__vue__;
      unwatchRouteChange = vm.$watch(function () {
        return JSON.stringify(routeReportObject(vm));
      }, function (route) {
        reportRouteChange(JSON.parse(route));
      });
    };

    const getTag = function (vm) {
      const name = kebabCase(vm.$options.name || vm.$options._componentTag);
      return name;
    };
    /** @type {WeakMap<Object, Node>} */
    const markElement = function (node, vm) {
      if (!vm || vm.$el !== node || !vm._isMounted) return;
      const tag = getTag(vm);
      if (tag && node instanceof Element) {
        if (node.hasAttribute('yawf-component-tag')) {
          const tags = [...new Set([...node.getAttribute('yawf-component-tag').split(' '), tag]).values()].join(' ');
          node.setAttribute('yawf-component-tag', tags);
        } else {
          node.setAttribute('yawf-component-tag', tag);
        }
      }
      const key = vm.$vnode?.key;
      if (key != null && node instanceof Element) {
        node.setAttribute('yawf-component-key', key);
      }
      if (tag) {
        reportNewVM(vm, node);
      }
    };
    const eachVmForNode = function* (node) {
      const visited = new Set();
      const queue = [node.__vue__];
      while (queue.length) {
        const vm = queue.shift();
        if (vm == null || !vm._isVue) continue;
        if (vm.$el !== node || visited.has(vm)) continue;
        visited.add(vm);
        yield vm;
        if (vm.$parent) queue.unshift(vm.$parent);
        if (Array.isArray(vm.$children)) {
          queue.push(...vm.$children);
        }
        if (vm.$slots) {
          const slots = Object.keys(vm.$slots).flatMap(key => vm.$slots[key]);
          queue.push(...slots.map(slot => slot?.componentInstance));
        }
      }
    };
    const watchVueAttr = function (node) {
      let __vue__ = node.__vue__;
      delete node.__vue__;
      Object.defineProperty(node, '__vue__', {
        configurable: true,
        set(n) {
          __vue__ = n;
          markElement(node, n);
        },
        get() {
          return __vue__;
        },
      });
    };
    let seenElement = new WeakSet();
    /** @param {Node} node */
    const eachMountedNode = function (node) {
      if (seenElement.has(node)) return;
      seenElement.add(node);
      if (node.nodeType === Node.ELEMENT_NODE) {
        if (node.__vue__) {
          for (let vm of eachVmForNode(node)) {
            // 如果发现根元素，那么初始化脚本
            if (vm.$parent == null) {
              reportRootNode(node);
              listenRouteChange(node);
            }
            markElement(node, vm);
          }
        }
        watchVueAttr(node);
      }
      if (node.children) {
        [...node.children].forEach(eachMountedNode);
      }
    };
    /** @type {MutationCallback} */
    const observeNewNodes = function (records) {
      Array.from(records).forEach(record => {
        Array.from(record.addedNodes).forEach(eachMountedNode);
      });
    };
    const observer = new MutationObserver(observeNewNodes);
    observer.observe(document.documentElement, { childList: true, subtree: true });
    eachMountedNode(document.documentElement);

    Object.defineProperty(window, rootKey, { value: {}, enumerable: false, writable: false });
    const yawf = window[rootKey];
    const vueSetup = yawf.vueSetup = yawf.vueSetup ?? {};

    vueSetup.getRootVm = () => rootVm;

    vueSetup.kebabCase = kebabCase;

    vueSetup.getComponentsByTagName = getComponentsByTagName;

    vueSetup.closest = function (vm, tag) {
      for (let p = vm; p; p = p.$parent) {
        if (getTag(p) === kebabCase(tag)) {
          return p;
        }
      }
      return null;
    };

    // 下面这一串都没测试过
    const childArray = function (element, createChildren) {
      if (Array.isArray(element)) {
        return element;
      } else if (element.componentOptions) {
        if (!element.componentOptions.children && createChildren) {
          element.componentOptions.children = [];
        }
        return element.componentOptions.children;
      } else {
        if (!element.children && createChildren) {
          element.children = [];
        }
        return element.children;
      }
    };
    const parseClass = className => {
      if (className == null) {
        return '';
      } else if (typeof className === 'string') {
        return [...new Set(className.trim().split(/\s+/))].join(' ');
      } else if (Array.isArray(className)) {
        return parseClass(className.map(parseClass).join(' '));
      } else if (typeof className === 'object') {
        return parseClass(Object.keys(className).filter(key => className[key]).join(' '));
      }
      return '';
    };
    const getVNodeTag = function (vnode) {
      if (!vnode.componentOptions) return vnode.tag;
      const opt = vnode.componentOptions;
      const tag = opt.Ctor?.options?.name ?? opt.tag;
      return 'x-' + kebabCase(tag);
    };
    const buildNodes = function buildNodes(vnode) {
      if (Array.isArray(vnode)) {
        const fragment = document.createElement('x-yawf-fragment');
        fragment.__vnode__ = vnode;
        vnode.forEach(child => { fragment.appendChild(buildNodes(child)); });
        return fragment;
      }
      const tag = getVNodeTag(vnode);
      if (tag == null && vnode.text) {
        const node = document.createTextNode(vnode.text);
        node.__vnode__ = vnode;
        return node;
      }
      if (tag == null) {
        const node = document.createComment('');
        node.__vnode__ = vnode;
        return node;
      }
      const node = document.createElement(tag);
      node.__vnode__ = vnode;
      const data = vnode.data ?? {};
      const className = parseClass(data.class);
      if (className) node.className = className;
      const staticClassName = parseClass(data.staticClass);
      if (staticClassName) node.className += ' ' + staticClassName;
      const children = childArray(vnode);
      if (children) children.forEach(vnode => {
        node.appendChild(buildNodes(vnode));
      });
      return node;
    };
    const vNode = function (node) {
      return node.__vnode__;
    };
    const insertBefore = function (parentNode, newVNode, refNode, newNode) {
      if (refNode === null) {
        return appendChild(parentNode, newVNode);
      }
      if (newNode == null) newNode = buildNodes(newVNode);
      const refVNode = vNode(refNode);
      const parentVNode = vNode(parentNode);
      const children = childArray(parentVNode);
      const index = children.indexOf(refVNode);
      children.splice(index, 0, newVNode);
      parentNode.insertBefore(newNode, refNode);
      return newNode;
    };
    const appendChild = function (parentNode, newVNode, newNode) {
      const parentVNode = vNode(parentNode);
      const children = childArray(parentVNode, true);
      if (newNode == null) newNode = buildNodes(newVNode);
      children.push(newVNode);
      parentNode.appendChild(newNode);
      return newNode;
    };
    const removeChild = function (parentNode, targetNode) {
      const targetVNode = vNode(targetNode);
      const parentVNode = vNode(parentNode);
      const children = childArray(parentVNode);
      const index = children.indexOf(targetVNode);
      children.splice(index, 1);
      parentNode.removeChild(targetNode);
      return targetVNode;
    };
    const wrapNode = function (chroot) {
      return function (refNode, newVNode) {
        const newNode = buildNodes(newVNode);
        const refVNode = vNode(refNode);
        const parentNode = refNode.parentNode;
        if (!parentNode) {
          chroot(newVNode);
          appendChild(newNode, refVNode, refNode);
        } else {
          insertBefore(parentNode, newVNode, refNode, newNode);
          removeChild(parentNode, refNode);
          appendChild(newNode, refVNode, refNode);
        }
        return newNode;
      };
    };
    const changeRoot = function (chroot) {
      return function (rootNode) {
        const parentNode = rootNode.parentNode;
        if (parentNode) {
          removeChild(parentNode, rootNode);
        }
        const rootVNode = vNode(rootNode);
        chroot(rootVNode);
        return rootNode;
      };
    };
    const classModify = function (node, add, remove) {
      const vnode = vNode(node);
      vnode.data = vnode.data ?? {};
      const added = parseClass([parseClass(vnode.data.class), ...add].join(' '));
      const removed = added.split(/\s+/).filter(c => !remove.includes(c)).join(' ');
      vnode.data.class = removed;
      node.className = removed;
    };
    const addClass = function (node, ...classNames) {
      classModify(node, classNames.filter(x => x && typeof x === 'string'), []);
    };
    const removeClass = function (node, ...classNames) {
      classModify(node, [], classNames.filter(x => x && typeof x === 'string'));
    };
    const addEventListener = function (node, name, callback, configs = {}, nativeOn = false) {
      const vnode = vNode(node);
      const onStr = nativeOn ? 'nativeOn' : 'on';
      if (!vnode.data) vnode.data = {};
      if (!vnode.data[onStr]) vnode.data[onStr] = {};
      const on = vnode.data[onStr];
      const vueName = (configs.passive ? '&' : '') + (configs.once ? '~' : '') + (configs.capture ? '!' : '') + name;
      if (!on[vueName]) on[vueName] = callback;
      else if (!Array.isArray(on[vueName])) on[vueName] = [on[vueName], callback];
      else on[vueName].push(callback);
    };
    const removeEventListener = function (node, name, callback = null, configs = {}, nativeOn = false) {
      const vnode = vNode(node);
      const onStr = nativeOn ? 'nativeOn' : 'on';
      if (!vnode.data) return;
      if (!vnode.data[onStr]) return;
      const on = vnode.data[onStr];
      const vueName = (configs.passive ? '&' : '') + (configs.once ? '~' : '') + (configs.capture ? '!' : '') + name;
      if (!on[vueName]) return;
      if (callback == null) {
        delete on[vueName];
      } else {
        if (!Array.isArray(on[vueName])) {
          if (on[vueName] === callback) delete on[vueName];
        } else {
          on[vueName] = on[vueName].filter(c => c !== callback);
        }
      }
    };
    const getEventListener = function (node, name, configs = {}, nativeOn = false) {
      const vnode = vNode(node);
      const onStr = nativeOn ? 'nativeOn' : 'on';
      if (!vnode.data) return null;
      if (!vnode.data[onStr]) return null;
      const on = vnode.data[onStr];
      const vueName = (configs.passive ? '&' : '') + (configs.once ? '~' : '') + (configs.capture ? '!' : '') + name;
      if (!on[vueName]) return null;
      return on[vueName];
    };
    const hasAttribute = function (node, name) {
      const vnode = vNode(node);
      if (!vnode.data) return false;
      if (!vnode.data.attrs) return false;
      const value = vnode.data.attrs[name];
      if (value === false || value == null) return false;
      return true;
    };
    const getAttribute = function (node, name) {
      const vnode = vNode(node);
      if (!vnode.data) return null;
      if (!vnode.data.attrs) return null;
      return vnode.data.attrs[name];
    };
    const setAttribute = function (node, name, value) {
      const vnode = vNode(node);
      if (!vnode.data) return;
      if (!vnode.data.attrs) return;
      vnode.data.attrs[name] = value;
    };
    const removeAttribute = function (node, name) {
      const vnode = vNode(node);
      if (!vnode.data) return;
      if (!vnode.data.attrs) return;
      delete vnode.data.attrs[name];
    };
    const getTextNodeValue = function (text) {
      const vnode = vNode(text);
      return vnode.text;
    };
    const setTextNodeValue = function (text, nodeValue) {
      const vnode = vNode(text);
      if (typeof vnode.text !== 'string') return;
      vnode.text = nodeValue;
    };
    const transformSlot = function (node, slotName, transformer) {
      const vnode = vNode(node);
      const slots = vnode.data?.scopedSlots;
      if (!slots?.[slotName]) return;
      slots[slotName] = transformRender(slots[slotName], transformer);
    };
    const builder = function (createElement) {
      return function (root) {
        const replaceRoot = newRoot => { root = newRoot; };
        const nodeStruct = buildNodes(root);
        const Nodes = {
          vNode,
          replaceRoot,
          insertBefore,
          removeChild,
          appendChild,
          wrapNode: wrapNode(replaceRoot),
          unwrapNode: changeRoot(replaceRoot),
          addClass,
          removeClass,
          getEventListener,
          addEventListener,
          removeEventListener,
          setAttribute,
          hasAttribute,
          getAttribute,
          removeAttribute,
          getTextNodeValue,
          setTextNodeValue,
          createElement,
          h: createElement,
          transformSlot,
        };
        return {
          nodeStruct,
          Nodes,
          getRoot: () => root,
        };
      };
    };

    const transformRender = function (originalRender, transformer, { raw = false } = {}) {
      if (raw) {
        return function (createElement) {
          return transformer(originalRender).call(this, createElement, { builder: builder(createElement) });
        };
      }
      let errorFlag = false;
      const wrapped = function render(createElement) {
        const { nodeStruct, Nodes, getRoot } = builder(createElement)(originalRender.call(this, createElement));
        try {
          transformer.call(this, nodeStruct, Nodes);
        } catch (e) {
          if (!errorFlag) {
            console.error('YAWF Error while inject render [%o]: %o (Following errors are supressed)', transformer, e);
            errorFlag = true;
          }
        }
        return getRoot();
      };
      wrapped.originalRender = originalRender;
      return wrapped;
    };
    const transformComponentRender = function (vm, transformer, configs = {}) {
      vm.$options.render = transformRender(vm.$options.render, transformer, configs);
    };
    const transformComponentsRenderByTagName = function (tag, transformer, configs = {}) {
      eachComponentVM(tag, function (vm) {
        transformComponentRender(vm, transformer, configs);
        vm.$forceUpdate();
      });
    };
    vueSetup.eachComponentVM = eachComponentVM;
    vueSetup.transformComponentRender = transformComponentRender;
    vueSetup.transformComponentsRenderByTagName = transformComponentsRenderByTagName;

    const isSimpleClick = function (event) {
      if (event.ctrlKey || event.altKey || event.shiftKey || event.metaKey) return false;
      if (event.which !== 1) return false;
      return true;
    };
    document.documentElement.addEventListener('click', function (event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const mfsp = target.closest('a.yawf-link-mfsp');
      if (mfsp) {
        if (!isSimpleClick(event)) {
          event.stopPropagation();
        }
      }
      const nmfpd = target.closest('a.yawf-link-nmfpd');
      if (nmfpd) {
        if (isSimpleClick(event)) {
          event.preventDefault();
        }
      }
    }, { capture: true });
  }, util.inject.rootKey, key);
}());
//#endregion
//#region @require yaofang://content/init/ready.js
; (function () {

  const yawf = window.yawf;

  const util = yawf.util;
  const init = yawf.init;

  const priority = util.priority;

  const config = yawf.config;

  init.onReady(async () => {
    await config.init(init.page.config.user.idstr);
    util.i18n = 'zh-CN';
    util.time.setDiff(0);
  }, { priority: priority.FIRST });

}());
//#endregion
//#region replacement of yaofang://content/backend/download.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const download = yawf.download = {};

  const util = yawf.util;

  const validFilename = (function () {
    const regOtherCharacters = /^(?:\uD834[\uDCF6-\uDCFF\uDD27\uDD28\uDD73-\uDD7A\uDDE9-\uDDFF\uDE46-\uDEFF\uDF57-\uDF5F\uDF72-\uDFFF]|\uD836[\uDE8C-\uDE9A\uDEA0\uDEB0-\uDFFF]|\uD83C[\uDC2C-\uDC2F\uDC94-\uDC9F\uDCAF\uDCB0\uDCC0\uDCD0\uDCF6-\uDCFF\uDD0D-\uDD0F\uDD2F\uDD6C-\uDD6F\uDD9B-\uDDE5\uDE03-\uDE0F\uDE3B-\uDE3F\uDE49-\uDE4F\uDE52-\uDEFF]|\uD81A[\uDE39-\uDE3F\uDE5F\uDE6A-\uDE6D\uDE70-\uDECF\uDEEE\uDEEF\uDEF6-\uDEFF\uDF46-\uDF4F\uDF5A\uDF62\uDF78-\uDF7C\uDF90-\uDFFF]|\uD809[\uDC6F\uDC75-\uDC7F\uDD44-\uDFFF]|\uD81B[\uDC00-\uDEFF\uDF45-\uDF4F\uDF7F-\uDF8E\uDFA0-\uDFFF]|\uD86E[\uDC1E\uDC1F]|\uD83D[\uDD7A\uDDA4\uDED1-\uDEDF\uDEED-\uDEEF\uDEF4-\uDEFF\uDF74-\uDF7F\uDFD5-\uDFFF]|\uD801[\uDC9E\uDC9F\uDCAA-\uDCFF\uDD28-\uDD2F\uDD64-\uDD6E\uDD70-\uDDFF\uDF37-\uDF3F\uDF56-\uDF5F\uDF68-\uDFFF]|\uD800[\uDC0C\uDC27\uDC3B\uDC3E\uDC4E\uDC4F\uDC5E-\uDC7F\uDCFB-\uDCFF\uDD03-\uDD06\uDD34-\uDD36\uDD8D-\uDD8F\uDD9C-\uDD9F\uDDA1-\uDDCF\uDDFE-\uDE7F\uDE9D-\uDE9F\uDED1-\uDEDF\uDEFC-\uDEFF\uDF24-\uDF2F\uDF4B-\uDF4F\uDF7B-\uDF7F\uDF9E\uDFC4-\uDFC7\uDFD6-\uDFFF]|\uD869[\uDED7-\uDEFF]|\uD83B[\uDC00-\uDDFF\uDE04\uDE20\uDE23\uDE25\uDE26\uDE28\uDE33\uDE38\uDE3A\uDE3C-\uDE41\uDE43-\uDE46\uDE48\uDE4A\uDE4C\uDE50\uDE53\uDE55\uDE56\uDE58\uDE5A\uDE5C\uDE5E\uDE60\uDE63\uDE65\uDE66\uDE6B\uDE73\uDE78\uDE7D\uDE7F\uDE8A\uDE9C-\uDEA0\uDEA4\uDEAA\uDEBC-\uDEEF\uDEF2-\uDFFF]|\uD87E[\uDE1E-\uDFFF]|\uDB40[\uDC00-\uDCFF\uDDF0-\uDFFF]|\uD804[\uDC4E-\uDC51\uDC70-\uDC7E\uDCBD\uDCC2-\uDCCF\uDCE9-\uDCEF\uDCFA-\uDCFF\uDD35\uDD44-\uDD4F\uDD77-\uDD7F\uDDCE\uDDCF\uDDE0\uDDF5-\uDDFF\uDE12\uDE3E-\uDE7F\uDE87\uDE89\uDE8E\uDE9E\uDEAA-\uDEAF\uDEEB-\uDEEF\uDEFA-\uDEFF\uDF04\uDF0D\uDF0E\uDF11\uDF12\uDF29\uDF31\uDF34\uDF3A\uDF3B\uDF45\uDF46\uDF49\uDF4A\uDF4E\uDF4F\uDF51-\uDF56\uDF58-\uDF5C\uDF64\uDF65\uDF6D-\uDF6F\uDF75-\uDFFF]|\uD83A[\uDCC5\uDCC6\uDCD7-\uDFFF]|\uD80D[\uDC2F-\uDFFF]|\uD86D[\uDF35-\uDF3F]|[\uD807\uD80A\uD80B\uD80E-\uD810\uD812-\uD819\uD81C-\uD82B\uD82D\uD82E\uD830-\uD833\uD837-\uD839\uD83F\uD874-\uD87D\uD87F-\uDB3F\uDB41-\uDBFF][\uDC00-\uDFFF]|\uD806[\uDC00-\uDC9F\uDCF3-\uDCFE\uDD00-\uDEBF\uDEF9-\uDFFF]|\uD803[\uDC49-\uDC7F\uDCB3-\uDCBF\uDCF3-\uDCF9\uDD00-\uDE5F\uDE7F-\uDFFF]|\uD835[\uDC55\uDC9D\uDCA0\uDCA1\uDCA3\uDCA4\uDCA7\uDCA8\uDCAD\uDCBA\uDCBC\uDCC4\uDD06\uDD0B\uDD0C\uDD15\uDD1D\uDD3A\uDD3F\uDD45\uDD47-\uDD49\uDD51\uDEA6\uDEA7\uDFCC\uDFCD]|\uD805[\uDC00-\uDC7F\uDCC8-\uDCCF\uDCDA-\uDD7F\uDDB6\uDDB7\uDDDE-\uDDFF\uDE45-\uDE4F\uDE5A-\uDE7F\uDEB8-\uDEBF\uDECA-\uDEFF\uDF1A-\uDF1C\uDF2C-\uDF2F\uDF40-\uDFFF]|\uD802[\uDC06\uDC07\uDC09\uDC36\uDC39-\uDC3B\uDC3D\uDC3E\uDC56\uDC9F-\uDCA6\uDCB0-\uDCDF\uDCF3\uDCF6-\uDCFA\uDD1C-\uDD1E\uDD3A-\uDD3E\uDD40-\uDD7F\uDDB8-\uDDBB\uDDD0\uDDD1\uDE04\uDE07-\uDE0B\uDE14\uDE18\uDE34-\uDE37\uDE3B-\uDE3E\uDE48-\uDE4F\uDE59-\uDE5F\uDEA0-\uDEBF\uDEE7-\uDEEA\uDEF7-\uDEFF\uDF36-\uDF38\uDF56\uDF57\uDF73-\uDF77\uDF92-\uDF98\uDF9D-\uDFA8\uDFB0-\uDFFF]|\uD808[\uDF9A-\uDFFF]|\uD82F[\uDC6B-\uDC6F\uDC7D-\uDC7F\uDC89-\uDC8F\uDC9A\uDC9B\uDCA0-\uDFFF]|\uD82C[\uDC02-\uDFFF]|\uD811[\uDE47-\uDFFF]|\uD83E[\uDC0C-\uDC0F\uDC48-\uDC4F\uDC5A-\uDC5F\uDC88-\uDC8F\uDCAE-\uDD0F\uDD19-\uDD7F\uDD85-\uDDBF\uDDC1-\uDFFF]|\uD873[\uDEA2-\uDFFF]|[\0-\x1F\x7F-\x9F\xAD\u0378\u0379\u0380-\u0383\u038B\u038D\u03A2\u0530\u0557\u0558\u0560\u0588\u058B\u058C\u0590\u05C8-\u05CF\u05EB-\u05EF\u05F5-\u0605\u061C\u061D\u06DD\u070E\u070F\u074B\u074C\u07B2-\u07BF\u07FB-\u07FF\u082E\u082F\u083F\u085C\u085D\u085F-\u089F\u08B5-\u08E2\u0984\u098D\u098E\u0991\u0992\u09A9\u09B1\u09B3-\u09B5\u09BA\u09BB\u09C5\u09C6\u09C9\u09CA\u09CF-\u09D6\u09D8-\u09DB\u09DE\u09E4\u09E5\u09FC-\u0A00\u0A04\u0A0B-\u0A0E\u0A11\u0A12\u0A29\u0A31\u0A34\u0A37\u0A3A\u0A3B\u0A3D\u0A43-\u0A46\u0A49\u0A4A\u0A4E-\u0A50\u0A52-\u0A58\u0A5D\u0A5F-\u0A65\u0A76-\u0A80\u0A84\u0A8E\u0A92\u0AA9\u0AB1\u0AB4\u0ABA\u0ABB\u0AC6\u0ACA\u0ACE\u0ACF\u0AD1-\u0ADF\u0AE4\u0AE5\u0AF2-\u0AF8\u0AFA-\u0B00\u0B04\u0B0D\u0B0E\u0B11\u0B12\u0B29\u0B31\u0B34\u0B3A\u0B3B\u0B45\u0B46\u0B49\u0B4A\u0B4E-\u0B55\u0B58-\u0B5B\u0B5E\u0B64\u0B65\u0B78-\u0B81\u0B84\u0B8B-\u0B8D\u0B91\u0B96-\u0B98\u0B9B\u0B9D\u0BA0-\u0BA2\u0BA5-\u0BA7\u0BAB-\u0BAD\u0BBA-\u0BBD\u0BC3-\u0BC5\u0BC9\u0BCE\u0BCF\u0BD1-\u0BD6\u0BD8-\u0BE5\u0BFB-\u0BFF\u0C04\u0C0D\u0C11\u0C29\u0C3A-\u0C3C\u0C45\u0C49\u0C4E-\u0C54\u0C57\u0C5B-\u0C5F\u0C64\u0C65\u0C70-\u0C77\u0C80\u0C84\u0C8D\u0C91\u0CA9\u0CB4\u0CBA\u0CBB\u0CC5\u0CC9\u0CCE-\u0CD4\u0CD7-\u0CDD\u0CDF\u0CE4\u0CE5\u0CF0\u0CF3-\u0D00\u0D04\u0D0D\u0D11\u0D3B\u0D3C\u0D45\u0D49\u0D4F-\u0D56\u0D58-\u0D5E\u0D64\u0D65\u0D76-\u0D78\u0D80\u0D81\u0D84\u0D97-\u0D99\u0DB2\u0DBC\u0DBE\u0DBF\u0DC7-\u0DC9\u0DCB-\u0DCE\u0DD5\u0DD7\u0DE0-\u0DE5\u0DF0\u0DF1\u0DF5-\u0E00\u0E3B-\u0E3E\u0E5C-\u0E80\u0E83\u0E85\u0E86\u0E89\u0E8B\u0E8C\u0E8E-\u0E93\u0E98\u0EA0\u0EA4\u0EA6\u0EA8\u0EA9\u0EAC\u0EBA\u0EBE\u0EBF\u0EC5\u0EC7\u0ECE\u0ECF\u0EDA\u0EDB\u0EE0-\u0EFF\u0F48\u0F6D-\u0F70\u0F98\u0FBD\u0FCD\u0FDB-\u0FFF\u10C6\u10C8-\u10CC\u10CE\u10CF\u1249\u124E\u124F\u1257\u1259\u125E\u125F\u1289\u128E\u128F\u12B1\u12B6\u12B7\u12BF\u12C1\u12C6\u12C7\u12D7\u1311\u1316\u1317\u135B\u135C\u137D-\u137F\u139A-\u139F\u13F6\u13F7\u13FE\u13FF\u169D-\u169F\u16F9-\u16FF\u170D\u1715-\u171F\u1737-\u173F\u1754-\u175F\u176D\u1771\u1774-\u177F\u17DE\u17DF\u17EA-\u17EF\u17FA-\u17FF\u180E\u180F\u181A-\u181F\u1878-\u187F\u18AB-\u18AF\u18F6-\u18FF\u191F\u192C-\u192F\u193C-\u193F\u1941-\u1943\u196E\u196F\u1975-\u197F\u19AC-\u19AF\u19CA-\u19CF\u19DB-\u19DD\u1A1C\u1A1D\u1A5F\u1A7D\u1A7E\u1A8A-\u1A8F\u1A9A-\u1A9F\u1AAE\u1AAF\u1ABF-\u1AFF\u1B4C-\u1B4F\u1B7D-\u1B7F\u1BF4-\u1BFB\u1C38-\u1C3A\u1C4A-\u1C4C\u1C80-\u1CBF\u1CC8-\u1CCF\u1CF7\u1CFA-\u1CFF\u1DF6-\u1DFB\u1F16\u1F17\u1F1E\u1F1F\u1F46\u1F47\u1F4E\u1F4F\u1F58\u1F5A\u1F5C\u1F5E\u1F7E\u1F7F\u1FB5\u1FC5\u1FD4\u1FD5\u1FDC\u1FF0\u1FF1\u1FF5\u1FFF\u200B-\u200F\u202A-\u202E\u2060-\u206F\u2072\u2073\u208F\u209D-\u209F\u20BF-\u20CF\u20F1-\u20FF\u218C-\u218F\u23FB-\u23FF\u2427-\u243F\u244B-\u245F\u2B74\u2B75\u2B96\u2B97\u2BBA-\u2BBC\u2BC9\u2BD2-\u2BEB\u2BF0-\u2BFF\u2C2F\u2C5F\u2CF4-\u2CF8\u2D26\u2D28-\u2D2C\u2D2E\u2D2F\u2D68-\u2D6E\u2D71-\u2D7E\u2D97-\u2D9F\u2DA7\u2DAF\u2DB7\u2DBF\u2DC7\u2DCF\u2DD7\u2DDF\u2E43-\u2E7F\u2E9A\u2EF4-\u2EFF\u2FD6-\u2FEF\u2FFC-\u2FFF\u3040\u3097\u3098\u3100-\u3104\u312E-\u3130\u318F\u31BB-\u31BF\u31E4-\u31EF\u321F\u32FF\u4DB6-\u4DBF\u9FD6-\u9FFF\uA48D-\uA48F\uA4C7-\uA4CF\uA62C-\uA63F\uA6F8-\uA6FF\uA7AE\uA7AF\uA7B8-\uA7F6\uA82C-\uA82F\uA83A-\uA83F\uA878-\uA87F\uA8C5-\uA8CD\uA8DA-\uA8DF\uA8FE\uA8FF\uA954-\uA95E\uA97D-\uA97F\uA9CE\uA9DA-\uA9DD\uA9FF\uAA37-\uAA3F\uAA4E\uAA4F\uAA5A\uAA5B\uAAC3-\uAADA\uAAF7-\uAB00\uAB07\uAB08\uAB0F\uAB10\uAB17-\uAB1F\uAB27\uAB2F\uAB66-\uAB6F\uABEE\uABEF\uABFA-\uABFF\uD7A4-\uD7AF\uD7C7-\uD7CA\uD7FC-\uF8FF\uFA6E\uFA6F\uFADA-\uFAFF\uFB07-\uFB12\uFB18-\uFB1C\uFB37\uFB3D\uFB3F\uFB42\uFB45\uFBC2-\uFBD2\uFD40-\uFD4F\uFD90\uFD91\uFDC8-\uFDEF\uFDFE\uFDFF\uFE1A-\uFE1F\uFE53\uFE67\uFE6C-\uFE6F\uFE75\uFEFD-\uFF00\uFFBF-\uFFC1\uFFC8\uFFC9\uFFD0\uFFD1\uFFD8\uFFD9\uFFDD-\uFFDF\uFFE7\uFFEF-\uFFFB\uFFFE\uFFFF])$/g; // eslint-disable-line
    const regWindowsReservedFilename = /^(?=CON|PRN|AUX|NUL|COM[1-9]|LPT[1-9]$)/i;
    const regFilenameUnhappyCharacters = /^[\s.-]+|[<>:"/\\|?*]|\.(?=.*\.)|[/;#]|[\s.]+$/g;
    const defaultFilename = '_';
    return filename => {
      const valid = (filename + '')
        .match(/./ug).map(character => character.replace(regOtherCharacters, '_')).join('')
        .replace(regFilenameUnhappyCharacters, '_')
        .replace(regWindowsReservedFilename, '_') ||
        defaultFilename;
      if (valid === filename) return filename;
      return validFilename(valid);
    };
  }());

  download.filename = validFilename;

  /**
   * @param {{ blob: Blob, filename: string }}
   */
  download.blob = async function ({ blob, filename }) {
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.download = filename;
    link.href = url;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    const revoke = function () {
      URL.revokeObjectURL(url);
      window.removeEventListener('unload', revoke);
    };
    setTimeout(revoke, 60e3);
    window.addEventListener('unload', revoke);
  };

  /**
   * @param {{ url: string, filename: string, referrer: string? }[]}
   */
  download.urls = async function (files) {
    const content = await Promise.all(files.map(function ({ url, filename, referrer = '' }, index) {
      return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
          method: 'GET',
          url: url,
          headers: { Referer: referrer },
          responseType: 'arraybuffer',
          onload: function (resp) {
            const mtime = (resp.responseHeaders.match(/^Last-Modified: (.*)$/mi) || [])[1];
            resolve({
              filename,
              content: resp.response,
              mtime: new Date(mtime || Date.now()),
            });
          },
          onerror: function () {
            reject();
          },
        });
      });
    }));

    const prefix = content[0].filename.split('/').reduce((result, part) => {
      if (content.some(item => !item.filename.startsWith(result + '/' + part))) return result;
      return result + '/' + part;
    });
    content.forEach(item => {
      item.filename = item.filename.slice(prefix.length).replace(/^\//, '');
    });
    const tarball = util.tarball.files(content);
    let blob = new Blob([tarball], { type: 'application/x-tar' });
    download.blob({ blob, filename: (prefix || content[0].filename) + '.tar' });

  };

}());
//#endregion
//#region replacement of yaofang://content/backend/notifications.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const notifications = yawf.notifications = {};

  notifications.show = function ({ title, content, icon = null, duration = Infinity }) {
    return new Promise((resolve, reject) => {
      GM.notification({
        title,
        text: content,
        image: icon,
        onclick: function () {
          resolve(true);
        },
        ondone: function () {
          resolve(false);
        },
      }, function () {
        resolve(false);
      });
    });
  };

}());
//#endregion
//#region replacement of yaofang://content/backend/fontlist.js
; (function () {

  const yawf = window.yawf = window.yawf || {};

  const fontList = yawf.fontList = {};
  const util = yawf.util;

  const functools = util.functools;

  const textWidth = (function () {
    const fontsize = 14;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // https://bugzil.la/561361
    return function (fontname, text) {
      context.font = 'bold ' + fontsize + 'px ' + fontname;
      return context.measureText(text).width;
    };
  }());

  const sampleTextWidth = function (fontname) {
    const sampleText = [
      'The quick brown fox jumps over the lazy dog',
      '7531902468',
      ',.!-',
      '天地玄黄，宇宙洪荒。',
      '知所先後，則近道矣。',
    ].join('');
    return textWidth(fontname, sampleText);
  };

  const basicFonts = [
    'monospace', 'sans-serif', 'sans', 'Symbol', 'Arial', 'Fixed',
    'Times', 'Times New Roman', '宋体', '黑体', 'Microsoft YaHei',
  ];

  const setupBaseline = functools.once(function () {
    return basicFonts.map(fontname => sampleTextWidth(fontname));
  });

  const checkFont = async function (cssName) {
    await Promise.resolve();
    const baseline = setupBaseline();
    return basicFonts.some((fontname, index) => (
      sampleTextWidth(`${cssName},${fontname}`) !== baseline[index]
    ));
  };

  const checkAllFonts = functools.once(async function () {
    const checklist = {
      west: [
        ['Times', 'Times'],
        ['"Times New Roman"', 'Times New Roman'],
        ['Georgia', 'Georgia'],
        ['Arial', 'Arial'],
        ['Helvetica', 'Helvetica'],
        ['Verdana', 'Verdana'],
        ['".SFNSDisplay-Regular"', 'San Francisco'],
      ],
      chinese: [
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
      ],
    };
    await Promise.all(Object.keys(checklist).map(async key => {
      const available = await Promise.all(checklist[key].map(([cssName]) => checkFont(cssName)));
      checklist[key] = checklist[key].filter((font, index) => available[index]);
    }));
    return checklist;
  });


  fontList.get = function () {
    return checkAllFonts();
  };

}());
//#endregion
//#region replacement of yaofang://content/backend/viewimage.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util;

  const i18n = util.i18n;

  const imageViewer = yawf.imageViewer = {};

  i18n.viewOriginalTitle = {
    cn: '查看图片 - YAWF',
    tw: '檢視圖片 - YAWF',
    en: 'View Images - YAWF',
  };

  const page = info => `
<!DOCTYPE html>
<html>
<head><meta charset="UTF-8" /><title>${i18n.viewOriginalTitle}</title><style>
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
  #chose a.current { outline: 2px solid red; }
  #chose img { max-height: 80px; max-width: 80px; }
  @-moz-document url-prefix() {
    body { background-image: url("chrome://global/skin/media/imagedoc-darknoise.png");  }
    #viewer { background: hsl(0, 0%, 90%) url("chrome://global/skin/media/imagedoc-lightnoise.png") repeat scroll 0 0; }
  }
</style></head>
<body><div id="container" tabindex="1"><div id="imgarea" tabindex="-1"><img id="viewer" class="large" /></div></div><div id="chose" tabindex="-1"></div><script>
  const info = ${JSON.stringify(info)};
  const allImages = new Set();
  function loadImage(img, url) {
    img.dataset.url = url;
    allImages.add(img);
    window.opener.postMessage(url);
  }
  window.addEventListener('message', event => {
    if (event.source !== window.opener) return;
    const { url, response } = event.data;
    [...allImages].forEach(img => {
      if (img.dataset.url === url) img.src = response;
    });
  });
  info.images.forEach(function (image, i) {
    const url = image.replace(/large/, 'square');
    const link = document.createElement('a');
    link.id = 'img' + i;
    link.href = 'javascript:;';
    link.addEventListener('click', () => { goto(i); });
    const img = document.createElement('img');
    loadImage(img, url);
    link.append(img);
    chose.append(link);
  });
  function resize() {
    const width = viewer.naturalWidth;
    const height = viewer.naturalHeight;
    if (width > container.clientWidth || height > container.clientHeight) imgarea.className = 'over';
    else imgarea.className = 'normal';
    focus();
  }
  function show() {
    if (Number(viewer.dataset.index) === info.current) return;
    viewer.dataset.index = info.current;
    const url = info.images[info.current];
    viewer.src = '';
    loadImage(viewer, url);
    container.scrollTop = 0;
    container.scrollLeft = 0;
    Array.from(document.querySelectorAll('#chose a')).forEach(function (a) {
      if (a.id === 'img' + info.current) a.className = 'current';
      else a.className = '';
    });
    focus();
  }
  function focus() { container.focus(); }
  if (info.images.length === 1) document.body.className = 'single';
  function prevImg() { goto(info.current - 1); }
  function nextImg() { goto(info.current + 1); }
  function goto(n) {
    while (n < 0) n += info.images.length;
    n = n % info.images.length;
    info.current = n;
    show();
  }
  function checkLR(x) {
    if (info.images.length === 1) return 'mid';
    let pos = 'mid', w = container.clientWidth;
    if (x < 100 && x < w * 0.2) pos = 'left';
    if (x > w - 100 && x > w * 0.8) pos = 'right';
    if (container.className !== pos) container.className = pos;
    return pos;
  }
  function initEvents() {
    viewer.onload = function () { show(); setTimeout(resize, 0); };
    imgarea.onmousemove = function (e) { checkLR(e.clientX); };
    imgarea.addEventListener('click', function (e) {
      const pos = checkLR(e.clientX);
      if (pos === 'left') prevImg(); else if (pos === 'right') nextImg(); else return true;
      e.stopPropagation();
      focus();
    }, true);
    viewer.addEventListener('click', function () {
      if (imgarea.className === 'normal') return;
      if (viewer.className === 'large') viewer.className = 'fit';
      else viewer.className = 'large';
    });
    window.onresize = resize;
    window.onkeydown = function (e) {
      const key = e.keyCode, n = key & 15;
      if (key === 33) prevImg(); else if (key === 34) nextImg();
      else if ([48, 96].indexOf(key & -16) !== -1) {
        if (n > 0 && n <= info.images.length) goto(n - 1);
      } else return;
      e.preventDefault();
    };
    window.onload = function () { show(); focus(); };
    container.onblur = function () { setTimeout(focus, 0); };
  }
  initEvents();
</script></body>
</html>
`;

  imageViewer.open = function ({ images, current }) {
    const html = page({ images, current: current - 1 });
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const subWindow = window.open(url);
    setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
    const onMessage = event => {
      if (event.source !== subWindow) return;
      const url = String(event.data);
      GM.xmlHttpRequest({
        method: 'GET',
        url,
        headers: { Referer: 'https://weibo.com/' },
        responseType: 'blob',
        onload: function (resp) {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            subWindow.postMessage({ url, response: reader.result });
          });
          reader.readAsDataURL(resp.response);
        },
      });
    };
    window.addEventListener('message', onMessage);
    subWindow.addEventListener('close', () => {
      window.removeEventListener('message', onMessage);
    });
  };

}());
//#endregion
//#region custom implementation backend/externalMenu
; (function () {
  const yawf = window.yawf;
  const externalMenu = yawf.externalMenu = {};

  externalMenu.add = function ({ title, callback }) {
    GM.registerMenuCommand(title, callback);
  };
}());
//#endregion
//#region implementation for chat page
; (function () {
/* eslint-disable indent */
if (!/^https:\/\/api.weibo.com\/chat/.test(location.href)) return;
//#region @require yaofang://content/chat/init.js
; (function () {

  const yawf = window.yawf;
  const config = yawf.config;

  const init = yawf.init = {};

  init.userConfig = new Promise(resolve => {
    init.setUserData = async function (userData) {
      const id = userData.id;
      await config.init(id);
      resolve(config.user);
    };
  });

}());
//#endregion
//#region replacement of yaofang://content/chat/inject.js
; (function () {

  const yawf = window.yawf;
  const init = yawf.init;

  ; (async function () {
    const userDataUrl = '/webim/2/account/profile/basic.json?source=209678993&t=' + Date.now();
    const userData = await fetch(userDataUrl).then(resp => resp.json());
    init.setUserData(userData);
  }());

}());
//#endregion
//#region @require yaofang://content/chat/rule.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init;

  const css = util.css;

  ; (async function avatarShape() {
    const userConfig = await init.userConfig;
    const isEnabled = userConfig.key('layout_avatar_shape').get();
    if (!isEnabled) return;
    const shape = userConfig.key('layout_avatar_shape.shape').get();
    if (shape === 'square') {
      // 是的，他们就是有的拼成了 avatar 有的拼成了 avator ；顺便一说，前面一个拼得对
      css.append(`
#app .avatar, #app .avator { border-radius: 0; }
`);
    }
  }());

  const newTabDefault = function () {
    const base = document.createElement('base');
    base.target = '_blank';
    document.body.appendChild(base);
  };
  if (self !== top) {
    if (document.body) {
      newTabDefault();
    } else {
      document.addEventListener('DOMContentLoaded', event => {
        newTabDefault();
      });
    }
  }

  const disableUnloadPrompt = function () {
    util.inject(function disableBeforeUnload() {
      if (!window.onbeforeunload) {
        setTimeout(disableBeforeUnload, 100);
      } else {
        window.onbeforeunload = null;
        window.onunload = null;
      }
    });
  };

  ; (async function () {
    const userConfig = await init.userConfig;

    const rules = [{
      key: 'clean_icons_approve',
      ainit: () => css.append('.avator-box .m-icon img[src$="gg=="] { display: none; }'),
    }, {
      key: 'clean_icons_approve_co',
      ainit: () => css.append('.avator-box .m-icon img[src$="QmCC"] { display: none; }'),
    }, {
      key: 'clean_icons_club',
      ainit: () => css.append('.avator-box .m-icon img[src$="CYII"] { display: none; }'),
    }, {
      key: 'clean_icons_v_girl',
      ainit: () => css.append('.avator-box .m-icon img[src$="YII="] { display: none; }'),
    }, {
      key: 'clean_icons_bigfun',
      ainit: () => css.append('#app .icon-area > i.tf { display: none; }'),
    }];
    rules.forEach(({ key, ainit }) => {
      const isEnabled = userConfig.key(key).get();
      if (isEnabled) ainit();
    });

    if (self !== top || userConfig.key('chat_page_disable_unload_prompt').get()) {
      disableUnloadPrompt();
    }

  }());

}());
//#endregion
throw new Error('YAWF | chat page found, skip following executions');
/* eslint-enable indent */
}());
//#endregion
//#region @require yaofang://content/ruleset/rule.js
/**
 * 这个文件用于描述一条规则
 *
 * yawf.rule.<ruleType>(details: object) 新建一条规则
 * <ruleType>:
 *   Rule: 普通规则，普通规则应当属于一个 Group
 *   Text: 纯文本（仅用于展示，一般不承担功能），纯文本是普通规则的一个特例
 *   Tab: 标签页，是最顶层的规则，其中包含若干 Group
 *   Group: 规则分组（小标题），属于一个 Tab，其中包含若干 Rule
 *
 * 普通规则 Rule 是一个 BooleanConfigItem，会默认带一个开关
 *   如果不希望显示开关，则需要在 details 里指定 always: true 此时认为
 *
 * ConfigItem 用于描述一个界面元素，或一个对应的设置项
 * yawf.rule.class.ConfigItem 的构造函数一般不需要从外部调用
 * 一条 Rule 或者 Rule 的 ref 属性，是一个 ConfigItem
 * ref 属性下的 ConfigItem 的类型由构造时对象的 type 属性决定：
 *   boolean: 复选框
 *   select: 下拉单选框
 *   number: 数字输入框
 *   range: 数字输入框和一个范围选择
 *   bubble: 提示文字
 *   strings: 多个字符串
 *   regexen: 多个正则表达式
 *   users: 多个用户（id）
 *   usernames: 多个用户名
 *   topics: 多个话题
 *   key: 一个键盘按键
 *
 * ConfigItem 的属性和方法包括：
 * 显示相关
 *   template() （可选） 用于显示的模板
 *   render(isRoot: boolean) （可选） 显示的函数，如果缺省则使用 template 属性根据规则生成
 *   afterRender(container: Element) （可选） 在调用 render 后可用这个函数对产生的 DOM 做进一步修改
 *   text(isRoot: boolean) （可选） 显示的文本，如果缺省则使用 template 或 render 根据规则生成
 * 设置相关
 *   initial(): any 设置的默认值
 *   normalize(value: any): any 对设置值进行规范化
 *   getConfig(): any 获取设置
 *   setConfig(value: any): any 写入新设置
 *   addConfigListener(callback: (newValue: any, oldValue: any) => void) 当设置改变时回调
 *   removeConfigListener(callback) 取消添加的设置改变的回调
 *
 * BooleanConfigItem 继承自 ConfigItem 包括属性和方法：
 *   always(): boolean = false 如果该属性为 true，那么显示时不带复选框，没有对应的设置项，检查时总是已启用
 *   isEnabled(): boolean 检查是否已启用
 *
 * SelectConfigItem 继承自 ConfigItem
 *   指定 select 属性为 Array<{ name: string, value: string }>，可以用于渲染选择框
 *
 * NumberConfigItem 继承自 ConfigItem
 *   指定 min, max, step 属性，类型 number，可用于输入一个数字
 *
 * RangeConfigItem 继承自 NumberConfigItem
 *   相比 Number 多了一个拖动条以方便输入
 *
 * BubbleConfigItem 继承自 ConfigItem
 *   不存储数据，仅用来展示一个气泡弹窗
 *   使用 icon 属性描述图标类型，模板内容将会渲染到气泡中
 *
 * RuleItem 继承自 BooleanConfigItem 包括属性和方法：
 *   parent 构造时如指定 parent，则会将该规则加入到其父亲的子集合中
 *   children: Array<RuleItem> 构造时自动初始化的数组，用于维护其子集合
 *   type: string = "normal": 规则的类型，用于标记 Tab 和 Group
 *
 * Tab, Group 继承自 RuleItem：
 *   这两个会自动带有 always => true，且有特殊的 type，有特殊的渲染逻辑
 *
 * Rule 继承自 RuleItem，在外部构造时使用 yawf.rule.Rule 构造器构造（无需 new 关键字），包括：
 *   css: string | () => string 这条规则注册的 CSS，无论规则是否启用均会生效
 *   acss: string | () => string 这条规则注册的 CSS，仅启用该条规则后生效
 *   init: () => void 当初始化时调用，无论规则是否启用均会生效
 *   ainit: () => void 当初始化时调用，仅启用该条规则后生效
 *
 * Text 继承自 Rule，在外部构造时使用 yawf.rule.Text 构造器构造（无需 new 关键字）：
 *   实现了特殊的渲染逻辑
 *
 * yawf.rule.tabs: Array<Tab> 用于维护所有注册的标签页
 * yawf.rule.query({
 *   base: Array<RuleItem> = yawf.rule.tabs
 * }): Array<Rule> 用于根据筛选条件列出对应的规则
 */
; (function () {

  const yawf = window.yawf;

  const util = yawf.util;
  const config = yawf.config;
  const init = yawf.init;
  const request = yawf.request;

  const css = util.css;
  const ui = util.ui;
  const i18n = util.i18n;
  const priority = util.priority;
  const keyboard = util.keyboard;

  const rule = yawf.rule = {};
  const rules = yawf.rules = {};
  const tabs = rule.tabs = [];

  rules.all = new Map();
  rule.class = {};
  rule.types = {};

  /**
   * 这里维护一个基本的设置项
   * 我们在这一层维护：
   *   基于 template 属性的通用渲染逻辑
   *   基于 ref 属性的父子关系（用于渲染）
   * @constructor
   * @param {object} self
   */
  const BaseConfigItem = function BaseConfigItem(self) {
    if (!self.ref) self.ref = {};
    Object.keys(self.ref).forEach(key => {
      if (self.ref[key] instanceof BaseConfigItem) return;
      if (!self.ref[key].id) self.ref[key].id = key;
      self.ref[key] = configItemBuilder(self.ref[key], self);
    });
    // 如果使用 Object.assign 将 self 上的内容拷贝到 this 上
    //   将会丢失 self 上的所有的 getter / setter
    //   且当原型上有 setter 时会发生错误
    // 因此我们为 self 设置正确的 __proto__，并直接返回 self
    // 只要子类不在 super 之前访问 this，这样做是很安全的
    // 一般不推荐这种做法，但是这里用起来实在是感觉太好了
    Object.setPrototypeOf(self, Object.getPrototypeOf(this));
    return self;
  };
  /**
   * @returns {string}
   */
  BaseConfigItem.prototype.template = function () { return ''; };

  /** @param {boolean} fullDom */
  const parseTemplate = function (fullDom) {
    /**
     * @typedef {{ type: string, value: string }} TemplateToken
     */
    /** @type {(template: string) => Array<TemplateToken>} */
    const tokenize = function (template) {
      const parseReg = new RegExp([
        String.raw`\{\{([^\}]+)\}\}`, // {{child}}
        String.raw`\[\[([^\]]+)\]\]`, // [[rule]]
        String.raw`(\|\||\|)`, // || or |
        String.raw`([^\|\[\{\&]+|&[^;]+;)`, // text
      ].map(reg => `(?:${reg})`).join('|'), 'g');
      /** @type {string?[][]} */
      const matches = [];
      while (true) {
        const match = parseReg.exec(template);
        if (!match) break;
        matches.push([...match]);
      }
      const tokens = matches.map(([_, ...typed]) => {
        const types = ['child', 'rule', 'splitter', 'text'];
        const index = typed.findIndex(x => x);
        if (index === -1) return null;
        return { type: types[index], value: typed[index] };
      }).filter(token => token);
      return tokens;
    };

    /** @type {(tokens: Array<TemplateToken>, acceptTypes: Iterable<string>) => Array<TemplateToken>} */
    const filteredTokens = function (tokens, acceptTypes) {
      const types = new Set(acceptTypes);
      return tokens.filter(token => token && types.has(token.type));
    };

    /**
     * @typedef {(token: TemplateToken, reference: Node, ref: UiItemCollection) => Node} TemplateTokenRender
     */
    /** @type {Object<string, TemplateTokenRender>} */
    const tokenRender = {};

    /** @type {TemplateTokenRender} */
    tokenRender.child = function (token, reference, ref, mode) {
      const child = ref[token.value];
      if (!child) return reference;
      if (mode !== 'text') {
        const childDom = child.getRenderResult(mode === 'recursive');
        if (childDom instanceof Node) {
          reference.appendChild(childDom);
          return reference;
        } else if (typeof childDom === 'function') {
          return childDom(reference);
        } else return reference;
      } else {
        const text = child.text();
        reference.appendChild(document.createTextNode(text));
        return reference;
      }
    };
    /** @type {TemplateTokenRender} */
    tokenRender.rule = function (token, reference, ref, mode) {
      const refRule = rules.all.get(token.value);
      if (!refRule) {
        util.debug('Referenced rule %s does not found.', token.value);
      }
      if (mode === 'text') {
        reference.appendChild(refRule.text(false));
      } else {
        reference.appendChild(refRule.render(false));
      }
      return reference;
    };
    /** @type {TemplateTokenRender} */
    tokenRender.splitter = function (token, reference, ref, mode) {
      const parent = reference.parentNode;
      const label = document.createElement('label');
      parent.insertBefore(label, reference.nextSibling);
      if (token.value === '||') {
        const br = document.createElement('br');
        parent.insertBefore(br, reference.nextSibling);
      }
      return label;
    };
    /** @type {TemplateTokenRender} */
    tokenRender.text = function (token, reference, ref, mode) {
      const text = token.value.startsWith('&') ? {
        '&amp;': '&',
      }[token.value] : token.value;
      reference.appendChild(document.createTextNode(text));
      return reference;
    };
    /** @type {Array<string>} */
    let acceptTypes = [];
    const itemRender = function (template, ref, mode = null) {
      const types = mode && (acceptTypes = {
        normal: ['child', 'splitter', 'text'],
        recursive: ['child', 'splitter', 'text', 'rule'],
        text: ['child', 'text'],
      }[mode ?? 'normal']) || acceptTypes.filter(type => type !== 'rule');
      const reference = document.createElement('label');
      const container = document.createElement('span');
      container.classList.add('yawf-config-item');
      container.appendChild(reference);
      const tokens = filteredTokens(tokenize(template), types);
      tokens.reduce((reference, token) => (
        tokenRender[token.type](token, reference, ref, mode)
      ), reference);
      return container;
    };

    const ruleRender = function (isRoot = true) {
      if (!this.template) return null;
      const template = this.template();
      const ref = this.ref;
      const mode = fullDom ? isRoot ? 'recursive' : 'normal' : 'text';
      return itemRender(template, ref, mode);
    };

    return ruleRender;
  };

  /**
   * render 是通用的基于 template 的渲染逻辑
   */
  BaseConfigItem.prototype.render = parseTemplate(true);
  /**
   * text 是通用的检查包含文字的逻辑
   */
  BaseConfigItem.prototype.text = ((parse => function (isRoot = true) {
    let result;
    if (this.template) result = parse.call(this, isRoot);
    else result = this.render(isRoot);
    return result?.textContent.trim() ?? '';
  })(parseTemplate(false)));
  /**
   * 渲染包括 render 和一个可选的 afterRender
   * 这里包装两个函数，如果需要重载渲染逻辑，应该重载 render
   * 如果需要获得渲染结果，应该使用这个方法
   */
  BaseConfigItem.prototype.getRenderResult = function (isRoot = true) {
    let node = this.render(isRoot);
    if (typeof this.afterRender === 'function') {
      node = this.afterRender(node);
    }
    return node;
  };

  const nextConfigId = (function () {
    let lastIndex = Math.floor(Math.random() * 1e7) * 10;
    /**
     * @return {string} 返回一个在此次运行中唯一的值，用来标识独立的设置项
     */
    return function () {
      lastIndex += Math.floor(Math.random() * 100);
      const rand = Math.random().toString(36).slice(2);
      const index = lastIndex.toString(36);
      return `yawf-${rand}-${index}`;
    };
  }());

  /**
   * 一个可能带有设置的项目
   * 我们在这一层维护所有和设置有关的内容，包括
   *   设置的读写
   *   设置的合法性验证
   *   设置更新时回调更新数据的渲染逻辑
   */
  class ConfigItem extends BaseConfigItem {
    /**
     * @param {object} item 子设置项
     * @param {ConfigItem} context 父设置项（item 应当在是该设置项的 ref 中）
     */
    constructor(item, context) {
      super(item);
      if (context) {
        this.context = context;
        if (this.id) this.id = context.id + '.' + this.id;
      }
      this.configId = nextConfigId();
      this.configInitialized = false;
    }
    /**
     * @returns {any} 表示设置的初始值
     */
    get initial() { return null; }
    /**
     * @param {any} 未格式化的设置项
     * @returns {any} 根据该设置项允许的取值格式化后的设置项，此时设置项总是合法的
     */
    normalize(value) { return value; }
    /**
     * 重载这个函数来指定使用什么来存储
     * 默认保存在当前用户之下
     */
    get configPool() {
      return config.user;
    }
    /**
     * 初始化设置项
     * 这个函数仅应由 initConfig 调用
     */
    preparConfig() {
      if (this.config) return this.config;
      if (!this.id) throw Error('id is required to init config');
      this.config = this.configPool.key(this.id);
      return this.config;
    }
    /**
     * 一个项目不一定总是需要包含设置项
     * 如果没有调用过任何 getConfig, setConfig 等方法，则不会为该项目分配设置项
     * 在第一次调用任何和设置项相关的方法时，我们试图分配设置项
     */
    initConfig() {
      if (this.configInitialized) return;
      this.configInitialized = true;
      this.preparConfig();
      this.addConfigUiListener();
    }
    /**
     * 初始化设置项变化时对 UI 的反馈
     * 这个函数仅应由 initConfig 调用
     */
    addConfigUiListener() {
      this.initConfig();
      this.config.addListener(newValue => {
        this.renderAllValues();
      });
    }
    /**
     * 读取设置项
     * @return {any} 当前设置项的值
     */
    getConfig() {
      this.initConfig();
      const value = this.config.get();
      const stringifyValue = value == null ? value : JSON.stringify(value);
      const normalize = this.normalize(value);
      const stringifyNormalize = normalize == null ? normalize : JSON.stringify(normalize);
      if (stringifyValue !== stringifyNormalize) {
        this.config.set(normalize);
      }
      return normalize;
    }
    /**
     * 写入设置项
     * @param {any} value 当前设置项的值
     * @return {any} 实际写入的值（经过格式化）
     */
    setConfig(value) {
      this.initConfig();
      const normalize = this.normalize(value);
      this.config.set(normalize);
      return normalize;
    }
    /**
     * 当设置项变化时的回调
     * 注意不要在回调函数中保留设置项渲染出来的文档节点的引用，否则可能造成垃圾回收失效
     * @param {Function} callback 当设置项变化时的回调函数
     * @return {{removeConfigListener: Function}}
     */
    addConfigListener(callback) {
      this.initConfig();
      const { removeListener } = this.config.addListener(callback);
      return { removeConfigListener: removeListener };
    }
    render(...args) {
      const node = super.render(...args);
      // 在渲染时标记该元素的设置 id
      // 当需要更新设置时可以方便地从界面上找到该元素
      node.setAttribute('yawf-config-item', this.configId);
      return node;
    }
    /**
     * 根据设置 id 找到所有该设置项渲染的实例
     */
    getRenderItems() {
      const selector = `[yawf-config-item="${this.configId}"]`;
      return Array.from(document.querySelectorAll(selector));
    }
    /**
     * 更新渲染项的值
     * @param {HTMLElement} container
     */
    renderValue(container) {
      return container;
    }
    /**
     * 更新渲染所有实例
     */
    renderAllValues() {
      const items = this.getRenderItems();
      items.forEach(item => this.renderValue(item));
    }
  }
  rule.class.ConfigItem = ConfigItem;

  /**
   * 一个没有界面的设置项
   */
  class OffscreenConfigItem extends ConfigItem {
    addConfigUiListener() { /* 因为没有 UI，所以什么都不做 */ }
    render() { return null; }
    text() { return ''; }
    getRenderItems() { return null; }
    getRenderResult() { return null; }
    renderValue() { return null; }
  }
  rule.class.OffscreenConfigItem = OffscreenConfigItem;
  rule.types.offscreen = OffscreenConfigItem;

  /**
   * 一个布尔设置项
   * 有个 checkbox
   * 使用默认的渲染逻辑，复选框加到最前面
   */
  class BooleanConfigItem extends ConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get initial() { return false; }
    normalize(value) {
      if (value == null) return this.initial;
      return !!value;
    }
    isEnabled() {
      return this.always || this.getConfig();
    }
    render(...args) {
      const container = super.render(...args);
      if (this.always) return container;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('yawf-config-checkbox');
      checkbox.setAttribute('yawf-config-input', this.configId);
      checkbox.addEventListener('change', event => {
        if (!event.isTrusted) {
          this.renderValue(container);
        } else this.setConfig(checkbox.checked);
      });
      const label = container.querySelector('label');
      label.insertBefore(checkbox, label.firstChild);
      checkbox.checked = this.getConfig();
      const contain = document.createElement('span');
      contain.className = 'yawf-config-checkbox-wrap';
      const icon = document.createElement('span');
      icon.className = 'yawf-config-checkbox-icon';
      checkbox.replaceWith(contain);
      contain.append(checkbox);
      contain.append(icon);
      icon.append(ui.icon('checkbox').documentElement);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `input[type="checkbox"][yawf-config-input="${this.configId}"]`;
      const checkbox = container.querySelector(selector);
      const config = this.getConfig();
      if (checkbox && checkbox.checked !== config) {
        checkbox.checked = config;
      }
      return container;
    }
  }
  rule.class.BooleanConfigItem = BooleanConfigItem;
  rule.types.boolean = BooleanConfigItem;

  /**
   * 一个多选一设置项
   * 有个 select 下拉选择框
   * 需要配置 select 属性为 Array<{ value: string, name: string }> 用于候选项
   * 不使用默认的渲染逻辑
   */
  class SelectConfigItem extends ConfigItem {
    constructor(item, parent) {
      super(item, parent);
      const select = this.select;
      if (!select || !Array.isArray(select) && typeof select.then !== 'function') {
        throw TypeError('`select` attribute is required for select config item');
      }
      if (!Array.isArray(select) && typeof select.then === 'function') {
        Promise.resolve(select).then(items => {
          this.select = items;
          if (this.configInitialized) {
            this.getConfig();
          }
        });
      }
    }
    get initial() {
      const select = this.select;
      if (!select) return null;
      if (!Array.isArray(select)) return null;
      if (!select[0]) return null;
      return select[0].value;
    }
    normalize(value) {
      const select = this.select;
      if (select && !Array.isArray(select) && typeof select.then === 'function') return value;
      if (!select || !Array.isArray(select)) return null;
      if (select.find(item => item.value === value)) return value;
      return this.initial;
    }
    render() {
      const container = document.createElement('span');
      container.setAttribute('yawf-config-item', this.configId);
      container.classList.add('yawf-config-select');
      const select = document.createElement('select');
      select.classList.add('woo-input-main');
      const renderOptions = items => {
        items.forEach(({ text, value, style = null }) => {
          const option = document.createElement('option');
          option.value = JSON.stringify(value);
          option.text = typeof text === 'function' ? text() : text;
          if (style) option.style += ';' + style;
          select.add(option);
        });
        select.value = JSON.stringify(this.getConfig());
      };
      if (Array.isArray(this.select)) renderOptions(this.select);
      else Promise.resolve(this.select).then(items => {
        renderOptions(items);
      });
      select.setAttribute('yawf-config-input', this.configId);
      select.addEventListener('change', event => {
        if (!event.isTrusted) {
          this.renderValue(container);
        } else this.setConfig(JSON.parse(select.value));
      });
      container.appendChild(select);
      const wrap = document.createElement('div');
      wrap.className = 'woo-input-wrap';
      select.replaceWith(wrap);
      wrap.append(select);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `select[yawf-config-input="${this.configId}"]`;
      const select = container.querySelector(selector);
      const config = this.getConfig();
      const configStr = JSON.stringify(config);
      if (select && select.value !== configStr) {
        select.value = configStr;
      }
      return container;
    }
  }
  rule.class.SelectConfigItem = SelectConfigItem;
  rule.types.select = SelectConfigItem;

  /**
   * 一个输入框
   * 不暴露给外面直接使用
   */
  class InputConfigItem extends ConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get initial() { return ''; }
    get inputType() { return 'text'; }
    normalize(value) { return '' + value; }
    stringify(value) { return '' + value; }
    render() {
      const container = document.createElement('span');
      container.setAttribute('yawf-config-item', this.configId);
      container.classList.add('yawf-config-input');
      const input = document.createElement('input');
      input.classList.add('woo-input-main');
      input.type = this.inputType;
      input.value = this.getConfig();
      input.addEventListener('input', event => {
        if (!event.isTrusted) {
          this.renderValue(container);
        } else {
          const token = this.setConfigToken = {};
          setTimeout(() => {
            if (this.setConfigToken !== token) return;
            this.setConfig(input.value);
            if (document.activeElement !== input) {
              this.renderValue(container);
            }
          }, 100);
        }
      });
      input.addEventListener('blur', event => {
        this.renderValue(container);
      });
      input.setAttribute('yawf-config-input', this.configId);
      container.appendChild(input);
      const wrap = document.createElement('div');
      wrap.className = 'woo-input-wrap';
      input.replaceWith(wrap);
      wrap.append(input);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `input[yawf-config-input="${this.configId}"]`;
      const input = container.querySelector(selector);
      const config = this.getConfig();
      const hasFocus = input === document.activeElement;
      if (input && !hasFocus && input.value !== this.stringify(config)) {
        input.value = this.stringify(config);
      }
      return container;
    }
  }
  rule.class.InputConfigItem = InputConfigItem;
  rule.types.input = InputConfigItem;

  /**
   * 一个数字输入框
   * 允许定义 min, max, step 属性
   * 对应一个 number 输入框
   */
  class NumberConfigItem extends InputConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get inputType() { return 'number'; }
    get initial() { return Math.min(Math.max(this.min, 0), this.max); }
    get min() { return 0; }
    get max() { return Infinity; }
    get step() { return 1; }
    normalize(value) {
      let number = +value;
      if (!Number.isFinite(number)) return this.initial;
      if (+this.min === this.min && number < this.min) number = this.min;
      if (+this.max === this.max && number > this.max) number = this.max;
      if (+this.step === this.step && Number.isFinite(this.step)) {
        number -= (number - this.min) % this.step;
      }
      return number;
    }
    render() {
      const container = super.render();
      container.classList.add('yawf-config-number');
      const input = container.querySelector('input');
      if (+this.min === this.min && this.min !== -Infinity) input.min = this.min;
      if (+this.max === this.max && this.max !== Infinity) input.max = this.max;
      if (+this.step === this.step && Number.isFinite(this.step)) input.step = this.step;
      return container;
    }
  }
  rule.class.NumberConfigItem = NumberConfigItem;
  rule.types.number = NumberConfigItem;

  /**
   * 范围输入框
   * 和数字输入框没什么差别，除了多了一个范围拖动条
   * 仅当 min、max 都设置了时才会有效
   */
  class RangeConfigItem extends NumberConfigItem {
    render(...args) {
      const container = super.render(...args);
      container.setAttribute('yawf-config-item', this.configId);
      if (+this.min !== this.min) return container;
      if (!Number.isFinite(this.min)) return container;
      if (+this.max !== this.max) return container;
      if (!Number.isFinite(this.max)) return container;
      if (+this.step !== this.step) return container;
      if (!Number.isFinite(this.step)) return container;
      container.classList.add('yawf-config-range');
      const ranger = document.createElement('span');
      ranger.classList.add('yawf-config-range-wrap');
      const range = document.createElement('input');
      range.type = 'range';
      ranger.appendChild(range);
      container.appendChild(ranger);
      range.min = this.min;
      range.max = this.max;
      range.step = this.step;
      range.addEventListener('input', event => {
        if (!event.isTrusted) {
          this.renderValue(container);
        } else {
          const token = this.setConfigToken = {};
          setTimeout(() => {
            if (this.setConfigToken !== token) return;
            this.setConfig(+range.value);
          }, 100);
        }
      });
      range.addEventListener('blur', event => {
        this.renderValue(container);
      });
      range.value = this.getConfig();
      range.setAttribute('yawf-config-input', this.configId);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `input[type="range"][yawf-config-input="${this.configId}"]`;
      const range = container.querySelector(selector);
      const config = this.getConfig();
      const hasFocus = range === document.activeElement;
      if (range && !hasFocus && +range.value !== config) {
        range.value = config;
      }
      return container;
    }
  }
  rule.class.RangeConfigItem = RangeConfigItem;
  rule.types.range = RangeConfigItem;

  /**
   * 一个颜色选择框
   * 对应一个 color 输入框
   */
  class ColorConfigItem extends InputConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get initial() { return '#ffffff'; }
    normalize(value) {
      if (typeof value !== 'string') return this.initial;
      if (!/#[0-9a-f]{6}/i.test(value)) return this.initial;
      return value;
    }
    render() {
      const container = super.render();
      container.classList.add('yawf-config-color');
      const input = container.querySelector('input');
      input.type = 'color';
      return container;
    }
  }
  rule.class.ColorConfigItem = ColorConfigItem;
  rule.types.color = ColorConfigItem;

  i18n.keyboardDisabled = {
    cn: '（已禁用）',
    tw: '（已停用）',
    en: '(Disabled)',
  };

  /**
   * 一个设置按键的设置项
   */
  class KeyboardConfigItem extends ConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get initial() { return null; }
    normalize(value) {
      if (value === null) return null;
      if (typeof value !== 'number') return this.initial;
      if (value < 0 || value > keyboard.alter.MAX) return this.initial;
      return value;
    }
    render() {
      const container = document.createElement('span');
      container.setAttribute('yawf-config-item', this.configId);
      container.classList.add('yawf-config-key');
      const button = document.createElement('button');
      button.className = 'woo-button-main woo-button-line woo-button-primary woo-button-s woo-button-round';
      button.type = 'button';
      button.textContent = keyboard.name(this.getConfig());
      button.addEventListener('keydown', event => {
        if (!event.isTrusted) return;
        const code = keyboard.event(event);
        if (code === keyboard.code.TAB) return;
        if (code === keyboard.code.TAB + keyboard.alter.SHIFT) return;
        if (code === keyboard.code.ESC) {
          this.setConfig(null);
        } else {
          this.setConfig(code);
        }
        event.preventDefault();
        event.stopPropagation();
      }, true);
      button.setAttribute('yawf-config-input', this.configId);
      container.appendChild(button);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `button[type="button"][yawf-config-input="${this.configId}"]`;
      const button = container.querySelector(selector);
      const config = this.getConfig();
      const text = config ? keyboard.name(config) : i18n.keyboardDisabled;
      if (button && button.textContent !== text) {
        button.textContent = text;
      }
      return container;
    }
  }
  rule.class.KeyboardConfigItem = KeyboardConfigItem;
  rule.types.key = KeyboardConfigItem;

  /**
   * 一个文本输入框
   * 对应一个 textarea 输入框
   */
  class TextConfigItem extends ConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get initial() { return ''; }
    normalize(value) {
      if (typeof value !== 'string') return this.initial;
      return value;
    }
    render() {
      const container = document.createElement('span');
      container.setAttribute('yawf-config-item', this.configId);
      container.classList.add('yawf-config-text');
      const textarea = document.createElement('textarea');
      textarea.className = 'yawf-config-textarea woo-input-main';
      textarea.value = this.getConfig();
      textarea.addEventListener('input', event => {
        if (!event.isTrusted) textarea.value = this.getConfig();
        else this.setConfig(textarea.value);
      });
      textarea.addEventListener('blur', event => {
        this.renderValue(container);
      });
      textarea.setAttribute('yawf-config-input', this.configId);
      container.appendChild(textarea);
      const wrap = document.createElement('div');
      wrap.className = 'woo-input-wrap';
      textarea.replaceWith(wrap);
      wrap.append(textarea);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `textarea[yawf-config-input="${this.configId}"]`;
      const textarea = container.querySelector(selector);
      const config = this.getConfig();
      if (textarea && textarea.value !== config) {
        textarea.value = config;
      }
      return container;
    }
  }
  rule.class.TextConfigItem = TextConfigItem;
  rule.types.text = TextConfigItem;

  /**
   * 显示一个小图标，鼠标划上去可以显示弹出起泡
   * 这个项目不对应设置值
   */
  class BubbleConfigItem extends BaseConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    render(...args) {
      const content = super.render(...args);
      const contentLabel = content.querySelector('label');
      contentLabel.replaceWith(...Array.from(contentLabel.childNodes));
      const container = document.createElement('span');
      const iconType = {
        ask: 'help',
        warn: 'warn',
        succ: 'success',
      }[this.icon] ?? 'help';
      const icon = document.createElement('div');
      icon.className = 'yawf-bubble-icon';
      const svg = icon.appendChild(ui.icon(iconType).documentElement);
      svg.setAttribute('class', `woo-tip-icon woo-tip-${iconType}Fill`);
      container.appendChild(icon);
      ui.bubble(content, icon);
      return container;
    }
  }
  rule.class.BubbleConfigItem = BubbleConfigItem;
  rule.types.bubble = BubbleConfigItem;

  i18n.collectionAddButton = {
    cn: '添加',
    tw: '新增',
    en: 'Add',
  };

  class CollectionConfigItem extends ConfigItem {
    get initial() { return []; }
    normalize(value) {
      if (!Array.isArray(value)) return [];
      return value.map(item => this.normalizeItem(item)).filter(item => item != null);
    }
    normalizeItem(item) { return item; }
    track(item, index = -1) { return '' + index; }
    renderListitem(item, index) {
      const listitem = document.createElement('li');
      listitem.classList.add('yawf-config-collection-item');
      const track = arguments.length > 1 ? this.track(item, index) : this.track(item);
      listitem.dataset.yawfTrack = track;
      const deleteItem = document.createElement('span');
      deleteItem.classList.add('yawf-config-collection-remove');
      deleteItem.innerHTML = '<i class="woo-font woo-font--cross" yawf-component-tag="woo-fonticon"></i>';
      listitem.appendChild(deleteItem);
      const content = document.createElement('div');
      content.classList.add('yawf-config-collection-item-content');
      content.appendChild(this.renderItem(item));
      listitem.appendChild(content);
      return listitem;
    }
    render() {
      return reference => {
        /** @type {HTMLLabelElement} */
        const label = reference;
        // 我们渲染一个输入框
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'yawf-config-collection-input woo-input-main';
        label.appendChild(input);
        const wrap = document.createElement('div');
        wrap.className = 'woo-input-wrap';
        input.replaceWith(wrap);
        wrap.append(input);
        // 在当前标签前面藏一个表单元素，用于处理用户输入提交
        const form = document.createElement('form');
        form.classList.add('yawf-config-collection-form');
        form.setAttribute('onsubmit', '');
        label.parentNode.insertBefore(form, label);
        const formId = form.id = nextConfigId();
        input.setAttribute('form', formId);
        // 在当前标签后面放一个提交按钮
        setTimeout(() => {
          const submit = document.createElement('button');
          submit.setAttribute('form', formId);
          submit.className = 'yawf-config-collection-submit woo-button-main woo-button-line woo-button-primary woo-button-s woo-button-round';
          submit.textContent = i18n.collectionAddButton;
          label.parentNode.insertBefore(submit, label.nextSibling);
        }, 0);
        // 处理提交时的操作
        form.addEventListener('submit', async event => {
          event.preventDefault();
          event.stopPropagation();
          if (!event.isTrusted) return;
          const userInput = input.value.trim();
          if (!userInput) return;
          input.disabled = true;
          const items = await this.parseUserInput(userInput);
          if (Array.isArray(items)) {
            items.forEach(item => this.addItem(item));
            input.value = '';
          }
          input.disabled = false;
        });
        label.addEventListener('keydown', event => {
          if (!event.isTrusted) return;
          const code = keyboard.event(event);
          if (code === keyboard.code.ENTER) {
            event.stopPropagation();
          }
        });
        if (typeof this.getSuggestionItems === 'function') {
          this.renderSuggestionItems(input);
        }

        // 显示所有项目组成的列表
        const container = document.createElement('div');
        container.classList.add('yawf-config-collection-items');
        container.setAttribute('yawf-config-item', this.configId);
        const list = document.createElement('ul');
        list.classList.add('yawf-config-collection-list');
        container.appendChild(list);
        reference.parentNode.appendChild(container);
        this.getConfig().forEach((item, index) => {
          const listitem = this.renderListitem(item, index);
          list.appendChild(listitem);
        });
        container.addEventListener('click', event => {
          if (!event.isTrusted) return;
          const deleteItem = event.target.closest('.yawf-config-collection-remove');
          if (!deleteItem) return;
          const listitem = deleteItem.parentNode;
          const track = listitem.dataset.yawfTrack;
          this.removeItem(track);
        });
      };
    }
    async parseUserInput(value) {
      return [value];
    }
    async parseFastItem(value, type) {
      return this.parseUserInput(value);
    }
    addItem(value) {
      const values = this.getConfig();
      const track = this.track(value);
      const index = values.findIndex((item, index) => this.track(item, index) === track);
      if (index !== -1) values.splice(index, 1);
      values.push(value);
      this.setConfig(values);
    }
    removeItem(track) {
      const values = this.getConfig();
      const index = values.findIndex((item, index) => this.track(item, index) === track);
      if (index !== -1) values.splice(index, 1);
      this.setConfig(values);
    }
    renderItem(item) {
      return document.createTextNode(item);
    }
    updateItem(container, item) {
      container.textContent = item;
    }
    renderValue(container) {
      const values = this.getConfig();
      const list = container.querySelector('.yawf-config-collection-list');
      const listitems = container.querySelectorAll('.yawf-config-collection-item');
      const listitemMap = new Map();
      [...listitems].forEach(listitem => {
        listitemMap.set(listitem.dataset.yawfTrack, listitem);
      });
      list.innerHTML = '';
      values.forEach((value, index) => {
        const track = this.track(value, index);
        if (listitemMap.has(track)) {
          const listitem = listitemMap.get(track);
          const content = listitem.querySelector('.yawf-config-collection-item-content');
          this.updateItem(content, value);
          list.appendChild(listitem);
        } else {
          const listitem = this.renderListitem(value, index);
          list.appendChild(listitem);
        }
      });
    }
    /**
     * @param {HTMLInputElement} input
     */
    renderSuggestionItems(input) {
      const suggestionContainer = document.createElement('div');
      suggestionContainer.classList.add('layer_menu_list', 'yawf-collection-suggestion');
      const suggestionList = document.createElement('ul');
      suggestionList.classList.add('yawf-collection-suggestion-list');
      suggestionContainer.appendChild(suggestionList);
      /** @type {HTMLLIElement[]} */
      const suggestionItems = [];
      let suggestionItemsShown = false;
      const hideSuggestionItems = () => {
        suggestionItemsShown = false;
        if (!suggestionContainer.parentNode) return;
        suggestionContainer.parentNode.removeChild(suggestionContainer);
      };
      const oldPosition = Array(3).fill(NaN);
      const updatePosition = () => {
        if (!suggestionItemsShown) return;
        const rects = input.getClientRects();
        if (!rects?.[0]) return;
        const { left, width, bottom } = rects[0];
        const [oldLeft, oldWidth, oldBottom] = oldPosition;
        if (left !== oldLeft) suggestionContainer.style.left = Math.round(left) + 'px';
        if (width !== oldWidth) suggestionContainer.style.minWidth = (Math.round(width) - 4) + 'px';
        if (bottom !== oldBottom) suggestionContainer.style.top = Math.round(bottom) + 'px';
        oldPosition.splice(0, 3, left, width, bottom);
        window.requestAnimationFrame(updatePosition);
      };
      const showSuggestionItems = items => {
        suggestionList.innerHTML = '';
        suggestionItems.splice(0);
        suggestionItems.push(...items.map(item => {
          const listitem = document.createElement('li');
          listitem.classList.add('yawf-list-suggestion-item');
          listitem.dataset.yawfSuggestionData = JSON.stringify(item);
          const link = document.createElement('a');
          link.href = 'javascript:void(0);';
          listitem.appendChild(link);
          this.renderSuggestionItem(link, item);
          suggestionList.appendChild(listitem);
          return listitem;
        }));
        if (items.length) suggestionContainer.style.display = 'block';
        else suggestionContainer.style.display = 'none';
        if (!suggestionContainer.parentNode) {
          document.body.appendChild(suggestionContainer);
        }
        suggestionItemsShown = true;
        updatePosition();
      };
      const updateInputSuggestion = async () => {
        const userInput = input.value.trim();
        const hasFocus = document.activeElement === input;
        if (!hasFocus) {
          hideSuggestionItems();
        } else {
          const items = await this.getSuggestionItems(userInput);
          if (userInput !== input.value.trim()) return;
          showSuggestionItems(items);
        }
      };
      input.addEventListener('input', updateInputSuggestion);
      input.addEventListener('focus', updateInputSuggestion);
      input.addEventListener('blur', updateInputSuggestion);
      const choseSuggestionListItem = listitem => {
        const item = JSON.parse(listitem.dataset.yawfSuggestionData);
        const normalized = this.normalizeItem(this.parseSuggestionItem(item));
        if (normalized === null) return;
        this.addItem(normalized);
        input.value = '';
        updateInputSuggestion();
      };
      const getFocus = () => suggestionItems.find(item => item.classList.contains('yawf-current'));
      const setFocus = current => suggestionItems.forEach(item => {
        if (item === current) {
          item.classList.add('yawf-current');
        } else {
          item.classList.remove('yawf-current');
        }
      });
      const keydownEventHandler = event => {
        const handler = {
          [keyboard.code.ENTER]: () => {
            const current = getFocus();
            if (!current) return;
            choseSuggestionListItem(current);
          },
          [keyboard.code.UP]: () => {
            const old = getFocus();
            const current = old?.previousSibling ?? suggestionItems[suggestionItems.length - 1];
            if (current) setFocus(current);
          },
          [keyboard.code.DOWN]: () => {
            const old = getFocus();
            const current = old?.nextSibling ?? suggestionItems[0];
            if (current) setFocus(current);
          },
        }[keyboard.event(event)];
        if (!handler) return;
        handler();
        event.preventDefault();
        event.stopPropagation();
      };
      input.addEventListener('keydown', keydownEventHandler);
      suggestionList.addEventListener('mousedown', event => {
        const listitem = event.target.closest('li.yawf-list-suggestion-item');
        choseSuggestionListItem(listitem);
        event.stopPropagation();
        event.preventDefault();
      });
      suggestionList.addEventListener('mouseover', event => {
        if (!(event.target instanceof Element)) return;
        const listitem = event.target.closest('li.yawf-list-suggestion-item');
        setFocus(listitem);
      });
    };
    parseSuggestionItem(item) { return item; }
  }
  rule.class.CollectionConfigItem = CollectionConfigItem;

  class StringCollectionConfigItem extends CollectionConfigItem {
    normalizeItem(item) { return ('' + item).trim(); }
    track(item, index = -1) { return item; }
    render(...args) {
      const render = super.render(...args);
      return reference => {
        render(reference);
        const container = reference.parentNode.querySelector('.yawf-config-collection-items');
        container.classList.add('yawf-config-collection-string');
      };
    }
    updateItem() {
      // track 返回的是字串本身，如果 track 对应字串不应该有变化，所以无需更新
    }
  }
  rule.class.StringCollectionConfigItem = StringCollectionConfigItem;
  rule.types.strings = StringCollectionConfigItem;

  class RegExpCollectionConfigItem extends StringCollectionConfigItem {
    constructor(item, parent) {
      super(item, parent);
      this.configCacheDirty = true;
    }
    initConfig() {
      if (this.configInitialized) return;
      super.initConfig();
      this.addConfigListener(() => {
        this.configCacheDirty = true;
      });
    }
    normalizeItem(value) {
      if (!value || typeof value !== 'object') return null;
      if (typeof value.source !== 'string') return null;
      if (typeof value.flags !== 'string' && value.flags !== void 0) return null;
      const { source, flags } = value;
      return { source, flags };
    }
    track({ source, flags }, index = -1) { return `/${source}/${flags}`; }
    renderItem({ source, flags }) {
      return document.createTextNode(`/${source}/${flags}`);
    }
    async parseUserInput(value) {
      let regexp = null;
      try {
        regexp = new RegExp(...value.match(/^\/(.*)\/([a-zA-Z]*)$/).slice(1));
      } catch (e) {
        try {
          regexp = new RegExp(value, 'mu');
        } catch (e2) { /* empty */ }
      }
      if (!regexp) return null;
      const { source, flags } = regexp;
      if (source === '(?:)') return null;
      return [{ source, flags }];
    }
    // 我们储存一份编译好的正则表达式，这样可以方便使用
    getConfigCompiled() {
      this.updateConfigCache();
      return this.configCache;
    }
    updateConfigCache() {
      if (Array.isArray(this.configCache) && !this.configCacheDirty) return;
      this.rebuildConfigCache();
    }
    setConfig(...args) {
      const result = super.setConfig(...args);
      this.rebuildConfigCacheLater();
      return result;
    }
    rebuildConfigCache() {
      this.configCache = this.getConfig().map(item => this.compileRegExp(item));
      this.configCacheDirty = false;
    }
    rebuildConfigCacheLater() {
      this.configCacheDirty = true;
      setTimeout(() => {
        if (this.configCacheDirty) {
          this.rebuildConfigCache();
        }
      }, 0);
    }
    addItem(value) {
      const values = this.getConfig();
      const track = this.track(value);
      const index = values.findIndex((item, index) => this.track(item, index) === track);
      if (index !== -1) {
        values.splice(index, 1);
      }
      values.push(value);
      super.setConfig(values);
    }
    removeItem(track) {
      const values = this.getConfig();
      const index = values.findIndex((item, index) => this.track(item, index) === track);
      if (index !== -1) {
        values.splice(index, 1);
      }
      super.setConfig(values);
    }
    compileRegExp({ source, flags }) {
      return RegExp(source, flags);
    }
  }
  rule.class.RegExpCollectionConfigItem = RegExpCollectionConfigItem;
  rule.types.regexen = RegExpCollectionConfigItem;

  class UserIdCollectionConfigItem extends CollectionConfigItem {
    normalizeItem(value) {
      if (!value || typeof value !== 'object') return null;
      const id = String(value.id);
      if (!id || !+id) return null;
      return { id };
    }
    track({ id }, index = -1) { return id; }
    render(...args) {
      const render = super.render(...args);
      return reference => {
        render(reference);
        const container = reference.parentNode.querySelector('.yawf-config-collection-items');
        container.classList.add('yawf-config-collection-user-id');
      };
    }
    renderItem({ id }) {
      const useritem = document.createElement('div');
      useritem.classList.add('yawf-config-user-item');
      const useravatar = document.createElement('div');
      useravatar.classList.add('yawf-config-user-avatar');
      useritem.appendChild(useravatar);
      const username = document.createElement('div');
      username.classList.add('yawf-config-user-name');
      useritem.appendChild(username);
      request.userInfo({ id }).then(({ name, avatar }) => {
        const img = new Image();
        img.src = avatar;
        img.classList.add('yawf-config-user-avatar-img');
        useravatar.appendChild(img);
        username.textContent = name;
      });
      return useritem;
    }
    async parseUserInput(value) {
      const username = value.replace(/^@/, '');
      const user = await request.userInfo({ name: username });
      if (!user?.id) return null;
      return [{ id: user.id }];
    }
    async parseFastItem(value, type) {
      return [value];
    }
    updateItem() {
    }
    async getSuggestionItems(userInput) {
      return request.userSuggest(userInput.replace(/^@/, ''));
    }
    renderSuggestionItem(listitem, item) {
      listitem.appendChild(document.createTextNode(item.name));
    }
  }
  rule.class.UserIdCollectionConfigItem = UserIdCollectionConfigItem;
  rule.types.users = UserIdCollectionConfigItem;

  class UserNameCollectionConfigItem extends StringCollectionConfigItem {
    async getSuggestionItems(userInput) {
      const users = await request.userSuggest(userInput.replace(/^@/, ''));
      return users.map(user => user.name);
    }
    renderSuggestionItem(listitem, item) {
      listitem.appendChild(document.createTextNode(item));
    }
    renderItem(value) {
      return document.createTextNode('@' + value);
    }
    async parseUserInput(userInput) {
      return [userInput.trim().replace(/^@?/, '')];
    }
    async parseFastItem(value) {
      return [value.name];
    }
  }
  rule.class.UserNameCollectionConfigItem = UserNameCollectionConfigItem;
  rule.types.usernames = UserNameCollectionConfigItem;

  class TopicCollectionConfigItem extends StringCollectionConfigItem {
    async getSuggestionItems(userInput) {
      const topics = await request.topicSuggest(userInput.replace(/#/g, ''));
      return topics;
    }
    renderSuggestionItem(listitem, item) {
      listitem.appendChild(document.createTextNode(item));
    }
    renderItem(value) {
      return document.createTextNode('#' + value + '#');
    }
    async parseUserInput(userInput) {
      return [userInput.trim().replace(/#/g, '')];
    }
    async parseFastItem(value) {
      return [value];
    }
  }
  rule.class.TopicCollectionConfigItem = TopicCollectionConfigItem;
  rule.types.topics = TopicCollectionConfigItem;

  // 这个目前不支持 V7
  class GroupIdCollectionConfigItem extends CollectionConfigItem {
    normalizeItem(value) {
      if (!value || typeof value !== 'object') return null;
      const id = String(value.id);
      return { id };
    }
    track({ id }, index = -1) { return id; }
    render(...args) {
      const render = super.render(...args);
      return reference => {
        render(reference);
        const container = reference.parentNode.querySelector('.yawf-config-collection-items');
        container.classList.add('yawf-config-collection-group-id');
      };
    }
    renderItem(value) {
      const span = document.createElement('span');
      ; (async function () {
        const groups = await request.groupList();
        const group = groups.find(group => group.id === value.id);
        span.textContent = group.name;
      }());
      return span;
    }
    async parseGroupInput(value) {
      const groups = await request.groupList();
      const group = groups.find(group => group.name === value);
      return [{ id: group.id }];
    }
    async parseFastItem(value, type) {
      return [value];
    }
    updateItem() {
    }
    async getSuggestionItems(userInput) {
      const groups = await request.groupList();
      return groups.filter(group => group.name.includes(userInput));
    }
    renderSuggestionItem(listitem, item) {
      listitem.appendChild(document.createTextNode(item.name));
    }
  }
  rule.class.GroupIdCollectionConfigItem = GroupIdCollectionConfigItem;
  rule.types.groups = GroupIdCollectionConfigItem;

  const configItemBuilder = function (item, parent) {
    if (!item) return null;
    const constructor = rule.types[item.type];
    if (!constructor) {
      return new ConfigItem(item, parent);
    } else {
      return new constructor(item, parent);
    }
  };

  /**
   * 描述一个出现在设置窗口中的项目
   */
  class RuleItem extends BooleanConfigItem {
    get type() { return 'normal'; }
    get disabled() { return false; }
    constructor(item) {
      super(item, null);
      if (this.parent) {
        this.parent.children.push(this);
      }
    }
  }

  /**
   * 描述设置窗口的一个标签页
   */
  class Tab extends RuleItem {
    constructor(item) {
      super(item);
      this.children = [];
      tabs.push(this);
    }
    get type() { return 'tab'; }
    get always() { return true; }
    render() {
      const span = document.createElement('span');
      span.textContent = this.template();
      return span;
    }
  }
  rule.Tab = function (item) {
    return new Tab(item);
  };
  rule.class.Tab = Tab;
  // 这个标签页不会在设置窗口中显示，但是会出现在搜索结果里面
  rule.vtab = rule.Tab({ type: 'vtab' });

  /**
   * 描述窗口的一组设置，一组设置有一个加粗文字显示的标题
   */
  class Group extends RuleItem {
    constructor(item) {
      if (!(item.parent instanceof Tab)) {
        throw TypeError('Group must in some Tab');
      }
      super(item);
      this.children = [];
    }
    get type() { return 'group'; }
    get always() { return true; }
    render(...args) {
      const node = super.render(...args);
      node.classList.add('yawf-config-group');
      return node;
    }
  }
  rule.class.Group = Group;
  rule.Group = function (item) {
    return new Group(item);
  };

  /**
   * 描述一条设置
   * 设置会调用 execute 初始化一次
   * 不要重载 execute 实现逻辑，相反，应该重载以下几个属性：
   *   css: string 描述该设置需要加入的 CSS，无论是否打开设置均会生效
   *   acss: string 仅当该设置打开时加入这些 CSS
   *   init: Function 初始化时会回调一次
   *   ainit: Function 仅当该设置打开时，初始化时回调一次
   */
  class Rule extends RuleItem {
    constructor(item) {
      if (!(item.parent instanceof Group)) {
        throw TypeError('Rule must in some Group');
      }
      super(item);
      rules.all.set(this.id, this);
    }
    /** @type {number|number[]} */
    get v7Support() { return false; } // 如果没有特殊说明，这条规则只支持旧版（v6）微博
    render(...args) {
      const node = super.render(...args);
      node.classList.add('yawf-config-rule');
      if (!this.v7Support) {
        node.classList.add('yawf-config-rule-unsupport');
      }
      return node;
    }
    execute() {
      if (!this.v7Support) return;
      const enabled = this.isEnabled();
      try {
        const styles = [];
        if (typeof this.css === 'string') styles.push(this.css);
        if (typeof this.css === 'function') styles.push(this.css());
        if (enabled) {
          if (typeof this.acss === 'string') styles.push(this.acss);
          if (typeof this.acss === 'function') styles.push(this.acss());
        }
        if (styles.length) rule.style.append(styles.join('\n'));
        if (typeof this.init === 'function') this.init();
        if (enabled) {
          if (typeof this.ainit === 'function') this.ainit();
        }
      } catch (e) {
        util.debug('Error while execute rule %o: %o', this, e);
      }
    }
  }
  rule.class.Rule = Rule;
  rule.Rule = function (item) {
    const result = new Rule(item);
    if (rule.inited) result.execute();
    return result;
  };

  /**
   * 设置中的一个纯文本项，这个设置项没有复选框
   * 继承自有复选框的设置项，此时认为该复选框是总被选中的
   */
  class Text extends Rule {
    constructor(item) {
      super(item);
      this.always = true;
    }
    render(...args) {
      const node = super.render(...args);
      node.classList.add('yawf-config-text');
      return node;
    }
  }
  rule.Text = function (item) {
    return new Text(item);
  };
  rule.class.Text = Text;

  /**
   * 从所有设置项中根据条件筛选出一些设置项
   * 之后可用于展示对话框等操作
   * @param {{ base: Tab[], filter: (rule: Rule) => boolean }} base 描述搜索范围
   */
  rule.query = function ({
    base = tabs,
    filter = null,
    includeHidden = false,
  } = {}) {
    const result = new Set();
    ; (function query(items) {
      items.forEach(item => {
        if (item.hidden && !includeHidden) return;
        if (item.disabled) return;
        if (item instanceof Tab || item instanceof Group) {
          query(item.children);
        }
        if (!(item instanceof Rule)) return;
        if (filter && !filter(item)) return;
        result.add(item);
      });
    }(base));
    return [...result];
  };

  rule.inited = false;
  rule.init = function () {
    rule.style = css.add('');
    rule.inited = true;
    rule.query({ includeHidden: true }).forEach(rule => rule.execute());
  };

  init.onReady(() => {
    rule.init();
  }, { priority: priority.DEFAULT });

  css.append(`
label:hover .yawf-config-checkbox-wrap .yawf-config-checkbox-icon,
.yawf-config-checkbox-wrap:hover .yawf-config-checkbox-icon { border-color: var(--w-checkbox-check-color); }
.yawf-config-checkbox-wrap { display: inline-block; position: relative; width: var(--w-checkbox-size); height: var(--w-checkbox-size); overflow: hidden; margin-right: 4px; vertical-align: baseline; }
.yawf-config-checkbox { position: absolute; left: -100px; }
.yawf-config-checkbox-icon { border: 1px solid var(--w-checkbox-border); color: var(--w-checkbox-check-color); }
.yawf-config-checkbox-icon { position: absolute; top: 0; left: 0; right: 0; bottom: 0; }
.yawf-config-checkbox-icon svg { position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; }
.yawf-config-checkbox:not(:checked) ~ .yawf-config-checkbox-icon svg { display: none; }

.yawf-config-group { display: block; font-weight: bold; margin: 15px 10px 5px; }
.yawf-config-rule { display: block; margin: 5px 20px; }
.yawf-config-rule-unsupport { display: none; }
.yawf-bubble .yawf-config-rule { display: inline; margin: 0; }
.yawf-config-rule > label + label { margin-left: 8px; }
.yawf-config-rule > br + label { margin-left: 20px; }
.yawf-bubble-icon { vertical-align: middle; margin-left: 2px; margin-right: 2px; display: inline; }
.yawf-bubble-text .yawf-bubble-icon { display: none; }
.yawf-config-select { height: 20px; }
.yawf-config-number input[type="number"] { width: 45px; box-sizing: border-box; }
.yawf-config-range { position: relative; }
.yawf-config-range-wrap { display: none; position: absolute; left: 0; right: 0; margin: 0; bottom: calc(100% + 2px); height: 80px; background: #f0f0f0; background: Menu; }
.yawf-config-range:focus-within .yawf-config-range-wrap { display: block; }
.yawf-config-range input[type="range"] { position: absolute; top: 0; bottom: 0; margin: auto; width: 75px; right: -20px; left: -20px; transform: rotate(-90deg); }
.yawf-config-color input[type="color"] { width: 45px; box-sizing: border-box; height: 20px; vertical-align: middle; }
.yawf-config-text textarea { width: 100%; min-height: 120px; resize: vertical; padding-left: var(--w-input-indent); padding-right: var(--w-input-indent); }
.yawf-config-collection-submit,
.yawf-config-key button { padding: 4px 16px; margin: 0 4px; vertical-align: bottom; }
.yawf-config-collection-list { display: block; margin: 5px; padding: 0; }
.yawf-config-collection-list .yawf-config-collection-item { padding: 0 5px 0 20px; min-width: 0; height: 20px; overflow: hidden; text-overflow: ellipsis; cursor: default; display: inline-block; position: relative; margin-left: 8px; border: 1px solid var(--w-b-line-primary-border); }
.yawf-config-collection-remove { display: block; position: absolute; top: 2px; left: 0; display: flow-root; width: 20px; height: 20px; line-height: 20px; text-align: center; cursor: pointer; }
.yawf-config-collection-item-content { max-width: 500px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
.yawf-config-collection-user-id .yawf-config-collection-list { margin-left: -5px; }
.yawf-config-collection-user-id .yawf-config-collection-item { width: 90px; height: 50px; padding: 1px 20px 1px 56px; text-align: left; }
.yawf-config-collection-user-id .yawf-config-collection-remove { right: 0; left: auto; text-align: center; }
.yawf-config-collection-user-id .yawf-config-collection-remove a { position: static; margin: 0; }
.yawf-config-collection-user-id .yawf-config-user-avatar { position: absolute; left: 1px; top: 1px; width: 50px; height: 50px; overflow: hidden; }
.yawf-config-collection-user-id .yawf-config-user-avatar-img { width: 50px; height: 50px; }
.yawf-config-collection-user-id .yawf-config-user-name { max-width: 100%; word-break: break-all; white-space: normal; max-height: 40px; overflow: hidden; }
.yawf-collection-suggestion.yawf-collection-suggestion { z-index: 10000; position: fixed; background: var(--w-card-background); border: 1px solid var(--w-layer-border); border-radius: var(--w-layer-radius); }
.yawf-collection-suggestion-list { margin: 0; padding: 10px 0; list-style: none; }
.yawf-list-suggestion-item { line-height: 20px; padding: 5px 10px; }
.yawf-list-suggestion-item.yawf-current { line-height: 20px; padding: 5px 10px; background: var(--w-pop-item-hover); }
.yawf-list-suggestion-item a { min-height: 15.6px; color: inherit; text-decoration: none; }
.yawf-config-item .woo-input-wrap { height: 20px; line-height: 20px; --w-input-height: 20px; box-sizing: content-box; margin-left: 4px; margin-right: 4px; }
.yawf-config-item .woo-input-wrap.woo-input-text { height: auto; width: 100%; box-sizing: border-box; }
.yawf-config-item .woo-input-wrap input,
.yawf-config-item .woo-input-wrap select { vertical-align: bottom; }
.yawf-config-item .yawf-config-select .woo-input-wrap { padding-right: 36px; position: relative; }
.yawf-config-item .yawf-config-select .woo-input-wrap::before { content: " "; display: block; width: 0; height: 0; border-top: 4px solid currentColor; border-left: 4px solid transparent; border-right: 4px solid transparent; position: absolute; right: 14px; top: calc(50% - 2px); }
.yawf-config-text .woo-input-wrap { width: 520px; height: auto; padding: 0; }
.yawf-config-item .woo-input-main { background: inherit; }
.yawf-config-item .woo-input-wrap select { margin-left: -12px; padding-left: 12px; margin-right: -36px; padding-right: 36px; width: auto; }
`);

}());
//#endregion
//#region @require yaofang://content/ruleset/observer.js
/**
 * 这个文件用于检查页面中是否有新元素添加或元素变化，并自动触发各类回调
 * 由于微博会频繁更新界面上显示的日期（××分钟前）文本，
 *   这里特别过滤掉了日期显示的相关变化，如果仅包括此类变化则不触发回调
 * yawf.observer.dom.add(callback: Function) 添加一个回调
 * yawf.observer.dom.remove(callback: Function) 取消一个回调
 */
; (function () {

  const yawf = window.yawf;

  const util = yawf.util;
  const init = yawf.init;

  const observer = yawf.observer = yawf.observer ?? {};
  observer.dom = {};

  const priority = util.priority;
  const performance = util.performance;

  /** @type {Array<Function>} */
  const callbacks = [];

  /**
   * 当页面有任何变化时回调
   * @param {Function} callback
   */
  observer.dom.add = function (callback) {
    callbacks.push(callback);
    return callback;
  };

  /**
   * 移除之前添加的回调
   * @param {Function} callback
   */
  observer.dom.remove = function (callback) {
    let found = false;
    while (true) {
      const index = callbacks.findIndex(item => item === callback);
      if (index === -1) return found;
      callbacks.splice(index, 1);
      found = true;
    }
  };

  const act = function () {
    callbacks.forEach(callback => {
      try {
        performance(callback);
      } catch (e) {
        util.debug('Error while handling mutation callback: %o %o', callback, e);
      }
    });
  };

  /** @type {boolean?} */
  let status = null;
  /** @type {MutationCallback} */
  const onMutation = function (mutation) {
    if (mutation && mutation.every(function isDate(x) {
      let target = x.target;
      return target.hasAttribute('date') || target.hasAttribute('yawf-date');
    })) return;
    if (status === false) status = true;
    if (status !== null) return;
    act(); status = false;
    setTimeout(function () {
      if (status === true) act();
      status = null;
    }, 100);
  };

  const observe = function () {
    onMutation();
    (new MutationObserver(onMutation))
      .observe(document.body, { childList: true, subtree: true });
  };

  init.onLoad(function () {
    observe();
  }, { priority: priority.LAST + priority.AFTER * 2 });

}());
//#endregion
//#region @require yaofang://content/ruleset/filter.js
/**
 * 这个文件用于自动检查页面中出现的微博和评论，并触发过滤规则
 * 涉及函数包括
 *   yawf.observer.<type>.<action>
 * <type>: feed / comment 处理微博 / 评论
 * <action>:
 *   add(rule: feed => string, { priority: number }): 添加一个规则
 *   onBefore(callback: feed => Promise?)
 *   onAfter(callback: feed => Promise?, result)
 *   onFinally(callback: feed => Promise?, result)
 *   onDone()
 */
; (function () {

  const yawf = window.yawf;

  const util = yawf.util;
  const init = yawf.init;
  const observer = yawf.observer;

  const priority = util.priority;
  const css = util.css;
  const strings = util.strings;

  /**
   * 用于收集针对微博或评论的过滤规则，并根据优先级逐一检查
   */
  class FilterCollection {
    constructor() {
      /** @type {Array<{ priority: number, filter: Function}>} */
      this.filters = [];
    }
    /**
     * @param {Function} filter
     * @param {number} priority
     */
    add(filter, priority = 0) {
      this.filters.push({ filter, priority });
      this.filters.sort((x, y) => y.priority - x.priority);
    }
    async filter(...params) {
      for (const { filter } of this.filters) {
        try {
          let ret = filter(...params);
          if (ret && !ret.result && typeof ret.then === 'function') {
            ret = await Promise.resolve(ret);
          }
          if (typeof ret === 'string') ret = { result: ret };
          if (!ret || !ret.result) continue;
          const { result, reason = null } = ret;
          return { result: result + '', reason: reason + '', filter };
        } catch (e) {
          util.debug('Exception while parsing rule %o:\nparams: %o\nexception: %o\n%o', filter, params, e, e.stack);
        }
      }
      return { result: null };
    }
  }

  /**
   * 在发现一条新的需要过滤的微博或评论时，会依次调用：
   *   1. onBefore(feed)
   *   2. 逐个调用过滤规则
   *   3. 如果过滤规则表明未被隐藏 onAfter(feed, { result, reason })
   *   4. onFinally(feed, { result, reason })
   * 所有元素完成处理时调用 onDone
   * 所有回调如果返回 Promise，则会等待 Promise 结束再进入下一阶段
   */
  class FilterObserver {
    constructor() {
      this.before = [];
      this.after = [];
      this.finally = [];
      this.done = [];
      this.filters = new FilterCollection();
      this.pending = [];
      this.busy = null;
      this.resolve = null;
    }
    filter(filter, { priority = 0 } = {}) {
      this.filters.add(filter, priority);
    }
    /** @param {Array<Function>} callbacks */
    async invokeCallbacks(callbacks, ...args) {
      await Promise.all(callbacks.map(callback => (
        new Promise(async resolve => {
          try {
            await Promise.resolve(callback(...args));
          } catch (e) {
            util.debug('Error while filter callback: %o %o', callback, e);
          }
          resolve();
        })
      )));
    }
    async active(items) {
      this.pending.push(...items);
      if (this.busy) {
        await this.busy;
        return;
      }
      let resolve = null;
      this.busy = new Promise(r => { resolve = r; });
      while (this.pending.length) {
        while (this.pending.length) {
          const item = this.pending.shift();
          await this.invokeCallbacks(this.before, item);
          const result = await this.filters.filter(item);
          const callAfter = this.apply(item, result);
          if (callAfter) {
            await this.invokeCallbacks(this.after, item, result);
          }
          await this.invokeCallbacks(this.finally, item, result);
          await new Promise(resolve => setTimeout(resolve, 0));
        }
        await this.invokeCallbacks(this.done);
      }
      this.busy = null;
      resolve();
    }
    async rerun() {
      const lastRerun = this.lastRerun = {};
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (this.lastRerun !== lastRerun) return;
      this.reapply();
    }
    onBefore(callback) { this.before.push(callback); }
    onAfter(callback) { this.after.push(callback); }
    onFinally(callback) { this.finally.push(callback); }
    onDone(callback) { this.done.push(callback); }
  }

  /**
   * 针对微博的过滤规则
   * 对应脚本版 observer.weibo.*
   */
  observer.feed = new FilterObserver();

  /**
   * 我懒得查找依赖关系了，其实这个已经没用了
   */
  observer.comment = new FilterObserver();

  const hideFeedCss = css.add(`
article[class*="Feed"]:not(.yawf-feed-filter) > *,
article[class*="Feed"].yawf-feed-filter-loading > *,
article[class*="Feed"].yawf-feed-filter-running > * { visibility: hidden; }
article[class*="Feed"]:not(.yawf-feed-filter)::before,
article[class*="Feed"].yawf-feed-filter-loading::before,
article[class*="Feed"].yawf-feed-filter-running::before { content: " "; display: block; position: absolute; left: 100px; right: 100px; top: 50%; height: 140px; max-height: calc(100% - 20px); transform: translateY(-50%); background-image: repeating-linear-gradient(to bottom, transparent 0 20px, var(--w-panel-background) 20px 60px), linear-gradient(to right, var(--w-main) 40%, transparent 50%, var(--w-main) 60%); animation: yawf-feed-filter-running 2s 1s linear infinite; background-size: 200% 100%; background-repeat: repeat; opacity: 0.1; } 
@keyframes yawf-feed-filter-running { 0% { background-position: 120%; } 100% { background-position: -20%; } }
.yawf-resize-sensor,
.yawf-resize-sensor-expand,
.yawf-resize-sensor-shrink { position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden; z-index: -1; visibility: hidden; }
.yawf-resize-sensor-expand .yawf-resize-sensor-child { width: 10000000px; height: 10000000px; }
.yawf-resize-sensor-shrink .yawf-resize-sensor-child { width: 200%; height: 200%; }
.yawf-resize-sensor-child { position: absolute; top: 0; left: 0; transition: 0s; }
`);

  init.onDeinit(() => {
    hideFeedCss.remove();
  });

  init.onLoad(function () {
    /*
     * 微博表示 Feed 的结构体很奇妙
     * 它的 idstr 属性，是个 string，是当前微博的 mid，也可能是快转的原微博 id
     * 它的 id 属性，大部分情况下是个 number，表示当前微博的 mid，偶尔是个字符串，表示快转微博的当前 id
     * 它的 mid 属性，是个 string，是 id 属性的字符串形式
     * 它的 mblogid 是 62 进制换算后的 idstr
     */

    const randStr = strings.randKey();
    const key = `yawf_feedFilter_${randStr}`;

    // 当有一条完成过滤规则判断时，交给页面脚本处理
    observer.feed.apply = function (data, { result, filter = null, reason = null }) {
      const mid = data.mid, runIndex = data._yawf_FilterRunIndex;
      const event = new CustomEvent(key, {
        detail: JSON.stringify({ action: 'result', mid, runIndex, result: { result: result ?? 'unset', reason } }),
      });
      document.documentElement.dispatchEvent(event);
      if (result) util.debug('Feed filter %o -> %o by %o due to %o', data, result, filter, reason);
      if (result === 'hide') return false;
      return true;
    };
    // 如果需要重新触发过滤规则，那么让页面脚本重新触发一次
    observer.feed.reapply = function () {
      const event = new CustomEvent(key, { detail: JSON.stringify({ action: 'rerun' }) });
      document.documentElement.dispatchEvent(event);
    };
    // 当页面脚本检测到一条需要过滤的微博时，提交过滤
    window.addEventListener(key, function (event) {
      const detail = JSON.parse(event.detail);
      if (detail.action === 'trigger') {
        observer.feed.active([detail.data]);
      }
    }, true);
    util.inject(function (rootKey, key) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      // 展开微博正文
      const longContentExpandForDetail = async function (vm, feedDetail) {
        if (!feedDetail?.isLongText) return;
        if (feedDetail.longTextContent_raw) return;
        if ([true, false].includes(feedDetail._yawf_LongTextContentLoading)) return;
        vm.$set(feedDetail, '_yawf_LongTextContentLoading', true);
        vm.$set(feedDetail, 'longTextContent_raw', null);
        vm.$set(feedDetail, 'longTextContent', null);
        try {
          const resp = await vm.$http.get('/ajax/statuses/longtext', {
            params: { id: feedDetail.idstr },
          });
          if (!resp.data || !resp.data.ok || !resp.data.data) return;
          const data = resp.data.data;
          if (data?.longTextContent) {
            feedDetail.longTextContent_raw = data.longTextContent;
            if (data.url_struct) feedDetail.url_struct = data.url_struct;
            if (data.topic_struct) feedDetail.topic_struct = data.topic_struct;
          }
        } catch (e) {
          console.error('Error while fetching long text', e);
        }
        feedDetail._yawf_LongTextContentLoading = false;
      };
      const longContentExpand = async function (vm, feed) {
        for (let retry = 0; retry < 3; retry++) {
          try {
            await longContentExpandForDetail(vm, feed);
            await longContentExpandForDetail(vm, feed.retweeted_status);
            return true;
          } catch (_ignore) {
            await new Promise(resolve => setTimeout(resolve, 1e3));
          }
        }
        return false;
      };
      // 触发过滤并等待过滤结果回来
      const pendingFeeds = new Map();
      const triggerFilter = function (vm, feed) {
        const runIndex = feed._yawf_FilterRunIndex;
        feed._yawf_FilterStatus = 'running';
        return new Promise(resolve => {
          const cleanUp = function () {
            pendingFeeds.delete(runIndex);
            resolve({});
            vm.$off('hook:beforeDestroy', cleanUp);
          };
          vm.$once('hook:beforeDestroy', cleanUp);
          const handleFilterResult = function ({ result, reason }) {
            pendingFeeds.delete(runIndex);
            vm.$off('hook:beforeDestroy', cleanUp);
            feed._yawf_FilterStatus = result;
            feed._yawf_FilterReason = reason;
            resolve({ result, reason });
          };
          pendingFeeds.set(runIndex, handleFilterResult);
          const event = new CustomEvent(key, {
            detail: JSON.stringify({ action: 'trigger', runIndex, data: feed }),
          });
          document.documentElement.dispatchEvent(event);
        });
      };
      // 处理过滤结果
      const applyFilterResult = function (vm, feed, { result, reason }) {
        if (result === 'hide') {
          const index = vm.data.indexOf(feed);
          vm.data.splice(index, 1);
        }
      };
      vueSetup.eachComponentVM('feed', function (vm) {
        const feedScroll = vueSetup.closest(vm, 'feed-scroll');

        // 在渲染一条 feed 时，额外插入过滤状态的标识
        vueSetup.transformComponentRender(vm, function (nodeStruct, Nodes) {
          const { vNode, addClass } = Nodes;

          // 如果某个 feed 不在 feed-scroll 里面
          // 那么我们不会把它就这么给隐藏起来
          const underFilter = feedScroll != null && this.data.mid > 0;

          const feed = nodeStruct;
          const vnode = vNode(feed);

          if (!vnode.key && this.data.mid) {
            vnode.key = 'yawf-feed-' + this.data.mid;
            if (this.data.ori_mid) {
              vnode.key = 'yawf-feed-' + this.data.mid + '-' + this.data.ori_mid;
            } else {
              vnode.key = 'yawf-feed-' + this.data.mid;
            }
          }

          addClass(feed, 'yawf-feed-filter');
          if (underFilter) {
            addClass(feed, `yawf-feed-filter-${this.data._yawf_FilterStatus || 'loading'}`);
          } else {
            addClass(feed, 'yawf-feed-filter-ignore');
          }

          if (this.data.mid) {
            vnode.data.attrs['data-feed-author-name'] = this.data.user.screen_name;
            vnode.data.attrs['data-feed-mid'] = this.data.mid;
            if (this.data.retweeted_status) {
              vnode.data.attrs['data-feed-omid'] = this.data.retweeted_status.mid;
            }
            if (this.data.ori_mid) {
              vnode.data.attrs['data-feed-fmid'] = this.data.idstr;
            }
            if (this.data._yawf_FilterReason) {
              vnode.data.attrs['data-yawf-filter-reason'] = this.data._yawf_FilterReason;
            }
          }
          return vnode;
        });
        vm.$forceUpdate();
      });
      let heightIndex = 0;
      vueSetup.eachComponentVM('scroll', function (vm) {
        const wrapRaf = function (f) {
          let dirty = false;
          return function () {
            if (dirty) return;
            dirty = true;
            requestAnimationFrame(function () {
              dirty = false;
              f();
            });
          };
        };
        // vm.__proto__.sizeDependencies 里面存的是原本关心的属性
        // 那个没什么统一的好办法给改过来，但是我们可以在 vm 自己身上设置这个属性来覆盖它
        // 因为设置的这个属性我们并不期望以后还有变化，所以我们不需要让它过 Vue 的生命周期 $forceUpdate 就是了
        Object.defineProperty(vm, 'sizeDependencies', { value: ['_yawf_Height'], configurable: true, enumerable: true, writable: true });
        const sensorPrefix = 'yawf_resize_sensor_element_';
        const getItemFromSensor = sensor => {
          if (!sensor?.id) return null;
          const index = Number.parseInt(sensor.id.slice(sensorPrefix.length), 10);
          // 在有微博被隐藏后，微博相对的索引会发生变化
          // 无法依赖微博的索引确定对应的微博
          // 所以我们不用 vm.data[index] 而只能这样找一遍
          const item = vm?.data?.find?.(item => item._yawf_HeightIndex === index);
          return item;
        };
        const observer = new ResizeObserver(entries => {
          entries.forEach(entry => {
            const { target } = entry;
            const item = getItemFromSensor(target);
            if (item) item._yawf_Height = target.clientHeight;
          });
        });
        // 如果可以把 sensor 做成组件的话，其实只要 mount 时处理一下就行了，不过这里是没办法
        const updateSensor = wrapRaf(function () {
          const allSensor = Object.keys(vm.$refs).filter(key => key.startsWith(sensorPrefix));
          allSensor.map(key => Number.parseInt(key.slice(sensorPrefix.length), 10)).forEach(index => {
            const container = vm.$refs[sensorPrefix + index];
            if (!container) return;
            observer.observe(container);
            const item = getItemFromSensor(container);
            if (item) item._yawf_Height = container.clientHeight;
          });
        });
        vm.$scopedSlots.content = (function (content) {
          return function (data) {
            const createElement = vm._self._c, h = createElement;
            const raw = content.call(this, data);
            // 给每个元素一个唯一的标识用于对应高度检测器
            // 我们没办法用现成的 mid 或 comment_id，因为我们并不知道元素是什么类型
            // 元素有可能是 feed，但也有可能是其他任何东西
            if (!data.item._yawf_HeightIndex) {
              data.item._yawf_HeightIndex = ++heightIndex;
            }
            const index = data.item._yawf_HeightIndex;
            const resizeSensor = h('div', {
              class: 'yawf-resize-sensor',
              ref: sensorPrefix + index,
              key: sensorPrefix + index,
              attrs: { id: sensorPrefix + index },
            });
            const result = Array.isArray(raw) ? raw : [raw];
            result.push(resizeSensor);
            updateSensor();
            return result;
          };
        }(vm.$scopedSlots.content));
        vm.$watch(function () { return this.data; }, function () {
          if (!Array.isArray(vm.data)) return;
          vm.data.forEach(item => {
            const descriptor = Object.getOwnPropertyDescriptor(item, '_yawf_Height');
            if (!descriptor) {
              vm.$set(item, '_yawf_Height', 0);
            } else if (!descriptor.set) {
              const size = vm._yawf_Height;
              delete vm._yawf_Height;
              vm.$set(item, '_yawf_Height', size);
            }
          });
        });
        vm.$forceUpdate();
      });
      window.addEventListener(key, function (event) {
        const detail = JSON.parse(event.detail);
        if (detail.action === 'rerun') {
          // 对现有的元素再来一次
          vueSetup.eachComponentVM('feed-scroll', function (vm) {
            [...vm.data].forEach(async feed => {
              if (['loading', 'running'].includes(feed._yawf_FilterStatus)) return;
              const { result, reason } = await triggerFilter(vm, feed);
              applyFilterResult(vm, feed, { result, reason });
            });
          }, { watch: false });
        } else if (detail.action === 'result') {
          // 应用过滤结果
          const runIndex = detail.runIndex;
          const handler = pendingFeeds.get(runIndex);
          if (handler) handler(detail.result);
        }
      }, true);
      let runIndex = 0;
      const seenFeeds = new WeakMap();
      const onBeforeUpdate = function () {
        const vm = this;
        if (!Array.isArray(vm.data)) return;
        vm.data.forEach(async feed => {
          if (seenFeeds.has(feed)) return;
          if (!(feed.mid > 0)) return;
          try {
            const id = runIndex++;
            vm.$set(feed, '_yawf_FilterStatus', 'loading');
            vm.$set(feed, '_yawf_FilterReason', null);
            vm.$set(feed, '_yawf_FilterApply', true);
            vm.$set(feed, '_yawf_FilterRunIndex', id);
            seenFeeds.set(feed, id);
            await longContentExpand(vm, feed);
            const { result, reason } = await triggerFilter(vm, feed);
            if (Array.isArray(vm.data) && vm.data.includes(feed)) {
              applyFilterResult(vm, feed, { result, reason });
            }
          } catch (e) {
            util.debug('Error while filter feed %o', feed);
            applyFilterResult(vm, feed, {});
          }
        });
      };
      vueSetup.eachComponentVM('feed-scroll', function (vm) {
        vm.$options.beforeUpdate.push(onBeforeUpdate);
        onBeforeUpdate();
      });
    }, util.inject.rootKey, key);
  }, { priority: priority.LAST });

}());

; (function () {
  const yawf = window.yawf;

  const util = yawf.util;
  const init = yawf.init;
  const observer = yawf.observer;

  const priority = util.priority;
  const css = util.css;
  const strings = util.strings;

  init.onLoad(function () {
    const configs = {
      text: {
        show: yawf.rules.comment.text.show.ref.items.getConfig(),
        hide: yawf.rules.comment.text.hide.ref.items.getConfig(),
      },
      regex: {
        show: yawf.rules.comment.regex.show.ref.items.getConfigCompiled(),
        hide: yawf.rules.comment.regex.hide.ref.items.getConfigCompiled(),
      },
      user: {
        show: yawf.rules.comment.name.show.ref.items.getConfig(),
        hide: yawf.rules.comment.name.hide.ref.items.getConfig(),
      },
      more: {
        bot: yawf.rules.comment.more.commentByBot.getConfig(),
      }
    };
    util.inject(function (rootKey, configs) {
      console.log(configs);
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;
      const matchText = (comment, textList) => (
        textList.some(text => comment.text_raw.includes(text))
      );
      const matchRegex = (comment, regexList) => (
        regexList.some(regex => regex.test(comment.text_raw))
      );
      const matchUser = (comment, nameList) => (
        nameList.some(name => (comment.screen_name === name ||
          comment.text.includes(`<a href=/n/${name} `)))
      );
      const matchBot = comment => (
        comment.analysis_extra?.includes('ai_type')
      );
      const filterComment = function (comment) {
        try {
          const isShow = (
            matchText(comment, configs.text.show) ||
            matchRegex(comment, configs.regex.show) ||
            matchUser(comment, configs.user.show) ||
          false);
          if (isShow) return 'show';
          const isHide = (
            matchText(comment, configs.text.hide) ||
            matchRegex(comment, configs.regex.hide) ||
            matchUser(comment, configs.user.hide) ||
            configs.more.bot && matchBot(comment) ||
          false);
          if (isHide) {
            console.log('Comment %o hidden', comment.idstr);
            return 'hide';
          }
          return null;
        } catch (error) {
          console.error('Error while filte comment: %o', error);
          return null;
        }
      };
      const handleCommentSubList = function (sublist) {
        for (let index2 = 0; index2 < sublist.length;) {
          const result2 = filterComment(sublist[index2]);
          if (result2 === 'hide') {
            sublist.splice(index2, 1);
            continue;
          }
          index2++;
        }
      };
      const handleCommentList = function (list) {
        for (let index1 = 0; index1 < list.length;) {
          const result = filterComment(list[index1]);
          if (result === 'hide') {
            list.splice(index1, 1);
            continue;
          }
          const sublist = list[index1].comments;
          if (sublist) {
            handleCommentSubList(sublist);
          }
          index1++;
        }
      };
      vueSetup.eachComponentVM('repost-coment-list', vm => {
        vm.$watch('list', handleCommentList, { immediate: true, deep: true })
      });
      vueSetup.eachComponentVM('feed', vm => {
        if (!vm.data.rcList) return;
        vm.$watch('data.rcList', rcList => {
          handleCommentList(rcList);
        }, { immediate: true, deep: true });
      });
      vueSetup.eachComponentVM('reply-modal', vm => {
        if (!vm.rootComment) return;
        vm.$watch('rootComment', rootComment => {
          handleCommentList([rootComment]);
        }, { immediate: true, deep: true });
        vm.$watch('list', list => {
          handleCommentSubList(list);
        }, { immediate: true, deep: true });
      });
    }, util.inject.rootKey, configs);
  }, { priority: priority.LAST });
}())
//#endregion
//#region @require yaofang://content/ruleset/dialog.js
/**
 * 这个文件用于显示一个显示了若干条规则的对话框
 */
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const ui = util.ui;
  const i18n = util.i18n;
  const css = util.css;

  const rule = yawf.rule;
  const tabs = rule.tabs;

  Object.assign(i18n, {
    configDialogTitle: {
      cn: '设置 - 药方 (YAWF)',
      tw: '設定 - 藥方 (YAWF)',
      en: 'Settings - YAWF (Yet Another Weibo Filter)',
    },
    searchEmptyInput: { cn: '键入以搜索设置项', tw: '鍵入以搜尋設定項', en: 'Type to search settings' },
    searchEmptyResult: { cn: '未找到与您输入匹配的设置项', tw: '未找到與您輸入匹配的設置項', en: 'No Matched Settings' },
  });

  /** @type {{ [e: string]: () => HTMLElement }} */
  const configDom = {};
  configDom.left = () => {
    const container = document.createElement('div');
    container.innerHTML = '<div class="yawf-config-header"><ul class="woo-box-flex woo-tab-nav"></ul></div>';
    return container.removeChild(container.firstChild);
  };
  configDom.search = () => {
    const container = document.createElement('ul');
    container.innerHTML = '<li class="woo-tab-item-main yawf-config-tab yawf-config-tab-search"><label><input id="yawf-config-search" class="woo-input-main yawf-config-search" type="search"><i data-v-2621="" class="woo-font icon woo-font--search yawf-config-search-logo"></i></label></li>';
    return container.removeChild(container.firstChild);
  };
  configDom.item = title => {
    const container = document.createElement('ul');
    container.innerHTML = '<li class="woo-tab-item-main yawf-config-tab"><button></button></li>';
    const text = container.querySelector('button');
    text.appendChild(title);
    return container.removeChild(container.firstChild);
  };
  configDom.right = () => {
    const container = document.createElement('div');
    container.innerHTML = '<div class="yawf-config-body yawf-window-body"></div>';
    return container.removeChild(container.firstChild);
  };
  configDom.layer = () => {
    const container = document.createElement('div');
    container.innerHTML = '<div class="yawf-config-layer"></div>';
    return container.removeChild(container.firstChild);
  };

  const renderTip = (layer, text) => {
    layer.innerHTML = '<div class="woo-tip-main woo-tip-vertical yawf-empty-tip"><span class="woo-tip-icon woo-tip-warnFill yawf-empty-tip-icon"></span><span class="woo-tip-text yawf-tip-text"></p></div>';
    layer.querySelector('.woo-tip-icon').appendChild(ui.icon('warn').documentElement).setAttribute('class', 'woo-tip-icon');
    layer.querySelector('.yawf-tip-text').textContent = text;
  };

  const renderSearch = (layer, input, filter) => {
    const searchTexts = (input.match(/\S+/g) || []).filter(x => !x.includes(':')).map(t => t.toUpperCase());
    const [_verMatch, verOp, verNum] = input.match(/\bver(?:sion)?:([><]?=?)(\d+)\b/) || [];
    const versionTest = {
      '>': v => v > verNum,
      '<': v => v < verNum,
      '>=': v => v >= verNum,
      '<=': v => v <= verNum,
      '=': v => v === +verNum,
      '': v => v === +verNum,
    }[verOp] ?? (() => true);
    layer.innerHTML = '';
    if (!searchTexts.length && verNum == null) {
      renderTip(layer, i18n.searchEmptyInput);
      return;
    }
    const items = rule.query({
      filter: function (item) {
        if (!item.version) return false;
        if (!versionTest(item.version)) return false;
        if (typeof filter === 'function' && !filter(item)) return false;
        const text = item.text().toUpperCase();
        if (searchTexts.some(t => !text.includes(t))) return false;
        return true;
      },
    });
    if (items.length === 0) {
      renderTip(layer, i18n.searchEmptyResult);
      return;
    }
    render(layer, items);
  };

  /**
   * @param {Element} inner
   * @param {Array<Tab>} tabs
   */
  const renderTabs = function (inner, tabs, { initial = null, filter = null } = {}) {
    inner.classList.add('yawf-config-inner');
    const left = inner.appendChild(configDom.left());
    const right = inner.appendChild(configDom.right());

    // 后续移除这段
    const v7Tip = document.createElement('div');
    v7Tip.innerHTML = '<div class="tip woo-box-flex woo-box-alignCenter woo-box-justifyCenter woo-tip-main woo-tip-flat woo-tip-error" style="padding: 10px;"><span class="woo-tip-text">药方（YAWF）针对微博新版（V7）的支持正在开发中！目前绝大多数功能暂不支持新版！！欢迎到 <a href="https://github.com/tiansh/yaofang" target="_blank" rel="noopener">项目主页</a> 贡献代码！</span></div>';
    const text = v7Tip.querySelector('.woo-tip-text');
    text.parentElement.insertBefore(ui.icon('error').documentElement, text).setAttribute('style', 'width: 32px; height: 32px;');
    right.appendChild(v7Tip.firstChild);

    const tablist = left.querySelector('ul');
    const search = tablist.appendChild(configDom.search());
    const searchInput = search.querySelector('input');
    const renderTabs = tabs.filter(tab => tab.type === 'tab');
    /** @type {Element?} */
    let current = null;
    /** @type {WeakMap<Element, Function>} */
    const tabInit = new WeakMap();
    const tabLayer = renderTabs.map(tab => {
      const layer = right.appendChild(configDom.layer());
      return layer;
    });
    const hideAllLayer = function () {
      [...tabLayer, searchLayer].forEach(layer => {
        if (layer.style.display !== 'none') {
          layer.style.display = 'none';
        }
      });
    };
    const tabLeft = renderTabs.map((tab, index) => {
      const layer = tabLayer[index];
      const tabLeft = tablist.appendChild(configDom.item(tab.getRenderResult()));
      tabInit.set(tabLeft, () => {
        hideAllLayer();
        layer.innerHTML = '';
        render(layer, rule.query({ base: [tab], filter }));
        layer.style.display = 'block';
      });
      return tabLeft;
    });
    const searchLayer = right.appendChild(configDom.layer());
    searchLayer.classList.add('yawf-config-layer-search');
    tabInit.set(search, () => {
      hideAllLayer();
      searchLayer.innerHTML = '';
      renderSearch(searchLayer, searchInput.value, filter);
      searchLayer.style.display = 'block';
    });
    const setCurrent = tabLeft => {
      if (current === tabLeft) return;
      const currentClassName = 'woo-tab-active';
      if (current) current.classList.remove('yawf-current', currentClassName);
      current = tabLeft;
      tabLeft.classList.add('yawf-current', currentClassName);
      if (search !== tabLeft && searchInput.value) searchInput.value = '';
      tabInit.get(tabLeft)();
      right.scrollTo(0, 0);
    };
    // 自动选中目标选项卡，或第一个选项卡
    setCurrent(tabLeft[(initial && renderTabs.indexOf(initial) + 1 || 1) - 1]);
    left.addEventListener('click', event => {
      const tabLeft = event.target.closest('.yawf-config-tab');
      if (!tabLeft) return;
      if (tabLeft === search) return;
      setCurrent(tabLeft);
    });
    // 当在搜索框里面输入内容的时候，选中搜索框并刷新结果
    searchInput.addEventListener('input', event => {
      if (!searchInput.value && current !== search) return;
      if (current !== search) setCurrent(search);
      else tabInit.get(search)();
    });
  };

  const render = function (inner, items) {
    const groups = new Map();
    items.forEach(item => {
      if (!groups.has(item.parent)) {
        groups.set(item.parent, []);
      }
      groups.get(item.parent).push(item);
    });
    [...groups.entries()].forEach(([group, items]) => {
      try {
        inner.appendChild(group.getRenderResult());
        const container = document.createElement('div');
        container.classList.add('yawf-config-group-items');
        items.forEach(item => {
          let node = item.getRenderResult();
          container.appendChild(node);
        });
        inner.appendChild(container);
      } catch (e) {
        util.debug('Error while render config list:', e);
      }
    });
  };
  rule.render = render;

  rule.dialog = function (tab = null, filter = null) {
    try {
      ui.dialog({
        id: 'yawf-config',
        title: i18n.configDialogTitle,
        render: inner => {
          renderTabs(inner, tabs, { initial: tab, filter });
        },
        bar: true,
      }).show();
    } catch (e) { util.debug('Error while showing rule dialog %o', e); }
  };

  css.append(`
#yawf-config { width: 800px; font-size: 14px; }
#yawf-config .yawf-config-inner { padding: 0 0 0 160px; width: 640px; height: 480px; position: relative; }
#yawf-config .yawf-config-header { position: absolute; width: 160px; height: 480px; top: 0; left: 0; }
#yawf-config .yawf-config-header ul { height: 442px; width: 120px; overflow: hidden; padding: 20px 0 20px 40px; border-right: 10px solid var(--frame-background); }
#yawf-config .yawf-config-header li { display: block; width: 120px; height: 25px; line-height: 25px; }
#yawf-config .yawf-config-header li.yawf-current { box-shadow: -2px 0 var(--w-brand) inset; font-weight: bold; }
#yawf-config .yawf-config-header li:hover button { background: var(--w-hover) !important; border-radius: 15px; }
#yawf-config .yawf-config-header button,
#yawf-config .yawf-config-header label { width: 120px; padding: 0; border: none; background: none; position: relative; z-index: 1; }
#yawf-config .yawf-config-header button { color: inherit; outline: none; cursor: pointer; font: inherit; }
#yawf-config .yawf-config-header .yawf-config-search { appearance: none; background: none transparent; height: 25px; padding: 0 10px   0 30px; text-align: right; width: 80px; box-sizing: content-box; position: relative; z-index: 2; }
#yawf-config .yawf-config-search-logo { clear: both; display: block; float: left; left: 55px; position: relative; top: -18px; transition: left linear 0.2s; cursor: text; font-weight: normal; }
#yawf-config .yawf-config-header li.yawf-current .yawf-config-search-logo,
#yawf-config .yawf-config-search:focus ~ .yawf-config-search-logo { left: 15px; }
#yawf-config .yawf-config-body { padding: 10px 20px 20px; width: 600px; max-height: 450px; overflow: auto; position: relative; line-height: 20px; }
#yawf-config .yawf-config-layer { padding-bottom: 20px; min-height: 400px; }
#yawf-config .yawf-config-layer.yawf-current { display: block; }
#yawf-config .woo-dialog-main { width: 800px; max-width: none; padding: 0; overflow: hidden; }
#yawf-config .woo-dialog-title { margin-bottom: 0; }
#yawf-config .woo-tab-nav { margin: 0; flex-direction: column; }
#yawf-config .yawf-empty-tip { text-align: center; }
#yawf-config .yawf-empty-tip-icon { display: block; margin: 0 auto 20px; padding-top: 150px; }
`);

}());
//#endregion
//#region @require yaofang://content/ruleset/menu.js
; (function () {

  const yawf = window.yawf;

  const pagemenu = yawf.pagemenu = {};

  let containerResolve;
  const containerPromise = new Promise(resolve => {
    containerResolve = resolve;
  });

  let items = [];

  const line = function () {
    const ul = document.createElement('ul');
    ul.innerHTML = '<li class="line S_line1 yawf-config-menuline"></li>';
    return ul.firstChild;
  };

  pagemenu.add = async function ({ title, href = null, onClick, order = Infinity, section = 0 }) {
    const ul = await containerPromise;
    const li = document.createElement('li');
    li.innerHTML = '<a target="_top"></a>';
    const a = li.firstChild;
    a.href = href || 'javascript:void(0);';
    a.textContent = typeof title === 'function' ? title() : title;
    li.addEventListener('click', event => {
      if (!event.isTrusted) return;
      onClick(event);
    });
    const index = items.findIndex(item => item.section > section || item.section === section && item.order > order);
    if (index !== -1) ul.insertBefore(li, items[index].li);
    else ul.appendChild(li);
    if (index > 0 && items[index - 1].section === section) {
      if (li.previousSibling.matches('.line')) ul.removeChild(li.previousSibling);
    }
    if (index !== -1 && items[index].section !== section) {
      if (!li.nextSibling.matches('.line')) ul.insertBefore(line(), li.nextSibling);
    }
    items.splice(index, 0, { li, order, section });
    const setText = function (newText) {
      li.firstChild.textContent = typeof newText === 'function' ? newText() : newText;
    };
    return { dom: li, text: setText };
  };

  pagemenu.ready = function (ul) {
    containerResolve(ul);
  };

}());
//#endregion
//#region @require yaofang://content/rule/filter/common/feed.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const init = yawf.init;
  const rule = yawf.rule;
  const rules = yawf.rules;

  const ui = util.ui;
  const i18n = util.i18n;
  const css = util.css;

  const contextmenu = yawf.contextmenu;

  const fastHandlers = new Map();

  const feedCollectionBall = function (action) {
    return {
      render: function () {
        const span = document.createElement('span');
        span.classList.add('yawf-config-feed-ball');
        span.classList.add('yawf-config-feed-' + action);
        return span;
      },
    };
  };

  const groups = function ({
    baseClass: Base,
    tab: tabName,
    key,
    title,
    type,
    before: { hide: beforeHide = null, show: beforeShow = null } = {},
    details: { hide = null, show = null },
    fast = null,
    version,
  }) {
    const tab = rules[tabName];

    // 创建一个分组
    const group = tab[key] = {};
    group[key] = rule.Group({
      parent: tab[tabName],
      template: title,
    });

    const actions = [
      { action: 'show', details: show, before: beforeShow },
      { action: 'hide', details: hide, before: beforeHide },
    ].filter(item => item.details);

    actions.forEach(({ action, details: { title, priority = null }, before }) => {
      if (typeof before === 'function') before();
      group[action] = new Base({
        id: ['filter', tabName, key, action].join('_'),
        version,
        parent: group[key],
        priority: priority === null ? {
          show: 1e5,
          hide: 0,
        }[action] : priority,
        template: () => '{{ball}}' + title(),
        ref: {
          items: { type },
          ball: feedCollectionBall(action),
        },
        always: true,
        feedAction: action,
      });
    });

    if (fast) {
      const {
        types: [activeTypes, allTypes],
        radioGroup,
        render,
      } = fast;
      [
        ...activeTypes.map(type => ({ type, active: true })),
        ...allTypes.map(type => ({ type, active: false })),
      ].forEach(({ type, active }) => {
        const handler = {
          active,
          radioGroup,
          render,
          rules: actions.map(({ action }) => ({ action, rule: group[action] })),
        };
        if (!fastHandlers.has(type)) fastHandlers.set(type, []);
        fastHandlers.get(type).push(handler);
      });
    }
  };
  rule.groups = groups;

  css.append(`
.yawf-config-feed-ball { display: inline-block; width: 0.8em; height: 0.8em; border-radius: 1em; margin-right: 0.5em; border: 1px solid transparent; vertical-align: middle; background: var(--yawf-ball-color); box-shadow: 0 0 2px var(--yawf-ball-color); opacity: 0.8; }
.yawf-config-feed-show { --yawf-ball-color: #3ec63e; }
.yawf-config-feed-hide { --yawf-ball-color: #c63e3e; }
`);

  // 后面的都还没支持新版
  Object.assign(i18n, {
    fastAddDialogTitle: {
      cn: '创建过滤规则',
      tw: '創建篩選規則',
      en: 'Create Filter Rules',
    },
    fastAddDialogDescription: {
      cn: '请选择要创建的过滤规则',
      tw: '請選擇要創建的過濾規則',
      en: 'Select Filter Rules to Create',
    },
    fastAddShow: {
      cn: '显示',
      tw: '顯示',
      en: 'show',
    },
    fastAddHide: {
      cn: '隐藏',
      tw: '隱藏',
      en: 'hide',
    },
  });

  // 显示一个用于快速创建规则的对话框
  const askFast = function (selectedItems) {
    const items = [];
    const render = function (inner) {
      const container = document.createElement('div');
      container.classList.add('yawf-fast-add-body');
      const description = document.createElement('span');
      description.textContent = i18n.fastAddDialogDescription;
      container.appendChild(description);
      const ul = document.createElement('ul');
      ul.classList.add('yawf-fast-add-list');
      container.appendChild(ul);
      selectedItems.forEach(originalItem => {
        const handlers = fastHandlers.get(originalItem.type) ?? [];
        handlers.forEach(({ active, render, rules, radioGroup }) => {
          const item = JSON.parse(JSON.stringify(originalItem));
          items.push(item);
          const li = document.createElement('li');
          const label = document.createElement('label');
          li.appendChild(label);
          const checkbox = document.createElement('input');
          checkbox.type = 'checkbox';
          item.active = checkbox.checked = active;
          checkbox.addEventListener('input', () => {
            item.active = checkbox.checked;
            if (item.active && radioGroup) {
              items.forEach(thatItem => {
                if (thatItem === item) return;
                if (thatItem.radioGroup !== item.radioGroup) return;
                thatItem.setActive(false);
              });
            }
          });
          if (radioGroup) item.radioGroup = radioGroup;
          item.setActive = active => {
            item.active = checkbox.checked = active;
          };
          label.appendChild(checkbox);
          label.appendChild(render(item));
          const select = document.createElement('select');
          rules.forEach(({ action, rule }) => {
            const option = document.createElement('option');
            option.value = action;
            option.text = i18n[{
              show: 'fastAddShow',
              hide: 'fastAddHide',
            }[action]];
            select.appendChild(option);
          });
          li.appendChild(select);
          select.value = 'hide';
          item.getRule = () => rules.find(rule => rule.action === select.value).rule;
          ul.appendChild(li);
        });
      });
      container.addEventListener('input', event => {
        const target = event.target;
        if (!(target instanceof HTMLSelectElement)) return;
        Array.from(container.querySelectorAll('select')).forEach(select => {
          if (select.value === target.value) return;
          const targetOption = [...select.options].find(option => option.value === target.value);
          const setValue = targetOption ? targetOption.value : 'hide';
          select.value = setValue;
        });
      });
      inner.appendChild(container);
    };
    const fastAddDialog = ui.dialog({
      id: 'yawf-fast-add',
      title: i18n.fastAddDialogTitle,
      render,
      button: {
        ok: function () {
          fastAddDialog.hide();
          items.forEach(async ({ active, getRule, type, value }) => {
            if (!active) return;
            const { ref: { items: ruleItem } } = getRule();
            const parseResult = await ruleItem.parseFastItem(value, type);
            parseResult.forEach(item => ruleItem.addItem(item));
          });
        },
        cancel: function () {
          fastAddDialog.hide();
        },
      },
    });
    fastAddDialog.show();
  };

  /**
   * 维护用于快速创建规则的对话框
   * @type {Array<(target: Element | Selection) => Array<{ title: string, type: string, value: any }>>}
   */
  const fastListeners = [];
  rule.addFastListener = function (listener) {
    fastListeners.push(listener);
  };
  const runFastListeners = async function (target) {
    const responses = await Promise.all(fastListeners.map(listener => listener(target)));
    return responses.reduce((a, b) => a.concat(b), []);
  };

  /**
   * 用来维护所有和消息流过滤规则右键菜单
   */
  ; (async function () {

    if (!env.config.contextMenuSupported) return;

    contextmenu.addListener(async function (event) {
      if (init.page.type() === 'search') return null;
      const selection = window.getSelection();
      const target = event.target;
      let useSelection = true;
      if (!(selection + '')) useSelection = false;
      for (let i = 0; useSelection && i < selection.rangeCount; i++) {
        const range = selection.getRangeAt(i);
        const isChild = [range.startContainer, range.endContainer].every(e => {
          for (; e === target; e = e.parentNode) if (!e) return false;
          return true;
        });
        if (!isChild) useSelection = false;
      }
      const items = await runFastListeners(useSelection ? selection : target);
      return items.map(({ title, type, value }) => ({
        title,
        onclick: () => {
          askFast([{ type, value }]);
        },
      }));
    });

  }());

  /**
   * 拖拽相关
   */
  ; (async function () {

    Object.assign(i18n, {
      dropAreaTitle: {
        cn: '拖放至此\n快速创建过滤规则',
        tw: '拖放至此\n快速創建篩選規則',
        en: 'Drop Here\nCreate Filter Rules',
      },
      dropAreaContent: {
        cn: '您可以将文本、帐号名、头像、话题、来源等拖放至此处以创建过滤规则',
        tw: '您可以將文本、帳號名、頭像、話題、來源等拖放至此處以創建過濾規則',
        en: 'by dragging text, account names, avatars, topics, sources, etc.',
      },
    });

    const dragItems = [];
    const dropArea = document.createElement('div');
    let dragIndex = 0, inArea = false;
    const showDropArea = function () {
      dragIndex++;
      if (!dropArea) return;
      dropArea.classList.add('yawf-drag');
      if (dropArea.parentNode) dropArea.parentNode.classList.add('yawf-drop-area-active');
    };
    const hideDropArea = function () {
      dragIndex++;
      inArea = false;
      if (!dropArea) return;
      dropArea.classList.remove('yawf-drag', 'yawf-drag-in');
      if (dropArea.parentNode) dropArea.parentNode.classList.remove('yawf-drop-area-active');
    };
    const enterDropArea = function () {
      inArea = true;
      if (!dropArea) return;
      dropArea.classList.add('yawf-drag-in');
    };
    const leaveDropArea = function () {
      inArea = false;
      if (!dropArea) return;
      dropArea.classList.remove('yawf-drag-in');
    };

    const dragStartHandler = async function (event) {
      const selection = window.getSelection();
      const target = event.target;
      const currentDragIndex = ++dragIndex;
      let useSelection = false;
      if (target instanceof Text) useSelection = true;
      const items = await runFastListeners(useSelection ? selection : target);
      if (!items.length) return;
      if (currentDragIndex !== dragIndex) return;
      dragItems.splice(0);
      dragItems.push(...items);
      showDropArea();
    };
    const dragEndHandler = function () {
      dragItems.splice(0);
      hideDropArea();
    };
    let dragEnterCount = 0;
    const dragEnterHandler = function (event) {
      dragEnterCount++;
      enterDropArea();
      event.preventDefault();
    };
    const dragLeaveHandler = function (event) {
      if (!--dragEnterCount) leaveDropArea();
      event.preventDefault();
    };
    const dragOverHandler = function (event) {
      event.preventDefault();
    };
    const dropHandler = function (event) {
      event.preventDefault();
      if (inArea) {
        const items = dragItems.splice(0);
        askFast(items.map(({ type, value }) => ({ type, value })));
      }
      dragEndHandler();
    };
    document.addEventListener('dragstart', dragStartHandler);
    document.addEventListener('dragend', dragEndHandler);
    dropArea.addEventListener('dragenter', dragEnterHandler);
    dropArea.addEventListener('dragleave', dragLeaveHandler);
    dropArea.addEventListener('dragover', dragOverHandler);
    dropArea.addEventListener('drop', dropHandler);

    dropArea.classList.add('gn_topmenulist', 'yawf-drop-area');
    dropArea.innerHTML = '<div class="W_layer_arrow"><span class="W_arrow_bor W_arrow_bor_t"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div>';

    const dropAreaContent = document.createElement('div');
    dropAreaContent.classList.add('yawf-drop-content');
    dropArea.appendChild(dropAreaContent);
    dropAreaContent.innerHTML = '<div class="yawf-drop-title"></div><div class="yawf-drop-text"></div>';

    // 还没支持新版，我们先给他注释掉
    if (Math.E < 0) init.onLoad(function addDropArea() {
      const reference = document.querySelector('.yawf-gn_set_list');
      if (!reference) {
        setTimeout(addDropArea, 100);
        return;
      }
      dropAreaContent.querySelector('.yawf-drop-title').textContent = i18n.dropAreaTitle;
      dropAreaContent.querySelector('.yawf-drop-text').textContent = i18n.dropAreaContent;
      reference.appendChild(dropArea);
    });

  }());

  css.append(`
.yawf-fast-add-body { padding: 20px; }
.yawf-fast-add-list { padding: 20px; }
.yawf-drop-area { width: 224px; height: 224px; top: 34px; right: -119px; display: none; opacity: 0.8; }
.yawf-drop-area.yawf-drag { display: block; }
.yawf-drop-area.yawf-drag-in { opacity: 1; }
.WB_global_nav .gn_topmenulist.yawf-drop-area .W_layer_arrow .W_arrow_bor_t { right: 122px; }
.yawf-drop-content { margin: 20px; border: 5px dashed #666; border-radius: 20px; text-align: center; white-space: wrap; width: 134px; height: 134px; padding: 20px; margin: 20px; line-height: 1.5; }
.yawf-drop-title { font-size: 16px; font-weight: bold; white-space: pre-wrap; margin: 0 0 20px; user-select: none; }
.yawf-drop-area-active .gn_topmenulist_yawf { display: none; }
`);

}());
//#endregion
//#region @require yaofang://content/rule/filter/common/parse.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const dom = util.dom;

  const feedParser = yawf.feed = {};
  const commentParser = yawf.comment = {}; // eslint-disable-line no-unused-vars

  // 将时间格式化为东八区的 ISO 8601 串
  const date = function (dateStr) {
    const date = new Date(dateStr);
    date.setHours(date.getHours() + 8);
    if ((date.getUTCFullYear() + '').length !== 4) return '';
    return [
      date.getUTCFullYear(),
      '-', (date.getUTCMonth() + 1 + '').padStart(2, 0),
      '-', (date.getUTCDate() + '').padStart(2, 0),
      'T', (date.getUTCHours() + '').padStart(2, 0),
      ':', (date.getUTCMinutes() + '').padStart(2, 0),
      ':', (date.getUTCSeconds() + '').padStart(2, 0),
      '.', (date.getUTCMilliseconds() + '').padStart(3, 0),
      '+0800',
    ].join('');
  };

  const contentText = html => dom.parseHtml(html).textContent;
  const catched = (f, v = null) => feed => { try { return f(feed); } catch (e) { return v; } };
  const mid = mid => mid > 0 ? mid : null;

  feedParser.mid = feed => mid(feed.mid);
  feedParser.omid = feed => mid(feed.retweeted_status?.mid);

  feedParser.isFast = feed => feed.screen_name_suffix_new != null;
  feedParser.isFastForward = feed => feedParser.isFast(feed) && feed.ori_mid != null;
  feedParser.isForward = feed => feed.retweeted_status != null;

  const author = feedParser.author = {};
  author.avatar = catched(feed => feed.user.avatar_large || feed.user.avatar_hd, null);
  author.id = feed => [feed.user.idstr];
  author.name = feed => [feed.user.screen_name];
  const fauthor = feedParser.fauthor = {};
  fauthor.id = feed => feedParser.isFastForward(feed) ? [String(feed.ori_uid)] : []; // ori_mid 是被快转微博 id，ori_uid 是转快转的人的 id
  fauthor.name = catched(feed => feedParser.isFastForward(feed) ? [feed.screen_name_suffix_new.find(x => x.type === 2).content] : [], []);
  const original = feedParser.original = {};
  original.id = catched(feed => feed.retweeted_status ? [feed.retweeted_status.user.idstr] : [], []);
  original.name = catched(feed => feed.retweeted_status ? [feed.retweeted_status.user.screen_name] : [], []);
  const linkTopics = feed => {
    if (!Array.isArray(feed.url_struct)) return [];
    const topics = [];
    feed.url_struct.forEach(url => {
      const match = url.short_url.match(/#([^#]*)\[超话\]#/);
      if (match && match[0]) topics.push(match[0]);
    });
    return topics;
  };
  const text = feedParser.text = {};
  text.detail = feed => {
    let text = [feed, feed.retweeted_status].filter(x => x?.user).map(x => [
      x.user.screen_name,
      x.longTextContent_raw || x.text_raw,
      contentText(x.source),
      date(x.created_at),
    ]).reduce((x, y) => x.concat(y)).join('\u2028');
    if (Array.isArray(feed.url_struct)) {
      text = feed.url_struct.reduce(url => {
        if (!url?.short_url || !/https?:\/\//.test(url.short_url)) return text;
        return text.split(url.short_url).join((url.long_url || url.short_url) + '\ufff9' + (url.url_title ?? '') + '\ufffb');
      }, text);
    }
    const topics = linkTopics(feed).map(t => `#${t}[超话]#`).join('');
    if (topics) text += '\n' + topics;
    return text;
  };
  text.simple = feed => {
    let text = [feed, feed.retweeted_status].filter(x => x)
      .map(x => x.longTextContent_raw || x.text_raw).join('\n');
    if (Array.isArray(feed.url_struct)) {
      text = feed.url_struct.reduce(url => {
        if (!url?.short_url || !/https?:\/\//.test(url.short_url)) return text;
        return text.split(url.short_url).join(url.url_title || url.long_URL || url.short_url);
      }, text);
    }
    const topics = linkTopics(feed).map(t => `#${t}[超话]#`).join('');
    if (topics) text += '\n' + topics;
    return text;
  };
  const mention = feedParser.mention = {};
  mention.name = feed => {
    const text = [feed, feed.retweeted_status].filter(x => x)
      .map(x => x.longTextContent_raw || x.text_raw).join('\n');
    const users = text.match(/@[\u4e00-\u9fa5|\uE7C7-\uE7F3|\w_\-·]+/g) || [];
    return users.map(u => u.slice(1));
  };
  const topic = feedParser.topic = {};
  topic.text = feed => {
    const topics = linkTopics(feed);
    if (Array.isArray(feed.topic_struct)) {
      topics.push(...feed.topic_struct.map(topic => topic.topic_title));
    }
    if (Array.isArray(feed.url_struct)) {
      // 所有不是 https? 开头的链接
      topics.push(...feed.url_struct.map(x => x.short_url).filter(x => x && /^([#$]).*\1$/.test(x)));
    }
    return [...new Set(topics.map(text => text.replace(/[#\ue627$]|\[超话\]$/g, '').trim()))];
  };
  const source = feedParser.source = {};
  source.text = feed => {
    const sources = [feed, feed.retweeted_status].filter(x => x).map(x => contentText(x.source));
    return sources;
  };
  const pics = feedParser.pics = {};
  pics.info = feed => {
    const pics = [];
    [feed, feed.retweeted_status].forEach(fd => {
      if (fd?.pic_infos) pics.push(...Object.keys(fd.pic_infos).map(k => fd.pic_infos[k]));
    });
    return pics;
  };

}());
//#endregion
//#region @require yaofang://content/rule/filter/common/fast.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const feedParser = yawf.feed;
  const commentParser = yawf.comment;
  const request = yawf.request;

  const i18n = util.i18n;

  const fast = feedParser.fast = {};
  const commentFast = commentParser.fast = {};

  Object.assign(i18n, {
    contentTextContextTitle: {
      cn: '过滤微博 内容“{1}”',
      tw: '篩選微博 內容「{1}」',
      en: 'Create filter for content “{1}”',
    },
    accountContextTitle: {
      cn: '过滤微博 帐号“{1}”',
      tw: '篩選微博 帳號「{1}」',
      en: 'Create filter for account “@{1}”',
    },
    topicContextTitle: {
      cn: '过滤微博 话题#{1}#',
      tw: '篩選微博 話題#{1}#',
      en: 'Create filter for topic #@{1}#',
    },
    sourceContextTitle: {
      cn: '过滤微博 来源“{1}”',
      tw: '篩選微博 來源「{1}」',
      en: 'Create filter for source “@{1}”',
    },
  });

  const cleanText = text => text.replace(/^[\s\u200b]+|[\s\u200b]+$/g, '');

  const recognize = fast.recognize = {};
  // 识别选中的文本
  recognize.textSimple = function (selection) {
    if (!(selection instanceof Selection)) return [];
    if (!(selection + '')) return [];
    if (selection.rangeCount !== 1) return [];
    let simple, full, type;
    simple = (feedParser.text.simple(selection) || []).map(cleanText);
    full = (feedParser.text.detail(selection) || []).map(cleanText);
    type = 'text';
    if (!simple.join('') && !full.join('')) {
      simple = full = (commentParser.text(selection) || []).map(cleanText);
      type = 'comment';
    }
    if (!simple.join('') && !full.join('')) {
      return [];
    }
    const template = i18n.contentTextContextTitle;
    const title = template.replace('{1}', () => simple);
    return [{ title, type, value: { simple, full } }];
  };
  rule.addFastListener(recognize.textSimple);

  // 识别多个选区选中的文本
  recognize.textComplex = function (selection) {
    if (!(selection instanceof Selection)) return [];
    if (selection.rangeCount <= 1) return [];
    let texts = feedParser.text.detail(selection).filter(cleanText);
    let type = 'multitext';
    if (!texts.length) {
      texts = commentParser.text(selection).filter(cleanText);
      type = 'multitextcomment';
    }
    if (!texts.length) {
      return [];
    }
    const template = i18n.contentTextContextTitle;
    texts = texts.map(text => text.trim());
    const joined = texts.join('…');
    const placeholder = joined.length > 10 ? joined.slice(0, 9) + '…' : joined;
    const title = template.replace('{1}', () => placeholder);
    return [{ title, type, value: { full: texts } }];
  };
  rule.addFastListener(recognize.textComplex);

  // 因为我们移除了对链接的识别，这里 将链接识别为文本
  recognize.textLink = function (target) {
    if (!(target instanceof Element)) return [];
    const container = document.createElement('body');
    container.appendChild(target.cloneNode(true));
    const link = container.querySelector([
      'a[action-type="feed_list_url"][title]',
      'a[action-type="fl_url_addparams"][title]',
    ].join(','));
    if (!link) return [];
    if (link.matches('[suda-uatrack*="1022-topic"]')) return [];
    const text = link.title.trim();
    if (text.match(/^https?:/) || text === '网页链接') return [];
    const template = i18n.contentTextContextTitle;
    const title = template.replace('{1}', () => text);
    return [{ title, type: 'text', value: { simple: text, full: [text] } }];
  };
  rule.addFastListener(recognize.textLink);

  // 识别用户的头像、链接等
  recognize.account = async function (target) {
    if (!(target instanceof Element)) return [];
    const find = selector => {
      const parent = target.closest(selector);
      if (parent) return parent;
      const content = target.querySelector(selector);
      if (!content) return null;
      const container = content.closest('[comment_id], [mid]');
      if (!container) return null;
      if (target === container || container.contains(target)) return content;
      return null;
    };
    const user = { id: null, name: null, type: 'account' };
    // 用户链接
    ; (function (userlink) {
      if (!userlink) return;
      const params = new URLSearchParams(userlink.getAttribute('usercard'));
      if (params.has('id')) user.id = params.get('id');
      if (params.has('name')) user.name = params.get('name');
      if (userlink.matches('.WB_detail > .WB_info > .W_fb[usercard]')) user.type = 'author';
      if (userlink.matches('.WB_expand > .WB_info > .W_fb[usercard]')) user.type = 'original';
      if (userlink.matches('.WB_feed_type a[href*="loc=at"][usercard*="name"]')) user.type = 'mention';
      if (userlink.matches('[comment_id] [usercard]')) user.type = 'commentuser';
    }(find('[usercard*="name="], [usercard*="id="]')));
    // 个人主页的头像
    ; (function (photo) {
      if (!photo) return;
      user.name = photo.getAttribute('alt');
    }(find('.photo[alt]')));
    // 用户卡片头像
    ; (function (usercard) {
      if (!usercard) return;
      const avatar = usercard.querySelector('[imgtype="head"][uid][title]');
      if (!avatar) return;
      user.name = avatar.title;
      user.id = avatar.getAttribute('uid');
    }(find('.layer_personcard')));
    if (!user.id && !user.name) return [];
    if (!user.id || !user.name) try {
      Object.assign(user, await request.userInfo(user));
    } catch (e) { return []; }
    const template = i18n.accountContextTitle;
    if (!template) return [];
    const title = template.replace('{1}', () => user.name);
    return [{ title, type: user.type, value: { id: user.id, name: user.name } }];
  };
  rule.addFastListener(recognize.account);

  // 识别话题
  recognize.topic = async function (target) {
    if (!(target instanceof Element)) return [];
    let topic = null;
    if (target.matches('a[suda-uatrack*="1022-topic"]') && target.title) {
      topic = target.title.replace(/^[\s#]+|[\s#]+$/g, '');
    }
    if (!topic && target.matches('a.a_topic, a[suda-uatrack*="1022-topic"]')) {
      topic = target.textContent.replace(/^[\s#]+|[\s#]+$/g, '');
    }
    if (!topic && target.matches('a[suda-uatrack*="1022-stock"]')) {
      topic = target.textContent.replace(/^[\s$]+|[\s$]+$/g, '');
    }
    if (!topic && target.matches('.hot_topic a[title][suda-uatrack*="key=hottopic_r2"]')) {
      topic = target.title.replace(/^[\s#]+|[\s#]+$/g, '');
    }
    if (!topic && target.matches('.WB_from a[href^="https://huati.weibo.com/k/"]')) {
      if (/^https:\/\/huati.weibo.com\/k\/[^/?#]+$/.test(target.href)) {
        topic = decodeURIComponent(target.href.split('/').pop()).trim();
      }
    }
    if (!topic) return [];
    const text = topic.replace(/^\ue627|\[超话\]$|超话$/g, '');
    const template = i18n.topicContextTitle;
    const title = template.replace('{1}', () => text);
    return [{ title, type: 'topic', value: text }];
  };
  rule.addFastListener(recognize.topic);

  // 识别来源
  recognize.source = async function (target) {
    if (!(target instanceof Element)) return [];
    if (!target.matches('.WB_from a:not([date]):not([yawf-date])')) return [];
    const source = (target.title || target.textContent).trim();
    if (!source || source === '微博 weibo.com') return [];
    const template = i18n.sourceContextTitle;
    const title = template.replace('{1}', () => source);
    return [{ title, type: 'source', value: source }];
  };
  rule.addFastListener(recognize.source);

  Object.assign(i18n, {
    textFastDescription: {
      cn: '包含“{1}”的微博',
      tw: '包含「{1}」的微博',
      en: 'Feeds contain text “{1}”',
    },
    textCommentFastDescription: {
      cn: '包含“{1}”的评论',
      tw: '包含「{1}」的評論',
      en: 'Comments contain text “{1}”',
    },
    regexFastDescription: {
      cn: '匹配{1}的微博',
      tw: '匹配{1}的微博',
      en: 'Feeds contain text “{1}”',
    },
    regexCommentFastDescription: {
      cn: '匹配{1}的评论',
      tw: '匹配{1}的評論',
      en: 'Comments contain text “{1}”',
    },
    accountAuthorFastDescription: {
      cn: '作者是“@{1}”的微博',
      tw: '作者是「@{1}」的微博',
      en: 'Feeds by "@{1}"',
    },
    accountAuthorForwardFastDescription: {
      cn: '作者是“@{1}”的转发微博',
      tw: '作者是「@{1}」的轉發微博',
      en: 'Feeds by "@{1}"',
    },
    accountMentionFastDescription: {
      cn: '提到了“@{1}”的微博',
      tw: '提到了「@{1}」的微博',
      en: 'Feeds mentioned "@{1}"',
    },
    accountOriginalFastDescription: {
      cn: '原作者是“@{1}”的微博',
      tw: '原作者是「@{1}」的微博',
      en: 'Original Feeds by "@{1}"',
    },
    accountCommentFastDescription: {
      cn: '包含“@{1}”的评论',
      tw: '包含「@{1}」的評論',
      en: 'Comments with "@{1}"',
    },
    topicFastDescription: {
      cn: '包含话题#{1}#的微博',
      tw: '包含话题#{1}#的微博',
      en: 'Feeds contain topic #{1}#',
    },
    sourceFastDescription: {
      cn: '来自“{1}”的微博',
      tw: '來自「{1}」的微博',
      en: 'Feeds from source “{1}”',
    },
  });

  const render = fast.render = {};
  const commentRender = commentFast.render = {};

  const textFastRender = function (description) {
    return function (item) {
      const container = document.createElement('span');
      const [pre, post] = description().split('{1}');
      container.appendChild(document.createTextNode(pre));
      const input = document.createElement('input');
      container.appendChild(input);
      container.appendChild(document.createTextNode(post));
      input.value = item.value = item.value.simple;
      input.addEventListener('input', event => {
        item.value = input.value;
      });
      return container;
    };
  };
  render.text = textFastRender(() => i18n.textFastDescription);
  commentRender.text = textFastRender(() => i18n.textCommentFastDescription);

  const regexEscaped = function (str) {
    return str.replace(/[.*+?^${}()|[\]/\\]/g, '\\$&');
  };
  const regexFastRender = function (description) {
    return function (item) {
      const container = document.createElement('span');
      const [pre, post] = description().split('{1}');
      container.appendChild(document.createTextNode(pre));
      const input = document.createElement('input');
      container.appendChild(input);
      container.appendChild(document.createTextNode(post));
      if (item.value.full.length === 1) {
        input.value = item.value = '/' + regexEscaped(item.value.full[0]) + '/mu';
      } else {
        input.value = item.value = '/^' + item.value.full
          .map(value => `(?=.*${regexEscaped(value)})`).join('') + '/mu';
      }
      input.addEventListener('input', event => {
        item.value = input.value;
      });
      return container;
    };
  };
  render.regex = regexFastRender(() => i18n.regexFastDescription);
  commentRender.regex = regexFastRender(() => i18n.regexCommentFastDescription);

  const simpleRender = function (template, readValue = value => value) {
    return function (item) {
      const container = document.createElement('span');
      const message = template().replace('{1}', () => readValue(item.value));
      container.appendChild(document.createTextNode(message));
      return container;
    };
  };

  render.author = simpleRender(() => i18n.accountAuthorFastDescription, value => value.name);
  render.forward = simpleRender(() => i18n.accountAuthorForwardFastDescription, value => value.name);
  render.mention = simpleRender(() => i18n.accountMentionFastDescription, value => value.name);
  render.original = simpleRender(() => i18n.accountOriginalFastDescription, value => value.name);
  commentRender.user = simpleRender(() => i18n.accountCommentFastDescription, value => value.name);
  render.topic = simpleRender(() => i18n.topicFastDescription);
  render.source = simpleRender(() => i18n.sourceFastDescription);

}());
//#endregion
//#region @require yaofang://content/rule/filter/filter/filter.js

; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.filterTabTitle = {
    cn: '微博过滤',
    tw: '微博篩選',
    en: 'Filter',
  };

  const filter = yawf.rules.filter = {};
  filter.filter = rule.Tab({
    template: () => i18n.filterTabTitle,
    pagemenu: true,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/filter/following.js
; (function () {

  const yawf = window.yawf;
  const config = yawf.config;
  const init = yawf.init;
  const util = yawf.util;
  const rule = yawf.rule;
  const request = yawf.request;
  const download = yawf.download;
  const observer = yawf.observer;

  const filter = yawf.rules.filter;

  const i18n = util.i18n;
  const functools = util.functools;
  const ui = util.ui;
  const css = util.css;

  const getContext = functools.once(async function () {
    const followConfig = await config.pool('Follow', {
      uid: init.page.config.user.idstr,
      isLocal: true,
    });
    const fetchData = new rule.class.OffscreenConfigItem({
      id: 'fetchData',
      configPool: followConfig,
      get initial() { return {}; },
      setConfig(value) {
        value.timestamp = Date.now();
        return super.setConfig(value);
      },
      restart() {
        const value = this.getConfig();
        value.startTime = Date.now();
        this.setConfig(value);
        return value.startTime;
      },
      isOutDated() {
        const value = this.getConfig();
        if (!value.timestamp) return false;
        return value.startTime < Date.now() - 864e5 * 3;
      },
      // 其实设置读写并不是同步的，但是也没什么更好的办法就是了
      getLock() {
        const value = this.getConfig();
        const lock = Date.now() + [...Array(100)].map(_ => Math.random() * 10 | 0).join('');
        value.lock = lock;
        this.setConfig(value);
        return lock;
      },
      assertLock(lock) {
        const value = this.getConfig();
        if (value.lock !== lock) {
          throw Error('Fetching follow list error: Lock lost');
        }
      },
      touchTimestamp() {
        const value = this.getConfig();
        this.setConfig(value);
        return value.lock;
      },
      normalize(value) {
        const base = (function () {
          if (!value) return {};
          if (!value.timestamp) return {};
          if (value.timestamp > Date.now() + 60e3) return {};
          if (value.timestamp < Date.now() - 86400e3 * 7) return {};
          if (value.allPages && !value.startTime) {
            value.startTime = Date.now();
          }
          if (value.pendingPages) {
            if (!Array.isArray(value.list)) return {};
          }
          return value;
        }());
        base.weiboVersion = 7;
        return base;
      },
    });
    const lastList = new rule.class.OffscreenConfigItem({
      id: 'lastList',
      configPool: followConfig,
      get initial() { return null; },
      normalize(value) {
        if (!value) return null;
        if (!value.timestamp) return null;
        if (!Array.isArray(value.list)) return null;
        return value;
      },
    });
    const lastChange = new rule.class.OffscreenConfigItem({
      id: 'lastChange',
      configPool: followConfig,
      get initial() { return null; },
      normalize(value) {
        if (!value) return null;
        if (!value.timestamp) return null;
        if (!Array.isArray(value.add)) value.add = [];
        if (!Array.isArray(value.lost)) value.lost = [];
        if (!Array.isArray(value.rename)) value.rename = [];
        return value;
      },
    });
    const configs = { fetchData, lastList, lastChange };
    return configs;
  });

  let followingContext = null;
  init.onReady(async function () {
    followingContext = await getContext();
  }, { priority: util.priority.BEFORE });

  /** @typedef {'inactive'|'waiting'|'starting'|'pending'|'running'|'running_fail'|'checking'|'checking_fail'} UpdateStatusStatus */
  /** @type {{ status: UpdateStatusStatus, current: number, total: number, result: number }} */
  const updateStatus = {
    status: 'inactive',
    current: 0,
    total: 0,
    result: 0,
  };
  const reportUpdateStatus = function (/** @type {UpdateStatusStatus} */status) {
    const { fetchData } = followingContext;
    const fetchContext = fetchData.getConfig();
    Object.assign(updateStatus, {
      status,
      current: fetchContext.currentPage || 0,
      total: (fetchContext.allPages || []).length,
      result: (fetchContext.list || []).length,
    });
    following.autoCheckFollowing.ref.fetching.renderAllValues();
  };

  // 获取第一页的数据
  const fetchInitialize = async function () {
    const { fetchData } = followingContext;
    const lock = fetchData.touchTimestamp();
    fetchData.restart();
    const { allPages, followInPage } = await request.getFollowingPage(init.page.config.user.idstr);
    fetchData.assertLock(lock);
    const fetchContext = fetchData.getConfig();
    fetchContext.allPages = allPages;
    fetchContext.list = followInPage;
    fetchContext.currentPage = 1;
    fetchData.setConfig(fetchContext);
  };
  // 获取后一页的数据
  const fetchNext = async function () {
    const { fetchData } = followingContext;
    const lock = fetchData.touchTimestamp();
    const oldFetchContext = fetchData.getConfig();
    const currentPage = oldFetchContext.currentPage;
    const nextPage = oldFetchContext.allPages[currentPage];
    const { followInPage } = await request.getFollowingPage(init.page.config.user.idstr, nextPage);
    fetchData.assertLock(lock);
    const fetchContext = fetchData.getConfig();
    fetchContext.list.push(...followInPage);
    fetchContext.currentPage++;
    fetchData.setConfig(fetchContext);
  };
  // 检查是否已经获取完毕
  const hasNextPage = function () {
    const { fetchData } = followingContext;
    const fetchContext = fetchData.getConfig();
    return fetchContext.allPages.length > fetchContext.currentPage;
  };
  // 比对新旧列表不同
  const checkListDiff = function (list, newList, lastChange) {
    // 如果之前没有数据，那么也就不用对比
    if (!Array.isArray(list)) return { add: [], lost: [], rename: [] };
    const { add: lastAdd = [], lost: lastLost = [], rename: lastRename = [] } = lastChange ?? {};
    const sameFollowItem = (x, y) => x.id === y.id;
    const getName = x => x.name.replace(/@|\s?\(.*\)/g, '');
    // 先根据原有名单和未提交的更改恢复更早的名单
    const oldList = list
      .filter(x => !lastAdd.find(y => sameFollowItem(x, y))).concat(lastLost)
      .map(x => (lastRename.find(r => sameFollowItem(r.old, x)) || { old: x }).old);
    // 然后将新的名单与更早的名单比较
    const add = newList.filter(x => !oldList.find(y => sameFollowItem(y, x)));
    const lost = oldList.filter(y => !newList.find(x => sameFollowItem(y, x)));
    const rename = oldList.map(oldItem => {
      if (oldItem.type !== 'user') return null;
      const newItem = newList.find(n => sameFollowItem(n, oldItem));
      if (!newItem) return null;
      const oldName = getName(oldItem);
      const newName = getName(newItem);
      if (oldName === newName) return null;
      return Object.assign({}, newItem, {
        old: oldItem,
        new: newItem,
      });
    }).filter(v => v);
    return { add, lost, rename };
  };

  // 去除重复数据
  const removeDuplicate = function (list) {
    if (!Array.isArray(list)) return [];
    const seen = new Set();
    return list.filter(item => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
  };

  // 触发刷新流程，如果此时已经完成则强制重新开始
  const updateFollowList = async function () {
    reportUpdateStatus('starting');
    const { fetchData, lastList, lastChange } = followingContext;

    // 如果连续 10 分钟没有更新，那么可能是之前负责更新的那个页面被关闭或者出错了
    const { timestamp, lock } = fetchData.getConfig();
    if (timestamp > Date.now() - 600e3 && lock) {
      setTimeout(() => {
        if (fetchData.getConfig().timestamp === timestamp) updateFollowList();
      }, 600e3);
      reportUpdateStatus('pending');
      return;
    }

    // 如果之前获取数据使用的微博版本和现在不一样，那么数据要丢弃
    if (fetchData.getConfig().weiboVersion !== 7) {
      fetchData.setConfig({});
    }

    try {
      if (fetchData.isOutDated()) {
        fetchData.setConfig({});
      }
      const lock = fetchData.getLock();
      util.debug('Fetch Follow: start follow fetching');
      // 如果之前获取到一半，那么就继续之前的工作，否则开始新工作
      if (!fetchData.getConfig().allPages) {
        util.debug('Fetch Follow: fetch first page');
        fetchData.assertLock(lock);
        await fetchInitialize();
        util.debug('Fetch Follow: fetch first done');
      }
      while (hasNextPage()) {
        reportUpdateStatus('running');
        await new Promise(resolve => setTimeout(resolve, 5e3));
        util.debug('Fetch Follow: fetch next page');
        fetchData.assertLock(lock);
        await fetchNext();
        util.debug('Fetch Follow: fetch next done');
      }
      fetchData.assertLock(lock);
      util.debug('Fetch Follow: fetch everything done');
    } catch (e) {
      util.debug(e);
      util.debug('Fetch Follow: fetching following failed');
      reportUpdateStatus('running_fail');
      return;
    }

    try {
      reportUpdateStatus('checking');
      const newList = removeDuplicate(fetchData.getConfig().list);
      const oldList = lastList.getConfig();
      const changeList = lastChange.getConfig() ?? {};
      const { add, lost, rename } = checkListDiff(oldList?.list, newList, changeList);

      const finishTime = Date.now();
      lastList.setConfig({ timestamp: finishTime, list: newList });
      if (add.length || lost.length || rename.length) {
        lastChange.setConfig({ timestamp: finishTime, add, lost, rename });
      } else {
        lastChange.setConfig(null);
      }
      fetchData.setConfig({});
    } catch (e) {
      util.debug('Fetch Follow: error while update result');
      util.debug(e);
      reportUpdateStatus('checking_fail');
    }
    reportUpdateStatus('inactive');
  };

  const clearFollowList = async function () {
    const { fetchData, lastList, lastChange } = followingContext;
    const { timestamp, lock } = fetchData.getConfig() ?? {};
    util.debug('Fetch Follow: clear fetching data.');
    if (timestamp > Date.now() - 600e3 && lock) {
      util.debug('Fetch Follow: Fetching seems in progress, and would break');
    }
    fetchData.setConfig({});
    lastList.setConfig(null);
    lastChange.setConfig(null);
  };

  const exportFollowList = async function ({ timestamp, list }) {
    const csvItem = string => {
      if (!/[",\s]/.test(string)) return string;
      return '"' + string.replace(/"/g, '""') + '"';
    };
    // 这里我们用上 BOM 可以获得更好的兼容性
    // 在前面放一列序号，这样即便不能处理 BOM ，也可以躲开最前面一行的序数，不会出什么问题
    const content = '\ufeff#,name,homepage,avatar\r\n' + list.map((item, index) => {
      const name = csvItem(item.description);
      const homepage = csvItem(new URL(item.url, 'https://weibo.com').href);
      const avatar = csvItem(new URL(item.avatar, 'https://weibo.com').href);
      return [index + 1, name, homepage, avatar].join(',');
    }).join('\r\n') + '\r\n'; // CRLF 换行符支持效果最好，而且也更合乎规范
    const blob = new Blob([content], { type: 'text/csv' });
    const date = new Date(timestamp).toISOString().replace(/[-]|T.*/g, '');
    const filename = download.filename('following-' + init.page.config.user.idstr + '-' + date + '.csv');
    download.blob({ blob, filename });
  };

  const formatLastTime = function (timestamp) {
    if (!timestamp) return i18n.autoCheckFollowingNever;
    const option = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' };
    const formatter = new Intl.DateTimeFormat(i18n.languageCode, option);
    return formatter.format(new Date(timestamp));
  };

  i18n.followingGroupTitle = {
    cn: '关注管理',
    tw: '關注管理',
    en: 'Following',
  };

  const following = filter.following = {};
  following.following = rule.Group({
    parent: filter.filter,
    template: () => i18n.followingGroupTitle,
  });

  Object.assign(i18n, {
    autoCheckFollowing: {
      cn: '自动检查关注列表并提示变化|{{frequency}}{{i}}||{{buttons}}||{{fetching}}',
      tw: '自動檢查關注清單並提示變化|{{frequency}}{{i}}||{{buttons}}||{{fetching}}',
      en: 'Automatically checks and prompt any changes about following list | {{frequency}}{{i}}||{{buttons}}||{{fetching}}',
    },
    autoCheckFollowingDetail: {
      cn: '开启本功能后脚本会每隔一段时间，检查您的关注列表，并和上一次得到的结果比较，将不同之处展示出来。脚本检查关注列表只能像您在网页中检查关注列表一样，一页一页的翻看，因此检查可能需要较长的时间，如果您关注了大量的帐号，请考虑降低自动检查的频率。',
    },
    autoCheckFollowing1: { cn: '每天', tw: '每天', en: 'every day' },
    autoCheckFollowing3: { cn: '每三天', tw: '每三天', en: 'every 3 days' },
    autoCheckFollowing7: { cn: '每周', tw: '每週', en: 'every week' },
    autoCheckFollowingLastTime: { cn: '本地数据更新时间：', tw: '本機資料更新時間：', en: 'Last Update Time: ' },
    autoCheckFollowingNever: { cn: '暂无数据', tw: '暫無資料', en: 'Never' },
    autoCheckFollowingDownload: { cn: '导出关注列表', tw: '匯出關注清單', en: 'Export Follow List' },
    autoCheckFollowingClean: { cn: '清除本地数据', tw: '清除本機資料', en: 'Clear Data' },
    autoCheckFollowingNow: { cn: '立即更新数据', tw: '立即更新資料', en: 'Update Now' },
    autoCheckFollowingRunning: { cn: '（正在更新：{1}）', en: '(Updating: {1})' },
    autoCheckFollowingDialogTitle: { cn: '关注列表变化 - 药方 (YAWF)', tw: '關注清單變化 - 藥方 (YAWF)', en: 'Following List Changes - YAWF' },
    autoCheckFollowingTip: {
      cn: '您的关注列表自从上次检查并确认至今发生了如下变化，请您复查并确认：',
      tw: '您的關注清單自從上次檢查並確認至今發生了如下變化，請您複查並確認：',
      en: 'Your following list had been changed since last checking, please review and confirm: ',
    },
    autoCheckFollowingAdd: { cn: '新增如下关注', tw: '新增如下關注', en: 'Recent Following' },
    autoCheckFollowingLost: { cn: '减少如下关注', tw: '減少如下關注', en: 'Recent Unfollowed' },
    autoCheckFollowingRename: { cn: '如下关注修改了昵称', tw: '如下關注修改了暱稱', en: 'Recent Renamed' },
    autoCheckFollowingConfirmed: { cn: '已确认', tw: '已確認', en: 'Confirmed' },
    checkingProgress: {
      cn: '【{status}】{current}/{total}页，{result}关注',
      tw: '【{status}】{current}/{total}頁，{result}關注',
      en: '[{status}] {current}/{total} pages，{result} followings',
    },
    checkingProgressInactive: { cn: '尚未启动', tw: '尚未啟動', en: 'Inactive' },
    checkingProgressWaiting: { cn: '等待开始', tw: '等待開始', en: 'Wait to Start' },
    checkingProgressStarting: { cn: '正在初始化', tw: '正在初期化', en: 'Initializing' },
    checkingProgressPending: { cn: '正由其他页面负责更新', tw: '正由其他頁面負責更新', en: 'Updating by Other Pages' },
    checkingProgressRunning: { cn: '正在获取数据', tw: '正在擷取資料', en: 'Fetching' },
    checkingProgressChecking: { cn: '正在比对结果', tw: '正在比對結果', en: 'Comparing List' },
    checkingProgressRunningFail: { cn: '数据获取出错', tw: '資料擷取出錯', en: 'Error While Fetching' },
    checkingProgressCheckingFail: { cn: '结果比对出错', tw: '結果比對出錯', en: 'Error While Comparing' },
  });

  /**
   * @typedef {{ id: string, type: 'user'|'stock'|'topic'|'unknown', url: string, avatar: string, name: string, description: string }} FollowInfo
   * @param {{ timestamp: number, add: FollowInfo[], lost: FollowInfo[] }}
   */
  const showChangeList = function ({ timestamp, add = [], lost = [], rename = [] }) {
    let resolve;
    const promise = new Promise(r => { resolve = r; });
    const followChangeDialog = ui.dialog({
      id: 'yawf-follow-change',
      title: i18n.autoCheckFollowingDialogTitle,
      /** @param {Element} container */
      render(container, { ok: okButton }) {
        okButton.textContent = i18n.autoCheckFollowingConfirmed;
        container.innerHTML = '<div class="yawf-following-notice-header"></div><div class="yawf-following-notice-body"><div class="yawf-following-add" style="display: none;"><div class="yawf-following-add-title"></div><div class="yawf-following-add-items"><ul class="yawf-config-collection-list yawf-config-collection-user-id"></ul></div></div><div class="yawf-following-lost" style="display: none;"><div class="yawf-following-lost-title"></div><div class="yawf-following-lost-items"><ul class="yawf-config-collection-list yawf-config-collection-user-id"></ul></div></div><div class="yawf-following-rename" style="display: none;"><div class="yawf-following-rename-title"></div><div class="yawf-following-rename-items"><ul class="yawf-config-collection-list yawf-config-collection-user-id"></ul></div></div></div><div class="yawf-following-notice-footer"><span class="yawf-following-notice-last-time-text"></span><span class="yawf-following-notice-last-time"></span></div>';
        container.querySelector('.yawf-following-notice-header').textContent = i18n.autoCheckFollowingTip;
        container.querySelector('.yawf-following-add-title').textContent = i18n.autoCheckFollowingAdd;
        container.querySelector('.yawf-following-lost-title').textContent = i18n.autoCheckFollowingLost;
        container.querySelector('.yawf-following-rename-title').textContent = i18n.autoCheckFollowingRename;
        container.querySelector('.yawf-following-notice-last-time-text').textContent = i18n.autoCheckFollowingLastTime;
        container.querySelector('.yawf-following-notice-last-time').textContent = formatLastTime(timestamp);
        [
          { area: container.querySelector('.yawf-following-add'), list: add },
          { area: container.querySelector('.yawf-following-lost'), list: lost },
          { area: container.querySelector('.yawf-following-rename'), list: rename },
        ].forEach(({ area, list }) => {
          if (!list || !Array.isArray(list) || !list.length) return;
          area.style.display = '';
          const ul = area.querySelector('ul');
          list.forEach(item => {
            const wrap = document.createElement('ul');
            wrap.innerHTML = '<li class="yawf-config-collection-item W_btn_b W_btn_tag"><div class="yawf-config-collection-item-content"><div class="yawf-config-user-item"><div class="yawf-config-user-avatar"><img class="yawf-config-user-avatar-img" /></div><div><a class="yawf-config-user-name" target="_blank"></a></div><div><span class="yawf-config-user-detail S_txt2"></span></div></div></div></li>';
            if (item.type === 'user') wrap.querySelector('.yawf-config-user-item').setAttribute('usercard', `id=${item.user}`);
            wrap.querySelector('img').setAttribute('src', item.avatar);
            const name = wrap.querySelector('.yawf-config-user-name');
            name.textContent = item.description;
            name.href = item.url;
            if (item.old) {
              const detail = wrap.querySelector('.yawf-config-user-detail');
              detail.title = detail.textContent = '@' + item.old.name.replace(/@|\s*\(.*\)/g, '');
            }
            const li = wrap.firstChild;
            ul.appendChild(li);
          });
        });
      },
      button: {
        ok() { resolve(true); followChangeDialog.hide(); },
        cancel() { resolve(null); followChangeDialog.hide(); },
      },
    });
    followChangeDialog.show();
    return promise;
  };

  following.autoCheckFollowing = rule.Rule({
    v7Support: true,
    id: 'filter_follow_check',
    version: 1,
    parent: following.following,
    template: () => i18n.autoCheckFollowing,
    ref: {
      frequency: {
        type: 'select',
        initial: 3 * 86400e3,
        select: [
          { text: () => i18n.autoCheckFollowing1, value: 1 * 86400e3 },
          { text: () => i18n.autoCheckFollowing3, value: 3 * 86400e3 },
          { text: () => i18n.autoCheckFollowing7, value: 7 * 86400e3 },
        ],
      },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.autoCheckFollowingDetail },
      fetching: {
        preparConfig() {
          const { fetchData } = followingContext;
          this.config = fetchData.preparConfig();
          return fetchData;
        },
        render() {
          this.getConfig();
          const buttonArea = document.createElement('span');
          buttonArea.setAttribute('yawf-config-item', this.configId);
          buttonArea.innerHTML = '<span class="yawf-following-checking"></span><button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-following-check-now"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>';
          const checkNowButton = buttonArea.querySelector('.yawf-following-check-now');
          checkNowButton.addEventListener('click', event => {
            if (!event.isTrusted) return;
            updateFollowList();
          });
          checkNowButton.querySelector('.woo-button-content').textContent = i18n.autoCheckFollowingNow;
          this.renderValue(buttonArea);
          return buttonArea;
        },
        renderValue(buttonArea) {
          const fetchData = this.getConfig();
          const checkingText = buttonArea.querySelector('.yawf-following-checking');
          const checkNowButton = buttonArea.querySelector('.yawf-following-check-now');
          if (fetchData && fetchData.lock) {
            checkNowButton.style.display = 'none';
            checkingText.style.display = '';
            const progress = {
              status: {
                waiting: i18n.checkingProgressWaiting,
                starting: i18n.checkingProgressStarting,
                inactive: i18n.checkingProgressInactive,
                pending: i18n.checkingProgressPending,
                running: i18n.checkingProgressRunning,
                running_fail: i18n.checkingProgressRunningFail,
                checking: i18n.checkingProgressChecking,
                checking_fail: i18n.checkingProgressCheckingFail,
              }[updateStatus.status],
              total: updateStatus.total,
              current: updateStatus.current,
              result: updateStatus.result,
            };
            const statusText = i18n.checkingProgress.replace(/\{(\w+)\}/g, (_, w) => progress[w]);
            checkingText.textContent = i18n.autoCheckFollowingRunning.replace(/\{1\}/, () => statusText);
          } else {
            checkingText.style.display = 'none';
            checkNowButton.style.display = '';
          }
        },
      },
      buttons: {
        preparConfig() {
          const { lastList } = followingContext;
          this.config = lastList.preparConfig();
          return lastList;
        },
        render() {
          const buttonArea = document.createElement('span');
          buttonArea.setAttribute('yawf-config-item', this.configId);
          buttonArea.innerHTML = '<span class="yawf-following-last-text"></span><span class="yawf-following-last-time"></span><button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-following-export"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button><button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-following-clear"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>';
          const lastTimeText = buttonArea.querySelector('.yawf-following-last-text');
          const lastTime = buttonArea.querySelector('.yawf-following-last-time');
          const exportButton = buttonArea.querySelector('.yawf-following-export');
          const clearFollowing = buttonArea.querySelector('.yawf-following-clear');
          exportButton.querySelector('.woo-button-content').textContent = i18n.autoCheckFollowingDownload;
          clearFollowing.querySelector('.woo-button-content').textContent = i18n.autoCheckFollowingClean;
          exportButton.addEventListener('click', event => {
            if (!event.isTrusted) return;
            exportFollowList(this.getConfig());
          });
          clearFollowing.addEventListener('click', event => {
            if (!event.isTrusted) return;
            clearFollowList();
          });
          lastTimeText.textContent = i18n.autoCheckFollowingLastTime;
          const lastList = this.getConfig();
          lastTime.textContent = formatLastTime(lastList && lastList.timestamp);
          if (!lastList || !lastList.timestamp) {
            exportButton.style.display = 'none';
            clearFollowing.style.display = 'none';
          }
          return buttonArea;
        },
        renderValue(buttonArea) {
          const lastList = this.getConfig();
          const lastTime = buttonArea.querySelector('.yawf-following-last-time');
          const exportButton = buttonArea.querySelector('.yawf-following-export');
          const clearFollowing = buttonArea.querySelector('.yawf-following-clear');
          lastTime.textContent = formatLastTime(lastList && lastList.timestamp);
          if (!lastList || !lastList.timestamp) {
            exportButton.style.display = 'none';
            clearFollowing.style.display = 'none';
          } else {
            exportButton.style.display = '';
            clearFollowing.style.display = '';
          }
        },
      },
    },
    init() {
      const enabled = this.isEnabled();
      const frequency = this.ref.frequency.getConfig();
      const { fetchData, lastList, lastChange } = followingContext;
      let shouldUpdate = false;
      const fetchContext = fetchData.getConfig();
      const list = lastList.getConfig();
      if (fetchContext.lock) shouldUpdate = true;
      if (enabled && !list?.list) shouldUpdate = true;
      if (enabled && list && list.timestamp < Date.now() - frequency) shouldUpdate = true;
      if (shouldUpdate) {
        reportUpdateStatus('waiting');
        setTimeout(updateFollowList, 10e3);
      }
      const change = lastChange.getConfig();
      if (change?.timestamp) {
        if (init.page.type() === 'search') return;
        showChangeList(change).then(confirm => confirm && lastChange.setConfig(null));
      }
    },
  });

  css.append(`
#yawf-follow-change .woo-dialog-title { margin-bottom: 0; }
#yawf-follow-change .woo-dialog-body { padding: 0; }
.yawf-following-add-title,
.yawf-following-lost-title,
.yawf-following-rename-title { font-weight: bold; margin: 10px 0 5px; } 
.yawf-following-notice-header { padding: 20px; }
.yawf-following-notice-body { padding: 0 20px; width: 600px; max-height: 320px; overflow: auto; } 
.yawf-following-notice-footer { padding: 20px; } 
.yawf-following-notice-body a.yawf-config-user-name { color: inherit; }
.yawf-following-rename .yawf-config-user-name,
.yawf-following-rename .yawf-config-user-detail { display: inline-block; text-overflow: ellipsis; white-space: nowrap; vertical-align: top; }
`);

  i18n.uncheckFollowPresenter = {
    cn: '话题页面发布框取消默认勾选关注主持人',
    tw: '話題頁面發佈框取消預設勾選關注主持人',
    en: 'Uncheck follow presenter in topic page',
  };

  following.uncheckFollowPresenter = rule.Rule({
    id: 'uncheck_follow_presenter',
    version: 1,
    parent: following.following,
    template: () => i18n.uncheckFollowPresenter,
    initial: true,
    ainit() {
      observer.dom.add(function uncheckFollowPresenter() {
        const inputs = Array.from(document.querySelectorAll('input[type="checkbox"][checked][action-data*="follow"]:not([yawf-uncheck-follow])'));
        inputs.forEach(checkbox => {
          checkbox.setAttribute('yawf-uncheck', '');
          if (checkbox.checked) checkbox.click();
        });
      });
    },
  });

  i18n.showArticleWithoutFollow = {
    cn: '头条文章不关注作者直接显示全文',
    tw: '頭條文章不關注作者直接顯示全文',
    en: 'Show whole article without follow the author',
  };

  following.showArticleWithoutFollow = rule.Rule({
    id: 'show_article_without_follow',
    version: 1,
    parent: following.following,
    template: () => i18n.showArticleWithoutFollow,
    initial: true,
    ainit() {
      const showArticleCss = `
.WB_editor_iframe, .WB_editor_iframe_new, .WB_editor_iframe_word { height: auto !important; }
.artical_add_box [node-type="maskContent"] { display: none; }
`;
      css.append(showArticleCss);
      observer.dom.add(function articleFrameStyle() {
        /** @type{NodeListOf<HTMLIFrameElement>} */
        const frames = document.querySelectorAll('iframe[src*="ttarticle/p/show"]');
        if (!frames.length) return;
        Array.from(frames).forEach(function injectStyle(frame) {
          const document = frame.contentDocument;
          if (!document) setTimeout(injectStyle, 10, frame);
          const target = document.head || document.body || document.documentElement;
          const style = document.createElement('style');
          style.textContent = showArticleCss;
          target.appendChild(style);
        });
      });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/filter/homepage.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const request = yawf.request;
  const browserInfo = yawf.browserInfo;
  const feedParser = yawf.feed;
  const notifications = yawf.notifications;
  const init = yawf.init;

  const filter = yawf.rules.filter;

  const i18n = util.i18n;
  const keyboard = util.keyboard;
  const css = util.css;

  Object.assign(i18n, {
    feedsHomepageGroupTitle: {
      cn: '首页',
      tw: '首頁',
      en: 'Homepage',
    },
    feedsHomepageNewest: {
      cn: '使用最新微博代替首页（首页微博时间顺序排列）（推荐）',
      tw: '使用最新微博代替首頁（首頁微博時間順序排列）（推薦）',
      en: 'Use newest feeds for home page (home page timeline order) (suggested)',
    },
    feedsHomepageSingleGroup: {
      cn: '使用单个分组页代替首页（首页微博时间顺序排列）{{i}}||分组{{group}}',
      tw: '使用單個分組頁代替首頁（首頁微博時間順序排列）{{i}}||分組{{group}}',
      en: 'Use single feed list by group for home page (home page timeline order) {{i}}||Group{{group}}',
    },
    feedsHomepageSingleGroupDetail: {
      cn: '微博的分组页面按时间顺序正常排列。分组人数有限制，非会员至多 200 人/组。如果您的关注较少，建议使用分组代替首页。注意，分组页面中按作者过滤的规则将不会生效，如果您不希望看到某人的微博，您可以将其移出分组。',
    },
    feedsHomepageMultiGroup: {
      cn: '使用多个分组页代替首页（首页微博时间顺序排列）{{i}}||每次展示{{count}}条|点击查看更多时{{more}}||{{unread}}自动检查和提示未读微博{{ii}}||分组{{groups}}',
      tw: '使用多個分組頁代替首頁（首頁微博時間順序排列）{{i}}||每次展示{{count}}條|點擊查看更多時{{more}}||{{unread}}自動檢查和提示未讀微博{{ii}}||分組{{groups}}',
      en: 'Use multiple feed lists by group for home page (home page timeline order) {{i}}||show {{count}} feeds per page|{{more}} before show next page||{{unread}} Show tips for unread feeds {{ii}}||Groups{{groups}}',
    },
    feedsHomepageMultiGroupDetail: {
      cn: '微博的分组页面按时间顺序排列，如果您的关注较少，建议您将他们放入一个分组后启用使用“单个”分组的选项。如果您关注的人数较多，您可以选择多个分组，分组过多可能造成更长的加载时间，以及加载时的卡顿，建议尽量减少选择的分组数量。',
    },
    feedsHomepageMultiGroupDetail2: {
      cn: '检查未读微博仅对一般的分组有效，对悄悄关注分组无效。',
    },
    feedsHomepageKeepOld: {
      cn: '保留已展示微博',
      en: 'keep shown feeds',
    },
    feedsHomepageCleanOld: {
      cn: '清空已展示微博',
      en: 'clean up shown feeds',
    },
    feedsHomePageDoneGroup: {
      cn: '分组 {1} 的最近微博已全部展示',
      tw: '分組 {1} 的最近微博已全部展示',
      en: 'All recent feeds from group {1} had been shown',
    },
    feedsMultiGroupLoading: {
      cn: '正在加载……',
      tw: '正在載入……',
      en: 'Loading ...',
    },
    feedsMultiGroupLoadMore: {
      cn: '查看更多微博',
      en: 'Show more feeds',
    },
    feedsUnreadTipWithCount: {
      cn: '有 {1} 条新微博，点击查看',
      tw: '有 {1} 條新微博，點擊查看',
      en: '{1} new feeds',
    },
    feedsUnreadTip: {
      cn: '有新微博，点击查看',
      tw: '有新微博，點擊查看',
      en: 'show new feeds',
    },
    feedsUnreadLoading: {
      cn: '正在加载……',
      tw: '正在載入……',
      en: 'Loading ...',
    },
  });

  const homepage = filter.homepage = {};
  homepage.homepage = rule.Group({
    parent: filter.filter,
    template: () => i18n.feedsHomepageGroupTitle,
  });

  const fixHomeUrl = function (config) {
    util.inject(function (rootKey, { gid, name, api, index, source }) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      const root = vueSetup.getRootVm();
      const router = root.$router;
      router.beforeEach((to, from, next) => {
        if (to.name === 'home') {
          next('/mygroups?gid=' + gid);
        } else {
          next();
        }
      });
      if (router.currentRoute.name === 'home') {
        router.replace('/mygroups?gid=' + gid);
      }

      const bus = root.$Bus;
      bus.$on('handleHomeNav', function (data) {
        if (data.gid.startsWith('10001')) {
          bus.$emit('handleHomeNav', { gid, title: name, api, yawf_Trigger: true }, index, source);
        } else if (data.yawf_Trigger) {
          vueSetup.eachComponentVM('home', function (vm) {
            if (vm.getCurIndex) vm.getCurIndex(); // 别信他叫 get，要调他来更新当前高亮元素
          }, { watch: false });
        }
      });
    }, util.inject.rootKey, config);
  };

  homepage.newestFeeds = rule.Rule({
    v7Support: true,
    id: 'filter_homepage_newest_feeds',
    version: 21,
    parent: homepage.homepage,
    template: () => i18n.feedsHomepageNewest,
    init() {
      this.addConfigListener(config => {
        if (config) {
          homepage.singleGroup.setConfig(false);
          homepage.multiGroup.setConfig(false);
        }
      });
    },
    ainit() {
      const uid = init.page.config.user.idstr;
      fixHomeUrl({
        gid: '11000' + uid,
        api: '/ajax/feed/friendstimeline',
        name: '最新微博',
        index: 1,
        source: 'left',
      });
    },
  });

  let groupListLazyPromiseResolve;
  const groupListLazyPromise = new Promise(resolve => {
    groupListLazyPromiseResolve = resolve;
  }).then(async () => {
    const groups = await request.groupList();
    return groups.map(({ gid, title }) => ({ text: title, value: gid }));
  });
  homepage.singleGroup = rule.Rule({
    v7Support: true,
    id: 'filter_homepage_single_group',
    version: 1,
    parent: homepage.homepage,
    template: () => i18n.feedsHomepageSingleGroup,
    ref: {
      group: {
        type: 'select',
        select: groupListLazyPromise,
        afterRender: function (container) {
          groupListLazyPromiseResolve();
          return container;
        },
      },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.feedsHomepageSingleGroupDetail },
    },
    init() {
      this.addConfigListener(config => {
        if (config) {
          homepage.newestFeeds.setConfig(false);
          homepage.multiGroup.setConfig(false);
        }
      });
    },
    async ainit() {
      const gid = this.ref.group.getConfig();
      const groups = await request.groupList();
      const index = groups.findIndex(g => g.gid === gid);
      const name = groups[index].title;
      const api = '/ajax/feed/groupstimeline';
      fixHomeUrl({ gid, api, name, index, source: 'custom' });
    },
  });

  Object.assign(i18n, {
    feedsAutoLoad: { cn: '自动载入新微博{{i}}', tw: '自動載入新微博{{i}}', en: 'Load new feeds automatically {{i}}' },
    feedsAutoLoadDetail: {
      cn: '启用该选项可以在显示“有新微博”的提示横幅出现前过滤微博，避免点开提示，但是并没有刷出来微博的情况；因为扩展会读取对应微博以便过滤，这些微博会被标记为“已读”，因此勾选此项会导致在其他设备上收不到有新微博提示。',
    },
    feedsAutoShow: {
      cn: '加载后自动展示|{{background}}页面活动时暂停',
      tw: '載入後自動展示|{{background}}頁面活躍時暫停',
      en: 'Show feeds after automatically loaded| {{background}} pause when page active',
    },
    feedsDesktopNotify: {
      cn: '自动载入后显示桌面提示||{{whitelist}}仅对命中总是显示规则的微博生效',
      tw: '自動載入後显示桌面提示||{{whitelist}}僅對命中總是顯示規則的微博生效',
      en: 'Show desktop notification after automatically loaded||{{whitelist}} only apply to feeds hit always show rules',
    },
  });

  const showUnreadFeeds = function () {
    let newfeedtip = document.getElementById('yawf-new-feed-tip');
    if (!newfeedtip) return;
    newfeedtip.remove();
    const unreadFeeds = Array.from(document.querySelectorAll('[yawf-feed-preload="unread"]'));
    unreadFeeds.forEach(feed => {
      feed.setAttribute('yawf-feed-preload', 'show');
    });
  };

  homepage.autoLoad = rule.Rule({
    id: 'filter_homepage_auto_load',
    version: 1,
    parent: homepage.homepage,
    template: () => i18n.feedsAutoLoad,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.feedsAutoLoadDetail },
    },
    ainit() {

      // 完成过滤后再提示有未读消息
      observer.feed.onFinally(function countUnreadFeeds() {
        const unreadFeeds = Array.from(document.querySelectorAll('[yawf-feed-preload="unread"]'));
        const status = unreadFeeds.length;
        let newfeedtip = document.getElementById('yawf-new-feed-tip');
        if (status === 0 && newfeedtip) {
          newfeedtip.remove();
        } else if (status !== 0) {
          if (!newfeedtip) {
            const container = document.createElement('div');
            container.innerHTML = '<div class="WB_cardwrap WB_notes" id="yawf-new-feed-tip"><a href="javascript:void(0);"></a></div>';
            newfeedtip = container.firstChild;
            const feedlist = document.querySelector('.WB_feed');
            feedlist.parentNode.insertBefore(newfeedtip, feedlist);
            newfeedtip.querySelector('a').addEventListener('click', showUnreadFeeds);
          }
          const link = newfeedtip.querySelector('a');
          if (status > 0 && status < 100) {
            link.textContent = i18n.feedsUnreadTipWithCount.replace('{1}', status);
          } else {
            link.textContent = i18n.feedsUnreadTip;
          }
        }
      });

      // 响应键盘操作
      document.addEventListener('keyup', function loadPreloadedContentKey(event) {
        if (keyboard.event(event) !== keyboard.code.PERIOD) return;
        showUnreadFeeds();
      });

      // 隐藏预加载的内容
      css.append(`
#v6_pl_content_homefeed [yawf-feed-preload="unread"] { display: none !important; }
#home_new_feed_tip { display: none !important; }
.WB_feed [node-type="yawf-feed_list_timeTip"], .WB_feed [node-type="feed_list_timeTip"] { display: none !important; }
.WB_feed a.notes[action-type="feed_list_newBar"][node-type="feed_list_newBar"] { display: none !important; }
.WB_feed div.W_loading[requesttype="newFeed"] { display: none !important; }
.WB_feed .WB_notes[requesttype="newFeed"] { display: none !important; }
.WB_feed [node-type="lazyload"]:not(:last-child) { display: none !important; }
`);

      // 检查有新内容载入，并隐藏它们
      observer.feed.onBefore(function hideAutoLoadFeeds(feed) {
        if (feed.hasAttribute('yawf-feed-preload')) return;
        let isUnread = true;
        // 如果一天一条微博出现在了现有的微博的后面，那么可能是因为动态加载塞进来的
        if (feed.matches('.WB_feed_type[yawf-feed-preload="show"] ~ *')) isUnread = false;
        // 但是在后面不一定是现在的微博的弟弟妹妹，还可能是弟弟妹妹的孩子
        // 这是因为他们在出现时会有一个出现的动画，为了做这个动画把他们套在一个父对象里面了
        // 动画播放完成之后会被拿出来的（不过说实话，这动画一般人注意不到）
        if (feed.matches('.WB_feed_type[yawf-feed-preload="show"] ~ * *')) isUnread = false;
        // 最早出现的几条不算延迟加载的
        if (document.querySelectorAll('.WB_feed_type[yawf-feed-preload]').length < 5) isUnread = false;
        // 如果作者是自己那么不算延迟加载的（发微薄的时候会插入到最前面）
        const [author] = feedParser.author.id(feed);
        const [fauthor] = feedParser.fauthor.id(feed);
        if (init.page.config.user.idstr === (fauthor || author)) isUnread = false;
        feed.setAttribute('yawf-feed-preload', isUnread ? 'unread' : 'show');
      });

      // 自动载入新内容
      observer.dom.add(function watchNewFeedTip() {
        const tip = document.querySelector('#home_new_feed_tip');
        if (!tip) return;
        // 如果不在第一页或者有特殊的过滤条件那么没法自动载入
        const search = new URLSearchParams(location.search);
        const cannotLoad = search.get('page') > 1 || ['is_ori', 'is_pic', 'is_video', 'is_music', 'is_search'].some(key => search.get(key));
        if (cannotLoad) return;
        // 微博自己把提示的状态和数量写在了提示横幅那个对象上
        const $tip = tip && browserInfo.name === 'Firefox' && tip.wrappedJSObject || tip;
        // status 不是 followHot 而且 count > 0 就说明有新消息
        if (!$tip || $tip.status === 'followHot') return;
        if (!$tip.count) return;
        // 如果超过 50 条他会自动重新加载，我们骗他一下
        if ($tip.count > 50) $tip.count = 50;
        tip.click();
        if (tip.parentNode) tip.parentNode.removeChild(tip);
      });

    },
  });

  homepage.desktopNotify = rule.Rule({
    id: 'filter_homepage_desktop_notify',
    version: 1,
    parent: homepage.homepage,
    template: () => i18n.feedsDesktopNotify,
    ref: { whitelist: { type: 'boolean' } },
    ainit() {
      const whitelist = this.ref.whitelist.getConfig();

      // 完成过滤后再提示有未读消息
      observer.feed.onFinally(function countUnreadFeeds() {
        const unreadFeeds = Array.from(document.querySelectorAll('[yawf-feed-preload="unread"]:not([yawf-feed-notify])'));
        unreadFeeds.forEach(async feed => {
          feed.setAttribute('yawf-feed-notify', '');
          if (whitelist && feed.getAttribute('yawf-feed-display') !== 'show') return;
          const text = feedParser.text.simple(feed);
          const [author] = feedParser.author.name(feed);
          const avatar = feedParser.author.avatar(feed);
          if (!text || !author || !avatar) return;
          const truncked = text.length > 300 ? text.slice(0, 250) + '……' : text;
          const userResponse = await notifications.show({
            title: author,
            content: truncked,
            icon: avatar,
            duration: 5000 + 15 * truncked.length,
          });
          if (!userResponse) return;
          showUnreadFeeds();
          setTimeout(() => {
            document.documentElement.scrollTop += feed.getClientRects()[0].top - 80;
            const evt = document.createEvent('KeyboardEvent');
            evt.initKeyEvent('keydown', true, true, null, false, false, false, false, util.keyboard.code.J, 0);
            document.documentElement.dispatchEvent(evt);
            // 聊天窗口（打开将聊天窗口内嵌的功能后）展开的时候很影响微博阅读
            // 所以这里送一个 click 可以把聊天窗口收起来
            feed.click();
          }, 0);
        });
      });

    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/filter/profile.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

  const filter = yawf.rules.filter;

  const i18n = util.i18n;

  i18n.feedsProfileGroupTitle = {
    cn: '用户主页',
    tw: '用戶主頁',
    en: 'Profile',
  };

  const profile = filter.profile = {};
  profile.profile = rule.Group({
    parent: filter.filter,
    template: () => i18n.feedsProfileGroupTitle,
  });

  i18n.profileShowAll = {
    cn: '用户主页默认显示全部微博而非热门微博',
    tw: '用戶主頁默認顯示全部微博而非热门微博',
    en: 'Personal page show all Weibo instead of hot by default',
  };

  profile.profileShowAll = rule.Rule({
    id: 'filter_profile_show_all',
    version: 1,
    parent: profile.profile,
    template: () => i18n.profileShowAll,
    ainit() {
      observer.dom.add(function redirectPersionalWeiboRedirect() {
        const profileNav = document.querySelector('[id^="Pl_Official_ProfileFeedNav"]');
        if (!profileNav) return;
        const hotButton = profileNav.querySelector('li[action-type="search_type"][action-data*="is_hot=1"]:not([action-data*="yawf_notall=1"])');
        if (hotButton) hotButton.setAttribute('action-data', hotButton.getAttribute('action-data') + '&yawf_notall=1');
        const search = new URLSearchParams(location.search);
        if (search.get('is_hot') === '1' && search.get('yawf_notall') !== '1') {
          const all = profileNav.querySelector('li[action-type="search_type"][action-data*="is_all=1"]');
          const url = new URL('#_0', location.href);
          url.search = all.getAttribute('action-data');
          history.pushState('YAWF_' + new Date().getTime() + '_' + (Math.random() + '').slice(2), null, url.href);
          all.click();
        }
      });
      observer.dom.add(function updateUserLinksWithIsAll() {
        const links = Array.from(document.querySelectorAll([
          'a[usercard]', // 一般的用户链接
          '.WB_face a', // 微博用户头像（usercard加在链接里面的图片上了）
          '.pic_box a[suda-uatrack*="user_pic"]', // 单条微博上方的用户
          '.WB_artical .main_editor .authorinfo a', // 头条文章的作者信息
          '.webim_chat_window .chat_title a[node-type="_chatUserName"]', // 聊天窗口上的用户名
        ].map(x => x + '[href]:not([href*="is_all"])').join(',')));
        links.forEach(function (l) {
          const search = new URLSearchParams(l.search);
          search.set('is_all', 1);
          l.search = search;
        });
      });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/filter/manually.js
; (function () {

  const yawf = window.yawf;
  const config = yawf.config;
  const init = yawf.init;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const filter = yawf.rules.filter;

  const i18n = util.i18n;
  const ui = util.ui;
  const css = util.css;

  i18n.feedsManuallyGroupTitle = {
    cn: '手动隐藏',
    tw: '手動隱藏',
    en: 'Manually',
  };

  const manually = filter.manually = {};
  manually.manually = rule.Group({
    parent: filter.filter,
    template: () => i18n.feedsManuallyGroupTitle,
  });

  Object.assign(i18n, {
    manuallyHideFeed: {
      cn: '在微博右上角显示隐藏单条微博的按钮|{{reset}}|{{i}}',
      tw: '在微博右上角顯示隱藏單條微博的按鈕|{{reset}}|{{i}}',
      en: 'Show buttons at right top of each feeds for hiding|{{reset}}|{{i}}',
    },
    manuallyHideFeedReset: {
      cn: '重置',
      tw: '重設',
      en: 'Reset',
    },
    manuallyHideFeedDetail: {
      cn: '扩展会保存最近一万条被隐藏的微博的编号，并在遇到这些微博时将他们隐藏。这些微博的编号将不会包含在导出的设置中，且不会随着导入的设置而失效。重置设置或在此重置可以清空这个列表。',
    },
    manuallyHideFeedDialogTitle: {
      cn: '重置隐藏',
      tw: '重設隱藏',
      en: 'Reset Hiding',
    },
    manuallyHideFeedDialogText: {
      cn: '确定清除隐藏微博的历史记录吗，清除后之前隐藏的微博会重新显示。',
      tw: '確定清除隱藏微博的歷史記錄嗎，清除後之前隱藏的微博會重新顯示。',
      en: 'Clear history of hiding will make these feeds shown again. Clear hidden history?',
    },
    hideThisFeed: {
      cn: '隐藏',
      tw: '隱藏',
      en: 'Hide',
    },
  });

  const hideListPromise = async function () {

    const manuallyHideConfig = await config.pool('Hide', {
      uid: init.page.config.user.idstr,
      isLocal: true,
    });

    return new rule.class.OffscreenConfigItem({
      id: 'hideList',
      configPool: manuallyHideConfig,
      get initial() { return []; },
      normalize(value) {
        if (!value) return [];
        if (!Array.isArray(value)) return [];
        return value.slice(0, 1000);
      },
    });

  };

  let hideList = null;
  init.onReady(async function () {
    hideList = await hideListPromise();
  }, { priority: util.priority.BEFORE });

  manually.manuallyHideFeed = rule.Rule({
    id: 'filter_manually_hide',
    version: 1,
    parent: manually.manually,
    template: () => i18n.manuallyHideFeed,
    ref: {
      reset: {
        render() {
          const container = document.createElement('div');
          container.innerHTML = '<a class="W_btn_b yawf-manually-hide-reset" href="javascript:;"><span class="W_f14"></span></a>';
          container.querySelector('span').textContent = i18n.manuallyHideFeedReset;
          const button = container.querySelector('a');
          button.addEventListener('click', async event => {
            if (!event.isTrusted) return;
            const answer = await ui.confirm({
              id: 'yawf-import-failed',
              title: i18n.manuallyHideFeedDialogTitle,
              text: i18n.manuallyHideFeedDialogText,
            });
            if (!answer) return;
            await hideList.configPool.reset();
          });
          return button;
        },
      },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.manuallyHideFeedDetail },
    },
    ainit() {
      const createScreen = function () {
        const screen = document.createElement('div');
        screen.classList = 'WB_screen W_fr';
        return screen;
      };
      const createHideBox = function () {
        const hideBox = document.createElement('div');
        hideBox.classList = 'yawf-hide-box';
        hideBox.innerHTML = '<a href="javascript:void(0);"><i class="W_ficon ficon_close S_ficon">X</i></a>';
        hideBox.querySelector('a').title = i18n.hideThisFeed;
        return hideBox;
      };
      const hideFeedEventHandler = function (feed, mid) {
        return function (event) {
          if (!event.isTrusted) return;
          feed.setAttribute('style', 'transition: max-height opacity 0.2s; max-height: ' + feed.clientHeight + 'px; overflow: hidden; position: relative;');
          setTimeout(() => { feed.style.maxHeight = '20px'; }, 0);
          setTimeout(() => { feed.parentNode.removeChild(feed); }, 100);
          const list = hideList.getConfig();
          list.unshift(mid);
          list.splice(1e4);
          hideList.setConfig(list);
        };
      };
      observer.feed.onFinally(function (feed) {
        const [author] = feedParser.author.id(feed);
        const [fauthor] = feedParser.fauthor.id(feed);
        const authorId = fauthor || author;
        if (!authorId || authorId === init.page.config.user.idstr) return; // 自己的微博，不显示按钮
        if (feed.matches('#v6_pl_content_atmeweibo *')) return; // 不在提到页面显示，避免与“屏蔽at”发生歧义
        if (feed.hasAttribute('yawf-hide-box')) return; // 已经有了按钮，不显示按钮
        if (feed.querySelector('.screen_box .ficon_close')) return; // 广告微博右上角已经有个叉了，就不再弄一个了
        if (document.querySelector('[id^="Pl_Official_WeiboDetail__"]')) return; // 单条微博页面，不显示按钮
        if (!feed.hasAttribute('mid')) return; // 不是微博，不显示按钮
        feed.setAttribute('yawf-hide-box', 'yawf-hide-box');
        const mid = feed.getAttribute('mid');
        const screenBox = feed.querySelector('.WB_screen .screen_box');
        if (mid && screenBox) {
          const hideBox = screenBox.parentNode.insertBefore(createHideBox(), screenBox);
          hideBox.querySelector('a').addEventListener('click', hideFeedEventHandler(feed, mid));
        }
        const omid = feed.getAttribute('omid');
        const expand = feed.querySelector('.WB_expand');
        if (omid && expand) {
          const screen = expand.insertBefore(createScreen(), expand.firstChild);
          const hideBox = screen.appendChild(createHideBox());
          hideBox.querySelector('a').addEventListener('click', hideFeedEventHandler(feed, omid));
        }
      });
      css.append(`
.WB_screen .yawf-hide-box { margin: -10px 0 0 -17px; position: absolute; }
.WB_screen .yawf-hide-box .W_ficon { font-size: 18px; height: 16px; padding: 4px 0 6px; text-align: center; }
.WB_screen .yawf-hide-box ~ .screen_box { margin: -10px 0 0 -37px; position: absolute; }
.WB_screen .yawf-hide-box ~ .screen_box .W_ficon, .WB_screen .yawf-hide_box .W_ficon { width: 20px; }
.WB_screen .yawf-hide-box ~ .screen_box .layer_menu_list { right: -4px; }
.WB_expand .WB_screen { margin-top: 5px; }
`);
    },
    init() {
      observer.feed.filter(function showMyFeed(feed) {
        // 选项的开关只影响是否显示按钮，过滤规则总是执行
        const mid = feed.getAttribute('mid');
        const omid = feed.getAttribute('omid');
        const midList = hideList.getConfig();
        if (midList.includes(mid)) return 'hide';
        if (midList.includes(omid)) return 'hide';
        return null;
      }, { priority: 1e4 });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/filter/pause.js
; (function () {

  const yawf = window.yawf;
  const init = yawf.init;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const pagemenu = yawf.pagemenu;

  const filter = yawf.rules.filter;

  const i18n = util.i18n;
  const css = util.css;

  i18n.feedsPauseGroupTitle = {
    cn: '暂停过滤',
    tw: '暫停篩選',
    en: 'Pause Filter',
  };

  const pause = filter.pause = {};
  pause.pause = rule.Group({
    parent: filter.filter,
    template: () => i18n.feedsPauseGroupTitle,
  });

  Object.assign(i18n, {
    pauseFilter: {
      cn: '临时禁用所有微博过滤规则|{{i}}',
      tw: '暫時停用所有微博篩選規則|{{i}}',
      en: 'Disable all feed filters temporarily|{{i}}',
    },
    pauseFilterDetail: {
      cn: '选择后将会暂停所有微博过滤相关的功能，要查看已被隐藏的规则需要刷新页面。其他功能不受影响。',
    },
    pauseFilterMenu: {
      cn: '暂停微博过滤',
      tw: '暫停微博篩選',
      en: 'Pause Filter',
    },
    pauseFilterConfigWarning: {
      cn: '您已禁用微博过滤功能，部分设置将不生效',
      tw: '您已停用微博篩選功能，部分設定將不生效',
      en: 'Filters has been paused. Some settings may not take effect.',
    },
    pauseFilterConfigEnable: {
      cn: '启用过滤规则',
      tw: '啟用過濾規則',
      en: 'Enable Filters',
    },
    pauseFilterMenuEnabled: {
      cn: '启用微博过滤',
      tw: '啟用微博過濾',
      en: 'Enable Filters',
    },
    pauseFilterMenuDisabled: {
      cn: '暂停微博过滤',
      tw: '暫停微博篩選',
      en: 'Pause Filters',
    },
    pauseFilterFeedWarning: {
      cn: '微博过滤规则已暂停，以下微博可能未经过滤，点此启用过滤规则',
      tw: '微博篩選規則已暫停，以下微博可能未經篩選，按此啟用篩選規則',
      en: 'Feed filters has been disabled. Click here to enable filters.',
    },
  });


  pause.pauseFilter = rule.Rule({
    id: 'pause_filter',
    version: 1,
    parent: pause.pause,
    template: () => i18n.pauseFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.pauseFilterDetail },
    },
    init() {
      const rule = this;

      // 其实实现逻辑很简单，就是声明一个优先级很高的过滤规则，无论看到什么，都说不用继续过滤了
      observer.feed.filter(function pauseFilterFilter(/** @type {Element} */feed) {
        if (!rule.isEnabled()) return null;
        return 'unset'; // 既不是白名单，也不隐藏
      }, { priority: 1e6 });
      this.addConfigListener(() => { observer.feed.rerun(); });

      // 在设置窗口上显示大大的提示文字，说明过滤功能被暂停了
      const addNoticeInConfig = function () {
        if (!rule.isEnabled()) {
          const body = document.querySelector('.yawf-config-body.yawf-config-filter-pause');
          if (!body) return;
          body.classList.remove('yawf-config-filter-pause');
          const notice = document.querySelector('.yawf-config-filter-pause-notice');
          notice.parentNode.removeChild(notice);
          return;
        }
        const body = document.querySelector('.yawf-config-body:not(.yawf-config-filter-pause)');
        if (!body) return;
        body.classList.add('yawf-config-filter-pause');
        const container = document.createElement('div');
        container.innerHTML = '<div class="yawf-config-filter-pause-notice S_link1_br"><span></span><a href="javascript:;" class="W_btn_b yawf-config-filter-enable"><span class="W_f14"></span></a></div>';
        container.querySelector('span').textContent = i18n.pauseFilterConfigWarning;
        const button = container.querySelector('a');
        button.querySelector('span').textContent = i18n.pauseFilterConfigEnable;
        button.addEventListener('click', event => {
          if (!event.isTrusted) return;
          rule.setConfig(false);
        });
        body.insertBefore(container.firstChild, body.firstChild);
      };

      observer.dom.add(function configNotice() {
        addNoticeInConfig();
      });
      this.addConfigListener(() => { addNoticeInConfig(); });

      // 在漏斗图标下面的菜单里面，也放上这个
      const menuText = function () {
        if (rule.isEnabled()) return i18n.pauseFilterMenuEnabled;
        return i18n.pauseFilterMenuDisabled;
      };
      const menuitem = pagemenu.add({
        title: menuText,
        onClick: function () {
          const oldConfig = rule.getConfig();
          rule.setConfig(!oldConfig);
        },
        section: 10,
        order: 1,
      });
      ; (async function () {
        const item = await menuitem;
        rule.addConfigListener(() => { item.text(menuText); });
        item.text(menuText);
      }());

      // 在消息流顶端，再放上这个
      observer.feed.onBefore(function (feed) {
        if (!rule.isEnabled()) return;
        const type = init.page.type();
        if (type === 'fav' || type === 'like') return;
        const list = feed.closest('.WB_feed');
        if (!list) return; // 搜索页面
        const container = list.parentNode;
        const sibling = container.previousSibling;
        if (sibling?.nodeType === Node.ELEMENT_NODE) {
          if (sibling.matches('.yawf-feed-filter-pause-notice')) return;
        }
        const wrap = document.createElement('div');
        wrap.innerHTML = '<div class="yawf-feed-filter-pause-notice S_bg2"><a class="S_txt1"></a></div>';
        const button = wrap.querySelector('a');
        button.textContent = i18n.pauseFilterFeedWarning;
        button.addEventListener('click', event => {
          if (!event.isTrusted) return;
          rule.setConfig(false);
        });
        container.parentNode.insertBefore(wrap.firstChild, container);
      });
      this.addConfigListener(() => {
        if (rule.isEnabled()) return;
        const notice = document.querySelector('.yawf-feed-filter-pause-notice');
        if (notice) notice.parentNode.removeChild(notice);
      });

      css.append(`
.yawf-config-filter-pause-notice { border-width: 5px; border-style: solid; padding: 10px; font-size: 115%; }
.yawf-config-filter-enable { float: right; margin: -2px; }
.yawf-feed-filter-pause-notice { text-align: center; line-height: 31px; margin-bottom: 10px; border-radius: 3px; font-size: 115%; }
`);
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/content/content.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.contentTabTitle = {
    cn: '内容',
    tw: '內容',
    en: 'Content',
  };

  const content = yawf.rules.content = {};
  content.content = rule.Tab({
    template: () => i18n.contentTabTitle,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/content/text.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const i18n = util.i18n;

  Object.assign(i18n, {
    contentTextGroupTitle: {
      cn: '按内容关键词过滤',
      tw: '按內容關鍵字篩選',
      en: 'Filter by Content Keywords',
    },
    textContentShow: {
      cn: '总是显示包含以下内容的微博||关键词{{items}}',
      tw: '总是显示包含以下內容的微博||關鍵字{{items}}',
      en: 'Always show feeds with these content||keyword {{items}}',
    },
    textContentHide: {
      cn: '隐藏包含以下内容的微博||关键词{{items}}',
      tw: '隱藏包含以下內容的微博||關鍵字{{items}}',
      en: 'Hide feeds with these content||keyword {{items}}',
    },
    textContentReason: {
      cn: '关键词“{1}”',
      tw: '关键字「{1}」',
      en: 'content "{1}"',
    },
  });

  class TextFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function textFeedFilter(/** @type {Element} */feed) {
        const text = feedParser.text.simple(feed).toLowerCase();
        const keywords = rule.ref.items.getConfig();
        const contain = keywords.find(keyword => text.includes(keyword.toLowerCase()));
        if (!contain) return null;
        const reasonText = contain.length > 8 ? contain.slice(0, 6) + '…' : contain;
        const reason = i18n.textContentReason.replace('{1}', () => reasonText);
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: TextFeedRule,
    tab: 'content',
    key: 'text',
    version: 1,
    type: 'strings',
    title: () => i18n.contentTextGroupTitle,
    details: {
      hide: {
        title: () => i18n.textContentHide,
      },
      show: {
        title: () => i18n.textContentShow,
      },
    },
    fast: {
      types: [['text'], ['comment']],
      radioGroup: 'text',
      render: feedParser.fast.render.text,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/content/regex.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const i18n = util.i18n;
  i18n.contentRegexGroupTitle = {
    cn: '按内容正则式过滤',
    hk: '按內容正則式篩選',
    tw: '按內容正規式篩選',
    en: 'Filter by Content Regex',
  };

  Object.assign(i18n, {
    regexContentShow: {
      cn: '总是显示匹配以下正则表达式的微博||正则式{{items}}',
      hk: '总是显示匹配以下正則表達式的微博||正則式{{items}}',
      tw: '总是显示匹配以下正規表示式的微博||正規式{{items}}',
      en: 'Always show feeds match these regexen||Regexen {{items}}',
    },
    regexContentHide: {
      cn: '隐藏匹配以下正则表达式的微博||正则式{{items}}',
      hk: '隱藏匹配以下正則表達式的微博||正則式{{items}}',
      tw: '隱藏匹配以下正規表示式的微博||正規式{{items}}',
      en: 'Hide feeds match these regexen||Regexen {{items}}',
    },
    regexContextReason: {
      cn: '正则匹配',
      hk: '正則符合',
      tw: '正規符合',
      en: 'regexp matched',
    },
  });

  class RegexFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function regexFeedFilter(/** @type {Element} */feed) {
        const text = feedParser.text.detail(feed);
        const regexen = rule.ref.items.getConfigCompiled();
        const matchReg = regexen.find(regex => regex.test(text));
        if (!matchReg) return null;
        const reason = (matchReg + '').match(/\(\?=\|(([^)]|\\\))*)\)/)?.[1] ?? i18n.regexContextReason;
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: RegexFeedRule,
    tab: 'content',
    key: 'regex',
    version: 1,
    type: 'regexen',
    title: () => i18n.contentRegexGroupTitle,
    details: {
      hide: {
        title: () => i18n.regexContentHide,
      },
      show: {
        title: () => i18n.regexContentShow,
      },
    },
    fast: {
      types: [['multitext'], ['text', 'comment', 'multitextcomment']],
      radioGroup: 'text',
      render: feedParser.fast.render.regex,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/account/account.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.authorTabTitle = { cn: '作者', tw: '作者', en: 'Author' };
  const author = yawf.rules.author = {};
  author.author = rule.Tab({
    template: () => i18n.authorTabTitle,
  });

  i18n.originalTabTitle = { cn: '原作', tw: '原作', en: 'Original' };
  const original = yawf.rules.original = {};
  original.original = rule.Tab({
    template: () => i18n.originalTabTitle,
  });

  i18n.mentionTabTitle = { cn: '提到', tw: '提到', en: 'Mention' };
  const mention = yawf.rules.mention = {};
  mention.mention = rule.Tab({
    template: () => i18n.mentionTabTitle,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/account/author.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;
  const init = yawf.init;

  const i18n = util.i18n;

  Object.assign(i18n, {
    accountAuthorGroupTitle: {
      cn: '按作者过滤',
      tw: '按作者篩選',
      en: 'Filter by Author',
    },
    accountAuthorShow: {
      cn: '总是显示以下作者的微博||作者{{items}}',
      tw: '總是顯示以下作者的微博||作者{{items}}',
      en: 'Always show feeds from these authors||author {{items}}',
    },
    accountAuthorHide: {
      cn: '隐藏以下作者的微博||作者{{items}}',
      tw: '隱藏以下作者的微博||作者{{items}}',
      en: 'Hide feeds from these authors||author {{items}}',
    },
    accountAuthorReason: {
      cn: '作者 @{1}',
      tw: '作者 @{1}',
      en: 'posted by @{1}',
    },
  });

  class AuthorFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function authorFilterFeedFilter(/** @type {Element} */feed) {
        const oid = init.page.oid();
        const [author] = feedParser.author.id(feed);
        const [fauthor] = feedParser.fauthor.id(feed);
        // 个人主页不按照作者隐藏（否则就会把所有东西都藏起来……）
        const pageType = init.page.type();
        const isShowRule = rule.feedAction === 'show';
        const isProfile = pageType === 'profile';
        const isGroup = pageType === 'group';
        if ((fauthor ?? author) === oid && !isShowRule && isProfile) return null;
        const accounts = rule.ref.items.getConfig();
        const ignoreFastAuthor = isGroup && !isShowRule;
        const ignoreAuthor = ignoreFastAuthor && !feedParser.isFast(feed);
        if (!ignoreAuthor) {
          const contain = accounts.find(account => account.id === author);
          if (contain) {
            const reason = i18n.accountAuthorReason.replace('{1}', () => feedParser.author.name(feed));
            return { result: rule.feedAction, reason };
          }
        }
        if (!ignoreFastAuthor) {
          const fcontain = accounts.find(account => account.id === fauthor);
          if (fcontain) {
            const reason = i18n.accountAuthorReason.replace('{1}', () => feedParser.fauthor.name(feed));
            return { result: rule.feedAction, reason };
          }
        }
        return null;
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: AuthorFeedRule,
    tab: 'author',
    key: 'id',
    version: 1,
    type: 'users',
    title: () => i18n.accountAuthorGroupTitle,
    details: {
      hide: {
        title: () => i18n.accountAuthorHide,
      },
      show: {
        title: () => i18n.accountAuthorShow,
      },
    },
    fast: {
      types: [['author', 'account'], ['original', 'mention', 'commentuser']],
      radioGroup: 'author',
      render: feedParser.fast.render.author,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/account/forward.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const i18n = util.i18n;

  Object.assign(i18n, {
    accountAuthorForwardGroupTitle: {
      cn: '按作者过滤转发微博',
      tw: '按作者篩選轉發微博',
      en: 'Filter by Forwarding Author',
    },
    accountAuthorForwardShow: {
      cn: '总是显示以下作者转发的微博||帐号{{items}}',
      tw: '总是显示以下作者轉發的微博||帳號{{items}}',
      en: 'Always show feeds from these authors\' forwarding||author {{items}}',
    },
    accountAuthorForwardHide: {
      cn: '总是隐藏以下作者转发的微博||帐号{{items}}',
      tw: '总是隱藏以下作者轉發的微博||帳號{{items}}',
      en: 'Hide feeds from these authors\' forwarding||author {{items}}',
    },
    accountAuthorForwardReason: {
      cn: '由 @{1} 转发',
      tw: '由 @{1} 轉發',
      en: 'forwarded by @{1}',
    },
  });

  class AuthorForwardFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function authorFilterFeedFilter(/** @type {Element} */feed) {
        const authors = [];
        // 如果一条微博是传统的转发微博，转发作者计入在内
        // 如果一条微博是快转微博，被快转的微博如果是转发微博，被快转的微博的作者同样计入在内
        if (feedParser.isForward(feed)) {
          const [id] = feedParser.author.id(feed);
          const [name] = feedParser.author.name(feed);
          authors.push({ id, name });
        }
        // 如果一条微博是快转微博，快转的作业计入在内
        if (feedParser.isFast(feed)) {
          const [id] = feedParser.fauthor.id(feed);
          const [name] = feedParser.fauthor.name(feed);
          authors.push({ id, name });
        }
        if (!authors.length) return null;
        const accounts = rule.ref.items.getConfig();
        const reasonUser = authors.find(author => accounts.some(account => author.id === account.id));
        if (!reasonUser) return null;
        const reason = i18n.accountAuthorForwardReason.replace('{1}', () => reasonUser.name);
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: AuthorForwardFeedRule,
    tab: 'author',
    key: 'forward_id',
    version: 1,
    type: 'users',
    title: () => i18n.accountAuthorForwardGroupTitle,
    details: {
      hide: {
        title: () => i18n.accountAuthorForwardHide,
      },
      show: {
        title: () => i18n.accountAuthorForwardShow,
      },
    },
    fast: {
      types: [[], ['author', 'original', 'mention', 'account', 'commentuser']],
      radioGroup: 'author',
      render: feedParser.fast.render.forward,
    },
  });


}());
//#endregion
//#region @require yaofang://content/rule/filter/account/original.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;
  const request = yawf.request;

  const rules = yawf.rules;
  const original = rules.original;

  const i18n = util.i18n;

  Object.assign(i18n, {
    accountOriginalGroupTitle: {
      cn: '按原作者过滤',
      tw: '按原作者篩選',
      en: 'Filter by Original',
    },
    accountOriginalShow: {
      cn: '总是显示转发自以下帐号的微博||原作者{{items}}',
      tw: '總是顯示轉發自以下帳號的微博||原作者{{items}}',
      en: 'Always show feeds forwarded from these authors||original {{items}}',
    },
    accountOriginalHide: {
      cn: '隐藏转发自以下帐号的微博||原作者{{items}}',
      tw: '隱藏轉發自以下帳號的微博||原作者{{items}}',
      en: 'Hide feeds forwarded from these authors||original {{items}}',
    },
    accountOriginalDiscover: {
      cn: '按原创作者过滤的规则对发现页面的作者生效',
      tw: '按原創作者過濾的規則對發現頁面的作者生效',
      en: 'Rules filter by originals apply to authors in discovery pages',
    },
    accountOriginalReason: {
      cn: '转发自 @{1}',
      tw: '轉發自 @{1}',
      en: 'forwarded from @{1}',
    },
    accountOriginalDiscoverReason: {
      cn: '作者 @{1}',
      tw: '作者 @{1}',
      en: 'author @{1}',
    },
    accountOriginalFastForwardReason: {
      cn: '快转自 @{1}',
      tw: '快轉自 @{1}',
      en: 'fast forwarded from @{1}',
    },
    accountOriginalFollower: {
      cn: '隐藏转发自|粉丝数量超过{{count}}万的博主的微博||例外帐号{{account}}',
      tw: '隱藏轉發自|粉絲數量超過{{count}}萬的博主的微博||例外帐号{{account}}',
      en: 'Hide feeds forwarded from authors with | more than {{count}}0,000 fans||Exception {{account}}',
    },
  });

  const additionalRules = function () {
    original.id.discover = rule.Rule({
      id: 'filter_original_discover',
      version: 1,
      parent: original.id.id,
      template: () => i18n.accountOriginalDiscover,
    });
  };

  class OriginalFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function originalFilterFeedFilter(/** @type {Element} */feed) {
        const accounts = rule.ref.items.getConfig();

        const [original] = feedParser.original.id(feed);
        if (accounts.find(account => account.id === original)) {
          const name = feedParser.original.name(feed);
          const reason = i18n.accountOriginalReason.replace('{1}', () => name);
          return { result: rule.feedAction, reason };
        }

        const pageType = init.page.type();
        const isDiscover = pageType === 'discover';
        const asDiscover = rules.original.id.discover.isEnabled() && isDiscover;
        const asFastForward = feedParser.isFast(feed);
        if (asDiscover || asFastForward) {
          const [author] = feedParser.author.id(feed);
          if (accounts.find(account => author === account.id)) {
            const name = feedParser.author.name(feed);
            if (asDiscover) {
              const reason = i18n.accountOriginalDiscoverReason.replace('{1}', () => name);
              return { result: rule.feedAction, reason };
            } else {
              const reason = i18n.accountOriginalFastForwardReason.replace('{1}', () => name);
              return { result: rule.feedAction, reason };
            }
          }
        }

        return null;
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: OriginalFeedRule,
    tab: 'original',
    key: 'id',
    type: 'users',
    version: 1,
    title: () => i18n.accountOriginalGroupTitle,
    details: {
      hide: {
        title: () => i18n.accountOriginalHide,
      },
      show: {
        title: () => i18n.accountOriginalShow,
      },
    },
    before: {
      show: additionalRules,
    },
    fast: {
      types: [['original', 'account'], ['author', 'mention', 'commentuser']],
      radioGroup: 'original',
      render: feedParser.fast.render.original,
    },
  });

  original.id.follower = rule.Rule({
    v7Support: true,
    id: 'filter_original_follower',
    version: 1,
    parent: original.id.id,
    template: () => i18n.accountOriginalFollower,
    ref: {
      count: { type: 'range', min: 1, max: 100, initial: 10 },
      account: { type: 'users' },
    },
    init() {
      const rule = this;
      observer.feed.filter(async function originalFollowerFeedFilter(/** @type {Element} */feed) {
        if (!rule.isEnabled()) return null;
        const original = feedParser.original.id(feed);
        if (feedParser.isFast(feed)) {
          original.push(feedParser.author.id(feed));
        }
        const accounts = rule.ref.account.getConfig();
        const filtered = original.filter(id => !accounts.find(user => user.id === id));
        const followers = await Promise.all(filtered
          .map(id => request.userInfo({ id }).then(user => user.follower))
        );
        const limit = rule.ref.count.getConfig() * 1e4;
        const match = followers.some(i => i >= limit);
        if (!match) return null;
        return { result: 'hide' };
      }, { priority: this.priority });
      this.addConfigListener(() => { observer.feed.rerun(); });
      this.ref.account.addConfigListener(() => { observer.feed.rerun(); });
      this.ref.count.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/account/mention.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const i18n = util.i18n;

  Object.assign(i18n, {
    accountMentionGroupTitle: {
      cn: '按提到过滤',
      tw: '按提到篩選',
      en: 'Filter by Mention',
    },
    accountMentionShow: {
      cn: '总是显示提到以下帐号的微博||作者{{items}}',
      tw: '總是顯示提到以下帳號的微博||作者{{items}}',
      en: 'Always show feeds mentioned these accounts||mention {{items}}',
    },
    accountMentionHide: {
      cn: '隐藏提到以下帐号的微博||作者{{items}}',
      tw: '隱藏提到以下帳號的微博||作者{{items}}',
      en: 'Hide feeds mentioned these accounts||mention {{items}}',
    },
    accountMentionReason: {
      cn: '提到了 @{1}',
      tw: '提到了 @{1}',
      en: 'mentioned @{1}',
    },
  });

  class MentionFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function mentionFilterFeedFilter(/** @type {Element} */feed) {
        const mentions = new Set(feedParser.mention.name(feed));
        const accounts = rule.ref.items.getConfig();
        const contain = accounts.find(account => mentions.has(account));
        if (!contain) return null;
        const reason = i18n.accountMentionReason.replace('{1}', () => contain);
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: MentionFeedRule,
    tab: 'mention',
    key: 'name',
    version: 1,
    type: 'usernames',
    title: () => i18n.accountMentionGroupTitle,
    details: {
      hide: {
        title: () => i18n.accountMentionHide,
      },
      show: {
        title: () => i18n.accountMentionShow,
      },
    },
    fast: {
      types: [['mention', 'account'], ['author', 'original']],
      radioGroup: 'mention',
      render: feedParser.fast.render.mention,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/topic/topic.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.topicTabTitle = {
    cn: '话题',
    tw: '話題',
    en: 'Topic',
  };

  const topic = yawf.rules.topic = {};
  topic.topic = rule.Tab({
    template: () => i18n.topicTabTitle,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/topic/text.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const i18n = util.i18n;

  Object.assign(i18n, {
    topicGroupTitle: {
      cn: '按话题过滤',
      tw: '按話題篩選',
      en: 'Filter by Topics',
    },
    topicShow: {
      cn: '总是显示包含以下话题的微博||话题{{items}}',
      tw: '总是显示包含以下話題的微博||話題{{items}}',
      en: 'Always show feeds with these topics||topic {{items}}',
    },
    topicHide: {
      cn: '隐藏包含以下话题的微博||话题{{items}}',
      tw: '隱藏包含以下話題的微博||話題{{items}}',
      en: 'Hide feeds with these topics||topic {{items}}',
    },
    topicReason: {
      cn: '提到话题 {1}',
      tw: '提到話題 {1}',
      en: 'mentioned topic {1}',
    },
  });

  class TopicFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function topicFeedFilter(/** @type {Element} */feed) {
        const text = feedParser.topic.text(feed);
        const topics = rule.ref.items.getConfig();
        const contain = topics.find(topic => text.includes(topic));
        if (!contain) return null;
        const reason = i18n.topicReason.replace('{1}', () => contain);
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: TopicFeedRule,
    tab: 'topic',
    key: 'text',
    version: 1,
    type: 'topics',
    title: () => i18n.topicGroupTitle,
    details: {
      hide: {
        title: () => i18n.topicHide,
      },
      show: {
        title: () => i18n.topicShow,
      },
    },
    fast: {
      types: [['topic'], []],
      radioGroup: 'topic',
      render: feedParser.fast.render.topic,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/source/source.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.sourceTabTitle = {
    cn: '来源',
    tw: '來源',
    en: 'Source',
  };

  const source = yawf.rules.source = {};
  source.source = rule.Tab({
    template: () => i18n.sourceTabTitle,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/source/text.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const i18n = util.i18n;

  Object.assign(i18n, {
    sourceGroupTitle: {
      cn: '按来源过滤',
      tw: '按來源篩選',
      en: 'Filter by Sources',
    },
    sourceShow: {
      cn: '总是显示来自以下来源的微博||来源{{items}}',
      tw: '总是显示來自以下來源的微博||來源{{items}}',
      en: 'Always show feeds from these sources||source {{items}}',
    },
    sourceHide: {
      cn: '隐藏来自以下来源的微博||来源{{items}}',
      tw: '隱藏來自以下來源的微博||來源{{items}}',
      en: 'Hide feeds from these sources||source {{items}}',
    },
    sourceReason: {
      cn: '来自 {1}',
      tw: '來自 {1}',
      en: 'posted via {1}',
    },
  });

  class SourceFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function sourceFeedFilter(/** @type {Element} */feed) {
        const text = feedParser.source.text(feed);
        const sources = rule.ref.items.getConfig();
        const contain = sources.some(source => text.includes(source));
        if (!contain) return null;
        const reason = i18n.sourceReason.replace('{1}', () => text);
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.feed.rerun(); });
    }
  }

  rule.groups({
    baseClass: SourceFeedRule,
    tab: 'source',
    key: 'text',
    version: 1,
    type: 'strings',
    title: () => i18n.sourceGroupTitle,
    details: {
      hide: {
        title: () => i18n.sourceHide,
      },
      show: {
        title: () => i18n.sourceShow,
      },
    },
    fast: {
      types: [['source'], []],
      radioGroup: 'source',
      render: feedParser.fast.render.source,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/more/more.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.moreTabTitle = {
    cn: '更多',
    tw: '其他',
    en: 'More',
  };

  const more = yawf.rules.more = {};
  more.more = rule.Tab({
    template: () => i18n.moreTabTitle,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/more/myself.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;
  const init = yawf.init;

  const more = yawf.rules.more;

  const i18n = util.i18n;
  i18n.otherWhitelistTitle = {
    cn: '显示以下内容（不计入白名单）',
    tw: '顯示以下內容（不計入白名單）',
    en: 'Show following content (not regard as whitelist)',
  };

  const showthese = more.showthese = {};
  showthese.showthese = rule.Group({
    parent: more.more,
    template: () => i18n.otherWhitelistTitle,
  });

  i18n.showMyFeedDetail = {
    cn: '自己的微博',
    tw: '自己的微博',
    en: 'Feeds by myself',
  };

  showthese.showMyFeed = rule.Rule({
    v7Support: true,
    id: 'filter_my_feed',
    version: 1,
    parent: showthese.showthese,
    template: () => i18n.showMyFeedDetail,
    initial: true,
    init() {
      const rule = this;
      observer.feed.filter(function showMyFeed(feed) {
        if (!rule.isEnabled()) return null;
        const me = init.page.uid();
        const [author] = feedParser.author.id(feed);
        const [fauthor] = feedParser.fauthor.id(feed);
        if (me === author || me === fauthor) return 'showme';
        return null;
      }, { priority: 1e4 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.showMyOriginalDetail = {
    cn: '自己微博的转发',
    tw: '自己微博的轉發',
    en: 'Forward of my Feeds',
  };

  showthese.showMyOriginal = rule.Rule({
    v7Support: true,
    id: 'filter_my_original',
    version: 1,
    parent: showthese.showthese,
    template: () => i18n.showMyOriginalDetail,
    init() {
      const rule = this;
      observer.feed.filter(function showMyOriginal(feed) {
        if (!rule.isEnabled()) return null;
        const me = init.page.uid();
        const [original] = feedParser.original.id(feed);
        const [author] = feedParser.isFast(feed) ? feedParser.author.id(feed) : [];
        if (me === original || me === author) return 'showme';
        return null;
      }, { priority: 1e4 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.showMentionMeDetail = {
    cn: '提到自己的微博',
    tw: '提到自己的微博',
    en: 'Feeds mentioned myself',
  };

  showthese.showMentionMe = rule.Rule({
    v7Support: true,
    id: 'filter_mention_me',
    version: 1,
    parent: showthese.showthese,
    template: () => i18n.showMentionMeDetail,
    init() {
      const rule = this;
      observer.feed.filter(function showMentionMe(feed) {
        if (!rule.isEnabled()) return null;
        const me = init.page.uid();
        const mentions = feedParser.mention.name(feed);
        if (mentions.includes(me)) return 'showme';
        return null;
      }, { priority: 1e4 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  observer.feed.filter(function showMyFavOrLike(feed) {
    const type = init.page.type();
    if (type === 'fav' || type === 'like') return 'showfav';
    return null;
  }, { priority: 1e7 });

}());
//#endregion
//#region @require yaofang://content/rule/filter/more/commercial.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;
  const init = yawf.init;

  const more = yawf.rules.more;

  const i18n = util.i18n;
  i18n.moreCommercialGroupTitle = {
    cn: '隐藏以下微博 - 广告/商品/推荐',
    tw: '隱藏以下內容 - 廣告/商品/推薦',
    en: 'Hide following content - Ad / Promotion / Recommend',
  };

  const commercial = more.commercial = {};
  commercial.commercial = rule.Group({
    parent: more.more,
    template: () => i18n.moreCommercialGroupTitle,
  });

  i18n.adFeedFilter = {
    cn: '推广微博/粉丝通微博/品牌速递/好友赞过的微博/内容推荐 {{i}}',
    tw: '推廣微博/粉絲通微博/品牌速遞/好友贊過的微博/內容推薦 {{i}}',
    en: 'Ad Weibo / Inserted not followed Weibo {{i}}',
  };
  i18n.adFeedFilterDetail = {
    cn: '这些微博一般出现在您的首页，带有“推荐”“好友赞过”等标记，但大多来自您并未关注的人。',
  };

  commercial.ad = rule.Rule({
    v7Support: true,
    id: 'filter_ad_feed',
    version: 109,
    parent: commercial.commercial,
    template: () => i18n.adFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.adFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function adFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        // TODO 我也不确定这个属性是做什么的
        // if (feed.promotion) console.log('FILTERTEST promotion: %o (%o)', feed.promotion, feed);
        // if (feed.attitude_dynamic_adid) console.log('FILTERTEST attitude_dynamic_adid: %o (%o)', feed.attitude_dynamic_adid, feed);
        // 未关注的人的微博
        if (['home', 'group'].includes(init.page.type()) && !feed.user.following) return 'hide';
        // 某某赞过的微博
        if (feed.title?.type === 'likerecommend') return 'hide';
        // 热推 / 广告之类
        if (feed.content_auth === 5) return 'hide';
        if (feed.retweeted_status?.content_auth === 5) return 'hide';
        return null;
      }, { priority: 1e6 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.fansTopFeedFilter = {
    cn: '粉丝头条 {{i}}',
    tw: '粉絲頭條 {{i}}',
    en: 'Fans top (headline weibo) {{i}}',
  };
  i18n.fansTopFeedFilterDetail = {
    cn: '粉丝头条会显示在首页消息流的顶部，一般带有“热门”等标记。粉丝头条是新浪微博官方的一项推广产品，使用粉丝头条的微博可在 24 小时内出现在所有粉丝首页的第一位。粉丝头条微博总是来自于您关注的人。',
  };

  commercial.fansTop = rule.Rule({
    v7Support: true,
    id: 'filter_fans_top',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.fansTopFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.fansTopFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function fansTopFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.promotion?.adtype === 8) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.weiboProductFeedFilter = {
    cn: '带有微博橱窗商品链接的微博{{i}}',
    tw: '帶有微博櫥窗商品連接的微博{{i}}',
    en: 'Weibo with link to weibo shop {{i}}',
  };
  i18n.weiboProductFeedFilterDetail = {
    cn: '带有微博橱窗商品链接的微博，点击链接可以到商品的购买页面。勾选以隐藏此类微博。',
  };

  i18n.weiboProductLikeFeedFilter = {
    cn: '带有商品链接的微博{{i}}',
    tw: '帶有商品鏈接的微博{{i}}',
    en: 'Weibo with link to weibo shop / taobao {{i}}',
  };

  commercial.weiboProductLike = rule.Rule({
    v7Support: true,
    id: 'filter_weibo_product_like',
    version: 75,
    parent: commercial.commercial,
    template: () => i18n.weiboProductLikeFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.weiboProductLikeFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function taobaoProductFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (Array.isArray(feed.url_struct)) {
          if (feed.url_struct.find(url => /taobao\.png$/.test(url.url_type_pic))) return 'hide';
          if (feed.url_struct.find(url => url.object_type === 'product')) return 'hide';
          if (feed.url_struct.find(url => /^https:\/\/m\.tb\.cn\//.test(url.long_url))) return 'hide';
          if (feed.url_struct.find(url => /buy\.png$/.test(url.url_type_pic))) return 'hide';
          if (feed.url_struct.find(url => /^https:\/\/shop\.sc\.weibo\.com\//.test(url.long_url))) return 'hide';
          if (feed.url_struct.find(url => /shop_sc_weibo/.test(url.actionlog?.oid))) return 'hide';
        }
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.weiboPayGiftFeedFilter = {
    cn: '带有微博支付积分礼品兑换卡片的微博{{i}}',
    tw: '帶有微博支付積分禮品兌換卡片的微博{{i}}',
    en: 'Weibo with Weibo pay with points gift exchange card{{i}}',
  };
  i18n.weiboPayGiftFeedFilterDetail = {
    cn: '微博支付积分指通过在微博中消费（如购买会员）产生的积分，并非微博等级经验值，可以用于兑换礼品（礼品一般是优惠券或抽奖）。勾选本选项以隐藏带有此类兑换信息的卡片的微博。',
  };

  commercial.weiboPay = rule.Rule({
    id: 'filter_weibo_pay',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.weiboPayGiftFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.weiboPayGiftFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function weiboProductFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('div[action-data*="objectid=1042025:"]')) return 'hide';
        if (feed.querySelector('a[suda-uatrack*="1042025-webpage"]')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.userLikeFeedFilter = {
    cn: '混入个人主页的赞过的微博',
    hk: '混入個人主頁的贊過的微博',
    tw: '混入個人主頁的贊過的微博',
    en: 'Weibo Liked in Personal page',
  };
  i18n.userLikeFeedFilterDetail = {
    cn: '个人主页消息流中混入的微博。',
  };

  commercial.userLike = rule.Rule({
    v7Support: true,
    id: 'filter_user_like',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.userLikeFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.userLikeFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function userLikeFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (init.page.type() !== 'profile') return null;
        const oid = String(init.page.route.params.id);
        if (!oid) return null;
        const [author] = feedParser.author.id(feed);
        const [fauthor] = feedParser.fauthor.id(feed);
        if (String(fauthor || author) !== oid) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.fakeWeiboFilter = {
    cn: '混入微博列表的推荐内容（好友推荐、热门话题）{{<i>}}',
    hk: '混入微博列表的推薦內容（好友推薦、熱門話題）{{<i>}}',
    tw: '混入微博列表的推薦內容（好友推薦、熱門話題）{{<i>}}',
    en: 'Other contents in Weibo list{{<i>}}',
  };
  i18n.fakeWeiboFilterDetail = {
    cn: '所有在微博与微博之间混入的其他内容，这些内容往往不是微博消息，比如“好友推荐”“热门话题”等。',
  };

  // 这些内容不是真正的消息，各类过滤规则处理这些内容可能有各种问题
  // 所以这条规则被设置为最高的优先级，而且如果关闭了这个设置项，就直接让这些东西显示出来
  commercial.fakeWeibo = rule.Rule({
    id: 'filter_fake_weibo',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.fakeWeiboFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.fakeWeiboFilterDetail },
    },
    init() {
      // const rule = this;
      observer.feed.filter(function fakeWeiboFilter(feed) {
        return null;
        // if (rule.isEnabled() && init.page.type() !== 'search') return 'hide';
        // return 'unset';
      }, { priority: 1e6 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });


}());
//#endregion
//#region @require yaofang://content/rule/filter/more/content.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

  const more = yawf.rules.more;

  const feedParser = yawf.feed;

  const i18n = util.i18n;
  i18n.moreContentGroupTitle = {
    cn: '隐藏以下微博 - 特定内容',
    tw: '隱藏以下內容 - 某些内容',
    en: 'Hide following content - Certain Content',
  };

  const content = more.content = {};
  content.content = rule.Group({
    parent: more.more,
    template: () => i18n.moreContentGroupTitle,
  });

  i18n.deletedForwardFilter = {
    cn: '已删除或无法查看的微博的转发{{i}}',
    tw: '已刪除或無法查看的微博的轉發{{i}}',
    en: 'Forward of deleted / inaccessible Weibo{{i}}',
  };
  i18n.deletedForwardFilterDetail = {
    cn: '包括因为删除或对微博设置了隐私权限而使您无法看到原文的微博。这些微博您只能看见转发者的评论，但是无法看到原微博的内容。',
  };

  content.deletedForward = rule.Rule({
    v7Support: true,
    id: 'filter_deleted_forward',
    version: 1,
    parent: content.content,
    template: () => i18n.deletedForwardFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.deletedForwardFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function deletedForwardFilter(feed) {
        if (!rule.isEnabled()) return null;
        const isForward = feedParser.isForward(feed);
        if (!isForward) return null;
        if (feed.retweeted_status) {
          if (feed.retweeted_status.visible?.list_id > 0) return 'hide';
          if (feed.retweeted_status.deleted) return 'hide';
        }
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.commentAndForwardFilter = {
    cn: '回复并转发的微博{{i}}',
    tw: '回覆並轉發的微博{{i}}',
    en: 'Weibo forwarded as reply{{i}}',
  };
  i18n.commentAndForwardFilterDetail = {
    cn: '在回复他人微博时选择“同时转发到我的微博”会将回复和被回复的内容转发为一条微博，勾选后会隐藏回复时转发的微博。',
  };

  content.commentAndForward = rule.Rule({
    id: 'filter_comment_and_forward',
    version: 1,
    parent: content.content,
    template: () => i18n.commentAndForwardFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.commentAndForwardFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function commentAndForwardFilter(feed) {
        if (!rule.isEnabled()) return null;
        const replyText = ['回复', '回復', '回覆', 'Reply', 'reply'];
        if (!feedParser.isForward(feed)) return null;
        const content = feed.querySelector('[node-type="feed_list_content"]'); if (!content) return null;
        if (!content.firstChild || !replyText.includes(content.firstChild.textContent.trim())) return null;
        if (!content.childNodes[1] || !content.childNodes[1].getAttribute('usercard')) return null;
        return 'hide';
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.voteFeedFilter = {
    cn: '投票微博{{i}}',
    tw: '投票微博{{i}}',
    en: 'Voting weibo{{i}}',
  };
  i18n.voteFeedFilterDetail = {
    cn: '包括在发布微博时选择投票的微博，也包括在投票时自动发出的微博。',
  };

  content.vote = rule.Rule({
    v7Support: true,
    id: 'filter_vote',
    version: 1,
    parent: content.content,
    template: () => i18n.voteFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.voteFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function voteFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (Array.isArray(feed.url_struct)) {
          if (feed.url_struct.find(url => /^1022:231716/.test(url.actionlog?.oid))) return 'hide';
          if (feed.url_struct.find(url => /https:\/\/vote\.weibo\.com\//.test(url.long_url))) return 'hide';
          if (feed.url_struct.find(url => /https:\/\/vote\.weibo\.com\//.test(url.ori_url))) return 'hide';
          if (feed.url_struct.find(url => /sinaweibo:\/\/browser\?url=https%3A%2F%2Fvote\.weibo\.com%2F/.test(url.ori_url))) return 'hide';
        }
        if (feed.page_info?.object_type === 'hudongvote') return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.redPackFeedFilter = {
    cn: '抢红包微博{{i}}',
    tw: '搶紅包微博{{i}}',
    en: 'Weibo with Red Envelopes Rush {{i}}',
  };
  i18n.redPackFeedFilterDetail = {
    cn: '抢红包活动自动发布的微博',
  };

  content.redPack = rule.Rule({
    id: 'filter_red_pack',
    version: 1,
    parent: content.content,
    template: () => i18n.redPackFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.redPackFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function redPackFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('.PCD_event_red2014')) return 'hide';
        if (feed.querySelector('.WB_feed_spec_red2015')) return 'hide';
        if (feed.querySelector('.WB_feed_spec_red16')) return 'hide';
        if (feed.querySelector('.media-redpacket')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.imageTagFeedFilter = {
    cn: '配图带有标签的微博{{i}}',
    tw: '配圖帶有標記的微博{{i}}',
    en: 'Feeds with tags on images {{i}}',
  };
  i18n.imageTagFeedFilterDetail = {
    cn: '微博允许给配图添加标签，标签可以是文本、话题、用户以及商品链接。选择这条规则后将不会看到对应的微博，另外您可以只隐藏[[clean_feed_pic_tag]]。',
  };
  content.imageTag = rule.Rule({
    // 虽然 V7 网页目前还不支持查看标签，不过我只管有没有，不管看得见看不见
    // 上面这行评论是之前打上去的，我没空检查他现在有没有
    v7Support: true,
    id: 'filter_image_tag',
    version: 47,
    parent: content.content,
    template: () => i18n.imageTagFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.imageTagFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function imageTagFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        const pics = feedParser.pics.info(feed);
        if (pics.find(pic => pic.pic_tags?.length)) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.koiForwardFeedFilter = {
    cn: '转发图标是锦鲤的微博（转发抽奖微博）',
    tw: '轉發圖示是錦鯉的微博（轉發抽獎微博）',
    en: 'Forward icon as a koi (forward this weibo for draw)',
  };
  i18n.koiForwardFeedFilterDetail = {
    cn: '微博会将转发抽奖的消息的转发按钮显示成一条鱼的图标。这项规则会根据这个图标作为判断依据隐藏对应的微博。',
  };

  content.koiForward = rule.Rule({
    id: 'filter_koi_forward',
    version: 1,
    parent: content.content,
    template: () => i18n.koiForwardFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.koiForwardFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function koiForwardFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('a[action-type="fl_forward"] .icon_jinli')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.appItemFeedFilter = {
    cn: '介绍微博应用的微博{{i}}',
    tw: '介紹微博應用的微博{{i}}',
    en: 'Weibo with app item {{i}}',
  };
  i18n.appItemFeedFilterDetail = {
    cn: '介绍微博应用的微博，包括含有微博应用的链接或含有微博应用的卡片的情况。微博应用的链接会以应用图标标记。勾选此项以隐藏此类微博。',
  };

  content.appItem = rule.Rule({
    id: 'filter_app_item',
    version: 1,
    parent: content.content,
    template: () => i18n.appItemFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.appItemFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function appItemFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('.WB_feed_spec[exp-data*="key=tblog_weibocard"][exp-data*="1042005-appItem"]')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.wendaFeedFilter = {
    cn: '微博问答相关的提问、回答或围观{{i}}',
    tw: '微博問答相關的提問、回答或圍觀{{i}}',
    en: 'Weibo asking, answering, or viewing Weibo Q and A {{i}}',
  };
  i18n.wendaFeedFilterDetail = {
    cn: '微博问答功能的提问、回答或围观都会发布一条新微博，如果您不希望看到相关微博，您可以勾选此选项以隐藏相关微博。',
  };

  content.wenda = rule.Rule({
    id: 'filter_wenda',
    version: 1,
    parent: content.content,
    template: () => i18n.wendaFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.wendaFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function wendaFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        // 这条规则不在显示某人的全部问答页面生效，避免显示空页面
        if (feed.matches('[id^="Pl_Core_WendaList__"] *')) return null;
        if (feed.querySelector('[suda-uatrack*="1022-wenda"]')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.wenwoDrFeedFilter = {
    cn: '含有爱问医生健康科普文章的微博{{i}}',
    tw: '含有愛問醫生健康科普文章的微博{{i}}',
    en: 'Weibo with 爱问医生 (iask medical) article {{i}}',
  };
  i18n.wenwoDrFeedFilterDetail = {
    cn: '爱问医生健康科普文章是一些来自 wenwo.com 的健康、医疗相关文章。打开爱问医生健康科普文章的网站时，您可能会自动关注文章作者或相应帐号。开启以隐藏包含此类文章的微博。',
  };

  content.wenwoDr = rule.Rule({
    id: 'filter_wenwo_dr',
    version: 1,
    parent: content.content,
    template: () => i18n.wenwoDrFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.wenwoDrFeedFilter },
    },
    init() {
      const rule = this;
      observer.feed.filter(function wenwoDrFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('div[action-data*="objectid=2017896001:"]')) return 'hide';
        if (feed.querySelector('a[suda-uatrack*="2017896001-product"]')) return 'hide';
        if (feed.querySelector('[exp-data*="2243615001-product"]')) return 'hide';
        if (feed.querySelector('a[href*="//dr.wenwo.com/"]')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.yizhiboFeedFilter = {
    cn: '含有“一直播”视频直播的微博|{{type}}',
    tw: '含有「一直播」直播影片的微博|{{type}}',
    en: 'Weibo with live video on yizhibo | {{type}}',
  };
  i18n.yizhiboFeedFilterAll = {
    cn: '隐藏正在直播或已结束回放',
    tw: '隱藏正在直播或已結束回放',
    en: 'hide live and replay',
  };
  i18n.yizhiboFeedFilterReplay = {
    cn: '仅隐藏已结束回放',
    tw: '僅隱藏已結束回放',
    en: 'hide replay only',
  };

  content.yizhibo = rule.Rule({
    id: 'filter_yizhibo',
    version: 1,
    parent: content.content,
    template: () => i18n.yizhiboFeedFilter,
    ref: {
      type: {
        type: 'select',
        select: [
          { value: 'all', text: () => i18n.yizhiboFeedFilterAll },
          { value: 'replay', text: () => i18n.yizhiboFeedFilterReplay },
        ],
      },
    },
    init() {
      const rule = this;
      observer.feed.filter(function yizhiboFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        const type = rule.ref.type.getConfig();
        const live = feed.querySelector('.WB_video[action-data*="type=feedlive"]');
        if (!live) return null;
        if (type === 'all') return 'hide';
        if (live.matches('[action-data*="is_replay=1"]')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.paidFeedFilter = {
    cn: '需要付费查看的微博{{i}}',
    tw: '需要付費查看的微博{{i}}',
    en: 'FeedFilter require paid to view {{i}}',
  };
  i18n.paidFeedFilterDetail = {
    cn: '博主在发布微博时，可以选择指定内容需要付费才能查看。在您向单条内容或博主付费后，才可查看相关内容。所付费用除博主的收益外，还可能包含部分渠道商分成和税金。',
  };

  content.paid = rule.Rule({
    v7Support: true,
    id: 'filter_paid',
    version: 1,
    parent: content.content,
    template: () => i18n.paidFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.paidFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function paidFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        const pics = feedParser.pics.info(feed);
        // 付费图片
        if (pics.find(pic => pic.blur?.isPay)) return 'hide';
        // 付费文章的特征找不到！
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.multipleTopicsFeedFilter = {
    cn: '正文中提到|至少{{num}}个话题的微博{{i}}',
    tw: '正文中提到|至少{{num}}個話題的微博{{i}}',
    en: 'Feeds with | at least {{num}} topics in its content {{i}}',
  };
  i18n.multipleTopicsFeedFilterDetails = {
    cn: '由于微博热门话题搜索、话题主持人等功能会增加带有某些话题的微博的曝光量。所以存在一些通过罗列若干热门话题来增加广告内容曝光量的微博。您可以隐藏一次性提到了太多话题的微博以免看到他们。',
  };

  content.multipleTopics = rule.Rule({
    id: 'filter_multiple_topics_feed',
    version: 1,
    parent: content.content,
    template: () => i18n.multipleTopicsFeedFilter,
    ref: {
      num: { type: 'range', min: 3, max: 10, initial: 5 },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.multipleTopicsFeedFilterDetails },
    },
    init() {
      const rule = this;
      observer.feed.filter(function multipleTopicsFilter(feed) {
        if (!rule.isEnabled()) return null;
        const limit = rule.ref.num.getConfig();
        const topics = feedParser.topic.dom(feed);
        if (topics.length >= limit) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.fastForwardFeedFilter = {
    cn: '使用快转转发的微博',
    tw: '使用快轉轉發的微博',
    en: 'Fast forwarded feeds',
  };
  i18n.fastForwardFeedFilterDetail = {
    cn: '使用快转转发微博时，转发得到的微博的评论和转发不可用，展示时仅显示被转发的那条微博并标注“被××快转了”。任何针对该微博的评论实际上是针对被转发的微博的评论。',
  };

  content.fastForward = rule.Rule({
    v7Support: true,
    id: 'filter_fast_forward',
    version: 67,
    parent: content.content,
    template: () => i18n.fastForwardFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.fastForwardFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function fastForwardFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feedParser.isFastForward(feed)) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/more/link.js
; (function () {
  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const init = yawf.init;

  const more = yawf.rules.more;

  const i18n = util.i18n;
  i18n.moreLinkGroupTitle = {
    cn: '隐藏以下微博 - 正文链接',
    tw: '隱藏以下內容 - 正文連結',
    en: 'Hide following link - Content Links',
  };

  const link = more.link = {};
  link.link = rule.Group({
    parent: more.more,
    template: () => i18n.moreLinkGroupTitle,
  });

  Object.assign(i18n, {
    feedWithLink: { cn: '带有{}的微博', tw: '帶有{}的微博', en: 'Feeds contain {}' },
    feedWithLinkPlace: { cn: '位置链接', tw: '位置連結', en: 'links of places' },
    feedWithLinkMovie: { cn: '电影链接', tw: '電影連結', en: 'links of movies' },
    feedWithLinkBook: { cn: '图书链接', tw: '圖書連結', en: 'links of books' },
    feedWithLinkTopic: { cn: '超话链接', tw: '超話連結', en: 'links of super topics' },
    feedWithLinkMusic: { cn: '音乐链接', tw: '音樂連結', en: 'links of musics' },
    feedWithLinkStock: { cn: '股票链接', tw: '股票連結', en: 'links of stocks' },
  });

  ; (function (linkTypes) {
    Object.keys(linkTypes).sort().forEach(id => {
      const { pageType, name, recognizer, type } = linkTypes[id];
      const pascalCaseType = pageType.replace(/^./, c => c.toUpperCase());
      link[pageType] = rule.Rule({
        weiboVersion: [6, 7],
        id: `filter_${pascalCaseType}`,
        version: 30,
        parent: link.link,
        template: () => i18n.feedWithLink.replace('{}', name),
        init() {
          const rule = this;
          observer.feed.filter(function feedWithSpecialLinkFilter(feed) {
            if (!rule.isEnabled()) return null;
            if (init.page.type() === pageType) return null;
            if (type) {
              const urls = feed.url_struct || [];
              const url = urls.find(url => url.url_type_pic?.includes(type + '.png'));
              if (url) return 'hide';
            }
            if (recognizer?.(feed)) return 'hide';
            return null;
          });
          this.addConfigListener(() => { observer.feed.rerun(); });
        },
      });
    });
  }({
    100101: {
      pageType: 'place',
      type: 'location',
      name: () => i18n.feedWithLinkPlace,
    },
    100120: {
      pageType: 'movie',
      type: 'movie',
      name: () => i18n.feedWithLinkMovie,
    },
    100202: {
      pageType: 'book',
      type: 'book',
      name: () => i18n.feedWithLinkBook,
    },
    100808: {
      pageType: 'topic',
      type: 'super',
      name: () => i18n.feedWithLinkTopic,
    },
    101515: {
      pageType: 'music',
      type: 'music',
      name: () => i18n.feedWithLinkMusic,
    },
    230677: {
      pageType: 'stock',
      name: () => i18n.feedWithLinkStock,
      recognizer: feed => {
        return feed.url_struct?.some(url => url.url_title?.[0] === '$');
      },
    },
  }));
}());
//#endregion
//#region @require yaofang://content/rule/filter/more/toomany.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;
  const init = yawf.init;

  const more = yawf.rules.more;

  const i18n = util.i18n;
  i18n.otherFloodingTitle = {
    cn: '刷屏',
    tw: '洗版',
    en: 'Flooding',
  };

  const flooding = more.flooding = {};
  flooding.flooding = rule.Group({
    parent: more.more,
    template: () => i18n.otherFloodingTitle,
  });

  Object.assign(i18n, {
    floodingAuthor: {
      cn: '相同作者|超过{{number}}条微博|时超出的隐藏||{{group}}在分组页面同样生效',
      tw: '相同作者|超過{{number}}條微博|時超出的隱藏||{{group}}在分組頁面同樣生效',
      en: 'Feeds by same author will | be hidden | when more than {{number}} seen||{{group}} Also apply to grouping pages',
    },
    floodingAuthorReason: {
      cn: '刷屏',
      tw: '洗版',
      en: 'flooding',
    },
    floodingForward: {
      cn: '相同微博的转发|超过{{number}}条|时超出的隐藏',
      tw: '相同微博的轉發|超過{{number}}條|時超出的隱藏',
      en: 'Feeds forwarded form same one will | be hidden | when more than {{number}} seen',
    },
    floodingForwardReason: {
      cn: '频繁转发',
      tw: '頻繁轉發',
      en: 'forwarded frequently',
    },
  });

  flooding.floodingAuthor = rule.Rule({
    id: 'flooding_author',
    version: 1,
    parent: flooding.flooding,
    template: () => i18n.floodingAuthor,
    ref: {
      number: {
        type: 'range',
        min: 1,
        max: 20,
        initial: 5,
      },
      group: { type: 'boolean' },
    },
    init() {
      const rule = this;
      /** @type {WeakMap<Element, string>} */
      const parsed = new WeakMap();
      observer.feed.filter(function floodingAuthor(feed) {
        if (!rule.isEnabled()) return null;
        // 如果是因为修改规则导致的重新计算，那么我们不再做一次处理
        if (parsed.has(feed)) return null;
        const me = init.page.config.user.idstr;
        const [author] = feedParser.author.id(feed);
        const [fauthor] = feedParser.fauthor.id(feed);
        const authorId = fauthor || author;
        // 自己的微博发多少也不触发这个规则
        if (me === authorId) return null;
        // 个人主页不工作
        if (init.page.type() === 'profile') return null;
        // 分组页面根据设置决定是否生效
        if (init.page.type() === 'group') {
          if (rule.ref.group.getConfig()) return null;
        }
        parsed.set(feed, authorId);
        const feeds = [...document.querySelectorAll('.WB_feed_type')];
        const count = feeds.filter(feed => parsed.get(feed) === authorId).length;
        if (count <= rule.ref.number.getConfig()) return null;
        const reason = i18n.floodingAuthorReason;
        return { result: 'hide', reason };
      }, { priority: -1e6 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  flooding.floodingForward = rule.Rule({
    id: 'flooding_forward',
    version: 1,
    parent: flooding.flooding,
    template: () => i18n.floodingForward,
    ref: {
      number: {
        type: 'range',
        min: 1,
        max: 20,
        initial: 3,
      },
    },
    init() {
      const rule = this;
      /** @type {WeakMap<Element, string>} */
      const parsed = new WeakMap();
      observer.feed.filter(function floodingAuthor(feed) {
        if (!rule.isEnabled()) return null;
        if (parsed.has(feed)) return null;
        const omid = feedParser.omid(feed) || null;
        parsed.set(feed, omid);
        if (!omid) return null;
        const feeds = [...document.querySelectorAll('[mid]')];
        const count = feeds.filter(feed => parsed.get(feed) === omid).length;
        if (count <= rule.ref.number.getConfig()) return null;
        const reason = i18n.floodingForwardReason;
        return { result: 'hide', reason };
      }, { priority: -1e6 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/comment/comment.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.commentTabTitle = {
    cn: '评论过滤',
    tw: '評論篩選',
    en: 'Comment',
  };

  const comment = yawf.rules.comment = {};
  comment.comment = rule.Tab({
    template: () => i18n.commentTabTitle,
    pagemenu: true,
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/comment/layout.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

  const comment = yawf.rules.comment;

  const i18n = util.i18n;

  i18n.commentLayoutGroupTitle = {
    cn: '评论展示',
    tw: '評論展示',
    en: 'Comments Layout',
  };

  const layout = comment.layout = {};
  layout.layout = rule.Group({
    parent: comment.comment,
    template: () => i18n.commentLayoutGroupTitle,
  });

  i18n.commentByTime = {
    cn: '查看评论时默认按时间排序（而非热度）',
    tw: '查閱評論時預設按時間排序（而非熱度）',
    en: 'Show newest comments by default (instead of hot comments)',
  };

  layout.commentByTime = rule.Rule({
    id: 'comment_layout_by_time',
    version: 1,
    parent: layout.layout,
    template: () => i18n.commentByTime,
    ainit() {
      observer.dom.add(function switchToAllComment() {
        const allButtons = Array.from(document.querySelectorAll([
          'a[action-type="feed_list_commentSearch"][action-data*="filter=all"]:not([yawf-all-comment])',
          'a[action-type="search_type"][action-data*="filter=all"]:not([yawf-all-comment])',
        ].join(',')));
        allButtons.forEach(button => {
          button.setAttribute('yawf-all-comment', 'yawf-all-comment');
          if (!button.classList.contains('curr')) button.click();
        });
      });
      observer.comment.onBefore(function switchToAllComment(comment) {
        const feed = comment.closest('[mid]');
        if (!feed) return;
        const button = feed.querySelector([
          'a[action-type="feed_list_commentSearch"][action-data*="filter=all"]:not([yawf-all-comment-again])',
          'a[action-type="search_type"][action-data*="filter=all"]:not([yawf-all-comment-again])',
        ].join(','));
        if (!button) return;
        button.setAttribute('yawf-all-comment-again', 'yawf-all-comment-again');
        if (!button.classList.contains('curr')) button.click();
      });
    },
  });

  i18n.hideSubComment = {
    cn: '折叠二级评论',
    tw: '折疊二級評論',
    en: 'Hide sub comments by default',
  };

  layout.hideSubComment = rule.Rule({
    id: 'comment_layout_hide_sub',
    version: 1,
    parent: layout.layout,
    template: () => i18n.hideSubComment,
    ainit() {
      observer.dom.add(function hideSubComment() {
        const rootCommentList = Array.from(document.querySelectorAll('.list_li[node-type="root_comment"]:not([yawf-folded-root-comment])'));
        rootCommentList.forEach(rootComment => {
          rootComment.setAttribute('yawf-folded-root-comment', 'yawf-folded-root-comment');

          const feed = rootComment.closest('[mid]');
          const reply = rootComment.querySelector('a[action-type="reply"]');
          const childCommentList = Array.from(rootComment.querySelectorAll('.list_ul[node-type="child_comment"]'));

          const commentId = rootComment.getAttribute('comment_id');
          const mid = feed.getAttribute('mid');
          let childCount = 0;

          if (!childCount) do {
            const moreChildLinks = rootComment.querySelectorAll('[node-type="more_child_comment"] a');
            const moreChild = moreChildLinks[moreChildLinks.length - 1];
            if (!moreChild) break;
            const moreChildNumber = moreChild.textContent.match(/\d+/);
            if (!moreChildNumber || !moreChildNumber[0]) break;
            childCount = parseInt(moreChildNumber[0], 10) || 0;
          } while (false);

          if (!childCount) do {
            const childCommentItems = rootComment.querySelectorAll('.list_ul .list_li[comment_id]');
            childCount = childCommentItems.length || 0;
          } while (false);

          if (!childCount) return;

          const container = document.createElement('div');
          container.innerHTML = '<a class="S_txt1" action-type="click_more_child_comment_big" ></a>';
          const unfold = container.firstChild;
          unfold.setAttribute('action-data', `more_comment=big&root_comment_id=${commentId}&is_child_comment=ture&id=${mid}`);
          unfold.textContent = `(${childCount})`;
          reply.after(unfold);

          childCommentList.forEach(childComment => {
            childComment.parentNode.style.display = 'none';
          });
          unfold.addEventListener('click', () => {
            childCommentList.forEach(childComment => {
              childComment.parentNode.style.display = 'block';
            });
          });
        });
      });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/comment/content.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const commentParser = yawf.comment;

  const i18n = util.i18n;

  Object.assign(i18n, {
    contentTextCommentGroupTitle: {
      cn: '按内容关键词过滤',
      tw: '按內容關鍵字篩選',
      en: 'Filter by Content Keywords',
    },
    textContentCommentShow: {
      cn: '总是显示包含以下内容的评论||关键词{{items}}',
      tw: '总是显示包含以下內容的評論||關鍵字{{items}}',
      en: 'Always show feeds with these content||Keyword {{items}}',
    },
    textContentCommentHide: {
      cn: '隐藏包含以下内容的评论||关键词{{items}}',
      tw: '隱藏包含以下內容的評論||關鍵字{{items}}',
      en: 'Hide feeds with these content||Keyword {{items}}',
    },
  });

  class TextCommentRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
  }

  rule.groups({
    baseClass: TextCommentRule,
    tab: 'comment',
    key: 'text',
    version: 1,
    type: 'strings',
    title: () => i18n.contentTextCommentGroupTitle,
    details: {
      hide: {
        title: () => i18n.textContentCommentHide,
      },
      show: {
        title: () => i18n.textContentCommentShow,
      },
    },
    fast: {
      types: [['comment'], ['text']],
      radioGroup: 'comment',
      render: commentParser.fast.render.text,
    },
  });

  Object.assign(i18n, {
    contentRegexCommentGroupTitle: {
      cn: '按内容正则式过滤',
      hk: '按內容正則式篩選',
      tw: '按內容正規式篩選',
      en: 'Filter by Content Regex',
    },
    regexContentCommentShow: {
      cn: '总是显示匹配以下正则表达式的评论||关键词{{items}}',
      hk: '总是显示匹配以下正則表達式的評論||關鍵字{{items}}',
      tw: '总是显示匹配以下正規表示式的評論||關鍵字{{items}}',
      en: 'Always show feeds match these regexen||Regexen {{items}}',
    },
    regexContentCommentHide: {
      cn: '隐藏匹配以下正则表达式的评论||关键词{{items}}',
      hk: '隱藏匹配以下正則表達式的評論||關鍵字{{items}}',
      tw: '隱藏匹配以下正規表示式的評論||關鍵字{{items}}',
      en: 'Hide feeds match these regexen||Regexen {{items}}',
    },
  });

  class RegexCommentRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
  }

  rule.groups({
    baseClass: RegexCommentRule,
    tab: 'comment',
    key: 'regex',
    version: 110,
    type: 'regexen',
    title: () => i18n.contentRegexCommentGroupTitle,
    details: {
      hide: {
        title: () => i18n.regexContentCommentHide,
      },
      show: {
        title: () => i18n.regexContentCommentShow,
      },
    },
    fast: {
      types: [['multitextcomment'], ['text', 'multitext', 'comment']],
      radioGroup: 'comment',
      render: commentParser.fast.render.regex,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/comment/user.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const commentParser = yawf.comment;

  const i18n = util.i18n;

  Object.assign(i18n, {
    accountCommentGroupTitle: {
      cn: '按用户过滤',
      tw: '按用戶篩選',
      en: 'Filter by Users',
    },
    accountCommentShow: {
      cn: '总是显示包含以下用户的评论||用户{{items}}',
      tw: '总是显示包含以下用戶的評論||用戶{{items}}',
      en: 'Always show feeds with these users||User {{items}}',
    },
    accountCommentHide: {
      cn: '隐藏包含以下用户的评论||用户{{items}}',
      tw: '隱藏包含以下用戶的評論||用戶{{items}}',
      en: 'Hide feeds with these users||User {{items}}',
    },
  });


  class CommentUserFeedRule extends rule.class.Rule {
    get v7Support() { return true; }
    constructor(item) {
      super(item);
    }
  }

  rule.groups({
    baseClass: CommentUserFeedRule,
    tab: 'comment',
    key: 'name',
    type: 'usernames',
    version: 110,
    title: () => i18n.accountCommentGroupTitle,
    details: {
      hide: {
        title: () => i18n.accountCommentHide,
      },
      show: {
        title: () => i18n.accountCommentShow,
      },
    },
    fast: {
      types: [['commentuser', 'account'], ['original', 'author', 'mention']],
      radioGroup: 'commentuser',
      render: commentParser.fast.render.user,
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/filter/comment/more.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const commentParser = yawf.comment;
  const init = yawf.init;

  const comment = yawf.rules.comment;

  const i18n = util.i18n;

  i18n.commentMoreGroupTitle = {
    cn: '更多',
    tw: '其他',
    en: 'More',
  };

  const more = comment.more = {};
  more.more = rule.Group({
    parent: comment.comment,
    template: () => i18n.commentMoreGroupTitle,
  });


  i18n.showMyComment = {
    cn: '总是显示我自己发表的评论',
    tw: '總是顯示我自己發表的評論',
    en: 'Always show my comments',
  };

  more.showMyComment = rule.Rule({
    id: 'filter_comment_show_my',
    version: 1,
    parent: more.more,
    template: () => i18n.showMyComment,
    init() {
      const rule = this;
      observer.comment.filter(function showMyComment(comment) {
        if (!rule.isEnabled()) return null;
        const author = commentParser.user.name(comment)[0];
        const username = init.page.config.user.screen_name;
        if (author === username) return 'shomme';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

  i18n.commentFaceCount = {
    cn: '隐藏表情|数量超过{{count}}个的评论',
    tw: '隱藏表情|數量超過{{count}}個的評論',
    en: 'Hide comments | with more than {{count}} image emoji',
  };

  more.commentFaceCount = rule.Rule({
    id: 'filter_comment_face_count',
    version: 1,
    parent: more.more,
    template: () => i18n.commentFaceCount,
    ref: {
      count: {
        type: 'range',
        initial: 8,
        min: 1,
        max: 20,
      },
    },
    init() {
      const rule = this;
      observer.comment.filter(function commentFaceCount(comment) {
        if (!rule.isEnabled()) return null;
        const face = comment.querySelectorAll('img[type="face"][alt]');
        if (face > rule.ref.count.getConfig()) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

  i18n.commentFaceTypes = {
    cn: '隐藏表情|种类超过{{count}}种的评论',
    tw: '隱藏表情|種類超過{{count}}種的評論',
    en: 'Hide comments | with more than {{count}} kinds of image emoji',
  };

  more.commentFaceTypes = rule.Rule({
    id: 'filter_comment_face_type',
    version: 1,
    parent: more.more,
    template: () => i18n.commentFaceTypes,
    ref: {
      count: {
        type: 'range',
        initial: 4,
        min: 1,
        max: 20,
      },
    },
    init() {
      const rule = this;
      observer.comment.filter(function commentFaceTypes(comment) {
        if (!rule.isEnabled()) return null;
        const face = comment.querySelectorAll('img[type="face"][alt]');
        const types = new Set(Array.from(face).map(face => face.alt)).size;
        if (types > rule.ref.count.getConfig()) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

  i18n.commentWithoutContent = {
    cn: '隐藏没有内容的评论（只有表情、提到等）',
    tw: '隱藏沒有內容的評論（只有表情、提到等）',
    en: 'Comments without any text content (only mentions and emoji)',
  };

  more.commentWithoutContent = rule.Rule({
    id: 'filter_comment_wo_content',
    version: 1,
    parent: more.more,
    template: () => i18n.commentWithoutContent,
    init() {
      const rule = this;
      observer.comment.filter(function commentWithoutContent(comment) {
        if (!rule.isEnabled()) return null;
        if (comment.querySelector('.media_box .WB_pic')) return null; // 有图片的不算没内容
        const texts = Array.from(comment.querySelector('.WB_text').childNodes)
          .filter(n => !((n instanceof Element) && n.matches('a[usercard]'))) // 提到人不算内容
          .map(n => n.textContent).join('')
          .replace(/回[复復覆]|Reply|微博|[转轉][发發]|[:/\s：.\u200b]/ig, ''); // 空格、“回复”和冒号不算内容
        if (!texts) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

  i18n.commentByBot = {
    cn: '隐藏机器人评论',
  };

  more.commentByBot = rule.Rule({
    id: 'filter_comment_by_bot',
    version: 110,
    parent: more.more,
    template: () => i18n.commentByBot,
    get v7Support() { return true; }
  })

  i18n.commentWithForward = {
    cn: '隐藏含有转发消息的微博',
    tw: '隱藏含有轉發消息的微博',
    en: 'Comments contain forwarded messages',
  };

  more.commentWithForward = rule.Rule({
    id: 'filter_comment_with_forward',
    version: 1,
    parent: more.more,
    template: () => i18n.commentWithForward,
    init() {
      const rule = this;
      observer.comment.filter(function commentWithForward(comment) {
        if (!rule.isEnabled()) return null;
        const users = commentParser.user.dom(comment);
        const forwards = users.find(u => u.previousSibling.textContent.match(/\/\/$/));
        if (forwards) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/clean/clean.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const init = yawf.init;
  const observer = yawf.observer;

  const i18n = util.i18n;
  const css = util.css;
  const priority = util.priority;

  i18n.cleanTabTitle = {
    cn: '界面清理',
    tw: '介面清理',
    en: 'Clean Up',
  };
  i18n.cleanTabSelectAll = {
    cn: '全选本组',
    tw: '全選本組',
    en: 'Select Group',
  };

  const clean = yawf.rules.clean = {};
  clean.clean = rule.Tab({
    template: () => i18n.cleanTabTitle,
    pagemenu: true,
  });

  const selectAllButton = id => {
    const button = document.createElement('a');
    button.className = 'W_btn_b yawf-clean-group-all';
    const content = document.createElement('span');
    content.textContent = i18n.cleanTabSelectAll;
    button.appendChild(content);
    button.addEventListener('click', event => {
      if (!event.isTrusted) return;
      const group = clean[id];
      Object.keys(group).forEach(key => {
        const item = group[key];
        if (item instanceof rule.class.Rule) {
          if (item.setConfig) item.setConfig(true);
        }
      });
    });
    return button;
  };

  let lastCleanGroup = null;
  clean.CleanGroup = function (id, template) {
    const group = rule.Group({
      id,
      parent: clean.clean,
      template,
      render(...args) {
        const node = super.render(...args);
        node.classList.add('yawf-clean-group');
        const button = selectAllButton(id);
        node.appendChild(button);
        return node;
      },
    });
    clean[id] = { [id]: group };
    lastCleanGroup = id;
    return group;
  };

  clean.CleanRule = function (id, template, version, action, ...details) {
    clean[lastCleanGroup][id] = rule.Rule(Object.assign({
      id: 'clean_' + lastCleanGroup + '_' + id,
      template,
      parent: clean[lastCleanGroup][lastCleanGroup],
      version,
    }, typeof action === 'string' ? {
      acss: action,
    } : typeof action === 'function' ? {
      ainit: action,
    } : typeof action === 'object' ? action : {}, ...details));
    return clean[lastCleanGroup][id];
  };

  i18n.cleanConfigColumnCount = {
    cn: 3,
    en: 2,
  };

  init.onReady(() => {
    css.append(`
.yawf-clean-group + .yawf-config-group-items { display: grid; grid-template-columns: repeat(${i18n.cleanConfigColumnCount}, 1fr); grid-gap: 5px 10px; margin: 5px 20px; }
.yawf-clean-group + .yawf-config-group-items > .yawf-config-rule { margin: 0; }
.yawf-clean-group-all { float: right; font-weight: normal; cursor: pointer; }
.yawf-whatsnew-dialog .yawf-clean-group-all, .yawf-config-layer-search .yawf-clean-group-all { display: none; }
`);
  }, { priority: priority.DEFAULT });


  clean.tagElements = function (name, selector, identifiers) {
    const tagElements = function tagElements() {
      const elements = Array.from(document.querySelectorAll(selector));
      if (!elements.length) return;
      elements.forEach(function (element) {
        element.setAttribute('yawf-id', '');
        const matched = Object.keys(identifiers).find(selector => element.querySelector(selector));
        if (matched) element.setAttribute('yawf-id', identifiers[matched]);
      });
    };
    Object.defineProperty(tagElements, 'name', { value: `tagElements${name}` });
    observer.dom.add(tagElements);
  };

  const groupOnLoad = [];
  clean.CleanRuleGroup = function (rules, callback) {
    groupOnLoad.push({ rules, callback });
  };
  init.onLoad(function () {
    groupOnLoad.splice(0).forEach(({ rules, callback }) => {
      const config = Object.assign({}, ...Object.keys(rules).map(key => ({ [key]: rules[key].isEnabled() })));
      callback(config);
    });
  }, { priority: priority.AFTER });

}());
//#endregion
//#region @require yaofang://content/rule/clean/icons.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const observer = yawf.observer;

  const i18n = util.i18n;
  const css = util.css;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanIconsGroupTitle: { cn: '隐藏模块 - 标识/图标', tw: '隱藏模組 - 標誌/圖示', en: 'Hide Modules - Logo / Icons' },
    cleanIconsMember: { cn: '微博会员', tw: '微博會員', en: 'Weibo VIP / Member' },
    cleanIconsLevel: { cn: '等级', tw: '等級', en: 'Level' },
    cleanIconsApprove: { cn: '个人认证', tw: '個人認證', en: 'Personal Authentication' },
    cleanIconsApproveCo: { cn: '机构认证', tw: '企業認證', en: 'Weibo Verification' },
    cleanIconsApproveDead: { cn: '失效认证', tw: '失效認證', en: 'Failed verification' },
    cleanIconsBigFun: { cn: '铁粉', tw: '鐵粉', en: '铁粉 (big fans)' },
    cleanIconsClub: { cn: '微博达人', tw: '微博達人', en: 'Pioneer' },
    cleanIconsVGirl: { cn: '微博女郎', en: 'Weibo girl' },
    cleanIconsSupervisor: { cn: '微博监督员', tw: '微博監督員', en: 'Weibo Supervisor' },
    cleanIconsTaobao: { cn: '淘宝/天猫商户', tw: '淘寶/天貓商戶', en: 'Taobao / Tmall Merchant' },
    cleanIconsCheng: { cn: '阿里诚信通', tw: '阿里誠信通', en: 'Alibaba 诚信通' },
    cleanIconsGongyi: { cn: '公益', en: 'Public Interest' },
    cleanIconsZongyika: { cn: '综艺', en: 'Variety' },
    cleanIconsYouji: { cn: '旅行', en: 'Travel' },
    cleanIconsOthers: { cn: '更多', tw: '其他', en: 'More' },
  });

  clean.CleanGroup('icons', () => i18n.cleanIconsGroupTitle);
  clean.CleanRule('level', () => i18n.cleanIconsLevel, 1, '.icon_bed[node-type="level"], .W_level_ico, .W_icon_level { display: none !important; }');
  const member = clean.CleanRule('member', () => i18n.cleanIconsMember, 1, '', { v7Support: true });
  const approve = clean.CleanRule('approve', () => i18n.cleanIconsApprove, 1, '', { v7Support: true });
  const approveCo = clean.CleanRule('approve_co', () => i18n.cleanIconsApproveCo, 1, '', { v7Support: true });
  clean.CleanRule('approve_dead', () => i18n.cleanIconsApproveDead, 1, '.icon_approve_dead, .icon_pf_approve_dead { display: none !important; }');
  const bigFan = clean.CleanRule('bigfun', () => i18n.cleanIconsBigFun, 26, '', { v7Support: true });
  const club = clean.CleanRule('club', () => i18n.cleanIconsClub, 1, '', { v7Support: true });
  const vGirl = clean.CleanRule('v_girl', () => i18n.cleanIconsVGirl, 1, '', { v7Support: true });
  clean.CleanRule('supervisor', () => i18n.cleanIconsSupervisor, 1, '.icon_supervisor { display: none !important; }');
  clean.CleanRule('taobao', () => i18n.cleanIconsTaobao, 1, '.ico_taobao, .icon_tmall, .icon_taobao, .icon_tmall { display: none !important; }');
  clean.CleanRule('cheng', () => i18n.cleanIconsCheng, 1, '.icon_cheng { display: none !important; }');
  clean.CleanRule('gongyi', () => i18n.cleanIconsGongyi, 1, '.ico_gongyi, .ico_gongyi1, .ico_gongyi2, .ico_gongyi3, .ico_gongyi4, .ico_gongyi5, .icon_gongyi, .icon_gongyi2, .icon_gongyi3, .icon_gongyi4, .icon_gongyi5 { display: none !important; }');
  clean.CleanRule('zongyika', () => i18n.cleanIconsZongyika, 1, '.zongyika2014, .icon_zongyika2014 { display: none !important; }');
  clean.CleanRule('others', () => i18n.cleanIconsOthers, 1, () => {
    observer.dom.add(function () {
      const icons = Array.from(document.querySelectorAll('a > .W_icon_yystyle'));
      icons.forEach(function (icon) {
        const link = icon.parentNode;
        const replacement = document.createElement('span');
        replacement.title = link.title;
        link.parentNode.replaceChild(replacement, link);
      });
    });
    css.append('.W_icon_yystyle, .W_icon_yy { display: none !important; }');
  });

  clean.CleanRuleGroup({
    'vyellow,vgold': approve,
    vblue: approveCo,
    vgirl: vGirl,
    club: club,
    'vip,vipex': member,
    bigfan: bigFan,
  }, function (options) {
    const hideSymbol = Object.keys(options).filter(key => options[key]).join(',').split(',');

    util.inject(function (rootKey, hideSymbol) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      const wooIcon = vueSetup.getRootVm().$options._base.component('woo-icon');
      wooIcon.options.render = (function (render) {
        return function (h) {
          if (hideSymbol.includes(this.symbol)) {
            return h('span', { ref: 'frames', style: 'display: none;' });
          }
          return render.call(this, h);
        };
      }(wooIcon.options.render));

      vueSetup.eachComponentVM('woo-icon', vm => { vm.$forceUpdate(); }, { watch: false });
      vueSetup.eachComponentVM('icon', vm => {
        if (Object.getPrototypeOf(vm) === wooIcon.prototype) vm.$forceUpdate();
      }, { watch: false });

      const hideVip = hideSymbol.includes('vip');
      const hideBigfan = hideSymbol.includes('bigfan');
      if (hideVip || hideBigfan) {
        vueSetup.eachComponentVM('icon-fans', function (vm) {
          if (hideVip) {
            Object.defineProperties(vm, { isVip: { get: () => false } });
          }
          if (hideBigfan) {
            Object.defineProperties(vm, { iconName: { get: () => null } });
          }
          vm.$forceUpdate();
        });
      }

    }, util.inject.rootKey, hideSymbol);
  });

}());
//#endregion
//#region @require yaofang://content/rule/clean/follow.js

; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const clean = yawf.rules.clean;

  const i18n = util.i18n;

  Object.assign(i18n, {
    cleanFollowGroupTitle: { cn: '隐藏模块 - 关注按钮', tw: '隱藏模組 - 關注按鈕', en: 'Hide Modules - Follow Button' },
    cleanFollowSingle: { cn: '微博详情页', tw: '微博詳情頁', en: 'Weibo detail' },
    cleanFollowAtMe: { cn: '提到我的微博', en: 'Weibo mentioned me' },
    cleanFollowDiscover: { cn: '热门微博', tw: '熱門微博', en: 'Hot Weibo' },
    cleanFollowFastForward: { cn: '快转', tw: '快轉', en: 'Fast Forward' },
    cleanFollowVideo: { cn: '视频弹层', hk: '視頻彈層', tw: '影片快顯層', en: 'Video pop-up layer' },
    cleanFollowRecommend: { cn: '关注推荐', tw: '關注推薦', en: 'Follow Recommend' },
  });

  clean.CleanGroup('follow', () => i18n.cleanFollowGroupTitle);
  clean.CleanRule('single', () => i18n.cleanFollowSingle, 1, '[id^="Pl_Official_WeiboDetail__"] [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('at_me', () => i18n.cleanFollowAtMe, 1, '#v6_pl_content_atmeweibo [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('discover', () => i18n.cleanFollowDiscover, 1, '#plc_discover [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('fast_forward', () => i18n.cleanFollowFastForward, 1, '#v6_pl_content_homefeed [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('video', () => i18n.cleanFollowVideo, 1, '.WB_h5video .con-11, .wbv-add-box { display: none !important; }');
  clean.CleanRule('recommend', () => i18n.cleanFollowRecommend, 1, '[action-type="follow_recommend_arr"], [node-type="follow_recommend_box"] { display: none !important; }');

}());
//#endregion
//#region @require yaofang://content/rule/clean/nav.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const backend = yawf.backend;

  const clean = yawf.rules.clean;

  const i18n = util.i18n;

  Object.assign(i18n, {
    cleanNavGroupTitle: { cn: '隐藏模块 - 导航栏', tw: '隱藏模組 - 導覽列', en: 'Hide Modules - Navigation Bar' },
    cleanNavLogoImg: { cn: '节日徽标', tw: '節日徽標', en: 'Holiday logo' },
    cleanNavMain: { cn: '首页', tw: '首頁', en: 'Home' },
    cleanNavTV: { cn: '视频', en: '视频 (Video)' },
    cleanNavHot: { cn: '热门（发现）', en: 'Discover' },
    cleanNavECom: { cn: '电商', en: '电商 (Mall)' },
    cleanNavGame: { cn: '游戏', tw: '遊戲', en: 'Game' },
    cleanNavHotSearch: { cn: '大家正在搜', tw: '大家正在熱搜', en: 'Hot search' },
    cleanNavAria: { cn: '无障碍', en: '无障碍 (a11y)' },
    cleanNavNoticeNew: { cn: '新消息计数', tw: '新消息計數', en: 'Count for new notice' },
    cleanNavNew: { cn: '提示红点', tw: '提示紅點', en: 'Red dot tips' },
  });

  clean.tagElements('Nav', [
    '.gn_nav_list>li:not([yawf-id])',
    '.gn_set_v2>a:not([yawf-id])',
  ].join(','), {
    'a[nm="home"]': 'home',
    'a[nm="tv"]': 'tv',
    'a[nm="find"]': 'find',
    'a[nm="name"]': 'name',
    'a[nm="game"]': 'game',
    '.ficon_wb_ds': 'mall',
    '.ficon_game': 'game',
  });

  clean.CleanGroup('nav', () => i18n.cleanNavGroupTitle);
  clean.CleanRule('logo_img', () => i18n.cleanNavLogoImg, 1, {
    v7Support: true,
    ainit: function () {
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.eachComponentVM('weibo-top-nav', function (vm) {
          Object.defineProperty(vm, 'skinData', { get: () => ({}) });
        });
        vueSetup.eachComponentVM('weibo-top-nav-base', function (vm) {
          Object.defineProperty(vm, 'logoUrl', { get: () => null, set: x => { } });
        });
      }, util.inject.rootKey);
    },
  });
  clean.CleanRuleGroup({
    home: clean.CleanRule('main', () => i18n.cleanNavMain, 1, '', { v7Support: true }),
    tv: clean.CleanRule('tv', () => i18n.cleanNavTV, 1, '', { v7Support: true }),
    hot: clean.CleanRule('hot', () => i18n.cleanNavHot, 1, '', { v7Support: true }),
    eCom: clean.CleanRule('eCom', () => i18n.cleanNavECom, 1, '', { v7Support: true }),
    game: clean.CleanRule('game', () => i18n.cleanNavGame, 1, '', { v7Support: true }),
  }, function (options) {
    util.inject(function (rootKey, options) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      vueSetup.eachComponentVM('weibo-top-nav', function (vm) {
        if (Array.isArray(vm.channels)) {
          const filtered = vm.channels.filter(channel => !options[channel.name]);
          vm.channels.splice(0, vm.channels.length, ...filtered);
        }
        let links = vm.links;
        if (!Object.getOwnPropertyDescriptor(vm, 'links')?.get) {
          Object.defineProperty(vm, 'links', {
            get() { return links.filter(link => !options[link.name]); },
            set(v) { links = v; },
          });
        }
      });

    }, util.inject.rootKey, options);
  });
  if (env.config.requestBlockingSupported) {
    clean.CleanRule('hot_search', () => i18n.cleanNavHotSearch, 1, {
      init: function () {
        backend.onRequest('hotSearch', details => {
          if (this.isEnabled()) return { cancel: true };
          return {};
        });
      },
    });
  } else if (function supportMutationEvent() {
    // 用户脚本版无法用 background 脚本拦截网络请求
    // Mutation Event 会在节点插入之前触发，阻止插入就可以阻止脚本运行
    // MutationObserver 会在节点插入之后触发，并不能保证阻止 JSONP 请求成功进行
    // 此外除了 GM3 意外的猴子，用户脚本无法保证 document-start，所以也不能靠拦截 STK 注册来实现这个功能
    // 我们应该也没有几个 GM3 的用户，所以不打算为 GM3 做特殊处理
    // Mutation Event 为待废弃功能，如果某天浏览器停止支持这个功能，这里只能删掉
    const placeholder = document.createElement('div');
    let supported = false;
    placeholder.addEventListener('DOMNodeInserted', () => { supported = true; });
    placeholder.appendChild(document.createElement('span'));
    return supported;
  }()) {
    clean.CleanRule('hot_search', () => i18n.cleanNavHotSearch, 1, {
      ainit: function () {
        document.documentElement.addEventListener('DOMNodeInserted', event => {
          const script = event.target;
          if (script?.tagName?.toLowerCase() !== 'script') return;
          const pattern = /^https?:\/\/s.weibo.com\/ajax\/jsonp\/gettopsug\?(?:.*&)?_cb=(STK_\d+)/;
          const match = script.src.match(pattern);
          if (!match || !match[1]) return;
          const callback = match[1];
          util.inject(function (callback) { delete window[callback]; }, callback);
          event.preventDefault();
          if (script.parentNode) script.parentNode.removeChild(script);
        });
      },
    });
  }
  clean.CleanRule('aria', () => i18n.cleanNavAria, 98, '[yawf-component-tag~="aria"] { display: none !important; }', { v7Support: true });
  clean.CleanRule('notice_new', () => i18n.cleanNavNoticeNew, 1, '.WB_global_nav .gn_set_list .W_new_count { display: none !important; }');
  clean.CleanRule('new', () => i18n.cleanNavNew, 1, '', {
    v7Support: true,
    ainit: function () {
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.transformComponentsRenderByTagName('ctrls', function (nodeStruct, Nodes) {
          const { vNode } = Nodes;
          const badges = Array.from(nodeStruct.querySelectorAll('x-woo-badge'));
          badges.forEach(budge => {
            Object.assign(vNode(budge).componentOptions.propsData, { dot: false, value: 0 });
          });
        });
      }, util.inject.rootKey);
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/clean/left.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const i18n = util.i18n;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanLeftGroupTitle: { cn: '隐藏模块 - 左栏', tw: '隱藏模組 - 左欄', en: 'Hide modules - Left Column' },
    cleanLeftHome: { cn: '全部关注（首页）', tw: '首頁', en: 'Home' },
    cleanLeftFav: { cn: '我的收藏', tw: '我的收藏', en: 'Favorite' },
    cleanLeftLike: { cn: '我的赞', tw: '我的讚', en: 'Like' },
    cleanLeftHot: { cn: '热门微博', tw: '熱門微博', en: 'Hot Feeds' },
    cleanLeftTV: { cn: '热门视频', tw: '熱門視頻', en: 'Hot Video' },
    cleanLeftNewFeed: { cn: '最新微博', tw: '最新微博', en: '最新微博 (Newest Feeds)' },
    cleanLeftFriends: { cn: '好友圈', tw: '好友圈', en: 'Friends' },
    cleanLeftGroupToMe: { cn: '群微博', tw: '群微博', en: '群微博 (Group)' },
    cleanLeftSpecial: { cn: '特别关注', tw: '特别關注', en: 'Special Focus' },
    cleanLeftWhisper: { cn: '悄悄关注', tw: '悄悄關注', en: 'Secret Following' },
    cleanLeftVPlus: { cn: '付费订阅（V+）', tw: '付費訂閱（V+）', en: 'Paid Subscribe (V+)' },
    cleanLeftNew: { cn: '新微博提示红点', tw: '新微博提示紅點', en: 'Red dot for new Feeds' },
    cleanLeftNews: { cn: '新消息计数', tw: '新消息計數', en: 'Counts for News' },
    cleanLeftCount: { cn: '新分组微博计数', tw: '新分組微博計數', en: 'Counts of Feeds by Group' },
  });

  clean.CleanGroup('left', () => i18n.cleanLeftGroupTitle);
  clean.CleanRule('level', () => i18n.cleanIconsLevel, 1, '.icon_bed[node-type="level"], .W_level_ico, .W_icon_level { display: none !important; }');
  const new_feed = clean.CleanRule('new_feed', () => i18n.cleanLeftNewFeed, 21, '', { v7Support: true });
  const friends = clean.CleanRule('friends', () => i18n.cleanLeftFriends, 1, '', { v7Support: true });
  const special = clean.CleanRule('special', () => i18n.cleanLeftSpecial, 1, '', { v7Support: true });

  clean.tagElements('Left', [
    '#v6_pl_leftnav_group .lev:not([yawf-id])',
  ].join(','), {
    'a[href*="krcom.cn"]': 'leftnav_tv',
    'a[href*="is_new=1"]': 'leftnav_new',
    'a[href*="/home?"]': 'leftnav_home',
    'a[href^="/at/"]': 'leftnav_message',
    'a[href^="/fav"]': 'leftnav_fav',
    'a[href^="/like"]': 'leftnav_like',
    'a[href^="/friends"]': 'leftnav_friends',
    'a[href^="/groupsfeed"]': 'leftnav_groupsfeed',
    'a[href*="//d.weibo.com"]': 'leftnav_hot',
    'a[href*="//weibo.com/tv"]': 'leftnav_tv',
    'a[href^="/mygroups"][href*="isspecialgroup=1"]': 'leftnav_special',
    'a[href^="/mygroups"][href*="whisper=1"]': 'leftnav_whisper',
    'a[href^="/mygroups"][href*="vplus=1"]': 'leftnav_vplus',
    'a[href^="/mygroups"]': 'leftnav_mygroups',
  });

  clean.CleanRuleGroup({
    new_feed,
    special,
    friends,
  }, function (options) {
    if (yawf.rules.filter.homepage.newestFeeds.getConfig()) {
      options.new_feed = false;
    }

    util.inject(function (rootKey, options) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      const icons = {
        navNew: 'new_feed',
        navSpecial: 'special',
        navMutual: 'friends',
      };
      vueSetup.eachComponentVM('home', function (vm) {
        vm.$watch(function () { return this.leftTabs; }, function () {
          if (Array.isArray(vm.leftTabs)) {
            const filtered = vm.leftTabs.filter(tab => !options[icons[tab.icon]]);
            if (vm.leftTabs.length !== filtered.length) vm.leftTabs = filtered;
          }
        }, { immediate: true });
      });

    }, util.inject.rootKey, options);
  });

}());
//#endregion
//#region @require yaofang://content/rule/clean/middle.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const i18n = util.i18n;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanMiddleGroupTitle: { cn: '隐藏模块 - 中栏', tw: '隱藏模組 - 中欄', en: 'Hide modules - Middle Column' },
    cleanMiddleRecommendedTopic: { cn: '热门微博（发布框上方）', hk: '热门微博（發布框上方）', tw: '熱門微博（發布框上方）', en: 'Hot feeds, on top of publisher' },
    cleanMiddleFeedRecommend: { cn: '微博兴趣推荐（顶部）', tw: '微博興趣推薦（頂部）', en: 'Feed Recommendation, top' },
    cleanMiddleMemberTip: { cn: '开通会员提示（底部）', tw: '開通會員提示（底部）', en: 'Tip of Joining Weibo VIP, bottom' },
  });

  clean.CleanGroup('middle', () => i18n.cleanMiddleGroupTitle);
  clean.CleanRule('recommended_topic', () => i18n.cleanMiddleRecommendedTopic, 1, '#v6_pl_content_publishertop div[node-type="recommendTopic"] { display: none !important; }');
  clean.CleanRule('feed_recommend', () => i18n.cleanMiddleFeedRecommend, 1, 'a.notes[node-type="feed_list_newBar"][href^="http"]:not([action-type="feed_list_newBar"]), .WB_feed_newuser[node-type="recommfeed"] { display: none !important; }');
  clean.CleanRule('member_tip', () => i18n.cleanMiddleMemberTip, 1, '[node-type="feed_list_shieldKeyword"] { display: none !important; }');

}());
//#endregion
//#region @require yaofang://content/rule/clean/right.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const i18n = util.i18n;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanRightGroupTitle: { cn: '隐藏模块 - 右栏', tw: '隱藏模組 - 右欄', en: 'Hide modules - Right Column' },
    cleanRightInfo: { cn: '个人信息', tw: '个人信息', en: 'Personal Info' },
    cleanRightRanks: { cn: '榜单（新歌榜等）', tw: '榜單（新歌榜等）', en: 'Rank List (Song list, etc.)' },
    cleanRightHotTopic: { cn: '热门话题 / 微博热搜', tw: '熱門話題', en: 'Hot Topic' },
    cleanRightHotTopicTop: { cn: '置顶热门话题' },
    cleanRightInterest: { cn: '可能感兴趣的人', tw: '可能感興趣的人', en: 'You may know' },
    cleanRightService: { cn: '创作者中心' },
    cleanRightMember: { cn: '会员专区', tw: '會員專區', en: 'Weibo VIP' },
    cleanRightGroups: { cn: '分组成员列表', tw: '分組成員列表', en: 'Members of group' },
    cleanRightRecomGroupUser: { cn: '建议加入该分组', tw: '建議加入該分組', en: 'Suggest to add to this group' },
    cleanRightHongbaoRank: { cn: '让红包飞', tw: '讓紅包飛', en: '让红包飞 (Red Envelope)' },
    cleanRightAttFeed: { cn: '好友关注动态 {{i}}', tw: '好友關注動態 {{i}}', en: "Friends' Attention {{i}}" },
    cleanRightAttFeedDetail: {
      cn: '开启该隐藏选项只能让您自己不再看到“好友关注动态”模块，并不能阻止您出现在别人的“好友关注动态”中。',
    },
    cleanRightNotice: { cn: '公告栏', tw: '公告欄', en: 'Bulletin Board' },
  });

  clean.CleanGroup('right', () => i18n.cleanRightGroupTitle);
  clean.CleanRule('info', () => i18n.cleanRightInfo, 1, '[yawf-id="v6_pl_rightmod_myinfo_myinfo"] { display: none !important; }');
  clean.CleanRule('ranks', () => i18n.cleanRightRanks, 1, '#v6_pl_rightmod_rank, [yawf-id="rightmod_taobao_movie"], [yawf-id="rightmod_recom_movie"] { display: none !important; }');
  const hotSearchTop = clean.CleanRule('hot_topic_top', () => i18n.cleanRightHotTopicTop, 91, '', { v7Support: true });
  const hotSearch = clean.CleanRule('hot_topic', () => i18n.cleanRightHotTopic, 1, '', { v7Support: true });
  const interested = clean.CleanRule('interest', () => i18n.cleanRightInterest, 1, '', { v7Support: true });
  const service = clean.CleanRule('service', () => i18n.cleanRightService, 104, '', { v7Support: true });
  clean.CleanRule('member', () => i18n.cleanRightMember, 1, '#v6_trustPagelet_recom_member { display: none !important; }');
  clean.CleanRule('groups', () => i18n.cleanRightGroups, 1, '#v6_pl_rightmod_groups { display: none; }');
  clean.CleanRule('recom_group_user', () => i18n.cleanRightRecomGroupUser, 1, '#v6_pl_rightmod_recomgroupuser { display: none; }');
  clean.CleanRule('hongbao_rank', () => i18n.cleanRightHongbaoRank, 1, '#v6_pl_rightmod_hongbao { display: none !important; }');
  clean.CleanRule('att_feed', () => i18n.cleanRightAttFeed, 1, {
    acss: '#v6_pl_rightmod_attfeed { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanRightAttFeedDetail } },
  });
  clean.CleanRule('notice', () => i18n.cleanRightNotice, 1, '#v6_pl_rightmod_noticeboard { display: none !important; }');

  clean.tagElements('Right', [
    '#trustPagelet_indexright_recom .WB_right_module:not([yawf-id])',
    '#v6_pl_rightmod_recominfo .WB_cardwrap:not([yawf-id])',
    '#v6_pl_rightmod_rank .WB_cardwrap:not([yawf-id])',
    '#v6_pl_rightmod_myinfo .WB_cardwrap:not([yawf-id])',
  ].join(','), {
    '[change-data*="key=hottopic_r2"]': 'rightmod_zt_hottopic',
    '[change-data*="key=interest_r2"]': 'rightmod_recom_interest',
    'h4.obj_name a[href*="movie.weibo.com"]': 'rightmod_recom_movie',
    'h4.obj_name a[href*="taobao.com"][href*="dianying"]': 'rightmod_taobao_movie',
    'h2.main_title a[href*="book.weibo.com/top"]': 'v6_pl_rightmod_rank_book',
    'h4.obj_name a[href*="pop.weibo.com"]': 'v6_pl_rightmod_rank_pop',
    'div.obj_name a[href*="100808faecebff8a54b97a91699c654e5f4cda"]': 'v6_pl_rightmod_rank_hong',
    '.W_person_info': 'v6_pl_rightmod_myinfo_myinfo',
    'a[action-type="new_pc_apply"]': 'v6_pl_rightmod_myinfo_new_pc_apply',
  });

  clean.CleanRuleGroup({
    hotSearchTop: hotSearchTop,
    cardHotSearch: hotSearch,
    cardInterested: interested,
    cardService: service,
  }, function (options) {
    util.inject(function (rootKey, options) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      vueSetup.eachComponentVM('side', function (vm) {
        vm.$watch(function () { return this.cardsData; }, function () {
          if (Array.isArray(vm.cardsData)) {
            if (vm.cardsData?.length) vm.$parent.isLoaded = true;
            for (let i = 0; i < vm.cardsData?.length;) {
              const cardData = vm.cardsData[i];
              if (cardData == null || options[cardData.card_type]) {
                vm.cardsData.splice(i, 1);
              } else i++;
            }
          }
        }, { immediate: true });
      });

      if (options.hotSearchTop) {
        vueSetup.eachComponentVM('card-hot-search', function (vm) {
          vm.$watch(function () { return this.TopWord; }, function () {
            if (vm.TopWord) vm.TopWord = null;
          });
        }, { immediate: true });
      }
    }, util.inject.rootKey, options);
  });

}());
//#endregion
//#region @require yaofang://content/rule/clean/feed.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const observer = yawf.observer;

  const i18n = util.i18n;
  const css = util.css;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanFeedGroupTitle: { cn: '隐藏模块 - 微博内', tw: '隱藏模組 - 微博內', en: 'Hide modules - Weibo' },
    cleanFeedRecommend: { cn: '热门内容推荐', tw: '熱門內容推薦', en: '热门内容推荐 (Feed you may interested in)' },
    cleanFeedOuterTip: { cn: '消息流提示横幅 {{i}}', tw: '消息流提示橫幅 {{i}}', en: 'Tips for feed {{i}}' },
    cleanFeedOuterTipDetail: {
      cn: '消息流内部的提示横幅，如“ 系统提示：根据你的屏蔽设置，系统已过滤掉部分微博。”等内容。',
    },
    cleanFeedInnerTip: { cn: '微博内提示横幅 {{i}}', tw: '微博內提示橫幅 {{i}}', en: 'Tips for feed {{i}}' },
    cleanFeedInnerTipDetail: {
      cn: '各条微博内的提示横幅。v6 位于某条微博顶部，v7 位于作者与正文之间。',
    },
    cleanFeedCommentTip: { cn: '评论框提示横幅 {{i}}', tw: '評論框提示橫幅 {{i}}', en: 'Tips for comment {{i}}' },
    cleanFeedCommentTipDetail: {
      cn: '经常出现在评论框上方的横幅，通常包含如“微博社区管理中心举报处理大厅，欢迎查阅！”等内容。',
    },
    cleanFeedGroupTip: { cn: '顶部分组或好友圈提醒', tw: '頂部分組或好友圈提醒', en: 'Tips for Feed for groups or friends' },
    cleanFeedVIPBackground: { cn: '自定义卡片背景', tw: '自訂卡片背景', en: 'Customized Card Background' },
    cleanFeedLastPic: { cn: '图片列表封底', tw: '圖片清單封底', en: 'Back cover of picture list' },
    cleanFeedPicTag: { cn: '图片标签', tw: '圖片標籤', en: 'Tags for picture' },
    cleanFeedSonTitle: { cn: '同源转发合并提示', tw: '同源转发合并提示', en: 'Merged forwards' },
    cleanFeedCard: { cn: '微博卡片 {{i}}', tw: '微博卡片 {{i}}', en: 'Feed Cards {{i}}' },
    cleanFeedCardDetail: {
      cn: '微博内对分享内容的摘要描述，如话题卡片、长微博卡片、分享内容卡片等。',
    },
    cleanFeedArticlePay: { cn: '微博打赏', tw: '微博打赏', en: 'Feed Acticle Pay' },
    cleanFeedTag: { cn: '微博标签', tw: '微博標籤', en: 'Tags for Feed' },
    cleanFeedRelatedLink: { cn: '相关微博链接 {{i}}', tw: '相關微博連結 {{i}}', en: 'Related feeds Link {{i}}' },
    cleanFeedRelatedLinkDetail: { cn: '位于微博底部的根据微博正文内容的关键字自动生成的话题、电影等的链接。' },
    cleanFeedSource: { cn: '来源', tw: '來源', en: 'Source' },
    cleanFeedSourceDetail: {
      cn: '建议您保留消息来源以方便按照消息来源过滤微博。隐藏消息来源不会影响对应过滤规则的工作。',
    },
    cleanFeedPop: { cn: '阅读数和推广', tw: '閱讀數和推廣', en: 'Reading Count &amp; Promote' },
    cleanFeedLike: { cn: '赞 - 微博', tw: '讚 - 微博', en: 'Like - Feed' },
    cleanFeedLikeComment: { cn: '赞 - 评论', tw: '讚 - 評論', en: 'Like - Comment' },
    cleanFeedLikeAttitude: { cn: '赞 - 表情', tw: '讚 - 表情', en: 'Like - Attitude' },
    cleanFeedForward: { cn: '转发', tw: '轉發', en: 'Forward' },
    cleanFeedFastRepost: { cn: '快转' },
    cleanFeedFavorite: { cn: '收藏', tw: '收藏', en: 'Favorite' },
    cleanFeedPromoteOther: { cn: '帮上头条', tw: '帮上头条', en: '帮上头条' },
    cleanFeedReport: { cn: '举报', hk: '舉報', tw: '舉報/檢舉', en: 'Report' },
    cleanFeedUseCardBackground: { cn: '使用此卡片背景', tw: '使用此卡片背景', en: '使用此卡片背景' },
  });

  clean.CleanGroup('feed', () => i18n.cleanFeedGroupTitle);
  clean.CleanRule('recommend', () => i18n.cleanFeedRecommend, 97, `
[node-type="recommfeed"] { display: none !important; }
[id^="Pl_Official_WeiboDetail__"] .WB_feed_type ~ .WB_cardwrap,
[id^="Pl_Official_WeiboDetail__"] ~ [id^="Pl_Core_NewMixFeed__"] { display: none !important; }
.B_page .WB_frame { min-height: auto; }
`, {
    ainit: function () {
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.eachComponentVM('repost-comment-recom', function (vm) {
          vueSetup.transformComponentRender(vm, function (nodeStruct, Nodes) {
            const { removeChild } = Nodes;
            while (nodeStruct.firstChild) {
              removeChild(nodeStruct, nodeStruct.firstChild);
            }
          });
        });
      }, util.inject.rootKey);
    },
    v7Support: true,
  });
  clean.CleanRule('feed_outer_tip', () => i18n.cleanFeedOuterTip, 1, {
    acss: '.WB_feed > .W_tips { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'ask', template: () => i18n.cleanFeedOuterTip } },
  });
  clean.CleanRule('feed_inner_tip', () => i18n.cleanFeedInnerTip, 91, {
    acss: '.yawf-feed-content .yawf-feed-content-tip-link { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'ask', template: () => i18n.cleanFeedInnerTipDetail } },
    v7Support: true,
  });
  clean.CleanRule('feed_tip', () => i18n.cleanFeedCommentTip, 1, {
    acss: '[node-type="feed_privateset_tip"] { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'ask', template: () => i18n.cleanFeedCommentTipDetail } },
  });
  clean.CleanRule('group_tip', () => i18n.cleanFeedGroupTip, 1, '.WB_feed_type .WB_cardtitle_b { display: none !important; }');
  clean.CleanRule('vip_background', () => i18n.cleanFeedVIPBackground, 1, `
.WB_feed_detail[style*="feed_cover/star_"],
.WB_feed_detail[style*="feed_cover/vip_"] { background: none !important; }
.WB_vipcover, .WB_starcover { display: none !important; }
.WB_feed_vipcover .WB_feed_detail { padding-top: 10px; }
.WB_feed.WB_feed_v3 .WB_feed_vipcover .WB_feed_detail { padding-top: 20px; }
`);
  clean.CleanRule('last_pic', () => i18n.cleanFeedLastPic, 1, function () {
    observer.dom.add(function hideLastPic() {
      const last = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view:not([yawf-piclast]) .pic_choose_box li:last-child a.current');
      if (last) last.closest('.WB_media_view').setAttribute('yawf-piclast', 'yawf-piclast');
      const notLast = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view[yawf-piclast] .pic_choose_box li:not(:last-child) a.current');
      if (notLast) notLast.closest('.WB_media_view').removeAttribute('yawf-piclast');
      const close = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view .artwork_box .ficon_close ');
      if (close) close.click();
    });
    css.append('.WB_feed_type .WB_expand_media .WB_media_view[yawf-piclast] .rightcursor { cursor: url("//img.t.sinajs.cn/t6/style/images/common/small.cur"), auto !important; }');
  });
  clean.CleanRule('pic_tag', () => i18n.cleanFeedPicTag, 1, '.WB_media_view .media_show_box .artwork_box .tag_showpicL, .WB_media_view .media_show_box .artwork_box .tag_showpicR, .icon_taged_pic { display: none !important; }');
  clean.CleanRule('son_title', () => i18n.cleanFeedSonTitle, 1, '.WB_feed_type .WB_feed_together .wft_hd { display: none !important; }');
  clean.CleanRule('card', () => i18n.cleanFeedCard, 1, {
    acss: '.WB_pic_app, .WB_feed_spec, .WB_music { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'ask', template: () => i18n.cleanFeedCardDetail } },
  });
  clean.CleanRule('article_pay', () => i18n.cleanFeedArticlePay, 1, function () {
    observer.dom.add(function hideArticlePay() {
      const element1 = document.querySelector('.feed_app_btn_a a[action-data*="px.e.weibo.com"]');
      if (element1) element1.closest('.feed_app_btn_a').remove();
      const element2 = document.querySelector('.WB_cardwrap #pl_article_articlePay');
      if (element2) element2.closest('.WB_cardwrap').remove();
      const element3 = document.querySelector('.rewardcomponent a[action-type="buyWrap"][action-data*="type=reward"]');
      if (element3) element3.closest('.rewardcomponent').closest(':not(:only-child)').remove();
    });
  });
  clean.CleanRule('tag', () => i18n.cleanFeedTag, 1, '.WB_tag { display: none !important; }');
  clean.CleanRule('related_link', () => i18n.cleanFeedRelatedLink, 1, {
    acss: '.WB_feed_type .WB_tag_rec { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'ask', template: () => i18n.cleanFeedRelatedLinkDetail } },
  });
  clean.CleanRule('source', () => i18n.cleanFeedSource, 1, {
    acss: `
.yawf-feed-source-container { display: none !important; }
`,
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanFeedSourceDetail } },
    v7Support: true,
  });
  clean.CleanRule('pop', () => i18n.cleanFeedPop, 1, `
`);
  clean.CleanRule('like', () => i18n.cleanFeedLike, 1, `.yawf-feed-toolbar-like { display: none !important; }`, { v7Support: true });
  clean.CleanRule('like_comment', () => i18n.cleanFeedLikeComment, 1, `.yawf-feed-comment-icon-list [yawf-icon-list-name="like"] { display: none !important; }`, { v7Support: true });
  clean.CleanRule('like_attitude', () => i18n.cleanFeedLikeAttitude, 1, '.W_layer_attitude { display: none !important; }');
  clean.CleanRule('forward', () => i18n.cleanFeedForward, 1, `.yawf-feed-toolbar-retweet { display: none !important; }`, { v7Support: true });
  clean.CleanRule('fast_repost', () => i18n.cleanFeedFastRepost, 83, { v7Support: true }); // 实现在 render
  clean.CleanRule('favorite', () => i18n.cleanFeedFavorite, 1, `
`);
  clean.CleanRule('promote_other', () => i18n.cleanFeedPromoteOther, 1, '.screen_box .layer_menu_list a[action-data*="promote.vip.weibo.com"] { display: none !important; }');
  clean.CleanRule('report', () => i18n.cleanFeedReport, 1, '.screen_box .layer_menu_list a[onclick*="service.account.weibo.com/reportspam"], .WB_handle ul li[yawf-comment-handle-type="report"] { display: none !important; }');
  clean.CleanRule('use_card_background', () => i18n.cleanFeedUseCardBackground, 1, '.screen_box .layer_menu_list a[action-type="fl_cardCover"] { display: none !important; }');

  // 标记微博评论按钮
  observer.dom.add(function markCommentButton() {
    const cli = Array.from(document.querySelectorAll([
      '.list_ul[node-type="feed_list_commentList"] .WB_handle ul li:not([yawf-comment-handle-type])',
      '.list_ul[node-type="comment_list"] .WB_handle ul li:not([yawf-comment-handle-type])',
      '.WB_feed_comment .WB_handle ul li:not([yawf-comment-handle-type])',
    ].join(',')));
    cli.forEach(li => {
      const a = li.querySelector('a');
      let type = null;
      if (a.matches('[onclick*="service.account.weibo.com/reportspam"]')) type = 'report';
      else if (a.matches('[action-type="delete"]')) type = 'delete';
      else if (a.matches('[action-type="commentDialogue"]')) type = 'conversition';
      else if (a.matches('[action-type="reply"]')) type = 'reply';
      else if (a.matches('[action-type="replycomment"]')) type = 'reply';
      else if (a.matches('[action-type="fl_like"]')) type = 'like';
      li.setAttribute('yawf-comment-handle-type', type ?? '');
    });
  });

  css.append(`
body .WB_handle ul { display: flex; flex-wrap: nowrap; align-items: stretch; margin-left: -4px; }
body .WB_handle ul li { flex: 1 1 auto; float: none; width: auto; }
`);

}());
//#endregion
//#region @require yaofang://content/rule/clean/profile.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const observer = yawf.observer;

  const i18n = util.i18n;
  const css = util.css;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanProfileGroupTitle: { cn: '隐藏模块 - 个人主页', tw: '隱藏模組 - 個人主頁', en: 'Hide modules - Personal home page' },
    cleanProfileMoveThings: { cn: '移动部件（会员模板）', tw: '移動部件（會員模板）', en: 'Moving Things (VIP Template)' },
    cleanProfileCover: { cn: '封面图', tw: '封面圖', en: 'Cover Picture' },
    cleanProfileBGImg: { cn: '背景图', tw: '背景圖', en: 'Background Picture' },
    cleanProfileBadgeIcon: { cn: '勋章', tw: '勳章', en: 'Badges' },
    cleanProfileVerify: { cn: '个人资料认证', tw: '個人資料認證', en: 'Person Info Verification' },
    cleanProfileEditPersonInfo: { cn: '编辑个人资料', tw: '编辑个人资料', en: 'Edit personal info' },
    cleanProfileStats: { cn: '关注/粉丝/微博数', tw: '關注/粉絲/微博數', en: 'Numbers of Following/Followers/Weibo' },
    cleanProfileMyData: { cn: '我的微博人气', tw: '我的微博人氣', en: 'Weibo Popularity' },
    cleanProfileSuggestUser: { cn: '可能感兴趣的人', tw: '可能感興趣的人', en: 'Suggested' },
    cleanProfileGroup: { cn: '公开分组', tw: '公開分組', en: 'Public Groups' },
    cleanProfileRelation: { cn: '微关系', tw: '微關係', en: 'Weibo relations' },
    cleanProfileAlbum: { cn: '相册', tw: '相冊', en: 'Album' },
    cleanProfileHotTopic: { cn: '话题', tw: '話題', en: 'Topic' },
    cleanProfileHotWeibo: { cn: '热门微博', tw: '熱門微博', en: 'Hot Feeds' },
    cleanProfileRecommendFeed: { cn: '相关推荐', tw: '相關推薦', en: 'Recommend Feeds' },
    cleanProfileUserList: { cn: '与他/她相似的人', tw: '與他/她相似的人', en: 'Similar People' },
    cleanProfileHongbao: { cn: '微博红包', tw: '微博紅包', en: 'Red pack' },
    cleanProfileWenwoDr: { cn: '爱问医生', tw: '愛問醫生', en: 'Iask medical' },
    cleanProfileTimeline: { cn: '时间轴', tw: '時間軸', en: 'Timeline' },
  });

  clean.CleanGroup('profile', () => i18n.cleanProfileGroupTitle);
  clean.CleanRule('move_things', () => i18n.cleanProfileMoveThings, 1, '.profile_move_things { display: none !important; }');
  clean.CleanRule('cover', () => i18n.cleanProfileCover, 1, function () {
    css.append(`
.PCD_header.PCD_header, .PCD_header.PCD_header .pf_wrap, .PCD_header.PCD_header .shadow { height: 130px; }
.PCD_header.PCD_header .pf_photo { margin: 10px 20px 10px calc(50% - 280px); float: left; }
.PCD_header.PCD_header .pf_username, .PCD_header.PCD_header .pf_intro { text-shadow: 0 0 4px #000; }
.PCD_header.PCD_header .pf_username, .PCD_header.PCD_header .pf_intro, .PCD_header.PCD_header .pf_opt { text-align: left; margin-left: 140px; }
.PCD_header.PCD_header .pf_wrap .pf_use_num, .PCD_header.PCD_header .pf_wrap .pf_copy_icon, .PCD_header.PCD_header .upcover { display: none; }
.PCD_header.PCD_header .S_shadow, .PCD_header.PCD_header .cover_wrap, .PCD_header.PCD_header .pf_wrap { background: none !important; }
.PCD_header.PCD_header .shadow { margin: 0 calc(50% - 300px); width: 600px; }
.PCD_header.PCD_header .pf_intro { height: 36px; line-height: 18px; text-align: left; text-shadow: 0 0 4px #000; }
.PCD_header.PCD_header .pf_opt { margin-top: 8px; text-align: left; }
    `);
    observer.dom.add(function fullProfileIntroduction() {
      const intro = document.querySelector('.PCD_header .pf_intro:not([yawf-full-intro])');
      if (!intro) return;
      intro.setAttribute('yawf-full-intro', (intro.textContent = intro.title));
    });
  });
  clean.CleanRule('bg_img', () => i18n.cleanProfileBGImg, 1, '.S_page, .S_page .WB_miniblog { background-image: url("\'\'") !important; }');
  clean.CleanRule('badge_icon', () => i18n.cleanProfileBadgeIcon, 1, '.pf_badge_icon { display: none !important; }');
  clean.CleanRule('verify', () => i18n.cleanProfileVerify, 1, '[yawf-id="yawf-pr-pcd-person-info-my"] .verify_area, [yawf-id="yawf-pr-pcd-person-info"] .verify_area { display: none !important; }');
  clean.CleanRule('edit_person_info', () => i18n.cleanProfileEditPersonInfo, 1, '[yawf-id="yawf-pr-pcd-person-info-my"] { display: none !important; }');
  clean.CleanRule('stats', () => i18n.cleanProfileStats, 1, '[yawf-id="yawf-pr-pcd-counter"] { display: none !important; }');
  clean.CleanRule('my_data', () => i18n.cleanProfileMyData, 1, '[id^="Pl_Official_MyMicroworld__"], .WB_frame_b [id^="Pl_Official_MyPopularity__"] { display: none !important; }');
  clean.CleanRule('suggest_user', () => i18n.cleanProfileSuggestUser, 1, '[id^="Pl_Core_RightUserList__"], .WB_frame_b [id^="Pl_Core_RightUserList__"] { display: none !important; }');
  clean.CleanRule('group', () => i18n.cleanProfileGroup, 1, '[id^="Pl_Core_UserGrid__"] { display: none !important; }');
  clean.CleanRule('relation', () => i18n.cleanProfileRelation, 1, '[id^="Pl_Core_RightUserGrid__"], .WB_frame_b [id^="Pl_Core_RightUserGrid__"] { display: none !important; }');
  clean.CleanRule('album', () => i18n.cleanProfileAlbum, 1, '[id^="Pl_Core_RightPicMulti__"], .WB_frame_b [id^="Pl_Core_RightPicMulti__"], [yawf-obj-name="相冊"], [yawf-obj-name="相册"], [yawf-id="yawf-core-right-pic-multi"] { display: none !important; }');
  clean.CleanRule('hot_topic', () => i18n.cleanProfileHotTopic, 1, '[id^="Pl_Core_RightTextSingle__"], .WB_frame_b [id^="Pl_Core_RightTextSingle__"] { display: none !important; }');
  clean.CleanRule('hot_weibo', () => i18n.cleanProfileHotWeibo, 1, '[id^="Pl_Core_RightPicText__"], .WB_frame_b [id^="Pl_Core_RightPicText__"] { display: none !important; }');
  clean.CleanRule('recommend_feed', () => i18n.cleanProfileRecommendFeed, 1, '.WB_frame_b [id^="Pl_Core_RecommendFeed__"] { display: none !important; }');
  clean.CleanRule('user_list', () => i18n.cleanProfileUserList, 1, '[id^="Pl_Core_Ut1UserList__"], .WB_frame_b [id^="Pl_Core_RightPicText__"] { display: none !important; }');
  clean.CleanRule('hongbao', () => i18n.cleanProfileHongbao, 1, '[yawf-id="yawf-pr-hongbao"], .WB_red2017 { display: none !important; }');
  clean.CleanRule('wenwo_dr', () => i18n.cleanProfileWenwoDr, 1, '[yawf-obj-name="爱问医生"] { display: none !important; }'); // 对应模块没有繁体或英文翻译
  clean.CleanRule('timeline', () => i18n.cleanProfileTimeline, 1, '[id^="Pl_Official_TimeBase__"] { display: none !important; }');

  clean.tagElements('Profile', [
    '.WB_frame_b > div:not(:empty):not([yawf-id])',
  ].join(','), {
    '.PCD_counter': 'yawf-pr-pcd-counter',
    '.PCD_person_info': 'yawf-pr-pcd-person-info',
    '.PCD_photolist': 'yawf-core-right-pic-multi',
    '.WB_cardwrap[action-data*="weibo.com%2Fhongbao"]': 'yawf-pr-hongbao',
    '.WB_cardwrap[action-data*="sina.com.cn%2Fhongbao"]': 'yawf-pr-hongbao',
    'a[href*="//hongbao.weibo.com/hongbao"]': 'yawf-pr-hongbao',
    '.PCD_person_info a.WB_cardmore[href^="/p/"][href$="info?mod=pedit"]': 'yawf-pr-pcd-person-info-my',
  });

  observer.dom.add(function tagProfileLeftNames() {
    const titles = Array.from(document.querySelectorAll([
      '.WB_frame_b > div:not([yawf-obj-name]) .main_title',
      '.WB_frame_c > div:not([yawf-obj-name]) .main_title',
    ].join(',')));
    if (!titles.length) return;
    titles.forEach(function (title) {
      const name = title?.textContent.trim() ?? '';
      const container = title.closest('.WB_frame_b > div, .WB_frame_c > div');
      if (!container.hasAttribute('yawf-obj-name')) {
        container.setAttribute('yawf-obj-name', name);
      }
    });
  });

}());
//#endregion
//#region @require yaofang://content/rule/clean/message.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;

  const i18n = util.i18n;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanMessageGroupTitle: { cn: '隐藏模块 - 消息页面', tw: '隱藏模組 - 消息網頁', en: 'Hide modules - News page' },
    cleanMessageHelp: { cn: '使用小帮助', tw: '使用小幫助', en: 'Tips' },
    cleanMessageFeedback: { cn: '微博意见反馈', tw: '微博意見反饋', en: 'Feedback' },
  });

  clean.CleanGroup('message', () => i18n.cleanMessageGroupTitle);
  clean.CleanRule('help', () => i18n.cleanMessageHelp, 1, '#v6_pl_rightmod_helpat, #v6_pl_rightmod_helpcomment, #v6_pl_rightmod_helplike, #v6_pl_rightmod_helpnotebox, #v6_pl_rightmod_helpfav, #v6_pl_rightmod_helpgroupchatnotice { display: none !important; }');
  clean.CleanRule('feedback', () => i18n.cleanMessageFeedback, 1, '#v6_pl_rightmod_feedback { display: none !important; }');

}());
//#endregion
//#region @require yaofang://content/rule/clean/other.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const backend = yawf.backend;

  const i18n = util.i18n;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanOtherGroupTitle: { cn: '隐藏模块 - 杂项', tw: '隱藏模組 - 雜項', en: 'Hide modules - Others' },
    cleanOtherAds: { cn: '广告', tw: '廣告', en: 'Advertisement' },
    cleanOtherTracker: { cn: '追踪器（部分）', en: 'Trackers (Partial)' },
    cleanOtherMusic: { cn: '微音乐', tw: '微音樂', en: 'Weibo Music' },
    cleanOtherTemplate: { cn: '设置模板', tw: '背景設定', en: 'Template Settings' },
    cleanOtherHomeTip: { cn: '顶部提示横幅 {{i}}', tw: '頂部提示橫幅 {{i}}', en: 'Top tips banner {{i}}' },
    cleanOtherHomeTipDetail: {
      cn: '出现在导航栏下方其他所有内容的上方的横幅。一般用来推荐微博重要的新功能。',
    },
    cleanOtherFooter: { cn: '页面底部 {{i}}', tw: '頁面底部 {{i}}', en: 'Footer {{i}}' },
    cleanOtherFooterDetail: {
      cn: '页面底部的导航链接。',
    },
    cleanOtherIM: { cn: '私信聊天（右下） {{i}}', en: 'Chat (bottom right) {{i}}' },
    cleanOtherIMDetail: {
      cn: '隐藏后您还可以在私信页面收发私信：鼠标指向右上角消息图标在下拉菜单中选择“私信”即可打开私信页面。' +
        (env.config.chatInPageSupported ? '配合“[[layout_chat_in_page]]”使用时只隐藏在新标签页打开聊天页面的按钮。' : ''),
    },
    cleanOtherIMNews: { cn: '热点提醒（右下）', tw: '熱點提醒（右下）', en: 'News, bottom right' },
    cleanOtherBackTop: { cn: '返回顶部', tw: '返回頂部', en: 'Back to Top' },
    cleanOtherTip: { cn: '功能提示框 {{i}}', tw: '功能提示框 {{i}}', en: 'Function Tips {{i}}' },
    cleanOtherTipDetail: {
      cn: '偶尔会出现的新功能推荐的弹框，如果隐藏了对应功能的界面可能弹框会显示到奇怪的地方。',
    },
    cleanOtherRelatedFeeds: { cn: '相关微博推荐 {{i}}', tw: '相關微博推薦 {{i}}', en: 'Related Weibo {{i}}' },
    cleanOtherRelatedFeedsDetail: {
      cn: '在单条微博页面可以看到的相关微博推荐',
    },
    cleanOtherRelatedVideo: { cn: '相关视频推荐', tw: '相關視頻推薦', en: 'Related Videos' },
    cleanOtherRelatedArticle: { cn: '头条文章页推荐阅读', tw: '頭條文章頁推薦閱讀', en: 'Suggested Article' },
    cleanOtherSendWeibo: { cn: '首页外的微博发布框 {{i}}', tw: '首頁外的微博發佈框 {{i}}', en: 'All other Weibo publishers {{i}}' },
    cleanOtherSendWeiboDetail: {
      cn: '除了首页的微博发布框，右上角按钮弹出的快速发布框外；其他的各种发布框。如微博文章下方转发用的发布框等。',
    },
  });

  clean.CleanGroup('other', () => i18n.cleanOtherGroupTitle);
  clean.CleanRule('ads', () => i18n.cleanOtherAds, 1, {
    v7Support: true,
    ainit: function () {
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;
        vueSetup.eachComponentVM('card-hot-search', function (vm) {
          vm.$watch(function () { return this.bandList; }, function () {
            const cleanUp = vm.bandList.filter(i => !i.is_ad);
            if (vm.bandList.length !== cleanUp.length) vm.bandList = cleanUp;
          });
          vm.$watch(function () { return this.TopWord; }, function () {
            if (vm.TopWord?.is_ad) vm.TopWord = null;
          });
        }, { immediate: true });

        vueSetup.eachComponentVM('new-hot', function (vm) {
          vm.$watch(function () { return this.list; }, function () {
            const list = vm.list;
            if (Array.isArray(list) && list.some(item => item.realpos)) {
              for (let i = 0; i < list.length;) {
                if (!list[i].realpos) {
                  list.splice(i, 1);
                } else i++;
              }
            }
            vm.hasTop = false;
          });
        });

        vueSetup.transformComponentsRenderByTagName('tips-ad', function () {
          return function () { return null; };
        }, { raw: true });
      }, util.inject.rootKey);
    },
  });
  if (env.config.requestBlockingSupported) {
    clean.CleanRule('tracker', () => i18n.cleanOtherTracker, 1, {
      init: function () {
        backend.onRequest('tracker', details => {
          if (this.isEnabled()) return { cancel: true };
          return {};
        });
      },
    });
  }
  clean.CleanRule('music', () => i18n.cleanOtherMusic, 1, '.PCD_mplayer { display: none !important; }');
  clean.CleanRule('template', () => i18n.cleanOtherTemplate, 1, '.icon_setskin { display: none !important; }');
  clean.CleanRule('home_tip', () => i18n.cleanOtherHomeTip, 1, '#v6_pl_content_hometip { display: none !important }');
  clean.CleanRule('footer', () => i18n.cleanOtherFooter, 1, {
    acss: '[yawf-component-tag*="copy-right"] { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanOtherFooterDetail } },
    v7Support: true,
  });
  clean.CleanRule('im', () => i18n.cleanOtherIM, 1, {
    acss: '.WB_webim { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanOtherIMDetail } },
  });
  clean.CleanRule('im_news', () => i18n.cleanOtherIMNews, 1, '.webim_news { display: none !important; }');
  clean.CleanRule('back_top', () => i18n.cleanOtherBackTop, 1, '.W_gotop { display: none !important; }');
  clean.CleanRule('tip', () => i18n.cleanOtherTip, 1, {
    acss: '.W_layer_tips { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanOtherTipDetail } },
  });
  clean.CleanRule('related_feeds', () => i18n.cleanOtherRelatedFeeds, 1, {
    acss: '[yawf-obj-name="相关推荐"] { display: none !important; } #WB_webim .wbim_chat_box, #WB_webim .wbim_min_chat  { right: 20px !important; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanOtherRelatedFeedsDetail } },
  });
  clean.CleanRule('related_video', () => i18n.cleanOtherRelatedVideo, 1, '.video_box_more { display: none !important; }');
  clean.CleanRule('related_article', () => i18n.cleanOtherRelatedArticle, 1, '.WB_artical [node-type="recommend"] { display: none !important; }');
  clean.CleanRule('send_weibo', () => i18n.cleanOtherSendWeibo, 1, {
    acss: '.send_weibo_simple { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanOtherSendWeiboDetail } },
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/layout.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.layoutTabTitle = {
    cn: '版面展示',
    en: 'Layout',
  };

  const layout = yawf.rules.layout = {};
  layout.layout = rule.Tab({
    template: () => i18n.layoutTabTitle,
    pagemenu: true,
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/navbar.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;

  const navbar = layout.navbar = {};

  i18n.navbarToolGroupTitle = {
    cn: '导航栏',
    tw: '導覽列',
    en: 'Navbar',
  };

  navbar.navbar = rule.Group({
    parent: layout.layout,
    template: () => i18n.navbarToolGroupTitle,
  });

  i18n.navbarAutoHide = {
    cn: '自动隐藏导航栏',
    tw: '自動隱藏導覽列',
    en: 'Navbar hide automatically',
  };

  navbar.autoHide = rule.Rule({
    id: 'layout_nav_auto_hide',
    version: 1,
    parent: navbar.navbar,
    template: () => i18n.navbarAutoHide,
    ainit() {
      const attr = 'yawf-navbar-autohide';
      const updateNavFloat = function () {
        const navs = document.querySelectorAll('.WB_global_nav');
        if (!navs.length) return;
        // 你能相信吗？导航栏不一定有一个。很神奇的呢
        const y = window.scrollY;
        Array.from(navs).forEach(function (nav) {
          const f = nav.hasAttribute(attr), r = 42;
          if (y < r && f) nav.removeAttribute(attr);
          if (y >= r && !f) nav.setAttribute(attr, '');
        });
      };
      document.addEventListener('scroll', updateNavFloat);
      updateNavFloat();
      css.append(`
.WB_global_nav:not([${attr}]), .WB_global_nav[${attr}] { margin-top: -50px; top: 50px; box-shadow: none; }
.WB_global_nav[${attr}] { top: 0; transition: top ease-in-out 0.1s 0.33s; }
.WB_global_nav[${attr}]:hover { top: 50px; transition: top ease-in-out 0.1s 0s; }
.WB_global_nav[${attr}]:focus-within { top: 50px; transition: top ease-in-out 0.1s 0s; }
.WB_global_nav[${attr}]::after { content: " "; width: 100%; height: 8px; clear: both; float: left; background: linear-gradient(to bottom, rgba(0, 0, 0, 0.3) 0%, transparent 75%, transparent 100%); }
/* 固定小黄签位置 */
.WB_global_nav[${attr}] .gn_topmenulist_tips { padding-top: 52px; transition: padding-top ease-in-out 0.1s 0.33s; }
.WB_global_nav[${attr}]:hover .gn_topmenulist_tips { padding-top: 2px; transition: padding-top ease-in-out 0.1s 0s; }
.WB_global_nav[${attr}] .gn_topmenulist_tips .ficon_close { top: 56px; transition: top ease-in-out 0.1s 0.33s; }
.WB_global_nav[${attr}]:hover .gn_topmenulist_tips .ficon_close { top: 6px; transition: top ease-in-out 0.1s 0s; }
/* 浮动元素 */
.W_fixed_top { top: 10px !important; }
`);
    },
  });

  Object.assign(i18n, {
    reorderNavbar: {
      cn: '恢复旧式导航栏排列 {{i}}',
      hk: '恢復旧式导览列排列 {{i}}',
      en: 'Restore old navbar layout {{i}}',
    },
    reorderNavbarDetail: {
      cn: '微博字样紧贴在标识右侧显示，“首页”“热门”“游戏”的链接出现在搜索框的左侧。',
    },
  });

  navbar.oldLayout = rule.Rule({
    id: 'layout_nav_classical',
    version: 1,
    parent: navbar.navbar,
    template: () => i18n.reorderNavbar,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.reorderNavbarDetail },
    },
    ainit() {
      const moveNavList = function moveNavList() {
        const search = document.querySelector('.WB_global_nav .gn_search, .WB_global_nav .gn_search_v2');
        const list = document.querySelector('.WB_global_nav .gn_header .gn_position .gn_nav .gn_nav_list');
        if (!search || !list) return;
        const items = Array.from(list.querySelectorAll('li')).slice(0, -1);
        const gnlistWrap = document.createElement('div');
        gnlistWrap.innerHTML = '<div class="gn_nav"><ul class="gn_nav_list"></ul></div>';
        const nlist = gnlistWrap.querySelector('ul');
        items.forEach(function (l) { nlist.appendChild(l); });
        search.parentNode.insertBefore(gnlistWrap.firstChild, search);
        search.parentNode.appendChild(search);
        css.append(`
.WB_global_nav.WB_global_nav .gn_search,
.WB_global_nav.WB_global_nav .gn_search_v2 { float: right; }
.WB_global_nav.WB_global_nav .gn_header { text-align: right; }
.WB_global_nav.WB_global_nav .gn_header > * { text-align: left; }
.WB_global_nav.WB_global_nav .gn_header > .gn_nav { margin-right: 0; }
.WB_global_nav_us.WB_global_nav_us .gn_header { background-image: none; }
.WB_global_nav_us.WB_global_nav_us .gn_logo,
.WB_global_nav_us.WB_global_nav_us .gn_logo .box,
.WB_global_nav.WB_global_nav .gn_logo,
.WB_global_nav.WB_global_nav .gn_logo a { width: 140px !important; left: 0 !important; }
.WB_global_nav_us.WB_global_nav_us .gn_logo .box .logo,
.WB_global_nav_us.WB_global_nav_us .gn_logo .box img { display: block; }
.WB_global_nav.WB_global_nav .gn_logo .box .logo { margin-left: 0; }
.WB_global_nav_us.WB_global_nav_us .gn_position { margin-right: 0; }
`);
        observer.dom.remove(moveNavList);
      };
      observer.dom.add(moveNavList);
    },
  });

  Object.assign(i18n, {
    navHideNameReplace: { cn: '替换为“个人主页”', tw: '替換為「個人主頁」', en: 'replaced by text "My Profile"' },
    navHideNameHidden: { cn: '隐藏', tw: '隱藏', en: 'hidden' },
    navHideNameDetail: {
      cn: '此外您还可以隐藏隐藏右栏的 [[clean_right_info]] 模块。以及打开 [[layout_nav_auto_hide]] 。',
    },
    navHideNameReplaceText: { cn: '个人主页', tw: '個人主頁', en: 'My Profile' },
  });

  Object.assign(i18n, {
    navHideAvatar: { cn: '导航栏不显示个人头像' },
  });
  const hideNavAvatar = css.add('[class*="Ctrls_avatarItem_"] { visibility: hidden; }');
  navbar.navHideAvatar = rule.Rule({
    v7Support: true,
    id: 'layout_nav_hide_avatar',
    version: 85,
    parent: navbar.navbar,
    template: () => i18n.navHideAvatar,
    init() {
      hideNavAvatar.remove();
      if (!this.getConfig()) return;
      const sprite = document.getElementById('__SVG_SPRITE_NODE__');
      const svg = new DOMParser().parseFromString(`<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg">
<symbol xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" id="woo_svg_nav_profile">
<path d="m21.916 10.4q0-1.8589-0.93159-3.45-0.93157-1.5911-2.5263-2.5205-1.5947-0.92946-3.4579-0.92946-1.8632 0-3.4579 0.92946-1.5947 0.92943-2.5263 2.5205-0.93158 1.5911-0.93158 3.45 0 1.7329 0.82105 3.2452 0.82106 1.5123 2.2105 2.4575-1.8632 0.75616-3.2842 2.174-1.4211 1.4178-2.2105 3.2452-0.82105 1.8904-0.82105 3.9699 0 0.40958 0.28421 0.7089 0.2842 0.29932 0.69474 0.29932h18.442q0.41052 0 0.69474-0.29932 0.28421-0.29932 0.28421-0.7089 0-2.0795-0.82105-3.9699-0.78948-1.8274-2.2105-3.2452-1.4211-1.4178-3.2842-2.174 1.3895-0.94521 2.2105-2.4575 0.82106-1.5123 0.82106-3.2452zm-6.9158 4.663q-1.2632 0-2.3368-0.63014-1.0737-0.63014-1.7053-1.7014-0.63158-1.0712-0.63158-2.3315 0-1.2603 0.63158-2.3315 0.63158-1.0712 1.7053-1.7014 1.0737-0.63014 2.3368-0.63014 1.2632 0 2.3368 0.63014 1.0737 0.63014 1.7053 1.7014 0.63158 1.0712 0.63158 2.3315 0 1.2603-0.63158 2.3315-0.63158 1.0712-1.7053 1.7014-1.0737 0.63014-2.3368 0.63014zm-8.1789 9.452q0.25264-2.0164 1.4053-3.6705 1.1526-1.6541 2.9368-2.5993 1.7842-0.94521 3.8368-0.94521 2.0526 0 3.8368 0.94521 1.7842 0.94519 2.9368 2.5993 1.1526 1.6541 1.4053 3.6705z" fill="currentColor"/>
</symbol>
<symbol xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 30 30" id="woo_svg_nav_profileFlat">
<path d="m21.916 10.4c0-1.2393-0.31053-2.3893-0.93159-3.45-0.62104-1.0607-1.4632-1.9009-2.5263-2.5205-1.0632-0.61964-2.2158-0.92946-3.4579-0.92946-1.2421 0-2.3947 0.30982-3.4579 0.92946-1.0632 0.61962-1.9053 1.4598-2.5263 2.5205-0.62106 1.0607-0.93158 2.2108-0.93158 3.45 0 1.1552 0.27368 2.237 0.82105 3.2452 0.54737 1.0082 1.2842 1.8274 2.2105 2.4575-1.2421 0.50411-2.3368 1.2288-3.2842 2.174-0.94737 0.94521-1.6842 2.0269-2.2105 3.2452-0.54737 1.2603-0.82105 2.5835-0.82105 3.9699 0 0.27306 0.094737 0.50936 0.28421 0.7089 0.18947 0.19955 0.42105 0.29932 0.69474 0.29932h18.442c0.27368 0 0.50526-0.09977 0.69474-0.29932 0.18947-0.19955 0.28421-0.43585 0.28421-0.7089 0-1.3863-0.27368-2.7096-0.82105-3.9699-0.52632-1.2183-1.2632-2.3-2.2105-3.2452-0.94737-0.94521-2.0421-1.6699-3.2842-2.174 0.92632-0.63014 1.6632-1.4493 2.2105-2.4575 0.54737-1.0082 0.82106-2.0899 0.82106-3.2452z" fill="currentColor"/>
</symbol>
</svg>`, 'image/svg+xml');
      [...svg.querySelectorAll('symbol')].forEach(symbol => sprite.appendChild(symbol));
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.eachComponentVM('ctrls', function (vm) {
          vm.$watch(function () { return this.navItems; }, function () {
            const profile = vm.navItems.find(item => item.name === 'profile');
            if (profile?.src) profile.src = '';
            vm.$forceUpdate();
          }, { deep: true, immediate: true });
        });
      }, util.inject.rootKey);
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/sidebar.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const init = yawf.init;
  const rules = yawf.rules;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;
  const priority = util.priority;

  const sidebar = layout.sidebar = {};

  i18n.sidebarToolGroupTitle = {
    cn: '边栏',
    tw: '邊欄',
    en: 'Sidebar',
  };

  sidebar.sidebar = rule.Group({
    parent: layout.layout,
    template: () => i18n.sidebarToolGroupTitle,
  });

  const sidebarOn = config => {
    if (sidebar.merge.ref.side.getConfig() !== config) {
      sidebar.merge.ref.side.setConfig(config);
    }
    if (sidebar.allSidebarOn.ref.side.getConfig() !== config) {
      sidebar.allSidebarOn.ref.side.setConfig(config);
    }
  };

  Object.assign(i18n, {
    sidebarShowMessages: {
      cn: '在首页左栏显示消息分组，包括以下链接{{i}}||{{atme}}|{{cmt}}|{{like}}|{{dm}}|{{msgbox}}|{{group}}|{{dmsub}}',
      tw: '在首頁左欄顯示消息分組，包括以下連結{{i}}||{{atme}}|{{cmt}}|{{like}}|{{dm}}|{{msgbox}}|{{group}}|{{dmsub}}',
      en: 'Show a link to new messages in left column of home page with following items {{i}}||{{atme}}|{{cmt}}|{{like}}||{{dm}}|{{msgbox}}|{{group}}|{{dmsub}}',
    },
    sidebarShowMessagesWarning: {
      cn: '在分辨率较小的屏幕上添加过多项目可能导致显示不完全。',
      tw: '熒幕解析度過小時加入過多連接可致無法完全顯示。',
      en: 'It may not displayed correctly if too many links added on a low resolution monitor.',
    },
    sidebarShowMessagesMsg: { cn: '消息', en: 'News' },
    sidebarShowMessagesAtMe: { cn: '@我的', tw: '@我的', en: 'Mentioned' },
    sidebarShowMessagesCmt: { cn: '评论', tw: '評論', en: 'Comment' },
    sidebarShowMessagesLike: { cn: '赞', tw: '讚', en: 'Like' },
    sidebarShowMessagesDM: { cn: '私信', en: 'Message' },
    sidebarShowMessagesMsgBox: { cn: '未关注人私信', tw: '未關注人私信', en: "Strangers' Messages" },
    sidebarShowMessagesGroup: { cn: '群通知', en: 'Group message' },
    sidebarShowMessagesDMSub: { cn: '订阅消息', tw: '訂閱消息', en: 'Subscribe' },
  });

  sidebar.messages = rule.Rule({
    id: 'layout_left_messages',
    version: 1,
    parent: sidebar.sidebar,
    template: () => i18n.sidebarShowMessages,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.sidebarShowMessagesWarning },
      atme: { type: 'boolean', template: () => i18n.sidebarShowMessagesAtMe, initial() { return true; } },
      cmt: { type: 'boolean', template: () => i18n.sidebarShowMessagesCmt, initial() { return true; } },
      like: { type: 'boolean', template: () => i18n.sidebarShowMessagesLike },
      dm: { type: 'boolean', template: () => i18n.sidebarShowMessagesDM },
      msgbox: { type: 'boolean', template: () => i18n.sidebarShowMessagesMsgBox },
      group: { type: 'boolean', template: () => i18n.sidebarShowMessagesGroup },
      dmsub: { type: 'boolean', template: () => i18n.sidebarShowMessagesDMSub },
    },
    ainit() {
      const rule = this;
      const html = {
        msg: template => template.innerHTML = '<div class="lev_Box lev_Box_noborder yawf-leftMsg"><h3 class="lev"><a href="/at/weibo?leftnav=1" class="S_txt1" node-type="item" suda-uatrack="key=V6update_leftnavigate&amp;value=message" bpfilter="message"><span class="levtxt yawf-levtxt"></span></a></h3></div>',
        atme: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_at"><a class="S_txt1" nm="mention_all" bpfilter="message" hrefextra="/at/weibo|/at/comment" nt="mention" node-type="item" href="/at/weibo?leftnav=1&amp;wvr=6&amp;nofilter=1"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
        cmt: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_cmt"><a class="S_txt1" nm="cmt_all" bpfilter="message" hrefextra="/comment/inbox|/comment/outbox" node-type="item" href="/comment/inbox?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
        like: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_like"><a class="S_txt1" nm="attitude" bpfilter="message" node-type="item" href="/like/inbox?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
        dm: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_dm"><a class="S_txt1" nm="dm" bpfilter="message" hrefextra="/messages|/message/history" node-type="item" href="/messages?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
        msgbox: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_msgbox"><a class="S_txt1" nm="msgbox_c" bpfilter="message" node-type="item" href="/notesboard?leftnav=1&amp;wvr=6"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
        group: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_group"><a class="S_txt1" nm="chat_group_notice" bpfilter="message" node-type="item" href="/messages?leftnav=1&amp;wvr=6&amp;is_notice=1"><span class="ico_block"><em node-type="left_item" class="W_ficon ficon_dot S_ficon">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
        dmsub: template => template.innerHTML = '<div class="lev" yawf-id="leftnav_msg_dmsub"><a class="S_txt1" nm="dm_group" bpfilter="message" node-type="item" href="/message/sub?leftnav=1&wvr=6"><span class="ico_block"><em class="W_ficon ficon_dot S_ficon" node-type="left_item">D</em></span><span class="levtxt yawf-levtxt"></span></a></div>',
      };
      const leftNavItem = function (type, text) {
        const template = document.createElement('div');
        html[type](template);
        const textContainer = template.querySelector('.yawf-levtxt');
        textContainer.textContent = text;
        return template.firstChild;
      };
      const messages = leftNavItem('msg', i18n.sidebarShowMessagesMsg);
      ['atme', 'cmt', 'like', 'dm', 'msgbox', 'group', 'dmsub'].forEach(type => {
        const configItem = rule.ref[type];
        if (!configItem.isEnabled()) return;
        const item = leftNavItem(type, configItem.text());
        messages.appendChild(item);
      });
      observer.dom.add(function sidebarShowMessages() {
        const groupList = document.querySelector('#v6_pl_leftnav_group [node-type="groupList"]:not([yawf-message])');
        if (!groupList) return;
        let home = groupList.querySelector('.lev a[href*="/home?"]');
        while (home && home.parentNode !== groupList) home = home.parentNode;
        if (!home) return;
        const ref = home ? home.nextSibling : groupList.firstChild;
        if (!ref) return;
        groupList.setAttribute('yawf-message', '');
        ref.parentNode.insertBefore(messages, ref);
      });
    },
  });

  Object.assign(i18n, {
    sidebarShowLiked: { cn: '在首页左侧栏增加||{{fav}}我的收藏|{{like}}我的赞' },
  });
  sidebar.liked = rule.Rule({
    v7Support: true,
    id: 'layout_left_liked',
    version: 85,
    parent: sidebar.sidebar,
    template: () => i18n.sidebarShowLiked,
    ref: {
      fav: { type: 'boolean', get initial() { return true; } },
      like: { type: 'boolean', get initial() { return true; } },
    },
    ainit() {
      const configs = {
        fav: this.ref.fav.getConfig(),
        like: this.ref.like.getConfig(),
      };
      util.inject(function (rootKey, configs) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.transformComponentsRenderByTagName('left-nav-home', function (nodeStruct, Nodes) {
          const { h, insertBefore } = Nodes;

          const divider = nodeStruct.querySelector('x-woo-divider');
          if (!divider) return;
          const container = divider.parentNode;

          const onClick = function (target) {
            const vm = this;
            return function () {
              vueSetup.eachComponentVM('weibo-top-nav', function (vm) {
                const index = vm.channels.findIndex(item => item.name === 'profile');
                if (index !== -1) vm.tapHandle(index);
              }, { watch: false });
              vueSetup.closest(vm, 'nav').getModule('profile');
              vm.$router.push(target);
            };
          }.bind(this);

          if (configs.fav) {
            const target = { name: 'fav', params: { id: this.$root.config.uid } };
            const navItem = h('nav-item', {
              key: 'yawf-fav',
              class: 'yawf-nav-item',
              attrs: { icon: 'navCollect', text: '我的收藏' },
              on: { click: onClick(target) },
            });
            const navLink = h('a', {
              key: 'yawf-fav',
              class: 'yawf-nav-link yawf-extra-link yawf-link-mfsp yawf-link-nmfpd',
              attrs: { href: this.$router.resolve(target).href },
            }, [navItem]);
            insertBefore(container, navLink, divider);
          }
          if (configs.like) {
            const target = { name: 'like', params: { id: this.$root.config.uid } };
            const navItem = h('nav-item', {
              key: 'yawf-like',
              class: 'yawf-nav-item',
              attrs: { icon: 'navLike', text: '我的赞' },
              on: { click: onClick(target) },
            });
            const navLink = h('a', {
              key: 'yawf-like',
              class: 'yawf-nav-link yawf-extra-link yawf-link-mfsp yawf-link-nmfpd',
              attrs: { href: this.$router.resolve(target).href },
            }, [navItem]);
            insertBefore(container, navLink, divider);
          }
        });
      }, util.inject.rootKey, configs);
    },
  });

  Object.assign(i18n, {
    sidebarMerge: { cn: '合并左右边栏|到{{side}}{{i}}', hk: '合併左右邊欄|到{{side}}{{i}}', tw: '合併左右邊欄|到{{side}}{{i}}', en: 'Merge left &amp; right column | to {{side}}{{i}}' },
    sidebarMergeToLeft: { cn: '左侧', hk: '左側', tw: '左側', en: 'left side' },
    sidebarMergeToRight: { cn: '右侧', hk: '右側', tw: '右側', en: 'right side' },
    sidebarMergeDetail: {
      cn: '开启此选项后，左栏切换页面可能会导致微音乐播放中断。',
    },
  });

  sidebar.merge = rule.Rule({
    id: 'layout_side_merge',
    version: 1,
    parent: sidebar.sidebar,
    template: () => i18n.sidebarMerge,
    ref: {
      side: {
        type: 'select',
        select: [
          { value: 'left', text: () => i18n.sidebarMergeToLeft },
          { value: 'right', text: () => i18n.sidebarMergeToRight },
        ],
        default: 'right',
      },
      i: { type: 'bubble', icon: 'warn', template: () => i18n.sidebarMergeDetail },
    },
    init() {
      this.addConfigListener(newValue => {
        if (!newValue) return;
        if (!layout.scroll.scrollLeft.getConfig()) return;
        if (!layout.scroll.scrollRight.getConfig()) return;
        layout.scroll.scrollRight.setConfig(false);
      });
      this.ref.side.addConfigListener(sidebarOn);
    },
    ainit: function mergeLeftRight() {
      // 发现页面的逻辑不一样，做处理很麻烦，所以不做处理
      if (init.page.type() === 'discover') return;

      const main = document.body;
      const side = this.ref.side.getConfig() === 'right' ? 'right' : 'left';
      let left = document.querySelector('.WB_main_l');
      if (!left) { setTimeout(mergeLeftRight.bind(this), 100); return; }

      const leftPlaceholder = document.createElement('div');
      leftPlaceholder.className = 'yawf-left-fake';
      leftPlaceholder.style.display = 'none !important';
      left.before(leftPlaceholder);
      left.remove();

      // 在 body 上设置当前合并状态，供其他设置项或者其他脚本使用
      const updateMainAttr = function (side) {
        if (side && main.getAttribute('yawf-merge-left') !== side) {
          main.setAttribute('yawf-merge-left', side);
        }
        if (!side && main.hasAttribute('yawf-merge-left')) {
          main.removeAttribute('yawf-merge-left');
        }
      };

      // 将左栏的样式改为卡片效果（或改回）
      // 由于左栏样式都加在 .WB_left_nav 上，所以使用 .yawf-WB_left_nav 来躲开这些样式
      // 但相关需要保留的样式，在上面重新添加
      const fixStylish = (function () {
        let lastOnRight = false;
        // 左栏合并过去之后要改一下样式
        // 考虑到要能适应各种模板，所以就改得稍微有点过分
        // 比如说压根就没有 .WB_left_nav 这个属性了，免得颜色乱掉
        return function (onRight) {
          if (onRight == null) onRight = lastOnRight; else lastOnRight = onRight;
          const nav = left.querySelector('.WB_left_nav, .yawf-WB_left_nav');
          if (!nav) return;
          const className = onRight ? 'yawf-WB_left_nav WB_cardwrap S_bg2' : 'WB_left_nav';
          if (nav.className !== className) nav.className = className;
        };
      }());

      // 更新左侧栏位置
      const positionLeft = function () {
        const ref = document.querySelector('#v6_pl_rightmod_myinfo');
        const right = document.querySelector('.WB_main_r');
        const leftn = document.querySelector('.WB_main_l');
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
          if (leftPlaceholder.previousSibling !== left) {
            leftPlaceholder.parentNode.insertBefore(left, leftPlaceholder);
            updateMainAttr();
            fixStylish(false);
          }
        }
      };

      css.append(`
[yawf-merge-left] .WB_frame .WB_main_l,
[yawf-merge-left] .WB_frame .yawf-WB_left_nav,
[yawf-merge-left] .WB_frame .WB_left_nav { width: 229px; padding: 0; float: none; }
[yawf-merge-left] .WB_frame { background-position: -300px center; padding-left: 10px; }
[yawf-merge-left] .WB_frame .yawf-WB_left_nav .lev_line fieldset,
[yawf-merge-left] .WB_frame .WB_left_nav .lev_line fieldset { padding-left: 190px; }
[yawf-merge-left] .WB_left_nav .lev a:hover, .WB_left_nav .lev_curr,
[yawf-merge-left] .WB_left_nav .lev_curr:hover,
[yawf-merge-left] .WB_left_nav .levmore .more { background: rgba(128, 128, 128, 0.1) !important; }
[yawf-merge-left] .WB_left_nav .lev_Box,
[yawf-merge-left] .WB_left_nav fieldset { border-color: rgba(128, 128, 128, 0.5) !important; }
[yawf-merge-left] .WB_frame .WB_main_l #v6_pl_leftnav_msgbox.yawf-cardwrap h3 { padding: 0 16px; }
[yawf-merge-left] .WB_webim_page #weibochat { position: static !important; }
[yawf-merge-left] .WB_webim_page .webim_contacts_mod { position: static !important; max-height: calc(100vh - 410px); }
[yawf-merge-left] .WB_webim_page .webim_contacts_bd { max-height: calc(100vh - 470px); }
[yawf-merge-left] .webim_chat_window .WB_webim_page .webim_contacts_mod,
[yawf-merge-left] .webim_chat_window .WB_webim_page .webim_contacts_bd { max-height: none; }
[yawf-merge-left] body .W_gotop { margin-left: calc(calc(var(--yawf-feed-width) + 260px) / 2); }
[yawf-merge-left] .unlogin_left_nav .lev_Box { position: static !important; width: 230px; }
[yawf-merge-left="left"] .WB_frame .WB_main_r { float: left; }
[yawf-merge-left="left"] .WB_frame .WB_main_c { float: right; }

@media screen and (max-width: 1006px) {
  body[yawf-merge-left] a.W_gotop { margin-left: calc(calc(var(--yawf-feed-width) + 20px) / 2); }
  body[yawf-merge-left="left"] .WB_main .WB_main_c { float: none; }
  body[yawf-merge-left="left"] .W_fold { right: auto; left: 0; transform: scaleX(-1); }
  body[yawf-merge-left="left"] .W_fold.W_fold_out { left: 269px; }
  body[yawf-merge-left="left"] .WB_main_r { right: auto; left: 0px; transform: translateX(-100%) translateZ(0px); }
  body[yawf-merge-left="left"] .WB_main_r.W_fold_layer { left: 269px; }
  body[yawf-merge-left="left"] .WB_main_r { direction: rtl; }
  body[yawf-merge-left="left"] .WB_main_r .WB_cardwrap { direction: ltr; }
}

`);

      // following codes are copied and modified from weibo, some one else may hold copyright
      // codes modified from http://img.t.sinajs.cn/t6/style/css/module/combination/home_A.css begin
      css.append(`
.yawf-WB_left_nav { width: 150px; }
.yawf-WB_left_nav .lev_Box { /* border-bottom-width: 1px; border-bottom-style: solid; */ }
.yawf-WB_left_nav .lev_Box_noborder { border-bottom: none; }
.yawf-WB_left_nav .lev_line fieldset { display: block; height: 22px; padding: 0 0 0 120px; zoom: 1; clear: both; border-top-width: 1px; border-top-style: solid; }
.yawf-WB_left_nav .lev_line legend { line-height: 22px; font-size: 14px; padding: 0 3px 0 4px; }
.yawf-WB_left_nav .lev_line legend .ficon_setup:hover { text-shadow: 0px 0px 4px rgba(0, 0, 0, .4); }
.yawf-WB_left_nav .lev_line_v2 fieldset { height: 11px; margin-top: 11px; }
.yawf-WB_left_nav .lev_Box h3 { display: block; height: 34px; line-height: 34px; font-size: 14px; font-weight: bold; text-decoration: none; overflow: hidden; }
.yawf-WB_left_nav .lev_Box h3.lev a { font-size: 14px; font-weight: bold; padding: 0 0 0 15px; height: 34px; line-height: 34px; }
.yawf-WB_left_nav .lev_Box h3.lev a .pic { width: 18px; height: 18px; float: left; margin: 8px 5px 0 0; }
.yawf-WB_left_nav .lev_Box h3.lev a .W_ficon { float: right; }
.yawf-WB_left_nav .lev_Box h3.S_txt1 { padding: 0 0 0 15px; }
.yawf-WB_left_nav .lev_Box h3 .ficon_add, .WB_left_nav .lev_Box h3 .ficon_setup { display: block; float: right; font-size: 14px; margin-right: 10px; }
.yawf-WB_left_nav .lev_Box h3 .ficon_add:hover, .WB_left_nav .lev_Box h3 .ficon_setup:hover { text-shadow: 0px 0px 4px rgba(0, 0, 0, .4); }
.yawf-WB_left_nav .lev a { display: block; height: 34px; line-height: 34px; font-size: 12px; padding: 0 0 0 13px; text-decoration: none; overflow: hidden; position: relative; }
.yawf-WB_left_nav .lev .lev_curr .levtxt { font-weight: bold; } 
.yawf-WB_left_nav .lev .lev_curr .ficon_dot, .WB_left_nav .lev .lev_curr .ficon_friends, .WB_left_nav .lev .lev_curr .ficon_groupwb, .WB_left_nav .lev .lev_curr .ficon_p_interest, .WB_left_nav .lev .lev_curr .ficon_p_rmd, .WB_left_nav .lev .lev_curr .ficon_p_quietfollow, .WB_left_nav .lev .lev_curr .ficon_vplus { width: 12px; letter-spacing: 18px; text-indent: -30px; } 
.yawf-WB_left_nav .lev .lev_curr .ficon_dot:after, .WB_left_nav .lev .lev_curr .ficon_friends:after, .WB_left_nav .lev .lev_curr .ficon_groupwb:after, .WB_left_nav .lev .lev_curr .ficon_p_interest:after, .WB_left_nav .lev .lev_curr .ficon_p_rmd:after, .WB_left_nav .lev .lev_curr .ficon_p_quietfollow:after, .WB_left_nav .lev .lev_curr .ficon_vplus:after { content: "B"; }
.yawf-WB_left_nav .lev .ficon_gotop { display: none; }
.yawf-WB_left_nav .lev_gotop a:hover .ficon_gotop { display: block; }
.yawf-WB_left_nav .lev_gotop a:hover .ficon_gotop:hover { text-shadow: 0px 0px 4px rgba(0, 0, 0, .4); }
.yawf-WB_left_nav .lev .levtxt { display: inline-block; max-width: 82px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; cursor: pointer; }
.yawf-WB_left_nav .lev .W_new_count { float: right; margin: 10px 10px 0 0; *margin: -25px 10px 0 0; background: #ed741c; color: #fff; }
.yawf-WB_left_nav .lev .W_new { float: right; margin: 12px 8px 0 0; } 
.yawf-WB_left_nav .lev .ico_block { float: left; width: 17px; text-align: center; margin: 0 3px 0 0; }
.yawf-WB_left_nav .lev .ico_block .pic { width: 16px; height: 16px; float: left; margin-top: 7px; } 
.yawf-WB_left_nav .lev .ficon_hot, .WB_left_nav .lev .ficon_video { margin: 0; font-size: 14px; }
.yawf-WB_left_nav .levmore { display: block; height: 30px; line-height: 30px; text-align: center; } 
.yawf-WB_left_nav .levmore .more { position: relative; height: 14px; line-height: 14px; padding: 2px 6px; border-radius: 3px; text-decoration: none; zoom: 1; }
.yawf-WB_left_nav .levmore .W_btn_b { margin: 8px 10px 8px 0; } 
.yawf-WB_left_nav .levmore .W_new { position: absolute; top: 0; right: -1px; }
.yawf-WB_left_nav .UI_scrollView { position: relative; } 
.yawf-WB_left_nav .W_scroll_y { right: 0; } 
`);
      // codes modified from http://img.t.sinajs.cn/t6/style/css/module/combination/home_A.css end

      // 强制点击链接时刷新页面，以解决因暴力修改造成的问题
      const forceReflush = (function () {
        let l = null;
        return function () {
          if (l === left) return; else l = left;
          left.addEventListener('click', function (e) {
            const t = e.target.closest('a'); if (!t) return;
            const href = t.href; if (!href.match(/^(?:https?:)\/\//)) return;
            e.stopPropagation(); e.preventDefault();
            util.inject(function (href) { location.assign(href); }, href);
          }, true);
        };
      }());

      observer.dom.add(function sidebarMerge() {
        positionLeft();
        fixStylish();
        forceReflush();
      });
    },
  });

  Object.assign(i18n, {
    allSidebarOn: { cn: '统一各类页面侧栏|到{{side}}', tw: '統一各類頁面側欄|到{{side}}', en: 'Relocate side bar for all pages | to {{side}}' },
    allSidebarOnLeft: { cn: '左侧', tw: '左側', en: 'left side' },
    allSidebarOnRight: { cn: '右侧', tw: '右側', en: 'right side' },
  });

  sidebar.allSidebarOn = rule.Rule({
    id: 'layout_side_position',
    version: 1,
    parent: sidebar.sidebar,
    template: () => i18n.allSidebarOn,
    ref: {
      side: {
        type: 'select',
        select: [
          { value: 'left', text: () => i18n.allSidebarOnLeft },
          { value: 'right', text: () => i18n.allSidebarOnRight },
        ],
      },
    },
    init() {
      this.ref.side.addConfigListener(sidebarOn);
    },
    ainit() {
      const side = this.ref.side.getConfig();
      observer.dom.add(function choseSideRunner() {
        let b, c, p;
        if (side === 'left') {
          b = document.querySelector('#plc_main>.WB_frame_c:first-child+.WB_frame_b:last-child'); if (!b) return;
          p = b.parentNode;
          p.insertBefore(b, p.firstChild);
        } else if (side === 'right') {
          c = document.querySelector('#plc_main>.WB_frame_b:first-child+.WB_frame_c:last-child'); if (!c) return;
          p = c.parentNode;
          b = p.firstElementChild;
          p.appendChild(b);
        }
      });
    },
  });

  // 使用关键字、正则式和话题过滤热门话题模块
  // 这个功能没有做开关，因为关键字等都是用户自己设置的，相当于开关了
  init.onLoad(() => {
    observer.dom.add(function filteRightTopic() {
      const links = Array.from(document.querySelectorAll('.hot_topic li:not([yawf-rtopic]) a[suda-uatrack*="hottopic_r"]'));
      if (!links.length) return;
      const topics = rules.topic.text.hide.ref.items.getConfig();
      const texts = rules.content.text.hide.ref.items.getConfig();
      const regexen = rules.content.regex.hide.ref.items.getConfigCompiled();
      links.forEach(topic => {
        const text = topic.title.replace(/#/g, '');
        do {
          if (topics.includes(text)) break;
          if (texts.some(t => text.includes(t))) break;
          if (regexen.some(r => r.test(text))) break;
          topic.closest('li').setAttribute('yawf-rtopic', '');
          return;
        } while (false);
        topic.closest('li').remove();
      });
    });
  }, { priority: priority.LAST });

  i18n.showAllGroups = {
    cn: '展开左栏分组',
    tw: '展開左欄分組',
    en: 'Show all groups in left sidebar',
  };

  sidebar.showAllGroups = rule.Rule({
    v7Support: true,
    id: 'layout_side_show_all_groups',
    version: 1,
    parent: sidebar.sidebar,
    template: () => i18n.showAllGroups,
    ainit() {
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.eachComponentVM('left-nav-home', function (vm) {
          if (!Array.isArray(vm.customList)) return;
          vm.customShowCount = Infinity;
          if (vm.customTabs && Array.isArray(vm.customTabs.list)) {
            vm.customList = [...vm.customTabs.list];
          }
          vueSetup.transformComponentRender(vm, function (nodeStruct, Nodes) {
            const { removeChild } = Nodes;

            const moreButton = nodeStruct.querySelector('x-woo-box:last-child');
            if (nodeStruct.lastChild === moreButton) {
              removeChild(nodeStruct, moreButton);
            }
          });
        });
      }, util.inject.rootKey);
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/scroll.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;

  const scroll = layout.scroll = {};

  i18n.scrollToolGroupTitle = {
    cn: '随页面滚动元素',
    tw: '隨頁面捲動元素',
    en: 'Elements Scroll with Page',
  };

  scroll.scroll = rule.Group({
    parent: layout.layout,
    template: () => i18n.scrollToolGroupTitle,
  });

  const scrollAfterMerge = (prefer = 'left') => () => {
    if (!scroll.scrollLeft.getConfig()) return;
    if (!scroll.scrollRight.getConfig()) return;
    if (!layout.sidebar.merge.getConfig()) return;
    if (prefer === 'left') {
      scroll.scrollRight.setConfig(false);
    } else {
      scroll.scrollLeft.setConfig(false);
    }
  };

  Object.assign(i18n, {
    scrollLeft: { cn: '允许首页左边栏随页面滚动始终显示', tw: '允許首頁左邊欄隨頁面捲動始終顯示', en: 'Floating left column' },
    scrollRight: { cn: '允许首页右边栏随页面滚动始终显示', tw: '允許首頁右邊欄隨頁面捲動始終顯示', en: 'Floating right column' },
    scrollOthers: { cn: '允许其他元素随页面滚动始终显示', tw: '允許其他元素隨頁面捲動始終顯示', en: 'Floating other elements' },
  });

  scroll.scrollLeft = rule.Rule({
    id: 'layout_left_move',
    version: 1,
    parent: scroll.scroll,
    initial: true,
    template: () => i18n.scrollLeft,
    // 如果合并了左右边栏，那么左栏浮动的时候右栏不能浮动
    init() {
      this.addConfigListener(scrollAfterMerge('left'));
    },
    ainit() {
      // 禁用左栏浮动的相关代码在禁用右边栏浮动的逻辑那里统一处理
      // 如果合并了边栏，那么会因为禁用右栏浮动而同时禁用在右栏里面的左栏
      // 这时候左栏如果还要浮动，那么就要重新让他动起来
      // 这里的程序是为了让左栏再动起来的
      if (!layout.sidebar.merge.getConfig()) return;
      css.append(`
.WB_main_r .WB_main_l { will-change: scroll-position; }
.WB_main_r[yawf-fixed] .WB_main_l { position: fixed; top: 60px !important; overflow: hidden; height: auto !important; width: 150px; }
body[yawf-merge-left] .WB_main_r[yawf-fixed] .WB_main_l { width: 229px; }
`);
      if (layout.navbar.autoHide.getConfig()) {
        util.css.append('.WB_main_r[yawf-fixed] .WB_main_l { top: 10px !important; }');
      }

      // 限制左栏最大高度，避免超出中间区域
      const updateMaxHeight = function (left, maxHeight) {
        const none = maxHeight == null;
        const text = none ? 'none' : maxHeight + 'px';
        const srl = left.querySelector('[node-type="leftnav_scroll"]');
        if (!srl) return;
        if ((left.style.maxHeight || 'none') !== text) {
          left.style.maxHeight = text;
          if (none) srl.setAttribute('style', '');
          else {
            const lev = Array.from(srl.querySelectorAll('.lev_Box'));
            const ch = lev.map(lb => lb.clientHeight).reduce((x, y) => x + y);
            const height = Math.min(maxHeight - srl.offsetTop, ch) + 'px';
            if (srl.style.height !== height) {
              srl.style.height = height;
              srl.style.position = 'relative';
            }
          }
        }
      };

      // 每当滚动滚动条或调整窗口大小时，更新左栏状态
      let hasScroll = false;
      const updateLeftPosition = function updateLeftPosition() {
        const left = document.querySelector('.yawf-WB_left_nav');
        const reference = document.querySelector('.WB_main_r');
        const container = document.querySelector('#plc_main');
        if (!left || !reference) return;
        const refc = reference.getClientRects();
        if (!refc?.[0]) return;
        const pos = refc[0];
        if (!hasScroll) {
          if (pos.bottom < -60) {
            hasScroll = true;
            reference.setAttribute('yawf-fixed', '');
          }
        } else {
          if (pos.bottom + left.clientHeight > 60) {
            hasScroll = false;
            reference.removeAttribute('yawf-fixed');
          }
        }
        if (hasScroll) {
          const cip = container.getClientRects()[0];
          const fip = left.getClientRects()[0];
          const no_space = false; // filter.items.style.sweibo.no_weibo_space.conf;
          const maxHeightBottom = cip.bottom - fip.top + (no_space ? 0 : -10);
          const maxHeight = Math.max(Math.min(maxHeightBottom, window.innerHeight - 80), 0);
          if (cip && fip) updateMaxHeight(left, maxHeight);
        } else { updateMaxHeight(left); }
      };

      document.addEventListener('scroll', updateLeftPosition);
      window.addEventListener('resize', updateLeftPosition);
      observer.dom.add(updateLeftPosition);
    },
  });

  scroll.scrollRight = rule.Rule({
    id: 'layout_right_move',
    version: 1,
    parent: scroll.scroll,
    initial: true,
    template: () => i18n.scrollRight,
    init() {
      this.addConfigListener(scrollAfterMerge('right'));

      const merge = layout.sidebar.merge.getConfig();
      const fleft = scroll.scrollLeft.getConfig();
      const fright = scroll.scrollRight.getConfig();
      const fother = scroll.scrollOthers.getConfig();
      const itemAttrs = ['fixed-item', 'fixed-box'];
      const containerAttrs = ['fixed-inbox', 'fixed-id'];
      const withIn = [];
      const queryString = function (classNames, attributes) {
        return classNames.map(className => (
          attributes.map(attribute => `${className} [${attribute}]`).join(',')
        )).join(',');
      };
      if (!fright) withIn.push('.WB_main_r');
      if (!fleft || merge) withIn.push('.WB_main_l');
      if (!fother) { withIn.push('.WB_frame_b', '.WB_frame_c'); }
      if (withIn.length === 0) return;

      const removeFixed = function removeFixed() {
        const itemQuery = queryString(withIn, itemAttrs);
        const items = Array.from(document.querySelectorAll(itemQuery));
        items.forEach(function (fixed) {
          const cloned = fixed.cloneNode(true);
          itemAttrs.forEach(attr => { cloned.removeAttribute(attr); });
          fixed.replaceWith(cloned);
        });
        const containerQuery = queryString(withIn, containerAttrs);
        const containers = Array.from(document.querySelectorAll(containerQuery));
        containers.forEach(function (container) {
          const cloned = container.cloneNode(true);
          containerAttrs.forEach(function (attr) { cloned.removeAttribute(attr); });
          const parent = container.parentNode;
          const prev = parent.previousElementSibling;
          const hadWraped = parent.style.willChange && prev && prev.innerHTML === '';
          const replaceTarget = hadWraped ? parent : container;
          if (hadWraped) prev.remove();
          replaceTarget.replaceWith(cloned);
        });
      };
      observer.dom.add(removeFixed);
    },
  });

  scroll.scrollOthers = rule.Rule({
    id: 'layout_other_move',
    version: 1,
    parent: scroll.scroll,
    template: () => i18n.scrollOthers,
    initial: true,
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/chat.js
; (function () {
  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;

  const chat = layout.chat = {};

  i18n.chatToolGroupTitle = {
    cn: '聊天',
    en: 'Chat',
  };

  chat.chat = rule.Group({
    parent: layout.layout,
    template: () => i18n.chatToolGroupTitle,
  });

  i18n.chatPageDisableUnloadPrompt = {
    cn: '关闭聊天页面时无需二次确认',
    tw: '關閉聊天頁面時無需二次確認',
    en: 'Prevent promopting when close chat page',
  };

  chat.chatPageDisableUnloadPrompt = rule.Rule({
    id: 'chat_page_disable_unload_prompt',
    version: 57,
    parent: chat.chat,
    template: () => i18n.chatPageDisableUnloadPrompt,
    // 实现在 /content/chat/rule.js
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/other.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const fontList = yawf.fontList;
  const chatframe = yawf.chatframe;
  const backend = yawf.backend;
  const feedParser = yawf.feed;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;
  const time = util.time;
  const strings = util.strings;

  const details = layout.details = {};

  i18n.detailsToolGroupTitle = {
    cn: '细节',
    tw: '細節',
    en: 'Details',
  };

  details.details = rule.Group({
    parent: layout.layout,
    template: () => i18n.detailsToolGroupTitle,
  });


  i18n.styleTextFontFamily = {
    cn: '替换网页字体为|西文{{west}}|中文{{chinese}}',
    tw: '替換網頁字形為|西文{{west}}|中文{{chinese}}',
    en: 'Customize fonts on webpage | Western {{west}} | Chinese {{chinese}}',
  };

  const supportedFonts = fontList.get();

  layout.fontFamily = rule.Rule({
    id: 'font_family',
    version: 1,
    parent: details.details,
    template: () => i18n.styleTextFontFamily,
    ref: {
      west: {
        type: 'select',
        select: supportedFonts.then(fonts => (
          fonts.west.map(([cssName, name]) => ({
            value: name,
            text: name,
            style: `font-family: ${cssName}; font-size: 120%;`,
          }))
        )),
      },
      chinese: {
        type: 'select',
        select: supportedFonts.then(fonts => (
          fonts.chinese.map(([cssName, name]) => ({
            value: name,
            text: name,
            style: `font-family: ${cssName}; font-size: 120%;`,
          }))
        )),
      },
    },
    async ainit() {
      const west = this.ref.west.getConfig();
      const chinese = this.ref.chinese.getConfig();
      const fonts = await supportedFonts;
      const [westCssname] = fonts.west.find(([_, name]) => name === west);
      const [chineseCssname] = fonts.chinese.find(([_, name]) => name === chinese);
      css.append(`html body, html body.WB_macT, html body.WB_xpT, html .WB_webim { font-family: ${westCssname}, ${chineseCssname}; }`);
    },
  });

  Object.assign(i18n, {
    avatarShape: {
      cn: '统一头像形状为方形',
      hk: '統一頭像形狀為方形',
      en: 'Show all avatars as square',
    },
  });

  details.avatarShape = rule.Rule({
    v7Support: true,
    id: 'layout_avatar_shape',
    version: 1,
    parent: details.details,
    template: () => i18n.avatarShape,
    ainit() {
      css.append(`.woo-avatar-hoverMask, .woo-avatar-img, .woo-avatar-main::before { border-radius: 0 !important; }`);
    },
  });

  Object.assign(i18n, {
    fastFace: { cn: '表情选择框优先列出常用及置顶表情|{{clear}}', tw: '表情選擇框優先列出常用及置頂表情|{{clear}}', en: 'List top and recent emoji on the top of emoji selector | {{clear}}' },
    fastFaceTop: { cn: '置顶', tw: '置頂', en: 'Top' },
    fastFaceTopNotice: { cn: '将下方表情拖放至此置顶', tw: '將下方表情拖放至此置頂', en: 'Drag emoji and drop here to sticky' },
    fastFaceRecent: { cn: '最近', tw: '最近', en: 'Recent' },
    fastFaceClear: { cn: '清空列表', tw: '清除清單', en: 'Clear List' },
  });

  details.fastFace = rule.Rule({
    id: 'layout_fast_face',
    version: 1,
    parent: details.details,
    template: () => i18n.fastFace,
    ref: Object.assign({}, ...['top', 'recent'].map(key => ({
      [key]: {
        initial: [],
        normalize(value) {
          const emptyList = Array(10).fill(null);
          if (!Array.isArray(value)) return emptyList;
          return value.filter(item => {
            if (item === null) return true;
            if (item?.title && item.img && item.text) return true;
            return false;
          }).concat(emptyList).slice(0, 10);
        },
      },
    })), {
      clear: {
        render() {
          const container = document.createElement('div');
          container.innerHTML = '<a class="W_btn_b yawf-clear-face" href="javascript:;"><span class="W_f14"></span></a>';
          container.querySelector('span').textContent = i18n.fastFaceClear;
          container.firstChild.addEventListener('click', event => {
            if (!event.isTrusted) return;
            details.fastFace.ref.top.setConfig();
            details.fastFace.ref.recent.setConfig();
          });
          return container.firstChild;
        },
      },
    }),
    ainit() {
      const rule = this;
      // 显示一个表情；聊天窗口里面表情输入的格式和别的地方不一样
      const createFaceItem = function (face, isIm) {
        const li = document.createElement('li');
        if (!face) return li;
        li.title = face.title;
        li.setAttribute('action-data', `${isIm ? 'text' : 'insert'}=${face.text}`);
        li.setAttribute('action-type', isIm ? 'webim_phiz_face' : 'select');
        const img = li.appendChild(document.createElement('img'));
        img.src = face.img;
        return li;
      };
      /**
       * 将列表显示出来，调整顺序尽量保留已有的表情的位置
       * @param {HTMLUListElement} ul
       * @param {{title, text, img}[]} faceList
       * @param {boolean} isIm
       */
      const renderListKeepOld = function (ul, faceList, isIm) {
        const listItems = Array.from(ul.querySelectorAll('li'));
        const newFaceTitles = new Set(faceList.map(e => e?.title).filter(t => t));
        const emptySlots = [];
        listItems.forEach(li => {
          const title = li.title;
          const existInNew = newFaceTitles.has(title);
          if (existInNew) newFaceTitles.delete(title);
          else if (li.title) {
            const newLi = createFaceItem(null, isIm);
            li.replaceWith(newLi);
            emptySlots.push(newLi);
          } else {
            emptySlots.push(li);
          }
        });
        [...newFaceTitles].forEach(title => {
          const face = faceList.find(face => face.title === title);
          emptySlots.shift().replaceWith(createFaceItem(face, isIm));
        });
      };
      /**
       * 将列表显示出来，不调整顺序可能修改已有的表情位置
       * @param {HTMLUListElement} ul
       * @param {{title, text}[]} faceList
       * @param {boolean} isIm
       */
      const renderListKeepIndex = function (ul, faceList, isIm) {
        const listItems = Array.from(ul.querySelectorAll('li'));
        faceList.forEach((face, index) => {
          const listItem = listItems[index];
          if (listItem.title === (face?.title ?? '')) return;
          listItem.replaceWith(createFaceItem(face, isIm));
        });
      };
      const renderRecentList = function () {
        const lists = document.querySelectorAll('.yawf-face-recent ul');
        const faceList = rule.ref.recent.getConfig();
        lists.forEach(list => {
          renderListKeepOld(list, faceList, list.matches('.yawf-face-im *'));
        });
      };
      const renderTopList = function () {
        const lists = document.querySelectorAll('.yawf-face-top ul');
        const faceList = rule.ref.top.getConfig();
        lists.forEach(list => {
          renderListKeepIndex(list, faceList, list.matches('.yawf-face-im *'));
        });
      };
      /**
       * 从被点击的对象（图片或者列表项）得到表情的相关信息
       * @param {HTMLElement} target
       */
      const getFace = function (target) {
        const li = target.closest('li');
        try {
          const face = {
            title: li.title,
            text: new URLSearchParams(li.getAttribute('action-data')).get('insert'),
            img: li.querySelector('img').src,
          };
          if (!face.title || !face.text || !face.img) return null;
          return face;
        } catch (e) { return null; }
      };
      // 从列表中移除重复的项，并保留 10 个
      const removeDuplicate = function (faceList) {
        const faceTitle = new Set(), result = [];
        faceList.forEach(face => {
          if (!face || faceTitle.has(face.title)) return;
          faceTitle.add(face.title);
          result.push(face);
        });
        while (result.length < 10) result.push(null);
        return result.slice(0, 10);
      };
      // 在用户点击表情后更新最近使用的表情
      const updateRecent = function (event) {
        const face = getFace(event.target);
        if (!face) return;
        const recent = [face].concat(rule.ref.recent.getConfig());
        rule.ref.recent.setConfig(removeDuplicate(recent));
        renderRecentList();
      };
      /**
       * 使用拖拽置顶表情
       * @param {HTMLElement} container
       * @param {HTMLUListElement} ul
       */
      const dragFace = function (container, ul) {
        // 显示和隐藏提示拖拽的标语
        const notice = container.querySelector('.yawf-face-drop-area');
        const showNotice = function () { notice.style.display = 'block'; };
        const hideNotice = function () { notice.style.display = 'none'; };
        // 拖拽
        let dragging = null, listItems;
        container.addEventListener('dragstart', event => {
          dragging = getFace(event.target) || null;
          // 开始拖拽的时候，标记所有目的地为可编辑的
          listItems = Array.from(ul.childNodes);
          listItems.forEach(li => { li.setAttribute('contenteditable', 'true'); });
          showNotice();
        });
        container.addEventListener('mouseleave', () => { dragging = null; });
        notice.addEventListener('dragenter', () => { hideNotice(); });
        ul.addEventListener('dragenter', () => { hideNotice(); });
        container.addEventListener('dragend', () => { hideNotice(); });
        container.addEventListener('drop', event => {
          // 结束拖拽的时候恢复原样
          if (listItems) listItems.forEach(li => { li.removeAttribute('contenteditable'); }); listItems = null;
          const img_upload = document.querySelector('.send_weibo .img_upload');
          if (img_upload) img_upload.style.display = 'none';
          // 然后看看起止都在哪里
          if (dragging === null) return;
          event.preventDefault();
          event.stopPropagation();
          const current = event.target.closest('li');
          const index = Array.from(ul.childNodes).indexOf(current);
          // 把拽到的东西加到置顶里面去
          const list = rule.ref.top.getConfig(), old = list[index];
          const newList = list.map((face, i) => {
            if (i === index) return dragging;
            if (!face) return null;
            if (face.title === dragging.title) return old;
            return face;
          });
          rule.ref.top.setConfig(newList);
          renderTopList();
        });
        if (rule.ref.top.getConfig().some(e => e)) hideNotice();
      };
      // 监视新的表情框
      observer.dom.add(function faceFastObserver() {
        const tab = document.querySelector('.layer_faces:not([node-type="huati_tabs"]) .WB_minitab:first-child');
        if (!tab) return;
        const container = tab.parentNode;
        const wrap = document.createElement('div');
        wrap.innerHTML = '<div class="faces_list yawf-face-list" node-type="scrollView"><div class="yawf-face-top yawf-face-row" node-type="list"><span class="yawf-face-title"></span><ul class="yawf-face-items"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul><span class="yawf-face-drop-area"></span></div><div class="yawf-face-recent yawf-face-row" node-type="list"><span class="yawf-face-title"></span><ul class="yawf-face-items"><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li><li></li></ul></div></div>';
        const area = container.insertBefore(wrap.firstChild, tab);
        area.querySelector('.yawf-face-top span').textContent = i18n.fastFaceTop;
        area.querySelector('.yawf-face-drop-area').textContent = i18n.fastFaceTopNotice;
        area.querySelector('.yawf-face-recent span').textContent = i18n.fastFaceRecent;
        const topList = area.querySelector('.yawf-face-top ul');
        const recentList = area.querySelector('.yawf-face-recent ul');
        const chatListNode = container.querySelector('ul[node-type="_phizListNode"]');
        const isIm = chatListNode != null;
        container.addEventListener('click', updateRecent);
        dragFace(container, topList);
        if (isIm) {
          area.classList.add('yawf-face-im');
          fixChat([topList, recentList], chatListNode);
        }
        renderTopList();
        renderRecentList();
      });
      // 修理一下聊天窗口里面的情况
      // 我不确定这段代码还有没有用，总之先留着
      const fixChat = function (lists, chatListNode) {
        lists.forEach(list => {
          list.addEventListener('click', event => {
            event.stopPropagation();
            const target = event.target.closest('li');
            if (!target.title) return;
            // 弄一个假的按钮，放在原本的列表末尾，骗他说我点的是原本的列表里面的
            const fake = target.cloneNode(true);
            fake.style.display = 'none';
            chatListNode.appendChild(fake);
            fake.click();
            fake.parentNode.removeChild(fake);
          });
        });
      };
      css.append(`
.layer_faces .faces_list.yawf-face-list { height: 79px; }
.yawf-face-row { display: block; height: 32px; margin: 0 0 5px; }
.yawf-face-title { float: left; font-weight: bold; line-height: 32px; padding: 0; text-align: center; width: 52px; margin: 0 -8px 0 0; }
.yawf-face-items { float: right; margin: 0 8px; }
.yawf-face-items li { color: transparent; }
.yawf-face-drop-area { background: rgba(255, 255, 127, 0.5); clear: both; float: right; font-weight: bold; height: 36px; line-height: 36px; margin: -36px 8px 0; opacity: 1; padding: 0; width: 348px; text-align: center; }
.layer_faces .faces_list { user-select: none; }
.layer_faces .faces_list li { overflow: hidden; }
.layer_faces .faces_list img { border: 10px transparent solid; margin: -10px; }
`);
    },
  });

  if (env.config.requestBlockingSupported) {
    Object.assign(i18n, {
      topicCompleteWithout: {
        cn: '在话题自动完成时不包括||{{place}}地点|{{movie}}电影|{{book}}图书|{{topic}}超话|{{music}}音乐|{{stock}}股票',
        tw: '在話題自動完成時不包括||{{place}}地點|{{movie}}電影|{{book}}圖書|{{topic}}超話|{{music}}音樂|{{stock}}股票',
        en: 'Exclude following items from topic auto complete||{{place}} place|{{movie}} movie|{{book}} book||{{topic}} super topic|{{music}} music|{{stock}} stock',
      },
    });

    details.topicCompleteWithout = rule.Rule({
      id: 'layout_topic_without',
      version: 30,
      parent: details.details,
      template: () => i18n.topicCompleteWithout,
      ref: Object.assign({}, ...['place', 'movie', 'book', 'topic', 'music', 'stock'].map(type => ({
        [type]: { type: 'boolean', initial: true },
      }))),
      init() {
        backend.onRequest('topic', async details => {
          if (!this.isEnabled()) return {};
          const hideItems = ['place', 'movie', 'book', 'topic', 'music', 'stock'].filter(type => {
            return this.ref[type].getConfig();
          });
          await backend.topicFilter(details, hideItems);
          return {};
        });
      },
    });
  }

  Object.assign(i18n, {
    useLocaleTimezone: {
      cn: '使用本机时区',
      tw: '使用本機時區',
      en: 'Use locale timezone',
    },
    feedsRead: { cn: '你看到这里', tw: '你看到這裡', en: 'you got here' },
  });

  // 使用本地时区
  details.timezone = rule.Rule({
    id: 'layout_locale_timezone',
    version: 1,
    parent: details.details,
    template: () => i18n.useLocaleTimezone,
    hidden: time.isCstEquivalent(),
    init() {

      const useLocale = this.isEnabled();
      const feedUseYear = yawf.rules.feeds.details.feedAbsoluteTime.isEnabled();

      if (!useLocale && !feedUseYear) return;

      const updateDate = function (element) {
        const date = parseInt(element.getAttribute('yawf-date'), 10);
        const format = element.getAttribute('yawf-date-format') || null;
        const locale = useLocale ? 'current' : 'cst';
        const formatTimeResult = util.time.format(date, { format, locale });
        if (element.textContent !== formatTimeResult) {
          element.textContent = formatTimeResult;
        }
        if (useLocale) {
          const formatTimeDetailResult = util.time.format(date, { format: 'full', locale: 'current' });
          if (element.title !== formatTimeDetailResult) {
            element.title = formatTimeDetailResult;
          }
        }
      };

      const updateAllDate = function () {
        const dates = document.querySelectorAll('[yawf-date]');
        Array.from(dates).forEach(element => {
          updateDate(element);
        });
      };

      if (useLocale) {
        const handleDateElements = function handleDateElements() {
          const [feedListTimeTip, ...moreFeedListTimeTip] = document.querySelectorAll('[node-type="feed_list_timeTip"][date]');
          moreFeedListTimeTip.forEach(element => element.remove());
          if (feedListTimeTip) (function (tip) {
            const olds = document.querySelectorAll('[node-type="yawf-feed_list_timeTip"][date]');
            Array.from(olds).forEach(element => element.remove());
            tip.setAttribute('node-type', 'yawf-feed_list_timeTip');
            const date = parseInt(tip.getAttribute('date'), 10);
            tip.removeAttribute('date');
            tip.classList.add('yawf-feed_list_timeTip');
            tip.innerHTML = '<div class="WB_cardtitle_a W_tc"><a node-type="feed_list_item_date" style="color:inherit"></a></div>';
            const inner = tip.firstChild.firstChild;
            inner.setAttribute('yawf-date', date);
            inner.after(' ' + i18n.feedsRead);
          }(feedListTimeTip));

          const dateElements = Array.from(document.querySelectorAll('[date]'));
          dateElements.forEach(element => {
            const date = parseInt(element.getAttribute('date'), 10);
            element.setAttribute('yawf-date', date);
            element.removeAttribute('date');
          });

          if (feedListTimeTip || dateElements.length) updateAllDate();
        };

        observer.dom.add(handleDateElements);

        // 处理文本显示的时间
        const handleTextDateElements = function changeDateText() {
          const selectors = [
            '.WB_from:not([yawf-localtime])',
            '.cont_top .data:not([yawf-localtime])',
            'legend:not([yawf-localtime])',
            '.layer_dialogue_v5 .time_s p',
          ].join(',');
          const elements = Array.from(document.querySelectorAll(selectors));
          elements.forEach(element => {
            element.setAttribute('yawf-localtime', '');
            // 聊天窗口中的时间是本地的时间，但是其实现在已经没有聊天窗口了
            if (element.matches('.WB_webim *')) return;
            const textNode = element.firstChild;
            if (textNode.nodeType !== Node.TEXT_NODE) return;
            const text = textNode.textContent.trim();
            if (text === '') return;
            const [_full, match, tail] = text.match(/^(.*?)\s*((?:(?:来自|來自|come from).*)?)$/);
            const time = util.time.parse(match);
            if (!time) return;
            util.debug('parse time %o(%s) to %o(%s)', textNode, text, time, time);
            textNode.textContent = tail ? ` ${tail} ` : '';
            const timeElement = document.createElement('span');
            timeElement.setAttribute('yawf-date', +time);
            updateDate(timeElement);
            textNode.parentNode.insertBefore(timeElement, textNode);
          });
        };
        observer.dom.add(handleTextDateElements);
      }

      if (feedUseYear) {
        observer.feed.onAfter(function (feed) {
          const dates = feedParser.date.dom(feed);
          dates.forEach(element => {
            if (element.getAttribute('date')) {
              const date = parseInt(element.getAttribute('date'), 10);
              element.setAttribute('yawf-date', date);
              element.removeAttribute('date');
            }
            element.setAttribute('yawf-date-format', 'year');
            updateDate(element);
          });
        });
      }

      setInterval(updateAllDate, 1e3);

      css.append(`
.WB_feed_v3 .WB_from span[yawf-date] { margin-left: 0; }
[yawf-date]::after { content: " "; }
`);
    },
  });

  if (env.config.chatInPageSupported) {

    Object.assign(i18n, {
      chatInPage: {
        cn: '在微博页面内整合聊天窗口',
        tw: '在微博頁面內整合聊天窗口',
        en: 'Use chat in pages of feeds',
      },
      chatButtonText: {
        // 这个条目没有翻译，因为这个只是在微博的初始化之前用的
        // 微博初始化之后会用微博自己的，那个就没有翻译
        cn: '微博聊天',
      },
    });

    details.chatFrame = rule.Rule({
      id: 'layout_chat_in_page',
      version: 1,
      parent: details.details,
      template: () => i18n.chatInPage,
      ref: {
        width: { initial: 640, min: 640 },
        height: { initial: 480, min: 480 },
      },
      ainit() {
        const rule = this;
        css.append(`
#WB_webchat { bottom: -100px !important; display: block !important; }
#yawf-webchat { position: fixed; bottom: 0px; right: 0px; z-index: 1024; display: block !important; background: #d3d6df; }
#yawf-webchat .webim_fold { top: -40px; right: 0px; visibility: visible; }
#yawf-webchat .fold_cont em { width: 200px; display: inline-block; height: 40px; }
.yawf-webim-main { position: fixed; bottom: 0; right: 0; z-index: 10000; box-shadow: 0 0 10px black; border-radius: 3px 0 0 0; overflow: hidden; }
.yawf-webim-main iframe { width: 100%; height: 100%; border: 0 none; }
.yawf-webim-resizer { position: absolute; width: 12px; height: 12px; left: 0; top: 0; margin: 0; cursor: nwse-resize; opacity: 0.8; }
.yawf-webim-resizer i, .yawf-webim-resizer::after { content: " "; position: absolute; width: 12px; height: 12px; }
.yawf-webim-resizer i { transform: rotate(180deg); overflow: hidden; resize: both; }
.yawf-webim-resize .yawf-webim-resizer { width: 100%; height: 100%; }
`);

        let showChatWindow = null;
        let frameContentResolve;
        /** @type {Promise<Window>} */
        let frameContent = new Promise(resolve => { frameContentResolve = resolve; });
        const initChatArea = function (ori) {
          const container = document.createElement('div');
          container.innerHTML = '<div class="WB_webim" id="yawf-webchat" style=""><div class="webim_fold webim_fold_v2 clearfix"><div class="fold_bg"></div><p class="fold_cont clearfix"><span class="fold_icon W_fl" data-target="minichat"></span><em class="fold_font W_fl W_f14"></em></p></div><div class="yawf-webim-main" style="width: 640px; height: 480px;"><iframe src="https://chat.221edc3f-9e16-4973-a522-4ca21e7c8540.invalid/"></iframe><div class="yawf-webim-resizer"><i></i></div></div></div>';
          const webim = container.firstElementChild;
          const fold = webim.querySelector('.webim_fold');
          const main = webim.querySelector('.yawf-webim-main');
          const frame = webim.querySelector('iframe');
          const resizer = webim.querySelector('.yawf-webim-resizer');
          const mainContainer = main.parentNode;
          mainContainer.removeChild(main);
          let folded = true;
          showChatWindow = function () {
            if (main.parentNode !== mainContainer) {
              mainContainer.appendChild(main);
            }
            main.style.display = 'block';
            fold.style.display = 'none';
            folded = false;
          };
          fold.addEventListener('click', () => {
            showChatWindow();
          });
          document.addEventListener('click', event => {
            if (folded) return;
            if (webim.contains(event.target)) return;
            main.style.display = 'none';
            fold.style.display = 'block';
            folded = true;
          });
          frame.addEventListener('load', () => {
            const contentWindow = frame.contentWindow;
            frameContentResolve(contentWindow);
          });

          // 未读消息数量在原版的聊天按钮上的展示，我们把它拷贝过来
          const foldText = webim.querySelector('.fold_cont em');
          const oriText = ori.querySelector('.fold_cont em');
          const updateText = function () {
            foldText.textContent = oriText.textContent;
          };
          (new MutationObserver(updateText)).observe(oriText, { childList: true });
          foldText.textContent = i18n.chatButtonText;

          /*
           * 接下来允许聊天框缩放
           */
          let dragStartPos = [], dragStartSize = [];
          const setSize = function (width, height) {
            let targetW = null, targetH = null;
            if (width != null) {
              targetW = Math.max(640, Math.min(window.innerWidth, width));
              main.style.width = targetW + 'px';
            }
            if (height != null) {
              targetH = Math.max(480, Math.min(window.innerHeight - 48, height));
              main.style.height = targetH + 'px';
            }
            return [targetW, targetH];
          };
          const calcSize = function (clientX, clientY) {
            const [startX, startY] = dragStartPos;
            const [startW, startH] = dragStartSize;
            const width = startX - clientX + startW;
            const height = startY - clientY + startH;
            return setSize(width, height);
          };
          const dragMove = function (event) {
            calcSize(event.clientX, event.clientY);
          };
          const dragCancel = function (event) {
            calcSize(event.clientX, event.clientY);
          };
          const dragEnd = function (event) {
            const [width, height] = calcSize(event.clientX, event.clientY);
            rule.ref.width.setConfig(width);
            rule.ref.height.setConfig(height);
            document.body.classList.remove('yawf-webim-resize');
            document.removeEventListener('mousemove', dragMove);
            document.removeEventListener('mouseleave', dragCancel);
            document.removeEventListener('mouseup', dragEnd);
          };
          const dragStart = function (event) {
            dragStartPos = [event.clientX, event.clientY];
            dragStartSize = [main.clientWidth, main.clientHeight];
            document.body.classList.add('yawf-webim-resize');
            document.addEventListener('mousemove', dragMove);
            document.addEventListener('mouseleave', dragCancel);
            document.addEventListener('mouseup', dragEnd);
          };
          rule.ref.width.addConfigListener(newWidth => {
            setSize(newWidth, null);
          });
          rule.ref.height.addConfigListener(newHeight => {
            setSize(null, newHeight);
          });
          resizer.addEventListener('mousedown', dragStart);
          setSize(rule.ref.width.getConfig(), rule.ref.height.getConfig());
          window.addEventListener('resize', () => {
            setSize(main.clientWidth, main.clientHeight);
          });

          document.body.appendChild(webim);
        };

        observer.dom.add(function checkImArea() {
          const webim = document.querySelector('#WB_webchat:not([yawf-web-chat])');
          if (!webim) return;
          webim.setAttribute('yawf-web-chat', '');
          initChatArea(webim);
        });

        /*
         * 这一段是让“聊天”/“私信”按钮可以激活聊天框并切换到对应的人
         */

        const chatToUid = function (uid) {
          frameContent.then(contentWindow => {
            chatframe.chatToUid(uid);
          });
        };

        document.addEventListener('click', event => {
          if (!showChatWindow) return;
          const target = event.target;
          if (!(target instanceof Element)) return;
          const uid = (function () {
            const chatTo = target.closest('a[href*="api.weibo.com/chat"]');
            if (!chatTo) return null;
            const data = new URL(chatTo.hash.slice(1), location.href);
            const uid = Number(data.searchParams.get('to_uid'));
            if (!uid) return null;
            return uid;
          }()) || (function () {
            const toDialog = target.closest('[action-type="to_dialog"]');
            if (!toDialog) return null;
            const data = new URLSearchParams(toDialog.getAttribute('action-data'));
            const uid = Number(data.get('uid'));
            if (!uid) return null;
            return uid;
          }());
          if (!uid) return;
          event.stopPropagation();
          event.preventDefault();
          showChatWindow();
          chatToUid(uid);
        }, true);

      },
    });

  }

  i18n.hideHotTopicLargeRead = {
    cn: '隐藏热门话题中|阅读数量超过{{quota}}亿的话题',
    tw: '隱藏熱門話題中|閱讀數量超過{{quota}}億的話題',
    en: 'Hide Topics in Hot Topics | with {{quota}}00 million reading counts',
  };

  layout.hideHotTopicLargeRead = rule.Rule({
    id: 'hide_hot_topic_large_read',
    version: 65,
    parent: details.details,
    template: () => i18n.hideHotTopicLargeRead,
    ref: {
      quota: {
        type: 'range',
        min: 1,
        max: 100,
        initial: 20,
      },
    },
    async ainit() {
      util.css.add('.hot_topic li[yawf-rtopic-count="hidden"], #topicAD { display: none !important; }');
      let that = this;
      observer.dom.add(function filteRightTopicCount() {
        let counts = Array.from(document.querySelectorAll('.hot_topic li:not([yawf-rtopic-count]) .total'));
        counts.forEach(function (count) {
          // 网站中数字由 xxx万 ， xx.x亿 的方式表示；且没有繁体或英文版本
          // 注意有时前面的数字会有小数点，所以要替换为 e4, e8 而非 0000, 00000000
          const number = strings.parseint(count.textContent);
          const li = count.closest('li');
          if (Number.isNaN(number) || that.ref.quota.getConfig() * 1e8 <= number) {
            li.setAttribute('yawf-rtopic-count', 'hidden');
          } else {
            li.setAttribute('yawf-rtopic-count', 'show');
          }
        });
      });
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/theme.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const init = yawf.init;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;
  const ui = util.ui;

  const theme = layout.theme = {};

  i18n.themeGroupTitle = {
    cn: '主题',
    tw: '主題',
    en: 'Theme',
  };

  theme.theme = rule.Group({
    parent: layout.layout,
    template: () => i18n.themeGroupTitle,
  });

  const skins = { skin: { _001: '蓝色心情', _002: '紫荆花瓣', _003: '沙滩漫步', _004: '凌晨两点半', _005: '梦幻星空', _006: '暗夜留香', _007: '我心飞翔', _008: 'happy forever', _009: '彩虹', _010: '梦幻游乐场', _011: '彩色天空', _012: '名人会', _013: '哇嗷', _014: '我愿意', _015: '猫趣', _016: '保护北冰洋', _017: '魅影', _018: '童趣彩虹', _019: 'kiss', _020: '漓彩', _021: '留沙', _022: '心晴', _023: 'greenway', _024: 'Hello Pig', _025: 'Iam 80后', _026: '安静夜', _027: '百灵鸟', _028: '碧草蓝天', _029: '窗台', _030: '梦幻', _031: '飞鸟鱼', _032: '粉色风信子', _034: '复古', _035: '黑板', _036: '咖啡', _037: '情迷宝丽来', _038: '太空', _039: '涂鸦板', _040: '星空', _041: '雨夜', _042: '纸飞机', _043: '飘', _045: 'pop', _046: '紫色风情', _047: 'coffee bar', _048: '风轻云淡', _049: '风轻云淡', _050: '梦幻星空', _051: '保护北冰洋', _052: '漓彩', _053: '情迷宝丽来', _054: '太空', _055: '雨夜', _058: '默认', _211: '我们结婚吧', _212: '幸福在身边', _214: '新年闹春', _252: '环保益起来', _253: '地球一小时', _254: '随手拍', _255: '为爱益起跑' }, skinvip: { _001: '鸟人的异想世界', _002: '纸面人生', _006: '简约生活', _009: '游戏时光', _010: '秀出真我', _011: '糖果缤纷', _013: '我的翅膀', _014: '莲花', _016: '超级玛丽', _017: '浪小花', _018: '80后', _019: '可爱滴兔子', _021: '海底世界', _022: '给自己放个假', _023: '80后的回忆', _024: '马戏团', _025: '孤独的夜', _026: '暖暖', _027: '吃豆人', _028: 'rainbow', _031: '海之梦境', _032: '旋转时光', _033: '午后巴士情缘', _034: '小黄鸭', _035: '夏微凉', _036: '碧水晚舟', _037: 'Marry Me', _038: '水墨鱼', _039: '夕影', _040: '心之恋', _041: '心心相印', _042: '旅行时光', _043: '拥抱美好', _044: '寐', _045: '狗狗漫步', _046: '阿狸的海洋', _047: '蒲公英的梦', _048: '播种阳光', _049: '小情人', _050: '海滩', _051: '天使爱人', _054: '悠闲午后', _056: '西瓜女孩', _057: '郊游', _058: '南极企鹅', _059: '老上海岁月', _060: '雾都', _061: '海边度假', _062: '一个人的旅行', _063: '环游地球', _064: '罗小黑的异想世界', _065: '李雷与韩梅', _068: '艾玩兔-守候', _069: '俏皮喵星人', _070: '梦游仙境', _071: '爱情畅想', _072: '萌狗狗', _073: '马背上的天空', _074: '暖阳', _075: '渔舟唱晚', _076: '小伙伴', _078: '简单生活', _079: '守望', _080: '好基友', _081: '都市流浪', _082: '躲猫猫', _083: '键盘仔', _084: '南瓜头快跑', _085: '飞向月球', _086: '枫林', _087: '柿子红了', _088: 'Trick or Treat', _089: '马里奥', _090: '天空', _091: '礼物轰炸机', _092: '阿狸的秋天', _093: '勇士狸', _094: '萌宠公寓', _095: '宁静的海', _096: '月光', _097: 'good night', _098: '喵星人向前冲', _099: '棒棒糖', _101: '童话', _102: '猫咪乐队', _105: '表白', _106: '自由猪神', _107: '梦中的小屋', _108: 'XOXO', _109: '童年的小熊', _110: '我的交响乐', _111: '仙乐飘飘', _112: '下雪啦', _113: '寒冬', _114: '后天', _115: '蛇年祝福', _116: '圣诞老人', _117: '江南style', _118: '龄官', _120: '迪士尼-史迪奇', _121: '迪士尼-维尼熊', _122: '迪士尼-小顽皮', _123: '迪士尼-玛丽猫', _124: '迪士尼-美人鱼', _125: '迪士尼-米奇米妮', _126: '迪士尼-欢乐圣诞', _127: '迪士尼-小仙女', _128: '守望', _129: '幽灵古堡', _130: '迷雾', _131: '金色阳光', _132: 'I Miss U', _133: '未来の树', _134: '金色海洋', _135: '雨后', _136: '草坡上的女孩', _137: 'Sexy music', _138: '移动城堡', _139: '拥抱爱', _140: '春草', _141: '花与蝶', _142: '樱の花', _145: '黑暗阶梯', _146: '鱼', _147: '公主', _149: '仙女的裙摆', _150: '小仙女', _152: '樱花舞', _153: '自娱自乐', _154: '哥哥', _156: '家有金毛', _158: '淘气小哈', _159: '海军狗狗', _160: '巴哥', _163: '迪士尼-魔境仙踪', _164: '迪士尼-公主', _165: '青春', _166: '花椅', _169: '拉拉', _173: '旧城往事', _174: '功夫之王', _175: '不明飞行物', _176: '星际探险', _178: '小泰迪', _179: '饼干喵星人', _181: '喵星人三兄弟', _182: '麋鹿喵星人', _185: '可爱喵星人', _187: '母爱', _188: '大手小手', _189: '一家人', _192: '钢铁侠', _193: '钢铁侠出击', _194: '迪士尼-米奇', _195: '迪士尼-米老鼠', _196: '萝莉', _197: '御姐', _198: '凝望地球', _199: '依靠', _201: 'CS战士', _202: 'Take Me Home', _203: '登船style', _204: '稻草人', _205: 'happy everyday', _206: '甜点', _207: '大风吹', _208: '烤红薯', _209: 'Ball', _211: '贪吃蛇', _212: '力争上游', _213: '棋逢对手', _214: '团团圆圆', _216: '年夜饭', _221: '春雨', _222: '尘飞扬', _224: '雾霾压城', _225: '仙女的舞蹈', _226: '旅行赏春', _227: '赏春去', _228: '极速飙车', _234: '喵星人的思念', _235: '二货喵星人', _236: '怀念', _237: '卖萌喵星人', _238: '金字塔的秘密', _239: '母亲节', _240: '端午节', _242: '盒子星球', _243: '心心相印', _244: '粉色心情', _245: '侏罗纪公园', _246: '世界杯', _247: '点球大战', _250: '杨洋', _251: '杨洋生日专属', _303: '纪念日', _304: '窗外的春天', _305: '速度与激情', _306: '绿意盎然', _307: '动画城', _310: '牧人', _311: '美好风光', _312: '春天的幻想', _318: '重返地球', _319: '冲上云霄', _320: '陨石', _325: '爱情使者', _326: '怪兽大学', _328: '毛怪和小伙伴', _330: '迪士尼-复古米老鼠', _332: '鱼跃', _333: '夜色', _334: '海洋', _335: '祈盼', _337: '玫瑰代表我的爱', _339: '神偷奶爸2', _342: '圣诞驯鹿', _343: '温情圣诞', _344: '冰雪奇缘', _345: '驯龙骑士', _347: '蝴蝶春天', _348: '绿色生活', _349: '彩色气球', _350: '雨滴', _351: '晴空暖阳', _354: '花瓣', _355: '春色', _358: 'keeny的咖啡', _359: 'keeny的鲸鱼', _400: '春天的气息', _401: '鬼娃娃', _402: '密室', _404: '竹林听雨', _405: '云雾', _407: '油菜花', _408: '旅途中的等待', _409: '旅程', _410: '汽车之旅', _411: '荷兰风车', _412: '迷彩之战', _414: '战地飞车', _415: '情侣喵星人', _416: '喵星人和鱼', _417: '一起午觉', _419: '爱心磁带', _420: '来自星星的我', _422: '欢乐喵星人', _423: '私家飞碟', _425: '乐队', _600: '家', _702: '纪念泰戈尔', _704: 'TFBOYS少年强', _709: 'TFBOYS青春修炼手册', _711: '新版微博', _713: '探寻幸福', _714: '夏天你好', _715: '我爱火锅', _716: '红色巴士', _717: '仰望星空', _718: 'happy birthday', _719: '银杏知秋', _722: '玩雪咯', _723: '喵星人的星际穿越', _724: 'Jingle bells', _725: '闹新春', _726: '三羊开泰', _731: '7月日历', _732: '8月日历', _733: '9月日历', _734: '10月日历', _735: '11月日历', _736: '12月日历', _737: '1月日历', _738: '2月日历', _739: '3月日历', _740: '碧波', _741: '一猫一世界', _742: '呐喊的汪汪', _743: '家有馋猫', _744: '狗狗爱美丽', _745: '温柔如喵', _746: '藏猫猫', _747: '伴君旅行', _748: '我想静静', _749: '倾情', _750: '粼粼海光', _751: '华晨宇', _752: 'SNH48', _753: '诺言', _754: '乔振宇', _755: '妞妞和端午', _756: '暖暖屋', _757: '依偎ivvi', _800: 'TFBOYS易烊千玺', _801: '初雪', _802: '暖心拿铁', _803: '陪伴', _804: 'Merry Xmas', _805: '逆光森林', _806: '我爱披萨', _807: '旅行成瘾', _808: '我爱甜点', _809: '羊年到', _811: '希望之树', _812: '海洋', _813: '小岛和船', _814: '雪景', _815: '彩虹之路' }, skinvipf: { _001: '大海', _002: '下雪', _003: '天使', _004: '双子座', _005: '远行' }, skinvipg: { _001: '毕业季', _002: '上班族的周一', _003: '上班族的周二', _004: '上班族的周三', _005: '上班族的周四', _006: '上班族的周五', _007: '上班族的周六', _008: '上班族的周天' }, skinvipj: { _001: '超级玛丽动态版' }, weekskin: { _002: '微博经典' }, weekskinvip: { _001: '旅行时光', _002: '绿意', _003: '上班族一周心情', _004: '迪士尼' } };

  Object.assign(i18n, {
    setSkin: {
      cn: '统一所有页面的模板|{{skin}} {{i}}',
      tw: '統一所有頁面的模板|{{skin}} {{i}}',
      en: 'Show all pages with template | {{skin}} {{i}}',
    },
    setSkinDetail: {
      cn: '开启后所有页面将显示您选择的模板，包括其他用户的个人主页。模板不会覆盖您在主页自定义的背景图或配色，但是会覆盖个人主页的背景图或配色。模板效果仅在您的浏览器中生效，他人访问您的个人主页时，仍会看到您在微博中设置的模板。模板的选择请参考{{listpage}}，在模板商店中点击图片预览与应用模板。',
    },
    setSkinListPageTitle: {
      cn: '模板商店',
    },
    setSkinByPreviewTitle: {
      cn: 'Yet Another Weibo Filter 模板设置',
    },
    setSkinByPreview: {
      cn: '您要在药方扩展中使用“{1}”模板吗？启用后您访问各种页面时都将使用当前的模板。在脚本中使用皮肤不会影响其他用户查看您个人主页时的模板样式。',
      tw: '您要在藥方擴展中使用「{1}」模板嗎？啟用後您訪問各種頁面時都將使用當前的模板。在腳本中使用皮膚不會影響其他用戶查看您個人主頁時的模板樣式。',
      en: 'Do you want to enable the template "{1}" in YAWF? All pages will show current template if you choose enable it. The template only applied on your browser.',
    },
  });

  theme.apply = rule.Rule({
    id: 'layout_theme_apply',
    version: 1,
    parent: theme.theme,
    template: () => i18n.setSkin,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.setSkinDetail },
      skin: {
        type: 'select',
        initial: 'skin058',
        select: [].concat(...Object.keys(skins).sort().map(function (key) {
          const val = skins[key];
          return Object.keys(val).map(index => {
            const num = index.slice(1), skinId = key + num;
            return { value: skinId, text: val[index] + ' (' + skinId + ')' };
          });
        })),
      },
      listpage: {
        render() {
          const link = document.createElement('a');
          link.href = '//skin.vip.weibo.com/list?topnav=1&wvr=6';
          link.target = '_blank';
          link.textContent = i18n.setSkinListPageTitle;
          return link;
        },
      },
    },
    ainit() {
      const userConfigSkinId = this.ref.skin.getConfig();
      const skinId = new URLSearchParams(location.search).get('skinId') || userConfigSkinId;
      let version = '';
      let skinStyle = null, coverStyle = null;
      const setSkinId = function (skinId) {
        skinStyle.href = skinStyle.href.replace(/\/skin\/[^/]*\/skin.css/, `/skin/${skinId}/skin.css`);
        const coverCss = `#skin_cover_s { background-image: url("//img.t.sinajs.cn/t6/skin/${skinId}/images/profile_cover_s.jpg?version=${version}") !important; }`;
        (coverStyle || (coverStyle = document.head.appendChild(document.createElement('style')))).textContent = coverCss;
      };
      const setSkin = function setSkin() {
        // 头条文章页面设置模板会导致界面混乱
        if (init.page.type() === 'ttarticle') return;
        if (!skinStyle) {
          const skinCss = document.querySelector('link[href*="//img.t.sinajs.cn/t6/skin/"][href*="/skin.css?"]');
          if (!skinCss) return;
          version = skinCss.href.match(/version=([a-fA-F0-9]*)/)?.[1] ?? '';
          skinStyle = skinCss.cloneNode(); skinStyle.id = 'yawf-skin_style';
          setSkinId(skinId);
        }
        const isHome = document.body.matches('.FRAME_main');
        if (!document.getElementById('yawf-skin_style') ||
          // 微博不能保证 id 为 skin_style 的对象唯一，所以不能用 #skin_style 选择器，神奇吧
          document.querySelector('#yawf-skin_style ~ [id="skin_style"]') ||
          (!isHome && document.querySelector('#yawf-skin_style ~ [id="custom_style"]'))
        ) {
          setSkinId(skinId);
          document.head.appendChild(skinStyle);
        }
        // 如果是首页，而且使用了自定义模板；保证自定义模板优先级（但是在个人主页上覆盖自定义模板）
        if (isHome && document.querySelector('[id="custom_style"] ~ #yawf-skin_style')) {
          const customStyleList = document.querySelectorAll('[id="custom_style"]');
          const customStyle = customStyleList[customStyleList.length - 1];
          skinStyle.parentNode.insertBefore(customStyle, skinStyle.nextSibling);
        }
      };
      observer.dom.add(setSkin);
    },
    init() {
      const rule = this;
      (async function () {
        const search = new URLSearchParams(location.search);
        const skinId = search.get('skinId');
        if (!skinId) return;
        const name = skins[skinId.replace(/\d+$/, '')]['_' + skinId.replace(/^\D+/, '')];
        if (!name) return;
        const answer = await ui.confirm({
          id: 'yawf-use-skin',
          title: i18n.setSkinByPreviewTitle,
          text: i18n.setSkinByPreview.replace('{1}', () => name),
        });
        if (answer) {
          rule.ref.skin.setConfig(skinId);
          rule.setConfig(true);
          search.delete('skinId');
          location.search = search;
        }
      }());
    },
  });

  i18n.navbarDark = {
    cn: '深色主题导航栏',
    tw: '深色主題導覽列',
    en: 'Dark theme navbar',
  };

  theme.darkNav = rule.Rule({
    id: 'layout_nav_dark',
    version: 1,
    parent: theme.theme,
    template: () => i18n.navbarDark,
    acss: `
.WB_global_nav { background: #333; }
.WB_global_nav_alpha { background: rgba(51, 51, 51, 0.94); }
.gn_logo .logo:empty { background: none !important; }
.gn_logo .logo:empty::before, .gn_logo .logo:empty::after { content: " "; display: block; background: url("//img.t.sinajs.cn/t6/style/images/global_nav/WB_logo.png?id=1404211047727") no-repeat 0 40%; height: 48px; }
@media only screen and (-webkit-min-device-pixel-ratio: 2), only screen and (-moz-min-device-pixel-ratio: 2), only screen and (min-device-pixel-ratio: 2) {
  .gn_logo .logo:empty::before, .gn_logo .logo:empty::after { background-image:url("//img.t.sinajs.cn/t6/style/images/global_nav/WB_logo-x2.png?id=1404211047727"); background-size:80px 27px; }
}
.gn_logo .logo:empty::before { width: 36px; float: left; }
.gn_logo .logo:empty::after { width: 104px; float: right; background-position: -36px 40%; }
.gn_logo .logo:empty::after { filter: url("data:image/svg+xml,%3Csvg%20viewBox=%220%200%20183%20276%22%20id=%22img3%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22invert%22%3E%3CfeComponentTransfer%3E%3CfeFuncR%20tableValues=%221%200%22%20type=%22table%22/%3E%3CfeFuncG%20tableValues=%221%200%22%20type=%22table%22/%3E%3CfeFuncB%20tableValues=%221%200%22%20type=%22table%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/svg%3E#invert"); filter: invert(100%); }
.FRAME_main .WB_global_nav .gn_nav_list li .home em { color: #fa7d3c; }
.WB_global_nav .S_ficon, .WB_global_nav .S_ficon_dis, .WB_global_nav a.S_ficon_dis:hover, .WB_global_nav a:hover .S_ficon_dis { color: #a6afbf; }
.WB_global_nav .S_txt1, .WB_global_nav .SW_fun .S_func1 { color: #eee; }
`,
  });

  i18n.colorOverride = {
    cn: '修改网页配色（半透明背景）||主背景色{{color2}}|透明度{{transparency2}}%||副背景色{{color1}}|透明度{{transparency1}}%||输入框背景色{{color3}}|透明度{{transparency3}}%',
    tw: '修改網頁配色（半透明背景）||主背景色{{color2}}|透明度{{transparency2}}%||副背景色{{color1}}|透明度{{transparency1}}%||輸入方塊背景色{{color3}}|透明度{{transparency3}}%',
    en: 'Change colors on page (Semi-transparent background) || Primary Background Color {{color2}} | transparency {{transparency2}}% || Secondary Background Color {{color1}} | transparency {{transparency1}}% || Input box {{color3}} | transparency {{transparency3}}%',
  };

  theme.color = rule.Rule({
    id: 'layout_theme_color',
    version: 1,
    parent: theme.theme,
    template: () => i18n.colorOverride,
    ref: {
      color1: { type: 'color', initial: '#f6f6f6' },
      transparency1: { type: 'range', min: 0, max: 100, initial: 30 },
      color2: { type: 'color', initial: '#ffffff' },
      transparency2: { type: 'range', min: 0, max: 100, initial: 30 },
      color3: { type: 'color', initial: '#ffffff' },
      transparency3: { type: 'range', min: 0, max: 100, initial: 30 },
    },
    ainit() {
      const colorStr = (color, transparency) => color + (256 | 255 * (1 - transparency / 100)).toString(16).slice(-2);
      const color1 = colorStr(this.ref.color1.getConfig(), this.ref.transparency1.getConfig());
      const color2 = colorStr(this.ref.color2.getConfig(), this.ref.transparency2.getConfig());
      const color3 = colorStr(this.ref.color3.getConfig(), this.ref.transparency3.getConfig());
      const notes = colorStr('#fff8bf', Math.round(100 - (100 - this.ref.transparency1.getConfig()) ** 3 / 1e4));
      css.append(`
body .S_bg1, body .SW_fun_bg:hover, body .SW_fun_bg_active { background-color: ${color1}; }
body .S_bg2, body blockquote, body .W_btn_b, body .W_input, body .SW_fun_bg { background-color: ${color2}; }
body .S_bg1_br { border-color: ${color1}; }
body .S_bg2_br { border-color: ${color2}; }
body .W_input, body .send_weibo .input { background-color: ${color3}; }

.S_bg2 .private_list.SW_fun_bg:not(.cur),
.WB_tab_a .tab .S_bg2 .S_bg2,
.S_bg2 .WB_webim_page .webim_contacts_mod
{ background-color: transparent; }

.WB_notes { background-color: ${notes} }

.W_arrow_bor_t i, .W_arrow_bor_t em { border-left-color: transparent; border-right-color: transparent; border-top-color: transparent; }
.W_arrow_bor_r i, .W_arrow_bor_r em { border-bottom-color: transparent; border-right-color: transparent; border-top-color: transparent; }
.W_arrow_bor_b i, .W_arrow_bor_b em { border-bottom-color: transparent; border-left-color: transparent; border-right-color: transparent; }
.W_arrow_bor_l i, .W_arrow_bor_l em { border-bottom-color: transparent; border-left-color: transparent; border-top-color: transparent; }

.WB_tab_a .tab_box_a_r2 .tab .li_first, .WB_tab_a .tab_box_a_r2 .tab .li_last { display: none; }
.WB_tab_a .tab_box_a .tab { display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; }

.WB_tab_a.WB_tab_a .tab .t { height: 38px; width: calc(100% - 16px); }
.WB_tab_a.WB_tab_a .tab .b { display: none; }
.WB_tab_a.WB_tab_a .tab_box_a .tab.clearfix::after { display: none; }
.WB_tab_a.WB_tab_a .tab_box_a .tab li { margin: 0; flex-grow: 1; }
.WB_tab_a.WB_tab_a .tab_box_a_r6 .t { width: calc(100% - 14px); }

.search_directarea, .WB_editor_iframe { background: none; }
.private_list_box .private_head { padding-bottom: 8px; }
.private_list_box .private_body { margin-top: 0; }
#weibochat { background: none; }
`);
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/layout/usercss.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const rule = yawf.rule;
  const externalMenu = yawf.externalMenu;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const ui = util.ui;

  const userCss = layout.userCss = {};

  i18n.userCssGroupTitle = {
    cn: '自定义 CSS 样式',
    tw: '自訂 CSS 式樣',
    en: 'Custom CSS',
  };

  userCss.userCss = rule.Group({
    parent: layout.layout,
    template: () => i18n.userCssGroupTitle,
  });

  Object.assign(i18n, {
    userCss: {
      cn: '使用自定义 CSS 样式 {{i}}||{{css}}',
      tw: '使用自訂 CSS 式樣 {{i}}||{{css}}',
      en: 'Apply Custom CSS {{i}}||{{css}}',
    },
    userCssDetail: {
      cn: '错误配置的自定义样式可能导致您的网页显示不正常，使用来源不明的 CSS 代码可能危害您的隐私安全。建议您仅添加您信任的 CSS 样式。如果您使用的样式导致设置窗口无法正常显示，' + (env.name === 'WebExtension' ? '您可以在标签页上右键找到禁用功能' : '您可以在“猴子”扩展的菜单中找到禁用功能') + '。',
      tw: '錯誤設定的自訂式樣可導致您的網頁不能正常顯示，使用來源不明的 CSS 程式碼可能威脅您的隱私安全。建議您僅添加您信任的 CSS 式樣。如果您使用的式樣導致設定方框無法正常顯示，' + (env.name === 'WebExtension' ? '您可以在索引標籤上按右鍵找到停用功能' : '您可以在「猴子」擴展的功能列中找到停用功能') + '。',
      en: 'Misconfigured custom CSS may make your web page being rendered incorrectly. Using CSS from untrusted source may harm your privacy. Make sure only adding CSS from you trusted source. In case custom CSS breaks this setting dialog, ' + (env.name === 'WebExtension' ? 'you may disable it from context menu of browser tab' : 'you may disable it from the menu item in "monkey" extension') + '.',
    },
    disableUserCss: {
      cn: '禁用自定义 CSS 样式',
      tw: '停用自訂 CSS 式樣',
      en: 'Disable Custom CSS',
    },
    disableUserCssText: {
      cn: '已禁用自定义 CSS 样式。如果您配置的自定义 CSS 样式导致界面出现任何问题，您可以在设置中选择启用后，删除导致问题的规则。',
      tw: '已停用自訂 CSS 式樣。如果您設定的自訂 CSS 式樣導致介面出現任何問題，您可以在這定中選擇啟用後，刪除導致問題的規則。',
      en: 'Custom CSS had been disabled. In case any custom CSS break the webpage, you may enable and then edit it in the setting dialog.',
    },
  });

  if (env.config.externalMenuSupported) {
    userCss.css = rule.Rule({
      v7Support: true,
      id: 'custom_css',
      version: 1,
      parent: userCss.userCss,
      template: () => i18n.userCss,
      initial: true,
      ref: {
        css: { type: 'text' },
        i: { type: 'bubble', icon: 'warn', template: () => i18n.userCssDetail },
      },
      afterRender(node) {
        const textarea = node.querySelector('textarea');
        const label = textarea.closest('label');
        if (!this.isEnabled()) label.style.display = 'none';
        this.addConfigListener(enabled => {
          if (enabled) {
            label.style.display = 'block';
            label.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
            textarea.focus();
          } else {
            label.style.display = 'none';
          }
        });
        return node;
      },
      ainit() {
        const style = document.createElement('style');
        style.textContent = this.ref.css.getConfig();
        setTimeout(function addStyle() {
          // Tampermonkey BETA 处理 setTimeout 0 会真的 0，会卡死……
          // 虽然扩展版本不受影响，不过两边代码是共用的，所以这里改一下也不会有什么问题
          if (!document.body) setTimeout(addStyle, 16);
          else document.body.appendChild(style);
        }, 0);
        // 我们添加一个可以禁用这个功能的方式以防有用户把设置对话框给隐藏了或者弄乱了改不回去
        externalMenu.add({
          title: i18n.disableUserCss,
          callback: async () => {
            this.setConfig(false);
            style.textContent = '';
            await ui.alert({
              id: 'yawf-disable-user-css',
              icon: 'succ',
              title: i18n.disableUserCss,
              text: i18n.disableUserCssText,
            });
            location.reload();
          },
        });
      },
    });
  }

}());
//#endregion
//#region @require yaofang://content/rule/feeds/feeds.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.feedsTabTitle = {
    cn: '微博展示',
    en: 'Feeds',
  };

  const feeds = yawf.rules.feeds = {};
  feeds.feeds = rule.Tab({
    template: () => i18n.feedsTabTitle,
    pagemenu: true,
  });

}());
//#endregion
//#region @require yaofang://content/rule/feeds/render.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const feeds = yawf.rules.feeds;
  const clean = yawf.rules.clean;

  const i18n = util.i18n;
  const css = util.css;

  const render = feeds.render = {};

  i18n.feedRenderGroupTitle = { cn: '渲染' };

  render.render = rule.Group({
    parent: feeds.feeds,
    template: () => i18n.feedRenderGroupTitle,
  });

  Object.assign(i18n, {
    feedRenderFix: {
      cn: '修改微博显示逻辑以允许相关改造功能 {{i}}',
    },
    feedRenderFixDetail: {
      cn: '如果因为微博的改版导致该功能故障，请停用该选项。只有打开该选项才能使用大部分对微博的改造功能。打开后会有一些细节上的变化，作者等处会显示为链接，转发的原微博会显示来源，微博下的转发列表可以点击时间跳转到该微博。',
    },
  });

  const renderModify = function (rootKey, configs) {
    const yawf = window[rootKey];
    const vueSetup = yawf.vueSetup;

    const { smallImage, newTab } = configs;

    const absoluteUrl = function (url) {
      const base = location.host === 'www.weibo.com' ? '//www.weibo.com/' : '//weibo.com/';
      return new URL(url, new URL(base, location.href)).href;
    };
    const setHref = function (vnode, url) {
      if (!vnode.data) vnode.data = {};
      if (!vnode.data.attrs) vnode.data.attrs = {};
      vnode.data.attrs.href = url;
    };

    const removeClickHandler = function (vnode) {
      if (!vnode.data || !vnode.data.on) return null;
      const onclick = vnode.data.on.click;
      delete vnode.data.on.click;
      return onclick;
    };
    const addClickHandler = function (vnode, onclick) {
      if (!vnode.data) vnode.data = {};
      if (!vnode.data.on) vnode.data.on = {};
      vnode.data.on.click = onclick;
    };
    const muteClickHandler = function (vnode) {
      const onclick = removeClickHandler(vnode);
      if (!onclick) return;
      addClickHandler(vnode, function (event) {
        if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey) return;
        if (event.buttons !== 1) return;
        event.preventDefault();
        onclick(event);
      });
    };
    const configClickHandler = function (vnode, link, newTab) {
      if (newTab) {
        removeClickHandler(vnode);
        if (!link.data) link.data = {};
        if (!link.data.attrs) link.data.attrs = {};
        link.data.attrs.target = '_blank';
      } else {
        muteClickHandler(vnode);
      }
    };

    document.documentElement.addEventListener('click', function (event) {
      const target = event.target;
      if (!(target instanceof Element)) return;
      const link = target.closest('.yawf-feed-detail-content-handler a[href]');
      if (!link) return;
      if (event.ctrlKey || event.shiftKey || event.metaKey || event.altKey) {
        event.stopPropagation();
      }
      const isPicture = link.hasAttribute('data-pid');
      const isMention = link.getAttribute('href').startsWith('/n/');
      if (isPicture ? newTab.picture : isMention ? newTab.mention : newTab.topic) {
        event.stopPropagation();
      }
    }, { capture: true });

    // 给提到和话题的链接加上新标签页打开的标记
    const handleContentRender = function (content) {
      if (!content.data?.domProps?.innerHTML) return;
      const tag = 'x-content-parse-wrap-x' + (Math.random() + '').slice(2);
      const wrap = new DOMParser().parseFromString(`<${tag}>` + content.data.domProps.innerHTML, 'text/html').querySelector(tag);
      [...wrap.querySelectorAll('a')].forEach(link => {
        if (link.target === '_blank') return;
        const isPicture = link.hasAttribute('data-pid');
        const isMention = link.getAttribute('href').startsWith('/n/');
        if (isPicture ? newTab.picture : isMention ? newTab.mention : newTab.topic) {
          link.target = '_blank';
        }
      });
      Object.assign(content.data.domProps, { innerHTML: wrap.innerHTML });
    };

    vueSetup.transformComponentsRenderByTagName('feed', function (nodeStruct, Nodes) {
      const { addClass } = Nodes;
      addClass(nodeStruct, 'yawf-feed');
      const body = nodeStruct.querySelector('x-feed-head').parentNode;
      addClass(body, 'yawf-feed-body');
    });

    vueSetup.transformComponentsRenderByTagName('feed-title', function (nodeStruct, Nodes) {
      const { addClass } = Nodes;
      addClass(nodeStruct, 'yawf-feed-title');
    });

    vueSetup.transformComponentsRenderByTagName('feed-head', function (nodeStruct, Nodes) {
      const { addClass, setAttribute } = Nodes;

      addClass(nodeStruct, 'yawf-feed-head');

      // 用户头像
      const avatar = nodeStruct.querySelector('x-woo-avatar').parentNode;
      if (avatar) addClass(avatar, 'yawf-feed-avatar');
      if (newTab.author) {
        if (avatar) setAttribute(avatar, 'target', '_blank');
      }
      // 用户昵称
      const userLink = nodeStruct.querySelector('span').closest('x-a-link');
      if (userLink) {
        addClass(userLink, 'yawf-feed-author');
        if (newTab.author) setAttribute(userLink, 'target', '_blank');
      }
      const userLine = nodeStruct.querySelector('span').closest('x-woo-box');
      if (userLine) {
        addClass(userLine, 'yawf-feed-author-line');
        addClass(userLine.parentNode, 'yawf-feed-author-box');
        addClass(userLine.closest('.yawf-feed-head > *'), 'yawf-feed-head-main');
      }
      if (userLink) {
        const iconList = userLink.parentNode.querySelector('x-icon-list');
        if (iconList) addClass(iconList, 'yawf-feed-icon-list yawf-feed-author-icon-list');
      }
      // 快转
      if (Array.isArray(this.screen_name_suffix_new) && this.screen_name_suffix_new.length) {
        if (userLine) {
          const [fastFromUser] = [...userLine.querySelectorAll('x-a-link')].filter(item => item !== userLink);
          if (fastFromUser) {
            addClass(fastFromUser, 'yawf-feed-author');
            addClass(fastFromUser, 'yawf-feed-fast-forward-original');
            addClass(userLink, 'yawf-feed-fast-forward-author');
          }
        }
      }
      // 标记一下时间和来源
      const headInfo = nodeStruct.querySelector('x-head-info');
      if (headInfo) addClass(headInfo, 'yawf-feed-head-info');

      const slots = nodeStruct.lastChild;
      if (slots) {
        addClass(slots, 'yawf-feed-head-slots');
        const readnum = slots.querySelector('x-readnum');
        const followBtn = slots.querySelector('x-follow-btn');
        const morepop = slots.querySelector('x-morepop');
        if (readnum) addClass(readnum, 'yawf-feed-readnum');
        if (followBtn) addClass(followBtn, 'yawf-feed-follown-btn');
        if (morepop) addClass(morepop, 'yawf-feed-morepop');
      }
    });

    vueSetup.transformComponentsRenderByTagName('head-info', function (nodeStruct, Nodes) {
      const { h, insertBefore, removeChild, addClass, removeEventListener, setAttribute } = Nodes;

      addClass(nodeStruct, 'yawf-head-info');
      // 微博详情
      /** @type {HTMLAnchorElement} */
      const link = nodeStruct.querySelector('a');
      addClass(link, 'yawf-feed-time');
      if (newTab.detail) {
        removeEventListener(link, 'click');
        setAttribute(link, 'target', '_blank');
      }

      const tag = link.previousSibling;
      if (tag) addClass(tag, 'yawf-feed-tag');

      const sourceBox = nodeStruct.querySelector('x-woo-box-item x-woo-box');
      const [, source, edited] = sourceBox.childNodes;

      // 替换掉原有的来源，保证来源本身有个标签，后续用来做拖拽过滤用
      if (source && source.nodeType !== Node.COMMENT_NODE) {
        const tag = 'x-content-parse-wrap-x' + (Math.random() + '').slice(2);
        const sourceValue = new DOMParser().parseFromString(`<${tag}>` + this.source, 'text/html').querySelector(tag);
        const link = sourceValue.querySelector('a');
        const url = link && link.href || null;
        const sourceText = sourceValue.textContent;
        const newSourceVNode = h('div', {
          class: [this.$style.source, 'yawf-feed-source-container'],
        }, ['来自 ', h(url ? 'a' : 'span', {
          class: ['yawf-feed-source'],
          attrs: {
            draggable: 'true',
            href: url,
            rel: url && 'noopener nofollow',
            target: url && '_blank',
          },
        }, [sourceText || '微博 weibo.com'])]);
        insertBefore(sourceBox, newSourceVNode, source);
        removeChild(sourceBox, source);
      }

      // 已编辑
      if (edited && edited.nodeType !== Node.COMMENT_NODE) {
        addClass(edited, 'yawf-feed-edited');
      }
    });

    vueSetup.transformComponentsRenderByTagName('feed-content', function (nodeStruct, Nodes) {
      const { vNode, addClass, wrapNode, h } = Nodes;

      // 作者等
      const headInfo = nodeStruct.querySelector('x-head-info');
      if (headInfo) {
        addClass(headInfo, 'yawf-feed-head-info yawf-feed-head-info-retweet');
        const headInfoVNode = vNode(headInfo);
        if (headInfoVNode.componentOptions.propsData) {
          headInfoVNode.componentOptions.propsData.source = this.data.source;
        }
        addClass(headInfo.parentNode, 'yawf-feed-retweet-bar');
      }

      // 内容
      addClass(nodeStruct, 'yawf-feed-content');
      if (headInfo) {
        addClass(nodeStruct, 'yawf-feed-content-retweet');
      }

      // 提示横幅
      const tip = nodeStruct.querySelector('x-woo-tip');
      if (tip) {
        addClass(tip, 'yawf-feed-content-tip');
        if (this.data.complaint?.url) {
          const linkVNode = h('a', {
            class: 'yawf-feed-content-tip-link yawf-extra-link',
            attrs: { href: absoluteUrl(this.data.complaint.url) },
          });
          wrapNode(tip, linkVNode);
          configClickHandler(vNode(tip), linkVNode, true);
        }
      }
    });

    vueSetup.transformComponentsRenderByTagName('feed-detail', function (nodeStruct, Nodes) {
      const { vNode, addClass } = Nodes;
      const [authorBox, content] = nodeStruct.childNodes;

      addClass(nodeStruct, 'yawf-feed-detail');

      // 原作者
      if (authorBox && authorBox.nodeType !== Node.COMMENT_NODE) {
        const author = authorBox.querySelector('x-a-link');
        addClass(author, 'yawf-feed-original');
        addClass(authorBox, 'yawf-feed-original-box');
      }

      // 内容
      if (content && content.nodeType !== Node.COMMENT_NODE) {
        addClass(content, 'yawf-feed-detail-content');
        if (this.repost) {
          addClass(content, 'yawf-feed-detail-content-retweet');
        }
        handleContentRender(vNode(content));
      }
    });

    vueSetup.transformComponentsRenderByTagName('feed-picture', function (nodeStruct, Nodes) {
      const { addClass, vNode } = Nodes;
      // 微博配图
      addClass(nodeStruct, 'yawf-feed-picture');
      // 每行三张图或四张图
      if (this.inlineNum === 3) {
        addClass(nodeStruct, 'yawf-feed-picture-col3');
      } else if (this.inlineNum === 4) {
        addClass(nodeStruct, 'yawf-feed-picture-col4');
      }
      // 单张图片
      if (this.isSinglePic) {
        addClass(nodeStruct, 'yawf-feed-picture-single');
        // 缩小单张图片，V5 版单张图片的尺寸不超过 120x120
        if (smallImage) {
          const oriWidth = this.isPay && this.pics[0]?.width || this.pics[0].geo?.width;
          const oriHeight = this.isPay && this.pics[0]?.height || this.pics[0].geo?.height;
          const width = Math.min(120, Math.max(120 / oriHeight * oriWidth, 30));
          const height = Math.min(120, Math.max(120 / oriWidth * oriHeight, 30));
          const style = vNode(nodeStruct.firstChild).data.style;
          style.width = width + 'px';
          style.height = height + 'px';
        }
      }
    });

    // 视频
    vueSetup.transformComponentsRenderByTagName('feed-video', function (nodeStruct, Nodes) {
      const { addClass } = Nodes;
      addClass(nodeStruct, 'yawf-feed-video');
    });

    vueSetup.transformComponentsRenderByTagName('feed-card-link', function (nodeStruct, Nodes) {
      const { addClass, setAttribute } = Nodes;
      // 其他卡片
      addClass(nodeStruct, 'yawf-feed-card-link');
      if (newTab.card) setAttribute(nodeStruct, 'target', '_blank');
      const card = nodeStruct.firstChild;
      if (card) {
        addClass(card, 'yawf-feed-card');
        const picture = card.querySelector('x-woo-picture');
        const content = picture.nextSibling;
        addClass(picture, 'yawf-feed-card-picture');
        addClass(content, 'yawf-feed-card-content');
      }
    });

    vueSetup.transformComponentsRenderByTagName('feed-article', function (nodeStruct, Nodes) {
      const { addClass, setAttribute } = Nodes;
      addClass(nodeStruct, 'yawf-feed-card-article-link');
      addClass(nodeStruct.firstChild, 'yawf-feed-card-article');
      if (newTab.card) setAttribute(nodeStruct, 'target', '_blank');
    });

    vueSetup.transformComponentsRenderByTagName('feed-vote', function (nodeStruct, Nodes) {
      const { addClass } = Nodes;
      addClass(nodeStruct, 'yawf-feed-card-vote');
    });

    vueSetup.transformComponentsRenderByTagName('feed-toolbar', function (nodeStruct, Nodes) {
      const { addClass, vNode, removeChild, insertBefore } = Nodes;

      addClass(nodeStruct, 'yawf-feed-toolbar');

      // 操作按钮
      const buttons = [...nodeStruct.querySelectorAll('x-woo-box-item')];
      buttons.forEach(button => {
        if (button.childNodes.length !== 3) return;
        const buttonType = [...button.childNodes].findIndex(node => node.nodeType === Node.ELEMENT_NODE);
        addClass(button, ['yawf-feed-toolbar-retweet', 'yawf-feed-toolbar-comment', 'yawf-feed-toolbar-like'][buttonType]);
        if (buttonType === 0 && configs.hideFastRepost) {
          try {
            const pop = button.querySelector('x-woo-pop');
            const popVNode = vNode(pop);
            const retweetButtonVNode = popVNode.data.scopedSlots.ctrl()[0];
            const oriRetweetButton = pop.querySelector('x-woo-pop-item:nth-child(2)');
            retweetButtonVNode.data.on = vNode(oriRetweetButton).data.on;
            retweetButtonVNode.data.nativeOn = vNode(oriRetweetButton).data.nativeOn;
            const contain = pop.parentNode;
            insertBefore(contain.parentNode, retweetButtonVNode, contain);
            removeChild(contain.parentNode, contain);
          } catch (e) {
            // ignore
          }
        }
      });
    });

    const repostCommentListRanderTransform = function (nodeStruct, Nodes) {
      const { addClass, setAttribute } = Nodes;

      // 查看全部评论
      const more = nodeStruct.querySelector('x-woo-divider + x-a-link');
      if (more) {
        addClass(more, 'yawf-feed-comment-more');
        if (newTab.comments) setAttribute(more, 'target', '_blank');
      }
    };
    vueSetup.transformComponentsRenderByTagName('repost-coment-feed', repostCommentListRanderTransform); // 又是他们拼错了
    vueSetup.transformComponentsRenderByTagName('repost-comment-feed', repostCommentListRanderTransform); // 这行现在没用
    vueSetup.transformComponentsRenderByTagName('repost-comment-list', repostCommentListRanderTransform);

    vueSetup.transformComponentsRenderByTagName('reply-modal', function (nodeStruct, Nodes) {
      const reply = this;
      const { transformSlot } = Nodes;
      transformSlot(nodeStruct, 'content', function (nodeStruct) {
        commentRenderTransformHelper(nodeStruct, reply.rootComment, Nodes);
      });
    });

    vueSetup.transformComponentsRenderByTagName('reply', function (nodeStruct, Nodes) {
      commentRenderTransformHelper(nodeStruct, this.item, Nodes);
    });

    vueSetup.transformComponentsRenderByTagName('main-composer', function (nodeStruct, Nodes) {
      const { h, wrapNode, vNode } = Nodes;

      // 发帖头像
      const avatar = nodeStruct.querySelector('x-woo-avatar');
      if (avatar) {
        const linkVNode = h('a', {
          class: 'yawf-feed-composer-avatar yawf-extra-link',
          attrs: { href: absoluteUrl(this.config.user.profile_url) },
        });
        wrapNode(avatar, linkVNode);
        configClickHandler(vNode(avatar), linkVNode, newTab.author);
      }
    });

    const commentRenderTransformHelper = function (nodeStruct, comment, Nodes) {
      const { vNode, addClass, setAttribute } = Nodes;

      addClass(nodeStruct, 'yawf-feed-comment');

      const [avatar, author, ...replyAuthors] = nodeStruct.querySelectorAll('x-a-link');
      if (avatar) {
        addClass(avatar, 'yawf-feed-comment-avatar');
        if (newTab.comments) setAttribute(avatar, 'target', '_blank');
      }
      // 评论作者
      if (author) {
        addClass(author, 'yawf-feed-comment-author');
        if (newTab.comments) setAttribute(author, 'target', '_blank');
      }
      // 二级评论作者
      if (replyAuthors?.length) {
        replyAuthors.forEach((author, index) => {
          if (!comment.comments?.[index]) return;
          if (newTab.comments) setAttribute(author, 'target', '_blank');
          addClass(author, 'yawf-feed-comment-author', 'yawf-feed-comment-reply-author');
        });
        if (comment.comments) {
          const more = replyAuthors.slice(comment.comments.length);
          more.forEach((author, index) => {
            if (!comment.more_info?.user_list?.[index]) return;
            if (newTab.comments) setAttribute(author, 'target', '_blank');
            addClass(author, 'yawf-feed-comment-author', 'yawf-feed-comment-reply-author', 'yawf-feed-comment-more-author');
          });
        }
      }

      // 评论的内容
      const contentList = [...nodeStruct.querySelectorAll('span')];
      contentList.forEach(content => {
        if (!Object.prototype.hasOwnProperty.call(vNode(content).data?.domProps || {}, 'innerHTML')) return;
        addClass(content, 'yawf-feed-comment-content');
        addClass(content.parentNode, 'yawf-feed-comment-text');
        handleContentRender(vNode(content));
        addClass(content, 'yawf-feed-detail-content-handler');
      });

      // 带图评论
      const picture = nodeStruct.querySelector('x-woo-picture');
      if (picture) addClass(picture, 'yawf-feed-comment-picture');

      // 某条评论下的所有评论
      const moreIcon = nodeStruct.querySelector('.yawf-feed-comment-more-author, a > x-woo-fonticon');
      const line = moreIcon?.closest('.text');
      if (line) {
        addClass(line, 'yawf-feed-comment-more-text');
      }

      // 评论的操作按钮
      const iconLists = Array.from(nodeStruct.querySelectorAll('x-icon-list'));
      iconLists.forEach(iconList => {
        addClass(iconList, 'yawf-feed-comment-icon-list');
      });
    };
    vueSetup.transformComponentsRenderByTagName('comment', function (nodeStruct, Nodes) {
      commentRenderTransformHelper(nodeStruct, this.item, Nodes);
    });

    vueSetup.transformComponentsRenderByTagName('repost', function (nodeStruct, Nodes) {
      const { h, wrapNode, vNode, addClass } = Nodes;

      addClass(nodeStruct, 'yawf-feed-repost');

      // 转发作者
      const author = nodeStruct.querySelector('a');
      if (author) {
        setHref(vNode(author), absoluteUrl(this.item.user.profile_url));
        configClickHandler(vNode(author), vNode(author), newTab.author);
      }

      // 头像
      const avatar = nodeStruct.querySelector('x-woo-avatar');
      if (avatar) {
        const linkVNode = h('a', {
          class: 'yawf-feed-comment-avatar yawf-extra-link',
          attrs: { href: absoluteUrl(this.item.user.profile_url) },
        });
        wrapNode(avatar, linkVNode);
        configClickHandler(vNode(avatar), linkVNode, newTab.author);
      }

      // 转发正文
      const content = nodeStruct.querySelector('span');
      if (content) {
        addClass(content, 'yawf-feed-repost-content');
        addClass(content.parentNode, 'yawf-feed-repost-text');
        handleContentRender(vNode(content));
        addClass(content, 'yawf-feed-detail-content-handler');
      }

      // 转发微博原来点哪里都可以，我们让他只点时间
      const showRepost = removeClickHandler(vNode(nodeStruct));

      // 转发微博的时间
      const time = content?.parentNode.nextSibling.querySelector('div');
      if (time) {
        addClickHandler(vNode(time), showRepost);
        const linkVNode = h('a', {
          class: 'yawf-feed-repost-time yawf-extra-link',
          attrs: {
            href: absoluteUrl(`/${this.item.user.id}/${this.item.mblogid}`),
          },
        });
        wrapNode(time, linkVNode);
        configClickHandler(vNode(time), linkVNode, newTab.detail);
      }
    });

    vueSetup.transformComponentsRenderByTagName('icon-list', function (nodeStruct, Nodes) {
      const { setAttribute } = Nodes;

      const iconsName = this.iconsName;
      const iconsNode = Array.from(nodeStruct.childNodes);
      if (!Array.isArray(iconsName)) return;
      if (iconsName.length !== iconsNode.length) return;
      iconsNode.forEach((node, index) => {
        setAttribute(node, 'yawf-icon-list-name', iconsName[index].name);
      });
    });
  };

  render.feedRenderFix = rule.Rule({
    v7Support: true,
    id: 'feed_render',
    version: 77,
    parent: render.render,
    initial: true,
    template: () => i18n.feedRenderFix,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.feedRenderFixDetail },
    },
    ainit() {
      const configs = {};

      configs.smallImage = feeds.layout.smallImage.getConfig();
      configs.newTab = Object.assign(...'author,mention,topic,detail,comments,picture,card'.split(',').map(id => ({
        [id]: feeds.details.feedLinkNewTab.getConfig() && feeds.details.feedLinkNewTab.ref[id].getConfig(),
      })));
      configs.hideFastRepost = clean.feed.fast_repost.getConfig();
      util.debug('render config: %o', configs);

      util.inject(renderModify, util.inject.rootKey, configs);

      css.append(`
.yawf-extra-link, .yawf-extra-box { all: inherit; display: contents; }
.yawf-feed-source { cursor: default; }
.yawf-feed-repost.yawf-feed-repost { cursor: auto; }
.yawf-feed-repost-time { cursor: pointer; color: var(--w-sub); }
.yawf-feed-source:hover, .yawf-feed-repost-time:hover { color: var(--w-brand); }
.yawf-feed-head-info-retweet { overflow: hidden; }
.yawf-feed-head-info-retweet ~ .yawf-feed-toolbar { flex-shrink: 0; }
`);

    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/feeds/layout.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

  const feeds = yawf.rules.feeds;

  const i18n = util.i18n;
  const css = util.css;

  const layout = feeds.layout = {};

  i18n.feedLayoutGroupTitle = {
    cn: '微博布局',
    tw: '微博佈局',
    en: 'Feed Layout',
  };

  layout.layout = rule.Group({
    parent: feeds.feeds,
    template: () => i18n.feedLayoutGroupTitle,
  });

  i18n.feedFoldSpace = {
    cn: '去除微博卡片之间的空隙',
    tw: '去除微博卡片之間的空隙',
    en: 'Remove gaps between feeds',
  };

  layout.foldSpace = rule.Rule({
    id: 'feed_no_space',
    version: 1,
    parent: layout.layout,
    template: () => i18n.feedFoldSpace,
    acss: `
.WB_feed.WB_feed { border-radius: 3px; box-shadow: 0 0 2px rgba(0, 0, 0, 0.2); }
.WB_feed.WB_feed .WB_cardwrap { border-radius: 0; box-shadow: none; border-top: 1px solid rgba(0, 0, 0, 0.3); margin: -1px 0 1px; }
.WB_feed .WB_detail { margin-bottom: 40px; }
.WB_feed .WB_feed_handle { height: 20px; margin-top: -20px; display: block; position: relative; }
.WB_feed .WB_feed_expand { margin-top: 5px; }
.WB_feed.WB_feed_v3 .WB_expand { margin-bottom: 0; }
.WB_feed .WB_feed_handle .WB_handle { float: right; margin-right: 10px; height: 20px; padding: 0; position: relative; top: -20px; }
.WB_feed .WB_feed_handle .WB_row_line { border: none; overflow: hidden; line-height: 26px; }
.WB_feed .WB_feed_handle .WB_row_line::after { content: " "; display: block; margin-left: -1px; flex: 0 0 0; order: 10; }
.WB_feed .WB_feed_handle .WB_row_line li { padding: 0 11px 0 10px; height: auto; margin-right: -1px; }
.WB_feed .WB_row_line .line { display: inline; border-width: 0; position: relative; }
.WB_feed .WB_row_line .line::before { content: " "; display: block; width: 0; height: 100%; position: absolute; right: -10px; top: 0; border-right: 1px solid; border-color: inherit; }
.WB_feed .WB_row_line .line span .W_ficon { vertical-align: middle; }
.WB_feed_handle .WB_row_line .arrow { display: none; }
.WB_feed_repeat { margin-top: -10px; }
.WB_feed_comment.WB_feed_comment .WB_feed_detail { position: relative; padding-bottom: 4px; }
.WB_feed_comment.WB_feed_comment .WB_feed_detail::after { display: none; }
.WB_feed_v3 .WB_expand .WB_empty .WB_innerwrap, .WB_feed_comment .WB_expand { margin-bottom: 0; }
`,
  });

  i18n.sourceAtBottom = {
    cn: '将微博的发布时间和来源移动到微博末尾',
    tw: '將微博的發布時間和來源移動到微博末尾',
    en: 'Move timestamp and source of Weibo to bottom',
  };

  layout.sourceAtBottom = rule.Rule({
    id: 'feed_source_at_bottom',
    version: 1,
    parent: layout.layout,
    template: () => i18n.sourceAtBottom,
    ainit() {
      observer.dom.add(function () {
        const fromList = Array.from(document.querySelectorAll('.WB_detail > .WB_info + .WB_from'));
        if (!fromList.length) return;
        fromList.forEach(from => {
          from.parentNode.appendChild(from);
          from.classList.add('yawf-bottom-WB_from');
        });
      });
      const foldSpace = layout.foldSpace.getConfig();
      if (foldSpace) {
        css.append(`
.WB_from.WB_from.yawf-bottom-WB_from { position: absolute; bottom: 40px; margin: 0; transform: translate(0, 100%); line-height: 28px; }
`);
      } else {
        css.append('.WB_from.WB_from.yawf-bottom-WB_from { margin: 10px 0 7px; }');
      }
      css.append('.WB_feed.WB_feed .WB_expand_media_box { margin-bottom: 10px; }');
    },
  });

  Object.assign(i18n, {
    nowrapAfterAuthor: {
      cn: '微博作者与内容间不拆行 {{i}}',
      tw: '微博作者與內容間不拆行 {{i}}',
      en: 'No line breaks between author and content {{i}}',
    },
    nowrapAfterAuthorDetail: {
      cn: '如果您启用本功能时未选择“[[feed_source_at_bottom]]”，微博的来源将会被隐藏。',
    },
  });

  layout.nowrapAfterAuthor = rule.Rule({
    id: 'feed_author_content_nowrap',
    version: 1,
    parent: layout.layout,
    template: () => i18n.nowrapAfterAuthor,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.nowrapAfterAuthorDetail },
    },
    ainit() {
      css.append(`
.WB_info, .WB_text { display: inline; word-wrap: break-word; }
.WB_info::after { content: "："; }
.WB_text::before { content: " "; display: block; float: right; width: 14px; height: 1px; }
.WB_expand .WB_text::before { width: 0; }
[yawf-hide-box] .WB_text::before { width: 37px; }
[yawf-hide-box] .WB_expand .WB_text::before { width: 14px; }

.WB_info + .WB_from { display: none; }
body .WB_feed_v3 .WB_face .opt.opt { margin: 10px 0 0 0; position: static; right: auto; top: auto; }
body .WB_feed_v3 .WB_face .opt.opt .W_btn_b { width: 48px; }

.WB_face { line-height: 0; }
.WB_detail { min-height: 50px; }

[id^="Pl_Core_WendaList__"] .WB_text::before { width: 68px; }

.WB_feed.WB_feed_v3 .WB_expand_media_box { margin-top: 10px; }

.WB_feed.WB_feed_v3 .WB_info .sp_kz, 
.WB_feed.WB_feed_v3 .WB_info .W_autocut { vertical-align: top; }
`);
    },
  });

  i18n.smallImage = {
    cn: '缩小缩略图尺寸 {{i}}||{{repost}}缩小转发原文宽度（仅限V6）',
    tw: '縮小縮略圖尺寸 {{i}}||{{repost}}縮小轉發原文寬度（僅限V6）',
    en: 'Decrease the size of image {{i}}||{{repost}} Decrease the width of original feeds (V6 Only)',
  };
  i18n.smallImageDetail = {
    cn: '缩小图片尺寸仅影响图片在您的网页上的显示效果，不能降低网络数据流量用量。',
  };

  layout.smallImage = rule.Rule({
    v7Support: true,
    id: 'feed_small_image',
    version: 1,
    parent: layout.layout,
    template: () => i18n.smallImage,
    ref: {
      repost: { type: 'boolean' },
      i: { type: 'bubble', icon: 'warn', template: () => i18n.smallImageDetail },
    },
    ainit() {
      // 单张图片尺寸计算在 render 里
      css.append(`
.yawf-feed-picture-col3 > div { width: 252px; }
.yawf-feed-picture-col4 > div { width: 332px; }
.yawf-feed-video { transition: width 0s 0.2s ease; }
.yawf-feed-video-inactive { width: 150px; }
.yawf-feed-card > div { width: 316px; }
.yawf-feed-card-picture { width: 80px !important; height: 80px !important; }
.yawf-feed-comment-picture { max-width: 80px; }
.yawf-feed-card-article { max-width: 240px; }
`);
      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        // 我们需要他不复用视频组件
        vueSetup.transformComponentsRenderByTagName('feed-content', function (nodeStruct, Nodes) {
          const video = nodeStruct.querySelectorAll('x-feed-video');
          if (video && !video.key) video.key = this.data.id; // 用 mid 很方便
        });
        vueSetup.eachComponentVM('feed-video', function (vm) {
          // 这个变量要存下来，不然到 beforeDestroy 的时候他爹就不是现在这个了
          const feed = vm.$parent.data;
          if (!vm.isPlaying && feed._yawf_VideoTouched) {
            vm.isPlaying = true;
            vm.$forceUpdate();
          }
          vm.$on('hook:beforeDestroy', function () {
            feed._yawf_VideoTouched = vm.isPlaying;
          });
          vueSetup.transformComponentRender(vm, function (nodeStruct, Nodes) {
            const { addClass } = Nodes;
            if (this.isPlaying) {
              addClass(nodeStruct, 'yawf-feed-video-actived');
            } else {
              addClass(nodeStruct, 'yawf-feed-video-inactive');
            }
          });
        });

      }, util.inject.rootKey);
    },
  });

  Object.assign(i18n, {
    increaseFeedWidth: {
      cn: '加宽微博宽度|为{{width}}像素',
      tw: '加寬微博寬度|為{{width}}像素',
      en: 'Increase width of feeds | to {{width}}px',
    },
  });

  layout.increaseFeedWidth = rule.Rule({
    id: 'feed_increase_width',
    version: 1,
    parent: layout.layout,
    template: () => i18n.increaseFeedWidth,
    ref: {
      width: {
        type: 'range',
        min: 600,
        initial: 750,
        max: 1280,
        step: 10,
      },
    },
    init() {
      const width = this.isEnabled() ? this.ref.width.getConfig() : 600;
      css.append(`
:root { --yawf-feed-width: ${width}px; --yawf-extra-padding: 0px; }
.B_index, .B_discover, .B_message { --yawf-left-width: 150px; --yawf-right-width: 250px; }
.B_page { --yawf-left-width: 0px; --yawf-right-width: 320px; }
.B_index[yawf-merge-left], .B_message[yawf-merge-left] { --yawf-left-width: 0px; --yawf-extra-padding: 10px; }
.B_artical { --yawf-feed-width: 1000px; --yawf-left-width: 0px; --yawf-right-width: 0px; }

html .B_index .WB_frame,
html .B_message .WB_frame,
html .B_discover .WB_frame,
html .B_page .WB_frame,
html .B_page .WB_frame_a {
  width: calc(var(--yawf-feed-width) + calc(var(--yawf-left-width) + var(--yawf-right-width))) !important;
}
html .B_index .WB_frame #plc_main,
html .B_message .WB_frame #plc_main,
html .B_discover .WB_frame #plc_main,
html .B_page .WB_frame #plc_main {
  width: calc(var(--yawf-feed-width) + var(--yawf-right-width)) !important;
}
html .B_index .WB_main_c,
html .B_message .WB_main_c,
html .B_page .WB_frame_c,
html .B_discover .WB_frame_c {
  width: var(--yawf-feed-width) !important;
}
html .B_page .WB_frame_c {
  margin-right: 0;
}

html .WB_frame_c ~ .WB_frame_b {
  margin-left: 20px;
  margin-right: 0;
}

@media screen and (max-width: 1006px) {
.B_index, .B_message { --yawf-right-width: 10px; }
}
@media screen and (max-width: 939px) {
.B_page { --yawf-right-width: 0px; }
}

body .WB_tab_a .tab_box { display: flex; }
body .WB_tab_a .tab_box > * { flex: 0 0 auto; }
body .WB_tab_a .tab_box > .W_fr { order: 2; }
body .WB_tab_a .tab_box::after { order: 1; flex: 1 0 0; height: auto; }
body .WB_tab_a .tab_box_a .fr_box { flex: 1 0 0; }
body .WB_tab_a .tab_box_a::after { content: none; }
body .WB_feed_v3 .WB_face .opt { right: calc(132px - var(--yawf-feed-width)); }
body a.W_gotop.W_gotop { margin-left: calc(calc(calc(var(--yawf-feed-width) + var(--yawf-extra-padding)) + calc(var(--yawf-left-width) + var(--yawf-right-width))) / 2); }
body .WB_timeline { margin-left: calc(calc(calc(20px + var(--yawf-feed-width)) + calc(var(--yawf-left-width) + var(--yawf-right-width))) / 2); }
html .WB_artical .WB_feed_repeat .WB_feed_publish, html .WB_artical .WB_feed_repeat .repeat_list { padding: 0 20px; }
html .WB_artical .WB_feed_repeat .W_tips, html .WB_artical .WB_feed_repeat .WB_minitab { margin: 0 16px 10px; }
`);
    },
  });

  Object.assign(i18n, {
    reorderFeedButton: {
      cn: '重新排列微博控制按钮 {{i}}||{{0}}|{{1}}|{{2}}',
      tw: '重新排列微博控制按鈕 {{i}}||{{0}}|{{1}}|{{2}}',
      en: 'Reorder buttons of feeds {{i}}||{{0}}|{{1}}|{{2}}',
    },
    reorderFeedButtonDetail: {
      cn: '此外您还可以在版面清理选项卡，或此处，勾选以隐藏“[[clean_feed_forward]]”“[[clean_feed_like]]”。',
    },
    reorderFeedButtonForward: { cn: '转发', tw: '轉發', en: 'Forward' },
    reorderFeedButtonComment: { cn: '评论', tw: '評論', en: 'Comment' },
    reorderFeedButtonLike: { cn: '赞', tw: '讚', en: 'Like' },
  });

  const reorderRefGroup = select => {
    const refs = [];
    refs.splice(0, 0, ...select.map(button => ({
      type: 'select',
      initial: button.value,
      select,
      refs,
    })));
    return Object.assign({}, ...refs.map((ref, index) => ({ [index]: ref })));
  };

  const keepOrderItemsDiff = item => {
    item.addConfigListener((newValue, oldValue) => {
      oldValue = oldValue || item.initial;
      const that = item.refs.find(that => that !== item && that.getConfig() === newValue);
      if (that) that.setConfig(oldValue);
    });
  };

  layout.reorderFeedButton = rule.Rule({
    v7Support: true,
    id: 'feed_buttons_order', // 悄悄换个名字，因为之前那个设置没法继承下来
    version: 1,
    parent: layout.layout,
    template: () => i18n.reorderFeedButton,
    ref: Object.assign({}, reorderRefGroup([
      { value: 'forward', text: () => i18n.reorderFeedButtonForward },
      { value: 'comment', text: () => i18n.reorderFeedButtonComment },
      { value: 'like', text: () => i18n.reorderFeedButtonLike },
    ]), {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.reorderFeedButtonDetail },
    }),
    init() {
      [0, 1, 2].forEach(key => {
        keepOrderItemsDiff(this.ref[key]);
      });
    },
    ainit() {
      [0, 1, 2].forEach(index => {
        const config = this.ref[index].getConfig();
        const selector = {
          forward: '.yawf-feed-toolbar-retweet',
          comment: '.yawf-feed-toolbar-comment',
          like: '.yawf-feed-toolbar-like',
        }[config];
        css.append(`${selector} { order: ${index} }`);
      });
    },
  });

  Object.assign(i18n, {
    reorderCommentButton: {
      cn: '重新排列评论控制按钮||{{0}}|{{1}}|{{2}}|{{3}}|{{4}}',
      tw: '重新排列評論微博控制按鈕||{{0}}|{{1}}|{{2}}|{{3}}|{{4}}',
      en: 'Reorder buttons of comments||{{0}}|{{1}}|{{2}}|{{3}}|{{4}}',
    },
    reorderCommentButtonDetail: {
      cn: '此外您还可以在版面清理选项卡，或此处，勾选以隐藏“[[clean_feed_like_comment]]”。',
    },
    reorderCommentButtonReport: { cn: '举报', hk: '舉報', tw: '檢舉', en: 'Report' },
    reorderCommentButtonDelete: { cn: '删除', tw: '刪除', en: 'Delete' },
    reorderCommentButtonConversition: { cn: '查看对话', tw: '查看對話', en: 'View Conversation' },
    reorderCommentButtonReply: { cn: '回复', tw: '回覆', en: 'Reply' },
    reorderCommentButtonLike: { cn: '赞', tw: '讚', en: 'Like' },
  });

  layout.reorderCommentButton = rule.Rule({
    id: 'feed_button_order_comment',
    version: 1,
    parent: layout.layout,
    template: () => i18n.reorderCommentButton,
    ref: Object.assign({}, reorderRefGroup([
      { value: 'report', text: () => i18n.reorderCommentButtonReport },
      { value: 'delete', text: () => i18n.reorderCommentButtonDelete },
      { value: 'conversition', text: () => i18n.reorderCommentButtonConversition },
      { value: 'reply', text: () => i18n.reorderCommentButtonReply },
      { value: 'like', text: () => i18n.reorderCommentButtonLike },
    ])),
    init() {
      [0, 1, 2, 3, 4].forEach(key => {
        keepOrderItemsDiff(this.ref[key]);
      });
    },
    ainit() {
      css.append([0, 1, 2, 3, 4].map(index => `
.WB_handle ul li[yawf-comment-handle-type="${this.ref[index].getConfig()}"] { order: ${index}; }
`).join(''));
    },
  });


}());
//#endregion
//#region @require yaofang://content/rule/feeds/content.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const config = yawf.config;
  const observer = yawf.observer;
  const request = yawf.request;
  const feedParser = yawf.feed;

  const feeds = yawf.rules.feeds;
  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;
  const ui = util.ui;
  const strings = util.strings;

  const content = feeds.content = {};

  i18n.feedContentGroupTitle = {
    cn: '内容',
    tw: '內容',
    en: 'Content',
  };

  content.content = rule.Group({
    parent: feeds.feeds,
    template: () => i18n.feedContentGroupTitle,
  });

  i18n.feedUserScreenName = {
    cn: '已备注的微博作者显示原始微博名',
  };

  content.fontSize = rule.Rule({
    v7Support: true,
    id: 'feed_user_screen_name',
    version: 104,
    parent: content.content,
    template: () => i18n.feedUserScreenName,
    ainit() {

      util.inject(function (rootKey) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        const fixScreenName = function (author, { screen_name }, Nodes, type) {
          const { h, insertBefore, addClass, getTextNodeValue, setTextNodeValue } = Nodes;
          const remark = author.firstChild;
          const text = remark.firstChild;
          let displayName = screen_name;
          if (getTextNodeValue(text).startsWith('@')) {
            setTextNodeValue(text, getTextNodeValue(text).slice(1));
            displayName = '@' + displayName;
          }
          const screenName = h('span', {
            class: `yawf-feed-${type}-screen-name yawf-feed-screen-name`,
            attrs: { title: screen_name },
          }, [displayName]);
          insertBefore(author, screenName, remark);
          addClass(remark, `yawf-feed-${type}-remark yawf-feed-remark`);
          addClass(author, `yawf-feed-${type}-with-remark yawf-feed-with-remark`);
        };

        vueSetup.transformComponentsRenderByTagName('feed-head', function (nodeStruct, Nodes) {
          // 作者
          const author = nodeStruct.querySelector('span').closest('x-a-link');
          const userInfo = vueSetup.closest(this, 'feed').data.user;
          if (author && userInfo?.remark) {
            fixScreenName(author, userInfo, Nodes, 'author');
          }
          // 快转
          const userLine = nodeStruct.querySelector('span').closest('x-woo-box');
          this.screen_name_suffix_new?.forEach((suffix, index) => {
            if (suffix.scheme?.startsWith('sinaweibo://userinfo?') && suffix.remark) {
              fixScreenName(userLine.children[index], { screen_name: suffix.content }, Nodes, 'fast-forward');
            }
          });
        });

        vueSetup.transformComponentsRenderByTagName('feed-detail', function (nodeStruct, Nodes) {
          // 原作者
          const [authorBox] = nodeStruct.childNodes;
          if (authorBox && authorBox.nodeType !== Node.COMMENT_NODE) {
            const author = authorBox.querySelector('x-a-link');
            const userInfo = vueSetup.closest(this, 'feed').data.retweeted_status.user;
            if (author && userInfo?.remark) {
              fixScreenName(author, userInfo, Nodes, 'original');
            }
          }
        });

      }, util.inject.rootKey);
      // 我也不懂为什么他们作者和转发原作者的名字在鼠标 hover 时候颜色不一样，但是我们姑且按照和他们一样的逻辑来
      css.append(`
span.yawf-feed-remark { margin-left: 0.6em; font-weight: normal; font-size: 90%; vertical-align: bottom; color: var(--w-sub); }
span.yawf-feed-remark::before { content: "("; }
span.yawf-feed-remark::after { content: ")"; }
span.yawf-feed-screen-name { font-weight: bold; }
.yawf-feed-author-with-remark:active span, .yawf-feed-author-with-remark:hover span { color: var(--w-alink); }
.yawf-feed-original-with-remark:active span, .yawf-feed-original-with-remark:hover span { color: var(--w-brand); }
.yawf-feed-original-with-remark { white-space: nowrap; max-width: 100%; display: inline-block; overflow: hidden; text-overflow: ellipsis; }
`);
    },
  });

  i18n.styleTextFontSize = {
    cn: '增大微博正文字号为|原大小的{{ratio}}',
    tw: '加大微博內文字體為|原大小的{{ratio}}',
    en: 'Increase font size for weibo content | to {{ratio}}',
  };

  content.fontSize = rule.Rule({
    v7Support: true,
    id: 'feed_font_size',
    version: 1,
    parent: content.content,
    template: () => i18n.styleTextFontSize,
    ref: {
      ratio: {
        type: 'select',
        select: [
          { value: '120', text: '120%', style: `font-size: 16px;` },
          { value: '150', text: '150%', style: `font-size: 21px;` },
          { value: '200', text: '200%', style: `font-size: 28px;` },
        ],
      },
    },
    ainit() {
      const config = {
        120: { fs: 16, alh: 20, lh: 26, fs2: 14, lh2: 24 },
        150: { fs: 21, alh: 24, lh: 32, fs2: 18, lh2: 27 },
        200: { fs: 28, alh: 32, lh: 42, fs2: 24, lh2: 36 },
      }[this.ref.ratio.getConfig()];
      const { fs, lh, fs2, lh2 } = config;
      css.append(`
:root:root { --feed-detail-og-font-size: ${fs}px; --feed-detail-og-line-height: ${lh}px; --feed-detail-re-font-size: ${fs2}px; --feed-detail-re-line-height: ${lh2}px; }
.yawf-feed-author-line { margin-bottom: 0px !important; font-size: ${fs}px !important; line-height: ${lh}px !important; }
.yawf-feed-author-box { justify-content: space-between !important; }
.yawf-feed-author-box::after { content: " "; margin-bottom: 4px }
.yawf-feed-detail-content { font-size: ${fs}px !important; line-height: ${lh}px !important; }
.yawf-feed-original span, .yawf-feed-detail-content-retweet, .yawf-feed-comment-text, .yawf-feed-comment-more-text, .yawf-feed-repost-text, .yawf-feed-detail-content-retweet-size { font-size: ${fs2}px !important; line-height: ${lh2}px !important; }
.yawf-feed-detail-content img, .yawf-feed-detail-content .icon-link { height: ${fs}px !important; width: ${fs}px !important; }
.yawf-feed-detail-content-retweet img, .yawf-feed-detail-content-retweet .icon-link { height: ${fs2}px !important; width: ${fs2}px !important; }

.wbpv-big-play-button { z-index: 99; }
`);
    },
  });

  i18n.autoExpandLongFeeds = {
    cn: '自动展开|不超过{{count}}字的微博|（每个换行符计{{br}}字）',
    tw: '自動展開|不超過{{count}}個字的微博|（每個換行符計{{br}}字）',
    en: 'Automatically unfold weibo | within {{count}} characters || (count each line break as {{br}} characters)',
  };

  content.expandLong = rule.Rule({
    v7Support: true,
    id: 'feed_long_expand',
    version: 1,
    parent: content.content,
    template: () => i18n.autoExpandLongFeeds,
    ref: {
      count: { type: 'range', min: 140, max: 2000, step: 10, initial: 200 },
      br: { type: 'range', min: 1, max: 60, step: 1, initial: 30 },
    },
    init() {
      const expand = this.isEnabled();
      const count = this.ref.count.getConfig();
      const br = this.ref.br.getConfig();
      util.inject(function (rootKey, expand, { count, br }) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        const expandLongTextContent = function (vm) {
          vm.$set(vm.data, 'text_expand', vm.text);
          vm.$http = Object.create(vm.$http);
          vm.$http.get = (function (get) {
            return async function (...args) {
              if (args[0] === '/ajax/statuses/longtext' && vm.data.longTextContent_raw) {
                return {
                  data: {
                    ok: 1,
                    http_code: 200,
                    data: {
                      longTextContent: vm.data.longTextContent_raw,
                      url_struct: vm.data.url_struct ?? [],
                      topic_struct: vm.data.topic_struct ?? [],
                    },
                  },
                };
              } else {
                return get.call(this, ...args);
              }
            };
          }(vm.$http.get));
          const text = vm.data.longTextContent_raw;
          if (!text) return;
          const len = Math.ceil(text.length - (text.match(/[\u0020-\u00fe]/g) || []).length / 2);
          const remLen = len + (text.split('\n').length - 1) * (br - 1);
          if (expand && remLen < count) {
            vm.handleExpand();
            const unwatch = vm.$watch(function () { return this.data.longTextContent; }, function () {
              if (!vm.data.longTextContent) return;
              unwatch();
              vm.text = vm.data.longTextContent;
              vm.$emit('updateText', vm.text);
            });
          } else {
            const expand = '<span class="expand">展开</span>';
            const wordTip = `展开（约 ${Math.ceil(len / 10) * 10} 字）`;
            vm.data.text_expand = vm.data.text_expand.replace(expand, () => expand.replace('展开', wordTip));
            vm.text = vm.data.text_expand;
            vm.$emit('updateText', vm.text);
          }
        };

        vueSetup.eachComponentVM('feed-detail', function (vm) {
          const needLoadLong = function () {
            if (!this.isLongText) return false;
            if (this.data._yawf_LongTextContentLoading !== false) return false;
            if (this.data.longTextContent) return false;
            if (this.data._yawf_LongTextContentAutoExpand) return false;
            return this.data.mid;
          };
          vm.$watch(needLoadLong, function () {
            if (!needLoadLong.call(vm)) return;
            vm.$set(vm.data, '_yawf_LongTextContentAutoExpand', true);
            try {
              expandLongTextContent(vm);
            } catch (e) {
              console.error(e);
            }
          }, { immediate: true });
        });
      }, util.inject.rootKey, expand, { count, br });
    },
  });


  i18n.feedContentLineBreak = {
    cn: '将微博中的换行显示为|{{text}}',
    tw: '將微博中的換行顯示為|{{text}}',
    en: 'Show line breaks as character |  {{text}}',
  };

  content.feedContentLineBreak = rule.Rule({
    id: 'feed_content_line_break',
    version: 1,
    parent: content.content,
    template: () => i18n.feedContentLineBreak,
    ref: {
      text: {
        type: 'select',
        initial: '⏎',
        select: [
          { value: ' ', text: ' ' },
          { value: '⤶', text: '⤶' },
          { value: '↵', text: '↵' },
          { value: '⏎', text: '⏎' },
          { value: '↲', text: '↲' },
          { value: '↩', text: '↩' },
        ],
      },
    },
    ainit() {
      observer.dom.add(function feedContentLineBreak() {
        const brList = Array.from(document.querySelectorAll('.WB_text br'));
        brList.forEach(br => {
          const placeholder = document.createElement('span');
          placeholder.className = 'yawf-linebreak S_txt2';
          br.replaceWith(placeholder);
        });
      });
      const text = this.ref.text.getConfig();
      util.css.add('.yawf-linebreak::before { content: "' + text + '" }');
    },
  });

  i18n.showLinkUrl = {
    cn: '将微博中的网页链接替换为短网址',
    tw: '將微博中的网页链接替換為短網址',
    en: 'Replace 网页链接 in Weibo by shortened URL',
  };

  content.showLinkUrl = rule.Rule({
    id: 'feed_link_use_url',
    version: 1,
    parent: content.content,
    template: () => i18n.showLinkUrl,
    init() {
      const config = this.getConfig();
      const showLinkUrl = function showLinkUrl() {
        const icon = Array.from(document.querySelectorAll('.WB_feed_type a:not([yawf-link-type]) > .W_ficon:first-child'));
        icon.forEach(i => { i.parentNode.setAttribute('yawf-link-type', i.textContent.trim()); });
        if (!config) return;
        const links = Array.from(document.querySelectorAll('.WB_feed_type a[yawf-link-type="O"][title="网页链接"]:not([yawf-link-expand])'));
        links.forEach(link => {
          link.setAttribute('yawf-link-expand', '');
          link.textContent = link.href;
          link.className = 'yawf-link';
        });
      };
      observer.dom.add(showLinkUrl);
    },
  });

  Object.assign(i18n, {
    showVoteResult: {
      cn: '未参与的投票显示得票数{{i}}',
      tw: '未參與的投票展示得票數{{i}}',
      en: 'Show voting results in without voting needed {{i}}',
    },
    showVoteResultDetail: {
      cn: '由于微博投票会自动点赞对应微博，开启该功能后，扩展会在您没有手动点赞前阻止您参与投票。无论是否开启本功能，微博投票都会导致您自动点赞该微博。',
      tw: '由於微博投票會自動點贊對應微博，開啟該功能後，擴充套件會在您沒有手動點贊前阻止您參與投票。無論是否開啟本功能，微博投票都會導致您自動點贊該微博。',
      en: 'Voting will automatically mark the feed liked. Extension will block your voting when you vote without mark the feed liked manually. Voting will automatically like the feed regardless whether this option is enabled or not.',
    },
    voteTitle: {
      cn: '参与投票',
      tw: '參與投票',
      en: 'Voting',
    },
    voteText: {
      cn: '如需参与投票请先点赞微博。',
      tw: '如需參與投票請先點贊微博。',
      en: 'You have to like the feed first before voting.',
    },
  });

  content.showVoteResult = rule.Rule({
    v7Support: true,
    id: 'show_vote_result',
    version: 46,
    parent: content.content,
    template: () => i18n.showVoteResult,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.showVoteResultDetail },
    },
    ainit() {
      const voteBlock = function () {
        ui.alert({
          id: 'yawf-vote-block',
          icon: 'warn',
          title: i18n.voteTitle,
          text: i18n.voteText,
        });
      };

      util.inject(function (rootKey, voteBlock) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        vueSetup.transformComponentsRenderByTagName('vote-item', function (nodeStruct, Nodes) {
          const { addClass } = Nodes;
          addClass(nodeStruct, this.$style.itemed);
        });
      }, util.inject.rootKey, voteBlock);
    },
  });

  i18n.customizeSource = {
    cn: '自定义来源微博仅显示“来自微博 weibo.com”',
    tw: '自訂來源微博僅顯示「來自微博 weibo.com」',
    en: 'Weibo with customize source show "come from 微博 weibo.com" only',
  };

  content.customizeSource = rule.Rule({
    id: 'feed_no_custom_source',
    version: 1,
    parent: content.content,
    template: () => i18n.customizeSource,
    ainit() {
      const customizeSource = function customizeSource() {
        const sources = Array.from(document.querySelectorAll('.WB_from:not([yawf-custom-source])'));
        const items = [];
        sources.forEach(from => {
          from.setAttribute('yawf-custom-source', 'yawf-custom-source');
          if (from.matches('.list_li[mid] *')) return;
          if (/未通过审核应用/.test(from.textContent)) return;
          // 自定义微博来源可以不显示来源
          if (from.querySelector('[node-type="feed_list_item_date"]:only-child')) {
            items.push(from.appendChild(document.createElement('div')));
            return;
          }
          // 也可以显示自定义的来源
          const item = from.querySelector('a[href*="vip.weibo.com"]');
          if (item) items.push(item);
        });
        items.forEach(from => {
          const container = document.createElement('div');
          container.innerHTML = '<a rel="nofollow" href="//weibo.com/" target="_blank" action-type="app_source" class="S_txt2">微博 weibo.com</a>';
          from.replaceWith(container.firstChild);
        });
      };
      observer.dom.add(customizeSource);
    },
  });

  Object.assign(i18n, {
    viewEditInfo: {
      cn: '点击“已编辑”字样查看编辑历史',
      tw: '點擊「已編輯」字樣查閱編輯歷史',
      en: 'View edit history by clicking "Edited"',
    },
    viewEditInfoDetail: {
      cn: '查看编辑历史的弹框和原版不同，点击微博右上角菜单看到的微博编辑记录仍是原版。点左侧列表可以查看指定的版本，点右侧列表可以和当前显示的版本对比。',
    },
    viewEditInfoEdited: {
      cn: '已编辑',
      tw: '已編輯',
      en: 'Edited',
    },
    viewEditTitle: {
      cn: '微博编辑记录',
      tw: '微博編輯記錄',
      en: 'Edit History',
    },
    selectFeedVersion: {
      cn: '选择版本以查看',
      tw: '选择版本以查阅',
      en: 'Select Version',
    },
    diffFeedVersion: {
      cn: '与选定版本比对',
      tw: '與選定版本比對',
      en: 'Compare With',
    },
    viewEditLoading: {
      cn: '正在加载编辑记录……',
      tw: '正在載入編輯記錄……',
      en: 'Loading edit history...',
    },
  });

  content.viewEditInfo = rule.Rule({
    id: 'view_edit_info',
    version: 44,
    parent: content.content,
    template: () => i18n.viewEditInfo,
    ref: {
      i: { type: 'bubble', icon: 'info', template: () => i18n.viewEditInfoDetail },
    },
    ainit() {
      const timeLocale = layout.details.timezone.isEnabled() ? 'current' : 'cst';
      /**
       * @param {string} sourceStr
       * @param {string} targetStr
       */
      const compare = function (sourceStr, targetStr) {
        const matchReg = /\n|\[.{1,8}\]|#(?=.{1,31}#)[^#\n]*#|http:\S+|[a-zA-Z-]+|\s|\S/ug;
        const source = sourceStr.trim().match(matchReg);
        const target = targetStr.trim().match(matchReg);
        const sl = source.length, tl = target.length;
        /** @type {number[][]} */
        const size = [...Array(sl)].map(_ => Array(tl));
        /** @type {[number, number][][]} */
        const from = [...Array(sl)].map(_ => Array(tl));
        for (let si = 0; si < sl; si++) {
          for (let ti = 0; ti < tl; ti++) {
            if (source[si] === target[ti]) {
              const d = si && ti ? size[si - 1][ti - 1] : 0;
              from[si][ti] = [si - 1, ti - 1];
              size[si][ti] = d + source[si].length;
            } else {
              const sd = si ? size[si - 1][ti] : 0;
              const td = ti ? size[si][ti - 1] : 0;
              if (sd > td) {
                from[si][ti] = [si - 1, ti];
                size[si][ti] = sd;
              } else {
                from[si][ti] = [si, ti - 1];
                size[si][ti] = td;
              }
            }
          }
        }
        /** @type {{ type: 'same'|'delete'|'insert', chars: string }[]} */
        const output = [];
        for (let si = sl - 1, ti = tl - 1; si >= 0 || ti >= 0;) {
          const [fs, ft] = si >= 0 && ti >= 0 ? from[si][ti] : [-1, -1];
          if (fs !== si && ft !== ti) {
            output.push({ type: 'same', chars: source.slice(fs + 1, si + 1) });
          } else if (fs !== si) {
            output.push({ type: 'delete', chars: source.slice(fs + 1, si + 1) });
          } else if (ft !== ti) {
            output.push({ type: 'insert', chars: target.slice(ft + 1, ti + 1) });
          }
          [si, ti] = [fs, ft];
        }
        /** @type {{ type: 'same'|'delete'|'insert', str: string }} */
        let last = { type: 'same', str: '' };
        const connected = [last, ...output.reverse().map(({ type, chars }) => {
          const str = chars.join('');
          if (type === last.type) {
            last.str += str;
            return null;
          }
          last = { type, str };
          return last;
        })].filter(content => content?.str);
        /** @type {{ delete: { type: 'delete', str: string }, insert: { type: 'insert', str: string } }} */
        let prevPart = { delete: null, insert: null, same: null };
        const result = connected.filter(part => {
          const { str, type } = part;
          if (['delete', 'insert'].includes(type)) {
            if (prevPart[type]) {
              prevPart[type].str += str;
              return false;
            } else {
              prevPart[type] = part;
              return true;
            }
          } else {
            if (str.length < 4 && prevPart.delete && prevPart.insert) {
              prevPart.delete.str += str;
              prevPart.insert.str += str;
              return false;
            } else {
              prevPart.delete = prevPart.insert = null;
              return true;
            }
          }
        });
        return result;
      };
      const renderTextDiff = function (container, source, target) {
        const diff = compare(source, target);
        const fragement = document.createDocumentFragment();
        diff.forEach(function ({ type, str }) {
          str.split(/(\n)/g).forEach(part => {
            /** @type {'del'|'ins'|'span'} */
            const tagName = { delete: 'del', insert: 'ins', same: 'span' }[type];
            const span = document.createElement(tagName);
            span.classList.add('yawf-diff-' + type);
            span.textContent = part;
            fragement.appendChild(span);
            if (part === '\n') {
              const breakToken = document.createElement(tagName);
              breakToken.classList.add('yawf-diff-' + type);
              const breakChar = document.createElement('span');
              breakChar.classList.add('S_txt2', 'yawf-diff-line-break');
              breakToken.appendChild(breakChar);
              fragement.insertBefore(breakToken, span);
            }
          });
        });
        container.innerHTML = '';
        container.appendChild(fragement);
      };
      /**
       * @param {HTMLElement} text
       * @param {HTMLElement} source
       * @param {HTMLElement} target
       */
      const renderImageDiff = function (ref, source, target) {
        while (ref.nextSibling) ref.parentNode.removeChild(ref.nextSibling);
        /** @returns {string} */
        const getId = li => li.getAttribute('action-data');
        /** @returns {[HTMLElement, string, HTMLElement[], Set<string>]} */
        const getImages = function (dom) {
          const wrap = dom.querySelector('.WB_media_wrap');
          if (!wrap) return [null, '', [], new Set()];
          const container = wrap.cloneNode(true);
          container.classList.add('S_line1');
          const html = container.innerHTML;
          const items = Array.from(container.querySelectorAll('li'));
          const actionDatas = new Set(items.map(getId));
          return [container, html, items, actionDatas];
        };
        const renderImages = function (images) {
          ref.parentNode.appendChild(images);
        };
        const linkImage = function (container) {
          if (!container) return;
          const imgs = Array.from(container.querySelectorAll('img'));
          imgs.forEach(img => {
            const link = document.createElement('a');
            const src = new URL(img.src).href;
            link.href = ['https://', new URL(src).host, '/large', src.match(/\/([^/]*)$/g)].join('');
            link.target = '_blank';
            link.className = 'yawf-diff-image-link';
            link.appendChild(img.parentNode.replaceChild(link, img));
          });
        };
        const [sourceImg, sourceHtml, sourceItems, sourceActionDatas] = getImages(source);
        const [targetImg, targetHtml, targetItems, targetActionDatas] = getImages(target);
        linkImage(sourceImg);
        linkImage(targetImg);
        // 如果压根没有图片，就什么都不用做
        if (!sourceImg && !targetImg) return;
        // 如果图片没变，那么展示一份就行了
        if (sourceHtml === targetHtml) {
          renderImages(sourceImg);
          return;
        }
        // 标记修改
        const sourceFilteredItems = sourceItems.map(item => {
          if (targetActionDatas.has(getId(item))) return item;
          item.classList.add('yawf-img-delete');
          return null;
        }).filter(item => item);
        const targetFilteredItems = targetItems.map(item => {
          if (sourceActionDatas.has(getId(item))) return item;
          item.classList.add('yawf-img-insert');
          return null;
        }).filter(item => item);
        sourceFilteredItems.forEach((sourceItem, index) => {
          const targetItem = targetFilteredItems[index];
          if (getId(sourceItem) === getId(targetItem)) return;
          sourceItem.classList.add('yawf-img-reorder');
          targetItem.classList.add('yawf-img-reorder');
        });
        // 最后把他们显示出来
        if (sourceImg) renderImages(sourceImg);
        if (targetImg) renderImages(targetImg);
      };
      const renderDiff = function (container, version1, version2) {
        const [source, target] = [version1, version2].sort((v1, v2) => v1.index - v2.index);
        const text = container.querySelector('.WB_text');
        renderTextDiff(text, source.text, target.text);
        renderImageDiff(text, source.dom, target.dom);
      };
      const showContent = function (container, version, diff) {
        container.innerHTML = '';
        container.appendChild(version.dom.cloneNode(true));
        if (!diff || diff === version) return;
        renderDiff(container, version, diff);
      };
      const dialogRender = async function (container, feedHistoryPromise) {
        container.classList.add('yawf-feed-edit-dialog-content');
        container.innerHTML = `<div class="yawf-feed-edit-select S_bg1 S_line1"><div class="yawf-feed-edit-select-title S_line1"></div><ol class="yawf-feed-edit-list yawf-feed-edit-select-list S_line1"></ol></div><div class="yawf-feed-edit-view"><div class="yawf-feed-edit-view-content"><div class="yawf-feed-edit-loading"><div class="WB_empty"><div class="WB_innerwrap"><div class="empty_con clearfix"><p class="icon_bed"><i class="W_icon icon_warnB"></i></p><p class="text"></p></div></div></div></div></div></div><div class="yawf-feed-edit-diff S_bg1 S_line1"><div class="yawf-feed-edit-diff-title S_line1"></div><ol class="yawf-feed-edit-list yawf-feed-edit-diff-list S_line1"></ol></div>`;
        const loadingText = container.querySelector('.yawf-feed-edit-loading .text');
        loadingText.textContent = i18n.viewEditLoading;
        const selectTitle = container.querySelector('.yawf-feed-edit-select-title');
        const diffTitle = container.querySelector('.yawf-feed-edit-diff-title');
        const selectList = container.querySelector('.yawf-feed-edit-select-list');
        const diffList = container.querySelector('.yawf-feed-edit-diff-list');
        const content = container.querySelector('.yawf-feed-edit-view-content');
        selectTitle.textContent = i18n.selectFeedVersion;
        diffTitle.textContent = i18n.diffFeedVersion;
        const versions = await feedHistoryPromise;
        const selectVersions = new WeakMap();
        const diffVersions = new WeakMap();
        let currentVersion = null;
        const highlightVersion = function (version, list) {
          const current = list.querySelector('.current');
          if (current) current.classList.remove('current', 'S_bg2');
          if (version) {
            version.classList.add('current', 'S_bg2');
            version.scrollIntoView({ block: 'nearest' });
          }
        };
        const setSelectVersion = function (version) {
          currentVersion = version;
          highlightVersion(selectVersions.get(version), selectList);
          highlightVersion(diffVersions.get(version), diffList);
          showContent(content, version, null);
        };
        const setDiffVersion = function (version) {
          highlightVersion(diffVersions.get(version), diffList);
          showContent(content, currentVersion, version);
        };
        [
          { timeList: selectList, onClick: setSelectVersion, versionMap: selectVersions },
          { timeList: diffList, onClick: setDiffVersion, versionMap: diffVersions },
        ].forEach(({ timeList, onClick, versionMap }) => {
          versions.forEach(version => {
            const li = document.createElement('li');
            li.classList.add('S_line1');
            li.innerHTML = '<a href="javascript:;" class="S_txt1"></a>';
            const a = li.firstChild;
            a.textContent = util.time.format(version.date, { format: 'month', locale: timeLocale });
            a.addEventListener('click', function (event) {
              if (!event.isTrusted) return;
              onClick(version);
            });
            timeList.appendChild(li);
            versionMap.set(version, li);
          });
        });
        setSelectVersion(versions[0]);
        setDiffVersion(versions[versions.length - 1]);
      };
      const showEditInfo = function (mid) {
        const feedHistoryPromise = request.feedHistory(mid);
        const historyDialog = ui.dialog({
          id: 'yawf-feed-edit',
          title: i18n.viewEditTitle,
          render(container) {
            dialogRender(container, feedHistoryPromise);
          },
        });
        historyDialog.show();
      };
      observer.feed.onAfter(function (feed) {
        const editedList = Array.from(feed.querySelectorAll('.WB_feed_detail .WB_from span[title]'));
        editedList.forEach(edited => {
          const feedNode = feedParser.feedNode(edited);
          const isForward = edited.closest('.WB_feed_expand');
          const mid = feedNode.getAttribute(isForward ? 'omid' : 'mid');
          const button = document.createElement('a');
          button.href = 'javascript:;';
          button.textContent = i18n.viewEditInfoEdited;
          button.classList.add('yawf-edited', 'S_txt2');
          edited.replaceWith(button);
          button.addEventListener('click', function () {
            showEditInfo(mid);
          });
        });
      });

      css.append(`
.yawf-feed-edit-dialog-content { width: 860px; height: 480px; display: flex; }
.yawf-feed-edit-select, .yawf-feed-edit-diff { width: 180px; text-align: center; padding-top: 40px; position: relative;}
.yawf-feed-edit-view { width: 500px; border: 0 solid; }
.yawf-feed-edit-select-list { direction: rtl; }
.yawf-feed-edit-select-title, .yawf-feed-edit-diff-title { font-weight: bold; padding: 10px 0; line-height: 19px; position: absolute; top: 0; width: calc(100% - 1px); border-bottom: 1px solid; }
.yawf-feed-edit-select-title, .yawf-feed-edit-select li { border-right: 1px solid; }
.yawf-feed-edit-diff-title, .yawf-feed-edit-diff li { border-left: 1px solid; }
.yawf-feed-edit-list { height: 100%; overflow: auto; }
.yawf-feed-edit-list::before { content: " "; border-right: 1px solid; border-right-color: inherit; position: absolute; top: 0; bottom: 0; }
.yawf-diff-same .yawf-diff-line-break { display: none; }
.yawf-feed-edit-select-list::before { right: 0; }
.yawf-feed-edit-diff-list::before { left: 0; }
.yawf-feed-edit-list li { line-height: 29px; direction: ltr; border-bottom: 1px solid; position: relative; }
.yawf-feed-edit-list li a { display: block; }
.yawf-feed-edit-list li a:hover, .yawf-feed-edit-list li.current a { font-weight: bold; }
.yawf-feed-edit-select-list li.current { border-right: 0; }
.yawf-feed-edit-diff-list li.current { border-left: 0; }
.yawf-feed-edit-view { overflow: auto; }
.yawf-feed-edit-view .WB_text { white-space: pre-wrap; }
.yawf-feed-edit-view .WB_media_wrap { margin-top: 10px; }
.yawf-diff-insert { text-decoration: underline; background: linear-gradient(to bottom, rgba(0, 255, 0, 0.15) 0, rgba(0, 255, 0, 0.15) calc(94% - 1px), currentColor 94%, currentColor 100%) }
.yawf-diff-delete { text-decoration: line-through; background: linear-gradient(to bottom, rgba(255, 0, 0, 0.15) 0, rgba(255, 0, 0, 0.15) calc(53% - 1px), currentColor 53%, currentColor 59%, rgba(255, 0, 0, 0.15) calc(59% + 1px), rgba(255, 0, 0, 0.15) 100%); }
.yawf-diff-line-break::before { content: "↵"; user-select: none; }
.yawf-img-insert { outline: 3px solid #3c3; }
.yawf-img-delete { outline: 3px dashed #c33; }
.yawf-img-reorder { outline: 3px dotted #36f; }
.yawf-feed-edit-view-content .WB_media_wrap ~ .WB_media_wrap { border-top-width: 1px; border-top-style: solid; padding-top: 10px; }
.yawf-diff-image-link { cursor: zoom-in; }
`);
    },
  });

  Object.assign(i18n, {
    viewArticleInline: {
      cn: '内嵌展示头条文章 {{i}}',
      tw: '內嵌展示頭條文章 {{i}}',
      en: 'Show articles inline {{i}}',
    },
    viewArticleInlineDetail: {
      cn: '付费内容可能无法在内嵌模式中正常查看，需要打开文章页浏览。',
    },
    foldArticle: { cn: '收起', en: 'View Less' },
    viewArticle: { cn: '查看文章', en: 'View Article' },
    feedArticle: { cn: '查看原微博', en: 'View Original Feed' },
    viewArticleSource: { cn: '查看源网址', tw: '查看源網址', en: 'View Source' },
    articleLoading: { cn: '正在加载……', tw: '正在載入……', en: 'Loading ...' },
    articleFail: { cn: '加载失败', tw: '载入失败', en: 'Failed to load article' },
  });

  // 直接在微博内显示头条文章
  content.viewArticleInline = rule.Rule({
    id: 'view_article_inline',
    version: 55,
    parent: content.content,
    template: () => i18n.viewArticleInline,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.viewArticleInlineDetail },
    },
    ainit() {
      // 当 iframe 内容的尺寸发生变化时，我们要将变化反馈给上层
      const resizeSensor = function (target, callback, /** @type {Document} */document, /** @type {Window} */window) {
        const container = document.createElement('div');
        container.innerHTML = '<div class="resize-sensor"><div class="resize-sensor-expand"><div class="resize-sensor-child"></div></div><div class="resize-sensor-shrink"><div class="resize-sensor-child"></div></div></div>';
        /** @type {HTMLDivElement} */
        const sensor = container.firstChild;
        /** @type {HTMLDivElement} */
        const expand = sensor.firstChild;
        /** @type {HTMLDivElement} */
        const shrink = expand.nextSibling;
        target.appendChild(sensor);

        let lastWidth = target.offsetWidth;
        let lastHeight = target.offsetHeight;
        let newWidth, newHeight, dirty;
        const reset = function () {
          expand.scrollTop = 1e8;
          expand.scrollLeft = 1e8;
          shrink.scrollTop = 1e8;
          shrink.scrollLeft = 1e8;
        };
        const onResized = function () {
          if (lastWidth === newWidth && lastHeight === newHeight) return false;
          lastWidth = newWidth;
          lastHeight = newHeight;
          callback();
          reset();
          return true;
        };
        const onScroll = function (event) {
          newWidth = target.offsetWidth;
          newHeight = target.offsetHeight;
          if (dirty) return; dirty = true;
          requestAnimationFrame(function () {
            dirty = false;
            if (onResized()) onScroll();
          });
        };
        reset();
        onScroll();
        expand.addEventListener('scroll', onScroll);
        shrink.addEventListener('scroll', onScroll);
      };

      // 要注入到卡片内的样式
      const injectStyle = `
.WB_editor_iframe_new .WB_feed_v3 { max-width: 100%; }
`;

      // 要注入到文章页的样式
      const contentStyle = `
html { -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%; line-height: 1.5; color: var(--text-color); font-family: var(--font-family); background: transparent; font-size: 16px; line-height: 1.5; word-wrap: break-word; }
body { margin: 0; overflow: hidden; }
* { box-sizing: border-box; }
> *:first-child { margin-top: 0 !important; }
> *:last-child { margin-bottom: 0 !important; }
a { background-color: transparent; color: var(--link-color); text-decoration: underline; }
blockquote { margin: 0 0 10px; padding: 0 1em; background: #80808022; border-left: 0.25em solid #80808044; padding: 20px; }
blockquote > :first-child { margin-top: 0; }
blockquote > :last-child { margin-bottom: 0; }
figure { margin: 0 0 10px; padding: 0 1em; text-align: center; }
figcaption { text-align: center; }
h1, h2, h3, h4, h5, h6 { margin-top: 24px; margin-bottom: 16px; font-weight: 600; line-height: 1.25; }
h1 { margin: 0.67em 0; padding-bottom: 0.3em; font-size: 2em; border-bottom: 1px solid #80808022; }
h2 { padding-bottom: 0.3em; font-size: 1.5em; border-bottom: 1px solid #80808022; }
h3 { font-size: 1.25em; }
h4 { font-size: 1em; }
h5 { font-size: 0.875em; }
h6 { font-size: 0.85em; }
hr { box-sizing: content-box; overflow: hidden; height: 2px; padding: 0; margin: 24px 0; background-color: #80808011; border: 0; }
hr::after { display: table; clear: both; content: ""; }
hr::before { display: table; content: ""; }
img { border-style: none; max-width: 100%; box-sizing: content-box; background-color: var(--background-color); }
li + li { margin-top: 0.25em; }
li > p { margin-top: 16px; }
p { margin-top: 0; margin-bottom: 10px; }
p, blockquote, ul, ol, table { margin-top: 0; margin-bottom: 16px; }
table { border-spacing: 0; border-collapse: collapse; }
table th { font-weight: bold; }
table th, table td { padding: 6px 13px; border: 1px solid #80808044; }
table tr { border-top: 1px solid #ccc; }
table tr:nth-child(2n) { background-color: #80808011; }
td, th { padding: 0; }
ul, ol { padding-left: 2em; margin-top: 0; margin-bottom: 0; }
ul { list-style: outside; }
ul ul ol, ul ol ol, ol ul ol, ol ol ol { list-style-type: lower-alpha; }
ul ul, ul ol, ol ol, ol ul { margin-top: 0; margin-bottom: 0; }
iframe { width: 100%; border: 0 none; max-width: 600px; }
video { max-width: 100%; max-height: 100vh; }

body { position: relative; }
.resize-sensor, .resize-sensor-expand, .resize-sensor-shrink { position: absolute; top: 0; bottom: 0; left: 0; right: 0; overflow: hidden; z-index: -1; visibility: hidden; }
.resize-sensor-expand .resize-sensor-child { width: 100000px; height: 100000px; }
.resize-sensor-shrink .resize-sensor-child { width: 200%; height: 200%; }
.resize-sensor-child { position: absolute; top: 0; left: 0; transition: 0s; }
`;

      // 渲染文章
      const renderArticle = function (article, style, inForward) {
        const container = document.createElement('div');
        container.innerHTML = `
<div class="WB_expand_media_box clearfix">
<div class="WB_expand_media">
<div class="yawf-article S_bg2 S_line1">
<div class="tab_feed_a clearfix yawf-article-handle S_bg2"><div class="tab"><ul class="clearfix">
<li><span class="line S_line1"><a class="S_txt1 yawf-article-fold" href="javascript:;"><i class="W_ficon ficon_arrow_fold S_ficon">k</i></a></span></li>
<li><span class="line S_line1"><a class="S_txt1 yawf-article-view" href="" target="_blank"><i class="W_ficon ficon_search S_ficon">°</i></a></span></li>
<li><span class="line S_line1"><a class="S_txt1 yawf-article-feed" href="" target="_blank"><i class="W_ficon ficon_search S_ficon">\ue604</i></a></span></li>
<li><span class="line S_line1"><a class="S_txt1 yawf-article-source" href="" target="_blank" rel="no-referrer"><i class="W_ficon ficon_search S_ficon">l</i></a></span></li>
</ul></div></div>
<div class="yawf-article-body">
<div class="yawf-article-title"></div>
<div class="yawf-article-meta">
<span class="yawf-article-author"><a target="_blank"><img class="W_face_radius" /></a></span>
<span class="yawf-article-author-inner"></span>
<span class="yawf-article-time"></span>
</div>
<div class="yawf-article-lead"></div>
<div class="yawf-article-cover"><img /></div>
<div class="yawf-article-loading"><i class="W_loading"></i> </div>
<div class="yawf-article-content"><iframe title="" style="visibility: hidden; height: 1px;" sandbox="allow-popups allow-popups-to-escape-sandbox allow-same-origin"></iframe></div>
</div>
</div>
</div>
</div>
`;
        if (!article.content) {
          const body = container.querySelector('.yawf-article-body');
          body.textContent = i18n.articleFail;
          return container;
        }
        // 标题
        const title = container.querySelector('.yawf-article-title');
        title.textContent = article.title ?? '';
        // 作者
        const author = container.querySelector('.yawf-article-author');
        if (article.author) {
          author.querySelector('img').src = article.author.avatar;
          const link = author.querySelector('a');
          link.appendChild(document.createTextNode(article.author.name));
          link.href = `https://weibo.com/u/${article.author.uid}`;
          link.setAttribute('usercard', `id=${article.author.uid}`);
        } else author.remove();
        const authorInner = container.querySelector('.yawf-article-author-inner');
        if (article.author?.inner) {
          const inner = article.author.inner;
          if (inner.uid) {
            const link = document.createElement('a');
            link.textContent = inner.name;
            link.href = `https://weibo.com/u/${inner.uid}`;
            link.setAttribute('usercard', `id=${inner.uid}`);
            authorInner.appendChild(link);
          } else {
            authorInner.appendChild(document.createTextNode(inner.name));
          }
        } else authorInner.remove();
        // 日期
        const time = container.querySelector('.yawf-article-time');
        if (article.time) {
          time.textContent = article.time.replace(/\d\d-\d\d \d\d:\d\d/, str => {
            const year = new Date(Date.now() + 288e5).getUTCFullYear();
            const date = new Date(Date.UTC(year, ...str.split(/[- :]/).map((x, i) => i ? +x : x - 1)) - 288e5);
            return [
              ((date.getMonth() + 1) + '').padStart(2, 0), '-', (date.getDate() + '').padStart(2, 0), ' ',
              (date.getHours() + '').padStart(2, 0), ':', (date.getMinutes() + '').padStart(2, 0),
            ].join('');
          });
        } else time.remove();
        // 导语
        const lead = container.querySelector('.yawf-article-lead');
        if (article.lead) lead.textContent = article.lead;
        else lead.remove();
        // 封面图
        const cover = container.querySelector('.yawf-article-cover');
        if (article.cover) cover.firstChild.src = article.cover;
        else cover.remove();
        // 正在加载
        const loading = container.querySelector('.yawf-article-loading');
        loading.appendChild(document.createTextNode(i18n.articleLoading));
        // 内容
        /** @type {HTMLIFrameElement} */
        const iframe = container.querySelector('.yawf-article-content iframe');
        const html = `<!doctype html><html><head><meta charset="utf-8" /><meta name="referrer" content="no-referrer" /><title></title><style>${style}</style><style>${contentStyle}</style></head><body class="yawf-article-page">${article.content}</body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        iframe.src = url;
        iframe.addEventListener('load', function () {
          URL.revokeObjectURL(url);
          loading.remove();
          const document = iframe.contentDocument;
          const window = iframe.contentWindow;
          const resizeIframe = function () {
            iframe.style.height = document.body.clientHeight + 'px';
          };
          // 处理内容中的卡片
          Array.from(document.querySelectorAll('x-iframe')).forEach(async xiframe => {
            const oriUrl = xiframe.getAttribute('src');
            const html = await request.getArticleCard(oriUrl);
            const iframe = document.createElement('iframe');
            const blob = new Blob([html], { type: 'text/html' });
            const id = new URL(oriUrl).searchParams.get('id');
            const url = URL.createObjectURL(blob);
            iframe.src = url;
            iframe.dataset.cardId = id;
            iframe.addEventListener('load', () => {
              URL.revokeObjectURL(url);
              const document = iframe.contentDocument;
              const window = iframe.contentWindow;
              const style = document.body.appendChild(document.createElement('style'));
              style.textContent = injectStyle;
              const updateOuterSize = function () {
                iframe.style.height = document.body.clientHeight + 'px';
              };
              resizeSensor(document.body, updateOuterSize, document, window);
              setTimeout(updateOuterSize, 0);
            });
            xiframe.parentElement.replaceChild(iframe, xiframe);
          });
          resizeSensor(document.body, resizeIframe, document, window);
          setTimeout(function () {
            resizeIframe();
            iframe.style.visibility = 'visible';
          }, 0);
          // 添加自定义样式
          const userCss = layout.userCss.css;
          if (userCss.isEnabled()) {
            const style = document.createElement('style');
            style.textContent = userCss.ref.css.getConfig();
            document.body.appendChild(style);
          }
        });
        iframe.addEventListener('error', function () {
          loading.textContent = i18n.articleFail;
          iframe.remove();
        });
        return container;
      };

      // 隐藏图片或文章卡片
      const hideMedia = function (feed) {
        const mediaList = Array.from(feed.querySelectorAll('.WB_media_wrap, .WB_expand_media_box'));
        const rollback = [...mediaList].map(media => {
          if (!(media.clientHeight > 0)) return null;
          const display = window.getComputedStyle(media).display;
          media.style.display = 'none';
          return () => { media.style.display = display; };
        }).filter(x => x);
        return function () { rollback.forEach(f => f()); };
      };

      // 让文章内容适配周围的配色
      const computeStyle = function (reference) {
        const text = document.createElement('div');
        text.style = 'position: fixed; top: -1000px;';
        text.innerHTML = '<div class="WB_text W_f14">T<a>a</a><span class="S_bg2">B</span></div>';
        reference.appendChild(text);
        const link = getComputedStyle(text.querySelector('a'));
        const bg2 = getComputedStyle(text.querySelector('.S_bg2'));
        const selection = (function () {
          try {
            return getComputedStyle(text, '::selection');
          } catch (e) {
            try {
              return getComputedStyle(text, '::-moz-selection');
            } catch (e2) {
              return null;
            }
          }
        }());
        const css = `
:root {
--text-color: ${bg2.color};
--background-color: ${bg2.backgroundColor};
--link-color: ${link.color};

--font-family: ${bg2.fontFamily};
}

${selection ? `
::selection { background-color: ${selection.backgroundColor}; color: ${selection.color}; }
::-moz-selection { background-color: ${selection.backgroundColor}; color: ${selection.color}; }
` : ''}
`;
        text.remove();
        return css;
      };

      const renderArticleControls = function (article, articleData, { id, feed, text, showMedia }) {
        const fold = article.querySelector('.yawf-article-fold');
        fold.addEventListener('click', function () {
          article.remove();
          showMedia();
          feed.removeAttribute('yawf-article-shown');
          feed.scrollIntoView({ block: 'nearest' });
        });
        fold.appendChild(document.createTextNode(i18n.foldArticle));

        const view = article.querySelector('.yawf-article-view');
        view.href = `https://weibo.com/ttarticle/p/show?id=${id}`;
        view.appendChild(document.createTextNode(i18n.viewArticle));

        const oriFeed = article.querySelector('.yawf-article-feed');
        if (articleData.feed && new URL(articleData.feed).pathname !== location.pathname) {
          oriFeed.href = articleData.feed;
          oriFeed.appendChild(document.createTextNode(i18n.feedArticle));
        } else oriFeed.closest('li').remove();

        const source = article.querySelector('.yawf-article-source');
        if (articleData.source) source.href = articleData.source;
        else source.closest('li').remove();
        source.appendChild(document.createTextNode(i18n.viewArticleSource));
      };

      // 点击文章链接时触发
      document.addEventListener('click', async function (event) {
        if (event.shiftKey || event.ctrlKey || event.metaKey) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        const feed = target.closest('[mid]');
        if (!feed) return;
        const link = target.closest('[suda-uatrack*="1022-article"]');
        if (!link) return;
        const id = link.getAttribute('suda-uatrack').replace(/^.*1022%3A(\d+):.*$/, '$1');
        if (!id) return;
        const text = Array.from((/** @returns {Element} */function findText(target) {
          return target ? target.querySelector('.WB_text') ? target : findText(target.parentElement) : null;
        }(target)).querySelectorAll('.WB_text')).pop();
        if (!text) return;
        event.preventDefault();
        event.stopPropagation();
        if (feed.hasAttribute('yawf-article-shown')) return;

        const loading = document.createElement('div');
        loading.className = 'yawf-article-loading';
        loading.innerHTML = '<i class="W_loading"></i> ';
        loading.appendChild(document.createTextNode(i18n.articleLoading));
        feed.setAttribute('yawf-article-shown', '');
        text.parentElement.insertBefore(loading, text.nextSibling);

        const showMedia = hideMedia(feed);
        const articleData = await request.getArticle(id);
        const article = renderArticle(articleData, computeStyle(text), text.matches('.WB_expand *'));
        renderArticleControls(article, articleData, { id, feed, text, showMedia });

        loading.parentElement.replaceChild(article, loading);
      }, true);

      css.append(`
.yawf-article-loading { padding: 10px; text-align: center; }
.yawf-article-handle { position: sticky; top: 50px; padding: 10px 0; z-index: 1; font-size: 12px; line-height: 15px; }
.yawf-article { border-width: 1px; border-style: solid; padding: 10px; position: relative; font-size: 16px; line-height: 1.5; }
.yawf-article-title { margin: 10px 0; font-weight: bold; font-size: 130%; }
.yawf-article-meta { margin: 10px -10px; display: flex; }
.yawf-article-meta > span { padding: 0 10px; }
.yawf-article-meta > span:not(:first-child) { border-left: 1px solid #80808022; }
.yawf-article-author img { width: 20px; height: 20px; vertical-align: middle; margin: 0.2em; }
.yawf-article-lead { background: #80808022; padding: 20px; }
.yawf-article-cover { text-align: center; line-height: 0; }
.yawf-article-cover img { max-width: 100%; margin: 10px 0; vertical-align: top; }
.yawf-article-content iframe { border: 0 none; width: 100%; margin: 10px 0; }
`);
      if (layout.navbar.autoHide.isEnabled()) {
        css.append('.yawf-article-handle { top: 0; }');
      }
    },

  });

  Object.assign(i18n, {
    linkWithFace: {
      cn: '识别微博中包含表情符号的网址（实验性）{{i}}||{{clean}} 删除表情|{{link}} 创建链接',
      tw: '辨識微博中包含表情符號的（實驗性）{{i}}||{{clean}} 刪除表情|{{link}} 創建連結',
      en: 'Recognize urls with faces in feeds (experimental) {{i}}||{{clean}} Remove faces|{{link}} Generate link',
    },
    linkWithFaceDetail: {
      cn: '创建的链接可以指向任何第三方网站，请在点击前自行确认安全性。选中并复制时如果复制内容为微博中的网址，脚本会将复制的内容清理为链接本身。表情仅支持微博自带表情，不支持 emoji 表情。',
    },
  });

  content.linkWithFace = rule.Rule({
    id: 'link_with_face',
    version: 66,
    parent: content.content,
    template: () => i18n.linkWithFace,
    ref: {
      clean: { type: 'boolean' },
      link: { type: 'boolean' },
      i: { type: 'bubble', icon: 'warn', template: () => i18n.linkWithFaceDetail },
    },
    ainit() {
      const urlRegexGen = () => new RegExp([
        // 协议
        'https?://',
        // 不是 t.cn 的短链接
        '(?!t.cn(?:/|$))',
        // 主机名或 IP
        '(?:(?![.-])(?:(?![.-][./:-])[a-zA-Z0-9.-])*|\\d+\\.\\d+\\.\\d+\\.\\d+)',
        // 端口
        '(?::\\d+)?',
        // 路径，查询串，本地部分
        '(?:/(?:[a-zA-Z0-9$\\-_.+!*\'(),/;:@&=?#]|%[a-fA-F0-9]{2})*)?',
      ].join(''), 'g');
      const clean = this.ref.clean.getConfig();
      const link = this.ref.clean.getConfig();

      observer.feed.onAfter(function (feed) {
        /** @type {Element[]} */
        const contentElements = [
          feedParser.content.dom(feed, false, false),
          feedParser.content.dom(feed, false, true),
          feedParser.content.dom(feed, true, false),
          feedParser.content.dom(feed, true, true),
        ].filter(element => element instanceof Element);

        contentElements.forEach(element => {
          const unfold = element.querySelector('[action-type="fl_unfold"]');
          const nodes = [...element.childNodes];
          let text = '';
          /** @type {[number, number, Node][]} */
          const nodeData = nodes.map(node => {
            const pos = text.length;
            if (node.nodeType === Node.TEXT_NODE) {
              text += node.textContent;
              return [pos, node.textContent.length, node];
            } else if (node.nodeType === Node.ELEMENT_NODE) {
              if (node.matches('img.W_img_face')) {
                return [pos, 0, node];
              } else {
                text += '\n';
                return [pos, 1, node];
              }
            } else {
              return [pos, 0, node];
            }
          });
          let match;
          const urlRegex = urlRegexGen();
          while ((match = urlRegex.exec(text)) !== null) {
            let url;
            try { url = new URL(match[0]); } catch (e) { continue; }
            const index = match.index, lastIndex = match.index + match[0].length;
            // 如果有展开全文按钮，而且链接匹配到了最后面，那么可能链接不完整，此时不识别
            if (unfold && lastIndex >= text.replace(/[\s.\u200b]*$/, '').length) continue;
            const start = nodeData.findIndex(([pos, len]) => pos <= index && pos + len > index);
            const end = nodeData.findIndex(([pos, len]) => pos < lastIndex && pos + len >= lastIndex);
            if (start === -1 || end === -1 || start === end) continue;
            const [startNodePos, _startNodeLength, startNode] = nodeData[start];
            const [endNodePos, _endNodeLength, endNode] = nodeData[end];
            if (!(startNode instanceof Text)) continue;
            if (!(endNode instanceof Text)) continue;
            const container = document.createDocumentFragment();
            let wrap = container;
            if (link) {
              wrap = container.appendChild(document.createElement('a'));
              wrap.href = url;
              wrap.setAttribute('rel', 'nofollow noopener');
              wrap.setAttribute('target', '_blank');
              wrap.className = 'yawf-face-link';
            }
            wrap.appendChild(document.createTextNode(startNode.textContent.slice(index - startNodePos)));
            startNode.textContent = startNode.textContent.slice(0, index - startNodePos);
            for (let i = start + 1; i < end; i++) {
              const node = nodes[i];
              if (node.nodeType !== Node.TEXT_NODE && clean) {
                node.parentNode.removeChild(node);
              } else {
                wrap.appendChild(nodes[i]);
              }
            }
            wrap.appendChild(document.createTextNode(endNode.textContent.slice(0, lastIndex - endNodePos)));
            endNode.textContent = endNode.textContent.slice(lastIndex - endNodePos);
            wrap.normalize();
            endNode.parentNode.insertBefore(wrap, endNode);
          }
        });
      });

      window.addEventListener('copy', event => {
        const selection = document.getSelection();
        if (selection.rangeCount !== 1) return;
        const range = selection.getRangeAt(0);
        const container = range.commonAncestorContainer;
        if (!(container instanceof Element)) return;
        if (!container.matches('.WB_text')) return;
        const contents = range.cloneContents();
        const text = [...contents.childNodes].map(node => {
          if (node.nodeType === Node.TEXT_NODE) {
            return node.textContent;
          } else if (node.nodeType === Node.ELEMENT_NODE && node.nodeName === 'IMG') {
            return '';
          } else {
            return '\n';
          }
        }).join('').trim();
        const urlRegex = urlRegexGen();
        if (!urlRegex.test(text)) return;
        event.clipboardData.setData('text/plain', text);
        event.preventDefault();
      });

    },
  });

  Object.assign(i18n, {
    shortLinkWithoutConfirm: {
      cn: '打开短链接时无需二次确认（全局设置） {{i}}',
      tw: '打開簡短的連接時無需二次確認（全局設定） {{i}}',
      en: 'Open short URL without another confirmation (Global Option) {{i}}',
    },
    shortLinkWithoutConfirmDetail: {
      cn: '打开短链接时无需二次手动确认。由于短链接网页无法获取登录状态，此设置项无论登录任意用户均会生效',
    },
  });

  content.shortLinkWithoutConfirm = rule.Rule({
    id: 'short_url_wo_confirm',
    version: 73,
    get configPool() { return config.global; },
    parent: content.content,
    template: () => i18n.shortLinkWithoutConfirm,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.shortLinkWithoutConfirmDetail },
    },
    // 真正的执行逻辑在单独的文件里
    // 这段是处理一下奇怪的追踪代码导致链接根本打不开的问题
    // 建议如果真的想加追踪代码，在 mouseup 时改 href，而不是在 click 的时候 window.open
    init() {
      document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof Element)) return;
        if (!target.matches('[action-type="feed_list_url"]')) return;
        event.stopPropagation();
      }, true);
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/feeds/media.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const request = yawf.request;
  const download = yawf.download;
  const contextmenu = yawf.contextmenu;
  const imageViewer = yawf.imageViewer;

  const feeds = yawf.rules.feeds;

  const i18n = util.i18n;
  const css = util.css;
  const urls = util.urls;
  const crc = util.crc;

  const media = feeds.media = {};

  i18n.feedMediaGroupTitle = {
    cn: '图片与视频',
    tw: '圖片與視頻',
    en: 'Images &amp; Videos',
  };

  media.media = rule.Group({
    parent: feeds.feeds,
    template: () => i18n.feedMediaGroupTitle,
  });

  Object.assign(i18n, {
    viewOriginal: env.config.contextMenuSupported ? {
      cn: '查看图片添加“查看原图”链接|打开{{open}}||{{direct}}点击缩略图时直接查看原图||{{contextmenu}}添加到右键菜单',
      tw: '查看圖片添加「查看原圖」連結|打開{{open}}||{{direct}}點擊縮圖時直接查看原圖||{{contextmenu}}添加到操作功能表',
      en: 'add "Original Picture" link for images | which targeted to {{open}} || {{direct}} View original pictures by clicking on thumbnail || {{contexmenu}} Add to context menu',
    } : {
      cn: '查看图片添加“查看原图”链接|打开{{open}}||{{direct}}点击缩略图时直接查看原图',
      tw: '查看圖片添加「查看原圖」連結|打開{{open}}||{{direct}}點擊縮圖時直接查看原圖',
      en: 'add "Original Picture" link for images | which targeted to {{open}} || {{direct}} View original pictures by clicking on thumbnail',
    },
    viewOriginalPage: { cn: '包含原图的网页', tw: '包含原圖的網頁', en: 'page with original picture' },
    viewOriginalImage: { cn: '原图', tw: '原圖', en: 'original picture' },
    viewOriginalText: { cn: '查看原图', tw: '查看原圖', en: 'Original Picture' },
  });

  const getImageUrl = function (img, large) {
    const src = img.getAttribute('yawf-ori-src') || img.getAttribute('ori-src') || img.src;
    if (!large) return src;
    const url = ['https://', new URL(src).host, '/large', src.match(/\/([^/]*)$/g)].join('');
    return url;
  };

  const getUrlByPid = function (pid, size = 'large') {
    if ('wy'.includes(pid[9])) {
      const index = (crc.crc32(pid) & 3) + 1;
      const extension = pid[21] === 'g' ? 'gif' : 'jpg';
      if (pid[9] === 'w') {
        return new URL(`//ww${index}.sinaimg.cn/${size}/${pid}.${extension}`, location);
      } else {
        return new URL(`//wx${index}.sinaimg.cn/${size}/${pid}.${extension}`, location);
      }
    } else {
      return new URL(`//ss1.sinaimg.cn/${size}/${pid}&690`, location);
    }
  };

  const getImagesInfo = function (ref) {
    let container, imgs, img;
    if (ref.matches('.WB_detail .WB_expand_media *')) {
      // 已经展开详情的图片
      container = ref.closest('.WB_detail');
      imgs = Array.from(container.querySelectorAll('.WB_media_wrap .WB_pic img'));
      img = container.querySelector('.media_show_box img') ||
        container.querySelector('.current img');
      if (ref.matches('[action-type="widget_photoview"]')) {
        img = document.createElement('img');
        img.src = getUrlByPid(new URLSearchParams(ref.getAttribute('action-data')).get('pid'));
      }
      // fallthrough
    } else if (ref.matches('.WB_expand_media .tab_feed_a *')) {
      // 已经展开详情的评论配图
      container = ref.closest('.WB_expand_media');
      img = container.querySelector('.artwork_box img');
      imgs = [img];
      // fallthrough
    } else if (ref.matches('.WB_media_wrap .WB_pic')) {
      // 没有展开详情的图片
      container = ref.closest('.WB_media_wrap');
      imgs = Array.from(container.querySelectorAll('.WB_pic img'));
      img = ref.querySelector('img');
      // fallthrough
    } else if (ref.getAttribute('imagecard')) {
      const pid = new URLSearchParams(ref.getAttribute('imagecard')).get('pid');
      return { images: [getUrlByPid(pid).href], current: 1 };
    } else if (ref.href?.indexOf('javascript:') === -1) {
      return { images: [ref.href], current: 1 };
    } else if (ref instanceof HTMLImageElement && ref.src) {
      return { images: [getImageUrl(ref, true)], current: 1 };
    } else return null;
    const images = imgs.map(img => getImageUrl(img, true));
    const pid = img && getImageUrl(img).match(/[^/.]*(?=(?:\.[^/.]*)?$)/)[0];
    const current = images.findIndex(image => image.includes(pid)) + 1;
    return { images, current };
  };

  media.viewOriginal = rule.Rule({
    id: 'feed_view_original',
    version: 1,
    parent: media.media,
    template: () => i18n.viewOriginal,
    ref: {
      open: {
        type: 'select',
        initial: 'page',
        select: [
          { value: 'page', text: () => i18n.viewOriginalPage },
          { value: 'image', text: () => i18n.viewOriginalImage },
        ],
      },
      direct: { type: 'boolean' },
      contextmenu: { type: 'boolean', initial: true },
    },
    init() {
      this.ref.direct.addConfigListener(newValue => {
        if (newValue) media.downloadImage.ref.direct.setConfig(false);
      });

      const viewEnabled = this.isEnabled();
      const viewType = this.ref.open.getConfig();
      const directView = viewEnabled && this.ref.direct.getConfig();
      const contextMenuView = viewEnabled && this.ref.contextmenu.getConfig();

      const downloadImage = media.downloadImage;
      const downloadEnabled = downloadImage.isEnabled();
      const downloadName = downloadImage.ref.name.getConfig();
      const directDownload = downloadEnabled && downloadImage.ref.direct.getConfig();
      const contextMenuDownload = downloadEnabled && downloadImage.ref.contextmenu.getConfig();

      if (!viewEnabled && !downloadEnabled) return;

      // 查看原图
      const showOriginalPage = function ({ images, current }) {
        if (viewType !== 'image') {
          imageViewer.open({ images, current });
        } else {
          window.open(images[current - 1]);
        }
      };

      // 添加一个查看原图的按钮（在查看大图旁边）
      const viewOriginalButton = viewLargeLink => {
        const viewOriginalLinkContainer = document.createElement('ul');
        viewOriginalLinkContainer.innerHTML = '<li><span class="line S_line1"><a class="S_txt1" href="javascript:;" target="_blank"><i class="W_ficon ficon_search S_ficon">l</i></a></span></li>';
        viewOriginalLinkContainer.querySelector('i').after(i18n.viewOriginalText);
        const viewOriginalLink = viewOriginalLinkContainer.querySelector('a');
        let images, current;
        const update = function () {
          ({ images, current } = getImagesInfo(viewLargeLink));
          viewOriginalLink.href = images[current - 1];
        };
        viewOriginalLink.addEventListener('click', event => {
          if (viewOriginalLink.classList.contains('S_ficon_dis')) {
            event.preventDefault();
            return;
          }
          if (viewType === 'page') {
            showOriginalPage({ images, current });
            event.preventDefault();
          }
        });
        (new MutationObserver(update)).observe(viewLargeLink, { attributes: true });
        update();
        return viewOriginalLinkContainer.firstChild;
      };

      // 下载图片
      const downloadImages = function (images, ref) {
        const files = images.map((url, index) => {
          const oriFilename = url.slice(url.lastIndexOf('/') + 1);
          let filename = oriFilename;
          if (downloadName !== 'original') {
            const extension = oriFilename.slice(oriFilename.lastIndexOf('.') + 1);
            filename = (index + 1) + '.' + extension;
          }
          const feed = ref.closest('[mid], [omid], [comment_id]');
          const feedId = feed.getAttribute('comment_id') ??
            (ref.closest('.WB_feed_expand') && feed.getAttribute('omid')) ??
            feed.getAttribute('mid') ?? 0;
          const path = 'weibo-images/' + download.filename(feedId) + '/' + filename;
          return { url, filename: path, referrer: 'https://weibo.com/' };
        });
        files.forEach(file => {
          util.debug('download fetch url %s', file.url);
        });
        download.urls(files);
      };

      // 添加一个下载图片的按钮（在查看大图旁边）
      const downloadButton = viewLargeLink => {
        const downloadLinkContainer = document.createElement('ul');
        downloadLinkContainer.innerHTML = '<li><span class="line S_line1"><a class="S_txt1" href="javascript:;" target="_blank"><i class="W_ficon ficon_search S_ficon">|</i></a></span></li>';
        downloadLinkContainer.querySelector('i').after(i18n.downloadImageText);
        const downloadLink = downloadLinkContainer.querySelector('a');
        downloadLink.addEventListener('click', event => {
          if (!downloadLink.classList.contains('S_ficon_dis')) {
            const { images } = getImagesInfo(viewLargeLink);
            downloadImages(images, downloadLink);
          }
          event.preventDefault();
        });
        return downloadLinkContainer.firstChild;
      };

      // 使按钮不可用
      const disableButton = button => {
        const link = button.querySelector('a');
        link.className = 'S_ficon_dis';
        const icon = link.querySelector('i');
        icon.classList.add('S_ficon_dis');
      };

      // 检查展开的图片，添加查看原图和下载的链接
      const addImageHandlerLink = function addImageHandlerLink() {
        const viewLargeLinks = Array.from(document.querySelectorAll([
          // 微博配图
          '.WB_feed li a[action-type="widget_photoview"]:not([yawf-view-ori])',
          // 评论配图
          '.WB_feed li a[action-type="widget_commentPhotoView"]:not([yawf-view-ori])',
        ].join(',')));
        viewLargeLinks.forEach(viewLargeLink => {
          viewLargeLink.setAttribute('yawf-view-ori', '');
          const disabled = viewLargeLink.classList.contains('S_ficon_dis');
          const li = viewLargeLink.closest('li');
          if (downloadEnabled) {
            const button = downloadButton(viewLargeLink);
            if (disabled) disableButton(button);
            li.after(button);
          }
          if (viewEnabled) {
            const button = viewOriginalButton(viewLargeLink);
            if (disabled) disableButton(button);
            li.after(button);
          }
        });
      };
      observer.dom.add(addImageHandlerLink);

      // 让鼠标浮上显示图片卡片的链接指向图片
      const imageCardAsLink = function () {
        const imagecards = document.querySelectorAll('a[imagecard]:not([yawf-imagecard-link])');
        if (!imagecards.length) return;
        imagecards.forEach(imagecard => {
          imagecard.setAttribute('yawf-imagecard-link', 'yawf-imagecard-link');
          const pid = new URLSearchParams(imagecard.getAttribute('imagecard')).get('pid');
          const url = getUrlByPid(pid);
          imagecard.href = url;
          imagecard.target = '_blank';
          imagecard.addEventListener('click', event => {
            event.preventDefault();
          });
        });
      };
      observer.dom.add(imageCardAsLink);

      // 处理点击时直接查看原图/下载的情况
      document.addEventListener('click', function (event) {
        const target = event.target;
        if (event.button !== 0) return; // 只响应左键操作
        if (target.closest('.yawf-W_icon_tag_9p')) return; // 展开过多被折叠的图片按钮不响应
        const pic = target.closest('.WB_media_wrap .WB_pic') ?? target.closest('a[imagecard]');
        if (!pic) return;
        const active = (function () {
          const shift = event.shiftKey;
          const ctrl = /mac/i.test(navigator.platform) ? event.metaKey : event.ctrlKey;
          if (shift) return null;
          if (!directView && viewEnabled && ctrl) return 'view';
          if (!directDownload && downloadEnabled && ctrl) return 'download';
          if (directView) return 'view';
          if (directDownload) return 'download';
          return null;
        }());
        if (!active) return;
        event.stopPropagation();
        event.preventDefault();
        const { images, current } = getImagesInfo(pic);
        const isView = directView || !directDownload && viewEnabled;
        if (isView) showOriginalPage({ images, current });
        else downloadImages(images, target);
      }, true);

      // 添加右键菜单支持
      if (env.config.contextMenuSupported && (contextMenuView || contextMenuDownload)) {
        contextmenu.addListener(function (/** @type {MouseEvent} */event) {
          /** @type {Element & EventTarget} */
          const target = event.target;
          const pic = (function () {
            const pic = target.closest('.WB_media_wrap .WB_pic') ?? target.closest('a[imagecard]');
            if (pic) return pic;
            const feed = target.closest('.WB_feed_type');
            if (!feed) return null;
            const feedPic = feed.querySelector('.WB_media_wrap .WB_pic');
            return feedPic;
          }());
          if (!pic || !pic.contains(target)) return [];
          const { images, current } = getImagesInfo(pic);
          const result = [];
          if (contextMenuView) {
            result.push({
              title: i18n.viewOriginalText,
              onclick: () => { showOriginalPage({ images, current }); },
            });
          }
          if (contextMenuDownload) {
            result.push({
              title: i18n.downloadImageText,
              onclick: () => { downloadImages({ images, current }); },
            });
          }
          return result;
        });
      }
    },
  });

  Object.assign(i18n, {
    downloadImage: env.config.contextMenuSupported ? {
      cn: '查看图片添加“批量下载”链接|使用{{name}}文件名保存||{{direct}}点击缩略图时直接开始下载||{{contextmenu}}添加到右键菜单',
      tw: '查看圖片添加「批次下載」連結|使用{{name}}檔名儲存||{{direct}}點擊縮圖時直接開始下載||{{contextmenu}}添加到操作功能表',
      en: 'Add "Batch Download" link for images {{name}}|Use {{name}} filenames || {{direct}} Trigger download by clicking on thumbnail||{{contextmenu}} Add to context menu',
    } : {
      cn: '查看图片添加“批量下载”链接|使用{{name}}文件名保存||{{direct}}点击缩略图时直接开始下载',
      tw: '查看圖片添加「批次下載」連結|使用{{name}}檔名儲存||{{direct}}點擊縮圖時直接開始下載表',
      en: 'Add "Batch Download" link for images {{name}}|Use {{name}} filenames || {{direct}} Trigger download by clicking on thumbnail',
    },
    downloadImageNameOriginal: {
      cn: '原始',
      en: 'original',
    },
    downloadImageNameIndex: {
      cn: '序号',
      tw: '序號',
      en: 'index',
    },
    downloadImageText: {
      cn: '批量下载',
      tw: '批次下載',
      en: 'Batch Download',
    },
  });

  media.downloadImage = rule.Rule({
    id: 'feed_download_image',
    version: 1,
    parent: media.media,
    template: () => i18n.downloadImage,
    ref: {
      name: {
        type: 'select',
        select: [
          { value: 'index', text: () => i18n.downloadImageNameIndex },
          { value: 'original', text: () => i18n.downloadImageNameOriginal },
        ],
      },
      direct: { type: 'boolean' },
      contextmenu: { type: 'boolean', initial: true },
    },
    init() {
      this.ref.direct.addConfigListener(newValue => {
        if (newValue) media.viewOriginal.ref.direct.setConfig(false);
      });
      // 实现在查看原图功能那里
    },
  });

  Object.assign(i18n, {
    imagePreviewMore: { cn: '支持超过 9 张配图的微博{{i}}||预览{{count}}||有图片未显示时{{more}}', tw: '支援超過 9 張配圖的微博顯示{{i}}||預覽{{count}}||有圖片未顯示時{{more}}', en: 'Support feeds with more than 9 images {{i}} || preview {{count}}||with {{more}}' },
    imagePreviewMoreDetail: { cn: '需要打开这个功能，以帮助查看原图、批量下载等功能支持超过 9 张图片的微博。' },
    imagePreviewFirst3x2: { cn: '前 6 张（每行 3 张）', tw: '前 6 張（每列 3 張）', en: 'first 6 (3 each row)' },
    imagePreviewFirst4x2: { cn: '前 8 张（每行 4 张）', tw: '前 8 張（每列 4 張）', en: 'first 8 (4 each row)' },
    imagePreviewFirst3x3: { cn: '前 9 张（每行 3 张）', tw: '前 9 張（每列 3 張）', en: 'first 9 (3 each row)' },
    imagePreviewFirst4x3: { cn: '前 12 张（每行 4 张）', tw: '前 12 張（每列 4 張）', en: 'first 12 (4 each row)' },
    imagePreviewAll3: { cn: '全部图片（每行 3 张）', tw: '全部圖片（每列 3 張）', en: 'all (3 each row)' },
    imagePreviewAll4: { cn: '全部图片（每行 4 张）', tw: '全部圖片（每列 4 張）', en: 'all (4 each row)' },
    imagePreviewUseText: { cn: '在图片后显示展开收起按钮', tw: '在圖片後顯示展開收起按鈕', en: 'show / hide button after images' },
    imagePreviewUseMask: { cn: '最后一张预览显示剩余图片数量', tw: '最後一張預覽顯示剩餘圖片數量', en: 'number of remaining on last image' },
    animatedImage: { cn: '动图' },
    previewAllShow: { cn: '查看全部图片（共 {1} 张）', tw: '閱覽全部圖片（共 {1} 張）', en: 'View all ({1} images)' },
    previewAllFold: { cn: '收起图片', tw: '收起圖片', en: 'Fold images' },
  });

  media.imagePreviewAll = rule.Rule({
    v7Support: true,
    id: 'image_preview_all',
    version: 50,
    parent: media.media,
    template: () => i18n.imagePreviewMore,
    ref: {
      count: {
        type: 'select',
        initial: '3x3',
        select: [
          { value: '3x2', text: () => i18n.imagePreviewFirst3x2 },
          { value: '4x2', text: () => i18n.imagePreviewFirst4x2 },
          { value: '3x3', text: () => i18n.imagePreviewFirst3x3 },
          { value: '4x3', text: () => i18n.imagePreviewFirst4x3 },
          { value: '3x0', text: () => i18n.imagePreviewAll3 },
          { value: '4x0', text: () => i18n.imagePreviewAll4 },
        ],
      },
      more: {
        type: 'select',
        initial: 'text',
        select: [
          { value: 'text', text: () => i18n.imagePreviewUseText },
          { value: 'mask', text: () => i18n.imagePreviewUseMask },
        ],
      },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.imagePreviewMoreDetail },
    },
    init() {
      this.ref.count.addConfigListener(count => {
        const showAll = count.endsWith('0');
        const items = this.ref.more.getRenderItems();
        items.forEach(item => {
          const container = item.parentNode;
          if (showAll) container.style.display = 'none';
          else container.style.display = 'inline';
        });
      });
    },
    ainit() {
      const configs = {
        count: this.ref.count.getConfig(),
        more: this.ref.more.getConfig(),
      };
      util.inject(function (rootKey, configs) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        const col = Number(configs.count.split('x')[0]);
        const row = Number(configs.count.split('x')[1]) || Infinity;

        vueSetup.eachComponentVM('feed-picture', function (vm) {
          Object.defineProperty(vm, 'inlineNum', {
            get: function () {
              return [1, 1, 3, 3, 4, 4, 3, 4, 4, 3][vm.pic_num] || col;
            },
            set: function (v) { },
            enumerable: true,
            configurable: true,
          });
          Object.defineProperty(vm, 'newPics', {
            get: function () {
              if (vm.$parent.data._yawf_PictureShowAll) return vm.pics.slice(0);
              return vm.pics.slice(0, col * row);
            },
            set: function (v) { },
            enumerable: true,
            configurable: true,
          });

          if (!Object.getOwnPropertyDescriptor(vm.$parent.data, '_yawf_PictureShowAll')) {
            vm.$parent.$set(vm.$parent.data, '_yawf_PictureShowAll', false);
          }

          const expand = function (event) {
            vm.$parent.data._yawf_PictureShowAll = true;
            event.stopPropagation();
          };

          vueSetup.transformComponentRender(vm, function (nodeStruct, Nodes) {
            const { removeChild, appendChild, h } = Nodes;
            const moreIcon = nodeStruct.querySelector('x-woo-box-item x-woo-box');
            if (moreIcon) {
              removeChild(moreIcon.parentNode, moreIcon);
            }
            if (vm.$parent.data._yawf_PictureShowAll) {
              // pass
            } else if (this.pic_num > col * row) {
              if (configs.more === 'mask') {
                const lastPic = nodeStruct.querySelector('x-woo-box-item:last-child');
                const mask = h('woo-box', {
                  class: [this.$style.mask, this.$style.focusImg],
                  attrs: { align: 'center', justify: 'center' },
                }, [
                  h('span', {
                    class: this.$style.picNum,
                    on: { click: expand },
                  }, ['+' + (this.pic_num - col * row)]),
                ]);
                appendChild(lastPic, mask);
              } else {
                const more = h('div', {}, [
                  h('a', {
                    class: 'viewpic yawf-feed-detail-content-retweet-size yawf-feed-pic-expand',
                    on: { click: expand },
                  }, [`查看全部图片（共 ${this.pic_num} 张）`]),
                ]);
                appendChild(nodeStruct, more);
              }
            }
          });
          vm.$forceUpdate();
        });
      }, util.inject.rootKey, configs);
      css.append('.yawf-feed-pic-expand, .yawf-feed-pic-expand:hover { cursor: pointer; text-decoration: none; }');
    },
  });

  Object.assign(i18n, {
    pauseAnimatedImage: { cn: '动画图像(GIF)在缩略图显示时保持静止{{i}}', hk: '動畫圖像(GIF)在所圖顯示時保持靜止{{i}}', tw: '動畫圖像(GIF)在所圖顯示時保持靜止{{i}}', en: 'Pause animated thumbnail (GIF) {{i}}' },
    pauseAnimatedImageDetail: { cn: '该功能仅影响显示效果，并不会降低网络数据用量。' },
  });

  media.pauseAnimatedImage = rule.Rule({
    id: 'feed_no_animated_image',
    version: 1,
    parent: media.media,
    template: () => i18n.pauseAnimatedImage,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.pauseAnimatedImageDetail },
    },
    ainit() {
      // 其实不写 encodeURI 效果上也没问题，但是微博转发文字生成看到 > 就会出错
      const emptyImage = encodeURI('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg"></svg>');
      observer.dom.add(function pauseAnimatedImage() {
        const images = Array.from(document.querySelectorAll([
          '.PCD_photolist img[src$=".gif"]:not([yawf-pause-animate])',
          '.WB_pic img[src$=".gif"]:not([yawf-pause-animate])',
          'img.W_img_face[src$=".gif"]:not([yawf-pause-animate])',
        ].join(',')));
        images.forEach(async function (image) {
          const url = image.src;
          image.src = emptyImage;
          image.setAttribute('ori-src', url);
          image.setAttribute('yawf-ori-src', url);
          image.setAttribute('yawf-pause-animate', 'yawf-pause-animate');
          const dataUrl = await request.getImage(url).then(blob => urls.blobToDataUrl(blob));
          const img = new Image();
          img.addEventListener('load', () => {
            const width = img.naturalWidth, height = img.naturalHeight;
            const canvas = document.createElement('canvas');
            canvas.width = width; canvas.height = height;
            canvas.getContext('2d').drawImage(img, 0, 0, width, height);
            image.src = canvas.toDataURL('image/png');
          });
          img.src = dataUrl;
        });
      });
      css.append(`
.PCD_photolist img[src$=".gif"]:not([yawf-pause-animate]),
.WB_pic img[src$=".gif"]:not([yawf-pause-animate]),
.WB_gif_video_box
{ display: none !important; }
.WB_gif_box { visibility: visible !important; }
`);
    },
  });

  Object.assign(i18n, {
    useBuiltInVideoPlayer: {
      cn: '使用浏览器原生视频播放器{{i}}||音量{{volume}}%|{{memorize}}记忆上一次设置的音量||视频质量{{quality}}',
      hk: '使用瀏覽器內建影片播放器{{i}}||音量{{volume}}%|{{memorize}}記住上一次設置的音量||影片品質{{quality}}',
      en: 'Use browser built-in video player {{i}}||Volume {{volume}} | {{memorize}} memorize last volume||Video quality {{quality}}',
    },
    useBuiltInVideoPlayerDetail: { cn: '一次性解决自动播放和交互逻辑的各种问题，开启时其他视频相关的改造功能不再生效。不支持直播视频。播放可能不会被微博正确计入播放数。' },
    mediaVideoType: { cn: '视频', hk: '影片', tw: '影片', en: 'Video' },
    useBuiltInVideoPlayerAutoQuality: { cn: '自动', tw: '自動', en: 'Auto' },
    useBuiltInVideoPlayerBestQuality: { cn: '最佳', en: 'Best' },
  });

  media.useBuiltInVideoPlayer = rule.Rule({
    v7Support: true,
    id: 'feed_built_in_video_player',
    version: 60,
    parent: media.media,
    template: () => i18n.useBuiltInVideoPlayer,
    ref: {
      volume: { type: 'range', min: 0, max: 100, initial: 100 },
      memorize: { type: 'boolean' },
      quality: {
        type: 'select',
        initial: 'auto',
        select: [
          { value: 'auto', text: () => i18n.useBuiltInVideoPlayerAutoQuality },
          { value: 'best', text: () => i18n.useBuiltInVideoPlayerBestQuality },
        ],
      },
      i: { type: 'bubble', icon: 'warn', template: () => i18n.useBuiltInVideoPlayerDetail },
    },
    ainit() {
      const rule = this;
      const configs = {
        memorize: this.ref.memorize.getConfig(),
        volume: this.ref.volume.getConfig(),
        quality: this.ref.quality.getConfig(),
      };

      const updateVolume = function (volume) {
        if (typeof volume !== 'number') return;
        if (volume < 0 || volume > 100 || !Number.isFinite(volume)) return;
        rule.ref.volume.setConfig(Math.round(volume));
      };

      util.inject(function (rootKey, configs, updateVolume) {
        const yawf = window[rootKey];
        const vueSetup = yawf.vueSetup;

        const { quality, memorize } = configs;
        let volume = configs.volume;

        const setVolume = function (video) {
          const target = Math.round(volume) / 100;
          if (video.paused && video.volume !== target) {
            video.volume = target;
          }
        };
        const onClick = function (event) {
          this.isPlaying = true;
          setVolume(event.target);
          this.$refs.video.play();
        };
        const onPlay = function (event) {
          this.isPlaying = true;
          setVolume(event.target);
        };
        const onVolumechange = function (event) {
          if (!memorize) return;
          const video = event.target;
          volume = Math.round(video.volume * 100);
          updateVolume(volume);
          Array.from(document.querySelectorAll('.yawf-feed-video')).forEach(setVolume);
        };
        const onLoadstart = function (event) {
          setVolume(event.target);
        };

        vueSetup.transformComponentsRenderByTagName('feed-video', function (nodeStruct, Nodes) {
          const { removeChild, appendChild, h } = Nodes;

          const isPlaying = this.isPlaying;
          // 去掉原本渲染的视频播放器
          while (nodeStruct.firstChild) {
            removeChild(nodeStruct, nodeStruct.firstChild);
          }
          // 我们自己画一个视频播放器上去
          let url = null;
          if (quality === 'best') try {
            const playback = this.infos.media_info.playback_list.find(x => x.play_info?.url);
            url = playback.play_info.url;
          } catch (e) { /* ignore */ }
          if (!url) url = this.infos.media_info.stream_url;
          const videoWrap = h('div', {
            ref: 'videoWrapper',
            class: [this.$style.videoBox, 'yawf-video-box'],
          }, [h('div', {
            ref: 'videoContainer',
            class: [this.$style.placeholder, 'yawf-video-placeholder'],
          }, [h('div', {
            class: [this.$style.video, 'yawf-video-container'],
          }, [h('div', {
            class: [this.$style.video, 'wbp-video', isPlaying ? 'yawf-feed-video-actived' : null],
          }, [h('video', {
            ref: 'video',
            class: ['yawf-video', 'yawf-feed-video', 'wbpv-tech'],
            attrs: {
              src: url.replace(/^https?:\/\//, '//'),
              poster: this.thumbnail.replace(/^https?:\/\//, '//'),
              preload: 'auto',
              controls: isPlaying ? true : false,
            },
            on: {
              click: isPlaying ? null : onClick.bind(this),
              play: onPlay.bind(this),
              volumechange: onVolumechange.bind(this),
              loadstart: onLoadstart.bind(this),
            },
          })])])])]);
          appendChild(nodeStruct, videoWrap);
        });

      }, util.inject.rootKey, configs, updateVolume);

      css.append(String.raw`
.yawf-feed-video .wbp-video {width: 100%; height: 100%; }
.yawf-feed-video .wbp-video:not(.yawf-feed-video-actived)::before { content: "\e001"; font-family: krvdficon; font-weight: 400; font-style: normal; font-size: 36px; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 2; opacity: 0.85; text-shadow: 0 2px 4px rgba(0,0,0,.2); pointer-events: none; }
.yawf-feed-video .wbp-video:not(.yawf-feed-video-actived):hover::before { color: #ff8200; }
.yawf-video-container { position: absolute; top: 0; right: 0; width: 100%; height: 100%; object-fit: cover; border-radius: 8px; overflow: hidden; }
`);

    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/feeds/other.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const request = yawf.request;
  const feedParser = yawf.feed;

  const feeds = yawf.rules.feeds;

  const i18n = util.i18n;
  const css = util.css;
  const dialog = util.dialog;
  const time = util.time;

  const details = feeds.details = {};

  i18n.feedDetailsGroupTitle = {
    cn: '细节',
    tw: '細節',
    en: 'Details',
  };

  details.details = rule.Group({
    parent: feeds.feeds,
    template: () => i18n.feedDetailsGroupTitle,
  });

  Object.assign(i18n, {
    disableTagDialog: {
      cn: '屏蔽收藏微博时的添加标签对话框',
      tw: '阻擋收藏微博時的添加標籤對話方塊',
      en: 'Block the dialog after marking weibo favorite',
    },
    favoriteFailTitle: {
      cn: '收藏微博',
      en: 'Feed Favorite',
    },
    favoriteFailText: {
      cn: '收藏时发生错误',
      en: 'Error while adding favorite feeds',
    },
    favoriteFeed: {
      cn: '已收藏',
      en: 'Favorite Added',
    },
  });

  details.disableTagDialog = rule.Rule({
    id: 'feed_disable_tag_dialog',
    version: 1,
    parent: details.details,
    template: () => i18n.disableTagDialog,
    ainit() {
      document.addEventListener('click', async event => {
        if (!event.isTrusted) return;
        if (!['www.weibo.com', 'weibo.com'].includes(location.host)) return;
        const target = event.target;
        if (!(target instanceof Element)) return;
        const button = target.closest('[action-type="fl_favorite"]');
        if (!button) return;
        const isFavorite = button.getAttribute('favorite');
        if (isFavorite) return; // 不处理取消收藏的逻辑
        event.stopPropagation();
        event.preventDefault();
        const feed = feedParser.feedNode(button);
        const success = await request.feedFavorite(feed, { location: null });
        if (!success) {
          dialog.alert({
            id: 'yawf-favorite-fail',
            icon: 'warn',
            title: i18n.favoriteFailTitle,
            text: i18n.favoriteFailText,
          });
        } else {
          button.setAttribute('favorite', '1');
          const text = button.querySelector('[node-type="favorite_btn_text"]') ?? button;
          text.innerHTML = '<span><em class="W_ficon ficon_favorite S_spetxt">\xFB</em><em></em></span>';
          text.querySelector('em + em').textContent = i18n.favoriteFeed;
        }
      }, true);
    },
  });

  i18n.lowReadingCountWarn = {
    cn: '在自己个人主页高亮显示阅读数量|不超过{{count}}的微博',
    tw: '在自己個人主頁高亮顯示閱讀數量|不超過{{count}}的微博',
    en: 'Highlight feeds on my profile page which has | no more than {{count}} views',
  };

  details.lowReadingCountWarn = rule.Rule({
    id: 'feed_low_reading_warn',
    version: 23,
    parent: details.details,
    template: () => i18n.lowReadingCountWarn,
    ref: {
      count: {
        type: 'range',
        min: 10,
        max: 1000,
        step: 10,
        initial: 100,
      },
    },
    ainit() {
      const rule = this;
      observer.feed.onAfter(function (/** @type {Element} */feed) {
        const container = feed.closest('[id^="Pl_Official_MyProfileFeed__"]');
        if (!container) return;
        const popText = feed.querySelector('.WB_feed_handle [action-type="fl_pop"] i');
        if (!popText) return;
        const count = Number.parseInt(popText.title.match(/\d+/)[0], 10);
        const limit = rule.ref.count.getConfig();
        if (count > limit) return;
        feed.setAttribute('yawf-low-reading', count);
      });
      css.append('.WB_feed.WB_feed .WB_cardwrap[yawf-low-reading] { box-shadow: 0 0 4px red inset; }');
    },
  });

  Object.assign(i18n, {
    feedAbsoluteTimeDetail: {
      cn: '显示的时间受 [[layout_locale_timezone]] 功能影响。',
    },
  }, time.isCstEquivalent() ? {
    feedAbsoluteTime: {
      cn: '微博发布时间总是使用年月日格式',
      tw: '微博發布時間總是使用年月日格式',
      en: 'Use yyyy-mm-dd date format',
    },
  } : {
    feedAbsoluteTime: {
      cn: '微博发布时间总是使用年月日格式 {{i}}',
      tw: '微博發布時間總是使用年月日格式 {{i}}',
      en: 'Use yyyy-mm-dd date format {{i}}',
    },
  });

  details.feedAbsoluteTime = rule.Rule({
    id: 'feed_absolute_time',
    version: 60,
    parent: details.details,
    template: () => i18n.feedAbsoluteTime,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.feedAbsoluteTimeDetail },
    },
  });

  Object.assign(i18n, {
    feedLinkNewTab: {
      cn: '在新标签页打开以下链接 {{i}}||{{author}}作者/原作者|{{mention}}提到|{{topic}}话题|{{picture}}配图||{{detail}}微博详情（发布时间）|{{comments}}全部评论|{{card}}卡片',
    },
    feedLinkNewTabDetail: {
      cn: '按住 Ctrl 也可临时在新标签页打开。此功能依赖于 [[feed_render]]。',
    },
  });

  details.feedLinkNewTab = rule.Rule({
    v7Support: true,
    id: 'feed_link_new_tab',
    version: 85,
    parent: details.details,
    template: () => i18n.feedLinkNewTab,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.feedLinkNewTabDetail },
      author: { type: 'boolean', initial: true },
      mention: { type: 'boolean', initial: true },
      topic: { type: 'boolean', initial: true },
      detail: { type: 'boolean', initial: true },
      comments: { type: 'boolean', initial: true },
      picture: { type: 'boolean', initial: true },
      card: { type: 'boolean', initial: true },
    },
    // 实现在 render 里
  });

}());
//#endregion
//#region @require yaofang://content/rule/feeds/reading.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const pagemenu = yawf.pagemenu;

  const feeds = yawf.rules.feeds;

  const i18n = util.i18n;
  const keyboard = util.keyboard;
  const css = util.css;

  const reading = feeds.reading = {};

  i18n.feedReadingGroupTitle = {
    cn: '阅读视图',
    tw: '閱讀視圖',
    en: 'Reading View',
  };

  reading.reading = rule.Group({
    parent: feeds.feeds,
    template: () => i18n.feedReadingGroupTitle,
  });

  i18n.feedOnlyMode = {
    cn: '阅读视图|宽度{{width}}像素||快捷键{{key}}||{{button}}在微博列表顶部显示快捷开关按钮',
    tw: '閱讀視圖|寬度{{width}}圖元||快速鍵{{key}}||{{button}}在微博清單頂部顯示快速開關按鈕',
    en: 'Reading Mode | width {{width}}px || shortcut {{key}} || {{button}} show switch button at top of Weibo list',
  };
  i18n.feedOnlySwitch = {
    cn: '切换阅读视图',
    tw: '切換閱讀視圖',
    en: 'Toggle Reading Mode',
  };

  reading.feedOnlyMode = rule.Rule({
    id: 'feed_only_mode',
    version: 1,
    parent: reading.reading,
    template: () => i18n.feedOnlyMode,
    ref: {
      width: { type: 'range', min: 480, max: 1280, initial: 600, step: 10 },
      key: { type: 'key', initial: keyboard.code.F8 },
      button: { type: 'boolean', default: false },
      _enabled: { type: 'boolean', initial: false },
    },
    ainit() {
      const rule = this;
      if (yawf.init.page.type() === 'ttarticle') return;

      if (rule.ref.button.getConfig()) {
        const showButton = function showReaderSwitch() {
          const tabFirst = document.querySelector([
            '#v6_pl_content_homefeed .WB_tab_a:not([yawf-feed-only-added])',
            'div[id^="Pl_Official_ProfileFeedNav__"] .WB_tab_a:not([yawf-feed-only-added])',
          ].join(','));
          if (!tabFirst) return;
          tabFirst.setAttribute('yawf-feed-only-added', '');
          const wrap = document.createElement('div');
          wrap.innerHTML = '<div class="yawf-feed-only-button S_bg2"><a class="S_txt1"></a></div>';
          const line = wrap.firstChild;
          const button = line.querySelector('a');
          button.textContent = i18n.feedOnlySwitch;
          tabFirst.parentNode.insertBefore(line, tabFirst);
          button.addEventListener('click', event => {
            if (!event.isTrusted) return;
            rule.ref._enabled.setConfig(!rule.ref._enabled.getConfig());
          });
        };
        observer.dom.add(showButton);
      }

      pagemenu.add({
        title: i18n.feedOnlySwitch,
        onClick: function () {
          rule.ref._enabled.setConfig(!rule.ref._enabled.getConfig());
        },
        section: 10,
        order: 0,
      });

      document.addEventListener('keydown', event => {
        if (!event.isTrusted) return;
        if (event.target.matches('input, textarea, select')) return;
        const code = keyboard.event(event);
        if (code !== rule.ref.key.getConfig()) return;
        rule.ref._enabled.setConfig(!rule.ref._enabled.getConfig());
      });

      const width = rule.ref.width.getConfig();
      css.append(`
.yawf-feed-only-button { text-align: center; line-height: 31px; margin-bottom: 10px; border-radius: 3px; }
body[yawf-feed-only][yawf-feed-only] { --yawf-left-width: 0px; --yawf-right-width: 0px; --yawf-feed-width: ${+width}px; --yawf-extra-padding: 20px;}
body[yawf-feed-only] #WB_webchat,
body[yawf-feed-only] [i-am-music-player],
body[yawf-feed-only] .WB_frame>*:not(#plc_main),
body[yawf-feed-only] #plc_main>*:not(.WB_main_c):not(.WB_frame_c):not(.WB_main_r):not(.WB_frame_b),
body[yawf-feed-only] .WB_main_c>*:not([id^="v6_pl_content_"]),
body[yawf-feed-only] #plc_bot .WB_footer,
body[yawf-feed-only] #plc_bot .W_fold,
body[yawf-feed-only] .WB_footer { display: none !important; }
body[yawf-feed-only] .WB_frame { width: calc(var(--yawf-feed-width) + 20px) !important; }
body[yawf-feed-only] #plc_main { display: block; margin-left: auto; margin-right: auto; }
body[yawf-feed-only] .WB_frame,
body[yawf-feed-only] #plc_main,
body[yawf-feed-only] .WB_global_nav,
body[yawf-feed-only] .WB_main_c { max-width: 100%; margin-left: auto; margin-right: auto; }
body[yawf-feed-only] #plc_main { padding-bottom: 10px; }
body[yawf-feed-only] #plc_main::after { content: " "; display: table; clear: both; }
body[yawf-feed-only] #plc_main>.WB_main_r { visibility: hidden; margin-right: -230px; }
body[yawf-feed-only] #plc_main>.WB_frame_b { visibility: hidden; margin-right: -300px; }
body[yawf-feed-only] .WB_frame { padding-left: 0; }
`);

      const updateEnable = function updateEnable() {
        if (!document?.body) {
          setTimeout(updateEnable, 1000);
          return;
        }
        const enabled = rule.ref._enabled.getConfig();
        const configured = document.body.hasAttribute('yawf-feed-only');
        if (enabled === configured) return;
        if (enabled) {
          document.body.setAttribute('yawf-feed-only', 'yawf-feed-only');
        } else {
          document.body.removeAttribute('yawf-feed-only');
        }
      };
      rule.ref._enabled.addConfigListener(updateEnable);
      updateEnable();
    },
  });

}());
//#endregion
//#region @require yaofang://content/rule/about/about.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const i18n = util.i18n;

  i18n.aboutTabTitle = {
    cn: '关于药方',
    tw: '關於藥方',
    en: 'About',
  };

  const about = yawf.rules.about = {};
  about.about = rule.Tab({
    template: () => i18n.aboutTabTitle,
    pagemenu: true,
  });

}());
//#endregion
//#region @require yaofang://content/rule/about/importer/importer.js
; (function () {

  const yawf = window.yawf;
  const importer = yawf.importer = {};

  const parsers = [];

  importer.parsers = {};

  importer.addParser = function (parser) {
    parsers.push(parser);
    importer.parsers[parser.name] = parser;
  };

  importer.parse = function (dataArrayBuffer) {
    for (const parser of parsers) {
      try {
        const config = parser(dataArrayBuffer);
        if (config && typeof config === 'object') return config;
      } catch (e) {
        // reading failed
      }
    }
    return void 0;
  };


}());
//#endregion
//#region @require yaofang://content/rule/about/importer/yaofang.js
; (function () {

  const yawf = window.yawf;
  const importer = yawf.importer;

  importer.addParser(function yaofang(dataArrayBuffer) {
    const decoder = new TextDecoder();
    const text = decoder.decode(dataArrayBuffer);
    const data = JSON.parse(text);
    if (!data.version || !data.yaofang || !data.config) throw TypeError();
    return { config: data.config };
  });

}());
//#endregion
//#region @require yaofang://content/rule/about/importer/yawf.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const i18n = util.i18n;

  const importer = yawf.importer;

  i18n.yawfScriptSource = {
    cn: 'YAWF 用户脚本',
    tw: 'YAWF 用戶腳本',
    en: 'YAWF user script',
  };

  class Converter {
    constructor() {
      /** @type {Map<string, Array<(value: any) => Object<string, any>>>} */
      this.rules = new Map();
      this.initialize();
    }
    convert(yawf) {
      const rules = this.rules;
      /** @type Map<(values: Array<any>, target: string) => ({ [target: string]: any }), { target: string, values: Array<any> }> */
      this.pending = new Map();
      return Object.assign({}, ...Object.keys(yawf).map(key => {
        if (!rules.has(key)) return {};
        return Object.assign({}, ...rules.get(key).map(rule => rule(yawf[key])));
      }), ...[...this.pending.entries()].map(
        ([converter, { target, values }]) => converter(values, target)
      ));
    }
    rule(source, target, converter = null) {
      const that = this;
      if (!this.rules.has(source)) this.rules.set(source, []);
      const sourceRule = this.rules.get(source);
      if (typeof source === 'string' && typeof target === 'string') {
        if (typeof converter === 'function') {
          sourceRule.push(value => ({ [target]: converter(value) }));
        } else {
          sourceRule.push(value => ({ [target]: value }));
        }
      }
      if (Array.isArray(source)) {
        source.forEach((key, index) => {
          sourceRule.push(value => {
            const pending = that.pending;
            const data = pending.get(converter) || { target, values: Array(source.length) };
            data.values[index] = value;
            const fullFilled = data.values.reduce(v => v + 1) === data.values.length;
            if (!fullFilled) return;
            converter(data.values, target);
            pending.delete(converter);
          });
        });
      }
    }
    initialize() {
      const rule = this.rule.bind(this);
      // 微博过滤
      rule('weibo.tool.auto_check_following', 'filter_follow_check');
      rule('weibo.tool.auto_check_following.frequency', 'filter_follow_check.frequency', days => days * 86400e3);
      rule('weibo.tool.uncheck_follow_presenter', 'uncheck_follow_presenter');
      rule('weibo.tool.auto_unfold_ttartical', 'show_artical_without_follow');
      rule('weibo.tool.load_weibo_by_newest', 'filter_homepage_newest_feeds');
      rule('weibo.tool.load_weibo_by_group', 'filter_homepage_single_group');
      rule('weibo.tool.load_weibo_by_group.group', 'filter_homepage_single_group.group', group => `g${group.id}`);
      rule('weibo.tool.load_weibo_by_multi_group.enabled', 'filter_homepage_multi_group');
      rule(['weibo.tool.load_weibo_by_multi_group', 'weibo.tool.load_weibo_by_multi_group.whisper'], 'filter_homepage_multi_group.groups', ([groups, whisper], target) => ([
        ...(groups ?? []).map(group => `g${group}`),
        ...(whisper ? ['whisper'] : []),
      ]));
      rule('weibo.other.auto_load_new_weibo', 'filter_homepage_auto_load');
      rule('weibo.other.desktop_notification', 'filter_homepage_desktop_notify');
      rule('weibo.other.desktop_notification.types', 'filter_homepage_desktop_notify.whitelist');
      rule('weibo.tool.redirectWeibo', 'filter_profile_show_all');
      rule('weibo.tool.fast_block_button', 'filter_manually_hide');
      // 内容～来源
      const regexenImporter = regexen => regexen.map(source => ({ source, flags: 'mu' }));
      const userIdImporter = ids => ids.map(id => ({ id }));
      rule('weibo.filters.keyword.whitelist', 'filter_content_text_show.items');
      rule('weibo.filters.keyword.blacklist', 'filter_content_text_hide.items');
      rule('weibo.filters.keyword.foldlist', 'filter_content_text_fold.items');
      rule('weibo.filters.regexp.whitelist', 'filter_content_regex_show.items', regexenImporter);
      rule('weibo.filters.regexp.blacklist', 'filter_content_regex_hide.items', regexenImporter);
      rule('weibo.filters.regexp.foldlist', 'filter_content_regex_fold.items', regexenImporter);
      rule('weibo.filters.account.whitelist', 'filter_author_id_show.items', userIdImporter);
      rule('weibo.filters.account.blacklist', 'filter_author_id_hide.items', userIdImporter);
      rule('weibo.filters.account.foldlist', 'filter_author_id_fold.items', userIdImporter);
      rule('weibo.filters.accountf.blacklist', 'filter_author_forward_id_hide.items', userIdImporter);
      rule('weibo.filters.accountf.foldlist', 'filter_author_forward_id_fold.items', userIdImporter);
      rule('weibo.original.blacklist_d', 'filter_original_discover');
      rule('weibo.filters.original.whitelist', 'filter_original_id_show.items', userIdImporter);
      rule('weibo.filters.original.blacklist', 'filter_original_id_hide.items', userIdImporter);
      rule('weibo.filters.original.foldlist', 'filter_original_id_fold.items', userIdImporter);
      rule('weibo.original.by_follower.enabled', 'filter_original_follower');
      rule('weibo.original.by_follower.fans', 'filter_original_follower.count');
      rule('weibo.original.by_follower', 'filter_original_follower.account', userIdImporter);
      rule('weibo.filters.mention.whitelist', 'filter_mention_name_show.items');
      rule('weibo.filters.mention.blacklist', 'filter_mention_name_hide.items');
      rule('weibo.filters.mention.foldlist', 'filter_mention_name_fold.items');
      rule('weibo.filters.topic.whitelist', 'filter_topic_text_show.items');
      rule('weibo.filters.topic.blacklist', 'filter_topic_text_hide.items');
      rule('weibo.filters.topic.foldlist', 'filter_topic_text_fold.items');
      rule('weibo.filters.source.whitelist', 'filter_source_text_show.items');
      rule('weibo.filters.source.blacklist', 'filter_source_text_hide.items');
      rule('weibo.filters.source.foldlist', 'filter_source_text_fold.items');
      // 更多
      rule('weibo.other.my_weibo', 'filter_my_feed');
      rule('weibo.other.my_original', 'filter_my_original');
      rule('weibo.other.mention_me', 'filter_mention_me');
      rule('weibo.other.ad_feed', 'filter_ad_feed');
      rule('weibo.other.fans_top', 'filter_fans_top');
      rule('weibo.other.product_card', 'filter_weibo_product');
      rule('weibo.other.tb_tm_wb', 'filter_tb_tm_feed');
      rule('weibo.other.weibo_pay_gift', 'filter_weibo_pay');
      rule('weibo.other.user_like', 'filter_user_like');
      rule('weibo.other.fake_weibo', 'filter_fake_weibo');
      rule('weibo.other.deleted_forward', 'filter_deleted_forward');
      rule('weibo.other.comment_and_reply', 'filter_comment_and_forward');
      rule('weibo.other.vote_weibo', 'filter_vote');
      rule('weibo.other.red2014', 'filter_red_pack');
      rule('weibo.other.jinli_forward', 'filter_koi_forward');
      rule('weibo.other.appitem', 'filter_app_item');
      rule('weibo.other.wenda', 'filter_wenda');
      rule('weibo.other.wenwodr', 'filter_wenwo_dr');
      rule('weibo.other.yizhibo.type', 'filter_yizhibo');
      rule('weibo.other.stock', 'filter_stock');
      rule('weibo.other.paid', 'filter_paid');
      rule('weibo.other.multi_topic', 'filter_multiple_topics_feed');
      rule('weibo.other.multi_topic.num', 'filter_multiple_topics_feed.num');
      rule('weibo.other.same_account', 'flooding_author');
      rule('weibo.other.same_account.number', 'flooding_author.number');
      rule('weibo.other.same_account.action', 'flooding_author.number.action', action => ({ fold: 'fold', hidden: 'hide' }[action]));
      rule('weibo.other.same_forward', 'flooding_forward');
      rule('weibo.other.same_forward.number', 'flooding_forward.number');
      rule('weibo.other.same_forward.action', 'flooding_forward.number.action', action => ({ fold: 'fold', hidden: 'hide' }[action]));
      // 评论过滤
      rule('weibo.other.comment_show_all', 'comment_layout_by_time');
      rule('weibo.other.fold_child_comment', 'comment_layout_hide_sub');
      rule('weibo.filters.ckeyword.whitelist', 'filter_comment_text_show.items');
      rule('weibo.filters.ckeyword.blacklist', 'filter_comment_text_hide.items');
      rule('weibo.filters.cregexp.whitelist', 'filter_comment_regex_show.items', regexenImporter);
      rule('weibo.filters.cregexp.blacklist', 'filter_comment_regex_hide.items', regexenImporter);
      rule('weibo.filters.cuser.whitelist', 'filter_comment_name_show.items');
      rule('weibo.filters.cuser.blacklist', 'filter_comment_name_hide.items');
      rule('weibo.comment.my_comment', 'filter_comment_show_my');
      rule('weibo.comment.emoji_count', 'filter_comment_face_count');
      rule('weibo.comment.emoji_count.number', 'filter_comment_face_count.count');
      rule('weibo.comment.emoji_types', 'filter_comment_face_type');
      rule('weibo.comment.emoji_types.number', 'filter_comment_face_type.count');
      rule('weibo.comment.no_content', 'filter_comment_wo_content');
      rule('weibo.comment.with_forward', 'filter_comment_with_forward');
      // 界面清理
      rule('weibo.layoutHideIconLevel', 'clean_icons_level');
      rule('weibo.layoutHideIconMember', 'clean_icons_member');
      rule('weibo.layoutHideIconApprove', 'clean_icons_approve');
      rule('weibo.layoutHideIconApproveCo', 'clean_icons_approve_co');
      rule('weibo.layoutHideIconApproveDead', 'clean_icons_approve_dead');
      rule('weibo.layoutHideIconBigFun', 'clean_icons_bigfun');
      rule('weibo.layoutHideIconClub', 'clean_icons_club');
      rule('weibo.layoutHideIconVGirl', 'clean_icons_v_girl');
      rule('weibo.layoutHideIconSupervisor', 'clean_icons_supervisor');
      rule('weibo.layoutHideIconTaobao', 'clean_icons_taobao');
      rule('weibo.layoutHideIconCheng', 'clean_icons_cheng');
      rule('weibo.layoutHideIconGongyi', 'clean_icons_gongyi');
      rule('weibo.layoutHideIconZongyika', 'clean_icons_zongyika');
      rule('weibo.layoutHideIconOther', 'clean_icons_others');
      rule('weibo.layoutHideFollowSingle', 'clean_follow_single');
      rule('weibo.layoutHideFollowAtMe', 'clean_follow_at_me');
      rule('weibo.layoutHideFollowDiscover', 'clean_follow_discover');
      rule('weibo.layoutHideFollowWhisper', 'clean_follow_whisper');
      rule('weibo.layoutHideFollowVideo', 'clean_follow_video');
      rule('weibo.layoutHideFollowRecommend', 'clean_follow_recommend');
      rule('weibo.layoutHideNavLogoImg', 'clean_nav_logo_img');
      rule('weibo.layoutHideNavMain', 'clean_nav_main');
      rule('weibo.layoutHideNavTV', 'clean_nav_tv');
      rule('weibo.layoutHideNavHot', 'clean_nav_hot');
      rule('weibo.layoutHideNavGame', 'clean_nav_game');
      rule('weibo.layoutHideNavHotSearch', 'clean_nav_hot_search');
      rule('weibo.layoutHideNavNoticeNew', 'clean_nav_notice_new');
      rule('weibo.layoutHideNavNew', 'clean_nav_new');
      rule('weibo.layoutHideLeftNewFeed', 'clean_left_new_feed');
      rule('weibo.layoutHideLeftHome', 'clean_left_home');
      rule('weibo.layoutHideLeftFav', 'clean_left_fav');
      rule('weibo.layoutHideLeftLike', 'clean_left_like');
      rule('weibo.layoutHideLeftHot', 'clean_left_hot');
      rule('weibo.layoutHideLeftTV', 'clean_left_tv');
      rule('weibo.layoutHideLeftFriends', 'clean_left_friends');
      rule('weibo.layoutHideLeftGroupToMe', 'clean_left_group_to_me');
      rule('weibo.layoutHideLeftSpecial', 'clean_left_special');
      rule('weibo.layoutHideLeftWhisper', 'clean_left_whisper');
      rule('weibo.layoutHideLeftVPlus', 'clean_left_v_plus');
      rule('weibo.layoutHideLeftNew', 'clean_left_new');
      rule('weibo.layoutHideLeftNews', 'clean_left_news');
      rule('weibo.layoutHideLeftCount', 'clean_left_count');
      rule('weibo.layoutHideMiddleRecommendedTopic', 'clean_middle_recommended_topic');
      rule('weibo.layoutHideMiddleFeedRecommand', 'clean_middle_feed_recommend');
      rule('weibo.layoutHideMiddleMemberTip', 'clean_middle_member_tip');
      rule('weibo.layoutHideRightInfo', 'clean_right_info');
      rule('weibo.layoutHideRightRecomMusicRank', 'clean_right_ranks');
      rule('weibo.layoutHideRightHotTopic', 'clean_right_hot_topic');
      rule('weibo.layoutHideRightInterest', 'clean_right_interest');
      rule('weibo.layoutHideRightMember', 'clean_right_member');
      rule('weibo.layoutHideRightGroups', 'clean_right_groups');
      rule('weibo.layoutHideRightRecomGroupUser', 'clean_right_recom_group_user');
      rule('weibo.layoutHideRightHongbaoRank', 'clean_right_hongbao_rank');
      rule('weibo.layoutHideRightAttFeed', 'clean_right_att_feed');
      rule('weibo.layoutHideRightNotice', 'clean_right_notice');
      rule('weibo.layoutHideWeiboRecomFeed', 'clean_feed_recommend');
      rule('weibo.layoutHideWeiboFeedOuterTip', 'clean_feed_feed_outer_tip');
      rule('weibo.layoutHideWeiboFeedTip', 'clean_feed_feed_tip');
      rule('weibo.layoutHideWeiboGroupTip', 'clean_feed_group_tip');
      rule('weibo.layoutHideWeiboVIPBackground', 'clean_feed_vip_background');
      rule('weibo.layoutHideWeiboLastPic', 'clean_feed_last_pic');
      rule('weibo.layoutHideWeiboPicTag', 'clean_feed_pic_tag');
      rule('weibo.layoutHideWeiboSonTitle', 'clean_feed_son_title');
      rule('weibo.layoutHideWeiboCard', 'clean_feed_card');
      rule('weibo.layoutHideWeiboArticalPay', 'clean_feed_article_pay');
      rule('weibo.layoutHideWeiboTag', 'clean_feed_tag');
      rule('weibo.layoutHideWeiboMovieTag', 'clean_feed_related_link');
      rule('weibo.layoutHideWeiboSource', 'clean_feed_source');
      rule('weibo.layoutHideWeiboPop', 'clean_feed_pop');
      rule('weibo.layoutHideWeiboLike', 'clean_feed_like');
      rule('weibo.layoutHideWeiboLikeComment', 'clean_feed_like_comment');
      rule('weibo.layoutHideWeiboLikePopup', 'clean_feed_like_attitude');
      rule('weibo.layoutHideWeiboForward', 'clean_feed_forward');
      rule('weibo.layoutHideWeiboFavourite', 'clean_feed_favorite');
      rule('weibo.layoutHideWeiboPromoteOther', 'clean_feed_promote_other');
      rule('weibo.layoutHideWeiboReport', 'clean_feed_report');
      rule('weibo.layoutHideWeiboUseCardBackground', 'clean_feed_use_card_background');
      rule('weibo.layoutHidePersonMoveThings', 'clean_profile_move_things');
      rule('weibo.layoutHidePersonCover', 'clean_profile_cover');
      rule('weibo.layoutHidePersonBGImg', 'clean_profile_bg_img');
      rule('weibo.layoutHidePersonBadgeIcon', 'clean_profile_badge_icon');
      rule('weibo.layoutHidePersonVerify', 'clean_profile_verify');
      rule('weibo.layoutHidePersonEditPersonInfo', 'clean_profile_edit_person_info');
      rule('weibo.layoutHidePersonStats', 'clean_profile_stats');
      rule('weibo.layoutHidePersonMyData', 'clean_profile_my_data');
      rule('weibo.layoutHidePersonSuggestUser', 'clean_profile_suggest_user');
      rule('weibo.layoutHidePersonGroup', 'clean_profile_group');
      rule('weibo.layoutHidePersonRelation', 'clean_profile_relation');
      rule('weibo.layoutHidePersonAlbum', 'clean_profile_album');
      rule('weibo.layoutHidePersonHotTopic', 'clean_profile_hot_topic');
      rule('weibo.layoutHidePersonHotWeibo', 'clean_profile_hot_weibo');
      rule('weibo.layoutHidePersonUserList', 'clean_profile_recommend_feed');
      rule('weibo.layoutHidePersonHongbao', 'clean_profile_user_list');
      rule('weibo.layoutHidePersonWenwoDr', 'clean_profile_hongbao');
      rule('weibo.layoutHidePersonTimeline', 'clean_profile_wenwo_dr');
      rule('weibo.layoutHideMessagesHelp', 'clean_profile_timeline');
      rule('weibo.layoutHideMessagesFeedback', 'clean_message_help');
      rule('weibo.layoutHideMessagesYoudao', 'clean_message_feedback');
      rule('weibo.layoutHideOtherAds', 'clean_other_ads');
      rule('weibo.layoutHideOtherMusic', 'clean_other_music');
      rule('weibo.layoutHideOtherTemplate', 'clean_other_template');
      rule('weibo.layoutHideOtherHomeTip', 'clean_other_home_tip');
      rule('weibo.layoutHideOtherFooter', 'clean_other_footer');
      rule('weibo.layoutHideOtherIM', 'clean_other_im');
      rule('weibo.layoutHideOtherIMNews', 'clean_other_im_news');
      rule('weibo.layoutHideOtherTip', 'clean_other_tip');
      rule('weibo.layoutHideOtherRelatedWB', 'clean_other_related_feeds');
      rule('weibo.layoutHideOtherRelatedVideo', 'clean_other_related_video');
      rule('weibo.layoutHideOtherRelatedArtical', 'clean_other_related_artical');
      rule('weibo.layoutHideOtherSendWeibo', 'clean_other_send_weibo');
      // 版面展示
      rule('weibo.tool.hide_nav_bar', 'layout_nav_auto_hide');
      rule('weibo.tool.reorder_nav_bar', 'layout_nav_classical');
      rule('weibo.tool.nav_hide_name', 'layout_nav_hide_name');
      rule('weibo.tool.nav_hide_name.act', 'layout_nav_hide_name.act');
      rule('weibo.tool.showAllMsgNav', 'layout_left_messages');
      rule('weibo.tool.showAllMsgNav.atme', 'layout_left_messages.atme');
      rule('weibo.tool.showAllMsgNav.cmt', 'layout_left_messages.cmt');
      rule('weibo.tool.showAllMsgNav.like', 'layout_left_messages.like');
      rule('weibo.tool.showAllMsgNav.dm', 'layout_left_messages.dm');
      rule('weibo.tool.showAllMsgNav.msgbox', 'layout_left_messages.msgbox');
      rule('weibo.tool.showAllMsgNav.group', 'layout_left_messages.group');
      rule('weibo.tool.showAllMsgNav.dmsub', 'layout_left_messages.dmsub');
      rule('weibo.tool.mergeColumns', 'layout_side_merge');
      rule('weibo.tool.mergeColumns.side', 'layout_side_merge.side');
      rule('weibo.tool.chose_side', 'layout_side_position');
      rule('weibo.tool.chose_side.side', 'layout_side_position.side');
      rule('weibo.tool.showAllGroup', 'layout_side_show_all_groups');
      rule('weibo.tool.fixedLeft', 'layout_left_move');
      rule('weibo.tool.fixedRight', 'layout_right_move');
      rule('weibo.tool.fixedOthers', 'layout_other_move');
      rule('weibo.tool.custom_font_family', 'font_family');
      rule('weibo.tool.custom_font_family.wf', 'font_family.west');
      rule('weibo.tool.custom_font_family.cf', 'font_family.chinese');
      rule('weibo.tool.avatar_shape', 'layout_avatar_shape');
      rule('weibo.tool.avatar_shape.shape', 'layout_avatar_shape.shape');
      rule('weibo.tool.fast_emoji', 'layout_fast_face');
      rule('weibo.tool.show_local_time', 'layout_locale_timezone');
      rule('weibo.tool.set_skin', 'layout_theme_apply');
      rule('weibo.tool.set_skin.skin', 'layout_theme_apply.skin');
      rule('weibo.tool.dark_nav_bar', 'layout_nav_dark');
      rule('weibo.tool.color_override', 'layout_theme_color');
      rule('weibo.tool.color_override.color1', 'layout_theme_color.color1');
      rule('weibo.tool.color_override.transparency1', 'layout_theme_color.transparency1');
      rule('weibo.tool.color_override.color2', 'layout_theme_color.color2');
      rule('weibo.tool.color_override.transparency2', 'layout_theme_color.transparency2');
      rule('weibo.tool.color_override.color3', 'layout_theme_color.color3');
      rule('weibo.tool.color_override.transparency3', 'layout_theme_color.transparency3');
      rule('weibo.tool.userstyle', 'custom_css.css');
      // 微博展示
      rule('weibo.tool.no_weibo_space', 'feed_no_space');
      rule('weibo.tool.from_in_bottom', 'feed_source_at_bottom');
      rule('weibo.tool.unwrapText', 'feed_author_content_nowrap');
      rule('weibo.tool.image_size', 'feed_small_image');
      rule('weibo.tool.image_size.repost', 'feed_small_image.repost');
      rule('weibo.tool.width_weibo', 'feed_increase_width');
      rule('weibo.tool.width_weibo.width', 'feed_increase_width.width');
      rule('weibo.layout.reorder', 'feed_button_order');
      rule('weibo.layout.reorder.1', 'feed_button_order.0');
      rule('weibo.layout.reorder.2', 'feed_button_order.1');
      rule('weibo.layout.reorder.3', 'feed_button_order.2');
      rule('weibo.layout.reorder.4', 'feed_button_order.3');
      rule('weibo.layout.reorder.5', 'feed_button_order.4');
      rule('weibo.layout.cmtorder', 'feed_button_order_comment');
      rule('weibo.layout.cmtorder.1', 'feed_button_order_comment.0');
      rule('weibo.layout.cmtorder.2', 'feed_button_order_comment.1');
      rule('weibo.layout.cmtorder.3', 'feed_button_order_comment.2');
      rule('weibo.layout.cmtorder.4', 'feed_button_order_comment.3');
      rule('weibo.layout.cmtorder.5', 'feed_button_order_comment.4');
      rule('weibo.tool.noTagDialog', 'feed_disable_tag_dialog');
      rule('weibo.tool.highlight_low_reading', 'feed_low_reading_warn');
      rule('weibo.tool.weibo_large_font', 'feed_font_size');
      rule('weibo.tool.weibo_large_font.ratio', 'feed_font_size.ratio');
      rule('weibo.tool.auto_unfold_weibo', 'feed_long_expand');
      rule('weibo.tool.auto_unfold_weibo.count', 'feed_long_expand.count');
      rule('weibo.tool.auto_unfold_weibo.br', 'feed_long_expand.br');
      rule('weibo.tool.unwrapContent', 'feed_content_line_break');
      rule('weibo.tool.unwrapContent.text', 'feed_content_line_break.text');
      rule('weibo.tool.replace_link', 'feed_link_use_url');
      rule('weibo.tool.replace_image_emoji', 'feed_unicode_emoji');
      rule('weibo.tool.show_vote_result', 'show_vote_result');
      rule('weibo.other.customize_source', 'feed_no_custom_source');
      rule('weibo.tool.viewOriginal', 'feed_view_original');
      rule('weibo.tool.viewOriginal.open', 'feed_view_original.open');
      rule('weibo.tool.viewOriginal.direct', 'feed_view_original.direct');
      rule('weibo.tool.downloadImage', 'feed_download_image');
      rule('weibo.tool.downloadImage.direct', 'feed_download_image.direct');
      rule('weibo.tool.pause_animated_image', 'feed_no_animated_image');
      rule('weibo.tool.use_built_in_video_player', 'feed_built_in_video_player');
      rule('weibo.tool.use_built_in_video_player.volume', 'feed_built_in_video_player.volume');
      rule('weibo.tool.use_built_in_video_player.memorize', 'feed_built_in_video_player.memorize');
    }
  }

  importer.addParser(function yawf(dataArrayBuffer) {
    const decoder = new TextDecoder();
    const text = decoder.decode(dataArrayBuffer);
    const data = JSON.parse(text);
    if (!data.ver || !data.yawf || !data.conf) throw TypeError();
    const config = new Converter().convert(data.conf);
    return { config, source: i18n.yawfScriptSource };
  });

}());
//#endregion
//#region @require yaofang://content/rule/about/importer/ybjxbf.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const i18n = util.i18n;

  const importer = yawf.importer;

  i18n.ybjxbfScriptSource = {
    cn: '眼不见心不烦',
    tw: '眼不見心不煩',
  };

  class Converter {
    constructor() {
      /** @type {Map<string, ((value: any) => ({ [target: string]: any }))[]>} */
      this.rules = new Map();
      /** @type {Map<string, (() => ({ [target: string]: true }))[]>} */
      this.cleans = new Map();
      /** @type {Map<string, ((items: Array<any>) => ({ [target: string]: Array<any> }))[]>} */
      this.collections = new Map();
      this.initialize();
    }
    convert(wbp) {
      const configs = {};
      wbp.hideMods?.forEach(mod => {
        Object.assign(configs, ...(this.cleans.get(mod) ?? []).map(clean => clean() ?? {}));
      });
      Object.keys(wbp).forEach(key => {
        Object.assign(configs, ...(this.rules.get(key) ?? []).map(rule => rule(wbp[key]) ?? {}));
      });
      Object.keys(wbp).forEach(key => {
        if (!this.collections.has(key)) return;
        this.collections.get(key)?.forEach(mapper => {
          const conf = mapper(wbp[key]);
          Object.keys(conf).forEach(ckey => {
            configs[ckey] = (configs[ckey] ?? []).concat(conf[ckey]);
          });
        });
      });
      return configs;
    }
    /**
     * @param {(item: any) => Array<any>} map
     */
    collection(source, target, map) {
      if (!this.collections.has(source)) {
        this.collections.set(source, []);
      }
      this.collections.get(source).push(items => ({
        [target]: items.map(item => map(item))
          .reduce((result, append) => result.concat(append), []),
      }));
    }
    rule(source, target, map) {
      if (!this.rules.has(source)) {
        this.rules.set(source, []);
      }
      if (!map) {
        this.rules.get(source).push(value => value ? { [target]: true } : {});
      } else {
        this.rules.get(source).push(value => {
          const result = map(value);
          if (result !== void 0) return { [target]: result };
          return {};
        });
      }
    }
    clean(source, target) {
      if (!this.cleans.has(source)) {
        this.cleans.set(source, []);
      }
      this.cleans.get(source).push(() => ({ [target]: true }));
    }
    initialize() {
      const collection = this.collection.bind(this);
      const clean = this.clean.bind(this);
      const rule = this.rule.bind(this);

      const keywordMapper = keyword => /^\/.+\/$|\+/.test(keyword) ? [] : [keyword];
      const regexMapper = keyword => {
        if (/^\/.+\/$/.test(keyword)) try {
          const regex = new RegExp(keyword.slice(1, -1), 'mu');
          return [{ source: regex.source, flags: regex.flags }];
        } catch (e) { /* ignore */ } else if (/\+/.test(keyword)) {
          const words = keyword.split('+');
          const regex = RegExp('^' + words.map(p => `(?=[\\s\\S]*${p.replace(/([.*+?^${}()|[\]/\\])/g, '\\$1')})`).join(''), 'mu');
          return [{ source: regex.source, flags: regex.flags }];
        }
        return [];
      };
      const userIdMapper = userId => [{ id: userId }];
      const textMapper = text => [text];

      collection('whiteKeywords', 'filter_content_text_show.items', keywordMapper);
      collection('blackKeywords', 'filter_content_text_hide.items', keywordMapper);
      collection('whiteKeywords', 'filter_content_regex_show.items', regexMapper);
      collection('blackKeywords', 'filter_content_regex_hide.items', regexMapper);
      collection('userBlacklist', 'filter_author_id_hide.items', userIdMapper);
      collection('userBlacklist', 'filter_original_id_hide.items', userIdMapper);
      collection('sourceKeywords', 'filter_source_text_hide.items', textMapper);
      collection('URLKeywords', 'filter_comment_name_show.items', textMapper);

      rule('filterOthersOnly', 'filter_my_feed');
      rule('filterOthersOnly', 'filter_my_original');
      rule('filterPromotions', 'filter_ad_feed');
      rule('filterHot', 'filter_fans_top');
      rule('filterTaobao', 'filter_tb_tm_feed');
      rule('filterDeleted', 'filter_deleted_forward');
      rule('filterFlood', 'weibo.other.same_account');
      rule('maxFlood', 'weibo.other.same_account.number', Number);
      rule('showAllMsgNav', 'layout_left_messages');
      rule('showAllGroups', 'layout_side_show_all_groups');
      rule('noHomeMargins', 'layout_side_merge');
      rule('showAllText', 'feed_long_expand');
      rule('showAllArticleText', 'show_article_without_follow');
      rule('directAllFeeds', 'filter_profile_show_all');
      rule('directBigImg', 'feed_view_original');
      rule('squareAvatar', 'layout_avatar_shape');
      rule('skinID', 'layout_theme_apply.skin', value => value);
      rule('overrideMySkin', 'layout_theme_apply');
      rule('unwrapText', 'feed_author_content_nowrap');
      rule('smallImgLayout', 'feed_small_image');
      rule('compactFeedToolbar', 'feed_no_space');
      rule('noHomeMargins', 'feed_no_space');
      rule('moveSrcToBtm', 'feed_source_at_bottom');
      rule('unwrapText', 'feed_author_content_nowrap');
      rule('customStyles', 'custom_css');

      clean('TimelineMods', 'filter_fake_weibo');
      clean('Level', 'clean_icons_level');
      clean('MemberIcon', 'clean_icons_member');
      clean('VerifyIcon', 'clean_icons_approve');
      clean('VerifyIcon', 'clean_icons_approve_co');
      clean('VerifyIcon', 'clean_icons_approve_dead');
      clean('DarenIcon', 'clean_icons_club');
      clean('VgirlIcon', 'clean_icons_v_girl');
      clean('TaobaoIcon', 'clean_icons_taobao');
      clean('GongyiIcon', 'clean_icons_gongyi');
      clean('PaiIcon', 'clean_icons_others');
      clean('HotSearch', 'clean_nav_hot_search');
      clean('HotWeibo', 'clean_left_hot');
      clean('Friends', 'clean_left_friends');
      clean('ToMe', 'clean_left_group_to_me');
      clean('RecommendedTopic', 'clean_middle_recommended_topic');
      clean('RecomFeed', 'clean_middle_feed_recommend');
      clean('MemberTip', 'clean_middle_member_tip');
      clean('MusicRecom', 'clean_right_ranks');
      clean('Topic', 'clean_right_hot_topic');
      clean('Member', 'clean_right_member');
      clean('Hongbao', 'clean_right_hongbao_rank');
      clean('MovieRecom', 'clean_right_member');
      clean('AttFeed', 'clean_right_att_feed');
      clean('Notice', 'clean_right_notice');
      clean('RecomFeed', 'clean_feed_recommend');
      clean('CommentTip', 'clean_feed_feed_tip');
      clean('MemberCover', 'clean_feed_vip_background');
      clean('TopicCard', 'clean_feed_card');
      clean('LocationCard', 'clean_feed_card');
      clean('ProfCover', 'clean_profile_cover');
      clean('ProfStats', 'clean_profile_stats');
      clean('Relation', 'clean_profile_relation');
      clean('Album', 'clean_profile_album');
      clean('Ads', 'clean_other_ads');
      clean('MusicPlayer', 'clean_other_music');
      clean('Footer', 'clean_other_footer');
      clean('FeedRecom', 'clean_other_related_feeds');
      clean('FeedRecom', 'clean_other_related_video');
      clean('IMNews', 'clean_other_im_news');
    }
  }

  const convertData = data => {
    if (!Array.isArray(data.hideMods)) throw TypeError();
    const config = new Converter().convert(data);
    return { config, source: i18n.ybjxbfScriptSource };
  };

  importer.addParser(function ybjxbf(dataArrayBuffer) {
    let text = null;
    const decoder = new TextDecoder();
    text = decoder.decode(dataArrayBuffer);
    const data = JSON.parse(text);
    return convertData(data);
  });

  importer.ybjxbfConvert = data => {
    return convertData(data);
  };

}());
//#endregion
//#region @require yaofang://content/rule/about/export.js
; (function () {

  const browser = window.weBrowser;
  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const download = yawf.download;
  const init = yawf.init;
  const importer = yawf.importer;

  const ui = util.ui;
  const css = util.css;

  const about = yawf.rules.about;

  const i18n = util.i18n;
  i18n.backupGroupTitle = {
    cn: '导入 / 导出',
    tw: '匯入 / 匯出',
    en: 'Import / Export',
  };

  const backup = about.backup = {};
  backup.backup = rule.Group({
    parent: about.about,
    template: () => i18n.backupGroupTitle,
  });

  i18n.backupText = {
    cn: '备份和恢复设置（暂不支持导入脚本版设置）||{{buttons}}',
    tw: '備份和恢復設定（暫不支持匯入腳本版設定）||{{buttons}}',
    en: 'Backup and Recovery (Cannot load settings from script version)||{{buttons}}',
  };

  Object.assign(i18n, {
    configImportButton: { cn: '导入', tw: '匯入', en: 'Import' },
    configImportWarningTitle: { cn: '设置导入', tw: '設定匯入', en: 'Setting Import' },
    configImportWarning: {
      cn: '导入的设置会覆盖您当前已有的设置，确实要导入设置吗？',
      tw: '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？',
      en: 'The imported settings may replace your current settings. Are you sure you want to import this file?',
    },
    configImportWarningExternal: {
      cn: '您正在导入来自“{}”的设置，导入工具会尽量将您的设置转换为本扩展支持的功能，但实际效果仍会有所不同。导入后建议您打开扩展的设置复查各项设置。导入的设置会覆盖您当前已有的设置，确实要导入设置吗？',
      tw: '您正試圖匯入來自於「{}」的設定，匯入工具會盡可能將您的設定轉換為本擴充套件支援的功能，但實際效果仍會有所不同。執行匯入後，建議您打開設定方塊手工複查。匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？',
      en: 'You are trying to import settings from "{}". Importing tool will try its best to convert your settings to what this extension supported. And due to the limitation, some features may not work as your expect. Remember to recheck the settings after importing. The imported settings may replace your current settings. Are you sure you want to import this file?',
    },
    configImportSuccessTitle: { cn: '设置导入完成', tw: '設定匯入完成', en: 'Import settings completed' },
    configImportSuccess: { cn: '已经成功地导入了设置', tw: '已经成功地匯入了設定', en: 'Successfully imported settings' },
    configImportFailTitle: { cn: '设置导入失败', tw: '設定匯入失败', en: 'Import settings failed' },
    configImportFail: {
      cn: '导入设置文件时出现错误，可能是使用了错误的文件，文件已损坏或文件的版本不支持',
      tw: '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案已損壞或為不支援的版本',
      en: 'Error occurred during importing process. Wrong file may be used, the file may be broken, or the version of setting file may not be supported.',
    },
    configExportButton: { cn: '导出', tw: '匯出', en: 'Export' },
    configResetButton: { cn: '重置', tw: '重設', en: 'Reset' },
    configResetWarningTitle: { cn: '设置重置', tw: '設定重設', en: 'Setting Reset' },
    configResetWarning: {
      cn: '这将会清空您当前的所有配置，之前检查和备份的关注列表、手动隐藏的微博编号等不会受到影响。确实要重置设置吗？',
      tw: '這將會清空您當前的所有設定，之前檢查和備份的關注清單、手動隱藏的微博編號等不會受到影響。您確定要重置設定嗎？',
      en: 'You are deleting all your settings. Following list, feeds hidden manually will be kept as is. Are you sure you want to reset your settings?',
    },
    configFilename: {
      cn: '药方设置',
      tw: '藥方設定',
      en: 'yaofang-config',
    },
    configImportWbpButton: {
      cn: '从“眼不见心不烦”导入',
      tw: '從「眼不見心不煩」匯入',
      en: 'Import from "眼不见心不烦"',
    },
  });

  let wbpConfig = null;

  backup.importExport = rule.Rule({
    v7Support: true,
    id: 'script_import_export',
    version: 1,
    parent: backup.backup,
    render() {
      const rule = this;
      const container = document.createElement('span');
      container.className = 'yawf-config-item yawf-config-rule';
      container.innerHTML = '<input type="file" style=" width: 1px; height: 1px; margin: 0 -1px 0 0; opacity: 0;" /><button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-import"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button><button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-export"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button><button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-reset"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>';
      const importInput = container.querySelector('input');
      const importButton = container.querySelector('.yawf-import');
      const exportButton = container.querySelector('.yawf-export');
      const resetButton = container.querySelector('.yawf-reset');
      importButton.querySelector('.woo-button-content').textContent = i18n.configImportButton;
      exportButton.querySelector('.woo-button-content').textContent = i18n.configExportButton;
      resetButton.querySelector('.woo-button-content').textContent = i18n.configResetButton;
      const readFile = async function (file) {
        if (file.size > (1 << 24)) throw new RangeError();
        return new Promise(resolve => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            resolve(reader.result);
          });
          reader.readAsArrayBuffer(file);
        });
      };
      const importData = async function ({ config, source }) {
        if (!config) {
          ui.alert({
            id: 'yawf-import-failed',
            icon: 'warn',
            title: i18n.configImportFailTitle,
            text: i18n.configImportFail,
          });
          return;
        }
        const confirmAnswer = await ui.confirm({
          id: 'yawf-import-confirm',
          title: i18n.configImportWarningTitle,
          text: source ?
            i18n.configImportWarningExternal.replace('{}', () => source) :
            i18n.configImportWarning,
        });
        if (!confirmAnswer) return;
        await rule.configPool.importConfig(config);
        await ui.alert({
          id: 'yawf-import-success',
          icon: 'succ',
          title: i18n.configImportSuccessTitle,
          text: i18n.configImportSuccess,
        });
        about.update.whatsNew.execute();
      };
      importInput.addEventListener('change', async event => {
        const file = importInput.files[0];
        importInput.value = null;
        let config = null, source = null;
        try {
          const fileContent = await readFile(file);
          ({ config, source } = importer.parse(fileContent));
        } catch (e) {
          // 读取文件失败，在下面报错
        }
        importData({ config, source });
      });
      importButton.addEventListener('click', event => {
        importInput.click();
      });
      exportButton.addEventListener('click', event => {
        if (exportButton.classList.contains('yawf-export-busy')) return;
        exportButton.classList.add('yawf-export-busy');
        const config = rule.configPool.export();
        const { name, version } = browser.runtime.getManifest();
        const [major, minor, micro] = version.split('.');
        // 脚本版用的是 yawf, conf, ver，换一套键值可以区分版本以及避免被不支持的脚本版导入
        const data = {
          yaofang: name,
          version: { major, minor, micro },
          userAgent: navigator.userAgent,
          config,
        };
        const text = JSON.stringify(data, null, 2);
        const blob = new Blob([text], { type: 'application/json' });
        const username = init.page.config.user.screen_name;
        const date = new Date();
        const dateStr = date.toISOString().replace(/-|T.*/g, '');
        const filename = download.filename(`${username}-${i18n.configFilename}-${dateStr}.json`);
        const finishDownload = function () {
          exportButton.classList.remove('yawf-export-busy');
        };
        download.blob({ blob, filename }).then(download => {
          if (!download?.show) {
            finishDownload();
          } else {
            setTimeout(() => {
              download.show();
              finishDownload();
            }, 500);
          }
        }, finishDownload);
      });
      resetButton.addEventListener('click', async event => {
        const confirmAnswer = await ui.confirm({
          id: 'yawf-reset-confirm',
          title: i18n.configResetWarningTitle,
          text: i18n.configResetWarning,
        });
        if (!confirmAnswer) return;
        await rule.configPool.reset();
        about.update.whatsNew.execute();
        location.reload();
      });
      if (wbpConfig) try {
        const wrap = document.createElement('div');
        wrap.innerHTML = '<button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-import-wbp"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>';
        const importWbpButton = wrap.querySelector('.yawf-import-wbp');
        importWbpButton.querySelector('.woo-button-content').textContent = i18n.configImportWbpButton;
        importWbpButton.addEventListener('click', event => {
          importData(wbpConfig);
        });
        container.append(...wrap.childNodes);
      } catch (e) {
        // 似乎不能导入，那就不管他了
      }
      return container;
    },
  });

  css.append(`
.yawf-export, .yawf-reset, .yawf-import-wbp { margin-left: 10px; }
.yawf-export-busy { cursor: progress; }
`);

  ; (function () {
    document.addEventListener('wbpPost', function getData(event) {
      try {
        const data = JSON.parse(event.detail.slice(event.detail.indexOf('=') + 1));
        wbpConfig = importer.ybjxbfConvert(data);
      } catch (e) {
        // 可能是数据损坏，总之不管他
      }
    });
  }());

}());
//#endregion
//#region custom implementation clean old
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const ui = util.ui;

  const about = yawf.rules.about;

  const i18n = util.i18n;

  const backup = about.backup;

  Object.assign(i18n, {
    configCleanV3Button: {
      cn: '清理旧版数据',
      tw: '清理舊版資料',
      en: 'Old version data clean up',
    },
    configCleanV3Title: {
      cn: '清理旧版数据',
      tw: '清理舊版資料',
      en: 'Old version data clean up',
    },
    configCleanV3Text: {
      cn: '您将要删除所有旧版数据，该操作无法撤消。确定要删除吗？',
      tw: '您將要刪除所有舊版資料，該動作無法復原。您確定要刪除嗎？',
      en: 'You are going to delete all old data. This action cannot be undo. Are you sure you want to delete?',
    },
  });

  ; (async function () {
    const keys = (await GM.listValues()).filter(key => !/sync::|local::/.test(key));
    if (!keys.length) return;
    backup.cleanV3 = rule.Rule({
      id: 'script_clean_v3',
      version: 1,
      parent: backup.backup,
      render() {
        const container = document.createElement('span');
        container.className = 'yawf-config-item yawf-config-rule';
        if (yawf.WEIBO_VERSION === 6) {
          container.innerHTML = '<a class="W_btn_b yawf-clean-v3" href="javascript:;"><span class="W_f14"></span></a>';
        } else {
          container.innerHTML = '<button class="woo-button-main woo-button-flat woo-button-primary woo-button-s woo-button-round woo-dialog-btn yawf-clean-v3"><span class="woo-button-wrap"><span class="woo-button-content"></span></span></button>';
        }
        const cleanButton = container.querySelector('.yawf-clean-v3');
        if (yawf.WEIBO_VERSION === 6) {
          cleanButton.querySelector('.W_f14').textContent = i18n.configCleanV3Button;
        } else {
          cleanButton.querySelector('.woo-button-content').textContent = i18n.configCleanV3Button;
        }
        cleanButton.addEventListener('click', async function () {
          const answer = await ui.confirm({
            id: 'yawf-clean-v3',
            icon: 'ask',
            title: i18n.configCleanV3Title,
            text: i18n.configCleanV3Text,
          });
          if (!answer) return;
          keys.forEach(key => { GM.deleteValue(key); });
          container.style.display = 'none';
        });
        return container;
      },
    });
  }());

}());
//#endregion
//#region replacement of yaofang://content/rule/about/whatsnew.js
; (function () {

  const browser = window.weBrowser;
  const yawf = window.yawf;
  const init = yawf.init;
  const util = yawf.util;
  const rule = yawf.rule;
  const config = yawf.config;
  const importer = yawf.importer;

  const ui = util.ui;
  const css = util.css;

  const about = yawf.rules.about;

  const i18n = util.i18n;
  i18n.updateGroupTitle = {
    cn: '更新',
    en: 'Update',
  };

  const update = about.update = {};
  update.update = rule.Group({
    parent: about.about,
    template: () => i18n.updateGroupTitle,
  });

  Object.assign(i18n, {
    showWhatsNew: { cn: '更新后显示新功能提示', tw: '更新後顯示新功能提示', en: 'Show new features after update' },
    installSuccessTitle: { cn: '药方 (YAWF) 安装成功', tw: '藥方 (YAWF) 安裝成功', en: 'YAWF Installation successed' },
    installSuccessTextV6: {
      cn: '感谢您安装药方 (YAWF) 脚本。您可以点击右上角的漏斗图标打开设置。此外您还可以选中并拖拽关键词、帐号、话题、来源等内容到网页右上角，快速创建规则。',
      tw: '感謝您安裝藥方 (YAWF) 腳本。您可以點擊右上角的漏斗圖示打開設定。此外您還可以選中並拖拽關鍵字、帳號、話題、來源等內容到網頁右上角，快速創建規則。',
      en: 'Thank you for installing YAWF. You can click on the funnel icon at the top-right corner to open up filter setting menu. You may also quickly create filters by dragging and dropping keywords, accounts, topics and sources to the top-right corner.',
    },
    installSuccessTextV7: {
      cn: '感谢您安装药方 (YAWF) 扩展。您可以在右上角齿轮图标的菜单中找到药方的设置。请注意，由于您正在使用微博 V7 新版，绝大部分功能目前尚不可用。药方 (YAWF) 是第三方工具，从未要求过付款使用或寻求过捐赠。',
    },
    updateSuccessTitle: { cn: '药方 (YAWF) 新功能提示', tw: '藥方 (YAWF) 新功能提示', en: "YAWF What's New" },
    updateSuccessHeader: { cn: '药方 (YAWF) 扩展已更新', tw: '藥方 (YAWF) 擴充套件已更新', en: 'Your YAWF extension has been updated' },
    updateSuccessDetail: { cn: '当前版本添加或更新了以下 {{count}} 项功能', tw: '當前版本添加或更新了以下 {{count}} 項功能', en: 'The current version has added or updated the following {{count}} feature(s)' },
    importV3SuccessTitle: {
      cn: 'Yet Another Weibo Filter (药方) 已升级至新版',
      tw: 'Yet Another Weibo Filter (藥方) 已升級至新版',
      en: 'Yet Another Weibo Filter (YAWF) Updated',
    },
    importV3SuccessText: {
      cn: 'Yet Another Weibo Filter (药方) 已升级至 4.0 版。为使您获得更好的使用效果，这版脚本经过完全重写。由于这一版改动较大，少数功能（如正则表达式）和之前不尽相同。脚本已从旧版导入设置，但我们仍建议您打开设置复查一下。如果您使用 Firefox 浏览器，现在还可选择药方扩展版，在扩展网站（AMO）搜索 YAWF 即可找到。',
      hk: 'Yet Another Weibo Filter (藥方) 已升級至 4.0 版。為使您獲得更好的使用效果，這版腳本經過完全重做。由於這一版改動較大，少數功能（如正則表達式）和之前不盡相同。腳本已從舊版導入設置，但我們仍建議您打開設定以複查。如果您使用  Firefox 瀏覽器，現在還可選擇藥方擴展版，在擴展網站（AMO）搜尋 YAWF 即可找到。',
      tw: 'Yet Another Weibo Filter (藥方) 已升級至 4.0 版。為使您獲得更好的使用效果，這版腳本經過完全重做。由於這一版改動較大，少數功能（如正規表示式）和之前不盡相同。腳本已從舊版導入設置，但我們仍建議您打開設定以複查。如果您使用  Firefox 瀏覽器，現在還可選擇藥方擴展版，在擴展網站（AMO）搜尋 YAWF 即可找到。',
      en: 'Yet Another Weibo Filter (YAWF) The script had been upgraded to version 4.0. For better user experience, the script is completely rewritten. Some features (e.g. regexp matching) is slightly different from previous version. Most settings are imported from old version. And you are still welcomed to check out the setting panel. Firefox users may try our new extension version by searching YAWF on AMO.',
    },
    weiboVersionTitle: { cn: '微博新版（V7）' },
    weiboVersion6To7: { cn: '您已更换到微博新版（V7），您可以在右上角齿轮图标的菜单中找到药方（YAWF）的设置。还请注意药方（YAWF）目前大部分功能无法支持新版。此外如果您希望药方（YAWF）能尽快更新支持新版，欢迎到项目主页贡献代码。' },
    weiboVersion7To6: { cn: '您已退回到微博旧版（V6）。如果您对药方（YAWF）有任何问题，您可以联系 @YAWF脚本 ，此外欢迎到项目主页贡献代码。' },
  });

  update.whatsNew = rule.Rule({
    weiboVersion: [6, 7],
    id: 'script_update_whatsnew',
    version: 1,
    parent: update.update,
    initial: true,
    template: () => i18n.showWhatsNew,
    ref: {
      last: { type: 'number', initial: 0 },
      lastWeibo: { type: 'number', initial: 0 },
    },
    async init() {
      // 这个功能需要显示对话框
      // 对话框需要页面加载完成才能显示
      if (!['complete', 'loaded', 'interactive'].includes(document.readyState)) {
        await new Promise(resolve => document.addEventListener('DOMContentLoaded', resolve));
      }
      const whatsNew = this;
      const currentVersion = Number(browser.runtime.getManifest().version.match(/\d+$/g));
      const lastVersion = this.ref.last.getConfig();
      const lastWeiboVersion = this.ref.lastWeibo.getConfig();
      const updateDone = () => { this.ref.last.setConfig(currentVersion); };
      if (lastWeiboVersion && yawf.WEIBO_VERSION !== lastWeiboVersion) {
        // ui.alert({
        //   id: 'yawf-weibo-version',
        //   title: i18n.weiboVersionTitle,
        //   text: yawf.WEIBO_VERSION === 6 ? i18n.weiboVersion7To6 : i18n.weiboVersion6To7,
        // }).then(() => {
          this.ref.lastWeibo.setConfig(yawf.WEIBO_VERSION);
        // });
      } else if (!lastWeiboVersion) {
        this.ref.lastWeibo.setConfig(yawf.WEIBO_VERSION);
      }
      if (!lastVersion) {
        // 初次运行，也可能是从 v3 升级上来的
        try {
          // 导入设置
          const v3Config = JSON.parse(await GM.getValue(`user${yawf.init.page.$CONFIG.uid}config`));
          const fileContent = new TextEncoder().encode(JSON.stringify({ yawf: 'Yet Another Weibo Filter', ver: '3', conf: v3Config })).buffer;
          const { config: newConfig } = importer.parse(fileContent);
          if (newConfig) await this.configPool.import(newConfig);
          else throw new Error('Import from v3 failed.');
          // 导入关注信息

          try {
            const uid = init.page.$CONFIG.uid;
            const [last, notice] = (await Promise.all([
              GM.getValue(`following_info_${uid}`, '{}'),
              GM.getValue(`following_notice_${uid}`, '{}'),
            ])).map(data => {
              try { return JSON.parse(data); } catch (e) { return {}; }
            });
            /** @type {Array} */
            const list = last.following;
            ((notice || {}).add || []).forEach(u => {
              const pos = list.find(v => v.id === u.id);
              if (pos !== -1) list.splice(pos, 1);
            });
            ((notice || {}).lost || []).forEach(u => {
              const pos = list.find(v => v.id === u.id);
              if (pos === -1) list.append(u);
            });
            const timestamp = last.timestamp;

            const newList = list.map(item => (({
              user: old => ({
                id: `user-${old.user}`,
                type: 'user',
                user: old.user,
                url: old.href,
                avatar: old.avatar,
                name: old.name.replace(/ \(.*\)$/g, ''),
                description: old.description,
              }),
              stock: old => ({
                id: `stock-${old.stock}`,
                type: 'stock',
                stock: old.stock,
                url: old.href,
                avatar: old.avatar,
                name: `$${old.stock}$`,
                description: `$${old.stock}$`,
              }),
              topic: old => ({
                id: `topic-${old.topic}`,
                type: 'topic',
                topic: old.topic,
                url: old.href,
                avatar: old.avatar,
                name: `#${old.topic}#`,
                description: `#${old.topic}#`,
              }),
            }[item.type] || (old => ({
              id: 'unknown-' + old.href,
              type: 'unknown',
              url: old.href,
              avatar: old.avatar,
              description: old.description.slice(1),
              name: old.description.slice(1),
            })))(item)));
            const followConfig = await config.pool('Follow', { uid });
            const lastList = new rule.class.OffscreenConfigItem({ id: 'lastList', configPool: followConfig });
            const lastChange = new rule.class.OffscreenConfigItem({ id: 'lastChange', configPool: followConfig });
            lastList.setConfig({ timestamp, list: newList });
            lastChange.setConfig(null);
          } catch (followException) {
            util.debug('Failed to import following info.', followException);
          }

          // 导入成功
          await ui.alert({
            id: 'yawf-upgrade-from-3',
            title: i18n.importV3SuccessTitle,
            text: i18n.importV3SuccessText,
          }).then(() => {
            updateDone();
          });
          setTimeout(() => { location.reload(); }, 0);
        } catch (e) {
          await ui.alert({
            id: 'yawf-first-seen',
            title: i18n.installSuccessTitle,
            text: yawf.WEIBO_VERSION === 6 ? i18n.installSuccessTextV6 : i18n.installSuccessTextV7,
          }).then(() => {
            updateDone();
          });
        }
        return;
      } else if (currentVersion < lastVersion) {
        // 当前版本比历史版本更旧，可能是回退了版本，直接更新版本号
        updateDone();
        return;
      } else if (currentVersion === lastVersion) {
        return;
      } else if (!whatsNew.isEnabled()) {
        updateDone();
        return;
      }
      const ruleItems = rule.query({
        filter(item) {
          return item.version && item.version > lastVersion && item.version <= currentVersion;
        },
      });
      if (!ruleItems.length) {
        updateDone();
        return;
      }
      const whatsNewDialog = ui.dialog({
        id: 'yawf-whatsnew',
        title: i18n.updateSuccessTitle,
        render(container) {
          container.innerHTML = '<div class="yawf-whatsnew-dialog"><div class="yawf-whatsnew-header"></div><div class="yawf-whatsnew-body"></div><div class="yawf-whatsnew-footer"><hr /></div></div>';
          const header = container.querySelector('.yawf-whatsnew-header');
          const body = container.querySelector('.yawf-whatsnew-body');
          const footer = container.querySelector('.yawf-whatsnew-footer');
          header.textContent = i18n.updateSuccessHeader;
          body.textContent = i18n.updateSuccessDetail.replace('{{count}}', ruleItems.length);
          rule.render(body, ruleItems);
          footer.appendChild(whatsNew.render());
        },
        button: {
          close() {
            whatsNewDialog.hide();
            whatsNew.ref.last.setConfig(currentVersion);
          },
        },
      });
      if (init.page.type() === 'search') return;
      whatsNewDialog.show();
    },
  });

  css.append(`
.yawf-whatsnew-dialog { padding: 20px; width: 600px; } 
.yawf-whatsnew-header { font-size: 140%; }
.yawf-whatsnew-body { height: 300px; overflow: auto; margin: 0 -20px; padding: 0 20px; }
`);

}());
//#endregion
//#region @require yaofang://content/rule/about/debug.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const feedParser = yawf.feed;

  const about = yawf.rules.about;

  const i18n = util.i18n;
  i18n.debugGroupTitle = {
    cn: '调试',
    tw: '偵錯',
    en: 'Debug',
  };

  const debug = about.debug = {};
  debug.debug = rule.Group({
    parent: about.about,
    template: () => i18n.debugGroupTitle,
  });

  i18n.debugText = {
    cn: '在控制台打印调试信息',
    tw: '在控制台列印偵錯訊息',
    en: 'Log debug info to console',
  };

  debug.enable = rule.Rule({
    v7Support: true,
    id: 'script_enable_debug',
    version: 1,
    parent: debug.debug,
    template: () => i18n.debugText,
    ainit: function () {
      util.debug.setEnabled(this.isEnabled());
    },
  });

  i18n.debugRegex = {
    cn: '在控制台打印每条微博用于正则表达式匹配时识别的文字',
    hk: '在控制台列印每條微博用於正則表達式匹配時識別的文字',
    tw: '在控制台列印每條微博用於正規表示式匹配時識別的文字',
    en: 'Show recognized texts for regex rules of each feeds in console',
  };

  debug.regex = rule.Rule({
    id: 'script_debug_regex',
    version: 1,
    parent: debug.debug,
    template: () => i18n.debugRegex,
    ainit: function () {
      observer.feed.filter(function regexDebugger(feed) {
        const text = feedParser.text.detail(feed);
        const json = JSON.stringify(text).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
        console.log('%o\n%o', feed, json);
        return null;
      }, { priority: 1e7 });
    },
  });

}());
//#endregion
//#region replacement of yaofang://content/rule/about/script.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;

  const about = yawf.rules.about;

  const i18n = util.i18n;
  i18n.aboutScriptGroupTitle = {
    cn: '关于',
    hk: '關於',
    tw: '關於',
    en: 'About',
  };

  const script = about.script = {};
  script.script = rule.Group({
    parent: about.about,
    template: () => i18n.aboutScriptGroupTitle,
  });

  Object.assign(i18n, {
    aboutText: {
      cn: '{{logo}}Yet Another Weibo Filter (药方) {{version}}{{br}}作者{{author}}，您可以关注 {{scriptWeibo}} 了解用户脚本的最新变化。{{br}}如果您在使用过程中遇到任何脚本的错误，或对脚本有任何建议，欢迎到 {{issuePage}} 反馈，或私信 {{scriptWeibo}}。{{br}}脚本使用 MPL-2.0 协议开放源代码，您可以在 {{github}} 上查阅。欢迎贡献代码。',
      tw: '{{logo}}Yet Another Weibo Filter (藥方) {{version}}{{br}}作者{{author}}，您可以關注 {{scriptWeibo}} 了解使用者腳本的最新變化。{{br}}如果您在使用過程中遇到任何腳本的錯誤，或對其有任何建議，歡迎到 {{issuePage}} 回饋，或聯繫 {{scriptWeibo}}。{{br}}腳本以 MPL-2.0 協定開放原始碼，您可以在 {{github}} 上查閱。歡迎貢獻原始碼。',
      en: '{{logo}}Yet Another Weibo Filter (YAWF) {{version}}{{br}}Created by {{author}}. You may follow {{scriptWeibo}} for last updates info.{{br}}You may report errors and give suggestions on {{issuePage}}, or send private message to {{scriptWeibo}}.{{br}}This extension is released under MPL-2.0 license. You may get its source from {{github}}. Contributions are welcomed.',
    },
    aboutIssueTracker: {
      cn: '议题跟踪器',
      tw: '議題追踪器',
      en: 'issue tracker',
    },
    aboutGithubRepo: {
      cn: 'GitHub 仓库',
      tw: 'GitHub 存放庫',
      en: 'GitHub repository',
    },
    userScriptVersion: {
      cn: '{1} （用户脚本）',
      tw: '{1} （使用者腳本）',
      en: '{1} （User Script）',
    },
  });

  script.text = rule.Text({
    weiboVersion: [6, 7],
    parent: script.script,
    template: () => i18n.aboutText,
    ref: {
      br: {
        render() {
          return document.createElement('br');
        },
      },
      version: {
        render() {
          const version = GM.info.script.version;
          return document.createTextNode(i18n.userScriptVersion.replace('{1}', version));
        },
      },
      author: {
        render() {
          const link = document.createElement('a');
          link.href = 'https://weibo.com/tsh90';
          link.title = 'tsh90';
          link.textContent = '@tsh90';
          link.setAttribute('usercard', 'id=3921589057');
          return link;
        },
      },
      scriptWeibo: {
        render() {
          const link = document.createElement('a');
          link.href = 'https://weibo.com/yawfscript';
          link.title = 'YAWF脚本';
          link.textContent = '@YAWF脚本';
          link.setAttribute('usercard', 'id=5601033111');
          return link;
        },
      },
      logo: {
        render() {
          const container = document.createElement('span');
          container.style.cssFloat = 'right';
          const image = new Image(64, 64);
          image.src = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgOTYgOTYiIHdpZHRoPSI5NiIgaGVpZ2h0PSI5NiI+CiAgPHBhdGggZmlsbD0iI0Q5MkQzQSIgZD0iTTEyLDU0YzExLjY4Ny0wLjU3NiwyMS4xOTctMC4xNDMsMjQuNzUsNy41YzMuMzk4LDUuNzAxLDAuMTkxLDEzLjA3NS0xLjUsMThjMy45MzYsMC43MDUsNi4xNjQsMi4wMTIsOC4yNSw0LjVjLTEwLjQ5OSwwLTIxLjAwMSwwLTMxLjUsMEMxMiw3NC4wMDEsMTIsNjMuOTk5LDEyLDU0eiIvPgogIDxwYXRoIGZpbGw9IiNFOThENDkiIGQ9Ik03MS4zNjYsMjguOTExYy0xMS4yMDQtMTMuMjYtMjcuNzMtMTguMzE1LTQyLjk4NC0xNC44NTNoLTAuMDA2Yy0zLjUzLDAuODA3LTUuNzgsNC41MTMtNS4wMjQsOC4yNzRjMC43NTIsMy43NjQsNC4yMjQsNi4xNjksNy43NTMsNS4zNjZjMTAuODUyLTIuNDYsMjIuNTk1LDEuMTM4LDMwLjU2LDEwLjU1OGM3Ljk1Nyw5LjQxOSwxMC4xMTksMjIuMjY2LDYuNzExLDMzLjUyOGwwLjAwMiwwLjAwMmMtMS4xMTEsMy42NjksMC43NjksNy41OTMsNC4yMSw4Ljc3OWMzLjQyNywxLjE4NSw3LjExMS0wLjgxOSw4LjIyMy00LjQ3OWMwLTAuMDA3LDAtMC4wMjEsMC4wMDItMC4wMjdDODUuNTk1LDYwLjIxNyw4Mi41NzQsNDIuMTU4LDcxLjM2NiwyOC45MTFNNTQuMTYxLDQ1LjQ4NmMtNS40NTMtNi40NTgtMTMuNTA1LTguOTExLTIwLjkzOC03LjIyNGMtMy4wMzgsMC42OTEtNC45NzQsMy44ODMtNC4zMjIsNy4xMjhjMC42NSwzLjIzMiwzLjYzNyw1LjMwOSw2LjY2OCw0LjYwNXYwLjAwN2MzLjYzMy0wLjgyLDcuNTczLDAuMzc2LDEwLjIzOSwzLjUyN2MyLjY2OSwzLjE1OCwzLjM4Niw3LjQ2LDIuMjQxLDExLjIzNWgwLjAwNmMtMC45NTIsMy4xNTEsMC42NjQsNi41MzksMy42MTgsNy41NmMyLjk1NSwxLjAxLDYuMTI1LTAuNzEsNy4wNzktMy44NjlDNjEuMDg2LDYwLjczOSw1OS42MjUsNTEuOTQzLDU0LjE2MSw0NS40ODYiLz4KPC9zdmc+Cg==';
          container.appendChild(image);
          return container;
        },
      },
      issuePage: {
        render() {
          const url = 'https://github.com/tiansh/yaofang/issues';
          const link = document.createElement('a');
          link.href = url;
          link.textContent = i18n.aboutIssueTracker;
          link.target = '_blank';
          return link;
        },
      },
      github: {
        render() {
          const url = 'https://github.com/tiansh/yaofang';
          const link = document.createElement('a');
          link.href = url;
          link.textContent = i18n.aboutGithubRepo;
          link.target = '_blank';
          return link;
        },
      },
    },
  });

}());
//#endregion
//#region @require yaofang://content/main/entry.js
// 这个文件用于向界面上添加菜单项
; (function () {
  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init;
  const rule = yawf.rule;

  const showRuleDialog = function (tab = null) {
    try {
      rule.dialog(tab);
    } catch (e) { util.debug('Error while prompting dialog: %o', e); }
  };

  init.onLoad(() => {
    util.inject(function (rootKey, showRuleDialog) {
      const yawf = window[rootKey];
      const vueSetup = yawf.vueSetup;

      vueSetup.eachComponentVM('weibo-top-nav', function (vm) {
        vm.configs.splice(-1, 0, {
          divider: true,
          href: '',
          name: '药方设置',
          type: 'yawf-config',
        });
        vm.configHandle = (function (configHandle) {
          return function (index) {
            if (this.configs[index].type === 'yawf-config') {
              this.configClose = true;
              showRuleDialog();
            } else {
              configHandle.call(this, index);
            }
          }.bind(vm);
        }(vm.configHandle));
      });
    }, util.inject.rootKey, showRuleDialog);
  });

}());
//#endregion

