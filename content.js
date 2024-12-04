let scrollSpeed = 50;
let smoothScroll = true;
let isScrolling = false;

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

// Custom smooth scroll function
function smoothScrollTo(targetY, duration) {
  const startY = window.pageYOffset;
  const difference = targetY - startY;
  const startTime = performance.now();

  function step() {
    const currentTime = performance.now();
    const progress = (currentTime - startTime) / duration;

    if (progress < 1) {
      const ease = easeInOutQuad(progress);
      window.scrollTo(0, startY + difference * ease);
      requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      isScrolling = false;
    }
  }

  requestAnimationFrame(step);
}

// Easing function
function easeInOutQuad(t) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

document.addEventListener(
  "keydown",
  (event) => {
    // Prevent default behavior for j and k keys
    if (event.key.toLowerCase() === "j" || event.key.toLowerCase() === "k") {
      event.preventDefault();
    }

    if (
      event.target.tagName === "INPUT" ||
      event.target.tagName === "TEXTAREA" ||
      event.target.isContentEditable
    ) {
      return;
    }

    if (isScrolling) return;

    const currentPosition = window.pageYOffset;
    let targetPosition;

    switch (event.key.toLowerCase()) {
      case "j":
        targetPosition = currentPosition + scrollSpeed;
        break;
      case "k":
        targetPosition = currentPosition - scrollSpeed;
        break;
      default:
        return;
    }

    if (smoothScroll) {
      isScrolling = true;
      smoothScrollTo(targetPosition, 150); // 150ms duration
    } else {
      window.scrollTo(0, targetPosition);
    }
  },
  { capture: true },
);
