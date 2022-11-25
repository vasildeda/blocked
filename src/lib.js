const storage = chrome.storage.sync

function getPatterns(callback) {
    storage.get(['patterns'], result => {
        let patterns = result['patterns'] || []
        callback(patterns)
    })
}

function addPattern(pattern) {
    getPatterns(patterns => {
        storage.set({
            patterns: patterns.concat(pattern)
        })
    })
}

function removePattern(pattern) {
    getPatterns(patterns => {
        storage.set({
            patterns: patterns.filter(e => e != pattern)
        })
    })
}

function isRunning(callback) {
    storage.get(['running'], result => {
        let running = result['running']
        callback(running)
    })
}

function setRunning(running) {
    storage.set({
        running: running
    })
}

function getCount(pattern, callback) {
    storage.get(['calls'], result => {
        const calls = result['calls'] || {}
        const patternCalls = calls[pattern] || 0
        callback(patternCalls)
    })
}

function incrementCount(pattern) {
    storage.get(['calls'], result => {
        const calls = result['calls'] || {}
        calls[pattern] = calls[pattern] || 0
        calls[pattern] += 1

        storage.set({
            calls: calls
        })
    })
}

function getTotal(callback) {
    storage.get(['calls'], result => {
        const calls = result['calls'] || {}
        const total = Object
            .values(calls)
            .reduce((a, b) => a + b)
        callback(total)
    })
}