// ==UserScript==
// @name        Yet Another Weibo Filter
// @namespace   https://github.com/tiansh
// @description 新浪微博根据关键词、作者、话题、来源等过滤微博；修改版面。 新浪微博根據關鍵字、作者、話題、來源等篩選微博；修改版面。 filter Sina Weibo by keywords, original, topic, source, etc.; modify layout
// @include     http://weibo.com/*
// @include     http://www.weibo.com/*
// @version     0.1.12 alpha
// @updateURL   https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.meta.js
// @downloadURL https://tiansh.github.io/yawf/Yet_Another_Weibo_Filter.user.js
// @author      田生
// @copyright   2013+, 田生
// @license     The MIT License (MIT); http://opensource.org/licenses/MIT
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @grant       GM_addStyle
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceURL
// @grant       unsafeWindow
// @run-at      document-start
// @resource    filter_png http://tiansh.github.io/yawf/filter.png?version=20140713
// ==/UserScript==

// 图片
var images = {
  'filter': GM_getResourceURL('filter_png'),
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


// 文本常量
// 请以简体中文为原文，参考这些资料翻译
// http://zh.wikipedia.org/wiki/Template:CGroup/IT
// http://www.microsoft.com/Language/zh-cn/Search.aspx
var text = {
  // 基本按钮
  'okButtonTitle': { 'zh-cn': '确定', 'zh-hk': '確定', 'zh-tw': '確定', 'en': 'Confirm' },
  'cancelButtonTitle': { 'zh-cn': '取消', 'zh-hk': '取消', 'zh-tw': '取消', 'en': 'Cancel' },
  'closeButtonTitle': { 'zh-cn': '关闭', 'zh-hk': '關閉', 'zh-tw': '關閉', 'en': 'Close' },
  'configApplyButton': { 'zh-cn': '应用', 'zh-hk': '套用', 'zh-tw': '套用', 'en': 'Apply' },
  'configSaveButton': { 'zh-cn': '保存', 'zh-hk': '儲存', 'zh-tw': '儲存', 'en': 'Save' },
  'configCancelButton': { 'zh-cn': '取消', 'zh-hk': '取消', 'zh-tw': '取消', 'en': 'Cancel' },
  'configStringsAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'configUsersAdd': { 'zh-cn': '添加', 'zh-hk': '新增', 'zh-tw': '新增', 'en': 'Add' },
  'foldedWeiboText': { 'zh-cn': '"来自 @" attr(yawf-author) " 的一条微博被折叠，请点击查看"', 'zh-hk': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"', 'zh-tw': '"來自 @" attr(yawf-author) " 的一條微博被折疊，請點擊查看"', 'en': '"A Weibo from @" attr(yawf-author) " was folded, click to view."' },
  // 设置框
  'filter': { 'zh-cn': '过滤器', 'zh-hk': '篩選器', 'zh-tw': '篩選器', 'en': 'Filter' },
  'configDialogTitle': { 'zh-cn': '过滤器设置', 'zh-hk': '篩選器設定', 'zh-tw': '篩選器設定', 'en': 'Filter Settings' },
  'configRefreshNotice': { 'zh-cn': '部分设置修改需要保存后重新载入页面才能生效', 'zh-hk': '部分設定變更需要儲存後重新載入網頁才能生效', 'zh-tw': '部分設定變更需要儲存後重新載入網頁才能生效', 'en': 'Some settings need refresh webpage after save to apply' },
  'whitelistFilterDesc': { 'zh-cn': '总是显示{{{typed}}}', 'zh-hk': '總是顯示{{{typed}}}', 'zh-tw': '總是顯示{{{typed}}}', 'en': 'Always show {{{typed}}}' },
  'blacklistFilterDesc': { 'zh-cn': '隐藏{{{typed}}}', 'zh-hk': '隱藏{{{typed}}}', 'zh-tw': '隱藏{{{typed}}}', 'en': 'Hide {{{typed}}}' },
  'foldlistFilterDesc': { 'zh-cn': '折叠{{{typed}}}', 'zh-hk': '折疊{{{typed}}}', 'zh-tw': '折疊{{{typed}}}', 'en': 'Fold {{{typed}}}' },
  // 关键词
  'keywordFilterGroupTitle': { 'zh-cn': '内容', 'zh-hk': '內容', 'zh-tw': '內容', 'en': 'Content' },
  'keywordFilterDesc': { 'zh-cn': '关键词', 'zh-hk': '關鍵字', 'zh-tw': '關鍵字', 'en': 'Keyword' },
  'keywordFilterDetails': { 'zh-cn': '包含以下关键词的微博', 'zh-hk': '包含以下關鍵字的微博', 'zh-tw': '包含以下關鍵字的微博', 'en': 'Weibo with these keywords' },
  // 正则表达式
  'regexpFilterGroupTitle': { 'zh-cn': '正则', 'zh-hk': '正則', 'zh-tw': '正規', 'en': 'Regexp' },
  'regexpFilterDesc': { 'zh-cn': '正则式', 'zh-hk': '正則式', 'zh-tw': '正規式', 'en': 'Regexp' },
  'regexpFilterDetails': { 'zh-cn': '匹配以下正则表达式的微博', 'zh-hk': '匹配以下正則表達式的微博', 'zh-tw': '匹配以下正規表示式的微博', 'en': 'Weibo matches these regular expressions' },
  'regexpFilterRemark': { 'zh-cn': '书写时不需要对“/”字符转义', 'zh-hk': '書寫時不需要對“/”字符轉義', 'zh-tw': '書寫時不需要對“/”字符轉義', 'en': 'Do not escape "/" in your regexp.' },
  'regexpBadFormedTitle': { 'zh-cn': '非法的正则表达式', 'zh-hk': '不合法的正則表達式', 'zh-tw': '不合法的正規表示式', 'en': 'Illegal Regexp' },
  'regexpBadFormed': { 'zh-cn': '您输入的/{{regexp}}/不能被正确地解析为正则表达式，请检查您的输入。如需关键词屏蔽请到内容标签页设置。', 'zh-hk': '您输入的/{{regexp}}/不能被正确地解析为正则表达式，请检查您的输入。如需关键词屏蔽请到内容标签页面设置。', 'zh-tw': '您輸入的/{{regexp}}/不能被正確地解析為正規表示式，請檢查您的輸入。如需關鍵詞屏蔽請到內容標籤頁面設置。', 'en': 'Can not parse /{{regexp}}/ as regexp. Please check your input. You may hide Weibo by keywords in Content tab page.' },
  // 帐号
  'accountFilterGroupTitle': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'accountFilterDetails': { 'zh-cn': '来自以下帐号的微博', 'zh-hk': '來自以下帳號的微博', 'zh-tw': '來自以下帳號的微博', 'en': 'Weibo from these accounts' },
  'accountNotExistErrorTitle': { 'zh-cn': '帐号不存在', 'zh-hk': '帳號不存在', 'zh-tw': '帳號不存在', 'en': 'Account does not exist' },
  'accountNotExistError': { 'zh-cn': '不存在名为{{name}}的账号', 'zh-hk': '不存在名為{{name}}的賬號', 'zh-tw': '不存在名為{{name}}的賬號', 'en': 'Account named {{name}} does not exist' },
  // 原创
  'originalFilterGroupTitle': { 'zh-cn': '原创', 'zh-hk': '原創', 'zh-tw': '原創', 'en': 'Original' },
  'originalFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'originalFilterDetails': { 'zh-cn': '转发自以下账号的微博', 'zh-hk': '隱藏轉發自以下帳號的微博', 'zh-tw': '隱藏轉發自以下帳號的微博', 'en': 'Hide Weibo forwarded from these accounts' },
  // 提到
  'mentionFilterGroupTitle': { 'zh-cn': '提到', 'zh-hk': '提到', 'zh-tw': '提到', 'en': 'Mention' },
  'mentionFilterDesc': { 'zh-cn': '帐号', 'zh-hk': '帳號', 'zh-tw': '帳號', 'en': 'Account' },
  'mentionFilterDetails': { 'zh-cn': '提到以下账号的微博', 'zh-hk': '提到以下帳號的微博', 'zh-tw': '提到以下帳號的微博', 'en': 'Weibo mentioned these accounts' },
  // 话题
  'topicFilterGroupTitle': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDesc': { 'zh-cn': '话题', 'zh-hk': '話題', 'zh-tw': '話題', 'en': 'Topic' },
  'topicFilterDetails': { 'zh-cn': '包含以下话题的微博', 'zh-hk': '包含以下話題的微博', 'zh-tw': '包含以下話題的微博', 'en': 'Weibo with these topics' },
  // 来源
  'sourceFilterGroupTitle': { 'zh-cn': '来源', 'zh-hk': '來源', 'zh-tw': '來源', 'en': 'Source' },
  'sourceFilterDesc': { 'zh-cn': '来自', 'zh-hk': '來自', 'zh-tw': '來自', 'en': 'Via' },
  'sourceFilterDetails': { 'zh-cn': '以下来源的微博', 'zh-hk': '以下來源的微博', 'zh-tw': '以下來源的微博', 'en': 'Weibo from these sources' },
  'sourceFilterWarningTitle': { 'zh-cn': '默认来源', 'zh-hk': '預設來源', 'zh-tw': '預設來源', 'en': 'Default Source' },
  'sourceFilterWarning': { 'zh-cn': '不能添加默认来源', 'zh-hk': '不能新增預設來源', 'zh-tw': '不能新增預設來源', 'en': 'You cannot add default source' },
  // 超链接
  'hyperlinkFilterGroupTitle': { 'zh-cn': '链接', 'zh-hk': '連結', 'zh-tw': '連結', 'en': 'Link' },
  'hyperlinkFilterDesc': { 'zh-cn': '超链接', 'zh-hk': '超連結', 'zh-tw': '超連結', 'en': 'Hyperlink' },
  'hyperlinkFilterDetails': { 'zh-cn': '包含指向以下网站的超链接的微博', 'zh-hk': '包含指向以下站點的超連結的微博', 'zh-tw': '包含指向以下站點的超連結的微博', 'en': 'Weibo with hyperlink to these website' },
  // 更多
  'otherFilterGroupTitle': { 'zh-cn': '更多', 'zh-hk': '其他', 'zh-tw': '其他', 'en': 'More' },
  'adfeedFilterDesc': { 'zh-cn': '隐藏推广微博', 'zh-hk': '隱藏推廣微博', 'zh-tw': '隱藏推廣微博', 'en': 'Hide ad Weibo' },
  'recommandFeedDesc': { 'zh-cn': '隐藏推荐微博', 'zh-hk': '隱藏建議微博', 'zh-tw': '隱藏建議微博', 'en': 'Hide recommand Weibo' },
  'followSuggestFilterDesc': { 'zh-cn': '隐藏关注推荐微博', 'zh-hk': '隱藏關注建議微博', 'zh-tw': '隱藏關注建議微博', 'en': 'Hide Following Recommended Weibo' },
  'deletedForwardFilterDesc': { 'zh-cn': '隐藏已删除微博的转发', 'zh-hk': '隱藏已刪除微博的轉發', 'zh-tw': '隱藏已刪除微博的轉發', 'en': 'Hide forward of deleted Weibo' },
  'voteWeiboFilterDesc': { 'zh-cn': '隐藏投票微博', 'zh-hk': '隱藏投票微博', 'zh-tw': '隱藏投票微博', 'en': 'Hide vote weibo' },
  // 模块
  'layoutFilterGroupTitle': { 'zh-cn': '模块', 'zh-hk': '模組', 'zh-tw': '模組', 'en': 'Module' },
  // 标识图标
  'layoutHideIcon': { 'zh-cn': '标识/图标', 'zh-hk': '標誌/圖示', 'zh-tw': '標誌/圖示', 'en': 'Logo / Icon' },
  'layoutHideIconLevel': { 'zh-cn': '等级', 'zh-hk': 'Level', 'zh-tw': '等級', 'en': 'Level' },
  'layoutHideIconMember': { 'zh-cn': '微博会员', 'zh-hk': '微博會員', 'zh-tw': '微博會員', 'en': 'Weibo VIP / Member' },
  'layoutHideIconApprove': { 'zh-cn': '个人认证', 'zh-hk': '個人認證', 'zh-tw': '個人認證', 'en': 'Personal Authentication / 個人認證' },
  'layoutHideIconApproveCo': { 'zh-cn': '机构认证', 'zh-hk': '企業認證', 'zh-tw': '企業認證', 'en': 'Weibo Verification / 企業認證' },
  'layoutHideIconClub': { 'zh-cn': '微博达人', 'zh-hk': '微博達人', 'zh-tw': '微博達人', 'en': 'Pioneer' },
  'layoutHideIconVGirl': { 'zh-cn': '微博女郎', 'zh-hk': '微博女郎', 'zh-tw': '微博女郎', 'en': 'Weibo girl' },
  'layoutHideIconTaobao': { 'zh-cn': '淘宝商户', 'zh-hk': '淘寶商戶', 'zh-tw': '淘寶商戶', 'en': 'Taobao Merchant' },
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
  'layoutHideMiddleRecommendedTopic': { 'zh-cn': '热门微博（发布框上方）', 'zh-hk': '热门微博（發布框上方）', 'zh-tw': '热门微博（發布框上方）'/* as is */, 'en': '热门微博 (Hot Weibo), top of publisher' },
  'layoutHideMiddleMemberTip': { 'zh-cn': '开通会员提示（底部）', 'zh-hk': '開通會員提示（底部）', 'zh-tw': '開通會員提示（底部）', 'en': 'Tip of Join Weibo VIP, bottom' },
  // 右栏
  'layoutHideRight': { 'zh-cn': '右栏', 'zh-hk': '右欄', 'zh-tw': '右欄', 'en': 'Right Column' },
  'layoutHideRightWhole': { 'zh-cn': '整个右栏', 'zh-hk': '整個右欄', 'zh-tw': '整個右欄', 'en': 'Whole Right Column' },
  'layoutHideRightTemplate': { 'zh-cn': '设置模板', 'zh-hk': '背景設定', 'zh-tw': '背景設定', 'en': 'Template Settings' },
  'layoutHideRightInfo': { 'zh-cn': '头像', 'zh-hk': '頭像', 'zh-tw': '頭像', 'en': 'Avatar' },
  'layoutHideRightTrial': { 'zh-cn': '会员资格体验', 'zh-hk': '会员资格体验', 'zh-tw': '会员资格体验'/* as is */, 'en': '会员资格体验 (Trial of VIP)' },
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
  'layoutHideWeiboLocationCard': { 'zh-cn': '位置卡片', 'zh-hk': '位置卡片', 'zh-tw': '位置卡片', 'en': 'Location Cards' },
  'layoutHideWeiboFeedTip': { 'zh-cn': '评论框提示横幅', 'zh-hk': '評論框提示橫幅', 'zh-tw': '評論框提示橫幅', 'en': 'Tips for Comment' },
  // 个人主页
  'layoutHidePerson': { 'zh-cn': '个人主页', 'zh-hk': '個人主頁', 'zh-tw': '個人主頁', 'en': 'Ones home page' },
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
  // 工具
  'toolFilterGroupTitle': { 'zh-cn': '工具', 'zh-hk': '工具', 'zh-tw': '工具', 'en': 'Tool' },
  'clearDefTopicDesc': { 'zh-cn': '清除发布框中的默认话题', 'zh-hk': '清除發布框中的預設話題', 'zh-tw': '清除發布框中的預設話題', 'en': 'Remove default topic in Publisher' },
  'userstyleTitle': { 'zh-cn': '自定义CSS', 'zh-hk': '自訂CSS', 'zh-tw': '自訂CSS', 'en': 'Customize CSS' },
  'userstyleEditDesc': { 'zh-cn': '编辑微博自定义CSS', 'zh-hk': '編輯微博自訂CSS', 'zh-tw': '編輯微博自訂CSS', 'en': 'Edit Weibo Customize CSS' },
  'userstyleEditDetails': { 'zh-cn': 'YAWF CSS: ', 'zh-hk': 'YAWF CSS: ', 'zh-tw': 'YAWF CSS: ', 'en': 'YAWF CSS: ' },
  'showAllGroupDesc': { 'zh-cn': '展开左栏分组', 'zh-hk': '展開左欄分組', 'zh-tw': '展開左欄分組', 'en': 'Unfold groups in left column' },
  'showAllMsgNavDesc': { 'zh-cn': '展开左栏消息', 'zh-hk': '展開左欄消息', 'zh-tw': '展開左欄消息', 'en': 'Unfold news in left column' },
  'unwrapTextDesc': { 'zh-cn': '微博作者和正文同行', 'zh-hk': '微博作者和正文同行', 'zh-tw': '微博作者和正文同行', 'en': 'No line break after author' },
  'viewOriginalDesc': { 'zh-cn': '添加“查看原图”链接', 'zh-hk': '添加“查看原圖”連結', 'zh-tw': '添加“查看原圖”連結', 'en': 'add "Original Picture" link' },
  'viewOriginalText': { 'zh-cn': '查看原图', 'zh-hk': '查看原圖', 'zh-tw': '查看原圖', 'en': 'Original Picture' },
  // 脚本
  'scriptFilterGroupTitle': { 'zh-cn': '脚本', 'zh-hk': '腳本', 'zh-tw': '腳本', 'en': 'Script' },
  // 导入导出
  'configImportAndExport': { 'zh-cn': '设置', 'zh-hk': '設定', 'zh-tw': '設定', 'en': 'Setting' },
  'configImportButton': { 'zh-cn': '导入', 'zh-hk': '匯入', 'zh-tw': '匯入', 'en': 'Import' },
  'configImportWarningTitle': { 'zh-cn': '设置导入', 'zh-hk': '設定匯入', 'zh-tw': '設定匯入', 'en': 'Setting Import' },
  'configImportWarning': { 'zh-cn': '导入的设置会覆盖您当前已有的设置，确实要导入设置吗？', 'zh-hk': '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？', 'zh-tw': '匯入的設定會覆蓋您當前已有的設定，您確定要匯入設定嗎？', 'en': 'The imported settings may replace your current settings. Are you sure you want to import this file?' },
  'configImportSuccessTitle': { 'zh-cn': '设置导入完成', 'zh-hk': '設定匯入完成', 'zh-tw': '設定匯入完成', 'en': 'Import settings'},
  'configImportSuccess': { 'zh-cn': '已经成功地导入了设置', 'zh-hk': '已经成功地匯入了設定', 'zh-tw': '已经成功地匯入了設定', 'en': 'Successfully imported settings' },
  'configImportFailTitle': { 'zh-cn': '设置导入失败', 'zh-hk': '設定匯入失败', 'zh-tw': '設定匯入失败', 'en': 'Import settings' },
  'configImportFail': { 'zh-cn': '导入设置文件时出现错误，可能是使用了错误的文件，文件被损坏或文件的版本不支持', 'zh-hk': '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案被損壞或設定檔案的版本不支持', 'zh-tw': '匯入設定檔案時出現錯誤，可能是使用了錯誤的檔案，檔案被損壞或設定檔案的版本不支持', 'en': 'Error occurred during importing process. Wrong file may be used, the file may be broken, or the version of setting file is not supported.' },
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
    'zh-cn': 'YAWF (Yet Another Weibo Filter) 使用 MIT 协议授权。您可以访问脚本的主页 <a href="https://github.com/tiansh/yawf">https://github.com/tiansh/yawf</a> 获取详细信息。<br />本脚本参考并使用了<a href="https://code.google.com/p/weibo-content-filter/">眼不见心不烦</a>脚本的部分代码。',
    'zh-hk': 'YAWF (Yet Another Weibo Filter) 使用 MIT 協議授權。您可以訪問腳本的主頁 <a href="https://github.com/tiansh/yawf">https://github.com/tiansh/yawf</a> 獲取詳細訊息。<br />本腳本參考並使用了<a href="https://code.google.com/p/weibo-content-filter/">眼不见心不烦</a>腳本的部分代碼。',
    'zh-tw': 'YAWF (Yet Another Weibo Filter) 使用 MIT 協議授權。您可以訪問腳本的主頁 <a href="https://github.com/tiansh/yawf">https://github.com/tiansh/yawf</a> 獲取詳細訊息。<br />本腳本參考並使用了<a href="https://code.google.com/p/weibo-content-filter/">眼不见心不烦</a>腳本的部分代碼。',
    'en': 'YAWF (Yet Another Weibo Filter) is under the MIT License. Project host page: <a href="https://github.com/tiansh/yawf">https://github.com/tiansh/yawf</a>。<br />Some codes of this script come from <a href="https://code.google.com/p/weibo-content-filter/">眼不见心不烦 (Weibo Content Filter)</a> script.'
  },
};

// 页面常量
var html = {
  'cover': '<div node-type="outer" style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background: #000; opacity: 0.3; z-index: 10001;"></div>',
  'dialog': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title"><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"></div></div></td></tr></tbody></table></div></div>',
  'alert': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title" style=""><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"><div class="layer_point" node-type="outer"><dl class="point clearfix"><dt><span node-type="icon" class="icon_{{icon}}M"></span></dt><dd node-type="inner"><p node-type="textLarge" class="S_txt1">{{text}}</p><p node-type="textSmall" class="S_txt2"></p></dd></dl><div class="btn"><a node-type="OK" class="W_btn_a" href="javascript:void(0)"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a></div></div></div></div></td></tr></tbody></table></div></div>',
  'confirm': '<div style="position: absolute; z-index: 10001;" node-type="outer" class="W_layer yawf-Layer" id="{{id}}"><div class="bg"><table cellspacing="0" cellpadding="0" border="0"><tbody><tr><td><div node-type="layoutContent" class="content"><div node-type="title" class="title" style=""><span node-type="title_content">{{title}}</span></div><a node-type="close" title="{{closeButtonTitle}}" class="W_close" href="javascript:void(0);"></a><div node-type="inner"><div class="layer_point" node-type="outer"><dl class="point clearfix"><dt><span node-type="icon" class="icon_{{icon}}M"></span></dt><dd node-type="inner"><p node-type="textLarge" class="S_txt1">{{text}}</p><p node-type="textComplex" class="S_txt2" style="display: none;"></p><p node-type="textSmall" class="S_txt2" style="display: none;"></p></dd></dl><div class="btn"><a node-type="OK" class="W_btn_a" href="javascript:void(0)"><span class="btn_30px W_f14">{{okButtonTitle}}</span></a><a node-type="cancel" class="W_btn_b" href="javascript:void(0)"><span class="btn_30px W_f14">{{cancelButtonTitle}}</span></a></div></div></div></div></td></tr></tbody></table></div></div>',
  'icon': '<div class="gn_setting" node-type="filter"><i><a class="gn_tab gn_filter" href="#"><span class="ico">{{filter}}</span></a></i></div>',
  'configHeaderTop': '<div class="profile_tab S_line5 yawf-config-header" node-type="yawf-config-header"><ul class="pftb_ul S_line1">',
  'configHeaderItem': '<li class="pftb_itm S_line1 {{liclass}}"><a class="pftb_lk S_line5 S_txt1 {{aclass}}" action-type="tab_item" onclick="return false;" href="javascript:void(0);">{{name}}</a>',
  'configHeaderBottom': '</ul></div>',
  'configLayerTop': '<div node-type="yawf-config-body" class="yawf-config-body">',
  'configLayerItem': '<div class="{{name}} yawf-config-layer" node-type="{{name}}" style="display: none;"></div>',
  'configLayerBottom': '</div>',
  'configFooter': '<div class="btn clearfix" node-type="yawf-config-footer"><span class="W_fl S_txt2">{{configRefreshNotice}}</span><a node-type="apply" class="W_btn_b W_btn_b_disable" action-type="apply" href="javascript:;"><span class="btn_30px W_f14">{{configApplyButton}}</span></a><a node-type="save" class="W_btn_a" action-type="save" href="javascript:;"><span class="btn_30px W_f14">{{configSaveButton}}</span></a><a node-type="cancel" class="W_btn_b" action-type="cancel" href="javascript:;"><span class="btn_30px W_f14">{{configCancelButton}}</span></a></div>',
  'configSubtitle': '<div class="yawf-groupSubtitle">{{{text}}}</div>',
  'configText': '<div class="yawf-groupText">{{{text}}}</div>',
  'configBoolean': '<div class="yawf-configBoolean yawf-configItem"><label><input id="yawf-{{key}}" class="W_checkbox yawf-configBooleanInput" type="checkbox" name="yawf-{{key}}"><span class="yawf-configDesc yawf-configBooleanDesc">{{{text}}}</span></label></div>',
  'configString': '<div class="yawf-configString yawf-configItem"><label><span>{{{text}}}</span><textarea id="yawf-{{key}}" class="W_input yawf-configStringInput" name="yawf-{{key}}"></label></div>',
  'configStrings': '<div class="yawf-configStrings yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configStringsDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configStringsInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configStringsAdd}}</span></button></form><ul class="yawf-configStringsItems"></ul></div>',
  'configStringsItem': '<li class="W_btn_arrow tag yawf-configStringsItem"><span>{{[item]}}<a class="W_ico12 icon_close" href="javascript:void(0);"></a></span></li>',
  'configUsers': '<div class="yawf-configUsers yawf-configItem"><form action="#"><label><span class="yawf-configDesc yawf-configUsersDesc">{{{text}}}</span><input id="yawf-{{key}}" class="W_input yawf-configUsersInput" type="text" name="yawf-{{key}}"></label><button id="yawf-add-{{key}}" class="W_btn_a yawf-configAdd" type="submit"><span>{{configUsersAdd}}</span></button></form><ul class="yawf-configUsersItems"></ul></div>',
  'configUsersItem': '<li class="yawf-configUsersItem"><div class="shield_object_card"><div class="card_bg clearfix"><div class="card_pic"><span class="pic"><img class="W_face_radius" width="50" height="50" alt="" src="{{avatar}}"></span></div><div class="card_content"><div class="object_info clearfix"><p class="W_fl"><span class="object_name" uid="{{id}}" title="{{name}}">{{name}}</span></p><p class="W_fr"><a class="W_ico12 icon_close" action-data="uid={{id}}" href="javascript:void(0);"></a></p></div><div class="other_info"></div></div></div></div></li>',
  'configImportExport': '<div class="yawf-configImportExport yawf-configItem"><label><input type="file" style=" width: 1px; height: 1px; margin: 0 -1px 0 0; opacity: 0;" /><span node-type="import" class="W_btn_b" action-type="import"><span class="W_f14">{{configImportButton}}</span></span></label><a node-type="export" class="W_btn_b" action-type="export" href="javascript:;"><span class="W_f14">{{configExportButton}}</span></a><a node-type="reset" class="W_btn_b" action-type="reset" href="javascript:;"><span class="W_f14">{{configResetButton}}</span></a></div>',
  'viewOriginalLink': '<a target="_blank" class="show_big" suda-data="key=tblog_newimage_feed&value=view_original" action-type="maximum" href="javascript:;"><em class="W_ico12 ico_showbig"></em>{{viewOriginalText}}</a><i class="W_vline">|</i>',
};

var url = {
  'newcard': 'http://weibo.com/aj/user/newcard?type=1&{{query}}&_t=1&callback={{callback}}',
  'view_ori': 'http://photo.weibo.com/{{uid}}/wbphotos/large/mid/{{mid}}/pid/{{pid}}',
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

// 根据用户界面上的语言做不同调整
var i18n = (function () {
  var defaultLang = 'zh-cn';
  var lang = null;
  var pending = [];
  var chose = function (langObj) {
    langObj.local = langObj[lang] || langObj[defaultLang];
  };
  var langs = function (langObj) {
    pending.push(langObj);
  };
  var setLang = function (l) {
    lang = l;
    pending.map(chose);
    pending = [];
    i18n = chose;
    i18n.lang = l;
  };
  langs.setLang = setLang;
  return langs;
}());

// 将字符串用&#dd的形式转义
var escapeXml = function (s) {
  return s.replace(/./g, function (c) { return '&#' + c.charCodeAt(0); });
};

// 以参数填充字符串
var fillStr = function (base) {
  var argdatas = Array.apply(Array, arguments).slice(1);
  var datas = argdatas.concat([text]);
  return base.replace(/{{([\[{]?([a-zA-Z0-9_-]*)[\]}]?)}}/g, function (o, i, p) {
    var ret = null;
    datas.some(function (data) {
      if (p in data && typeof data[p] === 'string') ret = data[p];
      return ret !== null;
    });
    if (ret) {
      if (i[0] === '{') return fillStr.bind(this, ret).apply(null, argdatas);
      if (i[0] === '[') return escapeXml(ret);
    }
    return ret || o;
  });
};

// 设置项
var config = function (uid) {
  var config = {}, storageKey = 'user' + uid + 'config';
  var onputs = [];
  var tonputs = function (key, value, oldValue) {
    onputs.map(function (f) { f(key, value, oldValue); });
  };
  // 写入到内存
  var put = function (key, value) {
    tonputs(key, value, config[key]);
    config[key] = value;
    return value;
  };
  // 从内存读取
  var get = function (key, value, type) {
    if (!(key in config)) return value;
    var val = config[key];
    if (typeof val === 'undefined') return value;
    if (type && (val === null || val.constructor !== type)) return value;
    return val;
  };
  // 读取到内存
  var read = function () {
    try { config = JSON.parse(GM_getValue(storageKey, '{}')); }
    catch (e) { config = {}; }
  };
  // 从内存写出
  var write = function () {
    GM_setValue(storageKey, JSON.stringify(config));
  };
  // 当内存配置被修改时调用
  var onput = function (f) {
    onputs.push(f);
  };
  // 从字串导入
  var import_ = function (s) {
    try {
      clear();
      s = JSON.parse(s);
      Object.keys(s).forEach(function (key) { put(key, s[key]); });
      return true;
    } catch (e) { }
    return false;
  };
  // 导出成为字串
  var export_ = function () { return JSON.stringify(config); };
  // 清空设置
  var clear = function () {
    config = {};
    tonputs();
  };
  // 初始化
  read();
  return {
    'uid': uid,
    'put': put, 'get': get, 'onput': onput,
    'read': read, 'write': write,
    'import': import_, 'export': export_,
    'clear': clear,
  };
};

var debug = !!GM_getValue('debug', false) ?
  console.log.bind(console) : function () { };

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
  var setPos = function (pos) {
    var left = pos[0], top = pos[1];
    left = Math.min(Math.max(0, left), document.body.clientWidth - dom.clientWidth - 2);
    top = Math.min(Math.max(pageYOffset, top), pageYOffset + window.innerHeight - dom.clientHeight - 2);
    dom.style.left = left + 'px';
    dom.style.top = top + 'px';
    return [left, top];
  };
  var dragMove = function (e) {
    debug(e.which);
    var mouse_new = [e.clientX, e.clientY];
    pos[0] += mouse_new[0] - mouse[0];
    pos[1] += mouse_new[1] - mouse[1];
    setPos(pos);
    mouse = mouse_new;
  };
  var dragMoveDone = function () {
    document.removeEventListener('mousemove', dragMove);
    document.removeEventListener('mouseup', dragMoveDone);
    dom.classList.remove('yawf-drag');
    if (dom.releaseCapture) { dom.releaseCapture(); }
    pos = setPos(pos);
    mouse = null;
  };
  if (title) {
    title.style.cursor = 'move';
    title.addEventListener('mousedown', function (e) {
      mouse = [e.clientX, e.clientY];
      document.addEventListener('mousemove', dragMove);
      document.addEventListener('mouseup', dragMoveDone);
      dom.classList.add('yawf-drag');
      if (dom.setCapture) { dom.setCapture(); }
    });
  }
  if (details.onOk) if (ok) ok.addEventListener('click', details.onOk);
  if (details.onCancel) {
    if (cancel) cancel.addEventListener('click', details.onCancel);
    if (close) close.addEventListener('click', details.onCancel);
  }
  var cover = cewih('div', html.cover).firstChild;
  var keys = function (e) {
    if (e.keyCode === 13) if (ok) ok.click();
    if (e.keyCode === 27) if (close) close.click();
  };
  var hide = function () {
    document.body.removeChild(dom);
    document.body.removeChild(cover);
    document.removeEventListener('keypress', keys);
  };
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
  return {
    'hide': hide,
    'show': show,
  };
};

// 显示一个对话框
var Dialog = function (id, title, fillFun) {
  var dom = cewih('div', fillStr(html.dialog, { 'id': id, 'title': title })).firstChild;
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
  var fun = function (css) {
    return function () {
      if (this.conf) styleText += css + '\n';
    }
  };
  fun.init = function () { GM_addStyle(styleText); }
  fun.add = function (css) { styleText += css + '\n'; }
  return fun;
}());

