// ==UserScript==
// @name              yyawf
// @description       Under construction
// @namespace         https://github.com/tiansh
// @version           0.0.11
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
// @grant             GM_addValueChangeListener
// @grant             GM_removeValueChangeListener
// ==/UserScript==

/*!
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

/* eslint-env browser, greasemonkey */

const configKey = 'CONFIG', messageKey = 'yawf-' + Array(64).fill(0).map(() => (Math.random() * 16).toString(16)[0]).join('');
//#region PAGE SCRIPT
const payload = (Array(35).fill('\n').join('') + 'void(' + function (config, messageKey) {

  const $CONFIG = {}, yawfConfig = {};
  let isDebug = null;
  if (typeof window.$CONFIG !== 'undefined') {
    alert('脚本需要在页面打开前加载才能正常工作。当前注入加载时间过晚，请检查你是用的猴子版本是否受到支持。');
  }

  //#region utils
  const log = function (...args) {
    if (!isDebug) return;
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
  const wrapFunction = function (original, wrapped) {
    original.__raw__ = original;
    return new Proxy(original, {
      apply(_, thisArg, argumentsList) {
        return wrapped.apply(thisArg, argumentsList);
      },
    });
  };
  let $style = null;
  const addStyle = css => {
    if (!$style) {
      $style = document.body.appendChild(document.createElement('style'));
      $style.id = 'yawf_page_style';
    }
    $style.textContent += css + '\n';
  };
  const invokeContentScript = function (method, data) {
    const event = new CustomEvent(messageKey + 'CONTENT', { detail: { method, data } });
    document.dispatchEvent(event);
  };
  const handlers = {}, handle = (key, method) => handlers[key] = method;
  document.addEventListener(messageKey + 'PAGE', event => {
    const { method, data } = event.detail;
    handlers[method]?.(data);
  });
  const dialog = config => {
    appReady.then(app => {
      const dialog = app.config.globalProperties.$_w_dialog;
      return new Promise(resolve => {
        dialog({
          ...config,
          action: () => resolve(true),
          cancel: () => resolve(false),
        });
      });
    });
  };
  handle('dialog', async ({ id, config }) => {
    invokeContentScript('dialogDone', { id, response: await dialog(config) });
  });
  //#endregion

  //#region 网络请求
  const xhr = {};
  handle('xhr', async ({ id, name, config }) => {
    invokeContentScript('xhrDone', { id, response: await xhr[name](config) });
  });
  /** @typedef {{ idstr: string; screen_name: string; avatar: string; }} UserInfo */
  const fetchUserInfo = (function () {
    const byId = new Map();
    const byName = new Map();

    let throttle = Promise.resolve();
    const raw = async function (param) {
      const url = new URL('/ajax/user/popcard/get', location.href);
      if (param.idstr) url.searchParams.set('id', param.idstr);
      else if (param.screen_name) url.searchParams.set('screen_name', param.screen_name);
      try {
        const resp = await fetch(url);
        if (resp.status !== 200) return null;
        const json = await resp.json();
        if (json && json.ok === 1 && json.data != null) {
          const data = json.data;
          if (data.idstr && data.screen_name) return data;
        }
        return null;
      } catch (e) {
        return null;
      }
    };

    const returnFromCache = function (param) {
      const { idstr, screen_name } = param;
      if (idstr && byId.has(idstr)) return byId.get(idstr);
      if (screen_name && byName.has(screen_name)) return byName.get(screen_name);
      return null;
    };
    const updateCacheItem = function (cache, key, data) {
      if (typeof cache.get(key)?.then === 'function') {
        if (cache.get(key) !== data) cache.get(key).resolver(data);
      } else if (data) cache.set(key, data);
      else cache.delete(key);
    };
    const updateCache = function (param, data) {
      if (param.idstr) updateCacheItem(byId, param.idstr, data);
      if (param.screen_name) updateCacheItem(byName, param.screen_name, data);
      if (data && typeof data.then !== 'function') {
        if (data.idstr) updateCacheItem(byId, data.idstr, data);
        if (data.screen_name) updateCacheItem(byName, data.screen_name, data);
      }
    };
    const writeCache = function (user) {
      updateCache({}, user);
    };

    const throttled = async function (param, config) {
      let cached = returnFromCache(param);
      if (cached) return cached;

      const promise = (function () {
        let r, p = new Promise(res => (r = res));
        p.resolver = r;
        return p;
      }());
      updateCache(param, promise);
      if (!config?.immediate) {
        const wait = throttle;
        throttle = throttle.then(() => promise.then(() => new Promise(res => setTimeout(res, 100))));
        await wait;
      }
      const cacheAfterWait = returnFromCache(param);
      if (cacheAfterWait !== promise) return cacheAfterWait;
      const data = await raw(param);
      updateCache(param, data);

      return promise;
    };

    const wrapped = async function (param, config) {
      const data = await throttled(param, config);
      return JSON.parse(JSON.stringify(data ?? null));
    };

    return {
      id: /** @type (id: string, config?: { immediate?: boolean }) => Promise<UserInfo | null> */ (id, config) => wrapped({ idstr: String(id) }, config),
      name: /** @type (name: string, config?: { immediate?: boolean }) => Promise<UserInfo | null> */ (name, config) => wrapped({ screen_name: String(name) }, config),
      writeCache,
    };
  }());
  xhr.userInfoById = fetchUserInfo.id;
  xhr.userInfoByName = fetchUserInfo.name;
  const writeUserCache = fetchUserInfo.writeCache;
  xhr.searchUsers = async function (keyword) {
    if (!keyword) return [];
    const url = new URL('/ajax/setting/searchUsers', location.href);
    url.searchParams.set('q', keyword);
    try {
      const resp = await fetch(url);
      if (resp.status !== 200) return [];
      const json = await resp.json();
      if (json && json.ok === 1 && Array.isArray(json.users)) {
        json.users.forEach(user => writeUserCache({ idstr: user.idstr, screen_name: user.screen_name, avatar: user.profile_image_url }));
        return json.users;
      }
      return [];
    } catch {
      return [];
    }
  };
  //#endregion

  //#region 配置
  const getConfigBoolean = key => yawfConfig[key] === true;
  const getConfigStrings = key => Array.isArray(yawfConfig[key]) ? yawfConfig[key].filter(x => typeof x === 'string') : [];
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

  //#region 过滤逻辑
  const shouldFilterFeedList = instance => {
    // 不过滤编辑历史弹框
    const getAncestor = ins => ins.parent ? [ins.parent, ...getAncestor(ins.parent)] : [];
    const ancestor = getAncestor(instance);
    if (ancestor.some(ins => kebabCase(ins.type?.name) === 'edit-history')) return false;
    return true;
  };
  const shouldFilterRCList = instance => {
    // 不过滤“@我的”页面
    const $route = instance.appContext.config.globalProperties.$route;
    if ($route.name === 'atWeibo') return false;
    return true;
  };

  const filterConfig = () => {
    return {
      keywords: getConfigStrings('filter::keywords'),
      authors: getConfigStrings('filter::authors'),
      removeAd: getConfigBoolean('cleanup::ad'),
    };
  };
  const feedFilter = function (feed, context) {
    const { keywords, authors, removeAd } = filterConfig();
    // 广告
    if (removeAd && feed.content_auth === 5) return { action: 'hide', reason: '广告' };
    // 按关键词
    const texts = [], collectText = feed => {
      texts.push(feed.text_raw || feed.text);
      if (feed.title_source?.name) texts.push(feed.title_source.name);
      if (feed.title?.text) texts.push(feed.title.text);
      if (feed.source) texts.push(feed.source);
    };
    collectText(feed);
    const text = texts.join('\n');
    log(feed, text);
    const keywordMatch = keywords.find(keyword => text.includes(keyword));
    if (keywordMatch) return { action: 'hide', reason: `关键词“${keywordMatch}”` };
    // 按用户
    const users = [], collectUser = feed => {
      users.push(feed.user?.idstr);
      if (Array.isArray(feed.cooperate_info?.cooperate_user_list)) feed.cooperate_info.cooperate_user_list.forEach(item => item?.idstr && users.push(item.idstr));
    };
    collectUser(feed);
    log(feed, users);
    const authorMatch = authors.find(author => author !== context?.profile && users.includes(author));
    if (authorMatch) return { action: 'hide', reason: `用户“${authorMatch}”` };
    if (feed.retweeted_status) return feedFilter(feed.retweeted_status, context);
    return { action: 'show' };
  };
  const commentFilter = function (comment, context) {
    const { keywords, authors, removeAd } = filterConfig();
    const text = comment.text_raw || comment.text;
    const keywordMatch = keywords.find(keyword => text.includes(keyword));
    if (keywordMatch) return { action: 'hide', reason: `关键词“${keywordMatch}”` };
    const user = comment.user?.idstr;
    const authorMatch = authors.find(author => author !== context?.profile && user === author);
    if (authorMatch) return { action: 'hide', reason: `用户“${authorMatch}”` };
    return { action: 'show' };
  };
  const hotSearchFilter = function (hotSearch) {
    const { keywords, removeAd } = filterConfig();
    if (removeAd && hotSearch.rank == null) return { action: 'hide', reason: '广告' };
    if (removeAd && hotSearch.is_ad) return { action: 'hide', reason: '广告' };
    const text = hotSearch.word;
    const keywordMatch = keywords.find(keyword => text.includes(keyword));
    if (keywordMatch) return { action: 'hide', reason: `关键词“${keywordMatch}”` };
    return { action: 'show' };
  };
  //#endregion

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
  const wrapRenderContext = wrapper => {
    const wrapping = new WeakMap(), wrapped = new WeakSet();
    return instance => {
      if (wrapped.has(instance.render)) {
        return wrapping.get(instance.render);
      } else if (wrapping.has(instance.render)) {
        return (instance.render = wrapping.get(instance.render));
      }
      const wrappedRender = wrapper(instance);
      wrapping.set(instance.render, (instance.render = wrapFunction(instance.render, wrappedRender)));
      return wrappedRender;
    };
  };

  appReady.then(() => {
    invokeContentScript('ready');
  });

  appReady.then(app => {
    Object.assign($CONFIG, window.$CONFIG);
    Object.assign(yawfConfig, config[$CONFIG.user.idstr]);
    isDebug = yawfConfig['about::debug'];
  });

  //#region 首页路由修正
  appReady.then(app => {
    const router = app.config.globalProperties.$router;
    if (!router) return;
    const uid = $CONFIG.user.idstr;
    const gid = '11000' + uid;
    const targetPath = '/mygroups?gid=' + gid;

    const isHomeRoute = route => {
      if (!route) return false;
      if (route.name === 'home') return true;
      const path = route.path || route.fullPath || '';
      return path === '/' || path === '/home' || path.startsWith('/home?') || path.startsWith('/home/');
    };

    if (typeof router.__yawf_fix_home_guard__ === 'function') {
      router.__yawf_fix_home_guard__();
    }
    router.__yawf_fix_home_guard__ = router.beforeEach(to => {
      if (!getConfigBoolean('home::newest')) return;
      if (isHomeRoute(to)) return targetPath;
    });

    const currentRoute = router.currentRoute.value;
    if (getConfigBoolean('home::newest') && isHomeRoute(currentRoute)) {
      router.replace(targetPath).catch(() => {});
    }

    const isEnabled = () => getConfigBoolean('home::newest');

    // 站内有一条“回首页”的事件链路：点击左上角微博图标/首页入口 -> $Bus.$emit('reload','home')
    // 但在“最新微博”页这会打 /ajax/feed/unreadfriendstimeline?list_id=10001...，把信息流刷成非时间序。
    // 这里拦截点击，并改为复用站内正常的“切到最新微博”导航链路（handleHomeNav）。
    if (typeof router.__yawf_fix_home_click_guard__ === 'function') {
      router.__yawf_fix_home_click_guard__();
    }
    const isAtTarget = () => {
      try {
        const url = new URL(location.href);
        return url.pathname === '/mygroups' && url.searchParams.get('gid') === String(gid);
      } catch {
        return false;
      }
    };

    const findGroupInAllGroups = (groups, wantGid) => {
      // allGroups response shape: { groups: [ { group: [ ... ] }, ... ] }
      const root = Array.isArray(groups) ? groups : [];
      for (const item of root) {
        const list = Array.isArray(item?.group) ? item.group : null;
        if (!list) continue;
        const index = list.findIndex(g => String(g?.gid ?? '') === String(wantGid));
        if (index !== -1) return { group: list[index], index };
      }
      return null;
    };
    const buildNewestPayload = g => {
      // allGroups payload may omit fields that web-weibo expects when navigating.
      const apipath = String(g?.apipath ?? '');
      const api = typeof g?.api === 'string' && g.api ? g.api :
        apipath === 'statuses/friends/timeline' ? '/ajax/feed/friendstimeline' : null;
      return {
        ...g,
        api: api ?? g?.api,
        name: g?.name ?? g?.title ?? '最新微博',
        title: g?.title ?? g?.name ?? '最新微博',
        loadEmptyPic: g?.loadEmptyPic ?? false,
        yawf_Trigger: true,
      };
    };

    let newestGroupPromise = null;
    const getNewestGroup = async () => {
      if (newestGroupPromise) return newestGroupPromise;
      newestGroupPromise = fetch('/ajax/feed/allGroups', { credentials: 'include' })
        .then(r => r.json())
        .then(({ groups } = {}) => findGroupInAllGroups(groups, gid))
        .catch(() => {
          newestGroupPromise = null;
          return null;
        });
      return newestGroupPromise;
    };
    const routeToNewest = async ({ force = false } = {}) => {
      if (!force && isAtTarget()) return;
      router.replace(targetPath).catch(() => {});
      const bus = app.config.globalProperties.$Bus;
      if (bus && typeof bus.$emit === 'function') {
        const groupInfo = await getNewestGroup();
        if (groupInfo?.group) {
          bus.$emit('handleHomeNav', buildNewestPayload(groupInfo.group), groupInfo.index, 'left');
          return;
        }
        // fallback: 拿不到完整 group 配置时，尽力触发一次导航（不保证所有站内逻辑都能跟上）
        bus.$emit('handleHomeNav', { gid, title: '最新微博', yawf_Trigger: true }, 1, 'left');
        return;
      }
    };
    const normalizeText = s => String(s ?? '').replace(/[\u200b\r\n]+/g, '').trim();
    const isHomeEntryAnchor = a => {
      if (!a) return false;
      const text = normalizeText(a.textContent);
      const href = a.getAttribute?.('href');
      // Left sidebar "全部关注" link (href="/") routes to home.
      if (text === '全部关注' && href === '/') return true;

      // Top nav logo / home tabs.
      if (!a.closest?.('[__yawf_component_weibo-top-nav-base__]')) return false;
      if (a.matches?.('a.__yawf_weibo-top-nav-base_logoWrap')) return true;
      if (text.startsWith('首页')) return true;
      return href === '/';
    };
    const clickGuard = e => {
      if (!isEnabled()) return;
      if (e.defaultPrevented) return;
      if ('button' in e && e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const a = e.target?.closest?.('a');
      if (!isHomeEntryAnchor(a)) return;

      e.preventDefault();
      e.stopImmediatePropagation();
      e.stopPropagation();

      routeToNewest({ force: true }).catch(() => {});
    };
    document.addEventListener('click', clickGuard, true);
    router.__yawf_fix_home_click_guard__ = () => {
      document.removeEventListener('click', clickGuard, true);
    };

    // $router 的改动不一定会驱动首页内容切换（站内很多是通过 $Bus 驱动的）。
    // 为避免侵入式 override $emit，这里采用类似旧版 YAWF 的方式：监听关键事件并补发导航事件。
    const bus = app.config.globalProperties.$Bus;
    if (bus) {
      const on = typeof bus.$on === 'function' ? bus.$on : (typeof bus.on === 'function' ? bus.on : null);
      if (on) {
        // 某些入口会通过事件总线“回首页”，但路由不变；这里兜底把它们导向“最新微博”。
        on.call(bus, 'reload', function (...args) {
          if (!isEnabled()) return;
          if (args[0] !== 'home') return;
          if (isAtTarget()) return;
          routeToNewest().catch(() => {});
        });

        on.call(bus, 'handleHomeNav', function (data) {
          if (!isEnabled()) return;
          if (data?.yawf_Trigger) return;
          const dataGid = String(data?.gid ?? '');
          if (dataGid.startsWith('10001')) {
            if (isAtTarget()) return;
            routeToNewest().catch(() => {});
          }
        });
      }
    }
  });
  //#endregion

  appReady.then(app => {
    log('Vue 加载完成');
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
    if (!isDebug) return;
    const el = instance.vnode.el;
    el.__vue__ = instance;
  });
  //#endregion

  //#region 渲染增加组件名称
  const styleMapping = new Map();
  const updateStyleMapping = type => {
    const $style = type?.__cssModules?.$style;
    if (!$style) return;
    const prefix = kebabCase(type.name || type.__name || type.__refName);
    Object.keys($style).forEach(key => {
      styleMapping.set($style[key], '__yawf_' + prefix + '_' + key);
    });
  };
  const renderWithExtraInfo = wrapRenderContext(function (instance) {
    const properName = result => {
      if (!result) return 'unnamed-component';
      const name = kebabCase(result.type?.name || result.type?.__name || result.type?.__refName);
      if (name) return name + '--child';
      return properName(result.parent);
    };
    const render = instance.render;
    const childrenSlots = new WeakMap();
    const tagRenderResult = vnode => {
      if (typeof vnode !== 'object' || !vnode) return vnode;
      if (Array.isArray(vnode)) return vnode.map(child => tagRenderResult(child));
      // 更新 ClassName
      if (typeof vnode.props?.class === 'string') {
        const classList = vnode.props.class.split(' ').flatMap(klass => {
          if (!klass || klass.includes('__yawf_')) return [];
          const mapped = styleMapping.get(klass);
          if (mapped) return [klass, mapped];
          return [klass];
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
          tagRenderResult(child);
        });
      } else if (vnode.children && typeof vnode.children === 'object') {
        Object.keys(vnode.children).forEach(key => {
          const value = vnode.children[key];
          if (typeof value !== 'function') return;
          if (childrenSlots.has(value)) {
            vnode.children[key] = childrenSlots.get(value);
          } else {
            const wrapped = wrapFunction(value, function (...args) {
              const result = value.apply(this, args);
              tagRenderResult(result);
              return result;
            });
            vnode.children[key] = wrapped;
            childrenSlots.set(value, wrapped);
          }
        });
      }
      return vnode;
    };
    return function (...args) {
      const result = render.apply(this, args);
      tagRenderResult(result);
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
  addLifecycleListener('beforeCreate', '*', instance => {
    if (instance.type.components && typeof instance.type.components === 'object') {
      Object.keys(instance.type.components).forEach(key => {
        const value = instance.type.components[key];
        value.__refName = key;
      });
    }
    updateStyleMapping(instance.type);
    renderWithExtraInfo(instance);
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
    if (container[1]) container[1].setAttribute('__yawf_feed_toobar__extra__', '');
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
          invokeContentScript('config', { profileId: $CONFIG.user.idstr });
        } else _configHandle.apply(this, args);
      };
    }(instance.ctx.configHandle)).bind(null);
  });
  //#endregion

  //#region 广告
  addLifecycleListener('created', 'card-hot-search', instance => {
    instance.proxy.$watch(() => instance.data.bandList, function (bandList) {
      const status = bandList.map(item => hotSearchFilter(item));
      if (status.some(item => item.action === 'hide')) {
        status.forEach((item, index) => { if (item.action === 'hide') log(`热搜过滤（${item.reason}）`, bandList[index]); });
        bandList.splice(0, bandList.length, ...bandList.filter((item, index) => status[index].action !== 'hide'));
      }
    }, { deep: true });
  });
  //#endregion

  //#region 消息流
  const filterExecutedItems = new Set();
  const filterFeedList = (feedList, context) => {
    if (!Array.isArray(feedList) || !feedList.length) return null;
    const filtered = [];
    let dirty = false;
    feedList.forEach(item => {
      if (filterExecutedItems.has(item.idstr)) {
        filtered.push(item);
        return;
      }
      filterExecutedItems.add(item.idstr);
      const status = feedFilter(item, context);
      if (isDebug) item.__yawf_filterStatus__ = status;
      if (status.action !== 'hide') filtered.push(item);
      else {
        dirty = true;
        log(`微博过滤：${status.reason}`, item);
      }
    });
    return dirty ? filtered : null;
  };
  const filterRepostCommentList = (rcList, context) => {
    if (!Array.isArray(rcList) || !rcList.length) return;
    const filtered = [];
    let dirty = false;
    rcList.forEach(item => {
      if (filterExecutedItems.has(item.idstr)) {
        filtered.push(item);
        return;
      }
      filterExecutedItems.add(item.idstr);
      const isRepost = item.retweeted_status;
      if (isRepost) {
        const status = feedFilter(item, { ...context, rcList: true });
        if (status.action !== 'hide') filtered.push(item);
        else {
          dirty = true;
          log(`转发过滤：${status.reason}`, item);
        }
      } else {
        const status = commentFilter(item, context);
        if (status.action !== 'hide') {
          const subComments = item.comments;
          const filteredSubComments = [];
          if (Array.isArray(subComments)) subComments.forEach(subComment => {
            const status = commentFilter(subComment);
            if (status.action !== 'hide') filteredSubComments.push(subComment);
            else log(`二级评论过滤：${status.reason}`, subComment);
          });
          if (filteredSubComments.length === subComments.length) filtered.push(item);
          else filtered.push({ ...item, comments: filteredSubComments });
        } else {
          dirty = true;
          log(`评论过滤：${status.reason}`, item);
        }
      }
    });
    return dirty ? filtered : null;
  };
  const collectContext = instance => {
    const context = {};
    const $route = instance.appContext.config.globalProperties.$route;
    if ($route.name === 'profile') context.profile = $route.params?.id;
    context.uid = $CONFIG.user.idstr;
    return context;
  };
  addLifecycleListener('created', 'feed-scroll', instance => {
    if (!shouldFilterFeedList(instance)) return;
    instance.proxy.$watch(() => instance.proxy.$props.data, feedList => {
      const filtered = filterFeedList(feedList, collectContext(instance));
      if (filtered) instance.emit('update:data', filtered);
    }, { deep: true });
  });
  addLifecycleListener('created', 'feed', instance => {
    if (!shouldFilterRCList(instance)) return;
    instance.proxy.$watch(() => instance.proxy.$props.data.rcList, rcList => {
      const filtered = filterRepostCommentList(rcList, collectContext(instance));
      if (filtered) instance.emit('update:data', { ...instance.proxy.$props.data, rcList: filtered });
    }, { deep: true });
  });
  addLifecycleListener('created', 'repost-coment-list', instance => {
    if (!shouldFilterRCList(instance)) return;
    instance.proxy.$watch(() => instance.data.list, list => {
      const filtered = filterRepostCommentList(list, collectContext(instance));
      if (filtered) instance.data.list.splice(0, instance.data.list.length, ...filtered);
    });
  });
  //#endregion

  //#region 热搜固顶
  addLifecycleListener('created', 'card-hot-search', instance => {
    if (!getConfigBoolean('cleanup::searchTop')) return;
    instance.proxy.$watch(() => instance.data.TopWords, function (TopWords) {
      if (TopWords?.length) {
        log('清理：热搜：置顶热搜', TopWords);
        TopWords.splice(0);
      }
    });
  }, { deep: true });
  //#endregion

  //#region 元素清理
  const cleanupStyles = {
    'cleanup::navHome': /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href="/"] { display: none; }`,
    'cleanup::navHot': /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href="/hot"] { display: none; }`,
    'cleanup::navTv': /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href="/tv"] { display: none; }`,
    'cleanup::navMessage': /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href="/at/weibo"] { display: none; }`,
    'cleanup::navProfile': /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href^="/u/"] { display: none; }`,
    'cleanup::navAvatar': [
      /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href^="/u/"] { text-decoration: none; }`,
      /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href^="/u/"] .__yawf_ctrls_avatarItem::before { font-family: woo; content: "\\e087"; color: var(--weibo-top-nav-icon-color); font-size: 30px; }`,
      /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_ctrls__] a[href^="/u/"] .__yawf_ctrls_avatarItem > *{ display: none; }`,
    ].join('\n'),
    'cleanup::navGame': /* css */`[__yawf_component_weibo-top-nav-base__] a[href*="game.weibo.com"] { display: none; }`,
    'cleanup::navDarkMode': /* css */`[__yawf_component_weibo-top-nav-base__] [__yawf_component_dark__] { display: none; }`,
    'cleanup::navAria': /* css */`[__yawf_component_aria__] { display: none; }`,
    'cleanup::hotSearch': /* css */`[__yawf_component_card-hot-search__] { display: none; }`,
    'cleanup::interested': /* css */`[__yawf_component_card-interested__] { display: none; }`,
    'cleanup::creatorCenter': /* css */`[__yawf_component_card-service__] { display: none; }`,
    'cleanup::sideFooter': /* css */`.wbpro-side-copy[__yawf_component_index__] { display: none; }`,
    'cleanup::service': /* css */`[__yawf_component_service-module__] { display: none; }`,
    'cleanup::followRecom': /* css */`[__yawf_component_recom-module__] { display: none; }`,
    'cleanup::feedEmptyTip': /* css */`.__yawf_home_emptyPic { display: none; }`,
    'cleanup::feedSource': /* css */`.__yawf_head-info_source { display: none; }`,
    'cleanup::feedFollow': /* css */`[__yawf_component_feed__] [__yawf_component_head__] [__yawf_component_follow-btn__] { display: none; }`,
    'cleanup::feedQr': /* css */`[__yawf_feed_toobar__extra__] { display: none; }`,
    'cleanup::feedRetweet': /* css */`[__yawf_feed_toolbar__="retweet"], [__yawf_comment_toolbar_item__="retweet"] { display: none; }`,
    'cleanup::feedLike': /* css */`[__yawf_feed_toolbar__="like"], [__yawf_comment_toolbar_item__="like"] { display: none; }`,
    'cleanup::translate': /* css */`.__yawf_translate_opt { display: none; }`,
    'cleanup::iconVerify': /* css */`.woo-icon-skinSpe, .woo-icon-skinSpe + .woo-icon-frames, .woo-icon--vred, .woo-icon--vorange, .woo-icon--vyellow, .woo-icon--vblue { display: none; }`,
    'cleanup::iconVip': /* css */`[__yawf_icon_list_item__="vip"], .__yawf_woo-icon_vipimg { display: none; }`,
    'cleanup::iconFans': /* css */`.__yawf_icon-fans_fans { display: none; }`,
    'cleanup::iconOther': /* css */`.__yawf_icon-list_custom { display: none; }`,
    'cleanup::profileHeader': [
      /* css */`[__yawf_component_profile-header__] .wbpro-pos { display: none; }`,
      /* css */`[__yawf_component_profile-header__] .__yawf_profile-header_box1 { padding-top: 40px; }`,
      /* css */`[__yawf_component_profile-header__] .__yawf_profile-header_avatar2 { margin-top: 0; }`,
      /* css */`[__yawf_component_profile-header__] .__yawf_profile-header_content { padding-left: 100px; margin-top: -50px; width: 0; }`,
      /* css */`[__yawf_component_profile-header__] .__yawf_profile-header_box3 { margin-left: 126px; }`,
    ].join('\n'),
    'cleanup::ad': [
      /* css */`[__yawf_component_tips-ad__] { display: none; }`,
    ].join('\n'),
  };
  appReady.then(() => {
    Object.keys(cleanupStyles).forEach(key => {
      if (getConfigBoolean(key)) addStyle(cleanupStyles[key]);
    });
  });
  //#endregion

} + '(' + [(function () {
  try {
    const config = GM_getValue(configKey);
    if (typeof config === 'object') return config || {};
    return {};
  } catch { return {}; }
}()), messageKey].map(x => JSON.stringify(x)) + '))');
//#endregion

