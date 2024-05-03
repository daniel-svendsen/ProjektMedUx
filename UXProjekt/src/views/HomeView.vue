<template>
  <div>
    <h1 class="title">Specifik väderdata</h1>
    <div v-if="loading">Laddar...</div>
    <div v-else class="weather-container">
      <div v-for="(weatherObj, index) in weatherObjects" :key="index" class="weather-entry">
        <p>{{ weatherObj.date }}</p>
        <p>Genomsnittlig nederbörd: {{ weatherObj.averagePrecipitation }}</p>
        <p>Temperatur: {{ weatherObj.temperature }}</p>
        <p>Vindstyrka: {{ weatherObj.windSpeed }}</p>
        <p>Vädersymbol: {{ weatherObj.weatherSymbol }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { fetchWeatherData } from "../scripts/getWeather.js";
import { transformWeatherData } from "../scripts/translateData.js";
import { useGeolocation } from "../scripts/getPosition.js";
import { filterWeatherDataByTime } from '../scripts/filterWeatherDataByTime.js'

export default {
  data() {
    return {
      loading: true,
      weatherObjects: []
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
      const transformedData = await transformWeatherData(weatherData);

      // Filter weather data by time
      const filteredData = await filterWeatherDataByTime(transformedData);

      // Convert each entry to an object and push to weatherObjects array
      filteredData.forEach(entry => {
        const weatherObj = {
          date: entry.validTime,
          //date: new Date(entry.validTime).toLocaleDateString('sv-SE'), // Extrahera datum och formatera det
          //time: new Date(entry.validTime).toLocaleTimeString('sv-SE', { hour: '2-digit', minute: '2-digit' }), // Extrahera tid och formatera det
          averagePrecipitation: entry.parameters.find(param => param.name === 'Genomsnittlig nederbörd').values[0],
          temperature: entry.parameters.find(param => param.name === 'Temperatur').values[0],
          windSpeed: entry.parameters.find(param => param.name === 'Vindstyrka').values[0],
          weatherSymbol: entry.parameters.find(param => param.name === 'Vädersymbol').values[0]
        };
        this.weatherObjects.push(weatherObj);
      });

      this.loading = false;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.loading = false;
    }
  }
};
</script>

<style>
/* Anpassar layouten för väderdatan */
.weather-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

/* Justerar storleken på varje väderpost */
.weather-entry {
  width: calc(25% - 20px);
  /* Bredden för varje post */
  margin-bottom: 20px;
  /* Avstånd mellan varje post */
  font-size: 10px;
}
</style>