// 产生一个假的回调函数
var fakeCallback = (function () {
  var last = 0;
  return function () {
    return 'STK_' + (last = Math.max(last + 1, Number(new Date())));
  };
}());

// 维护账号信息，用于显示
var account = (function () {
  var idCache = {}, nameCache = {};
  var request = function (queryStr, onsucc, onerror) {
    GM_xmlhttpRequest({
      'method': 'GET',
      'url': fillStr(url.newcard, { 'query': queryStr, 'callback': fakeCallback() }),
      'onload': withTry(function (resp) {
        var respJson = JSON.parse(resp.responseText.replace(/^try{[^{]*\(/, '').replace(/\)}catch\(e\){};$/, ''));
        var namecard = cewih('div', respJson.data);
        var avatar = namecard.querySelector('.name dt img').getAttribute('src');
        var name = namecard.querySelector('.name dd a[uid]').getAttribute('title');
        var uid = namecard.querySelector('.name dd a[uid]').getAttribute('uid');
        var data = { 'avatar': avatar, 'id': uid, 'name': name };
        nameCache[name] = idCache[uid] = data;
        onsucc(data);
      }, onerror),
      'onerror': function () { onerror(); },
    });
    return queryStr
  };
  var byId = function (id, onsucc, onerror) {
    if (idCache[id]) onsucc(idCache[id]);
    else request('id=' + id, onsucc, onerror);
  };
  var byName = function (name, onsucc, onerror) {
    if (nameCache[name]) onsucc(nameCache[name]);
    else request('name=' + name, onsucc, onerror);
  };
  return { 'id': byId, 'name': byName };
}());

// 过滤器管理器
var filters = (function () {
  var list = [], preinit = true;
  var add = function (details) {
    list.push(details);
    if (!preinit) details.init();
    return details;
  };
  var init = function () {
    list.forEach(function (x) { x.init(); });
    preinit = false;
  };
  var dialog = null;
  var dialogButton = function (dialog, inner) {
    var applyButton = inner.querySelector('[action-type="apply"]');
    var saveButton = inner.querySelector('[action-type="save"]');
    var cancelButton = inner.querySelector('[action-type="cancel"]');
    config.onput(function () {
      if (applyButton) applyButton.className = 'W_btn_b';
    });
    applyButton.addEventListener('click', function () {
      if (applyButton.classList.contains('W_btn_b_disable')) return;
      config.write();
      applyButton.className = 'W_btn_b W_btn_b_disable';
    });
    saveButton.addEventListener('click', function () {
      config.write();
      dialog.hide();
    });
    cancelButton.addEventListener('click', function () {
      config.read();
      dialog.hide();
    });
  };
  var lastTab = 0;
  var dialogTabs = function (list, inner, page) {
    var alist = Array.apply(Array, inner.querySelectorAll('.yawf-config-header a'));
    var llist = Array.apply(Array, inner.querySelectorAll('.yawf-config-body .yawf-config-layer'))
    var choseLList = function (i) {
      llist.forEach(function (l) { l.style.display = 'none'; });
      alist.forEach(function (a) { a.classList.remove('current'); a.classList.remove('S_bg5'); a.classList.add('S_bg1'); });
      llist[i].innerHTML = ''; list[i].show(llist[i]); llist[i].style.display = 'block';
      alist[i].classList.add('current'); alist[i].classList.remove('S_bg1'); alist[i].classList.add('S_bg5');
      lastTab = i;
    };
    list.map(function (filter, i) {
      var l = llist[i], a = alist[i];
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
      call(function () {
        dialogButton(dialog, inner);
        dialog.show(0);
      });
      if (list.indexOf(page) === -1) dialogTabs(list, inner, lastTab);
      else dialogTabs(list, inner, list.indexOf(page));
    };
    if (!(dialog = Dialog('yawf-config', fillStr('{{configDialogTitle}}'), showDialogInner))) {
      if (!count || count < 100) setTimeout(showDialog, 100, page, (count || 0) + 1);
    }
  };
  return {
    'add': add,
    'init': init,
    'showDialog': showDialog,
  }
}());

// 检查是否有新的节点
var newNode = (function () {
  var callbacks = [], actived = false;
  var callAll = function () {
    callbacks.forEach(function (c) { try { c(); } catch (e) { } }); 
  };
  var observe = function () {
    callAll();
    (new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) { callAll(); });
    })).observe(document.body, { 'childList': true, 'subtree': true });
  };
  var add = function (callback) {
    callbacks.push(callback);
    return callback;
  };
  var remove = function (callback) {
    var found = false;
    callback = callback.filter(function (x) {
      if (x === callback) return found = true; return false;
    });
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

var fixFoldWeibo = (function () {
  var fix = withTry(function (feed) {
    var showFeed = function () {
      feed.setAttribute('yawf-display', 'show');
      feed.removeEventListener('click', showFeed);
    };
    var author = feed.querySelector('.WB_name[usercard]').getAttribute('title');
    feed.setAttribute('yawf-author', author);
    feed.addEventListener('click', showFeed);
  });
  fix.init = function () {
    css.add(fillStr('.WB_feed>.WB_feed_type[yawf-display="fold"]::before { content: {{foldedWeiboText}}; }'));
  };
  return fix;
}());

// 逐条进行过滤
var weiboFilter = newNode.add(function () {
  var feeds = Array.apply(Array,
    document.querySelectorAll('.WB_feed>.WB_feed_type:not([yawf-display])'));
  feeds.forEach(function (feed) {
    // 同源合并的微博
    var sonFeeds = Array.apply(Array, feed.querySelectorAll('.WB_feed_type:not([yawf-display])'));
    var parentAction = null;
    while (parentAction === null) {
      var action = rules.parse(feed) || 'show';
      // 如果父微博被屏蔽或折叠，那么就把下面一条没被屏蔽的拉上来换个位置
      if ((action === 'hidden' || action === 'fold') && sonFeeds.length) {
        (function (p, s) {
          var x = cewih('div', '');
          ['.WB_face', '.WB_info', '.WB_text', '.WB_func'].map(function (q) {
            (function (a, b) {
              b.parentNode.replaceChild(x, b);
              a.parentNode.replaceChild(b, a);
              x.parentNode.replaceChild(a, x);
            }(p.querySelector(q), s.querySelector(q)));
          });
          var mid = p.getAttribute('mid');
          p.setAttribute('mid', s.getAttribute('mid'));
          s.setAttribute('mid', mid);
          s.setAttribute('yawf-display', 'hidden');
          // 各种细节的修补（原网站做的太乱了……）
          var pf = p.querySelector('.WB_face'), sf = s.querySelector('.WB_face');
          var pfa = pf.querySelector('a'), pfi = pf.querySelector('img');
          var sfa = sf.querySelector('a'), sfi = sf.querySelector('img');
          if (pfa.href.indexOf('?') === -1) pfa.href += '?from=feed&loc=avatar';
          if (sfa.href.indexOf('?') !== -1) sfa.href = sfa.href.slice(0, sfa.href.indexOf('?'));
          if (!pfa.title) pfa.title = pfi.title;
          if (sfa.title) sfa.removeAttribute('title');
          sfi.width = sfi.height = '30'; pfi.width = pfi.height = '50';
        }(feed, sonFeeds.shift()));
      } else parentAction = action;
    }
    feed.setAttribute('yawf-display', parentAction);
    if (parentAction === 'fold') fixFoldWeibo(feed);
    // 最后处理所有下面的子微博
    sonFeeds.forEach(function (feed) {
      var action = rules.parse(feed) || 'show';
      feed.setAttribute('yawf-display', action);
    });
    // 如果有一个微博的子微博都隐藏了，那么就隐藏这个微博的子微博框
    if (feed.querySelector('.WB_feed_together')) (function () {
      var sonCount = feed.querySelectorAll('.WB_feed_together .WB_sonFeed .WB_feed_type:not([yawf-display="hidden"])').length;
      if (sonCount === 0) feed.querySelector('.WB_feed_together').setAttribute('yawf-display', 'hidden');
      else feed.querySelector('[node-type="followNum"]').textContent = sonCount;
      if (sonCount <= 3 && feed.querySelector('[node-type="feed_list_wrapForward"]')) {
        feed.querySelector('.WB_feed_together').setAttribute('yawf-fold', 'display');
      }
    }());
  });
});

/*
// 当有新微博时先把他们显示出来，看看都是什么，再给用户显示
var newBarRedraw = newNode.add(function () {

});
*/

var typedConfig = (function () {
  // 字符串
  var baseConfig = function (type) {
    return function (item) {
      if (!item.getconf) item.getconf = function () {
        return item.conf = config.get(item.key, item['default'] || type(), type);
      };
      if (!item.setconf) item.setconf = function (conf) {
        return config.put(item.key, item.conf = conf);
      };
    };
  };
  return {
    'string': baseConfig(String),
    'strings': baseConfig(Array),
    'boolean': baseConfig(Boolean),
    'users': baseConfig(Array),
  }
}());

// 根据不同类型生成带有事件的文档节点
var typedHtml = (function () {
  // 副标题
  var subtitle = function (item) {
    return cewih('div', fillStr(html.configSubtitle, item)).firstChild;
  };

  // 文本
  var text = function (item) {
    return cewih('div', fillStr(html.configText, item)).firstChild;
  };

  // 真假值的设置项
  var boolean = function (item) {
    var dom = cewih('div', fillStr(html.configBoolean, item)).firstChild;
    var input = dom.querySelector('input');
    input.checked = item.getconf();
    input.addEventListener('change', function () {
      item.setconf(input.checked);
    });
    return dom;
  };

  // 字符串的设置项
  var string = function (item) {
    var dom = cewih('div', fillStr(html.configString, item)).firstChild;
    var textarea = dom.querySelector('textarea');
    textarea.value = item.getconf();
    textarea.addEventListener('change', function () { item.setconf(textarea.value); });
    textarea.addEventListener('keypress', function () { item.setconf(textarea.value); });
    return dom;
  };

  // 字符串数组设置项模板
  var items = function (base, genli, item) {
    var dom = cewih('div', fillStr(base, item)).firstChild;
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
          item.setconf(item.getconf().filter(function (x) { return x !== str; }));
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
        item.getconf();
        item.conf.push(str);
        item.setconf(item.conf);
      }, function () {
        input.value = '';
        input.disabled = false;
      });
    });
    return dom;
  };

  // 字符串设置项
  var strings = items.bind(null, html.configStrings, function (item, userinput, str, callback) {
    if (userinput && item.add && !(str = item.add(str))) callback();
    else callback(str, cewih('ul', fillStr(html.configStringsItem, { 'item': item.display ? item.display(str) : str })).firstChild);
  });

  // 用户列表的设置项
  var users = items.bind(null, html.configUsers, function (item, userinput, str, callback) {
    var showUserNotExistError = function () {
      Alert('yawf-user-not-exist', {
        'title': fillStr('{{accountNotExistErrorTitle}}'),
        'text': fillStr('{{{accountNotExistError}}}', { 'name': escapeXml(str) }),
        'icon': 'error'
      });
      callback();
    };
    if (userinput) {
      if (!(str = str.trim().replace(/^@/, ''))) return;
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

  return {
    'subtitle': subtitle,
    'text': text,
    'string': string,
    'strings': strings,
    'boolean': boolean,
    'users': users,
  };
}());

// 过滤器组
var filterGroup = function (groupName) {
  var items = [];
  // 向过滤器组里面添加一个项目
  var add = function (item) {
    items.push(item);
    try { if (item.type && typedConfig[item.type]) typedConfig[item.type](item); } catch (e) { }
    return item;
  };
  // 网页被初始化时初始化所有过滤器
  var init = function () {
    items.forEach(withTry(function (item) {
      if (item.getconf) item.getconf();
      if (item.init) item.init();
      if (item.rule) rules.add(item.priority || 0, item.rule.bind(item));
    }));
  };
  // 需要显示选项时生成界面
  var show = function (inner) {
    items.forEach(withTry(function (item) {
      var dom = null;
      if (item.show) dom = item.show(dom);
      else if (item.type && typedHtml[item.type])
        dom = typedHtml[item.type](item);
      if (dom) inner.appendChild(dom);
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

var allInOneFilters = function (details) {
  var filters = [
    { 'type': 'whitelist', 'priority': 1e5, 'action': 'show' },
    { 'type': 'blacklist', 'priority': 0, 'action': 'hidden' },
    { 'type': 'foldlist', 'priority': -1e5, 'action': 'fold' },
  ];
  var typedFilterGroup = filterGroup(details.name + 'FilterGroup');
  filters.forEach(function (filter) {
    typedFilterGroup.add({
      'type': 'subtitle',
      'text': '{{{' + filter.type + 'FilterDesc}}}',
      'typed': '{{' + details.name + 'FilterDetails}}',
    });
    var rule = {
      'type': details.type || 'strings',
      'key': 'weibo.filters.' + details.name + '.' + filter.type,
      'priority': filter.priority,
      'text': '{{' + details.name + 'FilterDesc}}',
    };
    if (details.add) rule.add = details.add.bind(rule);
    if (details.display) rule.display = details.display.bind(rule);
    rule.rule = details.rule.bind(rule, filter.action);
    typedFilterGroup.add(rule);
  });
  return typedFilterGroup;
};

var weiboContentSelector = function (feed, f) {
  var content = feed.querySelector('[node-type="feed_list_content"]');
  var reason = feed.querySelector('[node-type="feed_list_reason"] em');
  var items = [];
  if (content) items = items.concat(Array.apply(Array, f(content)));
  if (reason) items = items.concat(Array.apply(Array, f(reason)));
  return items;
};

// 关键字过滤
var keywordFilterGroup = allInOneFilters({
  'name': 'keyword',
  'add': function (s) { return s.trim(); },
  'rule': function keywordMatch(action, feed) {
    var keywords = this.conf;
    var texts = weiboContentSelector(feed, function (m) {
      return Array.apply(Array, m.childNodes)
        .filter(function (node) { return node.nodeType === Node.TEXT_NODE; })
        .map(function (node) { return node.textContent; });
    }).join(' ').toUpperCase();
    var match = keywords.some(function (keyword) { return texts.indexOf(keyword.toUpperCase()) !== -1; });
    if (match) return action; else return null;
  },
});

// 按照正则式过滤
var regexpFilterGroup = allInOneFilters({
  'name': 'regexp',
  'add': function (s) {
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
  },
  'display': function (s) { return '/' + s + '/'; },
  'rule': function regexpMatch(action, feed) {
    if (!this.regexen) this.regexen = this.conf.map(function (s) {
      try { return RegExp(s); }
      catch (e) { debug('erorr while compile regexp %s : %o', s, e); }
    }).filter(function (x) { return x; });
    var regexen = this.regexen;
    var texts = weiboContentSelector(feed, function (m) {
      return Array.apply(Array, m.childNodes)
        .filter(function (node) { return node.nodeType === Node.TEXT_NODE; })
        .map(function (node) { return node.textContent; });
    }).join(' ');
    var match = regexen.some(function (regexp) {
      return !!(regexp.exec(texts));
    });
    if (match) return action; else return null;
  },
});

// 作者用户过滤
var accountFilterGroup = allInOneFilters({
  'name': 'account',
  'type': 'users',
  'rule': function accountMatch(action, feed) {
    var accounts = this.conf;
    var author = feed.querySelector('.WB_name[usercard]');
    if (!author) return false;
    var id = author.getAttribute('usercard').split('=')[1];
    var match = accounts.some(function (x) { return x === id; });
    if (match) return action; else return null;
  },
});

// 原创用户过滤
var originalFilterGroup = allInOneFilters({
  'name': 'original',
  'type': 'users',
  'rule': function originalMatch(action, feed) {
    var originals = this.conf;
    var originalAuthor = feed.querySelector('.WB_media_expand .WB_info .WB_name');
    if (!originalAuthor) return false;
    var id = originalAuthor.getAttribute('usercard').split('=')[1];
    var match = originals.some(function (x) { return x === id; });
    if (match) return action; else return null;
  },
});

// 提到某人的微博
var mentionFilterGroup = allInOneFilters({
  'name': 'mention',
  'type': 'strings',
  'add': function (s) { return s.trim().replace(/^@/, ''); },
  'display': function (s) { return '@' + s; },
  'rule': function mentionMatch(action, feed) {
    var mentions = this.conf;
    var links = weiboContentSelector(feed, function (m) {
      return Array.apply(Array, m.querySelectorAll('a[usercard^="name="][href$="loc=at"]'));
    });
    var match = links.some(function (link) {
      var name = link.getAttribute('usercard').slice('name='.length);
      return mentions.indexOf(name) !== -1;
    });
    if (match) return action; else return null;
  },
});

// 话题过滤
var topicFilterGroup = allInOneFilters({
  'name': 'topic',
  'add': function (s) { return s.trim().replace(/#/g, ''); },
  'display': function (s) { return '#' + s + '#'; },
  'rule': function (action, feed) {
    var topics = this.conf;
    var list = weiboContentSelector(feed, function (m) {
      return Array.apply(Array, m.querySelectorAll('.a_topic'));
    });
    var text = list.map(function (x) { return x.textContent; }).join('##');
    var match = topics.some(function (topic) { return text.indexOf(topic) !== -1; });
    if (match) return action; else return null;
  },
});

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
    var sources = this.conf;
    var match = ['[node-type="feed_list_funcLink"] [action-type="app_source"]',
    '.WB_media_expand [action-type="app_source"]'].some(function (qs) {
      var st = feed.querySelector(qs); if (!st) return null;
      var source = st.getAttribute('title') || st.textContent || '未通过审核应用';
      return sources.indexOf(source) !== -1;
    });
    if (match) return action; else return null;
  },
});

// 超链接过滤
var hyperlinkFilterGroup = allInOneFilters({
  'name': 'hyperlink',
  'add': function (s) { return s.trim(); },
  'rule': function hyperlinkMatch(action, feed) {
    var links = this.conf;
    var al = Array.apply(Array, feed.querySelectorAll('a[title]'));
    var match = al.some(function (a) {
      var link = a.getAttribute('title');
      return links.some(function (link) {
        return link.toUpperCase().indexOf(link.toUpperCase()) !== -1;
      });
    });
    if (match) return action; else return null;
  },
});


var otherFilterGroup = filterGroup('otherFilterGroup');

// 推广微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.ad_feed',
  'text': '{{adfeedFilterDesc}}',
  'rule': function adFeedFilterRule(feed) {
    if (!this.conf) return null;
    return feed.getAttribute('feedtype') === 'ad' ? 'hidden' : null;
  },
});

// 关注推荐微博
otherFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.other.follow_suggest',
  'text': '{{followSuggestFilterDesc}}',
  'rule': function followSuggestFilterRule(feed) {
    if (!this.conf) return null;
    return feed.querySelector('a[href$="/find/i"]') ? 'hidden' : null;
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

var layoutFilterGroup = filterGroup('layoutFilterGroup');

// 大部分选择器参考了 眼不见心不烦 脚本
var layouts = (function () {
  var current = null;
  var subtitle = function (name) {
    layoutFilterGroup.add({
      'type': 'subtitle',
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
      'init': css(cssText),
    });
  };

  subtitle('Icon');
  item('Level', '.icon_bed[node-type="level"] { display: none !important; }');
  item('Member', '.W_ico16[class*="ico_member"], .ico_member_dis { display: none !important; }');
  item('Approve', '.approve { display: none !important; }')
  item('ApproveCo', '.approve_co { display: none !important; }')
  item('Club', '.ico_club { display: none !important; }');
  item('VGirl', '.ico_vlady { display: none !important; }');
  item('Taobao', '.ico_taobao { display: none !important; }');

  subtitle('Nav');
  item('Main', '.gn_nav>div:nth-child(1) { display: none !important; }');
  item('App', '.gn_nav>div:nth-child(2) { display: none !important; }');
  item('Hot', '.gn_nav>div:nth-child(3) { display: none !important; }');
  item('Game', '.gn_nav>div:nth-child(4) { display: none !important; }');
  item('Member', '.gn_setting[node-type="member"] { display: none !important; }')

  subtitle('Left');
  item('ToMe', '#pl_leftnav_common a[href^="/direct/tome"] { display: none !important; }');
  item('Friends', '#pl_leftnav_group > div[node-type="groupList"] > .level_1_Box, #pl_leftnav_common .level_1_Box > form.left_nav_line { display: none !important; }')
  item('App', '#pl_leftnav_app { display: none !important; }')

  subtitle('Middle');
  item('MemberTip', '[node-type="feed_list_shieldKeyword"] { display: none !important; }');
  item('RecommendedTopic', '#pl_content_publisherTop div[node-type="recommendTopic"] { display: none !important; }');

  subtitle('Right');
  item('Whole', '.B_profile .W_main_c, .B_profile .WB_feed .repeat .input textarea { width: 100% } .B_profile .WB_feed .WB_screen { margin-left: 928px } .B_profile .W_main_2r { display: none !important; }');
  item('Template', '#pl_content_setSkin { display: none !important; }');
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
  item('TopicCard', '.WB_feed_spec[exp-data*="value=1022-topic"] { display: none !important; }');
  item('LocationCard', '.WB_feed_spec[exp-data*="value=1022-place"] { display: none !important; }');
  item('FeedTip', '[node-type="feed_privateset_tip"] { display: none !important; }');

  subtitle('Person');
  item('Cover', '.profile_pic_top { max-height: 120px; }');
  item('Template', '.templete_enter { display: none !important; }');
  item('BadgeIcon', '.pf_badge_icon { display: none !important; }');
  item('Stats', '.profile_top .user_atten { display: none !important; } .pf_head { margin-top: 51px; } ');
  item('MyData', '.W_main_c [id^="Pl_Official_MyMicroworld__"] { display: none !important; }');
  item('Group', '.W_main_2r [id^="Pl_Core_RightGroupsBtn__"] { display: none !important; }');
  item('SuggestUser', '.W_main_2r [id^="Pl_Core_RightUserList__"] { display: none !important; }');
  item('Relation', '.W_main_2r [id^="Pl_Core_RightUserGrid__"] { display: none !important; }');
  item('Album', '.W_main_2r [id^="Pl_Core_RightPicMulti__"] { display: none !important; }'); // FIXME
  item('HotTopic', '.W_main_2r [id^="Pl_Core_RightTextSingle__"] { display: none !important; }');
  item('HotWeibo', '.W_main_2r [id^="Pl_Core_RightPicText__"] { display: none !important; }');

  subtitle('Other');
  item('Ads', '#plc_main [id^="pl_rightmod_ads"], #Box_right [id^="ads_"], #trustPagelet_zt_hottopicv5 [class*="hot_topicad"], div[ad-data], .WB_feed .popular_buss, [id^="sinaadToolkitBox"] { display: none !important; } #wrapAD, .news_logo { visibility: hidden !important; }');
  item('FeedRecom', '.W_main_2r [id^="Pl_Third_Inline__"] { display: none !important; }');
  item('Footer', '.global_footer { display: none !important; }');
  item('WbIm', '.WBIM_news { display: none !important; }');
  item('Tip', '.layer_tips { display: none !important; }');

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

// 清除发布框中的默认话题 (wcf)
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.clear_def_topic',
  'text': '{{clearDefTopicDesc}}',
  'init': function () {
    if (!this.conf) return;
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

// 展开左栏分组
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.showAllGroup',
  'text': '{{showAllGroupDesc}}',
  'init': css('#pl_leftnav_group div[node-type="moreList"] { display: block !important } #pl_leftnav_group > div[node-type="groupList"] > .level_2_Box > .levmore { display: none }'),
});

// 展开左栏消息
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.showAllMsgNav',
  'text': '{{showAllMsgNavDesc}}',
  'init': css('#pl_leftnav_common > .level_1_Box > .lev2_new { display: block !important }'),
});

// 微博作者与正文同行
toolFilterGroup.add({
  'type': 'boolean',
  'key': 'weibo.tool.unwrapText',
  'text': '{{unwrapTextDesc}}',
  'init': css('.WB_info, .WB_text { display: inline } .WB_info+.WB_text::before { content: ": " } .WB_func { margin-top: 5px } .B_index .WB_feed .W_ico16 { vertical-align: -3px !important }'),
});

// 查看大图旁添加查看原图链接
toolFilterGroup.add({
  'type': 'boolean',
  'default': true,
  'key': 'weibo.tool.viewOriginal',
  'text': '{{viewOriginalDesc}}',
  'init': function () {
    if (!this.conf) return;
    var addOriLink = function () {
      var a = document.querySelector('a.show_big[action-data]:not([yawf-viewori])');
      if (!a) return; a.setAttribute('yawf-viewori', 'yawf-viewori');
      var arg = a.getAttribute('action-data').match(/pid=(\w+)&mid=(\d+)&uid=(\d+)/);
      if (!arg) return;
      var vol = cewih('div', fillStr(html.viewOriginalLink));
      vol.firstChild.href = fillStr(url.view_ori, {'uid': arg[3], 'mid': arg[2], 'pid': arg[1]});
      while (vol.firstChild) a.parentNode.insertBefore(vol.firstChild, a);
    };
    newNode.add(addOriLink);
  },
});

// 自定义样式
toolFilterGroup.add({
  'type': 'string',
  'text': '{{userstyleTitle}}',
  'key': 'weibo.tool.userstyle',
  'init': function () {
    var conf = this.conf; GM_addStyle(conf), set = this.setconf.bind(this);
    var setconf = function (css) {
      conf = css;
      setTimeout(function () { set(css); config.write(); location.reload(); }, 0);
    };
    GM_registerMenuCommand(fillStr('{{userstyleEditDesc}}'), function () {
      var newcss = prompt(fillStr('{{userstyleEditDetails}}'), conf);
      if (newcss !== null) setconf(newcss);
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
  'show': function (button) {
    var dom = cewih('div', html.configImportExport).firstChild;
    var bi = dom.querySelector('[node-type="import"]');
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
      var success = function () {
        Alert('yawf-config-import-success', {
          'title': fillStr('{{configImportSuccessTitle}}'),
          'text': fillStr('{{configImportSuccess}}'),
          'icon': 'succ'
        });
      };
      var error = function () {
        Alert('yawf-config-import-fail', {
          'title': fillStr('{{configImportFailTitle}}'),
          'text': fillStr('{{configImportFail}}'),
          'icon': 'error'
        });
      };
      if (file.size > (1<<24)) error();
      else reader.addEventListener('load', function () {
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
  'show': function (button) {
    var dom = cewih('div', fillStr(html.configBoolean, { 'key': 'debug', 'text': '{{scriptDebug}}' })).firstChild;
    var input = dom.querySelector('input');
    input.checked = !!GM_getValue('debug', false);
    input.addEventListener('change', function () {
      GM_setValue('debug', !GM_getValue('debug', false));
    });
    return dom;
  }
});

// 关于
scriptFilterGroup.add({
  'type': 'subtitle',
  'text': '{{scriptAboutTitle}}',
});

scriptFilterGroup.add({
  'type': 'text',
  'text': '{{scriptAbout}}',
});

scriptFilterGroup.add({
  'init': function () {
    var isEn = i18n.lang === 'en';
    css.add(fillStr(funcStr(function () { /*!CSS
      .profile_tab .pftb_lk { padding-left: {{headerWidth}}; padding-right: {{headerWidth}}; }
      .profile_tab .current.pftb_lk { padding-left: {{headerWidth2}}; padding-right: {{headerWidth2}}; }
      .layoutFilterGroupLayer .yawf-configBoolean { width: {{layoutOptionWidth}}; }
    */ }), {
      'headerWidth': isEn ? '12px' : '15px',
      'headerWidth2': isEn ? '9px' : '12px',
      'layoutOptionWidth': isEn ? '320px' : '160px',
    }));
  },
});

// 检查是否要在本页上运行
var validPage = function () {
  if (self !== top) return false;
  if (!unsafeWindow.$CONFIG.uid) return false;
  if (!unsafeWindow.$CONFIG.lang) return false;
  return true;
};

// 完成加载时
var dcl = function () {
  if (!validPage()) return;
  // 初始化用户语言
  i18n.setLang(unsafeWindow.$CONFIG.lang);
  // 加载用户配置
  config = config(unsafeWindow.$CONFIG.uid);
  // 初始化文本和网页数据（基于用户选择的语言）
  Object.keys(text).map(function (key) { i18n(text[key]); text[key] = text[key].local; });
  Object.keys(html).map(function (key) { html[key] = fillStr(html[key]); });
  // 显示设置按钮
  showIcon();
  // 初始化所有过滤器
  filters.init();
  // 初始化折叠微博
  fixFoldWeibo.init();
  // 注册样式
  css.init();
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
  .yawf-config-body { margin: -20px -20px 0; max-height: 300px; overflow-y: auto; padding: 20px; width: 760px; }
  #yawf-config .profile_tab { font-size: 12px; margin: -20px -20px 20px; width: 800px; }
  .yawf-groupSubtitle { margin: 5px 10px; padding: 10px 0 0 0; font-weight: bold; }
  .yawf-configItem, .yawf-groupText { margin: 5px 20px; padding: 5px 0; }
  .yawf-configString span { line-height: 16px; padding: 2px 10px; margin-bottom: -20px; display: block; width: calc(100% - 20px); position: relative; }
  .yawf-configString textarea.W_input { width: calc(100% - 20px); padding-top: 20px; min-height: 80px; resize: vertical; }
  .yawf-configStringsInput, .yawf-configUsersInput { margin: 5px; }
  .yawf-configStringsItems, .yawf-configUsersItems { padding: 5px 10px; }
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
  // 隐藏微博
  [yawf-display="hidden"] { display: none !important; }
  .WB_feed>.WB_feed_type:not([yawf-display]), .WB_feed>.WB_feed_type .WB_feed_type:not([yawf-display]) { visibility: hidden !important; }
  // 折叠微博
  .WB_feed>.WB_feed_type[yawf-display="fold"]::before { display: block; width: 100%; height: 24px; line-height: 24px; padding: 0 2em 20px; border-bottom: #e6e6e6 1px solid; } 
  .WB_feed>.WB_feed_type[yawf-display="fold"] { height: 45px; overflow: hidden; cursor: pointer; }
  .WB_feed>.WB_feed_type[yawf-display="fold"] .WB_screen { margin-top: -40px !important; }
  .WB_feed>.WB_feed_type[yawf-display="fold"] .WB_feed_datail { display: none !important; }
  // 其他
  .WB_feed_together[yawf-fold="display"] .wft_users { display: none; }
  .WB_feed_together[yawf-fold="display"] [node-type="feed_list_wrapForward"] { display: block !important; }
  .WB_feed_together[yawf-fold="display"] [action-type="feed_list_seeAll"],
  .WB_feed_together[yawf-fold="display"] [action-type="feed_list_foldForward"] { display: none !important; }
  .W_miniblog { visibility: hidden; }
*/ }) + '\n').replace(/\/\/.*\n/g, '\n'), {
  'filter-img': images.filter,
}));

