import { filterWeatherDataByTime } from "../SCRIPT/filterWeatherDataByTime";
//import { app } from "../SCRIPT/fetchData";

const app = {}

const vueApp = Vue.createApp(app)

const weatherByTimeComponent = {
    name: "WeatherByTimeComponent",
    data() {
        return {
            weatherData: [], // Plats att lagra väderdata
            filteredData: [] // Plats att lagra filtrerad data
        };
    },
    async created() {
        // Simulerad väderdata, byt ut detta med din faktiska data
        const weatherData = [
            { id: 1, validTime: "2024-04-25T08:00:00Z" },
            { id: 2, validTime: "2024-04-25T12:00:00Z" },
            { id: 3, validTime: "2024-04-25T16:00:00Z" },
            { id: 4, validTime: "2024-04-25T20:00:00Z" }
            // Lägg till din faktiska data här
        ];

        // Använd filterWeatherDataByTime-funktionen för att filtrera väderdata
        this.filteredData = filterWeatherDataByTime(weatherData);
    },
    template: `<div>
    <h2>Weather Data for Specific Times Komponent</h2>
    <!-- Show fetching message if filteredData is empty -->
    <p v-if="filteredData.length === 0">Fetching specific weather data...</p>
    <!-- Show specific weather data -->
    <div v-else>
        <div v-for="(entry, index) in filteredData" :key="index" class="weather-entry">
            <h3>Tid: {{ entry.validTime }}</h3>
            <ul>
                <li v-for="(param, paramIndex) in entry.parameters" :key="paramIndex">
                    {{ param.name }}: {{ param.values[0] }} {{ param.unit }}
                </li>
            </ul>
        </div>
    </div>
</div>`
}

vueApp.component('weather-by-time-component', weatherByTimeComponent)

vueApp.mount("#app")