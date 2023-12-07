const fs = require('fs')

function decodeSignals(file) {
    let text = fs.readFileSync(file,'utf8')
    let answer = 0
    const packet = []

    for(let i=0; i < text.length; i++) {
        if(packet.length < 14) {
            packet.push(text[i])
        }
        if(packet.length == 14) {
            if(hasDuplicates(packet)) {
                packet.shift()
            } else {
                answer = i + 1
                break;
            }
        }
    }
    console.log(packet)
    console.log(answer)
}

function hasDuplicates(array) {
    const temp = {};
    for (let i = 0; i < array.length; i++) {
        let val = array[i];
        if (val in temp) {
            return true;
        }
        temp[val] = true;
    }
    return false;
}

decodeSignals('input.txt')

// hrcr
// hrcr