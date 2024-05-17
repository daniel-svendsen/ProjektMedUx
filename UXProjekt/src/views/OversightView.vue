<template>
  <div>
    <h1 class="title">Specifik väderdata</h1>
    <div v-if="loading"><span class="loading loading-spinner text-info"></span></div>
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
      loading: true,
      weatherObjects: []
    };
  },
  async mounted() {
    try {
      this.weatherObjects = await getWeatherObjectsList();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped></style>
