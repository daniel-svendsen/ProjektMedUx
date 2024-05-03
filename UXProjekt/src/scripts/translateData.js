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
    2: 'Nästan klar himmel',
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

// Define the function to convert a given date to UTC+2
function convertToUTCPlus2(date) {
    // Assuming date is in local time
    const offset = date.getTimezoneOffset(); // Get the time zone offset in minutes
    const utcTime = date.getTime() + (offset * 60000); // Convert to UTC time in milliseconds
    const utcPlus2Time = utcTime + (2 * 3600000); // Add 2 hours for UTC+2 in milliseconds
    const utcPlus2Date = new Date(utcPlus2Time); // Convert the UTC+2 time to a Date object

    // Format the date to remove the timezone offset
    const formattedDate = utcPlus2Date.toLocaleString('sv-SE', { timeZone: 'UTC' });
    return new Date(formattedDate); // Return the formatted UTC+2 time as a Date object
}


export function transformWeatherData(weatherData) {
    return weatherData.timeSeries.map(entry => {
        const transformedParameters = entry.parameters.filter(param => {
            return ['Wsymb2', 't', 'pmean', 'ws'].includes(param.name);
        }).map(param => {
            let transformedValue = param.values[0];
            switch (param.name) {
                case 'Wsymb2':
                    transformedValue = weatherSymbolMappings[transformedValue] || transformedValue;
                    if (param.unit === 'category') {
                        param.unit = ''; // Remove the unit entirely
                    }
                    break;
                case 't':
                    param.unit = '°C'; // Add the temperature unit
                    break;
                case 'pmean':
                    param.unit = 'mm'; // Add the unit for average precipitation
                    break;
                case 'ws':
                    param.unit = 'm/s'; // Add the unit for wind speed
                    break;
                default:
                    transformedValue = param.values[0];
            }
            const readableName = parameterMappings[param.name] || param.name;
            return { ...param, name: readableName, values: [transformedValue] };
        });
        // Convert the timestamp to UTC+2
        const utcPlus2Time = convertToUTCPlus2(new Date(entry.validTime));
        return { ...entry, parameters: transformedParameters, validTime: utcPlus2Time };
    });
}