'use strict';

chrome.runtime.onMessage.addListener(msg => {
  if (!chrome.runtime.lastError && msg.type === 'copy-text') {
    const copyText = msg.data;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(copyText);
    } else {
      const textArea = document.createElement('textarea');
      textArea.value = copyText;
      textArea.style.position = 'fixed';
      textArea.style.left = '-9999px';
      textArea.style.top = '-9999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      document.execCommand('copy');
      textArea.remove();
    }
  }
});
