const {convertTxtToArray} = require('../../utilities/read-input.js')


function calibrateSnowProduction(input) {
    let data = convertTxtToArray(input)
    
    let result = data.reduce((total,line) => {
        let nums = line.replace(/\D/g,'')
        let val = nums[0] + nums[nums.length-1]
        return total + parseInt(val)
    },0)
    
    console.log(result)
}


calibrateSnowProduction('./input.txt')










// let linePlus = addNumerals(line)

// const wordNumPairs = {
//     'one': '1',
//     'two': '2',
//     'three': '3',
//     'four': '4',
//     'five': '5',
//     'six': '6',
//     'seven': '7',
//     'eight': '8',
//     'nine': '9'
// }






// function addNumerals(string) {
//     let modified = string
//     Object.keys(wordNumPairs).forEach(word => {
//         let firstIndex = modified.indexOf(word);
//         let lastIndex = modified.lastIndexOf(word);
//         if(lastIndex != firstIndex && lastIndex > 0) {
//             modified = modified.slice(0, lastIndex+1) + wordNumPairs[word] + modified.slice(lastIndex+1);
//         }
//         if(firstIndex >= 0) {
//             modified = modified.slice(0, firstIndex+1) + wordNumPairs[word] + modified.slice(firstIndex+1);
//         }
//     })
//     return modified
// }

