const {convertTxtToArray} = require('../../utilities/read-input.js')

function findAllSymbols(input) {
    let stringData = convertTxtToArray(input).join('')
    let symbolsArray = stringData.replaceAll('.','').replaceAll(/[0-9]/g,'').split('')
    let symbols = ''
    symbolsArray.forEach(s => {
        if(symbols.indexOf(s) < 0) {
            symbols = symbols + s
        }
    })
    return symbols
}

// console.log(findAllSymbols('./input.txt'))

function findEnginePartNumber(input) {
    let data = convertTxtToArray(input)
    let symbols = '*-$@=#+/%&'
    let total = 0
    data.forEach((line,row) => {
        let matches = line.match(/\d+/g)

        matches.forEach(num => {
            let index = line.indexOf(num)
            let min = index - 1
            let max = index + num.length
            line = line.slice(0,index) + Array.apply(null, Array(num.length)).map(()=>'.').join('') + line.slice(max)
            let foundSymbol = false
            if(symbols.indexOf(data[row][min]) >= 0) foundSymbol = true
            if(symbols.indexOf(data[row][max]) >= 0) foundSymbol = true
            let i = min
            while(!foundSymbol && i <= max) {
                if(row-1 >= 0){
                    if(symbols.indexOf(data[row-1][i]) >= 0) foundSymbol = true
                }
                if(row+1 < data.length) {
                    if(symbols.indexOf(data[row+1][i]) >= 0) foundSymbol = true
                }
                i++
            }
            if(foundSymbol) {
                // console.log(`${num} is a match`)
                total += parseInt(num)
            }

        })
    })
    console.log(total)
}

// findEnginePartNumber('./input.txt')

function findGearRatiosSum(input) {
    let data = convertTxtToArray(input)
    let total = 0
    let counter = 0
    data.forEach((line,row) => {
        while(line.indexOf('*') >= 0) {
            let hits = []
            let index = line.indexOf('*')
            line = line.slice(0,index) + '.' + line.slice(index + 1)

            //check left/right
            if(!isNaN(line[index-1])) hits.push(getNumber(line,index-1,true,false))
            if(!isNaN(line[index+1])) hits.push(getNumber(line,index+1,false))

            //check top/bottom and corners
            if(hits.length<2) {
                if(row > 0) {
                    if(!isNaN(data[row-1][index])) {
                        hits.push(getNumber(data[row-1],index))
                    } else {
                        if(!isNaN(data[row-1][index-1])) hits.push(getNumber(data[row-1],index-1,true,false))
                        if(!isNaN(data[row-1][index+1])) hits.push(getNumber(data[row-1],index+1,false))
                    }
                }
                if(row+1 < data.length) {
                    if(!isNaN(data[row+1][index])) {
                        hits.push(getNumber(data[row+1],index))
                    } else {
                        if(!isNaN(data[row+1][index-1])) hits.push(getNumber(data[row+1],index-1,true,false))
                        if(!isNaN(data[row+1][index+1])) hits.push(getNumber(data[row+1],index+1,false))
                    }
                }
            }
            if(hits.length>=2) {
                // counter++
                // console.log(`${counter}: ${hits}`)
                total += parseInt(hits[0]) * parseInt(hits[1])
            }
        }
    })
    console.log(total)
}

function getNumber(line,col,searchLeft=true,searchRight=true) {
    let num = [line[col]]
    if(searchLeft) {
        let left = col - 1;
        while(!isNaN(line[left])) {
            num.unshift(line[left])
            left--
        }
    }
    if(searchRight) {
        let right = col + 1;
        while(!isNaN(line[right])) {
            num.push(line[right])
            right++
        }
    }
    return num.join('')
}

findGearRatiosSum('./input.txt')