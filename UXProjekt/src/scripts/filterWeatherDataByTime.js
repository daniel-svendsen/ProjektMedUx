// filterWeatherDataBytTime.js
export async function filterWeatherDataByTime(weatherData) {
    // Filter weather data for specific times (0800, 1200, 1600, and 2000)
    return weatherData.filter(entry => {
        const time = new Date(entry.validTime);
        const hour = time.getUTCHours();
        return [6, 10, 14, 18].includes(hour);
    });
}