
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

function getCount(pattern, callback) {
    chrome.storage.sync.get(['calls'], result => {
        const calls = result['calls'] || {}
        const patternCalls = calls[pattern] || 0
        callback(patternCalls)
    })
}

function incrementCount(pattern) {
    chrome.storage.sync.get(['calls'], result => {
        const calls = result['calls'] || {}
        calls[pattern] = calls[pattern] || 0
        calls[pattern] += 1

        chrome.storage.sync.set({
            calls: calls
        })
    })
}

function getTotal(callback) {
    chrome.storage.sync.get(['calls'], result => {
        const calls = result['calls'] || {}
        const total = Object
            .values(calls)
            .reduce((a, b) => a + b)
        callback(total)
    })
}