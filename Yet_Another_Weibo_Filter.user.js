// ==UserScript==
// @name              Yet Another Weibo Filter
// @name:zh           Yet Another Weibo Filter 看真正想看的微博
// @name:en           Yet Another Weibo Filter
// @namespace         https://github.com/tiansh
// @description       新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。 filter Sina Weibo by keywords, authors, topics, sources, etc.; modify layout
// @description:zh-CN 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。
// @description:zh-HK 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。
// @description:zh-TW 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。
// @description:en    filter Sina Weibo by keywords, authors, topics, sources, etc.; modify layout
// @include           http://www.weibo.com/*
// @include           http://weibo.com/*
// @exclude           http://weibo.com/a/bind/test
// @version           1.2.71
// @updateURL         https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.meta.js
// @downloadURL       https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.user.js
// @supportURL        https://tiansh.github.io/yawf/
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

// 图片
var images = {
  'filter': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAMAAAAoLQ9TAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAFEUExURUxpcZ6eno6OjpmZmf////v7+/j4+Pr6+vr6+uzs7MvLy8rKyuzs7Ly8vLy8vO7u7r29vb29ve7u7unp6by8vOrq6ufn5+/v776+vry8vO3t7ejo6Ojo6Ovr6+/v7729ve7u7ry8vO/v7+vr6+jo6L6+vu7u7ry8vO/v7+rq6ujo6L6+vu3t7e/v77e3t+vr6+jo6Jubm5qampqamp+fn7m5uezs7MXFxe7u7p2dnZubm5+fn5ycnOzs7L6+vsDAwMLCwsHBwevr6/Ly8vr6+sPDw+3t7e/v78TExMHBwcnJycXFxff39+np6e7u7vPz8/f39/j4+O/v7/T09Ovr6/////Dw8PT09P///9zc3Pn5+fv7+////+3t7f///9ra2v///8DAwOPj49PT0////8LCwtHR0b+/v+Pj48bGxsHBwcfHx0ifhqUAAABsdFJOUwA/Skoauru8u8K7u40sLY8yMYeULoqRijIxjIiNkI42jTWQko86nDaeoJ08sLRKuLQ1Nj8yUL2twEc9Nzq6op6lqbbGn6K/wKymsqmExsO6foDKuMV+wchsm3qmF8l6l2ZWC7oWtrpSCLq2ugo9naEAAAClSURBVBjTY2DAANGsbOzsHEDAzs7G6gIUCI9Ny8rm4ubmykxNDnIGCniFxKczMjEzMzEmRvqaAwUsvYMTMkB6kyL8HYxBDCuPsLgUBgaWUD9HI4ixNp6cUTEsgZx2hjCLrF3dA3zc7E0QVptaONma6SG5RVvXQF9HHUlAVUNLU00RSUBeSUVZQRJJQEJORlaKD0lAQFxaVEgESUCQX0yYh5cBKwAASvgW88X18swAAAAASUVORK5CYII=',
};

// 多行字符串
var funcStr = function (f) {
  var s = f.toString().split(/\r\n|\r|\n/g).slice(1, -1).join('\n');
  return s;
};

// 快速创建一段文档元素
var cewih = function (tag, inner) {
  var d = document.createElement(tag);
  d.innerHTML = inner;
  return d;
};

// 检查是否是 Gecko 浏览器，部分特性不支持其他浏览器
var isGecko = navigator.userAgent.indexOf('Gecko') !== -1 &&
  navigator.userAgent.indexOf('like Gecko') === -1;

// 检查是否是从原站安装的脚本
var isOriginalScript = (function () {
  try {
    var meta = GM_info.scriptMetaStr;
    var downloadURL = meta.match(new RegExp('// @(updateURL)(?:\\s+(.*))'))[2];
    var supportURL = meta.match(new RegExp('// @(supportURL)(?:\\s+(.*))'))[2];
    if (!downloadURL || !supportURL) return false;
    return downloadURL.indexOf(supportURL) === 0;
  } catch (e) { return false; }
}());

