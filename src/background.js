importScripts("lib.js")

chrome.runtime.onInstalled.addListener(() => {    
    chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {

        if (changeInfo.status == 'loading' && tab.active) {
            handleLoading(tabId)
        }
    })
})

function doRedirect(tabId) {
    isRunning(running => {
        if (running) {
            chrome.tabs.update(tabId, {
                url: chrome.runtime.getURL("./blocked.html")
            });        
        }
    })
}

function handleLoading(tabId) {
    chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
        let url = tabs[0].url;
        if (url) {
            getPatterns(patterns => {
                console.log(patterns)
                for (let pattern of patterns) {
                    if (url.includes(pattern)) {
                        doRedirect(tabId)
                    }
                }
            })
        }
    });
}
