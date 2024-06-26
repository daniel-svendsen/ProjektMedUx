<template>
  <Suspense>
    <div class="flex flex-col min-h-screen"> <!-- Ger hela appen full skärmhöjd och använder flexbox -->
      <header class="bg-blue py-3 text-white fixed top-0 left-0 right-0 z-50">
        <div class="px-4 max-w-screen-lg mx-auto flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <span>Hem</span>
          </RouterLink>
          <div>{{ city }}</div>
          <div>{{ temperature }} °C</div>
        </div>
      </header>

      <main class="flex-grow pt-16 bg-view-bg">
        <router-view></router-view>
      </main>
      <!-- Villkorlig rendering av fotern baserat på routens metadata -->
      <footer v-if="$route.meta.showFooter"
        class="rounded-t-lg bg-blue py-4 text-white fixed bottom-0 left-0 right-0 z-50">
        <div class="p-4 max-w-screen-lg mx-auto flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <img :src="homeIcon" alt="Home Icon" class="w-7 h-7 mr-2">
            <span class="hidden lg:block">Hem</span>
          </RouterLink>
          <RouterLink to="/packing" class="flex items-center">
            <img :src="packingIcon" alt="Packing Icon" class="w-7 h-7 mr-2">
            <span class="hidden lg:block">Packning</span>
          </RouterLink>
          <RouterLink to="/oversight" class="flex items-center">
            <img :src="oversightIcon" alt="Weather Icon" class="w-7 h-7 mr-2">
            <span class="hidden lg:block">Översikt</span>
          </RouterLink>
          <RouterLink to="/notices" class="flex items-center">
            <img :src="noticesIcon" alt="Notices Icon" class="w-7 h-7 mr-2">
            <span class="hidden lg:block">Notiser</span>
          </RouterLink>
          <RouterLink to="/settings" class="flex items-center">
            <img :src="settingsIcon" alt="Settings Icon" class="w-7 h-7 mr-2">
            <span class="hidden lg:block">Inställningar</span>
          </RouterLink>
        </div>
      </footer>
    </div>
  </Suspense>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { ref, onMounted } from 'vue'; // Importera ref från vue-paketet
import { useGeolocation } from '@/scripts/getPosition.js';
import { getWeatherObjectsList } from '@/scripts/getAll.js'; // Importera getWeatherObjectsList
import { getCityFromCoordinates } from '@/scripts/getCityName';

import homeIcon from '@/assets/Ikonerstilarlogo/home-icon-white.svg';
import packingIcon from '@/assets/Ikonerstilarlogo/packing-white.svg';
import noticesIcon from '@/assets/Ikonerstilarlogo/notice-white.svg';
import settingsIcon from '@/assets/Ikonerstilarlogo/settings-white.svg';
import oversightIcon from '@/assets/Ikonerstilarlogo/weather-white.svg';

const latitude = ref(null);
const longitude = ref(null);
const temperature = ref(null);
const city = ref(''); // Define a ref for city

// Anropa useGeolocation för att hämta den aktuella positionen
useGeolocation().then(async position => {
  latitude.value = position.latitude;
  longitude.value = position.longitude;
  city.value = await getCityFromCoordinates(latitude.value, longitude.value); // Get the city name from coordinates
});

// Hämta temperaturdatan från getWeatherObjectsList() när komponenten renderas
onMounted(async () => {
  const weatherObjects = await getWeatherObjectsList();
  if (weatherObjects && weatherObjects.length > 0) {
    temperature.value = weatherObjects[0].temperature;
  }
});

</script>
