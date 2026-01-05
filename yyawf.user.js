// ==UserScript==
// @name              yyawf
// @description       Under construction
// @namespace         https://github.com/tiansh
// @version           0.0.1
// @match             *://*.weibo.com/*
// @noframes
// @run-at            document-start
// @nocompat
// @connect           miaopai.com
// @connect           sina.cn
// @connect           sina.com.cn
// @connect           sinaimg.cn
// @connect           sinajs.cn
// @connect           t.cn
// @connect           weibo.com
// @author            田生 http://weibo.com/tsh90
// @license           MPL-2.0
// ==/UserScript==

/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

(window.wrappedJSObject ?? window).eval('void(' + function () {

/** @type {Promise<App>} */
const appReady = new Promise(resolve => {
  const prevDesc = Object.getOwnPropertyDescriptor(Object.prototype, '$cookies');
  const isVueApp = obj => obj?._uid === 0;
  Object.defineProperty(Object.prototype, '$cookies', {
    set(value) {
      if (isVueApp(this)) resolve(this);
      if (prevDesc && typeof prevDesc.set === 'function') return prevDesc.set.call(this, value);
      Object.defineProperty(this, '$cookies', {
        value,
        writable: true,
        configurable: true,
        enumerable: true,
      });
    },
    configurable: true,
    enumerable: false,
  });
});

const kebabCase = function (word) {
  if (typeof word !== 'string') return word;
  return word.replace(/./g, (char, index) => {
    const lower = char.toLowerCase();
    if (char === lower || index === 0) return lower;
    else return '-' + lower;
  });
};


const feedFilter = function (feed) {
  if (feed.content_auth === 5) return 'hide';
  if (feed.retweeted_status?.content_auth === 5) return 'hide';
  return 'show';
};

appReady.then(app => {
  console.log('app = ', app);
  app.mixin({
    beforeUpdate() {
      const instance = this?._;
      if (!instance?.render) return;
      const componentName = kebabCase(instance.type?.name ?? instance.type?.__name);
      if (componentName === 'feed-scroll') {
        const feedList = instance.props.data;
        for (let i = 0; i < feedList.length; ) {
          let feed = feedList[i];
          if (feedFilter(feed) === 'hide') {
            feedList.splice(i, 1)
            console.log('Feed removed', feed);
          } else {
            i++;
          }
        }
      }
    }
  });
});

} + '())');
