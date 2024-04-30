<template>
  <div class="home">
    <!-- UsualWeatherData component -->
    <UsualWeatherData :usualWeatherData="usualWeatherData" />
  </div>
</template>

<script>
import UsualWeatherData from '../components/UsualWeatherData.vue'; // Importera UsualWeatherData-komponenten här

export default {
  components: {
    UsualWeatherData // Registrera UsualWeatherData-komponenten här
  },
  data() {
    return {
      usualWeatherData: [] // Se till att usualWeatherData är definierad i din data() funktion
    };
  },
  // Övrig kod
};
</script>

<style>
@media (min-width: 1024px) {
  .home {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}

/* Övriga stilar */
</style>../components/DataBySpecificTime.vue
