const parameterMappings = {
    "spp": "Andel nederbörd i frusen form",
    "pcat": "Nederbördskategori",
    "pmin": "Minsta nederbörd",
    "pmean": "Genomsnittlig nederbörd",
    "pmax": "Maximal nederbörd",
    "pmedian": "Median nederbörd",
    "tcc_mean": "Total molntäckning",
    "lcc_mean": "Låg molntäckning",
    "mcc_mean": "Mellan molntäckning",
    "hcc_mean": "Hög molntäckning",
    "t": "Temperatur",
    "msl": "Lufttryck",
    "vis": "Sikt",
    "wd": "Vindriktning",
    "ws": "Vindstyrka",
    "r": "Relativ luftfuktighet",
    "tstm": "Risk för åska",
    "gust": "Byvind",
    "Wsymb2": "Vädersymbol"
};

// Kartläggning av värden för vädersymbolen (Wsymb2) till betydelser
const weatherSymbolMappings = {
    1: 'Klar himmel',
    2: 'Nästan klart himmel',
    3: 'Skiftande molnighet',
    4: 'Halvklar himmel',
    5: 'Molnigt',
    6: 'Mulet',
    7: 'Dimma',
    8: 'Lätta regnskurar',
    9: 'Måttliga regnskurar',
    10: 'Kraftiga regnskurar',
    11: 'Åskväder',
    12: 'Lätta snöblandade regnskurar',
    13: 'Måttliga snöblandade regnskurar',
    14: 'Kraftiga snöblandade regnskurar',
    15: 'Lätta snöbyar',
    16: 'Måttliga snöbyar',
    17: 'Kraftiga snöbyar',
    18: 'Lätt regn',
    19: 'Måttligt regn',
    20: 'Kraftigt regn',
    21: 'Åska',
    22: 'Lätt snöblandat regn',
    23: 'Måttligt snöblandat regn',
    24: 'Kraftigt snöblandat regn',
    25: 'Lätt snöfall',
    26: 'Måttligt snöfall',
    27: 'Kraftigt snöfall'
};

// Kartläggning av värden för nederbördskategori (pcat) till betydelser
const precipitationCategoryMappings = {
    0: '0',
    1: 'Snö',
    2: 'Snö & regn',
    3: 'Regn',
    4: 'Duggar',
    5: 'Kylt regn',
    6: 'Kylande duggning'
};

// Kartläggning av värden för molntäckning till betydelser
const cloudCoverMappings = {
    tcc: 'Totalt molntäcke',
    lcc: 'Lågt molntäcke',
    mcc: 'Medium molntäcke',
    hcc: 'Högt molntäcke'
};

export function transformWeatherData(weatherData) {
    return weatherData.timeSeries.map(entry => {
        const transformedParameters = entry.parameters.map(param => {
            let transformedValue = param.values[0];
            switch (param.name) {
                case 'Wsymb2':
                    transformedValue = weatherSymbolMappings[transformedValue] || transformedValue;
                    if (param.unit === 'category') {
                        param.unit = ''; // Ta bort enheten helt
                    }
                    break;
                case 'pcat':
                    transformedValue = precipitationCategoryMappings[transformedValue] || transformedValue;
                    if (param.unit === 'category') {
                        param.unit = ''; // Ta bort enheten helt
                    }
                    break;
                case 'tcc_mean':
                case 'lcc_mean':
                case 'mcc_mean':
                case 'hcc_mean':
                    transformedValue = cloudCoverMappings[param.name] || transformedValue;
                    break;
                default:
                    transformedValue = param.values[0];
            }
            // Byt ut "percent" mot "procent"
            if (param.unit === 'percent') {
                param.unit = 'procent';
            }
            // Byt ut "degree" mot "grader"
            if (param.unit === 'degree') {
                param.unit = 'grader';
            }
            const readableName = parameterMappings[param.name] || param.name;
            return { ...param, name: readableName, values: [transformedValue] };
        });
        return { ...entry, parameters: transformedParameters };
    });
}