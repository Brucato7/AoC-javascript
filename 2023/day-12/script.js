const { convertTxtToArray } = require('../../utilities/read-input')

const data = convertTxtToArray('./input.txt')

const cache = {}

/**
 * Solution based on HyperNeutrino: https://www.youtube.com/watch?v=g3Ms5e7Jdqo
 */

function countConfigurations(section,sizes) {
    let key = section + '-' + sizes.join(',')

    if(key in cache) {
        return cache[key]
    } else {
        if(section.length == 0){
            return (sizes.length == 0) ? 1 : 0
        }
        if(sizes.length == 0) {
            return (section.indexOf('#') >= 0) ? 0 : 1
        }
        if(calcTotalSizeLength(sizes) > section.length) {
            return 0
        }

        result = 0

        if(['.','?'].includes(section[0])) {
            result += countConfigurations(section.slice(1), sizes)
        }
        if(['#','?'].includes(section[0])) {
            if(isValidBlock(section,sizes[0])) {
                result += countConfigurations(section.slice(sizes[0]+1),sizes.slice(1))
            }
        }
        cache[key] = result
        return result
    }
}

function isValidBlock(section,blockSize) {
    let isValid = true
    if(blockSize > section.length) isValid = false
    else if(section.slice(0,blockSize).indexOf('.') >= 0) isValid = false
    else if(section[blockSize] && section[blockSize] == '#') isValid = false
    return isValid
}

function calcTotalSizeLength(sizes) {
    return sizes.reduce((total,x) => {
        return total + x
    },0) + sizes.length - 1
}

function calculateSpringMapPossibilities(data) {
    let total = 0
    console.time()
    data.forEach(line => {
        let [section,sizes] = line.split(' ')
        sizes = sizes.split(',').map(x=>parseInt(x))
    
        let result = countConfigurations(section,sizes)
        total += result
    })
    console.log(total)
    console.timeEnd()
}
function calculateSpringMapPossibilitiesUnfolded(data) {
    let total = 0
    console.time()
    data.forEach(line => {
        let [section,sizes] = line.split(' ')
        section = [section,section,section,section,section].join('?')
        sizes = [sizes,sizes,sizes,sizes,sizes].join(',').split(',').map(x=>parseInt(x))
    
        let result = countConfigurations(section,sizes)
        total += result
    })
    console.log(total)
    console.timeEnd()
}

// calculateSpringMapPossibilities(data)
calculateSpringMapPossibilitiesUnfolded(data)
