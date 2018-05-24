chrome.runtime.onMessage.addListener((req, sender) => {
  // 切换图标
  if (sender.tab && req.isErya) {
    chrome.browserAction.setIcon({
      tabId: sender.tab.id,
      path: "./assets/icons/logo.png"
    });
  }
});


const myMookPlayUrl = chrome.runtime.getURL('moocplayer.js');
chrome.webRequest.onBeforeRequest.addListener(
  function(details){
    if (details.url.includes('moocplayer')) {
      return {redirectUrl: myMookPlayUrl};
    }
  },
  {
    urls: [
      "*://*.chaoxing.com/*"
    ]
  },
  [
    "blocking"
  ]
);