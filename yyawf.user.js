// ==UserScript==
// @name              yyawf
// @description       微博主页与搜索页广告、热搜及界面清理，关键字过滤，使用微博原生黑名单屏蔽微博和评论。
// @namespace         https://github.com/tiansh
// @version           1.8.3
// @match             https://weibo.com/*
// @match             https://www.weibo.com/*
// @match             https://s.weibo.com/*
// @icon              https://weibo.com/favicon.ico
// @noframes
// @run-at            document-start
// @author            田生 http://weibo.com/tsh90
// @license           MPL-2.0
// @grant             unsafeWindow
// @grant             GM_getValue
// @grant             GM_setValue
// @grant             GM_addValueChangeListener
// @grant             GM_registerMenuCommand
// @grant             GM_xmlhttpRequest
// @connect           weibo.com
// ==/UserScript==

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.
//
// Based on yyawf 0.0.11 by tiansh:
// https://github.com/tiansh/yawf/blob/172f69b77f7868ca6be258bfde63520efbd1cb72/yyawf.user.js

// eslint-env browser, greasemonkey

(() => {
  'use strict';

  const CONFIG_KEY = 'CONFIG';
  const MIGRATION_CONFIG_KEY = 'CONFIG_V1';
  const BLACKLIST_KEY_PREFIX = 'BLACKLIST:';
  const BLACKLIST_REFRESH_MS = 5 * 60_000;
  const BLACKLIST_LOADING_ATTR = 'data-yyawf-blacklist-loading';
  const SCRIPT_PREFIX = 'yyawf';
  const ROLE_ATTR = 'data-yyawf-role';
  const FILTER_ATTR = 'data-yyawf-filtered';
  const FILTER_REASON_ATTR = 'data-yyawf-filter-reason';
  const OWNED_ATTR = 'data-yyawf-owned';
  const BOOTSTRAP_ATTR = 'data-yyawf-bootstrap';
  const FAVORITE_HIDDEN_ATTR = 'data-yyawf-favorite-hidden';
  const WIDE_FEED_ATTR = 'data-yyawf-wide-feed';
  const FAVORITE_LIST_SELECTOR = '.woo-panel-main > [class*="_list_"]';
  const PROMOTED_HOT_SEARCH_KEY = 'cleanup::searchPromoted';
  const LEGACY_PROMOTED_HOT_SEARCH_KEYS = Object.freeze([
    'cleanup::searchTop',
    'cleanup::searchUnranked',
  ]);
  const DEFAULT_CONFIG = Object.freeze({
    'feed::latest': true,
  });

  const FILTER_KEYS = Object.freeze([
    'filter::keywords',
  ]);

  const BOOLEAN_KEYS = Object.freeze([
    'feed::latest',
    'cleanup::navHome',
    'cleanup::navHot',
    'cleanup::navTv',
    'cleanup::navMessage',
    'cleanup::navProfile',
    'cleanup::navAvatar',
    'cleanup::navGame',
    'cleanup::navDarkMode',
    'cleanup::navAria',
    'cleanup::hotSearch',
    PROMOTED_HOT_SEARCH_KEY,
    'cleanup::interested',
    'cleanup::creatorCenter',
    'cleanup::sideFooter',
    'cleanup::service',
    'cleanup::followRecom',
    'cleanup::feedEmptyTip',
    'cleanup::feedSource',
    'cleanup::feedFollow',
    'cleanup::feedQr',
    'cleanup::feedRetweet',
    'cleanup::feedLike',
    'cleanup::translate',
    'cleanup::iconVerify',
    'cleanup::iconVip',
    'cleanup::iconFans',
    'cleanup::iconOther',
    'cleanup::profileHeader',
    'cleanup::favoriteTags',
    'cleanup::favoriteStatic',
    'layout::wideFeed',
    'cleanup::ad',
    'about::debug',
  ]);

  const KNOWN_KEYS = new Set([...FILTER_KEYS, ...BOOLEAN_KEYS]);

  const BROWSING_GROUPS = Object.freeze([
    {
      name: '首页',
      items: [
        ['feed::latest', '默认进入最新微博'],
      ],
    },
    {
      name: '页面宽度',
      description: '右栏内容全部屏蔽后加宽中间栏；适用于首页、分组和收藏页，窄窗口保持原布局。',
      items: [['layout::wideFeed', '加宽中间栏']],
    },
    {
      name: '收藏页',
      items: [
        ['cleanup::favoriteTags', '折叠收藏标签'],
        ['cleanup::favoriteStatic', '取消收藏标签栏固定'],
      ],
    },
  ]);

  const CLEANUP_GROUPS = Object.freeze([
    {
      name: '顶栏',
      items: [
        ['cleanup::navHome', '首页'],
        ['cleanup::navHot', '推荐'],
        ['cleanup::navTv', '视频'],
        ['cleanup::navMessage', '消息'],
        ['cleanup::navProfile', '个人主页'],
        ['cleanup::navAvatar', '头像'],
        ['cleanup::navGame', '游戏'],
        ['cleanup::navDarkMode', '日/夜模式'],
        ['cleanup::navAria', '无障碍'],
      ],
    },
    {
      name: '侧栏',
      items: [
        ['cleanup::hotSearch', '热搜'],
        [PROMOTED_HOT_SEARCH_KEY, '推广热搜'],
        ['cleanup::interested', '可能感兴趣的人'],
        ['cleanup::creatorCenter', '创作者中心'],
        ['cleanup::sideFooter', '底部链接'],
        ['cleanup::service', '常用功能'],
        ['cleanup::followRecom', '关注推荐'],
      ],
    },
    {
      name: '微博内容',
      items: [
        ['cleanup::feedEmptyTip', '已刷完提示'],
        ['cleanup::feedSource', '来源'],
        ['cleanup::feedFollow', '关注按钮'],
        ['cleanup::feedQr', '分享二维码'],
        ['cleanup::feedRetweet', '转发'],
        ['cleanup::feedLike', '点赞'],
        ['cleanup::translate', '翻译'],
      ],
    },
    {
      name: '图标',
      items: [
        ['cleanup::iconVerify', '红橙黄蓝 V'],
        ['cleanup::iconVip', 'VIP'],
        ['cleanup::iconFans', '铁粉/钻粉'],
        ['cleanup::iconOther', '其他身份图标'],
      ],
    },
    {
      name: '个人主页',
      items: [['cleanup::profileHeader', '顶图']],
    },
    {
      name: '其他',
      items: [['cleanup::ad', '广告（含荐读）']],
    },
  ]);

  const ROLE_RULES = Object.freeze({
    'cleanup::navHome': ['nav-home'],
    'cleanup::navHot': ['nav-hot'],
    'cleanup::navTv': ['nav-tv'],
    'cleanup::navMessage': ['nav-message'],
    'cleanup::navProfile': ['nav-profile'],
    'cleanup::navAvatar': ['nav-avatar'],
    'cleanup::navGame': ['nav-game'],
    'cleanup::navDarkMode': ['nav-dark-mode'],
    'cleanup::navAria': ['nav-aria'],
    'cleanup::hotSearch': ['hot-search'],
    [PROMOTED_HOT_SEARCH_KEY]: ['hot-promoted'],
    'cleanup::interested': ['interested'],
    'cleanup::creatorCenter': ['creator-center'],
    'cleanup::sideFooter': ['side-footer'],
    'cleanup::service': ['service'],
    'cleanup::followRecom': ['follow-recommendation'],
    'cleanup::feedEmptyTip': ['feed-empty-tip'],
    'cleanup::feedSource': ['feed-source'],
    'cleanup::feedFollow': ['feed-follow'],
    'cleanup::feedQr': ['feed-qr'],
    'cleanup::feedRetweet': ['feed-retweet', 'comment-retweet'],
    'cleanup::feedLike': ['feed-like', 'comment-like'],
    'cleanup::translate': ['translate'],
    'cleanup::iconVerify': ['icon-verify'],
    'cleanup::iconVip': ['icon-vip'],
    'cleanup::iconFans': ['icon-fans'],
    'cleanup::iconOther': ['icon-other'],
    'cleanup::profileHeader': ['profile-header'],
    'cleanup::ad': ['ad'],
  });

  const WORK_KEYS = Object.freeze({
    navigation: [
      'cleanup::navHome', 'cleanup::navHot', 'cleanup::navTv',
      'cleanup::navMessage', 'cleanup::navProfile', 'cleanup::navAvatar',
      'cleanup::navGame', 'cleanup::navDarkMode', 'cleanup::navAria',
    ],
    sidebar: [
      'cleanup::hotSearch', PROMOTED_HOT_SEARCH_KEY, 'cleanup::interested',
      'cleanup::creatorCenter', 'cleanup::sideFooter', 'cleanup::service',
      'cleanup::followRecom',
    ],
    feeds: [
      'cleanup::feedEmptyTip', 'cleanup::feedSource', 'cleanup::feedFollow',
      'cleanup::feedQr', 'cleanup::feedRetweet', 'cleanup::feedLike',
      'cleanup::translate', 'cleanup::ad',
    ],
    comments: ['cleanup::feedRetweet', 'cleanup::feedLike'],
    icons: [
      'cleanup::iconVerify', 'cleanup::iconVip',
      'cleanup::iconFans', 'cleanup::iconOther',
    ],
    profile: ['cleanup::profileHeader'],
  });

  const isRecord = value => (
    value !== null &&
    typeof value === 'object' &&
    !Array.isArray(value)
  );

  const migrateConfigStore = raw => {
    if (!isRecord(raw)) return { store: {}, changed: false };
    const store = { ...raw };
    let changed = false;
    for (const [profileId, value] of Object.entries(raw)) {
      if (!/^\d+$/.test(profileId) || !isRecord(value)) continue;
      const hasLegacyKey = LEGACY_PROMOTED_HOT_SEARCH_KEYS.some(key => (
        Object.prototype.hasOwnProperty.call(value, key)
      ));
      if (!hasLegacyKey) continue;
      const config = { ...value };
      if (!Object.prototype.hasOwnProperty.call(config, PROMOTED_HOT_SEARCH_KEY)) {
        config[PROMOTED_HOT_SEARCH_KEY] = LEGACY_PROMOTED_HOT_SEARCH_KEYS.some(key => value[key] === true);
      }
      LEGACY_PROMOTED_HOT_SEARCH_KEYS.forEach(key => delete config[key]);
      store[profileId] = config;
      changed = true;
    }
    return { store, changed };
  };

  const normalizeText = value => String(value ?? '')
    .replace(/<[^>]*>/g, ' ')
    .replace(/[\u00a0\u200b-\u200d\u2060\ufeff]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

  const normalizeStringList = (value, { stringsOnly = false } = {}) => {
    if (!Array.isArray(value)) return [];
    const seen = new Set();
    const result = [];
    for (const item of value) {
      if (stringsOnly && typeof item !== 'string') continue;
      const normalized = normalizeText(item);
      if (!normalized || seen.has(normalized)) continue;
      seen.add(normalized);
      result.push(normalized);
    }
    return result;
  };

  const parseKeywordText = text => normalizeStringList(String(text ?? '').split(/\r\n|[\n\r]/));

  const serializeKeywords = keywords => normalizeStringList(keywords, { stringsOnly: true }).join('\n');

  // Reserve the built-in filters, current tag and editor before filling two rows.
  const visibleFavoriteTagIndices = (widths, availableWidth, gap, required) => {
    const visible = new Set(required);
    if (availableWidth <= 0) return new Set(widths.map((_width, index) => index));
    const fits = () => {
      let rows = 1;
      let used = 0;
      for (let index = 0; index < widths.length; index += 1) {
        if (!visible.has(index)) continue;
        const width = widths[index];
        if (used > 0 && used + gap + width > availableWidth + 0.5) {
          rows += 1;
          used = width;
        } else {
          used += (used > 0 ? gap : 0) + width;
        }
        if (rows > 2) return false;
      }
      return true;
    };
    for (let index = 0; index < widths.length; index += 1) {
      if (visible.has(index)) continue;
      visible.add(index);
      if (!fits()) {
        visible.delete(index);
        break;
      }
    }
    return visible;
  };

  const sanitizeConfig = raw => {
    if (!isRecord(raw)) return {};
    const clean = {};
    for (const key of FILTER_KEYS) {
      const value = normalizeStringList(raw[key], { stringsOnly: true });
      if (value.length) clean[key] = value;
    }
    for (const key of BOOLEAN_KEYS) {
      if (raw[key] === true) clean[key] = true;
      else if (raw[key] === false) clean[key] = false;
    }
    return clean;
  };

  const resolveConfig = raw => ({
    ...DEFAULT_CONFIG,
    ...sanitizeConfig(raw),
  });

  const extractUserIdFromHref = href => {
    const value = String(href ?? '').trim();
    if (!value) return '';
    try {
      const url = new URL(value, 'https://weibo.com/');
      const hostname = url.hostname.toLowerCase();
      if (hostname !== 'weibo.com' && !hostname.endsWith('.weibo.com')) return '';
      const match = url.pathname.match(/^\/(?:u\/)?(\d+)(?:\/|$)/);
      if (match) return match[1];
      return url.searchParams.get('uid')?.match(/^\d+$/)?.[0] ?? '';
    } catch {
      return '';
    }
  };

  const profileUserIdFromPath = path => {
    const match = String(path ?? '').match(/^\/u\/(\d+)\/?$/);
    return match?.[1] ?? '';
  };

  const latestFeedPath = profileId => {
    const id = normalizeText(profileId);
    return /^\d+$/.test(id) ? `/mygroups?gid=11000${id}` : '';
  };

  const shouldRedirectToLatest = ({ href = '', profileId = '', config = {} } = {}) => {
    if (resolveConfig(config)['feed::latest'] !== true) return false;
    if (!latestFeedPath(profileId)) return false;
    try {
      const url = new URL(String(href), 'https://weibo.com/');
      const hostname = url.hostname.toLowerCase();
      return (
        (hostname === 'weibo.com' || hostname === 'www.weibo.com') &&
        url.pathname === '/' &&
        url.search === ''
      );
    } catch {
      return false;
    }
  };

  const compileWorkPlan = (raw, blockedIds = new Set()) => {
    const config = resolveConfig(raw);
    const keywords = config['filter::keywords'] ?? [];
    const hasFilter = keywords.length > 0 || blockedIds.size > 0;
    const enabled = keys => keys.some(key => config[key] === true);
    const plan = {
      config,
      keywords,
      blockedIds,
      hasFilter,
      navigation: enabled(WORK_KEYS.navigation),
      sidebar: enabled(WORK_KEYS.sidebar) || keywords.length > 0,
      feeds: enabled(WORK_KEYS.feeds) || hasFilter,
      comments: enabled(WORK_KEYS.comments) || hasFilter,
      icons: enabled(WORK_KEYS.icons),
      profile: enabled(WORK_KEYS.profile),
      favoriteTags: config['cleanup::favoriteTags'] === true,
      favoriteStatic: config['cleanup::favoriteStatic'] === true,
      wideFeed: config['layout::wideFeed'] === true,
      ads: config['cleanup::ad'] === true,
    };
    plan.hasDomWork = (
      plan.navigation || plan.sidebar || plan.feeds || plan.comments ||
      plan.icons || plan.profile || plan.ads || plan.favoriteTags || plan.favoriteStatic || plan.wideFeed
    );
    return plan;
  };

  const filterDecision = ({ text = '', userIds = [], plan }) => {
    const normalizedText = plan.keywords.length ? normalizeText(text) : '';
    for (const keyword of plan.keywords) {
      if (normalizedText.includes(keyword)) {
        return { hidden: true, reason: 'keyword', match: keyword };
      }
    }

    for (const userId of userIds) {
      if (plan.blockedIds.has(userId)) {
        return { hidden: true, reason: 'blacklist', match: userId };
      }
    }
    return { hidden: false, reason: null, match: null };
  };

  const parseBlacklistPage = (json, profileId) => {
    if (
      json?.ok !== 1 || String(json.uid) !== profileId ||
      !Number.isSafeInteger(json.total) || json.total < 0 ||
      !Array.isArray(json.card_group) ||
      !/^\d+$/.test(String(json.next_cursor))
    ) throw new Error('微博黑名单响应无效或登录账号已改变。');
    const entries = json.card_group.map(card => {
      const url = new URL(card.scheme);
      const uid = url.searchParams.get('uid');
      const flags = ['status', 'interact', 'follow'].map(key => url.searchParams.get(key));
      if (
        url.protocol !== 'sinaweibo:' || url.hostname !== 'shieldoption' ||
        !/^\d+$/.test(uid ?? '') || flags.some(flag => flag !== '0' && flag !== '1')
      ) throw new Error('微博黑名单条目格式已改变。');
      return { uid, blocked: flags.every(flag => flag === '1') };
    });
    return { entries, total: json.total, hasMore: Number(json.next_cursor) !== 0 };
  };

  const roleSelector = role => `[${ROLE_ATTR}~="${role}"]`;

  const AD_METADATA_SELECTOR = '[data-ad], [data-adid], [data-ad-id]';
  const AD_LABEL_SELECTOR = [
    '[class*="ad" i]', '[class*="badge" i]', '[class*="label" i]',
    '[class*="mark" i]', '[class*="tag" i]', '[class*="tip" i]',
  ].join(', ');
  const AD_LABELS = new Set(['广告', '微博广告', '推广', '荐读']);
  const HOT_PROMOTION_LABELS = new Set(['推荐', '推广', '广告']);

  const STATIC_RULE_SELECTORS = Object.freeze({
    'cleanup::navHome': [
      'nav a[href="/"][title="首页"]',
      '[role="navigation"] a[href="/"][title="首页"]',
    ],
    'cleanup::navHot': ['nav a[href="/hot"]', '[role="navigation"] a[href="/hot"]'],
    'cleanup::navTv': ['nav a[href="/tv"]', '[role="navigation"] a[href="/tv"]'],
    'cleanup::navMessage': ['nav a[href="/at/weibo"]', '[role="navigation"] a[href="/at/weibo"]'],
    'cleanup::hotSearch': [
      '.wbpro-side:has(.hotBand)',
      '.hotBand',
      '.hot-band-container',
    ],
    [PROMOTED_HOT_SEARCH_KEY]: [
      '.hot-band-tabs-list-item:has(.hot-band-tabs-list-item-top)',
      '.hot-band-tabs-list-item[action-type="realtimehot_ad"]',
    ],
    'cleanup::interested': ['#pl_right_side > .card-wrap:has(> .card-interest)'],
    'cleanup::followRecom': ['#pl_right_side > .card-wrap:has(> .card-topic-presenter)'],
    'cleanup::sideFooter': ['.wbpro-side-copy', '#pl_feedlist_index .m-footer'],
    'cleanup::feedFollow': ['#pl_feed_main [action-type="userFollow"]'],
    'cleanup::feedRetweet': [
      '.card-act li:has([action-type="feed_list_forward"])',
      '.card-comment .func > .act > li:has(.woo-font--retweet)',
    ],
    'cleanup::feedLike': [
      '.card-act li:has([action-type="feed_list_like"])',
      '.card-comment .func > .act > li:has([action-type="feed_list_like"])',
      '.card-review .fun > .act > li:has([action-type="comment_object_like"])',
    ],
    'cleanup::feedSource': [
      '.card-feed > .content > .from > a:not(:first-child)',
      '.card-comment .func > .from > a:not(:first-child)',
    ],
    'cleanup::iconVerify': [
      '.woo-icon-skinSpe',
      '.woo-icon-skinSpe + .woo-icon-frames',
      '.woo-icon--vred',
      '.woo-icon--vorange',
      '.woo-icon--vyellow',
      '.woo-icon--vblue',
      '.woo-icon-wrap[title="微博个人认证"]',
      '.woo-icon-wrap[title="微博官方认证"]',
    ],
    'cleanup::iconVip': [
      '.woo-icon-wrap:has(.woo-icon-vipimg)',
      '.woo-icon-main:has(.woo-icon-vipimg)',
      '.woo-icon-vipimg',
      '.user_vip_icon_container',
    ],
    'cleanup::iconFans': [
      '.woo-icon-wrap:has([class*="_fans_" i])',
      '.woo-icon-main:has([class*="_fans_" i])',
      '[class*="_fans_" i]',
    ],
    'cleanup::iconOther': ['[class*="icon-list"] [class*="custom"]'],
    'cleanup::ad': [
      'article[data-ad]',
      'article[data-adid]',
      'article[data-ad-id]',
      '.card-wrap[action-type="feed_list_item"][data-ad]',
      '.card-wrap[action-type="feed_list_item"][data-adid]',
      '.card-wrap[action-type="feed_list_item"][data-ad-id]',
    ],
  });

  const EXTRA_CLEANUP_CSS = Object.freeze({
    // Hide the mixed source text without replacing the timestamp or its link.
    'cleanup::feedSource': [
      '.card-feed > .content > .from, .card-comment .func > .from { font-size: 0 !important; }',
      '.card-feed > .content > .from > a:first-child, .card-comment .func > .from > a:first-child ' +
        '{ font-size: 12px !important; }',
    ].join('\n'),
    // DynamicScroller ignores heights below 1px; keep hidden ads measurable.
    'cleanup::ad': `.wbpro-scroller-item:has(> article:is(${roleSelector('ad')}, ${AD_METADATA_SELECTOR})) ` +
      '{ min-height: 1px !important; }',
    'cleanup::navAvatar': [
      `${roleSelector('nav-avatar-shell')} { position: relative !important; ` +
        'width: 24px !important; height: 24px !important; color: var(--w-main, #333) !important; }',
      `${roleSelector('nav-avatar-shell')}::before { content: ""; position: absolute; ` +
        'width: 8px; height: 8px; left: 8px; top: 3px; border-radius: 50%; background: currentColor; }',
      `${roleSelector('nav-avatar-shell')}::after { content: ""; position: absolute; ` +
        'width: 16px; height: 9px; left: 4px; bottom: 3px; ' +
        'border-radius: 9px 9px 4px 4px; background: currentColor; }',
    ].join('\n'),
    'cleanup::profileHeader': [
      `${roleSelector('profile-box1')} { padding-top: 40px !important; }`,
      `${roleSelector('profile-avatar')} { margin-top: 0 !important; }`,
      `${roleSelector('profile-content')} { padding-left: 100px !important; ` +
        'margin-top: -50px !important; width: 0 !important; }',
      `${roleSelector('profile-actions')} { margin-left: 126px !important; }`,
    ].join('\n'),
  });

  const buildCleanupCss = config => {
    const safeConfig = sanitizeConfig(config);
    const rules = [];
    for (const [key, roles] of Object.entries(ROLE_RULES)) {
      if (safeConfig[key] !== true) continue;
      const selectors = [
        ...roles.map(roleSelector),
        ...(STATIC_RULE_SELECTORS[key] ?? []),
      ];
      rules.push(`${selectors.join(', ')} { display: none !important; }`);
      if (EXTRA_CLEANUP_CSS[key]) rules.push(EXTRA_CLEANUP_CSS[key]);
    }
    if (safeConfig['layout::wideFeed'] === true) {
      rules.push(
        '@media (min-width: 1162px) {',
        `main[${WIDE_FEED_ATTR}] { --mid-width: 880px; }`,
        // Keep the empty sidebar measurable so newly visible content can restore it.
        `main[${WIDE_FEED_ATTR}] > [class*="_side_"] { width: 0 !important; ` +
          'margin-left: 0 !important; overflow: hidden !important; }',
        '}'
      );
    }
    if (safeConfig['cleanup::favoriteStatic'] === true) {
      rules.push(`${roleSelector('favorite-static')} { position: static !important; top: auto !important; }`);
    }
    if (safeConfig['cleanup::favoriteTags'] === true) {
      rules.push(
        `[${FAVORITE_HIDDEN_ATTR}] { display: none !important; }`,
        `[${OWNED_ATTR}="favorite-toggle"] { margin: 0 18px 14px; padding: 4px 12px; ` +
          'border: 1px solid var(--w-dividing-line, #d8dee4); border-radius: 14px; ' +
          'background: var(--w-card-background, #fff); color: var(--w-brand, #ff8200); ' +
          'font: inherit; font-size: 12px; cursor: pointer; }',
        `[${OWNED_ATTR}="favorite-toggle"]:disabled { cursor: default; color: var(--w-sub, #656d76); }`
      );
    }
    return rules.join('\n');
  };

  if (globalThis.__YYAWF_TEST_MODE__ === true) {
    globalThis.__YYAWF_TEST_API__ = Object.freeze({
      isRecord,
      normalizeText,
      normalizeStringList,
      parseKeywordText,
      serializeKeywords,
      visibleFavoriteTagIndices,
      sanitizeConfig,
      resolveConfig,
      extractUserIdFromHref,
      profileUserIdFromPath,
      latestFeedPath,
      shouldRedirectToLatest,
      compileWorkPlan,
      filterDecision,
      parseBlacklistPage,
      migrateConfigStore,
      buildCleanupCss,
    });
    return;
  }

  const IS_SEARCH_PAGE = location.hostname === 's.weibo.com';
  let configStore = {};
  let activeProfileId = '';
  let activeConfig = {};
  let activePlan = compileWorkPlan({});
  let cleanupStyle = null;
  let observer = null;
  let scanFrame = 0;
  let fullScanPending = false;
  let consecutiveScanFailures = 0;
  let profileProbeTimer = 0;
  let profileMissingTimer = 0;
  let bootstrapGuardTimer = 0;
  let profileMissingSince = 0;
  let profileIdentityProvisional = false;
  let lastLocation = '';
  let started = false;
  let dialogState = null;
  let wideFeedSidebar = null;
  let wideFeedObserver = null;
  let blacklist = {
    profileId: '', ids: new Set(), updatedAt: 0, lastAttempt: 0, controller: null, error: '',
  };
  const settingsEntryBindings = new WeakSet();
  const dirtyRoots = new Set();
  const favoriteTagStates = new Map();
  let roleBatch = null;
  let filterBatch = null;

  const debug = (...args) => {
    if (activeConfig['about::debug'] === true) {
      console.debug('[yyawf]', ...args);
    }
  };

  const warn = (...args) => console.warn('[yyawf]', ...args);

  const clearBootstrapGuard = () => {
    if (bootstrapGuardTimer) {
      window.clearTimeout(bootstrapGuardTimer);
      bootstrapGuardTimer = 0;
    }
    document.documentElement?.removeAttribute(BOOTSTRAP_ATTR);
  };

  const armBootstrapGuard = () => {
    if (!document.documentElement) return;
    const hasStoredDomConfig = Object.entries(configStore).some(([profileId, config]) => (
      /^\d+$/.test(profileId) && compileWorkPlan(config).hasDomWork
    ));
    let exactHome = false;
    try {
      const url = new URL(location.href);
      exactHome = url.pathname === '/' && url.search === '';
    } catch {
      // The current location is always expected to be a valid Weibo URL.
    }
    if (activeProfileId && (!profileIdentityProvisional || !exactHome)) return;
    if (!hasStoredDomConfig) return;
    document.documentElement.setAttribute(BOOTSTRAP_ATTR, 'identity');
    bootstrapGuardTimer = window.setTimeout(clearBootstrapGuard, 1200);
  };

  const holdBootstrapGuardForRedirect = () => {
    if (!document.documentElement) return;
    if (bootstrapGuardTimer) window.clearTimeout(bootstrapGuardTimer);
    document.documentElement.setAttribute(BOOTSTRAP_ATTR, 'redirect');
    bootstrapGuardTimer = window.setTimeout(() => {
      latestRedirectPending = false;
      clearBootstrapGuard();
    }, 4000);
  };

  const readConfigStore = () => {
    try {
      const current = GM_getValue(CONFIG_KEY, null);
      const raw = isRecord(current) ? current : GM_getValue(MIGRATION_CONFIG_KEY, {});
      const { store, changed } = migrateConfigStore(raw);
      if (changed) {
        try {
          GM_setValue(CONFIG_KEY, store);
        } catch (error) {
          warn('合并推广热搜设置后无法保存；本次页面仍使用合并后的设置。', error);
        }
      }
      return store;
    } catch (error) {
      warn('读取设置失败；已保留页面中的当前设置。', error);
      return isRecord(configStore) ? configStore : {};
    }
  };

  const profileConfig = profileId => resolveConfig(configStore[String(profileId)] ?? {});

  const setActiveConfig = config => {
    activeConfig = resolveConfig(config);
    activePlan = compileWorkPlan(activeConfig, blacklist.ids);
  };

  const refreshActiveConfig = () => {
    setActiveConfig(profileConfig(activeProfileId));
    syncCleanupStyle();
    requestFullScan();
    refreshDialog();
  };

  const setConfigValue = (key, value) => {
    if (!KNOWN_KEYS.has(key)) return false;
    if (!/^\d+$/.test(activeProfileId) || profileIdentityProvisional) {
      showDialogMessage('尚未识别当前微博账号，请等待页面加载完成后重试。', true);
      refreshDialog();
      return false;
    }
    const latestStore = readConfigStore();
    const latestProfile = isRecord(latestStore[activeProfileId])
      ? latestStore[activeProfileId]
      : {};
    const previous = resolveConfig(latestProfile);
    const next = resolveConfig({ ...previous, [key]: value });
    if (JSON.stringify(previous) === JSON.stringify(next)) {
      configStore = latestStore;
      setActiveConfig(previous);
      syncCleanupStyle();
      requestFullScan();
      refreshDialog();
      return true;
    }

    const nextStore = {
      ...latestStore,
      [activeProfileId]: {
        ...latestProfile,
        ...next,
        [key]: next[key] ?? (FILTER_KEYS.includes(key) ? [] : false),
      },
    };

    try {
      GM_setValue(CONFIG_KEY, nextStore);
    } catch (error) {
      warn('保存设置失败；没有清空原有设置。', error);
      showDialogMessage('保存失败，请检查脚本管理器权限。', true);
      return false;
    }

    configStore = nextStore;
    setActiveConfig(profileConfig(activeProfileId));
    syncCleanupStyle();
    requestFullScan();
    refreshDialog();
    return true;
  };

  const discoverProfileId = () => {
    if (IS_SEARCH_PAGE) {
      const config = unsafeWindow.$CONFIG;
      const id = String(config?.uid ?? '');
      return String(config?.islogin) === '1' && /^[1-9]\d*$/.test(id) ? id : '';
    }
    const candidates = document.querySelectorAll
      ? [...document.querySelectorAll(
        'nav a[href^="/u/"], [role="navigation"] a[href^="/u/"], ' +
        'nav [usercard], [role="navigation"] [usercard]'
      )]
      : [];
    const profileImageLink = document.querySelector(
      'nav img[alt="profile"], [role="navigation"] img[alt="profile"]'
    )?.closest('a[href^="/u/"]');
    if (profileImageLink) candidates.unshift(profileImageLink);
    for (const candidate of candidates) {
      const id = extractUserIdFromHref(candidate.getAttribute('href'));
      if (id) return id;
      const usercard = candidate.getAttribute('usercard') ?? '';
      const cardId = usercard.match(/^\d+$/)?.[0] ?? usercard.match(/(?:^|&)id=(\d+)/)?.[1];
      if (cardId) return cardId;
    }
    return '';
  };

  const clearMissingProfile = expectedProfileId => {
    if (!activeProfileId || activeProfileId !== expectedProfileId) return;
    if (profileMissingTimer) {
      window.clearTimeout(profileMissingTimer);
      profileMissingTimer = 0;
    }
    debug('检测到退出登录，停止使用上一账号的配置', activeProfileId);
    activeProfileId = '';
    profileIdentityProvisional = false;
    homeBypassActive = false;
    profileMissingSince = 0;
    activateBlacklist();
    refreshActiveConfig();
    clearBootstrapGuard();
  };

  const updateProfileId = () => {
    const discovered = discoverProfileId();
    if (!discovered) {
      if (IS_SEARCH_PAGE && unsafeWindow.$CONFIG && String(unsafeWindow.$CONFIG.islogin) !== '1') {
        clearMissingProfile(activeProfileId);
        return;
      }
      const navigationReady = document.querySelector('nav, [role="navigation"]');
      const navigationShowsLogin = navigationReady && [...navigationReady.querySelectorAll(
        'a, button, [role="button"]'
      )].some(element => (
        ['登录', '立即登录'].includes(normalizeText(element.textContent)) ||
        /login/i.test(element.getAttribute('href') ?? '')
      ));
      if (!activeProfileId) return;
      if (!profileMissingSince) profileMissingSince = Date.now();
      if (navigationShowsLogin) {
        clearMissingProfile(activeProfileId);
        return;
      }
      if (!profileMissingTimer) {
        const expectedProfileId = activeProfileId;
        profileMissingTimer = window.setTimeout(() => {
          profileMissingTimer = 0;
          if (activeProfileId !== expectedProfileId) return;
          if (discoverProfileId()) {
            updateProfileId();
            return;
          }
          clearMissingProfile(expectedProfileId);
        }, Math.max(0, 5000 - (Date.now() - profileMissingSince)));
      }
      return;
    }
    const wasProvisional = profileIdentityProvisional;
    if (profileMissingTimer) {
      window.clearTimeout(profileMissingTimer);
      profileMissingTimer = 0;
    }
    profileIdentityProvisional = false;
    profileMissingSince = 0;
    if (discovered === activeProfileId) {
      if (wasProvisional) {
        activateBlacklist();
        refreshActiveConfig();
      }
      return;
    }
    if (activeProfileId) homeBypassActive = false;
    activeProfileId = discovered;
    debug('已识别当前账号', activeProfileId);
    activateBlacklist();
    refreshActiveConfig();
  };

  const ensureCleanupStyle = () => {
    if (cleanupStyle?.isConnected) return cleanupStyle;
    cleanupStyle = document.createElement('style');
    cleanupStyle.id = `${SCRIPT_PREFIX}-style`;
    cleanupStyle.setAttribute(OWNED_ATTR, 'style');
    (document.head || document.documentElement).append(cleanupStyle);
    return cleanupStyle;
  };

  function syncCleanupStyle() {
    if (!document.documentElement) return;
    const style = ensureCleanupStyle();
    const cleanupCss = buildCleanupCss(activeConfig);
    const css = [
      `html[${BOOTSTRAP_ATTR}="redirect"] main, ` +
        `html[${BOOTSTRAP_ATTR}="redirect"] aside { visibility: hidden !important; }`,
      `html[${BOOTSTRAP_ATTR}="identity"] article, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .wbpro-list > .item1, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .wbpro-list .item2, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] [class*="comment"] > .item1, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] [class*="comment"] > .item2, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .hotBand .wbpro-side-panel, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .hotBand [class*="side-panel"], ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .hot-band-container, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .card-wrap[action-type="feed_list_item"], ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .card-review[comment_id], ` +
        `html[${BOOTSTRAP_ATTR}="identity"] .card-user-b, html[${BOOTSTRAP_ATTR}="identity"] .card-user-c, ` +
        `html[${BOOTSTRAP_ATTR}="identity"] #pl_pic_feedlist .pic[node-type="box"] ` +
        `{ visibility: hidden !important; }`,
      `[${FILTER_ATTR}="true"] { display: none !important; }`,
      `html[${BLACKLIST_LOADING_ATTR}] article, html[${BLACKLIST_LOADING_ATTR}] .wbpro-list, ` +
        `html[${BLACKLIST_LOADING_ATTR}] .card-wrap[action-type="feed_list_item"], ` +
        `html[${BLACKLIST_LOADING_ATTR}] .card-review[comment_id], ` +
        `html[${BLACKLIST_LOADING_ATTR}] .card-user-b, html[${BLACKLIST_LOADING_ATTR}] .card-user-c, ` +
        `html[${BLACKLIST_LOADING_ATTR}] #pl_pic_feedlist .pic[node-type="box"] ` +
        `{ visibility: hidden !important; }`,
      // Both feed and comment DynamicScroller items need a positive integer height.
      `.wbpro-scroller-item:has(> article[${FILTER_ATTR}="true"], ` +
        `> .wbpro-list > :is(.item1, .item2)[${FILTER_ATTR}="true"]) { min-height: 1px !important; }`,
      cleanupCss,
    ].filter(Boolean).join('\n');
    if (style.textContent !== css) style.textContent = css;
  }

  const markRole = (element, role) => {
    if (!(element instanceof Element)) return;
    if (roleBatch) {
      const roles = roleBatch.get(element) ?? new Set();
      roles.add(role);
      roleBatch.set(element, roles);
      return;
    }
    const roles = new Set((element.getAttribute(ROLE_ATTR) ?? '').split(/\s+/).filter(Boolean));
    if (roles.has(role)) return;
    roles.add(role);
    element.setAttribute(ROLE_ATTR, [...roles].join(' '));
  };

  const markFiltered = (element, decision) => {
    if (!(element instanceof Element)) return;
    if (filterBatch) {
      filterBatch.set(element, decision);
      return;
    }
    if (!decision.hidden) {
      if (element.hasAttribute(FILTER_ATTR)) element.removeAttribute(FILTER_ATTR);
      if (element.hasAttribute(FILTER_REASON_ATTR)) element.removeAttribute(FILTER_REASON_ATTR);
      return;
    }
    const reason = `${decision.reason}:${decision.match}`;
    if (element.getAttribute(FILTER_ATTR) !== 'true') element.setAttribute(FILTER_ATTR, 'true');
    if (element.getAttribute(FILTER_REASON_ATTR) !== reason) {
      element.setAttribute(FILTER_REASON_ATTR, reason);
    }
  };

  const queryAll = (root, selector) => {
    if (!root?.querySelectorAll) return [];
    const matches = root instanceof Element && root.matches(selector) ? [root] : [];
    matches.push(...root.querySelectorAll(selector));
    return matches;
  };

  const reconcileFilterMarkers = (roots, desired) => {
    const elements = new Set(desired.keys());
    for (const root of roots) {
      queryAll(root, `[${FILTER_ATTR}], [${FILTER_REASON_ATTR}]`)
        .forEach(element => elements.add(element));
    }
    for (const element of elements) {
      if (!element.isConnected) continue;
      const decision = desired.get(element) ?? { hidden: false, reason: null, match: null };
      if (!decision.hidden) {
        if (element.hasAttribute(FILTER_ATTR)) element.removeAttribute(FILTER_ATTR);
        if (element.hasAttribute(FILTER_REASON_ATTR)) element.removeAttribute(FILTER_REASON_ATTR);
        continue;
      }
      const reason = `${decision.reason}:${decision.match}`;
      if (element.getAttribute(FILTER_ATTR) !== 'true') element.setAttribute(FILTER_ATTR, 'true');
      if (element.getAttribute(FILTER_REASON_ATTR) !== reason) {
        element.setAttribute(FILTER_REASON_ATTR, reason);
      }
    }
  };

  const reconcileRoleMarkers = (roots, desired) => {
    const elements = new Set(desired.keys());
    for (const root of roots) {
      queryAll(root, `[${ROLE_ATTR}]`).forEach(element => elements.add(element));
    }
    for (const element of elements) {
      if (!element.isConnected) continue;
      const value = [...(desired.get(element) ?? [])].join(' ');
      if (!value) {
        if (element.hasAttribute(ROLE_ATTR)) element.removeAttribute(ROLE_ATTR);
      } else if (element.getAttribute(ROLE_ATTR) !== value) {
        element.setAttribute(ROLE_ATTR, value);
      }
    }
  };

  const elementText = element => normalizeText(element?.textContent);

  const isPromotedHotSearchRow = row => {
    if (!(row instanceof Element)) return false;
    if (row.getAttribute('action-type') === 'realtimehot_ad') return true;
    if (
      row.querySelector(
        '.rank.top, .woo-font--top2, [class*="top2"], ' +
        '.wbpro-icon-doticon, .hot-band-tabs-list-item-top'
      ) || /^(顶|置顶)(?:\s|$|[:：])/.test(elementText(row))
    ) return true;
    if (queryAll(row, '.wbpro-tag, .hot-band-tabs-list-item-label')
      .some(label => HOT_PROMOTION_LABELS.has(elementText(label)))) return true;
    const rankText = elementText(row.querySelector('.rank, .hot-band-tabs-list-item-num'));
    return Boolean(rankText && !/^\d+$/.test(rankText));
  };

  const isAdLabel = element => (
    /(?:^|[\s_-])(ad|badge|label|mark|tag|tips?)(?:[\s_-]|$)/i.test(String(element.className ?? '')) &&
    AD_LABELS.has(elementText(element)) &&
    !element.closest('a[href*="/u/"], [usercard]') &&
    !element.querySelector('a[href*="/u/"], [usercard]')
  );

  const activeFilterDecision = input => filterDecision({ ...input, plan: activePlan });

  const exactTextElements = (values, root = document) => {
    const accepted = new Set(values);
    return queryAll(root,
      'a, button, span, h1, h2, h3, h4, li, ' +
      'div[role="button"], div[role="menuitem"], div[class*="tit"], div[class*="title"]'
    )
      .filter(element => accepted.has(elementText(element)));
  };

  const deepestExactTextElement = (values, root = document) => (
    exactTextElements(values, root).at(-1) ?? null
  );

  const closestAction = element => (
    element?.closest('button, a, [role="button"], li') ?? element
  );

  const closestToolbarAction = (element, boundary) => {
    const item = element?.closest('[class*="_item_"], [class~="woo-box-item-flex"]');
    if (item && boundary?.contains(item)) return item;
    const semantic = element?.closest('button, a, [role="button"], li');
    if (semantic && boundary?.contains(semantic)) return semantic;
    return element;
  };

  const nearestCard = element => {
    let current = element;
    for (let depth = 0; current && depth < 7; depth += 1, current = current.parentElement) {
      if (current.matches?.('.wbpro-side, [class*="SideCard"], [class*="side-card"], aside > div')) {
        return current;
      }
    }
    return element;
  };

  const collectUserIds = root => {
    const ids = new Set();
    if (!(root instanceof Element)) return [];
    const anchors = root.matches('a, [usercard]') ? [root] : [];
    anchors.push(...root.querySelectorAll('a[href], [usercard]'));
    for (const element of anchors) {
      const hrefId = extractUserIdFromHref(element.getAttribute('href'));
      if (hrefId) ids.add(hrefId);
      const usercard = element.getAttribute('usercard') ?? '';
      const cardId = usercard.match(/^\d+$/)?.[0] ?? usercard.match(/(?:^|&)id=(\d+)/)?.[1];
      if (cardId) ids.add(cardId);
    }
    return [...ids];
  };

  const collectFeedAuthorIds = article => {
    const ids = new Set();
    const headers = queryAll(article, 'header').filter(header => (
      header.closest('article') === article &&
      !header.closest(
        '.wbpro-feed-content, [class*="feed-content"], ' +
        '.wbpro-feed-reText, [class*="feed-reText"], footer'
      )
    ));
    for (const header of headers) {
      collectUserIds(header).forEach(id => ids.add(id));
    }

    for (const repost of queryAll(article, '.wbpro-feed-reText, [class*="feed-reText"]')) {
      const repostAuthor = repost.querySelector(
        ':scope > a[usercard], :scope > a[href*="/u/"], ' +
        ':scope > :first-child a[usercard], :scope > :first-child a[href*="/u/"]'
      );
      collectUserIds(repostAuthor).forEach(id => ids.add(id));
    }

    // Some feed variants do not expose a semantic header. Their first
    // usercard above the body belongs to the feed author. Never fall back to
    // usercards inside visible feed text, where they can be ordinary @ mentions.
    if (!ids.size) {
      const content = article.querySelector(
        '.wbpro-feed-content, [class*="feed-content"], .wbpro-feed-reText, [class*="feed-reText"]'
      );
      const firstUsercard = [...article.querySelectorAll('[usercard]')]
        .find(element => !content?.contains(element) && !element.closest('footer'));
      collectUserIds(firstUsercard).forEach(id => ids.add(id));
    }
    return [...ids];
  };

  const markNavigation = (root = document) => {
    const scopes = queryAll(root,
      'nav, [role="navigation"], [class*="TopNav"], [class*="top-nav"]'
    );
    const anchorSet = new Set();
    for (const scope of scopes) {
      scope.querySelectorAll('a[href]').forEach(anchor => anchorSet.add(anchor));
    }

    if (!anchorSet.size && root === document) {
      document.querySelectorAll('a[href]').forEach(anchor => {
        if (anchor.closest('main, article')) return;
        const rect = anchor.getBoundingClientRect?.();
        if (rect && rect.top >= 0 && rect.top < 90) anchorSet.add(anchor);
      });
    }

    for (const anchor of anchorSet) {
      let url;
      try {
        url = new URL(anchor.getAttribute('href'), anchor.baseURI || location.href);
      } catch {
        continue;
      }
      if (url.hostname === 'game.weibo.com' || url.hostname.endsWith('.game.weibo.com')) {
        if (activeConfig['cleanup::navGame'] === true) markRole(anchor, 'nav-game');
        continue;
      }
      if (url.hostname !== 'weibo.com' && !url.hostname.endsWith('.weibo.com')) continue;

      const path = url.pathname.replace(/\/+$/, '') || '/';
      if (
        path === '/' &&
        (
          anchor.getAttribute('title') === '首页' ||
          anchor.getAttribute('aria-label') === '首页' ||
          anchor.querySelector('[aria-label="首页"]')
        )
      ) {
        if (activeConfig['cleanup::navHome'] === true) markRole(anchor, 'nav-home');
      } else if (path === '/hot') {
        if (activeConfig['cleanup::navHot'] === true) markRole(anchor, 'nav-hot');
      } else if (path === '/tv') {
        if (activeConfig['cleanup::navTv'] === true) markRole(anchor, 'nav-tv');
      } else if (
        path === '/at/weibo' || path.startsWith('/message') ||
        (IS_SEARCH_PAGE && anchor.querySelector('[aria-label="消息"]'))
      ) {
        if (activeConfig['cleanup::navMessage'] === true) markRole(anchor, 'nav-message');
      }
      else if (/^\/u\/\d+$/.test(path) || (IS_SEARCH_PAGE && anchor.querySelector('img[alt="profile"]'))) {
        const navUserId = path.match(/^\/u\/(\d+)$/)?.[1] ?? '';
        if (activeProfileId && !IS_SEARCH_PAGE) {
          if (navUserId !== activeProfileId) continue;
        } else if (!anchor.querySelector('img[alt="profile"]')) continue;
        if (activeConfig['cleanup::navProfile'] === true) markRole(anchor, 'nav-profile');
        if (activeConfig['cleanup::navAvatar'] === true) {
          anchor.querySelectorAll('img').forEach(image => {
            markRole(image, 'nav-avatar');
            const shell = image.closest('.woo-badge-box') ?? image.parentElement;
            if (shell) markRole(shell, 'nav-avatar-shell');
          });
        }
      }
    }

    if (activeConfig['cleanup::navDarkMode'] !== true && activeConfig['cleanup::navAria'] !== true) return;
    for (const scope of scopes) {
      queryAll(scope, '[title], [aria-label]').forEach(element => {
        const label = normalizeText(
          element.getAttribute('aria-label') || element.getAttribute('title')
        );
        if (
          activeConfig['cleanup::navDarkMode'] === true &&
          ['深色模式', '浅色模式', '日间模式', '夜间模式'].includes(label)
        ) {
          markRole(closestAction(element), 'nav-dark-mode');
        }
        if (
          activeConfig['cleanup::navAria'] === true &&
          ['无障碍', '无障碍浏览'].includes(label)
        ) {
          markRole(closestAction(element), 'nav-aria');
        }
      });
      if (activeConfig['cleanup::navDarkMode'] === true) {
        for (const element of exactTextElements(['深色模式', '浅色模式', '日间模式', '夜间模式'], scope)) {
          markRole(closestAction(element), 'nav-dark-mode');
        }
      }
      if (activeConfig['cleanup::navAria'] === true) {
        for (const element of exactTextElements(['无障碍', '无障碍浏览'], scope)) {
          markRole(closestAction(element), 'nav-aria');
        }
      }
    }
  };

  const markSidebar = (root = document) => {
    const hotRoots = queryAll(root, '.hotBand');
    if (activeConfig['cleanup::hotSearch'] === true) {
      hotRoots.forEach(element => markRole(nearestCard(element), 'hot-search'));
    }
    if (activeConfig['cleanup::sideFooter'] === true) {
      queryAll(root, '.wbpro-side-copy').forEach(element => markRole(element, 'side-footer'));
    }

    for (const title of queryAll(root, '.wbpro-side-tit, [class*="side-tit"]')) {
      const text = elementText(title);
      if (activeConfig['cleanup::interested'] === true && text.includes('可能感兴趣')) {
        markRole(nearestCard(title), 'interested');
      }
      if (activeConfig['cleanup::creatorCenter'] === true && text.includes('创作者中心')) {
        markRole(nearestCard(title), 'creator-center');
      }
      if (activeConfig['cleanup::service'] === true && text.includes('常用功能')) {
        markRole(nearestCard(title), 'service');
      }
      if (
        activeConfig['cleanup::followRecom'] === true &&
        (text.includes('关注推荐') || text.includes('推荐关注'))
      ) {
        markRole(nearestCard(title), 'follow-recommendation');
      }
    }

    const headings = [
      [['可能感兴趣的人', '你可能感兴趣', '你可能感兴趣的人'], 'interested'],
      [['创作者中心'], 'creator-center'],
      [['常用功能'], 'service'],
      [['关注推荐', '推荐关注'], 'follow-recommendation'],
    ];
    const enabledHeadings = headings.filter(([, role]) => {
      const cleanupKey = {
        interested: 'cleanup::interested',
        'creator-center': 'cleanup::creatorCenter',
        service: 'cleanup::service',
        'follow-recommendation': 'cleanup::followRecom',
      }[role];
      return activeConfig[cleanupKey] === true;
    });
    const headingMatches = enabledHeadings.length
      ? exactTextElements(enabledHeadings.flatMap(([labels]) => labels), root)
        .map(element => ({ element, text: elementText(element) }))
      : [];
    for (const [labels, role] of enabledHeadings) {
      for (const { element, text } of headingMatches) {
        if (!labels.includes(text)) continue;
        const card = nearestCard(element);
        if (card !== element || element.matches('.wbpro-side')) markRole(card, role);
      }
    }

    const promotedEnabled = activeConfig[PROMOTED_HOT_SEARCH_KEY] === true;
    for (const root of hotRoots) {
      const rows = root.querySelectorAll('.wbpro-side-panel, [class*="side-panel"]');
      for (const row of rows) {
        if (promotedEnabled && isPromotedHotSearchRow(row)) markRole(row, 'hot-promoted');
        if (activePlan.keywords.length) {
          markFiltered(row, activeFilterDecision({ text: elementText(row) }));
        } else if (row.hasAttribute(FILTER_ATTR)) {
          markFiltered(row, { hidden: false, reason: null, match: null });
        }
      }
    }
  };

  const markFeedCleanup = article => {
    const toolbarEnabled = ['cleanup::feedRetweet', 'cleanup::feedLike', 'cleanup::feedQr']
      .some(key => activeConfig[key] === true);
    const semanticFooter = toolbarEnabled ? article.querySelector('footer') : null;
    const footer = semanticFooter ?? article;
    const retweetSelectors = [
      'i[title="转发"]',
      'button[title="转发"]',
      '[aria-label*="转发"]',
    ];
    const likeSelectors = [
      'i[title="赞"]',
      'button[title="赞"]',
      'i[title="点赞"]',
      'button[title="点赞"]',
      '[aria-label*="点赞"]',
    ];
    if (activeConfig['cleanup::feedRetweet'] === true) {
      for (const selector of retweetSelectors) {
        footer.querySelectorAll(selector)
          .forEach(element => markRole(closestToolbarAction(element, footer), 'feed-retweet'));
      }
    }
    if (activeConfig['cleanup::feedLike'] === true) {
      for (const selector of likeSelectors) {
        footer.querySelectorAll(selector)
          .forEach(element => markRole(closestToolbarAction(element, footer), 'feed-like'));
      }
    }

    if (activeConfig['cleanup::feedQr'] === true) {
      semanticFooter?.querySelectorAll(
        '[title*="二维码"], [aria-label*="二维码"], ' +
        '[class*="qrcode" i], [class*="_qr_" i], [class~="qr"]'
      )
        .forEach(element => markRole(closestAction(element), 'feed-qr'));
      for (const toolbar of footer.querySelectorAll(':scope > .woo-box-flex')) {
        const extra = toolbar.children[1];
        if (extra && elementText(extra).includes('分享这条博文')) {
          markRole(extra, 'feed-qr');
        }
      }
    }

    if (
      activeConfig['cleanup::feedSource'] === true ||
      activeConfig['cleanup::translate'] === true
    ) {
      for (const element of article.querySelectorAll(
        'span, a, small, button, [role="button"], ' +
        'div[class*="_source_"], div[class*="_from_"], div[class*="translate" i]'
      )) {
        const text = elementText(element);
        const insideContent = Boolean(element.closest(
          '.wbpro-feed-content, [class*="feed-content"], ' +
          '.wbpro-feed-reText, [class*="feed-reText"]'
        ));
        if (
          !insideContent &&
          activeConfig['cleanup::feedSource'] === true &&
          /^来自(?:\s|$)/.test(text)
        ) {
          markRole(element, 'feed-source');
        }
        if (
          activeConfig['cleanup::translate'] === true &&
          (text === '翻译' || text === '查看翻译') &&
          (
            !insideContent ||
            element.matches('button, [role="button"], [class*="translate" i]')
          )
        ) {
          markRole(closestAction(element), 'translate');
        }
      }
    }

    if (activeConfig['cleanup::feedFollow'] === true) {
      const heads = queryAll(
        article,
        'header, [class*="feed-head" i], [class*="head-info" i], [class*="_head_"]'
      ).filter(head => (
        head.closest('article') === article &&
        !head.closest('.wbpro-feed-content, [class*="feed-content"]')
      ));
      for (const head of heads) {
        for (const button of head.querySelectorAll('button, [role="button"]')) {
          if (elementText(button) === '关注') markRole(button, 'feed-follow');
        }
      }
    }

    if (activeConfig['cleanup::ad'] === true) {
      const contentSelector = '.wbpro-feed-content, [class*="feed-content"], ' +
        '.wbpro-feed-reText, [class*="feed-reText"], .item1, .item2';
      for (const element of queryAll(article,
        `${AD_METADATA_SELECTOR}, [title_source*="advert" i], [title_source*="广告"]`
      )) {
        if (element.closest('article') !== article) continue;
        // An embedded ad must not hide the surrounding ordinary post or replies.
        markRole(element === article || !element.closest(contentSelector) ? article : element, 'ad');
      }
      for (const head of queryAll(article,
        'header, [class*="feed-head" i], [class*="head-info" i], [class*="_head_"]'
      )) {
        if (head.closest('article') !== article || head.closest(contentSelector)) continue;
        if (queryAll(head, AD_LABEL_SELECTOR).some(isAdLabel)) {
          markRole(article, 'ad');
          break;
        }
      }
    }
  };

  const collectFeedFilterText = article => {
    const contentNodes = queryAll(
      article,
      '.wbpro-feed-content, [class*="feed-content"], ' +
      '.wbpro-feed-reText, [class*="feed-reText"]'
    ).filter((element, _index, all) => !all.some(other => other !== element && other.contains(element)));
    if (contentNodes.length) {
      const metadata = queryAll(
        article,
        '.wbpro-feed-title, [class*="feed-title" i], ' +
        '[class*="_source_"], [class*="_from_"], [title_source]'
      ).map(elementText);
      return normalizeText([...contentNodes.map(elementText), ...metadata].join(' '));
    }

    const text = [];
    const walker = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
    for (let node = walker.nextNode(); node; node = walker.nextNode()) {
      const parent = node.parentElement;
      if (!parent || parent.closest(
        'header, footer, button, [role="button"], [class*="toolbar" i]'
      )) continue;
      text.push(node.data);
    }
    return normalizeText(text.join(' '));
  };

  const markFeeds = (root = document) => {
    const cleanupEnabled = WORK_KEYS.feeds.some(key => (
      key !== 'cleanup::feedEmptyTip' && activeConfig[key] === true
    ));
    for (const article of queryAll(root, 'article')) {
      if (cleanupEnabled) markFeedCleanup(article);
      const dialog = article.closest(
        '[role="dialog"], .woo-dialog-main, [class*="modal" i], [class*="dialog" i]'
      );
      const editHistory = dialog && exactTextElements(
        ['编辑记录', '编辑历史'],
        dialog
      ).length > 0;
      const decision = activePlan.hasFilter && !editHistory
        ? activeFilterDecision({
          text: activePlan.keywords.length ? collectFeedFilterText(article) : '',
          userIds: activePlan.blockedIds.size ? collectFeedAuthorIds(article) : [],
        })
        : { hidden: false, reason: null, match: null };
      markFiltered(article, decision);
    }

    if (
      activeConfig['cleanup::feedEmptyTip'] === true &&
      !(root instanceof Element && root.closest('article, .item1, .item2'))
    ) {
      const labels = new Set(['已刷完', '暂时没有更多内容', '暂无更多微博']);
      const hasFeedContent = Boolean(root.querySelector('article, .item1, .item2'));
      for (const element of queryAll(root, 'div, p, span')) {
        if (hasFeedContent && element.closest('article, .item1, .item2')) continue;
        if (!labels.has(elementText(element))) continue;
        markRole(element.closest('div') ?? element, 'feed-empty-tip');
      }
    }
  };

  const markComments = (root = document) => {
    const commentItems = queryAll(root,
      '.wbpro-list > .item1, .wbpro-list .item2, ' +
      '[class*="comment"] > .item1, [class*="comment"] > .item2'
    ).filter(item => item.querySelector('.con1 > .text'));
    for (const item of commentItems) {
      const textNode = item.querySelector(
        ':scope > .item1in > .con1 > .text, :scope > .item2in > .con1 > .text, ' +
        ':scope > .con1 > .text, .con1 > .text, .text'
      );
      const avatarAuthor = item.querySelector(
        ':scope > .item1in > :first-child a[href*="/u/"], ' +
        ':scope > .item2in > :first-child a[href*="/u/"]'
      );
      const nameCandidate = textNode?.querySelector(
        ':scope > a[href*="/u/"]:first-child, :scope > [usercard]:first-child'
      );
      const nameAuthor = /^[：:]/.test(normalizeText(nameCandidate?.nextSibling?.textContent))
        ? nameCandidate
        : null;
      const authorNode = avatarAuthor ?? nameAuthor ?? null;
      const decision = activeFilterDecision({
        text: activePlan.keywords.length && !location.pathname.startsWith('/at/weibo')
          ? elementText(textNode) : '',
        userIds: activePlan.blockedIds.size && authorNode ? collectUserIds(authorNode) : [],
      });
      markFiltered(item, decision);

      if (activeConfig['cleanup::feedRetweet'] === true) {
        item.querySelectorAll('i[title="转发"], button[title="转发"], [aria-label*="转发"]')
          .forEach(element => markRole(closestToolbarAction(element, item), 'comment-retweet'));
      }
      if (activeConfig['cleanup::feedLike'] === true) {
        item.querySelectorAll('i[title="赞"], button[title="赞"], i[title="点赞"], button[title="点赞"], [aria-label*="点赞"]')
          .forEach(element => markRole(closestToolbarAction(element, item), 'comment-like'));
      }
    }
  };

  const markSearchPage = (root = document) => {
    if (activePlan.feeds) {
      for (const card of queryAll(root, '.card-wrap[action-type="feed_list_item"]')) {
        const feed = card.querySelector('.card-feed');
        if (!feed) continue;
        const userIds = activePlan.blockedIds.size ? [...new Set(queryAll(feed,
          ':scope > .avator > a, :scope > .content > .info a.name, ' +
          '[node-type="feed_list_forwardContent"] > a.name'
        ).flatMap(collectUserIds))] : [];
        const text = activePlan.keywords.length ? queryAll(feed,
          '[node-type="feed_list_content"], [node-type="feed_list_content_full"], ' +
          ':scope > .content > .from, .card-comment .func > .from'
        ).map(elementText).join(' ') : '';
        markFiltered(card, activeFilterDecision({ text, userIds }));
        if (activePlan.ads) {
          for (const element of queryAll(card, AD_METADATA_SELECTOR)) {
            if (element.closest('.card-review')) continue;
            const embedded = element.closest(
              '[node-type="feed_list_content"], [node-type="feed_list_content_full"], .card-comment'
            );
            markRole(embedded ? element : card, 'ad');
          }
          const headings = queryAll(card, ':scope > .card-top, :scope > .card-head, ' +
            '.card-feed > .content > .info, .card-feed > .content > .from');
          if (headings.some(head => queryAll(head, AD_LABEL_SELECTOR).some(element => (
            !element.closest('a.name, .card-comment, .card-review') &&
            !element.querySelector('a.name') && isAdLabel(element)
          )))) markRole(card, 'ad');
        }
      }
    }

    if (activePlan.comments) {
      for (const item of queryAll(root, '.card-review[comment_id]')) {
        const text = item.querySelector(':scope > .content > .txt');
        const author = item.querySelector(':scope > .avator > a') ?? text?.querySelector(':scope > a.name');
        markFiltered(item, activeFilterDecision({
          text: activePlan.keywords.length ? elementText(text) : '',
          userIds: activePlan.blockedIds.size ? collectUserIds(author) : [],
        }));
      }
    }

    if (activePlan.hasFilter) {
      for (const item of queryAll(root, '.card-user-b, .card-user-c')) {
        const author = item.querySelector(':scope > .avator > a');
        const uid = item.querySelector('[action-type="userFollow"][uid]')?.getAttribute('uid');
        markFiltered(item, activeFilterDecision({
          text: activePlan.keywords.length ? elementText(item.querySelector(':scope > .info')) : '',
          userIds: activePlan.blockedIds.size ? [
            ...collectUserIds(author), ...(/^\d+$/.test(uid ?? '') ? [uid] : []),
          ] : [],
        }));
      }
      for (const item of queryAll(root, '#pl_pic_feedlist .pic[node-type="box"]')) {
        markFiltered(item, activeFilterDecision({
          text: activePlan.keywords.length ? elementText(item) : '',
          userIds: activePlan.blockedIds.size
            ? collectUserIds(item.querySelector('.detail > .avator > a')) : [],
        }));
      }
    }

    const promotedEnabled = activeConfig[PROMOTED_HOT_SEARCH_KEY] === true;
    if (activePlan.keywords.length || promotedEnabled) {
      for (const row of queryAll(root, '.hot-band-tabs-list-item')) {
        if (promotedEnabled && isPromotedHotSearchRow(row)) markRole(row, 'hot-promoted');
        if (activePlan.keywords.length) {
          markFiltered(row, activeFilterDecision({
            text: elementText(row.querySelector('.hot-band-tabs-list-item-content-title')),
          }));
        }
      }
    }
  };

  const iconContainer = element => (
    element?.closest('.woo-icon-wrap') ??
    element?.closest('.woo-icon-main') ??
    element
  );

  const markIcons = (rootOrRoots = document) => {
    const roots = Array.isArray(rootOrRoots) ? rootOrRoots : [rootOrRoots];
    const findAll = selector => [...new Set(
      roots.flatMap(root => queryAll(root, selector))
    )];
    const assignments = new Map();
    const assign = (elements, role, maxSize = null) => {
      for (const element of elements.map(iconContainer).filter(Boolean)) {
        const rules = assignments.get(element) ?? [];
        rules.push({ role, maxSize });
        assignments.set(element, rules);
      }
    };

    if (activeConfig['cleanup::iconVerify'] === true) {
      assign(findAll(
        '.woo-icon-skinSpe, .woo-icon-skinSpe + .woo-icon-frames, ' +
        '.woo-icon--vred, .woo-icon--vorange, .woo-icon--vyellow, .woo-icon--vblue'
      ), 'icon-verify');
    }

    if (activeConfig['cleanup::iconVip'] === true) {
      assign(findAll(
        '.woo-icon-vipimg, img[alt*="VIP" i], img[title*="VIP" i]'
      ), 'icon-vip', 48);
    }

    if (activeConfig['cleanup::iconFans'] === true) {
      assign(findAll(
        '[class*="_fans_" i], img[alt*="铁粉"], img[alt*="钻粉"], img[title*="铁粉"], img[title*="钻粉"]'
      ), 'icon-fans', 32);
    }

    if (activeConfig['cleanup::iconOther'] === true) {
      assign(
        findAll('[class*="icon-list"] [class*="custom"], img[alt*="身份"]'),
        'icon-other',
        48
      );
    }

    // Read every size before writing any marker to avoid repeated layout flushes.
    const measurements = new Map();
    for (const [element, rules] of assignments) {
      if (rules.some(rule => rule.maxSize !== null)) {
        const rect = element.getBoundingClientRect?.();
        let width = rect?.width ?? 0;
        let height = rect?.height ?? 0;
        if (width <= 0 || height <= 0) {
          const computed = getComputedStyle(element);
          width = Number.parseFloat(computed.width) || width;
          height = Number.parseFloat(computed.height) || height;
        }
        measurements.set(element, { width, height });
      }
    }
    for (const [element, rules] of assignments) {
      const size = measurements.get(element);
      const existingRoles = new Set(
        (element.getAttribute(ROLE_ATTR) ?? '').split(/\s+/).filter(Boolean)
      );
      for (const { role, maxSize } of rules) {
        if (
          maxSize === null ||
          (size && size.width > 0 && size.height > 0 &&
            size.width <= maxSize && size.height <= maxSize) ||
          ((!size || size.width <= 0 || size.height <= 0) && existingRoles.has(role))
        ) {
          markRole(element, role);
        }
      }
    }
  };

  const markProfileHeader = (root = document) => {
    if (!profileUserIdFromPath(location.pathname)) return;
    const scope = root === document
      ? document
      : (root.closest?.('.woo-panel-main') ?? root.closest?.('main') ?? root);
    for (const banner of queryAll(scope, '.wbpro-pos')) {
      if (banner.closest('article')) continue;
      const header = banner.closest('.woo-panel-main') ?? banner.parentElement;
      if (
        !(header instanceof Element) ||
        !header.querySelector('[class*="_box1_"] [class*="_avatar2_"], [class*="_box1_"] > [class*="_avatar2_"]')
      ) continue;
      markRole(banner, 'profile-header');
      header.querySelectorAll('[class*="_box1_"]')
        .forEach(element => markRole(element, 'profile-box1'));
      header.querySelectorAll('[class*="_avatar2_"]')
        .forEach(element => markRole(element, 'profile-avatar'));
      header.querySelectorAll('[class*="_content_"]')
        .forEach(element => markRole(element, 'profile-content'));
      header.querySelectorAll('[class*="_box3_"]')
        .forEach(element => markRole(element, 'profile-actions'));
    }
  };

  const markLooseAds = (root = document) => {
    if (root instanceof Element && root.closest('article')) return;
    const selector = `${AD_METADATA_SELECTOR}, ${AD_LABEL_SELECTOR}`;
    let candidates;
    if (root.querySelector('article')) {
      // Feed ads are handled separately; do not traverse their descendants again.
      candidates = [];
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT, {
        acceptNode: element => element.matches('article') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT,
      });
      for (let element = root instanceof Element ? root : walker.nextNode(); element; element = walker.nextNode()) {
        if (element.matches(selector)) candidates.push(element);
      }
    } else {
      candidates = queryAll(root, selector);
    }
    for (const element of candidates) {
      if (!element.matches(AD_METADATA_SELECTOR) && !isAdLabel(element)) continue;
      const container = element.closest(
        '.wbpro-side-panel, [class*="side-panel"], ' +
        '[data-ad], [data-adid], [data-ad-id], [class*="ad-card" i], .wbpro-side'
      );
      if (container) markRole(container, 'ad');
    }
  };

  const directMenuRow = (element, menu) => {
    let row = element;
    while (row?.parentElement && row.parentElement !== menu) row = row.parentElement;
    return row?.parentElement === menu ? row : null;
  };

  const menuActionForText = (element) => {
    const selector = 'button, a, [role="button"], li';
    if (element?.matches?.(selector)) return element;
    return element?.querySelector?.(selector) ?? closestAction(element);
  };

  const bindSettingsEntry = action => {
    if (!action || settingsEntryBindings.has(action)) return;
    const activate = event => {
      event.preventDefault();
      event.stopImmediatePropagation();
      openDialog(action);
    };
    action.addEventListener('click', activate, true);
    action.addEventListener('keydown', event => {
      if (event.key !== 'Enter' && event.key !== ' ') return;
      activate(event);
    }, true);
    if (!action.matches('button, a, [tabindex]')) action.tabIndex = 0;
    settingsEntryBindings.add(action);
  };

  const ensureSettingsEntry = () => {
    const navigationRoots = [...document.querySelectorAll('nav, [role="navigation"]')];
    const logout = navigationRoots
      .flatMap(root => exactTextElements(['退出', '退出登录'], root))
      .map(element => menuActionForText(element))
      .find(element => element?.closest('.woo-pop-main, .woo-pop-wrap-main, [role="menu"]'));
    const menu = logout?.closest('.woo-pop-wrap-main, [role="menu"]');
    const logoutRow = menu && directMenuRow(logout, menu);
    if (!menu || !logoutRow) return;

    const candidates = exactTextElements(['药方设置'], menu)
      .map(element => ({
        element,
        item: element.closest('a, span, li') ?? element,
        row: directMenuRow(element, menu),
      }));
    let existing = candidates.find(candidate => (
      candidate.row &&
      candidate.row !== logoutRow &&
      elementText(candidate.element) === '药方设置'
    ));
    if (
      existing &&
      existing.row.querySelectorAll('*').length < logoutRow.querySelectorAll('*').length
    ) {
      existing = null;
    }

    const rowsRemoved = new Set();
    for (const candidate of candidates) {
      if (existing && candidate.row === existing.row) continue;
      if (candidate.row && candidate.row !== logoutRow) {
        if (!rowsRemoved.has(candidate.row)) candidate.row.remove();
        rowsRemoved.add(candidate.row);
      } else if (candidate.item && !/^(退出|退出登录)$/.test(elementText(candidate.item))) {
        candidate.item.remove();
      }
    }
    for (const owned of menu.querySelectorAll(`[${OWNED_ATTR}="settings-entry"]`)) {
      const row = directMenuRow(owned, menu);
      if (existing && row === existing.row) continue;
      if (row && row !== logoutRow) row.remove();
      else owned.remove();
    }

    if (existing?.row?.isConnected) {
      existing.row.setAttribute(OWNED_ATTR, 'settings-entry');
      const action = menuActionForText(existing.element);
      if (action) {
        if (elementText(action) !== '药方设置') action.textContent = '药方设置';
        bindSettingsEntry(action);
      }
      return;
    }

    const entryRow = logoutRow.cloneNode(true);
    for (const element of [entryRow, ...entryRow.querySelectorAll('*')]) {
      element.removeAttribute?.('id');
      element.removeAttribute?.('href');
      element.removeAttribute?.('target');
      element.removeAttribute?.(OWNED_ATTR);
      for (const attribute of [...(element.attributes ?? [])]) {
        if (attribute.name.startsWith('__yawf_event_')) element.removeAttribute(attribute.name);
        if (/^on/i.test(attribute.name)) element.removeAttribute(attribute.name);
        if (
          /^(?:aria-label|title)$/i.test(attribute.name) &&
          /^(?:退出|退出登录)$/.test(normalizeText(attribute.value))
        ) {
          element.setAttribute(attribute.name, '药方设置');
        }
        if (
          /^(?:data-(?:action|command|cmd|event)|name|value)$/i.test(attribute.name) &&
          /(?:logout|log-out|signout|sign-out|exit|退出)/i.test(attribute.value)
        ) {
          element.removeAttribute(attribute.name);
        }
      }
    }
    const entryLabel = deepestExactTextElement(['退出', '退出登录'], entryRow);
    const entryAction = menuActionForText(entryLabel) ??
      entryRow.querySelector('button, a, [role="button"], li');
    if (!entryAction || !entryLabel) return;
    entryLabel.textContent = '药方设置';
    entryRow.setAttribute(OWNED_ATTR, 'settings-entry');
    bindSettingsEntry(entryAction);
    menu.insertBefore(entryRow, logoutRow);
  };

  const hasSidebarContent = element => {
    const style = getComputedStyle(element);
    if (style.display === 'none' || style.contentVisibility === 'hidden') return false;
    // Do not use box dimensions: the empty sidebar is zero-width while widened.
    // Displayed content must still be detected when a module is restored or added.
    if (style.visibility !== 'hidden' && style.visibility !== 'collapse') {
      if ([...element.childNodes].some(node => (
        node.nodeType === Node.TEXT_NODE && normalizeText(node.nodeValue)
      ))) return true;
      if (element.matches(
        'img, svg, video, canvas, iframe, object, embed, input, select, textarea, button'
      )) return true;
      if (style.backgroundImage !== 'none') return true;
      if (!element.children.length && ['::before', '::after'].some(pseudo => {
        const decoration = getComputedStyle(element, pseudo);
        return decoration.display !== 'none' && decoration.visibility === 'visible' &&
          !['none', 'normal', '""', "''"].includes(decoration.content);
      })) return true;
    }
    return [...element.children].some(hasSidebarContent);
  };

  const sidebarVisibilityStyle = value => String(value ?? '').match(
    /(?:^|;)\s*(?:display|visibility|content-visibility|background-image)\s*:[^;]*/gi
  )?.join(';') ?? '';

  const syncWideFeedLayout = (roots = [document]) => {
    const path = location.pathname.replace(/\/$/, '') || '/';
    const enabled = activePlan.wideFeed && !IS_SEARCH_PAGE &&
      ['/', '/mygroups', '/u/favorites'].includes(path);
    const main = enabled ? document.querySelector('main:has(> [class*="_full_"])') : null;
    const sidebar = main?.querySelector(':scope > [class*="_side_"]:has(.rightSide)') ?? null;
    for (const previous of document.querySelectorAll(`[${WIDE_FEED_ATTR}]`)) {
      if (previous !== main || !sidebar) previous.removeAttribute(WIDE_FEED_ATTR);
    }
    if (sidebar !== wideFeedSidebar) {
      wideFeedObserver?.disconnect();
      wideFeedObserver = null;
      wideFeedSidebar = sidebar;
      if (sidebar) {
        // The existing observer handles content/classes. Watch only visibility
        // styles here; ignore sticky-position and height changes during scrolling.
        wideFeedObserver = new MutationObserver(records => {
          if (records.some(record => record.attributeName === 'hidden' ||
            sidebarVisibilityStyle(record.oldValue) !== sidebarVisibilityStyle(record.target.getAttribute('style')))) {
            requestDirtyScan(sidebar);
          }
        });
        wideFeedObserver.observe(sidebar, {
          subtree: true, attributes: true, attributeOldValue: true, attributeFilter: ['style', 'hidden'],
        });
      }
    }
    if (!sidebar || !roots.some(root => root === document || root.contains(sidebar) || sidebar.contains(root))) return;
    const loaded = sidebar.querySelector('.wbpro-side, .wbpro-side-copy');
    main.toggleAttribute(WIDE_FEED_ATTR, Boolean(loaded) && !hasSidebarContent(sidebar));
  };

  const favoriteTagLists = root => queryAll(root, FAVORITE_LIST_SELECTOR).filter(list => (
    list.querySelector(':scope > [class*="_lall_"]') &&
    /^我的收藏[（(]/.test(elementText(list.parentElement.querySelector('[class*="_tt_"]')))
  ));

  const markFavoritePosition = root => {
    if (IS_SEARCH_PAGE || location.pathname.replace(/\/$/, '') !== '/u/favorites') return;
    for (const list of favoriteTagLists(root)) {
      const container = list.parentElement.parentElement;
      if (container?.matches('[class*="_sticky_"]')) markRole(container, 'favorite-static');
    }
  };

  const resetFavoriteTags = (list, state) => {
    for (const item of state.hidden) item.removeAttribute(FAVORITE_HIDDEN_ATTR);
    state.resizeObserver?.disconnect();
    state.button.remove();
    favoriteTagStates.delete(list);
  };

  const updateFavoriteTagList = (list, state) => {
    // Measure the original flex layout only when this component changes.
    for (const item of state.hidden) item.removeAttribute(FAVORITE_HIDDEN_ATTR);
    state.hidden.clear();
    const items = [...list.children].filter(item => (
      item.matches('[class*="_litem_"], [class*="_lbtn_"]')
    ));
    const editing = Boolean(list.querySelector('[class*="_ledit_"], [class*="_lipt_"], input'));
    const style = getComputedStyle(list);
    const availableWidth = list.clientWidth -
      (Number.parseFloat(style.paddingLeft) || 0) - (Number.parseFloat(style.paddingRight) || 0);
    state.width = availableWidth;
    const gap = Number.parseFloat(style.columnGap) || 0;
    const required = items.flatMap((item, index) => (
      index < 2 || item.matches('[class*="_lcurr_"], [class*="_lbtn_"]') ? [index] : []
    ));
    const visible = visibleFavoriteTagIndices(
      items.map(item => item.getBoundingClientRect().width), availableWidth, gap, required
    );
    const expanded = state.expanded || editing;
    if (!expanded) {
      items.forEach((item, index) => {
        if (visible.has(index)) return;
        item.setAttribute(FAVORITE_HIDDEN_ATTR, '');
        state.hidden.add(item);
      });
    }
    const hiddenCount = items.length - visible.size;
    state.button.hidden = hiddenCount === 0;
    state.button.disabled = editing;
    state.button.setAttribute('aria-expanded', String(expanded));
    const label = editing ? '编辑中，已展开标签' : expanded ? '收起标签' : `展开其余 ${hiddenCount} 个标签`;
    if (state.button.textContent !== label) state.button.textContent = label;
    if (state.button.parentElement !== list.parentElement) list.after(state.button);
  };

  const syncFavoriteTags = roots => {
    const enabled = activePlan.favoriteTags && !IS_SEARCH_PAGE &&
      location.pathname.replace(/\/$/, '') === '/u/favorites';
    for (const [list, state] of favoriteTagStates) {
      if (!enabled || !list.isConnected) resetFavoriteTags(list, state);
    }
    if (!enabled) return;
    for (const root of roots) {
      if (root !== document && !root.isConnected) continue;
      for (const list of favoriteTagLists(root)) {
        if (favoriteTagStates.has(list)) continue;
        const button = document.createElement('button');
        button.type = 'button';
        button.setAttribute(OWNED_ATTR, 'favorite-toggle');
        const state = { button, expanded: false, hidden: new Set(), width: 0, resizeObserver: null };
        button.addEventListener('click', () => {
          state.expanded = !state.expanded;
          requestDirtyScan(list);
        });
        if (typeof ResizeObserver === 'function') {
          state.resizeObserver = new ResizeObserver(entries => {
            const width = entries[0]?.contentRect.width ?? 0;
            if (Math.abs(width - state.width) < 1) return;
            state.width = width;
            requestDirtyScan(list);
          });
          state.resizeObserver.observe(list);
        }
        favoriteTagStates.set(list, state);
      }
    }
    for (const [list, state] of favoriteTagStates) {
      if (roots.some(root => root === document || root.contains(list) || list.contains(root))) {
        updateFavoriteTagList(list, state);
      }
    }
  };

  const DIRTY_UNIT_SELECTOR = [
    'article', '.wbpro-list > .item1', '.wbpro-list .item2',
    '[class*="comment"] > .item1', '[class*="comment"] > .item2',
    'nav', '[role="navigation"]', '[role="menu"]',
    '.woo-pop-main', '.woo-pop-wrap-main', '.hotBand', '.wbpro-side', '.rightSide', 'aside',
    '.wbpro-pos', '.woo-panel-main',
    '.card-wrap[action-type="feed_list_item"]', '.card-review[comment_id]',
    '.card-user-b', '.card-user-c', '#pl_pic_feedlist .pic[node-type="box"]', '.hot-band-container',
  ].join(', ');
  const HOME_BYPASS_KEY = `${SCRIPT_PREFIX}:allow-home-once`;
  const LATEST_REDIRECT_KEY = `${SCRIPT_PREFIX}:latest-redirect`;
  const MAX_DIRTY_ROOTS = 200;
  let settingsEntryPending = true;
  let homeBypassActive = false;
  let latestRedirectPending = false;
  let latestRedirectClearTimer = 0;
  let latestBounceActive = false;

  const queueScanFrame = () => {
    if (scanFrame || document.hidden) return;
    const schedule = window.requestAnimationFrame?.bind(window) ?? (callback => (
      window.setTimeout(() => callback(Date.now()), 0)
    ));
    scanFrame = schedule(() => {
      scanFrame = 0;
      scan();
    });
  };

  const requestFullScan = () => {
    fullScanPending = true;
    settingsEntryPending = true;
    queueScanFrame();
  };

  const dirtyRootForNode = node => {
    const element = node instanceof Element ? node : node?.parentElement;
    if (!element || element.closest?.(`[${OWNED_ATTR}]`)) return null;
    // Navigation submenus and hot-search rows need their enclosing classifier scope.
    const navigationRoot = element.closest('nav, [role="navigation"]');
    const dirtyUnit = navigationRoot ? null : element.closest(DIRTY_UNIT_SELECTOR);
    const hotSearchRoot = !navigationRoot && (
      element.matches?.('.hotBand, .hot-band-container')
        ? element
        : dirtyUnit?.matches?.('.wbpro-side')
          ? dirtyUnit.closest('.hotBand, .hot-band-container')
          : null
    );
    let root = navigationRoot ?? hotSearchRoot ?? dirtyUnit ??
      element.closest(`[${ROLE_ATTR}], [${FILTER_ATTR}]`) ?? element;
    if (root.matches?.('.wbpro-pos')) {
      root = root.closest('article') ?? root.closest('.woo-panel-main') ?? root;
    }
    return root;
  };

  const addScanRoot = (roots, root) => {
    for (const existing of roots) {
      if (existing === root || existing.contains?.(root)) return false;
      if (root.contains?.(existing)) roots.delete(existing);
    }
    roots.add(root);
    return true;
  };

  const addDirtyRoot = node => {
    const root = dirtyRootForNode(node);
    if (!root || !addScanRoot(dirtyRoots, root)) return false;
    if (dirtyRoots.size > MAX_DIRTY_ROOTS) {
      const roots = [...dirtyRoots];
      let common = roots.shift();
      for (const candidate of roots) {
        while (common?.parentElement && !common.contains(candidate)) {
          common = common.parentElement;
        }
      }
      dirtyRoots.clear();
      if (common && common !== document.body && common !== document.documentElement) {
        dirtyRoots.add(common);
      } else {
        fullScanPending = true;
      }
    }
    return true;
  };

  const primeVisualRoots = roots => {
    if (!activePlan.hasDomWork) return true;
    const connected = [...new Set(roots)].filter(root => root === document || root?.isConnected);
    if (!connected.length) return true;
    let succeeded = true;
    for (const root of connected) {
      const reconcileNow = root.matches?.('.hotBand, .hot-band-container');
      if (!reconcileNow) {
        if (!scanRoot(root)) succeeded = false;
        continue;
      }
      const desiredRoles = new Map();
      const desiredFilters = new Map();
      roleBatch = desiredRoles;
      filterBatch = desiredFilters;
      let rootSucceeded = false;
      try {
        // Hot-search lists are small and reuse rows. Reconcile this complete
        // component at the microtask checkpoint so its final layout is ready
        // before paint, without adding work to ordinary feed/comment mutations.
        rootSucceeded = scanRoot(root);
      } finally {
        roleBatch = null;
        filterBatch = null;
      }
      if (rootSucceeded) {
        reconcileRoleMarkers([root], desiredRoles);
        reconcileFilterMarkers([root], desiredFilters);
      } else {
        succeeded = false;
      }
    }
    return succeeded;
  };

  const requestDirtyScan = node => {
    if (addDirtyRoot(node)) queueScanFrame();
  };

  const consumeHomeBypass = () => {
    try {
      const raw = sessionStorage.getItem(HOME_BYPASS_KEY);
      sessionStorage.removeItem(HOME_BYPASS_KEY);
      const token = JSON.parse(raw ?? 'null');
      return Boolean(
        isRecord(token) && token.profileId === activeProfileId &&
        Number.isFinite(token.expiresAt) && token.expiresAt >= Date.now()
      );
    } catch {
      return false;
    }
  };

  const clearLatestRedirectToken = () => {
    if (latestRedirectClearTimer) {
      window.clearTimeout(latestRedirectClearTimer);
      latestRedirectClearTimer = 0;
    }
    try {
      sessionStorage.removeItem(LATEST_REDIRECT_KEY);
    } catch {
      // Session storage is only a loop guard; routing still works without it.
    }
  };

  const scheduleLatestRedirectTokenClear = () => {
    if (latestRedirectClearTimer) {
      window.clearTimeout(latestRedirectClearTimer);
      latestRedirectClearTimer = 0;
    }
    try {
      const raw = sessionStorage.getItem(LATEST_REDIRECT_KEY);
      const token = JSON.parse(raw ?? 'null');
      if (
        !isRecord(token) ||
        !Number.isFinite(token.expiresAt) || token.expiresAt < Date.now()
      ) {
        clearLatestRedirectToken();
        return;
      }
      // Keep the token through an immediate server/client bounce. Once the
      // latest-feed document has remained stable, a later Home visit is new.
      latestRedirectClearTimer = window.setTimeout(
        clearLatestRedirectToken,
        Math.max(0, token.expiresAt - Date.now())
      );
    } catch {
      clearLatestRedirectToken();
    }
  };

  const consumeLatestRedirectBounce = () => {
    try {
      const raw = sessionStorage.getItem(LATEST_REDIRECT_KEY);
      const token = JSON.parse(raw ?? 'null');
      if (!isRecord(token)) return false;
      if (latestRedirectClearTimer) {
        window.clearTimeout(latestRedirectClearTimer);
        latestRedirectClearTimer = 0;
      }
      sessionStorage.removeItem(LATEST_REDIRECT_KEY);
      return (
        token.profileId === activeProfileId &&
        Number.isFinite(token.expiresAt) && token.expiresAt >= Date.now()
      );
    } catch {
      return false;
    }
  };

  const rememberLatestRedirect = (target, profileId = activeProfileId) => {
    latestRedirectPending = true;
    if (latestRedirectClearTimer) {
      window.clearTimeout(latestRedirectClearTimer);
      latestRedirectClearTimer = 0;
    }
    try {
      sessionStorage.setItem(LATEST_REDIRECT_KEY, JSON.stringify({
        profileId,
        target,
        expiresAt: Date.now() + 10_000,
      }));
    } catch {
      // A missing loop token must not prevent the requested navigation.
    }
  };

  const latestFeedTarget = () => {
    const expectedPath = latestFeedPath(activeProfileId);
    if (!expectedPath) return '';
    // The gid is deterministic for the signed-in account. Reading it directly
    // avoids waiting for Weibo's sidebar link or the load event while the wrong
    // homepage is already visible.
    return new URL(expectedPath, location.href).href;
  };

  const maybeRedirectToLatest = () => {
    if (location.pathname !== '/') {
      homeBypassActive = false;
      latestRedirectPending = false;
      latestBounceActive = false;
      scheduleLatestRedirectTokenClear();
    }
    if (latestRedirectPending) return true;
    if (!shouldRedirectToLatest({
      href: location.href,
      profileId: activeProfileId,
      config: activeConfig,
    })) return false;
    if (profileIdentityProvisional) return false;
    if (latestBounceActive) {
      clearBootstrapGuard();
      return false;
    }
    holdBootstrapGuardForRedirect();
    if (homeBypassActive) {
      // SPA navigation keeps this script instance alive. Consume the fallback
      // token here so it cannot accidentally exempt a later homepage visit.
      sessionStorage.removeItem(HOME_BYPASS_KEY);
      clearBootstrapGuard();
      return false;
    }
    if (consumeHomeBypass()) {
      homeBypassActive = true;
      clearBootstrapGuard();
      return false;
    }
    const target = latestFeedTarget();
    if (!target) return false;
    if (consumeLatestRedirectBounce()) {
      latestBounceActive = true;
      debug('检测到最新微博反弹，保留当前首页以避免跳转循环');
      clearBootstrapGuard();
      return false;
    }
    debug('首页切换到最新微博', target);
    rememberLatestRedirect(target);
    location.replace(target);
    return true;
  };

  const handleRouteChange = () => {
    updateProfileId();
    if (maybeRedirectToLatest()) return;
    syncBlacklist(true);
    requestFullScan();
  };

  const installHistoryHooks = () => {
    let pageHistory;
    try {
      pageHistory = unsafeWindow?.history ?? history;
    } catch {
      pageHistory = history;
    }
    for (const method of ['pushState', 'replaceState']) {
      try {
        const original = pageHistory[method];
        if (typeof original !== 'function') continue;
        pageHistory[method] = function yyawfHistoryHook(...args) {
          const previous = location.href;
          const result = Reflect.apply(original, this, args);
          if (location.href !== previous) handleRouteChange();
          return result;
        };
      } catch (error) {
        warn(`无法监听 history.${method}；保留 DOM 与定时探针兜底。`, error);
      }
    }
  };

  const scanRoot = root => {
    let failed = false;
    const steps = [
      [activePlan.navigation, markNavigation],
      [activePlan.sidebar, markSidebar],
      [activePlan.feeds, markFeeds],
      [activePlan.comments, markComments],
      [IS_SEARCH_PAGE && activePlan.hasDomWork, markSearchPage],
      [activePlan.profile, markProfileHeader],
      [activePlan.favoriteStatic, markFavoritePosition],
      [!IS_SEARCH_PAGE && activePlan.ads, markLooseAds],
    ];
    for (const [enabled, classifier] of steps) {
      if (!enabled) continue;
      try {
        classifier(root);
      } catch (error) {
        failed = true;
        warn('页面组件处理失败。', error);
      }
    }
    return !failed;
  };

  const scan = () => {
    if (!document.documentElement || document.hidden) return;
    try {
      const href = location.href;
      if (href !== lastLocation) {
        lastLocation = href;
        fullScanPending = true;
        settingsEntryPending = true;
        debug('处理页面', href);
      }
      updateProfileId();
      if (maybeRedirectToLatest()) return;
      if (profileIdentityProvisional) return;

      const full = fullScanPending;
      fullScanPending = false;
      const roots = full ? [document] : [...dirtyRoots];
      dirtyRoots.clear();
      let failed = false;
      const desiredRoles = new Map();
      const desiredFilters = new Map();
      roleBatch = desiredRoles;
      filterBatch = desiredFilters;
      try {
        syncFavoriteTags(roots);
        if (activePlan.icons) {
          try {
            markIcons(roots);
          } catch (error) {
            failed = true;
            warn('身份图标处理失败。', error);
          }
        }
        for (const root of roots) {
          if (root !== document && !root.isConnected) continue;
          if (!scanRoot(root)) failed = true;
        }
      } finally {
        roleBatch = null;
        filterBatch = null;
      }
      if (!failed) {
        reconcileRoleMarkers(roots, desiredRoles);
        reconcileFilterMarkers(roots, desiredFilters);
        syncWideFeedLayout(roots);
        if (!blacklist.controller) document.documentElement.removeAttribute(BLACKLIST_LOADING_ATTR);
        if (activeProfileId && !shouldRedirectToLatest({
          href: location.href,
          profileId: activeProfileId,
          config: activeConfig,
        })) {
          clearBootstrapGuard();
        }
      }
      if (settingsEntryPending) {
        settingsEntryPending = false;
        try {
          ensureSettingsEntry();
        } catch (error) {
          failed = true;
          settingsEntryPending = true;
          warn('设置入口处理失败。', error);
        }
      }
      if (failed && consecutiveScanFailures < 2) {
        consecutiveScanFailures += 1;
        if (full) fullScanPending = true;
        else roots.forEach(addDirtyRoot);
        window.setTimeout(queueScanFrame, 50 * consecutiveScanFailures);
      } else if (!failed) {
        consecutiveScanFailures = 0;
      }
    } catch (error) {
      warn('页面处理失败；下一次 DOM 变化时会重试。', error);
    }
  };

  const fetchJson = async (url, externalSignal = null) => {
    const controller = new AbortController();
    const abort = () => controller.abort();
    if (externalSignal?.aborted) return null;
    externalSignal?.addEventListener('abort', abort, { once: true });
    const timer = window.setTimeout(() => controller.abort(), 8000);
    try {
      if (IS_SEARCH_PAGE) {
        return await new Promise(resolve => {
          const request = GM_xmlhttpRequest({
            method: 'GET',
            url: new URL(url, 'https://weibo.com/').href,
            headers: { Accept: 'application/json', Referer: 'https://weibo.com/' },
            responseType: 'json',
            timeout: 8000,
            onload: response => resolve(
              response.status >= 200 && response.status < 300 &&
              /^https:\/\/weibo\.com\//.test(response.finalUrl) ? response.response : null
            ),
            onerror: () => resolve(null),
            ontimeout: () => resolve(null),
            onabort: () => resolve(null),
          });
          const cancel = () => {
            request.abort();
            resolve(null);
          };
          controller.signal.addEventListener('abort', cancel, { once: true });
          if (controller.signal.aborted) cancel();
        });
      }
      const response = await fetch(url, {
        credentials: 'same-origin',
        signal: controller.signal,
        headers: { Accept: 'application/json' },
      });
      if (!response.ok) return null;
      return await response.json();
    } catch {
      return null;
    } finally {
      window.clearTimeout(timer);
      externalSignal?.removeEventListener('abort', abort);
    }
  };

  const activateBlacklist = () => {
    blacklist.controller?.abort();
    blacklist = {
      profileId: activeProfileId, ids: new Set(), updatedAt: 0,
      lastAttempt: 0, controller: null, error: '',
    };
    document.documentElement.removeAttribute(BLACKLIST_LOADING_ATTR);
    if (!activeProfileId || profileIdentityProvisional) return;
    try {
      const cached = GM_getValue(BLACKLIST_KEY_PREFIX + activeProfileId, null);
      if (
        isRecord(cached) && Number.isSafeInteger(cached.updatedAt) &&
        cached.updatedAt > 0 && cached.updatedAt <= Date.now() &&
        Array.isArray(cached.ids) && cached.ids.every(id => typeof id === 'string' && /^\d+$/.test(id))
      ) {
        blacklist.ids = new Set(cached.ids);
        blacklist.updatedAt = cached.updatedAt;
      }
    } catch (error) {
      warn('读取微博黑名单缓存失败。', error);
    }
    // On the first sync, classify cards before revealing them. Later visits use the cache.
    if (!blacklist.updatedAt) document.documentElement.setAttribute(BLACKLIST_LOADING_ATTR, '');
    syncBlacklist();
  };

  const syncBlacklist = async (force = false) => {
    const state = blacklist;
    if (
      !state.profileId || profileIdentityProvisional || state.controller ||
      (!force && Date.now() - state.lastAttempt < BLACKLIST_REFRESH_MS)
    ) return;
    const controller = new AbortController();
    state.controller = controller;
    let needsScan = !state.updatedAt;
    state.lastAttempt = Date.now();
    state.error = '';
    refreshDialog();
    // Bound the whole paginated sync, including the first-load visibility guard.
    const timeout = window.setTimeout(() => controller.abort(), 8000);
    try {
      const ids = new Set();
      const seen = new Set();
      let total = null;
      for (let page = 1; ; page += 1) {
        const json = await fetchJson(`/ajax/setting/getFilteredUsers?page=${page}`, controller.signal);
        if (state !== blacklist) return;
        if (controller.signal.aborted) throw new Error('同步微博黑名单超时。');
        const result = parseBlacklistPage(json, state.profileId);
        if (total === null) total = result.total;
        if (total !== result.total) throw new Error('同步期间微博黑名单发生变化，请刷新重试。');
        for (const entry of result.entries) {
          if (seen.has(entry.uid)) throw new Error('微博黑名单分页返回了重复用户，请刷新重试。');
          seen.add(entry.uid);
          if (entry.blocked) ids.add(entry.uid);
        }
        if (!result.hasMore) {
          if (seen.size !== total) throw new Error('微博黑名单分页不完整，请刷新重试。');
          break;
        }
        if (!result.entries.length || seen.size >= total) {
          throw new Error('微博黑名单分页无进展，请刷新重试。');
        }
      }
      const changed = ids.size !== state.ids.size || [...ids].some(id => !state.ids.has(id));
      state.ids = ids;
      state.updatedAt = Date.now();
      try {
        GM_setValue(BLACKLIST_KEY_PREFIX + state.profileId, {
          updatedAt: state.updatedAt, ids: [...ids],
        });
      } catch (error) {
        state.error = '已同步，但无法保存缓存；下次打开页面需要重新同步。';
        warn(state.error, error);
      }
      if (changed) {
        setActiveConfig(activeConfig);
        needsScan = true;
      }
    } catch (error) {
      if (state !== blacklist) return;
      state.error = state.updatedAt
        ? '同步失败，暂用上次黑名单；可点击刷新重试。'
        : '黑名单尚未同步，暂时无法屏蔽黑名单用户；请点击刷新重试。';
      warn(state.error, error);
    } finally {
      window.clearTimeout(timeout);
      if (state === blacklist) {
        state.controller = null;
        if (needsScan) requestFullScan();
        refreshDialog();
      }
    }
  };

  const dialogStyles = `
    :host { all: initial; color-scheme: light dark; }
    *, *::before, *::after { box-sizing: border-box; }
    .backdrop {
      position: fixed; inset: 0; z-index: 2147483646;
      display: grid; place-items: center; padding: 24px;
      background: rgb(0 0 0 / .48);
      font: 14px/1.5 -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      color: var(--w-main, #1f2328);
    }
    .dialog {
      width: min(780px, 100%); height: min(620px, 100%);
      display: grid; grid-template-rows: auto 1fr auto;
      overflow: hidden; border: 1px solid var(--w-dividing-line, #d0d7de); border-radius: 12px;
      background: var(--w-card, #fff); box-shadow: 0 18px 60px rgb(0 0 0 / .32);
    }
    header {
      display: flex; align-items: center; gap: 12px; padding: 14px 18px;
      border-bottom: 1px solid var(--w-dividing-line, #d8dee4);
    }
    h1 { flex: 1; margin: 0; font-size: 18px; }
    button, input { font: inherit; }
    button { cursor: pointer; }
    .icon-button {
      width: 32px; height: 32px; border: 0; border-radius: 6px;
      background: transparent; font-size: 22px; color: inherit;
    }
    .icon-button:hover { background: var(--w-hover, #f0f2f4); }
    .main { min-height: 0; display: grid; grid-template-columns: 150px 1fr; }
    .tabs {
      padding: 12px 0; border-right: 1px solid var(--w-dividing-line, #d8dee4);
      background: var(--w-repost-background, #f6f8fa);
    }
    .tab { width: 100%; border: 0; padding: 11px 18px; background: transparent; color: inherit; text-align: left; }
    .tab[aria-selected="true"] {
      color: #e14141; background: var(--w-card, #fff); font-weight: 650; box-shadow: 3px 0 #e14141 inset;
    }
    .panels { min-width: 0; overflow: auto; padding: 20px 24px; }
    .panel[hidden] { display: none; }
    h2 { margin: 0 0 14px; font-size: 17px; }
    h3 { margin: 18px 0 8px; font-size: 14px; }
    p { margin: 8px 0; }
    .muted { color: var(--w-sub, #656d76); font-size: 13px; }
    .form { display: flex; gap: 8px; margin: 8px 0 10px; position: relative; }
    input[type="text"] {
      min-width: 0; flex: 1; border: 1px solid var(--w-dividing-line, #afb8c1);
      border-radius: 6px; padding: 7px 9px; color: inherit; background: var(--w-card, #fff);
    }
    .keyword-transfer { margin: 12px 0 18px; }
    .keyword-transfer summary { cursor: pointer; }
    .keyword-batch {
      display: block; box-sizing: border-box; width: 100%; min-height: 100px; resize: vertical;
      border: 1px solid var(--w-dividing-line, #afb8c1); border-radius: 6px;
      padding: 8px; color: inherit; background: var(--w-card, #fff); font: inherit;
    }
    .keyword-file-label { display: block; margin-top: 10px; font-size: 13px; }
    .keyword-file { display: block; max-width: 100%; margin-top: 6px; font: inherit; }
    .keyword-actions { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 10px; }
    .secondary {
      border: 1px solid var(--w-dividing-line, #afb8c1); border-radius: 6px;
      padding: 7px 12px; color: inherit; background: transparent;
    }
    .secondary:disabled { opacity: .55; cursor: default; }
    .primary { border: 0; border-radius: 6px; padding: 7px 16px; color: #fff; background: #e14141; }
    .primary:disabled { opacity: .55; cursor: wait; }
    .chips { display: flex; flex-wrap: wrap; gap: 7px; min-height: 30px; padding: 0; list-style: none; }
    .chip {
      display: inline-flex; max-width: 100%; align-items: center; gap: 6px; padding: 4px 7px 4px 10px;
      border: 1px solid var(--w-dividing-line, #d0d7de);
      border-radius: 999px; background: var(--w-repost-background, #f6f8fa);
    }
    .chip span { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    .chip button { border: 0; background: transparent; color: var(--w-sub, #656d76); padding: 0 2px; }
    .grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 8px 14px; }
    .grid.single { grid-template-columns: minmax(0, 1fr); }
    .check { display: flex; align-items: center; gap: 7px; min-width: 0; }
    .check input { accent-color: #e14141; }
    .notice {
      padding: 10px 12px; border-left: 4px solid #d29922;
      background: var(--w-repost-background, #fff8c5); color: var(--w-main, inherit); border-radius: 4px;
    }
    a { color: #0969da; }
    footer {
      min-height: 46px; display: flex; align-items: center; gap: 12px; padding: 8px 18px;
      border-top: 1px solid var(--w-dividing-line, #d8dee4);
    }
    .status { flex: 1; color: #1a7f37; }
    .status.error { color: #cf222e; }
    .account { color: var(--w-sub, #656d76); font-size: 12px; }
    @media (prefers-color-scheme: dark) {
      .backdrop { color: #e6edf3; }
      .dialog, input[type="text"], .keyword-batch { background: #161b22; border-color: #30363d; }
      header, footer, .tabs { border-color: #30363d; }
      .tabs, .chip { background: #21262d; border-color: #30363d; }
      .tab[aria-selected="true"] { background: #161b22; }
      .icon-button:hover { background: #30363d; }
      .muted, .account { color: #8b949e; }
      .notice { background: #3b2e00; color: #f2cc60; }
    }
    @media (max-width: 620px) {
      .backdrop { padding: 0; }
      .dialog { width: 100%; height: 100%; border: 0; border-radius: 0; }
      .main { grid-template-columns: 112px 1fr; }
      .panels { padding: 16px; }
      .grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    }
  `;

  const createCheckbox = (container, key, label) => {
    const wrapper = document.createElement('label');
    wrapper.className = 'check';
    const input = document.createElement('input');
    input.type = 'checkbox';
    input.dataset.key = key;
    input.addEventListener('change', () => {
      if (!setConfigValue(key, input.checked)) refreshDialog();
    });
    const text = document.createElement('span');
    text.textContent = label;
    wrapper.append(input, text);
    container.append(wrapper);
  };

  const renderList = (container, values, key) => {
    container.textContent = '';
    for (const value of values) {
      const item = document.createElement('li');
      item.className = 'chip';
      const label = document.createElement('span');
      label.textContent = value;
      label.title = value;
      const remove = document.createElement('button');
      remove.type = 'button';
      remove.title = '删除';
      remove.setAttribute('aria-label', `删除 ${label.textContent}`);
      remove.textContent = '×';
      remove.addEventListener('click', () => {
        setConfigValue(key, (activeConfig[key] ?? []).filter(itemValue => itemValue !== value));
      });
      item.append(label, remove);
      container.append(item);
    }
  };

  const selectTab = name => {
    if (!dialogState) return;
    for (const button of dialogState.shadow.querySelectorAll('.tab')) {
      button.setAttribute('aria-selected', String(button.dataset.tab === name));
    }
    for (const panel of dialogState.shadow.querySelectorAll('.panel')) {
      panel.hidden = panel.dataset.panel !== name;
    }
  };

  const showDialogMessage = (message, isError = false) => {
    if (!dialogState) return;
    dialogState.status.textContent = message;
    dialogState.status.classList.toggle('error', isError);
    window.clearTimeout(dialogState.messageTimer);
    dialogState.messageTimer = window.setTimeout(() => {
      if (!dialogState) return;
      dialogState.status.textContent = '设置会立即应用并保存。';
      dialogState.status.classList.remove('error');
    }, 3500);
  };

  function refreshDialog() {
    if (!dialogState) return;
    if (dialogState.profileId !== activeProfileId) {
      dialogState.profileId = activeProfileId;
      dialogState.keywordBatch.value = '';
      dialogState.keywordFile.value = '';
    }
    for (const input of dialogState.shadow.querySelectorAll('input[type="checkbox"][data-key]')) {
      input.checked = activeConfig[input.dataset.key] === true;
    }
    renderList(
      dialogState.keywordList,
      activeConfig['filter::keywords'] ?? [],
      'filter::keywords'
    );
    dialogState.account.textContent = activeProfileId
      ? `当前配置账号：${activeProfileId}`
      : '正在识别当前微博账号…';
    dialogState.blacklistStatus.textContent = blacklist.error || (
      !activeProfileId || profileIdentityProvisional ? '正在识别当前微博账号…' :
      blacklist.controller ? '正在同步微博黑名单…' :
      blacklist.updatedAt ? `已同步 ${blacklist.ids.size} 位黑名单用户。` : '尚未同步微博黑名单。'
    );
    dialogState.blacklistRefresh.disabled = (
      !activeProfileId || profileIdentityProvisional || Boolean(blacklist.controller)
    );
    const accountReady = /^\d+$/.test(activeProfileId) && !profileIdentityProvisional;
    dialogState.keywordImport.disabled = !accountReady;
    dialogState.keywordFile.disabled = !accountReady;
    dialogState.keywordExport.disabled = !accountReady || !(activeConfig['filter::keywords'] ?? []).length;
  }

  const addKeyword = value => {
    const keyword = normalizeText(value);
    if (!keyword) return false;
    return setConfigValue(
      'filter::keywords',
      [...(activeConfig['filter::keywords'] ?? []), keyword]
    );
  };

  const currentKeywords = () => {
    if (!/^\d+$/.test(activeProfileId) || profileIdentityProvisional) {
      showDialogMessage('尚未识别当前微博账号，请等待页面加载完成后重试。', true);
      return null;
    }
    // Read again at the action boundary so another tab's additions are retained.
    return resolveConfig(readConfigStore()[activeProfileId])['filter::keywords'] ?? [];
  };

  const importKeywords = text => {
    const current = currentKeywords();
    if (!current) return false;
    const imported = parseKeywordText(text);
    if (!imported.length) {
      showDialogMessage('请输入关键词或选择 TXT 文件，每行一个关键词。', true);
      return false;
    }
    const merged = normalizeStringList([...current, ...imported]);
    const added = merged.length - current.length;
    if (added && !setConfigValue('filter::keywords', merged)) return false;
    showDialogMessage(`新增 ${added} 个关键词，忽略 ${imported.length - added} 个已有项，共 ${merged.length} 个。`);
    return true;
  };

  const exportKeywords = () => {
    const keywords = currentKeywords();
    if (!keywords) return;
    if (!keywords.length) {
      showDialogMessage('当前账号没有可导出的关键词。', true);
      return;
    }
    const blob = new Blob(['\ufeff', serializeKeywords(keywords), '\n'], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.setAttribute(OWNED_ATTR, 'keyword-download');
    anchor.href = url;
    anchor.download = `药方-关键词-${activeProfileId}.txt`;
    document.documentElement.append(anchor);
    anchor.click();
    anchor.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    showDialogMessage(`已导出当前账号的 ${keywords.length} 个关键词。`);
  };

  const closeDialog = () => {
    if (!dialogState) return;
    const returnFocus = dialogState.returnFocus;
    window.clearTimeout(dialogState.messageTimer);
    dialogState.host.remove();
    dialogState = null;
    if (returnFocus?.isConnected) returnFocus.focus();
  };

  function openDialog(trigger = null) {
    if (dialogState) {
      dialogState.host.style.display = '';
      dialogState.close.focus();
      return;
    }

    const host = document.createElement('div');
    host.setAttribute(OWNED_ATTR, 'dialog');
    const shadow = host.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
      <style>${dialogStyles}</style>
      <div class="backdrop">
        <section class="dialog" role="dialog" aria-modal="true" aria-labelledby="${SCRIPT_PREFIX}-title">
          <header>
            <h1 id="${SCRIPT_PREFIX}-title">药方设置</h1>
            <button class="icon-button close" type="button" title="关闭" aria-label="关闭">×</button>
          </header>
          <div class="main">
            <nav class="tabs" aria-label="设置分类">
              <button class="tab" type="button" data-tab="filter" aria-selected="true">内容过滤</button>
              <button class="tab" type="button" data-tab="cleanup" aria-selected="false">界面清理</button>
              <button class="tab" type="button" data-tab="browsing" aria-selected="false">浏览设置</button>
              <button class="tab" type="button" data-tab="about" aria-selected="false">关于</button>
            </nav>
            <div class="panels">
              <section class="panel" data-panel="filter">
                <h2>微博与评论过滤</h2>
                <h3>关键字</h3>
                <p class="muted">匹配微博、热搜和评论的可见全文，包括话题与 @ 用户。</p>
                <p class="muted">搜索页沿用同一账号的设置。图片搜索只能匹配页面提供的摘要；未提供数字 UID 的作者不按昵称猜测拉黑。</p>
                <form class="form keyword-form">
                  <input class="keyword-input" type="text" autocomplete="off" placeholder="输入关键字">
                  <button class="primary" type="submit">添加</button>
                </form>
                <ul class="chips keyword-list"></ul>
                <details class="keyword-transfer">
                  <summary>批量导入／导出</summary>
                  <p class="muted">每行一个关键词，支持粘贴或读取 UTF-8 TXT 文件。导入会追加并去重，保留已有关键词；仅作用于当前账号。</p>
                  <textarea class="keyword-batch" rows="5" aria-label="批量关键词" placeholder="每行一个关键词"></textarea>
                  <label class="keyword-file-label">从 TXT 文件读取
                    <input class="keyword-file" type="file" accept=".txt,text/plain">
                  </label>
                  <div class="keyword-actions">
                    <button class="primary keyword-import" type="button">追加导入</button>
                    <button class="secondary keyword-export" type="button">导出 TXT</button>
                  </div>
                </details>
                <h3>微博黑名单</h3>
                <p class="muted">自动屏蔽已拉黑用户的微博、转发原文和评论。仅计入微博屏蔽范围全选的用户。</p>
                <p class="muted">进入页面、返回标签页时自动同步；停留期间每 5 分钟更新。拉黑或解除后也可立即刷新。</p>
                <p class="blacklist-status" aria-live="polite"></p>
                <div class="form">
                  <button class="primary blacklist-refresh" type="button">刷新黑名单</button>
                  <a href="https://weibo.com/set/shield" target="_blank" rel="noopener noreferrer">管理微博黑名单</a>
                </div>
              </section>
              <section class="panel" data-panel="cleanup" hidden>
                <h2>界面清理</h2>
                <p class="muted">开关即时生效；关闭后会恢复脚本此前隐藏的项目。</p>
                <div class="cleanup-groups"></div>
              </section>
              <section class="panel" data-panel="browsing" hidden>
                <h2>浏览设置</h2>
                <p class="muted">调整页面布局与浏览行为；开关即时生效。</p>
                <div class="browsing-groups"></div>
              </section>
              <section class="panel" data-panel="about" hidden>
                <h2>关于</h2>
                <div class="notice">
                  药方基于田生的 yyawf 0.0.11 修复完善，源码依照 MPL-2.0 发布。
                </div>
                <p><a href="https://github.com/tiansh/yawf/tree/yyawf" target="_blank"
                  rel="noopener noreferrer">上游源码与原作者信息</a></p>
                <h3>调试</h3>
                <div class="debug-setting"></div>
              </section>
            </div>
          </div>
          <footer>
            <span class="status" aria-live="polite">设置会立即应用并保存。</span>
            <span class="account"></span>
          </footer>
        </section>
      </div>
    `;
    document.documentElement.append(host);

    for (const [selector, groups] of [
      ['.cleanup-groups', CLEANUP_GROUPS],
      ['.browsing-groups', BROWSING_GROUPS],
    ]) {
      const container = shadow.querySelector(selector);
      for (const group of groups) {
        const title = document.createElement('h3');
        title.textContent = group.name;
        const grid = document.createElement('div');
        grid.className = 'grid';
        if (group.items.length === 1) grid.classList.add('single');
        for (const [key, label] of group.items) createCheckbox(grid, key, label);
        container.append(title, grid);
        if (group.description) {
          const description = document.createElement('p');
          description.className = 'muted';
          description.textContent = group.description;
          container.append(description);
        }
      }
    }
    createCheckbox(shadow.querySelector('.debug-setting'), 'about::debug', '启用调试日志');

    dialogState = {
      host,
      shadow,
      close: shadow.querySelector('.close'),
      status: shadow.querySelector('.status'),
      account: shadow.querySelector('.account'),
      keywordList: shadow.querySelector('.keyword-list'),
      keywordBatch: shadow.querySelector('.keyword-batch'),
      keywordFile: shadow.querySelector('.keyword-file'),
      keywordImport: shadow.querySelector('.keyword-import'),
      keywordExport: shadow.querySelector('.keyword-export'),
      profileId: activeProfileId,
      blacklistStatus: shadow.querySelector('.blacklist-status'),
      blacklistRefresh: shadow.querySelector('.blacklist-refresh'),
      messageTimer: 0,
      returnFocus: trigger instanceof HTMLElement ? trigger : document.activeElement,
    };

    shadow.querySelectorAll('.tab').forEach(button => {
      button.addEventListener('click', () => selectTab(button.dataset.tab));
    });
    dialogState.close.addEventListener('click', closeDialog);
    shadow.querySelector('.backdrop').addEventListener('click', event => {
      if (event.target.classList.contains('backdrop')) closeDialog();
    });
    shadow.addEventListener('keydown', event => {
      if (event.key === 'Escape') {
        closeDialog();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable = [...shadow.querySelectorAll(
        'button:not(:disabled), input:not(:disabled), textarea:not(:disabled), summary, a[href], ' +
          '[tabindex]:not([tabindex="-1"])'
      )].filter(element => !element.closest('[hidden]') && element.getClientRects().length > 0);
      const first = focusable[0];
      const last = focusable.at(-1);
      if (event.shiftKey && shadow.activeElement === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && shadow.activeElement === last) {
        event.preventDefault();
        first?.focus();
      }
    });

    const keywordForm = shadow.querySelector('.keyword-form');
    const keywordInput = shadow.querySelector('.keyword-input');
    keywordForm.addEventListener('submit', event => {
      event.preventDefault();
      if (addKeyword(keywordInput.value)) keywordInput.value = '';
      keywordInput.focus();
    });

    const currentDialog = dialogState;
    currentDialog.keywordImport.addEventListener('click', () => {
      if (importKeywords(currentDialog.keywordBatch.value)) {
        currentDialog.keywordBatch.value = '';
        currentDialog.keywordFile.value = '';
      }
    });
    currentDialog.keywordExport.addEventListener('click', exportKeywords);
    currentDialog.keywordFile.addEventListener('change', async () => {
      const file = currentDialog.keywordFile.files[0];
      if (!file) return;
      const profileId = activeProfileId;
      try {
        const text = await file.text();
        if (dialogState !== currentDialog || activeProfileId !== profileId ||
          currentDialog.keywordFile.files[0] !== file) return;
        currentDialog.keywordBatch.value = text;
        showDialogMessage(`已读取 ${parseKeywordText(text).length} 个关键词，请检查后点击追加导入。`);
      } catch {
        if (dialogState === currentDialog) showDialogMessage('文件读取失败，请选择 UTF-8 编码的 TXT 文件。', true);
      }
    });

    dialogState.blacklistRefresh.addEventListener('click', () => syncBlacklist(true));

    refreshDialog();
    dialogState.close.focus();
  }

  const start = () => {
    if (started || !document.documentElement) return;
    started = true;
    configStore = readConfigStore();
    const storedProfileIds = Object.keys(configStore).filter(profileId => /^\d+$/.test(profileId));
    if (!activeProfileId && storedProfileIds.length === 1) {
      activeProfileId = storedProfileIds[0];
      profileIdentityProvisional = true;
      profileMissingSince = Date.now();
    }
    armBootstrapGuard();
    updateProfileId();
    setActiveConfig(profileConfig(activeProfileId));
    syncCleanupStyle();
    maybeRedirectToLatest();

    observer = new MutationObserver(records => {
      const locationChanged = location.href !== lastLocation;
      if (locationChanged) requestFullScan();
      const navigationChanged = records.some(record => {
        const target = record.target instanceof Element
          ? record.target
          : record.target.parentElement;
        if (target?.closest?.('nav, [role="navigation"]')) return true;
        return record.type === 'childList' && [
          ...record.addedNodes,
          ...record.removedNodes,
        ].some(node => (
          node instanceof Element && (
            node.matches?.('nav, [role="navigation"]') ||
            node.querySelector?.('nav, [role="navigation"]')
          )
        ));
      });
      if (!activeProfileId || profileIdentityProvisional || locationChanged || navigationChanged) updateProfileId();
      if (maybeRedirectToLatest()) return;
      if (profileIdentityProvisional) return;
      const groupedCandidates = new Map();
      const immediateRoots = new Set();
      for (const record of records) {
        const target = record.target instanceof Element
          ? record.target
          : record.target.parentElement;
        if (!target || target.closest?.(`[${OWNED_ATTR}]`)) continue;
        if (
          record.type === 'attributes' &&
          (target === document.documentElement || target === document.body || target.matches('main'))
        ) continue;
        if (
          record.type === 'characterData' &&
          (target === document.documentElement || target === document.body)
        ) continue;

        // Home hot-search rows are nested inside a generic side card. Keep the
        // complete classifier scope for mounts, removals, and recycled rows.
        const hotSearchRoot = target.closest?.('.hotBand, .hot-band-container');
        if (hotSearchRoot) addScanRoot(immediateRoots, hotSearchRoot);

        const addedElements = record.type === 'childList'
          ? [...record.addedNodes].filter(node => node instanceof Element)
          : [];
        if (
          record.type === 'childList' &&
          record.addedNodes.length === 0
        ) {
          const affectedUnit = target.closest?.(
            `${DIRTY_UNIT_SELECTOR}, [${ROLE_ATTR}], [${FILTER_ATTR}]`
          );
          if (!affectedUnit) continue;
        }
        const candidates = (addedElements.length ? addedElements : [target])
          .filter(element => !element.closest?.(`[${OWNED_ATTR}]`));
        if (!candidates.length) continue;
        const menuTouched = candidates.some(element => (
          element.matches?.('nav, [role="navigation"], [role="menu"], .woo-pop-main, .woo-pop-wrap-main') ||
          element.closest?.('nav, [role="navigation"], [role="menu"], .woo-pop-main, .woo-pop-wrap-main') ||
          element.querySelector?.('nav, [role="navigation"], [role="menu"], .woo-pop-main, .woo-pop-wrap-main')
        ));
        if (menuTouched) settingsEntryPending = true;
        if (!activePlan.hasDomWork && !menuTouched) continue;
        const group = groupedCandidates.get(target) ?? new Set();
        const primeAddedNodes = record.type === 'childList' && record.addedNodes.length > 0;
        candidates.forEach(candidate => {
          group.add(candidate);
          if (!primeAddedNodes) return;
          const visualRoot = dirtyRootForNode(candidate);
          if (visualRoot) addScanRoot(immediateRoots, visualRoot);
        });
        groupedCandidates.set(target, group);
      }
      primeVisualRoots(immediateRoots);
      for (const [target, candidateSet] of groupedCandidates) {
        const candidates = [...candidateSet];
        if (candidates.length > 40) requestDirtyScan(target);
        else for (const candidate of candidates) requestDirtyScan(candidate);
      }
    });
    observer.observe(document.documentElement, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: [
        'class', 'role', 'href', 'title', 'aria-label', 'alt', 'usercard',
        'data-ad', 'data-adid', 'data-ad-id', 'title_source',
        'action-type', 'node-type', 'uid', 'mid', 'comment_id',
      ],
    });

    installHistoryHooks();

    window.addEventListener('popstate', handleRouteChange);
    window.addEventListener('hashchange', handleRouteChange);
    window.addEventListener('load', requestFullScan, { once: true });
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        updateProfileId();
        syncBlacklist(true);
        requestFullScan();
      }
    });
    document.addEventListener('load', event => {
      if (activePlan.icons && event.target instanceof HTMLImageElement) {
        requestDirtyScan(event.target);
      }
    }, true);
    document.addEventListener('click', event => {
      if (
        event.button !== 0 || event.metaKey || event.ctrlKey ||
        event.shiftKey || event.altKey
      ) return;
      const anchor = event.target instanceof Element
        ? event.target.closest('a[href]')
        : null;
      if (!anchor) return;
      try {
        const url = new URL(anchor.getAttribute('href'), anchor.baseURI || location.href);
        if (url.origin !== location.origin || url.pathname !== '/') return;
        const profileId = activeProfileId || discoverProfileId();
        if (!/^\d+$/.test(profileId)) return;
        if (elementText(anchor) === '全部关注') {
          homeBypassActive = true;
          sessionStorage.setItem(HOME_BYPASS_KEY, JSON.stringify({
            profileId,
            expiresAt: Date.now() + 5 * 60_000,
          }));
          return;
        }
        if (!shouldRedirectToLatest({
          href: url.href,
          profileId,
          config: activeConfig,
        })) return;
        const target = latestFeedTarget();
        if (!target) return;
        event.preventDefault();
        event.stopImmediatePropagation();
        rememberLatestRedirect(target, profileId);
        location.assign(target);
      } catch {
        // A failed navigation enhancement must not block Weibo's own routing.
      }
    }, true);

    profileProbeTimer = window.setInterval(() => {
      if (document.hidden) return;
      updateProfileId();
      syncBlacklist();
      if (location.href !== lastLocation) requestFullScan();
    }, 5000);

    try {
      GM_addValueChangeListener(CONFIG_KEY, (_name, _oldValue, newValue) => {
        configStore = isRecord(newValue) ? newValue : readConfigStore();
        setActiveConfig(profileConfig(activeProfileId));
        syncCleanupStyle();
        requestFullScan();
        refreshDialog();
      });
    } catch (error) {
      warn('无法监听其他标签页的设置变化。', error);
    }

    try {
      GM_registerMenuCommand('药方设置', openDialog);
    } catch {
      // Menu registration is a convenience; the page entry is still available.
    }

    requestFullScan();
    debug('脚本已启动');
  };

  if (document.documentElement) start();
  else {
    const bootstrapObserver = new MutationObserver(() => {
      if (!document.documentElement) return;
      bootstrapObserver.disconnect();
      start();
    });
    bootstrapObserver.observe(document, { childList: true, subtree: true });
  }
})();
