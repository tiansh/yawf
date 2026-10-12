const assert = require('node:assert/strict');
const { readFileSync } = require('node:fs');
const { join } = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const sandbox = { __YYAWF_TEST_MODE__: true, URL };
vm.runInNewContext(readFileSync(join(__dirname, '../yyawf.user.js'), 'utf8'), sandbox);
const api = sandbox.__YYAWF_TEST_API__;

test('keywords round-trip through TXT with blank lines, BOM and duplicates', () => {
  const keywords = api.parseKeywordText('\ufeff 广告 \r\n\n促销\r广告\n  ');
  assert.deepEqual(Array.from(keywords), ['广告', '促销']);
  assert.equal(api.serializeKeywords(keywords), '广告\n促销');
  assert.deepEqual(Array.from(api.parseKeywordText(api.serializeKeywords(keywords))), ['广告', '促销']);
});

test('account configuration retains supported settings and explicit opt-outs', () => {
  const config = api.resolveConfig({
    'feed::latest': false,
    'cleanup::ad': true,
    'filter::keywords': [' 广告 ', '广告', 123, ''],
    'filter::authors': ['123'],
  });
  assert.equal(config['feed::latest'], false);
  assert.equal(config['cleanup::ad'], true);
  assert.deepEqual(Array.from(config['filter::keywords']), ['广告']);
  assert.equal(Object.hasOwn(config, 'filter::authors'), false);
  assert.equal(api.resolveConfig({})['feed::latest'], true);
});

test('promoted-search migration preserves other accounts and an explicit new setting', () => {
  const original = {
    '123': {
      'cleanup::searchTop': false,
      'cleanup::searchUnranked': true,
      'filter::keywords': ['广告'],
    },
    '456': {
      'cleanup::searchPromoted': false,
      'cleanup::searchTop': true,
      'filter::authors': ['789'],
    },
  };
  const { store, changed } = api.migrateConfigStore(original);
  assert.equal(changed, true);
  assert.equal(store['123']['cleanup::searchPromoted'], true);
  assert.equal(store['456']['cleanup::searchPromoted'], false);
  assert.deepEqual(store['123']['filter::keywords'], ['广告']);
  assert.deepEqual(store['456']['filter::authors'], ['789']);
  assert.equal(Object.hasOwn(store['123'], 'cleanup::searchUnranked'), false);
  assert.equal(Object.hasOwn(store['456'], 'cleanup::searchTop'), false);
  assert.equal(original['456']['cleanup::searchTop'], true);
  assert.equal(api.migrateConfigStore(store).changed, false);
});

test('author IDs require numeric Weibo links and do not guess nicknames', () => {
  assert.equal(api.extractUserIdFromHref('/u/123'), '123');
  assert.equal(api.extractUserIdFromHref('https://weibo.com/456'), '456');
  assert.equal(api.extractUserIdFromHref('https://s.weibo.com/user?uid=789'), '789');
  assert.equal(api.extractUserIdFromHref('https://weibo.com/n/someone'), '');
  assert.equal(api.extractUserIdFromHref('https://weibo.com.example.org/u/123'), '');
});

test('latest-feed redirect only applies to the account homepage when enabled', () => {
  assert.equal(api.latestFeedPath('123'), '/mygroups?gid=11000123');
  assert.equal(api.shouldRedirectToLatest({ href: 'https://weibo.com/', profileId: '123' }), true);
  for (const href of [
    'https://weibo.com/?q=test',
    'https://weibo.com/u/123',
    'https://weibo.com/mygroups?gid=11000123',
    'https://s.weibo.com/',
    'https://example.org/',
  ]) {
    assert.equal(api.shouldRedirectToLatest({ href, profileId: '123' }), false);
  }
  assert.equal(api.shouldRedirectToLatest({ href: 'https://weibo.com/', profileId: '' }), false);
  assert.equal(api.shouldRedirectToLatest({
    href: 'https://weibo.com/', profileId: '123', config: { 'feed::latest': false },
  }), false);
});

test('native blacklist distinguishes complete shields and rejects changed account or schema', () => {
  const page = {
    ok: 1, uid: '123', total: 2, next_cursor: 0,
    card_group: [
      { scheme: 'sinaweibo://shieldoption?uid=456&status=1&interact=1&follow=1' },
      { scheme: 'sinaweibo://shieldoption?uid=789&status=1&interact=0&follow=1' },
    ],
  };
  const result = api.parseBlacklistPage(page, '123');
  assert.deepEqual(Array.from(result.entries, entry => [entry.uid, entry.blocked]), [
    ['456', true], ['789', false],
  ]);
  assert.equal(result.total, 2);
  assert.equal(result.hasMore, false);
  assert.equal(api.parseBlacklistPage({ ...page, next_cursor: 2 }, '123').hasMore, true);
  assert.throws(() => api.parseBlacklistPage(page, '999'), /登录账号已改变/);
  assert.throws(() => api.parseBlacklistPage({ ...page, next_cursor: 'bad' }, '123'), /响应无效/);
  assert.throws(() => api.parseBlacklistPage({
    ...page, card_group: [{ scheme: 'sinaweibo://shieldoption?uid=456&status=1&interact=1' }],
  }, '123'), /条目格式已改变/);
});

test('keyword and blacklist filters report their match and restore ordinary content', () => {
  const plan = api.compileWorkPlan({ 'filter::keywords': ['促销'] }, new Set(['456']));
  assert.equal(api.filterDecision({ text: '<b>促销</b>内容', plan }).reason, 'keyword');
  const blocked = api.filterDecision({ text: '普通内容', userIds: ['123', '456'], plan });
  assert.equal(blocked.hidden, true);
  assert.equal(blocked.reason, 'blacklist');
  assert.equal(blocked.match, '456');
  assert.equal(api.filterDecision({ text: '普通内容', userIds: ['123'], plan }).hidden, false);
  assert.equal(api.filterDecision({ text: '促销', userIds: ['456'], plan: api.compileWorkPlan({}) }).hidden,
    false);
});

test('favorite-tag folding reserves the current tag and editor within two rows', () => {
  const visible = api.visibleFavoriteTagIndices([40, 40, 40, 40, 40], 90, 10, [0, 4]);
  assert.deepEqual(Array.from(visible).sort(), [0, 1, 2, 4]);
  assert.deepEqual(Array.from(api.visibleFavoriteTagIndices([40, 40], 0, 10, [])), [0, 1]);
});

test('cleanup CSS can be disabled and keeps filtered ads measurable for virtual scrolling', () => {
  assert.equal(api.buildCleanupCss({}), '');
  assert.equal(api.buildCleanupCss({ 'cleanup::ad': false }), '');
  const css = api.buildCleanupCss({ 'cleanup::ad': true, 'cleanup::searchPromoted': true });
  assert.match(css, /realtimehot_ad/);
  assert.match(css, /min-height: 1px !important/);
  assert.match(css, /display: none !important/);
  assert.match(api.buildCleanupCss({ 'layout::wideFeed': true }), /min-width: 1162px/);
});
