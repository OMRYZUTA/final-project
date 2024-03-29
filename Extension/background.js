chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    if (String(tab.url).includes('indeed') || String(tab.url).includes('linkedin')) {
      chrome.tabs.sendMessage(tabId, { message: "start scraping" },
        response => {
          chrome.storage.sync.set({ "position": response }
          );
          let position = {}
          chrome.storage.sync.get(['position'], function (result) {
            position = result;
          });
        }
      )
    }
  }
  return true;
}
)

chrome.runtime.onMessage.addListener(function (request) {
  let appProcess = {}
  appProcess["position"] = request;
  appProcess["status"] = { name: "Interested" };
  appProcess["contact_set"] = [];
  appProcess["stage_set"] = [];
  appProcess["document_set"] = [];
  appProcess["user_id"] = 1;
  postData('https://zulimarshmallow.azurewebsites.net/api/applicationprocesses/', appProcess)
    .then(data => {
    });
  return true;
});

async function postData(url = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'POST', // *GET, POST, PUT, DELETE, etc.
    // mode: 'cors', // no-cors, *cors, same-origin
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json'
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data) // body data type must match "Content-Type" header
  });
  chrome.storage.sync.set({ "position": {} })
  return response.json(); // parses JSON response into native JavaScript objects
}