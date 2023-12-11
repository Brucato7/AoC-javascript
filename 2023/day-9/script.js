const {convertTxtToArray} = require('../../utilities/read-input.js')

function findSumOfAllExtrapolations(input) {
    let data = convertTxtToArray(input)

    let results = data.map(findNextNumberInSequence)

    console.log(results.reduce((total,x)=>{return total+x},0))
}

function findNextNumberInSequence(sequence){
    // console.log(sequence)
    let values = sequence.split(' ')
    let temp = [values]
    // console.log(temp)

    while(temp[temp.length-1].reduce((total,x)=>{return total+x},0) != 0 || temp[temp.length-1].length>1) {
        let current = temp[temp.length-1]
        // console.log(current)
        let next = []
        current.forEach((x,i) => {
            if(!isNaN(current[i+1])) next.push(current[i+1] - x)
        })
    // console.log(next)
        temp.push(next)
    }


    // temp.forEach((line,index) => {
    //     console.log(`${index}: ${line}`)
    // })

    let lastNumbers = temp.map(arr => arr[arr.length-1])

    return lastNumbers.reduce((total,x) => {
        return total+parseInt(x)
    },0)
}

findSumOfAllExtrapolations('./input.txt')