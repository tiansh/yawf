// ==UserScript==
// @name              Yet Another Weibo Filter
// @name:zh-CN        Yet Another Weibo Filter 看真正想看的微博
// @name:zh-HK        Yet Another Weibo Filter 看真正想看的微博
// @name:zh-TW        Yet Another Weibo Filter 看真正想看的微博
// @name:en           Yet Another Weibo Filter
// @namespace         https://github.com/tiansh
// @description       新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。 filter Sina Weibo by keywords, authors, topics, sources, etc.; modify layout
// @description:zh-CN 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。
// @description:zh-HK 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。
// @description:zh-TW 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。
// @description:en    filter Sina Weibo by keywords, authors, topics, sources, etc.; modify layout
// @include           http://www.weibo.com/*
// @include           http://weibo.com/*
// @include           http://d.weibo.com/*
// @exclude           http://weibo.com/a/bind/test
// @version           2.1.140
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
var fonts = {
  'iconfont': '@font-face { font-family: "yawf-iconfont"; font-style: normal; font-weight: normal; src: url("data:image/woff;base64,d09GRk9UVE8AAAPIAAoAAAAABbQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABDRkYgAAAA9AAAANUAAADot8EQFkZGVE0AAAHMAAAAGgAAABxtAw0mT1MvMgAAAegAAABJAAAAYFmdYldjbWFwAAACNAAAADgAAAFCAA0DAGhlYWQAAAJsAAAAMAAAADYD5a1oaGhlYQAAApwAAAAdAAAAJAaAA4BobXR4AAACvAAAAAgAAAAICAAAd21heHAAAALEAAAABgAAAAYAAlAAbmFtZQAAAswAAADkAAAB1Hh5OPRwb3N0AAADsAAAABYAAAAg/4YAM3icVY2xagJBFADfO+9O1GNNJBcLFwWxPLUXAumvDekPQUmjTYjYCNbP0sLO+Ak2NsLWfkN+ZN/ebiTaBG6qqWYQfB8QUSyzxaT/MZ7PJvPZJ6AHCC/c8liWuOlvImxXofL1PiT6l6isa7aZt00SSFjVJcCDhPWjBCHhpwHePSGgVQgXLzdG4CF230hxqlApc1El9ZwP+HgdhMqtYk7NxaVlkVdMEn+T3bkeuY7dE3HH7rgX8PD3NT7oc6gzfXJT0pk9kT0HIt8+UbzYm4RCiqp/hZJWXgAAAHicY2BgYGQAgjO2i86D6AtJW7VhNABKVQagAAB4nGNgZmFg/MLAysDBNJPpDAMDQz+EZnzNYMzIycDAxMAGJKGAkQEJBKS5pjA4MEQyRDLr/NdhiGGawdCMUAPkKQAhIwBYTwumAAAAeJxjYGBgZoBgGQZGBhCwAfIYwXwWBgUgzQKEIH7k//8Q8v8KqEoGRjYGGJP6gGYGUxcAAJgrBwx4nGNgZGBgAOK+F//94vltvjJwszCAwIWkrdpwuvx/LXMX0wwgl4OBCSQKAFMCC7x4nGNgZGBgmvG/liGGhQEEmLsYGBlQARMAU6MDCAAAAAQAAAAEAAB3AABQAAACAAB4nJWPwWoCMRCGv+gqihV6KB7EQ85ClmTxJL12n0C8i+zKXjawCuKLeOn79EH6BH2ETnSglFJoA0m+mf+fzAR44IohLcOUhXKPEc/KfZa8KmfieVceMDEj5SFT48VpsrFk5reqxD0epfrOfTa8KGfieVMeMONDecjcPHFhx5kaR8OeSCuczhNcdufaNfvY1rGV8If+JZWaSnfHgQpLQY6Xey379yZ3PbASLYjfSZ2/xZTydBm7Q2WL3Nu1/TaOxGHlgneFD+L9+y+2MlzHUXxJT63TmGyr7tjE1obc/+O1T5RwTOJ4nGNgZgCD/80MRkCKkQENAAAoVQG5AAA=") format("woff"); }',
};

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
  'foldedWeiboTextDesc': { 'zh-cn': '折叠微博显示|{{<text>}}', 'zh-hk': '折疊微博顯示|{{<text>}}', 'zh-tw': '折疊微博顯示|{{<text>}}', 'en': 'Show information for folded weibo | {{<text>}}' },
  'foldedWeiboTextAuthorDesc': { 'zh-cn': '作者', 'zh-hk': '作者', 'zh-tw': '作者', 'en': 'Author' },
  'foldedWeiboTextReasonDesc': { 'zh-cn': '折叠原因', 'zh-hk': '折疊原因', 'zh-tw': '折疊原因', 'en': 'Reason' },
  'foldedWeiboTextAuthorReasonDesc': { 'zh-cn': '作者和折叠原因', 'zh-hk': '作者和折疊原因', 'zh-tw': '作者和折疊原因', 'en': 'Author and reason' },
  'foldedWeiboText': {
    'zh-cn': '"一条微博被折叠，请点击查看"',
    'zh-hk': '"一條微博被折疊，請點擊查看"',
    'zh-tw': '"一條微博被折疊，請點擊查看"',
    'en': '"A Weibo was folded, click to view."'
  },
  'foldedWeiboTextAuthor': {
    'zh-cn': '"来自 @" attr(yawf-author) " 的一条微博被折叠，请点击查看"',
    'zh-hk': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"',
    'zh-tw': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"',
    'en': '"A Weibo from @" attr(yawf-author) " was folded, click to view."'
  },
  'foldedWeiboTextReason': {
    'zh-cn': '"一条微博" attr(yawf-reason) "而被折叠，请点击查看"',
    'zh-hk': '"一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'zh-tw': '"一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'en': '"A Weibo was folded " attr(yawf-reason) ", click to view."'
  },
  'foldedWeiboTextAuthorReason': {
    'zh-cn': '"来自 @" attr(yawf-author) " 的一条微博" attr(yawf-reason) "而被折叠，请点击查看"',
    'zh-hk': '"來自 @" attr(yawf-author) " 的一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'zh-tw': '"來自 @" attr(yawf-author) " 的一條微博" attr(yawf-reason) "而被折疊，請點擊查看"',
    'en': '"A Weibo from @" attr(yawf-author) " was folded " attr(yawf-reason) ", click to view."'
  },
  'disabledKey': { 'zh-cn': '(已禁用)', 'zh-hk': '(已停用)', 'zh-tw': '(已停用)', 'en': '(Disabled)' },
  // 设置框
  'filter': { 'zh-cn': '过滤器', 'zh-hk': '篩選器', 'zh-tw': '篩選器', 'en': 'Filter' },
  'filterMenuItem': { 'zh-cn': '过滤器设置', 'zh-hk': '篩選器設定', 'zh-tw': '篩選器設定', 'en': 'Filter Settings' },
  'configDialogTitle': { 'zh-cn': '过滤器设置', 'zh-hk': '篩選器設定', 'zh-tw': '篩選器設定', 'en': 'Filter Settings' },
  'whitelistFilterDesc': { 'zh-cn': '总是显示{{{typed}}}', 'zh-hk': '總是顯示{{{typed}}}', 'zh-tw': '總是顯示{{{typed}}}', 'en': 'Always show {{{typed}}}' },
  'blacklistFilterDesc': { 'zh-cn': '隐藏{{{typed}}}', 'zh-hk': '隱藏{{{typed}}}', 'zh-tw': '隱藏{{{typed}}}', 'en': 'Hide {{{typed}}}' },
  'foldlistFilterDesc': { 'zh-cn': '折叠{{{typed}}}', 'zh-hk': '折疊{{{typed}}}', 'zh-tw': '折疊{{{typed}}}', 'en': 'Fold {{{typed}}}' },
  'whitelistActionDesc': { 'zh-cn': '显示', 'zh-hk': '顯示', 'zh-tw': '顯示', 'en': 'Show' },
  'blacklistActionDesc': { 'zh-cn': '隐藏', 'zh-hk': '隱藏', 'zh-tw': '隱藏', 'en': 'Hide' },
  'foldlistActionDesc': { 'zh-cn': '折叠', 'zh-hk': '折疊', 'zh-tw': '折疊', 'en': 'Fold' },
  // 右键菜单
  'contextMenuCreateLabel': { 'zh-cn': '创建过滤器', 'zh-hk': '創建篩選器', 'zh-tw': '創建篩選器', 'en': 'Create Filter' },
  // 内容
  'contentFilterGroupTitle': { 'zh-cn': '内容', 'zh-hk': '內容', 'zh-tw': '內容', 'en': 'Content' },
  // 关键词
  'keywordFilterDesc': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword' },
  'keywordFilterDetails': { 'zh-cn': '包含以下关键词的微博', 'zh-hk': '包含以下關鍵字的微博', 'zh-tw': '包含以下關鍵字的微博', 'en': 'Weibo with these keywords' },
  'keywordFilterFast': { 'zh-cn': '包含关键词', 'zh-hk': '包含關鍵字', 'zh-tw': '包含關鍵字', 'en': 'Weibo contains keyword ' },
  'keywordFilterFastInput': { 'zh-cn': '“{{text}}”', 'zh-hk': '「{{text}}」', 'zh-tw': '「{{text}}」', 'en': '"{{text}}"' },
  'keywordFilterReason': { 'zh-cn': '因包含关键词“{{detail}}”', 'zh-hk': '因包含關鍵詞「{{detail}}」', 'zh-tw': '因包含關鍵詞「{{detail}}」', 'en': 'because it contains keyword "{{detail}}"' },
  // 正则表达式
  'regexpFilterGroupTitle': { 'zh-cn': '正则', 'zh-hk': '正則', 'zh-tw': '正規', 'en': 'Regexp' },
  'regexpFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'regexpFilterDetails': { 'zh-cn': '匹配以下正则表达式的微博', 'zh-hk': '匹配以下正則表達式的微博', 'zh-tw': '匹配以下正規表示式的微博', 'en': 'Weibo matches these regular expressions' },
  'regexpFilterFast': { 'zh-cn': '匹配正则式', 'zh-hk': '匹配正則式', 'zh-tw': '匹配正規式', 'en': 'Weibo matches regexp ' },
  'regexpFilterFastInput': { 'zh-cn': '/{{text}}/', 'zh-hk': '/{{text}}/', 'zh-tw': '/{{text}}/', 'en': '/{{text}}/' },
  'regexpFilterReason': { 'zh-cn': '因匹配正则式 {{detail}} ', 'zh-hk': '因匹配正則式 {{detail}} ', 'zh-tw': '因匹配正規式 {{detail}} ', 'en': 'because it matches regexp {{detail}} ' },
  'regexpFilterRemark': {
    'zh-cn': '正则表达式的过滤方式提供了基于微博内容的高级过滤方式，如果只是需要简单地关键词过滤请使用内容标签页的关键词以获得更好的效率。正则表达式书写时不需要对“/”字符转义。',
    'zh-hk': '正則表達式的篩選方式提供了基於微博內容的高級篩選方式，如果只是需要簡單地關鍵字篩選請使用內容標籤頁的關鍵字以獲得更好的效率。正則表達式書寫時不需要對「/」字符轉義。',
    'zh-tw': '正規表示式的篩選方式提供了基於微博內容的高級篩選方式，如果只是需要簡單地關鍵字篩選請使用內容標籤頁的關鍵字以獲得更好的效率。正規表示式書寫時不需要對「/」字符轉義。',
    'en': 'Regular expression provide advanced filter settings based on content. You may set keywords in Content tab for better performance. You do not need to escape "/" in your regexp.'
  },
  'regexpBadFormedTitle': { 'zh-cn': '非法的正则表达式', 'zh-hk': '不合法的正則表達式', 'zh-tw': '不合法的正規表示式', 'en': 'Illegal Regexp' },
  'regexpBadFormed': {
    'zh-cn': '您输入的/{{regexp}}/不能被正确地解析为正则表达式，请检查您的输入。如需关键词屏蔽请到内容标签页设置。',
    'zh-hk': '您輸入的/{{regexp}}/不能被正確地解析為正則表達式，請檢查您的輸入。如需關鍵詞屏蔽請到內容標籤頁面設置。',
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
  'accountFilterContextMenu': { 'zh-cn': '作者是 @{{name}}', 'zh-hk': '作者是 @{{name}}', 'zh-tw': '作者是 @{{name}}', 'en': 'by @{{name}}', },
  'accountFilterReason': { 'zh-cn': '因来自 @{{detail}} ', 'zh-hk': '因來自 @{{detail}} ', 'zh-tw': '因來自 @{{detail}} ', 'en': 'because it is posted by @{{detail}} ' },
  'accountFilterRemark': {
    'zh-cn': '推荐您到<a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">隐私设置 - 屏蔽帐号</a>屏蔽您关注了但不想在首页看到的帐号。',
    'zh-hk': '推薦您到<a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">隱私設置 - 屏蔽帐号</a>封鎖您關注了但不想在首頁看到的帳號。',
    'zh-tw': '推薦您到<a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">隱私設置 - 屏蔽帐号</a>封鎖您關注了但不想在首頁看到的帳號。',
    'en': 'You can block Weibo from accounts you followed in the page <a target="_blank" href="http://account.weibo.com/set/privacy#open=privacy_feeduser">Privacy - Block account</a>.'
  },
  'accountNotExistErrorTitle': { 'zh-cn': '帐号不存在', 'zh-hk': '帳號不存在', 'zh-tw': '帳號不存在', 'en': 'Account does not exist' },
  'accountNotExistError': { 'zh-cn': '不存在名为{{name}}的帐号', 'zh-hk': '不存在名為{{name}}的帳號', 'zh-tw': '不存在名為{{name}}的帳號', 'en': 'Account named {{name}} does not exist' },
  // 原创
  'originalFilterGroupTitle': { 'zh-cn': '原创', 'zh-hk': '原創', 'zh-tw': '原創', 'en': 'Original' },
  'originalFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'originalFilterDetails': { 'zh-cn': '原创是以下帐号的微博', 'zh-hk': '原創是以下帳號的微博', 'zh-tw': '原創是以下帳號的微博', 'en': 'Hide original Weibo from these accounts' },
  'originalFilterFast': { 'zh-cn': '原创是“@{{name}}”的微博', 'zh-hk': '原創是「@{{name}}」的微博', 'zh-tw': '原創是「@{{name}}」的微博', 'en': 'Original Weibo from "@{{name}}"' },
  'originalFilterContextMenu': { 'zh-cn': '原创是 @{{name}}', 'zh-hk': '原創是 @{{name}}', 'zh-tw': '原創是 @{{name}}', 'en': 'from @{{name}}' },
  'originalFilterReason': { 'zh-cn': '因转发自 @{{detail}} ', 'zh-hk': '因轉發自 @{{detail}} ', 'zh-tw': '因轉發自 @{{detail}} ', 'en': 'because it is forwarded from @{{detail}} ' },
  // 提到
  'mentionFilterGroupTitle': { 'zh-cn': '提到', 'zh-hk': '提到', 'zh-tw': '提到', 'en': 'Mention' },
  'mentionFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'mentionFilterDetails': { 'zh-cn': '提到以下帐号的微博', 'zh-hk': '提到以下帳號的微博', 'zh-tw': '提到以下帳號的微博', 'en': 'Weibo mentioned these accounts' },
  'mentionFilterFast': { 'zh-cn': '提到了“@{{name}}”的微博', 'zh-hk': '提到了「@{{name}}」的微博', 'zh-tw': '提到了「@{{name}}」的微博', 'en': 'Weibo mentioned "@{{name}}"' },
  'mentionFilterContextMenuGroup': { 'zh-cn': '提到了', 'zh-hk': '提到了', 'zh-tw': '提到了', 'en': 'mentioned' },
  'mentionFilterContextMenu': { 'zh-cn': '@{{name}}', 'zh-hk': '@{{name}}', 'zh-tw': '@{{name}}', 'en': '@{{name}}' },
  'mentionFilterReason': { 'zh-cn': '因提到 @{{detail}} ', 'zh-hk': '因提到 @{{detail}} ', 'zh-tw': '因提到 @{{detail}} ', 'en': 'because it mentioned @{{detail}} ' },
  // 话题
  'topicFilterGroupTitle': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDesc': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDetails': { 'zh-cn': '包含以下话题的微博', 'zh-hk': '包含以下話題的微博', 'zh-tw': '包含以下話題的微博', 'en': 'Weibo with these topics' },
  'topicFilterFast': { 'zh-cn': '包含话题　　', 'zh-hk': '包含話題　　', 'zh-tw': '包含話題　　', 'en': 'Weibo contains topic ' },
  'topicFilterContextMenuGroup': { 'zh-cn': '包含话题', 'zh-hk': '包含話題', 'zh-tw': '包含話題', 'en': 'contains topic' },
  'topicFilterContextMenu': { 'zh-cn': '#{{topic}}#', 'zh-hk': '#{{topic}}#', 'zh-tw': '#{{topic}}#', 'en': '#{{topic}}#' },
  'topicFilterFastInput': { 'zh-cn': '“#{{topic}}#”', 'zh-hk': '「#{{topic}}#」', 'zh-tw': '「#{{topic}}#」', 'en': '"#{{topic}}#"' },
  'topicFilterReason': { 'zh-cn': '因包含话题 #{{detail}}# ', 'zh-hk': '因包含話題 #{{detail}}# ', 'zh-tw': '因包含話題 #{{detail}}# ', 'en': 'because it contained topic #{{detail}}# ' },
  'rtopicFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'rtopicFilterDetails': { 'zh-cn': '包含匹配以下正则表达式的话题的微博', 'zh-hk': '包含匹配以下正則表達式的話題的微博', 'zh-tw': '包含匹配以下正規表示式的话题的微博', 'en': 'Weibo with topic matches these regular expressions' },
  'rtopicFilterFast': { 'zh-cn': '包含话题匹配', 'zh-hk': '包含話題匹配', 'zh-tw': '包含話題匹配', 'en': 'Weibo contains topic matches ' },
  'rtopicFilterFastInput': { 'zh-cn': '“#{{topic}}#”', 'zh-hk': '「#{{topic}}#」', 'zh-tw': '「#{{topic}}#」', 'en': '"#{{topic}}#"' },
  'rtopicFilterReason': { 'zh-cn': '因包含话题匹配 {{detail}} ', 'zh-hk': '因包含話題匹配 {{detail}} ', 'zh-tw': '因包含話題匹配 {{detail}} ', 'en': 'because it contained topic match {{detail}} ' },
  // 来源
  'sourceFilterGroupTitle': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'sourceFilterDesc': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'Via' },
  'sourceFilterDetails': { 'zh-cn': '以下来源的微博', 'zh-hk': '以下來源的微博', 'zh-tw': '以下來源的微博', 'en': 'Weibo from these sources' },
  'sourceFilterFast': { 'zh-cn': '来自“{{source}}”的微博', 'zh-hk': '來自「{{source}}」的微博', 'zh-tw': '來自「{{source}}」的微博', 'en': 'Weibo via "{{source}}"' },
  'sourceFilterContextMenuGroup': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'via' },
  'sourceFilterContextMenu': { 'zh-cn': '{{source}}', 'zh-hk': '{{source}}', 'zh-tw': '{{source}}', 'en': '{{source}}' },
  'sourceFilterWarningTitle': { 'zh-cn': '默认来源', 'zh-hk': '預設來源', 'zh-tw': '預設來源', 'en': 'Default Source' },
  'sourceFilterWarning': { 'zh-cn': '不能添加默认来源', 'zh-hk': '不能新增預設來源', 'zh-tw': '不能新增預設來源', 'en': 'You cannot add default source' },
  'sourceFilterReason': { 'zh-cn': '因来自“{{detail}}”', 'zh-hk': '因來自「{{detail}}」', 'zh-tw': '因來自「{{detail}}」', 'en': 'because it is posted via "{{detail}}" ' },
  'sourceUnkown': { 'zh-cn': '未通过审核应用', 'zh-hk': '未通过审核应用', 'zh-tw': '未通过审核应用', 'en': '未通过审核应用' },
  'defaultSource': { 'zh-cn': '微博 weibo.com', 'zh-hk': '微博 weibo.com', 'zh-tw': '微博 weibo.com', 'en': '微博 weibo.com' },
  // 超链接
  'hyperlinkFilterGroupTitle': { 'zh-cn': '链接', 'zh-hk': '連結', 'zh-tw': '連結', 'en': 'Link' },
  'hyperlinkFilterDesc': { 'zh-cn': '超链接', 'zh-hk': '超連結', 'zh-tw': '超連結', 'en': 'Hyperlink' },
  'hyperlinkFilterDetails': { 'zh-cn': '包含指向以下网站的超链接的微博', 'zh-hk': '包含指向以下站點的超連結的微博', 'zh-tw': '包含指向以下站點的超連結的微博', 'en': 'Weibo with hyperlink to these website' },
  'hyperlinkFilterFast': { 'zh-cn': '包含链接到“{{host}}”地址链接的微博', 'zh-hk': '包含鏈接到「{{host}}」位址連結的微博', 'zh-tw': '包含鏈接到「{{host}}」位址連結的微博', 'en': 'Weibo contains hyperlink to "{{host}}"' },
  'hyperlinkFilterContextMenuGroup': { 'zh-cn': '链接到', 'zh-hk': '鏈接到', 'zh-tw': '鏈接到', 'en': 'hyperlink to' },
  'hyperlinkFilterContextMenu': { 'zh-cn': '{{host}}', 'zh-hk': '{{host}}', 'zh-tw': '{{host}}', 'en': '{{host}}' },
  'hyperlinkFilterReason': { 'zh-cn': '因链接到“{{detail}}”', 'zh-hk': '因鏈接到「{{detail}}」', 'zh-tw': '因鏈接到「{{detail}}」', 'en': 'because it contains hyperlink to "{{detail}}" ' },
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
  'fansTopFilterDesc': { 'zh-cn': '粉丝头条', 'zh-hk': '粉丝头条', 'zh-tw': '粉丝头条'/* as is */, 'en': 'Fans top / Headline Weibo' },
  'recommandFeedDesc': { 'zh-cn': '推荐微博', 'zh-hk': '建議微博', 'zh-tw': '建議微博', 'en': 'Recommended Weibo' },
  'fakeWeiboFilterDesc': { 'zh-cn': '混入微博列表的其它内容', 'zh-hk': '混入微博列表的其它內容', 'zh-tw': '混入微博列表的其它內容', 'en': 'Other contents in Weibo list' },
  'deletedForwardFilterDesc': { 'zh-cn': '已删除微博的转发', 'zh-hk': '已刪除微博的轉發', 'zh-tw': '已刪除微博的轉發', 'en': 'Forward of deleted Weibo' },
  'voteWeiboFilterDesc': { 'zh-cn': '投票微博', 'zh-hk': '投票微博', 'zh-tw': '投票微博', 'en': 'Voting weibo' },
  'taobaoTianmaoWeibo': { 'zh-cn': '带有淘宝、天猫或聚划算商品的微博', 'zh-hk': '帶有淘寶、天貓或聚划算商品的微博', 'zh-tw': '帶有淘寶、天貓或聚划算商品的微博', 'en': 'Weibo with Taobao / Tmall / Juhuasuan commodity' },
  'huatiSourceWeibo': { 'zh-cn': '来自微话题的微博', 'zh-hk': '來自微話題的微博', 'zh-tw': '來自微話題的微博', 'en': 'Weibo via 微话题 (micro Topic)' },
  'customizeSourceWeibo': { 'zh-cn': '自定义来源微博|{{<action>}}', 'zh-hk': '自訂來源微博|{{<action>}}', 'zh-tw': '自訂來源微博|{{<action>}}', 'en': 'Weibo with customize source | {{<action>}}' },
  'customizeSourceHidden': { 'zh-cn': '隐藏微博', 'zh-hk': '隱藏微博', 'zh-tw': '隱藏微博', 'en': 'hide Weibo' },
  'customizeSourceReset': { 'zh-cn': '将来源改为“微博 weibo.com”', 'zh-hk': '將來源改為「微博 weibo.com」', 'zh-tw': '將來源改為「微博 weibo.com」', 'en': 'modify source to "微博 weibo.com"' },
  'weiboViaText': { 'zh-cn': '来自', 'zh-hk': '来自', 'zh-tw': '来自', 'en': '来自'/* as is */ },
  // 刷屏与版聊
  'otherSpammingTitle': { 'zh-cn': '刷屏与版聊', 'zh-hk': '洗版與版聊', 'zh-tw': '洗版與版聊', 'en': 'Spamming &amp; Chatting' },
  'sameAccountFilterDesc': { 'zh-cn': '相同作者的微博：|超过{{<number>}}条|时{{<action>}}', 'zh-hk': '相同作者的微博：|超過{{<number>}}條|時{{<action>}}', 'zh-tw': '相同作者的微博：|超過{{<number>}}條|時{{<action>}}', 'en': 'Weibo from same account: |{{<action>}} the part | which exceeds {{<number>}} Weibo' },
  'sameAccountFilterReason': { 'zh-cn': '因刷屏', 'zh-hk': '因洗版', 'zh-tw': '因洗版', 'en': 'because of spamming ' },
  'sameForwardFilterDesc': { 'zh-cn': '相同微博的转发：|超过{{<number>}}条|时{{<action>}}', 'zh-hk': '相同微博的轉發：|超過{{<number>}}條|時{{<action>}}', 'zh-tw': '相同微博的轉發：|超過{{<number>}}條|時{{<action>}}', 'en': 'Forward from same Weibo: |{{<action>}} the part | which exceeds {{<number>}} Weibo' },
  'sameForwardFilterReason': { 'zh-cn': '因版聊', 'zh-hk': '因版聊', 'zh-tw': '因版聊', 'en': 'because of chatting ' },
  // 分组浏览
  'otherGroupTitle': { 'zh-cn': '分组浏览', 'zh-hk': '分組流覽', 'zh-tw': '分組流覽', 'en': 'Browse by Group' },
  'accountByGroup': { 'zh-cn': '分组浏览时禁用按帐号隐藏', 'zh-hk': '分組流覽時禁用按帳號隱藏', 'zh-tw': '分組流覽時禁用按帳號隱藏', 'en': 'Disable hide by account filter when browsing by group' },
  'sameAccountByGroup': { 'zh-cn': '浏览分组时禁用相同作者数量限制', 'zh-hk': '流覽分組時禁用相同作者數量限制', 'zh-tw': '流覽分組時禁用相同作者數量限制', 'en': 'Disable hide too many Weibo from same account filter when browsing by group' },
  // 脚本
  'scriptToolsTitle': { 'zh-cn': '脚本', 'zh-hk': '腳本', 'zh-tw': '腳本', 'en': 'Script' },
  'useFastCreator': { 'zh-cn': '使用拖放快速创建过滤器', 'zh-hk': '使用拖放快速創建篩選器', 'zh-tw': '使用拖放快速創建篩選器', 'en': 'Use drag and drop to create filters' },
  'useContextMenuCreator': { 'zh-cn': '使用右键菜单快速创建过滤器', 'zh-hk': '使用右鍵功能表快速創建篩選器', 'zh-tw': '使用右鍵功能表快速創建篩選器', 'en': 'Use right-click menu to create filters' },
  'blockHiddenWeiboDesc': { 'zh-cn': '告知服务器被隐藏的微博以避免再次加载', 'zh-hk': '告知伺服器被隱藏的微博以避免再次載入', 'zh-tw': '告知伺服器被隱藏的微博以避免再次載入', 'en': 'Send blocked Weibo to server to avoid reloading' },
  // 自动载入
  'autoLoadNewWeiboTitle': { 'zh-cn': '自动载入新微博', 'zh-hk': '自動載入新微博', 'zh-tw': '自動載入新微博', 'en': 'New Weibo Auto Load' },
  'autoLoadNewWeibo': { 'zh-cn': '自动载入新微博', 'zh-hk': '自動載入新微博', 'zh-tw': '自動載入新微博', 'en': 'New Weibo Auto Load' },
  // 分隔条
  'timeTipHour': { 'zh-cn': '小时', 'zh-hk': '小時', 'zh-tw': '小時', 'en': ' hour' },
  'timeTipMin': { 'zh-cn': '分钟', 'zh-hk': '分鐘', 'zh-tw': '分鐘', 'en': ' min' },
  'timeTipText': { 'zh-cn': '前，你看到这里', 'zh-hk': '前，你看到這裡', 'zh-tw': '前，你看到這裡', 'en': ' ago, you see here' /* as is */ },
  '~v6~timeTipText': { 'zh-cn': '你看到这里', 'zh-hk': '你看到這裡', 'zh-tw': '你看到這裡', 'en': ' 你看到这里' /* as is */ },
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
    'zh-cn': '载入新微博后显示桌面提示||{{<types>}}仅对白名单的微博显示桌面提示||{{<shorten>}}桌面提示仅显示|前{{<shortlen>}}字符摘要信息||{{<autohide>}}桌面提醒延时自动关闭|显示{{<duration>}}毫秒|＋字数×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'zh-hk': '载入新微博后顯示桌面提示||{{<types>}}僅對白名單的微博顯示桌面提示||{{<shorten>}}桌面提示僅顯示|前{{<shortlen>}}字元摘要資訊||{{<autohide>}}桌面提醒延時自動關閉|顯示{{<duration>}}毫秒|＋字數×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'zh-tw': '载入新微博后顯示桌面提示||{{<types>}}僅對白名單的微博顯示桌面提示||{{<shorten>}}桌面提示僅顯示|前{{<shortlen>}}字元摘要資訊||{{<autohide>}}桌面提醒延時自動關閉|顯示{{<duration>}}毫秒|＋字數×{{<durationc>}}毫秒||{{<ntypes>}}使用 webkitNotifications 而非 Notification',
    'en': 'Show desktop notification after auto load | {{<types>}} Only show desktop notification for whitelist Weibo || {{<shorten>}} Desktop notification only show | first {{<shortlen>}} charactors Weibo content || {{<autohide>}} auto hide desktop notification after | {{<duration>}}ms | + {{<durationc>}}ms/char || {{<ntypes>}} Use webkitNotifications instead of Notification',
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
  // 标识图标
  'layoutHideIcon': { 'zh-cn': '隐藏模块 - 标识/图标', 'zh-hk': '隱藏模組 - 標誌/圖示', 'zh-tw': '隱藏模組 - 標誌/圖示', 'en': 'Hide modules - Logo / Icon' },
  'layoutHideIconLevel': { 'zh-cn': '等级', 'zh-hk': 'Level', 'zh-tw': '等級', 'en': 'Level' },
  'layoutHideIconMember': { 'zh-cn': '微博会员', 'zh-hk': '微博會員', 'zh-tw': '微博會員', 'en': 'Weibo VIP / Member' },
  'layoutHideIconApprove': { 'zh-cn': '个人认证', 'zh-hk': '個人認證', 'zh-tw': '個人認證', 'en': 'Personal Authentication / 個人認證' },
  'layoutHideIconApproveCo': { 'zh-cn': '机构认证', 'zh-hk': '企業認證', 'zh-tw': '企業認證', 'en': 'Weibo Verification / 企業認證' },
  'layoutHideIconApproveDead': { 'zh-cn': '失效认证', 'zh-hk': '失效認證', 'zh-tw': '失效認證', 'en': 'Failed verification' },
  'layoutHideIconClub': { 'zh-cn': '微博达人', 'zh-hk': '微博達人', 'zh-tw': '微博達人', 'en': 'Pioneer' },
  'layoutHideIconVGirl': { 'zh-cn': '微博女郎', 'zh-hk': '微博女郎', 'zh-tw': '微博女郎', 'en': 'Weibo girl' },
  'layoutHideIconTaobao': { 'zh-cn': '淘宝/天猫商户', 'zh-hk': '淘寶/天貓商戶', 'zh-tw': '淘寶/天貓商戶', 'en': 'Taobao / Tmall Merchant' },
  'layoutHideIconGongyi': { 'zh-cn': '益起来', 'zh-hk': '益起来', 'zh-tw': '益起来'/* as is */, 'en': '益起来 (Weibo public interest)' },
  'layoutHideIconZongyika': { 'zh-cn': '我是综艺咖', 'zh-hk': '我是综艺咖'/* as is */, 'zh-tw': '我是综艺咖', 'en': '我是综艺咖 (Variety Wack)' },
  'layoutHideIconYouji': { 'zh-cn': '邂逅有机', 'zh-hk': '邂逅有机'/* as is */, 'zh-tw': '邂逅有机', 'en': '邂逅有机 (Travel Notes)' },
  'layoutHideIconDouble11': { 'zh-cn': '我的双11', 'zh-hk': '我的双11'/* as is */, 'zh-tw': '我的双11', 'en': '我的双11 (My Nov. 11<sup>th</sup>)' },
  // 导航栏
  'layoutHideNav': { 'zh-cn': '隐藏模块 - 导航栏', 'zh-hk': '隱藏模組 - 導覽列', 'zh-tw': '隱藏模組 - 導覽列', 'en': 'Hide modules - Navigation Bar' },
  'layoutHideNavLogoImg': { 'zh-cn': '节日徽标', 'zh-hk': '節日徽標', 'zh-tw': '節日徽標', 'en': 'Holiday logo' },
  'layoutHideNavMain': { 'zh-cn': '首页', 'zh-hk': '首頁', 'zh-tw': '首頁', 'en': 'Home' },
  'layoutHideNavHot': { 'zh-cn': '热门/发现', 'zh-hk': '熱門/发现', 'zh-tw': '熱門/发现', 'en': 'Hot/发现' },
  'layoutHideNavApp': { 'zh-cn': '应用', 'zh-hk': '應用', 'zh-tw': '應用', 'en': 'Apps' },
  'layoutHideNavGame': { 'zh-cn': '游戏', 'zh-hk': '遊戲', 'zh-tw': '遊戲', 'en': 'Game' },
  'layoutHideNavNoticeNew': { 'zh-cn': '新消息提示', 'zh-hk': '新消息提示', 'zh-tw': '新消息提示', 'en': 'Tips for new notice' },
  'layoutHideNavMember': { 'zh-cn': '会员菜单', 'zh-hk': '會員功能表', 'zh-tw': '會員功能表', 'en': 'VIP menu' },
  // 左栏
  'layoutHideLeft': { 'zh-cn': '隐藏模块 - 左栏', 'zh-hk': '隱藏模組 - 左欄', 'zh-tw': '隱藏模組 - 左欄', 'en': 'Hide modules - Left Column' },
  'layoutHideLeftToMe': { 'zh-cn': '发给我的', 'zh-hk': '發給我的', 'zh-tw': '發給我的', 'en': 'Send to me' },
  'layoutHideLeftFriends': { 'zh-cn': '好友圈', 'zh-hk': '好友圈', 'zh-tw': '好友圈', 'en': 'Friends' },
  'layoutHideLeftApp': { 'zh-cn': '应用', 'zh-hk': '应用', 'zh-tw': '应用'/* as is */, 'en': 'Apps' },
  'layoutHideLeftNew': { 'zh-cn': '新微博提示红点', 'zh-hk': '新微博提示紅點', 'zh-tw': '新微博提示紅點', 'en': 'Red dot for new Weibo' },
  'layoutHideLeftNews': { 'zh-cn': '新消息计数', 'zh-hk': '新消息計數', 'zh-tw': '新消息計數', 'en': 'Counts for News' },
  'layoutHideLeftCount': { 'zh-cn': '新分组微博计数', 'zh-hk': '新分組微博計數', 'zh-tw': '新分組微博計數', 'en': 'Counts for Weibo by Group' },
  // 中栏
  'layoutHideMiddle': { 'zh-cn': '隐藏模块 - 中栏', 'zh-hk': '隱藏模組 - 中欄', 'zh-tw': '隱藏模組 - 中欄', 'en': 'Hide modules - Middle Column' },
  'layoutHideMiddleRecommendedTopic': { 'zh-cn': '热门微博（发布框上方）', 'zh-hk': '热门微博（發布框上方）', 'zh-tw': '热门微博（發布框上方）'/* as is */, 'en': '热门微博 (Hot Weibo), on top of publishing field' },
  'layoutHideMiddleFeedRecommand': { 'zh-cn': '微博兴趣推荐（顶部）', 'zh-hk': '微博興趣推薦（頂部）', 'zh-tw': '微博興趣推薦（頂部）', 'en': 'Feed Recommendation, top' },
  'layoutHideMiddleMemberTip': { 'zh-cn': '开通会员提示（底部）', 'zh-hk': '開通會員提示（底部）', 'zh-tw': '開通會員提示（底部）', 'en': 'Tip of Joining Weibo VIP, bottom' },
  // 右栏
  'layoutHideRight': { 'zh-cn': '隐藏模块 - 右栏', 'zh-hk': '隱藏模組 - 右欄', 'zh-tw': '隱藏模組 - 右欄', 'en': 'Hide modules - Right Column' },
  'layoutHideRightTemplate': { 'zh-cn': '设置模板', 'zh-hk': '背景設定', 'zh-tw': '背景設定', 'en': 'Template Settings' },
  'layoutHideRightInfo': { 'zh-cn': '头像', 'zh-hk': '頭像', 'zh-tw': '頭像', 'en': 'Avatar' },
  'layoutHideRightV6UpdateV6': { 'zh-cn': '新版微博介绍 (v6)', 'zh-hk': '新版微博介绍 (v6)', 'zh-tw': '新版微博介绍 (v6)'/* as is */, 'en': '新版微博介绍 (v6, Introduce to Weibo v6)' },
  'layoutHideRightV5UpdateV6': { 'zh-cn': '升级新版微博 (v5)', 'zh-hk': '升级新版微博 (v5)', 'zh-tw': '升级新版微博 (v5)'/* as is */, 'en': '升级新版微博 (v5, Update to Weibo v6)' },
  'layoutHideRightTrial': { 'zh-cn': '登录赢会员', 'zh-hk': '登录赢会员', 'zh-tw': '登录赢会员'/* as is */, 'en': '登录赢会员 (Login for VIP Trial)' },
  'layoutHideRightAtten': { 'zh-cn': '关注/粉丝/微博数', 'zh-hk': '關注/粉絲/微博數', 'zh-tw': '關注/粉絲/微博數', 'en': 'Numbers of Following/Followers/Weibo' },
  'layoutHideRightGroups': { 'zh-cn': '分组成员列表', 'zh-hk': '分組成員列表', 'zh-tw': '分組成員列表', 'en': 'Members of group' },
  'layoutHideRightInterest': { 'zh-cn': '可能感兴趣的人', 'zh-hk': '可能感興趣的人', 'zh-tw': '可能感興趣的人', 'en': 'You may know' },
  'layoutHideRightHotTopic': { 'zh-cn': '热门话题', 'zh-hk': '熱門話題', 'zh-tw': '熱門話題', 'en': 'Hot Topic' },
  'layoutHideRightMember': { 'zh-cn': '会员专区', 'zh-hk': '會員專區', 'zh-tw': '會員專區', 'en': 'Weibo VIP' },
  'layoutHideRightWeibo': { 'zh-cn': '热门微博', 'zh-hk': '熱門微博', 'zh-tw': '熱門微博', 'en': 'Hot Weibo' },
  'layoutHideRightLocation': { 'zh-cn': '地点推荐', 'zh-hk': '地點推薦', 'zh-tw': '地點推薦', 'en': 'Location' },
  'layoutHideRightMusic': { 'zh-cn': '热门歌曲', 'zh-hk': '熱門歌曲', 'zh-tw': '熱門歌曲', 'en': 'Hot Music' },
  'layoutHideRightMovie': { 'zh-cn': '最新电影', 'zh-hk': '最新電影', 'zh-tw': '最新電影', 'en': 'Hot Movie' },
  'layoutHideRightBook': { 'zh-cn': '人气图书', 'zh-hk': '人氣圖書', 'zh-tw': '人氣圖書', 'en': 'Hot Book' },
  'layoutHideRightNotice': { 'zh-cn': '公告栏', 'zh-hk': '公告欄', 'zh-tw': '公告欄', 'en': 'Bulletin Board' },
  // 微博内
  'layoutHideWeibo': { 'zh-cn': '隐藏模块 - 微博内', 'zh-hk': '隱藏模組 - 微博內', 'zh-tw': '隱藏模組 - 微博內', 'en': 'Hide modules - In Weibo' },
  'layoutHideWeiboRecomFeed': { 'zh-cn': '精彩微博推荐', 'zh-hk': '精彩微博推薦', 'zh-tw': '精彩微博推薦', 'en': '精彩微博推荐 (Weibo you may interested in)' },
  'layoutHideWeiboTopicCard': { 'zh-cn': '话题卡片', 'zh-hk': '話題卡片', 'zh-tw': '話題卡片', 'en': 'Topic Cards' },
  'layoutHideWeiboFeedTip': { 'zh-cn': '评论框提示横幅', 'zh-hk': '評論框提示橫幅', 'zh-tw': '評論框提示橫幅', 'en': 'Tips for Comment' },
  'layoutHideWeiboGroupTip': { 'zh-cn': '分组未读提示', 'zh-hk': '分組未讀提示', 'zh-tw': '分組未讀提示', 'en': 'Group unread tip' },
  'layoutHideWeiboLastPic': { 'zh-cn': '图片列表封底', 'zh-hk': '圖片清單封底', 'zh-tw': '圖片清單封底', 'en': 'Back cover of picture list' },
  'layoutHideWeiboTopComment': { 'zh-cn': '热门评论', 'zh-hk': '热门评论', 'zh-tw': '热门评论'/* as is */, 'en': 'Top comments' },
  'layoutHideWeiboSonTitle': { 'zh-cn': '同源转发合并提示', 'zh-hk': '同源转发合并提示', 'zh-tw': '同源转发合并提示', 'en': '同源转发合并 (Merge forwards from same origin)' },
  'layoutHideWeiboLocationCard': { 'zh-cn': '位置卡片', 'zh-hk': '位置卡片', 'zh-tw': '位置卡片', 'en': 'Location Cards' },
  'layoutHideWeiboSource': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'layoutHideWeiboAppCard': { 'zh-cn': '来源卡片', 'zh-hk': '來源卡片', 'zh-tw': '來源卡片', 'en': 'Source card' },
  'layoutHideWeiboReport': { 'zh-cn': '举报', 'zh-hk': '檢舉', 'zh-tw': '檢舉', 'en': 'Report' },
  'layoutHideWeiboPop': { 'zh-cn': '推广', 'zh-hk': '推廣', 'zh-tw': '推廣', 'en': ' Promote' },
  'layoutHideWeiboLike': { 'zh-cn': '赞', 'zh-hk': '讚', 'zh-tw': '讚', 'en': 'Like' },
  'layoutHideWeiboForward': { 'zh-cn': '转发', 'zh-hk': '轉發', 'zh-tw': '轉發', 'en': 'Forward' },
  'layoutHideWeiboFavourite': { 'zh-cn': '收藏', 'zh-hk': '收藏', 'zh-tw': '收藏', 'en': 'Favourite' },
  'layoutHideWeiboBlockBySource': { 'zh-cn': '屏蔽来源', 'zh-hk': '屏蔽來源', 'zh-tw': '屏蔽來源', 'en': 'Block Source' },
  'layoutHideWeiboBlockByKeyword': { 'zh-cn': '屏蔽关键词', 'zh-hk': '屏蔽關鍵詞', 'zh-tw': '屏蔽關鍵詞', 'en': 'Block Keywords' },
  // 微博按钮
  'layoutReorderTitle': { 'zh-cn': '重新排列微博控制按钮 (v6)', 'zh-hk': '重新排列微博控制按鈕 (v6)', 'zh-tw': '重新排列微博控制按鈕 (v6)', 'en': 'Reorder Weibo control buttons (v6)' },
  'layoutReorderDesc': { 'zh-cn': '{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}', 'zh-hk': '{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}', 'zh-tw': '{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}', 'en': '{{<1>}}|{{<2>}}|{{<3>}}|{{<4>}}|{{<5>}}' },
  'layoutReorderPop': { 'zh-cn': '推广', 'zh-hk': '推廣', 'zh-tw': '推廣', 'en': ' Promote' },
  'layoutReorderFavorite': { 'zh-cn': '收藏', 'zh-hk': '收藏', 'zh-tw': '收藏', 'en': 'Favourite' },
  'layoutReorderForward': { 'zh-cn': '转发', 'zh-hk': '轉發', 'zh-tw': '轉發', 'en': 'Forward' },
  'layoutReorderComment': { 'zh-cn': '评论', 'zh-hk': '評論', 'zh-tw': '評論', 'en': 'Comment' },
  'layoutReorderLike': { 'zh-cn': '赞', 'zh-hk': '讚', 'zh-tw': '讚', 'en': 'Like' },
  // 个人主页
  'layoutHidePerson': { 'zh-cn': '隐藏模块 - 个人主页', 'zh-hk': '隱藏模組 - 個人主頁', 'zh-tw': '隱藏模組 - 個人主頁', 'en': 'Hide modules - Personal home page' },
  'layoutHidePersonMoveThings': { 'zh-cn': '移动部件（会员模板）', 'zh-hk': '移動部件（會員模板）', 'zh-tw': '移動部件（會員模板）', 'en': 'Moving Things (VIP Template)' },
  'layoutHidePersonCover': { 'zh-cn': '封面图 (v5)', 'zh-hk': '封面圖 (v5)', 'zh-tw': '封面圖 (v5)', 'en': 'Cover Picture (v5)' },
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
  // 个人主页边栏模块
  'layoutHidePLeft': { 'zh-cn': '隐藏模块 - 个人主页边栏 (v6)', 'zh-hk': '隱藏模組 - 個人主頁邊欄 (v6)', 'zh-tw': '隱藏模組 - 個人主頁邊欄 (v6)', 'en': 'Hide modules - Side column of personal homepage (v6)' },
  'layoutHidePLeftDesc': { 'zh-cn': '隐藏个人主页边栏中以下标题的模块<br />模块', 'zh-hk': '隱藏個人主頁邊欄中以下標題的模組<br />模組', 'zh-tw': '隱藏個人主頁邊欄中以下標題的模組<br />模組', 'en': 'Hide modules on personal homepage with these titles<br />Modules' },
  // 消息页面
  'layoutHideMessages': { 'zh-cn': '隐藏模块 - 消息页面', 'zh-hk': '隱藏模組 - 消息網頁', 'zh-tw': '隱藏模組 - 消息網頁', 'en': 'Hide modules - News page' },
  'layoutHideMessagesHelp': { 'zh-cn': '使用小帮助', 'zh-hk': '使用小幫助', 'zh-tw': '使用小幫助', 'en': 'Tips' },
  'layoutHideMessagesFeedback': { 'zh-cn': '微博意见反馈', 'zh-hk': '微博意见反馈', 'zh-tw': '微博意见反馈'/* as is */, 'en': 'Feed Back'/* as is */ },
  'layoutHideMessagesDesktop': { 'zh-cn': '微博桌面 (v5)', 'zh-hk': '微博桌面 (v5)', 'zh-tw': '微博桌面 (v5)', 'en': 'Weibo desktop (v5)' },
  'layoutHideMessagesCommentTop': { 'zh-cn': '热评微博 (v5)', 'zh-hk': '熱評微博 (v5)', 'zh-tw': '熱評微博 (v5)', 'en': 'Popular Weibo (v5)' },
  'layoutHideMessagesReport': { 'zh-cn': '微博举报处理中心 (v5)', 'zh-hk': '微博舉報處理中心 (v5)', 'zh-tw': '微博檢舉處理中心 (v5)', 'en': 'Report (v5)' },
  'layoutHideMessagesYoudao': { 'zh-cn': '导出收藏夹 (v5)', 'zh-hk': '导出收藏夹 (v5)', 'zh-tw': '导出收藏夹 (v5)', 'en': 'Export favorites (v5)' },
  // 添加好友
  'layoutHideAttention': { 'zh-cn': '隐藏模块 - 添加关注 (v5)', 'zh-hk': '隱藏模組 - 添加關注 (v5)', 'zh-tw': '隱藏模組 - 添加關注 (v5)', 'en': 'Hide modules - Add following (v5)' },
  'layoutHideAttentionSuccess': { 'zh-cn': '关注成功对话框', 'zh-hk': '關注成功對話方塊', 'zh-tw': '關注成功對話方塊', 'en': 'Dialog for adding following success' },
  'layoutHideAttentionRecommend': { 'zh-cn': '公开推荐分组', 'zh-hk': '公开推荐的分组', 'zh-tw': '公开推荐的分组'/* as is */, 'en': '公开推荐的分组 (Public Recommend Group)' },
  // 杂项
  'layoutHideOther': { 'zh-cn': '隐藏模块 - 杂项', 'zh-hk': '隱藏模組 - 雜項', 'zh-tw': '隱藏模組 - 雜項', 'en': 'Hide modules - Others' },
  'layoutHideOtherAds': { 'zh-cn': '广告', 'zh-hk': '廣告', 'zh-tw': '廣告', 'en': 'Advertisement' },
  'layoutHideOtherHomeTip': { 'zh-cn': '顶部提示横幅', 'zh-hk': '頂部提示橫幅', 'zh-tw': '頂部提示橫幅', 'en': 'Top tips banner' },
  'layoutHideOtherFeedRecom': { 'zh-cn': '相关微博推荐', 'zh-hk': '相关推荐', 'zh-tw': '相关推荐', 'en': '相关推荐 (Related Weibo Suggestion)' },
  'layoutHideOtherFooter': { 'zh-cn': '页面底部', 'zh-hk': '頁面底部', 'zh-tw': '頁面底部', 'en': 'Footer' },
  'layoutHideOtherWbIm': { 'zh-cn': '微博桌面推荐（右下）', 'zh-hk': '微博桌面推薦（右下）', 'zh-tw': '微博桌面推薦（右下）', 'en': '微博桌面2014 (Desktop Weibo), bottom right' },
  'layoutHideOtherTip': { 'zh-cn': '功能提示框', 'zh-hk': '功能提示框', 'zh-tw': '功能提示框', 'en': 'Function Tips' },
  'layoutHideOtherMusic': { 'zh-cn': '微音乐 (v6)', 'zh-hk': '微音乐 (v6)', 'zh-tw': '微音乐 (v6)'/* as is */, 'en': '微音乐 (v6, Weibo Music)' },
  'layoutHideOtherIM': { 'zh-cn': '聊天联系人列表', 'zh-hk': '聊天連絡人列表', 'zh-tw': '聊天連絡人列表', 'en': 'IM Side bar' },
  'layoutHideOtherRelatedWB': { 'zh-cn': '相关微博推荐 (v6)', 'zh-hk': '相关微博推荐 (v6)', 'zh-tw': '相关微博推荐 (v6)', 'en': '相关微博推荐 (v6, Suggested related weibo)' },
  'layoutHideOtherUpgradeV6': { 'zh-cn': '强制升级 v6 弹层 (v5)', 'zh-hk': '強制升級 v6 彈層 (v5)', 'zh-tw': '強制升級 v6 彈層 (v5)', 'en': 'Popup for force upgrade to v6 (v5)' },
  // 工具
  'toolFilterGroupTitle': { 'zh-cn': '工具', 'zh-hk': '工具', 'zh-tw': '工具', 'en': 'Tool' },
  // 边栏
  'sideColumnToolsTitle': { 'zh-cn': '边栏', 'zh-hk': '邊欄', 'zh-tw': '邊欄', 'en': 'Side Column' },
  'showAllGroupDesc': { 'zh-cn': '展开左栏分组 (v5)', 'zh-hk': '展開左欄分組 (v5)', 'zh-tw': '展開左欄分組 (v5)', 'en': 'Unfold groups in left column (v5)' },
  'showAllMsgNavDesc': { 'zh-cn': '展开左栏消息 (v5)', 'zh-hk': '展開左欄消息 (v5)', 'zh-tw': '展開左欄消息 (v5)', 'en': 'Unfold news in left column (v5)' },
  'mergeLeftRight': { 'zh-cn': '合并左右边栏|到{{<side>}}', 'zh-hk': '合併左右邊欄|到{{<side>}}', 'zh-tw': '合併左右邊欄|到{{<side>}}', 'en': 'Merge left &amp; right column | to {{<side>}}' },
  'mergeLeftRightLeft': { 'zh-cn': '左侧', 'zh-hk': '左側', 'zh-tw': '左側', 'en': 'left side' },
  'mergeLeftRightRight': { 'zh-cn': '右侧', 'zh-hk': '右側', 'zh-tw': '右側', 'en': 'right side' },
  'fixedLeft': { 'zh-cn': '浮动左边栏|{{<items>}}', 'zh-hk': '浮動左邊欄|{{<items>}}', 'zh-tw': '浮動左邊欄|{{<items>}}', 'en': 'Float left column | {{<items>}}' },
  'fixedLeftDefault': { 'zh-cn': '默认元素 (v5)', 'zh-hk': '預設元素 (v5)', 'zh-tw': '預設元素 (v5)', 'en': 'default elements (v5)' },
  'fixedLeftWhole': { 'zh-cn': '整个左栏 (v5)', 'zh-hk': '整個左欄 (v5)', 'zh-tw': '整個左欄 (v5)', 'en': 'whole column (v5)' },
  'filteRightTopic': { 'zh-cn': '应用话题黑名单到右栏热门话题', 'zh-hk': '應用話題黑名單到右欄熱門話題', 'zh-tw': '應用話題黑名單到右欄熱門話題', 'en': 'Apply topic blacklist to Hot Topic in right column' },
  'filteRightTopicCount': { 'zh-cn': '热门话题列表隐藏|阅读数少于{{<number>}}万的话题', 'zh-hk': '熱門話題清單隱藏|閱讀數少於{{<number>}}萬的話題', 'zh-tw': '熱門話題清單隱藏|閱讀數少於{{<number>}}萬的話題', 'en': 'Hidden Hot Topic with | less than {{<number>}}万 reading' },
  // 微博
  'weiboToolsTitle': { 'zh-cn': '微博', 'zh-hk': '微博', 'zh-tw': '微博', 'en': 'Weibo' },
  'clearDefTopicDesc': { 'zh-cn': '清除发布框中的默认话题', 'zh-hk': '清除發布框中的預設話題', 'zh-tw': '清除發布框中的預設話題', 'en': 'Remove default topic in Publisher' },
  'publishToPublicDefault': { 'zh-cn': '分组浏览时默认发布公开微博', 'zh-hk': '分組流覽時默認發佈公開微博', 'zh-tw': '分組流覽時默認發佈公開微博', 'en': 'Publish to public by default when browsing by group' },
  'publishToPublicText': { 'zh-cn': '公开', 'zh-hk': '公開', 'zh-tw': '公開', 'en': 'Public' },
  'unwrapTextDesc': { 'zh-cn': '微博作者和正文同行', 'zh-hk': '微博作者和正文同行', 'zh-tw': '微博作者和正文同行', 'en': 'No line break after author' },
  'personalRedirectWeibo': { 'zh-cn': '访问帐号主页显示微博页面 (v5)', 'zh-hk': '訪問帳號主頁顯示微博頁面 (v5)', 'zh-tw': '訪問帳號主頁顯示微博頁面 (v5)', 'en': 'Show Weibo page instead of personal main page by default (v5)' },
  'viewOriginalDesc': { 'zh-cn': '添加“查看原图”链接', 'zh-hk': '添加「查看原圖」連結', 'zh-tw': '添加「查看原圖」連結', 'en': 'add "Original Picture" link' },
  'viewOriginalText': { 'zh-cn': '查看原图', 'zh-hk': '查看原圖', 'zh-tw': '查看原圖', 'en': 'Original Picture' },
  'expandShortenedLink': { 'zh-cn': '自动展开新浪 t.cn 短网址', 'zh-hk': '自動展開新浪 t.cn 短網址', 'zh-tw': '自動展開新浪 t.cn 短網址', 'en': 'Auto expand Sina shortened URL (t.cn)' },
  'newWeiboNotify': { 'zh-cn': '有 {{count}} 条新微博，点击查看', 'zh-hk': '有 {{count}} 條新微博，點擊查看', 'zh-tw': '有 {{count}} 條新微博，點擊查看', 'en': 'You have {{count}} new Weibo，click to view', },
  'UncheckRecomJoin': { 'zh-cn': '取消勾选建议加到该组', 'zh-hk': '取消勾選建议加到该组', 'zh-tw': '取消勾選建议加到该组'/* as is */, 'en': 'Uncheck recommed adding to group' },
  // 样式
  'styleToolsTitle': { 'zh-cn': '外观', 'zh-hk': '外觀', 'zh-tw': '外觀', 'en': 'Appearance' },
  'weiboLargeFont': { 'zh-cn': '增大微博正文字号为|原大小的{{<ratio>}} (v6)', 'zh-hk': '增大微博正文字型大小為|原大小的{{<ratio>}} (v6)', 'zh-tw': '', 'en': 'Increase font size of Weibo content to | {{<ratio>}} (v6)' },
  'weiboLargeFont120': { 'zh-cn': '120%', 'zh-hk': '120%', 'zh-tw': '120%', 'en': '120%' },
  'weiboLargeFont150': { 'zh-cn': '150%', 'zh-hk': '150%', 'zh-tw': '150%', 'en': '150%' },
  'weiboLargeFont200': { 'zh-cn': '200%', 'zh-hk': '200%', 'zh-tw': '200%', 'en': '200%' },
  'hoverShowFold': { 'zh-cn': '鼠标指向被折叠微博时显示内容', 'zh-hk': '滑鼠指向被折疊微博時顯示內容', 'zh-tw': '滑鼠指向被折疊微博時顯示內容', 'en': 'Show folded Weibo when mouse over' },
  'whitelistHighlightDesc': { 'zh-cn': '高亮显示白名单的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '高亮顯示白名單的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '高亮顯示白名單的微博|背景色{{<color>}}|透明度{{<transparency>}}%', 'en': 'Highlight Weibo in whitelist with | background color {{<color>}} | transparency {{<transparency>}}%' },
  'mainBackgroundColorOverride': { 'zh-cn': '首页背景|颜色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '首頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '首頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'en': 'Background color for home page | {{<color>}} | transparency {{<transparency>}}%' },
  'profileBackgroundColorOverride': { 'zh-cn': '个人主页背景|颜色{{<color>}}|透明度{{<transparency>}}%', 'zh-hk': '個人主頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'zh-tw': '個人主頁背景|色彩{{<color>}}|透明度{{<transparency>}}%', 'en': 'Background color for personal home page | {{<color>}} | transparency {{<transparency>}}%' },
  'weiboOnly': {
    'zh-cn': '阅读视图|宽度{{<width>}}px|快捷键{{<key>}}||{{<usebgc>}}使用指定背景色 (v5)|{{<color>}}|透明度{{<transparency>}}%||{{<switch>}}在微博列表顶部显示快捷开关按钮',
    'zh-hk': '閱讀視圖|寬度{{<width>}}px|快速鍵{{<key>}}||{{<usebgc>}}使用指定背景色 (v5)|{{<color>}}|透明度{{<transparency>}}%||{{<switch>}}在微博清單頂部顯示快速開關按鈕',
    'zh-tw': '閱讀視圖|寬度{{<width>}}px|快速鍵{{<key>}}||{{<usebgc>}}使用指定背景色 (v5)|{{<color>}}|透明度{{<transparency>}}%||{{<switch>}}在微博清單頂部顯示快速開關按鈕',
    'en': 'Reading View | width {{<width>}}px | shortcut {{<key>}} || {{<usebgc>}} override background color (v5) | with {{<color>}} | transparency {{<transparency>}} || {{<switch>}} show switch button at top of Weibo list'
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
  // 全选该分组
  'configSelectAll': { 'zh-cn': '全选本组', 'zh-hk': '全選本組', 'zh-tw': '全選本組', 'en': 'Select Group' },
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
  // 更新
  'updateInfoTitle': { 'zh-cn': '更新', 'zh-hk': '更新', 'zh-tw': '更新', 'en': 'Update' },
  'updateInfoDescription': { 'zh-cn': '更新后显示新功能提示', 'zh-hk': '更新後顯示新功能提示', 'zh-tw': '更新後顯示新功能提示', 'en': 'Show new features after update' },
  'installSuccessTitle': { 'zh-cn': 'YAWF 安装成功', 'zh-hk': '安裝成功', 'zh-tw': '安裝成功', 'en': 'Installation successed' },
  'installSuccessText': {
    'zh-cn': '感谢您安装 YAWF 脚本。您可以点击右上角的漏斗图标打开过滤器设置。此外您还可以选中并拖拽关键字、帐号、话题、来源等内容到网页右上角，快速创建过滤器。',
    'zh-hk': '感謝您安裝 YAWF 腳本。您可以點擊右上角的漏斗圖示打開過濾器設置。此外您還可以選中並拖拽關鍵字、帳號、話題、來源等內容到網頁右上角，快速創建過濾器。',
    'zh-tw': '感謝您安裝 YAWF 腳本。您可以點擊右上角的漏斗圖示打開過濾器設置。此外您還可以選中並拖拽關鍵字、帳號、話題、來源等內容到網頁右上角，快速創建過濾器。',
    'en': 'Thank you for installing YAWF. You can click on the funnel icon at the top-right corner to open up filter setting menu. You may also quickly create filters by dragging and dropping keywords, accounts, topics and sources to the top-right corner.'
  },
  'updateSuccessTitle': { 'zh-cn': 'Yet Another Weibo Filter 新功能提示', 'zh-hk': 'Yet Another Weibo Filter 新功能提示', 'zh-tw': 'Yet Another Weibo Filter 新功能提示', 'en': 'Yet Another Weibo Filter new features notification' },
  'updateSuccessHeader': { 'zh-cn': '您的 YAWF 脚本已更新', 'zh-hk': '您的 YAWF 腳本已更新', 'zh-tw': '您的 YAWF 腳本已更新', 'en': 'Your YAWF script has been updated' },
  'updateSuccessDesc': { 'zh-cn': '当前版本添加或更新了以下{{count}}项功能', 'zh-hk': '當前版本添加或更新了以下{{count}}項功能', 'zh-tw': '當前版本添加或更新了以下{{count}}項功能', 'en': 'The current version has added or updated the following {{count}} feature(s)' },
  // 调试
  'scriptDebugTitle': { 'zh-cn': '调试', 'zh-hk': '偵錯', 'zh-tw': '偵錯', 'en': 'Debug' },
  'scriptDebug': { 'zh-cn': '在控制台打印调试信息', 'zh-hk': '將偵錯訊息列印到主控台', 'zh-tw': '將偵錯訊息列印到主控台', 'en': 'Print debug info to console' },
  // 关于
  'scriptAboutTitle': { 'zh-cn': '关于', 'zh-hk': '關於', 'zh-tw': '關於', 'en': 'About' },
  'scriptAbout': {
    'zh-cn': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF 使用 MIT 协议授权。您可以访问<a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">脚本主页</a>获取详细信息。<br />如果您在使用过程中遇到任何脚本的错误，或对脚本有任何建议，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">反馈页面</a>提供报告，或直接<a target="_blank" href="http://weibo.com/tsh90" rel="noreferrer">私信作者</a>；反馈前建议先阅读<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常见问题</a>。</p><p>本脚本参考并使用了<a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer">眼不见心不烦</a>脚本的部分代码。</p>',
    'zh-hk': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF 使用 MIT 協定授權。您可以訪問<a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">腳本主頁</a>獲取詳細資訊。<br />如果您在使用過程中遇到任何腳本的錯誤，或對腳本有任何建議，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">回饋頁面</a>提供報告，或直接<a target="_blank" href="http://weibo.com/tsh90" rel="noreferrer">私信作者</a>；回饋前建議先閱讀<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常見問題（簡體）</a>。</p><p>本腳本參考並使用了<a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer">眼不見心不煩</a>腳本的部分原始碼。</p>',
    'zh-tw': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF 使用 MIT 協定授權。您可以訪問<a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">腳本主頁</a>獲取詳細資訊。<br />如果您在使用過程中遇到任何腳本的錯誤，或對腳本有任何建議，您可以到<a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">回饋頁面</a>提供報告，或直接<a target="_blank" href="http://weibo.com/tsh90" rel="noreferrer">私信作者</a>；回饋前建議先閱讀<a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">常見問題（簡體）</a>。</p><p>本腳本參考並使用了<a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer">眼不見心不煩</a>腳本的部分原始碼。</p>',
    'en': '<p>Yet Another Weibo Filter (YAWF) {{version}}</p><p>YAWF is under the MIT License. You may want to visit <a target="_blank" href="https://tiansh.github.io/yawf/" rel="noreferrer">project homepage</a> for more information.<br />If you find any bugs or have feature request, please report them in the <a target="_blank" href="https://tiansh.github.io/yawf/issues.html" rel="noreferrer">feedback page</a>, or <a target="_blank" href="http://weibo.com/tsh90" rel="noreferrer">send message to author</a>. Please read <a target="_blank" href="https://tiansh.github.io/yawf/fqa.html" rel="noreferrer">FQA (Chinese)</a> page for common questions.</p><p>Some codes of this script come from <a target="_blank" href="https://code.google.com/p/weibo-content-filter/" rel="noreferrer"><span lang="zh-cn">眼不见心不烦</span> (Weibo Content Filter)</a> script.</p>',
  },
  // 拖拽
  'dropAreaTitle': { 'zh-cn': '拖放至此<br />快速创建过滤器', 'zh-hk': '拖放至此<br />快速創建篩選器', 'zh-tw': '拖放至此<br />快速創建篩選器', 'en': 'Drop Here to Create Filter' },
  'dropAreaText': {
    'zh-cn': '将要设置过滤器的内容拖拽至此，即可快速创建过滤器。现已可识别：<br /><ul><li>微博正文的文字或链接</li><li>用户头像或链接</li><li>话题</li><li>来源链接</li></ul>',
    'zh-hk': '將要設置篩選器的內容拖拽至此，即可快速創建篩選器。現已可識別：<br /><ul><li>微博正文的文字或連結</li><li>使用者頭像或連結</li><li>話題</li><li>來源連結</li></ul>',
    'zh-tw': '將要設置篩選器的內容拖拽至此，即可快速創建篩選器。現已可識別：<br /><ul><li>微博正文的文字或連結</li><li>使用者頭像或連結</li><li>話題</li><li>來源連結</li></ul>',
    'en': 'Drop items here to create filter. These items may be recognized:<br /><ul><li>Text or link in Weibo content</li><li>Avatar or user link</li><li>topic</li><li>source</li></ul>'
  },
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
  '~v6~cover': '<div node-type="outer" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: none repeat scroll 0% 0% rgb(0, 0, 0); opacity: 0.3; z-index: 9999;"></div>',
  'dialog': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title"><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"></div></div></td></tr></tbody></table></div></div>',
  '~v6~dialog': '<div id="{{id}}" class="W_layer yawf-Layer" style="top: 193px; left: 376px;"><div tabindex="0"></div><div class="content" node-type="autoHeight"><div class="W_layer_title" node-type="title" style="">{{title}}</div><div class="W_layer_close"><a class="W_ficon ficon_close S_ficon" href="javascript:void(0);" node-type="close">X</a></div><div node-type="inner"></div></div></div>',
  'alert': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title" style=""><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"><div class="layer_point" node-type="outer"><dl class="point clearfix"><dt><span node-type="icon" class="icon_{{icon}}M"></span></dt><dd node-type="inner"><p node-type="textLarge" class="S_txt1">{{text}}</p><p node-type="textSmall" class="S_txt2"></p></dd></dl><div class="btn"><a node-type="OK" class="W_btn_a" href="javascript:void(0)"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a></div></div></div></div></td></tr></tbody></table></div></div>',
  '~v6~alert': '<div class="W_layer yawf-Layer" id="{{id}}"><div tabindex="0"></div><div class="content"><div class="W_layer_title" node-type="title">{{title}}</div><div class="W_layer_close"><a class="W_ficon ficon_close S_ficon" node-type="close" href="javascript:void(0);">X</a></div><div node-type="inner"><div class="layer_point"><dl class="point clearfix"><dt node-type="icon"><span class="W_icon icon_{{icon}}B"></span></dt><dd node-type="text"><p class="S_txt1">{{text}}</p></dd></dl></div></div><div class="W_layer_btn S_bg1"><a action-type="ok" node-type="ok" class="W_btn_a btn_34px" href="javascript:void(0);"><span>{{okButtonTitle}}</span></a></div></div></div>',
  'confirm': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title" style=""><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"><div class="layer_point" node-type="outer"><dl class="point clearfix"><dt><span node-type="icon" class="icon_{{icon}}M"></span></dt><dd node-type="inner"><p node-type="textLarge" class="S_txt1">{{text}}</p><p node-type="textComplex" class="S_txt2" style="display: none;"></p><p node-type="textSmall" class="S_txt2" style="display: none;"></p></dd></dl><div class="btn"><a node-type="OK" class="W_btn_a" href="javascript:void(0)"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a><a node-type="cancel" class="W_btn_b" href="javascript:void(0)"><span class="btn_30px W_f14">{{cancelButtonTitle}}</span></a></div></div></div></div></td></tr></tbody></table></div></div>',
  '~v6~confirm': '<div class="W_layer yawf-Layer" id="{{id}}"><div tabindex="0"></div><div class="content"><div class="W_layer_title" node-type="title">{{title}}</div><div class="W_layer_close"><a class="W_ficon ficon_close S_ficon" node-type="close" href="javascript:void(0);">X</a></div><div node-type="inner"><div class="layer_point"><dl class="point clearfix"><dt node-type="icon"><span class="W_icon icon_{{icon}}B"></span></dt><dd node-type="text"><p class="S_txt1">{{text}}</p></dd></dl></div></div><div class="W_layer_btn S_bg1"><a action-type="ok" node-type="ok" class="W_btn_a btn_34px" href="javascript:void(0);"><span>{{okButtonTitle}}</span></a><a action-type="cancel" node-type="cancel" class="W_btn_b btn_34px" href="javascript:void(0);"><span>{{cancelButtonTitle}}</span></a></div></div></div>',
  // 漏斗图标
  'icon': '<div class="gn_setting" node-type="filter"><i><a class="gn_tab gn_filter" href="#"><span class="ico">{{filter}}</span></a></i></div>',
  '~v6~icon': '<div class="gn_set_list yawf-gn_set_list"><a node-type="filter" href="javascript:void(0);" class="gn_filter"><em class="W_ficon ficon_mail S_ficon">Y</em></a></div>',
  'menuitem': '<ul class="gn_text_list"><li><a href="javascript:void(0);" class="yawf-config-menuitem">{{filterMenuItem}}</a></li></ul>',
  '~v6~menuitem': '<ul><li class="line S_line1 yawf-config-menuline"></li><li><a href="javascript:void(0);" class="yawf-config-menuitem">{{filterMenuItem}}</a></li></ul>',
  // 设置窗口
  'configHeaderTop': '<div class="profile_tab S_line5 yawf-config-header" node-type="yawf-config-header"><ul class="pftb_ul S_line1">',
  'configHeaderItem': '<li class="pftb_itm S_line1 {{liclass}}"><a class="pftb_lk S_line5 S_txt1 {{aclass}}" action-type="tab_item" onclick="return false;" href="javascript:void(0);">{{name}}</a>',
  'configHeaderBottom': '</ul></div>',
  '~v6~configHeaderTop': '<div class="WB_minitab yawf-config-header" node-type="yawf-config-header"><ul class="minitb_ul S_line1 S_bg1 clearfix">',
  '~v6~configHeaderItem': '<li class="minitb_item S_line1 {{liclass}}"><a class="minitb_lk S_txt1 {{aclass}}" action-type="tab_item" onclick="return false;" href="javascript:void(0);">{{name}}</a><span class="cur_block"></span></li>',
  '~v6~configHeaderBottom': '</ul></div>',
  'configLayerTop': '<div node-type="yawf-config-body" class="yawf-config-body">',
  'configLayerItem': '<div class="{{name}} yawf-config-layer" node-type="{{name}}" style="display: none;"></div>',
  'configLayerBottom': '</div>',
  'configFooter': '',
  // 设置窗口内文字
  'configTitle': '<div class="yawf-groupTitle">{{{text}}}</div>',
  'configSubtitle': '<div class="yawf-groupSubtitle">{{{text}}}</div>',
  'configText': '<div class="yawf-groupText">{{{text}}}</div>',
  'configRemark': '<div class="yawf-groupRemark">{{{text}}}</div>',
  'configLabel': '<div class="yawf-groupLabel"><label>{{{text}}}</label></div>',
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
  '~v6~configStringsItem': '<li class="W_btn_b W_btn_tag yawf-configStringsItem" node-type="tag_item">{{[item]}}<a class="W_ficon ficon_close S_ficon" href="javascript:void(0);">X</a></li>',
  'configUsers': '<div class="yawf-configUsers yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configUsersDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configUsersInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configUsersAdd}}</span></button></form><ul class="yawf-configUsersItems"></ul></div>',
  'configUsersItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}"></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><span class="object_name" uid="{{id}}" title="{{name}}">{{name}}</span></p><p class="W_fr"><a class="W_ico12 icon_close" action-data="uid={{id}}" href="javascript:void(0);"></a></p></div><div class="other_info"></div></div></div></div></li>',
  '~v6~configUsersItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}"></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><span class="object_name" uid="{{id}}" title="{{name}}">{{name}}</span></p><p class="W_fr"><a class="W_ficon ficon_close S_ficon" action-data="uid={{id}}" href="javascript:void(0);">X</a></p></div><div class="other_info"></div></div></div></div></li>',
  'configPrefill': '<span class="yawf-configPrefill" id="{{id}}"></span>',
  // 选中当前分组所有
  'configSelectAll': '<div class="yawf-configSelectAll yawf-configItem"><a class="W_btn_b" href="javascript:;"><span class="W_f12">{{configSelectAll}}</span></a></div>',
  // 导入导出
  'configImportExport': '<div class="yawf-configImportExport yawf-configItem"><label><input type="file" style=" width: 1px; height: 1px; margin: 0 -1px 0 0; opacity: 0;" /><span node-type="import" class="W_btn_b" action-type="import"><span class="W_f14">{{configImportButton}}</span></span></label><a node-type="export" class="W_btn_b" action-type="export" href="javascript:;"><span class="W_f14">{{configExportButton}}</span></a><a node-type="reset" class="W_btn_b" action-type="reset" href="javascript:;"><span class="W_f14">{{configResetButton}}</span></a></div>',
  // 新功能提示对话框
  'whatsNewHeader': '<div class="yawf-whats-new-header">{{updateSuccessHeader}}</div>',
  'whatsNewBody': '<div class="yawf-whats-new-body"><div class="yawf-whats-new-desc">{{updateSuccessDesc}}</div></div>',
  'whatsNewFooter': '<div class="yawf-whats-new-footer"><hr /></div>',
  'whatsNewBottom': '<div class="yawf-whats-new-bottom"></div>',
  // 合并左边栏占位符
  'leftFake': '<div style="display: none !important;" id="yawf-left-fake"></div>',
  // 查看原图
  'viewOriginalLink': '<a target="_blank" class="show_big" suda-data="key=tblog_newimage_feed&value=view_original" action-type="maximum" href="javascript:;"><em class="W_ico12 ico_showbig"></em>{{viewOriginalText}}</a><i class="W_vline">|</i>',
  '~v6~viewOriginalLink': '<li><span class="line S_line1"><a class="S_txt1" href="javascript:;" target="_blank"><i class="W_ficon ficon_search S_ficon">l</i>{{viewOriginalText}}</a></span></li>',
  // 拖拽
  'dropArea': '<div id="yawf-drop-area" class="display: none;"><div class="yawf-drop-area-desc"><div class="yawf-drop-area-title">{{dropAreaTitle}}</div><div class="yawf-drop-area-text">{{dropAreaText}}</div></div><div contenteditable="true" id="yawf-drop-area-content"></div></div>',
  'fastFilterHeader': '<div id="yawf-fast-filter-chose"><div class="yawf-fast-filter-option"><span class="yawf-fast-filter-text">{{fastFilterChoseText}}</span><ul id="yawf-fast-filter-list">',
  'fastFilterItem': '<li class="yawf-fast-filter-item"><label><input class="W_checkbox yawf-configBooleanInput" type="checkbox"><span class="yawf-fastFilterItemInner"></span></label><select value="blacklist"><option value="whitelist">{{whitelistActionDesc}}</option><option value="blacklist">{{blacklistActionDesc}}</option><option value="foldlist">{{foldlistActionDesc}}</option></select></li>',
  'fastFilterFooter': '</ul></div><div class="btn clearfix"><a node-type="ok" class="W_btn_a" action-type="ok" href="javascript:;"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a><a node-type="cancel" class="W_btn_b" action-type="cancel" href="javascript:;"><span class="btn_30px W_f14">{{cancelButtonTitle}}</span></a></div></div>',
  '~v6~fastFilterFooter': '</ul></div><div class="W_layer_btn S_bg2"><a action-type="ok" node-type="ok" class="W_btn_a btn_34px" href="javascript:void(0);"><span>{{okButtonTitle}}</span></a><a action-type="cancel" node-type="cancel" class="W_btn_b btn_34px" href="javascript:void(0);"><span>{{cancelButtonTitle}}</span></a></div></div>',
  'fastFilterString': '<label><span></span></label>',
  'fastFilterStringInput': '<input width="12" class="input_default" type="text" />',
  // 只看微博列表
  'weiboOnlyButton': '<div class="right_item"><div><a class="W_btn_round2" href="javascript:void(0);" title="{{text}}{{shortcut}}"><span>{{text}}</span></a></div></div></div>',
  '~v6~weiboOnlyButton': '<div id="yawf-weibo-only"><span><a class="S_txt1" href="javascript:void(0);">{{text}}</a></span></div>',
  // 分组或特别关注的未读提示
  'noticeContainer': '<div class="WB_feed_type SW_fun S_line2" action-type="feed_list_item" yawf-display="notice"></div>',
  // 有新微博的替代提示
  'feedListNewBar': '<a class="notes" yawf-id="feed_list_newBar" href="javascript:void(0);"></a>',
  '~v6~feedListNewBar': '<div class="WB_cardwrap WB_notes" yawf-id="home_new_feed_tip"><a href="javascript:void(0);"></a></div>',
  'feedTimeTip': '<fieldset class="S_line2 between_line" yawf-id="feed_list_timeTip"><legend class="S_txt3" yawf-id="feed_list_timeText">{{{time}}}</legend></fieldset>',
  '~v6~feedTimeTip': '<div class="WB_cardwrap S_bg2 yawf-timeTip" node-type="feed_list_timeTip"><div class="WB_cardtitle_a W_tc" node-type="feed_list_timeText">{{{time}}}</div></div>',
  // 顶栏徽标
  'navLogo': '<span class="logo"></span>',
  // 来自 微博 weibo.com
  'weiboViaWeiboCom': '<a rel="nofollow" href="http://weibo.com/" target="_blank" action-type="app_source" class="S_txt2">{{defaultSource}}</a>',
};

// 超链接
var url = {
  'newcard': 'http://www.weibo.com/aj/user/newcard?type=1&{{query}}&_t=1&callback={{callback}}',
  'view_ori': 'http://photo.weibo.com/{{uid}}/wbphotos/large/mid/{{mid}}/pid/{{pid}}',
  'block_wb': 'http://www.weibo.com/aj/user/block?_wv=5&__rnd={{rnd}}',
};

var util = {};

// 浏览器识别
util.browser = {};
// 一些兼容性代码
if (!Array.from) Array.from = Function.prototype.call.bind([].slice);
// 检查是否是 Firefox 浏览器，部分特性不支持其他浏览器
util.browser.fx = {};
util.browser.fx.version = (function () {
  var m = navigator.userAgent.match(/^Mozilla\/5.0 \([^)]+; rv:([\d.]+)\) Gecko\/[\d]{8} Firefox\/[\d.]+$/);
  return m && m[1] || null;
}());
util.browser.fx.avaliable = !!util.browser.fx.version;

// 脚本识别
util.script = {};
// 检查是否是从原站安装的脚本
util.script.original = (function () {
  try {
    var meta = GM_info.scriptMetaStr;
    var downloadURL = meta.match(new RegExp('// @(updateURL)(?:\\s+(.*))'))[2];
    var supportURL = meta.match(new RegExp('// @(supportURL)(?:\\s+(.*))'))[2];
    if (!downloadURL || !supportURL) return false;
    return downloadURL.indexOf(supportURL) === 0;
  } catch (e) { return false; }
}());

// 优先级设置
util.priority = {
  'FIRST': 1e6,
  'HIGH': 1e5,
  'BEFORE': 1e3,
  'DEFAULT': 0,
  'AFTER': 1e3,
  'LOW': -1e5,
  'LAST': -1e6,
};

// 函数相关操作
util.func = {};

// 在页面执行一个函数
util.func.page = function (f) {
  location.href = 'javascript: void(' + encodeURIComponent(f + '') + '())';
};

// 延迟调用函数
util.func.call = function (f) {
  setTimeout.bind(window, f, 0).apply(null, Array.from(arguments).slice(1));
};

// 套上try-catch
util.func.catched = function (f, fc) {
  return function () {
    try { return f.apply(this, arguments); }
    catch (e) {
      util.debug('Exception while run %o: %o', f, e);
      if (fc) fc(e);
    }
  };
};

// 字符串工具
util.str = {};

// 多行字符串 
util.str.cmt = function (f) {
  var s = f.toString().split(/\r\n|\r|\n/g).slice(1, -1).join('\n');
  return s;
};

// 从一个链接中截取他的域名
util.str.host = function (link) {
  var x = document.createElement('a');
  x.href = link;
  return x.host;
};

util.str.escape = {};
// 将字符串用&#dd的形式转义，以便将内容至于 XML 中
util.str.escape.xml = function (s) {
  return s.replace(/./g, function (c) { return '&#' + c.charCodeAt(0); });
};
// 将正则式相关字符以斜杠转义，以便创建正则匹配
util.str.escape.regexp = function (s) {
  return s.replace(/([.*+?^${}()|\[\]\/\\])/g, "\\$1");
};

// 以参数填充字符串
util.str.fill = function (base, func) {
  var argdatas = Array.from(arguments).slice(1);
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
    if (i[0] === '{') return (ret = util.str.fill(ret, parseFunction));
    if (i[0] === '[') return util.str.escape.xml(ret);
    return ret;
  });
};

