const fs = require('fs')

function findFullOverlaps(file) {
    let text = fs.readFileSync(file,'utf8')
    let pairs = text.split("\r\n")
    let overlaps = 0

    pairs.forEach((pair,index) => {
        let first = pair.split(',')[0].split('-')
        let second = pair.split(',')[1].split('-')
        let fr = (first[0] * 1 >= second[0] * 1 && first[1] * 1 <= second[1] * 1)
        let sr = (second[0] * 1 >= first[0] * 1 && second[1] * 1 <= first[1] * 1)
        if(fr || sr){
            overlaps++
        }
    })
    console.log(overlaps)
}

function findOverlaps(file) {
    let text = fs.readFileSync(file,'utf8')
    let pairs = text.split("\r\n")
    let overlaps = 0

    pairs.forEach((pair,index) => {
        if(index + 1) {
            let first = pair.split(',')[0].split('-')
            let second = pair.split(',')[1].split('-')
            let f1 = (first[0] * 1 >= second[0] * 1 && first[0] * 1 <= second[1] * 1)
            let f2 = (first[1] * 1 >= second[0] * 1 && first[1] * 1 <= second[1] * 1)
            let s1 = (second[0] * 1 >= first[0] * 1 && second[0] * 1 <= first[1] * 1)
            let s2 = (second[1] * 1 >= first[0] * 1 && second[1] * 1 <= first[1] * 1)
            
            if(f1 || f2 || s1 || s2){
                console.log(index + 1)
                overlaps++
            }
        }
    })
    console.log(overlaps)
}

findOverlaps('input.txt')