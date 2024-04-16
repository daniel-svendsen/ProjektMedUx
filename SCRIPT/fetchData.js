import { getPosition } from '../SCRIPT/getPosition.js';

const app = Vue.createApp({
    data() {
        return {
            weatherData: null,
            category: 'pmp3g',
            version: 2,
            longitude: null,
            latitude: null
        };
    },
    methods: {
        async fetchWeatherData() {
            const url = `https://opendata-download-metfcst.smhi.se/api/category/${this.category}/version/${this.version}/geotype/point/lon/${this.longitude}/lat/${this.latitude}/data.json`;

            try {
                const response = await fetch(url);
                this.weatherData = await response.json();
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
