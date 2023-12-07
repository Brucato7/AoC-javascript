const {convertTxtToArray} = require('../../utilities/read-input.js')

function caclulateScratchCardPoints(input) {
    let data = convertTxtToArray(input)
    let total = 0

    data.forEach(game => {
        let card = game.replaceAll("  "," ").split(":")[1].split("|")
        let winningNumbers = new Set(card[0].trim().split(' ').sort((a,b)=>a-b))
        let numbers = card[1].trim().split(' ').sort((a,b)=>a-b)
    
        let matches = 0
        numbers.forEach(n => {
            if(winningNumbers.has(n)){
                matches++
            }
        })
        if(matches > 0) {
            total += (Math.pow(2,matches-1))
        }
    })
    console.log(total)
}

// caclulateScratchCardPoints('./input.txt')

function calculateTotalCards(input) {
    let data = convertTxtToArray(input)
    let cardCounts = Array.apply(null,Array(data.length)).map(()=>1)
    console.log(cardCounts)

    data.forEach((game,index) => {
        let cardCopies = cardCounts[index]
        let card = game.replaceAll("  "," ").split(":")[1].split("|")
        let winningNumbers = new Set(card[0].trim().split(' ').sort((a,b)=>a-b))
        let numbers = card[1].trim().split(' ').sort((a,b)=>a-b)
    
        let matches = 0
        numbers.forEach(n => {
            if(winningNumbers.has(n)){
                matches++
            }
        })
        if(matches > 0) {
            for(let i=1; i<=matches;i++) {
                cardCounts[index+i] += cardCopies
            }
        }
    })
    console.log(cardCounts.reduce((total,x)=>{
        return total+x
    },0))
    
}

calculateTotalCards('./input.txt')