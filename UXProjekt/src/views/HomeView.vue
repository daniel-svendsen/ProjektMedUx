<template>
  <div>
    <h1 class="title">Specifik väderdata</h1>
    <div v-if="loading">Laddar...</div>
    <div v-else>
      <div v-for="(entry, index) in filteredData" :key="index" class="weather-entry">
        <h2 class="entry-title">{{ entry.validTime }}</h2>
        <ul class="weather-params">
          <li v-for="param in entry.parameters" :key="param.name" class="param-item">
            <span class="param-name">{{ param.name }}:</span>
            <span class="param-value">{{ param.values[0] }}{{ param.unit }}</span>
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
.title {
  font-size: 10px;
  /* Justera storleken på titeln enligt önskad storlek */
}

.entry-title {
  font-size: 10px;
  /* Justera storleken på titlarna för varje post enligt önskad storlek */
}

.weather-entry {
  margin-bottom: 10px;
}

.weather-params {
  list-style: none;
  padding: 0;
  display: flex;
}

.param-item {
  margin-right: 20px;
}

.param-name {
  font-weight: bold;
  margin-right: 5px;
  font-size: 10px;
}

.param-value {
  font-size: 10px;
  /* Justera storleken på värdena enligt önskad storlek */
}
</style>
