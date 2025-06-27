const toggle = document.getElementById('toggle');
const controls = document.getElementById('controls');
const notYoutube = document.getElementById('notYoutube');

chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
  const isYouTube = tab?.url?.includes("youtube.com");

  if (isYouTube) {
    // Show toggle
    controls.style.display = 'block';
    notYoutube.style.display = 'none';

    // Load saved state
    chrome.storage.local.get(['shortsBlockerEnabled'], (result) => {
      toggle.checked = result.shortsBlockerEnabled ?? false;
    });

    // Save state on toggle
    toggle.addEventListener('change', () => {
      chrome.storage.local.set({ shortsBlockerEnabled: toggle.checked });
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: () => location.reload()
      });
    });

  } else {
    // Hide toggle, show message
    controls.style.display = 'none';
    notYoutube.style.display = 'block';
  }
});
