<script setup>
import { RouterLink } from 'vue-router'
import { ref } from 'vue'; // Importera ref från vue-paketet
import { onMounted } from 'vue'; // Importera onMounted från vue-paketet
import { useGeolocation } from '@/scripts/getPosition.js';
import { getWeatherObjectsList } from './scripts/getAll.js'; // Importera getWeatherObjectsList

// Importera dina ikoner här
import homeIcon from '@/assets/Ikonerstilarlogo/home-icon-white.svg';
import packingIcon from '@/assets/Ikonerstilarlogo/packing-white.svg';
import noticesIcon from '@/assets/Ikonerstilarlogo/notice-white.svg';
import settingsIcon from '@/assets/Ikonerstilarlogo/settings-white.svg';
import oversightIcon from '@/assets/Ikonerstilarlogo/weather-white.svg';

const latitude = ref(null);
const longitude = ref(null);
const temperature = ref(null);

// Anropa useGeolocation för att hämta den aktuella positionen
useGeolocation().then(position => {
  latitude.value = position.latitude;
  longitude.value = position.longitude;
  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);
});

// Hämta temperaturdatan från getWeatherObjectsList() när komponenten renderas
onMounted(async () => {
  const weatherObjects = await getWeatherObjectsList();
  if (weatherObjects && weatherObjects.length > 0) {
    temperature.value = weatherObjects[0].temperature;
    console.log('Temperature:', temperature);
  }
});
</script>

<template>
  <Suspense>
    <div>
      <header class="bg-blue-900 py-4">
        <div class="wrapper flex justify-between items-center">
          <div class="flex items-center">
            <RouterLink to="/" class="flex items-center">
              <img :src="homeIcon" alt="Home Icon" class="mr-2">
            </RouterLink>
          </div>
          <div class="text-white">Aktuell plats: {{ latitude }} - {{ longitude }}</div>
          <div class="text-white">{{ temperature }} °C</div>
        </div>
      </header>

      <router-view></router-view>

      <footer class="bg-blue-900 py-4">
        <div class="wrapper flex justify-between items-center text-white">
          <RouterLink to="/" class="flex items-center">
            <img :src="homeIcon" alt="Home Icon" class="mr-2">
            <span>Hem</span>
          </RouterLink>
          <RouterLink to="/packing" class="flex items-center">
            <img :src="packingIcon" alt="Packing Icon" class="mr-2">
            <span>Packning</span>
          </RouterLink>
          <RouterLink to="/oversight" class="flex items-center">
            <img :src="oversightIcon" alt="Packing Icon" class="mr-2">
            <span>Översikt</span>
          </RouterLink>
          <RouterLink to="/notices" class="flex items-center">
            <img :src="noticesIcon" alt="Notices Icon" class="mr-2">
            <span>Notiser</span>
          </RouterLink>
          <RouterLink to="/settings" class="flex items-center">
            <img :src="settingsIcon" alt="Settings Icon" class="mr-2">
            <span>Inställningar</span>
          </RouterLink>
        </div>
      </footer>
    </div>
  </Suspense>
</template>

<style scoped>
.wrapper {
  max-width: 1200px;
  margin: 0 auto;
}

/* Stil för huvudrubrik och sidfot */
header,
footer {
  background-color: #425890;
  width: 100%;
  margin-bottom: auto;
  /* Bredden är 100% av förälderelementet */
}

/* Anpassa storleken på länkarna */
.wrapper>div>div>a {
  flex: 1;
  /* Gör länkarna flexibla, så att de anpassar sig efter förälderns bredd */
}
</style>