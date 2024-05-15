// getAll.js
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

        // Calculate lowest and highest temperature and average precipitation for each day
        for (const date in groupedData) {
            const entries = groupedData[date];
            let lowestTemp = Number.MAX_VALUE;
            let highestTemp = Number.MIN_VALUE;
            let totalPrecipitation = 0; // Total precipitation for the day
            entries.forEach(entry => {
                const temp = entry.parameters.find(param => param.name === 'Temperatur').values[0];
                lowestTemp = Math.min(lowestTemp, temp);
                highestTemp = Math.max(highestTemp, temp);
                const precipitation = entry.parameters.find(param => param.name === 'Genomsnittlig nederbörd').values[0];
                totalPrecipitation += precipitation;
            });
            const averagePrecipitation = totalPrecipitation / entries.length; // Calculate average precipitation
            weatherObjects.push({
                date: new Date(date),
                lowestTemperature: lowestTemp,
                highestTemperature: highestTemp,
                averagePrecipitation: averagePrecipitation
            });
        }

        return weatherObjects;
    } catch (error) {
        console.error('Error fetching and transforming weather data:', error);
        return null;
    }
}