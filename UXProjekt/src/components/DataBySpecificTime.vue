<!-- DataBySpecificTime.vue -->
<template>
    <div>
        specificWeatherData
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

            // Return the fetched data
            return { specificWeatherData };
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error; // Rethrow the error for handling in the caller
        }
    }
};
</script>
