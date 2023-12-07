const {convertTxtToArray} = require('../../utilities/read-input.js')

function checkForImpossibleGames(input) {
    const maxCounts = {
        'red': 12,
        'green': 13,
        'blue': 14
    }
    let data = convertTxtToArray(input)
    let total = 0;
    
    data.forEach((line,index) => {
        let colorCounts = line.replaceAll(',','').replaceAll(';','').split(" ").slice(2)
        let gameNumber = index+1
        for(let i=0; i<colorCounts.length; i+=2) {
            if(colorCounts[i] > maxCounts[colorCounts[i+1]]) {
                gameNumber = 0
                i += colorCounts.length
            }
        }
        total += gameNumber
    })

    console.log(total)
}

function checkForLowestPossible(input) {
    const maxCounts = {
        'red': 12,
        'green': 13,
        'blue': 14
    }
    let data = convertTxtToArray(input)

    let result = data.reduce((total, line) => {
        let colorCounts = line.replaceAll(',','').replaceAll(';','').split(" ").slice(2)
        let temp = {'red': [], 'green': [], 'blue': []}
        for(let i=0; i<colorCounts.length; i+=2) {
            temp[colorCounts[i+1]].push(colorCounts[i])
        }
        temp['red'].sort((a,b) => b-a)
        temp['green'].sort((a,b) => b-a)
        temp['blue'].sort((a,b) => b-a)

        return total + (parseInt(temp['red'][0]) * parseInt(temp['green'][0]) * parseInt(temp['blue'][0]))
    },0)

    console.log(result)
}

checkForImpossibleGames('./input.txt')