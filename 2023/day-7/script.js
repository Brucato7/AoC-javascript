const {convertTxtToArray} = require('../../utilities/read-input.js')

/**
 * Type - Number of Different Cards - Rank
 * Five of a Kind   - 1 - 6
 * Four of a Kind   - 2 - 5 
 * Full House       - 2 - 4
 * Three of a Kind  - 3 - 3
 * Two Pair         - 3 - 2
 * One Pair         - 4 - 1
 * High Card        - 5 - 0
 */

const cardMap = {
    '2': 2,
    '3': 3,
    '4': 4,
    '5': 5,
    '6': 6,
    '7': 7,
    '8': 8,
    '9': 9,
    'T': 10,
    'J': 11,
    'Q': 12,
    'K': 13,
    'A': 14
}

function getHandType(hand,jokers=false) {
    let cards = {}
    let type;
    hand.split('').forEach(card => {
        if(card in cards) {
            cards[card]++
        } else {
            cards[card]=1
        }
    });

    if(jokers) {
        cards = accountForJokers(cards)
    }

    let cardCounts = Object.values(cards)
    let uniqueCards = cardCounts.length
    let product = cardCounts.reduce((total,x)=>{return total*x},1)

    if(uniqueCards == 1) {
        type = 6
    } else if(uniqueCards == 2) {
        type = (product == 4) ? 5 : 4
    } else if(uniqueCards == 3) {
        type = (product == 3) ? 3 : 2
    } else if (uniqueCards == 4) {
        type = 1
    } else {
        type = 0
    }
    
    return type
}

function playCamelCards(input,jokers=false) {
    let data = convertTxtToArray(input).map(line => {
        let round = line.split(' ')
        return {
            hand: round[0],
            bid: parseInt(round[1]),
            type: getHandType(round[0],jokers)
        }
    })

    if(jokers) {
        cardMap['J'] = 1
    }

    data.sort(sortByTypeAndHighCard)
    // console.log(data)
    let result = data.reduce((total,game,index) => {
        return total += game.bid*(index+1)
    },0)
    console.log(result)
}

function sortByTypeAndHighCard(a,b) {
    if(a.type != b.type) {
        return a.type-b.type
    } else {
        let handA = a.hand.split('').map(x => cardMap[x])
        let handB = b.hand.split('').map(x => cardMap[x])

        for(let i=0; i<handA.length;i++) {
            if(handA[i] != handB[i]){
                return handA[i] - handB[i]
            }
        }
    }
}

function accountForJokers(cards) {
    if(cards['J'] && cards['J'] < 5) {
        let jNum = cards['J']
        delete(cards['J'])
        let largest = Object.entries(cards).sort((a,b)=>b[1]-a[1])[0][0]
        cards[largest] += jNum
    }
    return cards
}

playCamelCards('./input.txt',true)