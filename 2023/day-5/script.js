const {convertTxtToString} = require('../../utilities/read-input.js')

const input = convertTxtToString('./input.txt')

function getInputData(title) {
    let section = input.split(title)[1].split('\n')
    let i = 0
    let data = []
    while(section[i]) {
        data.push(section[i].trim().split(' '))
        i++
    }
    return data
}

// console.log(getInputData('seeds:'))
// console.log(getInputData('seed-to-soil map:\n'))
// console.log(getInputData('soil-to-fertilizer map:\n'))
// console.log(getInputData('fertilizer-to-water map:\n'))
// console.log(getInputData('water-to-light map:\n'))
// console.log(getInputData('light-to-temperature map:\n'))
// console.log(getInputData('temperature-to-humidity map:\n'))
// console.log(getInputData('humidity-to-location map:\n'))

function findLowestLocation() {
    let seeds = getInputData('seeds:')[0]
    let seedToSoil = getInputData('seed-to-soil map:\n')
    let soilToFertilizer = getInputData('soil-to-fertilizer map:\n')
    let fertilizerToWater = getInputData('fertilizer-to-water map:\n')
    let waterToLight = getInputData('water-to-light map:\n')
    let lightToTemperature = getInputData('light-to-temperature map:\n')
    let temperatureToHumidity = getInputData('temperature-to-humidity map:\n')
    let humidityToLocation = getInputData('humidity-to-location map:\n')

    let lowestLocation = 999999999999999;

    seeds.forEach(seed => {
        let soil = findConversion(parseInt(seed),seedToSoil)
        let fertilizer = findConversion(soil,soilToFertilizer)
        let water = findConversion(fertilizer,fertilizerToWater)
        let light = findConversion(water,waterToLight)
        let temperature = findConversion(light,lightToTemperature)
        let humidity = findConversion(temperature,temperatureToHumidity)
        let location = findConversion(humidity,humidityToLocation)

        console.log(location)

        if(location < lowestLocation) {
            lowestLocation =  location
        }
    })
    console.log(lowestLocation)
}

function findConversion(seed, map) {
    let result = seed

    for(let i = 0; i<map.length;i++) {
        let destination = parseInt(map[i][0])
        let source = parseInt(map[i][1])
        let range = parseInt(map[i][2])
        if(seed >= source && seed <= source+range) {
            result = destination + (seed - source)
            i += map.length
        }
    }
    return result
}

// findLowestLocation()

function allTheSeeds() {
    console.time()
    let seeds = getInputData('seeds:')[0]
    let seedToSoil = getInputData('seed-to-soil map:\n')
    let soilToFertilizer = getInputData('soil-to-fertilizer map:\n')
    let fertilizerToWater = getInputData('fertilizer-to-water map:\n')
    let waterToLight = getInputData('water-to-light map:\n')
    let lightToTemperature = getInputData('light-to-temperature map:\n')
    let temperatureToHumidity = getInputData('temperature-to-humidity map:\n')
    let humidityToLocation = getInputData('humidity-to-location map:\n')

    let seedRanges = []

    for(let i=0; i<seeds.length; i+=2) {
        let start = parseInt(seeds[i])
        let end = start + parseInt(seeds[i+1]) - 1
        seedRanges.push([start,end])
    }
    
    let soilRanges = seedRanges.map((seedRange,index) => {
        return findRangeConversion(seedRange,seedToSoil)
    })
    
    let fertilizerRanges = soilRanges.flat().map(soilRange => {
        return findRangeConversion(soilRange,soilToFertilizer)
    })
    
    let waterRanges = fertilizerRanges.flat().map(fertilizerRange => {
        return findRangeConversion(fertilizerRange,fertilizerToWater)
    })
    
    let lightRanges = waterRanges.flat().map(waterRange => {
        return findRangeConversion(waterRange,waterToLight)
    })
    
    let temperatureRanges = lightRanges.flat().map(lightRange => {
        return findRangeConversion(lightRange,lightToTemperature)
    })
    
    let humidityRanges = temperatureRanges.flat().map(temperatureRange => {
        return findRangeConversion(temperatureRange,temperatureToHumidity)
    })
    
    let locationRanges = humidityRanges.flat().map(humidityRange => {
        return findRangeConversion(humidityRange,humidityToLocation)
    })

    console.log(locationRanges.flat().sort((a,b) => a[0]-b[0])[0][0])
    console.timeEnd()
}

function findRangeConversion(range,map) {
    let seedLow = parseInt(range[0])
    let seedHigh = parseInt(range[1])
    let results = []
    let conversionResults = []

    for(let i = 0; i<map.length;i++) {
        let destination = parseInt(map[i][0])
        let source = parseInt(map[i][1])
        let range = parseInt(map[i][2])
        let mapLow = source
        let mapHigh = source + range - 1

        function convert(seed) {
            return destination + (seed - source)
        }

        if(mapLow <= seedLow) {
            if(mapHigh >= seedHigh) {
                // Range: seedLow,seedHigh
                results.push([seedLow,seedHigh])
                conversionResults.push([convert(seedLow),convert(seedHigh)])
                i+=map.length
            } else if(mapHigh >= seedLow) {
                // Range: seedLow,mapHigh
                results.push([seedLow,mapHigh])
                conversionResults.push([convert(seedLow),convert(mapHigh)])
                seedLow = mapHigh
            }
        } else {
            if(mapHigh <= seedHigh) {
                // Range: mapLow,mapHigh
                results.push([mapLow,mapHigh])
                conversionResults.push([convert(mapLow),convert(mapHigh)])
            } else if(mapLow <= seedHigh) {
                // Range: mapLow,seedHigh
                results.push([mapLow,seedHigh])
                conversionResults.push([convert(mapLow),convert(seedHigh)])
                seedHigh = mapLow
            }
        }
    }
    if(results.length > 0) {
        results.sort((a,b)=>a[0]-b[0])
        let smallestResult = results[0][0]
        let largestResult = results[results.length-1][1]
        if(range[0] != smallestResult) {
            results.unshift([range[0],smallestResult-1])
            conversionResults.push([range[0],smallestResult-1])
        }
        if(range[1] != largestResult) {
            results.push([largestResult+1,range[1]])
            conversionResults.push([largestResult+1,range[1]])
        }
    
        for(let i = 0; i<results.length-1;i++) {
            if(results[i][1] + 1 != results[i+1][0]) {
                conversionResults.push([results[i][1] + 1,results[i+1][0]-1])
            }
        }
    } else {
        conversionResults.push([range[0],range[1]])
    }

    return conversionResults
}

allTheSeeds()