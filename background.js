'use strict';

chrome.commands.onCommand.addListener(cmd => {
  if (!chrome.runtime.lastError && cmd === 'copy-cmd') {
    chrome.tabs.query(
      {
        active: true,
        currentWindow: true,
      },
      tabs => {
        if (!chrome.runtime.lastError) {
          if (tabs.length > 0 && tabs[0].url) {
            const tabId = tabs[0].id;
            const copyText = tabs[0].url;

            chrome.tabs.sendMessage(tabId, {
              type: 'copy-text',
              data: copyText,
            });
          } else {
            console.debug('tabs empty.');
          }
        } else {
          console.debug('query error.');
        }
      }
    );
  } else {
    console.debug('command error.');
  }
});