// 文本常量
// 请以简体中文为原文，参考这些资料翻译
// http://zh.wikipedia.org/wiki/Template:CGroup/IT
// http://www.microsoft.com/Language/zh-cn/Search.aspx
var text = {
  // 基本按钮
  'okButtonTitle': { 'zh-cn': '确定', 'zh-hk': '確定', 'zh-tw': '確定', 'en': 'Confirm' },
  'cancelButtonTitle': { 'zh-cn': '取消', 'zh-hk': '取消', 'zh-tw': '取消', 'en': 'Cancel' },
  'closeButtonTitle': { 'zh-cn': '关闭', 'zh-hk': '關閉', 'zh-tw': '關閉', 'en': 'Close' },
  'configStringsAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'configUsersAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'foldedWeiboTextAuthor': {
    'zh-cn': '"来自 @" attr(yawf-author) " 的一条微博被折叠，请点击查看"',
    'zh-hk': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"',
    'zh-tw': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"',
    'en': '"A Weibo from @" attr(yawf-author) " was folded, click to view."'
  },
  'foldedWeiboText': {
    'zh-cn': '"一条微博被折叠，请点击查看"',
    'zh-hk': '"一條微博被折疊，請點擊查看"',
    'zh-tw': '"一條微博被折疊，請點擊查看"',
    'en': '"A Weibo was folded, click to view."'
  },
  'disabledKey': { 'zh-cn': '(已禁用)', 'zh-hk': '(已停用)', 'zh-tw': '(已停用)', 'en': '(Disabled)' },
  // 设置框
  'filter': { 'zh-cn': '过滤器', 'zh-hk': '篩選器', 'zh-tw': '篩選器', 'en': 'Filter' },
  'configDialogTitle': { 'zh-cn': '过滤器设置', 'zh-hk': '篩選器設定', 'zh-tw': '篩選器設定', 'en': 'Filter Settings' },
  'whitelistFilterDesc': { 'zh-cn': '总是显示{{{typed}}}', 'zh-hk': '總是顯示{{{typed}}}', 'zh-tw': '總是顯示{{{typed}}}', 'en': 'Always show {{{typed}}}' },
  'blacklistFilterDesc': { 'zh-cn': '隐藏{{{typed}}}', 'zh-hk': '隱藏{{{typed}}}', 'zh-tw': '隱藏{{{typed}}}', 'en': 'Hide {{{typed}}}' },
  'foldlistFilterDesc': { 'zh-cn': '折叠{{{typed}}}', 'zh-hk': '折疊{{{typed}}}', 'zh-tw': '折疊{{{typed}}}', 'en': 'Fold {{{typed}}}' },
  'whitelistActionDesc': { 'zh-cn': '显示', 'zh-hk': '顯示', 'zh-tw': '顯示', 'en': 'Show' },
  'blacklistActionDesc': { 'zh-cn': '隐藏', 'zh-hk': '隱藏', 'zh-tw': '隱藏', 'en': 'Hide' },
  'foldlistActionDesc': { 'zh-cn': '折叠', 'zh-hk': '折疊', 'zh-tw': '折疊', 'en': 'Fold' },
  // 内容
  'contentFilterGroupTitle': { 'zh-cn': '内容', 'zh-hk': '內容', 'zh-tw': '內容', 'en': 'Content' },
  // 关键词
  'keywordFilterDesc': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword' },
  'keywordFilterDetails': { 'zh-cn': '包含以下关键词的微博', 'zh-hk': '包含以下關鍵字的微博', 'zh-tw': '包含以下關鍵字的微博', 'en': 'Weibo with these keywords' },
  'keywordFilterFast': { 'zh-cn': '包含关键词', 'zh-hk': '包含關鍵字', 'zh-tw': '包含關鍵字', 'en': 'Weibo contains keyword ' },
  'keywordFilterFastInput': { 'zh-cn': '“{{text}}”', 'zh-hk': '「{{text}}」', 'zh-tw': '「{{text}}」', 'en': '"{{text}}"' },
  // 正则表达式
  'regexpFilterGroupTitle': { 'zh-cn': '正则', 'zh-hk': '正則', 'zh-tw': '正規', 'en': 'Regexp' },
  'regexpFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'regexpFilterDetails': { 'zh-cn': '匹配以下正则表达式的微博', 'zh-hk': '匹配以下正則表達式的微博', 'zh-tw': '匹配以下正規表示式的微博', 'en': 'Weibo matches these regular expressions' },
  'regexpFilterFast': { 'zh-cn': '匹配正则式', 'zh-hk': '匹配正則式', 'zh-tw': '匹配正規式', 'en': 'Weibo matches regexp ' },
  'regexpFilterFastInput': { 'zh-cn': '/{{text}}/', 'zh-hk': '/{{text}}/', 'zh-tw': '/{{text}}/', 'en': '/{{text}}/' },
  'regexpFilterRemark': {
    'zh-cn': '正则表达式的过滤方式提供了基于微博内容的高级过滤方式，如果只是需要简单地关键词过滤请使用内容标签页的关键词以获得更好的效率。正则表达式书写时不需要对“/”字符转义。',
    'zh-hk': '正則表達式的篩選方式提供了基於微博內容的高級篩選方式，如果只是需要簡單地關鍵字篩選請使用內容標籤頁的關鍵字以獲得更好的效率。正則表達式書寫時不需要對「/」字符轉義。',
    'zh-tw': '正規表示式的篩選方式提供了基於微博內容的高級篩選方式，如果只是需要簡單地關鍵字篩選請使用內容標籤頁的關鍵字以獲得更好的效率。正規表示式書寫時不需要對「/」字符轉義。',
    'en': 'Regular expression provide advanced filter settings based on content. You may set keywords in Content tab for better performance. You do not need to escape "/" in your regexp.'
  },
  'regexpBadFormedTitle': { 'zh-cn': '非法的正则表达式', 'zh-hk': '不合法的正則表達式', 'zh-tw': '不合法的正規表示式', 'en': 'Illegal Regexp' },
  'regexpBadFormed': {
    'zh-cn': '您输入的/{{regexp}}/不能被正确地解析为正则表达式，请检查您的输入。如需关键词屏蔽请到内容标签页设置。',
    'zh-hk': '您输入的/{{regexp}}/不能被正确地解析为正则表达式，请检查您的输入。如需关键词屏蔽请到内容标签页面设置。',
    'zh-tw': '您輸入的/{{regexp}}/不能被正確地解析為正規表示式，請檢查您的輸入。如需關鍵詞屏蔽請到內容標籤頁面設置。',
    'en': 'Cannot parse /{{regexp}}/ as regexp. Please check your input. You may hide Weibo by keywords in Content tab page.'
  },
  // 其他元素
  'contentTypesTitle': { 'zh-cn': '将以下元素同样作为内容处理', 'zh-hk': '將以下元素同樣作為內容處理', 'zh-tw': '將以下元素同樣作為內容處理', 'en': 'Handle these elements as content' },
  'contentTypesMention': { 'zh-cn': '提到某人', 'zh-hk': '提到某人', 'zh-tw': '提到某人', 'en': 'Mention' },
  'contentTypesTopic': { 'zh-cn': '话题标题', 'zh-hk': '話題標題', 'zh-tw': '話題標題', 'en': 'Topic' },
  'contentTypesLink': { 'zh-cn': '链接地址', 'zh-hk': '連結位址', 'zh-tw': '連結位址', 'en': 'Link target URL' },
  'contentTypesEmotion': { 'zh-cn': '表情备注', 'zh-hk': '表情備註', 'zh-tw': '表情備註', 'en': 'Remark of emotion' },
  // 帐号
  'accountFilterGroupTitle': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountFilterDetails': { 'zh-cn': '来自以下帐号的微博', 'zh-hk': '來自以下帳號的微博', 'zh-tw': '來自以下帳號的微博', 'en': 'Weibo from these accounts' },
  'accountFilterFast': { 'zh-cn': '作者是“@{{name}}”的微博', 'zh-hk': '作者是「@{{name}}」的微博', 'zh-tw': '作者是「@{{name}}」的微博', 'en': 'Weibo by "@{{name}}"', },
  'accountFilterRemark': {
    'zh-cn': '推荐您到<a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">隐私设置 - 屏蔽账号</a>屏蔽您关注了但不想在首页看到的帐号。',
    'zh-hk': '推薦您到<a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">隱私設置 - 屏蔽帐号</a>封鎖您關注了但不想在首頁看到的帳號。',
    'zh-tw': '推薦您到<a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">隱私設置 - 屏蔽帐号</a>封鎖您關注了但不想在首頁看到的帳號。',
    'en': 'You can block Weibo from accounts you followed in the page <a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">Privacy - Block account</a>.'
  },
  'accountNotExistErrorTitle': { 'zh-cn': '帐号不存在', 'zh-hk': '帳號不存在', 'zh-tw': '帳號不存在', 'en': 'Account does not exist' },
  'accountNotExistError': { 'zh-cn': '不存在名为{{name}}的账号', 'zh-hk': '不存在名為{{name}}的賬號', 'zh-tw': '不存在名為{{name}}的賬號', 'en': 'Account named {{name}} does not exist' },
  // 原创
  'originalFilterGroupTitle': { 'zh-cn': '原创', 'zh-hk': '原創', 'zh-tw': '原創', 'en': 'Original' },
  'originalFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'originalFilterDetails': { 'zh-cn': '原创是以下账号的微博', 'zh-hk': '原創是以下帳號的微博', 'zh-tw': '原創是以下帳號的微博', 'en': 'Hide original Weibo from these accounts' },
  'originalFilterFast': { 'zh-cn': '原创是“@{{name}}”的微博', 'zh-hk': '原創是「@{{name}}」的微博', 'zh-tw': '原創是「@{{name}}」的微博', 'en': 'Original Weibo from "@{{name}}"' },
  // 提到
  'mentionFilterGroupTitle': { 'zh-cn': '提到', 'zh-hk': '提到', 'zh-tw': '提到', 'en': 'Mention' },
  'mentionFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'mentionFilterDetails': { 'zh-cn': '提到以下帐号的微博', 'zh-hk': '提到以下帳號的微博', 'zh-tw': '提到以下帳號的微博', 'en': 'Weibo mentioned these accounts' },
  'mentionFilterFast': { 'zh-cn': '提到了“@{{name}}”的微博', 'zh-hk': '提到了「@{{name}}」的微博', 'zh-tw': '提到了「@{{name}}」的微博', 'en': 'Weibo mentioned "@{{name}}"' },
  // 话题
  'topicFilterGroupTitle': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDesc': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDetails': { 'zh-cn': '包含以下话题的微博', 'zh-hk': '包含以下話題的微博', 'zh-tw': '包含以下話題的微博', 'en': 'Weibo with these topics' },
  'topicFilterFast': { 'zh-cn': '包含“#{{topic}}#”话题的微博', 'zh-hk': '包含「#{{topic}}#」話題的微博', 'zh-tw': '包含「#{{topic}}#」話題的微博', 'en': 'Weibo contained topic "#{{topic}}#"' },
  'rtopicFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'rtopicFilterDetails': { 'zh-cn': '包含匹配以下正则表达式的话题的微博', 'zh-hk': '包含匹配以下正則表達式的话题的微博', 'zh-tw': '包含匹配以下正規表示式的话题的微博', 'en': 'Weibo with topic matches these regular expressions' },
  // 来源
  'sourceFilterGroupTitle': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'sourceFilterDesc': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'Via' },
  'sourceFilterDetails': { 'zh-cn': '以下来源的微博', 'zh-hk': '以下來源的微博', 'zh-tw': '以下來源的微博', 'en': 'Weibo from these sources' },
  'sourceFilterFast': { 'zh-cn': '来自“{{source}}”的微博', 'zh-hk': '來自「{{source}}」的微博', 'zh-tw': '來自「{{source}}」的微博', 'en': 'Weibo via "{{source}}"' },
  'sourceFilterWarningTitle': { 'zh-cn': '默认来源', 'zh-hk': '預設來源', 'zh-tw': '預設來源', 'en': 'Default Source' },
  'sourceFilterWarning': { 'zh-cn': '不能添加默认来源', 'zh-hk': '不能新增預設來源', 'zh-tw': '不能新增預設來源', 'en': 'You cannot add default source' },
  // 超链接
  'hyperlinkFilterGroupTitle': { 'zh-cn': '链接', 'zh-hk': '連結', 'zh-tw': '連結', 'en': 'Link' },
  'hyperlinkFilterDesc': { 'zh-cn': '超链接', 'zh-hk': '超連結', 'zh-tw': '超連結', 'en': 'Hyperlink' },
  'hyperlinkFilterDetails': { 'zh-cn': '包含指向以下网站的超链接的微博', 'zh-hk': '包含指向以下站點的超連結的微博', 'zh-tw': '包含指向以下站點的超連結的微博', 'en': 'Weibo with hyperlink to these website' },
  'hyperlinkFilterFast': { 'zh-cn': '包含指向包含“{{host}}”地址链接的微博', 'zh-hk': '包含指向包含「{{host}}」位址連結的微博', 'zh-tw': '包含指向包含「{{host}}」位址連結的微博', 'en': 'Weibo contains hyperlink to "{{host}}"' },
  // 更多
  'otherFilterGroupTitle': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  // 显示
  'otherWhitelistTitle': { 'zh-cn': '显示以下内容（不计入白名单）', 'zh-hk': '顯示以下內容（不計入白名單）', 'zh-tw': '顯示以下內容（不計入白名單）', 'en': 'Show following content (not regard as whitelist)' },
  'showMyWeiboDesc': { 'zh-cn': '自己的微博', 'zh-hk': '自己的微博', 'zh-tw': '自己的微博', 'en': 'Weibo by myself' },
  'showMyOriginalDesc': { 'zh-cn': '自己微博的转发', 'zh-hk': '自己微博的轉發', 'zh-tw': '自己微博的轉發', 'en': 'Forward of my Weibo' },
  'showMentionMeDesc': { 'zh-cn': '提到自己的微博', 'zh-hk': '提到自己的微博', 'zh-tw': '提到自己的微博', 'en': 'Weibo mentioned myself' },
  // 隐藏
  'otherBlacklistTitle': { 'zh-cn': '隐藏以下内容', 'zh-hk': '隱藏以下內容', 'zh-tw': '隱藏以下內容', 'en': 'Hide following content' },
  'adfeedFilterDesc': { 'zh-cn': '推广微博', 'zh-hk': '推廣微博', 'zh-tw': '推廣微博', 'en': 'Ad Weibo' },
  'fansTopFilterDesc': { 'zh-cn': '粉丝头条', 'zh-hk': '粉丝头条', 'zh-tw': '粉丝头条'/* as is */, 'en': 'Fans top Weibo' },
  'recommandFeedDesc': { 'zh-cn': '推荐微博', 'zh-hk': '建議微博', 'zh-tw': '建議微博', 'en': 'Recommended Weibo' },
  'fakeWeiboFilterDesc': { 'zh-cn': '混入微博列表的其它内容', 'zh-hk': '混入微博列表的其它內容', 'zh-tw': '混入微博列表的其它內容', 'en': 'Other contents in Weibo list' },
  'deletedForwardFilterDesc': { 'zh-cn': '已删除微博的转发', 'zh-hk': '已刪除微博的轉發', 'zh-tw': '已刪除微博的轉發', 'en': 'Forward of deleted Weibo' },
  'voteWeiboFilterDesc': { 'zh-cn': '投票微博', 'zh-hk': '投票微博', 'zh-tw': '投票微博', 'en': 'Voting weibo' },
  'taobaoTianmaoWeibo': { 'zh-cn': '带有淘宝或天猫商品的微博', 'zh-hk': '帶有淘寶或天貓商品的微博', 'zh-tw': '帶有淘寶或天貓商品的微博', 'en': 'Weibo with Taobao / Tmall commodity' },
  // 刷屏与版聊
  'otherSpammingTitle': { 'zh-cn': '刷屏与版聊', 'zh-hk': '洗版與版聊', 'zh-tw': '洗版與版聊', 'en': 'Spamming &amp; Chatting' },
  'sameAccountFilterDesc': { 'zh-cn': '相同作者的微博：|超过{{<number>}}条|时{{<action>}}', 'zh-hk': '相同作者的微博：|超過{{<number>}}條|時{{<action>}}', 'zh-tw': '相同作者的微博：|超過{{<number>}}條|時{{<action>}}', 'en': 'Weibo from same account: |{{<action>}} the part | which exceeds {{<number>}} Weibo' },
  'sameForwardFilterDesc': { 'zh-cn': '相同微博的转发：|超过{{<number>}}条|时{{<action>}}', 'zh-hk': '相同微博的轉發：|超過{{<number>}}條|時{{<action>}}', 'zh-tw': '相同微博的轉發：|超過{{<number>}}條|時{{<action>}}', 'en': 'Forward from same Weibo: |{{<action>}} the part | which exceeds {{<number>}} Weibo' },
  // 分组浏览
  'otherGroupTitle': { 'zh-cn': '分组浏览', 'zh-hk': '分組流覽', 'zh-tw': '分組流覽', 'en': 'Browse by Group' },
  'accountByGroup': { 'zh-cn': '分组浏览时禁用按帐号隐藏', 'zh-hk': '分組流覽時禁用按帳號隱藏', 'zh-tw': '分組流覽時禁用按帳號隱藏', 'en': 'Disable hide by account filter when browsing by group' },
  'sameAccountByGroup': { 'zh-cn': '浏览分组时禁用相同作者数量限制', 'zh-hk': '流覽分組時禁用相同作者數量限制', 'zh-tw': '流覽分組時禁用相同作者數量限制', 'en': 'Disable hide too many Weibo from same account filter when browsing by group' },
  // 脚本
  'scriptToolsTitle': { 'zh-cn': '脚本', 'zh-hk': '腳本', 'zh-tw': '腳本', 'en': 'Script' },
  'useFastCreator': { 'zh-cn': '使用拖放快速创建过滤器', 'zh-hk': '使用拖放快速創建篩選器', 'zh-tw': '使用拖放快速創建篩選器', 'en': 'Use drag and drop to create filters' },
  'blockHiddenWeiboDesc': { 'zh-cn': '告知服务器被隐藏的微博以避免再次加载', 'zh-hk': '告知伺服器被隱藏的微博以避免再次載入', 'zh-tw': '告知伺服器被隱藏的微博以避免再次載入', 'en': 'Send blocked Weibo to server to avoid reloading' },
  // 自动载入
  'autoLoadNewWeiboTitle': { 'zh-cn': '自动载入新微博', 'zh-hk': '自動載入新微博', 'zh-tw': '自動載入新微博', 'en': 'New Weibo Auto Load' },
  'autoLoadNewWeibo': { 'zh-cn': '自动载入新微博', 'zh-hk': '自動載入新微博', 'zh-tw': '自動載入新微博', 'en': 'New Weibo Auto Load' },
  // 分隔条
  'timeTipHour': { 'zh-cn': '小时', 'zh-hk': '小時', 'zh-tw': '小時', 'en': ' hour' },
  'timeTipMin': { 'zh-cn': '分钟', 'zh-hk': '分鐘', 'zh-tw': '分鐘', 'en': ' min' },
  'timeTipText': { 'zh-cn': '前，你看到这里', 'zh-hk': '前，你看到這裡', 'zh-tw': '前，你看到這裡', 'en': ' ago, you see here' /* as is */ },
  // 自动展开
  'autoExpand': {
    'zh-cn': '自动载入后直接展开显示||{{<etypes>}}仅对白名单的微博自动展开显示||{{<background>}}页面处于活动状态时暂停',
    'zh-hk': '自動載入後直接展開顯示||{{<etypes>}}僅對白名單的微博自動展開顯示||{{<background>}}頁面處於活動狀態時暫停',
    'zh-tw': '自動載入後直接展開顯示||{{<etypes>}}僅對白名單的微博自動展開顯示||{{<background>}}頁面處於活動狀態時暫停',
    'en': 'Expand Weibo after auto load || {{<etypes>}} Only auto expand whitelist Weibo || {{<background>}} Pause when page actived',
  },
  'autoExpandAll': { 'zh-cn': '所有新微博', 'zh-hk': '所有新微博', 'zh-tw': '所有新微博', 'en': 'all new Weibo' },
  'autoExpandWhite': { 'zh-cn': '白名单微博', 'zh-hk': '白名單微博', 'zh-tw': '白名單微博', 'en': 'whitelist Weibo' },
  // 桌面提示
  'desktopNotification': {
    'zh-cn': '载入新微博后显示桌面提示||{{<types>}}仅对白名单的微博显示桌面提示||{{<autohide>}}桌面提醒延时自动关闭|显示{{<duration>}}毫秒|＋字数×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'zh-hk': '载入新微博后顯示桌面提示||{{<types>}}僅對白名單的微博顯示桌面提示||{{<autohide>}}桌面提醒延時自動關閉|顯示{{<duration>}}毫秒|＋字數×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'zh-tw': '载入新微博后顯示桌面提示||{{<types>}}僅對白名單的微博顯示桌面提示||{{<autohide>}}桌面提醒延時自動關閉|顯示{{<duration>}}毫秒|＋字數×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'en': 'Show desktop notification after auto load | {{<types>}} Only show desktop notification for whitelist Weibo || {{<autohide>}} auto hide desktop notification after | {{<duration>}}ms | + {{<durationc>}}ms/char || {{<ntypes>}} Use webkitNotifications instead of Notification',
  },
  'desktopNotificationDisallowedTitle': { 'zh-cn': '桌面提示被阻止', 'zh-hk': '桌面提示被阻止', 'zh-tw': '桌面提示被阻止', 'en': 'Desktop Notification Disallowed' },
  'desktopNotificationDisallowed': {
    'zh-cn': '您的浏览器阻止了桌面提示。请按照如下步骤解除阻止：<br />右击网页—查看页面信息—权限—显示通知—允许<br />此外，如果您安装了 Tab notifier 等扩展，请到扩展的设置中允许显示桌面提示。',
    'zh-hk': '您的流覽器阻止了桌面提示。請按照如下步驟解除阻止：<br />右擊網頁—檢視頁面資訊—權限—顯示通知—允許<br />此外，如果您安裝了 Tab notifier 等擴充套件，請到擴充套件的設置中允許顯示桌面提示。',
    'zh-tw': '您的流覽器阻止了桌面提示。請按照如下步驟解除阻止：<br />右擊網頁—檢視頁面資訊—權限—顯示通知—允許<br />此外，如果您安裝了 Tab notifier 等擴充套件，請到擴充套件的設置中允許顯示桌面提示。',
    'en': 'Your browser blocked desktop notifications. Please follow the instruction to unblock: <br />Right click webpage - View Page Info - Permission - Notifications - Allow. You should also check settings of extensions, if you installed extensions like Tab notifier.',
  },
  'autoCloseWarning': {
    'zh-cn': '当前火狐浏览器提供的 Notification 会强制显示 4 秒后关闭，如果您希望显示较长时间，请考虑使用 Tab notifier 等扩展提供的 webkitNotifications。',
    'zh-hk': '當前火狐流覽器提供的 Notification 會強制顯示 4 秒後關閉，如果您希望顯示較長時間，請考慮使用 Tab notifier 等擴充套件提供的 webkitNotifications。',
    'zh-tw': '當前火狐流覽器提供的 Notification 會強制顯示 4 秒後關閉，如果您希望顯示較長時間，請考慮使用 Tab notifier 等擴充套件提供的 webkitNotifications。',
    'en': 'Currently, Notification provided by Firefox will be mandatorily closed with 4 seconds delay after shown. You may need to use webkitNotifications provided by add-ons like Tab notifier for longer notification display.',
  },
  // 模块
  'layoutFilterGroupTitle': { 'zh-cn': '模块', 'zh-hk': '模組', 'zh-tw': '模組', 'en': 'Module' },
  'layoutFilterGroupDesc': { 'zh-cn': '隐藏以下模块', 'zh-hk': '隱藏以下模組', 'zh-tw': '隱藏以下模組', 'en': 'Hide following modules' },
  // 标识图标
  'layoutHideIcon': { 'zh-cn': '标识/图标', 'zh-hk': '標誌/圖示', 'zh-tw': '標誌/圖示', 'en': 'Logo / Icon' },
  'layoutHideIconLevel': { 'zh-cn': '等级', 'zh-hk': 'Level', 'zh-tw': '等級', 'en': 'Level' },
  'layoutHideIconMember': { 'zh-cn': '微博会员', 'zh-hk': '微博會員', 'zh-tw': '微博會員', 'en': 'Weibo VIP / Member' },
  'layoutHideIconApprove': { 'zh-cn': '个人认证', 'zh-hk': '個人認證', 'zh-tw': '個人認證', 'en': 'Personal Authentication / 個人認證' },
  'layoutHideIconApproveCo': { 'zh-cn': '机构认证', 'zh-hk': '企業認證', 'zh-tw': '企業認證', 'en': 'Weibo Verification / 企業認證' },
  'layoutHideIconClub': { 'zh-cn': '微博达人', 'zh-hk': '微博達人', 'zh-tw': '微博達人', 'en': 'Pioneer' },
  'layoutHideIconVGirl': { 'zh-cn': '微博女郎', 'zh-hk': '微博女郎', 'zh-tw': '微博女郎', 'en': 'Weibo girl' },
  'layoutHideIconTaobao': { 'zh-cn': '淘宝商户', 'zh-hk': '淘寶商戶', 'zh-tw': '淘寶商戶', 'en': 'Taobao Merchant' },
  'layoutHideIconZongyika': { 'zh-cn': '我是综艺咖', 'zh-hk': '我是综艺咖'/* as is */, 'zh-tw': '我是综艺咖', 'en': '我是综艺咖 (Variety Wack)' },
  'layoutHideIconYouji': { 'zh-cn': '邂逅有机', 'zh-hk': '邂逅有机'/* as is */, 'zh-tw': '邂逅有机', 'en': '邂逅有机 (Travel Notes)' },
  // 导航栏
  'layoutHideNav': { 'zh-cn': '导航栏', 'zh-hk': '導覽列', 'zh-tw': '導覽列', 'en': 'Navigation Bar' },
  'layoutHideNavMain': { 'zh-cn': '首页', 'zh-hk': '首頁', 'zh-tw': '首頁', 'en': 'Home' },
  'layoutHideNavHot': { 'zh-cn': '热门', 'zh-hk': '熱門', 'zh-tw': '熱門', 'en': 'Hot' },
  'layoutHideNavApp': { 'zh-cn': '应用', 'zh-hk': '應用', 'zh-tw': '應用', 'en': 'Apps' },
  'layoutHideNavGame': { 'zh-cn': '游戏', 'zh-hk': '遊戲', 'zh-tw': '遊戲', 'en': 'Game' },
  'layoutHideNavMember': { 'zh-cn': '会员菜单', 'zh-hk': '會員功能表', 'zh-tw': '會員功能表', 'en': 'VIP Menu' },
  // 左栏
  'layoutHideLeft': { 'zh-cn': '左栏', 'zh-hk': '左欄', 'zh-tw': '左欄', 'en': 'Left Column' },
  'layoutHideLeftToMe': { 'zh-cn': '发给我的', 'zh-hk': '發給我的', 'zh-tw': '發給我的', 'en': 'Send to me' },
  'layoutHideLeftFriends': { 'zh-cn': '好友圈', 'zh-hk': '好友圈', 'zh-tw': '好友圈', 'en': 'Friends' },
  'layoutHideLeftApp': { 'zh-cn': '应用', 'zh-hk': '应用', 'zh-tw': '应用'/* as is */, 'en': 'Apps' },
  // 中栏
  'layoutHideMiddle': { 'zh-cn': '中栏', 'zh-hk': '中欄', 'zh-tw': '中欄', 'en': 'Middle Column' },
  'layoutHideMiddleRecommendedTopic': { 'zh-cn': '热门微博（发布框上方）', 'zh-hk': '热门微博（發布框上方）', 'zh-tw': '热门微博（發布框上方）'/* as is */, 'en': '热门微博 (Hot Weibo), on top of publishing field' },
  'layoutHideMiddleFeedRecommand': { 'zh-cn': '微博兴趣推荐（顶部）', 'zh-hk': '微博興趣推薦（頂部）', 'zh-tw': '微博興趣推薦（頂部）', 'en': 'Feed Recommendation, top' },
  'layoutHideMiddleMemberTip': { 'zh-cn': '开通会员提示（底部）', 'zh-hk': '開通會員提示（底部）', 'zh-tw': '開通會員提示（底部）', 'en': 'Tip of Joining Weibo VIP, bottom' },
  // 右栏
  'layoutHideRight': { 'zh-cn': '右栏', 'zh-hk': '右欄', 'zh-tw': '右欄', 'en': 'Right Column' },
  'layoutHideRightTemplate': { 'zh-cn': '设置模板', 'zh-hk': '背景設定', 'zh-tw': '背景設定', 'en': 'Template Settings' },
  'layoutHideRightInfo': { 'zh-cn': '头像', 'zh-hk': '頭像', 'zh-tw': '頭像', 'en': 'Avatar' },
  'layoutHideRightTrial': { 'zh-cn': '登录赢会员', 'zh-hk': '登录赢会员', 'zh-tw': '登录赢会员'/* as is */, 'en': '登录赢会员 (Login for VIP Trial)' },
  'layoutHideRightAtten': { 'zh-cn': '关注/粉丝/微博数', 'zh-hk': '關注/粉絲/微博數', 'zh-tw': '關注/粉絲/微博數', 'en': 'Numbers of Following/Followers/Weibo' },
  'layoutHideRightInterest': { 'zh-cn': '可能感兴趣的人', 'zh-hk': '可能感興趣的人', 'zh-tw': '可能感興趣的人', 'en': 'You may know' },
  'layoutHideRightHotTopic': { 'zh-cn': '热门话题', 'zh-hk': '熱門話題', 'zh-tw': '熱門話題', 'en': 'Hot Topic' },
  'layoutHideRightMember': { 'zh-cn': '会员专区', 'zh-hk': '會員專區', 'zh-tw': '會員專區', 'en': 'Weibo VIP' },
  'layoutHideRightWeibo': { 'zh-cn': '热门微博', 'zh-hk': '熱門微博', 'zh-tw': '熱門微博', 'en': 'Hot Weibo' },
  'layoutHideRightLocation': { 'zh-cn': '地点推荐', 'zh-hk': '地點推薦', 'zh-tw': '地點推薦', 'en': 'Location' },
  'layoutHideRightMusic': { 'zh-cn': ' 热门歌曲', 'zh-hk': '熱門歌曲', 'zh-tw': '熱門歌曲', 'en': 'Hot Music' },
  'layoutHideRightMovie': { 'zh-cn': '最新电影', 'zh-hk': '最新電影', 'zh-tw': '最新電影', 'en': 'Hot Movie' },
  'layoutHideRightBook': { 'zh-cn': '人气图书', 'zh-hk': '人氣圖書', 'zh-tw': '人氣圖書', 'en': 'Hot Book' },
  'layoutHideRightNotice': { 'zh-cn': '公告栏', 'zh-hk': '公告欄', 'zh-tw': '公告欄', 'en': 'Bulletin Board' },
  // 微博内
  'layoutHideWeibo': { 'zh-cn': '微博内', 'zh-hk': '微博內', 'zh-tw': '微博內', 'en': 'In Weibo' },
  'layoutHideWeiboRecomFeed': { 'zh-cn': '精彩微博推荐', 'zh-hk': '精彩微博推薦', 'zh-tw': '精彩微博推薦', 'en': '精彩微博推荐 (Weibo you may interested in)' },
  'layoutHideWeiboTopicCard': { 'zh-cn': '话题卡片', 'zh-hk': '話題卡片', 'zh-tw': '話題卡片', 'en': 'Topic Cards' },
  'layoutHideWeiboFeedTip': { 'zh-cn': '评论框提示横幅', 'zh-hk': '評論框提示橫幅', 'zh-tw': '評論框提示橫幅', 'en': 'Tips for Comment' },
  'layoutHideWeiboTopComment': { 'zh-cn': '热门评论', 'zh-hk': '热门评论', 'zh-tw': '热门评论'/* as is */, 'en': 'Top comments' },
  'layoutHideWeiboSonTitle': { 'zh-cn': '同源转发合并提示', 'zh-hk': '同源转发合并提示', 'zh-tw': '同源转发合并提示', 'en': '同源转发合并 (Merge forwards from same origin)' },
  'layoutHideWeiboLocationCard': { 'zh-cn': '位置卡片', 'zh-hk': '位置卡片', 'zh-tw': '位置卡片', 'en': 'Location Cards' },
  'layoutHideWeiboSource': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'layoutHideWeiboReport': { 'zh-cn': '举报', 'zh-hk': '檢舉', 'zh-tw': '檢舉', 'en': 'Report' },
  'layoutHideWeiboLike': { 'zh-cn': '赞', 'zh-hk': '讚', 'zh-tw': '讚', 'en': 'Like' },
  'layoutHideWeiboForward': { 'zh-cn': '转发', 'zh-hk': '轉發', 'zh-tw': '轉發', 'en': 'Forward' },
  'layoutHideWeiboFavourite': { 'zh-cn': '收藏', 'zh-hk': '收藏', 'zh-tw': '收藏', 'en': 'Favourite' },
  'layoutHideWeiboBlockBySource': { 'zh-cn': '屏蔽来源', 'zh-hk': '屏蔽來源', 'zh-tw': '屏蔽來源', 'en': 'Block Source' },
  'layoutHideWeiboBlockByKeyword': { 'zh-cn': '屏蔽关键词', 'zh-hk': '屏蔽關鍵詞', 'zh-tw': '屏蔽關鍵詞', 'en': 'Block Keywords' },
  // 个人主页
  'layoutHidePerson': { 'zh-cn': '个人主页', 'zh-hk': '個人主頁', 'zh-tw': '個人主頁', 'en': 'Ones home page' },
  'layoutHidePersonMoveThings': { 'zh-cn': '移动部件（会员模板）', 'zh-hk': '移動部件（會員模板）', 'zh-tw': '移動部件（會員模板）', 'en': 'Moving Things (VIP Template)' },
  'layoutHidePersonCover': { 'zh-cn': '封面图', 'zh-hk': '封面圖', 'zh-tw': '封面圖', 'en': 'Cover Picture' },
  'layoutHidePersonTemplate': { 'zh-cn': '模板设置', 'zh-hk': '模板設置', 'zh-tw': '模板設置', 'en': 'Template Settings' },
  'layoutHidePersonBadgeIcon': { 'zh-cn': '勋章', 'zh-hk': '勳章', 'zh-tw': '勳章', 'en': 'Badges' },
  'layoutHidePersonStats': { 'zh-cn': '关注/粉丝/微博数', 'zh-hk': '關注/粉絲/微博數', 'zh-tw': '關注/粉絲/微博數', 'en': 'Numbers of Following/Followers/Weibo' },
  'layoutHidePersonMyData': { 'zh-cn': '我的微博人气', 'zh-hk': '我的微博人气', 'zh-tw': '我的微博人气', 'en': '我的微博人气 (My Micro World)' },
  'layoutHidePersonSuggestUser': { 'zh-cn': '可能感兴趣的人', 'zh-hk': '可能感兴趣的人', 'zh-tw': '可能感兴趣的人'/* as is */, 'en': 'Suggested' },
  'layoutHidePersonGroup': { 'zh-cn': '推荐的人', 'zh-hk': '推荐的人', 'zh-tw': '推荐的人'/* as is */, 'en': '推荐的人 (Suggested Group)' },
  'layoutHidePersonRelation': { 'zh-cn': '微关系', 'zh-hk': '微关系', 'zh-tw': '微关系'/* as is */, 'en': 'Relationship' },
  'layoutHidePersonAlbum': { 'zh-cn': '图片', 'zh-hk': '相冊', 'zh-tw': '相冊', 'en': 'Album' },
  'layoutHidePersonHotTopic': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'layoutHidePersonHotWeibo': { 'zh-cn': '热门微博', 'zh-hk': '熱門微博', 'zh-tw': '熱門微博', 'en': 'Hot Weibo' },
  // 杂项
  'layoutHideOther': { 'zh-cn': '杂项', 'zh-hk': '雜項', 'zh-tw': '雜項', 'en': 'Others' },
  'layoutHideOtherAds': { 'zh-cn': '广告', 'zh-hk': '廣告', 'zh-tw': '廣告', 'en': 'Advertisement' },
  'layoutHideOtherFeedRecom': { 'zh-cn': '相关微博推荐', 'zh-hk': '相关推荐', 'zh-tw': '相关推荐', 'en': '相关推荐 (Related Weibo Suggestion)' },
  'layoutHideOtherFooter': { 'zh-cn': '页面底部', 'zh-hk': '頁面底部', 'zh-tw': '頁面底部', 'en': 'Footer' },
  'layoutHideOtherWbIm': { 'zh-cn': '微博桌面推荐（右下）', 'zh-hk': '微博桌面推薦（右下）', 'zh-tw': '微博桌面推薦（右下）', 'en': '微博桌面2014 (Desktop Weibo), bottom right' },
  'layoutHideOtherTip': { 'zh-cn': '功能提示框', 'zh-hk': '功能提示框', 'zh-tw': '功能提示框', 'en': 'Function Tips' },
  'layoutHideOtherIM': { 'zh-cn': '聊天联系人列表', 'zh-hk': '聊天連絡人列表', 'zh-tw': '聊天連絡人列表', 'en': 'IM Side bar' },
  // 工具
  'toolFilterGroupTitle': { 'zh-cn': '工具', 'zh-hk': '工具', 'zh-tw': '工具', 'en': 'Tool' },
  // 边栏
  'sideColumnToolsTitle': { 'zh-cn': '边栏', 'zh-hk': '邊欄', 'zh-tw': '邊欄', 'en': 'Side Column' },
  'showAllGroupDesc': { 'zh-cn': '展开左栏分组', 'zh-hk': '展開左欄分組', 'zh-tw': '展開左欄分組', 'en': 'Unfold groups in left column' },
  'showAllMsgNavDesc': { 'zh-cn': '展开左栏消息', 'zh-hk': '展開左欄消息', 'zh-tw': '展開左欄消息', 'en': 'Unfold news in left column' },
  'mergeLeftRight': { 'zh-cn': '合并左右边栏|到{{<side>}}', 'zh-hk': '合併左右邊欄|到{{<side>}}', 'zh-tw': '合併左右邊欄|到{{<side>}}', 'en': 'Merge left &amp; right column | to {{<side>}}' },
  'mergeLeftRightLeft': { 'zh-cn': '左侧', 'zh-hk': '左側', 'zh-tw': '左側', 'en': 'left side' },
  'mergeLeftRightRight': { 'zh-cn': '右侧', 'zh-hk': '右側', 'zh-tw': '右側', 'en': 'right side' },
  'fixedLeft': { 'zh-cn': '浮动左边栏|{{<items>}}', 'zh-hk': '浮動左邊欄|{{<items>}}', 'zh-tw': '浮動左邊欄|{{<items>}}', 'en': 'Float left column | {{<items>}}' },
  'fixedLeftDefault': { 'zh-cn': '默认元素', 'zh-hk': '預設元素', 'zh-tw': '預設元素', 'en': 'default elements' },
  'fixedLeftWhole': { 'zh-cn': '整个左栏', 'zh-hk': '整個左欄', 'zh-tw': '整個左欄', 'en': 'whole column' },
  'filteRightTopic': { 'zh-cn': '应用话题黑名单到右栏热门话题', 'zh-hk': '應用話題黑名單到右欄熱門話題', 'zh-tw': '應用話題黑名單到右欄熱門話題', 'en': 'Apply topic blacklist to Hot Topic in right column' },
  // 微博
  'weiboToolsTitle': { 'zh-cn': '微博', 'zh-hk': '微博', 'zh-tw': '微博', 'en': 'Weibo' },
  'clearDefTopicDesc': { 'zh-cn': '清除发布框中的默认话题', 'zh-hk': '清除發布框中的預設話題', 'zh-tw': '清除發布框中的預設話題', 'en': 'Remove default topic in Publisher' },
  'unwrapTextDesc': { 'zh-cn': '微博作者和正文同行', 'zh-hk': '微博作者和正文同行', 'zh-tw': '微博作者和正文同行', 'en': 'No line break after author' },
  'personalRedirectWeibo': { 'zh-cn': '访问帐号主页显示微博页面', 'zh-hk': '訪問帳號主頁顯示微博頁面', 'zh-tw': '訪問帳號主頁顯示微博頁面', 'en': 'Show Weibo page instead of personal main page by default' },
  'viewOriginalDesc': { 'zh-cn': '添加“查看原图”链接', 'zh-hk': '添加「查看原圖」連結', 'zh-tw': '添加「查看原圖」連結', 'en': 'add "Original Picture" link' },
  'viewOriginalText': { 'zh-cn': '查看原图', 'zh-hk': '查看原圖', 'zh-tw': '查看原圖', 'en': 'Original Picture' },
  'expandShortenedLink': { 'zh-cn': '自动展开新浪 t.cn 短网址', 'zh-hk': '自動展開新浪 t.cn 短網址', 'zh-tw': '自動展開新浪 t.cn 短網址', 'en': 'Auto expand Sina shortened URL (t.cn)' },
  'newWeiboNotify': { 'zh-cn': '有 {{count}} 条新微博，点击查看', 'zh-hk': '有 {{count}} 條新微博，點擊查看', 'zh-tw': '有 {{count}} 條新微博，點擊查看', 'en': 'You have {{count}} new Weibo，click to view', },
  // 样式
  'styleToolsTitle': { 'zh-cn': '外观', 'zh-hk': '外觀', 'zh-tw': '外觀', 'en': 'Appearance' },
  'hoverShowFold': { 'zh-cn': '鼠标指向被折叠微博时显示内容', 'zh-hk': '滑鼠指向被折疊微博時顯示內容', 'zh-tw': '滑鼠指向被折疊微博時顯示內容', 'en': 'Show folded Weibo when mouse over' },
  'whitelistHighlightDesc': { 'zh-cn': '高亮显示白名单的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '高亮顯示白名單的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '高亮顯示白名單的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'en': 'Highlight Weibo in whitelist with | background color {{<color>}} | transparency {{<transparency>}}%' },
  'mainBackgroundColorOverride': { 'zh-cn': '首页背景|颜色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '首頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '首頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'en': 'Background color for home page | {{<color>}} | transparency {{<transparency>}}%' },
  'profileBackgroundColorOverride': { 'zh-cn': '个人主页背景|颜色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '個人主頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '個人主頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'en': 'Background color for personal home page | {{<color>}} | transparency {{<transparency>}}%' },
  'weiboOnly': {
    'zh-cn': '阅读视图|宽度{{<width>}}px|快捷键{{<key>}}||{{<usebgc>}}使用指定背景色|{{<color>}}|透明度{{<transparency>}}%||{{<switch>}}在微博列表顶部显示快捷开关按钮',
    'zh-hk': '閱讀視圖|寬度{{<width>}}px|快速鍵{{<key>}}||{{<usebgc>}}使用指定背景色|{{<color>}}|透明度{{<transparency>}}%||{{<switch>}}在微博清單頂部顯示快速開關按鈕',
    'zh-tw': '閱讀視圖|寬度{{<width>}}px|快速鍵{{<key>}}||{{<usebgc>}}使用指定背景色|{{<color>}}|透明度{{<transparency>}}%||{{<switch>}}在微博清單頂部顯示快速開關按鈕',
    'en': 'Reading View | width {{<width>}}px | shortcut {{<key>}} || {{<usebgc>}} override background color | with {{<color>}} | transparency {{<transparency>}} || {{<switch>}} show switch button at top of Weibo list'
  },
  'weiboOnlyButton': { 'zh-cn': '切换视图', 'zh-hk': '切換視圖', 'zh-tw': '切換視圖', 'en': 'Switch View' },
  'keyInputTip': { 'zh-cn': '按下键盘修改快捷键设置', 'zh-hk': '按下鍵盤修改快速鍵設置', 'zh-tw': '按下鍵盤修改快速鍵設置', 'en': 'Press key to modify shortcut key setting' },
  'userstyleTitle': {
    'zh-cn': '<span>自定义CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">在 userstyles.org 上搜索样式</a><a class="yawf-userstyles-tip" target="_blank" href="https://github.com/tiansh/yawf/wiki/%E5%85%B6%E4%BB%96%E5%8F%AF%E5%B1%8F%E8%94%BD%E5%85%83%E7%B4%A0">常用自定义CSS</a></span>{{}}',
    'zh-hk': '<span>自訂CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">在 userstyles.org 上搜尋樣式</a><a class="yawf-userstyles-tip" target="_blank" href="https://github.com/tiansh/yawf/wiki/%E5%85%B6%E4%BB%96%E5%8F%AF%E5%B1%8F%E8%94%BD%E5%85%83%E7%B4%A0">常用自訂CSS</a></span>{{}}',
    'zh-tw': '<span>自訂CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">在 userstyles.org 上搜尋樣式</a><a class="yawf-userstyles-tip" target="_blank" href="https://github.com/tiansh/yawf/wiki/%E5%85%B6%E4%BB%96%E5%8F%AF%E5%B1%8F%E8%94%BD%E5%85%83%E7%B4%A0">常用自訂CSS</a></span>{{}}',
    'en': '<span>Customize CSS<a class="yawf-userstyles-tip" href="https://userstyles.org/styles/browse/weibo" target="_blank">Search styles on userstyles.org</a><a class="yawf-userstyles-tip" target="_blank" href="https://github.com/tiansh/yawf/wiki/%E5%85%B6%E4%BB%96%E5%8F%AF%E5%B1%8F%E8%94%BD%E5%85%83%E7%B4%A0">Common Customize CSS</a></span>{{}}'
  },
  'userstyleEditDesc': { 'zh-cn': '编辑 YAWF 自定义 CSS', 'zh-hk': '編輯 YAWF 自訂 CSS', 'zh-tw': '編輯 YAWF 自訂 CSS', 'en': 'Edit YAWF Customize CSS' },
  'userstyleEditDetails': { 'zh-cn': 'YAWF 自定义 CSS：', 'zh-hk': 'YAWF 自訂 CSS：', 'zh-tw': 'YAWF 自訂 CSS：', 'en': 'YAWF Customize CSS：' },
  // 脚本
  'scriptFilterGroupTitle': { 'zh-cn': '脚本', 'zh-hk': '腳本', 'zh-tw': '腳本', 'en': 'Script' },
  // 导入导出
  'configImportAndExport': { 'zh-cn': '设置', 'zh-hk': '設定', 'zh-tw': '設定', 'en': 'Setting' },
  'configImportButton': { 'zh-cn': '导入', 'zh-hk': '匯入', 'zh-tw': '匯入', 'en': 'Import' },
  'configImportWarningTitle': { 'zh-cn': '设置导入', 'zh-hk': '設定匯入', 'zh-tw': '設定匯入', 'en': 'Setting Import' },
  'configImportWarning': {
    'zh-cn': '导入的设置会覆盖您当前已有的设置，确实要导入设置吗？',
    'zh-hk': '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？',
    'zh-tw': '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？',
    'en': 'The imported settings may replace your current settings. Are you sure you want to import this file?'
  },
  'configImportSuccessTitle': { 'zh-cn': '设置导入完成', 'zh-hk': '設定匯入完成', 'zh-tw': '設定匯入完成', 'en': 'Import settings completed' },
  'configImportSuccess': { 'zh-cn': '已经成功地导入了设置', 'zh-hk': '已经成功地匯入了設定', 'zh-tw': '已经成功地匯入了設定', 'en': 'Successfully imported settings' },
  'configImportFailTitle': { 'zh-cn': '设置导入失败', 'zh-hk': '設定匯入失败', 'zh-tw': '設定匯入失败', 'en': 'Import settings failed' },
  'configImportFail': {
    'zh-cn': '导入设置文件时出现错误，可能是使用了错误的文件，文件已损坏或文件的版本不支持',
    'zh-hk': '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案已損壞或為不支援的版本',
    'zh-tw': '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案已損壞或為不支援的版本',
    'en': 'Error occurred during importing process. Wrong file may be used, the file may be broken, or the version of setting file is not supported.'
  },
  'configExportButton': { 'zh-cn': '导出', 'zh-hk': '匯出', 'zh-tw': '匯出', 'en': 'Export' },
  'configResetButton': { 'zh-cn': '重置', 'zh-hk': '重設', 'zh-tw': '重設', 'en': 'Reset' },
  'configResetWarningTitle': { 'zh-cn': '设置重置', 'zh-hk': '設定重設', 'zh-tw': '設定重設', 'en': 'Setting Reset' },
  'configResetWarning': { 'zh-cn': '这将会清空您当前的所有配置，确实要重置设置吗？', 'zh-hk': '這將會清空您當前的所有設定，您確定要重置設定嗎？', 'zh-tw': '這將會清空您當前的所有設定，您確定要重置設定嗎？', 'en': 'You are deleting all your settings. Are you sure you want to reset your settings?' },
  // 调试
  'scriptDebugTitle': { 'zh-cn': '调试', 'zh-hk': '偵錯', 'zh-tw': '偵錯', 'en': 'Debug' },
  'scriptDebug': { 'zh-cn': '在控制台打印调试信息', 'zh-hk': '將偵錯訊息列印到主控台', 'zh-tw': '將偵錯訊息列印到主控台', 'en': 'Print debug info to console' },
  // 关于
  'scriptAboutTitle': { 'zh-cn': '关于', 'zh-hk': '關於', 'zh-tw': '關於', 'en': 'About' },
  'scriptAbout': {
    'zh-cn': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF 使用 MIT 协议授权。您可以访问<a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">脚本主页</a>获取详细信息。<br />如果您在使用过程中遇到任何脚本的错误，或对脚本有任何建议，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">反馈页面</a>提供报告，或直接<a target="_blank" href="http://weibo.com/tsh90/weibo" rel="noreferrer">私信作者</a>；反馈前建议先阅读<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常见问题</a>。</p><p>本脚本参考并使用了<a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer">眼不见心不烦</a>脚本的部分代码。</p>',
    'zh-hk': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF 使用 MIT 協定授權。您可以訪問<a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">腳本主頁</a>獲取詳細資訊。<br />如果您在使用過程中遇到任何腳本的錯誤，或對腳本有任何建議，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">回饋頁面</a>提供報告，或直接<a target="_blank" href="http://weibo.com/tsh90/weibo" rel="noreferrer">私信作者</a>；回饋前建議先閱讀<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常見問題（簡體）</a>。</p><p>本腳本參考並使用了<a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer">眼不見心不煩</a>腳本的部分原始碼。</p>',
    'zh-tw': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF 使用 MIT 協定授權。您可以訪問<a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">腳本主頁</a>獲取詳細資訊。<br />如果您在使用過程中遇到任何腳本的錯誤，或對腳本有任何建議，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">回饋頁面</a>提供報告，或直接<a target="_blank" href="http://weibo.com/tsh90/weibo" rel="noreferrer">私信作者</a>；回饋前建議先閱讀<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常見問題（簡體）</a>。</p><p>本腳本參考並使用了<a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer">眼不見心不煩</a>腳本的部分原始碼。</p>',
    'en': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF is under the MIT License. You may want to visit <a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">project homepage</a> for more information.<br />If you find any bugs or have feature request, please report them in the <a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">feedback page</a>, or <a target="_blank" href="http://weibo.com/tsh90/weibo" rel="noreferrer">send message to author</a>. Please read <a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">FQA (Chinese)</a> page for common questions.</p><p>Some codes of this script come from <a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer"><span lang="zh-cn">眼不见心不烦</span> (Weibo Content Filter)</a> script.</p>',
  },
  // 拖拽
  'dropAreaTitle': { 'zh-cn': '拖放至此<br />快速创建过滤器', 'zh-hk': '拖放至此<br />快速創建篩選器', 'zh-tw': '拖放至此<br />快速創建篩選器', 'en': 'Drop Here to Create Filter' },
  'dropAreaText': { 'zh-cn': '将文字或链接拖放至此，快速创建过滤器。', 'zh-hk': '將文字或連結拖放至此，快速創建篩選器。', 'zh-tw': '將文字或連結拖放至此，快速創建篩選器。', 'en': 'Drop text or link here to create filter.' },
  'fastCreateChoseTitle': { 'zh-cn': '创建过滤器', 'zh-hk': '創建篩選器', 'zh-tw': '創建篩選器', 'en': 'Create Filter' },
  'fastFilterChoseText': { 'zh-cn': '请选择要创建的过滤器：', 'zh-hk': '請選擇要創建的篩選器：', 'zh-tw': '請選擇要創建的篩選器：', 'en': 'Chose the filter(s) you want:' },
  // 扩展
  'scriptExtensionTitle': { 'zh-cn': '扩展', 'zh-hk': '擴充', 'zh-tw': '擴充', 'en': 'Extension' },
  'scriptExtensionEnable': { 'zh-cn': '启用对 YAWF 的扩展', 'zh-hk': '啟用對 YAWF 的擴充', 'zh-tw': '啟用對 YAWF 的擴充', 'en': 'Enable Extension for YAWF' },
  'scriptExtensionWarning': {
    'zh-cn': '注意，扩展以用户脚本的形式安装，您只应当从您信任的来源安装用户脚本，恶意的脚本可能会侵犯您的隐私并在您不知情的情况下以您的名义进行操作。如果您希望编写 YAWF 的扩展，请参考常见问题。',
    'zh-hk': '注意，擴充以用戶腳本的形式安裝，您只應當從您信任的來源安裝用戶腳本，惡意的腳本可能會危害您的隱私，並在您不知情的情況下以您的名義執行。如果您希望撰寫 YAWF 的擴展，請參考常見問題（簡體）。',
    'zh-tw': '注意，擴充以用戶腳本的形式安裝，您只應當從您信任的來源安裝用戶腳本，惡意的腳本可能會危害您的隱私，並在您不知情的情況下以您的名義執行。如果您希望撰寫 YAWF 的擴展，請參考常見問題（簡體）。',
    'en': 'Notice: Extension was installed as userscript. You should only install scripts trusted. Malicious scripts can violate your privacy and act on your behalf without your knowledge. Please refer to the FQA Page, if you want to write your extension for YAWF.',
  },
  'sandboxSupportWarningMsgTitle': { 'zh-cn': 'YAWF 扩展', 'zh-hk': 'YAWF 擴充', 'zh-tw': 'YAWF 擴充', 'en': 'YAWF Extension' },
  'sandboxSupportWarningMsg': {
    'zh-cn': '您正在使用 Greasemonkey 1.x 或其他不支持沙箱机制的脚本宿主。出于安全考虑，建议禁用 YAWF 的扩展功能。如果您执意要在没有沙箱的环境下使用，您可以在设置中禁用本警告。',
    'zh-hk': '您正在使用 Greasemonkey 1.x 或其他不支持沙箱機制的腳本裝載。出於安全考慮，請禁用 YAWF 的擴充功能。如果您執意要在沒有沙箱的環境下使用，您可以在設置中禁用本警告。',
    'zh-tw': '您正在使用 Greasemonkey 1.x 或其他不支持沙箱機制的腳本裝載。出於安全考慮，請禁用 YAWF 的擴充功能。如果您執意要在沒有沙箱的環境下使用，您可以在設置中禁用本警告。',
    'en': 'You are running Greasemonkey 1.x or other script host which do not support sandbox. Disabling Extension for YAWF is suggested due to security reason. You may also disalbe this warning if you still want to use this extension for YAWF. ',
  },
  'sandboxSupportWarningTitle': { 'zh-cn': '禁用警告', 'zh-hk': '禁用警告', 'zh-tw': '禁用警告', 'en': 'Disable Warning' },
  'sandboxSupportWarningDisable': { 'zh-cn': '禁用对没有完整沙箱机制的警告', 'zh-hk': '禁用對沒有完整沙箱機制的警告', 'zh-tw': '禁用對沒有完整沙箱機制的警告', 'en': 'Disable warning for incomplete sandbox support' },
  'extensionFilterGroupTitle': { 'zh-cn': '扩展', 'zh-hk': '擴充', 'zh-tw': '擴充', 'en': 'Extension' },
};

// 页面常量
var html = {
  '|': '</label><label>', // 先关闭前面的label，再从后面开一个，所以这里没写反
  '||': '</label><br /><label>',
  'select': '<select>{{options}}</select>',
  'option': '<option value="{{value}}">{{{text}}}</option>',
  // 对话框
  'cover': '<div node-type="outer" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: #000; opacity: 0.3; z-index: 10001;"></div>',
  'dialog': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title"><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"></div></div></td></tr></tbody></table></div></div>',
  'alert': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title" style=""><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"><div class="layer_point" node-type="outer"><dl class="point clearfix"><dt><span node-type="icon" class="icon_{{icon}}M"></span></dt><dd node-type="inner"><p node-type="textLarge" class="S_txt1">{{text}}</p><p node-type="textSmall" class="S_txt2"></p></dd></dl><div class="btn"><a node-type="OK" class="W_btn_a" href="javascript:void(0)"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a></div></div></div></div></td></tr></tbody></table></div></div>',
  'confirm': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title" style=""><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"><div class="layer_point" node-type="outer"><dl class="point clearfix"><dt><span node-type="icon" class="icon_{{icon}}M"></span></dt><dd node-type="inner"><p node-type="textLarge" class="S_txt1">{{text}}</p><p node-type="textComplex" class="S_txt2" style="display: none;"></p><p node-type="textSmall" class="S_txt2" style="display: none;"></p></dd></dl><div class="btn"><a node-type="OK" class="W_btn_a" href="javascript:void(0)"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a><a node-type="cancel" class="W_btn_b" href="javascript:void(0)"><span class="btn_30px W_f14">{{cancelButtonTitle}}</span></a></div></div></div></div></td></tr></tbody></table></div></div>',
  // 漏斗图标
  'icon': '<div class="gn_setting" node-type="filter"><i><a class="gn_tab gn_filter" href="#"><span class="ico">{{filter}}</span></a></i></div>',
  // 设置窗口
  'configHeaderTop': '<div class="profile_tab S_line5 yawf-config-header" node-type="yawf-config-header"><ul class="pftb_ul S_line1">',
  'configHeaderItem': '<li class="pftb_itm S_line1 {{liclass}}"><a class="pftb_lk S_line5 S_txt1 {{aclass}}" action-type="tab_item" onclick="return false;" href="javascript:void(0);">{{name}}</a>',
  'configHeaderBottom': '</ul></div>',
  'configLayerTop': '<div node-type="yawf-config-body" class="yawf-config-body">',
  'configLayerItem': '<div class="{{name}} yawf-config-layer" node-type="{{name}}" style="display: none;"></div>',
  'configLayerBottom': '</div>',
  'configFooter': '',
  // 设置窗口内文字
  'configSubtitle': '<div class="yawf-groupSubtitle">{{{text}}}</div>',
  'configText': '<div class="yawf-groupText">{{{text}}}</div>',
  'configRemark': '<div class="yawf-groupRemark">{{{text}}}</div>',
  // 设置项
  'configBoolean': '<div class="yawf-configBoolean yawf-configItem"><label>{{text}}</label></div>',
  'configBooleanInput': '<div class="yawf-configInput yawf-configBooleanInput"><input id="yawf-{{key}}" class="W_checkbox yawf-configBooleanInput" type="checkbox" name="yawf-{{key}}"></div>',
  'configSelect': '<div class="yawf-configSelect yawf-configItem"><label>{{text}}</label></div>',
  'configSelectInput': '<div class="yawf-configInput yawf-configSelectInput"><select class="yawf-configSelectSelect" name="yawf-{{key}}"></select></div>',
  'configString': '<div class="yawf-configString yawf-configItem"><label>{{text}}</label></div>',
  'configStringInput': '<div class="yawf-configInput yawf-configStringInput"><textarea id="yawf-{{key}}" class="W_input yawf-configStringInput" name="yawf-{{key}}"></textarea></div>',
  'configColor': '<div class="yawf-configColor yawf-configItem"><label>{{text}}</label></div>',
  'configColorInput': '<div class="yawf-configInput yawf-configColorInput"><input type="color" class="W_f14" style="width: 40px;" /></div>',
  'configNumber': '<div class="yawf-configNumber yawf-configItem"><label>{{text}}</label></div>',
  'configNumberInput': '<div class="yawf-configInput yawf-configNumberInput"><input type="number" class="W_f14" style="width: 60px;" /></div>',
  'configRange': '<div class="yawf-configRange yawf-configItem"><label>{{text}}</label></div>',
  'configRangeInput': '<div class="yawf-configInput yawf-configRangeInput"><input type="number" min="0" max="100" maxlength="3" class="W_f14" style="text-align: right;" /><div class="yawf-range-container"><input type="range" style="height: 1em; width: 66px; margin-left: 7px; margin-right: 7px; " tabindex="-1" /></div></div>',
  'configKey': '<div class="yawf-configKey yawf-configItem"><label>{{text}}</label></div>',
  'configKeyInput': '<div class="yawf-configInput yawf-configKeyInput"><button class="W_f14 yawf-configKeyName"></button><input type="hidden" /><span class="yawf-configKeyTip">{{keyInputTip}}</span></div>',
  'configStrings': '<div class="yawf-configStrings yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configStringsDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configStringsInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configStringsAdd}}</span></button></form><ul class="yawf-configStringsItems"></ul></div>',
  'configStringsItem': '<li class="W_btn_arrow tag yawf-configStringsItem"><span>{{[item]}}<a class="W_ico12 icon_close" href="javascript:void(0);"></a></span></li>',
  'configUsers': '<div class="yawf-configUsers yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configUsersDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configUsersInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configUsersAdd}}</span></button></form><ul class="yawf-configUsersItems"></ul></div>',
  'configUsersItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}"></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><span class="object_name" uid="{{id}}" title="{{name}}">{{name}}</span></p><p class="W_fr"><a class="W_ico12 icon_close" action-data="uid={{id}}" href="javascript:void(0);"></a></p></div><div class="other_info"></div></div></div></div></li>',
  'configPrefill': '<span class="yawf-configPrefill" id="{{id}}"></span>',
  // 导入导出
  'configImportExport': '<div class="yawf-configImportExport yawf-configItem"><label><input type="file" style=" width: 1px; height: 1px; margin: 0 -1px 0 0; opacity: 0;" /><span node-type="import" class="W_btn_b" action-type="import"><span class="W_f14">{{configImportButton}}</span></span></label><a node-type="export" class="W_btn_b" action-type="export" href="javascript:;"><span class="W_f14">{{configExportButton}}</span></a><a node-type="reset" class="W_btn_b" action-type="reset" href="javascript:;"><span class="W_f14">{{configResetButton}}</span></a></div>',
  // 查看原图
  'viewOriginalLink': '<a target="_blank" class="show_big" suda-data="key=tblog_newimage_feed&value=view_original" action-type="maximum" href="javascript:;"><em class="W_ico12 ico_showbig"></em>{{viewOriginalText}}</a><i class="W_vline">|</i>',
  // 拖拽
  'dropArea': '<div id="yawf-drop-area" class="display: none;"><div class="yawf-drop-area-desc"><div class="yawf-drop-area-title">{{dropAreaTitle}}</div><div class="yawf-drop-area-text">{{dropAreaText}}</div></div><div contenteditable="true" id="yawf-drop-area-content"></div></div>',
  'fastFilterHeader': '<div id="yawf-fast-filter-chose"><div class="yawf-fast-filter-option"><span class="yawf-fast-filter-text">{{fastFilterChoseText}}</span><ul id="yawf-fast-filter-list">',
  'fastFilterItem': '<li class="yawf-fast-filter-item"><label><input class="W_checkbox yawf-configBooleanInput" type="checkbox"><span class="yawf-fastFilterItemInner"></span></label><select value="blacklist"><option value="whitelist">{{whitelistActionDesc}}</option><option value="blacklist">{{blacklistActionDesc}}</option><option value="foldlist">{{foldlistActionDesc}}</option></select></li>',
  'fastFilterFooter': '</ul></div><div class="btn clearfix"><a node-type="ok" class="W_btn_a" action-type="ok" href="javascript:;"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a><a node-type="cancel" class="W_btn_b" action-type="cancel" href="javascript:;"><span class="btn_30px W_f14">{{cancelButtonTitle}}</span></a></div></div>',
  'fastFilterString': '<label><span></span></label>',
  'fastFilterStringInput': '<input width="12" class="input_default" type="text" />',
  // 只看微博列表
  'weiboOnlyButton': '<div class="right_item"><div><a class="W_btn_round2" href="javascript:void(0);" title="{{text}}{{shortcut}}"><span>{{text}}</span></a></div></div></div>',
  // 分组或特别关注的未读提示
  'noticeContainer': '<div class="WB_feed_type SW_fun S_line2" action-type="feed_list_item" yawf-display="notice"></div>',
  // 有新微博的替代提示
  'feedListNewBar': '<a class="notes" yawf-id="feed_list_newBar" href="javascript:void(0);"></a>',
  'feedTimeTip': '<fieldset class="S_line2 between_line" yawf-id="feed_list_timeTip"><legend class="S_txt3" yawf-id="feed_list_timeText">{{{time}}}</legend></fieldset>',
};

var url = {
  'host': location.hostname === 'weibo.com' ? 'weibo.com' : 'www.weibo.com',
  'newcard': '//{{host}}/aj/user/newcard?type=1&{{query}}&_t=1&callback={{callback}}',
  'view_ori': 'http://photo.weibo.com/{{uid}}/wbphotos/large/mid/{{mid}}/pid/{{pid}}',
  'block_wb': '//{{host}}/aj/user/block?_wv=5&__rnd={{rnd}}',
};

// 将按键编号或将显示编号对应名称
var keys = (function () {
  var ctrl = 1 << 8, shift = 1 << 9, alt = 1 << 10, meta = 1 << 11, key = ctrl - 1;
  var namelist = '#0;#1;#2;Cancel;#4;#5;Help;#7;BackSpace;TAB;#10;#11;Clear;Enter;EnterSpecial;#15;;;;Pause;CapsLock;Kana;Eisu;Junja;Final;Hanja;#26;Esc;Convert;Nonconvert;Accept;ModeChange;Space;PageUp;PageDown;End;Home;Left;Up;Right;Down;Select;Print;Execute;PrintScreen;Insert;Delete;#47;0;1;2;3;4;5;6;7;8;9;Colon;Semicolon;LessThan;Equals;GreaterThan;QuestionMark;At;A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z;Win;#92;ContextMenu;#94;Sleep;NumPad0;NumPad1;NumPad2;NumPad3;NumPad4;NumPad5;NumPad6;NumPad7;NumPad8;NumPad9;Multiply;Add;Separator;Subtract;Decimal;Divide;F1;F2;F3;F4;F5;F6;F7;F8;F9;F10;F11;F12;F13;F14;F15;F16;F17;F18;F19;F20;F21;F22;F23;F24;#136;#137;#138;#139;#140;#141;#142;#143;NumLock;ScrollLocK;WIN_OEM_FJ_JISHO;WIN_OEM_FJ_MASSHOU;WIN_OEM_FJ_TOUROKU;WIN_OEM_FJ_LOYA;WIN_OEM_FJ_ROYA;#151;#152;#153;#154;#155;#156;#157;#158;#159;Circumflex;Exclamation;DoubleQuote;Hash;Dollar;Percent;Ampersand;Underscore;OpenParen;CloseParen;Asterisk;Plus;Pipe;HyphenMinus;OpenCurlyBracket;CloseCurlyBracket;Tilde;#177;#178;#179;#180;VolumeMute;VolumeDown;VolumeUp;#184;#185;#186;#187;Comma;#189;Period;Slash;BackQuote;#193;#194;#195;#196;#197;#198;#199;#200;#201;#202;#203;#204;#205;#206;#207;#208;#209;#210;#211;#212;#213;#214;#215;#216;#217;#218;OpenBracket;BackSlash;CloseBracket;Quote;#223;;AltGr;#226;WIN_ICO_HELP;WIN_ICO_00;#229;WIN_ICO_CLEAR;#231;#232;WIN_OEM_RESET;WIN_OEM_JUMP;WIN_OEM_PA1;WIN_OEM_PA2;WIN_OEM_PA3;WIN_OEM_WSCTRL;WIN_OEM_CUSEL;WIN_OEM_ATTN;WIN_OEM_FINISH;WIN_OEM_COPY;WIN_OEM_AUTO;WIN_OEM_ENLW;WIN_OEM_BACKTAB;Attn;Crsel;Exsel;Ereof;Play;Zoom;#252;PA1;WIN_OEM_CLEAR;#255'.split(';');
  // 对一个按键事件做编号
  var get = function (e) {
    var code = e.keyCode & key;
    if (e.ctrlKey) code |= ctrl;
    if (e.shiftKey) code |= shift;
    if (e.altKey) code |= alt;
    if (e.metaKey) code |= meta;
    return code;
  };
  // 给一个编号，转换为键名
  var name = function (n) {
    if (n === 0) return text.disabledKey;
    var ret = '';
    if (n & ctrl) ret += 'Ctrl-';
    if (n & shift) ret += 'Shift-';
    if (n & alt) ret += 'Alt-';
    if (n & meta) ret += 'Meta-';
    ret += namelist[n & key];
    if (ret.slice(-1) === '-') ret = ret.slice(0, -1);
    return ret;
  };
  // 注册全局监听按键
  var triggers = {};
  var reg = function (key, callback) {
    triggers[key] = triggers[key] || [];
    triggers[key].push(withTry(callback));
  };
  // 监听按键
  var baseEvent = function (e) {
    var code = get(e);
    if (!triggers[code]) return [];
    e.stopPropagation(); e.preventDefault();
    return triggers[code];
  };
  document.addEventListener('keydown', function (e) {
    baseEvent(e).forEach(function (f) { f(); })
  });
  document.addEventListener('keyup', baseEvent);
  return {
    'get': get,
    'name': name,
    'reg': reg,
  };
}());


// 根据用户界面上的语言做不同调整
var i18n = (function () {
  var defaultLang = 'zh-cn';
  var lang = null;
  var pending = [];
  var chose = function (langObj) {
    langObj.local = langObj[lang] || langObj[defaultLang];
  };
  return function (l) {
    lang = l;
    pending.map(chose);
    pending = [];
    i18n = chose;
    i18n.lang = l;
  };
}());

// 将字符串用&#dd的形式转义
var escapeXml = function (s) {
  return s.replace(/./g, function (c) { return '&#' + c.charCodeAt(0); });
};

// 以参数填充字符串
var fillStr = function (base, func) {
  var argdatas = Array.apply(Array, arguments).slice(1);
  var datas = argdatas.concat([text]);
  var parseFunction;
  if (typeof func === 'function') parseFunction = func;
  else parseFunction = function (text) {
    var ret = null;
    datas.some(function (data) {
      if (typeof data === 'object' && text in data) ret = '' + data[text];
      return ret !== null;
    });
    return ret;
  };
  return base.replace(/{{([\[{]?([a-zA-Z0-9_-]*)[\]}]?)}}/g, function (o, i, p) {
    var ret = parseFunction(p);
    if (ret == null) return o;
    if (i[0] === '{') return ret = fillStr(ret, parseFunction);
    if (i[0] === '[') return escapeXml(ret);
    return ret;
  });
};

// 设置项
var config = function (uid, nick) {
  var config = {}, config_bak = null;
  var keys = [], onputs = [];
  var storageKey = 'user' + uid + 'config';
  var tonputs = function (key, value, oldValue) {
    onputs.map(function (f) { f(key, value, oldValue); });
  };
  var updateBak = function () {
    config_bak = JSON.parse(JSON.stringify(config));
  }
  // 读取到内存
  var readp = false;
  var read = function () {
    if (readp) return;
    call(function () { readp = false; });
    readp = true;
    debug('read GM value');
    try { config = JSON.parse(GM_getValue(storageKey, '{}')); }
    catch (e) { config = {}; }
    updateBak();
  };
  // 从内存写出
  var write = function () {
    debug('write GM value');
    GM_setValue(storageKey, JSON.stringify(config));
  };
  // 写入到内存
  var put = function (key, value) {
    // if (keys.indexOf(key) === -1) return;
    if (JSON.stringify(config_bak[key]) === JSON.stringify(value)) return value;
    tonputs(key, value, config[key]);
    config[key] = value;
    updateBak();
    write();
    return value;
  };
  // 从内存读取
  var get = function (key, value, type) {
    read();
    if (!(key in config)) return value;
    var val = config[key];
    if (typeof val === 'undefined') return value;
    if (type && (val === null || val.constructor !== type)) return value;
    return val;
  };
  // 当内存配置被修改时调用
  var onput = function (f) {
    onputs.push(f);
  };
  // 从字串导入
  var import_ = function (s) {
    try {
      clear();
      s = JSON.parse(s).conf;
      Object.keys(s).forEach(function (key) {
        put(key, s[key]);
      });
      write();
      return true;
    } catch (e) { }
    return false;
  };
  // 导出成为字串
  var export_ = function () {
    var info = GM_info || {}, script = info.script || {};
    var conf = {};
    Object.keys(config)
      .filter(function (x) { return x.indexOf('._') === -1; })
      .forEach(function (x) { conf[x] = config[x]; })
    return JSON.stringify({
      'ua': navigator.userAgent,
      'yawf': script.name,
      'ver': script.version,
      'gm': (info.scriptHandler || '') + info.version,
      'conf': conf,
    }, null, 2);
  };
  // 清空设置
  var clear = function () {
    config = {};
    updateBak();
    tonputs();
    write();
  };
  // 注册键
  var reg = function (key) { keys.push(key); };
  // 初始化
  return {
    'uid': uid, 'nick': nick,
    'put': put, 'get': get, 'onput': onput,
    'read': read, 'write': write,
    'import': import_, 'export': export_,
    'clear': clear,
    'reg': reg,
  };
};


// 微博过滤规则
var rules = (function () {
  var list = [];
  var add = function (priority, rule) {
    list.push({ 'priority': priority, 'rule': rule });
    list.sort(function (x, y) { return y.priority - x.priority; });
  };
  var parse = function (feed) {
    var result = null;
    list.some(function (item) {
      try { result = item.rule(feed) || result; }
      catch (e) { debug('error while parsing rule %o: %o', item.rule, e); }
      if (result) debug('%o(%o) -> %s', item.rule, feed, result);
      return result;
    });
    return result;
  };
  return {
    'add': add,
    'parse': parse,
  };
}());

// 打印调试信息
var debug = GM_getValue('debug', false) &&
  console && console.log && console.log.bind(console) ||
  function () { };

// 桌面提示
var notify = (function () {
  var avaliable = {};
  var shown = [];
  var use = {
    'hasPermission': function () { return null; },
    'requestPermission': function (callback) { return null; },
    'hideNotification': function (notify) { return null; },
    'showNotification': function (id, title, body, icon, delay, onclick) { return null; }
  };

  // 检查一个微博是不是已经被显示过了，如果显示过了不重复显示
  var shownFeed = function (id) {
    var shown = [];
    try {
      shown = JSON.parse(GM_getValue('notification', '[]'));
      shown = Array.apply(Array, shown);
      id = String(id);
    } catch (e) { }
    debug('%o %s shown feed list: %o', id, shown.indexOf(id) === -1 ? 'not in' : 'in', shown);
    if (shown.indexOf(id) !== -1) return true;
    shown.push(id); shown = shown.slice(-20);
    GM_setValue('notification', JSON.stringify(shown));
    return false;
  };

  // webkitNotifications
  // Tab Notifier 扩展实现此接口，但显示的桌面提示最多只能显示前两行
  if (typeof webkitNotifications !== 'undefined') avaliable.webkit = {
    'hasPermission': function () {
      return [true, null, false][webkitNotifications.checkPermission()];
    },
    'requestPermission': function (callback) {
      return webkitNotifications.requestPermission(callback);
    },
    'hideNotification': function (notify) {
      notify.cancel();
    },
    'showNotification': function (id, title, body, icon, delay, onclick) {
      if (shownFeed(id)) return null;
      debug('show (webkit) notification: %s - %s', title, body);
      var notify = webkitNotifications.createNotification(icon, title, body);
      if (delay && delay > 0) notify.addEventListener('display', function () {
        setTimeout(function () { hideNotification(notify); }, delay);
      });
      if (onclick) notify.addEventListener('click', onclick);
      notify.show();
      return notify;
    },
  }

  // Notification
  // Firefox 22+
  // 显示4秒会自动关闭 https://bugzilla.mozilla.org/show_bug.cgi?id=875114 
  if (typeof Notification !== 'undefined') avaliable.standard = {
    'hasPermission': function () {
      return {
        'granted': true,
        'denied': false,
        'default': null,
      }[Notification.permission];
    },
    'requestPermission': function (callback) {
      return Notification.requestPermission(callback);
    },
    'hideNotification': function (notify) {
      notify.close();
    },
    'showNotification': function (id, title, body, icon, delay, onclick) {
      if (shownFeed(id)) return null;
      debug('show notification: %s - %s', title, body);
      var notify = new Notification(title, { 'body': body, 'icon': icon });
      if (delay && delay > 0) notify.addEventListener('show', function () {
        setTimeout(function () { notify.close(); }, delay);
      });
      if (onclick) notify.addEventListener('click', onclick);
      return notify;
    },
  }

  // 有哪些接口可用
  var avaliableNotification = function () {
    return Object.keys(avaliable);
  };
  // 选择用哪个接口
  var choseNotification = function (prefer) {
    return use = prefer && avaliable[prefer] || avaliable.standard;
  };
  choseNotification();
  // 检查权限
  var hasPermission = function () {
    return use.hasPermission.apply(this, arguments);
  };
  // 请求权限
  var requestPermission = function () {
    return use.requestPermission.apply(this, arguments);
  };
  // 显示消息
  var showNotification = function (title, body, icon, delay, onclick) {
    var notify = use.showNotification.apply(this, arguments);
    shown.push(notify);
    return notify;
  };
  // 隐藏已经显示的消息
  var hideNotification = function (notify) {
    use.hideNotification.apply(this, arguments);
    shown = shown.filter(function (x) { return x !== notify; });
    return notify;
  };

  document.addEventListener('unload', function () {
    shown.forEach(hideNotification);
    shown = [];
  });

  return {
    'avaliableNotification': avaliableNotification,
    'choseNotification': choseNotification,
    'hasPermission': hasPermission,
    'requestPermission': requestPermission,
    'showNotification': showNotification,
    'hideNotification': hideNotification
  };

}());

// 显示右上角过滤器图标
var showIcon = function () {
  var p = document.querySelector('.WB_global_nav .gn_person');
  if (!p) return setTimeout(showIcon, 100);
  var d = cewih('div', html.icon).firstChild;
  p.appendChild(d);
  var f = document.querySelector('.gn_filter');
  f.addEventListener('click', function (e) {
    filters.showDialog();
    e.preventDefault();
  });
};

// 对话框
var Form = function (dom, display, details) {
  var ok = dom.querySelector('[node-type="OK"]');
  var cancel = dom.querySelector('[node-type="cancel"]');
  var close = dom.querySelector('[node-type="close"]');
  var title = dom.querySelector('.title');
  var mouse = null, pos;
  // 定位对话框的位置
  var setPos = function (pos) {
    var left = pos[0], top = pos[1];
    left = Math.min(Math.max(0, left), document.body.clientWidth - dom.clientWidth - 2);
    top = Math.min(Math.max(pageYOffset, top), pageYOffset + window.innerHeight - dom.clientHeight - 2);
    dom.style.left = left + 'px';
    dom.style.top = top + 'px';
    return [left, top];
  };
  // 开始拖拽
  var dragMoveStart = function (e) {
    mouse = [e.clientX, e.clientY];
    document.addEventListener('mousemove', dragMove);
    document.addEventListener('mouseup', dragMoveDone);
    dom.classList.add('yawf-drag');
    if (dom.setCapture) { dom.setCapture(); }
  };
  // 拖拽移动
  var dragMove = function (e) {
    var mouse_new = [e.clientX, e.clientY];
    pos[0] += mouse_new[0] - mouse[0];
    pos[1] += mouse_new[1] - mouse[1];
    setPos(pos);
    mouse = mouse_new;
  };
  // 拖拽结束
  var dragMoveDone = function () {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragMoveDone);
    dom.classList.remove('yawf-drag');
    if (dom.releaseCapture) { dom.releaseCapture(); }
    pos = setPos(pos);
    mouse = null;
  };
  // 标题栏可以拖拽
  if (title) {
    title.style.cursor = 'move';
    title.addEventListener('mousedown', dragMoveStart);
  }
  // 确定取消等按钮
  if (details.onOk) if (ok) ok.addEventListener('click', details.onOk);
  if (details.onCancel) {
    if (cancel) cancel.addEventListener('click', details.onCancel);
    if (close) close.addEventListener('click', details.onCancel);
  }
  // 背景遮罩
  var cover = cewih('div', html.cover).firstChild;
  // 响应按键
  var keys = function (e) {
    if (e.keyCode === 13) if (ok) ok.click(); // Enter
    if (e.keyCode === 27) if (close) close.click(); // Esc
  };
  // 关闭对话框
  var hide = function () {
    document.body.removeChild(dom);
    document.body.removeChild(cover);
    document.removeEventListener('keypress', keys);
  };
  // 显示对话框
  var show = function (top, left) {
    document.body.appendChild(cover);
    document.body.appendChild(dom);
    if (top == null) top = (window.innerHeight - dom.clientHeight) / 2;
    if (left == null) left = (window.innerWidth - dom.clientWidth) / 2;
    pos = [left, top + pageYOffset];
    setPos(pos);
    document.addEventListener('keypress', keys);
    document.activeElement.blur();
  };
  if (display) show();
  if (ok) ok.addEventListener('click', hide);
  if (cancel) cancel.addEventListener('click', hide);
  if (close) close.addEventListener('click', hide);
  return { 'hide': hide, 'show': show };
};

// 显示一个对话框
var Dialog = function (id, title, fillFun) {
  var dom = cewih('div', fillStr(html.dialog, { 'id': id, 'title': fillStr(title) })).firstChild;
  var form = Form(dom, false, {});
  fillFun(dom.querySelector('[node-type="inner"]'));
  return form;
};

// 显示一个提示框
var Alert = function (id, details) {
  var dom = cewih('div', fillStr(html.alert, { 'id': id, 'title': details.title, 'text': details.text, 'icon': details.icon || 'warn' })).firstChild;
  var form = Form(dom, true, details);
  return form;
};

// 显示一个确定框
var Confirm = function (id, details) {
  var dom = cewih('div', fillStr(html.confirm, { 'id': id, 'title': details.title, 'text': details.text, 'icon': details.icon || 'question' })).firstChild;
  var form = Form(dom, true, details);
  return form;
};

// 延迟调用函数
var call = function (f) {
  setTimeout.bind(this, f, 0).apply(null, Array.apply(Array, arguments).slice(1));
};

// 套上try-catch
var withTry = function (f, fc) {
  return function () {
    try { f.apply(this, arguments); }
    catch (e) {
      debug('Exception while run %o: %o (%o)', f, e, e.stack);
      if (fc) fc(e);
    }
  };
};

// 管理样式
var css = (function () {
  var styleText = '';
  var fun = function (css) { return fun.add.bind(fun, css); };
  fun.init = function () { GM_addStyle(styleText); };
  fun.add = function (css) { styleText += css + '\n'; };
  return fun;
}());

// 产生一个假的回调函数
var dateStr = (function () {
  var last = 0;
  return function () {
    return '' + (last = Math.max(last + 1, Number(new Date())));
  };
}());

// 维护账号信息，用于显示
var account = (function () {
  var idCache = {}, nameCache = {}, working = {};
  var request = function (queryStr, onsucc, onerror) {
    // 如果同时已经有了同类请求则等待那个请求的返回
    if (working[queryStr]) return working[queryStr].push([onsucc, onerror]);
    working[queryStr] = [[onsucc, onerror]];
    var done = function (success, data) {
      working[queryStr].forEach(function (w) { w[success ? 0 : 1](data); });
      delete working[queryStr];
    };
    // 请求获取
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': fillStr(url.newcard, { 'query': queryStr, 'callback': 'STK_' + dateStr(), 'host': url.host }),
      'onload': withTry(function (resp) {
        var respJson = JSON.parse(resp.responseText.replace(/^try{[^{]*\(/, '').replace(/\)}catch\(e\){};$/, ''));
        var namecard = cewih('div', respJson.data);
        var avatar = namecard.querySelector('.name dt img').getAttribute('src');
        var name = namecard.querySelector('.name dd a[uid]').getAttribute('title');
        var uid = namecard.querySelector('.name dd a[uid]').getAttribute('uid');
        var data = { 'avatar': avatar, 'id': uid, 'name': name };
        nameCache[name] = idCache[uid] = data;
        done(true, data);
      }, done.bind(this, false)),
      'onerror': function () { done(false); },
    });
    return queryStr;
  };
  var byId = function (id, onsucc, onerror) {
    if (idCache[id]) onsucc(idCache[id]);
    else request('id=' + id, onsucc, onerror);
  };
  var byName = function (name, onsucc, onerror) {
    if (nameCache[name]) onsucc(nameCache[name]);
    else request('name=' + encodeURIComponent(name), onsucc, onerror);
  };
  return { 'id': byId, 'name': byName };
}());

