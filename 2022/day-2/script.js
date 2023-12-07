const fs = require('fs')

// A = Rock
// B = Paper
// C = Scissors

// X = Rock (1pt)
// Y = Paper (2pt)
// Z = Scissors (3pt)

// win = 6pt
// draw = 3pt
// lose = 0pt

// Throw - [lose,draw,win]
// X-Rock - [B,A,C]
// Y-Paper - [C,B,A]
// Z-Scissors - [A,C,B]


function calculateScores(file) {
    const myThrows = ['X','Y','Z']
    const opponent = ['A','C','B','A','C']
    let text = fs.readFileSync(file,'utf8')
    let rounds = text.split("\r\n")
    let scores = []
    rounds.forEach(round => {
        let throws = round.split(' ')
        let throwScore = myThrows.indexOf(throws[1]) + 1
        let sliceStart = 3-throwScore
        let outcomeScore = opponent.slice(sliceStart,sliceStart+3).indexOf(throws[0]) * 3
        scores.push(throwScore + outcomeScore)
    })
    return scores.reduce((total, num) => total + num)
}

// console.log(calculateScores('input.txt'))


// X = Lose
// Y = Draw
// Z = Win

const resultMap = {
    A: {
        X: 3, //scissors
        Y: 1, //rock
        Z: 2, //paper
    },
    B: {
        X: 1, //rock
        Y: 2, //paper
        Z: 3, //scissors
    },
    C: {
        X: 2, //paper
        Y: 3, //scissors
        Z: 1, //rock
    },
}
function calculateScoreFromOutcomes(file) {
    const outcomes = ['X','Y','Z']
    let text = fs.readFileSync(file,'utf8')
    let rounds = text.split("\r\n")
    let scores = []

    rounds.forEach(round => {
        let throws = round.split(' ')
        let outcomeScore = outcomes.indexOf(throws[1]) * 3
        let throwScore = resultMap[throws[0]][throws[1]]
        scores.push(outcomeScore + throwScore)
    })
    return scores.reduce((total, num) => total + num)
}

console.log(calculateScoreFromOutcomes('input.txt'))