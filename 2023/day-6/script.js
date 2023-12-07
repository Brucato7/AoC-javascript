const {convertTxtToArray} = require('../../utilities/read-input.js')

function calculateRaceErrorMargin(input) {
    const races = [
        [54,302],
        [94,1476],
        [65,1029],
        [92,1404]
    ]

    let results = races.map(race => {
        return findAllWaysToWin(race[0],race[1])
    })

    console.log(results.reduce((total,x)=>{
        return total*x
    },1))
}

function findAllWaysToWin(time,distanceToBeat) {
    let i = Math.ceil(distanceToBeat/time)
    
    while(i * (time-i) < distanceToBeat) {
        i++
    }
    return time - (i+i-1)
}

// calculateRaceErrorMargin('./input.txt')

console.log(findAllWaysToWin(54946592,302147610291404))