let scrollSpeed = 50;
let smoothScroll = true;

chrome.storage.sync.get(["scrollSpeed", "smoothScroll"], (data) => {
  scrollSpeed = data.scrollSpeed || 50;
  smoothScroll = data.smoothScroll ?? true;
});

chrome.storage.onChanged.addListener((changes) => {
  if (changes.scrollSpeed) {
    scrollSpeed = changes.scrollSpeed.newValue;
  }
  if (changes.smoothScroll) {
    smoothScroll = changes.smoothScroll.newValue;
  }
});

document.addEventListener("keydown", (event) => {
  if (
    event.target.tagName === "INPUT" ||
    event.target.tagName === "TEXTAREA" ||
    event.target.isContentEditable
  ) {
    return;
  }

  switch (event.key.toLowerCase()) {
    case "j":
      window.scrollBy({
        top: scrollSpeed,
        left: 0,
        ...(smoothScroll && { behavior: "smooth" }),
      });
      break;
    case "k":
      window.scrollBy({
        top: -scrollSpeed,
        left: 0,
        ...(smoothScroll && { behavior: "smooth" }),
      });
      break;
  }
});