// 过滤器管理器
var filters = (function () {
  var list = [], preinit = true;
  // 添加到表格中
  var add = function (details) {
    list.push(details);
    if (!preinit) details.init();
    return details;
  };
  // 网页加载完毕时初始化
  var init = function () {
    list.forEach(function (x) { x.init(); });
    preinit = false;
  };
  var dialog = null;
  var lastTab = 0;
  var dialogTabs = function (list, inner, page) {
    var alist = Array.apply(Array, inner.querySelectorAll('.yawf-config-header a'));
    var llist = Array.apply(Array, inner.querySelectorAll('.yawf-config-body .yawf-config-layer'));
    var body = inner.querySelector('.yawf-config-body');
    var choseLList = function (i) {
      llist.forEach(function (l) { l.style.display = 'none'; l.innerHTML = ''; });
      alist.forEach(function (a) { a.classList.remove('current'); a.classList.remove('S_bg5'); a.classList.add('S_bg1'); });
      llist[i].innerHTML = ''; list[i].show(llist[i]); llist[i].style.display = 'block';
      alist[i].classList.add('current'); alist[i].classList.remove('S_bg1'); alist[i].classList.add('S_bg5');
      lastTab = i;
      call(function () { body.scrollTop = 0; });
    };
    list.map(function (filter, i) {
      var a = alist[i];
      a.addEventListener('mousedown', function () { choseLList(i); });
      a.addEventListener('keydown', function () { choseLList(i); });
    });
    choseLList(page);
  };
  var showDialog = function (page, count) {
    var showDialogInner = function (inner) {
      inner.innerHTML = [html.configHeaderTop,
        list.map(function (filter, index) {
          return fillStr(html.configHeaderItem, {
            'name': text[filter.name + 'Title'],
            'aclass': index === 0 ? 'S_bg5 current' : 'S_bg1',
            'liclass': index === list.length - 1 ? 'pftb_itm_lst' : ' ',
          });
        }).join(''),
        html.configHeaderBottom,
        html.configLayerTop,
        list.map(function (filter, index) {
          return fillStr(html.configLayerItem, {
            'name': filter.name + 'Layer',
          });
        }).join(''),
        html.configLayerBottom,
        html.configFooter,
      ].join('');
      call(function () { dialog.show(0); });
      if (list.indexOf(page) === -1) dialogTabs(list, inner, lastTab);
      else dialogTabs(list, inner, list.indexOf(page));
    };
    if (!(dialog = Dialog('yawf-config', '{{configDialogTitle}}', showDialogInner))) {
      if (!count || count < 100) setTimeout(showDialog, 100, page, (count || 0) + 1);
    }
  };
  return {
    'add': add,
    'init': init,
    'showDialog': showDialog,
  };
}());

