import { fetchWeatherData } from './getWeather.js';
import { transformWeatherData } from './translateData.js';

export async function getWeatherObjectsList() {
    try {
        const weatherData = await fetchWeatherData();
        const transformedData = transformWeatherData(weatherData);

        const weatherObjects = [];

        // Group data by day
        const groupedData = transformedData.reduce((acc, entry) => {
            const date = entry.validTime.toDateString();
            if (!acc[date]) {
                acc[date] = [];
            }
            acc[date].push(entry);
            return acc;
        }, {});

        // Calculate lowest and highest temperature, average precipitation, and weather symbol for each day
        for (const date in groupedData) {
            const entries = groupedData[date];
            let lowestTemp = entries[0].parameters.find(param => param.name === 'Temperatur').values[0];
            let highestTemp = entries[0].parameters.find(param => param.name === 'Temperatur').values[0];
            let totalPrecipitation = 0; // Total precipitation for the day
            let weatherSymbol = ''; // Weather symbol for the day
            entries.forEach(entry => {
                const temp = entry.parameters.find(param => param.name === 'Temperatur').values[0];
                lowestTemp = Math.min(lowestTemp, temp);
                highestTemp = Math.max(highestTemp, temp);
                const precipitation = entry.parameters.find(param => param.name === 'Genomsnittlig nederbörd').values[0];
                totalPrecipitation += precipitation;
                // Get the weather symbol
                weatherSymbol = entry.parameters.find(param => param.name === 'Vädersymbol').iconUrl;
            });
            const averagePrecipitation = (totalPrecipitation / entries.length).toFixed(2); // Calculate and round average precipitation to two decimal places
            weatherObjects.push({
                date: new Date(date),
                lowestTemperature: lowestTemp,
                highestTemperature: highestTemp,
                averagePrecipitation: averagePrecipitation,
                weatherSymbol: weatherSymbol // Add weather symbol to the object
            });
        }

        return weatherObjects;
    } catch (error) {
        console.error('Error fetching and transforming weather data:', error);
        return null;
    }
}