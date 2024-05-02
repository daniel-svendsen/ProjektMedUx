<template>
  <div>
    <h1 class="title">Detta är en översiktssida</h1>
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

      // Fetch weather data using obtained latitude and
      longitude
      const weatherData = await fetchWeatherData(latitude, longitude);

      if (!weatherData || !weatherData.timeSeries) {
        throw new Error('Väderdata saknas eller har en oväntad struktur');
      }

      // Transformera väderdata
      const transformedData = await transformWeatherData(weatherData);

      // Filtrera väderdata efter tid
      this.filteredData = await filterWeatherDataByTime(transformedData);

      this.loading = false;
    } catch (error) {
      console.error("Fel vid hämtning av väderdata:", error);
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
  /* Justera storleken på parameternamn enligt önskad storlek */
}

.param-value {
  font-size: 10px;
  /* Justera storleken på värdena enligt önskad storlek */
}
</style>