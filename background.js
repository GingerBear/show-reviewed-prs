main();

function main() {
  chrome.browserAction.onClicked.addListener(copyPRs);

  function copyPRs() {
    chrome.tabs.getSelected(null, function(tab) {
      chrome.tabs.sendMessage(tab.id, { text: "getReviews" }, function(
        response
      ) {});
    });
  }
}
