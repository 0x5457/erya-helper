chrome.runtime.onMessage.addListener((req, sender) => {
  // 切换图标
  if (sender.tab && req.isErya) {
    chrome.browserAction.setIcon({
      tabId: sender.tab.id,
      path: "./assets/icons/logo.png"
    });
  }
});

const myMookPlayUrl = chrome.runtime.getURL("moocplayer.js");
const videojsExtUrl = chrome.runtime.getURL("videojs-ext.js");

chrome.webRequest.onBeforeRequest.addListener(
  function(details) {
    if (details.url.includes("moocplayer")) {
      return { redirectUrl: myMookPlayUrl };
    }
    if (details.url.includes("ext.min.js")) {
      return { redirectUrl: videojsExtUrl };
    }
  },
  {
    urls: ["*://*.chaoxing.com/*"]
  },
  ["blocking"]
);
