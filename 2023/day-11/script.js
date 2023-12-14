const fs = require('fs')
const {convertTxtToArray} = require('../../utilities/read-input')

function findExpansions(data) {
    let emptyRows = []
    let emptyCols = []
    let cols = []

    data.forEach((line,index) => {
        if(line.indexOf('#') >= 0) {
            for(let i=0;i<line.length;i++) {
                if(line[i] == '#') {
                    cols.push(i)
                }
            }
        } else {
            emptyRows.push(index)
        }
    })

    for(let c=0;c<data[0].length;c++) {
        if(!cols.includes(c)) {
            emptyCols.push(c)
        }
    }

    return {
        'rows': emptyRows,
        'cols': emptyCols
    }
}

function expandData(data) {
    const {rows,cols} = findExpansions(data)

    let expandedData = data.map(line => {
        let newLine = line.split('').map((char,index)=>{
            if(cols.includes(index)) {
                return char+'.'
            } else {
                return char
            }
        })
        return newLine.join('')
    })

    let emptyLine = Array.apply(null, Array(expandedData[0].length)).map(()=>'.').join('')

    for(let i=rows.length-1;i>=0;i--) {
        let row = rows[i]
        expandedData = [...expandedData.slice(0,row),emptyLine,...expandedData.slice(row)]
    }

    return expandedData
}

function sumOfShortestPaths(data) {
    const expandedData = expandData(data)

    const galaxyNodes = []

    expandedData.forEach((line,index)=>{
        for(let i=0; i<line.length;i++) {
            if(line[i] == '#') {
                galaxyNodes.push([index,i])
            }
        }
    })

    let sum = 0

    for(let g=0;g<galaxyNodes.length;g++) {
        let [x1,y1] = galaxyNodes[g]

        for(let p=g+1;p<galaxyNodes.length;p++) {
            let [x2,y2] = galaxyNodes[p]
            sum += (Math.abs(x1-x2) + Math.abs(y1-y2))
        }
    }

    console.log(sum)
}

function filterExpansions(num1, num2, expansions) {
    let x1 = (num1 > num2) ? num1 : num2
    let x2 = (num1 > num2) ? num2 : num1

    return expansions.filter(x => x < x1 && x > x2).length
}

function sumOfShortestPathsWithMillions(data) {
    const {rows,cols} = findExpansions(data)

    const galaxyNodes = []

    data.forEach((line,index)=>{
        for(let i=0; i<line.length;i++) {
            if(line[i] == '#') {
                galaxyNodes.push([index,i])
            }
        }
    })

    let sum = 0

    for(let g=0;g<galaxyNodes.length;g++) {
        let [x1,y1] = galaxyNodes[g]

        for(let p=g+1;p<galaxyNodes.length;p++) {
            let [x2,y2] = galaxyNodes[p]
            let expansionsX = filterExpansions(x1,x2,rows)
            let expansionsY = filterExpansions(y1,y2,cols)
            sum += (Math.abs(x1-x2) + Math.abs(y1-y2)) + ((expansionsX + expansionsY) * 999999)
        }
    }

    console.log(sum)
}

const data = convertTxtToArray('./input.txt')

sumOfShortestPathsWithMillions(data)