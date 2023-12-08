const {convertTxtToArray} = require('../../utilities/read-input.js')

function findNumberOfTurns(input) {
    let data = convertTxtToArray(input)
    let directions = data.shift().split('').map(x=>(x=='L')?0:1)
    let nodeMap = {}
    data.slice(1).forEach(line => {
        let map = line.split(" = ")
        let path = map[0]
        let fork = map[1].replace('(','').replace(')','').split(", ")
        nodeMap[path] = fork
    })
    
    let currentNode = 'AAA'
    let counter = 0
    
    while(currentNode != 'ZZZ') {
        let direction = directions[counter%directions.length]
        currentNode = nodeMap[currentNode][direction]
        counter++
    }

    console.log(counter)
}

findNumberOfTurns('./input.txt')