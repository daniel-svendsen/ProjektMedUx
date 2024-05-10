<template>
  <div class="packing">
    <h1>This is a packing page</h1>
    <!-- Lägg till sökfältet här -->
    <SearchLocation />
  </div>
</template>

<script>
// Importera dina andra skript som behövs
import { fetchWeatherData } from "../scripts/getWeather.js";
import { transformWeatherData } from "../scripts/translateData.js";
import { useNominatimSearch } from "../scripts/useNominatimSearch.js";
import { filterWeatherDataByTime } from '../scripts/filterWeatherDataByTime.js'

// Importera SearchLocation komponenten
import SearchLocation from "@/components/SearchLocation.vue";

export default {
  components: {
    // Registrera SearchLocation komponenten
    SearchLocation
  },
  // Dina andra optioner och metoder
}
</script>

<style>

</style>

