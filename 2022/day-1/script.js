const fs = require('fs')

function parseCalorieList(file) {
    let text = fs.readFileSync(file,'utf8')
    let array = text.split('\n')
    let packs = [[]]
    let i = 0
    array.forEach(line => {
        if(line === "\r") {
            i++
            packs[i] = [];
        } else {
            packs[i].push(parseInt(line.replace("\r","")))
        }
    })
    
    
    let largestCalorieCount = 0

    packs.forEach(pack => {
        let packCalories = pack.reduce((total, num) => total + num)
        if(packCalories > largestCalorieCount) {
            largestCalorieCount = packCalories
        }
    })

    console.log(largestCalorieCount)
}

function topThreeCalories(file) {
    let text = fs.readFileSync(file,'utf8')
    let array = text.split('\n')
    let packs = [[]]
    let i = 0
    array.forEach(line => {
        if(line === "\r") {
            i++
            packs[i] = [];
        } else {
            packs[i].push(parseInt(line.replace("\r","")))
        }
    })
    
    
    let largestCalorieCounts = [0,0,0]

    packs.forEach(pack => {
        let packCalories = pack.reduce((total, num) => total + num)
        
        largestCalorieCounts.push(packCalories)
        largestCalorieCounts.sort(function(a, b){return a-b});
        largestCalorieCounts.shift();
    })
    return largestCalorieCounts.reduce((total, num) => total + num)
}

console.log(topThreeCalories('input.txt'))