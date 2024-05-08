// filterWeatherDataByTime.js
import { getWeatherObjectsList } from "./getAll";

export async function filterWeatherDataByTime() {
    try {
        // Fetch weather data using getWeatherObjectsList
        const weatherObjects = await getWeatherObjectsList();

        // Filter weather data for specific times (0800, 1200, 1600, and 2000)
        const filteredWeatherObjects = weatherObjects.filter(entry => {
            const time = new Date(entry.date); // Assuming date contains the time information
            const hour = time.getUTCHours();
            return [8, 12, 16, 20].includes(hour);
        });

        return filteredWeatherObjects;
    } catch (error) {
        console.error('Error filtering weather data by time:', error);
        return null;
    }
}
