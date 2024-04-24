import { getPosition } from '../SCRIPT/getPosition.js';
import { transformWeatherData } from '../SCRIPT/translateWeatherData.js';
import { filterWeatherDataByTime } from '../SCRIPT/filterWeatherDataByTime.js';

const app = Vue.createApp({
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
    methods: {
        async fetchWeatherData() {
            const url = `https://opendata-download-metfcst.smhi.se/api/category/${this.category}/version/${this.version}/geotype/point/lon/${this.longitude}/lat/${this.latitude}/data.json`;

            try {
                const response = await fetch(url);
                const rawWeatherData = await response.json();

                // Transform weather data
                this.transformedData = transformWeatherData(rawWeatherData);

                // Filter weather data for specific times
                this.specificWeatherData = filterWeatherDataByTime(this.transformedData);

                // Set usual weather data (exclude specific times)
                this.usualWeatherData = this.transformedData.filter(entry => {
                    const time = new Date(entry.validTime);
                    const hour = time.getUTCHours();
                    return ![8, 12, 16, 20].includes(hour);
                });
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }
    },
    created() {
        getPosition((latitude, longitude) => {
            this.latitude = latitude;
            this.longitude = longitude;
            this.fetchWeatherData(); // Fetch weather data for user's current position
        });
    }
});

app.mount('#app');
