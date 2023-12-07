const fs = require('fs')

function countDepthIncreases(file) {
    let text = fs.readFileSync(file,'utf8')
    let array = text.split('\n')
    let increases = 0
    for(let i = 0; i < array.length + 1; i++) {
        if(parseInt(array[i]) < parseInt(array[i+1])) {
            increases++
        }
    }
    console.log(increases)
}

function countDepthBySumsOfThree(file) {
    let text = fs.readFileSync(file,'utf8')
    let array = text.split('\n')
    let increases = 0

    let sumsArray = array.map((x,i) => {
        if(i < array.length - 2) {
            return parseInt(x) + parseInt(array[i+1]) + parseInt(array[i+2])
        }
    })
    
    for(let i = 0; i < sumsArray.length + 1; i++) {
        if(parseInt(sumsArray[i]) < parseInt(sumsArray[i+1])) {
            increases++
        }
    }
    console.log(increases)
}

countDepthBySumsOfThree('./input.txt')