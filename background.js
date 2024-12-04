chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({
    scrollSpeed: 50,
    smoothScroll: true,
  });
});
