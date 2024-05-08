<template>
  <div>
    <!-- <ClothesForTheDay /> -->
  </div>
  <div>
    <h1 class="title">Specifik väderdata</h1>
    <div v-if="loading">Laddar...</div>
    <div v-else class="weather-container">
      <div v-for="(weatherObj, index) in weatherObjects.slice(0, 4)" :key="index" class="weather-entry">
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
// import { ClothesForTheDay } from "../components/ClothesForTheDay.vue";
import { filterWeatherDataByTime } from "@/scripts/filterWeatherDataByTime";

export default {
  data() {
    return {
      loading: true,
      weatherObjects: [] // Corrected variable name
    };
  },
  components: {
    // ClothesForTheDay
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
