<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref } from 'vue'; // Importera ref från vue-paketet
import { onMounted } from 'vue'; // Importera onMounted från vue-paketet
import { useGeolocation } from '@/scripts/getPosition.js';
import { getWeatherObjectsList } from '@/scripts/getAll.js'; // Importera getWeatherObjectsList

import homeIcon from '@/assets/Ikonerstilarlogo/home-icon-white.svg';
import packingIcon from '@/assets/Ikonerstilarlogo/packing-white.svg';
import noticesIcon from '@/assets/Ikonerstilarlogo/notice-white.svg';
import settingsIcon from '@/assets/Ikonerstilarlogo/settings-white.svg';
import oversightIcon from '@/assets/Ikonerstilarlogo/weather-white.svg';

const latitude = ref(null);
const longitude = ref(null);
const temperature = ref(null);

useGeolocation().then(position => {
  latitude.value = position.latitude;
  longitude.value = position.longitude;
  console.log('Latitude:', latitude);
  console.log('Longitude:', longitude);
});

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
    <div class="flex flex-col min-h-screen"> <!-- Ger hela appen full skärmhöjd och använder flexbox -->
      <header class="bg-blue-900 py-4 text-white">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <img :src="homeIcon" alt="Home Icon" class="mr-2">
            <span>Hem</span>
          </RouterLink>
          <div>Aktuell plats: {{ latitude }} - {{ longitude }}</div>
          <div>{{ temperature }} °C</div>
        </div>
      </header>
      <router-view class="flex-grow"></router-view> <!-- Ger detta element flex-grow så det tar upp allt tillgängligt utrymme -->
      <!-- Villkorlig rendering av fotern baserat på routens metadata -->
      <footer v-if="$route.meta.showFooter" class="bg-blue-900 py-4 text-white">
        <div class="max-w-6xl mx-auto flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <img :src="homeIcon" alt="Home Icon" class="mr-2">
            <span>Hem</span>
          </RouterLink>
          <RouterLink to="/packing" class="flex items-center">
            <img :src="packingIcon" alt="Packing Icon" class="mr-2">
            <span>Packning</span>
          </RouterLink>
          <RouterLink to="/oversight" class="flex items-center">
            <img :src="oversightIcon" alt="Weather Icon" class="mr-2">
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

</style>