// 快速创建过滤器的对话框
var fastFilterDialog = function (chose) {
  var dialogInner = function (inner) {
    inner.innerHTML = html.fastFilterHeader + html.fastFilterFooter;
    var items = inner.querySelector('#yawf-fast-filter-list');
    var checkboxList = chose.map(function (c) {
      var item = cewih('ul', html.fastFilterItem).firstChild;
      var inner = item.querySelector('.yawf-fastFilterItemInner');
      var checked = c.filter.desc(inner, c.val) !== false;
      var checkbox = item.querySelector('input[type="checkbox"], input[type="radio"]');
      checkbox.checked = checked;
      items.appendChild(item);
      return checkbox;
    });
    var selectList = Array.apply(Array, inner.querySelectorAll('select'));
    selectList.forEach(function (select) { select.value = 'blacklist'; });
    // 找到所有选择了的过滤器
    var allChecked = function () {
      var active = [];
      checkboxList.forEach(function (checkbox, i) {
        if (checkbox.checked)
          active.push({ 'chose': chose[i], 'action': selectList[i].value });
      });
      return active;
    };
    var updateOkButton = function () {
      if (allChecked().length) ok.classList.remove('W_btn_a_disable');
      else ok.classList.add('W_btn_a_disable');
    };
    var ok = inner.querySelector('[action-type="ok"]');
    ok.addEventListener('click', function () {
      var active = allChecked();
      if (!active.length) return null;
      active.forEach(function (act) {
        act.chose.filter.add(act.chose.val, act.action);
      });
      dialog.hide();
    });
    checkboxList.forEach(function (checkbox) {
      checkbox.addEventListener('change', updateOkButton);
    });
    updateOkButton();
    var cancel = inner.querySelector('[action-type="cancel"]');
    cancel.addEventListener('click', function () { dialog.hide(); });
  };
  var dialog = Dialog('yawf-drop-select', '{{fastCreateChoseTitle}}', dialogInner);
  return dialog;
};

// 将文本、链接等拖拽到框内，快速创建过滤器
var dropdown = (function () {
  var dropArea, content;
  var dropdownFilters = [];
  var got = function (element) {
    if (!element) return;
    // 忽略最外面套的em/strong
    if (element.tagName && element.firstChild === element.lastChild &&
      ['strong', 'em'].indexOf(element.tagName.toLowerCase()) !== -1)
      element = element.firstChild;
    debug('got %o', element);
    var chose = [];
    // 问所有过滤器是不是需要
    dropdownFilters.forEach(function (filter, i) { chose[i] = null; });
    dropdownFilters.forEach(function (filter, i) {
      filter.valid(element, function (val) {
        if (!val) chose[i] = [];
        else if (val.constructor !== Array) chose[i] = [{ 'filter': filter, 'val': val }];
        else chose[i] = val.map(function (val) { return { 'filter': filter, 'val': val }; });
        if (chose.filter(function (x) { return !x; }).length) return;
        var chosen = chose.reduce(function (x, y) { return x.concat(y); });
        if (chosen.length) {
          var dialog = fastFilterDialog(chosen);
          call(function () { dialog.show(); });
        }
      });
    });
  };
  var init = function () {
    // 拖放到的框
    dropArea = cewih('div', html.dropArea).firstChild;
    var active = false, target = null;
    content = dropArea.querySelector('#yawf-drop-area-content');
    document.body.appendChild(dropArea);
    var hideDropArea = function () {
      if (target && target.hover) target.hover(); target = null;
      dropArea.style.display = 'none';
    };
    // 只接受从特定位置拽过来的东西
    var checkTarget = function () {
      var checker = target;
      for (; checker && checker !== document; checker = checker.parentNode) {
        if (!checker.classList || !checker.classList.contains || !checker.tagName) continue;
        if (checker.classList.contains('WB_feed')) return true;
        if (checker.classList.contains('pf_head_pic')) return true;
        if (checker.classList.contains('pf_lin')) return true;
        if (checker.classList.contains('W_miniblog')) return false;
        if (checker.tagName.toLowerCase() === 'body') return true;
        if (checker.classList.contains('right_content') && checker.classList.contains('hot_topic')) return true;
        if (checker.id === 'WB_webim') return false;
      }
      return false;
    };
    // 开始拽
    document.addEventListener('dragstart', function (e) {
      var cover = document.querySelector('body>div[node-type="outer"]');
      if (cover && cover.clientHeight) return;
      target = e.explicitOriginalTarget; if (!target || !checkTarget()) return;
      active = true;
      dropArea.style.display = 'block';
    }, false);
    // 拽完了
    document.addEventListener('dragend', function (e) {
      if (!active) return; active = false;
      e.preventDefault(); e.stopPropagation();
      if (content.firstChild === content.lastChild) got(content.firstChild);
      else got(content);
      content.innerHTML = '';
      hideDropArea();
    }, false);
    // 拽出去了
    document.addEventListener('mouseout', function (e) {
      if (!active) return; active = false;
      hideDropArea();
    });
  };
  var add = function (details) {
    dropdownFilters.push(details);
  };
  return {
    'init': init,
    'add': add,
  };
}());

// 告诉服务器屏蔽被隐藏的微博
var blockWeibo = (function () {
  var buffer = [], busy = false;
  var delay = function () { return 3000 + Math.round(20 * Math.random()) * 100; };
  var block = function (mid, callback) {
    var done = function () { setTimeout(callback, delay()); };
    debug('blocking weibo %s', mid);
    GM_xmlhttpRequest({
      'method': 'POST',
      'url': fillStr(url.block_wb, { 'rnd': dateStr(), 'host': url.host }),
      'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': document.cookie,
        'Referer': location.href,
        'X-Requested-With': 'XMLHttpRequest',
      },
      'data': 'filter_type=0&mid=' + mid + '&justhide=0&location=home&_t=0',
      'onload': function (resp) { debug('block %s response: %s', mid, resp.responseText); done(); },
      'onerror': function () { debug('block %s network error', mid); done(); },
    });
  };
  var active = function () {
    if (!(busy = !!buffer.length)) return;
    var mid = buffer.shift();
    block(mid, active);
  };
  return function (mid) {
    buffer.push(mid);
    if (!busy) active();
    return mid;
  };
}());

// 管理可扩展模块
var extent = (function () {
  var extp = {};
  var add = function (key, func) {
    if (typeof extp[key] === 'function') return;
    else {
      var words = extp[key] || [];
      extp[key] = func;
      func(words);
    }
  };
  var exports = function (key, words) {
    if (typeof extp[key] === 'function') return extp[key](words);
    else extp[key] = (extp[key] || []).concat(words);
  };
  var list = function () {
    return Object.keys(extp);
  };
  return {
    'add': add,
    'list': list,
    'exports': exports,
  };
}());

// 有新节点时分发事件监听
var newNode = (function () {
  var callbacks = [], actived = false;
  var callAll = function (mutation) {
    callbacks.forEach(function (c) { c(mutation); });
  };
  var observe = function () {
    callAll(); // 初始化
    (new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) { callAll(mutation); });
    })).observe(document.body, { 'childList': true, 'subtree': true });
  };
  var add = function (callback) {
    callbacks.push(withTry(callback));
    return callback;
  };
  var remove = function (callback) {
    var found = false;
    callbacks = callbacks.filter(function (x) {
      var same = x === callback;
      if (same) found = true;
      return !same;
    });
    return found;
  };
  var active = function () {
    if (actived) return;
    actived = true;
    observe();
  };
  return {
    'add': add,
    'remove': remove,
    'active': active,
  };
}());

// 添加点击后展开折叠消息的事件
var fixFoldWeibo = (function () {
  var fixOne = withTry(function (feed) {
    var display = feed.getAttribute('yawf-display').replace(/-fold$/g, '-unfold');
    var showFeed = function () {
      feed.setAttribute('yawf-display', display);
      feed.removeEventListener('click', showFeed);
    };
    var author = feed.querySelector('.WB_detail>.WB_info>.WB_name[usercard]').getAttribute('title');
    feed.setAttribute('yawf-author', author);
    feed.addEventListener('click', showFeed);
  });
  var fix = function (feed) {
    var feeds = [feed].concat(Array.apply(Array, feed.querySelectorAll('.WB_feed_type')));
    feeds.forEach(function (feed) {
      if (feed.getAttribute('yawf-display').lastIndexOf('-fold') === -1) return;
      if (feed.getAttribute('yawf-author')) return;
      fixOne(feed);
    });
  };
  fix.init = function () {
    css.add(fillStr('[node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"][yawf-author]::before { content: {{foldedWeiboTextAuthor}}; }'));
    css.add(fillStr('[node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]::before { content: {{foldedWeiboText}}; }'));
  };
  return fix;
}());

