export function filterWeatherDataByTime(weatherData) {
    // Filter weather data for specific times (0800, 1200, 1600, and 2000)
    return weatherData.filter(entry => {
        const time = new Date(entry.validTime);
        const hour = time.getUTCHours();
        return [8, 12, 16, 20].includes(hour);
    });
}