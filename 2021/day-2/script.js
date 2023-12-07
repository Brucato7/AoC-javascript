const {convertTxtToArray} = require('../../utilities/read-input.js')

function getFinalPosition(input, useAim = false) {
    let data = convertTxtToArray(input)

    const nav = (useAim) ? new PositionWithAim() : new Position();

    data.map(line => {
        let order = line.split(' ');
        nav[order[0]](order[1])
    })

    console.log(nav.horizontal)
    console.log(nav.depth)

    console.log(nav.horizontal * nav.depth)


}

class Position {
    constructor() {
        this.horizontal = 0
        this.depth = 0
    }
    forward(x) {
        this.horizontal += parseInt(x)
    }
    up(y) {
        this.depth -= parseInt(y)
    }
    down(y) {
        this.depth += parseInt(y)
    }
}
class PositionWithAim {
    constructor() {
        this.horizontal = 0
        this.depth = 0
        this.aim = 0
    }
    forward(x) {
        this.horizontal += parseInt(x)
        this.depth += (parseInt(x) * this.aim)
    }
    up(y) {
        this.aim -= parseInt(y)
    }
    down(y) {
        this.aim += parseInt(y)
    }
}

getFinalPosition('./input.txt',true)