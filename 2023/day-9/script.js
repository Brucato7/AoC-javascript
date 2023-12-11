const {convertTxtToArray} = require('../../utilities/read-input.js')

function findSumOfAllExtrapolations(input) {
    let data = convertTxtToArray(input)

    let results = data.map(findNextNumberInSequence)

    console.log(results.reduce((total,x)=>{return total+x},0))
}

function findNextNumberInSequence(sequence){
    let values = sequence.split(' ').reverse() // remove .reverse for part 1
    let temp = [values]

    while(temp[temp.length-1].reduce((total,x)=>{return total+x},0) != 0 || temp[temp.length-1].length>1) {
        let current = temp[temp.length-1]
        let next = []
        current.forEach((x,i) => {
            if(!isNaN(current[i+1])) next.push(current[i+1] - x)
        })
        temp.push(next)
    }

    let lastNumbers = temp.map(arr => arr[arr.length-1])

    return lastNumbers.reduce((total,x) => {
        return total+parseInt(x)
    },0)
}

findSumOfAllExtrapolations('./input.txt')