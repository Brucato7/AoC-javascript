const fs = require('fs')

function crateMoving(file) {
    let text = fs.readFileSync(file,'utf8')
    let textArray = text.split("\r\n")
    const crates = []
    const moves = []
    for(let j = 0; j < 9; j++) {
        crates.push([])
    }
    for(let i=0; i < 8; i++) {
        let line = textArray[i].split('')
        for(let k = 0; k < 9; k++) {
            let val = line[(k * 4) + 1].replace(' ','')
            if(val) {
                crates[k].push(val)
            }
        }
    }
    for(let l = 10; l < textArray.length; l++) {
        let line = textArray[l].replace('move ','').replace('from ','').replace('to ','').split(' ')
        moves.push(line)
    }
    moves.forEach(m => {
        singleMove9001(crates,...m)
    })
    let answer = ''
    crates.forEach(stack => {
        answer += stack[0]
    })
    console.log(answer)
}

function singleMove(crates,count,from,to) {
    for(let i = count; i > 0; i--){
        crates[to-1].unshift(crates[from-1].shift())
    }
}

function singleMove9001(crates,count,from,to) {
    let temp = []
    for(let i = count; i > 0; i--){
        temp.unshift(crates[from-1].shift())
    }
    temp.forEach(el => {
        crates[to-1].unshift(el)
    })
}

crateMoving('input.txt')