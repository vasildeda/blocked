importScripts("lib.js")

chrome.runtime.onInstalled.addListener(() => {    
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

        if (changeInfo.status == 'loading' && tab.active) {
            handleLoading()
        }
    })
})

function doRedirect() {
    isRunning(running => {
        if (running) {
            chrome.tabs.update(null, {
                url: chrome.runtime.getURL("./blocked.html")
            });        
        }
    })
}

function handleLoading() {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if (url) {
            getPatterns(patterns => {
                for (let pattern of patterns) {
                    if (url.includes(pattern)) {
                        doRedirect()
                    }
                }
            })
        }
    });
}
