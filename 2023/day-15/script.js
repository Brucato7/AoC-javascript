const {convertTxtToArray} = require('../../utilities/read-input')

const data = convertTxtToArray('./input.txt').map(line=>line.split(',')).flat()

// let conversions = data.map(str => {
//     let currVal = 0
//     for(let i=0;i<str.length;i++) {
//         currVal += str.charCodeAt(i)
//         currVal = currVal * 17
//         currVal = currVal % 256
//     }
//     return currVal
// })

// console.log(conversions.reduce((total,x)=>{return total+x},0))

const boxes = Array.apply(null, Array(256)).map(x => [])
const lenses = {}

data.forEach(str => {
    if(str.indexOf('=') >= 0) {
        let [lens,focal] = str.split('=')
        if(lens in lenses) {
            lenses[lens]['focalLength'] = focal
            let box = lenses[lens]['box']
            if(boxes[box].indexOf(lens) < 0) {
                boxes[box].push(lens)
            }
        } else {
            let val = convertStringTo256(lens)
            lenses[lens] = {
                focalLength: focal,
                box: val
            }
            boxes[val].push(lens)
        }
    } else if(str.indexOf('-') >= 0) {
        let lens = str.split('-')[0]
        if(lens in lenses) {
            let box = lenses[lens]["box"]
            let index = boxes[box].indexOf(lens)
            if(index > -1) {
                boxes[box].splice(index,1)
            }
        }
    }
})

let total = 0

boxes.forEach((box,index) => {
    for(let i=0; i<box.length;i++) {
        total += (index+1)*(i+1)*lenses[box[i]]['focalLength']
    }
})
console.log(total)

function convertStringTo256(str) {
    let currVal = 0
    for(let i=0;i<str.length;i++) {
        currVal += str.charCodeAt(i)
        currVal = currVal * 17
        currVal = currVal % 256
    }
    return currVal
}