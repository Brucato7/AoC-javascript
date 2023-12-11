const {convertTxtToArray} = require('../../utilities/read-input.js')

function findNumberOfTurns(input) {
    let directions = getDirections(input)
    let nodeMap = getNodeMap(input)
    
    let currentNode = 'AAA'
    let counter = 0
    
    while(currentNode != 'ZZZ') {
        let direction = directions[counter%directions.length]
        currentNode = nodeMap[currentNode][direction]
        counter++
    }

    console.log(counter)
}

function getDirections(input) {
    let data = convertTxtToArray(input)
    return data.shift().split('').map(x=>(x=='L')?0:1)
}

function getNodeMap(input) {
    let data = convertTxtToArray(input)
    let nodeMap = {}
    data.slice(2).forEach(line => {
        let map = line.split(" = ")
        let path = map[0]
        let fork = map[1].replace('(','').replace(')','').split(", ")
        nodeMap[path] = fork
    })
    return nodeMap
}

// findNumberOfTurns('./input.txt')

function findNumberOfTurnsAsAGhost(input) {
    let directions = getDirections(input)
    let nodeMap = getNodeMap(input)

    let currentNodes = Object.keys(nodeMap).filter(a => {
        return (a[2] == 'A') ? true : false
    })
    console.log(currentNodes)

    let movesToFirstZ = currentNodes.map(a => {
        let current = a
        let i = 0
        while(current[2] != 'Z') {
            let direction = directions[i%directions.length]
            current = nodeMap[current][direction]
            i++
        }
        return i
    })
    console.log(movesToFirstZ)

    let lcm = movesToFirstZ.reduce((total,x) => {
        return lcmFunction(total,x)
    },1)
    console.log(lcm)
}

function gcd(a, b) { 
    for (let temp = b; b !== 0;) { 
        b = a % b; 
        a = temp; 
        temp = b; 
    } 
    return a; 
} 
  
function lcmFunction(a, b) { 
    const gcdValue = gcd(a, b); 
    return (a * b) / gcdValue; 
} 

findNumberOfTurnsAsAGhost('./input.txt')