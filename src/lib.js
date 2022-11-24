
function getPatterns(callback) {
    chrome.storage.local.get(['patterns'], result => {
        let patterns = result['patterns'] || []
        callback(patterns)
    })
}

function addPattern(pattern) {
    getPatterns(patterns => {
        chrome.storage.local.set({
            patterns: patterns.concat(pattern)
        })
    })
}

function removePattern(pattern) {
    getPatterns(patterns => {
        chrome.storage.local.set({
            patterns: patterns.filter(e => e != pattern)
        })
    })
}

function isRunning(callback) {
    chrome.storage.local.get(['running'], result => {
        let running = result['running']
        callback(running)
    })
}

function setRunning(running) {
    chrome.storage.local.set({
        running: running
    })
}