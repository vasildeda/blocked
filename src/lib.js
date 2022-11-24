
function getPatterns(callback) {
    chrome.storage.sync.get(['patterns'], result => {
        let patterns = result['patterns'] || []
        callback(patterns)
    })
}

function addPattern(pattern) {
    getPatterns(patterns => {
        chrome.storage.sync.set({
            patterns: patterns.concat(pattern)
        })
    })
}

function removePattern(pattern) {
    getPatterns(patterns => {
        chrome.storage.sync.set({
            patterns: patterns.filter(e => e != pattern)
        })
    })
}

function isRunning(callback) {
    chrome.storage.sync.get(['running'], result => {
        let running = result['running']
        callback(running)
    })
}

function setRunning(running) {
    chrome.storage.sync.set({
        running: running
    })
}