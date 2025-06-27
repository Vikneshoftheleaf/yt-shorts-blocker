function removeShorts() {
  document.querySelectorAll('ytd-reel-shelf-renderer, ytd-reel-item-renderer, ytd-rich-shelf-renderer').forEach(el => el.remove());

  document.querySelectorAll('a[href*="/shorts/"]').forEach(link => {
    const container = link.closest(
      'ytd-grid-video-renderer, ytd-video-renderer, ytd-rich-item-renderer, ytd-video-preview, ytd-compact-video-renderer, ytd-rich-shelf-renderer'
    );
    if (container) container.remove();
    else link.remove();
  });

  document.querySelectorAll('a[href*="/shorts"]').forEach(el => {
    const tab = el.closest('tp-yt-paper-tab, tp-yt-tab-shape');
    if (tab) tab.remove();
  });

  document.querySelectorAll('a[title="Shorts"], ytd-mini-guide-entry-renderer[aria-label="Shorts"]').forEach(el => el.remove());
}

function tryRemove() {
  chrome.storage.local.get(['shortsBlockerEnabled'], (result) => {
    const enabled = result.shortsBlockerEnabled ?? false;
    if (enabled) removeShorts();
  });
}

tryRemove();

const observer = new MutationObserver(() => tryRemove());
observer.observe(document.body, { childList: true, subtree: true });