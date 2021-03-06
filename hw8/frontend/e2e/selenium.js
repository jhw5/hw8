const webdriver = require('selenium-webdriver')

const url = 'http://localhost:3000/index.html'

const driver = new webdriver.Builder()
    .forBrowser('chrome')
    .build()

exports.driver = driver
exports.findName = name => driver.findElements(webdriver.By.name(name))
exports.By = webdriver.By
exports.findId = id => driver.findElement(webdriver.By.id(id))
exports.findCSS = css => driver.findElement(webdriver.By.css(css))
exports.go = _ => driver.navigate().to(url)
exports.sleep = millis => driver.sleep(millis)
