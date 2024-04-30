<!-- FetchData.vue -->
<template>
    <div>
        <!-- Inget behövs i själva komponentens mall, eftersom den inte renderar något synligt -->
    </div>
</template>

<script>
import { transformWeatherData } from '../scripts/translateData';
import { filterWeatherDataByTime } from '../scripts/filterWeatherDataByTime';

export default {
    async fetchWeatherData(latitude, longitude) {
        const url = `https://opendata-download-metfcst.smhi.se/api/category/${this.category}/version/${this.version}/geotype/point/lon/${longitude}/lat/${latitude}/data.json`;

        try {
            const response = await fetch(url);
            const rawWeatherData = await response.json();

            // Transform weather data
            const transformedData = transformWeatherData(rawWeatherData);

            // Filter weather data for specific times
            const specificWeatherData = filterWeatherDataByTime(transformedData);

            // Set usual weather data (exclude specific times)
            const usualWeatherData = transformedData.filter(entry => {
                const time = new Date(entry.validTime);
                const hour = time.getUTCHours();
                return ![8, 12, 16, 20].includes(hour);
            });

            // Return the fetched data
            return { specificWeatherData, usualWeatherData };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error; // Rethrow the error for handling in the caller
        }
    }
};
</script>
