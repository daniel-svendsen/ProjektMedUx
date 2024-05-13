<template>
  <div>
    <ClothesForTheDay />
  </div>
  <div>
    <!-- Lägg till ClothesForTheDay-komponenten här -->


    <!-- <h1 class="title">Specifik väderdata</h1>
    <div v-if="loading">Laddar...</div>
    <div v-else class="weather-container">
      <div v-for="(weatherObj, index) in weatherObjects.slice(0, 4)" :key="index" class="weather-entry">
        <p>{{ weatherObj.date }}</p>
        <p>Genomsnittlig nederbörd: {{ weatherObj.averagePrecipitation }}</p>
        <p>Temperatur: {{ weatherObj.temperature }}</p>
        <p>Vindstyrka: {{ weatherObj.windSpeed }}</p>
        <img :src="weatherObj.weatherSymbol" alt="Vädersymbol">
      </div>
    </div> -->
  </div>
</template>

<script>
import ClothesForTheDay from "../components/ClothesForTheDay.vue";
import { filterWeatherDataByTime } from "../scripts/filterWeatherDataByTime";

export default {
  data() {
    return {
      loading: true,
      weatherObjects: [] // Corrected variable name
    };
  },
  components: {
    ClothesForTheDay
  },
  async created() {
    try {
      // Fetch weather data and assign it to weatherObjects
      this.weatherObjects = await filterWeatherDataByTime();
      this.loading = false;
    } catch (error) {
      console.error("Error fetching and transforming weather data:", error);
      this.loading = false;
    }
  }
};
</script>

<style></style>
