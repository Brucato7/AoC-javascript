const {convertTxtToArray} = require('../../utilities/read-input')

const data = convertTxtToArray('./input.txt').map(line=>line.split(',')).flat()

let conversions = data.map(str => {
    let currVal = 0
    for(let i=0;i<str.length;i++) {
        currVal += str.charCodeAt(i)
        currVal = currVal * 17
        currVal = currVal % 256
    }
    return currVal
})

console.log(conversions.reduce((total,x)=>{return total+x},0))