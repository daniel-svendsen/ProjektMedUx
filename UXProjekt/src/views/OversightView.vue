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
import { getWeatherObjectsList } from '../scripts/getAll.js';

export default {
  data() {
    return {
      weatherObjects: []
    };
  },
  async mounted() {
    try {
      this.weatherObjects = await getWeatherObjectsList();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  }
};
</script>

<style scoped>

</style>
