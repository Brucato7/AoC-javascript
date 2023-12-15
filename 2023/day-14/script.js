const { convertTxtToArray } = require('../../utilities/read-input')

function flipColumnsToRows(rows) {
    const flippedData = Array.apply(null, Array(rows[0].length)).map(()=>'')
    rows.forEach(line => {
        for(let i=0;i<line.length;i++) {
            flippedData[i] += line[i]
        }
    })
    return flippedData
}

function pushRocks(line, left=true) {
    let row = (left) ? line : line.split('').reverse().join('')
    let newLine = ''
    let temp = ''
    for(let i = 0; i< row.length; i++) {
        if(row[i] == 'O') {
            newLine += 'O'
        } else if(row[i] == '.') {
            temp += '.'
        } else if(row[i] == '#') {
            newLine += temp
            temp = ''
            newLine += '#'
        }
    }
    return (left) ?
        newLine + temp :
        (newLine + temp).split('').reverse().join('')
}

function calculateLoad(rockMap) {
    let max = rockMap.length
    let rowTotals = rockMap.map((line,index)=>{
        return line.split('').filter(x=>x=='O').length * (max-index)
    })
    return rowTotals.reduce((total,x)=>{return total+x},0)
}

function tiltNorth(rocks) {
    let flipped = flipColumnsToRows(rocks)
    let pushedRocks = flipped.map(line => {
        return pushRocks(line)
    })
    return flipColumnsToRows(pushedRocks)
}
function tiltWest(rocks) {
    return rocks.map(line => {
        return pushRocks(line)
    })
}
function tiltSouth(rocks) {
    let flipped = flipColumnsToRows(rocks)
    let pushedRocks = flipped.map(line => {
        return pushRocks(line,false)
    })
    return flipColumnsToRows(pushedRocks)
}
function tiltEast(rocks) {
    return rocks.map(line => {
        return pushRocks(line,false)
    })
}

function cycleRocks(rocks) {
    // console.log(rocks.join('\n'))
    let results = []
    let currentMap = rocks
    let newMap,north,south,east,west
    for(let i = 0; i < 1000; i++) {
        // console.log('----------------')
        north = tiltNorth(currentMap)
        // console.log(north.join('\n'))
        // console.log('----------------')
        west = tiltWest(north)
        // console.log(west.join('\n'))
        // console.log('----------------')
        south = tiltSouth(west)
        // console.log(south.join('\n'))
        // console.log('----------------')
        east = tiltEast(south)
        // console.log(east.join('\n'))
        // console.log('----------------')
        
        results.push(calculateLoad(east))
        currentMap = east
    }
    return results
}

const data = convertTxtToArray('./input.txt')

let results = cycleRocks(data)

results.forEach((num,index)=>{
    console.log(`${num}`)
})

// console.log((1000000000 - 92) % 18)