// 检查一个字串是否是正则式，如果出错报告用户
// 返回为正则式或 null
util.str.addregex = function (s) {
  s = s.trim();
  if (s.length >= 2 && s[0] === '/' && s[s.length - 1] === '/') s = s.slice(1, -1);
  try { RegExp(s).exec(''); } catch (e) {
    util.ui.alert('yawf-regexp-bad-formed', {
      'title': util.str.fill('{{regexpBadFormedTitle}}'),
      'text': util.str.fill('{{{regexpBadFormed}}}', { 'regexp': util.str.escape.xml(s) }),
      'icon': 'error'
    });
    s = null;
  }
  return s;
};

// 将字符串编译成正则式
util.str.compregex = function (regex) {
  try { return RegExp(regex); }
  catch (e) {
    util.debug('erorr while compile regexp %s : %o', regex, e);
    return null;
  }
};

// 将&连接的键值对变为对象
util.str.parsearg = function (str) {
  var o = {};
  str.split('&').map(function (kv) {
    if (kv.indexOf('=') === -1) o[kv] = null;
    else {
      kv = kv.split('=', 2);
      o[decodeURIComponent(kv[0])] = decodeURIComponent(kv[1]);
    }
  });
  return o;
};

// 将颜色和透明度转换为一个表示颜色的字符串
util.str.rgba = function (color, transparency) {
  return 'rgba(' + color.slice(1)
    .split(/(..)/).filter(function (x) { return x; })
    .map(function (x) { return parseInt(x, 16); }).join(',') +
    ',' + (100 - transparency) / 100 + ')';
};

