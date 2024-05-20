<template>
    <div>
        <h1>All Time Weather Data</h1>
        <div v-if="loading">Loading...</div>
        <div v-else>
            <div v-for="(entry, index) in transformedData" :key="index">
                <h2>{{ entry.validTime }}</h2>
                <ul>
                    <li v-for="param in entry.parameters" :key="param.name">
                        {{ param.name }}: {{ param.values[0] }}{{ param.unit }}
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { fetchWeatherData } from "../scripts/getWeather.js";
import { transformWeatherData } from "../scripts/translateData.js";
import { useGeolocation } from "../scripts/getPosition.js";

export default {
    data() {
        return {
            loading: true,
            transformedData: null
        };
    },
    async created() {
        try {
            // Call useGeolocation to get latitude and longitude
            const { latitude, longitude } = await useGeolocation();

            // Fetch weather data using obtained latitude and longitude
            const weatherData = await fetchWeatherData(latitude, longitude);

            if (!weatherData || !weatherData.timeSeries) {
                throw new Error('Weather data is missing or has an unexpected structure');
            }

            // Transform weather data
            this.transformedData = await transformWeatherData(weatherData);
            this.loading = false;
        } catch (error) {
            console.error("Error fetching weather data:", error);
            this.loading = false;
        }
    }
};
</script>