// 将父微博和下面的子微博交换
var swapParentSonWeibo = function (parent, son) {
  var x = cewih('div', '');
  ['.WB_face', '.WB_info', '.WB_text', '.WB_func'].map(function (q) {
    (function (a, b) {
      b.parentNode.replaceChild(x, b);
      a.parentNode.replaceChild(b, a);
      x.parentNode.replaceChild(a, x);
    }(parent.querySelector(q), son.querySelector(q)));
  });
  var mid = parent.getAttribute('mid');
  parent.setAttribute('mid', son.getAttribute('mid'));
  son.setAttribute('mid', mid);
  // 各种细节的修补（原网站做的太乱了……）
  var pf = parent.querySelector('.WB_face'), sf = son.querySelector('.WB_face');
  var pfa = pf.querySelector('a'), pfi = pf.querySelector('img');
  var sfa = sf.querySelector('a'), sfi = sf.querySelector('img');
  if (pfa.href.indexOf('?') === -1) pfa.href += '?from=feed&loc=avatar';
  if (sfa.href.indexOf('?') !== -1) sfa.href = sfa.href.slice(0, sfa.href.indexOf('?'));
  if (!pfa.title) pfa.title = pfi.title;
  if (sfa.title) sfa.removeAttribute('title');
  sfi.width = sfi.height = '30'; pfi.width = pfi.height = '50';
  return son;
};

// 如果有一个微博的子微博都隐藏了，那么就隐藏这个微博的子微博框
var fixSonWeiboDisplay = function (feed) {
  if (!feed.querySelector('.WB_feed_together')) return fixFoldWeibo(feed);
  var sonList = Array.apply(Array, feed.querySelectorAll('.WB_feed_together .WB_sonFeed .WB_feed_type[yawf-display]'));
  // 交换两个子微博
  var swapSon = function (p, q) {
    var x = sonList[p], y = sonList[q];
    var fakeNode = document.createElement('div');
    x.parentNode.insertBefore(fakeNode, x);
    y.parentNode.insertBefore(x, y);
    fakeNode.parentNode.insertBefore(y, fakeNode);
    fakeNode.parentNode.removeChild(fakeNode);
    sonList[p] = y; sonList[q] = x;
  };
  // 把子微博重新排序一下，按照从想看到不想看的顺序排列，排序算法和一趟快排差不多
  var p = 0, q;
  ['show', 'unset', 'unfold', 'fold', 'hidden'].forEach(function (display) {
    q = sonList.length - 1;
    while (p < q) {
      if (sonList[p].getAttribute('yawf-display').lastIndexOf(display) !== -1) p++;
      else if (sonList[q].getAttribute('yawf-display').lastIndexOf(display) === -1) q--;
      else swapSon(p, q);
    }
  });
  // 看看还有多少显示出来的子微博，更新一下子微博的计数
  var sonCount = feed.querySelectorAll('.WB_feed_together .WB_sonFeed .WB_feed_type:not([yawf-display$="-hidden"])').length;
  if (sonCount === 0) feed.querySelector('.WB_feed_together').setAttribute('yawf-display', 'display-hidden');
  else feed.querySelector('[node-type="followNum"]').textContent = sonCount;
  // 如果下面更多的按钮已经没用了，就藏起来吧
  var foldSonCount = feed.querySelectorAll('[node-type="feed_list_wrapForward"] .WB_feed_type:not([yawf-display$="-hidden"])').length;
  if (foldSonCount === 0 && feed.querySelector('[node-type="feed_list_wrapForward"]')) {
    feed.querySelector('.WB_feed_together').setAttribute('yawf-sonfold', 'display');
  }
  // 把原始微博和子微博拆开
  var another = feed.cloneNode(true);
  feed.parentNode.insertBefore(another, feed.nextSibling);
  feed.setAttribute('yawf-withson', 'son');
  another.setAttribute('yawf-display', sonCount ? 'display-son' : 'display-son-hidden');
  fixFoldWeibo(feed);
  fixFoldWeibo(another);
};

// 真正微博过滤的核心模块
var weiboFilter = function (feed) {
  // 同源合并的微博
  var sonFeeds = Array.apply(Array, feed.querySelectorAll('[node-type="feed_list"] .WB_feed_type:not([yawf-display])'));
  var action = null, parentAction = null;
  var needSwap = function (action) {
    if (!sonFeeds.length) return false;
    if (['hidden', 'fold'].indexOf(action) === -1) return false;
    return true;
  };
  var setAction = function (feed, action) {
    feed.setAttribute('yawf-display', 'display-' + action);
  };
  while (true) {
    action = rules.parse(feed) || 'unset';
    // 如果父微博被屏蔽或折叠，那么就把下面一条没被屏蔽的拉上来换个位置
    if (!needSwap(action)) break;
    setAction(swapParentSonWeibo(feed, sonFeeds.pop()), action);
  }
  parentAction = action;
  // 最后处理所有下面的子微博
  var fixSonWeibo = function (son) {
    var action = rules.parse(son) || 'unset';
    setAction(son, action);
    // 如果一列里面有白名单的，那么把白名单的特别换到外面去
    if (parentAction !== 'show' && action === 'show') {
      setAction(swapParentSonWeibo(feed, son), parentAction);
      parentAction = action;
    }
  };
  while (sonFeeds.length) fixSonWeibo(sonFeeds.shift());
  setAction(feed, parentAction);
  fixSonWeiboDisplay(feed);
};

// 对每条微博应用过滤和其他相关回调
var eachWeibo = (function () {
  var befores = [], afters = [];
  newNode.add(function () {
    var feeds = Array.apply(Array,
      document.querySelectorAll('[node-type="feed_list"] .WB_feed_type:not([yawf-display])'));
    [befores, [weiboFilter], afters].forEach(function (callbacks) {
      feeds.forEach(function (feed) {
        callbacks.forEach(function (f) { f(feed); });
      });
    });
  });
  var add = function (callbacks) {
    return function (callback) {
      callbacks.push(withTry(callback));
      return callback;
    };
  };
  return {
    'before': add(befores),
    'after': add(afters),
  };
}());

// 根据选择类型不同生成一些存取设置的函数
var typedConfig = (function () {
  // 字符串
  var baseConfig = function (type) {
    return function (item) {
      var skey = item.key;
      if (item.internal) skey = skey.replace(/\.([^\.]*)$/, '._$1');
      if (!item.getconf) item.getconf = function () {
        return item.conf = config.get(skey, item['default'] || type(), type);
      };
      if (!item.putconf) item.putconf = function (conf) {
        return config.put(skey, item.conf = conf);
      };
      config.reg(skey);
      return item.putconf(item.getconf());
    };
  };
  // 集合类型的add/del操作
  var itemsConfig = function (item) {
    var value = baseConfig(Array)(item);
    // 除了基本的get/put外，提供高级的add/del
    if (!item.delconf) item.delconf = function (str) {
      var val = item.getconf();
      val = val.filter(function (x) { return x !== str; });
      return item.putconf(val);
    };
    if (!item.addconf) item.addconf = function (str) {
      item.delconf(str);
      var val = item.getconf(); val.push(str);
      return item.putconf(val);
    };
    // 此外还有供扩展用的extent
    if (extent && item.extent && item.extent.constructor === Array && !item.extentconf) {
      item.extentconf = function (words) {
        if (item.add) words = words.map(item.add);
        item.extent = item.extent.concat(words);
      };
      extent.add(item.key, item.extentconf);
    }
    return value;
  };
  return {
    'string': baseConfig(String),
    'strings': itemsConfig,
    'boolean': baseConfig(Boolean),
    'users': itemsConfig,
    'number': baseConfig(Number),
    'range': baseConfig(Number),
    'select': baseConfig(String),
    'color': baseConfig(String),
    'key': baseConfig(Number),
  };
}());

// 将输入框和某个设置项绑定
var bindInputValue = (function () {
  var bind = function (key, input, obj, standlize) {
    var fine = standlize || function (x) { return x; };
    var onchange = function () {
      var val = input[key], valid;
      valid = fine(val);
      if (String(valid) !== val) input[key] = valid;
      obj.putconf(valid);
    };
    input[key] = fine(obj.getconf());
    input.addEventListener('change', onchange);
    return onchange;
  };
  return {
    'text': bind.bind(null, 'value'),
    'checkbox': bind.bind(null, 'checked'),
    'select': bind.bind(null, 'value'),
  };
}());

// 根据不同类型生成带有事件的文档节点
var typedHtml = (function () {

  var base = function (base, binder) {
    return function () {
      var item = this;
      // 引用的设置项
      var ref = item.ref;
      // 显示的文字
      var inp = '{{}}', outer = inp, inner = '', text, etext;
      var hasInput = !!html['config' + base + 'Input'];
      if (item.i18n && item.i18n.local) etext = item.i18n.local; else etext = {};
      if (!item.nogui) {
        text = fillStr(item.text || '', etext).replace(/\|\|/g, html['||']).replace(/\|/g, html['|']);
        if (hasInput && text.indexOf(inp) === -1) text = inp + text;
        outer = fillStr(html['config' + base], { 'text': text }, item, etext);
      }
      if (hasInput) inner = fillStr(html['config' + base + 'Input'], item, etext);
      var line = outer.replace(inp, inner);
      // 在需要引用其他控件的地方留空
      if (!item.nogui) line = line.replace(/{{<([a-zA-Z0-9_-]*)>}}/g, function (m, p) {
        return ref[p] ? fillStr(html.configPrefill, { 'id': p }) : m;
      });
      // 构造基本的文档
      var dom = cewih('div', line).firstChild;
      // 将引用的设置控件填回
      var pf = Array.apply(Array, dom.querySelectorAll('span.yawf-configPrefill'));
      pf.forEach(function (pfi) {
        pfi.parentNode.replaceChild(ref[pfi.id].show(), pfi);
      });
      if (binder) binder(dom, item);
      return dom;
    };
  };

  // 副标题
  var subtitle = base('Subtitle');
  // 文本
  var text = base('Text');
  // 不缩进的文本
  var remark = base('Remark');

  // 真假值的设置项
  var boolean = base('Boolean', function (dom, item) {
    bindInputValue.checkbox(dom.querySelector('input'), item);
  });

  // 选择框设置项
  var select = base('Select', function (dom, item) {
    var select = dom.querySelector('select');
    var defaultValue = item['default'] || item.select.key;
    var keys = item.select.map(function (option) {
      select.appendChild(cewih('select', fillStr(html.option, option)).firstChild);
      return option.value;
    });
    bindInputValue.select(select, item, function (val) {
      return keys.indexOf(val) === -1 ? defaultValue : val;
    });
  });

  // 字符串的设置项
  var string = base('String', function (dom, item) {
    var textarea = dom.querySelector('textarea');
    var onchange = bindInputValue.text(textarea, item);
    textarea.addEventListener('keyup', function () {
      call(onchange);
    });
  });

  // 颜色的设置项
  var color = base('Color', function (dom, item) {
    bindInputValue.text(dom.querySelector('input'), item);
  });

  // 数字的设置项
  var number = base('Number', function (dom, item) {
    var number = dom.querySelector('input');
    var max = Infinity, min = -Infinity;
    if ('max' in item) max = item.max;
    if ('min' in item) min = item.min;
    if (min > max) min = max;
    number.min = min; number.max = max;
    bindInputValue.text(number, item, function (val) {
      if (isNaN(Number(val))) return val = 0;
      return Math.min(max, Math.max(min, Number(val)));
    });
  });

  // 字符串数组设置项模板
  var items = function (base, genli) {
    var item = this, etext = {};
    if (item.i18n && item.i18n.local) etext = item.i18n.local;
    var dom = cewih('div', fillStr(base, item, etext)).firstChild;
    var form = dom.querySelector('form'), input = dom.querySelector('input'), ul = dom.querySelector('ul');
    var shown = {};
    // 将某个已经有的字符串显示到末尾
    var moveToEnd = function (x) {
      var p = x.parentNode; p.appendChild(p.removeChild(x));
    };
    // 显示一个新的字符串
    var showStrings = function (userinput, str, onsucc, ondone) {
      genli(item, userinput, str, function (str, li) {
        if (ondone) ondone();
        if (!str || !li) return;
        if (shown[str]) return moveToEnd(shown[str]);
        var del = li.querySelector('a.icon_close');
        del.addEventListener('click', function () {
          delete shown[str];
          if (item.del) item.del(str);
          li.parentNode.removeChild(li);
          item.delconf(str);
        });
        ul.appendChild(shown[str] = li);
        if (onsucc) onsucc(str);
      });
    };
    item.getconf().forEach(function (str) { showStrings(false, str); });
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var str = input.value;
      input.disabled = true;
      showStrings(true, str, function (str) {
        if (item.add) item.add(str);
        item.addconf(str);
      }, function () {
        input.value = '';
        input.disabled = false;
      });
    });
    return dom;
  };

  // 字符串设置项
  var strings = function () {
    return items.call(this, html.configStrings, function (item, userinput, str, callback) {
      if (userinput && item.add && !(str = item.add(str))) callback();
      else callback(str, cewih('ul', fillStr(html.configStringsItem, { 'item': item.display ? item.display(str) : str })).firstChild);
    });
  };

  // 用户列表的设置项
  var users = function () {
    return items.call(this, html.configUsers, function (item, userinput, str, callback) {
      var showUserNotExistError = function () {
        Alert('yawf-user-not-exist', {
          'title': fillStr('{{accountNotExistErrorTitle}}'),
          'text': fillStr('{{{accountNotExistError}}}', { 'name': escapeXml(str) }),
          'icon': 'error'
        });
        callback();
      };
      if (userinput) {
        if (!(str = str.trim().replace(/^@/, ''))) return callback();
        account.name(str, function (info) {
          if (!info) showUserNotExistError();
          else if (item.add && !item.add(info)) callback();
          else callback(info.id, cewih('ul', fillStr(html.configUsersItem, info)).firstChild);
        }, showUserNotExistError);
      } else {
        var emptyInfo = { 'id': str, 'name': ' ', 'avatar': ' ' };
        var li = cewih('ul', fillStr(html.configUsersItem, emptyInfo)).firstChild;
        callback(str, li);
        account.id(str, function (info) {
          var u = li.querySelector('[uid]');
          u.setAttribute('uid', info.id); u.setAttribute('title', info.name); u.textContent = info.name;
          var p = li.querySelector('.pic img');
          p.src = info.avatar;
        });
      }
    });
  };

  // 一个有数字和垂直范围条的输入框
  var range = base('Range', function (dom, item) {
    var n = dom.querySelector('input[type="number"]');
    var r = dom.querySelector('input[type="range"]');
    var step = item.step || 1;
    n.max = item.max; r.max = item.max;
    n.min = item.min; r.min = item.min;
    n.step = step; r.step = step;
    n.style.width = 10 * String(item.max).length + 15 + 'px';
    var onchange = bindInputValue.text(n, item, function (val) {
      if (isNaN(parseInt(val))) return item['default'] || item.min;
      var val = Math.min(Math.max(parseInt(val), item.min), item.max);
      return Math.round((val - item.min) / step) * step + item.min;
    });
    r.value = n.value;
    var updateN = function () { if (r.value !== n.value) n.value = r.value; onchange(); };
    var updateR = function () { if (r.value !== n.value) r.value = n.value; onchange(); };
    r.addEventListener('change', updateN); r.addEventListener('mousemove', updateN);
    n.addEventListener('change', updateR); n.addEventListener('keypress', updateR);
  });

  // 一个输入按键的输入框
  var key = base('Key', function (dom, item) {
    var i = dom.querySelector('input'), s = dom.querySelector('button');
    var copyName = function () { s.textContent = keys.name(Number(i.value)); };
    var eventClear = function (e) { e.stopPropagation(); e.preventDefault(); };
    var valid = function (key) { if (key === 27) return 0; return key; }
    var onchange = bindInputValue.text(i, item, function (val) {
      call(copyName); return Number(val);
    });
    dom.addEventListener('keydown', function (e) {
      var val = valid(keys.get(e));
      i.value = val;
      copyName();
      onchange();
      eventClear(e);
    }, false);
    dom.addEventListener('keyup', eventClear, false);
    dom.addEventListener('keypress', eventClear, false);
    i.addEventListener('change', copyName);
    call(copyName);
  });

  return {
    'subtitle': subtitle,
    'text': text,
    'remark': remark,
    'string': string,
    'color': color,
    'number': number,
    'select': select,
    'strings': strings,
    'boolean': boolean,
    'users': users,
    'range': range,
    'key': key,
  };
}());

// 过滤器组
var filterGroup = function (groupName) {
  var items = [];
  // 向过滤器组里面添加一个项目
  var add = function (item) {
    // 先加入所有被引用的对象
    if (item.ref) Object.keys(item.ref).forEach(function (key) {
      item.ref[key].key = item.key + '.' + key;
      item.ref[key].nogui = true;
      add(item.ref[key]);
    });
    // 再加入自己
    items.push(item);
    // 初始化函数
    item._init = function () {
      // 初始化过滤器的设置
      if (item.type && typedConfig[item.type])
        item.conf = typedConfig[item.type](item);
      // 初始化过滤器内的文本
      if (item.i18n) i18n(item.i18n);
      // 初始化过滤器的显示
      if (!item.show && item.type && typedHtml[item.type])
        item.show = typedHtml[item.type].bind(item);
      // 过滤器自己的初始化
      if (item.init) item.init();
      // 真假设置项若设置激活时调用
      if (item.type === 'boolean' && item.conf && item.ainit) item.ainit();
      // 将规则加入到列表中
      if (item.rule) rules.add(item.priority || 0, item.rule.bind(item));
    };
    return item;
  };
  // 网页被初始化时初始化所有过滤器
  var init = function () { items.forEach(function (item) { withTry(item._init)(); }); };
  // 需要显示选项时生成界面
  var show = function (inner) {
    items.forEach(withTry(function (item) {
      var dom = null;
      if (item.show) dom = item.show(dom);
      if (dom) {
        if (item.shown) item.shown(dom);
        if (!item.nogui) inner.appendChild(dom);
      }
    }));
  };
  // 注册到过滤器分组
  var group = {
    'name': groupName,
    'show': show,
    'init': init,
    'add': add
  };
  return filters.add(group);
};

// 把后面的对象的元素加到第一个上面去
var extend = function (obj1) {
  return Array.apply(Array, arguments).reduce(function (x, y) {
    for (var k in y) x[k] = y[k];
    return x;
  });
};

// 当前是查看分组的页面吗？
var onGroupPage = function () {
  return location.pathname.slice(-9) === '/mygroups';
};

// 白名单、黑名单和折叠名单一式三份
var allInOneFilters = function (details, typedFilterGroup) {
  var filters = [
    { 'type': 'whitelist', 'priority': 1e5, 'action': 'show' },
    { 'type': 'blacklist', 'priority': 0, 'action': 'hidden' },
    { 'type': 'foldlist', 'priority': -1e5, 'action': 'fold' },
  ];
  var rules = {};
  typedFilterGroup = typedFilterGroup || filterGroup(details.name + 'FilterGroup');
  typedFilterGroup.add({ 'type': 'subtitle', 'text': '{{' + details.name + 'FilterDetails}}' });
  filters.forEach(function (filter) {
    // 标题
    typedFilterGroup.add({
      'type': 'remark',
      'text': '{{{' + filter.type + 'FilterDesc}}}',
      'typed': '{{' + details.name + 'FilterDetails}}',
      'shown': function (dom) {
        dom.classList.add('yawf-' + filter.type + 'FilterTitle');
      },
    });
    // 过滤器
    var rule = {
      'type': details.type || 'strings',
      'key': 'weibo.filters.' + details.name + '.' + filter.type,
      'priority': filter.priority,
      'text': '{{' + details.name + 'FilterDesc}}',
      'extent': [],
    };
    if (details.add) rule.add = details.add.bind(rule);
    if (details.display) rule.display = details.display.bind(rule);
    rule.rule = details.rule.bind(rule, filter.action);
    if (details[filter.type]) {
      Object.keys(details[filter.type]).forEach(function (override) {
        rule[override] = details[filter.type][override](rule[override]);
      });
    }
    rules[filter.type] = typedFilterGroup.add(rule);
  });
  // 快速创建过滤器的拖动
  if (details.fast) {
    dropdown.add({
      'valid': details.fast.valid,
      'desc': details.fast.desc,
      'add': function (val, action) {
        var value = details.fast.add(val);
        if (details.add) value = details.add(value);
        rules[action].addconf(value);
      },
    });
  }
  typedFilterGroup.rules = rules;
  return typedFilterGroup;
};

// 方便的选择器
var weiboContentSelector = function (feed, f) {
  var content = feed.querySelector('[node-type="feed_list_content"]');
  var reason = feed.querySelector('[node-type="feed_list_reason"] em');
  var items = [];
  if (content) items = items.concat(Array.apply(Array, f(content)));
  if (reason) items = items.concat(Array.apply(Array, f(reason)));
  return items;
};

var validKeywordItem = function (wrap) {
  wrap = wrap || function (x) { return x; };
  return function (element, callback) {
    var valid = false;
    if (element.nodeType === Node.TEXT_NODE) valid = true;
    else if ((element.tagName || '').toLowerCase() === 'em' &&
      element.firstChild === element.lastChild &&
      element.firstChild.nodeType === Node.TEXT_NODE) valid = true;
    if (valid) callback({ 'text': wrap(element.textContent) }); else callback();
  };
};

// 快速创建一个关键词或正则式的过滤器
var keywordOrRegexFastDesc = function (type) {
  return function (dom, val) {
    dom.innerHTML = fillStr('{{{' + type + 'FilterFast}}}');
    var labelc = cewih('div', html.fastFilterString).firstChild;
    labelc.querySelector('span').innerHTML = fillStr('{{{' + type + 'FilterFastInput}}}', { 'text': html.fastFilterStringInput });
    var input = labelc.querySelector('input'); input.value = val.text;
    var ref = dom.parentNode; ref.parentNode.insertBefore(labelc, ref.nextSibling);
    input.addEventListener('change', function () { val.text = input.value; });
    var checkbox = ref.parentNode.querySelector('input[type=checkbox]');
    checkbox.type = 'radio'; checkbox.name = 'yawfKeywordOrRegexp';
    return type === 'keyword';
  };
};

// 从一条微博中获取他的内容
var getWeiboContent = (function () {
  var active = [function (node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  }];
  var types = {
    'mention': function (node) {
      if (node.tagName.toLowerCase() === 'a' && node.getAttribute('usercard'))
        return node.textContent;
    },
    'topic': function (node) {
      if (node.tagName.toLowerCase() === 'a' && node.classList.contains('a_topic'))
        return node.textContent.trim();
    },
    'link': function (node) {
      if (node.tagName.toLowerCase() === 'a' && node.getAttribute('mt') === 'url')
        return node.getAttribute('title');
    },
    'emotion': function (node) {
      if (node.tagName.toLowerCase() === 'img' && node.getAttribute('alt'))
        return node.getAttribute('alt');
    },
  };
  var match = function (feed) {
    return weiboContentSelector(feed, function (m) {
      return Array.apply(Array, m.childNodes).map(function (node) {
        for (var i = 0, l = active.length; i < l; i++) {
          var val = null;
          try { val = active[i](node); } catch (e) { debug(e); }
          if (val != null) return val;
        }
        return '';
      });
    }).join('');
  };
  match.active = function (type) {
    active.push(types[type]);
    return type;
  };
  return match;
}());

// 基于内容的过滤
var contentFilterGroup = filterGroup('contentFilterGroup');

// 关键字过滤
var keywordFilterGroup = allInOneFilters({
  'name': 'keyword',
  'add': function (s) { return s.trim(); },
  'rule': function keywordMatch(action, feed) {
    var keywords = this.conf.concat(this.extent);
    var texts = getWeiboContent(feed).toUpperCase();
    var match = keywords.some(function (keyword) {
      if (!keyword) return false;
      return texts.indexOf(keyword.toUpperCase()) !== -1;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': validKeywordItem(),
    'desc': keywordOrRegexFastDesc('keyword'),
    'add': function (val) { return val.text; },
  }
}, contentFilterGroup);

var addRegexpChecker = function (s) {
  s = s.trim();
  if (s[0] === '/' && s[s.length - 1] === '/') s = s.slice(1, -1);
  try { RegExp(s).exec(''); } catch (e) {
    Alert('yawf-regexp-bad-formed', {
      'title': fillStr('{{regexpBadFormedTitle}}'),
      'text': fillStr('{{{regexpBadFormed}}}', { 'regexp': escapeXml(s) }),
      'icon': 'error'
    });
    s = null;
  }
  return s;
};

var compileRegexen = function () {
  this.regexen = this.conf.concat(this.extent).map(function (s) {
    try { return RegExp(s); }
    catch (e) { debug('erorr while compile regexp %s : %o', s, e); }
  }).filter(function (x) { return x; });
};

// 按照正则式过滤
var regexpFilterGroup = allInOneFilters({
  'name': 'regexp',
  'add': addRegexpChecker,
  'display': function (s) { return '/' + s + '/'; },
  'rule': function regexpMatch(action, feed) {
    compileRegexen.call(this);
    var regexen = this.regexen;
    var texts = getWeiboContent(feed);
    var match = regexen.some(function (regexp) {
      return !!(regexp.exec(texts));
    });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': validKeywordItem(function (s) {
      return s.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
    }),
    'desc': keywordOrRegexFastDesc('regexp'),
    'add': function (val) { return val.text; },
  }
}, contentFilterGroup);

