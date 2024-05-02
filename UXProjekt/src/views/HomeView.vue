<!-- HomeView.vue -->
<template>
  <div>
    <h1>Specific Weather Data</h1>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="(entry, index) in filteredData" :key="index">
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
import { filterWeatherDataByTime } from '../scripts/filterWeatherDataByTime.js'

export default {
  data() {
    return {
      loading: true,
      filteredData: null
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
      this.filteredData = await filterWeatherDataByTime(transformedData);

      this.loading = false;
    } catch (error) {
      console.error("Error fetching weather data:", error);
      this.loading = false;
    }
  }
};
</script>


<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
