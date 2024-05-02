<template>
    <div>
        <!-- Visa ofiltrerad väderdata -->
        <h2>Ofiltrerad väderdata</h2>
        <ul v-if="usualWeatherData">
            <li v-for="(entry, index) in usualWeatherData" :key="index">
                <!-- Visa relevant information om väderhändelsen här -->
            </li>
        </ul>

        <!-- Visa filtrerad väderdata -->
        <h2>Filtrerad väderdata</h2>
        <ul v-if="specificWeatherData">
            <li v-for="(entry, index) in specificWeatherData" :key="index">
                <!-- Visa relevant information om väderhändelsen här -->
            </li>
        </ul>
    </div>
</template>

<script>
import { transformWeatherData } from '../scripts/translateData';
import { filterWeatherDataByTime } from '../scripts/filterWeatherDataByTime';
import GetPosition from './GetPosition.vue'; // Import the GetPosition function

export default {
    data() {
        return {
            specificWeatherData: null, // Weather data for specific times
            usualWeatherData: null,    // Weather data as usual
            category: 'pmp3g',
            version: 2,
            longitude: null,
            latitude: null,
            transformedData: null, // Updated data to display transformed names only
        };
    },
    async created() { // Use the created hook to initialize data and fetch weather data
        GetPosition((latitude, longitude) => {
            this.latitude = latitude;
            this.longitude = longitude;
            this.fetchWeatherData(latitude, longitude); // Fetch weather data for user's current position
        });
    },
    methods: {
        async fetchWeatherData(latitude, longitude) { // Define fetchWeatherData as a method
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

                // Assign fetched data to component properties
                this.specificWeatherData = specificWeatherData;
                this.usualWeatherData = usualWeatherData;

            } catch (error) {
                console.error('Error fetching weather data:', error);
                throw error; // Rethrow the error for handling in the caller
            }
        }
    }
};
</script>
