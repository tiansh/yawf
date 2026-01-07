// ==UserScript==
// @name              yyawf
// @description       Under construction
// @namespace         https://github.com/tiansh
// @version           0.0.2
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
// @grant             unsafeWindow
// @grant             GM_getValue
// @grant             GM_setValue
// ==/UserScript==

/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* eslint-env browser, greasemonkey */

const key = 'yawf-' + Array(64).fill(0).map(() => (Math.random() * 16).toString(16)[0]).join('');
const payload = ('void(' + function (config, key) {

  const log = function (...args) {
    if (typeof args[0] === 'string') console.log('[yyawf] ' + args[0], ...args.slice(1));
    else console.log('[yyawf]', ...args);
  };

  //#region 初始化
  /** @type {Promise<App>} */
  const appReady = new Promise(resolve => {
    const prevDesc = Object.getOwnPropertyDescriptor(Object.prototype, '$cookies');
    const isVueApp = obj => obj?._uid === 0;
    Object.defineProperty(Object.prototype, '$cookies', {
      set(value) {
        if (isVueApp(this)) {
          resolve(this);
          delete Object.prototype.$cookies;
          if (prevDesc && typeof prevDesc.set === 'function') {
            Object.defineProperty(Object.prototype, '$cookies', prevDesc);
          }
        } else if (prevDesc && typeof prevDesc.set === 'function') {
          prevDesc.set.call(this, value);
        } else {
          Object.defineProperty(this, '$cookies', { value, writable: true, configurable: true, enumerable: true });
        }
      },
      configurable: true,
      enumerable: false,
    });
  });
  //#endregion

  const kebabCase = function (word) {
    if (typeof word !== 'string') return word;
    return word.replace(/./g, (char, index) => {
      const lower = char.toLowerCase();
      if (char === lower || index === 0) return lower;
      else return '-' + lower;
    });
  };

  const keywords = typeof config.keywords === 'string' ? config.keywords.split(/[,，；;、]/).map(x => x.trim()).filter(x => x) : [];
  log('keywords', keywords);

  const feedFilter = function (feed) {
    if (feed.content_auth === 5) return 'hide';
    if (feed.retweeted_status?.content_auth === 5) return 'hide';
    const text = feed.text_raw || feed.text;
    if (keywords.some(keyword => text.includes(keyword))) return 'hide';
    const re_text = feed.retweeted_status?.text_raw || feed.retweeted_status?.text;
    if (re_text && keywords.some(keyword => re_text.includes(keyword))) return 'hide';
    return 'show';
  };

  const hotSearchFilter = function (hotSearch) {
    if (hotSearch.rank == null) return 'hide';
    if (hotSearch.is_ad) return 'hide';
    const text = hotSearch.word;
    if (keywords.some(keyword => text.includes(keyword))) return 'hide';
    return 'show';
  };

  //#region 监听组件生命周期
  /** @type {Record<LifecycleName, Record<string, Function[]>>} */
  const lifecycleListeners = {};
  const addLifecycleListener = (lifecycle, componentName, listener) => {
    const item = { listener };
    lifecycleListeners[lifecycle] ??= {};
    lifecycleListeners[lifecycle][componentName] ??= [];
    lifecycleListeners[lifecycle][componentName].push(item);
    return () => {
      const index = lifecycleListeners[lifecycle][componentName].indexOf(item);
      if (index !== -1) lifecycleListeners[lifecycle][componentName].splice(index, 1);
    };
  };
  const runLifecycleListeners = (lifecycle, instance) => {
    if (!instance?.render) return;
    const name = kebabCase(instance.type.name || instance.type.__name);
    const listenersForAny = lifecycleListeners[lifecycle]?.['*'] ?? [];
    const listenersForComponent = lifecycleListeners[lifecycle]?.[name] ?? [];
    const listeners = [...listenersForAny, ...listenersForComponent];
    listeners.forEach(item => {
      try { item.listener(instance); } catch (E) { console.error(E); }
    });
  };
  const wrapRender = (instance, wrapper) => {
    if (!instance?.render) return;
    const render = wrapper(instance.render);
    render.raw = instance.render;
    instance.render = render;
    return render;
  };

  appReady.then(app => {
    app.mixin({
      beforeCreate() {
        runLifecycleListeners('beforeCreate', this?._);
      },
      created() {
        runLifecycleListeners('created', this?._);
      },
      mounted() {
        runLifecycleListeners('mounted', this?._);
      },
      beforeUpdate() {
        runLifecycleListeners('beforeUpdate', this?._);
      },
    });
  });
  //#endregion

  //#region 渲染增加组件名称
  const trimClassName = klass => klass.replace(/_[a-z\d]+_\d+$/, '');
  const normalizeClassName = prefix => vnode => {
    if (typeof vnode !== 'object' || !vnode) return vnode;
    if (typeof vnode.props?.class === 'string') {
      const classList = vnode.props.class.split(' ').map(klass => {
        if (klass.includes('__yawf_')) return '';
        return klass + ' ' + '__yawf_' + prefix + '_' + trimClassName(klass);
      }).filter(x => x);
      vnode.props.class = classList.join(' ');
    }
    if (vnode.children && Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        normalizeClassName(prefix)(child);
      });
    }
    return vnode;
  };
  addLifecycleListener('beforeCreate', '*', instance => {
    const name = kebabCase(instance.type.name || instance.type.__name);
    if (name) wrapRender(instance, function (render) {
      return function (...args) {
        const result = render.apply(this, args);
        normalizeClassName(name)(result);
        return result;
      };
    });
  });
  //#endregion

  //#region 设置入口
  addLifecycleListener('created', 'weibo-top-nav', instance => {
    instance.setupState?.configs.splice(-1, 0, {
      divider: true,
      href: '',
      name: '药方设置',
      type: 'yawf-config',
    });
    instance.ctx.configHandle = (function (_configHandle) {
      return function (...args) {
        const [index] = args;
        const type = instance.setupState.configs[index].type;
        if (type === 'yawf-config') {
          const event = new CustomEvent(key, { detail: { method: 'config' } });
          document.dispatchEvent(event);
        } else _configHandle.apply(this, args);
      };
    }(instance.ctx.configHandle)).bind(null);
  });
  //#endregion

  //#region 广告
  addLifecycleListener('created', 'card-hot-search', instance => {
    wrapRender(instance, function (render) {
      return function (...args) {
        log('card-hot-search bandList', instance.data.bandList);
        const bandList = instance.data.bandList;
        const status = bandList.map(item => hotSearchFilter(item));
        if (status.some(item => item === 'hide')) {
          log('Hot Search List Cleaned');
          bandList.splice(0, bandList.length, ...bandList.filter((item, index) => status[index] !== 'hide'));
        }
        const result = render.apply(this, args);
        return result;
      };
    });
  });
  addLifecycleListener('beforeCreate', '*', instance => {
    const props = instance?.type?.props;
    if (props?.adHeight && props?.adBackground) {
      wrapRender(instance, function (render) {
        return function (...args) {
          if (instance.setupState.show) {
            instance.setupState.show = false;
            log('Ad Image Removed');
          }
          const result = render.apply(this, args);
          return result;
        };
      });
    }
  });
  //#endregion

  //#region 消息流
  addLifecycleListener('beforeCreate', 'feed-scroll', instance => {
    wrapRender(instance, function (render) {
      return function (...args) {
        const feedList = instance.props.data;
        if (Array.isArray(feedList)) {
          const status = feedList.map(item => feedFilter(item));
          if (status.some(item => item === 'hide')) {
            log('Feed List Cleaned');
            status.forEach((item, index) => {
              if (item === 'hide') log('Feed Removed', feedList[index]);
            });
            const filtered = feedList.filter((item, index) => status[index] !== 'hide');
            feedList.splice(0, feedList.length, ...filtered);
          }
        }
        const result = render.apply(this, args);
        return result;
      };
    });
  });
  //#endregion

  //#region 热搜固顶
  addLifecycleListener('created', 'card-hot-search', instance => {
    wrapRender(instance, function (render) {
      return function (...args) {
        log('card-hot-search TopWords', instance.data.TopWords);
        if (instance.data.TopWords?.length) {
          log('Top Hot Search Removed');
          instance.data.TopWords = [];
        }
        const result = render.apply(this, args);
        return result;
      };
    });
  });
  //#endregion

} + '(' + [(function () {
  try {
    const config = JSON.parse(GM_getValue('CONFIG_TEMP1'));
    if (typeof config === 'object') return config || {};
    return {};
  } catch { return {}; }
}()), key].map(x => JSON.stringify(x)) + '))');

const handlers = {};
document.addEventListener(key, event => {
  const { method } = event.detail;
  handlers[method]?.(event.detail.data);
});

handlers.config = () => {
  let config = {};
  try { config = JSON.parse(GM_getValue('CONFIG_TEMP1')); }
  catch { config = {}; }
  const keywords = prompt('现在 yyawf 尚处于原型验证阶段，所以还没有正经的设置窗口。你可以在下面逗号分隔的输入一些关键词，他们将会被用于过滤微博和热搜话题。设置后刷新才会生效。这里的设置在后续版本中不会被保留。', config['keywords']);
  config['keywords'] = keywords;
  GM_setValue('CONFIG_TEMP1', JSON.stringify(config));
};

unsafeWindow.eval(payload);