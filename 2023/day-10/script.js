const fs = require('fs')
const { start } = require('repl')
const {convertTxtToString} = require('../../utilities/read-input')

/**
 * Symbols = Connect To
 * 7 > ╗ = right, bottom (1,2)
 * J > ╝ = right, top (1,0)
 * L > ╚ = left, top (3,0)
 * F > ╔ = left, bottom (3,2)
 * - > ═ = left, right (3,1)
 * | > ║ = top, bottom (0,2)
 * 
 * Direction Map:
 * top -> 0     = [-1,0]
 * right -> 1   = [0,1]
 * bottom -> 2  = [1,0]
 * left -> 3    = [0,-1]
 */

const symbolPipes = {
    '7':'╗',
    'J':'╝',
    'S':'╝',
    'L':'╚',
    'F':'╔',
    '-':'═',
    '|':'║'
}

const directions = [
    [-1,0],
    [0,1],
    [1,0],
    [0,-1],
]

const symbolMap = {
    '7': [3,2],
    'F': [1,2],
    'J': [0,3],
    'L': [0,1],
    '-': [1,3],
    '|': [0,2]
}

function getStartingNodeAndData(file) {
    let input = convertTxtToString(file)
    let startingIndex = input.replaceAll('\n','').indexOf('S')
    let data = input.split('\n')
    let colCount = data[0].length

    let row = Math.floor(startingIndex/colCount)
    let col = startingIndex%colCount

    return {
        data: data,
        startingNode: [row,col]
    }
}

function mapPipes(file) {
    const {data,startingNode} = getStartingNodeAndData(file)

    const path = [startingNode,findConnectingNode(startingNode,data)]

    while(path[path.length-1][0] != startingNode[0] || path[path.length-1][1] != startingNode[1]) {
        let nextNode = travelToNextNode(path[path.length-1],path[path.length-2],data)
        path.push(nextNode)
    }

    // Slice off last node since the startingNode is pushed twice.
    const vertices = path.slice(0,-1).filter(node => {
        let row = node[0]
        let col = node[1]
        return ['7','J','L','F','S'].includes(data[row][col])
    })

    let area = shoelace(vertices)

    let interiorPoints = area - ((path.length - 1)/2) + 1
    console.log(interiorPoints)

    // Built a visualization to help conceptualize and debug
    // const pipeMap = {}
    // path.forEach(node => {
    //     if(node[0] in pipeMap) {
    //         pipeMap[node[0]].push(node[1])
    //     } else {
    //         pipeMap[node[0]] = [node[1]]
    //     }
    // })

    // let outputMap = data.map((line,index)=>{
    //     let newLine = ''
    //     for(let i=0;i<line.length;i++){
    //         if(index in pipeMap && pipeMap[index].includes(i)) {
    //             newLine += symbolPipes[line[i]]
    //         } else {
    //             newLine += "$"
    //         }
    //     }
    //     return newLine
    // })

    // fs.writeFile('./output.txt',outputMap.join('\n'),()=>{})
}

function findConnectingNode(node, data) {
    let row = node[0]
    let col = node[1]
    let next = false
    
    if(['7','F','|'].includes(data[row-1][col])) next = [row-1,col]
    else if(['L','F','-'].includes(data[row][col+1])) next = [row,col+1]
    else if(['J','L','|'].includes(data[row+1][col])) next = [row+1,col]
    else if(['7','J','-'].includes(data[row][col-1])) next = [row,col-1]

    return next;
}

function travelToNextNode(curr,prev,data) {
    let prevDirection = directions.map((d,i) => {
        if(d[0] == prev[0] - curr[0] && d[1] == prev[1] - curr[1]) {
            return i
        }
    }).filter(x=>x || x===0)[0]
    let nextDirection = symbolMap[data[curr[0]][curr[1]]].filter(x=>x!==prevDirection)[0]

    return [curr[0] + directions[nextDirection][0], curr[1] + directions[nextDirection][1]]
}


function shoelace(vertices) {
    let area = 0
    for(let i=0;i<vertices.length;i++) {
        let nextIndex = (i+1) % vertices.length
        if(vertices[nextIndex] == undefined) console.log(i,vertices.length,nextIndex)
        let [x,y] = vertices[i]
        let [x1,y1] = vertices[nextIndex]
        area += (x1 + x) * (y1 - y)
    }
    return Math.abs(area)/2
}

mapPipes('./input.txt')

