const fs = require('fs')
const { convertTxtToArray } = require('../../utilities/read-input')

// [0,0], 'right', data
function followBeam(prevNode,dir,activatedNodes=[],map) {
    // console.log(node,dir)
    let [newY,newX] = prevNode
    if(dir == 'right') newX++
    else if(dir == 'left') newX--
    else if(dir == 'up') newY--
    else if(dir == 'down') newY++
    let total = 0

    if(newX < 0 || newY < 0 || newX >= map[0].length || newY >= map.length) return 0
    let stringNode = newY + '-' + newX
    if(!activatedNodes.includes(stringNode)) {
        activatedNodes.push(stringNode)
        total++
    }
    const char = map[newY][newX]
    let currNode = [newY,newX]
    if(char == '$') {
        return total
    } else if(char == '|' && ['right','left'].includes(dir)) {
        map[newY][newX] = '$'
        total += followBeam(currNode,'up',activatedNodes,map)
        total += followBeam(currNode,'down',activatedNodes,map)
    } else if(char == '-' && ['up','down'].includes(dir)) {
        map[newY][newX] = '$'
        total += followBeam(currNode,'right',activatedNodes,map)
        total += followBeam(currNode,'left',activatedNodes,map)
    } else if(char == '\\') {
        total += followBeam(currNode,backSlashMap[dir],activatedNodes,map)
    } else if(char == '/') {
        total += followBeam(currNode,forwardSlashMap[dir],activatedNodes,map)
    } else {
        total += followBeam(currNode,dir,activatedNodes,map)
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

let length = data[0].length
let height = data[0].length

const results = []

for(let l=0;l<length;l++) {
    let map = JSON.parse(JSON.stringify(data))
    results.push(followBeam([-1,l],'down',[],map))
    results.push(followBeam([height,l],'up',[],map))
}
for(let h=0;h<height;h++) {
    let map = JSON.parse(JSON.stringify(data))
    results.push(followBeam([h,-1],'right',[],map))
    results.push(followBeam([h,length],'left',[],map))
}

console.log(results)
console.log(results.sort((a,b)=>b-a)[0])

// let result = 0
// result += followBeam([0,-1],'right',[])

// console.log(result)
// console.log(activatedNodes.length)