//#region CONTENT SCRIPT
try {
  if (typeof GM_getValue !== 'function') throw Error();
  if (typeof GM_setValue !== 'function') throw Error();
  if (typeof GM_addValueChangeListener !== 'function') throw Error();
  if (typeof GM_removeValueChangeListener !== 'function') throw Error();
} catch (e) {
  alert('脚本需要在页面加载前读取配置，当前猴子环境可能不支持相关功能。请检查你是用的猴子版本是否受到支持。');
}

const handlers = {}, handle = (key, method) => handlers[key] = method;
document.addEventListener(messageKey + 'CONTENT', event => {
  const { method, data } = event.detail;
  handlers[method]?.(data);
});
const invokePageScript = function (method, data) {
  const event = new CustomEvent(messageKey + 'PAGE', { detail: { method, data } });
  document.dispatchEvent(event);
};
handle('config', ({ profileId }) => {
  configDialog(profileId);
});
const appReady = new Promise(resolve => {
  handle('ready', () => {
    resolve();
  });
});

let xhrIndex = 0;
const xhrFly = new Map();
handle('xhrDone', ({ id, response }) => {
  xhrFly.get(id)?.(response);
  xhrFly.delete(id);
});
const xhr = new Proxy({}, {
  get(_, name) {
    return async config => {
      const id = ++xhrIndex;
      const resp = new Promise(resolve => {
        xhrFly.set(id, resolve);
      });
      invokePageScript('xhr', { id, name, config });
      return resp;
    };
  },
});