// 字符串 base64 编码
util.str.base64 = function (str) {
  return btoa(unescape(encodeURIComponent(str)));
};

// 文档相关工具
util.dom = {};

// 快速创建一段文档元素
util.dom.create = function create(tag, inner) {
  if (tag && typeof inner === 'undefined')
    return create('div', tag).firstChild;
  var d = document.createElement(tag);
  d.innerHTML = inner;
  return d;
};

// 某个元素是否匹配特定选择器
util.dom.matches = (function () {
  // 不能直接扩展 Element.prototype
  // https://bugzil.la/787070 (mozilla35)
  var ep = Element.prototype, matches = ep.matches ||
    ep.mozMatchesSelector || ep.oMatchesSelector ||
    ep.webkitMatchesSelector || ep.msMatchesSelector;
  return function (element, selector) {
    try { return matches.call(element, [selector]); }
    catch (e) { return null; }
  };
}());

// 将输入框和某个设置项绑定
util.dom.bind = (function () {
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


// 对网页的判断
util.page = {};

// 检查是否要在本页上运行
util.page.valid = function () {
  if (window.self !== window.top) return false;
  if (!unsafeWindow.$CONFIG) return false;
  if (!unsafeWindow.$CONFIG.uid) return false;
  if (!unsafeWindow.$CONFIG.nick) return false;
  if (!unsafeWindow.$CONFIG.lang) return false;
  return true;
};

// 当前是查看分组的页面吗
util.page.group = function () {
  return location.pathname.slice(-9) === '/mygroups';
};

// 初始化
util.init = (function () {
  var callbacks = [], index = 0;
  // 完成加载时调用
  var dcl = function () {
    if (!util.page.valid()) return;
    callbacks.sort(function (x, y) {
      return y[0] - x[0] || y[1] - x[1];
    }).forEach(function (i) { util.func.catched(i[2])(); });
  };
  if (document.body) setTimeout(dcl, 0);
  else document.addEventListener('DOMContentLoaded', dcl);
  // 添加回调
  var add = function (func, priority) {
    callbacks.push([priority, ++index, func]);
    return func;
  };
  return add;
}());

// 对页面中添加元素时的监听
var observer = {};

// 有新节点时分发事件监听
observer.dom = (function () {
  var callbacks = [];
  var add = function (callback) {
    callbacks.push(util.func.catched(callback));
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
  var actived = null;
  var act = function () {
    callbacks.forEach(function (c) { c(); });
  };
  var active = util.func.catched(function (mutation) {
    if (actived === false) actived = true;
    if (actived !== null) return;
    act(); actived = false;
    setTimeout(function () {
      if (actived === true) act(); actived = null;
    }, 100);
  });
  var observe = function () {
    active(); // 初始化
    (new MutationObserver(active))
      .observe(document.body, { 'childList': true, 'subtree': true });
  };
  util.init(function () {
    observe();
  }, util.priority.LAST + util.priority.AFTER * 2);
  return {
    'add': add,
    'remove': remove,
  };
}());

// 对每条微博应用过滤和其他相关回调
observer.weibo = (function () {
  var befores = [], afters = [];
  observer.dom.add(function () {
    var feeds = Array.from(
      document.querySelectorAll('[node-type="feed_list"] .WB_feed_type:not([yawf-display])'));
    [befores, [filter.active], afters].forEach(function (callbacks) {
      feeds.forEach(function (feed) {
        callbacks.forEach(function (f) { f(feed); });
      });
    });
  });
  var add = function (callbacks) {
    return function (callback) {
      callbacks.push(util.func.catched(callback));
      return callback;
    };
  };
  return {
    'before': add(befores),
    'after': add(afters),
  };
}());

// 键盘相关工具
util.keyboard = (function () {
  var ctrl = 1 << 8, shift = 1 << 9, alt = 1 << 10, meta = 1 << 11, key = ctrl - 1;
  var namelist = '#0;#1;#2;Cancel;#4;#5;Help;#7;BackSpace;TAB;#10;#11;Clear;Enter;EnterSpecial;#15;;;;Pause;CapsLock;Kana;Eisu;Junja;Final;Hanja;#26;Esc;Convert;Nonconvert;Accept;ModeChange;Space;PageUp;PageDown;End;Home;Left;Up;Right;Down;Select;Print;Execute;PrintScreen;Insert;Delete;#47;0;1;2;3;4;5;6;7;8;9;Colon;Semicolon;LessThan;Equals;GreaterThan;QuestionMark;At;A;B;C;D;E;F;G;H;I;J;K;L;M;N;O;P;Q;R;S;T;U;V;W;X;Y;Z;Win;#92;ContextMenu;#94;Sleep;NumPad0;NumPad1;NumPad2;NumPad3;NumPad4;NumPad5;NumPad6;NumPad7;NumPad8;NumPad9;Multiply;Add;Separator;Subtract;Decimal;Divide;F1;F2;F3;F4;F5;F6;F7;F8;F9;F10;F11;F12;F13;F14;F15;F16;F17;F18;F19;F20;F21;F22;F23;F24;#136;#137;#138;#139;#140;#141;#142;#143;NumLock;ScrollLocK;WIN_OEM_FJ_JISHO;WIN_OEM_FJ_MASSHOU;WIN_OEM_FJ_TOUROKU;WIN_OEM_FJ_LOYA;WIN_OEM_FJ_ROYA;#151;#152;#153;#154;#155;#156;#157;#158;#159;Circumflex;Exclamation;DoubleQuote;Hash;Dollar;Percent;Ampersand;Underscore;OpenParen;CloseParen;Asterisk;Plus;Pipe;HyphenMinus;OpenCurlyBracket;CloseCurlyBracket;Tilde;#177;#178;#179;#180;VolumeMute;VolumeDown;VolumeUp;#184;#185;#186;#187;Comma;#189;Period;Slash;BackQuote;#193;#194;#195;#196;#197;#198;#199;#200;#201;#202;#203;#204;#205;#206;#207;#208;#209;#210;#211;#212;#213;#214;#215;#216;#217;#218;OpenBracket;BackSlash;CloseBracket;Quote;#223;;AltGr;#226;WIN_ICO_HELP;WIN_ICO_00;#229;WIN_ICO_CLEAR;#231;#232;WIN_OEM_RESET;WIN_OEM_JUMP;WIN_OEM_PA1;WIN_OEM_PA2;WIN_OEM_PA3;WIN_OEM_WSCTRL;WIN_OEM_CUSEL;WIN_OEM_ATTN;WIN_OEM_FINISH;WIN_OEM_COPY;WIN_OEM_AUTO;WIN_OEM_ENLW;WIN_OEM_BACKTAB;Attn;Crsel;Exsel;Ereof;Play;Zoom;#252;PA1;WIN_OEM_CLEAR;#255'.split(';');
  var code = {}; namelist.forEach(function (name, index) { code[name.toUpperCase()] = index; });
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
  var triggers = [];
  var reg = function (type, key, callback, ignoreInInput) {
    triggers.push({
      'type': type,
      'key': key,
      'callback': util.func.catched(callback),
      'ignoreInInput': !!ignoreInInput
    });
  };
  // 监听按键
  var baseEvent = function (e) {
    var code = get(e);
    var inInput = /^select|textarea|input$/.test(e.target.nodeName.toLowerCase());
    var actived = triggers.filter(function (trigger) {
      if (inInput && trigger.ignoreInInput) return false;
      return trigger.type === e.type && trigger.key === code;
    });
    if (!actived) return;
    actived.forEach(function (trigger) { trigger.callback(e); });
  };
  ['keydown', 'keypress', 'keyup'].forEach(function (type) {
    document.documentElement.addEventListener(type, baseEvent);
  });
  return {
    'get': get,
    'name': name,
    'reg': reg,
    'code': code,
  };
}());

// 语言相关工具
util.i18n = {};
// 语言相关样式
util.i18n.stylish = function (lang) {
  var isEn = lang === 'en';
  util.css.add(util.str.fill(util.str.cmt(function () { /*!CSS
    .layoutFilterGroupLayer .yawf-configBoolean { width: {{layoutOptionWidth}}; }
    #yawf-config .WB_minitab .current.minitb_lk { font-weight: bold; }
    .layoutFilterGroupLayer .yawf-configBoolean.yawf-layoutConfig-line { width: 100%; }
  */ }), { 'layoutOptionWidth': isEn ? '320px' : '160px', }));
  if (isEn) util.css.add(util.str.cmt(function () { /*!CSS
    #yawf-config .profile_tab .current.pftb_lk { padding-left: 8px !important; padding-right: 8px !important; }
    #yawf-config .profile_tab .pftb_lk { padding-left: 10px !important; padding-right: 10px !important; }
    #yawf-config .WB_minitab .minitb_lk:hover,
    #yawf-config .WB_minitab .current .minitb_lk { font-weight: normal; }
    #yawf-config .WB_minitab .minitb_lk { padding-left: 8px !important; padding-right: 8px !important; }
    #yawf-config .WB_minitab .minitb_lk { width: auto; }
  */ })); else util.css.add(util.str.cmt(function () { /*!CSS
    #yawf-config .WB_minitab .minitb_lk:hover,
    #yawf-config .WB_minitab .current .minitb_lk { font-weight: normal; }
    #yawf-config .WB_minitab .minitb_lk { padding-left: 13px !important; padding-right: 13px !important; }
    #yawf-config .WB_minitab .minitb_lk { width: auto; }
  */ }));
};

// 根据用户界面上的语言做不同调整
util._languages = (function () {
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
    chose.lang = l;
    util.i18n.stylish(lang);
    return chose;
  };
}());

// 设置相关工具
util.config = null;
util._storage = function () {
  var config = {}, config_bak = null;
  var keys = [], onputs = [];
  var storageKey = 'user' + util.info.uid + 'config';
  var tonputs = function (key, value, oldValue) {
    onputs.map(function (f) { f(key, value, oldValue); });
  };
  var updateBak = function () {
    config_bak = JSON.parse(JSON.stringify(config));
  };
  // 读取到内存
  var readp = false;
  var read = function () {
    if (readp) return;
    util.func.call(function () { readp = false; });
    readp = true;
    util.debug('read GM value');
    try { config = JSON.parse(GM_getValue(storageKey, '{}')); }
    catch (e) { config = {}; }
    updateBak();
  };
  // 从内存写出
  var write = function () {
    util.debug('write GM value');
    GM_setValue(storageKey, JSON.stringify(config));
  };
  // 写入到内存
  var put = function (key, value) {
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
    var internal = {}, success = false, backup;
    try {
      // 备份当前设置
      backup = JSON.stringify(config);
      Object.keys(config)
        .filter(function (x) { return x.indexOf('._') !== -1; })
        .forEach(function (x) { internal[x] = config[x]; });
      // 清空设置并添加新的设置
      clear();
      s = JSON.parse(s).conf;
      Object.keys(s).forEach(function (key) { put(key, s[key]); });
      // 恢复内部变量值
      Object.keys(internal).forEach(function (x) { put(x, internal[x]); });
      // 确认写回
      write();
      success = true;
    } catch (e) {
      config = JSON.parse(backup);
      success = false;
    }
    return success;
  };
  // 导出成为字串
  var export_ = function () {
    var info = GM_info || {}, script = info.script || {};
    var conf = {};
    // 不导出键值包含 ._ 的项，因为他们是内部项
    Object.keys(config)
      .filter(function (x) { return x.indexOf('._') === -1; })
      .forEach(function (x) { conf[x] = config[x]; });
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
    'put': put, 'get': get, 'onput': onput,
    'read': read, 'write': write,
    'import': import_, 'export': export_,
    'clear': clear,
    'reg': reg,
  };
};

util.v6 = null;

// 版本相关
util.version = {};

// 弄一些新版的小玩意儿
util.version.fix = function (obj) {
  if (!util.v6) return;
  Object.keys(obj).forEach(function (key) {
    if (key.indexOf('~v6~') !== 0) return;
    obj[key.slice(4)] = obj[key];
  });
};
util.version.chose = function (v5, v6) {
  return util.v6 ? v6 : v5;
};

util.init(function () {
  // 检查版本
  util.v6 = unsafeWindow.$CONFIG.jsPath.indexOf('t6') !== -1;
  document.body.setAttribute('yawf-weibo-version', util.v6 ? 'v6' : 'v5');
  // 保存用户信息
  util.info.uid = unsafeWindow.$CONFIG.uid;
  util.info.nick = unsafeWindow.$CONFIG.nick;
  // 初始化语言选项
  util.i18n.chose = util._languages(unsafeWindow.$CONFIG.lang);
  Object.keys(text).map(function (key) { util.i18n.chose(text[key]); text[key] = text[key].local; });
  Object.keys(html).map(function (key) { html[key] = util.str.fill(html[key]); });
  util.version.fix(text);
  util.version.fix(html);
  // 初始化设置集
  util.config = util._storage();
}, util.priority.FIRST);

// 用户信息
util.info = {};
util.info.uid = null;
util.info.nick = null;

// 打印调试信息
util.debug = GM_getValue('debug', false) &&
  console && console.log && console.log.bind(console) ||
  function () { };

// 桌面提示工具
util.notify = (function () {
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
      shown = Array.from(shown);
      id = String(id);
    } catch (e) { }
    util.debug('%o %s shown feed list: %o', id, shown.indexOf(id) === -1 ? 'not in' : 'in', shown);
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
      util.debug('show (webkit) notification: %s - %s', title, body);
      var notify = webkitNotifications.createNotification(icon, title, body);
      if (delay && delay > 0) notify.addEventListener('display', function () {
        setTimeout(function () { hideNotification(notify); }, delay);
      });
      if (onclick) notify.addEventListener('click', onclick);
      notify.show();
      return notify;
    },
  };

  // Notification
  // Firefox 22+
  // 显示4秒会自动关闭 https://bugzil.la/875114 
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
      util.debug('show notification: %s - %s', title, body);
      var notify = new Notification(title, { 'body': body, 'icon': icon });
      if (delay && delay > 0) notify.addEventListener('show', function () {
        setTimeout(function () { notify.close(); }, delay);
      });
      if (onclick) notify.addEventListener('click', onclick);
      return notify;
    },
  };

  // 有哪些接口可用
  var avaliableNotification = function () {
    return Object.keys(avaliable);
  };
  // 选择用哪个接口
  var choseNotification = function (prefer) {
    return (use = prefer && avaliable[prefer] || avaliable.standard);
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

// 管理样式
util.css = (function () {
  var styleText = '', added = false;
  var fun = function (css) { return fun.add.bind(fun, css); };
  fun.add = function (css) { if (!added) styleText += css + '\n'; else GM_addStyle(css); };
  util.init(function () { GM_addStyle(styleText); added = true; }, util.priority.LAST);
  return fun;
}());

// 界面相关
util.ui = {};

// 显示设置按钮
// 包括右上角过滤器图标和设置菜单中的菜单项
util.ui.icon = util.init(function () {
  var onClick = util.func.catched(function (e) { filter.dialog(); e.preventDefault(); });
  var icon = util.version.chose(function () {
    var p = document.querySelector('.WB_global_nav .gn_person');
    if (!p) return setTimeout(icon, 100);
    var d = util.dom.create(html.icon); p.appendChild(d);
    document.querySelector('.gn_filter').addEventListener('click', onClick);
  }, function () {
    var p = document.querySelector('.WB_global_nav .gn_set_list');
    if (!p) return setTimeout(icon, 100);
    var d = util.dom.create(html.icon); p.parentNode.insertBefore(d, p);
    document.querySelector('.gn_filter').addEventListener('click', onClick);
  });
  var menuitem = util.version.chose(function () {
    var a = document.querySelector('.WB_global_nav .gn_person .gn_setting[node-type="account"] .gn_func');
    if (!a) return setTimeout(menuitem, 100);
    var m = util.dom.create(html.menuitem); a.parentNode.insertBefore(m, a);
    document.querySelector('.yawf-config-menuitem').addEventListener('click', onClick);
  }, function () {
    var a = document.querySelectorAll('.gn_topmenulist ul li.line');
    if (!a || !a.length) return setTimeout(menuitem, 100);
    a = a[a.length - 1];
    var m = util.dom.create(html.menuitem);
    while (m.firstChild) a.parentNode.insertBefore(m.firstChild, a);
    document.querySelector('.yawf-config-menuitem').addEventListener('click', onClick);
  });
  icon(); menuitem();
}, util.priority.LAST);

// 对话框
util.ui.form = function (dom, display, details) {
  var ok = dom.querySelector('[node-type="OK"], [node-type="ok"]');
  var cancel = dom.querySelector('[node-type="cancel"]');
  var close = dom.querySelector('[node-type="close"]');
  var title = dom.querySelector('.title, .W_layer_title');
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
  var cover = util.dom.create(html.cover);
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
util.ui.dialog = function (id, title, fillFun) {
  var dom = util.dom.create(util.str.fill(html.dialog, { 'id': id, 'title': util.str.fill(title) }));
  var form = util.ui.form(dom, false, {});
  fillFun(dom.querySelector('[node-type="inner"]'));
  return form;
};

// 显示一个提示框
util.ui.alert = function (id, details) {
  var dom = util.dom.create(util.str.fill(html.alert, { 'id': id, 'title': details.title, 'text': details.text, 'icon': details.icon || 'warn' }));
  var form = util.ui.form(dom, true, details);
  return form;
};

// 显示一个确定框
util.ui.confirm = function (id, details) {
  var dom = util.dom.create(util.str.fill(html.confirm, { 'id': id, 'title': details.title, 'text': details.text, 'icon': details.icon || 'question' }));
  var form = util.ui.form(dom, true, details);
  return form;
};

// 产生一个假的回调函数
var dateStr = (function () {
  var last = 0;
  return function () {
    return '' + (last = Math.max(last + 1, Number(new Date())));
  };
}());

// 网络访问相关
var network = {};
// 维护帐号信息，用于显示
network.account = (function () {
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
      'url': util.str.fill(url.newcard, { 'query': queryStr, 'callback': 'STK_' + dateStr() }),
      'onload': util.func.catched(function (resp) {
        // 永远不要试图理解一个用 JSON 包裹 HTML 的 API
        var respJson = JSON.parse(resp.responseText.replace(/^try{[^{]*\(/, '').replace(/\)}catch\(e\){};$/, ''));
        var namecard = util.dom.create('div', respJson.data);
        var avatar = namecard.querySelector('.name dt img').getAttribute('src');
        var name = namecard.querySelector('.name dd a[uid]').getAttribute('title');
        var uid = namecard.querySelector('.name dd a[uid]').getAttribute('uid');
        var data = { 'avatar': avatar, 'id': uid, 'name': name };
        nameCache[name] = idCache[uid] = data;
        done(true, data);
      }, function () { done(false); }),
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

network.weibo = {};
// 告诉服务器屏蔽被隐藏的微博
network.weibo.block = (function () {
  var buffer = [], busy = false, all = [];
  var delay = function () { return 3000 + Math.round(20 * Math.random()) * 100; };
  var block = function (mid, callback) {
    var done = function () { setTimeout(callback, delay()); };
    util.debug('blocking weibo %s', mid);
    GM_xmlhttpRequest({
      'method': 'POST',
      'url': util.str.fill(url.block_wb, { 'rnd': dateStr() }),
      'headers': {
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Cache-Control': 'no-cache',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie': document.cookie,
        'Referer': location.href,
        'X-Requested-With': 'XMLHttpRequest',
      },
      'data': 'filter_type=0&mid=' + mid + '&justhide=0&location=home&_t=0',
      'onload': function (resp) {
        try { util.debug('block %s response: %o', mid, JSON.parse(resp.responseText)); }
        catch (e) { util.debug('block %s response: %s', mid, resp.responseText); }
        done();
      },
      'onerror': function () { util.debug('block %s network error', mid); done(); },
    });
  };
  var active = function () {
    if (!(busy = !!buffer.length)) return;
    var mid = buffer.shift();
    block(mid, active);
  };
  return function (mid) {
    if (all.indexOf(mid) !== -1) return null;
    buffer.push(mid); all.push(mid);
    if (!busy) active();
    return mid;
  };
}());

// 过滤器
var filter = {};
// 过滤器的过滤规则
filter.rules = (function () {
  var list = [];
  var add = function (priority, rule) {
    list.push({ 'priority': priority, 'rule': rule });
    list.sort(function (x, y) { return y.priority - x.priority; });
  };
  var parse = function (feed, isChild) {
    var result = null;
    list.some(function (item) {
      try { result = item.rule(feed, isChild) || result; }
      catch (e) { util.debug('error while parsing rule %o: %o', item.rule, e); }
      if (result) util.debug('%o(%o) -> %s', item.rule, feed, result);
      return result;
    });
    return result;
  };
  return {
    'add': add,
    'parse': parse,
  };
}());

// 单条微博页面永远不应当隐藏微博
filter.rules.add(1e6, function singleWeiboPageUnsetRule(feed) {
  return document.querySelector('[id^="Pl_Official_WeiboDetail__"]') ? 'unset' : null;
});

// 过滤器的对话框
filter.dialog = (function () {
  var dialog = null;
  var lastTab = 0;
  var dialogTabs = function (list, inner, page) {
    var alist = Array.from(inner.querySelectorAll('.yawf-config-header a'));
    var llist = Array.from(inner.querySelectorAll('.yawf-config-body .yawf-config-layer'));
    var body = inner.querySelector('.yawf-config-body');
    var choseLList = util.version.chose(function (i) {
      llist.forEach(function (l) { l.style.display = 'none'; l.innerHTML = ''; });
      alist.forEach(function (a) { a.classList.remove('current'); a.classList.remove('S_bg5'); a.classList.add('S_bg1'); });
      llist[i].innerHTML = ''; list[i].show(llist[i]); llist[i].style.display = 'block';
      alist[i].classList.add('current'); alist[i].classList.remove('S_bg1'); alist[i].classList.add('S_bg5');
      lastTab = i;
      util.func.call(function () { body.scrollTop = 0; });
    }, function (i) {
      llist.forEach(function (l) { l.style.display = 'none'; l.innerHTML = ''; });
      alist.forEach(function (a) { a.parentNode.classList.remove('current'); a.classList.remove('S_bg2'); });
      llist[i].innerHTML = ''; list[i].show(llist[i]); llist[i].style.display = 'block';
      alist[i].parentNode.classList.add('current'); alist[i].classList.add('S_bg2');
      lastTab = i;
      util.func.call(function () { body.scrollTop = 0; });
    });
    list.map(function (item, i) {
      var a = alist[i];
      a.addEventListener('mousedown', function () { choseLList(i); });
      a.addEventListener('keydown', function () { choseLList(i); });
    });
    choseLList(page);
  };
  return function showDialog(page, count) {
    var showDialogInner = function (inner) {
      var list = filter.collection.group.list;
      inner.innerHTML = [html.configHeaderTop,
        list.map(function (item, index) {
          return util.version.chose(util.str.fill(html.configHeaderItem, {
            'name': text[item.name + 'FilterGroupTitle'],
            'aclass': index === 0 ? 'S_bg5 current' : 'S_bg1',
            'liclass': index === list.length - 1 ? 'pftb_itm_lst' : ' ',
          }), util.str.fill(html.configHeaderItem, {
            'name': text[item.name + 'FilterGroupTitle'],
            'aclass': index === 0 ? 'S_bg2' : '',
            'liclass': index === 0 ? 'current' : ' ',
          }));
        }).join(''),
        html.configHeaderBottom,
        html.configLayerTop,
        list.map(function (item) {
          return util.str.fill(html.configLayerItem, {
            'name': item.name + 'FilterGroupLayer',
          });
        }).join(''),
        html.configLayerBottom,
        html.configFooter,
      ].join('');
      util.func.call(function () { dialog.show(0); });
      if (list.indexOf(page) === -1) dialogTabs(list, inner, lastTab);
      else dialogTabs(list, inner, list.indexOf(page));
    };
    if (!(dialog = util.ui.dialog('yawf-config', '{{configDialogTitle}}', showDialogInner))) {
      if (!count || count < 100) setTimeout(showDialog, 100, page, (count || 0) + 1);
    }
  };
}());

// 快速创建过滤器
filter.fast = {};

// 快速创建过滤器的对话框
filter.fast.dialog = function (candidate) {
  var dialogInner = function (inner) {
    inner.innerHTML = html.fastFilterHeader + html.fastFilterFooter;
    var items = inner.querySelector('#yawf-fast-filter-list');
    var checkboxs = candidate.map(function (c) {
      var item = util.dom.create('ul', html.fastFilterItem).firstChild;
      var inner = item.querySelector('.yawf-fastFilterItemInner');
      var checked = c.filter.description(inner, c.value) !== false;
      var checkbox = item.querySelector('input[type="checkbox"], input[type="radio"]');
      checkbox.checked = checked;
      items.appendChild(item);
      return checkbox;
    });
    var selects = Array.from(inner.querySelectorAll('select'));
    selects.forEach(function (select) { select.value = 'blacklist'; });
    // 找到所有选择了的过滤器
    var chosen = function () {
      var active = [];
      checkboxs.forEach(function (checkbox, i) {
        if (checkbox.checked)
          active.push({
            'filter': candidate[i].filter,
            'value': candidate[i].value,
            'action': selects[i].value
          });
      });
      return active;
    };
    // 确定按钮 
    var ok = inner.querySelector('[action-type="ok"]');
    var updateOkButton = function () {
      if (chosen().length) ok.classList.remove('W_btn_a_disable');
      else ok.classList.add('W_btn_a_disable');
    };
    ok.addEventListener('click', function () {
      var active = chosen();
      if (!active.length) return null;
      active.forEach(function (act) {
        act.filter.addconf(act.filter.rawvalue(act.value), act.action);
      });
      dialog.hide();
    });
    checkboxs.forEach(function (checkbox) {
      checkbox.addEventListener('change', updateOkButton);
    });
    updateOkButton();
    // 取消按钮
    var cancel = inner.querySelector('[action-type="cancel"]');
    cancel.addEventListener('click', function () { dialog.hide(); });
  };
  var dialog = util.ui.dialog('yawf-drop-select', '{{fastCreateChoseTitle}}', dialogInner);
  util.func.call(function () { dialog.show(); });
  return dialog;
};

// 检查拖拽一个元素是不是该触发快速创建过滤器的显示
filter.fast.valid = (function () {
  var validators = [];
  // 检查某个元素是否被至少一个函数识别
  var test = function (element) {
    for (var i = 0, l = validators.length; i < l; i++) {
      var result = util.func.catched(validators[i])(element);
      if (result) return result;
    }
    return false;
  };
  // 添加一个识别在某种特定元素的函数
  var add = function add(validator) {
    if (!validator || validators.indexOf(validator) !== -1) return;
    validators.push(validator);
  };
  return {
    'add': add,
    'test': test,
  };
}());

// 从拖拽得到的东西里面找出来我们关心的东西
filter.fast.recognize = (function () {
  var listeners = [];
  var got = function (element, element2) {
    util.debug('got %o', element);
    if (!element) if (element2) return got(element2); else return;
    // 问所有过滤器是不是需要
    var candidate = [];
    listeners.forEach(function (details, i) { candidate[i] = null; });
    listeners.forEach(function (details, i) {
      var callback = function callback(val) {
        if (!val) return callback([]);
        else if (!Array.isArray(val)) return callback([val]);
        else candidate[i] = val.map(function (val) { return { 'filter': details, 'value': val }; });
        // 如果还有没填写的，那么等待所有的函数填写好
        if (candidate.length !== candidate.filter(Boolean).length) return;
        // 找到所有备选的情况给用户做选择
        var chosen = candidate.reduce(function (x, y) { return x.concat(y); });
        if (chosen.length) filter.fast.dialog(chosen);
        else if (element2) got(element2);
      };
      util.func.catched(details.recognizer)(element, callback);
    });
  };
  var add = function (details) {
    listeners.push(details);
  };
  return {
    'got': got,
    'add': add,
  };
}());

// 使用右键菜单屏蔽
filter.fast.right = (function () {
  var counter = 0, filters = [];
  var addmenu = function (feed, isChild) {
    var menu = document.createElement('menu');
    menu.setAttribute('type', 'context');
    var submenu = menu.appendChild(document.createElement('menu'));
    submenu.setAttribute('label', text.contextMenuCreateLabel);
    filters.forEach(function (details) {
      var items = details.contextmenu(feed);
      if (!items) return;
      if (!Array.isArray(items)) items = [items];
      if (!items.length) return;
      var container = submenu;
      if (details.menugrouped) {
        container = document.createElement('menu');
        container.setAttribute('label', util.str.fill(details.menugrouped));
      }
      var itemtext = {};
      items.forEach(function (item) {
        var text = details.menudesc(item);
        if (!text || itemtext[text]) return; itemtext[text] = true;
        var menuitem = document.createElement('menuitem');
        menuitem.setAttribute('label', text);
        menuitem.addEventListener('click', function () {
          details.recognizer(item, function (value) {
            filter.fast.dialog([{ 'filter': details, 'value': value }]);
          });
        });
        container.appendChild(menuitem);
      });
      if (details.menugrouped && container.firstChild) submenu.appendChild(container);
    });
    if (menu.firstChild && submenu.firstChild) {
      feed.appendChild(menu);
      feed.setAttribute('contextmenu', (menu.id = 'yawf-weibo-menu-' + ++counter));
    }
  };
  var active = function () {
    if (util.v6) {
      observer.weibo.after(function (feed) {
        var son = Array.from(feed.querySelectorAll('.WB_sonFeed .WB_feed_detail'));
        [feed].concat(son).forEach(function (feed, index) { addmenu(feed, !!index); });
      });
    } else {
      observer.weibo.after(addmenu);
    }
  };
  var add = function (details) { if (details.contextmenu) filters.push(details); };
  return {
    'add': add,
    'active': active,
  };
}());

filter.fast.item = function (details) {
  filter.fast.valid.add(details.validator);
  filter.fast.recognize.add(details);
  filter.fast.right.add(details);
};

// 将文本、链接等拖拽到框内，快速创建过滤器
filter.fast.active = (function () {
  var dropArea = null;
  // 获得拖拽释放的元素之后，根据不同过滤器的设置处理元素
  var got = function (element, target) {
    filter.fast.recognize.got(element, target);
  };
  var area = (function () {
    var cont, target = null, active = false;
    var start = function (element) {
      if (!filter.fast.valid.test(element)) return false;
      target = element;
      return (active = true);
    };
    var done = function () {
      if (!active) return true;
      return (active = false);
    };
    var show = function () {
      dropArea.style.display = 'block';
    };
    var hide = function () {
      if (target && target.hover) target.hover();
      target = null;
      dropArea.style.display = 'none';
    };
    var init = function () {
      dropArea = util.dom.create(html.dropArea);
      cont = dropArea.querySelector('#yawf-drop-area-content');
      document.body.appendChild(dropArea);
    };
    var content = function () {
      util.debug('content: %o', cont.innerHTML);
      if (cont.firstChild === cont.lastChild) return cont.firstChild;
      else return cont;
    };
    var clear = function () { cont.innerHTML = ''; };
    var enter = function () { dropArea.classList.add('valid'); };
    var leave = function () { dropArea.classList.remove('valid'); };
    return {
      'show': show, 'hide': hide,
      'start': start, 'done': done,
      'content': content, 'clear': clear,
      'init': init,
      'enter': enter, 'leave': leave,
    };
  }());
  // 初始化拖拽相关事件监听
  var events = function () {
    var valid = false;
    // 开始拽
    document.addEventListener('dragstart', function (e) {
      valid = false; area.leave();
      if (area.start(e.target)) area.show();
    }, false);
    // 拽完了
    document.addEventListener('dragend', function (e) {
      if (area.done()) return;
      if (valid) got(area.content(), e.target);
      area.clear();
      area.hide();
    }, false);
    // 拽出去了
    document.addEventListener('mouseout', function (e) { if (area.done()) return; area.hide(); });
    dropArea.addEventListener('dragenter', function (e) { valid = true; area.enter(); });
    dropArea.addEventListener('dragleave', function (e) { valid = false; area.leave(); });
  };
  return function () {
    area.init();
    events();
  };
}());

// 注册和扩展数组类型的内容
filter.extent = (function () {
  var extp = {};
  var reg = function (key, func) {
    if (typeof extp[key] === 'function') return;
    else {
      var words = extp[key] || [];
      extp[key] = func;
      func(words);
    }
  };
  var act = function (key, words) {
    if (typeof extp[key] === 'function') return extp[key](words);
    else extp[key] = (extp[key] || []).concat(words);
  };
  return {
    'reg': reg,
    'act': act,
  };
}());

// 过滤后对文档树的一些修改
filter.fix = {};

// 添加点击后展开折叠消息的事件
filter.fix.fold = (function () {
  var fixOne = util.func.catched(function (feed) {
    var display = feed.getAttribute('yawf-display').replace(/-fold$/g, '-unfold');
    var showFeed = function () {
      feed.setAttribute('yawf-display', display);
      feed.removeEventListener('click', showFeed);
    };
    feed.addEventListener('click', showFeed);
    // 添加作者信息
    try {
      var author = weibo.author.name(feed);
      if (author) feed.setAttribute('yawf-author', author);
    } catch (e) { }
  });
  var fix = function (feed) {
    var feeds = [feed].concat(Array.from(feed.querySelectorAll('.WB_feed_type')));
    feeds.forEach(function (feed) {
      if (feed.getAttribute('yawf-display').lastIndexOf('-fold') === -1) return;
      if (feed.getAttribute('yawf-author')) return;
      fixOne(feed);
    });
  };
  return fix;
}());

// 将父微博和下面的子微博交换
filter.fix.swap = function (parent, son) {
  var x = util.dom.create('div', '');
  ['.WB_face', '.WB_info', '.WB_text', '.WB_detail>.WB_func'].map(function (q) {
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
filter.fix.son = function (feed) {
  if (!feed.querySelector('.WB_feed_together')) return;
  // 重新对子微博排序
  var reorder = function () {
    var sonList = Array.from(feed.querySelectorAll('.WB_feed_together .WB_sonFeed .WB_feed_type[yawf-display]'));
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
  };
  // 重新对子微博计数
  var recount = function () {
    // 看看还有多少显示出来的子微博，更新一下子微博的计数
    var sonCount = feed.querySelectorAll('.WB_feed_together .WB_sonFeed .WB_feed_type:not([yawf-display$="-hidden"])').length;
    if (sonCount === 0) feed.querySelector('.WB_feed_together').setAttribute('yawf-display', 'display-hidden');
    else feed.querySelector('[node-type="followNum"]').textContent = sonCount;
    // 如果下面更多的按钮已经没用了，就藏起来吧
    var foldSonCount = feed.querySelectorAll('[node-type="feed_list_wrapForward"] .WB_feed_type:not([yawf-display$="-hidden"])').length;
    if (foldSonCount === 0 && feed.querySelector('[node-type="feed_list_wrapForward"]')) {
      feed.querySelector('.WB_feed_together').setAttribute('yawf-sonfold', 'display');
    }
  };
  reorder();
  recount();
};

// 隐藏的微博直接从列表中去掉，减少开销是次要的，主要是兼容 v6 的 jk 按键
filter.fix.hidden = function (feed) {
  if (feed.getAttribute('yawf-display').lastIndexOf('-hidden') === -1) return;
  setTimeout(function () { feed.parentNode.removeChild(feed); }, 100);
};

// 真正微博过滤的核心模块
filter.active = function (feed) {
  (util.version.chose(function () {
    // 同源合并的微博
    var sonFeeds = Array.from(feed.querySelectorAll('[node-type="feed_list"] .WB_feed_type:not([yawf-display])'));
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
      action = filter.rules.parse(feed) || 'unset';
      // 如果父微博被屏蔽或折叠，那么就把下面一条没被屏蔽的拉上来换个位置
      if (!needSwap(action)) break;
      setAction(filter.fix.swap(feed, sonFeeds.pop()), action);
    }
    parentAction = action;
    // 最后处理所有下面的子微博
    var fixSonWeibo = function (son) {
      var action = filter.rules.parse(son) || 'unset';
      setAction(son, action);
      // 如果一列里面有白名单的，那么把白名单的特别换到外面去
      if (parentAction !== 'show' && action === 'show') {
        setAction(filter.fix.swap(feed, son), parentAction);
        parentAction = action;
      }
    };
    while (sonFeeds.length) fixSonWeibo(sonFeeds.shift());
    setAction(feed, parentAction);
    // 修一下转发合并和折叠展开
    filter.fix.son(feed);
    filter.fix.fold(feed);
  }, function () {
    // 新版当前不支持对同源转发合并微博的处理
    var son = Array.from(feed.querySelectorAll('.WB_sonFeed .WB_feed_detail'));
    ([feed]).concat(son).forEach(function (feed, index) {
      var action = filter.rules.parse(feed, !!index) || 'unset';
      feed.setAttribute('yawf-display', 'display-' + action);
      filter.fix.fold(feed);
      filter.fix.hidden(feed);
    });
  })());
};

// 按类型过滤器函数
filter.typed = {};

// 根据选择类型不同生成一些存取设置的函数
filter.typed.config = (function () {
  // 字符串
  var baseConfig = function (type) {
    return function (item) {
      var skey = item.key;
      if (item.internal) skey = skey.replace(/\.([^\.]*)$/, '._$1');
      if (!item.getconf) item.getconf = function () {
        return (item.conf = util.config.get(skey, item['default'] || type(), type));
      };
      if (!item.putconf) item.putconf = function (conf) {
        return util.config.put(skey, item.conf = conf);
      };
      util.config.reg(skey);
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
    if (item.extent && Array.isArray(item.extent)) {
      if (!item.extentconf) {
        item.extentconf = function (words) {
          if (item.add) words = words.map(item.add.bind(item));
          item.extent = item.extent.concat(words);
        };
      }
      filter.extent.reg(item.key, item.extentconf);
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

// 根据不同类型生成带有事件的文档节点
filter.typed.dom = (function () {
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
        text = util.str.fill(item.text || '', etext).replace(/\|\|/g, html['||']).replace(/\|/g, html['|']);
        if (hasInput && text.indexOf(inp) === -1) text = inp + text;
        outer = util.str.fill(html['config' + base], { 'text': text }, item, etext);
      }
      if (hasInput) inner = util.str.fill(html['config' + base + 'Input'], item, etext);
      var line = outer.replace(inp, inner);
      // 在需要引用其他控件的地方留空
      if (!item.nogui) line = line.replace(/{{<([a-zA-Z0-9_-]*)>}}/g, function (m, p) {
        return ref[p] ? util.str.fill(html.configPrefill, { 'id': p }) : m;
      });
      // 构造基本的文档
      var dom = util.dom.create(line);
      // 将引用的设置控件填回
      var pf = Array.from(dom.querySelectorAll('span.yawf-configPrefill'));
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
  // 一个空的 label
  var label = base('Label');

  // 真假值的设置项
  var boolean = base('Boolean', function (dom, item) {
    util.dom.bind.checkbox(dom.querySelector('input'), item);
  });

  // 选择框设置项
  var select = base('Select', function (dom, item) {
    var select = dom.querySelector('select');
    var defaultValue = item['default'] || item.select.key;
    var keys = item.select.map(function (option) {
      select.appendChild(util.dom.create('select', util.str.fill(html.option, option)).firstChild);
      return option.value;
    });
    util.dom.bind.select(select, item, function (val) {
      return keys.indexOf(val) === -1 ? defaultValue : val;
    });
  });

  // 字符串的设置项
  var string = base('String', function (dom, item) {
    var textarea = dom.querySelector('textarea');
    var onchange = util.dom.bind.text(textarea, item);
    textarea.addEventListener('keyup', function () {
      util.func.call(onchange);
    });
  });

  // 颜色的设置项
  var color = base('Color', function (dom, item) {
    util.dom.bind.text(dom.querySelector('input'), item);
  });

  // 数字的设置项
  var number = base('Number', function (dom, item) {
    var number = dom.querySelector('input');
    var max = Infinity, min = -Infinity;
    if ('max' in item) max = item.max;
    if ('min' in item) min = item.min;
    if (min > max) min = max;
    number.min = min; number.max = max;
    util.dom.bind.text(number, item, function (val) {
      if (isNaN(Number(val))) return (val = 0);
      return Math.min(max, Math.max(min, Number(val)));
    });
  });

  // 字符串数组设置项模板
  var items = function (base, genli) {
    var item = this, etext = {};
    if (item.i18n && item.i18n.local) etext = item.i18n.local;
    var dom = util.dom.create(util.str.fill(base, item, etext));
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
        var del = li.querySelector('a.icon_close, a.ficon_close');
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
      else callback(str, util.dom.create('ul', util.str.fill(html.configStringsItem, { 'item': item.display ? item.display(str) : str })).firstChild);
    });
  };

  // 用户列表的设置项
  var users = function () {
    return items.call(this, html.configUsers, function (item, userinput, str, callback) {
      var showUserNotExistError = function () {
        util.ui.alert('yawf-user-not-exist', {
          'title': util.str.fill('{{accountNotExistErrorTitle}}'),
          'text': util.str.fill('{{{accountNotExistError}}}', { 'name': util.str.escape.xml(str) }),
          'icon': 'error'
        });
        callback();
      };
      if (userinput) {
        if (!(str = str.trim().replace(/^@/, ''))) return callback();
        network.account.name(str, function (info) {
          if (!info) showUserNotExistError();
          else if (item.add && !item.add(info)) callback();
          else callback(info.id, util.dom.create('ul', util.str.fill(html.configUsersItem, info)).firstChild);
        }, showUserNotExistError);
      } else {
        var emptyInfo = { 'id': str, 'name': ' ', 'avatar': ' ' };
        var li = util.dom.create('ul', util.str.fill(html.configUsersItem, emptyInfo)).firstChild;
        callback(str, li);
        network.account.id(str, function (info) {
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
    var onchange = util.dom.bind.text(n, item, function (val) {
      if (isNaN(parseInt(val))) return item['default'] || item.min;
      var ret = Math.min(Math.max(parseInt(val), item.min), item.max);
      return Math.round((ret - item.min) / step) * step + item.min;
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
    var copyName = function () { s.textContent = util.keyboard.name(Number(i.value)); };
    var eventClear = function (e) { e.stopPropagation(); e.preventDefault(); };
    var valid = function (key) { if (key === 27) return 0; return key; };
    var onchange = util.dom.bind.text(i, item, function (val) {
      util.func.call(copyName); return Number(val);
    });
    dom.addEventListener('keydown', function (e) {
      var val = valid(util.keyboard.get(e));
      i.value = val;
      copyName();
      onchange();
      eventClear(e);
    }, false);
    dom.addEventListener('keyup', eventClear, false);
    dom.addEventListener('keypress', eventClear, false);
    i.addEventListener('change', copyName);
    util.func.call(copyName);
  });

  return {
    'subtitle': subtitle,
    'text': text,
    'remark': remark,
    'label': label,
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

filter.collection = {};
// 过滤器管理器
filter.collection.group = (function () {
  var list = [], preinit = true;
  // 添加到表格中
  var add = function (details) {
    list.push(details);
    if (!preinit) details.init();
    return details;
  };
  // 网页加载完毕时初始化
  util.init(function () {
    list.forEach(function (x) { x.init(); });
    preinit = false;
  }, util.priority.DEFAULT + util.priority.BEFORE);
  return {
    'add': add,
    'list': list,
  };
}());

// 过滤器集合
filter.collection.item = (function () {
  var items = [], grouped = {};
  // 注册一个过滤器，通过 filter.item 调用
  var add = function (item) {
    items.push(item);
    var group = grouped[item.group] = grouped[item.group] ||
      { 'title': null, 'items': [] };
    if (item.type === 'subtitle') group.title = group.title || item;
    else group.items.push(item);
    return item;
  };
  // 初始化所有过滤器
  util.init(function () {
    items.forEach(function (item) {
      util.func.catched(item._init)();
    });
  }, util.priority.DEFAULT);
  // 根据分组重新排列设置界面的若干设置项
  var order = function (items) {
    var sorted = [], item, i, j;
    items = items.map(function (x) { return [false, x]; });
    items = items.filter(function (x) { return x[1].type === 'subtitle'; })
      .concat(items.filter(function (x) { return x[1].type !== 'subtitle'; }));
    for (i = 0; i < items.length; i++) {
      if (items[i][0]) continue;
      sorted.push(item = items[i][1]);
      if (!item.group || item.type !== 'subtitle') continue;
      for (j = i + 1; j < items.length; j++) if (item.group === items[j][1].group) {
        items[j][0] = true;
        if (items[j][1].type !== 'subtitle') sorted.push(items[j][1]);
      }
    }
    return sorted;
  };
  var list = function (matcher) {
    if (!matcher) return items.slice(0, items.length);
    var found = [];
    items.filter(matcher).forEach(function (item) {
      found.push(item);
      if (item.group) {
        if (item.type === 'subtitle') found.push(grouped[item.group].items);
        else found.push(grouped[item.group].title);
      }
    });
    found = found.filter(function (item, index) {
      return found.indexOf(item) === index;
    });
    return order(found);
  };
  return {
    'list': list,
    'order': order,
    'add': add,
  };
}());

// 过滤器组
filter.group = function (groupName) {
  var items = [], defaultGroup = 'default';
  // 向过滤器组里面添加一个过滤器
  var add = function (item) {
    if (!item.group) {
      if (item.type === 'subtitle') defaultGroup = item.text;
      item.group = defaultGroup;
    } else defaultGroup = item.group;
    items.push(item); return item;
  };
  // 网页被初始化时初始化所有过滤器
  var init = function () { };
  // 需要显示选项时生成界面
  var show = function (inner) {
    items = filter.collection.item.order(items);
    items.forEach(function (item) { item._show(inner); });
  };
  // 注册到过滤器分组
  var group = {
    'name': groupName,
    'show': show,
    'init': init,
    'add': add
  };
  return filter.collection.group.add(group);
};
filter.groups = {};

// 过滤器组
filter.item = function (item) {
  // 先加入所有被引用的对象
  if (item.ref) Object.keys(item.ref).forEach(function (key) {
    item.ref[key].key = item.key + '.' + key;
    item.ref[key].nogui = true;
    filter.item(item.ref[key]);
  });
  // 初始化函数
  item._init = function () {
    // 初始化过滤器的设置
    if (item.type && filter.typed.config[item.type])
      item.conf = filter.typed.config[item.type](item);
    // 初始化过滤器内的文本
    if (item.i18n) util.i18n.chose(item.i18n);
    // 初始化过滤器的显示
    if (!item.show && item.type && filter.typed.dom[item.type])
      item.show = filter.typed.dom[item.type].bind(item);
    // 过滤器自己的初始化
    if (item.init) item.init();
    // 真假设置项若设置激活时调用
    if (item.type === 'boolean' && item.conf && item.ainit) item.ainit();
    // 将规则加入到列表中
    if (item.rule) filter.rules.add(item.priority || 0, item.rule.bind(item));
  };
  item._show = util.func.catched(function (inner) {
    if (item.nogui) return;
    var dom = item.show && item.show(dom) || null;
    if (dom && item.shown) item.shown(dom);
    if (dom) inner.appendChild(dom);
    return dom;
  });
  item.addto = function (group) {
    item.grouped = (item.grouped || []).concat([group]);
    group.add(item); return item;
  };
  return filter.collection.item.add(item);
};
filter.items = {};

// 预置过滤器类型
filter.predef = {};

// 白名单、黑名单和折叠名单一式三份
filter.predef.wbfc = function (details, typedFilterGroup) {
  var items = [
    { 'type': 'whitelist', 'priority': 1e5, 'action': 'show' },
    { 'type': 'blacklist', 'priority': 0, 'action': 'hidden' },
    { 'type': 'foldlist', 'priority': -1e5, 'action': 'fold' },
  ], rules;
  if (typedFilterGroup) {
    rules = filter.items[typedFilterGroup.name][details.name] = {};
  } else {
    typedFilterGroup = filter.predef.group(details.name);
    rules = filter.items[details.name] = {};
  }
  rules.title = filter.item({ 'group': details.name, 'type': 'subtitle', 'text': '{{' + details.name + 'FilterDetails}}' }).addto(typedFilterGroup);
  items.forEach(function (item) {
    // 过滤器
    var rule = {
      'group': details.name,
      'version': details.version,
      'type': details.type || 'strings',
      'key': 'weibo.filters.' + details.name + '.' + item.type,
      'priority': item.priority,
      'text': '{{{' + item.type + 'FilterDesc}}}<br />{{' + details.name + 'FilterDesc}}',
      'typed': '{{' + details.name + 'FilterDetails}}',
      'extent': [],
      'shown': function (dom) {
        dom.querySelector('.yawf-configDesc').classList.add('yawf-' + item.type + 'FilterTitle');
      },
    };
    if (details.add) rule.add = details.add.bind(rule);
    if (details.display) rule.display = details.display.bind(rule);
    rule.rule = details.rule.bind(rule, item.action);
    if (details[item.type]) {
      Object.keys(details[item.type]).forEach(function (override) {
        rule[override] = details[item.type][override](rule[override]);
      });
    }
    rules[item.type] = filter.item(rule).addto(typedFilterGroup);
  });
  // 快速创建过滤器的拖动
  if (details.fast) {
    filter.fast.item({
      'validator': details.fast.validator,
      'recognizer': details.fast.recognizer,
      'description': details.fast.description,
      'rawvalue': function (val) {
        var value = details.fast.add(val);
        if (details.add) value = details.add(value);
        return value;
      },
      'addconf': function (value, action) { rules[action].addconf(value); },
      'contextmenu': details.fast.contextmenu,
      'menudesc': details.fast.menudesc,
      'menugrouped': details.fast.menugrouped,
    });
  }
  return typedFilterGroup;
};

// 新建一个设置标签页
filter.predef.group = function (name) {
  filter.groups[name] = filter.group(name);
  filter.groups[name].items = filter.items[name] = {};
  return filter.groups[name];
};

// 快速创建过滤器的描述
filter.fast.description = {};
// 快速创建一个关键词或正则式的过滤器时的可编辑单选框
filter.fast.description.radioed = function (name, type, attr, chosen) {
  return function (inner, val) {
    inner.innerHTML = util.str.fill('{{{' + type + 'FilterFast}}}');
    var labelc = util.dom.create(html.fastFilterString);
    var fillArg = {}; fillArg[attr] = html.fastFilterStringInput;
    labelc.querySelector('span').innerHTML = util.str.fill('{{{' + type + 'FilterFastInput}}}', fillArg);
    var input = labelc.querySelector('input'); input.value = val[attr];
    var ref = inner.parentNode; ref.parentNode.insertBefore(labelc, ref.nextSibling);
    input.addEventListener('change', function () { val[attr] = input.value; });
    var checkbox = ref.parentNode.querySelector('input[type=checkbox]');
    checkbox.type = 'radio'; checkbox.name = 'yawf-fast-' + name;
    return chosen;
  };
};

// 快速创建关键词过滤器相关函数
filter.fast.content = {};
filter.fast.content.validator = function (element) {
  if (element.nodeType !== Node.TEXT_NODE) return false;
  return util.dom.matches(element.parentNode, '.WB_text, .WB_text *');
};
filter.fast.content.recognizer = {};
filter.fast.content.recognizer.keyword = function keyword(element, callback) {
  if (element.nodeType === Node.TEXT_NODE)
    callback({ 'text': element.textContent });
  else if (element.tagName && ['a', 'img'].indexOf(element.tagName.toLocaleLowerCase()) !== -1)
    callback();
  else if (element.firstChild === element.lastChild)
    keyword(element.firstChild, callback);
  else callback();
};
filter.fast.content.recognizer.regexp = function (element, callback) {
  filter.fast.content.recognizer.keyword(element, function (val) {
    if (val && val.text) callback({ 'text': util.str.escape.regexp(val.text) });
    else callback();
  });
};
filter.fast.content.add = function (val) { return val.text; };

// 快速创建帐号过滤器相关函数
filter.fast.account = {};
filter.fast.account.validator = function (element) {
  var c = util.dom.create('body', element.outerHTML);
  // 可以处理对用户的链接
  if (c.querySelector('[usercard*="name="], [usercard*="id="]')) return true;
  // 用户卡片里面的头像和链接
  if (c.querySelector('[uid][title]')) return true;
  // 可以处理用户页面的头像和链接
  var name = document.querySelector('.pf_name .name');
  if (name && name.textContent && name[0] !== '#' && unsafeWindow.$CONFIG.oid &&
    util.dom.matches(element, '.B_profile .pf_head_pic img, .B_profile .pf_lin')) return true;
  return false;
};
filter.fast.account.recognizer = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) { callback(); return; }
  var c = util.dom.create('body', element.outerHTML);
  var info = { 'name': null, 'id': null };
  var oid = unsafeWindow.$CONFIG.oid;
  // 如果是用户链接的话
  var usercard = c.querySelector('[usercard*="name="], [usercard*="id="]');
  if (usercard) (function () {
    var ucinfo = util.str.parsearg(usercard.getAttribute('usercard'));
    if (ucinfo.name) info.name = ucinfo.name;
    if (ucinfo.id) info.id = ucinfo.id;
  }());
  // 用户卡片
  var uid = c.querySelector('[uid][title]');
  if (uid) {
    info.id = uid.getAttribute('uid');
    info.name = uid.getAttribute('title');
  }
  // 如果是头像或者链接的话
  if (oid) (function () {
    var link = c.querySelector('a.pf_lin');
    if (link) info.id = oid;
    var img = c.querySelector('img');
    var ref = document.querySelector('.B_profile .pf_head_pic img');
    if (img && ref && img.src === ref.src) info.id = oid;
  }());
  // 看我们是否有 id 或者 name，如果有的话，那么就说明是个用户
  if (info.id && info.name) callback(info);
  else if (info.id) network.account.id(info.id, callback, callback);
  else if (info.name) network.account.name(info.name, callback, callback);
  else callback();
};
filter.fast.account.addname = function (val) { return val.name; };
filter.fast.account.addid = function (val) { return val.id; };

// 快速创建话题过滤器相关函数
filter.fast.topic = {};
filter.fast.topic.validator = function (element) {
  return filter.fast.topic.recognizer.topic(element, Boolean);
};
filter.fast.topic.recognizer = {};
filter.fast.topic.recognizer.topic = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  var topic = c.querySelector('a.a_topic, a[suda-uatrack*="hottopic_r1"], a[suda-uatrack*="hottopic_r2"], a[suda-uatrack*="1022-topic"]');
  if (topic) return callback({ 'topic': topic.textContent.trim().replace(/#/g, '') });
  else return callback();
};
filter.fast.topic.recognizer.rtopic = function (element, callback) {
  return filter.fast.topic.recognizer.topic(element, function (val) {
    if (val && val.topic) callback({ 'topic': util.str.escape.regexp(val.topic) });
    else callback();
  });
};
filter.fast.topic.add = function (val) { return val.topic; };

// 快速创建话题过滤器相关函数
filter.fast.source = {};
filter.fast.source.validator = function (element) {
  return filter.fast.source.recognizer(element, Boolean);
};
filter.fast.source.recognizer = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  var source = c.querySelector('[action-type="app_source"], ' +
  '[suda-data="key=tblog_home_new&value=feed_come_from"], a[href$="&from=feed_card"]');
  source = source && (source.getAttribute('title') || source.textContent || text.sourceUnkown);
  if (source && source !== text.defaultSource) return callback({ 'source': source });
  else return callback();
};
filter.fast.source.add = function (val) { return val.source; };

// 快速创建超链接过滤器的相关函数
filter.fast.hyperlink = {};
filter.fast.hyperlink.validator = function (element) {
  return filter.fast.hyperlink.recognizer(element, Boolean);
};
filter.fast.hyperlink.recognizer = function (element, callback) {
  if (element.nodeType === Node.TEXT_NODE) return callback();
  var c = util.dom.create('body', element.outerHTML);
  var link = c.querySelector('a[title][href^="http://t.cn/"]');
  if (link) {
    var host = util.str.host(link.getAttribute('title'));
    if (host !== 'weibo.com') return callback({ 'host': host });
  }
  return callback();
};
filter.fast.hyperlink.add = function (val) { return val.host; };

var weibo = {};

// 选取微博内容、微博转发的内容
weibo.content = function (feed, f) {
  var content = feed.querySelector('[node-type="feed_list_content"]');
  var reason = feed.querySelector(util.version.chose('[node-type="feed_list_reason"] em', '[node-type="feed_list_reason"]'));
  var items = [];
  if (content) items = items.concat(Array.from(f(content)));
  if (reason) items = items.concat(Array.from(f(reason)));
  return items;
};

// 从一条微博中获取他的文本
weibo.text = (function () {
  var active = [function (node) {
    if (node.nodeType === Node.TEXT_NODE) return node.textContent;
  }];
  // 获取特定元素的文本
  var types = {};
  types.mention = function (node) {
    if (util.dom.matches(node, 'a[usercard]')) return node.textContent;
  };
  types.topic = function (node) {
    if (util.dom.matches(node, 'a.a_topic')) return node.textContent.trim();
  };
  types.link = function (node) {
    if (util.dom.matches(node, 'a[mt="url"]')) return node.getAttribute('title');
  };
  types.emotion = function (node) {
    if (util.dom.matches(node, 'img[alt]')) return node.getAttribute('alt');
  };
  var match = function (feed) {
    return weibo.content(feed, function (m) {
      return Array.from(m.childNodes).map(function (node) {
        for (var i = 0, l = active.length; i < l; i++) {
          var val = null;
          try { val = active[i](node); } catch (e) { util.debug(e); }
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

// 从一条微博中找到头像
weibo.avatar = function (feed) {
  return feed.querySelector('.WB_face img').src;
};

// 从一条微博中找到他的作者
weibo.author = {};
weibo.author.dom = function (feed) {
  return feed.querySelector('.WB_detail>.WB_info>.WB_name[usercard], .WB_detail>.WB_info>.W_fb[usercard]') ||
    feed.querySelector('.WB_text>a.W_fb[usercard]:first-child');
};
weibo.author.id = function (feed) {
  var author = weibo.author.dom(feed);
  if (!author) return null;
  return author.getAttribute('usercard').split('=')[1];
};
weibo.author.name = function (feed) {
  var author = weibo.author.dom(feed);
  if (!author) return null;
  return author.textContent.trim();
};

// 从一条微博中找到他的原作者
weibo.original = {};
weibo.original.dom = function (feed) {
  return feed.querySelector('.WB_media_expand .WB_info .WB_name, .WB_expand .WB_info .W_fb');
};
weibo.original.id = function (feed) {
  var originalAuthor = weibo.original.dom(feed);
  if (!originalAuthor) return null;
  return originalAuthor.getAttribute('usercard').split('=')[1];
};
weibo.original.name = function (feed) {
  var originalAuthor = weibo.original.dom(feed);
  if (!originalAuthor) return null;
  return originalAuthor.textContent.trim().replace(/^@/, '');
};
weibo.original.text = function (feed) {
  if (util.v6) {
    return feed.querySelector('.WB_expand .WB_text').textContent;
  } else {
    return feed.querySelector('.WB_media_expand .WB_text').textContent;
  }
};

// 找到在一条微博里面被提到的人的昵称
weibo.mentions = {};
weibo.mentions.dom = function (feed) {
  return weibo.content(feed, function (m) {
    return Array.from(m.querySelectorAll('a[usercard^="name="][href$="loc=at"]'));
  });
};
weibo.mentions.name = function (feed) {
  return weibo.mentions.dom(feed).map(function (link) {
    return link.getAttribute('usercard').slice('name='.length);
  });
};

// 找到在一条微博里面提到的所有话题
weibo.topics = {};
weibo.topics.dom = function (feed) {
  return weibo.content(feed, function (m) {
    return Array.from(m.querySelectorAll('.a_topic'));
  });
};
weibo.topics.text = function (feed) {
  return weibo.topics.dom(feed)
    .map(function (topic) { return topic.textContent; });
};

// 获取一条微博的所有来源（包括转发）
weibo.sources = {};
weibo.sources.dom = function (feed) {
  return Array.from(feed.querySelectorAll([
    '.WB_from [suda-data="key=tblog_home_new&value=feed_come_from"]',
    '.WB_from [action-type="app_source"]',
    '.WB_from a[href$="&from=feed_card"]',
  ].join(',')));
};
weibo.sources.text = function (feed) {
  return weibo.sources.dom(feed).map(function (st) {
    return st.getAttribute('title') || st.textContent || text.sourceUnkown;
  }).filter(Boolean);
};

// 从一条微博中找到所有超链接
weibo.hyperlinks = {};
weibo.hyperlinks.dom = function (feed) {
  return weibo.content(feed, function (m) {
    return Array.from(m.querySelectorAll('a[title][href^="http://t.cn/"]'));
  });
};
weibo.hyperlinks.text = function (feed) {
  return weibo.hyperlinks.dom(feed)
    .map(function (a) { return a.getAttribute('title'); });
};

filter.predef.group('content');

// 关键字过滤
filter.predef.wbfc({
  'name': 'keyword',
  'version': 1,
  'add': function (s) { return s.trim(); },
  'rule': function keywordMatch(action, feed) {
    var keywords = this.conf.concat(this.extent);
    var texts = weibo.text(feed).toUpperCase();
    var match = keywords.some(function (keyword) {
      if (!keyword) return false;
      if (texts.indexOf(keyword.toUpperCase()) === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.keywordFilterReason, { 'detail': keyword }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.content.validator,
    'recognizer': filter.fast.content.recognizer.keyword,
    'add': filter.fast.content.add,
    'description': filter.fast.description.radioed('content', 'keyword', 'text', true),
  }
}, filter.groups.content);

// 按照正则式过滤
filter.predef.wbfc({
  'name': 'regexp',
  'version': 8,
  'add': util.str.addregex,
  'display': function (s) { return '/' + s + '/'; },
  'rule': function regexpMatch(action, feed) {
    var regexen = this.conf.concat(this.extent).map(util.str.compregex).filter(Boolean);
    var texts = weibo.text(feed);
    var match = regexen.some(function (regexp) {
      if (!regexp.exec(texts)) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.regexpFilterReason, { 'detail': regexp + '' }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.content.validator,
    'recognizer': filter.fast.content.recognizer.regexp,
    'add': filter.fast.content.add,
    'description': filter.fast.description.radioed('content', 'regexp', 'text', false),
  }
}, filter.groups.content);

// 关于正则式的说明
filter.items.content.regexp.remark = filter.item({
  'group': 'regexp',
  'type': 'remark',
  'text': '{{regexpFilterRemark}}',
}).addto(filter.groups.content);

// 其他被视为内容的元素
filter.items.content.elements = {};
filter.items.content.elements.title = filter.item({
  'group': 'content',
  'type': 'subtitle',
  'text': '{{contentTypesTitle}}',
}).addto(filter.groups.content);

(function (types) {
  var ts = Object.keys(types);
  ts.forEach(function (t) {
    var tt = t[0].toUpperCase() + t.slice(1);
    filter.items.content.elements[t] = filter.item({
      'group': 'content',
      'version': 52,
      'type': 'boolean',
      'text': '{{contentTypes' + tt + '}}',
      'key': 'weibo.content.types_' + t,
      'default': types[t],
      'ainit': function () {
        weibo.text.active(t);
      },
    }).addto(filter.groups.content);
  });
}({
  'mention': true,
  'topic': true,
  'link': false,
  'emotion': false,
}));

// 作者用户过滤
filter.groups.account = filter.predef.wbfc({
  'name': 'account',
  'version': 4,
  'type': 'users',
  'rule': function accountMatch(action, feed) {
    var accounts = this.conf.concat(this.extent), id = weibo.author.id(feed);
    if (!id) return null;
    var match = accounts.some(function (x) { return x === id; });
    if (match) feed.setAttribute('yawf-reason', util.str.fill(text.accountFilterReason, { 'detail': weibo.author.name(feed) }));
    if (match) return action; else return null;
  },
  'blacklist': {
    'rule': function accountMatchBlacklistOverride(_super) {
      return function accountMatchBlacklist(feed) {
        if (!filter.items.other.grouping.group_account.conf || !util.page.group()) return _super(feed);
        return null;
      };
    },
  },
  'fast': {
    'validator': filter.fast.account.validator,
    'recognizer': filter.fast.account.recognizer,
    'add': filter.fast.account.addid,
    'description': function (dom, val) {
      dom.innerHTML = util.str.fill('{{{accountFilterFast}}}', { 'name': util.str.escape.xml(val.name) });
      return true;
    },
    'contextmenu': weibo.author.dom,
    'menudesc': function (author) {
      return util.str.fill(text.accountFilterContextMenu, { 'name': author.textContent.trim() });
    },
  }
});

filter.items.account.remark = filter.item({
  'group': 'account',
  'type': 'remark',
  'text': '{{accountFilterRemark}}',
}).addto(filter.groups.account);

// 原创用户过滤
filter.groups.original = filter.predef.wbfc({
  'name': 'original',
  'version': 4,
  'type': 'users',
  'rule': function originalMatch(action, feed) {
    var originals = this.conf.concat(this.extent), id = weibo.original.id(feed);
    if (!id) return null;
    var match = originals.some(function (x) { return x === id; });
    if (match) feed.setAttribute('yawf-reason', util.str.fill(text.originalFilterReason, { 'detail': weibo.original.name(feed) }));
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.account.validator,
    'recognizer': filter.fast.account.recognizer,
    'add': filter.fast.account.addid,
    'description': function (dom, val) {
      dom.innerHTML = util.str.fill('{{{originalFilterFast}}}', { 'name': util.str.escape.xml(val.name) });
      return true;
    },
    'contextmenu': function (feed) { return weibo.original.dom(feed) || []; },
    'menudesc': function (original) {
      return util.str.fill(text.originalFilterContextMenu, { 'name': original.textContent.trim().replace(/^@/, '') });
    },
  }
});

// 提到某人的微博
filter.groups.mention = filter.predef.wbfc({
  'name': 'mention',
  'version': 4,
  'type': 'strings',
  'add': function (s) { return s.trim().replace(/^@/, ''); },
  'display': function (s) { return '@' + s; },
  'rule': function mentionMatch(action, feed) {
    var mentions = this.conf.concat(this.extent), users = weibo.mentions.name(feed);
    var match = users.some(function (name) {
      var index = mentions.indexOf(name);
      if (index === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.mentionFilterReason, { 'detail': mentions[index] }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.account.validator,
    'recognizer': filter.fast.account.recognizer,
    'add': filter.fast.account.addname,
    'description': function (dom, val) {
      dom.innerHTML = util.str.fill('{{{mentionFilterFast}}}', { 'name': util.str.escape.xml(val.name) });
      return true;
    },
    'contextmenu': weibo.mentions.dom,
    'menugrouped': '{{mentionFilterContextMenuGroup}}',
    'menudesc': function (mention) {
      return util.str.fill(text.mentionFilterContextMenu, { 'name': mention.textContent.trim().replace(/^@/, '') });
    },
  }
});

// 话题过滤
filter.predef.group('topic');

filter.predef.wbfc({
  'name': 'topic',
  'version': 2,
  'add': function (s) { return s.trim().replace(/#/g, ''); },
  'display': function (s) { return '#' + s + '#'; },
  'rule': function topicMatch(action, feed) {
    var topics = this.conf.concat(this.extent);
    var topicText = weibo.topics.text(feed).join('##');
    var match = topics.some(function (topic) {
      if (topicText.indexOf(topic) === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.topicFilterReason, { 'detail': topic }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.topic.validator,
    'recognizer': filter.fast.topic.recognizer.topic,
    'add': filter.fast.topic.add,
    'description': filter.fast.description.radioed('topic', 'topic', 'topic', true),
    'contextmenu': weibo.topics.dom,
    'menugrouped': '{{topicFilterContextMenuGroup}}',
    'menudesc': function (topic) {
      return util.str.fill(text.topicFilterContextMenu, { 'topic': topic.textContent.trim().replace(/#/g, '') });
    },
  }
}, filter.groups.topic);

// 正则话题
filter.predef.wbfc({
  'name': 'rtopic',
  'version': 52,
  'add': util.str.addregex,
  'display': function (s) { return '/' + s + '/'; },
  'rule': function rtopicMatch(action, feed) {
    var regexen = this.conf.concat(this.extent).map(util.str.compregex).filter(Boolean);
    var topics = weibo.topics.text(feed);
    var match = regexen.some(function (regexp) {
      return topics.some(function (topic) {
        if (!regexp.exec(topic)) return false;
        feed.setAttribute('yawf-reason', util.str.fill(text.rtopicFilterReason, { 'detail': regexp + '' }));
        return true;
      });
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.topic.validator,
    'recognizer': filter.fast.topic.recognizer.rtopic,
    'add': filter.fast.topic.add,
    'description': filter.fast.description.radioed('topic', 'rtopic', 'topic', false),
  }
}, filter.groups.topic);

// 来源过滤
filter.groups.source = filter.predef.wbfc({
  'name': 'source',
  'version': 2,
  'add': function (s) {
    s = s.trim();
    if (s === text.defaultSource) {
      util.ui.alert('yawf-source-filter-warning', {
        'title': util.str.fill('{{sourceFilterWarningTitle}}'),
        'text': util.str.fill('{{sourceFilterWarning}}'),
        'icon': 'error'
      });
      s = null;
    }
    return s;
  },
  'rule': function sourceMatch(action, feed) {
    var sources = this.conf.concat(this.extent), _sources = weibo.sources.text(feed);
    var match = _sources.some(function (s) {
      if (sources.indexOf(s) === -1) return false;
      feed.setAttribute('yawf-reason', util.str.fill(text.sourceFilterReason, { 'detail': s }));
      return true;
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.source.validator,
    'recognizer': filter.fast.source.recognizer,
    'add': filter.fast.source.add,
    'description': function (dom, val) {
      dom.innerHTML = util.str.fill('{{{sourceFilterFast}}}', { 'source': util.str.escape.xml(val.source) });
      return true;
    },
    'contextmenu': weibo.sources.dom,
    'menugrouped': '{{sourceFilterContextMenuGroup}}',
    'menudesc': function (source) {
      var text = null;
      filter.fast.source.recognizer(source, function (value) {
        if (value) text = util.str.fill('{{{sourceFilterContextMenu}}}', value);
      });
      return text;
    },
  }
});

// 超链接过滤
filter.groups.hyperlink = filter.predef.wbfc({
  'name': 'hyperlink',
  'version': 7,
  'add': function (s) { return s.trim(); },
  'rule': function hyperlinkMatch(action, feed) {
    var links = this.conf.concat(this.extent), _links = weibo.hyperlinks.text(feed);
    var match = _links.some(function (l) {
      return links.some(function (link) {
        if (l.indexOf(link) === -1) return false;
        feed.setAttribute('yawf-reason', util.str.fill(text.hyperlinkFilterReason, { 'detail': link }));
        return true;
      });
    });
    if (match) return action; else return null;
  },
  'fast': {
    'validator': filter.fast.hyperlink.validator,
    'recognizer': filter.fast.hyperlink.recognizer,
    'add': filter.fast.hyperlink.add,
    'description': function (dom, val) {
      dom.innerHTML = util.str.fill('{{{hyperlinkFilterFast}}}', { 'host': util.str.escape.xml(val.host) });
      return true;
    },
    'contextmenu': weibo.hyperlinks.dom,
    'menugrouped': '{{hyperlinkFilterContextMenuGroup}}',
    'menudesc': function (hyperlink) {
      return util.str.fill(text.hyperlinkFilterContextMenu, { 'host': util.str.host(hyperlink.getAttribute('title')) });
    },
  },
});

filter.predef.group('other');

filter.items.other.showthese = {};
filter.items.other.showthese.title = filter.item({
  'group': 'showthese',
  'type': 'subtitle',
  'text': '{{otherWhitelistTitle}}'
}).addto(filter.groups.other);

// 总是显示自己的微博
filter.items.other.showthese.my_weibo = filter.item({
  'group': 'showthese',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.my_weibo',
  'text': '{{showMyWeiboDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMyWeiboRule(feed) {
    if (!this.conf) return;
    if (weibo.author.id(feed) === util.info.uid) return 'showme'; else return null;
  },
}).addto(filter.groups.other);

// 总是显示自己原创的微博
filter.items.other.showthese.my_original = filter.item({
  'group': 'showthese',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.my_original',
  'text': '{{showMyOriginalDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMyOriginalRule(feed) {
    if (!this.conf) return;
    if (weibo.original.id(feed) === util.info.uid) return 'showme'; else return null;
  },
}).addto(filter.groups.other);

// 总是显示提到自己的微博
filter.items.other.showthese.mention_me = filter.item({
  'group': 'showthese',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.mention_me',
  'text': '{{showMentionMeDesc}}',
  'priority': 1e5 - 1e3, // 略低于白名单，但高于其他
  'rule': function showMentionMeRule(feed) {
    if (!this.conf) return;
    if (weibo.mentions.name(feed).indexOf(util.info.nick) !== -1) return 'showme'; else return null;
  },
}).addto(filter.groups.other);

filter.items.other.hidethese = {};
filter.items.other.hidethese.title = filter.item({
  'group': 'hidethese',
  'type': 'subtitle',
  'text': '{{otherBlacklistTitle}}'
}).addto(filter.groups.other);

// 推广微博
filter.items.other.hidethese.ad_feed = filter.item({
  'group': 'hidethese',
  'version': 2,
  'type': 'boolean',
  'key': 'weibo.other.ad_feed',
  'text': '{{adfeedFilterDesc}}',
  'priority': 1e5 + 1e3, // 优先于白名单
  'rule': function adFeedFilterRule(feed) {
    if (!this.conf) return null;
    return feed.getAttribute('feedtype') === 'ad' ? 'hidden' : null;
  },
}).addto(filter.groups.other);

// 粉丝头条
filter.items.other.hidethese.fans_top = filter.item({
  'group': 'hidethese',
  'version': 56,
  'type': 'boolean',
  'key': 'weibo.other.fans_top',
  'text': '{{fansTopFilterDesc}}',
  'priority': 1e5 + 1e3, // 优先于白名单
  'rule': function fansTopFilterRule(feed) {
    if (!this.conf) return null;
    if (util.v6) return feed.querySelector('[adcard="fanstop"]') ? 'hidden' : null;
    return feed.querySelector('[action-type="feed_list_fansTopFeed"]') ? 'hidden' : null;
  },
}).addto(filter.groups.other);

// 混入新鲜事流的其他东西
filter.items.other.hidethese.fake_weibo = filter.item({
  'group': 'hidethese',
  'version': 13,
  'type': 'boolean',
  'key': 'weibo.other.fake_weibo',
  'text': '{{fakeWeiboFilterDesc}}',
  'rule': function fakeWeiboFilterRule(feed) {
    if (!this.conf) return null;
    if (!feed.getAttribute('mid')) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 已删除或没有权限查看的微博的转发
filter.items.other.hidethese.deleted_forward = filter.item({
  'group': 'hidethese',
  'version': 11,
  'type': 'boolean',
  'key': 'weibo.other.deleted_forward',
  'text': '{{deletedForwardFilterDesc}}',
  'rule': function deletedForwardFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.getAttribute('isforward') === '1' &&
      !weibo.original.dom(feed)) return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 投票微博
filter.items.other.hidethese.vote_weibo = filter.item({
  'group': 'hidethese',
  'version': 11,
  'type': 'boolean',
  'key': 'weibo.other.vote_weibo',
  'text': '{{voteWeiboFilterDesc}}',
  'rule': function voteWeiboFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('.WB_from a[href^="http://vote.weibo.com/"]'))
      return 'hidden';
    if (feed.querySelector('.WB_feed_spec_cont a[action-data*="vote.weibo.com"]'))
      return 'hidden';
    if (feed.querySelector('.icon_sw_vote'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 淘宝/天猫商品
filter.items.other.hidethese.tb_tm_wb = filter.item({
  'group': 'hidethese',
  'version': 29,
  'type': 'boolean',
  'key': 'weibo.other.tb_tm_wb',
  'text': '{{taobaoTianmaoWeibo}}',
  'rule': function taobaoTianmaoFilterRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a .icon_fl_tb, a .icon_fl_tmall, a .icon_fl_ju'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 微话题微博
filter.items.other.hidethese.wei_huati = filter.item({
  'group': 'hidethese',
  'version': 104,
  'type': 'boolean',
  'key': 'weibo.other.wei_huati',
  'text': '{{huatiSourceWeibo}}',
  'rule': function huatiSourceWeiboRule(feed) {
    if (!this.conf) return null;
    if (feed.querySelector('a[suda-data="key=tblog_home_new&value=feed_come_from"][href*="huati.weibo.com"]'))
      return 'hidden';
    if (feed.querySelector('a[href*="http://weibo.com/p/"][href$="&from=feed_card"]'))
      return 'hidden';
    return null;
  },
}).addto(filter.groups.other);

// 自定义来源微博
filter.items.other.hidethese.customize_source = filter.item({
  'group': 'hidethese',
  'version': 104,
  'type': 'boolean',
  'key': 'weibo.other.customize_source',
  'text': '{{customizeSourceWeibo}}',
  'ref': {
    'action': {
      'type': 'select',
      'default': 'hidden',
      'select': [
        { 'value': 'hidden', text: '{{customizeSourceHidden}}' },
        { 'value': 'reset', text: '{{customizeSourceReset}}' },
      ],
    }
  },
  'rule': function customizeSourceRule(feed) {
    if (!this.conf) return null;
    if (util.v6) {
      var from = Array.from(feed.querySelectorAll('.WB_from'));
      from = from.filter(function (from) { return !from.querySelector('[action-type="app_source"]'); })
        .map(function (from) { return from.lastChild; });
      if (!from.length) return;
      if (this.ref.action.conf === 'hidden') return 'hidden';
      from.forEach(function (from) {
        from.textContent = util.str.fill(' {{weiboViaText}} ');
        var wb = util.dom.create(util.str.fill(html.weiboViaWeiboCom));
        from.parentNode.appendChild(wb);
      });
    } else {
      // 当前自定义来源微博与来自“微博 weibo.com”微博的唯一区别在于其中的文本
      var sources = Array.from(feed.querySelectorAll('a[action-type="app_source"][href="http://weibo.com/"]'));
      sources = sources.filter(function (source) { return source.textContent.trim() !== text.defaultSource; });
      if (sources.length) {
        if (this.ref.action.conf === 'hidden') return 'hidden';
        sources.forEach(function (source) {
          source.textContent = text.defaultSource;
        });
      }
    }
    return null;
  },
}).addto(filter.groups.other);

// 刷屏与版聊
filter.items.other.spam = {};
filter.items.other.spam.title = filter.item({
  'group': 'spam',
  'type': 'subtitle',
  'text': '{{otherSpammingTitle}}',
}).addto(filter.groups.other);

// 添加数量和折叠/隐藏的
filter.ref = {};
filter.ref.numact = function (defnum, defact, number, action, base) {
  base = base || {};
  base[number || 'number'] = {
    'type': 'number',
    'default': defnum || 3,
    'min': 1,
  };
  base[action || 'action'] = {
    'type': 'select',
    'default': defact || 'fold',
    'select': [
      { 'value': 'fold', 'text': '{{foldlistActionDesc}}' },
      { 'value': 'hidden', 'text': '{{blacklistActionDesc}}' },
    ]
  };
  return base;
};

// 相同帐号的过多微博
filter.items.other.spam.same_account = filter.item({
  'group': 'spam',
  'version': 25,
  'type': 'boolean',
  'priority': -1e6, // 低优先级
  'key': 'weibo.other.same_account',
  'ref': filter.ref.numact(5, 'fold'),
  'text': '{{sameAccountFilterDesc}}',
  'rule': function sameAccountRule(feed) {
    if (!this.conf) return null;
    // 如果在分组页面，而且用户设置了分组页面忽略该过滤器，则不工作
    if (filter.items.other.grouping.group_same_account.conf && util.page.group()) return null;
    var id = weibo.author.id(feed);
    if (!id) return;
    var number = document.querySelectorAll(
      // v5
      '[node-type="feed_list"] .WB_feed_type[yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])>.WB_feed_datail>.WB_detail>.WB_info>a.WB_name[usercard="id=' + id + '"]' + ',' +
      // v6
      '[node-type="feed_list"] .WB_feed_type[yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])>.WB_feed_detail>.WB_detail>.WB_info>.W_fb[usercard="id=' + id + '"]'
    ).length;
    if (number >= this.ref.number.conf) {
      feed.setAttribute('yawf-reason', text.sameAccountFilterReason);
      return 'account-' + this.ref.action.conf;
    } else return null;
  },
}).addto(filter.groups.other);

// 相同微博的过多转发
filter.items.other.spam.same_forward = filter.item({
  'group': 'spam',
  'version': 19,
  'type': 'boolean',
  'priority': -1e6, // 低优先级
  'key': 'weibo.other.same_forward',
  'ref': filter.ref.numact(3, 'fold'),
  'text': '{{sameForwardFilterDesc}}',
  'rule': function sameForwardRule(feed) {
    if (!this.conf) return null;
    var omid = feed.getAttribute('omid');
    if (!omid) return null;
    var number = document.querySelectorAll('[node-type="feed_list"] ' +
      '.WB_feed_type[omid="' + omid + '"][yawf-display]:not([yawf-display$="-fold"]):not([yawf-display$="-unfold"]):not([yawf-display$="-hidden"])').length;
    if (number >= this.ref.number.conf) {
      feed.setAttribute('yawf-reason', text.sameForwardFilterReason);
      return 'forward-' + this.ref.action.conf;
    } else return null;
  },
}).addto(filter.groups.other);

// 分组浏览
filter.item({
  'group': 'grouping',
  'type': 'subtitle',
  'text': '{{otherGroupTitle}}',
}).addto(filter.groups.other);
filter.items.other.grouping = {};

// 分组浏览不做按帐号隐藏
filter.items.other.grouping.group_account = filter.item({
  'group': 'grouping',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.group_account',
  'text': '{{accountByGroup}}',
}).addto(filter.groups.other);

// 分组浏览不做刷屏检查
filter.items.other.grouping.group_same_account = filter.item({
  'group': 'grouping',
  'version': 25,
  'type': 'boolean',
  'key': 'weibo.other.group_same_account',
  'text': '{{sameAccountByGroup}}',
}).addto(filter.groups.other);

// 脚本工具
filter.item({
  'group': 'scripttool',
  'type': 'subtitle',
  'text': '{{scriptToolsTitle}}',
}).addto(filter.groups.other);
filter.items.other.scripttool = {};

// 快速创建过滤器
filter.items.other.scripttool.use_fast_creator = filter.item({
  'group': 'scripttool',
  'version': 36,
  'type': 'boolean',
  'key': 'weibo.tool.use_fast_creator',
  'default': true,
  'text': '{{useFastCreator}}',
  'ainit': function () {
    filter.fast.active();
  },
}).addto(filter.groups.other);

if ('contextMenu' in document.createElement('div')) filter.items.other.scripttool.use_context_menu_creator = filter.item({
  'group': 'scripttool',
  'version': 99,
  'type': 'boolean',
  'key': 'weibo.tool.use_context_menu_creator',
  'default': true,
  'text': '{{useContextMenuCreator}}',
  'ainit': function () {
    filter.fast.right.active();
  },
}).addto(filter.groups.other);

// 屏蔽隐藏微博
filter.items.other.scripttool.block_hidden = filter.item({
  'group': 'scripttool',
  'version': 13,
  'type': 'boolean',
  'key': 'weibo.tool.block_hidden',
  'text': '{{blockHiddenWeiboDesc}}',
  'ainit': function () {
    observer.weibo.after(function (feed) {
      var display = feed.getAttribute('yawf-display');
      if (display !== 'display-hidden') return;
      var mid = feed.getAttribute('mid');
      if (!mid) return;
      network.weibo.block(mid);
      feed.setAttribute('yawf-block', 'block');
    });
  }
}).addto(filter.groups.other);

// 自动载入
filter.item({
  'group': 'autoload',
  'type': 'subtitle',
  'text': '{{autoLoadNewWeiboTitle}}',
}).addto(filter.groups.other);
filter.items.other.autoload = {};

// 自动加载新微博以避免被隐藏微博显示新微博提示
filter.items.other.autoload.auto_load_new_weibo = filter.item({
  'group': 'autoload',
  'version': 44,
  'type': 'boolean',
  'key': 'weibo.other.auto_load_new_weibo',
  'text': '{{autoLoadNewWeibo}}',
  // 展开新微博后添加和旧微博的分割线
  'timetip': (function () {
    var time0 = new Date(), tip = null;
    return function (feed) {
      (util.version.chose(function (feed) {
        if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
        var time = time0; time0 = new Date();
        time = Math.max(Math.round((time0 - time) / 6e4), 2);
        var min = time % 60, hour = (time - min) / 60;
        var text = '{{timeTipText}}';
        if (min) text = min + '{{timeTipMin}}' + text;
        if (hour) text = hour + '{{timeTipHour}}' + text;
        tip = util.dom.create(util.str.fill(html.feedTimeTip, { 'time': text }));
        feed.parentNode.insertBefore(tip, feed.nextSibling);
        setTimeout(function () {
          while (feed && !feed.clientHeight) feed = feed.previousSibling;
          if (feed) feed.classList.add('WB_feed_new');
        });
      }, function (feed) {
        var time = time0; time0 = new Date();
        var text = '{{timeTipText}}';
        if (tip && tip.parentNode) tip.parentNode.removeChild(tip);
        tip = util.dom.create(util.str.fill(html.feedTimeTip, { 'time': text }));
        tip.setAttribute('date', String(Number(time)));
        feed.parentNode.insertBefore(tip, feed.nextSibling);
      })(feed));
    };
  }()),
  // 显示新的微博
  'showNew': function () {
    var newFeed = document.querySelector('a.notes[yawf-id="feed_list_newBar"], div.WB_notes[yawf-id="home_new_feed_tip"]'); if (!newFeed) return;
    var feeds = Array.from(document.querySelectorAll('.WB_feed>.WB_feed_type[yawf-unread="hidden"]'));
    feeds.forEach(function (feed) {
      feed.setAttribute('yawf-unread', 'show');
      feed.classList.remove('WB_feed_new');
    });
    this.counter();
    this.timetip(feeds[feeds.length - 1]);
  },
  // 显示未读提示
  'counter': function () {
    var count = document.querySelectorAll(
      '.WB_feed>.WB_feed_type[yawf-unread="hidden"]:not([yawf-display$="-hidden"]):not([yawf-display$="-son"])' + ',' +
      '.WB_feed>.WB_feed_type_box_t>.WB_feed_type[yawf-unread="hidden"]:not([yawf-display$="-hidden"]):not([yawf-display$="-son"])'
    ).length;
    var feedList = document.querySelector('.WB_feed');
    var newFeed = document.querySelector('a.notes[yawf-id="feed_list_newBar"], div.WB_notes[yawf-id="home_new_feed_tip"]');
    // 先移除旧的，再放上新的
    if (newFeed) newFeed.parentNode.removeChild(newFeed);
    if (count) {
      newFeed = util.dom.create(html.feedListNewBar);
      if (util.v6) feedList.parentNode.insertBefore(newFeed, feedList);
      else feedList.insertBefore(newFeed, feedList.firstChild);
      newFeed.addEventListener('click', this.showNew.bind(this));
      if (util.v6) newFeed.firstChild.textContent = util.str.fill(text.newWeiboNotify, { 'count': count });
      else newFeed.textContent = util.str.fill(text.newWeiboNotify, { 'count': count });
    }
  },
  'ainit': function () {
    var that = this, loading = false;
    // 更新未读提示中的数字
    // 隐藏掉微博原来的新消息提示框
    util.css.add(util.str.cmt(function () { /*
      .WB_feed .WB_feed_type[yawf-unread="hidden"] { display: none !important; }
      .WB_feed [node-type="feed_list_timeTip"]:not(.yawf-timeTip) { display: none !important; }
      .WB_feed a.notes[action-type="feed_list_newBar"][node-type="feed_list_newBar"] { display: none; }
      .WB_feed div.W_loading[requesttype="newFeed"] { display: none !important; }
      .WB_feed .WB_notes[requesttype="newFeed"] { display: none !important; }
    */ }));

    var loadKey = util.version.chose(util.keyboard.code.R, util.keyboard.code.PERIOD);

    // 只在第一页工作
    var validPage = function () {
      var arg = util.str.parsearg(location.search.replace(/^\?/, ''));
      return !(arg.page && arg.page > 1);
    };

    var fakeKey = false;
    // 自动点开有新微博的提示
    if (util.v6) {
      // 我知道我在干什么
      util.func.page(function () {
        /* STK.lib.feed.inter */
        var action = function (b, e) {
          var a = window.STK;
          var c = a.core.json.merge,
            j = e[2] || {},
            k = a.queryToJson(window.FM.getURL().query),
            g = a.conf.trans.feed.feed,
            h = a.core.obj.parseParam({
              loadFeedTransKey: "getfeed",
              plNode: null
            }, e);
          var l = c(k, { since_id: b.getEndId() });
          g.request(h.loadFeedTransKey, {
            onSuccess: function (a) { b.updateFeed(a.data, "top", "newFeed"); },
            onFail: function () { b.showError("top", "newFeed"); },
            onError: function () { b.showError("top", "newFeed"); }
          }, c(l, j));
        };
        /* STK.lib.feed.base */
        var base = function (b, c) {
          var a = window.STK;
          var d = {}, e = a.lib.feed.API(b, c);
          for (var f in e) !d[f] && (d[f] = e[f]); /* as is */
          action(d, c);
        };
        /* STK.pl.content.homefeed.source.homefeed.feedList */
        var feedList = function (b) {
          base(b, { plNode: b });
        };
        /* check for home_new_feed_tip and auto load new feeds... */
        var pending = false;
        (new MutationObserver(function (mutations) {
          if (!window.STK) return; /* we need stk to work */
          var tip = window.STK.sizzle('#home_new_feed_tip');
          if (!tip.length) return;
          window.STK.removeNode(tip[0]);
          if (pending) return; pending = true;
          setTimeout(function () {
            pending = false;
            feedList(window.STK.sizzle('#v6_pl_content_homefeed')[0]);
          }, 100);
        })).observe(document.body, { 'childList': true, 'subtree': true });
      });
    } else {
      observer.dom.add(function () {
        var newFeed = document.querySelector(util.version.chose(
          '.WB_feed a.notes[action-type="feed_list_newBar"][node-type="feed_list_newBar"]:not([yawf-noted])',
          '#home_new_feed_tip a'
        ));
        if (!newFeed) return;
        if (validPage()) {
          // 模拟在网页上按 R 键载入新微博，因为如果模拟点击事件，会影响聊天窗口
          fakeKey = true;
          var evt = document.createEvent("KeyboardEvent");
          evt.initKeyEvent('keyup', true, true, null, false, false, false, false, loadKey, 0);
          document.documentElement.dispatchEvent(evt);
          loading = true;
        } else {
          newFeed.style.display = 'block';
          newFeed.setAttribute('yawf-noted', 'yawf-noted');
        }
      });
    }

    // 看见有新微博了，看看是不是新加载出来的
    if (util.v6) {
      observer.weibo.before(function (feed) {
        if (!validPage()) return;
        var feeds = Array.from(document.querySelectorAll('.WB_feed .WB_feed_type'));
        var shown = Array.from(document.querySelectorAll('.WB_feed_type[yawf-unread="show"], .WB_feed_type[yawf-unread="show"]~.WB_feed_type, .WB_feed_type[yawf-unread="show"]~* .WB_feed_type'));
        if (feeds.indexOf(feed) === -1) feed.setAttribute('yawf-unread', 'show');
        else if (shown.length < 8 || shown.indexOf(feed) !== -1) feed.setAttribute('yawf-unread', 'show');
        else feed.setAttribute('yawf-unread', 'hidden');
      });
    } else {
      observer.weibo.before(function (feed) {
        if (!validPage()) return;
        var feeds = Array.from(document.querySelectorAll('.WB_feed .WB_feed_type'));
        var shown = Array.from(document.querySelectorAll('.WB_feed_type[yawf-unread="show"], .WB_feed_type[yawf-unread="show"]~.WB_feed_type'));
        if (feeds.indexOf(feed) === -1) feed.setAttribute('yawf-unread', 'show');
        else if (shown.length < 8 || shown.indexOf(feed) !== -1 || loading === false) feed.setAttribute('yawf-unread', 'show');
        else feed.setAttribute('yawf-unread', 'hidden');
      });
    }

    // 走完过滤器之后，如果某条微博还没被隐藏掉，那么就提示用户有新微博要看了
    observer.weibo.after(function (feed) {
      if (feed.getAttribute('yawf-unread') !== 'hidden') return;
      var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
      if (display === 'hidden') return;
      that.counter();
      util.func.call(function () { filter.items.other.autoload.auto_expand.expand(feed); });
      if (filter.items.other.autoload.desktop_notification)
        filter.items.other.autoload.desktop_notification.notify(feed);
    });

    // 允许按 R 显示新微博
    util.keyboard.reg('keyup', loadKey, function () {
      if (fakeKey) { fakeKey = false; return; }
      that.showNew();
    }, true);

  },
  // 隐藏重复微博
  'priority': 1e6, // 最高的优先级
  'rule': function hideDuplicate(feed) {
    if (!this.conf) return null;
    if (feed.getAttribute('yawf-display')) return null;
    var mid = feed.getAttribute('mid'); if (!mid) return null;
    var another = document.querySelector('[node-type="feed_list"] .WB_feed_type[mid="' + mid + '"][yawf-display]');
    if (another) return 'duplicate-hidden';
  },
}).addto(filter.groups.other);

filter.items.other.autoload.auto_expand = filter.item({
  'group': 'autoload',
  'version': 46,
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
  'expand': function (feed, force) {
    var that = this;
    var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
    var act = function () {
      var unreads = document.querySelectorAll('.WB_feed_type[yawf-unread="hidden"]');
      var ref = unreads[unreads.length - 1];
      ref.parentNode.insertBefore(feed, ref.nextSibling);
      feed.setAttribute('yawf-unread', 'show');
      filter.items.other.autoload.auto_load_new_weibo.counter();
    };
    if (force) return act();
    if (!that.conf) return;
    if (that.ref.etypes.conf && display !== 'show') return;
    if (feed.getAttribute('yawf-unread') !== 'hidden') return;
    if (that.ref.background.conf && document.hasFocus()) {
      document.addEventListener('blur', function () { filter.items.other.autoload.auto_expand.expand(feed); });
    } else act();
  },
}).addto(filter.groups.other);

filter.items.other.autoload.desktop_notification = null;

if (util.notify.avaliableNotification().length) filter.items.other.autoload.desktop_notification = filter.item({
  'group': 'autoload',
  'version': 46,
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
    'shorten': {
      'type': 'boolean',
    },
    'shortlen': {
      'type': 'range',
      'min': 0,
      'max': 600,
      'default': 50,
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
    if (util.notify.avaliableNotification().length <= 1) {
      while (ntypes.tagName.toLowerCase() !== 'label') ntypes = ntypes.parentNode;
      ntypes.style.display = 'none';
    } else ntypes.addEventListener('change', function () {
      that.ref.ntypes.putconf(ntypes.checked);
      that.update();
    });
  },
  'init': function () {
    util.notify.choseNotification(this.ref.ntypes.conf ? 'webkit' : 'standard');
  },
  'update': function () {
    var that = this, desktopNotify = that.onopt;
    that.init();
    if (!desktopNotify.checked) return;
    var permission = util.notify.hasPermission();
    if (permission === true) return;
    desktopNotify.checked = false;
    if (permission === null) util.notify.requestPermission(function () {
      desktopNotify.checked = true;
      that.update();
    });
    if (permission === false) util.ui.alert('notify-disabled', {
      'title': util.str.fill('{{desktopNotificationDisallowedTitle}}'),
      'text': util.str.fill('{{desktopNotificationDisallowed}}'),
      'icon': 'error'
    });
  },
  'notify': function (feed) {
    var display = feed.getAttribute('yawf-display').replace(/^.*-([^-]*)$/, '$1');
    this.init(); if (!this.conf) return;
    if (this.ref.types.conf && display !== 'show') return;
    var mid, author, text, face, ori_author = '', ori_text = '';
    mid = feed.getAttribute('mid'); if (!mid) return;
    face = weibo.avatar(feed);
    author = weibo.author.name(feed);
    text = feed.querySelector('.WB_text').textContent;
    try {
      ori_author = weibo.original.name(feed);
      ori_text = weibo.original.text(feed);
    } catch (e) { }
    var body = text + (ori_text ? ('//' + ori_author + ': ' + ori_text) : '');
    body = body.replace(/\s+/g, ' ').trim(); author = author.trim();
    if (this.ref.shorten.conf) body = body.slice(0, this.ref.shortlen.conf);
    var delay = 0;
    if (this.conf) delay = this.ref.duration.conf + body.length * this.ref.durationc.conf;
    var showFeed = function () {
      filter.items.other.autoload.auto_expand.expand(feed, true);
      feed.scrollIntoView(false);
      feed.querySelector('[action-type="feed_list_comment]').click();
    };
    util.notify.showNotification(mid, author, body, face, delay, showFeed);
  },
}).addto(filter.groups.other);

// 提示火狐用户桌面提示问题
if (util.notify.avaliableNotification().length && util.browser.fx.avaliable) {
  filter.items.other.autoload.remark = filter.item({
    'group': 'autoload',
    'type': 'remark',
    'text': '{{autoCloseWarning}}',
  }).addto(filter.groups.other);
}

filter.predef.group('layout');

// 大部分选择器参考了 眼不见心不烦 脚本
(function () {
  var current = null, group;
  var subtitle = function (name, allButton) {
    group = (current = name).toLocaleLowerCase();
    filter.items.layout[group] = {};
    filter.items.layout[group].title = filter.item({
      'group': group,
      'type': 'subtitle',
      'text': '{{layoutHide' + name + '}}',
    }).addto(filter.groups.layout);
    if (!allButton) return;
    filter.items.layout[group].all = filter.item({
      'group': group,
      'show': function () {
        var dom = util.dom.create(html.configSelectAll);
        var a = dom.querySelector('a');
        a.addEventListener('click', function () {
          for (var x = dom.nextSibling; ; x = x.nextSibling) {
            if (x.nodeType === Node.TEXT_NODE) continue;
            if (x.classList.contains('yawf-configBoolean')) {
              var y = x.querySelector('input');
              if (!y.checked) y.click();
            }
            if (x.classList.contains('yawf-groupSubtitle')) break;
          }
        });
        return dom;
      }
    }).addto(filter.groups.layout);

  };

  var item = function (name, version, content, defaultValue) {
    if (typeof content !== 'function') content = util.css(content);
    filter.items.layout[group][name.toLowerCase()] = filter.item({
      'group': group,
      'version': version,
      'type': 'boolean',
      'key': 'weibo.layoutHide' + current + name,
      'default': defaultValue || false,
      'text': '{{layoutHide' + current + name + '}}',
      'ainit': content
    }).addto(filter.groups.layout);
  };

  subtitle('Icon', true);
  item('Level', 12, '.icon_bed[node-type="level"], .W_level_ico, .W_icon_level { display: none !important; }');
  item('Member', 5, '.W_ico16[class*="ico_member"], .W_icon[class*="icon_member"], .ico_member_dis, [class^="ico_vip"], .W_icon[class*="ico_member"] { display: none !important; }');
  item('Approve', 5, '.approve, .icon_approve, .icon_pf_approve { display: none !important; }');
  item('ApproveCo', 5, '.approve_co, .icon_approve_co, .icon_pf_approve_co { display: none !important; }');
  item('ApproveDead', 107, '.icon_approve_dead, .icon_pf_approve_dead { display: none !important; }');
  item('Club', 5, '.ico_club, .icon_pf_club, .icon_club { display: none !important; }');
  item('VGirl', 5, '.ico_vlady, .icon_pf_vlady, .icon_vlady { display: none !important; }');
  item('Taobao', 5, '.ico_taobao, .icon_tmall, .icon_taobao, .icon_tmall { display: none !important; }');
  item('Gongyi', 93, '.ico_gongyi, .ico_gongyi1, .ico_gongyi2, .ico_gongyi3, .ico_gongyi4, .ico_gongyi5, .icon_gongyi, .icon_gongyi2, .icon_gongyi3, .icon_gongyi4, .icon_gongyi5 { display: none !important; }');
  item('Zongyika', 29, '.zongyika2014, .icon_zongyika2014 { display: none !important; }');
  item('Youji', 35, '.lvxing2014, .icon_airball, a[href^="http://huodong.weibo.com/travel2014"] { display: none !important; }');
  item('Double11', 123, '.ico_double11, .icon_double11 { display: none !important; }');

  subtitle('Nav', true);
  item('LogoImg', 94, function replaceLogo() {
    if (util.v6) return; // v6 至今未见到特殊 logo ，所以不予处理
    var box = document.querySelector('.WB_global_nav .gn_logo_v2 .box');
    if (!box) return setTimeout(replaceLogo, 100);
    var img = document.querySelector('.WB_global_nav .gn_logo_v2 .box img');
    if (!img) return;
    var logo = util.dom.create(html.navLogo);
    img.parentNode.replaceChild(logo, img);
  });
  item('Main', 5, '.gn_nav>div:nth-child(1), .gn_nav_list>li:nth-child(1) { display: none !important; }');
  item('Hot', 5, '.gn_nav>div:nth-child(2), .gn_nav_list>li:nth-child(2) { display: none !important; }');
  item('App', 5, '.gn_nav>div:nth-child(3) { display: none !important; }');
  item('Game', 5, '.gn_nav>div:nth-child(4), .gn_nav_list>li:nth-child(3) { display: none !important; }');
  item('NoticeNew', 87, util.version.chose(
    '.WB_global_nav .gn_notice_new .W_new { display: none; } .WB_global_nav .gn_setting .gn_notice_new .ico { background-position: -275px -6px; }',
    '.WB_global_nav .gn_set_list .W_new_count { display: none; }'
  ));
  item('Member', 5, '.gn_setting[node-type="member"] { display: none !important; }');

  subtitle('Left', true);
  item('ToMe', 5, '#pl_leftnav_common a[href^="/direct/tome"] { display: none !important; }');
  item('Friends', 5, '#pl_leftnav_group > div[node-type="groupList"] > .level_1_Box, #pl_leftnav_common .level_1_Box > form.left_nav_line { display: none !important; }');
  item('App', 5, '#pl_leftnav_app { display: none !important; }');
  item('New', 106, '.WB_left_nav .lev .W_new, .yawf-WB_left_nav .lev .W_new { display: none !important; }');
  item('News', 106, '.WB_left_nav .level_1_Box .W_new_count, .yawf-WB_left_nav .level_1_Box .W_new_count { display: none !important; }');
  item('Count', 106, '.WB_left_nav .pl_leftnav_group .W_new_count, .WB_left_nav .lev .W_new_count, .yawf-WB_left_nav .pl_leftnav_group .W_new_count, .yawf-WB_left_nav .lev .W_new_count { display: none !important; }');

  subtitle('Middle', true);
  item('RecommendedTopic', 5, '#pl_content_publisherTop div[node-type="recommendTopic"], #v6_pl_content_publishertop div[node-type="recommendTopic"] { display: none !important; }');
  item('FeedRecommand', 35, 'a.notes[node-type="feed_list_newBar"][href^="http"]:not([action-type="feed_list_newBar"]), .WB_feed_newuser[node-type="recommfeed"] { display: none !important; }');
  item('MemberTip', 5, '[node-type="feed_list_shieldKeyword"] { display: none !important; }');

  subtitle('Right', true);
  item('Template', 5, '.templete_enter, #v6_pl_content_setskin { display: none !important; }'); // Spelling as is
  item('Info', 5, '.W_person_info, .send_weibo .input .arrow { display: none !important; }');
  item('Atten', 5, '#pl_rightmod_myinfo .user_atten { display: none !important; }');
  item('Groups', 102, '#pl_rightmod_groups { display: none; }');
  item('V6UpdateV6', 110, '#v6_pl_rightmod_updatev6 { display: none !important; }');
  item('V5UpdateV6', 110, '#v5_pl_rightmod_updatev6 { display: none !important; }');
  item('Trial', 5, '#trustPagelet_checkin_lotteryv5 { display: none !important; }');
  item('Interest', 5, '[yawf-id="rightmod_recom_interest"] { display: none !important; }');
  item('HotTopic', 5, '[yawf-id="rightmod_zt_hottopic"] { display: none !important; }');
  item('Member', 5, '#trustPagelet_recom_memberv5, #v6_trustPagelet_recom_member { display: none !important; }');
  item('Weibo', 5, '[yawf-id="rightmod_recom_weibo"] { display: none !important; }');
  item('Location', 5, '[yawf-id="rightmod_recom_location"] { display: none !important; }');
  item('Music', 5, '[yawf-id="rightmod_recom_music"] { display: none !important; }');
  item('Movie', 5, '[yawf-id="rightmod_recom_movie"] { display: none !important; }');
  item('Book', 5, '[yawf-id="rightmod_recom_book"] { display: none !important; }');
  item('Notice', 5, '#pl_rightmod_noticeboard, #v6_pl_rightmod_noticeboard { display: none !important; }');

  subtitle('Weibo', true);
  item('RecomFeed', 2, '[node-type="feed_list_recommend"]{ display: none !important; }');
  item('FeedTip', 7, '[node-type="feed_privateset_tip"] { display: none !important; }');
  item('GroupTip', 97, '.type_spe_pos { display: none; }');
  item('TopicCard', 5, '.WB_feed_spec[exp-data*="value=1022-topic"] { display: none !important; }');
  item('LocationCard', 5, '.WB_feed_spec[exp-data*="value=1022-place"] { display: none !important; }');
  item('LastPic', 72, function () {
    if (util.v6) {
      observer.dom.add(function () {
        var last;
        last = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view:not([yawf-piclast]) .pic_choose_box li:last-child a.current');
        while (last && !last.classList.contains('WB_media_view')) last = last.parentNode;
        if (last) last.setAttribute('yawf-piclast', 'yawf-piclast');
        last = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view[yawf-piclast] .pic_choose_box li:not(:last-child) a.current');
        while (last && !last.classList.contains('WB_media_view')) last = last.parentNode;
        if (last) last.removeAttribute('yawf-piclast');
        var close = document.querySelector('.WB_feed_type .WB_expand_media .WB_media_view .artwork_box .ficon_close ');
        if (close) close.click();
      });
      util.css.add('.WB_feed_type .WB_expand_media .WB_media_view[yawf-piclast] .rightcursor { cursor: url("http://img.t.sinajs.cn/t6/style/images/common/small.cur"), auto !important; }');
    } else {
      observer.dom.add(function () {
        var last;
        last = document.querySelector('.WB_feed_type .WB_media_expand .pic_list_view:not([yawf-piclast]) .pic_choose_box li:last-child a.current');
        while (last && !last.classList.contains('pic_list_view')) last = last.parentNode;
        if (last) last.setAttribute('yawf-piclast', 'yawf-piclast');
        last = document.querySelector('.WB_feed_type .WB_media_expand .pic_list_view[yawf-piclast] .pic_choose_box li:not(:last-child) a.current');
        while (last && !last.classList.contains('pic_list_view')) last = last.parentNode;
        if (last) last.removeAttribute('yawf-piclast');
        var close = document.querySelector('.WB_feed_type .WB_media_expand .pic_list_view .artwork_box .W_close');
        if (close) close.click();
      });
      util.css.add('.WB_feed_type .WB_media_expand .pic_list_view[yawf-piclast] .rightcursor { cursor: url("http://img.t.sinajs.cn/t5/style/images/common/small.cur"), auto !important; }');
    }
  });
  item('TopComment', 54, function () {
    observer.dom.add(function () {
      var split = document.querySelector('.comment_lists .between_line_v2'), parent;
      if (split) while ((parent = split.parentNode)) parent.removeChild(parent.firstChild);
    });
  });
  item('SonTitle', 35, '.WB_feed_type .WB_feed_together .wft_hd { display: none !important; }');
  item('Source', 34, '.WB_time+.S_txt2, .WB_time+.S_txt2+.S_link2, .WB_time+.S_txt2+.S_func2 { display: none !important; }' + 
    '.WB_feed_detail .WB_from a[date]::after { content: " "; display: block; } .WB_feed_detail .WB_from { height: 16px; overflow: hidden; }');
  item('AppCard', 102, function () {
    observer.dom.add(function () {
      var appcard = document.querySelector('.W_layer:not([yawf-appcard-hidden]) .layer_appcard');
      if (appcard) {
        while (!appcard.classList.contains('W_layer')) appcard = appcard.parentNode;
        appcard.setAttribute('yawf-appcard-hidden', 'yawf-appcard-hidden');
      }
    });
    util.css.add('.W_layer[yawf-appcard-hidden] { display: none !important; }');
  });
  item('Report', 34, '.WB_time~.hover, div.layer_menu_list[action-type="feed_list_layer"] a[onclick*="service.account.weibo.com/reportspam"] { display: none !important; }');
  item('Pop', 118, '.WB_feed_datail a[action-type="fl_pop"], .WB_feed_datail a[action-type="fl_pop"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="This Weibo cannot be promoted"], .WB_feed_datail .WB_handle i[title="This Weibo cannot be promoted"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="此条微博无法使用推广功能"], .WB_feed_datail .WB_handle i[title="此条微博无法使用推广功能"]+.S_txt3,' +
    '.WB_handle li[yawf-handle-type="fl_pop"] { display: none !important; }');
  item('Like', 34, 'a[action-type="feed_list_like"], a[action-type="feed_list_like"]+.S_txt3, ' +
    '[node-type="multi_image_like"], [action-type="feed_list_image_like"], ' +
    '[action-type="object_like"], [action-type="like_object"], ' +
    '.WB_feed_datail a[action-type="fl_like"], .WB_feed_datail a[action-type="fl_like"]+.S_txt3, ' +
    '.WB_expand .WB_handle.W_fr li:nth-child(3), ' +
    '.WB_handle li[yawf-handle-type="fl_like"] { display: none !important; }');
  item('Forward', 34, 'a[action-type="feed_list_forward"], a[action-type="feed_list_forward"]+.S_txt3, ' +
    '.WB_media_expand .WB_handle a.S_func4[href$="?type=repost"], .WB_media_expand .WB_handle a.S_func4[href$="?type=repost"]+.S_txt3, ' +
    '.WB_feed_datail a[action-type="fl_forward"], .WB_feed_datail a[action-type="fl_forward"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="该条为私密微博，无法转发"], .WB_feed_datail .WB_handle i[title="该条为私密微博，无法转发"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="无法转发带权限微博喔"], .WB_feed_datail .WB_handle i[title="无法转发带权限微博喔"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="此條為私密微博，無法轉發"], .WB_feed_datail .WB_handle i[title="此條為私密微博，無法轉發"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="無法轉發有設定權限微博喔　"], .WB_feed_datail .WB_handle i[title="無法轉發有設定權限微博喔　"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="該條為私密微博，無法轉發"], .WB_feed_datail .WB_handle i[title="該條為私密微博，無法轉發"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="無法轉發帶權限微博喔"], .WB_feed_datail .WB_handle i[title="無法轉發帶權限微博喔"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="Can not forward this access-restricted weibo!"], .WB_feed_datail .WB_handle i[title="Can not forward this access-restricted weibo!"]+.S_txt3, ' +
    '.WB_feed_datail .WB_handle i[title="Private weibo, can not be forward"], .WB_feed_datail .WB_handle i[title="Private weibo, can not be forward"]+.S_txt3, ' +
    '.WB_expand .WB_handle.W_fr li:nth-child(1), ' +
    '.WB_handle li[yawf-handle-type="fl_forward"] ' +
    ' { display: none !important; }');
  item('Favourite', 34, 'a[action-type="feed_list_favorite"], a[action-type="feed_list_favorite"]+.S_txt3, ' +
    '.WB_feed_datail a[action-type="fl_favorite"], .WB_feed_datail a[action-type="fl_favorite"]+.S_txt3, ' +
    '.WB_handle .WB_row_line li[yawf-handle-type="fl_favorite"] { display: none !important; }');
  item('BlockBySource', 34, 'div.layer_menu_list[action-type="feed_list_layer"] a[action-type="feed_list_shield_by_app"] { display: none !important; }');
  item('BlockByKeyword', 34, 'div.layer_menu_list[action-type="feed_list_layer"] a[action-type="feed_list_shield_setkeyword"] { display: none !important; }');

  filter.items.layout.reorder = {};
  filter.items.layout.reorder.title = filter.item({
    'group': 'reorder',
    'type': 'subtitle',
    'text': '{{layoutReorderTitle}}',
  }).addto(filter.groups.layout);
  var reorderItem = function (def) {
    return {
      'type': 'select',
      'default': def,
      'select': ['pop', 'favorite', 'forward', 'comment', 'like'].map(function (n) {
        return { 'value': n, 'text': '{{layoutReorder' + n[0].toUpperCase() + n.slice(1) + '}}' };
      }),
    };
  };
  filter.items.layout.reorder.title = filter.item({
    'group': 'reorder',
    'version': 122,
    'key': 'weibo.layout.reorder',
    'ref': {
      '1': reorderItem('pop'),
      '2': reorderItem('favorite'),
      '3': reorderItem('forward'),
      '4': reorderItem('comment'),
      '5': reorderItem('like'),
    },
    'text': '{{layoutReorderDesc}}',
    'type': 'label',
    'shown': function (dom) {
      var selects = Array.from(dom.querySelectorAll('select'));
      var values = function () { return selects.map(function (s) { return s.value; }); };
      var lastv = values();
      selects.forEach(function (select, index) {
        select.addEventListener('change', function () {
          if (select.value === lastv[index]) return;
          selects[lastv.indexOf(select.value)].value = lastv[index];
          lastv = values();
          // 强制刷新以保存新的设置
          var evt = document.createEvent('HTMLEvents');
          evt.initEvent("change", false, true);
          selects.forEach(function (s) { s.dispatchEvent(evt); });
        });
      });
    },
    'init': function () {
      if (!util.v6) return;
      var ref = this.ref;
      util.css.add(['1', '2', '3', '4', '5'].map(function (key) {
        return '.WB_handle ul li[yawf-handle-type="fl_' + ref[key].conf + '"] { order: ' + key + '; }';
      }).join('\n'));
    },
  }).addto(filter.groups.layout);

  // 处理 v6 下微博按钮的平均分布
  observer.weibo.after(function (feed) {
    if (!util.v6) return;
    var li = Array.from(feed.querySelectorAll('.WB_handle .WB_row_line li, .WB_feed_together .WB_func .WB_handle li'));
    li.forEach(function (li) {
      var type = li.querySelector('a').getAttribute('action-type');
      li.setAttribute('yawf-handle-type', type);
    });
    var fwli = Array.from(feed.querySelectorAll('.WB_feed_expand .WB_func .WB_handle li'));
    if (fwli.length) fwli.forEach(function (li, index) {
      li.setAttribute('yawf-handle-type', ['fl_forward', 'fl_comment', 'fl_like'][index]);
    });
  });

  subtitle('Person', true);
  item('MoveThings', 51, '.S_profile .profile_move_things { display: none !important; }');
  item('Template', 110, '.WB_frame_a .icon_setskin { display: none !important; }');
  item('Cover', 5, util.str.cmt(function () { /*!CSS
    .S_profile_pic { display: none; }
    .profile_top { margin-top: 20px; }
    .profile_top .pf_head { top: 5px; margin-top: 0 !important; }
    .profile_top .pf_head_pic { height: 120px; width: 120px; float: right; }
    .profile_top .pf_head_pic img { height: 120px; }
    .profile_top .pf_head .user_atten { width: 60px; float: left; height: 120px; }
    .profile_top .pf_head .user_atten li, .profile_top .pf_head .user_atten .follower { width: 54px; padding: 0 3px 3px; height: 37px; border-right: none; }
    .profile_top .pf_head .user_atten li strong { margin: 3px 0 0; }
  */ }));
  item('BadgeIcon', 10, '.pf_badge_icon { display: none !important; }');
  item('Stats', 5, '.profile_top .user_atten { display: none !important; } .profile_top .pf_head { margin-top: 51px; } ');
  item('MyData', 5, '.W_main_c [id^="Pl_Official_MyMicroworld__"], .WB_frame_b [id^="Pl_Official_MyPopularity__"] { display: none !important; }');
  item('Group', 12, '.W_main_2r [id^="Pl_Core_RightGroupsBtn__"], .WB_frame_b [id^="Pl_Core_RightGroupsBtn__"] { display: none !important; }');
  item('SuggestUser', 10, '.W_main_2r [id^="Pl_Core_RightUserList__"], .WB_frame_b [id^="Pl_Core_RightUserList__"] { display: none !important; }');
  item('Relation', 5, '.W_main_2r [id^="Pl_Core_RightUserGrid__"], .WB_frame_b [id^="Pl_Core_RightUserGrid__"] { display: none !important; }');
  item('Album', 5, '.W_main_2r [id^="Pl_Core_RightPicMulti__"], .WB_frame_b [id^="Pl_Core_RightPicMulti__"], [yawf-obj-name="相冊"], [yawf-obj-name="相册"] { display: none !important; }');
  item('HotTopic', 5, '.W_main_2r [id^="Pl_Core_RightTextSingle__"], .WB_frame_b [id^="Pl_Core_RightTextSingle__"] { display: none !important; }');
  item('HotWeibo', 5, '.W_main_2r [id^="Pl_Core_RightPicText__"], .WB_frame_b [id^="Pl_Core_RightPicText__"] { display: none !important; }');

  subtitle('PLeft');
  filter.items.layout.pleft.mods = filter.item({
    'group': 'pleft',
    'version': 134,
    'key': 'weibo.layout.pleft',
    'text': '{{layoutHidePLeftDesc}}',
    'type': 'strings',
    'add': function (s) { return s.trim(); },
    'init': function () {
      if (!this.conf.length) return;
      util.css.add(this.conf.map(function (s) {
        return '[yawf-obj-name="' + util.str.base64(s) + '"]';
      }).join(', ') + ' { display: none !important; }');
    }
  }).addto(filter.groups.layout);

  subtitle('Messages', true);
  item('Help', 97, '#Pl_Rightmod_Helpbox, #pl_rightmod_helpat, #pl_rightmod_helpcomment, #pl_rightmod_helplike, #Pl_Rightmod_Littlehelp, #Pl_Rightmod_Helpnotebox, #pl_rightmod_helpfav, #v6_pl_rightmod_helpat, #v6_pl_rightmod_helpcomment, #v6_pl_rightmod_helplike, #v6_pl_rightmod_helpnotebox, #v6_pl_rightmod_helpfav { display: none !important; }');
  item('Feedback', 97, '#pl_rightmod_feedback, #v6_pl_rightmod_feedback { display: none !important; }');
  item('Desktop', 97, '#pl_rightmod_weibodesk { display: none !important; }');
  item('CommentTop', 97, '#pl_content_commentTopNav { display: none !important; }');
  item('Report', 97, '#pl_common_reportentry, #pl_rightmod_reportentry { display: none !important; }');
  item('Youdao', 97, '#pl_rightmod_favyoudao { display: none !important; }');

  subtitle('Attention', true);
  item('Success', 75, function () {
    if (util.v6) return;
    observer.dom.add(function () {
      var close = document.querySelector('.W_layer:not([style*="display"]) .W_close[suda-uatrack="key=group_aftermark&value=close"]');
      if (!close) return; close.click();
      util.debug('Attention Success closed');
    });
  });
  item('Recommend', 75, function () {
    if (util.v6) return;
    observer.dom.add(function () {
      var reca = document.querySelector('.W_layer:not([style*="display"]) .W_close~.layer_recommend_attention:not([yawf-close])');
      if (!reca) return;
      while (!reca.classList.contains('W_close') && reca.previousSibling) reca = reca.previousSibling;
      reca.click();
      util.debug('Attention Recommend closed');
    });
  });

  subtitle('Other', true);
  item('Ads', 2, '#plc_main [id*="pl_rightmod_ads"], #plc_main [id^="v6_pl_rightmod_ads"], [id^="ads_"], [id^="ad_"], #trustPagelet_zt_hottopicv5 [class*="hot_topicad"], div[ad-data], .WB_feed .popular_buss, [id^="sinaadToolkitBox"] { display: none !important; } #wrapAD, .news_logo { visibility: hidden !important; }');
  item('HomeTip', 124, '#pl_content_hometip, #v6_pl_content_hometip { display: none !important }');
  item('FeedRecom', 5, '.W_main_2r [id^="Pl_Third_Inline__"] { display: none !important; }');
  item('Footer', 5, '.global_footer, .WB_footer { display: none !important; }');
  item('WbIm', 5, '.WBIM_news, .sendbox_btn_l a[href^="http://desktop.weibo.com/download.php"] { display: none !important; }');
  item('Tip', 8, '.layer_tips { display: none !important; }');
  item('Music', 110, '.PCD_mplayer { display: none !important; }');
  item('IM', 46, '#WB_webim .wbim_min_friend, #WB_webim .webim_list { display: none !important; } #WB_webim .wbim_chat_box, #WB_webim .wbim_min_chat  { right: 20px !important; }');
  item('RelatedWB', 134, '[yawf-obj-name="55u45YWz5o6o6I2Q"] { display: none !important; } #WB_webim .wbim_chat_box, #WB_webim .wbim_min_chat  { right: 20px !important; }');
  item('UpgradeV6', 137, '.W_layer[class*="v6"] { display: none !important; }', true);

  var tagRightbarMods = function () {
    var mods = Array.from(document.querySelectorAll('#trustPagelet_indexright_recom .WB_right_module:not([yawf-id]), #v6_pl_rightmod_recominfo .WB_cardwrap:not([yawf-id])'));
    if (!mods.length) return;
    var identifiers = {
      // v5 抄自眼不见心不烦
      '.right_content.hot_topic': 'rightmod_zt_hottopic',
      '.right_content.person_list': 'rightmod_recom_interest',
      '[change-data*="key=index_weibo"]': 'rightmod_recom_weibo',
      '[change-data*="key=index_LBS"]': 'rightmod_recom_location',
      '[change-data*="key=index_song"]': 'rightmod_recom_music',
      '[change-data*="key=index_mov"]': 'rightmod_recom_movie',
      '[change-data*="key=index_book"]': 'rightmod_recom_book',
      // v6
      '[change-data*="key=hottopic_r2"]': 'rightmod_zt_hottopic',
      '[change-data*="key=interest_r2"]': 'rightmod_recom_interest',
      '[change-data*="key=weibo_r2"]': 'rightmod_recom_weibo',
      '[change-data*="key=song_r2"]': 'rightmod_recom_music',
      '[change-data*="key=mov_r2"]': 'rightmod_recom_movie',
    };
    mods.forEach(function (mod) {
      mod.setAttribute('yawf-id', '');
      Object.keys(identifiers).forEach(function (qs) {
        if (mod.querySelector(qs)) mod.setAttribute('yawf-id', identifiers[qs]);
      });
    });
  };
  observer.dom.add(tagRightbarMods);
  tagRightbarMods();
  
  var tagPLeftMods = function () {
    var names = Array.from(document.querySelectorAll('.WB_frame_b>div:not([yawf-obj-name]) .WB_cardtitle_b h4.obj_name'));
    if (!names.length) return;
    names.forEach(function (title) {
      var name = title && title.textContent.trim() || '';
      var p = title, d;
      for (; !p.classList.contains('WB_frame_b') ; p = p.parentNode) d = p;
      d.setAttribute('yawf-obj-name', util.str.base64(name));
    });
  };
  observer.dom.add(tagPLeftMods);
  tagPLeftMods();

  util.css.add('.W_miniblog, .WB_miniblog { visibility: visible !important; }');

}());

// 改造设置
filter.predef.group('tool');

// 边栏相关工具
filter.items.tool.sidebar = {};
filter.items.tool.sidebar.title = filter.item({
  'group': 'sidebar',
  'type': 'subtitle',
  'text': '{{sideColumnToolsTitle}}',
}).addto(filter.groups.tool);

// 展开左栏分组
filter.items.tool.sidebar.show_all_group = filter.item({
  'group': 'sidebar',
  'version': 10,
  'type': 'boolean',
  'key': 'weibo.tool.showAllGroup',
  'text': '{{showAllGroupDesc}}',
  'ainit': util.css('#pl_leftnav_group div[node-type="moreList"] { display: block !important } #pl_leftnav_group > div[node-type="groupList"] > .level_2_Box > .levmore { display: none }'),
}).addto(filter.groups.tool);

// 展开左栏消息
filter.items.tool.sidebar.show_all_msg_nav = filter.item({
  'group': 'sidebar',
  'version': 10,
  'type': 'boolean',
  'key': 'weibo.tool.showAllMsgNav',
  'text': '{{showAllMsgNavDesc}}',
  'ainit': util.css('#pl_leftnav_common > .level_1_Box > .lev2_new { display: block !important }'),
}).addto(filter.groups.tool);

// 合并左右边栏
filter.items.tool.sidebar.merge_left_right = filter.item({
  'group': 'sidebar',
  'version': 35,
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
  'init': function mergeLeftRight() {
    if (!this.conf) return;
    var main = document.body, side = this.ref.side.conf;
    var left = document.querySelector('.W_main_l, .WB_main_l');
    if (!left) return setTimeout(util.func.catched(mergeLeftRight.bind(this)), 100);
    var left0 = util.dom.create(html.leftFake);
    left.parentNode.insertBefore(left0, left);
    left.parentNode.removeChild(left);
    var positionLeft = function () {
      var ref = document.querySelector('#pl_rightmod_myinfo, #v6_pl_rightmod_myinfo');
      var right = document.querySelector('.W_main_r, .WB_main_r');
      var leftn = document.querySelector('.W_main_l, .WB_main_l');
      if (leftn && left !== leftn) { left = leftn; }
      if (ref) {
        if (ref.nextSibling !== left) {
          ref.parentNode.insertBefore(left, ref.nextSibling);
          main.setAttribute('yawf-merge-left', side);
          fixStylish(true);
        }
      } else if (right) {
        if (right.firstChild !== left) {
          right.insertBefore(left, right.firstChild);
          main.setAttribute('yawf-merge-left', side);
          if (util.v6) fixMsgboxLeftNav();
          fixStylish(true);
        }
      } else {
        if (left0.previousSibling !== left) {
          left0.parentNode.insertBefore(left, left0);
          main.removeAttribute('yawf-merge-left');
          fixStylish(false);
        }
      }
    };
    util.css.add(util.str.cmt(util.version.chose(function () { /*!CSS
      body[yawf-merge-left] .W_main .W_main_l { width: 229px; padding: 0; float: none; }
      body[yawf-merge-left] .W_main .WB_left_nav .lev a:hover, body[yawf-merge-left] .WB_left_nav .lev2 a:hover, body[yawf-merge-left] .WB_left_nav .lev2 a.lev_curr, body[yawf-merge-left] .WB_left_nav .lev2 a.lev_curr:hover, body[yawf-merge-left] .WB_left_nav .lev3 a:hover { background-image: none; }
      body[yawf-merge-left] .W_main { width: 830px; background-position: -300px center; background-size: 200% 100%; }
      body[yawf-merge-left].B_index:not([yawf-weibo-only]) .W_main~.W_gotop { margin-left: 415px !important; }
      body[yawf-merge-left].B_index:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + 185px); }
      body[yawf-merge-left] .global_footer { width: 790px !important; }
      body[yawf-merge-left] .global_footer .list { margin-right: 0 !important; width: 155px !important; }
      body[yawf-merge-left] .global_footer .copy { padding-top: 0 !important; margin-top: -46px; }
      body[yawf-merge-left] .W_main_r>.W_main_l:first-child { margin-bottom: 20px; }
      body[yawf-merge-left="left"] .W_main .W_main_r { float: left; }
      body[yawf-merge-left="left"] .W_main .W_main_c { float: right; }
      body[yawf-merge-left="left"] .W_main .templete_enter a { right: auto; left: 0; transform: scaleX(-1); }
      body[yawf-merge-left="left"] .W_main .send_weibo .input .arrow, body[yawf-merge-left="left"] .send_weibo .input.clicked .arrow { right: auto; left: -11px; transform: scaleX(-1); }
      body[yawf-merge-left="left"] .W_main .send_weibo .input { box-shadow: -1px 1px 1px 0 #eaeaea inset !important; }
      body[yawf-merge-left="left"] .W_main #Box_center { border-left: 2px solid rgba(128, 128, 128, 0.2); margin-left: -2px; }
      body[yawf-merge-left="left"].B_index:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% - 415px); }
      body[yawf-merge-left="right"] .W_main #Box_center { border-right: 2px solid rgba(128, 128, 128, 0.2); margin-right: -2px; }
    */ }, function () { /*
      body[yawf-merge-left] .WB_frame .WB_main_l,
      body[yawf-merge-left] .WB_frame .yawf-WB_left_nav, body[yawf-merge-left] .WB_frame .WB_left_nav { width: 229px; padding: 0; float: none; }
      body[yawf-merge-left] .WB_frame .WB_main_l .UI_scrollView,
      body[yawf-merge-left] .WB_frame .WB_main_l .UI_scrollContainer,
      body[yawf-merge-left] .WB_frame .WB_main_l .UI_scrollContent { height: auto !important; }
      body[yawf-merge-left] .WB_frame .WB_main_l .UI_scrollContent { width: calc(100% + 30px) !important; }
      body[yawf-merge-left] .WB_frame { width: 840px !important; padding: 10px; background-position: -300px center; }
      body[yawf-merge-left] #v6_pl_leftnav_group { margin-bottom: 10px; }
      body[yawf-merge-left] .WB_frame .yawf-WB_left_nav .lev_line fieldset, body[yawf-merge-left] .WB_frame .WB_left_nav .lev_line fieldset { padding-left: 190px; }
      body[yawf-merge-left] .WB_left_nav .lev a:hover, .WB_left_nav .lev_curr, .WB_left_nav .lev_curr:hover, .WB_left_nav .levmore .more { background: rgba(128, 128, 128, 0.1) !important; }
      body[yawf-merge-left] .WB_left_nav .lev_Box, .WB_left_nav fieldset { border-color: rgba(128, 128, 128, 0.5) !important; }
      body[yawf-merge-left] .WB_frame .WB_main_l #v6_pl_leftnav_msgbox.yawf-cardwrap h3 { padding: 0 16px; }
      body[yawf-merge-left] a.W_gotop { margin-left: 430px; }
      body[yawf-merge-left] .webim_contacts_mod { position: static !important; }
      body[yawf-merge-left] .webim_contacts_bd { height: auto !important; }
      body[yawf-merge-left="left"] .WB_frame .WB_main_r { float: left; }
      body[yawf-merge-left="left"] .WB_frame .WB_main_c { float: right; }
      body[yawf-merge-left="left"] .WB_frame .templete_enter a { right: auto; left: 0; transform: scaleX(-1); }

      @media screen and (max-width: 1006px) {
        body[yawf-merge-left] .W_main { width: 600px !important; }
        body[yawf-merge-left] .WB_frame { width: 600px !important; }
        body[yawf-merge-left] a.W_gotop { margin-left: 310px; }
        body[yawf-merge-left="left"] .WB_main .WB_main_c { float: none; }
        body[yawf-merge-left="left"] .W_fold { right: auto; left: 0; transform: scaleX(-1); }
        body[yawf-merge-left="left"] .W_fold.W_fold_out { left: 269px; }
        body[yawf-merge-left="left"] .WB_main_r { right: auto; left: 0px; transform: translateX(-100%) translateZ(0px); }
        body[yawf-merge-left="left"] .WB_main_r.W_fold_layer { left: 269px; }
        body[yawf-merge-left="left"] .WB_main_r { direction: rtl; }
        body[yawf-merge-left="left"] .WB_main_r .WB_cardwrap { direction: ltr; }
      }

      body[yawf-merge-left]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + 190px); }
      body[yawf-merge-left="left"]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% - 420px); }
      @media screen and (max-width:1006px) {
        body[yawf-merge-left]:not([yawf-weibo-only]) #yawf-drop-area { left: calc(50% + 70px); }
      }
      body[yawf-merge-left][yawf-weibo-only] #yawf-drop-area { left: calc(50% + 70px); }

      .yawf-WB_left_nav { width:150px; overflow: hidden; }
      .yawf-WB_left_nav .lev_Box_noborder{ border-bottom:none;}
      .yawf-WB_left_nav .lev_line::before{ border-top: 1px solid; content: " "; display: block; margin: 11px 0 -12px; opacity: 0.3; }
      .yawf-WB_left_nav .lev_line fieldset{ display:block; height:22px;padding: 0 0 0 120px; zoom:1; clear:both; border-top: none;}
      .yawf-WB_left_nav .lev_line legend{ line-height:22px; font-size:14px; padding:0 3px 0 4px;}
      .yawf-WB_left_nav .lev_line legend .ficon_setup:hover{text-shadow:0px 0px 4px rgba(0,0,0,.4);}
      .yawf-WB_left_nav .lev_Box h3{display:block;height:34px;line-height:34px;font-size:14px; font-weight:bold;text-decoration:none;overflow:hidden;}
      .yawf-WB_left_nav .lev_Box h3.lev a{font-size:14px; font-weight:bold; padding:0 0 0 15px;height:34px;line-height:34px;}
      .yawf-WB_left_nav .lev_Box h3.lev a .pic{ width:18px; height:18px; float:left;margin:8px 5px 0 0;}
      .yawf-WB_left_nav .lev_Box h3.lev a .W_ficon{ float:right;}
      .yawf-WB_left_nav .lev_Box h3.S_txt1{ padding:0 0 0 15px;}
      .yawf-WB_left_nav .lev_Box h3 .ficon_add,.yawf-WB_left_nav .lev_Box h3 .ficon_setup{ display:block; _display:block; float:right; font-size:14px;font-size:12px\9; margin-right:10px; *margin:-32px 10px 0 0;}
      .yawf-WB_left_nav .lev_Box h3 .ficon_add:hover,.yawf-WB_left_nav .lev_Box h3 .ficon_setup:hover{text-shadow:0px 0px 4px rgba(0,0,0,.4);}
      .yawf-WB_left_nav .lev a{display:block;height:34px;line-height:34px;font-size:12px; padding:0 0 0 13px;text-decoration:none;overflow:hidden; position:relative;}
      .yawf-WB_left_nav .lev .lev_curr .levtxt{ font-weight:bold;}
      .yawf-WB_left_nav .lev .lev_curr .ficon_dot,.yawf-WB_left_nav .lev .lev_curr .ficon_friends,.yawf-WB_left_nav .lev .lev_curr .ficon_p_interest,.yawf-WB_left_nav .lev .lev_curr .ficon_p_rmd,.yawf-WB_left_nav .lev .lev_curr .ficon_p_quietfollow{ width:12px; letter-spacing:18px;text-indent:-30px;*letter-spacing:0px;*text-indent:0; }
      .yawf-WB_left_nav .lev .lev_curr .ficon_dot:after,.yawf-WB_left_nav .lev .lev_curr .ficon_friends:after,.yawf-WB_left_nav .lev .lev_curr .ficon_p_interest:after,.yawf-WB_left_nav .lev .lev_curr .ficon_p_rmd:after,.yawf-WB_left_nav .lev .lev_curr .ficon_p_quietfollow:after{content:"B";}
      .yawf-WB_left_nav .lev .ficon_gotop{ display:none;}
      .yawf-WB_left_nav .lev_gotop a:hover .ficon_gotop{display:block;}
      .yawf-WB_left_nav .lev_gotop a:hover .ficon_gotop:hover{text-shadow:0px 0px 4px rgba(0,0,0,.4);}
      .yawf-WB_left_nav .lev .levtxt{ display:inline-block;max-width:82px; _width:82px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;cursor:pointer;}
      .yawf-WB_left_nav .lev .W_new_count{ float:right; margin:10px 10px 0 0;*margin:-25px 10px 0 0;}
      .yawf-WB_left_nav .lev .W_new{ float:right; margin:12px 8px 0 0;*margin-top:-21px;}
      .yawf-WB_left_nav .lev .ico_block{ float:left; width:17px; text-align:center;margin:-1px 3px 0 0;}
      .yawf-WB_left_nav .lev .ico_block .pic{ width:16px; height:16px; float:left;margin-top:7px;}
      .yawf-WB_left_nav .levmore{display:block;height:30px;line-height:30px; text-align:center;}
      .yawf-WB_left_nav .levmore .more{ position:relative; height:14px; line-height:14px; padding:2px 6px; border-radius:3px; text-decoration:none; zoom:1;}
      .yawf-WB_left_nav .levmore .W_btn_b{ margin:8px 10px 8px 0;}
      .yawf-WB_left_nav .levmore .W_new{ position:absolute;top:0; right:-1px;}
      .yawf-WB_left_nav .UI_scrollView{ position:relative;}
      .yawf-WB_left_nav .W_scroll_y{ right:0;}

    */ })));
    // 这是一段丧心病狂的代码，谁能找到更好的办法请告诉我改掉
    var fixStylish = (function () {
      var r = false;
      if (!util.v6) return function () { };
      // 如果是 v6 ，左栏合并过去之后要改一下样式
      // 考虑到要能适应各种模板，所以就改得稍微有点过分
      // 比如说压根就么有 .WB_left_nav 这个属性了，免得颜色乱掉
      return function (onRight) {
        if (onRight == null) onRight = r; else r = onRight;
        var nav = left.querySelector('.WB_left_nav, .yawf-WB_left_nav');
        if (!nav) return;
        var className = onRight ? 'yawf-WB_left_nav WB_cardwrap S_bg2' : 'WB_left_nav';
        if (nav.className !== className) nav.className = className;
      };
    }());

    var fixMsgboxLeftNav = function () {
      util.func.page(function () {
        if (typeof STK === 'undefined') return;
        var a = STK;
        var d = a.pl.msgbox.leftNav.source.init;
        if (!d) return;
        var b = a.sizzle('.yawf-WB_left_nav')[0]
        if (!b) return;
        var c = b.cloneNode(!0);
        a.insertBefore(c, b);
        a.removeNode(b);
        d(c);
      })
    };

    positionLeft(); fixStylish();
    observer.dom.add(function () { positionLeft(); fixStylish(); });

  },
}).addto(filter.groups.tool);

// 左边栏浮动
filter.items.tool.sidebar.fixed_left = filter.item({
  'group': 'sidebar',
  'version': 36,
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
    util.func.catched(util.version.chose(function () {
      var left = document.querySelector('.W_main_l');
      if (!left) return;
      var type = this.conf ? this.ref.items.conf : 'none';
      var merged = filter.items.tool.sidebar.merge_left_right.conf;
      // 禁用掉默认的浮动
      util.css.add('.W_main [node-type="left_fixed"]:not([yawf-fixed]) { height: auto !important; padding-top: 0 !important; position: static !important; top: 40px !important; animation: none; }');
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
        observer.dom.add(removeRightFixed);
      }
      // 最后自定义的浮动
      util.css.add('.W_main [yawf-fixed] { animation-duration: 0.5s; animation-iteration-count: 1; animation-name: dropdown; animation-timing-function: ease; position: fixed; top: 65px !important; overflow: hidden; height: auto !important; width: 150px; }');
      util.css.add('body[yawf-merge-left] .W_main [yawf-fixed] { width: 229px; }');
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
            util.func.call(updatePosition);
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
      observer.dom.add(updatePosition);
      updatePosition();
    }.bind(this), function () {
      // 如果全部是默认设置，那么什么都不用做
      var merge = filter.items.tool.sidebar.merge_left_right.conf, fleft = this.conf;
      if (!merge && fleft) return;
      // 首先禁用掉默认的浮动，如果要求左栏不浮动那么只禁用左栏的
      var attrs = ['fixed-item', 'fixed-box', 'fixed-inbox'], prefix = '';
      if (!fleft) prefix = '.WB_main_l ';
      var query = attrs.map(function (x) { return prefix + '[' + x + ']'; }).join(', ');
      var removeFixed = function () {
        var items = Array.from(document.querySelectorAll(query));
        if (!items.length) return;
        items.forEach(function (fixed) {
          var x = fixed.cloneNode(true);
          attrs.forEach(function (attr) { x.removeAttribute(attr); });
          fixed.parentNode.insertBefore(x, fixed);
          fixed.parentNode.removeChild(fixed);
        });
      };
      removeFixed();
      observer.dom.add(removeFixed, 100);
      // 最后修正在左右栏合并后左栏的浮动
      if (fleft) {
        util.css.add('.WB_main_r[yawf-fixed] .WB_main_l { position: fixed; top: 65px !important; overflow: hidden; height: auto !important; width: 150px; }');
        util.css.add('body[yawf-merge-left] .WB_main_r[yawf-fixed] .WB_main_l { width: 229px; }');
        var floating = false;
        var updatePosition = function () {
          var left = document.querySelector('.WB_left_nav, .yawf-WB_left_nav');
          var reference = document.querySelector('.WB_main_r');
          var container = document.querySelector('#plc_main');
          if (!left || !reference) return;
          var refc = reference.getClientRects();
          if (!refc || !refc[0]) return;
          var pos = refc[0];
          if (!floating) {
            if (pos.bottom < 0) {
              floating = true;
              reference.setAttribute('yawf-fixed', '');
            }
          } else {
            if (pos.bottom + left.clientHeight > 60) {
              floating = false;
              reference.removeAttribute('yawf-fixed');
              util.func.call(updatePosition);
            }
          }
          if (floating) {
            var cip = container.getClientRects()[0];
            var fip = left.getClientRects()[0];
            if (cip && fip) {
              left.style.maxHeight = Math.max(cip.bottom - fip.top - 10, 0) + 'px';
            }
          } else {
            left.style.maxHeight = 'auto';
          }
        };
        document.addEventListener('scroll', updatePosition);
        observer.dom.add(updatePosition);
        updatePosition();
      }
    }.bind(this)))();
  },
}).addto(filter.groups.tool);

// 将话题黑名单应用到右侧热门话题栏目
filter.items.tool.sidebar.filte_right_topic = filter.item({
  'group': 'sidebar',
  'version': 47,
  'type': 'boolean',
  'key': 'weibo.tool.filte_right_topic',
  'text': '{{filteRightTopic}}',
  'ainit': function () {
    util.css.add('.hot_topic li[yawf-rtopic="hidden"] { display: none !important; }');
    observer.dom.add(function () {
      var topics = Array.from(document.querySelectorAll('.hot_topic li:not([yawf-rtopic]) a[suda-uatrack*="hottopic_r"]'));
      topics.forEach(function (topic) {
        var text = topic.title.replace(/#/g, '');
        var li; for (li = topic; li.tagName.toLowerCase() !== 'li'; li = li.parentNode);
        if (filter.items.topic.topic.blacklist.conf.indexOf(text) !== -1) li.setAttribute('yawf-rtopic', 'hidden');
        else li.setAttribute('yawf-rtopic', 'show');
      });
    });
  },
}).addto(filter.groups.tool);

// 隐藏阅读量太少的热门话题
filter.items.tool.sidebar.filte_right_topic_count = filter.item({
  'group': 'sidebar',
  'version': 132,
  'type': 'boolean',
  'key': 'weibo.tool.filte_right_topic_count',
  'ref': {
    'number': {
      'type': 'range',
      'min': 100,
      'max': 20000,
      'step': 100,
      'default': 200,
    }
  },
  'text': '{{filteRightTopicCount}}',
  'ainit': function () {
    util.css.add('.hot_topic li[yawf-rtopic-count="hidden"], #topicAD { display: none !important; }');
    var that = this;
    observer.dom.add(function () {
      var counts = Array.from(document.querySelectorAll('.hot_topic li:not([yawf-rtopic-count]) .total'));
      counts.forEach(function (count) {
        // 网站中数字由 xxx万 ， xx.x亿 的方式表示；且没有繁体或英文版本
        // 注意有时前面的数字会有小数点，所以要替换为 e4, e8 而非 0000, 00000000
        var number = Number(count.textContent.replace('万', 'e4').replace('亿', 'e8'));
        var li; for (li = count; li.tagName.toLowerCase() !== 'li'; li = li.parentNode);
        if (isNaN(number) || that.ref.number.conf * 1e4 > number) li.setAttribute('yawf-rtopic-count', 'hidden');
        else li.setAttribute('yawf-rtopic-count', 'show');
      });
    });
  },
}).addto(filter.groups.tool);

// 微博相关工具
filter.items.tool.weibotool = {};
filter.items.tool.weibotool.title = filter.item({
  'group': 'weibotool',
  'type': 'subtitle',
  'text': '{{weiboToolsTitle}}',
}).addto(filter.groups.tool);

// 清除发布框中的默认话题 (wcf)
filter.items.tool.weibotool.clear_def_topic = filter.item({
  'group': 'weibotool',
  'version': 36,
  'type': 'boolean',
  'key': 'weibo.tool.clear_def_topic',
  'text': '{{clearDefTopicDesc}}',
  'ainit': function () {
    var clearDefTopic = function () {
      var inputBox = document.querySelector('#pl_content_publisherTop .send_weibo .input textarea, #v6_pl_content_publishertop .send_weibo .input textarea'); // not tested in v6
      if (inputBox && inputBox.hasAttribute('hottopic')) {
        inputBox.removeAttribute('hottopic'); inputBox.removeAttribute('hottopicid');
        inputBox.value = 'DUMMY'; inputBox.focus();
        inputBox.value = ''; inputBox.blur();
      }
    };
    observer.dom.add(clearDefTopic);
  },
}).addto(filter.groups.tool);

// 分组浏览时默认发布方式为公开
filter.items.tool.weibotool.public_by_default = filter.item({
  'group': 'weibotool',
  'version': 74,
  'type': 'boolean',
  'key': 'weibo.tool.public_by_default',
  'text': '{{publishToPublicDefault}}',
  'ainit': function () {
    observer.dom.add(function () {
      var publish = document.querySelector('a[action-type="showPublishTo"]:not([yawf-publish])');
      if (!publish) return; publish.setAttribute('yawf-publish', 'yawf-publish');
      var text = publish.querySelector('[node-type="publishTotext"]');
      publish.setAttribute('action-data', 'rank=0');
      text.textContent = util.str.fill('{{publishToPublicText}}');
    });
  },
}).addto(filter.groups.tool);

// 微博作者与正文同行
filter.items.tool.weibotool.unwrap_text = filter.item({
  'group': 'weibotool',
  'version': 10,
  'type': 'boolean',
  'key': 'weibo.tool.unwrapText',
  'text': '{{unwrapTextDesc}}',
  'ainit': function () {
    util.css.add(util.str.cmt(util.version.chose(function () { /*!CSS
      .WB_feed .WB_feed_type .WB_info, .WB_feed .WB_feed_type .WB_info+.WB_text { display: inline }
      .WB_feed .WB_feed_type .WB_info+.WB_text::before { content: ": " }
      .WB_feed .WB_feed_type .WB_func { margin-top: 5px }
      .WB_feed .WB_feed_type .B_index .WB_feed .W_ico16 { vertical-align: -3px !important }
    */ }, function () { /*!CSS
      .WB_detail { overflow: hidden; }
      .WB_detail>.WB_info, .WB_detail>.WB_info+.WB_text, .WB_expand>.WB_info, .WB_expand>.WB_info+.WB_text { display: inline; word-wrap: break-word; }
      .WB_detail>.WB_info::after, .WB_expand>.WB_info::after { content: "："; }
      .WB_detail>.WB_info+.WB_text::before { display: block; float: right; content: " "; width: 1.5em; height: 1px; }
      .WB_detail>.WB_info+.WB_text+.WB_from { margin-top: 1em; }
    */ })));
  },
}).addto(filter.groups.tool);

// 个人主页自动打开微博列表
filter.items.tool.weibotool.redirect_weibo = filter.item({
  'group': 'weibotool',
  'version': 21,
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
      observer.dom.remove(redirect);
      window.stop(); // 虽然不知道为什么，但是加上就正常了……
      location.replace(link.href);
    };
    observer.dom.add(redirect);
    redirect();
  },
}).addto(filter.groups.tool);

// 查看大图旁添加查看原图链接
filter.items.tool.weibotool.view_original = filter.item({
  'group': 'weibotool',
  'version': 10,
  'type': 'boolean',
  'default': true,
  'key': 'weibo.tool.viewOriginal',
  'text': '{{viewOriginalDesc}}',
  'ainit': function () {
    var addOriLink = function () {
      var a = document.querySelector('a.show_big[action-data]:not([yawf-viewori]), [action-type="widget_photoview"]:not([yawf-viewori])'), l;
      if (!a) return; a.setAttribute('yawf-viewori', 'yawf-viewori');
      var ref;
      var updateLink = function () {
        var arg = a.getAttribute('action-data').match(/pid=(\w+)&mid=(\d+)&uid=(\d+)/);
        if (!arg) return;
        if (!l) {
          var vol = util.dom.create('div', util.str.fill(html.viewOriginalLink));
          l = vol.querySelector('a');
          if (util.v6) ref = a.parentNode.parentNode; else ref = a;
          while (vol.firstChild) ref.parentNode.insertBefore(vol.firstChild, ref);
        }
        l.href = util.str.fill(url.view_ori, { 'uid': arg[3], 'mid': arg[2], 'pid': arg[1] });
      };
      updateLink();
      (new MutationObserver(updateLink)).observe(a, { 'attributes': true });
    };
    observer.dom.add(addOriLink);
  },
}).addto(filter.groups.tool);

// 展开 t.cn 短网址
filter.items.tool.weibotool.expand_t_cn = filter.item({
  'group': 'weibotool',
  'version': 43,
  'type': 'boolean',
  'key': 'weibo.tool.expandTCn',
  'text': '{{expandShortenedLink}}',
  'ainit': function () {
    var expandLink = function (feed) {
      var links = Array.from(feed.querySelectorAll('.WB_text a[mt="url"][title^="http"]:not([yawf-expand])'));
      links.forEach(function (link) {
        link.setAttribute('yawf-expand', 'expand');
        if (link.textContent.indexOf('http://t.cn/') !== 0) return;
        link.textContent = link.title;
      });
    };
    observer.weibo.before(expandLink);
    expandLink(document);
  },
}).addto(filter.groups.tool);

// 添加好友时自动取消勾选推荐分组
filter.items.tool.weibotool.uncheck_recom_join = filter.item({
  'group': 'weibotool',
  'version': 75,
  'type': 'boolean',
  'key': 'weibo.tool.uncheck_recom_join',
  'text': '{{UncheckRecomJoin}}',
  'ainit': function () {
    observer.dom.add(function () {
      var recom_join = document.querySelector('.follow_success input[recom_join="1"]:not([yawf-select])');
      if (!recom_join) return; recom_join.setAttribute('yawf-select', 'yawf-select');
      recom_join.checked = false;
    });
  },
}).addto(filter.groups.tool);

// 样式相关工具
filter.items.tool.stylish = {};
filter.items.tool.stylish.title = filter.item({
  'group': 'stylish',
  'type': 'subtitle',
  'text': '{{styleToolsTitle}}',
}).addto(filter.groups.tool);

// 一个带有颜色/透明度的选框项
filter.ref.rgba = function (defcolor, deft, color, transparency, rgba, base) {
  var _color = {
    'type': 'color',
    'default': defcolor || '#000000',
  };
  var _transparency = {
    'type': 'range',
    'default': deft || 0,
    'min': 0,
    'max': 100,
  };
  base = base || {};
  base[color || 'color'] = _color;
  base[transparency || 'transparency'] = _transparency;
  base[rgba || 'rgba'] = {
    'toString': function () {
      return util.str.rgba(_color.conf, _transparency.conf);
    },
  };
  return base;
};

// 折叠微博外观
filter.items.tool.stylish.fold_text = filter.item({
  'group': 'stylish',
  'version': 88,
  'type': 'boolean',
  'key': 'weibo.tool.fold_text',
  'ref': {
    'text': {
      'type': 'select',
      'default': 'author-reason',
      'select': [
        { 'value': 'author', 'text': '{{foldedWeiboTextAuthorDesc}}' },
        { 'value': 'reason', 'text': '{{foldedWeiboTextReasonDesc}}' },
        { 'value': 'author-reason', 'text': '{{foldedWeiboTextAuthorReasonDesc}}' },
      ],
    },
  },
  'text': '{{foldedWeiboTextDesc}}',
  'init': function () {
    var types = ['author', 'reason'], that = this;
    var enabled = types.map(function (type) { return that.conf && that.ref.text.conf.indexOf(type) !== -1; });
    util.css.add(function genCss(index, chosen, prefix) {
      if (index === types.length)
        return '[node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]' +
          chosen + '::before ' +
          '{ content: ' + util.str.fill('{{{' + prefix + '}}}') + '; }\n';
      var type = types[index], typed = '[yawf-' + type + ']';
      return [false, true].map(function (chose) {
        return genCss(index + 1,
          chose ? typed + chosen : chosen + ':not(' + typed + ')',
          prefix + (chose && enabled[index] ? type[0].toUpperCase() + type.slice(1) : ''));
      }).join('');
    }(0, '', 'foldedWeiboText'));
  },
}).addto(filter.groups.tool);

// 增大 v6 下微博字号
filter.items.tool.stylish.weibo_large_font = filter.item({
  'group': 'stylish',
  'version': 140,
  'type': 'boolean',
  'key': 'weibo.tool.weibo_large_font',
  'text': '{{weiboLargeFont}}',
  'ref': {
    'ratio': {
      'type': 'select',
      'select': [
        { 'value': '120', 'text': '{{weiboLargeFont120}}' },
        { 'value': '150', 'text': '{{weiboLargeFont150}}' },
        { 'value': '200', 'text': '{{weiboLargeFont200}}' },
      ],
      'default': '120',
    },
  },
  'ainit': function () {
    util.css.add({
      '120': '.WB_info, .WB_text, .WB_info *, .WB_text * { font-size: 16px !important; line-height: 22px !important; } .WB_feed_expand .WB_info *, .WB_feed_expand .WB_text *, .WB_feed_expand .WB_info, .WB_feed_expand .WB_text { font-size: 14px !important; line-height: 20px !important; } .WB_text .W_btn_c, .WB_empty .W_btn_c { height: 20px !important; }',
      '150': '.WB_info, .WB_text, .WB_info *, .WB_text * { font-size: 21px !important; line-height: 28px !important; } .WB_feed_expand .WB_info *, .WB_feed_expand .WB_text *, .WB_feed_expand .WB_info, .WB_feed_expand .WB_text { font-size: 18px !important; line-height: 25px !important; } .WB_text .W_btn_c, .WB_empty .W_btn_c { height: 25px !important; }',
      '200':' .WB_info, .WB_text, .WB_info *, .WB_text * { font-size: 28px !important; line-height: 36px !important; } .WB_feed_expand .WB_info *, .WB_feed_expand .WB_text *, .WB_feed_expand .WB_info, .WB_feed_expand .WB_text { font-size: 24px !important; line-height: 32px !important; } .WB_text .W_btn_c, .WB_empty .W_btn_c { height: 32px !important; }',
    }[this.ref.ratio.conf] || '')
  },
}).addto(filter.groups.tool);

// 鼠标滑过折叠微博时自动展示内容
filter.items.tool.stylish.hover_show_fold = filter.item({
  'group': 'stylish',
  'version': 68,
  'type': 'boolean',
  'key': 'weibo.tool.hover_show_fold',
  'text': '{{hoverShowFold}}',
  'ainit': function () {
    util.css.add(util.str.cmt(util.version.chose(function () { /*!CSS
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_datail:not(:hover) { max-height: 1000px; padding: 0 0 11px; }
    */ }, function () { /*!CSS
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_detail:not(:hover) { max-height: 1000px; }
    */})));
  },
}).addto(filter.groups.tool);

// 高亮显示白名单微博
filter.items.tool.stylish.whitelist_highlight = filter.item({
  'group': 'stylish',
  'version': 18,
  'type': 'boolean',
  'key': 'weibo.tool.whitelist_highlight',
  'ref': filter.ref.rgba('#dafee4'),
  'text': '{{whitelistHighlightDesc}}',
  'ainit': function () {
    util.css.add(util.str.fill(util.str.cmt(util.version.chose(function () { /*
      .WB_media_expand .WB_arrow { display: none !important; }
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-show"] { background-color: {{color}} !important; box-shadow: -20px 0 0 {{color}}, 20px 0 0 {{color}}; }
      [node-type="feed_list"] .WB_feed_together .WB_feed_type[yawf-display$="-show"] { background-color: {{color}} !important; box-shadow: -10px 0 0 {{color}}, 10px 0 0 {{color}}; }
    */ }, function () { /*
      [node-type="feed_list"] .WB_feed_type[yawf-display$="-show"] { background-color: {{color}} !important; }
    */})), { 'color': '' + this.ref.rgba }));
  },
}).addto(filter.groups.tool);

// 首页背景
filter.items.tool.stylish.my_background_color = filter.item({
  'group': 'stylish',
  'version': 29,
  'type': 'boolean',
  'key': 'weibo.tool.my_background_color',
  'ref': filter.ref.rgba('#ffffff', 30),
  'text': '{{mainBackgroundColorOverride}}',
  'ainit': function () {
    util.css.add(util.str.fill(util.str.cmt(util.version.chose(function () { /*! CSS
      body:not(.S_profile) .W_main { background-image: none !important; background-color: {{color}} !important }
      body:not(.S_profile) .S_bg4, body:not(.S_profile) .W_main_a, body:not(.S_profile) .W_main_bg { background: transparent !important; }
    */ }, function () { /*! CSS
      body.FRAME_main .S_bg2 { background-color: {{color}} !important; }
      body.FRAME_main .S_bg2_br { border-color: {{color}}; }
      body.FRAME_main .WB_tab_a .tab_box_a_r5 .tab li.S_bg2 { background-color: transparent !important; }
      body.FRAME_main .WB_tab_a .tab_box_a_r5 .tab li.S_bg2 .S_bg2_br { border-bottom-color: {{color}} !important; }
      body.FRAME_main .WB_tab_a .tab_box_a_r5 .tab .b .W_arrow_bor { padding-left: 30px; }
      body.FRAME_main .WB_tab_a .tab .b .W_arrow_bor i { border-width: 0 8px 9px; }
      body.FRAME_main .WB_feed_expand .W_arrow_bor { height: 9px; margin-top: 1px; }
    */ })), { 'color': '' + this.ref.rgba }));
  },
}).addto(filter.groups.tool);

// 个人主页背景
filter.items.tool.stylish.other_background_color = filter.item({
  'group': 'stylish',
  'version': 29,
  'type': 'boolean',
  'key': 'weibo.tool.other_background_color',
  'ref': filter.ref.rgba('#ffffff', 30),
  'text': '{{profileBackgroundColorOverride}}',
  'ainit': function () {
    util.css.add(util.str.fill(util.str.cmt(util.version.chose(function () { /*!CSS
      .S_profile .W_profile_bg, .S_profile .S_bg5 { background-color: {{color}} !important; }
      .S_profile .S_bg4:not(.W_profile_bg) { background: none transparent !important }
    */ }, function () { /*!CSS
      body.FRAME_page .S_bg2 { background-color: {{color}} !important; }
      body.FRAME_page .S_bg2_br { border-color: {{color}}; }
      body.FRAME_page .WB_tab_a .tab_box_a_r5 .tab li.S_bg2 { background-color: transparent !important; }
      body.FRAME_page .WB_tab_a .tab_box_a_r5 .tab li.S_bg2 .S_bg2_br { border-bottom-color: {{color}} !important; }
      body.FRAME_page .WB_tab_a .tab_box_a_r5 .tab .b .W_arrow_bor { padding-left: 30px; }
      body.FRAME_page .WB_tab_a .tab .b .W_arrow_bor i { border-width: 0 8px 9px; }
      body.FRAME_page .WB_feed_expand .W_arrow_bor { height: 9px; margin-top: 1px; }
    */ })), { 'color': '' + this.ref.rgba }));
  },
}).addto(filter.groups.tool);

// 阅读模式
filter.items.tool.stylish.weibo_only = filter.item({
  'group': 'stylish',
  'version': 30,
  'type': 'boolean',
  'text': '{{weiboOnly}}',
  'key': 'weibo.tool.weibo_only',
  'ref': filter.ref.rgba('#ffffff', 20, 'color', 'transparency', 'rgba', {
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
      'default': util.keyboard.code.F8,
    },
    // 是否显示快捷链接
    'switch': {
      'type': 'boolean',
      'default': false,
    },
    'usebgc': {
      'type': 'boolean',
    },
    'enabled': {
      'type': 'boolean',
      'default': false,
      'internal': true,
    },
  }),
  'ainit': function () {
    if (!document.body.classList.contains('B_index') &&
      !document.body.classList.contains('B_profile') &&
      !document.body.classList.contains('B_page')) return;
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
    if (key.conf) util.keyboard.reg('keyup', key.conf, function (e) {
      switchMode();
      e.stopPropagation();
    });
    // 显示切换按钮
    if (that.ref['switch'].conf) (util.version.chose(function () {
      var showSwitch = function () {
        var rightBar = document.querySelector('.group_read .right_bar:not([yawf-weibo-only-added])');
        if (!rightBar) return; rightBar.setAttribute('yawf-weibo-only-added', 'added');
        var weiboOnly = util.dom.create('div', util.str.fill(html.weiboOnlyButton, {
          'text': text.weiboOnlyButton,
          'shortcut': key.conf === 0 ? '' : ' (' + util.keyboard.name(key.conf) + ')',
        })).firstChild;
        weiboOnly.addEventListener('click', switchMode.bind(that, null));
        rightBar.insertBefore(weiboOnly, rightBar.querySelector('.right_item~.right_item'));
      };
      observer.dom.add(showSwitch);
    }, function () {
      var showSwitch = function () {
        var search = document.querySelector('#v6_pl_content_homefeed .WB_tab_a .tab_box_a .fr_box .search_box:not([yawf-weibo-only-added]), div[id^="Pl_Official_ProfileFeedNav__"] .WB_tab_a .tab_box_a .fr_box .search_box:not([yawf-weibo-only-added])');
        if (!search) return; search.setAttribute('yawf-weibo-only-added', 'added');
        var weiboOnly = util.dom.create('div', util.str.fill(html.weiboOnlyButton, {
          'text': text.weiboOnlyButton,
          'shortcut': key.conf === 0 ? '' : ' (' + util.keyboard.name(key.conf) + ')',
        })).firstChild;
        weiboOnly.addEventListener('click', switchMode.bind(that, null));
        search.parentNode.appendChild(weiboOnly);
        observer.dom.remove(showSwitch);
      };
      observer.dom.add(showSwitch);
    })());
    // 注册样式
    util.css.add(util.str.fill(util.str.cmt(util.version.chose(function () { /*!CSS
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
      body.B_index[{{attr}}] .WB_feed .WB_feed_together .WB_screen,
      body.B_profile[{{attr}}] .WB_feed .WB_feed_together .WB_screen { margin-left: calc({{width}} - 141px); }
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
    */ }, function () { /*!CSS
      body[{{attr}}] .WB_frame>*:not(#plc_main),
      body[{{attr}}] #plc_main>*:not(.WB_main_c):not(.WB_frame_c):not(.WB_main_r):not(.WB_frame_b),
      body[{{attr}}] .WB_main_c>*:not(#v6_pl_content_homefeed),
      body[{{attr}}] #plc_bot .WB_footer, body[{{attr}}] #plc_bot .W_fold, body[{{attr}}] #pl_common_footer { display: none !important; }
      body[{{attr}}] #plc_main>.WB_main_r { visibility: hidden; margin-right: -230px; }
      body[{{attr}}] #plc_main>.WB_frame_b { visibility: hidden; margin-right: -300px; }
      body[{{attr}}] .WB_frame, body[{{attr}}][yawf-merge-left="left"] .WB_main .WB_frame { width: {{width}}; }
      body[{{attr}}] #plc_main { width: calc({{width}} + 10px); }
      body[{{attr}}] .WB_global_nav { position: static; margin-top: -50px; }
      body[{{attr}}] .WB_main_c { width: {{width}}; }
      body[{{attr}}] .WB_tab_a .tab_box_a .fr_box { width: calc({{width}} - 300px); } 
      body[{{attr}}] .WB_timeline { margin-left: calc({{width}} / 2 + 10px); }
    */ })), {
      'width': that.ref.width.conf + 'px',
      'attr': attr,
    }));
    if (that.ref.usebgc.conf) {
      if (util.v6);
      else util.css.add('body.B_index[' + attr + '] .W_main, body.B_profile[' + attr + '] .W_main { background: ' + that.ref.rgba + ' !important; }');
    }
    var updateModeByConf = function () {
      switchMode.call(that, that.ref.enabled.getconf());
    };
    updateModeByConf();
    window.addEventListener('focus', updateModeByConf);
  }
}).addto(filter.groups.tool);

// 自定义样式
filter.items.tool.stylish.userstyle = filter.item({
  'group': 'stylish',
  'version': 9,
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
      setTimeout(function () { set(css); util.config.write(); location.reload(); }, 0);
    };
    GM_registerMenuCommand(util.str.fill('{{userstyleEditDesc}}'), function () {
      var newcss = prompt(util.str.fill('{{userstyleEditDetails}}'), conf);
      if (newcss !== null) putconf(newcss);
    }, "S");
  },
}).addto(filter.groups.tool);

// 脚本设置
filter.predef.group('script');
filter.items.script = {};

// 导入导出
filter.items.script.importexport = {};
filter.items.script.importexport.title = filter.item({
  'group': 'importexport',
  'type': 'subtitle',
  'text': '{{configImportAndExport}}',
}).addto(filter.groups.script);

filter.items.script.importexport.importexport = filter.item({
  'group': 'importexport',
  'version': 6,
  'show': function () {
    var dom = util.dom.create(html.configImportExport);
    var bii = dom.querySelector('input[type="file"]');
    var be = dom.querySelector('[node-type="export"]');
    var br = dom.querySelector('[node-type="reset"]');
    // 导出按钮
    var updateExportButton = function () {
      be.href = 'data:application/octet-stream;base64,' +
        util.str.base64(util.config.export());
      be.setAttribute('download', 'yawf-config.yawf');
    };
    // 导入按钮
    var doImport = function (file) {
      var reader = new FileReader();
      // 导入成功
      var success = function () {
        util.ui.alert('yawf-config-import-success', {
          'title': util.str.fill('{{configImportSuccessTitle}}'),
          'text': util.str.fill('{{configImportSuccess}}'),
          'icon': 'succ'
        });
      };
      // 导入失败
      var error = function () {
        util.ui.alert('yawf-config-import-fail', {
          'title': util.str.fill('{{configImportFailTitle}}'),
          'text': util.str.fill('{{configImportFail}}'),
          'icon': 'error'
        });
      };
      // 读文件
      if (file.size > (1 << 24)) error();
      else reader.addEventListener('load', function () {
        if (util.config.import(reader.result)) {
          updateExportButton();
          success();
        } else error();
      });
      reader.readAsText(file);
      bii.value = '';
    };
    bii.addEventListener('change', function () {
      var file = bii.files[0];
      util.ui.confirm('yawf-config-import-warning', {
        'title': util.str.fill('{{configImportWarningTitle}}'),
        'text': util.str.fill('{{configImportWarning}}'),
        'onOk': function () { doImport(file); },
      });
    });
    updateExportButton();
    // 重置按钮
    var doReset = function () {
      util.config.clear();
      updateExportButton();
      GM_deleteValue('notification');
    };
    br.addEventListener('click', function () {
      util.ui.confirm('yawf-config-reset-warning', {
        'title': util.str.fill('{{configResetWarningTitle}}'),
        'text': util.str.fill('{{configResetWarning}}'),
        'onOk': doReset,
      });
    });
    return dom;
  },
}).addto(filter.groups.script);

// 更新
(function (currentVersion) {
  if (!currentVersion) return;
  // 显示新用户介绍
  var showUserGuide = function () {
    util.ui.alert('yawf-user-guide', {
      'title': util.str.fill('{{installSuccessTitle}}'),
      'text': util.str.fill('{{installSuccessText}}'),
    });
  };
  // 显示新功能提示
  var showWhatsNew = function (sourceVersion) {
    // 列出新的功能
    var newFilters = filter.collection.item.list(function (item) {
      if (!item.version) return false;
      if (item.version <= sourceVersion) return false;
      if (item.version > currentVersion) return false;
      if (!item.show) return false;
      return true;
    });
    // 数数有多少
    var count = newFilters.filter(function (x) {
      return x.type !== 'subtitle' && x.type !== 'text' && x.type !== 'remark';
    }).length;
    // 如果没有的话，就当什么都没发生好了
    if (count === 0) return;
    // 显示对话框
    var dialog = util.ui.dialog('yawf-whats-new', util.str.fill('{{updateSuccessTitle}}'), function (inner) {
      var es = [html.whatsNewHeader, util.str.fill(html.whatsNewBody, { 'count': count }), html.whatsNewBottom, html.whatsNewFooter];
      es = es.map(function (x) { return util.dom.create(util.str.fill(x)); });
      var header = es[0], body = es[1], bottom = es[2], footer = es[3];
      // 依次列出所有新的设置项
      newFilters.forEach(function (item) {
        // 在列出时标明所属分类 
        if (item.type === 'subtitle' && item.grouped && item.grouped.length) {
          var text = '{{' + item.grouped[0].name + 'FilterGroupTitle}}';
          var title = util.dom.create(util.str.fill(html.configTitle, { 'text': text }));
          body.appendChild(title);
        }
        item._show(body);
      });
      filter.items.script.update.update._show(footer);
      body.appendChild(bottom);
      inner.appendChild(header); inner.appendChild(body); inner.appendChild(footer);
    });
    dialog.show();
  };
  filter.items.script.update = {};
  filter.items.script.update.title = filter.item({
    'group': 'update',
    'type': 'subtitle',
    'text': '{{updateInfoTitle}}',
  }).addto(filter.groups.script);
  filter.items.script.update.update = filter.item({
    'group': 'update',
    'version': 90,
    'type': 'boolean',
    'default': true,
    'text': '{{updateInfoDescription}}',
    'init': function () { util.config.reg('weibo._yawf_version'); },
    'ainit': function () {
      var sourceVersion = util.config.get('weibo._yawf_version', null, Number);
      if (!sourceVersion) util.func.call(showUserGuide);
      else if (sourceVersion < currentVersion) util.func.call(showWhatsNew, sourceVersion);
      util.config.put('weibo._yawf_version', currentVersion);
    },
  }).addto(filter.groups.script);
}(function () {
  var version = ((GM_info || {}).script || {}).version || '';
  var m = version.match(/^\d+\.\d+\.(\d+)$/);
  if (!m || !m[1] || !Number(m[1])) return null;
  return Number(m[1]);
}()));

// 调试
filter.items.script.debug = {};
filter.items.script.debug.title = filter.item({
  'group': 'debug',
  'type': 'subtitle',
  'text': '{{scriptDebugTitle}}',
}).addto(filter.groups.script);

filter.items.script.debug.debug = filter.item({
  'group': 'debug',
  'version': 0,
  'type': 'boolean',
  'text': '{{scriptDebug}}',
  'getconf': function () { return !!GM_getValue('debug', false); },
  'putconf': function (value) { GM_setValue('debug', !!value); return !!value; },
}).addto(filter.groups.script);

// 关于
filter.items.script.about = {};
filter.items.script.about.title = filter.item({
  'group': 'about',
  'type': 'subtitle',
  'text': '{{scriptAboutTitle}}',
}).addto(filter.groups.script);

filter.items.script.about.remark = filter.item({
  'group': 'about',
  'type': 'remark',
  'text': '',
  'shown': function (dom) {
    dom.innerHTML = util.str.fill(text.scriptAbout, {
      'version': ((GM_info || {}).script || {}).version || '?'
    });
  },
}).addto(filter.groups.script);

// 扩展
filter.items.script.extension = {};
filter.items.script.extension.title = filter.item({
  'group': 'extension',
  'type': 'subtitle',
  'text': '{{scriptExtensionTitle}}',
}).addto(filter.groups.script);

filter.items.script.extension.enable = filter.item({
  'group': 'extension',
  'version': 57,
  'type': 'boolean',
  'text': '{{scriptExtensionEnable}}',
  'getconf': function () { return !!GM_getValue('extent', false); },
  'putconf': function (value) { GM_setValue('extent', !!value); return !!value; },
}).addto(filter.groups.script);

filter.items.script.extension.remark = filter.item({
  'group': 'extension',
  'type': 'remark',
  'text': '{{scriptExtensionWarning}}',
}).addto(filter.groups.script);

// 可扩展区域
var extension = (function () {
  if (!GM_getValue('extent')) return null;
  var loaded = false;

  // 扩展分组
  var extensionFilterGroup = function () {
    var fg = filter.predef.group('extension');
    extensionFilterGroup = function () { return fg; };
    return extensionFilterGroup();
  };

  var yawf = (function () {
    // 暴露给外部的函数
    var yawf = {};
    var defineFunction = function (name, params, func) {
      yawf[name] = function (arg) {
        func.apply(window, params.map(function (key) { return arg[key]; }));
      };
    };
    // 检查 YAWF 加载成功
    defineFunction('ping', ['callback'], function (callback) {
      util.func.catched(callback)();
    });
    // 添加一个过滤器项
    defineFunction('filter', ['details'], function (details) {
      if (details.key) details.key = 'weibo.extent.' + details.key;
      if (details.group) details.group = 'extent.' + details.group;
      details.extern = true;
      var item = filter.item(details).addto(extensionFilterGroup());
      if (loaded && item._init) item._init();
    });
    // 向已有的内容、帐号等等过滤器中添加规则
    defineFunction('extent', ['name', 'type', 'words'], function (name, type, words) {
      var key = 'weibo.filters.' + name + '.' + type;
      filter.extent.act(key, words);
    });
    // 在过滤每条微博之前/后调用的回调函数
    defineFunction('before', ['callback'], function (callback) { observer.weibo.before(callback); });
    defineFunction('after', ['callback'], function (callback) { observer.weibo.after(callback); });
    // 对话框
    defineFunction('alert', ['id', 'details'], function (id, details) { util.ui.alert(id, details); });
    defineFunction('confirm', ['id', 'details'], function (id, details) { util.ui.confirm(id, details); });
    defineFunction('dialog', ['id', 'details'], function (id, details) {
      var dialog = util.ui.dialog(id, details.title, details.fill);
      dialog.show();
      details.shown(dialog);
    });
    return yawf;
  }());

  // 向 unsafeWindow 暴露接口
  var push = util.func.catched(function (args) {
    args = args.wrappedJSObject || args;
    var method = args.method, params = args.params;
    util.debug('$_YAWF_$.%s(%o)', method, params);
    if (yawf[method]) util.func.call(function () {
      util.func.catched(yawf[method])(params);
    });
  }.bind(window));
  if (unsafeWindow.$_YAWF_$) {
    util.debug('before loaded: %o', unsafeWindow.$_YAWF_$);
    Array.from(unsafeWindow.$_YAWF_$).forEach(push);
  }
  try {
    unsafeWindow.$_YAWF_$ = new Proxy({ 'push': push }, {
      'get': function (obj, name) { if (name === 'push') return obj.push; },
      'set': function () { }
    });
  } catch (e) { unsafeWindow.$_YAWF_$ = { 'push': push }; }
  util.init(function () {
    loaded = true; util.debug('YWAF loaded');
  }, util.priority.DEFAULT + util.priority.AFTER);
}());

util.init(function () {
  if (util.v6) util.css.add(fonts.iconfont);
}, util.priority.DEFAULT);

GM_addStyle(util.str.fill((util.str.cmt(function () { /*!CSS
  // 漏斗图标
  body[yawf-weibo-version="v5"] .gn_setting[node-type="member"]:last-child { margin-right: 44px; }
  body[yawf-weibo-version="v5"] .WB_global_nav .gn_setting .gn_tab.gn_filter .ico { background-image: url("{{filter-img}}"); !important; background-position: 0 0 !important; }
  body[yawf-weibo-version="v5"] .WB_global_nav .gn_search { width: 210px !important; left: 440px !important; position: absolute !important; }
  body[yawf-weibo-version="v5"] .WB_global_nav .gn_search .gn_input { width: 168px !important; }
  body[yawf-weibo-version="v6"] .gn_search .W_input { box-sizing: border-box !important; height: 32px !important; }
  body[yawf-weibo-version="v6"] .gn_filter .W_ficon { font-family: "yawf-iconfont" !important; }
  {{yawf-icon-font}}
  // 设置框相关样式
  body[yawf-weibo-version="v5"] .yawf-config-body { margin: -20px; padding: 20px; }
  body[yawf-weibo-version="v6"] .yawf-config-body { margin: 0 -20px -20px; padding: 0 20px 20px; }
  body[yawf-weibo-version="v6"] .yawf-config-header { margin-bottom: -50px; }
  body[yawf-weibo-version="v6"] .yawf-config-header ul { position: absolute; top: 9px; left: 10em; }
  body[yawf-weibo-version="v6"] #yawf-config .W_layer_title { padding-top: 8px; line-height: 30px; }
  .yawf-Layer.yawf-drag { opacity: 0.67; -moz-user-select: none; user-select: none; }
  #yawf-config [node-type="inner"] { padding: 20px; }
  .yawf-config-body { max-height: 360px; overflow-y: auto; width: 760px; }
  #yawf-config .profile_tab { font-size: 12px; margin: -20px -20px 20px; width: 800px; }
  .yawf-config-layer { padding-bottom: 20px; }
  .yawf-groupSubtitle, .yawf-groupRemark { margin: 5px 10px; padding: 10px 0 0 0; }
  .yawf-groupLabel { margin: 5px 10px; padding: 10px 0 0 2em; }
  .yawf-groupSubtitle { font-weight: bold; }
  .yawf-groupTitle::after { content: "-"; margin-left: 0.5em; }
  .yawf-groupTitle { float: left; font-weight: bold; margin: 5px 0.5em 5px 10px; padding: 10px 0 0; }
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
  .yawf-configSelectAll { float: right; margin-top: -23px; height: 21px !important; line-height: 19px; }
  .yawf-configSelectAll * { line-height: 19px !important; height: 19px !important; }
  .yawf-configImportExport [node-type] { margin-right: 20px; }
  .yawf-configAdd { appearance: none; }
  #yawf-config .btn { border-top: 1px solid #ccc; margin: 15px 0 0; padding: 10px 0 0; }
  #yawf-config .btn .W_btn_b_disable:hover { border-color: #d9d9d9; }
  #yawf-config .btn .W_btn_b_disable:hover span { border-color: #ffffff; }
  .layoutFilterGroupLayer .yawf-configBoolean { display: inline-block; margin-right: 0; }
  .yawf-userstyles-tip { float: right; margin: 0 0 0 1em; }
  // 新功能提示
  #yawf-whats-new [node-type="inner"] { padding: 10px 0; width: 760px; }
  .yawf-whats-new-header { font-size: 16px; line-height: 40px; padding: 0 20px; }
  .yawf-whats-new-desc { font-size: 14px; }
  .yawf-whats-new-bottom { height: 20px; }
  .yawf-whats-new-body { max-height: 300px; overflow: auto; padding: 0 20px; }
  .yawf-whats-new-footer { margin: 0 0 20px; color: #555; line-height: 20px; padding: 0 20px; }
  .yawf-whats-new-footer .yawf-configItem, .yawf-groupText { margin: 0; }
  .yawf-configItem input[type="number"]:not(:focus) ~ .yawf-range-container:not(:hover) > input[type="range"]:not(:focus) { display: none; }
  // 隐藏微博
  [yawf-display$="-hidden"] { display: none !important; }
  [node-type="feed_list"] .WB_feed_type:not([yawf-display]), [node-type="feed_list"] .WB_feed_type .WB_feed_type:not([yawf-display]) { visibility: hidden !important; }
  // 折叠微博
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_screen { margin-top: -40px !important; }
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .type_spe_pos,
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]>*:first-child:not(.WB_screen):not(.WB_feed_detail) { display: none !important; }
  // v5
  body[yawf-weibo-version="v5"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_datail { min-height: 0; max-height: 0; transition: max-height 0.1s; overflow: hidden; cursor: pointer; position: relative; }
  body[yawf-weibo-version="v5"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_datail:not(:hover) { transition: max-height 0.3s; }
  body[yawf-weibo-version="v5"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_datail { padding: 0; }
  body[yawf-weibo-version="v5"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]::before { display: block; line-height: 1em; padding: 0.5em 1.5em; border: 1px solid; border-color: transparent; margin: 0 0 20px; width: calc(100% - 3em - 2px); cursor: pointer; opacity: 0.8; }
  // v6
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_detail { min-height: 0; max-height: 0; transition: max-height 0.1s; overflow: hidden; cursor: pointer; position: relative; }
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover .WB_feed_detail:not(:hover) { transition: max-height 0.3s; }
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_detail { padding: 0; }
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] .WB_feed_detail + .WB_feed_handle { display: none; }
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"] { padding: 20px 15px 0; }
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]::before { display: block; line-height: 1em; padding: 0.5em 20px; border: 1px solid; border-color: transparent; margin: 0 1em; width: calc(100% - 6em - 2px); cursor: pointer; opacity: 0.8; }
  body[yawf-weibo-version="v6"] [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]>*:first-child { padding-top: 20px; }
  // Common
  [node-type="feed_list"] .WB_feed_type[yawf-display$="-fold"]:hover::before { opacity: 1; }
  // 其他
  .WB_feed_together .wft_users { display: none; }
  .WB_feed_together[yawf-sonfold="display"] [node-type="feed_list_wrapForward"] { display: block !important; }
  .WB_feed_together[yawf-sonfold="display"] [action-type="feed_list_seeAll"],
  .WB_feed_together[yawf-sonfold="display"] [action-type="feed_list_foldForward"] { display: none !important; }
  .W_miniblog, .WB_miniblog { visibility: hidden; }
  .yawf-range-container { background-color: #f0f0f0; background-color: -moz-dialog; position: relative; display: inline-block; margin-left: -66px; width: 81px; margin-right: -15px; -webkit-transform: rotate(270deg); transform: rotate(270deg); top: calc(-1em - 36px); box-shadow: 0px 12px #f0f0f0, 0px -12px #f0f0f0; box-shadow: 0px 12px -moz-dialog, 0px -12px -moz-dialog; }
  // 拖拽
  #yawf-drop-area { background: rgba(251, 251, 216, 1); opacity: 0.8; display: none; height: 230px; left: calc(50% + 260px); position: fixed; top: 40px; width: 230px; z-index: 9999; }
  [yawf-weibo-version="v6"] #yawf-drop-area { top: 50px; }
  #yawf-drop-area.valid { opacity: 1; }
  .yawf-drop-area-desc { height: 170px; width: 170px; margin: 16px 16px -206px 16px; padding: 10px; -moz-user-select: none; user-select: none; border: 4px dashed #ddd; border-radius: 20px; color: #000; }
  .yawf-drop-area-title { font-size: 150%; font-weight: bold; }
  .yawf-drop-area-text { padding: 10px; }
  #yawf-drop-area-content { height: 230px; width: 230px; position: relative; z-index: 10002; opacity: 0; }
  #yawf-fast-filter-chose, #yawf-fast-filter-list { padding: 20px 40px; }
  #yawf-fast-filter-text { font-weight: bold; }
  #yawf-drop-area ul { list-style: disc; margin-left: 2em; }
  // 其他页面优化设置
  #pl_rightmod_myinfo:empty { hegiht: 156px; }
  // 切换视图
  body[yawf-weibo-version="v6"] #yawf-weibo-only { float: right; height: 38px; width: 80px; line-height: 38px; text-align: center; }
  // v6 微博按钮的平均分布 -webkit-flex 是 Safari 兼容
  body[yawf-weibo-version="v6"] .WB_handle ul {
    display: -webkit-flex; -webkit-flex-direction: row; -webkit-flex-wrap: nowrap; -webkit-justify-content: -webkit-space-around; -webkit-align-items: stretch; margin-left: -4px;
    display: flex; flex-direction: row; flex-wrap: nowrap; justify-content: space-around; align-items: stretch; margin-left: -4px;
  }
  body[yawf-weibo-version="v6"] .WB_handle ul li {
    -webkit-flex-grow: 1; float: none; width: auto;
    flex-grow: 1; float: none; width: auto;
  }
*/ }) + '\n').replace(/\/\/.*\n/g, '\n'), {
  'filter-img': images.filter,
  'yawf-icon-font' :util.css.add(fonts.iconfont),
}));
