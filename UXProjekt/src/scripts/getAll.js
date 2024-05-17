// getAll.js
import { fetchWeatherData } from './getWeather.js';
import { transformWeatherData } from './translateData.js';

// Gets all the weather and filters out
export async function getWeatherObjectsList() {
    try {
        const weatherData = await fetchWeatherData();
        const transformedData = transformWeatherData(weatherData);

        const weatherObjects = [];

        transformedData.forEach(entry => {
            const weatherObj = {
                date: entry.validTime,
                averagePrecipitation: entry.parameters.find(param => param.name === 'Genomsnittlig nederbörd').values[0],
                temperature: entry.parameters.find(param => param.name === 'Temperatur').values[0],
                windSpeed: entry.parameters.find(param => param.name === 'Vindstyrka').values[0],
                weatherSymbol: entry.parameters.find(param => param.name === 'Vädersymbol').values[0]
            };
            weatherObjects.push(weatherObj);
        });

        return weatherObjects;
    } catch (error) {
        console.error('Error fetching and transforming weather data:', error);
        return null;
    }
}
