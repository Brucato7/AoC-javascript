const fs = require('fs')

const convertTxtToArray = function(fileName) {
    let text = fs.readFileSync(fileName,'utf8')
    return text.split('\n')
}

const convertTxtToString = function(fileName) {
    return fs.readFileSync(fileName,'utf8')
}

module.exports = {
    convertTxtToArray: convertTxtToArray,
    convertTxtToString: convertTxtToString
}