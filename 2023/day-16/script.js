const fs = require('fs')
const { convertTxtToArray } = require('../../utilities/read-input')

const activatedNodes = []

// [0,0], 'right', data
function followBeam(prevNode,dir) {
    // console.log(node,dir)
    let [newY,newX] = prevNode
    if(dir == 'right') newX++
    else if(dir == 'left') newX--
    else if(dir == 'up') newY--
    else if(dir == 'down') newY++
    let total = 0

    if(newX < 0 || newY < 0 || newX >= data[0].length || newY >= data.length) return 0
    let stringNode = newY + '-' + newX
    if(!activatedNodes.includes(stringNode)) {
        activatedNodes.push(stringNode)
        total++
    }
    const char = data[newY][newX]
    let currNode = [newY,newX]
    if(char == '$') {
        return total
    } else if(char == '|' && ['right','left'].includes(dir)) {
        data[newY][newX] = '$'
        total += followBeam(currNode,'up')
        total += followBeam(currNode,'down')
    } else if(char == '-' && ['up','down'].includes(dir)) {
        data[newY][newX] = '$'
        total += followBeam(currNode,'right')
        total += followBeam(currNode,'left')
    } else if(char == '\\') {
        total += followBeam(currNode,backSlashMap[dir])
    } else if(char == '/') {
        total += followBeam(currNode,forwardSlashMap[dir])
    } else {
        total += followBeam(currNode,dir)
    }

    return total
}

const forwardSlashMap = {
    up: 'right',
    down: 'left',
    right: 'up',
    left: 'down'
}
const backSlashMap = {
    up: 'left',
    down: 'right',
    right: 'down',
    left: 'up'
}

const data = convertTxtToArray('./input.txt').map(line=>line.split(''))

let result = 1

result += followBeam([0,-1],'right')

console.log(activatedNodes.length)
