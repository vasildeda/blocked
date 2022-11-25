
const params = new URLSearchParams(window.location.search)
const url = params.get('url')
const pattern = params.get('pattern')

const siteE = document.getElementById('site')
siteE.href = url
siteE.innerText = pattern

const countE = document.getElementById('count')
getCount(pattern, c => countE.innerText = c)

const totalE = document.getElementById('total')
getTotal(c => totalE.innerText = c)