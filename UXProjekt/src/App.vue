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

    <div class="flex flex-col min-h-screen"> <!-- Ger hela appen full skärmhöjd och använder flexbox -->
      <header class="bg-blue py-6 text-white fixed top-0 left-0 right-0 z-10">
        <div class="px-4 max-w-6xl mx-1 flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <span>Hem</span>
          </RouterLink>
          <div>Aktuell plats: {{ latitude }} - {{ longitude }}</div>
          <div>{{ temperature }} °C</div>
        </div>
      </header>

      <main class="flex-grow pt-16 ">
        <router-view class="px-4"></router-view>
      </main>


      <!-- Villkorlig rendering av fotern baserat på routens metadata -->
      <footer v-if="$route.meta.showFooter" class="rounded-t-lg bg-blue py-4 text-white fixed bottom-0 left-0 right-0">
        <div class="p-4 max-w-6xl mx-4 flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <img :src="homeIcon" alt="Home Icon" class="w-7 h-7 mr-2">

          </RouterLink>
          <RouterLink to="/packing" class="flex items-center">
            <img :src="packingIcon" alt="Packing Icon" class="w-7 h-7 mr-2">
          </RouterLink>
          <RouterLink to="/oversight" class="flex items-center">
            <img :src="oversightIcon" alt="Weather Icon" class="w-7 h-7 mr-2">

          </RouterLink>
          <RouterLink to="/notices" class="flex items-center">
            <img :src="noticesIcon" alt="Notices Icon" class="w-7 h-7 mr-2">

          </RouterLink>
          <RouterLink to="/settings" class="flex items-center">
            <img :src="settingsIcon" alt="Settings Icon" class="w-7 h-7 mr-2">


          </RouterLink>
        </div>
      </footer>
    </div>
  </Suspense>
</template>
