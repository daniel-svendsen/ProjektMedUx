// translateData.js
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


export function transformWeatherData(weatherData) {
    return weatherData.timeSeries.map(entry => {
        const transformedParameters = entry.parameters.filter(param => {
            // Välj endast de parametrar som är relevanta: 'Wsymb2', 't', 'pmean', 'ws'
            return ['Wsymb2', 't', 'pmean', 'ws'].includes(param.name);
        }).map(param => {
            let transformedValue = param.values[0];
            switch (param.name) {
                case 'Wsymb2':
                    transformedValue = weatherSymbolMappings[transformedValue] || transformedValue;
                    if (param.unit === 'category') {
                        param.unit = ''; // Ta bort enheten helt
                    }
                    break;
                case 't':
                    // Lägg till enhet för temperatur
                    param.unit = '°C';
                    break;
                case 'pmean':
                    // Lägg till enhet för genomsnittlig nederbörd
                    param.unit = 'mm';
                    break;
                case 'ws':
                    // Lägg till enhet för vindstyrka
                    param.unit = 'm/s';
                    break;
                default:
                    transformedValue = param.values[0];
            }
            const readableName = parameterMappings[param.name] || param.name;
            return { ...param, name: readableName, values: [transformedValue] };
        });
        return { ...entry, parameters: transformedParameters };
    });
}