// 关于正则式的说明
regexpFilterGroup.add({
  'type': 'text',
  'text': '{{regexpFilterRemark}}',
});

// 其他被视为内容的元素
contentFilterGroup.add({
  'type': 'subtitle',
  'text': '{{contentTypesTitle}}',
});

var contentTypes = (function (types) {
  var ts = Object.keys(types);
  ts.forEach(function (t) {
    var tt = t[0].toUpperCase() + t.slice(1);
    types[t] = contentFilterGroup.add({
      'type': 'boolean',
      'text': '{{contentTypes' + tt + '}}',
      'key': 'weibo.content.types_' + t,
      'default': types[t],
      'ainit': function () {
        getWeiboContent.active(t);
      },
    });
  });
  return types;
}({
  'mention': true,
  'topic': true,
  'link': false,
  'emotion': false,
}));

// 从一条微博中找到他的作者
var getFeedAuthorId = function (feed) {
  var author = feed.querySelector('.WB_detail>.WB_info>.WB_name[usercard]');
  if (!author) return null;
  return author.getAttribute('usercard').split('=')[1];
};

// 检查一个元素是不是用户相关的
var validUserElement = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var a = null;
  // 作者或来源
  try {
    if (element.classList.contains('WB_name')) a = element;
    else a = element.querySelector('.WB_name');
    if (a && (a.getAttribute('usercard') || '').indexOf('id=') === 0) {
      return callback({
        'name': a.getAttribute('title'),
        'id': a.getAttribute('usercard').slice(3),
      });
    }
  } catch (e) { }
  // 提及，别名
  try {
    if (element.getAttribute('usercard')) a = element;
    else a = element.querySelector('[usercard]');
    if (a && (a.getAttribute('usercard') || '').indexOf('name=') === 0) {
      return account.name(a.getAttribute('usercard').slice(5), callback, callback);
    }
    if (a && (a.getAttribute('usercard') || '').indexOf('id=') === 0) {
      return account.id(a.getAttribute('usercard').slice(3), callback, callback);
    }
  } catch (e) { }
  // 用户页面的头像和链接
  try {
    if (function () {
      // 排除话题页面
      a = document.querySelector('.pf_name .name');
      if (!a || !a.textContent || a.textContent.indexOf('#') === 0) return false;
      // 头像和链接
      var pf_head_pic = document.querySelector('.B_profile .pf_head_pic img');
      var pf_lin = document.querySelector('.B_profile .pf_lin'), a;
      // 看元素是图片还是链接
      if (!element.tagName || !element.tagName.toLowerCase) return false;
      var tag = element.tagName.toLowerCase();
      if (tag === 'img' || tag === 'a') a = element; else a = element.querySelector('img, a');
      tag = a.tagName.toLowerCase();
      // 比较图片或链接是否相同
      if (tag === 'img' && a.src === pf_head_pic.src) return true;
      if (tag === 'a' && a.classList.contains('pf_lin')) return true;
      return false;
    }()) {
      a = document.querySelector('.pf_name .name');
      return account.name(a.textContent, callback, callback);
    }
  } catch (e) { }
  // 其他
  try {
    if (element.getAttribute('title') && element.getAttribute('uid')) a = element;
    else if (element.getAttribute('title') && element.getAttribute('usercard').indexOf('id=') === 0) a = element;
    else a = element.querySelector('[title][uid], [title][usercard^="id="]');
    if (a) {
      return callback({
        'name': a.getAttribute('title'),
        'id': a.getAttribute('uid') || a.getAttribute('usercard').slice(3),
      });
    }
  } catch (e) { }
  callback();
};

// 作者用户过滤
var accountFilterGroup = allInOneFilters({
  'name': 'account',
  'type': 'users',
  'rule': function accountMatch(action, feed) {
    var accounts = this.conf.concat(this.extent), id = getFeedAuthorId(feed);
    if (!id) return null;
    var match = accounts.some(function (x) { return x === id; });
    if (match) return action; else return null;
  },
  'blacklist': {
    'rule': function accountMatchBlacklistOverride(_super) {
      return function accountMatchBlacklist(feed) {
        if (!accountByGroup.conf || !onGroupPage()) return _super(feed);
        return null;
      };
    },
  },
  'fast': {
    'valid': validUserElement,
    'desc': function (dom, val) {
      dom.innerHTML = fillStr('{{{accountFilterFast}}}', { 'name': escapeXml(val.name) });
      return true;
    },
    'add': function (val) { return val.id; },
  },
});

accountFilterGroup.add({
  'type': 'text',
  'text': '{{accountFilterRemark}}',
});


// 从一条微博中找到他的作者
var getFeedOriginalId = function (feed) {
  var originalAuthor = feed.querySelector('.WB_media_expand .WB_info .WB_name');
  if (!originalAuthor) return null;
  return originalAuthor.getAttribute('usercard').split('=')[1];
};

// 原创用户过滤
var originalFilterGroup = allInOneFilters({
  'name': 'original',
  'type': 'users',
  'rule': function originalMatch(action, feed) {
    var originals = this.conf.concat(this.extent), id = getFeedOriginalId(feed);
    if (!id) return null;
    var match = originals.some(function (x) { return x === id; });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': validUserElement,
    'desc': function (dom, val) {
      dom.innerHTML = fillStr('{{{originalFilterFast}}}', { 'name': escapeXml(val.name) });
      return true;
    },
    'add': function (val) { return val.id; },
  },
});

// 找到在一条微博里面被提到的人的昵称
var getFeedMentionList = function (feed) {
  return weiboContentSelector(feed, function (m) {
    return Array.apply(Array, m.querySelectorAll('a[usercard^="name="][href$="loc=at"]'));
  }).map(function (link) {
    return link.getAttribute('usercard').slice('name='.length);
  });
};

// 提到某人的微博
var mentionFilterGroup = allInOneFilters({
  'name': 'mention',
  'type': 'strings',
  'add': function (s) { return s.trim().replace(/^@/, ''); },
  'display': function (s) { return '@' + s; },
  'rule': function mentionMatch(action, feed) {
    var mentions = this.conf.concat(this.extent), users = getFeedMentionList(feed);
    var match = users.some(function (name) {
      return mentions.indexOf(name) !== -1;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': validUserElement,
    'desc': function (dom, val) {
      dom.innerHTML = fillStr('{{{mentionFilterFast}}}', { 'name': escapeXml(val.name) });
      return true;
    },
    'add': function (val) { return val.name; },
  },
});

var getFeedTopicList = function (feed) {
  return weiboContentSelector(feed, function (m) {
    return Array.apply(Array, m.querySelectorAll('.a_topic'));
  }).map(function (topic) { return topic.textContent; });
};

var validTopicItem = function (element, callback) {
  var a = null;
  if (element.nodeType === Node.TEXT_NODE) return callback();
  try {
    if (element.tagName.toLowerCase() === 'a' && element.classList.contains('a_topic')) a = element;
    else a = element.querySelector('a.a_topic');
    if (a) return callback({ 'topic': a.textContent.trim().replace(/#/g, '') });
  } catch (e) { }
  try {
    if (element.tagName.toLowerCase() === 'a' && element.getAttribute('suda-uatrack').indexOf('hottopic_r1') !== -1) a = element;
    else a = element.querySelector('a[suda-uatrack*="hottopic_r1"]');
    if (a) return callback({ 'topic': a.textContent.trim().replace(/#/g, '') });
  } catch (e) { }
  try {
    if (element.tagName.toLowerCase() === 'a' && element.getAttribute('suda-uatrack').indexOf('1022-topic') !== -1) a = element;
    else a = element.querySelector('a[suda-uatrack*="1022-topic"]');
    if (a) return callback({ 'topic': a.textContent.trim().replace(/#/g, '') });
  } catch (e) { }
  callback();
};

// 话题过滤
var topicFilterGroup = allInOneFilters({
  'name': 'topic',
  'add': function (s) { return s.trim().replace(/#/g, ''); },
  'display': function (s) { return '#' + s + '#'; },
  'rule': function topicMatch(action, feed) {
    var topics = this.conf.concat(this.extent);
    var text = getFeedTopicList(feed).join('##');
    var match = topics.some(function (topic) { return text.indexOf(topic) !== -1; });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': validTopicItem,
    'desc': function (dom, val) {
      dom.innerHTML = fillStr('{{{topicFilterFast}}}', { 'topic': escapeXml(val.topic) });
      return true;
    },
    'add': function (val) { return val.topic; },
  }
});

// 正则话题
var regexpTopicFilterGroup = allInOneFilters({
  'name': 'rtopic',
  'add': addRegexpChecker,
  'display': function (s) { return '/' + s + '/'; },
  'rule': function rtopicMatch(action, feed) {
    compileRegexen.call(this);
    var regexen = this.regexen;
    var topics = getFeedTopicList(feed);
    var match = regexen.some(function (regexp) {
      return topics.some(function (topic) {
        return !!regexp.exec(topic);
      });
    });
    if (match) return action; else return null;
  },
}, topicFilterGroup);


// 获取一条微博的所有来源（包括转发）
var getFeedSourceList = function (feed) {
  return ['[node-type="feed_list_funcLink"] [action-type="app_source"]',
  '.WB_media_expand [action-type="app_source"]'].map(function (qs) {
    var st = feed.querySelector(qs); if (!st) return null;
    return st.getAttribute('title') || st.textContent || '未通过审核应用';
  }).filter(function (x) { return x; });
};

// 来源过滤
var sourceFilterGroup = allInOneFilters({
  'name': 'source',
  'add': function (s) {
    s = s.trim();
    if (s === '微博 weibo.com') {
      Alert('yawf-source-filter-warning', {
        'title': fillStr('{{sourceFilterWarningTitle}}'),
        'text': fillStr('{{sourceFilterWarning}}'),
        'icon': 'error'
      });
      s = null;
    }
    return s;
  },
  'rule': function sourceMatch(action, feed) {
    var sources = this.conf.concat(this.extent), _sources = getFeedSourceList(feed);
    var match = _sources.some(function (s) { return sources.indexOf(s) !== -1; });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': function (element, callback) {
      var a = null;
      if (element.nodeType === Node.TEXT_NODE) return callback();
      try {
        if (element.getAttribute('action-type') === 'app_source') a = element;
        else a = element.querySelector('[action-type="app_source"]');
        if (a) {
          var source = a.getAttribute('title') || a.textContent || '未通过审核应用';
          if (source && source !== '微博 weibo.com') return callback({ 'source': source });
        }
      } catch (e) { debug('%o: %o', e, e.stack); }
      callback();
    },
    'desc': function (dom, val) {
      dom.innerHTML = fillStr('{{{sourceFilterFast}}}', { 'source': escapeXml(val.source) });
      return true;
    },
    'add': function (val) { return val.source; },
  }
});

// 从一条微博中找到所有超链接
var getFeedHyperlinkList = function (feed) {
  return Array.apply(Array, feed.querySelectorAll('a[title][href^="http://t.cn/"]')).map(function (a) {
    return a.getAttribute('title');
  });
};

// 超链接过滤
var hyperlinkFilterGroup = allInOneFilters({
  'name': 'hyperlink',
  'add': function (s) { return s.trim(); },
  'rule': function hyperlinkMatch(action, feed) {
    var links = this.conf.concat(this.extent), _links = getFeedHyperlinkList(feed);
    var match = _links.some(function (l) {
      return links.some(function (link) {
        return l.indexOf(link) !== -1;
      });
    });
    if (match) return action; else return null;
  },
  'fast': {
    'valid': function (element, callback) {
      if (element.nodeType === Node.TEXT_NODE) return callback();
      try {
        var a;
        if (element.tagName.toLowerCase() === 'a' &&
          element.getAttribute('title') &&
          element.getAttribute('href').indexOf('http://t.cn/') === 0) a = element;
        else a = element.querySelector('a[title][href^="http://t.cn/"]');
        if (a) {
          var x = document.createElement('a'); x.href = a.getAttribute('title');
          if (x.host !== 'weibo.com') return callback({ 'host': x.host });
        }
      } catch (e) { }
      callback();
    },
    'desc': function (dom, val) {
      dom.innerHTML = fillStr('{{{hyperlinkFilterFast}}}', { 'host': escapeXml(val.host) });
      return true;
    },
    'add': function (val) { return val.host; },
  },
});

var otherFilterGroup = filterGroup('otherFilterGroup');

otherFilterGroup.add({
  'type': 'subtitle',
  'text': '{{otherWhitelistTitle}}'
});

// 总是显示自己的微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.my_weibo',
  'text': '{{showMyWeiboDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMyWeiboRule(feed) {
    if (!this.conf) return;
    if (getFeedAuthorId(feed) === config.uid) return 'showme'; else return null;
  },
});

// 总是显示自己原创的微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.my_original',
  'text': '{{showMyOriginalDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMyOriginalRule(feed) {
    if (!this.conf) return;
    if (getFeedOriginalId(feed) === config.uid) return 'showme'; else return null;
  },
});

// 总是显示自己原创的微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.mention_me',
  'text': '{{showMentionMeDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMentionMeRule(feed) {
    if (!this.conf) return;
    if (getFeedMentionList(feed).indexOf(config.nick) !== -1) return 'showme'; else return null;
  },
});

otherFilterGroup.add({
  'type': 'subtitle',
  'text': '{{otherBlacklistTitle}}'
});

// 推广微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.ad_feed',
  'text': '{{adfeedFilterDesc}}',
  'priority': 1e5 + 1e3, // 优先于白名单
  'rule': function adFeedFilterRule(feed) {
    if (!this.conf) return null;
    return feed.getAttribute('feedtype') === 'ad' ? 'hidden' : null;
  },
});

// 粉丝头条
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.fans_top',
  'text': '{{fansTopFilterDesc}}',
  'priority': 1e5 + 1e3, // 优先于白名单
  'rule': function fansTopFilterRule(feed) {
    if (!this.conf) return null;
    return feed.querySelector('[action-type="feed_list_fansTopFeed"]') ? 'hidden' : null;
  },
});

// 混入新鲜事流的其他东西
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.fake_weibo',
  'text': '{{fakeWeiboFilterDesc}}',
  'rule': function fakeWeiboFilterRule(feed) {
    if (!this.conf) return null;
    if (!feed.getAttribute('mid')) return 'hidden';
    return null;
  },
});

// 已删除或没有权限查看的微博的转发
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.deleted_forward',
  'text': '{{deletedForwardFilterDesc}}',
  'rule': function deletedForwardFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.getAttribute('isforward') === '1' &&
      !feed.querySelector('.WB_media_expand .WB_info .WB_name')) return 'hidden';
    return null;
  },
});

// 投票微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.vote_weibo',
  'text': '{{voteWeiboFilterDesc}}',
  'rule': function voteWeiboFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.WB_from a[href^="http://vote.weibo.com/"]'))
      return 'hidden';
    return null;
  },
});

// 淘宝/天猫商品
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.tb_tm_wb',
  'text': '{{taobaoTianmaoWeibo}}',
  'rule': function taobaoTianmaoFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a .icon_fl_tb, a .icon_fl_tmall'))
      return 'hidden';
    return null;
  },
});

// 刷屏与版聊
otherFilterGroup.add({
  'type': 'subtitle',
  'text': '{{otherSpammingTitle}}',
});

// 添加数量和折叠/隐藏的
var lotShown = function (defnum, defact) {
  return {
    'number': {
      'type': 'number',
      'default': defnum || 3,
      'min': 1,
    },
    'action': {
      'type': 'select',
      'default': defact || 'fold',
      'select': [
        { 'value': 'fold', 'text': '{{foldlistActionDesc}}' },
        { 'value': 'hidden', 'text': '{{blacklistActionDesc}}' },
      ]
    },
  };
};

// 相同账号的过多微博
otherFilterGroup.add({
  'type': 'boolean',
  'priority': -1e6, // 低优先级
  'key': 'weibo.other.same_account',
  'ref': lotShown(5, 'fold'),
  'text': '{{sameAccountFilterDesc}}',
  'rule': function sameAccountRule(feed) {
    if (!this.conf) return null;
    // 如果在分组页面，而且用户设置了分组页面忽略该过滤器，则不工作
    if (sameAccountByGroup.conf && onGroupPage()) return null;
    var author = feed.querySelector('.WB_name[usercard]');
    if (!author) return null;
    var id = author.getAttribute('usercard').split('=')[1];
    var number = document.querySelectorAll('[node-type="feed_list"] ' +
      '.WB_feed_type[yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])' +
      '>.WB_feed_datail>.WB_detail>.WB_info>a.WB_name[usercard="id=' + id + '"]').length;
    if (number >= this.ref.number.conf) return 'account-' + this.ref.action.conf; else return null;
  },
});


// 相同微博的过多转发
otherFilterGroup.add({
  'type': 'boolean',
  'priority': -1e6, // 低优先级
  'key': 'weibo.other.same_forward',
  'ref': lotShown(3, 'fold'),
  'text': '{{sameForwardFilterDesc}}',
  'rule': function sameForwardRule(feed) {
    if (!this.conf) return null;
    var omid = feed.getAttribute('omid');
    if (!omid) return null;
    var number = document.querySelectorAll('[node-type="feed_list"] ' +
      '.WB_feed_type[omid="' + omid + '"][yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])').length;
    if (number >= this.ref.number.conf) return 'forward-' + this.ref.action.conf; else return null;
  },
});

// 分组浏览
otherFilterGroup.add({
  'type': 'subtitle',
  'text': '{{otherGroupTitle}}',
});

// 分组浏览不做按帐号隐藏
var accountByGroup = otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.group_account',
  'text': '{{accountByGroup}}',
});

// 分组浏览不做刷屏检查
var sameAccountByGroup = otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.group_same_account',
  'text': '{{sameAccountByGroup}}',
});


// 脚本工具
otherFilterGroup.add({
  'type': 'subtitle',
  'text': '{{scriptToolsTitle}}',
});

// 快速创建过滤器
if (isGecko) otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.use_fast_creator',
  'default': true,
  'text': '{{useFastCreator}}',
  'ainit': function () {
    dropdown.init();
  },
});

// 屏蔽隐藏微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.block_hidden',
  'text': '{{blockHiddenWeiboDesc}}',
  'ainit': function () {
    eachWeibo.after(function (feed) {
      [feed].concat(Array.apply(Array, feed.querySelectorAll('.WB_feed_type'))).forEach(function (feed) {
        var display = feed.getAttribute('yawf-display');
        if (display !== 'display-hidden') return;
        if (!feed.getAttribute('mid')) return;
        blockWeibo(feed.getAttribute('mid'));
        feed.setAttribute('yawf-block', 'block');
      });
    });
  }
});

// 自动载入
otherFilterGroup.add({
  'type': 'subtitle',
  'text': '{{autoLoadNewWeiboTitle}}',
});

// 自动加载新微博以避免被隐藏微博显示新微博提示
var autoLoad = otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.auto_load_new_weibo',
  'text': '{{autoLoadNewWeibo}}',
  'ainit': function () {
    var that = this, loading = false;

    // 展开新微博后添加和旧微博的分割线
    var addTimetip = (function () {
      var time0 = new Date(), tip = null;
      return function (feed) {
        if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
        var time = time0; time0 = new Date();
        time = Math.max(Math.round((time0 - time) / 6e4), 2);
        var min = time % 60, hour = (time - min) / 60;
        var text = '{{timeTipText}}';
        if (min) text = min + '{{timeTipMin}}' + text;
        if (hour) text = hour + '{{timeTipHour}}' + text;
        tip = cewih('div', fillStr(html.feedTimeTip, { 'time': text })).firstChild;
        feed.parentNode.insertBefore(tip, feed.nextSibling);
        setTimeout(function () {
          while (feed && !feed.clientHeight) feed = feed.previousSibling;
          if (feed) feed.classList.add('WB_feed_new');
        });
      };
    }());

    // 更新未读提示中的数字
    var updateUnreadCount = function () {
      var count = document.querySelectorAll('.WB_feed>.WB_feed_type[yawf-unread="hidden"]:not([yawf-display$="-hidden"]):not([yawf-display$="-son"])').length;
      var feedList = document.querySelector('.WB_feed');
      var newFeed = feedList.querySelector('.WB_feed a.notes[yawf-id="feed_list_newBar"]');
      // 先移除旧的，再放上新的
      if (newFeed) newFeed.parentNode.removeChild(newFeed);
      if (count) {
        newFeed = cewih('div', html.feedListNewBar).firstChild;
        feedList.insertBefore(newFeed, feedList.firstChild);
        newFeed.addEventListener('click', function () {
          var feeds = Array.apply(Array, document.querySelectorAll('.WB_feed>.WB_feed_type[yawf-unread="hidden"]'));
          feeds.forEach(function (feed) {
            feed.setAttribute('yawf-unread', 'show');
            feed.classList.remove('WB_feed_new');
          });
          updateUnreadCount();
          addTimetip(feeds[feeds.length - 1]);
        });
        newFeed.textContent = fillStr(text.newWeiboNotify, { 'count': count });
      }
    };

    // 隐藏掉微博原来的新消息提示框
    css.add(funcStr(function () { /*
      .WB_feed .WB_feed_type[yawf-unread="hidden"] { display: none !important; }
      .WB_feed fieldset[node-type="feed_list_timeTip"] { display: none !important; }
      .WB_feed a.notes[action-type="feed_list_newBar"][node-type="feed_list_newBar"] { display: none; }
      .WB_feed div.W_loading[requesttype="newFeed"] { display: none !important; }
    */ }));

    // 只在第一页工作
    var validPage = function () {
      var page = location.search.match(/[?&]page=(\d+)/);
      return !(page && page[1] > 1);
    };

    // 自动点开有新微博的提示
    newNode.add(function () {
      var newFeed = document.querySelector('.WB_feed a.notes[action-type="feed_list_newBar"][node-type="feed_list_newBar"]:not([yawf-noted])');
      if (!newFeed) return;
      if (validPage()) {
        newFeed.click(); loading = true;
      } else {
        newFeed.style.display = 'block';
        newFeed.setAttribute('yawf-noted', 'yawf-noted');
      }
    });

    // 看见有新微博了，看看是不是新加载出来的
    eachWeibo.before(function (feed) {
      if (!validPage()) return;
      var shown = Array.apply(Array, document.querySelectorAll('.WB_feed_type[yawf-unread="show"], .WB_feed_type[yawf-unread="show"]~*'));
      if (shown.length < 8 || shown.indexOf(feed) !== -1 || loading === false) feed.setAttribute('yawf-unread', 'show');
      else feed.setAttribute('yawf-unread', 'hidden');
    });

    // 走完过滤器之后，如果某条微博还没被隐藏掉，那么就提示用户有新微博要看了
    eachWeibo.after(function (feed) {
      if (feed.getAttribute('yawf-unread') !== 'hidden') return;
      var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
      if (display === 'hidden') return;
      updateUnreadCount();
      call(function () { autoExpand.expand(feed); updateUnreadCount(); });
      if (desktopNotification) desktopNotification.notify(feed);
    });

  },
});

var autoExpand = otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.auto_expand',
  'text': '{{autoExpand}}',
  'ref': {
    'etypes': {
      'type': 'boolean',
    },
    'background': {
      'type': 'boolean',
      'default': true,
    },
  },
  'expand': function (feed) {
    var that = this;
    var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
    if (!that.conf) return;
    if (that.ref.etypes.conf && display !== 'show') return;
    if (feed.getAttribute('yawf-unread') !== 'hidden') return;
    if (that.ref.background.conf && document.hasFocus()) {
      document.addEventListener('blur', function () { autoExpand.expand(feed); });
      return;
    }
    var unreads = document.querySelectorAll('.WB_feed_type[yawf-unread="hidden"]');
    var ref = unreads[unreads.length - 1];
    ref.parentNode.insertBefore(feed, ref.nextSibling);
    feed.setAttribute('yawf-unread', 'show');
  },
});

var desktopNotification = null;