//#region 基本 UI 组件
const dialogStack = [];
/**
 * 显示一个对话框
 * @param {{
 *   id: string;
 *   title: string;
 *   render: Function;
 *   button?: { [type: string]: Function? }?,
 *   onShow?: (() => void);
 *   onHide?: (() => void);
 * }}
 */
const uiDialog = function ({ id, title, render, button, onShow, onHide }) {
  // 初始化 DOM
  const template = document.createElement('template');
  template.innerHTML = /* html */`
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
  okButton.textContent = '确定';
  cancelButton.textContent = '取消';
  closeButton.title = '关闭';
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
  /** @type {KeyboardEvent} */
  const keys = event => {
    if (!event.isTrusted) return;
    if (dialogStack[dialogStack.length - 1] !== dialog) return;
    const code = event.keyCode;
    if (code === 13 && button && button.ok) button.ok(event);
    else if (code === 27) {
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
    onHide?.();
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
    onShow?.();
  };
  return { hide, show, resetPosition, dom: dialog };
};
const wooDialogFly = new Map();
let wooDialogIndex = 0;
const wooDialog = function (config) {
  const id = ++wooDialogIndex;
  const resp = new Promise(resolve => {
    wooDialogFly.set(id, resolve);
  });
  invokePageScript('dialog', { id, config });
  return resp;
};
handle('dialogDone', ({ id, response }) => {
  wooDialogFly.get(id)?.(response);
  wooDialogFly.delete(id);
});
//#endregion

//#region 设置界面
const configDialog = function (profileId) {
  let contentDestroy = null;
  try {
    uiDialog({
      id: 'yawf-config',
      title: '药方 (YAWF) 设置',
      render: inner => {
        contentDestroy = renderConfig(inner, profileId, CONFIG_TEMPLATE);
      },
      onHide() {
        contentDestroy();
      }
    }).show();
  } catch (e) { console.log('Error while showing rule dialog %o', e); }
};
const renderConfig = (container, profileId, template) => {
  const domParser = new DOMParser();
  const dom = domParser.parseFromString('<yawf-config>' + template + '</yawf-config>', 'text/html');
  /** @param {HTMLElement} o * @param {HTMLElement} n */
  const moveSubTree = (n, o) => { while (o.firstChild) n.appendChild(o.removeChild(o.firstChild)); return n; };
  /** @type {
    (<TagName extends keyof HTMLElementTagNameMap>(tagName: TagName, className?: string, attributes?: Record<string, string>, children?: ArrayLike<HTMLElement>) => HTMLElementTagNameMap[TagName]) |
    (<TagName extends keyof HTMLElementTagNameMap>(tagName: TagName, attributes?: Record<string, string>, children?: ArrayLike<HTMLElement>) => HTMLElementTagNameMap[TagName]) |
    (<TagName extends keyof HTMLElementTagNameMap>(tagName: TagName, children?: ArrayLike<HTMLElement>) => HTMLElementTagNameMap[TagName])
  } */
  const r = (t, ...args) => {
    const d = document.createElement(t);
    if (typeof args[0] === 'string') d.className = args.shift();
    if (args[0] && !Array.isArray(args[0])) ((a => Object.keys(a).forEach(k => d.setAttribute(k, a[k])))(args.shift()));
    if (Array.isArray(args[0])) ((a => a.forEach(t => d.appendChild(t)))(args.shift()));
    return d;
  };
  const t = t => new Text(t);
  /** @type {HTMLElement} */
  const main = dom.querySelector('yawf-config').cloneNode(true);
  //#region 标签页
  [...main.querySelectorAll('yawf-tabs')].forEach(tabs => {
    const tabItems = [...tabs.children].filter(item => item.matches('yawf-tab'));
    const list = r('div', 'yawf-tab-list'), content = r('div', 'yawf-tab-content');
    const container = r('div', 'yawf-tabs', [list, content]);
    const highlight = index => {
      const updateHighlight = (item, i) => item.classList[i === index ? 'add' : 'remove']('yawf-current');
      [...list.children].forEach(updateHighlight);
      [...content.children].forEach(updateHighlight);
    };
    tabItems.forEach((tab, index) => {
      const button = list.appendChild(r('button', 'yawf-tab-item', [t(tab.getAttribute('name'))]));
      moveSubTree(content.appendChild(r('div', 'yawf-tab')), tab);
      button.addEventListener('click', () => highlight(index));
    }); tabs.parentNode.replaceChild(container, tabs);
    highlight(0);
  });
  //#endregion
  //#region 设置读写
  const readConfig = () => {
    const config = GM_getValue(configKey);
    if (config && typeof config === 'object') {
      config[profileId] ??= {};
      return config;
    }
    return writeConfig({});
  };
  const writeConfig = (config) => {
    try { GM_setValue(configKey, config); return config; } catch (e) { }
    try { GM_setValue(configKey, {}); } catch (e) { }
    return {};
  };
  let config = readConfig();
  const getConfig = key => config[profileId]?.[key];
  const setConfig = (key, newValue) => {
    if (JSON.stringify(config[key]) === JSON.stringify(newValue)) return;
    writeConfig({
      ...config, [profileId]: {
        ...(config[profileId] ?? {}),
        [key]: newValue
      },
    });
  };
  const listenerId = GM_addValueChangeListener(configKey, (name, oldValue, newValue, remote) => {
    const oldConfig = config;
    const newConfig = (config = readConfig());
    const o = oldConfig[profileId], n = newConfig[profileId];
    const keys = new Set(Object.keys(o ?? {}).concat(Object.keys(n ?? {})));
    keys.forEach(key => {
      const ov = o?.[key] ?? null, nv = n?.[key] ?? null;
      if (JSON.stringify(ov) !== JSON.stringify(nv)) {
        configs.get(key)?.forEach(c => c.onChange(nv));
      }
    });
  });
  //#endregion
  //#region 设置项
  /** @type {Map<string, ConfigItem[]>} */
  const configs = new Map();
  class ConfigItem {
    /** @param {string} key @param {HTMLElement} dom @param {any} defaultValue */
    constructor(key, dom, defaultValue) {
      this.key = key;
      this.dom = dom;
      this.defaultValue = defaultValue;
      this.initRender(getConfig(this.key));
      if (!configs.has(key)) configs.set(key, []);
      configs.get(key).push(this);
    }
    get value() { return getConfig(this.key); }
    set value(newValue) { setConfig(this.key, newValue); return true; }
    initRender(value) { this.renderValue(value); }
    renderValue(value) { }
    onChange(value) { this.renderValue(value); }
  }
  class CheckboxConfigItem extends ConfigItem {
    renderValue(value) { this.dom.checked = value; }
  }
  class SelectConfigItem extends ConfigItem {
    renderValue(value) { this.dom.value = value; }
  }
  class StringsConfigItem extends ConfigItem {
    renderValue(value) {
      const items = [...this.dom.children].filter(item => item.matches('.yawf-collection-item'));
      const newItems = Array.isArray(value) ? value.map(val => {
        const exist = items.find(i => i.dataset.value === val);
        if (exist) return exist;
        return r('li', 'yawf-collection-item', { 'data-value': val }, [
          r('button', 'yawf-collection-item-remove', { type: 'button', title: '删除', 'data-key': this.key, 'data-value': val }, [r('i', 'woo-font woo-font--cross')]),
          r('div', 'yawf-collection-item-content', [this.renderItem(val)]),
        ]);
      }) : [];
      this.dom.innerHTML = '';
      newItems.forEach(item => this.dom.appendChild(item));
    }
    renderItem(val) { return t(val); }
  }
  class UsersConfigItem extends StringsConfigItem {
    renderItem(val) {
      const container = r('div', 'yawf-user-item');
      xhr.userInfoById(val).then(user => {
        if (!user) return;
        container.innerHTML = '';
        container.append(
          r('img', 'yawf-user-avatar', { src: user.avatar, alt: user.screen_name }),
          r('a', 'yawf-user-name', { href: `/u/${user.idstr}`, target: '_blank' }, [
            r('span', { title: user.screen_name }, [t(user.screen_name)]),
          ])
        );
      });
      return container;
    }
  }
  const addStringItem = function (key, val) {
    const value = val.trim();
    if (!value) return null;
    setConfig(key, (getConfig(key)?.filter(i => i !== value) || []).concat([value]));
    return true;
  };
  const addUserItem = async function (key, val) {
    const name = val.trim().replace(/^@/, '');
    if (!name) return null;
    const user = await xhr.userInfoByName(name, { immediate: true });
    if (!user) {
      wooDialog({ type: 'alert', message: '找不到该用户', btnConfirm: '我知道了', title: '添加用户' });
      return false;
    }
    const idstr = user.idstr;
    setConfig(key, (getConfig(key)?.filter(i => i !== idstr) || []).concat([idstr]));
    return true;
  };
  // 勾选框
  [...main.querySelectorAll('yawf-checkbox')].forEach(checkbox => {
    const key = checkbox.getAttribute('key');
    const defaultValue = checkbox.getAttribute('default') === 'true';
    const label = r('label', 'yawf-checkbox-label', [
      r('span', 'yawf-checkbox-wrap', [
        r('input', 'yawf-checkbox', { 'data-key': key, type: 'checkbox' }),
        r('span', 'yawf-checkbox-icon'),
      ]),
    ]);
    const $input = label.querySelector('input'), $icon = label.querySelector('.yawf-checkbox-icon');
    $icon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path fill="currentColor" d="M0 0v16h16V0H0zm14.398 2.9a.667.667 0 0 1 .523 1.129l-8.686 8.604c-.26.258-.677.258-.937 0L1.408 8.78a.667.667 0 1 1 .939-.947l3.42 3.39 8.215-8.14a.667.667 0 0 1 .416-.182z"></path></svg>';
    moveSubTree(label, checkbox);
    checkbox.parentNode.replaceChild(label, checkbox);
    new CheckboxConfigItem(key, $input, defaultValue);
  });
  // 下拉框
  [...main.querySelectorAll('yawf-select')].forEach(select => {
    const key = select.getAttribute('key');
    const options = [...select.children].filter(o => o.matches('yawf-option'));
    const $select = r('select', 'yawf-select', { 'data-key': select.getAttribute('key') });
    const defaultValue = options.find(o => o.hasAttribute('default'))?.getAttribute('value');
    options.forEach(opt => {
      $select.appendChild(r('option', 'yawf-option', { value: opt.getAttribute('value') }), [t(opt.textContent)]);
    });
    select.parentNode.replaceChild($select, select);
    new SelectConfigItem(key, $select, defaultValue);
  });
  // 字符串列表和用户列表
  [...main.querySelectorAll('yawf-strings, yawf-users')].forEach(strings => {
    const isUsers = strings.matches('yawf-users');
    const key = strings.getAttribute('key');
    const $ul = r('ul', 'yawf-collection-list yawf-strings-list ' + (isUsers ? 'yawf-users-list' : ''), { 'data-key': key });
    strings.parentNode.replaceChild($ul, strings);
    if (isUsers) new UsersConfigItem(key, $ul, []);
    else new StringsConfigItem(key, $ul, []);
  });
  [...main.querySelectorAll('yawf-strings-input, yawf-users-input')].forEach(stringsInput => {
    const key = stringsInput.getAttribute('key');
    const isUsers = stringsInput.matches('yawf-users-input');
    const $form = r('form', 'yawf-collection-form yawf-strings-form ' + (isUsers ? 'yawf-users-form' : ''), { 'data-key': key }, [
      r('div', 'woo-input-wrap', [r('input', 'yawf-collection-input woo-input-main', { type: 'text' })]),
      r('button', 'yawf-collection-submit woo-button-main woo-button-line woo-button-primary woo-button-s woo-button-round', { type: 'submit' }, [t('添加')]),
    ]);
    stringsInput.parentNode.replaceChild($form, stringsInput);
  });
  //#endregion
  //#region 界面
  [...main.querySelectorAll('yawf-rule')].forEach(rule => {
    const $rule = rule.parentNode.replaceChild(moveSubTree(r('div', 'yawf-rule'), rule), rule);
    if (rule.className) $rule.className += ' '+ rule.className;
  });
  [...main.querySelectorAll('yawf-group')].forEach(group => {
    const name = group.getAttribute('name');
    const $group = r('div', 'yawf-group', [
      r('div', 'yawf-group-title', [t(name)]),
      moveSubTree(r('div', 'yawf-group-content'), group),
    ]);
    if (group.className) $group.className += ' '+ group.className;
    group.parentNode.replaceChild($group, group);
  });
  // 事件处理
  const root = moveSubTree(container.appendChild(r('div', 'yawf-config')), main);
  root.addEventListener('change', e => {
    const el = e.target;
    const key = el?.dataset?.key;
    if (!key) return;
    if (el.matches('input.yawf-checkbox')) {
      setConfig(key, el.checked);
    } else if (el.matches('select.yawf-select')) {
      setConfig(key, el.value);
    }
  });
  root.addEventListener('click', e => {
    const el = e.target.closest('button');
    const key = el?.dataset?.key;
    if (!key) return;
    if (el?.matches('button.yawf-collection-item-remove')) {
      const value = el.dataset.value;
      setConfig(key, getConfig(key)?.filter(i => i !== value) || []);
    }
  })
  root.addEventListener('submit', async e => {
    const el = e.target;
    const key = el?.dataset?.key;
    if (!key) return;
    if (el.matches('form.yawf-collection-form')) {
      e.preventDefault();
      const input = el.querySelector('input.yawf-collection-input');
      const isUsers = input.matches('.yawf-users-form input.yawf-collection-input');
      input.disabled = true;
      const addItem = await (isUsers ? addUserItem(key, input.value) : addStringItem(key, input.value));
      input.disabled = false;
      if (addItem !== false) input.value = '';
      input.focus();
      const autoComplete = input.nextSibling;
      if (autoComplete) autoComplete.innerHTML = '';
    }
  });
  const renderAutoComplete = async el => {
    const valueSnapshot = el.value;
    const val = valueSnapshot.trim().replace(/^@/, '').trim();
    const autoComplete = el.nextSibling;
    /** @type {Array} */
    const users = await xhr.searchUsers(val);
    if (el.value !== valueSnapshot) return;
    autoComplete.innerHTML = '';
    const candidates = users.map(user => (
      autoComplete.appendChild(r('div', 'yawf-collection-auto-complete-item', { 'data-value': user.screen_name }, [t(user.screen_name)]))
    ));
    candidates[0]?.classList.add('yawf-collection-auto-complete-current');
  };
  root.addEventListener('focusin', event => {
    const el = event.target;
    if (el.matches('.yawf-users-form input.yawf-collection-input')) {
      if (!el.nextSibling?.matches('.yawf-collection-auto-complete')) {
        el.parentNode.insertBefore(r('div', 'yawf-collection-auto-complete'), el.nextSibling);
      }
      renderAutoComplete(el);
    }
  });
  root.addEventListener('focusout', event => {
    const el = event.target;
    if (el instanceof HTMLElement && el.matches('.yawf-users-form input.yawf-collection-input')) {
      const autoComplete = el.nextSibling;
      if (!(autoComplete instanceof HTMLElement) || !autoComplete.matches('.yawf-collection-auto-complete')) return;
      autoComplete.parentNode.removeChild(autoComplete);
    }
  });
  root.addEventListener('input', event => {
    const el = event.target;
    if (el instanceof HTMLElement && el.matches('.yawf-users-form input.yawf-collection-input')) {
      const autoComplete = el.nextSibling;
      if (!(autoComplete instanceof HTMLElement) || !autoComplete.matches('.yawf-collection-auto-complete')) return;
      autoComplete.innerHTML = '';
      if (!event.isComposing) renderAutoComplete(el);
    }
  });
  root.addEventListener('keydown', event => {
    const el = event.target;
    if (el instanceof HTMLElement && el.matches('.yawf-users-form input.yawf-collection-input')) {
      const autoComplete = el.nextSibling;
      if (!(autoComplete instanceof HTMLElement) || !autoComplete.matches('.yawf-collection-auto-complete')) return;
      if (event.isComposing) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        const items = [...autoComplete.children].filter(item => item.matches('.yawf-collection-auto-complete-item'));
        const current = items.find(item => item.matches('.yawf-collection-auto-complete-current'));
        const currentIndex = items.indexOf(current);
        if (current) current.classList.remove('yawf-collection-auto-complete-current');
        const next = event.key === 'ArrowDown' ?
          currentIndex >= 0 && currentIndex < items.length - 1 ? currentIndex + 1 : 0 :
          currentIndex > 0 && currentIndex <= items.length - 1 ? currentIndex - 1 : items.length - 1;
        items[next].classList.add('yawf-collection-auto-complete-current');
        items[next].scrollIntoView({ block: 'nearest' });
      } else if (event.key === 'Enter') {
        const current = autoComplete.querySelector('.yawf-collection-auto-complete-current');
        if (current) el.value = current.dataset.value;
      }
    }
  });
  root.addEventListener('mousemove', event => {
    const el = event.target;
    if (el instanceof HTMLElement && el.closest('.yawf-collection-auto-complete-item')) {
      const item = el.closest('.yawf-collection-auto-complete-item');
      const list = item.parentNode;
      const current = list.querySelector('.yawf-collection-auto-complete-current');
      if (item !== current) {
        current?.classList.remove('yawf-collection-auto-complete-current');
        item.classList.add('yawf-collection-auto-complete-current');
      }
    }
  });
  root.addEventListener('mousedown', async event => {
    const el = event.target;
    if (el instanceof HTMLElement && el.closest('.yawf-collection-auto-complete-item')) {
      const item = el.closest('.yawf-collection-auto-complete-item');
      const list = item.parentNode;
      const input = list.previousSibling;
      const form = input.closest('.yawf-collection-form');
      const value = item.dataset.value;
      const key = form.dataset.key;
      if (input && form) {
        input.disabled = true;
        const addItem = await addUserItem(key, value);
        input.disabled = false;
        if (addItem !== false) input.value = '';
        input.focus();
      }
    }
  });
  //#endregion
  return () => {
    GM_removeValueChangeListener(listenerId);
    configs.clear();
  };
};
let $style;
const addStyle = css => {
  if (!$style) {
    $style = document.body.appendChild(document.createElement('style'));
    $style.id = 'yawf_content_style';
  }
  $style.textContent += '\n' + css + '\n';
};
appReady.then(() => addStyle(/* css */`
.yawf-dialog.yawf-dialog { position: fixed; transition: none; }
.yawf-dialog .woo-dialog-main { max-width: none; padding-bottom: 0; }
.yawf-dialog-text { max-width: 400px; }
.yawf-dialog-title { cursor: move; margin-bottom: 0; }
.yawf-dialog-content { padding: 0; }
.yawf-dialog-outer { position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none repeat scroll 0% 0% rgb(0, 0, 0); opacity: 0.3; z-index: 9999; }
.yawf-dialog.yawf-drag { opacity: 0.67; user-select: none; transition: none; }
.yawf-bubble { max-width: 400px; font-size: 14px; padding: 8px 16px; box-sizing: border-box; }
.yawf-dialog-close { padding: 8px; position: absolute; top: 10px; right: 10px; z-index: 1; cursor: pointer; }

.yawf-config { width: 800px; font-size: 14px; color: var(--w-main); background: var(--frame-background); }

.yawf-tabs { display: flex; width: 100%; height: 480px; overflow: hidden; }
.yawf-tab-list { width: 160px; padding: 20px 0; box-sizing: border-box; border-right: 1px solid var(--w-dividing-line); }
.yawf-tab-item { display: block; font: inherit; width: 100%; height: 40px; line-height: 40px; margin: 0; padding: 0 20px; background: none; border: none; cursor: pointer; text-align: left; color: var(--w-main); }
.yawf-tab-item:hover { background: var(--w-hover); }
.yawf-tab-item.yawf-current { font-weight: bold; color: var(--w-main); box-shadow: -2px 0 0 var(--w-brand) inset; background: var(--w-card-background); }
.yawf-tab-content { flex: 1; padding: 10px 20px 20px; max-height: 480px; overflow: auto; box-sizing: border-box; background: var(--w-card-background); }
.yawf-tab { display: none; min-height: 400px; color: var(--w-main); }
.yawf-tab.yawf-current { display: block; }

.yawf-group-title { display: block; font-weight: bold; margin: 15px 10px 5px; }
.yawf-rule { display: block; margin: 5px 20px; }
.yawf-compact-group .yawf-group-content { display: grid; grid-template-columns: 1fr 1fr 1fr; }

.yawf-checkbox-wrap { display: inline-block; position: relative; width: var(--w-checkbox-size); height: var(--w-checkbox-size); overflow: hidden; margin-right: 4px; vertical-align: baseline; }
.yawf-checkbox { position: absolute; left: -100px; }
.yawf-checkbox-icon { position: absolute; top: 0; left: 0; right: 0; bottom: 0; border: 1px solid var(--w-checkbox-border); color: var(--w-checkbox-check-color); }
.yawf-checkbox-icon svg { position: absolute; top: -1px; left: -1px; right: -1px; bottom: -1px; }
.yawf-checkbox:not(:checked) ~ .yawf-checkbox-icon svg { display: none; }
label:hover .yawf-checkbox-wrap .yawf-checkbox-icon,
.yawf-checkbox-wrap:hover .yawf-checkbox-icon { border-color: var(--w-checkbox-check-color); }

.yawf-collection-list { display: block; margin: 5px; padding: 0; list-style: none; }
.yawf-collection-item { padding: 0 5px 0 20px; min-width: 0; height: 20px; overflow: hidden; text-overflow: ellipsis; cursor: default; display: inline-block; position: relative; margin-left: 8px; border: 1px solid var(--w-b-line-default); border-radius: 2px; background: var(--w-card-background); line-height: 20px; vertical-align: middle; }
.yawf-collection-item-remove { display: block; position: absolute; top: 2px; left: 0; width: 20px; height: 20px; line-height: 20px; text-align: center; cursor: pointer; background: none; border: none; }
.yawf-collection-item-remove i { color: var(--w-fonticon); }
.yawf-collection-item-content { max-width: 500px; text-overflow: ellipsis; overflow: hidden; white-space: nowrap; display: inline-block; }
.yawf-collection-form { display: contents; align-items: center; margin: 5px 0; }
.yawf-collection-form .woo-input-wrap { flex: 1; margin-right: 4px; }
.yawf-collection-input { width: 100%; height: 20px; box-sizing: border-box; padding-left: var(--w-input-indent, 4px); padding-right: var(--w-input-indent, 4px); }
.yawf-users-list { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px; }
.yawf-users-list .yawf-collection-item { padding-left: 60px; height: 50px; margin: 0; }
.yawf-users-list .yawf-collection-item .yawf-collection-item-remove { position: static; float: right; margin: 5px; }
.yawf-users-list .yawf-collection-item .yawf-collection-item-content { display: inline; word-break: break-all; white-space: pre-wrap; line-height: 20px; }
.yawf-users-list .yawf-collection-item .yawf-user-avatar { position: absolute; top: 0; left: 0; width: 50px; height: 50px; }
.yawf-users-list .yawf-collection-item .yawf-user-item { padding: 5px 0; }
.yawf-users-list .yawf-collection-item .yawf-user-name:not(:hover):not(:focus) { color: inherit; }
.yawf-collection-submit { padding: 4px 16px; margin: 0 4px; vertical-align: bottom; background: var(--w-b-flat-default-bg); border: 1px solid var(--w-b-line-default-border); color: var(--w-main); border-radius: 4px; cursor: pointer; }
.yawf-collection-submit:hover { background: var(--w-b-line-default-bg-hover); }

.yawf-collection-auto-complete { position: absolute; top: 100%; margin-top: 4px; left: 0; width: 400px; z-index: 1; background: var(--w-card-background); color: var(--w-main); border: 1px solid var(--w-b-line-default-border); border-radius: var(--w-pop-wrap-radius); max-height: 200px; overflow: auto; }
.yawf-collection-auto-complete:empty { display: none; }
.yawf-collection-auto-complete-current { background: var(--w-pop-item-hover); }
.yawf-collection-auto-complete-item { line-height: 40px; padding: 0 10px; cursor: normal; }
`));
//#endregion

//#region 配置界面
const CONFIG_TEMPLATE = /* html */`
<yawf-tabs>
  <yawf-tab name="微博过滤">
    <yawf-group name="过滤规则">
      <yawf-rule id="filter::keywords">
        <div>关键字 <yawf-strings-input key="filter::keywords" /></div>
        <div><yawf-strings key="filter::keywords" /></div>
      </yawf-rule>
      <p>此处的关键字会被应用于微博和评论，关键字会匹配全文，包括话题和@的用户。</p>
      <yawf-rule id="filter::authors">
        <div>作者 <yawf-users-input key="filter::authors" /></div>
        <div><yawf-users key="filter::authors" /></div>
      </yawf-rule>
      <p>此处的作者会被应用于微博的作者、转发原作者、共著作者等用户。</p>
    </yawf-group>
    <yawf-group name="首页">
      <yawf-rule id="home::newest">
        <yawf-checkbox key="home::newest">使用最新微博代替首页（首页微博时间顺序排列）</yawf-checkbox>
      </yawf-rule>
      <p>启用后，点击左上角微博图标或「全部关注」时也会跳转到最新微博页面。</p>
    </yawf-group>
  </yawf-tab>
  <yawf-tab name="界面清理">
    <yawf-group name="顶栏" class="yawf-compact-group">
      <yawf-rule id="cleanup::navHome"><yawf-checkbox key="cleanup::navHome">首页</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navHot"><yawf-checkbox key="cleanup::navHot">推荐</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navTv"><yawf-checkbox key="cleanup::navTv">视频</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navMessage"><yawf-checkbox key="cleanup::navMessage">消息</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navProfile"><yawf-checkbox key="cleanup::navProfile">个人主页</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navProfile"><yawf-checkbox key="cleanup::navAvatar">头像</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navGame"><yawf-checkbox key="cleanup::navGame">游戏</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navDarkMode"><yawf-checkbox key="cleanup::navDarkMode">日/夜模式</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::navAria"><yawf-checkbox key="cleanup::navAria">无障碍</yawf-checkbox></yawf-rule>
    </yawf-group>
    <yawf-group name="侧栏" class="yawf-compact-group">
      <yawf-rule id="cleanup::searchTop"><yawf-checkbox key="cleanup::hotSearch">热搜</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::searchTop"><yawf-checkbox key="cleanup::searchTop">热搜置顶</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::interested"><yawf-checkbox key="cleanup::interested">可能感兴趣的人</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::creatorCenter"><yawf-checkbox key="cleanup::creatorCenter">创作者中心</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::sideFooter"><yawf-checkbox key="cleanup::sideFooter">底部链接</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::service"><yawf-checkbox key="cleanup::service">常用功能</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::followRecom"><yawf-checkbox key="cleanup::followRecom">关注推荐</yawf-checkbox></yawf-rule>
    </yawf-group>
    <yawf-group name="微博内容" class="yawf-compact-group">
      <yawf-rule id="cleanup::feedEmptyTip"><yawf-checkbox key="cleanup::feedEmptyTip">已刷完提示</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::feedSource"><yawf-checkbox key="cleanup::feedSource">来源</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::feedFollow"><yawf-checkbox key="cleanup::feedFollow">关注按钮</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::feedQr"><yawf-checkbox key="cleanup::feedQr">分享二维码</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::feedRetweet"><yawf-checkbox key="cleanup::feedRetweet">转发</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::feedLike"><yawf-checkbox key="cleanup::feedLike">点赞</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::translate"><yawf-checkbox key="cleanup::translate">翻译</yawf-checkbox></yawf-rule>
    </yawf-group>
    <yawf-group name="图标" class="yawf-compact-group">
      <yawf-rule id="cleanup::iconVerify"><yawf-checkbox key="cleanup::iconVerify">红橙黄蓝V</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::iconVip"><yawf-checkbox key="cleanup::iconVip">VIP</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::iconFans"><yawf-checkbox key="cleanup::iconFans">铁粉钻粉</yawf-checkbox></yawf-rule>
      <yawf-rule id="cleanup::iconOther"><yawf-checkbox key="cleanup::iconOther">其他</yawf-checkbox></yawf-rule>
    </yawf-group>
    <yawf-group name="个人主页" class="yawf-compact-group">
      <yawf-rule id="cleanup::profileHeader"><yawf-checkbox key="cleanup::profileHeader">顶图</yawf-checkbox></yawf-rule>
    </yawf-group>
    <yawf-group name="其他" class="yawf-compact-group">
      <yawf-rule id="cleanup::ad"><yawf-checkbox key="cleanup::ad">广告</yawf-checkbox></yawf-rule>
    </yawf-group>
  </yawf-tab>
  <yawf-tab name="关于">
    <yawf-group name="调试">
      <yawf-rule id="about::debug">
        <yawf-checkbox key="about::debug">启用调试</yawf-checkbox>
      </yawf-rule>
    </yawf-group>
    <yawf-group name="关于">
      <yawf-rule id="about::script">
        <p>yyawf 目前正在开发中，欢迎贡献代码</p>
        <p>Licensed under MPL-2.0</p>
      </yawf-rule>
    </yawf-group>
  </yawf-tab>
</yawf-tabs>
`;
//#endregion
//#endregion
unsafeWindow.eval(payload);
