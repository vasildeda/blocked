importScripts("lib.js")

chrome.runtime.onInstalled.addListener(() => {    
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

        if (changeInfo.status == 'loading' && tab.active) {
            handleLoading()
        }
    })
})

function doRedirect(url, pattern) {
    isRunning(running => {
        if (running) {
            incrementCount(pattern)

            chrome.tabs.update(null, {
                url: chrome.runtime.getURL("./blocked.html") + "?url=" + url + "&pattern=" + pattern
            });        
        }
    })
}

function handleLoading() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs && tabs[0] && tabs[0].url;
        if (url) {
            getPatterns(patterns => {
                for (let pattern of patterns) {
                    if (url.includes(pattern)) {
                        doRedirect(url, pattern)
                    }
                }
            })
        }
    });
}