if (notify.avaliableNotification().length) desktopNotification = otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.desktop_notification',
  'text': '{{desktopNotification}}',
  'ref': {
    'types': {
      'type': 'boolean',
      'default': true,
    },
    'autohide': {
      'type': 'boolean',
      'default': true,
    },
    'duration': {
      'type': 'range',
      'step': 50,
      'min': 1e3,
      'default': 3e3,
      'max': 1e4,
    },
    'durationc': {
      'type': 'range',
      'step': 10,
      'min': 0,
      'default': 150,
      'max': 500,
    },
    'ntypes': {
      'type': 'boolean',
    },
  },
  'shown': function (dom) {
    var that = this;
    that.onopt = dom.querySelector('[name="yawf-weibo.other.desktop_notification"]');
    that.onopt.addEventListener('change', that.update.bind(that));
    var ntypes = dom.querySelector('[name="yawf-weibo.other.desktop_notification.ntypes"]');
    if (notify.avaliableNotification().length <= 1) {
      while (ntypes.tagName.toLowerCase() !== 'label') ntypes = ntypes.parentNode;
      ntypes.style.display = 'none';
    } else ntypes.addEventListener('change', function () {
      that.ref.ntypes.putconf(ntypes.checked);
      that.update();
    });
  },
  'init': function () {
    notify.choseNotification(this.ref.ntypes.conf ? 'webkit' : 'standard');
  },
  'update': function () {
    var that = this, desktopNotify = that.onopt;
    that.init();
    if (!desktopNotify.checked) return;
    var permission = notify.hasPermission();
    if (permission === true) return;
    desktopNotify.checked = false;
    if (permission === null) notify.requestPermission(function () {
      desktopNotify.checked = true;
      that.update();
    });
    if (permission === false) Alert('notify-disabled', {
      'title': fillStr('{{desktopNotificationDisallowedTitle}}'),
      'text': fillStr('{{desktopNotificationDisallowed}}'),
      'icon': 'error'
    });
  },
  'notify': function (feed) {
    var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
    this.init(); if (!this.conf) return;
    if (this.ref.types.conf && display !== 'show') return;
    var mid, author, text, face, ori_author = '', ori_text = '';
    mid = feed.getAttribute('mid'); if (!mid) return;
    face = feed.querySelector('.WB_face img').src;
    author = feed.querySelector('.WB_info .WB_name').textContent;
    text = feed.querySelector('.WB_text').textContent;
    try {
      ori_author = feed.querySelector('.WB_media_expand .WB_info .WB_name').textContent;
      ori_text = feed.querySelector('.WB_media_expand .WB_text').textContent;
    } catch (e) { }
    var body = text + (ori_text ? ('//' + ori_author + ': ' + ori_text) : '');
    body = body.replace(/\s+/g, ' ').trim(); author = author.trim();
    var delay = 0;
    if (this.conf) delay = this.ref.duration.conf + body.length * this.ref.durationc.conf;
    var showFeed = function () {
      autoExpand.expand(feed);
      feed.scrollIntoView(false);
      feed.querySelector('[action-type="feed_list_comment]').click();
    };
    notify.showNotification(mid, author, body, face, delay, showFeed);
  },
});

if (notify.avaliableNotification().length) otherFilterGroup.add({
  'type': 'remark',
  'text': '{{autoCloseWarning}}',
});

var layoutFilterGroup = filterGroup('layoutFilterGroup');

layoutFilterGroup.add({
  'type': 'subtitle',
  'text': '{{layoutFilterGroupDesc}}',
});

// 大部分选择器参考了 眼不见心不烦 脚本
var layouts = (function () {
  var current = null;
  var subtitle = function (name) {
    layoutFilterGroup.add({
      'type': 'remark',
      'text': '{{layoutHide' + name + '}}',
    });
    current = name;
  };

  var item = function (name, cssText, defaultValue) {
    layoutFilterGroup.add({
      'type': 'boolean',
      'key': 'weibo.layoutHide' + current + name,
      'default': defaultValue || false,
      'text': '{{layoutHide' + current + name + '}}',
      'ainit': css(cssText),
    });
  };

  subtitle('Icon');
  item('Level', '.icon_bed[node-type="level"], .W_level_ico { display: none !important; }');
  item('Member', '.W_ico16[class*="ico_member"], .ico_member_dis, [class^="ico_vip"] { display: none !important; }');
  item('Approve', '.approve { display: none !important; }');
  item('ApproveCo', '.approve_co { display: none !important; }');
  item('Club', '.ico_club { display: none !important; }');
  item('VGirl', '.ico_vlady { display: none !important; }');
  item('Taobao', '.ico_taobao { display: none !important; }');
  item('Zongyika', '.zongyika2014 { display: none !important; }');
  item('Youji', '.lvxing2014, a[href^="http://huodong.weibo.com/travel2014"] { display: none !important; }');

  subtitle('Nav');
  item('Main', '.gn_nav>div:nth-child(1) { display: none !important; }');
  item('Hot', '.gn_nav>div:nth-child(2) { display: none !important; }');
  item('App', '.gn_nav>div:nth-child(3) { display: none !important; }');
  item('Game', '.gn_nav>div:nth-child(4) { display: none !important; }');
  item('Member', '.gn_setting[node-type="member"] { display: none !important; }');

  subtitle('Left');
  item('ToMe', '#pl_leftnav_common a[href^="/direct/tome"] { display: none !important; }');
  item('Friends', '#pl_leftnav_group > div[node-type="groupList"] > .level_1_Box, #pl_leftnav_common .level_1_Box > form.left_nav_line { display: none !important; }');
  item('App', '#pl_leftnav_app { display: none !important; }');

  subtitle('Middle');
  item('RecommendedTopic', '#pl_content_publisherTop div[node-type="recommendTopic"] { display: none !important; }');
  item('FeedRecommand', 'a.notes[node-type="feed_list_newBar"][href^="http"]:not([action-type="feed_list_newBar"]) { display: none !important; }');
  item('MemberTip', '[node-type="feed_list_shieldKeyword"] { display: none !important; }');

  subtitle('Right');
  item('Template', '.templete_enter { display: none !important; }'); // Spelling as is
  item('Info', '.W_person_info { display: none !important; }');
  item('Atten', '#pl_rightmod_myinfo .user_atten { display: none !important; }');
  item('Trial', '#trustPagelet_checkin_lotteryv5 { display: none !important; }');
  item('Interest', '[yawf-id="rightmod_recom_interest"] { display: none !important; }');
  item('HotTopic', '[yawf-id="rightmod_zt_hottopic"] { display: none !important; }');
  item('Member', '#trustPagelet_recom_memberv5 { display: none !important; }');
  item('Weibo', '[yawf-id="rightmod_recom_weibo"] { display: none !important; }');
  item('Location', '[yawf-id="rightmod_recom_location"] { display: none !important; }');
  item('Music', '[yawf-id="rightmod_recom_music"] { display: none !important; }');
  item('Movie', '[yawf-id="rightmod_recom_movie"] { display: none !important; }');
  item('Book', '[yawf-id="rightmod_recom_book"] { display: none !important; }');
  item('Notice', '#pl_rightmod_noticeboard { display: none !important; }');

  subtitle('Weibo');
  item('RecomFeed', '[node-type="feed_list_recommend"] { display: none !important; }');
  item('FeedTip', '[node-type="feed_privateset_tip"] { display: none !important; }');
  item('TopicCard', '.WB_feed_spec[exp-data*="value=1022-topic"] { display: none !important; }');
  item('LocationCard', '.WB_feed_spec[exp-data*="value=1022-place"] { display: none !important; }');
  layoutFilterGroup.add({
    'type': 'boolean',
    'key': 'weibo.layoutHideWeiboTopComment',
    'default': false,
    'text': '{{layoutHideWeiboTopComment}}',
    'ainit': function () {
      newNode.add(function () {
        var split = document.querySelector('.comment_lists .between_line_v2 a[action-data*="filter=hot"]');
        if (!split) return;
        while (!split.classList.contains('between_line_v2')) split = split.parentNode;
        while (split.parentNode) split.parentNode.removeChild(split.parentNode.firstChild);
      });
    },
  });
  item('SonTitle', '.WB_feed_type .WB_feed_together .wft_hd { display: none !important; }');
  item('Source', '.WB_time+.S_txt2, .WB_time+.S_txt2+.S_link2 { display: none !important; }');
  item('Report', '.WB_time~.hover { display: none !important; }');
  item('Like', 'a[action-type="feed_list_like"], a[action-type="feed_list_like"]+.S_txt3 { display: none !important; }');
  item('Forward', 'a[action-type="feed_list_forward"], a[action-type="feed_list_forward"]+.S_txt3 { display: none !important; }');
  item('Favourite', 'a[action-type="feed_list_favorite"], a[action-type="feed_list_favorite"]+.S_txt3 { display: none !important; }');
  item('BlockBySource', 'div.layer_menu_list[action-type="feed_list_layer"] a[action-type="feed_list_shield_by_app"] { display: none !important; }');
  item('BlockByKeyword', 'div.layer_menu_list[action-type="feed_list_layer"] a[action-type="feed_list_shield_setkeyword"] { display: none !important; }');

  subtitle('Person');
  item('MoveThings', '.S_profile .profile_move_things { display: none !important; }');
  item('Cover', funcStr(function () { /*!CSS
    .S_profile_pic { display: none; }
    .profile_top { margin-top: 20px; }
    .profile_top .pf_head { top: 5px; margin-top: 0 !important; }
    .profile_top .pf_head_pic { height: 120px; width: 120px; float: right; }
    .profile_top .pf_head_pic img { height: 120px; }
    .profile_top .pf_head .user_atten { width: 60px; float: left; height: 120px; }
    .profile_top .pf_head .user_atten li, .profile_top .pf_head .user_atten .follower { width: 54px; padding: 0 3px 3px; height: 37px; border-right: none; }
    .profile_top .pf_head .user_atten li strong { margin: 3px 0 0; }
  */ }));
  item('BadgeIcon', '.pf_badge_icon { display: none !important; }');
  item('Stats', '.profile_top .user_atten { display: none !important; } .profile_top .pf_head { margin-top: 51px; } ');
  item('MyData', '.W_main_c [id^="Pl_Official_MyMicroworld__"] { display: none !important; }');
  item('Group', '.W_main_2r [id^="Pl_Core_RightGroupsBtn__"] { display: none !important; }');
  item('SuggestUser', '.W_main_2r [id^="Pl_Core_RightUserList__"] { display: none !important; }');
  item('Relation', '.W_main_2r [id^="Pl_Core_RightUserGrid__"] { display: none !important; }');
  item('Album', '.W_main_2r [id^="Pl_Core_RightPicMulti__"] { display: none !important; }');
  item('HotTopic', '.W_main_2r [id^="Pl_Core_RightTextSingle__"] { display: none !important; }');
  item('HotWeibo', '.W_main_2r [id^="Pl_Core_RightPicText__"] { display: none !important; }');

  subtitle('Other');
  item('Ads', '#plc_main [id^="pl_rightmod_ads"], [id^="ads_"], [id^="ad_"], #trustPagelet_zt_hottopicv5 [class*="hot_topicad"], div[ad-data], .WB_feed .popular_buss, [id^="sinaadToolkitBox"] { display: none !important; } #wrapAD, .news_logo { visibility: hidden !important; }');
  item('FeedRecom', '.W_main_2r [id^="Pl_Third_Inline__"] { display: none !important; }');
  item('Footer', '.global_footer { display: none !important; }');
  item('WbIm', '.WBIM_news, .sendbox_btn_l a[href^="http://desktop.weibo.com/download.php"] { display: none !important; }');
  item('Tip', '.layer_tips { display: none !important; }');
  item('IM', '#WB_webim .wbim_min_friend, #WB_webim .webim_list { display: none !important; } #WB_webim .wbim_chat_box, #WB_webim .wbim_min_chat  { right: 20px !important; }');

  var tagRightbarMods = function () {
    var mods = document.querySelectorAll('#trustPagelet_indexright_recom .WB_right_module:not([yawf-id])');
    if (!mods) return;
    var identifiers = {
      '.right_content.hot_topic': 'rightmod_zt_hottopic',
      '.right_content.person_list': 'rightmod_recom_interest',
      '[change-data*="key=index_weibo"]': 'rightmod_recom_weibo',
      '[change-data*="key=index_LBS"]': 'rightmod_recom_location',
      '[change-data*="key=index_song"]': 'rightmod_recom_music',
      '[change-data*="key=index_mov"]': 'rightmod_recom_movie',
      '[change-data*="key=index_book"]': 'rightmod_recom_book'
    };
    Array.apply(Array, mods).forEach(function (mod) {
      Object.keys(identifiers).forEach(function (qs) {
        if (mod.querySelector(qs)) mod.setAttribute('yawf-id', identifiers[qs]);
      });
    });
  };

  newNode.add(tagRightbarMods);
  tagRightbarMods();
  css.add('.W_miniblog { visibility: visible !important; }');

}());

// 改造设置
var toolFilterGroup = filterGroup('toolFilterGroup');

// 边栏相关工具
toolFilterGroup.add({
  'type': 'subtitle',
  'text': '{{sideColumnToolsTitle}}',
});

// 展开左栏分组
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.showAllGroup',
  'text': '{{showAllGroupDesc}}',
  'ainit': css('#pl_leftnav_group div[node-type="moreList"] { display: block !important } #pl_leftnav_group > div[node-type="groupList"] > .level_2_Box > .levmore { display: none }'),
});

// 展开左栏消息
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.showAllMsgNav',
  'text': '{{showAllMsgNavDesc}}',
  'ainit': css('#pl_leftnav_common > .level_1_Box > .lev2_new { display: block !important }'),
});

// 合并左右边栏
var mergeLeftRight = toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.mergeColumns',
  'text': '{{mergeLeftRight}}',
  'ref': {
    'side': {
      'type': 'select',
      'select': [
        { 'value': 'left', 'text': '{{mergeLeftRightLeft}}' },
        { 'value': 'right', 'text': '{{mergeLeftRightRight}}' },
      ],
      'default': 'right',
    }
  },
  'init': function () {
    if (!this.conf) return;
    var main = document.body, side = this.ref.side.conf;
    var left = document.querySelector('.W_main_l');
    var attr = 'yawf-left';
    if (!left) return;
    var left0 = cewih('div', '');
    left.parentNode.insertBefore(left0, left);
    left.parentNode.removeChild(left);
    var positionLeft = function () {
      var ref = document.querySelector('#pl_rightmod_myinfo')
      var leftn = document.querySelector('.W_main_l');
      if (leftn) { left = leftn; }
      if (ref) {
        if (ref.nextSibling !== left) {
          ref.parentNode.insertBefore(left, ref.nextSibling);
          main.setAttribute('yawf-merge-left', side);
        }
      } else {
        if (left0.previousSibling !== left) {
          left0.parentNode.insertBefore(left, left0);
          main.removeAttribute('yawf-merge-left');
        }
      }
    };
    positionLeft();
    newNode.add(function () { positionLeft(); })
    css.add(funcStr(function () { /*!CSS
      body[yawf-merge-left] .W_main .W_main_l { width: 229px; padding: 0; float: none; }
      body[yawf-merge-left] .W_main .WB_left_nav .lev a:hover, .WB_left_nav .lev2 a:hover, .WB_left_nav .lev2 a.lev_curr, .WB_left_nav .lev2 a.lev_curr:hover, .WB_left_nav .lev3 a:hover { background-image: none; }
      body[yawf-merge-left] .W_main { width: 830px; background-position: -300px center; background-size: 200% 100%; }
      body[yawf-merge-left].B_index:not([yawf-weibo-only]) .W_main~.W_gotop { margin-left: 415px !important; }
      body[yawf-merge-left].B_index:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + 185px); }
      body[yawf-merge-left] .global_footer { width: 790px !important; }
      body[yawf-merge-left] .global_footer .list { margin-right: 0 !important; width: 155px !important; }
      body[yawf-merge-left] .global_footer .copy { padding-top: 0 !important; margin-top: -46px; }
      body[yawf-merge-left="left"] .W_main .W_main_r { float: left; }
      body[yawf-merge-left="left"] .W_main .W_main_c { float: right; }
      body[yawf-merge-left="left"] .W_main .templete_enter a { right: auto; left: 0; transform: scaleX(-1); }
      body[yawf-merge-left="left"] .W_main .send_weibo .input .arrow, .send_weibo .input.clicked .arrow { right: auto; left: -11px; transform: scaleX(-1); }
      body[yawf-merge-left="left"] .W_main #Box_center { border-left: 2px solid rgba(128, 128, 128, 0.2); margin-left: -2px; }
      body[yawf-merge-left="left"].B_index:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% - 415px); }
      body[yawf-merge-left="right"] .W_main #Box_center { border-right: 2px solid rgba(128, 128, 128, 0.2); margin-right: -2px; }
    */ }));
  },
});

// 左边栏浮动
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.fixedLeft',
  'text': '{{fixedLeft}}',
  'default': true,
  'ref': {
    'items': {
      'type': 'select',
      'select': [
        { 'value': 'default', 'text': '{{fixedLeftDefault}}' },
        { 'value': 'whole', 'text': '{{fixedLeftWhole}}' },
      ],
      'default': 'default',
    }
  },
  'init': function () {
    var left = document.querySelector('.W_main_l');
    if (!left) return;
    var type = this.conf ? this.ref.items.conf : 'none';
    var merged = mergeLeftRight.conf;
    // 禁用掉默认的浮动
    css.add('.W_main [node-type="left_fixed"]:not([yawf-fixed]) { height: auto !important; padding-top: 0 !important; position: static !important; top: 40px !important; animation: none; }');
    // 不浮动的如果禁用了默认的浮动，那么就完成了
    if (type === 'none') return;
    // 否则如果合并了左右边栏，而且我要浮动，那么右面就不要动
    if (merged) {
      var removeRightFixed = function () {
        var fixed = document.querySelector('.W_main_r [node-type="right_module_fixed"]');
        if (!fixed) return;
        while (fixed.firstChild) fixed.parentNode.insertBefore(fixed.firstChild, fixed);
        fixed.parentNode.removeChild(fixed);
      };
      removeRightFixed();
      newNode.add(removeRightFixed);
    }
    // 最后自定义的浮动
    css.add('.W_main [yawf-fixed] { animation-duration: 0.5s; animation-iteration-count: 1; animation-name: dropdown; animation-timing-function: ease; position: fixed; top: 65px; overflow: hidden; height: auto; }');
    css.add('body[yawf-merge-left] .W_main [yawf-fixed] { width: 229px; }');
    var floating = false;
    var updatePosition = function () {
      var container = document.querySelector('.W_main');
      var reference = merged && document.querySelector('.W_main_r') || left;
      var floatitem = type === 'default' && left.querySelector('[node-type="left_fixed"]') || left.querySelector('[node-type="left_all"]');
      var refc = reference.getClientRects();
      if (!refc || !refc[0]) return;
      var pos = refc[0];
      if (!floating) {
        if (pos.bottom < -65) {
          floating = true;
          floatitem.setAttribute('yawf-fixed', '');
        }
      } else {
        if (pos.bottom > 65 - floatitem.clientHeight) {
          floating = false;
          floatitem.removeAttribute('yawf-fixed');
          call(updatePosition);
        }
      }
      if (floating) {
        var cip = container.getClientRects()[0];
        var fip = floatitem.getClientRects()[0];
        if (cip && fip) {
          floatitem.style.maxHeight = Math.max(cip.bottom - fip.top - 20, 0) + 'px';
        }
      }
    };
    document.addEventListener('scroll', updatePosition);
    newNode.add(updatePosition);
    updatePosition();
  },
});

// 将话题黑名单应用到右侧热门话题栏目
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.filte_right_topic',
  'text': '{{filteRightTopic}}',
  'ainit': function () {
    css.add('.right_content.hot_topic li[yawf-rtopic="hidden"] { display: none !important; }');
    newNode.add(function () {
      var topics = Array.apply(Array, document.querySelectorAll('.right_content.hot_topic li:not([yawf-rtopic]) a[suda-uatrack*="hottopic_r1"]'));
      topics.forEach(function (topic) {
        var text = topic.title.replace(/#/g, '');
        var li; for (li = topic; li.tagName.toLowerCase() !== 'li'; li = li.parentNode);
        if (topicFilterGroup.rules.blacklist.conf.indexOf(text) !== -1) li.setAttribute('yawf-rtopic', 'hidden');
        else li.setAttribute('yawf-rtopic', 'show');
      });
    });
  },
})

// 微博相关工具
toolFilterGroup.add({
  'type': 'subtitle',
  'text': '{{weiboToolsTitle}}',
});

// 清除发布框中的默认话题 (wcf)
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.clear_def_topic',
  'text': '{{clearDefTopicDesc}}',
  'ainit': function () {
    var clearDefTopic = function () {
      var inputBox = document.querySelector('#pl_content_publisherTop .send_weibo .input textarea');
      if (inputBox && inputBox.hasAttribute('hottopic')) {
        inputBox.removeAttribute('hottopic'); inputBox.removeAttribute('hottopicid');
        inputBox.value = 'DUMMY'; inputBox.focus();
        inputBox.value = ''; inputBox.blur();
      }
    };
    newNode.add(clearDefTopic);
  },
});

// 微博作者与正文同行
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.unwrapText',
  'text': '{{unwrapTextDesc}}',
  'ainit': css('.WB_info, .WB_text { display: inline } .WB_info+.WB_text::before { content: ": " } .WB_func { margin-top: 5px } .B_index .WB_feed .W_ico16 { vertical-align: -3px !important }'),
});

// 个人主页自动打开微博列表
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.redirectWeibo',
  'text': '{{personalRedirectWeibo}}',
  'ainit': function () {
    var locat = unsafeWindow.$CONFIG.location;
    if (!locat || locat.slice(-5) !== '_home') return;
    if (!document.body.classList.contains('B_profile')) return;
    var from = (location.search.match(/from=([^&]*)/) || {})[1];
    if (locat.indexOf(from) === 0) return;
    var redirect = function () {
      var link = document.querySelector('.PRF_tab_noicon li.pftb_itm a[href*="/weibo?"]'); if (!link) return;
      if (!link) return false;
      newNode.remove(redirect);
      window.stop(); // 虽然不知道为什么，但是加上就正常了……
      location.replace(link.href);
    };
    newNode.add(redirect);
    redirect();
  },
});

// 查看大图旁添加查看原图链接
toolFilterGroup.add({
  'type': 'boolean',
  'default': true,
  'key': 'weibo.tool.viewOriginal',
  'text': '{{viewOriginalDesc}}',
  'ainit': function () {
    var addOriLink = function () {
      var a = document.querySelector('a.show_big[action-data]:not([yawf-viewori])'), l;
      if (!a) return; a.setAttribute('yawf-viewori', 'yawf-viewori');
      var updateLink = function () {
        var arg = a.getAttribute('action-data').match(/pid=(\w+)&mid=(\d+)&uid=(\d+)/);
        if (!arg) return;
        if (!l) {
          var vol = cewih('div', fillStr(html.viewOriginalLink));
          l = vol.firstChild;
          while (vol.firstChild) a.parentNode.insertBefore(vol.firstChild, a);
        }
        l.href = fillStr(url.view_ori, { 'uid': arg[3], 'mid': arg[2], 'pid': arg[1] });
      };
      updateLink();
      (new MutationObserver(updateLink)).observe(a, { 'attributes': true });
    };
    newNode.add(addOriLink);
  },
});

// 展开 t.cn 短网址
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.expandTCn',
  'text': '{{expandShortenedLink}}',
  'ainit': function () {
    var expandLink = function () {
      var links = Array.apply(Array, document.querySelectorAll('.WB_text a[mt="url"][title^="http"]:not([yawf-expand])'));
      links.forEach(function (link) {
        link.setAttribute('yawf-expand', 'expand');
        if (link.textContent.indexOf('http://t.cn/') !== 0) return;
        link.textContent = link.title;
      });
    };
    newNode.add(expandLink);
    eachWeibo.before(expandLink);
    expandLink();
  },
});

// 样式相关工具
toolFilterGroup.add({
  'type': 'subtitle',
  'text': '{{styleToolsTitle}}',
});

// 一个带有颜色/透明度的选框项
var coloredConfigItem = function (details) {

  // 将颜色和透明度转换为一个表示颜色的字符串
  var colorStr = function (color, transparency) {
    return 'rgba(' + color.slice(1)
      .split(/(..)/).filter(function (x) { return x; })
      .map(function (x) { return parseInt(x, 16); }).join(',') +
      ',' + (100 - transparency) / 100 + ')';
  };

  var color = {
    'type': 'color',
    'default': details.color || '#000000',
  };
  var transparency = {
    'type': 'range',
    'default': details.transparency || 0,
    'min': 0,
    'max': 100,
  };
  return {
    'color': color,
    'transparency': transparency,
    'rgba': {
      'toString': function () {
        return colorStr(color.conf, transparency.conf);
      },
    }
  };
};

// 鼠标滑过折叠微博时自动展示内容
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.hover_show_fold',
  'text': '{{hoverShowFold}}',
  'ainit': function () {
    css.add('[node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_datail:not(:hover) { max-height: 1000px; }');
  },
});

