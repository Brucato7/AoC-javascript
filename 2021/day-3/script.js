const {convertTxtToArray} = require('../../utilities/read-input.js')

function calcDiagnostics(input) {
    let data = convertTxtToArray(input)
    let binLength = data[0].length

    let results = Array.apply(null, Array(binLength)).map(() => 0)

    data.forEach(line => {
        for(let i=0; i<binLength;i++) {
            results[i] += parseInt(line[i])
        }
    })

    let gamma = results.map(x => {
        return (x > 500) ? 1 : 0;
    })

    
    let epsilon = gamma.map(b => {
        return (b) ? 0 : 1
    })
    

    let gammaDec = parseInt(gamma.join(''),2).toString(10)
    let epsilonDec = parseInt(epsilon.join(''),2).toString(10)
    console.log(gammaDec*epsilonDec)
}

// calcDiagnostics('./input.txt')

function calcLifeSupprt(input){
    let data = convertTxtToArray(input)
    let binLength = data[0].length

    let firstFilter = data.filter(x => x[0] == 1)
    console.log(firstFilter)

}

calcLifeSupprt('./input.txt')