// ==UserScript==
// @name              yyawf
// @description       Under construction
// @namespace         https://github.com/tiansh
// @version           0.0.3
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

  //#region utils
  const log = function (...args) {
    if (typeof args[0] === 'string') console.log('[yyawf] ' + args[0], ...args.slice(1));
    else console.log('[yyawf]', ...args);
  };
  const kebabCase = function (word) {
    if (typeof word !== 'string') return word;
    return word.replace(/./g, (char, index) => {
      const lower = char.toLowerCase();
      if (char === lower || index === 0) return lower;
      else return '-' + lower;
    });
  };
  //#endregion

  //#region vnode 处理
  /** @param {{ withSlot: boolean }} config */
  const allDescendants = (vnode, callback, config = {}) => {
    if (Array.isArray(vnode)) {
      vnode.forEach(child => allDescendants(child, callback, config));
    } else {
      callback(vnode);
      if (Array.isArray(vnode.children)) allDescendants(vnode.children, callback, config);
      else if (config?.withSlot && vnode.children && typeof vnode.children === 'object') {
        Object.keys(vnode.children).forEach(key => {
          slotContent(vnode, key, content => allDescendants(content, callback, config));
        });
      }
    }
    return vnode;
  };
  const slotContent = (vnode, key, callback) => {
    const slot = vnode.children?.[key];
    if (typeof slot !== 'function') return;
    vnode.children[key] = function (...args) {
      const result = slot.apply(this, args);
      return callback(result);
    };
  };
  //#endregion

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

  const keywords = typeof config.keywords === 'string' ? config.keywords.split(/[,，；;、]/).map(x => x.trim()).filter(x => x) : [];
  const feedFilter = function (feed) {
    if (feed.content_auth === 5) return { action: 'hide', reason: '广告' };
    if (feed.retweeted_status?.content_auth === 5) return { action: 'hide', reason: '广告' };
    const text = feed.text_raw || feed.text;
    const keywordMatch = keywords.find(keyword => text.includes(keyword));
    if (keywordMatch) return { action: 'hide', reason: `关键词“${keywordMatch}”` };
    const re_text = feed.retweeted_status?.text_raw || feed.retweeted_status?.text;
    const reKeywordMatch = re_text && keywords.find(keyword => re_text?.includes(keyword));
    if (reKeywordMatch) return { action: 'hide', reason: `关键词“${reKeywordMatch}”` };
    return { action: 'show' };
  };
  const commentFilter = function (comment) {
    const text = comment.text_raw || comment.text;
    const keywordMatch = keywords.find(keyword => text.includes(keyword));
    if (keywordMatch) return { action: 'hide', reason: `关键词“${keywordMatch}”` };
    return { action: 'show' };
  };
  const hotSearchFilter = function (hotSearch) {
    if (hotSearch.rank == null) return { action: 'hide', reason: '广告' };
    if (hotSearch.is_ad) return { action: 'hide', reason: '广告' };
    const text = hotSearch.word;
    const keywordMatch = keywords.find(keyword => text.includes(keyword));
    if (keywordMatch) return { action: 'hide', reason: `关键词“${keywordMatch}”` };
    return { action: 'show' };
  };

  //#region 监听组件生命周期
  /** @type {Record<LifecycleName, Record<string, Function[]>>} */
  const lifecycleListeners = {};
  const addLifecycleListener = (lifecycles, componentName, listener) => {
    const item = { listener };
    lifecycles.match(/\S+/g).forEach(lifecycle => {
      lifecycleListeners[lifecycle] ??= {};
      lifecycleListeners[lifecycle][componentName] ??= [];
      lifecycleListeners[lifecycle][componentName].push(item);
    });
    return () => {
      lifecycles.match(/\S+/g).forEach(lifecycle => {
        const index = lifecycleListeners[lifecycle][componentName].indexOf(item);
        if (index !== -1) lifecycleListeners[lifecycle][componentName].splice(index, 1);
      });
    };
  };
  const runLifecycleListeners = (lifecycle, instance) => {
    if (!instance?.render) return;
    const name = kebabCase(instance.type.name || instance.type.__name || instance.type.__refName);
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
      updated() {
        runLifecycleListeners('updated', this?._);
      }
    });
  });
  //#endregion

  //#region DEBUG
  addLifecycleListener('mounted updated', '*', instance => {
    const el = instance.vnode.el;
    el.__vue__ = new WeakRef(instance);
  });
  //#endregion

  //#region 渲染增加组件名称
  const properName = result => {
    if (!result) return 'unnamed-component';
    const name = kebabCase(result.type?.name || result.type?.__name || result.type?.__refName);
    if (name) return name + '--child';
    return properName(result.parent);
  };
  const trimClassName = klass => klass.replace(/_[a-z\d]+_\d+$/, '');
  const tagRenderResult = prefix => vnode => {
    if (typeof vnode !== 'object' || !vnode) return vnode;
    if (Array.isArray(vnode)) return vnode.map(child => tagRenderResult(prefix)(child));
    // 更新 ClassName
    if (typeof vnode.props?.class === 'string') {
      const classList = vnode.props.class.split(' ').flatMap(klass => {
        if (!klass || klass.includes('__yawf_')) return [];
        if (!/_[a-z\d]+_\d+$/.test(klass)) return [klass];
        return [klass, '__yawf_' + prefix + '_' + trimClassName(klass)];
      }).filter(x => x);
      vnode.props.class = classList.join(' ');
    }
    // 标记事件处理
    if (vnode.props && typeof vnode.props === 'object') {
      Object.keys(vnode.props).forEach(eventName => {
        if (!eventName.startsWith('on') || eventName.startsWith('onUpdate')) return;
        const handler = vnode.props[eventName];
        const name = (typeof handler === 'function' ? [handler.name ?? 'function'] :
          Array.isArray(handler) ? handler.flatMap(item => typeof item === 'function' ? [(item.name ?? 'function')] : []) : []
        ).map(item => item.replace(/.*\s/, '')).join(' ');
        const key = kebabCase(eventName);
        vnode.props ??= {};
        vnode.props['__yawf_event_' + key.replace(/-/g, '_') + '__'] = name;
      });
    }
    // 递归内部元素
    if (vnode.children && Array.isArray(vnode.children)) {
      vnode.children.forEach(child => {
        tagRenderResult(prefix)(child);
      });
    } else if (vnode.children && typeof vnode.children === 'object') {
      Object.keys(vnode.children).forEach(key => {
        const value = vnode.children[key];
        if (typeof value === 'function') {
          vnode.children[key] = function (...args) {
            return tagRenderResult(prefix)(value.apply(this, args));
          };
          vnode.children[key].raw = value;
        }
      });
    }
    return vnode;
  };
  addLifecycleListener('beforeCreate', '*', instance => {
    if (instance.type.components && typeof instance.type.components === 'object') {
      Object.keys(instance.type.components).forEach(key => {
        const value = instance.type.components[key];
        value.__refName = key;
      });
    }
    const name = kebabCase(instance.type.name || instance.type.__name || instance.type.__refName);
    const displayName = name || kebabCase(properName(instance));
    wrapRender(instance, function (render) {
      return function (...args) {
        const result = render.apply(this, args);
        tagRenderResult(displayName)(result);
        // 增加 Component Name
        if (typeof result.type === 'string') instance.__renderTag = result.type;
        else instance.__renderTag = null;
        result.props ??= {};
        for (let ins = instance, lv = 0; ins && (!lv || typeof ins.__renderTag !== 'string'); ins = ins.parent, ++lv) {
          const name = kebabCase(ins.type.name || ins.type.__name || ins.type.__refName || properName(ins));
          result.props['__yawf_component_' + name + '__'] = ins.uid;
          const key = ins.vnode.key;
          if (typeof key === 'string' || typeof key === 'number' || typeof key === 'symbol') {
            result.props['__yawf_key_' + (lv || '') + '__'] = String(key);
          }
          if (ins !== ins.parent?.children?.[0]) break;
        }
        if (result.key && (typeof result.key === 'string' || typeof result.key === 'number' || typeof result.key === 'symbol')) {
          result.props['__yawf_key__'] = String(result.key);
        }
        return result;
      };
    });
  });
  // 微博的操作按钮
  addLifecycleListener('mounted updated', 'feed-toolbar', instance => {
    const el = instance.vnode.el;
    [...el?.querySelectorAll?.('.__yawf_feed-toolbar__item')].forEach(item => {
      if (item.querySelector('[__yawf_component_woo-like__]')) item.setAttribute('__yawf_feed_toolbar__', 'like');
      else {
        const i = item.querySelector('i[class*="woo-font--"]');
        if (i) item.setAttribute('__yawf_feed_toolbar__', i.className.split(' ').find(i => i.includes('woo-font--')).split('--')[1]);
      }
    });
    const container = el.querySelector('.woo-box-flex').children;
    if (container[1]) container[1].setAttribute('__yawf_feed_toobar__extra__');
  });
  addLifecycleListener('mounted updated', 'icon-list', instance => {
    // 名字旁边的 Vip 等图标
    if (instance.type?.props?.icons) {
      const icons = instance.props.icons;
      const el = instance.vnode.el;
      if (Array.isArray(icons) && icons.length) {
        const children = el.children;
        icons.forEach((icon, index) => {
          children?.[index]?.setAttribute('__yawf_icon_list_item__', icon.type);
        })
      }
    }
    // 评论的操作按钮
    if (instance.type?.props?.iconsName) {
      const icons = instance.props.iconsName;
      const el = instance.vnode.el;
      if (Array.isArray(icons) && icons.length) {
        const children = el.children;
        icons.forEach((icon, index) => {
          children?.[index]?.setAttribute('__yawf_comment_toolbar_item__', icon.name);
        });
      }
    }
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
        const bandList = instance.data.bandList;
        const status = bandList.map(item => hotSearchFilter(item));
        if (status.some(item => item.action === 'hide')) {
          status.forEach((item, index) => { if (item.action === 'hide') log(`热搜过滤（${item.reason}）`, bandList[index]); });
          bandList.splice(0, bandList.length, ...bandList.filter((item, index) => status[index].action !== 'hide'));
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
            log('清理：广告：消息流头图');
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
          if (status.some(item => item.action === 'hide')) {
            status.forEach((item, index) => {
              if (item.action === 'hide') log(`微博过滤（${item.reason}）`, feedList[index]);
            });
            const filtered = feedList.filter((item, index) => status[index].action !== 'hide');
            feedList.splice(0, feedList.length, ...filtered);
          }
        }
        const result = render.apply(this, args);
        return result;
      };
    });
  });
  //#endregion

  //#region 评论
  addLifecycleListener('beforeCreate', 'comment', instance => {
    wrapRender(instance, function (render) {
      return function (...args) {
        const mainFilter = commentFilter(instance.data.commentData);
        if (instance.data.commentData && mainFilter.action === 'hide') {
          log(`评论过滤（${mainFilter.reason}）`, instance.data.commentData);
          return null;
        }
        const comments = instance.data.commentData.comments;
        const status = comments.map(item => commentFilter(item));
        if (status.some(item => item.action === 'hide')) {
          status.forEach((item, index) => {
            if (item.action === 'hide') log(`评论过滤（${item.reason}）`, comments[index]);
          });
          const filtered = comments.filter((item, index) => status[index].action !== 'hide');
          comments.splice(0, comments.length, ...filtered);
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
        if (instance.data.TopWords?.length) {
          log('清理：热搜：置顶热搜', instance.data.TopWords);
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
  const keywords = prompt('现在 yyawf 尚处于原型验证阶段，所以还没有正经的设置窗口。你可以在下面逗号分隔的输入一些关键词，他们将会被用于过滤微博、评论和热搜话题。设置后刷新才会生效。这里的设置在后续版本中不会被保留。', config['keywords'] || '');
  if (keywords != null) config['keywords'] = keywords;
  GM_setValue('CONFIG_TEMP1', JSON.stringify(config));
};

unsafeWindow.eval(payload);