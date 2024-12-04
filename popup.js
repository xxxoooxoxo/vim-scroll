document.addEventListener("DOMContentLoaded", () => {
  const scrollSpeedInput = document.getElementById("scrollSpeed");
  const smoothScrollCheckbox = document.getElementById("smoothScroll");
  const saveButton = document.getElementById("saveButton");
  const status = document.getElementById("status");

  chrome.storage.sync.get(["scrollSpeed", "smoothScroll"], (data) => {
    scrollSpeedInput.value = data.scrollSpeed || 50;
    smoothScrollCheckbox.checked = data.smoothScroll ?? true;
  });

  saveButton.addEventListener("click", () => {
    const newSpeed = parseInt(scrollSpeedInput.value, 10);
    if (newSpeed >= 10) {
      chrome.storage.sync.set(
        {
          scrollSpeed: newSpeed,
          smoothScroll: smoothScrollCheckbox.checked,
        },
        () => {
          status.style.color = "green";
          status.textContent = "Saved!";

          saveButton.disabled = true;

          setTimeout(() => {
            status.textContent = "";
            saveButton.disabled = false;
          }, 1500);
        },
      );
    } else {
      status.style.color = "red";
      status.textContent = "Min value is 10";
    }
  });
});
