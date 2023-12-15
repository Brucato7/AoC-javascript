const { convertTxtToString } = require('../../utilities/read-input')

function findRowMatch(rows) {
    let largest = 0
    let value = 0
    let lastRow = rows.length - 1
    for(let i=1; i<lastRow;i++) {
        let subArray
        if(isFuzzyMirror([rows[0], rows[i]],1,false)) {
            subArray = rows.slice(0,i+1)
            if(isFuzzyMirror(subArray)) {
                if(subArray.length > largest) {
                    largest = subArray.length
                    value = subArray.length/2
                }
            }
        }
        if(isFuzzyMirror([rows[lastRow],rows[lastRow - i]],1,false)) {
            subArray = rows.slice(lastRow - i)
            if(isFuzzyMirror(subArray)) {
                if(subArray.length > largest) {
                    largest = subArray.length
                    value = (lastRow - i) + (i+1)/2
                }
            }
        }
    }
    return {
        size: largest,
        val: value
    }
}

function isMirroredArray(arr) {
    if(arr.length % 2 == 1) return false
    let half = arr.length / 2
    let firstHalf = arr.slice(0,half).reverse().join('-')
    let secondHalf = arr.slice(half).join('-')
    return firstHalf == secondHalf
}

function isFuzzyMirror(arr,fuzz=1,strict=true) {
    if(arr.length % 2 == 1) return false
    let strikes = 0
    let isMirror = true
    let half = arr.length / 2
    let firstHalf = arr.slice(0,half).reverse().map(line=>line.split('')).flat()
    let secondHalf = arr.slice(half).map(line=>line.split('')).flat()

    for(let i=0; i<firstHalf.length;i++) {
        if(firstHalf[i] !== secondHalf[i]) {
            strikes++
            if(strikes > fuzz) {
                isMirror = false
                i += firstHalf.length
            }
        }
    }
    if(strict) {
        isMirror = (strikes == fuzz && isMirror) ? true : false
    }
    return isMirror
}

function flipColumnsToRows(rows) {
    const flippedData = Array.apply(null, Array(rows[0].length)).map(()=>'')
    rows.forEach(line => {
        for(let i=0;i<line.length;i++) {
            flippedData[i] += line[i]
        }
    })
    return flippedData
}

function summarizeReflections(data) {
    let total = 0
    data.forEach((set,index) => {
        const rows = set.split('\n')

        let rowMatch = findRowMatch(rows)
        let columns = flipColumnsToRows(rows)
        let colMatch = findRowMatch(columns)

        // console.log(`${index}: ${rowMatch.size}-${rowMatch.val} ${colMatch.size}-${colMatch.val}`)
        
        if(rowMatch.size > 0) {
            total += rowMatch.val * 100
        } else {
            total += colMatch.val
        }
    })
    console.log(total)
}


const input = convertTxtToString('./input.txt')
const data = input.split('\n\n')

summarizeReflections(data)
