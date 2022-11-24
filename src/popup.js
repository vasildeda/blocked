function patternMapper(pattern) {
    let remove = '<a class="remove" data-pattern="' + pattern + '">' + pattern + '</a>'
    return '<li>' + remove + '</li>'
}

function patternFromUrl(url) {
    let m = url.match('^(https?://.*?)/')
    return m && m[1]
}

function reload() {
    window.location.href='?'
}

// load patterns
getPatterns(patterns => {
    document
        .getElementById('patterns')
        .innerHTML = patterns.map(patternMapper).join('')
    
    Array.prototype.forEach.call(
        document.getElementsByClassName('remove'),
        remove => remove.onclick = (e) => {
            let pattern = e.target.getAttribute('data-pattern')
            removePattern(pattern)
            reload()
        }
    )  
})

// add button onclick
document
    .getElementById('add')
    .onclick = e => {
        let pattern = e.target.attributes['data-pattern']
        addPattern(pattern)
        reload()
    }

// add button setup
chrome.tabs.query({ active: true, currentWindow: true }, tabs => {
    let addE = document.getElementById('add')
    
    let pattern = patternFromUrl(tabs[0].url)
    if (pattern) {
        addE.attributes['data-pattern'] = pattern
        addE.innerHTML += ' ' + pattern
    } else {
        addE.remove()
    }
})

// running checkbox
isRunning(running => {
    document
        .getElementById('running')
        .checked = running
})

// running checkbox onclick
document
    .getElementById('running')
    .onclick = e => {
        let running = e.target.checked
        setRunning(running)
        reload()
    }

function log(str) {
    document.getElementById('log').innerHTML += str + '<br/>'
}
