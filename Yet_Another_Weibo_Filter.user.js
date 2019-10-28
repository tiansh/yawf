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
// @version           4.0.52
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
// @exclude           https://api.weibo.com/chat*
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

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};
  const functools = util.functools = util.functools || {};

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

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};
  const urls = util.urls = util.urls || {};

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

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};

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

  const yawf = window.yawf = window.yawf || {};
  const env = yawf.env;
  const util = yawf.util = yawf.util || {};

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

}());
//#endregion
//#region @require yaofang://content/util/i18n.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};

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
      else return false;
      util.language = language;
      return true;
    },
  });

}());
//#endregion
//#region @require yaofang://content/util/strings.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util = yawf.util || {};

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

}());
//#endregion
//#region @require yaofang://content/util/css.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};
  const css = util.css = util.css || {};

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

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};

  util.inject = function (func, ...args) {
    const executeScript = `void(${func}(${args.map(value => JSON.stringify(value))}));`;
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

}());
//#endregion
//#region @require yaofang://content/util/keyboard.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};
  const keyboard = util.keyboard = {};

  const CTRL = 2 ** 32, SHIFT = CTRL * 2, ALT = SHIFT * 2, META = ALT * 2, KEY = CTRL - 1, MAX = META * 2 - 1;
  const namelist = '#0;#1;#2;Cancel;#4;#5;Help;#7;BackSpace;TAB;#10;#11;Clear;Enter;EnterSpecial;#15;;;;Pause;CapsLock;Kana;Eisu;Junja;Final;Hanja;#26;Esc;Convert;Nonconvert;Accept;ModeChange;Space;PageUp;PageDown;End;Home;Left;Up;Right;Down;Select;Print;Execute;PrintScreen;Insert;Delete;#47;0;1;2;3;4;5;6;7;8;9;Colon;Semicolon;LessThan;Equals;GreaterThan;QuestionMark;At;A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z;Win;#92;ContextMenu;#94;Sleep;NumPad0;NumPad1;NumPad2;NumPad3;NumPad4;NumPad5;NumPad6;NumPad7;NumPad8;NumPad9;Multiply;Add;Separator;Subtract;Decimal;Divide;F1;F2;F3;F4;F5;F6;F7;F8;F9;F10;F11;F12;F13;F14;F15;F16;F17;F18;F19;F20;F21;F22;F23;F24;#136;#137;#138;#139;#140;#141;#142;#143;NumLock;ScrollLocK;WIN_OEM_FJ_JISHO;WIN_OEM_FJ_MASSHOU;WIN_OEM_FJ_TOUROKU;WIN_OEM_FJ_LOYA;WIN_OEM_FJ_ROYA;#151;#152;#153;#154;#155;#156;#157;#158;#159;Circumflex;Exclamation;DoubleQuote;Hash;Dollar;Percent;Ampersand;Underscore;OpenParen;CloseParen;Asterisk;Plus;Pipe;HyphenMinus;OpenCurlyBracket;CloseCurlyBracket;Tilde;#177;#178;#179;#180;VolumeMute;VolumeDown;VolumeUp;#184;#185;#186;#187;Comma;#189;Period;Slash;BackQuote;#193;#194;#195;#196;#197;#198;#199;#200;#201;#202;#203;#204;#205;#206;#207;#208;#209;#210;#211;#212;#213;#214;#215;#216;#217;#218;OpenBracket;BackSlash;CloseBracket;Quote;#223;;AltGr;#226;WIN_ICO_HELP;WIN_ICO_00;#229;WIN_ICO_CLEAR;#231;#232;WIN_OEM_RESET;WIN_OEM_JUMP;WIN_OEM_PA1;WIN_OEM_PA2;WIN_OEM_PA3;WIN_OEM_WSCTRL;WIN_OEM_CUSEL;WIN_OEM_ATTN;WIN_OEM_FINISH;WIN_OEM_COPY;WIN_OEM_AUTO;WIN_OEM_ENLW;WIN_OEM_BACKTAB;Attn;Crsel;Exsel;Ereof;Play;Zoom;#252;PA1;WIN_OEM_CLEAR;#255'.split(';');

  // 一些常用常量
  keyboard.code = Object.assign(...namelist.map((name, index) => ({ [name.toUpperCase()]: index })));
  keyboard.alter = { CTRL, SHIFT, ALT, META, KEY, MAX };

  // 对一个按键事件做编号
  keyboard.event = function (e) {
    if (!e || !e.keyCode) return null;
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
  const util = yawf.util = yawf.util || {};

  const keyboard = util.keyboard;
  const i18n = util.i18n;
  const css = util.css;

  const ui = util.ui = util.ui || {};

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

  /**
   * 显示一个对话框
   * @param {{ id: string, title: string, render: Function, button: { [type: string]: Function? }? }}
   */
  ui.dialog = function ({ id, title, render, button }) {
    // 初始化 DOM
    const template = document.createElement('template');
    template.innerHTML = `
<div class="W_layer yawf-dialog">
  <div tabindex="0"></div>
  <div class="content" node-type="autoHeight">
    <div class="W_layer_title yawf-dialog-title" node-type="title"></div>
    <div class="W_layer_close"><a class="W_ficon ficon_close S_ficon yawf-dialog-close" href="javascript:void(0);" node-type="close">X</a></div>
    <div node-type="inner" class="yawf-dialog-content"></div>
    <div class="W_layer_btn S_bg1 yawf-dialog-buttons">
      <a href="javascript:void(0);" class="W_btn_a btn_34px yawf-dialog-button-ok" node-type="ok" action-type="ok"><span></span></a>
      <a href="javascript:void(0);" class="W_btn_b btn_34px yawf-dialog-button-cancel" node-type="cancel" action-type="cancel"><span></span></a>
    </div>
  </div>
</div>
`;
    const dialog = document.importNode(template.content.firstElementChild, true);
    dialog.id = id;
    const titleNode = dialog.querySelector('.yawf-dialog-title');
    const buttonCollectionNode = dialog.querySelector('.yawf-dialog-buttons');
    const okButton = dialog.querySelector('.yawf-dialog-button-ok');
    const cancelButton = dialog.querySelector('.yawf-dialog-button-cancel');
    const closeButton = dialog.querySelector('.yawf-dialog-close');
    const contentNode = dialog.querySelector('.yawf-dialog-content');
    // 填入内容
    titleNode.textContent = title;
    okButton.textContent = i18n.okButtonTitle;
    cancelButton.textContent = i18n.cancelButtonTitle;
    closeButton.title = i18n.closeButtonTitle;
    render(contentNode, Object.assign(...[
      { close: closeButton },
      button && button.ok ? { ok: okButton } : {},
      button && button.cancel ? { cancel: cancelButton } : {},
    ]));
    // 定位对话框的位置
    const lastPos = { x: 0, y: 0 };
    const setPos = function ({ x, y }) {
      const left = Math.min(Math.max(0, x), document.body.clientWidth - dialog.clientWidth - 2);
      const top = Math.min(Math.max(window.pageYOffset, y), window.pageYOffset + window.innerHeight - dialog.clientHeight - 2);
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
          x: event.clientX - mouseStart.x,
          y: event.clientY - mouseStart.y,
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
          x: e.clientX - lastPos.x,
          y: e.clientY - lastPos.y,
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
    const cover = document.createElement('div');
    cover.setAttribute('node-type', 'outer');
    cover.className = 'yawf-dialog-outer';
    // 响应鼠标
    if (!button || !button.ok && !button.cancel) {
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
      (button && button.close || hide)();
    });
    // 响应按键
    const keys = event => {
      if (!event.isTrusted) return;
      const code = keyboard.event(event);
      if (code === keyboard.code.ENTER && button && button.ok) button.ok(event);
      else if (code === keyboard.code.ESC) {
        (button && (button.cancel || button.close) || (() => hide()))(event);
      } else return;
      event.stopPropagation();
      event.preventDefault();
    };
    // 关闭对话框
    const hide = function () {
      dialog.classList.add('UI_animated', 'UI_speed_fast', 'UI_ani_bounceOut');
      document.removeEventListener('keydown', keys);
      document.removeEventListener('scroll', resetPos);
      window.removeEventListener('resize', resetPos);
      document.body.removeChild(cover);
      setTimeout(function () { document.body.removeChild(dialog); }, 200);
    };
    // 显示对话框
    const show = function ({ x, y } = {}) {
      document.body.appendChild(cover);
      document.body.appendChild(dialog);
      if (x == null) x = (window.innerWidth - dialog.clientWidth) / 2;
      if (y == null) y = (window.innerHeight - dialog.clientHeight) / 2;
      setPos({ x, y: y + window.pageYOffset });
      document.addEventListener('keydown', keys);
      document.addEventListener('scroll', resetPos);
      window.addEventListener('resize', resetPos);
      document.activeElement.blur();
      dialog.classList.remove('UI_ani_bounceOut');
      dialog.classList.add('UI_animated', 'UI_speed_fast', 'UI_ani_bounceIn');
      setTimeout(function () {
        dialog.classList.remove('UI_animated', 'UI_speed_fast', 'UI_ani_bounceIn');
      }, 200);
    };
    return { hide, show, dom: dialog };
  };

  const predefinedDialog = (buttons, { icon: defaultIcon }) => {
    /**
     * @param {{ id: string, title: string, text: string, icon: string }}
     * @returns {Promise<boolean?>}
     */
    const inner = ({ id, title, text, icon = defaultIcon }) => new Promise(resolve => {
      const render = function (dom) {
        const template = document.createElement('template');
        template.innerHTML = `
<div class="layer_point">
  <dl class="point clearfix">
    <dt node-type="icon"><span class="W_icon yawf-dialog-icon"></span></dt>
    <dd node-type="text"><p class="S_txt1 yawf-dialog-text"></p></dd>
  </dl>
</div>
`;
        const content = document.importNode(template.content.firstElementChild, true);
        content.querySelector('.yawf-dialog-icon').classList.add(`icon_${icon}B`);
        content.querySelector('.yawf-dialog-text').textContent = text;
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
<div class="W_layer W_layer_pop yawf-bubble">
  <div class="content layer_mini_info">
    <div class="main_txt"></div>
    <div class="W_layer_arrow"><span class="W_arrow_bor" node-type="arrow"><i class="S_line3"></i><em class="S_bg2_br"></em></span><div></div></div>
  </div>
</div>
`;
      const bubble = document.importNode(template.content.firstElementChild, true);
      if (!(bubbleContent instanceof Node)) {
        bubbleContent = document.createTextNode(bubbleContent + '');
      }
      bubble.querySelector('.main_txt').appendChild(bubbleContent);
      return bubble;
    }());
    const arrow = bubble.querySelector('.W_arrow_bor');
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
      const left = rect.left - 32 + rect.width + window.pageXOffset;
      const atTop = top0 > 0;
      const top = atTop ? top1 : top2;
      const addClass = atTop ? 'W_arrow_bor_b' : 'W_arrow_bor_t';
      const removeClass = atTop ? 'W_arrow_bor_t' : 'W_arrow_bor_b';
      if (parseInt(bubble.style.left, 10) !== left) {
        bubble.style.left = left + 'px';
      }
      if (parseInt(bubble.style.top, 10) !== top) {
        bubble.style.top = top + 'px';
      }
      if (!arrow.classList.contains(addClass)) {
        arrow.classList.add(addClass);
      }
      if (arrow.classList.contains(removeClass)) {
        arrow.classList.remove(removeClass);
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


  css.append(`
.yawf-dialog-title {
  cursor: move;
}
.yawf-dialog-outer {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: none repeat scroll 0% 0% rgb(0, 0, 0);
  opacity: 0.3;
  z-index: 9999;
}
.yawf-dialog.yawf-drag {
  opacity: 0.67;
  -moz-user-select: none;
  -webkit-user-select: none;
  user-select: none;
}
.yawf-bubble {
  max-width: 400px;
}
`);

}());
//#endregion
//#region @require yaofang://content/util/dom.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};
  const dom = util.dom = util.dom || {};


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

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};

  const i18n = util.i18n;
  const time = util.time = {};

  Object.assign(i18n, {
    timeMonthDay: { cn: '{1}月{2}日 {3}:{4}', en: '{1}-{2} {3}:{4}' },
    timeToday: { cn: '今天', tw: '今天', en: 'Today' },
    timeMinuteBefore: { cn: '分钟前', tw: '分鐘前', en: ' mins ago' },
    timeSecondBefore: { cn: '秒前', tw: '秒前', en: ' secs ago' },
  });

  const timeToParts = (time, locale = true) => (
    new Date(time - new Date(time).getTimezoneOffset() * 6e4 * locale)
      .toISOString().match(/\d+/g)
  );

  time.parse = function (text) {
    let parseDate = null;
    const now = Date.now();
    const [cy, cm, cd] = timeToParts(now);
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

  time.format = function (time, format) {
    const ref = now();
    const [iy, im, id, ih, iu] = timeToParts(time);
    const [ny, nm, nd, nh, nu] = timeToParts(ref);
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
  const browser = window.browser = window.browser || {};
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

  const yawf = window.yawf = window.yawf || {};
  const network = yawf.network = {};

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
  const request = yawf.request = yawf.request || {};

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

  /**
   * @param {{id:number?,name:string?}}
   * @return {UserInfo}
   */
  const userInfo = async function userInfo({ id = null, name = null }) {
    if (!id && !name) throw TypeError('Request userinfo without id or name.');
    if (id && userInfoCacheById.has(id)) {
      return JSON.parse(JSON.stringify(userInfoCacheById.get(id)));
    }
    if (name && userInfoCacheByName.has(name)) {
      return JSON.parse(JSON.stringify(userInfoCacheByName.get(name)));
    }
    const url = new URL(baseUrl);
    url.searchParams.set('type', '1');
    url.searchParams.set('callback', network.fakeCallback());
    if (id) url.searchParams.set('id', id);
    else url.searchParams.set('name', name);
    try {
      util.debug('fetch url %s', url);
      const resp = await network.fetchText(url);
      // 我仍然无法理解一个使用 JSON 包裹 HTML 的 API
      const html = network.parseJson(resp).data;
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
  const request = yawf.request = yawf.request || {};

  const userSuggestCache = new Map();

  const userSuggestByTop = async function (key) {
    const url = new URL('https://s.weibo.com/ajax/topsuggest.php');
    url.searchParams.set('_k', network.getUniqueKey());
    url.searchParams.set('_t', 1);
    url.searchParams.set('_v', network.fakeCallback());
    url.searchParams.set('key', key);
    url.searchParams.set('uid', yawf.init.page.$CONFIG.uid);
    util.debug('fetch url %s', url);
    const resp = await network.fetchText(url);
    const users = Array.from((network.parseJson(resp).data || {}).user);
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
  const request = yawf.request = yawf.request || {};

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
  const request = yawf.request = yawf.request || {};

  // 这一次我们不再缓存长微博的原文了，因为现在微博神他妈可以编辑了
  const getLongText = async function (mid) {
    const url = new URL('https://weibo.com/p/aj/mblog/getlongtext');
    url.searchParams.set('ajwvr', 6);
    url.searchParams.set('mid', mid);
    url.searchParams.set('__rnd', +new Date());
    util.debug('fetch url %s', url);
    const resp = await network.fetchJson(url);
    const { html } = (resp || {}).data || {}; if (!html) return null;
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
  const network = yawf.network;
  const request = yawf.request = yawf.request || {};

  const i18n = util.i18n;
  const functools = util.functools;

  i18n.whisperGroupName = {
    cn: '悄悄关注',
  };

  const groupList = functools.once(async function () {
    const url = 'https://weibo.com/aj/f/group/list';
    util.debug('fetch url %s', url);
    const resp = await network.fetchJson(url);
    const groups = resp.data.map(function (group) {
      return {
        id: 'g' + group.gid,
        name: group.gname,
        type: 'group',
      };
    });
    const special = [{
      id: 'whisper',
      name: i18n.whisperGroupName,
      type: 'whisper',
    }];
    return [...special, ...groups];
  });
  request.groupList = groupList;

}());
//#endregion
//#region @require yaofang://content/request/feedsbygroup.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request || {};

  const dom = util.dom;

  class OrderMismatchCount {
    constructor() {
      this.buffer = [];
      this.lds = [1];
      this.ldsm = 0;
    }
    appendItems(items) {
      const buffer = this.buffer;
      const lds = this.lds;
      buffer.push(...items);
      for (let i = lds.length, l = buffer.length; i < l; i++) {
        let m = 1, v = buffer[i];
        for (let j = i - 1; j >= 0; j--) {
          let n = lds[j] + 1;
          if (v >= buffer[j]) continue;
          if (n > m) m = n;
        }
        lds[i] = m;
        if (m > this.ldsm) this.ldsm = m;
      }
    }
    errors() {
      return this.lds.length - this.ldsm;
    }
  }

  class FeedsByGroupLoader {
    constructor(group, params) {
      this.group = group;

      this.search = new URLSearchParams(params);
      ['gid', 'whisper', 'min_id', 'end_id'].forEach(key => this.search.delete(key));
      if (group.id.startsWith('g')) {
        this.search.set('gid', group.id.slice(1));
      } else if (group.id === 'whisper') {
        this.search.set('whisper', 1);
      }

      this.nextPage = 1;
      /** @type {{ type: "feed", date: number, mid: string, dom: Element }[]} */
      this.pendingFeeds = [];
      this.bufferSize = 20;
      this.orderMismatch = new OrderMismatchCount();
      /** @type {{ mid: string }[][]} */
      this.feedsByPage = [];
    }
    async peek() {
      await this.loadMore();
      return this.pendingFeeds[0];
    }
    async next() {
      await this.loadMore();
      return this.pendingFeeds.shift();
    }
    async hasNext() {
      await this.loadMore();
      return this.pendingFeeds.length > 0;
    }
    async loadMore() {
      if (this.nextPage === null) return;
      try {
        while (this.pendingFeeds.length < this.bufferSize) {
          const newLoaded = await this.loadNextPage();
          const errors = this.orderMismatch.errors();
          this.bufferSize = Math.max(this.bufferSize, errors * 3 + 20);
          if (!newLoaded) { this.nextPage = null; break; }
        }
      } catch (e) {
        this.nextPage = null;
      }
    }
    async loadNextPage() {
      this.nextPage++;
      const search = new URLSearchParams(this.search);
      if (this.feedsByPage.length) {
        const lastPage = this.feedsByPage[this.feedsByPage.length - 1];
        search.set('min_id', lastPage[0].mid);
        search.set('end_id', lastPage[lastPage.length - 1].mid);
      }
      const hostname = (location.hostname === 'www.weibo.com' ? 'www.' : '') + 'weibo.com';
      const url = `https://${hostname}/aj/mblog/fsearch?` + search;
      util.debug('fetch url %s', url);
      const result = await network.fetchJson(url);
      const container = document.createElement('div');
      dom.content(container, result.data);
      const feedElements = Array.from(container.querySelectorAll('.WB_feed_type[mid]'));
      const feeds = feedElements.map(item => {
        const dateitem = item.querySelector('[node-type="feed_list_item_date"][date]'); if (!dateitem) return null;
        const date = Number(dateitem.getAttribute('date')); if (!date) return null;
        const mid = item.getAttribute('mid'); if (!mid) return null;
        return { type: 'feed', date, mid, dom: item.cloneNode(true) };
      }).filter(feed => feed);
      this.feedsByPage.push(feeds);
      this.pendingFeeds.push(...feeds);
      this.pendingFeeds.sort((a, b) => b.date - a.date);
      this.orderMismatch.appendItems(feeds.map(({ date }) => date));
      return feeds.length;
    }
  }

  const feedsByGroup = function (group, params) {
    const loader = new FeedsByGroupLoader(group, params);
    return {
      next: () => loader.next(),
      hasNext: () => loader.hasNext(),
      peek: () => loader.peek(),
    };
  };
  request.feedsByGroup = feedsByGroup;

  class FeedsByGroupsLoader {
    constructor(groups, params) {
      this.loaders = Array.from(groups).map(group => new FeedsByGroupLoader(group, params));
      this.known = new Set();
    }
    async getLast() {
      const loaders = this.loaders;
      if (loaders.length === 0) return null;
      /** @type {{ loader: FeedsByGroupLoader, feed: { type: "feed", date: number, mid: string, dom: Element }|{ type: "done", group: { id: string } } }[]} */
      const feeds = (await Promise.all(loaders.map(async loader => {
        while (true) {
          const feed = await loader.peek();
          if (!feed) return { loader, feed: { type: 'done', group: loader.group } };
          if (!this.known.has(feed.mid)) {
            return { loader, feed };
          }
          await loader.next();
        }
      })));
      const empty = feeds.find(v => v.feed.type === 'done');
      if (empty) return empty;
      const last = feeds.reduce((a, b) => a.feed.date > b.feed.date ? a : b);
      return last;
    }
    async peek() {
      const { feed } = await this.getLast();
      return feed;
    }
    async next() {
      const { loader, feed } = await this.getLast();
      if (feed.type === 'feed') {
        await loader.next();
        this.known.add(feed.mid);
        return feed;
      } else {
        this.loaders.splice(this.loaders.indexOf(loader), 1);
        return feed;
      }
    }
    async hasNext() {
      return this.loaders.length > 0;
    }
    isShown(feed) {
      return this.known.has(feed.mid);
    }
    addShown(feed) {
      return this.known.add(feed.mid);
    }
  }

  const feedsByGroups = function (groups, params) {
    const loader = new FeedsByGroupsLoader(groups, params);
    return {
      next: () => loader.next(),
      hasNext: () => loader.hasNext(),
      peek: () => loader.peek(),
      isShown: feed => loader.isShown(feed),
      addShown: feed => loader.addShown(feed),
    };
  };
  request.feedsByGroups = feedsByGroups;

  class FeedsByGroupsUnreadCount {
    constructor(groups, stkInfo) {
      this.groups = Array.from(groups)
        .filter(group => group.id.startsWith('g'))
        .map(group => group.id.slice(1));
      this.stkInfo = stkInfo;
      this.callbacks = new Set();
      this.working = false;
      this.paused = false;
    }
    watch(callback) {
      this.callbacks.add(callback);
      if (!this.working) this.schedule();
    }
    unwatch(callback) {
      this.callbacks.delete(callback);
    }
    async schedule() {
      if (this.callbacks.size === 0) this.working = false;
      this.working = true;
      if (!this.paused) {
        const status = await this.check();
        setTimeout(() => { this.schedule(); }, 30e3);
        if (this.paused) return;
        this.callbacks.forEach(callback => {
          try {
            callback(status);
          } catch (e) {
            util.debug('Error while check unread feeds: %o', e);
          }
        });
      } else {
        setTimeout(() => { this.schedule(); }, 30e3);
      }
    }
    async check() {
      const url = new URL('https://rm.api.weibo.com/2/remind/unread_hint.json');
      url.searchParams.set('source', this.stkInfo.source);
      url.searchParams.set('with_url', 1);
      url.searchParams.set('appkeys', '');
      url.searchParams.set('group_ids', this.groups.join(','));
      url.searchParams.set('callback', network.fakeCallback());
      util.debug('Check unread by groups: %o', url);
      util.debug('fetch url %s', url);
      const resp = await network.fetchText(url);
      const data = network.parseJson(resp).data;
      const groupStatus = Object.assign(...data.groups);
      const result = Object.assign(...this.groups.map(group => ({ ['status_' + group]: Number(groupStatus[group]) })));
      result.status = this.groups.reduce((p, group) => p + groupStatus[group], 0);
      if (result.status) {
        util.debug('Check unread by groups got unread: %o', result.status);
      }
      return result;
    }
    pause() { this.paused = true; }
    run() { this.paused = false; }
  }

  const unreadByGroups = function (groups, stkInfo) {
    const loader = new FeedsByGroupsUnreadCount(groups, stkInfo);
    return {
      watch(callback) { loader.watch(callback); },
      unwatch(callback) { loader.unwatch(callback); },
      pause() { loader.pause(); },
      run() { loader.run(); },
    };
  };
  request.unreadByGroups = unreadByGroups;

}());
//#endregion
//#region @require yaofang://content/request/following.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const network = yawf.network;
  const request = yawf.request = yawf.request || {};

  const catched = f => function (...args) {
    try {
      return f.call(this, ...args);
    } catch (e) {
      util.debug(e); return null;
    }
  };

  const getFollowingPage = async function (uid, pageUrl) {
    const url = pageUrl || `https://weibo.com/${uid}/myfollow`;
    util.debug('Fetch Follow: fetch page %s', url);
    util.debug('fetch url %s', url);
    const resp = await network.fetchText(url);
    const re = /<script>FM\.view\({"ns":"pl\.relation\.myFollow\.index".*"html":(?=.*member_box)(".*")}\)<\/script>\n/;
    const dom = util.dom.content(document.createElement('div'), JSON.parse(resp.match(re)[1]));

    const allPages = (function () {
      try {
        const urlTemplate = dom.querySelector('.W_pages a.page[href]').href;
        const pageLinks = dom.querySelectorAll('.W_pages .page');
        const pageCount = Number(pageLinks[pageLinks.length - 2].textContent) || 1;

        return Array.from(Array(pageCount)).map((_, index) => {
          return urlTemplate.replace(/_page=\d+/, '_page=' + (index + 1));
        });
      } catch (e) {
        // only one page
      }
      return [url];
    }());

    const followItem = Array.from(dom.querySelectorAll('.member_box .member_wrap .mod_pic .pic_box a > img'));
    const followInPage = followItem.map(img => {
      const title = img.title;
      const avatar = new URL(img.src, 'https://weibo.com').href;
      return (catched(function () {
        // 关注了一个用户
        const id = new URLSearchParams(img.getAttribute('usercard') || '').get('id');
        if (!id) return null;
        const href = `https://weibo.com/u/${id}`;
        const name = img.getAttribute('alt');
        const description = name !== title ? `@${name} (${title})` : '@' + name;
        return {
          id: `user-${id}`,
          type: 'user',
          user: id,
          url: href,
          avatar,
          name,
          description,
        };
      })()) || (catched(function () {
        // 关注了一支股票
        const id = (img.parentNode.href.match(/weibo.com\/p\/230677([a-zA-Z\d]+)/) || [])[1];
        if (!id) return null;
        const href = `https://weibo.com/p/230677${id}`;
        const description = `$${title}$`;
        return {
          id: 'stock-' + id,
          type: 'stock',
          stock: id,
          url: href,
          avatar: avatar,
          name: description,
          description,
        };
      })()) || (catched(function () {
        // 关注了一个话题
        const ref = img.parentNode.href.match(/huati.weibo.com/);
        if (!ref) return null;
        // 原本的链接包含的是编号，这里换成话题文本，因为话题文本比编号更固定：编号可以被删除，文本无法修改
        const href = `https://weibo.com/k/${title}`;
        const description = `#${title}#`;
        return {
          id: 'topic-' + title,
          type: 'topic',
          topic: title,
          url: href,
          avatar: avatar,
          name: description,
          description: description,
        };
      })()) || (catched(function () {
        const link = img.closest('[href]');
        const href = link && link.getAttribute('href') || avatar;
        // 未知关注内容
        return {
          id: 'unknown-' + href,
          type: 'unknown',
          url: href,
          avatar: avatar,
          description: title,
          name: title,
        };
      })());
    });

    return { allPages, followInPage };
  };
  request.getFollowingPage = getFollowingPage;

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
  const request = yawf.request = yawf.request || {};

  const voteDetail = async function (voteId) {
    const url = new URL('https://vote.weibo.com/h5/index/index');
    url.searchParams.set('vote_id', voteId);
    util.debug('fetch url %s', url);
    const resp = await network.fetchText(url);
    const dom = (new DOMParser()).parseFromString(resp, 'text/html');
    const script = dom.querySelector('head script').textContent;
    const data = JSON.parse(script.match(/\{[\s\S]*\}/)[0]);
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
  const network = yawf.network;
  const request = yawf.request = yawf.request || {};

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

  const request = yawf.request = yawf.request || {};

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
  const request = yawf.request = yawf.request || {};

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
  const request = yawf.request = yawf.request || {};

  const time = util.time;

  const getAllImages = async function (mid) {
    const host = location.hostname;
    const url = new URL(`https://${host}/p/aj/v6/history?ajwvr=6&domain=100505`);
    url.searchParams.set('mid', mid);
    url.searchParams.set('page', 1);
    url.searchParams.set('page_size', 1);
    url.searchParams.set('__rnd', Date.now());
    util.debug('fetch url %s', url + '');
    const resp = await network.fetchJson(url + '');
    const data = resp.data;
    const dom = new DOMParser().parseFromString(data.html, 'text/html');
    const history = dom.querySelector('.WB_feed_detail');
    const imgs = Array.from(history.querySelectorAll('.WB_pic img'));
    return imgs.map(img => img.src.replace(/^https:/, ''));
  };
  request.getAllImages = getAllImages;

}());
//#endregion
//#region ployfill of browser.storage
; (function () {
  const browser = window.browser = window.browser || {};

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
      return Object.assign({}, ...keyList.map(({ key }, index) => ({ [key]: result[index] })));
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
    /*
    const logInvoke = function (f) {
      return async function (...args) {
        const input = JSON.parse(JSON.stringify(args));
        const result = await f(...args);
        console.log('Debug storage: %o(%o) -> %o', f.name, input, result);
        return result;
      };
    };
    return {
      get: logInvoke(get),
      getBytesInUse: logInvoke(getBytesInUse),
      set: logInvoke(set),
      remove: logInvoke(remove),
      clear: logInvoke(clear),
    };
    */
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

  const yawf = window.yawf = window.yawf || {};
  const util = yawf.util = yawf.util || {};

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
      const results = await this.run(() => (
        browser.storage[this.area].get(this.key)
      ));
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
      if (!callbacks || !callbacks.size) return;
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
    async import(data) {
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
//#endregion
//#region @require yaofang://content/storage/config.js
; (function () {

  const yawf = window.yawf = window.yawf || {};

  const util = yawf.util;
  const storage = yawf.storage;
  const config = yawf.config = yawf.config || {};
  const pools = config.pools = [];

  const i18n = util.i18n;

  config.init = async function (uid) {
    const userPromise = config.pool('Config', { uid });
    const globalPromise = config.pool('Config');
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
//#region @require yaofang://content/init/page.js
/*
 * 检查当前页面的类型
 */
; (function () {

  const yawf = window.yawf;
  const init = yawf.init = yawf.init || {};
  const page = init.page = init.page || {};

  page.type = function () {
    const search = new URLSearchParams(location.search);
    // 导览页面
    if (location.pathname.startsWith('/nguide')) return 'nguide';
    // 搜索页面
    if (location.host === 's.weibo.com') return 'search';
    // 发现页面
    if (location.host === 'd.weibo.com') return 'discover';
    // 首页
    if (/\/home$/.test(location.pathname)) {
      if (search.get('gid') > 0) return 'group';
      return 'home';
    }
    // 头条文章
    if (/\/ttarticle\//.test(location.pathname)) return 'ttarticle';
    const $CONFIG = page.$CONFIG; if (!$CONFIG) return null;
    if ($CONFIG.bpType === 'page') {
      // 地点
      if ($CONFIG.domain === '100101') return 'place';
      // 电影
      if ($CONFIG.domain === '100120') return 'movie';
      // 图书
      if ($CONFIG.domain === '100202') return 'book';
      // 个人主页
      if ($CONFIG.domain === '100505') return 'profile';
      // 话题页（超话）
      if ($CONFIG.domain === '100808') return 'topic';
      // 音乐
      if ($CONFIG.domain === '101515') return 'music';
      // 股票
      if ($CONFIG.domain === '230677') return 'stock';
    }
    // Unknown
    return null;
  };

}());
//#endregion
//#region @require yaofang://content/init/init.js
/*
 * 初始化相关流程
 *
 * 初始化流程
 * Ready:
 *   当获取到 $CONFIG 参数时尽快调用
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
  const init = yawf.init = yawf.init || {};

  const page = init.page = init.page || {};

  const validPageReady = $CONFIG => {
    // 必须的参数
    if (!$CONFIG) return false;
    if (!$CONFIG.uid) return false;
    if (!$CONFIG.nick) return false;
    if ($CONFIG.islogin === '0') return false;
    return true;
  };

  const validPageDom = () => {
    // 如果有登录按钮，则说明没有登录，此时不工作
    if (document.querySelector('.gn_login')) return false;
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
        if (result && typeof result.then === 'function') {
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
  init.ready = async $CONFIG => {
    page.$CONFIG = $CONFIG;
    status = true;
    init.ready = noop;
    util.debug('yawf onready');
    await runSet(onReadyCallback);
    if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
      setTimeout(init.dcl, 0);
    } else {
      document.addEventListener('DOMContentLoaded', init.dcl);
    }
  };
  // 触发 ConfigChange
  init.configChange = async $CONFIG => {
    util.debug('yawf onconfigchange: %o', $CONFIG);
    await runSet(onConfigChangeCallback);
    if (validPageReady($CONFIG)) {
      await init.ready($CONFIG);
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
//#region replacement of yaofang://content/init/setup.js
; (function () {
  const yawf = window.yawf;
  const init = yawf.init;
  const util = yawf.util;

  const strings = util.strings;

  const randStr = strings.randKey();
  const key = `yawf_${randStr}`;

  /*
   * 用户脚本不能保证 document-start
   * 所以这里没办法靠提前给 window.$CONFIG 设置 getter / setter 的方式及早获得 $CONFIG 的值
   * 这里直接等 DOMContentLoaded 来获取
   */
  util.inject(function (key) {
    const onDomContentLoaded = function () {
      const event = new CustomEvent(key, {
        detail: { $CONFIG: JSON.stringify(window.$CONFIG) },
      });
      window.dispatchEvent(event);

    };
    if (['complete', 'loaded', 'interactive'].includes(document.readyState)) {
      setTimeout(() => { onDomContentLoaded(); }, 0);
    } else {
      document.addEventListener('DOMContentLoaded', onDomContentLoaded);
    }
  }, key);

  window.addEventListener(key, function (event) {
    event.stopPropagation();
    if (!event.detail.$CONFIG) return;
    const $CONFIG = JSON.parse(event.detail.$CONFIG);
    init.configChange($CONFIG);
  }, true);

}());
//#endregion
//#region @require yaofang://content/init/ready.js
; (function () {

  const yawf = window.yawf;

  const util = yawf.util;
  const init = yawf.init;

  const priority = util.priority;
  const css = util.css;

  const config = yawf.config;

  init.onReady(async () => {
    const $CONFIG = init.page.$CONFIG;
    await config.init($CONFIG.uid);
    util.i18n = $CONFIG.lang;
    util.time.setDiff($CONFIG.timeDiff || 0);
  }, { priority: priority.FIRST });

  util.debug('yawf loading, hide all');
  const hideAll = css.add('.WB_miniblog { visibility: hidden; opacity: 0; }');
  init.onReady(() => {
    hideAll.remove();
    util.debug('yawf loaded, disable hide all');
  }, { priority: priority.LAST });
  init.onDeinit(() => {
    hideAll.remove();
    util.debug('yawf unloaded, disable hide all');
  });

}());
//#endregion
//#region replacement of yaofang://content/backend/download.js
; (function () {

  const yawf = window.yawf = window.yawf || {};
  const download = yawf.download = {};
  const message = yawf.message;

  const util = yawf.util;
  const urls = util.urls;

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
   * @param {{ url: string, filename: string }[]}
   */
  download.urls = async function (files) {
    const content = await Promise.all(files.map(function ({ url, filename }, index) {
      return new Promise((resolve, reject) => {
        GM.xmlHttpRequest({
          method: 'GET',
          url: url,
          responseType: 'arraybuffer',
          onload: function (resp) {
            const mtime = (resp.responseHeaders.match(/^Last-Modified: (.*)$/mi) || [])[1];
            const extension = url.match(/(\.[^.]*)$/)[1];
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
  const message = yawf.message;

  const util = yawf.util;

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

  const message = yawf.message;
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
  const message = yawf.message;

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
</style><script>const info = ${JSON.stringify(info)};</script></head>
<body><div id="container" tabindex="1"><div id="imgarea" tabindex="-1"><img id="viewer" class="large" /></div></div><div id="chose" tabindex="-1"><script>
  info.images.forEach(function (image, i) {
    const url = image.replace(/large/, 'square');
    document.write('<a id="img' + i + '" href="javascript:;" onclick="return goto(' + i + ') && false"><img src="' + url + '"></a>');
  });
</script></div><script>
  function resize() {
    const width = viewer.naturalWidth;
    const height = viewer.naturalHeight;
    if (width > container.clientWidth || height > container.clientHeight) imgarea.className = 'over';
    else imgarea.className = 'normal';
    focus();
  }
  function show() {
    const url = info.images[info.current];
    if (viewer.src === url) return;
    viewer.src = '';
    viewer.src = url;
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
    window.open(url);
    setTimeout(function () { URL.revokeObjectURL(url); }, 3000);
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
      }[mode || 'normal']) || acceptTypes.filter(type => type !== 'rule');
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
    return result && result.textContent.trim() || '';
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
        const items = this.getRenderItems();
        items.forEach(item => this.renderValue(item));
      });
    }
    /**
     * 读取设置项
     * @return {any} 当前设置项的值
     */
    getConfig() {
      this.initConfig();
      const value = this.config.get();
      const normalize = this.normalize(value);
      if (value && normalize && JSON.stringify(value) !== JSON.stringify(normalize)) {
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
      checkbox.classList.add('W_checkbox');
      checkbox.setAttribute('yawf-config-input', this.configId);
      checkbox.addEventListener('change', event => {
        if (!event.isTrusted) {
          this.renderValue(container);
        } else this.setConfig(checkbox.checked);
      });
      const label = container.querySelector('label');
      label.insertBefore(checkbox, label.firstChild);
      checkbox.checked = this.getConfig();
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

  /**
   * 一个数字输入框
   * 允许定义 min, max, step 属性
   * 对应一个 number 输入框
   */
  class NumberConfigItem extends ConfigItem {
    constructor(item, parent) {
      super(item, parent);
    }
    get initial() { return this.min; }
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
      const container = document.createElement('span');
      container.setAttribute('yawf-config-item', this.configId);
      container.classList.add('yawf-config-number');
      const input = document.createElement('input');
      input.type = 'number';
      input.value = this.getConfig();
      if (+this.min === this.min && this.min !== -Infinity) input.min = this.min;
      if (+this.max === this.max && this.max !== Infinity) input.max = this.max;
      if (+this.step === this.step && Number.isFinite(this.step)) input.step = this.step;
      input.addEventListener('input', event => {
        if (!event.isTrusted) {
          this.renderValue(container);
        } else {
          const token = this.setConfigToken = {};
          setTimeout(() => {
            if (this.setConfigToken !== token) return;
            this.setConfig(+input.value);
          }, 100);
        }
      });
      input.addEventListener('blur', event => {
        this.renderValue(container);
      });
      input.setAttribute('yawf-config-input', this.configId);
      container.appendChild(input);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `input[type="number"][yawf-config-input="${this.configId}"]`;
      const number = container.querySelector(selector);
      const config = this.getConfig();
      const hasFocus = number === document.activeElement;
      if (number && !hasFocus && +number.value !== config) {
        number.value = config;
      }
      return container;
    }
  }
  rule.class.NumberConfigItem = NumberConfigItem;

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

  /**
   * 一个颜色选择框
   * 对应一个 color 输入框
   */
  class ColorConfigItem extends ConfigItem {
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
      const container = document.createElement('span');
      container.setAttribute('yawf-config-item', this.configId);
      container.classList.add('yawf-config-color');
      const input = document.createElement('input');
      input.type = 'color';
      input.value = this.getConfig();
      input.addEventListener('input', event => {
        if (!event.isTrusted) input.value = this.getConfig();
        else this.setConfig(input.value);
      });
      input.addEventListener('blur', event => {
        this.renderValue(container);
      });
      input.setAttribute('yawf-config-input', this.configId);
      container.appendChild(input);
      return container;
    }
    renderValue(container) {
      container = super.renderValue(container);
      const selector = `input[type="color"][yawf-config-input="${this.configId}"]`;
      const color = container.querySelector(selector);
      const config = this.getConfig();
      if (color && color.value !== config) {
        color.value = config;
      }
      return container;
    }
  }
  rule.class.ColorConfigItem = ColorConfigItem;

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
      textarea.classList.add('yawf-config-textarea', 'W_input');
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
  rule.class.ColorConfigItem = ColorConfigItem;

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
      const iconType = this.icon || 'ask';
      const icon = document.createElement('i');
      icon.classList.add('W_icon', 'yawf-bubble-icon', `icon_${iconType}S`);
      container.appendChild(icon);
      ui.bubble(content, icon);
      return container;
    }
  }
  rule.class.BubbleConfigItem = BubbleConfigItem;

  i18n.collectionAddButton = {
    cn: '添加',
    tw: '新增',
    en: 'Add',
  };

  class CollectionConfigItem extends ConfigItem {
    get initial() { return []; }
    normalize(value) {
      if (!Array.isArray(value)) return [];
      return value.map(item => this.normalizeItem(item));
    }
    normalizeItem(item) { return item; }
    track(item, index = -1) { return '' + index; }
    renderListitem(item, index) {
      const listitem = document.createElement('li');
      listitem.classList.add('yawf-config-collection-item', 'W_btn_b', 'W_btn_tag');
      const track = arguments.length > 1 ? this.track(item, index) : this.track(item);
      listitem.dataset.yawfTrack = track;
      const deleteItem = document.createElement('span');
      deleteItem.classList.add('yawf-config-collection-remove');
      deleteItem.innerHTML = '<a class="W_ficon ficon_close S_ficon" href="javascript:void(0);">X</a>';
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
        input.classList.add('yawf-config-collection-input', 'W_input');
        label.appendChild(input);
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
          submit.classList.add('yawf-config-collection-submit', 'W_btn_a');
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
        if (!rects || !rects[0]) return;
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
        this.addItem(this.normalizeItem(this.parseSuggestionItem(item)));
        input.value = '';
        updateInputSuggestion();
      };
      const getFocus = () => suggestionItems.find(item => item.classList.contains('cur'));
      const setFocus = current => suggestionItems.forEach(item => {
        if (item === current) item.classList.add('cur');
        else item.classList.remove('cur');
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
            const current = old && old.previousSibling || suggestionItems[suggestionItems.length - 1];
            if (current) setFocus(current);
          },
          [keyboard.code.DOWN]: () => {
            const old = getFocus();
            const current = old && old.nextSibling || suggestionItems[0];
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

  class RegExpCollectionConfigItem extends StringCollectionConfigItem {
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
        if (!this.configCacheDirty && Array.isArray(this.configCache)) {
          this.configCache.splice(index, 1);
        }
      }
      values.push(value);
      super.setConfig(values);
      if (!this.configCacheDirty) {
        this.configCache.push(this.compileRegExp(value));
      }
    }
    removeItem(track) {
      const values = this.getConfig();
      const index = values.findIndex((item, index) => this.track(item, index) === track);
      if (index !== -1) {
        values.splice(index, 1);
        if (!this.configCacheDirty && Array.isArray(this.configCache)) {
          this.configCache.splice(index, 1);
        }
      }
      super.setConfig(values);
    }
    compileRegExp({ source, flags }) {
      return RegExp(source, flags);
    }
  }
  rule.class.RegExpCollectionConfigItem = RegExpCollectionConfigItem;

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
      useritem.setAttribute('usercard', `id=${id}`);
      const useravatar = document.createElement('div');
      useravatar.classList.add('yawf-config-user-avatar');
      useritem.appendChild(useravatar);
      const username = document.createElement('div');
      username.classList.add('yawf-config-user-name');
      useritem.appendChild(username);
      request.userInfo({ id }).then(({ name, avatar }) => {
        const img = new Image();
        img.src = avatar;
        useravatar.appendChild(img);
        username.textContent = name;
      });
      return useritem;
    }
    async parseUserInput(value) {
      const username = value.replace(/^@/, '');
      const user = await request.userInfo({ name: username });
      if (!user || !user.id) return null;
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

  const configItemBuilder = function (item, parent) {
    if (!item) return null;
    if (item.type === 'boolean') return new BooleanConfigItem(item, parent);
    if (item.type === 'select') return new SelectConfigItem(item, parent);
    if (item.type === 'number') return new NumberConfigItem(item, parent);
    if (item.type === 'range') return new RangeConfigItem(item, parent);
    if (item.type === 'color') return new ColorConfigItem(item, parent);
    if (item.type === 'text') return new TextConfigItem(item, parent);
    if (item.type === 'bubble') return new BubbleConfigItem(item, parent);
    if (item.type === 'strings') return new StringCollectionConfigItem(item, parent);
    if (item.type === 'regexen') return new RegExpCollectionConfigItem(item, parent);
    if (item.type === 'users') return new UserIdCollectionConfigItem(item, parent);
    if (item.type === 'usernames') return new UserNameCollectionConfigItem(item, parent);
    if (item.type === 'topics') return new TopicCollectionConfigItem(item, parent);
    if (item.type === 'groups') return new GroupIdCollectionConfigItem(item, parent);
    if (item.type === 'key') return new KeyboardConfigItem(item, parent);
    if (item.type === 'offscreen') return new OffscreenConfigItem(item, parent);
    return new ConfigItem(item, parent);
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
    render(...args) {
      const node = super.render(...args);
      node.classList.add('yawf-config-rule');
      return node;
    }
    execute() {
      const enabled = this.isEnabled();
      try {
        const styles = [];
        if (typeof this.css === 'string') styles.push(this.css);
        if (typeof this.css === 'function') styles.push(this.css());
        if (enabled) {
          if (typeof this.acss === 'string') styles.push(this.acss);
          if (typeof this.acss === 'function') styles.push(this.acss());
        }
        rule.style.append(styles.join('\n'));
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
  } = {}) {
    const result = new Set();
    ; (function query(items) {
      items.forEach(item => {
        if (item instanceof Tab || item instanceof Group) {
          query(item.children);
        }
        if (!(item instanceof Rule)) return;
        if (item.disabled) return;
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
    rule.query().forEach(rule => rule.execute());
  };

  init.onReady(() => {
    rule.init();
  }, { priority: priority.DEFAULT });

  css.append(`
.yawf-config-group { display: block; font-weight: bold; margin: 15px 10px 5px; }
.yawf-config-rule { display: block; margin: 5px 20px; }
.yawf-bubble .yawf-config-rule { display: inline; margin: 0; }
.yawf-config-rule > label + label { margin-left: 8px; }
.yawf-config-rule > br + label { margin-left: 20px; }
.yawf-bubble-icon { vertical-align: middle; margin-left: 2px; margin-right: 2px; }
.yawf-config-select { height: 20px; }
.yawf-config-number input[type="number"] { width: 45px; box-sizing: border-box; }
.yawf-config-range { position: relative; }
.yawf-config-range-wrap { display: none; position: absolute; left: 0; right: 0; margin: 0; bottom: calc(100% + 2px); height: 80px; background: #f0f0f0; background: Menu; }
.yawf-config-range:focus-within .yawf-config-range-wrap { display: block; }
.yawf-config-range input[type="range"] { position: absolute; top: 0; bottom: 0; margin: auto; width: 75px; right: -20px; left: -20px; transform: rotate(-90deg); }
.yawf-config-color input[type="color"] { width: 45px; box-sizing: border-box; height: 20px; vertical-align: middle; }
.yawf-config-text textarea { width: calc(100% - 20px); padding-left: 10px; padding-right: 10px; min-height: 120px; resize: vertical; }
.yawf-config-collection-input { margin: 5px; }
.yawf-config-collection-list { display: block; margin: 5px; }
.yawf-config-collection-list .yawf-config-collection-item { padding: 0 5px 0 20px; min-width: 0; height: 20px; overflow: hidden; text-overflow: ellipsis; cursor: default; }
.yawf-config-collection-remove { display: block; position: absolute; top: 0; left: 0; display: flow-root; width: 20px; height: 20px; line-height: 20px; }
.yawf-config-collection-item-content { max-width: 500px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; }
.yawf-config-collection-user-id .yawf-config-collection-list { margin-left: -5px; }
.yawf-config-collection-user-id .yawf-config-collection-item { width: 90px; height: 50px; padding: 1px 20px 1px 56px; text-align: left; }
.yawf-config-collection-user-id .yawf-config-collection-remove { right: 0; left: auto; text-align: center; }
.yawf-config-collection-user-id .yawf-config-collection-remove a { position: static; margin: 0; }
.yawf-config-collection-user-id .yawf-config-user-avatar { position: absolute; left: 1px; top: 1px; }
.yawf-config-collection-user-id .yawf-config-user-name { max-width: 100%; word-break: break-all; white-space: normal; max-height: 40px; overflow: hidden; }
.yawf-collection-suggestion.yawf-collection-suggestion { z-index: 10000; position: fixed; }
.yawf-list-suggestion-item a { min-height: 15.6px; }
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

  const observer = yawf.observer = yawf.observer || {};
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
  const i18n = util.i18n;

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
          util.debug('Exception while parsing rule %o: %o\n%o', filter, e, e.stack);
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
      this.busy = false;
      this.clean = null;
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
    async active(items, isAppend = true) {
      if (isAppend) {
        this.pending.push(...items);
      } else {
        this.pending.unshift(...items);
      }
      if (this.busy) {
        if (!this.clean) {
          this.clean = new Promise(resolve => {
            this.resolve = resolve;
          });
        }
        await this.clean;
        return;
      }
      this.busy = true;
      const promises = [];
      while (this.pending.length) {
        const item = this.pending.shift();
        promises.push((async () => {
          await this.invokeCallbacks(this.before, item);
          const result = await this.filters.filter(item);
          const callAfter = this.apply(item, result);
          if (callAfter) {
            await this.invokeCallbacks(this.after, item, result);
          }
          await this.invokeCallbacks(this.finally, item, result);
          await new Promise(resolve => setTimeout(resolve, 0));
        })());
        await new Promise(resolve => setTimeout(resolve, 0));
        if (!this.busy) break;
      }
      await Promise.all(promises);
      await this.invokeCallbacks(this.done);
      this.busy = false;
      if (this.pending.length) {
        await this.active(this.pending.splice(0));
        return;
      }
      if (this.clean) this.clean = null;
      if (this.resolve) {
        this.resolve();
        this.resolve = null;
      }
    }
    async rerun() {
      const lastRerun = this.lastRerun = (this.lastRerun || 0) + 1;
      await new Promise(resolve => setTimeout(resolve, 1000));
      if (this.lastRerun !== lastRerun) return;
      this.reapply();
    }
    onBefore(callback) { this.before.push(callback); }
    onAfter(callback) { this.after.push(callback); }
    onFinally(callback) { this.finally.push(callback); }
    onDone(callback) { this.done.push(callback); }
  }

  const removeHiddenItem = function (item, { result }) {
    if (result !== 'hide') return;
    item.remove();
  };

  const unfoldEventHandler = function (event) {
    const feed = event.target.closest('[mid]');
    feed.setAttribute('yawf-feed-display', 'unfold');
    feed.removeEventListener('click', unfoldEventHandler);
  };
  const foldFeedUnfold = function (feed, { result }) {
    if (result !== 'fold') return;
    feed.addEventListener('click', unfoldEventHandler);
  };

  /**
   * 针对微博的过滤规则
   * 对应脚本版 observer.weibo.*
   */
  observer.feed = new FilterObserver();
  observer.feed.apply = function (feed, { result, filter = null, reason = null }) {
    feed.setAttribute('yawf-feed-display', result || 'unset');
    if (result && result !== 'unset') {
      const author = feed.querySelector('.WB_detail > .WB_info > .W_fb[usercard]') ||
        feed.querySelector('.card-feed .info .name');
      const authorName = author && author.textContent;
      if (authorName) feed.setAttribute('yawf-feed-author', authorName);
      if (reason) feed.setAttribute('yawf-feed-reason', reason);
      util.debug('Feed filter %o -> %o by %o due to %o', feed, result, filter, reason);
    }
    if (result === 'hide') return false;
    return true;
  };
  observer.feed.reapply = function () {
    const parsed = Array.from(document.querySelectorAll('[yawf-feed-display]'));
    parsed.forEach(feed => {
      feed.removeEventListener('click', unfoldEventHandler);
    });
    return this.active(parsed, false);
  };
  observer.feed.onFinally(removeHiddenItem);
  observer.feed.onFinally(foldFeedUnfold);

  /**
   * 针对评论的过滤规则
   * 对应脚本版 observer.comment
   */
  observer.comment = new FilterObserver();
  observer.comment.apply = function (comment, { result, filter = null, reason = null }) {
    comment.setAttribute('yawf-comment-display', result || 'unset');
    if (result && result !== 'unset') {
      util.debug('Comment filter %o -> %o by %o due to %o', comment, result, filter, reason);
    }
    if (result === 'hide') return false;
    return true;
  };
  observer.comment.reapply = function () {
    const parsed = Array.from(document.querySelectorAll('[yawf-comment-display]'));
    return this.active(parsed, false);
  };
  observer.comment.onFinally(removeHiddenItem);


  init.onLoad(function () {
    // 自动检测页面中的微博并触发过滤规则
    observer.dom.add(function feedFilter() {
      const feeds = document.querySelectorAll([
        '[action-type="feed_list_item"]:not([yawf-feed])',
        '[node-type="feed_list"] .WB_feed_type:not([yawf-feed])',
      ].join(','));
      if (!feeds.length) return;
      feeds.forEach(feed => feed.setAttribute('yawf-feed', ''));
      observer.feed.active(feeds);
    });
    // 自动检测页面中的评论并触发过滤规则
    observer.dom.add(function commentFilter() {
      const comments = document.querySelectorAll([
        '.list_ul[node-type="feed_list_commentList"] .list_li:not([yawf-comment])',
        '.list_ul[node-type="comment_list"] .list_li:not([yawf-comment]) ',
      ].join(','));
      if (!comments.length) return;
      comments.forEach(comment => comment.setAttribute('yawf-comment', ''));
      observer.comment.active(comments);
    });
  }, { priority: priority.LAST });

  i18n.foldReason = {
    cn: '"已折叠 @" attr(yawf-feed-author) " 的一条微博"',
    tw: '"已折疊 @" attr(yawf-feed-author) " 的一條微博"',
    en: '"A feed posted by @" attr(yawf-feed-author)',
  };

  const hideFeedCss = css.add(`
[action-type="feed_list_item"]:not([yawf-feed]),
[node-type="feed_list"] .WB_feed_type:not([yawf-feed]),
.list_ul[node-type="feed_list_commentList"] .list_li:not([yawf-comment]),
.list_ul[node-type="comment_list"] .list_li:not([yawf-comment])
{ visibility: hidden; opacity: 0; }
[action-type="feed_list_item"]:not([yawf-feed]) [node-type="feed_list"] .WB_feed_type:not([yawf-feed]) { display: none; }
[yawf-feed]:not([yawf-feed-display]), [yawf-comment]:not([yawf-comment-display]) { visibility: hidden; opacity: 0; }
[yawf-comment-display="hide"], [yawf-feed-display="hide"] { display: none; }
[yawf-feed-display="fold"] { position: relative; }
[yawf-feed-display="fold"] > * { display: none; }
[yawf-feed-display="fold"]::before { text-align: center; padding: 10px 20px; display: block; opacity: 0.6; }
.WB_feed_type[yawf-feed-display="fold"] .WB_feed_detail { display: none; }
.WB_feed_type[yawf-feed-display="fold"]:hover .WB_feed_detail { display: block; max-height: 0; transition: max-height, padding 0.1s; overflow: hidden; padding: 0 20px; }
.WB_feed_type[yawf-feed-display="fold"]:hover .WB_feed_detail:not(:hover) { max-height: 1000px; padding: 0 20px 27px; }
.WB_feed_type[yawf-feed-display="fold"] .WB_feed_handle { display: none; }
`);
  init.onLoad(function () {
    css.append(`[yawf-feed-display="fold"]::before { content: ${i18n.foldReason}; }`);
  });
  init.onDeinit(() => {
    hideFeedCss.remove();
  });

  // 单条微博页面永远不应当隐藏微博
  observer.feed.filter(function singleWeiboPageUnsetRule() {
    return document.querySelector('[id^="Pl_Official_WeiboDetail__"]') ? 'unset' : null;
  }, { priority: 1e6 });
  // 头条文章是一条微博，类似于单条微博，不应当隐藏
  observer.feed.filter(function singleWeiboPageUnsetRule(feed) {
    return feed.matches('.WB_artical *') ? 'unset' : null;
  }, { priority: 1e6 });
  // 无论因为何种原因，同一页面上同一条微博不应出现两次
  observer.feed.filter(function hideDuplicate(feed) {
    const mid = feed.getAttribute('mid');
    if (!mid) return null;
    const all = Array.from(document.querySelectorAll('.WB_feed_type[mid]'));
    if (all.find(that => that !== feed && that.getAttribute('mid') === mid)) return 'hide';
    return null;
  }, { priority: 1e6 });

}());
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
    container.innerHTML = '<div class="WB_minitab yawf-config-header" node-type="yawf-config-header"><ul class="minitb_ul S_line1 S_bg1 clearfix"></ul></div>';
    return container.removeChild(container.firstChild);
  };
  configDom.search = () => {
    const container = document.createElement('ul');
    container.innerHTML = '<li class="minitb_item S_line1 yawf-config-tab yawf-config-tab-search"><label class="minitb_lk S_txt1"><input id="yawf-config-search" class="yawf-config-search" type="search"><span class="yawf-config-search-logo W_ficon S_txt2">f</span></label></li>';
    return container.removeChild(container.firstChild);
  };
  configDom.item = title => {
    const container = document.createElement('ul');
    container.innerHTML = '<li class="minitb_item S_line1 yawf-config-tab"><a class="minitb_lk S_txt1 S_bg1 S_bg2" action-type="tab_item" href="javascript:void(0);"></a></li>';
    const text = container.querySelector('a');
    text.appendChild(title);
    return container.removeChild(container.firstChild);
  };
  configDom.right = () => {
    const container = document.createElement('div');
    container.innerHTML = '<div node-type="yawf-config-body" class="yawf-config-body yawf-window-body"></div>';
    return container.removeChild(container.firstChild);
  };
  configDom.layer = () => {
    const container = document.createElement('div');
    container.innerHTML = '<div class="yawf-config-layer"></div>';
    return container.removeChild(container.firstChild);
  };

  const renderTip = (layer, text) => {
    layer.innerHTML = '<div class="WB_empty"><div class="WB_innerwrap"><div class="empty_con clearfix"><p class="icon_bed"><i class="W_icon icon_warnB"></i></p><p class="text"></p></div></div></div>';
    layer.querySelector('.text').textContent = text;
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
    }[verOp] || (() => true);
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
    const tablist = left.querySelector('ul');
    const search = tablist.appendChild(configDom.search());
    const searchInput = search.querySelector('input');
    /** @type {Element?} */
    let current = null;
    /** @type {WeakMap<Element, Function>} */
    const tabInit = new WeakMap();
    const tabLayer = tabs.map(tab => {
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
    const tabLeft = tabs.map((tab, index) => {
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
      if (current) current.classList.remove('current');
      current = tabLeft;
      tabLeft.classList.add('current');
      if (search !== tabLeft && searchInput.value) searchInput.value = '';
      tabInit.get(tabLeft)();
      right.scrollTo(0, 0);
    };
    // 自动选中目标选项卡，或第一个选项卡
    setCurrent(tabLeft[(initial && tabs.indexOf(initial) + 1 || 1) - 1]);
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
      }).show();
    } catch (e) { util.debug('Error while showing rule dialog %o', e); }
  };

  css.append(`
#yawf-config .yawf-config-inner { padding: 0 0 0 160px; width: 640px; height: 480px; position: relative; }
#yawf-config .yawf-config-header { position: absolute; width: 160px; height: 480px; top: 0; left: 0; }
#yawf-config .yawf-config-header ul { height: 450px; width: 120px; overflow: hidden; padding: 20px 0 10px 40px; box-shadow: -4px 0 2px -2px rgba(64, 64, 64, 0.15) inset, 0 4px 2px -2px rgba(64, 64, 64, 0.15) inset; }
#yawf-config .yawf-config-header li { display: block; width: 120px; height: 25px; border-style: solid none; margin-top: -1px; }
#yawf-config .yawf-config-header a,
#yawf-config .yawf-config-header label { width: 100px; padding: 0 10px; position: relative; z-index: 1; }
#yawf-config .yawf-config-header .yawf-config-tab:not(.current) a { background: none transparent; }
#yawf-config .yawf-config-header .yawf-config-search { -moz-appearance: none; -webkit-appearance: none; background: none transparent; border: medium none; height: 25px; padding: 0 0 0 30px; text-align: right; width: 70px; box-sizing: content-box; position: relative; z-index: 2; }
#yawf-config .yawf-config-search-logo { clear: both; display: block; float: left; left: 45px; position: relative; top: -27px; transition: left linear 0.2s; cursor: text; font-weight: normal; }
#yawf-config .yawf-config-header li.current .yawf-config-search-logo,
#yawf-config .yawf-config-search:focus ~ .yawf-config-search-logo { left: 15px; }
#yawf-config .yawf-config-body { padding: 10px 20px 20px; width: 600px; max-height: 450px; overflow: auto; box-shadow: 0 4px 2px -2px rgba(64, 64, 64, 0.15) inset; position: relative; line-height: 20px; }
#yawf-config .yawf-config-layer { padding-bottom: 20px; min-height: 400px; }
#yawf-config .yawf-config-layer.current { display: block; }
`);


}());
//#endregion
//#region @require yaofang://content/ruleset/menu.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init;

  const ui = util.ui;
  const i18n = util.i18n;
  const css = util.css;

  const rule = yawf.rule;
  const tabs = rule.tabs;

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
    before: { hide: beforeHide = null, show: beforeShow = null, fold: beforeFold = null } = {},
    details: { hide = null, show = null, fold = null },
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

    // 依次创建三种类型的过滤规则
    const actions = [
      { action: 'show', details: show, before: beforeShow },
      { action: 'hide', details: hide, before: beforeHide },
      { action: 'fold', details: fold, before: beforeFold },
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
          fold: -1e5,
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
.yawf-config-feed-fold { --yawf-ball-color: #c6c63e; }
`);

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
    fastAddFold: {
      cn: '折叠',
      tw: '折疊',
      en: 'fold',
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
        const handlers = fastHandlers.get(originalItem.type) || [];
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
              fold: 'fastAddFold',
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
      dropArea.parentNode.classList.add('yawf-drop-area-active');
    };
    const hideDropArea = function () {
      dragIndex++;
      inArea = false;
      if (!dropArea) return;
      dropArea.classList.remove('yawf-drag', 'yawf-drag-in');
      dropArea.parentNode.classList.remove('yawf-drop-area-active');
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

    init.onLoad(function addDropArea() {
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
.yawf-drop-title { font-size: 16px; font-weight: bold; white-space: pre-wrap; margin: 0 0 20px; -moz-user-select: none; -webkit-user-select: none; user-select: none; }
.yawf-drop-area-active .gn_topmenulist_yawf { display: none; }
`);

}());
//#endregion
//#region @require yaofang://content/rule/filter/common/parse.js
; (function () {

  const yawf = window.yawf;

  const feedParser = yawf.feed = {};
  const commentParser = yawf.comment = {};

  // 文本
  // 文本分为完整模式（用于正则匹配）和简易模式（用于关键词）
  // 完整模式下产生的文本更复杂，可用于更复杂的过滤规则
  // 简单模式下产生的文本更符合一般用户的理解，更适合普通用户使用
  /**
   * 找到一组 Node 的公共祖先
   * @param {Node[]} nodes
   */
  const commonParent = function (...nodes) {
    if (nodes.length === 0) return null;
    if (nodes.length === 1) return nodes[0];
    const firstParents = [];
    let parentIndex = 0;
    for (let [r] = nodes; r; r = r.parentElement) firstParents.push(r);
    for (let i = 0, l = nodes.length; i < l; i++) {
      for (let p = nodes[i]; true; p = p.parentElement) {
        if (!p) return null;
        const index = firstParents.indexOf(p, parentIndex);
        if (index === -1) continue;
        parentIndex = index;
        break;
      }
    }
    return firstParents[parentIndex];
  };

  /**
   * 检查一个节点是不是另一个节点的祖先节点
   * @param {Node|NodeList|Node[]} parent
   * @param {Node|NodeList|Node[]} child
   * @return {boolean}
   */
  const contains = function (parent, child) {
    if (!parent || !child) return false;
    if (!(child instanceof Node)) {
      const children = Array.from(child);
      return children.every(child => contains(parent, child));
    }
    if (parent instanceof Node) {
      return parent.contains(child);
    } else {
      const parents = new Set(Array.from(parent));
      for (let e = child; e; e = e.parentElement) {
        if (parents.has(e)) return true;
      }
    }
    return false;
  };

  /**
   * 检查某个元素是否是一条微博
   * @param {Element} element
   * @returns {boolean}
   */
  const isFeedElement = function (element) {
    if (!(element instanceof Element)) return false;
    if (!element.hasAttribute('mid')) return false;
    return true;
  };

  /**
   * 检查某个元素是否是一条搜索页面的微博
   * @param {Element} element
   * @returns {boolean}
   */
  const isSearchFeedElement = function (element) {
    if (!isFeedElement(element)) return false;
    if (!element.matches('.card-wrap')) return false;
    if (!element.querySelector('.card-feed')) return false;
    return true;
  };

  /**
   * 检查某个元素是否是一条评论
   * @param {Element} element
   * @returns {boolean}
   */
  const isCommentElement = function (element) {
    if (!(element instanceof Element)) return false;
    if (!element.hasAttribute('comment_id')) return false;
    return true;
  };


  /**
   * 检查某个元素是否是一条转发的微博
   * @param {Element} element
   * @returns {boolean}
   */
  const isForwardFeedElement = function (element) {
    if (!isFeedElement(element)) return false;
    if (!element.hasAttribute('omid')) return false;
    return true;
  };

  /**
   * 获取一条微博中所有内容相关的节点
   * @param {Element} feed
   * @returns {Element[]}
   */
  const feedContentElements = function (feed, { detail = false, short = false, long = true } = {}) {
    if (!isFeedElement(feed)) return null;
    const content = feedParser.content.dom(feed, true, false);
    const contentFull = feedParser.content.dom(feed, true, true);
    let post = contentFull ? !short ? [contentFull] : long ? [content, contentFull] : [content] : [content];
    if (detail) {
      const [author] = feedParser.author.dom(feed);
      const [source] = feedParser.source.dom(feed, true);
      const [date] = feedParser.date.dom(feed, true);
      post = [author, ...post, source, date];
    }
    if (feed.hasAttribute('omid')) {
      const reason = feedParser.content.dom(feed, false, false);
      const reasonFull = feedParser.content.dom(feed, false, true);
      let ori = reasonFull ? !short ? [reasonFull] : long ? [reason, reasonFull] : [reason] : [reason];
      if (detail) {
        const [original] = feedParser.original.dom(feed);
        const [sourceOri] = feedParser.source.dom(feed, false);
        const [dateOri] = feedParser.date.dom(feed, false);
        ori = [original, ...ori, sourceOri, dateOri];
      }
      return [...post, null, ...ori];
    }
    return post;
  };

  /**
   * 获取一条微博中所有内容相关的节点
   * @param {Element} comment
   * @returns {Element[]}
   */
  const commentContentElements = function (comment) {
    if (!isCommentElement(comment)) return null;
    const text = comment.querySelector('.WB_text');
    return [text];
  };

  /**
   * 获取节点所在的微博
   * @param {Node} node
   * @returns {Element}
   */
  const feedContainer = function (node) {
    if (!node) return null;
    if ((node instanceof Node) && !(node instanceof Element)) {
      return feedContainer(node.parentNode);
    }
    return node.closest('[mid]');
  };
  feedParser.feedNode = node => feedContainer(node);

  /**
   * 获取节点所在的评论
   * @param {Node} node
   * @returns {Element}
   */
  const commentContainer = function (node) {
    if (!node) return null;
    if ((node instanceof Node) && !(node instanceof Element)) {
      return commentContainer(node.parentNode);
    }
    return node.closest('[comment_id]');
  };
  feedParser.commentNode = node => feedContainer(node);

  const textParser = function (detail, containerType) {
    const parsers = [];
    /**
     * 普通文本（文本✓，正则✓）
     * @param {Node} node
     */
    const text = node => {
      if (node.nodeType === Node.TEXT_NODE) {
        return node.textContent.trim().replace(/\s/g, ' ');
      }
      return null;
    };
    parsers.push(text);
    /**
     * 展开/收起全文（不计入内容）
     * @param {Element} node
     */
    const fold = node => {
      if (node.matches('a[action-type="fl_unfold"], a[action-type="fl_fold"]')) {
        return '';
      }
      return null;
    };
    parsers.push(fold);
    /**
     * 换行符 <br> （文本✓，正则✓）
     * @param {Element} node
     */
    const lineBreak = node => {
      if (node.matches('br, .yawf-line-break')) {
        return '\n';
      }
      return null;
    };
    parsers.push(lineBreak);
    /**
     * #话题#（文本✓，正则✓）
     * @param {Element} node
     */
    const topic = node => {
      let topic = null;
      if (node.matches('a[suda-uatrack*="1022-topic"]') && node.title) {
        topic = node.title.replace(/^[\s#]+|[\s#]+$/g, '');
        if (node.querySelector('.ficon_supertopic')) topic = '\ue627' + topic;
      }
      if (!topic && node.matches('a.a_topic, a[suda-uatrack*="1022-topic"]')) {
        topic = node.textContent.replace(/^[\s#]+|[\s#]+$/g, '');
      }
      if (!topic && node.matches('a[suda-uatrack*="1022-stock"]')) {
        topic = node.textContent.replace(/^[\s$]+|[\s$]+$/g, '');
      }
      if (topic) {
        const [_, superTopic, text] = topic.match(/^(?=(\ue627?|.*\[超话\]|.*超话$))[\ue627\s]*(.*?)(?:\[超话\]|超话)?$/);
        if (superTopic && detail) return ` #${text}[超话]# `;
        if (detail) return ` #${text}# `;
        return `#${text}#`;
      }
      return null;
    };
    parsers.push(topic);
    /**
     * $股票$（文本✓，正则✓）
     * @param {Element} node
     */
    const stock = node => {
      if (node.matches('a[suda-uatrack*="1022-stock"]')) {
        const text = node.textContent.trim().replace(/^\$?|\$?$/g, '');
        if (detail) return ` $${text}$ `;
        return `$${text}$`;
      }
      return null;
    };
    parsers.push(stock);
    /**
     * [表情]（文本✓，正则✓）
     * @param {Element} node
     */
    const emotion = node => {
      if (node.matches('img[type="face"][alt]')) {
        const text = node.getAttribute('alt').trim()
          .replace(/^\[?/, '[').replace(/\]?$/, ']');
        if (detail) return ` ${text} `;
        return text;
      }
      return null;
    };
    parsers.push(emotion);

    /**
     * 如果我们拿到一个作者或者原作者的链接，我们还可以拿到他的那些小图标
     * @param {Element} node
     */
    const userIcons = function (node) {
      const isSearch = isSearchFeedElement(feedContainer(node));
      const items = [];
      if (isSearch) {
        const sibling = [...node.parentNode.children];
        items.push(...sibling.filter(item => item.matches('a[title]')));
      } else {
        items.push(...node.parentNode.querySelectorAll('[title]'));
      }
      const icons = items.filter(item => item !== node && item.title.trim());
      return icons.map(icon => `[${icon.title.trim()}]`);
    };

    /**
     * @作者（文本✗，正则✓）
     * @param {Element} node
     */
    const author = node => {
      if (!node.matches('.WB_detail > .WB_info > .W_fb[usercard]')) return null;
      if (!detail) return '';
      const name = '@' + node.textContent.trim();
      const icons = userIcons(node);
      return [name, ...icons].join(' ');
    };
    parsers.push(author);
    /**
     * @原作（文本✗，正则✓）
     * @param {Element} node
     */
    const original = node => {
      if (!node.matches('.WB_expand > .WB_info > .W_fb[usercard]')) return null;
      if (!detail) return '';
      const name = node.textContent.trim().replace(/^@?/, '@');
      const icons = userIcons(node);
      return [name, ...icons].join(' ');
    };
    parsers.push(original);
    /**
     * @提到（文本✓，正则✓）
     * @param {Element} node
     */
    const mention = node => {
      if (node.matches('a[usercard]')) {
        return node.textContent.trim().replace(/^@?/, '@') + ' ';
      }
      return null;
    };
    parsers.push(mention);
    /**
     * 来源（文本✗，正则✓）
     * @param {Element} node
     */
    const source = node => {
      if (!node.matches('.WB_from a:not([date]):not([yawf-date])')) return null;
      if (!detail) return '';
      return (node.title || node.textContent).trim();
    };
    parsers.push(source);
    /**
     * 时间（文本✗，正则✓）
     * @param {Element} node
     */
    const timestamp = node => {
      if (!node.matches('a[date], a[yawf-date]')) return null;
      if (!detail) return '';
      const date = new Date(+(node.getAttribute('date') || node.getAttribute('yawf-date')));
      // 将时间格式化为东八区的 ISO 8601 串
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
    parsers.push(timestamp);
    /**
     * 链接
     * URL（文本✗，正则✓）
     * 标题（文本✓，正则✓）
     * @param {Element} node
     */
    const link = node => {
      const output = [];
      if (!node.matches('a[action-type="feed_list_url"]')) return null;
      if (node.matches('[suda-uatrack*="1022-topic"]')) return null;
      if (detail) {
        const url = new URL(node.href.trim());
        if (url.host + url.pathname === 'feed.mix.sina.com.cn/link_card/redirect') {
          output.push(url.searchParams.get('url'));
        } else output.push(url.href);
        output.push('\ufff9');
        const icon = node.querySelector('.W_ficon');
        if (icon) output.push(icon.textContent);
      }
      if (node.matches('[title]')) {
        output.push(node.getAttribute('title').trim());
      }
      if (detail) {
        output.push('\ufffb');
      }
      if (output.length) return ' ' + output.join(' ') + ' ';
      return null;
    };
    parsers.push(link);

    /**
     * @param {Node} node
     * @returns {string}
     */
    const allParser = function (node) {
      return parsers.reduce((result, parser) => {
        if (result != null) return result;
        return parser(node);
      }, null);
    };

    /**
     * @param {Node} node
     * @returns {string}
     */
    const parseNode = function parseNode(node, isSearch = null) {
      const text = allParser(node);
      if (text != null) return text;
      if (node.hasChildNodes()) {
        return [...node.childNodes].map(node => parseNode(node)).join('');
      }
      return '';
    };

    /**
     * @param {Selection} selection
     * @returns {string[]}
     */
    const parseSelection = function (selection) {
      const ranges = [...Array(selection.rangeCount)]
        .map((_, i) => selection.getRangeAt(i));
      const rangeElements = ranges.map(range => {
        return commonParent(range.startContainer, range.endContainer);
      });
      const container = containerType === 'feed' ? feedContainer : commentContainer;
      const contentElements = containerType === 'feed' ? feedContentElements : commentContentElements;
      const feed = container(commonParent(...rangeElements));
      if (!feed) return null;
      const elements = contentElements(feed, { detail, short: true, long: true });
      if (!elements) return null;
      if (rangeElements.some(re => !contains(elements, re))) return null;
      return ranges.map((range, rangeIndex) => {
        const [start, end] = [range.startContainer, range.endContainer];
        if (start === end) {
          if (start instanceof Text) {
            return start.textContent.slice(range.startOffset, range.endOffset);
          }
          return parseNode(start);
        }
        let status = 0;
        return (function parseNode(node) {
          if (node === start && node instanceof Text) {
            return node.textContent.slice(range.startOffset);
          }
          if (node === end && node instanceof Text) {
            return node.textContent.slice(0, range.endOffset);
          }
          const text = allParser(node);
          if (text) {
            if (node === start) status = 1;
            if (node === end) status = 2;
            return status === 1 || node === end ? text : '';
          }
          if (node.hasChildNodes()) {
            return [...node.childNodes].map(node => parseNode(node)).join('');
          }
          return '';
        }(rangeElements[rangeIndex]));
      });
    };

    /** @type {WeakMap<Node, string>} */
    const nodeCache = new WeakMap();

    /**
     *//**
    * @param {Node} target
    * @returns {string}
    *//**
    * @param {Selection} target
    * @returns {string[]}
    */
    const parser = function (target) {
      if (target instanceof Node) {
        if (nodeCache.has(target)) return nodeCache.get(target);
        const text = parseNode(target);
        nodeCache.set(target, text);
        return text;
      }
      if (target instanceof Selection) {
        return parseSelection(target);
      }
      return null;
    };

    return parser;
  };

  const fullTextParser = textParser(true, 'feed');
  const simpleTextParser = textParser(false, 'feed');
  const commentTextParser = textParser(false, 'comment');

  const nodeTextParser = (target, detail) => {
    const parser = detail ? fullTextParser : simpleTextParser;
    const elements = feedContentElements(target, { detail, long: true });
    if (elements) {
      const texts = elements.map(element => parser(element) || '');
      return texts.join(detail ? '\u2028' : '\n');
    } else {
      return parser(target);
    }
  };

  const text = feedParser.text = {};
  text.detail = element => nodeTextParser(element, true);
  text.simple = element => nodeTextParser(element, false);

  // 内容区域
  const content = feedParser.content = {};
  content.dom = (feed, isMain, isFull) => {
    const isSearch = isSearchFeedElement(feed);
    if (isFull === false) {
      if (isMain && !isSearch) {
        return feed.querySelector('[node-type="feed_list_content"]');
      } else if (!isMain && !isSearch) {
        return feed.querySelector('[node-type="feed_list_reason"]');
      } else if (isMain) {
        return feed.querySelector('.content > [node-type="feed_list_content"]');
      } else {
        return feed.querySelector('[node-type="feed_list_forwardContent"] > [node-type="feed_list_content"]');
      }
    } else if (isFull === true) {
      if (isMain && !isSearch) {
        return feed.querySelector('[node-type="feed_list_content_full"]');
      } else if (!isMain && !isSearch) {
        return feed.querySelector('[node-type="feed_list_reason_full"]');
      } else if (isMain) {
        return feed.querySelector('.content > [node-type="feed_list_content_full"]');
      } else {
        return feed.querySelector('[node-type="feed_list_forwardContent"] > [node-type="feed_list_content_full"]');
      }
    } else {
      return content.dom(feed, true) || content.dom(feed, false);
    }
  };

  // 作者（这条微博是谁发的）
  const author = feedParser.author = {};
  author.dom = feed => {
    if (!(feed instanceof Node)) return [];
    if (!isSearchFeedElement(feed)) {
      const author = feed.querySelector('.WB_detail > .WB_info > .W_fb[usercard]');
      return author ? [author] : [];
    } else {
      const author = feed.querySelector('.card-feed .info .name');
      return author ? [author] : [];
    }
  };
  author.id = feed => {
    const domList = author.dom(feed);
    if (!isSearchFeedElement(feed)) {
      return domList.map(dom => new URLSearchParams(dom.getAttribute('usercard')).get('id'));
    } else {
      return domList.map(dom => {
        const [_, uid] = dom.pathname.match(/^\/(?:u\/)?(\d+)/) || [];
        return String(Number.parseInt(uid, 10));
      }).filter(uid => +uid);
    }
  };
  author.name = feed => {
    const domList = author.dom(feed);
    return domList.map(dom => dom.textContent.trim());
  };
  author.avatar = feed => {
    const domList = author.dom(feed);
    if (domList.length !== 1) return null;
    if (!isSearchFeedElement(feed)) {
      const img = feed.querySelector('.WB_face img');
      return img.src;
    } else {
      const img = feed.querySelector('.card-feed .avator img');
      return img.src;
    }
  };

  // 原作者（一条被转发的微博最早来自谁）
  const original = feedParser.original = {};
  original.dom = feed => {
    if (!(feed instanceof Node)) return [];
    if (!isSearchFeedElement(feed)) {
      const original = feed.querySelector('.WB_expand > .WB_info > .W_fb[usercard]');
      return original ? [original] : [];
    } else {
      const original = feed.querySelector('.card-comment .name');
      return original ? [original] : [];
    }
  };
  original.id = feed => {
    const domList = original.dom(feed);
    if (!isSearchFeedElement(feed)) {
      return domList.map(dom => new URLSearchParams(dom.getAttribute('usercard')).get('id'));
    } else {
      return domList.map(dom => {
        const [_, uid] = dom.pathname.match(/^\/(?:u\/)?(\d+)/) || [];
        return String(Number.parseInt(uid, 10));
      }).filter(uid => +uid);
    }
  };
  original.name = feed => {
    const domList = original.dom(feed);
    return domList.map(dom => dom.textContent.trim());
  };

  // 提到（微博中提到的人，转发路径中的人同属于提到）
  const mention = feedParser.mention = {};
  mention.dom = (feed, { short = false, long = true } = {}) => {
    const contents = feedContentElements(feed, { short, long });
    if (!isSearchFeedElement(feed)) {
      const domList = contents.map(content => {
        if (!content) return [];
        return Array.from(content.querySelectorAll('a[href*="loc=at"][usercard*="name"]'));
      }).reduce((x, y) => x.concat(y));
      return domList;
    } else {
      const linkList = contents.map(content => (
        content ? Array.from(content.querySelectorAll('a')) : []
      )).reduce((x, y) => x.concat(y));
      const domList = linkList.filter(link => {
        if (!['weibo.com', 'www.weibo.com'].includes(link.hostname)) return false;
        if (!/\/n\//.test(link.pathname)) return false;
        if (!/^@/.test(link.textContent.trim())) return false;
        return true;
      });
      return domList;
    }
  };
  mention.name = (feed, { short = false, long = true } = {}) => {
    const domList = mention.dom(feed, { short, long });
    if (!isSearchFeedElement(feed)) {
      return domList.map(dom => new URLSearchParams(dom.getAttribute('usercard')).get('name'));
    } else {
      return domList.map(dom => decodeURIComponent(dom.pathname.split('/')[2]));
    }
  };

  // 话题（包括话题和超话）
  const topic = feedParser.topic = {};
  topic.dom = (feed, { short = false, long = true } = {}) => {
    const isSearch = isSearchFeedElement(feed);
    const contents = feedContentElements(feed, { short, long });
    const domList = [];
    contents.forEach(content => {
      if (!content) return;
      if (!isSearch) {
        const topics = content.querySelectorAll([
          'a[suda-uatrack*="1022-topic"]',
          'a.a_topic',
        ].join(','));
        domList.push(...topics);
        const sources = source.dom(feed);
        sources.forEach(source => {
          if (/^https:\/\/huati.weibo.com\/k\/[^/?#]+$/.test(source.href)) domList.push(source);
        });
      } else {
        const links = Array.from(content.querySelectorAll('a'));
        links.forEach(link => {
          let isTopic = false;
          if (link.hostname === 's.weibo.com') {
            isTopic = /^#.*#$/.test(link.textContent.trim());
          }
          if (link.hostname === 'huati.weibo.com') {
            isTopic = /^\s*\ue627/.test(link.textContent);
          }
          if (isTopic) domList.push(link);
        });
      }
    });
    return domList;
  };
  topic.text = (feed, { short = false, long = true } = {}) => {
    const domList = topic.dom(feed, { short, long });
    return domList.map(dom => {
      if (dom instanceof HTMLAnchorElement) {
        if (/^https:\/\/huati.weibo.com\/k\/[^/?#]+$/.test(dom.href)) {
          return decodeURIComponent(dom.href.split('/').pop()).trim();
        }
      }
      const text = dom.title || dom.textContent;
      return text.replace(/[#\ue627]|\[超话\]$/g, '').trim();
    });
  };

  // 链接（除超话外所有的链接，包括外站链接、视频、文章等）
  const link = feedParser.link = {};
  link.dom = (feed, { short = false, long = true } = {}) => {
    const isSearch = isSearchFeedElement(feed);
    const contents = feedContentElements(feed, { short, long });
    const domList = [].concat(...contents.map(content => {
      if (!content) return [];
      if (!isSearch) {
        return Array.from(content.querySelectorAll('a[action-type="feed_list_url"]'));
      } else {
        const links = Array.from(content.querySelectorAll('a'));
        return links.filter(link => (
          link.querySelector('.wbicon').textContent.trim() === 'O'
        ));
      }
    }));
    const topics = new Set(feedParser.topic.dom(feed, { short, long }));
    return domList.filter(link => link && !topics.has(link));
  };
  link.text = (feed, { short = false, long = true } = {}) => {
    const domList = link.dom(feed, { short, long });
    return domList.map(dom => {
      const text = dom.title || dom.textContent;
      return text;
    });
  };

  // 来源
  const source = feedParser.source = {};
  source.dom = (feed, isMain) => {
    const isSearch = isSearchFeedElement(feed);
    if (isMain === true) {
      if (!isSearch) {
        return Array.from(feed.querySelectorAll('.WB_detail > .WB_from a:not([date]):not([yawf-date])'));
      } else {
        return Array.from(feed.querySelectorAll('.content > .from a:last-child:not(:first-child)'));
      }
    } else if (isMain === false) {
      if (!isSearch) {
        return Array.from(feed.querySelectorAll('.WB_expand .WB_from a:not([date]):not([yawf-date])'));
      } else {
        return Array.from(feed.querySelectorAll('.card-comment .from a:last-child:not(:first-child)'));
      }
    } else {
      if (!isSearch) {
        return Array.from(feed.querySelectorAll('.WB_from a:not([date]):not([yawf-date])'));
      } else {
        return Array.from(feed.querySelectorAll('.from a:last-child:not(:first-child)'));
      }
    }
  };
  source.text = (feed, isMain) => {
    const domList = source.dom(feed, isMain);
    return domList.map(dom => {
      const text = (dom.title || dom.textContent).trim();
      return text;
    }).filter(source => source);
  };

  // 日期
  const date = feedParser.date = {};
  date.dom = (feed, isMain) => {
    const isSearch = isSearchFeedElement(feed);
    if (isMain === true) {
      if (!isSearch) {
        return Array.from(feed.querySelectorAll('.WB_detail > .WB_from a[date], .WB_detail > .WB_from a[yawf-date]'));
      } else {
        return Array.from(feed.querySelectorAll('.content > .from a:first-child'));
      }
    } else if (isMain === false) {
      if (!isSearch) {
        return Array.from(feed.querySelectorAll('.WB_expand .WB_from a[date], .WB_expand .WB_from a[yawf-date]'));
      } else {
        return Array.from(feed.querySelectorAll('.card-comment .from a:first-child'));
      }
    } else {
      if (!isSearch) {
        return Array.from(feed.querySelectorAll('.WB_from a[date], .WB_from a[yawf-date]'));
      } else {
        return Array.from(feed.querySelectorAll('.from a:first-child'));
      }
    }
  };
  date.date = (feed, isMain) => {
    const domList = date.dom(feed, isMain);
    return domList.map(dom => (
      new Date(Number(dom.getAttribute('date') || dom.getAttribute('yawf-date')))
    )).filter(date => +date);
  };

  // 其他基础通用
  feedParser.isFeed = feed => isFeedElement(feed);
  feedParser.isSearchFeed = feed => isSearchFeedElement(feed);
  feedParser.isForward = feed => isForwardFeedElement(feed);

  feedParser.mid = node => feedContainer(node).getAttribute('mid');
  feedParser.omid = node => feedContainer(node).getAttribute('omid');

  // 评论内容
  commentParser.text = target => {
    const elements = commentContentElements(target);
    if (elements) {
      const texts = elements.map(element => commentTextParser(element) || '');
      return texts.join('\n');
    } else {
      return commentTextParser(target);
    }
  };

  // 评论用户
  const commentUser = commentParser.user = {};
  commentUser.dom = comment => {
    return Array.from(comment.querySelectorAll('a[usercard]'));
  };
  commentUser.name = comment => {
    const domList = commentUser.dom(comment);
    return domList
      .map(dom => dom.textContent.trim().replace(/^@?/, ''))
      .filter(user => user);
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

  const recognize = fast.recognize = {};
  // 识别选中的文本
  recognize.textSimple = function (selection) {
    if (!(selection instanceof Selection)) return [];
    if (!(selection + '')) return [];
    if (selection.rangeCount !== 1) return [];
    let simple, full, type;
    simple = (feedParser.text.simple(selection) || []).map(t => t.trim());
    full = (feedParser.text.detail(selection) || []).map(t => t.trim());
    type = 'text';
    if (!simple.join('') && !full.join('')) {
      simple = full = (commentParser.text(selection) || []).map(t => t.trim());
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
    let texts = feedParser.text.detail(selection).filter(text => text.trim());
    let type = 'multitext';
    if (!texts.length) {
      texts = commentParser.text(selection).filter(text => text.trim());
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
//#region @require yaofang://content/rule/filter/common/long.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const observer = yawf.observer;

  const request = yawf.request;

  const i18n = util.i18n;
  const dom = util.dom;

  /**
   * 统计一条微博的字数
   * 微博的字数英文按半字计算并四舍五入
   * @param {Element} html
   */
  const feedCharacterCount = function (text) {
    const content = text.textContent;
    const charCount = content.length;
    const latinCount = content.replace(/[^\u0020-\u00fe]/g, '').length;
    return Math.ceil(charCount - latinCount / 2);
  };

  Object.assign(i18n, {
    foldText: {
      cn: '收起全文',
    },
    textCount: {
      cn: '（约{1}字）',
      tw: '（約{1}字）',
      en: ' (about {1} characters)',
    },
  });

  observer.feed.onBefore(async function (feed) {
    const unfold = Array.from(feed.querySelectorAll('[action-type="fl_unfold"]'));
    // 这段逻辑基于 lib.feed.plugins.moreThan140
    // 包括直接把 HTML 插入进去的逻辑也是根据这段来做的
    const unfolding = unfold.map(async function (button) {
      const text = button.parentNode;
      if (!text.matches('.WB_text')) return;
      if (text.nextElementSibling && text.nextElementSibling.matches('.WB_text')) return;
      const mid = new URLSearchParams(button.getAttribute('action-data')).get('mid');
      const html = await request.getLongText(mid);
      const full = text.cloneNode(false);
      full.setAttribute('node-type', full.getAttribute('node-type') + '_full');
      dom.content(full, html);
      text.parentNode.insertBefore(full, text.nextSibling);
      const charCount = feedCharacterCount(full);
      const lineBreakCount = full.querySelectorAll('br').length;
      const foldButtonContainer = document.createElement('div');
      foldButtonContainer.innerHTML = '<a href="javascript:void(0);" ignore="ignore" class="WB_text_opt" action-type="fl_fold"><i class="W_ficon ficon_arrow_up">d</i></a>';
      const countTip = i18n.textCount.replace('{1}', () => charCount > 1000 ? Math.round(charCount / 100) * 100 : Math.round(charCount / 10) * 10);
      button.insertBefore(document.createTextNode(countTip), button.querySelector('i'));
      // 自动展开不超过指定字数的微博
      const expandLong = yawf.rules.feeds.content.expandLong;
      if (expandLong.getConfig() && expandLong.ref.count.getConfig() >= charCount + lineBreakCount * (expandLong.ref.br.getConfig() - 1)) {
        text.style.display = 'none';
      } else {
        full.style.display = 'none';
        const foldButton = foldButtonContainer.firstChild;
        foldButton.insertBefore(document.createTextNode(i18n.foldText), foldButton.firstChild);
        full.appendChild(foldButton);
      }
    });
    return Promise.all(unfolding).then(() => { });
  });

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
    const followConfig = await config.pool('Follow', { uid: init.page.$CONFIG.uid });
    const fetchData = new rule.class.OffscreenConfigItem({
      id: 'fetchData',
      configPool: followConfig,
      get initial() { return {}; },
      setConfig(value) {
        value.timestamp = Date.now();
        return super.setConfig(value);
      },
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
        if (!value) return {};
        if (!value.timestamp) return {};
        if (value.timestamp > Date.now() + 60e3) return {};
        if (value.timestamp < Date.now() - 86400e3 * 7) return {};
        if (value.pendingPages) {
          if (!Array.isArray(value.list)) return {};
        }
        return value;
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

  // 获取第一页的数据
  const fetchInitialize = async function () {
    const { fetchData } = followingContext;
    const lock = fetchData.touchTimestamp();
    const { allPages, followInPage } = await request.getFollowingPage(init.page.$CONFIG.uid);
    fetchData.assertLock(lock);
    const fetchContext = fetchData.getConfig();
    fetchContext.allPages = allPages;
    fetchContext.list = followInPage;
    fetchContext.currentPage = 1;
    fetchData.setConfig(fetchContext);
  };
  // 获取最后一页的数据
  const fetchNext = async function () {
    const { fetchData } = followingContext;
    const lock = fetchData.touchTimestamp();
    const oldFetchContext = fetchData.getConfig();
    const currentPage = oldFetchContext.currentPage;
    const nextPage = oldFetchContext.allPages[currentPage];
    const { followInPage } = await request.getFollowingPage(init.page.$CONFIG.uid, nextPage);
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
    const { add: lastAdd = [], lost: lastLost = [], rename: lastRename = [] } = lastChange || {};
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
    const { fetchData, lastList, lastChange } = followingContext;

    // 如果连续 10 分钟没有更新，那么可能是之前负责更新的那个页面被关闭或者出错了
    const { timestamp, lock, allPages } = fetchData.getConfig();
    if (timestamp > Date.now() - 600e3 && lock) {
      setTimeout(() => {
        if (fetchData.getConfig().timestamp === timestamp) updateFollowList();
      }, 600e3);
      return;
    }

    try {
      const lock = fetchData.getLock();
      util.debug('Fetch Follow: start follow fetching');
      // 如果之前获取到一半，那么就继续之前的工作，否则开始新工作
      if (!allPages) {
        util.debug('Fetch Follow: fetch first page');
        fetchData.assertLock(lock);
        await fetchInitialize();
        util.debug('Fetch Follow: fetch first done');
      }
      while (hasNextPage()) {
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
      return;
    }

    try {
      const newList = removeDuplicate(fetchData.getConfig().list);
      const oldList = lastList.getConfig();
      const changeList = (lastChange.getConfig() || {});
      const { add, lost, rename } = checkListDiff(oldList && oldList.list, newList, changeList);

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
    }
  };

  const clearFollowList = async function () {
    const { fetchData, lastList, lastChange } = followingContext;
    const { timestamp, lock } = fetchData.getConfig() || {};
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
    const filename = download.filename('following-' + init.page.$CONFIG.uid + '-' + date + '.csv');
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
    autoCheckFollowingRunning: { cn: '（正在更新）', en: '(Updating)' },
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
            wrap.innerHTML = '<li class="yawf-config-collection-item W_btn_b W_btn_tag"><div class="yawf-config-collection-item-content"><div class="yawf-config-user-item"><div class="yawf-config-user-avatar"><img /></div><div><a class="yawf-config-user-name" target="_blank"></a></div><div><span class="yawf-config-user-detail S_txt2"></span></div></div></div></li>';
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
          const fetchData = this.getConfig();
          const buttonArea = document.createElement('span');
          buttonArea.setAttribute('yawf-config-item', this.configId);
          buttonArea.innerHTML = '<span class="yawf-following-checking"></span><a href="javascript:;" class="W_btn_b yawf-following-check-now"><span class="W_f14"></span></a>';
          buttonArea.querySelector('.yawf-following-checking').textContent = i18n.autoCheckFollowingRunning;
          const checkingText = buttonArea.querySelector('.yawf-following-checking');
          const checkNowButton = buttonArea.querySelector('.yawf-following-check-now');
          checkNowButton.addEventListener('click', event => {
            if (!event.isTrusted) return;
            updateFollowList();
          });
          checkNowButton.querySelector('span').textContent = i18n.autoCheckFollowingNow;
          if (fetchData && fetchData.lock) checkNowButton.style.display = 'none';
          else checkingText.style.display = 'none';
          return buttonArea;
        },
        renderValue(buttonArea) {
          const fetchData = this.getConfig();
          const checkingText = buttonArea.querySelector('.yawf-following-checking');
          const checkNowButton = buttonArea.querySelector('.yawf-following-check-now');
          if (fetchData && fetchData.lock) {
            checkNowButton.style.display = 'none';
            checkingText.style.display = '';
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
          buttonArea.innerHTML = '<span class="yawf-following-last-text"></span><span class="yawf-following-last-time"></span><a href="javascript:;" class="W_btn_b yawf-following-export" style="margin-left:1em;"><span class="W_f14"></span></a><a href="javascript:;" class="W_btn_b yawf-following-clear" style="margin-left:1em;"><span class="W_f14"></span></a>';
          const lastTimeText = buttonArea.querySelector('.yawf-following-last-text');
          const lastTime = buttonArea.querySelector('.yawf-following-last-time');
          const exportButton = buttonArea.querySelector('.yawf-following-export');
          const clearFollowing = buttonArea.querySelector('.yawf-following-clear');
          exportButton.querySelector('span').textContent = i18n.autoCheckFollowingDownload;
          clearFollowing.querySelector('span').textContent = i18n.autoCheckFollowingClean;
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
      if (enabled && (!list || !list.list)) shouldUpdate = true;
      if (enabled && list && list.timestamp < Date.now() - frequency) shouldUpdate = true;
      if (shouldUpdate) setTimeout(updateFollowList, 10e3);
      const change = lastChange.getConfig();
      if (change && change.timestamp) {
        if (init.page.type() === 'search') return;
        showChangeList(change).then(confirm => confirm && lastChange.setConfig(null));
      }
    },
  });

  css.append(`
.yawf-following-add-title, .yawf-following-lost-title, .yawf-following-rename-title { font-weight: bold; margin: 10px 0 5px; } 
.yawf-following-notice-header { padding: 20px; }
.yawf-following-notice-body { padding: 0 20px; width: 600px; max-height: 320px; overflow: auto; } 
.yawf-following-notice-footer { padding: 20px; } 
.yawf-following-notice-body a.yawf-config-user-name { color: inherit; }
.yawf-following-rename .yawf-config-user-name, .yawf-following-rename .yawf-config-user-detail { display: inline-block; text-overflow: ellipsis; white-space: nowrap; vertical-align: top; }
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
.WB_editor_iframe, .WB_editor_iframe_new { height: auto !important; }
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
  const env = yawf.env;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const request = yawf.request;
  const browserInfo = yawf.browserInfo;
  const stk = yawf.stk;
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
    feedsUnreadTip: {
      cn: '有 {1} 条新微博，点击查看',
      tw: '有 {1} 條新微博，點擊查看',
      en: '{1} new feeds',
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

  // 因为 YAWF 脚本用的 -1，这里为了避免可能的冲突（虽然别的功能还是会冲突），所以用 -2
  const CUSTOM_GID = -2;

  const fixHomeUrl = function (target) {
    const setParam = function (url) {
      if (target === 'newest') {
        url.searchParams.delete('gid');
        url.searchParams.set('is_new', 1);
      } else if (target === 'custom') {
        url.searchParams.set('gid', CUSTOM_GID);
      } else if (target.startsWith('g')) {
        url.searchParams.set('gid', target.slice(1));
      } else if (target === 'whisper') {
        url.searchParams.delete('gid');
        url.searchParams.set('whisper', 1);
      }
    };
    const updateLocation = function updateLocation() {
      const isHomeFeed = document.getElementById('v6_pl_content_homefeed');
      const notHomeFeed = document.getElementById('v6_pl_content_commentlist') ||
        document.querySelector('[id^="Pl_Official_MyProfileFeed__"]');
      if (!isHomeFeed && !notHomeFeed) return;
      const url = new URL(location.href);
      const hasGid = Boolean(+url.searchParams.get('gid'));
      const isNew = Boolean(+url.searchParams.get('is_new'));
      const isSearch = Boolean(+url.searchParams.get('is_search'));
      const isSpecial = ['isfriends', 'vplus', 'isfriends', 'isgroupsfeed', 'whisper']
        .some(key => +url.searchParams.get(key));
      const isCustomGid = hasGid && url.searchParams.get('gid') < 0;
      const shouldBeFixed = isHomeFeed && !isSearch && !isSpecial;
      const shouldRemoveGid = notHomeFeed && isCustomGid;
      const incorrectGid = isCustomGid && target !== 'custom';
      if ((!hasGid || incorrectGid) && !isNew && shouldBeFixed) {
        setParam(url);
        observer.dom.remove(updateLocation);
        location.replace(url.href);
      } else if (hasGid && shouldRemoveGid) {
        url.searchParams.delete('gid');
        observer.dom.remove(updateLocation);
        location.replace(url);
      }
    };
    observer.dom.add(updateLocation);

    const updateHomeLinks = function updateHomeLinks() {
      /** @type {HTMLAnchorElement[]} */
      const links = Array.from(document.querySelectorAll([
        '.gn_logo a', // 导航栏logo
        'a[suda-uatrack*="homepage"]', // 首页链接，根据跟踪标识识别；适用于顶栏和左栏
        '#v6_pl_content_homefeed a[action-type="search_type"][action-data="type=0"]', // 首页消息流顶部的“全部”链接
      ].map(selector => selector + ':not([href*="is_search"])').join(',')));
      links.forEach(link => {
        const url = new URL(link.href);
        setParam(url);
        link.href = url.href;
      });
    };
    observer.dom.add(updateHomeLinks);
  };

  homepage.newestFeeds = rule.Rule({
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
      fixHomeUrl('newest');
    },
  });

  let groupListLazyPromiseResolve;
  const groupListLazyPromise = new Promise(resolve => {
    groupListLazyPromiseResolve = resolve;
  }).then(async () => {
    const groups = await request.groupList();
    return groups.map(({ name, id }) => ({ text: name, value: id }));
  });
  homepage.singleGroup = rule.Rule({
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
      let group = this.ref.group.getConfig();
      if (group == null) {
        await groupListLazyPromise;
        group = this.ref.group.getConfig();
      }
      fixHomeUrl(group);
    },
  });

  homepage.multiGroup = rule.Rule({
    id: 'filter_homepage_multi_group',
    version: 1,
    parent: homepage.homepage,
    template: () => i18n.feedsHomepageMultiGroup,
    ref: {
      count: {
        type: 'range',
        min: 20,
        max: 200,
        initial: 50,
        step: 10,
      },
      more: {
        type: 'select',
        select: [
          { value: 'keep', text: () => i18n.feedsHomepageKeepOld },
          { value: 'clear', text: () => i18n.feedsHomepageCleanOld },
        ],
        initial: 'clear',
      },
      unread: {
        type: 'boolean',
      },
      groups: {
        type: 'groups',
      },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.feedsHomepageMultiGroupDetail },
      ii: { type: 'bubble', icon: 'warn', template: () => i18n.feedsHomepageMultiGroupDetail2 },
    },
    init() {
      this.addConfigListener(config => {
        if (config) {
          homepage.newestFeeds.setConfig(false);
          homepage.singleGroup.setConfig(false);
        }
      });
    },
    ainit() {
      const rule = this;
      const count = rule.ref.count.getConfig();
      const unread = rule.ref.unread.getConfig();
      const groups = rule.ref.groups.getConfig().slice(0);
      const clear = rule.ref.more.getConfig() === 'clear';
      const autoLoad = homepage.autoLoad.isEnabled();

      if (groups.length === 0) return;

      fixHomeUrl('custom');

      // 检查当前页面是否需要启用分组拼凑首页功能
      const checkPage = function checkMultiGroupPage() {
        const query = new URLSearchParams(location.search);
        const gid = +query.get('gid');
        if (gid !== CUSTOM_GID) return;
        if (!Array.isArray(groups)) return;
        if (groups.length < 2) return;
        query.delete('gid');
        observer.dom.add(function multiGroupPageFix() {
          watchFeedList(query);
          watchMembers();
        });
      };

      const getLoadingTip = function () {
        const container = document.createElement('div');
        container.innerHTML = '<div class="WB_cardwrap S_bg2"><div class="WB_empty WB_empty_narrow"><div class="WB_innerwrap"><div class="empty_con clearfix"><p class="text"><i class="W_loading"></i></p></div></div></div></div>';
        container.querySelector('.text').appendChild(document.createTextNode(i18n.feedsMultiGroupLoading));
        return container.firstChild;
      };
      const getShowMore = function () {
        const container = document.createElement('div');
        container.innerHTML = '<div class="WB_cardwrap S_bg2 yawf-multiGroupMore"><a class="WB_cardmore WB_cardmore_noborder clearfix" href="javascript:;"><span class="more_txt W_f14"><em class="W_ficon ficon_arrow_down">c</em></span></a></div>';
        const textContainer = container.querySelector('span');
        textContainer.insertBefore(document.createTextNode(i18n.feedsMultiGroupLoadMore), textContainer.firstChild);
        return container.firstChild;
      };

      // 找到消息流的容器，并初始化好它
      const watchFeedList = function (query) {
        const placeholder = document.querySelector('.WB_feed > .WB_result_null');
        if (!placeholder) return;
        let feedlist = placeholder.parentElement;
        feedlist.removeChild(placeholder);
        fillFeedList(feedlist, query);
      };

      // 初始化消息流容器
      const fillFeedList = function (feedlist, query) {
        feedlist.classList.add('WB_feed_v3', 'WB_feed_v4');
        const loading = getLoadingTip();
        feedlist.appendChild(loading);
        const showmore = getShowMore();
        showmore.style.display = 'none';
        feedlist.appendChild(showmore);

        const getter = showFeeds(groups, query, { feedlist, loading, showmore });
        if (unread) {
          initUnread(groups, query, getter, { feedlist });
        }
      };

      // 下掉边栏组内用户的组件
      const watchMembers = function () {
        const members = document.getElementById('v6_pl_rightmod_groups');
        if (members) members.parentNode.removeChild(members);
      };

      // 初始化拼凑首页的逻辑
      const showFeeds = function (groups, query, dom) {
        const getter = request.feedsByGroups(groups, query);
        showMoreFeeds(getter, count, dom);
        return getter;
      };

      // 一条一条往消息流里面塞内容
      const showMoreFeeds = async function (getter, remain, dom) {
        const hasNext = await getter.hasNext();
        if (!hasNext) {
          everythingDone(dom);
          return;
        }
        if (remain === 0) {
          await waitShowMore(dom);
          remain = count;
        }
        const feed = await getter.next();
        if (feed.type === 'feed') {
          renderFeed(feed.dom, dom);
          await new Promise(resolve => setTimeout(resolve, 10));
          remain--;
        } else {
          renderDone(feed.group, dom);
        }
        showMoreFeeds(getter, remain, dom);
      };

      // 完成一组显示后等用户的操作再继续
      const waitShowMore = async function ({ feedlist, loading, showmore }) {
        loading.style.display = 'none';
        showmore.style.display = 'block';
        await new Promise(resolve => {
          const listener = () => {
            showmore.removeEventListener('click', listener);
            resolve();
          };
          showmore.addEventListener('click', listener);
        });
        loading.style.display = 'block';
        showmore.style.display = 'none';
        if (clear) {
          const nav = document.querySelector('.WB_global_nav');
          const navBottom = nav.clientTop + nav.clientHeight;
          const feedlistTop = feedlist.parentNode.offsetTop;
          const margin = 10;
          document.documentElement.scrollTop = feedlistTop - (navBottom + margin);
          while (feedlist.firstChild !== loading) {
            feedlist.removeChild(feedlist.firstChild);
          }
        }
      };

      // 显示一条消息
      const renderFeed = function (feed, { feedlist, loading }) {
        feedlist.insertBefore(feed, loading);
      };

      // 完成一个分组的加载
      const renderDone = function (group, { feedlist, loading }) {
        const container = document.createElement('div');
        container.innerHTML = '<div class="WB_cardwrap S_bg2 yawf-multiGroupDone"><div class="WB_cardtitle_a W_tc yawf-multiGroupDoneTitle"></div></div>';
        const titleContainer = container.querySelector('.yawf-multiGroupDoneTitle');
        const [textBefore, textAfter] = i18n.feedsHomePageDoneGroup.split('{1}');
        titleContainer.appendChild(document.createTextNode(textBefore));
        const groupNameContainer = titleContainer.appendChild(document.createElement('span'));
        titleContainer.appendChild(document.createTextNode(textAfter));
        request.groupList().then(groupList => {
          const gotGroup = groupList.find(({ id }) => id === group.id);
          if (gotGroup) groupNameContainer.textContent = gotGroup.name;
        });
        feedlist.insertBefore(container, loading);
      };

      // 所有分组都完成加载
      const everythingDone = function ({ feedlist, loading, showmore }) {
        feedlist.removeChild(loading);
        feedlist.removeChild(showmore);
      };

      const showUnreadFeeds = async function (groups, query, getter, unreadChecker, { newfeedtip, feedlist }, status) {
        unreadChecker.pause();
        if (status > count && !autoLoad) {
          // 未读消息太多了，我们直接刷新算了
          feedlist.innerHTML = '';
          newfeedtip.remove();
          fillFeedList(feedlist, query);
        } else {
          if (!autoLoad) {
            const link = newfeedtip.querySelector('a');
            link.textContent = i18n.feedsUnreadLoading;
            const loading = document.createElement('i');
            loading.className = 'W_loading';
            link.insertBefore(loading, link.firstChild);
            feedlist.insertBefore(newfeedtip, feedlist.firstChild);
          }
          const fragement = document.createDocumentFragment();
          const newGetter = request.feedsByGroups(groups, query);
          for (let limit = count; limit; limit--) {
            const feed = await newGetter.next();
            if (feed.type !== 'feed') continue;
            if (getter.isShown(feed)) break;
            const feedDom = fragement.appendChild(feed.dom);
            if (autoLoad) {
              feedDom.setAttribute('yawf-feed-preload', 'unread');
            }
            getter.addShown(feed);
          }
          feedlist.insertBefore(fragement, feedlist.firstChild);
          if (!autoLoad) {
            newfeedtip.remove();
          }
          unreadChecker.run();
        }
      };

      // 显示新消息提示横幅
      const noticeUnread = function (data, groups, query, getter, { feedlist }, unreadChecker) {
        const status = data.status;
        if (!status) {
          const newfeedtip = document.getElementById('yawf-group-new-feed-tip');
          if (newfeedtip) newfeedtip.remove();
        } else if (autoLoad) {
          showUnreadFeeds(groups, query, getter, unreadChecker, { newfeedtip: null, feedlist }, status);
        } else {
          if (!document.getElementById('yawf-group-new-feed-tip')) {
            const container = document.createElement('div');
            container.innerHTML = '<div class="WB_cardwrap WB_notes" id="yawf-group-new-feed-tip"><a href="javascript:void(0);"></a></div>';
            const newfeedtip = container.firstChild;
            feedlist.parentNode.insertBefore(newfeedtip, feedlist);
            const clickToShowUnreadFeeds = () => {
              showUnreadFeeds(groups, query, getter, unreadChecker, { newfeedtip, feedlist }, newfeedtip.dataset.status);
            };
            newfeedtip.querySelector('a').addEventListener('click', clickToShowUnreadFeeds);
            document.addEventListener('keyup', function loadContentKey(event) {
              if (keyboard.event(event) !== keyboard.code.PERIOD) return;
              document.removeEventListener('keyup', loadContentKey);
              clickToShowUnreadFeeds();
            });
          }
          const newfeedtip = document.getElementById('yawf-group-new-feed-tip');
          if (Number(newfeedtip.dataset.status) !== status) {
            newfeedtip.dataset.status = status;
            newfeedtip.querySelector('a').textContent = i18n.feedsUnreadTip.replace('{1}', status);
          }
        }
      };

      // 初始化未读提示
      const initUnread = async function (groups, query, getter, { feedlist }) {
        if (!env.config.stkInfoSupported) return;
        const searchParams = ['is_ori', 'is_forward', 'is_text', 'is_pic', 'is_video', 'is_music', 'is_article', 'key_word', 'start_time', 'end_time', 'is_search', 'is_searchadv'];
        // 不支持搜索页面
        if (searchParams.some(param => query.has(param))) return;
        const stkInfo = await stk.info;
        const unreadChecker = request.unreadByGroups(groups, stkInfo);
        const callback = data => {
          noticeUnread(data, groups, query, getter, { feedlist }, unreadChecker);
        };
        unreadChecker.watch(callback);
        observer.dom.add(function waitFeedListRemoved() {
          if (document.contains(feedlist)) return;
          unreadChecker.unwatch(callback);
          observer.dom.remove(waitFeedListRemoved);
        });
      };

      checkPage();

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
          newfeedtip.querySelector('a').textContent = i18n.feedsUnreadTip.replace('{1}', status);
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
        if (init.page.$CONFIG.uid === feedParser.author.id(feed)[0]) isUnread = false;
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
      uid: init.page.$CONFIG.uid,
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
        const [authorId] = feedParser.author.id(feed);
        if (!authorId || authorId === init.page.$CONFIG.uid) return; // 自己的微博，不显示按钮
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
      const rule = this;
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
        const list = feed.closest('.WB_feed');
        if (!list) return; // 搜索页面
        const container = list.parentNode;
        const sibling = container.previousSibling;
        if (sibling && sibling.nodeType === Node.ELEMENT_NODE) {
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
    textContentFold: {
      cn: '折叠包含以下内容的微博||关键词{{items}}',
      tw: '折疊包含以下內容的微博||關鍵字{{items}}',
      en: 'Fold feeds with these content||keyword {{items}}',
    },
    textContentReason: {
      cn: '关键词“{1}”',
      tw: '关键字「{1}」',
      en: 'content "{1}"',
    },
  });

  class TextFeedRule extends rule.class.Rule {
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
      fold: {
        title: () => i18n.textContentFold,
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
    regexContentFold: {
      cn: '折叠匹配以下正则表达式的微博||正则式{{items}}',
      hk: '折叠匹配以下正則表達式的微博||正則式{{items}}',
      tw: '折叠匹配以下正規表示式的微博||正規式{{items}}',
      en: 'Fold feeds match these regexen||Regexen {{items}}',
    },
    regexContextReason: {
      cn: '正则匹配',
      hk: '正則符合',
      tw: '正規符合',
      en: 'regexp matched',
    },
  });

  class RegexFeedRule extends rule.class.Rule {
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
        const reason = ((matchReg + '').match(/\(\?=\|(([^)]|\\\))*)\)/) || [])[1] || i18n.regexContextReason;
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
      fold: {
        title: () => i18n.regexContentFold,
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
    accountAuthorFold: {
      cn: '折叠以下作者的微博||作者{{items}}',
      tw: '折疊以下作者的微博||作者{{items}}',
      en: 'Fold feeds from these authors||author {{items}}',
    },
    accountAuthorReason: {
      cn: '作者 @{1}',
      tw: '作者 @{1}',
      en: 'posted by @{1}',
    },
  });

  class AuthorFeedRule extends rule.class.Rule {
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function authorFilterFeedFilter(/** @type {Element} */feed) {
        const oid = init.page.$CONFIG.oid;
        const [author] = feedParser.author.id(feed);
        // 个人主页不按照作者隐藏（否则就会把所有东西都藏起来……）
        if (String(author) === String(oid) && rule.feedAction !== 'show') return null;
        const accounts = rule.ref.items.getConfig();
        const contain = accounts.find(account => account.id === author);
        const reason = i18n.accountAuthorReason.replace('{1}', () => feedParser.author.name(feed));
        if (contain) return { result: rule.feedAction, reason };
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
      fold: {
        title: () => i18n.accountAuthorFold,
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
    accountAuthorForwardFold: {
      cn: '折叠以下作者转发的微博||帐号{{items}}',
      tw: '折叠以下作者轉發的微博||帳號{{items}}',
      en: 'Fold feeds from these authors\' forwarding||author {{items}}',
    },
    accountAuthorForwardReason: {
      cn: '由 @{1} 转发',
      tw: '由 @{1} 轉發',
      en: 'forwarded by @{1}',
    },
  });

  class AuthorForwardFeedRule extends rule.class.Rule {
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function authorFilterFeedFilter(/** @type {Element} */feed) {
        const isForward = feedParser.isForward(feed);
        if (!isForward) return null;
        const [author] = feedParser.author.id(feed);
        const accounts = rule.ref.items.getConfig();
        const contain = accounts.find(account => account.id === author);
        if (!contain) return null;
        const reason = i18n.accountAuthorForwardReason.replace('{1}', () => feedParser.author.name(feed));
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
      fold: {
        title: () => i18n.accountAuthorForwardFold,
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
    accountOriginalFold: {
      cn: '折叠转发自以下帐号的微博||原作者{{items}}',
      tw: '折疊轉發自以下帳號的微博||原作者{{items}}',
      en: 'Fold feeds forwarded from these authors||original {items}}',
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
    accountOriginalFollower: {
      cn: '隐藏转发自|粉丝数量超过{{count}}万的博主的微博{{i}}||例外帐号{{account}}',
      tw: '隱藏轉發自|粉絲數量超過{{count}}萬的博主的微博{{i}}||例外帐号{{account}}',
      en: 'Hide feeds forwarded from authors with | more than {{count}}0,000 fans{{i}}||Exception {{account}}',
    },
    accountOriginalFollowerDetail: {
      cn: '发现页面作者不计入。',
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
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.feed.filter(function originalFilterFeedFilter(/** @type {Element} */feed) {
        const accounts = rule.ref.items.getConfig();

        const original = new Set(feedParser.original.id(feed));
        if (accounts.find(account => original.has(account.id))) {
          const name = feedParser.original.name(feed);
          const reason = i18n.accountOriginalReason.replace('{1}', () => name);
          return { result: rule.feedAction, reason };
        }

        if (rules.original.id.discover.isEnabled() && init.page.type() === 'discover') {
          const [author] = feedParser.author.id(feed);
          if (accounts.find(account => author === account.id)) {
            const name = feedParser.author.name(feed);
            const reason = i18n.accountOriginalDiscoverReason.replace('{1}', () => name);
            return { result: rule.feedAction, reason };
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
      fold: {
        title: () => i18n.accountOriginalFold,
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
    accountMentionFold: {
      cn: '折叠提到以下帐号的微博||作者{{items}}',
      tw: '折疊提到以下帳號的微博||作者{{items}}',
      en: 'Fold feeds mentioned these accounts||mention {{items}}',
    },
    accountMentionReason: {
      cn: '提到了 @{1}',
      tw: '提到了 @{1}',
      en: 'mentioned @{1}',
    },
  });

  class MentionFeedRule extends rule.class.Rule {
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
      fold: {
        title: () => i18n.accountMentionFold,
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
    topicFold: {
      cn: '折叠包含以下话题的微博||话题{{items}}',
      tw: '折疊包含以下話題的微博||話題{{items}}',
      en: 'Fold feeds with these topics||topic {{items}}',
    },
    topicReason: {
      cn: '提到话题 {1}',
      tw: '提到話題 {1}',
      en: 'mentioned topic {1}',
    },
  });

  class TopicFeedRule extends rule.class.Rule {
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
      fold: {
        title: () => i18n.topicFold,
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
    sourceFold: {
      cn: '折叠来自以下来源的微博||来源{{items}}',
      tw: '折疊來自以下來源的微博||來源{{items}}',
      en: 'Fold feeds from these sources||source {{items}}',
    },
    sourceReason: {
      cn: '来自 {1}',
      tw: '來自 {1}',
      en: 'posted via {1}',
    },
  });

  class SourceFeedRule extends rule.class.Rule {
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
        const reason = i18n.sourceReason.replace('{1}', () => contain);
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
      fold: {
        title: () => i18n.sourceFold,
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
    id: 'filter_my_feed',
    version: 1,
    parent: showthese.showthese,
    template: () => i18n.showMyFeedDetail,
    initial: true,
    init() {
      const rule = this;
      observer.feed.filter(function showMyFeed(feed) {
        if (!rule.isEnabled()) return null;
        const me = init.page.$CONFIG.uid;
        const [author] = feedParser.author.id(feed);
        if (String(me) === String(author)) return 'showme';
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
    id: 'filter_my_original',
    version: 1,
    parent: showthese.showthese,
    template: () => i18n.showMyOriginalDetail,
    init() {
      const rule = this;
      observer.feed.filter(function showMyOriginal(feed) {
        if (!rule.isEnabled()) return null;
        const me = init.page.$CONFIG.uid;
        const [original] = feedParser.original.id(feed);
        if (String(me) === String(original)) return 'showme';
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
    id: 'filter_mention_me',
    version: 1,
    parent: showthese.showthese,
    template: () => i18n.showMentionMeDetail,
    init() {
      const rule = this;
      observer.feed.filter(function showMentionMe(feed) {
        if (!rule.isEnabled()) return null;
        const me = init.page.$CONFIG.nick;
        const mentions = feedParser.mention.name(feed);
        if (mentions.includes(me)) return 'showme';
        return null;
      }, { priority: 1e4 });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

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
    cn: '推广微博/粉丝通微博/品牌速递/好友赞过的微博 {{i}}',
    tw: '推廣微博/粉絲通微博/品牌速遞/好友贊過的微博 {{i}}',
    en: 'Ad Weibo / Inserted not followed Weibo {{i}}',
  };
  i18n.adFeedFilterDetail = {
    cn: '这些微博一般出现在您的首页，带有“推荐”“好友赞过”等标记，但大多来自您并未关注的人。',
  };

  commercial.ad = rule.Rule({
    id: 'filter_ad_feed',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.adFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.adFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function adFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        // 修改这里时请注意，悄悄关注也会显示关注按钮，但是相关微博不应被隐藏
        if (feed.getAttribute('feedtype') === 'ad') return 'hide';
        if (feed.querySelector('[action-type="feed_list_ad"]')) return 'hide';
        if (feed.querySelector('a[href*="//adinside.weibo.cn/"]')) return 'hide';
        if (feed.querySelector('[diss-data*="feedad"]')) return 'hide';
        if (feed.querySelector('[suda-uatrack*="insert_feed"]')) return 'hide';
        if (feed.querySelector('[suda-uatrack*="negativefeedback"]')) return 'hide';
        if (feed.querySelector('[suda-uatrack*="1022-adFeedEvent"]')) return 'hide';
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
        if (feed.querySelector('[adcard="fanstop"]')) return 'hide';
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

  commercial.weiboProduct = rule.Rule({
    id: 'filter_weibo_product',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.weiboProductFeedFilter,
    ref: {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.weiboProductFeedFilterDetail },
    },
    init() {
      const rule = this;
      observer.feed.filter(function weiboProductFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('.WB_feed_spec[exp-data*="key=tblog_weibocard"][exp-data*="1022-product"]')) return 'hide';
        if (feed.querySelector('.WB_feed_spec[exp-data*="key=tblog_weibocard"][exp-data*="2017845002-product"]')) return 'hide';
        if (feed.querySelector('a[action-type="feed_list_url"][suda-uatrack*="2017845002-product"]')) return 'hide';
        if (feed.querySelector('a[action-type="feed_list_url"][suda-uatrack*="2017845002-collection"]')) return 'hide';
        if (feed.querySelector('.media_box .buy_list')) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.taobaoProductFeedFilter = {
    cn: '带有淘宝、天猫或聚划算商品的微博{{i}}',
    tw: '帶有淘寶、天貓或聚划算商品的微博{{i}}',
    en: 'Weibo with Taobao / Tmall / Juhuasuan commodity{{i}}',
  };
  i18n.taobaoProductFeedFilterDetail = {
    cn: '带有{{taobao}}、{{tmall}}或{{juhuasuan}}的微博',
  };
  i18n.taobaoProduct = {
    cn: '淘宝商品',
  };
  i18n.tmallProduct = {
    cn: '天猫商品',
  };
  i18n.juhuasuanProduct = {
    cn: '聚划算商品',
  };

  commercial.taobaoProduct = rule.Rule({
    id: 'filter_tb_tm_feed',
    version: 1,
    parent: commercial.commercial,
    template: () => i18n.taobaoProductFeedFilter,
    ref: {
      i: {
        type: 'bubble',
        icon: 'ask',
        template: () => i18n.taobaoProductFeedFilterDetail,
        ref: Object.assign(...[
          { id: 'taobao', className: 'icon_cd_tb', content: () => i18n.taobaoProduct },
          { id: 'tmall', className: 'icon_cd_tmall', content: () => i18n.tmallProduct },
          { id: 'juhuasuan', className: 'icon_cd_ju', content: () => i18n.juhuasuanProduct },
        ].map(({ id, className, content }) => ({
          [id]: {
            render() {
              const wrap = document.createElement('div');
              wrap.innerHTML = '<span class="W_btn_b W_btn_cardlink btn_22px"><span class="ico_spe"><i class="W_icon yawf-card-icon"></i></span><span class="W_autocut yawf-card-content"></span></span>';
              const icon = wrap.querySelector('.yawf-card-icon');
              icon.classList.add(className);
              const text = wrap.querySelector('.yawf-card-content');
              text.textContent = content();
              return wrap.firstChild;
            },
          },
        }))),
      },
    },
    init() {
      const rule = this;
      observer.feed.filter(function taobaoProductFeedFilter(feed) {
        if (!rule.isEnabled()) return null;
        if (feed.querySelector('.icon_cd_tmall, .icon_cd_tb, .icon_cd_ju')) return 'hide';
        if (feed.querySelector('a[href^="https://shoptb.sc.weibo.com/"]')) return 'hide';
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
        const { oid, onick } = init.page.$CONFIG;
        if (!oid || !onick) return null;
        const [id] = feedParser.author.id(feed);
        if (String(id) !== String(oid)) return 'hide';
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
      const rule = this;
      observer.feed.filter(function fakeWeiboFilter(feed) {
        if (feed.matches('[id^="Pl_Core_WendaList__"] *')) return null;
        if (feed.hasAttribute('mid')) return null;
        if (rule.isEnabled() && init.page.type() !== 'search') return 'hide';
        return 'unset';
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
  const init = yawf.init;

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
    cn: '已删除微博的转发{{i}}',
    tw: '已刪除微博的轉發{{i}}',
    en: 'Forward of deleted Weibo{{i}}',
  };
  i18n.deletedForwardFilterDetail = {
    cn: '包括因为删除或对微博设置了隐私权限而使您无法看到原文的微博。这些微博您只能看见转发者的评论，但是无法看到原微博的内容。',
  };

  content.deletedForward = rule.Rule({
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
        const isForward = feed.getAttribute('isforward') === '1';
        if (!isForward) return null;
        const forwardContent = feed.querySelector('.WB_media_expand .WB_info .WB_name, .WB_expand .WB_info .W_fb');
        if (forwardContent) return null;
        return 'hide';
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
        if (feed.getAttribute('isforward') !== '1') return null;
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
        if (feed.querySelector('.WB_from a[href*="//vote.weibo.com/"]')) return 'hide';
        if (feed.querySelector('.WB_feed_spec_cont a[action-data*="vote.weibo.com"]')) return 'hide';
        if (feed.querySelector('a[suda-uatrack*="1022-vote"]')) return 'hide';
        if (feed.querySelector('a[suda-uatrack*="1022-hudongvote"]')) return 'hide';
        if (feed.querySelector('.icon_sw_vote')) return 'hide';
        if (feedParser.source.text(feed).includes('投票')) return 'hide';
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
        const list = feed.querySelector('.WB_media_a[action-data*="photo_tag_pids"]');
        if (!list) return null;
        const tagPidsStr = new URLSearchParams(list.getAttribute('action-data')).get('photo_tag_pids');
        if (!tagPidsStr) return null;
        const tagPids = tagPidsStr.split(',');
        const items = feed.querySelectorAll('[action-type="fl_pics"][action-data*="pic_id"]');
        const hasTag = Array.from(items).some(item => {
          const id = new URLSearchParams(item.getAttribute('action-data')).get('pic_id');
          return tagPids.includes(id);
        });
        if (!hasTag) return null;
        return 'hide';
      });
      this.addConfigListener(() => { observer.feed.rerun(); });
    },
  });

  i18n.koiForwardFeedFilter = {
    cn: '转发图标是锦鲤的微博（转发抽奖的微博？）',
    tw: '轉發圖示是錦鯉的微博（轉發抽獎的微博？）',
    en: 'Forward icon as a koi (forward this weibo for draw?)',
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
        const searchParams = new URLSearchParams(location.search);
        const paidOnly = +searchParams.get('vplus') || searchParams.get('is_vclub');
        if (paidOnly) return null;
        if (feed.querySelector('.icon_vplus')) return 'hide';
        if (feed.querySelector('.WB_media_a[action-data*="isPrivate"]:not([action-data*="isPrivate=0"])')) return 'hide';
        if (feed.querySelector('[action-type="fl_pics"][action-data*="isPrivate"]:not([action-data*="isPrivate=0"])')) return 'hide';
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
      const { type, name, recognizer } = linkTypes[id];
      const pascalCaseType = type.replace(/^./, c => c.toUpperCase());
      link[type] = rule.Rule({
        id: `filter_${pascalCaseType}`,
        version: 30,
        parent: link.link,
        template: () => i18n.feedWithLink.replace('{}', name),
        init() {
          const rule = this;
          observer.feed.filter(function feedWithSpecialLinkFilter(feed) {
            if (!rule.isEnabled()) return null;
            if (init.page.type() === type) return null;
            if (feed.querySelector(`a[suda-uatrack*="1022-${type}"]`)) return 'hide';
            if (recognizer && recognizer(feed)) return 'hide';
            return null;
          });
          this.addConfigListener(() => { observer.feed.rerun(); });
        },
      });
    });
  }({
    100101: {
      type: 'place',
      name: () => i18n.feedWithLinkPlace,
    },
    100120: {
      type: 'movie',
      name: () => i18n.feedWithLinkMovie,
    },
    100202: {
      type: 'book',
      name: () => i18n.feedWithLinkBook,
    },
    100808: {
      type: 'topic',
      name: () => i18n.feedWithLinkTopic,
      recognizer: feed => {
        const source = feed.querySelector('.WB_from a[href^="https://huati.weibo.com/k/"]');
        if (source) return true;
        return false;
      },
    },
    101515: {
      type: 'music',
      name: () => i18n.feedWithLinkMusic,
    },
    230677: {
      type: 'stock',
      name: () => i18n.feedWithLinkStock,
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
    floodingFeedHide: { cn: '隐藏', tw: '隱藏', en: 'hidden' },
    floodingFeedFold: { cn: '折叠', tw: '折疊', en: 'folded' },
    floodingAuthor: {
      cn: '相同作者|超过{{number}}条微博|时超出的{{action}}||{{group}}在分组页面同样生效',
      tw: '相同作者|超過{{number}}條微博|時超出的{{action}}||{{group}}在分組頁面同樣生效',
      en: 'Feeds by same author will | be {{action}} | when more than {{number}} seen||{{group}} Also apply to grouping pages',
    },
    floodingAuthorReason: {
      cn: '刷屏',
      tw: '洗版',
      en: 'flooding',
    },
    floodingForward: {
      cn: '相同微博的转发|超过{{number}}条|时超出的{{action}}',
      tw: '相同微博的轉發|超過{{number}}條|時超出的{{action}}',
      en: 'Feeds forwarded form same one will | be {{action}} | when more than {{number}} seen',
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
      action: {
        type: 'select',
        initial: 'hide',
        select: [
          { value: 'hide', text: () => i18n.floodingFeedHide },
          { value: 'fold', text: () => i18n.floodingFeedFold },
        ],
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
        const me = init.page.$CONFIG.uid;
        const [author] = feedParser.author.id(feed);
        // 自己的微博发多少也不触发这个规则
        if (String(me) === String(author)) return null;
        // 个人主页不工作
        if (init.page.type() === 'profile') return null;
        // 分组页面根据设置决定是否生效
        if (init.page.type() === 'group') {
          if (rule.ref.group.getConfig()) return null;
        }
        parsed.set(feed, author);
        const feeds = [...document.querySelectorAll('[mid]')];
        const count = feeds.filter(feed => parsed.get(feed) === author).length;
        if (count <= rule.ref.number.getConfig()) return null;
        const result = rule.ref.action.getConfig();
        const reason = i18n.floodingAuthorReason;
        return { result, reason };
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
      action: {
        type: 'select',
        initial: 'hide',
        select: [
          { value: 'hide', text: () => i18n.floodingFeedHide },
          { value: 'fold', text: () => i18n.floodingFeedFold },
        ],
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
        const result = rule.ref.action.getConfig();
        const reason = i18n.floodingForwardReason;
        return { result, reason };
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
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.comment.filter(function textCommentFilter(/** @type {Element} */comment) {
        const text = commentParser.text(comment);
        const keywords = rule.ref.items.getConfig();
        const contain = keywords.find(keyword => text.includes(keyword));
        if (!contain) return null;
        const reasonText = contain.length > 8 ? contain.slice(0, 6) + '…' : contain;
        const reason = i18n.textContentReason.replace('{1}', () => reasonText);
        return { result: rule.feedAction, reason };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.comment.rerun(); });
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
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.comment.filter(function regexCommentFilter(/** @type {Element} */comment) {
        const text = commentParser.text(comment);
        const regexen = rule.ref.items.getConfigCompiled();
        const matchReg = regexen.find(regex => regex.test(text));
        if (!matchReg) return null;
        return { result: rule.feedAction };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.comment.rerun(); });
    }
  }

  rule.groups({
    baseClass: RegexCommentRule,
    tab: 'comment',
    key: 'regex',
    version: 1,
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
    constructor(item) {
      super(item);
    }
    init() {
      const rule = this;
      observer.comment.filter(function commentFilterFeedFilter(/** @type {Element} */feed) {
        const users = new Set(commentParser.user.name(feed));
        const accounts = rule.ref.items.getConfig();
        const contain = accounts.find(account => users.has(account));
        if (!contain) return null;
        return { result: rule.feedAction };
      }, { priority: this.priority });
      this.ref.items.addConfigListener(() => { observer.comment.rerun(); });
    }
  }

  rule.groups({
    baseClass: CommentUserFeedRule,
    tab: 'comment',
    key: 'name',
    type: 'usernames',
    version: 1,
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
    template: () => i18n.moreCommercialGroupTitle,
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
        const username = init.page.$CONFIG.nick;
        if (author === username) return 'shomme';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

  i18n.commentFaceCount = {
    cn: '隐藏表情|数量超过{{count}}个的评论',
    tw: '隱藏表情|數量超過{{count}}個的評論',
    en: 'Hide comments | with more than {{count}} face',
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
    en: 'Hide comments | with more than {{count}} kinds of face',
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
          .replace(/回[复復覆]|Reply|[:/\s：]/ig, ''); // 空格、“回复”和冒号不算内容
        if (!texts) return 'hide';
        return null;
      });
      this.addConfigListener(() => { observer.comment.rerun(); });
    },
  });

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

  clean.CleanRule = function (id, template, version, action, details) {
    clean[lastCleanGroup][id] = rule.Rule(Object.assign({
      id: 'clean_' + lastCleanGroup + '_' + id,
      template,
      parent: clean[lastCleanGroup][lastCleanGroup],
      version,
    }, typeof action === 'string' ? {
      acss: action,
    } : typeof action === 'function' ? {
      ainit: action,
    } : typeof action === 'object' ? action : {}, details));
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
    cleanIconsBigFun: { cn: '铁粉', tw: '鐵粉', en: '铁粉 (big funs?)' },
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

  const showIcons = classNames => ({
    afterRender: container => {
      const label = container.querySelector('label');
      classNames.forEach(className => {
        const container = document.createElement('span');
        container.innerHTML = '<i class="W_icon" style="display:inline-block!important"></i>';
        const i = container.querySelector('i');
        if (typeof className === 'string') {
          i.classList.add(className);
        } else if (Array.isArray(className)) {
          i.className = className.join(' ');
        }
        label.appendChild(container);
      });
      return container;
    },
  });

  clean.CleanGroup('icons', () => i18n.cleanIconsGroupTitle);
  clean.CleanRule('level', () => i18n.cleanIconsLevel, 1, '.icon_bed[node-type="level"], .W_level_ico, .W_icon_level { display: none !important; }');
  clean.CleanRule('member', () => i18n.cleanIconsMember, 1, '[class*="icon_member"], [class*="ico_member"], [class*="ico_vip"], [class*="icon_vip"] { display: none !important; }', showIcons(['icon_member1']));
  clean.CleanRule('approve', () => i18n.cleanIconsApprove, 1, '.approve, .icon_approve, .icon_pf_approve, .icon_approve_gold, .icon_pf_approve_gold { display: none !important; }', showIcons(['icon_approve', 'icon_approve_gold']));
  clean.CleanRule('approve_co', () => i18n.cleanIconsApproveCo, 1, '.approve_co, .icon_approve_co, .icon_pf_approve_co, [class^="W_icon_co"], [class^=".icon_approve_co_"], [class^=".icon_pf_approve_co_"] { display: none !important; }', showIcons(['icon_approve_co']));
  clean.CleanRule('approve_dead', () => i18n.cleanIconsApproveDead, 1, '.icon_approve_dead, .icon_pf_approve_dead { display: none !important; }', showIcons(['icon_approve_dead']));
  clean.CleanRule('bigfun', () => i18n.cleanIconsBigFun, 26, '.W_icon_bf { display: none !important; }', showIcons([['W_icon_bf', 'icon_bigfans']]));
  clean.CleanRule('club', () => i18n.cleanIconsClub, 1, '.ico_club, .icon_pf_club, .icon_club { display: none !important; }', showIcons(['icon_club']));
  clean.CleanRule('v_girl', () => i18n.cleanIconsVGirl, 1, '.ico_vlady, .icon_pf_vlady, .icon_vlady { display: none !important; }', showIcons(['icon_vlady']));
  clean.CleanRule('supervisor', () => i18n.cleanIconsSupervisor, 1, '.icon_supervisor { display: none !important; }', showIcons(['icon_supervisor']));
  clean.CleanRule('taobao', () => i18n.cleanIconsTaobao, 1, '.ico_taobao, .icon_tmall, .icon_taobao, .icon_tmall { display: none !important; }', showIcons(['icon_taobao', 'icon_tmall']));
  clean.CleanRule('cheng', () => i18n.cleanIconsCheng, 1, '.icon_cheng { display: none !important; }', showIcons(['icon_cheng']));
  clean.CleanRule('gongyi', () => i18n.cleanIconsGongyi, 1, '.ico_gongyi, .ico_gongyi1, .ico_gongyi2, .ico_gongyi3, .ico_gongyi4, .ico_gongyi5, .icon_gongyi, .icon_gongyi2, .icon_gongyi3, .icon_gongyi4, .icon_gongyi5 { display: none !important; }', showIcons(['icon_gongyi']));
  clean.CleanRule('zongyika', () => i18n.cleanIconsZongyika, 1, '.zongyika2014, .icon_zongyika2014 { display: none !important; }', showIcons(['icon_zongyika2014']));
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
  }, showIcons(['icon_yy_ssp1', 'icon_yy_gqt', 'icon_yy_lol']));

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
    cleanFollowWhisper: { cn: '悄悄关注', tw: '悄悄關注', en: 'Secret Following' },
    cleanFollowVideo: { cn: '视频弹层', hk: '視頻彈層', tw: '影片快顯層', en: 'Video pop-up layer' },
    cleanFollowRecommend: { cn: '关注推荐', tw: '關注推薦', en: 'Follow Recommend' },
  });

  clean.CleanGroup('follow', () => i18n.cleanFollowGroupTitle);
  clean.CleanRule('single', () => i18n.cleanFollowSingle, 1, '[id^="Pl_Official_WeiboDetail__"] [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('at_me', () => i18n.cleanFollowAtMe, 1, '#v6_pl_content_atmeweibo [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('discover', () => i18n.cleanFollowDiscover, 1, '#plc_discover [node-type*="feed_recommend_follow"] { display: none !important; }');
  clean.CleanRule('whisper', () => i18n.cleanFollowWhisper, 1, '#v6_pl_content_homefeed [node-type*="feed_recommend_follow"] { display: none !important; }');
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
  const observer = yawf.observer;

  const clean = yawf.rules.clean;

  const i18n = util.i18n;

  Object.assign(i18n, {
    cleanNavGroupTitle: { cn: '隐藏模块 - 导航栏', tw: '隱藏模組 - 導覽列', en: 'Hide Modules - Navigation Bar' },
    cleanNavLogoImg: { cn: '节日徽标', tw: '節日徽標', en: 'Holiday logo' },
    cleanNavMain: { cn: '首页', tw: '首頁', en: 'Home' },
    cleanNavTV: { cn: '视频', en: '视频 (Video)' },
    cleanNavHot: { cn: '发现', en: 'Discover' },
    cleanNavGame: { cn: '游戏', tw: '遊戲', en: 'Game' },
    cleanNavHotSearch: { cn: '大家正在搜', tw: '大家正在熱搜', en: 'Hot search' },
    cleanNavNoticeNew: { cn: '新消息计数', tw: '新消息計數', en: 'Count for new notice' },
    cleanNavNew: { cn: '提示红点', tw: '提示紅點', en: 'Red dot tips' },
  });

  clean.CleanGroup('nav', () => i18n.cleanNavGroupTitle);
  clean.CleanRule('logo_img', () => i18n.cleanNavLogoImg, 1, {
    ainit: function () {
      observer.dom.add(function replaceLogo() {
        const box = document.querySelector('.WB_global_nav .gn_logo .box');
        if (!box) { setTimeout(replaceLogo, 100); return; }
        const img = box.getElementsByTagName('img')[0];
        if (!img) return;
        const logo = document.createElement('span');
        logo.classList.add('logo');
        img.replaceWith(logo);
      });
    },
    acss: '.WB_global_nav .gn_logo .box img { display: none !important; }',
  });
  clean.CleanRule('main', () => i18n.cleanNavMain, 1, '.gn_nav_list>li:nth-child(1) { display: none !important; }');
  clean.CleanRule('tv', () => i18n.cleanNavTV, 1, '.gn_nav_list>li:nth-child(2) { display: none !important; }');
  clean.CleanRule('hot', () => i18n.cleanNavHot, 1, '.gn_nav_list>li:nth-child(3) { display: none !important; }');
  clean.CleanRule('game', () => i18n.cleanNavGame, 1, '.gn_nav_list>li:nth-child(4) { display: none !important; }');
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
          if (!script || (script.tagName || '').toLowerCase() !== 'script') return;
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
  clean.CleanRule('notice_new', () => i18n.cleanNavNoticeNew, 1, '.WB_global_nav .gn_set_list .W_new_count { display: none !important; }');
  clean.CleanRule('new', () => i18n.cleanNavNew, 1, '.WB_global_nav .W_new { display: none !important; }');

}());
//#endregion
//#region @require yaofang://content/rule/clean/left.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const observer = yawf.observer;
  const init = yawf.init;

  const i18n = util.i18n;
  const css = util.css;
  const priority = util.priority;

  const clean = yawf.rules.clean;

  Object.assign(i18n, {
    cleanLeftGroupTitle: { cn: '隐藏模块 - 左栏', tw: '隱藏模組 - 左欄', en: 'Hide modules - Left Column' },
    cleanLeftHome: { cn: '首页', tw: '首頁', en: 'Home' },
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

  const leftHide = (function () {
    const ids = [];
    // 移除一个左栏链接或相关元素
    const removeNode = function removeNode(node) {
      const container = node.parentNode;
      let prev, next;
      const removeBlank = function (node) {
        if (node && node.nodeType === Node.TEXT_NODE && node.data.match(/^\s*$/)) {
          return container.removeChild(node);
        }
        if (node && node.nodeType === Node.COMMENT_NODE) {
          return container.removeChild(node);
        }
        return null;
      };
      const removeBlankSibling = function (node) {
        while (removeBlank(node.previousSibling));
        while (removeBlank(node.nextSibling));
      };
      removeBlankSibling(node);
      prev = node.previousSibling; next = node.nextSibling;
      // 如果前后都是分割线（连续的分割线）那么应当删掉一个（删掉前面一个）
      // 如果分割线在开头或末尾，那么应该删掉分割线
      // 如果前后都没有东西，那么应该连同容器一起删除
      while ((!prev || prev.matches('.lev_line')) &&
        (!next || next.matches('.lev_line'))) {
        let line = null;
        if (prev && prev.matches('.lev_line')) line = prev;
        if (next && next.matches('.lev_line')) line = next;
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
    const listener = function leftNavRemove() {
      const levs = Array.from(document.querySelectorAll('#v6_pl_leftnav_group .lev[yawf-id]:not([yawf-checked-lev])'));
      levs.forEach(function (lev) {
        const id = lev.getAttribute('yawf-id');
        if (ids.includes(id)) removeNode(lev);
        else lev.setAttribute('yawf-checked-lev', '');
      });
    };
    css.append('#v6_pl_leftnav_group .lev:not([yawf-checked-lev]) { visibility: hidden; }');
    init.onLoad(function () {
      observer.dom.add(listener);
      listener();
    }, { priority: priority.LAST });
    return function (id) {
      return () => { ids.push('leftnav_' + id); };
    };
  }());

  clean.CleanGroup('left', () => i18n.cleanLeftGroupTitle);
  clean.CleanRule('level', () => i18n.cleanIconsLevel, 1, '.icon_bed[node-type="level"], .W_level_ico, .W_icon_level { display: none !important; }');
  clean.CleanRule('home', () => i18n.cleanLeftHome, 1, leftHide('home'));
  clean.CleanRule('fav', () => i18n.cleanLeftFav, 1, leftHide('fav'));
  clean.CleanRule('like', () => i18n.cleanLeftLike, 1, leftHide('like'));
  clean.CleanRule('hot', () => i18n.cleanLeftHot, 1, leftHide('hot'));
  clean.CleanRule('tv', () => i18n.cleanLeftTV, 1, leftHide('tv'));
  clean.CleanRule('new_feed', () => i18n.cleanLeftNewFeed, 21, leftHide('new'));
  clean.CleanRule('friends', () => i18n.cleanLeftFriends, 1, leftHide('friends'));
  clean.CleanRule('group_to_me', () => i18n.cleanLeftGroupToMe, 1, leftHide('groupsfeed'));
  clean.CleanRule('special', () => i18n.cleanLeftSpecial, 1, leftHide('special'));
  clean.CleanRule('whisper', () => i18n.cleanLeftWhisper, 1, leftHide('whisper'));
  clean.CleanRule('v_plus', () => i18n.cleanLeftVPlus, 1, leftHide('vplus'));
  clean.CleanRule('new', () => i18n.cleanLeftNew, 1, '.WB_left_nav .lev .W_new, .yawf-WB_left_nav .lev .W_new { display: none !important; }');
  clean.CleanRule('news', () => i18n.cleanLeftNews, 1, '.WB_left_nav .level_1_Box .W_new_count, .yawf-WB_left_nav .level_1_Box .W_new_count { display: none !important; }');
  clean.CleanRule('count', () => i18n.cleanLeftCount, 1, '.WB_left_nav .pl_leftnav_group .W_new_count, .WB_left_nav .lev .W_new_count, .yawf-WB_left_nav .pl_leftnav_group .W_new_count, .yawf-WB_left_nav .lev .W_new_count { display: none !important; }');

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
    cleanRightHotTopic: { cn: '热门话题', tw: '熱門話題', en: 'Hot Topic' },
    cleanRightInterest: { cn: '可能感兴趣的人', tw: '可能感興趣的人', en: 'You may know' },
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
  clean.CleanRule('info', () => i18n.cleanRightInfo, 1, '#v6_pl_rightmod_myinfo { display: none !important; }');
  clean.CleanRule('ranks', () => i18n.cleanRightRanks, 1, '#v6_pl_rightmod_rank, [yawf-id="rightmod_taobao_movie"], [yawf-id="rightmod_recom_movie"] { display: none !important; }');
  clean.CleanRule('hot_topic', () => i18n.cleanRightHotTopic, 1, '[yawf-id="rightmod_zt_hottopic"] { display: none !important; }');
  clean.CleanRule('interest', () => i18n.cleanRightInterest, 1, '[yawf-id="rightmod_recom_interest"] { display: none !important; }');
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
  ].join(','), {
    '[change-data*="key=hottopic_r2"]': 'rightmod_zt_hottopic',
    '[change-data*="key=interest_r2"]': 'rightmod_recom_interest',
    'h4.obj_name a[href*="movie.weibo.com"]': 'rightmod_recom_movie',
    'h4.obj_name a[href*="taobao.com"][href*="dianying"]': 'rightmod_taobao_movie',
    'h2.main_title a[href*="book.weibo.com/top"]': 'v6_pl_rightmod_rank_book',
    'h4.obj_name a[href*="pop.weibo.com"]': 'v6_pl_rightmod_rank_pop',
    'div.obj_name a[href*="100808faecebff8a54b97a91699c654e5f4cda"]': 'v6_pl_rightmod_rank_hong',
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
    cleanFeedRecommend: { cn: '精彩微博推荐', tw: '精彩微博推薦', en: 'Feed you may interested in' },
    cleanFeedOuterTip: { cn: '消息流提示横幅 {{i}}', tw: '消息流提示橫幅 {{i}}', en: 'Tips for feed {{i}}' },
    cleanFeedOuterTipDetail: {
      cn: '消息流内部的提示横幅，如“ 系统提示：根据你的屏蔽设置，系统已过滤掉部分微博。”等内容。',
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
    cleanFeedFavorite: { cn: '收藏', tw: '收藏', en: 'Favorite' },
    cleanFeedPromoteOther: { cn: '帮上头条', tw: '帮上头条', en: '帮上头条' },
    cleanFeedReport: { cn: '举报', hk: '舉報', tw: '舉報/檢舉', en: 'Report' },
    cleanFeedUseCardBackground: { cn: '使用此卡片背景', tw: '使用此卡片背景', en: '使用此卡片背景' },
  });

  clean.CleanGroup('feed', () => i18n.cleanFeedGroupTitle);
  clean.CleanRule('recommend', () => i18n.cleanFeedRecommend, 1, '[node-type="recommfeed"] { display: none !important; }');
  clean.CleanRule('feed_outer_tip', () => i18n.cleanFeedOuterTip, 1, {
    acss: '.WB_feed > .W_tips { display: none !important; }',
    ref: { i: { type: 'bubble', icon: 'ask', template: () => i18n.cleanFeedOuterTip } },
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
.WB_feed_detail .WB_from { height: 26px; overflow: hidden; }
.WB_feed_detail .WB_feed_expand .WB_from { height: 16px; }
.WB_feed_detail .WB_from::before { content: " "; display: block; float: left; width: 100%; height: 30px; }
.WB_feed_detail .WB_from a[date],
.WB_feed_detail .WB_from a[yawf-date],
.WB_feed_detail .WB_from span[title],
.WB_feed_detail .WB_from .yawf-edited { float: left; position: relative; top: -30px; }
.WB_feed_detail .WB_from a[date]::after,
.WB_feed_detail .WB_from a[yawf-date]::after { content: " "; }
`,
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanFeedSourceDetail } },
  });
  clean.CleanRule('pop', () => i18n.cleanFeedPop, 1, `
.WB_feed_datail a[action-type="fl_pop"], .WB_feed_datail a[action-type="fl_pop"]+.S_txt3, 
.WB_handle li[yawf-handle-type="fl_pop"] { display: none !important; }`);
  clean.CleanRule('like', () => i18n.cleanFeedLike, 1, `
a[action-type="feed_list_like"],
a[action-type="feed_list_like"]+.S_txt3, 
[node-type="multi_image_like"],
[action-type="feed_list_image_like"], 
[action-type="object_like"], [action-type="like_object"], 
.WB_feed_datail a[action-type="fl_like"],
.WB_feed_datail a[action-type="fl_like"]+.S_txt3, 
.WB_expand .WB_handle.W_fr li:nth-child(3), 
.WB_handle li[yawf-handle-type="fl_like"],
.WB_handle li[yawf-handle-type="like"] .layer_multipic_preview .pos_icon { display: none !important; }`);
  clean.CleanRule('like_comment', () => i18n.cleanFeedLikeComment, 1, '.WB_handle li[yawf-comment-handle-type="like"] { display: none !important; }');
  clean.CleanRule('like_attitude', () => i18n.cleanFeedLikeAttitude, 1, '.W_layer_attitude { display: none !important; }');
  clean.CleanRule('forward', () => i18n.cleanFeedForward, 1, `
a[action-type="feed_list_forward"], a[action-type="feed_list_forward"]+.S_txt3,
.WB_media_expand .WB_handle a.S_func4[href$="?type=repost"], .WB_media_expand .WB_handle a.S_func4[href$="?type=repost"]+.S_txt3, 
.WB_feed_datail a[action-type="fl_forward"], .WB_feed_datail a[action-type="fl_forward"]+.S_txt3, 
.WB_expand .WB_handle.W_fr li:nth-child(1), 
.WB_handle li[yawf-handle-type="fl_forward"], .WB_handle li[yawf-handle-type="tab"]:nth-child(2) 
{ display: none !important; }`);
  clean.CleanRule('favorite', () => i18n.cleanFeedFavorite, 1, `
a[action-type="feed_list_favorite"], a[action-type="feed_list_favorite"]+.S_txt3,
.WB_feed_datail a[action-type="fl_favorite"], .WB_feed_datail a[action-type="fl_favorite"]+.S_txt3, 
.WB_handle .WB_row_line li[yawf-handle-type="fl_favorite"] { display: none !important; }`);
  clean.CleanRule('promote_other', () => i18n.cleanFeedPromoteOther, 1, '.screen_box .layer_menu_list a[action-data*="promote.vip.weibo.com"] { display: none !important; }');
  clean.CleanRule('report', () => i18n.cleanFeedReport, 1, '.screen_box .layer_menu_list a[onclick*="service.account.weibo.com/reportspam"], .WB_handle ul li[yawf-comment-handle-type="report"] { display: none !important; }');
  clean.CleanRule('use_card_background', () => i18n.cleanFeedUseCardBackground, 1, '.screen_box .layer_menu_list a[action-type="fl_cardCover"] { display: none !important; }');

  observer.feed.onBefore(function (feed) {
    const lis = Array.from(feed.querySelectorAll('.WB_feed_type .WB_handle .WB_row_line li, .WB_feed_together .WB_func .WB_handle li'));
    lis.forEach(li => {
      let type = li.querySelector('a').getAttribute('action-type');
      if (!type && li.querySelector('a[suda-uatrack="key=profile_feed&value=popularize_host"]')) type = 'fl_pop';
      if (!type && li.querySelector('span[title*="评论"], span[title*="評論"], span[title*="comment"]')) type = 'fl_comment'; // 由于用户设置，无法进行评论
      li.setAttribute('yawf-handle-type', type);
    });
    const fwli = Array.from(feed.querySelectorAll('.WB_feed_expand .WB_func .WB_handle li'));
    if (fwli.length === 3) fwli.forEach(function (li, index) {
      li.setAttribute('yawf-handle-type', ['fl_forward', 'fl_comment', 'fl_like'][index]);
    }); else if (fwli.length === 4) fwli.forEach(function (li, index) {
      li.setAttribute('yawf-handle-type', ['fl_read', 'fl_forward', 'fl_comment', 'fl_like'][index]);
    });
  });

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
      li.setAttribute('yawf-comment-handle-type', type || '');
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
      const name = title && title.textContent.trim() || '';
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
  const observer = yawf.observer;
  const init = yawf.init;

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
    init: function () {
      if (env.config.requestBlockingSupported) {
        backend.onRequest('ads', details => {
          if (this.isEnabled()) return { cancel: true };
          return {};
        });
      }
    },
    ainit: function () {
      util.css.append([
        '[ad-data]', '[feedtype="ad"]',
        '[id^="ads_"]', '[id^="ad_"]',
        '[id*="pl_rightmod_ads"]', '[id*="pl_content_biz"]', '[id*="pl_ad_"]', '[id^="sinaadToolkitBox"]',
        '[class*="WB_ad_"]',
        '#topicAD', '#topicADButtom', '.WB_feed .popular_buss', '.feed_app_ads', '.W_bigDay',
        '.WB_feed_yy2016_up_but', '.WB_feed_yy2016_down_but', '#pl_common_ali',
        '.W_skin_banner',
        '[node-type="imgBtn"][action-data="canUploadImage=0"]',
      ].join(',') + ' { display: none !important; } ' +
        '#wrapAD, .news_logo { visibility: hidden !important; }');

      let version = '';
      // 检查应当替换为哪种皮肤
      // 网页中 $CONFIG.skin 给出了用户选择的皮肤
      const defaultSkin = 'skin058';
      let targetSkin = defaultSkin;
      try { targetSkin = init.page.$CONFIG.skin || defaultSkin; } catch (e) { targetSkin = defaultSkin; }
      if (/skin3[56]\d/.test(targetSkin)) targetSkin = defaultSkin;
      // 检查网页中是否被插入了广告皮肤，如果有则换成用户选择的（或默认的）皮肤
      const updateSkin = function updateSkin() {
        const adskin = document.querySelector('link[href*="/skin35"], link[href*="/skin36"]');
        if (adskin) {
          version = new URL(adskin.href).searchParams.get('version');
          util.debug('ad skin %o(version %o) has been replaced', adskin.href, version);
          adskin.setAttribute('href', `//img.t.sinajs.cn/t6/skin/${targetSkin}/skin.css?version=${encodeURIComponent(version)}`);
        }
        const adskincover = document.querySelector('#skin_cover_s[style*="/skin35"], #skin_cover_s[style*="/skin36"]');
        if (adskincover) adskincover.style.backgroundImage = `url("//img.t.sinajs.cn/t6/skin/${targetSkin}/images/profile_cover_s.jpg?version=${encodeURIComponent(version)}")`;
      };
      observer.dom.add(updateSkin);

      // 一些广告内容的 iframe，如果这些东西只是隐藏没有被摘掉的话，里面的 JavaScript 会不停的报错，直到把你的控制台弄崩
      const removeAdIframes = function removeAdIframes() {
        const iframes = Array.from(document.querySelectorAll('iframe[src*="s.alitui.weibo.com"]'));
        iframes.forEach(function (iframe) {
          iframe.parentNode.removeChild(iframe);
        });
      };
      observer.dom.add(removeAdIframes);

      // 视频播放完毕之后会自动推荐下一个视频，之前很多是相关推荐，但现在也有不少是广告，所以不单独做一个选项，直接放在这里了
      observer.dom.add(function videoNoAutoNext() {
        const close = document.querySelector('.video_box_next [action-type="next_close"]:not([yawf-no-auto-next])');
        if (!close) return;
        close.setAttribute('yawf-no-auto-next', '');
        close.click();
      });

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
    // 直接 display: none 的话，发现页面的左边栏会飘走
    acss: '.global_footer, .WB_footer { height: 0; overflow: hidden; }',
    ref: { i: { type: 'bubble', icon: 'warn', template: () => i18n.cleanOtherFooterDetail } },
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
    navHideName: { cn: '导航栏上的用户名|{{act}}{{i}}', tw: '導覽列上的用戶名|{{act}}{{i}}', en: 'Username on nav bar would be | {{act}}{{i}}' },
    navHideNameReplace: { cn: '替换为“个人主页”', tw: '替換為「個人主頁」', en: 'replaced by text "My Profile"' },
    navHideNameHidden: { cn: '隐藏', tw: '隱藏', en: 'hidden' },
    navHideNameDetail: {
      cn: '此外您还可以隐藏隐藏右栏的 [[clean_right_info]] 模块。以及打开 [[layout_nav_auto_hide]] 。',
    },
    navHideNameReplaceText: { cn: '个人主页', tw: '個人主頁', en: 'My Profile' },
  });

  const hideNavName = css.add('.WB_global_nav .gn_nav_list li.gn_name.S_txt1 { display: none; }');
  navbar.navHideName = rule.Rule({
    id: 'layout_nav_hide_name',
    version: 1,
    parent: navbar.navbar,
    template: () => i18n.navHideName,
    ref: {
      act: {
        type: 'select',
        select: [
          { value: 'hidden', text: () => i18n.navHideNameHidden },
          { value: 'replace', text: () => i18n.navHideNameReplace },
        ],
      },
      i: { type: 'bubble', icon: 'ask', template: () => i18n.navHideNameDetail },
    },
    init() {
      if (this.getConfig()) {
        if (this.ref.act.getConfig() === 'replace') {
          css.append(`
.WB_global_nav .gn_nav_list li .gn_name .S_txt1::before { content: "${i18n.navHideNameReplaceText}"; display: block; }
.WB_global_nav .gn_nav_list li .gn_name .S_txt1 { height: 26px; display: inline-block; width: 4em; }
`);
        } else {
          css.append('.WB_global_nav .gn_nav_list li a.gn_name .S_txt1 { display: none; }');
        }
      }
      hideNavName.remove();
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
[yawf-merge-left="left"] .WB_frame .WB_main_r { float: left; }
[yawf-merge-left="left"] .WB_frame .WB_main_c { float: right; }

@media screen and (max-width: 1006px) {
  body[yawf-merge-left] a.W_gotop { margin-left: calc(calc(var(--yawf-feed-width) + 20px) / 2); }
  body[yawf-merge-left="left"] .WB_main .WB_main_c { float: none; }
  body[yawf-merge-left="left"] .W_fold { right: auto; left: 0; -webkit-transform: scaleX(-1); transform: scaleX(-1); }
  body[yawf-merge-left="left"] .W_fold.W_fold_out { left: 269px; }
  body[yawf-merge-left="left"] .WB_main_r { right: auto; left: 0px; -webkit-transform: translateX(-100%) translateZ(0px); transform: translateX(-100%) translateZ(0px); }
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
    id: 'layout_side_show_all_groups',
    version: 1,
    parent: sidebar.sidebar,
    template: () => i18n.showAllGroups,
    acss: `
.lev_Box .levmore { display: none !important; }
.lev_Box [node-type="moreList"] { display: block !important; height: auto !important; }
`,
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
        if (!refc || !refc[0]) return;
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
//#region @require yaofang://content/rule/layout/other.js
; (function () {

  const yawf = window.yawf;
  const env = yawf.env;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const init = yawf.init;
  const fontList = yawf.fontList;
  const chatframe = yawf.chatframe;
  const backend = yawf.backend;

  const layout = yawf.rules.layout;

  const i18n = util.i18n;
  const css = util.css;
  const time = util.time;

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
      cn: '统一头像形状为|{{shape}}',
      hk: '統一頭像形狀為|{{shape}}',
      en: 'Show all avatars as | {{shape}}',
    },
    avatarShapeCircle: {
      cn: '圆形',
      hk: '圓形',
      en: 'Circle',
    },
    avatarShapeSquare: {
      cn: '方形',
      en: 'Square',
    },
  });

  details.avatarShape = rule.Rule({
    id: 'layout_avatar_shape',
    version: 1,
    parent: details.details,
    template: () => i18n.avatarShape,
    ref: {
      shape: {
        type: 'select',
        initial: 'square',
        select: [
          { value: 'circle', text: () => i18n.avatarShapeCircle },
          { value: 'square', text: () => i18n.avatarShapeSquare },
        ],
      },
    },
    ainit() {
      const shape = this.ref.shape.getConfig();
      if (shape === 'square') {
        css.append(`.W_face_radius, .W_person_info .cover .headpic, .PCD_header .pf_photo, .PCD_header .photo_wrap, .PCD_header .pf_photo .photo, .PCD_user_a .picitems .pic_box, .PCD_connectlist .follow_box .mod_pic img, .PCD_ut_a .pic_box, .PCD_counter_b .pic_box, .WB_feed_v3 .WB_sonFeed .WB_face, .WB_feed_v3 .WB_sonFeed .WB_face .face img { border-radius: 0 !important; }`);
      } else {
        css.append(`img[usercard], .WB_face img { border-radius: 50% !important; }`);
      }
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
            if (item && item.title && item.img && item.text) return true;
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
        const newFaceTitles = new Set(faceList.map(e => e && e.title).filter(t => t));
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
          if (listItem.title === (face && face.title || '')) return;
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
        const tab = document.querySelector('.layer_faces .WB_minitab:first-child');
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
.yawf-face-drop-area { background: rgba(255, 255, 127, 0.5); clear: both; float: right; font-weight: bold; height: 32px; line-height: 32px; margin: -32px 8px 0; opacity: 1; padding: 0; width: 306px; text-align: center; }
.layer_faces .faces_list { -webkit-user-select: none; -moz-user-select: none; user-select: none; }
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

  if (!(function isCst() {
    // 如果用户使用的是已经是和东八区一致的时区，那么我们就不提供这个功能了
    const year = new Date().getFullYear();
    return [...Array(366)].every((_, i) => new Date(year, 0, i).getTimezoneOffset() === -480);
  }())) {

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
      ainit() {

        const updateDate = function (element) {
          const date = parseInt(element.getAttribute('yawf-date'), 10);
          const formatTimeResult = util.time.format(date);
          if (element.textContent !== formatTimeResult) {
            element.textContent = formatTimeResult;
          }
          const formatTimeDetailResult = util.time.format(date, 'full');
          if (element.title !== formatTimeDetailResult) {
            element.title = formatTimeDetailResult;
          }
        };

        const updateAllDate = function () {
          const dates = document.querySelectorAll('[yawf-date]');
          Array.from(dates).forEach(element => {
            updateDate(element);
          });
        };

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
        setInterval(updateAllDate, 1e3);


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
            const [_full, match, tail] = text.match(/^(.*?)\s*(来自|來自|come from|)$/);
            const time = util.time.parse(match);
            if (!time) return;
            util.debug('parse time %o(%s) to %o(%s)', textNode, text, time, time);
            textNode.textContent = tail ? ` ${tail} ` : '';
            const timeElement = document.createElement('span');
            timeElement.setAttribute('yawf-date', +time);
            updateDate(timeElement);
            textNode.replaceWith(timeElement);
          });
        };
        observer.dom.add(handleTextDateElements);
        css.append(`
.WB_feed_v3 .WB_from span[yawf-date] { margin-left: 0; }
[yawf-date]::after { content: " "; }
`);
      },
    });
  }

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

}());
//#endregion
//#region @require yaofang://content/rule/layout/theme.js
; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;

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
        if (!skinStyle) {
          const skinCss = document.querySelector('link[href*="//img.t.sinajs.cn/t6/skin/"][href*="/skin.css?"]');
          if (!skinCss) return;
          version = ((skinCss.href.match(/version=([a-fA-F0-9]*)/) || [])[1]) || '';
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
.gn_logo .logo:empty::after { filter: url("data:image/svg+xml,%3Csvg%20viewBox=%220%200%20183%20276%22%20id=%22img3%22%20xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter%20id=%22invert%22%3E%3CfeComponentTransfer%3E%3CfeFuncR%20tableValues=%221%200%22%20type=%22table%22/%3E%3CfeFuncG%20tableValues=%221%200%22%20type=%22table%22/%3E%3CfeFuncB%20tableValues=%221%200%22%20type=%22table%22/%3E%3C/feComponentTransfer%3E%3C/filter%3E%3C/svg%3E#invert"); -webkit-filter: invert(100%); filter: invert(100%); }
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
  const css = util.css;
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
          if (!document.body) setTimeout(addStyle, 0);
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
//#region @require yaofang://content/rule/feeds/layout.js
; (function () {

  const yawf = window.yawf;
  const init = yawf.init;
  const util = yawf.util;
  const rule = yawf.rule;
  const observer = yawf.observer;
  const request = yawf.request;
  const feedParser = yawf.feed;

  const feeds = yawf.rules.feeds;

  const i18n = util.i18n;
  const css = util.css;
  const strings = util.strings;
  const dialog = util.dialog;

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
.WB_feed_comment .WB_feed_detail { position: relative; padding-bottom: 4px; }
.WB_feed_comment .WB_feed_detail::after { display: none; }
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
`);
    },
  });

  i18n.smallImage = {
    cn: '缩小缩略图尺寸 {{i}}||{{repost}}缩小转发原文宽度',
    tw: '縮小縮略圖尺寸 {{i}}||{{repost}}縮小轉發原文寬度',
    en: 'Decrease the size of image {{i}}||{{repost}} Decrease the width of original feeds',
  };
  i18n.smallImageDetail = {
    cn: '缩小图片尺寸仅影响图片在您的网页上的显示效果，不能降低网络数据流量用量。',
  };

  layout.smallImage = rule.Rule({
    id: 'feed_small_image',
    version: 1,
    parent: layout.layout,
    template: () => i18n.smallImage,
    ref: {
      repost: { type: 'boolean' },
      i: { type: 'bubble', icon: 'warn', template: () => i18n.smallImageDetail },
    },
    ainit() {
      css.append(`
.WB_feed.WB_feed_v3 .WB_media_a { margin: -2px 0 0 6px; width: 258px; }
.WB_feed.WB_feed_v3 .WB_media_a_mn .WB_pic { width: 80px; height: 80px; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic { width: 80px !important; height: 80px !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img { top: 40px !important; left: 40px !important; transform: translate(-50%, -50%); position: relative !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img[style*="left:0"][style*="width:110px"] { width: 100% !important; height: auto !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img[style*="top:0"][style*="height:110px"] { height: 100% !important; width: auto !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img[style*="top:0"] { top: 0 !important; transform: translateX(-50%) !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img[style*="left:0"] { left: 0 !important; transform: translateY(-50%) !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img[style*="top:0"][style*="left:0"] { left: 0 !important; top: 0 !important; transform: none !important; }
.WB_feed.WB_feed_v4 .WB_media_a_mn .WB_pic img:not([style*="top"]) { max-width; 100%; max-height: 100%; }
.WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic { max-width: 120px; max-height: 120px; min-width: 36px; height: auto !important; width: auto !important; }
.WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic img { max-height: 120px; max-width: 120px; width: auto !important; height: auto !important; position: static; -webkit-transform: none; transform: none; }
.WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_video:not(.yawf-WB_video):not(.WB_video_h5_v2) { width: 120px; height: 80px; min-width: 36px; }
.WB_feed.WB_feed_v3 .WB_media_a_m4 { width: 172px; }
.WB_feed.WB_feed_v3 .WB_feed_repeat .WB_media_a_m1 .WB_pic::before { display: none; }
.WB_feed.WB_feed_v3 .WB_feed_repeat .WB_media_a_m1 .WB_pic img { max-width: 120px; max-height: 120px; }
.WB_feed.WB_feed_v3 .WB_feed_spec { height: 100px; width: 316px; border: 1px solid rgba(127,127,127,0.3); box-shadow: 0 0 2px rgba(0,0,0,0.15); border-radius: 2px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_pic { height: 100px; width: 100px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_info { height: 88px; width: 202px; padding: 7px 4px 5px 10px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_a .WB_feed_spec_pic { width: 100px; height: 100px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_a .WB_feed_spec_info { width: 200px; height: 88px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_b2 .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec_b2 .WB_feed_spec_pic img, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_pic img { height: auto; min-height: 100px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_b .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_pic, .WB_feed.WB_feed_v3 .WB_feed_spec2 .WB_feed_spec_pic { height: 100px; width: 250px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_b, .WB_feed.WB_feed_v3 .WB_feed_spec_c, .WB_feed.WB_feed_v3 .WB_feed_spec2 { width: 250px; height: auto; }
.WB_feed.WB_feed_v3 .WB_feed_spec_info { float: right; height: 88px; padding: 7px 4px 5px 10px; width: 202px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_b .WB_feed_spec_info, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_info, .WB_feed.WB_feed_v3 .WB_feed_spec2 .WB_feed_spec_info { float: none; height: auto; width: auto; padding: 10px 5px 0; }
.WB_feed.WB_feed_v3 .WB_feed_spec_b .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_tit, .WB_feed.WB_feed_v3 .WB_feed_spec_c .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_tit, .WB_feed.WB_feed_v3 .WB_feed_spec2 .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_tit { font-size: inherit; font-weight: 700; margin: 0 0 6px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_info .WB_feed_spec_cont .WB_feed_spec_brieftxt { line-height: 15px; height: 30px; }
.WB_feed.WB_feed_v3 .WB_feed_spec_user .W_fl { width: 240px; }

.WB_feed .yawf-WB_pic_more { line-height: 80px; }

.layer_feedimgshow .WB_feed.WB_feed_v3 .WB_media_a { margin: 0; width: auto; }
.layer_feedimgshow .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic { max-width: none; max-height: none; min-width: auto; }
.layer_feedimgshow .WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_pic img { max-width: 260px; max-width: 40vw; max-height: 260px; max-height: 40vh; min-width: auto; }

.WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_video.WB_video_h5 { width: auto; height: auto; display: table; }
.WB_h5video.hv-s1, .WB_h5video.hv-s3-2, .WB_h5video.hv-s3-5 { width: 120px; height: 80px; max-width: 120px; max-height: 80px; min-width: 36px; }
.WB_h5video.hv-s1 .con-11, .WB_h5video.hv-s3-2 .con-11, .WB_h5video.hv-s3-5 .con-11 { display: none; }
.WB_h5video.hv-s1 video, .WB_h5video.hv-s3-2 video, .WB_h5video.hv-s3-5 video { max-width: 100%; max-height: 100%; }
.WB_h5video.hv-s3.hv-s3-2 .con-4,
.WB_h5video.hv-s3.hv-s3-5 .con-4 { opacity: 1; z-index: 1; }
.WB_h5video.hv-s3.hv-s3-2:hover .con-6,
.WB_h5video.hv-s3.hv-s3-5:hover .con-6,
.WB_h5video.hv-s3.hv-s3-5 .con-3 .box-2 em,
.WB_h5video .con-3.hv-s3-3 .box-3 { opacity: 0; z-index: 0; }
.WB_video .wbv-error-display h4 { bottom: 0; }

.WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_video:not([yawf-video-play]) { width: 120px; height: 80px; min-width: 36px; }
.WB_feed.WB_feed_v3 .WB_media_a_m1 .WB_video:not([yawf-video-play]) .wbv-control-bar { display: none !important; }

.WB_card_vote.WB_card_vote .vote_con1 .item { font-size: inherit; line-height: 14px; margin-top: -5px; text-align: left; }
.WB_card_vote.WB_card_vote .vote_con1 .item_rt { font-size: inherit; line-height: 24px; height: 24px; margin-top: -5px; }
.WB_card_vote.WB_card_vote .vote_con2 .vote_pic { width: 120px; height: 90px; }
.WB_card_vote.WB_card_vote .vote_con2 { width: 242px; margin: 0; }
.WB_card_vote.WB_card_vote .vote_con2 table { margin: 5px 0; }
.WB_card_vote.WB_card_vote .vote_con2 .vote_pic .bg { font-size: inherit; text-shadow: 0 0 2px black; }
.WB_card_vote.WB_card_vote .vote_con2 .vote_btn a { margin: 5px 0; }
.WB_card_vote.WB_card_vote .vote_tit { font-size: inherit; }
.WB_card_vote.WB_card_vote .vote_share a { line-height: 24px; height: 24px; margin-top: -5px; }
`);
      observer.dom.add(function smallVideo() {
        const videos = Array.from(document.querySelectorAll('.WB_video_h5_v2 .WB_h5video_v2:not([yawf-watch-pouse])'));
        videos.forEach(video => {
          video.setAttribute('yawf-watch-pause', '');
          const container = video.closest('.WB_video_h5_v2');
          let videoObserver;
          const setPlayAttribute = function setPlayAttribute() {
            const playing = video.classList.contains('wbv-playing');
            if (playing) {
              container.setAttribute('yawf-video-play', '');
              if (videoObserver) videoObserver.disconnect();
              return true;
            }
            return false;
          };
          if (setPlayAttribute()) return;
          videoObserver = new MutationObserver(setPlayAttribute);
          videoObserver.observe(video, { attributes: true, attributeFilter: ['class'], childList: false, characterData: false });
        });
      });
      const repost = this.ref.repost.getConfig();
      if (repost) css.append(`
.WB_feed.WB_feed_v3 .WB_expand_media { margin: 2px 0 8px; padding: 12px 16px 16px; }
.WB_feed.WB_feed_v3 .WB_expand { margin: 0 0 10px; padding: 10px 16px 13px; }
.WB_feed.WB_feed_v3 .WB_expand .WB_func { margin: 0; }
.WB_feed.WB_feed_v3 .WB_expand_media_box { margin-left: 0; margin-right: 0; }
.WB_feed.WB_feed_v3 .WB_expand .WB_expand_media { padding: 0 0 5px; margin: 0; }
.WB_feed.WB_feed_v3 .WB_media_view { margin: 6px auto 0; }
.WB_feed.WB_feed_v3 .WB_media_view, .WB_feed.WB_feed_v3 .WB_media_view .media_show_box li { width: 440px; }
.WB_feed.WB_feed_v3 .WB_media_view .media_show_box ul { margin-left: -32px; padding-left: 32px; }
.WB_feed.WB_feed_v3 .artwork_box { width: 440px; }
.WB_feed.WB_feed_v3 .WB_media_view .media_show_box img { max-width: 440px; height: auto !important; }
.WB_feed.WB_feed_v3 .layer_view_morepic .view_pic { padding: 0 40px 20px; }
.WB_feed.WB_feed_v3 .WB_media_view .pic_choose_box .stage_box { width: 440px; }
`);
      const feedWidth = layout.increaseFeedWidth.isEnabled() ? layout.increaseFeedWidth.ref.width.getConfig() : 600;
      if (feedWidth < 650 && repost) css.append(`
.WB_h5video { margin-left: -22px; }
.WB_h5video.hv-s1, .WB_h5video.hv-s3-2, .WB_h5video.hv-s3-5 { margin-left: 0; }
.yawf-WB_video[yawf-video-play] { margin-left: -22px; }
`);
      // FIXME 八图或九图时，展开后图片列表显示不完整
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
      cn: '重新排列微博控制按钮 {{i}}||{{0}}|{{1}}|{{2}}|{{3}}|{{4}}',
      tw: '重新排列微博控制按鈕 {{i}}||{{0}}|{{1}}|{{2}}|{{3}}|{{4}}',
      en: 'Reorder buttons of feeds {{i}}||{{0}}|{{1}}|{{2}}|{{3}}|{{4}}',
    },
    reorderFeedButtonDetail: {
      cn: '此外您还可以在版面清理选项卡，或此处，勾选以隐藏“[[clean_feed_pop]]”“[[clean_feed_favorite]]”“[[clean_feed_forward]]”“[[clean_feed_like]]”。',
    },
    reorderFeedButtonPop: { cn: '推广', tw: '推廣', en: ' Promote' },
    reorderFeedButtonFavorite: { cn: '收藏', tw: '收藏', en: 'Favourite' },
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
    id: 'feed_button_order',
    version: 1,
    parent: layout.layout,
    template: () => i18n.reorderFeedButton,
    ref: Object.assign({}, reorderRefGroup([
      { value: 'pop', text: () => i18n.reorderFeedButtonPop },
      { value: 'favorite', text: () => i18n.reorderFeedButtonFavorite },
      { value: 'forward', text: () => i18n.reorderFeedButtonForward },
      { value: 'comment', text: () => i18n.reorderFeedButtonComment },
      { value: 'like', text: () => i18n.reorderFeedButtonLike },
    ]), {
      i: { type: 'bubble', icon: 'ask', template: () => i18n.reorderFeedButtonDetail },
    }),
    init() {
      [0, 1, 2, 3, 4].forEach(key => {
        keepOrderItemsDiff(this.ref[key]);
      });
    },
    ainit() {
      css.append(`
.WB_feed.WB_feed_v3 .WB_func .WB_handle li:last-child .line { border-right-width: 1px; }
.WB_feed.WB_feed_v3 .WB_func .WB_handle ul { overflow: hidden; }
.WB_feed.WB_feed_v3 .WB_func .WB_handle ul::after {  content: " "; display: block; margin-left: -1px; flex: 0 0 0; order: 10; }
.WB_handle ul li[yawf-handle-type="fl_read"] { order: 0; }
${[0, 1, 2, 3, 4].map(index => `
.WB_handle ul li[yawf-handle-type="fl_${this.ref[index].getConfig()}"] { order: ${index + 1}; }
`).join('')}
    `);
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
    favoritedFeed: {
      cn: '已收藏',
      en: 'Favorite Added',
    },
  });

  layout.disableTagDialog = rule.Rule({
    id: 'feed_disable_tag_dialog',
    version: 1,
    parent: layout.layout,
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
        const $CONFIG = init.page.$CONFIG;
        const success = await request.feedFavorite(feed, { $CONFIG });
        if (!success) {
          dialog.alert({
            id: 'yawf-favorite-fail',
            icon: 'warn',
            title: i18n.favoriteFailTitle,
            text: i18n.favoriteFailText,
          });
        } else {
          button.setAttribute('favorite', '1');
          const text = button.querySelector('[node-type="favorite_btn_text"]') || button;
          text.innerHTML = '<span><em class="W_ficon ficon_favorite S_spetxt">\xFB</em><em></em></span>';
          text.querySelector('em + em').textContent = i18n.favoritedFeed;
        }
      }, true);
    },
  });

  i18n.lowReadingCountWarn = {
    cn: '在自己个人主页高亮显示阅读数量|不超过{{count}}的微博',
    tw: '在自己個人主頁高亮顯示閱讀數量|不超過{{count}}的微博',
    en: 'Highlight feeds on my profile page which has | no more than {{count}} views',
  };

  layout.lowReadingCountWarn = rule.Rule({
    id: 'feed_low_reading_warn',
    version: 23,
    parent: layout.layout,
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


}());
//#endregion
//#region @require yaofang://content/rule/feeds/content.js
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
  const ui = util.ui;

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

  i18n.styleTextFontSize = {
    cn: '增大微博正文字号为|原大小的{{ratio}}',
    tw: '加大微博內文字體為|原大小的{{ratio}}',
    en: 'Increase font size for weibo content | to {{ratio}}',
  };

  content.fontSize = rule.Rule({
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
          { value: '300', text: '300%', style: `font-size: 42px;` },
        ],
      },
    },
    ainit() {
      const { fs, lh, fs2, lh2, h, h2, fs3 } = {
        120: { fs: 16, lh: 26, fs2: 14, lh2: 24, h: 20, h2: 18, fs3: 12 },
        150: { fs: 21, lh: 32, fs2: 18, lh2: 27, h: 25, h2: 23, fs3: 14 },
        200: { fs: 28, lh: 42, fs2: 24, lh2: 36, h: 33, h2: 29, fs3: 19 },
        300: { fs: 42, lh: 64, fs2: 36, lh2: 54, h: 50, h2: 46, fs3: 28 },
      }[this.ref.ratio.getConfig()];
      const style = `
.WB_info, .WB_text, .WB_info *, .WB_text * { font-size: ${fs}px !important; line-height: ${lh}px !important; }
.WB_feed_expand .WB_info *, .WB_feed_expand .WB_text *, .WB_feed_expand .WB_info, .WB_feed_expand .WB_text { font-size: ${fs2}px !important; line-height: ${lh2}px !important; }
.WB_text .W_btn_b { height: ${h}px !important; }
.WB_text .W_btn_b, .WB_text .W_btn_b * { line-height: ${h}px !important; font-size: ${fs2}px !important; }
.WB_feed_expand .WB_text .W_btn_b, .WB_text .W_btn_c, .WB_empty .W_btn_c { height: ${h2}px !important; line-height: ${h2}px !important; }
.WB_feed_expand .WB_text .W_btn_b, .WB_feed_expand .WB_text .W_btn_b *, .WB_text .W_btn_c *, .WB_empty .W_btn_c * { line-height: ${h2}px !important; font-size: ${fs3}px !important; }
.W_icon_feedpin, .W_icon_feedhot { height: 16px !important; line-height: 16px !important; }
.WB_info { margin-bottom: 2px !important; padding-top: 0 !important; line-height: ${fs <= 28 ? 28 : 50}px !important; }
.yawf-WB_text_size_main, .yawf-WB_text_size { font-size: ${fs}px; }
.yawf-WB_text_size_expand, .WB_feed_expand .yawf-WB_text_size { font-size: ${fs2}px; }
`;
      css.append(style);
    },
  });

  i18n.autoExpandLongFeeds = {
    cn: '自动展开|不超过{{count}}字的微博|（每个换行符计{{br}}字）',
    tw: '自動展開|不超過{{count}}個字的微博|（每個換行符計{{br}}字）',
    en: 'Automatically unfold weibo | within {{count}} characters || (count each line break as {{br}} characters)',
  };

  content.expandLong = rule.Rule({
    id: 'feed_long_expand',
    version: 1,
    parent: content.content,
    template: () => i18n.autoExpandLongFeeds,
    ref: {
      count: { type: 'range', min: 140, max: 2000, step: 10, initial: 200 },
      br: { type: 'range', min: 1, max: 60, step: 1, initial: 30 },
    },
    // 这个设置项的相关逻辑实现在 content/rule/feed/feed/long.js
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

  i18n.useTextEmoji = {
    cn: '将微博中图片表示的 Unicode 表情符号替换为文本',
    tw: '將微博中圖片表示的 Unicode Emoji 替換為文本',
    en: 'Use text for unicode emoji instead of image',
  };

  const softbankEmojiLookupTable = { 1: 128102, 2: 128103, 3: 128139, 4: 128104, 5: 128105, 6: 128085, 7: 128094, 8: 128247, 9: 9742, 10: 128241, 11: 128224, 12: 128187, 13: 128074, 14: 128077, 15: 9757, 16: 9994, 17: 9996, 18: 128587, 19: 127935, 20: 9971, 21: 127934, 22: 9918, 23: 127940, 24: 9917, 25: 128033, 26: 128052, 27: 128663, 28: 9973, 29: 9992, 30: 128643, 31: 128645, 32: 10067, 33: 10071, 34: 10084, 35: 128148, 36: 128336, 37: 128337, 38: 128338, 39: 128339, 40: 128340, 41: 128341, 42: 128342, 43: 128343, 44: 128344, 45: 128345, 46: 128346, 47: 128347, 48: 127800, 49: 128305, 50: 127801, 51: 127876, 52: 128141, 53: 128142, 54: 127968, 55: 9962, 56: 127970, 57: 128649, 58: 9981, 59: 128507, 60: 127908, 61: 127909, 62: 127925, 63: 128273, 64: 127927, 65: 127928, 66: 127930, 67: 127860, 68: 127864, 69: 9749, 70: 127856, 71: 127866, 72: 9924, 73: 9729, 74: 9728, 75: 9748, 76: 127764, 77: 127748, 78: 128124, 79: 128049, 80: 128047, 81: 128059, 82: 128041, 83: 128045, 84: 128051, 85: 128039, 86: 128523, 87: 128515, 88: 128542, 89: 128544, 90: 128169, 257: 128234, 258: 128238, 259: 9993, 260: 128242, 261: 128540, 262: 128525, 263: 128561, 264: 128531, 265: 128053, 266: 128025, 267: 128055, 268: 128125, 269: 128640, 270: 128081, 271: 128161, 272: 127808, 273: 128143, 274: 127873, 275: 128299, 276: 128269, 277: 127939, 278: 128296, 279: 127878, 280: 127809, 281: 127810, 282: 128127, 283: 128123, 284: 128128, 285: 128293, 286: 128188, 287: 128186, 288: 127828, 289: 9970, 290: 9978, 291: 9832, 292: 127905, 293: 127915, 294: 128191, 295: 128192, 296: 128251, 297: 128252, 298: 128250, 299: 128126, 300: 12349, 301: 126980, 302: 127386, 303: 128176, 304: 127919, 305: 127942, 306: 127937, 307: 127920, 308: 128014, 309: 128676, 310: 128690, 311: 128679, 312: 128697, 313: 128698, 314: 128700, 315: 128137, 316: 128164, 317: 9889, 318: 128096, 319: 128704, 320: 128701, 321: 128266, 322: 128226, 323: 127884, 324: 128274, 325: 128275, 326: 127750, 327: 127859, 328: 128211, 329: 128177, 330: 128185, 331: 128225, 332: 128170, 333: 127974, 334: 128677, 335: 127359, 336: 128655, 337: 128699, 338: 128110, 339: 127971, 340: 127975, 341: 127973, 342: 127978, 343: 127979, 344: 127976, 345: 128652, 346: 128661, 1091: 127744, 1084: 127746, 1099: 127747, 1097: 127749, 1098: 127751, 1100: 127752, 1086: 127754, 821: 127775, 575: 9800, 576: 9801, 577: 9802, 578: 9803, 579: 9804, 580: 9805, 581: 9806, 582: 9807, 583: 9808, 584: 9809, 585: 9810, 586: 9811, 587: 9934, 772: 127799, 1095: 127811, 771: 127802, 773: 127803, 775: 127796, 776: 127797, 1092: 127806, 837: 127822, 838: 127818, 839: 127827, 840: 127817, 841: 127813, 842: 127814, 1049: 128064, 1051: 128066, 1050: 128067, 1052: 128068, 1033: 128069, 796: 128132, 797: 128133, 798: 128134, 799: 128135, 800: 128136, 1064: 128107, 1065: 128111, 1301: 128113, 1302: 128114, 1303: 128115, 1304: 128116, 1305: 128117, 1306: 128118, 1307: 128119, 1308: 128120, 595: 128129, 1310: 128130, 1311: 128131, 1325: 128013, 1326: 128020, 1327: 128023, 1328: 128043, 1318: 128024, 1319: 128040, 1320: 128018, 1321: 128017, 1089: 128026, 1317: 128027, 1314: 128032, 1315: 128036, 1313: 128038, 1312: 128044, 1316: 128057, 1322: 128058, 1323: 128046, 1324: 128048, 1329: 128056, 1334: 128062, 1027: 128553, 1040: 128562, 1030: 128565, 1039: 128560, 1038: 128530, 1028: 128548, 1048: 128536, 1047: 128538, 1036: 128567, 1037: 128563, 1045: 128517, 1034: 128518, 1042: 128514, 1044: 9786, 1043: 128546, 1041: 128557, 1035: 128552, 1046: 128545, 1031: 128534, 1032: 128554, 1026: 128527, 1025: 128549, 1029: 128521, 1059: 128581, 1060: 128582, 1062: 128583, 1063: 128588, 1053: 128591, 1281: 127977, 1284: 127980, 1285: 127983, 1286: 127984, 1288: 127981, 514: 9875, 779: 127982, 1289: 128508, 1309: 128509, 794: 128097, 795: 128098, 770: 128084, 792: 128082, 793: 128087, 801: 128088, 802: 128089, 803: 128092, 1299: [127464, 127475], 1294: [127465, 127466], 1297: [127466, 127480], 1293: [127467, 127479], 1296: [127468, 127463], 1295: [127470, 127481], 1291: [127471, 127477], 1300: [127472, 127479], 1298: [127479, 127482], 1292: [127482, 127480], 574: 128302, 521: 128304, 783: 128138, 1330: 127344, 1331: 127345, 1332: 127374, 1333: 127358, 788: 127872, 843: 127874, 1096: 127877, 784: 127880, 786: 127881, 1078: 127885, 1080: 127886, 1081: 127891, 1082: 127890, 1083: 127887, 1088: 127879, 1090: 127888, 1093: 127875, 1094: 127889, 769: 128221, 791: 128227, 790: 128189, 787: 9986, 1066: 127936, 1067: 127944, 1069: 127946, 1076: 128647, 1077: 128644, 1070: 128665, 1071: 128666, 1072: 128658, 1073: 128657, 1074: 128659, 1075: 127906, 1287: 127910, 778: 127911, 1282: 127912, 1283: 127913, 804: 127916, 1068: 127921, 806: 127926, 774: 128144, 1061: 128145, 1085: 128146, 519: 128286, 590: 169, 591: 174, 1335: 8482, 528: [35, 8419], 540: [49, 8419], 541: [50, 8419], 542: [51, 8419], 543: [52, 8419], 544: [53, 8419], 545: [54, 8419], 546: [55, 8419], 547: [56, 8419], 548: [57, 8419], 549: [48, 8419], 523: 128246, 592: 128243, 593: 128244, 834: 127833, 832: 127836, 825: 127838, 826: 127846, 827: 127839, 828: 127841, 829: 127832, 830: 127834, 831: 127837, 833: 127835, 835: 127842, 836: 127843, 844: 127857, 845: 127858, 1087: 127847, 824: 127861, 780: 127867, 566: 8599, 568: 8600, 567: 8598, 569: 8601, 562: 11014, 563: 11015, 564: 10145, 565: 11013, 570: 9654, 571: 9664, 572: 9193, 573: 9194, 818: 11093, 819: 10060, 822: 10068, 823: 10069, 529: 10175, 807: 128147, 808: 128151, 809: 128152, 810: 128153, 811: 128154, 812: 128155, 813: 128156, 1079: 128157, 516: 128159, 524: 9829, 526: 9824, 525: 9830, 527: 9827, 782: 128684, 520: 128685, 522: 9855, 594: 9888, 513: 128694, 777: 128702, 532: 127378, 553: 127380, 530: 127381, 589: 127383, 531: 127385, 515: 127489, 552: 127490, 555: 127539, 554: 127541, 533: 127542, 534: 127514, 535: 127543, 536: 127544, 551: 127545, 556: 127535, 557: 127546, 789: 12953, 781: 12951, 550: 127568, 820: 128162, 785: 128163, 817: 128166, 816: 128168, 814: 10024, 517: 10036, 518: 10035, 537: 9898, 538: 128309, 539: 128307, 815: 11088, 805: 128276, 588: 128285, 558: 128070, 559: 128071, 560: 128072, 561: 128073, 1054: 128075, 1055: 128079, 1056: 128076, 1057: 128078, 1058: 128080 };
  const emojiCodeToUtf8 = function (code) {
    // 我们将 utf8 编码转换成码位点，并减去 0xe000 后查表
    const softbankEmojiString = decodeURIComponent(code.replace(/(..)/g, '%$1'));
    const unicodeCodePoints = softbankEmojiLookupTable[softbankEmojiString.codePointAt(0) - 0xe000];
    const codePointsArray = typeof unicodeCodePoints === 'number' ? [unicodeCodePoints] : unicodeCodePoints;
    const unicodeText = String.fromCodePoint(...codePointsArray);
    return unicodeText;
  };

  content.useTextEmoji = rule.Rule({
    id: 'feed_unicode_emoji',
    version: 1,
    parent: content.content,
    template: () => i18n.useTextEmoji,
    ainit() {
      const useTextEmoji = function useTextEmoji() {
        const emoji = Array.from(document.querySelectorAll('[src*="//img.t.sinajs.cn/t4/appstyle/expression/emimage/e"]'));
        emoji.forEach(img => {
          const code = img.getAttribute('src').match(/(e.....)\.png/)[1];
          const text = emojiCodeToUtf8(code);
          const emojiContainer = document.createElement('span');
          emojiContainer.className = 'yawf-emoji';
          emojiContainer.textContent = text;
          img.replaceWith(emojiContainer);
        });
      };
      observer.dom.add(useTextEmoji);
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
    id: 'show_vote_result',
    version: 46,
    parent: content.content,
    template: () => i18n.showVoteResult,
    ref: {
      i: { type: 'bubble', icon: 'warn', template: () => i18n.showVoteResultDetail },
    },
    ainit() {
      const updateVoteByLike = function (feedlike) {
        const like = feedlike.querySelector('[action-type="fl_like"]');
        const liked = like.querySelector('[node-type="like_status"]').matches('.UI_ani_praised');
        const items = feedlike.querySelectorAll('[action-type="feed_list_vote"], [action-type="yawf-feed_list_vote"]');
        Array.from(items).forEach(item => {
          item.setAttribute('action-type', liked ? 'feed_list_vote' : 'yawf-feed_list_vote');
        });
      };
      const showVoteResult = async function (vote) {
        const voteButtons = Array.from(vote.querySelectorAll('[action-type="feed_list_vote"], [action-type="yawf-feed_list_vote"]'));
        if (!voteButtons.length) return;
        const voteId = new URLSearchParams(voteButtons[0].getAttribute('action-data')).get('vote_id');
        if (!voteId) return;
        const voteResult = await request.voteDetail(voteId);
        voteButtons.forEach(button => {
          const actionData = new URLSearchParams(button.getAttribute('action-data'));
          const id = actionData.get('vote_items');
          const item = voteResult.vote_info.option_list.find(item => item.id === id);
          button.dataset.partNum = item.part_num.replace('票', '人');
          button.dataset.partRatio = item.part_ratio;
          button.style.setProperty('--part-ratio', item.part_ratio / 100);
        });
        const feedlike = vote.closest('.WB_feed_expand, .WB_feed_type');
        updateVoteByLike(feedlike);
      };
      const watchLike = function (/** @type {HTMLElement} */vote) {
        const feedlike = vote.closest('.WB_feed_expand, .WB_feed_type');
        const like = feedlike.querySelector('[action-type="fl_like"]');
        const observer = new MutationObserver(() => { updateVoteByLike(feedlike); });
        observer.observe(like, { subtree: true, attributes: true, attributeFilter: ['class'] });
        updateVoteByLike(feedlike);
      };
      observer.dom.add(function updateVoteResult() {
        const voteList = document.querySelectorAll('.WB_card_vote:not([yawf-card-vote])');
        if (!voteList.length) return;
        Array.from(voteList).forEach(vote => {
          vote.setAttribute('yawf-card-vote', 'yawf-card-vote');
          showVoteResult(vote);
          watchLike(vote);
        });
      });
      document.addEventListener('click', event => {
        const target = event.target;
        if (!(target instanceof HTMLElement)) return;
        const vote = target.closest('[action-type="yawf-feed_list_vote"]');
        if (!vote) return;
        ui.alert({
          id: 'yawf-vote-block',
          icon: 'warn',
          title: i18n.voteTitle,
          text: i18n.voteText,
        });
      });
      css.append(`
.WB_card_vote.WB_card_vote .vote_con1 .item { position: relative; z-index: 1; overflow: hidden; text-align: left; }
.WB_card_vote.WB_card_vote .vote_con1 .item::after { content: attr(data-part-num) ; float: right; }
.WB_card_vote.WB_card_vote .vote_con1 .item::before { content: " "; width: calc(var(--part-ratio) * 100%); background: #f2f2f5; top: 0; left: 0; bottom: 0; margin: 0; position: absolute; z-index: -1; }
.WB_card_vote.WB_card_vote .vote_con2 .vote_btn { position: relative; font-size: 14px; }
.WB_card_vote.WB_card_vote .vote_con2 .vote_btn a { background: currentColor; border-radius: 0; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fl .vote_btn a { margin-right: -2px; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fr .vote_btn a { margin-left: -2px; }
.WB_card_vote.WB_card_vote .vote_con2 .vote_btn::after { content: attr(data-part-num); position: absolute; top: 0; bottom: 0; color: white; line-height: 24px; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fl .vote_btn::after { left: 26px; right: auto; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fr .vote_btn::after { left: auto; right: 26px; }
`);
      const smallImage = feeds.layout.smallImage;
      if (smallImage.isEnabled()) {
        css.append(`
.WB_card_vote.WB_card_vote .vote_con2 .W_fl .vote_btn a { margin-right: -1px; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fr .vote_btn a { margin-left: -1px; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fl .vote_btn::after { left: 10px; }
.WB_card_vote.WB_card_vote .vote_con2 .W_fr .vote_btn::after { right: 10px; }
`);
      }
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
        })].filter(content => content && content.str);
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
            const span = document.createElement('span');
            span.classList.add('yawf-diff-' + type);
            span.textContent = part;
            fragement.appendChild(span);
            if (part === '\n') {
              const breakToken = document.createElement('span');
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
        const [sourceImg, sourceHtml, sourceItems, sourceActionDatas] = getImages(source);
        const [targetImg, targetHtml, targetItems, targetActionDatas] = getImages(target);
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
            a.textContent = util.time.format(version.date, 'month');
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
`);
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
  const feedParser = yawf.feed;

  const feeds = yawf.rules.feeds;

  const i18n = util.i18n;
  const css = util.css;
  const urls = util.urls;

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

  const getImagesInfo = function (ref) {
    let container, imgs, img;
    if (ref.matches('.WB_detail .WB_expand_media *')) {
      // 已经展开详情的图片
      container = ref.closest('.WB_detail');
      imgs = Array.from(container.querySelectorAll('.WB_media_wrap .WB_pic img'));
      img = container.querySelector('.media_show_box img') ||
        container.querySelector('.current img');
      if (ref.matches('[action-type="widget_photoview"]')) {
        img = document.createElement('image');
        img.src = 'https://wx1.sinaimg.cn/large/' + new URLSearchParams(ref.getAttribute('action-data')).get('pid') + '.jpg';
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
      return { images: ['https://wx1.sinaimg.cn/large/' + pid + '.jpg'], current: 1 };
    } else if (ref.href && ref.href.indexOf('javascript:') === -1) {
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
          const feedId = feed.getAttribute('comment_id') ||
            ref.closest('.WB_feed_expand') && feed.getAttribute('omid') ||
            feed.getAttribute('mid') || 0;
          const path = 'weibo-images/' + download.filename(feedId) + '/' + filename;
          return { url, filename: path };
        });
        files.forEach(file => {
          util.debug('download fetch url %s', file.url);
        });
        download.urls(files);
      };

      const downloadButton = viewLargeLink => {
        const downloadLinkContainer = document.createElement('ul');
        downloadLinkContainer.innerHTML = '<li><span class="line S_line1"><a class="S_txt1" href="javascript:;" target="_blank"><i class="W_ficon ficon_search S_ficon">|</i></a></span></li>';
        downloadLinkContainer.querySelector('i').after(i18n.downloadImageText);
        const downloadLink = downloadLinkContainer.querySelector('a');
        downloadLink.addEventListener('click', event => {
          const { images } = getImagesInfo(viewLargeLink);
          downloadImages(images, downloadLink);
          event.preventDefault();
        });
        return downloadLinkContainer.firstChild;
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
          const li = viewLargeLink.closest('li');
          if (downloadEnabled) {
            li.after(downloadButton(viewLargeLink));
          }
          if (viewEnabled) {
            li.after(viewOriginalButton(viewLargeLink));
          }
        });
      };
      observer.dom.add(addImageHandlerLink);

      // 处理点击时直接查看原图/下载的情况
      if (directView || directDownload) {
        document.addEventListener('click', function (event) {
          const target = event.target;
          if (event.button !== 0) return; // 只响应左键操作
          if (event.shiftKey) return; // 按下 Shift 时不响应
          if (target.closest('.yawf-W_icon_tag_9p')) return; // 展开过多被折叠的图片
          const pic = target.closest('.WB_media_wrap .WB_pic') || target.closest('a[imagecard]');
          if (!pic) return;
          event.stopPropagation();
          const { images, current } = getImagesInfo(pic);
          if (directView) showOriginalPage({ images, current });
          else downloadImages(images, target);
        }, true);
      }

      if (env.config.contextMenuSupported && (contextMenuView || contextMenuDownload)) {
        contextmenu.addListener(function (/** @type {MouseEvent} */event) {
          /** @type {Element & EventTarget} */
          const target = event.target;
          const pic = (function () {
            const pic = target.closest('.WB_media_wrap .WB_pic') || target.closest('a[imagecard]');
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
      const previewSize = this.ref.count.getConfig();
      const previewWidth = +previewSize[0];
      const previewCount = previewSize[0] * previewSize[2] || Infinity;
      const lastImageMask = this.ref.more.getConfig() === 'mask';

      observer.feed.onAfter(async function (/** @type {HTMLElement} */feed) {
        // 单条微博页面已经预先展开了，所以不能再继续操作了
        if (document.querySelector('[id^="Pl_Official_WeiboDetail__"]')) return;
        const ul = feed.querySelector('ul[node-type="fl_pic_list"][action-data*="over9pic=1"]');
        // 如果没有图片，或者已经有第十张图片了，那我们应该不工作
        if (!ul || ul.querySelector('.li_10')) return;
        const mid = (feedParser.isForward(feed) ? feedParser.omid : feedParser.mid)(feed);
        const [author] = feedParser.author.id(feed);
        ul.classList.add('yawf-WB_media_a_m9p_loading');
        /** @type {string[]} */
        const allImages = await request.getAllImages(mid);
        const imageCount = allImages.length;
        if (imageCount < 10) return;
        const pids = allImages.map(img => img.replace(/^.*\/(.*)\..*$/, '$1'));
        const imgType = type => img => img.replace(/^(.*\/).*(\/.*)$/, (_, d, n) => d + type + n);
        ul.classList.remove('yawf-WB_media_a_m9p_loading');
        // 最后一个图片的格式和别人不一样，如果我们要显示的不是9个，就会很奇怪，所以我们删掉再自己加一遍
        ul.removeChild(ul.querySelector('.li_9'));
        allImages.forEach((image, index) => {
          if (index < 8) return;
          const pid = pids[index];
          const li = document.createElement('li');
          li.className = `WB_pic li_${index + 1} S_bg1 S_line2 bigcursor li_focus yawf-li_more`;
          li.setAttribute('action-data', `isPrivate=0&relation=0&pic_id=${pid}`);
          li.setAttribute('action-type', 'fl_pics');
          li.setAttribute('suda-uatrack', `key=tblog_newimage_feed&value=image_feed_unfold:${mid}:${pid}:${author}:0`);
          const img = li.appendChild(document.createElement('img'));
          // 因为不知道总宽比的时候不太方便处理 orj360，所以用 thumb300 代替一下
          img.src = imgType('thumb300')(image);
          img.style = 'height:110px;width:110px;top:0;left:0;';
          ul.appendChild(li);
          if (image.endsWith('.gif')) {
            const tip = document.createElement('i');
            tip.className = 'W_icon_tag_v2';
            tip.textContent = i18n.animatedImage;
            li.appendChild(tip);
          }
        });
        // 同时保留 WB_media_a_m9
        ul.classList.add('yawf-WB_media_a_m' + imageCount, 'yawf-WB_media_a_m9p');
        // 不能用 URLSearchParams 来处理 actionData，因为它需要项目间的逗号不被转义才能正常工作
        const actionData = ul.getAttribute('action-data').split('&');
        const setActionData = (key, value) => {
          const newValue = key + '=' + value.map(encodeURIComponent).join(',');
          const item = actionData.findIndex(item => item.startsWith(key + '='));
          if (item !== -1) actionData[item] = newValue;
          else actionData.push(newValue);
        };
        setActionData('clear_picSrc', allImages.map(imgType('mw690')));
        setActionData('thumb_picSrc', allImages.map(imgType('orj360')));
        setActionData('pic_ids', pids);
        setActionData('object_ids', pids.map(pid => '1042018:' + pid));
        // 微博自己判断的是 over9pic == 1，所以我们用图片数量代替一下这个值
        // 这样既包括 "over9pic=1" 子串，也保持了 truthy，同时还不是 1
        setActionData('over9pic', [allImages.length]);
        // GIF 对应的视频 id 拿不到，所以就不更新了，反正也就是动图放不了罢了
        ul.setAttribute('action-data', actionData.join('&'));

        if (imageCount > previewCount) {
          /** @type {HTMLDivElement} */
          const mediaWrap = ul.closest('.WB_media_wrap');
          if (lastImageMask) {
            const lastImage = ul.querySelectorAll('.WB_pic')[previewCount - 1];
            const mask = document.createElement('span');
            mask.className = 'yawf-W_icon_tag_9p W_icon_tag_9p';
            mask.textContent = '+' + (imageCount - previewCount);
            lastImage.appendChild(mask);
          } else {
            // 类似超过 140 字的展开全文一样，我们显示一个查看所有图片的按钮
            const foldContainer = document.createElement('div');
            foldContainer.className = 'yawf-WB_media_a_ctrl yawf-WB_text_size';
            foldContainer.innerHTML = '<a href="javascript:;" class="yawf-WB_media_a_show"><i class="W_ficon ficon_arrow_down">c</i></a><a href="javascript:;" class="yawf-WB_media_a_fold"><i class="W_ficon ficon_arrow_up">d</i></a>';
            const showButton = foldContainer.querySelector('.yawf-WB_media_a_show');
            const showText = i18n.previewAllShow.replace('{1}', () => imageCount);
            showButton.insertBefore(document.createTextNode(showText), showButton.firstChild);
            const foldButton = foldContainer.querySelector('.yawf-WB_media_a_fold');
            const foldText = i18n.previewAllFold;
            foldButton.insertBefore(document.createTextNode(foldText), foldButton.firstChild);
            showButton.addEventListener('click', () => {
              mediaWrap.classList.add('yawf-WB_media_a_all');
            });
            foldButton.addEventListener('click', () => {
              const oldHeight = mediaWrap.clientHeight;
              const oldScrollTop = document.documentElement.scrollTop;
              mediaWrap.classList.remove('yawf-WB_media_a_all');
              // 调整滚动条以适应高度变化
              requestAnimationFrame(function () {
                const newHeight = mediaWrap.clientHeight;
                document.documentElement.scrollTop = oldScrollTop - oldHeight + newHeight;
              });
            });
            mediaWrap.appendChild(foldContainer);
          }
        }
      });

      if (Number.isFinite(previewCount)) css.append(`.yawf-WB_media_a_m9p .li_${previewCount} ~ .WB_pic { display: none; }`);
      css.append(`
.yawf-WB_media_a_m9p_loading { visibility: hidden; opacity: 0; }
.yawf-WB_media_a_all .yawf-W_icon_tag_9p { display: none; }
.yawf-WB_media_a_all .yawf-WB_media_a_m9p .WB_pic { display: block; }
.yawf-WB_media_a_fold { display: none; }
.yawf-WB_media_a_show { display: inline; }
.yawf-WB_media_a_all .yawf-WB_media_a_fold { display: inline; }
.yawf-WB_media_a_all .yawf-WB_media_a_show { display: none; }
.yawf-WB_media_a_ctrl { clear: both; margin-left: 10px; padding-top: 4px; }
`);
      if (previewWidth === 4) {
        const smallImage = feeds.layout.smallImage.isEnabled();
        if (smallImage) {
          css.append('.WB_feed_v3 .WB_media_a.yawf-WB_media_a_m9p { width: 345px; }');
        } else {
          css.append('.WB_feed_v3 .WB_media_a.yawf-WB_media_a_m9p { width: 456px; }');
        }
      }

      if (lastImageMask) {
        document.addEventListener('click', event => {
          const target = event.target;
          if (!(target instanceof Element)) return;
          const mask = target.closest('.yawf-W_icon_tag_9p');
          if (!mask) return;
          const mediaWrap = mask.closest('.WB_media_wrap');
          mediaWrap.classList.add('yawf-WB_media_a_all');
          event.stopPropagation();
        }, true);
      }
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
    useBuiltInVideoPlayer: { cn: '使用浏览器原生视频播放器{{i}}||音量{{volume}}%|{{memorize}}记忆上一次设置的音量', hk: '使用瀏覽器內建影片播放器{{i}}||音量{{volume}}%|{{memorize}}記住上一次設置的音量', en: 'Use browser built-in video player {{i}}||Volume {{volume}} | {{memorize}} memorize last volume' },
    useBuiltInVideoPlayerDetail: { cn: '一次性解决自动播放和交互逻辑的各种问题，开启时其他视频相关的改造功能不再生效。不支持直播视频。播放可能不会被微博正确计入播放数。' },
    mediaVideoType: { cn: '视频', hk: '影片', tw: '影片', en: 'Video' },
  });

  media.useBuiltInVideoPlayer = rule.Rule({
    id: 'feed_built_in_video_player',
    version: 1,
    parent: media.media,
    template: () => i18n.useBuiltInVideoPlayer,
    ref: {
      volume: { type: 'range', min: 0, max: 100, initial: 100 },
      memorize: { type: 'boolean' },
      i: { type: 'bubble', icon: 'warn', template: () => i18n.useBuiltInVideoPlayerDetail },
    },
    ainit() {
      const rule = this;
      const replaceWeiboVideoPlayer = function replaceWeiboVideoPlayer() {
        const containers = document.querySelectorAll('li.WB_video[node-type="fl_h5_video"][video-sources]');
        containers.forEach(function (container) {
          const smallImage = yawf.rules.feeds.layout.smallImage.getConfig();
          const cover = container.querySelector('[node-type="fl_h5_video_pre"] img');
          if (!cover) return;
          const video = container.querySelector('video');
          if (video) video.src = 'data:text/plain,42';
          const videoSourceData = new URLSearchParams(container.getAttribute('video-sources'));
          const videoSource = videoSourceData.get(videoSourceData.get('qType'));
          const newContainer = document.createElement('li');
          newContainer.className = container.className;
          newContainer.classList.add('yawf-WB_video');
          const newVideo = document.createElement('video');
          newVideo.poster = cover.src;
          newVideo.src = videoSource.replace(/^http:/, 'https:');
          newVideo.preload = 'none';
          newVideo.controls = !smallImage;
          newVideo.autoplay = false;
          const updatePlayState = function () {
            const isPlaying = !newVideo.paused || newVideo.seeking;
            if (isPlaying) newContainer.setAttribute('yawf-video-play', '');
            else newContainer.removeAttribute('yawf-video-play');
            if (smallImage) newVideo.controls = isPlaying;
          };
          newVideo.addEventListener('play', updatePlayState);
          newVideo.addEventListener('pause', updatePlayState);
          if (smallImage) {
            newContainer.addEventListener('click', () => {
              if (!newContainer.hasAttribute('yawf-video-play')) newVideo.play();
            });
            const tip = document.createElement('i');
            tip.className = 'W_icon_tag_v2';
            tip.textContent = i18n.mediaVideoType;
            newContainer.appendChild(tip);
          }
          newVideo.volume = rule.ref.volume.getConfig() / 100;
          if (rule.ref.memorize.getConfig()) {
            newVideo.addEventListener('volumechange', () => {
              rule.ref.volume.setConfig(Math.round(newVideo.volume * 100));
            });
            newVideo.addEventListener('play', () => {
              newVideo.volume = rule.ref.volume.getConfig() / 100;
            });
          }
          newContainer.appendChild(newVideo);
          container.parentNode.replaceChild(newContainer, container);
        });
      };
      observer.dom.add(replaceWeiboVideoPlayer);
      css.append(`
li.WB_video[node-type="fl_h5_video"][video-sources] > div[node-type="fl_h5_video_pre"],
li.WB_video[node-type="fl_h5_video"][video-sources] > div[node-type="fl_h5_video_disp"] { display: none !important; }
.yawf-WB_video { transition: width, height 0.2s; }
.yawf-WB_video video { width: 100%; height: 100%; position: absolute; top: 0; bottom: 0; left: 0; right: 0; margin: auto; }
.WB_media_a .WB_video.yawf-WB_video { cursor: unset; }
.yawf-WB_video .W_icon_tag_v2 { z-index: 1; }
.WB_video[yawf-video-play] .W_icon_tag_v2 { display: none !important; }
`);
      util.inject(function () {
        const FakeVideoPlayer = function e() { };
        FakeVideoPlayer.prototype.thumbnail = function () { };
        FakeVideoPlayer.prototype.playStatus = function () { };
        if (window.VideoPlayer) {
          window.VideoPlayer = FakeVideoPlayer;
          return;
        }
        let globalVideoPlayer = void 0;
        Object.defineProperty(window, 'VideoPlayer', {
          get() { return globalVideoPlayer; },
          set(_) { globalVideoPlayer = FakeVideoPlayer; },
          enumerable: true,
          configurable: false,
        });
      });
      // 这几行分别是不显示视频弹层按钮，显示全屏按钮，以及点视频时不弹层
      // 因为直播视频没办法替换成原生播放器，所以这两个功能还需要保留
      // 这里直接把这几个功能放在这里，不单独做一个功能了
      css.append(`
.wbv-pop-control { display: none !important; }
.wbv-fullscreen-control { display: block !important; }
.wbv-pop-layer { display: none !important; }
`);
    },
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
        if (!document || !document.body) {
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
        ...(groups || []).map(group => `g${group}`),
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
      (wbp.hideMods || []).forEach(mod => {
        Object.assign(configs, ...(this.cleans.get(mod) || []).map(clean => clean() || {}));
      });
      Object.keys(wbp).forEach(key => {
        Object.assign(configs, ...(this.rules.get(key) || []).map(rule => rule(wbp[key]) || {}));
      });
      Object.keys(wbp).forEach(key => {
        if (!this.collections.has(key)) return;
        (this.collections.get(key) || []).forEach(mapper => {
          const conf = mapper(wbp[key]);
          Object.keys(conf).forEach(ckey => {
            configs[ckey] = (configs[ckey] || []).concat(conf[ckey]);
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
      collection('grayKeywords', 'filter_content_text_fold.items', keywordMapper);
      collection('whiteKeywords', 'filter_content_regex_show.items', regexMapper);
      collection('blackKeywords', 'filter_content_regex_hide.items', regexMapper);
      collection('grayKeywords', 'filter_content_regex_fold.items', regexMapper);
      collection('userBlacklist', 'filter_author_id_hide.items', userIdMapper);
      collection('userBlacklist', 'filter_original_id_hide.items', userIdMapper);
      collection('sourceKeywords', 'filter_source_text_hide.items', textMapper);
      collection('sourceGrayKeywords', 'filter_source_text_fold.items', textMapper);
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
    id: 'script_import_export',
    version: 1,
    parent: backup.backup,
    render() {
      const rule = this;
      const container = document.createElement('span');
      container.className = 'yawf-config-item yawf-config-rule';
      container.innerHTML = '<label><input type="file" style=" width: 1px; height: 1px; margin: 0 -1px 0 0; opacity: 0;" /><span class="W_btn_b yawf-import" style="cursor: pointer"><span class="W_f14"></span></span></label><a class="W_btn_b yawf-export" href="javascript:;"><span class="W_f14"></span></a><a class="W_btn_b yawf-reset" href="javascript:;"><span class="W_f14"></span></a>';
      const importInput = container.querySelector('input');
      const importButton = container.querySelector('.yawf-import');
      const exportButton = container.querySelector('.yawf-export');
      const resetButton = container.querySelector('.yawf-reset');
      importButton.querySelector('.W_f14').textContent = i18n.configImportButton;
      exportButton.querySelector('.W_f14').textContent = i18n.configExportButton;
      resetButton.querySelector('.W_f14').textContent = i18n.configResetButton;
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
        await rule.configPool.import(config);
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
      exportButton.addEventListener('click', event => {
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
        const username = init.page.$CONFIG.nick;
        const date = new Date();
        const dateStr = date.toISOString().replace(/-|T.*/g, '');
        const filename = download.filename(`${username}-${i18n.configFilename}-${dateStr}.json`);
        download.blob({ blob, filename });
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
        wrap.innerHTML = '<a class="W_btn_b yawf-import-wbp" href="javascript:;"><span class="W_f14"></span></a>';
        const importWbpButton = wrap.querySelector('.yawf-import-wbp');
        importWbpButton.querySelector('.W_f14').textContent = i18n.configImportWbpButton;
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
        const rule = this;
        const container = document.createElement('span');
        container.className = 'yawf-config-item yawf-config-rule';
        container.innerHTML = '<a class="W_btn_b yawf-clean-v3" href="javascript:;"><span class="W_f14"></span></a>';
        const cleanButton = container.querySelector('.yawf-clean-v3');
        cleanButton.querySelector('.W_f14').textContent = i18n.configCleanV3Button;
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

  const yawf = window.yawf;
  const util = yawf.util;
  const rule = yawf.rule;
  const init = yawf.init;
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
    installSuccessText: {
      cn: '感谢您安装药方 (YAWF) 脚本。您可以点击右上角的漏斗图标打开设置。此外您还可以选中并拖拽关键词、帐号、话题、来源等内容到网页右上角，快速创建规则。',
      tw: '感謝您安裝藥方 (YAWF) 腳本。您可以點擊右上角的漏斗圖示打開設定。此外您還可以選中並拖拽關鍵字、帳號、話題、來源等內容到網頁右上角，快速創建規則。',
      en: 'Thank you for installing YAWF. You can click on the funnel icon at the top-right corner to open up filter setting menu. You may also quickly create filters by dragging and dropping keywords, accounts, topics and sources to the top-right corner.',
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
  });

  update.whatsNew = rule.Rule({
    id: 'script_update_whatsnew',
    version: 1,
    parent: update.update,
    initial: true,
    template: () => i18n.showWhatsNew,
    ref: {
      last: { type: 'number', initial: 0 },
    },
    async init() {
      const whatsNew = this;
      const currentVersion = Number(browser.runtime.getManifest().version.match(/\d+$/g));
      const lastVersion = this.ref.last.getConfig();
      const updateDone = () => { this.ref.last.setConfig(currentVersion); };
      if (!lastVersion) {
        // 初次运行，也可能是从 v3 升级上来的
        let importOldConfig = null;
        try {
          // 导入设置
          const v3Config = JSON.parse(await GM.getValue(`user${yawf.init.page.$CONFIG.uid}config`));
          const fileContent = new TextEncoder().encode(JSON.stringify({ yawf: 'Yet Another Weibo Filter', ver: '3', conf: v3Config })).buffer;
          const { config: newConfig, source } = importer.parse(fileContent);
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
            text: i18n.installSuccessText,
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
      observer.feed.onBefore(function (feed) {
        const text = feedParser.text.detail(feed);
        const json = JSON.stringify(text).replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
        console.log('%o\n%o', feed, json);
      });
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
// 这个文件用于向界面上添加漏斗图标和菜单项

; (function () {

  const yawf = window.yawf;
  const util = yawf.util;
  const init = yawf.init;
  const observer = yawf.observer;
  const pagemenu = yawf.pagemenu;

  const i18n = util.i18n;

  const rule = yawf.rule;

  i18n.filterMenuItem = {
    cn: '药方设置',
    tw: '藥方設定',
    en: 'YAWF Settings',
  };

  // 缩小搜索框宽度以留出漏斗按钮的位置
  const searchCss = `
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
`;
  // 添加漏斗图标的定义
  const iconCss = `
.gn_filter .W_ficon { font-family: "yawf-iconfont" !important; }
@font-face { font-family: "yawf-iconfont"; font-style: normal; font-weight: normal; src: url("data:image/woff;base64,d09GRk9UVE8AAAPIAAoAAAAABbQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANUAAADot8EQFkZGVE0AAAHMAAAAGgAAABxtAw0mT1MvMgAAAegAAABJAAAAYFmdYldjbWFwAAACNAAAADgAAAFCAA0DAGhlYWQAAAJsAAAAMAAAADYD5a1oaGhlYQAAApwAAAAdAAAAJAaAA4BobXR4AAACvAAAAAgAAAAICAAAd21heHAAAALEAAAABgAAAAYAAlAAbmFtZQAAAswAAADkAAAB1Hh5OPRwb3N0AAADsAAAABYAAAAg/4YAM3icVY2xagJBFADfO+9O1GNNJBcLFwWxPLUXAumvDekPQUmjTYjYCNbP0sLO+Ak2NsLWfkN+ZN/ebiTaBG6qqWYQfB8QUSyzxaT/MZ7PJvPZJ6AHCC/c8liWuOlvImxXofL1PiT6l6isa7aZt00SSFjVJcCDhPWjBCHhpwHePSGgVQgXLzdG4CF230hxqlApc1El9ZwP+HgdhMqtYk7NxaVlkVdMEn+T3bkeuY7dE3HH7rgX8PD3NT7oc6gzfXJT0pk9kT0HIt8+UbzYm4RCiqp/hZJWXgAAAHicY2BgYGQAgjO2i86D6AtJW7VhNABKVQagAAB4nGNgZmFg/MLAysDBNJPpDAMDQz+EZnzNYMzIycDAxMAGJKGAkQEJBKS5pjA4MEQyRDLr/NdhiGGawdCMUAPkKQAhIwBYTwumAAAAeJxjYGBgZoBgGQZGBhCwAfIYwXwWBgUgzQKEIH7k//8Q8v8KqEoGRjYGGJP6gGYGUxcAAJgrBwx4nGNgZGBgAOK+F//94vltvjJwszCAwIWkrdpwuvx/LXMX0wwgl4OBCSQKAFMCC7x4nGNgZGBgmvG/liGGhQEEmLsYGBlQARMAU6MDCAAAAAQAAAAEAAB3AABQAAACAAB4nJWPwWoCMRCGv+gqihV6KB7EQ85ClmTxJL12n0C8i+zKXjawCuKLeOn79EH6BH2ETnSglFJoA0m+mf+fzAR44IohLcOUhXKPEc/KfZa8KmfieVceMDEj5SFT48VpsrFk5reqxD0epfrOfTa8KGfieVMeMONDecjcPHFhx5kaR8OeSCuczhNcdufaNfvY1rGV8If+JZWaSnfHgQpLQY6Xey379yZ3PbASLYjfSZ2/xZTydBm7Q2WL3Nu1/TaOxGHlgneFD+L9+y+2MlzHUXxJT63TmGyr7tjE1obc/+O1T5RwTOJ4nGNgZgCD/80MRkCKkQENAAAoVQG5AAA=") format("woff"); }
.gn_topmenulist_yawf { top: 34px; right: -17px; width: 134px; }
`;

  const searchStyle = util.css.add(searchCss);
  const iconStyle = util.css.add(iconCss);
  init.onDeinit(() => {
    searchStyle.remove();
    iconStyle.remove();
  });

  const onClick = function (event, tab = null) {
    try {
      rule.dialog(tab);
    } catch (e) { util.debug('Error while prompting dialog: %o', e); }
    event.preventDefault();
  };

  // 给漏斗图标添加一个菜单
  const addScriptMenu = function (container) {
    const menuList = document.createElement('div');
    menuList.innerHTML = '<div class="gn_topmenulist gn_topmenulist_yawf" node-type="msgLayer" style="display: none;"><ul></ul><div class="W_layer_arrow"><span class="W_arrow_bor W_arrow_bor_t"><i class="S_line3"></i><em class="S_bg2_br"></em></span></div></div>';
    container.appendChild(menuList.firstChild);
    const dropdown = container.querySelector('.gn_topmenulist_yawf');
    const ul = dropdown.querySelector('ul');
    // 允许其他功能向菜单里面塞东西
    pagemenu.ready(ul);
    // 在鼠标移入或获得焦点时展示下拉菜单
    const addTempClassName = async function (classNames, delay) {
      await new Promise(resolve => setTimeout(resolve, 0));
      dropdown.classList.add(...classNames);
      await new Promise(resolve => setTimeout(resolve, delay));
      dropdown.classList.remove(...classNames);
    };
    let mouseInCount = 0, shown = false;
    const showDropdown = function () {
      mouseInCount++;
      if (!shown) {
        shown = true;
        dropdown.style.display = 'block';
        addTempClassName('UI_speed_fast', 'UI_ani_fadeInDown', 200);
      }
    };
    const hideDropdown = async function () {
      const lastInCount = mouseInCount;
      await new Promise(resolve => setTimeout(resolve, 200));
      if (lastInCount !== mouseInCount) return;
      if (shown) {
        shown = false;
        await addTempClassName('UI_speed_fast', 'UI_ani_fadeOutUp', 200);
        if (lastInCount !== mouseInCount) return;
        dropdown.style.display = 'none';
      }
    };
    container.addEventListener('mouseenter', showDropdown);
    container.addEventListener('mouseleave', hideDropdown);
    container.addEventListener('focusin', showDropdown);
    container.addEventListener('focusout', hideDropdown);

    // 添加菜单项，跳转到设置页面的各标签页
    rule.tabs.forEach((tab, index) => {
      if (!tab.pagemenu) return;
      pagemenu.add({
        title: tab.template,
        onClick: event => onClick(event, tab),
        order: index,
      });
    });

    // 如果点击了漏斗图标，我们会直接显示设置窗口，但如果是触摸点击的，我们先显示下拉菜单
    const onTouch = function (event) {
      if (shown) return;
      showDropdown();
      event.preventDefault();
      event.stopPropagation();
    };
    container.addEventListener('touchstart', onTouch, true);
  };
  init.onLoad(() => {
    const icon = function () {
      const reference = document.querySelector('.WB_global_nav .gn_set_list');
      if (!reference) { setTimeout(icon, 100); return; }
      const template = document.createElement('template');
      template.innerHTML = `<div class="gn_set_list yawf-gn_set_list"><a node-type="filter" href="javascript:void(0);" class="gn_filter"><em class="W_ficon ficon_mail S_ficon">Y</em></a></div>`;
      const container = document.importNode(template.content.firstElementChild, true);
      const button = container.querySelector('.gn_filter');
      button.setAttribute('title', i18n.filterMenuItem);
      button.addEventListener('click', onClick);
      reference.before(container);
      setTimeout(async () => {
        await searchStyle.ready;
        const [{ width, height }] = button.getClientRects();
        const size = width * height;
        // 如果用户选择不显示漏斗按钮，那么要恢复搜索框的宽度
        // 扩展不提供显示或不显示的选项，但是会提供自定义 CSS 功能
        if (!size) searchStyle.remove();
      }, 0);
    };
    const menuitem = function () {
      const menuitems = document.querySelectorAll('.gn_topmenulist ul li.line');
      if (!menuitems || !menuitems.length) { setTimeout(menuitem, 100); return; }
      const reference = [...menuitems].pop();
      const ul = document.createElement('ul');
      ul.innerHTML = `
<li class="line S_line1 yawf-config-menuline"></li>
<li><a href="javascript:void(0);" class="yawf-config-menuitem"></a></li>
`;
      const container = document.importNode(ul, true);
      const item = container.querySelector('.yawf-config-menuitem');
      item.addEventListener('click', onClick);
      item.textContent = i18n.filterMenuItem;
      reference.before(...container.children);

      const iconContainer = document.querySelector('.yawf-gn_set_list');
      addScriptMenu(iconContainer);
    };
    if (['search', 'ttarticle'].includes(init.page.type())) return;
    icon(); menuitem();
  });

  init.onLoad(() => {
    observer.dom.add(function fixNavBarUS() {
      // 统一海外版导航栏
      const navUs = document.querySelector('.WB_global_nav_us');
      if (navUs) navUs.classList.remove('WB_global_nav_us');
    });
  });

}());
//#endregion

