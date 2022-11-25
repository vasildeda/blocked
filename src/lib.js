const storage = chrome.storage.sync

function getPatterns(callback) {
    storage.get(['patterns'], result => {
        const patterns = result['patterns'] || []
        callback(patterns)
    })
}

function addPattern(pattern) {
    getPatterns(patterns => {
        const extendedPatterns = patterns.concat(pattern)
        storage.set({ patterns: extendedPatterns })
    })
}

function removePattern(pattern) {
    getPatterns(patterns => {
        const filteredPatterns = patterns.filter(e => e != pattern)
        storage.set({ patterns: filteredPatterns })
    })
}

function isRunning(callback) {
    storage.get(['running'], result => {
        let running = result['running']
        callback(running)
    })
}

function setRunning(running) {
    storage.set({ running: running })
}

function getCalls(callback) {
    storage.get(['calls'], result => {
        const calls = {
            ...result['calls'],
            getPattern(pattern) { return this[pattern] || 0 }
        }
        callback(calls)
    })
}

function getCount(pattern, callback) {
    getCalls(calls => {
        const count = calls.getPattern(pattern)
        callback(count)
    })
}

function incrementCount(pattern) {
    getCalls(calls => {
        calls[pattern] = calls.getPattern(pattern) + 1
        storage.set({ calls: calls })
    })
}

function getTotal(callback) {
    getCalls(calls => {
        const total = Object
            .values(calls)
            .filter(v => typeof v !=  'function')
            .reduce((a, b) => a + b)
        callback(total)
    })
}