const fs = require('fs')

function sumRucksacks(file) {
    const alphaMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")
    const sums = []
    let text = fs.readFileSync(file,'utf8')
    let textArray = text.split('\r\n')
    textArray.forEach(pack => {
        let half = Math.ceil(pack.length / 2)
        for(let i=0; i <= half; i++) {
            if(pack.lastIndexOf(pack[i]) > half-1) {
                sums.push(alphaMap.indexOf(pack[i]) + 1)
                i+=pack.length
            }
        }
    })
    return sums.reduce((total, num) => total + num)


}
function sumRucksacksByGroup(file) {
    const alphaMap = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split("")
    const sums = []
    let text = fs.readFileSync(file,'utf8')
    let textArray = text.split('\r\n')
    for(let i=0; i<textArray.length;i+=3) {
        let first = textArray[i]
        let second = textArray[i+1]
        let third = textArray[i+2]
        for(let j=0; j < first.length; j++) {
            if(second.indexOf(first[j]) > -1) {
                if(third.indexOf(first[j]) > -1) {
                    sums.push(alphaMap.indexOf(first[j]) + 1)
                    j += first.length
                }
            }
        }
    }
    return sums.reduce((total, num) => total + num)
}

console.log(sumRucksacksByGroup('input.txt'))

// console.log(sumRucksacks('input.txt'))