// 高亮显示白名单微博
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.whitelist_highlight',
  'ref': coloredConfigItem({ 'color': '#dafee4' }),
  'text': '{{whitelistHighlightDesc}}',
  'ainit': function () {
    css.add(fillStr(funcStr(function () { /*
      .WB_media_expand .WB_arrow { display: none !important; }
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-show"] { background-color: {{color}} !important; box-shadow: -20px 0 0 {{color}}, 20px 0 0 {{color}}; }
      [node-type="feed_list"] .WB_feed_together .WB_feed_type[yawf-display$="-show"] { background-color: {{color}} !important; box-shadow: -10px 0 0 {{color}}, 10px 0 0 {{color}}; }
    */ }), { 'color': '' + this.ref.rgba }));
  },
});

// 首页背景
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.my_background_color',
  'ref': coloredConfigItem({
    'color': '#ffffff',
    'transparency': 30,
  }),
  'text': '{{mainBackgroundColorOverride}}',
  'ainit': function () {
    css.add(fillStr(funcStr(function () { /*
      body:not(.S_profile) .W_main { background-image: none !important; background-color: {{color}} !important }
      body:not(.S_profile) .S_bg4, body:not(.S_profile) .W_main_a, body:not(.S_profile) .W_main_bg { background: transparent !important; }
    */ }), { 'color': '' + this.ref.rgba }));
  },
});

// 个人主页背景
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.other_background_color',
  'ref': coloredConfigItem({
    'color': '#ffffff',
    'transparency': 30,
  }),
  'text': '{{profileBackgroundColorOverride}}',
  'ainit': function () {
    css.add(fillStr(funcStr(function () { /*
			.S_profile .W_profile_bg, .S_profile .S_bg5 { background-color: {{color}} !important; }
      .S_profile .S_bg4:not(.W_profile_bg) { background: none transparent !important }
    */ }), { 'color': '' + this.ref.rgba }));
  },
});

// 阅读模式
toolFilterGroup.add({
  'type': 'boolean',
  'text': '{{weiboOnly}}',
  'key': 'weibo.tool.weibo_only',
  'ref': extend({
    // 宽度
    'width': {
      'type': 'range',
      'min': 600,
      'max': 980,
      'default': 600,
    },
    // 快捷键
    'key': {
      'type': 'key',
      'default': 119 // F8
    },
    // 是否显示快捷链接
    'switch': {
      'type': 'boolean',
      'default': false,
    },
    'usebgc': {
      'type': 'boolean',
    },
  }, coloredConfigItem({
    // 颜色
    'color': '#ffffff',
    // 透明度
    'transparency': 20,
  }), {
    'enabled': {
      'type': 'boolean',
      'default': false,
      'internal': true,
    },
  }),
  'ainit': function () {
    if (!document.body.classList.contains('B_index') &&
      !document.body.classList.contains('B_profile')) return;
    var that = this;
    var key = that.ref.key, attr = 'yawf-weibo-only';
    // 切换阅读模式开关
    var switchMode = function (enable) {
      var enabled = document.body.hasAttribute(attr);
      if (enable == null) enable = !enabled;
      else if (enable === enabled) return;
      if (enable) document.body.setAttribute(attr, attr);
      else document.body.removeAttribute(attr);
      that.ref.enabled.putconf(enable);
    };
    // 检查快捷键按键
    if (key.conf) keys.reg(key.conf, function () { switchMode(); });
    // 显示切换按钮
    if (that.ref['switch'].conf) {
      var showSwitch = function () {
        var rightBar = document.querySelector('.group_read .right_bar:not([yawf-weibo-only-added])');
        if (!rightBar) return; rightBar.setAttribute('yawf-weibo-only-added', 'added');
        var weiboOnly = cewih('div', fillStr(html.weiboOnlyButton, {
          'text': text.weiboOnlyButton,
          'shortcut': key.conf === 0 ? '' : ' (' + keys.name(key.conf) + ')',
        })).firstChild;
        weiboOnly.addEventListener('click', switchMode.bind(that, null));
        rightBar.insertBefore(weiboOnly, rightBar.querySelector('.right_item~.right_item'));
        newNode.remove(showSwitch);
      };
      newNode.add(showSwitch);
    }
    // 注册样式
    css.add(fillStr(funcStr(function () { /*!CSS
      body.B_index[{{attr}}] .W_main_l,
      body.B_index[{{attr}}] .W_main_r,
      body.B_index[{{attr}}] #Box_center>div:not(#pl_content_homeFeed),
      body.B_index[{{attr}}] .global_footer { display: none; }
      body.B_profile[{{attr}}] #Pl_Official_Header__1,
      body.B_profile[{{attr}}] #Pl_Core_Header__1,
      body.B_profile[{{attr}}] #Pl_Core_Nav__2,
      body.B_profile[{{attr}}] .W_main_2r,
      body.B_profile[{{attr}}] .global_footer { display: none; }
      body.B_index[{{attr}}] .WB_global_nav,
      body.B_profile[{{attr}}] .WB_global_nav { position: absolute !important; }
      body.B_index[{{attr}}] .W_miniblog,
      body.B_profile[{{attr}}] .W_miniblog { padding-top: 60px; }
      body.B_index[{{attr}}] .WB_feed .WB_screen,
      body.B_profile[{{attr}}] .WB_feed .WB_screen { margin-left: calc({{width}} - 48px); }
      body.B_index[{{attr}}] .W_main,
      body.B_profile[{{attr}}] .W_main { width: {{width}} !important; background-position: 40% center; background-size: 165% 100%;  }
      body.B_index[{{attr}}] #Box_center,
      body.B_index[{{attr}}] .WB_feed .repeat .input textarea,
      body.B_profile[{{attr}}] .WB_feed .repeat .input textarea { width: 100%; }
      body.B_index[{{attr}}] .WB_feed .type_text,
      body.B_profile[{{attr}}] .WB_feed .type_text { margin-left: calc({{width}} - 165px); }
      body.B_index[{{attr}}] .W_gotop,
      body.B_profile[{{attr}}] .W_gotop { margin-left: calc({{width}} / 2) !important; }
      body.B_index[{{attr}}] .WB_feed .between_line,
      body.B_profile[{{attr}}] .WB_feed .between_line { padding: 0 calc({{width}} / 2 - 132px) !important; }
      body.B_index[{{attr}}] .WB_media_expand .WB_arrow,
      body.B_profile[{{attr}}] .WB_media_expand .WB_arrow { display: none !important; }
      body.B_index[{{attr}}] #yawf-drop-area,
      body.B_profile[{{attr}}] #yawf-drop-area { left: calc(50% + {{width}} / 2 - 230px); top: 0; }
      body.B_index[{{attr}}] .W_main_a { width: {{width}}; }
      body.B_profile[{{attr}}] .W_main_c { padding-top: 9px; width: {{width}}; }
      .input_search { float: left; }
    */ }), {
      'width': that.ref.width.conf + 'px',
      'attr': attr,
    }));
    if (that.ref.usebgc.conf) css.add('body.B_index[' + attr + '] .W_main, body.B_profile[' + attr + '] .W_main { background: ' + that.ref.rgba + ' !important; }');
    var updateModeByConf = function () {
      switchMode.call(that, that.ref.enabled.getconf());
    };
    updateModeByConf();
    window.addEventListener('focus', updateModeByConf);
  }
});

// 自定义样式
toolFilterGroup.add({
  'type': 'string',
  'text': '{{userstyleTitle}}',
  'key': 'weibo.tool.userstyle',
  'init': function () {
    var conf = this.conf; GM_addStyle(conf);
    var set = this.putconf.bind(this);
    // 在 GM 中注册菜单项以支持对自定义 CSS 的修改
    // 此处并非常规设置方式，仅应在因用户加入的CSS导致无法正常显示脚本设置界面时使用。
    // 所以此处设置时不应依赖网页界面实现。
    var putconf = function (css) {
      conf = css;
      setTimeout(function () { set(css); config.write(); location.reload(); }, 0);
    };
    GM_registerMenuCommand(fillStr('{{userstyleEditDesc}}'), function () {
      var newcss = prompt(fillStr('{{userstyleEditDetails}}'), conf);
      if (newcss !== null) putconf(newcss);
    }, "S");
  },
});

// 脚本设置
var scriptFilterGroup = filterGroup('scriptFilterGroup');

// 导入导出
scriptFilterGroup.add({
  'type': 'subtitle',
  'text': '{{configImportAndExport}}',
});

scriptFilterGroup.add({
  'show': function () {
    var dom = cewih('div', html.configImportExport).firstChild;
    var bii = dom.querySelector('input[type="file"]');
    var be = dom.querySelector('[node-type="export"]');
    var br = dom.querySelector('[node-type="reset"]');
    // 导出按钮
    var updateExportButton = function () {
      be.href = 'data:application/octet-stream;base64,' +
        btoa(unescape(encodeURIComponent(config.export())));
      be.setAttribute('download', 'yawf-config.yawf');
    };
    // 导入按钮
    var doImport = function (file) {
      var reader = new FileReader();
      // 导入成功
      var success = function () {
        Alert('yawf-config-import-success', {
          'title': fillStr('{{configImportSuccessTitle}}'),
          'text': fillStr('{{configImportSuccess}}'),
          'icon': 'succ'
        });
      };
      // 导入失败
      var error = function () {
        Alert('yawf-config-import-fail', {
          'title': fillStr('{{configImportFailTitle}}'),
          'text': fillStr('{{configImportFail}}'),
          'icon': 'error'
        });
      };
      // 读文件
      if (file.size > (1 << 24)) error();
      else reader.addEventListener('load', function () {
        config.clear();
        if (config.import(reader.result)) {
          updateExportButton();
          success();
        } else error();
      });
      reader.readAsText(file);
      bii.value = '';
    };
    bii.addEventListener('change', function () {
      var file = bii.files[0];
      Confirm('yawf-config-import-warning', {
        'title': fillStr('{{configImportWarningTitle}}'),
        'text': fillStr('{{configImportWarning}}'),
        'onOk': function () { doImport(file); },
      });
    });
    updateExportButton();
    // 重置按钮
    var doReset = function () {
      config.clear();
      updateExportButton();
      GM_deleteValue('notification');
    };
    br.addEventListener('click', function () {
      Confirm('yawf-config-reset-warning', {
        'title': fillStr('{{configResetWarningTitle}}'),
        'text': fillStr('{{configResetWarning}}'),
        'onOk': doReset,
      });
    });
    return dom;
  },
});

// 调试
scriptFilterGroup.add({
  'type': 'subtitle',
  'text': '{{scriptDebugTitle}}',
});

scriptFilterGroup.add({
  'type': 'boolean',
  'text': '{{scriptDebug}}',
  'getconf': function () { return !!GM_getValue('debug', false); },
  'putconf': function (value) { GM_setValue('debug', !!value); return !!value; },
});

// 关于
scriptFilterGroup.add({
  'type': 'subtitle',
  'text': '{{scriptAboutTitle}}',
});

scriptFilterGroup.add({
  'type': 'text', 'text': '',
  'shown': function (dom) {
    dom.innerHTML = fillStr(text.scriptAbout, {
      'version': ((GM_info || {}).script || {}).version || '?'
    });
  },
});

// 扩展
if (extent) {
  scriptFilterGroup.add({
    'type': 'subtitle',
    'text': '{{scriptExtensionTitle}}',
  });

  scriptFilterGroup.add({
    'type': 'boolean',
    'text': '{{scriptExtensionEnable}}',
    'getconf': function () { return !!GM_getValue('extent', false); },
    'putconf': function (value) { GM_setValue('extent', !!value); return !!value; },
  });

  scriptFilterGroup.add({
    'type': 'remark',
    'text': '{{scriptExtensionWarning}}',
  });
}

// 添加一些样式
scriptFilterGroup.add({
  'init': function () {
    var isEn = i18n.lang === 'en';
    css.add(fillStr(funcStr(function () { /*!CSS
      .layoutFilterGroupLayer .yawf-configBoolean { width: {{layoutOptionWidth}}; }
    */ }), {
      'layoutOptionWidth': isEn ? '320px' : '160px',
    }));
    if (isEn) css.add(funcStr(function () { /*!CSS
      #yawf-config .profile_tab .current.pftb_lk { padding-left: 8px !important; padding-right: 8px !important; }
      #yawf-config .profile_tab .pftb_lk { padding-left: 10px !important; padding-right: 10px !important; }
    */ }));
  },
});

// 可扩展区域
var extension = (function () {
  if (!extent || !GM_getValue('extent')) return null;

  var loaded = false;

  var group = function () {
    var fg = filterGroup('extensionFilterGroup');
    group = function () { return fg; };
    return group();
  };

  // 暴露给外部的函数
  var yawf = {};
  // 检查 YAWF 加载成功
  yawf.ping = function (callback) {
    withTry(callback)();
  };
  // 添加一个过滤器项
  yawf.filter = function (details) {
    if (details.key) details.key = 'weibo.extent.' + details.key;
    var filter = group().add(details);
    if (loaded && filter._init) filter._init();
  };
  // 向已有的内容、账号等等过滤器中添加规则
  yawf.extent = function (name, type, words) {
    var key = 'weibo.filters.' + name + '.' + type;
    extent.exports(key, words);
  };
  // 在过滤每条微博之前/后调用的回调函数
  yawf.before = function (callback) { eachWeibo.before(callback); };
  yawf.after = function (callback) { eachWeibo.after(callback); };
  // 对话框
  yawf.alert = function (id, details) { Alert(id, details); };
  yawf.confirm = function (id, details) { Confirm(id, details); };
  yawf.dialog = function (id, details) {
    var dialog = Dialog(id, details.title, details.fill);
    dialog.show();
    details.shown(dialog);
  };

  // 向 unsafeWindow 暴露接口
  var push = withTry(function (args) {
    args = Array.apply(Array, args);
    var cmd = args[0], args = args.slice(1);
    debug('$_YAWF_$.%s(%o)', cmd, args);
    if (yawf[cmd]) call(function () {
      withTry(yawf[cmd]).apply(this, args);
    });
  }.bind(window));
  if (unsafeWindow.$_YAWF_$) {
    debug('before loaded: %o', unsafeWindow.$_YAWF_$);
    Array.apply(Array, unsafeWindow.$_YAWF_$).forEach(push);
  }
  unsafeWindow.$_YAWF_$ = { 'push': push };
  debug('YWAF loaded');

  var init = function () {
    // 检查是否沙箱机制可用，如果没有沙箱提示用户不安全
    // （有沙箱的话，从网页中直接调用这些函数会抛出异常提示没有权限。）
    location.href = fillStr('javascript:void(' + function () {
      try {
        /* 可选择禁用沙箱机制的警告 */
        $_YAWF_$.push(['filter', {
          'type': 'boolean',
          'text': '{{sandboxSupportWarningDisable}}',
          /* 这里不能使用 GM_getValue / GM_setValue ，使用 localStorage 代替 */
          'getconf': function () { return localStorage.YAWF_extension_warning_disable === 'true'; },
          'putconf': function (value) { localStorage.YAWF_extension_warning_disable = String(!!value); return !!value; },
          'init': function () {
            if (this.conf) return;
            /* 虽然这里也能用 STK.ui.alert ，不过既然主程序已经躲开他了，就不用他了吧 */
            $_YAWF_$.push(['alert', 'yawf-sandbox-warning', {
              'title': '{{sandboxSupportWarningMsgTitle}}',
              'text': '{{sandboxSupportWarningMsg}}',
            }]);
          }
        }]);
      } catch (e) { }
    } + '());');
    loaded = true;
  };

  return {
    'init': init,
  };
}());

// 检查是否要在本页上运行
var validPage = function () {
  if (self !== top) return false;
  if (!unsafeWindow.$CONFIG) return false;
  if (!unsafeWindow.$CONFIG.uid) return false;
  if (!unsafeWindow.$CONFIG.nick) return false;
  if (!unsafeWindow.$CONFIG.lang) return false;
  return true;
};

// 完成加载时
var dcl = function () {
  if (!validPage()) return;
  // 初始化用户语言
  i18n(unsafeWindow.$CONFIG.lang);
  // 加载用户配置
  config = config(unsafeWindow.$CONFIG.uid, unsafeWindow.$CONFIG.nick);
  // 初始化文本和网页数据（基于用户选择的语言）
  Object.keys(text).map(function (key) { i18n(text[key]); text[key] = text[key].local; });
  Object.keys(html).map(function (key) { html[key] = fillStr(html[key]); });
  // 初始化所有过滤器
  filters.init();
  // 初始化扩展
  if (extension) extension.init();
  // 初始化折叠微博后的显示
  fixFoldWeibo.init();
  // 注册样式
  css.init();
  // 初始化界面
  showIcon();
  // 开始过滤
  newNode.active();
};
if (document.body) call(dcl);
else document.addEventListener('DOMContentLoaded', dcl);

GM_addStyle(fillStr((funcStr(function () { /*!CSS
  // 在顶部添加按钮
  .gn_setting[node-type="member"]:last-child { margin-right: 44px; }
  .WB_global_nav .gn_setting .gn_tab.gn_filter .ico { background-image: url("{{filter-img}}"); !important; background-position: 0 0 !important; }
  .WB_global_nav .gn_search { width: 210px !important; left: 440px !important; position: absolute !important; }
  .WB_global_nav .gn_search .gn_input { width: 168px !important; }
  // 设置框相关样式
  .yawf-Layer.yawf-drag { opacity: 0.67; -moz-user-select: none; user-select: none; }
  #yawf-config [node-type="inner"] { padding: 20px; }
  .yawf-config-body { margin: -20px; max-height: 360px; overflow-y: auto; padding: 20px; width: 760px; }
  #yawf-config .profile_tab { font-size: 12px; margin: -20px -20px 20px; width: 800px; }
  .yawf-config-layer { padding-bottom: 20px; }
  .yawf-groupSubtitle, .yawf-groupRemark { margin: 5px 10px; padding: 10px 0 0 0; }
  .yawf-groupSubtitle { font-weight: bold; }
  .yawf-configInput { display: inline; }
  .yawf-configStringInput { display: block; }
  .yawf-configItem, .yawf-groupText { margin: 0 20px; padding: 0 0; }
  .yawf-configItem { line-height: 30px; }
  .yawf-groupText { line-height: 1em; }
  .yawf-groupText p { margin: 2px 0 0; }
  .yawf-configKeyInput button { padding: 0 1em; }
  .yawf-configKeyInput span { display: none; }
  .yawf-configKeyInput button:focus~span { display: inline; }
  .yawf-configItem label+label { margin-left: 0.5em; }
  .yawf-configItem br+label { margin-left: 4em; }
  .yawf-whitelistFilterTitle::before, .yawf-blacklistFilterTitle::before, .yawf-foldlistFilterTitle::before { content: " "; display: inline-block; width: 0.8em; height: 0.8em; border-radius: 1em; margin-right: 0.5em; border: 1px solid white; vertical-align: middle; }
  .yawf-whitelistFilterTitle::before { background: #37c837; box-shadow: 0 0 2px #37c837; }
  .yawf-blacklistFilterTitle::before { background: #c83737; box-shadow: 0 0 2px #c83737; }
  .yawf-foldlistFilterTitle::before { background: #c8c837; box-shadow: 0 0 2px #c8c837; }
  .yawf-configString span { line-height: 16px; width:calc(100% - 56px); margin: 1px 1px -21px; padding: 2px 10px; display: block; position: relative; }
  .yawf-configString textarea.W_input { width: calc(100% - 20px); padding-top: 20px; min-height: 80px; resize: vertical; background: linear-gradient(to bottom, -moz-Dialog 0px, -moz-Dialog 20px, transparent 21px, transparent 100%); }
  .yawf-configStringsInput, .yawf-configUsersInput { margin: 5px; }
  .yawf-configStringsItems, .yawf-configUsersItems { padding: 5px 10px; line-height: 1em; }
  .yawf-configStringsItem, .yawf-configUsersItem { display: inline-block; margin: 2px; }
  .yawf-configStringsItem a.icon_close, .yawf-configUsersItem a.icon_close { margin-left: 3px; vertical-align: -2px; }
  .yawf-configUsersItem .shield_object_card { display: inline-block; }
  .yawf-configUsersItem .shield_object_card .card_bg { border: 1px solid #e6e6e6; border-radius: 2px; box-shadow: 0 1px 1px rgba(0, 0, 0, 0.02); padding: 1px 5px 1px 1px; }
  .yawf-configUsersItem .shield_object_card .card_pic { float: left; width: 50px; }
  .yawf-configUsersItem .shield_object_card .card_pic .pic_box { display: block; }
  .yawf-configUsersItem .shield_object_card .card_content { margin-left: 60px; }
  .yawf-configUsersItem .shield_object_card .object_info { height: 22px; margin-top: 2px; }
  .yawf-configUsersItem .shield_object_card .object_name { line-height: 22px; overflow: hidden; }
  .yawf-configUsersItem .shield_object_card .other_info { line-height: 24px; }
  .yawf-configImportExport [node-type] { margin-right: 20px; }
  .yawf-configAdd { appearance: none; }
  #yawf-config .btn { border-top: 1px solid #ccc; margin: 15px 0 0; padding: 10px 0 0; }
  #yawf-config .btn .W_btn_b_disable:hover { border-color: #d9d9d9; }
  #yawf-config .btn .W_btn_b_disable:hover span { border-color: #ffffff; }
  .layoutFilterGroupLayer .yawf-configBoolean { display: inline-block; margin-right: 0; }
  .yawf-userstyles-tip { float: right; margin: 0 0 0 1em; }
  // 隐藏微博
  [yawf-display$="-hidden"] { display: none !important; }
  [node-type="feed_list"] .WB_feed_type:not([yawf-display]), [node-type="feed_list"] .WB_feed_type .WB_feed_type:not([yawf-display]) { visibility: hidden !important; }
  // 折叠微博
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]::before { display: block; height: 1em; line-height: 1em; padding: 0.5em 1.5em; border: 1px solid; border-color: transparent; margin: 0 0 20px; width: calc(100% - 3em - 2px); cursor: pointer; opacity: 0.8; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover::before { opacity: 1; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_datail { min-height: 0; max-height: 0; transition: max-height 0.1s; overflow: hidden; cursor: pointer; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_screen { margin-top: -40px !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_datail:not(:hover) { transition: max-height 0.3s; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:not(:hover) .WB_feed_datail { padding: 0; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:not(:hover) .type_spe_pos,
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:not(:hover)>*:first-child:not(.WB_screen) { display: none !important; }
  // 子微博
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-hidden"]+.WB_feed_type[yawf-display$="-son"],
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]+.WB_feed_type[yawf-display$="-son"] { display: none !important; }
  [node-type="feed_list"] .WB_feed_type:not([yawf-display$="-son"]) .WB_feed_together { display: none !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-withson="son"] .WB_feed_datail,
  [node-type="feed_list"] .WB_feed_type[yawf-withson="son"][yawf-display$="-fold"]::before { border: 0 none !important; } 
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-son"] { padding-top: 0 !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-son"]>.WB_screen,
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-son"]>.WB_feed_datail>.WB_face,
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-son"]>.WB_feed_datail>.WB_detail>*:not(.WB_feed_together) { display: none !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-son"]>.WB_feed_datail>.WB_detail { margin-top: -20px; margin-bottom: -10px; }
  // 其他
  .WB_feed_together .wft_users { display: none; }
  .WB_feed_together[yawf-sonfold="display"] [node-type="feed_list_wrapForward"] { display: block !important; }
  .WB_feed_together[yawf-sonfold="display"] [action-type="feed_list_seeAll"],
  .WB_feed_together[yawf-sonfold="display"] [action-type="feed_list_foldForward"] { display: none !important; }
  .W_miniblog { visibility: hidden; }
  .yawf-range-container { background-color: #f0f0f0; background-color: -moz-dialog; position: relative; display: inline-block; margin-left: -66px; width: 81px; margin-right: -15px; -webkit-transform: rotate(270deg); transform: rotate(270deg); top: calc(-1em - 36px); box-shadow: 0px 12px #f0f0f0, 0px -12px #f0f0f0; box-shadow: 0px 12px -moz-dialog, 0px -12px -moz-dialog; }
  input[type="number"]:not(:focus) ~ .yawf-range-container:not(:hover) > input[type="range"]:not(:focus) { display: none; }
  // 拖拽
  #yawf-drop-area { background: rgba(251, 251, 216, 0.8); display: none; height: 230px; left: calc(50% + 260px); position: fixed; top: 40px; width: 230px; z-index: 9999; }
  .yawf-drop-area-desc { height: 170px; width: 170px; margin: 16px 16px -206px 16px; padding: 10px; -moz-user-select: none; user-select: none; border: 4px dashed #ddd; border-radius: 20px; }
  .yawf-drop-area-title { font-size: 150%; font-weight: bold; }
  .yawf-drop-area-text { padding: 10px; }
  #yawf-drop-area-content { height: 230px; width: 230px; position: relative; z-index: 10002; opacity: 0; }
  #yawf-fast-filter-chose, #yawf-fast-filter-list { padding: 20px 40px; }
  #yawf-fast-filter-text { font-weight: bold; }
  // 其他页面优化设置
  #pl_rightmod_myinfo:empty { height: 156px; }
*/ }) + '\n').replace(/\/\/.*\n/g, '\n'), {
  'filter-img': images.filter,
}));
